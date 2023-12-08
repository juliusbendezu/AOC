const fs = require("fs");

exports.readString = (filename) => {
  return fs.readFileSync(filename, { encoding: "utf-8" }).trim();
};

exports.readArr = (filename, delimeter = "\n") => {
  return this.readString(filename).split(delimeter);
};
