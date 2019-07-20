var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.render('coupons', { active: 'coupons' });
});

module.exports = router;
