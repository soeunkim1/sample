//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./stdCrsPRegFeePayAcctPop.xtm"/>


var stdCrsPRegFeePayAcctPop = function() {
	var moPage = new Page();
	//임포트용 데이터 통신 오브젝트
	var moPObject = new PObject();
	
	/*
	 * 부모 페이지에서 받아온 기본값을 받는 객체
	 * 내부적으로 Result라는 객체를 가지고 있으며, 부모에 넘겨줄 결과값을 저장
	 * @member stdCrsPRegFeePayAcctPop
	 * @author AeyoungLee 2016. 3. 28.
	 */
	moPObject.moStdCrsPAcctSchPop = {
		// 팝업 작동 내부사용
		controlId : "",
		openedByChange : false,
		skipOnChange : false,
		// 선택가능 범위를 제한함.
		strAcctNm  : "",
		// 검색어 기본값 지정
		strKeyDate : "",
		// 선택열 결과 리턴 - 모든 칼럼을 넘겨줄 수 있도록 한다.
		result : {
			CD : "",		// 납입계좌코드
			CD_NM : "",		// 납입계좌명
			CD_PRP1 : "",	// 은행코드
			CD_PRP2 : ""	// 계좌번호
		}
	};
	
	/**
	 * 화면 오픈 시 수행되는 함수
	 * @member stdCrsPRegFeePayAcctPop
	 * @type void
	 * @author AeyoungLee 2016. 3. 28.
	 */
	moPage.onModelConstructDone_StdCrsPRegFeePayAcctPop = function(){
		//리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init("rptAcct");
		//검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", "grpData");
		
		//호출한 페이지에서 설정 파라미터 받기.
		doParentGet();
	}
	
	/**
	 * doParentGet 호출한 페이지에서 설정 파라미터 셋팅
	 * @member stdCrsPRegFeePayAcctPop
	 * @type void
	 * @author AeyoungLee 2016. 3. 28.
	 */	
	function doParentGet(){
		if(ExtPopUp.isPopUp()) {
			// 호출한 페이지에서 파라미터 받기.													
			var voStdCrsPAcctSch =  ExtPopUp.getParentVal("moStdCrsPAcctSch");
			
			// 파라미터  값복사 (deep copy)
			for (var key in voStdCrsPAcctSch) {
				if (key == "result") {
					// 결과 값은 복사하지 않음.
					continue;
				}
				moStdCrsPAcctSchPop [key] = voStdCrsPAcctSch [key];
			}
			// 팝업이 뜬후에는 false로 고침.
			voStdCrsPAcctSch.openedByChange = false;
		}
		
		// 파라미터 받아서 초기 검색조건 세팅.
		var voParam = moStdCrsPAcctSchPop;
		
		if (voParam.strAcctNm) {
			util.Control.setValue(app, "ipbAcctNm", voParam.strAcctNm);
		}
		
		// 바로 검색 실행
		if ((voParam.strAcctNm || voParam.strAcctNm)) {
			util.Header.clickSearch(app);
		}
	}
		
	 /**
	 * doList 조회 
	 * @member stdCrsPRegFeePayAcctPop
	 * @type void
	 * @author AeyoungLee 2016. 3. 28.
	 */
	function doList() {
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, ["grdAcct"]);
				util.Msg.notify(app, "NLS.INF.M024");
			}
		});
	};
	
	/**
	 * doCloseOk (선택닫기 이벤트시 호출) 	
	 * @member stdCrsPRegFeePayAcctPop
	 * @type void
	 * @author AeyoungLee 2016. 3. 28.
	 */
	function doCloseOk() {
		if(ValueUtil.isNull(util.Grid.getCheckOrSelectedRowIndex(app, "grdAcct"))){
			//선택된 데이터가 없습니다.
			ComMsg.warn("M008");
			return false;
		}
		
		var vnIdx = util.Grid.getIndex(app, "grdAcct");
		
		var voResult = moStdCrsPAcctSchPop.result;
		voResult.CD		 = util.Grid.getCellValue(app, "grdAcct", "CD", vnIdx);
		voResult.CD_NM   = util.Grid.getCellValue(app, "grdAcct", "CD_NM", vnIdx);
		voResult.CD_PRP1 = util.Grid.getCellValue(app, "grdAcct", "CD_PRP1", vnIdx);
		voResult.CD_PRP2 = util.Grid.getCellValue(app, "grdAcct", "CD_PRP2", vnIdx);
			
		if(ExtPopUp.isPopUp()){
			ExtPopUp.closeLayeredPopup("callbackStdCrsPAcctSch", moStdCrsPAcctSchPop);
		}				
	}

	return moPage;
};
