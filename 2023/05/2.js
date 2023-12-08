const { readArr } = require("../../utils");

exports.solution = () => {
  const debug = false;
  const debugLog = (s) => {
    debug && console.log(s);
  };

  const almanac = readArr("input.txt", "\n\n");
  const [first, ...rest] = almanac;
  const seedRanges = first.match(/[0-9]+\s[0-9]+/g);
  //   console.log("SeedRanges:", seedRanges);
  let categories = new Set(); //For debug logging
  const categoryMaps = rest.map((map) => {
    const [category, ...maps] = map.split("\n");
    category
      .split(" ")[0]
      .split("-to-")
      .forEach((c) => categories.add(c));

    return maps.map((map) => map.split(" ").map((n) => Number(n)));
  });

  const mapRanges = categoryMaps.map((map) => {
    map.sort((a, b) => a[1] - b[1]);
    return map.map((m) => {
      const [dest, source, length] = m;
      const offset = dest - source;
      return { start: source, end: source + length - 1, offset }; //Ranges are end-exclusive
    });
  });

  categories = [...categories];

  let mappedSeedRanges = seedRanges.map((seed) =>
    seed.split(" ").map((s) => Number(s))
  );
  mappedSeedRanges.sort((r1, r2) => r1[0] - r2[0]);
  mappedSeedRanges = mappedSeedRanges.map((r) => [r[0], r[0] + r[1] - 1]); //[start, end] instead of [start, length], ranges are end-exclusive

  //Investigating seeds, can probably do something smart here to optimize the mapping step
  const lowestSeed = mappedSeedRanges[0][0];
  const highestSeed = mappedSeedRanges.reduce((highest, [_, end]) => {
    return end > highest ? end : highest;
  }, 0);
  //   console.log(lowestSeed, highestSeed);
  //   console.log(mappedSeedRanges);

  //Reverse mappings and try location numbers starting from 0 to find one that successfully maps to a seed in any of the seed ranges

  mapRanges.reverse();
  categories.reverse();
  mapRanges.forEach((r, i) => {
    debugLog(`${categories[i]}-to-${categories[i + 1]}:`);
    debugLog(r);
  });

  //Runtime around 5 mins.....
  let lowestLocationNumber,
    potentialLocationNumber = 0;
  while (!lowestLocationNumber) {
    let number = potentialLocationNumber;
    mapRanges.forEach((range, category) => {
      // Current number is the result of a successful mapping, so to find the previous mapping we need to subtract the offset that said mapping would add to current
      const r = range.find(
        ({ start, end, offset }) =>
          start <= number - offset && number - offset <= end
      );
      const nextNumber = r ? number - r.offset : number;
      debugLog(
        `${categories[category]} number ${number} corresponds to ${
          categories[category + 1]
        } number ${nextNumber}.`
      );
      number = nextNumber;
    });
    debugLog("\n");
    //Number is now reverse-mapped to seed, if seed is in any of the seed ranges, lowest will become the potential location number and break the loop
    const seedRange = mappedSeedRanges.find(
      ([start, end]) => start <= number && number <= end
    );
    if (seedRange) {
      lowestLocationNumber = potentialLocationNumber;
      debugLog(
        `Found seed ${number} in seed range ${seedRange} which corresponds to location number ${lowestLocationNumber}.`
      );
    }
    potentialLocationNumber++;
  }

  return lowestLocationNumber;
};
