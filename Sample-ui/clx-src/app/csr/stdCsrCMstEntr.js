//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./stdCsrCMstEntr.xtm"/>


var stdCsrCMstEntr = function() {
	var moPage = new Page();
	var moPObject 	= new PObject();
	/******************************************************************************************************
	 *  객체검색팝업 관련 설정사항
	 *  ▶ 설정가능 유형
	 *      1. 인스턴스
	 *      2. 리피트 디테일 셀 ID
	 *      3. 컨트롤 ID
	 *  ▶ 각 변수별 설명
	 *      iXXX : 팝업에 전달될  input 파라미터
	 *      oXXX : 팝업에서 선택한 값을 받을 데이터
	 *  	1. controlId 		: 최초 이벤트의 버튼이나 그리드 id             (필수)
	 *  	2. iCd 				: 검색조건 부서코드                                 (선택) 
	 *  	3. iNm 				: 검색조건 부서명									(선택)	
	 *  	4. iObjDivRcd 	: 검색될 객체구분코드 종류						(필수)
	 *								  (CC009OG : "행정부서", CC009SA : "학사부서", CC009SP : "이수과정", CC009CU : "교과그룹", CC009OT : "외부부서")
	 *  	5. iStartObject 	: 검색시작부서 										(선택)
	 *								  ("CC009OG20000,CC009OG70000",) 
	 *		6. iOtDivRcd 		: 외부부서구분코드 									(선택)
	 *								  (외부부서[CC009OT]일때 사용) ("CB008UNIV, CB008HSCL")
	 *		7. iOtIsTreeView	: 트리보이기 유무 									(선택)
	 *								  default : N (외부부서[CC009OT]일때 사용) "Y" 
	 *  	8. iLanDivRcd 	: 언어키													(선택)
	 *  	9. iKeyDate 		: 기준일													(필수)
	 *  	10. oObjDivRcd 	: 객체구분코드 
	 *  	11. oCd 			: 부서코드
	 *  	12. oCdNm 		: 부서명
	 *  	13. oBegDt 		: 시작일
	 *  	14. oEndDt 		: 종료일
	 *  	15. oLanDivRcd 	: 언어키
	 *  	16. func 			: 팝업에서 선택한 값을 받은 후 추가 로직이 필요한 경우 함수
	 *									  
	 *******************************************************************************************************/	
	moPObject.moIdsForStdCmnPObjSch = [
		{
			controlId			:	"btnFrfPopSaSearch",
			iCd					:	"",
			iNm					:	"ipbFrfSaNm",
			iObjDivRcd			:	["CC009SA"],
			iStartObject    	:   "",
			iOtDivRcd			:	"",
			iOtIsTreeView	:	"",
			iLanDivRcd		:	"",
			iKeyDate			:	"/root/resOnload/keyDate",
			iKeyEndDate		:	"",
			oObjDivRcd		:	"",
			oCd					:	"ipbFrfSaCd",
			oCdNm				:	"ipbFrfSaNm",
			oBegDt				:	"",
			oEndDt				:	"",
			oLanDivRcd		:	"",
			func 					: function(poParam){
										doGetSpCdList();
										
									 }
		}
	];
	/**
	 * 고교코드검색팝업 관련 설정사항
	 * 설정가능 유형 : 
	 *   1. 인스턴스((/root/시작))
	 *   2. 그리드의 셀 (ghc시작)
	 *   3. 컨트롤 id
	 * 각 변수별 설명
	 *  iXXX : 팝업으로 input 전달될 파라미터
	 *  oXXX : 팝업에서 선택한 값을 받을 컬럼 아이디
	 *  func : 팝업에서 선택한 값을 받은 후 추가 로직이 필요한 경우 함수 작성
	 * 
	 *  1. controlId 		: (필수) 최초 이벤트의 버튼이나 그리드 id 
	 *  2. iHsclNm 	: (필수) 년도
	 *  3. oHsclCd 	: 코드구분
	 *  4. oHsclNm 	: 코드
	 *  5. oMpoeNm : 코드명
	 *  6. func 			: 팝업에서 선택한 값을 받은 후 추가 로직이 필요한 경우 함수
	 * @member impExtCetHsclCd
	 * @type Array
	 * @author hyunteak at 15. 12. 23 
	 */
	 
	/* 사용 예 시작*/ 
		/*
			var moIdsForExtCetPHsclCd = [
			{
				controlId 		: "",
				iHsclNm  : "",
				oHsclCd 	: "",
				oHsclNm 		: "",	
				oMpoeNm 		: "",
				func : null
			}
			];
			//고교코드자료입력컨트롤 ValueChanged 이벤트
			doOnChangeExtCetPHsclCd(sender);
			
			//고교코드자료검색 돋보기버튼 Click 이벤트 
			doOnClickExtCetPHsclCd(sender);
		*/
	/* 사용 예 끝 */
	moPObject.moIdsForExtCetPHsclCd = [
		{
			controlId 		:"btnFrfPopHsclSearch",
			iHsclNm  : "ipbFrfHsclNm",
			oHsclCd 	: "ipbFrfHsclCd",
			oHsclNm 		: "ipbFrfHsclNm",	
			oMpoeNm 		: "",
			func : null
		}
	];
	
	/********************************
	 * 사용자 정의 메소드, 변수
	 *******************************/
	moPage.msStudId  = ""	;
	moPage.msStudNo = ""	;
	moPage.msKeyDt   = ""	;
	 /**
	  * 프리폼 변경여부 반환
	  * @member moPage
	  * @type Boolean
	  * @return 
	  * @author hyunteak at 16. 1. 26 오전 10:15
	  */
	function doCheckDataChange() {
		
		if(util.Grid.isModified(app, ["frfCsrEntrInfoList"], "CRM") ){
			return false;
		}else{
			return true;
		}
		
	}
	/********************************
	 * 폼 신규 상태 체크 
	 *******************************/
	moPage.mbIsInsertRowFrf = false;
	/**
	 * 서브페이지 임포트 초기화 
	 * @member moPage
	 * @type void
	 * @author hyunteak at 16. 1. 26 오전 10:15
	 */
	moPage.onLoadImportDone_ImpSbpHeader = function() {
		doSbpHeaderOnLoad();
	}
	/**
	 * 온로드 이벤트 
	 * @member moPage
	 * @type void
	 * @author hyunteak at 16. 1. 26 오전 10:16
	 */
	moPage.onModelConstructDone_StdCsrCMstEntr = function() {
		//doOnLoad 화면 초기화
		doOnLoad();
	};
	/**
	 * doOnLoad 화면 초기화
	 * @member moPage
	 * @type void
	 * @author hyunteak at 16. 1. 26 오전 10:16
	 */
	function doOnLoad(){
		//리피트 초기화
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["frfCsrEntrInfoList"]);
		//메인 프레임에서 학생의 id를 받아 해당 기본정보 추출
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess) {
				if (pbSuccess) {
					
					util.Control.redraw(app, ["frfCsrEntrInfoList"]);
					var voParentPage = ExtSubPage.getParent();
					
					// 부모멤버변수에담긴학번받음
					
					moPage.msStudId		= voParentPage.callScriptVal("ExtInstance").getValue("/root/reqKey/strStudId");
					moPage.msStudNo	= voParentPage.callScriptVal("ExtInstance").getValue("/root/reqKey/strStudNo");
					moPage.msKeyDt		= voParentPage.callScriptVal("ExtInstance").getValue("/root/resOnLoad/currentDate");
					
					if (ValueUtil.isNull(msStudId)) {
						util.Control.setEnable(app, false,"grp_rptCsrOrgUniv");
						return false;
					}else{
						
						
						doList(function(pbSuccess) {
							// 조회 : "조회되었습니다." header 메세지 표시
							if(pbSuccess) moPage.parentSendMsg("lblTitleFrfCsrEntrInfoList",NLS.INF.M024);
						});
						
					}
				}
			}
		);
	}
	/**
	 * 입학정보 조회
	 * @member moPage
	 * @param {?} poCallBackFunc
	 * @type void
	 * @author hyunteak at 16. 1. 26 오전 10:16
	 */
	function doList(poCallBackFunc){
		util.DataMap.setValue(app, "dmReqKey", "strStudId",moPage.msStudId);
		//입학정보 조회 서브미션 호춣
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess)
			{	//입학정보 리셋
				util.Control.redraw(app, ["frfCsrEntrInfoList","cbbFrfEntrSeltRcd"]);
				//리턴 Row Count
				var vnRowCnt = util.DataMap.getValue(app, "dmResList", "strLowCnt")
				//신규여부 체크
				if (ValueUtil.fixNull(vnRowCnt)=="0"){
					doSubInsertRow();						
				}else{
					//신규입력이 아님
					moPage.mbIsInsertRowFrf = false;
					util.Control.setEnable(app, true, ["frfCsrEntrInfoList"]);
				}
			}
			// 조회 후 콜백함수 수행
			if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
		});
	}
	/**
	 * 입학정보 신규
	 * @member moPage
	 * @type void
	 * @author hyunteak at 16. 1. 26 오전 10:16
	 */
	function doSubInsertRow() {
		util.FreeForm.setValue(app, "frfCsrEntrInfoList",AppConstants.CUD_COL_REF, "N");
		//vcRpt.setCellVal(vnInsRowIdx, AppConstants.CUD_COL_REF, "N", true, true);
		//프리폼 신규
		util.FreeForm.insertRow(app, "frfCsrEntrInfoList");
		//학생 ObjectId 셋팅
		util.FreeForm.setValue(app, "frfCsrEntrInfoList", "STUD_ID", moPage.msStudId);
		//삭제버튼 비활성화
		//ExtControl.setEnable(false, ["btnSubDel"]);
		//상태 오픈 상태로 변경 :트리 변경시 변경사항 유무 체크 피하기 위함
		util.Grid.setRowState(app, "frfCsrEntrInfoList",cpr.data.tabledata.RowState.UNCHANGED,'1');
		//신규입력이 Ok
		moPage.mbIsInsertRowFrf = true;
		util.Control.setEnable(app, true, ["frfCsrEntrInfoList"]);

		
	};
	/**
	 * 입력한 년도 학기 에 해당하는 기준일자 조회 
	 * @member moPage
	 * @type void
	 * @author hyunteak at 16. 1. 26 오전 10:17
	 */
	moPage.getDateFromSession = function(){
		// 학년도, 학기의 기준일자(시작일)에 영향을 받는 사용자 input 필드는 초기화
		//Common.clearCtl(["ipbSaCd", "ipbSaNm", "cbbSpCd"]);
		util.FreeForm.setValue(app, "frfCsrEntrInfoList","SA_CD","");
		util.FreeForm.setValue(app, "frfCsrEntrInfoList","SA_NM","");
		util.FreeForm.setValue(app, "frfCsrEntrInfoList","SP_CD","");
		util.FreeForm.setValue(app, "frfCsrEntrInfoList","SP_NM","");
		
		
		// 학년도, 학기 변동에 따른 학사력 기준일자 가져오기
		var vsYear =util.FreeForm.getValue(app, "frfCsrEntrInfoList","ENTR_SCH_YEAR_RCD");
		var vsSmt =util.FreeForm.getValue(app, "frfCsrEntrInfoList","ENTR_SMT_RCD");
		//학년도 학기 둘중 하나라도 없을 경우 리턴 ..
		if (ValueUtil.isNull(vsYear)|| ValueUtil.isNull(vsSmt)) return;
		//기준일자 서브미션 필요한 인스턴스 셋팅 
		util.DataMap.setValue(app, "dmSessionDate", "year", vsYear);
		util.DataMap.setValue(app, "dmSessionDate", "smt", vsSmt);
		util.DataMap.setValue(app, "dmSessionDate", "stDt", "");
		util.DataMap.setValue(app, "dmSessionDate", "endDt", "");
		//입력한 학년도 학기에 해당 하는 기준 시작일자,종료일자 조회 서브미션 호출
		//strCommand: dateFromSession 
		util.Submit.send(app, "subDateFromSession", function(pbSuccess){
			if (pbSuccess) {
				var vsStDt = util.DataMap.getValue(app, "dmSessionDate", "stDt");
				
				if (ValueUtil.isNull(vsStDt)) {
					//시작일자  값이 없으면, reset
					util.FreeForm.setValue(app, "frfCsrEntrInfoList","ENTR_SCH_YEAR_RCD","");
					util.FreeForm.setValue(app, "frfCsrEntrInfoList","ENTR_SMT_RCD","");
					//page.getControl("cbbEntrSchYearRcd").setValue("");
					//page.getControl("cbbEntrSmtRcd").setValue("");
					
					util.DataMap.setValue(app, "dmResOnLoad", "keyDate", "");
				} else {
					util.DataMap.setValue(app, "dmResOnload", "keyDate", vsStDt);
				}
			} else {
				util.FreeForm.setValue(app, "frfCsrEntrInfoList","ENTR_SCH_YEAR_RCD","");
				util.FreeForm.setValue(app, "frfCsrEntrInfoList","ENTR_SMT_RCD","");
				//page.getControl("cbbEntrSchYearRcd").setValue("");
				//page.getControl("cbbEntrSmtRcd").setValue("");
				util.DataMap.setValue(app, "dmResOnLoad", "keyDate", "");
			}
		});
	};
	
	
	/**
	 * 저장 
	 * @member moPage
	 * @param {?} poCallBackFunc
	 * @type Boolean
	 * @return 
	 * @author hyunteak at 16. 1. 26 오전 10:17
	 */
	function doSubSave(poCallBackFunc) {
		

		var vbChgFrf = util.Grid.isModified(app, ["frfCsrEntrInfoList"], null);
		//변경사항 체크 
		//1.변경사항 있을 경우 
		if( vbChgFrf ){
			//필수값 체크 
			if( !util.validate(app, ["frfCsrEntrInfoList"]) ){
				if (util.isFunc(poCallBackFunc)) poCallBackFunc(false);
				return false;
			} else {
				//신규일 경우 fiag insert 로 변경
				if( moPage.mbIsInsertRowFrf ){
					//신규입력일 경우 신규 플래그 설정
					model.getControl("frfCsrEntrInfoList").setRowStatus(1, "insert");
				}
				
			}
			
			//저장 실행
			//strCommand: save 
			util.Submit.send(app, "subSave", function(pbSuccessSave){
				if(pbSuccessSave) {
					doList(function(pbSuccess) {
						//저장성공 메세지 출력
						if(pbSuccess){
							moPage.parentSendMsg("lblTitleFrfCsrEntrInfoList", NLS.INF.M001);
						}
						if(util.isFunc(poCallBackFunc))	poCallBackFunc(pbSuccess);
					});
				}
			});
			
		//2.변경사항 없을 경우 
		} else {
			moPage.parentSendMsg("lblTitleFrfCsrEntrInfoList",NLS.WRN.M007);
			if (util.isFunc(poCallBackFunc)) poCallBackFunc(false);
			return false;
		}
	};
	/**
	 * 공통 메시지 호출
	 * @member moPage
	 * @param {?} psCtrlId		라벨ID
	 * @param {?} psMsgCodeNm	메시지 코드 
	 * @type void
	 * @author hyunteak at 16. 1. 26 오전 10:17
	 */
	moPage.parentSendMsg = function(psCtrlId, psMsgCodeNm) {
		var vsMsg = ExtControl.getTextValue(psCtrlId);
		vsMsg     = "[" + vsMsg + "]";
	
		util.Msg.notify(app, vsMsg + psMsgCodeNm);	
	};
	/**
	 * 학년도 변경시 해당하는 기준일자 조회 
	 * @member moPage
	 * @type void
	 * @author hyunteak at 16. 1. 26 오전 10:24
	 */
	moPage.onValueChanged_CbbFrfEntrSchYearRcd = function() {
		//입력한 년도 학기 에 해당하는 기준일자 조회 
		moPage.getDateFromSession();
	};
	/**
	 * 학기 변경시 해당하는 기준일자 조회 
	 * @member moPage
	 * @type void
	 * @author hyunteak at 16. 1. 26 오전 10:24
	 */
	moPage.onValueChanged_CbbFrfEntrSmtRcd = function() {
		//입력한 년도 학기 에 해당하는 기준일자 조회 
		moPage.getDateFromSession();
	};
	
	/**
	 * 학사부서명 검색 체인지 이벤트 
	 * @member moPage
	 * @param {?} sender
	 * @type void
	 * @author hyunteak at 16. 1. 26 오전 10:46
	 */
	moPage.onValueChanged_IpbFrfSaNm = function(sender) {
		doOnChangeStdCmnPObjSch(sender);
	};
	
	/**
	 * 출신고교명 검색 체인지 이벤트 
	 * @member moPage
	 * @param {?} sender
	 * @type void
	 * @author hyunteak at 16. 1. 26 오전 10:47
	 */
	moPage.onValueChanged_IpbFrfHsclNm = function(sender) {
		doOnChangeExtCetPHsclCd(sender);
	};
	/**
	 * 학사부서 검색 팝업 이벤트
	 * @member moPage
	 * @param {?} sender
	 * @type void
	 * @author hyunteak at 16. 1. 26 오전 10:47
	 */
	moPage.onClick_BtnFrfPopSaSearch = function(sender) {
		doOnClickStdCmnPObjSch(sender);
	};
	
	/**
	 * 출신고교 검색 팝업 이벤트
	 * @member moPage
	 * @param {?} sender
	 * @type void
	 * @author hyunteak at 16. 1. 26 오전 10:47
	 */
	moPage.onClick_BtnFrfPopHsclSearch = function(sender) {
		doOnClickExtCetPHsclCd(sender);
	};

	/**
	 * 학사부서에 따른 이수과정 목록 가져온다
	 * @member moPage
	 * @type void
	 * @author hyunteak at 16. 1. 26 오후 4:58
	 */
	function doGetSpCdList() {

		//SACD
		var vsSaCd = util.Control.getValue(app, "ipbFrfSaCd");
		
		util.DataMap.setValue(app, "dmResOnload", "strSaCd", vsSaCd);
		util.Control.setValue(app, "ipbFrfSpDiv","CA10701");
		util.Control.setValue(app, "ipbFrfSpDiv","CA10701");//전공만 필터링 하기위해
		//strCommand: selCourse 
		util.Submit.send(app, "subSelCourse", function(pbSuccess){
			if(pbSuccess) {
				util.Control.redraw(app, "cbbFrfSpCd");
				//이수과정에서 전공으로만 필터
				doSetSpCdList();
			}
		});
	};
	/**
	 * 이수과정에서 전공으로만 필터
	 * @member moPage
	 * @type void
	 * @author hyunteak at 16. 1. 26 오후 4:58
	 */
	function doSetSpCdList() {
		var vsSpDivCd = util.Control.getValue(app, "ipbFrfSpDiv");
		ExtSelectCtl.setInsBind("cbbFrfSpCd", "[child:: SP_DIV_RCD = '" + vsSpDivCd + "']");
	};
	/**
	 * 삭제버튼 클릭 이벤트 
	 * @member moPage
	 * @type void
	 * @author hyunteak at 16. 1. 26 오전 10:17
	 */
	moPage.onClick_BtnDel = function() {
		
		var vsLabel = ExtControl.getTextValue("lblTitleFrfCsrEntrInfoList");
		var vnRowCnt = util.DataSet.getRowCount(app, "dsFrfCsrEntrInfoList");
		//신규일 경우 삭제 불가 처리 
		if (moPage.mbIsInsertRowFrf) {
			//삭제할 데이터가 없습니다. 
			util.Msg.alert("NLS-WRN-M004",[vsLabel]);
			//ComMsg.alert(NLS.MSG.WRN.M004(page.getControl("frfEntrMst").userAttr));
			return;
		}else{
			util.Grid.deleteRow(app, "frfCsrEntrInfoList");
			//삭제버튼 상태변경
			//ExtControl.setEnable(false, ["btnSubDel"]);
			util.Control.setEnable(app, false, ["frfCsrEntrInfoList"]);	
		}
	}
	/**
	 * 저장 버튼 클릭 이벤트 
	 * @member moPage
	 * @type void
	 * @author hyunteak at 16. 1. 26 오전 10:17
	 */
	moPage.onClick_BtnSave = function() {
		//저장
		doSubSave();
	}
	/**
	 * 작업 취소 버튼 이벤트 
	 * @member moPage
	 * @type void
	 * @author hyunteak at 16. 1. 26 오전 10:17
	 */
	moPage.onClick_BtnRestore = function() {
		util.Grid.restoreRow(app, "frfCsrEntrInfoList");
		util.Control.setEnable(app, true, ["frfCsrEntrInfoList"]);
		//리턴 Row Count
		var vnRowCnt = util.DataMap.getValue(app, "dmResList", "strLowCnt");
		//신규여부 체크
		if (ValueUtil.fixNull(vnRowCnt)=="0"){
			doSubInsertRow();						
		}
	}
	
	
	moPage.onValueChanged_RdbFrfCapIoDivRcd = function() {
		var vsCaploDivRcd = util.Control.getValue(app, "rdbFrfCapIoDivRcd");
		
		if(!ValueUtil.isNull(vsCaploDivRcd))
		{
			ExtSelectCtl.setInsBind("cbbFrfEntrSeltRcd", "[child:: UCD = '"+vsCaploDivRcd+"']");
		}
	};
	
	
	moPage.onSetFocus_CbbFrfEntrSeltRcd = function() {
		// 입학전형 필터 실행
		var vsCaploDivRcd = util.FreeForm.getValue(app, "frfCsrEntrInfoList", "CAP_IO_DIV_RCD");
		
		if(!ValueUtil.isNull(vsCaploDivRcd))
		{
		ExtSelectCtl.setInsBind("cbbFrfEntrSeltRcd", "[child:: UCD = '"+vsCaploDivRcd+"']");
		}
	};
	
	return moPage;
};
