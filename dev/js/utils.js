var utils = {

	_getTransitionDurationInMilliSec: function(el){
		var cssStr = getComputedStyle(el).getPropertyValue('transition-duration'),
			number = Number(cssStr.replace('s', ''));
		return number*1000;
	},

	addVisibleClasses: function(el, prefix){
		el.classList.add(prefix+'--block');
		setTimeout(function(){
			el.classList.add(prefix+'--visible');
		}, 50);
	},

	removeVisibleClasses: function(el, prefix, transitionEl){
		var transDur = this._getTransitionDurationInMilliSec(transitionEl || el);

		el.classList.remove(prefix+'--visible');
		setTimeout(function(){
			el.classList.remove(prefix+'--block');
		}, transDur);
	}
	
};

utils.historyPush = (function(){
	if(history && history.pushState){
		return function(state, title, url){
			history.pushState(state, title, url);
		};
	} else {
		return function(){};
	}
}());

module.exports = utils;