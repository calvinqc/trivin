import chalk from 'chalk';

import fs from 'fs';
import ncp from 'ncp';
import path from 'path';

import { promisify } from 'util';

import execa from 'execa';
import Listr from 'listr';
import { projectInstall } from 'pkg-install';
import { fileURLToPath } from 'url';

const { readdirSync, statSync } = require('fs');
const { join } = require('path');
const access = promisify(fs.access);
const copy = promisify(ncp);

/**
 * Initialize git to the directory
 * @param {Object} options
 */
async function initGit(options) {
  const result = await execa('git', ['init'], {
    cwd: options.targetDirectory,
  });

  if (result.failed) {
    return Promise.reject(new Error('Failed to initialize Git'));
  }
  return;
}

/**
 * Copy all folders & templates into the target directory
 * @param {Object} options
 */
async function copyTemplateFiles(options) {
  return copy(options.templateDirectory, options.targetDirectory, {
    clobber: false,
  });
}

/**
 * Main function that will do all the work
 * @param {Object} options
 */
export async function createProject(options) {
  options = {
    ...options,
    targetDirectory: options.targetDirectory || process.cwd(),
  };

  const currentFileURL = dirname(fileURLToPath(import.meta.url));

  const templateDir = path.resolve(
    new URL(currentFileURL).pathname,
    '../../templates',
    options.template.toLowerCase()
  );

  options.templateDirectory = templateDir;

  const dirs = p =>
    readdirSync(p).filter(f => statSync(join(p, f)).isDirectory());

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
      title: `Install all dependencies. This might take a few minutes.`,
      task: async () => {
        for (const dir of dirs(templateDir)) {
          await projectInstall({
            cwd: dir,
          });
        }
      },

      skip: () =>
        !options.runInstall
          ? 'Pass -- install to automatically install all dependencies for the project'
          : undefined,
    },
  ]);

  await tasks.run().then(() => {
    console.log(`Initialized ${options.template} project.`);
    copyTemplateFiles(options);
    console.log('%s Project ready', chalk.green.bold('DONE'));
  });
}
