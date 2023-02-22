import { program } from 'commander';
import pkg from '../package.json';
import { main } from './init';

program.usage('<command>');
program.version(pkg.version);

program
  .command('init')
  .description('init web/lib project')
  .action(main)
  .parse(process.argv);
