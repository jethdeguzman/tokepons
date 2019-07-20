var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.render('events', { active: 'events' });
});

module.exports = router;
