var util = new ComUtil(app);

/******************************************************************************
 * 부모 페이지에서 받아온 기본값을 받는 객체
 * 내부적으로 Result라는 객체를 가지고 있으며, 부모에 넘겨줄 결과값을 저장
 * @member moStdCmnPMenuSch
 ******************************************************************************/	
//var moStdCmnPUserSch = {
//	// 팝업 작동 내부사용
//	controlId 		: "",
//	openedByChange 	: false,
//	strKeyDate   	: "",   //기준일자(유효시작일과 종료일) 생략가능, dafault : 현재일자
//	strUseYn   		: "", 	//사용여부  - 생략가능, default : "Y"
//	strUserId		: "", 	//사용자ID 
//	strUserNm		: "",	//사용자명
//	strUserDivRcd	: "",   //사용자구분
//	// 선택열 결과 리턴
//	result : {
//		USER_DIV_RCD: "",
//		USER_ID		: "",
//		USER_NM 	: "",
//		STAT_CD 	: "",
//		STAT_NM 	: "",
//		DEPT_CD 	: "",
//		DEPT_NM 	: "",
//		ID 			: "",
//		SSN 		: "",
//		PARTY_ID 	: ""
//	}
//};
/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	//app header - initSearchBox()
	//리피트 초기 설정
//	ExtRepeat.init(["rptCmnUseUser"]);
	//검색조건 초기 설정
//	ExtGroup.initSearchBox("grpSearch", "grpData");

	//서브미션 실행 (실패시 cover page)
	util.Submit.send(app, "subOnLoad", function(pbSuccess){
		if(pbSuccess){
			// 사용자구분 콤보박스 rebuild
			util.Control.redraw(app, ["cbbUserDivRcd"]);
			
			// 사용자ID 컨트롤 포커스
			util.Control.setFocus(app, "ipbUserId");
			
			//부모창에서 전달한 값을 받는다.
			doParentGet();
			
			// 조건값이 둘 중 하나만 있어도 바로 자동 조회를 한다.
			if (util.Control.getValue(app, "ipbUserId") != "" || util.Control.getValue(app, "ipbUserNm") != "") {
				/** @type cpr.controls.Button*/
				var voBtnSearch = app.lookup("btnSearch");
				voBtnSearch.click();
			}
		}
	}, true);
	
}

/**
 * 호출한 페이지에서 파라미터 받기
 */
function doParentGet() {
	// 호출한 페이지에서 파라미터 받기.												
	var voStdCmnPUserSch = app.getHostProperty("initValue");
			
	// 파라미터  값복사 (deep copy)
//	for (var key in voStdCmnPUserSch) {
//		if (key == "result") {
//			// 결과 값은 복사하지 않음.
//			continue;
//		}
//		moStdCmnPUserSch [key] = voStdCmnPUserSch [key];
//	}
	// 팝업이 뜬후에는 false로 고침.
//	voStdCmnPUserSch.openedByChange = false;
	
	// 파라미터 받아서 초기 검색조건 세팅.
	var voParam = voStdCmnPUserSch;
	
	// 사용자구분 => 값이 있는 경우 사용자구분콤보박스 disable처리한다.
	var vsUserDivRcd = ValueUtil.fixNull(voParam.strUserDivRcd);
	if (vsUserDivRcd != "") {
		util.SelectCtl.setValue(app, "cbbUserDivRcd", voParam.strUserDivRcd);
		util.Control.setEnable(app, false, "cbbUserDivRcd");
	}

	// 사용자ID
	if (voParam.strUserId) {
		util.Control.setValue(app, app, "ipbUserId", voParam.strUserId);
	}
	
	// 사용자명
	if (voParam.strUserNm) {
		util.Control.setValue(app, app, "ipbUserNm", voParam.strUserNm);
	}
	
	// 기준일자
	if (voParam.strKeyDate) {
		util.DataMap.setValue(app, "dmReqList", "strKeyDate", voParam.strKeyDate);
	}
	
	// 사용여부
	if (voParam.strUseYn) {
		util.DataMap.setValue(app, "dmReqList", "strUseYn", voParam.strUseYn);
	}
}

/**
 * 조회버튼 이벤트(사용자 목록을 조회한다.)
 * @param poCallBackFunc 콜백함수
 */
