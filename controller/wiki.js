const request = require('request');

function scrape_wiki(name , cb) {
  console.log('called wiki for', name);
  var res_obj = {'name' : 'some wiki name'};
  request('https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=Narendra%20Modi', function(err, res, body) {
    if(cb)
      cb(body);
  });
  

}

module.exports = {
  scrape_wiki : scrape_wiki
}
