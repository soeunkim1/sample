//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./stdCsrPMstAltPsn.xtm"/>


var stdCsrPMstAltPsn = function() {
	var moPage = new Page();
	//임포트용 데이터 통신 오브젝트
	var moPObject = new PObject();
	
	moPage.maAltPsn = ["cbbFrfAltRsnRcd", "ipbFrfPerNm", "ipbSsn"];
	moPage.maCancelCtl = ["cbbFrfCancelRsnRcd", "ipbFrfCancelDt"];
	
	//사용자 정의 변수
	// 신규. 취소 구분
	var mbCheck;
	
	/**
	 * @desc onModelConstructDone 이벤트
	 * @param 
	 * @return void
	 * @author	 Choi In Seong 2016. 2. 2.
	 */
	moPage.onModelConstructDone_StdCsrPMstAltPsn = function() {
		//리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init("frfCsrShregAlt");
		ExtRepeat.addOriginCol("frfCsrShregAlt", ["SSN"]);
		//화면 온로드 서브미션 호출
		doOnLoad();
	};
	
	/**
	 * @desc 받아온 변수 조회조건에 셋팅
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 01. 12.
	 */
	function doOnLoad() {
		var voAltObj = ExtPopUp.getParentVal("moAltObj");
		
		// 부모멤버변수에담긴학번받음
		util.DataMap.setValue(app, "dmReqKey", "strStudNo", voAltObj["studNo"]);
		util.DataMap.setValue(app, "dmReqKey", "strHeaderCourse", voAltObj["headerCourse"]);
		util.DataMap.setValue(app, "dmReqKey", "strStudInfo", voAltObj["headerStud"]);
		util.DataMap.setValue(app, "dmReqKey", "strSchYearRcd", voAltObj["year"]);
		util.DataMap.setValue(app, "dmReqKey", "strSmtRcd", voAltObj["smt"]);
		
		mbCheck = voAltObj["altPsn"];
		var vbCheck = voAltObj["altPsn"] ? "true" : "false";
		util.DataMap.setValue(app, "dmReqKey", "strNewFlag", vbCheck);

		//학생id 셋팅
		util.DataMap.setValue(app, "dmReqKey", "strStudId", voAltObj["studId"]);
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess) {
			if (pbSuccess) {
				
				util.Control.redraw(app, ["frfCsrShregAlt"]);
				
				var vsRowCnt = util.DataMap.getValue(app, "dmResList", "rptRowCnt");
				if (vsRowCnt == "0") {
					doSubInsertRow();
				}
				
				// 학생의 학번정보를 화면에 입력
				util.Control.setValue(app, "optStudNo", voAltObj["studNo"]);
				util.Control.setValue(app, "optStud", voAltObj["headerStud"]);
				util.Control.setValue(app, "optCourse", voAltObj["headerCourse"]);
				
				if(mbCheck) {
					// 신규 인적사항 변경
					util.Control.setEnable(app, false, moPage.maCancelCtl);
					util.Control.setEnable(app, false, ["ipbName", "ipbSsn"]);
					
					ExtControl.setAttr("lblFrfAltDt", "class", "lblFrfReq");
					ExtControl.setAttr("iptFrfAltDt", "class", "ipbFrfReq");
					
					util.Control.setEnable(app, true, ["iptFrfAltDt"]);
				} else {
					// 취소 인적사항 변경
					util.Control.setEnable(app, false, moPage.maAltPsn);
					util.Control.setEnable(app, true, moPage.maCancelCtl);
					
					//변경 취소 css 제어
					ExtControl.setAttr("cbbFrfAltRsnRcd", "class", "cbbFrf");
					ExtControl.setAttr("lblFrfAltRsnRcd", "class", "lblFrf");
					
					ExtControl.setAttr("lblFrfCancelRsnRcd", "class", "lblFrfReq");
					ExtControl.setAttr("cbbFrfCancelRsnRcd", "class", "cbbFrfReq");
					ExtControl.setAttr("lblFrfCancelDt", "class", "lblFrfReq");
					ExtControl.setAttr("ipbFrfCancelDt", "class", "ipbFrfReq");
					
					util.Control.setEnable(app, false, ["iptFrfAltDt"]);
					
					//취소일자 셋팅
					util.FreeForm.setValue(app, "frfCsrShregAlt", "CANCEL_DT", util.DataMap.getValue(app, "dmResOnLoad", "currentDate"));
					util.Control.redraw(app, "ipbFrfCancelDt");
				}
			} else {
				ExtModel.dispatch("btnCloseCancel", "DOMActivate");
			}
		});
	}

	/**
	 * @desc //입력받은 날짜에 초를 000000으로 세팅
	 * @param psDate 시분초를 추가할 날짜
	 * @return vsDate 시분초가 추가된 날짜
	 * @author Choi In Seong 2016. 2. 2
	 */
	moPage.addZoreDate = function(psDate) {
		var vsDate = psDate.substring(0, 8);
		vsDate += "000000";
		return vsDate;
	};
	
	/**
	 * @desc 조회 내역이 없을시 신규
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 2. 2
	 */
	function doSubInsertRow() {
		util.FreeForm.setValue(app, "frfCsrShregAlt",AppConstants.CUD_COL_REF, "U");
		//프리폼 신규
		util.FreeForm.insertRow(app, "frfCsrShregAlt");
		var vsStudId = util.DataMap.getValue(app, "dmReqKey", "strStudId");
		//학생 ObjectId 셋팅
		util.FreeForm.setValue(app, "frfCsrShregAlt", "STUD_ID", vsStudId);
		util.Grid.setRowState(app, "frfCsrShregAlt",cpr.data.tabledata.RowState.UPDATED,1);
		//신규입력이 Ok
		util.Control.setEnable(app, true, ["frfCsrShregAlt"]);
	};
	
	/**
	 * @desc 학적등록 저장 버튼 event
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 2. 2.
	 */
	moPage.onClick_BtnSave = function() {
		// 신규
		if (mbCheck) {
			var vsValue = util.FreeForm.getValue(app, "frfCsrShregAlt", "ALT_RSN_RCD");
			if (vsValue == "CT41301") {
				if(!util.validate(app, ["ipbFrfPerNm","cbbFrfAltRsnRcd", "iptFrfAltDt"])){
					return;
				}
			} else if(vsValue == "CT41302"){
				if(!util.validate(app, ["ipbSsn","cbbFrfAltRsnRcd", "iptFrfAltDt"])){
					return;
				}
			}
			doSave();
		//취소
		} else {
			// 취소 인적사항변경 저장 - 취소사유, 취소일자를 입력했는지 체크
			if(!util.validate(app, ["cbbFrfCancelRsnRcd","ipbFrfCancelDt"])){
				return;
			}
			doSave();
		}
	};
	
	/**
	 * @desc 학적등록 저장
	 * @param pnStep 저장 차수
	 * @return boolean
	 * @author Choi In Seong 2016. 2. 2.
	 */
	function doSave() {
		
		//strCommand: save 
		util.Submit.send(app, "subSave", function(pbSuccess) {
			if (pbSuccess) {
					//부모창 목록 재조회
					//팝업창 닫기
					ExtPopUp.closeLayeredPopup("doPopCallList");
					return true;
			}
		});
	};
	
	
	/**
	 * @desc 선택닫기 버튼 클릭
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 2. 2.
	 */
	moPage.onClick_BtnCloseOk = function() {
		doCloseOk();
	};
	
	/**
	 * @desc 헤더 온로드 실행
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 2. 2.
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		doHeaderOnLoad();
	};
	
	/**
	 * @desc 학년도, 학기 변경 시 기준일자 셋팅
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 2. 2.
	 */
	moPage.onValueChanged_CbbFrfSchYearRcd = function() {		
		
		var vsSchYearRcd = util.DataMap.getValue(app, "dmReqKey", "strSchYearRcd");
		var vsSmtRcd = util.DataMap.getValue(app, "dmReqKey", "strSmtRcd");
		
		util.FreeForm.setValue(app, "frfCsrShregAlt", "SCH_YEAR_RCD", vsSchYearRcd);
		util.FreeForm.setValue(app, "frfCsrShregAlt", "SMT_RCD", vsSmtRcd);
		util.FreeForm.setValue(app, "frfCsrShregAlt", "SCH_YEAR_NM", util.DataMap.getValue(app, "dmResOnLoad", "schYearNm"));
		util.FreeForm.setValue(app, "frfCsrShregAlt", "SMT_NM", util.DataMap.getValue(app, "dmResOnLoad", "smtNm"));
		util.FreeForm.setValue(app, "frfCsrShregAlt", "ALT_DT", util.DataMap.getValue(app, "dmResOnLoad", "currentDate"));

		var vsValue = util.FreeForm.getValue(app, "frfCsrShregAlt", "ALT_RSN_RCD");
		if (vsValue == "CT41301") {
			// 이름변경
			util.FreeForm.setValue(app, "frfCsrShregAlt", "SSN", "");
			util.Control.setFocus(app, "ipbFrfPerNm");
			util.Control.setEnable(app, true, ["ipbFrfPerNm"]);
			util.Control.setEnable(app, false, ["ipbSsn"]);
			
			var vsStudNm = util.DataMap.getValue(app, "dmResOnLoad", "studNm");
			//보여주는 컬럼과 숨긴컬럼 둘다 초기화
			util.FreeForm.setValue(app, "frfCsrShregAlt", "CHG_BEF_DESC", vsStudNm);
			util.FreeForm.setValue(app, "frfCsrShregAlt", "CHG_BEF_DESC_DISP", vsStudNm);
			
			ExtControl.setAttr("lblFrfPerNm", "class", "lblFrfReq");
			ExtControl.setAttr("ipbFrfPerNm", "class", "ipbFrfReq");
			ExtControl.setAttr("lblSsn", "class", "lblFrf");
			ExtControl.setAttr("ipbSsn", "class", "ipbFrf");
			
		} else if (vsValue == "CT41302") {
			// 주민번호 변경
			util.FreeForm.setValue(app, "frfCsrShregAlt", "PER_NM", "");
			util.Control.setFocus(app, "ipbSsn");
			util.Control.setEnable(app, false, ["ipbFrfPerNm"]);
			util.Control.setEnable(app, true, ["ipbSsn"]);
			
			var vsSsn    = util.DataMap.getValue(app, "dmResOnLoad", "ssn");
			//보여주는 컬럼과 숨긴컬럼 둘다 초기화
			util.FreeForm.setValue(app, "frfCsrShregAlt", "CHG_BEF_DESC", vsSsn);
			util.FreeForm.setValue(app, "frfCsrShregAlt", "CHG_BEF_DESC_DISP", vsSsn);
			
			ExtControl.setAttr("lblFrfPerNm", "class", "lblFrf");
			ExtControl.setAttr("ipbFrfPerNm", "class", "ipbFrf");
			ExtControl.setAttr("lblSsn", "class", "lblFrfReq");
			ExtControl.setAttr("ipbSsn", "class", "ipbFrfReq");
			
		}
		//보여주는 컬럼과 숨긴컬럼 둘다 초기화
		util.FreeForm.setValue(app, "frfCsrShregAlt", "CHG_DESC", "");
		util.FreeForm.setValue(app, "frfCsrShregAlt", "CHG_DESC_DISP", "");
		util.Control.redraw(app, ["ipbFrfChgDescDisp", "ipbFrfChgBefDescDisp"]);
		
		util.Control.setEnable(app, true, moPage.maAltPsnDetail);
	};

	/**
	 * @desc 화면닫기 버튼 클릭
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 2. 2.
	 */
	moPage.onClick_BtnCloseCancel = function() {
		app.close();
	};
	
	/**
	 * @desc 취소 사유 입력시 취소일자 셋팅
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 2. 2.
	 */
	moPage.onValueChanged_CbbFrfCancelRsnRcd = function() {
		
	};
	
	/**
	 * @desc 이름 변경내역을 변경후 내용에 셋팅
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 2. 2.
	 */
	moPage.onValueChanged_IpbFrfPerNm = function() {
		var vsName = util.FreeForm.getValue(app, "frfCsrShregAlt", "PER_NM");
		util.FreeForm.setValue(app, "frfCsrShregAlt", "CHG_DESC", vsName);
		util.FreeForm.setValue(app, "frfCsrShregAlt", "CHG_DESC_DISP", vsName);
		util.Control.redraw(app, "ipbFrfChgDescDisp");
	};
	
	/**
	 * @desc 주민등록번호 변경내역을 변경후 내용에 셋팅
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 2. 2.
	 */
	moPage.onValueChanged_IpbSsn = function() {
		var vsSsn = util.FreeForm.getValue(app, "frfCsrShregAlt", "SSN");
		util.FreeForm.setValue(app, "frfCsrShregAlt", "CHG_DESC", vsSsn);
		util.FreeForm.setValue(app, "frfCsrShregAlt", "CHG_DESC_DISP", vsSsn);
		util.Control.redraw(app, "ipbFrfChgDescDisp");
	};
	
	return moPage;
};
