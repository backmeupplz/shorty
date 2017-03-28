const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const addressSchema = new Schema({
  original_url: {
    type: String,
    required: true,
  },
  short_url: {
    type: String,
    required: true,
  }
}, { timestamps: true });

mongoose.model('address', addressSchema);
