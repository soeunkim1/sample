//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCcrSExhSbTlsnReq.xtm"/>

/**
 * 대체수강자명단
 * @class extCcrSExhSbTlsnReq
 * @author 박갑수 at 2016. 6. 24
 */
var extCcrSExhSbTlsnReq = function() {
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
	 * @author 박갑수 at 2016. 6. 24
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		doHeaderOnLoad();
	};
	
	/**
	 * @desc onLoad 실행
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 6. 24
	 */
	moPage.onModelConstructDone_ExtCcrSExhSbTlsnReq = function() {
		// 검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grpData"]);
		
		// 서브미션 실행 (실패시 cover page)
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				
				// 조회조건 컨트롤 refresh(학년도, 학기)
				util.Control.redraw(app, ["cbbSchYearRcd", "cbbSmtRcd"]);
				
				// 학기 필터링으로인해 계절학기일경우 빈값으로 세팅
				var vsSmtRcd = util.Control.getValue(app, "cbbSmtRcd");
				var vsCdPrp1 = ExtInstance.getValue("/root/resOnLoad/smtRcdList/row", "CD_PRP1" , "child::CD='"+vsSmtRcd+"'");
				if(ValueUtil.fixNull(vsCdPrp1) != "CA00101"){
					util.Control.setValue(app, "cbbSmtRcd", "");
				}
				
				setStdCmnPObjSchObjInfo();
			}
		}, true);
	};
	
	/**
	 * @desc [cbbSchYearRcd]학년도 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 6. 24
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
	 * @author 박갑수 at 2016. 6. 24
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
	 * @author 박갑수 at 2016. 6. 24
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
	 * @author 박갑수 at 2016. 6. 24
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
	 * @author 박갑수 at 2016. 6. 24
	 */
	moPage.onClick_BtnSaCdNm = function(sender) {
		// 객체검색팝업 호출
		doOnClickStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc [ipbSaCdNm]소속 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 6. 24
	 */
	moPage.onValueChanged_IpbSaCdNm = function(sender) {
		// 값변경시 객체검색팝업 호출
		doOnChangeStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc [btnSearch]조회 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 6. 24
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
				var vsFNot = util.DataMap.getValue(app, "dmReqKey", "strFNot");
				if(vsFNot == "" || vsFNot == null){
					vsFNot = "0";
				}
				
				var voParam = {
						p_strLanDivRcd 		: util.DataMap.getValue(app, "dmResOnLoad", "strLanDivRcd"),	// 언어키
						p_strKeyDate 		: util.DataMap.getValue(app, "dmKeyDateMap", "END_DT"),		// 기준일자
						p_strSchYearRcd 	: vsSchYearRcd,															// 학년도코드
						p_strSmtRcd 			: vsSmtRcd,																	// 학기코드
						p_strListSaCd		: util.DataMap.getValue(app, "dmReqKey", "strListSaCd"),			// 학사부서코드 In조건용
						p_strFNot				: vsFNot,			// F학점 제외
						p_strCheckAuthId 	: moUserInfo.id																// 사용자ID
				};
				
				var vsSchYearRcdNm = ExtInstance.getValue("/root/resOnLoad/schYearRcdList/row", "CD_NM" , "child::CD='"+ vsSchYearRcd +"'");
				var vsSmtRcdNm = ExtInstance.getValue("/root/resOnLoad/smtRcdList/row", "CD_NM" , "child::CD='"+ vsSmtRcd +"'");
				var vsTitle = vsSchYearRcdNm + " " + vsSmtRcdNm + " 대체수강자 명단 LIST";
				
				var voOzFormParam = {
					  TITLE 		 : vsTitle			// 리포트타이틀
					, SUB_TITLE 	 : "" 					// 리포트서브타이틀		
					, FORM_TYPE : "flash"
				};
				
				util.Report.open(app, "hojReport", "extCcrSExhSbTlsnReq", voOzFormParam, voParam);
			}
		});
		
		
	};
	
	/**
	 * @desc 객체 하위 학사부서 In조건용 String 조회
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 6. 24
	 */
	function doSaInList(){
		
	};
	
	return moPage;
};
