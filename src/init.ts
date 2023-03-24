import path from 'node:path';
import * as p from '@clack/prompts';
import fse from 'fs-extra';
import logSymbols from 'log-symbols';
import color from 'picocolors';
import { fileURLToPath } from 'node:url';

const getDirName = (filename: string) => {
  const templateDir = path.resolve(
    fileURLToPath(import.meta.url),
    '../../templates',
    `${filename}`,
  );
  return templateDir;
};

export const main = async () => {
  const project = await p.group(
    {
      name: () =>
        p.text({
          message: 'please take a name for your project.',
        }),
      framework: () =>
        p.select({
          message: `Which feature do you want to use?`,
          initialValue: 'react-ts',
          options: [
            { value: 'react-ts', label: 'React' },
            { value: 'vue-ts', label: 'Vue' },
            { value: 'lib', label: 'lib' },
          ],
        }),
    },
    {
      onCancel: () => {
        p.cancel('Operation cancelled.');
        process.exit(0);
      },
    },
  );
  if (fse.pathExistsSync(`${project.name}`)) {
    console.log(
      color.red(logSymbols.error),
      color.red('The project is already exist.'),
    );
    return;
  }
  const s = p.spinner();
  s.start('Creating project...');
  const templateDir = getDirName(`${project.framework}`);
  fse.cp(
    templateDir,
    `./${project.name}`,
    {
      recursive: true,
    },
    (err) => {
      if (err) {
        s.stop(`Creating project failed: ${err}`);
        return;
      }
      s.stop(`Creating project success!`);
      let nextSteps = `cd ${project.name} \n
                pnpm install \n
                pnpm start`;

      p.note(nextSteps, 'Next steps.');

      p.outro(
        `Problems? ${color.underline(
          color.cyan('https://github.com/BlackBerry009/taco-launch'),
        )}`,
      );
    },
  );
};
