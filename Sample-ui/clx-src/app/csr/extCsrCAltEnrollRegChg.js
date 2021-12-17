//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCsrCAltEnrollRegChg.xtm"/>


var extCsrCAltEnrollRegChg = function() {
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
					"ipbSaNm", "cbbFrfSpCd", "cbbFrfSpCd1", "ipbFrfStDt","ipbFrfProcDt"];
					
	var maCheckInsValExtr = ["cbbFrfSchYearRcd", "cbbFrfSmtRcd",
					"ipbSaNm", "cbbFrfSpCd", "cbbFrfSpCd1", "ipbFrfStDt","ipbFrfProcDt"];
	
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
		util.FreeForm.setValue(app, "frfCsrEnrollChg", "SP_CD1", "", false);

		var vsSaCd =util.FreeForm.getValue(app, "frfCsrEnrollChg", "SA_CD");
		var vsOriSpCd =  util.DataSet.getValue(app, "dsFrfCsrEnroll","SP_CD","1"); 
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
		util.DataMap.setValue(app, "dmReqKey", "strOriSpCd", vsOriSpCd);
		util.DataMap.setValue(app, "dmReqKey", "strSpDivRcd", vsSpDivRcd);
		
		//strCommand: selCourse 
		util.Submit.send(app, "subSelCourse", function(pbSuccess) {
			if (pbSuccess) {
				
				util.Control.redraw(app, ["cbbFrfSpCd","cbbFrfSpCd1"]);
				
				// 학사부서 선택시 상위 행정부서를 가져옴
				var vsOgtCdNm = util.DataMap.getValue(app, "dmResOnLoad", "strOgNm");
				var vsOgtCd = util.DataMap.getValue(app, "dmResOnLoad", "strOgCd");
				var vsResultSpCd= util.DataMap.getValue(app, "dmResOnLoad", "strResultSpCd");
				
				
				if (vsOgtCdNm == null) {
					vsOgtCdNm = "";
				}
				if (vsOgtCd == null) {
					vsOgtCd = "";
				}
				//ExtFreeForm.setValue("frfCsrEnrollChg", "OG_NM", vsOgtCdNm);
				util.FreeForm.setValue(app, "frfCsrEnrollChg", "OG_CD", vsOgtCd);
				
				if(ValueUtil.fixNull(vsResultSpCd)!=""){
					util.Control.setValue(app, "cbbFrfSpCd",vsResultSpCd);
					util.Control.setValue(app, "cbbFrfSpCd1",vsResultSpCd);
					
				}else{
					util.Control.setValue(app, "cbbFrfSpCd","");
					util.Control.setValue(app, "cbbFrfSpCd1","");
					
				}
//				ExtControl.setStyleAttr("cbbFrfSpCd","bgcolor","#FFFFFF");
				util.Control.redraw(app, ["cbbFrfSpCd","cbbFrfSpCd1"]);
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
//		ExtRepeat.init(["frfCsrEnrollChg"]);
		
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
		var voAltObj = moPage.parent.moParentObj;
		
		util.DataMap.setValue(app, "dmReqKey", "strUnitSystem", "CSR");

		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess) {
			if (pbSuccess) {
				
				util.Control.redraw(app, ["frfCsrEnroll", "frfCsrEnrollChg"]);
				// 부모창에서 값을 기본 정보 셋팅
				util.DataMap.setValue(app, "dmKeyColumn", "strStudId", 			voAltObj.strStudId);
				//ExtInstance.setValue("/root/resOnLoad/keyColumn/strEnrollDivRcd",	voAltObj.strAltDivRcd);
				//ExtInstance.setValue("/root/resOnLoad/keyColumn/strSchYearRcd",	voAltObj.strSchYearRcd);
				//ExtInstance.setValue("/root/resOnLoad/keyColumn/strProcDt",			voAltObj.strAltDt);
				util.DataMap.setValue(app, "dmKeyColumn", "strSaCd",			"");
				util.DataMap.setValue(app, "dmKeyColumn", "strSpDivRcd",		"");
				//ExtInstance.setValue("/root/resOnLoad/keyColumn/strSmtRcd",			voAltObj.strSmtRcd);
				util.DataMap.setValue(app, "dmKeyColumn", "strSpCd",			"");
				util.DataMap.setValue(app, "dmKeyColumn", "strRegStatRcd",	"");
				
				
					util.Control.setEnable(app, false, ["frfCsrEnrollChg","btnSave"]);
				// 학생의 학번정보를 화면에 입력
				//ExtControl.setValue("optStudNo",	voRegiObj["studNo"]);
				//ExtControl.setValue("optStud", 	voRegiObj["headerStud"]);
				
				//ExtControl.setEnable(false,["cbbFrfEnrollRsnRcd"]);

				// 키정보를 이용하여 해당 데이터 추출
				//moPage.doList();
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
		var voAltObj = moPage.parent.moParentObj;
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess) {
			if(pbSuccess){

				util.Control.redraw(app, ["frfCsrEnrollChg"]);
				
				var vsEnrollStat = util.FreeForm.getValue(app, "frfCsrEnrollChg", "REG_STAT_RCD");
	
				// 등록상태가 아니면 변경불가 불가
				if (vsEnrollStat != "CT109ENRO") {
					var vsEnrollStatNm =voAltObj.strAltDivNm; //등록
					var vsRegiChg = NLS.CSR.M051; //변경
//					ComMsg.alert(NLS.CSR.M002, [vsEnrollStatNm, vsRegiChg]);
					util.Msg.alert("NLS-CSR-M128",[vsEnrollStatNm]);
					

					doDataClear();
					util.Control.setEnable(app, false, ["frfCsrEnrollChg","btnSave"]);
					//ExtPopUp.closeLayeredPopup("onClick_BtnSearch");
				}else{

					//변경후 등록정보 프리폼에 새로운 row를 보이도록 함
					doSetNewRow();
					
					//데이터 조회 후 - 변경전 등록정보, 변경후 등록정보 데이터 setting
					//moPage.doSetBefCtlsVal();
					doSetAftCtlsVal();
					
					util.FreeForm.setValue(app, "frfCsrEnrollChg", "ENROLL_DT", voAltObj.strAltDt);
				
					util.Control.setEnable(app, true, ["frfCsrEnrollChg","btnSave"]);
					util.Control.setEnable(app, false, ["cbbFrfSchYearRcd","cbbFrfSmtRcd","ipbFrfStDt"]);
					
					
				}
				
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
		var voAltObj = moPage.parent.moParentObj;
		

		//학년도, 학기, 학적등록구분, 전공
		//loading시 추출된 시스템 학년도 학기로 세팅
		var vsAftYear = voAltObj.strSchYearRcd;
		var vsAftSmt = voAltObj.strSmtRcd;

		util.FreeForm.setValue(app, "frfCsrEnrollChg", "SCH_YEAR_RCD", vsAftYear);
		util.FreeForm.setValue(app, "frfCsrEnrollChg", "SMT_RCD", vsAftSmt);
		util.Control.setValue(app, "cbbFrfEnrollRsnRcd",voAltObj.strAltDivRcd);

		//학적등록구분, 이수과정구분 세팅
		//var vsAftEnrolDivRcdNm = ExtFreeForm.getValue("frfCsrEnroll", "ENROLL_DIV_NM");
		//var vsAftSpDivNm = ExtFreeForm.getValue("frfCsrEnroll", "SP_DIV_NM");
		//ExtFreeForm.setValue("frfCsrEnrollChg", "ENROLL_DIV_NM", vsAftEnrolDivRcdNm);
		//ExtFreeForm.setValue("frfCsrEnrollChg", "SP_DIV_NM", vsAftSpDivNm);

		//학사부서, 이수과정, 학적등록사유 초기화
		util.FreeForm.setValue(app, "frfCsrEnrollChg", "SA_NM", "", false);
		util.FreeForm.setValue(app, "frfCsrEnrollChg", "SA_CD", "", false);
		util.FreeForm.setValue(app, "frfCsrEnrollChg", "SP_CD", "", false);
		//ExtFreeForm.setValue("frfCsrEnrollChg", "ENROLL_RSN_RCD", "");
		
		//주과정등록/주전공인 경우 변경전학적등록정보의 교과과정적용년도를 세팅, 수정가능하도록 처리
		var vsBefEnrollDiv =  util.DataSet.getValue(app, "dsFrfCsrEnroll","ENROLL_DIV_RCD","1"); 
		var vsBefPgmDiv =  util.DataSet.getValue(app, "dsFrfCsrEnroll","SP_DIV_RCD","1");  


		
		util.FreeForm.setValue(app, "frfCsrEnrollChg", "ENROLL_DIV_RCD", vsBefEnrollDiv);
		util.FreeForm.setValue(app, "frfCsrEnrollChg", "SP_DIV_RCD", vsBefPgmDiv);

		//변경전 참조키를 상위참조키로
		var vsRefKey = util.DataSet.getValue(app, "dsFrfCsrEnroll","REF_KEY","1");
	
		util.FreeForm.setValue(app, "frfCsrEnrollChg", "UREF_KEY", vsRefKey); 
		util.FreeForm.setValue(app, "frfCsrEnrollChg", "REG_STAT_RCD", "CT109ENRO");//등록상태로
		
		//추가정보
		var vdAddInfoStarDt = voAltObj.strAltDt;
		
		util.FreeForm.setValue(app, "frfCsrEnrollChg", "ST_DT", vdAddInfoStarDt);
		util.FreeForm.setValue(app, "frfCsrEnrollChg", "END_DT", "99991231000000");

		// 처리일자에 기본세팅할 현재일자를  가져온다. (2011.08.22 JJH 추가)
		//var strProcDt = ExtInstance.getValue("/root/resOnLoad/strProcDt");
		//ExtFreeForm.setValue("frfCsrEnrollChg", "PROC_DT", strProcDt);
		var strClassRcd = util.DataSet.getValue(app, "dsFrfCsrEnroll","CLASS_RCD","1");  
		var strGudProfNm = util.DataSet.getValue(app, "dsFrfCsrEnroll","GUD_PROF_NM","1");  
		util.FreeForm.setValue(app, "frfCsrEnrollChg", "CLASS_RCD",strClassRcd);
		util.FreeForm.setValue(app, "frfCsrEnrollChg", "GUD_PROF_NM", strGudProfNm);
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
			//moPage.doInitEndDt();
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
				var vsBefStDt =util.DataSet.getValue(app, "dsFrfCsrEnroll","ST_DT","1"); 
				if (vsAddStDt >= vsBefStDt) {
					
					//크면 시작일, 종료일값 넣어줌. 이전등록값 종료일 넣어줌 
					util.FreeForm.setValue(app, "frfCsrEnrollChg", "ST_DT", vsAddStDt);
					util.FreeForm.setValue(app, "frfCsrEnrollChg", "END_DT", "99991231000000");

					
				} else {
					//선택한 학년도 학기가 이전데이터보다 이전이면 메시지 뿌려줌
					var vsBefYear =util.DataSet.getValue(app, "dsFrfCsrEnroll","SCH_YEAR_NM","1");  
					var vsBefSmt =util.DataSet.getValue(app, "dsFrfCsrEnroll","SMT_NM","1");  
					//입력필드 초기화 
					doClearDt();

					util.Msg.alert("NLS-CSR-M020", [vsBefYear, vsBefSmt]);
				}
			} else {
				//입력필드 초기화
				doClearDt();
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
			if(!util.validate(app, maCheckInsValExtr)) return false;
		} else {
			if(!util.validate(app, maCheckInsVal)) return false;
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
					
					moPage.parentSendMsg(NLS.INF.M025);
					doDataClear();
					util.Control.setEnable(app, false, ["frfCsrEnrollChg", "btnSave"]);

					ExtSubPage.getParent().callScript("doSaveAfter", null);
					return true;
				}
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
	 * @desc 선택닫기 버튼 클릭
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 2. 2.
	 */
	moPage.onClick_BtnCloseOk = function() {
		doCloseOk();
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
		var vsBefSaCd = util.DataSet.getValue(app, "dsFrfCsrEnroll","SA_CD","1");  
		
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
	
	
	/**
	 * 초기화
	 * @member moPage
	 * @type void
	 * @author hyunteak at 16. 11. 11 오전 11:16
	 */
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
		util.Control.reset(app, ["frfCsrEnrollChg"]);
	};
	
	function doNewAlt(){
		var voAltObj = moPage.parent.moParentObj;
		// 부모창에서 값을 기본 정보 셋팅
		util.DataMap.setValue(app, "dmKeyColumn", "strStudId", 			voAltObj.strStudId);

		util.DataMap.setValue(app, "dmReqKey", "strStudId", voAltObj.strStudId);
		util.DataMap.setValue(app, "dmReqKey", "strCancelYn", "N");
		
		//strCommand: listStudInfo 
		util.Submit.send(app, "subStudInfo", function(pbSuccess) {
				if (pbSuccess) {
					doList();
				}
				
			}
		);
			
	}
	
	/**
	 * 변경사항체크
	 * @member moPage
	 * @type Boolean
	 * @return 
	 * @author hyunteak at 16. 11. 11 오전 11:15
	 */
	function doCheckDataChange() {
		
		if(util.Grid.isModified(app, ["frfCsrEnrollChg"], "CRM") ){
			return false;
		}else{
			return true;
		}
	};
	
	
	moPage.onValueChanged_CbbFrfSpCd1 = function() {
		
		var vsSpCd = util.FreeForm.getValue(app, "frfCsrEnrollChg", "SP_CD1");
		util.FreeForm.setValue(app, "frfCsrEnrollChg", "SP_CD", vsSpCd);
		
	};
	return moPage;
};
