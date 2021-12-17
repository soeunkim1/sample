//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./stdCsrCPrzPnshInfo.xtm"/>


var stdCsrCPrzPnshInfo = function() {
	var moPage = new Page();
	var moPObject 	= new PObject();

	moPage.onLoadImportDone_impSbpHeader = function() {
		doSbpHeaderOnLoad();
	};
	
	
	moPage.onModelConstruct_StdCsrCPrzPnshInfo = function() {
		ExtSubmission.sendEx("subOnLoad", "onLoad");
	};
	
	
	moPage.onModelConstructDone_StdCsrCPrzPnshInfo = function() {
		doOnLoad();
	};

	/**
	 * 학적 마스터에서 조회한 학번
	 * @type String
	 */	
	var msStudId = "";
	
	/**
	 * 이전 상벌구분 값
	 */
	var msPrzPnshDivRcd = null;
	
	/**
	 * @desc doOnLoad 화면 초기화
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 1. 29
	 */
	function doOnLoad(){

//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearchPrz", ["grp_rptCsrPrzPnsh"]);
		//리피트 초기화
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["rptCsrPrzPnsh"]);
		
		var voParentPage = ExtSubPage.getParent();
		
		// 부모멤버변수에담긴학번받음
		msStudId = moPage.parent.moParentObj.studId;
		util.Control.redraw(app, ["rptCsrPrzPnsh", "cbbPrzPnshDivRcd"]);
		util.DataMap.setValue(app, "dmReqKey", "strSubpageAuth", msAuth);
		
		if (ValueUtil.isNull(msStudId)) {
			return false;
		}else{
			//LIST CALL 
			util.Header.clickSearch(app);
		}
	}
	
	/**
	 * @desc 해당 학생의 기본정보 데이터를 가져온다.
	 * @param poFunc 콜백함수
	 * @return void
	 * @author Choi In Seong 2016. 1. 29
	 */
	function doList(poFunc) {
		
		util.DataMap.setValue(app, "dmReqKey", "strStudId", msStudId);
		
		// submission call 
		//strCommand: list 
		util.Submit.send(app, "subList",  function(pbSuccess) {
			if(pbSuccess){
				//화면에 rebuild
				util.Control.redraw(app, ["rptCsrPrzPnsh"]);
			}
			
			if(util.isFunc(poFunc)) poFunc(pbSuccess);
		});
			
	};
	
	/**
	 * @desc 상벌사항 신규
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 1. 29
	 */
	moPage.onClick_BtnNew = function() {

		// 신규로우 추가
		util.Grid.insertRow(app, "grdCsrPrzPnsh");
		
		var vsPrzPnshDivRcd	= util.Control.getValue(app, "cbbPrzPnshDivRcd");
		var vsStDt					= util.DataMap.getValue(app, "dmCurrentSmt", "stDt");
		var vsSmtRcd			= util.DataMap.getValue(app, "dmCurrentSmt", "smtRcd");
		var vsEndDt				= util.DataMap.getValue(app, "dmCurrentSmt", "endDt");
		var vsYearRcd			= util.DataMap.getValue(app, "dmCurrentSmt", "schYearRcd");
		
		util.Grid.setCellValue(app, "grdCsrPrzPnsh", "PRZ_PNSH_DIV_RCD", vsPrzPnshDivRcd);
		
		util.Grid.setCellValue(app, "grdCsrPrzPnsh", "STUD_ID", msStudId);
		util.Grid.setCellValue(app, "grdCsrPrzPnsh", "SCH_YEAR_RCD", vsYearRcd);
		util.Grid.setCellValue(app, "grdCsrPrzPnsh", "SMT_RCD", vsSmtRcd);
		util.Grid.setCellValue(app, "grdCsrPrzPnsh", "ST_DT", vsStDt);
		util.Grid.setCellValue(app, "grdCsrPrzPnsh", "END_DT", vsEndDt);
		
	}
	
	/**
	 * @desc 작업저장
	 * @param poCallbackFunc 콜백함수
	 * @return Boolean
	 * @author Choi In Seong 2016. 1. 29
	 */
	function doSubSave(poCallbackFunc) {
		// 리피터 변경사항 체크
		if(!util.Grid.isModified(app, ["grdCsrPrzPnsh"], null)){
			moPage.parentSendMsg("lblTitleSubCsrPrzPnsh",NLS.WRN.M007);
			if(util.isFunc(poCallbackFunc)) poCallbackFunc(false);
			return false;
		}
		//리피트 validation check
		if(!util.validate(app, "grdCsrPrzPnsh")){
			if(util.isFunc(poCallbackFunc)) poCallbackFunc(false);
			return false;
		}

		//strCommand: save 
		util.Submit.send(app, "subSave", function(pbSuccessSave) {
				if(pbSuccessSave) {
					
					var vsLastSerialNo = util.DataMap.getValue(app, "dmResList", "strLastSerialNo");
					
					//마지막 순번있으면 포커싱 가도록
					if(vsLastSerialNo!=""){
						ExtRepeat.setPkValues("rptCsrPrzPnsh", vsLastSerialNo);
					}
					
					//저장성공 메세지 출력
					doList(function(pbSuccessList) {
						// 조회 : "조회되었습니다." header 메세지 표시
						if(pbSuccessList) {
							moPage.parentSendMsg("lblTitleSubCsrPrzPnsh",NLS.INF.M025);
						}
						if(util.isFunc(poCallbackFunc))	poCallbackFunc(pbSuccessList);
					});
				}
			}
		);
	};
	
	/**
	 * @desc 부모 헤더에 메세지 뿌리기
	 * @param psCtrlId 
	 * @param psMsgCode 
	 * @return void
	 * @author Choi In Seong 2016. 1. 29
	 */
	moPage.parentSendMsg = function(psCtrlId, psMsgCodeNm) {
		var vsMsg = ExtControl.getTextValue(psCtrlId);
		vsMsg     = "[" + vsMsg + "]";
	
		util.Msg.notify(app, vsMsg + psMsgCodeNm);	
	};
	
	/**
	 * @desc 저장 버튼 클릭
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 1. 29
	 */
	moPage.onClick_BtnSave = function() {
		doSubSave();
	};
	

	moPage.onClick_BtnSearch = function() {
		doList(function(pbSuccess) {
			// 조회 : "조회되었습니다." header 메세지 표시
			if(pbSuccess) moPage.parentSendMsg("lblTitleSubCsrPrzPnsh", NLS.INF.M024);
		});
	}

	/**
	 * @desc 작업취소
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 1. 29
	 */
	moPage.onClick_BtnRestore = function() {
		util.Grid.restoreRow(app, "grdCsrPrzPnsh");
	}
	
	/**
	 * @desc 학년도, 학기에 해당하는 일자 셋팅
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 1. 29
	 */
	moPage.setDateForYearSmt = function() {
		var vsSchYearRcd	= util.Grid.getCellValue(app, "grdCsrPrzPnsh", "SCH_YEAR_RCD");
		var vsSmtRcd		= util.Grid.getCellValue(app, "grdCsrPrzPnsh", "SMT_RCD");
		
		if (!ValueUtil.isNull(vsSchYearRcd)&&!ValueUtil.isNull(vsSmtRcd)) {
			util.DataMap.setValue(app, "dmReqKey", "strSchYearRcd", vsSchYearRcd);
			util.DataMap.setValue(app, "dmReqKey", "strSmtRcd", vsSmtRcd);
			
			//strCommand: getDate 
			util.Submit.send(app, "subKeyDate", function(pbSuccess) {
				if (pbSuccess) {
					util.Grid.setCellValue(app, "grdCsrPrzPnsh", "ST_DT", util.DataMap.getValue(app, "dmChgDate", "stDt"));
					util.Grid.setCellValue(app, "grdCsrPrzPnsh", "END_DT", util.DataMap.getValue(app, "dmChgDate", "endDt"));

				} else {
					util.Grid.setCellValue(app, "grdCsrPrzPnsh", "ST_DT", "");
					util.Grid.setCellValue(app, "grdCsrPrzPnsh", "END_DT", "");

				}
			});
			
		} else {
			util.Msg.alert("NLS-INF-M028");
		}
	};
	
	/**
	 * @desc 학년도, 학기에 해당하는 일자 셋팅
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 1. 29
	 */
	moPage.onValueChanged_RdSchYearRcd = function() {
		moPage.setDateForYearSmt();
	};
	
	/**
	 * @desc 학년도, 학기에 해당하는 일자 셋팅
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 1. 29
	 */
	moPage.onValueChanged_RdSmtRcd = function() {
		moPage.setDateForYearSmt();
	};
	
	/**
	 * @desc 수상/징계일자 수정시 유효시작일자, 유효종료일자 셋팅
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 1. 29
	 */
	moPage.onValueChanged_RdProcDt = function() {
		var vsProcDt		= util.Grid.getCellValue(app, "grdCsrPrzPnsh", "PROC_DT");
		var vsEfftStDt		= util.Grid.getCellValue(app, "grdCsrPrzPnsh", "EFFT_ST_DT");
		var vsEfftEndDt	= util.Grid.getCellValue(app, "grdCsrPrzPnsh", "EFFT_END_DT");

		util.Grid.setCellValue(app, "grdCsrPrzPnsh", "EFFT_ST_DT", vsProcDt);
		
		if(ValueUtil.isNull(vsEfftEndDt)){
			util.Grid.setCellValue(app, "grdCsrPrzPnsh", "EFFT_END_DT", "99991231");
		}
		
	};
	
	/**
	 * @desc 수상/징계일자와 유효시작일을 비교한다. 유효시작일이 이전 날짜이면 안된다.
	 * @param
	 * @return boolean 날짜 유효성 여부
	 * @author Choi In Seong 2016. 1. 29
	 */
	moPage.checkProcDtToEfftStDt = function(poRow) {
		var vbValid = true;

		var vsProcDt	= util.Grid.getCellValue(app, "grdCsrPrzPnsh", "PROC_DT");
		var vsEfftStDt	= util.Grid.getCellValue(app, "grdCsrPrzPnsh", "EFFT_ST_DT");

		if (!ValueUtil.isNull(vsProcDt) && !ValueUtil.isNull(vsEfftStDt)) {
			vsProcDt = moPage.addZoreDate(vsProcDt);
			vsEfftStDt = moPage.addZoreDate(vsEfftStDt);
			// localeCompare() - 같으면 0, 파라메타가 크면 -1, 파라메타가 작으면 1
			if (vsProcDt.localeCompare(vsEfftStDt) == 1) {
				util.Msg.alert("NLS-CSR-M015");
				util.Grid.setCellValue(app, "grdCsrPrzPnsh", "EFFT_ST_DT", "");
				vbValid = false;
			}
		}
		
		return vbValid;
	};
	
	/**
	 * @desc 유효시작일과 유효종료일을 비교한다. 유효종료일이 이후 날짜여야 한다.
	 * @param
	 * @return boolean 날짜 유효성 여부
	 * @author Choi In Seong 2016. 1. 29
	 */
	moPage.checkEfftBegDtToEfftEndDt = function() {
		var vsEfftEndDt	= util.Grid.getCellValue(app, "grdCsrPrzPnsh", "EFFT_END_DT");
		var vsEfftStDt		= util.Grid.getCellValue(app, "grdCsrPrzPnsh", "EFFT_ST_DT");
		
		if (!ValueUtil.isNull(vsEfftEndDt) && !ValueUtil.isNull(vsEfftStDt)) {
			vsEfftEndDt 	= moPage.addZoreDate(vsEfftEndDt);
			vsEfftStDt 		= moPage.addZoreDate(vsEfftStDt);
			// localeCompare() - 같으면 0, 파라메타가 크면 -1, 파라메타가 작으면 1
			if (vsEfftEndDt.localeCompare(vsEfftStDt) == - 1) {
				util.Msg.alert("NLS-CSR-M016");
				util.Grid.setCellValue(app, "grdCsrPrzPnsh", "EFFT_END_DT", "");
			}
		}
	};
	
	/**
	 * @desc //입력받은 날짜에 초를 000000으로 세팅
	 * @param psDate 시분초를 추가할 날짜
	 * @return vsDate 시분초가 추가된 날짜
	 * @author Choi In Seong 2016. 1. 29
	 */
	moPage.addZoreDate = function(psDate) {
		var vsDate = psDate.substring(0, 8);
		vsDate += "000000";
		return vsDate;
	};

	/**
	 * @desc 유효시작일자 유효성체크
	 * @param
	 * @return boolean 날짜 유효성 여부
	 * @author Choi In Seong 2016. 1. 29
	 */
	moPage.onValueChanged_RdEfftStDt = function() {
		moPage.checkEfftBegDtToEfftEndDt();
	};
	
	/**
	 * @desc 유효종료일자 유효성체크
	 * @param
	 * @return boolean 날짜 유효성 여부
	 * @author Choi In Seong 2016. 1. 29
	 */
	moPage.onValueChanged_RdEfftEndDt = function() {
		// 유효종료일이 유효시작일보다 빠를 수 없음
		moPage.checkEfftBegDtToEfftEndDt();
	};
	
	/**
	 * @desc 변경여부 반환
	 * @param 
	 * @return boolean 변경여부
	 * @author Choi In Seong 2016. 1. 29
	 */
	function doCheckDataChange() {
		if(util.Grid.isModified(app, ["grdCsrPrzPnsh"], "CRM") ){
			return false;
		}else{
			return true;
		}
	};
	
	/**
	 * @desc 상벌삭제
	 * @param 
	 * @return boolean 변경여부
	 * @author Choi In Seong 2016. 1. 29
	 */
	moPage.onClick_BtnDel = function() {
		if(util.Grid.getIndex(app, "grdCsrPrzPnsh")==0){
			moPage.parentSendMsg("lblTitleSubCsrPrzPnsh", NLS.INF.M005);
			return false;
		}else{
			util.Grid.deleteRow(app, "grdCsrPrzPnsh");
		}
	};
	
	moPage.onValueChanged_RhCkbSelect = function() {
//TO-BE: <ExtRepeat.selectedAllPanel> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.selectedAllPanel("rhCkbSelect");
	};
	
	moPage.onSetFocus_RdPrzPnshRcd = function() {
		util.Control.redraw(app, "rdPrzPnshRcd");
	};
	
	return moPage;
};
