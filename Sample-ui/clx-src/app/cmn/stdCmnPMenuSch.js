var util = new ComUtil(app);
/******************************************************************************
 * 부모 페이지에서 받아온 기본값을 받는 객체
 * 내부적으로 Result라는 객체를 가지고 있으며, 부모에 넘겨줄 결과값을 저장
 * @member moStdCmnPMenuSch
 ******************************************************************************/	
//var moStdCmnPMenuSch = {
//	// 팝업 작동 내부사용
//	controlId : "",
//	openedByChange : false,
//	
//	// 검색어 기본값 지정
//	strSystemRcd : "",
//	strMenuId : "",
//	strMenuNm : "",
//	strPgmDtlTypeRcd : "",
//	
//	// 선택열 결과 리턴
//	Result : {
//		UNIT_SYSTEM_RCD : "", // 단위시스템구분
//		MENU_ID : "",                // 메뉴ID
//		MENU_NM : ""               // 메뉴명
//	}
//};

/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	//리피트 초기 설정
//	ExtRepeat.init(["rptCmnMenu"]);
	//검색조건 초기 설정
//	ExtGroup.initSearchBox("grpSearch", "grpData");
	
	//부모창에서 전달한 값을 받는다.
	doParentGet();
	
	//서브미션 실행 (실패시 cover page)
	util.Submit.send(app, "subOnLoad", function(pbSuccess){
		if(pbSuccess){
			// 시스템구분 첫번째 셋팅
			util.Control.redraw(app, ["cbbUnitSystemRcd"]);
			
			// 메뉴ID/명 컨트롤 포커스
			if(util.Grid.getRowCount(app, "dsCmnMenu") == 0){
				util.Control.setFocus(app, "ipbMenuId");
			}
			
			// 조건값이 둘 중 하나만 있어도 바로 자동 조회를 한다.
			if (util.Control.getValue(app, "cbbUnitSystemRcd") != "" || util.Control.getValue(app, "ipbMenuId") != "") {
				/**@type cpr.controls.Button*/
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
	var voStdCmnPMenuSch =  app.getHostProperty("initValue");
			
	// 파라미터  값복사 (deep copy)
//	for (var key in voStdCmnPMenuSch) {
//		if (key == "Result") {
//			// 결과 값은 복사하지 않음.
//			continue;
//		}
//		moStdCmnPMenuSch [key] = voStdCmnPMenuSch [key];
//	}
	// 팝업이 뜬후에는 false로 고침.
//	voStdCmnPMenuSch.openedByChange = false;
	
	// 파라미터 받아서 초기 검색조건 세팅.
	var voParam = voStdCmnPMenuSch;
	
	// 시스템구분
	if (voParam.strSystemRcd) {
		util.SelectCtl.setValue(app, "cbbUnitSystemRcd", voParam.strSystemRcd);
	}
	
	// 메뉴ID
	if (voParam.strMenuId) {
		util.Control.setValue(app, app, "ipbMenuId", voParam.strMenuId);
	}
	
	util.DataMap.setValue(app, "dmReqList", "strPgmDtlTypeRcd", voParam.strPgmDtlTypeRcd)
};



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
		/** @type udc.com.btnSearch*/
		var voBtnSearch = app.lookup("btnSearch");
		voBtnSearch.click();
	}
}

/*
 * "" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnSearchClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnSearch = e.control;
	doList(function(pbSuccess) {
		if (pbSuccess) {
			util.Msg.notify(app, "NLS-INF-M024");
		}
	});
}

/**
 * 조회버튼 이벤트(메뉴 목록을 조회한다.)
 * @param poCallBackFunc 콜백함수
 */
function doList(poCallBackFunc) {			
	// 조회 서브미션 호출
	util.Submit.send(app, "subList", function(pbSuccess){
		if(pbSuccess){
			// 메뉴목록 
			util.Control.redraw(app, "grpData");
			
			// 조회 후 콜백함수 수행
			if (util.isFunc(poCallBackFunc)) {
				poCallBackFunc(pbSuccess)
			}; 
		}
	});
}

/**
 * doCloseOk (선택닫기 이벤트시 호출) 	
 * @return void 
 */
function doCloseOk() {
	var vsSelectIndxs = util.Grid.getIndex(app, "grdCmnMenu");
	
	if(ValueUtil.isNull(vsSelectIndxs)){
		//선택된 데이터가 없습니다.
		util.Msg.warn("M008");
		return false;
	}

//	var voResult = moStdCmnPMenuSch.Result;
	var voResult = app.lookup("grdCmnMenu").getSelectedRow().getRowData();

//	var vnIdx = ExtRepeat.getIndex("rptCmnMenu");
//	voResult.UNIT_SYSTEM_RCD = ExtRepeat.getValue("rptCmnMenu", "rdCbbUnitSystemRcd", vnIdx);   //단위시스템코드
//	voResult.MENU_ID = ExtRepeat.getValue("rptCmnMenu", "rdOptMenuId", vnIdx);      //메뉴ID
//	voResult.MENU_NM = ExtRepeat.getValue("rptCmnMenu", "rdOptPgmNm", vnIdx);   //메뉴명
	
//	ExtPopUp.closeLayeredPopup("callbackStdCmnPMenuSch", moStdCmnPMenuSch);
	app.setHostProperty("returnValue", voResult);

	app.close();
}

/*
 * 그리드에서 row-dblclick 이벤트 발생 시 호출.
 * detail이 row를 더블클릭 한 경우 발생하는 이벤트.
 */
function onGrdCmnMenuRowDblclick(/* cpr.events.CGridEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grdCmnMenu = e.control;
	doCloseOk();
}

/*
 * "선택닫기" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnCloseOkClick(/* cpr.events.CMouseEvent */ e){
	/**  
	 * @type cpr.controls.Button
	 */
	var btnCloseOk = e.control;
	doCloseOk();
}

/*
 * "화면닫기" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnCloseClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnClose = e.control;
	app.close();
}
