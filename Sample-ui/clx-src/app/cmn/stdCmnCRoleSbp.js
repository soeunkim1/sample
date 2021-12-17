var util = new ComUtil(app);

/**
 * @desc 조회
 * @param poCallBackFunc 조회 후 콜백함수
 */
function doList(poCallBackFunc){
	util.Submit.send(app, "subList", function(pbSuccess){
		if(pbSuccess){
			util.Control.redraw(app, ["grdCmnRole", "grdCmnPgm"]);
			
			var vnRoleCnt = util.Grid.getRowCount(app, "grdCmnRole");
			if(vnRoleCnt > 0){
				util.Control.setEnable(app, true, maDtlCtrls);
			}else{
				util.Control.setEnable(app, false, maDtlCtrls);
			}
			
			//조회 후 콜백함수 수행
			if(util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
		}
	});
}

var maDtlCtrls = ["btnDel", "btnRestore", "btnSave", "btnInsert"];

/**
 * @desc 권한 대상자 목록에서 로우 변경시 데이터셋 변경 상태를 체크하여 진행방향 결정
 *             전환 전 기존 프로그램의 경우 자동 저장을 하였지만 변경 데이터 체크 프로세스가 바뀌었으므로 저장은 수행하지 않는다.
 * @param psGrdId
 */
function isChangeUptStatus(psGrdId){
	var vbIsChanged = false;
	
	if(util.Grid.isModified(app, psGrdId)){
		//@1 에 변경된 데이터가 있습니다. 계속 진행하시겠습니까?
		//1. true 2. false
		if(util.Msg.confirm("NLS-CRM-M056", [util.Control.getFieldLabel(psGrdId)]) == 1){
			//계속 진행 시 변경 데이터 무시하고 새로 선택한 프로그램으로 조회
			vbIsChanged = false;
		}else{
			//진행이 아닐 시 이전 로우로 돌아간다.
			vbIsChanged = true;
		}
	}
	return vbIsChanged;
}

/**
 * @desc 업무역할 별 메뉴 목록 조회
 * @param poCallBackFunc 콜백 함수
 */
function doListCmnOperMenu(poCallBackFunc){
	//업무역할 목록에서 조회 키값 설정
	var vnIdx = util.Grid.getIndex(app, "grdCmnRole");
	var vsOprtRoleId = util.Grid.getCellValue(app, "grdCmnRole", "OPRT_ROLE_ID", vnIdx);
	var vsOprtRoleNm = util.Grid.getCellValue(app, "grdCmnRole", "OPRT_ROLE_NM", vnIdx);
	var vsLanDivRcd = util.DataMap.getValue(app, "dmReqList", "strLanDivRcd");
	
	util.DataMap.setValue(app, "dmReqListOperSbp", "strOprtRoleId", vsOprtRoleId);
	util.DataMap.setValue(app, "dmReqListOperSbp", "strLanDivRcd", vsLanDivRcd);
	
	util.Submit.send(app, "subListOperSbp", function(pbSuccess){
		if(pbSuccess){
			util.Control.redraw(app, "grdCmnOperSbp");
			
			//조회 후 콜백함수 수행
			if(util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
		}
	});
}

/**
 * @desc 서브페이지목록에서 선택한 메뉴를 업무역할별 서브페이지 목록에 등록한다.
 */
function insertSelectedPgm(){
	var vsPgmIdx = util.Grid.getCheckOrSelectedRowIndex(app, "grdCmnPgm");
	var vsOprtRoleId = util.DataMap.getValue(app, "dmReqListOperSbp", "strOprtRoleId");
	
	if(ValueUtil.isNull(vsPgmIdx) || ValueUtil.isNull(vsOprtRoleId)){
		//이관할 데이터를 선택하세요.
		util.Msg.alert("NLS-INF-M006");
		return;
	}
	
	var vaIdxs = null;
	if(String(vsPgmIdx).indexOf(",") != -1){
		vaIdxs = String(vsPgmIdx).split(",");
	}else{
		vaIdxs = new Array();
		vaIdxs[0] = vsPgmIdx;
	}
	
	//프로그램목록에서 선택한 로우를 찾아 그리드에 입력한다.
	var vbResult = validAndInsertData(vaIdxs);
	
	//완료된 경우 이관되었습니다.
	if(vbResult) util.Msg.alert("NLS-INF-M007");
}

function validAndInsertData(paPgmIdxs){
	if(paPgmIdxs == null){
		return false;
	}
	
	for(var i = 0 ; i < paPgmIdxs.length ; i++){
		var vnTgtIdx = paPgmIdxs[i];
		
		var vsPgmId = util.Grid.getCellValue(app, "grdCmnPgm", "PGM_ID", vnTgtIdx);
		var vsPgmNm = util.Grid.getCellValue(app, "grdCmnPgm", "PGM_NM", vnTgtIdx);
		var vsOprtRoleId = util.DataMap.getValue(app, "dmReqListOperSbp", "strOprtRoleId");
		var vsLanDivRcd = util.DataMap.getValue(app, "dmReqListOperSbp", "strLanDivRcd");
		
		//기존에 존재하는 지 데이터 확인
		if(isExistData(vsPgmId, vsOprtRoleId)){
			continue;
		}
		
		//신규 행 생성
		var vnInsIdx = util.Grid.insertRow(app, "grdCmnOperSbp");
		
		util.Grid.setCellValue(app, "grdCmnOperSbp", "PGM_ID", vsPgmId, vnInsIdx);
		util.Grid.setCellValue(app, "grdCmnOperSbp", "PGM_NM", vsPgmNm, vnInsIdx);
		util.Grid.setCellValue(app, "grdCmnOperSbp", "OPRT_ROLE_ID", vsOprtRoleId, vnInsIdx);
		util.Grid.setCellValue(app, "grdCmnOperSbp", "LAN_DIV_RCD", vsLanDivRcd, vnInsIdx);
		util.Grid.setCellValue(app, "grdCmnOperSbp", "DOWNLOAD_YN", "Y", vnInsIdx);
		
		//기본값 입력
		util.Grid.setCellValue(app, "grdCmnOperSbp", "MENU_AUTH_DIV_RCD", "CC00701", vnInsIdx);
	}
	return true;
}

/**
 * @desc 메뉴의 인스턴스 로우로 리피트에 이미 존재하는지 체크
 * @param psPgmId
 * @param psOprtRoleId
 */
function isExistData(psPgmId, psOprtRoleId){
	var vbResult = false;
	
	//비교 조건문 생성
	var vsCondition = "PGM_ID == '" + psPgmId + "' && OPRT_ROLE_ID == '" + psOprtRoleId + "'";
	
	//해당 데이터 존재여부 체크
	var vnExistDataCnt = null;
	var voExistData = util.DataSet.findRow(app, "dsCmnOperSbp", vsCondition, true);
	if(!ValueUtil.isNull(voExistData))	vnExistDataCnt = voExistData.length;
	if(vnExistDataCnt > 0){
		vbResult = true;
	}  
	
	return vbResult;
}

/**
 * @desc 저장
 */
function doSave(){
	//그리드 변경사항 체크
	if(!util.Grid.isModified(app, "grdCmnOperSbp", "MSG")){
		return false;
	}
	
	//그리드 validation check
	if(!util.validate(app, "grdCmnOperSbp")) return false;
	
	util.Submit.send(app, "subSave", function(pbSuccess){
		if(pbSuccess){
			doListCmnOperMenu(function(pbListSuccess){
				//갱신된 데이터가 조회되었습니다.
				if(pbListSuccess) util.Msg.alert("NLS-INF-M025");
			});
		}
	})
}

/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	//서브미션 실행 (실패시 cover page)
	util.Submit.send(app, "subOnLoad", function(pbSuccess){
		if(pbSuccess){
			//기본 언어키로 초기값 설정
			util.DataMap.setValue(app, "dmReqList", "strLanDivRcd", util.getSystemLocale(app));
			
			//조회조건 콤보박스 리드로우
			util.Control.redraw(app, "cbbLanDivRcd");
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
	//데이터 변경상태 체크 메세지
	if(util.Grid.isModified(app, )){
		return false;
	}
	
	if(!util.validate(app, "grpSearch")) return false;
	
	doList(function(pbSuccess){
		//조회되었습니다.
		util.Msg.alert("NLS-INF-M024");
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
function onGrdCmnRoleSelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grdCmnRole = e.control;
	if(util.Grid.getIndex(app, "grdCmnRole") == -1){
		return false;
	}
	doListCmnOperMenu();
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
	util.Grid.deleteRow(app, "grdCmnOperSbp");
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
	util.Grid.revertRowData(app, "grdCmnOperSbp");
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
 * "" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnInsertClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnInsert = e.control;
	insertSelectedPgm();
}
