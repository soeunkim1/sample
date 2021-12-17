//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./stdCgdPDivcls.xtm"/>

/**
 * 분반검색
 * @class stdCgdPReTlsn
 * @author 박갑수 at 2016. 4. 5
 */
var stdCgdPDivcls = function() {
	var moPage = new Page();
	
	/**
	 * @desc onLoad 실행
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 5
	 */
	moPage.onModelConstructDone_StdCgdPDivcls = function() {
		if(ExtPopUp.isPopUp()){
			var voDivCls =  ExtPopUp.getParentVal("moIdsForDivcls");
			
			util.DataMap.setValue(app, "dmReqKey", "strSchYearRcd", voDivCls.iSchYearRcd);
			util.DataMap.setValue(app, "dmReqKey", "strSmtRcd", voDivCls.iSmtRcd);
			util.DataMap.setValue(app, "dmReqKey", "strRecCd", voDivCls.iRecCd);

			//strCommand: listDivcls 
			util.Submit.send(app, "subList", function(pbSuccess){
				if(pbSuccess){
					util.Control.redraw(app, "grdDivcls");
					
					var vnLength = util.DataSet.getRowCount(app, "dsDivclsList");
					if(vnLength > 0){
						util.Control.setVisible(app, true, ["rptDivcls"]);
						util.Control.setVisible(app, false, ["lblDivclsCd", "ipbDivclsCd"]);
						util.Control.setValue(app, "ipbDivclsCd", "");
					}else {
						util.Control.setVisible(app, false, ["rptDivcls"]);
						util.Control.setVisible(app, true, ["lblDivclsCd", "ipbDivclsCd"]);
						util.Control.setValue(app, "ipbDivclsCd", "00");
					}
				}
			});
		}
	};
	
	/**
	 * @desc [rptCcrTlsnReq]재수강대상 onDoubleClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 5
	 */
	moPage.onDoubleClick_RptDivcls = function() {
		// 선택닫기 함수
		doCloseOk();
	};
	
	/**
	 * @desc [btnCloseCancel]화면닫기 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 5
	 */
	moPage.onClick_BtnCloseCancel = function() {
		// 팝업 닫기
		app.close();
	};
	
	/**
	 * @desc [btnSearch]선택닫기 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 5
	 */
	moPage.onClick_BtnCloseOk = function() {
		// 선택닫기 함수
		doCloseOk();
	};
	
	/**
	 * @desc 선택닫기 함수
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 5
	 */
	function doCloseOk() {
		var vsIpbDivclsCd = util.Control.getValue(app, "ipbDivclsCd");
		if(ValueUtil.isNull(util.Grid.getCheckOrSelectedRowIndex(app, "grdDivcls")) && ValueUtil.isNull(vsIpbDivclsCd)){
			// 선택된 데이터가 없습니다.
			ComMsg.warn("M008");
			return false;
		}
		
		var vsDivclsCd = "";
		var vnLength = util.DataSet.getRowCount(app, "dsDivclsList");
		
		if(vnLength > 0){
			vsDivclsCd = util.Grid.getCellValue(app, "grdDivcls", "DIVCLS_CD");
		}else {
			vsDivclsCd = vsIpbDivclsCd;
		}
		
		ExtPopUp.closeLayeredPopup("callbackDivclsPopup", vsDivclsCd);
	};
	
	/**
	 * @desc [ipbDivclsCd]분반코드 onKeyDown 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 5
	 */
	moPage.onKeyDown_IpbDivclsCd = function(strKeyType, strKeyStatus) {
		// 엔터키 입력시 
		if(e.keyCode == cpr.events.KeyCode.ENTER){
			// 선택닫기 함수
			doCloseOk();
		}
	};
	
	return moPage;
};
