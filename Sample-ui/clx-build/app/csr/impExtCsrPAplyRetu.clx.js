/*
 * App URI: app/csr/impExtCsrPAplyRetu
 * Source Location: app/csr/impExtCsrPAplyRetu.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("app/csr/impExtCsrPAplyRetu", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			
			// Header
			var dataMap_1 = new cpr.data.DataMap("dmRoot");
			dataMap_1.parseData({
				"columns" : [{
					"name": "precheckExtCsrPAplyRetu",
					"dataType": "string"
				}]
			});
			app.register(dataMap_1);
			
			app.supportMedia("all and (min-width: 1235px)", "default");
			app.supportMedia("all and (min-width: 1020px) and (max-width: 1234px)", "notebook");
			app.supportMedia("all and (min-width: 760px) and (max-width: 1019px)", "tablet");
			app.supportMedia("all and (max-width: 759px)", "mobile");
			
			// Configure root container
			var container = app.getContainer();
			container.style.css({
				"width" : "100%",
				"top" : "0px",
				"height" : "100%",
				"left" : "0px"
			});
			
			// Layout
			var xYLayout_1 = new cpr.controls.layouts.XYLayout();
			container.setLayout(xYLayout_1);
			
			// UI Configuration
			var output_1 = new cpr.controls.Output("label1");
			output_1.value = "복학신청IMP";
			container.addChild(output_1, {
				"top": "0px",
				"left": "0px",
				"width": "100px",
				"height": "25px"
			});
		}
	});
	app.title = "insExtCsrPAplyRetu";
	cpr.core.Platform.INSTANCE.register(app);
})();