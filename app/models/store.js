import Ember from 'ember';

var cache = {};
var cacheDateTime = {};  // track the age of the cached data
var max_age = 10.0; //now many minutes old should it be before you stop getting it from the cache

export default Ember.Object.extend({
  find: function(name, id) {
    if (cache[name] && cache[name][id] && cacheDateTime[name] && cacheDateTime[name][id] ) {
      var age_in_minutes = (new Date() - cacheDateTime[name][id]) / (1000 * 60); // the age of the result in the cache in minutes
      console.log('age_in_minutes',age_in_minutes);
      if (age_in_minutes < max_age) {
        console.log('results FROM cache');
        return cache[name][id];
      }
       console.log('results from cache are TOO OLD (max_age='+max_age+' minutes)!! Time to go back to the source.');
    }

    var adapter = this.container.lookup('adapter:' + name);
    return adapter.find(name, id).then(function(record) {
      cache[name] = cache[name] || {};
      cache[name][id] = record;
      cacheDateTime[name] = cacheDateTime[name] || {};
      cacheDateTime[name][id] = new Date();
       console.log('results NOT FROM cache');
      return record;
    });
  }
});