function scrape_insta(name , cb) {
  console.log('called insta for', name);
  var res_obj = {'name' : 'some insta name'};
  setTimeout(function(){
    if(cb)
      cb(res_obj);
  }, 3000);

}

module.exports = {
  scrape_insta : scrape_insta
}
