const path = require('path');
const utils = require('./utils');
const entries = utils.getMultiFile(path.resolve(__dirname, '../src/pages/**/*.js'));
const templates = utils.getMultiFile(path.resolve(__dirname, '../src/pages/**/*.html'));
const showCaseEntries = utils.getMultiFile(path.resolve(__dirname, '../src/showcase/**/*.js'));
const showCaseTemplates = utils.getMultiFile(path.resolve(__dirname, '../src/showcase/**/*.html'));
const ENV = process.env.NODE_ENV;

const generatePages = function () {
  const pages = {};

  if (entries && Array.isArray(entries) && entries.length > 1) {
    entries.forEach((entry, index) => {
      const dir = utils.getDirectoryName(entry);
      const template = templates[index];

      pages[dir] = {
        entry: entry,
        template: template || path.resolve(__dirname, '../public/index.html'),
        filename: dir + '.html'
      };
    });
  }

  if (ENV === 'development' && showCaseEntries && Array.isArray(showCaseEntries)) {
    showCaseEntries.forEach((entry, index) => {
      const dir = utils.getDirectoryName(entry);
      const template = showCaseTemplates[index];

      pages[dir] = {
        entry: entry,
        template: template,
        filename: dir + '.html'
      };
    });
  }

  return pages;
};

module.exports = generatePages();
