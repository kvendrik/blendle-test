var FastButton = function(element, handler){

  this.element = element;
  this.handler = handler;

  if("ontouchstart" in window){

    element.addEventListener('touchstart', this, false);

  } else {
  
    element.addEventListener('click', this, false);

  }

};

FastButton.prototype.handleEvent = function(e){
  switch(e.type){
    case 'touchstart' : this.onTouchStart(e); break;
    case 'touchmove' : this.onTouchMove(e); break;
    case 'touchend' : this.onClick(e); break;
    case 'click' : this.onClick(e); break;
  }
};

FastButton.prototype.onTouchStart = function(e){

  e.stopPropagation();

  this.element.addEventListener('touchend', this, false);
  this.element.addEventListener('touchmove', this, false);

  this.startX = e.touches[0].clientX;
  this.startY = e.touches[0].clientY;

};

FastButton.prototype.onTouchMove = function(e){
  if(Math.abs(e.touches[0].clientX - this.startX) > 10 ||
     Math.abs(e.touches[0].clientY - this.startY) > 10){
      this.reset();
  }
};

FastButton.prototype.onClick = function(e){

  e.stopPropagation();
  
  this.reset();

  var handler = this.handler;

  if(typeof handler === 'function'){

    handler.call(this.element, e);

  } else if(typeof handler === 'object'){

    handler.handleEvent(e);
  
  }

  if(e.type === 'touchend'){
    this.clickbuster.preventGhostClick(this.startX, this.startY);
  }

}

FastButton.prototype.reset = function(){
    this.element.removeEventListener('touchend', this, false);
    this.element.removeEventListener('touchmove', this, false);
};

var clickbuster = function(){
  console.log('init clickbuster');
};

clickbuster.preventGhostClick = function(x, y){
  clickbuster.coordinates.push(x, y);
  window.setTimeout(google.clickbuster.pop, 2500);
};

clickbuster.pop = function(){
  clickbuster.coordinates.splice(0, 2);
};

clickbuster.onClick = function(e){
  for (var i = 0; i < clickbuster.coordinates.length; i++) {
    var x = clickbuster.coordinates[i];
    var y = clickbuster.coordinates[i + 1];

    if(Math.abs(e.clientX - x) < 25 && Math.abs(e.clientY - y) < 25){
      e.stopPropagation();
      e.preventDefault();
    };
  };
};

document.addEventListener('click', clickbuster.onClick, true);
clickbuster.coordinates = [];

module.exports = FastButton;