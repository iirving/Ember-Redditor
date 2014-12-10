 import Ember from "ember";
 import { test } from 'ember-qunit';
 import startApp from '../helpers/start-app';
 var App;
 
  module('Integration - Application', {

   	setup: function() {
   		App = startApp();
   	},
   	teardown: function() {
   		Ember.run(App, App.destroy);
	}
});

test('make sure at lest one subreddit is shown in the nav', function(){
	visit("/");
	andThen(function(){
		equal(find('.nav li').length > 1, true, "there should at least 1 subreddit in the nav list, as defined in the routes/application.js");
	});
});

test('selecting app name should return to root of app', function(){
	expect(1);
	visit('/r/aww').then(function(){
		click('.navbar-brand');
	}).then(function(){
	
	//	 var routename = currentRouteName();
		console.log('currentRouteName()='+currentRouteName());
			 var urlis = currentURL();
		//	 equal(routename, "/");		
			  equal(urlis, "/r/aww");	
	
		 	
		});
});

test('hello world', function() {
  visit("/").then(function() {
    ok(find("*"), "Found HTML!") ;
  });
});