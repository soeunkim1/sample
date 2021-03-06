/*
 * App URI: app/cmn/stdCmnCOptGrpCond
 * Source Location: app/cmn/stdCmnCOptGrpCond.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("app/cmn/stdCmnCOptGrpCond", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			/*공통모듈*/
			var util = new ComUtil(app);
			
			/*사용자 정의 함수*/
			//조회
			function doList(poCallBackFunc){
				util.Submit.send(app, "subList", function(pbSuccess){
					if(pbSuccess){
						if(util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
					}
				});
			}
			
			//저장
			function doSave(){
				//그리드에 변경 사항이 있는지 체크
				if(!util.Grid.isModified(app, "grdCmnOptGrpCond", "MSG")){
					return false;
				}
				
				//그리드에서 필수값 체크
				if(!util.validate(app, "grdCmnOptGrpCond")){
					return false;
				}
				
				util.Submit.send(app, "subSave", function(pbSuccess){
					if(pbSuccess){
						doList(function(pbListSuccess){
							if(pbListSuccess){
								//MSG --> 갱신된 데이터가 조회되었습니다.
								util.Msg.notify(app, "NLS-INF-M025");
							}
						});
					}
				});
			}
			
			/*
			 * Body에서 load 이벤트 발생 시 호출.
			 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
			 */
			function onBodyLoad(/* cpr.events.CEvent */ e){
				//조회 위한 콤보박스를 불러옴
				util.Submit.send(app, "subOnLoad", function(pbSuccess){
					if(pbSuccess){
						util.SelectCtl.selectItem(app, "cbbOptGrpCd", 0);
						util.Control.redraw(app, "cbbOptGrpCd");
					}
				}, false);
			}
			
			/*
			 * 사용자 정의 컨트롤에서 search 이벤트 발생 시 호출.
			 */
			function onBtnSearchSearch(/* cpr.events.CUIEvent */ e){
				/** 
				 * @type udc.com.btnSearch
				 */
				var btnSearch = e.control;
				//변경사항 체크
				if(util.Grid.isModified(app, "grdCmnOptGrpCond", "CRM")){
					return false;
				}
				
				//콤보박스가 필수이므로 조건이 설정되었는지 체크
				if(util.validate(app, "grpSearch")){
					doList(function(pbSuccess){
						if(pbSuccess){
							util.Msg.notify(app, "NLS-INF-M024");
						}
					});		
				}
			}
			
			/*
			 * 사용자 정의 컨트롤에서 insert 이벤트 발생 시 호출.
			 */
			function onGrid_ids_btn1Insert(/* cpr.event.CUIEvent */ e){
				/** 
				 * @type udc.com.grid_IDS_Btn
				 */
				var grid_ids_btn1 = e.control;
				//행 추가 시 PK인 OPT_GRP_CD에 콤보값을 넣어줌
				var pnRowIndex = util.Grid.getIndex(app, "grdCmnOptGrpCond");
				var psValue = util.Control.getValue(app, "cbbOptGrpCd");
				util.Grid.setCellValue(app, "grdCmnOptGrpCond", "OPT_GRP_CD", psValue, pnRowIndex);
			}
			
			/*
			 * 사용자 정의 컨트롤에서 delete 이벤트 발생 시 호출.
			 */
			function onGrid_ids_btn1Delete(/* cpr.event.CUIEvent */ e){
				/** 
				 * @type udc.com.grid_IDS_Btn
				 */
				var grid_ids_btn1 = e.control;
				
				//XXX 기존 eXbuilder5에서 제대로 동작하지 않아 로직 삭제
			//	var vaChkRowOrSelRowIdx = util.Grid.getChkRowOrSelRowIdx("grdCmnOptGrpCond");
			//	for(var i = 0; i < vaChkRowOrSelRowIdx.length ; i++){
			//		var vsStdYn = util.DataSet.getValue("dsCmnOptGrpCond", vaChkRowOrSelRowIdx[i], "STD_YN");
			//		var vsRowState = util.Grid.getRowState("grdCmnOptGrpCond", vaChkRowOrSelRowIdx[i]);
			//
			//		if(vsRowState != 2 && vsStdYn == "Y"){
			//			util.Msg.alert("NLS-CMM-M002");
			//			util.Grid.revertRowData("grdCmnOptGrpCond");
			//			util.Control.lookup("ghCkbSelect").checked = false;
			//			return false;
			//		}else{
			//			util.Grid.deleteRow("grdCmnOptGrpCond");			
			//		}
			//	}
			}
			
			/*
			 * 사용자 정의 컨트롤에서 save 이벤트 발생 시 호출.
			 */
			function onGrid_ids_btn1Save(/* cpr.event.CUIEvent */ e){
				/** 
				 * @type udc.com.grid_IDS_Btn
				 */
				var grid_ids_btn1 = e.control;
				doSave();
			};
			// End - User Script
			
			// Header
			var dataSet_1 = new cpr.data.DataSet("dsCmnOptGrpCond");
			dataSet_1.parseData({
				"info": "CMN_OPT_GRP_COND@LAN_DIV_RCD,OPT_GRP_CD,INPUT_KEY",
				"columns": [
					{"name": "INPUT_KEY"},
					{"name": "LAN_DIV_RCD"},
					{"name": "INPUT_NM"},
					{"name": "CONTROL_ID"},
					{"name": "SRH_SCREEN_ID"},
					{"name": "NM_CONTROL_ID"},
					{"name": "MAND_YN"},
					{"name": "PRT_ORD"},
					{"name": "OPT_GRP_CD"},
					{"name": "STD_YN"}
				],
				"rows": []
			});
			app.register(dataSet_1);
			
			var dataSet_2 = new cpr.data.DataSet("dsListLanDivRcd");
			dataSet_2.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_2);
			
			var dataSet_3 = new cpr.data.DataSet("dsListOptGrp");
			dataSet_3.parseData({
				"columns": [
					{"name": "OPT_GRP_CD"},
					{"name": "OPT_GRP_NM"}
				],
				"rows": []
			});
			app.register(dataSet_3);
			var dataMap_1 = new cpr.data.DataMap("dmReqCmd");
			dataMap_1.parseData({
				"columns" : [
					{
						"name": "strCdCls",
						"dataType": "string"
					},
					{
						"name": "strOptGrpCd",
						"dataType": "string"
					}
				]
			});
			app.register(dataMap_1);
			var submission_1 = new cpr.protocols.Submission("subOnLoad");
			submission_1.action = "/cmn/StdCmnOptGrpCond/";
			submission_1.mediaType = "application/x-www-form-urlencoded";
			submission_1.addResponseData(dataSet_2, false);
			submission_1.addResponseData(dataSet_3, false);
			app.register(submission_1);
			
			var submission_2 = new cpr.protocols.Submission("subList");
			submission_2.action = "/cmn/StdCmnOptGrpCond/";
			submission_2.mediaType = "application/x-www-form-urlencoded";
			submission_2.addRequestData(dataMap_1);
			submission_2.addResponseData(dataSet_1, false);
			app.register(submission_2);
			
			var submission_3 = new cpr.protocols.Submission("subSave");
			submission_3.action = "/cmn/StdCmnOptGrpCond/";
			submission_3.mediaType = "application/x-www-form-urlencoded";
			submission_3.addRequestData(dataSet_1);
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
				var output_1 = new cpr.controls.Output("optOptGrpCd");
				output_1.value = "";
				output_1.style.setClasses(["require"]);
				output_1.bind("value").toLanguage("UI-SCR-SELEGRP");
				container.addChild(output_1, {
					"top": "5px",
					"left": "5px",
					"width": "100px",
					"height": "25px"
				});
				var comboBox_1 = new cpr.controls.ComboBox("cbbOptGrpCd");
				comboBox_1.userAttr({"require": "Y"});
				comboBox_1.bind("fieldLabel").toExpression("#optOptGrpCd.value");
				comboBox_1.bind("value").toDataMap(app.lookup("dmReqCmd"), "strOptGrpCd");
				(function(comboBox_1){
					comboBox_1.setItemSet(app.lookup("dsListOptGrp"), {
						"label": "OPT_GRP_NM",
						"value": "OPT_GRP_CD"
					});
				})(comboBox_1);
				container.addChild(comboBox_1, {
					"top": "5px",
					"left": "110px",
					"width": "250px",
					"height": "25px"
				});
			})(group_1);
			container.addChild(group_1, {
				"top": "35px",
				"left": "5px",
				"width": "1225px",
				"height": "32px"
			});
			
			var group_2 = new cpr.controls.Container("grp_rptCmnOptGrpCond");
			// Layout
			var xYLayout_3 = new cpr.controls.layouts.XYLayout();
			group_2.setLayout(xYLayout_3);
			(function(container){
				var userDefinedControl_2 = linker.userDefinedControl_2 = new udc.com.comTitle();
				userDefinedControl_2.bind("title").toLanguage("UI-SCR-SELGRPINSCDTLST");
				container.addChild(userDefinedControl_2, {
					"top": "5px",
					"left": "5px",
					"width": "355px",
					"height": "25px"
				});
				var button_2 = new cpr.controls.Button("btnNew");
				button_2.value = "";
				button_2.style.setClasses(["btn-new"]);
				button_2.bind("value").toLanguage("UI-SCR-NEW");
				if(typeof onBtnNewClick == "function") {
					button_2.addEventListener("click", onBtnNewClick);
				}
				container.addChild(button_2, {
					"top": "5px",
					"left": "965px",
					"width": "60px",
					"height": "25px"
				});
				var button_3 = new cpr.controls.Button("btnDel");
				button_3.value = "";
				button_3.style.setClasses(["btn-delete"]);
				button_3.bind("value").toLanguage("UI-SCR-DELETE");
				if(typeof onBtnDelClick == "function") {
					button_3.addEventListener("click", onBtnDelClick);
				}
				container.addChild(button_3, {
					"top": "5px",
					"left": "1030px",
					"width": "60px",
					"height": "25px"
				});
				var button_4 = new cpr.controls.Button("btnRestore");
				button_4.value = "";
				button_4.style.setClasses(["btn-restore"]);
				button_4.bind("value").toLanguage("UI-SCR-WRKCANCL");
				if(typeof onBtnRestoreClick == "function") {
					button_4.addEventListener("click", onBtnRestoreClick);
				}
				container.addChild(button_4, {
					"top": "5px",
					"left": "1095px",
					"width": "60px",
					"height": "25px"
				});
				var button_5 = new cpr.controls.Button("btnSave");
				button_5.value = "";
				button_5.style.setClasses(["btn-save"]);
				button_5.bind("value").toLanguage("UI-SCR-WRKSAVE");
				if(typeof onBtnSaveClick == "function") {
					button_5.addEventListener("click", onBtnSaveClick);
				}
				container.addChild(button_5, {
					"top": "5px",
					"left": "1160px",
					"width": "60px",
					"height": "25px"
				});
				var grid_1 = linker.grid_1 = new cpr.controls.Grid("grdCmnOptGrpCond");
				grid_1.init({
					"dataSet": app.lookup("dsCmnOptGrpCond"),
					"columns": [
						{"width": "25px"},
						{"width": "25px"},
						{"width": "40px"},
						{"width": "198px"},
						{"width": "119px"},
						{"width": "173px"},
						{"width": "177px"},
						{"width": "156px"},
						{"width": "117px"},
						{"width": "93px"},
						{"width": "93px"},
						{
							"width": "93px",
							"visible": false
						},
						{
							"width": "93px",
							"visible": false
						}
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
									cell.style.setClasses(["require"]);
									cell.bind("text").toLanguage("UI-SCR-INSFLDKEY");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 4},
								"configurator": function(cell){
									cell.style.setClasses(["require"]);
									cell.bind("text").toLanguage("UI-SCR-LANDIS");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 5},
								"configurator": function(cell){
									cell.style.setClasses(["require"]);
									cell.bind("text").toLanguage("UI-SCR-INSFLDLABEL");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 6},
								"configurator": function(cell){
									cell.style.setClasses(["require"]);
									cell.bind("text").toLanguage("UI-DB-CONTROL_ID");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 7},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-DB-SRH_SCREEN_ID");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 8},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-DB-NM_CONTROL_ID");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 9},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-DB-MAND_YN");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 10},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-DB-PRT_ORD");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 11},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-GLS-MSG");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 12},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-GLS-MSG");
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
									cell.columnType = "rowindex";
									cell.style.css({
										"text-align" : "center"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 3},
								"configurator": function(cell){
									cell.columnName = "INPUT_KEY";
									cell.control = (function(){
										var inputBox_1 = new cpr.controls.InputBox("gdIpbInputKey");
										inputBox_1.maxLength = 50;
										inputBox_1.imeMode = "inactive";
										inputBox_1.userAttr({"require": "Y"});
										inputBox_1.bind("value").toDataColumn("INPUT_KEY");
										return inputBox_1;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 4},
								"configurator": function(cell){
									cell.columnName = "LAN_DIV_RCD";
									cell.control = (function(){
										var comboBox_2 = new cpr.controls.ComboBox("gdCbbLanDivRcd");
										comboBox_2.userAttr({"require": "Y"});
										(function(comboBox_2){
											comboBox_2.addItem(new cpr.controls.Item("선택", ""));
											comboBox_2.setItemSet(app.lookup("dsListLanDivRcd"), {
												"label": "CD_NM",
												"value": "CD"
											});
										})(comboBox_2);
										comboBox_2.bind("value").toDataColumn("LAN_DIV_RCD");
										return comboBox_2;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 5},
								"configurator": function(cell){
									cell.columnName = "INPUT_NM";
									cell.control = (function(){
										var inputBox_2 = new cpr.controls.InputBox("gdIpbInputNm");
										inputBox_2.maxLength = 50;
										inputBox_2.imeMode = "inactive";
										inputBox_2.userAttr({"require": "Y"});
										inputBox_2.bind("value").toDataColumn("INPUT_NM");
										return inputBox_2;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 6},
								"configurator": function(cell){
									cell.columnName = "CONTROL_ID";
									cell.control = (function(){
										var inputBox_3 = new cpr.controls.InputBox("gdIpbCtlId");
										inputBox_3.maxLength = 50;
										inputBox_3.imeMode = "inactive";
										inputBox_3.userAttr({"require": "Y"});
										inputBox_3.bind("value").toDataColumn("CONTROL_ID");
										return inputBox_3;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 7},
								"configurator": function(cell){
									cell.columnName = "SRH_SCREEN_ID";
									cell.control = (function(){
										var inputBox_4 = new cpr.controls.InputBox("gdIpbSrhScreenId");
										inputBox_4.maxLength = 50;
										inputBox_4.imeMode = "inactive";
										inputBox_4.bind("value").toDataColumn("SRH_SCREEN_ID");
										return inputBox_4;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 8},
								"configurator": function(cell){
									cell.columnName = "NM_CONTROL_ID";
									cell.control = (function(){
										var inputBox_5 = new cpr.controls.InputBox("gdIpbNmCtlId");
										inputBox_5.maxLength = 50;
										inputBox_5.imeMode = "inactive";
										inputBox_5.bind("value").toDataColumn("NM_CONTROL_ID");
										return inputBox_5;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 9},
								"configurator": function(cell){
									cell.columnName = "MAND_YN";
									cell.control = (function(){
										var checkBox_1 = new cpr.controls.CheckBox("gdCkbMandYn");
										checkBox_1.value = "";
										checkBox_1.trueValue = "Y";
										checkBox_1.falseValue = "";
										checkBox_1.text = "";
										checkBox_1.style.css({
											"text-align" : "center"
										});
										checkBox_1.bind("value").toDataColumn("MAND_YN");
										return checkBox_1;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 10},
								"configurator": function(cell){
									cell.columnName = "PRT_ORD";
									cell.control = (function(){
										var inputBox_6 = new cpr.controls.InputBox("gdIpbPrtOgd");
										inputBox_6.maxLength = 10;
										inputBox_6.bind("value").toDataColumn("PRT_ORD");
										return inputBox_6;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 11},
								"configurator": function(cell){
									cell.columnName = "OPT_GRP_CD";
									cell.control = (function(){
										var inputBox_7 = new cpr.controls.InputBox("gdIpbOptGrpCd");
										inputBox_7.maxLength = 300;
										inputBox_7.userAttr({"require": "Y"});
										inputBox_7.bind("value").toDataColumn("OPT_GRP_CD");
										return inputBox_7;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 12},
								"configurator": function(cell){
									cell.columnName = "STD_YN";
									cell.control = (function(){
										var inputBox_8 = new cpr.controls.InputBox("gdIpbStdYn");
										inputBox_8.maxLength = 300;
										inputBox_8.bind("value").toDataColumn("STD_YN");
										return inputBox_8;
									})();
								}
							}
						]
					}
				});
				if(typeof onGrdCmnOptGrpCondSelectionChange == "function") {
					grid_1.addEventListener("selection-change", onGrdCmnOptGrpCondSelectionChange);
				}
				container.addChild(grid_1, {
					"top": "30px",
					"left": "5px",
					"width": "1215px",
					"height": "565px"
				});
			})(group_2);
			container.addChild(group_2, {
				"top": "72px",
				"left": "5px",
				"width": "1225px",
				"height": "600px"
			});
			if(typeof onBodyLoad == "function"){
				app.addEventListener("load", onBodyLoad);
			}
			// Linking
			linker.userDefinedControl_2.ctrl = linker.grid_1;
		}
	});
	app.title = "선택그룹조건입력";
	cpr.core.Platform.INSTANCE.register(app);
})();
