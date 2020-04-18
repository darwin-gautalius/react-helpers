const { name, author, version, repository, dependencies, devDependencies } = require('./package.json');

const libraryPackageJson = {
  name,
  author,
  version,
  repository,
  dependencies: Object.entries(dependencies)
    .reduce((result, [key, value]) => {
      if (!devDependencies[key]) {
        result[key] = value;
      }
      return result;
    }, {}),
}

require('fs').writeFileSync(
  'maid/package.json',
  JSON.stringify(libraryPackageJson, null, 2)
);
