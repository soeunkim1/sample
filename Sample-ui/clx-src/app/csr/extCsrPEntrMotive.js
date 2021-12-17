//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCsrPEntrMotive.xtm"/>


var extCsrPEntrMotive = function() {
	var moPage = new Page();
	
	/**
	 * @desc 받아온 변수 조회조건에 셋팅
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 01. 12.
	 */
	function doOnLoad() {
		//리피트 초기화
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init([ "frfCsrEntrInfo"]);
		// 서브미션 호출
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if (pbSuccess) {			
				util.Control.redraw(app, ["frfCsrEntrInfo"]);
			}
		});
	}
	
	/**
	 * @desc 헤더 온로드 실행
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 01. 12.
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		doHeaderOnLoad();
	};

	
	moPage.onValueChanged_CbbFrfMotive = function() {
		
		var vEntrMotive = util.DataMap.getValue(app, "dmFrfCsrEntrInfo", "ENTR_MOTIVE_RCD"); 
	// 기타인 경우에만 텍스트창이 보이도록 
			if (vEntrMotive == "CSR00199" ) {
				util.Control.setVisible(app, true, ["ipbEntrMotive"]);
			}else{
				util.Control.setVisible(app, false, ["ipbEntrMotive"]);
			}
	};
	
	
	moPage.onModelConstructDone_ExtCsrPEntrMotive = function() {
		//화면 온로드 서브미션 호출
		doOnLoad();
		
	};
	
	
	
	function doSubSave() {
		
		//리피트 validation check
		if(!util.validate(app, ["frfCsrEntrInfo"])){
			return false;
		}
		
		var vStudId = util.DataMap.getValue(app, "dmFrfCsrEntrInfo", "STUD_ID"); 
		util.DataMap.setValue(app, "dmReqKey", "strStudId", vStudId);
		// 서브미션 호출
		//strCommand: save 
		util.Submit.send(app, "subSave", function(pbSuccess){
				app.close();
		});
		
	};
	
	
	moPage.onClick_BtnEntr = function() {
		doSubSave();
	};
	return moPage;
};
