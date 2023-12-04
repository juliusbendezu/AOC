const { readArr } = require("./../../utils");

exports.solution = () => {
  const parseGame = (gameRecord) => {
    const [name, game] = gameRecord.split(":");
    const id = name.split(" ")[1];
    const sets = game.split(";").map((set) =>
      set
        .split(",")
        .map((cubes) => {
          const [amount, color] = cubes.trim().split(" ");
          return { color, amount };
        })
        .reduce((set, cubes) => {
          set[cubes.color] = cubes.amount;
          return set;
        }, {})
    );

    return {
      id: id,
      sets: sets,
    };
  };

  const record = readArr("input.txt");
  const games = record.map((g) => parseGame(g));
  const isGamePossible = (g) => {
    for (const set of g.sets) {
      for (const [color, amount] of Object.entries({
        red: 12,
        green: 13,
        blue: 14,
      })) {
        if (Number(set[color]) > Number(amount)) {
          return false;
        }
      }
    }
    return true;
  };
  const possibleGames = games.filter((g) => isGamePossible(g));
  return possibleGames.reduce((sum, game) => (sum += Number(game.id)), 0);
};
