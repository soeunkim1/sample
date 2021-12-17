//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./stdCrsCDivPayType.xtm"/>

var stdCrsCDivPayType = function() {
		
	var moPage = new Page();
	
	var msDivPayTypeCd = null;
	var msRefKey = null;
	var msLanDivRcd = null;
	var mnDivPayCnt = null;		//분납유형상세 저장시 체크
	
	var mbOnLoadFlag = false;
	
	moPage.TAB = {
		TYPE : "tpgDivPayType",
		LAN  : "tpgDivPayLan",
		DTL  : "tpgDivPayDtl"
	};
	
	var TAB_BTN = {
		tpgDivPayType : "tabBtnDivPayType",
		tpgDivPayLan  : "tabBtnDivPayLan",
		tpgDivPayDtl  : "tabBtnDivPayDtl"
	};	
	
	
	/**
	 * @desc  Header Import onLoad
	 * @return void
	 * @author Aeyoung Lee 2016-02-11
	 */
	moPage.onLoadImportDone_ImpTitle = function() {		
		doHeaderOnLoad();
	};
	
	/**
	 * @desc 온로드 실행
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-02-11
	 */
	moPage.onLoad = function() {
		//리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["rptDivPayType", "rptDivPayLan", "rptDivPayDtl"]);
		
		// 첫번째 탭으로 이동하도록
		util.Tab.setSelectedTabItem(app, "tabMain", TAB.TYPE);
		
		// 서브미션 실행 (실패시 cover page)
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				util.Msg.notify(app, "NLS.INF.M024");
				util.Control.redraw(app, "grdDivPayType");
			}
			
			mbOnLoadFlag = true;
		}, true);
	};
	
	/**
	 * @desc  탭변경이벤트
	 * @param {String} psCaseId 탭ID
	 * @return void
	 * @author Aeyoung Lee 2016-02-11
	 */
	function doTabChange(psCaseId) {
		
		if (!mbOnLoadFlag) return;
		
		var vsSelTabId = util.Tab.getSelectedId(app, "tabMain");
		
		// 현재 선택된 탭의 상태 체크
		switch (vsSelTabId) {
			// 분납유형
			case TAB.TYPE : {
				var vnSelIdx = util.Grid.getIndex(app, "grdDivPayType");
				
				if(!vnSelIdx) {
					// tab 이동 하지 않음
					ExtTab.setTabBtn("tabMain", TAB_BTN[vsSelTabId]);
					// "라인을 선택하세요." tab 이동 하지 않음
					util.Msg.alert("NLS-INF-M023");
					return false;
				}
				
				if(vnSelIdx) {
					msDivPayTypeCd = util.Grid.getCellValue(app, "grdDivPayType", "DIV_PAY_TYPE_CD", vnSelIdx);
					msRefKey = util.Grid.getCellValue(app, "grdDivPayType", "REF_KEY", vnSelIdx);
					msLanDivRcd = util.Grid.getCellValue(app, "grdDivPayType", "LAN_DIV_RCD", vnSelIdx);
					mnDivPayCnt = util.Grid.getCellValue(app, "grdDivPayType", "DIV_PAY_CNT", vnSelIdx);
				}
				
				util.DataMap.setValue(app, "dmReqKey", "strDivPayTypeCd", msDivPayTypeCd);
				util.DataMap.setValue(app, "dmReqKey", "strRefKey", msRefKey);
				
				// 리피터 변경사항 체크
				if(util.Grid.isModified(app, ["grdDivPayType"], "CRM")){
					
					// tab 이동 하지 않음
					ExtTab.setTabBtn("tabMain", TAB_BTN[vsSelTabId]);
					return false;
				}else{
					
					// 선택된 로우가 신규 로우일 경우 tab 이동 하지 않음 
					if (util.Grid.getRowState(app, "grdDivPayType") == cpr.data.tabledata.RowState.INSERTED) {
						util.Grid.restoreRow(app, "grdDivPayType");
						ExtTab.setTabBtn("tabMain", TAB_BTN[vsSelTabId]);
						return false;
					}
				}	
				
				break;
			}
			
			// 언어확장
			case TAB.LAN : {
				// 리피터 변경사항 체크
				if(util.Grid.isModified(app, ["grdDivPayLan"], "CRM")){
					// tab 이동 하지 않음
					ExtTab.setTabBtn("tabMain", TAB_BTN[vsSelTabId]);
					return false;
				}
				
				break;
			}
			
			// 세부
			case TAB.DTL : {
				// 리피터 변경사항 체크
				if(util.Grid.isModified(app, ["grdDivPayDtl"], "CRM")){
					// tab 이동 하지 않음
					ExtTab.setTabBtn("tabMain", TAB_BTN[vsSelTabId]);
					return false;
				}
				
				break;
			}
			
		}
		
		// 탭변경
		util.Tab.setSelectedTabItem(app, "tabMain", psCaseId);
		
		//탭변경 후 처리 로직
		switch (psCaseId) {
			// 분납유형
			case TAB.TYPE : {
				doListDivPay(function(pbSuccess) {
					// 조회 : "조회되었습니다." header 메세지 표시
					if(pbSuccess) util.Msg.notify(app, "NLS.INF.M024");
					
					var vsFindDivPayTypeCd = util.DataMap.getValue(app, "dmReqKey", "strDivPayTypeCd");
					util.Grid.selectRowByCondition(app, "grdDivPayType" , "/root/resList/rptDivPayType/row/DIV_PAY_TYPE_CD", "==", vsFindDivPayTypeCd, 0);
				});
				
				break;
			}
			// 언어
			case TAB.LAN : {
				doListDivPayLan(function(pbSuccess) {
					if(pbSuccess) util.Msg.notify(app, "NLS.INF.M024");
				});
				
				break;
			}
			// 세부
			case TAB.DTL : {
				doListDivPayDtl(function(pbSuccess) {
					if(pbSuccess) util.Msg.notify(app, "NLS.INF.M024");
				});
				
				break;
			}
		}
	}
	
	/**
	 * @desc 분납유형 조회 실행
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-02-11
	 */
	function doListDivPay(poCallBackFunc) {
		//strCommand: listDiv 
		util.Submit.send(app, "subListDivPayTp", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdDivPayType");
				
				// 조회 후 콜백함수 수행
				if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess); 
			}
		}); 
	};
	
	/**
	 * @desc 분납유형언어 조회 실행
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-02-11
	 */
	function doListDivPayLan(poCallBackFunc) {
		//strCommand: listLan 
		util.Submit.send(app, "subListLan", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdDivPayLan");
				
				// 조회 후 콜백함수 수행
				if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess); 
			}
		}); 
	};
	
	/**
	 * @desc 분납유형세부 조회 실행
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-02-11
	 */
	function doListDivPayDtl(poCallBackFunc) {
		//strCommand: listDtl 
		util.Submit.send(app, "subListDivPayDtl", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdDivPayDtl");
				
				// 조회 후 콜백함수 수행
				if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess); 
			}
		}); 
	};
		
	/**
	 * @desc   분납유형 리피트 변경 이벤트
	 * @return void
	 * @author Aeyoung Lee 2016-02-11
	 */	
	function doAfterValueChangRptDivPayType(psDiv) {
		var vnRowIdx = util.Grid.getIndex(app, "grdDivPayType");
		var vsValue = util.Grid.getCellValue(app, "grdDivPayType", psDiv, vnRowIdx);
		var vnValue = null;
		
		// 폐기여부
		if(psDiv == "EXP_YN"){
			if (vsValue == "Y") {
				var vsCurrDate = util.DataMap.getValue(app, "dmCurrentDate", "CUT_DT");
				util.Grid.setCellValue(app, "grdDivPayType", "EXP_DT", vsCurrDate, vnRowIdx);
			} else {
				util.Grid.setCellValue(app, "grdDivPayType", "EXP_DT", "", vnRowIdx);	
			}
			
			// 폐기여부에 따른 폐기일 bind 처리
//TO-BE: <ExtControl.refreshBind> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//			ExtControl.refreshBind("binRoDivPayTypeExpDt");
		
		// 분납횟수, 간격, 절사지리	
		}else if(psDiv == "DIV_PAY_CNT" || psDiv == "ITV_VAL" || psDiv == "RND_LOC"){
			vnValue = Number(vsValue);
			
			if(ValueUtil.isNull(vsValue)) return false;
			
			if(psDiv == "DIV_PAY_CNT" && vnValue < 2){
				util.Msg.alert("NLS-CRS-M019");	//분납횟수는 2이상이어야 합니다.
				util.Grid.setCellValue(app, "grdDivPayType", psDiv, "", vnRowIdx);	
				
				return false;	
				
			}else if(psDiv == "ITV_VAL" && (vnValue == 0 || vnValue < 0)){	
				util.Msg.alert("NLS-CRS-M006", [NLS.NSCR.ITVVAL]);
				util.Grid.setCellValue(app, "grdDivPayType", psDiv, "", vnRowIdx);	
				
				return false;
				
			}else if(psDiv == "RND_LOC" && (vnValue == 0 || vnValue < 0)){	
				util.Msg.alert("NLS-CRS-M006", [NLS.NSCR.RNDLOC]);	//절사자리는 0보다 큰 수만 허용됩니다.
				util.Grid.setCellValue(app, "grdDivPayType", psDiv, "", vnRowIdx);	
				
				return false;
			}
		}	
		
	};
	
	/**
	 * @desc 분납유형 신규 click event
	 * @return void
	 * @author Aeyoung Lee 2016-02-11
	 */	
	moPage.onClick_BtnNewDivPayType = function() {
		//해당 리피트 insertRow 후 편집 시작할 컬럼 지정		
		var voNewRow = util.Grid.insertRow(app, "grdDivPayType", "rdIpbDivPayTypeCd");
		util.Grid.setCellValue(app, "grdDivPayType", "LAN_DIV_RCD" , util.getSystemLocale(), voNewRow);
	};
	
	/**
	 * @desc 분납유형 삭제 click event
	 * @return void
	 * @author Aeyoung Lee 2016-02-11
	 */	
	moPage.onClick_BtnDeleteDivPayType = function() {
		util.Grid.deleteRow(app, "grdDivPayType");	
	};
	
	/**
	 * @desc 분납유형 작업취소 click event
	 * @return void
	 * @author Aeyoung Lee 2016-02-11
	 */	
	moPage.onClick_BtnRestoreDivPayType = function() {
		util.Grid.restoreRow(app, "grdDivPayType");
	};
	
	/**
	 * @desc 뷴납유형 작업저장 click event
	 * @return void
	 * @author Aeyoung Lee 2016-02-11
	 */	
	moPage.onClick_BtnSaveDivPayType = function() {
		// 리피터 변경사항 체크
		if(!util.Grid.isModified(app, ["grdDivPayType"], "MSG")){
			return false;
		}
		
		//리피트 validation check
		if(!util.validate(app, "grdDivPayType")) return false;
		
		var vnRpnCnt = util.Grid.getRowCount(app, "grdDivPayType");
		
		//데이터셋의 로우 중 폐기여부 체크돼있다면 폐기일자 입력했는지 체크
		for(var i = 1; i<vnRpnCnt+1; i++){
			
			var vsExpYnItem = util.Grid.getCellValue(app, "grdDivPayType", "EXP_YN", i);
			var vsExpDtItem = util.Grid.getCellValue(app, "grdDivPayType", "EXP_DT", i); 
			if(vsExpYnItem == "Y" && ValueUtil.isNull(vsExpDtItem)){
				util.Msg.alert("NLS-WRN-M003", [NLS.NSCR.EXPDT]);
				ExtRepeat.setColFocus("rptDivPayType", i, "rdDipExpDtType");
				return false;	
			}else if(vsExpYnItem != "Y" && !ValueUtil.isNull(vsExpDtItem)){
				util.Grid.setCellValue(app, "grdDivPayType", "EXP_DT", "", i);	
			}	
		}	
			
		//strCommand: saveDiv 
		util.Submit.send(app, "subSaveDivPayTp", function(pbSuccess){
			if(pbSuccess){
				doListDivPay(function(pbListSuccess){
					if(pbListSuccess) util.Msg.notify(app, "NLS.INF.M025");
				});
			}
		});
	};
	
	
	/**
	 * @desc 뷴납유형언어 신규 click event
	 * @return void
	 * @author Aeyoung Lee 2016-02-11
	 */	
	moPage.onClick_BtnNewItemLan = function() {
		
		//해당 리피트 insertRow 	
		var vnNewRow = util.Grid.insertRow(app, "grdDivPayLan");
		
		var vsDivPayTypeCd = util.DataMap.getValue(app, "dmReqKey", "strDivPayTypeCd");
		var vsRefKey = util.DataMap.getValue(app, "dmReqKey", "strRefKey");
		
		if(ValueUtil.isNull(vsRefKey)){
			//strCommand: getNewRefKey 
			util.Submit.send(app, "subRefKey", function(pbSuccess){
				if(pbSuccess){
					vsRefKey = util.DataMap.getValue(app, "dmReqKey", "strRefKey");
					
					util.Grid.setCellValue(app, "grdDivPayLan", "DIV_PAY_TYPE_CD", vsDivPayTypeCd, vnNewRow);
					util.Grid.setCellValue(app, "grdDivPayLan", "REF_KEY", vsRefKey, vnNewRow);
					ExtRepeat.setColFocus("rptDivPayLan", vnNewRow, "rdCbbLanDivRcdLan");
				}
			});
		}else{
			util.Grid.setCellValue(app, "grdDivPayLan", "DIV_PAY_TYPE_CD", vsDivPayTypeCd, vnNewRow);
			util.Grid.setCellValue(app, "grdDivPayLan", "REF_KEY", vsRefKey, vnNewRow);
			ExtRepeat.setColFocus("rptDivPayLan", vnNewRow, "rdCbbLanDivRcdLan");
		}
	};
	
	/**
	 * @desc 뷴납유형언어 삭제 click event
	 * @return void
	 * @author Aeyoung Lee 2016-02-11
	 */	
	moPage.onClick_BtnDeleteItemLan = function() {
		
		// 선택된 로우를 가져옴
		var vsPanelCheckIdx = util.Grid.getCheckOrSelectedRowIndex(app, "grdDivPayLan");
		var voPanelChk;
		
		if(String(vsPanelCheckIdx).indexOf(",") != -1){
			voPanelChk = vsPanelCheckIdx.split(",");
		}else{
			voPanelChk = new Array();
			voPanelChk[0] = vsPanelCheckIdx;
		}	
		
		// 지우려고 하는 row가 main table에서 default LAN_DIV_RCD 과 동일하면 삭제할 수 없음
		// new를 지우려 하는 경우는 가능함
		for(var i = voPanelChk.length - 1; i >= 0; i--) {
			var vsLanDivRcd = util.Grid.getCellValue(app, "grdDivPayLan", "LAN_DIV_RCD", voPanelChk[i]);
			var vsUptStatus = util.Grid.getRowState(app, "grdDivPayLan", voPanelChk[i]); 
			
			if (msLanDivRcd == vsLanDivRcd && vsUptStatus != "insert") {
				util.Msg.alert("NLS-WRN-M010");
				return false;
			}
		}
		
		util.Grid.deleteRow(app, "grdDivPayLan");
	};
	
	/**
	 * @desc 뷴납유형언어 작업취소 click event
	 * @return void
	 * @author Aeyoung Lee 2016-02-11
	 */	
	moPage.onClick_BtnRestoreItemLan = function() {
		util.Grid.restoreRow(app, "grdDivPayLan");
	};
	
	/**
	 * @desc 뷴납유형언어 작업저장 click event
	 * @return void
	 * @author Aeyoung Lee 2016-02-11
	 */	
	moPage.onClick_BtnSaveItemLan = function() {
		// 리피터 변경사항 체크
		if(!util.Grid.isModified(app, ["grdDivPayLan"], "MSG")){
			return false;
		}
		
		//리피트 validation check
		if(!util.validate(app, "grdDivPayLan")) return false;
			
		//strCommand: saveLan 
		util.Submit.send(app, "subSaveLan", function(pbSuccess){
			if(pbSuccess){
				doListDivPayLan(function(pbListSuccess){
					if(pbListSuccess) util.Msg.notify(app, "NLS.INF.M025");
				});
			}
		});
	};
	
	/**
	 * @desc   분납유형세부 리피트 변경 이벤트
	 * @return void
	 * @author Aeyoung Lee 2016-02-11
	 */	
	function doAfterValueChangRptDivPayDtl(psDiv) {
		var vnRowIdx = util.Grid.getIndex(app, "grdDivPayDtl");
		var vsValue = util.Grid.getCellValue(app, "grdDivPayDtl", psDiv, vnRowIdx);
		var vnValue = null;
		
		// 분납차수, 비율분자, 비율분모
		if(psDiv == "DIV_PAY_SEQ" || psDiv == "RATE_NUR" || psDiv == "RATE_DEN"){
			vnValue = Number(vsValue);
			
			if(ValueUtil.isNull(vsValue)) return false;
			
			if(psDiv == "DIV_PAY_SEQ"){
				if(vnValue > mnDivPayCnt){
					util.Msg.alert("NLS-CRS-M012", [mnDivPayCnt]);
					util.Grid.setCellValue(app, "grdDivPayDtl", psDiv, "", vnRowIdx);	
					
					return false;
				} else if (vnValue == 0 || vnValue < 0) {	//분납차수
					util.Msg.alert("NLS-CRS-M006", [NLS.NSCR.DIVPAYSEQ]);	//분납차수는 0보다 큰 수만 허용됩니다.				
					util.Grid.setCellValue(app, "grdDivPayDtl", psDiv, "", vnRowIdx);	
					
					return false;  
				}
				
			}else if(psDiv == "RATE_NUR"){	
				if(vnValue == 0){
					util.Msg.alert("NLS-CRS-M017");	//분자값은 0보다 큰 수만 허용됩니다.
					util.Grid.setCellValue(app, "grdDivPayDtl", psDiv, "", vnRowIdx);	
					
					return false;
				} else if(Number(vnValue)<0){
					util.Msg.alert("NLS-CRS-M014");	//음수는 입력할 수 없습니다.
					util.Grid.setCellValue(app, "grdDivPayDtl", psDiv, "", vnRowIdx);	
					
					return false;
				}
				
			}else if(psDiv == "RATE_DEN"){	
				if(vnValue == 0){
					util.Msg.alert("NLS-CRS-M009");	//분모값은 0보다 큰 수만 허용됩니다.
					util.Grid.setCellValue(app, "grdDivPayDtl", psDiv, "", vnRowIdx);	
					
					return false;
				} else if(Number(vnValue)<0){
					util.Msg.alert("NLS-CRS-M014");	//음수는 입력할 수 없습니다.
					util.Grid.setCellValue(app, "grdDivPayDtl", psDiv, "", vnRowIdx);	
					
					return false;
				}
			}
			
			
			if(psDiv == "RATE_NUR" || psDiv == "RATE_DEN"){
				var vnRateNur = Number(util.Grid.getCellValue(app, "grdDivPayDtl", "RATE_NUR", vnRowIdx));
				var vnRateDen = Number(util.Grid.getCellValue(app, "grdDivPayDtl", "RATE_DEN", vnRowIdx));
				if((vnRateDen != 0) && (vnRateNur > vnRateDen)) {
					util.Msg.alert("NLS-CRS-M010");	//분자는 분모보다 클 수 없습니다.
					util.Grid.setCellValue(app, "grdDivPayDtl", psDiv, "", vnRowIdx);	
					
					return false;
				}
				
			}	
		}	
		
	};
	
	/**
	 * @desc 분납유형세부 신규 click event
	 * @return void
	 * @author Aeyoung Lee 2016-02-11
	 */	
	moPage.onClick_BtnNewDtl = function() {
		//해당 리피트 insertRow 	
		var vnNewRow = util.Grid.insertRow(app, "grdDivPayDtl");
		
		var vsDivPayTypeCd = util.DataMap.getValue(app, "dmReqKey", "strDivPayTypeCd");
		var vsRefKey = util.DataMap.getValue(app, "dmReqKey", "strRefKey");
		
		util.Grid.setCellValue(app, "grdDivPayDtl", "DIV_PAY_TYPE_CD", vsDivPayTypeCd, vnNewRow);
		ExtRepeat.setColFocus("rptDivPayDtl", vnNewRow, "rdIpbDivPaySeqDtl");
	};
	
	/**
	 * @desc 분납유형세부 삭제 click event
	 * @return void
	 * @author Aeyoung Lee 2016-02-11
	 */	
	moPage.onClick_BtnDeleteDtl = function() {
		util.Grid.deleteRow(app, "grdDivPayDtl");
	};
	
	/**
	 * @desc 분납유형세부 작업취소 click event
	 * @return void
	 * @author Aeyoung Lee 2016-02-11
	 */	
	moPage.onClick_BtnRestoreDtl = function() {
		util.Grid.restoreRow(app, "grdDivPayDtl");
	};
	
	/**
	 * @desc 분납유형세부 작업저장 click event
	 * @return void
	 * @author Aeyoung Lee 2016-02-11
	 */	
	moPage.onClick_BtnSaveDtl = function() {
		// 리피터 변경사항 체크
		if(!util.Grid.isModified(app, ["grdDivPayDtl"], "MSG")){
			return false;
		}
		
		//리피트 validation check
		if(!util.validate(app, "grdDivPayDtl")) return false;
		
		//분납차수 누락여부, 등록금항목별 비율분수의 합이 1인지 여부, 같은 차수에 중복등록금항복 입력여부 check
		if(!doCheckDtlData()) return false;
			
		//strCommand: saveDtl 
		util.Submit.send(app, "subSaveDivPayDtl", function(pbSuccess){
			if(pbSuccess){
				doListDivPayDtl(function(pbListSuccess){
					if(pbListSuccess) util.Msg.notify(app, "NLS.INF.M025");
				});
			}
		});
	};
	
	/**
	 * @desc 분납차수 누락여부, 등록금항목별 비율분수의 합이 1인지 여부, 같은 차수에 중복등록금항복 입력여부 check
	 * @return void
	 * @author Aeyoung Lee 2016-02-12
	 */	
	function doCheckDtlData() {
		
		var vnRowCnt = util.Grid.getRowCount(app, "grdDivPayDtl");
		var vaDivPaySeqTmp = [];   
		var vnRateSum = 0;
		var vnCurrSeq;
		var vsItemCd;
		var vnRateNur;
		var vnRateDen;
		var vnNextItemCd;
		var vnNextSeq;
		var vnNextRateNur;
		var vnNextRateDen;
		var vbPass1 = true;
		var vbPass2 = true;
		var vbPass3 = true;
		
		for(var i=1; i<=vnRowCnt; i++) {
			
			if(util.Grid.getRowState(app, "grdDivPayDtl", i) == cpr.data.tabledata.RowState.DELETED) continue;
			
			vsItemCd  = util.Grid.getCellValue(app, "grdDivPayDtl", "ITEM_CD", i);
			vnCurrSeq = Number(util.Grid.getCellValue(app, "grdDivPayDtl", "DIV_PAY_SEQ", i));
			vnRateNur = Number(util.Grid.getCellValue(app, "grdDivPayDtl", "RATE_NUR", i)); 
			vnRateDen = Number(util.Grid.getCellValue(app, "grdDivPayDtl", "RATE_DEN", i));  
			
			//항목별 비율분자/분모 합계
			vnRateSum = Number(vnRateNur) / Number(vnRateDen);
			
			vaDivPaySeqTmp.push(vnCurrSeq);
			
			for(var j=1; j<=vnRowCnt; j++){
				
				if(util.Grid.getRowState(app, "grdDivPayDtl", j) == cpr.data.tabledata.RowState.DELETED) continue;
				if(i==j) continue;
				
				vnNextItemCd  = util.Grid.getCellValue(app, "grdDivPayDtl", "ITEM_CD", j);
				vnNextSeq 	  = Number(util.Grid.getCellValue(app, "grdDivPayDtl", "DIV_PAY_SEQ", j)); 
				vnNextRateNur = Number(util.Grid.getCellValue(app, "grdDivPayDtl", "RATE_NUR", j)); 
				vnNextRateDen = Number(util.Grid.getCellValue(app, "grdDivPayDtl", "RATE_DEN", j)); 
				
				//한차수에 동일한 항목코드 존재하는지 체크
				if(vnNextItemCd==vsItemCd && vnNextSeq==vnCurrSeq){
					vbPass2 = false;
				}
				
				//동일항목의 비율분자/분모 합
				if(vsItemCd == vnNextItemCd){	
					vnRateSum = vnRateSum + (vnNextRateNur / vnNextRateDen);
				}
			}
			
			//항목별 비율분자/분모의 총계를 더하여 합이 1인지 체크
			if(vnRateSum != 1) {
				vbPass3 = false;
			}
			vnRateSum = 0;
		}
		
		var vnTmpLength = vaDivPaySeqTmp.length;
		
		// 분납차수가 순차적으로 입력되었는지 확인
		if(vnTmpLength > 0){
			
			// 분납차수 소트
			vaDivPaySeqTmp.sort();
			
			for(var k=0; k<=vnTmpLength; k++) {
				
				vnCurrSeq = vaDivPaySeqTmp[k];
				vnNextSeq = vaDivPaySeqTmp[k+1];
				
				//분납차수가 처음에 1로 시작하는지 체크
				if(k == 0 && vnCurrSeq != 1){
					vbPass1 = false;
					break;
				}	
				
				//마지막 분납차수가 분납회수와 동일한지 체크
				if(k == (vnTmpLength-1) && mnDivPayCnt != vnCurrSeq){
					vbPass1 = false;
					break;
				}	
				
				//다음 숫자가 없는 경우 break
				if(ValueUtil.isNull(vnNextSeq)) break;
				
				//분납차수가 중간에 빈 것이 있는지 체크
				if(!((vnNextSeq-vnCurrSeq==1) || (vnNextSeq-vnCurrSeq==0))){
					vbPass1 = false;
					break;
					
				}
			}
		}
		
		if(!vbPass1){
			 util.Msg.alert("NLS-CRS-M012", [mnDivPayCnt]);
			return false;
		}	
		
		if(!vbPass2){
			 util.Msg.alert("NLS-CRS-M072");
			return false;
		}	
		
		if(!vbPass3){
			 util.Msg.alert("NLS-CRS-M015");
			return false;
		}	
		
		return true;
	};	
	
	return moPage;
};

