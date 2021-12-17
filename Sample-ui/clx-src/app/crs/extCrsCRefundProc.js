
//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCrsCRefundProc.xtm"/>


var extCrsCRefundProc = function() {
		
	var moPage = new Page();
	var moPObject = new PObject();
	
	/**
	 * 학생검색팝업 관련 설정사항
	 */
	moPObject.moIdsForStdCsrPStSearch = [
	{
		controlId 		: "btnStudPop",
		iStudNo 		: "ipbStudId",	
		iStudId 		: "",
		iStudNm 		: "",
		iKeyDate 		: "",
		iObjDivRcd 		: "", 
		iObjCd 			: "", 
		iObjNm 			: "",
		iAuthYN 		: "",
		iStatRcd 		: "",
		iStudDivRcd		: "",
		oStudId 		: "ipbStudIdObj",
		oStudNo 		: "ipbStudId",
		oStudNm 		: "",
		oStatNm 		: "",
		oStatRcd 		: "",
		oProcRslt 		: "",
		oProcRsltYear 	: "",
		oSaNm			: "",
		oSaCd 			: "",
		oSpNm 			: "",
		oSpCd 			: "",
		oOgNm 			: "",
		oOgCd 			: "",
		oStudDivRcd		: "",
		oStudDivNm		: "",
		oBirthday		: "",
		oGenderRcd		: "",
		oGenderNm		: "",
		func : null
	}
	];
	
	/**
	 * @desc  Header Import onLoad
	 * @return void
	 * @author Aeyoung Lee 2016-05-30
	 */
	moPage.onLoadImportDone_ImpTitle = function() {		
		doHeaderOnLoad();
	};
	
	/**
	 * @desc 온로드 실행
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-05-30
	 */
	moPage.onModelConstructDone_ExtCrsCDeptRefundAply = function() {
		//리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["rptRefund"]);
		//검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grpData"]);
		
		doOnLoad();
	};
	
	/**
	 * @desc 온로드 실행
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016-05-30
	 */
	function doOnLoad(){
		// 서브미션 실행 (실패시 cover page)
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "cbbProcRsnRcd");
				
				// 현재일자 셋팅
				var vsSysdate = util.DataMap.getValue(app, "dmResOnLoad", "strSysdate").substring(0,8);
				util.Control.setValue(app, "ipbRefStDt", vsSysdate);
				util.Control.setValue(app, "ipbRefEndDt", vsSysdate);
				
				// 기준일자 = 현재일자
				util.DataMap.setValue(app, "dmReqKey", "strKeyDate", vsSysdate);
			}
		}, true);
	};
	
	/**
	 * @desc 팝업호출시 기준일자 셋팅
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-05-30
	 */
	function doSetPopKeyDate() {
		var vsSysdate = util.DataMap.getValue(app, "dmResOnLoad", "strSysdate").substring(0,8);
		
		moPObject.moIdsForStdCsrPStSearch[0].iKeyDate = vsSysdate;
	};
	
	/**
	 * @desc 조회조건 학생 변경 이벤트
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-05-30
	 */
	moPage.onValueChanged_IpbStudId = function(sender) {
		doSetPopKeyDate();
		doOnChangeStdCsrPStSearch(sender);
	};
	
	/**
	 * @desc 조회조건 팝업 클릭 이벤트
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-05-30
	 */
	moPage.onClick_BtnStudPop = function(sender) {
		doSetPopKeyDate();
		doOnClickStdCsrPStSearch(sender);
	};
	
	/**
	 * @desc 조회 실행
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-05-30
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
	 * @desc  환불목록을 조회한다.
	 * @param {Function} poCallBackFunc 콜백정의
	 * @return void
	 * @author Aeyoung Lee 2016-05-30
	 */
	function doList(poCallBackFunc) {
		
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdRefund");
				
				if(util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
			}
		}); 
	};
	
	/**
	 * @desc   리피트 패널 체크
	 * @return void
	 * @author Aeyoung Lee 2016-05-30
	 */	
	moPage.onValueChanged_RhCkbSelect = function() {
		// 리피트 패널 설정
//TO-BE: <ExtRepeat.selectedAllPanel> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.selectedAllPanel("rhCkbSelect");
	};
	
	/**
	 * @desc 환불신청 목록에 체크된 리피트 인덱스 배열 리턴
	 * @return Array 리피트에 체크된 인덱스 배열
	 * @author Aeyoung Lee 2016-05-30
	 */
	function doGetSelRowIdx() {
		
		var vsPanelCheckIdx = util.Grid.getCheckOrSelectedRowIndex(app, "grdRefund");
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
	 * 환불 처리 버튼 클릭 이벤트
	 * @return void
	 * @author AeyoungLee 2016-05-30
	 */	
	moPage.onClick_BtnSaveProc = function() {
		// 환불신청 목록 선택 여부 체크
		var vnChekNodeLength = ExtInstance.getNodeListLength("/root/resList/rptRefund/row[child::DEL_CKB='Y']");
		if (vnChekNodeLength <= 0 ) {
			// "@(을)를 선택해주세요" 메시지 출력
			util.Msg.alert("NLS-INF-M045", [util.Grid.getTitle(app, "grdRefundRefund")]);
			return false;
		}
		
		// 환불일자 입력체크
		if(!util.validate(app, ["ipbRefundDt"])){
			return false;
		}
		
		util.Grid.setRowStateAll(app, "grdRefund", cpr.data.tabledata.RowState.UNCHANGED);
		var voPanelChk = moPage.doGetSelRowIdx();
		
		for(var i = 0; i < voPanelChk.length; i++) {
			var vnRow = voPanelChk[i];
			var vsProcDt = util.Grid.getCellValue(app, "grdRefund", "PROC_DT", vnRow);
			
			// 확정 자료인지 체크
			if(!ValueUtil.isNull(vsProcDt)){
				// 환불처리된 자료가 존재하여 처리불가합니다.
				util.Msg.alert("NLS-CRS-M094");	
				util.Grid.selectRow(app, "grdRefund", vnRow);
				util.Grid.setRowStateAll(app, "grdRefund", cpr.data.tabledata.RowState.UNCHANGED);
				return;
			}	
			
			util.Grid.setRowState(app, "grdRefund", cpr.data.tabledata.RowState.UPDATED, vnRow);
		}  
		
		// 환불처리 서브미션
		//strCommand: procRefund 
		util.Submit.send(app, "subProcRefund", function(pbSuccess){
			if(pbSuccess){
				
				doList(function(pbListSuccess){	
					if(pbListSuccess){		
						
						util.Control.setValue(app, "ipbRefundDt", "");
						
						//환불처리되었습니다.
						util.Msg.alert("NLS-CRS-M095");
						util.Msg.notify(app, "NLS.INF.M025");
					}
				});
			}else{
				util.Grid.setRowStateAll(app, "grdRefund", cpr.data.tabledata.RowState.UNCHANGED);	
			}	
		});
	}
	
	
	/**
	 * 환불취소 버튼 클릭 이벤트
	 * @return void
	 * @author AeyoungLee 2016-05-30
	 */	
	moPage.onClick_BtnSaveCancel = function() {
		// 환불신청 목록 선택 여부 체크
		var vnChekNodeLength = ExtInstance.getNodeListLength("/root/resList/rptRefund/row[child::DEL_CKB='Y']");
		if (vnChekNodeLength <= 0 ) {
			// "@(을)를 선택해주세요" 메시지 출력
			util.Msg.alert("NLS-INF-M045", [util.Grid.getTitle(app, "grdRefundRefund")]);
			return false;
		}
		
		util.Grid.setRowStateAll(app, "grdRefund", cpr.data.tabledata.RowState.UNCHANGED);
		var voPanelChk = doGetSelRowIdx();
		
		for(var i = 0; i < voPanelChk.length; i++) {
			var vnRow = voPanelChk[i];
			
			var vsProcDt = util.Grid.getCellValue(app, "grdRefund", "PROC_DT", vnRow);
			
			if(ValueUtil.isNull(vsProcDt)){
				// 환불처리 되지 않은 자료가 존재하여 처리불가합니다.
				util.Msg.alert("NLS-CRS-M096");	
				util.Grid.selectRow(app, "grdRefund", vnRow);
				util.Grid.setRowStateAll(app, "grdRefund", cpr.data.tabledata.RowState.UNCHANGED);
				return;
			}	
			
			util.Grid.setRowState(app, "grdRefund", cpr.data.tabledata.RowState.UPDATED, vnRow);
		}  
		
		// 환불취소 서브미션
		//strCommand: cancelRefund 
		util.Submit.send(app, "subCancelRefund", function(pbSuccess){
			if(pbSuccess){
				
				doList(function(pbListSuccess){
					if(pbListSuccess){		
						//환불취소가 처리되었습니다.
						util.Msg.alert("NLS-CRS-M097");
						util.Msg.notify(app, "NLS.INF.M025");
					}	
				});
			}else{
				util.Grid.setRowStateAll(app, "grdRefund", cpr.data.tabledata.RowState.UNCHANGED);	
			}	
		});
	};
	
	return moPage;
};
