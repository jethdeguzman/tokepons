var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.render('events', { active: 'events' });
});

router.get('/:id', function (req, res) {
  res.render('event', { navTitle: "Claim Coupon" })
});

module.exports = router;
