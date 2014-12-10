 import Ember from "ember";
 import { test } from 'ember-qunit';
 import startApp from '../helpers/start-app';
 var App;
 
  module('Integration - subreddit', {
   setup: function() {
     App = startApp();
   },
   teardown: function() {
     Ember.run(App, App.destroy);
	 }
 });


test('go to a subreddit and make sure the title is right',function(){
	var subreddit_test = "aww";
	visit('/r/'+subreddit_test);
	andThen(function(){
		var title = find('.subredit-heading');
		equal(title.text(),'current listings for '+ subreddit_test,'subreddit title for '+subreddit_test+' is '+title.text());
	});
});

test('go to the aww subreddit and there should be more than 2 item results are display',function(){
	visit('/r/ruby');
	andThen(function(){
		var results = find('li.subredit-items');
		equal(results.length > 2, true, "number of results is " + results.length);
	});
});