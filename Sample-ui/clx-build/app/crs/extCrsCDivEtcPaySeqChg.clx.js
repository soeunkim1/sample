/*
 * App URI: app/crs/extCrsCDivEtcPaySeqChg
 * Source Location: app/crs/extCrsCDivEtcPaySeqChg.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("app/crs/extCrsCDivEtcPaySeqChg", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			﻿//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
			/// <xtmlink path="./extCrsCDivEtcPaySeqChg.xtm"/>
			
			
			var extCrsCDivEtcPaySeqChg = function() {
					
				var moPage = new Page();
					
				/**
				 * @desc  Header Import onLoad
				 * @return void
				 * @author Aeyoung Lee 2016-10-07
				 */
				moPage.onLoadImportDone_ImpTitle = function() {		
					doHeaderOnLoad();
				};
				
				/**
				 * @desc 온로드 실행
				 * @param 
				 * @return 
				 * @author Aeyoung Lee 2016-10-07
				 */
				moPage.onModelConstructDone_ExtCrsCDivEtcPaySeqChg = function() {
					
					//strCommand: onLoad 
					util.Submit.send(app, "subOnLoad", function(pbSuccess){		
						if(pbSuccess) {	
							util.Control.redraw(app, ["cbbSchYear","cbbSmt"]);
							
							util.Control.setValue(app, "rdbProcDiv", "1");
						}
					});
				};
				
				/**
				 * @desc 실행버튼 클릭 이벤트
				 * @param 
				 * @return 
				 * @author Aeyoung Lee 2016-10-07
				 */
				moPage.onClick_BtnSaveRun = function() { 
					
					util.Msg.notify(app, "null");	
					
					if(!util.validate(app, ["cbbSchYear", "cbbSmt", "rdbProcDiv"])) return;
					
					var vsSchYearSelIdx = util.SelectCtl.getSelectedIndex(app, "cbbSchYear");
					var vsSmtSelIdx = util.SelectCtl.getSelectedIndex(app, "cbbSmt");
					
					// 2016.10.14 배치처리전 커버페이지 씌우는 로직추가
					util.coverPage(app);
					
					//strCommand: run 
					util.Submit.send(app, "subRun", function(pbSuccessRun){
						if(pbSuccessRun){
							//산출결과를 요약하여 뿌려줌
							var vnRltCnt = Number(util.DataMap.getValue(app, "dmResList", "strRltStudCnt"));
							
							if(vnRltCnt <= 0){
								// 대상 자료가 없습니다.
								util.Msg.notify(app, "NLS.CRS.M107");
								util.Msg.alert("NLS-CRS-M107");	
								
							}else{
								// @건 처리되었습니다.
								util.Msg.notify(app, "NLS.CRS.M108", [vnRltCnt]);
								util.Msg.alert("NLS-CRS-M108", [vnRltCnt]);	
							}
							
						}	
						
						util.removeCover(app);
					}); 	
				};
				
				return moPage;
			};;
			// End - User Script
			
			// Header
			var dataSet_1 = new cpr.data.DataSet("dsListSmt");
			dataSet_1.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_1);
			
			var dataSet_2 = new cpr.data.DataSet("dsListYear");
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
						"name": "YEAR",
						"dataType": "string"
					},
					{
						"name": "SMT",
						"dataType": "string"
					},
					{
						"name": "strProcDiv",
						"dataType": "string"
					}
				]
			});
			app.register(dataMap_1);
			
			var dataMap_2 = new cpr.data.DataMap("dmResList");
			dataMap_2.parseData({
				"columns" : [{
					"name": "strRltStudCnt",
					"dataType": "string"
				}]
			});
			app.register(dataMap_2);
			var submission_1 = new cpr.protocols.Submission("subOnLoad");
			submission_1.action = "/crs/ExtCrsDivEtcPaySeqChg/";
			submission_1.mediaType = "application/x-www-form-urlencoded";
			submission_1.addResponseData(dataSet_2, false);
			submission_1.addResponseData(dataSet_1, false);
			submission_1.addResponseData(dataMap_1, false);
			app.register(submission_1);
			
			var submission_2 = new cpr.protocols.Submission("subRun");
			submission_2.action = "/crs/ExtCrsDivEtcPaySeqChg/";
			submission_2.mediaType = "application/x-www-form-urlencoded";
			submission_2.addRequestData(dataMap_1);
			submission_2.addResponseData(dataMap_2, false);
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
			
			var button_1 = new cpr.controls.Button("btnSaveRun");
			button_1.value = "";
			button_1.style.setClasses(["btn-save"]);
			button_1.bind("value").toLanguage("UI-GLS-EXEC");
			if(typeof onBtnSaveRunClick == "function") {
				button_1.addEventListener("click", onBtnSaveRunClick);
			}
			container.addChild(button_1, {
				"top": "35px",
				"left": "1170px",
				"width": "60px",
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
				var output_1 = new cpr.controls.Output("optSchYear");
				output_1.value = "";
				output_1.style.setClasses(["require"]);
				output_1.bind("value").toLanguage("UI-GLS-SCH_YEAR");
				container.addChild(output_1, {
					"top": "5px",
					"left": "5px",
					"width": "100px",
					"height": "25px"
				});
				var output_2 = new cpr.controls.Output("optSmt");
				output_2.value = "";
				output_2.style.setClasses(["require"]);
				output_2.bind("value").toLanguage("UI-GLS-SMT");
				container.addChild(output_2, {
					"top": "5px",
					"left": "270px",
					"width": "100px",
					"height": "25px"
				});
				var comboBox_1 = new cpr.controls.ComboBox("cbbSchYear");
				comboBox_1.userAttr({"require": "Y"});
				comboBox_1.bind("fieldLabel").toExpression("#optSchYear.value");
				comboBox_1.bind("value").toDataMap(app.lookup("dmReqKey"), "YEAR");
				(function(comboBox_1){
					comboBox_1.setItemSet(app.lookup("dsListYear"), {
						"label": "CD_NM",
						"value": "CD"
					});
				})(comboBox_1);
				container.addChild(comboBox_1, {
					"top": "5px",
					"left": "110px",
					"width": "150px",
					"height": "25px"
				});
				var comboBox_2 = new cpr.controls.ComboBox("cbbSmt");
				comboBox_2.userAttr({"require": "Y"});
				comboBox_2.bind("fieldLabel").toExpression("#optSmt.value");
				comboBox_2.bind("value").toDataMap(app.lookup("dmReqKey"), "SMT");
				(function(comboBox_2){
					comboBox_2.setItemSet(app.lookup("dsListSmt"), {
						"label": "CD_NM",
						"value": "CD"
					});
				})(comboBox_2);
				container.addChild(comboBox_2, {
					"top": "5px",
					"left": "375px",
					"width": "150px",
					"height": "25px"
				});
				var output_3 = new cpr.controls.Output("optProcDiv");
				output_3.value = "";
				output_3.style.setClasses(["require"]);
				output_3.bind("value").toLanguage("UI-DB-PROCDIV");
				container.addChild(output_3, {
					"top": "30px",
					"left": "5px",
					"width": "100px",
					"height": "25px"
				});
				var radioButton_1 = new cpr.controls.RadioButton("rdbProcDiv");
				radioButton_1.userAttr({"require": "Y"});
				radioButton_1.bind("fieldLabel").toExpression("#optProcDiv.value");
				radioButton_1.bind("value").toDataMap(app.lookup("dmReqKey"), "strProcDiv");
				(function(radioButton_1){
					radioButton_1.addItem(new cpr.controls.Item("1차 → 2차", "1"));
					radioButton_1.addItem(new cpr.controls.Item("2차 → 3차", "2"));
					radioButton_1.addItem(new cpr.controls.Item("3차 → 4차", "3"));
				})(radioButton_1);
				container.addChild(radioButton_1, {
					"top": "30px",
					"left": "110px",
					"width": "415px",
					"height": "25px"
				});
			})(group_1);
			container.addChild(group_1, {
				"top": "60px",
				"left": "5px",
				"width": "1225px",
				"height": "57px"
			});
			
			var embeddedApp_1 = new cpr.controls.EmbeddedApp("emaStdCsrPStSearch");
			cpr.core.App.load("app/csr/impStdCsrPStSearch", function(app) {
				if(app){
					embeddedApp_1.app = app;
				}
			});
			container.addChild(embeddedApp_1, {
				"top": "654px",
				"left": "5px",
				"width": "100px",
				"height": "25px"
			});
			if(typeof onBodyLoad == "function"){
				app.addEventListener("load", onBodyLoad);
			}
		}
	});
	app.title = "분납자 자율경비 미납자료 차수변경";
	cpr.core.Platform.INSTANCE.register(app);
})();
