//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./stdCrsCRegFeePayCrt.xtm"/>

/**
 * 등록납입신규생성
 * @class stdCrsCRegFeeDivPayCrt
 * @author Aeyoung Lee 2016. 3. 28.
 */
var stdCrsCRegFeePayCrt = function() {
	var moPage = new Page();
	var moPObject = new PObject();
	
	/* 
	 * 납입계좌 검색팝업 관련 설정사항
	 */
	moPObject.moIdsForStdCrsPAcctSch = [
	{
		controlId : "btnPayAcctNmPop",
		iCd : "",
		iNm : "ipbPayAcctNm",
		oAcctCd : "ipbPayAcctNo",
		oAcctNm : "ipbPayAcctNm",
		func : null
	}
	]
	
	/**
	 * @desc import 헤더 초기화
	 * @member stdCrsCRegFeeDivPayCrt
	 * @param 
	 * @return  void
	 * @author Aeyoung Lee 2016. 3. 28.
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		// import 헤더 초기화
		doHeaderOnLoad();
	};
	
	/**
	 * @desc OnLoad 이벤트
	 * @member stdCrsCRegFeeDivPayCrt
	 * @param 
	 * @return  void
	 * @author Aeyoung Lee 2016. 3. 28.
	 */
	moPage.onLoadImportDone_StdCrsCRegFeePayCrt = function() {
		// 리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["rptRegFeePayCrtPop"]);
		
		doSetCondition();
	};
	
	/**
	 * @desc 부모창으로부터 받은 조건 세팅
	 * @member stdCrsCRegFeeDivPayCrt
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 28.
	 */
	function doSetCondition() {
		// 부모창 값 셋팅
		var voRegFeePayCrtParam =  ExtPopUp.getParentVal("moRegFeePayCrtParam");
		
		util.DataMap.setValue(app, "dmReqKey", "strStudId"	 , voRegFeePayCrtParam.studId);
		util.DataMap.setValue(app, "dmReqKey", "strSchYearRcd", voRegFeePayCrtParam.schYearRcd);
		util.DataMap.setValue(app, "dmReqKey", "strSmtRcd"	 , voRegFeePayCrtParam.smtRcd);
		util.DataMap.setValue(app, "dmReqKey", "strRegClsRcd" , voRegFeePayCrtParam.regCls);
		
		doList(function(pbSuccess) {
			if (pbSuccess){
				// "조회되었습니다."
				util.Msg.notify(app, "NLS.INF.M024");					
			}
		});
		
	};		
	
	/**
	 * @desc 납부계좌 변경 이벤트
	 * @member stdCrsCRegFeeDivPayCrt
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 28.
	 */
	moPage.onValueChanged_IpbPayAcctNm = function(sender) {
		doOnChangeStdCrsPAcctSch(sender);
	};
	
	/**
	 * @desc 납부계좌검색 버튼 클릭 이벤트
	 * @member stdCrsCRegFeeDivPayCrt
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 28.
	 */
	moPage.onClick_BtnDeptNmPopImp = function(sender) {
		doOnClickStdCrsPAcctSch(sender);
	};
	
	/**
	 * @desc 항목별 납입목록 조회
	 * @member stdCrsCRegFeeDivPayCrt
	 * @param poCallBackFunc 콜백정의
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 28.
	 */
	function doList(poCallBackFunc) {
		
		//strCommand: listCrt 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdRegFeePayCrtPop");
				util.Control.redraw(app, "dipProcDt");
			} 
			// 조회 후 콜백함수 수행
			if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
		});
	};
	
	/**
	 * @desc [rptRegFeePayCrt] 값 변경이벤트
	 * @member stdCrsCRegFeeDivPayCrt
	 * @param psDiv 컬럼 ref
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 28.
	 */
	moPage.onValueChanged_RptRegFeePayCrt = function(psDiv) {
		var vnRowIdx = util.Grid.getIndex(app, "grdRegFeePayCrtPop");
		var vnChkValue = util.Grid.getCellValue(app, "grdRegFeePayCrtPop", psDiv, vnRowIdx)	;
		
		// 금액
		if(psDiv == "AMT"){
			if(Number(vnChkValue) < 0){
				//음수는 입력할 수 없습니다.
				util.Msg.alert("NLS-CRS-M014");
				util.Grid.setCellValue(app, "grdRegFeePayCrtPop", psDiv, "", vnRowIdx);
				return false;
			}
		}
	};
	
	/**
	 * @desc [btnSaveCreate]납입생성 onClick 이벤트
	 * @member stdCrsCRegFeeDivPayCrt
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 28.
	 */
	moPage.onClick_BtnCreate = function() {
		
		var vnChekNodeLength = ExtInstance.getNodeListLength("/root/resList/rptRegFeePayCrtPop/row[child::DEL_CKB='Y']");
		if (vnChekNodeLength <= 0 ) {
			var vsMsgParam = util.Grid.getTitle(app, "grdRegFeePayCrtPopRegFeePayCrtPop");
			// "@(을)를 선택해주세요" 메시지 출력
			util.Msg.alert("NLS-INF-M045", [vsMsgParam]);
			return;
		}
		
		util.Grid.setRowStateAll(app, "grdRegFeePayCrtPop", cpr.data.tabledata.RowState.UNCHANGED);
		
		var vsPanelCheckIdx = util.Grid.getCheckOrSelectedRowIndex(app, "grdRegFeePayCrtPop");
		var voPanelChk;
		
		if(String(vsPanelCheckIdx).indexOf(",") != -1){
			voPanelChk = vsPanelCheckIdx.split(",");
		}else{
			voPanelChk = new Array();
			voPanelChk[0] = vsPanelCheckIdx;
		}	
		
		for(var i = 0; i < voPanelChk.length; i++) {
			var vnRow = voPanelChk[i];
			var vnPayPlanAmt = Number(util.Grid.getCellValue(app, "grdRegFeePayCrtPop", "PAY_PLAN_AMT", vnRow));
			var vnScalPlanAmt = Number(util.Grid.getCellValue(app, "grdRegFeePayCrtPop", "SCAL_PLAN_AMT", vnRow));
			var vnAmt = util.Grid.getCellValue(app, "grdRegFeePayCrtPop", "AMT", vnRow);
			
			//@1번째 항목은 차감할금액이 납부할금액보다 크기때문에 납입할 수 없습니다.
			if (vnPayPlanAmt < vnScalPlanAmt) {
				util.Msg.alert("NLS-CRS-M067", [vnRow]); 
				return;
			}	
			
			//@1번째 항목의 금액은 필수입력 사항입니다.
			if(ValueUtil.isNull(vnAmt)){
				util.Msg.alert("NLS-CRS-M065", [vnRow]);
				ExtRepeat.setColFocus("rptRegFeePayCrtPop", vnRow, "rdIpbAmt");
				return;
			}	
			
			util.Grid.setRowState(app, "grdRegFeePayCrtPop", cpr.data.tabledata.RowState.UPDATED, vnRow);
		}	
		
		if(!util.validate(app, ["grpCond"])) return false;
		
		// 납입생성 서브미션
		//strCommand: create 
		util.Submit.send(app, "subCreate", function(pbSuccess){
			if(pbSuccess){
				if(ExtPopUp.isPopUp()){
					ExtPopUp.closeLayeredPopup("callbackRegFeePayCrt");
				}	
			}	
		});
	};
	
	/**
	 * @desc [rptRegFeePayCrtPop] 로우 select  이벤트
	 * @member stdCrsCRegFeeDivPayCrt
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 28.
	 */
	moPage.onRowSelect_RptRegFeePayCrtPop = function() {
//TO-BE: <ExtControl.refreshBind> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtControl.refreshBind("binRoAmt");
	};
	
	return moPage;
};
