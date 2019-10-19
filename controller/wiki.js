function scrape_wiki(name , cb) {
  console.log('called wiki for', name);
  var res_obj = {'name' : 'some wiki name'};
  setTimeout(function(){
    if(cb)
      cb(res_obj);
  }, 3000);

}

module.exports = {
  scrape_wiki : scrape_wiki
}
