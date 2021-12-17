var util = new ComUtil(app);

/**
 * @desc 사용자목록 조회 실행
 * @param poCallBackFunc 콜백 함수
 */
function doList(poCallBackFunc) {
	util.Submit.send(app, "subList", function(pbSuccess) {
		if (pbSuccess) {
			util.Control.redraw(app, "grdCmnUseUser");

			//조회 후 콜백함수 수행
			if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
		}
	});
}

/**
 * @desc 부서값이 입력되었는지를 판단한ㄷ,
 * 			부서값이 없을 경우 사용자 ID, 사용자명 둘 중 하나라도 입력값이 없으면 false를 리턴한다.
 */
function checkInputDept() {
	var vbResult = false;

	if (ValueUtil.isNull(util.Control.getValue(app, "ipbDeptNm"))) {
		//사용자 ID, 사용자명 중 하나는 필수
		var vsUserId = util.Control.getValue(app, "ipbUserId");
		var vsUserNm = util.Control.getValue(app, "ipbUserNm");

		var vsLblbUserId = util.Control.getValue(app, "lblUserId");
		var vsLblbUserNm = util.Control.getValue(app, "lblUserNm");

		if (ValueUtil.isNull(vsUserId) && ValueUtil.isNull(vsUserNm)) {
			util.Msg.alert("NLS-CMM-M016", [vsLblbUserId + "," + vsLblbUserNm]);
		} else {
			vbResult = true;
		}
	} else {
		vbResult = true;
	}

	return vbResult;
}

/**
 * @desc 사용,미사용업무역할목록 조회 실행
 * @param poCallBackFunc 콜백함수
 */
function getRoleList(poCallBackFunc) {
	var vnIdx = util.Grid.getIndex(app, "grdCmnUseUser");
	if (vnIdx == -1) {
		return;
	}

	var vsUserId = util.Grid.getCellValue(app, "grdCmnUseUser", "USER_ID", vnIdx);
	util.DataMap.setValue(app, "dmReqListUsrOperGrp", "strUserId", vsUserId);

	util.Submit.send(app, "subListUsrOperGrp", function(pbSuccess) {
		if (pbSuccess) {
			util.Control.redraw(app, ["grdCmnUsrOperGrpUse", "grdCmnUsrOperGrpNoUse"]);

			copyUseRoleId();

			//조회 후 콜백함수 수행
			if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
		}
	});
}

var maOriUseRoleId = [];

/**
 * @desc 첫 조회 시 기존 데이터 저장
 */
function copyUseRoleId() {
	maOriUseRoleId = new Array();

	var vnCnt = util.Grid.getRowCount(app, "grdCmnUsrOperGrpUse");
	if (vnCnt == 0) {
		return;
	}

	var vsRoleId = "";
	for (var i = 0; i < vnCnt; i++) {
		vsRoleId = util.Grid.getCellValue(app, "grdCmnUsrOperGrpUse", "OPRT_ROLE_ID", i);
		maOriUseRoleId.push(vsRoleId);
	}
}

/**
 * @desc 기존에 사용업무역할로 등록된 역할인지 체크한다.
 * @param psOprtRoleId 업무역할 아이디
 */
