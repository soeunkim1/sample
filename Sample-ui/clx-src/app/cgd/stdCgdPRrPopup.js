//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./stdCgdPRrPopup.xtm"/>

/**
 * 성적인정항목검색(Popup)
 * @class stdCgdPRrPopup
 * @author 박갑수 at 2016. 3. 21
 */
var stdCgdPRrPopup = function() {
	var moPage = new Page();
	
	// 팝업 내부사용 변수
	var moStdCgdPRrPopup = {
		controlId 						: "",
		openedByChange			: false,
		skipOnChange				: false,
		// 선택가능 범위를 제한
		strRrCd					: "",
		strRrNm				: "",
		strRrDivRcd			: "",
		strRrPrpRcd			: "",
		strKeyDate				: "",
		strLanDivRcd			: "",
		
		// 선택열 결과 리턴
		Result : {
			RR_CD 				: "",
			RR_NM 			: "",
			RR_DIV_RCD 		: "",
			RR_DIV_NM 		: "",
			RR_PRP_RCD 	: "",
			RR_PRP_NM 		: "",
			RR_PNT 			: "",
			SP_DGR_RCD 	: "",
			SP_DGR_NM 		: "",
			OBJ_DIV_RCD 	: ""
		}
	};
	
	/**
	 * @desc import 헤더 초기화
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 3. 21
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		// import 헤더 초기화
		doHeaderOnLoad();
	};
	
	/**
	 * @desc onLoad 실행
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 21
	 */
	moPage.onModelConstructDone_StdCgdPRrPopup = function() {
		// 리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["rptCgdRr"]);
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
	 * @author 박갑수 at 2016. 3. 21
	 */
	function doParentGet() {
		
		if(ExtPopUp.isPopUp()) {
			
			// 호출한 페이지에서 파라미터 받기.													
			var voStdCgdPRrPopup =  ExtPopUp.getParentVal("moStdCgdPRrPopup");
			
			// 파라미터  값복사 (deep copy)
			for (var key in voStdCgdPRrPopup) {
				if (key == "Result") {
					// 결과 값은 복사하지 않음.
					continue;
				}
				moStdCgdPRrPopup [key] = voStdCgdPRrPopup [key];
			}
			
			// 팝업이 뜬후에는 false로 고침.
			voStdCgdPRrPopup.openedByChange = false;
		}
	};
	
	/**
	 * @desc 검색조건 및 코드값 세팅
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 21
	 */
	function doOnLoad() {
		
		// 파라미터 받아서 초기 검색조건 세팅.
		var voParam = moStdCgdPRrPopup;
		
		// 성적인정항목코드
		if (!ValueUtil.isNull(voParam.strRrCd)) {
			util.Control.setValue(app, "ipbRrCd", voParam.strRrCd);
		}
		
		// 성적인정항목명
		if (!ValueUtil.isNull(voParam.strRrNm)) {
			util.Control.setValue(app, "ipbLectRoomNm", voParam.strRrNm);
		}
		
		// 성적인정항목구분
		if (!ValueUtil.isNull(voParam.strRrDivRcd)) {
			util.DataMap.setValue(app, "dmReqKey", "strRrDivRcd", voParam.strRrDivRcd);
		}
		
		// 성적인정항목명
		if (!ValueUtil.isNull(voParam.strRrNm)) {
			util.Control.setValue(app, "ipbLectRoomNm", voParam.strRrNm);
		}
		
		// 시작일
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
				
				util.Control.redraw(app, ["cbbRrPrpRcd"]);
				
				// 성적인정용도코드
				if (!ValueUtil.isNull(voParam.strRrPrpRcd)) {
					util.Control.setValue(app, "cbbRrPrpRcd", voParam.strRrPrpRcd);
				}
				
				// 검색조건이 입력되어 있는 경우 바로 검색 실행(돋보기버튼제외)
				if(!voParam.controlId.startsWith("btn")){
					if (voParam.strRrCd || voParam.strRrNm) {
						util.Header.clickSearch(app);
					}
				}
			}
		});
	};
	
	/**
	 * @desc [ipbRrCd]성적인정항목코드 onKeyDown 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 21
	 */
	moPage.onKeyDown_IpbRrCd = function(strKeyType, strKeyStatus) {
		// 엔터키 입력시 조회
		if(e.keyCode == cpr.events.KeyCode.ENTER){
			util.Header.clickSearch(app);
		}
	};
	
	/**
	 * @desc [ipbRrNm]성적인정항목명 onKeyDown 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 21
	 */
	moPage.onKeyDown_IpbRrNm = function(strKeyType, strKeyStatus) {
		// 엔터키 입력시 조회
		if(e.keyCode == cpr.events.KeyCode.ENTER){
			util.Header.clickSearch(app);
		}
	};
	
	/**
	 * @desc [btnSearch]조회 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 21
	 */
	moPage.onClick_BtnSearch = function() {

		doList(function(pbSuccess) {
			// 조회 : "조회되었습니다." header 메세지 표시
			if (pbSuccess) util.Msg.notify(app, "NLS.INF.M024");
		});
	};
	
	/**
	 * @desc 성적인정항목목록 조회
	 * @param poCallBackFunc 콜백정의
	 * @return void
	 * @author 박갑수 at 2016. 3. 21
	 */
	 function doList(poCallBackFunc) {
		
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdCgdRr");	
				// 조회 후 콜백함수 수행
				if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess); 
			}
		});
	};
	 
	 /**
	 * @desc [rptCgdRr]성적인정항목목록 onDoubleClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 21
	 */
	 moPage.onDoubleClick_RptCgdRr = function() {
		// 선택닫기 함수
		doCloseOk();
	};
	 
	 /**
	 * @desc [btnCloseCancel]화면닫기 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 21
	 */
	moPage.onClick_BtnCloseCancel = function() {
		// 팝업 닫기
		app.close();
	};
	
	/**
	 * @desc [btnCloseOk]선택닫기 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 21
	 */
	moPage.onClick_BtnCloseOk = function() {
		// 선택닫기 함수
		doCloseOk();
	};

	/**
	 * @desc 부모페이지 리턴
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 1. 19
	 */
	function doCloseOk(){
		var voResult = moStdCgdPRrPopup.Result;
		
		if(ValueUtil.isNull(util.Grid.getCheckOrSelectedRowIndex(app, "grdCgdRr"))){
			// 선택된 데이터가 없습니다.
			ComMsg.warn("M008");
			return false;
		}
		
		var vnIdx = util.Grid.getIndex(app, "grdCgdRr");
		
		voResult.RR_CD				= util.Grid.getCellValue(app, "grdCgdRr", "RR_CD", vnIdx);
		voResult.RR_NM			= util.Grid.getCellValue(app, "grdCgdRr", "RR_NM" , vnIdx);
		voResult.OBJ_DIV_RCD 	= util.Grid.getCellValue(app, "grdCgdRr", "OBJ_DIV_RCD" , vnIdx);
		voResult.RR_DIV_RCD 	= util.Grid.getCellValue(app, "grdCgdRr", "RR_DIV_RCD" , vnIdx);
		voResult.RR_DIV_NM     	= util.Grid.getCellValue(app, "grdCgdRr", "RR_DIV_NM" , vnIdx);
		voResult.RR_PRP_RCD 	= util.Grid.getCellValue(app, "grdCgdRr", "RR_PRP_RCD", vnIdx);
		voResult.RR_PRP_NM 	= util.Grid.getCellValue(app, "grdCgdRr", "RR_PRP_NM", vnIdx);
		voResult.RR_PNT 			= util.Grid.getCellValue(app, "grdCgdRr", "RR_PNT", vnIdx);
		voResult.SP_DGR_RCD	= util.Grid.getCellValue(app, "grdCgdRr", "SP_DGR_RCD", vnIdx);
		voResult.SP_DGR_NM		= util.Grid.getCellValue(app, "grdCgdRr", "SP_DGR_NM", vnIdx);
		
		ExtPopUp.closeLayeredPopup("callbackStdCgdPRrPopup", moStdCgdPRrPopup);
	};
	
	return moPage;
};
