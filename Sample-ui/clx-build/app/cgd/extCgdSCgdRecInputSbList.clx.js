/*
 * App URI: app/cgd/extCgdSCgdRecInputSbList
 * Source Location: app/cgd/extCgdSCgdRecInputSbList.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("app/cgd/extCgdSCgdRecInputSbList", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			﻿//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
			///<xtmlink path="./extCgdSCgdRecInputSbList.xtm"/>
			
			var extCgdSCgdRecInputSbList = function() {
			
				var moPage = new Page();
				var moPObject = new PObject();
				//임포트용 데이터 통신 오브젝트
				
				// 개설과목검색팝업 호출
				moIdsForStdCcsPOpenSubPopup = [
				{
					 controlId					: "btnSbNm",			
					 iDivClsYn					: "",		
					 iLanDivRcd				: "/root/resOnLoad/strLanDivRcd",
					 iKeyDate             		: "/root/reqKey/strKeyDate",
					 iSchYearRcd             : "/root/reqKey/strSchYearRcd",
					 iSmtRcd             		: "/root/reqKey/strSmtRcd",
					 iSaCd        				: "",			
					 iSaNm        				: "",		
					 iSaObjDivRcd       		: "",		
					 iSbCd        				: "",			
					 iSbNm        				: "ipbSbNm",		
					 iCmpDivRcd        		: "",			
					 
					 oSpCd						: "",			
					 oSpNm					: "",			
					 oSbCd						: "/root/reqKey/strSbCd",			
					 oSbNm					: "ipbSbNm",			
					 oSaCd						: "",			
					 oSaNm					: "",			
					 oCuCd						: "",		
					 oCuNm					: "",		
					 oSchYearRcd			: "",		
					 oSmtRcd					: "",	
					 oDivclsCd					: "",	
					 oDivclsNm				: "",	
					 oCmpDivRcd				: "",		
					 oPnt							: "",		
					 oTheoTc					: "",	
					 oEpacTc					: "",	
					 oSbDivRcd				: "",		
					 oSbTypeRcd				: "",		
					 oSaPostDivRcd			: "",		
					 oProfNo					: "",	
					 oProfNm					: "",			
					 oLectRoomNm			: "",		
					 oRefKey					: "/root/reqKey/strRefKey",
					 oSbLvlRcd				: "",
					 oLectTimeCnt			: "",
					 func : function(poParam) {
						// 값이 없는 경우 초기화
						if(ValueUtil.isNull(util.DataMap.getValue(app, "dmReqKey", "strSbCd"))) {
							// 조회조건(담당교과목) 콤보박스 초기화
							doClearChargeSb();
							
						// 값이 있는 경우 담당교과목록 조회
						} else {
							doChargeSbList(function(pbSuccess) {
								// 파라미터 세팅
								if(pbSuccess) {
									
									var voResult = poParam.Result;
									
									if(ValueUtil.isNull(voResult.REF_KEY)) {
										util.SelectCtl.selectItem(app, "cbbSbCd", 0);
									} else {
										util.Control.setValue(app, "cbbSbCd", voResult.REF_KEY);	
									}
								}
						});
					 }
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
								if(pbSuccess) util.SelectCtl.selectItem(app, "cbbSbCd", 0);
							});
						}
					}
				}];
				
					
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
				{
					controlId			:	"btnSaNm",
					iCd					:	"",
					iNm					:	"ipbSaNm",
					iObjDivRcd			:	["CC009SA"],
					iStartObject    	:   "",
					iOtDivRcd			:	"",
					iOtIsTreeView	:	"",
					iLanDivRcd		:	"/root/resOnLoad/strLanDivRcd",
					iKeyDate			:	"/root/reqKey/strKeyDate",
					iKeyEndDate		:	"",
					oObjDivRcd		:	"/root/reqKey/strSaObjDivRcd",
					oCd					:	"/root/reqKey/strSaCd",
					oCdNm				:	"ipbSaNm",
					oBegDt				:	"",
					oEndDt				:	"",
					oLanDivRcd		:	"",
					func 					:  function(poRtnValue){
						// 조회된 학과 정보가 있을 경우 바로 조회
					 	var vsSaNm = util.Control.getValue(app, "ipbSaNm");
						if(!ValueUtil.isNull(vsSaNm)) {
			//				ExtModel.dispatch("btnSearch", "DOMActivate");
						}
					}
				}
				];
				 
				// 학년도 학기를 원래데이터로 되돌리기위한 변수
				var msSchYearRcd = "";
				var msSmtRcd = "";
				
				/**
				 * @desc  Header Import onLoad
				 * @return void
			     * @author 양선하 at 2016.06.22
			     */
				moPage.onLoadImportDone_ImpTitle = function() {
					doHeaderOnLoad();
				};
							
				/**
				 * @desc 화면 초기화
				 * @return 
				 * @author 양선하 2016.06.22
				 */
				moPage.onModelConstructDone_stdNcsSCurPrt04 = function() {
					doOnLoad();
				}
			
			
				/**
				 * @desc 화면 세팅에 필요한 초기값 조회 및 세팅 함수
				 * @return 
				 * @author 양선하 2016.06.22
				 */
				function doOnLoad() {
					
					//검색조건 초기 설정
			//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
			//		ExtGroup.initSearchBox("grpSearch", ["grpData"]);
					
					
					// 권한에 따른 조회조건 활성화
					doVisibleCtlByAuth();
					
					
					//서브미션 실행 (실패시 cover page)
					//strCommand: onLoad 
					util.Submit.send(app, "subOnLoad", function(pbSuccess){
						if(pbSuccess){
							
							//조회조건 컨트롤 refresh(학년도, 학기)
							util.Control.redraw(app, ["cbbSchYearRcd", "cbbSmtRcd", "cbbSbCd"]);
							
							var vsDefYear = util.DataMap.getValue(app, "dmKeyDateMap", "YEAR");
							var vsDefSmt = util.DataMap.getValue(app, "dmKeyDateMap", "SMT");
							var vsKeyDate = util.DataMap.getValue(app, "dmKeyDateMap", "END_DT");
							
							if(ValueUtil.isNull(vsDefYear)) {
								// 콤보박스 첫 번째 값 세팅
								util.SelectCtl.selectItem(app, "cbbSchYearRcd", 0);
							} else {
								msSchYearRcd = vsDefYear;
								//NCS학년도로 기본 셋팅
								util.Control.setValue(app, "cbbSchYearRcd",vsDefYear);
							}
							
							if(ValueUtil.isNull(vsDefSmt)) {
								// 콤보박스 첫 번째 값 세팅
								util.SelectCtl.selectItem(app, "cbbSmtRcd", 0);
							} else {
								msSchYearRcd = vsDefSmt;
								//NCS학기로 기본 셋팅
								util.Control.setValue(app, "cbbSmtRcd",vsDefSmt);
							}
							
							// 기준일 세팅
							util.DataMap.setValue(app, "dmRoot", "reqKey", "strKeyDate", vsKeyDate);
							
							// 라디오버튼 교수명으로 default값 세팅
								util.Control.setValue(app, "rdbProfOrSb", "PROF");
								
							// 전체권한[CC00102]인 경우
							if( moPageInfo.authRngRcd == "CC00104") {
								// 담당교과목 콤보박스 첫 번째 값 세팅
								util.SelectCtl.selectItem(app, "cbbSbCd", 0);
								
							} else {
								//교수명 포커싱
								util.Control.setFocus(app, "ipbProfNm");
							}
								
								
							
						}
					});		
				}
				
				
				
				/**
				 * 권한에 따른 조회조건 활성/비활성 처리
				 * @param 
				 * @type void
				 * @author 양선하 2016.05.10
				 */	
				function doVisibleCtlByAuth() {
					
					// 전체권한[CC00102]이 아닌 경우 컨트롤 비활성화
					if( moPageInfo.authRngRcd == "CC00104") {
						// 교수명 세팅
						util.Control.setValue(app, "ipbProfNm", moUserInfo.userNm);
						util.DataMap.setValue(app, "dmReqKey", "strProfObjNo", moUserInfo.id);
						util.Control.setStyleAttr(app, "ipbProfNm", "width", 100);
						// 교과목 검색, 교수검색버튼 숨김
						util.Control.setVisible(app, false, ["ipbSbNm", "btnSbNm", "lblSbNm", "btnProfId"]);
						// 교수명 라벨 보이기
						util.Control.setVisible(app, true, ["lblProfNm"]);
						// 학년도, 학기, 구분(교수별,과목별), 교수명 비활성화
						util.Control.setEnable(app, false, ["rdbProfOrSb", "ipbProfNm"]);
					}
					
				};
			
				/**
				 * @desc 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회 함수
				 * @param 
				 * @return void
				 * @author 양선하 2016.06.22
				 */
				function doChangeYearSmt(psDiv) {
					
					util.DataMap.setValue(app, "dmRoot", "keyDateMap", "YEAR", util.DataMap.getValue(app, "dmReqKey", "strSchYearRcd"));
					util.DataMap.setValue(app, "dmRoot", "keyDateMap", "SMT", util.DataMap.getValue(app, "dmReqKey", "strSmtRcd"));
					
					//strCommand: date 
					util.Submit.send(app, "subDate", function(pbSuccess){
						if(pbSuccess){
							msSchYearRcd = util.DataMap.getValue(app, "dmKeyDateMap", "YEAR");
							msSmtRcd = util.DataMap.getValue(app, "dmKeyDateMap", "SMT");
							
							var vsKeyDate = util.DataMap.getValue(app, "dmKeyDateMap", "END_DT");
							
							// 조회조건 세팅
							util.Control.setValue(app, "cbbSchYearRcd", msSchYearRcd);
							util.Control.setValue(app, "cbbSmtRcd", msSmtRcd);
							util.DataMap.setValue(app, "dmRoot", "reqKey", "strKeyDate", vsKeyDate);
							
							if(!ValueUtil.isNull(util.DataMap.getValue(app, "dmReqKey", "strProfObjNo"))) {
								// 담당교과목목록 조회
								doChargeSbList(function(pbSuccess) {
									if(pbSuccess) util.SelectCtl.selectItem(app, "cbbSbCd", 0);
								});
								
							// 값이 있는 경우 담당교과목록 조회
							} else {
								// 조회조건(개설과목)항목초기화
								doClearSchCtl();
								// 조회조건(담당교과목) 콤보박스 초기화
								doClearChargeSb();
								// 조회조건(학사부서) 콤보박스 초기화
								doClearSaNm();
							}
							
							
							
						// Exception 발생시
						}else {
							if(psDiv == "year"){
								util.Control.setValue(app, "cbbSchYearRcd", msSchYearRcd);
							}else if(psDiv == "smt"){
								util.Control.setValue(app, "cbbSmtRcd", msSchYearRcd);
							}
							util.DataMap.setValue(app, "dmRoot", "reqKey", "strKeyDate", "");
						}
					});
				};
				
				/**
				 * @desc 조회조건(개설과목)항목초기화
				 * @param 
				 * @return void
				 * @author 양선하 2016.06.22
				 */
				function doClearSchCtl() {
					
					// 개설과목
					util.Control.setValue(app, "ipbSbNm", "");
					util.DataMap.setValue(app, "dmReqKey", "strRefKey", "");
					
					// 교수명
					util.Control.setValue(app, "ipbProfNm", "");
					util.DataMap.setValue(app, "dmReqKey", "strProfObjNo", "");
				};
				
				/**
				 * @desc 담당교과목 콤보박스 reset
				 * @param 
				 * @return void
				 * @author 양선하 2016.06.22
				 */
				function doClearChargeSb() {
					
					ExtSelectCtl.deleteAllItem("cbbSbCd");
					util.Control.setValue(app, "cbbSbCd", "");
				}
				
				/**
				 * @desc 조회조건(학사부서)항목초기화
				 * @param 
				 * @return void
				 * @author 양선하 2016.06.22
				 */
				function doClearSaNm() {
					
					// 학사부서
					util.Control.setValue(app, "ipbSaNm", "");
					util.DataMap.setValue(app, "dmReqKey", "strSaObjDivRcd", "");
					util.DataMap.setValue(app, "dmReqKey", "strSaCd", "");
				};
				
				/**
				 * @desc 담당교과목목록 조회
				 * @param {Function} poCallBackFunc 콜백 함수
				 * @return  void
				 * @author 양선하 2016.06.22
				 */
				function doChargeSbList(poCallBackFunc) {
					//strCommand: listChargeSb 
					util.Submit.send(app, "subChargeSbList", function(pbSuccess){
						if(pbSuccess){
							util.Control.redraw(app, "cbbSbCd");
							util.SelectCtl.selectItem(app, "cbbSbCd", 0);
							
							// 조회 후 콜백함수 수행
							if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
						}
					});
				};
				
				
				/**
				 * @desc [btnSearch]조회 onClick 이벤트
				 * @param 
				 * @return void
				 * @author 양선하 2016.06.22
				 */
				moPage.onClick_BtnSearch = function() {
					
					
					// 교수명or교과목
					var vsProfOrSb = util.Control.getValue(app, "rdbProfOrSb");
					var vsRefKey 		= util.DataMap.getValue(app, "dmReqKey", "strRefKey");				// 교과목 참조키
					var vsSaCd 			= util.DataMap.getValue(app, "dmReqKey", "strSaCd");				// 학과코드
					// 교과목일경우
					if(ValueUtil.fixNull(vsProfOrSb) == "SB"){
						util.Control.setUserAttr(app, "ipbProfNm", "require", "");
						util.Control.setUserAttr(app, "ipbSbNm", "require", "Y");
						util.Control.setUserAttr(app, "cbbSbCd", "require", "Y");
						util.Control.setUserAttr(app, "ipbSaNm", "require", "");
						vsSaCd = "";
					// 교수일경우
					}else if(ValueUtil.fixNull(vsProfOrSb) == "PROF"){
						util.Control.setUserAttr(app, "ipbProfNm", "require", "Y");
						util.Control.setUserAttr(app, "ipbSbNm", "require", "");
						util.Control.setUserAttr(app, "cbbSbCd", "require", "Y");
						util.Control.setUserAttr(app, "ipbSaNm", "require", "");
						vsSaCd = "";
					// 학과일경우
					}else{
						util.Control.setUserAttr(app, "ipbProfNm", "require", "");
						util.Control.setUserAttr(app, "ipbSbNm", "require", "");
						util.Control.setUserAttr(app, "cbbSbCd", "require", "");
						util.Control.setUserAttr(app, "ipbSaNm", "require", "Y");
						vsRefKey = "";
					}
					
					//필수값 체크
					if(!util.validate(app, ["grpSearch"])) return false;
					
					var vsSchYearRcd 	= util.DataMap.getValue(app, "dmReqKey", "strSchYearRcd");
					var vsSmtRcd 		= util.DataMap.getValue(app, "dmReqKey", "strSmtRcd");
					var vsKeyDate 		= util.DataMap.getValue(app, "dmReqKey", "strKeyDate");			// 기준일자 
					
					
					var vsSchYearRcdNm 	= ExtInstance.getValue("/root/resOnLoad/schYearRcdList/row", "CD_NM", "child::CD='"+vsSchYearRcd+"'");
					var vsSmtRcdNm			= ExtInstance.getValue("/root/resOnLoad/smtRcdList/row", "CD_NM", "child::CD='"+vsSmtRcd+"'");
					var vsTitleNm				= vsSchYearRcdNm+" "+vsSmtRcdNm+" 성적표";
					
					
					var voParam = {
							p_strLanDivRcd 			: msDefaultLocale,	 												// 언어키
							p_strKeyDate 			: vsKeyDate,  														// 기준일
							p_strSchYearRcd		: vsSchYearRcd,  													// 학년도
							p_strSmtRcd 				: vsSmtRcd,  															// 학기
							p_strSaCd	 				: vsSaCd,  													   		// 부서코드
							p_strRefKey 				: vsRefKey,													    	// 교과목참조키
							p_strCheckAuthId 		: moUserInfo.id														// 사용자ID
						};
			
			
					var voOzFormParam = {
							  TITLE : vsTitleNm //리포트타이틀
							, SUB_TITLE : "서브타이틀" //리포트서브타이틀		
							, FORM_TYPE : "flash"
						};	
						
					util.Report.open(app, "hojReport", "stdNcsSCurPrt32", voOzFormParam, voParam);
				}
				
				
				/**
				 * @desc [IpbSbNm] 교과목명 value change 이벤트
				 *				개설과목검색팝업 호출
				 * @param {Object} sender 이벤트 객체
				 * @return void
				 * @author 양선하 2016.06.22
				 */	
				moPage.onValueChanged_IpbSbNm = function(sender) {
					// 값 변경시 개설과목 검색팝업 호출
					doOnChangeStdCcsPOpenSubPopup(sender);
				}
				
				/**
				 * @desc [btnSbNm] 교과목명 버튼 on click 이벤트
				 *            개설과목검색팝업 호출
				 * @param {Object} sender 이벤트 객체
				 * @return void
				 * @author 양선하 2016.06.22
				 */	
				moPage.onClick_BtnSbNm = function(sender) {
					// 개설과목검색팝업 호출
					doOnClickStdCcsPOpenSubPopup(sender);
				}
				
				/**
				 * @desc [cbbSchYearRcd] 학년도 value changed 이벤트
				 * @param 
				 * @return void
				 * @author 양선하 2016.06.22
				 */
				moPage.onValueChanged_CbbSchYearRcd = function() {
					// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
					doChangeYearSmt("year");
					
					
					
						
						
					
					
				};
				
				/**
				 * @desc [cbbSmtRcd]학기 value changed 이벤트
				 * @param 
				 * @return void
				 * @author 양선하 2016.06.22
				 */
				moPage.onValueChanged_CbbSmtRcd = function() {
					// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
					doChangeYearSmt("smt");
					
				};
				
				
				/**
				 * @desc [rdbProfOrSb] 교수/교과목/학과별 라디오버튼 value changed 이벤트
				 * @param 
				 * @return void
				 * @author 양선하 2016.06.22
				 */
				moPage.onValueChanged_RdbProfOrSb = function() {
					
					var vsProfOrSb = util.Control.getValue(app, "rdbProfOrSb");
					var vbVisible = true;
					
					// 교과목일 경우
					if(ValueUtil.fixNull(vsProfOrSb) == "SB"){
						util.Control.setVisible(app, true, ["ipbSbNm", "btnSbNm", "lblSbNm"]);
						util.Control.setVisible(app, false, ["ipbProfNm", "btnProfId", "lblProfNm"]);
						util.Control.setVisible(app, false, ["lblSaNm", "ipbSaNm", "btnSaNm"]);
						util.Control.setVisible(app, true, ["lblSbCd", "cbbSbCd"]);
					// 교수일 경우
					}else if(ValueUtil.fixNull(vsProfOrSb) == "PROF"){
						util.Control.setVisible(app, false, ["ipbSbNm", "btnSbNm", "lblSbNm"]);
						util.Control.setVisible(app, true, ["ipbProfNm", "btnProfId", "lblProfNm"]);
						util.Control.setVisible(app, false, ["lblSaNm", "ipbSaNm", "btnSaNm"]);
						util.Control.setVisible(app, true, ["lblSbCd", "cbbSbCd"]);
					// 학과일 경우
					}else if(ValueUtil.fixNull(vsProfOrSb) == "SA"){
						util.Control.setVisible(app, false, ["ipbSbNm", "btnSbNm", "lblSbNm"]);
						util.Control.setVisible(app, false, ["ipbProfNm", "btnProfId", "lblProfNm"]);
						util.Control.setVisible(app, true, ["lblSaNm", "ipbSaNm", "btnSaNm"]);
						util.Control.setVisible(app, false, ["lblSbCd", "cbbSbCd"]);
					}
					
					// 조회조건(교수명, 개설과목)항목초기화
					doClearSchCtl();
					// 조회조건(담당교과목) 콤보박스 초기화
					doClearChargeSb();
					// 조회조건(학사부서) 콤보박스 초기화
					doClearSaNm();
				}
				
				/**
				 * @desc [ipbProfNm] 교수명 value change 이벤트
				 *            교직원 검색팝업 호출
				 * @param {Object} poSender 이벤트 객체
				 * @return void
				 * @author 양선하 2016.06.22
				 */	
				moPage.onValueChanged_IpbProfNm = function(poSender) {
					doOnChangeStdCmnPPrsnSearch(poSender);
				};
				
				/**
				 * @desc [btnProfId] 교수명 버튼 on click 이벤트
				 *            교직원 검색팝업 호출
				 * @param {Object} poSender 이벤트 객체
				 * @return void
				 * @author 양선하 2016.06.22
				 */	
				moPage.onClick_BtnProfId = function(poSender) {
					doOnClickStdCmnPPrsnSearch(poSender);
				};
				
				/**
				 * @desc [btnSaNm]학사부서명 버튼 click 이벤트
				 * @param 
				 * @return void
				 * @author 양선하 2016.06.22
				 */
				moPage.onClick_BtnSaNm = function(sender) {
					doOnClickStdCmnPObjSch(sender);
				}
				
				/**
				 * @desc [IpbSaNm]학사부서명 value changed 이벤트
				 * @param 
				 * @return void
				 * @author 양선하 2016.06.22
				 */
				moPage.onValueChanged_IpbSaNm = function(sender) {
					doOnChangeStdCmnPObjSch(sender);
				}
				
				return moPage;
			};;
			// End - User Script
			
			// Header
			var dataSet_1 = new cpr.data.DataSet("dsSmtRcdList");
			dataSet_1.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
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
					{"name": "LECT_TIME_CNT"}
				],
				"rows": []
			});
			app.register(dataSet_3);
			var dataMap_1 = new cpr.data.DataMap("dmRoot");
			dataMap_1.parseData({
				"columns" : [
					{
						"name": "rptPanel",
						"dataType": "string"
					},
					{
						"name": "reqList",
						"dataType": "string"
					}
				]
			});
			app.register(dataMap_1);
			
			var dataMap_2 = new cpr.data.DataMap("dmKeyDateMap");
			dataMap_2.parseData({
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
			app.register(dataMap_2);
			
			var dataMap_3 = new cpr.data.DataMap("dmReqKey");
			dataMap_3.parseData({
				"columns" : [
					{
						"name": "strSmtRcd",
						"dataType": "string"
					},
					{
						"name": "strSchYearRcd",
						"dataType": "string"
					},
					{
						"name": "strKeyDate",
						"dataType": "string"
					},
					{
						"name": "strSbNm",
						"dataType": "string"
					},
					{
						"name": "strRefKey",
						"dataType": "string"
					},
					{
						"name": "strSbCd",
						"dataType": "string"
					},
					{
						"name": "strSaNm",
						"dataType": "string"
					},
					{
						"name": "strSaCd",
						"dataType": "string"
					},
					{
						"name": "strProfOrSb",
						"dataType": "string"
					},
					{
						"name": "strProfNm",
						"dataType": "string"
					},
					{
						"name": "strProfObjNo",
						"dataType": "string"
					},
					{
						"name": "strSaObjDivRcd",
						"dataType": "string"
					}
				]
			});
			app.register(dataMap_3);
			var submission_1 = new cpr.protocols.Submission("subOnLoad");
			submission_1.action = "/cgd/ExtCgdCgdRecInputSbList/";
			submission_1.mediaType = "application/x-www-form-urlencoded";
			submission_1.addResponseData(dataSet_1, false);
			submission_1.addResponseData(dataSet_2, false);
			submission_1.addResponseData(dataMap_2, false);
			submission_1.addResponseData(dataSet_3, false);
			app.register(submission_1);
			
			var submission_2 = new cpr.protocols.Submission("subDate");
			submission_2.action = "/cmn/StdCmnDateTime/";
			submission_2.mediaType = "application/x-www-form-urlencoded";
			submission_2.addRequestData(dataMap_2);
			submission_2.addResponseData(dataMap_2, false);
			app.register(submission_2);
			
			var submission_3 = new cpr.protocols.Submission("subChargeSbList");
			submission_3.action = "/cgd/ExtCgdCgdRecInputSbList/";
			submission_3.mediaType = "application/x-www-form-urlencoded";
			submission_3.addRequestData(dataMap_3);
			submission_3.addResponseData(dataSet_3, false);
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
			
			var group_1 = new cpr.controls.Container("grpData");
			// Layout
			var xYLayout_2 = new cpr.controls.layouts.XYLayout();
			group_1.setLayout(xYLayout_2);
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
					"width": "1215px",
					"height": "563px"
				});
			})(group_1);
			container.addChild(group_1, {
				"top": "72px",
				"left": "5px",
				"width": "1225px",
				"height": "598px"
			});
			
			var group_2 = new cpr.controls.Container("grpSearch");
			group_2.style.setClasses(["search-box"]);
			// Layout
			var xYLayout_3 = new cpr.controls.layouts.XYLayout();
			group_2.setLayout(xYLayout_3);
			(function(container){
				var output_1 = new cpr.controls.Output("optSaNm");
				output_1.value = "";
				output_1.style.setClasses(["require"]);
				output_1.bind("value").toLanguage("NLS-SCR-SANM");
				container.addChild(output_1, {
					"top": "5px",
					"left": "582px",
					"width": "100px",
					"height": "25px"
				});
				var button_1 = new cpr.controls.Button("btnSaNm");
				button_1.visible = false;
				button_1.value = "";
				button_1.style.setClasses(["btn-pop-search"]);
				if(typeof onBtnSaNmClick == "function") {
					button_1.addEventListener("click", onBtnSaNmClick);
				}
				container.addChild(button_1, {
					"top": "5px",
					"left": "817px",
					"width": "20px",
					"height": "25px"
				});
				var inputBox_1 = new cpr.controls.InputBox("ipbSaNm");
				inputBox_1.visible = false;
				inputBox_1.maxLength = 50;
				inputBox_1.userAttr({"require": "Y"});
				inputBox_1.bind("fieldLabel").toExpression("#optSaNm.value");
				inputBox_1.bind("value").toDataMap(app.lookup("dmReqKey"), "strSaNm");
				if(typeof onIpbSaNmValueChange == "function") {
					inputBox_1.addEventListener("value-change", onIpbSaNmValueChange);
				}
				container.addChild(inputBox_1, {
					"top": "5px",
					"left": "687px",
					"width": "130px",
					"height": "25px"
				});
				var output_2 = new cpr.controls.Output("optSbNm");
				output_2.value = "";
				output_2.style.setClasses(["require"]);
				output_2.bind("value").toLanguage("UI-DB-SB_NM");
				container.addChild(output_2, {
					"top": "5px",
					"left": "582px",
					"width": "60px",
					"height": "25px"
				});
				var button_2 = new cpr.controls.Button("btnSbNm");
				button_2.visible = false;
				button_2.value = "";
				button_2.style.setClasses(["btn-pop-search"]);
				if(typeof onBtnSbNmClick == "function") {
					button_2.addEventListener("click", onBtnSbNmClick);
				}
				container.addChild(button_2, {
					"top": "5px",
					"left": "727px",
					"width": "20px",
					"height": "25px"
				});
				var inputBox_2 = new cpr.controls.InputBox("ipbSbNm");
				inputBox_2.visible = false;
				inputBox_2.maxLength = 100;
				inputBox_2.userAttr({"require": "Y"});
				inputBox_2.bind("fieldLabel").toExpression("#optSbNm.value");
				inputBox_2.bind("value").toDataMap(app.lookup("dmReqKey"), "strSbNm");
				if(typeof onIpbSbNmValueChange == "function") {
					inputBox_2.addEventListener("value-change", onIpbSbNmValueChange);
				}
				container.addChild(inputBox_2, {
					"top": "5px",
					"left": "646px",
					"width": "81px",
					"height": "25px"
				});
				var button_3 = new cpr.controls.Button("btnSearch");
				button_3.value = "조회";
				button_3.style.setClasses(["btn-search"]);
				if(typeof onBtnSearchClick == "function") {
					button_3.addEventListener("click", onBtnSearchClick);
				}
				container.addChild(button_3, {
					"top": "5px",
					"left": "1160px",
					"width": "60px",
					"height": "25px"
				});
				var output_3 = new cpr.controls.Output("optSchYearRcd");
				output_3.value = "";
				output_3.style.setClasses(["require"]);
				output_3.bind("value").toLanguage("UI-GLS-SCH_YEAR");
				container.addChild(output_3, {
					"top": "5px",
					"left": "5px",
					"width": "80px",
					"height": "25px"
				});
				var comboBox_1 = new cpr.controls.ComboBox("cbbSchYearRcd");
				comboBox_1.userAttr({"require": "Y"});
				comboBox_1.bind("fieldLabel").toExpression("#optSchYearRcd.value");
				comboBox_1.bind("value").toDataMap(app.lookup("dmReqKey"), "strSchYearRcd");
				(function(comboBox_1){
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
				var output_4 = new cpr.controls.Output("optSmtRcd");
				output_4.value = "";
				output_4.style.setClasses(["require"]);
				output_4.bind("value").toLanguage("UI-GLS-SMT");
				container.addChild(output_4, {
					"top": "5px",
					"left": "210px",
					"width": "70px",
					"height": "25px"
				});
				var comboBox_2 = new cpr.controls.ComboBox("cbbSmtRcd");
				comboBox_2.userAttr({"require": "Y"});
				comboBox_2.bind("fieldLabel").toExpression("#optSmtRcd.value");
				comboBox_2.bind("value").toDataMap(app.lookup("dmReqKey"), "strSmtRcd");
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
					"left": "285px",
					"width": "90px",
					"height": "25px"
				});
				var output_5 = new cpr.controls.Output("optSbCd");
				output_5.value = "";
				output_5.style.setClasses(["require"]);
				output_5.bind("value").toLanguage("UI-SCR-CHARGESUBJ");
				container.addChild(output_5, {
					"top": "5px",
					"left": "756px",
					"width": "80px",
					"height": "25px"
				});
				var comboBox_3 = new cpr.controls.ComboBox("cbbSbCd");
				comboBox_3.bind("fieldLabel").toExpression("#optSbCd.value");
				comboBox_3.bind("value").toDataMap(app.lookup("dmReqKey"), "strRefKey");
				(function(comboBox_3){
					comboBox_3.setItemSet(app.lookup("dsChargeSbList"), {
						"label": "SB_DIVCLS_CD_NM",
						"value": "REF_KEY"
					});
				})(comboBox_3);
				container.addChild(comboBox_3, {
					"top": "5px",
					"left": "840px",
					"width": "207px",
					"height": "25px"
				});
				var radioButton_1 = new cpr.controls.RadioButton("rdbProfOrSb");
				radioButton_1.userAttr({"require": "Y"});
				radioButton_1.bind("value").toDataMap(app.lookup("dmReqKey"), "strProfOrSb");
				(function(radioButton_1){
					radioButton_1.addItem(new cpr.controls.Item("교수별", "PROF"));
					radioButton_1.addItem(new cpr.controls.Item("과목별", "SB"));
					radioButton_1.addItem(new cpr.controls.Item("학과별", "SA"));
				})(radioButton_1);
				if(typeof onRdbProfOrSbValueChange == "function") {
					radioButton_1.addEventListener("value-change", onRdbProfOrSbValueChange);
				}
				container.addChild(radioButton_1, {
					"top": "5px",
					"left": "385px",
					"width": "187px",
					"height": "25px"
				});
				var output_6 = new cpr.controls.Output("optProfNm");
				output_6.value = "";
				output_6.style.setClasses(["require"]);
				output_6.bind("value").toLanguage("NLS-SCR-PROFNM");
				container.addChild(output_6, {
					"top": "5px",
					"left": "582px",
					"width": "60px",
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
					"left": "646px",
					"width": "81px",
					"height": "25px"
				});
				var button_4 = new cpr.controls.Button("btnProfId");
				button_4.value = "";
				button_4.style.setClasses(["btn-pop-search"]);
				if(typeof onBtnProfIdClick == "function") {
					button_4.addEventListener("click", onBtnProfIdClick);
				}
				container.addChild(button_4, {
					"top": "5px",
					"left": "727px",
					"width": "20px",
					"height": "25px"
				});
			})(group_2);
			container.addChild(group_2, {
				"top": "35px",
				"left": "5px",
				"width": "1225px",
				"height": "32px"
			});
			
			var embeddedApp_1 = new cpr.controls.EmbeddedApp("emaStdCcsPOpenSubPopup");
			cpr.core.App.load("app/ccs/impStdCcsPOpenSubPopup", function(app) {
				if(app){
					embeddedApp_1.app = app;
				}
			});
			container.addChild(embeddedApp_1, {
				"top": "675px",
				"left": "5px",
				"width": "120px",
				"height": "25px"
			});
			
			var embeddedApp_2 = new cpr.controls.EmbeddedApp("emaApsStaff");
			cpr.core.App.load("app/cmn/impStdCmnPPrsnSearch", function(app) {
				if(app){
					embeddedApp_2.app = app;
				}
			});
			container.addChild(embeddedApp_2, {
				"top": "675px",
				"left": "135px",
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
				"top": "675px",
				"left": "245px",
				"width": "100px",
				"height": "25px"
			});
			if(typeof onBodyLoad == "function"){
				app.addEventListener("load", onBodyLoad);
			}
		}
	});
	app.title = "강의계획서";
	cpr.core.Platform.INSTANCE.register(app);
})();
