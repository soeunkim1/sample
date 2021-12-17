//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
///<xtmlink path="./stdCssCScalStud.xtm"/>

var stdCssCScalStud = function() {

	var moPage = new Page();
	var moPObject = new PObject();
	
	/**
	 * 장학생(상세)팝업 관련 설정사항
	 */
	moPObject.moScalStudDtlParam = {
		progMode : null,
		serialNo : null,
		
		studId : null,
		studNo : null,
		schYearRcd : null,
		smtRcd : null,
		stDt : null,
		endDt : null,
		currentDt : null,
		
		studNm : null,
		ogCd : null,
		ogNm : null,
		saCd : null,
		saNm : null,
		spCd : null,
		spNm : null,
		statRcd : null,
		statNm : null
	};

	/**
	 * @desc import 서브페이지 초기화
	 * @member stdCssCScalStud
	 * @param
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 3.
	 */
	moPage.onLoadImportDone_ImpSbpHeader = function() {
		doSbpHeaderOnLoad();
	}
	
	/**
	 * @desc 화면 온로드
	 * @member stdCssCScalStud
	 * @param
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 3.
	 */
	moPage.onModelConstructDone_stdCssCScalStud = function() {
		
		//리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init("rptScalStud");
		
		// 부모창에 있는 값 셋팅
		var voParentInfo = moPage.parent.moCmnInfo;
		
		moPObject.moScalStudDtlParam.studNm = voParentInfo.studNm;
		moPObject.moScalStudDtlParam.ogCd = voParentInfo.ogCd;
		moPObject.moScalStudDtlParam.ogNm = voParentInfo.ogNm;
		moPObject.moScalStudDtlParam.saCd = voParentInfo.saCd;
		moPObject.moScalStudDtlParam.saNm = voParentInfo.saNm;
		moPObject.moScalStudDtlParam.spCd = voParentInfo.spCd;
		moPObject.moScalStudDtlParam.spNm = voParentInfo.spNm;
		moPObject.moScalStudDtlParam.statRcd = voParentInfo.statRcd;
		moPObject.moScalStudDtlParam.statNm = voParentInfo.statNm;
		
		moPObject.moScalStudDtlParam.studId = voParentInfo.studId;
		moPObject.moScalStudDtlParam.studNo = voParentInfo.studNo;
		moPObject.moScalStudDtlParam.schYearRcd = voParentInfo.schYearRcd;
		moPObject.moScalStudDtlParam.smtRcd = voParentInfo.smtRcd;
		moPObject.moScalStudDtlParam.currentDt = voParentInfo.currentDt;
		moPObject.moScalStudDtlParam.stDt = voParentInfo.stDt;
		moPObject.moScalStudDtlParam.endDt = voParentInfo.endDt;
		
		util.DataMap.setValue(app, "dmSchedule", "strSchYearRcd", voParentInfo.schYearRcd);
		util.DataMap.setValue(app, "dmSchedule", "strSmtRcd"	  , voParentInfo.smtRcd);
		util.DataMap.setValue(app, "dmSchedule", "strStDt"	  , voParentInfo.stDt);
		util.DataMap.setValue(app, "dmSchedule", "strEndDt"	  , voParentInfo.endDt);
		util.DataMap.setValue(app, "dmReqKey", "strStudId"	 		  , voParentInfo.studId);
			
		// 조회
		doList(function(pbSuccess) {
			if (pbSuccess){
				// "조회되었습니다."
				setParentMsg(NLS.INF.M024);		
			}
		});
	};

	/**
	 * @desc 장학생 내역을 조회한다.
	 * @member stdCssCScalStud
	 * @param poCallBackFunc 콜백 함수
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 3.
	 */
	function doList(poCallBackFunc) {
		
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess) {
			if (pbSuccess) {
				util.Control.redraw(app, ["rptScalStud"]);
			}
			
			if(util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
		});
	};
	
	/**
	 * @desc 신규등록 팝업 호출
	 * @member stdCssCScalStud
	 * @param   
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 3.
	 */
	moPage.onClick_BtnNew = function() {
		var vsSerialNo = 0;
		for (var i = 1; i <= util.Grid.getRowCount(app, "grdScalStud"); i++) {
			var vsSerialNoTemp =  util.Grid.getCellValue(app, "grdScalStud", "SERIAL_NO", i);
			if (vsSerialNo < vsSerialNoTemp) {
				vsSerialNo = vsSerialNoTemp;
			}
		}
		vsSerialNo = vsSerialNo + 1;
		moPObject.moScalStudDtlParam.progMode = "ADD";
		moPObject.moScalStudDtlParam.serialNo = vsSerialNo;
		
		ExtPopUp.openLayeredPopup("/xtm/css/stdCssCScalStudDtl.xtm", 812, 600);
	};
	
	/**
	 * @desc 삭제버튼 클릭 이벤트
	 * @member stdCssCScalStud
	 * @param   
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 3.
	 */
	moPage.onClick_BtnDel = function() {
		var vnRowIdx = util.Grid.getCheckOrSelectedRowIndex(app, "grdScalStud")
		if(ValueUtil.isNull(vnRowIdx)){
			var vsMsgParam = util.Grid.getTitle(app, "grdScalStudScalStud");
			// "@(을)를 선택해주세요" 메시지 출력
			util.Msg.alert("NLS-INF-M045", [vsMsgParam]);
			return;
		}	
		
		/*
		 * 현재 "삭제할 수 없습니다."라고 나오는 메시지를 세분화하여 사용자의 이해를 높인다.
		 * ghcDelYn이 Y면 삭제가 가능하다.
		 */	
		var vsDelYn = util.Grid.getCellValue(app, "grdScalStud", "DEL_YN", vnRowIdx);
		 
		if (vsDelYn == "Y") {
			util.Grid.deleteRow(app, "grdScalStud");
		} else if (vsDelYn == "PAYGRPKEY") {
			//납입그룹키 존재
			util.Msg.alert("NLS-CSS-M084", [NLS.NSCR.PAYGRPKEY]);
		} else if (vsDelYn == "DIVPAYNO") {
			//분납번호 존재
			util.Msg.alert("NLS-CSS-M084", [NLS.NSCR.DIVPAYNO]);
		} else if (vsDelYn == "RCC") {
			//환수 데이터 존재
			util.Msg.alert("NLS-CSS-M084", [NLS.NSCR.RCC]);
		} else if (vsDelYn == "TRN") {
			//이월 데이터 존재
			util.Msg.alert("NLS-CSS-M084", [NLS.NSCR.TRANSZ]);
		}
	};
	
	/**
	 * @desc 작업취소 클릭 이벤트
	 * @member stdCssCScalStud
	 * @param   
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 3.
	 */
	moPage.onClick_BtnRestore = function() {
		util.Grid.restoreRow(app, "grdScalStud");
	};
	
	/**
	 * @desc 작업저장 클릭 이벤트
	 * @member stdCssCScalStud
	 * @param 
	 * @return boolean 변경여부
	 * @author Aeyoung Lee 2016. 3. 3.
	 */
	moPage.onClick_BtnSave = function() {
		doSave();
	};
	
	/**
	 * @desc 작업저장
	 * @member stdCssCScalStud
	 * @param poCallbackFunc 콜백함수
	 * @return Boolean
	 * @author Aeyoung Lee 2016. 3. 3.
	 */
	function doSave(poCallbackFunc) {
		// 리피터 변경사항 체크
		if(!util.Grid.isModified(app, ["grdScalStud"], null)){
			this.setParentMsg(NLS.WRN.M007);
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
	 * @desc 리피트 로우 더블클릭 이벤트
	 * @member stdCssCScalStud
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 3.
	 */
	moPage.onRowDoubleClick_RptScalStud = function() {
		var vnRowIdx = util.Grid.getCheckOrSelectedRowIndex(app, "grdScalStud")
		
		if(ValueUtil.isNull(vnRowIdx)){
			var vsMsgParam = util.Grid.getTitle(app, "grdScalStudScalStud");
			// "@(을)를 선택해주세요" 메시지 출력
			util.Msg.alert("NLS-INF-M045", [vsMsgParam]);	
		}	
		
		var vsSerialNo = util.Grid.getCellValue(app, "grdScalStud", "SERIAL_NO", vnRowIdx);
		
		moPObject.moScalStudDtlParam.progMode = "UPD";
		moPObject.moScalStudDtlParam.serialNo = vsSerialNo;
		
		ExtPopUp.openLayeredPopup("/xtm/css/stdCssCScalStudDtl.xtm", 812, 600);
	};
	
	/**
	 * @desc 부모 헤더에 메세지 뿌리기
	 * @member stdCssCScalStud
	 * @param psMsgCode 
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 3.
	 */
	moPage.setParentMsg = function(psMsgCode) {
		util.Msg.notify(app, psMsgCode);	
	};
	
	/**
	 * @desc 변경사항체크 - 부모창에서 호출용
	 * @member stdCssCScalStud
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 3.
	 */
	function doCheckDataChange() {
		if(util.Grid.isModified(app, ["grdScalStud"], "CRM") ){
			return false;
		}else{
			return true;
		}
	};
	
	return moPage;
};

