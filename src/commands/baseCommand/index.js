const { join } = require('path');
const { Command } = require('@adonisjs/ace');
const {
  fileExists,
  findRoot,
  getTemplatesPath,
  handleFile,
  makeDirectory,
  readDir,
} = require('../../utils/helpers');

module.exports = class Base extends Command {
  async ensurePathExistsInRoot(folder, { determinant = 'src' } = {}) {
    const rootDir = findRoot(determinant);

    // try to resolve the root directory
    if (!rootDir) {
      throw new Error(
        `${this.icon('error')} Could not locate the project root directory`
      );
    }

    const targetDir = join(rootDir, folder);

    // try to resolve the desired directory
    if (!fileExists(targetDir)) {
      this.warn(
        `${this.icon('warn')} ${this.chalk.bold(
          join(rootDir, folder)
        )} does not exist, attempting to create it`
      );

      makeDirectory(targetDir);
    }

    return targetDir;
  }

  generateBlueprint({ type, targetDir, ...data }) {
    const subjectDirectory = join(targetDir, data.name);

    if (fileExists(subjectDirectory)) {
      throw new Error(`Whoops, looks like ${data.name} ${type} already exists`);
    }

    if (!fileExists(subjectDirectory)) {
      makeDirectory(subjectDirectory);
    }

    const templatesPath = getTemplatesPath(type);

    readDir(templatesPath).forEach(file =>
      handleFile(templatesPath, subjectDirectory, data, file)
    );
  }
};
