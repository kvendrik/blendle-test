var utils = require('../utils');

module.exports = {

	init: function(){
		this._bindEvents();
	},

	_bindEvents: function(){
		var self = this,
			triggers = document.querySelectorAll('[data-toggle]');

		[].forEach.call(triggers, function(el){
			utils.onClick(el, self._handleTriggerClick);
		});
	},

	_handleTriggerClick: function(){
		var className = this.getAttribute('data-toggle'),
			selector = this.getAttribute('data-toggle-target'),
			el = this;

		if(selector){
			el = document.querySelector(selector);
			if(!el) return;
		}

		el.classList.toggle(className);
	}

};