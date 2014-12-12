import Ember from 'ember';

var cache = {};
var cacheDateTime = {};  // track the age of the cached data
//now many minutes old should it be before you stop getting it from the cache, 
//in dev this should be short in prodiction it should be long (an hour?)
var MAX_AGE = 1.0; 


function putInCache(name, id, record){
    console.log('adding record to cache');
    cache[name] = cache[name] || {};
    cache[name][id] = record;
    cacheDateTime[name] = cacheDateTime[name] || {};
    cacheDateTime[name][id] = new Date();
    return true;
}

function getFromCache(name, id){
   console.log('getting record for cache');
    return cache[name][id];
}

function isCached(name, id){
  if (cache[name] && cache[name][id] && cacheDateTime[name] && cacheDateTime[name][id]) {
    var age_in_minutes = (new Date() - cacheDateTime[name][id]) / (1000 * 60);
      // the age of the result in the cache in minutes
    console.log('age_in_minutes', age_in_minutes);
    if (age_in_minutes < MAX_AGE) {
      return true;
    }
    console.log('results from cache are TOO OLD (max_age=' + MAX_AGE + ' minutes)!! Time to go back to the source.');
  }
      return false;
}


export default Ember.Object.extend({
  find: function(name, id) {
    if (isCached(name, id)) {
      return getFromCache(name, id);
    }

    var adapter = this.container.lookup('adapter:' + name);
    return adapter.find(name, id).then(function(record) {
       putInCache(name, id, record);
       console.log('results NOT FROM cache');
      return record;
    });
  }
});