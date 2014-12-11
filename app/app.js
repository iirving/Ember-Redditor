import Ember from 'ember';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';
import config from './config/environment';

Ember.MODEL_FACTORY_INJECTIONS = true;

var App = Ember.Application.extend({
	//DEBUGING FLAGS
	LOG_TRANSITIONS: true,
	// LOG_TRANSITIONS_INTERNAL: true,
	// LOG_RESOLVER: true,
	// LOG_BINDINGS: true,
	// LOG_VIEW_LOOKUPS: true,
	// LOG_ACTIVE_GENERATION: true,
	// LOG_STRACKTRACE_ON_DEPRECATION: true,

	modulePrefix: config.modulePrefix,
	podModulePrefix: config.podModulePrefix,
	Resolver: Resolver
});

loadInitializers(App, config.modulePrefix);

export default App;
