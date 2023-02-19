import * as p from '@clack/prompts';
import fse from 'fs-extra';
import logSymbols from 'log-symbols';
import color from 'picocolors';

const REACT_REPO = 'BlackBerry009/boilerplate-project-react#main';

export const main = async () => {
  console.log('main');
  const project = await p.group(
    {
      type: () =>
        p.select({
          message: `Which framework do you want to use？`,
          options: [
            { value: 'react', label: 'React' },
            { value: 'vue2', label: 'Vue2' },
          ],
        }),
      name: () =>
        p.text({
          message: 'please take a name for your project.',
        }),
    },
    {
      onCancel: () => {
        p.cancel('Operation cancelled.');
        process.exit(0);
      },
    },
  );
  if (project.type === 'react') {
    if (fse.pathExistsSync(`${project.name}`)) {
      console.log(
        color.red(logSymbols.error),
        color.red('The project is already exist.'),
      );
      return;
    }
  }
  if (project.type === 'vue2') {
    console.log(
      color.red(logSymbols.error),
      color.red('not have vue boilerplate yet...'),
    );
  }
};