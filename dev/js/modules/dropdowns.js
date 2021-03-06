var utils = require('../utils');

module.exports = {
    
    init: function(){
    	this._bindEvents();
    },
    
    _bindEvents: function(){
    	var self = this,
    		dropdowns = document.querySelectorAll('[data-dropdown]'),
    		dropdownTriggers = document.querySelectorAll('[data-dropdown-trigger]');

      	utils.onClick(document.body, function(){
      		utils.each(dropdowns, function(el){
      			utils.removeVisibleClasses(el, 'dropdown');
      		});
      	});

      	utils.each(dropdowns, function(el){
  			utils.onClick(el, function(e){
        		e.stopPropagation();
      		});
  		});
      
      	utils.each(dropdownTriggers, function(el){
      		utils.onClick(el, self._handleTriggerClick);
      	});
    },
    
    _handleTriggerClick: function(e){
    	var id, el;

    	e.stopPropagation();

    	id = this.getAttribute('data-dropdown-trigger');
    	if(!id) return;

    	el = document.querySelector('[data-dropdown="'+id+'"]');
    	if(!el) return;

    	if(el.classList.contains('dropdown--visible')){
    		utils.removeVisibleClasses(el, 'dropdown');
    	} else {
    		utils.addVisibleClasses(el, 'dropdown');
    	}
    }
    
};