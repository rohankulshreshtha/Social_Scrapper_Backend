function scrape_twitter(name , cb) {
  console.log('called twitter for', name);
  var res_obj = {'name' : 'some twitter name'};
  setTimeout(function(){
    if(cb)
      cb(res_obj);
  }, 3000);

}

module.exports = {
  scrape_twitter : scrape_twitter
}
