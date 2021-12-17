//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./stdCgdPEstTplPopup.xtm"/>

/**
 * 강의실검색(Popup)
 * @class stdCgdPEstTplPopup
 * @author 박갑수 at 2016. 3. 18
 */
var stdCgdPEstTplPopup = function() {
	var moPage = new Page();
	
	// 팝업 내부사용 변수
	var moStdCgdPEstTplPopup = {
		controlId 						: "",
		openedByChange			: false,
		skipOnChange				: false,
		// 선택가능 범위를 제한
		strEstTplCd					: "",
		strEstTplNm					: "",
		
		// 선택열 결과 리턴
		Result : {
			c				: "",	
			EST_TPL_NM			: "",	
			UEST_TPL_CD			: "",	
			REF_KEY					: ""
		}
	};
	
	/**
	 * @desc import 헤더 초기화
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 3. 18
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		// import 헤더 초기화
		doHeaderOnLoad();
	};
	
	/**
	 * @desc onLoad 실행
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 18
	 */
	moPage.onModelConstructDone_StdCgdPEstTplPopup = function() {
		// 리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["rptCgdEstTpl"]);
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
	 * @author 박갑수 at 2016. 3. 18
	 */
	function doParentGet() {
		
		if(ExtPopUp.isPopUp()) {
			
			// 호출한 페이지에서 파라미터 받기.													
			var voStdCgdPEstTplPopup =  ExtPopUp.getParentVal("moStdCgdPEstTplPopup");
			
			// 파라미터  값복사 (deep copy)
			for (var key in voStdCgdPEstTplPopup) {
				if (key == "Result") {
					// 결과 값은 복사하지 않음.
					continue;
				}
				moStdCgdPEstTplPopup [key] = voStdCgdPEstTplPopup [key];
			}
			
			// 팝업이 뜬후에는 false로 고침.
			voStdCgdPEstTplPopup.openedByChange = false;
		}
	};
	
	/**
	 * @desc 검색조건 및 코드값 세팅
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 18
	 */
	function doOnLoad() {
		
		// 파라미터 받아서 초기 검색조건 세팅.
		var voParam = moStdCgdPEstTplPopup;
		
		if (!ValueUtil.isNull(voParam.strEstTplCd)) {
			util.Control.setValue(app, "ipbEstTplCd", voParam.strEstTplCd);
		}
		
		if (!ValueUtil.isNull(voParam.strEstTplNm)) {
			util.Control.setValue(app, "ipbEstTplNm", voParam.strEstTplNm);
		}
		
		// 검색조건이 입력되어 있는 경우 바로 검색 실행(돋보기버튼제외)
		if(!voParam.controlId.startsWith("btn")){
			if (voParam.strEstTplCd || voParam.strEstTplNm) {
				util.Header.clickSearch(app);
			}
		}
	};
	
	/**
	 * @desc [ipbEstTplCd]평가템플릿코드 onKeyDown 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 18
	 */
	moPage.onKeyDown_IpbEstTplCd = function(strKeyType, strKeyStatus) {
		// 엔터키 입력시 조회
		if(e.keyCode == cpr.events.KeyCode.ENTER){
			util.Header.clickSearch(app);
		}
	};
	
	/**
	 * @desc [ipbEstTplNm]평가템플릿명 onKeyDown 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 18
	 */
	moPage.onKeyDown_IpbEstTplNm = function(strKeyType, strKeyStatus) {
		// 엔터키 입력시 조회
		if(e.keyCode == cpr.events.KeyCode.ENTER){
			util.Header.clickSearch(app);
		}
	};
	
	/**
	 * @desc [btnSearch]조회 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 18
	 */
	moPage.onClick_BtnSearch = function() {
		// 조회조건 필수체크 - 평가항목코드, 평가항목명 중 한개는 입력되었는지 확인.
		if(!moPage.checkNotNullCtl()){
			return false;
		}

		doList(function(pbSuccess) {
			// 조회 : "조회되었습니다." header 메세지 표시
			if (pbSuccess) util.Msg.notify(app, "NLS.INF.M024");
		});
	};
	
	/**
	 * @desc 평가템플릿코드, 평가템플릿명 중 한개는 입력되었는지 확인.
	 * @param 
	 * @return boolean
	 * @author 박갑수 at 2016. 3. 18
	 */
	moPage.checkNotNullCtl = function() {
		var vbValid = true;
		
		// 학사부서명
		var vsEstTplCd = util.Control.getValue(app, "ipbEstTplCd");
		// 교과목코드/교과목명
		var vsEstTplNm = util.Control.getValue(app, "ipbEstTplNm");
		
		if(ValueUtil.isNull(vsEstTplCd) && ValueUtil.isNull(vsEstTplNm)){
			var vsMsgParam = ExtControl.getTextValue("lblEstTplCd") + ", " + ExtControl.getTextValue("lblEstTplNm");
			
			// "조회조건[@1] 중 하나는 반드시 입력해야 합니다." 메시지 표시
			util.Msg.alert("NLS-CMM-M016", [vsMsgParam]);
			
			vbValid = false;
			return vbValid;
		}
		
		return vbValid;
	};
	
	/**
	 * @desc 평가템플릿목록 조회
	 * @param poCallBackFunc 콜백정의
	 * @return void
	 * @author 박갑수 at 2016. 3. 18
	 */
	function doList(poCallBackFunc) {
		
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdCgdEstTpl");	
				// 조회 후 콜백함수 수행
				if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess); 
			}
		});
	};
	
	/**
	 * @desc [rptCgdEstTpl]평가템플릿목록 onDoubleClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 18
	 */
	moPage.onDoubleClick_RptCgdEstTpl = function() {
		// 선택닫기 함수
		doCloseOk();
	};
	
	/**
	 * @desc [btnCloseOk]선택닫기 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 18
	 */
	moPage.onClick_BtnCloseOk = function() {
		// 선택닫기 함수
		doCloseOk();
	};
	
	/**
	 * @desc [btnCloseCancel]화면닫기 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 18
	 */
	moPage.onClick_BtnCloseCancel = function() {
		// 팝업 닫기
		app.close();
	};
	
	/**
	 * @desc 부모페이지 리턴
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 18
	 */
	function doCloseOk(){
		var voResult = moStdCgdPEstTplPopup.Result;
		
		if(ValueUtil.isNull(util.Grid.getCheckOrSelectedRowIndex(app, "grdCgdEstTpl"))){
			// 선택된 데이터가 없습니다.
			ComMsg.warn("M008");
			return false;
		}
		
		var vnIdx = util.Grid.getIndex(app, "grdCgdEstTpl");
		
		voResult.EST_TPL_CD			= util.Grid.getCellValue(app, "grdCgdEstTpl", "EST_TPL_CD", vnIdx);
		voResult.EST_TPL_NM			= util.Grid.getCellValue(app, "grdCgdEstTpl", "EST_TPL_NM" , vnIdx);
		voResult.UEST_TPL_CD 			= util.Grid.getCellValue(app, "grdCgdEstTpl", "UEST_TPL_CD" , vnIdx);
		voResult.REF_KEY          		= util.Grid.getCellValue(app, "grdCgdEstTpl", "REF_KEY", vnIdx);
		
		ExtPopUp.closeLayeredPopup("callbackStdCgdPEstTplPopup", moStdCgdPEstTplPopup);
	};
	
	return moPage;
};
