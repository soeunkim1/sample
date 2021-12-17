//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
///<xtmlink path="./stdCsrCLicMattInfo.xtm"/>

var stdCsrCLicMattInfo = function() {

	var moPage = new Page();
	//임포트용 데이터 통신 오브젝트
	var moPObject = new PObject();

	var msStudId = "";
	
	/**
	 * @desc 서브페이지 임포트 온로드
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 3. 8
	 */
	moPage.onLoadImportDone_ImpSbpHeader = function() {
		doSbpHeaderOnLoad();
	}
	
	/**
	 * @desc 화면 온로드
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 3. 8
	 */
	moPage.onModelConstructDone_stdCsrCLicMattInfo = function() {

		//리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init("rptCsrLicMatt");

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
							moPage.parentSendMsg("lblTitleRptCsrLicMatt", NLS.INF.M024);
						}
					});
				}
			}
		});
	}

	/**
	 * @desc 자격증정보 조회
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 3. 8
	 */
	function doList(poCallBackFunc) {
		util.DataMap.setValue(app, "dmReqList", "strStudId", msStudId);
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdCsrLicMatt");
				util.Control.redraw(app, "lblRowCnt_rptCsrLicMatt");
			}
			// 조회 후 콜백함수 수행
			if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
		});
	}

	/**
	 * @desc 자격증정보 신규
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 3. 8
	 */
	moPage.onClick_BtnNew = function() {
		//해당 리피트 insertRow 후 편집 시작할 컬럼 지정
		util.Grid.insertRow(app, "grdCsrLicMatt");
		util.Grid.setCellValue(app, "grdCsrLicMatt", "STUD_ID", msStudId);
	};
	
	/**
	 * @desc 자격증정보 삭제
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 3.. 8
	 */
	moPage.onClick_BtnDel = function() {
		if(ValueUtil.isNull(util.Grid.getCheckOrSelectedRowIndex(app, "grdCsrLicMatt"))){
			moPage.parentSendMsg("lblTitleRptCsrLicMatt", NLS.INF.M005);
			return false;
		} else {
			util.Grid.deleteRow(app, "grdCsrLicMatt");
		}
	};
	
	/**
	 * @desc 자격증정보 작업취소
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 3. 8
	 */
	moPage.onClick_BtnRestore = function() {
		util.Grid.restoreRow(app, "grdCsrLicMatt");
	};
	
	/**
	 * @desc 자격증정보 작업저장버튼 클릭
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 3. 8
	 */
	moPage.onClick_BtnSave = function() {
		doSubSave();
	};

	/**
	 * @desc 자격증정보 저장
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 3. 8
	 */
	function doSubSave(poCallbackFunc) {
		
		// 리피터 변경사항 체크
		if(!util.Grid.isModified(app, ["grdCsrLicMatt"], null)){
			moPage.parentSendMsg("lblTitleRptCsrLicMatt",NLS.WRN.M007);
			if(util.isFunc(poCallbackFunc)) poCallbackFunc(false);
			return false;
		}
		//리피트 validation check
		if(!util.validate(app, "grdCsrLicMatt")){
			if(util.isFunc(poCallbackFunc)) poCallbackFunc(false);
			return false;
		}

		//strCommand: save 
		util.Submit.send(app, "subSave", function(pbSuccessSave) {
				if(pbSuccessSave) {
					var vsLastSerialNo = util.DataMap.getValue(app, "dmResList", "strLastSerialNo");
					//마지막 순번있으면 포커싱 가도록
					if(vsLastSerialNo!=""){
						ExtRepeat.setPkValues("rptCsrLicMatt", vsLastSerialNo);
					}
					
					//저장성공 메세지 출력
					doList(function(pbSuccessList) {
						// 조회 : "조회되었습니다." header 메세지 표시
						if(pbSuccessList) {
							moPage.parentSendMsg("lblTitleRptCsrLicMatt",NLS.INF.M025);
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
	 * @author Choi In Seong 2016. 3. 8
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
	 * @author Choi In Seong 2016. 3. 8
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
	 * @author Choi In Seong 2016. 3. 8
	 */
	function doCheckDataChange() {
		if(util.Grid.isModified(app, ["grdCsrLicMatt"], "CRM") ){
			return false;
		}else{
			return true;
		}
	};

	return moPage;
};

