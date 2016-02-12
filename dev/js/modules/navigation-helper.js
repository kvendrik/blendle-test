//1. fixed header
//2. history state
//3. like btn
//4. img zoom

module.exports = {
	
	init: function(){
		this._articleViewTransDur = this._getTransitionDurationInMilliSec();
		this._bindEvents();
	},

	_bindEvents: function(){
		var self = this,
			cards = document.getElementsByClassName('js-article-card'),
			closeBtn = document.getElementById('js-article-view-close-btn');

		[].forEach.call(cards, function(el){
			el.addEventListener('click', self._openView.bind(self), false);
		});

		closeBtn.addEventListener('click', this._closeView.bind(self), false);
	},

	_getTransitionDurationInMilliSec: function(){
		var articleView = document.getElementById('js-article-view'),
			cssStr = getComputedStyle(articleView).getPropertyValue('transition-duration'),
			number = Number(cssStr.replace('s', ''));
		return number*1000;
	},

	_openView: function(){
		document.body.classList.add('article-view--block');
		setTimeout(function(){
			document.body.classList.add('article-view--visible');
		}, 50);
	},

	_closeView: function(){
		document.body.classList.remove('article-view--visible');

		setTimeout(function(){
			document.body.classList.remove('article-view--block');
		}, this._articleViewTransDur);
	}

};