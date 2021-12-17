/*
 * App URI: app/cmn/stdCmnSManualMgt
 * Source Location: app/cmn/stdCmnSManualMgt.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("app/cmn/stdCmnSManualMgt", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			﻿//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
			/// <xtmlink path="./stdCmnSManualMgt.xtm"/>
			
			
			var stdCmnSManualMgt = function() {
				var moPage = new Page();
				
				moPage.onLoadImportDone_ImpTitle = function() {
					doHeaderOnLoad();
				}
				
				
				/**
				 * @desc 조회버튼 클릭
				 * @param 
				 * @return void
				 * @author Kim jung Geun 2016. 6. 10
				 */
				moPage.onClick_BtnSearch = function() {
			
					doList();
				};
				
				/**
				 * @desc  온라인매뉴얼 출력
				 * @param 
				 * @return 
				 * @author Kim jung Geun 2016. 6. 10
				 */
				function doList(poCallBackFunc) {
			
					
					//1.조회조건 필수 체크(학년도)
					if(!util.validate(app, ["cbbUnitSystemRcd"])) return false;
			
					//리퀘스트 셋팅
					var voParam = {
								p_strUnitSystemRcd             : util.DataMap.getValue(app, "dmReqList", "strSystemRcd")
							,	p_strMenuId         : util.DataMap.getValue(app, "dmReqList", "strPgmIdNm")
							,  p_strDomain              : Common.getMainWindowUrl()
					};	
					
					var voOzFormParam = {
							  TITLE : "토마토대학교 차세대 통합정보시스템 구축" //리포트타이틀
							, SUB_TITLE :  util.SelectCtl.getLabel(app, "cbbUnitSystemRcd",util.SelectCtl.getSelectedIndex(app, "cbbUnitSystemRcd"))//리포트서브타이틀		
							, FORM_TYPE : "flash"
					};	
									
					util.Report.open(app, "hojReport", "stdCmnSManualMgt", voOzFormParam, voParam);
				}
				
				
				/**
				 * 온로드
				 * @member moPage
				 * @type void
				 * @author Kim jung Geun 2016. 6. 10
				 */
				function doOnLoad(){
					//검색조건 초기 설정
			//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
			//		ExtGroup.initSearchBox( "grpSearch","grp_rptExtCetListPrt");
			
					//서브미션 실행 (실패시 cover page)
					//strCommand: onLoad 
					util.Submit.send(app, "subOnLoad", function(pbSuccess){
			    
					if(pbSuccess)
					{	
							util.Control.redraw(app, ["cbbUnitSystemRcd"]);
							util.SelectCtl.selectItem(app, "cbbUnitSystemRcd", 0); // 시스템구분 첫번째 셋팅
							util.Control.setFocus(app, "ipbMenuId"); // 메뉴ID명 setFocus
					}
				}, true);
				}
				
				/* 온로드 */								
				moPage.onModelConstructDone_StdCmnSManualMgt = function() {
					doOnLoad();
				};
				return moPage;
			};;
			// End - User Script
			
			// Header
			var dataSet_1 = new cpr.data.DataSet("dsUnitSystemRcdList");
			dataSet_1.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_1);
			var dataMap_1 = new cpr.data.DataMap("dmReqList");
			dataMap_1.parseData({
				"columns" : [
					{
						"name": "strSystemRcd",
						"dataType": "string"
					},
					{
						"name": "strPgmIdNm",
						"dataType": "string"
					}
				]
			});
			app.register(dataMap_1);
			var submission_1 = new cpr.protocols.Submission("subOnLoad");
			submission_1.action = "/cmn/StdCmnSManualMgt/";
			submission_1.mediaType = "application/x-www-form-urlencoded";
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
				var output_1 = new cpr.controls.Output("optUnitSystemRcd");
				output_1.value = "";
				output_1.style.setClasses(["require"]);
				output_1.bind("value").toLanguage("UI-SCR-SYSTEMDIV");
				container.addChild(output_1, {
					"top": "5px",
					"left": "10px",
					"width": "100px",
					"height": "25px"
				});
				var comboBox_1 = new cpr.controls.ComboBox("cbbUnitSystemRcd");
				comboBox_1.userAttr({"require": "Y"});
				comboBox_1.bind("fieldLabel").toExpression("#optUnitSystemRcd.value");
				comboBox_1.bind("value").toDataMap(app.lookup("dmReqList"), "strSystemRcd");
				(function(comboBox_1){
					comboBox_1.setItemSet(app.lookup("dsUnitSystemRcdList"), {
						"label": "CD_NM",
						"value": "CD"
					});
				})(comboBox_1);
				container.addChild(comboBox_1, {
					"top": "5px",
					"left": "115px",
					"width": "130px",
					"height": "25px"
				});
				var output_2 = new cpr.controls.Output("optMenuId");
				output_2.value = "";
				output_2.bind("value").toLanguage("UI-DB-MENU_ID");
				container.addChild(output_2, {
					"top": "5px",
					"left": "255px",
					"width": "100px",
					"height": "25px"
				});
				var inputBox_1 = new cpr.controls.InputBox("ipbMenuId");
				inputBox_1.bind("value").toDataMap(app.lookup("dmReqList"), "strPgmIdNm");
				if(typeof onIpbMenuIdKeydown == "function") {
					inputBox_1.addEventListener("keydown", onIpbMenuIdKeydown);
				}
				container.addChild(inputBox_1, {
					"top": "5px",
					"left": "360px",
					"width": "260px",
					"height": "25px"
				});
			})(group_1);
			container.addChild(group_1, {
				"top": "35px",
				"left": "5px",
				"width": "1225px",
				"height": "32px"
			});
			
			var group_2 = new cpr.controls.Container("grp_rptExtCetListPrt");
			// Layout
			var xYLayout_3 = new cpr.controls.layouts.XYLayout();
			group_2.setLayout(xYLayout_3);
			(function(container){
				var hTMLObject_1 = new cpr.controls.HTMLObject("hojReport");
				container.addChild(hTMLObject_1, {
					"top": "5px",
					"left": "5px",
					"width": "1215px",
					"height": "586px"
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
	app.title = "Untitled";
	cpr.core.Platform.INSTANCE.register(app);
})();
