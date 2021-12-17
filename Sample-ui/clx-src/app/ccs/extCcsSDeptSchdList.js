//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCcsSDeptSchdList.xtm"/>

/**
 * 개설과목관리
 * @class stdCcsCCurClsFrf
 * @author 박갑수 at 2016. 2. 4
 */
var extCcsSDeptSchdList = function() {
	var moPage = new Page();
	
	// 임포트용 데이터 통신 오브젝트
	var moPObject = new Page();
	
	// 객체검색팝업 호출
	moPObject.moIdsForStdCmnPObjSch = [
	{
		controlId			:	"btnSaCd",
		iCd					:	"",
		iNm					:	"ipbSaNm",
		iObjDivRcd			:	["CC009SA"],
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
				
				util.Control.redraw(app, ["cbbSchYearRcd", "cbbSmtRcd"]);
				util.Control.redraw(app, ["cbbDayNightDivRcd", "cbbSbLvlRcd"]);
				
				
				// 학년도 학기값 되돌리기위한 값
				msSchYearRcd = util.DataMap.getValue(app, "dmKeyDateMap", "YEAR");
				msSmtRcd = util.DataMap.getValue(app, "dmKeyDateMap", "SMT");
				
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
		if(!util.validate(app, ["cbbSchYearRcd", "cbbSmtRcd", "ipbSaNm", "cbbCuCd"])){
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
	function doList(poCallBackFunc) {	
	
	
		var vsSchYearRcd 		= util.DataMap.getValue(app, "dmKeyDateMap", "YEAR");		//--학년도
		var vsSmtRcd 			= util.DataMap.getValue(app, "dmKeyDateMap", "SMT");		//--학기
		var vsSaCd 				= util.DataMap.getValue(app, "dmReqKey", "strSaCd");			//--학사부서코드
		var vsSbLvlRcd			= util.DataMap.getValue(app, "dmReqKey", "strSbLvlRcd");		//--학년AbstractValidExp
		var vsCuCd 				= util.DataMap.getValue(app, "dmReqKey", "strCuCd");					//--교과그룹코드
		var vsDayNightDivRcd = util.DataMap.getValue(app, "dmReqKey", "strDayNightDivRcd");		//--주야간코드
		var vsDivClsNm 		= util.DataMap.getValue(app, "dmReqKey", "strDivclsNm");					//-- 반 
		var vsKeyDate 			= util.DataMap.getValue(app, "dmKeyDateMap", "END_DT");				//--기준일자 
		
		
//		alert("vsSchYearRcd"+vsSchYearRcd+"vsSmtRcd"+vsSmtRcd+"vsSaCd"+vsSaCd+"vsSbLvlRcd"+vsSbLvlRcd+"vsCuCd"+vsCuCd+"vsDayNightDivRcd"+vsDayNightDivRcd+"vsDivClsNm"+vsDivClsNm+"vsKeyDate"+vsKeyDate);
		
		var voParam = {
				p_strLanDivRcd 			: msDefaultLocale,	 												// 언어키
				p_strKeyDate 			: vsKeyDate,  														// 기준일
				p_strSchYearRcd	: vsSchYearRcd,  														// 학년도
				p_strSmtRcd 		: vsSmtRcd,  																	// 학기
				p_strSaCd 		: vsSaCd,																		// 학사부서코드
				p_strSbLvlRcd	: vsSbLvlRcd,																// 학년 
				p_strCuCd			: vsCuCd,																		// 교과그룹
				p_strDayNightDivRcd : vsDayNightDivRcd,													//	주야간코드	
				p_strDivClsNm	: vsDivClsNm,																// 반
				p_strMenuId 				: moPageInfo.menuId,												// 메뉴ID
				p_strCheckAuthId 		: moUserInfo.id														// 사용자ID
			};
			
		var voOzFormParam = {
				  TITLE : "학부학년반별 시간표" //리포트타이틀
				, SUB_TITLE : "서브타이틀" //리포트서브타이틀		
				, FORM_TYPE : "flash"
			};	
			
			util.Report.open(app, "hojReport", "extCcsSDeptSchdList", voOzFormParam, voParam);
		
	};
	
	return moPage;
};
