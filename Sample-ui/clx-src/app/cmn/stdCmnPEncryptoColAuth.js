var util = new ComUtil(app);

/**
 * @desc 사용자목록 조회 실행
 * @param poCallBackFunc
 */
function doList(poCallBackFunc) {
	
	util.Submit.send(app, "subList", function(pbSuccess){
		if(pbSuccess){
			util.Control.redraw(app, "grdCmnUseUser");
			
			// 조회 후 콜백함수 수행
			if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
		}
	});
}

/**
 * @desc 부서값이 입력되었는지를 판단한다.
 *            부서값이 없을 경우 사용자 ID, 사용자명 둘중 하나라도 입력값이 없으면  false를 리턴한다.
 */
function checkInputDept() {
	var vbResult = false;
	
	if( ValueUtil.isNull(util.Control.getValue(app, "ipbDeptNm")) ) {
		//사용자 ID, 사용자명중 하나는 필수
		var vsUserId = util.Control.getValue(app, "ipbUserId");
		var vsUserNm = util.Control.getValue(app, "ipbUserNm");
		
		var vsLblbUserId = util.Control.getValue(app, "lblUserId");
		var vsLblbUserNm = util.Control.getValue(app, "lblUserNm");
		
		if( ValueUtil.isNull(vsUserId) && ValueUtil.isNull(vsUserNm) ){
			util.Msg.alert("NLS-CMM-M016", [vsLblbUserId +", " + vsLblbUserNm]);
		} else {
			vbResult = true;
		}
	
	}else {
		vbResult = true;
	}
	
	return vbResult;
}	

/**
 * @desc 사용,미사용업무역할목록 조회 실행
 * @param poCallBackFunc
 */
function getRoleList(poCallBackFunc){
	var vnIdx = util.Grid.getIndex(app, "grdCmnUseUser");
	if(vnIdx == -1) return;
	
	var vsUserId = util.Grid.getCellValue(app, "grdCmnUseUser", "USER_ID", vnIdx); 
	util.DataMap.setValue(app, "dmReqListUsrOperGrp", "strUserId", vsUserId);
	
	util.Submit.send(app, "subListUsrOperGrp", function(pbSuccess){
		if(pbSuccess){
			util.Control.redraw(app, "grdCmnUsrAuthNoUse");
			util.Control.redraw(app, "grdCmnUsrOperGrpNoUse");
			
			copyUseRoleId();
			
			// 조회 후 콜백함수 수행
			if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
		}
	});
}

var maOriUseRoleId = [];

/**
 * @desc 첫 조회시 기존 데이터 저장
 */
function copyUseRoleId(){
	maOriUseRoleId = new Array();
	
	var vnCnt = util.Grid.getRowCount(app, "grdCmnUsrAuthNoUse");
	if(vnCnt == 0) {
		return;
	}
	
	var vsRoleId = "";
	for(var i = 0; i < vnCnt; i++){
		vsRoleId = util.Grid.getCellValue(app, "grdCmnUsrAuthNoUse", "OPRT_ROLE_ID", i);
		maOriUseRoleId.push(vsRoleId);
	}
}

/**
 * @desc 기존에 사용업무역할로 등록된 역할인지 체크한다.
 * @param psOprtRoleId 업무역할 아이디
 */
function isOriginRole(psOprtRoleId){
	var vbResult = false;
	
	var vnOriCnt = maOriUseRoleId.length;
	if(vnOriCnt > 0){
		for(var i = 0; i < vnOriCnt; i++){
			var vsOriOprtRoleId = maOriUseRoleId[i];
			if(vsOriOprtRoleId == psOprtRoleId){
				vbResult == true;
				break;
			}
		}
	}
	
	return vbResult;
}
			
/**
 * @desc 미사용업무역할을 사용업무역할로 등록
 */
