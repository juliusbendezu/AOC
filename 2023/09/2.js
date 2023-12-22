const { readArr, log } = require("../../utils");

exports.solution = () => {
  const histories = readArr("input.txt").map((l) => l.split(" ").map(Number));
  log(histories);

  const findSequences = (history) => {
    log("Finding sequences of history", history);
    const findNextSequence = (history) => {
      const [_, ...rest] = history;
      return rest.map((n, i) => n - history[i]); //history[i] is previous since we start from index 1
    };
    const isAllZeroSequence = (s) => s.every((n) => n === 0);

    let sequences = [history];
    let currentSequence = sequences[0];
    while (!isAllZeroSequence(currentSequence)) {
      currentSequence = findNextSequence(currentSequence);
      sequences.push(currentSequence);
    }
    return sequences;
  };

  const findNextValue = (sequences) => {
    sequences.reverse();
    let lastPlaceholder = 0;
    for (let i = 1; i < sequences.length; i++) {
      const current = sequences[i];
      const currentLast = current[current.length - 1];
      const placeholder = lastPlaceholder + currentLast;
      log(
        current,
        `placeholder => ${placeholder} = ${currentLast} - ${lastPlaceholder}`
      );
      lastPlaceholder = placeholder;
    }
    return lastPlaceholder;
  };

  const findPreviousValue = (sequences) => {
    sequences.reverse();
    let lastPlaceholder = 0;
    for (let i = 1; i < sequences.length; i++) {
      const current = sequences[i];
      const currentFirst = current[0];
      const placeholder = currentFirst - lastPlaceholder;
      log(
        current,
        `placeholder => ${placeholder} = ${currentFirst} + ${lastPlaceholder}`
      );
      lastPlaceholder = placeholder;
    }
    return lastPlaceholder;
  };

  const values = histories.map((h) => findPreviousValue(findSequences(h)));
  log(values);
  return values.reduce((sum, curr) => (sum += curr), 0);
};
