var util = new ComUtil(app);
/******************************************************************************
 * 부모 페이지에서 받아온 기본값을 받는 객체
 * 내부적으로 Result라는 객체를 가지고 있으며, 부모에 넘겨줄 결과값을 저장
 * @member moStdCmnPOuterUserSch
 ******************************************************************************/	
//var moStdCmnPOuterUserSch = {
//	// 팝업 작동 내부사용
//	controlId : "",
//	openedByChange : false,
//	strUserId		: "", 		//사용자ID 
//	strUserNm		: "",		//사용자명
//	
//	// 선택열 결과 리턴
//	result : {
//		OTS_ID : "",
//		SSN : "",
//		KOR_NM : "",
//		ENG_NM : "",
//		CHA_NM : "",
//		GENDER_RCD : "",
//		BIRTHDAY : "",
//		LNR_SLR_DIV_RCD : "",
//		EMAIL : "",
//		CLP_NO : "",
//		ZIPCODE : "",
//		ZIPSEQ : "",
//		ADDR1 : "",
//		ADDR2 : "",
//		HOME_TEL_NO : "",
//		NAT_RCD : ""
//	}
//};

/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	// app headr - initSearchBox()
	//리피트 초기 설정
//	ExtRepeat.init(["rptCmnPartyOutside"]);
	//검색조건 초기 설정
//	ExtGroup.initSearchBox("grpSearch", "grpData");
					
	//서브미션 실행 (실패시 cover page)
	util.Submit.send(app, "subOnLoad", function(pbSuccess){
		if(pbSuccess){
			// 사용자ID 컨트롤 포커스
//			util.Control.setFocus("ipbUserId");			
			
			//부모창에서 전달한 값을 받는다.
			doParentGet();
			
			var initValue = app.getHostProperty("initValue"); 
			// 조건값이 둘 중 하나만 있어도 바로 자동 조회를 한다.
			if (app.lookup("ipbUserId").value != "" || app.lookup("ipbUserNm").value != "") {
				/**@type cpr.controls.Button*/
				var vcBtnSearch = app.lookup("btnSearch");
				vcBtnSearch.click();
			}
		}
	},true);
}

/**
 * 호출한 페이지에서 파라미터 받기
 */
function doParentGet() {
	// 호출한 페이지에서 파라미터 받기.													
//	var voStdCmnPOuterUserSch =  ExtPopUp.getParentVal("moStdCmnPOuterUserSch");
	var voStdCmnPOuterUserSch = app.getHostProperty("initValue");
			
//	// 파라미터  값복사 (deep copy)
//	for (var key in voStdCmnPOuterUserSch) {
//		if (key == "result") {
//			// 결과 값은 복사하지 않음.
//			continue;
//		}
//		moStdCmnPOuterUserSch [key] = voStdCmnPOuterUserSch [key];
//	}
	// 팝업이 뜬후에는 false로 고침.
//	voStdCmnPOuterUserSch.openedByChange = false;
	
	// 파라미터 받아서 초기 검색조건 세팅.
//	var voParam = moStdCmnPOuterUserSch;
	var voParam = voStdCmnPOuterUserSch;
	
	// 사용자ID
	if (voParam.strUserId) {
		util.Control.setValue(app, app, "ipbUserId", voParam.strUserId);
	}
	
	// 사용자명
	if (voParam.strUserNm) {
		util.Control.setValue(app, app, "ipbUserNm", voParam.strUserNm);
	}
}

/**
 * 조회버튼 이벤트(외부인 목록을 조회한다.)
 * @param poCallBackFunc 콜백함수
 */
function doList(poCallBackFunc) {			
	// 조회 서브미션 호출
	util.Submit.send(app, "subList", function(pbSuccess){		
		if(pbSuccess){
			// 사용자목록
			util.Control.redraw(app, "grdCmnPartyOutside"); 
			
			// 조회 후 콜백함수 수행
			if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess); 
		}
	}, true);
}

/**
 * @desc  doCloseOk (선택닫기 이벤트시 호출) 	
 * @return void 
 * @author Kim Bora 2015. 11. 27.
 */
