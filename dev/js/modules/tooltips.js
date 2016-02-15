var utils = require('../utils');

module.exports = {

	init: function(){
		this._bindEvents();
	},

	_bindEvents: function(){
		var tooltipTriggers = document.querySelectorAll('[data-tooltip-trigger]');

		utils.each(tooltipTriggers, function(el){
			var tooltip = el.getElementsByClassName('tooltip')[0];
			el.addEventListener('mouseenter', function(){
				utils.addVisibleClasses(tooltip, 'tooltip');
			}, false);
			el.addEventListener('mouseleave', function(){
				utils.removeVisibleClasses(tooltip, 'tooltip');
			}, false);
		});
	}
	
};