//Naive solution that does not work with input due to OOM. LookupMaps are arrays that get too large with the input.

const { readArr } = require("../../utils");

exports.solution = () => {
  const almanac = readArr("test.txt", "\n\n");
  const [first, ...rest] = almanac;
  const seeds = first.match(/[0-9]+/g);
  console.log("Seeds:", seeds);
  let categories = new Set(); //For logging
  const categoryMaps = rest.map((map) => {
    const [category, ...maps] = map.split("\n");
    category
      .split(" ")[0]
      .split("-to-")
      .forEach((c) => categories.add(c));

    return maps.map((map) => map.split(" ").map((n) => Number(n)));
  });
  //   console.log(maps);

  const lookupMaps = categoryMaps.map((map) => {
    map.sort((a, b) => a[1] - b[1]);
    const last = map[map.length - 1];
    const rangeLength = last[1] + last[2];
    // console.log(rangeLength);

    //Source = i, Destination = val
    const lookupMap = Array.from({ length: rangeLength }, (_, index) => index);
    map.forEach((m) => {
      const [dest, source, length] = m;
      for (let i = 0; i < length; i++) {
        lookupMap[source + i] = dest + i;
      }
    });
    return lookupMap;
  });
  //   ranges[0].forEach((n, i) => console.log(i, n));
  categories = [...categories];
  const locationNumbers = seeds.map((seed) => {
    let number = seed;
    lookupMaps.forEach((lookupMap, category) => {
      let nextNumber = lookupMap[number] || number;
      console.log(
        `${categories[category]} number ${number} corresponds to ${
          categories[category + 1]
        } number ${nextNumber}.`
      );
      number = nextNumber;
    });
    console.log("\n");
    return number; //When we are all the way through, we have our locationNumber;
  });
  //   console.log(lookupMaps);
  //   console.log(locationNumbers);
  return locationNumbers.sort((l1, l2) => l1 - l2)[0];
};
