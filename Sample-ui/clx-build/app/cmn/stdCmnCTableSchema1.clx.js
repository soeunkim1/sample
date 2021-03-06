/*
 * App URI: app/cmn/stdCmnCTableSchema1
 * Source Location: app/cmn/stdCmnCTableSchema1.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("app/cmn/stdCmnCTableSchema1", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			
			// Header
			var dataSet_1 = new cpr.data.DataSet("dsGrxMstManage");
			dataSet_1.parseData({
				"columns": [
					{"name": "FLAG_GBN"},
					{"name": "SPVS_COL_CD"},
					{"name": "LAN_DIV_RCD"},
					{"name": "PNT"},
					{"name": "REG_FEE_XCP_YN"},
					{"name": "SPVS_COL_NM"},
					{"name": "EPAC_TC"},
					{"name": "REC_SCALE_RCD"},
					{"name": "SB_DIV_RCD"},
					{"name": "SB_NM"},
					{"name": "EVAL_METHOD_RCD"},
					{"name": "ST_DT"},
					{"name": "END_DT"},
					{"name": "SB_TYPE_RCD"},
					{"name": "SB_AMT"},
					{"name": "SHORT_NM"},
					{"name": "REF_KEY"},
					{"name": "PNT_INSTCH_YN"},
					{"name": "SPVS_DEPT_CD"},
					{"name": "SB_CAT_RCD"},
					{"name": "SB_LVL_RCD"},
					{"name": "OBJ_DIV_RCD"},
					{"name": "SB_SMRY"},
					{"name": "SPVS_DEPT_CD_NM"},
					{"name": "SB_CD"},
					{"name": "RE_TLSN_YN_RCD"},
					{"name": "CMP_DIV_RCD"},
					{"name": "LECT_TYPE_RCD"},
					{"name": "THEO_TC"}
				],
				"rows": []
			});
			app.register(dataSet_1);
			
			var dataSet_2 = new cpr.data.DataSet("dsListCmpDivRcd");
			dataSet_2.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_2);
			
			var dataSet_3 = new cpr.data.DataSet("dsListSbCatRcd");
			dataSet_3.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_3);
			
			var dataSet_4 = new cpr.data.DataSet("dsListSbDivRcd");
			dataSet_4.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_4);
			
			var dataSet_5 = new cpr.data.DataSet("dsListSbLvlRcd");
			dataSet_5.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_5);
			
			var dataSet_6 = new cpr.data.DataSet("dsListLectTypeRcd");
			dataSet_6.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_6);
			
			var dataSet_7 = new cpr.data.DataSet("dsListEvalMethodRcd");
			dataSet_7.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_7);
			
			var dataSet_8 = new cpr.data.DataSet("dsListSbTypeRcd");
			dataSet_8.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_8);
			
			var dataSet_9 = new cpr.data.DataSet("dsListRecScaleRcd");
			dataSet_9.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_9);
			
			var dataSet_10 = new cpr.data.DataSet("dsListReTlsnYnRcd");
			dataSet_10.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_10);
			var dataMap_1 = new cpr.data.DataMap("dmReqList");
			dataMap_1.parseData({
				"columns" : [
					{
						"name": "strStudId",
						"dataType": "string"
					},
					{
						"name": "strStudNo",
						"dataType": "string"
					},
					{
						"name": "strKeyDate",
						"dataType": "string"
					}
				]
			});
			app.register(dataMap_1);
			
			var dataMap_2 = new cpr.data.DataMap("dmReqCmd");
			dataMap_2.parseData({
				"columns" : [
					{
						"name": "strSbCd",
						"dataType": "string"
					},
					{
						"name": "strRefKey",
						"dataType": "string"
					},
					{
						"name": "strLanDivRcd",
						"dataType": "string"
					},
					{
						"name": "strKeyDate",
						"dataType": "string"
					},
					{
						"name": "strEndYn",
						"dataType": "string"
					}
				]
			});
			app.register(dataMap_2);
			
			var dataMap_3 = new cpr.data.DataMap("dmResOnLoad");
			dataMap_3.parseData({
				"columns" : [{
					"name": "strCreateSbCdYn",
					"dataType": "string"
				}]
			});
			app.register(dataMap_3);
			
			var dataMap_4 = new cpr.data.DataMap("dmReqSubPage");
			dataMap_4.parseData({
				"columns" : [
					{
						"name": "strSbCd",
						"dataType": "string"
					},
					{
						"name": "strRefKey",
						"dataType": "string"
					},
					{
						"name": "strLanDivRcd",
						"dataType": "string"
					},
					{
						"name": "strKeyDate",
						"dataType": "string"
					}
				]
			});
			app.register(dataMap_4);
			var submission_1 = new cpr.protocols.Submission("subListManage");
			submission_1.action = "/ccs/StdCcsSubjectFrfSub/";
			submission_1.mediaType = "application/x-www-form-urlencoded";
			submission_1.addRequestData(dataMap_4);
			submission_1.addResponseData(dataSet_1, false);
			app.register(submission_1);
			
			var submission_2 = new cpr.protocols.Submission("subOnLoadManage");
			submission_2.action = "/ccs/StdCcsSubjectFrfSub/";
			submission_2.mediaType = "application/x-www-form-urlencoded";
			submission_2.addResponseData(dataSet_2, false);
			submission_2.addResponseData(dataSet_3, false);
			submission_2.addResponseData(dataSet_4, false);
			submission_2.addResponseData(dataSet_5, false);
			submission_2.addResponseData(dataSet_6, false);
			submission_2.addResponseData(dataSet_7, false);
			submission_2.addResponseData(dataSet_8, false);
			submission_2.addResponseData(dataSet_9, false);
			submission_2.addResponseData(dataSet_10, false);
			submission_2.addResponseData(dataMap_3, false);
			app.register(submission_2);
			
			var submission_3 = new cpr.protocols.Submission("subSaveManage");
			submission_3.action = "/ccs/StdCcsSubjectFrfSub/";
			submission_3.mediaType = "application/x-www-form-urlencoded";
			submission_3.addRequestData(dataMap_4);
			submission_3.addRequestData(dataMap_3);
			app.register(submission_3);
			
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
			var group_1 = new cpr.controls.Container("grpSearch");
			group_1.style.setClasses(["search-box"]);
			// Layout
			var xYLayout_2 = new cpr.controls.layouts.XYLayout();
			group_1.setLayout(xYLayout_2);
			(function(container){
				var button_1 = new cpr.controls.Button("btnSearch");
				button_1.value = "";
				button_1.style.setClasses(["btn-search"]);
				button_1.bind("value").toLanguage("UI-SCR-SCH");
				if(typeof onBtnSearchClick == "function") {
					button_1.addEventListener("click", onBtnSearchClick);
				}
				container.addChild(button_1, {
					"top": "5px",
					"left": "1160px",
					"width": "60px",
					"height": "25px"
				});
				var output_1 = new cpr.controls.Output("optTableNm");
				output_1.value = "";
				output_1.bind("value").toLanguage("UI-SCR-TBNM");
				container.addChild(output_1, {
					"top": "5px",
					"left": "5px",
					"width": "100px",
					"height": "25px"
				});
				var inputBox_1 = new cpr.controls.InputBox("ipbTableNm");
				inputBox_1.bind("fieldLabel").toExpression("#optTableNm.value");
				inputBox_1.bind("value").toDataMap(app.lookup("dmReqKey"), "strTableNm");
				if(typeof onIpbTableNmKeydown == "function") {
					inputBox_1.addEventListener("keydown", onIpbTableNmKeydown);
				}
				container.addChild(inputBox_1, {
					"top": "5px",
					"left": "110px",
					"width": "200px",
					"height": "25px"
				});
			})(group_1);
			container.addChild(group_1, {
				"top": "5px",
				"left": "5px",
				"width": "1225px",
				"height": "32px"
			});
			
			var group_2 = new cpr.controls.Container("grpData");
			// Layout
			var xYLayout_3 = new cpr.controls.layouts.XYLayout();
			group_2.setLayout(xYLayout_3);
			(function(container){
				var userDefinedControl_1 = linker.userDefinedControl_1 = new udc.com.comTitle();
				userDefinedControl_1.bind("title").toLanguage("UI-SCR-TABLELIST");
				container.addChild(userDefinedControl_1, {
					"top": "5px",
					"left": "5px",
					"width": "265px",
					"height": "25px"
				});
				var grid_1 = linker.grid_1 = new cpr.controls.Grid("grdTable");
				grid_1.init({
					"dataSet": app.lookup("dsTable"),
					"columns": [
						{"width": "25px"},
						{"width": "25px"},
						{"width": "40px"},
						{"width": "200px"},
						{"width": "150px"},
						{"width": "150px"},
						{"width": "622px"}
					],
					"header": {
						"rows": [{"height": "27px"}],
						"cells": [
							{
								"constraint": {"rowIndex": 0, "colIndex": 0},
								"configurator": function(cell){
									cell.columnType = "checkbox";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 1},
								"configurator": function(cell){
									cell.text = "F";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 2},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-GLS-NO");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 3},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-SCR-TABID");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 4},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-SCR-TLG_TAB_CREATE_YN");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 5},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-SCR-TLG_TRIGGER_YN");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 6},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-SCR-TBCMT");
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
									cell.columnType = "checkbox";
									cell.style.css({
										"text-align" : "center"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 1},
								"configurator": function(cell){
									cell.control = (function(){
										var output_2 = new cpr.controls.Output();
										output_2.style.css({
											"text-align" : "center"
										});
										return output_2;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 2},
								"configurator": function(cell){
									cell.columnName = "_repeatindex";
									cell.style.css({
										"text-align" : "center"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 3},
								"configurator": function(cell){
									cell.columnName = "TABLE_NAME";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 4},
								"configurator": function(cell){
									cell.columnName = "TLG_TABLE_YN";
									cell.style.css({
										"text-align" : "center"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 5},
								"configurator": function(cell){
									cell.columnName = "TLG_TRG_YN";
									cell.style.css({
										"text-align" : "center"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 6},
								"configurator": function(cell){
									cell.columnName = "COMMENTS";
								}
							}
						]
					}
				});
				if(typeof onGrdTableSelectionChange == "function") {
					grid_1.addEventListener("selection-change", onGrdTableSelectionChange);
				}
				container.addChild(grid_1, {
					"top": "30px",
					"left": "5px",
					"width": "1215px",
					"height": "515"
				});
			})(group_2);
			container.addChild(group_2, {
				"top": "42px",
				"left": "5px",
				"width": "1225px",
				"height": "550"
			});
			if(typeof onBodyLoad == "function"){
				app.addEventListener("load", onBodyLoad);
			}
			// Linking
			linker.userDefinedControl_1.ctrl = linker.grid_1;
		}
	});
	app.title = "Untitled";
	cpr.core.Platform.INSTANCE.register(app);
})();
