var util = new ComUtil(app);

/**
 * @desc 사용자 목록 조회 실행
 * @param poCallBackFunc 콜백함수
 */
function doList(poCallBackFunc){
	util.Submit.send(app, "subList", function(pbSuccess){
		if(pbSuccess){
			util.Control.redraw(app, "grdCmnUseUser");
			
			//조회 후 콜백함수 수행
			if(util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
		}
	});
}

/**
 * @desc 이관대상 사용자목록 조회 실행
 * @param poCallBackFunc
 */
function doListTrans(poCallBackFunc){
	util.Submit.send(app, "subListTrans", function(pbSuccess){
		if(pbSuccess){
			util.Control.redraw(app, "grdCmnUseUserTrans");
			
			if(util.Grid.getRowCount(app, "grdCmnUseUserTrans") < 1){
				util.Control.reset(app, app, "grdCmnUsrOperGrpUseTrans");
			}
			
			//조회 후 콜백함수 수행
			if(util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
		}
	});
}

/**
 * @desc 부서 값이 입력되었는지를 판단한다.
 * 			부서 값이 없을 경우 사용자 ID, 사용자명 둘 중 하나라도 입력 값이 없으면 false를 리턴한다.
 */
function checkInputDept(){
	var vbResult = false;
	
	if(ValueUtil.isNull(util.Control.getValue(app, "ipbDeptNm"))){
		//사용자 ID, 사용자명 중 하나는 필수
		var vsUserId = util.Control.getValue(app, "ipbUserId");
		var vsUserNm = util.Control.getValue(app, "ipbUserNm");
		
		var vsLblbUserId = util.Control.getValue(app, "lblUserId");
		var vsLblbUserNm = util.Control.getValue(app, "lblUserNm");
		
		if(ValueUtil.isNull(vsUserId) && ValueUtil.isNull(vsUserNm)){
			util.Msg.alert("NLS-CMM-M016", [vsLblbUserId + ", " + vsLblbUserNm]);
		}else{
			vbResult = true;
		}
	}else{
		vbResult = true;
	}
	return vbResult;
}

/**
 * @desc 이관대상목록 조회조건 필수값 체크
 */
function checkInputTrans(){
	var vbResult = false;
	
	if(ValueUtil.isNull(util.Control.getValue(app, "ipbUserNmTrans"))){
		//사용자 ID, 사용자명 하나는 필수 
		var vsUserId = util.Control.getValue(app, "ipbUserIdTrans");
		var vsUserNm = util.Control.getValue(app, "ipbUserNmTrans");
		
		var vsLblbUsreId = util.Control.getValue(app, "lblUserIdTrans");
		var vsLblbUsreNm = util.Control.getValue(app, "lblUserNmTrans");
		
		if(ValueUtil.isNull(vsUserId) && ValueUtil.isNull(vsUserNm)){
//			util.Msg.alert(util.Control.getValue("grdCmnUseUserTrans_title") + " " + "NLS-CMM-M016", [vsLblbUsreId + ", " + vsLblbUsreNm]);
			util.Msg.alert("NLS-CMM-M016", [vsLblbUsreId + ", " + vsLblbUsreNm]);
		}else{
			vbResult = true;
		}
	}else{
		vbResult = true;
	}
	return vbResult;
}

/**
 * @desc 사용업무역할목록 조회 실행
 * @param poCallBackFunc
 */
function getRoleList(poCallBackFunc){
	var vnIdx = util.Grid.getIndex(app, "grdCmnUseUser");
	if(vnIdx == null) return;
	
	var vsUsreId = util.Grid.getCellValue(app, "grdCmnUseUser", "USER_ID", vnIdx);
	util.DataMap.setValue(app, "dmReqListUsrOperGrp", "strUserId", vsUsreId);
	
	util.Submit.send(app, "subListUsrOperGrp", function(pbSuccess){
		if(pbSuccess){
			util.Control.redraw(app, "grdCmnUsrOperGrpUse");
			
			copyUseRoleId();
			
			//조회 후 콜백함수 수행
			if(util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
		}
	});
}

/**
 * @desc 이관대상사용업무역할목록 조회 실행
 * @param poCallBackFunc
 */
function getRoleTransList(poCallBackFunc){
	var vnIdx = util.Grid.getIndex(app, "grdCmnUseUserTrans");
	if(vnIdx == null) return;
	
	var vsUserId = util.Grid.getCellValue(app, "grdCmnUseUserTrans", "USER_ID", vnIdx);
	util.DataMap.setValue(app, "dmReqListUsrOperGrpTrans", "strUserId", vsUserId);
	
	util.Submit.send(app, "subListUsrOperGrpTrans", function(pbSuccess){
		if(pbSuccess){
			util.Control.redraw(app, "grdCmnUsrOperGrpUseTrans");
			
			//조회 후 콜백함수 수행
			if(util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
		}
	});
}

var maOriUseRoleId = [];

/**
 * @desc 첫 조회 시 기존 데이터 저장
 */
function copyUseRoleId(){
	maOriUseRoleId = new Array();
	
	var vnCnt = util.Grid.getRowCount(app, "grdCmnUsrOperGrpUse");
	if(vnCnt == 0) return;
	
	var vsRoleId = "";
	for(var i = 0 ; i <vnCnt ; i++){
		vsRoleId = util.Grid.getCellValue(app, "grdCmnUsrOperGrpUse", "OPRT_ROLE_ID", i);
		maOriUseRoleId.push(vsRoleId);
	}
}

/**
 * @desc 기존에 사용업무역할로 등록된 역할인지 체크한다.
 * @param psOprtRoleId 사용업무역할 아이디
 */
function isOriginRole(psOprtRoleId){
	var vbResult = false;
	
	var vnOriCnt = maOriUseRoleId.length;
	if(vnOriCnt > 0){
		for(var i = 0 ; i < vnOriCnt ; i++){
			var vsOriOprtRoleId = maOriUseRoleId[i];
			if(vsOriOprtRoleId == psOprtRoleId){
				vbResult = true;
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
	var vsNoUserIdxs = util.Grid.getCheckOrSelectedRowIndex(app, "grdCmnUsrOperGrpUserTrans");
	
	var vsNoUstGrdNm = util.Grid.getTitle(app, "grdCmnUsrOperGrpUseTrans");
	var vsUseGrdNm = util.Grid.getTitle(app, "grdCmnUsrOperGrpUse");
	
	if(String(vsNoUserIdxs).isEmpty()){
		util.Msg.alert("NLS-INF-M045", [vsNoUstGrdNm]);
		return;
	}
	
	var vaIdxsNoUse = null;
	if(String(vsNoUserIdxs).indexOf(",") != -1){
		vaIdxsNoUse = vsNoUserIdxs.split(",");
	}else{
		vaIdxsNoUse = new Array();
		vaIdxsNoUse[0] = vsNoUserIdxs;
	}
	
	for(var i = 0 ; i < vaIdxsNoUse.length ; i++){
		var vnIdx = vaIdxsNoUse[i];
		var vnNewRowIdx = vnNewRowIdx = util.Grid.insertRow(app, "grdCmnUsrOperGrpUse");
		
		var vsUptStatus = util.Grid.getRowState(app, "grdCmnUsrOperGrpUseTrans", vnIdx);
		
		var vsRoleId = util.Grid.getCellValue(app, "grdCmnUsrOperGrpUseTrans", "OPRT_ROLE_ID", vnIdx);
		var vsRoleNm = util.Grid.getCellValue(app, "grdCmnUsrOperGrpUseTrans", "OPRT_ROLE_NM", vnIdx);
		var vsUserTgtRcd = util.Grid.getCellValue(app, "grdCmnUsrOperGrpUseTrans", "USER_TGT_RCD", vnIdx);
		var vsUserId = util.Grid.getCellValue(app, "grdCmnUsrOperGrpUseTrans", "USER_ID", vnIdx);
		var vsUserTgtNm = util.Grid.getCellValue(app, "grdCmnUsrOperGrpUseTrans", "DIV_NM", vnIdx);
		
		util.Grid.setCellValue(app, "grdCmnUsrOperGrpUse", "OPRT_ROLE_ID", vsRoleId, vnNewRowIdx);
		util.Grid.setCellValue(app, "grdCmnUsrOperGrpUse", "OPRT_ROLE_NM", vsRoleNm, vnNewRowIdx);
		util.Grid.setCellValue(app, "grdCmnUsrOperGrpUse", "USER_TGT_RCD", vsUserTgtRcd, vnNewRowIdx);
		util.Grid.setCellValue(app, "grdCmnUsrOperGrpUse", "USER_ID", vsUserId, vnNewRowIdx);
		util.Grid.setCellValue(app, "grdCmnUsrOperGrpUse", "DIV_NM", vsUserTgtNm, vnNewRowIdx);
		
		util.Grid.deleteRow(app, "grdCmnUsrOperGrpUseTrans", vnIdx);
		
		var vbIsOrigin = isOriginRole(vsRoleId);
		
		if(vbIsOrigin){
			//처리가 취소되었습니다
			util.Msg.alert("NLS-INF-M013");
			//TODO 수정
//			util.Grid.setRowState("grdCmnUsrOperGrpUse", state, vnNewRowIdx);
		}else{
			//@1을(를) 성공적으로 생성하였습니다.
			util.Msg.alert("NLS-INF-M012", [vsUseGrdNm]);
		}
	}
	
	util.Control.redraw(app, "grdCmnUsrOperGrpUse");
	util.Control.redraw(app, "grdCmnUsrOperGrpUseTrans");
}

/**
 * @desc 사용업무역할을 미사용업무역할로 등록해제
 */
 function moveRoleDown(){
 	var vsUseIdxs = util.Grid.getCheckOrSelectedRowIndex(app, "grdCmnUsrOperGrpUse");
 	
 	var vsNoUstGrdNm = util.Grid.getTitle(app, "grdCmnUsrOperGrpUseTrans");
 	var vsUseGrdNm = util.Grid.getTitle(app, "grdCmnUsrOperGrpUse");
 	
 	if(String(vsUseIdxs).isEmpty()){
 		util.Msg.alert("M045", [vsUseGrdNm]);
 		return;
 	}
 	
 	var vaIdxsUse = null;
 	if(String(vsUseIdxs).indexOf(",") != -1 ){
 		vaIdxsUse = vsUseIdxs.split(",");
 	}else{
 		vaIdxsUse = new Array();
 		vaIdxsUse[0] = vsUseIdxs;
 	}
 	
 	for(var i = 0 ; i < vaIdxsUse.length ; i++){
 		var vnIdx = vaIdxsUse[i];
 		var vnNewRowIdx = null;
 		
 		var vsUptStatus = util.Grid.getRowState(app, "grdCmnUsrOperGrpUse", vnIdx);
 		
 		vnNewRowIdx = util.Grid.insertRow(app, "grdCmnUsrOperGrpUse");
 		
 		var vsRoleId = util.Grid.getCellValue(app, "grdCmnUsrOperGrpUse", "OPRT_ROLE_ID", vnIdx);
 		var vsRoleNm = util.Grid.getCellValue(app, "grdCmnUsrOperGrpUse", "OPRT_ROLE_NM", vnIdx);
 		var vsUserTgtRcd = util.Grid.getCellValue(app, "grdCmnUsrOperGrpUse", "USER_TGT_RCD", vnIdx);
 		var vsUserId = util.Grid.getCellValue(app, "grdCmnUsrOperGrpUse", "USER_ID", vnIdx);
 		var vsUserTgtNm = util.Grid.getCellValue(app, "grdCmnUsrOperGrpUse", "DIV_NM", vnIdx);
 		
 		util.Grid.setCellValue(app, "grdCmnUsrOperGrpUseTrans", "OPRT_ROLE_ID", vsRoleId, vsNoUstGrdNm);
 		util.Grid.setCellValue(app, "grdCmnUsrOperGrpUseTrans", "OPRT_ROLE_NM", vsRoleNm, vsNoUstGrdNm);
 		util.Grid.setCellValue(app, "grdCmnUsrOperGrpUseTrans", "USER_TGT_RCD", vsUserTgtRcd, vsNoUstGrdNm);
 		util.Grid.setCellValue(app, "grdCmnUsrOperGrpUseTrans", "USER_ID", vsUserId, vsNoUstGrdNm);
 		util.Grid.setCellValue(app, "grdCmnUsrOperGrpUseTrans", "DIV_NM", vsUserTgtNm, vsNoUstGrdNm);
 		
// 	util.Grid.setRowState("grdCmnUsrOperGrpUse", "delete", vnIdx);
		util.Grid.deleteRow(app, "grdCmnUsrOperGrpUse", vnIdx);
		
		var vbIsOrigin = isOriginRole(vsRoleId);
		
		if(!vbIsOrigin){
			//처리가 취소되었습니다.
			//TODO 수정
//			model.getControl("rptCmnUsrOperGrpUseTrans").setRowStatus(vnNewRowIdx, "open");
			util.Msg.alert("NLS-INF-M013");
		}else{
			//삭제되었습니다.
			util.Msg.alert("NLS-INF-M008");
		}
 	}
 	
 	util.Control.redraw(app, ["grdCmnUsrOperGrpUse", "grdCmnUsrOperGrpUserTrans"]);
 } 
 
 /**
  * @desc 사용업무역할 목록 -> 이관대상자 사용업무역할 목록 복사
  */
 function moveRoleDownWithSave(){
 	var vaIdx = util.Grid.getCheckOrSelectedRowIndex(app, "grdCmnUsrOperGrpUse");

// 	var vsIdx = util.Grid.getChkRowOrSelRowIdx("grdCmnUsrOperGrpUse");
// 	var vaIdx = vsIdx.split(",");
 	
 	
 	if(util.Grid.getRowCount(app, "grdCmnUseUserTrans") < 1 || util.Grid.getRowCount(app, "grdCmnUseUser") < 1) return;
 	
 	var vsExistRoleNm = "";
 	
 	for(var i = 0 ; i < vaIdx.length ; i++){
 		var vnIdx = vaIdx[i];
 		
 		var vsRoleId = util.Grid.getCellValue(app, "grdCmnUsrOperGrpUse", "OPRT_ROLE_ID", vnIdx);
 		var vsRoleNm = util.Grid.getCellValue(app, "grdCmnUsrOperGrpUse", "OPRT_ROLE_NM", vnIdx);
 		var vsUserTgtRcd = util.Grid.getCellValue(app, "grdCmnUsrOperGrpUse", "USER_TGT_RCD", vnIdx);
 		var vsUserTgtNm = util.Grid.getCellValue(app, "grdCmnUsrOperGrpUse", "DIV_NM", vnIdx);
 		
 		var isExistRoleId = util.DataSet.findRow(app, "dsCmnUsrOperGrpUseTrans", "OPRT_ROLE_ID == '" + vsRoleId + "'");
 		
 		if(!ValueUtil.isNull(isExistRoleId)){
 			vsExistRoleNm += vsRoleNm + ",";
 			continue;
 		}
 		
 		var vnNewRowIdx = util.Grid.insertRow(app, "grdCmnUsrOperGrpUseTrans");
 		
 		var vsUserId = util.Grid.getCellValue(app, "grdCmnUseUserTrans", "USER_ID");
 		
 		util.Grid.setCellValue(app, "grdCmnUsrOperGrpUseTrans", "OPRT_ROLE_ID", vsRoleId, vnNewRowIdx);
 		util.Grid.setCellValue(app, "grdCmnUsrOperGrpUseTrans", "OPRT_ROLE_NM", vsRoleNm, vnNewRowIdx);
 		util.Grid.setCellValue(app, "grdCmnUsrOperGrpUseTrans", "USER_TGT_RCD", vsUserTgtRcd, vnNewRowIdx);
 		util.Grid.setCellValue(app, "grdCmnUsrOperGrpUseTrans", "USER_ID", vsUserId, vnNewRowIdx);
 		util.Grid.setCellValue(app, "grdCmnUsrOperGrpUseTrans", "DIV_NM", vsUserTgtNm, vnNewRowIdx);
 	}
 	
 	if(!ValueUtil.isNull(vsExistRoleNm)){
 		util.Msg.alert("NLS-CMM-M049", [vsExistRoleNm.substring(0, vsExistRoleNm.length - 2)]);
 	}
 	
 	//저장
 	//doSave();
 }
 
/**
 * @desc 이관대상 사용업무역할 목록 -> 사용업무역할목록
 */
 function moveRoleUpWithSave(){
 	var vaIdx = util.Grid.getCheckOrSelectedRowIndex(app, "grdCmnUsrOperGrpUseTrans");
 	
// 	var vsIdx = util.Grid.getChkRowOrSelRowIdx("grdCmnUsrOperGrpUseTrans");
// 	var vaIdx = vsIdx.split(",");
 	
 	if(util.Grid.getRowCount(app, "grdCmnUseUserTrans") < 1 || util.Grid.getRowCount(app, "grdCmnUseUser") < 1) return;
 	
 	var vsExisRoldNm = "";
 	
 	for(var i = 0 ; i < vaIdx.length ; i++){
 		var vnIdx = vaIdx[i];
 		
 		var vsRoleId = util.Grid.getCellValue(app, "grdCmnUsrOperGrpUseTrans", "OPRT_ROLE_ID", vnIdx);
 		var vsRoleNm = util.Grid.getCellValue(app, "grdCmnUsrOperGrpUseTrans", "OPRT_ROLE_NM", vnIdx);
 		var vsUserTgtRcd = util.Grid.getCellValue(app, "grdCmnUsrOperGrpUseTrans", "USER_TGT_RCD", vnIdx);
 		var vsUserTgtNm = util.Grid.getCellValue(app, "grdCmnUsrOperGrpUseTrans", "DIV_NM", vnIdx);
 		
 		var isExistRoleId = util.DataSet.findRow(app, "dsCmnUsrOperGrpUse", "OPRT_ROLE_ID == '" + vsRoleId + "'");
 		
 		if(!ValueUtil.isNull(isExistRoleId)){
 			vsExisRoldNm += vsRoleNm + ",";
 			continue;
 		}
 		
 		var vnNewRowIdx = util.Grid.insertRow(app, "grdCmnUsrOperGrpUse");
 		
 		var vsUserId = util.Grid.getCellValue(app, "grdCmnUseUser", "USER_ID");
 		
 		util.Grid.setCellValue(app, "grdCmnUsrOperGrpUse", "OPRT_ROLE_ID", vsRoleId, vnNewRowIdx);
 		util.Grid.setCellValue(app, "grdCmnUsrOperGrpUse", "OPRT_ROLE_NM", vsRoleNm, vnNewRowIdx);
 		util.Grid.setCellValue(app, "grdCmnUsrOperGrpUse", "USER_TGT_RCD", vsUserTgtRcd, vnNewRowIdx);
 		util.Grid.setCellValue(app, "grdCmnUsrOperGrpUse", "USER_ID", vsUserId, vnNewRowIdx);
 		util.Grid.setCellValue(app, "grdCmnUsrOperGrpUse", "DIV_NM", vsUserTgtNm, vnNewRowIdx);
 	}
 	
 	if(!ValueUtil.isNull(vsExisRoldNm)){
 		util.Msg.alert("NLS-CMM-M049", [vsExisRoldNm.substring(0, vsExisRoldNm.length - 2)]);
 	}
 }
 
 /**
  * @desc 이관대상업무역할 저장실행
  */
 function doSave(){
 	//그리드 변경사항 체크
 	if(!util.Grid.isModified(app, "grdCmnUsrOperGrpUseTrans", "MSG")){
 		return false;
 	}

 	//그리드 validation check
 	if(!util.validate(app, "grdCmnUsrOperGrpUseTrans")) return false;
 	
 	util.Submit.send(app, "subSave", function(pbSuccess){
 		if(pbSuccess){
 			getRoleTransList(function(pbListSuccess){
		 		//갱신된 데이터가 조회되었습니다
		 		if(pbListSuccess) util.Msg.alert("NLS-INF-M025");
 			});
 		}
 	});
 }
 
 /**
  * @desc 사용업무역할목록 저장
  */
function doSaveUse(){
	//그리드 변경사항 체크
	if(!util.Grid.isModified(app, "grdCmnUsrOperGrpUse", "MSG")){
		return false;
	}
	
	//그리드 validation check
	if(!util.validate(app, "grdCmnUsrOperGrpUse")) return false;
	
	util.Submit.send(app, "subSaveUse", function(pbSuccess){
		if(pbSuccess){
			getRoleList(function(pbListSuccess){
				//갱신된 데이터가 조회되었습니다
				if(pbListSuccess) util.Msg.alert("NLS-INF-M025");
			});
		}
	});
}
 
/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	util.Submit.send(app, "subOnLoad", function(pbSuccess){
		if(pbSuccess){
			util.Control.redraw(app, ["cbbUserDivRcd", "cbbUserDivRcdTrans"]);
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
	if(!checkInputDept()) return false;
	
	doList(function(pbSuccess){
		//조회되었습니다.
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
	if(util.Grid.getIndex(app, "grdCmnUseUser") == -1){
		return false;
	}
	
	getRoleList(function(pbSuccess){
		//조회되었습니다
		if(pbSuccess) util.Msg.alert("NLS-INF-M024");
	});
}

/*
 * "" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnSearchTransClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnSearchTrans = e.control;
	//입력값 체크
	if(!checkInputTrans()) return false;
	
	doListTrans(function(pbSuccess){
		//조회되었습니다
		if(pbSuccess) util.Msg.alert("NLS-INF-M024");
	});
}

/*
 * 그룹에서 keydown 이벤트 발생 시 호출.
 * 사용자가 키를 누를 때 발생하는 이벤트.
 */
function onGrpTransKeydown(/* cpr.events.CKeyboardEvent */ e){
	/** 
	 * @type cpr.controls.Container
	 */
	var grpTrans = e.control;
	if(e.keyCode == cpr.events.KeyCode.ENTER){
		var btnSearchTrans = app.lookup("btnSearchTrans")
		btnSearchTrans.click();
	}
}

/*
 * 그리드에서 selection-change 이벤트 발생 시 호출.
 * detail의 cell 클릭하여 설정된 selectionunit에 해당되는 단위가 선택될 때 발생하는 이벤트.
 */
function onGrdCmnUseUserTransSelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grdCmnUseUserTrans = e.control;
	if(util.Grid.getIndex(app, "grdCmnUseUserTrans") == -1){
		return false;
	}
	
	getRoleTransList(function(pbSuccess){
		//조회되었습니다
		if(pbSuccess) util.Msg.alert("NLS-INF-M024");
	});
}

/*
 * "▽" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnUpClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnUp = e.control;
	moveRoleDownWithSave();
}

/*
 * "△" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnUp1Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnUp1 = e.control;
	moveRoleUpWithSave();
}

/*
 * "" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnDelUseClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnDelUse = e.control;
	util.Grid.deleteRow(app, "grdCmnUsrOperGrpUse");
}

/*
 * "" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnRestoreUseClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnRestoreUse = e.control;
	util.Grid.revertRowData(app, "grdCmnUsrOperGrpUse");
}

/*
 * "" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnSaveUseClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnSaveUse = e.control;
	doSaveUse();
}

/*
 * "" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnDelClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnDel = e.control;
	util.Grid.deleteRow(app, "grdCmnUsrOperGrpUseTrans");
}

/*
 * "" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnRestoreClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnRestore = e.control;
	util.Grid.revertRowData(app, "grdCmnUsrOperGrpUseTrans");
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
