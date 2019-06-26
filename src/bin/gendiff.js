#!/usr/bin/env node

import gendiff from 'commander';
import calcDiff from '..';

gendiff
  .version('1.0.3')
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .action((config1, config2) => {
    console.log(calcDiff(config1, config2, gendiff.format));
  })
  .parse(process.argv);
