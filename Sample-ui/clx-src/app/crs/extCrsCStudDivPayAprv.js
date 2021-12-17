
//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCrsCStudDivPayAprv.xtm"/>


var extCrsCStudDivPayAprv = function() {
		
	var moPage = new Page();
	var moPObject = new PObject();
	
	/* 
	 * 객체 검색팝업 관련 설정사항
	 */
	moPObject.moIdsForStdCmnPObjSch = [
	{
		controlId 	: "btnDeptNmPop",
		iCd 		: "",
		iNm 		: "ipbDeptNm",
		iObjDivRcd 	: ["CC009SA"],
		iLanDivRcd 	: "",
		iKeyDate 	: "",
		oObjDivRcd 	: "ipbDeptObjDivRcd",
		oCd 		: "ipbDeptCd",
		oCdNm 		: "ipbDeptNm",
		oStDt 		: "",
		oEndDt 		: "",
		oLanDivRcd 	: "",
		func 		: ""
	}
	];
	
	/**
	 * @desc  Header Import onLoad
	 * @return void
	 * @author Aeyoung Lee 2016-05-24
	 */
	moPage.onLoadImportDone_ImpTitle = function() {		
		doHeaderOnLoad();
	};
	
	/**
	 * @desc 온로드 실행
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-05-24
	 */
	moPage.onModelConstructDone_ExtCrsCStudDivPayAprv = function() {
		//리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init("rptDivPayAprv");
		//검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grpData"]);
		
		doOnLoad();
	};
	
	/**
	 * @desc 온로드 실행
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016-05-24
	 */
	function doOnLoad(){
		doOnLoadImpNS("CRS");
		// 서브미션 실행 (실패시 cover page)
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "cbbDivPayStatRcd");
				util.Control.redraw(app, "grdDivPayAprv");
				
				util.Control.setFocus(app, "ipbDeptNm");
			}
		}, true);
	};

	/**
	 * @desc 팝업호출시 기준일자 셋팅
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-05-24
	 */
	function doSetPopKeyDate() {
		var vsEndDt = ExtInstance.getValue("instance('impCommonN')/root/date/END_DT").substr(0,8);
		
		moPObject.moIdsForStdCmnPObjSch[0].iKeyDate = vsEndDt;
	};
	
	/**
	 * @desc 학과명 변경 이벤트
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-05-24
	 */
	moPage.onValueChanged_IpbDeptNm = function(sender) {
		doSetPopKeyDate();
		doOnChangeStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc 학과 팝업 클릭 이벤트
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-05-24
	 */
	moPage.onClick_BtnDeptNmPop = function(sender) {
		doSetPopKeyDate();
		doOnClickStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc 조회 실행
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-05-24
	 */
	moPage.onClick_BtnSearch = function() {
		//작업영역 리피트 변경 내역 체크
		if(util.Grid.isModified(app, "", "CRM")){
			return false;
		}	
		
		if(!util.validate(app, ["grpSearch"])){
			return false;
		}
		
		doList(function(pbSuccess){
			if(pbSuccess) util.Msg.notify(app, "NLS.INF.M024");
		});	
	};
	
	/**
	 * @desc  분납신청자 목록을 조회한다.
	 * @param {Function} poCallBackFunc 콜백정의
	 * @return void
	 * @author Aeyoung Lee 2016-05-24
	 */
	function doList(poCallBackFunc) {
		
		util.DataMap.setValue(app, "dmReqKey", "strSchYearRcd", util.Control.getValue(app, "cbbYearImpNS"));
		util.DataMap.setValue(app, "dmReqKey", "strSmtRcd", util.Control.getValue(app, "cbbSmtImpNS"));
		ExtInstance.setValue("/root/reqKey/strKeyDate", ExtInstance.getValue("instance('impCommonN')/root/date/END_DT"));
		
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdDivPayAprv");	
				
				if(util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
			}
		}); 
	};
	
	/**
	 * @desc 분납신청자 목록에 체크된 리피트 인덱스 배열 리턴
	 * @return Array 리피트에 체크된 인덱스 배열
	 * @author Aeyoung Lee 2016-05-24
	 */
	function doGetSelRowIdx() {
		
		var vsPanelCheckIdx = util.Grid.getCheckOrSelectedRowIndex(app, "grdDivPayAprv");
		var voPanelChk;
		
		if(String(vsPanelCheckIdx).indexOf(",") != -1){
			voPanelChk = vsPanelCheckIdx.split(",");
		}else{
			voPanelChk = new Array();
			voPanelChk[0] = vsPanelCheckIdx;
		}	
		
		return voPanelChk;
	};
	
	/**
	 * @desc 승인처리 click event
	 * @return void
	 * @author Aeyoung Lee 2016-05-24
	 */	
	moPage.onClick_BtnSaveAprv = function() {
		var vnChekNodeLength = ExtInstance.getNodeListLength("/root/resList/rptDivPayAprv/row[child::DEL_CKB='Y']");
		if (vnChekNodeLength <= 0 ) {
			// "@(을)를 선택해주세요" 메시지 출력
			util.Msg.alert("NLS-INF-M045", [util.Grid.getTitle(app, "grdDivPayAprvDivPayAprv")]);
			return false;
		}
		
		util.Grid.setRowStateAll(app, "grdDivPayAprv", cpr.data.tabledata.RowState.UNCHANGED);
		var voPanelChk = doGetSelRowIdx();
		
		for(var i = 0; i < voPanelChk.length; i++) {
			var vnRow = voPanelChk[i];
			var vsDivPayStatRcd = util.Grid.getCellValue(app, "grdDivPayAprv", "DIV_PAY_STAT_RCD", vnRow);
			
			if(vsDivPayStatRcd != "CR203REQ"){
				// 분납상태가 신청이 아닌 경우 승인이 불가능합니다.
				util.Msg.alert("NLS-CRS-M083");	
				util.Grid.selectRow(app, "grdDivPayAprv", vnRow);
				util.Grid.setRowStateAll(app, "grdDivPayAprv", cpr.data.tabledata.RowState.UNCHANGED);
				return;
			}	
			
			util.Grid.setRowState(app, "grdDivPayAprv", cpr.data.tabledata.RowState.UPDATED, vnRow);
		}  
		
		// 승인처리 서브미션
		//strCommand: createDivPay 
		util.Submit.send(app, "subCreateDivPay", function(pbSuccess){
			if(pbSuccess){
				
				doList(function(pbListSuccess){	
					if(pbListSuccess){		
						//분납승인 되었습니다.
						util.Msg.alert("NLS-CRS-M085");
						util.Msg.notify(app, "NLS.INF.M025");
					}
				});
			}else{
				util.Grid.setRowStateAll(app, "grdDivPayAprv", cpr.data.tabledata.RowState.UNCHANGED);	
			}	
		});
	};
	
	/**
	 * @desc 승인취소 click event
	 * @return void
	 * @author Aeyoung Lee 2016-05-24
	 */	
	moPage.onClick_BtnSaveCancel = function() {
		var vnChekNodeLength = ExtInstance.getNodeListLength("/root/resList/rptDivPayAprv/row[child::DEL_CKB='Y']");
		if (vnChekNodeLength <= 0 ) {
			// "@(을)를 선택해주세요" 메시지 출력
			util.Msg.alert("NLS-INF-M045", [util.Grid.getTitle(app, "grdDivPayAprvDivPayAprv")]);
			return false;
		}
		
		util.Grid.setRowStateAll(app, "grdDivPayAprv", cpr.data.tabledata.RowState.UNCHANGED);
		var voPanelChk = doGetSelRowIdx();
		
		for(var i = 0; i < voPanelChk.length; i++) {
			var vnRow = voPanelChk[i];
			var vsDivPayStatRcd = util.Grid.getCellValue(app, "grdDivPayAprv", "DIV_PAY_STAT_RCD", vnRow);
			
			if(vsDivPayStatRcd != "CR203CNF"){
				// 분납상태가 확정(승인)이 아닌 경우 승인취소가 불가능합니다.
				util.Msg.alert("NLS-CRS-M084");	
				util.Grid.selectRow(app, "grdDivPayAprv", vnRow);
				util.Grid.setRowStateAll(app, "grdDivPayAprv", cpr.data.tabledata.RowState.UNCHANGED);
				return;
			}	
			
			util.Grid.setRowState(app, "grdDivPayAprv", cpr.data.tabledata.RowState.UPDATED, vnRow);
		}  
		
		// 승인취소 서브미션
		//strCommand: cancelDivPay 
		util.Submit.send(app, "subCancelDivPay", function(pbSuccess){
			if(pbSuccess){
				
				doList(function(pbListSuccess){
					if(pbListSuccess){		
						//분납승인취소 되었습니다.
						util.Msg.alert("NLS-CRS-M086");
						util.Msg.notify(app, "NLS.INF.M025");
					}	
				});
			}else{
				util.Grid.setRowStateAll(app, "grdDivPayAprv", cpr.data.tabledata.RowState.UNCHANGED);	
			}	
		});
	};

	
	/**
	 * @desc   리피트 패널 체크
	 * @return void
	 * @author Aeyoung Lee 2016-05-24
	 */	
	moPage.onValueChanged_RhCkbSelect = function() {
		// 리피트 패널 설정
//TO-BE: <ExtRepeat.selectedAllPanel> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.selectedAllPanel("rhCkbSelect");
	};
	
	return moPage;
};

