/*
 * App URI: app/crs/impDialogCrsSimulResult
 * Source Location: app/crs/impDialogCrsSimulResult.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("app/crs/impDialogCrsSimulResult", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			
			// Header
			
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
			var userDefinedControl_1 = linker.userDefinedControl_1 = new udc.com.comTitle();
			userDefinedControl_1.bind("title").toLanguage("NLS-DLG-TLT-T003");
			container.addChild(userDefinedControl_1, {
				"top": "5px",
				"left": "5px",
				"width": "340px",
				"height": "25px"
			});
			
			var button_1 = new cpr.controls.Button("btnCloseImp");
			button_1.value = "";
			button_1.bind("value").toLanguage("UI-SCR-SCRNCLS");
			if(typeof onBtnCloseImpClick == "function") {
				button_1.addEventListener("click", onBtnCloseImpClick);
			}
			container.addChild(button_1, {
				"top": "5px",
				"left": "315px",
				"width": "60px",
				"height": "25px"
			});
			
			var grid_1 = linker.grid_1 = new cpr.controls.Grid("grdSimulImp");
			grid_1.init({
				"dataSet": app.lookup("dsSimul"),
				"columns": [
					{"width": "40px"},
					{"width": "85px"},
					{"width": "83px"},
					{"width": "146px"}
				],
				"header": {
					"rows": [{"height": "27px"}],
					"cells": [
						{
							"constraint": {"rowIndex": 0, "colIndex": 0},
							"configurator": function(cell){
								cell.bind("text").toLanguage("UI-SCR-STAFFNO");
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 1},
							"configurator": function(cell){
								cell.bind("text").toLanguage("UI-SCR-NAME");
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 2},
							"configurator": function(cell){
								cell.bind("text").toLanguage("UI-GLS-STUD_ID");
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 3},
							"configurator": function(cell){
								cell.bind("text").toLanguage("UI-GLS-SA");
							}
						}
					]
				},
				"detail": {
					"rows": [{"height": "25px"}],
					"cells": [
						{
							"constraint": {"rowIndex": 0, "colIndex": 0},
							"configurator": function(cell){
								cell.columnName = "_repeatindex";
								cell.style.css({
									"text-align" : "center"
								});
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 1},
							"configurator": function(cell){
								cell.columnName = "REP_NM";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 2},
							"configurator": function(cell){
								cell.columnName = "STUD_NO";
								cell.style.css({
									"text-align" : "center"
								});
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 3},
							"configurator": function(cell){
								cell.columnName = "SA_NM";
							}
						}
					]
				}
			});
			container.addChild(grid_1, {
				"top": "30px",
				"left": "5px",
				"width": "370px",
				"height": "367px"
			});
			// Linking
			linker.userDefinedControl_1.ctrl = linker.grid_1;
		}
	});
	app.title = "학생선택그룹 시뮬레이션 결과";
	cpr.core.Platform.INSTANCE.register(app);
})();