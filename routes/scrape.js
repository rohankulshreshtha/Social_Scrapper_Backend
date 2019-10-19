const express = require('express');
const router = express.Router();
const async = require('async');

var twitter = require('../controller/twitter');
var insta = require('../controller/insta');
var wiki = require('../controller/wiki');

router.get('/twitter',function(req,res)
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

router.get('/instagram',function(req,res)
{
  if(false) {
    res.statusCode = 401;
    return res.json({
      error: 'bad request'
    });
  }
  insta.scrape_insta('random name',function(res_obj){
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

router.get('/wikipedia',function(req,res)
{
  if(false) {
    res.statusCode = 401;
    return res.json({
      error: 'bad request'
    });
  }
  wiki.scrape_wiki('random name',function(res_obj){
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

router.get('/combined',function(req,res)
{
  if(false) {
    res.statusCode = 401;
    return res.json({
      error: 'bad request'
    });
  }
  var count = 0, total = 3;
  var final_res_obj = {};
  // async.waterfall([
  //       twitter.scrape_twitter('random name',function(res_obj){}),
  //       insta.scrape_insta('random name',function(res_obj){}),
  //       wiki.scrape_wiki('random name',function(res_obj){})
  //   ],function asyncComplete(err) { // the "complete" callback of `async.waterfall`
  //       if ( err ) { // there was an error with either `getTicker` or `writeTicker`
  //           console.warn('Error updating stock ticker JSON.',err);
  //       } else {
  //           console.info('Successfully completed operation.');
  //           res.send({'status':'OK'});
  //       }
  //   });
  function callback_util(param,res_obj) {
    final_res_obj[param] = res_obj;
    count++;
    if(count === total) {
      console.log(final_res_obj);
      res.send({'status':'OK'});
    }
  }
  twitter.scrape_twitter('random name',function(res_obj){callback_util('twitter',res_obj);});
  insta.scrape_insta('random name',function(res_obj){callback_util('insta',res_obj);});
  wiki.scrape_wiki('random name',function(res_obj){callback_util('wiki',res_obj);});



});


module.exports = router;
