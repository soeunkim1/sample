/*
 * App URI: app/ccs/extCcsSLectTimeDaySche
 * Source Location: app/ccs/extCcsSLectTimeDaySche.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("app/ccs/extCcsSLectTimeDaySche", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			﻿//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
			/// <xtmlink path="./extCcsSLectTimeDaySche.xtm"/>
			
			/**
			 * 일자별 강의시간표
			 * @class extCcsSLectTimeDaySche
			 * @author 박갑수 at 2016. 8. 10
			 */
			var extCcsSLectTimeDaySche = function() {
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
						iKeyDate			:	"/root/keyDateMap/ST_DT",
						iKeyEndDate		:	"",
						oObjDivRcd		:	"/root/reqKey/strObjDivRcd",
						oCd					:	"/root/reqKey/strObjCd",
						oCdNm				:	"ipbSaCdNm",
						oBegDt				:	"",
						oEndDt				:	"",
						oLanDivRcd		:	"",
						func 					:  function(){}
					}
				];
				
				// 강의실 검색
				 moPObject.moIdsForStdCcsPRoomPopup = [
					{
						 controlId					: "btnLectRoomCd",			
						 iLanDivRcd				: "/root/resOnLoad/strLanDivRcd",			
						 iBdCd						: "",			
						 iLectRoomNm			: "ipbLectRoomNm",		
						 iKeyDate					: "/root/keyDateMap/END_DT",			// (필수) 기준일
						 iLectDate					: "",			// (선택) 강의일자
						 iStTime					: "", 			// (선택) 시작시간
						 iEndTime					: "",			// (선택) 종료시간
						 iVacantRoomYn		: "",			// (선택) 빈강의실여부
						 oLectRoomCd			: "/root/reqKey/strLectRoomCd",			// 강의실코드
						 oBdCd						: "",			// 건물코드
						 oLectRoomNm			: "ipbLectRoomNm",
						 oSpvsDeptCd			: "",			
						 oObjDivRcd				: "",			
						 oLectRoomShortNm	: "",			
						 oPrpRcd					: "",			
						 oLectUseYn				: "",			// 강의실사용여부
						 oAccNop					: "",			
						 oFlrCnt						: "",			
						 oRemark					: "",			
						 oBdNm					: "",			// 건물명
						 func : function(poParam) {}
					 }
				 ];
				
				// 학년도 ,학기, 출력순서를 원래데이터로 되돌리기위한 변수
				var msSchYearRcd = "";
				var msSmtRcd = "";
				
				/**
				 * @desc import 헤더 초기화
				 * @param 
				 * @return  void
				 * @author 박갑수 at 2016. 8. 10
				 */
				moPage.onLoadImportDone_ImpTitle = function() {
					doHeaderOnLoad();
				};
				
				/**
				 * @desc onLoad 실행
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 8. 10
				 */
				moPage.onModelConstructDone_ExtCcsSLectTimeDaySche = function() {
					// 검색조건 초기 설정
			//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
			//		ExtGroup.initSearchBox("grpSearch", ["grpData"]);
					
					// 서브미션 실행 (실패시 cover page)
					//strCommand: onLoad 
					util.Submit.send(app, "subOnLoad", function(pbSuccess){
						if(pbSuccess){
							
							// 조회조건 컨트롤 refresh(학년도, 학기)
							util.Control.redraw(app, ["cbbSchYearRcd", "cbbSmtRcd", "ipbSaCdNm", "dipStDt", "dipEndDt", "cbbBdCd", "cbbStLttm", "cbbEndLttm", "cbbPrtOrd"]);
							
							// 조회조건초기값 세팅
							util.Control.setValue(app, "dipStDt", util.DataMap.getValue(app, "dmKeyDateMap", "ST_DT"));
							util.Control.setValue(app, "dipEndDt", util.DataMap.getValue(app, "dmKeyDateMap", "END_DT"));
							
							util.SelectCtl.selectItem(app, "cbbPrtOrd", 1);
							
							setStdCmnPObjSchObjInfo();
							
						}
					}, true);
				};
				
				/**
				 * @desc [cbbSchYearRcd]학년도 onValueChanged 이벤트
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 8. 10
				 */
				moPage.onValueChanged_CbbSchYearRcd = function() {
					// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
					doChangeYearSmt("year");
					
					// 조회조건 초기화
					doClearSch();
				};
				
				/**
				 * @desc [cbbSmtRcd]학기 onValueChanged 이벤트
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 8. 10
				 */
				moPage.onValueChanged_CbbSmtRcd = function() {
					// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
					doChangeYearSmt("smt");
					
					// 조회조건 초기화
					doClearSch();
				};
				
				/**
				 * @desc 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 8. 10
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
				 * @desc 조회조건 소속 초기화
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 8. 10
				 */
				function doClearSch(){
					util.Control.setValue(app, "ipbSaCdNm", "");
					util.DataMap.setValue(app, "dmReqKey", "strObjCd", "");
					util.DataMap.setValue(app, "dmReqKey", "strObjDivRcd", "");
					util.DataMap.setValue(app, "dmReqKey", "strListSaCd", "");
				};
				
				/**
				 * @desc [btnSaCdNm]소속(돋보기버튼) onClick 이벤트
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 8. 10
				 */
				moPage.onClick_BtnSaCdNm = function(sender) {
					// 객체검색팝업 호출
					doOnClickStdCmnPObjSch(sender);
				};
				
				/**
				 * @desc [ipbSaCdNm]소속 onValueChanged 이벤트
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 8. 10
				 */
				moPage.onValueChanged_IpbSaCdNm = function(sender) {
					// 값변경시 객체검색팝업 호출
					doOnChangeStdCmnPObjSch(sender);
				};
				
				/**
				 * @desc [dipStDt]시작일자 onValueChanged 이벤트
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 8. 10
				 */
				moPage.onValueChanged_DipStDt = function() {
					if(!doCheckDate("ST_DT")){
						util.Control.setValue(app, "dipStDt", "");
					}
				};
				
				/**
				 * @desc [dipEndDt]종료일자 onValueChanged 이벤트
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 8. 10
				 */
				moPage.onValueChanged_DipEndDt = function() {
					if( !doCheckDate("END_DT")){
						util.Control.setValue(app, "dipEndDt", "");
					}
				};
			
				/**
				 * @desc 시작일이 종료일보다 크거나 종료일이 시작일보다 작은지 검사
				 * @param psColNm		(필수) 날짜컬럼명
				 * @return boolean
				 * @author 박갑수 at 2016. 8. 10
				 */
				function doCheckDate(psColNm){
					// 유효성 true or false
					var vbValid = true;
			
					// 시작일자
					var vsStDt = util.Control.getValue(app, "dipStDt").substring(0, 8);
					// 종료일자
					var vsEndDt = util.Control.getValue(app, "dipEndDt").substring(0, 8);
					
					// 시작일 유효성 체크
					if(psColNm == "ST_DT"){
						if(!ValueUtil.isNull(vsEndDt) && vsStDt > vsEndDt){
							// "시작일이 종료일 보다 클 수 없습니다." 메시지 출력
							util.Msg.alert("NLS-CSS-M063");
							vbValid = false;
							return vbValid;
						}
			
					// 종료일 유효성 체크
					} else if(psColNm == "END_DT"){
						if(!ValueUtil.isNull(vsStDt) && vsStDt > vsEndDt){
							util.Msg.alert("NLS-CSS-M064");
							vbValid = false;
							return vbValid;
						}
					}
					
					return vbValid;
				};
				
				/**
				 * @desc [btnLectRoomCd]강의실(돋보기) onClick 이벤트
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 8. 10
				 */
				moPage.onClick_BtnLectRoomCd = function(sender) {
					// 강의실검색팝업 호출
					doOnClickStdCcsPRoomPopup(sender);
				};
				
				/**
				 * @desc [ipbLectRoomNm]강의실 onValueChanged 이벤트
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 8. 10
				 */
				moPage.onValueChanged_IpbLectRoomNm = function(sender) {
					 // 값변경시 강의실검색팝업 호출
					doOnChangeStdCcsPRoomPopup(sender);
				};
				
				/**
				 * @desc [cbbStLttm]시작교시 onValueChanged 이벤트
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 8. 10
				 */
				moPage.onValueChanged_CbbStLttm = function() {
					if( !doCheckLttm("ST_LTTM")){
						util.Control.setValue(app, "cbbStLttm", "");
					}
				};
				
				/**
				 * @desc [cbbEndLttm]종료교시 onValueChanged 이벤트
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 8. 10
				 */
				moPage.onValueChanged_CbbEndLttm = function() {
					if( !doCheckLttm("END_LTTM")){
						util.Control.setValue(app, "cbbEndLttm", "");
					}
				};
				
				/**
				 * @desc 시작교시 종료교시 유효성체크
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 2. 26
				 */
				function doCheckLttm(psColId){
					// 유효성 true or false
					var vbValid = true;
			
					// 시작일자
					var vsStLttm = util.Control.getValue(app, "cbbStLttm");
					// 종료일자
					var vsEndLttm = util.Control.getValue(app, "cbbEndLttm");
					
					// 시작교시 종료교시 유효성 체크
					if(!ValueUtil.isNull(vsStLttm) && !ValueUtil.isNull(vsEndLttm)){
						if(Number(vsStLttm) > Number(vsEndLttm)){
							
							//  "@1 의 시간은 @2 의 시간 보다 빠를 수 없습니다." 메시지
							util.Msg.alert("NLS-CCS-M008", ["종료교시", "시작교시"]);
							
							vbValid = false;
							return vbValid;
						}
					}
					
					return vbValid;
				};
				
				/**
				 * @desc [btnSearch]조회 onClick 이벤트
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 8. 10
				 */
				moPage.onClick_BtnSearch = function() {
					
					// 조회조건 필수 체크
					if(!util.validate(app, ["cbbSchYearRcd", "cbbSmtRcd", "ipbSaCdNm", "dipStDt", "dipEndDt", "cbbPrtOrd"])){
						return false;
					}
					
					//strCommand: list 
					util.Submit.send(app, "subList", function(pbSuccess){
						if(pbSuccess){
							
							var vsSchYearRcd = util.Control.getValue(app, "cbbSchYearRcd");
							var vsSmtRcd = util.Control.getValue(app, "cbbSmtRcd");
							
							var voParam = {
									p_strLanDivRcd 		: util.DataMap.getValue(app, "dmResOnLoad", "strLanDivRcd"),	// 언어키
									p_strKeyDate 		: util.DataMap.getValue(app, "dmKeyDateMap", "END_DT"),		// 기준일자
									p_strSchYearRcd 	: vsSchYearRcd,															// 학년도코드
									p_strSmtRcd 			: vsSmtRcd,																	// 학기코드
									p_strListSaCd		: util.DataMap.getValue(app, "dmReqKey", "strListSaCd"),			// 학사부서코드 In조건용
									p_strStDt				: util.Control.getValue(app, "dipStDt"),										// 시작일자
									p_strEndDt				: util.Control.getValue(app, "dipEndDt"),									// 종료일자
									p_strBdCd				: util.Control.getValue(app, "cbbBdCd"),									// 건물
									p_strLectRoomCd	: util.DataMap.getValue(app, "dmReqKey", "strLectRoomCd"),		// 강의실코드
									p_strStLttm			: util.Control.getValue(app, "cbbStLttm"),									// 시작교시
									p_strEndLttm			: util.Control.getValue(app, "cbbEndLttm"),								// 종료교시
									p_strPrtOrd			: util.Control.getValue(app, "cbbPrtOrd"),									// 정렬순서
									p_strCheckAuthId 	: moUserInfo.id																// 사용자ID
							};
							
							var vsTitle = "일자별 강의시간표";
							
							var voOzFormParam = {
								  TITLE 		 : vsTitle			// 리포트타이틀
								, SUB_TITLE 	 : "" 					// 리포트서브타이틀		
								, FORM_TYPE : "flash"
							};
							
							util.Report.open(app, "hojReport", "extCcsSLectTimeDaySche", voOzFormParam, voParam);
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
					{"name": "CD_NM"}
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
			
			var dataSet_3 = new cpr.data.DataSet("dsLttmList");
			dataSet_3.parseData({
				"columns": [
					{"name": "LTTM"},
					{"name": "LTTM_NM"}
				],
				"rows": []
			});
			app.register(dataSet_3);
			
			var dataSet_4 = new cpr.data.DataSet("dsBdList");
			dataSet_4.parseData({
				"columns": [
					{"name": "BD_CD"},
					{"name": "BD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_4);
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
						"name": "strStDt",
						"dataType": "string"
					},
					{
						"name": "strEndDt",
						"dataType": "string"
					},
					{
						"name": "strBdCd",
						"dataType": "string"
					},
					{
						"name": "strLectRoomCd",
						"dataType": "string"
					},
					{
						"name": "strLectRoomNm",
						"dataType": "string"
					},
					{
						"name": "strStLttm",
						"dataType": "string"
					},
					{
						"name": "strEndLttm",
						"dataType": "string"
					},
					{
						"name": "strPrtOrd",
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
			submission_1.action = "/ccs/ExtCcsLectTimeDaySche/";
			submission_1.mediaType = "application/x-www-form-urlencoded";
			submission_1.addResponseData(dataSet_2, false);
			submission_1.addResponseData(dataSet_1, false);
			submission_1.addResponseData(dataMap_3, false);
			submission_1.addResponseData(dataMap_1, false);
			submission_1.addResponseData(dataSet_4, false);
			submission_1.addResponseData(dataSet_3, false);
			app.register(submission_1);
			
			var submission_2 = new cpr.protocols.Submission("subList");
			submission_2.action = "/ccs/ExtCcsLectTimeDaySche/";
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
			var embeddedApp_1 = new cpr.controls.EmbeddedApp("emaStdCmnPobjSch");
			cpr.core.App.load("app/cmn/impStdCmnPObjSch", function(app) {
				if(app){
					embeddedApp_1.app = app;
				}
			});
			container.addChild(embeddedApp_1, {
				"top": "675px",
				"left": "5px",
				"width": "100px",
				"height": "25px"
			});
			
			var userDefinedControl_1 = new udc.com.appHeader("appheader1");
			container.addChild(userDefinedControl_1, {
				"top": "5px",
				"right": "5px",
				"left": "5px",
				"height": "25px"
			});
			
			var group_1 = new cpr.controls.Container("grpData");
			// Layout
			var xYLayout_2 = new cpr.controls.layouts.XYLayout();
			group_1.setLayout(xYLayout_2);
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
					"height": "538px"
				});
			})(group_1);
			container.addChild(group_1, {
				"top": "97px",
				"left": "5px",
				"width": "1225px",
				"height": "573px"
			});
			
			var group_2 = new cpr.controls.Container("grpSearch");
			group_2.style.setClasses(["search-box"]);
			// Layout
			var xYLayout_3 = new cpr.controls.layouts.XYLayout();
			group_2.setLayout(xYLayout_3);
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
					"width": "110px",
					"height": "25px"
				});
				var output_2 = new cpr.controls.Output("optSmtRcd");
				output_2.value = "";
				output_2.style.setClasses(["require"]);
				output_2.bind("value").toLanguage("UI-GLS-SMT");
				container.addChild(output_2, {
					"top": "5px",
					"left": "210px",
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
					"left": "295px",
					"width": "150px",
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
					"left": "540px",
					"width": "120px",
					"height": "25px"
				});
				var output_3 = new cpr.controls.Output("optSaCdNm");
				output_3.value = "";
				output_3.style.setClasses(["require"]);
				output_3.bind("value").toLanguage("UI-GLS-ASGN");
				container.addChild(output_3, {
					"top": "5px",
					"left": "455px",
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
					"left": "660px",
					"width": "20px",
					"height": "25px"
				});
				var output_4 = new cpr.controls.Output("optBdCd");
				output_4.value = "";
				output_4.bind("value").toLanguage("UI-GLS-SCH_YEAR");
				container.addChild(output_4, {
					"top": "30px",
					"left": "5px",
					"width": "80px",
					"height": "25px"
				});
				var comboBox_3 = new cpr.controls.ComboBox("cbbBdCd");
				comboBox_3.bind("fieldLabel").toExpression("#optBdCd.value");
				comboBox_3.bind("value").toDataMap(app.lookup("dmReqKey"), "strBdCd");
				(function(comboBox_3){
					comboBox_3.addItem(new cpr.controls.Item("전체", ""));
					comboBox_3.setItemSet(app.lookup("dsBdList"), {
						"label": "BD_NM",
						"value": "BD_CD"
					});
				})(comboBox_3);
				container.addChild(comboBox_3, {
					"top": "30px",
					"left": "90px",
					"width": "110px",
					"height": "25px"
				});
				var button_3 = new cpr.controls.Button("btnLectRoomCd");
				button_3.value = "";
				button_3.style.setClasses(["btn-pop-search"]);
				if(typeof onBtnLectRoomCdClick == "function") {
					button_3.addEventListener("click", onBtnLectRoomCdClick);
				}
				container.addChild(button_3, {
					"top": "30px",
					"left": "425px",
					"width": "20px",
					"height": "25px"
				});
				var inputBox_2 = new cpr.controls.InputBox("ipbLectRoomNm");
				inputBox_2.maxLength = 100;
				inputBox_2.bind("fieldLabel").toExpression("#optLectRoomNm.value");
				inputBox_2.bind("value").toDataMap(app.lookup("dmReqKey"), "strLectRoomNm");
				if(typeof onIpbLectRoomNmValueChange == "function") {
					inputBox_2.addEventListener("value-change", onIpbLectRoomNmValueChange);
				}
				container.addChild(inputBox_2, {
					"top": "30px",
					"left": "295px",
					"width": "130px",
					"height": "25px"
				});
				var output_5 = new cpr.controls.Output("optLectRoomNm");
				output_5.value = "";
				output_5.bind("value").toLanguage("UI-GLS-ASGN");
				container.addChild(output_5, {
					"top": "30px",
					"left": "210px",
					"width": "80px",
					"height": "25px"
				});
				var output_6 = new cpr.controls.Output("optDt");
				output_6.value = "";
				output_6.style.setClasses(["require"]);
				output_6.bind("value").toLanguage("UI-SCR-LSNTERM");
				container.addChild(output_6, {
					"top": "5px",
					"left": "690px",
					"width": "80px",
					"height": "25px"
				});
				var dateInput_1 = new cpr.controls.DateInput("dipStDt");
				dateInput_1.minDate = new Date(1900, 0, 1);
				dateInput_1.userAttr({"require": "Y"});
				dateInput_1.bind("fieldLabel").toExpression("#시작일자.value");
				dateInput_1.bind("value").toDataMap(app.lookup("dmReqKey"), "strStDt");
				if(typeof onDipStDtValueChange == "function") {
					dateInput_1.addEventListener("value-change", onDipStDtValueChange);
				}
				container.addChild(dateInput_1, {
					"top": "5px",
					"left": "775px",
					"width": "90px",
					"height": "25px"
				});
				var output_7 = new cpr.controls.Output("optDtDiv");
				output_7.value = "~";
				container.addChild(output_7, {
					"top": "5px",
					"left": "867px",
					"width": "15px",
					"height": "25px"
				});
				var dateInput_2 = new cpr.controls.DateInput("dipEndDt");
				dateInput_2.minDate = new Date(1900, 0, 1);
				dateInput_2.userAttr({"require": "Y"});
				dateInput_2.bind("fieldLabel").toExpression("#종료일자.value");
				dateInput_2.bind("value").toDataMap(app.lookup("dmReqKey"), "strEndDt");
				if(typeof onDipEndDtValueChange == "function") {
					dateInput_2.addEventListener("value-change", onDipEndDtValueChange);
				}
				container.addChild(dateInput_2, {
					"top": "5px",
					"left": "885px",
					"width": "90px",
					"height": "25px"
				});
				var output_8 = new cpr.controls.Output("optLttm");
				output_8.value = "";
				output_8.bind("value").toLanguage("UI-GLS-ASGN");
				container.addChild(output_8, {
					"top": "30px",
					"left": "455px",
					"width": "80px",
					"height": "25px"
				});
				var comboBox_4 = new cpr.controls.ComboBox("cbbStLttm");
				comboBox_4.bind("fieldLabel").toExpression("#optLttm.value");
				comboBox_4.bind("value").toDataMap(app.lookup("dmReqKey"), "strStLttm");
				(function(comboBox_4){
					comboBox_4.addItem(new cpr.controls.Item("전체", ""));
					comboBox_4.setItemSet(app.lookup("dsLttmList"), {
						"label": "LTTM_NM",
						"value": "LTTM"
					});
				})(comboBox_4);
				if(typeof onCbbStLttmSelectionChange == "function") {
					comboBox_4.addEventListener("selection-change", onCbbStLttmSelectionChange);
				}
				container.addChild(comboBox_4, {
					"top": "30px",
					"left": "540px",
					"width": "60px",
					"height": "25px"
				});
				var output_9 = new cpr.controls.Output("optLttmDiv");
				output_9.value = "~";
				container.addChild(output_9, {
					"top": "30px",
					"left": "602px",
					"width": "15px",
					"height": "25px"
				});
				var comboBox_5 = new cpr.controls.ComboBox("cbbEndLttm");
				comboBox_5.bind("fieldLabel").toExpression("#optLttm.value");
				comboBox_5.bind("value").toDataMap(app.lookup("dmReqKey"), "strEndLttm");
				(function(comboBox_5){
					comboBox_5.addItem(new cpr.controls.Item("전체", ""));
					comboBox_5.setItemSet(app.lookup("dsLttmList"), {
						"label": "LTTM_NM",
						"value": "LTTM"
					});
				})(comboBox_5);
				if(typeof onCbbEndLttmSelectionChange == "function") {
					comboBox_5.addEventListener("selection-change", onCbbEndLttmSelectionChange);
				}
				container.addChild(comboBox_5, {
					"top": "30px",
					"left": "616px",
					"width": "60px",
					"height": "25px"
				});
				var output_10 = new cpr.controls.Output("optPrtOrd");
				output_10.value = "";
				output_10.style.setClasses(["require"]);
				output_10.bind("value").toLanguage("UI-GLS-ASGN");
				container.addChild(output_10, {
					"top": "30px",
					"left": "690px",
					"width": "80px",
					"height": "25px"
				});
				var comboBox_6 = new cpr.controls.ComboBox("cbbPrtOrd");
				comboBox_6.userAttr({"require": "Y"});
				comboBox_6.bind("fieldLabel").toExpression("#optPrtOrd.value");
				comboBox_6.bind("value").toDataMap(app.lookup("dmReqKey"), "strPrtOrd");
				(function(comboBox_6){
					comboBox_6.addItem(new cpr.controls.Item("건물+강의실+시작교시", "ROM.BD_CD, ROM.LECT_ROOM_CD, DAY.ST_LTTM"));
					comboBox_6.addItem(new cpr.controls.Item("건물+시작교시+강의실", "ROM.BD_CD, DAY.ST_LTTM, ROM.LECT_ROOM_CD"));
					comboBox_6.addItem(new cpr.controls.Item("시작교시", "DAY.ST_LTTM"));
					comboBox_6.addItem(new cpr.controls.Item("종료교시", "DAY.END_LTTM"));
					comboBox_6.addItem(new cpr.controls.Item("선택", ""));
				})(comboBox_6);
				container.addChild(comboBox_6, {
					"top": "30px",
					"left": "775px",
					"width": "200px",
					"height": "25px"
				});
			})(group_2);
			container.addChild(group_2, {
				"top": "35px",
				"left": "5px",
				"width": "1225px",
				"height": "57px"
			});
			
			var embeddedApp_2 = new cpr.controls.EmbeddedApp("emaStdCcsPRoomPopup");
			cpr.core.App.load("app/ccs/impStdCcsPRoomPopup", function(app) {
				if(app){
					embeddedApp_2.app = app;
				}
			});
			container.addChild(embeddedApp_2, {
				"top": "675px",
				"left": "115px",
				"width": "100px",
				"height": "25px"
			});
			if(typeof onBodyLoad == "function"){
				app.addEventListener("load", onBodyLoad);
			}
		}
	});
	app.title = "일자별 강의시간표";
	cpr.core.Platform.INSTANCE.register(app);
})();