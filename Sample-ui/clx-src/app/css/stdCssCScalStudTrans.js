//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./stdCssCScalStudTrans.xtm"/>


var stdCssCScalStudTrans = function() {
	var moPage = new Page();
	//임포트용 데이터 통신 오브젝트
	var moPObject = new PObject();
	
	/**
	 * doOnLoad  화면 오픈 시 서브미션 
	 * @member stdCssCScalStudTrans
	 * @type void
	 * @author AeyoungLee 2016. 4. 29.
	 */
	function doOnLoad(){
		//리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["rptScalStudTrans"]);
		
		// 부모창에 있는 값 셋팅
		var voParentInfo = moPage.parent.moCmnInfo;
		
		util.DataMap.setValue(app, "dmSchedule", "strSchYearRcd", voParentInfo.schYearRcd);
		util.DataMap.setValue(app, "dmSchedule", "strSmtRcd"	  , voParentInfo.smtRcd);
		util.DataMap.setValue(app, "dmSchedule", "strStDt"	  , voParentInfo.stDt);
		util.DataMap.setValue(app, "dmSchedule", "strEndDt"	  , voParentInfo.endDt);
		util.DataMap.setValue(app, "dmReqKey", "strStudId"	 		  , voParentInfo.studId);
		
		// 조회
		doList(function(pbSuccess) {
			if (pbSuccess){
				// "조회되었습니다."
				this.setParentMsg(NLS.INF.M024);		
			}
		});
	};

	/**
	 * @desc 장학금환수를 조회한다.
	 * @member stdCssCScalStudTrans
	 * @param poCallBackFunc 콜백 함수
	 * @return void
	 * @author Aeyoung Lee 2016. 4. 29.
	 */
	function doList(poCallBackFunc) {
		
		//strCommand: onLoadTrans 
		util.Submit.send(app, "subOnLoad", function(pbSuccess) {
			if (pbSuccess) {
				util.Control.redraw(app, ["rptScalStudTrans"]);
			}
			
			if(util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
		});
	};
	
	/**
	 * onClick_BtnNew 신규버튼 클릭이벤트
	 * @member stdCssCScalStudTrans
	 * @type void
	 * @author AeyoungLee 2016. 4. 29.
	 */	
	moPage.onClick_BtnNew = function(){
		var vnNewRow = util.Grid.insertRow(app, "grdScalStudTrans", "rdBtnScalStudSearch");
		
		util.Grid.setCellValue(app, "grdScalStudTrans", "STUD_ID"	  , util.DataMap.getValue(app, "dmReqKey", "strStudId"), vnNewRow);
		util.Grid.setCellValue(app, "grdScalStudTrans", "SCH_YEAR_RCD" , util.DataMap.getValue(app, "dmSchedule", "strSchYearRcd"), vnNewRow);
		util.Grid.setCellValue(app, "grdScalStudTrans", "SMT_RCD"	  , util.DataMap.getValue(app, "dmSchedule", "strSmtRcd"), vnNewRow);
		util.Grid.setCellValue(app, "grdScalStudTrans", "PROC_TYPE_RCD", "CH303TRN", vnNewRow);
	};
	
	/**
	 * @desc 삭제버튼 클릭 이벤트
	 * @member stdCssCScalStudTrans
	 * @return void
	 * @author Aeyoung Lee 2016. 4. 29.
	 */
	moPage.onClick_BtnDel = function() {
		var vnRowIdx = util.Grid.getCheckOrSelectedRowIndex(app, "grdScalStudTrans");
		if(ValueUtil.isNull(vnRowIdx)){
			var vsMsgParam = util.Grid.getTitle(app, "grdScalStudTransScalStudTrans");
			// "@(을)를 선택해주세요" 메시지 출력
			util.Msg.alert("NLS-INF-M045", [vsMsgParam]);
			return;
		}	
		
		util.Grid.deleteRow(app, "grdScalStudTrans");
	};
	
	/**
	 * onClick_BtnRestore 작업취소버튼 클릭이벤트
	 * @member stdCssCScalStudTrans
	 * @type void
	 * @author AeyoungLee 2016. 4. 29.
	 */	
	moPage.onClick_BtnRestore = function(){
		util.Grid.restoreRow(app, "grdScalStudTrans");
	};

	 /**
	 * onClick_BtnSave 작업저장버튼 클릭이벤트
	 * @member stdCssCScalStudTrans
	 * @type void
	 * @author AeyoungLee 2016. 4. 29.
	 */
	moPage.onClick_BtnSave = function(){
		// 변경사항 체크
		if(!util.Grid.isModified(app, ["grdScalStudTrans"], null)){
			moPage.setParentMsg(NLS.WRN.M007);
			return false;
		}
		
		// Validation Check
		if(!util.validate(app, ["grdScalStudTrans"])) return false;
		
		// 처리상태가 완료일경우 처리일 필수체크
		if(!doChkProcDt()){
			//처리상태가 완료인경우 처리일을 입력해야 합니다.
			util.Msg.alert("NLS-CSS-M025");
			return false;
		}	
		
		// 저장서브미션
		//strCommand: save 
		util.Submit.send(app, "subSave", function(pbSuccess) {
			if(pbSuccess){				
				 //저장성공 메세지 출력
				doList(function(pbSuccessList) {
					// "갱신된 데이터가 조회되었습니다."
					if(pbSuccessList) {
						this.setParentMsg(NLS.INF.M025);
					}
				});
			}
		});
	};

	/**
	 * doChkProcDt 처리상태가 완료일경우 처리일 필수처리
	 * @member stdCssCScalStudTrans
	 * @type void
	 * @author AeyoungLee 2016. 4. 29.
	 */	
	function doChkProcDt(){
		var vbChked = true;
		for (var i = 1; i <= util.Grid.getRowCount(app, "grdScalStudTrans"); i++) {
			var vsProcStat = util.Grid.getCellValue(app, "grdScalStudTrans", "PROC_STAT_RCD", i);
			var vsProcPlanDt = util.Grid.getCellValue(app, "grdScalStudTrans", "PROC_DT", i);
			var vbUptStatus = util.Grid.getRowState(app, "grdScalStudTrans", i);
			
			if(vbUptStatus != "delete" && vsProcStat == "CH30402" && ValueUtil.isNull(vsProcPlanDt)){
				vbChked = false;
				break;
			}
		}
		return vbChked;
	};
	
	/**
	 * onValueChanged_RptCssCntiScalStud 장학금환수 변경 이벤트
	 * @member stdCssCScalStudTrans
	 * @type void
	 * @author AeyoungLee 2016. 4. 29.
	 */	
	moPage.onValueChanged_RptScalStudRcc = function(psColDiv){
		
		var vnIdx = util.Grid.getIndex(app, "grdScalStudTrans");
		
		if(psColDiv == "AMT"){
			var vsValue = util.Grid.getCellValue(app, "grdScalStudTrans", psColDiv, vnIdx);
			
			if (vsValue <= 0) {
				util.Msg.alert("NLS-CRS-M006", [NLS.NSCR.CARRIEDAMT]);
				util.Grid.setCellValue(app, "grdScalStudTrans", "AMT", "", vnIdx);
			}
			
			ExtRepeat.refresh("rptScalStudTrans");
        }
		
	};
	
	/**
	 * @desc 순번에 따른 지급순번을 셋팅
	 * @member stdCssCScalStudTrans
	 * @param pnRowIdx 
	 * @return void
	 * @author Aeyoung Lee 2016. 4. 29.
	 */
	function doSetPmntSerialNo(pnRowIdx) {
		var vsSerialNo = util.Grid.getCellValue(app, "grdScalStudTrans", "SERIAL_NO", pnRowIdx);
		if(ValueUtil.isNull(vsSerialNo)){
			util.Grid.setCellValue(app, "grdScalStudTrans", "PMNT_SERIAL_NO", "", pnRowIdx);
			return; 
		}	
		
		var vnPmntSerialNo = 1;
		var vbPlus = false;
		var vnRowCnt = util.Grid.getRowCount(app, "grdScalStudTrans");
		if(vnRowCnt != 0 && vnRowCnt != 1) {
			for (var i = 1; i <= vnRowCnt; i++) {
				var vsSerialNoDs = util.Grid.getCellValue(app, "grdScalStudTrans", "SERIAL_NO", i);
				if (vsSerialNoDs == vsSerialNo && pnRowIdx != i) {
					var vnNPmntSerialNo = util.Grid.getCellValue(app, "grdScalStudTrans", "PMNT_SERIAL_NO", i);
					vbPlus = true;
					if (vnPmntSerialNo < vnNPmntSerialNo) vnPmntSerialNo = vnNPmntSerialNo;
				}
			}
			if(vbPlus) vnPmntSerialNo++;
		}
		util.Grid.setCellValue(app, "grdScalStudTrans", "PMNT_SERIAL_NO", vnPmntSerialNo,  pnRowIdx);
	};
	
	/**
	 * @desc 장학금 지급검색 버튼 클릭 이벤트 
	 * @member stdCssCScalStudTrans
	 * @return void
	 * @author Aeyoung Lee 2016. 4. 29.
	 */
	moPage.onClick_RdBtnScalStudSearch = function() {
		//2016.08.26 확정건만 나오는 거에서 처리상태 상관없이 조회되도록 수정
		doListSearchGrx("impDialogAllScalFeePmnt", "grdScalStudTrans", util.Grid.getIndex(app, "grdScalStudTrans"));
	};
	
	/**
	 * @desc 부모 헤더에 메세지 뿌리기
	 * @member stdCssCScalStudTrans
	 * @param psMsgCode 
	 * @return void
	 * @author Aeyoung Lee 2016. 4. 29.
	 */
	moPage.setParentMsg = function(psMsgCode) {
		util.Msg.notify(app, psMsgCode);	
	};
	
	/**
	 * @desc 변경사항체크 - 부모창에서 호출용
	 * @member stdCssCScalStudTrans
	 * @return void
	 * @author Aeyoung Lee 2016. 4. 29.
	 */
	function doCheckDataChange() {
		if(util.Grid.isModified(app, ["grdScalStudTrans"], "CRM") ){
			return false;
		}else{
			return true;
		}
	};

	return moPage;
};
