#!/usr/bin/env node

const chalk = require('chalk');
const ace = require('@adonisjs/ace');

const commands = require('./src/commands');

Object.keys(commands).forEach(command => ace.addCommand(commands[command]));

ace.onError(error => {
  console.log(chalk.red(error.message));
});

ace.wireUpWithCommander();
ace.invoke();
