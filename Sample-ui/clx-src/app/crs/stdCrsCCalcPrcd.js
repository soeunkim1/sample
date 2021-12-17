//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./stdCrsCCalcPrcd.xtm"/>

var stdCrsCCalcPrcd = function() {
		
	var moPage = new Page();
	
	var msPrcdCd = null;
	var msRefKey = null;
	var msLanDivRcd = null;
	var mbOnLoadFlag = false;
	
	moPage.TAB = {
		PRCD : "tpgPrcd",
		LAN  : "tpgPrcdLan",
		ITEM : "tpgPrcdItem"
	};
	
	var TAB_BTN = {
		tpgPrcd     : "tabBtnPrcd",
		tpgPrcdLan  : "tabBtnPrcdLan",
		tpgPrcdItem : "tabBtnPrcdItem"
	};	
	
	
	/**
	 * @desc  Header Import onLoad
	 * @return void
	 * @author Aeyoung Lee 2016-02-05
	 */
	moPage.onLoadImportDone_ImpTitle = function() {		
		doHeaderOnLoad();
	};
	
	/**
	 * @desc 온로드 실행
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-02-05
	 */
	moPage.onLoad = function() {
		//리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["rptCalcPrcd", "rptPrcdLan", "rptPrcdItem"]);
		
		// 첫번째 탭으로 이동하도록
		util.Tab.setSelectedTabItem(app, "tabMain", TAB.PRCD);
		
		// 서브미션 실행 (실패시 cover page)
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				util.Msg.notify(app, "NLS.INF.M024");
				util.Control.redraw(app, "grdCalcPrcd");
			}
			
			mbOnLoadFlag = true;
		}, true);
	};
	
	/**
	 * @desc  탭변경이벤트
	 * @param {String} psCaseId 탭ID
	 * @return void
	 * @author Aeyoung Lee 2016-02-05
	 */
	function doTabChange(psCaseId) {
		
		if (!mbOnLoadFlag) return;
		
		var vsSelTabId = util.Tab.getSelectedId(app, "tabMain");
		
		// 현재 선택된 탭의 상태 체크
		switch (vsSelTabId) {
			// 계산절차
			case TAB.PRCD : {
				var vnSelIdx = util.Grid.getIndex(app, "grdCalcPrcd");
				
				if(!vnSelIdx) {
					// tab 이동 하지 않음
					ExtTab.setTabBtn("tabMain", TAB_BTN[vsSelTabId]);
					// "라인을 선택하세요." tab 이동 하지 않음
					util.Msg.alert("NLS-INF-M023");
					return false;
				}
				
				if(vnSelIdx) {
					msPrcdCd = util.Grid.getCellValue(app, "grdCalcPrcd", "PRCD_CD", vnSelIdx);
					msRefKey = util.Grid.getCellValue(app, "grdCalcPrcd", "REF_KEY", vnSelIdx);
					msLanDivRcd = util.Grid.getCellValue(app, "grdCalcPrcd", "LAN_DIV_RCD", vnSelIdx);
				}
				
				util.DataMap.setValue(app, "dmReqKey", "strPrcdCd", msPrcdCd);
				util.DataMap.setValue(app, "dmReqKey", "strRefKey", msRefKey);
				
				// 리피터 변경사항 체크
				if(util.Grid.isModified(app, ["grdCalcPrcd"], "CRM")){
					
					// tab 이동 하지 않음
					ExtTab.setTabBtn("tabMain", TAB_BTN[vsSelTabId]);
					return false;
				}else{
					
					// 선택된 로우가 신규 로우일 경우 tab 이동 하지 않음 
					if (util.Grid.getRowState(app, "grdCalcPrcd") == cpr.data.tabledata.RowState.INSERTED) {
						util.Grid.restoreRow(app, "grdCalcPrcd");
						ExtTab.setTabBtn("tabMain", TAB_BTN[vsSelTabId]);
						return false;
					}
				}	
				
				break;
			}
			
			// 언어확장
			case TAB.LAN : {
				// 리피터 변경사항 체크
				if(util.Grid.isModified(app, ["grdPrcdLan"], "CRM")){
					// tab 이동 하지 않음
					ExtTab.setTabBtn("tabMain", TAB_BTN[vsSelTabId]);
					return false;
				}
				
				break;
			}
			
			// 항목
			case TAB.ITEM : {
				// 리피터 변경사항 체크
				if(util.Grid.isModified(app, ["grdPrcdItem"], "CRM")){
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
			// 계산절차
			case TAB.PRCD : {
				doListPrcd(function(pbSuccess) {
					// 조회 : "조회되었습니다." header 메세지 표시
					if(pbSuccess) util.Msg.notify(app, "NLS.INF.M024");
					
					var vsFindPrcdCd = util.DataMap.getValue(app, "dmReqKey", "strPrcdCd");
					util.Grid.selectRowByCondition(app, "grdCalcPrcd" , "/root/resList/rptPrcd/row/PRCD_CD", "==", vsFindPrcdCd, 0);
				});
				
				break;
			}
			// 언어
			case TAB.LAN : {
				doListPrcdLan(function(pbSuccess) {
					if(pbSuccess) util.Msg.notify(app, "NLS.INF.M024");
				});
				
				break;
			}
			// 항목
			case TAB.ITEM : {
				doListPrcdItem(function(pbSuccess) {
					if(pbSuccess) util.Msg.notify(app, "NLS.INF.M024");
				});
				
				break;
			}
		}
	}
	
	/**
	 * @desc 등록금계산절차 조회 실행
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-02-05
	 */
	function doListPrcd(poCallBackFunc) {
		//strCommand: listPrcd 
		util.Submit.send(app, "subListPrcd", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdCalcPrcd");
				
				// 조회 후 콜백함수 수행
				if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess); 
			}
		}); 
	};
	
	/**
	 * @desc 등록금계산절차언어 조회 실행
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-02-05
	 */
	function doListPrcdLan(poCallBackFunc) {
		//strCommand: listLan 
		util.Submit.send(app, "subListLan", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdPrcdLan");
				
				// 조회 후 콜백함수 수행
				if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess); 
			}
		}); 
	};
	
	/**
	 * @desc 등록금계산절차항목 조회 실행
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-02-05
	 */
	function doListPrcdItem(poCallBackFunc) {
		//strCommand: listItem 
		util.Submit.send(app, "subListItem", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdPrcdItem");
				
				// 조회 후 콜백함수 수행
				if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess); 
			}
		}); 
	};
	
	/**
	 * @desc   등록금항목 리피트 변경 이벤트
	 * @return void
	 * @author Aeyoung Lee 2016-02-02
	 */	
	function doAfterValueChangRptCalcPrcd(psDiv) {
		var vnRowIdx = util.Grid.getIndex(app, "grdCalcPrcd");
		var vsValue = util.Grid.getCellValue(app, "grdCalcPrcd", psDiv, vnRowIdx);
		
		// 폐기여부
		if(psDiv == "EXP_YN"){
			if (vsValue == "Y") {
				var vsCurrDate = util.DataMap.getValue(app, "dmCurrentDate", "CUT_DT");
				util.Grid.setCellValue(app, "grdCalcPrcd", "EXP_DT", vsCurrDate, vnRowIdx);
			} else {
				util.Grid.setCellValue(app, "grdCalcPrcd", "EXP_DT", "", vnRowIdx);	
			}
			
			// 폐기여부에 따른 폐기일 bind 처리
//TO-BE: <ExtControl.refreshBind> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//			ExtControl.refreshBind("binRoCalcPrcdExpDt");
		}
		
	};
	
	/**
	 * @desc 등록금계산절차 신규 click event
	 * @return void
	 * @author Aeyoung Lee 2016-02-05
	 */	
	moPage.onClick_BtnNewPrcd = function() {
		//해당 리피트 insertRow 후 편집 시작할 컬럼 지정		
		var voNewRow = util.Grid.insertRow(app, "grdCalcPrcd", "rdIpbPrcdCdPrcd");
		util.Grid.setCellValue(app, "grdCalcPrcd", "LAN_DIV_RCD" , util.getSystemLocale(), voNewRow);
	};
	
	/**
	 * @desc 등록금계산절차 삭제 click event
	 * @return void
	 * @author Aeyoung Lee 2016-02-05
	 */	
	moPage.onClick_BtnDeletePrcd = function() {
		util.Grid.deleteRow(app, "grdCalcPrcd");	
	};
	
	/**
	 * @desc 등록금계산절차 작업취소 click event
	 * @return void
	 * @author Aeyoung Lee 2016-02-05
	 */	
	moPage.onClick_BtnRestorePrcd = function() {
		util.Grid.restoreRow(app, "grdCalcPrcd");
	};
	
	/**
	 * @desc 등록금계산절차 작업저장 click event
	 * @return void
	 * @author Aeyoung Lee 2016-02-05
	 */	
	moPage.onClick_BtnSavePrcd = function() {
		// 리피터 변경사항 체크
		if(!util.Grid.isModified(app, ["grdCalcPrcd"], "MSG")){
			return false;
		}
		
		//리피트 validation check
		if(!util.validate(app, "grdCalcPrcd")) return false;
		
		var vnRpnCnt = util.Grid.getRowCount(app, "grdCalcPrcd");
		
		//데이터셋의 로우 중 폐기여부 체크돼있다면 폐기일자 입력했는지 체크
		for(var i = 1; i<vnRpnCnt+1; i++){
			
			var vsExpYnItem = util.Grid.getCellValue(app, "grdCalcPrcd", "EXP_YN", i);
			var vsExpDtItem = util.Grid.getCellValue(app, "grdCalcPrcd", "EXP_DT", i); 
			if(vsExpYnItem == "Y" && ValueUtil.isNull(vsExpDtItem)){
				util.Msg.alert("NLS-WRN-M003", [NLS.NSCR.EXPDT]);
				ExtRepeat.setColFocus("rptCalcPrcd", i, "rdDipExpDtPrcd");
				return false;	
			}else if(vsExpYnItem != "Y" && !ValueUtil.isNull(vsExpDtItem)){
				util.Grid.setCellValue(app, "grdCalcPrcd", "EXP_DT", "", i);	
			}	
		}	
			
		//strCommand: savePrcd 
		util.Submit.send(app, "subSavePrcd", function(pbSuccess){
			if(pbSuccess){
				doListPrcd(function(pbListSuccess){
					if(pbListSuccess) util.Msg.notify(app, "NLS.INF.M025");
				});
			}
		});
	};
	
	/**
	 * @desc 등록금계산절차언어 신규 click event
	 * @return void
	 * @author Aeyoung Lee 2016-02-05
	 */	
	moPage.onClick_BtnNewItemLan = function() {
		
		//해당 리피트 insertRow 	
		var vnNewRow = util.Grid.insertRow(app, "grdPrcdLan");
		
		var vsPrcdCd = util.DataMap.getValue(app, "dmReqKey", "strPrcdCd");
		var vsRefKey = util.DataMap.getValue(app, "dmReqKey", "strRefKey");
		
		if(ValueUtil.isNull(vsRefKey)){
			//strCommand: getNewRefKey 
			util.Submit.send(app, "subRefKey", function(pbSuccess){
				if(pbSuccess){
					vsRefKey = util.DataMap.getValue(app, "dmReqKey", "strRefKey");
					
					util.Grid.setCellValue(app, "grdPrcdLan", "PRCD_CD", vsPrcdCd, vnNewRow);
					util.Grid.setCellValue(app, "grdPrcdLan", "REF_KEY", vsRefKey, vnNewRow);
					ExtRepeat.setColFocus("rptPrcdLan", vnNewRow, "rdCbbLanDivRcdLan");
				}
			});
		}else{
			util.Grid.setCellValue(app, "grdPrcdLan", "PRCD_CD", vsPrcdCd, vnNewRow);
			util.Grid.setCellValue(app, "grdPrcdLan", "REF_KEY", vsRefKey, vnNewRow);
			ExtRepeat.setColFocus("rptPrcdLan", vnNewRow, "rdCbbLanDivRcdLan");
		}
	};
	
	/**
	 * @desc 등록금계산절차언어 삭제 click event
	 * @return void
	 * @author Aeyoung Lee 2016-02-05
	 */	
	moPage.onClick_BtnDeleteItemLan = function() {
		
		// 선택된 로우를 가져옴
		var vsPanelCheckIdx = util.Grid.getCheckOrSelectedRowIndex(app, "grdPrcdLan");
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
			var vsLanDivRcd = util.Grid.getCellValue(app, "grdPrcdLan", "LAN_DIV_RCD", voPanelChk[i]);
			var vsUptStatus = util.Grid.getRowState(app, "grdPrcdLan", voPanelChk[i]); 
			
			if (msLanDivRcd == vsLanDivRcd && vsUptStatus != "insert") {
				util.Msg.alert("NLS-WRN-M010");
				return false;
			}
		}
		
		util.Grid.deleteRow(app, "grdPrcdLan");
	};
	
	/**
	 * @desc 등록금계산절차언어 작업취소 click event
	 * @return void
	 * @author Aeyoung Lee 2016-02-05
	 */	
	moPage.onClick_BtnRestoreItemLan = function() {
		util.Grid.restoreRow(app, "grdPrcdLan");
	};
	
	/**
	 * @desc 등록금계산절차언어 작업저장 click event
	 * @return void
	 * @author Aeyoung Lee 2016-02-05
	 */	
	moPage.onClick_BtnSaveItemLan = function() {
		// 리피터 변경사항 체크
		if(!util.Grid.isModified(app, ["grdPrcdLan"], "MSG")){
			return false;
		}
		
		//리피트 validation check
		if(!util.validate(app, "grdPrcdLan")) return false;
			
		//strCommand: saveLan 
		util.Submit.send(app, "subSaveLan", function(pbSuccess){
			if(pbSuccess){
				doListPrcdLan(function(pbListSuccess){
					if(pbListSuccess) util.Msg.notify(app, "NLS.INF.M025");
				});
			}
		});
	};
	
	/**
	 * @desc 등록금계산절차항목 신규 click event
	 * @return void
	 * @author Aeyoung Lee 2016-02-11
	 */	
	moPage.onClick_BtnNewItem = function() {
		//해당 리피트 insertRow 	
		var vnNewRow = util.Grid.insertRow(app, "grdPrcdItem");
		
		var vsPrcdCd = util.DataMap.getValue(app, "dmReqKey", "strPrcdCd");
		var vsRefKey = util.DataMap.getValue(app, "dmReqKey", "strRefKey");
		
		util.Grid.setCellValue(app, "grdPrcdItem", "PRCD_CD", vsPrcdCd, vnNewRow);
		ExtRepeat.setColFocus("rptPrcdItem", vnNewRow, "rdCbbItemCdItem");
	};
	
	/**
	 * @desc 등록금계산절차항목 삭제 click event
	 * @return void
	 * @author Aeyoung Lee 2016-02-11
	 */	
	moPage.onClick_BtnDeleteItem = function() {
		util.Grid.deleteRow(app, "grdPrcdItem");
	};
	
	/**
	 * @desc 등록금계산절차항목 작업취소 click event
	 * @return void
	 * @author Aeyoung Lee 2016-02-11
	 */	
	moPage.onClick_BtnRestoreItem = function() {
		util.Grid.restoreRow(app, "grdPrcdItem");
	};
	
	/**
	 * @desc 등록금계산절차항목 작업저장 click event
	 * @return void
	 * @author Aeyoung Lee 2016-02-11
	 */	
	moPage.onClick_BtnSaveItem = function() {
		// 리피터 변경사항 체크
		if(!util.Grid.isModified(app, ["grdPrcdItem"], "MSG")){
			return false;
		}
		
		//리피트 validation check
		if(!util.validate(app, "grdPrcdItem")) return false;
			
		//strCommand: saveItem 
		util.Submit.send(app, "subSaveItem", function(pbSuccess){
			if(pbSuccess){
				doListPrcdItem(function(pbListSuccess){
					if(pbListSuccess) util.Msg.notify(app, "NLS.INF.M025");
				});
			}
		});
	};
	
	return moPage;
};

