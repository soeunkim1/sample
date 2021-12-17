//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCsrCAltEnrollAbs.xtm"/>


var extCsrCAltEnrollAbs = function() {
	var moPage = new Page();
	//임포트용 데이터 통신 오브젝트
	var moPObject = new PObject();
	var bErrChk = true;
	
	moPage.reqInputCbb = ["cbbFrfSchYearRcd", "cbbFrfSmtRcd", "cbbFrfAltRsnRcd", "cbbFrfAltDivRcd", "cbbFrfRtnPlanYearRcd", "cbbFrfRtnPlanSmtRcd", "cbbFrfAbsSmtCntRcd", "cbbFrfRegTransRcd"];

	/********************************
	 * 폼 신규 상태 체크 
	 *******************************/
	moPage.mbIsInsertRowFrf = false;
	
	/**
	 * @desc onModelConstructDone 이벤트
	 * @param 
	 * @return void
	 * @author	 Choi In Seong 2016. 10. 11.
	 */
	moPage.onModelConstructDone_ExtCsrCAltEnrollAbs = function() {
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
	 * @author	 Choi In Seong 2016. 10. 11.
	 */
	function doOnLoad() {
		var voAltObj = moPage.parent.moParentObj;
		
		// 부모멤버변수에담긴학번받음
		util.DataMap.setValue(app, "dmReqList", "strStudId", voAltObj.strStudId );
		util.DataMap.setValue(app, "dmReqList", "strSchYearRcd", voAltObj.strSchYearRcd);
		util.DataMap.setValue(app, "dmReqList", "strSmtRcd", voAltObj.strSmtRcd);
		util.DataMap.setValue(app, "dmReqList", "strAltDt", voAltObj.strAltDt);
		util.DataMap.setValue(app, "dmReqList", "strAltDivRcd", voAltObj.strAltDivRcd);
		util.DataMap.setValue(app, "dmReqList", "strAltRsnRcd", voAltObj.strAltRsnRcd);
		util.DataMap.setValue(app, "dmReqList", "strAbsSmtCntRcd", voAltObj.strAbsSmtCntRcd);
		
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess) {
			if (pbSuccess) {
				util.Control.redraw(app, ["frfCsrShregAlt"]);
				util.Control.redraw(app, moPage.reqInputCbb);
				//신규입력이 아님
				moPage.mbIsInsertRowFrf = false;
				if(ValueUtil.isNull(voAltObj.strStudId)){
					util.Control.setEnable(app, false, ["frfCsrShregAlt"]);
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
		util.DataMap.setValue(app, "dmReqList", "strStudId", voAltObj.strStudId );
		util.DataMap.setValue(app, "dmReqList", "strAbsSmtCntRcd", voAltObj.strAbsSmtCntRcd);
		
		util.DataMap.setValue(app, "dmReqList", "strPopTarget", "extCsrPMstAltAbs");
		//strCommand: popupMnu 
		util.Submit.send(app, "subMstAltPopupMnu", function(pbSuccess){
			if (pbSuccess) {
				util.FreeForm.setValue(app, "frfCsrShregAlt",AppConstants.CUD_COL_REF, "I");
				//프리폼 신규
				util.FreeForm.insertRow(app, "frfCsrShregAlt");
				
				util.Control.setEnable(app, false, ["cbbFrfRegTransRcd"]);
		//		ExtRepeat.setRowStatus("frfCsrShregAlt","insert",1);
				util.Grid.setRowState(app, "frfCsrShregAlt",cpr.data.tabledata.RowState.UNCHANGED,'1');
				moPage.mbIsInsertRowFrf = true;
		
		
				//신규입력이 Ok
				util.Control.setEnable(app, true, ["frfCsrShregAlt", "btnSaveAbs"]);

				// 휴학신규
				//부모창의 변동정보 셋팅
				util.FreeForm.setValue(app, "frfCsrShregAlt", "STUD_ID", util.DataMap.getValue(app, "dmReqList", "strStudId"));
				util.FreeForm.setValue(app, "frfCsrShregAlt", "REG_TRANS_RCD", util.DataMap.getValue(app, "dmResList", "strRegTransRcd"));
				util.FreeForm.setValue(app, "frfCsrShregAlt", "SCH_YEAR_RCD", util.DataMap.getValue(app, "dmReqList", "strSchYearRcd"));
				util.FreeForm.setValue(app, "frfCsrShregAlt", "SMT_RCD", util.DataMap.getValue(app, "dmReqList", "strSmtRcd"));
				util.FreeForm.setValue(app, "frfCsrShregAlt", "ALT_DIV_RCD", util.DataMap.getValue(app, "dmReqList", "strAltDivRcd"));

				util.FreeForm.setValue(app, "frfCsrShregAlt", "ALT_RSN_RCD", util.DataMap.getValue(app, "dmReqList", "strAltRsnRcd"));
				util.FreeForm.setValue(app, "frfCsrShregAlt", "ABS_SMT_CNT_RCD", util.DataMap.getValue(app, "dmReqList", "strAbsSmtCntRcd")); // 휴학학기수 추가 (2016.10.24) 
				util.FreeForm.setValue(app, "frfCsrShregAlt", "ALT_DT", util.DataMap.getValue(app, "dmReqList", "strAltDt"));
				moPage.getYearSmtDtChk();
			}else{
							util.Control.setEnable(app, false, ["frfCsrShregAlt", "btnSaveAbs"]);
			}
		});
	}
	
	/**
	 * @desc 휴학신규 저장 버튼 event
	 * @param
	 * @return void
	 * @author	 Choi In Seong 2016. 10. 11.
	 */
	moPage.onClick_BtnSaveAbs = function() {
		
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
		
		
		
		util.DataMap.setValue(app, "dmReqList", "strPopTarget", "extCsrPMstAltAbs");
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
	 * @author	 Choi In Seong 2016. 10. 11.
	 */	
	function doSave(pnStep, poCallbackFunc) {
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
						return doSave(vnStep, poCallbackFunc);
					} else {
						return false;
					}
				}else{
					var voCallBackSaveAfter = function(pbSuccess) {
						if(pbSuccess) {
							//저장성공 메세지 출력
							// 조회 : "조회되었습니다." header 메세지 표시
							moPage.parentSendMsg(NLS.INF.M025);
							
							doDataClear();
							util.Control.setEnable(app, false, ["frfCsrShregAlt", "btnSaveAbs"]);
						}
						if(util.isFunc(poCallbackFunc))	poCallbackFunc(pbSuccessList);
					};
					ExtSubPage.getParent().callScript("doSaveAfter", voCallBackSaveAfter);
				}
			}else{
				return false;
			}
		});
	};
	
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
	 * @desc 휴학사유 changeEvent 휴학사유에 설정된 휴학학기수 셋팅
	               학년도, 학기, 휴학사유, 성적인정여부로 등록이월코드 셋팅
	 * @param
	 * @return void
	 * @author	 Choi In Seong 2016. 10. 11.
	 */
	moPage.onValueChanged_CbbFrfAltRsnRcd = function() {
		
		var vsSmtCnt = util.Control.getValue(app, "cbbFrfAbsSmtCntRcd");
		
		if(ValueUtil.isNull(vsSmtCnt)) {
			util.Control.setValue(app, "cbbFrfAbsSmtCntRcd", "");
		} else {
			util.Control.setValue(app, "cbbFrfAbsSmtCntRcd", vsSmtCnt);
			moPage.getRtnYearSmt();
		}
		
		moPage.getRegTransRcd();
	};
	
	/**
	 * @desc 성적인정여부 변경
	 * @param
	 * @return void
	 * @author	 Choi In Seong 2016. 10. 11.
	 */
	moPage.onValueChanged_CkbFrfRecRcogYn = function() {
		
		moPage.getRegTransRcd();
		
	};
	
	/**
	 * @desc 해당 학년도 학기의 수업일수 3/4와 변동일자 체크
	               현재일자가 클경우 성적인정여부 수정 가능
				   현재일자가 작거나 같을경우 값 초기화 후 수정 불가능
				   학년도, 학기, 휴학사유, 성적인정여부로 등록이월코드 셋팅
				   휴학학기수를 학생에 해당하는 마지막 최초 휴학학기수로 맞추도록 재설정 (2016.11.1 추가  ) 
	 * @param
	 * @return void
	 * @author	 Choi In Seong 2016. 10. 11.
	 */
	moPage.getYearSmtDtChk = function() {
		
		var vsSmt 			= util.FreeForm.getValue(app, "frfCsrShregAlt", "SMT_RCD");
		var vsYear			= util.FreeForm.getValue(app, "frfCsrShregAlt", "SCH_YEAR_RCD");
		var vsAltDt         = util.FreeForm.getValue(app, "frfCsrShregAlt", "ALT_DT");
		
		if (ValueUtil.isNull(vsYear)||ValueUtil.isNull(vsSmt)||ValueUtil.isNull(vsAltDt)) return;
		
		util.DataMap.setValue(app, "dmReqList", "strAltDt", vsAltDt);
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
					util.FreeForm.setValue(app, "frfCsrShregAlt", "REC_RCOG_YN", "Y");		// 성적인정에 자동체크되도록 추가 (2017.1.3 김진웅선생님요청 2016.12.30)
				}
				util.FreeForm.setValue(app, "frfCsrShregAlt", "ABS_SMT_CNT_RCD", util.DataMap.getValue(app, "dmSessionDate", "strAbsSmtCntRcd")); // 휴학학기수 추가 (2016.11.1)
				util.Control.redraw(app, "cbbFrfAbsSmtCntRcd");
				
				//20160513 등록이월코드 셋팅 여부 체크
				moPage.getRegTransRcd();				

			} else {
				util.FreeForm.setValue(app, "frfCsrShregAlt", "REC_RCOG_YN", "");
				util.FreeForm.setValue(app, "frfCsrShregAlt", "REG_TRANS_RCD", "");
				util.Control.setEnable(app, false, ["ckbFrfRecRcogYn"]);
				
				util.FreeForm.setValue(app, "frfCsrShregAlt", "ABS_SMT_CNT_RCD", util.DataMap.getValue(app, "dmSessionDate", "strAbsSmtCntRcd")); // 휴학학기수 추가 (2016.11.1)
				util.Control.redraw(app, "cbbFrfAbsSmtCntRcd");
				return;
			}
		});
	};
	
	/**
	 * @desc 학년도, 학기, 휴학사유, 성적인정여부, 변동일자로 등록이월코드 셋팅
	 * @param
	 * @return void
	 * @author	 Choi In Seong 2016. 10. 11.
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
	
		util.DataMap.setValue(app, "dmReqList", "strAltRsnRcd", vsAltRsnRcd);
		util.DataMap.setValue(app, "dmReqList", "strRecRcogYn", vsRecRcogYn);
		util.DataMap.setValue(app, "dmReqList", "strAltDt", vsAltDt);
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
				util.FreeForm.setValue(app, "frfCsrShregAlt", "STD_DT", util.DataMap.getValue(app, "dmResList", "strStdDt"));
			});
		}
	};
	
	/**
	 * @desc 휴학 학기수 변경
	 * @param
	 * @return void
	 * @author	 Choi In Seong 2016. 10. 11.
	 */
	moPage.onValueChanged_CbbFrfAbsSmtCntRcd = function() {
		moPage.getRtnYearSmt();
	};
	
	moPage.mbIsChangedByYearSmt = false;
	moPage.mbIsChangedByAbsSmtCnt = false;
	
	/**
	 * @desc 휴학 학기수에 따른 복학예정 학년도 학기반환
	 * @param
	 * @return void
	 * @author	 Choi In Seong 2016. 10. 11.
	 */
	moPage.getRtnYearSmt = function() {
		//복학학년도학기 변경에 따른 이벤트 호출일 경우는 동작안함 2017.02.20
		if(moPage.mbIsChangedByYearSmt) return;
		
		var vsAbsSmtCntRcd = util.FreeForm.getValue(app, "frfCsrShregAlt", "ABS_SMT_CNT_RCD");
		if(ValueUtil.isNull(vsAbsSmtCntRcd)){
			var vsRtnYearRcd = util.FreeForm.getValue(app, "frfCsrShregAlt", "RTN_PLAN_YEAR_RCD");
			var vsRtnSmtRcd = util.FreeForm.getValue(app, "frfCsrShregAlt", "RTN_PLAN_SMT_RCD");
			moPage.mbIsChangedByAbsSmtCnt = true;
			if( !ValueUtil.isNull(vsRtnYearRcd) ){
				util.FreeForm.setValue(app, "frfCsrShregAlt", "RTN_PLAN_YEAR_RCD", "");
			}
			if( !ValueUtil.isNull(vsRtnSmtRcd) ){
				util.FreeForm.setValue(app, "frfCsrShregAlt", "RTN_PLAN_SMT_RCD", "");
			}
			moPage.mbIsChangedByAbsSmtCnt = false;
			return;
			
		}else{
			util.DataMap.setValue(app, "dmReqList", "strAbsSmtCntRcd", vsAbsSmtCntRcd);
			//strCommand: getRtnYearSmt 
			util.Submit.send(app, "subRtnYearSmt", function(pbSuccess) {
				moPage.mbIsChangedByAbsSmtCnt = true;
				if (pbSuccess) {
					util.FreeForm.setValue(app, "frfCsrShregAlt", "RTN_PLAN_YEAR_RCD", util.DataMap.getValue(app, "dmResList", "strRtnYearRcd"));
					util.FreeForm.setValue(app, "frfCsrShregAlt", "RTN_PLAN_SMT_RCD", util.DataMap.getValue(app, "dmResList", "strRtnSmtRcd"));
				}else{
					util.FreeForm.setValue(app, "frfCsrShregAlt", "RTN_PLAN_YEAR_RCD", "");
					util.FreeForm.setValue(app, "frfCsrShregAlt", "RTN_PLAN_SMT_RCD", "");
					util.Control.setEnable(app, false, ["frfCsrShregAlt", "btnSave"]);
				}
				
				moPage.mbIsChangedByAbsSmtCnt = false;
			});
		}
		
		return;
	};
	
	moPage.getAbsSmtCntRcdByYearSmt = function(){
		
		//복학학기수 변경에 따른 이벤트 호출일 경우는 동작안함 2017.02.20
		if(moPage.mbIsChangedByAbsSmtCnt) return;
		
		var vsRtnYearRcd = util.FreeForm.getValue(app, "frfCsrShregAlt", "RTN_PLAN_YEAR_RCD");
		var vsRtnSmtRcd = util.FreeForm.getValue(app, "frfCsrShregAlt", "RTN_PLAN_SMT_RCD");
		var vsAbsSmtCntRcd = util.FreeForm.getValue(app, "frfCsrShregAlt", "ABS_SMT_CNT_RCD");
		
		if( ValueUtil.isNull(vsRtnYearRcd) || ValueUtil.isNull(vsRtnSmtRcd) ){
			moPage.mbIsChangedByYearSmt = true;
			if( !ValueUtil.isNull(vsAbsSmtCntRcd) ){
				util.FreeForm.setValue(app, "frfCsrShregAlt", "ABS_SMT_CNT_RCD", "");
			}
			moPage.mbIsChangedByYearSmt = false;
			return;
		} else {
			util.DataMap.setValue(app, "dmReqAbsSmtCnt", "strRtnYearRcd", vsRtnYearRcd);
			util.DataMap.setValue(app, "dmReqAbsSmtCnt", "strRtnSmtRcd", vsRtnSmtRcd);
			
			//strCommand: getAbsSmtCnt 
			util.Submit.send(app, "subAbsSmtCnt", function(pbSuccess) {
				moPage.mbIsChangedByYearSmt = true;
				if (pbSuccess) {
					util.FreeForm.setValue(app, "frfCsrShregAlt", "ABS_SMT_CNT_RCD", util.DataMap.getValue(app, "dmResAbsSmtCnt", "strAbsSmtCntRcd"));
					
				}else{
					util.FreeForm.setValue(app, "frfCsrShregAlt", "ABS_SMT_CNT_RCD", "");
					util.Control.setEnable(app, false, ["frfCsrShregAlt", "btnSave"]);
				}
				
				moPage.mbIsChangedByYearSmt = false;
			});
		}
		return;
	};
	
	moPage.onLoadImportDone_ImpSbpHeader = function() {
		doSbpHeaderOnLoad();
	}

	/**
	 * @desc 프리폼 초기화
	 * @param
	 * @return void
	 * @author	 Choi In Seong 2016. 10. 11.
	 */
	function doDataClear() {
		util.Control.reset(app, ["frfCsrShregAlt"]);
	};
	
	
	
	moPage.onValueChanged_CbbFrfRtnPlanYearRcd = function() {
		moPage.getAbsSmtCntRcdByYearSmt();
	};
	
	
	moPage.onValueChanged_CbbFrfRtnPlanSmtRcd = function() {
		moPage.getAbsSmtCntRcdByYearSmt();
	};
	return moPage;
};
