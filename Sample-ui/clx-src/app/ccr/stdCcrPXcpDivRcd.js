//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./stdCcrPXcpDivRcd.xtm"/>

/**
 * 취소사유
 * @class stdCcrPXcpDivRcd
 * @author 박갑수 at 2016. 4. 21
 */
var stdCcrPXcpDivRcd = function() {
	var moPage = new Page();
	
	/**
	 * @desc onLoad 실행
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 21
	 */
	moPage.onModelConstructDone_StdCcrPXcpDivRcd = function() {
		if(ExtPopUp.isPopUp()){

			//strCommand: xcpDivRcdList 
			util.Submit.send(app, "subXcpDivRcdList", function(pbSuccess){
				if(pbSuccess){
					util.Control.redraw(app, "cbbXcpDivRcd");
				}
			});
		}
	};

	/**
	 * @desc [btnCloseCancel]화면닫기 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 21
	 */
	moPage.onClick_BtnCloseCancel = function() {
		ExtPopUp.closeLayeredPopup("callbackXcpDivRcdPopupCancel");
		// 팝업 닫기
		app.close();
	};

	/**
	 * @desc [btnSearch]선택닫기 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 21
	 */
	moPage.onClick_BtnCloseOk = function() {
		// 선택닫기 함수
		doCloseOk();
	};
	
	/**
	 * @desc 선택닫기 함수
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 21
	 */
	function doCloseOk() {
		var vsXcpDivRcd = util.Control.getValue(app, "cbbXcpDivRcd");
		if(ValueUtil.isNull(vsXcpDivRcd)){
			// 선택된 데이터가 없습니다.
			ComMsg.warn("M008");
			return false;
		}
		
		ExtPopUp.closeLayeredPopup("callbackXcpDivRcdPopup", vsXcpDivRcd);
	};
	
	return moPage;
};
