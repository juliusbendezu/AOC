const { readArr } = require("../../utils");

exports.solution = () => {
  return readArr("input.txt")
    .map((line) => line.split(":"))
    .map((line) => {
      const card = line[0].split(/\s+/)[1];
      const [winning, owning] = line[1].split("|");
      return {
        card,
        winning: winning.trim().split(/\s+/),
        owning: owning.trim().split(/\s+/),
      };
    })
    .map(({ card, winning, owning }) => {
      const wins = owning.filter((o) => winning.includes(o)).length;
      const points = wins ? Math.pow(2, wins - 1) : 0;
      return { card, points, wins };
    })
    .reduce((sum, c) => {
      //   console.log(c);
      return (sum += c.points);
    }, 0);
};
