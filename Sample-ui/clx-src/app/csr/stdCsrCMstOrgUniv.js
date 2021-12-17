//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./stdCsrCMstOrgUniv.xtm"/>


var stdCsrCMstOrgUniv = function() {
	var moPage = new Page();
	/********************************
	 * 사용자 정의 메소드, 변수
	 *******************************/
	moPage.msStudId  = ""	;
	moPage.msStudNo = ""	;
	moPage.msKeyDt   = ""	;
	
	moPage.maDisableCtl=["rptCsrOrgUniv"
										,"frfCsrOrgUniv"
										,"btnNew"
										,"btnDel"
										,"btnRestore"
										,"btnSave"]
	/**
	 * 서브페이지 임포트 초기화
	 * @member moPage
	 * @type void
	 * @author hyunteak at 16. 1. 27 오전 10:17
	 */
	moPage.onLoadImportDone_ImpSbpHeader = function() {
		doSbpHeaderOnLoad();
	}
	
	 /**
	  * 리피트 변경여부 반환
	  * @member moPage
	  * @type Boolean
	  * @return 
	  * @author hyunteak at 16. 1. 27 오전 10:17
	  */
	function doCheckDataChange() {
		
		if(util.Grid.isModified(app, ["grdCsrOrgUniv"], "CRM") ){
			return false;
		}else{
			return true;
		}
		
	}
	/**
	 * 화면 초기화 이벤트 
	 * @member moPage
	 * @type void
	 * @author hyunteak at 16. 1. 27 오전 10:17
	 */
	moPage.onModelConstructDone_StdCsrCMstOrgUniv = function() {
		//doOnLoad 화면 초기화
		doOnLoad();
	};
	/**
	 * doOnLoad 화면 초기화
	 * @member moPage
	 * @type void
	 * @author hyunteak at 16. 1. 27 오전 10:17
	 */
	function doOnLoad(){
		//리피트 초기화
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["rptCsrOrgUniv","frfCsrOrgUniv"]);
		// 부모멤버변수에담긴학번받음
		var voParentPage = ExtSubPage.getParent();
		moPage.msStudId		= voParentPage.callScriptVal("ExtInstance").getValue("/root/reqKey/strStudId");
		moPage.msStudNo	= voParentPage.callScriptVal("ExtInstance").getValue("/root/reqKey/strStudNo");
		moPage.msKeyDt		= voParentPage.callScriptVal("ExtInstance").getValue("/root/resOnLoad/currentDate");
		util.DataMap.setValue(app, "dmReqKey", "strStudId",moPage.msStudId);
		//메인 프레임에서 학생의 id를 받아 해당 기본정보 및 출신대학 정보  추출
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess) {
				if (pbSuccess) {
					
					doList(function(pbSuccess) {
						// 조회 : "조회되었습니다." header 메세지 표시
						if(pbSuccess) moPage.parentSendMsg("lblTitleRptCsrOrgUniv",NLS.INF.M024);
					});
				}
			}
		);
		
	}
	/**
	 * 출신대학정보 조회 
	 * @member moPage
	 * @param {?} poCallBackFunc 콜백함수
	 * @type void
	 * @author hyunteak at 16. 1. 27 오전 10:17
	 */
	function doList(poCallBackFunc){
		util.DataMap.setValue(app, "dmReqKey", "strStudId",moPage.msStudId);
		//입학정보 조회 서브미션 호춣
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess)
			{	//출신대학 정보 리셋
				util.Control.redraw(app, ["rptCsrOrgUniv"]);
				if(util.Grid.getRowCount(app, "grdCsrOrgUniv") < 1)
				{
					//출신대학 정보 프리폼 수정 불가 
					util.Control.setEnable(app, false, "frfCsrOrgUniv");
					util.Control.reset(app, "frfCsrOrgUniv");
				}
			}else{
				util.Control.setEnable(app, false,"grp_rptCsrOrgUniv");
			}
			// 조회 후 콜백함수 수행
			if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
		});
	}
	/**
	 * 출신대학 리피트 로우 선택 이벤트 
	 * @member moPage
	 * @type void
	 * @author hyunteak at 16. 1. 27 오전 10:17
	 */
	moPage.onRowSelect_RptExtCetAplyAccr = function() {
		
		// 출신대학 리피트 현재 index get
		var vnIndex = util.Grid.getIndex(app, "grdCsrOrgUniv");
		//리피트 특정 row 데이터를 프리폼 copy
//TO-BE: <ExtRepeat.copyRowForm> 그리드-프리폼인 경우에는 selection바인딩으로 처리하기 때문에 불필요함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.copyRowForm("rptCsrOrgUniv", "frfCsrOrgUniv", vnIndex);
		//폼 활/비활성화
		doCompareFrfEnable("rptCsrOrgUniv","frfCsrOrgUniv");
		
		
	}
	/**
	 * 폼 활/비활성화/ 서브페이지 조회권한일경우에도 비활성화
	 * @member moPage
	 * @param {?} pcRptId	리피트 아이디
	 * @param {?} pcFrfId	리피트(폼) 아이디
	 * @type void
	 * @author hyunteak at 16. 1. 27 오전 10:17
	 */
	function doCompareFrfEnable(pcRptId,pcFrfId) {
		if( (!util.Grid.getIndex(app, pcRptId)) || util.Grid.getRowState(app, pcRptId) == cpr.data.tabledata.RowState.DELETED || msAuth == "CC00702") {
				
			util.Control.setEnable(app, false, [pcFrfId]);	
			
		} else {
				util.Control.setFocus(app,  "ipbFrfOrgUnivNm");

			util.Control.setEnable(app, true, [pcFrfId]);	
		}	
	}
	
	/**
	 * 작업저장
	 * @member moPage
	 * @param {?} poCallBackFunc	콜백함수
	 * @type Boolean
	 * @return 
	 * @author hyunteak at 16. 1. 27 오전 10:17
	 */
	function doSave(poCallBackFunc){
		var vbChgFrf = util.Grid.isModified(app, ["grdCsrOrgUniv"], null);
		
		//출신대학 리피트 변경사항 체크
		if(vbChgFrf)
		{
			//2.출신대학 리피트 필수 체크
			if(!util.validate(app, ["grdCsrOrgUniv"])) return false;
			//3..출신대학 리피트  작업자장 서브미션 호출
			//strCommand: save 
			util.Submit.send(app, "subSave", function(pbSuccess){
				//3.1성공시
				if(pbSuccess){
					//마지막 순번
					var vsLastSerialNo = util.DataMap.getValue(app, "dmResList", "strLastSerialNo");
					//마지막 순번있으면 포커싱 가도록
					if(vsLastSerialNo!=""){
						ExtRepeat.setPkValues("rptCsrOrgUniv", vsLastSerialNo);
					}
					
					//3.1.1 출신대학 리피트  재조회
					doList(function(pbListSuccess) {
						
						if (pbListSuccess){

							moPage.parentSendMsg("lblTitleRptCsrOrgUniv",NLS.INF.M025);
						}
						if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbListSuccess);
					});
				}
			});
		}else{
			//변경된 내역이 없습니다.
			moPage.parentSendMsg("lblTitleRptCsrOrgUniv",NLS.WRN.M007);
			if (util.isFunc(poCallBackFunc)) poCallBackFunc(false);
			return false;
		}
		
	}
	
	/**
	 * 출신대학 프리폼 업데이트 이벤트 
	 * @member moPage
	 * @type void
	 * @author hyunteak at 16. 1. 27 오전 10:17
	 */
	moPage.onUpdate_FrfCsrOrgUniv = function() {
//TO-BE: <ExtFreeForm.updateToRpt> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtFreeForm.updateToRpt("rptCsrOrgUniv","frfCsrOrgUniv");
	};
	/**
	 * 공통 메시지 호출
	 * @member moPage
	 * @param {?} psCtrlId		라벨ID
	 * @param {?} psMsgCodeNm	메시지 코드 
	 * @type void
	 * @author hyunteak at 16. 1. 27 오전 10:17
	 */
	moPage.parentSendMsg = function(psCtrlId, psMsgCodeNm) {
		var vsMsg = ExtControl.getTextValue(psCtrlId);
		vsMsg     = "[" + vsMsg + "]";
	
		util.Msg.notify(app, vsMsg + psMsgCodeNm);	
	};
	/**
	 * 저장버튼 클릭 이벤트 
	 * @member moPage
	 * @type void
	 * @author hyunteak at 16. 1. 27 오후 2:34
	 */
	moPage.onClick_BtnSave = function() {
		doSave();
	}
	/**
	 * 작업취소 버튼 클릭 이벤트 
	 * @member moPage
	 * @type void
	 * @author hyunteak at 16. 1. 27 오후 2:35
	 */
	moPage.onClick_BtnRestore = function() {
		util.Grid.restoreRow(app, "grdCsrOrgUniv");
		//폼 활/비활성화
		doCompareFrfEnable("rptCsrOrgUniv","frfCsrOrgUniv");
//TO-BE: <ExtRepeat.copyRowForm> 그리드-프리폼인 경우에는 selection바인딩으로 처리하기 때문에 불필요함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.copyRowForm("rptCsrOrgUniv", "frfCsrOrgUniv");
	}
	/**
	 * 삭제버튼 클릭 이벤트 
	 * @member moPage
	 * @type void
	 * @author hyunteak at 16. 1. 27 오후 2:35
	 */
	moPage.onClick_BtnDel = function() {
		if(util.Grid.getIndex(app, "grdCsrOrgUniv")==0){
			moPage.parentSendMsg("lblTitleRptCsrOrgUniv",NLS.CSR.M113);
			return false;
		}else{
			var vsUptStatus 	= util.Grid.getCellValue(app, "grdCsrOrgUniv", "UPT_STATUS");
			//신규시 프리폼 초기화
			if(vsUptStatus == "N"){
				util.Control.reset(app, "frfCsrOrgUniv");
			}
			util.Grid.deleteRow(app, "grdCsrOrgUniv");
		}
		
		//폼 활/비활성화
		doCompareFrfEnable("rptCsrOrgUniv","frfCsrOrgUniv");
	}
	/**
	 * 신규 버튼 클릭 이벤트 
	 * @member moPage
	 * @type void
	 * @author hyunteak at 16. 1. 27 오후 2:35
	 */
	moPage.onClick_BtnNew = function() {
		//해당 리피트의 편집 시작할 컬럼 지정
		var vnIdx = util.Grid.insertRow(app, "grdCsrOrgUniv", "rdOptOrgUnivNm");
		//출신대학(리피트) 신규 기본값 셋팅
		util.Grid.setCellValue(app, "grdCsrOrgUniv", "STUD_ID"	, moPage.msStudId		, vnIdx);
		//출신대학(프리폼) 신규 기본값 셋팅
		util.FreeForm.setValue(app, "frfCsrOrgUniv", "STUD_ID", moPage.msStudId	, true);
		// 프리폼의 콤보박스에 포커스
		//ExtFreeForm.setFocus("frfCsrOrgUniv", "ipbFrfOrgUnivNm");
	}
	
	/**
	 * 대학이수학점 소수점 제어
	 * @member moPage
	 * @type void
	 * @author hyunteak at 16. 1. 27 오후 2:35
	 */
	moPage.onValueChanged_IpbFrfOrgUnivCmpPnt = function() {
		ValidUtil.checkIntegerDecimal("ipbFrfOrgUnivCmpPnt",3,2,true);
	};
	
	/**
	 * 대학평균평점 소수점 제어
	 * @member moPage
	 * @type void
	 * @author hyunteak at 16. 1. 27 오후 2:35
	 */
	moPage.onValueChanged_IpbFrfOrgUnivGpa = function() {
		ValidUtil.checkIntegerDecimal("ipbFrfOrgUnivGpa",3,2,true);
	};
	
	/**
	 * 패널 전체선택 제어
	 * @member moPage
	 * @type void
	 * @author hyunteak at 16. 1. 27 오후 2:35
	 */
	moPage.onValueChanged_RhCkbSelect = function() {
//TO-BE: <ExtRepeat.selectedAllPanel> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.selectedAllPanel("rhCkbSelect");

	};
	return moPage;
};
