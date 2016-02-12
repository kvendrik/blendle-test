var dropdowns = require('./modules/dropdowns'),
	navigationHelper = require('./modules/navigation-helper'),
	lightbox = require('./modules/lightbox'),
	tooltips = require('./modules/tooltips'),
	share = require('./modules/data-share');

navigationHelper.init();
dropdowns.init();
lightbox.init();
tooltips.init();
share.init();