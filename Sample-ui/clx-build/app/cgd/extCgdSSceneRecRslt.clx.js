/*
 * App URI: app/cgd/extCgdSSceneRecRslt
 * Source Location: app/cgd/extCgdSSceneRecRslt.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("app/cgd/extCgdSSceneRecRslt", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			﻿//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
			/// <xtmlink path="./extCgdSSceneRecRslt.xtm"/>
			
			/**
			 * 현장실습결과 점수표
			 * @class extCgdSSceneRecRslt
			 * @author 박갑수 at 2016. 10. 4
			 */
			var extCgdSSceneRecRslt = function() {
				var moPage = new Page();
				
				// 임포트용 데이터 통신 오브젝트
				var moPObject = new Page();
				
				// 객체검색팝업 호출
				moPObject.moIdsForStdCmnPObjSch = [
				{
					controlId			:	"btnSaCdNm",
					iCd					:	"",
					iNm					:	"ipbSaCdNm",
					iObjDivRcd			:	["CC009OG", "CC009SA"],
					iStartObject    	:   "",
					iOtDivRcd			:	"",
					iOtIsTreeView	:	"",
					iLanDivRcd		:	"",
					iKeyDate			:	"/root/keyDateMap/END_DT",
					iKeyEndDate		:	"",
					oObjDivRcd		:	"/root/reqKey/strObjDivRcd",
					oCd					:	"/root/reqKey/strObjCd",
					oCdNm				:	"ipbSaCdNm",
					oBegDt				:	"",
					oEndDt				:	"",
					oLanDivRcd		:	"",
					func 					:  function(){
					}
				}];
				
				
				
				// 교직원검색팝업 호출
				moPObject.moIdsForStdCmnPPrsnSearch = [
				{ 
					 controlId					: "btnProfId",
					 istrStaffGrpAuth			: "",					
					 istrWkdtyAuth			: "true",
					 iKeyDate					: "/root/keyDateMap/END_DT",
					 iStaffNo					: "ipbProfNm",				
					 iStaffGrpRcd				: "",	
					 iStaffGrpRcdLock		: "", 				
					 iStaffSubGrpRcd		: "",				
					 iStaffSubGrpRcdLock	: "",		
					 iStatusRcd				: "",		
					 iRepNm					: "ipbProfNm",		
					 iObjDivRcd				: "",			
					 iObjCd						: "",			
					 iObjNm					: "",		
					 istrObjCdInList			: "",		
					 iWkgrdRcd				: "",			
					  
					 oObjNo					: "/root/reqKey/strProfObjNo",		
					 oStaffNo					: "",				
					 oRepNm					: "ipbProfNm",			
					 oBirthday					: "",			
					 oStatNm					: "",		
					 oStatRcd					: "",			
					 oOgNm					: "",			
					 oOgCd						: "",				
					 oPosNm					: "",				
					 oPosCd					: "",				
					 oWkgrdNm				: "",			
					 oWkgrdRcd				: "",			
					 oStaffGrpRcd				: "",				
					 oStaffSubGrpRcd		: "",			
					 oHoRcd					: "",				
					 oSsn						: "",					
					 oWkdtyRcd				: "",				
					 oWkdtyNm				: "",	
					 func                         : function(poParam){
						 
						 // 값이 없는 경우 초기화
						if(ValueUtil.isNull(util.DataMap.getValue(app, "dmReqKey", "strProfObjNo"))) {
							// 조회조건(담당교과목) 콤보박스 초기화
							doClearChargeSb();
							
						// 값이 있는 경우 담당교과목록 조회
						} else {
							// 담당교과목목록 조회
							doChargeSbList(function(pbSuccess) {
								if(pbSuccess) util.SelectCtl.selectItem(app, "cbbRefKey", 0);
							});
						}
					}
				}];
				
				
				
				// 학년도 ,학기, 출력순서를 원래데이터로 되돌리기위한 변수
				var msSchYearRcd = "";
				var msSmtRcd = "";
				
				/**
				 * @desc import 헤더 초기화
				 * @param 
				 * @return  void
				 * @author 박갑수 at 2016. 10. 4
				 */
				moPage.onLoadImportDone_ImpTitle = function() {
					doHeaderOnLoad();
				};
				
				/**
				 * @desc onLoad 실행
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 10. 4
				 */
				moPage.onModelConstructDone_ExtCgdSSceneRecRslt = function() {
					// 검색조건 초기 설정
			//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
			//		ExtGroup.initSearchBox("grpSearch", ["grpData"]);
					
					// 권한에 따른 조회조건 활성화
					doVisibleCtlByAuth();
					
					// 서브미션 실행 (실패시 cover page)
					//strCommand: onLoad 
					util.Submit.send(app, "subOnLoad", function(pbSuccess){
						if(pbSuccess){
							
							// 조회조건 컨트롤 refresh
							util.Control.redraw(app, ["cbbSchYearRcd", "cbbSmtRcd"]);
							
							
							
							// 전체권한[CC00102]인 경우
								if( moPageInfo.authRngRcd == "CC00102") {
									
									// 라디오버튼 교수명으로 default값 세팅
									util.Control.setValue(app, "rdbProfOrSb", "DEPT");
									page.onValueChanged_RdbProfOrSb();
							
									setStdCmnPObjSchObjInfo();
								}else{
									page.doChargeSbList();
								}
							
						}
					}, true);
				};
				
				
				/**
				 * 권한에 따른 조회조건 활성/비활성 처리
				 * @param 
				 * @type void
				 * @author 양선하 2016.05.10
				 */	
				function doVisibleCtlByAuth() {
					
					// 전체권한[CC00102]이 아닌 경우 컨트롤 비활성화
					if( moPageInfo.authRngRcd == "CC00104") {
						
						util.Control.setValue(app, "rdbProfOrSb", "PROF");
						page.onValueChanged_RdbProfOrSb();
						// 교수명 세팅
						util.Control.setValue(app, "ipbProfNm", moUserInfo.userNm);
						util.DataMap.setValue(app, "dmReqKey", "strProfObjNo", moUserInfo.id);
						util.Control.setStyleAttr(app, "ipbProfNm", "width", 140);
						// 교과목 검색, 교수검색버튼 숨김
						util.Control.setVisible(app, false, ["lblClassRcdNm", "ipbClassRcdNm", "ipbProcRsltYear", "lblProcRsltYear", "btnSaCdNm", "ipbSaCdNm", "lblSaCdNm", "btnProfId"]);
						// 교수명 라벨 보이기
						util.Control.setVisible(app, true, ["lblProfNm"]);
						// 학년도, 학기, 구분(교수별,과목별), 교수명 비활성화
						util.Control.setEnable(app, false, ["cbbSchYearRcd", "cbbSmtRcd", "rdbProfOrSb", "ipbProfNm"]);
						
						
					}
					
				};
				
				
				
				/**
				 * @desc [cbbSchYearRcd]학년도 onValueChanged 이벤트
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 10. 4
				 */
				moPage.onValueChanged_CbbSchYearRcd = function() {
					// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
					doChangeYearSmt("year");
					
					doClearSchCtl();
					
					// 조회조건(담당교과목) 콤보박스 초기화
					doClearChargeSb();
					
					// 조회조건 초기화
					doClearSch();
				};
				
				/**
				 * @desc [cbbSmtRcd]학기 onValueChanged 이벤트
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 10. 4
				 */
				moPage.onValueChanged_CbbSmtRcd = function() {
					// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
					doChangeYearSmt("smt");
					
					doClearSchCtl();
					
					// 조회조건(담당교과목) 콤보박스 초기화
					doClearChargeSb();
					
					// 조회조건 초기화
					doClearSch();
				};
				
				/**
				 * @desc [btnSaCdNm]소속(돋보기버튼) onClick 이벤트
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 10. 4
				 */
				moPage.onClick_BtnSaCdNm = function(sender) {
					// 객체검색팝업 호출
					doOnClickStdCmnPObjSch(sender);
				};
				
				/**
				 * @desc [ipbSaCdNm]소속 onValueChanged 이벤트
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 10. 4
				 */
				moPage.onValueChanged_IpbSaCdNm = function(sender) {
					// 값변경시 객체검색팝업 호출
					doOnChangeStdCmnPObjSch(sender);
				};
				
				/**
				 * @desc 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 10. 4
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
				 * @desc 조회조건 초기화
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 10. 4
				 */
				function doClearSch(){
					util.Control.setValue(app, "ipbSaCdNm", "");
					util.DataMap.setValue(app, "dmReqKey", "strObjCd", "");
					util.DataMap.setValue(app, "dmReqKey", "strObjDivRcd", "");
					util.DataMap.setValue(app, "dmReqKey", "strListSaCd", "");
				};
			
				/**
				 * @desc [btnSearch]조회 onClick 이벤트
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 10. 4
				 */
				moPage.onClick_BtnSearch = function() {
					
					var vsProfOrSb = util.Control.getValue(app, "rdbProfOrSb");
					var vaCtlId = ["cbbSchYearRcd", "cbbSmtRcd", "ipbSaCdNm"];
					if(vsProfOrSb == 'DEPT'){
						vaCtlId = ["cbbSchYearRcd", "cbbSmtRcd", "ipbSaCdNm"];
					}else{
						vaCtlId = ["cbbSchYearRcd", "cbbSmtRcd", "ipbProfNm"];
						util.DataMap.setValue(app, "dmReqKey", "strObjDivRcd", "CC009OG");
						util.DataMap.setValue(app, "dmReqKey", "strObjCd", "1000");
					}
					
					
					// 조회조건 필수 체크
					if(!util.validate(app, vaCtlId)){
						return false;
					}
					
					
					
					
					
					//strCommand: list 
					util.Submit.send(app, "subList", function(pbSuccess){
						if(pbSuccess){
							var vsSchYearRcd = util.Control.getValue(app, "cbbSchYearRcd");
							var vsSmtRcd = util.Control.getValue(app, "cbbSmtRcd");
							var vsSaCdList = util.DataMap.getValue(app, "dmReqKey", "strListSaCd");
							var vsProfObjNo	= util.DataMap.getValue(app, "dmReqKey", "strProfObjNo");
							var vsRefKey		= util.DataMap.getValue(app, "dmReqKey", "strRefKey");
							
							if(vsProfOrSb == 'DEPT'){
								vsProfObjNo = "";
								vsRefKey = "";
								vsSaCdList = "AND CGD.SA_CD IN "+ vsSaCdList;
							}else{
								vsSaCdList = "";
							}
							
							var voParam = {
									p_strLanDivRcd 		: util.DataMap.getValue(app, "dmResOnLoad", "strLanDivRcd"),	// 언어키
									p_strKeyDate 		: util.DataMap.getValue(app, "dmKeyDateMap", "END_DT"),		// 기준일자
									p_strSchYearRcd 	: vsSchYearRcd,															// 학년도코드
									p_strSmtRcd 			: vsSmtRcd,																	// 학기코드
									p_strListSaCd		: vsSaCdList,			// 학사부서코드 In조건용
									p_strProcRsltYear	: util.Control.getValue(app, "ipbProcRsltYear"),							// 학년
									p_strClassRcdNm	: util.Control.getValue(app, "ipbClassRcdNm"),							// 학과반
									p_strProfObjNo		: vsProfObjNo,							// 교수
									p_strRefKey		    : vsRefKey,									//--개설과목
									p_strCheckAuthId 	: moUserInfo.id																// 사용자ID
							};
							
							var vsSchYearRcdNm = ExtInstance.getValue("/root/resOnLoad/schYearRcdList/row", "CD_NM" , "child::CD='"+ vsSchYearRcd +"'");
							var vsSmtRcdNm = ExtInstance.getValue("/root/resOnLoad/smtRcdList/row", "CD_NM" , "child::CD='"+ vsSmtRcd +"'");
						
							var vsTitle = vsSchYearRcdNm + " " + vsSmtRcdNm + " 현장실습결과 점수표";
							
							var voOzFormParam = {
								  TITLE 		 : vsTitle			// 리포트타이틀
								, SUB_TITLE 	 : "" 					// 리포트서브타이틀		
								, FORM_TYPE : "flash"
							};
							
							util.Report.open(app, "hojReport", "extCgdSSceneRecRslt", voOzFormParam, voParam);
						}
					});
				};
				
				
				
				moPage.onValueChanged_RdbProfOrSb = function() {
					
					var vsProfOrSb = util.Control.getValue(app, "rdbProfOrSb");
					var vbVisible = true;
					
					// 소속일 경우
					if(ValueUtil.fixNull(vsProfOrSb) == "DEPT"){
						util.Control.setVisible(app, true, ["lblClassRcdNm", "ipbClassRcdNm", "ipbProcRsltYear", "lblProcRsltYear", "btnSaCdNm", "ipbSaCdNm", "lblSaCdNm"]);
						util.Control.setVisible(app, false, ["lblProfNm", "ipbProfNm", "btnProfId", "cbbRefKey", "lblRefKey"]);
					// 교수일경우
					}else {
						util.Control.setVisible(app, false, ["lblClassRcdNm", "ipbClassRcdNm", "ipbProcRsltYear", "lblProcRsltYear", "btnSaCdNm", "ipbSaCdNm", "lblSaCdNm"]);
						util.Control.setVisible(app, true, ["lblProfNm", "ipbProfNm", "btnProfId", "cbbRefKey", "lblRefKey"]);
					}	
					
				}
				
				
				
				
				moPage.onClick_BtnProfId = function(poSender) {
					doOnClickStdCmnPPrsnSearch(poSender);
				}
				
				moPage.onValueChanged_IpbProfNm = function(poSender) {
					doOnChangeStdCmnPPrsnSearch(poSender);
				}
				
				
				/**
				 * @desc 담당교과목 콤보박스 reset
				 * @param 
				 * @return void
				 * @author 양선하 2016.05. 13
				 */
				function doClearChargeSb() {
					
					ExtSelectCtl.deleteAllItem("cbbRefKey");
					util.Control.setValue(app, "cbbRefKey", "");
				}
				
				
				/**
				 * @desc 조회조건(교수명, 개설과목 담당교과목)항목초기화
				 * @param 
				 * @return void
				 * @author 양선하 2016.05.10
				 */
				function doClearSchCtl() {
					
					// 교수명
					util.Control.setValue(app, "ipbProfNm", "");
					util.DataMap.setValue(app, "dmReqKey", "strProfObjNo", "");
					// 개설과목
					util.Control.setValue(app, "ipbSbNm", "");
					util.DataMap.setValue(app, "dmReqKey", "strRefKey", "");
				};
				
				
				/**
				 * @desc 담당교과목목록 조회
				 * @param {Function} poCallBackFunc 콜백 함수
				 * @return  void
				 * @author 양선하 2016.05.10
				 */
				function doChargeSbList(poCallBackFunc) {
					//strCommand: listChargeSb 
					util.Submit.send(app, "subChargeSbList", function(pbSuccess){
						if(pbSuccess){
							util.Control.redraw(app, "cbbRefKey");
							util.SelectCtl.selectItem(app, "cbbRefKey", 0);
							
							// 조회 후 콜백함수 수행
							if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
						}
					});
				};
				
				
				return moPage;
			};;
			// End - User Script
			
			// Header
			var dataSet_1 = new cpr.data.DataSet("dsSmtRcdList");
			dataSet_1.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"},
					{"name": "CD_PRP1"}
				],
				"rows": []
			});
			app.register(dataSet_1);
			
			var dataSet_2 = new cpr.data.DataSet("dsSchYearRcdList");
			dataSet_2.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_2);
			
			var dataSet_3 = new cpr.data.DataSet("dsChargeSbList");
			dataSet_3.parseData({
				"columns": [
					{"name": "SB_DIVCLS_CD_NM"},
					{"name": "REF_KEY"},
					{"name": "PNT"},
					{"name": "THEO_TC"},
					{"name": "EPAC_TC"},
					{"name": "LECT_TIME_CNT"},
					{"name": "SB_DIV_RCD"},
					{"name": "SB_DIV_RCD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_3);
			var dataMap_1 = new cpr.data.DataMap("dmResOnLoad");
			dataMap_1.parseData({
				"columns" : [{
					"name": "strLanDivRcd",
					"dataType": "string"
				}]
			});
			app.register(dataMap_1);
			
			var dataMap_2 = new cpr.data.DataMap("dmReqKey");
			dataMap_2.parseData({
				"columns" : [
					{
						"name": "strObjNm",
						"dataType": "string"
					},
					{
						"name": "strObjCd",
						"dataType": "string"
					},
					{
						"name": "strObjDivRcd",
						"dataType": "string"
					},
					{
						"name": "strListSaCd",
						"dataType": "string"
					},
					{
						"name": "strProcRsltYear",
						"dataType": "string"
					},
					{
						"name": "strClassRcdNm",
						"dataType": "string"
					},
					{
						"name": "strProfOrSb",
						"dataType": "string"
					},
					{
						"name": "strProfObjNo",
						"dataType": "string"
					},
					{
						"name": "strProfNm",
						"dataType": "string"
					},
					{
						"name": "strRefKey",
						"dataType": "string"
					}
				]
			});
			app.register(dataMap_2);
			
			var dataMap_3 = new cpr.data.DataMap("dmKeyDateMap");
			dataMap_3.parseData({
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
			app.register(dataMap_3);
			var submission_1 = new cpr.protocols.Submission("subOnLoad");
			submission_1.action = "/cgd/ExtCgdSceneRecRslt/";
			submission_1.mediaType = "application/x-www-form-urlencoded";
			submission_1.addResponseData(dataSet_1, false);
			submission_1.addResponseData(dataSet_2, false);
			submission_1.addResponseData(dataMap_3, false);
			submission_1.addResponseData(dataMap_1, false);
			app.register(submission_1);
			
			var submission_2 = new cpr.protocols.Submission("subList");
			submission_2.action = "/cgd/ExtCgdSceneRecRslt/";
			submission_2.mediaType = "application/x-www-form-urlencoded";
			submission_2.addRequestData(dataMap_2);
			submission_2.addRequestData(dataMap_3);
			submission_2.addResponseData(dataMap_2, false);
			app.register(submission_2);
			
			var submission_3 = new cpr.protocols.Submission("subDate");
			submission_3.action = "/cmn/StdCmnDateTime/";
			submission_3.mediaType = "application/x-www-form-urlencoded";
			submission_3.addRequestData(dataMap_3);
			submission_3.addResponseData(dataMap_3, false);
			app.register(submission_3);
			
			var submission_4 = new cpr.protocols.Submission("subChargeSbList");
			submission_4.action = "/cgd/ExtCgdSceneRecRslt/";
			submission_4.mediaType = "application/x-www-form-urlencoded";
			submission_4.addRequestData(dataMap_2);
			submission_4.addRequestData(dataMap_3);
			submission_4.addResponseData(dataSet_3, false);
			app.register(submission_4);
			
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
				button_1.value = "조회";
				button_1.style.setClasses(["btn-search"]);
				if(typeof onBtnSearchClick == "function") {
					button_1.addEventListener("click", onBtnSearchClick);
				}
				container.addChild(button_1, {
					"top": "5px",
					"left": "1158px",
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
					comboBox_1.addItem(new cpr.controls.Item("선택", ""));
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
					comboBox_2.addItem(new cpr.controls.Item("선택", ""));
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
				var inputBox_1 = new cpr.controls.InputBox("ipbSaCdNm");
				inputBox_1.maxLength = 100;
				inputBox_1.userAttr({"require": "Y"});
				inputBox_1.bind("fieldLabel").toExpression("#optSaCdNm.value");
				inputBox_1.bind("value").toDataMap(app.lookup("dmReqKey"), "strObjNm");
				if(typeof onIpbSaCdNmValueChange == "function") {
					inputBox_1.addEventListener("value-change", onIpbSaCdNmValueChange);
				}
				container.addChild(inputBox_1, {
					"top": "5px",
					"left": "630px",
					"width": "120px",
					"height": "25px"
				});
				var output_3 = new cpr.controls.Output("optSaCdNm");
				output_3.value = "";
				output_3.style.setClasses(["require"]);
				output_3.bind("value").toLanguage("UI-GLS-ASGN");
				container.addChild(output_3, {
					"top": "5px",
					"left": "545px",
					"width": "80px",
					"height": "25px"
				});
				var button_2 = new cpr.controls.Button("btnSaCdNm");
				button_2.value = "";
				button_2.style.setClasses(["btn-pop-search"]);
				if(typeof onBtnSaCdNmClick == "function") {
					button_2.addEventListener("click", onBtnSaCdNmClick);
				}
				container.addChild(button_2, {
					"top": "5px",
					"left": "750px",
					"width": "20px",
					"height": "25px"
				});
				var output_4 = new cpr.controls.Output("optProcRsltYear");
				output_4.value = "";
				output_4.bind("value").toLanguage("UI-GLS-ASGN");
				container.addChild(output_4, {
					"top": "5px",
					"left": "780px",
					"width": "60px",
					"height": "25px"
				});
				var numberEditor_1 = new cpr.controls.NumberEditor("ipbProcRsltYear");
				numberEditor_1.format = "9";
				numberEditor_1.bind("fieldLabel").toExpression("#optProcRsltYear.value");
				numberEditor_1.bind("value").toDataMap(app.lookup("dmReqKey"), "strProcRsltYear");
				container.addChild(numberEditor_1, {
					"top": "5px",
					"left": "845px",
					"width": "40px",
					"height": "25px"
				});
				var output_5 = new cpr.controls.Output("optClassRcdNm");
				output_5.value = "";
				output_5.bind("value").toLanguage("UI-GLS-ASGN");
				container.addChild(output_5, {
					"top": "5px",
					"left": "895px",
					"width": "60px",
					"height": "25px"
				});
				var inputBox_2 = new cpr.controls.InputBox("ipbClassRcdNm");
				inputBox_2.maxLength = 1;
				inputBox_2.bind("fieldLabel").toExpression("#optClassRcdNm.value");
				inputBox_2.bind("value").toDataMap(app.lookup("dmReqKey"), "strClassRcdNm");
				container.addChild(inputBox_2, {
					"top": "5px",
					"left": "960px",
					"width": "40px",
					"height": "25px"
				});
				var radioButton_1 = new cpr.controls.RadioButton("rdbProfOrSb");
				radioButton_1.userAttr({"require": "Y"});
				radioButton_1.bind("value").toDataMap(app.lookup("dmReqKey"), "strProfOrSb");
				(function(radioButton_1){
					radioButton_1.addItem(new cpr.controls.Item("소속", "DEPT"));
					radioButton_1.addItem(new cpr.controls.Item("교수", "PROF"));
				})(radioButton_1);
				if(typeof onRdbProfOrSbValueChange == "function") {
					radioButton_1.addEventListener("value-change", onRdbProfOrSbValueChange);
				}
				container.addChild(radioButton_1, {
					"top": "5px",
					"left": "394px",
					"width": "141px",
					"height": "25px"
				});
				var output_6 = new cpr.controls.Output("optProfNm");
				output_6.value = "";
				output_6.style.setClasses(["require"]);
				output_6.bind("value").toLanguage("NLS-SCR-PROFNM");
				container.addChild(output_6, {
					"top": "5px",
					"left": "546px",
					"width": "90px",
					"height": "25px"
				});
				var inputBox_3 = new cpr.controls.InputBox("ipbProfNm");
				inputBox_3.maxLength = 50;
				inputBox_3.userAttr({"require": "Y"});
				inputBox_3.bind("fieldLabel").toExpression("#optProfNm.value");
				inputBox_3.bind("value").toDataMap(app.lookup("dmReqKey"), "strProfNm");
				if(typeof onIpbProfNmValueChange == "function") {
					inputBox_3.addEventListener("value-change", onIpbProfNmValueChange);
				}
				container.addChild(inputBox_3, {
					"top": "5px",
					"left": "641px",
					"width": "119px",
					"height": "25px"
				});
				var button_3 = new cpr.controls.Button("btnProfId");
				button_3.value = "";
				button_3.style.setClasses(["btn-pop-search"]);
				if(typeof onBtnProfIdClick == "function") {
					button_3.addEventListener("click", onBtnProfIdClick);
				}
				container.addChild(button_3, {
					"top": "5px",
					"left": "761px",
					"width": "20px",
					"height": "25px"
				});
				var output_7 = new cpr.controls.Output("optRefKey");
				output_7.value = "";
				output_7.bind("value").toLanguage("UI-SCR-CHARGESUBJ");
				container.addChild(output_7, {
					"top": "5px",
					"left": "790px",
					"width": "80px",
					"height": "25px"
				});
				var comboBox_3 = new cpr.controls.ComboBox("cbbRefKey");
				comboBox_3.bind("fieldLabel").toExpression("#optRefKey.value");
				comboBox_3.bind("value").toDataMap(app.lookup("dmReqKey"), "strRefKey");
				(function(comboBox_3){
					comboBox_3.addItem(new cpr.controls.Item("전체", ""));
					comboBox_3.setItemSet(app.lookup("dsChargeSbList"), {
						"label": "SB_DIVCLS_CD_NM",
						"value": "REF_KEY"
					});
				})(comboBox_3);
				container.addChild(comboBox_3, {
					"top": "5px",
					"left": "875px",
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
					"width": "1213px",
					"height": "563px"
				});
			})(group_2);
			container.addChild(group_2, {
				"top": "72px",
				"left": "5px",
				"width": "1225px",
				"height": "598px"
			});
			
			var embeddedApp_1 = new cpr.controls.EmbeddedApp("emaStdCmnPobjSch");
			cpr.core.App.load("app/cmn/impStdCmnPObjSch", function(app) {
				if(app){
					embeddedApp_1.app = app;
				}
			});
			container.addChild(embeddedApp_1, {
				"top": "680px",
				"left": "5px",
				"width": "100px",
				"height": "25px"
			});
			
			var embeddedApp_2 = new cpr.controls.EmbeddedApp("emaApsStaff");
			cpr.core.App.load("app/cmn/impStdCmnPPrsnSearch", function(app) {
				if(app){
					embeddedApp_2.app = app;
				}
			});
			container.addChild(embeddedApp_2, {
				"top": "680px",
				"left": "115px",
				"width": "100px",
				"height": "25px"
			});
			if(typeof onBodyLoad == "function"){
				app.addEventListener("load", onBodyLoad);
			}
		}
	});
	app.title = "현장실습결과 점수표";
	cpr.core.Platform.INSTANCE.register(app);
})();
