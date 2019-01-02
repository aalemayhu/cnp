#!/usr/bin/env node

const version = require("./package.json").version;
const count = require("./lib/count");
const cli = require("cac")();

process.on("SIGINT", () => process.exit(0));

var prettyPrint = function(data, verbose) {
  if (verbose === true) {
    console.log(JSON.stringify(data, null, 2));
  }
  console.log(`${data.length - 1} Dependencies`);
};

cli.option("--package [config]", "Choose the package", {
  default: undefined
});
cli.option("--verbose <verbose", "Show the dependencies", { default: false });
// TODO: support specifying the version

cli.help();
cli.version(version);

const parsed = cli.parse();
const verbose = parsed.options.verbose;

if (parsed.options.package !== undefined) {
  count.dependencyTree(parsed.options.package, res =>
    prettyPrint(res, verbose)
  );
} else {
  parsed.args.forEach(pkg =>
    count.dependencyTree(pkg, res => prettyPrint(res, verbose))
  );
}
