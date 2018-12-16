const rimraf = require('rimraf');
const ncp = require('ncp').ncp;
const fs = require('fs');
const path = require("path");
const { execSync } = require('child_process');

//Constants that should maybe be configurable
const apiRepoPath = "../log-viewer-2-api/";
const base = '/big-butt/log-viewer-2/';
const output = 'dist/';

console.log("CREATING DIST FOR LOG VIEWER 2");

//Check if API repo exists
if (!fs.existsSync(apiRepoPath)) {
  console.error("Api repo doesn't exist (or is not int he right place)");
  console.log("Make sure the path exists: " + path.resolve(apiRepoPath));

  process.exit(1);
}

//Delete dist folder
rimraf.sync(output);

//Build ng
console.log("Building Angular App...");
execSync(`ng build --output-path "${output}/public" --base-href ${base} --prod`, { stdio: [0, 1, 2] });
console.log("\nBuild done.");

//Copy api into dist folder
ncp.limit = 16;
options = {
  filter: (filename) => (filename.search(/(\/.git|\/.idea|\/settings.json$)/) === -1)
};

ncp(apiRepoPath, output, options, (err) => {
  if (err) {
    console.error(err);
    console.log("Copy went wrong. Exiting...");
    return;
  }

  console.log("Api copied!");

  console.log("Build successful! See: " + path.resolve(output));
});