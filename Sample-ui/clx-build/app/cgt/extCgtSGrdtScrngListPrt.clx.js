/*
 * App URI: app/cgt/extCgtSGrdtScrngListPrt
 * Source Location: app/cgt/extCgtSGrdtScrngListPrt.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("app/cgt/extCgtSGrdtScrngListPrt", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			﻿//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
			/// <xtmlink path="./extCgtSGrdtScrngListPrt.xtm"/>
			
			
			var extCgtSGrdtScrngListPrt = function() {
				var moPage = new Page();
				var moPObject = new PObject();
				
				/* 
				 * 객체 검색팝업 관련 설정사항
				 */
				moPObject.moIdsForStdCmnPObjSch = [
				{
					controlId 	: "btnDeptNmPop",
					iCd 		: "",
					iNm 		: "ipbDeptNm",
					iObjDivRcd 	: ["CC009OG","CC009SA"],
					iLanDivRcd 	: "",
					iKeyDate 	: "",
					oObjDivRcd 	: "/root/reqKey/strDeptObjDivRcd",
					oCd 		: "/root/reqKey/strDeptCd",
					oCdNm 		: "ipbDeptNm",
					oStDt 		: "",
					oEndDt 		: "",
					oLanDivRcd 	: "",
					func 		: ""
				}
				];
				
				/**
				 * @desc Header Import onLoad
				 * @return void
				 * @author 유형기 at 2016. 7. 11.
				 */
				moPage.onLoadImportDone_ImpTitle = function() {
					doHeaderOnLoad();
				};
				
				/**
				 * @desc 온로드
				 * @return void
				 * @author 유형기 at 2016. 7. 11.
				 */
				moPage.onModelConstructDone_ExtCgtSGrdtScrngListPrt = function() {
					//검색조건 초기 설정
			//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
			//		ExtGroup.initSearchBox("grpSearch",["grpData"]);
					
					//졸업학년도학기 임포트
					doOnLoadImpCgtSch(function(pbSuccess){
						if(pbSuccess){
							//strCommand: onLoad 
							util.Submit.send(app, "subOnload", function(pbSuccess){
								util.Control.redraw(app, ["cbbResDivList"]);
							});	
						}
					});
					
				};
				
				/**
				 * @desc 팝업호출시 기준일자 셋팅
				 * @param 
				 * @return 
				 * @author 유형기 at 2016. 7. 11.
				 */
				function doSetPopKeyDate() {
					var vsKeyDate = ExtInstance.getValue("instance('impExtCgtSch')/root/reqKey/strKeyDate").substr(0,8);
					moPObject.moIdsForStdCmnPObjSch[0].iKeyDate = vsKeyDate;
				};
				
				/**
				 * @desc 학과 팝업 클릭 이벤트
				 * @param 
				 * @return 
				 * @author 유형기 at 2016. 7. 11.
				 */
				moPage.onClick_BtnDeptNmPop = function(sender) {
					doSetPopKeyDate();
					doOnClickStdCmnPObjSch(sender);
				};
				
				/**
				 * @desc 학과명 변경 이벤트
				 * @param 
				 * @return 
				 * @author 유형기 at 2016. 7. 11.
				 */
				moPage.onValueChanged_IpbDeptNm = function(sender) {
					doSetPopKeyDate();
					doOnChangeStdCmnPObjSch(sender);
				};
				
				/**
				 * @desc 졸업학년도/졸업학기 변경시 학과 초기화
				 * @param 
				 * @return 
				 * @author 유형기 at 2016. 7. 11.
				 */
				function doSetKeyDateYearSmtImp(){
					// 2017.01.10 초기화로직 주석	
			//		ExtControl.reset(["ipbDeptNm"]);
			//		ExtInstance.setValue("/root/reqKey/strDeptCd", "");
			//		ExtInstance.setValue("/root/reqKey/strDeptObjDivRcd", "");
				};
				
				/**
				 * @desc 조회조건 수행
				 * @param
				 * @@return 
				 * @author 유형기 at 2016. 7. 11.
				 */
				moPage.onClick_BtnSearch = function() {
					//1.조회조건 필수 체크(학년도)
					if(!util.validate(app, ["cbbSchYearImpCgt", "cbbSmtImpCgt"])) return;
					
					//strCommand: list 
					util.Submit.send(app, "subList", function(pbSuccess){
						if(pbSuccess){
							
							var vsSchYearSelIdx = util.SelectCtl.getSelectedIndex(app, "cbbSchYearImpCgt");
							var vsSmtSelIdx = util.SelectCtl.getSelectedIndex(app, "cbbSmtImpCgt");
						    var vsYearSmtTitle = util.SelectCtl.getLabel(app, "cbbSchYearImpCgt", vsSchYearSelIdx) + " " + util.SelectCtl.getLabel(app, "cbbSmtImpCgt", vsSmtSelIdx) + " 졸업사정표";	
							
							//리퀘스트 셋팅
							var voParam = {
										p_strSchYearRcd : ExtInstance.getValue("instance('impExtCgtSch')/root/reqKey/strCgtSchYearRcd")					// 학년도
									  , p_strSmtRcd : ExtInstance.getValue("instance('impExtCgtSch')/root/reqKey/strCgtSmtRcd") 						// 학기
									  , p_strSaCd : util.DataMap.getValue(app, "dmResList", "strSaList") 													// in 조건 학사부서
									  , p_strKeyDate : ExtInstance.getValue("instance('impExtCgtSch')/root/reqKey/strKeyDate") 							// 기준일자
									  , p_strLandivRcd : msDefaultLocale																				// 언어
									  , p_strResDivCd : util.DataMap.getValue(app, "dmReqKey", "strResDivCd")												// 결과구분
									}	
							
							 var voOzFormParam = {
										  TITLE :  vsYearSmtTitle     //리포트타이틀
										, SUB_TITLE : "" 		         //리포트서브타이틀		
										, FORM_TYPE : "flash"
										};	
										
							util.Report.open(app, "hojReport", "extCgtSGrdtScrngListPrt", voOzFormParam, voParam);
							
						}
					});
				};
				
				
				return moPage;
			};;
			// End - User Script
			
			// Header
			var dataSet_1 = new cpr.data.DataSet("dsResDivList");
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
				"columns" : [
					{
						"name": "strDeptCd",
						"dataType": "string"
					},
					{
						"name": "strDeptObjDivRcd",
						"dataType": "string"
					},
					{
						"name": "strDeptNm",
						"dataType": "string"
					},
					{
						"name": "strResDivCd",
						"dataType": "string"
					}
				]
			});
			app.register(dataMap_1);
			
			var dataMap_2 = new cpr.data.DataMap("dmResList");
			dataMap_2.parseData({
				"columns" : [{
					"name": "strSaList",
					"dataType": "string"
				}]
			});
			app.register(dataMap_2);
			var submission_1 = new cpr.protocols.Submission("subOnload");
			submission_1.action = "/cgt/ExtCgtGrdtScrngListPrt/";
			submission_1.mediaType = "application/x-www-form-urlencoded";
			submission_1.addRequestData(dataMap_1);
			submission_1.addResponseData(dataSet_1, false);
			app.register(submission_1);
			
			var submission_2 = new cpr.protocols.Submission("subList");
			submission_2.action = "/cgt/ExtCgtGrdtScrngListPrt/";
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
				cpr.core.App.load("app/cgt/impExtCgtYearSmtDeptSch", function(app) {
					if(app){
						embeddedApp_1.app = app;
					}
				});
				container.addChild(embeddedApp_1, {
					"top": "5px",
					"left": "5px",
					"width": "440px",
					"height": "23px"
				});
				var output_1 = new cpr.controls.Output("optDeptNm");
				output_1.value = "";
				output_1.bind("value").toLanguage("UI-SCR-DEPT");
				container.addChild(output_1, {
					"top": "5px",
					"left": "455px",
					"width": "70px",
					"height": "25px"
				});
				var inputBox_1 = new cpr.controls.InputBox("ipbDeptNm");
				inputBox_1.maxLength = 100;
				inputBox_1.bind("fieldLabel").toExpression("#optDeptNm.value");
				inputBox_1.bind("value").toDataMap(app.lookup("dmReqKey"), "strDeptNm");
				if(typeof onIpbDeptNmValueChange == "function") {
					inputBox_1.addEventListener("value-change", onIpbDeptNmValueChange);
				}
				container.addChild(inputBox_1, {
					"top": "5px",
					"left": "530px",
					"width": "140px",
					"height": "25px"
				});
				var button_2 = new cpr.controls.Button("btnDeptNmPop");
				button_2.value = "";
				button_2.style.setClasses(["btn-pop-search"]);
				if(typeof onBtnDeptNmPopClick == "function") {
					button_2.addEventListener("click", onBtnDeptNmPopClick);
				}
				container.addChild(button_2, {
					"top": "5px",
					"left": "670px",
					"width": "20px",
					"height": "25px"
				});
				var output_2 = new cpr.controls.Output("optResDivList");
				output_2.value = "";
				output_2.bind("value").toLanguage("UI-SCR-GRADUYRS");
				container.addChild(output_2, {
					"top": "5px",
					"left": "700px",
					"width": "100px",
					"height": "25px"
				});
				var comboBox_1 = new cpr.controls.ComboBox("cbbResDivList");
				comboBox_1.bind("fieldLabel").toExpression("#optResDivList.value");
				comboBox_1.bind("value").toDataMap(app.lookup("dmReqKey"), "strResDivCd");
				(function(comboBox_1){
					comboBox_1.addItem(new cpr.controls.Item("전체", ""));
					comboBox_1.setItemSet(app.lookup("dsResDivList"), {
						"label": "CD_NM",
						"value": "CD"
					});
				})(comboBox_1);
				container.addChild(comboBox_1, {
					"top": "5px",
					"left": "805px",
					"width": "110px",
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
			
			var embeddedApp_2 = new cpr.controls.EmbeddedApp("emaStdCmnPobjSch");
			cpr.core.App.load("app/cmn/impStdCmnPObjSch", function(app) {
				if(app){
					embeddedApp_2.app = app;
				}
			});
			container.addChild(embeddedApp_2, {
				"top": "677px",
				"left": "5px",
				"width": "100px",
				"height": "25px"
			});
			if(typeof onBodyLoad == "function"){
				app.addEventListener("load", onBodyLoad);
			}
		}
	});
	app.title = "졸업사정표";
	cpr.core.Platform.INSTANCE.register(app);
})();
