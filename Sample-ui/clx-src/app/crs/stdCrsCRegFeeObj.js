//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
///<xtmlink path="./stdCrsCRegFeeObj.xtm"/>

var stdCrsCRegFeeObj = function() {

	var moPage = new Page();
	var moPObject = new PObject();
	
	/**
	 * @desc import 서브페이지 초기화
	 * @member stdCrsCRegFeeObj
	 * @param
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 3.
	 */
	moPage.onLoadImportDone_ImpSbpHeader = function() {
		doSbpHeaderOnLoad();
	}
	
	/**
	 * @desc 화면 온로드
	 * @member stdCrsCRegFeeObj
	 * @param
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 3.
	 */
	moPage.onModelConstructDone_stdCrsCRegFeeObj = function() {
		//리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["frfRegFee", "rptRegFeeDtl", "rptScalStudPmnt"]);
		
		// 부모창에 있는 값 셋팅
		var voParentInfo = moPage.parent.moCmnInfo;
		
		util.DataMap.setValue(app, "dmReqKey", "strStudId"	 , voParentInfo.studId);
		util.DataMap.setValue(app, "dmReqKey", "strSchYearRcd", voParentInfo.schYearRcd);
		util.DataMap.setValue(app, "dmReqKey", "strSmtRcd"	 , voParentInfo.smtRcd);
		util.DataMap.setValue(app, "dmReqKey", "strStDt"		 , voParentInfo.stDt);
		util.DataMap.setValue(app, "dmReqKey", "strEndDt" 	 , voParentInfo.endDt);
		util.DataMap.setValue(app, "dmReqKey", "strRegClsRcd" , voParentInfo.regClsRcd);
		util.DataMap.setValue(app, "dmReqKey", "strCurrentDt" , voParentInfo.currentDt);
		
		// 등록분류 01이 아니면, 장학금 수혜내역 그리드를 보이지 않도록 처리
		if(voParentInfo.regClsRcd != "CR30101"){
			util.Control.setVisible(app, false, ["rptScalStudPmnt", "lblTitleRptScalStudPmnt", "lblRowCnt_rptScalStudPmnt"]);
			
			util.Control.setStyleAttr(app, "rptRegFeeDtl", "width", 1015);
			util.Control.setStyleAttr(app, "btnSave", "left", 959);
			util.Control.setStyleAttr(app, "btnRestore", "left", 895);
			util.Control.setStyleAttr(app, "btnDel", "left", 830);
			util.Control.setStyleAttr(app, "btnNew", "left", 765);
			util.Control.setStyleAttr(app, "lblRowCnt_rptRegFeeDtl", "left", 700);
		}	
			
		// 조회
		doList(function(pbSuccess) {
			if (pbSuccess){
				//등록금테이블/등록금세부테이블확인
				var vsUsedFlag = util.DataMap.getValue(app, "dmResList", "strUsedFlag");
				if (vsUsedFlag == "N") {
					doSetFrfDefaultData();
					//(팝업)등록금자료가 없습니다. 등록금을 자동생성하시겠습니까? 
					doShowRegFeeObjPrcdCrt("impStdCrsRegFeeObjPrcd");
				} else {
					// "조회되었습니다."
					this.setParentMsg(NLS.INF.M024);		
				}	
			}
		});
	};

	/**
	 * @desc 등록금, 등록금세부, 장학생지급 내역을 조회한다.
	 * @member stdCrsCRegFeeObj
	 * @param poCallBackFunc 콜백 함수
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 3.
	 */
	function doList(poCallBackFunc) {
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess) {
			if (pbSuccess) {
				util.Control.redraw(app, ["frfRegFee" ,"rptRegFeeDtl", "rptScalStudPmnt"]);
				
				// 값이 있는 경우에만 복사하여 프리폼에 데이터 뿌림
				if(util.DataSet.getRowCount(app, "dsListRegFee") > 0) {
//TO-BE: 단독 프리폼에 대한 데이터 바인딩은 공통단에서 자동 처리됨(삭제 필요)
					ExtFreeForm.copyToInstance("frfRegFee", "/root/resList/listRegFee/row", 1);
				}
//TO-BE: <ExtControl.refreshBind> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//				ExtControl.refreshBind(["binRoDivPayAmt"]);
				
				// 분납번호가 있는 경우 저장 못하도록 함
				var vsDivPayNo = util.Grid.getCellValue(app, "frfRegFee", "DIV_PAY_NO", 1);
				
				if(!ValueUtil.isNull(vsDivPayNo)){
					util.Control.setEnable(app, false, ["btnSaveDeleteReg", "btnNew", "btnDel", "btnRestore"]);
				}else{
					util.Control.setEnable(app, true, ["btnSaveDeleteReg", "btnNew", "btnDel", "btnRestore"]);
				}	
				
				doSetTotPayAmt();
				
				if(util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
			}
		});
	};
	
	/**
	 * @desc 프리폼 insert모드로 셋팅
	 * @member stdCrsCRegFeeObj
	 * @param poCallBackFunc 콜백 함수
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 3.
	 */
	function doSetFrfDefaultData() {
		util.FreeForm.insertRow(app, "frfRegFee");
		util.Grid.setCellValue(app, "frfRegFee", "STUD_ID"		, util.DataMap.getValue(app, "dmReqKey", "strStudId"), 1);
		util.Grid.setCellValue(app, "frfRegFee", "SCH_YEAR_RCD"	, util.DataMap.getValue(app, "dmReqKey", "strSchYearRcd"), 1);
		util.Grid.setCellValue(app, "frfRegFee", "SMT_RCD"		, util.DataMap.getValue(app, "dmReqKey", "strSmtRcd"), 1);
		util.Grid.setCellValue(app, "frfRegFee", "REG_CLS_RCD"	, util.DataMap.getValue(app, "dmReqKey", "strRegClsRcd"), 1);
		util.Grid.setCellValue(app, "frfRegFee", "IFR_DT"		, util.DataMap.getValue(app, "dmReqKey", "strCurrentDt"), 1); 
		util.Grid.setCellValue(app, "frfRegFee", "PAY_CLOSE_DT"	, util.DataMap.getValue(app, "dmResList", "strPayCloseDt"), 1);
	};
	
	/**
	 * @desc 등록금 계산
	 * @member stdCrsCRegFeeObj
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 3.
	 */
	function doFeeCalculatePrcd(pbPrcdCd, poCallbackFunc) {
		var vsErrorMsg = null;
		util.DataMap.setValue(app, "dmReqKey", "strPrcdCd", pbPrcdCd);
		
		// 등록금 계산 서브미션
		//strCommand: feeCalculatePrcd 
		util.Submit.send(app, "subFeeCalculatePrcd", function(pbSuccess) {
			if(pbSuccess) {
				vsErrorMsg = util.DataMap.getValue(app, "dmResList", "strErrorMsg");
				if(ValueUtil.isNull(vsErrorMsg)){
					
					util.Control.redraw(app, ["frfRegFee" ,"rptRegFeeDtl", "rptScalStudPmnt"]);
					// 값이 있는 경우에만 복사하여 프리폼에 데이터 뿌림
					if(util.DataSet.getRowCount(app, "dsListRegFee") > 0) {
//TO-BE: 단독 프리폼에 대한 데이터 바인딩은 공통단에서 자동 처리됨(삭제 필요)
						ExtFreeForm.copyToInstance("frfRegFee", "/root/resList/listRegFee/row", 1);
						util.Grid.setRowState(app, "frfRegFee", cpr.data.tabledata.RowState.INSERTED, 1);
					}
					
					util.Control.redraw(app, ["rptRegFeeDtl", "rptScalStudPmnt"]);
//TO-BE: <ExtControl.refreshBind> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//					ExtControl.refreshBind(["binRoDivPayAmt"]);
					
					//상태값 변경
					var vnRowCnt = util.Grid.getRowCount(app, "grdRegFeeDtl");
					for (var j = 1; j <= vnRowCnt; j++) {
						util.Grid.setRowState(app, "grdRegFeeDtl", cpr.data.tabledata.RowState.INSERTED, j);
						util.Grid.setCellValue(app, "grdRegFeeDtl", "UPT_STATUS", "N", j);
					}
					
				}else{
					this.setParentMsg(vsErrorMsg);
					
					util.Control.redraw(app, ["frfRegFee" ,"rptRegFeeDtl", "rptScalStudPmnt"]);
					// 값이 있는 경우에만 복사하여 프리폼에 데이터 뿌림
					if(util.DataSet.getRowCount(app, "dsListRegFee") > 0) {
//TO-BE: 단독 프리폼에 대한 데이터 바인딩은 공통단에서 자동 처리됨(삭제 필요)
						ExtFreeForm.copyToInstance("frfRegFee", "/root/resList/listRegFee/row", 1);
					}
					
//TO-BE: <ExtControl.refreshBind> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//					ExtControl.refreshBind(["binRoDivPayAmt"]);
					
					doSetFrfDefaultData();
				}
				
				if(util.isFunc(poCallbackFunc)) poCallbackFunc(vsErrorMsg);
			}else{
				//자동산출 실패했습니다.
				vsErrorMsg = NLS.NSCR.AUTOCALCUFAILED;
				if(util.isFunc(poCallbackFunc)) poCallbackFunc(vsErrorMsg);	
			}
			
			doSetTotPayAmt();
		});
	};
	
	/**
	 * @desc [rptRegFeeDtl] 신규버튼 클릭이벤트
	 * @member stdCrsCRegFeeObj
	 * @param   
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 3.
	 */
	moPage.onClick_BtnNew = function() {
		var vnNewRow = util.Grid.insertRow(app, "grdRegFeeDtl", "rdCbbItemCdReg");
		
		util.Grid.setCellValue(app, "grdRegFeeDtl", "STUD_ID"	 , util.DataMap.getValue(app, "dmReqKey", "strStudId"), vnNewRow);
		util.Grid.setCellValue(app, "grdRegFeeDtl", "SCH_YEAR_RCD", util.DataMap.getValue(app, "dmReqKey", "strSchYearRcd"), vnNewRow);
		util.Grid.setCellValue(app, "grdRegFeeDtl", "SMT_RCD"	 , util.DataMap.getValue(app, "dmReqKey", "strSmtRcd"), vnNewRow);
		util.Grid.setCellValue(app, "grdRegFeeDtl", "REG_CLS_RCD" , util.DataMap.getValue(app, "dmReqKey", "strRegClsRcd"), vnNewRow);
	};
	
	/**
	 * @desc [rptRegFeeDtl] 삭제버튼 클릭 이벤트
	 * @member stdCrsCRegFeeObj
	 * @param   
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 3.
	 */
	moPage.onClick_BtnDel = function() {
		var vnRowIdx = util.Grid.getCheckOrSelectedRowIndex(app, "grdRegFeeDtl");
		if(ValueUtil.isNull(vnRowIdx)){
			util.Msg.notify(app, "NLS.INF.M005");
			return;
		}	
		
		var vsPanelCheckIdx = util.Grid.getCheckOrSelectedRowIndex(app, "grdRegFeeDtl");
		var voPanelChk;
		
		if(String(vsPanelCheckIdx).indexOf(",") != -1){
			voPanelChk = vsPanelCheckIdx.split(",");
		}else{
			voPanelChk = new Array();
			voPanelChk[0] = vsPanelCheckIdx;
		}	
		
		for(var i = 0; i < voPanelChk.length; i++) {
			var vnRow = voPanelChk[i];
			
			var vsRegFeePay = util.Grid.getCellValue(app, "grdRegFeeDtl", "REG_FEE_PAY", vnRow);
			if(vsRegFeePay == "Y"){
				//등록금납입 정보가 존재함으로 삭제할 수 없습니다.
				util.Msg.alert("NLS-CRS-M063");
				return false;
			}
		}
		
		util.Grid.deleteRow(app, "grdRegFeeDtl");
		
		doSetTotPayAmt();
	};
	
	/**
	 * @desc [rptRegFeeDtl] 작업취소 클릭 이벤트
	 * @member stdCrsCRegFeeObj
	 * @param   
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 3.
	 */
	moPage.onClick_BtnRestore = function() {
		util.Grid.restoreRow(app, "grdRegFeeDtl");
		
		doSetTotPayAmt();
	};
	
	/**
	 * @desc [rptRegFeeDtl] 작업저장 클릭 이벤트
	 * @member stdCrsCRegFeeObj
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 3.
	 */
	moPage.onClick_BtnSave = function() {
		doSave();
	};
	
	/**
	 * @desc 작업저장
	 * @member stdCrsCRegFeeObj
	 * @param poCallbackFunc 콜백함수
	 * @return Boolean
	 * @author Aeyoung Lee 2016. 3. 3.
	 */
	function doSave(poCallbackFunc) {
		// 리피터 변경사항 체크
		if(!util.Grid.isModified(app, ["frfRegFee","grdRegFeeDtl"], null)){
			this.setParentMsg(NLS.WRN.M007);
			return false;
		}
		
		// Validation Check(기본, 고지일자/납부일자, 금액 0 이상)
		if(!util.validate(app, ["frfRegFee","grdRegFeeDtl"])) return false;
		
		//등록금세부테이블의 Row수 체크
		var vnRegDtlLength = ExtInstance.getNodeListLength("/root/resList/rptRegFeeDtl/row[child::UPT_STATUS!='D']");
		if (vnRegDtlLength <= 0 ) {
			//적어도 1개의 등록금 항목을 입력하셔야 합니다.
			util.Msg.alert("NLS-CRS-M028");
			return false;
		}
		
		//strCommand: save 
		util.Submit.send(app, "subSave", function(pbSuccessSave) {
			if(pbSuccessSave) {
				//저장성공 메세지 출력
				doList(function(pbSuccessList) {
					// "갱신된 데이터가 조회되었습니다."
					if(pbSuccessList) {
						this.setParentMsg(NLS.INF.M025);
					}
					
					if(util.isFunc(poCallbackFunc))	poCallbackFunc(pbSuccessList);
				});
			}
		});
	};
	
	/**
	 * @desc [btnSaveDeleteReg] 등록대상자 삭제 버튼 클릭 이벤트
	 * @member stdCrsCRegFeeObj
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 3.
	 */
	moPage.onClick_BtnSaveDeleteReg = function() {
		// 등록대상자 정보를 모두 삭제합니다. 계속하시겠습니까?
		if(!util.Msg.confirm("NLS-CRS-M062") ) return;
		
		//strCommand: deleteReg 
		util.Submit.send(app, "subDeleteReg", function(pbSuccess) {
			if (pbSuccess) {
				// 등록사항 재조회
				ExtSubPage.getParent().callScript("doSetRegInfo");	
				
				// 조회
				doList(function(pbSuccess) {
					if (pbSuccess){
						doSetFrfDefaultData();	
						// "삭제되었습니다."
						this.setParentMsg(NLS.INF.M008);	
					}
				});
			}
		});
	};
	
	/**
	 * @desc [rptRegFeeDtl] 금액 변경 이벤트 - footer 적용
	 * @member stdCrsCRegFeeObj
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 3.
	 */
	moPage.onValueChanged_RdIpbAmtReg = function() {
		ExtRepeat.refresh("rptRegFeeDtl");
		doSetTotPayAmt();
	};
	
	/**
	 * @desc [rptRegFeeDtl] rowSelect 이벤트 - 바인드 refresh
	 * @member stdCrsCRegFeeObj
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 3.
	 */
	moPage.onRowSelect_RptRegFeeDtl = function() {
//TO-BE: <ExtControl.refreshBind> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtControl.refreshBind(["binRoDivPayAmt"]);
	};
	
	/**
	 * @desc 등록금금액 - 장학금금액을 리턴하여 납부금액에 셋팅한다.
	 * @member stdCrsCRegFeeObj
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 3.
	 */
	function doSetTotPayAmt() {
		var vnRegAmt = 0;
		var vnScalAmt = 0;
		for (var i = 1; i <= util.Grid.getRowCount(app, "grdRegFeeDtl"); i++) {
			util.Grid.getRowState(app, "grdRegFeeDtl", i);
			
			if (util.Grid.getRowState(app, "grdRegFeeDtl", i) != cpr.data.tabledata.RowState.DELETED) {
				vnRegAmt += Number(util.Grid.getCellValue(app, "grdRegFeeDtl", "AMT", i));
			}
		}
		
		for (var i = 1; i <= util.Grid.getRowCount(app, "grdScalStudPmnt"); i++) {
			vnScalAmt += Number(util.Grid.getCellValue(app, "grdScalStudPmnt", "AMT", i));
		}
		
		util.FreeForm.setValue(app, "frfRegFee", "TOT_PAY_AMT", vnRegAmt-vnScalAmt);
	};
	
	/**
	 * @desc 부모 헤더에 메세지 뿌리기
	 * @member stdCrsCRegFeeObj
	 * @param  psMsgCode 메시지 코드
	 * @param  paMsg 메시지 변수 
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 3.
	 */
	moPage.setParentMsg = function(psMsgCode, paMsg) {
		util.Msg.notify(app, psMsgCode, paMsg);	
	};
	
	/**
	 * @desc 변경사항체크 - 부모창에서 호출용
	 * @member stdCrsCRegFeeObj
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 3.
	 */
	function doCheckDataChange() {
		if(util.Grid.isModified(app, ["frfRegFee","grdRegFeeDtl"], "CRM") ){
			return false;
		}else{
			return true;
		}
	};
	
	return moPage;
};

