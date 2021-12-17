//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCsrPMstAltAbs.xtm"/>


var extCsrPMstAltAbs = function() {
	var moPage = new Page();
	//임포트용 데이터 통신 오브젝트
	var moPObject = new PObject();
	var bErrChk = true;
	
	/**
	 * @desc 헤더 온로드 실행
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 2. 17.
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		doHeaderOnLoad();
	};
	
	/**
	 * @desc 팝업 닫기
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 2. 17.
	 */
	moPage.onClick_BtnCloseCancel = function() {
		app.close();
	};
	
	/**
	 * 필수 입력 콤보 컨트롤(학년도, 학기, 휴학학기수, 휴학사유)
	 */	
	moPage.reqInputCbb = ["cbbFrfSchYearRcd", "cbbFrfSmtRcd", "cbbFrfAbsSmtCntRcd", "cbbFrfAltRsnRcd"];
	
	/**
	 * @desc onModelConstructDone 이벤트
	 * @param 
	 * @return void
	 * @author	 Choi In Seong 2016. 2. 17.
	 */
	moPage.onModelConstructDone_StdCsrPMstAltAbs = function() {
		//리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init("frfCsrShregAlt");
		//화면 온로드 서브미션 호출
		doOnLoad();
	};
	
	
	/**
	 * @desc 부모창에서 받아온 변수 조회조건에 셋팅
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 01. 17.
	 */
	function doOnLoad() {
		var voAltObj = ExtPopUp.getParentVal("moAltObj");
		
		// 부모멤버변수에담긴학번받음
		util.DataMap.setValue(app, "dmReqKey", "strStudNo", voAltObj["studNo"]);
		util.DataMap.setValue(app, "dmReqKey", "strHeaderCourse", voAltObj["headerCourse"]);
		util.DataMap.setValue(app, "dmReqKey", "strStudInfo", voAltObj["headerStud"]);
		util.DataMap.setValue(app, "dmReqKey", "strSchYearRcd", voAltObj["year"]);
		util.DataMap.setValue(app, "dmReqKey", "strSmtRcd", voAltObj["smt"]);
		util.DataMap.setValue(app, "dmReqKey", "strStDt", voAltObj["stDt"]);
		util.DataMap.setValue(app, "dmReqKey", "strEndDt", voAltObj["endDt"]);
		
		//학생id 셋팅
		util.DataMap.setValue(app, "dmReqKey", "strStudId", voAltObj["studId"]);
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess) {
			if (pbSuccess) {
				
				util.Control.redraw(app, ["frfCsrShregAlt"]);
				util.Control.redraw(app, moPage.reqInputCbb);
				util.Control.redraw(app, ["cbbFrfRegTransRcd"]);
				// 휴학사유 기본 설정 데이터 셋팅
				var vsDefAltRsnRcd = ExtInstance.getValue("/root/resOnLoad/reasonList/row", "CD", "child::CD_PRP4='Y'");

				doSubInsertRow();
				
				// 학생의 학번정보를 화면에 입력
				util.Control.setValue(app, "optStudNo", voAltObj["studNo"]);
				util.Control.setValue(app, "optStud", voAltObj["headerStud"]);
				util.Control.setValue(app, "optCourse", voAltObj["headerCourse"]);
				
				var vsStatRcd = util.DataMap.getValue(app, "dmResOnLoad", "STAT_RCD");
				// 휴학신규
				util.FreeForm.setValue(app, "frfCsrShregAlt", "ALT_DIV_RCD", "CT401ABSE");
				//부모창의 학년도 학기 설정
				util.FreeForm.setValue(app, "frfCsrShregAlt", "SCH_YEAR_RCD", voAltObj["year"], false);
				util.FreeForm.setValue(app, "frfCsrShregAlt", "SMT_RCD", voAltObj["smt"], false);
				util.FreeForm.setValue(app, "frfCsrShregAlt", "ALT_RSN_RCD", vsDefAltRsnRcd);
				
				// 학적 변동일 설정
				var vsAltDt = util.DataMap.getValue(app, "dmResOnLoad", "chgDt");
				util.FreeForm.setValue(app, "frfCsrShregAlt", "ALT_DT", vsAltDt);
				util.Control.redraw(app, ["iptFrfAltDt","cbbFrfAltRsnRcd"]);
				
			} else {
				// 실패시 팝업 닫기
				ExtModel.dispatch("btnCloseCancel", "DOMActivate");
			}
		});
	}

	/**
	 * @desc 조회 내역이 없을시 신규
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 2. 17
	 */
	function doSubInsertRow() {
		util.FreeForm.setValue(app, "frfCsrShregAlt",AppConstants.CUD_COL_REF, "I");
		//프리폼 신규
		util.FreeForm.insertRow(app, "frfCsrShregAlt");
		var vsStudId = util.DataMap.getValue(app, "dmReqKey", "strStudId");
		var vsRegTransRcd = util.DataMap.getValue(app, "dmResOnLoad", "strRegTransRcd");
		//학생 ObjectId 셋팅
		util.FreeForm.setValue(app, "frfCsrShregAlt", "STUD_ID", vsStudId);
		util.FreeForm.setValue(app, "frfCsrShregAlt", "REG_TRANS_RCD", vsRegTransRcd);
		
		util.Control.setEnable(app, false, ["cbbFrfRegTransRcd"]);
		util.Grid.setRowState(app, "frfCsrShregAlt",cpr.data.tabledata.RowState.INSERTED,1);
		//신규입력이 Ok
		util.Control.setEnable(app, true, ["frfCsrShregAlt"]);
	};
	
	/**
	 * @desc 저장 SF에서 오류 메시지가 있으면 확인창 띄움.
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 2. 17
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
	 * @desc 휴학신규 저장 버튼 event
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 2. 17.
	 */
	moPage.onClick_BtnSave = function() {
		// 리피터 변경사항 체크
		if(!util.Grid.isModified(app, ["frfCsrShregAlt"], "MSG")){
			return false;
		}
		//리피트 validation check
		if(!util.validate(app, ["frfCsrShregAlt"])){
			return false;
		}
		
		util.DataMap.setValue(app, "dmReqKey", "strPopTarget", "stdCsrPMstAltAbs");
		//strCommand: popupMnu 
		util.Submit.send(app, "subMstAltPopupMnu", function(pbSuccess){
			if (pbSuccess) {
				doSave();
			}
		});
	};
	
	/**
	 * @desc 휴학사유 changeEvent 휴학사유에 설정된 휴학학기수 셋팅
	               20160513 학년도, 학기, 휴학사유, 성적인정여부로 등록이월코드 셋팅
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 2. 17.
	 */
	moPage.onValueChanged_CbbFrfAltRsnRcd = function() {
		
		var vsAltRsnRcd = util.FreeForm.getValue(app, "frfCsrShregAlt", "ALT_RSN_RCD");
		var vsSmtCnt = ExtInstance.getValue("/root/resOnLoad/reasonList/row", "CD_PRP5", "child::CD='"+vsAltRsnRcd+"'");
		
		if(ValueUtil.isNull(vsSmtCnt)) {
			util.Control.setValue(app, "cbbFrfAbsSmtCntRcd", "");
		} else {
			util.Control.setValue(app, "cbbFrfAbsSmtCntRcd", vsSmtCnt);
		}
		
		moPage.getRegTransRcd();
		
	};
	
	/**
	 * @desc 선택된 학년도 학기 3/4 수업일수와 변동일자 체크
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 2. 17.
	 */
	moPage.onValueChanged_CbbFrfSchYearRcd = function() {
		moPage.getYearSmtDtChk();
	};
	
	/**
	 * @desc 선택된 학년도 학기 3/4 수업일수와 변동일자 체크
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 2. 17.
	 */
	moPage.onValueChanged_CbbFrfSmtRcd = function() {
		moPage.getYearSmtDtChk();
	};
	
	
	/**
	 * @desc 성적인정여부 변경
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 5. 13.
	 */
	moPage.onValueChanged_CkbFrfRecRcogYn = function() {
		
		moPage.getRegTransRcd();
		
	};
	
	/**
	 * @desc 변동일자 변경
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 5. 18.
	 */
	moPage.onValueChanged_IptFrfAltDt = function() {
		
		moPage.getYearSmtDtChk();
		
	};
	
	/**
	 * @desc 해당 학년도 학기의 수업일수 3/4와 변동일자 체크
	               현재일자가 클경우 성적인정여부 수정 가능
				   현재일자가 작거나 같을경우 값 초기화 후 수정 불가능
				   20160513 학년도, 학기, 휴학사유, 성적인정여부로 등록이월코드 셋팅
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 2. 17.
	 */
	moPage.getYearSmtDtChk = function() {
		
		var vsSmt 			= util.FreeForm.getValue(app, "frfCsrShregAlt", "SMT_RCD");
		var vsYear			= util.FreeForm.getValue(app, "frfCsrShregAlt", "SCH_YEAR_RCD");
		var vsAltDt         = util.FreeForm.getValue(app, "frfCsrShregAlt", "ALT_DT");
		
		if (ValueUtil.isNull(vsYear)||ValueUtil.isNull(vsSmt)||ValueUtil.isNull(vsAltDt)) return;
		
		util.DataMap.setValue(app, "dmSessionDate", "strYear", vsYear);
		util.DataMap.setValue(app, "dmSessionDate", "strSmt", vsSmt);
		util.DataMap.setValue(app, "dmReqKey", "strAltDt", vsAltDt);
		util.DataMap.setValue(app, "dmSessionDate", "strStDt", "");
		util.DataMap.setValue(app, "dmSessionDate", "strEndDt", "");
		
		//strCommand: getDateCompare 
		util.Submit.send(app, "subDateFromSession", function(pbSuccess) {
			
			if (pbSuccess) {
				
				// 3/4 수업일수 체크 결과
				var vsChkYn = util.DataMap.getValue(app, "dmSessionDate", "strChkYn");
				if(vsChkYn == "N"){
					util.FreeForm.setValue(app, "frfCsrShregAlt", "REC_RCOG_YN", "");
					util.Control.setEnable(app, false, ["ckbFrfRecRcogYn"]);
				} else{
					util.Control.setEnable(app, true, ["ckbFrfRecRcogYn"]);
					util.FreeForm.setValue(app, "frfCsrShregAlt", "REC_RCOG_YN", "Y"); // 수업일수3/4이상인 경우 성적인정에 자동체크되도록 추가 (2017.1.3 김진웅선생님요청 2016.12.30)
				} 
				
				//20160513 등록이월코드 셋팅 여부 체크
				moPage.getRegTransRcd();

			} else {
				util.FreeForm.setValue(app, "frfCsrShregAlt", "REC_RCOG_YN", "");
				util.FreeForm.setValue(app, "frfCsrShregAlt", "REG_TRANS_RCD", "");
				util.Control.setEnable(app, false, ["ckbFrfRecRcogYn"]);
				return;
			}
		});
	};
	
	/**
	 * @desc 학년도, 학기, 휴학사유, 성적인정여부, 변동일자로 등록이월코드 셋팅
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 5. 18.
	 */
	moPage.getRegTransRcd = function() {
		
		var vsSmt 			          = util.FreeForm.getValue(app, "frfCsrShregAlt", "SMT_RCD");
		var vsYear			          = util.FreeForm.getValue(app, "frfCsrShregAlt", "SCH_YEAR_RCD");
		var vsAltRsnRcd           = util.FreeForm.getValue(app, "frfCsrShregAlt","ALT_RSN_RCD");
		var vsRecRcogYn         = util.FreeForm.getValue(app, "frfCsrShregAlt","REC_RCOG_YN");
		var vsAltDt                   = util.FreeForm.getValue(app, "frfCsrShregAlt","ALT_DT");
		
		if (ValueUtil.isNull(vsYear)||ValueUtil.isNull(vsSmt)||ValueUtil.isNull(vsAltRsnRcd)||ValueUtil.isNull(vsAltDt)){
			util.FreeForm.setValue(app, "frfCsrShregAlt", "REG_TRANS_RCD", "");
			return;
		}
		
		util.DataMap.setValue(app, "dmSessionDate", "strYear", vsYear);
		util.DataMap.setValue(app, "dmSessionDate", "strSmt", vsSmt);
		util.DataMap.setValue(app, "dmReqKey", "strAltRsnRcd", vsAltRsnRcd);
		util.DataMap.setValue(app, "dmReqKey", "strRecRcogYn", vsRecRcogYn);
		util.DataMap.setValue(app, "dmReqKey", "strAltDt", vsAltDt);
		// 오류발생 후 수업일수 조회 막음
		if(bErrChk){
			//strCommand: getRegTrans 
			util.Submit.send(app, "subRegTrans", function(pbSuccess) {
				
				if (pbSuccess) {
					util.FreeForm.setValue(app, "frfCsrShregAlt", "REG_TRANS_RCD", util.DataMap.getValue(app, "dmResList", "strRegTransRcd"));
				}else{
					bErrChk = false;
					util.FreeForm.setValue(app, "frfCsrShregAlt", "REG_TRANS_RCD", "");
					util.Control.setEnable(app, false, ["frfCsrShregAlt", "btnSave"]);
				}
				util.FreeForm.setValue(app, "frfCsrShregAlt", "ACT_DT12", util.DataMap.getValue(app, "dmResList", "strActDt12"));
				util.FreeForm.setValue(app, "frfCsrShregAlt", "ACT_DT34", util.DataMap.getValue(app, "dmResList", "strActDt34"));
				util.FreeForm.setValue(app, "frfCsrShregAlt", "ACT_DT14", util.DataMap.getValue(app, "dmResList", "strActDt14"));
				util.FreeForm.setValue(app, "frfCsrShregAlt", "STD_DT", util.DataMap.getValue(app, "dmResList", "strStdDt"));
			});
		}
	};
	return moPage;
};
