//공통 모듈 사용
var util = new ComUtil(app);
/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad( /* cpr.events.CEvent */ e) {

	//서브미션 실행 (실패시 cover page)
	util.Submit.send(app, "subOnLoad", function(pbSuccess) {
		if (pbSuccess) {
			util.SelectCtl.setValue(app, "cbbLanDivRcd", util.getDefaultLocale(app));
			util.SelectCtl.selectItem(app, "cbbMsgDivRcd", 0);
			util.SelectCtl.selectItem(app, "cbbMsgSubDivRcd", 0);
			util.Control.redraw(app, ["cbbMsgDivRcd", "cbbMsgSubDivRcd", "cbbLanDivRcd"]);
		}
	}, true);
} //onBodyLoad()

/*
 * 그룹에서 keydown 이벤트 발생 시 호출.
 * 사용자가 키를 누를 때 발생하는 이벤트.
 */
function onGrpSearchKeydown( /* cpr.events.CKeyboardEvent */ e) {
	/** 
	 * @type cpr.controls.Container
	 */
	var grpSearch = e.control;
	if (e.keyCode == 13) {
		app.lookup("btnSearch").click();
	}
} //onGrpSearchKeydown()

/*
 * "" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnSearchClick( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btnSearch = e.control;
	// 데이터 변경상태 체크 메시지(기본, 임베디드 앱 존재 할 경우 isChangedFormData())
	if (util.Grid.isModified(app, "grdCmnMultiLang", "CRM")) {
		return false;
	}

	doList(function(pbSuccess) {
		// 조회 : "조회되었습니다." header 메세지 표시
		if (pbSuccess) {
			util.Msg.notify(app, "NLS-INF-M024");
		}
	});
} //onBtnSearchClick()

/**
 * @desc 조회 event
 * @param poCallBackFunc 조회 후 callback함수
 */
function doList(poCallBackFunc) {
	util.Submit.send(app, "subList", function(pbSuccess) {
		if (pbSuccess) {
			util.Control.redraw(app, "grdCmnMultiLang");
			if (util.isFunc(poCallBackFunc)) {
				poCallBackFunc(pbSuccess);
			}
		}
	}, true);
} //doList()

/*
 * 사용자 정의 컨트롤에서 insert 이벤트 발생 시 호출.
 */
function onGrdCmnMultiLang_titleInsert( /* cpr.event.CUIEvent */ e) {
	/** 
	 * @type udc.com.grid_IDS_Btn
	 */
	var grdCmnMultiLang_title = e.control;
	var vnIdx = util.Grid.getIndex(app, "grdCmnMultiLang");

	var vsMsgDivRcd = util.SelectCtl.getValue("cbbMsgDivRcd");
	var vsMsgSubDivRcd = util.SelectCtl.getValue("cbbMsgSubDivRcd");
	var vsLanDivRcd = util.SelectCtl.getValue("cbbLanDivRcd");
	
	//다국어구분 셋팅
	if (!ValueUtil.isNull(vsMsgDivRcd)) {
		util.Grid.setCellValue(app, "grdCmnMultiLang", "MSG_DIV_RCD", vsMsgDivRcd, vnIdx);
	}
	
	//다국어소구분 셋팅
	if (!ValueUtil.isNull(vsMsgSubDivRcd)) {
		util.Grid.setCellValue(app, "grdCmnMultiLang", "MSG_SUB_DIV_RCD", vsMsgSubDivRcd, vnIdx);
	}
	
	//언어구분 셋팅
	if (!ValueUtil.isNull(vsLanDivRcd)) {
		util.Grid.setCellValue(app, "grdCmnMultiLang", "LAN_DIV_RCD", vsLanDivRcd, vnIdx);
	}

	//다국어소구분값으로 메시지코드 셋팅
	if (!ValueUtil.isNull(vsMsgSubDivRcd)) {
		var voMsgCdRow = util.DataSet.findRow(app, "dsMsgSubDivRcdList", "CD == '" + vsMsgSubDivRcd + "'");
		var vsMsgCd = voMsgCdRow.getValue("CD_PRP1");
		util.Grid.setCellValue(app, "grdCmnMultiLang", "MSG_CD", vsMsgCd, vnIdx);
	}
}

/*
 * 사용자 정의 컨트롤에서 save 이벤트 발생 시 호출.
 */
function onGrdCmnMultiLang_titleSave( /* cpr.event.CUIEvent */ e) {
	/** 
	 * @type udc.com.grid_IDS_Btn
	 */
	var grdCmnMultiLang_title = e.control;
	doSave();
} //onGrdCmnMultiLang_titleSave()


