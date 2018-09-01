/// @ts-check
const path = require("path");

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

var outFile = path.join(__dirname, "build/Main.js");

module.exports = {
  entry: "src/WebGenerator.fsproj",
  outDir: path.dirname(outFile),
  babel: {
    plugins: ["@babel/plugin-transform-modules-commonjs"]
  },
  postbuild() {
    // runScript(outFile)
  }
};