const { name, author, version, dependencies, devDependencies } = require('./package.json');

const libraryPackageJson = {
  name,
  author,
  version,
  dependencies: Object.entries(dependencies)
    .reduce((result, [key, value]) => {
      if (!devDependencies[key]) {
        result[key] = value;
      }
      return result;
    }, {}),
}

require('fs').writeFileSync(
  'lib/package.json',
  JSON.stringify(libraryPackageJson, null, 2)
);
