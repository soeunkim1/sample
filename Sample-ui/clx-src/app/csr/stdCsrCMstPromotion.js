//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
///<xtmlink path="./stdCsrCMstPromotion.xtm"/>

var stdCsrCMstPromotion = function() {

	var moPage = new Page();
	//임포트용 데이터 통신 오브젝트
	var moPObject = new PObject();

	var msStudId = "";
	
	var viBefIndex = 0;
	var vsBefPromTgtRcd = "";
	/**
	 * @desc  subpage Import onLoad
	 * @return void
     * @author Choi In Seong at 2016.02.12
     */
	moPage.onLoadImportDone_ImpSbpHeader = function() {
		doSbpHeaderOnLoad();
	}

	/**
	 * @desc 화면 온로드 전 코드 호출
	 * @return 
	 * @author Choi In Seong 2016.02.12
	 */
	moPage.onModelConstruct_StdCsrCMstPromotion = function() {
		
		// 부모멤버변수에담긴학번받음
		msStudId = moPage.parent.moParentObj.studId;
		
		util.DataMap.setValue(app, "dmReqKey", "strStudId", msStudId);
		
		//서브미션 실행 (실패시 cover page) 
		// onModelConstruct에서 서브미션 호출시 동기화 방식으로 호출 
		ExtSubmission.sendEx("subOnLoad", "onLoad");
	};
				
	/**
	 * @desc 화면 온로드
	 * @return 
	 * @author Choi In Seong 2016.02.12
	 */
	moPage.onModelConstructDone_stdCsrCMstPromotion = function() {
		
		//리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init("rptCsrPromotion");
		
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grpData"]);
		
		util.Control.redraw(app, ["rptCsrPromotion", "cbbPromTgtRcd"]);
		
		util.Header.clickSearch(app);
	}

	/**
	 * @desc 진급정보 조회
	 * @param poCallBackFunc 콜백함수
	 * @return 
	 * @author Choi In Seong 2016.02.12
	 */
	function doList(poCallBackFunc) {

		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdCsrPromotion");
				util.Control.redraw(app, "cbbPromTgtRcd");
//TO-BE: <ExtControl.refreshBind> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//				ExtControl.refreshBind("binEditRow");
				doCheckNewData();
			}
			// 조회 후 콜백함수 수행
			if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
		});
	}
	
	/**
	 * @desc 조회버튼 클릭
	 * @param  
	 * @return 
	 * @author Choi In Seong 2016.02.12
	 */
	moPage.onClick_BtnSearch = function() {
		doList(function(pbSuccess) {
			// 조회 : "조회되었습니다." header 메세지 표시
			if(pbSuccess) moPage.parentSendMsg("lblTitleRptCsrPromotion", NLS.INF.M024);
		});
	}
	

   /**
	 * @desc 작업저장 버튼 클릭
	 * @return void
	 * @author Choi In Seong 2016.02.12
	 */
	moPage.onClick_BtnSave = function() {
		doSubSave();
	};

	/**
	 * @desc 작업저장
	 * @param poCallbackFunc 콜백함수
	 * @return Boolean
	 * @author Choi In Seong 2016. 2. 12
	 */
	function doSubSave(poCallbackFunc) {
		// 리피터 변경사항 체크
		if(!util.Grid.isModified(app, ["grdCsrPromotion"], null)){
			moPage.parentSendMsg("lblTitleRptCsrPromotion",NLS.WRN.M007);
			if(util.isFunc(poCallbackFunc)) poCallbackFunc(false);
			return false;
		}
		//리피트 validation check
		if(!util.validate(app, "grdCsrPromotion")){
			if(util.isFunc(poCallbackFunc)) poCallbackFunc(false);
			return false;
		}
		
		//strCommand: save 
		util.Submit.send(app, "subSave", function(pbSuccessSave) {
				if(pbSuccessSave) {
					var voCallBackSaveAfter = function(pbSuccessAfter) {
						if(pbSuccessAfter) {
							//저장성공 메세지 출력
							// 조회 : "조회되었습니다." header 메세지 표시
							moPage.parentSendMsg("lblTitleRptCsrPromotion",NLS.INF.M025);
						}
						if(util.isFunc(poCallbackFunc))	poCallbackFunc(pbSuccessList);
					};
					ExtSubPage.getParent().callScript("doSaveAfter", voCallBackSaveAfter);
				}
			}
		);
	};

	/**
	 * @desc 리피트 panel click event
	 * @param
	 * @return void
	 * @author Choi In Seong 2016.02.12
	 */
	moPage.onValueChanged_RhCkbSelect = function() {
//TO-BE: <ExtRepeat.selectedAllPanel> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.selectedAllPanel("rhCkbSelect");
	};

	/**
	 * @desc 부모 헤더에 메세지 뿌리기
	 * @param psCtrlId 리피트 라벨 id
	 * @param psMsgCode 메시지
	 * @return void
	 * @author Choi In Seong 2016. 1. 20
	 */
	moPage.parentSendMsg = function(psCtrlId, psMsgCodeNm) {
		var vsMsg = ExtControl.getTextValue(psCtrlId);
		vsMsg     = "[" + vsMsg + "]";
	
		util.Msg.notify(app, vsMsg + psMsgCodeNm);	
	};
	
	/**
	 * @desc 표준학기 날자 반환
	 * @param
	 * @return void
	 * @author Choi In Seong 2016.02.12
	 */
	function doSetNewDate() {
		
		var vsSeledYear = util.Grid.getCellValue(app, "grdCsrPromotion", "SCH_YEAR_RCD");	
		var vsSeledSmt  = util.Grid.getCellValue(app, "grdCsrPromotion", "SMT_RCD");	

		if (ValueUtil.isNull(vsSeledYear) || ValueUtil.isNull(vsSeledSmt)) return false;
				
		util.DataMap.setValue(app, "dmSessionDate", "year", vsSeledYear);
		util.DataMap.setValue(app, "dmSessionDate", "smt", vsSeledSmt);					
		// 표준학기 날짜 조회
		//strCommand: getDateFromSession 
		util.Submit.send(app, "subDate", function(pbSuccess) {
				if(pbSuccess) {
					
					var vsStDt = util.DataMap.getValue(app, "dmSessionDate", "stDate");
					var vsEndDt = util.DataMap.getValue(app, "dmSessionDate", "endDate");
					// 표준학기 날짜가 없으면 초기화
					if(ValueUtil.isNull(vsStDt) || ValueUtil.isNull(vsEndDt)) {
						doClearDateClt();
						return false;
					}
					
					//날짜 정합성check
					var vnRptIndex = util.Grid.getIndex(app, "grdCsrPromotion");
					var vsPromTgtRcd = util.Grid.getCellValue(app, "grdCsrPromotion", "PROM_TGT_RCD");
					var vbCheckDate = moPage.doChekKeyDate("rptCsrPromotion", vsPromTgtRcd, vsStDt);
					if (vbCheckDate) {
						vsStDt = util.DataMap.getValue(app, "dmSessionDate", "stDate");
						util.Grid.setCellValue(app, "grdCsrPromotion", "ST_DT", vsStDt);
						util.Grid.setCellValue(app, "grdCsrPromotion", "END_DT", "99991231000000");
						
						var vsPath = "/root/resList/rptCsrPromotion/row[ child:: PROM_TGT_RCD ='"+vsPromTgtRcd+"' and UPT_STATUS != 'N' ]";
