/*
 * App URI: app/ccs/extCcsSProfDupList
 * Source Location: app/ccs/extCcsSProfDupList.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("app/ccs/extCcsSProfDupList", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			﻿//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
			/// <xtmlink path="./extCcsSProfDupList.xtm"/>
			
			/**
			 * 교수별 시간표 중복 LIST
			 * @class extCcsSProfDupList
			 * @author 박갑수 at 2016. 7. 6
			 */
			var extCcsSProfDupList = function() {
				var moPage = new Page();
				
				// 학년도 ,학기, 출력순서를 원래데이터로 되돌리기위한 변수
				var msSchYearRcd = "";
				var msSmtRcd = "";
				
				/**
				 * @desc import 헤더 초기화
				 * @param 
				 * @return  void
				 * @author 박갑수 at 2016. 7. 6
				 */
				moPage.onLoadImportDone_ImpTitle = function() {
					doHeaderOnLoad();
				};
				
				/**
				 * @desc onLoad 실행
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 7. 6
				 */
				moPage.onModelConstructDone_ExtCcsSProfDupList = function() {
					// 검색조건 초기 설정
			//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
			//		ExtGroup.initSearchBox("grpSearch", ["grpData"]);
					
					// 서브미션 실행 (실패시 cover page)
					//strCommand: onLoad 
					util.Submit.send(app, "subOnLoad", function(pbSuccess){
						if(pbSuccess){
							
							// 조회조건 컨트롤 refresh(학년도, 학기)
							util.Control.redraw(app, ["cbbSchYearRcd", "cbbSmtRcd"]);
						}
					}, true);
				};
				
				/**
				 * @desc [cbbSchYearRcd]학년도 onValueChanged 이벤트
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 7. 9
				 */
				moPage.onValueChanged_CbbSchYearRcd = function() {
					// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
					doChangeYearSmt("year");
				};
				
				/**
				 * @desc [cbbSmtRcd]학기 onValueChanged 이벤트
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 7. 9
				 */
				moPage.onValueChanged_CbbSmtRcd = function() {
					// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
					doChangeYearSmt("smt");
				};
				
				/**
				 * @desc 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 7. 9
				 */
				function doChangeYearSmt(psDiv) {
					//strCommand: date 
					util.Submit.send(app, "subDate", function(pbSuccess){
						if(pbSuccess){				
							msSchYearRcd = util.DataMap.getValue(app, "dmKeyDateMap", "YEAR");
							msSmtRcd = util.DataMap.getValue(app, "dmKeyDateMap", "SMT");
							
						// Exception 발생시
						}else {
							if(psDiv == "year"){
								util.Control.setValue(app, "cbbSchYearRcd", msSchYearRcd);
							}else if(psDiv == "smt"){
								util.Control.setValue(app, "cbbSmtRcd", msSmtRcd);
							}
						}
					});
				};
				
				/**
				 * @desc [btnSearch]조회 onClick 이벤트
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 7. 9
				 */
				moPage.onClick_BtnSearch = function() {
					// 조회조건 필수 체크
					if(!util.validate(app, ["cbbSchYearRcd", "cbbSmtRcd"])){
						return false;
					}
			
					var vsSchYearRcd = util.Control.getValue(app, "cbbSchYearRcd");
					var vsSmtRcd = util.Control.getValue(app, "cbbSmtRcd");
			
					var voParam = {
							p_strLanDivRcd 		: util.DataMap.getValue(app, "dmResOnLoad", "strLanDivRcd"),	// 언어키
							p_strKeyDate 		: util.DataMap.getValue(app, "dmKeyDateMap", "END_DT"),		// 기준일자
							p_strSchYearRcd 	: vsSchYearRcd,															// 학년도코드
							p_strSmtRcd 			: vsSmtRcd,																	// 학기코드
							p_strCheckAuthId 	: moUserInfo.id																// 사용자ID
					};
					
					var vsSchYearRcdNm = ExtInstance.getValue("/root/resOnLoad/schYearRcdList/row", "CD_NM" , "child::CD='"+ vsSchYearRcd +"'");
					var vsSmtRcdNm = ExtInstance.getValue("/root/resOnLoad/smtRcdList/row", "CD_NM" , "child::CD='"+ vsSmtRcd +"'");
					var vsTitle = vsSchYearRcdNm + " " + vsSmtRcdNm + " 교수별 중복시간 LIST";
					
					var voOzFormParam = {
						  TITLE 		 : vsTitle			// 리포트타이틀
						, SUB_TITLE 	 : "" 					// 리포트서브타이틀		
						, FORM_TYPE : "flash"
					};
					
					util.Report.open(app, "hojReport", "extCcsSProfDupList", voOzFormParam, voParam);
				};
				
				return moPage;
			};;
			// End - User Script
			
			// Header
			var dataSet_1 = new cpr.data.DataSet("dsSchYearRcdList");
			dataSet_1.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_1);
			
			var dataSet_2 = new cpr.data.DataSet("dsSmtRcdList");
			dataSet_2.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"},
					{"name": "CD_PRP1"}
				],
				"rows": []
			});
			app.register(dataSet_2);
			var dataMap_1 = new cpr.data.DataMap("dmResOnLoad");
			dataMap_1.parseData({
				"columns" : [{
					"name": "strLanDivRcd",
					"dataType": "string"
				}]
			});
			app.register(dataMap_1);
			
			var dataMap_2 = new cpr.data.DataMap("dmKeyDateMap");
			dataMap_2.parseData({
				"columns" : [
					{
						"name": "BEF_DT",
						"dataType": "string"
					},
					{
						"name": "YEAR",
						"dataType": "string"
					},
					{
						"name": "SMT",
						"dataType": "string"
					},
					{
						"name": "END_DT",
						"dataType": "string"
					},
					{
						"name": "ST_DT",
						"dataType": "string"
					}
				]
			});
			app.register(dataMap_2);
			var submission_1 = new cpr.protocols.Submission("subOnLoad");
			submission_1.action = "/ccs/ExtCcsProfDupList/";
			submission_1.mediaType = "application/x-www-form-urlencoded";
			submission_1.addResponseData(dataSet_2, false);
			submission_1.addResponseData(dataSet_1, false);
			submission_1.addResponseData(dataMap_2, false);
			submission_1.addResponseData(dataMap_1, false);
			app.register(submission_1);
			
			var submission_2 = new cpr.protocols.Submission("subDate");
			submission_2.action = "/cmn/StdCmnDateTime/";
			submission_2.mediaType = "application/x-www-form-urlencoded";
			submission_2.addRequestData(dataMap_2);
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
				var output_1 = new cpr.controls.Output("optSchYearRcd");
				output_1.value = "";
				output_1.style.setClasses(["require"]);
				output_1.bind("value").toLanguage("UI-GLS-SCH_YEAR");
				container.addChild(output_1, {
					"top": "5px",
					"left": "5px",
					"width": "80px",
					"height": "25px"
				});
				var comboBox_1 = new cpr.controls.ComboBox("cbbSchYearRcd");
				comboBox_1.userAttr({"require": "Y"});
				comboBox_1.bind("fieldLabel").toExpression("#optSchYearRcd.value");
				comboBox_1.bind("value").toDataMap(app.lookup("dmKeyDateMap"), "YEAR");
				(function(comboBox_1){
					comboBox_1.setItemSet(app.lookup("dsSchYearRcdList"), {
						"label": "CD_NM",
						"value": "CD"
					});
				})(comboBox_1);
				if(typeof onCbbSchYearRcdSelectionChange == "function") {
					comboBox_1.addEventListener("selection-change", onCbbSchYearRcdSelectionChange);
				}
				container.addChild(comboBox_1, {
					"top": "5px",
					"left": "90px",
					"width": "100px",
					"height": "25px"
				});
				var output_2 = new cpr.controls.Output("optSmtRcd");
				output_2.value = "";
				output_2.style.setClasses(["require"]);
				output_2.bind("value").toLanguage("UI-GLS-SMT");
				container.addChild(output_2, {
					"top": "5px",
					"left": "200px",
					"width": "80px",
					"height": "25px"
				});
				var comboBox_2 = new cpr.controls.ComboBox("cbbSmtRcd");
				comboBox_2.userAttr({"require": "Y"});
				comboBox_2.bind("fieldLabel").toExpression("#optSmtRcd.value");
				comboBox_2.bind("value").toDataMap(app.lookup("dmKeyDateMap"), "SMT");
				(function(comboBox_2){
					comboBox_2.setItemSet(app.lookup("dsSmtRcdList"), {
						"label": "CD_NM",
						"value": "CD"
					});
				})(comboBox_2);
				if(typeof onCbbSmtRcdSelectionChange == "function") {
					comboBox_2.addEventListener("selection-change", onCbbSmtRcdSelectionChange);
				}
				container.addChild(comboBox_2, {
					"top": "5px",
					"left": "285px",
					"width": "100px",
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
				var userDefinedControl_2 = new udc.com.comFormTitle();
				userDefinedControl_2.bind("title").toLanguage("UI-SCR-NCSLUMPLIST");
				container.addChild(userDefinedControl_2, {
					"top": "5px",
					"left": "5px",
					"width": "290px",
					"height": "25px"
				});
				var hTMLObject_1 = new cpr.controls.HTMLObject("hojReport");
				container.addChild(hTMLObject_1, {
					"top": "30px",
					"left": "5px",
					"width": "1215px",
					"height": "563px"
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
	app.title = "교수별 시간표 중복 LIST";
	cpr.core.Platform.INSTANCE.register(app);
})();
