const { readArr, log } = require("../../utils");

exports.solution = () => {
  const types = {
    fiveOfAKind: 7,
    fourOfAKind: 6,
    fullHouse: 5,
    threeOfAKind: 4,
    twoPair: 3,
    onePair: 2,
    highCard: 1,
  };

  const findType = (hand) => {
    const count = (hand) =>
      hand.split("").reduce(
        //Comma operator magic, the first expression is evaluated, the second is returned
        (counts, card) => ((counts[card] = (counts[card] || 0) + 1), counts),
        {}
      );

    const cardCounts = count(hand);
    const uniqueCards = Object.values(cardCounts);

    //Find out how many jokers
    const jokers = cardCounts["J"] || 0;
    //Build strongest hands based on that
    if (jokers >= 4) {
      return types.fiveOfAKind;
    }
    if (jokers === 3 && uniqueCards.length === 2) {
      //3j + 2x
      return types.fiveOfAKind;
    }
    if (jokers === 3 && uniqueCards.length === 3) {
      //3j + 1x + 1y
      return types.fourOfAKind;
    }
    if (jokers === 2 && uniqueCards.length === 2) {
      //2j + 3x
      return types.fiveOfAKind;
    }
    if (jokers === 2 && uniqueCards.length === 3) {
      //2j + 2x + 1y
      return types.fourOfAKind;
    }
    if (jokers === 2 && uniqueCards.length === 4) {
      //2j + ...1x
      return types.threeOfAKind;
    }

    // 1 joker increases type by 1 or 2, for example:
    // AAAAJ - from four(6) to fiveOfAKind(7)
    // AAJ23 - from onePair(2) to threeOfAKind(4), skipping twoPair(3)
    switch (uniqueCards.length) {
      case 1:
        //5x
        return types.fiveOfAKind;
      case 2:
        //4x + 1y || 3x + 2y
        return uniqueCards.find((count) => count === 4)
          ? types.fourOfAKind + jokers
          : types.fullHouse; //Full house is not possible with only 1 joker
      case 3:
        //3x + 1y + 1z || 2x + 2y + 1z
        return uniqueCards.find((count) => count === 3)
          ? types.threeOfAKind + jokers * 2 //threeOfAKind + 1 joker is fourOfAKind
          : types.twoPair + jokers * 2; //2 pair + 1 joker is fullhouse
      case 4:
        //2x + ...1y
        return types.onePair + (jokers ? 2 : 0); //1 pair + 1 joker is threeOfAKind
      case 5:
        return types.highCard + jokers;
    }
  };

  //Lowest first
  const compareHands = (h1, h2) => {
    const value = (card) => {
      const values = { A: 14, K: 13, Q: 12, T: 10, J: 1 };
      return values[card] || Number(card);
    };

    const rankDiff = h1.type - h2.type;
    if (rankDiff !== 0) return rankDiff;

    for (let i = 0; i < h1.hand.length; i++) {
      const card1 = h1.hand[i];
      const card2 = h2.hand[i];
      const highestCardDiff = value(card1) - value(card2);

      if (highestCardDiff !== 0) return highestCardDiff;
    }
    return 0;
  };

  //Create an object with full hand, (type), rank
  const hands = readArr("./input.txt")
    .map((l) => l.split(" "))
    .map(([hand, bid]) => ({ hand, bid, type: findType(hand) }))
    .sort(compareHands)
    .map((hand, i) => ((hand.rank = i + 1), hand));

  log(hands);

  return hands.reduce((sum, { bid, rank }) => (sum += rank * bid), 0);
};
