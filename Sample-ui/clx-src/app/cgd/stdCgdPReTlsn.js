//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./stdCgdPReTlsn.xtm"/>

/**
 * 재수강 대상
 * @class stdCgdPReTlsn
 * @author 박갑수 at 2016. 4. 4
 */
var stdCgdPReTlsn = function() {
	var moPage = new Page();
	
	/**
	 * @desc onLoad 실행
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 4
	 */
	moPage.onModelConstructDone_StdCgdPReTlsn = function() {
		if(ExtPopUp.isPopUp()){
			// 리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//			ExtRepeat.init(["rptCcrTlsnReq"]);
			
			var voReTlsn =  ExtPopUp.getParentVal("moIdsForReTlsn");
			
			util.DataMap.setValue(app, "dmReqKey", "strStudId", voReTlsn.iStudId);
			util.DataMap.setValue(app, "dmReqKey", "strRecCd", voReTlsn.iRecCd);
			util.DataMap.setValue(app, "dmReqKey", "strSchYearRcd", voReTlsn.iSchYearRcd);
			util.DataMap.setValue(app, "dmReqKey", "strSmtRcd", voReTlsn.iSmtRcd);
			util.DataMap.setValue(app, "dmReqKey", "strObjDivRcd", voReTlsn.iObjDivRcd);
			util.DataMap.setValue(app, "dmReqKey", "strKeyDate", voReTlsn.iKeyDate);

			//strCommand: doCheckRetake 
			util.Submit.send(app, "subList", function(pbSuccess){
				if(pbSuccess){
					util.Control.redraw(app, "grdCcrTlsnReq");
				}
			});
		}
	};
	
	/**
	 * @desc [btnCloseCancel]화면닫기 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 4
	 */
	moPage.onClick_BtnCloseCancel = function() {
		ExtPopUp.closeLayeredPopup("callbackReTlsnPopupCancel");
		// 팝업 닫기
		app.close();
	};
	
	/**
	 * @desc [btnSearch]선택닫기 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 4
	 */
	moPage.onClick_BtnCloseOk = function() {
		// 선택닫기 함수
		doCloseOk();
	};
	
	/**
	 * @desc [rptCcrTlsnReq]재수강대상 onDoubleClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 4
	 */
	moPage.onDoubleClick_RptCcrTlsnReq = function() {
		// 선택닫기 함수
		doCloseOk();
	};
	
	/**
	 * @desc 선택닫기 함수
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 4
	 */
	function doCloseOk() {
		if(ValueUtil.isNull(util.Grid.getCheckOrSelectedRowIndex(app, "grdCcrTlsnReq"))){
			// 선택된 데이터가 없습니다.
			ComMsg.warn("M008");
			return false;
		}
		
		var vsReTlsnSchYearRcd = util.Grid.getCellValue(app, "grdCcrTlsnReq", "RE_TLSN_SCH_YEAR_RCD");
		var vsReTlsnSmtRcd = util.Grid.getCellValue(app, "grdCcrTlsnReq", "RE_TLSN_SMT_RCD");
		var vsReTlsnSbCd = util.Grid.getCellValue(app, "grdCcrTlsnReq", "RE_TLSN_SB_CD");
		var vsReTlsnSbCdNm = util.Grid.getCellValue(app, "grdCcrTlsnReq", "RE_TLSN_SB_CD_NM");
		var vsReTlsnDivRcd = util.Grid.getCellValue(app, "grdCcrTlsnReq", "RE_TLSN_DIV_RCD");
		
		var vaRtnValue = new Array();
		vaRtnValue[0] = vsReTlsnSchYearRcd;
		vaRtnValue[1] = vsReTlsnSmtRcd;
		vaRtnValue[2] = vsReTlsnSbCd;
		vaRtnValue[3] = vsReTlsnSbCdNm;
		vaRtnValue[4] = vsReTlsnDivRcd;
		
		ExtPopUp.closeLayeredPopup("callbackReTlsnPopup", vaRtnValue);
	};
	
	return moPage;
};
