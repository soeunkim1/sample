var util = new ComUtil(app);

// 이전검색조건
var msOldDivRcd="";
var msOldClsRcd="";
var msOldReqClsRcd="";
var msOldAnncClsRcd="";
var msOldTabBtn="";

//개발요청, 개발공지 공통코드값 관리
var TAB = { 
	msTabMoveCdReq: "CM30104",   // 요청사항
	msTabMoveCdAnnc: "CM30105"  // 개발공지
}

var TAB_BTN = {
		// 개발공지
		tpcDevAnnc : "tabBtnDevAnnc"
		// 개발요청  
		,tpcDevReq : "tabBtnDevReq"
		// 개발표준
		,tpcDevStd : "tabBtnDevStd"
};	

/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){	
	msOldTabBtn=TAB_BTN.tpcDevAnnc;
	app.lookup(msOldTabBtn).style.addClass(cpr.ufc.Classes.SELECTED);
		
		//4. 서브미션 실행
	util.Submit.send(app, "subOnLoad", function(pbSuccess){
		if(pbSuccess){
			//조회 조건 redraw
			util.Control.redraw(app, ["cbbMenuDivRcd", "cbbClsDivRcd"]);
			//조회 조건 메뉴 콤보박스 : 요청사항으로 맵핑 
			util.SelectCtl.selectItem(app, "cbbMenuDivRcd", 0);
			//메뉴 콤보 박스에 따라 분류 콤보 박스 필터링.
			//util.SelectCtl.cascadeList("cbbMenuDivRcd", "cbbClsDivRcd", "UCD");
			
			//데이터맵 데이터 설정
			util.DataMap.setValue(app, "dmReqKey", "strReqRcd", Tab.msTabMoveCdAnnc);
			util.DataMap.setValue(app, "dmReqKey", "strAnncRcd", Tab.msTabMoveCdReq);
			
			/** @type udc.com.btnSearch*/
			var voBtnSearch = app.lookup("btnSearch");
			voBtnSearch.click();
		};
		
	}, false);
}

/**
 * 탭 변경 이벤트
 * @param {String} psCaseID 탭 ID
 * @return {boolean} 탭 변경 성공 여부 
 */
function doTabChange(psCaseId){
	//탭 아이디를 가져옵니다.
	var vsSelTabId = util.SelectCtl.getValue("cbbMenuDivRcd");
	
	//그리드 변경 사항 체크
	if(util.Grid.isModified(app, "grdCmnDevStd", "CRM")){
		return false;
	};
	
	//탭변경 후 처리 로직
	switch (psCaseId) {
		// 개발표준
		case TAB_BTN.tpcDevStd : {
			doSetTabBtn(msOldDivRcd, msOldClsRcd);
			break;
		}
		// 개발요청
		case TAB_BTN.tpcDevReq : {
			doSetTabBtn(TAB.msTabMoveCdReq, msOldReqClsRcd);
			break;
		}
		// 개발공지
		case TAB_BTN.tpcDevAnnc: {
			doSetTabBtn(TAB.msTabMoveCdAnnc, msOldAnncClsRcd);
			break;
		}
	}
	
	return true;
}

/**
 * 탭버튼 클릭 시 탭페이지에 맞게 콤보 박스 값 설정 및 재조회
 * @param {String} psOldMenuRcd 이전 메뉴코드
 * @param {String} psOldClsRcd 이전 분류코드
 * @return void
 */
function doSetTabBtn(psOldMenuRcd, psOldClsRcd){
	//필수 조회조건을 셋팅한다.
	util.SelectCtl.selectItem(app, "cbbMenuDivRcd", psOldMenuRcd);
	util.SelectCtl.setValue(app, "cbbClsDivRcd", psOldClsRcd);
	// 메뉴 콤보박스에 따라 분류 콤보박스 필터링은 selection-change 이벤트 핸들러에서 수행.
	
	//조회한다.
	doSearch();
}

