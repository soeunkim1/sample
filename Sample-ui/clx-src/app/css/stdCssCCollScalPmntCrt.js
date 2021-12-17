//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./stdCssCCollScalPmntCrt.xtm"/>

/**
 * 일괄장학생지급생성
 * @class stdCssPCollScalPmntCrt
 * @author Aeyoung Lee 2016. 3. 15
 */
var stdCssCCollScalPmntCrt = function() {
	var moPage = new Page();
	var moPObject 	= new PObject();
	
	/**
	 * 팝업 관련 설정사항
	 */
	moPObject.moPopParam = {
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
		onLoadCollImp(function(pbSuccess){
			if(pbSuccess){
				doOnLoad();
			}
		});
	};
	
	/**
	 * @desc OnLoad 이벤트
	 * @param 
	 * @return  void
	 * @author Aeyoung Lee 2016. 3. 15
	 */
	moPage.onLoadImportDone_StdCssPCollScalPmntCrt = function() {
		// 리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["rptScalStudPmntPop","rptScalStudPop"]);
		// 검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grpData"]);
		
		//암호화컬럼 설정
		ExtRepeat.addOriginCol("rptScalStudPmntPop", ["STUD_ACCT_NO"]);
		ExtRepeat.addOriginCol("rptScalStudPop", ["STUD_ACCT_NO"]);
		
		//화면 온로드 서브미션 호출 
		//2016. 3. 22 바로 호출시 오류발생으로 조회조건 Imp Onload 후 콜백으로 진행으로 변경
		//this.doOnLoad();
	};
	
	/**
	 * @desc 화면 온로드 서브미션 호출
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 15
	 */
	function doOnLoad() {
		// 부모창 값 셋팅
		var voScalPmntCrtParam =  ExtPopUp.getParentVal("moScalPmntCrtParam");
		
		util.Control.setValue(app, "cbbSchYearImp", voScalPmntCrtParam.schYearRcd);
		util.Control.setValue(app, "cbbSmtImp", voScalPmntCrtParam.smtRcd);
		util.Control.setValue(app, "ipbDeptNmImp", voScalPmntCrtParam.deptNm);
		util.Control.setValue(app, "ipbDeptCdImp", voScalPmntCrtParam.deptCd);
		util.Control.setValue(app, "ipbDeptObjDivRcdImp", voScalPmntCrtParam.deptObjDivCd);
		util.Control.setValue(app, "ipbScalFeeNmImp", voScalPmntCrtParam.scalFeeNm);
		util.Control.setValue(app, "ipbScalFeeCdImp", voScalPmntCrtParam.scalFeeCd);
		util.Control.setValue(app, "cbbScalFeeCls1Imp", voScalPmntCrtParam.scalFeeCls1);
		util.Control.setValue(app, "cbbScalFeeCls2Imp", voScalPmntCrtParam.scalFeeCls2);
		util.Control.setValue(app, "cbbScalFeeCls3Imp", voScalPmntCrtParam.scalFeeCls3);
		util.Control.setValue(app, "cbbScalFeeCls4Imp", voScalPmntCrtParam.scalFeeCls4);
		util.Control.setValue(app, "cbbScalFeeCls5Imp", voScalPmntCrtParam.scalFeeCls5);
		util.Control.setValue(app, "ipbStudIdImp", voScalPmntCrtParam.studNo);
		util.Control.setValue(app, "ipbStudIdObjImp", voScalPmntCrtParam.studId);
		util.Control.setValue(app, "cbbPmntDivImp", voScalPmntCrtParam.pmntDivRcd);
		util.Control.setValue(app, "cbbPmntItvRcdImp", voScalPmntCrtParam.pmntItvRcd);
		
		// 서브미션 호출
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				util.Header.clickSearch(app);
			}
		});
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
	 * @desc 장학생 조회
	 * @param poCallBackFunc 콜백정의
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 15
	 */
	function doList(poCallBackFunc) {
		
		//strCommand: listScalStud 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdScalStudPmntPop");
				util.Control.redraw(app, "grdScalStudPop");
				
				//2016.08.03 서비스단에서 셋팅되도록 수정함
				// 계좌셋팅
				//this.doSetStudAcctInfo();
			} 
			// 조회 후 콜백함수 수행
			if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
		});
	};
	
	/**
	 * @desc 계좌셋팅
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 15
	 */
	function doSetStudAcctInfo() {
		
		for (var i = 1; i <= util.Grid.getRowCount(app, "grdScalStudPmntPop"); i++) {
			
			var vsStudBankCd = util.Grid.getCellValue(app, "grdScalStudPmntPop", "BANK_CD", i);
			var vsStudAcctNo = util.Grid.getCellValue(app, "grdScalStudPmntPop", "ACCT_NO", i);
			var vsStudOwerNm = util.Grid.getCellValue(app, "grdScalStudPmntPop", "SHR_OWNER_NM", i);
			
			util.Grid.setCellValue(app, "grdScalStudPmntPop", "STUD_BANK_CD", vsStudBankCd, i);
			util.Grid.setCellValue(app, "grdScalStudPmntPop", "STUD_ACCT_NO", vsStudAcctNo, i);
			util.Grid.setCellValue(app, "grdScalStudPmntPop", "OWNER_NM", vsStudOwerNm, i);
		}	
	};
	
	/**
	 * @desc [btnCrtPmnt]일괄생성 onClick 이벤트
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 15
	 */
	moPage.onClick_BtnCrtPmnt = function() {
		// Validation Check
		if(!util.validate(app, ["dipProcPlanDt","grdScalStudPmntPop"])) return false;
		
		var vnChekNodeLength = ExtInstance.getNodeListLength("/root/resList/rptScalStudPmnt/row[child::DEL_CKB='Y']");
		if (vnChekNodeLength <= 0 ) {
			// "@(을)를 선택해주세요" 메시지 출력
			util.Msg.alert("NLS-INF-M045", [util.Grid.getTitle(app, "grdScalStudPmntPopScalStudPmntPop")]);
			return false;
		}
		
		util.Grid.setRowStateAll(app, "grdScalStudPop", cpr.data.tabledata.RowState.UNCHANGED);
		util.Grid.setRowStateAll(app, "grdScalStudPmntPop", cpr.data.tabledata.RowState.UNCHANGED);
		
		var vsPanelCheckIdx = util.Grid.getCheckOrSelectedRowIndex(app, "grdScalStudPmntPop");
		var voPanelChk;
		
		if(String(vsPanelCheckIdx).indexOf(",") != -1){
			voPanelChk = vsPanelCheckIdx.split(",");
		}else{
			voPanelChk = new Array();
			voPanelChk[0] = vsPanelCheckIdx;
		}		
		
		for(var i = 0; i < voPanelChk.length; i++) {
			var vnRow = voPanelChk[i];
			var vsPmntCiiRcd = util.Grid.getCellValue(app, "grdScalStudPmntPop", "PMNT_CII_RCD", vnRow);
			var vsPmntDivRcd = util.Grid.getCellValue(app, "grdScalStudPmntPop", "PMNT_DIV_RCD", vnRow);
			var vsItemCd = util.Grid.getCellValue(app, "grdScalStudPmntPop", "ITEM_CD", vnRow);
			
			// 사전감면
			if(vsPmntDivRcd=="CH001BEF"){
				if(ValueUtil.isNull(vsItemCd)){
					//@1번째 데이타에서 항목은(는) 필수 입력항목입니다.
					util.Msg.alert("NLS-CSS-M072", [vnRow]);
					ExtRepeat.setColFocus("rptScalStudPmntPop", vnRow, "rdCbbItemCd");
					return;
				}
			}
			// 단위계산
			if(vsPmntCiiRcd=="CH201UNT"){	
				if(ValueUtil.isNull(util.Grid.getCellValue(app, "grdScalStudPmntPop", "UNIT_CALC_VAL", vnRow))){
					//i번째의 단위계산값을 입력하십시오.
					util.Msg.alert("NLS-CSS-M030", [vnRow]);
					ExtRepeat.setColFocus("rptScalStudPmntPop", vnRow, "rdIptUnitCalcVal");
					return;
				}
			}
			// 사후지급
			if(vsPmntDivRcd=="CH001AFT"){	
				var vsStudBankCd = util.Grid.getCellValue(app, "grdScalStudPmntPop", "STUD_BANK_CD", vnRow);
				var vsStudAcctNo = util.Grid.getCellValue(app, "grdScalStudPmntPop", "STUD_ACCT_NO", vnRow);
				var vsStudOwerNm = util.Grid.getCellValue(app, "grdScalStudPmntPop", "OWNER_NM", vnRow);
				if(ValueUtil.isNull(vsStudBankCd)){
					//i번째의 은행을 선택하십시오
					util.Msg.alert("NLS-CSS-M031", [vnRow]);
					ExtRepeat.setColFocus("rptScalStudPmntPop", vnRow, "rdCbbStudBankCd");
					return;
				}
				if(ValueUtil.isNull(vsStudAcctNo)){
					//i번째의계좌번호를 입력하십시오.
					util.Msg.alert("NLS-CSS-M032", [vnRow]);
					ExtRepeat.setColFocus("rptScalStudPmntPop", vnRow, "rdIptStudAcctCd");
					return;
				}
				if(ValueUtil.isNull(vsStudOwerNm)){
					//i번째의 소유자를 입력하십시오.
					util.Msg.alert("NLS-CSS-M033", [vnRow]);
					ExtRepeat.setColFocus("rptScalStudPmntPop", vnRow, "rdIptOwnerNm");
					return;
				}
			}
			
			util.Grid.setRowState(app, "grdScalStudPmntPop", cpr.data.tabledata.RowState.UPDATED, vnRow);
			util.Grid.setRowState(app, "grdScalStudPop", cpr.data.tabledata.RowState.UPDATED, vnRow);
		}  
		
		// 지급일괄생성 서브미션
		util.DataMap.setValue(app, "dmCheckStudPmnt", "STUD_ID", "");
		//strCommand: crtPmnt 
		util.Submit.send(app, "subCrtPmnt", function(pbSuccess){
			if(pbSuccess){
				//checkStudPmnt 체크하여 담겨져 있다면 학번 출력.
				var vsStudId = util.DataMap.getValue(app, "dmCheckStudPmnt", "STUD_ID");
				if(!ValueUtil.isNull(vsStudId)) {
					
					var vnFindIdx = util.Grid.selectRowByCondition(app, "grdScalStudPmntPop" , "/root/resList/rptScalStudPmnt/row/STUD_ID", "==", vsStudId, 0);
					var vnRowIdx = Number(vnFindIdx) + 1;
					// @1번째 데이터는 지급횟수를 초과하여 처리할 수 없습니다.
					util.Msg.alert("NLS-CSS-M050", [vnRowIdx]);
					util.Grid.restoreRow(app, "grdScalStudPmntPop", vnRowIdx);
					return;
				}
				
				if(ExtPopUp.isPopUp()){
					ExtPopUp.closeLayeredPopup("doList", null);
				}	
			} 
			
		});
	};
	
	/**
	 * @desc 장학생 목록 rowSelect 시 바인드 적용
	 * @param poCallBackFunc 콜백정의
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 15
	 */
	moPage.onRowSelect_RptScalStudPmntPop = function() {
//TO-BE: <ExtControl.refreshBind> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtControl.refreshBind(["binRoPmntCiiUnit"]);
	};
	
	/**
	 * @desc 장학생 목록 valuechage 이벤트
	 * @param poCallBackFunc 콜백정의
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 15
	 */
	moPage.onValueChanged_RptScalStudPmntPop = function(psDiv) {
		var vnIdx = util.Grid.getIndex(app, "grdScalStudPmntPop");
		
		// 지급금액은 0보다 커야함
		if(psDiv == "AMT"){
			var vnPmntAmt = Number(util.Grid.getCellValue(app, "grdScalStudPmntPop", psDiv, vnIdx));
			if(vnPmntAmt<=0) {
				//지급금액은 0보다 커야 합니다.
				util.Msg.alert("NLS-CSS-M049");
				util.Grid.setCellValue(app, "grdScalStudPmntPop", psDiv, "", vnIdx);
				return;
			}
		
		//단위계산일 경우 지급금액=지급기준의기준값*단위계산값 표시
		}else if(psDiv == "UNIT_CALC_VAL"){
			
			var vsPmntDivRcd = util.Grid.getCellValue(app, "grdScalStudPmntPop", "PMNT_CII_RCD", vnIdx);
			if(vsPmntDivRcd == "CH201UNT") {
				var vnRsltAmt = Number(util.Grid.getCellValue(app, "grdScalStudPmntPop", "CII_VAL", vnIdx)) * Number(util.Grid.getCellValue(app, "grdScalStudPmntPop", "UNIT_CALC_VAL", vnIdx));
				util.Grid.setCellValue(app, "grdScalStudPmntPop", "AMT", vnRsltAmt, vnIdx);
			}
		}
	};
	
	return moPage;
};
