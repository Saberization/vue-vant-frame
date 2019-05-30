const path = require('path');
const utils = require('./utils');
const entries = utils.getMultiFile(path.resolve(__dirname, '../src/pages/**/main.js'));
const templates = utils.getMultiFile(path.resolve(__dirname, '../src/pages/**/index.html'));
const showCaseEntries = utils.getMultiFile(path.resolve(__dirname, '../src/showcase/**/main.js'));
const showCaseTemplates = utils.getMultiFile(path.resolve(__dirname, '../src/showcase/**/index.html'));
const ENV = process.env.NODE_ENV;
const isDevBuildShowcase = 1;
const isProBuildShowcase = 0;

const generatePages = function () {
  const pages = {};

  if (entries && Array.isArray(entries)) {
    entries.forEach((entry, index) => {
      const dir = utils.getDirectoryName(entry);
      const template = templates[index];

      pages[dir] = {
        entry: entry,
        template: template || 'public/index.html',
        filename: `${dir}.html`
      };
    });

    if (isProBuildShowcase && Array.isArray(showCaseEntries)) {
      showCaseEntries.forEach((entry, index) => {
        const dir = utils.getDirectoryName(entry);
        const template = showCaseTemplates[index];
  
        pages[dir] = {
          entry: entry,
          template: template,
          filename: `${dir}.html`
        };
      });
    }
  }

  if (ENV === 'development' && isDevBuildShowcase && showCaseEntries && Array.isArray(showCaseEntries)) {
    showCaseEntries.forEach((entry, index) => {
      const dir = utils.getDirectoryName(entry);
      const template = showCaseTemplates[index];

      pages[dir] = {
        entry: entry,
        template: template,
        filename: `${dir}.html`
      };
    });
  }

  return pages;
};

module.exports = generatePages();