function moveRoleUp(){
	var vsNoUseIdxs = util.Grid.getCheckOrSelectedRowIndex(app, "grdCmnUsrOperGrpNoUse");
	
	var vsNoUstRptNm = util.Grid.getTitle(app, "grdCmnUsrOperGrpNoUse");
	var vsUseRptNm = util.Grid.getTitle(app, "grdCmnUsrAuthNoUse");
	
	if(String(vsNoUseIdxs).isEmpty()){
		util.Msg.alert("NLS-INF-M045", [vsNoUstRptNm]);
		return;
	}
	
	var vaIdxsNoUse = null;
	if(String(vsNoUseIdxs).indexOf(",") != -1){
		vaIdxsNoUse = String(vsNoUseIdxs).split(",");
	}else{
		vaIdxsNoUse = new Array();
		vaIdxsNoUse[0] = vsNoUseIdxs;
	}
	
	for(var i = 0; i < vaIdxsNoUse.length; i++){
		var vnIdx = vaIdxsNoUse[i];
		var vnNewRowIdx = vnNewRowIdx = util.Grid.insertRow(app, "grdCmnUsrAuthNoUse");
		
		var vsUptStatus = util.Grid.getCheckOrSelectedRowIndex(app, "grdCmnUsrOperGrpNoUse", vnIdx);
							
		var vsRoleId = util.Grid.getCellValue(app, "grdCmnUsrOperGrpNoUse", "ENCODE_COL_RCD", vnIdx);
		var vsRoleNm = util.Grid.getCellValue(app, "grdCmnUsrOperGrpNoUse", "MENU_ID", vnIdx);
		var vsUserTgtRcd = util.Grid.getCellValue(app, "grdCmnUsrOperGrpNoUse", "USE_YN", vnIdx);
		var vsUserId = util.Grid.getCellValue(app, "grdCmnUsrOperGrpNoUse", "USER_ID", vnIdx);
		var vsUserTgtNm = util.Grid.getCellValue(app, "grdCmnUsrOperGrpNoUse", "DIV_NM", vnIdx);
		
		util.Grid.setCellValue(app, "grdCmnUsrAuthNoUse", "OPRT_ROLE_ID", vsRoleId, vnNewRowIdx);
		util.Grid.setCellValue(app, "grdCmnUsrAuthNoUse", "OPRT_ROLE_NM", vsRoleNm, vnNewRowIdx);
		util.Grid.setCellValue(app, "grdCmnUsrAuthNoUse", "USER_TGT_RCD", vsUserTgtRcd, vnNewRowIdx);
		util.Grid.setCellValue(app, "grdCmnUsrAuthNoUse", "USER_ID", vsUserId , vnNewRowIdx);
		util.Grid.setCellValue(app, "grdCmnUsrAuthNoUse", "DIV_NM", vsUserTgtNm, vnNewRowIdx);
		
		util.Grid.deleteRow(app, "grdCmnUsrOperGrpNoUse");
		
		var vbIsOrigin = isOriginRole(vsRoleId);
		
		if(vbIsOrigin){
			//처리가 취소되었습니다.
			util.Msg.alert("NLS-INF-M013");
//			model.getControl("rptCmnUsrAuthNoUse").setRowStatus(vnNewRowIdx, "open");
		} else{
			//@1을(를) 성공적으로 생성하였습니다
			util.Msg.alert("NLS-INF-M012", [vsUseRptNm]);
		}
	}
	
	util.Control.redraw(app, ["grdCmnUsrAuthNoUse", "grdCmnUsrOperGrpNoUse"]);
}			
			
/**
 * @desc 사용업무역할을 미사용업무역할로 등록해제
 */
