import { program } from 'commander';
import pkg from '../package.json';
import { main } from './init.ts';

program.usage('<command>');
program.version(pkg.version);

program
  .command('init')
  .description('init project')
  .action(main)
  .parse(process.argv);
