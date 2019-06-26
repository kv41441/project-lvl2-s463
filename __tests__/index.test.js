import fs from 'fs';
import path from 'path';
import calcDiff from '../src';

const pathToTests = './__tests__/__fixtures__/';

test.each([['before1.json', 'after1.json', 'expected1.txt']])(
  'calcDiff %#',
  (configFileName1, configFileName2, expectedFileName, outputFormat = 'pretty') => {
    const before = path.join(pathToTests, configFileName1);
    const after = path.join(pathToTests, configFileName2);
    const actual = calcDiff(before, after, outputFormat);
    const expected = fs.readFileSync(path.join(pathToTests, expectedFileName), 'utf-8');

    expect(actual).toBe(expected);
  },
);