function moveRoleDown(){
	var vsUseIdxs = util.Grid.getCheckOrSelectedRowIndex(app, "grdCmnUsrAuthNoUse");
	
	var vsNoUstRptNm = util.Grid.getTitle(app, "grdCmnUsrOperGrpNoUse");
	var vsUseRptNm = util.Grid.getTitle(app, "grdCmnUsrAuthNoUse");
	
	if(String(vsUseIdxs).isEmpty()){
		ComMsg.alert("NLS-INF-M045", [vsUseRptNm]);
		return;
	}
	
	var vaIdxsUse = null;
	if(String(vsUseIdxs).indexOf(",") != -1){
		vaIdxsUse = String(vsUseIdxs).split(",");
	}else{
		vaIdxsUse = new Array();
		vaIdxsUse[0] = vsUseIdxs;
	}
	
	for(var i = 0; i < vaIdxsUse.length; i++){
		var vnIdx = vaIdxsUse[i];
		var vnNewRowIdx = null;
		
		var vsUptStatus = util.Grid.getCheckOrSelectedRowIndex(app, "grdCmnUsrAuthNoUse", vnIdx);
		
		vnNewRowIdx = util.Grid.insertRow(app, "grdCmnUsrOperGrpNoUse");
		
		var vsRoleId = util.Grid.getCellValue(app, "grdCmnUsrAuthNoUse", "OPRT_ROLE_ID", vnIdx);
		var vsRoleNm = util.Grid.getCellValue(app, "grdCmnUsrAuthNoUse", "OPRT_ROLE_NM", vnIdx);
		var vsUserTgtRcd = util.Grid.getCellValue(app, "grdCmnUsrAuthNoUse", "USER_TGT_RCD", vnIdx);
		var vsUserId = util.Grid.getCellValue(app, "grdCmnUsrAuthNoUse", "USER_ID", vnIdx);
		var vsUserTgtNm = util.Grid.getCellValue(app, "grdCmnUsrAuthNoUse", "DIV_NM", vnIdx);
		
		util.Grid.setCellValue(app, "grdCmnUsrOperGrpNoUse", "OPRT_ROLE_ID", vsRoleId, vnNewRowIdx);
		util.Grid.setCellValue(app, "grdCmnUsrOperGrpNoUse", "OPRT_ROLE_NM", vsRoleNm, vnNewRowIdx);
		util.Grid.setCellValue(app, "grdCmnUsrOperGrpNoUse", "USER_TGT_RCD", vsUserTgtRcd, vnNewRowIdx);
		util.Grid.setCellValue(app, "grdCmnUsrOperGrpNoUse", "USER_ID", vsUserId , vnNewRowIdx);
		util.Grid.setCellValue(app, "grdCmnUsrOperGrpNoUse", "DIV_NM", vsUserTgtNm, vnNewRowIdx);
		
		//ExtRepeat.deleteRow("rptCmnUsrAuthNoUse", "UPT_STATUS", vnIdx);
//		model.getControl("rptCmnUsrAuthNoUse").setRowStatus(vnIdx, "delete");
		util.Grid.deleteRow(app, "grdCmnUsrAuthNoUse");
		
		var vbIsOrigin = isOriginRole(vsRoleId);
		
		if(!vbIsOrigin){
//			model.getControl("grdCmnUsrOperGrpNoUse").setRowStatus(vnNewRowIdx, "open");
			//처리가 취소되었습니다.
			util.Msg.alert("NLS-INF-M013");
		} else{
			//삭제되었습니다.
			util.Msg.alert("NLS-INF-M008");
		}
	}
	
	util.Control.redraw(app, ["grdCmnUsrAuthNoUse", "grdCmnUsrOperGrpNoUse"]);
}
		
/**
 * @desc 미사용업무역할을 사용업무역할로 등록 후 바로 저장
 */
