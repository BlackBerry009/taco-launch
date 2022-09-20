const { program } = require('commander');

program.usage('<command>');
program.version(require('../package.json').version);

program
  .command('init')
  .description('init project')
  .action(require('./commands/init'));