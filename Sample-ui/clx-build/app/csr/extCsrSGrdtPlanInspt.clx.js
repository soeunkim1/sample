/*
 * App URI: app/csr/extCsrSGrdtPlanInspt
 * Source Location: app/csr/extCsrSGrdtPlanInspt.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("app/csr/extCsrSGrdtPlanInspt", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			﻿//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
			/// <xtmlink path="./extCsrSGrdtPlanInspt.xtm"/>
			
			
			var extCsrSGrdtPlanInspt = function() {
					
				var moPage = new Page();
					
				/**
				 * @desc  Header Import onLoad
				 * @return void
				 * @author Aeyoung Lee 2016-09-01
				 */
				moPage.onLoadImportDone_ImpTitle = function() {		
					doHeaderOnLoad();
				};
				
				/**
				 * @desc 다운로드버튼 클릭이벤트 (업로드양식다운로드)
				 * @param 
				 * @return 
				 * @author Aeyoung Lee 2016-09-01
				 */
				moPage.onClick_BtnSaveFileDown = function() {
					var vsFileChgNm = "학적_졸업예정자실태조사.xlsx";
					
					var voParam = {
								"strFileSubPath" : "stdCmnCTemplateFile",
								"strFileNm" 	 : vsFileChgNm,
								"strOriFileNm" 	 : vsFileChgNm,
								"strTmpFilePath" : "",
								"strCommand" 	 : "fileDownLoad"
					}
					//다운로드 받을 파일 위치, 다운로드받을 파일이름, 프로그래스동작여부(일단 ""), actionUrl
					FileUtil.downloadFile( "/std.cmn.StdCmnFileTransUtil.ex",voParam);
				};
				
				/**
				 * @desc Browse 버튼 클릭 이벤트 (File Dialog 창 open)
				 * @param 
				 * @return 
				 * @author Aeyoung Lee 2016-09-01
				 */
				moPage.onClick_BtnSaveBrowse = function() {
					FileUtil.getFileName(true, ["xls", "xlsx"], function(psFileNm){
						util.Control.setValue(app, "optFilePath", psFileNm);
					},"",false);
				};
				
				/**
				 * @desc 실행버튼 클릭 이벤트
				 * @param 
				 * @return 
				 * @author Aeyoung Lee 2016-09-01
				 */
				moPage.onClick_BtnSaveRun = function() {
					
					if(!util.validate(app, ["cbbSchYear", "cbbSmt", "dipKeyDate"])) return; 
					
					// 2016.10.14 배치처리전 커버페이지 씌우는 로직추가
					util.coverPage(app);
					
					
					// 엑셀업로드 서브미션
					//strCommand: execUpload 
					util.Submit.send(app, "subExecUpload", function(pbSuccess){
						if(pbSuccess){
							
							util.Control.setValue(app, "optFilePath", "");
							
							var vsFileDir = util.DataMap.getValue(app, "dmFileInfo", "strFileDir");
							var vsFileNm = util.DataMap.getValue(app, "dmFileInfo", "strFileNm");
							var vsFileChgNm = util.DataMap.getValue(app, "dmFileInfo", "strFileChgNm");
							var strTmpFilePath = util.DataMap.getValue(app, "dmFileInfo", "strTmpFilePath");
							
							var voParam = {
								"strFileSubPath" : "",
								"strFileNm" : vsFileNm,
								"strOriFileNm" : vsFileNm,
								"strTmpFilePath" : strTmpFilePath,
								"strCommand" : "fileDownLoad"
							}
							
							//다운로드 받을 파일 위치, 다운로드받을 파일이름, 프로그래스동작여부(일단 ""), actionUrl
							FileUtil.downloadFile( "/std.cmn.StdCmnFileTransUtil.ex",voParam);
							
							// 정보추출이 처리되었습니다. 생성파일을 확인하십시오.
							util.Msg.alert("NLS-CSS-M106");
							util.Msg.notify(app, "NLS.CSS.M106");
								
						}else{
							// 처리가 취소되었습니다.
							util.Msg.notify(app, "NLS.INF.M013");
						}
						
						util.Control.setValue(app, "optFilePath", "");
						util.removeCover(app);
					});
				};
				
				
				moPage.onModelConstructDone_ExtCsrSGrdtPlanInspt = function() {
					//strCommand: onLoad 
					util.Submit.send(app, "subOnLoad", function(pbSuccess){		
						if(pbSuccess) {	
							util.Control.redraw(app, "dipKeyDate");
							util.Control.redraw(app, ["cbbSchYear","cbbSmt"]);
						}
					});
				};
				return moPage;
			};;
			// End - User Script
			
			// Header
			var dataSet_1 = new cpr.data.DataSet("dsListYear");
			dataSet_1.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_1);
			
			var dataSet_2 = new cpr.data.DataSet("dsListSmt");
			dataSet_2.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_2);
			var dataMap_1 = new cpr.data.DataMap("dmReqKey");
			dataMap_1.parseData({
				"columns" : [
					{
						"name": "strFilePath",
						"dataType": "string"
					},
					{
						"name": "KeyDate",
						"dataType": "string"
					},
					{
						"name": "strSchYearRcd",
						"dataType": "string"
					},
					{
						"name": "strSmtRcd",
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
					},
					{
						"name": "strTmpFilePath",
						"dataType": "string"
					},
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
			app.register(dataMap_2);
			var submission_1 = new cpr.protocols.Submission("subOnLoad");
			submission_1.action = "/csr/ExtCsrGrdtPlanInspt/";
			submission_1.mediaType = "application/x-www-form-urlencoded";
			submission_1.addResponseData(dataMap_1, false);
			submission_1.addResponseData(dataSet_1, false);
			submission_1.addResponseData(dataSet_2, false);
			app.register(submission_1);
			
			var submission_2 = new cpr.protocols.Submission("subExecUpload");
			submission_2.action = "/csr/ExtCsrGrdtPlanInspt/";
			submission_2.mediaType = "application/x-www-form-urlencoded";
			submission_2.addRequestData(dataMap_1);
			submission_2.addResponseData(dataMap_2, false);
			app.register(submission_2);
			
			var submission_3 = new cpr.protocols.Submission("subFileDown");
			submission_3.action = "/csr/ExtCsrGrdtPlanInspt/";
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
			var userDefinedControl_1 = new udc.com.appHeader("appheader1");
			container.addChild(userDefinedControl_1, {
				"top": "5px",
				"right": "5px",
				"left": "5px",
				"height": "25px"
			});
			
			var button_1 = new cpr.controls.Button("btnSaveRun");
			button_1.value = "";
			button_1.style.setClasses(["btn-save"]);
			button_1.bind("value").toLanguage("UI-GLS-EXEC");
			if(typeof onBtnSaveRunClick == "function") {
				button_1.addEventListener("click", onBtnSaveRunClick);
			}
			container.addChild(button_1, {
				"top": "35px",
				"left": "1171px",
				"width": "59px",
				"height": "25px"
			});
			
			var userDefinedControl_2 = new udc.com.comFormTitle();
			userDefinedControl_2.bind("title").toLanguage("UI-SCR-EXECCDT");
			container.addChild(userDefinedControl_2, {
				"top": "35px",
				"left": "5px",
				"width": "150px",
				"height": "25px"
			});
			
			var group_1 = new cpr.controls.Container("grpExecCond");
			group_1.style.setClasses(["search-box"]);
			// Layout
			var xYLayout_2 = new cpr.controls.layouts.XYLayout();
			group_1.setLayout(xYLayout_2);
			(function(container){
				var output_1 = new cpr.controls.Output("optKeyDate");
				output_1.value = "";
				output_1.style.setClasses(["require"]);
				output_1.bind("value").toLanguage("UI-SCR-STDDT");
				container.addChild(output_1, {
					"top": "6px",
					"left": "578px",
					"width": "122px",
					"height": "25px"
				});
				var dateInput_1 = new cpr.controls.DateInput("dipKeyDate");
				dateInput_1.userAttr({"require": "Y"});
				dateInput_1.bind("fieldLabel").toExpression("#optKeyDate.value");
				dateInput_1.bind("value").toDataMap(app.lookup("dmReqKey"), "KeyDate");
				container.addChild(dateInput_1, {
					"top": "6px",
					"left": "706px",
					"width": "90px",
					"height": "25px"
				});
				var output_2 = new cpr.controls.Output("optSchYear");
				output_2.value = "";
				output_2.style.setClasses(["require"]);
				output_2.bind("value").toLanguage("UI-GLS-SCH_YEAR");
				container.addChild(output_2, {
					"top": "6px",
					"left": "9px",
					"width": "140px",
					"height": "25px"
				});
				var comboBox_1 = new cpr.controls.ComboBox("cbbSchYear");
				comboBox_1.userAttr({"require": "Y"});
				comboBox_1.bind("fieldLabel").toExpression("#optSchYear.value");
				comboBox_1.bind("value").toDataMap(app.lookup("dmReqKey"), "strSchYearRcd");
				(function(comboBox_1){
					comboBox_1.setItemSet(app.lookup("dsListYear"), {
						"label": "CD_NM",
						"value": "CD"
					});
				})(comboBox_1);
				container.addChild(comboBox_1, {
					"top": "6px",
					"left": "154px",
					"width": "131px",
					"height": "25px"
				});
				var output_3 = new cpr.controls.Output("optSmt");
				output_3.value = "";
				output_3.style.setClasses(["require"]);
				output_3.bind("value").toLanguage("UI-GLS-SMT");
				container.addChild(output_3, {
					"top": "6px",
					"left": "294px",
					"width": "140px",
					"height": "25px"
				});
				var comboBox_2 = new cpr.controls.ComboBox("cbbSmt");
				comboBox_2.userAttr({"require": "Y"});
				comboBox_2.bind("fieldLabel").toExpression("#optSmt.value");
				comboBox_2.bind("value").toDataMap(app.lookup("dmReqKey"), "strSmtRcd");
				(function(comboBox_2){
					comboBox_2.setItemSet(app.lookup("dsListSmt"), {
						"label": "CD_NM",
						"value": "CD"
					});
				})(comboBox_2);
				container.addChild(comboBox_2, {
					"top": "6px",
					"left": "439px",
					"width": "136px",
					"height": "25px"
				});
			})(group_1);
			container.addChild(group_1, {
				"top": "60px",
				"left": "5px",
				"width": "1225px",
				"height": "32px"
			});
			
			var group_2 = new cpr.controls.Container("grpFile");
			group_2.style.setClasses(["search-box"]);
			// Layout
			var xYLayout_3 = new cpr.controls.layouts.XYLayout();
			group_2.setLayout(xYLayout_3);
			(function(container){
				var output_4 = new cpr.controls.Output("optFilePath");
				output_4.value = "";
				output_4.style.setClasses(["require"]);
				output_4.bind("value").toLanguage("UI-SCR-UPLOADFILE");
				container.addChild(output_4, {
					"top": "5px",
					"left": "5px",
					"width": "140px",
					"height": "25px"
				});
				var output_5 = new cpr.controls.Output("optFilePath");
				output_5.value = "";
				output_5.bind("value").toDataMap(app.lookup("dmReqKey"), "strFilePath");
				container.addChild(output_5, {
					"top": "5px",
					"left": "150px",
					"width": "1006px",
					"height": "25px"
				});
				var button_2 = new cpr.controls.Button("btnSaveBrowse");
				button_2.value = "";
				button_2.bind("value").toLanguage("UI-SCR-EXCEL_UPLOAD");
				if(typeof onBtnSaveBrowseClick == "function") {
					button_2.addEventListener("click", onBtnSaveBrowseClick);
				}
				container.addChild(button_2, {
					"top": "5px",
					"left": "1160px",
					"width": "60px",
					"height": "25px"
				});
				var output_6 = new cpr.controls.Output("optUploadFile");
				output_6.value = "";
				output_6.bind("value").toLanguage("UI-SCR-UPLOADFILEDOWN");
				container.addChild(output_6, {
					"top": "30px",
					"left": "5px",
					"width": "140px",
					"height": "25px"
				});
				var button_3 = new cpr.controls.Button("btnSaveFileDown");
				button_3.value = "";
				button_3.bind("value").toLanguage("UI-SCR-DOWNLOAD");
				if(typeof onBtnSaveFileDownClick == "function") {
					button_3.addEventListener("click", onBtnSaveFileDownClick);
				}
				container.addChild(button_3, {
					"top": "30px",
					"left": "150px",
					"width": "60px",
					"height": "25px"
				});
			})(group_2);
			container.addChild(group_2, {
				"top": "97px",
				"left": "5px",
				"width": "1225px",
				"height": "55px"
			});
			if(typeof onBodyLoad == "function"){
				app.addEventListener("load", onBodyLoad);
			}
		}
	});
	app.title = "졸업예정자실태조사";
	cpr.core.Platform.INSTANCE.register(app);
})();