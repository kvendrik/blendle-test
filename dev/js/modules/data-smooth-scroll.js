var smoothScrollTo = require('../vendor/smooth-scroll-to');

module.exports = {

	init: function(){
		this._bindEvents();
	},

	_bindEvents: function(){
		var self = this,
			triggers = document.querySelectorAll('[data-smooth-scroll]');

		[].forEach.call(triggers, function(el){
			el.addEventListener('click', self._handleTriggerClick, false);
		});
	},

	_handleTriggerClick: function(e){
		var selector = this.getAttribute('data-smooth-scroll'),
			duration = this.getAttribute('data-smooth-scroll-duration') || 600,
			el = document.querySelector(selector);

		if(!el) return;

		var offsetTop = el.offsetTop;
		smoothScrollTo(document.body, offsetTop, duration);
	}

};