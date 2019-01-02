#!/usr/bin/env node

const version = require("./package.json").version;
const count = require("./lib/count");
const cli = require("cac")();

process.on("SIGINT", () => process.exit(0));

cli.option("--package [config]", "Choose the package", {
  default: undefined
});

cli.help();
cli.version(version);

const parsed = cli.parse();

var dependencyTree = [];
if (parsed.options.package !== undefined) {
  dependencyTree = count.dependencyTree(parsed.options.package);
} else {
  parsed.args.forEach(pkg => {
    dependencyTree += count.dependencyTree(pkg);
  });
}

console.log(JSON.stringify(dependencyTree, null, 2));
