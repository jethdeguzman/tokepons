var express = require('express');
var router = express.Router();
var Coupon = new require('./../lib')

router.get('/', function (req, res, next) {
  res.redirect('/events')
});

router.get('/claim/:id', function (req, res) {
  Coupon.transferToCustomer(req.params.id).then((resp) => {
    res.send(resp.hash)
  });
});

router.get('/redeem/:id', function (req, res) {
  Coupon.redeem(req.params.id).then((resp) => {
    res.send(resp.hash)
  });
});

module.exports = router;
