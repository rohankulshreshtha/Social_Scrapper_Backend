var Twitter = require('twitter');
var config = require('./config.js');
var T = new Twitter(config);

// Set up your search parameters
var params = {
  count: 1
}

function scrape_twitter(name , cb) {
  console.log('called twitter for', name);
	params.q = name;
  // Initiate your search using the above paramaters
  T.get('users/search.json', params, function(err, data, response) {
    // If there is no error, proceed
    if(!err){
  		// Initiate your search using the above paramaters
  		T.get('statuses/user_timeline', {screen_name: data[0].screen_name , count: 10}, function(err, data, response) {
  		  // If there is no error, proceed
  		  if(!err){
          if(cb)
            cb(data);
  		  } else {
  		    console.log(err);
  		  }
  		})
    } else {
      console.log(err);
    }
  })


}

module.exports = {
  scrape_twitter : scrape_twitter
}