/**
 * @desc 저장 event
 * @param void
 */
function doSave() {
	
	// 그리드의 변경사항 유/무를 반환
	if (!util.Grid.isModified(app, "grdCmnMultiLang", "MSG")) {
		return false;
	}
	// 그리드 유효성 검증
	if (!util.validate(app, "grdCmnMultiLang")) {
		return false;
	}
	util.Submit.send(app, "subSave", function(pbSuccess){
		if(pbSuccess){
			doList(function(pbListSuccess) {
				// 조회 : "갱신된 데이터가 조회되었습니다." header 메세지 표시
				if(pbListSuccess){
					util.Msg.notify(app, "NLS-INF-M025");
				} 
			});
		}
	});
}//doSave()

/*
 * 콤보 박스에서 selection-change 이벤트 발생 시 호출.
 * ComboBox Item을 선택하여 선택된 값이 저장된 후에 발생하는 이벤트.
 */
function onCbbMsgDivRcdSelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.ComboBox
	 */
	var cbbMsgDivRcd = e.control;
//해당 콤보박스 컨트롤의 fiterExp 속성으로 변경 필요...
	util.SelectCtl.cascadeList("cbbMsgDivRcd", "cbbMsgSubDivRcd", "UCD");
}//onCbbMsgDivRcdSelectionChange()

/*
 * 인풋 박스에서 dblclick 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 더블 클릭할 때 발생하는 이벤트.
 */
function onGdIpbMsgCdDblclick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.InputBox
	 */
	var gdIpbMsgCd = e.control;
//	var voRowIndex = util.Grid.getIndex("grdCmnMultiLang");
//	
//	if("CM601NLS" == util.Grid.getCellValue("grdCmnMultiLang","MSG_DIV_RCD",voRowIndex)){
//		return;
//	}
//	
//	var voMsgCd = util.Grid.getCellValue("grdCmnMultiLang","MSG_CD", voRowIndex);
//	alert(voMsgCd);
//	var initValue = {
//		moMsgCd : voMsgCd
//	};
//	util.Dialog.open("app/cmn/cmnPMultiLabel", 650, 440, initValue);
}

/*
 * 콤보 박스에서 selection-change 이벤트 발생 시 호출.
 * ComboBox Item을 선택하여 선택된 값이 저장된 후에 발생하는 이벤트.
 */
function onGdCbbMsgDivRcdSelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.ComboBox
	 */
	var gdCbbMsgDivRcd = e.control;
	//현재 Row 
	var vnInsIdx = util.Grid.getIndex(app, "grdCmnMultiLang");
	//포커싱 된 다국어소구분 초기화
	util.Grid.setCellValue(app, "grdCmnMultiLang", "MSG_SUB_DIV_RCD","",vnInsIdx);
//해당 콤보박스 컨트롤의 fiterExp 속성으로 변경 필요...
	util.SelectCtl.cascadeList("gdCbbMsgDivRcd", "gdCbbMsgSubDivRcd", "UCD", false);
	
}//onGdCbbMsgDivRcdSelectionChange()

/*
 * 콤보 박스에서 selection-change 이벤트 발생 시 호출.
 * ComboBox Item을 선택하여 선택된 값이 저장된 후에 발생하는 이벤트.
 */
function onGdCbbMsgSubDivRcdSelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.ComboBox
	 */
	var gdCbbMsgSubDivRcd = e.control;
	var vsMsgSubDivRcd = util.Grid.getCellValue(app, "grdCmnMultiLang", "MSG_SUB_DIV_RCD");
	
	if (!ValueUtil.isNull(vsMsgSubDivRcd)) {
		var voMsgCdRow = util.DataSet.findRow(app, "dsMsgSubDivRcdList", "CD == '" + vsMsgSubDivRcd + "'");
		var vsMsgCd = voMsgCdRow.getValue("CD_PRP1");
		util.Grid.setCellValue(app, "grdCmnMultiLang", "MSG_CD", vsMsgCd);
	}
}//onGdCbbMsgSubDivRcdSelectionChange()

/*
 * 콤보 박스에서 focus 이벤트 발생 시 호출.
 * 컨트롤이 포커스를 획득한 후 발생하는 이벤트.
 */
function onGdCbbMsgSubDivRcdFocus(/* cpr.events.CFocusEvent */ e){
	/** 
	 * @type cpr.controls.ComboBox
	 */
	var gdCbbMsgSubDivRcd = e.control;
//해당 콤보박스 컨트롤의 fiterExp 속성으로 변경 필요...
	util.SelectCtl.cascadeList("gdCbbMsgDivRcd", "gdCbbMsgSubDivRcd", "UCD", false);
}
