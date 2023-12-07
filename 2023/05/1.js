const { readArr } = require("../../utils");

exports.solution = () => {
  const debug = true;
  const debugLog = (s) => {
    debug && console.log(s);
  };

  const almanac = readArr("input.txt", "\n\n");
  const [first, ...rest] = almanac;
  const seeds = first.match(/[0-9]+/g).map((s) => Number(s));
  //   console.log("Seeds:", seeds);
  let categories = new Set(); //For debug logging
  const categoryMaps = rest.map((map) => {
    const [category, ...maps] = map.split("\n");
    category
      .split(" ")[0]
      .split("-to-")
      .forEach((c) => categories.add(c));

    return maps.map((map) => map.split(" ").map((n) => Number(n)));
  });

  const ranges = categoryMaps.map((map) => {
    map.sort((a, b) => a[1] - b[1]);
    return map.map((m) => {
      const [dest, source, length] = m;
      const offset = dest - source;
      return { start: source, end: source + length, offset };
    });
  });

  categories = [...categories];
  const locationNumbers = seeds.map((seed) => {
    let number = seed;
    ranges.forEach((range, category) => {
      const r = range.find(
        ({ start, end }) => start <= number && number <= end
      );
      const nextNumber = r ? number + r.offset : number;
      debugLog(
        `${categories[category]} number ${number} corresponds to ${
          categories[category + 1]
        } number ${nextNumber}.`
      );
      number = nextNumber;
    });
    debugLog("\n");
    return number;
  });

  return locationNumbers.sort((l1, l2) => l1 - l2)[0];
};
