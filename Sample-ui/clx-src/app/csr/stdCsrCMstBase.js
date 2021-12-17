//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./stdCsrCMstBase.xtm"/>


var stdCsrCMstBase = function() {
	var moPage = new Page();
	
	/********************************
	 * 사용자 정의 메소드, 변수
	 *******************************/
	var msStudId = "";
	var msStudNo = "";
	var msKeyDt  = "";
    var mbSaveChk = false;
	/********************************
	 * 폼 신규 상태 체크 
	 *******************************/
	moPage.mbIsInsertRowFrf = false;
	
	moPage.onLoadImportDone_impSbpHeader = function() {
		doSbpHeaderOnLoad();
	};
	
	moPage.onModelConstructDone_StdCsrCMstBase = function() {
		doOnLoad();
	};
	
	/**
	 * @desc 프리폼 변경여부 반환
	 * @param 
	 * @return boolean 변경여부
	 * @author Choi In Seong 2016. 1. 20
	 */
	function doCheckDataChange() {

		if(util.Grid.isModified(app, ["frfCsrShreg"], "CRM") ){
			return false;
		}else{
			return true;
		}
		
	}
	
	/**
	 * @desc doOnLoad 화면 초기화
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 1. 20
	 */
	function doOnLoad(){
		//리피트 초기화
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["frfCsrShreg"]);

		//암호화 관련 컬럼 Origin 데이터 설정
		ExtRepeat.addOriginCol("frfCsrShreg", ["SSN", "ACCT_NO"]);

		//메인 프레임에서 학생의 id를 받아 해당 기본정보 추출
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess) {
			if (pbSuccess) {
				
				util.Control.redraw(app, ["frfCsrShreg"]);
				var voParentPage = ExtSubPage.getParent();
				
				// 부모멤버변수에담긴학번받음
				msStudId  	= voParentPage.callScriptVal("ExtInstance").getValue("/root/reqKey/strStudId");
				msStudNo	= voParentPage.callScriptVal("ExtInstance").getValue("/root/reqKey/strStudNo");
				msKeyDt 	= voParentPage.callScriptVal("ExtInstance").getValue("/root/resOnLoad/currentDate");
				
				if (ValueUtil.isNull(msStudId)) {
					return false;
				}
				
				//LIST CALL 
				doList(function(pbSuccessList) {
					if (pbSuccessList) {
						// 조회 : "조회되었습니다." header 메세지 표시
						if(pbSuccess) moPage.parentSendMsg("lblTitleSubBase", NLS.INF.M024);
					}
				});
			}
		});
	}
	
	/**
	 * @desc 해당 학생의 기본정보 데이터를 가져온다.
	 * @param poFunc 콜백함수
	 * @return void
	 * @author Choi In Seong 2016. 1. 20
	 */
	function doList(poFunc) {
		util.DataMap.setValue(app, "dmReqKey", "strStudId", msStudId);
		util.DataMap.setValue(app, "dmReqKey", "strStudNo", msStudNo);
		util.DataMap.setValue(app, "dmReqKey", "strKeyDate", msKeyDt);
		
		// submission call 
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess) {
			if (pbSuccess) {

				util.Control.redraw(app, ["frfCsrShreg"]);
				var vsRowCnt = util.DataMap.getValue(app, "dmResList", "rowCnt");
				if (vsRowCnt == "0") {
					doSubInsertRow();
				}else{
					moPage.mbIsInsertRowFrf = false;
				}
			}
			// 조회 후 콜백함수 수행
			if (util.isFunc(poFunc)) poFunc(pbSuccess);
		});
	};
	
	/**
	 * @desc 작업저장
	 * @param poCallbackFunc 콜백함수
	 * @return Boolean
	 * @author Choi In Seong 2016. 1. 20
	 */
	function doSubSave(poCallbackFunc) {
		// 프리폼 변경사항 체크
		if(!util.Grid.isModified(app, ["frfCsrShreg"], null)){
			moPage.parentSendMsg("lblTitleSubBase",NLS.WRN.M007);
			if(util.isFunc(poCallbackFunc)) poCallbackFunc(false);
			return false;
		}
		
		// 필수값 체크
		if(!util.validate(app, "frfCsrShreg")){
			if(util.isFunc(poCallbackFunc)) poCallbackFunc(false);
			return false;
		}
		
		doSave("0", poCallbackFunc);
	};
	
	/**
	 * @desc 작업저장
	 * @param pnStep 저장 횟수
	 * @param poCallbackFunc 콜백함수
	 * @return Boolean
	 * @author Choi In Seong 2016. 1. 20
	 */
	function doSave(pnStep, poCallbackFunc) {
		if(mbSaveChk) return;
		mbSaveChk = true;
		if (!pnStep) pnStep = "0";
		util.DataMap.setValue(app, "dmInteractiveMsg", "intStep", pnStep);
		
		//신규일 경우 fiag insert 로 변경
		if( moPage.mbIsInsertRowFrf ){
			//신규입력일 경우 신규 플래그 설정
			util.Grid.setRowState(app, "frfCsrShreg",cpr.data.tabledata.RowState.INSERTED,'1');
		}
		
		//save submission call
		//strCommand: save 
		util.Submit.send(app, "subSave", function(pbSuccessSave) {
				if(pbSuccessSave) {
					var vsMsg = util.DataMap.getValue(app, "dmInteractiveMsg", "strMsg");
					
					if(!ValueUtil.isNull(vsMsg)) {
						if (util.Msg.confirm("NLS-CRM-M034", [vsMsg])) {
							// @1\n  계속하시겠습니까?
							var vnStep = util.DataMap.getValue(app, "dmInteractiveMsg", "intStep");
							mbSaveChk = false;
							return doSave(vnStep, poCallbackFunc);
						} else {
							mbSaveChk = false;
							return false;
						}
					}else{
						var voCallBackSaveAfter = function(pbSuccessAfter) {
							if(pbSuccessAfter) {
								//저장성공 메세지 출력
								moPage.parentSendMsg("lblTitleSubBase", NLS.INF.M025);
								if(util.isFunc(poCallbackFunc))	poCallbackFunc(true);
							}
							mbSaveChk = false;
						};
						ExtSubPage.getParent().callScript("doSaveAfter", voCallBackSaveAfter);
						return true;
					}
					
				}else{
					mbSaveChk = false;
					return false;
				}
			}
		);
	};

	/**
	 * @desc 데이터 셋에 row 추가
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 1. 20
	 */
	function doSubInsertRow() {
		util.FreeForm.setValue(app, "frfCsrShreg",AppConstants.CUD_COL_REF, "N");
		//vcRpt.setCellVal(vnInsRowIdx, AppConstants.CUD_COL_REF, "N", true, true);
		//프리폼 신규
		util.FreeForm.insertRow(app, "frfCsrShreg");
		//학생 ObjectId 셋팅
		util.FreeForm.setValue(app, "frfCsrShreg", "STUD_ID", msStudId);
		//상태 오픈 상태로 변경 :트리 변경시 변경사항 유무 체크 피하기 위함
		util.Grid.setRowState(app, "frfCsrShreg",cpr.data.tabledata.RowState.UNCHANGED,'1');
		//신규입력이 Ok
		moPage.mbIsInsertRowFrf = true;
		util.Control.setEnable(app, true, ["frfCsrShreg"]);

		
	};
	
	/**
	 * @desc 부모 헤더에 메세지 뿌리기
	 * @param psCtrlId 
	 * @param psMsgCode 
	 * @return void
	 * @author Choi In Seong 2016. 1. 20
	 */
	moPage.parentSendMsg = function(psCtrlId, psMsgCodeNm) {
		var vsMsg = ExtControl.getTextValue(psCtrlId);
		vsMsg     = "[" + vsMsg + "]";
	
		util.Msg.notify(app, vsMsg + psMsgCodeNm);	
	};
	
	/**
	 * @desc 저장 버튼 클릭
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 1. 20
	 */
	moPage.onClick_BtnSave = function() {
		doSubSave();
	};

	/**
	 * @desc 계좌번호 유효성 체크 숫자만 입력가능
	 * @param  
	 * @return void
	 * @author Choi In Seong 2016. 1. 20
	 */	
	moPage.onValueChanged_IpbAcctNo = function() {
		
		var vsValue = util.FreeForm.getValue(app, "frfCsrShreg", "ACCT_NO");
		var vsChkValue = "";
		//특수문자만 입력시 널처리
		var specialChars = /[-~!#$^&*=+|:;?"<,.>']/;
		vsValue.split(specialChars).join("");
		
		if (vsValue.match(/[0-9]/g) != null) {
			vsChkValue = vsValue.match(/[0-9]/g).join("");
		} else {
			vsChkValue =  "";
		}
		util.FreeForm.setValue(app, "frfCsrShreg", "ACCT_NO", vsChkValue, false);
	};
	return moPage;
};
