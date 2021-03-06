/*
 * App URI: app/ccr/stdCcrCTlsnReqType
 * Source Location: app/ccr/stdCcrCTlsnReqType.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("app/ccr/stdCcrCTlsnReqType", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			﻿//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
			/// <xtmlink path="./stdCcrCTlsnReqType.xtm"/>
			
			/**
			 * 수강신청유형설정
			 * @class stdCcrCTlsnReqType
			 * @author 박갑수 at 2016. 4. 6
			 */
			var stdCcrCTlsnReqType = function() {
				var moPage = new Page();
				
				/**
				 * @desc import 헤더 초기화
				 * @param 
				 * @return  void
				 * @author 박갑수 at 2016. 4. 6
				 */
				moPage.onLoadImportDone_ImpTitle = function() {
					// import 헤더 초기화
					doHeaderOnLoad();
				};
				
				/**
				 * @desc onLoad 실행
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 4. 6
				 */
				moPage.onModelConstructDone_StdCcrCTlsnReqType = function() {
					// 리피트 초기 설정
			//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
			//		ExtRepeat.init(["rptCcrTlsnReqType"]);
					// 검색조건 초기 설정
			//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
			//		ExtGroup.initSearchBox("grpSearch", ["grpData"]);
					
					// 서브미션 호출
					//strCommand: onLoad 
					util.Submit.send(app, "subOnLoad", function(pbSuccess){
						if(pbSuccess){
							
							util.Control.redraw(app, ["cbbTermTypeRcd", "cbbLimitTypeRcd"]);
							util.Control.setFocus(app, "cbbTermTypeRcd");
						}
					}, true);
				};
				
				/**
				 * @desc [btnSearch]조회 onClick 이벤트
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 4. 6
				 */
				moPage.onClick_BtnSearch = function() {
					 // 작업영역 리피트 변경 내역 체크
					if(util.Grid.isModified(app, "", "CRM")){
						return false;
					}
			
					// 조회
					doList(function(pbSuccess) {
						// 조회 : "조회되었습니다." header 메세지 표시
						if (pbSuccess) util.Msg.notify(app, "NLS.INF.M024");
					});
				};
				
				/**
				 * @desc  수강신청기간유형목록 조회
				 * @param {Function} poCallBackFunc 콜백정의
				 * @return void
				 * @author 박갑수 at 2016. 4. 6
				 */
				function doList(poCallBackFunc) {
					
					//strCommand: list 
					util.Submit.send(app, "subList", function(pbSuccess){
						if(pbSuccess){
							util.Control.redraw(app, "grdCcrTlsnReqType");	
							// 조회 후 콜백함수 수행
							if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess); 
						}
					});
				};
				
				/**
				 * @desc [btnNew]신규 onClick 이벤트
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 4. 6
				 */
				moPage.onClick_BtnNew = function() {
					// 해당 리피트 insert 후 편집 시작할 컬럼 지정
					var vnIdx = util.Grid.insertRow(app, "grdCcrTlsnReqType", "rdCbbTermTypeRcd");
					
					// 신규 Defalut값 설정 
					// 수강신청기간유형 : 조회조건
					var vsTermTypeRcd = util.Control.getValue(app, "cbbTermTypeRcd"); 
					util.Grid.setCellValue(app, "grdCcrTlsnReqType", "TERM_TYPE_RCD", vsTermTypeRcd, vnIdx);
					
					// 수강신청유형타입 : 조회조건
					var vsLimitTypeRcd = util.Control.getValue(app, "cbbLimitTypeRcd"); 
					util.Grid.setCellValue(app, "grdCcrTlsnReqType", "LIMIT_TYPE_RCD", vsLimitTypeRcd, vnIdx);
				};
				
				/**
				 * @desc [btnDel]삭제 onClick 이벤트
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 4. 6
				 */
				moPage.onClick_BtnDel = function() {
					
					var vnIdx = util.Grid.getIndex(app, "grdCcrTlsnReqType");
					// 스텐다드여부
					var vsStdYn = util.Grid.getCellValue(app, "grdCcrTlsnReqType", "STD_YN");
					
					if(ValueUtil.fixNull(vsStdYn) == "Y" && util.Grid.getRowState(app, "grdCcrTlsnReqType", vnIdx) != cpr.data.tabledata.RowState.INSERTED){
						// "스탠다드 코드는 삭제할 수 없습니다." 메시지
						util.Msg.alert("NLS-CMM-M002");
						return;
						
					}else {
						// 해당 리피트 delete
						util.Grid.deleteRow(app, "grdCcrTlsnReqType");
					}
				};
				
				/**
				 * @desc [btnRestore]작업취소 onClick 이벤트
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 4. 6
				 */
				moPage.onClick_BtnRestore = function() {
					// 해당 리피트 상태 초기화
					util.Grid.restoreRow(app, "grdCcrTlsnReqType");
				};
				
				/**
				 * @desc [btnSave]작업저장 onClick 이벤트
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 4. 6
				 */
				moPage.onClick_BtnSave = function() {
					// 작업저장
					doSave();
				};
				
				/**
				 * @desc 수강신청기간유형목록 변경사항 저장
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 4. 6
				 */
				function doSave() {
					
					// 리피트 변경사항 체크
					if(!util.Grid.isModified(app, ["grdCcrTlsnReqType"], "MSG")){
						return false;
					}
					
					// 리피트 Validation Check
					if(!util.validate(app, "grdCcrTlsnReqType")) return false;
			
					//strCommand: save 
					util.Submit.send(app, "subSave", function(pbSuccess){
						if(pbSuccess){
							doList(function(pbListSuccess) {
								// 조회 : "갱신된 데이터가 조회되었습니다." header 메세지 표시
								if (pbListSuccess) util.Msg.notify(app, "NLS.INF.M025");
							});
						}
					});
				};
			
				return moPage;
			};;
			// End - User Script
			
			// Header
			var dataSet_1 = new cpr.data.DataSet("dsTermTypeRcdList");
			dataSet_1.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"},
					{"name": "CD_PRP1"}
				],
				"rows": []
			});
			app.register(dataSet_1);
			
			var dataSet_2 = new cpr.data.DataSet("dsLimitTypeRcdList");
			dataSet_2.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"},
					{"name": "CD_PRP1"}
				],
				"rows": []
			});
			app.register(dataSet_2);
			
			var dataSet_3 = new cpr.data.DataSet("dsCcrTlsnReqType");
			dataSet_3.parseData({
				"info": "CCR_TLSN_REQ_TYPE@TERM_TYPE_RCD,LIMIT_TYPE_RCD",
				"columns": [
					{"name": "TERM_TYPE_RCD"},
					{"name": "LIMIT_TYPE_RCD"},
					{"name": "USE_YN"},
					{"name": "PRP1"},
					{"name": "PRP2"},
					{"name": "PRP3"},
					{"name": "STD_YN"}
				],
				"rows": []
			});
			app.register(dataSet_3);
			var dataMap_1 = new cpr.data.DataMap("dmReqKey");
			dataMap_1.parseData({
				"columns" : [
					{
						"name": "strTermTypeRcd",
						"dataType": "string"
					},
					{
						"name": "strLimitTypeRcd",
						"dataType": "string"
					}
				]
			});
			app.register(dataMap_1);
			var submission_1 = new cpr.protocols.Submission("subOnLoad");
			submission_1.action = "/ccr/StdCcrTlsnReqType/";
			submission_1.mediaType = "application/x-www-form-urlencoded";
			submission_1.addResponseData(dataSet_1, false);
			submission_1.addResponseData(dataSet_2, false);
			app.register(submission_1);
			
			var submission_2 = new cpr.protocols.Submission("subList");
			submission_2.action = "/ccr/StdCcrTlsnReqType/";
			submission_2.mediaType = "application/x-www-form-urlencoded";
			submission_2.addRequestData(dataMap_1);
			submission_2.addResponseData(dataSet_3, false);
			app.register(submission_2);
			
			var submission_3 = new cpr.protocols.Submission("subSave");
			submission_3.action = "/ccr/StdCcrTlsnReqType/";
			submission_3.mediaType = "application/x-www-form-urlencoded";
			submission_3.addRequestData(dataSet_3);
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
					"left": "1158px",
					"width": "60px",
					"height": "25px"
				});
				var output_1 = new cpr.controls.Output("optTermTypeRcd");
				output_1.value = "";
				output_1.bind("value").toLanguage("UI-SCR-BKGTERMTYME");
				container.addChild(output_1, {
					"top": "5px",
					"left": "5px",
					"width": "120px",
					"height": "25px"
				});
				var comboBox_1 = new cpr.controls.ComboBox("cbbTermTypeRcd");
				comboBox_1.bind("fieldLabel").toExpression("#optTermTypeRcd.value");
				comboBox_1.bind("value").toDataMap(app.lookup("dmReqKey"), "strTermTypeRcd");
				(function(comboBox_1){
					comboBox_1.addItem(new cpr.controls.Item("전체", ""));
					comboBox_1.setItemSet(app.lookup("dsTermTypeRcdList"), {
						"label": "CD_NM",
						"value": "CD"
					});
				})(comboBox_1);
				container.addChild(comboBox_1, {
					"top": "5px",
					"left": "130px",
					"width": "200px",
					"height": "25px"
				});
				var output_2 = new cpr.controls.Output("optLimitTypeRcd");
				output_2.value = "";
				output_2.bind("value").toLanguage("UI-SCR-BKGTYME");
				container.addChild(output_2, {
					"top": "5px",
					"left": "340px",
					"width": "120px",
					"height": "25px"
				});
				var comboBox_2 = new cpr.controls.ComboBox("cbbLimitTypeRcd");
				comboBox_2.bind("fieldLabel").toExpression("#optLimitTypeRcd.value");
				comboBox_2.bind("value").toDataMap(app.lookup("dmReqKey"), "strLimitTypeRcd");
				(function(comboBox_2){
					comboBox_2.addItem(new cpr.controls.Item("전체", ""));
					comboBox_2.setItemSet(app.lookup("dsLimitTypeRcdList"), {
						"label": "CD_NM",
						"value": "CD"
					});
				})(comboBox_2);
				container.addChild(comboBox_2, {
					"top": "5px",
					"left": "465px",
					"width": "200px",
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
				userDefinedControl_2.bind("title").toLanguage("UI-SCR-BKGTERMTYPELIST");
				container.addChild(userDefinedControl_2, {
					"top": "5px",
					"left": "5px",
					"width": "280px",
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
					"left": "963px",
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
					"left": "1028px",
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
					"left": "1093px",
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
					"left": "1158px",
					"width": "60px",
					"height": "25px"
				});
				var grid_1 = linker.grid_1 = new cpr.controls.Grid("grdCcrTlsnReqType");
				grid_1.init({
					"dataSet": app.lookup("dsCcrTlsnReqType"),
					"columns": [
						{"width": "25px"},
						{"width": "40px"},
						{"width": "280px"},
						{"width": "312px"},
						{"width": "110px"},
						{
							"width": "122px",
							"visible": false
						},
						{
							"width": "175px",
							"visible": false
						},
						{
							"width": "175px",
							"visible": false
						}
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
									cell.text = "No";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 2},
								"configurator": function(cell){
									cell.style.setClasses(["require"]);
									cell.bind("text").toLanguage("UI-SCR-BKGTERMTYME");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 3},
								"configurator": function(cell){
									cell.style.setClasses(["require"]);
									cell.bind("text").toLanguage("UI-SCR-BKGTYME");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 4},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-DB-USE_YN");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 5},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-SCR-STDCDYN");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 6},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-DB-PRP1");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 7},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-DB-PRP2");
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
									cell.columnName = "TERM_TYPE_RCD";
									cell.control = (function(){
										var comboBox_3 = new cpr.controls.ComboBox("gdCbbTermTypeRcd");
										comboBox_3.userAttr({"require": "Y"});
										(function(comboBox_3){
											comboBox_3.addItem(new cpr.controls.Item("선택", ""));
											comboBox_3.setItemSet(app.lookup("dsTermTypeRcdList"), {
												"label": "CD_NM",
												"value": "CD"
											});
										})(comboBox_3);
										comboBox_3.bind("value").toDataColumn("TERM_TYPE_RCD");
										return comboBox_3;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 3},
								"configurator": function(cell){
									cell.columnName = "LIMIT_TYPE_RCD";
									cell.control = (function(){
										var comboBox_4 = new cpr.controls.ComboBox("gdCbbLimitTypeRcd");
										comboBox_4.userAttr({"require": "Y"});
										(function(comboBox_4){
											comboBox_4.addItem(new cpr.controls.Item("선택", ""));
											comboBox_4.setItemSet(app.lookup("dsLimitTypeRcdList"), {
												"label": "CD_NM",
												"value": "CD"
											});
										})(comboBox_4);
										comboBox_4.bind("value").toDataColumn("LIMIT_TYPE_RCD");
										return comboBox_4;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 4},
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
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 5},
								"configurator": function(cell){
									cell.columnName = "STD_YN";
									cell.control = (function(){
										var checkBox_2 = new cpr.controls.CheckBox("gdCkbStdYn");
										checkBox_2.value = "";
										checkBox_2.trueValue = "Y";
										checkBox_2.falseValue = "";
										checkBox_2.text = "";
										checkBox_2.style.css({
											"text-align" : "center"
										});
										checkBox_2.bind("value").toDataColumn("STD_YN");
										return checkBox_2;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 6},
								"configurator": function(cell){
									cell.columnName = "PRP1";
									cell.control = (function(){
										var inputBox_1 = new cpr.controls.InputBox("gdIpbPrp1");
										inputBox_1.maxLength = 50;
										inputBox_1.bind("value").toDataColumn("PRP1");
										return inputBox_1;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 7},
								"configurator": function(cell){
									cell.columnName = "PRP2";
									cell.control = (function(){
										var inputBox_2 = new cpr.controls.InputBox("gdIpbPrp2");
										inputBox_2.maxLength = 50;
										inputBox_2.bind("value").toDataColumn("PRP2");
										return inputBox_2;
									})();
								}
							}
						]
					}
				});
				container.addChild(grid_1, {
					"top": "30px",
					"left": "5px",
					"width": "1213px",
					"height": "561px"
				});
			})(group_2);
			container.addChild(group_2, {
				"top": "72px",
				"left": "5px",
				"width": "1225px",
				"height": "598px"
			});
			if(typeof onBodyLoad == "function"){
				app.addEventListener("load", onBodyLoad);
			}
			// Linking
			linker.userDefinedControl_2.ctrl = linker.grid_1;
		}
	});
	app.title = "수강신청유형설정";
	cpr.core.Platform.INSTANCE.register(app);
})();
