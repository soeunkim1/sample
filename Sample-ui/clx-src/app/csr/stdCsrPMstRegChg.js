//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./stdCsrPMstRegChg.xtm"/>


var stdCsrPMstRegChg = function() {
	var moPage = new Page();
	//임포트용 데이터 통신 오브젝트
	var moPObject = new PObject();
	
	/********************************
	 * 사용자 정의 메소드, 변수
	 *******************************/
	var msStudNo = null; // STUD_ID -> STUD_NO로 변경되면서 추가된 부분 (정정호 2011.08.05)
	var msHeaderStud = null;
	
	// 조회완료여부
	var mbSearchYn = false;
	
	var maCheckInsVal = ["cbbFrfSchYearRcd", "cbbFrfSmtRcd", "cbbFrfEnrollRsnRcd",
					"ipbSaNm", "cbbFrfSpCd", "ipbFrfStDt","ipbFrfEnrollDt"];
					
	var maCheckInsValExtr = ["cbbFrfSchYearRcd", "cbbFrfSmtRcd",
					"ipbSaNm", "cbbFrfSpCd", "ipbFrfStDt","ipbFrfEnrollDt"];
	
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
			iKeyDate			:	"ipbFrfStDt",
			iKeyEndDate		:	"",
			oObjDivRcd		:	"",
			oCd					:	"ipbFrfSaCd",
			oCdNm				:	"ipbSaNm",
			oStDt					:	"",
			oEndDt				:	"",
			oLanDivRcd		:	"/root/reqKey/strLanDivRcd",
			func : function() {
				doGetSpCdList();
			}
		}
	];

	/**
	 * @desc 이수과정구분, 학사코드로 이수과정 필터링
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 2. 3.
	 */
	function doGetSpCdList() {
		
		// 이수과정 초기화
		util.FreeForm.setValue(app, "frfCsrEnrollChg", "SP_CD", "", false);
			
		var vsSaCd = util.FreeForm.getValue(app, "frfCsrEnrollChg", "SA_CD");
		// 전과 이면서 학사부서가 같으면 초기화 후 작업중단
		if(!doEnlRsnChk()){
			return;
		}
		
		if (ValueUtil.isNull(vsSaCd)) return;

		//기준일자 /SACD
		var vsKeyDate = util.FreeForm.getValue(app, "frfCsrEnrollChg", "ST_DT");
		var vsSpDivRcd = util.FreeForm.getValue(app, "frfCsrEnrollChg", "SP_DIV_RCD");
		
		util.DataMap.setValue(app, "dmReqKey", "strKeyDate", vsKeyDate);
		util.DataMap.setValue(app, "dmReqKey", "strSaCd", vsSaCd);
		util.DataMap.setValue(app, "dmReqKey", "strObjCd", vsSaCd);
		util.DataMap.setValue(app, "dmReqKey", "strSpDivRcd", vsSpDivRcd);
		
		//strCommand: selCourse 
		util.Submit.send(app, "subSelCourse", function(pbSuccess) {
			if (pbSuccess) {
				
				util.Control.redraw(app, ["cbbFrfSpCd"]);
				
				// 학사부서 선택시 상위 행정부서를 가져옴
				var vsOgtCdNm = util.DataMap.getValue(app, "dmResOnLoad", "strOgNm");
				var vsOgtCd = util.DataMap.getValue(app, "dmResOnLoad", "strOgCd");
				if (vsOgtCdNm == null) {
					vsOgtCdNm = "";
				}
				if (vsOgtCd == null) {
					vsOgtCd = "";
				}
				util.FreeForm.setValue(app, "frfCsrEnrollChg", "OG_NM", vsOgtCdNm);
				util.FreeForm.setValue(app, "frfCsrEnrollChg", "OG_CD", vsOgtCd);
				util.SelectCtl.selectItem(app, "cbbFrfSpCd", 0);
			}
		});
	};
	
	/**
	 * @desc onModelConstructDone 이벤트
	 * @param 
	 * @return void
	 * @author	 Choi In Seong 2016. 2. 2.
	 */
	moPage.onModelConstructDone_StdCsrPMstRegChg = function() {
		//리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["frfCsrEnroll", "frfCsrEnrollChg"]);

		//화면 온로드 서브미션 호출
		doOnLoad();
	};
	
	/**
	 * @desc 화면 온로드
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 01. 12.
	 */
	function doOnLoad() {
		var voRegiObj = ExtPopUp.getParentVal("moRegiObj");
		
		util.DataMap.setValue(app, "dmReqKey", "strUnitSystem", "CSR");
		
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess) {
			if (pbSuccess) {
				
				util.Control.redraw(app, ["frfCsrEnroll", "frfCsrEnrollChg"]);
				// 부모창에서 값을 기본 정보 셋팅
				util.DataMap.setValue(app, "dmKeyColumn", "strStudId", 			voRegiObj["studId"]);
				util.DataMap.setValue(app, "dmKeyColumn", "strEnrollDivRcd",	voRegiObj["enrollDivRcd"]);
				util.DataMap.setValue(app, "dmKeyColumn", "strSchYearRcd",	voRegiObj["schYearRcd"]);
				util.DataMap.setValue(app, "dmKeyColumn", "strProcDt",			voRegiObj["procDt"]);
				util.DataMap.setValue(app, "dmKeyColumn", "strSaCd",			voRegiObj["saCd"]);
				util.DataMap.setValue(app, "dmKeyColumn", "strSpDivRcd",		voRegiObj["spDivRcd"]);
				util.DataMap.setValue(app, "dmKeyColumn", "strSmtRcd",			voRegiObj["smtRcd"]);
				util.DataMap.setValue(app, "dmKeyColumn", "strSpCd",			voRegiObj["spCd"]);
				util.DataMap.setValue(app, "dmKeyColumn", "strRegStatRcd",	voRegiObj["regStatRcd"]);
				
				// 학생의 학번정보를 화면에 입력
				util.Control.setValue(app, "optStudNo",	voRegiObj["studNo"]);
				util.Control.setValue(app, "optStud", 	voRegiObj["headerStud"]);

				// 키정보를 이용하여 해당 데이터 추출
				doList();
			} else {
				// 실패시 팝업 닫기
				ExtModel.dispatch("btnCloseCancel", "DOMActivate");
			}
		});
	}

	/**
	 * @desc 학적등록정보 조회
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 01. 12.
	 */
	function doList() {
		
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess) {
			if(pbSuccess){
				util.Control.redraw(app, ["frfCsrEnroll", "frfCsrEnrollChg"]);
				
				var vsEnrollStat = util.FreeForm.getValue(app, "frfCsrEnroll", "REG_STAT_RCD");
				
				// 등록상태가 아니면 변경불가 불가
				if (vsEnrollStat != "CT109ENRO") {
					var vsEnrollStatNm = NLS.CSR.M114; //등록
					var vsRegiChg = NLS.CSR.M051; //변경
					util.Msg.alert("NLS-CSR-M002", [vsEnrollStatNm, vsRegiChg]);
					ExtPopUp.closeLayeredPopup("onClick_BtnSearch");
				}
				
				//변경후 등록정보 프리폼에 새로운 row를 보이도록 함
				doSetNewRow();
				
				//데이터 조회 후 - 변경전 등록정보, 변경후 등록정보 데이터 setting
				doSetBefCtlsVal();
				doSetAftCtlsVal();
				util.Control.setEnable(app, false, ["ipbFrfStDt"]);
			} else {
				// 실패시 팝업 닫기
				ExtModel.dispatch("btnCloseCancel", "DOMActivate");
			}
		});
	};
	
	/**
	 * @desc 변경 후 학적등록정보 프리폼 신규 
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 2. 3.
	 */
	function doSetNewRow() {
		util.FreeForm.setValue(app, "frfCsrEnrollChg",AppConstants.CUD_COL_REF, "N");
		//vcRpt.setCellVal(vnInsRowIdx, AppConstants.CUD_COL_REF, "N", true, true);
		//프리폼 신규
		util.FreeForm.insertRow(app, "frfCsrEnrollChg");
		//학생 ObjectId 셋팅
		var vsStudId = util.DataMap.getValue(app, "dmKeyColumn", "strStudId");
		util.FreeForm.setValue(app, "frfCsrEnrollChg", "STUD_ID", vsStudId);
		//신규입력이 Ok
		util.Control.setEnable(app, true, ["frfCsrEnrollChg"]);
	};
	
	/**
	 * @desc 변경 전 학적등록정보 값 셋팅
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 2. 3.
	 */
	function doSetBefCtlsVal() {
		var strProcDt = util.DataMap.getValue(app, "dmResOnLoad", "strProcDt");
		
		util.FreeForm.setValue(app, "frfCsrEnroll", "REG_STAT_NM", NLS.NSCR.CANCEL);
		util.FreeForm.setValue(app, "frfCsrEnroll", "ENROLL_CANCEL_RSN_RCD", "CT107CHGC");
		util.FreeForm.setValue(app, "frfCsrEnroll", "ENROLL_CANCEL_RSN_NM", NLS.NSCR.CHGCANCL);
		util.FreeForm.setValue(app, "frfCsrEnroll", "CANCEL_DT", strProcDt);
		
		var vdBefEndDt = util.DataMap.getValue(app, "dmCalendarList", "BEF_DT");
		
		util.FreeForm.setValue(app, "frfCsrEnroll", "END_DT", vdBefEndDt);
	};
	
	/**
	 * @desc 변경 후 학적등록정보 값 셋팅
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 2. 3.
	 */
	function doSetAftCtlsVal() {
		
		//학년도, 학기, 학적등록구분, 전공
		//loading시 추출된 시스템 학년도 학기로 세팅
		var vsAftYear = util.DataMap.getValue(app, "dmCalendarList", "YEAR");
		var vsAftSmt = util.DataMap.getValue(app, "dmCalendarList", "SMT");
		util.FreeForm.setValue(app, "frfCsrEnrollChg", "SCH_YEAR_RCD", vsAftYear, false);
		util.FreeForm.setValue(app, "frfCsrEnrollChg", "SMT_RCD", vsAftSmt);
		
		//학적등록구분, 이수과정구분 세팅
		var vsAftEnrolDivRcdNm = util.FreeForm.getValue(app, "frfCsrEnroll", "ENROLL_DIV_NM");
		var vsAftSpDivNm = util.FreeForm.getValue(app, "frfCsrEnroll", "SP_DIV_NM");
		util.FreeForm.setValue(app, "frfCsrEnrollChg", "ENROLL_DIV_NM", vsAftEnrolDivRcdNm);
		util.FreeForm.setValue(app, "frfCsrEnrollChg", "SP_DIV_NM", vsAftSpDivNm);
		
		//학사부서, 이수과정, 학적등록사유 초기화
		util.FreeForm.setValue(app, "frfCsrEnrollChg", "SA_NM", "", false);
		util.FreeForm.setValue(app, "frfCsrEnrollChg", "SA_CD", "", false);
		util.FreeForm.setValue(app, "frfCsrEnrollChg", "SP_CD", "", false);
		util.FreeForm.setValue(app, "frfCsrEnrollChg", "ENROLL_RSN_RCD", "");
		
		//주과정등록/주전공인 경우 변경전학적등록정보의 교과과정적용년도를 세팅, 수정가능하도록 처리
		var vsBefEnrollDiv = util.FreeForm.getValue(app, "frfCsrEnroll", "ENROLL_DIV_RCD");
		var vsBefPgmDiv = util.FreeForm.getValue(app, "frfCsrEnroll", "SP_DIV_RCD");
		
		//교과과정 적용년도 
		var vsBefCuriYearAply = util.FreeForm.getValue(app, "frfCsrEnroll", "CUR_APLY_YEAR_RCD");
		util.FreeForm.setValue(app, "frfCsrEnrollChg", "CUR_APLY_YEAR_RCD", vsBefCuriYearAply, false);
		
		//주과정등록, 주전공 일시 교과과정 적용학년도 활성화
		if (vsBefEnrollDiv == "CT103MAIN" && vsBefPgmDiv == "CA10701") {
			util.Control.setEnable(app, true, ["cbbFrfEnrollRsnRcd", "cbbFrfCurAplyYearRcd"]);
		} else {
			util.Control.setEnable(app, false, ["cbbFrfEnrollRsnRcd", "cbbFrfCurAplyYearRcd"]);
		}
		
		util.FreeForm.setValue(app, "frfCsrEnrollChg", "ENROLL_DIV_RCD", vsBefEnrollDiv);
		util.FreeForm.setValue(app, "frfCsrEnrollChg", "SP_DIV_RCD", vsBefPgmDiv);
		
		//변경전 참조키를 상위참조키로
		var vsRefKey = util.FreeForm.getValue(app, "frfCsrEnroll", "REF_KEY");
		util.FreeForm.setValue(app, "frfCsrEnrollChg", "UREF_KEY", vsRefKey); 
		util.FreeForm.setValue(app, "frfCsrEnrollChg", "REG_STAT_RCD", "CT109ENRO");//등록상태로
		
		//추가정보
		var vdAddInfoStarDt = util.DataMap.getValue(app, "dmCalendarList", "BEG_DT");
		
		util.FreeForm.setValue(app, "frfCsrEnrollChg", "ST_DT", vdAddInfoStarDt);
		util.FreeForm.setValue(app, "frfCsrEnrollChg", "END_DT", "99991231000000");
		
		//이전 등록정보에 행정부서가 있다면 임의로 세팅, 수정가능 
		var vsOgNm = util.FreeForm.getValue(app, "frfCsrEnroll", "OG_NM");
		util.FreeForm.setValue(app, "frfCsrEnrollChg", "OG_NM", vsOgNm);
				
		// 처리일자에 기본세팅할 현재일자를  가져온다. (2011.08.22 JJH 추가)
		var strProcDt = util.DataMap.getValue(app, "dmResOnLoad", "strProcDt");
		util.FreeForm.setValue(app, "frfCsrEnrollChg", "ENROLL_DT", strProcDt);
	};
	
	/**
	 * @desc 학년도 학기 값변경에 따른 시작일,종료일 가져오기
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 2. 3.
	 */	
	function doSetDate() {
		var vsYear = util.FreeForm.getValue(app, "frfCsrEnrollChg", "SCH_YEAR_RCD");
		var vsSmt = util.FreeForm.getValue(app, "frfCsrEnrollChg", "SMT_RCD");
		
		doGetDate(vsYear, vsSmt);
	};
	
	/**
	 * @desc 입력받은 학년도학기에 대해 시작일 종료일 세팅
	 * @param {?} psYear 학년도
	 * @param {?} psSmt 학기
	 * @return void
	 * @author Choi In Seong 2016. 2. 3.
	 */	
	function doGetDate(psYear, psSmt) {
		
		if (ValueUtil.isNull(psYear) && ValueUtil.isNull(psSmt)) {
			//입력필드초기화
			doClearDt();
			doInitEndDt();
			return;
		} else if (ValueUtil.isNull(psYear) || ValueUtil.isNull(psSmt)) {
			//학년도, 학기 둘중 하나의 값이라도 없으면 
			return;
		}
		
		util.DataMap.setValue(app, "dmReqKey", "strUnitSystem", "CSR");
		util.DataMap.setValue(app, "dmReqKey", "strSchYearRcd", psYear);
		util.DataMap.setValue(app, "dmReqKey", "strSmtRcd", psSmt);
		
		// 학사, 이수과정, 행정부서 초기화
		util.FreeForm.setValue(app, "frfCsrEnrollChg", "SA_NM", "");
		util.FreeForm.setValue(app, "frfCsrEnrollChg", "SA_CD", "", false);
		util.FreeForm.setValue(app, "frfCsrEnrollChg", "SP_CD", "", false);
		util.FreeForm.setValue(app, "frfCsrEnrollChg", "OG_NM", "");
		util.FreeForm.setValue(app, "frfCsrEnrollChg", "OG_CD", "");
		
		//strCommand: selCal 
		util.Submit.send(app, "subSelCal", function (pbSuccess) {
			if (pbSuccess) {
				var vsAddStDt = util.DataMap.getValue(app, "dmCalendarList", "ST_DT");
				var vsAddEndDt = util.DataMap.getValue(app, "dmCalendarList", "END_DT");
				var vsBefEndDt = util.DataMap.getValue(app, "dmCalendarList", "BEF_DT");
				
				//선택한 학년도 학기가 이전데이터보다 이후인지 CHECK 
				var vsBefStDt = util.FreeForm.getValue(app, "frfCsrEnroll", "ST_DT");
				if (vsAddStDt >= vsBefStDt) {
					
					//크면 시작일, 종료일값 넣어줌. 이전등록값 종료일 넣어줌 
					util.FreeForm.setValue(app, "frfCsrEnrollChg", "ST_DT", vsAddStDt);
					util.FreeForm.setValue(app, "frfCsrEnrollChg", "END_DT", "99991231000000");
					util.FreeForm.setValue(app, "frfCsrEnroll", "END_DT", vsBefEndDt);
					
				} else {
					//선택한 학년도 학기가 이전데이터보다 이전이면 메시지 뿌려줌
					var vsBefYear = util.FreeForm.getValue(app, "frfCsrEnroll", "SCH_YEAR_NM");
					var vsBefSmt = util.FreeForm.getValue(app, "frfCsrEnroll", "SMT_NM");
					//입력필드 초기화 
					doClearDt();
					doInitEndDt();
					util.Msg.alert("NLS-CSR-M020", [vsBefYear, vsBefSmt]);
				}
			} else {
				//입력필드 초기화
				doClearDt();
				doInitEndDt();
			}
		});
	};
	
	/**
	 * @desc 학년도 학기가 없을 시 날짜 초기화
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 2. 3
	 */
	function doClearDt() {
		util.FreeForm.setValue(app, "frfCsrEnrollChg", "SCH_YEAR_RCD", "", false);
		util.FreeForm.setValue(app, "frfCsrEnrollChg", "SMT_RCD", "", false);
		util.FreeForm.setValue(app, "frfCsrEnrollChg", "ST_DT", "", false);
		util.FreeForm.setValue(app, "frfCsrEnrollChg", "END_DT", "", false);
	};
	
	/**
	 * @desc 이전 등록정보 종료일 9999.12.31로 초기화
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 2. 3
	 */
	function doInitEndDt() {
		util.FreeForm.setValue(app, "frfCsrEnroll", "END_DT", "99991231000000");
	};
	
	/**
	 * @desc 학년도, 학기 변경 시 기준일자 셋팅
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 2. 2.
	 */
	moPage.onValueChanged_CbbFrfSchYearRcd = function() {
		doSetDate();
	};
	
	/**
	 * @desc 학년도, 학기 변경 시 기준일자 셋팅
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 2. 2.
	 */	
	moPage.onValueChanged_CbbFrfSmtRcd = function() {
		doSetDate();
	};
	
	/**
	 * @desc 학적등록 저장 버튼 event
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 2. 2.
	 */
	moPage.onClick_BtnSave = function() {		
		// 리피터 변경사항 체크
		if(!util.Grid.isModified(app, ["frfCsrEnrollChg"], "MSG")){
			return false;
		}
		
		// 주과정등록의 경우 학적등록사유를 반드시 입력해야함
		if (util.FreeForm.getValue(app, "frfCsrEnrollChg", "ENROLL_DIV_RCD") == "CT103EXTR") {
			if(!util.validate(app, maCheckInsValExtr)) return;
		} else {
			if(!util.validate(app, maCheckInsVal)) return;
		}
		// save call
		doSave();
	};
	
	/**
	 * @desc저장 SF에서 오류 메시지가 있으면 확인창 띄움
	 * @param {?} pnStep
	 * @return Boolean
	 * @author Choi In Seong 2016. 2. 3.
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
					//팝업창 닫기
					ExtPopUp.closeLayeredPopup("doPopCallList");
					return true;
				}
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
	 * @desc 객체팝업 호출
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 2. 2.
	 */
	moPage.onClick_BtnPopSearch = function(sender) {

		var vsKeyDate = util.DataMap.getValue(app, "dmCalendarList", "ST_DT");
		
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
		var vsKeyDate = util.DataMap.getValue(app, "dmCalendarList", "ST_DT");
		
		if (ValueUtil.isNull(vsKeyDate)) {
			//학년도, 학기를 선택하세요.
			util.Msg.alert("NLS-INF-M028");
			return;
		}
		
		doOnChangeStdCmnPObjSch(sender);
	}
	
	/**
	 * @desc 이수과정 변경 시 학사코드 체크
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 2. 2.
	 */
	moPage.onValueChanged_CbbFrfSpCd = function() {
		// 이수과정
		//학사부서 입력여부 확인
		var vsCtlValue = util.FreeForm.getValue(app, "frfCsrEnroll", "SA_CD");
		var vsCtlTitle = ExtControl.getTextValue("lblSaNm");
		
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

	/**
	 * @desc 전과이면서 학과가 같으면 작업중단
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 9. 12.
	 */
	moPage.onValueChanged_CbbFrfEnrollRsnRcd = function() {
		doEnlRsnChk();
	};
	
	/**
	 * @desc 전과이면서 학과가 같으면 작업중단
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 9. 12.
	 */
	function doEnlRsnChk() {
		var vsBefSaCd = util.FreeForm.getValue(app, "frfCsrEnroll", "SA_CD");
		
		var vsEnrollRsnRcd = util.FreeForm.getValue(app, "frfCsrEnrollChg", "ENROLL_RSN_RCD");
		var vsSaCd = util.FreeForm.getValue(app, "frfCsrEnrollChg", "SA_CD");
		// 전과 이면서 학사부서가 같으면 초기화 후 작업중단
		if(vsEnrollRsnRcd == "CT105CHAN"&&vsBefSaCd==vsSaCd){
			util.FreeForm.setValue(app, "frfCsrEnrollChg", "SA_CD", "");
			util.FreeForm.setValue(app, "frfCsrEnrollChg", "SA_NM", "");
			util.FreeForm.setValue(app, "frfCsrEnrollChg", "OG_NM", "");
			util.FreeForm.setValue(app, "frfCsrEnrollChg", "OG_CD", "");
			util.FreeForm.setValue(app, "frfCsrEnrollChg", "SP_CD", "");
			util.Msg.alert("NLS-CSR-M124");
			return false;
		}
		return true;
	};
	
	
	return moPage;
};
