/// @ts-check
const path = require("path");
const fableUtils = require("fable-utils");

function resolve(filePath) {
  return path.resolve(__dirname, filePath)
}

function runScript(scriptPath) {
  var scriptDir = path.dirname(scriptPath);
  // Delete files in directory from require cache
  Object.keys(require.cache).forEach(function(key) {
    if (key.startsWith(scriptDir))
      delete require.cache[key]
  })
  try {
    require(scriptPath);
  }
  catch (err) {
    console.error(err);
  }
}

var outFile = resolve("build/Main.js");

module.exports = {
  entry: resolve("src/WebGenerator.fsproj"),
  outDir: path.dirname(outFile),
  babel: fableUtils.resolveBabelOptions({
    plugins: ["transform-es2015-modules-commonjs"]
  }),
  fable: { define: ["DEBUG"] },
  postbuild() { runScript(outFile) }
};