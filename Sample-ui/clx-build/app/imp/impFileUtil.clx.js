/*
 * App URI: app/imp/impFileUtil
 * Source Location: app/imp/impFileUtil.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("app/imp/impFileUtil", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			
			// Header
			var dataMap_1 = new cpr.data.DataMap("dmResList");
			dataMap_1.parseData({
				"columns" : [{
					"name": "strTmpFileNms",
					"dataType": "string"
				}]
			});
			app.register(dataMap_1);
			var submission_1 = new cpr.protocols.Submission("subTmpFileUpLoad");
			submission_1.action = "/cmn/StdCmnFileTransUtil/";
			submission_1.mediaType = "application/x-www-form-urlencoded";
			submission_1.addResponseData(dataMap_1, false);
			app.register(submission_1);
			
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
			var output_1 = new cpr.controls.Output("optImpFileUtilTitle");
			output_1.value = "공통파일유틸";
			container.addChild(output_1, {
				"top": "0px",
				"left": "0px",
				"width": "95px",
				"height": "25px"
			});
		}
	});
	app.title = "Untitled";
	cpr.core.Platform.INSTANCE.register(app);
})();