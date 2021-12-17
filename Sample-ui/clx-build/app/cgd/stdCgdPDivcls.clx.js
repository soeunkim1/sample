/*
 * App URI: app/cgd/stdCgdPDivcls
 * Source Location: app/cgd/stdCgdPDivcls.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("app/cgd/stdCgdPDivcls", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			﻿//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
			/// <xtmlink path="./stdCgdPDivcls.xtm"/>
			
			/**
			 * 분반검색
			 * @class stdCgdPReTlsn
			 * @author 박갑수 at 2016. 4. 5
			 */
			var stdCgdPDivcls = function() {
				var moPage = new Page();
				
				/**
				 * @desc onLoad 실행
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 4. 5
				 */
				moPage.onModelConstructDone_StdCgdPDivcls = function() {
					if(ExtPopUp.isPopUp()){
						var voDivCls =  ExtPopUp.getParentVal("moIdsForDivcls");
						
						util.DataMap.setValue(app, "dmReqKey", "strSchYearRcd", voDivCls.iSchYearRcd);
						util.DataMap.setValue(app, "dmReqKey", "strSmtRcd", voDivCls.iSmtRcd);
						util.DataMap.setValue(app, "dmReqKey", "strRecCd", voDivCls.iRecCd);
			
						//strCommand: listDivcls 
						util.Submit.send(app, "subList", function(pbSuccess){
							if(pbSuccess){
								util.Control.redraw(app, "grdDivcls");
								
								var vnLength = util.DataSet.getRowCount(app, "dsDivclsList");
								if(vnLength > 0){
									util.Control.setVisible(app, true, ["rptDivcls"]);
									util.Control.setVisible(app, false, ["lblDivclsCd", "ipbDivclsCd"]);
									util.Control.setValue(app, "ipbDivclsCd", "");
								}else {
									util.Control.setVisible(app, false, ["rptDivcls"]);
									util.Control.setVisible(app, true, ["lblDivclsCd", "ipbDivclsCd"]);
									util.Control.setValue(app, "ipbDivclsCd", "00");
								}
							}
						});
					}
				};
				
				/**
				 * @desc [rptCcrTlsnReq]재수강대상 onDoubleClick 이벤트
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 4. 5
				 */
				moPage.onDoubleClick_RptDivcls = function() {
					// 선택닫기 함수
					doCloseOk();
				};
				
				/**
				 * @desc [btnCloseCancel]화면닫기 onClick 이벤트
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 4. 5
				 */
				moPage.onClick_BtnCloseCancel = function() {
					// 팝업 닫기
					app.close();
				};
				
				/**
				 * @desc [btnSearch]선택닫기 onClick 이벤트
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 4. 5
				 */
				moPage.onClick_BtnCloseOk = function() {
					// 선택닫기 함수
					doCloseOk();
				};
				
				/**
				 * @desc 선택닫기 함수
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 4. 5
				 */
				function doCloseOk() {
					var vsIpbDivclsCd = util.Control.getValue(app, "ipbDivclsCd");
					if(ValueUtil.isNull(util.Grid.getCheckOrSelectedRowIndex(app, "grdDivcls")) && ValueUtil.isNull(vsIpbDivclsCd)){
						// 선택된 데이터가 없습니다.
						ComMsg.warn("M008");
						return false;
					}
					
					var vsDivclsCd = "";
					var vnLength = util.DataSet.getRowCount(app, "dsDivclsList");
					
					if(vnLength > 0){
						vsDivclsCd = util.Grid.getCellValue(app, "grdDivcls", "DIVCLS_CD");
					}else {
						vsDivclsCd = vsIpbDivclsCd;
					}
					
					ExtPopUp.closeLayeredPopup("callbackDivclsPopup", vsDivclsCd);
				};
				
				/**
				 * @desc [ipbDivclsCd]분반코드 onKeyDown 이벤트
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 4. 5
				 */
				moPage.onKeyDown_IpbDivclsCd = function(strKeyType, strKeyStatus) {
					// 엔터키 입력시 
					if(e.keyCode == cpr.events.KeyCode.ENTER){
						// 선택닫기 함수
						doCloseOk();
					}
				};
				
				return moPage;
			};;
			// End - User Script
			
			// Header
			var dataSet_1 = new cpr.data.DataSet("dsDivclsList");
			dataSet_1.parseData({
				"columns": [{"name": "DIVCLS_CD"}],
				"rows": []
			});
			app.register(dataSet_1);
			var dataMap_1 = new cpr.data.DataMap("dmReqKey");
			dataMap_1.parseData({
				"columns" : [
					{
						"name": "strSchYearRcd",
						"dataType": "string"
					},
					{
						"name": "strSmtRcd",
						"dataType": "string"
					},
					{
						"name": "strRecCd",
						"dataType": "string"
					},
					{
						"name": "strDivclsCd",
						"dataType": "string"
					}
				]
			});
			app.register(dataMap_1);
			var submission_1 = new cpr.protocols.Submission("subList");
			submission_1.action = "/cgd/StdCgdCRec/";
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
			var button_1 = new cpr.controls.Button("btnCloseOk");
			button_1.value = "";
			button_1.bind("value").toLanguage("UI-SCR-CHOICLS");
			if(typeof onBtnCloseOkClick == "function") {
				button_1.addEventListener("click", onBtnCloseOkClick);
			}
			container.addChild(button_1, {
				"top": "165px",
				"left": "105px",
				"width": "60px",
				"height": "25px"
			});
			
			var button_2 = new cpr.controls.Button("btnCloseCancel");
			button_2.value = "";
			button_2.style.setClasses(["btn-commit"]);
			button_2.bind("value").toLanguage("UI-SCR-SCRNCLS");
			if(typeof onBtnCloseCancelClick == "function") {
				button_2.addEventListener("click", onBtnCloseCancelClick);
			}
			container.addChild(button_2, {
				"top": "165px",
				"left": "5px",
				"width": "60px",
				"height": "25px"
			});
			
			var group_1 = new cpr.controls.Container("grpData");
			// Layout
			var xYLayout_2 = new cpr.controls.layouts.XYLayout();
			group_1.setLayout(xYLayout_2);
			(function(container){
				var grid_1 = new cpr.controls.Grid("grdDivcls");
				grid_1.init({
					"dataSet": app.lookup("dsDivclsList"),
					"columns": [{"width": "129px"}],
					"header": {
						"rows": [{"height": "27px"}],
						"cells": [{
							"constraint": {"rowIndex": 0, "colIndex": 0},
							"configurator": function(cell){
								cell.bind("text").toLanguage("UI-DB-DIVCLS_CD");
							}
						}]
					},
					"detail": {
						"rows": [{"height": "25px"}],
						"cells": [{
							"constraint": {"rowIndex": 0, "colIndex": 0},
							"configurator": function(cell){
								cell.columnName = "DIVCLS_CD";
							}
						}]
					}
				});
				if(typeof onGrdDivclsDblclick == "function") {
					grid_1.addEventListener("dblclick", onGrdDivclsDblclick);
				}
				container.addChild(grid_1, {
					"top": "5px",
					"left": "5px",
					"width": "148px",
					"height": "143px"
				});
				var output_1 = new cpr.controls.Output("optDivclsCd");
				output_1.value = "";
				output_1.style.setClasses(["require"]);
				output_1.bind("value").toLanguage("UI-GLS-STUD_ID");
				container.addChild(output_1, {
					"top": "5px",
					"left": "5px",
					"width": "60px",
					"height": "25px"
				});
				var inputBox_1 = new cpr.controls.InputBox("ipbDivclsCd");
				inputBox_1.visible = false;
				inputBox_1.maxLength = 100;
				inputBox_1.bind("fieldLabel").toExpression("#optDivclsCd.value");
				inputBox_1.bind("value").toDataMap(app.lookup("dmReqKey"), "strDivclsCd");
				if(typeof onIpbDivclsCdKeydown == "function") {
					inputBox_1.addEventListener("keydown", onIpbDivclsCdKeydown);
				}
				container.addChild(inputBox_1, {
					"top": "5px",
					"left": "70px",
					"width": "81px",
					"height": "25px"
				});
			})(group_1);
			container.addChild(group_1, {
				"top": "5px",
				"left": "5px",
				"width": "160px",
				"height": "155px"
			});
			if(typeof onBodyLoad == "function"){
				app.addEventListener("load", onBodyLoad);
			}
		}
	});
	app.title = "분반검색";
	cpr.core.Platform.INSTANCE.register(app);
})();