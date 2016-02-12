//1. x fixed header
//2. history state
//3. like btn
//4. img zoom

module.exports = {
	
	init: function(){
		this._articleViewTransDur = this._getTransitionDurationInMilliSec();
		this._bindEvents();
		this._checkHash();
	},

	_bindEvents: function(){
		var self = this,
			triggers = document.querySelectorAll('[data-article-open]'),
			closeBtn = document.getElementById('js-article-view-close-btn');

		var onTriggerClick = function(){
			var slug = this.getAttribute('data-article-open');
			history.pushState({
				slug: slug
			}, null, '/#/article/'+slug);
			self._openView();
		};

		var onCloseBtnClick = function(){
			history.pushState({}, null, '/');
			self._closeView();
		};

		[].forEach.call(triggers, function(el){
			el.addEventListener('click', onTriggerClick, false);
		});

		closeBtn.addEventListener('click', onCloseBtnClick, false);

		window.addEventListener('popstate', this._handlePopstate.bind(self), false);
	},

	_checkHash: function(){
		var hash = location.hash;

		if(hash){
			var slug = hash.replace('/#/article/', '');
			this._openView();
		}
	},

	_handlePopstate: function(e){
		var state = e.state;

		if(state && state.slug){
			//is an article
			this._openView();
		} else {
			//is root
			this._closeView();
		}
	},

	_getTransitionDurationInMilliSec: function(){
		var articleView = document.getElementById('js-article-view'),
			cssStr = getComputedStyle(articleView).getPropertyValue('transition-duration'),
			number = Number(cssStr.replace('s', ''));
		return number*1000;
	},

	_openView: function(slug){
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