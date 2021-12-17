//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
///<xtmlink path="./stdCrsCRegFeeRefund.xtm"/>

var stdCrsCRegFeeRefund = function() {

	var moPage = new Page();

	/**
	 * @desc import 서브페이지 초기화
	 * @member stdCrsCRegFeeRefund
	 * @param
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 29.
	 */
	moPage.onLoadImportDone_ImpSbpHeader = function() {
		doSbpHeaderOnLoad();
	}
	
	/**
	 * @desc 화면 온로드
	 * @member stdCrsCRegFeeRefund
	 * @param
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 29.
	 */
	moPage.onModelConstructDone_StdCrsCRegFeeRefund = function() {
		
		//리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init("rptRegFeeRefund");
		
		//암호화컬럼 설정
		ExtRepeat.addOriginCol("rptRegFeeRefund", ["STUD_ACCT_NO"]);
		
		// 부모창에 있는 값 셋팅
		var voParentInfo = moPage.parent.moCmnInfo;
		
		util.DataMap.setValue(app, "dmReqKey", "strStudId"	 , voParentInfo.studId);
		util.DataMap.setValue(app, "dmReqKey", "strSchYearRcd", voParentInfo.schYearRcd);
		util.DataMap.setValue(app, "dmReqKey", "strSmtRcd"	 , voParentInfo.smtRcd);
		util.DataMap.setValue(app, "dmReqKey", "strRegClsRcd" , voParentInfo.regClsRcd);
			
		// 조회
		doList(function(pbSuccess) {
			if (pbSuccess){
				// "조회되었습니다."
				moPage.setParentMsg(NLS.INF.M024);		
			}
		});
	};

	/**
	 * @desc 등록금환불내역 목록을 조회한다.
	 * @member stdCrsCRegFeeRefund
	 * @param poCallBackFunc 콜백 함수
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 29.
	 */
	function doList(poCallBackFunc) {
		
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess) {
			if (pbSuccess) {
				util.Control.redraw(app, ["rptRegFeeRefund"]);
			}
			
			if(util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
		});
	};
	
	/**
	 * @desc 신규버튼 클릭 이벤트
	 * @member stdCrsCRegFeeRefund
	 * @param   
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 29.
	 */
	moPage.onClick_BtnNew = function() {
		var vnNewRow = util.Grid.insertRow(app, "grdRegFeeRefund", "rdCbbProcRsnRcd");
		
		util.Grid.setCellValue(app, "grdRegFeeRefund", "STUD_ID"		 , util.DataMap.getValue(app, "dmReqKey", "strStudId"), vnNewRow);
		util.Grid.setCellValue(app, "grdRegFeeRefund", "SCH_YEAR_RCD" , util.DataMap.getValue(app, "dmReqKey", "strSchYearRcd"), vnNewRow);
		util.Grid.setCellValue(app, "grdRegFeeRefund", "SMT_RCD"		 , util.DataMap.getValue(app, "dmReqKey", "strSmtRcd"), vnNewRow);
		util.Grid.setCellValue(app, "grdRegFeeRefund", "REG_CLS_RCD"	 , util.DataMap.getValue(app, "dmReqKey", "strRegClsRcd"), vnNewRow);
		util.Grid.setCellValue(app, "grdRegFeeRefund", "DESC_TYPE_RCD", "CR302REF", vnNewRow);
		util.Grid.setCellValue(app, "grdRegFeeRefund", "STUD_BANK_RCD", util.DataSet.getValue(app, "dsListShreg", "BANK_RCD", "1"), vnNewRow);
		util.Grid.setCellValue(app, "grdRegFeeRefund", "STUD_ACCT_NO" , util.DataSet.getValue(app, "dsListShreg", "ACCT_NO", "1"), vnNewRow);
		util.Grid.setCellValue(app, "grdRegFeeRefund", "OWNER_NM"	 , util.DataSet.getValue(app, "dsListShreg", "OWNER_NM", "1"), vnNewRow);
	};
	
	/**
	 * @desc 삭제버튼 클릭 이벤트
	 * @member stdCrsCRegFeeRefund
	 * @param   
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 29.
	 */
	moPage.onClick_BtnDel = function() {
		util.Grid.deleteRow(app, "grdRegFeeRefund");
	};
	
	/**
	 * @desc 작업취소버튼 클릭 이벤트
	 * @member stdCrsCRegFeeRefund
	 * @param   
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 29.
	 */
	moPage.onClick_BtnRestore = function() {
		util.Grid.restoreRow(app, "grdRegFeeRefund");
	};
	
	/**
	 * @desc 작업저장버튼 클릭 이벤트
	 * @member stdCrsCRegFeeRefund
	 * @param   
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 29.
	 */
	moPage.onClick_BtnSave = function() {
		// 리피터 변경사항 체크
		if(!util.Grid.isModified(app, ["grdRegFeeRefund"], null)){
			moPage.setParentMsg(NLS.WRN.M007);
			return false;
		}
		
		// Validation Check
		if(!util.validate(app, ["grdRegFeeRefund"])) return false;
		
		//저장전 체크사항
		if(!doChkBefSave()) return false;
		
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
	 * doChkBefSave 저장전 로직 체크
	 * - 분자와 분모값 둘 중 하나만 입력하였는지 체크
	 * - 환불액은 실제 납입액을 초과할 수 없음
	 * @member stdCrsCRegFeeRefund
	 * @return vbChked 체크여부
	 * @author Aeyoung Lee 2016. 3. 29.
	 */	
	function doChkBefSave(){
		var vbChked = true;
		var vsColId;
		var voItemMap = new Map();
		var voRegFeeRecMap = new Map();
		
		for (var i = 1; i <= util.Grid.getRowCount(app, "grdRegFeeRefund"); i++) {
			var vsUptStatus = util.Grid.getRowState(app, "grdRegFeeRefund", i);
			
			if(vsUptStatus == "delete") continue;
			
			var vsRateNur = util.Grid.getCellValue(app, "grdRegFeeRefund", "REFUND_TRANS_RATE_NUR", i);
			var vsRateDen = util.Grid.getCellValue(app, "grdRegFeeRefund", "REFUND_TRANS_RATE_DEN", i);
			var vsItemCd  = util.Grid.getCellValue(app, "grdRegFeeRefund", "ITEM_CD", i);
			var vnRefundAmt = Number(util.Grid.getCellValue(app, "grdRegFeeRefund", "AMT", i));
			
			if (ValueUtil.isNull(vsRateNur) && !ValueUtil.isNull(vsRateDen)) {
				vsColId = "REFUND_TRANS_RATE_NUR";
				vbChked = false;
			}
			if (ValueUtil.isNull(vsRateDen) && !ValueUtil.isNull(vsRateNur)) {
				vsColId = "REFUND_TRANS_RATE_DEN";
				vbChked = false;
			}						
			if (!vbChked) {		
				util.Grid.setCellValue(app, "grdRegFeeRefund", vsColId, "", i);
				// 분자와 분모값은 하나만 입력될 수 없습니다.
				util.Msg.alert("NLS-CRS-M074");
				return;
			}
			
			// 항목별 환불금액을 map에 넣음
			var vsItemGetValue = voItemMap.get(vsItemCd);
			if (ValueUtil.isNull(vsItemGetValue)) {
				voItemMap.put(vsItemCd, vnRefundAmt);
			} else {
				voItemMap.put(vsItemCd, Number(vsItemGetValue) + vnRefundAmt);
			}
		}
		if(voItemMap.size() > 0){
			
			// 항목별 수납데이터를 항목별로 map에 넣음
			var voRegFeeRecList = ExtInstance.getNodeListObj("/root/resList/listRegFeeRec/row");
			var vnRegFeeRecCnt = voRegFeeRecList == null ? 0 : voRegFeeRecList.length;
			
			for(var j = 0; j < vnRegFeeRecCnt; j++){
				
				var voRegFeeRecRow = ExtInstance.getNodeToObject(voRegFeeRecList [j]);
				var vsRegFeeRecItemCd = voRegFeeRecRow.ITEM_CD;
				var vnRegFeeRecAmt = Number(voRegFeeRecRow.AMT);
				
				var vsRegFeeRecGetValue = voRegFeeRecMap.get(vsRegFeeRecItemCd);
				if (ValueUtil.isNull(vsRegFeeRecGetValue)) {
					voRegFeeRecMap.put(vsRegFeeRecItemCd, vnRegFeeRecAmt);
				} else {
					voRegFeeRecMap.put(vsRegFeeRecItemCd, Number(vsRegFeeRecGetValue) + vnRegFeeRecAmt);
				}
			}
			
			// 수납데이터와 환불데이터를 비교
			var iter = voItemMap.keySet().iterator();
			while (iter.hasNext()) {
				var key =  iter.next();
				var vsRefAmt = Number(voItemMap.get(key));
				var vsRecAmt = Number(voRegFeeRecMap.get(key));
				
				// 환불액은 실제 납부금액을 초과할 수 없습니다.
				if(vsRefAmt > vsRecAmt) {
					util.Msg.alert("NLS-CRS-M025");
					return vbChked = false;
				}	
			}	
		}	
		
		return vbChked;
	};
	
	/**
	 * onValueChanged_RptRegFeeRefund 등록금 환불내역 변경 이벤트
	 * @member stdCrsCRegFeeRefund
	 * @return vbChked 체크여부
	 * @author Aeyoung Lee 2016. 3. 29.
	 */	
	moPage.onValueChanged_RptRegFeeRefund = function(psColDiv) {
		var vnIdx = util.Grid.getIndex(app, "grdRegFeeRefund");
		var vsValue = util.Grid.getCellValue(app, "grdRegFeeRefund", psColDiv, vnIdx);
		
		// 등록금항목
		if(psColDiv == "ITEM_CD"){
			if(!ValueUtil.isNull(vsValue)){
				util.Grid.setCellValue(app, "grdRegFeeRefund", "SERIAL_NO", doGetSerialNo(vnIdx, vsValue), vnIdx);	
			}else{
				util.Grid.setCellValue(app, "grdRegFeeRefund", "SERIAL_NO", "", vnIdx);	
			}	
        }
		
		// 환불금액
		if(psColDiv == "AMT"){
			if(vsValue.length != 0 && Number(vsValue) < 1){
				//-는 입력 안됨 : @은 0보다 큰수만 허용됩니다.
                util.Msg.alert("NLS-CRS-M006", [NLS.NSCR.RFDAMT]);
				util.Grid.setCellValue(app, "grdRegFeeRefund", psColDiv, "", vnIdx);
				return;
			}
        }
		
		// 환불율분자, 환불율분모
		if(psColDiv == "REFUND_TRANS_RATE_NUR" || psColDiv == "REFUND_TRANS_RATE_DEN"){
			if(vsValue.length != 0 && Number(vsValue) < 1){
				
				if(psColDiv == "REFUND_TRANS_RATE_NUR"){
					util.Msg.alert("NLS-CRS-M006", [NLS.NSCR.RFDRATNMRT]);
				}else{
					util.Msg.alert("NLS-CRS-M006", [NLS.NSCR.RFDRATDMRT]);
				}	
				
				util.Grid.setCellValue(app, "grdRegFeeRefund", psColDiv, "", vnIdx);
				return;
			}
			
			var vnRateNur = util.Grid.getCellValue(app, "grdRegFeeRefund", "REFUND_TRANS_RATE_NUR", vnIdx);
			var vnRateDen = util.Grid.getCellValue(app, "grdRegFeeRefund", "REFUND_TRANS_RATE_DEN", vnIdx);
			if((!ValueUtil.isNull(vnRateDen)) && (!ValueUtil.isNull(vnRateNur)) && Number(vnRateDen) < Number(vnRateNur)){
				//분자는 분모보다 클 수 없습니다.
				util.Msg.alert("NLS-CRS-M080", [NLS.NSCR.RFDRATNMRT, NLS.NSCR.RFDRATDMRT]);
				util.Grid.setCellValue(app, "grdRegFeeRefund", psColDiv, "", vnIdx);
				return;
			}
		}
		
		if(psColDiv == "PROC_RSN_RCD" || psColDiv == "ITEM_CD" || psColDiv == "CII_DT" || psColDiv == "REFUND_TRANS_RATE_NUR" || psColDiv == "REFUND_TRANS_RATE_DEN"){
			var vsProcRsnRcd = util.Grid.getCellValue(app, "grdRegFeeRefund", "PROC_RSN_RCD", vnIdx);
			var vsItemCd = util.Grid.getCellValue(app, "grdRegFeeRefund", "ITEM_CD", vnIdx);
			
			//환불사유에 따른 자동계산 여부
			var vsRefCalc = ExtInstance.getValue ("/root/resList/listProcRsnCd/row", "CD_PRP1", "child::CD='"+ vsProcRsnRcd +"'");
			
			if((!ValueUtil.isNull(vsProcRsnRcd)) && (!ValueUtil.isNull(vsItemCd))){
				doRefundAmt(vnIdx);
			}	
		}	
	};
	
	/**
	 * doGetSerialNo 순번리턴
	 * @member stdCrsCRegFeeRefund
	 * @param  pnIdx 선택된 로우 인덱스
	 * @param  psItemCd 선택된 등록금항목 코드
	 * @return vnMaxSerialNo 
	 * @author Aeyoung Lee 2016. 3. 29.
	 */
	function doGetSerialNo(pnIdx, psItemCd) {
		var vnMaxSerialNo = null;
		for (var i = 1; i <= util.Grid.getRowCount(app, "grdRegFeeRefund"); i++) {
			
			if(pnIdx == i) continue;
			var vsItemCd = util.Grid.getCellValue(app, "grdRegFeeRefund", "ITEM_CD", i);
			
			if(psItemCd == vsItemCd){
				var vnSerialNo = Number(util.Grid.getCellValue(app, "grdRegFeeRefund", "SERIAL_NO", i));
				
				if(vnMaxSerialNo == null){
					vnMaxSerialNo = vnSerialNo
				}else{
					if(vnMaxSerialNo < vnSerialNo) vnMaxSerialNo = vnSerialNo;
				}	
			}	
		}	
		return vnMaxSerialNo + 1;
	};	
	
	/**
	 * doRefundAmt 환불금액 자동계산 서브미션 호출
	 * @member stdCrsCRegFeeRefund
	 * @return vnMaxSerialNo 
	 * @author Aeyoung Lee 2016. 3. 29.
	 */
	function doRefundAmt(pnIdx) {
		util.DataMap.setValue(app, "dmReqKey", "strItemCd"	 , util.Grid.getCellValue(app, "grdRegFeeRefund", "ITEM_CD", pnIdx));
		util.DataMap.setValue(app, "dmReqKey", "strCiiDt"	 , util.Grid.getCellValue(app, "grdRegFeeRefund", "CII_DT", pnIdx));
		util.DataMap.setValue(app, "dmReqKey", "strProcRsnRcd", util.Grid.getCellValue(app, "grdRegFeeRefund", "PROC_RSN_RCD", pnIdx));
		util.DataMap.setValue(app, "dmReqKey", "strRateNur" 	 , util.Grid.getCellValue(app, "grdRegFeeRefund", "REFUND_TRANS_RATE_NUR", pnIdx));
		util.DataMap.setValue(app, "dmReqKey", "strRateDen"	 , util.Grid.getCellValue(app, "grdRegFeeRefund", "REFUND_TRANS_RATE_DEN", pnIdx));
		
		//서브미션
		//strCommand: getCalcRefund 
		util.Submit.send(app, "subRefundAmt", function(pbSuccess) {
			if(pbSuccess) {
                //환불SF결과 금액, 기준일자, 환불율분모, 분자의 값이 하나라도 있을경우 수행						
				var vsSfAmt = util.DataMap.getValue(app, "dmResRefund", "AMT");
				var vsSfDt  = util.DataMap.getValue(app, "dmResRefund", "CII_DT");
				var vsSfNur = util.DataMap.getValue(app, "dmResRefund", "REFUND_TRANS_RATE_NUR");
				var vsSfDen = util.DataMap.getValue(app, "dmResRefund", "REFUND_TRANS_RATE_DEN");
				
				if(!ValueUtil.isNull(vsSfAmt)) util.Grid.setCellValue(app, "grdRegFeeRefund", "AMT", vsSfAmt , pnIdx);
				if(!ValueUtil.isNull(vsSfDt))  util.Grid.setCellValue(app, "grdRegFeeRefund", "CII_DT", vsSfDt, pnIdx);
				if(!ValueUtil.isNull(vsSfNur)) util.Grid.setCellValue(app, "grdRegFeeRefund", "REFUND_TRANS_RATE_NUR", vsSfNur, pnIdx);
				if(!ValueUtil.isNull(vsSfDen)) util.Grid.setCellValue(app, "grdRegFeeRefund", "REFUND_TRANS_RATE_DEN", vsSfDen, pnIdx);   
			}
		});
	};	
	
	/**
	 * @desc 부모 헤더에 메세지 뿌리기
	 * @member stdCrsCRegFeeRefund
	 * @param psMsgCode 메시지 코드
	 * @param  paMsg 메시지 변수 
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 29.
	 */
	moPage.setParentMsg = function(psMsgCode, paMsg) {
		util.Msg.notify(app, psMsgCode, paMsg);	
	};
	
	/**
	 * @desc 변경사항체크 - 부모창에서 호출용
	 * @member stdCrsCRegFeeRefund
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 29.
	 */
	function doCheckDataChange() {
		if(util.Grid.isModified(app, ["grdRegFeeRefund"], "CRM") ){
			return false;
		}else{
			return true;
		}
	};
	
	return moPage;
};

