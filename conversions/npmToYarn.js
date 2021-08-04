const { yarn } = require("../package-managers/npm");
const { convert } = require("./helper");

module.exports = convert(command, yarn);