function isOriginRole(psOprtRoleId) {
	var vbResult = false;

	var vnOriCnt = maOriUseRoleId.length;
	if (vnOriCnt > 0) {
		for (var i = 0; i < vnOriCnt; i++) {
			var vsOriOprtRoleId = maOriUseRoleId[i];
			if (vsOriOprtRoleId == psOprtRoleId) {
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
function moveRoleUp() {
	var vsNoUseIdxs = util.Grid.getCheckOrSelectedRowIndex(app, "grdCmnUsrOperGrpNoUse");

	var vsNoUstGrdNm = util.Grid.getTitle(app, "grdCmnUsrOperGrpNoUse");
	var vsUseGrdNm = util.Grid.getTitle(app, "grdCmnUsrOperGrpUse");

	if (String(vsNoUseIdxs).isEmpty()) {
		util.Msg.alert("NLS-INF-M045");
		return;
	}

	var vaIdxsNoUse = null;
	if (String(vsNoUseIdxs).indexOf(",") != -1) {
		vaIdxsNoUse = String(vsNoUseIdxs).split(",");
	} else {
		vaIdxsNoUse = new Array();
		vaIdxsNoUse[0] = vsNoUseIdxs;
	}

	for (var i = 0; i < vaIdxsNoUse.length; i++) {
		var vnIdx = vaIdxsNoUse[i];
		var vnNewRowIdx = vnNewRowIdx = util.Grid.insertRow(app, "grdCmnUsrOperGrpUse");

		var vsUptStatus = util.Grid.getRowState(app, "grdCmnUsrOperGrpNoUse", vnIdx);

		var vsRoleId = util.Grid.getCellValue(app, "grdCmnUsrOperGrpNoUse", "OPRT_ROLE_ID", vnIdx);
		var vsRoleNm = util.Grid.getCellValue(app, "grdCmnUsrOperGrpNoUse", "OPRT_ROLE_NM", vnIdx);
		var vsUserTgtRcd = util.Grid.getCellValue(app, "grdCmnUsrOperGrpNoUse", "USER_TGT_RCD", vnIdx);
		var vsUserId = util.Grid.getCellValue(app, "grdCmnUsrOperGrpNoUse", "USER_ID", vnIdx);
		var vsUserTgtNm = util.Grid.getCellValue(app, "grdCmnUsrOperGrpNoUse", "DIV_NM", vnIdx);

		util.Grid.setCellValue(app, "grdCmnUsrOperGrpUse", "OPRT_ROLE_ID", vsRoleId, vnNewRowIdx);
		util.Grid.setCellValue(app, "grdCmnUsrOperGrpUse", "OPRT_ROLE_NM", vsRoleNm, vnNewRowIdx);
		util.Grid.setCellValue(app, "grdCmnUsrOperGrpUse", "USER_TGT_RCD", vsUserTgtRcd, vnNewRowIdx);
		util.Grid.setCellValue(app, "grdCmnUsrOperGrpUse", "USER_ID", vsUserId, vnNewRowIdx);
		util.Grid.setCellValue(app, "grdCmnUsrOperGrpUse", "DIV_NM", vsUserTgtNm, vnNewRowIdx);

		util.Grid.deleteRow(app, "grdCmnUsrOperGrpNoUse");

		var vbIsOrigin = isOriginRole(vsRoleId);

		if (vbIsOrigin) {
			//처리가 취소되었습니다.
			util.Msg.alert("NLS-INF-M013");
			//TODO 변경
			//			model.getControl("rptCmnUsrOperGrpUse").setRowStatus(vnNewRowIdx, "open");
		} else {
			//@1을(를) 성공적으로 생성하였습니다.
			util.Msg.alert("NLS-INF-M012");
		}
	}
	util.Control.redraw(app, ["grdCmnUsrOperGrpUse", "grdCmnUsrOperNoUse"]);
}

/**
 * @desc 사용업무역할을 미사용업무역할로 등록해제
 */
function moveRoleDown() {
	var vsUseIdxs = util.Grid.getCheckOrSelectedRowIndex(app, "grdCmnUSrOperGrpUse");

	var vsNoUstGrdNm = util.Grid.getTitle(app, "grdCmnUsrOperGrpNoUse");
	var vsUseGrdNm = util.Grid.getTitle(app, "grdCmnUsrOperGrpUse");

	if (String(vsUseIdxs).isEmpty()) {
		util.Msg.alert("NLS-INF-M045");
		return;
	}

	var vaIdxsUse = null;
	if (String(vsUseIdxs).indexOf(",") != -1) {
		vaIdxsUse = String(vsUseIdxs).split(",");
	} else {
		vaIdxsUse = new Array();
		vaIdxsUse[0] = vsUseIdxs;
	}

	for (var i = 0; i < vaIdxsUse.length; i++) {
		var vnIdx = vaIdxsUse[i];
		var vnNewRowIdx = null;

		var vsUptStatus = util.Grid.getRowState(app, "grdCmnUserOperGrpUse", vnIdx);

		vnNewRowIdx = util.Grid.insertRow(app, "grdCMnUsrOperGrpNoUse");

		var vsRoleId = util.Grid.getCellValue(app, "grdCmnUsrOperGrpUse", "OPRT_ROLE_ID", vnIdx);
		var vsRoleNm = util.Grid.getCellValue(app, "grdCmnUsrOperGrpUse", "OPRT_ROLE_NM", vnIdx);
		var vsUserTgtRcd = util.Grid.getCellValue(app, "grdCmnUsrOperGrpUse", "USER_TGT_RCD", vnIdx);
		var vsUserId = util.Grid.getCellValue(app, "grdCmnUsrOperGrpUse", "USER_ID", vnIdx);
		var vsUserTgtNm = util.Grid.getCellValue(app, "grdCmnUsrOperGrpUse", "DIV_NM", vnIdx);

		util.Grid.setCellValue(app, "grdCmnUsrOperGrpUse", "OPRT_ROLE_ID", vsRoleId, vnNewRowIdx);
		util.Grid.setCellValue(app, "grdCmnUsrOperGrpUse", "OPRT_ROLE_NM", vsRoleNm, vnNewRowIdx);
		util.Grid.setCellValue(app, "grdCmnUsrOperGrpUse", "USER_TGT_RCD", vsUserTgtRcd, vnNewRowIdx);
		util.Grid.setCellValue(app, "grdCmnUsrOperGrpUse", "USER_ID", vsUserId, vnNewRowIdx);
		util.Grid.setCellValue(app, "grdCmnUsrOperGrpUse", "DIV_NM", vsUserTgtNm, vnNewRowIdx);

		util.Grid.deleteRow(app, "grdCmnUsrOperGrpUse", vnIdx);

		var vbIsOrigin = isOriginRole(vsRoleId);

		if (!vbIsOrigin) {
			//TODO 변경
			//			model.getControl("rptCmnUsrOperGrpNoUse").setRowStatus(vnNewRowIdx, "open");
			//처리가 취소되었습니다.
			util.Msg.alert("NLS-INF-M013");
		} else {
			//삭제되었습니다.
			util.Msg.alert("NLS-INF-M008");
		}
	}
	util.Control.redraw(app, ["grdCmnUsrOpenGrpUse", "grdCmnUsrOperGrpNoUse"]);
}

/**
 * @desc 미사용업무역할을 사용업무역할로 등록 후 바로 저장
 */
function moveRoleUpWithSave() {
	var vsNoUseIdxs = util.Grid.getCheckOrSelectedRowIndex(app, "grdCmnUsrOperGrpNoUse");

	var vsNoUstGrdNm = util.Grid.getTitle(app, "grdCmnUsrOperGrpNoUse");
	var vsUseGrdNm = util.Grid.getTitle(app, "grdCmnUsrOperGrpUse");

	if (String(vsNoUseIdxs).isEmpty()) {
		util.Msg.alert("NLS-INF-M045", [vsNoUstGrdNm]);
		return;
	}

	var vaIdxsNoUse = null;
	if (String(vsNoUseIdxs).indexOf(",") != -1) {
		vaIdxsNoUse = String(vsNoUseIdxs).split(",");
	} else {
		vaIdxsNoUse = new Array();
		vaIdxsNoUse[0] = vsNoUseIdxs;
	}

	for (var i = 0; i < vaIdxsNoUse.length; i++) {
		var vnIdx = vaIdxsNoUse[i];
		var vnNewRowIdx = vnNewRowIdx = util.Grid.insertRow(app, "grdCmnUsrOperGrpUse");

		var vsUptStatus = util.Grid.getRowState(app, "grdCmnUsrOperGrpNoUse", vnIdx);

		var vsRoleId = util.Grid.getCellValue(app, "grdCmnUsrOperGrpNoUse", "OPRT_ROLE_ID", vnIdx);
		var vsRoleNm = util.Grid.getCellValue(app, "grdCmnUsrOperGrpNoUse", "OPRT_ROLE_NM", vnIdx);
		var vsUserTgtRcd = util.Grid.getCellValue(app, "grdCmnUsrOperGrpNoUse", "USER_TGT_RCD", vnIdx);
		var vsUserId = util.Grid.getCellValue(app, "grdCmnUsrOperGrpNoUse", "USER_ID", vnIdx);
		var vsUserTgtNm = util.Grid.getCellValue(app, "grdCmnUsrOperGrpNoUse", "DIV_NM", vnIdx);

		util.Grid.setCellValue(app, "grdCmnUsrOperGrpUse", "OPRT_ROLE_ID", vsRoleId, vnNewRowIdx);
		util.Grid.setCellValue(app, "grdCmnUsrOperGrpUse", "OPRT_ROLE_NM", vsRoleNm, vnNewRowIdx);
		util.Grid.setCellValue(app, "grdCmnUsrOperGrpUse", "USER_TGT_RCD", vsUserTgtRcd, vnNewRowIdx);
		util.Grid.setCellValue(app, "grdCmnUsrOperGrpUse", "USER_ID", vsUserId, vnNewRowIdx);
		util.Grid.setCellValue(app, "grdCmnUsrOperGrpUse", "DIV_NM", vsUserTgtNm, vnNewRowIdx);
	}

	//저장
	doSave();
}

/**
 * @desc 사용업무역할을 미사용업무역할로 등록해제 후 바로 저장
 */
function moveRoleDownWithSave() {
	var vsUseIdxs = util.Grid.getCheckOrSelectedRowIndex(app, "grdCmnUsrOperGrpUse");

	var vsNoUstGrdNm = util.Grid.getTitle(app, "grdCmnUsrOperGrpNoUse");
	var vsUseGrdNm = util.Grid.getTitle(app, "grdCmnUsrOperGrpUse");

	if (String(vsUseIdxs).isEmpty()) {
		util.Msg.alert("NLS-INF-M045", [vsUseGrdNm]);
		return;
	}

	var vaIdxsUse = null;
	if (String(vsUseIdxs).indexOf(",") != -1) {
		vaIdxsUse = String(vsUseIdxs).split(",");
	} else {
		vaIdxsUse = new Array();
		vaIdxsUse[0] = vsUseIdxs;
	}

	for (var i = 0; i < vaIdxsUse.length; i++) {
		var vnIdx = vaIdxsUse[i];
		var vnNewRowIdx = null;

		var vsUptStatus = util.Grid.getCheckOrSelectedRowIndex(app, "grdCmnUsrOperGrpUse", vnIdx);

		util.Grid.deleteRow(app, "grdCmnUsrOperGrpUse", vnIdx);
	}

	//저장
	doSave();
}

/**
 * @desc 저장 실행
 */
function doSave() {
	//그리드 변경사항 체크
	if (!util.Grid.isModified(app, "grdCmnUsrOperGrpUse", "MSG")) {
		return false;
	}
	//그리드 validation check
	if (!util.validate(app, "grdCmnUsrOperGrpUse")) return false;
	util.Submit.send(app, "subSave", function(pbSuccess) {
		if (pbSuccess) {
			getRoleList(function(pbListSuccess) {
				//갱신된 데이터가 조회되었습니다.
				if (pbListSuccess) util.Msg.alert("NLS-INF-M025");
			});
		}
	});
}

/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad( /* cpr.events.CEvent */ e) {
	//서브미션 실행
	util.Submit.send(app, "subOnLoad", function(pbSuccess) {
		if (pbSuccess) {
			util.Control.redraw(app, "cbbUserDivRcd");
		}
	});
}

/*
 * "" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnSearchClick( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btnSearch = e.control;
	//입력값 체크
	if (!checkInputDept()) return false;

	doList(function(pbSuccess) {
		//조회되었습니다
		if (pbSuccess) util.Msg.alert("NLS-INF-M024");
	});
}

/*
 * 그룹에서 keydown 이벤트 발생 시 호출.
 * 사용자가 키를 누를 때 발생하는 이벤트.
 */
function onGrpSearchKeydown( /* cpr.events.CKeyboardEvent */ e) {
	/** 
	 * @type cpr.controls.Container
	 */
	var grpSearch = e.control;
	if (e.keyCode == cpr.events.KeyCode.ENTER) {
		var btnSearch = app.lookup("btnSearch");
		btnSearch.click();
	}
}

/*
 * 그리드에서 selection-change 이벤트 발생 시 호출.
 * detail의 cell 클릭하여 설정된 selectionunit에 해당되는 단위가 선택될 때 발생하는 이벤트.
 */
function onGrdCmnUseUserSelectionChange( /* cpr.events.CSelectionEvent */ e) {
	/** 
	 * @type cpr.controls.Grid
	 */
	var grdCmnUseUser = e.control;
	getRoleList(function(pbSuccess) {
		//조회되었습니다
		if (pbSuccess) util.Msg.alert("NLS-INF-M024");
	});
}

/*
 * "△" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnUpClick( /* cpr.events.CMouseEvent */ e) {
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
function onBtnDownClick( /* cpr.events.CMouseEvent */ e) {
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
function onBtnSaveClick( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btnSave = e.control;
	doSave();
}
