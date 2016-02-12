module.exports = {
	
	init: function(){
		this._articleView = document.getElementById('js-article-view');
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
		var cssStr = getComputedStyle(this._articleView).getPropertyValue('transition-duration'),
			number = Number(cssStr.replace('s', ''));
		return number*1000;
	},

	_openView: function(){
		var articleView = this._articleView;
		articleView.classList.add('article-view--block');
		setTimeout(function(){
			articleView.classList.add('article-view--visible');
		}, 50);
	},

	_closeView: function(){
		var articleView = this._articleView;
		articleView.classList.remove('article-view--visible');

		setTimeout(function(){
			articleView.classList.remove('article-view--block');
		}, this._articleViewTransDur);
	}

};