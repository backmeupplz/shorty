const express = require('express');
const shorten = require('../helpers/shorten');
const db = require('../helpers/db');
const validUrl = require('valid-url');

const router = express.Router();

/* Create new short url */
router.post('/', (req, res, next) => {
  const longUrl = req.body.long_url;

  if (!longUrl || !validUrl.isUri(longUrl)) {
    res.send({ success: false });
    return;
  }
  shorten.shorten(longUrl)
    .then(resultUrl => res.send({
      success: true,
      result: resultUrl,
    }))
    .catch(err => next(err));
});

module.exports = router;
