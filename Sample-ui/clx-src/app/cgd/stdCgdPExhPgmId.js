//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./stdCgdPExhPgmId.xtm"/>

/**
 * 교환학생검색
 * @class stdCgdPExhPgmId
 * @author 박갑수 at 2016. 3. 30
 */
var stdCgdPExhPgmId = function() {
	var moPage = new Page();
	
	/**
	 * @desc onLoad 실행
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 30
	 */
	moPage.onModelConstructDone_StdCgdPExhPgmId = function() {
		if(ExtPopUp.isPopUp()){
			// 리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//			ExtRepeat.init(["rptExhStud"]);
			
			var voExhPgmId =  ExtPopUp.getParentVal("moIdsForExhPgmId");
			
			util.DataMap.setValue(app, "dmReqKey", "strStudId", voExhPgmId.iStudId);

			//strCommand: exhStudList 
			util.Submit.send(app, "subList", function(pbSuccess){
				if(pbSuccess){
					util.Control.redraw(app, "grdExhStud");
				}
			});
		}
	};
	
	/**
	 * @desc [btnSearch]선택닫기 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 30
	 */
	moPage.onClick_BtnCloseOk = function() {
		// 선택닫기 함수
		doCloseOk();
	};
	
	/**
	 * @desc [btnCloseCancel]화면닫기 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 30
	 */
	moPage.onClick_BtnCloseCancel = function() {
		// 팝업 닫기
		app.close();
	};
	
	/**
	 * @desc [rptExhStud]교환학생목록 onDoubleClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 30
	 */
	moPage.onDoubleClick_RptExhStud = function() {
		// 선택닫기 함수
		doCloseOk();
	};
	
	/**
	 * @desc 부모페이지 리턴
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 30
	 */
	function doCloseOk(){
		if(ValueUtil.isNull(util.Grid.getCheckOrSelectedRowIndex(app, "grdExhStud"))){
			// 선택된 데이터가 없습니다.
			ComMsg.warn("M008");
			return false;
		}
		
		var vsExhPgmNm = util.Grid.getCellValue(app, "grdExhStud", "EXH_PGM_NM");
		var vsExhPgmId = util.Grid.getCellValue(app, "grdExhStud", "EXH_PGM_CD");
		
		var vaRtnValue = new Array();
		vaRtnValue[0] = vsExhPgmId;
		vaRtnValue[1] = vsExhPgmNm;
		
		ExtPopUp.closeLayeredPopup("callbackExhPgmIdPopup", vaRtnValue);
	};
	
	return moPage;
};
