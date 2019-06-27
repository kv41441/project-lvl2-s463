import yaml from 'js-yaml';

const fileTypes = {
  '.json': JSON.parse,
  '.yaml': yaml.safeLoad,
  '.yml': yaml.safeLoad,
};

const parseConfigData = (data, fileType) => {
  if (!fileTypes[fileType]) {
    throw new Error('Wrong file type');
  }

  return fileTypes[fileType](data);
};

export default parseConfigData;
