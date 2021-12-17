//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
///<xtmlink path="./extCsrSCgdInfo.xtm"/>

var extCsrSCgdInfo = function() {

	var moPage = new Page();
	//임포트용 데이터 통신 오브젝트
	var moPObject = new PObject();

	var msStudId = "";
	
	/**
	 * @desc 서브페이지 임포트 온로드
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 3. 18
	 */
	moPage.onLoadImportDone_ImpSbpHeader = function() {
		doSbpHeaderOnLoad();
	}

	/**
	 * @desc 화면 온로드
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 3. 18
	 */
	moPage.onModelConstructDone_extCsrSCgdInfo = function() {
		//리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init("rptCgdRec");

		// 2. 검색조건 초기 설정
		//ExtGroup.initSearchBox("grpSearch", ["grpData"]);
		
		//서브미션 실행 (실패시 cover page)
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				
				util.Control.setValue(app, "cbbSchYearRcd", "");
				util.Control.setValue(app, "cbbSmtRcd", "");
				
				util.Control.redraw(app, ["cbbSchYearRcd","cbbSmtRcd"]);
				var voParentPage = ExtSubPage.getParent();
				
				// 부모멤버변수에담긴학번받음
				msStudId = moPage.parent.moParentObj.studId;
				if (ValueUtil.isNull(msStudId)) {
					util.Control.setEnable(app, false, ["btnSearch"]);
					return false;
				}else{
					//LIST CALL 
					util.Header.clickSearch(app);
				}
			}
		});
	}

	/**
	 * @desc 조회버튼 클릭
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 3. 18
	 */
	moPage.onClick_BtnSearch = function() {
		// 조회조건 필수 체크
		//if(!ValidUtil.check(["cbbSchYearRcd", "cbbSmtRcd"])){
		//	return false;
		//}
		
		
		
		doList(function(pbSuccess) {
			// 조회 : "조회되었습니다." header 메세지 표시
			if(pbSuccess) {
				moPage.parentSendMsg("lblTitleRptCgdRec", NLS.INF.M024);
			}
		});
		
	};

	/**
	 * @desc 성적정보조회
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 3. 18
	 */
	function doList(poCallBackFunc) {
		util.DataMap.setValue(app, "dmReqList", "strStudId", msStudId);

		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				//ExtRepeat.rebuild("rptCgdRec");
				util.Control.redraw(app, ["lblTitleRptCgdRec"]);
				page.onValueChanged_CbbSmtRcd();
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
	 * @author Choi In Seong 2016. 3. 18
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
	 * @author Choi In Seong 2016. 3. 18
	 */
	function doCheckDataChange() {
		if(util.Grid.isModified(app, ["grdCgdRec"], "CRM") ){
			return false;
		}else{
			return true;
		}
	};

	
	
	moPage.onValueChanged_CbbSmtRcd = function() {
		var vsSchYearRcd 	= util.DataMap.getValue(app, "dmReqList", "strSchYearRcd");
		var vsSmtRcd		= util.DataMap.getValue(app, "dmReqList", "strSmtRcd");
		var vsDelYn			= util.DataMap.getValue(app, "dmReqList", "strDelYn");
		
		var vsRptNodeSet = "/root/resList/rptCgdRecTemp/row";
		
		var vsDelYnNode 			= "";
		var vsSchYearRcdNode 	= "";
		var vsSmtRcdNode			= "";
		var vsNode = "";
		
		
		if("Y" != vsDelYn){
			vsDelYnNode = " DEL_YN = 'X' ";
		}
		
		if(vsSchYearRcd != ""){
			vsSchYearRcdNode = "SCH_YEAR_RCD = '"+vsSchYearRcd+"'";
		}
		
		if(vsSmtRcd != ""){
			vsSmtRcdNode = "SMT_RCD = '"+vsSmtRcd+"'";
		}
		
		if("" != vsSchYearRcdNode){
			if(vsRptNodeSet.indexOf("child") < 0){
				vsRptNodeSet = vsRptNodeSet+"[child::"+vsSchYearRcdNode;
			}else{
				vsRptNodeSet = vsRptNodeSet+" and "+vsSchYearRcdNode;
			}
		}
		
		if("" != vsSmtRcdNode){
			if(vsRptNodeSet.indexOf("child") < 0){
				vsRptNodeSet = vsRptNodeSet+"[child::"+vsSmtRcdNode;
			}else{
				vsRptNodeSet = vsRptNodeSet+" and "+vsSmtRcdNode;
			}
		}
		
		if("" != vsDelYnNode){
			if(vsRptNodeSet.indexOf("child") < 0){
				vsRptNodeSet = vsRptNodeSet+"[child::"+vsDelYnNode;
			}else{
				vsRptNodeSet = vsRptNodeSet+" and "+vsDelYnNode;
			}
		}
		
		if(vsRptNodeSet.indexOf("child") > 0){
			vsRptNodeSet = vsRptNodeSet+" ]";
		}
		
		
		var objRecNode = ExtInstance.getNodeListObj(vsRptNodeSet);		
		
		model.deleteChildNodes("/root/resList/rptCgdRec");
		
		
		ExtInstance.copyNodeListObj( "/root/resList/rptCgdRec", objRecNode );		
		
		util.Control.redraw(app, ["rptCgdRec"]);
		
		
		
	};
	return moPage;
};

