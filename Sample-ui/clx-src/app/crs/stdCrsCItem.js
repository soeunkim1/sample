//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./stdCrsCItem.xtm"/>


var stdCrsCItem = function() {
		
	var moPage = new Page();
	
	var mbOnLoadFlag = false;
	
	moPage.TAB = {
		ITEM : "tpgItem",
		LANG : "tpgItemLan",
		COND : "tpgItemCond"
	};
	
	var TAB_BTN = {
		tpgItem     : "tabBtnItem",
		tpgItemLan  : "tabBtnItemLan",
		tpgItemCond : "tabBtnItemCond"
	};	
			
	var maChangeMod = ["btnNewItemCond", "btnDeleteItemCond", "btnRestoreItemCond", "btnSaveItemCond"];
		
	/**
	 * @desc  Header Import onLoad
	 * @return void
	 * @author Aeyoung Lee 2016-02-03
	 */
	moPage.onLoadImportDone_ImpTitle = function() {		
		doHeaderOnLoad();
	};
	
	/**
	 * @desc 온로드 실행
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-02-03
	 */
	moPage.onLoad = function() {
		//리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["rptCrsItem", "rptCrsItemLan", "rptCrsItemCond"]);
		
		// 첫번째 탭으로 이동하도록
		util.Tab.setSelectedTabItem(app, "tabMain", TAB.ITEM);
		
		// 서브미션 실행 (실패시 cover page)
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				util.Msg.notify(app, "NLS.INF.M024");
				util.Control.redraw(app, "grdCrsItem");
			}
			
			mbOnLoadFlag = true;
		}, true);
	};
	
	/**
	 * @desc  탭변경이벤트
	 * @param {String} psCaseId 탭ID
	 * @return void
	 * @author Aeyoung Lee 2016-02-03
	 */
	function doTabChange(psCaseId) {
		var vsSelTabId = util.Tab.getSelectedId(app, "tabMain");
		
		// 최초 onLoad 이전에 호출됨으로 플래그를 두어 return처리 
		if (!mbOnLoadFlag) return;
		
		// 현재 선택된 탭의 상태 체크
		switch (vsSelTabId) {
			// 등록금항목
			case TAB.ITEM : {
				var vnSelIdx = util.Grid.getIndex(app, "grdCrsItem");
				
				if(!vnSelIdx) {
					// tab 이동 하지 않음
					ExtTab.setTabBtn("tabMain", TAB_BTN[vsSelTabId]);
					// "라인을 선택하세요." tab 이동 하지 않음
					util.Msg.alert("NLS-INF-M023");
					return false;
				}
				
				var vsItemCd = "";
				var vsRefKey = "";
				var vsLanDivRcd = "";
				var vsItemNm = "";
				
				if(vnSelIdx) {
					vsItemCd = util.Grid.getCellValue(app, "grdCrsItem", "ITEM_CD", vnSelIdx);
					vsRefKey = util.Grid.getCellValue(app, "grdCrsItem", "REF_KEY", vnSelIdx);
					vsLanDivRcd = util.Grid.getCellValue(app, "grdCrsItem", "LAN_DIV_RCD", vnSelIdx);
					vsItemNm = util.Grid.getCellValue(app, "grdCrsItem", "ITEM_NM", vnSelIdx);
				}
				
				util.DataMap.setValue(app, "dmReqKey", "strItemCd", vsItemCd);
				util.DataMap.setValue(app, "dmReqKey", "strRefKey", vsRefKey);
				util.DataMap.setValue(app, "dmReqKey", "strLanDivRcd", vsLanDivRcd);
				util.DataMap.setValue(app, "dmReqKey", "strItemNm", vsItemNm);
				
				// 리피터 변경사항 체크
				if(util.Grid.isModified(app, ["grdCrsItem"], "CRM")){
					
					// tab 이동 하지 않음
					ExtTab.setTabBtn("tabMain", TAB_BTN[vsSelTabId]);
					return false;
				}else{
					
					// 선택된 로우가 신규 로우일 경우 tab 이동 하지 않음 
					if (util.Grid.getRowState(app, "grdCrsItem") == cpr.data.tabledata.RowState.INSERTED) {
						util.Grid.restoreRow(app, "grdCrsItem");
						ExtTab.setTabBtn("tabMain", TAB_BTN[vsSelTabId]);
						return false;
					}
				}	
				
				break;
			}
			
			// 언어확장
			case TAB.LANG : {
				// 리피터 변경사항 체크
				if(util.Grid.isModified(app, ["grdCrsItemLan"], "CRM")){
					// tab 이동 하지 않음
					ExtTab.setTabBtn("tabMain", TAB_BTN[vsSelTabId]);
					return false;
				}
				
				break;
			}
			
			// 조건
			case TAB.COND : {
				// 리피터 변경사항 체크
				if(util.Grid.isModified(app, ["grdCrsItemCond"], "CRM")){
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
			// 등록금 항목
			case TAB.ITEM : {
				doListItem(function(pbSuccess) {
					// 조회 : "조회되었습니다." header 메세지 표시
					if(pbSuccess) util.Msg.notify(app, "NLS.INF.M024");
					
					var vsFindItemCd = util.DataMap.getValue(app, "dmReqKey", "strItemCd");
					util.Grid.selectRowByCondition(app, "grdCrsItem" , "/root/resList/rpt/rptItem/row/ITEM_CD", "==", vsFindItemCd, 0);
				});
				
				break;
			}
			// 언어
			case TAB.LANG : {
				doListItemLan(function(pbSuccess) {
					if(pbSuccess) util.Msg.notify(app, "NLS.INF.M024");
				});
				
				break;
			}
			// 조건
			case TAB.COND : {
				doListItemCond(function(pbSuccess) {
					if(pbSuccess) util.Msg.notify(app, "NLS.INF.M024");
				});
				
				break;
			}
		}
	}
	
	/**
	 * @desc 등록금항목 조회 실행
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-02-03
	 */
	function doListItem(poCallBackFunc) {
		//strCommand: listItem 
		util.Submit.send(app, "subListItem", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdCrsItem");
				
				// 조회 후 콜백함수 수행
				if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess); 
			}
		}); 
	};
	
	/**
	 * @desc 등록금언어 조회 실행
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-02-03
	 */
	function doListItemLan(poCallBackFunc) {
		//strCommand: listItemLan 
		util.Submit.send(app, "subListItemLan", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdCrsItemLan");
				
				// 조회 후 콜백함수 수행
				if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess); 
			}
		}); 
	};
	
	/**
	 * @desc 등록금항목별조건 조회 실행
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-02-03
	 */
	function doListItemCond(poCallBackFunc) {
		//strCommand: listItemCond 
		util.Submit.send(app, "subListItemCond", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdCrsItemCond");
				
				// 조회 후 콜백함수 수행
				if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess); 
				
				var vsUsedFlag = util.DataMap.getValue(app, "dmResList", "strUsedFlag");
				
				if (vsUsedFlag == "Y") {
					util.Msg.notify(app, "NLS.CRS.M003");
					util.Control.setEnable(app, false, maChangeMod);
					doSetAttrRptReadOnly("rptCrsItemCond", false);
				} else {
					util.Control.setEnable(app, true, maChangeMod);
					doSetAttrRptReadOnly("rptCrsItemCond", true);
				}
			}
		}); 
	};
	
	/**
	 * @desc 리피트 비/활성화 제어
	 * @return void
	 * @author Aeyoung Lee 2016-02-03
	 */		
	function doSetAttrRptReadOnly(pcRpt, pbEnable) {
		var vsChild = ExtRepeat.getRepChildIDList(pcRpt, "detail", "" , ",");
		vsChild = vsChild.substring(0, vsChild.length-1);
		
		var voChilds = vsChild.split(",");
		
		util.Control.setEnable(app, pbEnable, voChilds);
	};
	
	/**
	 * @desc   등록금항목 리피트 변경 이벤트
	 * @return void
	 * @author Aeyoung Lee 2016-02-02
	 */	
	function doAfterValueChangRptCrsItem(psDiv) {
		var vnRowIdx = util.Grid.getIndex(app, "grdCrsItem");
		var vsValue = util.Grid.getCellValue(app, "grdCrsItem", psDiv, vnRowIdx)	;
		
		// 폐기여부
		if(psDiv == "EXP_YN"){
			if (vsValue == "Y") {
				var vsCurrDate = util.DataMap.getValue(app, "dmResList", "strCurrentDt");
				util.Grid.setCellValue(app, "grdCrsItem", "EXP_DT", vsCurrDate, vnRowIdx);
			} else {
				util.Grid.setCellValue(app, "grdCrsItem", "EXP_DT", "", vnRowIdx);	
			}
			
			// 폐기여부에 따른 폐기일 bind 처리
//TO-BE: <ExtControl.refreshBind> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//			ExtControl.refreshBind("binRoItemExpDt");
		}
		
		// 항목명
		else if(psDiv == "ITEM_NM"){
			if(!ValueUtil.isNull(vsValue)){
				util.Grid.setCellValue(app, "grdCrsItem", "PRT_ITEM_NM", vsValue, vnRowIdx);
			}	
		}	
		
	};
	
	/**
	 * @desc 등록금항목 신규 click event
	 * @return void
	 * @author Aeyoung Lee 2016-02-03
	 */	
	moPage.onClick_BtnNewItem = function() {
		//해당 리피트 insertRow 후 편집 시작할 컬럼 지정		
		var voNewRow = util.Grid.insertRow(app, "grdCrsItem", "rdIpbItemCdItem");
		util.Grid.setCellValue(app, "grdCrsItem", "LAN_DIV_RCD" , util.getSystemLocale(), voNewRow);
	};
	
	/**
	 * @desc 등록금항목 삭제 click event
	 * @return void
	 * @author Aeyoung Lee 2016-02-03
	 */	
	moPage.onClick_BtnDeleteItem = function() {
		if(!util.Grid.getIndex(app, "grdCrsItem")){
			util.Msg.notify(app, "NLS.INF.M005");
			return;		
		}
			
		// 선택된 로우를 가져옴
		var vsPanelCheckIdx = util.Grid.getCheckOrSelectedRowIndex(app, "grdCrsItem");
		var voPanelChk;
		
		if(String(vsPanelCheckIdx).indexOf(",") != -1){
			voPanelChk = vsPanelCheckIdx.split(",");
		}else{
			voPanelChk = new Array();
			voPanelChk[0] = vsPanelCheckIdx;
		}	
		
		// 등록금항목 코드 사용여부를 확인한다.
		// 관련 테이블 : 등록금기준금액/등록금환불기준/분납유형세부/등록금계산절차별항목/등록금세부
		// 관련테이블의 사용이 없을시엔 CRS_ITEM_COND를 함께 삭제가능하며, 확인창을 띄운다.
		var vsItemCd = "";
		for(var i = 0; i < voPanelChk.length; i++) {
			vsItemCd += util.Grid.getCellValue(app, "grdCrsItem", "ITEM_CD", voPanelChk[i]) + ",";
		}
		
		vsItemCd = vsItemCd.substring(0,(vsItemCd.length-1));
		util.DataMap.setValue(app, "dmReqKey", "strDelItemCd", vsItemCd);
		
		//2016.08.11 신규일경우 오류발생으로 조치
		if(ValueUtil.isNull(vsItemCd.simpleReplace(",",""))){
			util.Grid.deleteRow(app, "grdCrsItem");	
		}else{	
		
			//strCommand: checkUsed 
			util.Submit.send(app, "subCheckUsed", function(pbSuccess){
				if(pbSuccess){
					util.Grid.deleteRow(app, "grdCrsItem");	
					
					var vnNodeListLength = ExtInstance.getNodeListLength("/root/resList/rpt/rptItem/row[child::UPT_STATUS = 'D']");
					if(vnNodeListLength > 0) util.Msg.alert("NLS-CRS-M004");
				}
			});
		}
	};
	
	/**
	 * @desc 등록금항목 작업취소 click event
	 * @return void
	 * @author Aeyoung Lee 2016-02-03
	 */	
	moPage.onClick_BtnRestoreItem = function() {
		util.Grid.restoreRow(app, "grdCrsItem");
	};
	
	/**
	 * @desc 등록금항목 작업저장 click event
	 * @return void
	 * @author Aeyoung Lee 2016-02-03
	 */	
	moPage.onClick_BtnSaveItem = function() {
		// 리피터 변경사항 체크
		if(!util.Grid.isModified(app, ["grdCrsItem"], "MSG")){
			return false;
		}
		
		//리피트 validation check
		if(!util.validate(app, "grdCrsItem")) return false;
		
		var vnRpnCnt = util.Grid.getRowCount(app, "grdCrsItem");
		
		for(var i = 1; i<vnRpnCnt+1; i++){
			
			var vsExpYnItem = util.Grid.getCellValue(app, "grdCrsItem", "EXP_YN", i);
			var vsExpDtItem = util.Grid.getCellValue(app, "grdCrsItem", "EXP_DT", i); 
			if (vsExpYnItem == "Y" && ValueUtil.isNull(vsExpDtItem)) {
				util.Msg.alert("NLS-CRS-M075", i+"");
				ExtRepeat.setColFocus("rptCrsItem", i, "rdDipExpDtItem");
				return false;
			}else if(vsExpYnItem != "Y" && !ValueUtil.isNull(vsExpDtItem)){
				util.Grid.setCellValue(app, "grdCrsItem", "EXP_DT", "", i);	
			}	
		}	
			
		//strCommand: saveItem 
		util.Submit.send(app, "subSaveItem", function(pbSuccess){
			if(pbSuccess){
				doListItem(function(pbListSuccess){
					if(pbListSuccess) util.Msg.notify(app, "NLS.INF.M025");
				});
			}
		});
	};
	
	/**
	 * @desc 등록금언어 리피트 값변경
	 * @return void
	 * @author Aeyoung Lee 2016-02-03
	 */
	function doAfterValueChangRptCrsItemLang(psDiv) {
		var vnRowIdx = util.Grid.getIndex(app, "grdCrsItemLan");
		var vsValue = util.Grid.getCellValue(app, "grdCrsItemLan", psDiv, vnRowIdx)	;
		
		// 항목명
		if(psDiv == "ITEM_NM"){
			if(!ValueUtil.isNull(vsValue)){
				util.Grid.setCellValue(app, "grdCrsItemLan", "PRT_ITEM_NM", vsValue, vnRowIdx);
			}	
		}	
	};
	
	/**
	 * @desc 등록금언어 신규 click event
	 * @return void
	 * @author Aeyoung Lee 2016-02-03
	 */	
	moPage.onClick_BtnNewItemLan = function() {
		
		//해당 리피트 insertRow 	
		var vnNewRow = util.Grid.insertRow(app, "grdCrsItemLan");
		
		var vsItemCd = util.DataMap.getValue(app, "dmReqKey", "strItemCd");
		var vsRefKey = util.DataMap.getValue(app, "dmReqKey", "strRefKey");
		
		if(ValueUtil.isNull(vsRefKey)){
			//strCommand: refKey 
			util.Submit.send(app, "subRefKey", function(pbSuccess){
				if(pbSuccess){
					vsRefKey = util.DataMap.getValue(app, "dmReqKey", "strRefKey");
					
					util.Grid.setCellValue(app, "grdCrsItemLan", "ITEM_CD", vsItemCd, vnNewRow);
					util.Grid.setCellValue(app, "grdCrsItemLan", "REF_KEY", vsRefKey, vnNewRow);
					ExtRepeat.setColFocus("rptCrsItemLan", vnNewRow, "rdCbbLanDivRcd");
				}
			});
		}else{
			util.Grid.setCellValue(app, "grdCrsItemLan", "ITEM_CD", vsItemCd, vnNewRow);
			util.Grid.setCellValue(app, "grdCrsItemLan", "REF_KEY", vsRefKey, vnNewRow);
			ExtRepeat.setColFocus("rptCrsItemLan", vnNewRow, "rdCbbLanDivRcd");
		}
	};
	
	/**
	 * @desc 등록금언어 삭제 click event
	 * @return void
	 * @author Aeyoung Lee 2016-02-03
	 */	
	moPage.onClick_BtnDeleteItemLan = function() {
		if(!util.Grid.getIndex(app, "grdCrsItemLan")){
			util.Msg.notify(app, "NLS.INF.M005");
			return;		
		}
		
		var vsDefaultLanDivRcd = util.DataMap.getValue(app, "dmReqKey", "strLanDivRcd");
		
		// 선택된 로우를 가져옴
		var vsPanelCheckIdx = util.Grid.getCheckOrSelectedRowIndex(app, "grdCrsItemLan");
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
			var vsLanDivRcd = util.Grid.getCellValue(app, "grdCrsItemLan", "LAN_DIV_RCD", voPanelChk[i]);
			var vsUptStatus = util.Grid.getRowState(app, "grdCrsItemLan", voPanelChk[i]); 
			
			if (vsDefaultLanDivRcd == vsLanDivRcd && vsUptStatus != "insert") {
				util.Msg.alert("NLS-WRN-M010");
				return false;
			}
		}
		
		util.Grid.deleteRow(app, "grdCrsItemLan");
	};
	
	/**
	 * @desc 등록금언어 작업취소 click event
	 * @return void
	 * @author Aeyoung Lee 2016-02-03
	 */	
	moPage.onClick_BtnRestoreItemLan = function() {
		util.Grid.restoreRow(app, "grdCrsItemLan");
	};
	
	/**
	 * @desc 등록금항목 작업저장 click event
	 * @return void
	 * @author Aeyoung Lee 2016-02-03
	 */	
	moPage.onClick_BtnSaveItemLan = function() {
		// 리피터 변경사항 체크
		if(!util.Grid.isModified(app, ["grdCrsItemLan"], "MSG")){
			return false;
		}
		
		//리피트 validation check
		if(!util.validate(app, "grdCrsItemLan")) return false;
			
		//strCommand: saveItemLan 
		util.Submit.send(app, "subSaveItemLan", function(pbSuccess){
			if(pbSuccess){
				doListItemLan(function(pbListSuccess){
					if(pbListSuccess) util.Msg.notify(app, "NLS.INF.M025");
				});
			}
		});
	};
	
	/**
	 * @desc 등록금항목별조건 신규 click event
	 * @return void
	 * @author Aeyoung Lee 2016-02-03
	 */	
	moPage.onClick_BtnNewItemCond = function() {
		//해당 리피트 insertRow 	
		var vnNewRow = util.Grid.insertRow(app, "grdCrsItemCond","rdCbbCondRcdCond");
		var vsItemCd = util.DataMap.getValue(app, "dmReqKey", "strItemCd");
		
		util.Grid.setCellValue(app, "grdCrsItemCond", "ITEM_CD", vsItemCd, vnNewRow);
	};
	
	/**
	 * @desc 등록금항목별조건 삭제 click event
	 * @return void
	 * @author Aeyoung Lee 2016-02-03
	 */	
	moPage.onClick_BtnDeleteItemCond = function() {
		util.Grid.deleteRow(app, "grdCrsItemCond");
	};
	
	/**
	 * @desc 등록금항목별조건 작업취소 click event
	 * @return void
	 * @author Aeyoung Lee 2016-02-03
	 */	
	moPage.onClick_BtnRestoreItemCond = function() {
		util.Grid.restoreRow(app, "grdCrsItemCond");
	};
	
	/**
	 * @desc 등록금항목별조건 작업저장 click event
	 * @return void
	 * @author Aeyoung Lee 2016-02-03
	 */	
	moPage.onClick_BtnSaveItemCond = function() {
		// 리피터 변경사항 체크
		if(!util.Grid.isModified(app, ["grdCrsItemCond"], "MSG")){
			return false;
		}
		
		//리피트 validation check
		if(!util.validate(app, "grdCrsItemCond")) return false;
			
		//strCommand: saveItemCond 
		util.Submit.send(app, "subSaveItemCond", function(pbSuccess){
			if(pbSuccess){
				doListItemCond(function(pbListSuccess){
					if(pbListSuccess) util.Msg.notify(app, "NLS.INF.M025");
				});
			}
		});
	};
	
	return moPage;
};

