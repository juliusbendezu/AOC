const { readArr } = require("../../utils");

exports.solution = () => {
  const grid = readArr("input.txt").map((c) => c.trim());
  const number = /[0-9]+/;
  const symbol = /[^0-9.]/;

  const debug = false;
  const debugLog = (str) => {
    debug && console.log(str);
  };

  const isSymbol = (s) => {
    return symbol.test(s);
  };
  const isNumber = (s) => {
    return number.test(s);
  };
  const reverse = (str) => {
    return str.split("").reverse().join("");
  };
  const findAdjacent = (str) => {
    return isNumber(str[0]) && str.match(number)[0]; //Exit early if no adjacent num, otherwise search string to find the whole num
  };
  const findOffsetAdjacent = (row, col) => {
    const adjacent = row.slice(col - 1, col + 2);

    if (/[0-9]\.\./.test(adjacent)) {
      const reversedMatch = findAdjacent(reverse(row.slice(0, col)));
      debugLog(
        `Row is ${row}, adjacent ${adjacent}, matched by '/[0-9]\.\./', match is ${reverse(
          reversedMatch
        )}`
      );
      return [reverse(reversedMatch)];
    }
    if (/\.\.[0-9]/.test(adjacent)) {
      const match = findAdjacent(row.slice(col + 1));
      debugLog(
        `Row is ${row}, adjacent ${adjacent}, matched by '/\.\.[0-9]/', match is ${match}`
      );
      return [match];
    }
    if (/[0-9]{2}\./.test(adjacent)) {
      const reversedMatch = findAdjacent(reverse(row.slice(0, col + 1)));
      debugLog(
        `Row is ${row}, adjacent ${adjacent}, matched by '/[0-9]{2}\./', match is ${reverse(
          reversedMatch
        )}`
      );
      return [reverse(reversedMatch)];
    }
    if (/\.[0-9]{2}/.test(adjacent)) {
      const match = findAdjacent(row.slice(col));
      debugLog(
        `Row is ${row}, adjacent ${adjacent}, matched by '/\.[0-9]{2}/', match is ${match}`
      );
      return [match];
    }
    if (/[0-9]\.[0-9]/.test(adjacent)) {
      const reversedMatch = findAdjacent(reverse(row.slice(0, col)));
      const match = findAdjacent(row.slice(col + 1));
      debugLog(
        `Row is ${row}, adjacent ${adjacent}, matched by '/[0-9]\.[0-9]/', match is ${reverse(
          reversedMatch
        )} and ${match}`
      );
      return [reverse(reversedMatch), match];
    }
    if (/[0-9]{3}/.test(adjacent)) {
      debugLog(
        `Row is ${row}, adjacent ${adjacent}, matched by '/[0-9]{3}/', match is ${adjacent}`
      );
      return [adjacent];
    }
    if (/\.[0-9]\./.test(adjacent)) {
      return [adjacent[1]];
    }
  };

  const partNumbers = [];
  for (let row = 0; row < grid.length; row++) {
    // console.log(`Checking row ${row}: ${grid[row]}`);
    for (let col = 0; col < grid[0].length; col++) {
      //   console.log(`[${row},${col}]: ${grid[row][col]}`);
      if (isSymbol(grid[row][col])) {
        const before = grid[row].slice(0, col);
        const reversedMatchBefore = findAdjacent(reverse(before));
        reversedMatchBefore && partNumbers.push(reverse(reversedMatchBefore));

        const after = grid[row].slice(col + 1);
        const matchAfter = findAdjacent(after);
        matchAfter && partNumbers.push(matchAfter);

        const above = grid[row - 1];
        const below = grid[row + 1];
        if (above) {
          const matchesAbove = findOffsetAdjacent(above, col, grid, row);
          matchesAbove && partNumbers.push(...matchesAbove);
        }
        if (below) {
          const matchesBelow = findOffsetAdjacent(below, col, grid, row);
          matchesBelow && partNumbers.push(...matchesBelow);
        }
        // console.log(partNumbers);
      }
    }
  }
  //   console.log(partNumbers);
  return partNumbers.reduce((sum, num) => (sum += Number(num)), 0);
};
