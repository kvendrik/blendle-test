var utils = require('../utils');

module.exports = {
	
	init: function(){
		this._urlBase = (location.pathname || '/');
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
			utils.historyPush({
				slug: slug
			}, null, self._urlBase+'#/article/'+slug);
			self._openView();
		};

		var onCloseBtnClick = function(){
			utils.historyPush({}, null, self._urlBase);
			self._closeView();
		};

		utils.each(triggers, function(el){
			utils.onClick(el, onTriggerClick);
		});

		utils.onClick(closeBtn, onCloseBtnClick);

		window.addEventListener('popstate', this._handlePopstate.bind(self), false);
	},

	_checkHash: function(){
		if(location.hash){
			this._openView();
		}
	},

	_handlePopstate: function(e){
		var state = e.state;

		//if there is no state object
		//it is probably because its on page load
		if(!state) return;

		if(state.slug){
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