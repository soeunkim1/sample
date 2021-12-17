//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./stdCsrPMstRegInit.xtm"/>


var stdCsrPMstRegInit = function() {
	var moPage = new Page();
	//임포트용 데이터 통신 오브젝트
	var moPObject = new PObject();
	
	// 조회완료여부
	var mbSearchYn = false;
	
	var maFrfCtl = ["cbbFrfSchYearRcd", "cbbFrfSmtRcd", "cbbFrfEnrollDivRcd",
					"cbbFrfSpDivRcd", "ipbSaNm", "cbbFrfSpCd", "ipbFrfStDt"];
	
	moPObject.moIdsForStdCmnPObjSch = [
		{   // 행정부서
			controlId			:	"btnPopSearch",
			iCd					:	"",
			iNm					:	"ipbSaNm",
			iObjDivRcd			:	["CC009SA"],
			iStartObject    	:   "",
			iOtDivRcd			:	"",
			iOtIsTreeView	:	"",
			iLanDivRcd		:	"",
			iKeyDate			:	"/root/sessionDate/stDt",
			iKeyEndDate		:	"",
			oObjDivRcd		:	"",
			oCd					:	"ipbFrfSaCd",
			oCdNm				:	"ipbSaNm",
			oStDt				:	"",
			oEndDt				:	"",
			oLanDivRcd		:	"",
			func : function() {
				doGetSpCdList();
			}
		}
	];

	/**
	 * @desc onModelConstructDone 이벤트
	 * @param 
	 * @return void
	 * @author	 Choi In Seong 2016. 2. 2.
	 */
	moPage.onModelConstructDone_StdCsrPMstRegInit = function() {
		//리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init("frfCsrEnroll");

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
		var voRegiObj = ExtPopUp.getParentVal("moRegiObj");
		
		// 부모멤버변수에담긴학번받음
		var vsStudId = voRegiObj["studId"];
		var vsStudNo = voRegiObj["studNo"];
		var vsHeaderStud = voRegiObj["headerStud"];
		
		util.DataMap.setValue(app, "dmReqKey", "strStudNo", vsStudNo);
		util.DataMap.setValue(app, "dmReqKey", "strStudInfo", vsHeaderStud);
		
		//학생id 셋팅
		util.DataMap.setValue(app, "dmReqKey", "strStudId", vsStudId);
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess) {
			if (pbSuccess) {
				
				util.Control.redraw(app, ["frfCsrEnroll"]);
				
				var vnRowCnt = util.DataSet.getRowCount(app, "dsRptCsrEnroll");
				
				if (vnRowCnt != 0) {
					doSubInsertRow();
				}
				
				// 학생의 학번정보를 화면에 입력
				util.Control.setValue(app, "optStudNo", vsStudNo);
				util.Control.setValue(app, "optStud", vsHeaderStud);
				
				// 신규임으로 ENROLL_STAT = CT109ENRO(등록)으로 설정
				util.FreeForm.setValue(app, "frfCsrEnroll", "REG_STAT_RCD", "CT109ENRO");
				
				//학년도 학기 시작일 종료일 초기값 설정
				var vsYear  = util.DataMap.getValue(app, "dmSessionDate", "year");
				var vsSmt   = util.DataMap.getValue(app, "dmSessionDate", "smt");
				var vsStDt = util.DataMap.getValue(app, "dmSessionDate", "stDt");
				
				//현재일자를 가져와서 처리일자에 기본세팅한다. (2011.08.22 JJH 추가)
				var vsProcDt = util.DataMap.getValue(app, "dmResOnLoad", "strProcDt");
				
				util.FreeForm.setValue(app, "frfCsrEnroll", "SCH_YEAR_RCD", vsYear);
				util.FreeForm.setValue(app, "frfCsrEnroll", "SMT_RCD", vsSmt);
				util.FreeForm.setValue(app, "frfCsrEnroll", "ST_DT", vsStDt);
				util.FreeForm.setValue(app, "frfCsrEnroll", "END_DT", "99991231000000");
				util.FreeForm.setValue(app, "frfCsrEnroll", "PROC_DT", moPage.addZoreDate(vsProcDt));
				util.FreeForm.setValue(app, "frfCsrEnroll", "ENROLL_DT", moPage.addZoreDate(vsProcDt)); // 학적등록일자 추가 (2016.11.28 )
				util.FreeForm.setValue(app, "frfCsrEnroll", "CUR_APLY_YEAR_RCD", vsYear);
				mbSearchYn = true;
			} else {
				//2013.12.16. onLoad실패시 팝업닫기
//				moPage.onClick_btnClose();
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
		util.FreeForm.setValue(app, "frfCsrEnroll",AppConstants.CUD_COL_REF, "N");
		//프리폼 신규
		util.FreeForm.insertRow(app, "frfCsrEnroll");
		//학생 ObjectId 셋팅
		var vsStudId = util.DataMap.getValue(app, "dmReqKey", "strStudId");
		util.FreeForm.setValue(app, "frfCsrEnroll", "STUD_ID", vsStudId);
		//신규입력이 Ok
		util.Control.setEnable(app, true, ["frfCsrEnroll"]);
	};
	
	/**
	 * @desc 학년도 학기 변경
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 2. 2
	 */
	moPage.getDateFromSession = function() {

		var vsEnrollDiv	= util.FreeForm.getValue(app, "frfCsrEnroll", "ENROLL_DIV_RCD");
		var vsYear			= util.FreeForm.getValue(app, "frfCsrEnroll", "SCH_YEAR_RCD");
		// 학년도, 학기의 기준일자(시작일)에 영향을 받는 사용자 input 필드는 초기화
		util.FreeForm.setValue(app, "frfCsrEnroll", "SA_CD_NM", "");
		util.FreeForm.setValue(app, "frfCsrEnroll", "SA_CD", "", false);
		util.FreeForm.setValue(app, "frfCsrEnroll", "SP_CD", "", false);
		doSetSpCdList();
		util.FreeForm.setValue(app, "frfCsrEnroll", "OG_CD_NM", "");
		util.FreeForm.setValue(app, "frfCsrEnroll", "OG_CD", "");
		
		// 학년도, 학기 변동에 따른 학사력 기준일자 가져오기
		var vsSmt = util.FreeForm.getValue(app, "frfCsrEnroll", "SMT_RCD");
		
		if (ValueUtil.isNull(vsYear)||ValueUtil.isNull(vsSmt)) return;
		
		util.DataMap.setValue(app, "dmSessionDate", "year", vsYear);
		util.DataMap.setValue(app, "dmSessionDate", "smt", vsSmt);
		util.DataMap.setValue(app, "dmSessionDate", "stDt", "");
		util.DataMap.setValue(app, "dmSessionDate", "endDt", "");
		
		//strCommand: getDateFromSession 
		util.Submit.send(app, "subDateFromSession", function(pbSuccess) {
			if (pbSuccess) {
				var vsStDt = util.DataMap.getValue(app, "dmSessionDate", "stDt");
				
				if (ValueUtil.isNull(vsStDt)) {
					//시작일자  값이 없으면, reset
					util.FreeForm.setValue(app, "frfCsrEnroll", "SCH_YEAR_RCD", "", false);
					util.FreeForm.setValue(app, "frfCsrEnroll", "SMT_RCD", "", false);
					util.FreeForm.setValue(app, "frfCsrEnroll", "ST_DT", "");
					util.FreeForm.setValue(app, "frfCsrEnroll", "END_DT", "");
					
					if(vsEnrollDiv == "CT103MAIN"){//주과정일 경우
						util.FreeForm.setValue(app, "frfCsrEnroll", "CUR_APLY_YEAR_RCD", "", false);
					}
				} else {
					util.FreeForm.setValue(app, "frfCsrEnroll", "ST_DT", vsStDt);
					util.FreeForm.setValue(app, "frfCsrEnroll", "END_DT", "99991231000000");
					if(vsEnrollDiv == "CT103MAIN"){//주과정일 경우
						util.FreeForm.setValue(app, "frfCsrEnroll", "CUR_APLY_YEAR_RCD", vsYear, false);
					}
				}
			} else {
				util.FreeForm.setValue(app, "frfCsrEnroll", "SCH_YEAR_RCD", "", false);
				util.FreeForm.setValue(app, "frfCsrEnroll", "SMT_RCD", "", false);
				util.FreeForm.setValue(app, "frfCsrEnroll", "ST_DT", "");
				util.FreeForm.setValue(app, "frfCsrEnroll", "END_DT", "");
				
				if(vsEnrollDiv == "CT103MAIN"){//주과정일 경우
					util.FreeForm.setValue(app, "frfCsrEnroll", "CUR_APLY_YEAR_RCD", "", false);
				}
			}
		});
	};
	
	/**
	 * @desc 이수과정구분으로 이수과정 필터링
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 2. 2.
	 */
	function doGetSpCdList() {

		util.FreeForm.setValue(app, "frfCsrEnroll", "SP_CD", "", false);
		
		// subMission 하기 전에 ogtCdNm와 ogtCd 초기화
		util.DataMap.setValue(app, "dmResOnLoad", "ogCdNm", "");
		util.DataMap.setValue(app, "dmResOnLoad", "ogCd", "");
		
		//기준일자 /SACD
		var vsKeyDate = util.FreeForm.getValue(app, "frfCsrEnroll", "ST_DT");
		var vsSaCd = util.FreeForm.getValue(app, "frfCsrEnroll", "SA_CD");
		
		util.DataMap.setValue(app, "dmReqSelCourse", "strKeyDate", vsKeyDate);
		util.DataMap.setValue(app, "dmReqSelCourse", "strSaCd", vsSaCd);
		
		//strCommand: selCourse 
		util.Submit.send(app, "subSelCourse", function(pbSuccess) {
			if (pbSuccess) {
				
				util.Control.redraw(app, ["cbbFrfSpCd"]);
				
				// 학사부서 선택시 상위 행정부서를 가져옴
				var vsOgtCdNm = util.DataMap.getValue(app, "dmResOnLoad", "ogCdNm");
				var vsOgtCd = util.DataMap.getValue(app, "dmResOnLoad", "ogCd");
				if (vsOgtCdNm == null) {
					vsOgtCdNm = "";
				}
				if (vsOgtCd == null) {
					vsOgtCd = "";
				}
				util.FreeForm.setValue(app, "frfCsrEnroll", "OG_CD_NM", vsOgtCdNm);
				util.FreeForm.setValue(app, "frfCsrEnroll", "OG_CD", vsOgtCd);
				
				//이수과정구분 세팅
				doSetSpCdList();
			}
		});
	};
	
	/**
	 * @desc 이수과정 필터링
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 2. 2.
	 */
	function doSetSpCdList() {
		ExtSelectCtl.cascadeList("cbbFrfSpDivRcd", "cbbFrfSpCd", "SP_DIV_RCD");
	};
	
	/**
	 * @desc 학적상태를 체크하는 로직추가. (여러세션창을 오픈하여 작업하는 경우, 체크logic )
	 * @param poCallBackFunc 콜백함수
	 * @return void
	 * @author Choi In Seong 2016. 2. 2.
	 */
	function doCheckNewRegi(poCallBackFunc) {
		//등록신규시, 최종학적상태확인
		//strCommand: status 
		util.Submit.send(app, "subStatus", function(pbSuccess) {
			if (pbSuccess) {
				var vsStatRcd = util.DataMap.getValue(app, "dmResStatus", "statRcd");
				//학적상태가 없거나, 재학, 휴학 인 경우만 신규등록 가능
				
				if (ValueUtil.isNull(vsStatRcd) || vsStatRcd == "CT301ATTE" || vsStatRcd == "CT301ABSE") {
					
					if(util.isFunc(poCallBackFunc)) poCallBackFunc(true);
					
				} else {
					//그외는 error 메시지 
					var vsStatNm = util.DataMap.getValue(app, "dmResStatus", "statNm");
					util.Msg.alert("NLS-CSR-M022", [vsStatNm, NLS.CSR.M050]);
					
					if(util.isFunc(poCallBackFunc)) poCallBackFunc(false);
				}
				
			}
		});
	};
	
	/**
	 * @desc 학적등록 저장 버튼 event
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 2. 2.
	 */
	moPage.onClick_BtnSave = function() {
		// 리피터 변경사항 체크
		if(!util.Grid.isModified(app, ["frfCsrEnroll"], "MSG")){
			return false;
		}
		//리피트 validation check
		if(!util.validate(app, maFrfCtl)){
			return false;
		}
		
		// 주과정등록의 경우 학적등록사유를 반드시 입력해야함
		if (util.FreeForm.getValue(app, "frfCsrEnroll", "ENROLL_DIV_RCD") == "CT103MAIN") {
			if (!util.validate(app, ["cbbFrfEnrollRsnRcd"])) return false;
		}
		
		/**
		 * 학적상태를 체크하는 로직추가. (여러세션창을 오픈하여 작업하는 경우, 체크logic ) 2012.8.16
		 * 2013.12.10. 학적상태 확인 후, 가능한 경우 저장로직 수행하도록 함.
		 */
		doCheckNewRegi(function (pbPossibleNewRegi) {
			if(pbPossibleNewRegi) {
				doSave();
			}
		});
	};
	
	/**
	 * @desc 학적등록 저장
	 * @param pnStep 저장 차수
	 * @return boolean
	 * @author Choi In Seong 2016. 2. 2.
	 */
	function doSave(pnStep) {
		if (!pnStep) {
			pnStep = "0";
		}
		
		util.DataMap.setValue(app, "dmInteractiveMsg", "intStep", pnStep);
		
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
			}
		});
	};
	
	/**
	 * @desc 학적등록구분 변경
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 2. 2.
	 */
	moPage.onValueChanged_CbbFrfEnrollDivRcd = function() {
		
		// 이수과정구분 콘트롤을 초기화 한다. (2011.12.01 정정호 수정)
		util.FreeForm.setValue(app, "frfCsrEnroll", "SP_DIV_RCD", "", false);
		
		// 학적등록구분 주과정이 아니면  학적등록사유와 교과과정 적용년도 비활성 
		var vsEnrollDiv = util.FreeForm.getValue(app, "frfCsrEnroll", "ENROLL_DIV_RCD");
		if (vsEnrollDiv == "CT103MAIN") {
			//교과과정 적용년도 세팅 
			var vsInitYear = util.FreeForm.getValue(app, "frfCsrEnroll", "SCH_YEAR_RCD");
			util.FreeForm.setValue(app, "frfCsrEnroll", "CUR_APLY_YEAR_RCD", vsInitYear, false);
			
			util.Control.setEnable(app, true, ["cbbFrfCurAplyYearRcd"]);
			
			// 학적등록사유 값 설정
			var vsEnrollReason = util.DataMap.getValue(app, "dmResOnLoad", "enrollRcd");
			if (!ValueUtil.isNull(vsEnrollReason)) {
				//등록사유가 있을경우 세팅 + edit불가
				util.FreeForm.setValue(app, "frfCsrEnroll", "ENROLL_RSN_RCD", vsEnrollReason);
				util.Control.setEnable(app, false, ["cbbFrfEnrollRsnRcd"]);
			} else {
				util.Control.setEnable(app, true, ["cbbFrfEnrollRsnRcd"]);
			}
			
		} else {
			util.FreeForm.setValue(app, "frfCsrEnroll", "CUR_APLY_YEAR_RCD", "", false);
			util.FreeForm.setValue(app, "frfCsrEnroll", "ENROLL_RSN_RCD", "");
			util.Control.setEnable(app, false, ["cbbFrfCurAplyYearRcd", "cbbFrfEnrollRsnRcd"]);
		}
		
		//학적이수과정구분 거르기 
		ExtSelectCtl.cascadeList("cbbFrfEnrollDivRcd", "cbbFrfSpDivRcd", "CD_PRP1", 0);
		
		util.FreeForm.setValue(app, "frfCsrEnroll", "SP_CD", "", false);
		doGetSpCdList();
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
	 * @desc 객체팝업 호출
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 2. 2.
	 */
	moPage.onClick_BtnPopSearch = function(sender) {
		var vsKeyDate = util.DataMap.getValue(app, "dmSessionDate", "stDt");
		
		if (ValueUtil.isNull(vsKeyDate)) {
			//학년도, 학기를 선택하세요.
			util.Msg.alert("NLS-INF-M028");
			return;
		}
		
		doOnClickStdCmnPObjSch(sender);
	}
	
	/**
	 * @desc 객체검색
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 2. 2.
	 */
	moPage.onValueChanged_IpbSaNm = function(sender) {
		var vsKeyDate = util.DataMap.getValue(app, "dmSessionDate", "stDt");
		
		if (ValueUtil.isNull(vsKeyDate)) {
			//학년도, 학기를 선택하세요.
			util.Msg.alert("NLS-INF-M028");
			return;
		}
		
		doOnChangeStdCmnPObjSch(sender);
	}
	
	/**
	 * @desc 학년도, 학기 변경 시 기준일자 셋팅
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 2. 2.
	 */
	moPage.onValueChanged_CbbFrfSchYearRcd = function() {
		//조회 완료 여부
		if(!mbSearchYn) return;
		moPage.getDateFromSession();
	};
	
	/**
	 * @desc 학년도, 학기 변경 시 기준일자 셋팅
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 2. 2.
	 */	
	moPage.onValueChanged_CbbFrfSmtRcd = function() {
		//조회 완료 여부
		if(!mbSearchYn) return;
		moPage.getDateFromSession();
	};
	
		/**
	 * @desc 이수과정구분 변경시 이수과정콤보 필터
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 2. 2.
	 */
	moPage.onValueChanged_CbbFrfSpDivRcd = function() {
		util.FreeForm.setValue(app, "frfCsrEnroll", "SP_CD", "", false);
		doGetSpCdList();
	};
	
	/**
	 * @desc 이수과정 변경시 학사코드, 이수과정구분코드 체크
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 2. 2.
	 */
	moPage.onValueChanged_CbbFrfSpCd = function() {
		
		// 이수과정 
		//학사부서에 선택된 부서에 대한 이수과정 에 이수과정구분으로 필터링
		//학사부서 입력여부 확인
		var vsCtlValue = util.FreeForm.getValue(app, "frfCsrEnroll", "SA_CD");
		var vsCtlTitle = ExtControl.getTextValue("lblSaNm");
		
		if (ValueUtil.isNull(vsCtlValue)) {
			util.Msg.alert("NLS-CSR-M021", [vsCtlTitle]);
			return;
		}
		//이수과정 구분과 학사부서 입력여부 확인
		vsCtlValue = util.FreeForm.getValue(app, "frfCsrEnroll", "SP_DIV_RCD");
		vsCtlTitle =  ExtControl.getTextValue("lblFrfSpDivRcd");
		
		if (ValueUtil.isNull(vsCtlValue)) {
			util.Msg.alert("NLS-CSR-M021", [vsCtlTitle]);
			return;
		}
	};
	
	/**
	 * @desc 교과과정적용학년도 변경시 체크
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 2. 2.
	 */
	moPage.onValueChanged_CbbFrfCurAplyYearRcd = function() {
		// 조회 완료 여부
		if(!mbSearchYn) return;
		var vsCurAplyYear = util.Control.getValue(app, "cbbFrfCurAplyYearRcd");
		if (!ValueUtil.isNull(vsCurAplyYear)) {
			util.Msg.alert("NLS-CSR-M026");
		}
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

	return moPage;
};