/*
 * 콤보 박스에서 selection-change 이벤트 발생 시 호출.
 * ComboBox Item을 선택하여 선택된 값이 저장된 후에 발생하는 이벤트.
 */
function onCbbMenuDivRcdSelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.ComboBox
	 */
	var cbbMenuDivRcd = e.control;
	//메뉴콤보변경시 분류 콤보박스 필터링을 걸어준다.
	var vsMenuDivRcd = util.Control.getValue(app, "cbbMenuDivRcd");
	if(vsMenuDivRcd != ""){
		//분류된 콤보박스의 첫번째 아이템을 선택.
//해당 콤보박스 컨트롤의 fiterExp 속성으로 변경 필요...
		util.SelectCtl.cascadeList("cbbMenuDivRcd", "cbbClsDivRcd", "UCD");
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
	
	if(!util.validate(app, "grpSearch")) {
		return false;
	}
	
	if(util.Grid.isModified(app, "grdCmnDevStd", "CRM")){
		return false;
	}
	
	// 버튼 클릭 시 tabButton 클릭 이벤트를 통과하지 않으므로 수동으로 css 클래스 조정
	var vsMenuCd = util.DataMap.getValue(app, "dmReqKey", "strMenuDivRcd");
	var vcTabBtn = null;
	switch(vsMenuCd){
	case TAB.msTabMoveCdAnnc:
		vcTabBtn = app.lookup(TAB_BTN.tpcDevAnnc);
		break;
	case TAB.msTabMoveCdReq:
		vcTabBtn = app.lookup(TAB_BTN.tpcDevReq);
		break;
	default:
		vcTabBtn = app.lookup(TAB_BTN.tpcDevStd);
		break;
	}
	
	doSearch();
}

/**
 * 검색 버튼을 클릭합니다.
 */
function doSearch(){
	doList(function(pbSuccess){
		if(pbSuccess){
			util.Msg.notify(app, "NLS-INF-M024");
			util.Control.redraw(app, "grdCmnDevStd");
		}
	});
}

/**
 * 조건에 맞게 데이터를 조회합니다.
 * @param poCallBackFunc
 */
function doList(poCallBackFunc) {
	//컨트롤 설정 처리
	var vsMenuCd = util.DataMap.getValue(app, "dmReqKey", "strMenuDivRcd");

	switch(vsMenuCd){
	case TAB.msTabMoveCdAnnc:
		doSetCtlByList(vsMenuCd, "개발공지", false, false, true);
		doSetLabelNm("제목", "등록자", "공지내역", "공지예시");
		break;
	case TAB.msTabMoveCdReq:
		doSetCtlByList(vsMenuCd, "개발요청", false, true, false);
		doSetLabelNm("요청명", "요청자", "요청설명", "처리내용");
		break;
	default:
		doSetCtlByList(vsMenuCd, "개발표준", true, false, false);
		doSetLabelNm("제목", "등록자", "설명", "예제");
		break;
	}
	
	//서브미션 실행
	util.Submit.send(app, "subList", function(pbSuccess){
		if(pbSuccess){
			util.Control.redraw(app, "grpData");

			//조회 건수가 없는 경우 프리폼을 제어한다. (reset 및 disable처리)
			var vnCnt = util.Grid.getRowCount(app, "grdCmnDevStd");
			if(vnCnt == 0){
				util.Control.setEnable(app, false, ["frfCmnDevStd"]);
			}
			
			//조회 후 콜백 함수 수행
			if(util.isFunc(poCallBackFunc)){			
				poCallBackFunc(pbSuccess);
			}
		}
	});
	
}

/**
 * 조회에 따른 컨트롤을 속성을 변경한다.
 * @param {String} psMenuCd 메뉴코드
 * @param {String} psTitleGrdNm 그리드타이틀명
 * @param {Boolean} pbFrfCbbDevDivEnable 프리폼 콤보박스 컨트롤 Enable
 * @param {Boolean} pbFrfDtCtrlEnable 프리폼 처리일자, 등록일자 컨트롤 Visible
 * @param {Boolean} pbFrfRemarkEnable 프리폼 단위시스템 컨트롤 Visible
 * @return void
 */
