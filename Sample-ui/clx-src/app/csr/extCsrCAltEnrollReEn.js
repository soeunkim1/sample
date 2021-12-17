//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCsrCAltEnrollReEn.xtm"/>

var extCsrCAltEnrollReEn = function() {
	var moPage = new Page();
	//임포트용 데이터 통신 오브젝트
	var moPObject = new PObject();

	/**
	 * @desc onModelConstructDone 이벤트
	 * @param 
	 * @return void
	 * @author	 Choi Kyung Min 2016. 10. 26.
	 */
	moPage.onModelConstructDone_ExtCsrCAltEnrollReEn = function() {
		//리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["frfCsrSmtGiveUp","frfCsrShregAltRe"]);
		
		//화면 온로드 서브미션 호출
		//moPage.doOnLoad();
		
		//온로드 시 화면 컨트롤 disable
		util.Control.setEnable(app, false, ["frfCsrSmtGiveUp", "btnSaveSmtGiveUp", "frfCsrShregAltRe", "btnSave"]);
	};
	
	/**
	 * @desc 프리폼 신규 생성
	 * @param
	 * @return void
	 * @author Choi Kyung Min 2016. 10. 26
	 */
	function doSubInsertRow(vsFrfId) {
		util.FreeForm.setValue(app, vsFrfId, AppConstants.CUD_COL_REF, "N");
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
	var mbSaChgChk = false;

	/**
	 * @desc  화면 온로드 제적정보조회, 공통코드 셋팅
	 * @param
	 * @return void
	 * @author Choi Kyung Min 2016. 10. 26
	 */
	function doNewAlt() {
		
		doDataClear();
		
		var voParam = moPage.parent.moParentObj;
		
		/*
		voParam.strStudId     				= util.DataMap.getValue(app, "dmReqList", "strStudId");
		voParam.strSchYearRcd     	= util.Control.getValue(app, "cbbSchYearRcd"); 
		voParam.strSmtRcd 				= util.Control.getValue(app, "cbbSmtRcd");
		voParam.strAltDt 					= util.Control.getValue(app, "dipAltDt");
		voParam.strAltDivRcd   			= util.Control.getValue(app, "cbbAltDivRcd");
		voParam.strAltRsnRcd 			= util.Control.getValue(app, "cbbAltRsnRcd");
		*/
		
		// 부모멤버변수에담긴학번받음
		util.DataMap.setValue(app, "dmReqKey", "strStudId", voParam.strStudId);
		util.DataMap.setValue(app, "dmReqKey", "strReSchYearRcd", voParam.strSchYearRcd);
		util.DataMap.setValue(app, "dmReqKey", "strReSmtRcd", voParam.strSmtRcd);
		util.DataMap.setValue(app, "dmReqKey", "strAltDt", voParam.strAltDt);
		util.DataMap.setValue(app, "dmReqKey", "strAltDivRcd", voParam.strAltDivRcd);
		util.DataMap.setValue(app, "dmReqKey", "strAltRsnRcd", voParam.strAltRsnRcd);
		
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function (pbSuccess) {
			if (pbSuccess){
				util.Control.setEnable(app, true, ["frfCsrSmtGiveUp", "btnSaveSmtGiveUp", "frfCsrShregAltRe", "btnSave"]);
				util.Control.redraw(app, ["frfCsrShregAltRe"]);
				
				// 학사변동 여부 체크
				doSaChgChk();
				
				// 재입학 신규
				doSubInsertRow("frfCsrShregAltRe");
				
				util.FreeForm.setValue(app, "frfCsrShregAltRe", "SCH_YEAR_RCD", util.DataMap.getValue(app, "dmReqKey", "strReSchYearRcd"));
				util.FreeForm.setValue(app, "frfCsrShregAltRe", "SMT_RCD", util.DataMap.getValue(app, "dmReqKey", "strReSmtRcd"));
				util.FreeForm.setValue(app, "frfCsrShregAltRe", "ALT_DT", util.DataMap.getValue(app, "dmReqKey", "strAltDt"));
				util.FreeForm.setValue(app, "frfCsrShregAltRe", "ALT_DIV_RCD", util.DataMap.getValue(app, "dmReqKey", "strAltDivRcd"));
				util.FreeForm.setValue(app, "frfCsrShregAltRe", "ALT_RSN_RCD", util.DataMap.getValue(app, "dmReqKey", "strAltRsnRcd"));
				//ExtControl.refresh("dipFrfAltDtRe");
				
				//제적 정보 표시
				util.FreeForm.setValue(app, "frfCsrShregAltRe", "REMO_RSN_NM", util.DataMap.getValue(app, "dmMapRemoAlt", "ALT_RSN_NM"));
				util.FreeForm.setValue(app, "frfCsrShregAltRe", "REMO_DT", util.DataMap.getValue(app, "dmMapRemoAlt", "ALT_DT"));
				
				util.Control.redraw(app, ["cbbFrfSchYearRcdRe", "cbbFrfSmtRcdRe", "cbbFrfAltRsnRcdRe"
				                  , "cbbFrfEnrollDivRcdEnr", "cbbFrfSpDivRcdEnr", "cbbFrfEnrollRsnRcdEnr", "cbbFrfCurAplyYearRcdEnr"
								  , "cbbFrfClassRcd"]);
								  
				//반, 교수정보 설정
				util.FreeForm.setValue(app, "frfCsrShregAltRe", "CLASS_RCD", util.DataMap.getValue(app, "dmResList", "strClassRcd"));
				util.FreeForm.setValue(app, "frfCsrShregAltRe", "PROF_OBJ_NO", util.DataMap.getValue(app, "dmResList", "strProfObjNo"));
				util.FreeForm.setValue(app, "frfCsrShregAltRe", "PROF_NM", util.DataMap.getValue(app, "dmResList", "strProfNm"));
				
				//학기포기 정보 설정
				util.FreeForm.setValue(app, "frfCsrSmtGiveUp", "STUD_ID", util.DataMap.getValue(app, "dmReqKey", "strStudId"));
				util.FreeForm.setValue(app, "frfCsrSmtGiveUp", "PRE_SHYR", util.DataMap.getValue(app, "dmResList", "strPreShyr"));
				util.FreeForm.setValue(app, "frfCsrSmtGiveUp", "CHG_SHYR", util.DataMap.getValue(app, "dmResList", "strChgShyr"));
				util.FreeForm.setValue(app, "frfCsrSmtGiveUp", "GVUP_CNT", util.DataMap.getValue(app, "dmResList", "strGvupCnt"));
			} else{
				util.Control.setEnable(app, false, ["frfCsrSmtGiveUp", "btnSaveSmtGiveUp", "frfCsrShregAltRe", "btnSave"]);
			}			
		}, false);
	};
	
	/**
	 * @desc 데이터 변경사항 체크
	 * @param
	 * @return void
	 * @author Choi Kyung Min 2016. 10. 26
	 */
	function doCheckDataChange() {
		
		if(util.Grid.isModified(app, ["frfCsrShregAltRe"], "CRM") ){
			return false;
		}else{
			return true;
		}
	};
	
	/**
	 * @desc 프리폼 초기화
	 * @param
	 * @return void
	 * @author	 Choi Kyung Min 2016. 10. 26
	 */
	function doDataClear() {
		util.Control.reset(app, ["frfCsrSmtGiveUp", "frfCsrShregAltRe"]);
		
		//온로드 서브미션에서 학적상태 체크시 
		//서브미션 실패로 처리되어 커버가 씌워지므로, 
		//학생을 바꿔 초기화 할때는 커버를 제거한다.
		util.removeCover(app);
	};

	 
	/**
	 * @desc  학사부서 변경이력(통폐합) 유무 체크한다.
	 * @param
	 * @return void
	 * @author Choi Kyung Min 2016. 10. 26
	 */
	function doSaChgChk() {
		// 학사부서 변경이력 유무 체크.
		var vnChgListCnt = util.DataSet.getRowCount(app, "dsSaList");
		if (vnChgListCnt > 0) {
			mbSaChgChk = true;
		}else{
			mbSaChgChk = false;
		}
		
		if (mbSaChgChk) {
			
			// 학사부서 변경이력이 있으면.				
			// 학적등록 관련 컨트롤 활성화.
			util.Control.setEnable(app, true, ["cbbFrfSaCdEnr", "cbbFrfSpCdEnr"]);
			
			// 학적등록정보(주전공등록으로), 이수과정구분(전공으로) Setting. 학적등록사유(폐과)
			util.FreeForm.setValue(app, "frfCsrShregAltRe", "ENROLL_DIV_RCD", "CT103MAIN");
			util.FreeForm.setValue(app, "frfCsrShregAltRe", "SP_DIV_RCD", "CA10701");
			util.FreeForm.setValue(app, "frfCsrShregAltRe", "ENROLL_RSN_RCD", "CT105EXP");
			
			//변경일자
			var vsChgDt = util.DataMap.getValue(app, "dmReqKey", "strAltDt");
			util.FreeForm.setValue(app, "frfCsrShregAltRe", "ST_DT", vsChgDt);
			util.FreeForm.setValue(app, "frfCsrShregAltRe", "END_DT", "99991231000000");
			
		
			//리빌드 이후 바인드 설정
			util.Control.redraw(app, ["cbbFrfEnrollDivRcdEnr", "cbbFrfSpDivRcdEnr", "cbbFrfSaCdEnr", "cbbFrfSpCdEnr", "cbbFrfEnrollRsnRcdEnr", "cbbFrfCurAplyYearRcdEnr", "dipFrfStDtEnr", "dipFrfEndDtEnr"]);
			util.Control.setEnable(app, false, ["cbbFrfEnrollDivRcdEnr","cbbFrfSpDivRcdEnr", "cbbFrfEnrollRsnRcdEnr"]);
			ExtControl.setBind(["cbbFrfEnrollDivRcdEnr", "cbbFrfSpDivRcdEnr"],"bndNew");
//TO-BE: <ExtControl.refreshBind> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//			ExtControl.refreshBind(["bndNew"]);
			
		} else {
			// 학적등록 관련 컨트롤 비활성화.
			util.Control.setEnable(app, false, ["cbbFrfSaSpCdEnr"]);
			
			
			// 학생의 원소속
			var vsOrgSaCd = util.DataMap.getValue(app, "dmReqKey", "strOrgSaCd");
			util.DataMap.setValue(app, "dmReqKey", "strSaCd", vsOrgSaCd);
		}
	};

	 /**
	 * @desc  학년도,학기 Click시
	 * @param
	 * @return void
	 * @author Choi Kyung Min 2016. 10. 26
	 */
	function doChgYearSmt() {
		
		var vsYear = util.FreeForm.getValue(app, "frfCsrShregAltRe", "SCH_YEAR_RCD");
		util.DataMap.setValue(app, "dmDateMain", "YEAR", vsYear);
		
		var vsSmt = util.FreeForm.getValue(app, "frfCsrShregAltRe", "SMT_RCD");
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
	 * @author Choi Kyung Min 2016. 10. 26
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
				// 기준일자의 학사부서리스트 조회
				//strCommand: getSaCdList 
				util.Submit.send(app, "subSaCdList", function(pbSuccess){
						if(pbSuccess){
							var vsStDt   = util.DataMap.getValue(app, "dmDateMain", "ST_DT");
							var vsFinalDt = "99991231000000";
							
							util.Control.redraw(app, ["cbbFrfEnrollDivRcdEnr", "cbbFrfSaSpCdEnr", "cbbFrfEnrollRsnRcdEnr"]);
							
							doSaChgChk();			
						}
					}
				);
			} else {
				util.FreeForm.setValue(app, "frfCsrShregAltRe", "SCH_YEAR_RCD", "");
				util.FreeForm.setValue(app, "frfCsrShregAltRe", "SMT_RCD", "");
				util.DataMap.setValue(app, "dmReqKey", "strKeyDate", "");
				util.Control.redraw(app, ["cbbFrfSchYearRcdRtn", "cbbFrfSmtRcdRtn"]);
			}
		});
	};
	
	 /**
	 * @desc 학사부서 선택시, 이수과정 LIST, 행정부서 SETTING
	 * @param
	 * @return void
	 * @author Choi Kyung Min 2016. 10. 26
	 */
	function doGetSpList() {
		var vsSaCd = util.FreeForm.getValue(app, "frfCsrShregAltRe", "SA_CD");

		util.DataMap.setValue(app, "dmReqKey", "strSaCd", vsSaCd);
			
		//strCommand: selCourse 
		util.Submit.send(app, "subSelCourse", function(pbSuccess) {
			if(pbSuccess){
				var vsOgCd = util.DataMap.getValue(app, "dmResOnLoad", "ogCd");
				var vsOgNm = util.DataMap.getValue(app, "dmResOnLoad", "ogNm");
				
				//학과부서, 이수과정 필수값 
				util.Control.setUserAttr(app, "cbbFrfSaCdEnr", "require", "Y");
				ExtControl.setAttr("cbbFrfSaCdEnr", "class", "cbbSchReq");
				ExtControl.setAttr("lblFrfSaCdEnr", "class", "lblSchReq");
				
				util.Control.setUserAttr(app, "cbbFrfSpCdEnr", "require", "Y");
				ExtControl.setAttr("cbbFrfSpCdEnr", "class", "cbbSchReq");
				ExtControl.setAttr("lblFrfSpCdEnr", "class", "lblSchReq");
				
				util.FreeForm.setValue(app, "frfCsrShregAltRe", "OG_CD", vsOgCd);
				util.FreeForm.setValue(app, "frfCsrShregAltRe", "OG_NM", vsOgNm);
				util.FreeForm.setValue(app, "frfCsrShregAltRe", "SP_CD", "");
				util.Control.redraw(app, ["cbbFrfSpCdEnr", "ipbFrfOgNmEnr", "ipbFrfOgCd"]);
			} else {
				util.FreeForm.setValue(app, "frfCsrShregAltRe", "SP_CD", "");
				util.FreeForm.setValue(app, "frfCsrShregAltRe", "OG_CD", "");
				util.FreeForm.setValue(app, "frfCsrShregAltRe", "OG_NM", "");
				//학과부서, 이수과정 필수값 해제
				util.Control.setUserAttr(app, "cbbFrfSaCdEnr", "require", "notNull=no");
				ExtControl.setAttr("cbbFrfSaCdEnr", "class", "cbbSch");
				ExtControl.setAttr("lblFrfSaCdEnr", "class", "lblSch");
				
				util.Control.setUserAttr(app, "cbbFrfSpCdEnr", "require", "notNull=no");
				ExtControl.setAttr("cbbFrfSpCdEnr", "class", "cbbSch");
				ExtControl.setAttr("lblFrfSpCdEnr", "class", "lblSch");
			}
		});
	};
	
	 /**
	 * @desc 저장 SF에서 오류 메시지가 있으면 확인창 띄움.
	 * @param
	 * @return void
	 * @author Choi Kyung Min 2016. 10. 26
	 */
	function doSave(pnStep) {
		if (!pnStep) {
			pnStep = "0";
		}
		
		var vsSaChg = (mbSaChgChk)? "1":"0";	
		
		util.DataMap.setValue(app, "dmInteractiveMsg", "intStep", pnStep);
		util.DataMap.setValue(app, "dmReqKey", "strSaChg", vsSaChg);
		
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
					ExtSubPage.getParent().callScript("doSaveAfter", null);
					
					util.Control.setEnable(app, false, ["frfCsrSmtGiveUp", "btnSaveSmtGiveUp", "frfCsrShregAltRe", "btnSave"]);
					
					return true;
				}
			}else{
				return false;
			}
		});
	};	
	
	/**
	 * @desc 재입학학년도 변경시 표훈학기 날짜 반환
	 * @param
	 * @return void
	 * @author Choi Kyung Min 2016. 10. 26
	 */
	moPage.onValueChanged_CbbFrfSchYearRcdRe = function() {
		// 시작일,종료일 Setting.
		doChgYearSmt();
	};

	/**
	 * @desc 재입학학기 변경시 표훈학기 날짜 반환
	 * @param
	 * @return void
	 * @author Choi Kyung Min 2016. 10. 26
	 */
	moPage.onValueChanged_CbbFrfSmtRcdRe = function() {
		// 시작일,종료일 Setting.
		doChgYearSmt();
	};
	
	/**
	 * @desc 학적변동일 변경시 학적등록정보에 효력시작일자가 존재하면 학적변동일로 수정
	 * @param
	 * @return void
	 * @author Choi Kyung Min 2016. 10. 26
	 */
	moPage.onValueChanged_DipFrfAltDtRe = function() {
		
		var vsStDt = util.FreeForm.getValue(app, "frfCsrShregAltRe", "ST_DT");
		
		if(!ValueUtil.isNull(vsStDt)) {
			var vsValue = util.FreeForm.getValue(app, "frfCsrShregAltRe", "ALT_DT");
			util.FreeForm.setValue(app, "frfCsrShregAltRe", "ST_DT", vsValue);
			util.Control.redraw(app, "dipFrfStDtEnr");
		}
	};
	
	/**
	 * @desc 학사부서 변경시 이수과정 재조회
	 * @param
	 * @return void
	 * @author Choi Kyung Min 2016. 10. 26
	 */
	moPage.onValueChanged_CbbFrfSaCdEnr = function() {
//		
//		var vsSaCd = ExtFreeForm.getValue("frfCsrShregAltRe", "SA_CD");
//		if ( vsSaCd == "" ) { 
//			//학과부서, 이수과정 필수값 
//			ExtControl.setAttr("cbbFrfSaCdEnr", "udattr", "notNull=no");
//			ExtControl.setAttr("cbbFrfSaCdEnr", "class", "cbbSch");
//			ExtControl.setAttr("lblFrfSaCdEnr", "class", "lblSch");
//			
//			ExtControl.setAttr("cbbFrfSpCdEnr", "udattr", "notNull=no");
//			ExtControl.setAttr("cbbFrfSpCdEnr", "class", "cbbSch");
//			ExtControl.setAttr("lblFrfSpCdEnr", "class", "lblSch");
//		}else{
//			moPage.doGetSpList();
//		}
	};
	

	/**
	 * @desc 교과과정적용학년도 변경시 메시지 출력
	 * @param
	 * @return void
	 * @author Choi Kyung Min 2016. 10. 26
	 */
	moPage.onValueChanged_CbbFrfCurAplyYearRcdEnr = function() {
		/*
		var vsRegChgCurAplyYear = util.FreeForm.getValue(app, "frfCsrEnroll", "cbbFrfCurAplyYearRcdEnr");
		if (!ValueUtil.isNull(vsRegChgCurAplyYear)) {
			util.Msg.alert("NLS-CSR-M026");
		}
		*/
	}

	/**
	 * @desc 재입학신규 저장 버튼 event
	 * @param
	 * @return void
	 * @author Choi Kyung Min 2016. 10. 26
	 */
	moPage.onClick_BtnSave = function() {
		
		
		var vSaCd = util.Control.getValue(app, "cbbFrfSaCdEnr");
		if (vSaCd != null && vSaCd != ""  ) { 
				util.Control.setUserAttr(app, "cbbFrfSaCdEnr", "require", "Y");
				ExtControl.setAttr("cbbFrfSaCdEnr", "class", "cbbSchReq");
				ExtControl.setAttr("lblFrfSaCdEnr", "class", "lblSchReq");
				
				util.Control.setUserAttr(app, "cbbFrfSpCdEnr", "require", "Y");
				ExtControl.setAttr("cbbFrfSpCdEnr", "class", "cbbSchReq");
				ExtControl.setAttr("lblFrfSpCdEnr", "class", "lblSchReq");
			}
		
		
		if(!util.validate(app, ["frfCsrShregAltRe"])){
			return false;
		}

		util.DataMap.setValue(app, "dmReqKey", "strPopTarget", "stdCsrPMstAltReEn");
		//strCommand: popupMnu 
		util.Submit.send(app, "subMstAltPopupMnu", function(pbSuccess){
			if (pbSuccess) {
				doSave();
			}
		});
	};
	
	
	moPage.onLoadImportDone_ImpSbpHeader = function() {
		doSbpHeaderOnLoad();
	}
	
	/**
	 * @desc 분반 값변경 event
	 * @param
	 * @return void
	 * @author Choi Kyung Min 2016. 10. 26
	 */
	moPage.onValueChanged_CbbFrfClassRcd = function() {
		moPage.getClassProf();
	};
	
	/**
	 * @desc 분반에 따른 담당교수 조회
	 * @param
	 * @return void
	 * @author Choi Kyung Min 2016. 10. 26
	 */
	moPage.getClassProf = function(){
		var vsClassRcd = util.FreeForm.getValue(app, "frfCsrShregAltRe", "CLASS_RCD");

		util.DataMap.setValue(app, "dmReqKey", "strClassRcd", vsClassRcd);
			
		//strCommand: getClassProf 
		util.Submit.send(app, "subClassProf", function(pbSuccess) {
			if(pbSuccess){
				var vsProfObjNo = util.DataMap.getValue(app, "dmResList", "strProfObjNo");
				var vsProfNm = util.DataMap.getValue(app, "dmResList", "strProfNm");
				
				util.FreeForm.setValue(app, "frfCsrShregAltRe", "PROF_OBJ_NO", vsProfObjNo);
				util.FreeForm.setValue(app, "frfCsrShregAltRe", "PROF_NM", vsProfNm);
				
			} else {
				util.FreeForm.setValue(app, "frfCsrShregAltRe", "PROF_OBJ_NO", "");
				util.FreeForm.setValue(app, "frfCsrShregAltRe", "PROF_NM", "");
			}
		});
	};
	
	/**
	 * @desc 학기포기 정보 재조회
	 * @param
	 * @return void
	 * @author Choi Kyung Min 2016. 10. 26
	 */
	moPage.getGvupInfo = function(){
			
		//strCommand: getGvupInfo 
		util.Submit.send(app, "subGvupInfo", function(pbSuccess) {
			if(pbSuccess){
				util.FreeForm.setValue(app, "frfCsrSmtGiveUp", "PRE_SHYR", util.DataMap.getValue(app, "dmResList", "strPreShyr"));
				util.FreeForm.setValue(app, "frfCsrSmtGiveUp", "CHG_SHYR", util.DataMap.getValue(app, "dmResList", "strChgShyr"));
				util.FreeForm.setValue(app, "frfCsrSmtGiveUp", "GVUP_CNT", util.DataMap.getValue(app, "dmResList", "strGvupCnt"));
				
			} 
		});
	};
	
	
	/**
	 * @desc 학기포기 클릭
	 * @param
	 * @return void
	 * @author Choi Kyung Min 2016. 10. 26
	 */
	moPage.onClick_BtnSaveSmtGiveUp = function() {
		// 서브미션 호출
		//strCommand: maxYearSmt 
		util.Submit.send(app, "subMaxYearSmt", function(pbSuccess){
			if(pbSuccess){
				
				var vsMaxSchYearRcd = util.DataMap.getValue(app, "dmReqKey", "strMaxSchYearRcd");
				var vsMaxSmtRcd = util.DataMap.getValue(app, "dmReqKey", "strMaxSmtRcd");

				if(!ValueUtil.isNull(vsMaxSchYearRcd) && !ValueUtil.isNull(vsMaxSmtRcd)){
					
					// @을(를) 처리하시겠습니까?
					var vsSchYearRcdNm = ExtInstance.getValue("/root/resOnLoad/schYearList/row", "CD_NM" , "child::CD='"+vsMaxSchYearRcd+"'");
					var vsSmtRcdNm = ExtInstance.getValue("/root/resOnLoad/cgdSmtRcdList/row", "CD_NM" , "child::CD='"+ vsMaxSmtRcd + "'");
					
					var vsMsg = vsSchYearRcdNm + " " + vsSmtRcdNm + " " + ExtControl.getTextValue("btnSaveSmtGiveUp");
							
					if(util.Msg.confirm("NLS-CRM-M018", [vsMsg]) ){
						
						//strCommand: giveUp 
						util.Submit.send(app, "subGiveUp", function(pbSuccess){
							if(pbSuccess){
								
								// "처리되었습니다." header 메세지 표시
								util.Msg.notify(app, NLS.INF.M003);
								
								
								moPage.getGvupInfo();
							}
						});

					}else {
						
						return false;
					}
				}else {
					// "학생의 성적이 존재하지 않습니다." 메시지 
					util.Msg.alert("NLS-CGD-EXT007");
					
					return false;
				}
			}
		});
	};
	
	
	
	
	/**
	 * @desc 통폐합이력가져오는 부분변경 
	 * @param 
	 * @param 
	 * @return void
	 * @author Sunyoung park 2017.1.3 
	 */
	moPage.onValueChanged_CbbFrfSaSpCdEnr = function() {
				
		var vsSpCd = util.FreeForm.getValue(app, "frfCsrShregAltRe", "SP_CD");
				
		var vsChgSaCd = ExtInstance.getValue("/root/resList/expSaList/row", "CHG_SA_CD", "child::SP_CD='" + vsSpCd  + "'");
		util.FreeForm.setValue(app, "frfCsrShregAltRe", "SA_CD", vsChgSaCd);
	};
	 
	return moPage;
};
