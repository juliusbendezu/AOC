const { readArr, log, zip } = require("../../utils");
exports.solution = () => {
  const [times, distances] = readArr("./input.txt").map((line) =>
    line.match(/[0-9]+/g)
  );

  const races = zip(times, distances);
  log(races);
  const race = (time, hold) => {
    if (hold < 0 || hold > time) {
      throw new Error(`race time: ${time} hold: ${hold}`);
    }
    return (time - hold) * hold;
  };

  //Brute force, around 3s runtime, debug stuff included
  const waysToBeat = races.map(([time, record]) => {
    let recordSmashers = [];
    for (let i = 0; i < time; i++) {
      const distance = race(time, i);
      log(`Holding for ${i} millis travels: ${distance} millis`);
      if (distance > record) {
        recordSmashers.push(i);
      }
    }
    log(`Beat the record ${record} by holding for any of ${recordSmashers}\n`);
    return recordSmashers.length;
  });
  return waysToBeat.reduce((product, w) => (product *= w), 1);
};
