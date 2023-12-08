const fs = require("fs");
require("dotenv").config();

function runDay(year, day) {
  day = day.padStart(2, "0");
  const path = `${__dirname}/${year}/${day}`;
  process.chdir(path);

  const pt1 = require(`${path}/1`).solution;
  const pt2 = require(`${path}/2`).solution;
  console.log(`Day ${day} part 1: ${pt1()}`);
  console.log(`Day ${day} part 2: ${pt2()}`);
}

const args = process.argv.slice(2);
const { YEAR, DAY } = process.env;
const year = args[0] || YEAR;
const day = args[1] || DAY;

if (!year) {
  console.log(
    "Not enough arguments passed to program. Either use 'npm start <year> (<day>)' or configure the .env file with desired year/day"
  );
  return;
}

console.log(`Year ${year}`);
if (day) {
  runDay(year, day);
} else {
  const days = fs.readdirSync(`./${year}`, { encoding: "utf-8" });
  days.forEach((d) => {
    runDay(year, d);
    console.log();
  });
}
