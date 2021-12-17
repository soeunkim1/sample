/*
 * App URI: app/csr/extCsrSNotRegListPrt
 * Source Location: app/csr/extCsrSNotRegListPrt.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("app/csr/extCsrSNotRegListPrt", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			﻿//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
			///<xtmlink path="./extCsrSNotRegListPrt.xtm"/>
			
			var extCsrSNotRegListPrt = function() {
			
				var moPage = new Page();
				//임포트용 데이터 통신 오브젝트
				var moPObject = new PObject();
			
				/******************************************************************************************************
				 *  객체검색팝업 관련 설정사항
				 *  ▶ 설정가능 유형
				 *      1. 인스턴스
				 *      2. 리피트 디테일 셀 ID
				 *      3. 컨트롤 ID
				 *  ▶ 각 변수별 설명
				 *      iXXX : 팝업에 전달될  input 파라미터
				 *      oXXX : 팝업에서 선택한 값을 받을 데이터
				 *  	1. controlId 		: 최초 이벤트의 버튼이나 그리드 id             (필수)
				 *  	2. iCd 				: 검색조건 부서코드                                 (선택) 
				 *  	3. iNm 				: 검색조건 부서명									(선택)	
				 *  	4. iObjDivRcd 	: 검색될 객체구분코드 종류						(필수)
				 *								  (CC009OG : "행정부서", CC009SA : "학사부서", CC009SP : "이수과정", CC009CU : "교과그룹", CC009OT : "외부부서")
				 *  	5. iStartObject 	: 검색시작부서 										(선택)
				 *								  ("CC009OG20000,CC009OG70000",) 
				 *		6. iOtDivRcd 		: 외부부서구분코드 									(선택)
				 *								  (외부부서[CC009OT]일때 사용) ("CB008UNIV, CB008HSCL")
				 *		7. iOtIsTreeView	: 트리보이기 유무 									(선택)
				 *								  default : N (외부부서[CC009OT]일때 사용) "Y" 
				 *  	8. iLanDivRcd 	: 언어키													(선택)
				 *  	9. iKeyDate 		: 기준일													(필수)
				 *  	10. oObjDivRcd 	: 객체구분코드 
				 *  	11. oCd 			: 부서코드
				 *  	12. oCdNm 		: 부서명
				 *  	13. oBegDt 		: 시작일
				 *  	14. oEndDt 		: 종료일
				 *  	15. oLanDivRcd 	: 언어키
				 *  	16. func 			: 팝업에서 선택한 값을 받은 후 추가 로직이 필요한 경우 함수
				 *									  
				 *******************************************************************************************************/	
				moPObject.moIdsForStdCmnPObjSch = [
					{   //교직원검색 조회조건 행정부서
						controlId			:	"btnPopSearch",
						iCd					:	"",
						iNm					:	"ipbDeptNm",
						iObjDivRcd			:	["CC009SA", "CC009OG"],
						iStartObject    	:   "",
						iOtDivRcd			:	"",
						iOtIsTreeView	:	"",
						iLanDivRcd		:	"",
						iKeyDate			:	"/root/reqList/strKeyDate",
						iKeyEndDate		:	"",
						oObjDivRcd		:	"/root/reqList/strObjDivRcd",
						oCd					:	"/root/reqList/strDeptCd",
						oCdNm				:	"ipbDeptNm",
						oBegDt				:	"",
						oEndDt				:	"",
						oLanDivRcd		:	"",
						func 					:  null
					}
				];
				
				/**
				 * @desc Header Import onLoad
				 * @param 
				 * @return void
				 * @author Choi In Seong 2016. 6. 20
				 */
				moPage.onLoadImportDone_ImpTitle = function() {
					doHeaderOnLoad();
				};
			
				/**
				 * @desc 화면 온로드
				 * @param 
				 * @return void
				 * @author Choi In Seong 2016. 6. 20
				 */
				moPage.onModelConstructDone_extCsrSStudAddrPrt = function() {
					// 조회조건 초기 설정
			//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
			//		ExtGroup.initSearchBox("grpSearch",["grp_rptCsrShreg"]);
					
					//서브미션 실행 (실패시 cover page)
					//strCommand: onLoad 
					util.Submit.send(app, "subOnLoad", function(pbSuccess){
						if(pbSuccess){
							
							util.DataMap.setValue(app, "dmReqList", "strKeyDate", util.DataMap.getValue(app, "dmResOnLoad", "strKeyDate"));
							util.DataMap.setValue(app, "dmReqList", "strPrtObjDivRcd", "CC009OG");
							
							// 조회조건 초기화
							util.Control.redraw(app, ["cbbYearRcd", "cbbSmtRcd","cbbObjDivRcd"]);
			
							// 소속 포커스
							util.Control.setFocus(app, "ipbDeptNm");				
						}
					});
				}
			
				/**
				 * @desc 조회버튼 클릭
				 * @param 
				 * @return void
				 * @author Choi In Seong 2016. 6. 20
				 */
				moPage.onClick_BtnSearch = function() {
					// 조회조건 필수 체크
					if(!util.validate(app, ["ipbDeptNm", "cbbYearRcd","cbbSmtRcd"])){
						return false;
					}
					
					doList();
				};
				
				/**
				 * @desc 조회
				 * @param 
				 * @return 
				 * @author Choi In Seong 2016. 6. 20
				 */
				function doList(poCallBackFunc) {
							
					// submission call 
					//strCommand: list 
					util.Submit.send(app, "subList",  function(pbSuccess) {
						if(pbSuccess){
							
							var vsSchYearNm = util.SelectCtl.getLabel(app, "cbbYearRcd", util.SelectCtl.getSelectedIndex(app, "cbbYearRcd"));
							var vsSmtNm = util.SelectCtl.getLabel(app, "cbbSmtRcd", util.SelectCtl.getSelectedIndex(app, "cbbSmtRcd"));
							var vsSaNm = util.DataMap.getValue(app, "dmReqList", "strDeptNm");
							var vsSchTitle = "학년도 : " + vsSchYearNm + "    학기 : " + vsSmtNm.substr(0,3);
							
							//리퀘스트 셋팅
							var voParam = {
										p_strDeptCd               : util.DataMap.getValue(app, "dmReqList", "strDeptCd"),
										p_strCrsSmtRcd         : util.DataMap.getValue(app, "dmReqList", "strCrsSmtRcd"),
										p_strKeyDate              : util.DataMap.getValue(app, "dmReqList", "strKeyDate"),
										p_strSchYearRcd        : util.DataMap.getValue(app, "dmReqList", "strSchYearRcd"),
										p_strSmtRcd               : util.DataMap.getValue(app, "dmReqList", "strSmtRcd"),
										p_strSchYearNm         : vsSchYearNm,
										p_strSmtNm               : vsSmtNm.substr(0,3),
										p_strDeptNm              : vsSaNm,
										p_strSaList                 : util.DataMap.getValue(app, "dmResList", "strSaList"),
										p_strPrtObjDivRcd        : util.DataMap.getValue(app, "dmReqList", "strPrtObjDivRcd"),
									    p_strPrtPageNextYn     : util.DataMap.getValue(app, "dmReqList", "strPrtPageNextYn"), 
										p_strLanDivRcd           : msDefaultLocale,
										p_strSchTitle               : vsSchTitle
									}	
									
							var vsTitle = vsSchYearNm + " " + vsSmtNm.substr(0,3) + " 미등록자 명단";  
							
							 var voOzFormParam = {
									  TITLE :  vsTitle  //리포트타이틀
									, SUB_TITLE : "" //리포트서브타이틀
									, FORM_TYPE : "flash"
								};	
									
							util.Report.open(app, "hojReport", "extCsrSNotRegListPrt", voOzFormParam, voParam);
					
						}
						if(util.isFunc(poCallBackFunc)) poFunc(pbSuccess);
					});
				}
				
				/**
				 * @desc 소속 검색 팝업 호출
				 * @param 
				 * @return void
				 * @author Choi In Seong 2016. 6. 20
				 */
				moPage.onClick_BtnPopSearch = function(sender) {
					doOnClickStdCmnPObjSch(sender);
				}
				
				/**
				 * @desc 소속 검색
				 * @param 
				 * @return void
				 * @author Choi In Seong 2016. 6. 20
				 */	
				moPage.onValueChanged_IpbDeptNm = function(sender) {
					doOnChangeStdCmnPObjSch(sender);
				}
				
				/**
				 * @desc 소속 권한 처리
				 * @param 
				 * @return void
				 * @author Choi In Seong 2016. 6. 20
				 */
				moPage.onLoadImportDone_ImpStdCmnPobjSch = function() {
					setStdCmnPObjSchObjInfo();
				}
				
				moPage.onValueChanged_CbbSmtRcd = function() {
					doGetKeyDate();
				}
				
				moPage.onValueChanged_CbbYearRcd = function() {
					doGetKeyDate();
				}
				
				/**
				 * @desc 학년도, 학기에 해당되는 기준일을 조회한다.
				 * @param
				 * @return void
				 * @author Choi In Seong 2016. 6. 20
				 */
				function doGetKeyDate() {
				
					//strCommand: getKeyDate 
					util.Submit.send(app, "subGetKeyDate", function(pbSuccess) {
			
						if (pbSuccess) {
							//전체권한일시 최상위 부서가 셋팅 되어 있으면 초기화 하지 않음
							var vsDeptCd = util.DataMap.getValue(app, "dmReqList", "strDeptCd");
							if(moPageInfo.authRngRcd == "CC00102"){
								if(vsDeptCd != ExtInstance.getValue("instance('insStdCmnPObjSch')/root/resListObjInfo/strObjCd")){
									util.Control.setValue(app, "ipbDeptNm", "");
									util.Control.setValue(app, "ipbDeptCd", "");
									util.DataMap.setValue(app, "dmReqList", "strObjDivRcd", "");
								}
							// 전체권한 이외의 권한일시 자신의 소속 부서가 셋팅되어 있으면 초기화 하지 않음
							}else if(moPageInfo.authRngRcd == "CC00101" || moPageInfo.authRngRcd == "CC00105" || moPageInfo.authRngRcd == "CC00106" || moPageInfo.authRngRcd == "CC00107"){
								if(vsDeptCd != moUserInfo.asgnDeptCd){
									util.Control.setValue(app, "ipbDeptNm", "");
									util.Control.setValue(app, "ipbDeptCd", "");
									util.DataMap.setValue(app, "dmReqList", "strObjDivRcd", "");
								}
							}
							util.DataMap.setValue(app, "dmReqList", "strKeyDate", util.DataMap.getValue(app, "dmResGetKeyDate", "strKeyDate"));
							util.DataMap.setValue(app, "dmReqList", "strEndDate", util.DataMap.getValue(app, "dmResGetKeyDate", "strEndDate"));
						} else {
							util.DataMap.setValue(app, "dmReqList", "strSchYearRcd", "");
							util.DataMap.setValue(app, "dmReqList", "strSmtRcd", "");
							util.DataMap.setValue(app, "dmReqList", "strKeyDate", "");
							util.DataMap.setValue(app, "dmReqList", "strEndDate", "");
							util.Control.setValue(app, "cbbYearRcd", "");
							util.Control.setValue(app, "cbbSmtRcd", "");
						}
					});
				};
				
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
			var dataMap_1 = new cpr.data.DataMap("dmResOnLoad");
			dataMap_1.parseData({
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
			app.register(dataMap_1);
			
			var dataMap_2 = new cpr.data.DataMap("dmReqList");
			dataMap_2.parseData({
				"columns" : [
					{
						"name": "strDeptCd",
						"dataType": "string"
					},
					{
						"name": "strKeyDate",
						"dataType": "string"
					},
					{
						"name": "strObjDivRcd",
						"dataType": "string"
					},
					{
						"name": "strDeptNm",
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
						"name": "strEndDate",
						"dataType": "string"
					},
					{
						"name": "strCrsSmtRcd",
						"dataType": "string"
					},
					{
						"name": "strDptmjYn",
						"dataType": "string"
					},
					{
						"name": "strPrtObjDivRcd",
						"dataType": "string"
					},
					{
						"name": "strPrtPageNextYn",
						"dataType": "string"
					}
				]
			});
			app.register(dataMap_2);
			
			var dataMap_3 = new cpr.data.DataMap("dmResGetKeyDate");
			dataMap_3.parseData({
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
			submission_1.action = "/csr/ExtCsrNotRegListPrt/";
			submission_1.mediaType = "application/x-www-form-urlencoded";
			submission_1.addResponseData(dataSet_1, false);
			submission_1.addResponseData(dataSet_2, false);
			submission_1.addResponseData(dataMap_1, false);
			submission_1.addResponseData(dataSet_3, false);
			submission_1.addResponseData(dataMap_2, false);
			app.register(submission_1);
			
			var submission_2 = new cpr.protocols.Submission("subGetKeyDate");
			submission_2.action = "/csr/ExtCsrNotRegListPrt/";
			submission_2.mediaType = "application/x-www-form-urlencoded";
			submission_2.addRequestData(dataMap_2);
			submission_2.addResponseData(dataMap_3, false);
			app.register(submission_2);
			
			var submission_3 = new cpr.protocols.Submission("subList");
			submission_3.action = "/csr/ExtCsrNotRegListPrt/";
			submission_3.mediaType = "application/x-www-form-urlencoded";
			submission_3.addRequestData(dataMap_2);
			submission_3.addResponseData(dataMap_4, false);
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
				var output_1 = new cpr.controls.Output("optDeptCd");
				output_1.value = "";
				output_1.style.setClasses(["require"]);
				output_1.bind("value").toLanguage("UI-GLS-ASGN");
				container.addChild(output_1, {
					"top": "5px",
					"left": "400px",
					"width": "80px",
					"height": "25px"
				});
				var inputBox_1 = new cpr.controls.InputBox("ipbDeptNm");
				inputBox_1.userAttr({"require": "Y"});
				inputBox_1.bind("fieldLabel").toExpression("#optDeptCd.value");
				inputBox_1.bind("value").toDataMap(app.lookup("dmReqList"), "strDeptNm");
				if(typeof onIpbDeptNmValueChange == "function") {
					inputBox_1.addEventListener("value-change", onIpbDeptNmValueChange);
				}
				container.addChild(inputBox_1, {
					"top": "5px",
					"left": "485px",
					"width": "145px",
					"height": "25px"
				});
				var button_2 = new cpr.controls.Button("btnPopSearch");
				button_2.value = "";
				button_2.style.setClasses(["btn-pop-search"]);
				if(typeof onBtnPopSearchClick == "function") {
					button_2.addEventListener("click", onBtnPopSearchClick);
				}
				container.addChild(button_2, {
					"top": "5px",
					"left": "631px",
					"width": "20px",
					"height": "25px"
				});
				var inputBox_2 = new cpr.controls.InputBox("ipbDeptCd");
				inputBox_2.visible = false;
				inputBox_2.bind("value").toDataMap(app.lookup("dmReqList"), "strDeptCd");
				container.addChild(inputBox_2, {
					"top": "5px",
					"left": "650px",
					"width": "15px",
					"height": "25px"
				});
				var output_2 = new cpr.controls.Output("optYearRcd");
				output_2.value = "";
				output_2.style.setClasses(["require"]);
				output_2.bind("value").toLanguage("UI-GLS-SCH_YEAR");
				container.addChild(output_2, {
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
				var output_3 = new cpr.controls.Output("optSmtRcd");
				output_3.value = "";
				output_3.style.setClasses(["require"]);
				output_3.bind("value").toLanguage("UI-GLS-SMT");
				container.addChild(output_3, {
					"top": "5px",
					"left": "190px",
					"width": "80px",
					"height": "25px"
				});
				var comboBox_2 = new cpr.controls.ComboBox("cbbSmtRcd");
				comboBox_2.userAttr({"require": "Y"});
				comboBox_2.bind("fieldLabel").toExpression("#optSmtRcd.value");
				comboBox_2.bind("value").toDataMap(app.lookup("dmReqList"), "strSmtRcd");
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
					"left": "275px",
					"width": "115px",
					"height": "25px"
				});
				var output_4 = new cpr.controls.Output("optObjDivRcd");
				output_4.value = "출력용도";
				container.addChild(output_4, {
					"top": "5px",
					"left": "660px",
					"width": "70px",
					"height": "25px"
				});
				var comboBox_3 = new cpr.controls.ComboBox("cbbObjDivRcd");
				comboBox_3.bind("fieldLabel").toExpression("#optChgDivRcd.value");
				comboBox_3.bind("value").toDataMap(app.lookup("dmReqList"), "strPrtObjDivRcd");
				(function(comboBox_3){
					comboBox_3.addItem(new cpr.controls.Item("행정부서", "CC009OG"));
					comboBox_3.addItem(new cpr.controls.Item("학사부서", "CC009SA"));
				})(comboBox_3);
				container.addChild(comboBox_3, {
					"top": "5px",
					"left": "735px",
					"width": "105px",
					"height": "25px"
				});
				var checkBox_1 = new cpr.controls.CheckBox("ckbPageNext");
				checkBox_1.value = "";
				checkBox_1.trueValue = "Y";
				checkBox_1.falseValue = "";
				checkBox_1.text = "학과용";
				checkBox_1.bind("value").toDataMap(app.lookup("dmReqList"), "strPrtPageNextYn");
				container.addChild(checkBox_1, {
					"top": "5px",
					"left": "850px",
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
			
			var embeddedApp_1 = new cpr.controls.EmbeddedApp("emaStdCmnPobjSch");
			if(typeof onEmaStdCmnPobjSchAppReady == "function") {
				embeddedApp_1.addEventListener("app-ready", onEmaStdCmnPobjSchAppReady);
			}
			cpr.core.App.load("app/cmn/impStdCmnPObjSch", function(app) {
				if(app){
					embeddedApp_1.app = app;
				}
			});
			container.addChild(embeddedApp_1, {
				"top": "686px",
				"left": "110px",
				"width": "95px",
				"height": "25px"
			});
			if(typeof onBodyLoad == "function"){
				app.addEventListener("load", onBodyLoad);
			}
		}
	});
	app.title = "extCsrSNotRegListPrt";
	cpr.core.Platform.INSTANCE.register(app);
})();
