/*
 * App URI: app/cmn/mainLang
 * Source Location: app/cmn/mainLang.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("app/cmn/mainLang", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			
			// Header
			var dataMap_1 = new cpr.data.DataMap("dmReqKey");
			dataMap_1.parseData({
				"columns" : [{
					"name": "strLanDivRcd",
					"dataType": "string"
				}]
			});
			app.register(dataMap_1);
			
			var dataMap_2 = new cpr.data.DataMap("dmUI");
			dataMap_2.parseData({
				"columns" : [{
					"name": "row",
					"dataType": "string"
				}]
			});
			app.register(dataMap_2);
			
			var dataMap_3 = new cpr.data.DataMap("dmNLS");
			dataMap_3.parseData({
				"columns" : [{
					"name": "row",
					"dataType": "string"
				}]
			});
			app.register(dataMap_3);
			var submission_1 = new cpr.protocols.Submission("subMultiLang");
			submission_1.action = "/cmn/StdCmnMultiLang/";
			submission_1.mediaType = "application/x-www-form-urlencoded";
			submission_1.addRequestData(dataMap_1);
			submission_1.addResponseData(dataMap_2, false);
			submission_1.addResponseData(dataMap_3, false);
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
			if(typeof onBodyLoad == "function"){
				app.addEventListener("load", onBodyLoad);
			}
		}
	});
	app.title = "Untitled";
	cpr.core.Platform.INSTANCE.register(app);
})();
