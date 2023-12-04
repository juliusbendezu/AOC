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
  const calculateCubes = (g) => {
    var minCubes = { red: 0, green: 0, blue: 0 };
    for (const set of g.sets) {
      if (Number(set.red) > Number(minCubes.red)) minCubes.red = set.red;
      if (Number(set.green) > Number(minCubes.green))
        minCubes.green = set.green;
      if (Number(set.blue) > Number(minCubes.blue)) minCubes.blue = set.blue;
    }

    return { ...g, minCubes };
  };
  const calculatedGames = games.map((g) => calculateCubes(g));
  return calculatedGames.reduce((sum, game) => {
    // console.log(game);
    const { red, green, blue } = game.minCubes;
    return (sum += (red || 1) * (green || 1) * (blue || 1));
  }, 0);
};
