var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.render('coupons', { active: 'coupons' });
});

router.get('/:id', function (req, res) {
  res.render('coupon', { navTitle: "Redeem Coupon" })
});

module.exports = router;
