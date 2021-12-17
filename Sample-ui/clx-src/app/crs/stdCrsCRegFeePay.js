//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
///<xtmlink path="./stdCrsCRegFeePay.xtm"/>

var stdCrsCRegFeePay = function() {

	var moPage = new Page();
	var moPObject = new PObject();
	
	/**
	 * 등록금납입신규 팝업 관련 설정사항
	 */
	moPObject.moRegFeePayCrtParam = {
		studId : "",
		schYearRcd : "",
		smtRcd : "",
		regCls : "",
	};

	/**
	 * @desc import 서브페이지 초기화
	 * @member stdCrsCRegFeePay
	 * @param
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 28.
	 */
	moPage.onLoadImportDone_ImpSbpHeader = function() {
		doSbpHeaderOnLoad();
	}
	
	/**
	 * @desc 화면 온로드
	 * @member stdCrsCRegFeePay
	 * @param
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 28.
	 */
	moPage.onModelConstructDone_StdCrsCRegFeePay = function() {
		
		//리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init("rptRegFeePay");
		
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
	 * @desc 등록금납부내역 목록을 조회한다.
	 * @member stdCrsCRegFeePay
	 * @param poCallBackFunc 콜백 함수
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 28.
	 */
	function doList(poCallBackFunc) {
		
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess) {
			if (pbSuccess) {
				util.Control.redraw(app, ["rptRegFeePay"]);
			}
			
			if(util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
		});
	};
	
	/**
	 * @desc 납입신규등록 팝업 호출
	 * @member stdCrsCRegFeePay
	 * @param   
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 28.
	 */
	moPage.onClick_BtnNew = function() {
		//납입신규생성팝업 호출
		var voMapNode = moPObject.moRegFeePayCrtParam;
		voMapNode.studId = util.DataMap.getValue(app, "dmReqKey", "strStudId");
		voMapNode.schYearRcd = util.DataMap.getValue(app, "dmReqKey", "strSchYearRcd");
		voMapNode.smtRcd = util.DataMap.getValue(app, "dmReqKey", "strSmtRcd");
		voMapNode.regCls = util.DataMap.getValue(app, "dmReqKey", "strRegClsRcd");
		
		ExtPopUp.openLayeredPopup("/xtm/crs/stdCrsCRegFeePayCrt.xtm", 935, 445);
	};
	
	/**
	 * @desc 납입생성 팝업 콜백함수
	 * @member stdCrsCRegFeePay
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 28.
	 */
	moPage.callbackRegFeePayCrt = function(pbSuccess) {
		// 조회
		doList(function(pbSuccess) {
			if (pbSuccess){
				// 등록사항 재조회
				ExtSubPage.getParent().callScript("doSetRegInfo");
				// "납부처리 되었습니다."
				moPage.setParentMsg(NLS.CRS.M058);		
			}
		});
	};
	
	/**
	 * @desc 납입취소버튼 클릭 이벤트
	 * @member stdCrsCRegFeePay
	 * @param   
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 28.
	 */
	moPage.onClick_BtnSaveDel = function() {
		var vnChekNodeLength = ExtInstance.getNodeListLength("/root/resList/rptRegFeePay/row[child::DEL_CKB='Y']");
		if (vnChekNodeLength <= 0 ) {
			var vsMsgParam = util.Grid.getTitle(app, "grdRegFeePayRegFeePay");
			// "@(을)를 선택해주세요" 메시지 출력
			util.Msg.alert("NLS-INF-M045", [vsMsgParam]);
			return;
		}
		
		var vsPanelCheckIdx = util.Grid.getCheckOrSelectedRowIndex(app, "grdRegFeePay");
		var voPanelChk;
		
		if(String(vsPanelCheckIdx).indexOf(",") != -1){
			voPanelChk = vsPanelCheckIdx.split(",");
		}else{
			voPanelChk = new Array();
			voPanelChk[0] = vsPanelCheckIdx;
		}	
		
		var vsPayGrpKey = null;
		for(var i = 0; i < voPanelChk.length; i++) {
			var vnRow = voPanelChk[i];
			
			var vsTempPayGrpKey = util.Grid.getCellValue(app, "grdRegFeePay", "PAY_GRP_KEY", vnRow);
			if (i == 0) vsPayGrpKey = vsTempPayGrpKey;
			else vsPayGrpKey += ("," + vsTempPayGrpKey);
		}
		util.DataMap.setValue(app, "dmReqKey", "strPayGrpKey", vsPayGrpKey);
		
		//취소는 납입그룹키 단위로 모두 취소됩니다. 취소하시겠습니까?
		if(!util.Msg.confirm("NLS-CRS-M049") ) return;
		
		//납입취소 서브미션 호출
		//strCommand: cancel 
		util.Submit.send(app, "subCancel", function(pbSuccess) {
			if(pbSuccess) {
				
				doList(function(pbSuccessList) {
					if(pbSuccessList) {
						// 등록사항 재조회
						ExtSubPage.getParent().callScript("doSetRegInfo");
						// "납입취소 되었습니다."
						this.setParentMsg(NLS.CRS.M050);
					}
				});
			}
		});
	};
	
	/**
	 * @desc 부모 헤더에 메세지 뿌리기
	 * @member stdCrsCRegFeePay
	 * @param psMsgCode 메시지 코드
	 * @param  paMsg 메시지 변수 
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 28.
	 */
	moPage.setParentMsg = function(psMsgCode, paMsg) {
		util.Msg.notify(app, psMsgCode, paMsg);	
	};
	
	/**
	 * @desc 변경사항체크 - 부모창에서 호출용
	 * @member stdCrsCRegFeePay
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 28.
	 */
	function doCheckDataChange() {
		if(util.Grid.isModified(app, ["grdRegFeePay"], "CRM") ){
			return false;
		}else{
			return true;
		}
	};
	
	return moPage;
};

