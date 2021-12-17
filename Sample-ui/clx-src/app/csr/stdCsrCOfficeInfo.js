//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
///<xtmlink path="./stdCsrCOfficeInfo.xtm"/>

var stdCsrCOfficeInfo = function() {

	var moPage = new Page();
	//임포트용 데이터 통신 오브젝트
	var moPObject = new PObject();
	
	var msStudId = "";
	
	/**
	 * @desc 서브페이지 임포트 온로드
	 * @return 
	 * @author Choi In Seong. 2016.03.03
	 */
	moPage.onLoadImportDone_ImpSbpHeader = function() {
		doSbpHeaderOnLoad();
	}

	/**
	 * @desc 화면 온로드
	 * @return 
	 * @author Choi In Seong. 2016.03.03
	 */
	moPage.onModelConstructDone_stdCsrCOffice = function() {

		//리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init("rptCsrOfficeInfo");

		//서브미션 실행 (실패시 cover page)
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				
				util.Control.redraw(app, ["rptCsrOfficeInfo"]);
				
				// 부모멤버변수에담긴학번받음
				msStudId = moPage.parent.moParentObj.studId;
				if (ValueUtil.isNull(msStudId)) {
					return false;
				}else{
					doList(function(pbSuccess) {
						// 조회 : "조회되었습니다." header 메세지 표시
						if(pbSuccess) {
							moPage.parentSendMsg("lblTitleRptCsrOfficeInfo", NLS.INF.M024);
						}
					});
				}
			}
		});
	}

	/**
	 * @desc 직장정보 조회
	 * @param 
	 * @return void
	 * @author Choi In Seong. 2016.03.03
	 */
	function doList(poCallBackFunc) {
		util.DataMap.setValue(app, "dmReqList", "strStudId", msStudId);
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdCsrOfficeInfo");
				util.Control.redraw(app, ["lblRowCnt_rptCsrOfficeInfo"]);
				// 조회 후 콜백함수 수행
				if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
			}
		});
	}
	
   /**
	 * @desc 직장정보 신규
	 * @param
	 * @return void
	 * @author Choi In Seong. 2016.03.03
	 */
	moPage.onClick_BtnNew = function() {
		//해당 리피트 insertRow 후 편집 시작할 컬럼 지정
		util.Grid.insertRow(app, "grdCsrOfficeInfo");
		util.Grid.setCellValue(app, "grdCsrOfficeInfo", "STUD_ID", msStudId);
		util.Grid.setCellValue(app, "grdCsrOfficeInfo", "ONOFFI_END_DT", "99991231");
	};

   /**
	 * @desc 직장정보 삭제
	 * @param
	 * @return void
	 * @author Choi In Seong. 2016.03.03
	 */
	moPage.onClick_BtnDel = function() {
		if(util.Grid.getIndex(app, "grdCsrOfficeInfo")==0){
			//건수가 없을 경우 부모창에 메시지를 뿌림
			moPage.parentSendMsg("lblTitleRptCsrOfficeInfo", NLS.INF.M005);
			return false;
		}else{
			util.Grid.deleteRow(app, "grdCsrOfficeInfo");
		}
	};

   /**
	 * @desc 직장정보 작업취소
	 * @param
	 * @return void
	 * @author Choi In Seong. 2016.03.03
	 */
	moPage.onClick_BtnRestore = function() {
		util.Grid.restoreRow(app, "grdCsrOfficeInfo");
	};

   /**
	 * @desc 직장정보 저장
	 * @param
	 * @return void
	 * @author Choi In Seong. 2016.03.03
	 */
	moPage.onClick_BtnSave = function() {
		doSubSave();
	};

	/**
	 * @desc 
	 * @param 
	 * @return 
	 * @author Choi In Seong. 2016.03.03
	 */
	function doSubSave(poCallbackFunc) {

		// 리피터 변경사항 체크
		if(!util.Grid.isModified(app, ["grdCsrOfficeInfo"], null)){
			moPage.parentSendMsg("lblTitleRptCsrOfficeInfo",NLS.WRN.M007);
			if(util.isFunc(poCallbackFunc)) poCallbackFunc(false);
			return false;
		}
		
		//리피트 validation check
		if(!util.validate(app, "grdCsrOfficeInfo")){
			if(util.isFunc(poCallbackFunc)) poCallbackFunc(false);
			return false;
		}
		
		//strCommand: save 
		util.Submit.send(app, "subSave", function(pbSuccessSave) {
				if(pbSuccessSave) {
					var vsLastSerialNo = util.DataMap.getValue(app, "dmResList", "strLastSerialNo");
					//마지막 순번있으면 포커싱 가도록
					if(vsLastSerialNo!=""){
						ExtRepeat.setPkValues("rptCsrOfficeInfo", vsLastSerialNo);
					}
					
					//저장성공 메세지 출력
					doList(function(pbSuccessList) {
						// 조회 : "조회되었습니다." header 메세지 표시
						if(pbSuccessList) {
							moPage.parentSendMsg("lblTitleRptCsrOfficeInfo",NLS.INF.M025);
						}
						if(util.isFunc(poCallbackFunc))	poCallbackFunc(pbSuccessList);
					});
				}
			}
		);
	}

	/**
	 * @desc 리피트 panel click event
	 * @param
	 * @return void
	 * @author Choi In Seong. 2016.03.03
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
	 * @author Choi In Seong. 2016.03.03
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
	 * @author Choi In Seong. 2016.03.03
	 */
	function doCheckDataChange() {
		if(util.Grid.isModified(app, ["grdCsrOfficeInfo"], "CRM") ){
			return false;
		}else{
			return true;
		}
	};
	
	return moPage;
};

