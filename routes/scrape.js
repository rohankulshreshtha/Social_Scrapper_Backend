const express = require('express');
const router = express.Router();

var twitter = require('../controller/twitter');

router.get('/',function(req,res)
{

  twitter.scrape_twitter('random name',function(){
    res.send({'status':'OK'});
  });

});


module.exports = router;
