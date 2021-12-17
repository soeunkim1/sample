//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./stdCrsPOGCdPop.xtm"/>


var stdCrsPOGCdPop = function() {
	var moPage = new Page();
	//임포트용 데이터 통신 오브젝트
	var moPObject = new PObject();
	
	/*
	 * 부모 페이지에서 받아온 기본값을 받는 객체
	 * @member stdCrsPOGCdPop
	 * @author AeyoungLee 2016. 4. 5.
	 */
	moPObject.moCondOgPopParam = {
		schValue : null,
		ctrlCd : null,
		ctrlNm : null,
		oCd : null,
		oNm : null,
	};
	
	/**
	 * onModelConstructDone_StdCrsPOGCdPop  화면 오픈 시 수행되는 함수
	 * @member stdCrsPOGCdPop
	 * @type void
	 * @author AeyoungLee 2016. 4. 5.
	 */
	moPage.onModelConstructDone_StdCrsPOGCdPop = function(){
		//리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init("rptObj");
		//검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", "grpData");
		
		//호출한 페이지에서 파라미터 받기.
		doParentGet();
	}
	
	/**
	 * doParentGet 부모파라미터 셋팅
	 * @member stdCrsPOGCdPop
	 * @type void
	 * @author AeyoungLee 2016. 4. 5.
	 */	
	function doParentGet(){
		if(ExtPopUp.isPopUp()) {
			
			// 호출한 페이지에서 파라미터 받기.										
			var voCondPopParam =  ExtPopUp.getParentVal("moCondParam");
			util.DataMap.setValue(app, "dmReqKey", "strSchYearRcd", voCondPopParam.schYear);
			util.DataMap.setValue(app, "dmReqKey", "strSmtRcd", voCondPopParam.schSmt);
			util.DataMap.setValue(app, "dmReqKey", "strObjDivRcd", "CC009OG");
			util.DataMap.setValue(app, "dmReqKey", "strAuthRange", moPageInfo.authRngRcd);
					
			// 파라미터  값복사
			if(voCondPopParam.schValue){
				util.Control.setValue(app, "ipbObjDivRcdNm", voCondPopParam.schValue);
			}	
			
			// 바로 검색 실행
			util.Header.clickSearch(app);
		}
	}
		
	/**
	 * onClick_BtnSearch 조회버튼 클릭 이벤트
	 * @member stdCrsPOGCdPop
	 * @type void
	 * @author AeyoungLee 2016. 4. 5.
	 */
	moPage.onClick_BtnSearch = function() {
		//strCommand: listObjCd 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "rptObj");
				util.Msg.notify(app, "NLS.INF.M024");
			}
			
		});
	};
	
	/**
	 * doCloseOk (선택닫기 이벤트시 호출) 	
	 * @member stdCrsPOGCdPop
	 * @type void
	 * @author AeyoungLee 2016. 4. 5.
	 */
	function doCloseOk() {
		if(ValueUtil.isNull(util.Grid.getCheckOrSelectedRowIndex(app, "grdObj"))){
			//선택된 데이터가 없습니다.
			ComMsg.warn("M008");
			return false;
		}
		
		var vnIdx = util.Grid.getIndex(app, "grdObj");
		
		moCondOgPopParam.oCd  = util.Grid.getCellValue(app, "grdObj", "CD", vnIdx);
		moCondOgPopParam.oNm  = util.Grid.getCellValue(app, "grdObj", "CD_NM", vnIdx);
		moCondOgPopParam.ctrlCd = "ipbObjDivRcd";
		moCondOgPopParam.ctrlNm = "ipbObjDivRcdNm";
		
		if(ExtPopUp.isPopUp()){
			ExtPopUp.closeLayeredPopup("callbackStdCrsPCondPop", moCondOgPopParam);
		}				
	};
	
	/**
	 * doClose (화면닫기 이벤트시 호출) 	
	 * @member stdCrsPOGCdPop
	 * @type void
	 * @author AeyoungLee 2016. 4. 5.
	 */
	function doClose() {
//		moCondOgPopParam.oCd  = "";
//		moCondOgPopParam.oNm  = "";
//		moCondOgPopParam.ctrlCd = "ipbObjDivRcd";
//		moCondOgPopParam.ctrlNm = "ipbObjDivRcdNm";
		
		if(ExtPopUp.isPopUp()){
			ExtPopUp.closeLayeredPopup("callbackStdCrsPCondPop", moCondOgPopParam);
		}				
	};

	return moPage;
};
