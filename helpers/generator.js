/** Dependencies */
const emoji = require('node-emoji');

const baseUrl = 'http://138.197.195.156:3000/';

function r() {
  return emoji.random().emoji;
}

/** Exports */
module.exports = () => {
  return `${baseUrl}${r()}${r()}${r()}${r()}${r()}`;
};
