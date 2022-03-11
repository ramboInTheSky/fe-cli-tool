const BaseCommand = require('../../baseCommand');

class MakeComponent extends BaseCommand {
  static get signature() {
    return `
      make:component
      { name : Name of component }
    `;
  }

  static get description() {
    return 'Make a component with a pre-defined test';
  }

  async handle({ name }) {
    const type = 'component';

    const targetDir = await this.ensurePathExistsInRoot(`${type}s`);

    this.generateBlueprint({ type: type, name, targetDir });
    this.success(
      `${this.icon('success')} All done. ${this.chalk.bold(
        name
      )} ${type} has been created.`
    );
  }
}

module.exports = MakeComponent;
