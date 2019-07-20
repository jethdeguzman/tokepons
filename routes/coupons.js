var express = require('express');
var router = express.Router();
var Coupon = new require('./../lib');

router.get('/', function (req, res, next) {
  Coupon.tokensOfCustomer().then((tokens) => {
    res.render('coupons', { active: 'coupons' });
  });

});

router.get('/:id', function (req, res) {
  const redeemLink = 'http://localhost:3000/redeem/' + req.params.id
  const qrLink = "https://chart.googleapis.com/chart?cht=qr&chl=" + redeemLink + "&choe=UTF-8&chs=500x500"
  res.render('coupon', { navTitle: "Redeem Coupon", qrLink })
});

module.exports = router;
