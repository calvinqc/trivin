import chalk from 'chalk';

import fs from 'fs';
import ncp from 'ncp';
import path from 'path';

import { promisify } from 'util';

import execa from 'execa';
import Listr from 'listr';
import { projectInstall } from 'pkg-install';

const access = promisify(fs.access);
const copy = promisify(ncp);

async function initGit(options) {
  const result = await execa('git', ['init'], {
    cwd: options.targetDirectory,
  });

  if (result.failed) {
    return Promise.reject(new Error('Failed to initialize Git'));
  }
  return;
}

async function copyTemplateFiles(options) {
  return copy(options.templateDirectory, options.targetDirectory, {
    clobber: false,
  });
}

export async function createMern(options) {
  options = {
    ...options,
    targetDirectory: options.targetDirectory || process.cwd(),
  };

  const currentFileURL = import.meta.url;
  const templateDir = path.resolve(
    new URL(currentFileURL).pathname,
    '../../templates',
    options.template.toLowerCase()
  );
  options.templateDirectory = templateDir;

  try {
    await access(templateDir, fs.constants.R_OK);
  } catch (e) {
    console.error('%s Invalid template name', chalk.red.bold('ERROR'));
    process.exit(1);
  }

  const tasks = new Listr([
    {
      title: 'Copy Project files',
      task: () => copyTemplateFiles(options),
    },
    {
      title: 'Initialize git',
      task: () => initGit(options),
      enabled: () => options.git,
    },
    {
      title: 'Install dependencies',
      task: () =>
        projectInstall({
          cwd: options.targetDirectory,
        }),
      skip: () =>
        !options.runInstall
          ? 'Pass -- install to automatically install all dependencies for the project'
          : undefined,
    },
  ]);

  await tasks.run();

  console.log(
    'Initialized M.E.R.N project with MongoDB Atlas/Google App Engine setup'
  );
  await copyTemplateFiles(options);
  console.log('%s Project ready', chalk.green.bold('DONE'));
}
