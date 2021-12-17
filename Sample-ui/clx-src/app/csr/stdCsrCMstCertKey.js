//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
///<xtmlink path="./stdCsrCMstCertKey.xtm"/>

var stdCsrCMstCertKey = function() {

	var moPage = new Page();
	//임포트용 데이터 통신 오브젝트
	var moPObject = new PObject();

	var msStudId = "";
	
	/**
	 * @desc  Header Import onLoad
	 * @return void
     * @author Choi In Seong 2016. 6. 20
     */
	moPage.onLoadImportDone_ImpSbpHeader = function() {
		doSbpHeaderOnLoad();
	};	
				
	/**
	 * @desc 화면 온로드
	 * @return 
	 * @author Choi In Seong 2016. 6. 20
	 */
	moPage.onModelConstructDone_stdCsrCMstCertKey = function() {
	
	//리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init("rptCsrCertKey");

		//서브미션 실행 (실패시 cover page)
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				
				var voParentPage = ExtSubPage.getParent();
				
				// 부모멤버변수에담긴학번받음
				msStudId = moPage.parent.moParentObj.studId;
				if (ValueUtil.isNull(msStudId)) {
					return false;
				}else{
					doList(function(pbSuccess) {
						// 조회 : "조회되었습니다." header 메세지 표시
						if(pbSuccess) {
							moPage.parentSendMsg("lblTitleRptCsrCertKey", NLS.INF.M024);
						}
					});
				}
			}
		});
	}

	/**
	 * @desc 동일한 ID유형의 레코드를 생성하는지 체크
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 6. 20
	 */
	function doCheckDuplId() {
		
		var voGrxMst = ExtControl.getControl("rptCsrCertKey");
		
		var vnCnt = util.Grid.getRowCount(app, "grdCsrCertKey");
		var ipinCnt = 0;
		var prvCnt = 0;
		
		// 같은 id유형이 2개 이상일 수 없다. (삭제 플래그가 있는것 제외)	
		for (var i = 1; i <= vnCnt; i++) {
			
			var vsCertKeyUptStatus = util.Grid.getCellValue(app, "grdCsrCertKey", "UPT_STATUS", i);
			var vsCertKeyIdTypeRcd = util.Grid.getCellValue(app, "grdCsrCertKey", "ID_TYPE_RCD", i);
			
			if (vsCertKeyUptStatus != "D") {
				if (vsCertKeyIdTypeRcd == "CB01701") {
					ipinCnt++;
				}
				if (vsCertKeyIdTypeRcd == "CB01702") {
					prvCnt++;
				}
			}
		}
		
		// 동일한 ID유형의 레코드를 생성하는지 체크
		if (ipinCnt >= 2 || prvCnt >= 2) {
			//동일한 유형의 ID를 중복 생성 할 수 없습니다.
			moPage.parentSendMsg("lblTitleRptCsrCertKey", NLS.CSR.EXT022);
			return false;
		}
		return true;
	};
	
	/**
	 * @desc 식별키정보 조회
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 6. 20
	 */
	function doList(poCallBackFunc) {
		util.DataMap.setValue(app, "dmReqList", "strStudId", msStudId);
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdCsrCertKey");
				util.Control.redraw(app, "lblRowCnt_rptCsrCertKey");
			}
			// 조회 후 콜백함수 수행
			if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
		});
	}
	
	/**
	 * @desc 식별키정보 신규
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 6. 20
	 */
	moPage.onClick_BtnNew = function() {
		var strKeyDate = util.DataMap.getValue(app, "dmResOnLoad", "strKeyDate");
		//해당 리피트 insertRow 후 편집 시작할 컬럼 지정
		util.Grid.insertRow(app, "grdCsrCertKey");
		util.Grid.setCellValue(app, "grdCsrCertKey", "STUD_ID", msStudId);
		util.Grid.setCellValue(app, "grdCsrCertKey", "ID_ISSUE_DT", strKeyDate);
		util.Grid.setCellValue(app, "grdCsrCertKey", "ST_DT", strKeyDate);
		util.Grid.setCellValue(app, "grdCsrCertKey", "END_DT", "99991231000000");
	};

	/**
	 * @desc 식별키정보 삭제
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 6. 20
	 */
	moPage.onClick_BtnDel = function() {
		if(ValueUtil.isNull(util.Grid.getCheckOrSelectedRowIndex(app, "grdCsrCertKey"))){
			moPage.parentSendMsg("lblTitleRptCsrCertKey", NLS.INF.M005);
			return false;
		} else {
			util.Grid.deleteRow(app, "grdCsrCertKey");
		}
	};

	/**
	 * @desc 식별키정보 작업취소
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 6. 20
	 */
	moPage.onClick_BtnRestore = function() {
		util.Grid.restoreRow(app, "grdCsrCertKey");
	};

	/**
	 * @desc 식별키정보 작업저장버튼 클릭
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 6. 20
	 */
	moPage.onClick_BtnSave = function() {
		doSubSave();
	};
	
	/**
	 * @desc 식별키정보 저장
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 6. 20
	 */
	function doSubSave(poCallbackFunc) {
		
		// 리피터 변경사항 체크
		if(!util.Grid.isModified(app, ["grdCsrCertKey"], null)){
			moPage.parentSendMsg("lblTitleRptCsrCertKey",NLS.WRN.M007);
			if(util.isFunc(poCallbackFunc)) poCallbackFunc(false);
			return false;
		}
		//리피트 validation check
		if(!util.validate(app, "grdCsrCertKey")){
			if(util.isFunc(poCallbackFunc)) poCallbackFunc(false);
			return false;
		}
		
		var vbValid = true;
		
		if(!moPage.doCheckDuplId()) vbValid = false;
		
		if(!vbValid) {
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
							moPage.parentSendMsg("lblTitleRptCsrCertKey",NLS.INF.M025);
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
	 * @author Choi In Seong 2016. 6. 20
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
	 * @author Choi In Seong 2016. 6. 20
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
	 * @author Choi In Seong 2016. 6. 20
	 */
	function doCheckDataChange() {
		if(util.Grid.isModified(app, ["grdCsrCertKey"], "CRM") ){
			return false;
		}else{
			return true;
		}
	};
	
	
	return moPage;
};

