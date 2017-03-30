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
      return getShortUrl(address)
        .then((generatedAddress) => {
          return db.saveAddress({
            original_url: address,
            short_url: generatedAddress,
          }).then((newAddress) => {
            return newAddress.short_url;
          });
        });
    })
    .then((shortUrl) => {
      resolve(shortUrl);
    })
    .catch(reject);
 });
}

function getShortUrl(longUrl) {
  const generatedAddress = generator();
  return db.findLongAddress(generatedAddress)
    .then((add) => {
      if (add) {
        return getShortUrl(longUrl);
      }
      return generatedAddress;
    })
}

/** Exports */
module.exports = {
  shorten,
};
