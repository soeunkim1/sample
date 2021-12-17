/*
 * App URI: app/css/extCssSWrkScalPmntListPrt
 * Source Location: app/css/extCssSWrkScalPmntListPrt.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("app/css/extCssSWrkScalPmntListPrt", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			﻿//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
			/// <xtmlink path="./extCssSWrkScalPmntListPrt.xtm"/>
			
			
			var extCssSWrkScalPmntListPrt = function() {
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
					oObjDivRcd 	: "ipbDeptObjDivRcd",
					oCd 		: "ipbDeptCd",
					oCdNm 		: "ipbDeptNm",
					oStDt 		: "",
					oEndDt 		: "",
					oLanDivRcd 	: "",
					func 		: ""
				}
				];
				
				/* 
				 * 장학금 검색팝업 관련 설정사항
				 */
				moPObject.moIdsForStdCssPScalFeeSch = [
				{
					controlId 		: "btnScalFeeNmPop",
					iCd 			: "",
					iNm 			: "ipbScalFeeNm",
					iObjDivRcd 		: "CC009SS",
					iLanDivRcd 		: "",
					iKeyDate		: "",
					iScalFeeCls1	: "",	
					iScalFeeCls2	: "",	
					iScalFeeCls3	: "",	
					iScalFeeCls4	: "",	
					iScalFeeCls5	: "",	
					iDeptCd 		: "",		
					iDeptObjDivRcd 	: "",	
					iMngDeptDiv		: "", 
					iWrkScalYn		: "Y",
					oScalFeeCd 		: "ipbScalFeeCd",
					oScalFeeNm 		: "ipbScalFeeNm",
					oObjDivRcd 		: "ipbSsObjDivRcd",
					oPmntDivRcd 	: "",
					oPmntItvRcd 	: "",
					func 			: null
				}
				];
				
				/**
				 * @desc Header Import onLoad
				 * @return void
				 * @author Aeyoung Lee at 2016. 6. 14.
				 */
				moPage.onLoadImportDone_ImpTitle = function() {
					doHeaderOnLoad();
				};
				
				/**
				 * @desc 온로드
				 * @return void
				 * @author Aeyoung Lee at 2016. 6. 14.
				 */
				moPage.onModelConstructDone_ExtCssSWrkScalPmntListPrt = function() {
					//검색조건 초기 설정
			//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
			//		ExtGroup.initSearchBox("grpSearch",["grpData"]);
					
					//학년도학기 임포트
					doOnLoadImpNS("CSS");
					
					// 서브미션 실행 (실패시 cover page)
					//strCommand: onLoad 
					util.Submit.send(app, "subOnLoad", function(pbSuccess){
						if(pbSuccess){
							util.Control.setValue(app, "dipPayDt", util.DataMap.getValue(app, "dmResOnload", "strSysDate").substring(0,6));
						}
					});
				};
				
				/**
				 * @desc 팝업호출시 기준일자 셋팅
				 * @param 
				 * @return 
				 * @author Aeyoung Lee at 2016. 6. 14.
				 */
				function doSetPopKeyDate() {
					var vsEndDt = ExtInstance.getValue("instance('impCommonN')/root/date/END_DT").substr(0,8);
					
					moPObject.moIdsForStdCmnPObjSch[0].iKeyDate = vsEndDt;
					moPObject.moIdsForStdCssPScalFeeSch[0].iKeyDate = vsEndDt;
				};
				
				/**
				 * @desc 장학금명 팝업 클릭 이벤트
				 * @param 
				 * @return 
				 * @author Aeyoung Lee at 2016. 6. 14.
				 */
				moPage.onClick_BtnScalFeeNmPop = function(sender) {
					doSetPopKeyDate();
					doOnClickStdCssPScalFeePop(sender);
				};
				
				/**
				 * @desc 장학금명 변경 이벤트
				 * @param 
				 * @return 
				 * @author Aeyoung Lee at 2016. 6. 14.
				 */
				moPage.onValueChanged_IpbScalFeeNm = function(sender) {
					doSetPopKeyDate();
					doOnChangeStdCssPScalFeePop(sender);
				};
				
				/**
				 * @desc 학과 팝업 클릭 이벤트
				 * @param 
				 * @return 
				 * @author Aeyoung Lee at 2016. 6. 14.
				 */
				moPage.onClick_BtnDeptNmPop = function(sender) {
					doSetPopKeyDate();
					doOnClickStdCmnPObjSch(sender);
				};
				
				/**
				 * @desc 학과명 변경 이벤트
				 * @param 
				 * @return 
				 * @author Aeyoung Lee at 2016. 6. 14.
				 */
				moPage.onValueChanged_IpbDeptNm = function(sender) {
					doSetPopKeyDate();
					doOnChangeStdCmnPObjSch(sender);
				};
				
				/**
				 * @desc 학년도 / 학기 변경 이벤트
				 * @param 
				 * @return 
				 * @author Aeyoung Lee at 2016. 6. 14.
				 */
				function doSetKeyDateYearSmtImp(){
					util.Control.reset(app, ["ipbDeptNm", "ipbDeptCd", "ipbDeptObjDivRcd", "ipbScalFeeNm", "ipbScalFeeCd"]);
				};	
				
				/**
				 * 조회조건 수행
				 * @member moPage
				 * @type void
				 * @author Aeyoung Lee at 2016. 6. 14.
				 */
				moPage.onClick_BtnSearch = function() {
					//1.조회조건 필수 체크(학년도)
					if(!util.validate(app, ["cbbYearImpNS", "cbbSmtImpNS", "dipPayDt"])){
						return false;
					}	
					
					doList();
				};
				
				/**
				 * @desc 조회조건 수행
				 * @param
				 * @@return 
				 * @author Aeyoung Lee at 2016. 6. 14.
				 */
				function doList(poCallBackFunc) {
					
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
									  , p_strScalFeeCd : util.DataMap.getValue(app, "dmReqKey", "strScalFeeCd") 				// 장학금
									  , p_strSsObjDivRcd : util.DataMap.getValue(app, "dmReqKey", "strSsObjDivRcd") 			// 장학금객체구분코드
									  , p_strSaList : util.DataMap.getValue(app, "dmResList", "strSaList")
									  , p_strPayMon : util.DataMap.getValue(app, "dmReqKey", "strPayMon")
									  , p_strSubTitle : util.DataMap.getValue(app, "dmReqKey", "strRptSubTitle")
									  , p_strKeyStDt : vsStDt 	// 해당학년도학기 시작일자
									  , p_strKeyEndDt : vsEndDt  // 해당학년도학기 종료일자
									  , p_strLanDivRcd : msDefaultLocale
									  , p_strPgmId : moPageInfo.pgmId
									  , p_strUserId : moUserInfo.userId
									}	
									
							var vsPayMon = util.DataMap.getValue(app, "dmReqKey", "strPayMon");
									
							 var voOzFormParam = {
										  TITLE : vsPayMon.substring(0,4) + "-" + vsPayMon.substring(4,6) +" 근로장학금지급내역" //리포트타이틀
										, SUB_TITLE : "" 		//리포트서브타이틀		
										, FORM_TYPE : "flash"
										};	
										
							util.Report.open(app, "hojReport", "extCssSWrkScalPmntListPrt", voOzFormParam, voParam);
							
						}
					});
				}
					
				return moPage;
			};;
			// End - User Script
			
			// Header
			var dataMap_1 = new cpr.data.DataMap("dmReqKey");
			dataMap_1.parseData({
				"columns" : [
					{
						"name": "strDeptCd",
						"dataType": "string"
					},
					{
						"name": "strDeptNm",
						"dataType": "string"
					},
					{
						"name": "strDeptObjDivRcd",
						"dataType": "string"
					},
					{
						"name": "strScalFeeCd",
						"dataType": "string"
					},
					{
						"name": "strScalFeeNm",
						"dataType": "string"
					},
					{
						"name": "strSsObjDivRcd",
						"dataType": "string"
					},
					{
						"name": "strPayMon",
						"dataType": "string"
					},
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
			
			var dataMap_2 = new cpr.data.DataMap("dmResOnload");
			dataMap_2.parseData({
				"columns" : [{
					"name": "strSysDate",
					"dataType": "string"
				}]
			});
			app.register(dataMap_2);
			
			var dataMap_3 = new cpr.data.DataMap("dmResList");
			dataMap_3.parseData({
				"columns" : [{
					"name": "strSaList",
					"dataType": "string"
				}]
			});
			app.register(dataMap_3);
			var submission_1 = new cpr.protocols.Submission("subOnLoad");
			submission_1.action = "/css/ExtCssWrkScalPmntListPrt/";
			submission_1.mediaType = "application/x-www-form-urlencoded";
			submission_1.addResponseData(dataMap_2, false);
			app.register(submission_1);
			
			var submission_2 = new cpr.protocols.Submission("subList");
			submission_2.action = "/css/ExtCssWrkScalPmntListPrt/";
			submission_2.mediaType = "application/x-www-form-urlencoded";
			submission_2.addRequestData(dataMap_1);
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
				var output_1 = new cpr.controls.Output("optScalFeeNm");
				output_1.value = "";
				output_1.bind("value").toLanguage("UI-SCR-SCRS");
				container.addChild(output_1, {
					"top": "5px",
					"left": "345px",
					"width": "80px",
					"height": "25px"
				});
				var output_2 = new cpr.controls.Output("optDeptNm");
				output_2.value = "";
				output_2.bind("value").toLanguage("UI-SCR-DEPT");
				container.addChild(output_2, {
					"top": "5px",
					"left": "570px",
					"width": "80px",
					"height": "25px"
				});
				var inputBox_1 = new cpr.controls.InputBox("ipbScalFeeNm");
				inputBox_1.maxLength = 50;
				inputBox_1.bind("fieldLabel").toExpression("#optScalFeeNm.value");
				inputBox_1.bind("value").toDataMap(app.lookup("dmReqKey"), "strScalFeeNm");
				if(typeof onIpbScalFeeNmValueChange == "function") {
					inputBox_1.addEventListener("value-change", onIpbScalFeeNmValueChange);
				}
				container.addChild(inputBox_1, {
					"top": "5px",
					"left": "430px",
					"width": "110px",
					"height": "25px"
				});
				var button_2 = new cpr.controls.Button("btnScalFeeNmPop");
				button_2.value = "";
				button_2.style.setClasses(["btn-pop-search"]);
				if(typeof onBtnScalFeeNmPopClick == "function") {
					button_2.addEventListener("click", onBtnScalFeeNmPopClick);
				}
				container.addChild(button_2, {
					"top": "5px",
					"left": "540px",
					"width": "20px",
					"height": "25px"
				});
				var inputBox_2 = new cpr.controls.InputBox("ipbScalFeeCd");
				inputBox_2.visible = false;
				inputBox_2.bind("fieldLabel").toExpression("#optScalFeeNm.value");
				inputBox_2.bind("value").toDataMap(app.lookup("dmReqKey"), "strScalFeeCd");
				container.addChild(inputBox_2, {
					"top": "5px",
					"left": "562px",
					"width": "5px",
					"height": "25px"
				});
				var inputBox_3 = new cpr.controls.InputBox("ipbDeptNm");
				inputBox_3.maxLength = 50;
				inputBox_3.bind("fieldLabel").toExpression("#optDeptNm.value");
				inputBox_3.bind("value").toDataMap(app.lookup("dmReqKey"), "strDeptNm");
				if(typeof onIpbDeptNmValueChange == "function") {
					inputBox_3.addEventListener("value-change", onIpbDeptNmValueChange);
				}
				container.addChild(inputBox_3, {
					"top": "5px",
					"left": "655px",
					"width": "110px",
					"height": "25px"
				});
				var button_3 = new cpr.controls.Button("btnDeptNmPop");
				button_3.value = "";
				button_3.style.setClasses(["btn-pop-search"]);
				if(typeof onBtnDeptNmPopClick == "function") {
					button_3.addEventListener("click", onBtnDeptNmPopClick);
				}
				container.addChild(button_3, {
					"top": "5px",
					"left": "765px",
					"width": "20px",
					"height": "25px"
				});
				var inputBox_4 = new cpr.controls.InputBox("ipbDeptCd");
				inputBox_4.visible = false;
				inputBox_4.bind("fieldLabel").toExpression("#optDeptNm.value");
				inputBox_4.bind("value").toDataMap(app.lookup("dmReqKey"), "strDeptCd");
				container.addChild(inputBox_4, {
					"top": "5px",
					"left": "785px",
					"width": "5px",
					"height": "25px"
				});
				var inputBox_5 = new cpr.controls.InputBox("ipbDeptObjDivRcd");
				inputBox_5.visible = false;
				inputBox_5.bind("fieldLabel").toExpression("#optDeptNm.value");
				inputBox_5.bind("value").toDataMap(app.lookup("dmReqKey"), "strDeptObjDivRcd");
				container.addChild(inputBox_5, {
					"top": "5px",
					"left": "789px",
					"width": "5px",
					"height": "25px"
				});
				var inputBox_6 = new cpr.controls.InputBox("ipbSsObjDivRcd");
				inputBox_6.visible = false;
				inputBox_6.bind("value").toDataMap(app.lookup("dmReqKey"), "strSsObjDivRcd");
				container.addChild(inputBox_6, {
					"top": "5px",
					"left": "569px",
					"width": "5px",
					"height": "25px"
				});
				var output_3 = new cpr.controls.Output("optPayDt");
				output_3.value = "";
				output_3.style.setClasses(["require"]);
				output_3.bind("value").toLanguage("UI-SCR-PAYMON");
				container.addChild(output_3, {
					"top": "5px",
					"left": "795px",
					"width": "80px",
					"height": "25px"
				});
				var dateInput_1 = new cpr.controls.DateInput("dipPayDt");
				dateInput_1.format = "YYYY-MM";
				dateInput_1.userAttr({"require": "Y"});
				dateInput_1.style.css({
					"text-align" : "center"
				});
				dateInput_1.bind("fieldLabel").toExpression("#optPayDt.value");
				dateInput_1.bind("value").toDataMap(app.lookup("dmReqKey"), "strPayMon");
				container.addChild(dateInput_1, {
					"top": "5px",
					"left": "880px",
					"width": "105px",
					"height": "25px"
				});
				var embeddedApp_1 = new cpr.controls.EmbeddedApp("emaYearSmt");
				cpr.core.App.load("app/imp/impYearSmt", function(app) {
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
			
			var embeddedApp_2 = new cpr.controls.EmbeddedApp("emaStdCssPScalFeeSch");
			cpr.core.App.load("app/css/impStdCssPScalFeePop", function(app) {
				if(app){
					embeddedApp_2.app = app;
				}
			});
			container.addChild(embeddedApp_2, {
				"top": "674px",
				"left": "115px",
				"width": "100px",
				"height": "25px"
			});
			
			var embeddedApp_3 = new cpr.controls.EmbeddedApp("emaStdCmnPobjSch");
			cpr.core.App.load("app/cmn/impStdCmnPObjSch", function(app) {
				if(app){
					embeddedApp_3.app = app;
				}
			});
			container.addChild(embeddedApp_3, {
				"top": "674px",
				"left": "5px",
				"width": "100px",
				"height": "25px"
			});
			if(typeof onBodyLoad == "function"){
				app.addEventListener("load", onBodyLoad);
			}
		}
	});
	app.title = "근로장학금지급내역";
	cpr.core.Platform.INSTANCE.register(app);
})();