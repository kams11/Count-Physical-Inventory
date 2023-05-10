/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"comexample/count_physical_inventory/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
