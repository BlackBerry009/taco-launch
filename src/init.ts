import path from 'node:path';
import * as p from '@clack/prompts';
import fse from 'fs-extra';
import logSymbols from 'log-symbols';
import color from 'picocolors';
import { fileURLToPath } from 'node:url';

const getDirName = (filename: string) => {
  const templateDir = path.resolve(
    fileURLToPath(import.meta.url),
    '../..',
    `template-${filename}`,
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
          message: `Which framework do you want to use?`,
          options: [
            { value: 'react', label: 'React' },
            { value: 'vue', label: 'Vue' },
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
  if (project.framework === 'react') {
    if (fse.pathExistsSync(`${project.name}`)) {
      console.log(
        color.red(logSymbols.error),
        color.red('The project is already exist.'),
      );
      return;
    }
    const s = p.spinner();
    s.start('Creating project...');
    const templateDir = getDirName('react-ts');
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
            color.cyan(
              'https://github.com/BlackBerry009/create-boilerplate-cli/issues',
            ),
          )}`,
        );
      },
    );
  }
  if (project.framework === 'vue') {
    console.log(
      color.red(logSymbols.error),
      color.red('not have vue boilerplate yet...'),
    );
  }
};
