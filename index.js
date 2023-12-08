const fs = require("fs");
require("dotenv").config();

function runDay(year, day, part) {
  day = day.padStart(2, "0");
  const path = `${__dirname}/${year}/${day}`;
  process.chdir(path);

  const pt1 = require(`${path}/1`).solution;
  const pt2 = require(`${path}/2`).solution;
  (!part || part == 1) && console.log(`Day ${day} part 1: ${pt1()}`);
  (!part || part == 2) && console.log(`Day ${day} part 2: ${pt2()}`);
}

const args = process.argv.slice(2);
const { YEAR, DAY, PART } = process.env;
const year = args[0] || YEAR;
const day = args[1] || DAY;
const part = args[2] || PART;

if (!year) {
  console.log(
    "Not enough arguments passed to program. Either use 'npm start <year> (<day>) (<part>)' or configure the .env file with desired year/day/part"
  );
  return;
}

console.log(`Year ${year}`);
if (day) {
  runDay(year, day, part);
} else {
  const days = fs.readdirSync(`./${year}`, { encoding: "utf-8" });
  days.forEach((d) => {
    runDay(year, d, part);
    console.log();
  });
}
