//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCsrCAltEnrollPsn.xtm"/>


var extCsrCAltEnrollPsn = function() {
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
		var voAltObj = moPage.parent.moParentObj;
		
//		
	
		// 부모멤버변수에담긴학번받음
//		ExtInstance.setValue("/root/reqKey/strStudNo", voAltObj["studNo"]);
//		ExtInstance.setValue("/root/reqKey/strHeaderCourse", voAltObj["headerCourse"]);
//		ExtInstance.setValue("/root/reqKey/strStudInfo", voAltObj["headerStud"]);
		util.DataMap.setValue(app, "dmReqKey", "strSchYearRcd", voAltObj.strSchYearRcd);
		util.DataMap.setValue(app, "dmReqKey", "strSmtRcd", voAltObj.strSmtRcd);
		
		mbCheck ="true";
//		var vbCheck = voAltObj["altPsn"] ? "true" : "false";
//		ExtInstance.setValue("/root/reqKey/strNewFlag", vbCheck);
        util.DataMap.setValue(app, "dmReqKey", "strNewFlag", "true");

		
			util.Control.setEnable(app, false, ["frfCsrShregAlt","btnSave"]);
			
			//strCommand: onLoad 
			util.Submit.send(app, "subOnLoad", function(pbSuccess) {
				if (pbSuccess) {
					
					util.Control.redraw(app, ["frfCsrShregAlt"]);
					
					
					var vsValue =voAltObj.strAltRsnRcd;
					if (vsValue == "CT41301") {
						util.Control.setVisible(app, true,["lblFrfPerNm","ipbFrfPerNm"]);
						util.Control.setVisible(app, false,["lblSsn","ipbSsn"]);
						
					}else{
						util.Control.setVisible(app, false,["lblFrfPerNm","ipbFrfPerNm"]);
						util.Control.setVisible(app, true,["lblSsn","ipbSsn"]);
					}
					
				} 
			});
	
				
				
		
	}
	
	
	
	
	/**
	 * @desc 조회 내역이 없을시 신규
	 * @param
	 * @return void
	 * @author	 Choi In Seong 2016. 10. 11.
	 */
	function doNewAlt() {
		var voAltObj = moPage.parent.moParentObj;
		//학생id 셋팅
		util.DataMap.setValue(app, "dmReqKey", "strStudId", voAltObj.strStudId);
		
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess) {
				if (pbSuccess) {
//					debugger;
					util.Control.setEnable(app, true, ["frfCsrShregAlt","btnSave"]);
					
					util.Control.redraw(app, ["frfCsrShregAlt"]);
					
				
					var vsRowCnt = util.DataMap.getValue(app, "dmResList", "rptRowCnt");
					if (vsRowCnt == "0") {
						doSubInsertRow();
					}
					
					// 학생의 학번정보를 화면에 입력
					//ExtControl.setValue("optStudNo", voAltObj["studNo"]);
					//ExtControl.setValue("optStud", voAltObj["headerStud"]);
					//ExtControl.setValue("optCourse", voAltObj["headerCourse"]);
					
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
					util.Control.setValue(app, "cbbFrfAltRsnRcd",voAltObj.strAltRsnRcd);
					doAltRsnRcdChange();
					util.Control.setEnable(app, false, ["cbbFrfAltRsnRcd"]);
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
//		debugger;
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
	function doSave(poCallbackFunc) {
		
		
		
		
		//strCommand: save 
		util.Submit.send(app, "subSave", function(pbSuccess) {
			if (pbSuccess) {
				var voCallBackSaveAfter = function(pbSuccess) {
						if(pbSuccess) {
							//저장성공 메세지 출력
							// 조회 : "조회되었습니다." header 메세지 표시
							moPage.parentSendMsg(NLS.INF.M025);
							
							doDataClear();
							util.Control.setEnable(app, false, ["frfCsrShregAlt", "btnSave"]);
						}
						if(util.isFunc(poCallbackFunc))	poCallbackFunc(pbSuccessList);
					};
					ExtSubPage.getParent().callScript("doSaveAfter", voCallBackSaveAfter);
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
	 * @desc 학년도, 학기 변경 시 기준일자 셋팅
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 2. 2.
	 */
	moPage.onValueChanged_CbbFrfSchYearRcd = function() {		
		
		doAltRsnRcdChange();
	};
	
	
	function doAltRsnRcdChange(){
		var voAltObj = moPage.parent.moParentObj;
		
		var vsSchYearRcd = util.DataMap.getValue(app, "dmReqKey", "strSchYearRcd");
		var vsSmtRcd = util.DataMap.getValue(app, "dmReqKey", "strSmtRcd");
		
		util.FreeForm.setValue(app, "frfCsrShregAlt", "SCH_YEAR_RCD", vsSchYearRcd);
		util.FreeForm.setValue(app, "frfCsrShregAlt", "SMT_RCD", vsSmtRcd);
		util.FreeForm.setValue(app, "frfCsrShregAlt", "SCH_YEAR_NM", util.DataMap.getValue(app, "dmResOnLoad", "schYearNm"));
		util.FreeForm.setValue(app, "frfCsrShregAlt", "SMT_NM", util.DataMap.getValue(app, "dmResOnLoad", "smtNm"));
		util.FreeForm.setValue(app, "frfCsrShregAlt", "ALT_DT", voAltObj.strAltDt);

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
			
			util.Control.setVisible(app, true,["lblFrfPerNm","ipbFrfPerNm"]);
			util.Control.setVisible(app, false,["lblSsn","ipbSsn"]);
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
			
			util.Control.setVisible(app, false,["lblFrfPerNm","ipbFrfPerNm"]);
			util.Control.setVisible(app, true,["lblSsn","ipbSsn"]);
			
		}
		//보여주는 컬럼과 숨긴컬럼 둘다 초기화
		util.FreeForm.setValue(app, "frfCsrShregAlt", "CHG_DESC", "");
		util.FreeForm.setValue(app, "frfCsrShregAlt", "CHG_DESC_DISP", "");
		util.Control.redraw(app, ["ipbFrfChgDescDisp", "ipbFrfChgBefDescDisp"]);
		
		util.Control.setEnable(app, true, moPage.maAltPsnDetail);
		
		
	}
	
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
	
	
	
//	moPage.onValueChanged_CkbFrfRecRcogYn = function() {
//		
//		moPage.getRegTransRcd();
//		
//	}
	
	
	
//	moPage.onValueChanged_CbbFrfAbsSmtCntRcd = function() {
//		moPage.getRtnYearSmt();
//	}
	
	
	
//	moPage.onValueChanged_CbbFrfAltRsnRcd1 = function() {
//		
//		var vsAltRsnRcd = ExtFreeForm.getValue("frfCsrShregAlt", "ALT_RSN_RCD");
//		var vsSmtCnt = ExtInstance.getValue("/root/resOnLoad/reasonList/row", "CD_PRP5", "child::CD='"+vsAltRsnRcd+"'");
//		
//		if(ValueUtil.isNull(vsSmtCnt)) {
//			ExtControl.setValue("cbbFrfAbsSmtCntRcd", "");
//		} else {
//			ExtControl.setValue("cbbFrfAbsSmtCntRcd", vsSmtCnt);
//			moPage.getRtnYearSmt();
//		}
//		
//		moPage.getRegTransRcd();
//	}
	
	
	moPage.onLoadImportDone_ImpSbpHeader = function() {
		doSbpHeaderOnLoad();
	}
	
	
	/**
	 * @desc 부모 헤더에 메세지 뿌리기
	 * @param psCtrlId 리피트 라벨 id
	 * @param psMsgCode 메시지
	 * @return void
	 * @author Choi In Seong 2016. 1. 20
	 */
	moPage.parentSendMsg = function(psMsgCodeNm) {
		util.Msg.notify(app, psMsgCodeNm);	
	};
	
	/**
	 * @desc 휴학정보 체크
	 * @param
	 * @return void
	 * @author Choi In Seong 2016.02.12
	 */
	function doCheckDataChange() {
		
		if(util.Grid.isModified(app, ["frfCsrShregAlt"], "CRM") ){
			return false;
		}else{
			return true;
		}
	};
	
	/**
	 * @desc 프리폼 초기화
	 * @param
	 * @return void
	 * @author	 Choi In Seong 2016. 10. 11.
	 */
	function doDataClear() {
		util.Control.reset(app, ["frfCsrShregAlt"]);
	};
	
	return moPage;
};
