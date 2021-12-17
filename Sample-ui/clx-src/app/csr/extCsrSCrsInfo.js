//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
///<xtmlink path="./extCsrSCrsInfo.xtm"/>

var extCsrSCrsInfo = function() {

	var moPage = new Page();
	//임포트용 데이터 통신 오브젝트
	var moPObject = new PObject();

	var msStudId = "";
	
	/**
	 * @desc 서브페이지 임포트 온로드
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 5. 27
	 */
	moPage.onLoadImportDone_ImpSbpHeader = function() {
		doSbpHeaderOnLoad();
	}
	
	/**
	 * @desc 화면 온로드
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 5. 27
	 */
	moPage.onModelConstructDone_extCsrSCcrInfo = function() {
		
		//리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init("rptStudReg");

		var voParentPage = ExtSubPage.getParent();
		
		// 부모멤버변수에담긴학번받음
		msStudId = moPage.parent.moParentObj.studId;
		
		util.DataMap.setValue(app, "dmReqList", "strStudId", msStudId);
		if (!ValueUtil.isNull(msStudId)) {
				doList(function(pbSuccess) {
				// 조회 : "조회되었습니다." header 메세지 표시
				if(pbSuccess) {
					moPage.parentSendMsg("lblTitleRptStudReg", NLS.INF.M024);
				}
			});
		}
	}

	
	/**
	 * @desc 성적정보조회
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 3. 18
	 */
	function doList(poCallBackFunc) {

		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdStudReg");
				util.Control.redraw(app, ["lblRowCnt_rptStudReg"]);
			}
			// 조회 후 콜백함수 수행
			if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
		});
	}
	
	/**
	 * @desc 부모 헤더에 메세지 뿌리기
	 * @param psCtrlId 
	 * @param psMsgCode 
	 * @return void
	 * @author Choi In Seong 2016. 5. 27
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
	 * @author Choi In Seong 2016. 5. 27
	 */
	function doCheckDataChange() {
		if(util.Grid.isModified(app, ["grdStudReg"], "CRM") ){
			return false;
		}else{
			return true;
		}
	};

	return moPage;
};

