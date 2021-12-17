var util = new ComUtil(app);
var moObjDivRcdName = {};
				
var moLanDivRcdName = {};

//var moStdCmnPNat = {
//	// 팝업 작동 내부사용
//	controlId : null,		// 팝업을 호출한 아이디
//	openedByChange : false,		// 값 변경에 의한 호출 여부
//	
//	strLanDivRcd : "",		// 언어키
//	strNatNm : "",		// 국가명
//	
//	// 선택가능 범위를 제한함.
//	// 검색어 기본값 지정
//	result : {
//		NAT_CD : "",	//국가코드
//		NAT_NM : "",		//국가명
//		KEDI_CODE : ""		//KEDI 국가코드
//	}
//};
/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
//	ExtRepeat.init("rptCmnNat");
//	//검색조건 초기 설정
//	ExtGroup.initSearchBox("grpSearch", "grp_rptCmnNat");
	
	// 호출한 페이지에서 파라미터 받기.													
//	var voStdCmnPNatSch =  ExtPopUp.getParentVal("moStdCmnPNat");
//	var voStdCmnPNatSch = util.getApp().getHostProperty("initValue");
			
	// 파라미터  값복사 (deep copy)
//	for (var key in voStdCmnPNatSch) {
//		if (key == "result") {
//			// 결과 값은 복사하지 않음.
//			continue;
//		}
//		moStdCmnPNat [key] = voStdCmnPNatSch [key];
//	}
	// 팝업이 뜬후에는 false로 고침.
//	voStdCmnPNatSch.openedByChange = false;
	
	// 파라미터 받아서 초기 검색조건 세팅.
//	var voParam = moStdCmnPNat;
	var voParam = app.getHostProperty("initValue");

	// 서브미션 호출
	util.Submit.send(app, "subOnLoad", function(pbSuccess){
		if (pbSuccess) {	
//			ExtControl.refresh(["cbbLanDivRcd"]);
			util.Control.redraw(app, "cbbLanDivRcd");
			
			if (voParam) {
				// 언어키
				if (voParam.strLanDivRcd) {
//					ExtControl.setValue("cbbLanDivRcd",voParam.strLanDivRcd);
					util.Control.setValue(app, app, "cbbLanDivRcd", voParam.strLanDivRcd);
				}
				// 국가명
				if (voParam.strNatNm) {
					util.Control.setValue(app, app, "ipbNatNm", voParam.strNatNm);
				}
				
			}
			// 검색어가 입력되어 있는 경우 바로 검색 실행
			if (voParam.strNatNm != "") {
				// 검색 실행.
				/**@type cpr.controls.Button */
				var voBtnSearch = app.lookup("btnSearch");
				voBtnSearch.click();
			}
		} 
	}, true);
}


/**
 * doList (검색탭 조회) 	
 * @return void
 */
function doList() {
	//조회 
	util.Submit.send(app, "subList", function(pbSuccess){
		if(pbSuccess){
			util.Control.redraw(app, "grdCmnNat");
			util.Msg.notify(app, "NLS-INF-M024");
		}
	});
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
		/** @type cpr.controls.Button*/
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
	if(!util.validate(app, ["ipbNatNm","cbbLanDivRcd"])) return false;
	
	doList();
}

/**
 * doCloseOk (선택닫기 이벤트시 호출) 	
 * @return void
 */
function doCloseOk() {
//	var voResult = moStdCmnPNat.result;
	var vsSelectIndxs = util.Grid.getCheckOrSelectedRowIndex(app, "grdCmnNat");
	if(ValueUtil.isNull(vsSelectIndxs)){
		//선택된 데이터가 없습니다.
		util.Msg.notify(app, "M008");
		return false;
	}
	
	var voResult = app.lookup("grdCmnNat").getSelectedRow().getRowData();

//	var vnIdx = ExtRepeat.getIndex("rptCmnNat");
//		
//	voResult.NAT_CD = ExtRepeat.getValue("rptCmnNat"  , "rdOptCd"      , vnIdx);       //국가코드
//	voResult.NAT_NM = ExtRepeat.getValue("rptCmnNat" , "rdOptCdNm" , vnIdx);      //국가명
//	voResult.KEDI_CODE = ExtRepeat.getValue("rptCmnNat" , "rdOptCdPrp1" , vnIdx);      //KEDI 국가코드

//	ExtPopUp.closeLayeredPopup("callbackStdCmnPNatSch", moStdCmnPNat);
	app.setHostProperty("returnValue", voResult);
	app.close();
}

/*
 * 그리드에서 row-dblclick 이벤트 발생 시 호출.
 * detail이 row를 더블클릭 한 경우 발생하는 이벤트.
 */
function onGrdCmnNatRowDblclick(/* cpr.events.CGridEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grdCmnNat = e.control;
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
function onBtnCloseCancelClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnCloseCancel = e.control;
	app.close();
}
