var express = require('express');
var router = express.Router();
var events = require('./../data/events.json')

router.get('/', function (req, res, next) {
  res.render('events', { active: 'events', events });
});

router.get('/:id', function (req, res) {
  const claimLink = 'http://' + process.env.EXTERNAL_IP + ':3000/claim/' + req.params.id
  const qrLink = "https://chart.googleapis.com/chart?cht=qr&chl=" + claimLink + "&choe=UTF-8&chs=500x500"
  res.render('event', { navTitle: "Claim Coupon", navLink: "/events", qrLink })
});

module.exports = router;
