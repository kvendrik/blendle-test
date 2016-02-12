module.exports = {

	init: function(){
		var lightbox = this._lightbox = document.getElementById('js-lightbox');
		this._lightboxImg = lightbox.getElementsByTagName('img')[0];
		this._bindEvents();
	},

	_bindEvents: function(){
		var self = this;

		this._lightbox.addEventListener('click', function(){
			self._closeLightbox();
		}, false);

		document.addEventListener('click', function(e){
			var target = e.target,
				src;

			if(target.hasAttribute('data-lightbox-open')){
				src = target.getAttribute('data-lightbox-open');
				self._openLightbox(src);
			}
		}, false);
	},

	_openLightbox: function(src){
		var lightbox = this._lightbox;

		this._lightboxImg.src = src;

		lightbox.classList.add('lightbox--block');
		setTimeout(function(){
			lightbox.classList.add('lightbox--visible');
		}, 50);
	},

	_closeLightbox: function(){
		var lightbox = this._lightbox;
		lightbox.classList.remove('lightbox--visible');
		setTimeout(function(){
			lightbox.classList.remove('lightbox--block');
		}, 300);
	}
	
};