function moveRoleUpWithSave(){
	var vsNoUseIdxs = util.Grid.getCheckOrSelectedRowIndex(app, "grdCmnUsrOperGrpNoUse");
	
	var vsNoUstgrdNm = util.Grid.getTitle(app, "grdCmnUsrOperGrpNoUse");
	
	var vsUsegrdNm = util.Grid.getTitle(app, "grdCmnUsrAuthNoUse");
	
	if(String(vsNoUseIdxs).isEmpty()){
		util.Msg.alert("NLS-INF-M045", [vsNoUstgrdNm]);
		return;
	}
	
	var vsUserId = util.Grid.getCellValue(app, "grdCmnUseUser", "USER_ID");
	
	var vaIdxsNoUse = null;
	if(String(vsNoUseIdxs).indexOf(",") != -1){
		vaIdxsNoUse = String(vsNoUseIdxs).split(",");
	}else{
		vaIdxsNoUse = new Array();
		vaIdxsNoUse[0] = vsNoUseIdxs;
	}
	
	for(var i = 0; i < vaIdxsNoUse.length; i++){
		var vnIdx = vaIdxsNoUse[i];
		
		var vnNewRowIdx = vnNewRowIdx = util.Grid.insertRow(app, "grdCmnUsrAuthNoUse");
		
		var vsUptStatus = util.Grid.getRowState(app, "grdCmnUsrOperGrpNoUse", vnIdx);
							
		var vsEncodeColRcd = util.Grid.getCellValue(app, "grdCmnUsrOperGrpNoUse", "ENCODE_COL_RCD", vnIdx);
		var vsEncodeColRcdNm = util.Grid.getCellValue(app, "grdCmnUsrOperGrpNoUse", "ENCODE_COL_RCD_NM", vnIdx);
		var vsMenuId = util.Grid.getCellValue(app, "grdCmnUsrOperGrpNoUse", "MENU_ID", vnIdx);
		var vsUseYn = util.Grid.getCellValue(app, "grdCmnUsrOperGrpNoUse", "USE_YN", vnIdx);
		var vsEfftStDt = util.Grid.getCellValue(app, "grdCmnUsrOperGrpNoUse", "EFFT_ST_DT", vnIdx);
		var vsEfftEndDt = util.Grid.getCellValue(app, "grdCmnUsrOperGrpNoUse", "EFFT_END_DT", vnIdx);
		var vsMenuNm = util.Grid.getCellValue(app, "grdCmnUsrOperGrpNoUse", "MENU_NM", vnIdx);
				
		util.Grid.setCellValue(app, "grdCmnUsrAuthNoUse", "ENCODE_COL_RCD", vsEncodeColRcd, vnNewRowIdx);
		util.Grid.setCellValue(app, "grdCmnUsrAuthNoUse", "ENCODE_COL_RCD_NM", vsEncodeColRcdNm, vnNewRowIdx);
		util.Grid.setCellValue(app, "grdCmnUsrAuthNoUse", "MENU_ID", vsMenuId, vnNewRowIdx);
		util.Grid.setCellValue(app, "grdCmnUsrAuthNoUse", "USE_YN", vsUseYn, vnNewRowIdx);
		util.Grid.setCellValue(app, "grdCmnUsrAuthNoUse", "USER_ID", vsUserId , vnNewRowIdx);
		util.Grid.setCellValue(app, "grdCmnUsrAuthNoUse", "EFFT_ST_DT", vsEfftStDt, vnNewRowIdx);
		util.Grid.setCellValue(app, "grdCmnUsrAuthNoUse", "EFFT_END_DT", vsEfftEndDt, vnNewRowIdx);
		util.Grid.setCellValue(app, "grdCmnUsrAuthNoUse", "MENU_NM", vsMenuNm, vnNewRowIdx);
	}
	
	//저장
	doSave();
}		
			
/**
 * @desc 사용업무역할을 미사용업무역할로 등록해제 후 바로 저장
 */
function moveRoleDownWithSave(){
	
	var vsUseIdxs = util.Grid.getCheckOrSelectedRowIndex(app, "grdCmnUsrAuthNoUse");
	
	var vsNoUstgrdNm = util.Grid.getTitle(app, "grdCmnUsrOperGrpNoUse");
	var vsUsegrdNm = util.Grid.getTitle(app, "grdCmnUsrAuthNoUse");
	
	if(String(vsUseIdxs).isEmpty()){
		util.Msg.alert("NLS-INF-M045", [vsUsegrdNm]);
		return;
	
	}
	
	var vaIdxsUse = null;
	if(String(vsUseIdxs).indexOf(",") != -1){
		vaIdxsUse = String(vsUseIdxs).split(",");
	}else{
		vaIdxsUse = new Array();
		vaIdxsUse[0] = vsUseIdxs;
	}
	
	for(var i = 0; i < vaIdxsUse.length; i++){
		var vnIdx = vaIdxsUse[i];
		var vnNewRowIdx = null;
		
		var vsUptStatus = util.Grid.getRowState(app, "grdCmnUsrAuthNoUse", vnIdx);
		
		util.Grid.deleteRow(app, "grdCmnUsrAuthNoUse", vnIdx);
	}
	
	//저장
	doSave();
}

