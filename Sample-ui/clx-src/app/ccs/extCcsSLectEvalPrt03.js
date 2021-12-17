//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCcsSLectEvalPrt03.xtm"/>

/**
 * 개설과목관리
 * @class stdCcsCCurClsFrf
 * @author 박갑수 at 2016. 2. 4
 */
var extCcsSLectEvalPrt03 = function() {
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
		oObjDivRcd		:	"/root/reqKey/strObjDivRcd",
		oCd					:	"/root/reqKey/strObjCd",
		oCdNm				:	"ipbSaNm",
		oBegDt				:	"",
		oEndDt				:	"",
		oLanDivRcd		:	"",
		func 					:  function(poRtnValue){
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
				
				util.Control.redraw(app, ["cbbSchYearRcd", "cbbSmtRcd", "cbbTlsnCnt"]);
				// 학년도 학기값 되돌리기위한 값
				msSchYearRcd = util.DataMap.getValue(app, "dmKeyDateMap", "YEAR");
				msSmtRcd = util.DataMap.getValue(app, "dmKeyDateMap", "SMT");
				
				util.Control.redraw(app, ["cbbTlsnCnt"]);
				util.SelectCtl.selectItem(app, "cbbTlsnCnt", 0);
				
				
				util.Control.setFocus(app, "cbbTlsnCnt");
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
		if(!util.validate(app, ["cbbSchYearRcd", "cbbSmtRcd", "cbbTlsnCnt"])){
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
	
	
	
		var vsSchYearRcd 	= util.DataMap.getValue(app, "dmKeyDateMap", "YEAR");
		var vsSmtRcd 		= util.DataMap.getValue(app, "dmKeyDateMap", "SMT");
		var vsKeyDate 		= util.DataMap.getValue(app, "dmKeyDateMap", "END_DT");				//--기준일자 		
		var strStaffGrpRcd 	= util.DataMap.getValue(app, "dmReqKey", "strStaffGrpRcd");
		var vsTlsnCnt		= util.DataMap.getValue(app, "dmReqKey", "strTlsnCnt");
		
		

		var voParam = {
				p_strLanDivRcd 			: msDefaultLocale,	 												// 언어키
				p_strKeyDate 			: vsKeyDate,  														// 기준일
				p_strSchYearRcd		: vsSchYearRcd,  													// 학년도
				p_strSmtRcd 				: vsSmtRcd,  															// 학기				
				p_strTlsnCnt 				: vsTlsnCnt,														//--교원하위그룹
				p_strMenuId 				: moPageInfo.menuId,												// 메뉴ID
				p_strCheckAuthId 		: moUserInfo.id														// 사용자ID
			};
			
		var voOzFormParam = {
				  TITLE : "초과수강인원교과목현황" //리포트타이틀
				, SUB_TITLE : "서브타이틀" //리포트서브타이틀		
				, FORM_TYPE : "flash"
			};	
			
			util.Report.open(app, "hojReport", "extCcsSLectEvalPrt03", voOzFormParam, voParam);
					
					
		/*
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				
				
				var vsSchYearRcd 	= util.DataMap.getValue(app, "dmKeyDateMap", "YEAR");
				var vsSmtRcd 		= util.DataMap.getValue(app, "dmKeyDateMap", "SMT");
				var vsKeyDate 		= util.DataMap.getValue(app, "dmKeyDateMap", "END_DT");				//--기준일자 
				var vsSaCdList 		= util.DataMap.getValue(app, "dmResList", "strListSaCd");				//--기준일자 
				var strStaffGrpRcd 	= util.DataMap.getValue(app, "dmReqKey", "strStaffGrpRcd");
				
				
				

				var voParam = {
						p_strLanDivRcd 			: msDefaultLocale,	 												// 언어키
						p_strKeyDate 			: vsKeyDate,  														// 기준일
						p_strSchYearRcd	: vsSchYearRcd,  														// 학년도
						p_strSmtRcd 		: vsSmtRcd,  																	// 학기
						p_strSaCd	 	: vsSaCdList,  													      	 			// 부서코드
						p_strStaffGrpRcd : strStaffGrpRcd,																//--교원하위그룹
						p_strMenuId 				: moPageInfo.menuId,												// 메뉴ID
						p_strCheckAuthId 		: moUserInfo.id														// 사용자ID
					};
					
				var voOzFormParam = {
						  TITLE : "교과분담명세표" //리포트타이틀
						, SUB_TITLE : "서브타이틀" //리포트서브타이틀		
						, FORM_TYPE : "flash"
					};	
					
					util.Report.open(app, "hojReport", "extCcsSLectEvalPrt01", voOzFormParam, voParam);
			}
		});
		*/
		
		
		
		
	};
	
	return moPage;
};
