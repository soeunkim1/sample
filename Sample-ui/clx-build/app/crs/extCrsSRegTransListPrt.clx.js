/*
 * App URI: app/crs/extCrsSRegTransListPrt
 * Source Location: app/crs/extCrsSRegTransListPrt.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("app/crs/extCrsSRegTransListPrt", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			﻿//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
			/// <xtmlink path="./extCrsSRegTransListPrt.xtm"/>
			
			
			var extCrsSRegTransListPrt = function() {
				var moPage = new Page();
				
				/**
				 * @desc Header Import onLoad
				 * @return void
				 * @author Aeyoung Lee at 2016. 10. 24.
				 */
				moPage.onLoadImportDone_ImpTitle = function() {
					doHeaderOnLoad();
				};
				
				/**
				 * @desc 온로드
				 * @return void
				 * @author Aeyoung Lee at 2016. 10. 24.
				 */
				moPage.onModelConstructDone_ExtCrsSRegTransListPrt = function() {
					//검색조건 초기 설정
			//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
			//		ExtGroup.initSearchBox("grpSearch",["grpData"]);
					
					//학년도학기 임포트
					doOnLoadImpNS("CRS");
				};
				
				/**
				 * 조회조건 수행
				 * @member moPage
				 * @type void
				 * @author Aeyoung Lee at 2016. 10. 24.
				 */
				moPage.onClick_BtnSearch = function() {
					//1.조회조건 필수 체크(학년도)
					if(!util.validate(app, ["cbbYearImpNS", "cbbSmtImpNS"])) return;
					
					var vsStDt = ExtInstance.getValue("instance('impCommonN')/root/date/ST_DT").substr(0,8);
					var vsEndDt = ExtInstance.getValue("instance('impCommonN')/root/date/END_DT").substr(0,8);
					
					util.DataMap.setValue(app, "dmReqKey", "strSchYearRcd", util.Control.getValue(app, "cbbYearImpNS"));
					util.DataMap.setValue(app, "dmReqKey", "strSmtRcd", util.Control.getValue(app, "cbbSmtImpNS"));
					util.DataMap.setValue(app, "dmReqKey", "strKeyDate", vsEndDt);
					
					//strCommand: list 
					util.Submit.send(app, "subList", function(pbSuccess){
						if(pbSuccess){
					
							var vsSchYearSelIdx = util.SelectCtl.getSelectedIndex(app, "cbbYearImpNS");
							var vsSmtSelIdx = util.SelectCtl.getSelectedIndex(app, "cbbSmtImpNS");
							util.DataMap.setValue(app, "dmReqKey", "strRptSubTitle", util.SelectCtl.getLabel(app, "cbbYearImpNS", vsSchYearSelIdx) + " " + util.SelectCtl.getLabel(app, "cbbSmtImpNS", vsSmtSelIdx));	
							
							//리퀘스트 셋팅
							var voParam = {
										p_strSchYearRcd : util.DataMap.getValue(app, "dmReqKey", "strSchYearRcd") 			// 학년도
									  , p_strSmtRcd : util.DataMap.getValue(app, "dmReqKey", "strSmtRcd") 					// 학기
									  , p_strSubTitle : util.DataMap.getValue(app, "dmReqKey", "strRptSubTitle")				// 학년도 학기명
									  , p_strCsrSmtRcd : util.DataMap.getValue(app, "dmResList", "strCsrSmtRcd")				// 학기(학적용)
									  , p_strKeyStDt : vsStDt 	// 해당학년도학기 시작일자
									  , p_strKeyEndDt : vsEndDt  // 해당학년도학기 종료일자
									  , p_strLanDivRcd : msDefaultLocale
									  , p_strPgmId : moPageInfo.pgmId
									  , p_strUserId : moUserInfo.userId
									}	
									
							 var voOzFormParam = {
										  TITLE : "등록이월 복학생 명단" //리포트타이틀
										, SUB_TITLE : "" 		//리포트서브타이틀		
										, FORM_TYPE : "flash"
										};	
										
							util.Report.open(app, "hojReport", "extCrsSRegTransListPrt", voOzFormParam, voParam);
						}
					});	
					
				};
					
				return moPage;
			};;
			// End - User Script
			
			// Header
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
						"name": "strKeyDate",
						"dataType": "string"
					},
					{
						"name": "strRptSubTitle",
						"dataType": "string"
					}
				]
			});
			app.register(dataMap_1);
			
			var dataMap_2 = new cpr.data.DataMap("dmResList");
			dataMap_2.parseData({
				"columns" : [{
					"name": "strCsrSmtRcd",
					"dataType": "string"
				}]
			});
			app.register(dataMap_2);
			var submission_1 = new cpr.protocols.Submission("subList");
			submission_1.action = "/crs/ExtCrsRegTransListPrt/";
			submission_1.mediaType = "application/x-www-form-urlencoded";
			submission_1.addRequestData(dataMap_1);
			submission_1.addResponseData(dataMap_2, false);
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
				var embeddedApp_1 = new cpr.controls.EmbeddedApp("emaYearSmt");
				cpr.core.App.load("app/crs/impCrsYearSmt", function(app) {
					if(app){
						embeddedApp_1.app = app;
					}
				});
				container.addChild(embeddedApp_1, {
					"top": "5px",
					"left": "5px",
					"width": "330px",
					"height": "23px"
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
	app.title = "등록이월복학생명단";
	cpr.core.Platform.INSTANCE.register(app);
})();