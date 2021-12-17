//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./stdCsrPMstAltRtn.xtm"/>

var stdCsrPMstAltRtn = function() {
	var moPage = new Page();
	//임포트용 데이터 통신 오브젝트
	var moPObject = new PObject();

	/**
	 * @desc 헤더 온로드 실행
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 2. 19.
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		doHeaderOnLoad();
	};
	
	/**
	 * @desc 팝업 닫기
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 2. 19.
	 */
	moPage.onClick_BtnCloseCancel = function() {
		app.close();
	};
	
	moPage.onModelConstruct_StdCsrPMstAltRtn = function() {
		var voAltObj = ExtPopUp.getParentVal("moAltObj");
		// 부모멤버변수에담긴학번받음
		util.DataMap.setValue(app, "dmReqKey", "strStudNo", voAltObj["studNo"]);
		util.DataMap.setValue(app, "dmReqKey", "strHeaderCourse", voAltObj["headerCourse"]);
		util.DataMap.setValue(app, "dmReqKey", "strStudInfo", voAltObj["headerStud"]);
		util.DataMap.setValue(app, "dmReqKey", "strSchYearRcd", voAltObj["year"]);
		util.DataMap.setValue(app, "dmReqKey", "strSmtRcd", voAltObj["smt"]);
		util.DataMap.setValue(app, "dmReqKey", "strStudId", voAltObj["studId"]);
		util.DataMap.setValue(app, "dmReqKey", "strRtnSchYearRcd", voAltObj["year"]);
		util.DataMap.setValue(app, "dmReqKey", "strRtnSmtRcd", voAltObj["smt"]);
		
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function (pbSuccess) {
			if (pbSuccess){
			
				// 학적변동일 Set
				doSetChgDt();
				
				util.Control.redraw(app, ["cbbFrfSchYearRcdRtn", "cbbFrfSmtRcdRtn", "cbbFrfAltRsnRcdRtn"]);
				util.Control.redraw(app, ["cbbFrfEnrollDivRcdEnr", "cbbFrfSpDivRcdEnr", "cbbFrfSaCdEnr", "cbbFrfSpCdEnr", "cbbFrfEnrollRsnRcdEnr", "cbbFrfCurAplyYearRcdEnr"]);
			}else{
				ExtModel.dispatch("btnCloseCancel", "DOMActivate");
			}			
		});
	};
	
	/**
	 * @desc onModelConstructDone 이벤트
	 * @param 
	 * @return void
	 * @author	 Choi In Seong 2016. 2. 19.
	 */
	moPage.onModelConstructDone_StdCsrPMstAltRtn = function() {
		//리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["frfCsrShregAltAbs","frfCsrShregAltRtn","frfCsrEnroll"]);
		//화면 온로드 서브미션 호출
		doOnLoad();
	};
	
	/**
	 * @desc 프리폼 신규 생성
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 2. 19
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
	
	
	/********************************
	 * 사용자 정의 메소드, 변수
	 *******************************/
	var vbSaChgChk = false;

	/**
	 * @desc  휴학정보, 복학학년, 복학학기, 복학사유, 학사부서 변경이력 Select
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 02. 19.
	 */
	function doOnLoad() {
		var voAltObj = ExtPopUp.getParentVal("moAltObj");
		
		//strCommand: list 
		util.Submit.send(app, "subList", function (pbSuccess) {
			if (pbSuccess){
				util.Control.redraw(app, ["frfCsrShregAltRtn", "frfCsrShregAltAbs", "frfCsrEnroll"]);
				
				// 학생의 학번정보를 화면에 입력
				util.Control.setValue(app, "optStudNo", voAltObj["studNo"]);
				util.Control.setValue(app, "optStud", voAltObj["headerStud"]);
				util.Control.setValue(app, "optCourse", voAltObj["headerCourse"]);
				
				// 학사변동 여부 체크
				doSaChgChk();
				
				// 복학 신규
				doSubInsertRow("frfCsrShregAltRtn");
				
				util.FreeForm.setValue(app, "frfCsrShregAltRtn", "SCH_YEAR_RCD", voAltObj["year"]);
				util.FreeForm.setValue(app, "frfCsrShregAltRtn", "SMT_RCD", voAltObj["smt"]);
								
				// 학적변동일 Set
				doSetChgDt();
				
				// 휴학사유 Check.	
				doChkAbsRsn();

				var vsRtnSchYear = util.FreeForm.getValue(app, "frfCsrShregAltAbs", "RTN_PLAN_SCH_YEAR_RCD");
				var vsRtnSmt = util.FreeForm.getValue(app, "frfCsrShregAltAbs", "RTN_PLAN_SMT_RCD");
				
				//복학 예정 학년도
				util.DataMap.setValue(app, "dmReqKey", "strRtnPlanYear", vsRtnSchYear);
				//복학 예정 학기
				util.DataMap.setValue(app, "dmReqKey", "strRtnPlanSmt", vsRtnSmt);
				
				util.Control.redraw(app, ["cbbFrfSchYearRcdRtn", "cbbFrfSmtRcdRtn", "cbbFrfAltRsnRcdRtn"]);		
				util.Control.setFocus(app, "cbbFrfSchYearRcdRtn");
			}else{
				ExtModel.dispatch("btnCloseCancel", "DOMActivate");
			}			
		});
	};
	 
	/**
	 * @desc  학사부서 변경이력(통폐합) 유무 체크한다.
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 02. 19.
	 */
	function doSaChgChk() {
		// 학사부서 변경이력 유무 체크.
		var vnChgListCnt = util.DataSet.getRowCount(app, "dsSaList");
		if (vnChgListCnt > 0) {
			vbSaChgChk = true;
		}else{
			vbSaChgChk = false;
		}
		
		if (vbSaChgChk) {
			// 학적등록정보(주과정) 신규
			doSubInsertRow("frfCsrEnroll");
			
			// 학사부서 변경이력이 있으면.				
			// 학적등록 FreeForm 전체 활성화.
			util.Control.setEnable(app, true, "frfCsrEnroll");
			
			// 학적등록정보(주전공등록으로), 이수과정구분(전공으로) Setting.
			util.FreeForm.setValue(app, "frfCsrEnroll", "ENROLL_DIV_RCD", "CT103MAIN");
			util.FreeForm.setValue(app, "frfCsrEnroll", "SP_DIV_RCD", "CA10701");
			
			//복학 학년도 학기 표준 시작일자
			var vsStDt = util.DataMap.getValue(app, "dmDateMain", "ST_DT");
			util.FreeForm.setValue(app, "frfCsrEnroll", "ST_DT", vsStDt);
			util.FreeForm.setValue(app, "frfCsrEnroll", "END_DT", "99991231000000");
			
			util.Control.redraw(app, ["cbbFrfEnrollDivRcdEnr", "cbbFrfSpDivRcdEnr", "dipFrfStDtEnr", "dipFrfEndDtEnr"]);
			util.Control.setEnable(app, false, ["cbbFrfEnrollDivRcdEnr","cbbFrfSpDivRcdEnr"]);
			ExtControl.setBind(["cbbFrfEnrollDivRcdEnr", "cbbFrfSpDivRcdEnr"],"bndNew");
//TO-BE: <ExtControl.refreshBind> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//			ExtControl.refreshBind(["bndNew"]);
		} else {
			// 학적등록 FreeForm 전체 비활성화.
			util.Control.setEnable(app, false, "frfCsrEnroll");
			util.Control.reset(app, "frfCsrEnroll");
			
			// 학생의 원소속
			var vsOrgSaCd = util.DataMap.getValue(app, "dmReqKey", "strOrgSaCd");
			util.DataMap.setValue(app, "dmReqKey", "strSaCd", vsOrgSaCd);
		}
	};

	 /**
	 * @desc  학년도,학기 Click시
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 02. 19.
	 */
	function doChgYearSmt() {
		
		var vsYear = util.FreeForm.getValue(app, "frfCsrShregAltRtn", "SCH_YEAR_RCD");
		util.DataMap.setValue(app, "dmDateMain", "YEAR", vsYear);
		
		var vsSmt = util.FreeForm.getValue(app, "frfCsrShregAltRtn", "SMT_RCD");
		util.DataMap.setValue(app, "dmDateMain", "SMT", vsSmt);
		
		if (!ValueUtil.isNull(vsYear) && !ValueUtil.isNull(vsSmt)) {
			// 학사력 추출.
			doChangeDate();
		}
	};
	
	 /**
	 * @desc  학사력 (학년도,학기 => 시작일,종료일)
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 02. 19.
	 */
	function doChangeDate() {
		
		//strCommand: date 
		util.Submit.send(app, "subSelCal", function(pbSuccess) {
			if (pbSuccess) {
				var vsStDt = util.DataMap.getValue(app, "dmDateMain", "ST_DT");
				var vsFinalDt = "99991231000000";
				
				// 학생의 원소속
				var vsOrgSaCd = util.DataMap.getValue(app, "dmReqKey", "strOrgSaCd");
				
				util.DataMap.setValue(app, "dmReqKey", "strSaCd", vsOrgSaCd);
				util.DataMap.setValue(app, "dmReqKey", "strKeyDate", vsStDt);
				
				//strCommand: getSaCdList 
				util.Submit.send(app, "subSaCdList", function(pbSuccess){
						if(pbSuccess){
							var vsStDt   = util.DataMap.getValue(app, "dmDateMain", "ST_DT");
							var vsFinalDt = "99991231000000";
							
							util.Control.redraw(app, ["cbbFrfEnrollDivRcdEnr", "cbbFrfSaCdEnr", "cbbFrfEnrollRsnRcdEnr"]);
							
							doSaChgChk();			
						}
					}
				);
			} else {
				util.FreeForm.setValue(app, "frfCsrShregAltRtn", "SCH_YEAR_RCD", "");
				util.FreeForm.setValue(app, "frfCsrShregAltRtn", "SMT_RCD", "");
				util.DataMap.setValue(app, "dmReqKey", "strKeyDate", "");
				util.Control.redraw(app, ["cbbFrfSchYearRcdRtn", "cbbFrfSmtRcdRtn"]);
			}
		});
		
	};
	
	 /**
	 * @desc  휴학사유 Check
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 02. 19.
	 */
	function doChkAbsRsn() {
		var vsAbsRsn = util.FreeForm.getValue(app, "frfCsrShregAltAbs", "ALT_RSN_RCD");
		util.FreeForm.setValue(app, "frfCsrShregAltRtn", "ALT_RSN_RCD", "CT40501"); // 복학사유를 일반복학으로 셋팅
		
		util.Control.setEnable(app, true, ["cbbFrfAltRsnRcdRtn"]); // 복학사유 Enable.
	};
	

	 /**
	 * @desc 학적변동일 초기 현재일 Setting
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 02. 19.
	 */
	function doSetChgDt() {
		
		var vsChgDt = util.DataMap.getValue(app, "dmResOnLoad", "chgDt");
		util.FreeForm.setValue(app, "frfCsrShregAltRtn", "ALT_DT", vsChgDt);
		util.Control.redraw(app, "dipFrfAltDtRtn");
	};
	
	 /**
	 * @desc 학사부서 선택시, 이수과정 LIST, 행정부서 SETTING
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 02. 19.
	 */
	function doGetSpList() {
		var vsSaCd = util.FreeForm.getValue(app, "frfCsrEnroll", "SA_CD");
		
		util.DataMap.setValue(app, "dmReqKey", "strSaCd", vsSaCd);
		
		//strCommand: selCourse 
		util.Submit.send(app, "subSelCourse", function(pbSuccess) {
			if(pbSuccess){
				var vsOgCd = util.DataMap.getValue(app, "dmResOnLoad", "ogCd");
				var vsOgNm = util.DataMap.getValue(app, "dmResOnLoad", "ogNm");
				
				util.FreeForm.setValue(app, "frfCsrEnroll", "OG_CD", vsOgCd);
				util.FreeForm.setValue(app, "frfCsrEnroll", "OG_NM", vsOgNm);
				util.FreeForm.setValue(app, "frfCsrEnroll", "SP_CD", "");
				util.FreeForm.setValue(app, "frfCsrEnroll", "SP_CD1", "");
				util.FreeForm.setValue(app, "frfCsrEnroll", "ENROLL_RSN_RCD", "CT105EXP"); // 폐전과 설정 
				
				util.Control.redraw(app, ["cbbFrfSpCdEnr", "cbbFrfSpCdEnr1", "ipbFrfOgNmEnr", "ipbFrfOgCd"]);
			} else {
				util.FreeForm.setValue(app, "frfCsrEnroll", "SP_CD", "");
				util.FreeForm.setValue(app, "frfCsrEnroll", "SP_CD1", "");
				util.FreeForm.setValue(app, "frfCsrEnroll", "OG_CD", "");
				util.FreeForm.setValue(app, "frfCsrEnroll", "OG_NM", "");
			}
		});
	};
	
	 /**
	 * @desc 저장 SF에서 오류 메시지가 있으면 확인창 띄움.
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 02. 19.
	 */
	function doSave(pnStep) {
		if (!pnStep) {
			pnStep = "0";
		}
		
		var vsSaChg = (vbSaChgChk)? "1":"0";	
		
		util.DataMap.setValue(app, "dmInteractiveMsg", "intStep", pnStep);
		util.DataMap.setValue(app, "dmReqKey", "strSaChg", vsSaChg);
		
		//strCommand: save 
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
	 * @desc 복학학년도 변경시 표훈학기 날짜 반환
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 02. 19.
	 */
	moPage.onValueChanged_CbbFrfSchYearRcdRtn = function() {
		// 시작일,종료일 Setting.
		doChgYearSmt();
	};
	
	/**
	 * @desc 복학학기 변경시 표훈학기 날짜 반환
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 02. 19.
	 */
	moPage.onValueChanged_CbbFrfSmtRcdRtn = function() {
		// 시작일,종료일 Setting.
		doChgYearSmt();
	};
	
	/**
	 * @desc 학적변동일 변경시 학적등록정보에 효력시작일자가 존재하면 학적변동일로 수정
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 02. 19.
	 */
	moPage.onValueChanged_DipFrfAltDtRtn = function() {
		
		var vsStDt = util.FreeForm.getValue(app, "frfCsrEnroll", "ST_DT");
		
		if(!ValueUtil.isNull(vsStDt)) {
			var vsValue = util.FreeForm.getValue(app, "frfCsrShregAltRtn", "ALT_DT");
			util.FreeForm.setValue(app, "frfCsrEnroll", "ST_DT", vsValue);
			util.Control.redraw(app, "dipFrfStDtEnr");
		}
	};
	
	/**
	 * @desc 학사부서 변경시 이수과정 재조회
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 02. 19.
	 */
	moPage.onValueChanged_CbbFrfSaCdEnr = function() {
		doGetSpList();
	};
	
	/**
	 * @desc 복학신규 저장 버튼 event
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 2. 17.
	 */
	moPage.onClick_BtnSave = function() {
		
		if (vbSaChgChk) {
			var vsSaCd = util.FreeForm.getValue(app, "frfCsrEnroll", "SA_CD");
			if(!ValueUtil.isNull(vsSaCd)){
				//리피트 validation check
				if(!util.validate(app, ["frfCsrShregAltRtn", "frfCsrEnroll"])){
					return false;
				}
			}else{
				if(!util.validate(app, ["frfCsrShregAltRtn"])){
					return false;
				}				
			}
			
		} else {
			//리피트 validation check
			if(!util.validate(app, ["frfCsrShregAltRtn"])){
				return false;
			}
		}

		util.DataMap.setValue(app, "dmReqKey", "strPopTarget", "stdCsrPMstAltRtn");
		//strCommand: popupMnu 
		util.Submit.send(app, "subMstAltPopupMnu", function(pbSuccess){
			if (pbSuccess) {
				doSave();
			}
		});
	};
	
	/**
	 * @desc 교과과정적용학년도 변경시 메시지 출력
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 2. 17.
	 */
	moPage.onValueChanged_CbbFrfCurAplyYearRcdEnr = function() {
			
		if (!ValueUtil.isNull(vsRegChgCurAplyYear)) {
			util.Msg.alert("NLS-CSR-M026");
		}
	};

	
	/**
	 * @desc 폐전과데이터를 입력하도록 유도하기 위해 
	 * @param
	 * @return void
	 * @author Sunyoung Park 2017.1.3 
	 */
	moPage.onValueChanged_CbbFrfSaCdEnr1 = function() {
		var vsSaCd = util.FreeForm.getValue(app, "frfCsrEnroll", "SA_CD1");
		util.FreeForm.setValue(app, "frfCsrEnroll", "SA_CD",vsSaCd);
		
		if (vsSaCd != "") { 
		
				util.Control.setUserAttr(app, "cbbFrfSaCdEnr1", "require", "Y");
				ExtControl.setAttr("cbbFrfSaCdEnr1", "class", "cbbSchReq");
				ExtControl.setAttr("lblFrfSaCdEnr", "class", "lblSchReq");
				
				util.Control.setUserAttr(app, "cbbFrfSpCdEnr1", "require", "Y");
				ExtControl.setAttr("cbbFrfSpCdEnr1", "class", "cbbSchReq");
				ExtControl.setAttr("lblFrfSpCdEnr", "class", "lblSchReq");
				ExtControl.setAttr("lblFrfEnrollRsnRcdEnr", "class", "lblSchReq");
				
			doGetSpList();
		}else{
		
				util.Control.setUserAttr(app, "cbbFrfSaCdEnr1", "require", "");
				ExtControl.setAttr("cbbFrfSaCdEnr1", "class", "cbbSch");
				ExtControl.setAttr("lblFrfSaCdEnr", "class", "lblSch");
				
				util.Control.setUserAttr(app, "cbbFrfSpCdEnr1", "require", "");
				ExtControl.setAttr("cbbFrfSpCdEnr1", "class", "cbbSch");
				ExtControl.setAttr("lblFrfSpCdEnr", "class", "lblSch");
				ExtControl.setAttr("lblFrfEnrollRsnRcdEnr", "class", "lblSch");
				
				util.FreeForm.setValue(app, "frfCsrEnroll", "SP_CD", "");
				util.FreeForm.setValue(app, "frfCsrEnroll", "SP_CD1", "");
				util.FreeForm.setValue(app, "frfCsrEnroll", "OG_CD", "");
				util.FreeForm.setValue(app, "frfCsrEnroll", "OG_NM", "");
		}
	}
	
	
	/**
	 * @desc 폐전과데이터를 입력하도록 유도하기 위해 
	 * @param
	 * @return void
	 * @author  Sunyoung Park 2017.1.3 
	 */
	moPage.onValueChanged_CbbFrfSpCdEnr1 = function() {
		var vsSpCd = util.FreeForm.getValue(app, "frfCsrEnroll", "SP_CD1");
		util.FreeForm.setValue(app, "frfCsrEnroll", "SP_CD",vsSpCd);
		
	};
	return moPage;
};
