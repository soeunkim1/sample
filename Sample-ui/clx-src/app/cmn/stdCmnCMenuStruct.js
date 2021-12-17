var util = new ComUtil(app);


/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	
	util.Submit.send(app, "subOnLoad", function(pbSuccess){
		if(pbSuccess){
			
			util.Control.redraw(app, ["cbbMenuDiv", "cbbSystemDiv", "cbbLanDivRcd"]);
			
			util.DataMap.setValue(app, "dmReqList", "strLanDivRcd", util.getSystemLocale(app));			
			
			util.SelectCtl.selectItem(app, "cbbMenuDiv", 0);
		}
	});
	
}


/**
 * @desc 메뉴구분 콤보박스 변경시 시스템구분 콤보박스에서 해당 메뉴구분의 하위메뉴만 표시한다.
 * @param 
 * @return 
 * @author 최경민 2015.11.10
 */
function setSystemDivListByMenuDiv(){
//해당 콤보박스 컨트롤의 fiterExp 속성으로 변경 필요...
	util.SelectCtl.cascadeList("cbbMenuDiv", "cbbSystemDiv", "UMENU_ID");
}
/*
 * 콤보 박스에서 selection-change 이벤트 발생 시 호출.
 * ComboBox Item을 선택하여 선택된 값이 저장된 후에 발생하는 이벤트.
 */
function onCbbMenuDivSelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.ComboBox
	 */
	var cbbMenuDiv = e.control;
	setSystemDivListByMenuDiv();
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


function doList(poCallBackFunc) {

	util.Submit.send(app, "subList", function(pbSuccess){
		if(pbSuccess){
			 util.Control.redraw(app, "trvUpMenu");
		}
		if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
	});
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
	
	if(util.Grid.isModified(app, "grdCmnMenu", "CRM")){
		return false;
	}
	
	if(!util.validate(app, "grpSearch")) {
		return false;
	}
	
	doList(function(pbSuccess){
		if (pbSuccess){ 
			util.Msg.notify(app, "NLS-INF-M024") ;
		}
	});
	
}

function doSave() {
	
	// 그리드 변경사항 체크
	if(!util.Grid.isModified(app, "grdCmnMenu", "MSG")){
		return false;
	}
	
	// 그리드  validation check
	if(!util.validate(app, "grdCmnMenu")) return false;
	
	
	util.Submit.send(app, "subSave", function(pbSuccess){
		if(pbSuccess){
			doList(function(pbListSuccess){
				if (pbListSuccess) util.Msg.notify(app, "NLS-INF-M025");
			}); 
		}
	});
}


/**
 * @desc 신규입력시 상위메뉴 목록과 프로그램 목록에서 선택 한 값을 설정하여준다.
 * @param 
 * @return 
 * @author 최경민 2015.11.11
 */