/**
 * @desc 저장실행
 */
function doSave() {

	// 그리드 변경사항 체크
	if(!util.Grid.isModified(app, "grdCmnUsrAuthNoUse", "MSG")){
		return false;
	}
	//그리드 validation check
	if(!util.validate(app, "grdCmnUsrAuthNoUse")) return false;

	util.Submit.send(app, "subSave", function(pbSuccess){
		if(pbSuccess){
			getRoleList(function(pbListSuccess) {
				// 조회 : "갱신된 데이터가 조회되었습니다." header 메세지 표시
				if (pbListSuccess) util.Msg.alert("NLS-INF-M025");
			});
		}
	});
}

/**
 * @desc 미사용업무역할목록 그리드 내 검색
 */
function doFilterMenu() {
	var vsFilterMenuIdNm = util.Control.getValue(app, "ipbMenuIdNm"); // 검색어
	/**@type cpr.controls.Grid */
	var vcGrdCmnOperMenu = app.lookup("grdCmnUsrOperGrpNoUse");
	
	vcGrdCmnOperMenu.clearFilter();  // 기존 필터 제거
	var vsCondition = "MENU_ID *= '" + vsFilterMenuIdNm + "' || MENU_NM *= '" + vsFilterMenuIdNm + "'";
	vcGrdCmnOperMenu.filter(vsCondition);
}						
						
/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	//서브미션 실행 (실패 시 cover page)
	util.Submit.send(app, "subOnLoad", function(pbSuccess){
		if(pbSuccess){
			util.Control.redraw(app, ["cbbUserDivRcd"]);
//			util.Control.setValue("cbbUserDivRcd", "CC00502");
			util.SelectCtl.setValue(app, "cbbUserDivRcd", "CC00502");
		}
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
	//입력값 체크
	if(!checkInputDept()) return false;
	
	doList(function(pbSuccess){
		//조회되었습니다
		if(pbSuccess) util.Msg.alert("NLS-INF-M024");
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
		var btnSearch = app.lookup("btnSearch");
		btnSearch.click();
	}
}

/*
 * 그리드에서 selection-change 이벤트 발생 시 호출.
 * detail의 cell 클릭하여 설정된 selectionunit에 해당되는 단위가 선택될 때 발생하는 이벤트.
 */
function onGrdCmnUseUserSelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grdCmnUseUser = e.control;
	getRoleList(function(pbSuccess){
		//조회되었습니다
		if(pbSuccess) util.Msg.alert("NLS-INF-M024");
	});
}

/*
 * "" 버튼에서 click 이벤트 발생 시 호출.
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
 * "△" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnUpClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnUp = e.control;
	moveRoleUpWithSave();
}

/*
 * "▽" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnDownClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnDown = e.control;
	moveRoleDownWithSave();
}

/*
 * "" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnSearchMenuClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnSearchMenu = e.control;
	doFilterMenu();
}

/*
 * 인풋 박스에서 keydown 이벤트 발생 시 호출.
 * 사용자가 키를 누를 때 발생하는 이벤트.
 */
function onIpbMenuIdNmKeydown(/* cpr.events.CKeyboardEvent */ e){
	/** 
	 * @type cpr.controls.InputBox
	 */
	var ipbMenuIdNm = e.control;
	if(e.keyCode == cpr.events.KeyCode.ENTER){
		var btnSearchMenu = app.lookup("btnSearchMenu");
		btnSearchMenu.click();
	}
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
