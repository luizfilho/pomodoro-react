/* eslint-disable @typescript-eslint/no-var-requires */
const { alias, configPaths } = require("react-app-rewire-alias");
module.exports = function override(config) {
  return alias(configPaths("./tsconfig.paths.json"))(config);
};