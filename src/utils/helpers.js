const fs = require('fs');
const path = require('path');
const mustache = require('mustache');

const paths = {
  templates: path.resolve(__dirname, '../generators/templates'),
};

const getParentFolder = dir => path.dirname(dir);

const fileExists = file => fs.existsSync(file);

const findInAncestors = (needle, currentFolder) => {
  const lookFor = path.join(currentFolder, needle);

  if (fileExists(lookFor)) {
    return path.resolve(lookFor);
  }

  if (currentFolder !== '/') {
    return findInAncestors(needle, getParentFolder(currentFolder));
  }

  return null;
};

const findRoot = (determinant = 'src') =>
  findInAncestors(determinant, process.cwd());

const readFile = file => fs.readFileSync(file, 'utf-8');

const readDir = dir => fs.readdirSync(dir);

const getTemplatesPath = templateFor =>
  path.resolve(paths.templates, templateFor);

const makeDirectory = dir => fs.mkdirSync(dir);

const handleFile = (readDir, writeDir, data, file) => {
  const contents = readFile(path.resolve(readDir, file));
  fs.writeFileSync(
    path.join(writeDir, file.replace('mustache', 'js')),
    mustache.render(contents, data)
  );
};

module.exports = {
  fileExists,
  findRoot,
  getTemplatesPath,
  handleFile,
  makeDirectory,
  readDir,
};
