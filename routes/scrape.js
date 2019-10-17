const express = require('express');
const router = express.Router();

var twitter = require('../controller/twitter');

router.get('/',function(req,res)
{
  if(false) {
    res.statusCode = 401;
    return res.json({
      error: 'bad request'
    });
  }
  twitter.scrape_twitter('random name',function(res_obj){
    //check 
    if (res_obj.error) {
      console.error(err);
      res.statusCode = 500;
      return res.json({
        error : 'internal server error'
      });
    }
    res.send({'status':'OK'});
  });

});


module.exports = router;
