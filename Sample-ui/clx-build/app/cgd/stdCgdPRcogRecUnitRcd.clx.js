/*
 * App URI: app/cgd/stdCgdPRcogRecUnitRcd
 * Source Location: app/cgd/stdCgdPRcogRecUnitRcd.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("app/cgd/stdCgdPRcogRecUnitRcd", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			﻿//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
			/// <xtmlink path="./stdCgdPRcogRecUnitRcd.xtm"/>
			
			/**
			 * 인정성적단위검색
			 * @class stdCgdPRcogRecUnitRcd
			 * @author 박갑수 at 2016. 3. 29
			 */
			var stdCgdPRcogRecUnitRcd = function() {
				var moPage = new Page();
				
				/**
				 * @desc onLoad 실행
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 3. 29
				 */
				moPage.onModelConstructDone_stdCgdPRcogRecUnitRcd = function() {
					if(ExtPopUp.isPopUp()){
						var voRcogRecUnitRcd =  ExtPopUp.getParentVal("moIdsForRcogRecUnitRcd");
						
						util.DataMap.setValue(app, "dmReqKey", "strCdCls", voRcogRecUnitRcd.iCd);
			
						//strCommand: listRecUnitRcd 
						util.Submit.send(app, "subList", function(pbSuccess){
							if(pbSuccess){
								util.Control.redraw(app, "grdCmnConfCode");
								ExtControl.setTextValue("rhBtnCdNm", voRcogRecUnitRcd.iCdNm);
							}
						});
					}
				};
				
				/**
				 * @desc [btnSearch]선택닫기 onClick 이벤트
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 3. 29
				 */
				moPage.onClick_BtnCloseOk = function() {
					// 선택닫기 함수
					doCloseOk();
				};
				
				/**
				 * @desc [btnCloseCancel]화면닫기 onClick 이벤트
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 3. 29
				 */
				moPage.onClick_BtnCloseCancel = function() {
					// 팝업 닫기
					app.close();
				};
				
				/**
				 * @desc [rptCmnConfCode]코드목록 onDoubleClick 이벤트
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 3. 29
				 */
				moPage.onDoubleClick_RptCmnConfCode = function() {
					// 선택닫기 함수
					doCloseOk();
				};
				
				/**
				 * @desc 부모페이지 리턴
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 3. 29
				 */
				function doCloseOk(){
					if(ValueUtil.isNull(util.Grid.getCheckOrSelectedRowIndex(app, "grdCmnConfCode"))){
						// 선택된 데이터가 없습니다.
						ComMsg.warn("M008");
						return false;
					}
					
					var vsCd = util.Grid.getCellValue(app, "grdCmnConfCode", "CD");
					var vsCdNm = util.Grid.getCellValue(app, "grdCmnConfCode", "CD_NM");
					
					var vaRtnValue = new Array();
					vaRtnValue[0] = vsCd;
					vaRtnValue[1] = vsCdNm;
					
					ExtPopUp.closeLayeredPopup("callbackRcogRecUnitRcdPopup", vaRtnValue);
				};
				
				return moPage;
			};;
			// End - User Script
			
			// Header
			var dataSet_1 = new cpr.data.DataSet("dsRcogRecUnitRcdList");
			dataSet_1.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_1);
			var dataMap_1 = new cpr.data.DataMap("dmReqKey");
			dataMap_1.parseData({
				"columns" : [{
					"name": "strCdCls",
					"dataType": "string"
				}]
			});
			app.register(dataMap_1);
			var submission_1 = new cpr.protocols.Submission("subList");
			submission_1.action = "/cgd/StdCgdRecRcog/";
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
			var group_1 = new cpr.controls.Container("grpData");
			// Layout
			var xYLayout_2 = new cpr.controls.layouts.XYLayout();
			group_1.setLayout(xYLayout_2);
			(function(container){
				var grid_1 = new cpr.controls.Grid("grdCmnConfCode");
				grid_1.init({
					"dataSet": app.lookup("dsRcogRecUnitRcdList"),
					"columns": [
						{"width": "129px"},
						{
							"width": "129px",
							"visible": false
						}
					],
					"header": {
						"rows": [{"height": "27px"}],
						"cells": [
							{
								"constraint": {"rowIndex": 0, "colIndex": 0},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-DB-OS_CD");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 1},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-DB-CD");
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
									cell.columnName = "CD_NM";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 1},
								"configurator": function(cell){
									cell.columnName = "CD";
								}
							}
						]
					}
				});
				if(typeof onGrdCmnConfCodeDblclick == "function") {
					grid_1.addEventListener("dblclick", onGrdCmnConfCodeDblclick);
				}
				container.addChild(grid_1, {
					"top": "5px",
					"left": "5px",
					"width": "148px",
					"height": "253px"
				});
			})(group_1);
			container.addChild(group_1, {
				"top": "5px",
				"left": "5px",
				"width": "160px",
				"height": "265px"
			});
			
			var button_1 = new cpr.controls.Button("btnCloseCancel");
			button_1.value = "";
			button_1.style.setClasses(["btn-commit"]);
			button_1.bind("value").toLanguage("UI-SCR-SCRNCLS");
			if(typeof onBtnCloseCancelClick == "function") {
				button_1.addEventListener("click", onBtnCloseCancelClick);
			}
			container.addChild(button_1, {
				"top": "275px",
				"left": "5px",
				"width": "60px",
				"height": "25px"
			});
			
			var button_2 = new cpr.controls.Button("btnCloseOk");
			button_2.value = "";
			button_2.bind("value").toLanguage("UI-SCR-CHOICLS");
			if(typeof onBtnCloseOkClick == "function") {
				button_2.addEventListener("click", onBtnCloseOkClick);
			}
			container.addChild(button_2, {
				"top": "275px",
				"left": "105px",
				"width": "60px",
				"height": "25px"
			});
			if(typeof onBodyLoad == "function"){
				app.addEventListener("load", onBodyLoad);
			}
		}
	});
	app.title = "인정성적단위";
	cpr.core.Platform.INSTANCE.register(app);
})();
