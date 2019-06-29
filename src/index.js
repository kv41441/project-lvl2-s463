import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parseConfigData from './parsers';

const calcDiff = (filepath1, filepath2) => {
  const configData1 = parseConfigData(fs.readFileSync(filepath1, 'utf-8'), path.extname(filepath1));
  const configData2 = parseConfigData(fs.readFileSync(filepath2, 'utf-8'), path.extname(filepath2));
  const configKeys1 = Object.keys(configData1);
  const configKeys2 = Object.keys(configData2);
  const configKeys = _.union(configKeys1, configKeys2);
  const configDataAfter = { ...configData1, ...configData2 };

  const result = configKeys.reduce((acc, key) => {
    if (_.has(configData1, key) && _.has(configData2, key)
      && (configData1[key] !== configData2[key])) {
      const str1 = `- ${key}: ${configData1[key]}`;
      const str2 = `+ ${key}: ${configData2[key]}`;
      return [...acc, str1, str2];
    }
    if (!(_.has(configData1, key)) && _.has(configData2, key)) {
      const str = `+ ${key}: ${configDataAfter[key]}`;
      return [...acc, str];
    }
    if (_.has(configData1, key) && !(_.has(configData2, key))) {
      const str = `- ${key}: ${configDataAfter[key]}`;
      return [...acc, str];
    }
    const str = `    ${key}: ${configDataAfter[key]}`;
    return [...acc, str];
  }, '');
  const result2 = `{\n${result.join('\n  ')}\n}`;

  return result2;
};

export default calcDiff;
