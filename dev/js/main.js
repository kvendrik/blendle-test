var dropdowns = require('./modules/dropdowns'),
	navigationHelper = require('./modules/navigation-helper'),
	lightbox = require('./modules/lightbox'),
	tooltips = require('./modules/tooltips');

navigationHelper.init();
dropdowns.init();
lightbox.init();
tooltips.init();