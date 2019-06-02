#!/usr/bin/env node

const gendiff = require('commander');

gendiff
  .version('1.0.0')
  .arguments('[options] <firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format');
