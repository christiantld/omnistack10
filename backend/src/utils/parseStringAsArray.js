module.exports = function parseFunctionAsArray(arrayAsString) {
  return (arrayAsString = arrayAsString.split(",").map(tech => tech.trim()));
};
