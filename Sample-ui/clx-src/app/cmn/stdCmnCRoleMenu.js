var util = new ComUtil(app);

var maDtlCtrls = ["btnDel", "btnRestore", "btnSave", "btnInsert"];
/**
 * @desc 조회
 * @param poCallBackFunc 조회 후 콜백함수
 */
function doList(poCallBackFunc){
	util.Submit.send(app, "subList", function(pbSuccess){
		if(pbSuccess){
			util.Control.redraw(app, "grdCmnRole");
			util.Control.redraw(app, ["trvCmnMenu"]);
			
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

/**
 * @desc 권한 대상자 목록에서 로우 변경시 데이터셋 변경 상태를 체크하여 진행방향 결정
 * 			(전환 전 기존 프로그램의 경우 자동저장을 하였지만 데이터 체크프로세스가 바뀌었으므로 저장은 수행하지 않는다.)
 * @param psGrdId 그리드 아이디
 */
function isChangeUptStatus(psGrdId){
	var vbIsChanged = false;
	
	if(util.Grid.isModified(app, psGrdId)){
		//@1에 변경된 데이터가 있습니다. 계속 진행하시겠습니까?
		//1 : true 2 : false
		//TODO getLabelIdValue(gridId) 추가 시 수정
		if(util.Msg.confirm("NLS-CRM-M056", [app.lookup(psGrdId).fieldLabel]) == 1){
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
 * @param poCallBackFunc 콜백함수
 * @param psStatus
 */
function doListCmnOperMenu(poCallBackFunc, psStatus){
	//이전에 선택했던 행을 가져오는 방법이 e.oldSelection 이고, selectRows를 했을 때 selection-change가 연속적으로 발생해 before-selection-change에서 동작하도록 수정
//	if(psStatus != "save"){
		//데이터 변경상태 체크 메세지
//		if(util.Grid.isChangedFormData()){
//			util.Grid.selectRows("grdCmnRole", ExtRepeat.getBeforeFocusRowIdx("grdCmnRole"), false);
//			 return false;
//		}
//	}
	
	//업무역할 목록에서 조회 키값 설정
	var vnIdx = util.Grid.getIndex(app, "grdCmnRole");
	var vsOprtRoleId = util.Grid.getCellValue(app, "grdCmnRole", "OPRT_ROLE_ID", vnIdx);
	var vsOprtRoleNm = util.Grid.getCellValue(app, "grdCmnRole", "OPRT_ROLE_NM", vnIdx);
	var vsLanDivRcd = util.DataMap.getValue(app, "dmReqList", "strLanDivRcd");
	
	util.DataMap.setValue(app, "dmReqListOperMenu", "strOprtRoleId", vsOprtRoleId);
	util.DataMap.setValue(app, "dmReqListOperMenu", "strLanDivRcd", vsLanDivRcd);
	util.Control.setValue(app, app, "lblSelectedRoleNm", "[" + vsOprtRoleNm + "]");
	util.Control.redraw(app, "lblSelectedRoleNm");
	
	util.Submit.send(app, "subListOperMenu", function(pbSuccess){
		if(pbSuccess){
			util.Control.redraw(app, "grdCmnOperMenu");
			
			//조회 후 콜백함수 수행
			if(util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
		}
	});
}

/**
 * @desc 메뉴목록(트리)에서 선택한 메뉴를 업무역할별 메뉴 목록에 등록한다.
 */
function insertSelectedMenu(){
	var vsMenuKeySet = util.Tree.getSelectedValue(app, app, "trvCmnMenu", "VALUE");
	var vsOprtRoleId = util.DataMap.getValue(app, "dmReqListOperMenu", "strOprtRoleId");
	
	//String(vsmenuKeySet).isEmpty() 사용할 경우, "undefined"로 변환되어 ValueUtil.isNull(vsMenuKeySet) 사용
	if(ValueUtil.isNull(vsMenuKeySet) || String(vsOprtRoleId).isEmpty()){
		//이관할 데이터를 선택하세요.
		util.Msg.alert("NLS-INF-M006");
		return false;
	}
	
	var vaKeys = null;
	if(String(vsMenuKeySet).indexOf(",") != -1){
		vaKeys = String(vsMenuKeySet).split(",");
	}else{
		vaKeys = new Array();
		vaKeys[0] = vsMenuKeySet;
	}

	maMissKeys = [];
	for(var i = 0 ; i < vaKeys.length ; i++){
		maRelatedKeys = []; //초기화
		
		var vsKeySet = vaKeys[i];
		
		//부모 자식키를 전역변수에 담는다.
		getParentKeys(vsKeySet, true);
		getChildKeys(vsKeySet);
		
		//전역변수에 담은 키값들로 메뉴목록을 찾아 그리드에 입력한다.
		validAndInsertData(maRelatedKeys);
					
		//처리된 메뉴가 0건 이상인 경우 이관되었습니다. 표시
		if(maRelatedKeys.length > 0) util.Msg.alert("NLS-INF-M007"); 
	}
}

var maRelatedKeys = [];
var maMissKeys = [];

/**
 * @desc 입력받은 키값의 부모메뉴의 키를 maRelatedKeys 에 등록한다.
 * @param psKey
 * @param pbIsFirst
 */
function getParentKeys(psKey, pbIsFirst){
	var vsParentKey = util.DataSet.findRow(app, "dsTrvCmnMenu", "KEYSET == '" + psKey + "'");
	if(pbIsFirst != true){
		maRelatedKeys.push(psKey);
	}
	if(!vsParentKey) getParentKeys(vsParentKey);
}

/**
 * @desc 입력받은 키값과, 자식메뉴의 키를 maRelatedKeys에 등록한다.
 * @param psKey
 */
function getChildKeys(psKey){
	maRelatedKeys.push(psKey);
	
	//입력받은 키를 부모키로 가지는 메뉴 가져옴
	var voChildList = util.DataSet.findRow(app, "dsTrvCmnMenu", "UKEYSET == '" + psKey + "'", true);
	
	if(voChildList == null) return;
	
	var vnChildCnt = voChildList.length;
	for(var i = 0 ; i < vnChildCnt ; i++){
		var vsChildKey = util.DataSet.getValue(app, "dsTrvCmnMenu", voChildList[i].getIndex(), "KEYSET");
		
		//자식키 스스로가 자식키를 가지고 있을 경우 새로 검색
		//없을 경우 자식키만 maRelatedKey에 등록
		var vnChildChildCnt = util.DataSet.findRow(app, "dsTrvCmnMenu", "UKEYSET == '" + vsChildKey + "'", true).length;
		if(vnChildChildCnt == 0 || vnChildChildCnt == null){
			maRelatedKeys.push(vsChildKey);
		}else{
			getChildKeys(vsChildKey);
		}
	}
}

/**
 * @desc 입력받은 키값의 배열을 그리드에 존재하는지 체크 후 없는 경우 등록한다.
 * @param paKeys
 */
function validAndInsertData(paKeys){
	if(paKeys == null) return;
	
	for(var i = 0 ; i < paKeys.length ; i++){
		var voKeyRow = util.DataSet.findRow(app, "dsTrvCmnMenu", "KEYSET == '" + paKeys[i] + "'");
		var vsMenuNm = voKeyRow.getRowData().MENU_NM;
		
		if(voKeyRow == null) continue;
		
		if(!isExistData(voKeyRow)) insertToGrid(voKeyRow);
		else maMissKeys.push("[" + vsMenuNm + "]");
	}
}

/**
 * @desc 메뉴의 로우를 그리드에 등록
 * @param poKeyRow
 */
function insertToGrid(poKeyRow){
	//신규 행 생성
	var vnInsIdx = util.Grid.insertRow(app, "grdCmnOperMenu", "gdCbbMenuAuthDivRcd");
	
	//선택한 메뉴의 각 컬럼값을 신규행에 입력
	for(var i = 0 ; i < maCompareCols.length ; i++){
		var vsCompareValue = util.DataSet.getValue(app, "dsTrvCmnMenu", poKeyRow.getIndex(), maCompareCols[i]);
		util.Grid.setCellValue(app, "grdCmnOperMenu", maCompareCols[i], vsCompareValue, vnInsIdx);
	}
	
	//디테일 조회 키값으로 값 입력
	var vsOprtRoleId = util.DataMap.getValue(app, "dmReqListOperMenu", "strOprtRoleId");
	util.Grid.setCellValue(app, "grdCmnOperMenu", "OPRT_ROLE_ID", vsOprtRoleId, vnInsIdx);
	
	//기본값 입력
	util.Grid.setCellValue(app, "grdCmnOperMenu", "MENU_AUTH_DIV_RCD", "CC00701", vnInsIdx);
	util.Grid.setCellValue(app, "grdCmnOperMenu", "AUTH_RNG_RCD", "CC00102", vnInsIdx);
	
	if(util.Grid.getCellValue(app, "grdCmnOperMenu", "PGM_ID", vnInsIdx) != "MENUHEADER")
		util.Grid.setCellValue(app, "grdCmnOperMenu", "DOWNLOAD_YN", "Y", vnInsIdx);
}

//비교할 컬럼 목록
var maCompareCols = ["MENU_ID", "MENU_NM", "PGM_ID", "PGM_NM", "LAN_DIV_RCD"];

/**
 * @desc 메뉴의 로우로 그리드에 이미 존재하는지 체크
 * @param poKeyRow
 */
function isExistData(poKeyRow){
	var vbResult = false;
	var vsCondition = "";
	
	//비교 조건문 생성
	for(var i = 0 ; i < maCompareCols.length ; i ++){
		if(i > 0){
			vsCondition += " && ";
		}
		var vsConValue = util.DataSet.getValue(app, "dsTrvCmnMenu", poKeyRow.getIndex(), maCompareCols[i]);
		vsCondition += maCompareCols[i] + " == '" + vsConValue + "'";
	}
	
	//해당 데이터 존재여부 체크
	var vnExistDataCnt = null;
	var voExistData = util.DataSet.findRow(app, "dsCmnOperMenu", vsCondition, true);
	if(!ValueUtil.isNull(voExistData))	vnExistDataCnt = voExistData.length;
	if(vnExistDataCnt > 0){
		vbResult = true;
	}
	
	return vbResult;
}

var msOprtRoleIdBefSave = "";

/**
 * @desc 저장
 */
function doSave(){
	//그리드 변경사항 체크
	if(!util.Grid.isModified(app, "grdCmnOperMenu", "MSG")){
		return false;
	}
	
	//그리드 validation check
	if(!util.validate(app, "grdCmnOperMenu")) return false;
	
	//이전 로우를 찾아가기 위하여 저장
	msOprtRoleIdBefSave = util.DataMap.getValue(app, "dmReqListOperMenu", "strOprtRoleId");
	
	util.Submit.send(app, "subSave", function(pbSuccess){
		if(pbSuccess){
			doListCmnOperMenu(function(pbListSuccess){
				//조회 : 갱신된 데이터가 조회되었습니다.
				if(pbListSuccess) util.Msg.alert("NLS-INF-M025");
			}, "save");
		}
	})
}

/**
 * 
 */
function doCopyRoleSave(){
	util.Submit.send(app, "subCopyRole", function(pbSuccess){
		if(pbSuccess){
			var vsCopyOprtRoldId = util.DataMap.getValue(app, "dmReqList", "strCopyOprtRoleId");
			
			util.Control.setValue(app, app, "ipbOprtRoleId", vsCopyOprtRoldId);
			util.Control.setValue(app, app, "ipbOprtRoleNm", "");
			
			doList(function(pbSuccess){
				if(pbSuccess){
					var vnFindIdx = util.DataSet.findRow(app, "grdCmnRole", "OPRT_ROLE_ID == '" + vsCopyOprtRoldId + "'").getIndex();
					util.Grid.selectRow(app, "grdCmnRole", vnFindIdx);
					
					util.Msg.alert("NLS-INF-M024");
				}
			});
		}
	})	
}

/**
 * @desc 메뉴 목록 필터
 */
function doFilterMenu(){
	var vsFilterMenuIdNm = util.Control.getValue(app, "ipbMenuIdNm"); //검색어
	/**@type cpr.controls.Grid*/
	var vcGrdCmnOperMenu	= app.lookup("grdCmnOperMenu");
	
	vcGrdCmnOperMenu.clearFilter(); //기존 필터 제거
	var vsConditoin = "MENU_ID *= '" + vsFilterMenuIdNm + "' || MENU_NM *= '" + vsFilterMenuIdNm + "'";
	vcGrdCmnOperMenu.filter(vsConditoin);
}

/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	//서브미션 실행
	util.Submit.send(app, "subOnLoad", function(pbSuccess){
		if(pbSuccess){
			//기본 언어키로 초기값 설정
			util.DataMap.setValue(app, "dmReqList", "strLanDivRcd", util.getSystemLocale(app));
			//조회조건 콤보박스 리빌드
			util.Control.redraw(app, ["cbbLanDivRcd", "cbbCopyRole"]);
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
	//XXX 변경사항에 대한 메세지 뜨지 않아 isChangedFormData 사용
	if(util.Grid.isModified(app, "grdCmnOperMenu", "CRM")){
		return false;
	}
	
	if(!util.validate(app, "grpSearch")) return false;
	
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
 * 그리드에서 before-selection-change 이벤트 발생 시 호출.
 * detail의 cell 클릭하여 설정된 selectionunit에 해당되는 단위가 선택되기 전에 발생하는 이벤트.
 */
function onGrdCmnRoleBeforeSelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grdCmnRole = e.control;
	if(util.Grid.isModified(app, "grdCmnOperMenu", "CRM")){
		return false;
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
function onBtnSaveRoleClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnSaveRole = e.control;
	var vsSourceRoleNm = util.Grid.getCellValue(app, "grdCmnRole", "OPRT_ROLE_NM");
	var vsSourceRoleId = util.Grid.getCellValue(app, "grdCmnRole", "OPRT_ROLE_ID");
	var vsTargetRoleId = util.Control.getValue(app, "cbbCopyRole");
	
	if(ValueUtil.isNull(vsTargetRoleId) || ValueUtil.isNull(vsSourceRoleId) ) return;
	
	var vsTargetRoleNm = util.SelectCtl.getLabelByValue(app, ("cbbCopyRole", vsTargetRoleId);
		
	if(confirm(util.Msg.getMsg("NLS-CMM-M050", [vsSourceRoleNm, vsTargetRoleNm])) != 1)	return;
	
	doCopyRoleSave();
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
	insertSelectedMenu();
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
 * "" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnDelClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnDel = e.control;
	util.Grid.deleteRow(app, "grdCmnOperMenu");
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
	util.Grid.revertRowData(app, "grdCmnOperMenu");
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
function onBtnSearchMenuClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnSearchMenu = e.control;
	doFilterMenu();
}

/*
 * 그리드에서 selection-change 이벤트 발생 시 호출.
 * detail의 cell 클릭하여 설정된 selectionunit에 해당되는 단위가 선택될 때 발생하는 이벤트.
 */
function onGrdCmnOperMenuSelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grdCmnOperMenu = e.control;
//	util.Control.refreshBind("bndMenuHeaderYn");
}
