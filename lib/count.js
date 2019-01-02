const packageJson = require("pkg.json");

var dependencies = [];

var resolveTree = function(pkg, cb) {
  packageJson(pkg, function(err, data) {
    const versionKeys = Object.keys(data.versions);
    const lastKey = versionKeys[versionKeys.length - 1];
    if (!dependencies.includes(pkg)) {
      dependencies.push(pkg);
      const depends = data.versions[lastKey].dependencies;
      for (var dep in depends) {
        if (!dependencies.includes(dep)) {
          dependencies.push(dep);
          resolveTree(dep, () => {});
        }
      }
    }
    cb();
  });
};

var dependencyTree = function(pkg, cb) {
  resolveTree(pkg, () => {
    cb(dependencies);
  });
};

module.exports = {
  dependencyTree
};
