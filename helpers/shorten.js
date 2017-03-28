/** Dependencies */
const db = require('./db');
const generator = require('./generator');

function shorten(address) {
 return new Promise((resolve, reject) => {
  db.findAddress(address)
    .then((dbaddress) => {
      if (dbaddress) {
        return dbaddress.short_url;
      }
      const generatedAddress = generator();
      return db.saveAddress({
        original_url: address,
        short_url: generatedAddress,
      }).then((newAddress) => {
        return newAddress.short_url;
      });
    })
    .then((shortUrl) => {
      resolve(shortUrl);
    })
    .catch(reject);
 });
}

/** Exports */
module.exports = {
  shorten,
};
