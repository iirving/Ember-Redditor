import Ember from 'ember';
import SubredditAdapter from 'emredit/adapters/subreddit';

export default Ember.Route.extend({
  model: function(params) {
//    return {id: params.subreddit_id, hello: 'world'};
  var adapter = SubredditAdapter.create();
  return adapter.find('subreddit', params.subreddit_id);
 }
});
