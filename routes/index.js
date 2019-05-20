var express = require('express');
var router = express.Router();

/* GET home page. */
router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


router.use('/list',require('./list/index'));
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
