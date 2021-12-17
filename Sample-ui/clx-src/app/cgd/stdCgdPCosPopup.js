//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./stdCgdPCosPopup.xtm"/>

/**
 * 외부교과목검색검색(Popup)
 * @class stdCgdPCosPopup
 * @author 박갑수 at 2016. 3. 21
 */
var stdCgdPCosPopup = function() {
	var moPage = new Page();
	
	// 임포트용 데이터 통신 오브젝트
	var moPObject = new Page();
	
	// 객체검색팝업 호출
	moPObject.moIdsForStdCmnPObjSch = [
	{
		controlId			:	"btnOtCd",
		iCd					:	"",
		iNm					:	"ipbOtNm",
		iObjDivRcd			:	["CC009OT"],
		iStartObject    	:   "",
		iOtDivRcd			:	"",
		iOtIsTreeView	:	"",
		iLanDivRcd		:	"/root/reqKey/strLanDivRcd",
		iKeyDate			:	"/root/reqKey/strKeyDate",
		iKeyEndDate		:	"",
		oCd					:	"/root/reqKey/strOtCd",
		oCdNm				:	"ipbOtNm",
		oBegDt				:	"",
		oEndDt				:	"",
		oLanDivRcd		:	"/root/reqKey/strLanDivRcd",
		func 					:  function(poRtnValue){
			// 검색조건이 있을경우 조회
			var vsOtNm = util.Control.getValue(app, "ipbOtNm");
			if(!ValueUtil.isNull(vsOtNm)){
				util.Header.clickSearch(app);
			}
		}
	}];
	
	// 팝업 내부사용 변수
	var moStdCgdPCosPopup = {
		controlId 						: "",
		openedByChange			: false,
		skipOnChange				: false,
		// 선택가능 범위를 제한
		strOsCd					: "",
		strOsNm					: "",
		strOsPrpRcd				: "",
		strOtCd						: "",
		strKeyDate					: "",
		strLanDivRcd				: "",
		
		// 선택열 결과 리턴
		Result : {
			OS_CD 					: "",
			OS_NM 				: "",
			OBJ_DIV_RCD 		: "",
			OT_CD		 			: "",
			OT_NM			 		: "",
			OT_OBJ_DIV_RCD 	: "",
			OS_PRP_RCD 		: "",
			OS_DIV_RCD 			: "",
			OS_DIV_NM 			: ""
		}
	};
	
	/**
	 * @desc import 헤더 초기화
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 3. 23
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		// import 헤더 초기화
		doHeaderOnLoad();
	};
	
	/**
	 * @desc onLoad 실행
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 23
	 */
	moPage.onModelConstructDone_StdCgdPCosPopup = function() {
		// 리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["rptCgdOs"]);
		// 검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grpData"]);
		
		// 호출한 페이지에서 파라미터 받기.
		doParentGet();

		// 화면 온로드
		doOnLoad();
	};
	
	/**
	 * @desc 호출한 페이지에서 파라미터 받기
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 23
	 */
	function doParentGet() {
		
		if(ExtPopUp.isPopUp()) {
			
			// 호출한 페이지에서 파라미터 받기.													
			var voStdCgdPCosPopup =  ExtPopUp.getParentVal("moStdCgdPCosPopup");
			
			// 파라미터  값복사 (deep copy)
			for (var key in voStdCgdPCosPopup) {
				if (key == "Result") {
					// 결과 값은 복사하지 않음.
					continue;
				}
				moStdCgdPCosPopup [key] = voStdCgdPCosPopup [key];
			}
			
			// 팝업이 뜬후에는 false로 고침.
			voStdCgdPCosPopup.openedByChange = false;
		}
	};
	
	/**
	 * @desc 검색조건 및 코드값 세팅
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 23
	 */
	function doOnLoad() {
		
		// 파라미터 받아서 초기 검색조건 세팅.
		var voParam = moStdCgdPCosPopup;
		
		// 외부교과목코드
		if (!ValueUtil.isNull(voParam.strOsCd)) {
			util.Control.setValue(app, "ipbOsCd", voParam.strOsCd);
		}
		
		// 외부교과목명
		if (!ValueUtil.isNull(voParam.strOsNm)) {
			util.Control.setValue(app, "ipbOsNm", voParam.strOsNm);
		}
		
		// 외부부서코드
		if (!ValueUtil.isNull(voParam.strOtCd)) {
			util.DataMap.setValue(app, "dmReqKey", "strOtCd", voParam.strLanDivRcd);
		}
		
		// 기준일자
		if (!ValueUtil.isNull(voParam.strKeyDate)) {
			util.DataMap.setValue(app, "dmReqKey", "strKeyDate", voParam.strKeyDate);
		}
		
		// 언어키
		if (!ValueUtil.isNull(voParam.strLanDivRcd)) {
			util.DataMap.setValue(app, "dmReqKey", "strLanDivRcd", voParam.strLanDivRcd);
		}
		// 서브미션 호출
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if (pbSuccess) {
				
				util.Control.redraw(app, ["cbbOsPrpRcd"]);
				
				// 외부교과목용도코드
				if (!ValueUtil.isNull(voParam.strOsPrpRcd)) {
					util.Control.setValue(app, "cbbOsPrpRcd", voParam.strOsPrpRcd);
				}
				
				// 검색조건이 입력되어 있는 경우 바로 검색 실행(돋보기버튼제외)
				if(!voParam.controlId.startsWith("btn")){
					if (voParam.strOsCd || voParam.strOsNm) {
						util.Header.clickSearch(app);
					}
				}
			}
		});
	};
	
	/**
	 * @desc [btnOtCd]외부부서명(돋보기버튼) onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 23
	 */
	moPage.onClick_BtnOtCd = function(sender) {
		// 객체검색팝업 호출
		doOnClickStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc [ipbSaNm]외부부서명 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 23
	 */
	moPage.onValueChanged_IpbOtNm = function() {
		// 값변경시 객체검색팝업 호출
		doOnChangeStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc [ipbOsCd]외부교과목코드 onKeyDown 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 23
	 */
	moPage.onKeyDown_IpbOsCd = function(strKeyType, strKeyStatus) {
		// 엔터키 입력시 조회
		if(e.keyCode == cpr.events.KeyCode.ENTER){
			util.Header.clickSearch(app);
		}
	};
	
	/**
	 * @desc [ipbOsNm]외부교과목명 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 23
	 */
	moPage.onKeyDown_IpbOsNm = function(strKeyType, strKeyStatus) {
		// 엔터키 입력시 조회
		if(e.keyCode == cpr.events.KeyCode.ENTER){
			util.Header.clickSearch(app);
		}
	};
	
	/**
	 * @desc [btnSearch]조회 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 23
	 */
	moPage.onClick_BtnSearch = function() {

		doList(function(pbSuccess) {
			// 조회 : "조회되었습니다." header 메세지 표시
			if (pbSuccess) util.Msg.notify(app, "NLS.INF.M024");
		});
	};
	
	/**
	 * @desc 외부교과목목록 조회
	 * @param poCallBackFunc 콜백정의
	 * @return void
	 * @author 박갑수 at 2016. 3. 23
	 */
	function doList(poCallBackFunc) {
		
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdCgdOs");	
				// 조회 후 콜백함수 수행
				if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess); 
			}
		});
	};
	
	/**
	 * @desc [rptCgdOs]외부교과목목록 onDoubleClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 23
	 */
	moPage.onDoubleClick_RptCgdOs = function() {
		// 선택닫기 함수
		doCloseOk();
	};
	
	/**
	 * @desc [btnSearch]선택닫기 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 23
	 */
	moPage.onClick_BtnCloseOk = function() {
		// 선택닫기 함수
		doCloseOk();
	};
	
	/**
	 * @desc [btnCloseCancel]화면닫기 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 23
	 */
	moPage.onClick_BtnCloseCancel = function() {
		// 팝업 닫기
		app.close();
	};
	
	/**
	 * @desc 부모페이지 리턴
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 1. 28
	 */
	function doCloseOk(){
		var voResult = moStdCgdPCosPopup.Result;
		
		if(ValueUtil.isNull(util.Grid.getCheckOrSelectedRowIndex(app, "grdCgdOs"))){
			// 선택된 데이터가 없습니다.
			ComMsg.warn("M008");
			return false;
		}
		
		var vnIdx = util.Grid.getIndex(app, "grdCgdOs");
		
		voResult.OS_CD								= util.Grid.getCellValue(app, "grdCgdOs", "OS_CD", vnIdx);
		voResult.OS_NM			    			= util.Grid.getCellValue(app, "grdCgdOs", "OS_NM" , vnIdx);
		voResult.OBJ_DIV_RCD 					= util.Grid.getCellValue(app, "grdCgdOs", "OBJ_DIV_RCD" , vnIdx);
		voResult.OT_CD   							= util.Grid.getCellValue(app, "grdCgdOs", "OT_CD" , vnIdx);
		voResult.OT_NM      						= util.Grid.getCellValue(app, "grdCgdOs", "OT_NM" , vnIdx);
		voResult.OT_OBJ_DIV_RCD 			= util.Grid.getCellValue(app, "grdCgdOs", "OT_OBJ_DIV_RCD", vnIdx);
		voResult.OS_PRP_RCD        	 		= util.Grid.getCellValue(app, "grdCgdOs", "OS_PRP_RCD", vnIdx);
		voResult.OS_DIV_RCD 					= util.Grid.getCellValue(app, "grdCgdOs", "OS_DIV_RCD", vnIdx);
		voResult.OS_DIV_NM        				= util.Grid.getCellValue(app, "grdCgdOs", "OS_DIV_NM", vnIdx);
		
		ExtPopUp.closeLayeredPopup("callbackStdCgdPCosPopup", moStdCgdPCosPopup);
	};
	
	return moPage;
};
