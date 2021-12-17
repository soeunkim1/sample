/*
 * App URI: app/csr/extCsrSNewEarlyRemoStatPrt
 * Source Location: app/csr/extCsrSNewEarlyRemoStatPrt.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("app/csr/extCsrSNewEarlyRemoStatPrt", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			﻿//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
			/// <xtmlink path="./extCsrSNewEarlyRemoStatPrt.xtm"/>
			
			
			var extCsrSNewEarlyRemoStatPrt = function() {
				var moPage = new Page();
				/**
				 * 임포트 초기화
				 * @member moPage
				 * @type void
				 * @author hyunteak at 16. 11. 3 오후 2:14
				 */
				moPage.onLoadImportDone_ImpTitle = function() {
					doHeaderOnLoad();
				}
				
				/**
				 * 온로드
				 * @member moPage
				 * @type void
				 * @author hyunteak at 16. 11. 3 오후 2:14
				 */
				moPage.onModelConstructDone_ExtCsrSNewEarlyRemoStatPrt = function() {
					// 조회조건 초기 설정
			//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
			//		ExtGroup.initSearchBox("grpSearch",["grp_rptCsrShreg"]);
					
					//서브미션 실행 (실패시 cover page)
					//strCommand: onLoad 
					util.Submit.send(app, "subOnLoad", function(pbSuccess){
						if(pbSuccess){
							util.Control.setValue(app, "cbbCapIoDivRcd","CT51301");
							// 조회조건 초기화
							util.Control.redraw(app, ["cbbYearRcd","cbbCapIoDivRcd"]);
							doGetKeyDate();
							// 시작일자 포커스
							util.Control.setFocus(app, "ipbStDt");				
						}
					});
				};
				/**
				 * 학년도 변경시 제적 시작 종료일자 셋팅
				 * @member moPage
				 * @type void
				 * @author hyunteak at 16. 11. 3 오후 2:15
				 */
				moPage.onValueChanged_CbbYearRcd = function() {
					//제적 시작 종료일자 셋팅
					doGetKeyDate();
				}
				/**
				 * 제적 시작 종료일자 셋팅
				 * @member moPage
				 * @type void
				 * @author hyunteak at 16. 11. 3 오후 2:15
				 */
				function doGetKeyDate() {
				
					//strCommand: getKeyDate 
					util.Submit.send(app, "subGetKeyDate", function(pbSuccess) {
			
						if (pbSuccess) {
							util.DataMap.setValue(app, "dmReqList", "strPrevStDt", util.DataMap.getValue(app, "dmResGetKeyDate", "strPrevStDt"));
							util.DataMap.setValue(app, "dmReqList", "strPrevEndDt", util.DataMap.getValue(app, "dmResGetKeyDate", "strPrevEndDt"));
							util.DataMap.setValue(app, "dmReqList", "strStDt", util.DataMap.getValue(app, "dmResGetKeyDate", "strStDt"));
							util.DataMap.setValue(app, "dmReqList", "strEndDt", util.DataMap.getValue(app, "dmResGetKeyDate", "strEndDt"));
			
						}else{
							util.DataMap.setValue(app, "dmReqList", "strStDt","");
							util.DataMap.setValue(app, "dmReqList", "strEndDt", "");
							
						}
						util.Control.redraw(app, ["ipbStDt","ipbEndDt","ipbPrevStDt","ipbPrevEndDt"]);
					});
				};
				/**
				 * 조회버튼 클릭
				 * @member moPage
				 * @type Boolean
				 * @return 
				 * @author hyunteak at 16. 11. 3 오후 2:15
				 */
				moPage.onClick_BtnSearch = function() {
					// 조회조건 필수 체크
					if(!util.validate(app, ["cbbYearRcd", "ipbStDt","ipbEndDt"])){
						return false;
					}
					//조회
					doList();
				}
				/**
				 * 조회
				 * @member moPage
				 * @param {?} poCallBackFunc
				 * @type void
				 * @author hyunteak at 16. 11. 3 오후 2:16
				 */
				function doList(poCallBackFunc) {
							
					// submission call 
					//strCommand: list 
					util.Submit.send(app, "subList",  function(pbSuccess) {
						if(pbSuccess){
							var vsSchYearRcd = util.DataMap.getValue(app, "dmReqList", "strSchYearRcd");
							var vsSchYear = vsSchYearRcd.replace("CA006","");
							var vsPrevYear = Number(vsSchYear)-1;
							var vsSchYearNm = util.SelectCtl.getLabel(app, "cbbYearRcd", util.SelectCtl.getSelectedIndex(app, "cbbYearRcd"));
							var vsCapIoDivNm = util.SelectCtl.getLabel(app, "cbbCapIoDivRcd", util.SelectCtl.getSelectedIndex(app, "cbbCapIoDivRcd"));
							var vsSchTitle = "학년도 : " + vsSchYearNm;
							
							//리퀘스트 셋팅
							var voParam = {
										p_strPrevStDt              : util.DataMap.getValue(app, "dmReqList", "strPrevStDt"),
										p_strPrevEndDt              : util.DataMap.getValue(app, "dmReqList", "strPrevEndDt"),
										p_strStDt              : util.DataMap.getValue(app, "dmReqList", "strStDt"),
										p_strEndDt              : util.DataMap.getValue(app, "dmReqList", "strEndDt"),
										
										p_strSchYearRcd        : util.DataMap.getValue(app, "dmReqList", "strSchYearRcd"),
										p_strSchYearNm         : vsSchYearNm,
										
										p_strCapIoDivRcd        : util.DataMap.getValue(app, "dmReqList", "strCapIoDivRcd"),
										p_strCapIoDivNm        : vsCapIoDivNm,
										
										p_strLanDivRcd           : msDefaultLocale,
										p_strSchTitle               : vsSchTitle
									}	
									
							var vsTitle =vsPrevYear+ "~"+vsSchYearNm + " " + " 신입생 조기 탈락률 통계(1/2선)";  
			
							 var voOzFormParam = {
									  TITLE :  vsTitle  //리포트타이틀
									, SUB_TITLE : "" //리포트서브타이틀
									, FORM_TYPE : "flash"
								};	
									
							util.Report.open(app, "hojReport", "extCsrSNewEarlyRemoStatPrt", voOzFormParam, voParam);
					
						}
						if(util.isFunc(poCallBackFunc)) poFunc(pbSuccess);
					});
				}
				return moPage;
			};;
			// End - User Script
			
			// Header
			var dataSet_1 = new cpr.data.DataSet("dsSchYearRcdList");
			dataSet_1.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"},
					{"name": "CD_PRP3"}
				],
				"rows": []
			});
			app.register(dataSet_1);
			
			var dataSet_2 = new cpr.data.DataSet("dsSmtRcdList");
			dataSet_2.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_2);
			
			var dataSet_3 = new cpr.data.DataSet("dsCapIoDivRcdList");
			dataSet_3.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_3);
			var dataMap_1 = new cpr.data.DataMap("dmReqList");
			dataMap_1.parseData({
				"columns" : [
					{
						"name": "strSchYearRcd",
						"dataType": "string"
					},
					{
						"name": "strStDt",
						"dataType": "string"
					},
					{
						"name": "strEndDt",
						"dataType": "string"
					},
					{
						"name": "strCapIoDivRcd",
						"dataType": "string"
					},
					{
						"name": "strPrevEndDt",
						"dataType": "string"
					},
					{
						"name": "strPrevStDt",
						"dataType": "string"
					}
				]
			});
			app.register(dataMap_1);
			
			var dataMap_2 = new cpr.data.DataMap("dmResOnLoad");
			dataMap_2.parseData({
				"columns" : [
					{
						"name": "strKeyDate",
						"dataType": "string"
					},
					{
						"name": "strEndDate",
						"dataType": "string"
					}
				]
			});
			app.register(dataMap_2);
			
			var dataMap_3 = new cpr.data.DataMap("dmResGetKeyDate");
			dataMap_3.parseData({
				"columns" : [
					{
						"name": "strStDt",
						"dataType": "string"
					},
					{
						"name": "strEndDt",
						"dataType": "string"
					},
					{
						"name": "strPrevStDt",
						"dataType": "string"
					},
					{
						"name": "strPrevEndDt",
						"dataType": "string"
					}
				]
			});
			app.register(dataMap_3);
			
			var dataMap_4 = new cpr.data.DataMap("dmResList");
			dataMap_4.parseData({
				"columns" : [{
					"name": "strSaList",
					"dataType": "string"
				}]
			});
			app.register(dataMap_4);
			var submission_1 = new cpr.protocols.Submission("subOnLoad");
			submission_1.action = "/csr/ExtCsrNewEarlyRemoStatPrt/";
			submission_1.mediaType = "application/x-www-form-urlencoded";
			submission_1.addResponseData(dataSet_1, false);
			submission_1.addResponseData(dataSet_2, false);
			submission_1.addResponseData(dataMap_2, false);
			submission_1.addResponseData(dataSet_3, false);
			submission_1.addResponseData(dataMap_1, false);
			app.register(submission_1);
			
			var submission_2 = new cpr.protocols.Submission("subGetKeyDate");
			submission_2.action = "/csr/ExtCsrNewEarlyRemoStatPrt/";
			submission_2.mediaType = "application/x-www-form-urlencoded";
			submission_2.addRequestData(dataMap_1);
			submission_2.addResponseData(dataMap_3, false);
			app.register(submission_2);
			
			var submission_3 = new cpr.protocols.Submission("subList");
			submission_3.action = "/csr/ExtCsrNewEarlyRemoStatPrt/";
			submission_3.mediaType = "application/x-www-form-urlencoded";
			submission_3.addRequestData(dataMap_1);
			submission_3.addResponseData(dataMap_4, false);
			submission_3.addResponseData(dataMap_1, false);
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
				var output_1 = new cpr.controls.Output("optYearRcd");
				output_1.value = "";
				output_1.style.setClasses(["require"]);
				output_1.bind("value").toLanguage("UI-GLS-SCH_YEAR");
				container.addChild(output_1, {
					"top": "5px",
					"left": "5px",
					"width": "80px",
					"height": "25px"
				});
				var comboBox_1 = new cpr.controls.ComboBox("cbbYearRcd");
				comboBox_1.userAttr({"require": "Y"});
				comboBox_1.bind("fieldLabel").toExpression("#optYearRcd.value");
				comboBox_1.bind("value").toDataMap(app.lookup("dmReqList"), "strSchYearRcd");
				(function(comboBox_1){
					comboBox_1.setItemSet(app.lookup("dsSchYearRcdList"), {
						"label": "CD_NM",
						"value": "CD"
					});
				})(comboBox_1);
				if(typeof onCbbYearRcdSelectionChange == "function") {
					comboBox_1.addEventListener("selection-change", onCbbYearRcdSelectionChange);
				}
				container.addChild(comboBox_1, {
					"top": "5px",
					"left": "90px",
					"width": "90px",
					"height": "25px"
				});
				var output_2 = new cpr.controls.Output("optAltEndDt");
				output_2.value = "";
				output_2.bind("value").toLanguage("UI-GLS-GENDER");
				container.addChild(output_2, {
					"top": "9px",
					"left": "245px",
					"width": "10px",
					"height": "16px"
				});
				var output_3 = new cpr.controls.Output("optAltStDt");
				output_3.value = "";
				output_3.bind("value").toLanguage("UI-GLS-GENDER");
				container.addChild(output_3, {
					"top": "5px",
					"left": "220px",
					"width": "10px",
					"height": "25px"
				});
				var output_4 = new cpr.controls.Output("optAltDt");
				output_4.value = "";
				output_4.style.setClasses(["require"]);
				output_4.bind("value").toLanguage("UI-DB-ALT_DT");
				container.addChild(output_4, {
					"top": "5px",
					"left": "190px",
					"width": "200",
					"height": "25px"
				});
				var dateInput_1 = new cpr.controls.DateInput("ipbPrevStDt");
				dateInput_1.userAttr({"require": "Y"});
				dateInput_1.bind("fieldLabel").toExpression("#optAltStDt.value");
				dateInput_1.bind("value").toDataMap(app.lookup("dmReqList"), "strPrevStDt");
				container.addChild(dateInput_1, {
					"top": "5px",
					"left": "395px",
					"width": "90px",
					"height": "25px"
				});
				var output_5 = new cpr.controls.Output("opt");
				output_5.value = "~";
				container.addChild(output_5, {
					"top": "5px",
					"left": "485px",
					"width": "15px",
					"height": "25px"
				});
				var dateInput_2 = new cpr.controls.DateInput("ipbPrevEndDt");
				dateInput_2.bind("fieldLabel").toExpression("#optAltEndDt.value");
				dateInput_2.bind("value").toDataMap(app.lookup("dmReqList"), "strPrevEndDt");
				container.addChild(dateInput_2, {
					"top": "5px",
					"left": "500px",
					"width": "90px",
					"height": "25px"
				});
				var output_6 = new cpr.controls.Output("optCapIoDivRcd");
				output_6.value = "";
				output_6.style.setClasses(["require"]);
				output_6.bind("value").toLanguage("UI-SCR-CAPACITY");
				container.addChild(output_6, {
					"top": "5px",
					"left": "810px",
					"width": "80px",
					"height": "25px"
				});
				var comboBox_2 = new cpr.controls.ComboBox("cbbCapIoDivRcd");
				comboBox_2.userAttr({"require": "Y"});
				comboBox_2.bind("fieldLabel").toExpression("#optCapIoDivRcd.value");
				comboBox_2.bind("value").toDataMap(app.lookup("dmReqList"), "strCapIoDivRcd");
				(function(comboBox_2){
					comboBox_2.setItemSet(app.lookup("dsCapIoDivRcdList"), {
						"label": "CD_NM",
						"value": "CD"
					});
				})(comboBox_2);
				container.addChild(comboBox_2, {
					"top": "5px",
					"left": "895px",
					"width": "115px",
					"height": "25px"
				});
				var output_7 = new cpr.controls.Output("opt1");
				output_7.value = ",";
				container.addChild(output_7, {
					"top": "5px",
					"left": "590",
					"width": "15px",
					"height": "25px"
				});
				var dateInput_3 = new cpr.controls.DateInput("ipbStDt");
				dateInput_3.userAttr({"require": "Y"});
				dateInput_3.bind("fieldLabel").toExpression("#optAltStDt.value");
				dateInput_3.bind("value").toDataMap(app.lookup("dmReqList"), "strStDt");
				container.addChild(dateInput_3, {
					"top": "5px",
					"left": "605px",
					"width": "90px",
					"height": "25px"
				});
				var output_8 = new cpr.controls.Output("opt2");
				output_8.value = "~";
				container.addChild(output_8, {
					"top": "5px",
					"left": "695px",
					"width": "15px",
					"height": "25px"
				});
				var dateInput_4 = new cpr.controls.DateInput("ipbEndDt");
				dateInput_4.bind("fieldLabel").toExpression("#optAltEndDt.value");
				dateInput_4.bind("value").toDataMap(app.lookup("dmReqList"), "strEndDt");
				container.addChild(dateInput_4, {
					"top": "5px",
					"left": "710px",
					"width": "90px",
					"height": "25px"
				});
			})(group_1);
			container.addChild(group_1, {
				"top": "35px",
				"left": "5px",
				"width": "1225px",
				"height": "32px"
			});
			
			var group_2 = new cpr.controls.Container("grp_rptCsrShreg");
			// Layout
			var xYLayout_3 = new cpr.controls.layouts.XYLayout();
			group_2.setLayout(xYLayout_3);
			(function(container){
				var hTMLObject_1 = new cpr.controls.HTMLObject("hojReport");
				container.addChild(hTMLObject_1, {
					"top": "5px",
					"left": "5px",
					"width": "1215px",
					"height": "588px"
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
		}
	});
	app.title = "extCsrSNewEarlyRemoStatPrt";
	cpr.core.Platform.INSTANCE.register(app);
})();
