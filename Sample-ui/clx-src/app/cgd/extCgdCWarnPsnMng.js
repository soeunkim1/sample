//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCgdCWarnPsnMng.xtm"/>

/**
 * 학사경고및제적대상자
 * @class extCgdCWarnPsnMng
 * @author 박갑수 at 2016. 6. 3
 */
var extCgdCWarnPsnMng = function() {
	var moPage = new Page();
	
	// 임포트용 데이터 통신 오브젝트
	var moPObject = new Page();
	
	// 객체검색팝업 호출
	moPObject.moIdsForStdCmnPObjSch = [
	{
		controlId			:	"btnObjNm",
		iCd					:	"",
		iNm					:	"ipbObjNm",
		iObjDivRcd			:	["CC009OG"],
		iStartObject    	:   "",
		iOtDivRcd			:	"",
		iOtIsTreeView	:	"",
		iLanDivRcd		:	"",
		iKeyDate			:	"/root/resOnLoad/keyDateMap/ST_DT",
		iKeyEndDate		:	"",
		oObjDivRcd		:	"/root/reqKey/strObjDivRcd",
		oCd					:	"/root/reqKey/strObjCd",
		oCdNm				:	"ipbObjNm",
		oBegDt				:	"",
		oEndDt				:	"",
		oLanDivRcd		:	"",
		func 					:  function(){
			// 검색조건이 있을경우 조회
			var vsObjNm = util.DataMap.getValue(app, "dmReqKey", "strObjNm");
			if(!ValueUtil.isNull(vsObjNm)){
				util.Header.clickSearch(app);
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
	 * @author 박갑수 at 2016. 6. 3
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		// import 헤더 초기화
		doHeaderOnLoad();
	};
	
	/**
	 * @desc onLoad 실행
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 6. 3
	 */
	moPage.onModelConstructDone_ExtCgdCWarnPsnMng = function() {
		
		// 리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["rptCgdRecAdt"]);
		// 검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grpData"]);
		
		// 서브미션 호출
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				
				util.Control.redraw(app, ["cbbSchYearRcd", "cbbSmtRcd", "ipbObjNm", "dipKeyDate"]);
				util.Control.setFocus(app, "ipbObjNm");
				
				// 학기 필터링으로인해 계절학기일경우 빈값으로 세팅
				var vsSmtRcd = util.Control.getValue(app, "cbbSmtRcd");
				var vsCdPrp1 = ExtInstance.getValue("/root/resOnLoad/smtRcdList/row", "CD_PRP1" , "child::CD='"+vsSmtRcd+"'");
				if(ValueUtil.fixNull(vsCdPrp1) != "CA00101"){
					util.Control.setValue(app, "cbbSmtRcd", "");
				}
				
				var vsSmtRcd = util.DataMap.getValue(app, "dmKeyDateMap", "SMT");
				var vsChgSmtRcd = "";
				if(ValueUtil.fixNull(vsSmtRcd) == "CA00390"){
					vsChgSmtRcd = "CA00310";
				}else if(ValueUtil.fixNull(vsSmtRcd) == "CA00392"){
					vsChgSmtRcd = "CA00320";
				}
				
				// 통지서발송임포트 init 함수
				doInitByImpExtCsrIfrSndCommon("CSR12306", "rptCgdRecAdt", function(pbSuccess){
					if(pbSuccess){
						// 조회
						doList(function(pbSuccess) {
							// 조회 : "갱신된 데이터가 조회되었습니다." header 메세지 표시
							if (pbSuccess) util.Msg.notify(app, "NLS.INF.M025");
						});
					}
				}, "N", null, util.DataMap.getValue(app, "dmKeyDateMap", "END_DT"), util.DataMap.getValue(app, "/root/keyDateMap/YEAR"), vsChgSmtRcd);
			}
		}, true);
	};
	
	/**
	 * @desc [cbbSchYearRcd]학년도 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 6. 3
	 */
	moPage.onValueChanged_CbbSchYearRcd = function() {
		// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
		doChangeYearSmt("year");
	};
	
	/**
	 * @desc [cbbSmtRcd]학기 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 6. 3
	 */
	moPage.onValueChanged_CbbSmtRcd = function() {
		// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
		doChangeYearSmt("smt");
	};
	
	/**
	 * @desc 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 6. 3
	 */
	function doChangeYearSmt(psDiv) {
		//strCommand: date 
		util.Submit.send(app, "subDate", function(pbSuccess){
			if(pbSuccess){
				msSchYearRcd = util.DataMap.getValue(app, "dmKeyDateMap", "YEAR");
				msSmtRcd = util.DataMap.getValue(app, "dmKeyDateMap", "SMT");
				
				var vsSmtRcd = util.DataMap.getValue(app, "dmKeyDateMap", "SMT");
				var vsChgSmtRcd = "";
				if(ValueUtil.fixNull(vsSmtRcd) == "CA00390"){
					vsChgSmtRcd = "CA00310";
				}else if(ValueUtil.fixNull(vsSmtRcd) == "CA00392"){
					vsChgSmtRcd = "CA00320";
				}
				
				// 통지서출력시 사용될 값을 다시 세팅한다.
				setKeyDateByImpExtCsrIfrSndCommon(util.DataMap.getValue(app, "dmKeyDateMap", "END_DT"));
				setSchYearRcdByImpExtCsrIfrSndCommon(util.DataMap.getValue(app, "dmKeyDateMap", "YEAR"));
				setSmtRcdByImpExtCsrIfrSndCommon(vsChgSmtRcd);
				
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
	 * @desc [btnObjNm]부서명(돋보기버튼) onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 6. 3
	 */
	moPage.onClick_BtnObjNm = function(sender) {
		// 객체검색팝업 호출
		doOnClickStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc [ipbObjNm]부서명 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 6. 3
	 */
	moPage.onValueChanged_IpbObjNm = function(sender) {
		// 값변경시 객체검색팝업 호출
		doOnChangeStdCmnPObjSch(sender);
	};

	/**
	 * @desc [btnSearch]조회 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 6. 3
	 */
	moPage.onClick_BtnSearch = function() {
		// 조회조건 필수 체크
		if(!util.validate(app, ["cbbSchYearRcd", "cbbSmtRcd", "ipbObjNm", "dipKeyDate"])){
			return false;
		}

		// 조회
		doList(function(pbSuccess) {
			// 조회 : "조회되었습니다." header 메세지 표시
			if (pbSuccess) util.Msg.notify(app, "NLS.INF.M024");
		});
	};
	
	/**
	 * @desc 주목록 조회
	 * @param poCallBackFunc 콜백정의
	 * @return void
	 * @author 박갑수 at 2016. 6. 3
	 */
	function doList(poCallBackFunc) {
		
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdCgdRecAdt");	
				// 조회 후 콜백함수 수행
				if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess); 
			}
		});
	};
	
	/**
	 * @desc [rhCkbSelect]패널 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 6. 3
	 */
	moPage.onValueChanged_RhCkbSelect = function() {
		// 리피트 패널 설정
//TO-BE: <ExtRepeat.selectedAllPanel> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.selectedAllPanel("rhCkbSelect");
	};

	return moPage;
};
