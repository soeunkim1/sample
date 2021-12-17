/*
 * App URI: app/csr/extCsrSAtteStatExcelDown
 * Source Location: app/csr/extCsrSAtteStatExcelDown.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("app/csr/extCsrSAtteStatExcelDown", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			﻿//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
			///<xtmlink path="./extCsrSAtteStatExcelDown.xtm"/>
			
			var extCsrSAtteStatExcelDown = function() {
			
				var moPage = new Page();
				//임포트용 데이터 통신 오브젝트
				var moPObject = new PObject();
				
				/**
				 * @desc Header Import onLoad
				 * @param 
				 * @return void
				 * @author Sunyoung park 2016.12.1 
				 */
				moPage.onLoadImportDone_ImpTitle = function() {
					doHeaderOnLoad();
				};
				
			
				/**
				 * @desc 실행버튼 클릭시 엑셀로 데이터를 다운로드 하는 기능을 실행한다. 
				 * @param 
				 * @return void
				 * @author Sunyoung park 2016.12.1 
				 */
				moPage.onClick_BtnSaveRun = function() {
					
					if(!util.validate(app, ["dipKeyDate"])) return; 
					
					// 배치처리전 커버페이지 씌우는 로직추가
					util.coverPage(app);
					
					//strCommand: exportExcel 
					util.Submit.send(app, "subExecDown", function(pbSuccess){
						if(pbSuccess){
			//				
							var vsFileDir = util.DataMap.getValue(app, "dmFileInfo", "strFileDir");
							var vsFileNm = util.DataMap.getValue(app, "dmFileInfo", "strFileNm");
							var vsFileChgNm = util.DataMap.getValue(app, "dmFileInfo", "strFileChgNm");
							var strTmpFilePath = util.DataMap.getValue(app, "dmFileInfo", "strTmpFilePath");
							debugger;
							var voParam = {
								"strFileSubPath" : "",
								"strFileNm" : vsFileNm,
								"strOriFileNm" : vsFileNm,
								"strTmpFilePath" : strTmpFilePath,
								"strCommand" : "fileDownLoad"
							}
							
							//다운로드 받을 파일 위치, 다운로드받을 파일이름, 프로그래스동작여부(일단 ""), actionUrl
							FileUtil.downloadFile( "/std.cmn.StdCmnFileTransUtil.ex",voParam);
			//				
							// 정보추출이 처리되었습니다. 생성파일을 확인하십시오.
							util.Msg.alert("NLS-CSS-M106");
							util.Msg.notify(app, "NLS.CSS.M106");
								
						}else{
							// 처리가 취소되었습니다.
							util.Msg.notify(app, "NLS.INF.M013");
						}
						
						util.removeCover(app);
					});
				}
				
			
				/**
				 * @desc 코드정보 가져오기 
				 * @param 
				 * @return void
				 * @author Sunyoung park 2016.12.1 
				 */	
				moPage.onModelConstructDone_ExtCsrSAtteStatExcelDown = function() {
					
					//strCommand: onLoad 
					util.Submit.send(app, "subOnLoad", function(pbSuccess){		
						if(pbSuccess) {	
							util.DataMap.setValue(app, "dmReqList", "strKeyDate", util.DataMap.getValue(app, "dmResOnLoad", "strCutDt"));
							util.Control.redraw(app, "dipKeyDate");
							util.Control.redraw(app, ["cbbDgrCrsDivRcd","cbbCapIoDivRcd","cbbAss"]);
						}
					});
				};
				
				
				
				
				moPage.onClick_BtnYearSmt = function() {
					//기준일자 임포트(달력컨트롤ID,임포트ID)
					doOnclickSchYearSmt("dipKeyDate","impSchYearSmt");
				};
				return moPage;
			};;
			// End - User Script
			
			// Header
			var dataSet_1 = new cpr.data.DataSet("dsCapIoDivRcdList");
			dataSet_1.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"},
					{"name": "CD_PRP3"}
				],
				"rows": []
			});
			app.register(dataSet_1);
			
			var dataSet_2 = new cpr.data.DataSet("dsPrtDivRcdList");
			dataSet_2.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_2);
			
			var dataSet_3 = new cpr.data.DataSet("dsDgrCrsDivRcdList");
			dataSet_3.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_3);
			var dataMap_1 = new cpr.data.DataMap("dmResOnLoad");
			dataMap_1.parseData({
				"columns" : [{
					"name": "strCutDt",
					"dataType": "string"
				}]
			});
			app.register(dataMap_1);
			
			var dataMap_2 = new cpr.data.DataMap("dmReqList");
			dataMap_2.parseData({
				"columns" : [
					{
						"name": "strKeyDate",
						"dataType": "string"
					},
					{
						"name": "strDgrCrsDivRcd",
						"dataType": "string"
					},
					{
						"name": "strCapIoDivRcd",
						"dataType": "string"
					},
					{
						"name": "strAss",
						"dataType": "string"
					}
				]
			});
			app.register(dataMap_2);
			
			var dataMap_3 = new cpr.data.DataMap("dmFileInfo");
			dataMap_3.parseData({
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
					},
					{
						"name": "strTmpFilePath",
						"dataType": "string"
					}
				]
			});
			app.register(dataMap_3);
			var submission_1 = new cpr.protocols.Submission("subOnLoad");
			submission_1.action = "/csr/ExtCsrAtteStatExcelDown/";
			submission_1.mediaType = "application/x-www-form-urlencoded";
			submission_1.addResponseData(dataSet_1, false);
			submission_1.addResponseData(dataSet_3, false);
			submission_1.addResponseData(dataMap_1, false);
			app.register(submission_1);
			
			var submission_2 = new cpr.protocols.Submission("subExecDown");
			submission_2.action = "/csr/ExtCsrAtteStatExcelDown/";
			submission_2.mediaType = "application/x-www-form-urlencoded";
			submission_2.addRequestData(dataMap_2);
			submission_2.addResponseData(dataMap_3, false);
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
			
			var group_1 = new cpr.controls.Container("grpSearch");
			group_1.style.setClasses(["search-box"]);
			// Layout
			var xYLayout_2 = new cpr.controls.layouts.XYLayout();
			group_1.setLayout(xYLayout_2);
			(function(container){
				var output_1 = new cpr.controls.Output("optAss");
				output_1.value = "학년제";
				container.addChild(output_1, {
					"top": "5px",
					"left": "578px",
					"width": "65px",
					"height": "25px"
				});
				var comboBox_1 = new cpr.controls.ComboBox("cbbAss");
				comboBox_1.visible = false;
				comboBox_1.bind("fieldLabel").toExpression("#optAss.value");
				comboBox_1.bind("value").toDataMap(app.lookup("dmReqList"), "strAss");
				(function(comboBox_1){
					comboBox_1.addItem(new cpr.controls.Item("1", "1"));
					comboBox_1.addItem(new cpr.controls.Item("2", "2"));
					comboBox_1.addItem(new cpr.controls.Item("3", "3"));
					comboBox_1.addItem(new cpr.controls.Item("전체", ""));
				})(comboBox_1);
				container.addChild(comboBox_1, {
					"top": "5px",
					"left": "650px",
					"width": "55px",
					"height": "25px"
				});
				var output_2 = new cpr.controls.Output("optDgrCrsDivRcd");
				output_2.value = "학위과정";
				container.addChild(output_2, {
					"top": "5px",
					"left": "210px",
					"width": "80px",
					"height": "25px"
				});
				var comboBox_2 = new cpr.controls.ComboBox("cbbDgrCrsDivRcd");
				comboBox_2.visible = false;
				comboBox_2.bind("fieldLabel").toExpression("#optDgrCrsDivRcd.value");
				comboBox_2.bind("value").toDataMap(app.lookup("dmReqList"), "strDgrCrsDivRcd");
				(function(comboBox_2){
					comboBox_2.addItem(new cpr.controls.Item("전체", ""));
					comboBox_2.setItemSet(app.lookup("dsDgrCrsDivRcdList"), {
						"label": "CD_NM",
						"value": "CD"
					});
				})(comboBox_2);
				container.addChild(comboBox_2, {
					"top": "5px",
					"left": "295px",
					"width": "85px",
					"height": "25px"
				});
				var output_3 = new cpr.controls.Output("optCapIoDivRcd");
				output_3.value = "정원내외";
				container.addChild(output_3, {
					"top": "5px",
					"left": "386px",
					"width": "90px",
					"height": "25px"
				});
				var comboBox_3 = new cpr.controls.ComboBox("cbbCapIoDivRcd");
				comboBox_3.visible = false;
				comboBox_3.bind("fieldLabel").toExpression("#optCapIoDivRcd.value");
				comboBox_3.bind("value").toDataMap(app.lookup("dmReqList"), "strCapIoDivRcd");
				(function(comboBox_3){
					comboBox_3.addItem(new cpr.controls.Item("전체", ""));
					comboBox_3.setItemSet(app.lookup("dsCapIoDivRcdList"), {
						"label": "CD_NM",
						"value": "CD"
					});
				})(comboBox_3);
				container.addChild(comboBox_3, {
					"top": "5px",
					"left": "481px",
					"width": "88px",
					"height": "25px"
				});
				var output_4 = new cpr.controls.Output("optKeyDate");
				output_4.value = "기준일자";
				output_4.style.setClasses(["require"]);
				container.addChild(output_4, {
					"top": "5px",
					"left": "5px",
					"width": "80px",
					"height": "25px"
				});
				var dateInput_1 = new cpr.controls.DateInput("dipKeyDate");
				dateInput_1.userAttr({"require": "Y"});
				dateInput_1.bind("fieldLabel").toExpression("#optKeyDate.value");
				dateInput_1.bind("value").toDataMap(app.lookup("dmReqList"), "strKeyDate");
				container.addChild(dateInput_1, {
					"top": "5px",
					"left": "90px",
					"width": "90px",
					"height": "25px"
				});
				var button_1 = new cpr.controls.Button("btnYearSmt");
				button_1.value = "";
				button_1.style.setClasses(["btn-pop-search"]);
				if(typeof onBtnYearSmtClick == "function") {
					button_1.addEventListener("click", onBtnYearSmtClick);
				}
				container.addChild(button_1, {
					"top": "5px",
					"left": "184px",
					"width": "20px",
					"height": "25px"
				});
			})(group_1);
			container.addChild(group_1, {
				"top": "60px",
				"left": "5px",
				"width": "1225px",
				"height": "30px"
			});
			
			var embeddedApp_1 = new cpr.controls.EmbeddedApp("emaSchYearSmt");
			cpr.core.App.load("app/imp/impDialogSchYearSmtPrt", function(app) {
				if(app){
					embeddedApp_1.app = app;
				}
			});
			container.addChild(embeddedApp_1, {
				"top": "13px",
				"left": "1255px",
				"width": "470px",
				"height": "50px"
			});
			
			var userDefinedControl_2 = new udc.com.comFormTitle();
			userDefinedControl_2.bind("title").toLanguage("UI-SCR-EXECCDT");
			container.addChild(userDefinedControl_2, {
				"top": "35px",
				"left": "5px",
				"width": "150px",
				"height": "25px"
			});
			
			var button_2 = new cpr.controls.Button("btnSaveRun");
			button_2.value = "";
			button_2.style.setClasses(["btn-save"]);
			button_2.bind("value").toLanguage("UI-GLS-EXEC");
			if(typeof onBtnSaveRunClick == "function") {
				button_2.addEventListener("click", onBtnSaveRunClick);
			}
			container.addChild(button_2, {
				"top": "34px",
				"left": "1166px",
				"width": "59px",
				"height": "25px"
			});
			if(typeof onBodyLoad == "function"){
				app.addEventListener("load", onBodyLoad);
			}
		}
	});
	app.title = "extCsrSAtteStatExcelDown";
	cpr.core.Platform.INSTANCE.register(app);
})();
