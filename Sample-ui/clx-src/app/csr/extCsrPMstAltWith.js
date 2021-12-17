//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCsrPMstAltWith.xtm"/>

var extCsrPMstAltWith = function() {
	var moPage = new Page();
	//임포트용 데이터 통신 오브젝트
	var moPObject = new PObject();

	/**
	 * @desc 헤더 온로드 실행
	 * @param 
	 * @return void
	 * @author Sunyoung , PARK 2016.02.24
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		doHeaderOnLoad();
	};
	
	/**
	 * @desc 팝업 닫기
	 * @param 
	 * @return void
	 * @author Sunyoung , PARK 2016.02.24
	 */
	moPage.onClick_BtnCloseCancel = function() {
		app.close();
	};
	
	/**
	 * @desc onModelConstructDone 이벤트
	 * @param 
	 * @return void
	 * @author	 Sunyoung , PARK 2016.02.24
	 */
	moPage.onModelConstructDone_StdCsrRStSearch = function() {
		//리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["frfCsrShregAlt"]);
		//화면 온로드 서브미션 호출
		doOnLoad();
	};
	
	/**
	 * @desc 프리폼 신규 생성
	 * @param
	 * @return void
	 * @author Sunyoung, PARK 2016.02.24
	 */
	function doSubInsertRow(vsFrfId) {
		util.FreeForm.setValue(app, vsFrfId, AppConstants.CUD_COL_REF, "I");
		//프리폼 신규
		util.FreeForm.insertRow(app, vsFrfId);
		var vsStudId = util.DataMap.getValue(app, "dmReqKey", "strStudId");
		//학생 ObjectId 셋팅
		util.FreeForm.setValue(app, vsFrfId, "STUD_ID", vsStudId);
		util.Grid.setRowState(app, vsFrfId, cpr.data.tabledata.RowState.INSERTED,1);
		//신규입력이 Ok
		util.Control.setEnable(app, true, [vsFrfId]);
	};
	
	


	/**
	 * @desc   부모창의 학생정보를 파라미터로 받아 화면 초기화 설정 
	 * @param
	 * @return void
	 * @author Sunyoung, PARK 2016.02.24
	 */
	function doOnLoad() {
		
		var voAltObj = ExtPopUp.getParentVal("moAltObj");
		
		// 부모멤버변수에담긴학번받음
		util.DataMap.setValue(app, "dmReqKey", "strStudNo", voAltObj["studNo"]);
		util.DataMap.setValue(app, "dmReqKey", "strHeaderCourse", voAltObj["headerCourse"]);
		util.DataMap.setValue(app, "dmReqKey", "strStudInfo", voAltObj["headerStud"]);
		util.DataMap.setValue(app, "dmReqKey", "strSchYearRcd", voAltObj["year"]);
		util.DataMap.setValue(app, "dmReqKey", "strSmtRcd", voAltObj["smt"]);
		util.DataMap.setValue(app, "dmReqKey", "strStudId", voAltObj["studId"]);
		
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function (pbSuccess) {
			if (pbSuccess){
				util.Control.redraw(app, ["frfCsrShregAlt"]);
				
				// 학생의 학번정보를 화면에 입력
				util.Control.setValue(app, "optStudNo", voAltObj["studNo"]);
				util.Control.setValue(app, "optStud", voAltObj["headerStud"]);
				util.Control.setValue(app, "optCourse", voAltObj["headerCourse"]);
				
				// 제적 신규 
				doSubInsertRow("frfCsrShregAlt");
				
				util.FreeForm.setValue(app, "frfCsrShregAlt", "SCH_YEAR_RCD", voAltObj["year"]);
				util.FreeForm.setValue(app, "frfCsrShregAlt", "SMT_RCD", voAltObj["smt"]);
				
				// 학적변동일 Set
				var vsChgDt = util.DataMap.getValue(app, "dmResOnLoad", "CurrentDate");
				util.FreeForm.setValue(app, "frfCsrShregAlt", "ALT_DT", vsChgDt);
				
				util.Control.redraw(app, ["cbbFrfSchYearRcd", "cbbFrfSmtRcd", "cbbFrfAltRsnRcd","cbbFrfRefundBankRcd","dipFrfAltDt","cbbFrfRefundSchYearRcd","cbbFrfRefundSmtRcd"]);
				
			}else{
				ExtModel.dispatch("btnCloseCancel", "DOMActivate");
			}			
		});
	};
	 
	 /**
	 * @desc 저장 SF에서 오류 메시지가 있으면 확인창 띄움.
	 * @param
	 * @return void
	 * @author Sunyoung , PARK 2016.02.24
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
					//부모창 목록 재조회
					//팝업창 닫기
					ExtPopUp.closeLayeredPopup("doPopCallList");
					return true;
				}
			}else{
				return false;
			}
		});
	};	
	
	
	/**
	 * @desc 제적신규 저장 버튼 event
	 * @param
	 * @return void
	 * @author Sunyoung , PARK 2016.02.24
	 */
	moPage.onClick_BtnSave = function() {
	
		//리피트 validation check
		if(!util.validate(app, ["frfCsrShregAlt"])){
			return false;
		}

		util.DataMap.setValue(app, "dmReqKey", "strPopTarget", "stdCsrPMstAltWith");
		//strCommand: popupMnu 
		util.Submit.send(app, "subMstAltPopupMnu", function(pbSuccess){
			if (pbSuccess) {
				doSave();
			}
		});
	};
		
	moPage.onModelConstructDone_StdCsrPMstAltWith = function() {
		//리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["frfCsrShregAlt"]);
		ExtRepeat.addOriginCol("frfCsrShregAlt", ["REFUND_ACCT_NO"]);
		//화면 온로드 서브미션 호출
		doOnLoad();
	};
	

	moPage.onValueChanged_DipFrfAltDt = function() {
		doChgYearSmtAltDt();
	};
	
	
	moPage.onValueChanged_CbbFrfSchYearRcd = function() {
		doChgYearSmtAltDt();
	};
	
	
	moPage.onValueChanged_CbbFrfSmtRcd = function() {
		doChgYearSmtAltDt();
	};
	
	 /**
	 * @desc  학년도,학기,변동일자 Click시
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 02. 19.
	 */
	function doChgYearSmtAltDt() {
		
		var vsYear = util.FreeForm.getValue(app, "frfCsrShregAlt", "SCH_YEAR_RCD");
		util.DataMap.setValue(app, "dmDateMain", "YEAR", vsYear);
		
		var vsSmt = util.FreeForm.getValue(app, "frfCsrShregAlt", "SMT_RCD");
		util.DataMap.setValue(app, "dmDateMain", "SMT", vsSmt);
		
		var vsAltDt = util.FreeForm.getValue(app, "frfCsrShregAlt", "ALT_DT");
		util.DataMap.setValue(app, "dmDateMain", "ALT_DT", vsAltDt);
		
		if (!ValueUtil.isNull(vsYear) && !ValueUtil.isNull(vsSmt) && !ValueUtil.isNull(vsAltDt)) {
			// 학사력 추출.
			doChangeDate();
		}
	};
	
	 /**
	 * @desc  환불정보 조회
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 02. 19.
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
				ExtModel.dispatch("btnCloseCancel", "DOMActivate");
			}
		});
		
	};
	
	return moPage;
};
