//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./stdCrsPSmtPop.xtm"/>


var stdCrsPSmtPop = function() {
	var moPage = new Page();
	//임포트용 데이터 통신 오브젝트
	var moPObject = new PObject();
	
	/*
	 * 부모 페이지에서 받아온 기본값을 받는 객체
	 * @member stdCrsPSmtPop
	 * @author AeyoungLee 2016. 4. 5.
	 */
	moPObject.moCondSmtPopParam = {
		schValue : null,
		ctrlCd : null,
		ctrlNm : null,
		oCd : null,
		oNm : null,
	};
	
	/**
	 * onModelConstructDone_StdCrsPSchYearPop  화면 오픈 시 수행되는 함수
	 * @member stdCrsPSmtPop
	 * @type void
	 * @author AeyoungLee 2016. 4. 5.
	 */
	moPage.onModelConstructDone_StdCrsPSmtPop = function(){
		//리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init("rptSmt");
		//검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", "grpData");
		
		//호출한 페이지에서 파라미터 받기.
		doParentGet();
	}
	
	/**
	 * doParentGet 부모파라미터 셋팅
	 * @member stdCrsPSmtPop
	 * @type void
	 * @author AeyoungLee 2016. 4. 5.
	 */	
	function doParentGet(){
		if(ExtPopUp.isPopUp()) {
			// 호출한 페이지에서 파라미터 받기.										
			var voCondPopParam =  ExtPopUp.getParentVal("moCondParam");
					
			// 파라미터  값복사
			if(voCondPopParam.schValue){
				util.Control.setValue(app, "ipbSmtRcdNm", voCondPopParam.schValue);
			}	
			
			// 바로 검색 실행
			util.Header.clickSearch(app);
		}
	}
		
	/**
	 * onClick_BtnSearch 조회버튼 클릭 이벤트
	 * @member stdCrsPSmtPop
	 * @type void
	 * @author AeyoungLee 2016. 4. 5.
	 */
	moPage.onClick_BtnSearch = function() {
		//strCommand: listSmt 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "rptSmt");
				util.Msg.notify(app, "NLS.INF.M024");
			}
			
		});
	};
	
	/**
	 * doCloseOk (선택닫기 이벤트시 호출) 	
	 * @member stdCrsPSmtPop
	 * @type void
	 * @author AeyoungLee 2016. 4. 5.
	 */
	function doCloseOk() {
		if(ValueUtil.isNull(util.Grid.getCheckOrSelectedRowIndex(app, "grdSmt"))){
			//선택된 데이터가 없습니다.
			ComMsg.warn("M008");
			return false;
		}
		
		var vnIdx = util.Grid.getIndex(app, "grdSmt");
		
		moCondSmtPopParam.oCd  = util.Grid.getCellValue(app, "grdSmt", "CD", vnIdx);
		moCondSmtPopParam.oNm  = util.Grid.getCellValue(app, "grdSmt", "CD_NM", vnIdx);
		moCondSmtPopParam.ctrlCd = "ipbSmtRcd";
		moCondSmtPopParam.ctrlNm = "ipbSmtRcdNm";
		
		if(ExtPopUp.isPopUp()){
			ExtPopUp.closeLayeredPopup("callbackStdCrsPCondPop", moCondSmtPopParam);
		}				
	};
	
	/**
	 * doClose (화면닫기 이벤트시 호출) 	
	 * @member stdCrsPSmtPop
	 * @type void
	 * @author AeyoungLee 2016. 4. 5.
	 */
	function doClose() {
//		moCondSmtPopParam.oCd  = "";
//		moCondSmtPopParam.oNm  = "";
//		moCondSmtPopParam.ctrlCd = "ipbSmtRcd";
//		moCondSmtPopParam.ctrlNm = "ipbSmtRcdNm";
		
		if(ExtPopUp.isPopUp()){
			ExtPopUp.closeLayeredPopup("callbackStdCrsPCondPop", moCondSmtPopParam);
		}				
	};


	return moPage;
};
