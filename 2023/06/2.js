const { readArr, log } = require("../../utils");
exports.solution = () => {
  const [time, distance] = readArr("./input.txt")
    .map((line) => line.match(/[0-9]+/g))
    .map((line) => line.join(""));

  log(time, distance);
  const race = (time, hold) => {
    if (hold < 0 || hold > time) {
      throw new Error(`race time: ${time} hold: ${hold}`);
    }
    const distance = (time - hold) * hold;
    log(`Holding for ${hold} millis travels: ${distance} millis`);
    return distance;
  };

  const isRecordSmasher = (time, hold, distance) => distance < race(time, hold);

  // Will binary search for upper and lower bound, finding highest and lowest hold time to beat the distance.

  const lowerBound = (time, hold, distance) => {
    let l = 0;
    let r = Number(hold);
    let mid;
    let iterations = 0;
    while (l < r) {
      iterations++;
      log(l, r);
      mid = Math.floor(l + (r - l) / 2);
      if (isRecordSmasher(time, mid, distance)) {
        r = mid;
      } else {
        log(`mid ${mid} is no record smasher`);
        l = mid + 1;
      }
    }
    log(`Iterations to find lower bound: ${iterations}`);
    return l;
  };

  const upperBound = (time, hold, distance) => {
    let l = 0;
    let r = Number(hold);
    let mid;
    let iterations = 0;
    while (l < r) {
      iterations++;
      log(l, r);
      mid = Math.floor(l + (r - l) / 2);
      if (isRecordSmasher(time, mid, distance)) {
        l = mid + 1;
      } else {
        log(`mid ${mid} is no record smasher`);
        r = mid;
      }
    }
    log(`Iterations to find upper bound: ${iterations}`);
    return r - 1;
  };

  const waysToBeat =
    upperBound(time, time, distance) - lowerBound(time, time, distance) + 1;
  return waysToBeat;
};
