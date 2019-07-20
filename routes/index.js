var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/claim/:id', function (req, res) {
  res.send('claim')
});

router.get('/redeem/:id', function (req, res) {
  res.send('redeem')
});

module.exports = router;
