//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
///<xtmlink path="./stdCrsCRegFeeTrans.xtm"/>

var stdCrsCRegFeeTrans = function() {

	var moPage = new Page();

	/**
	 * @desc import 서브페이지 초기화
	 * @member stdCrsCRegFeeTrans
	 * @param
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 30.
	 */
	moPage.onLoadImportDone_ImpSbpHeader = function() {
		doSbpHeaderOnLoad();
	}
	
	/**
	 * @desc 화면 온로드
	 * @member stdCrsCRegFeeTrans
	 * @param
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 30.
	 */
	moPage.onModelConstructDone_StdCrsCRegFeeTrans = function() {
		
		//리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init("rptRegFeeTrn");
		
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
	 * @desc 등록금이월내역 목록을 조회한다.
	 * @member stdCrsCRegFeeTrans
	 * @param poCallBackFunc 콜백 함수
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 30.
	 */
	function doList(poCallBackFunc) {
		
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess) {
			if (pbSuccess) {
				util.Control.redraw(app, "grdRegFeeTrn");
			}
			
			if(util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
		});
	};
	
	/**
	 * @desc 신규버튼 클릭 이벤트
	 * @member stdCrsCRegFeeTrans
	 * @param   
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 30.
	 */
	moPage.onClick_BtnNew = function() {
		var vnNewRow = util.Grid.insertRow(app, "grdRegFeeTrn", "rdCbbItemCd");
		
		util.Grid.setCellValue(app, "grdRegFeeTrn", "STUD_ID"	  , util.DataMap.getValue(app, "dmReqKey", "strStudId"), vnNewRow);
		util.Grid.setCellValue(app, "grdRegFeeTrn", "SCH_YEAR_RCD" , util.DataMap.getValue(app, "dmReqKey", "strSchYearRcd"), vnNewRow);
		util.Grid.setCellValue(app, "grdRegFeeTrn", "SMT_RCD"	  , util.DataMap.getValue(app, "dmReqKey", "strSmtRcd"), vnNewRow);
		util.Grid.setCellValue(app, "grdRegFeeTrn", "REG_CLS_RCD"  , util.DataMap.getValue(app, "dmReqKey", "strRegClsRcd"), vnNewRow);
		util.Grid.setCellValue(app, "grdRegFeeTrn", "DESC_TYPE_RCD", "CR302TRN", vnNewRow);
	};
	
	/**
	 * @desc 삭제버튼 클릭 이벤트
	 * @member stdCrsCRegFeeTrans
	 * @param   
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 30.
	 */
	moPage.onClick_BtnDel = function() {
		util.Grid.deleteRow(app, "grdRegFeeTrn");
	};
	
	/**
	 * @desc 작업취소버튼 클릭 이벤트
	 * @member stdCrsCRegFeeTrans
	 * @param   
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 30.
	 */
	moPage.onClick_BtnRestore = function() {
		util.Grid.restoreRow(app, "grdRegFeeTrn");
	};
	
	/**
	 * @desc 작업저장버튼 클릭 이벤트
	 * @member stdCrsCRegFeeTrans
	 * @param   
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 30.
	 */
	moPage.onClick_BtnSave = function() {
		// 리피터 변경사항 체크
		if(!util.Grid.isModified(app, ["grdRegFeeTrn"], null)){
			moPage.setParentMsg(NLS.WRN.M007);
			return false;
		}
		
		// Validation Check
		if(!util.validate(app, ["grdRegFeeTrn"])) return false;
		
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
	 * onValueChanged_RptRegFeeTrn 등록금 이월내역 변경 이벤트
	 * @member stdCrsCRegFeeTrans
	 * @param  psColDiv 변경된 ref
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 30.
	 */	
	moPage.onValueChanged_RptRegFeeTrn = function(psColDiv) {
		var vnIdx = util.Grid.getIndex(app, "grdRegFeeTrn");
		var vsValue = util.Grid.getCellValue(app, "grdRegFeeTrn", psColDiv, vnIdx);
		
		// 등록금항목
		if(psColDiv == "ITEM_CD"){
			if(!ValueUtil.isNull(vsValue)){
				util.Grid.setCellValue(app, "grdRegFeeTrn", "SERIAL_NO", doGetSerialNo(vnIdx, vsValue), vnIdx);	
			}else{
				util.Grid.setCellValue(app, "grdRegFeeTrn", "SERIAL_NO", "", vnIdx);	
			}	
        }
		
		// 이월금액
		if(psColDiv == "AMT"){
			if(vsValue.length != 0 && Number(vsValue) < 1){
				//-는 입력 안됨 : @은 0보다 큰수만 허용됩니다.
                util.Msg.alert("NLS-CRS-M006", [NLS.NSCR.CARRIEDAMT]);
				util.Grid.setCellValue(app, "grdRegFeeTrn", psColDiv, "", vnIdx);
				return;
			}
        }
		
		// 이월율분자, 이월율분모
		if(psColDiv == "REFUND_TRANS_RATE_NUR" || psColDiv == "REFUND_TRANS_RATE_DEN"){
			if(vsValue.length != 0 && Number(vsValue) < 1){
				
				if(psColDiv == "REFUND_TRANS_RATE_NUR"){
					util.Msg.alert("NLS-CRS-M006", [NLS.NSCR.TRNNUR]);
				}else{
					util.Msg.alert("NLS-CRS-M006", [NLS.NSCR.TRNDEN]);
				}	
				
				util.Grid.setCellValue(app, "grdRegFeeTrn", psColDiv, "", vnIdx);
				return;
			}
			
			var vnRateNur = util.Grid.getCellValue(app, "grdRegFeeTrn", "REFUND_TRANS_RATE_NUR", vnIdx);
			var vnRateDen = util.Grid.getCellValue(app, "grdRegFeeTrn", "REFUND_TRANS_RATE_DEN", vnIdx);
			if((!ValueUtil.isNull(vnRateDen)) && (!ValueUtil.isNull(vnRateNur)) && Number(vnRateDen) < Number(vnRateNur)){
				//분자는 분모보다 클 수 없습니다.
				util.Msg.alert("NLS-CRS-M080", [NLS.NSCR.TRNNUR, NLS.NSCR.TRNDEN]);
				util.Grid.setCellValue(app, "grdRegFeeTrn", psColDiv, "", vnIdx);
				return;
			}
		}
	};
	
	/**
	 * doGetSerialNo 순번리턴
	 * @param  pnIdx 선택된 로우 인덱스
	 * @param  psItemCd 선택된 등록금항목 코드
	 * @member stdCrsCRegFeeTrans
	 * @return vnMaxSerialNo 
	 * @author Aeyoung Lee 2016. 3. 30.
	 */
	function doGetSerialNo(pnIdx, psItemCd) {
		var vnMaxSerialNo = null;
		for (var i = 1; i <= util.Grid.getRowCount(app, "grdRegFeeTrn"); i++) {
			
			if(pnIdx == i) continue;
			var vsItemCd = util.Grid.getCellValue(app, "grdRegFeeTrn", "ITEM_CD", i);
			
			if(psItemCd == vsItemCd){
				var vnSerialNo = Number(util.Grid.getCellValue(app, "grdRegFeeTrn", "SERIAL_NO", i));
				
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
	 * @desc 부모 헤더에 메세지 뿌리기
	 * @member stdCrsCRegFeeTrans
	 * @param psMsgCode 메시지 코드
	 * @param  paMsg 메시지 변수 
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 30.
	 */
	moPage.setParentMsg = function(psMsgCode, paMsg) {
		util.Msg.notify(app, psMsgCode, paMsg);	
	};
	
	/**
	 * @desc 변경사항체크 - 부모창에서 호출용
	 * @member stdCrsCRegFeeTrans
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 30.
	 */
	function doCheckDataChange() {
		if(util.Grid.isModified(app, ["grdRegFeeTrn"], "CRM") ){
			return false;
		}else{
			return true;
		}
	};
	
	return moPage;
};

