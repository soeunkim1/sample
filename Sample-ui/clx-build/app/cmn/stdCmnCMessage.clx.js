/*
 * App URI: app/cmn/stdCmnCMessage
 * Source Location: app/cmn/stdCmnCMessage.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("app/cmn/stdCmnCMessage", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			//공통 모듈 사용
			var util = createCommonUtil();
			
			/*
			 * Body에서 load 이벤트 발생 시 호출.
			 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
			 */
			function onBodyLoad(/* cpr.events.CEvent */ e){
				//서브미션 실행 (실패시 cover page)
				util.Submit.send(app, app, "subOnLoad", function(pbSuccess){
					if(pbSuccess){
						util.SelectCtl.setValue(app, app, "cbbLanDivRcd", util.getDefaultLocale(app));
						util.Control.redraw(app, app, ["cbbUnitSystemRcd", "cbbMsgCd", "cbbLanDivRcd"]);
					}		
				}, true);
			}
			
			/*
			 * "" 버튼에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onAppheader1Search(/* cpr.events.CAppEvent */ e){
				// 데이터 변경상태 체크
				if (util.Grid.isModified(app, app, "grdCmnMessage", "CRM")) {
					return false;
				}
				
				//조회 서브미션 수행
				doList(function(pbSuccess) {
					// 조회 : "조회되었습니다." header 메세지 표시
					if (pbSuccess) {
						util.Msg.notify(app, app, "NLS-INF-M024");
					}
				});
			}
			
			/**
			 * @desc 조회 event
			 * @param poCallBackFunc 조회 후 callback함수
			 */
			function doList(poCallBackFunc) {
				util.Submit.send(app, app, "subList", function(pbSuccess){
					if(pbSuccess){
						// 조회 후 콜백함수 수행
						if(util.isFunc(poCallBackFunc)){
							 poCallBackFunc(pbSuccess);
						}
					}
				});
			}
			
			/*
			 * 그룹에서 keydown 이벤트 발생 시 호출.
			 * 사용자가 키를 누를 때 발생하는 이벤트.
			 */
			function onGrpSearchKeydown(/* cpr.events.CKeyboardEvent */ e){
				if(e.keyCode == cpr.events.KeyCode.ENTER){
					util.Header.clickSearch(app);
				}
			}
			
			/*
			 * 사용자 정의 컨트롤에서 insert 이벤트 발생 시 호출.
			 */
			function onAppheader1Insert(/* cpr.events.CAppEvent */ e){
				// 조회조건에 셋팅된 내역이 있으면 신규시 자동셋팅한다.(시스템구분, 언어키, 메시지구분)
				util.Grid.setCellValue(app, app, "grdCmnMessage", "UNIT_SYSTEM_RCD", util.SelectCtl.getValue(app, "cbbUnitSystemRcd"), e.rowIndex);// 시스템구분
				util.Grid.setCellValue(app, app, "grdCmnMessage", "LAN_DIV_RCD", util.SelectCtl.getValue(app, "cbbLanDivRcd"), e.rowIndex);// 언어키
				util.Grid.setCellValue(app, app, "grdCmnMessage", "MSG_DIV_RCD", util.SelectCtl.getValue(app, "cbbMsgCd"), e.rowIndex);// 메세지구분
			}
			
			/*
			 * 사용자 정의 컨트롤에서 delete 이벤트 발생 시 호출.
			 */
			function onAppheader1Delete(/* cpr.events.CAppEvent */ e){
				var vsPanelCheckIdx = util.Grid.getCheckOrSelectedRowIndex(app, "grdCmnMessage");
				for(var i=0, len= vsPanelCheckIdx.length; i<len; i++){
					var vsStdYn = util.Grid.getCellValue(app, app, "grdCmnMessage", "STD_YN", vsPanelCheckIdx[i]);
					var vsRowStatus = util.Grid.getRowState(app, app, "grdCmnMessage", vsPanelCheckIdx[i]);
					if(vsRowStatus != cpr.data.tabledata.RowState.INSERTED && vsStdYn == "Y"){
						util.Msg.alert("NLS-CMM-M002");
						//RowState 복구
						util.Grid.revertRowData(app, app, "grdCmnMessage", vsPanelCheckIdx[i]);
						return false;
					}
				}
				util.Grid.deleteRow(app, app, "grdCmnMessage");
			}
			
			/*
			 * 사용자 정의 컨트롤에서 restore 이벤트 발생 시 호출.
			 * 취소 클릭 이벤트
			 */
			function onAppheader1Restore(/* cpr.events.CAppEvent */ e){
				util.Grid.restoreRow(app, "grdCmnMessage");
			}
			
			/*
			 * 사용자 정의 컨트롤에서 save 이벤트 발생 시 호출.
			 */
			function onAppheader1Save(/* cpr.events.CAppEvent */ e){
				doSave();
			}
			
			/**
			 * @desc 작업저장 event
			 * @return void
			 */
			function doSave() {
				// 그리드의 변경사항 유/무를 반환
				if (!util.Grid.isModified(app, app, "grdCmnMessage", "MSG")) return false;
				
				// 그리드 유효성 검증
				if (!util.validate(app, app, "grdCmnMessage")) return false;
				
				util.Submit.send(app, app, "subSave", function(pbSuccess){
					if(pbSuccess){
						//데이터 재조회
						doList(function(pbListSuccess) {
							// 조회 : "갱신된 데이터가 조회되었습니다." header 메세지 표시
							if(pbListSuccess){
								util.Msg.notify(app, app, "NLS-INF-M025");
							} 
						});
					}
				});
			};
			// End - User Script
			
			// Header
			var dataSet_1 = new cpr.data.DataSet("dsSystemList");
			dataSet_1.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_1);
			
			var dataSet_2 = new cpr.data.DataSet("dsMsgList");
			dataSet_2.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_2);
			
			var dataSet_3 = new cpr.data.DataSet("dsLangList");
			dataSet_3.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_3);
			
			var dataSet_4 = new cpr.data.DataSet("dsCmnMessage");
			dataSet_4.parseData({
				"info": "CMN_MESSAGE@UNIT_SYSTEM_RCD,MSG_CD,LAN_DIV_RCD",
				"columns": [
					{"name": "UNIT_SYSTEM_RCD"},
					{"name": "MSG_CD"},
					{"name": "LAN_DIV_RCD"},
					{"name": "MSG_DIV_RCD"},
					{"name": "MSG_TEXT"},
					{"name": "STD_YN"}
				],
				"rows": []
			});
			app.register(dataSet_4);
			var dataMap_1 = new cpr.data.DataMap("dmReqList");
			dataMap_1.parseData({
				"columns" : [
					{
						"name": "strUnitSystemRcd",
						"dataType": "string"
					},
					{
						"name": "strMsgDivRcd",
						"dataType": "string"
					},
					{
						"name": "strLanDivRcd",
						"dataType": "string"
					},
					{
						"name": "strMsg",
						"dataType": "string"
					}
				]
			});
			app.register(dataMap_1);
			var submission_1 = new cpr.protocols.Submission("subOnLoad");
			submission_1.action = "/cmn/StdCmnMessage/";
			submission_1.mediaType = "application/x-www-form-urlencoded";
			submission_1.addResponseData(dataSet_1, false);
			submission_1.addResponseData(dataSet_2, false);
			submission_1.addResponseData(dataSet_3, false);
			app.register(submission_1);
			
			var submission_2 = new cpr.protocols.Submission("subList");
			submission_2.action = "/cmn/StdCmnMessage/";
			submission_2.mediaType = "application/x-www-form-urlencoded";
			submission_2.addRequestData(dataMap_1);
			submission_2.addResponseData(dataSet_4, false);
			app.register(submission_2);
			
			var submission_3 = new cpr.protocols.Submission("subSave");
			submission_3.action = "/cmn/StdCmnMessage/";
			submission_3.mediaType = "application/x-www-form-urlencoded";
			submission_3.addRequestData(dataSet_4);
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
					comboBox_1.setItemSet(app.lookup("dsSystemList"), {
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
				var output_2 = new cpr.controls.Output("optMsgCd");
				output_2.value = "";
				output_2.bind("value").toLanguage("UI-SCR-MSGLST");
				container.addChild(output_2, {
					"top": "5px",
					"left": "250px",
					"width": "100px",
					"height": "25px"
				});
				var comboBox_2 = new cpr.controls.ComboBox("cbbMsgCd");
				comboBox_2.bind("fieldLabel").toExpression("#optMsgCd.value");
				comboBox_2.bind("value").toDataMap(app.lookup("dmReqList"), "strMsgDivRcd");
				(function(comboBox_2){
					comboBox_2.addItem(new cpr.controls.Item("전체", ""));
					comboBox_2.setItemSet(app.lookup("dsMsgList"), {
						"label": "CD_NM",
						"value": "CD"
					});
				})(comboBox_2);
				container.addChild(comboBox_2, {
					"top": "5px",
					"left": "355px",
					"width": "130px",
					"height": "25px"
				});
				var output_3 = new cpr.controls.Output("optLanDivRcd");
				output_3.value = "";
				output_3.bind("value").toLanguage("UI-SCR-LANKEY");
				container.addChild(output_3, {
					"top": "5px",
					"left": "495px",
					"width": "100px",
					"height": "25px"
				});
				var comboBox_3 = new cpr.controls.ComboBox("cbbLanDivRcd");
				comboBox_3.bind("fieldLabel").toExpression("#optLanDivRcd.value");
				comboBox_3.bind("value").toDataMap(app.lookup("dmReqList"), "strLanDivRcd");
				(function(comboBox_3){
					comboBox_3.addItem(new cpr.controls.Item("전체", ""));
					comboBox_3.setItemSet(app.lookup("dsLangList"), {
						"label": "CD_NM",
						"value": "CD"
					});
				})(comboBox_3);
				container.addChild(comboBox_3, {
					"top": "5px",
					"left": "600px",
					"width": "130px",
					"height": "25px"
				});
				var output_4 = new cpr.controls.Output("optMsgText");
				output_4.value = "";
				output_4.bind("value").toLanguage("UI-GLS-MSG");
				container.addChild(output_4, {
					"top": "5px",
					"left": "740px",
					"width": "100px",
					"height": "25px"
				});
				var inputBox_1 = new cpr.controls.InputBox("ipbMsgText");
				inputBox_1.bind("fieldLabel").toExpression("#optMsgText.value");
				inputBox_1.bind("value").toDataMap(app.lookup("dmReqList"), "strMsg");
				if(typeof onIpbMsgTextKeydown == "function") {
					inputBox_1.addEventListener("keydown", onIpbMsgTextKeydown);
				}
				container.addChild(inputBox_1, {
					"top": "5px",
					"left": "845px",
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
			
			var group_2 = new cpr.controls.Container("grp_rptCmnMessage");
			// Layout
			var xYLayout_3 = new cpr.controls.layouts.XYLayout();
			group_2.setLayout(xYLayout_3);
			(function(container){
				var userDefinedControl_2 = linker.userDefinedControl_2 = new udc.com.comTitle();
				userDefinedControl_2.bind("title").toLanguage("UI-SCR-MSGLST");
				container.addChild(userDefinedControl_2, {
					"top": "5px",
					"left": "5px",
					"width": "265px",
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
				var grid_1 = linker.grid_1 = new cpr.controls.Grid("grdCmnMessage");
				grid_1.init({
					"dataSet": app.lookup("dsCmnMessage"),
					"columns": [
						{"width": "25px"},
						{"width": "25px"},
						{"width": "40px"},
						{"width": "142px"},
						{"width": "119px"},
						{"width": "126px"},
						{"width": "109px"},
						{"width": "530px"},
						{"width": "95px"}
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
									cell.bind("text").toLanguage("UI-SCR-SYSTEMDIV");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 4},
								"configurator": function(cell){
									cell.text = "메세지코드";
									cell.style.setClasses(["require"]);
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 5},
								"configurator": function(cell){
									cell.style.setClasses(["require"]);
									cell.bind("text").toLanguage("UI-SCR-LANKEY");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 6},
								"configurator": function(cell){
									cell.style.setClasses(["require"]);
									cell.bind("text").toLanguage("UI-SCR-MSGLST");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 7},
								"configurator": function(cell){
									cell.style.setClasses(["require"]);
									cell.bind("text").toLanguage("UI-GLS-MSG");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 8},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-SCR-STD");
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
										var output_5 = new cpr.controls.Output();
										output_5.style.css({
											"text-align" : "center"
										});
										return output_5;
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
									cell.columnName = "UNIT_SYSTEM_RCD";
									cell.control = (function(){
										var comboBox_4 = new cpr.controls.ComboBox("gdCbbUnitSystemRcd");
										comboBox_4.userAttr({"require": "Y"});
										(function(comboBox_4){
											comboBox_4.addItem(new cpr.controls.Item("선택", ""));
											comboBox_4.setItemSet(app.lookup("dsSystemList"), {
												"label": "CD_NM",
												"value": "CD"
											});
										})(comboBox_4);
										comboBox_4.bind("value").toDataColumn("UNIT_SYSTEM_RCD");
										return comboBox_4;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 4},
								"configurator": function(cell){
									cell.columnName = "MSG_CD";
									cell.control = (function(){
										var inputBox_2 = new cpr.controls.InputBox("gdIpbMsgCd");
										inputBox_2.maxLength = 20;
										inputBox_2.bind("value").toDataColumn("MSG_CD");
										return inputBox_2;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 5},
								"configurator": function(cell){
									cell.columnName = "LAN_DIV_RCD";
									cell.control = (function(){
										var comboBox_5 = new cpr.controls.ComboBox("gdCbbLanDivRcd");
										comboBox_5.userAttr({"require": "Y"});
										(function(comboBox_5){
											comboBox_5.addItem(new cpr.controls.Item("선택", ""));
											comboBox_5.setItemSet(app.lookup("dsLangList"), {
												"label": "CD_NM",
												"value": "CD"
											});
										})(comboBox_5);
										comboBox_5.bind("value").toDataColumn("LAN_DIV_RCD");
										return comboBox_5;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 6},
								"configurator": function(cell){
									cell.columnName = "MSG_DIV_RCD";
									cell.control = (function(){
										var comboBox_6 = new cpr.controls.ComboBox("gdCbbMsgDivRcd");
										comboBox_6.userAttr({"require": "Y"});
										(function(comboBox_6){
											comboBox_6.addItem(new cpr.controls.Item("선택", ""));
											comboBox_6.setItemSet(app.lookup("dsMsgList"), {
												"label": "CD_NM",
												"value": "CD"
											});
										})(comboBox_6);
										comboBox_6.bind("value").toDataColumn("MSG_DIV_RCD");
										return comboBox_6;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 7},
								"configurator": function(cell){
									cell.columnName = "MSG_TEXT";
									cell.control = (function(){
										var inputBox_3 = new cpr.controls.InputBox("gdIpbMsgText");
										inputBox_3.maxLength = 300;
										inputBox_3.userAttr({"require": "Y"});
										inputBox_3.bind("value").toDataColumn("MSG_TEXT");
										return inputBox_3;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 8},
								"configurator": function(cell){
									cell.columnName = "STD_YN";
									cell.control = (function(){
										var checkBox_1 = new cpr.controls.CheckBox("gdCkbStdYn");
										checkBox_1.value = "";
										checkBox_1.trueValue = "Y";
										checkBox_1.falseValue = "";
										checkBox_1.text = "";
										checkBox_1.style.css({
											"text-align" : "center"
										});
										checkBox_1.bind("value").toDataColumn("STD_YN");
										return checkBox_1;
									})();
								}
							}
						]
					}
				});
				if(typeof onGrdCmnMessageSelectionChange == "function") {
					grid_1.addEventListener("selection-change", onGrdCmnMessageSelectionChange);
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
	app.title = "메시지";
	cpr.core.Platform.INSTANCE.register(app);
})();
