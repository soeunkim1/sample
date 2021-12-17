/*
 * App URI: app/imp/impRptColFilter
 * Source Location: app/imp/impRptColFilter.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("app/imp/impRptColFilter", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			
			// Header
			var dataMap_1 = new cpr.data.DataMap("dmExcelFileInfo");
			dataMap_1.parseData({
				"columns" : [
					{
						"name": "strExcelPath",
						"dataType": "string"
					},
					{
						"name": "strExcelRealFileNm",
						"dataType": "string"
					},
					{
						"name": "strExcelChgFileNm",
						"dataType": "string"
					}
				]
			});
			app.register(dataMap_1);
			
			var dataMap_2 = new cpr.data.DataMap("dmInsExcelReq");
			dataMap_2.parseData({
				"columns" : [{
					"name": "bodyData",
					"dataType": "string"
				}]
			});
			app.register(dataMap_2);
			var submission_1 = new cpr.protocols.Submission("subExportExcel_header");
			submission_1.action = "/cmn/StdCmnFileTransUtil/";
			submission_1.mediaType = "application/x-www-form-urlencoded";
			submission_1.addRequestData(dataMap_2);
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
			var output_1 = new cpr.controls.Output("optImpTitle");
			output_1.value = "리피트UTIL";
			container.addChild(output_1, {
				"top": "0px",
				"left": "0px",
				"width": "100px",
				"height": "25px"
			});
			if(typeof onBodyLoad == "function"){
				app.addEventListener("load", onBodyLoad);
			}
		}
	});
	app.title = "Untitled";
	cpr.core.Platform.INSTANCE.register(app);
})();