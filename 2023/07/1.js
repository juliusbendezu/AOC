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

    switch (uniqueCards.length) {
      case 1:
        return types.fiveOfAKind;
      case 2:
        return uniqueCards.find((count) => count === 4)
          ? types.fourOfAKind
          : types.fullHouse;
      case 3:
        return uniqueCards.find((count) => count === 3)
          ? types.threeOfAKind
          : types.twoPair;
      case 4:
        return types.onePair;
      case 5:
        return types.highCard;
    }
  };

  //Lowest first
  const compareHands = (h1, h2) => {
    const value = (card) => {
      const values = { A: 14, K: 13, Q: 12, J: 11, T: 10 };
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
