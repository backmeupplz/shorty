const express = require('express');
const router = express.Router();
const db = require('../helpers/db');

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index', {
    ga: process.env.GA,
  });
});

/* GET to long url */
router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  const fullUrl = `https://🔥🦄.ws/${id}`;
  db.findLongAddress(fullUrl)
    .then((long) => {
      if (!long) {
        next();
        return;
      }
      res.writeHead(301, {
        Location: long.original_url,
      });
      res.end();
    })
    .catch(err => next(err));
});

module.exports = router;
