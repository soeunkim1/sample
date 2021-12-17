//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCcrSAplyPntUndPsn.xtm"/>

/**
 * 최저학점이하 수강신청자 조회
 * @class extCcrSAplyPntUndPsn
 * @author 유형기 at 2016. 6. 28
 */
var extCcrSAplyPntUndPsn = function() {
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
		func 					:  function(){
			/*
			var vsObjCd = util.DataMap.getValue(app, "dmReqKey", "strObjCd");
			if(!ValueUtil.isNull(vsObjCd)){
				// 학사부서 In조건용
				doSaInList();
			}
			*/
		}
	}];
	
	// 학년도 ,학기, 출력순서를 원래데이터로 되돌리기위한 변수
	var msSchYearRcd = "";
	var msSmtRcd = "";
	
	/**
	 * @desc import 헤더 초기화
	 * @param 
	 * @return  void
	 * @author 유형기 at 2016. 6. 28
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		doHeaderOnLoad();
	};
	
	/**
	 * @desc onLoad 실행
	 * @param 
	 * @return void
	 * @author 유형기 at 2016. 6. 28
	 */
	moPage.onModelConstructDone_ExtCcrSAplyPntUndPsn = function() {
		// 검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grpData"]);
		
		// 서브미션 실행 (실패시 cover page)
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				
				// 조회조건 컨트롤 refresh(학년도, 학기)
				util.Control.redraw(app, ["cbbSchYearRcd", "cbbSmtRcd", "cbbDgrCrsDivRcd"]);
				
				setStdCmnPObjSchObjInfo();
			}
		}, true);
	};
	
	/**
	 * @desc [cbbSchYearRcd]학년도 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 유형기 at 2016. 6. 28
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
	 * @author 유형기 at 2016. 6. 28
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
	 * @author 유형기 at 2016. 6. 28
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
	 * @desc 조회조건(학사부서) 초기화
	 * @param 
	 * @return void
	 * @author 유형기 at 2016. 6. 28
	 */
	function doClearSch(){
		util.Control.setValue(app, "ipbSaCdNm", "");
		util.DataMap.setValue(app, "dmReqKey", "strObjCd", "");
		util.DataMap.setValue(app, "dmReqKey", "strObjDivRcd", "");
		util.DataMap.setValue(app, "dmReqKey", "strListSaCd", "");
		util.Control.setValue(app, "iptFrom","");
		util.Control.setValue(app, "iptTo","");
	};
	
	/**
	 * @desc [btnSaCdNm]소속(돋보기버튼) onClick 이벤트
	 * @param 
	 * @return void
	 * @author 유형기 at 2016. 6. 28
	 */
	moPage.onClick_BtnSaCdNm = function(sender) {
		// 객체검색팝업 호출
		doOnClickStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc [ipbSaCdNm]소속 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 유형기 at 2016. 6. 28
	 */
	moPage.onValueChanged_IpbSaCdNm = function(sender) {
		// 값변경시 객체검색팝업 호출
		doOnChangeStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc [btnSearch]조회 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 유형기 at 2016. 6. 28
	 */
	moPage.onClick_BtnSearch = function() {
		
		// 조회조건 필수 체크
		if(!util.validate(app, ["cbbSchYearRcd", "cbbSmtRcd", "ipbSaCdNm"])){
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
							p_strCheckAuthId 	: moUserInfo.id,																// 사용자ID
							p_strGradeFrom      : util.Control.getValue(app, "iptFrom"),										//학점FROM
							p_strGradeTo         : util.Control.getValue(app, "iptTo"),											//학점TO				
							p_strDgrCrsDivRcd  : util.Control.getValue(app, "cbbDgrCrsDivRcd")							//학위구분
					};
					
					var vsSchYearRcdNm = ExtInstance.getValue("/root/resOnLoad/schYearRcdList/row", "CD_NM" , "child::CD='"+ vsSchYearRcd +"'");
					var vsSmtRcdNm = ExtInstance.getValue("/root/resOnLoad/smtRcdList/row", "CD_NM" , "child::CD='"+ vsSmtRcd +"'");
					var vsTitle = vsSchYearRcdNm + " 최저학점이하 수강신청자 조회";
					
					var voOzFormParam = {
						  TITLE 		 : vsTitle			// 리포트타이틀
						, SUB_TITLE 	 : "" 					// 리포트서브타이틀		
						, FORM_TYPE : "flash"
					};
					
					util.Report.open(app, "hojReport", "extCcrSAplyPntUndPsn", voOzFormParam, voParam);
			}
		});
		
		
		
	}
	
	/**
	 * @desc 객체 하위 학사부서 In조건용 String 조회
	 * @param 
	 * @return void
	 * @author 유형기 at 2016. 6. 28
	 */
	function doSaInList(){
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				
			}
		});
	};
	
	return moPage;
};
