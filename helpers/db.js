/** Dependencies */
const mongoose = require('mongoose');

/** Get schemas */
const Address = mongoose.model('address');

function findAddress(address) {
  return Address.findOne({ original_url: address });
}

function findLongAddress(short) {
  return Address.findOne({ short_url: short });
}

function saveAddress(address) {
  const newAddress = new Address(address);
  return newAddress.save();
}

/** Exports */
module.exports = {
  findAddress,
  findLongAddress,
  saveAddress,
};
