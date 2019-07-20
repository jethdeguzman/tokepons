var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.render('coupons', { active: 'coupons' });
});

router.get('/:id', function (req, res) {
  const redeemLink = 'http://localhost:3000/redeem/' + req.params.id
  const qrLink = "https://chart.googleapis.com/chart?cht=qr&chl=" + redeemLink + "&choe=UTF-8&chs=500x500"
  res.render('coupon', { navTitle: "Redeem Coupon", qrLink })
});

module.exports = router;
