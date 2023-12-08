require("dotenv").config();
const { DEBUG } = process.env;
exports.log = (str) => {
  DEBUG?.toLowerCase() === "true" && console.log(str);
};
