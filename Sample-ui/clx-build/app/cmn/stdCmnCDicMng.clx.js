/*
 * App URI: app/cmn/stdCmnCDicMng
 * Source Location: app/cmn/stdCmnCDicMng.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("app/cmn/stdCmnCDicMng", {
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
				
				util.Control.setValue(app, app, "rdbDivCd", "1");
				
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
			    if(util.Grid.isModified(app, "grdMst", "CRM")){
					return false;
				}
				doSearch();
			}//onBtnSearchClick
			
			function doSearch(){
				
				util.Submit.send(app, "subList", function(pbSuccess){
					if (pbSuccess) {
						util.Control.redraw(app, "grdMst");
						// 우측상단 메세지창에 메세지를 입력한다. "조회되었습니다. "
						util.Msg.notify(app, "NLS-INF-M024");
					}
				});
			}//doSearch()
			
			/*
			 * 사용자 정의 컨트롤에서 save 이벤트 발생 시 호출.
			 */
			function onGrid_ids_btn1Save(/* cpr.event.CUIEvent */ e){
				/** 
				 * @type udc.com.grid_IDS_Btn
				 */
				var grid_ids_btn1 = e.control;
				doSave()
			}//onGrid_ids_btn1Save()
			
			function doSave(){
				
				 // 리피터 변경사항 체크
				if (!util.Grid.isModified(app, "grdMst", "MSG")) {
					return false;
				}
				// 그리드 유효성 검증
				if (!util.validate(app, "grdMst")) {
					return false;
				}
				util.Submit.send(app, "subSave", function(pbSuccess){
					if(pbSuccess){
						doSearch();
					}
				});
				
			}//doSave()
			/*
			 * "" 버튼에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onBtnNewFileClick(/* cpr.events.CMouseEvent */ e){
				/** 
				 * @type cpr.controls.Button
				 */
				var btnNewFile = e.control;
				doFileCreate();
			}//onBtnNewFileClick()
			
			/**
			 * @desc doFileCreate event 파일생성
			 */
			function doFileCreate(){
				
				util.Submit.send(app, "subFileDown", function(pbSuccess){
					if(pbSuccess){
						
					}
				});
				
			}//doFileCreate()
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
			};
			// End - User Script
			
			// Header
			var dataSet_1 = new cpr.data.DataSet("dsMst");
			dataSet_1.parseData({
				"info": "CMN_GLOSSARY@PHYSIC_WORD",
				"columns": [
					{"name": "PHYSIC_WORD"},
					{"name": "LOGIC_WORD_EXPL"},
					{"name": "LOGIC_SYNM"},
					{"name": "LOGIC_WORD"},
					{"name": "PHYSIC_WORD_EXPL"},
					{"name": "PHYSIC_SYNM"},
					{"name": "SEQ_NUM"}
				],
				"rows": []
			});
			app.register(dataSet_1);
			var dataMap_1 = new cpr.data.DataMap("dmReqList");
			dataMap_1.parseData({
				"columns" : [
					{
						"name": "strDivCd",
						"dataType": "string"
					},
					{
						"name": "strNm",
						"dataType": "string"
					}
				]
			});
			app.register(dataMap_1);
			
			var dataMap_2 = new cpr.data.DataMap("dmFileInfo");
			dataMap_2.parseData({
				"columns" : [
					{
						"name": "strFileDir",
						"dataType": "string"
					},
					{
						"name": "strFileNm",
						"dataType": "string"
					},
					{
						"name": "strFileChgNm",
						"dataType": "string"
					}
				]
			});
			app.register(dataMap_2);
			
			var dataMap_3 = new cpr.data.DataMap("dmRoot");
			dataMap_3.parseData({
				"columns" : [{
					"name": "resOnLoad",
					"dataType": "string"
				}]
			});
			app.register(dataMap_3);
			var submission_1 = new cpr.protocols.Submission("subList");
			submission_1.action = "/cmn/StdCmnDicMng/";
			submission_1.mediaType = "application/x-www-form-urlencoded";
			submission_1.addRequestData(dataMap_1);
			submission_1.addResponseData(dataSet_1, false);
			app.register(submission_1);
			
			var submission_2 = new cpr.protocols.Submission("subSave");
			submission_2.action = "/cmn/StdCmnDicMng/";
			submission_2.mediaType = "application/x-www-form-urlencoded";
			submission_2.addRequestData(dataSet_1);
			app.register(submission_2);
			
			var submission_3 = new cpr.protocols.Submission("subFileDown");
			submission_3.action = "/cmn/StdCmnDicMng/";
			submission_3.mediaType = "application/x-www-form-urlencoded";
			submission_3.addResponseData(dataMap_2, false);
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
				var output_1 = new cpr.controls.Output("optSearchNm");
				output_1.value = "";
				output_1.bind("value").toLanguage("UI-SCR-SRCHVALU");
				container.addChild(output_1, {
					"top": "5px",
					"left": "320px",
					"width": "100px",
					"height": "25px"
				});
				var inputBox_1 = new cpr.controls.InputBox("ipbSearchNm");
				inputBox_1.bind("fieldLabel").toExpression("#optTableNm.value");
				inputBox_1.bind("value").toDataMap(app.lookup("dmReqList"), "strNm");
				if(typeof onIpbSearchNmKeydown == "function") {
					inputBox_1.addEventListener("keydown", onIpbSearchNmKeydown);
				}
				container.addChild(inputBox_1, {
					"top": "5px",
					"left": "425px",
					"width": "200px",
					"height": "25px"
				});
				var output_2 = new cpr.controls.Output("optDivCd");
				output_2.value = "";
				output_2.bind("value").toLanguage("UI-DB-TGT_DIV_RCD");
				container.addChild(output_2, {
					"top": "5px",
					"left": "5px",
					"width": "100px",
					"height": "25px"
				});
				var button_2 = new cpr.controls.Button("btnNewFile");
				button_2.value = "";
				button_2.style.setClasses(["btn-new"]);
				button_2.bind("value").toLanguage("UI-SCR-NEW_FILE");
				if(typeof onBtnNewFileClick == "function") {
					button_2.addEventListener("click", onBtnNewFileClick);
				}
				container.addChild(button_2, {
					"top": "5px",
					"left": "1095px",
					"width": "60px",
					"height": "25px"
				});
				var radioButton_1 = new cpr.controls.RadioButton("rdbDivCd");
				radioButton_1.bind("value").toDataMap(app.lookup("dmReqList"), "strDivCd");
				(function(radioButton_1){
					radioButton_1.addItem(new cpr.controls.Item("논리용어", "1"));
					radioButton_1.addItem(new cpr.controls.Item("물리용어", "2"));
				})(radioButton_1);
				container.addChild(radioButton_1, {
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
			
			var group_2 = new cpr.controls.Container("grpMst");
			// Layout
			var xYLayout_3 = new cpr.controls.layouts.XYLayout();
			group_2.setLayout(xYLayout_3);
			(function(container){
				var userDefinedControl_1 = linker.userDefinedControl_1 = new udc.com.comTitle();
				userDefinedControl_1.bind("title").toLanguage("UI-SCR-CMNDICLIST");
				container.addChild(userDefinedControl_1, {
					"top": "5px",
					"left": "5px",
					"width": "265px",
					"height": "25px"
				});
				var grid_1 = linker.grid_1 = new cpr.controls.Grid("grdMst");
				grid_1.init({
					"dataSet": app.lookup("dsMst"),
					"columns": [
						{"width": "25px"},
						{"width": "40px"},
						{"width": "160px"},
						{"width": "250px"},
						{"width": "160px"},
						{"width": "160px"},
						{"width": "260px"},
						{"width": "152px"},
						{"width": "140px"}
					],
					"header": {
						"rows": [{"height": "27px"}],
						"cells": [
							{
								"constraint": {"rowIndex": 0, "colIndex": 0},
								"configurator": function(cell){
									cell.text = "F";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 1},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-GLS-NO");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 2},
								"configurator": function(cell){
									cell.text = "논리용어";
									cell.style.setClasses(["require"]);
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 3},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-SCR-CREATEDT");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 4},
								"configurator": function(cell){
									cell.text = "논리동의어";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 5},
								"configurator": function(cell){
									cell.style.setClasses(["require"]);
									cell.bind("text").toLanguage("UI-SCR-WRITER");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 6},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-SCR-EXPLAIN");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 7},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-SCR-EXPLAIN");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 8},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-SCR-EXPLAIN");
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
								"constraint": {"rowIndex": 0, "colIndex": 1},
								"configurator": function(cell){
									cell.columnType = "rowindex";
									cell.style.css({
										"text-align" : "center"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 2},
								"configurator": function(cell){
									cell.columnName = "LOGIC_WORD";
									cell.control = (function(){
										var inputBox_2 = new cpr.controls.InputBox("gdIpbLogicWogd");
										inputBox_2.maxLength = 200;
										inputBox_2.userAttr({"require": "Y"});
										inputBox_2.bind("value").toDataColumn("LOGIC_WORD");
										return inputBox_2;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 3},
								"configurator": function(cell){
									cell.columnName = "LOGIC_WORD_EXPL";
									cell.control = (function(){
										var inputBox_3 = new cpr.controls.InputBox("gdIpbLogicWogdExpl");
										inputBox_3.maxLength = 1000;
										inputBox_3.bind("value").toDataColumn("LOGIC_WORD_EXPL");
										return inputBox_3;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 4},
								"configurator": function(cell){
									cell.columnName = "LOGIC_SYNM";
									cell.control = (function(){
										var inputBox_4 = new cpr.controls.InputBox("gdIpbLogicSynm");
										inputBox_4.maxLength = 200;
										inputBox_4.bind("value").toDataColumn("LOGIC_SYNM");
										return inputBox_4;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 5},
								"configurator": function(cell){
									cell.columnName = "PHYSIC_WORD";
									cell.control = (function(){
										var inputBox_5 = new cpr.controls.InputBox("gdIpbPhysicWogd");
										inputBox_5.maxLength = 200;
										inputBox_5.userAttr({"require": "Y"});
										inputBox_5.bind("value").toDataColumn("PHYSIC_WORD");
										return inputBox_5;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 6},
								"configurator": function(cell){
									cell.columnName = "PHYSIC_WORD_EXPL";
									cell.control = (function(){
										var inputBox_6 = new cpr.controls.InputBox("gdIpbPhysicWogdExpl");
										inputBox_6.maxLength = 1000;
										inputBox_6.bind("value").toDataColumn("PHYSIC_WORD_EXPL");
										return inputBox_6;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 7},
								"configurator": function(cell){
									cell.columnName = "PHYSIC_SYNM";
									cell.control = (function(){
										var inputBox_7 = new cpr.controls.InputBox("gdIpbPhysicSynm");
										inputBox_7.maxLength = 200;
										inputBox_7.bind("value").toDataColumn("PHYSIC_SYNM");
										return inputBox_7;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 8},
								"configurator": function(cell){
									cell.columnName = "SEQ_NUM";
									cell.control = (function(){
										var inputBox_8 = new cpr.controls.InputBox("gdIpbSeqNum");
										inputBox_8.maxLength = 1000;
										inputBox_8.bind("value").toDataColumn("SEQ_NUM");
										return inputBox_8;
									})();
								}
							}
						]
					}
				});
				if(typeof onGrdMstSelectionChange == "function") {
					grid_1.addEventListener("selection-change", onGrdMstSelectionChange);
				}
				container.addChild(grid_1, {
					"top": "30px",
					"left": "5px",
					"width": "1215px",
					"height": "515px"
				});
				var button_3 = new cpr.controls.Button("btnNew");
				button_3.value = "신규";
				button_3.style.setClasses(["btn-new"]);
				if(typeof onBtnNewClick == "function") {
					button_3.addEventListener("click", onBtnNewClick);
				}
				container.addChild(button_3, {
					"top": "5px",
					"left": "965px",
					"width": "60px",
					"height": "25px"
				});
				var button_4 = new cpr.controls.Button("btnDel");
				button_4.value = "삭제";
				button_4.style.setClasses(["btn-delete"]);
				if(typeof onBtnDelClick == "function") {
					button_4.addEventListener("click", onBtnDelClick);
				}
				container.addChild(button_4, {
					"top": "5px",
					"left": "1030px",
					"width": "60px",
					"height": "25px"
				});
				var button_5 = new cpr.controls.Button("btnRestore");
				button_5.value = "취소";
				button_5.style.setClasses(["btn-restore"]);
				if(typeof onBtnRestoreClick == "function") {
					button_5.addEventListener("click", onBtnRestoreClick);
				}
				container.addChild(button_5, {
					"top": "5px",
					"left": "1095px",
					"width": "60px",
					"height": "25px"
				});
				var button_6 = new cpr.controls.Button("btnSave");
				button_6.value = "저장";
				button_6.style.setClasses(["btn-save"]);
				if(typeof onBtnSaveClick == "function") {
					button_6.addEventListener("click", onBtnSaveClick);
				}
				container.addChild(button_6, {
					"top": "5px",
					"left": "1160px",
					"width": "60px",
					"height": "25px"
				});
			})(group_2);
			container.addChild(group_2, {
				"top": "42px",
				"left": "5px",
				"width": "1225px",
				"height": "550px"
			});
			
			var userDefinedControl_2 = new udc.com.appHeader("appheader1");
			container.addChild(userDefinedControl_2, {
				"top": "5px",
				"right": "5px",
				"left": "5px",
				"height": "25px"
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