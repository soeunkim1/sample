//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./stdCgdPReTlsn.xtm"/>

/**
 * 재수강 대상
 * @class extCgdPReTlsn
 * @author 박갑수 at 2016. 4. 4
 */
var extCgdPReTlsn = function() {
	var moPage = new Page();
	
	/**
	 * @desc onLoad 실행
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 4
	 */
	moPage.onModelConstructDone_ExtCgdPReTlsn = function() {
		if(ExtPopUp.isPopUp()){
			// 리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//			ExtRepeat.init(["rptCcrTlsnReq"]);
			
			var voReTlsn =  ExtPopUp.getParentVal("moIdsForReTlsn");
			
			util.DataMap.setValue(app, "dmReqKey", "strStudId", voReTlsn.iStudId);
			util.DataMap.setValue(app, "dmReqKey", "strRecCd", voReTlsn.iRecCd);
			util.DataMap.setValue(app, "dmReqKey", "strRecNm", voReTlsn.iRecNm);
			util.DataMap.setValue(app, "dmReqKey", "strSchYearRcd", voReTlsn.iSchYearRcd);
			util.DataMap.setValue(app, "dmReqKey", "strSmtRcd", voReTlsn.iSmtRcd);
			util.DataMap.setValue(app, "dmReqKey", "strKeyDate", voReTlsn.iKeyDate);
			util.DataMap.setValue(app, "dmReqKey", "strCmpDivRcd", voReTlsn.iCmpDivRcd);
			util.DataMap.setValue(app, "dmReqKey", "strRefKey", voReTlsn.iRefKey);
			
			
			
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
	
	
	
	/*
		[일반수강신청]
		대체과목일 경우 일반수강신청이 가능하나,
		동일과목의 경우 일반수강신청이 불가능하다.
		즉, 동일과목이 존재할 경우 "일반수강"신청을 할 수 없다.
	*/
	moPage.onClick_BtnCloseOk1 = function() {
		
		
		var vnCnt = ExtInstance.getNodeListLength("/root/resList/candidateList/row[child::RE_TLSN_DIV_RCD = 'CL1010002']");
		if(vnCnt > 0 ){
			//--동일과목 존재합니다. [재수강]하시기 바랍니다.
			util.Msg.alert("NLS-CCR-M010");
			return false;
		}
		
		// 선택닫기 함수
		doCloseOk("TLSN");
	}
	
	
	
	/**
	 * @desc 선택닫기 함수
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 4
	 */
	function doCloseOk(vpParam) {
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
		var vsCmpDivRcd = util.Grid.getCellValue(app, "grdCcrTlsnReq", "CMP_DIV_RCD");
		
		var vaRtnValue = new Array();
		//--일반수강일 경우 재수강 파라미터를 전달 하지 않는다.
		if(vpParam == 'TLSN'){
			vaRtnValue[0] = "";
			vaRtnValue[1] = "";
			vaRtnValue[2] = "";
			vaRtnValue[3] = "";
			vaRtnValue[4] = "";
			vaRtnValue[5] = "";
		}else{
			vaRtnValue[0] = vsReTlsnSchYearRcd;
			vaRtnValue[1] = vsReTlsnSmtRcd;
			vaRtnValue[2] = vsReTlsnSbCd;
			vaRtnValue[3] = vsReTlsnSbCdNm;
			vaRtnValue[4] = vsReTlsnDivRcd;
			vaRtnValue[5] = vsCmpDivRcd;
		}
		
		
		ExtPopUp.closeLayeredPopup("callbackReTlsnPopup", vaRtnValue);
	};
	
	
	return moPage;
};
