module.exports = {
    
    init: function(){
    	this._bindEvents();
    },
    
    _bindEvents: function(){
    	var self = this,
    		dropdowns = document.querySelectorAll('[data-dropdown]'),
    		dropdownTriggers = document.querySelectorAll('[data-dropdown-trigger]');

      	document.body.addEventListener('click', function(){
      		[].forEach.call(dropdowns, function(el){
      			el.classList.remove('dropdown--visible');
      		});
      	}, false);

      	[].forEach.call(dropdowns, function(el){
  			el.addEventListener('click', function(e){
        		e.stopPropagation();
      		}, false);
  		});
      
      	[].forEach.call(dropdownTriggers, function(el){
      		el.addEventListener('click', self._handleTriggerClick);
      	});
    },
    
    _handleTriggerClick: function(e){
    	var id, el;

    	e.stopPropagation();

    	id = this.getAttribute('data-dropdown-trigger');
    	if(!id) return;

    	el = document.querySelector('[data-dropdown="'+id+'"]');
    	if(!el) return;

    	el.classList.toggle('dropdown--visible');
    }
    
};