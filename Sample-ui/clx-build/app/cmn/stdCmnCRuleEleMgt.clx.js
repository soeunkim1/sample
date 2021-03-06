/*
 * App URI: app/cmn/stdCmnCRuleEleMgt
 * Source Location: app/cmn/stdCmnCRuleEleMgt.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("app/cmn/stdCmnCRuleEleMgt", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			//공통 모듈 사용
			var util = new ComUtil(app);
			
			/*
			 * 그룹에서 keydown 이벤트 발생 시 호출.
			 * 사용자가 키를 누를 때 발생하는 이벤트.
			 */
			function onGrpSearchKeydown(/* cpr.events.CKeyboardEvent */ e){
				/** 
				 * @type cpr.controls.Container
				 */
				var grpSearch = e.control;
				// 엔터키 입력시 조회
				if (e.keyCode == 13) {
					app.lookup("btnSearch").click();
				}
			
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
				// 데이터 변경상태 체크 메시지(기본, 임베디드 앱 존재 할 경우 isChangedFormData())
				if (util.Grid.isModified(app, "grdCmnRuleEle", "CRM")) {
					return false;
				}
				doList(function(pbSuccess) {
					util.Msg.notify(app, "NLS-INF-M024");
				});
			}
			
			function doList(poCallBackFunc){
				util.Submit.send(app, "subList", function(pbSuccess){
					if(pbSuccess){
						util.Control.redraw(app, "grdCmnRuleEle");
						if (util.isFunc(poCallBackFunc)) {
							poCallBackFunc(pbSuccess);	
						} 
					}
				});
			}
			
			/*
			 * Body에서 load 이벤트 발생 시 호출.
			 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
			 */
			function onBodyLoad(/* cpr.events.CEvent */ e){
			
				util.Submit.send(app, "subOnLoad", function(pbSuccess) {
					if (pbSuccess) {
						util.Control.setFocus(app, "ipbRuleEmtNm");
					}
				}, true);
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
			}
			
			function doSave() {
			
				// 그리드 변경사항 체크
				if(!util.Grid.isModified(app, "grdCmnRuleEle","MSG")){
					return false;
				}
				//그리드 유효성 검증
				if(!util.validate(app, "grdCmnRuleEle")){
					return false;
				}
				
				util.Submit.send(app, "subSave", function(pbSuccess) {
					if (pbSuccess) {
						doList(function(pbListSuccess) {
							if (pbListSuccess) {
								// "갱신된 데이터가 조회되었습니다." 메시지 출력
								util.Msg.notify(app, "NLS-INF-M025");
							}
						});
					}
				});
			}
			
			/*
			 * 인풋 박스에서 value-change 이벤트 발생 시 호출.
			 * 변경된 value가 저장된 후에 발생하는 이벤트.
			 */
			function onGdIpbRuleEmtIdValueChange(/* cpr.events.CValueChangeEvent */ e){
				/** 
				 * @type cpr.controls.InputBox
				 */
				var gdIpbRuleEmtId = e.control;
				
				var vnIdx = util.Grid.getIndex(app, "grdCmnRuleEle");
				var vsRuleEmtId = util.Grid.getCellValue(app, "grdCmnRuleEle", "RULE_EMT_ID", vnIdx);
			
				if(!ValueUtil.isNull(vsRuleEmtId)){
					//ValueUtil.checkType("AN", vsRuleEmtId);
					//위에 공통함수 사용을 하면 숫자값만 제외되고 한글과 영문자는 실행 됨 
					var data = vsRuleEmtId.toUpperCase();
					for ( var i=0; i < data.length; i++ ) {
						if (( data.charCodeAt(i) < 48 || data.charCodeAt(i) > 57)&& ( data.charCodeAt(i) != 32)) {
							if ( data.charCodeAt(i) < 65 || data.charCodeAt(i) > 90 ) {
								//"룰ID는 영문자와 숫자로만 구성할 수 있습니다. 다시 입력해주세요."메시지 출력
								util.Msg.warn("M219");
								//룰요소ID value값 초기화
								util.Grid.setCellValue(app, "grdCmnRuleEle", "RULE_EMT_ID", "", vnIdx);
			
								util.Control.redraw(app, "gdIpbRuleEmtId");
								
								util.Control.setFocus(app, "gdIpbRuleEmtId");
								
								return false;
							}
						}
					}
				}
			};
			// End - User Script
			
			// Header
			var dataSet_1 = new cpr.data.DataSet("dsRtrnTypeCdList");
			dataSet_1.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_1);
			
			var dataSet_2 = new cpr.data.DataSet("dsCmnRuleEle");
			dataSet_2.parseData({
				"info": "CMN_RULE_ELE@RULE_EMT_ID",
				"columns": [
					{"name": "RULE_EMT_ID"},
					{"name": "RULE_EMT_NM"},
					{"name": "CALL_CLASS"},
					{"name": "CALL_METHOD"},
					{"name": "RTRN_TYPE_CD"},
					{"name": "REMARK"}
				],
				"rows": []
			});
			app.register(dataSet_2);
			var dataMap_1 = new cpr.data.DataMap("dmReqList");
			dataMap_1.parseData({
				"columns" : [{
					"name": "strRuleEmtNm",
					"dataType": "string"
				}]
			});
			app.register(dataMap_1);
			var submission_1 = new cpr.protocols.Submission("subOnLoad");
			submission_1.action = "/cmn/StdCmnRuleEleMgt/";
			submission_1.mediaType = "application/x-www-form-urlencoded";
			submission_1.addResponseData(dataSet_1, false);
			app.register(submission_1);
			
			var submission_2 = new cpr.protocols.Submission("subList");
			submission_2.action = "/cmn/StdCmnRuleEleMgt/";
			submission_2.mediaType = "application/x-www-form-urlencoded";
			submission_2.addRequestData(dataMap_1);
			submission_2.addResponseData(dataSet_2, false);
			app.register(submission_2);
			
			var submission_3 = new cpr.protocols.Submission("subSave");
			submission_3.action = "/cmn/StdCmnRuleEleMgt/";
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
				var output_1 = new cpr.controls.Output("optRuleEmtNm");
				output_1.value = "";
				output_1.bind("value").toLanguage("UI-DB-RULE_EMT_NM");
				container.addChild(output_1, {
					"top": "5px",
					"left": "5px",
					"width": "100px",
					"height": "25px"
				});
				var inputBox_1 = new cpr.controls.InputBox("ipbRuleEmtNm");
				inputBox_1.bind("fieldLabel").toExpression("#optRuleEmtNm.value");
				inputBox_1.bind("value").toDataMap(app.lookup("dmReqList"), "strRuleEmtNm");
				if(typeof onIpbRuleEmtNmKeydown == "function") {
					inputBox_1.addEventListener("keydown", onIpbRuleEmtNmKeydown);
				}
				container.addChild(inputBox_1, {
					"top": "5px",
					"left": "110px",
					"width": "160px",
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
				var grid_1 = linker.grid_1 = new cpr.controls.Grid("grdCmnRuleEle");
				grid_1.init({
					"dataSet": app.lookup("dsCmnRuleEle"),
					"columns": [
						{"width": "25px"},
						{"width": "25px"},
						{"width": "40px"},
						{"width": "192px"},
						{"width": "251px"},
						{"width": "153px"},
						{"width": "201px"},
						{"width": "128px"},
						{"width": "199px"}
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
									cell.style.setClasses(["require"]);
									cell.bind("text").toLanguage("UI-DB-RULE_EMT_ID");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 4},
								"configurator": function(cell){
									cell.style.setClasses(["require"]);
									cell.bind("text").toLanguage("UI-DB-RULE_EMT_NM");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 5},
								"configurator": function(cell){
									cell.style.setClasses(["require"]);
									cell.bind("text").toLanguage("UI-SCR-CALLCLASS");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 6},
								"configurator": function(cell){
									cell.style.setClasses(["require"]);
									cell.bind("text").toLanguage("UI-SCR-CALLMETHOD");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 7},
								"configurator": function(cell){
									cell.style.setClasses(["require"]);
									cell.bind("text").toLanguage("UI-GLS-RTRNZ");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 8},
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
									cell.columnName = "RULE_EMT_ID";
									cell.control = (function(){
										var inputBox_2 = new cpr.controls.InputBox("gdIpbRuleEmtId");
										inputBox_2.maxLength = 50;
										inputBox_2.userAttr({"require": "Y"});
										inputBox_2.bind("value").toDataColumn("RULE_EMT_ID");
										return inputBox_2;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 4},
								"configurator": function(cell){
									cell.columnName = "RULE_EMT_NM";
									cell.control = (function(){
										var inputBox_3 = new cpr.controls.InputBox("gdIpbRuleEmtNm");
										inputBox_3.maxLength = 50;
										inputBox_3.userAttr({"require": "Y"});
										inputBox_3.bind("value").toDataColumn("RULE_EMT_NM");
										return inputBox_3;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 5},
								"configurator": function(cell){
									cell.columnName = "CALL_CLASS";
									cell.control = (function(){
										var inputBox_4 = new cpr.controls.InputBox("gdIpbCallClass");
										inputBox_4.maxLength = 50;
										inputBox_4.userAttr({"require": "Y"});
										inputBox_4.bind("value").toDataColumn("CALL_CLASS");
										return inputBox_4;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 6},
								"configurator": function(cell){
									cell.columnName = "CALL_METHOD";
									cell.control = (function(){
										var inputBox_5 = new cpr.controls.InputBox("gdIpbCallMethod");
										inputBox_5.maxLength = 50;
										inputBox_5.userAttr({"require": "Y"});
										inputBox_5.bind("value").toDataColumn("CALL_METHOD");
										return inputBox_5;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 7},
								"configurator": function(cell){
									cell.columnName = "RTRN_TYPE_CD";
									cell.control = (function(){
										var comboBox_1 = new cpr.controls.ComboBox("gdCbbRtrnTypeCd");
										comboBox_1.userAttr({"require": "Y"});
										(function(comboBox_1){
											comboBox_1.addItem(new cpr.controls.Item("선택", ""));
											comboBox_1.setItemSet(app.lookup("dsRtrnTypeCdList"), {
												"label": "CD_NM",
												"value": "CD"
											});
										})(comboBox_1);
										comboBox_1.bind("value").toDataColumn("RTRN_TYPE_CD");
										return comboBox_1;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 8},
								"configurator": function(cell){
									cell.columnName = "REMARK";
									cell.control = (function(){
										var inputBox_6 = new cpr.controls.InputBox("gdIpbRemark");
										inputBox_6.maxLength = 1000;
										inputBox_6.bind("value").toDataColumn("REMARK");
										return inputBox_6;
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
	app.title = "stdCmnCRuleEleMgt";
	cpr.core.Platform.INSTANCE.register(app);
})();
