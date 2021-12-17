//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./stdCrsCRegFeeDivPayCrt.xtm"/>

/**
 * 분할납부신규생성
 * @class stdCrsCRegFeeDivPayCrt
 * @author Aeyoung Lee 2016. 3. 24
 */
var stdCrsCRegFeeDivPayCrt = function() {
	var moPage = new Page();
	
	/**
	 * @desc import 헤더 초기화
	 * @param 
	 * @return  void
	 * @author Aeyoung Lee 2016. 3. 24
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		// import 헤더 초기화
		doHeaderOnLoad();
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
//		ExtRepeat.init(["rptDivPayProcPop"]);
		
		// 서브미션 호출
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, ["cbbDivPayType"]);
				
				doSetCondition();
			}
		});
	};
	
	/**
	 * @desc 부모창으로부터 받은 조건 세팅
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 24
	 */
	function doSetCondition() {
		// 부모창 값 셋팅
		var voRegDivPayCrtParam =  ExtPopUp.getParentVal("moRegDivPayCrtParam");
		
		util.Control.setValue(app, "dipDivPayReqDt", voRegDivPayCrtParam.divPayReqDt);
		util.Control.setValue(app, "ipbDivPayStatRcd", voRegDivPayCrtParam.divPayStatRcd);
		util.Control.setValue(app, "ipbDivPayDesc", voRegDivPayCrtParam.divPayDesc);
		util.Control.setValue(app, "cbbDivPayType", voRegDivPayCrtParam.divPayTypeCd);
		
		util.DataMap.setValue(app, "dmSearchData", "strStudId", voRegDivPayCrtParam.studId);
		util.DataMap.setValue(app, "dmSearchData", "strSchYearRcd", voRegDivPayCrtParam.schYearRcd);
		util.DataMap.setValue(app, "dmSearchData", "strSmtRcd", voRegDivPayCrtParam.smtRcd);
		util.DataMap.setValue(app, "dmSearchData", "strRegClsRcd", voRegDivPayCrtParam.regCls);
		
		doList(function(pbSuccess) {
			if (pbSuccess){
				// "조회되었습니다."
				util.Msg.notify(app, "NLS.INF.M024");					
			}
		});
		
	};		
	
	/**
	 * @desc 분납대상 조회
	 * @param poCallBackFunc 콜백정의
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 24
	 */
	function doList(poCallBackFunc) {
		
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdDivPayProcPop");
			} 
			// 조회 후 콜백함수 수행
			if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
		});
	};
	
	/**
	 * @desc [btnSaveCrtDivPay]분납생성 onClick 이벤트
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 24
	 */
	moPage.onClick_BtnCrtDivPay = function() {
		// Validation Check
		if(!util.validate(app, ["grpCond"])) return false;
		
		var vnRptRowCnt = util.Grid.getRowCount(app, "grdDivPayProcPop");
		if (vnRptRowCnt <= 0 ) {
			util.Msg.alert("NLS-CRS-M055");	//분납대상자료가 없습니다. 
			return false;
		}
		
		var vnTotAmt = 0;
		for(var i = 1; i <= vnRptRowCnt; i++) {
			var vsDivItemCd = util.Grid.getCellValue(app, "grdDivPayProcPop", "ITEM_CD", i);
			var vnDivAmt = Number(util.Grid.getCellValue(app, "grdDivPayProcPop", "AMT", i));
			
			vnTotAmt = vnTotAmt + vnDivAmt;
			
			var vnItemSumAmt = 0; //항목별 합계금액
			
			for(var j = 1; j <= vnRptRowCnt; j++) {
				var vsSubDivItemCd = util.Grid.getCellValue(app, "grdDivPayProcPop", "ITEM_CD", j);
				var vnSubDivAmt = Number(util.Grid.getCellValue(app, "grdDivPayProcPop", "AMT", j));
				
				if(vsDivItemCd != vsSubDivItemCd) continue;
				
				vnItemSumAmt = vnItemSumAmt + vnSubDivAmt;
			}
			
			//장학금이 등록금보다 더 큰 항목이 존재합니다. 처리 불가능합니다. 
			if(vnItemSumAmt < 0) {	
				util.Msg.alert("NLS-CRS-M057"); 
				return;
			}	
		}	
		
		// 분납처리할 대상금액이 없습니다.
		if(vnTotAmt == 0){
			util.Msg.alert("NLS-CRS-M056"); 
			return;
		} 
		
		util.Grid.setRowStateAll(app, "grdDivPayProcPop", cpr.data.tabledata.RowState.UPDATED); 
		
		// 분납생성 서브미션
		//strCommand: createDivPay 
		util.Submit.send(app, "subCrtDivPay", function(pbSuccess){
			if(pbSuccess){
				if(ExtPopUp.isPopUp()){
					ExtPopUp.closeLayeredPopup("callbackRegFeeDivPayCrt", true);
				}	
			}	
		});
	};
	
	return moPage;
};
