/*
 * App URI: app/cmn/stdCmnCTriggerCreator
 * Source Location: app/cmn/stdCmnCTriggerCreator.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("app/cmn/stdCmnCTriggerCreator", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			//공통 모듈 사용
			var util = new ComUtil(app);
			
			/*
			 * Body에서 load 이벤트 발생 시 호출.
			 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
			 */
			function onBodyLoad(/* cpr.events.CEvent */ e){
					//리피트 초기 설정 - appheader1 에서 설정
					//검색조건 초기 설정 - appheader1 에서 설정
					
					//서브미션 실행 (실패시 cover page)
					util.Submit.send(app, "subOnLoad", function(pbSuccess){
						if(pbSuccess){
							util.SelectCtl.selectItem(app, "cbbUnitSystemRcd", 0);
							util.Control.redraw(app, "cbbUnitSystemRcd");
						}
					}, true);
			}//onBodyLoad()
			
			/*
			 * 그룹에서 keydown 이벤트 발생 시 호출.
			 * 사용자가 키를 누를 때 발생하는 이벤트.
			 */
			function onGrpSearchKeydown(/* cpr.events.CKeyboardEvent */ e){
				/** 
				 * @type cpr.controls.Container
				 */
				var grpSearch = e.control;
				if(e.keyCode == 13){
					app.lookup("btnSearch").click();
				}
			}//onGrpSearchKeydown()
			
			/*
			 * "" 버튼에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onBtnSearchClick(/* cpr.events.CMouseEvent */ e){
				/** 
				 * @type cpr.controls.Button
				 */
				var btnSearch = e.control;
				doList(function(pbSuccess) {
					// 조회 : "조회되었습니다." header 메세지 표시
					if (pbSuccess) {
						util.Msg.notify(app, "NLS-INF-M024");
					}
				});
			}//onBtnSearchClick()
			
			/**
			 * @desc 조회 event
			 * @param poCallBackFunc 조회 후 callback함수
			 * @return void
			 */
			function doList(poCallBackFunc) {
				util.Submit.send(app, "subList", function(pbSuccess){
					if(pbSuccess){
						util.Control.redraw(app, "grdTable");
						// 조회 후 콜백함수 수행
						if (util.isFunc(poCallBackFunc)){
							poCallBackFunc(pbSuccess);
						}
					}
				});
			}
			
			/*
			 * "" 버튼에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onBtnCrtTglTable1Click(/* cpr.events.CMouseEvent */ e){
				/** 
				 * @type cpr.controls.Button
				 */
				var btnCrtTglTable1 = e.control;
				doBtnCrtTriggerDelClick();
			}//onBtnCrtTglTable1Click()
			
			function doBtnCrtTriggerDelClick() {
				// 그리드에서 선택된 데이터를 체크한다.
				var vsPanelCheckIdx = util.Grid.getCheckOrSelectedRowIndex(app, "grdTable");
				var vnRow = 0;
				var vsTlgTableYn = "";
				var vsTableName = "";
				
				if(!ValueUtil.isNull(vsPanelCheckIdx) && vsPanelCheckIdx.length > 0){
					if(!confirm([util.Msg.getMsg("NLS-CMM-M048")])){
						return;
					}
					
					for(var i=0;i<vsPanelCheckIdx.length;i++){
						vnRow = vsPanelCheckIdx[i];
						vsTlgTableYn = util.Grid.getCellValue(app, "grdTable","TLG_TABLE_YN",vnRow);
						if(vsTlgTableYn == "N"){
							util.Msg.alert("NLS-CMM-M047", [util.Grid.getCellValue(app, "grdTable","TABLE_NAME",vnRow)]);	
							return;
						}
						vsTableName  += "'"+util.Grid.getCellValue(app, "grdTable","TABLE_NAME",vnRow) + "',";
						util.Grid.setRowState(app, "grdTable", cpr.data.tabledata.RowState.UPDATED, vnRow);
					}
					vsTableName = vsTableName.substring(0, vsTableName.length - 1);
					util.DataMap.setValue(app, "dmReqList", "strTableName", vsTableName);
					var vsCond = "TABLE_NAME == " + vsTableName;
					util.Grid.setFindRowCondition(app, "grdTable", vsCond);
					doCrtTblDel();
				}else{
					util.Msg.alert("NLS-WRN-M008");
				}
			}
			
			function doCrtTblDel(){
				
				util.Submit.send(app, "subCrtTblDel", function(pbSuccess){
					if(pbSuccess){
						//말풍선 옆에 특정 메세지를 표시한다.("갱신된 데이터가 조회되었습니다.")
						util.Msg.notify(app, "NLS-INF-M025");
						doList();
					}
				});
			}
			
			/*
			 * "" 버튼에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onBtnCrtTglTableClick(/* cpr.events.CMouseEvent */ e){
				/** 
				 * @type cpr.controls.Button
				 */
				var btnCrtTglTable = e.control;
				doBtnCrtTriggerClick();
			}//onBtnCrtTglTableClick()
			
			
			/**
			 * @desc TLG테이블생성 버튼 클릭 event
			 * @return void
			 */
			function doBtnCrtTriggerClick() {
				// 그리드에서 선택된 데이터를 체크한다.
				var vsPanelCheckIdx = util.Grid.getCheckOrSelectedRowIndex(app, "grdTable");
				var vnRow = 0;
				var vsTlgTableYn = "";
				var vsTableName = "";
				
				if(!ValueUtil.isNull(vsPanelCheckIdx) && vsPanelCheckIdx.length > 0){
					
					for(var i=0;i<vsPanelCheckIdx.length;i++){
						vnRow = vsPanelCheckIdx[i];
						vsTlgTableYn = util.Grid.getCellValue(app, "grdTable","TLG_TABLE_YN",vnRow);
						if(vsTlgTableYn == "Y"){
							// 이미 TLG테이블이 생성된 내역이 있습니다.생성할 수 없습니다.
							util.Msg.alert("NLS-CMM-M029");
							return;
						}
						vsTableName  += "'"+util.Grid.getCellValue(app, "grdTable","TABLE_NAME",vnRow) + "',";
						util.Grid.setRowState(app, "grdTable", cpr.data.tabledata.RowState.UPDATED, vnRow);
					}
			
					//TLG테이블을 생성
					if(!util.Msg.confirm("NLS-CRM-M010", [util.Msg.getMsg("NLS-CMM-M030")])){//TLG테이블을 생성합니다.
						return;
					}
					vsTableName = vsTableName.substring(0, vsTableName.length - 1);
					util.DataMap.setValue(app, "dmReqList", "strTableName", vsTableName);
					var vsCond = "TABLE_NAME == " + vsTableName;
					util.Grid.setFindRowCondition(app, "grdTable", vsCond);
					doCrtTbl();
				}else{
					// 선택된 데이터가 없습니다.)
					util.Msg.alert("NLS-WRN-M008");
				}
			}//doBtnCrtTriggerClick()
			
			/**
			 * @desc TLG테이블생성
			 * @return void
			 */
			function doCrtTbl(){
				util.Submit.send(app, "subCrtTbl", function(pbSuccess){
					if(pbSuccess){
						//말풍선 옆에 특정 메세지를 표시한다.("갱신된 데이터가 조회되었습니다.")
						util.Msg.notify(app, "NLS-INF-M025");
						doList();
					}
				});
			}//doCrtTbl()
			/*
			 * "" 버튼에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onBtnCrtTriggerClick(/* cpr.events.CMouseEvent */ e){
				/** 
				 * @type cpr.controls.Button
				 */
				var btnCrtTrigger = e.control;
				doBtnCrtTrigger();
			}//onBtnCrtTriggerClick()
			
			/**
			 * @desc TLG트리거생성 버튼 클릭 event
			 * @return void
			 */
			function doBtnCrtTrigger() {
			
				// 그리드에서 선택된 데이터를 체크한다.
				var vsPanelCheckIdx = util.Grid.getCheckOrSelectedRowIndex(app, "grdTable");
				var vnRow = 0;
				var vsTlgTableYn = "";
				var vsTableName = "' '";
				
				if(!ValueUtil.isNull(vsPanelCheckIdx) && vsPanelCheckIdx.length > 0){
					
					for(var i=0;i<vsPanelCheckIdx.length;i++){
						vnRow = vsPanelCheckIdx[i];
						vsTlgTableYn = util.Grid.getCellValue(app, "grdTable","TLG_TABLE_YN",vnRow);
						vsTableName  += ", '"+util.Grid.getCellValue(app, "grdTable","TABLE_NAME",vnRow) + "'";
						if(vsTlgTableYn != "Y"){
							//TGL테이블이 생성되지 않은 내역이 있습니다.
							util.Msg.alert("NLS-CMM-M031");
							return;
						}
			
						util.Grid.setRowState(app, "grdTable", cpr.data.tabledata.RowState.UPDATED, vnRow);
					}
					
					//TLG 트리거를 생성합니다.
					if(!util.Msg.confirm("NLS-CRM-M010", [util.Msg.getMsg("NLS-CMM-M032")])){
						return;
					}
					util.DataMap.setValue(app, "dmReqList", "strTableName", vsTableName);
					var vsCond = "TABLE_NAME == " + vsTableName;
					util.Grid.setFindRowCondition(app, "grdTable", vsCond);
					doCrtTrigger();
				}else{
					// 선택된 데이터가 없습니다.
					util.Msg.alert("NLS-WRN-M008");
				}
			}//doBtnCrtTrigger()
			
			/**
			 * @desc TLG트리거생성
			 * @return void
			 */
			function doCrtTrigger(){
				util.Submit.send(app, "subCrtTlg", function(pbSuccess){
					if(pbSuccess){
						//말풍선 옆에 특정 메세지를 표시한다. ("갱신된 데이터가 조회되었습니다.")
						util.Msg.notify(app, "NLS-INF-M025");
						doList();
					}
				});
			}//doCrtTrigger();
			// End - User Script
			
			// Header
			var dataSet_1 = new cpr.data.DataSet("dsTable");
			dataSet_1.parseData({
				"info": "CMN_TABLE@TABLE_NAME",
				"columns": [
					{"name": "TABLE_NAME"},
					{"name": "OBJECT_NAME"},
					{"name": "EDITION_NAME"},
					{"name": "COMMENTS"},
					{"name": "GENERATED"},
					{"name": "OBJECT_TYPE"},
					{"name": "OBJECT_ID"},
					{"name": "CREATED"},
					{"name": "TLG_TRG_YN"},
					{"name": "SUBOBJECT_NAME"},
					{"name": "SECONDARY"},
					{"name": "TLG_TABLE_YN"},
					{"name": "TEMPORARY"},
					{"name": "TIMESTAMP"},
					{"name": "NAMESPACE"},
					{"name": "DATA_OBJECT_ID"},
					{"name": "LAST_DDL_TIME"},
					{"name": "ERROR_YN"}
				],
				"rows": []
			});
			app.register(dataSet_1);
			
			var dataSet_2 = new cpr.data.DataSet("dsLanDivRcdList");
			dataSet_2.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_2);
			
			var dataSet_3 = new cpr.data.DataSet("dsUnitSystemRcdList");
			dataSet_3.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_3);
			var dataMap_1 = new cpr.data.DataMap("dmReqList");
			dataMap_1.parseData({
				"columns" : [
					{
						"name": "strTableName",
						"dataType": "string"
					},
					{
						"name": "strUnitSystemRcd",
						"dataType": "string"
					},
					{
						"name": "strTableNm",
						"dataType": "string"
					}
				]
			});
			app.register(dataMap_1);
			var submission_1 = new cpr.protocols.Submission("subOnLoad");
			submission_1.action = "/cmn/StdCmnTriggerCreator/";
			submission_1.mediaType = "application/x-www-form-urlencoded";
			submission_1.addResponseData(dataSet_3, false);
			app.register(submission_1);
			
			var submission_2 = new cpr.protocols.Submission("subList");
			submission_2.action = "/cmn/StdCmnTriggerCreator/";
			submission_2.mediaType = "application/x-www-form-urlencoded";
			submission_2.addRequestData(dataMap_1);
			submission_2.addResponseData(dataSet_1, false);
			app.register(submission_2);
			
			var submission_3 = new cpr.protocols.Submission("subCrtTbl");
			submission_3.action = "/cmn/StdCmnTriggerCreator/";
			submission_3.mediaType = "application/x-www-form-urlencoded";
			submission_3.addRequestData(dataMap_1);
			app.register(submission_3);
			
			var submission_4 = new cpr.protocols.Submission("subCrtTblDel");
			submission_4.action = "/cmn/StdCmnTriggerCreator/";
			submission_4.mediaType = "application/x-www-form-urlencoded";
			submission_4.addRequestData(dataMap_1);
			app.register(submission_4);
			
			var submission_5 = new cpr.protocols.Submission("subCrtTlg");
			submission_5.action = "/cmn/StdCmnTriggerCreator/";
			submission_5.mediaType = "application/x-www-form-urlencoded";
			submission_5.addRequestData(dataMap_1);
			app.register(submission_5);
			
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
				var output_1 = new cpr.controls.Output("optUnitSystemRcd");
				output_1.value = "";
				output_1.bind("value").toLanguage("UI-SCR-SYSTEMDIV");
				container.addChild(output_1, {
					"top": "5px",
					"left": "5px",
					"width": "100px",
					"height": "25px"
				});
				var comboBox_1 = new cpr.controls.ComboBox("cbbUnitSystemRcd");
				comboBox_1.bind("fieldLabel").toExpression("#optUnitSystemRcd.value");
				comboBox_1.bind("value").toDataMap(app.lookup("dmReqList"), "strUnitSystemRcd");
				(function(comboBox_1){
					comboBox_1.addItem(new cpr.controls.Item("전체", ""));
					comboBox_1.setItemSet(app.lookup("dsUnitSystemRcdList"), {
						"label": "CD_NM",
						"value": "CD"
					});
				})(comboBox_1);
				container.addChild(comboBox_1, {
					"top": "5px",
					"left": "110px",
					"width": "130px",
					"height": "25px"
				});
				var output_2 = new cpr.controls.Output("optTableNm");
				output_2.value = "";
				output_2.bind("value").toLanguage("UI-SCR-TBNM");
				container.addChild(output_2, {
					"top": "5px",
					"left": "250px",
					"width": "100px",
					"height": "25px"
				});
				var inputBox_1 = new cpr.controls.InputBox("ipbTableNm");
				inputBox_1.imeMode = "inactive";
				inputBox_1.bind("fieldLabel").toExpression("#optMsgText.value");
				inputBox_1.bind("value").toDataMap(app.lookup("dmReqList"), "strTableNm");
				if(typeof onIpbTableNmKeydown == "function") {
					inputBox_1.addEventListener("keydown", onIpbTableNmKeydown);
				}
				container.addChild(inputBox_1, {
					"top": "5px",
					"left": "355px",
					"width": "230px",
					"height": "25px"
				});
			})(group_1);
			container.addChild(group_1, {
				"top": "35px",
				"left": "5px",
				"width": "1225px",
				"height": "32px"
			});
			
			var group_2 = new cpr.controls.Container("grp_rptTable");
			// Layout
			var xYLayout_3 = new cpr.controls.layouts.XYLayout();
			group_2.setLayout(xYLayout_3);
			(function(container){
				var userDefinedControl_2 = linker.userDefinedControl_2 = new udc.com.comTitle();
				userDefinedControl_2.bind("title").toLanguage("UI-SCR-TABLELIST");
				container.addChild(userDefinedControl_2, {
					"top": "5px",
					"left": "5px",
					"width": "265px",
					"height": "25px"
				});
				var button_2 = new cpr.controls.Button("btnCrtTrigger");
				button_2.value = "";
				button_2.style.setClasses(["btn-commit"]);
				button_2.bind("value").toLanguage("UI-SCR-TLGTRIGGERCRE");
				if(typeof onBtnCrtTriggerClick == "function") {
					button_2.addEventListener("click", onBtnCrtTriggerClick);
				}
				container.addChild(button_2, {
					"top": "5px",
					"left": "1100px",
					"width": "120px",
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
						{"width": "148px"},
						{"width": "471px"}
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
									cell.bind("text").toLanguage("UI-SCR-TLG_TRIGGER_YN");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 7},
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
										var output_3 = new cpr.controls.Output();
										output_3.style.css({
											"text-align" : "center"
										});
										return output_3;
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
									cell.columnName = "ERROR_YN";
									cell.style.css({
										"text-align" : "center"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 7},
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
					"height": "565px"
				});
				var button_3 = new cpr.controls.Button("btnCrtTglTable");
				button_3.value = "";
				button_3.style.setClasses(["btn-commit"]);
				button_3.bind("value").toLanguage("UI-SCR-TLGTABLECRE");
				if(typeof onBtnCrtTglTableClick == "function") {
					button_3.addEventListener("click", onBtnCrtTglTableClick);
				}
				container.addChild(button_3, {
					"top": "5px",
					"left": "975px",
					"width": "120px",
					"height": "25px"
				});
				var button_4 = new cpr.controls.Button("btnCrtTglTable1");
				button_4.value = "";
				button_4.style.setClasses(["btn-commit"]);
				button_4.bind("value").toLanguage("UI-SCR-TLGTABDEL");
				if(typeof onBtnCrtTglTable1Click == "function") {
					button_4.addEventListener("click", onBtnCrtTglTable1Click);
				}
				container.addChild(button_4, {
					"top": "5px",
					"left": "850px",
					"width": "120px",
					"height": "25px"
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
	app.title = "트리거생성";
	cpr.core.Platform.INSTANCE.register(app);
})();
