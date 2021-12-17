/*
 * App URI: app/css/impDialogAllScalFee
 * Source Location: app/css/impDialogAllScalFee.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("app/css/impDialogAllScalFee", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			
			// Header
			var dataSet_1 = new cpr.data.DataSet("dsScalStud");
			dataSet_1.parseData({
				"info": "CSS_CNTI_SCAL_STUD@STUD_ID,SCAL_FEE_CD,SS_OBJ_DIV_RCD",
				"columns": [
					{"name": "SERIAL_NO"},
					{"name": "SCAL_FEE_CD"},
					{"name": "SCAL_FEE_NM"},
					{"name": "SCAL_AMT"},
					{"name": "PMNT_DIV_RCD"},
					{"name": "PMNT_DIV_NM"},
					{"name": "PMNT_ITV_RCD"},
					{"name": "PMNT_ITV_NM"},
					{"name": "REQ_DT"},
					{"name": "CNFM_DT"},
					{"name": "WRK_DEPT_CD"},
					{"name": "WRK_DEPT_NM"},
					{"name": "WRK_CHAG_OPRT"},
					{"name": "WRK_ST_DT"},
					{"name": "WRK_END_DT"},
					{"name": "WRK_EVAL_RCD"},
					{"name": "WRK_EVAL_NM"},
					{"name": "OG_OBJ_DIV_RCD"},
					{"name": "REMARK"},
					{"name": "PROC_STAT_RCD"},
					{"name": "PROC_STAT_NM"},
					{"name": "STUD_ID"},
					{"name": "SCH_YEAR_RCD"},
					{"name": "SMT_RCD"},
					{"name": "REF_KEY"}
				],
				"rows": []
			});
			app.register(dataSet_1);
			var dataMap_1 = new cpr.data.DataMap("dmSchedule");
			dataMap_1.parseData({
				"columns" : [
					{
						"name": "strSchYearRcd",
						"dataType": "string"
					},
					{
						"name": "strStDt",
						"dataType": "string"
					},
					{
						"name": "strSmtRcd",
						"dataType": "string"
					},
					{
						"name": "strEndDt",
						"dataType": "string"
					}
				]
			});
			app.register(dataMap_1);
			
			var dataMap_2 = new cpr.data.DataMap("dmReqKey");
			dataMap_2.parseData({
				"columns" : [
					{
						"name": "strProcStatRcd",
						"dataType": "string"
					},
					{
						"name": "strScalFeeCd",
						"dataType": "string"
					},
					{
						"name": "strStudId",
						"dataType": "string"
					}
				]
			});
			app.register(dataMap_2);
			var submission_1 = new cpr.protocols.Submission("subListImp");
			submission_1.action = "/css/StdCssScalStudTrans/";
			submission_1.mediaType = "application/x-www-form-urlencoded";
			submission_1.addRequestData(dataMap_2);
			submission_1.addResponseData(dataSet_1, false);
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
			var button_1 = new cpr.controls.Button("btnClose");
			button_1.value = "";
			button_1.bind("value").toLanguage("UI-SCR-CLOSE");
			if(typeof onBtnCloseClick == "function") {
				button_1.addEventListener("click", onBtnCloseClick);
			}
			container.addChild(button_1, {
				"top": "200px",
				"left": "450px",
				"width": "60px",
				"height": "25px"
			});
			
			var grid_1 = new cpr.controls.Grid("grdScalStudImp");
			grid_1.init({
				"dataSet": app.lookup("dsScalStud"),
				"columns": [
					{"width": "40px"},
					{"width": "39px"},
					{"width": "80px"},
					{"width": "123px"},
					{"width": "95px"},
					{"width": "75px"},
					{"width": "80px"},
					{"width": "81px"},
					{"width": "81px"},
					{"width": "80px"},
					{"width": "96px"},
					{"width": "92px"},
					{"width": "91px"},
					{"width": "91px"},
					{"width": "75px"},
					{"width": "178px"}
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
								cell.bind("text").toLanguage("UI-GLS-SERIAL_NO");
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 2},
							"configurator": function(cell){
								cell.bind("text").toLanguage("UI-DB-SCAL_FEE_CD");
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 3},
							"configurator": function(cell){
								cell.bind("text").toLanguage("UI-DB-SCAL_FEE_NM");
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 4},
							"configurator": function(cell){
								cell.bind("text").toLanguage("UI-DB-SCAL_AMT");
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 5},
							"configurator": function(cell){
								cell.bind("text").toLanguage("UI-SCR-PMNTDIV");
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 6},
							"configurator": function(cell){
								cell.bind("text").toLanguage("UI-SCR-PRCSTATE");
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 7},
							"configurator": function(cell){
								cell.bind("text").toLanguage("UI-SCR-PAYITV");
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 8},
							"configurator": function(cell){
								cell.bind("text").toLanguage("UI-DB-REQ_DT");
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 9},
							"configurator": function(cell){
								cell.bind("text").toLanguage("UI-DB-CNFM_DT");
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 10},
							"configurator": function(cell){
								cell.bind("text").toLanguage("UI-SCR-WRKDEP");
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 11},
							"configurator": function(cell){
								cell.bind("text").toLanguage("UI-DB-WRK_CHAG_OPRT");
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 12},
							"configurator": function(cell){
								cell.bind("text").toLanguage("UI-DB-WRK_BEG_DT");
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 13},
							"configurator": function(cell){
								cell.bind("text").toLanguage("UI-DB-WRK_END_DT");
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 14},
							"configurator": function(cell){
								cell.bind("text").toLanguage("UI-SCR-WRKEVAL");
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 15},
							"configurator": function(cell){
								cell.bind("text").toLanguage("UI-GLS-REMARK");
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
								cell.columnName = "SERIAL_NO";
								cell.control = (function(){
									var output_1 = new cpr.controls.Output("gdOptSerialNoImp");
									output_1.dataType = "number";
									output_1.format = "###";
									output_1.style.css({
										"text-align" : "center"
									});
									output_1.bind("value").toDataColumn("SERIAL_NO");
									return output_1;
								})();
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 2},
							"configurator": function(cell){
								cell.columnName = "SCAL_FEE_CD";
								cell.style.css({
									"text-align" : "center"
								});
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 3},
							"configurator": function(cell){
								cell.columnName = "SCAL_FEE_NM";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 4},
							"configurator": function(cell){
								cell.columnName = "SCAL_AMT";
								cell.control = (function(){
									var output_2 = new cpr.controls.Output("gdOptAmtImp");
									output_2.dataType = "number";
									output_2.format = "s#,###";
									output_2.style.css({
										"text-align" : "right"
									});
									output_2.bind("value").toDataColumn("SCAL_AMT");
									return output_2;
								})();
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 5},
							"configurator": function(cell){
								cell.columnName = "PMNT_DIV_NM";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 6},
							"configurator": function(cell){
								cell.columnName = "PROC_STAT_NM";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 7},
							"configurator": function(cell){
								cell.columnName = "PMNT_ITV_NM";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 8},
							"configurator": function(cell){
								cell.columnName = "REQ_DT";
								cell.control = (function(){
									var output_3 = new cpr.controls.Output("gdOptReqDtImp");
									output_3.dataType = "date";
									output_3.format = "YYYY-MM-DD";
									output_3.style.css({
										"text-align" : "center"
									});
									output_3.bind("value").toDataColumn("REQ_DT");
									return output_3;
								})();
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 9},
							"configurator": function(cell){
								cell.columnName = "CNFM_DT";
								cell.control = (function(){
									var output_4 = new cpr.controls.Output("gdOptCnfmDtImp");
									output_4.dataType = "date";
									output_4.format = "YYYY-MM-DD";
									output_4.style.css({
										"text-align" : "center"
									});
									output_4.bind("value").toDataColumn("CNFM_DT");
									return output_4;
								})();
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 10},
							"configurator": function(cell){
								cell.columnName = "WRK_DEPT_NM";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 11},
							"configurator": function(cell){
								cell.columnName = "WRK_CHAG_OPRT";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 12},
							"configurator": function(cell){
								cell.columnName = "WRK_ST_DT";
								cell.control = (function(){
									var output_5 = new cpr.controls.Output("gdOptWrkStDtImp");
									output_5.dataType = "date";
									output_5.format = "YYYY-MM-DD";
									output_5.style.css({
										"text-align" : "center"
									});
									output_5.bind("value").toDataColumn("WRK_ST_DT");
									return output_5;
								})();
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 13},
							"configurator": function(cell){
								cell.columnName = "WRK_END_DT";
								cell.control = (function(){
									var output_6 = new cpr.controls.Output("gdOptWrkEndDtImp");
									output_6.dataType = "date";
									output_6.format = "YYYY-MM-DD";
									output_6.style.css({
										"text-align" : "center"
									});
									output_6.bind("value").toDataColumn("WRK_END_DT");
									return output_6;
								})();
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 14},
							"configurator": function(cell){
								cell.columnName = "WRK_EVAL_NM";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 15},
							"configurator": function(cell){
								cell.columnName = "REMARK";
							}
						}
					]
				}
			});
			if(typeof onGrdScalStudImpDblclick == "function") {
				grid_1.addEventListener("dblclick", onGrdScalStudImpDblclick);
			}
			container.addChild(grid_1, {
				"top": "5px",
				"left": "5px",
				"width": "510px",
				"height": "190px"
			});
		}
	});
	app.title = "impDialogAllScalFee";
	cpr.core.Platform.INSTANCE.register(app);
})();
