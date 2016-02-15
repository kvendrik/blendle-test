var utils = require('../utils');

module.exports = {

	init: function(){
		var lightbox = this._lightbox = document.getElementById('js-lightbox');
		this._lightboxImg = lightbox.getElementsByTagName('img')[0];
		this._bindEvents();
	},

	_bindEvents: function(){
		var self = this;

		utils.onClick(this._lightbox, function(){
			self._closeLightbox();
		});

		utils.onClick(document.body, function(e){
			var target = e.target,
				src;

			if(target.hasAttribute('data-lightbox-open')){
				src = target.getAttribute('data-lightbox-open');
				self._openLightbox(src);
			}
		});
	},

	_openLightbox: function(src){
		this._lightboxImg.src = src;
		utils.addVisibleClasses(this._lightbox, 'lightbox');
	},

	_closeLightbox: function(){
		utils.removeVisibleClasses(this._lightbox, 'lightbox');
	}
	
};