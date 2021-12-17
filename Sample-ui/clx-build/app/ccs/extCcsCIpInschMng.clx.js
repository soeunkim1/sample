/*
 * App URI: app/ccs/extCcsCIpInschMng
 * Source Location: app/ccs/extCcsCIpInschMng.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("app/ccs/extCcsCIpInschMng", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			﻿//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
			/// <xtmlink path="./extCcsCIpInschMng.xtm"/>
			
			/**
			 * 교내IP대역관리
			 * @class extCcsCIpInschMng
			 * @author 박갑수 at 2016. 10. 21
			 */
			var extCcsCIpInschMng = function() {
				var moPage = new Page();
				
				/**
				 * @desc import 헤더 초기화
				 * @param 
				 * @return  void
				 * @author 박갑수 at 2016. 10. 21
				 */
				moPage.onLoadImportDone_ImpTitle = function() {
					// import 헤더 초기화
					doHeaderOnLoad();
				};
				
				/**
				 * @desc onLoad 실행
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 10. 21
				 */
				moPage.onModelConstructDone_ExtCcsCIpInschMng = function() {
					// 리피트 초기 설정
			//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
			//		ExtRepeat.init(["rptExtCcsIpInsch"]);
					
					// 조회
					doList(function(pbSuccess) {
						// 조회 : "조회되었습니다." header 메세지 표시
						if (pbSuccess) util.Msg.notify(app, "NLS.INF.M024");
					});
				};
				
				/**
				 * @desc 교내IP대역목록 조회
				 * @param poCallBackFunc 콜백정의
				 * @return void
				 * @author 박갑수 at 2016. 10. 21
				 */
				function doList(poCallBackFunc) {
					
					//strCommand: list 
					util.Submit.send(app, "subList", function(pbSuccess){
						if(pbSuccess){
							util.Control.redraw(app, "grdExtCcsIpInsch");	
							// 조회 후 콜백함수 수행
							if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess); 
						}
					});
				};
				
				/**
				 * @desc [rhCkbSelect]패널 onValueChanged 이벤트
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 10. 21
				 */
				moPage.onValueChanged_RhCkbSelect = function() {
					// 리피트 패널 설정
			//TO-BE: <ExtRepeat.selectedAllPanel> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
			//		ExtRepeat.selectedAllPanel("rhCkbSelect");
				};
				
				/**
				 * @desc [btnNew]신규 onClick 이벤트
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 10. 21
				 */
				moPage.onClick_BtnNew = function() {
					// 해당 리피트 insert 후 편집 시작할 컬럼 지정
					var vnIdx = util.Grid.insertRow(app, "grdExtCcsIpInsch", "rdIpbInschIpSt");
				};
				
				/**
				 * @desc [btnDel]삭제 onClick 이벤트
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 10. 21
				 */
				moPage.onClick_BtnDel = function() {
					// 해당 리피트 delete
					util.Grid.deleteRow(app, "grdExtCcsIpInsch");
				};
				
				/**
				 * @desc [btnRestore]작업취소 onClick 이벤트
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 10. 21
				 */
				moPage.onClick_BtnRestore = function() {
					// 해당 리피트 상태 초기화
					util.Grid.restoreRow(app, "grdExtCcsIpInsch");
				};
				
				/**
				 * @desc [btnSave]작업저장 onClick 이벤트
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 10. 21
				 */
				moPage.onClick_BtnSave = function() {
					// 작업저장
					doSave();
				};
				
				/**
				 * @desc 교내IP대역목록 변경사항 저장
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 10. 21
				 */
				function doSave() {
					
					// 리피트 변경사항 체크
					if(!util.Grid.isModified(app, ["grdExtCcsIpInsch"], "MSG")){
						return false;
					}
			
					// 리피트 Validation Check
					if(!util.validate(app, "grdExtCcsIpInsch")) return false;
			
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
			var dataSet_1 = new cpr.data.DataSet("dsExtCcsIpInsch");
			dataSet_1.parseData({
				"info": "EXT_CCS_IP_INSCH@INSCH_IP_ST",
				"columns": [
					{"name": "INSCH_IP_ST"},
					{"name": "INSCH_IP_END"},
					{"name": "USE_YN"}
				],
				"rows": []
			});
			app.register(dataSet_1);
			var submission_1 = new cpr.protocols.Submission("subList");
			submission_1.action = "/ccs/ExtCcsIpInschMng/";
			submission_1.mediaType = "application/x-www-form-urlencoded";
			submission_1.addResponseData(dataSet_1, false);
			app.register(submission_1);
			
			var submission_2 = new cpr.protocols.Submission("subSave");
			submission_2.action = "/ccs/ExtCcsIpInschMng/";
			submission_2.mediaType = "application/x-www-form-urlencoded";
			submission_2.addRequestData(dataSet_1);
			app.register(submission_2);
			
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
				userDefinedControl_2.bind("title").toLanguage("UI-SCR-STDGRDSYSMNGLIST");
				container.addChild(userDefinedControl_2, {
					"top": "5px",
					"left": "5px",
					"width": "280px",
					"height": "25px"
				});
				var button_1 = new cpr.controls.Button("btnNew");
				button_1.value = "";
				button_1.style.setClasses(["btn-new"]);
				button_1.bind("value").toLanguage("UI-SCR-NEW");
				if(typeof onBtnNewClick == "function") {
					button_1.addEventListener("click", onBtnNewClick);
				}
				container.addChild(button_1, {
					"top": "5px",
					"left": "963px",
					"width": "60px",
					"height": "25px"
				});
				var button_2 = new cpr.controls.Button("btnDel");
				button_2.value = "";
				button_2.style.setClasses(["btn-delete"]);
				button_2.bind("value").toLanguage("UI-SCR-DELETE");
				if(typeof onBtnDelClick == "function") {
					button_2.addEventListener("click", onBtnDelClick);
				}
				container.addChild(button_2, {
					"top": "5px",
					"left": "1028px",
					"width": "60px",
					"height": "25px"
				});
				var button_3 = new cpr.controls.Button("btnRestore");
				button_3.value = "";
				button_3.style.setClasses(["btn-restore"]);
				button_3.bind("value").toLanguage("UI-SCR-WRKCANCL");
				if(typeof onBtnRestoreClick == "function") {
					button_3.addEventListener("click", onBtnRestoreClick);
				}
				container.addChild(button_3, {
					"top": "5px",
					"left": "1093px",
					"width": "60px",
					"height": "25px"
				});
				var button_4 = new cpr.controls.Button("btnSave");
				button_4.value = "";
				button_4.style.setClasses(["btn-save"]);
				button_4.bind("value").toLanguage("UI-SCR-WRKSAVE");
				if(typeof onBtnSaveClick == "function") {
					button_4.addEventListener("click", onBtnSaveClick);
				}
				container.addChild(button_4, {
					"top": "5px",
					"left": "1158px",
					"width": "60px",
					"height": "25px"
				});
				var grid_1 = linker.grid_1 = new cpr.controls.Grid("grdExtCcsIpInsch");
				grid_1.init({
					"dataSet": app.lookup("dsExtCcsIpInsch"),
					"columns": [
						{"width": "25px"},
						{"width": "25px"},
						{"width": "40px"},
						{"width": "250px"},
						{"width": "250px"},
						{"width": "80px"}
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
									cell.bind("text").toLanguage("UI-DB-OG_CD");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 4},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-DB-OG_CD");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 5},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-DB-OG_CD");
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
										var output_1 = new cpr.controls.Output();
										output_1.style.css({
											"text-align" : "center"
										});
										return output_1;
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
									cell.columnName = "INSCH_IP_ST";
									cell.control = (function(){
										var inputBox_1 = new cpr.controls.InputBox("gdIpbInschIpSt");
										inputBox_1.maxLength = 50;
										inputBox_1.bind("value").toDataColumn("INSCH_IP_ST");
										return inputBox_1;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 4},
								"configurator": function(cell){
									cell.columnName = "INSCH_IP_END";
									cell.control = (function(){
										var inputBox_2 = new cpr.controls.InputBox("gdIpbInschIpEnd");
										inputBox_2.maxLength = 50;
										inputBox_2.bind("value").toDataColumn("INSCH_IP_END");
										return inputBox_2;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 5},
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
					"width": "1213px",
					"height": "598px"
				});
			})(group_1);
			container.addChild(group_1, {
				"top": "35px",
				"left": "5px",
				"width": "1225px",
				"height": "635px"
			});
			if(typeof onBodyLoad == "function"){
				app.addEventListener("load", onBodyLoad);
			}
			// Linking
			linker.userDefinedControl_2.ctrl = linker.grid_1;
		}
	});
	app.title = "교내IP대역관리";
	cpr.core.Platform.INSTANCE.register(app);
})();