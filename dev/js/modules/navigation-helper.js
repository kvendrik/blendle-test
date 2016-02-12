var utils = require('../utils');

module.exports = {
	
	init: function(){
		this._articleView = document.getElementById('js-article-view');
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

	_openView: function(){
		utils.addVisibleClasses(document.body, 'article-view');
	},

	_closeView: function(){
		utils.removeVisibleClasses(document.body, 'article-view', this._articleView);
	}

};