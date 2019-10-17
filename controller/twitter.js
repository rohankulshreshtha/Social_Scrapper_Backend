function scrape_twitter(name , cb) {
  console.log('called twitter for', name);
  setTimeout(function(){
    if(cb)
      cb();
  }, 3000);

}

module.exports = {
  scrape_twitter : scrape_twitter
}
