//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCcrSTlsnFundCmpUnPrt.xtm"/>

/**
 * 미달 수강신청자 조회(총학점, 교양, 전공)
 * @class extCcrSTlsnFundCmpUnPrt
 * @author 박갑수 at 2016. 6. 29
 */
var extCcrSTlsnFundCmpUnPrt = function() {
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
		}
	}];
	
	// 학년도 ,학기, 출력순서를 원래데이터로 되돌리기위한 변수
	var msSchYearRcd = "";
	var msSmtRcd = "";
	
	/**
	 * @desc import 헤더 초기화
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 6. 29
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		doHeaderOnLoad();
	};
	
	/**
	 * @desc onLoad 실행
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 6. 29
	 */
	moPage.onModelConstructDone_ExtCcrSTlsnFundCmpUnPrt = function() {
		// 검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grpData"]);
		
		// 서브미션 실행 (실패시 cover page)
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				
				// 조회조건 컨트롤 refresh
				util.Control.redraw(app, ["cbbSchYearRcd", "cbbSmtRcd", "cbbDiv"]);
				
				setStdCmnPObjSchObjInfo();
				
				// 구분값 Default - 총이수학점
				util.SelectCtl.selectItem(app, "cbbDiv", 0);
				
				// 학기 필터링으로인해 계절학기일경우 빈값으로 세팅
				var vsSmtRcd = util.Control.getValue(app, "cbbSmtRcd");
				var vsCdPrp1 = ExtInstance.getValue("/root/resOnLoad/smtRcdList/row", "CD_PRP1" , "child::CD='"+vsSmtRcd+"'");
				if(ValueUtil.fixNull(vsCdPrp1) != "CA00101"){
					util.Control.setValue(app, "cbbSmtRcd", "");
				}
			}
		}, true);
	};
	
	/**
	 * @desc [cbbSchYearRcd]학년도 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 6. 29
	 */
	moPage.onValueChanged_CbbSchYearRcd = function() {
		// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
		doChangeYearSmt("year");
	};
	
	/**
	 * @desc [cbbSmtRcd]학기 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 6. 29
	 */
	moPage.onValueChanged_CbbSmtRcd = function() {
		// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
		doChangeYearSmt("smt");
	};
	
	/**
	 * @desc 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 6. 29
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
	 * @author 박갑수 at 2016. 6. 29
	 */
	moPage.onClick_BtnSearch = function() {
		
		// 조회조건 필수 체크
		if(!util.validate(app, ["cbbSchYearRcd", "cbbSmtRcd", "cbbDiv", "ipbSaCdNm"])){
			return false;
		}
		
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				
				var vsSchYearRcd = util.Control.getValue(app, "cbbSchYearRcd");
				var vsSmtRcd = util.Control.getValue(app, "cbbSmtRcd");
				var vsDiv = util.Control.getValue(app, "cbbDiv");
				
				var voParam = {
						p_strLanDivRcd 		: util.DataMap.getValue(app, "dmResOnLoad", "strLanDivRcd"),	// 언어키
						p_strKeyDate 		: util.DataMap.getValue(app, "dmKeyDateMap", "END_DT"),		// 기준일자
						p_strSchYearRcd 	: vsSchYearRcd,															// 학년도코드
						p_strSmtRcd 			: vsSmtRcd,																	// 학기코드
						p_strDiv 				: vsDiv,																			// 구분
						p_strListSaCd		: util.DataMap.getValue(app, "dmReqKey", "strListSaCd"),			// 학사부서코드 In조건용
						p_strCheckAuthId 	: moUserInfo.id																// 사용자ID
				};
				
				var vsDivNm = ExtInstance.getValue("/root/resOnLoad/divList/row", "CD_NM" , "child::CD='"+ vsDiv +"'");
				var vsTitle = vsDivNm + " 미달 수강신청자 명단";
				
				var voOzFormParam = {
					  TITLE 		 : vsTitle			// 리포트타이틀
					, SUB_TITLE 	 : "" 					// 리포트서브타이틀		
					, FORM_TYPE : "flash"
				};
				
				util.Report.open(app, "hojReport", "extCcrSTlsnFundCmpUnPrt", voOzFormParam, voParam);
			}
		});
	};
	
	/**
	 * @desc [btnSaCdNm]소속(돋보기버튼) onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 6. 29
	 */
	moPage.onClick_BtnSaCdNm = function(sender) {
		// 객체검색팝업 호출
		doOnClickStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc [ipbSaCdNm]소속 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 6. 29
	 */
	moPage.onValueChanged_IpbSaCdNm = function(sender) {
		// 값변경시 객체검색팝업 호출
		doOnChangeStdCmnPObjSch(sender);
	};
	
	return moPage;
};
