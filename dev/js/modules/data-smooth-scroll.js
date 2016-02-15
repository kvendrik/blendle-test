var utils = require('../utils'),
	smoothScroll = require('../vendor/smoothscroll.min.js');

module.exports = {

	init: function(){
		this._bindEvents();
	},

	_bindEvents: function(){
		var self = this,
			triggers = document.querySelectorAll('[data-smooth-scroll]');

		utils.each(triggers, function(el){
			utils.onClick(el, self._handleTriggerClick);
		});
	},

	_handleTriggerClick: function(e){
		var selector = this.getAttribute('data-smooth-scroll'),
			duration = this.getAttribute('data-smooth-scroll-duration') || 600,
			el = document.querySelector(selector);

		if(!el) return;
		smoothScroll(el, duration);
	}

};