function doList(poCallBackFunc) {		
	// 조회 서브미션 호출
	util.Submit.send(app, "subList", function(pbSuccess){
		if(pbSuccess){
			// 사용자목록 
			util.Control.redraw(app, "grpData");
			
			if(util.Grid.getRowCount(app, "grdCmnUseUser") == 0){
				util.Control.setFocus(app, "ipbUserId");
			}else {
				util.Control.setFocus(app, "grdCmnUseUser");
			}
			
			// 조회 후 콜백함수 수행
			if (util.isFunc(poCallBackFunc)) {
				poCallBackFunc(pbSuccess);
				
			} 
		}
	});
}

/**
 * doCloseOk (선택닫기 이벤트시 호출) 	
 * @return void 
 */
function doCloseOk() {
	var vsSelectIndxs = util.Grid.getCheckOrSelectedRowIndex(app, "grdCmnUseUser");
	
	if(ValueUtil.isNull(vsSelectIndxs)){
		//선택된 데이터가 없습니다.
		util.Msg.warn("M008");
		return false;
	}

//	var voResult = moStdCmnPUserSch.result;
	var voResult = app.lookup("grdCmnUseUser").getSelectedRow().getRowData();
	
//	voResult.USER_DIV_RCD = util.Grid.getCellValue("grdCmnUseUser", "rdOptUserDivRcd");	//사용자구분코드
//	voResult.USER_ID = util.Grid.getCellValue("grdCmnUseUser", "rdOptUserId");     		//사용자ID
//	voResult.USER_NM = util.Grid.getCellValue("grdCmnUseUser", "rdOptUserNm");   		//사용자명
//	voResult.STAT_CD = util.Grid.getCellValue("grdCmnUseUser", "rdOptStatCd");     		// 상태코드
//	voResult.STAT_NM = util.Grid.getCellValue("grdCmnUseUser", "rdOptStatNm");    		//상태명
//	voResult.DEPT_CD = util.Grid.getCellValue("grdCmnUseUser", "rdOptDeptCd");    		//부서코드
//	voResult.DEPT_NM = util.Grid.getCellValue("grdCmnUseUser", "rdOptDeptNm");   		//부서명
//	voResult.ID = util.Grid.getCellValue("grdCmnUseUser", "rdOptId");                   //오브젝트번호
//	voResult.SSN = util.Grid.getCellValue("grdCmnUseUser", "rdOptSsn");               	//주민번호
//	voResult.PARTY_ID = util.Grid.getCellValue("grdCmnUseUser", "rdOptPartyId");    	//외부인ID
	
	// 팝업닫기 후 콜백메소드호출
	//ExtPopUp.closeLayeredPopup("callbackStdCmnPUserSch", moStdCmnPUserSch);
	app.setHostProperty("returnValue", voResult);
	
	app.close();
}

/*
 * 그룹에서 keydown 이벤트 발생 시 호출.
 * 사용자가 키를 누를 때 발생하는 이벤트.
 */
function onGrpSearchKeydown(/* cpr.events.CKeyboardEvent */ e){
	/** 
	 * @type cpr.controls.Container
	 */
	var grpSearch = e.control;
	if(e.keyCode == cpr.events.KeyCode.ENTER){
		/** @type cpr.controls.Button*/
		var voBtnSearch = app.lookup("btnSearch");
		voBtnSearch.click();
	}
}

/*
 * 사용자 정의 컨트롤에서 search 이벤트 발생 시 호출.
 */
function onBtnSearchSearch(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type udc.com.btnSearch
	 */
	var btnSearch = e.control;
	if(util.Grid.isModified(app, "grdCmnUseUser", "CRM")){
		e.stopImmediatePropagation();
		return false;
	}
	// 1. 조회조건 필수 체크 : 사용자ID, 사용자명 중 하나는 필수
	var vsUserId = ValueUtil.fixNull(util.Control.getValue(app, "ipbUserId"));
	var vsUserNm = ValueUtil.fixNull(util.Control.getValue(app, "ipbUserNm"));
	
	if (vsUserId == "" && vsUserNm == "") {
		util.Msg.alert("NLS-CMM-M016", ["사용자ID, 사용자명"]);
		e.stopImmediatePropagation();
		return false;
	}
	
	doList(function(pbSuccess) {
		if (pbSuccess) {
			util.Msg.notify(app, "NLS-INF-M024");
		}
	});
}

/*
 * 그리드에서 row-dblclick 이벤트 발생 시 호출.
 * detail이 row를 더블클릭 한 경우 발생하는 이벤트.
 */
function onGrdCmnUseUserRowDblclick(/* cpr.events.CGridEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grdCmnUseUser = e.control;
	doCloseOk();
}

/*
 * "" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnCloseClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnClose = e.control;
	doCloseOk();
}

/*
 * "" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnCloseClick2(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnClose = e.control;
	app.close();
}
