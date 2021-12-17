/*
 * App URI: app/csr/extCsrSShregSheetPrt
 * Source Location: app/csr/extCsrSShregSheetPrt.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("app/csr/extCsrSShregSheetPrt", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			﻿//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
			///<xtmlink path="./extCsrSShregSheetPrt.xtm"/>
			
			var extCsrSShregSheetPrt = function() {
			
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
				 * 학생검색팝업 관련 설정사항
				 * 설정가능 유형 : 
				 *   1. 인스턴스((/root/시작))
				 *   2. 그리드의 셀 (ghc시작)
				 *   3. 컨트롤 id
				 * 각 변수별 설명
				 *  iXXX : 팝업으로 input 전달될 파라미터
				 *  oXXX : 팝업에서 선택한 값을 받을 컬럼 아이디
				 *  1. controlId 			: 최초 이벤트의 버튼이나 그리드 id	(필수)
				 *  2. iStudNo 			: 검색조건 학번								(선택) (값이 존재할 경우 4자리 이상)
				 *  3. iStudId 				: 검색조건 학번오브젝트					(선택)
				 *  4. iStudNm 			: 이름        									(선택) (값이 존재할 경우 2자리 이상)
				 *  5. iKeyDate 			: 기준일 										(필수)
				 *  6. iObjDivRcd 		: 객체구분코드 								(선택)
				 *  7. iObjCd 				: 부서코드										(선택)
				 *  8. iObjNm 			: 부서명											(선택) 
				 *  10. iStatRcd			: 학적상태										(선택) 
				 *  11. iStudDivRcd		: 학생구분										(선택) 
				 *  12. oStudId			: 학번오브젝트
				 *  13. oStudNo 			: 학번
				 *  14. oStudNm 		: 이름
				 *  15. oStatNm 			: 학적상태명
				 *  16. oStatRcd 			: 학적상태코드
				 *  17. oProcRslt 		: 진급학기
				 *  18. oProcRsltYear 	: 진급학년
				 *  19. oSaCd 			: 학사부서코드명
				 *  20. oSaNm 			: 학사부서명
				 *  21. oSpCd 			: 이수과정코드명
				 *  22. oSpNm 			: 이수과정명
				 *  23. oOgCd 			: 행정부서코드명
				 *  24. oOgNm 			: 행정부서명
				 *  25. oStudDivRcd		: 학생구분코드
				 *  26. oStudDivNm		: 학생구분명
				 *  27. oBirthday			: 생년월일
				 *  28. oGenderRcd		: 성별코드
				 *  29. oGenderNm		: 성별명
				 *  30. func 				: 팝업에서 선택한 값을 받은 후 추가 로직이 필요한 경우 함수 작성
				 */
				moPObject.moIdsForStdCsrPStSearch = [
				{
					controlId 					: "btnPopStudSearch",
					iStudNo 					: "ipbStudNo",	
					iStudId 						: "",
					iStudNm 					: "",
					iKeyDate 					: "/root/reqList/strKeyDate",
					iObjDivRcd 				: "",
					iObjCd 						: "",
					iObjNm 					: "",
					iStatRcd 					:"",
					iStudDivRcd				: "",
					oStudId 					: "/root/reqList/strStudId",
					oStudNo 					: "ipbStudNo",
					oStudNm 					: "",
					oStatNm 					: "",
					oStatRcd 					: "",
					oProcRslt 					: "",
					oProcRsltYear 			: "",
					oSaNm						: "",
					oSaCd 						: "",
					oSpNm 					: "",
					oSpCd 						: "",
					oOgNm 					: "",
					oOgCd 						: "",
					oStudDivRcd				: "",
					oStudDivNm				: "",
					oBirthday					: "",
					oGenderRcd				: "",
					oGenderNm				: "",
					func : function() {
					}
				}
				];
				
				/**
				 * @desc Header Import onLoad
				 * @param 
				 * @return void
				 * @author Choi In Seong 2016. 5. 24
				 */
				moPage.onLoadImportDone_ImpTitle = function() {
					doHeaderOnLoad();
				};
			
				/**
				 * @desc 화면 온로드
				 * @param 
				 * @return void
				 * @author Choi In Seong 2016. 5. 24
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
							util.Control.setValue(app, "cbbStatRcd", "CT301ATTE");
							// 조회조건 초기화
							util.Control.redraw(app, ["cbbProcRslt", "cbbNigthDivRcd", "cbbClassRcd", "cbbStatRcd"]);
					
						}
					});
				}
			
				/**
				 * @desc 조회버튼 클릭
				 * @param 
				 * @return void
				 * @author Choi In Seong 2016. 5. 24
				 */
				moPage.onClick_BtnSearch = function() {
					// 조회조건 필수 체크
					if(!util.validate(app, ["ipbDeptNm"])){
						return false;
					}
					
					doList();
				};
				
				/**
				 * @desc 조회
				 * @param 
				 * @return 
				 * @author Choi In Seong 2016. 5. 24
				 */
				function doList(poCallBackFunc) {
			
					// submission call 
					//strCommand: list 
					util.Submit.send(app, "subList",  function(pbSuccess) {
						if(pbSuccess){
							//리퀘스트 셋팅
							var voParam = {
										p_strLanDivRcd          : msDefaultLocale,
										p_strKeyDate             : util.DataMap.getValue(app, "dmReqList", "strKeyDate"),
										p_strDeptCd               : util.DataMap.getValue(app, "dmReqList", "strDeptCd"),
										p_strObjDivRcd           : util.DataMap.getValue(app, "dmReqList", "strObjDivRcd"),
										p_strPgmId                : moPageInfo.pgmId,
										p_strUserId                : moUserInfo.userId,
										p_strClassRcd           : util.DataMap.getValue(app, "dmReqList", "strClassRcd"),
										p_strProcRslt             : util.DataMap.getValue(app, "dmReqList", "strProcRslt"),
										p_strNightDivRcd        : util.DataMap.getValue(app, "dmReqList", "strNightDivRcd"),
										p_strStudId                : util.DataMap.getValue(app, "dmReqList", "strStudId"),
										p_strStatRcd              : util.DataMap.getValue(app, "dmReqList", "strStatRcd"),
										p_strDomain              : Common.getMainWindowUrl(),
										p_strSaList                : util.DataMap.getValue(app, "dmResList", "strSaList")
									}	
									
							 var voOzFormParam = {
									  TITLE :  "학    적    부"  //리포트타이틀
									, SUB_TITLE : "" //리포트서브타이틀		
									, FORM_TYPE : "active"
								};	
									
							util.Report.open(app, "hojReport", "extCsrSShregSheetPrt", voOzFormParam, voParam);
						}
						
						if(util.isFunc(poCallBackFunc)) poFunc(pbSuccess);
					});
					
			
				}
				
				/**
				 * @desc 소속 검색 팝업 호출
				 * @param 
				 * @return void
				 * @author Choi In Seong 2016. 5. 24
				 */
				moPage.onClick_BtnPopSearch = function(sender) {
					doOnClickStdCmnPObjSch(sender);
				}
				
				/**
				 * @desc 소속 검색
				 * @param 
				 * @return void
				 * @author Choi In Seong 2016. 5. 24
				 */	
				moPage.onValueChanged_IpbDeptNm = function(sender) {
					doOnChangeStdCmnPObjSch(sender);
				}
				
				/**
				 * @desc 소속 권한 처리
				 * @param 
				 * @return void
				 * @author Choi In Seong 2016. 5. 24
				 */
				moPage.onLoadImportDone_ImpStdCmnPobjSch = function() {
					setStdCmnPObjSchObjInfo();
				}
				
				/**
				 * @desc 학생조회
				 * @param
				 * @return void
				 * @author Choi In Seong 2016. 5. 24.
				 */
				moPage.onValueChanged_IpbStudNo = function(sender) {
					doOnChangeStdCsrPStSearch(sender);
				}
				
				/**
				 * @desc 학생조회 팝업 호출
				 * @param
				 * @return void
				 * @author Choi In Seong 2016. 5. 24
				 */
				moPage.onClick_BtnPopStudSearch = function(sender) {
					doOnClickStdCsrPStSearch(sender);
				};
				
			
				return moPage;
			};;
			// End - User Script
			
			// Header
			var dataSet_1 = new cpr.data.DataSet("dsSchNightDivRcdList");
			dataSet_1.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"},
					{"name": "CD_PRP3"}
				],
				"rows": []
			});
			app.register(dataSet_1);
			
			var dataSet_2 = new cpr.data.DataSet("dsClassRcdList");
			dataSet_2.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_2);
			
			var dataSet_3 = new cpr.data.DataSet("dsStatRcdList");
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
				"columns" : [{
					"name": "strKeyDate",
					"dataType": "string"
				}]
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
						"name": "strProcRslt",
						"dataType": "string"
					},
					{
						"name": "strNightDivRcd",
						"dataType": "string"
					},
					{
						"name": "strStudNo",
						"dataType": "string"
					},
					{
						"name": "strStudId",
						"dataType": "string"
					},
					{
						"name": "strClassRcd",
						"dataType": "string"
					},
					{
						"name": "strStatRcd",
						"dataType": "string"
					}
				]
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
			submission_1.action = "/csr/ExtCsrShregSheetPrt/";
			submission_1.mediaType = "application/x-www-form-urlencoded";
			submission_1.addResponseData(dataSet_1, false);
			submission_1.addResponseData(dataSet_2, false);
			submission_1.addResponseData(dataMap_1, false);
			submission_1.addResponseData(dataSet_3, false);
			app.register(submission_1);
			
			var submission_2 = new cpr.protocols.Submission("subList");
			submission_2.action = "/csr/ExtCsrShregSheetPrt/";
			submission_2.mediaType = "application/x-www-form-urlencoded";
			submission_2.addRequestData(dataMap_2);
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
				var output_1 = new cpr.controls.Output("optDeptCd");
				output_1.value = "";
				output_1.style.setClasses(["require"]);
				output_1.bind("value").toLanguage("UI-GLS-ASGN");
				container.addChild(output_1, {
					"top": "5px",
					"left": "5px",
					"width": "75px",
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
					"left": "85px",
					"width": "140px",
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
					"left": "226px",
					"width": "20px",
					"height": "25px"
				});
				var inputBox_2 = new cpr.controls.InputBox("ipbDeptCd");
				inputBox_2.visible = false;
				inputBox_2.bind("value").toDataMap(app.lookup("dmReqList"), "strDeptCd");
				container.addChild(inputBox_2, {
					"top": "5px",
					"left": "245px",
					"width": "10px",
					"height": "25px"
				});
				var output_2 = new cpr.controls.Output("optProcRslt");
				output_2.value = "";
				output_2.bind("value").toLanguage("UI-GLS-SCH_YEAR");
				container.addChild(output_2, {
					"top": "5px",
					"left": "255px",
					"width": "75px",
					"height": "25px"
				});
				var comboBox_1 = new cpr.controls.ComboBox("cbbProcRslt");
				comboBox_1.bind("fieldLabel").toExpression("#optProcRslt.value");
				comboBox_1.bind("value").toDataMap(app.lookup("dmReqList"), "strProcRslt");
				(function(comboBox_1){
					comboBox_1.addItem(new cpr.controls.Item("1", "1"));
					comboBox_1.addItem(new cpr.controls.Item("2", "2"));
					comboBox_1.addItem(new cpr.controls.Item("3", "3"));
					comboBox_1.addItem(new cpr.controls.Item("4", "4"));
					comboBox_1.addItem(new cpr.controls.Item("전체", ""));
				})(comboBox_1);
				container.addChild(comboBox_1, {
					"top": "5px",
					"left": "335px",
					"width": "60px",
					"height": "25px"
				});
				var output_3 = new cpr.controls.Output("optNigthDivRcd");
				output_3.value = "";
				output_3.bind("value").toLanguage("UI-GLS-SMT");
				container.addChild(output_3, {
					"top": "5px",
					"left": "405px",
					"width": "75px",
					"height": "25px"
				});
				var comboBox_2 = new cpr.controls.ComboBox("cbbNigthDivRcd");
				comboBox_2.bind("fieldLabel").toExpression("#optNigthDivRcd.value");
				comboBox_2.bind("value").toDataMap(app.lookup("dmReqList"), "strNightDivRcd");
				(function(comboBox_2){
					comboBox_2.addItem(new cpr.controls.Item("전체", ""));
					comboBox_2.setItemSet(app.lookup("dsSchNightDivRcdList"), {
						"label": "CD_NM",
						"value": "CD"
					});
				})(comboBox_2);
				container.addChild(comboBox_2, {
					"top": "5px",
					"left": "485px",
					"width": "80px",
					"height": "25px"
				});
				var output_4 = new cpr.controls.Output("optStudNo");
				output_4.value = "";
				output_4.bind("value").toLanguage("UI-GLS-STUD_ID");
				container.addChild(output_4, {
					"top": "5px",
					"left": "915px",
					"width": "75px",
					"height": "25px"
				});
				var inputBox_3 = new cpr.controls.InputBox("ipbStudNo");
				inputBox_3.bind("fieldLabel").toExpression("#optStudNo.value");
				inputBox_3.bind("value").toDataMap(app.lookup("dmReqList"), "strStudNo");
				if(typeof onIpbStudNoValueChange == "function") {
					inputBox_3.addEventListener("value-change", onIpbStudNoValueChange);
				}
				container.addChild(inputBox_3, {
					"top": "5px",
					"left": "995px",
					"width": "100px",
					"height": "25px"
				});
				var button_3 = new cpr.controls.Button("btnPopStudSearch");
				button_3.value = "";
				button_3.style.setClasses(["btn-pop-search"]);
				if(typeof onBtnPopStudSearchClick == "function") {
					button_3.addEventListener("click", onBtnPopStudSearchClick);
				}
				container.addChild(button_3, {
					"top": "5px",
					"left": "1096px",
					"width": "20px",
					"height": "25px"
				});
				var inputBox_4 = new cpr.controls.InputBox("ipbStudId");
				inputBox_4.visible = false;
				inputBox_4.bind("value").toDataMap(app.lookup("dmReqList"), "strStudId");
				container.addChild(inputBox_4, {
					"top": "5px",
					"left": "1120px",
					"width": "10px",
					"height": "25px"
				});
				var output_5 = new cpr.controls.Output("optClassRcd");
				output_5.value = "";
				output_5.bind("value").toLanguage("UI-GLS-SMT");
				container.addChild(output_5, {
					"top": "5px",
					"left": "575px",
					"width": "75px",
					"height": "25px"
				});
				var comboBox_3 = new cpr.controls.ComboBox("cbbClassRcd");
				comboBox_3.bind("fieldLabel").toExpression("#optClassRcd.value");
				comboBox_3.bind("value").toDataMap(app.lookup("dmReqList"), "strClassRcd");
				(function(comboBox_3){
					comboBox_3.addItem(new cpr.controls.Item("전체", ""));
					comboBox_3.setItemSet(app.lookup("dsClassRcdList"), {
						"label": "CD_NM",
						"value": "CD"
					});
				})(comboBox_3);
				container.addChild(comboBox_3, {
					"top": "5px",
					"left": "655px",
					"width": "80px",
					"height": "25px"
				});
				var output_6 = new cpr.controls.Output("optStatRcd");
				output_6.value = "";
				output_6.bind("value").toLanguage("UI-GLS-SMT");
				container.addChild(output_6, {
					"top": "5px",
					"left": "745px",
					"width": "75px",
					"height": "25px"
				});
				var comboBox_4 = new cpr.controls.ComboBox("cbbStatRcd");
				comboBox_4.bind("fieldLabel").toExpression("#optStatRcd.value");
				comboBox_4.bind("value").toDataMap(app.lookup("dmReqList"), "strStatRcd");
				(function(comboBox_4){
					comboBox_4.addItem(new cpr.controls.Item("전체", ""));
					comboBox_4.setItemSet(app.lookup("dsStatRcdList"), {
						"label": "CD_NM",
						"value": "CD"
					});
				})(comboBox_4);
				container.addChild(comboBox_4, {
					"top": "5px",
					"left": "825px",
					"width": "80px",
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
				"top": "677px",
				"left": "125px",
				"width": "95px",
				"height": "25px"
			});
			
			var embeddedApp_2 = new cpr.controls.EmbeddedApp("emaort2");
			cpr.core.App.load("app/csr/impStdCsrPStSearch", function(app) {
				if(app){
					embeddedApp_2.app = app;
				}
			});
			container.addChild(embeddedApp_2, {
				"top": "677px",
				"left": "240px",
				"width": "100px",
				"height": "25px"
			});
			if(typeof onBodyLoad == "function"){
				app.addEventListener("load", onBodyLoad);
			}
		}
	});
	app.title = "extCsrSShregSheetPrt";
	cpr.core.Platform.INSTANCE.register(app);
})();
