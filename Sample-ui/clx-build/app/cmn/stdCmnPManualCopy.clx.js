/*
 * App URI: app/cmn/stdCmnPManualCopy
 * Source Location: app/cmn/stdCmnPManualCopy.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("app/cmn/stdCmnPManualCopy", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			var util = new ComUtil(app);
			
			/**
			 * 호출한 페이지에서 파라미터 받기
			 */
			function doParentGet(){
				//팝업일 경우 부모창에 넘겨준 값을 복사될 대상 데이터 맵에 넣어준다.
				if(util.Dialog.isPopup(app)){
					var voStdCmnManualCopySch = app.getHostProperty("initValue");
					if(!ValueUtil.isNull(voStdCmnManualCopySch)){
						var vsMenuId = voStdCmnManualCopySch[0].iMenuId;
						
						util.DataMap.setValue(app, "dmReqKeyCopy", "strTargetMenuId", vsMenuId);
					}		
				}
			}
			
			/**
			 * 조회버튼 이벤트(메뉴 목록 조회)
			 */
			 function doList(poCallBackFunc){
			 	//조회 서브미션 호출
			 	util.Submit.send(app, "subList", function(pbSuccess){
			 		if(pbSuccess){
			 			//메뉴목록 타이틀
			 			util.Control.redraw(app, ["lblTitleRptCmnManual"]);
			 			//메뉴목록
			 			util.Control.redraw(app, "grdCmnManual");
			 		}
			 	});
			 }
			
			/**
			 * 복사
			 */
			 function doCopy(){
			 	// 선택(포커스)된 인덱스를 가져온다.
			 	var vnIdx = util.Grid.getIndex(app, "grdCmnManual");
				
				if(vnIdx == -1){
					// "선택된 데이터가 없습니다."
					util.Msg.warn("M008");
					return false;
				}
				
				// 선택(포커스)된 정보를 데이터맵에 담는다.
				var vsSrcMenuId = util.Grid.getCellValue(app, "grdCmnManual", "MENU_ID");
				util.DataMap.setValue(app, "dmReqKeyCopy", "strSrcMenuId", vsSrcMenuId);	
			
				var vsTargetMenuId	= util.DataMap.getValue(app, "dmReqKeyCopy", "strTargetMenuId");	
				
				util.Submit.send(app, "subCopy", function(pbSuccess){
					if(pbSuccess){
						//복사되었습니다.
						util.Msg.alert("NLS-INF-M004", [util.Msg.getMsg("NLS-SCR-COPY")]); //@복사
						
						//팝업일 경우
						if(util.Dialog.isPopup(app)){				
							//콜백함수 호출 후 팝업 닫음
							var hostApp = app.getHostAppInstance();
							if(hostApp.hasAppMethod("doCallBackManualCopy")){
								hostApp.callAppMethod("doCallBackManualCopy", vsTargetMenuId);
							}
							app.close();	
						}
					}
				});
			 }
			
			/*
			 * Body에서 load 이벤트 발생 시 호출.
			 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
			 */
			function onBodyLoad(/* cpr.events.CEvent */ e){
				//부모창에서 전달한 값을 받는다.
				doParentGet();
				
				//서브미션 실행 (실패시 cover page)
				util.Submit.send(app, "subOnLoad", function(pbSuccess){
					if(pbSuccess){
						//시스템구분 첫번째 셋팅
						util.Control.redraw(app, ["cbbUnitSystemRcd"]);
						util.SelectCtl.selectItem(app, "cbbUnitSystemRcd", 0);
						
						//메뉴ID/명 컨트롤 포커스
						util.Control.setFocus(app, "ipbMenuId");
					}
				}, true);
			}
			
			/*
			 * "" 버튼에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onBtnSearchClick(/* cpr.events.CMouseEvent */ e){
				/** 
				 * @type cpr.controls.Button
				 */
				var btnSearch = e.control;
				doList(function(pbSuccess){
					if(pbSuccess) util.Msg.notify(app, "NLS-INF-M024");
				});
			}
			
			/*
			 * "" 버튼에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onBtnCopyClick(/* cpr.events.CMouseEvent */ e){
				/** 
				 * @type cpr.controls.Button
				 */
				var btnCopy = e.control;
				doCopy();
			}
			
			/*
			 * "" 버튼에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onBtnCloseClick(/* cpr.events.CMouseEvent */ e){
				/** 
				 * @type cpr.controls.Button
				 */
				var btnClose = e.control;
				app.close();
			}
			
			
			/*
			 * 그룹에서 keydown 이벤트 발생 시 호출.
			 * 사용자가 키를 누를 때 발생하는 이벤트.
			 */
			function onGrpSearchKeydown(/* cpr.events.CKeyboardEvent */ e){
				/** 
				 * @type cpr.controls.Container
				 */
				var grpSearch = e.control;
					if(e.keyCode == cpr.events.KeyCode.ENTER){
					/** @type udc.com.btnSearch*/
					var voBtnSearch = app.lookup("btnSearch");
					voBtnSearch.click();
				}
			};
			// End - User Script
			
			// Header
			var dataSet_1 = new cpr.data.DataSet("dsUnitSystemRcdList");
			dataSet_1.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_1);
			
			var dataSet_2 = new cpr.data.DataSet("dsCmnManual");
			dataSet_2.parseData({
				"columns": [
					{"name": "MENU_ID"},
					{"name": "PGM_ID"},
					{"name": "MENU_NM"},
					{"name": "UMENU_NM"},
					{"name": "WRITE_YN"},
					{"name": "UNIT_SYSTEM_RCD"},
					{"name": "PGM_NM"}
				],
				"rows": []
			});
			app.register(dataSet_2);
			var dataMap_1 = new cpr.data.DataMap("dmReqList");
			dataMap_1.parseData({
				"columns" : [
					{
						"name": "strSystemRcd",
						"dataType": "string"
					},
					{
						"name": "strMenuId",
						"dataType": "string"
					}
				]
			});
			app.register(dataMap_1);
			
			var dataMap_2 = new cpr.data.DataMap("dmReqKeyCopy");
			dataMap_2.parseData({
				"columns" : [
					{
						"name": "strSrcMenuId",
						"dataType": "string"
					},
					{
						"name": "strTargetMenuId",
						"dataType": "string"
					}
				]
			});
			app.register(dataMap_2);
			var submission_1 = new cpr.protocols.Submission("subOnLoad");
			submission_1.action = "/cmn/StdCmnManualCopy/";
			submission_1.mediaType = "application/x-www-form-urlencoded";
			submission_1.addResponseData(dataSet_1, false);
			app.register(submission_1);
			
			var submission_2 = new cpr.protocols.Submission("subList");
			submission_2.action = "/cmn/StdCmnManualCopy/";
			submission_2.mediaType = "application/x-www-form-urlencoded";
			submission_2.addRequestData(dataMap_1);
			submission_2.addResponseData(dataSet_2, false);
			app.register(submission_2);
			
			var submission_3 = new cpr.protocols.Submission("subCopy");
			submission_3.action = "/cmn/StdCmnManualCopy/";
			submission_3.mediaType = "application/x-www-form-urlencoded";
			submission_3.addRequestData(dataMap_2);
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
			
			var group_1 = new cpr.controls.Container("grpData");
			// Layout
			var xYLayout_2 = new cpr.controls.layouts.XYLayout();
			group_1.setLayout(xYLayout_2);
			(function(container){
				var userDefinedControl_2 = linker.userDefinedControl_2 = new udc.com.comTitle();
				userDefinedControl_2.bind("title").toLanguage("UI-SCR-MENULST");
				container.addChild(userDefinedControl_2, {
					"top": "5px",
					"left": "5px",
					"width": "215px",
					"height": "25px"
				});
				var grid_1 = linker.grid_1 = new cpr.controls.Grid("grdCmnManual");
				grid_1.init({
					"dataSet": app.lookup("dsCmnManual"),
					"columns": [
						{"width": "40px"},
						{"width": "134px"},
						{"width": "202px"},
						{"width": "93px"},
						{"width": "90px"},
						{"width": "101px"}
					],
					"header": {
						"rows": [{"height": "27px"}],
						"cells": [
							{
								"constraint": {"rowIndex": 0, "colIndex": 0},
								"configurator": function(cell){
									cell.text = "No";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 1},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-DB-MENU_ID");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 2},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-DB-MENU_NM");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 3},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-SCR-UNITSYSTEM");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 4},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-SCR-UPMENUNM");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 5},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-DB-MAN_FINISH_YN");
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
									cell.columnType = "rowindex";
									cell.style.css({
										"text-align" : "center"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 1},
								"configurator": function(cell){
									cell.columnName = "MENU_ID";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 2},
								"configurator": function(cell){
									cell.columnName = "PGM_NM";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 3},
								"configurator": function(cell){
									cell.columnName = "UNIT_SYSTEM_RCD";
									cell.control = (function(){
										var comboBox_1 = new cpr.controls.ComboBox("gdCbbUnitSystemRcd");
										comboBox_1.enabled = false;
										comboBox_1.hideButton = true;
										(function(comboBox_1){
											comboBox_1.setItemSet(app.lookup("dsUnitSystemRcdList"), {
												"label": "CD_NM",
												"value": "CD"
											});
										})(comboBox_1);
										comboBox_1.bind("value").toDataColumn("UNIT_SYSTEM_RCD");
										return comboBox_1;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 4},
								"configurator": function(cell){
									cell.columnName = "UMENU_NM";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 5},
								"configurator": function(cell){
									cell.columnName = "WRITE_YN";
									cell.control = (function(){
										var checkBox_1 = new cpr.controls.CheckBox("gdChkWriteYn");
										checkBox_1.enabled = false;
										checkBox_1.value = "";
										checkBox_1.trueValue = "Y";
										checkBox_1.falseValue = "";
										checkBox_1.text = "";
										checkBox_1.style.css({
											"text-align" : "center"
										});
										checkBox_1.bind("value").toDataColumn("WRITE_YN");
										return checkBox_1;
									})();
								}
							}
						]
					}
				});
				container.addChild(grid_1, {
					"top": "30px",
					"left": "5px",
					"width": "675px",
					"height": "275px"
				});
				var button_1 = new cpr.controls.Button("btnCopy");
				button_1.value = "";
				button_1.style.setClasses(["btn-commit"]);
				button_1.bind("value").toLanguage("UI-SCR-COPY");
				if(typeof onBtnCopyClick == "function") {
					button_1.addEventListener("click", onBtnCopyClick);
				}
				container.addChild(button_1, {
					"top": "5px",
					"left": "605px",
					"width": "75px",
					"height": "25px"
				});
			})(group_1);
			container.addChild(group_1, {
				"top": "67px",
				"left": "5px",
				"width": "685px",
				"height": "310px"
			});
			
			var group_2 = new cpr.controls.Container("grpSearch");
			group_2.style.setClasses(["search-box"]);
			// Layout
			var xYLayout_3 = new cpr.controls.layouts.XYLayout();
			group_2.setLayout(xYLayout_3);
			(function(container){
				var button_2 = new cpr.controls.Button("btnSearch");
				button_2.value = "";
				button_2.style.setClasses(["btn-search"]);
				button_2.bind("value").toLanguage("UI-SCR-SCH");
				if(typeof onBtnSearchClick == "function") {
					button_2.addEventListener("click", onBtnSearchClick);
				}
				container.addChild(button_2, {
					"top": "5px",
					"left": "620px",
					"width": "60px",
					"height": "25px"
				});
				var output_1 = new cpr.controls.Output("optUnitSystemRcd");
				output_1.value = "";
				output_1.bind("value").toLanguage("UI-SCR-UNISYSTMDIV");
				container.addChild(output_1, {
					"top": "5px",
					"left": "5px",
					"width": "100px",
					"height": "25px"
				});
				var comboBox_2 = new cpr.controls.ComboBox("cbbUnitSystemRcd");
				comboBox_2.bind("fieldLabel").toExpression("#optUnitSystemRcd.value");
				comboBox_2.bind("value").toDataMap(app.lookup("dmReqList"), "strSystemRcd");
				(function(comboBox_2){
					comboBox_2.addItem(new cpr.controls.Item("전체", ""));
					comboBox_2.setItemSet(app.lookup("dsUnitSystemRcdList"), {
						"label": "CD_NM",
						"value": "CD"
					});
				})(comboBox_2);
				container.addChild(comboBox_2, {
					"top": "5px",
					"left": "110px",
					"width": "130px",
					"height": "25px"
				});
				var output_2 = new cpr.controls.Output("optMenuId");
				output_2.value = "";
				output_2.bind("value").toLanguage("UI-DB-MENU_ID");
				container.addChild(output_2, {
					"top": "5px",
					"left": "250px",
					"width": "100px",
					"height": "25px"
				});
				var inputBox_1 = new cpr.controls.InputBox("ipbMenuId");
				inputBox_1.bind("value").toDataMap(app.lookup("dmReqList"), "strMenuId");
				if(typeof onIpbMenuIdKeydown == "function") {
					inputBox_1.addEventListener("keydown", onIpbMenuIdKeydown);
				}
				container.addChild(inputBox_1, {
					"top": "5px",
					"left": "355px",
					"width": "200px",
					"height": "25px"
				});
			})(group_2);
			container.addChild(group_2, {
				"top": "35px",
				"left": "5px",
				"width": "685px",
				"height": "32px"
			});
			
			var button_3 = new cpr.controls.Button("btnClose");
			button_3.value = "";
			button_3.bind("value").toLanguage("UI-SCR-SCRNCLS");
			if(typeof onBtnCloseClick == "function") {
				button_3.addEventListener("click", onBtnCloseClick);
			}
			container.addChild(button_3, {
				"top": "380px",
				"left": "625px",
				"width": "60px",
				"height": "25px"
			});
			if(typeof onBodyLoad == "function"){
				app.addEventListener("load", onBodyLoad);
			}
			// Linking
			linker.userDefinedControl_2.ctrl = linker.grid_1;
		}
	});
	app.title = "메뉴얼복사팝업";
	cpr.core.Platform.INSTANCE.register(app);
})();
