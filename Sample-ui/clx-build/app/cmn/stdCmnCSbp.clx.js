/*
 * App URI: app/cmn/stdCmnCSbp
 * Source Location: app/cmn/stdCmnCSbp.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("app/cmn/stdCmnCSbp", {
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
				
				util.Submit.send(app, "subOnLoad", function(pbSuccess){
					if (pbSuccess) {
						util.Control.setFocus(app, "ipbPgmNm");
					}
				},true);
				
			}//onBodyLoad()
			
			/*
			 * "" 버튼에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onBtnSearchClick(/* cpr.events.CMouseEvent */ e){
				/** 
				 * @type cpr.controls.Button
				 */
				var btnSearch = e.control;
				// 데이터 변경상태 체크 메시지 
				if (util.Grid.isModified(app, "grdCmnSbpDef", "CRM")) {
					return false;
				}
				
				doList(function(pbSuccess) {
					// 조회 : "조회되었습니다." header 메세지 표시
					util.Msg.notify(app, "NLS-INF-M024");
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
						util.Control.redraw(app, "grdCmnSbpDef");
						// 조회 후 콜백함수 수행
						if(util.isFunc(poCallBackFunc)){
							poCallBackFunc(pbSuccess);
						}
					}
				});
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
			}//onGrid_ids_btn1Save()
			
			function doSave() {
			
				// 그리드 변경사항 체크
				if(!util.Grid.isModified(app, "grdCmnSbpDef","MSG")){
					return false;
				}
				//그리드 유효성 검증
				if(!util.validate(app, "grdCmnSbpDef")){
					return false;
				}
				
				util.Submit.send(app, "subSave", function(pbSuccess){
					if(pbSuccess){
						doList(function(pbListSuccess){
							if (pbListSuccess){
								// 조회 : "갱신된 데이터가 조회되었습니다." header 메세지 표시
								util.Msg.notify(app, "NLS-INF-M025");
							}
						}); 
					}
				});
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
				//Enter 입력시
				if (e.keyCode == 13) {
					app.lookup("btnSearch").click();
				}
			}//onGrpSearchKeydown();
			// End - User Script
			
			// Header
			var dataSet_1 = new cpr.data.DataSet("dsScreenDivRcdList");
			dataSet_1.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_1);
			
			var dataSet_2 = new cpr.data.DataSet("dsCmnSbpDef");
			dataSet_2.parseData({
				"info": "CMN_SBP_DEF@STD_PGM_NM,SBP_ID,STD_CONTROL_NM",
				"columns": [
					{"name": "STD_PGM_NM"},
					{"name": "SBP_ID"},
					{"name": "SBP_NM"},
					{"name": "SBP_DESC"},
					{"name": "SCREEN_DIV_RCD"},
					{"name": "EXT_TAB_ID"},
					{"name": "STD_CONTROL_NM"},
					{"name": "USE_YN"}
				],
				"rows": []
			});
			app.register(dataSet_2);
			var dataMap_1 = new cpr.data.DataMap("dmReqList");
			dataMap_1.parseData({
				"columns" : [{
					"name": "strPgmNm",
					"dataType": "string"
				}]
			});
			app.register(dataMap_1);
			var submission_1 = new cpr.protocols.Submission("subOnLoad");
			submission_1.action = "/cmn/StdCmnSbp/";
			submission_1.mediaType = "application/x-www-form-urlencoded";
			submission_1.addResponseData(dataSet_1, false);
			app.register(submission_1);
			
			var submission_2 = new cpr.protocols.Submission("subList");
			submission_2.action = "/cmn/StdCmnSbp/";
			submission_2.mediaType = "application/x-www-form-urlencoded";
			submission_2.addRequestData(dataMap_1);
			submission_2.addResponseData(dataSet_2, false);
			app.register(submission_2);
			
			var submission_3 = new cpr.protocols.Submission("subSave");
			submission_3.action = "/cmn/StdCmnSbp/";
			submission_3.mediaType = "application/x-www-form-urlencoded";
			submission_3.addRequestData(dataSet_2);
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
				button_1.value = "조회";
				button_1.style.setClasses(["btn-search"]);
				if(typeof onBtnSearchClick == "function") {
					button_1.addEventListener("click", onBtnSearchClick);
				}
				container.addChild(button_1, {
					"top": "5px",
					"left": "1160px",
					"width": "60px",
					"height": "25px"
				});
				var output_1 = new cpr.controls.Output("optPgmNm");
				output_1.value = "스탠다드프로그램명";
				container.addChild(output_1, {
					"top": "5px",
					"left": "5px",
					"width": "140px",
					"height": "25px"
				});
				var inputBox_1 = new cpr.controls.InputBox("ipbPgmNm");
				inputBox_1.bind("fieldLabel").toExpression("#optPgmNm.value");
				inputBox_1.bind("value").toDataMap(app.lookup("dmReqList"), "strPgmNm");
				if(typeof onIpbPgmNmKeydown == "function") {
					inputBox_1.addEventListener("keydown", onIpbPgmNmKeydown);
				}
				container.addChild(inputBox_1, {
					"top": "5px",
					"left": "150px",
					"width": "360px",
					"height": "25px"
				});
			})(group_1);
			container.addChild(group_1, {
				"top": "35px",
				"left": "5px",
				"width": "1225px",
				"height": "32px"
			});
			
			var group_2 = new cpr.controls.Container("grpData");
			// Layout
			var xYLayout_3 = new cpr.controls.layouts.XYLayout();
			group_2.setLayout(xYLayout_3);
			(function(container){
				var userDefinedControl_2 = linker.userDefinedControl_2 = new udc.com.comTitle();
				userDefinedControl_2.bind("title").toLanguage("");
				container.addChild(userDefinedControl_2, {
					"top": "5px",
					"left": "5px",
					"width": "265px",
					"height": "25px"
				});
				var button_2 = new cpr.controls.Button("btnNew");
				button_2.value = "신규";
				button_2.style.setClasses(["btn-new"]);
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
				button_3.value = "삭제";
				button_3.style.setClasses(["btn-delete"]);
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
				button_4.value = "취소";
				button_4.style.setClasses(["btn-restore"]);
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
				button_5.value = "저장";
				button_5.style.setClasses(["btn-save"]);
				if(typeof onBtnSaveClick == "function") {
					button_5.addEventListener("click", onBtnSaveClick);
				}
				container.addChild(button_5, {
					"top": "5px",
					"left": "1160px",
					"width": "60px",
					"height": "25px"
				});
				var grid_1 = linker.grid_1 = new cpr.controls.Grid("grdCmnSbpDef");
				grid_1.init({
					"dataSet": app.lookup("dsCmnSbpDef"),
					"columns": [
						{"width": "25px"},
						{"width": "25px"},
						{"width": "40px"},
						{"width": "97px"},
						{"width": "198px"},
						{"width": "160px"},
						{"width": "155px"},
						{"width": "138px"},
						{"width": "195px"},
						{"width": "126px"},
						{"width": "65px"}
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
									cell.text = "No";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 3},
								"configurator": function(cell){
									cell.text = "확장구분";
									cell.style.setClasses(["require"]);
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 4},
								"configurator": function(cell){
									cell.text = "스탠다드프로그램명";
									cell.style.setClasses(["require"]);
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 5},
								"configurator": function(cell){
									cell.text = "스텐다드화면컨트롤명";
									cell.style.setClasses(["require"]);
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 6},
								"configurator": function(cell){
									cell.text = "서브페이지ID";
									cell.style.setClasses(["require"]);
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 7},
								"configurator": function(cell){
									cell.text = "서브페이지명";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 8},
								"configurator": function(cell){
									cell.text = "서브페이지내역";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 9},
								"configurator": function(cell){
									cell.text = "확장테이블ID";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 10},
								"configurator": function(cell){
									cell.text = "사용여부";
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
									cell.columnName = "SCREEN_DIV_RCD";
									cell.control = (function(){
										var comboBox_1 = new cpr.controls.ComboBox("gdCbbScreenDivRcd");
										comboBox_1.userAttr({"require": "Y"});
										(function(comboBox_1){
											comboBox_1.addItem(new cpr.controls.Item("선택", ""));
											comboBox_1.setItemSet(app.lookup("dsScreenDivRcdList"), {
												"label": "CD_NM",
												"value": "CD"
											});
										})(comboBox_1);
										comboBox_1.bind("value").toDataColumn("SCREEN_DIV_RCD");
										return comboBox_1;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 4},
								"configurator": function(cell){
									cell.columnName = "STD_PGM_NM";
									cell.control = (function(){
										var inputBox_2 = new cpr.controls.InputBox("gdIpbStdPgmNm");
										inputBox_2.maxLength = 50;
										inputBox_2.userAttr({"require": "Y"});
										inputBox_2.bind("value").toDataColumn("STD_PGM_NM");
										return inputBox_2;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 5},
								"configurator": function(cell){
									cell.columnName = "STD_CONTROL_NM";
									cell.control = (function(){
										var inputBox_3 = new cpr.controls.InputBox("gdIpbStdControlNm");
										inputBox_3.maxLength = 50;
										inputBox_3.userAttr({"require": "Y"});
										inputBox_3.bind("value").toDataColumn("STD_CONTROL_NM");
										return inputBox_3;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 6},
								"configurator": function(cell){
									cell.columnName = "SBP_ID";
									cell.control = (function(){
										var inputBox_4 = new cpr.controls.InputBox("gdIpbSbpId");
										inputBox_4.maxLength = 50;
										inputBox_4.userAttr({"require": "Y"});
										inputBox_4.bind("value").toDataColumn("SBP_ID");
										return inputBox_4;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 7},
								"configurator": function(cell){
									cell.columnName = "SBP_NM";
									cell.control = (function(){
										var inputBox_5 = new cpr.controls.InputBox("gdIpbSbpNm");
										inputBox_5.maxLength = 50;
										inputBox_5.bind("value").toDataColumn("SBP_NM");
										return inputBox_5;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 8},
								"configurator": function(cell){
									cell.columnName = "SBP_DESC";
									cell.control = (function(){
										var inputBox_6 = new cpr.controls.InputBox("gdIpbSbpDesc");
										inputBox_6.maxLength = 200;
										inputBox_6.bind("value").toDataColumn("SBP_DESC");
										return inputBox_6;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 9},
								"configurator": function(cell){
									cell.columnName = "EXT_TAB_ID";
									cell.control = (function(){
										var inputBox_7 = new cpr.controls.InputBox("gdIpbExtTabId");
										inputBox_7.maxLength = 50;
										inputBox_7.bind("value").toDataColumn("EXT_TAB_ID");
										return inputBox_7;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 10},
								"configurator": function(cell){
									cell.columnName = "USE_YN";
									cell.control = (function(){
										var checkBox_1 = new cpr.controls.CheckBox("gdCkbUseYn");
										checkBox_1.value = "";
										checkBox_1.trueValue = "Y";
										checkBox_1.falseValue = "";
										checkBox_1.text = "";
										checkBox_1.style.css({
											"text-align" : "center"
										});
										checkBox_1.bind("value").toDataColumn("USE_YN");
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
	app.title = "stdCmnCSbp";
	cpr.core.Platform.INSTANCE.register(app);
})();
