//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
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
};

