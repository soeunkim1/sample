//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./stdCgdPRcogRecUnitRcd.xtm"/>

/**
 * 인정성적단위검색
 * @class stdCgdPRcogRecUnitRcd
 * @author 박갑수 at 2016. 3. 29
 */
var stdCgdPRcogRecUnitRcd = function() {
	var moPage = new Page();
	
	/**
	 * @desc onLoad 실행
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 29
	 */
	moPage.onModelConstructDone_stdCgdPRcogRecUnitRcd = function() {
		if(ExtPopUp.isPopUp()){
			var voRcogRecUnitRcd =  ExtPopUp.getParentVal("moIdsForRcogRecUnitRcd");
			
			util.DataMap.setValue(app, "dmReqKey", "strCdCls", voRcogRecUnitRcd.iCd);

			//strCommand: listRecUnitRcd 
			util.Submit.send(app, "subList", function(pbSuccess){
				if(pbSuccess){
					util.Control.redraw(app, "grdCmnConfCode");
					ExtControl.setTextValue("rhBtnCdNm", voRcogRecUnitRcd.iCdNm);
				}
			});
		}
	};
	
	/**
	 * @desc [btnSearch]선택닫기 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 29
	 */
	moPage.onClick_BtnCloseOk = function() {
		// 선택닫기 함수
		doCloseOk();
	};
	
	/**
	 * @desc [btnCloseCancel]화면닫기 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 29
	 */
	moPage.onClick_BtnCloseCancel = function() {
		// 팝업 닫기
		app.close();
	};
	
	/**
	 * @desc [rptCmnConfCode]코드목록 onDoubleClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 29
	 */
	moPage.onDoubleClick_RptCmnConfCode = function() {
		// 선택닫기 함수
		doCloseOk();
	};
	
	/**
	 * @desc 부모페이지 리턴
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 29
	 */
	function doCloseOk(){
		if(ValueUtil.isNull(util.Grid.getCheckOrSelectedRowIndex(app, "grdCmnConfCode"))){
			// 선택된 데이터가 없습니다.
			ComMsg.warn("M008");
			return false;
		}
		
		var vsCd = util.Grid.getCellValue(app, "grdCmnConfCode", "CD");
		var vsCdNm = util.Grid.getCellValue(app, "grdCmnConfCode", "CD_NM");
		
		var vaRtnValue = new Array();
		vaRtnValue[0] = vsCd;
		vaRtnValue[1] = vsCdNm;
		
		ExtPopUp.closeLayeredPopup("callbackRcogRecUnitRcdPopup", vaRtnValue);
	};
	
	return moPage;
};
