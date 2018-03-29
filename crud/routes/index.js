var express = require('express');
var router = express.Router();

// define the home page route
router.get('/', function(req, res) {
  res.send('Hello World, Index Home Page');
});
module.exports = router;