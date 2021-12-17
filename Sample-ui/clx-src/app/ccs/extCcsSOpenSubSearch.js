//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCcsSOpenSubSearch.xtm"/>

/**
 * 개설과목조회
 * @class extCcsSOpenSubSearch
 * @author 박갑수 at 2016. 4. 27
 */
var extCcsSOpenSubSearch = function() {
	var moPage = new Page();
	
	// 임포트용 데이터 통신 오브젝트
	var moPObject = new Page();
	
	// 객체검색팝업 호출
	moPObject.moIdsForStdCmnPObjSch = [
	{
		controlId			:	"btnDeptNm",
		iCd					:	"",
		iNm					:	"ipbDeptNm",
		iObjDivRcd			:	["CC009OG", "CC009SA"],
		iStartObject    	:   "",
		iOtDivRcd			:	"",
		iOtIsTreeView	:	"",
		iLanDivRcd		:	"/root/resOnLoad/strLanDivRcd",
		iKeyDate			:	"/root/keyDateMap/ST_DT",
		iKeyEndDate		:	"",
		oObjDivRcd		:	"/root/reqKey/strObjDivRcd",
		oCd					:	"/root/reqKey/strDeptCd",
		oCdNm				:	"ipbDeptNm",
		oBegDt				:	"",
		oEndDt				:	"",
		oLanDivRcd		:	"",
		func 					:  function(){
			// 검색조건이 있을경우 조회
			var vsSchYearRcd = util.Control.getValue(app, "cbbSchYearRcd");
			var vsSmtRcd = util.Control.getValue(app, "cbbSmtRcd");
			var vsDeptCd = util.DataMap.getValue(app, "dmReqKey", "strDeptCd");
			
			if(!ValueUtil.isNull(vsSchYearRcd) && !ValueUtil.isNull(vsSmtRcd) && !ValueUtil.isNull(vsDeptCd)){
				//ExtModel.dispatch("btnSearch", "DOMActivate");
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
	 * @author 박갑수 at 2016. 4. 27
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		// import 헤더 초기화
		doHeaderOnLoad();
	};
	
	/**
	 * @desc onLoad 실행
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 27
	 */
	moPage.onModelConstructDone_ExtCcsSOpenSubSearch = function() {
		// 리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["rptCcsOpenSub"]);
		// 검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grpData"]);
		
		// 서브미션 호출
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				
				util.Control.redraw(app, ["cbbSchYearRcd", "cbbSmtRcd", "cbbSbLvlRcd", "cbbCmpDivRcd"]);
				
				// 권한에 따른 소속부서 default값 세팅 
				doSetCtlByAuth();
			}
		}, true);
	};
	
	/**
	 * 권한에 따른 소속부서 default값 세팅 
	 * @param 
	 * @type void
	 * @author 박갑수 at 2016. 8. 9
	 */	
	function doSetCtlByAuth() {
		
		// 전체권한[CC00102] 아닐경우 자신의 소속 Default 세팅 
		if (moPageInfo.authRngRcd != "CC00102") {
			
			util.DataMap.setValue(app, "dmReqKey", "strObjDivRcd", moUserInfo.asgnDeptDivRcd);
			util.DataMap.setValue(app, "dmReqKey", "strDeptCd", moUserInfo.asgnDeptCd);
			util.Control.setValue(app, "ipbDeptNm", moUserInfo.asgnDeptNm);
		}
	};
	
	/**
	 * @desc [cbbSchYearRcd]학년도 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 27
	 */
	moPage.onValueChanged_CbbSchYearRcd = function() {
		// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
		doChangeYearSmt("year");
	};
	
	/**
	 * @desc [cbbSmtRcd]학기 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 27
	 */
	moPage.onValueChanged_CbbSmtRcd = function() {
		// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
		doChangeYearSmt("smt");
	};
	
	/**
	 * @desc 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 27
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
	 * @desc [btnDeptNm]소속(돋보기버튼) onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 27
	 */
	moPage.onClick_BtnDeptNm = function(sender) {
		// 객체검색팝업 호출
		doOnClickStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc [ipbDeptNm]소속 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 27
	 */
	moPage.onValueChanged_IpbDeptNm = function(sender) {
		// 값변경시 객체검색팝업 호출
		doOnChangeStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc [btnSearch]조회 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 27
	 */
	moPage.onClick_BtnSearch = function() {
		// 작업영역 리피트 변경 내역 체크
		if(util.Grid.isModified(app, "", "CRM")){
			return false;
		}

		// 조회조건 필수 체크
		if(!util.validate(app, ["cbbSchYearRcd", "cbbSmtRcd", "ipbDeptNm"])){
			return false;
		}

		// 조회
		doList(function(pbSuccess) {
			if (pbSuccess){
				// 조회 : "조회되었습니다." header 메세지 표시
				util.Msg.notify(app, "NLS.INF.M024");
			}
		});
	};
	
	/**
	 * @desc 성적내역 조회
	 * @param poCallBackFunc 콜백정의
	 * @return void
	 * @author 박갑수 at 2016. 4. 27
	 */
	function doList(poCallBackFunc) {
		
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdCcsOpenSub");
				
				// 조회 후 콜백함수 수행
				if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess); 
			}
		});
	};
	
	/**
	 * @desc [ipbDivclsNm]분반 onKeyDown 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 27
	 */
	moPage.onKeyDown_IpbDivclsNm = function(strKeyType, strKeyStatus) {
		// 엔터키 입력시 조회
		if(e.keyCode == cpr.events.KeyCode.ENTER){
			// 검색조건이 있을경우 조회
			var vsSchYearRcd = util.Control.getValue(app, "cbbSchYearRcd");
			var vsSmtRcd = util.Control.getValue(app, "cbbSmtRcd");
			var vsDeptCd = util.DataMap.getValue(app, "dmReqKey", "strDeptCd");
			
			if(!ValueUtil.isNull(vsSchYearRcd) && !ValueUtil.isNull(vsSmtRcd) && !ValueUtil.isNull(vsDeptCd)){
				util.Header.clickSearch(app);
			}
		}
	};
	
	/**
	 * @desc [ipbSbNm]과목명 onKeyDown 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 27
	 */
	moPage.onKeyDown_IpbSbNm = function(strKeyType, strKeyStatus) {
		// 엔터키 입력시 조회
		if(e.keyCode == cpr.events.KeyCode.ENTER){
			// 검색조건이 있을경우 조회
			var vsSchYearRcd = util.Control.getValue(app, "cbbSchYearRcd");
			var vsSmtRcd = util.Control.getValue(app, "cbbSmtRcd");
			var vsDeptCd = util.DataMap.getValue(app, "dmReqKey", "strDeptCd");
			
			if(!ValueUtil.isNull(vsSchYearRcd) && !ValueUtil.isNull(vsSmtRcd) && !ValueUtil.isNull(vsDeptCd)){
				util.Header.clickSearch(app);
			}
		}
	};
	
	return moPage;
};
