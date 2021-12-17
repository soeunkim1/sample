//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
///<xtmlink path="./extCsrSAltInfo.xtm"/>

var extCsrSAltInfo = function() {

	var moPage = new Page();
	//임포트용 데이터 통신 오브젝트
	var moPObject = new PObject();

	var msStudId = "";
	var msKeyDt  = "";
	
	/**
	 * @desc 서브페이지 임포트 온로드
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 3. 23
	 */
	moPage.onLoadImportDone_ImpSbpHeader = function() {
		doSbpHeaderOnLoad();
	};

	/**
	 * @desc 화면 온로드
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 3. 23
	 */
	moPage.onModelConstructDone_extCsrSAltInfo = function() {
		//리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init("rptCsrShregAlt");
		
		var voAltObj = moPage.parent.moParentObj;		
		
		// 부모멤버변수에담긴학번받음
		msStudId = voAltObj.studId;
		msKeyDt = voAltObj.keyDate;
		
		if(voAltObj.strAltYn == "Y"){
			doSizeAlt();
			util.Control.redraw(app, "grdCsrShregAlt");
		} else {
			if (ValueUtil.isNull(msStudId)) {
				return false;
			}else{
				doList(function(pbSuccess) {
					// 조회 : "조회되었습니다." header 메세지 표시
					if(pbSuccess) {
						moPage.parentSendMsg("lblTitleRptCsrShregAlt", NLS.INF.M024);
					}
				});
			}			
		}
	};

	/**
	 * @desc 학적변동/전과 조회
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 2. 26
	 */
	function doList(poCallBackFunc) {
		util.DataMap.setValue(app, "dmReqList", "strStudId", msStudId);
		util.DataMap.setValue(app, "dmReqList", "strKeyDate", msKeyDt);
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdCsrShregAlt");
				util.Control.redraw(app, "lblRowCnt_rptCsrShregAlt");
			}
			// 조회 후 콜백함수 수행
			if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
		});
	};

	/**
	 * @desc 부모 헤더에 메세지 뿌리기
	 * @param psCtrlId 
	 * @param psMsgCode 
	 * @return void
	 * @author Choi In Seong 2016. 3. 23
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
	 * @author Choi In Seong 2016. 3. 23
	 */
	function doCheckDataChange() {
		if(util.Grid.isModified(app, ["grdCsrShregAlt"], "CRM") ){
			return false;
		}else{
			return true;
		}
	};
	
	/**
	 * @desc 학적변동처리 용 리피트 사이즈 변경
	 * @param 
	 * @return boolean 변경여부
	 * @author	 Choi In Seong 2016. 10. 11.
	 */
	function doSizeAlt(){
		util.Control.setStyleAttr(app, "grp_rptCsrShregAlt" , "border-width", 0);
		util.Control.setStyleAttr(app, "grp_rptCsrShregAlt" , "border-style", "none");
		util.Control.setStyleAttr(app, "grp_rptCsrShregAlt" , "width", 496);
		util.Control.setStyleAttr(app, "grp_rptCsrShregAlt" , "height", 142);
		
		util.Control.setStyleAttr(app, "lblTitleRptCsrShregAlt" , "left", 0);
		util.Control.setStyleAttr(app, "lblTitleRptCsrShregAlt" , "top", 0);
		
		util.Control.setStyleAttr(app, "rptCsrShregAlt" , "left", 0);
		util.Control.setStyleAttr(app, "rptCsrShregAlt" , "top", 25);
		util.Control.setStyleAttr(app, "rptCsrShregAlt" , "width", 495);
		util.Control.setStyleAttr(app, "rptCsrShregAlt" , "height", 111);
		util.Control.setStyleAttr(app, "lblRowCnt_rptCsrShregAlt" , "left", 440);
		util.Control.setStyleAttr(app, "lblRowCnt_rptCsrShregAlt" , "top", 0);
		
	};

	/**
	 * @desc 리피트 초기화
	 * @param 
	 * @return boolean 변경여부
	 * @author	 Choi In Seong 2016. 10. 11.
	 */
	function doDataClear() {
		util.Control.reset(app, ["rptCsrShregAlt"]);
	};
	
	/**
	 * @desc 학적변동/전과 조회
	 * @param 
	 * @return void
	 * @author	 Choi In Seong 2016. 10. 11.
	 */
	function doListAlt(poCallBackFunc) {
		var voAltObj = moPage.parent.moParentObj;		
		
		util.DataMap.setValue(app, "dmReqList", "strStudId", voAltObj.strStudId);
		util.DataMap.setValue(app, "dmReqList", "strKeyDate", voAltObj.strAltDt);
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdCsrShregAlt");
				util.Control.redraw(app, "lblRowCnt_rptCsrShregAlt");
			}
			// 조회 후 콜백함수 수행
			if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
		});
	};
	
	return moPage;
};

