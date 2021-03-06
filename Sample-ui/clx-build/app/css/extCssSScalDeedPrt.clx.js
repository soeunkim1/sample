/*
 * App URI: app/css/extCssSScalDeedPrt
 * Source Location: app/css/extCssSScalDeedPrt.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("app/css/extCssSScalDeedPrt", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			﻿//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
			/// <xtmlink path="./extCssSScalDeedPrt.xtm"/>
			
			
			var extCssSScalDeedPrt = function() {
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
					oScalFeeCd 		: "ipbScalFeeCd",
					oScalFeeNm 		: "ipbScalFeeNm",
					oObjDivRcd 		: "ipbSsObjDivRcd",
					oPmntDivRcd 	: "",
					oPmntItvRcd 	: "",
					func 			: null
				}
				];
				
				/**
				 * 학생검색팝업 관련 설정사항
				 */
				moPObject.moIdsForStdCsrPStSearch = [
				{
					controlId 		: "btnStudPop",
					iStudNo 		: "ipbStudId",	
					iStudId 		: "",
					iStudNm 		: "",
					iKeyDate 		: "",
					iObjDivRcd 		: "", 
					iObjCd 			: "", 
					iObjNm 			: "",
					iAuthYN 		: "",
					iStatRcd 		: "",
					iStudDivRcd		: "",
					oStudId 		: "ipbStudIdObj",
					oStudNo 		: "ipbStudId",
					oStudNm 		: "",
					oStatNm 		: "",
					oStatRcd 		: "",
					oProcRslt 		: "",
					oProcRsltYear 	: "",
					oSaNm			: "",
					oSaCd 			: "",
					oSpNm 			: "",
					oSpCd 			: "",
					oOgNm 			: "",
					oOgCd 			: "",
					oStudDivRcd		: "",
					oStudDivNm		: "",
					oBirthday		: "",
					oGenderRcd		: "",
					oGenderNm		: "",
					func : null
				}
				];	
				
				/**
				 * @desc Header Import onLoad
				 * @return void
				 * @author Aeyoung Lee at 2016. 6. 14.
				 */
				moPage.onLoadImportDone_ImpTitle = function() {
					doHeaderOnLoad();
				}
				
				/**
				 * @desc 온로드
				 * @return void
				 * @author Aeyoung Lee at 2016. 6. 14.
				 */
				moPage.onModelConstructDone_ExtCssSScalDeedPrt = function() {
					//검색조건 초기 설정
			//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
			//		ExtGroup.initSearchBox("grpSearch",["grpData"]);
					
					doOnLoad();	
				};
				
				/**
				 * @desc 온로드 실행
				 * @param 
				 * @return void
				 * @author Aeyoung Lee at 2016. 6. 14.
				 */
				function doOnLoad(){
					doOnLoadImpNS("CSS");
					
					// 서브미션 실행 (실패시 cover page)
					//strCommand: onLoad 
					util.Submit.send(app, "subOnLoad", function(pbSuccess){
						if(pbSuccess){
							// 현재일자
							var vsSysDate = util.DataMap.getValue(app, "dmResOnLoad", "strSysDate").substring(0,8);
							util.Control.setValue(app, "dipConferDt", vsSysDate);
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
					moPObject.moIdsForStdCsrPStSearch[0].iKeyDate = vsEndDt;
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
				 * @desc 학생검색 팝업 클릭 이벤트
				 * @param 
				 * @return 
				 * @author Aeyoung Lee at 2016. 11. 31.
				 */
				moPage.onClick_BtnStudPop = function(sender) {
					doSetPopKeyDate();
					doOnClickStdCsrPStSearch(sender);
				};
				
				/**
				 * @desc 학번 변경 이벤트
				 * @param 
				 * @return 
				 * @author Aeyoung Lee at 2016. 11. 31.
				 */
				moPage.onValueChanged_IpbStudId = function(sender) {
					doSetPopKeyDate();
					doOnChangeStdCsrPStSearch(sender);
				};
				
				/**
				 * @desc 증서번호부여 버튼 클릭 이벤트
				 * @param 
				 * @return 
				 * @author Aeyoung Lee at 2016. 6. 14.
				 */
				moPage.onClick_BtnSaveDeed = function() {
					
					util.Msg.notify(app, "null");
					
					// 필수항목 체크
					if(!util.validate(app, ["cbbYearImpNS", "cbbSmtImpNS"])) return;
					
					util.DataMap.setValue(app, "dmReqKey", "strSchYearRcd", util.Control.getValue(app, "cbbYearImpNS"));
					util.DataMap.setValue(app, "dmReqKey", "strSmtRcd", util.Control.getValue(app, "cbbSmtImpNS"));
					ExtInstance.setValue("/root/reqKey/strKeyDate", ExtInstance.getValue("instance('impCommonN')/root/date/END_DT").substr(0,8));
					
					// 2016.11.3 컴펌메시지 추가
					// 증서번호부여를 처리하시겠습니까?
					if(!util.Msg.confirm("NLS-CSS-M108") ) return;
					
					// 2016.10.14 배치처리전 커버페이지 씌우는 로직추가
					util.coverPage(app);
					
					//strCommand: save 
					util.Submit.send(app, "subSave", function(pbSuccess){
						if(pbSuccess){
							var vsProcCnt = util.DataMap.getValue(app, "dmResList", "strProcUpdCnt");
							
							//@명의 증서번호부여가 처리되었습니다.
							util.Msg.alert("NLS-CSS-M101", [vsProcCnt]);
							//증서번호부여가 처리되었습니다.
							util.Msg.notify(app, "NLS.CSS.M102");		
						}else{
							//증서번호부여를 실패하였습니다.
							util.Msg.notify(app, "NLS.CSS.M103");
						}	
						
						util.removeCover(app);
					});  
				};
				
				/**
				 * 조회조건 수행
				 * @member moPage
				 * @type void
				 * @author Aeyoung Lee at 2016. 6. 14.
				 */
				moPage.onClick_BtnSearch = function() {
					//1.조회조건 필수 체크(학년도)
					if(!util.validate(app, ["cbbYearImpNS", "cbbSmtImpNS", "ipbScalFeeNm", "ipbScalFeeCd", "dipConferDt"])){
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
							
							//리퀘스트 셋팅
							var voParam = {
										p_strSchYearRcd : util.DataMap.getValue(app, "dmReqKey", "strSchYearRcd") 			// 학년도
									  , p_strSmtRcd : util.DataMap.getValue(app, "dmReqKey", "strSmtRcd") 					// 학기
									  , p_strScalFeeCd : util.DataMap.getValue(app, "dmReqKey", "strScalFeeCd") 				// 장학금
									  , p_strSsObjDivRcd : util.DataMap.getValue(app, "dmReqKey", "strSsObjDivRcd") 			// 장학금객체구분코드
									  , p_strSaList : util.DataMap.getValue(app, "dmResList", "strSaList")
									  , p_strConferDt : util.DataMap.getValue(app, "dmReqKey", "strConferDt")
									  , p_strStudId : util.DataMap.getValue(app, "dmReqKey", "strStudId")
									  , p_strKeyStDt : vsStDt 	// 해당학년도학기 시작일자
									  , p_strKeyEndDt : vsEndDt  // 해당학년도학기 종료일자
									  , p_strLandivRcd : msDefaultLocale
									}	
									
							 var voOzFormParam = {
										  TITLE : "장 학 증 서" //리포트타이틀
										, SUB_TITLE : "" 		//리포트서브타이틀		
										, FORM_TYPE : "flash"
										};	
										
							util.Report.open(app, "hojReport", "extCssSScalDeedPrt", voOzFormParam, voParam);
							
						}
					});
				}
				
				
				
				return moPage;
			};;
			// End - User Script
			
			// Header
			var dataMap_1 = new cpr.data.DataMap("dmReqList");
			dataMap_1.parseData({
				"columns" : [
					{
						"name": "strUserId",
						"dataType": "string"
					},
					{
						"name": "strMenuId",
						"dataType": "string"
					},
					{
						"name": "strLanDivRcd",
						"dataType": "string"
					},
					{
						"name": "strSchYearRcd",
						"dataType": "string"
					}
				]
			});
			app.register(dataMap_1);
			
			var dataMap_2 = new cpr.data.DataMap("dmResOnLoad");
			dataMap_2.parseData({
				"columns" : [{
					"name": "strSysDate",
					"dataType": "string"
				}]
			});
			app.register(dataMap_2);
			
			var dataMap_3 = new cpr.data.DataMap("dmReqKey");
			dataMap_3.parseData({
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
						"name": "strScalFeeCd",
						"dataType": "string"
					},
					{
						"name": "strScalFeeNm",
						"dataType": "string"
					},
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
						"name": "strSsObjDivRcd",
						"dataType": "string"
					},
					{
						"name": "strKeyDate",
						"dataType": "string"
					},
					{
						"name": "strConferDt",
						"dataType": "string"
					},
					{
						"name": "strStudId",
						"dataType": "string"
					},
					{
						"name": "strStudNo",
						"dataType": "string"
					}
				]
			});
			app.register(dataMap_3);
			
			var dataMap_4 = new cpr.data.DataMap("dmResList");
			dataMap_4.parseData({
				"columns" : [
					{
						"name": "strProcUpdCnt",
						"dataType": "string"
					},
					{
						"name": "strSaList",
						"dataType": "string"
					}
				]
			});
			app.register(dataMap_4);
			var submission_1 = new cpr.protocols.Submission("subOnLoad");
			submission_1.action = "/css/ExtCssScalDeedPrt/";
			submission_1.mediaType = "application/x-www-form-urlencoded";
			submission_1.addResponseData(dataMap_2, false);
			app.register(submission_1);
			
			var submission_2 = new cpr.protocols.Submission("subList");
			submission_2.action = "/css/ExtCssScalDeedPrt/";
			submission_2.mediaType = "application/x-www-form-urlencoded";
			submission_2.addRequestData(dataMap_3);
			submission_2.addResponseData(dataMap_4, false);
			app.register(submission_2);
			
			var submission_3 = new cpr.protocols.Submission("subSave");
			submission_3.action = "/css/ExtCssScalDeedPrt/";
			submission_3.mediaType = "application/x-www-form-urlencoded";
			submission_3.addRequestData(dataMap_3);
			submission_3.addResponseData(dataMap_4, false);
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
				var output_1 = new cpr.controls.Output("optScalFeeNm");
				output_1.value = "";
				output_1.style.setClasses(["require"]);
				output_1.bind("value").toLanguage("UI-SCR-SCRS");
				container.addChild(output_1, {
					"top": "5px",
					"left": "345px",
					"width": "75px",
					"height": "25px"
				});
				var output_2 = new cpr.controls.Output("optDeptNm");
				output_2.value = "";
				output_2.bind("value").toLanguage("UI-SCR-DEPT");
				container.addChild(output_2, {
					"top": "5px",
					"left": "595px",
					"width": "75px",
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
				var inputBox_1 = new cpr.controls.InputBox("ipbScalFeeNm");
				inputBox_1.maxLength = 50;
				inputBox_1.userAttr({"require": "Y"});
				inputBox_1.bind("fieldLabel").toExpression("#optScalFeeNm.value");
				inputBox_1.bind("value").toDataMap(app.lookup("dmReqKey"), "strScalFeeNm");
				if(typeof onIpbScalFeeNmValueChange == "function") {
					inputBox_1.addEventListener("value-change", onIpbScalFeeNmValueChange);
				}
				container.addChild(inputBox_1, {
					"top": "5px",
					"left": "425px",
					"width": "140px",
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
					"left": "565px",
					"width": "20px",
					"height": "25px"
				});
				var inputBox_2 = new cpr.controls.InputBox("ipbScalFeeCd");
				inputBox_2.visible = false;
				inputBox_2.userAttr({"require": "Y"});
				inputBox_2.bind("fieldLabel").toExpression("#optScalFeeNm.value");
				inputBox_2.bind("value").toDataMap(app.lookup("dmReqKey"), "strScalFeeCd");
				container.addChild(inputBox_2, {
					"top": "5px",
					"left": "587px",
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
					"left": "675px",
					"width": "140px",
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
					"left": "815px",
					"width": "20px",
					"height": "25px"
				});
				var inputBox_4 = new cpr.controls.InputBox("ipbDeptCd");
				inputBox_4.visible = false;
				inputBox_4.userAttr({"require": "Y"});
				inputBox_4.bind("fieldLabel").toExpression("#optDeptNm.value");
				inputBox_4.bind("value").toDataMap(app.lookup("dmReqKey"), "strDeptCd");
				container.addChild(inputBox_4, {
					"top": "5px",
					"left": "836px",
					"width": "5px",
					"height": "25px"
				});
				var inputBox_5 = new cpr.controls.InputBox("ipbDeptObjDivRcd");
				inputBox_5.visible = false;
				inputBox_5.bind("fieldLabel").toExpression("#optDeptNm.value");
				inputBox_5.bind("value").toDataMap(app.lookup("dmReqKey"), "strDeptObjDivRcd");
				container.addChild(inputBox_5, {
					"top": "5px",
					"left": "841px",
					"width": "5px",
					"height": "25px"
				});
				var inputBox_6 = new cpr.controls.InputBox("ipbSsObjDivRcd");
				inputBox_6.visible = false;
				inputBox_6.bind("value").toDataMap(app.lookup("dmReqKey"), "strSsObjDivRcd");
				container.addChild(inputBox_6, {
					"top": "5px",
					"left": "594px",
					"width": "5px",
					"height": "25px"
				});
				var output_3 = new cpr.controls.Output("optConferDt");
				output_3.value = "";
				output_3.style.setClasses(["require"]);
				output_3.bind("value").toLanguage("UI-DB-REG-CLOSE-DT");
				container.addChild(output_3, {
					"top": "30px",
					"left": "5px",
					"width": "60px",
					"height": "25px"
				});
				var dateInput_1 = new cpr.controls.DateInput("dipConferDt");
				dateInput_1.userAttr({"require": "Y"});
				dateInput_1.style.css({
					"text-align" : "center"
				});
				dateInput_1.bind("fieldLabel").toExpression("#optConferDt.value");
				dateInput_1.bind("value").toDataMap(app.lookup("dmReqKey"), "strConferDt");
				container.addChild(dateInput_1, {
					"top": "30px",
					"left": "70px",
					"width": "95px",
					"height": "25px"
				});
				var button_4 = new cpr.controls.Button("btnSaveDeed");
				button_4.value = "";
				button_4.style.setClasses(["btn-save"]);
				button_4.bind("value").toLanguage("UI-GLS-EXEC");
				if(typeof onBtnSaveDeedClick == "function") {
					button_4.addEventListener("click", onBtnSaveDeedClick);
				}
				container.addChild(button_4, {
					"top": "5px",
					"left": "1076px",
					"width": "80px",
					"height": "25px"
				});
				var output_4 = new cpr.controls.Output("optStudId");
				output_4.value = "";
				output_4.bind("value").toLanguage("UI-SCR-DEPT");
				container.addChild(output_4, {
					"top": "5px",
					"left": "845px",
					"width": "75px",
					"height": "25px"
				});
				var inputBox_7 = new cpr.controls.InputBox("ipbStudId");
				inputBox_7.maxLength = 50;
				inputBox_7.bind("fieldLabel").toExpression("#optStudId.value");
				inputBox_7.bind("value").toDataMap(app.lookup("dmReqKey"), "strStudNo");
				if(typeof onIpbStudIdValueChange == "function") {
					inputBox_7.addEventListener("value-change", onIpbStudIdValueChange);
				}
				container.addChild(inputBox_7, {
					"top": "5px",
					"left": "925px",
					"width": "100px",
					"height": "25px"
				});
				var button_5 = new cpr.controls.Button("btnStudPop");
				button_5.value = "";
				button_5.style.setClasses(["btn-pop-search"]);
				if(typeof onBtnStudPopClick == "function") {
					button_5.addEventListener("click", onBtnStudPopClick);
				}
				container.addChild(button_5, {
					"top": "5px",
					"left": "1025px",
					"width": "20px",
					"height": "25px"
				});
				var inputBox_8 = new cpr.controls.InputBox("ipbStudIdObj");
				inputBox_8.visible = false;
				inputBox_8.bind("fieldLabel").toExpression("#optStudId.value");
				inputBox_8.bind("value").toDataMap(app.lookup("dmReqKey"), "strStudId");
				container.addChild(inputBox_8, {
					"top": "5px",
					"left": "1046px",
					"width": "5px",
					"height": "25px"
				});
			})(group_1);
			container.addChild(group_1, {
				"top": "35px",
				"left": "5px",
				"width": "1225px",
				"height": "57px"
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
					"height": "569px"
				});
			})(group_2);
			container.addChild(group_2, {
				"top": "95px",
				"left": "5px",
				"width": "1225px",
				"height": "579px"
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
			
			var embeddedApp_4 = new cpr.controls.EmbeddedApp("emaort2");
			cpr.core.App.load("app/csr/impStdCsrPStSearch", function(app) {
				if(app){
					embeddedApp_4.app = app;
				}
			});
			container.addChild(embeddedApp_4, {
				"top": "673px",
				"left": "225px",
				"width": "100px",
				"height": "25px"
			});
			if(typeof onBodyLoad == "function"){
				app.addEventListener("load", onBodyLoad);
			}
		}
	});
	app.title = "장학증서출력";
	cpr.core.Platform.INSTANCE.register(app);
})();