function doMoveList(){
	
	//상위메뉴 선택 값
	//var vsUpMenuKeySet = ExtTreeView.getSelectedValue("trvUpMenu");
	var vsUpMenuKeySet = util.Tree.getSelectedValue(app, "trvUpMenu");
	//프로그램목록 선택 인덱스
	//var vsPgmIdxs = ExtRepeat.getSelIdxOrFRowIdx("rptCmnPgm");
	var vaPgmIdxs = util.Grid.getCheckOrSelectedRowIndex(app, "grdCmnPgm");
	
	// 상위메뉴 == null || 프로그램목록 == null 조건의 경우 
	//상위메뉴가 없는 최상위 메뉴를 등록할 수 없으므로 && 조건으로 변경하였다.
	if( ValueUtil.isNull(vsUpMenuKeySet)  && vaPgmIdxs.length < 1){ 
		//이관할 데이터를 선택하세요.
		util.Msg.alert("NLS-INF-M006");
		return false;
	}
	
	
	for(var i = 0; i  < vaPgmIdxs.length; i++){
		
		var vaMenuInsertList = new Array(10);
		
		//프로그램목록 선택 인덱스
		var vnPgmIdx = vaPgmIdxs[i];
		//vaMenuInsertList[1] = ExtRepeat.getValue("rptCmnPgm", "LAN_DIV_RCD", vnPgmIdx);
		vaMenuInsertList[1] = util.Grid.getCellValue(app, "grdCmnPgm", "LAN_DIV_RCD", vnPgmIdx);
		
		if(!!vsUpMenuKeySet){
			
			var voRow = util.DataSet.findRow(app, "dsTrvUpMenu", "KEYSET =='" + vsUpMenuKeySet + "'");
//			vaMenuInsertList[2] = ExtInstance.getValue("/root/resList/trvUpMenu/row", "MENU_ID", "child::KEYSET='" + vsUpMenuKeySet + "'");
//			vaMenuInsertList[3] = ExtInstance.getValue("/root/resList/trvUpMenu/row", "PGM_ID", "child::KEYSET='" + vsUpMenuKeySet + "'");
//			vaMenuInsertList[4] = ExtInstance.getValue("/root/resList/trvUpMenu/row", "LAN_DIV_RCD", "child::KEYSET='" + vsUpMenuKeySet + "'");
//			vaMenuInsertList[5] = ExtInstance.getValue("/root/resList/trvUpMenu/row", "MENU_NM", "child::KEYSET='" + vsUpMenuKeySet + "'");
//			var vnTrvMenuLvl = parseInt(ExtInstance.getValue("/root/resList/trvUpMenu/row", "MENU_LVL", "child::KEYSET='" + vsUpMenuKeySet + "'"));
//			vaMenuInsertList[9] =  Number(vnTrvMenuLvl) + 1;
			vaMenuInsertList[2] = voRow.getValue("MENU_ID");
			vaMenuInsertList[3] = voRow.getValue("PGM_ID");
			vaMenuInsertList[4] = voRow.getValue("LAN_DIV_RCD");
			vaMenuInsertList[5] = voRow.getValue("MENU_NM");
			var vnTrvMenuLvl = parseInt(voRow.getValue("MENU_LVL"));
			vaMenuInsertList[9] =  Number(vnTrvMenuLvl) + 1;
		
		}else {
			//상위메뉴가 없을시 메뉴레벨 0
			vaMenuInsertList[9] =  0;
		}
		
//		vaMenuInsertList[6] = ExtRepeat.getValue("rptCmnPgm", "UNIT_SYSTEM_RCD", vnPgmIdx);
//		vaMenuInsertList[7] = ExtRepeat.getValue("rptCmnPgm", "PGM_ID", vnPgmIdx);
//		vaMenuInsertList[8] = ExtRepeat.getValue("rptCmnPgm", "PGM_NM", vnPgmIdx);
		vaMenuInsertList[6] = util.Grid.getCellValue(app, "grdCmnPgm", "UNIT_SYSTEM_RCD", vnPgmIdx);
		vaMenuInsertList[7] = util.Grid.getCellValue(app, "grdCmnPgm", "PGM_ID", vnPgmIdx);
		vaMenuInsertList[8] = util.Grid.getCellValue(app, "grdCmnPgm", "PGM_NM", vnPgmIdx);
		
		
		
		if(vaMenuInsertList[7] == "MENUHEADER") vaMenuInsertList[0] = "";
		else vaMenuInsertList[0] = util.Grid.getCellValue(app, "grdCmnPgm", "PGM_ID", vnPgmIdx);
		
		
		if( (vsUpMenuKeySet == null || vsUpMenuKeySet  == "") &&  vaMenuInsertList[8] != "MENUHEADER"){
			//상위메뉴목록을 선택하지 않았다면 프로그램목록의 프로그램명이 MENUHEADER인것만 등록가능합니다.
			util.Msg.alert("NLS-WRN-M121");
			return;
		
		}
		
		//var vnNewIdx = ExtRepeat.insertRow("rptCmnMenu");
		var vnNewIdx = util.Grid.insertRow(app, "grdCmnMenu");
		
		var vaCondition = null;
		var vsNewMenuId = "";
		
		if(!!vsUpMenuKeySet){
			vsNewMenuId = doGetSearchCount("grdCmnMenu", [vaMenuInsertList[0], vaMenuInsertList[2]]);
		}
		
		if(vsNewMenuId != null) vaMenuInsertList[0] = vaMenuInsertList[0] + vsNewMenuId;
		for(var j = 0; j < maMenuColList.length; j++){
			
			//빈값이 아닌 경우에만 입력한다.
			if(!ValueUtil.isNull(vaMenuInsertList[j])){
				//ExtRepeat.setValue("rptCmnMenu", maMenuColList[j], vaMenuInsertList[j], vnNewIdx);
				util.Grid.setCellValue(app, "grdCmnMenu", maMenuColList[j], vaMenuInsertList[j], vnNewIdx);
			} 
			
		}
		
		//사용여부, 메뉴여부 체크
//		ExtRepeat.setValue("rptCmnMenu", "USE_YN", "Y", vnNewIdx);
//		ExtRepeat.setValue("rptCmnMenu", "MENU_YN", "Y", vnNewIdx);
		util.Grid.setCellValue(app, "grdCmnMenu", "USE_YN", "Y", vnNewIdx);
		util.Grid.setCellValue(app, "grdCmnMenu", "MENU_YN", "Y", vnNewIdx);
		
	}
	
}