function doSetCtlByList(psMenuCd, psTitleGrdNm, pbFrfCbbDevDivEnable, pbFrfDtCtrlEnable, pbFrfRemarkEnable){
	var vsSelBtnId = null;
	switch(psMenuCd){
		// 공지
		case TAB.msTabMoveCdAnnc :
			doSetGrdCol(true, false, false, false, 2);
			vsSelBtnId = TAB_BTN.tpcDevAnnc;
			msOldAnncClsRcd = util.DataMap.getValue(app, "dmReqKey","strDevClsRcd");
		break;
		// 요청
		case TAB.msTabMoveCdReq :
			doSetGrdCol(false, true, true, true, 1);
			vsSelBtnId = TAB_BTN.tpcDevReq;
			msOldReqClsRcd = util.DataMap.getValue(app, "dmReqKey","strDevClsRcd");
		break;
		default :
			doSetGrdCol(true, false, true, true, 1);
			vsSelBtnId = TAB_BTN.tpcDevStd;
			msOldDivRcd = util.DataMap.getValue(app, "dmReqKey","strMenuDivRcd");
			msOldClsRcd = util.DataMap.getValue(app, "dmReqKey","strDevClsRcd");
	};
	
	//tab버튼 클릭
	//util.Control.lookup(vsSelBtnId).click();
	//style 제거
	app.lookup(msOldTabBtn).style.removeClass(cpr.ufc.Classes.SELECTED);
	app.lookup(vsSelBtnId).style.addClass(cpr.ufc.Classes.SELECTED);
	
	msOldTabBtn = vsSelBtnId;

	//프리폼 콤보박스 컨트롤 enable
	util.Control.setEnable(app, pbFrfCbbDevDivEnable, "cbbFrfDevDivRcd");
	//프리폼 처리일자, 등록일자 컨트롤 visible
	util.Control.setVisible(app, pbFrfDtCtrlEnable, ["lblFrfChgDt", "dipFrfChgDt", "lblFrfRegDt", "optFrfRegDt"]);
	
	// 프리폼의 처리일자가 보여야할 경우 제목Width사이즈를 줄인다.
	/** @type cpr.controls.Container */
	var voFrfCmnDevStd = app.lookup("frfCmnDevStd");
	/** @type cpr.controls.InputBox */
	var voIpbFrfTitle = app.lookup("ipbFrfTitle");
	if(pbFrfDtCtrlEnable){
		voFrfCmnDevStd.updateConstraint(voIpbFrfTitle, {
			"colIndex": 1,
			"rowIndex": 1,
			"colSpan": 3,
			"rowSpan": 1
		});
	}else{
		voFrfCmnDevStd.updateConstraint(voIpbFrfTitle, {
			"colIndex": 1,
			"rowIndex": 1,
			"colSpan": 5,
			"rowSpan": 1
		});
	}
	
	// 프리폼 단위시스템 컨트롤 Visible
	util.Control.setVisible(app, pbFrfRemarkEnable, ["lblFrfRemark", "ipbFrfRemark"]);
}

/**
 * 조회에 따른 그리드 및 프리폼 컬럼에 대한 속성(Visible)을 변경한다.
 * @param {Boolean} pbGrdOptRegDtVisible [그리드] 등록일 
 * @param {Boolean} pbGrdCbbProcStatVisible [그리드] 처리구분
 * @param {Boolean} pbFrfLblDevExmVisible [프리폼] 예제 라벨 컨트롤
 * @param {Boolean} pbFrfTxtDevExmVisible [프리폼] 예제 textArea 컨트롤
 * @param {Number} pnFrfDevDescHSize [프리폼] 설명 컨트롤의 rowSpan
 * @return void
 */
