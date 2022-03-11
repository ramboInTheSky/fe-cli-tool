const BaseCommand = require('../../baseCommand');

class MakeComposition extends BaseCommand {
  static get signature() {
    return `
      make:composition
      { name : Name of composition }
    `;
  }

  static get description() {
    return 'Make a composition with connect and pre-defined tests';
  }

  async handle({ name }) {
    const type = 'composition';

    const targetDir = await this.ensurePathExistsInRoot(`${type}s`);

    this.generateBlueprint({ type: type, name, targetDir });
    this.success(
      `${this.icon('success')} All done. ${this.chalk.bold(
        name
      )} ${type} has been created.`
    );
  }
}

module.exports = MakeComposition;
