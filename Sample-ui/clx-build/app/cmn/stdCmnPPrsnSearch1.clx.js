/*
 * App URI: app/cmn/stdCmnPPrsnSearch1
 * Source Location: app/cmn/stdCmnPPrsnSearch1.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("app/cmn/stdCmnPPrsnSearch1", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			
			// Header
			var dataSet_1 = new cpr.data.DataSet("dsCmnSat");
			dataSet_1.parseData({
				"columns": [
					{"name": "OBJ_DIV_RCD"},
					{"name": "UNI_GRAD_NM"},
					{"name": "LAN_DIV_RCD"},
					{"name": "CD"},
					{"name": "REF_KEY"},
					{"name": "CD_NM"},
					{"name": "SA_POST_DIV_RCD_NM"},
					{"name": "ST_DT"},
					{"name": "END_DT"}
				],
				"rows": []
			});
			app.register(dataSet_1);
			
			var dataSet_2 = new cpr.data.DataSet("dsListObjDivRcd");
			dataSet_2.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_2);
			
			var dataSet_3 = new cpr.data.DataSet("dsListLanDivRcd");
			dataSet_3.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_3);
			
			var dataSet_4 = new cpr.data.DataSet("dsTrvCmnSat");
			dataSet_4.parseData({
				"columns": [
					{"name": "OBJ_DIV_RCD"},
					{"name": "UKEY"},
					{"name": "LAN_DIV_RCD"},
					{"name": "CD"},
					{"name": "REF_KEY"},
					{"name": "CD_NM"},
					{"name": "CKEY"},
					{"name": "ST_DT"},
					{"name": "IMG_PATH"},
					{"name": "END_DT"}
				],
				"rows": []
			});
			app.register(dataSet_4);
			var dataMap_1 = new cpr.data.DataMap("dmReqCmd");
			dataMap_1.parseData({
				"columns" : [
					{
						"name": "strObjNm",
						"dataType": "string"
					},
					{
						"name": "strOprtRoleId",
						"dataType": "string"
					},
					{
						"name": "strObjDivRcd",
						"dataType": "string"
					},
					{
						"name": "strObjCd",
						"dataType": "string"
					},
					{
						"name": "authRngRcd",
						"dataType": "string"
					},
					{
						"name": "strKeyDate",
						"dataType": "string"
					},
					{
						"name": "strLanDivRcd",
						"dataType": "string"
					},
					{
						"name": "strKeyEndDate",
						"dataType": "string"
					},
					{
						"name": "strOtIsTreeView",
						"dataType": "string"
					},
					{
						"name": "strStartObject",
						"dataType": "string"
					},
					{
						"name": "strOtDivRcd",
						"dataType": "string"
					}
				]
			});
			app.register(dataMap_1);
			
			var dataMap_2 = new cpr.data.DataMap("dmResOnLoad");
			dataMap_2.parseData({
				"columns" : [{
					"name": "strDefLanDivRcd",
					"dataType": "string"
				}]
			});
			app.register(dataMap_2);
			
			var dataMap_3 = new cpr.data.DataMap("dmReqListTrv");
			dataMap_3.parseData({
				"columns" : [{
					"name": "strToObjDivRcd",
					"dataType": "string"
				}]
			});
			app.register(dataMap_3);
			var submission_1 = new cpr.protocols.Submission("subOnLoad");
			submission_1.action = "/cmn/StdCmnObjSch/";
			submission_1.mediaType = "application/x-www-form-urlencoded";
			submission_1.addResponseData(dataSet_2, false);
			submission_1.addResponseData(dataSet_3, false);
			submission_1.addResponseData(dataMap_2, false);
			app.register(submission_1);
			
			var submission_2 = new cpr.protocols.Submission("subList");
			submission_2.action = "/cmn/StdCmnObjSch/";
			submission_2.mediaType = "application/x-www-form-urlencoded";
			submission_2.addRequestData(dataMap_1);
			submission_2.addResponseData(dataSet_1, false);
			app.register(submission_2);
			
			var submission_3 = new cpr.protocols.Submission("subListTrv");
			submission_3.action = "/cmn/StdCmnObjSch/";
			submission_3.mediaType = "application/x-www-form-urlencoded";
			submission_3.addRequestData(dataMap_1);
			submission_3.addRequestData(dataMap_3);
			submission_3.addResponseData(dataSet_4, false);
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
			var userDefinedControl_1 = new udc.com.appHeader("appheader1");
			container.addChild(userDefinedControl_1, {
				"top": "5px",
				"right": "5px",
				"left": "5px",
				"height": "25px"
			});
			
			var button_1 = new cpr.controls.Button("btnCloseOk");
			button_1.value = "선택닫기";
			if(typeof onBtnCloseOkClick == "function") {
				button_1.addEventListener("click", onBtnCloseOkClick);
			}
			container.addChild(button_1, {
				"top": "415px",
				"left": "582px",
				"width": "60px",
				"height": "25px"
			});
			
			var button_2 = new cpr.controls.Button("btnCloseCancel");
			button_2.value = "화면닫기";
			button_2.style.setClasses(["btn-commit"]);
			if(typeof onBtnCloseCancelClick == "function") {
				button_2.addEventListener("click", onBtnCloseCancelClick);
			}
			container.addChild(button_2, {
				"top": "415px",
				"left": "10px",
				"width": "60px",
				"height": "25px"
			});
			
			var tabFolder_1 = new cpr.controls.TabFolder("tabMst");
			
			var tabItem_1 = (function(tabFolder){
				var tabItem_1 = new cpr.controls.TabItem();
				tabItem_1.text = "tab1";
				tabItem_1.name = "tpgSearch";
				var group_1 = new cpr.controls.Container("grptpgSearch");
				// Layout
				var formLayout_1 = new cpr.controls.layouts.FormLayout();
				formLayout_1.topMargin = "0px";
				formLayout_1.rightMargin = "0px";
				formLayout_1.bottomMargin = "0px";
				formLayout_1.leftMargin = "0px";
				formLayout_1.horizontalSpacing = "0px";
				formLayout_1.verticalSpacing = "0px";
				formLayout_1.setColumns(["1fr"]);
				formLayout_1.setRows(["1fr"]);
				group_1.setLayout(formLayout_1);
				(function(container){
					var group_2 = new cpr.controls.Container("grpSearch");
					group_2.style.setClasses(["search-box"]);
					// Layout
					var xYLayout_2 = new cpr.controls.layouts.XYLayout();
					group_2.setLayout(xYLayout_2);
					(function(container){
						var output_1 = new cpr.controls.Output("optObjDivRcd");
						output_1.value = "";
						output_1.bind("value").toLanguage("UI-SCR-OBJDIV");
						container.addChild(output_1, {
							"top": "5px",
							"left": "5px",
							"width": "90px",
							"height": "25px"
						});
						var output_2 = new cpr.controls.Output("optLanDivRcd");
						output_2.value = "";
						output_2.bind("value").toLanguage("UI-SCR-LANKEY");
						container.addChild(output_2, {
							"top": "5px",
							"left": "246px",
							"width": "90px",
							"height": "25px"
						});
						var inputBox_1 = new cpr.controls.InputBox("ipbObjCd");
						inputBox_1.bind("value").toDataMap(app.lookup("dmReqCmd"), "strObjCd");
						if(typeof onIpbObjCdKeydown == "function") {
							inputBox_1.addEventListener("keydown", onIpbObjCdKeydown);
						}
						container.addChild(inputBox_1, {
							"top": "28px",
							"left": "98px",
							"width": "140px",
							"height": "25px"
						});
						var output_3 = new cpr.controls.Output("optObjCd");
						output_3.value = "";
						output_3.bind("value").toLanguage("UI-DB-OBJ_CD");
						container.addChild(output_3, {
							"top": "28px",
							"left": "5px",
							"width": "90px",
							"height": "25px"
						});
						var output_4 = new cpr.controls.Output("optObjNm");
						output_4.value = "";
						output_4.bind("value").toLanguage("UI-SCR-OBJNM");
						container.addChild(output_4, {
							"top": "28px",
							"left": "246px",
							"width": "90px",
							"height": "25px"
						});
						var inputBox_2 = new cpr.controls.InputBox("ipbObjNm");
						inputBox_2.bind("value").toDataMap(app.lookup("dmReqCmd"), "strObjNm");
						if(typeof onIpbObjNmKeydown == "function") {
							inputBox_2.addEventListener("keydown", onIpbObjNmKeydown);
						}
						container.addChild(inputBox_2, {
							"top": "28px",
							"left": "340px",
							"width": "140px",
							"height": "25px"
						});
						var button_3 = new cpr.controls.Button("btnSearch");
						button_3.value = "조회";
						button_3.style.setClasses(["btn-search"]);
						if(typeof onBtnSearchClick == "function") {
							button_3.addEventListener("click", onBtnSearchClick);
						}
						if(typeof onBtnSearchClick == "function") {
							button_3.addEventListener("click", onBtnSearchClick);
						}
						container.addChild(button_3, {
							"top": "5px",
							"left": "565px",
							"width": "60px",
							"height": "25px"
						});
						var comboBox_1 = new cpr.controls.ComboBox("cbbObjDivRcd");
						comboBox_1.multiple = true;
						comboBox_1.userAttr({"require": "Y"});
						comboBox_1.bind("fieldLabel").toExpression("#optSystemTitle.value");
						comboBox_1.bind("value").toDataMap(app.lookup("dmReqCmd"), "strObjDivRcd");
						(function(comboBox_1){
							comboBox_1.addItem(new cpr.controls.Item("전체", ""));
							comboBox_1.setItemSet(app.lookup("dsListObjDivRcd"), {
								"label": "CD_NM",
								"value": "CD"
							});
						})(comboBox_1);
						container.addChild(comboBox_1, {
							"top": "5px",
							"left": "98px",
							"width": "140px",
							"height": "25px"
						});
						var comboBox_2 = new cpr.controls.ComboBox("cbbLanDivRcd");
						comboBox_2.userAttr({"require": "Y"});
						comboBox_2.bind("fieldLabel").toExpression("#optSystemTitle.value");
						comboBox_2.bind("value").toDataMap(app.lookup("dmReqCmd"), "strLanDivRcd");
						(function(comboBox_2){
							comboBox_2.addItem(new cpr.controls.Item("전체", ""));
							comboBox_2.setItemSet(app.lookup("dsListLanDivRcd"), {
								"label": "CD_NM",
								"value": "CD"
							});
						})(comboBox_2);
						container.addChild(comboBox_2, {
							"top": "5px",
							"left": "340px",
							"width": "140px",
							"height": "25px"
						});
						var output_5 = new cpr.controls.Output("ipbObjDivRcd");
						output_5.visible = false;
						output_5.value = "";
						container.addChild(output_5, {
							"top": "5px",
							"left": "98px",
							"width": "140px",
							"height": "25px"
						});
					})(group_2);
					container.addChild(group_2, {
						"top": "5px",
						"left": "5px",
						"width": "630px",
						"height": "55px"
					});
					var group_3 = new cpr.controls.Container("grp_rptCmnSat");
					// Layout
					var xYLayout_3 = new cpr.controls.layouts.XYLayout();
					group_3.setLayout(xYLayout_3);
					(function(container){
						var userDefinedControl_2 = linker.userDefinedControl_2 = new udc.com.comTitle();
						userDefinedControl_2.bind("title").toLanguage("");
						container.addChild(userDefinedControl_2, {
							"top": "5px",
							"left": "5px",
							"width": "256px",
							"height": "25px"
						});
						var grid_1 = linker.grid_1 = new cpr.controls.Grid("grdCmnSat");
						grid_1.init({
							"dataSet": app.lookup("dsCmnSat"),
							"columns": [
								{"width": "77px"},
								{"width": "65px"},
								{"width": "115px"},
								{"width": "132px"},
								{"width": "67px"},
								{"width": "72px"},
								{"width": "72px"},
								{"width": "100px"},
								{"width": "100px"}
							],
							"header": {
								"rows": [{"height": "27px"}],
								"cells": [
									{
										"constraint": {"rowIndex": 0, "colIndex": 0},
										"configurator": function(cell){
											cell.bind("text").toLanguage("UI-SCR-OBJDIV");
										}
									},
									{
										"constraint": {"rowIndex": 0, "colIndex": 1},
										"configurator": function(cell){
											cell.bind("text").toLanguage("UI-DB-OBJ_CD");
										}
									},
									{
										"constraint": {"rowIndex": 0, "colIndex": 2},
										"configurator": function(cell){
											cell.bind("text").toLanguage("UI-SCR-SA_POST_DIV_RCD");
										}
									},
									{
										"constraint": {"rowIndex": 0, "colIndex": 3},
										"configurator": function(cell){
											cell.bind("text").toLanguage("UI-SCR-OBJNM");
										}
									},
									{
										"constraint": {"rowIndex": 0, "colIndex": 4},
										"configurator": function(cell){
											cell.bind("text").toLanguage("UI-SCR-DIVISION");
										}
									},
									{
										"constraint": {"rowIndex": 0, "colIndex": 5},
										"configurator": function(cell){
											cell.bind("text").toLanguage("UI-DB-ST_DT");
										}
									},
									{
										"constraint": {"rowIndex": 0, "colIndex": 6},
										"configurator": function(cell){
											cell.bind("text").toLanguage("UI-DB-END_DT");
										}
									},
									{
										"constraint": {"rowIndex": 0, "colIndex": 7},
										"configurator": function(cell){
											cell.text = "REF_KEY";
										}
									},
									{
										"constraint": {"rowIndex": 0, "colIndex": 8},
										"configurator": function(cell){
											cell.text = "LAN_DIV_RCD";
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
											cell.columnName = "OBJ_DIV_RCD";
											cell.control = (function(){
												var comboBox_3 = new cpr.controls.ComboBox("gdCbbObjDivRcd");
												comboBox_3.enabled = false;
												comboBox_3.hideButton = true;
												(function(comboBox_3){
													comboBox_3.setItemSet(app.lookup("dsListObjDivRcd"), {
														"label": "CD_NM",
														"value": "CD"
													});
												})(comboBox_3);
												comboBox_3.bind("value").toDataColumn("OBJ_DIV_RCD");
												return comboBox_3;
											})();
										}
									},
									{
										"constraint": {"rowIndex": 0, "colIndex": 1},
										"configurator": function(cell){
											cell.columnName = "CD";
										}
									},
									{
										"constraint": {"rowIndex": 0, "colIndex": 2},
										"configurator": function(cell){
											cell.columnName = "SA_POST_DIV_RCD_NM";
										}
									},
									{
										"constraint": {"rowIndex": 0, "colIndex": 3},
										"configurator": function(cell){
											cell.columnName = "CD_NM";
										}
									},
									{
										"constraint": {"rowIndex": 0, "colIndex": 4},
										"configurator": function(cell){
											cell.columnName = "UNI_GRAD_NM";
										}
									},
									{
										"constraint": {"rowIndex": 0, "colIndex": 5},
										"configurator": function(cell){
											cell.columnName = "ST_DT";
										}
									},
									{
										"constraint": {"rowIndex": 0, "colIndex": 6},
										"configurator": function(cell){
											cell.columnName = "END_DT";
										}
									},
									{
										"constraint": {"rowIndex": 0, "colIndex": 7},
										"configurator": function(cell){
											cell.columnName = "REF_KEY";
										}
									},
									{
										"constraint": {"rowIndex": 0, "colIndex": 8},
										"configurator": function(cell){
											cell.columnName = "LAN_DIV_RCD";
										}
									}
								]
							}
						});
						if(typeof onGrdCmnSatRowDblclick == "function") {
							grid_1.addEventListener("row-dblclick", onGrdCmnSatRowDblclick);
						}
						container.addChild(grid_1, {
							"top": "30px",
							"left": "5px",
							"width": "620px",
							"height": "245px"
						});
					})(group_3);
					container.addChild(group_3, {
						"top": "65px",
						"left": "5px",
						"width": "630px",
						"height": "280px"
					});
				})(group_1);
				tabItem_1.content = group_1;
				return tabItem_1;
			})(tabFolder_1);
			tabFolder_1.addTabItem(tabItem_1);
			
			var tabItem_2 = (function(tabFolder){
				var tabItem_2 = new cpr.controls.TabItem();
				tabItem_2.text = "tab1";
				tabItem_2.name = "tpgTree";
				var group_4 = new cpr.controls.Container("grptpgTree");
				// Layout
				var formLayout_2 = new cpr.controls.layouts.FormLayout();
				formLayout_2.topMargin = "0px";
				formLayout_2.rightMargin = "0px";
				formLayout_2.bottomMargin = "0px";
				formLayout_2.leftMargin = "0px";
				formLayout_2.horizontalSpacing = "0px";
				formLayout_2.verticalSpacing = "0px";
				formLayout_2.setColumns(["1fr"]);
				formLayout_2.setRows(["1fr"]);
				group_4.setLayout(formLayout_2);
				(function(container){
					var button_4 = new cpr.controls.Button("btnExpandAll");
					button_4.value = "";
					button_4.bind("value").toLanguage("UI-SCR-SHOWALL");
					if(typeof onBtnExpandAllClick == "function") {
						button_4.addEventListener("click", onBtnExpandAllClick);
					}
					container.addChild(button_4, {
						"top": "5px",
						"left": "5px",
						"width": "100px",
						"height": "25px"
					});
				})(group_4);
				tabItem_2.content = group_4;
				return tabItem_2;
			})(tabFolder_1);
			tabFolder_1.addTabItem(tabItem_2);
			tabFolder_1.setSelectedTabItem(tabItem_1);
			container.addChild(tabFolder_1, {
				"top": "60px",
				"left": "5px",
				"width": "640px",
				"height": "350px"
			});
			
			var button_5 = new cpr.controls.Button("tbtSearch");
			button_5.value = "";
			button_5.bind("value").toLanguage("UI-GLS-SRH");
			if(typeof onTbtSearchClick == "function") {
				button_5.addEventListener("click", onTbtSearchClick);
			}
			container.addChild(button_5, {
				"top": "35px",
				"left": "5px",
				"width": "80px",
				"height": "25px"
			});
			
			var button_6 = new cpr.controls.Button("tbtTree");
			button_6.value = "";
			button_6.bind("value").toLanguage("UI-SCR-TREESTRU");
			if(typeof onTbtTreeClick == "function") {
				button_6.addEventListener("click", onTbtTreeClick);
			}
			container.addChild(button_6, {
				"top": "35px",
				"left": "87px",
				"width": "80px",
				"height": "25px"
			});
			if(typeof onBodyLoad == "function"){
				app.addEventListener("load", onBodyLoad);
			}
			// Linking
			linker.userDefinedControl_2.ctrl = linker.grid_1;
		}
	});
	app.title = "객체검색화면(PopUp)";
	cpr.core.Platform.INSTANCE.register(app);
})();