function doSetGrdCol(pbGrdOptRegDtVisible, pbGrdCbbProcStatVisible, pbFrfLvlTxtDevExmVisible, pbFrfTxtDevExmVisible, pnFrfDevDescHSize){
	
	//1. 그리드 컬럼 속성변경
	if(pbGrdCbbProcStatVisible){
		util.Grid.showColumn(app, "grdCmnDevStd", "PROC_STAT", 68);
	}else{
		util.Grid.hideColumn(app, "grdCmnDevStd", "PROC_STAT");
	}
	
	
	// 2. 프리폼 컨트롤 속성변경
	// 2-1. 예제컨트롤 속성정의(라벨, textarea컨트롤)
	util.Control.setVisible(app, pbFrfLvlTxtDevExmVisible, ["lblFrfDevExm"]);
	util.Control.setVisible(app, pbFrfTxtDevExmVisible, ["txtFrfDevExm"]);
	// 2-2. 설명컨트롤 H사이즈
	/** @type cpr.controls.Container */
	var voFrfCmnDevStd = app.lookup("frfCmnDevStd");
	/** @type cpr.controls.TextArea */
	var voTxtFrfDevDesc = app.lookup("txtFrfDevDesc");
	voFrfCmnDevStd.updateConstraint(voTxtFrfDevDesc, {
		"colIndex": 1,
		"rowIndex": 3,
		"colSpan": 5,
		"rowSpan": pnFrfDevDescHSize
	});
}

/**
 * 조회에 따른 프리폼 라벨명을 변경한다.
 * @param {String} psTitleLabel 제목
 * @param {String} psRegTntLabel 등록자
 * @param {String} psDevDescLabel 설명
 * @param {String} psDevExmLabel 예제
 * @return void
 */
function doSetLabelNm(psTitleLabel, psRegTntLabel, psDevDescLabel, psDevExmLabel){
	util.Control.setValue(app, app, "lblFrfTitle", psTitleLabel); // 제목
	util.Control.setValue(app, app, "lblFrfRegTnt", psRegTntLabel);  // 등록자
	util.Control.setValue(app, app, "lblFrfDevDesc", psDevDescLabel);  // 설명
	util.Control.setValue(app, app, "lblFrfDevExm", psDevExmLabel); // 예제
}

/*
 * 사용자 정의 컨트롤에서 insert 이벤트 발생 시 호출.
 */
function onGrid_ids_btn1Insert(/* cpr.event.CUIEvent */ e){
	/** 
	 * @type udc.com.grid_IDS_Btn
	 */
	var grid_ids_btn = e.control;
	var vsMenuCd = util.DataMap.getValue(app, "dmReqKey", "strMenuDivRcd");
	var vsDevClsRdc = util.SelectCtl.getValue(app, "cbbClsDivRcd", 1);
	
	var vnRowIndex = util.Grid.getIndex(app, "grdCmnDevStd");
	
	util.Grid.setCellValue(app, "grdCmnDevStd", "DEV_DIV_RCD", vsMenuCd, vnRowIndex)
	util.Grid.setCellValue(app, "grdCmnDevStd", "DEV_CLS_RCD", vsDevClsRdc, vnRowIndex)
	util.Control.redraw(app, "grdCmnDevStd");
	
	util.Control.setEnable(app, false, "cbbFrfDevDivRcd");//그룹에서 enable이 풀리면서 같이 풀림.
	util.Control.setFocus(app, "cbbFrfDevClsRcd");
}

/*
 * 사용자 정의 컨트롤에서 delete 이벤트 발생 시 호출.
 */
function onGrid_ids_btn1Delete(/* cpr.event.CUIEvent */ e){
	/** 
	 * @type udc.com.grid_IDS_Btn
	 */
	var grid_ids_btn = e.control;
	
	if(util.Grid.getIndex(app, "grdCmnDevStd") != -1){
		doSelectGrdCmnDevStd();
	}else {
		util.Control.setEnable(app, false, "frfCmnDevStd");
	}
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
}

