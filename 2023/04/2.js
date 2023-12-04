const { readArr } = require("../../utils");

exports.solution = () => {
  const input = readArr("input.txt");
  const copies = new Array(input.length).fill(0);
  const cards = input
    .map((line) => line.split(":"))
    .map((line) => {
      const [winning, owning] = line[1].split("|");
      return {
        winning: winning.trim().split(/\s+/),
        owning: owning.trim().split(/\s+/),
      };
    })
    .map(({ winning, owning }, i) => {
      const wins = owning.filter((o) => winning.includes(o)).length;
      const card = i;
      for (let c = card + 1; c <= card + wins; c++) {
        copies[c] = copies[c] + 1 * (copies[card] + 1); //1 for each copy + the original 1
      }
      // console.log(copies);
      return card;
    });
  return cards.length + copies.reduce((sum, c) => (sum += c), 0);
};
