/*
 * App URI: app/crs/stdCrsPSmtPop
 * Source Location: app/crs/stdCrsPSmtPop.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("app/crs/stdCrsPSmtPop", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			﻿//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
			/// <xtmlink path="./stdCrsPSmtPop.xtm"/>
			
			
			var stdCrsPSmtPop = function() {
				var moPage = new Page();
				//임포트용 데이터 통신 오브젝트
				var moPObject = new PObject();
				
				/*
				 * 부모 페이지에서 받아온 기본값을 받는 객체
				 * @member stdCrsPSmtPop
				 * @author AeyoungLee 2016. 4. 5.
				 */
				moPObject.moCondSmtPopParam = {
					schValue : null,
					ctrlCd : null,
					ctrlNm : null,
					oCd : null,
					oNm : null,
				};
				
				/**
				 * onModelConstructDone_StdCrsPSchYearPop  화면 오픈 시 수행되는 함수
				 * @member stdCrsPSmtPop
				 * @type void
				 * @author AeyoungLee 2016. 4. 5.
				 */
				moPage.onModelConstructDone_StdCrsPSmtPop = function(){
					//리피트 초기 설정
			//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
			//		ExtRepeat.init("rptSmt");
					//검색조건 초기 설정
			//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
			//		ExtGroup.initSearchBox("grpSearch", "grpData");
					
					//호출한 페이지에서 파라미터 받기.
					doParentGet();
				}
				
				/**
				 * doParentGet 부모파라미터 셋팅
				 * @member stdCrsPSmtPop
				 * @type void
				 * @author AeyoungLee 2016. 4. 5.
				 */	
				function doParentGet(){
					if(ExtPopUp.isPopUp()) {
						// 호출한 페이지에서 파라미터 받기.										
						var voCondPopParam =  ExtPopUp.getParentVal("moCondParam");
								
						// 파라미터  값복사
						if(voCondPopParam.schValue){
							util.Control.setValue(app, "ipbSmtRcdNm", voCondPopParam.schValue);
						}	
						
						// 바로 검색 실행
						util.Header.clickSearch(app);
					}
				}
					
				/**
				 * onClick_BtnSearch 조회버튼 클릭 이벤트
				 * @member stdCrsPSmtPop
				 * @type void
				 * @author AeyoungLee 2016. 4. 5.
				 */
				moPage.onClick_BtnSearch = function() {
					//strCommand: listSmt 
					util.Submit.send(app, "subList", function(pbSuccess){
						if(pbSuccess){
							util.Control.redraw(app, "rptSmt");
							util.Msg.notify(app, "NLS.INF.M024");
						}
						
					});
				};
				
				/**
				 * doCloseOk (선택닫기 이벤트시 호출) 	
				 * @member stdCrsPSmtPop
				 * @type void
				 * @author AeyoungLee 2016. 4. 5.
				 */
				function doCloseOk() {
					if(ValueUtil.isNull(util.Grid.getCheckOrSelectedRowIndex(app, "grdSmt"))){
						//선택된 데이터가 없습니다.
						ComMsg.warn("M008");
						return false;
					}
					
					var vnIdx = util.Grid.getIndex(app, "grdSmt");
					
					moCondSmtPopParam.oCd  = util.Grid.getCellValue(app, "grdSmt", "CD", vnIdx);
					moCondSmtPopParam.oNm  = util.Grid.getCellValue(app, "grdSmt", "CD_NM", vnIdx);
					moCondSmtPopParam.ctrlCd = "ipbSmtRcd";
					moCondSmtPopParam.ctrlNm = "ipbSmtRcdNm";
					
					if(ExtPopUp.isPopUp()){
						ExtPopUp.closeLayeredPopup("callbackStdCrsPCondPop", moCondSmtPopParam);
					}				
				};
				
				/**
				 * doClose (화면닫기 이벤트시 호출) 	
				 * @member stdCrsPSmtPop
				 * @type void
				 * @author AeyoungLee 2016. 4. 5.
				 */
				function doClose() {
			//		moCondSmtPopParam.oCd  = "";
			//		moCondSmtPopParam.oNm  = "";
			//		moCondSmtPopParam.ctrlCd = "ipbSmtRcd";
			//		moCondSmtPopParam.ctrlNm = "ipbSmtRcdNm";
					
					if(ExtPopUp.isPopUp()){
						ExtPopUp.closeLayeredPopup("callbackStdCrsPCondPop", moCondSmtPopParam);
					}				
				};
			
			
				return moPage;
			};;
			// End - User Script
			
			// Header
			var dataSet_1 = new cpr.data.DataSet("dsSmt");
			dataSet_1.parseData({
				"columns": [
					{"name": "CD_NM"},
					{"name": "CD"}
				],
				"rows": []
			});
			app.register(dataSet_1);
			var dataMap_1 = new cpr.data.DataMap("dmReqKey");
			dataMap_1.parseData({
				"columns" : [{
					"name": "strSmtRcdNm",
					"dataType": "string"
				}]
			});
			app.register(dataMap_1);
			var submission_1 = new cpr.protocols.Submission("subList");
			submission_1.action = "/crs/StdCrsOptGrpPop/";
			submission_1.mediaType = "application/x-www-form-urlencoded";
			submission_1.addRequestData(dataMap_1);
			submission_1.addResponseData(dataSet_1, false);
			app.register(submission_1);
			
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
				var inputBox_1 = new cpr.controls.InputBox("ipbSmtRcdNm");
				inputBox_1.maxLength = 10;
				inputBox_1.bind("fieldLabel").toExpression("#optSmtNm.value");
				inputBox_1.bind("value").toDataMap(app.lookup("dmReqKey"), "strSmtRcdNm");
				if(typeof onIpbSmtRcdNmKeydown == "function") {
					inputBox_1.addEventListener("keydown", onIpbSmtRcdNmKeydown);
				}
				container.addChild(inputBox_1, {
					"top": "5px",
					"left": "90px",
					"width": "150px",
					"height": "25px"
				});
				var output_1 = new cpr.controls.Output("optSmtNm");
				output_1.value = "";
				output_1.bind("value").toLanguage("UI-DB-SMT_RCD_NM");
				container.addChild(output_1, {
					"top": "5px",
					"left": "5px",
					"width": "80px",
					"height": "25px"
				});
				var button_1 = new cpr.controls.Button("btnSearch");
				button_1.value = "";
				button_1.style.setClasses(["btn-search"]);
				button_1.bind("value").toLanguage("UI-SCR-SCH");
				if(typeof onBtnSearchClick == "function") {
					button_1.addEventListener("click", onBtnSearchClick);
				}
				container.addChild(button_1, {
					"top": "5px",
					"left": "375px",
					"width": "60px",
					"height": "25px"
				});
			})(group_1);
			container.addChild(group_1, {
				"top": "35px",
				"left": "5px",
				"width": "440px",
				"height": "32px"
			});
			
			var group_2 = new cpr.controls.Container("grpData");
			// Layout
			var xYLayout_3 = new cpr.controls.layouts.XYLayout();
			group_2.setLayout(xYLayout_3);
			(function(container){
				var userDefinedControl_2 = linker.userDefinedControl_2 = new udc.com.comTitle();
				userDefinedControl_2.bind("title").toLanguage("UI-SCR-TERMLST");
				container.addChild(userDefinedControl_2, {
					"top": "5px",
					"left": "5px",
					"width": "256px",
					"height": "25px"
				});
				var grid_1 = linker.grid_1 = new cpr.controls.Grid("grdSmt");
				grid_1.init({
					"dataSet": app.lookup("dsSmt"),
					"columns": [
						{"width": "40px"},
						{"width": "145px"},
						{"width": "145px"}
					],
					"header": {
						"rows": [{"height": "27px"}],
						"cells": [
							{
								"constraint": {"rowIndex": 0, "colIndex": 0},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-SCR-STAFFNO");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 1},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-DB-SMT_RCD");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 2},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-DB-SMT_RCD_NM");
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
									cell.columnName = "_repeatindex";
									cell.style.css({
										"text-align" : "center"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 1},
								"configurator": function(cell){
									cell.columnName = "CD";
									cell.style.css({
										"text-align" : "center"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 2},
								"configurator": function(cell){
									cell.columnName = "CD_NM";
								}
							}
						]
					}
				});
				if(typeof onGrdSmtRowDblclick == "function") {
					grid_1.addEventListener("row-dblclick", onGrdSmtRowDblclick);
				}
				container.addChild(grid_1, {
					"top": "30px",
					"left": "5px",
					"width": "430px",
					"height": "313px"
				});
			})(group_2);
			container.addChild(group_2, {
				"top": "72px",
				"left": "5px",
				"width": "440px",
				"height": "348px"
			});
			
			var button_2 = new cpr.controls.Button("btnCloseOk");
			button_2.value = "";
			button_2.bind("value").toLanguage("UI-SCR-CHOICLS");
			if(typeof onBtnCloseOkClick == "function") {
				button_2.addEventListener("click", onBtnCloseOkClick);
			}
			container.addChild(button_2, {
				"top": "425px",
				"left": "385px",
				"width": "60px",
				"height": "25px"
			});
			
			var button_3 = new cpr.controls.Button("btnCloseCancel");
			button_3.value = "";
			button_3.style.setClasses(["btn-commit"]);
			button_3.bind("value").toLanguage("UI-SCR-SCRNCLS");
			if(typeof onBtnCloseCancelClick == "function") {
				button_3.addEventListener("click", onBtnCloseCancelClick);
			}
			container.addChild(button_3, {
				"top": "425px",
				"left": "5px",
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
	app.title = "학기 목록 검색";
	cpr.core.Platform.INSTANCE.register(app);
})();