/*
 * 사용자 정의 컨트롤에서 restore 이벤트 발생 시 호출.
 */
function onGrid_ids_btn1Restore(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type udc.com.grid_IDS_Btn
	 */
	var grid_ids_btn1 = e.control;

	if(util.Grid.getIndex(app, "grdCmnDevStd") != -1){
		doSelectGrdCmnDevStd();
	}else {
		util.Control.setEnable(app, false, "frfCmnDevStd");
	}
}



/*
 * 그리드에서 selection-change 이벤트 발생 시 호출.
 * detail의 cell 클릭하여 설정된 selectionunit에 해당되는 단위가 선택될 때 발생하는 이벤트.
 */
function onGrdCmnDevStdSelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grdCmnDevStd = e.control;
	doSelectGrdCmnDevStd();
}

/**
 * 리피트 rowSelect시 수행.
 */
function doSelectGrdCmnDevStd(){
	// 그리드의 선택된 인덱스
	var vnIndex = util.Grid.getIndex(app, "grdCmnDevStd");
	// 프리폼 활성화 비활성화 제어
	doCompareGrpEnable(vnIndex);
	var vsRowStatus =  util.Grid.getRowState(app, "grdCmnDevStd", vnIndex);
	if(vsRowStatus == cpr.data.tabledata.RowState.INSERTED){
		util.Control.setEnable(app, false, "dipFrfChgDt");
	}else{
		util.Control.setEnable(app, true, "dipFrfChgDt");
	}
	
}

/**
 * 셀렉트 여부에 따라 프리폼 활성화 제어
 * @param {Number} pnIndex 선택된 인덱스
 */
function doCompareGrpEnable(pnIndex){	
	if(util.Grid.getIndex(app, "grdCmnDevStd") == -1 || util.Control.isEnable("grdCmnDevStd") == false
		|| util.Grid.getRowState(app, "grdCmnDevStd", pnIndex) == cpr.data.tabledata.RowState.DELETED){
		util.Control.setEnable(app, false, "frfCmnDevStd");
	}else {
		util.Control.setEnable(app, true, "frfCmnDevStd");
	}
}

/**
 * 그리드 데이터 저장.
 * @param poCallBackFunc
 * @returns {Boolean}
 */
function doSave(poCallBackFunc){
	if(!util.Grid.isModified(app, "grdCmnDevStd", "MSG")){
		return false;
	}
	
	if(!util.validate(app, "grdCmnDevStd")){
		return false;
	}
	
	util.Submit.send(app, "subSave", function(pbSuccess){
		if(pbSuccess){
			doList(function(pbListSuccess){
				if(pbListSuccess) {
					util.Msg.notify(app, "NLS-INF-M025");
				}
				
				if(util.isFunc(poCallBackFunc)) {
					poCallBackFunc(pbListSuccess);
				}
			});
		}
	});
	
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
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onTabBtnClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var tabBtn = e.control;
	
	// 선택되어 있는 탭을 다시 누르면 return
	if(msOldTabBtn == tabBtn.id){
		return false;
	}
	

	doTabChange(tabBtn.id);

//	style 변경을 '조회시 컨트롤 속성 변경'에서 한꺼번에 변경
//	util.Control.lookup(msOldTabBtn).style.removeClass(cpr.ufc.Classes.SELECTED);
//	tabBtn.style.addClass(cpr.ufc.Classes.SELECTED);
//
//	msOldTabBtn = tabBtn.id;
	
}





/*
 * 사용자 정의 컨트롤에서 upLoadCallBack 이벤트 발생 시 호출.
 */
function onCmnfileutil1UpLoadCallBack(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type udc.cmn.cmnFileUtil
	 */
	var cmnfileutil1 = e.control;
	util.Control.redraw(app, "optFrfFileCnt");
}
