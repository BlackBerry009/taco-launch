import * as p from '@clack/prompts';
import fse from 'fs-extra';
import logSymbols from 'log-symbols';
import color from 'picocolors';

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
      variant: () =>
        p.select({
          message: 'Which types you wanna choose?',
          options: [
            { value: 'ts', label: 'ts' },
            { value: 'js', label: 'js' },
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
  }
  if (project.framework === 'vue') {
    console.log(
      color.red(logSymbols.error),
      color.red('not have vue boilerplate yet...'),
    );
  }
};