function doCloseOk() {
	var vsSelectIndxs = util.Grid.getCheckOrSelectedRowIndex(app, "grdCmnPartyOutside");
	
	if(ValueUtil.isNull(vsSelectIndxs)){
		//선택된 데이터가 없습니다.
		util.Msg.warn("M008");
		return false;
	}

//	var voResult = moStdCmnPOuterUserSch.result;
	var voResult = app.lookup("grdCmnPartyOutside").getSelectedRow().getRowData();
	
//	var vnIdx = ExtRepeat.getIndex("rptCmnPartyOutside");
//	
//	voResult.OTS_ID = ExtRepeat.getValue("rptCmnPartyOutside", "rdOptOtsId", vnIdx);                 // 외부인ID
//    voResult.SSN = ExtRepeat.getValue("rptCmnPartyOutside", "rdOptSsn", vnIdx);                       // 사회보장번호
//	voResult.KOR_NM = ExtRepeat.getValue("rptCmnPartyOutside", "rdOptKorNm", vnIdx);            // 한글명
//	voResult.ENG_NM = ExtRepeat.getValue("rptCmnPartyOutside", "rdOptEngNm", vnIdx);           // 영문명 
//	voResult.CHA_NM = ExtRepeat.getValue("rptCmnPartyOutside", "rdOptChaNm", vnIdx);           // 한자명
//	voResult.GENDER_RCD = ExtRepeat.getValue("rptCmnPartyOutside", "rdCbbGenderRcd", vnIdx);   // 성별코드
//	voResult.BIRTHDAY = ExtRepeat.getValue("rptCmnPartyOutside", "rdOptBirthday", vnIdx);       // 생년월일
//	voResult.LNR_SLR_DIV_RCD = ExtRepeat.getValue("rptCmnPartyOutside", "rdCbbLnrSlrDivRcd", vnIdx);   // 음양력구분코드
//	voResult.EMAIL = ExtRepeat.getValue("rptCmnPartyOutside", "rdOptEmail", vnIdx);       // 이메일
//	voResult.CLP_NO = ExtRepeat.getValue("rptCmnPartyOutside", "rdOptClpNo", vnIdx);   // 휴대전화번호
//	voResult.ZIPCODE = ExtRepeat.getValue("rptCmnPartyOutside", "rdOptZipcode", vnIdx);   // 우편번호
//	voResult.ZIPSEQ = ExtRepeat.getValue("rptCmnPartyOutside", "rdOptZipSeq", vnIdx);   // 우편번호일련번호
//	voResult.ADDR1 = ExtRepeat.getValue("rptCmnPartyOutside", "rdOptAddr1", vnIdx);      // 주소1
//	voResult.ADDR2 = ExtRepeat.getValue("rptCmnPartyOutside", "rdOptAddr2", vnIdx);      // 주소2
//	voResult.HOME_TEL_NO = ExtRepeat.getValue("rptCmnPartyOutside", "rdOptHomeTelNo", vnIdx);   // 자택전화번호
//	voResult.NAT_RCD = ExtRepeat.getValue("rptCmnPartyOutside", "rdCbbNatRcd", vnIdx);   // 국가코드
	
	// 팝업닫기 후 콜백메소드호출
//	ExtPopUp.closeLayeredPopup("callbackStdCmnPOuterUserSch", moStdCmnPOuterUserSch);
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
	if(e.keyCode ==  cpr.events.KeyCode.ENTER){		
		var vcBtnSearch = app.lookup("btnSearch");
		vcBtnSearch.click();
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
		if (pbSuccess) 
			util.Msg.notify(app, "NLS-INF-M024");
	});
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
	app.close();
}

/*
 * "" 버튼에서 click 이벤트 발생 시 호출.
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
 * 그리드에서 row-dblclick 이벤트 발생 시 호출.
 * detail이 row를 더블클릭 한 경우 발생하는 이벤트.
 */
function onGrdCmnPartyOutsideRowDblclick(/* cpr.events.CGridEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grdCmnPartyOutside = e.control;
	doCloseOk();
}
