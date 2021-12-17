//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
///<xtmlink path="./stdCsrCMstStatus.xtm"/>

var stdCsrCMstStatus = function() {

	var moPage = new Page();
	//임포트용 데이터 통신 오브젝트
	var moPObject = new PObject();

	var msStudId = "";
	var msStudNo = "";
		
	//등록 popUp에 학년도 Text,학기Text,학적등록구분Text,이수과정구분Text,이수과정text,학적등록사유Text 추가해서 넘겨줌 
	//등록 popUp에 넘겨줄 값 
	moPObject.moStatObj = {
		headerStud		: "", 		//학적사항관리 창의 헤더정보(학생) 
		studId				: "", 		//학적사항관리 창의 조회된 학번값	
		strOgCd 			: "",		//행정부서
		strOgCdNm 		: "",		//행정부서명
		strSaCd 			: "", 		//학사부서
		strSaCdNm		: "",		//학사부서명
		strSpCd 			: "", 		//이수과정
		strSpCdNm		: "", 		//이수과정명
		strProcDt 			: "", 		//처리일자 
		studNo 				: "" 		//학적사항관리 창의 조회된 학번값
	};


	moPage.onLoadImportDone_ImpSbpHeader = function() {
		doSbpHeaderOnLoad();
	}
	
	/**
	 * @desc 화면 온로드
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 2. 11
	 */
	moPage.onModelConstructDone_stdCsrSMstRegi = function() {

		//리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init("rptCsrStatus");
		
		// 부모멤버변수에담긴학번받음
		msStudId = moPage.parent.moParentObj.studId;
		msStudNo = moPage.parent.moParentObj.studNo;
		
		moPObject.moStatObj.studId = msStudId;
		moPObject.moStatObj.studNo = msStudNo; 
		moPObject.moStatObj.headerStud = moPage.parent.moParentObj.headerStud;
		
		if (ValueUtil.isNull(msStudId)) {
			return false;
		}
		
		doList(function(pbSuccess) {
			// 조회 : "조회되었습니다." header 메세지 표시
			if(pbSuccess) {
				moPage.parentSendMsg("lblTitleRptCsrStatus", NLS.INF.M024);
			}
		});
	}

	/**
	 * @desc 상태정보를 조회한다.
	 * @param poCallBackFunc 콜백 함수
	 * @return void
	 * @author Choi In Seong 2016. 2. 11
	 */
	function doList(poCallBackFunc) {
		
		util.DataMap.setValue(app, "dmReqKey", "strStudId", msStudId);
		
		//서브미션 실행 (실패시 cover page)
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, ["rptCsrStatus"]);
			}
			if(util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
		});
		
	}
	
	/**
	 * @desc 작업저장
	 * @param poCallbackFunc 콜백함수
	 * @return Boolean
	 * @author Choi In Seong 2016. 2. 11
	 */
	function doSubSave(poCallbackFunc) {
		// 리피터 변경사항 체크
		if(!util.Grid.isModified(app, ["grdCsrStatus"], null)){
			moPage.parentSendMsg("lblTitleRptCsrStatus",NLS.WRN.M007);
			if(util.isFunc(poCallbackFunc)) poCallbackFunc(false);
			return false;
		}
		//리피트 validation check
		if(!util.validate(app, "grdCsrStatus")){
			if(util.isFunc(poCallbackFunc)) poCallbackFunc(false);
			return false;
		}
		
		//strCommand: save 
		util.Submit.send(app, "subSave", function(pbSuccessSave) {
				if(pbSuccessSave) {
					var voCallBackSaveAfter = function(pbSuccessAfter) {
						if(pbSuccessAfter) {
							//저장성공 메세지 출력
							// 조회 : "조회되었습니다." header 메세지 표시
							moPage.parentSendMsg("lblTitleRptCsrStatus",NLS.INF.M025);
						}
						if(util.isFunc(poCallbackFunc))	poCallbackFunc(pbSuccessList);
					};
					ExtSubPage.getParent().callScript("doSaveAfter", voCallBackSaveAfter);
				}
			}
		);
	};
	
	/**
	 * @desc 부모 헤더에 메세지 뿌리기
	 * @param psCtrlId 
	 * @param psMsgCode 
	 * @return void
	 * @author Choi In Seong 2016. 2. 11
	 */
	moPage.parentSendMsg = function(psCtrlId, psMsgCodeNm) {
		var vsMsg = ExtControl.getTextValue(psCtrlId);
		vsMsg     = "[" + vsMsg + "]";
	
		util.Msg.notify(app, vsMsg + psMsgCodeNm);	
	};
	
	/**
	 * @desc 변경여부 반환
	 * @param 
	 * @return boolean 변경여부
	 * @author Choi In Seong 2016. 2. 11
	 */
	function doCheckDataChange() {
		if(util.Grid.isModified(app, ["grdCsrStatus"], "CRM") ){
			return false;
		}else{
			return true;
		}
	};

	return moPage;
};

