const BaseCommand = require('../../baseCommand');

class MakeDuck extends BaseCommand {
  static get signature() {
    return `
      make:duck
      { name : Name of duck }
    `;
  }

  static get description() {
    return 'Make a duck that holds a reducer, its actions and action creators';
  }

  async handle({ name }) {
    const type = 'duck';

    const targetDir = await this.ensurePathExistsInRoot(`${type}s`);

    this.generateBlueprint({ type: type, name, targetDir });
    this.success(
      `${this.icon('success')} All done. ${this.chalk.bold(
        name
      )} ${type} has been created.`
    );
  }
}

module.exports = MakeDuck;
