/*
 * App URI: app/ccs/extCcsSLectSchdAll
 * Source Location: app/ccs/extCcsSLectSchdAll.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("app/ccs/extCcsSLectSchdAll", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			﻿//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
			/// <xtmlink path="./extCcsSLectSchdAll.xtm"/>
			
			/**
			 * 개설과목관리
			 * @class stdCcsCCurClsFrf
			 * @author 박갑수 at 2016. 2. 4
			 */
			var extCcsSLectSchdAll = function() {
				var moPage = new Page();
				
				// 임포트용 데이터 통신 오브젝트
				var moPObject = new Page();
				
				// 객체검색팝업 호출
				moPObject.moIdsForStdCmnPObjSch = [
				{
					controlId			:	"btnSaCd",
					iCd					:	"",
					iNm					:	"ipbSaNm",
					iObjDivRcd			:	["CC009SA", "CC009OG"],
					iStartObject    	:   "",
					iOtDivRcd			:	"",
					iOtIsTreeView	:	"",
					iLanDivRcd		:	"/root/resOnLoad/strLanDivRcd",
					iKeyDate			:	"/root/keyDateMap/ST_DT",
					iKeyEndDate		:	"",
					oObjDivRcd		:	"/root/reqKey/strSaObjDivRcd",
					oCd					:	"/root/reqKey/strSaCd",
					oCdNm				:	"ipbSaNm",
					oBegDt				:	"",
					oEndDt				:	"",
					oLanDivRcd		:	"",
					func 					:  function(poRtnValue){
						// 검색조건이 있을경우 조회
						var vsSaNm = util.DataMap.getValue(app, "dmReqKey", "strSaNm");			
						if(!ValueUtil.isNull(vsSaNm)){
							// 학사부서 입력시 이수과정목록, 교과그룹목록 GET
							doSpCuList(function(pbSuccess) {
								if (pbSuccess){						
									
								}
							});
						}else {
							// 값 초기화				
							util.Control.setValue(app, "cbbCuCd", "");
							util.Control.setValue(app, "ipbSbNm", "");
							util.DataMap.setValue(app, "dmReqKey", "strSbCd", "");
							
							ExtSelectCtl.deleteAllItem("cbbCuCd");
						}
					}
				}];
				
				
				// 학년도 학기를 원래데이터로 되돌리기위한 변수
				var msSchYearRcd = "";
				var msSmtRcd = "";
				
				/**
				 * @desc import 헤더 초기화
				 * @param 
				 * @return  void
				 * @author 박갑수 at 2016. 2. 4
				 */
				moPage.onLoadImportDone_ImpTitle = function() {
					// import 헤더 초기화
					doHeaderOnLoad();
				};
				
				/**
				 * @desc onLoad 실행
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 2. 4
				 */
				moPage.onModelConstructDone_StdCcsCOpenSubFrf = function() {
					
					
					// 리피트 초기 설정
					//ExtRepeat.init(["rptCcsOpenSub"]);
					
					// 검색조건 초기 설정
			//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
			//		ExtGroup.initSearchBox("grpSearch", ["grpData"]);
					
					// 서브미션 호출
					//strCommand: onLoad 
					util.Submit.send(app, "subOnLoad", function(pbSuccess){
						if(pbSuccess){
							
							util.Control.redraw(app, ["cbbSchYearRcd", "cbbSmtRcd", "cbbCuCd1"]);
							// 학년도 학기값 되돌리기위한 값
							msSchYearRcd = util.DataMap.getValue(app, "dmKeyDateMap", "YEAR");
							msSmtRcd = util.DataMap.getValue(app, "dmKeyDateMap", "SMT");
							
							util.SelectCtl.selectItem(app, "cbbCuCd1", 0);
							
							util.Control.setFocus(app, "ipbSaNm");
						}
					}, true);
				};
				
				/**
				 * @desc [btnSaCd]학사부서명(돋보기버튼) onClick 이벤트
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 2. 4
				 */
				moPage.onClick_BtnSaCd = function(sender) {
					// 객체검색팝업 호출
					doOnClickStdCmnPObjSch(sender);
				};
				
				/**
				 * @desc [ipbSaNm]학사부서명 onValueChanged 이벤트
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 2. 4
				 */
				moPage.onValueChanged_IpbSaNm = function(sender) {
					
					
					// 값변경시 객체검색팝업 호출
					doOnChangeStdCmnPObjSch(sender);
				};
				
				
				
				/**
				 * @desc 이수과정, 교과그룹목록 조회
				 * @param poCallBackFunc 콜백정의, 교과목코드
				 * @return void
				 * @author 박갑수 at 2016. 2. 1
				 */
				function doSpCuList(poCallBackFunc, psCuCd) {
					
					//strCommand: getSaSpCu 
					util.Submit.send(app, "subSpCuList", function(pbSuccess){
						if(pbSuccess){
							util.Control.redraw(app, ["cbbCuCd"]);
							util.SelectCtl.selectItem(app, "cbbCuCd", 0);				
						// 조회 후 콜백함수 수행
						if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
						}
					});
				};
				
				
				
				
				/**
				 * @desc [cbbSchYearRcd]학년도 onValueChanged 이벤트
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 2. 4
				 */
				moPage.onValueChanged_CbbSchYearRcd = function() {
					// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
					doChangeYearSmt("year");
				};
				
				/**
				 * @desc [cbbSmtRcd]학기 onValueChanged 이벤트
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 2. 4
				 */
				moPage.onValueChanged_CbbSmtRcd = function() {
					// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
					doChangeYearSmt("smt");
				};
				
				/**
				 * @desc 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 2. 5
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
				 * @author 박갑수 at 2016. 2. 11
				 */
				moPage.onClick_BtnSearch = function() {
					 
					 
					 // 조회조건 필수 체크
					if(!util.validate(app, ["cbbSchYearRcd", "cbbSmtRcd", "ipbSaNm"])){
						return false;
					}
					
					page.doList();
					
				};
				
				/**
				 * @desc 개설과목목록 조회
				 * @param poCallBackFunc 콜백정의
				 * @return void
				 * @author 박갑수 at 2016. 2. 11
				 */
				function doList() {	
				
					//strCommand: list 
					util.Submit.send(app, "subSaCdList", function(pbSuccess){
						if(pbSuccess){
							
							
							var vsSchYearRcd 	= util.DataMap.getValue(app, "dmKeyDateMap", "YEAR");
							var vsSmtRcd 		= util.DataMap.getValue(app, "dmKeyDateMap", "SMT");
							var vsSaCd			= util.DataMap.getValue(app, "dmReqKey", "strSaCd");
							var vsCuCd			= util.DataMap.getValue(app, "dmReqKey", "strCuCd");
							var vsKeyDate 		= util.DataMap.getValue(app, "dmKeyDateMap", "END_DT");				//--기준일자 
							var vsSaCdList 		= util.DataMap.getValue(app, "dmResList", "strListSaCd");				//--기준일자 
							var vsCuDivRcd		= util.DataMap.getValue(app, "dmReqKey", "strCuDivRcd");
							
			
							var voParam = {
									p_strLanDivRcd 			: msDefaultLocale,	 												// 언어키
									p_strKeyDate 			: vsKeyDate,  														// 기준일
									p_strSchYearRcd	: vsSchYearRcd,  														// 학년도
									p_strSmtRcd 		: vsSmtRcd,  																	// 학기
									p_strSaCd	 	: vsSaCdList,  													      	 			// 부서코드
									p_strCuCd     : vsCuCd,																			// 교과그룸코드						
									p_strCuDivRcd : vsCuDivRcd,																	//--교과그룹구분코드
									p_strMenuId 				: moPageInfo.menuId,												// 메뉴ID
									p_strCheckAuthId 		: moUserInfo.id														// 사용자ID
								};
								
							var voOzFormParam = {
									  TITLE : "강의시간표" //리포트타이틀
									, SUB_TITLE : "서브타이틀" //리포트서브타이틀		
									, FORM_TYPE : "flash"
								};	
								
								util.Report.open(app, "hojReport", "extCcsSLectSchdAll", voOzFormParam, voParam);
						}
					});
					
					
					
					
					
				};
				
				return moPage;
			};;
			// End - User Script
			
			// Header
			var dataSet_1 = new cpr.data.DataSet("dsListCuDivRcd");
			dataSet_1.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_1);
			
			var dataSet_2 = new cpr.data.DataSet("dsDayNightDivRcdList");
			dataSet_2.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_2);
			
			var dataSet_3 = new cpr.data.DataSet("dsSaPostDivRcdList");
			dataSet_3.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_3);
			
			var dataSet_4 = new cpr.data.DataSet("dsEvalMethodRcdList");
			dataSet_4.parseData({
				"columns": [
					{"name": "CD_NM"},
					{"name": "CD"}
				],
				"rows": []
			});
			app.register(dataSet_4);
			
			var dataSet_5 = new cpr.data.DataSet("dsLectTypeRcdList");
			dataSet_5.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_5);
			
			var dataSet_6 = new cpr.data.DataSet("dsCmpDivRcdList");
			dataSet_6.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_6);
			
			var dataSet_7 = new cpr.data.DataSet("dsRelEstTypeCdList");
			dataSet_7.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_7);
			
			var dataSet_8 = new cpr.data.DataSet("dsSbLvlRcdList");
			dataSet_8.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"},
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_8);
			
			var dataSet_9 = new cpr.data.DataSet("dsLectEvalTypeRcd");
			dataSet_9.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_9);
			
			var dataSet_10 = new cpr.data.DataSet("dsReTlsnYnRcdList");
			dataSet_10.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_10);
			
			var dataSet_11 = new cpr.data.DataSet("dsSbTypeRcdList");
			dataSet_11.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_11);
			
			var dataSet_12 = new cpr.data.DataSet("dsRecCiiRcdList");
			dataSet_12.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_12);
			
			var dataSet_13 = new cpr.data.DataSet("dsSbDivRcdList");
			dataSet_13.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_13);
			
			var dataSet_14 = new cpr.data.DataSet("dsSchYearRcdList");
			dataSet_14.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_14);
			
			var dataSet_15 = new cpr.data.DataSet("dsSmtRcdList");
			dataSet_15.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_15);
			
			var dataSet_16 = new cpr.data.DataSet("dsSpList");
			dataSet_16.parseData({
				"columns": [
					{"name": "OBJ_CD_NM"},
					{"name": "OBJ_CD"}
				],
				"rows": []
			});
			app.register(dataSet_16);
			
			var dataSet_17 = new cpr.data.DataSet("dsCuList");
			dataSet_17.parseData({
				"columns": [
					{"name": "OBJ_CD_NM"},
					{"name": "OBJ_CD"},
					{"name": "PATH"}
				],
				"rows": []
			});
			app.register(dataSet_17);
			
			var dataSet_18 = new cpr.data.DataSet("dsCcsOpenSub");
			dataSet_18.parseData({
				"columns": [
					{"name": "SCH_YEAR_RCD"},
					{"name": "SMT_RCD"},
					{"name": "SA_CD"},
					{"name": "SA_CD_NM"},
					{"name": "SA_OBJ_DIV_RCD"},
					{"name": "CU_CD"},
					{"name": "CU_CD_NM"},
					{"name": "CU_OBJ_DIV_RCD"},
					{"name": "SB_CD"},
					{"name": "SB_CD_NM"},
					{"name": "SB_OBJ_DIV_RCD"},
					{"name": "SP_CD"},
					{"name": "SP_CD_NM"},
					{"name": "SP_OBJ_DIV_RCD"},
					{"name": "DIVCLS_CD"},
					{"name": "DIVCLS_NM"},
					{"name": "DIVCLS_SHORT_NM"},
					{"name": "LAN_DIV_RCD"},
					{"name": "USE_LAN_RCD"},
					{"name": "PNT"},
					{"name": "THEO_TC"},
					{"name": "EPAC_TC"},
					{"name": "LECT_TIME_CNT"},
					{"name": "TLSN_REQ_CAPA1"},
					{"name": "TLSN_REQ_CAPA2"},
					{"name": "TLSN_REQ_CAPA3"},
					{"name": "TLSN_REQ_CAPA4"},
					{"name": "SB_DIV_RCD"},
					{"name": "SB_TYPE_RCD"},
					{"name": "SB_CAT_RCD"},
					{"name": "SB_LVL_RCD"},
					{"name": "EVAL_METHOD_RCD"},
					{"name": "REC_SCALE_RCD"},
					{"name": "CMP_DIV_RCD"},
					{"name": "DAY_NIGHT_DIV_RCD"},
					{"name": "LECT_TYPE_RCD"},
					{"name": "LECT_EVAL_TYPE_RCD"},
					{"name": "RE_TLSN_YN_RCD"},
					{"name": "SA_POST_DIV_RCD"},
					{"name": "REL_EST_TYPE_RCD"},
					{"name": "DCL_RCD_CD"},
					{"name": "DCL_RCD_NM"},
					{"name": "TEAM_TEACH_YN"},
					{"name": "LECT_EVAL_SUM_XCP_YN"},
					{"name": "LECT_EVAL_XCP_YN"},
					{"name": "ORI_LECT_YN"},
					{"name": "EXP_YN"},
					{"name": "EXP_RSN"},
					{"name": "PROF_NM"},
					{"name": "LECT_ROOM_NM"},
					{"name": "REF_KEY"}
				],
				"rows": []
			});
			app.register(dataSet_18);
			
			var dataSet_19 = new cpr.data.DataSet("dsFrfCcsOpenSub");
			dataSet_19.parseData({
				"columns": [
					{"name": "SCH_YEAR_RCD"},
					{"name": "SMT_RCD"},
					{"name": "SA_CD"},
					{"name": "SA_CD_NM"},
					{"name": "SA_OBJ_DIV_RCD"},
					{"name": "CU_CD"},
					{"name": "CU_CD_NM"},
					{"name": "CU_OBJ_DIV_RCD"},
					{"name": "SB_CD"},
					{"name": "SB_CD_NM"},
					{"name": "SB_OBJ_DIV_RCD"},
					{"name": "SP_CD"},
					{"name": "SP_CD_NM"},
					{"name": "SP_OBJ_DIV_RCD"},
					{"name": "DIVCLS_CD"},
					{"name": "DIVCLS_NM"},
					{"name": "DIVCLS_SHORT_NM"},
					{"name": "LAN_DIV_RCD"},
					{"name": "USE_LAN_RCD"},
					{"name": "PNT"},
					{"name": "THEO_TC"},
					{"name": "EPAC_TC"},
					{"name": "LECT_TIME_CNT"},
					{"name": "TLSN_REQ_CAPA1"},
					{"name": "TLSN_REQ_CAPA2"},
					{"name": "TLSN_REQ_CAPA3"},
					{"name": "TLSN_REQ_CAPA4"},
					{"name": "SB_DIV_RCD"},
					{"name": "SB_TYPE_RCD"},
					{"name": "SB_CAT_RCD"},
					{"name": "SB_LVL_RCD"},
					{"name": "EVAL_METHOD_RCD"},
					{"name": "REC_SCALE_RCD"},
					{"name": "CMP_DIV_RCD"},
					{"name": "DAY_NIGHT_DIV_RCD"},
					{"name": "LECT_TYPE_RCD"},
					{"name": "LECT_EVAL_TYPE_RCD"},
					{"name": "RE_TLSN_YN_RCD"},
					{"name": "SA_POST_DIV_RCD"},
					{"name": "REL_EST_TYPE_RCD"},
					{"name": "DCL_RCD_CD"},
					{"name": "DCL_RCD_NM"},
					{"name": "TEAM_TEACH_YN"},
					{"name": "LECT_EVAL_SUM_XCP_YN"},
					{"name": "LECT_EVAL_XCP_YN"},
					{"name": "ORI_LECT_YN"},
					{"name": "EXP_YN"},
					{"name": "EXP_RSN"},
					{"name": "PROF_NM"},
					{"name": "LECT_ROOM_NM"},
					{"name": "REF_KEY"}
				],
				"rows": []
			});
			app.register(dataSet_19);
			var dataMap_1 = new cpr.data.DataMap("dmResOnLoad");
			dataMap_1.parseData({
				"columns" : [{
					"name": "strLanDivRcd",
					"dataType": "string"
				}]
			});
			app.register(dataMap_1);
			
			var dataMap_2 = new cpr.data.DataMap("dmResList");
			dataMap_2.parseData({
				"columns" : [{
					"name": "strListSaCd",
					"dataType": "string"
				}]
			});
			app.register(dataMap_2);
			
			var dataMap_3 = new cpr.data.DataMap("dmReqKey");
			dataMap_3.parseData({
				"columns" : [
					{
						"name": "strSaCd",
						"dataType": "string"
					},
					{
						"name": "strSaNm",
						"dataType": "string"
					},
					{
						"name": "strSbCd",
						"dataType": "string"
					},
					{
						"name": "strSbNm",
						"dataType": "string"
					},
					{
						"name": "strSaObjDivRcd",
						"dataType": "string"
					},
					{
						"name": "strSbObjDivRcd",
						"dataType": "string"
					},
					{
						"name": "strRefKey",
						"dataType": "string"
					},
					{
						"name": "strSbLvlRcd",
						"dataType": "string"
					},
					{
						"name": "strCmpDivRcd",
						"dataType": "string"
					},
					{
						"name": "strCuCd",
						"dataType": "string"
					},
					{
						"name": "strCuDivRcd",
						"dataType": "string"
					}
				]
			});
			app.register(dataMap_3);
			
			var dataMap_4 = new cpr.data.DataMap("dmKeyDateMap");
			dataMap_4.parseData({
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
						"name": "ST_DT",
						"dataType": "string"
					},
					{
						"name": "END_DT",
						"dataType": "string"
					}
				]
			});
			app.register(dataMap_4);
			
			var dataMap_5 = new cpr.data.DataMap("dmResPopup");
			dataMap_5.parseData({
				"columns" : [
					{
						"name": "strFrfCmpDivRcd",
						"dataType": "string"
					},
					{
						"name": "strFrfPnt",
						"dataType": "string"
					},
					{
						"name": "strFrfTheoTc",
						"dataType": "string"
					},
					{
						"name": "strFrfEpacTc",
						"dataType": "string"
					},
					{
						"name": "strFrfLectTimeCnt",
						"dataType": "string"
					},
					{
						"name": "strTlsnReqCapa1",
						"dataType": "string"
					},
					{
						"name": "strTlsnReqCapa2",
						"dataType": "string"
					},
					{
						"name": "strTlsnReqCapa3",
						"dataType": "string"
					},
					{
						"name": "strTlsnReqCapa4",
						"dataType": "string"
					}
				]
			});
			app.register(dataMap_5);
			
			var dataMap_6 = new cpr.data.DataMap("dmResDelChk");
			dataMap_6.parseData({
				"columns" : [
					{
						"name": "strTimeSche",
						"dataType": "string"
					},
					{
						"name": "strLectSche",
						"dataType": "string"
					},
					{
						"name": "strRestApp",
						"dataType": "string"
					}
				]
			});
			app.register(dataMap_6);
			var submission_1 = new cpr.protocols.Submission("subOnLoad");
			submission_1.action = "/ccs/ExtCcsSLectSchdAll/";
			submission_1.mediaType = "application/x-www-form-urlencoded";
			submission_1.addResponseData(dataSet_14, false);
			submission_1.addResponseData(dataSet_15, false);
			submission_1.addResponseData(dataMap_4, false);
			submission_1.addResponseData(dataSet_1, false);
			app.register(submission_1);
			
			var submission_2 = new cpr.protocols.Submission("subSpCuList");
			submission_2.action = "/ccs/ExtCcsSLectSchdAll/";
			submission_2.mediaType = "application/x-www-form-urlencoded";
			submission_2.addRequestData(dataMap_3);
			submission_2.addRequestData(dataMap_4);
			submission_2.addResponseData(dataSet_16, false);
			submission_2.addResponseData(dataSet_17, false);
			app.register(submission_2);
			
			var submission_3 = new cpr.protocols.Submission("subSaCdList");
			submission_3.action = "/ccs/ExtCcsSLectSchdAll/";
			submission_3.mediaType = "application/x-www-form-urlencoded";
			submission_3.addRequestData(dataMap_3);
			submission_3.addRequestData(dataMap_4);
			submission_3.addResponseData(dataMap_2, false);
			app.register(submission_3);
			
			var submission_4 = new cpr.protocols.Submission("subDate");
			submission_4.action = "/cmn/StdCmnDateTime/";
			submission_4.mediaType = "application/x-www-form-urlencoded";
			submission_4.addRequestData(dataMap_4);
			submission_4.addResponseData(dataMap_4, false);
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
				button_1.value = "";
				button_1.style.setClasses(["btn-search"]);
				button_1.bind("value").toLanguage("UI-SCR-SCH");
				if(typeof onBtnSearchClick == "function") {
					button_1.addEventListener("click", onBtnSearchClick);
				}
				container.addChild(button_1, {
					"top": "5px",
					"left": "1158px",
					"width": "60px",
					"height": "25px"
				});
				var output_1 = new cpr.controls.Output("optSaNm");
				output_1.value = "";
				output_1.style.setClasses(["require"]);
				output_1.bind("value").toLanguage("UI-DB-SA_NM");
				container.addChild(output_1, {
					"top": "5px",
					"left": "415px",
					"width": "90px",
					"height": "25px"
				});
				var inputBox_1 = new cpr.controls.InputBox("ipbSaNm");
				inputBox_1.maxLength = 100;
				inputBox_1.userAttr({"require": "Y"});
				inputBox_1.bind("fieldLabel").toExpression("#optSaNm.value");
				inputBox_1.bind("value").toDataMap(app.lookup("dmReqKey"), "strSaNm");
				if(typeof onIpbSaNmValueChange == "function") {
					inputBox_1.addEventListener("value-change", onIpbSaNmValueChange);
				}
				container.addChild(inputBox_1, {
					"top": "5px",
					"left": "510px",
					"width": "130px",
					"height": "25px"
				});
				var button_2 = new cpr.controls.Button("btnSaCd");
				button_2.value = "";
				button_2.style.setClasses(["btn-pop-search"]);
				if(typeof onBtnSaCdClick == "function") {
					button_2.addEventListener("click", onBtnSaCdClick);
				}
				container.addChild(button_2, {
					"top": "5px",
					"left": "640px",
					"width": "20px",
					"height": "25px"
				});
				var output_2 = new cpr.controls.Output("optSchYearRcd");
				output_2.value = "";
				output_2.style.setClasses(["require"]);
				output_2.bind("value").toLanguage("UI-GLS-SCH_YEAR");
				container.addChild(output_2, {
					"top": "5px",
					"left": "5px",
					"width": "90px",
					"height": "25px"
				});
				var comboBox_1 = new cpr.controls.ComboBox("cbbSchYearRcd");
				comboBox_1.enabled = false;
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
					"left": "100px",
					"width": "100px",
					"height": "25px"
				});
				var comboBox_2 = new cpr.controls.ComboBox("cbbSmtRcd");
				comboBox_2.enabled = false;
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
					"left": "305px",
					"width": "100px",
					"height": "25px"
				});
				var output_3 = new cpr.controls.Output("optSmtRcd");
				output_3.value = "";
				output_3.style.setClasses(["require"]);
				output_3.bind("value").toLanguage("NLS-DLG-LBL-L002");
				container.addChild(output_3, {
					"top": "5px",
					"left": "210px",
					"width": "90px",
					"height": "25px"
				});
				var output_4 = new cpr.controls.Output("optCuCd");
				output_4.value = "";
				output_4.bind("value").toLanguage("UI-SCR-SUBGRUP");
				container.addChild(output_4, {
					"top": "5px",
					"left": "670px",
					"width": "90px",
					"height": "25px"
				});
				var comboBox_3 = new cpr.controls.ComboBox("cbbCuCd");
				comboBox_3.bind("fieldLabel").toExpression("#optCuCd.value");
				comboBox_3.bind("value").toDataMap(app.lookup("dmReqKey"), "strCuCd");
				(function(comboBox_3){
					comboBox_3.addItem(new cpr.controls.Item("전체", ""));
					comboBox_3.setItemSet(app.lookup("dsCuList"), {
						"label": "OBJ_CD_NM",
						"value": "OBJ_CD"
					});
				})(comboBox_3);
				container.addChild(comboBox_3, {
					"top": "5px",
					"left": "765px",
					"width": "130px",
					"height": "25px"
				});
				var output_5 = new cpr.controls.Output("optCuCd1");
				output_5.value = "";
				output_5.bind("value").toLanguage("UI-SCR-SUBGRUP");
				container.addChild(output_5, {
					"top": "5px",
					"left": "905px",
					"width": "90px",
					"height": "25px"
				});
				var comboBox_4 = new cpr.controls.ComboBox("cbbCuCd1");
				comboBox_4.bind("fieldLabel").toExpression("#optCuCd.value");
				comboBox_4.bind("value").toDataMap(app.lookup("dmReqKey"), "strCuDivRcd");
				(function(comboBox_4){
					comboBox_4.addItem(new cpr.controls.Item("전체", ""));
					comboBox_4.setItemSet(app.lookup("dsListCuDivRcd"), {
						"label": "CD_NM",
						"value": "CD"
					});
				})(comboBox_4);
				container.addChild(comboBox_4, {
					"top": "5px",
					"left": "1000px",
					"width": "130px",
					"height": "25px"
				});
			})(group_1);
			container.addChild(group_1, {
				"top": "35px",
				"left": "5px",
				"width": "1225px",
				"height": "32"
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
			
			var group_2 = new cpr.controls.Container("grpData");
			// Layout
			var xYLayout_3 = new cpr.controls.layouts.XYLayout();
			group_2.setLayout(xYLayout_3);
			(function(container){
				var userDefinedControl_2 = new udc.com.comFormTitle();
				userDefinedControl_2.bind("title").toLanguage("UI-SCR-TCHRLICISSUELIST");
				container.addChild(userDefinedControl_2, {
					"top": "5px",
					"left": "5px",
					"width": "200px",
					"height": "25px"
				});
				var hTMLObject_1 = new cpr.controls.HTMLObject("hojReport");
				container.addChild(hTMLObject_1, {
					"top": "30px",
					"left": "5px",
					"width": "1213",
					"height": "565px"
				});
			})(group_2);
			container.addChild(group_2, {
				"top": "72px",
				"left": "5px",
				"width": "1225px",
				"height": "600px"
			});
			if(typeof onBodyLoad == "function"){
				app.addEventListener("load", onBodyLoad);
			}
		}
	});
	app.title = "개설과목관리";
	cpr.core.Platform.INSTANCE.register(app);
})();
