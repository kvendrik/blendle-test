var utils = require('../utils');

module.exports = {

	init: function(){
		this._bindEvents();
	},

	_bindEvents: function(){
		var self = this,
			triggers = document.querySelectorAll('[data-share]');
		
		utils.each(triggers, function(el){
			utils.onClick(el, self._handleShareClick);
		});
	},

	_handleShareClick: function(platform){
		var platformName = this.getAttribute('data-share'),
			shareDesc = this.getAttribute('data-share-desc'),
			shareUrl = this.getAttribute('data-share-url');

		var winH = 350,
			winW = 520;

		var openUrl = function(url, name){
			window.open(url, name, 'top='+((window.innerHeight/2) - (winH/2))+',left='+((window.innerWidth/2) - (winW/2))+',toolbar=0,status=0,width='+winW+',height='+winH);
		};

		switch(platformName){
			case 'twitter':
				openUrl('https://twitter.com/intent/tweet?text='+shareDesc+' '+shareUrl, 'Twitter');
				break;
			case 'facebook':
				openUrl('http://www.facebook.com/sharer.php?s=100&p[title]=Blendle&p[summary]='+shareDesc+'&p[url]='+shareUrl, 'Facebook');
				break;
			case 'linkedin':
				openUrl('https://www.linkedin.com/shareArticle?mini=true&url='+shareUrl+'&summary='+shareDesc);
				break;
		}
	}
	
};