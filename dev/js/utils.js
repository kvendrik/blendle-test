var utils = {

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

utils._getTransitionDurationInMilliSec = (function(){
	var propOptions = [
		'transition-duration',
		'-webkit-transition-duration'
	],
	testEl = document.querySelector('.article-view'),
	finalPropName;

	for(var i = 0, l = propOptions.length; i < propOptions.length; i++){
		var propName = propOptions[i];
		if(getComputedStyle(testEl).getPropertyValue(propName)){
			finalPropName = propName;
			break;
		}
	}

	return function(el){
		var cssStr = getComputedStyle(el).getPropertyValue(finalPropName),
			number = cssStr ? Number(cssStr.match(/([\d\.]+)/)[1]) : 0;
		return number*1000;
	};
}());

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