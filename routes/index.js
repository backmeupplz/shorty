const express = require('express');
const router = express.Router();
const db = require('../helpers/db');

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

/* GET to long url */
router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  const fullUrl = `http://138.197.195.156:3000/${id}`;
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
