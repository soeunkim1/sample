//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
///<xtmlink path="./stdCrsCRegFeeDivPay.xtm"/>

var stdCrsCRegFeeDivPay = function() {

	var moPage = new Page();
	var moPObject = new PObject();
	
	/**
	 * 분납신규생성팝업 관련 설정사항
	 */
	moPObject.moRegDivPayCrtParam = {
		studId : "",
		schYearRcd : "",
		smtRcd : "",
		regCls : "",
		divPayStatRcd : "",
		divPayDesc : "",
		divPayReqDt : "",
		divPayTypeCd : ""
	};
	
//	var mbClosePopWindow = false;
	var mbDivPayCrtSucc = false;
	var maAllCtrls = ["btnCrtDivPay", "btnSaveCancDivPay", "btnNew", "btnDel", "btnRestore", "btnSave", "rptDivPayDtl"
					, "cbbFrfDivPayStatRcd", "ipbFrfDivPayDesc", "dipFrfDivPayReqDt", "cbbFrfDivPayType"];
	
	/**
	 * @desc import 서브페이지 초기화
	 * @member stdCrsCRegFeeDivPay
	 * @param
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 23.
	 */
	moPage.onLoadImportDone_ImpSbpHeader = function() {
		doSbpHeaderOnLoad();
	}
	
	/**
	 * @desc 화면 온로드
	 * @member stdCrsCRegFeeDivPay
	 * @param
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 23.
	 */
	moPage.onModelConstructDone_stdCrsCRegFeeDivPay = function() {
		//리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["frfRegFee", "rptDivPayDtl"]);
		
		// 부모창에 있는 값 셋팅
		var voParentInfo = moPage.parent.moCmnInfo;
		
		util.DataMap.setValue(app, "dmSearchData", "strStudId"	, voParentInfo.studId);
		util.DataMap.setValue(app, "dmSearchData", "strSchYearRcd", voParentInfo.schYearRcd);
		util.DataMap.setValue(app, "dmSearchData", "strSmtRcd"	, voParentInfo.smtRcd);
		util.DataMap.setValue(app, "dmSearchData", "strRegClsRcd"	, voParentInfo.regClsRcd);
			
		doOnLoad();
	};
	
	/**
	 * @desc 온로드 서브미션 
	 * @member stdCrsCRegFeeDivPay
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 23.
	 */
	function doOnLoad() {
		// onload 서브미션
		ExtSubmission.sendEx("subOnLoad", "onLoad");
		
		// 등록금납입여부 체크 서브미션
		//strCommand: checkRegFeePay 
		util.Submit.send(app, "subCheckPay", function(pbSuccess) {
			if (pbSuccess) {
//				//초기 onload시, 분납생성, 분납취소, 작업저장 : list조회
//				//분납생성창을 그냥 닫을시 : list조회하지 말것!
//				if(mbClosePopWindow) {
//					//doList수행하지 않음!
//					mbClosePopWindow = false;
//					var voRegFeePay = ExtInstance.getValue("/root/resList/regFeePayYn");
//					if(!!voRegFeePay){
//						//납부데이터 있다면 모든객체 disable
//						ExtControl.setEnable(false, maAllCtrls);
//						//분납신청일자, 분납내역, 작업저장 활성
//						ExtControl.setEnable(true, ["dipFrfDivPayReqDt", "ipbFrfDivPayDesc", "btnSave"]);
//					} else {
//						//분납번호가 없는경우 - 분납처리가능(분납생성버튼enable, 취소,신규,삭제 disable)
//						if(ValueUtil.isNull(ExtFreeForm.getValue("frfRegFee", "DIV_PAY_NO"))) {
//							ExtControl.setEnable(true, maAllCtrls);	
//							ExtControl.setEnable(false, ["btnSaveCancDivPay", "btnNew", "btnDel", "btnRestore"]);
//						}//분납번호가 있는경우-분납상태필드 disable
//						else {
//							ExtControl.setEnable(true, maAllCtrls);
//							ExtControl.setEnable(false, ["cbbFrfDivPayStatRcd"]);
//						}
//					}
//				} else {
					
					doList(function(pbSuccess) {
						if(pbSuccess) {
							//등록대상자가 아니라면 모두 비활성
							var vnNodeListLength = util.DataSet.getRowCount(app, "dsListRegFee");
							if(vnNodeListLength <= 0){
								util.Control.setEnable(app, false, maAllCtrls);
								return;
							}
							
							if(mbDivPayCrtSucc){
								//분납자료가 생성되었습니다.
								this.setParentMsg(NLS.CRS.M069);	
								// 등록사항 재조회
								ExtSubPage.getParent().callScript("doSetRegInfo");	
							}else this.setParentMsg(NLS.INF.M024);
							/*
							var voRegFeePay = util.DataMap.getValue(app, "dmResList", "regFeePayYn");
							if(!!voRegFeePay) {
								//납부데이터 있다면 모든객체 disable
								util.Control.setEnable(app, false, maAllCtrls);
								//분납신청, 분납내역, 작업저장 활성
								util.Control.setEnable(app, true, ["dipFrfDivPayReqDt", "ipbFrfDivPayDesc", "btnSave"]);
								// 2016.06.30 분납고도화
								util.Control.setEnable(app, true, ["btnNew", "btnDel", "btnRestore", "rptDivPayDtl", "cbbFrfDivPayType"]);
							} else {
								//분납번호가 없는경우 - 분납처리가능(분납생성버튼enable, 취소,신규,삭제 disable)
								if(ValueUtil.isNull(util.FreeForm.getValue(app, "frfRegFee", "DIV_PAY_NO"))) {
									util.Control.setEnable(app, true, maAllCtrls);	
									util.Control.setEnable(app, false, ["btnSaveCancDivPay", "btnNew", "btnDel", "btnRestore"]);
								}//분납번호가 있는경우-분납상태필드 disable
								else {
									util.Control.setEnable(app, true, maAllCtrls);
									util.Control.setEnable(app, false, ["cbbFrfDivPayStatRcd"]);
								}
							}
							*/
							
							/**
							 * 2016.07.19 분납컨트롤 비활성화처리 관련 재정비
							 */
							var vsRegFeePay = util.DataMap.getValue(app, "dmResList", "regFeePayYn"); //납부여부
							var vsDivPayNo  = util.FreeForm.getValue(app, "frfRegFee", "DIV_PAY_NO");	//분납번호
							
							util.Control.setEnable(app, true, maAllCtrls);
							
							// 분납번호가 있는 경우 분납상태 비활성화
							if(!ValueUtil.isNull(vsDivPayNo)){
								util.Control.setEnable(app, false, "cbbFrfDivPayStatRcd");	
							}	
							
							// 분납번호가 있거나 납입자료 존재하는 경우 분납생성 비활성화
							if((!ValueUtil.isNull(vsDivPayNo)) || !!vsRegFeePay){
								util.Control.setEnable(app, false, "btnCrtDivPay");	
							}
							
							// 분납번호가 없거나 납입자료 존재하는 경우 분납취소 비활성화
							if(ValueUtil.isNull(vsDivPayNo) || !!vsRegFeePay){
								util.Control.setEnable(app, false, "btnSaveCancDivPay");	
							}
							
							// 분납번호가 없는 경우 신규/삭제 비활성화
							if(ValueUtil.isNull(vsDivPayNo)){
								util.Control.setEnable(app, false, ["btnNew", "btnDel"]);	
							}
							
						}
					});
//				}
			}
		});
	};

	/**
	 * @desc 분납차수별 내역을 조회한다.
	 * @member stdCrsCRegFeeDivPay
	 * @param poCallBackFunc 콜백 함수
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 23.
	 */
	function doList(poCallBackFunc) {
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess) {
			if (pbSuccess) {
				//분납번호가 존재여부에 따라 필수값 셋팅
				var vsDivPayNo = util.DataSet.getValue(app, "dsListRegFee", "DIV_PAY_NO", 1);
				var vsDivPayStat = util.DataSet.getValue(app, "dsListRegFee", "DIV_PAY_STAT_RCD", 1);
				
				var vaFrfSetNullCtrls = ["cbbFrfDivPayStatRcd", "cbbFrfDivPayType"];
				
				if(!ValueUtil.isNull(vsDivPayNo)){
					ExtControl.setAttr(vaFrfSetNullCtrls, "emptyitem", "False");
					util.Control.setUserAttr(app, vaFrfSetNullCtrls, "require", "Y");
				}else{
					ExtControl.setAttr(vaFrfSetNullCtrls, "emptyitem", "True");
					util.Control.setUserAttr(app, vaFrfSetNullCtrls, "require", "");
				}	
				
				util.Control.redraw(app, ["frfRegFee" ,"rptDivPayDtl"]);
				// 값이 있는 경우에만 복사하여 프리폼에 데이터 뿌림
				if(util.DataSet.getRowCount(app, "dsListRegFee") > 0) {
//TO-BE: 단독 프리폼에 대한 데이터 바인딩은 공통단에서 자동 처리됨(삭제 필요)
					ExtFreeForm.copyToInstance("frfRegFee", "/root/resList/listRegFee/row", 1);
				}
				
				if(util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
			}
		});
	};
	
	/**
	 * @desc [btnCrtDivPay] 분납생성 버튼 클릭 이벤트
	 * @member stdCrsCRegFeeDivPay
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 23.
	 */
	moPage.onClick_BtnCrtDivPay = function() {
		//필수입력항목 - 분납상태 확정인지 '분납상태가 확정인 경우만 분납생성이 가능합니다.
		var vsDivPayStat = util.FreeForm.getValue(app, "frfRegFee", "DIV_PAY_STAT_RCD");
		if(vsDivPayStat != "CR203CNF"){
			util.Msg.alert("NLS-CRS-M020");
			return;
		}
		//분납번호 존재할시 '이미 분납처리된 건입니다'
		var vsDivPayNo = util.FreeForm.getValue(app, "frfRegFee", "DIV_PAY_NO");
		if(!ValueUtil.isNull(vsDivPayNo)){
			util.Msg.alert("NLS-CRS-M032");
			return;
		}
		
		//분납신규생성팝업 호출
		var voMapNode = moPObject.moRegDivPayCrtParam;
		voMapNode.studId = util.DataMap.getValue(app, "dmSearchData", "strStudId");
		voMapNode.schYearRcd = util.DataMap.getValue(app, "dmSearchData", "strSchYearRcd");
		voMapNode.smtRcd = util.DataMap.getValue(app, "dmSearchData", "strSmtRcd");
		voMapNode.regCls = util.DataMap.getValue(app, "dmSearchData", "strRegClsRcd");
		voMapNode.divPayStatRcd = vsDivPayStat;
		voMapNode.divPayDesc = util.FreeForm.getValue(app, "frfRegFee", "DIV_PAY_DESC");
		voMapNode.divPayReqDt = util.FreeForm.getValue(app, "frfRegFee", "DIV_PAY_REQ_DT");
		voMapNode.divPayTypeCd = util.FreeForm.getValue(app, "frfRegFee", "DIV_PAY_TYPE_CD");
		
		ExtPopUp.openLayeredPopup("/xtm/crs/stdCrsCRegFeeDivPayCrt.xtm", 600, 440);
	};
	
	/**
	 * @desc  분납생성 팝업 콜백함수
	 * @member stdCrsCRegFeeDivPay
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 23.
	 */
	moPage.callbackRegFeeDivPayCrt = function(pbSuccess) {
		mbDivPayCrtSucc = pbSuccess;
		doOnLoad();
	};
	
	/**
	 * @desc [btnSaveCancDivPay] 분납취소 버튼 클릭 이벤트
	 * @member stdCrsCRegFeeDivPay
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 23.
	 */
	moPage.onClick_BtnSaveCancDivPay = function() {
		//분납처리된건인지 체크 ; 분납번호 존재 않을경우 '분납처리된 건이 아닙니다.'
		var vsDivPayNo = util.FreeForm.getValue(app, "frfRegFee", "DIV_PAY_NO");
		if(ValueUtil.isNull(vsDivPayNo)){
			util.Msg.alert("NLS-CRS-M051");
			return;
		}
		
		//납입자료가 존재하여 처리 불가능합니다.
		var vnRegFeePayCnt = util.DataSet.getRowCount(app, "dsListRegFeePay");
		if(vnRegFeePayCnt > 0){
			util.Msg.alert("NLS-CRS-M052");
			return;
		}
		
		//분납자료가 삭제됩니다. 처리하시겠습니까?
		if(!util.Msg.confirm("NLS-CRS-M021") ) return;
		
		util.DataMap.setValue(app, "dmRegFeeData", "strDivPayStatRcd", util.FreeForm.getValue(app, "frfRegFee", "DIV_PAY_STAT_RCD"));
		util.DataMap.setValue(app, "dmRegFeeData", "strDivPayDesc", util.FreeForm.getValue(app, "frfRegFee", "DIV_PAY_DESC"));
		util.DataMap.setValue(app, "dmRegFeeData", "strDivPayReqDt", util.FreeForm.getValue(app, "frfRegFee", "DIV_PAY_REQ_DT"));
		util.DataMap.setValue(app, "dmRegFeeData", "strDivPayTypeCd", util.FreeForm.getValue(app, "frfRegFee", "DIV_PAY_TYPE_CD"));
		util.DataMap.setValue(app, "dmRegFeeData", "strDivPayNo", util.FreeForm.getValue(app, "frfRegFee", "DIV_PAY_NO"));
		
		mbDivPayCrtSucc = false;
		
		// 분납취소 서브미션
		//strCommand: cancelDivPay 
		util.Submit.send(app, "subCancDivPay", function(pbSuccess) {
			if (pbSuccess) {
				doOnLoad();
				// 등록사항 재조회
				ExtSubPage.getParent().callScript("doSetRegInfo");	
				//분납취소가 처리되었습니다.
				this.setParentMsg(NLS.CRS.M068);
			}
		});
	};
	
	/**
	 * @desc [rptDivPayDtl] 신규버튼 클릭이벤트
	 * @member stdCrsCRegFeeDivPay
	 * @param   
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 23.
	 */
	moPage.onClick_BtnNew = function() {
		var vnNewRow = util.Grid.insertRow(app, "grdDivPayDtl");
		
		util.Grid.setCellValue(app, "grdDivPayDtl", "DIV_PAY_NO"	 	  , util.FreeForm.getValue(app, "frfRegFee", "DIV_PAY_NO"), vnNewRow);
		util.Grid.setCellValue(app, "grdDivPayDtl", "DIV_PAY_SERIAL_NO", doGetSerialNo(), vnNewRow);
	};
	
	/**
	 * doGetSerialNo 순번리턴
	 * @member stdCrsCRegFeeDivPay
	 * @return vnMaxSerialNo 
	 * @author Aeyoung Lee 2016. 3. 23.
	 */
	function doGetSerialNo() {
		var vnCnt = util.Grid.getRowCount(app, "grdDivPayDtl");
		var vnMaxSerialNo = 0;
		for (var i = 1; i <= vnCnt; i++) {
			var vsSerialNo = Number(util.Grid.getCellValue(app, "grdDivPayDtl", "DIV_PAY_SERIAL_NO", i));
			if (vnMaxSerialNo < vsSerialNo) {
				vnMaxSerialNo = vsSerialNo;
			}
		}
		return vnMaxSerialNo+1;
	};	
	
	/**
	 * @desc [rptDivPayDtl] 삭제버튼 클릭 이벤트
	 * @member stdCrsCRegFeeDivPay
	 * @param   
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 23.
	 */
	moPage.onClick_BtnDel = function() {
		var vnRowIdx = util.Grid.getCheckOrSelectedRowIndex(app, "grdDivPayDtl");
		if(ValueUtil.isNull(vnRowIdx)){
			util.Msg.notify(app, "NLS.INF.M005");
			return;
		}	
		
		var vsPanelCheckIdx = util.Grid.getCheckOrSelectedRowIndex(app, "grdDivPayDtl");
		var voPanelChk;
		
		if(String(vsPanelCheckIdx).indexOf(",") != -1){
			voPanelChk = vsPanelCheckIdx.split(",");
		}else{
			voPanelChk = new Array();
			voPanelChk[0] = vsPanelCheckIdx;
		}	
		
		for(var i = 0; i < voPanelChk.length; i++) {
			var vnRow = voPanelChk[i];
			
			var vnAmt = Number(util.Grid.getCellValue(app, "grdDivPayDtl", "AMT", vnRow));
			if(vnAmt < 0){
				//장학금 지급내역으로 삭제할 수 없습니다
				util.Msg.alert("NLS-CRS-M070");
				return;
			}
			
			var vsDivSerialPayYn = util.Grid.getCellValue(app, "grdDivPayDtl", "DIV_SERIAL_PAY_YN", vnRow);
			if(vsDivSerialPayYn == "Y"){
				//납입자료가 존재하여 삭제할 수 없습니다.
				util.Msg.alert("NLS-CRS-M105");
				return;
			}
		}	
		
		util.Grid.deleteRow(app, "grdDivPayDtl");
	};
	
	/**
	 * @desc [rptDivPayDtl] 작업취소 클릭 이벤트
	 * @member stdCrsCRegFeeDivPay
	 * @param   
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 23.
	 */
	moPage.onClick_BtnRestore = function() {
		util.Grid.restoreRow(app, "grdDivPayDtl");
	};
	
	/**
	 * @desc [rptDivPayDtl] 작업저장 클릭 이벤트
	 * @member stdCrsCRegFeeDivPay
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 23.
	 */
	moPage.onClick_BtnSave = function() {
		// 리피터 변경사항 체크
		if(!util.Grid.isModified(app, ["frfRegFee","grdDivPayDtl"], null)){
			this.setParentMsg(NLS.WRN.M007);
			return false;
		}
		
		// Validation Check
		if(!util.validate(app, ["frfRegFee","grdDivPayDtl"])) return false;
		
		var vbRegFeeChg = false;
		var vsDivPayNo = util.FreeForm.getValue(app, "frfRegFee", "DIV_PAY_NO");
		if(util.Grid.isModified(app, ["frfRegFee"], null)){
			//분납상태가 확정이 아니고 분납번호에 값이 있다면 '분납처리된 자료가 존재합니다. 분납취소버튼을 이용하시기 바랍니다.'
			var vsDivPayStat = util.FreeForm.getValue(app, "frfRegFee", "DIV_PAY_STAT_RCD");
			
			if(vsDivPayStat!="CR203CNF" && !ValueUtil.isNull(vsDivPayNo)){
				util.Msg.alert("NLS-CRS-M034"); 
				return false;
			}		
			vbRegFeeChg = true;
		}	
		
		//분납차수별 내역 리피트 체크
		if(!doCheckGridValue()) return false;
		
		//등록금테이블 변경여부, 분납세부테이블 변경여부 체크
        if(vbRegFeeChg) {
			util.DataMap.setValue(app, "dmSaveChangeFlg", "dsRegFeeYn", "Y");
		} else {
			util.DataMap.setValue(app, "dmSaveChangeFlg", "dsRegFeeYn", "");
		}
		
		util.DataMap.setValue(app, "dmRegFeeData", "strDivPayNo", vsDivPayNo);
		
		//저장서브미션
		//strCommand: save 
		util.Submit.send(app, "subSave", function(pbSuccessSave) {
			if(pbSuccessSave) {
				//저장성공 메세지 출력
				doList(function(pbSuccessList) {
					// "갱신된 데이터가 조회되었습니다."
					if(pbSuccessList) {
						// 등록사항 재조회
						ExtSubPage.getParent().callScript("doSetRegInfo");	
						this.setParentMsg(NLS.INF.M025);
					}
				});
			}
		});
	};
	
	/**
	 * @desc 분납차수별 내역 리피트 체크
	 * @member stdCrsCRegFeeDivPay
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 23.
	 */
	function doCheckGridValue() {
		var vnRowCnt = util.Grid.getRowCount(app, "grdDivPayDtl");
		var vaDivPaySeqTmp = [];   
		var vnAmtSum = 0;
		var vnCurrSeq;
		var vsItemCd;
		var vnAmt;
		var vnNextItemCd;
		var vnNextSeq;
		var vnNextAmt;
		var vbPass1 = true;
		var vbPass2 = true;
		var vbPass3 = true;
		
		var vsDivPayTypeCd = util.FreeForm.getValue(app, "frfRegFee", "DIV_PAY_TYPE_CD");
		var vsDivPayStatRcd = util.FreeForm.getValue(app, "frfRegFee", "DIV_PAY_STAT_RCD");
		var vnDivPayCnt = ExtInstance.getValue("/root/resOnLoad/listDivPayType/row", "DIV_PAY_CNT", "child::DIV_PAY_TYPE_CD='"+vsDivPayTypeCd+"'");
		util.DataMap.setValue(app, "dmReqKey", "strDivPayMax", vnDivPayCnt);
		
		// 확정인 경우 체크
		if(vsDivPayStatRcd == "CR203CNF"){
			
			if(vnRowCnt == 0){
				util.DataMap.setValue(app, "dmSaveChangeFlg", "dsDivPayDtlYn", "");
			}else{	
				
				for(var i=1; i<=vnRowCnt; i++) {
					
					if(util.Grid.getRowState(app, "grdDivPayDtl", i) == cpr.data.tabledata.RowState.DELETED) continue;
					
					vsItemCd  = util.Grid.getCellValue(app, "grdDivPayDtl", "ITEM_CD", i);
					vnCurrSeq = Number(util.Grid.getCellValue(app, "grdDivPayDtl", "DIV_PAY_SEQ", i));
					vnAmt 	  = Number(util.Grid.getCellValue(app, "grdDivPayDtl", "AMT", i));  
					
					//차수별 항목별 합계금액
					vnAmtSum = vnAmt;
					
					vaDivPaySeqTmp.push(vnCurrSeq);
					
					for(var j=1; j<=vnRowCnt; j++){
						
						if(util.Grid.getRowState(app, "grdDivPayDtl", j) == cpr.data.tabledata.RowState.DELETED) continue;
						if(i==j) continue;
						
						vnNextItemCd  = util.Grid.getCellValue(app, "grdDivPayDtl", "ITEM_CD", j);
						vnNextSeq 	  = Number(util.Grid.getCellValue(app, "grdDivPayDtl", "DIV_PAY_SEQ", j)); 
						vnNextAmt	  = Number(util.Grid.getCellValue(app, "grdDivPayDtl", "AMT", j)); 
						
						//한차수에 동일한 항목코드 존재하는지 체크
						if(vnNextItemCd==vsItemCd && vnNextSeq==vnCurrSeq && vnAmt > 0 && vnNextAmt > 0){
							vbPass2 = false;
						}
						
						//차수별항목별 합계금액
						if(vnNextItemCd==vsItemCd && vnNextSeq==vnCurrSeq){
							vnAmtSum = vnAmtSum + vnNextAmt;
						}
					}
					
					//차수별항목별 합계금액
					if(vnAmtSum < 0) {
						vbPass3 = false;
					}
					vnAmtSum = 0;
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
						if(k == (vnTmpLength-1) && vnDivPayCnt != vnCurrSeq){
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
					 util.Msg.alert("NLS-CRS-M012", [vnDivPayCnt]);
					return false;
				}	
				
				if(!vbPass2){
					 util.Msg.alert("NLS-CRS-M072");
					return false;
				}	
				
				if(!vbPass3){
					 util.Msg.alert("NLS-CRS-M071");
					return false;
				}
				
				//분납차수별 내역에 입력한 항목별금액과 등록금세부테이블 항목 금액이 일치하는지 체크
				var voRegFeeItemList = ExtInstance.getNodeListObj("/root/resOnLoad/listRegFeeItem/row");
				var vnRegFeeItemCnt = voRegFeeItemList == null ? 0 : voRegFeeItemList.length;
				for(var i = 0; i < vnRegFeeItemCnt; i++){
					
					var voRegFeeItemRow = ExtInstance.getNodeToObject(voRegFeeItemList[i]);
					var vsRegFeeItemCd = voRegFeeItemRow.ITEM_CD;
					var vnRegFeeItemAmt = voRegFeeItemRow.AMT;
					
					var vnSumDivAmt = 0;
                    var vnSumSeqItemAmt = 0;
					
					for(var m = 1; m <= vnRowCnt; m++) {
						if(util.Grid.getRowState(app, "grdDivPayDtl", m) == cpr.data.tabledata.RowState.DELETED) continue;
                        
                        var vsDivItemCd = util.Grid.getCellValue(app, "grdDivPayDtl", "ITEM_CD", m);
                        var vnDivAmt = Number(util.Grid.getCellValue(app, "grdDivPayDtl", "AMT", m));
                        if (vsRegFeeItemCd != vsDivItemCd) continue;
                        
                        if (vnDivAmt >= 0) {
							vnSumDivAmt = Number(vnSumDivAmt) + Number(vnDivAmt);
						} else {
							vnSumSeqItemAmt = Number(vnSumSeqItemAmt) + Number(vnDivAmt); //수정가능한 등록금항목만(-금액은 장학금지급금액)
						}
                    }
					
					//등록금 항목별 금액이 일치하지 않습니다.
                    if (vnSumDivAmt != vnRegFeeItemAmt) {
                        util.Msg.alert("NLS-CRS-M026"); 
                        return false;
                    }
                    if ((vnSumSeqItemAmt + vnSumDivAmt) < 0) {
                        util.Msg.alert("NLS-CRS-M026"); 
                        return false;
                    }
				}
				
				util.DataMap.setValue(app, "dmSaveChangeFlg", "dsDivPayDtlYn", "Y");
			}
		}	
		
		return true;
	};
	
	/**
	 * @desc [rptDivPayDtl] rowSelect 이벤트 - 바인드 refresh
	 * @member stdCrsCRegFeeDivPay
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 23.
	 */
	moPage.onRowSelect_RptRegFeeDtl = function() {
//TO-BE: <ExtControl.refreshBind> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtControl.refreshBind("binRoDivPay");
	};
	
	/**
	 * @desc [rptDivPayDtl] 값 변경이벤트
	 * @member stdCrsCRegFeeDivPay
	 * @param psDiv 컬럼 ref
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 23.
	 */
	moPage.onValueChanged_RptRegFeeDtl = function(psDiv) {
		var vnRowIdx = util.Grid.getIndex(app, "grdDivPayDtl");
		var vnChkValue = util.Grid.getCellValue(app, "grdDivPayDtl", psDiv, vnRowIdx)	;
		
		// 금액
		if(psDiv == "AMT"){
			if(Number(vnChkValue) <= 0){
				//-는 입력 안됨 : @은 0보다 큰수만 허용됩니다.
                util.Msg.alert("NLS-CRS-M006", [NLS.NSCR.AMT]);
				util.Grid.setCellValue(app, "grdDivPayDtl", psDiv, "", vnRowIdx);
				return false;
			}
		}
		// 분납차수
		else if(psDiv == "DIV_PAY_SEQ"){
			if(Number(vnChkValue) <= 0){
				//-는 입력 안됨 : @은 0보다 큰수만 허용됩니다.
				util.Msg.alert("NLS-CRS-M006", [NLS.NSCR.DIVPAYSEQ]);
				util.Grid.setCellValue(app, "grdDivPayDtl", psDiv, "", vnRowIdx);
				return false;
			}
		}	
	};
	
	/**
	 * @desc 부모 헤더에 메세지 뿌리기
	 * @member stdCrsCRegFeeDivPay
	 * @param  psMsgCode 메시지 코드
	 * @param  paMsg 메시지 변수 
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 23.
	 */
	moPage.setParentMsg = function(psMsgCode, paMsg) {
		util.Msg.notify(app, psMsgCode, paMsg);	
	};
	
	/**
	 * @desc 변경사항체크 - 부모창에서 호출용
	 * @member stdCrsCRegFeeDivPay
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 23.
	 */
	function doCheckDataChange() {
		if(util.Grid.isModified(app, ["frfRegFee","grdDivPayDtl"], "CRM") ){
			return false;
		}else{
			return true;
		}
	};
	
	return moPage;
};

