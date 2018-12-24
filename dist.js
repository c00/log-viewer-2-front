const rimraf = require('rimraf');
const ncp = require('ncp').ncp;
const fs = require('fs');
const path = require("path");
const { execSync } = require('child_process');
const Promise = require('bluebird');


//Parameters
const argv = require('minimist')(process.argv.slice(2));

//Options
const options = {
  api: "../log-viewer-2-api/",
  base: '/log-viewer-2/',
  output: 'dist/',
  ...argv
}

if (options.h || options.help) {
  console.log(`Available options:
  --api     Set the path to the API repo folder.
            Default: ../log-viewer-2-api/
            
  --base    Set the <base href="/"> tag. Make sure to start and end with a forward slash.
            Default: /log-viewer-2/

  --output  Set the output folder for the build
            Default: dist/
  `);

  process.exit(0);
}

console.log("CREATING DIST FOR LOG VIEWER 2");

//Check if API repo exists
if (!fs.existsSync(options.api)) {
  console.error("Api repo doesn't exist (or is not int he right place)");
  console.log("Make sure the path exists: " + path.resolve(options.api));

  process.exit(1);
}

//Delete dist folder
rimraf.sync(options.output);

//Build ng
console.log("Building Angular App...");
execSync(`ng build --output-path "${options.output}/public" --base-href ${options.base} --prod`, { stdio: [0, 1, 2] });
console.log("\nBuild done.");

//Copy api into dist folder
ncp.limit = 16;
ncpOptions = {
  filter: (filename) => (filename.search(/(\/.git|\/.idea|\/settings.json$)/) === -1)
};

//Use promises.
ncp2 = Promise.promisify(ncp);

ncp2(options.api, options.output, ncpOptions)
  .then(() => {
    console.log("Build successful! See: " + path.resolve(options.output));
  })
  .catch(err => {
    console.error(err);
    console.log("Copy went wrong. Exiting...");
    process.exit(1);
  });