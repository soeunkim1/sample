//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./stdCssCCollScalPmntColl.xtm"/>

/**
 * 일괄장학생지급관리
 * @class stdCssCCollScalPmntColl
 * @author Aeyoung Lee 2016. 3. 15
 */
var stdCssCCollScalPmntColl = function() {
	var moPage = new Page();
	var moPObject 	= new PObject();
	
	/**
	 * 팝업 관련 설정사항
	 */
	moPObject.moScalPmntCrtParam = {
		schYearRcd : "",
		smtRcd : "",
		deptCd : "",
		deptNm : "",
		deptObjDivCd : "",
		scalFeeCls1 : "",
		scalFeeCls2 : "",
		scalFeeCls3 : "",
		scalFeeCls4 : "",
		scalFeeCls5 : "",
		scalFeeCd : "",
		scalFeeNm : "",
		pmntDivRcd : "",
		pmntItvRcd : "",
		studId : "",
		studNo : "" 
	};
	
	/**
	 * @desc import 헤더 초기화
	 * @param 
	 * @return  void
	 * @author Aeyoung Lee 2016. 3. 15
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		// import 헤더 초기화
		doHeaderOnLoad();
	};
	
	/**
	 * @desc import 조회조건 초기화
	 * @param 
	 * @return  void
	 * @author Aeyoung Lee 2016. 3. 15
	 */
	moPage.onLoadImportDone_ImpCssScalCollSch = function() {
		onLoadCollImp();
	};
	
	/**
	 * @desc OnLoad 이벤트
	 * @param 
	 * @return  void
	 * @author Aeyoung Lee 2016. 3. 15
	 */
	function doOnLoad() {
		// 리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["rptScalStudPmnt"]);
		// 검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grpData"]);
		
		ExtRepeat.addOriginCol("rptScalStudPmnt", ["STUD_ACCT_NO"]);
		
		// 서브미션 호출
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				util.Control.setFocus(app, "ipbDeptNmImp");
			}
		}, true);
	};
	
	/**
	 * @desc 조회 onClick 이벤트
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 15
	 */
	moPage.onClick_BtnSearch = function() {
		 // 작업영역 리피트 변경 내역 체크
		if(util.Grid.isModified(app, "", "CRM")){
			return false;
		}
		
		// 조회조건 유효성 체크
		if(!util.validate(app, ["grpSearch"])){
			return false;
		}
		
		// 조회
		doList(function(pbSuccess) {
			if (pbSuccess){
				// "조회되었습니다."
				util.Msg.notify(app, "NLS.INF.M024");					
			}
		});
	};
	
	/**
	 * @desc 장학생 지급 조회
	 * @param poCallBackFunc 콜백정의
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 15
	 */
	function doList(poCallBackFunc) {
		
		//strCommand: listScalStudPmnt 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdScalStudPmnt");
			} 
			// 조회 후 콜백함수 수행
			if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
		});
	};
	
	/**
	 * @desc 장학생 지급 체크된 리피트 인덱스 배열 리턴
	 * @return Array 리피트에 체크된 인덱스 배열
	 * @author Aeyoung Lee 2016. 3. 15
	 */
	function doGetSelRowIdx() {
		
		var vsPanelCheckIdx = util.Grid.getCheckOrSelectedRowIndex(app, "grdScalStudPmnt");
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
	 * @desc [btnNew]신규 onClick 이벤트 
	 * - (일괄장학생지급화면)팝업 호출
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 15
	 */
	moPage.onClick_BtnNew = function() {
		var voPopParam = moPObject.moScalPmntCrtParam;
		
		voPopParam.schYearRcd = ExtInstance.getValue("instance('insCssScalCollSch')/root/reqKey/date/YEAR");
		voPopParam.smtRcd = ExtInstance.getValue("instance('insCssScalCollSch')/root/reqKey/date/SMT");
		voPopParam.deptCd = ExtInstance.getValue("instance('insCssScalCollSch')/root/reqKey/strDeptCd");
		voPopParam.deptNm = ExtInstance.getValue("instance('insCssScalCollSch')/root/reqKey/strDeptNm");
		voPopParam.deptObjDivCd = ExtInstance.getValue("instance('insCssScalCollSch')/root/reqKey/strDeptObjDivRcd");
		voPopParam.scalFeeCls1 = ExtInstance.getValue("instance('insCssScalCollSch')/root/reqKey/strScalFeeCls1");
		voPopParam.scalFeeCls2 = ExtInstance.getValue("instance('insCssScalCollSch')/root/reqKey/strScalFeeCls2");
		voPopParam.scalFeeCls3 = ExtInstance.getValue("instance('insCssScalCollSch')/root/reqKey/strScalFeeCls3");
		voPopParam.scalFeeCls4 = ExtInstance.getValue("instance('insCssScalCollSch')/root/reqKey/strScalFeeCls4");
		voPopParam.scalFeeCls5 = ExtInstance.getValue("instance('insCssScalCollSch')/root/reqKey/strScalFeeCls5");
		voPopParam.scalFeeCd = ExtInstance.getValue("instance('insCssScalCollSch')/root/reqKey/strScalFeeCd");
		voPopParam.scalFeeNm = ExtInstance.getValue("instance('insCssScalCollSch')/root/reqKey/strScalFeeNm");
		voPopParam.studId = ExtInstance.getValue("instance('insCssScalCollSch')/root/reqKey/strStudId");
		voPopParam.studNo = ExtInstance.getValue("instance('insCssScalCollSch')/root/reqKey/strStudNo");
		voPopParam.pmntDivRcd = ExtInstance.getValue("instance('insCssScalCollSch')/root/reqKey/strPmntDivRcd");
		voPopParam.pmntItvRcd = ExtInstance.getValue("instance('insCssScalCollSch')/root/reqKey/strPmntItvRcd");
		
		// 팝업호출
		ExtPopUp.openLayeredPopup("/xtm/css/stdCssCCollScalPmntCrt.xtm", 1180, 580);
	};
		
	/**
	 * @desc [btnDel]삭제 onClick 이벤트
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 15
	 */
	moPage.onClick_BtnDel = function() {
		var vnChekNodeLength = ExtInstance.getNodeListLength("/root/resList/rptScalStudPmnt/row[child::DEL_CKB='Y']");
		if (vnChekNodeLength <= 0 ) {
			// "@(을)를 선택해주세요" 메시지 출력
			util.Msg.alert("NLS-INF-M045", [util.Grid.getTitle(app, "grdScalStudPmntScalStudPmnt")]);
			return false;
		}
		
		// 지급자료를 삭제하시겠습니까?
		if(!util.Msg.confirm("NLS-CSS-M053") ) return;
		
		util.Grid.setRowStateAll(app, "grdScalStudPmnt", cpr.data.tabledata.RowState.UNCHANGED);
		var voPanelChk = doGetSelRowIdx();	
		
		var vsProcStatRcd = util.Control.getValue(app, "cbbProcStatRcdChange");
		var vsProcDate =  util.Control.getValue(app, "dipProcStatRcdDt").substring(0, 8);
		for(var i = 0; i < voPanelChk.length; i++) {
			var vnRow = voPanelChk[i];
			var vsProcPlanDt = util.Grid.getCellValue(app, "grdScalStudPmnt", "PROC_PLAN_DT", vnRow);
			var vsPlanDt = util.Grid.getCellValue(app, "grdScalStudPmnt", "PROC_DT", vnRow);
			
			if(!ValueUtil.isNull(vsProcPlanDt)){
				// @1번째 데이터는 이미 지급처리 또는 지급확정된 자료이므로 @2가(이) 불가능합니다. 
				util.Grid.selectRow(app, "grdScalStudPmnt", vnRow);
				util.Msg.alert("NLS-CSS-M035", [vnRow, NLS.NSCR.DEL]);	
				return;
			}
			
			if(!ValueUtil.isNull(vsPlanDt)){
				// @1번째 데이터는 이미 지급처리 또는 지급확정된 자료이므로 @2가(이) 불가능합니다. 
				util.Grid.selectRow(app, "grdScalStudPmnt", vnRow);
				util.Msg.alert("NLS-CSS-M035", [vnRow, NLS.NSCR.DEL]);	
				return;
			}	
			
			util.Grid.setRowState(app, "grdScalStudPmnt", cpr.data.tabledata.RowState.DELETED, vnRow);
		}  
		
		// 삭제된 지급자료의 장학금액을 다시 sum하여 update
		//strCommand: delScalStudPmnt 
		util.Submit.send(app, "subDelScalStud", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdScalStudPmnt");
			} 
			
			doList(function(pbListSuccess) {
				// 조회 : "갱신된 데이터가 조회되었습니다." header 메세지 표시
				if (pbListSuccess) util.Msg.notify(app, "NLS.INF.M025");
			});
		});
	};
	
	/**
	 * @desc [btnProc]지급처리 onClick 이벤트
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 15
	 */
	moPage.onClick_BtnProc = function() {
		var vnChekNodeLength = ExtInstance.getNodeListLength("/root/resList/rptScalStudPmnt/row[child::DEL_CKB='Y']");
		if (vnChekNodeLength <= 0 ) {
			// "@(을)를 선택해주세요" 메시지 출력
			util.Msg.alert("NLS-INF-M045", [util.Grid.getTitle(app, "grdScalStudPmntScalStudPmnt")]);
			return false;
		}
		
		util.Grid.setRowStateAll(app, "grdScalStudPmnt", cpr.data.tabledata.RowState.UNCHANGED);
		var voPanelChk = doGetSelRowIdx();
		
		var vsProcStatRcd = util.Control.getValue(app, "cbbProcStatRcdChange");
		var vsProcDate =  util.Control.getValue(app, "dipProcStatRcdDt").substring(0, 8);
		for(var i = 0; i < voPanelChk.length; i++) {
			var vnRow = voPanelChk[i];
			var vsProcPlanDt = util.Grid.getCellValue(app, "grdScalStudPmnt", "PROC_PLAN_DT", vnRow);
			var vsPlanDt = util.Grid.getCellValue(app, "grdScalStudPmnt", "PROC_DT", vnRow);
			var vnAmt = Number(util.Grid.getCellValue(app, "grdScalStudPmnt", "AMT", vnRow));
			
			if(!ValueUtil.isNull(vsProcPlanDt)){
				// @1번째 데이터는 이미 지급처리 또는 지급확정된 자료이므로 @2가(이) 불가능합니다. 
				util.Grid.selectRow(app, "grdScalStudPmnt", vnRow);
				util.Msg.alert("NLS-CSS-M035", [vnRow, NLS.NSCR.PAYPRC]);	
				return;
			}
			
			if(!ValueUtil.isNull(vsPlanDt)){
				// @1번째 데이터는 이미 지급처리 또는 지급확정된 자료이므로 @2가(이) 불가능합니다. 
				util.Grid.selectRow(app, "grdScalStudPmnt", vnRow);
				util.Msg.alert("NLS-CSS-M035", [vnRow, NLS.NSCR.PAYPRC]);	
				return;
			}	
			
			if(vnAmt <= 0){
				// @1번째 데이타는 금액이 없으면 @2가 불가능합니다
				util.Grid.selectRow(app, "grdScalStudPmnt", vnRow);
				util.Msg.alert("NLS-CSS-M082", [vnRow, NLS.NSCR.PAYPRC]);
				return;
			}	
			
			util.Grid.setRowState(app, "grdScalStudPmnt", cpr.data.tabledata.RowState.UPDATED, vnRow);
		}  
		
		// 지급처리 컨트롤창 open
		doOpenInputDtDialog(NLS.NSCR.PROCPLANDT, NLS.BTN.B001, "impDialogScalPmntProc");
	};
	
	/**
	 * @desc [btnCancel]지급취소 onClick 이벤트
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 15
	 */
	moPage.onClick_BtnCancel = function() {
		var vnChekNodeLength = ExtInstance.getNodeListLength("/root/resList/rptScalStudPmnt/row[child::DEL_CKB='Y']");
		if (vnChekNodeLength <= 0 ) {
			// "@(을)를 선택해주세요" 메시지 출력
			util.Msg.alert("NLS-INF-M045", [util.Grid.getTitle(app, "grdScalStudPmntScalStudPmnt")]);
			return false;
		}
		
		// @1 자료를 취소하시겠습니까?
		if(!util.Msg.confirm("NLS-CSS-M054",[NLS.NSCR.PAYPRCDID]) ) return;
		
		util.Grid.setRowStateAll(app, "grdScalStudPmnt", cpr.data.tabledata.RowState.UNCHANGED);
		var voPanelChk = doGetSelRowIdx();
		// 체크용 for
		for(var i = 0; i < voPanelChk.length; i++) {
			var vnRow = voPanelChk[i];
			var vsProcPlanDt = util.Grid.getCellValue(app, "grdScalStudPmnt", "PROC_PLAN_DT", vnRow);
			var vsPlanDt = util.Grid.getCellValue(app, "grdScalStudPmnt", "PROC_DT", vnRow);
			var vsDivPayNo = util.Grid.getCellValue(app, "grdScalStudPmnt", "DIV_PAY_NO", vnRow);
			
			if(ValueUtil.isNull(vsProcPlanDt)){
				// @1번째 데이터는 지급처리된 자료가 아닙니다. 
				util.Grid.selectRow(app, "grdScalStudPmnt", vnRow);
				util.Msg.alert("NLS-CSS-M037", [vnRow]);	
				return;
			}
			
			if(!ValueUtil.isNull(vsPlanDt)){
				// @1번째 데이터는 지급확정된 자료이므로 지급처리가 불가능합니다.  
				// -> @번째 데이터는 지급확정된 자료는 지급취소가 불가능합니다. 로 문구 변경
				util.Grid.selectRow(app, "grdScalStudPmnt", vnRow);
				util.Msg.alert("NLS-CSS-M038", [vnRow]);	
				return;
			}	
			
			if(!ValueUtil.isNull(vsDivPayNo)){
				// @1번째 데이터는 등록금분납대상자이므로 처리가 불가능합니다. 등록담당자에게 문의하시기 바랍니다.
				util.Grid.selectRow(app, "grdScalStudPmnt", vnRow);
				util.Msg.alert("NLS-CSS-M039", [vnRow]);	
				return;
			}	
		}  
		
		// 셋팅용 for
		for(var i = 0; i < voPanelChk.length; i++) {
			var vnRow = voPanelChk[i];
			util.Grid.setCellValue(app, "grdScalStudPmnt", "PROC_PLAN_DT", "", vnRow);
		}  
		
		// 지급취소 서브미션
		//strCommand: planCancel 
		util.Submit.send(app, "subPmntCanc", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdScalStudPmnt");
			} 
			
			doList(function(pbListSuccess) {
				// 조회 : "갱신된 데이터가 조회되었습니다." header 메세지 표시
				if (pbListSuccess) util.Msg.notify(app, "NLS.INF.M025");
			});
		});
	};
	
	/**
	 * @desc [btnConfirm]지급확정 onClick 이벤트
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 15
	 */
	moPage.onClick_BtnConfirm = function() {
		var vnChekNodeLength = ExtInstance.getNodeListLength("/root/resList/rptScalStudPmnt/row[child::DEL_CKB='Y']");
		if (vnChekNodeLength <= 0 ) {
			// "@(을)를 선택해주세요" 메시지 출력
			util.Msg.alert("NLS-INF-M045", [util.Grid.getTitle(app, "grdScalStudPmntScalStudPmnt")]);
			return false;
		}
		
		util.Grid.setRowStateAll(app, "grdScalStudPmnt", cpr.data.tabledata.RowState.UNCHANGED);
		var voPanelChk = doGetSelRowIdx();	
		for(var i = 0; i < voPanelChk.length; i++) {
			var vnRow = voPanelChk[i];
			var vsProcPlanDt = util.Grid.getCellValue(app, "grdScalStudPmnt", "PROC_PLAN_DT", vnRow);
			var vsPlanDt = util.Grid.getCellValue(app, "grdScalStudPmnt", "PROC_DT", vnRow);
			
			if(ValueUtil.isNull(vsProcPlanDt)){
				// @1번째 데이터는 지급처리된 자료가 아닙니다.
				util.Grid.selectRow(app, "grdScalStudPmnt", vnRow);
				util.Msg.alert("NLS-CSS-M041", [vnRow]);	
				return;
			}
			
			if(!ValueUtil.isNull(vsPlanDt)){
				// @1번째 데이터는 이미 지급확정된 자료입니다.
				util.Grid.selectRow(app, "grdScalStudPmnt", vnRow);
				util.Msg.alert("NLS-CSS-M040", [vnRow]);	
				return;
			}	
		}  
		
		// 지급확정 컨트롤창 open
		doOpenInputDtDialog(NLS.NSCR.PROCDT, NLS.BTN.B002, "impDialogScalPmntProc");
	};
	
	/**
	 * @desc [btnCfmCancel]지급확정취소 onClick 이벤트
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 15
	 */
	moPage.onClick_BtnCfmCancel = function() {
		var vnChekNodeLength = ExtInstance.getNodeListLength("/root/resList/rptScalStudPmnt/row[child::DEL_CKB='Y']");
		if (vnChekNodeLength <= 0 ) {
			// "@(을)를 선택해주세요" 메시지 출력
			util.Msg.alert("NLS-INF-M045", [util.Grid.getTitle(app, "grdScalStudPmntScalStudPmnt")]);
			return false;
		}
		
		// @1 자료를 취소하시겠습니까?
		if(!util.Msg.confirm("NLS-CSS-M054",[NLS.NSCR.PAYCONFRMDID]) ) return;
		
		util.Grid.setRowStateAll(app, "grdScalStudPmnt", cpr.data.tabledata.RowState.UNCHANGED);
		var voPanelChk = doGetSelRowIdx();	
		// 체크용 for
		for(var i = 0; i < voPanelChk.length; i++) {
			var vnRow = voPanelChk[i];
			var vsPlanDt = util.Grid.getCellValue(app, "grdScalStudPmnt", "PROC_DT", vnRow);
			var vsDivPayNo = util.Grid.getCellValue(app, "grdScalStudPmnt", "DIV_PAY_NO", vnRow);
			
			if(ValueUtil.isNull(vsPlanDt)){
				// @1번째 데이터는 지급확정된 자료가 아닙니다.
				util.Grid.selectRow(app, "grdScalStudPmnt", vnRow);
				util.Msg.alert("NLS-CSS-M042", [vnRow]);	
				return;
			}	
			
			if(!ValueUtil.isNull(vsDivPayNo)){
				// @1번째 데이터는 등록금납부된 자료이므로 취소 불가능합니다. 등록담당자에게 문의하시기 바랍니다.
				util.Grid.selectRow(app, "grdScalStudPmnt", vnRow);
				util.Msg.alert("NLS-CSS-M043", [vnRow]);	
				return;
			}	
		}  
		
		// 셋팅용 for
		for(var i = 0; i < voPanelChk.length; i++) {
			var vnRow = voPanelChk[i];	
			util.Grid.setCellValue(app, "grdScalStudPmnt", "PROC_DT", "", vnRow);
		} 
		
		// 지급확정취소 서브미션
		//strCommand: cfmCancel 
		util.Submit.send(app, "subPmntCanc", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdScalStudPmnt");
			} 
			
			doList(function(pbListSuccess) {
				// 조회 : "갱신된 데이터가 조회되었습니다." header 메세지 표시
				if (pbListSuccess) util.Msg.notify(app, "NLS.INF.M025");
			});
		});
	};
	
	/**
	 * @desc [doSetIptDt]다이얼로그에서 받은 일자를 받아서 지급처리, 지급확정 처리함
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 15
	 */
	function doSetIptDt(psLblDiv) {
		// 지급처리
		if(psLblDiv == NLS.NSCR.PROCPLANDT){
			
			// 지급처리 전 체크서브미션 호출
			ExtInstance.reset("", "/root/resList/checkStudPmnt", true);
			//strCommand: planProcCheck 
			util.Submit.send(app, "subPlanProcCheck", function(pbSuccess) {
				if(pbSuccess){
					var vsStudId     = util.DataMap.getValue(app, "dmCheckStudPmnt", "STUD_ID");
					var vsSerialNo	 = util.DataMap.getValue(app, "dmCheckStudPmnt", "SERIAL_NO");
					var vsFindRowKey = vsStudId + vsSerialNo;
					
					//받은 row가 있다면 메세지처리.. 
					if(!ValueUtil.isNull(vsStudId)){
						
						var voPanelChk = doGetSelRowIdx();
						for(var i = 0; i < voPanelChk.length; i++) {
							var vnRow = voPanelChk[i];
							
							var vsRptFindRowKey = util.Grid.getCellValue(app, "grdScalStudPmnt", "FIND_ROW_KEY", vnRow);
							
							if(vsFindRowKey == vsRptFindRowKey){
								// @1번째 데이터는 지급횟수를 초과하여 처리할 수 없습니다.
								util.Grid.selectRow(app, "grdScalStudPmnt", vnRow);
								util.Msg.alert("NLS-CSS-M050", [vnRow]);
								return false;
							}	
						}
					}
					
					// 일자 변경
					doStatChange(psLblDiv);
				}
			});
		
		// 지급확정
		}else if(psLblDiv == NLS.NSCR.PROCDT){
			
			// 일자 변경
			doStatChange(psLblDiv);
		}	
	};	
	
	
	/**
	 * @desc 처리상태 일괄변경
	 * @param 
	 * @return  void
	 * @author Aeyoung Lee at 2016. 2. 12
	 */
	function doStatChange(psDiv){
		var vsProcDt = util.DataMap.getValue(app, "dmReqKey", "strInputDate");
		
		var voPanelChk = doGetSelRowIdx();
		for(var i = 0; i < voPanelChk.length; i++) {
			var vnRow = voPanelChk[i];
			
			var vsSetDateColId = "";
			switch(psDiv){
				// 지급처리
				case NLS.NSCR.PROCPLANDT :
					util.Grid.setCellValue(app, "grdScalStudPmnt", "PROC_PLAN_DT", vsProcDt, vnRow);
					break;
				// 지급확정
				case NLS.NSCR.PROCDT :
					util.Grid.setCellValue(app, "grdScalStudPmnt", "PROC_DT", vsProcDt, vnRow);
					break;
			}
			
			ExtRepeat.updateRow("rptScalStudPmnt", null, vnRow);
		}  
		
		var vsCmdId = "";
		if(psDiv == NLS.NSCR.PROCPLANDT){
			vsCmdId = "planProc";
		}else if(psDiv == NLS.NSCR.PROCDT){
			vsCmdId = "cfmProc";
		}		
		
		// 변경 서브미션
		//strCommand: vsCmdId 
		util.Submit.send(app, "subPmntProc", function(pbSuccess) {
			doList(function(pbListSuccess) {
				// 조회 : "갱신된 데이터가 조회되었습니다." header 메세지 표시
				if (pbListSuccess) util.Msg.notify(app, "NLS.INF.M025");
			});
		});
		
	};
	
	return moPage;
};
