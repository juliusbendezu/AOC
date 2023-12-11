const { readArr, log } = require("../../utils");

exports.solution = () => {
  const ranks = {
    fiveOfAKind: 7,
    fourOfAKind: 6,
    fullHouse: 5,
    threeOfAKind: 4,
    twoPair: 3,
    onePair: 2,
    highCard: 1,
  };
  const findType = (hand) => {
    //TODO replace with character counting because this is too flaky
    //Test these extensively using of_a_kind.txt
    const fiveOfAKind = /(\w).*\1.*\1.*\1.*\1/;
    const fourOfAKind = /(\w).*\1.*\1.*\1/;
    //fullHouse
    const threeOfAKind = /(\w).*\1.*\1/;
    //twoPair
    const onePair = /(\w).*\1/;

    if (fiveOfAKind.test(hand)) {
      return ranks.fiveOfAKind;
    }
    if (fourOfAKind.test(hand)) {
      return ranks.fourOfAKind;
    }
    if (threeOfAKind.test(hand)) {
      log(hand.match(threeOfAKind));
      const part = hand.replace(hand.match(threeOfAKind)[0]);
      console.log(part);
      return onePair.test(part) ? ranks.fullHouse : ranks.threeOfAKind;
    }
    if (onePair.test(hand)) {
      const part = hand.replace(onePair, "");
      return onePair.test(part) ? ranks.twoPair : ranks.onePair;
    }
    return ranks.highCard;
  };

  const compareHands = (h1, h2) => {
    //First by rank, then by first highest num, maybe replace AKQT with numbers or just add some rules for those
    let winner; //Perhaps, or some other return type?
    return winner;
  };

  //Create an object with full hand, (type), rank
  const hands = readArr("./full_house.txt")
    .map((l) => l.split(" "))
    .map(([hand, bid]) => {
      log(`Hand ${hand} evaluated as rank ${findType(hand)}`);
    });

  log(findType("66666"));
  log(findType("22223"));
  log(findType("22AAA"));
  log(findType("22234"));
  log(findType("22334"));
  log(findType("22345"));
  log(findType("12345"));
  // compare types and find rank between hands
};
