//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCgdPEstFctorStudInfo.xtm"/>

/**
 * 성적평가요소검색
 * @class extCgdPEstFctorStudInfo
 * @author 박갑수 at 2016. 5. 27
 */
var extCgdPEstFctorStudInfo = function() {
	var moPage = new Page();
	
	/**
	 * @desc onLoad 실행
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 27
	 */
	moPage.onModelConstructDone_ExtCgdPEstFctorStudInfo = function() {
		if(ExtPopUp.isPopUp()){
			// 리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//			ExtRepeat.init(["rptCgdIndiRecInput"]);
			
			var voParam =  ExtPopUp.getParentVal("moIdsForCgdEstFctorStudInfo");
			
			util.DataMap.setValue(app, "dmReqKey", "strStudId", voParam.iStudId);
			util.DataMap.setValue(app, "dmReqKey", "strTlsnRefKey", voParam.iTlsnRefKey);
			util.DataMap.setValue(app, "dmReqKey", "strKeyDate", voParam.iKeyDate);

			//strCommand: list 
			util.Submit.send(app, "subList", function(pbSuccess){
				if(pbSuccess){
					util.Control.redraw(app, "grdCgdIndiRecInput");
				}
			});
		}
	};
	
	/**
	 * @desc [btnCloseCancel]화면닫기 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 27
	 */
	moPage.onClick_BtnCloseCancel = function() {
		// 팝업 닫기
		app.close();
	};
	
	return moPage;
};