//신규 입력시 리피터에 입력할 컬럼 목록
var maMenuColList = [ "MENU_ID", "LAN_DIV_RCD", "UMENU_ID", "UPGM_ID", "ULAN_DIV_RCD"
                               , "UMENU_NM", "UNIT_SYSTEM_RCD", "PGM_ID", "MENU_NM", "MENU_LVL"];

/**
 * @desc 그리드에 중복되는 로우 갯수 + 1 값을 리턴하여 중복 존재시  메뉴아이디+"1" 방식으로 입력하도록 한다. 
 * @param 
 * @return 
 * @author 최경민 2015.11.11
 */
function doGetSearchCount(psGridId, paMenuIds){
	
	var vsPMenuId = paMenuIds[0];
	var vnPMenuIdLen = vsPMenuId.length;
	var vsPUMenuId = paMenuIds[1];
	var vaMenuIds = [];
	var vnResult = "";
	
	//var vnCnt = ExtRepeat.rowCount(psGridId);
	var vnCnt = util.Grid.getRowCount(app, psGridId);
	if(vnCnt != 0){
		for(var i = 0; i < vnCnt; i++){
//			var vsUMenuId =  ExtRepeat.getValue(psGridId, "UMENU_ID", i);
//			var vsMenuId = ExtRepeat.getValue(psGridId, "MENU_ID", i);
			var vsUMenuId =  util.Grid.getCellValue(app, psGridId, "UMENU_ID", i);
			var vsMenuId = util.Grid.getCellValue(app, psGridId, "MENU_ID", i);
			
			if(vsMenuId.substring(0, vnPMenuIdLen) == vsPMenuId){
				vaMenuIds.push(vsMenuId);
			}
		}
		
		if(vaMenuIds.length != 0 && vnResult != null){
			var vnTempMenuNo = 0;
			for(var k = 0, j = vaMenuIds.length; k < j; k++){
				var vnMenuNO = Number(vaMenuIds[k].substring(vnPMenuIdLen));
				if(Number(vnTempMenuNo) < vnMenuNO) vnTempMenuNo = vnMenuNO;
			}
			vnTempMenuNo++;
			vnResult = vnTempMenuNo;
		}
	}
	return vnResult;
};			
			
/*
 * "삭제" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnDeleteClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnDelete = e.control;
	util.Grid.deleteRow(app, "grdCmnMenu");
}

/*
 * "취소" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnRestoreClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnRestore = e.control;
	util.Grid.revertRowData(app, "grdCmnMenu");
}

/*
 * "저장" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnSaveClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnSave = e.control;
	doSave();
}

/*
 * "" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnMoveClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnMove = e.control;
	if(util.Grid.getIndex(app, "grdCmnPgm") == -1){
		//선택된 데이터가 없습니다.
		util.Msg.warn("M008");
	}
	
	doMoveList();
}

/*
 * 인풋 박스에서 keydown 이벤트 발생 시 호출.
 * 사용자가 키를 누를 때 발생하는 이벤트.
 */
function onIpbPgmIdNmFilterKeydown(/* cpr.events.CKeyboardEvent */ e){
	/** 
	 * @type cpr.controls.InputBox
	 */
	var ipbPgmIdNmFilter = e.control;
	if(e.keyCode == cpr.events.KeyCode.ENTER){
		doFilterPgm();		
	}
}

function doFilterPgm() {
	
	var vsFilterPgmIdNm = util.Control.getValue(app, "ipbPgmIdNmFilter");
	vsFilterPgmIdNm = ValueUtil.fixNull(vsFilterPgmIdNm);
	util.Grid.filter("grdCmnPgm", "PGM_ID *= '"+ vsFilterPgmIdNm +"' || PGM_NM *= '" + vsFilterPgmIdNm + "'");
	
}
			
/*
 * "" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnSearchPgmClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnSearchPgm = e.control;
	app.lookup("grdCmnPgm").clearSelection();
	doFilterPgm();
}
