//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCsrCAltEnrollWith.xtm"/>

var extCsrCAltEnrollWith = function() {
	var moPage = new Page();
	//임포트용 데이터 통신 오브젝트
	var moPObject = new PObject();
	
	moPage.reqInputCbb = ["cbbFrfSchYearRcd", "cbbFrfSmtRcd", "cbbFrfAltRsnRcd","cbbFrfRefundBankRcd","dipFrfAltDt","cbbFrfRefundSchYearRcd","cbbFrfRefundSmtRcd"];
	
	/********************************
	 * 폼 신규 상태 체크 
	 *******************************/
	moPage.mbIsInsertRowFrf = false;
	
	/**
	 * @desc onLoadImportDone 이벤트
	 * @param 서브페이지 임포트
	 * @return void
	 * @author Aeyoung Lee 2016.11.03
	 */
	moPage.onLoadImportDone_ImpSbpHeader = function() {
		doSbpHeaderOnLoad();
	};
	
	/**
	 * @desc onModelConstructDone 이벤트
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016.11.03
	 */
	moPage.onModelConstructDone_ExtCsrCAltEnrollWith = function() {
		//리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["frfCsrShregAlt", "rptRefundItem"]);
		
		//계좌번호 암호화 지정
		ExtRepeat.addOriginCol("frfCsrShregAlt", ["REFUND_ACCT_NO"]);
		
		//화면 온로드 서브미션 호출
		doOnLoad();
	};
	
	/**
	 * @desc   부모창의 학생정보를 파라미터로 받아 화면 초기화 설정 
	 * @param
	 * @return void
	 * @author Aeyoung Lee 2016.11.03
	 */
	function doOnLoad() {
		
		util.Control.setEnable(app, false, ["grpData", "btnSaveWith"]);
		
		var voAltObj = moPage.parent.moParentObj;
		
		// 부모멤버변수에담긴학번받음
		util.DataMap.setValue(app, "dmReqKey", "strStudId", voAltObj.strStudId );
		util.DataMap.setValue(app, "dmReqKey", "strSchYearRcd", voAltObj.strSchYearRcd);
		util.DataMap.setValue(app, "dmReqKey", "strSmtRcd", voAltObj.strSmtRcd);
		util.DataMap.setValue(app, "dmReqKey", "strAltDt", voAltObj.strAltDt);
		util.DataMap.setValue(app, "dmReqKey", "strAltDivRcd", voAltObj.strAltDivRcd);
		util.DataMap.setValue(app, "dmReqKey", "strAltRsnRcd", voAltObj.strAltRsnRcd);
			
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess) {
			if (pbSuccess) {
				util.Control.redraw(app, ["frfCsrShregAlt"]);
				util.Control.redraw(app, moPage.reqInputCbb);
				
				//신규입력이 아님
				moPage.mbIsInsertRowFrf = false;
			} 
		});
	};
	
	/**
	 * @desc 조회 내역이 없을시 신규
	 * @param
	 * @return void
	 * @author Aeyoung Lee 2016.11.03
	 */
	function doNewAlt() {
		
		// 부모멤버변수에담긴학번받음
		var voAltObj = moPage.parent.moParentObj;
		util.DataMap.setValue(app, "dmReqKey", "strStudId", voAltObj.strStudId );
		util.DataMap.setValue(app, "dmReqKey", "strPopTarget", "extCsrPMstAltWith");
		
		// 신규 전 입력가능한 상태인지 체크 서브미션 
		//strCommand: popupMnu 
		util.Submit.send(app, "subMstAltPopupMnu", function(pbSuccess){
			if (pbSuccess) {
				//프리폼 신규
				util.FreeForm.insertRow(app, "frfCsrShregAlt");
						
				moPage.mbIsInsertRowFrf = true;
				
				//신규입력이 Ok
				util.Control.setEnable(app, true, ["grpData", "btnSaveWith"]);
				
				// 휴학신규
				//부모창의 변동정보 셋팅
				util.FreeForm.setValue(app, "frfCsrShregAlt", "STUD_ID", util.DataMap.getValue(app, "dmReqKey", "strStudId"));
				util.FreeForm.setValue(app, "frfCsrShregAlt", "SCH_YEAR_RCD", util.DataMap.getValue(app, "dmReqKey", "strSchYearRcd"));
				util.FreeForm.setValue(app, "frfCsrShregAlt", "SMT_RCD", util.DataMap.getValue(app, "dmReqKey", "strSmtRcd"));
				util.FreeForm.setValue(app, "frfCsrShregAlt", "ALT_DIV_RCD", util.DataMap.getValue(app, "dmReqKey", "strAltDivRcd"));
				util.FreeForm.setValue(app, "frfCsrShregAlt", "ALT_RSN_RCD", util.DataMap.getValue(app, "dmReqKey", "strAltRsnRcd"));
				util.FreeForm.setValue(app, "frfCsrShregAlt", "ALT_DT", util.DataMap.getValue(app, "dmReqKey", "strAltDt"));
			}else{
				doDataClear();
				util.Control.setEnable(app, false, ["grpData", "btnSaveWith"]);
			}	
		});
		
	};
	
	/**
	 * @desc 학적변동일 변경 이벤트
	 * @param
	 * @return void
	 * @author Aeyoung Lee 2016.11.03
	 */
	moPage.onValueChanged_DipFrfAltDt = function() {
		doChgYearSmtAltDt();
	};
	
	/**
	 * @desc 제적학년도 변경 이벤트
	 * @param
	 * @return void
	 * @author Aeyoung Lee 2016.11.03
	 */
	moPage.onValueChanged_CbbFrfSchYearRcd = function() {
		doChgYearSmtAltDt();
	};
	
	/**
	 * @desc 제적학기 변경 이벤트
	 * @param
	 * @return void
	 * @author Aeyoung Lee 2016.11.03
	 */
	moPage.onValueChanged_CbbFrfSmtRcd = function() {
		doChgYearSmtAltDt();
	};
	
	 /**
	 * @desc  학년도,학기,변동일자 변경 시
	 * @param
	 * @return void
	 * @author Aeyoung Lee 2016.11.03
	 */
	function doChgYearSmtAltDt() {
	
		var vsYear = util.FreeForm.getValue(app, "frfCsrShregAlt", "SCH_YEAR_RCD");
		util.DataMap.setValue(app, "dmDateMain", "YEAR", vsYear);
		
		var vsSmt = util.FreeForm.getValue(app, "frfCsrShregAlt", "SMT_RCD");
		util.DataMap.setValue(app, "dmDateMain", "SMT", vsSmt);
		
		var vsAltDt = util.FreeForm.getValue(app, "frfCsrShregAlt", "ALT_DT");
		util.DataMap.setValue(app, "dmDateMain", "ALT_DT", vsAltDt);
		
		if (!ValueUtil.isNull(vsYear) && !ValueUtil.isNull(vsSmt) && !ValueUtil.isNull(vsAltDt)) {
			// 환불정보
			doChangeDate();
		}
	};
	
	 /**
	 * @desc  환불정보 조회
	 * @param
	 * @return void
	 * @author Aeyoung Lee 2016.11.03
	 */
	function doChangeDate() {
		
		//strCommand: refList 
		util.Submit.send(app, "subRefList", function(pbSuccess) {
			if (pbSuccess) {
				var strRefSchYearRcd = util.DataMap.getValue(app, "dmDateMain", "strRefSchYearRcd");
				var strRefSmtRcd = util.DataMap.getValue(app, "dmDateMain", "strRefSmtRcd");
				var strRefCiiDt = util.DataMap.getValue(app, "dmDateMain", "strRefCiiDt");
				
				util.FreeForm.setValue(app, "frfCsrShregAlt", "REFUND_SCH_YEAR_RCD", strRefSchYearRcd);
				util.FreeForm.setValue(app, "frfCsrShregAlt", "REFUND_SMT_RCD", strRefSmtRcd);
				util.FreeForm.setValue(app, "frfCsrShregAlt", "REFUND_CII_DT", strRefCiiDt);
				util.Control.redraw(app, ["cbbFrfRefundSchYearRcd", "cbbFrfRefundSmtRcd", "dipFrfRefundCiiDt"]);
				util.Control.redraw(app, ["rptRefundItem"]);
			} else {
				util.FreeForm.setValue(app, "frfCsrShregAlt", "REFUND_SCH_YEAR_RCD", "");
				util.FreeForm.setValue(app, "frfCsrShregAlt", "REFUND_SMT_RCD", "");
				util.FreeForm.setValue(app, "frfCsrShregAlt", "REFUND_CII_DT", "");
				util.Control.redraw(app, ["cbbFrfRefundSchYearRcd", "cbbFrfRefundSmtRcd", "dipFrfRefundCiiDt"]);
				util.Control.redraw(app, ["rptRefundItem"]);
			}
		});
		
	};
	
	/**
	 * @desc 제적신규 저장 버튼 event
	 * @param
	 * @return void
	 * @author Aeyoung Lee 2016.11.03
	 */
	moPage.onClick_BtnSaveWith = function() {
		
		// 리피터 변경사항 체크
		if(!util.Grid.isModified(app, ["frfCsrShregAlt"], null)){
			moPage.parentSendMsg("lblTitleRptCsrShregAlt",NLS.WRN.M007);
			if(util.isFunc(poCallbackFunc)) poCallbackFunc(false);
			return false;
		}
		
		//리피트 validation check
		if(!util.validate(app, ["frfCsrShregAlt"])){
			if(util.isFunc(poCallbackFunc)) poCallbackFunc(false);
			return false;
		}

		util.DataMap.setValue(app, "dmReqKey", "strPopTarget", "extCsrPMstAltWith");
		//strCommand: popupMnu 
		util.Submit.send(app, "subMstAltPopupMnu", function(pbSuccess){
			if (pbSuccess) {
				doSave();
			}
		});
	};
	 
	 /**
	 * @desc 저장 SF에서 오류 메시지가 있으면 확인창 띄움.
	 * @param
	 * @return void
	 * @author Aeyoung Lee 2016.11.03
	 */
	function doSave(pnStep) {
		if (!pnStep) {
			pnStep = "0";
		}
		
		util.DataMap.setValue(app, "dmInteractiveMsg", "intStep", pnStep);
		
		//strCommand: saveGlobal 
		util.Submit.send(app, "subSave", function(pbSuccess) {
			if (pbSuccess) {
				var vsMsg = util.DataMap.getValue(app, "dmInteractiveMsg", "strMsg");
				if (vsMsg != "") {
					// @1\n  계속하시겠습니까?
					if (util.Msg.confirm("NLS-CRM-M034", [vsMsg]) ) {
						var vnStep = util.DataMap.getValue(app, "dmInteractiveMsg", "intStep");
						return doSave(vnStep);
					} else {
						return false;
					}
					
				} else {
					
					var voCallBackSaveAfter = function(pbSuccess) {
						if(pbSuccess) {
							//저장성공 메세지 출력
							// 조회 : "조회되었습니다." header 메세지 표시
							moPage.parentSendMsg(NLS.INF.M025);
							
							doDataClear();
							util.Control.setEnable(app, false, ["grpData", "btnSaveWith"]);
						}
						if(util.isFunc(poCallbackFunc)) poCallbackFunc(pbSuccessList);
					};
					
					ExtSubPage.getParent().callScript("doSaveAfter", voCallBackSaveAfter);
				}
			}else{
				return false;
			}
		});
	};	
	
	/**
	 * @desc 프리폼 초기화
	 * @param
	 * @return void
	 * @author Aeyoung Lee 2016.11.03
	 */
	function doDataClear() {
		util.Control.reset(app, ["frfCsrShregAlt","rptRefundItem"]);
	};
	
	/**
	 * @desc 제적정보 변경사항 체크
	 * @param
	 * @return void
	 * @author Aeyoung Lee 2016.11.03
	 */
	function doCheckDataChange() {
		
		if(util.Grid.isModified(app, ["frfCsrShregAlt"], "CRM") ){
			return false;
		}else{
			return true;
		}
	};
	
	/**
	 * @desc 부모 헤더에 메세지 뿌리기
	 * @param psCtrlId 리피트 라벨 id
	 * @param psMsgCode 메시지
	 * @return void
	 * @author Aeyoung Lee 2016.11.03
	 */
	moPage.parentSendMsg = function(psMsgCodeNm) {
		util.Msg.notify(app, psMsgCodeNm);	
	};
	
	return moPage;
};
