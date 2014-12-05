import Ember from 'ember';
import ajax from 'ic-ajax';

export default Ember.Object.extend({
  find: function(name, id) {
    //name is the source like 'subreddit'
    // id is used here as the subreddit like 'aww' or 'ruby'
    var url = "http://www.reddit.com/r/"+id+".json";

    // the jquery way
 //    return $.ajax(url, {
 //      dataType: 'json',
 //      type: 'GET',
 //      crossDomain: true
 // })

  //the ic-ajax wrapper way
  return ajax(url, { dataType: 'json' })

  .then(function(result) {
      return result.data.children.map(function(c) {
      return {name: id, //the id passed in at the top find function
              id: c.id,
              title: c.data.title,
              domain: c.data.domain,
              url: c.data.url
            };
    });

 });

  }

});
