//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
///<xtmlink path="./stdCsrCMstStudGrp.xtm"/>

var stdCsrCMstStudGrp = function() {

	var moPage = new Page();
	//임포트용 데이터 통신 오브젝트
	var moPObject = new PObject();

	var msStudId = "";
	
	/**
	 * @desc  Header Import onLoad
	 * @return void
     * @author Choi In Seong 2016. 6. 21
     */
	moPage.onLoadImportDone_ImpSbpHeader = function() {
		doSbpHeaderOnLoad();
	}
	
	/**
	 * @desc 화면 온로드
	 * @return 
	 * @author Choi In Seong 2016. 6. 21
	 */
	moPage.onModelConstructDone_stdCsrCMstStudGrp = function() {
	
		//리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init("rptCsrStudGrp");

		// 검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grp_rptCsrStudGrp"]);
		
		//서브미션 실행 (실패시 cover page)
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				setUnitSystem("CSR");
				
				util.Control.redraw(app, ["dipKeyDate"]);
				util.Control.setEnable(app, ["dipKeyDate"], false);
				var voParentPage = ExtSubPage.getParent();
				
				// 부모멤버변수에담긴학번받음
				msStudId = moPage.parent.moParentObj.studId;
				if (ValueUtil.isNull(msStudId)) {
					return false;
				}else{
					//LIST CALL 
					util.Header.clickSearch(app);
				}
			}
		});
	}

	/**
	 * @desc 조회버튼 클릭
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 6. 21
	 */
	moPage.onClick_BtnSearch = function() {
		// 조회조건 필수 체크
		if(!util.validate(app, ["dipKeyDate"])){
			return false;
		}
		doList(function(pbSuccess) {
			// 조회 : "조회되었습니다." header 메세지 표시
			if(pbSuccess) {
				moPage.parentSendMsg("lblTitleRptCsrStudGrp", NLS.INF.M024);
			}
		});
	};
	
	/**
	 * @desc 학생그룹조회
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 6. 21
	 */
	function doList(poCallBackFunc) {
		
		util.DataMap.setValue(app, "dmReqList", "strStudId", msStudId);

		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdCsrStudGrp");
				util.Control.redraw(app, "lblRowCnt_rptCsrStudGrp");
			}
			// 조회 후 콜백함수 수행
			if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
		});
	}

	/**
	 * @desc 기간중복 체크
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 6. 21
	 */
	function doDateValidation(poRow){
		var vbValid = true;
		
		var vsGrpPrpRcd = util.Grid.getCellValue(app, "grdCsrStudGrp", "GRP_PRP_RCD");
		var vsStDt = util.Grid.getCellValue(app, "grdCsrStudGrp", "ST_DT");
		var vsEndDt = util.Grid.getCellValue(app, "grdCsrStudGrp", "END_DT");
		
		var vcRpt = ExtControl.getControl("rptCsrStudGrp");
		var vnIndex = vcRpt.getIndex() ;
		 
		var vnRowCnt = util.Grid.getRowCount(app, "grdCsrStudGrp")
		
		for (var i = 1 ; i <= vnRowCnt ; i++) {
			
			if (vnIndex == i) continue;
			if(vsGrpPrpRcd != util.Grid.getCellValue(app, "grdCsrStudGrp", "GRP_PRP_RCD", i)) continue;
			if(util.Grid.getCellValue(app, "grdCsrStudGrp", "UPT_STATUS", i) == "D") continue;
			
			var vsComStDt = util.Grid.getCellValue(app, "grdCsrStudGrp", "ST_DT", i);
			var vsComEndDt = util.Grid.getCellValue(app, "grdCsrStudGrp", "END_DT", i);
			
			//포함할경우
			if (vsStDt <= vsComStDt && vsEndDt >= vsComEndDt) {
				vbValid = false;
				break;
			}
			
			if (vsComStDt <= vsStDt && vsStDt <= vsComEndDt) {
				vbValid = false;
				break;
			}
			
			if (vsComStDt <= vsEndDt && vsEndDt <= vsComEndDt) {
				vbValid = false;
				break;
			}
		}
		
		if(!vbValid) {
			util.Grid.setCellValue(app, "grdCsrStudGrp", "GRP_PRP_RCD", "");
			moPage.parentSendMsg("lblTitleRptCsrStudGrp", NLS.CSR.EXT023);
		}
		return vbValid;
	};
	
	/**
	 * @desc 부모 헤더에 메세지 뿌리기
	 * @param psCtrlId 
	 * @param psMsgCode 
	 * @return void
	 * @author Choi In Seong 2016. 6. 21
	 */
	moPage.parentSendMsg = function(psCtrlId, psMsgCodeNm) {
		var vsMsg = ExtControl.getTextValue(psCtrlId);
		vsMsg     = "[" + vsMsg + "]";
	
		util.Msg.notify(app, vsMsg + psMsgCodeNm);	
	};
	
	/**
	 * @desc 변경여부 반환
	 * @param 
	 * @return boolean 변경여부
	 * @author Choi In Seong 2016. 6. 21
	 */
	function doCheckDataChange() {
		if(util.Grid.isModified(app, ["grdCsrStudGrp"], "CRM") ){
			return false;
		}else{
			return true;
		}
	};

	/**
	 * @desc 학생그룹 신규
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 6. 21
	 */
	moPage.onClick_BtnNew = function() {
		var strKeyDate = util.DataMap.getValue(app, "dmResOnLoad", "strKeyDate");
		//해당 리피트 insertRow 후 편집 시작할 컬럼 지정
		util.Grid.insertRow(app, "grdCsrStudGrp");
		util.Grid.setCellValue(app, "grdCsrStudGrp", "STUD_ID", msStudId);

		var vsStDt = "";
		var vsEndDt = "";
		// 학기 시작일, 종료일을 가져온다.
		vsStDt = getKeyDateCond("/strStDt");
		if(!ValueUtil.isNull(vsStDt)){
			vsEndDt = getKeyDateCond("/strEndDt");
		}
	
		if(ValueUtil.isNull(vsStDt)) {
			vsStDt = util.DataMap.getValue(app, "dmReqList", "strKeyDate");
		}
		
		if(ValueUtil.isNull(vsEndDt)) {
			vsEndDt = util.DataMap.getValue(app, "dmReqList", "strEndDate");
		}
		
		util.Grid.setCellValue(app, "grdCsrStudGrp", "ST_DT", vsStDt);
		util.Grid.setCellValue(app, "grdCsrStudGrp", "END_DT", vsEndDt);

	};

	/**
	 * @desc 학생그룹 삭제
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 6. 21
	 */
	moPage.onClick_BtnDel = function() {
		if(ValueUtil.isNull(util.Grid.getCheckOrSelectedRowIndex(app, "grdCsrStudGrp"))){
			moPage.parentSendMsg("lblTitleRptCsrStudGrp", NLS.INF.M005);
			return false;
		} else {
			util.Grid.deleteRow(app, "grdCsrStudGrp");
		}
	};

	/**
	 * @desc 학생그룹 작업취소
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 6. 21
	 */
	moPage.onClick_BtnRestore = function() {
		util.Grid.restoreRow(app, "grdCsrStudGrp");
	};

	/**
	 * @desc 학생그룹 작업저장버튼 클릭
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 6. 21
	 */
	moPage.onClick_BtnSave = function() {
		doSubSave();
	};
	
	/**
	 * @desc 학생그룹 저장
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 6. 21
	 */
	function doSubSave(poCallbackFunc) {
		
		// 리피터 변경사항 체크
		if(!util.Grid.isModified(app, ["grdCsrStudGrp"], null)){
			moPage.parentSendMsg("lblTitleRptCsrStudGrp",NLS.WRN.M007);
			if(util.isFunc(poCallbackFunc)) poCallbackFunc(false);
			return false;
		}
		//리피트 validation check
		if(!util.validate(app, "grdCsrStudGrp")){
			if(util.isFunc(poCallbackFunc)) poCallbackFunc(false);
			return false;
		}

		//strCommand: save 
		util.Submit.send(app, "subSave", function(pbSuccessSave) {
				if(pbSuccessSave) {
					
					//저장성공 메세지 출력
					doList(function(pbSuccessList) {
						// 조회 : "조회되었습니다." header 메세지 표시
						if(pbSuccessList) {
							moPage.parentSendMsg("lblTitleRptCsrStudGrp",NLS.INF.M025);
						}
						if(util.isFunc(poCallbackFunc))	poCallbackFunc(pbSuccessList);
					});
				}
			}
		);
	};

	/**
	 * @desc 리피트 panel click event
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 6. 21
	 */
	moPage.onValueChanged_RhCkbSelect = function() {
//TO-BE: <ExtRepeat.selectedAllPanel> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.selectedAllPanel("rhCkbSelect");
	};

	/**
	 * @desc 부모 헤더에 메세지 뿌리기
	 * @param psCtrlId 
	 * @param psMsgCode 
	 * @return void
	 * @author Choi In Seong 2016. 6. 21
	 */
	moPage.parentSendMsg = function(psCtrlId, psMsgCodeNm) {
		var vsMsg = ExtControl.getTextValue(psCtrlId);
		vsMsg     = "[" + vsMsg + "]";
	
		util.Msg.notify(app, vsMsg + psMsgCodeNm);	
	};
	
	/**
	 * @desc 변경여부 반환
	 * @param 
	 * @return boolean 변경여부
	 * @author Choi In Seong 2016. 6. 21
	 */
	function doCheckDataChange() {
		if(util.Grid.isModified(app, ["grdCsrStudGrp"], "CRM") ){
			return false;
		}else{
			return true;
		}
	};
	
	moPage.onClick_BtnYearSmt = function() {
		doOnclickSchYearSmt("dipKeyDate","impSchYearSmt");
	};
	
	/**
	 * @desc 그룹용도코드 변경시 날짜 체크
	 * @param 
	 * @return boolean 변경여부
	 * @author Choi In Seong 2016. 6. 21
	 */	
	moPage.onValueChanged_RdCbbGrpPrpRcd = function() {
		doDateValidation();
	};
	return moPage;
};

