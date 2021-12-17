var util = new ComUtil(app);
/**
 * 우편번호검색팝업 관련 설정사항
 * 각 변수별 설명
 *  iXXX : 팝업으로 input 전달될 파라미터
 *  oXXX : 팝업에서 선택한 값을 받을 컬럼 아이디
 *  [IN]
 *   1. controlId					: (필수) 최초 이벤트의 버튼id
 *  [OUT]
 *  2. oZipCode					: 우편번호
 *  3. oZipSeq					: 우편일련번호
 *  4. oBdMno					: 건물번호
 *  5. oAddr						: 주소
 *  6. func						: 팝업에서 선택한 값을 받은 후 추가 로직이 필요한 경우 함수 작성
 * @member impStdCmnPZipSearch
 * @type Array
 * @author hyunteak at 15. 12. 09
 */ 
//moIdsForStdCmnPZipSearch = [
//	 { 
//		 controlId					: "btnFrfZipCode",		//(필수)우편번호검색
//		 oZipCode					: "ipbFrfZipcode",	//리턴 우편번호
//		 oZipSeq					: "ipbFrfZipseq",	//리턴 우편일련번호
//		 oBdMno					: "",	//리턴 우편일련번호
//		 oAddr						: "optFrfAddr1",		//리턴 주소
//		 oAddrDtl					: "ipbFrfAddr2",		//리턴 주소
//		 func : function(poParam){
//
//		 }
//	 }
// ];	

/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	//리피트 초기 설정
//	ExtRepeat.init("rptCmnPartyOutside");
	//검색조건 초기 설정
//	ExtGroup.initSearchBox("grpSearch", "grpData");

	//DataSet Info 설정 및 IgnoreReqPk = Y 설정.	
//	ExtRepeat.addOriginCol("rptCmnPartyOutside", ["SSN"]);
	
	
	//서브미션 실행 (실패시 cover page)
	util.Submit.send(app, "subOnLoad", function(pbSuccess){
		if(pbSuccess) {
			util.Control.setFocus(app, "ipbUserNm");
			util.Control.redraw(app, ["grpCmnPartyOutside"]);
		}
	}, true);
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
	
	//그리드 변경여부 체크
	if(util.Grid.isModified(app, "grdCmnPartyOutside", "CRM")) return false;
	
	//조회조건 필수값 체크
	if(!util.validate(app, ["grpSearch"])) return false;
	
	doList(function(pbSuccess){
		if(pbSuccess){
			//조회되었습니다.
			util.Msg.notify(app, "NLS-INF-M024");
		};
	});
};

/**
 * doList  외부사용자목록을 조회한다.  
 * @param {Function} poCallBackFunc 콜백정의
 * @return void
 */
function doList(poCallBackFunc) {
	util.Submit.send(app, "subList", function(pbSuccess){
		if(pbSuccess) {
			util.Control.redraw(app, ["grdCmnPartyOutside"]);
			
			//expression binding으로 설정.
//			var vnCnt = util.Grid.getRowCount("grdCmnPartyOutside");
//			if(vnCnt < 1) {
//				util.Control.reset(["grpCmnPartyOutside"]);
//				util.Control.setEnable(false, ["grpCmnPartyOutside"]);
//			};
			
			// 조회 후 콜백함수 수행
			if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
		};
	}, true);
};

/*
 * 그리드에서 selection-change 이벤트 발생 시 호출.
 * detail의 cell 클릭하여 설정된 selectionunit에 해당되는 단위가 선택될 때 발생하는 이벤트.
 */
function onGrdCmnPartyOutsideSelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grdCmnPartyOutside = e.control;
//	doSelectRptCmnPartyOutside();
};

/**
 * expression binding으로 설정.
 */
//function doSelectRptCmnPartyOutside() {
//	var vnIdx = util.Grid.getIndex("grdCmnPartyOutside");
	// 프리폼 활성화 비활성화 제어 -> expression binding
//	doCompareFrfEnable(vnIdx);
//	리피트 특정 row 데이터를 프리폼 copy -> 상대컬럼 binding
//	ExtRepeat.copyRowForm("rptCmnPartyOutside", "frfCmnPartyOutside", vnIndex);
//};

///**
// * @desc 셀렉트 여부에 따라 프리폼 활성화 제어
// * @param {Number} pnIndex 
// * @return void
// * @author 최동원 2018. 04. 10.
// */
//function doCompareFrfEnable(pnIdx) {
//	if( ValueUtil.isNull(pnIdx) || !util.Control.isEnable("grdCmnPartyOutside") 
//			|| util.Grid.getRowState("grdCmnPartyOutside", pnIdx) == cpr.data.tabledata.RowState.DELETED) {
//		util.Control.setEnable(false, ["grpCmnPartyOutside"]);
//	}else{
//		util.Control.setEnable(true, ["grpCmnPartyOutside"]);
//	};
//};

/*
 * 사용자 정의 컨트롤에서 insert 이벤트 발생 시 호출.
 */
function onGrid_ids_btn1Insert(/* cpr.event.CUIEvent */ e){
	/** 
	 * @type udc.com.grid_IDS_Btn
	 */
	var grid_ids_btn1 = e.control;
	
	util.Control.setFocus(app, "ipbFrfOtsId");
}

/*
 * 사용자 정의 컨트롤에서 save 이벤트 발생 시 호출.
 */
function onGrid_ids_btn1Save(/* cpr.event.CUIEvent */ e){
	/** 
	 * @type udc.com.grid_IDS_Btn
	 */
	var grid_ids_btn1 = e.control;
	doSave();
};

/**
 * @desc  [외부사용자목록] 작업저장 click event 
 * @param {Function} poCallBackFunc 콜백정의
 * @return void
 * @author 최동원 2018. 04. 10.
 */
function doSave() {
	//그리드 변경사항 체크
	if( !util.Grid.isModified(app, ["grdCmnPartyOutside"], "MSG") ) return false;
	
	//그리드 validation check
	if( !util.validate(app, "grdCmnPartyOutside") ) return false;
	
	util.Submit.send(app, "subSave", function(pbSuccess){
		if(pbSuccess) {
			doList(function(pbListSuccess){
				if(pbListSuccess) {
					util.Msg.notify(app, "NLS-INF-M025");
				};
			});
		};
	}, false);
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
		/** @type udc.com.btnSearch*/	
		var btnSearch = app.lookup("btnSearch");
		btnSearch.click();
	}
}

/*
 * 사용자 정의 컨트롤에서 idrCommonEvent 이벤트 발생 시 호출.
 */
function onGrid_ids_btn1IdrCommonEvent(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type udc.com.grid_IDS_Btn
	 */
	var grid_ids_btn1 = e.control;
	util.Control.redraw(app, "grpCmnPartyOutside");
}
