var util = new ComUtil(app);

// 데이터셋목록 PK
var msPkValues = "";

/**
 * @desc  조회버튼이벤트(데이터셋목록을 조회한다.)
 * @param {Object} 서브미션 실행 후 처리될 콜백 함수
 * @return 데이터셋목록 조회
 */
function doList(poCallBackFunc) {
	util.Submit.send(app, "subList", "list", function(pbSuccess){
		if(pbSuccess){
			util.Control.redraw(app, "grdCmnDataset");
														
			// 조회 후 콜백함수 수행
			if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
		}
	});
}

/**
 * @desc  doListMstRowSelectDtl(데이터셋목록 선택된 행을 통해 사용업무역할별목록을 조회한다.)  
 * @param {Function} poCallBackFunc 콜백정의
 * @return void
 */
function doListMstRowSelectDtl(poCallBackFunc) {
	// 데이터셋목록 현재선택된 행
	var vnIdx = util.Grid.getIndex(app, "grdCmnDataset");
	
	// 데이터셋목록의 SQL_ID
	var vsSqlId = util.Grid.getCellValue(app, "grdCmnDataset", "SQL_ID", vnIdx);
	util.DataMap.setValue(app, "dmReqListOper", "strSqlId", vsSqlId);	
	// 데이터셋목록의 언어키
	var vsLanDivRcd = util.Grid.getCellValue(app, "grdCmnDataset", "LAN_DIV_RCD", vnIdx);
	util.DataMap.setValue(app, "dmReqListOper", "strLanDivRcd", vsLanDivRcd);	
	
	util.Submit.send(app, "subListRole", function(pbSuccess){
		if(pbSuccess){
			msPkValues = util.Grid.getRowPKColumnValues(app, "grdCmnDataset", vnIdx);
			
			util.Control.redraw(app, ["grdCmnDatasetRole", "grdNonCmnDatasetRole"]);
														
			// 조회 후 콜백함수 수행
			if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
		}
	});
}

/**
 * @desc  [미사용 업무역할] -> [사용업무역할] move 함수
 * @return void
 */
function moveRoleUp(){
	// 미사용 업무역할 그리드 선택된 건 가져오기 
	var vsNonSelIdx = util.Grid.getCheckOrSelectedRowIndex(app, "grdNonCmnDatasetRole");
	
	var vsNonCmnRoleGrdNm = util.Grid.getTitle(app, "grdNonCmnDatasetRole"); 
	var vsCmnRoleGrdNm = util.Grid.getTitle(app, "grdCmnDatasetRole");
	
	if(String(vsNonSelIdx).isEmpty()){
		util.Msg.alert("NLS-INF-M045", [vsNonCmnRoleGrdNm]);
		return;
	}
	
	var vaIdxNon = null;
	if(String(vsNonSelIdx).indexOf(",") != -1){
		vaIdxNon = String(vsNonSelIdx).split(",");
	}else{
		vaIdxNon = new Array();
		vaIdxNon[0] = vsNonSelIdx;
	}
	
	for(var i = 0; i < vaIdxNon.length; i++){
		var vnIdx = vaIdxNon[i];
		
		// [사용 업무역할] 그리드의 새로운 행을 추가한다.
		var vnNewRowIdx = util.Grid.insertRow(app, "grdCmnDatasetRole");
		
		// [미사용 업무역할] 그리드에서 선택한 내역을 set한다.
		var vsRoleId = util.Grid.getCellValue(app, "grdNonCmnDatasetRole", "OPRT_ROLE_ID", vnIdx);		  // 업무역할ID
		var vsRoleNm = util.Grid.getCellValue(app, "grdNonCmnDatasetRole", "OPRT_ROLE_NM", vnIdx);	  // 업무역할명
		var vsLanDivRcd = util.Grid.getCellValue(app, "grdNonCmnDatasetRole", "LAN_DIV_RCD", vnIdx);      // 언어키
		var vsSqlId = util.Grid.getCellValue(app, "grdNonCmnDatasetRole", "SQL_ID", vnIdx);				         // SQL아이디
		
		util.Grid.setCellValue(app, "grdCmnDatasetRole", "OPRT_ROLE_ID", vsRoleId, vnNewRowIdx);
		util.Grid.setCellValue(app, "grdCmnDatasetRole", "OPRT_ROLE_NM", vsRoleNm, vnNewRowIdx);
		util.Grid.setCellValue(app, "grdCmnDatasetRole", "LAN_DIV_RCD", vsLanDivRcd, vnNewRowIdx);
		util.Grid.setCellValue(app, "grdCmnDatasetRole", "SQL_ID", vsSqlId , vnNewRowIdx);
	}
	doSave();
}

/**
 * @desc  [사용 업무역할] -> [미사용 업무역할] move 함수
 * @return void
 */
function moveRoleDown(){
	// 사용 업무역할 그리드 선택된 건 가져오기 
	var vsSelIdx = util.Grid.getCheckOrSelectedRowIndex(app, "grdCmnDatasetRole");
	
	var vsNonCmnRoleGrdNm = util.Grid.getTitle(app, "grdNonCmnDatasetRole"); 
	var vsCmnRoleGrdNm = util.Grid.getTitle(app, "grdCmnDatasetRole");
	
	if(String(vsSelIdx).isEmpty()){
		util.Msg.alert("NLS-INF-M045", [vsCmnRoleGrdNm]);
		return;
	}
	
	var vaIdx = null;
	if(String(vsSelIdx).indexOf(",") != -1){
		vaIdx = String(vsSelIdx).split(",");
	}else{
		vaIdx = new Array();
		vaIdx[0] = vsSelIdx;
	}
					
	for(var i = 0; i < vaIdx.length; i++){
		var vnIdx = vaIdx[i];
		var vnNewRowIdx = null;
		
		util.Grid.deleteRow(app, "grdCmnDatasetRole");
	}
	doSave();
}

/**
 * @desc  [사용업무역할] 정보 저장한다.
 * @param {Function} poCallBackFunc 콜백정의
 * @return void
 */
function doSave(poCallBackFunc) {
	// 그리드 변경사항 체크(사용자 업무역할)
	if(!util.Grid.isModified(app, ["grdCmnDatasetRole"])){
		util.Msg.warn("M007");
		return false;
	}
	
	//그리드 validation check
	if(!util.validate(app, ["grdCmnDatasetRole"])) return false;
	
	util.Submit.send(app, "subSave", function(pbSuccess){
		if(pbSuccess){
			doList(function(pbListSuccess) {
				// 저장 : "갱신된 데이터가 조회되었습니다." header 메세지 표시
				if(pbListSuccess){
					// 사용, 미사용 업무역할 리피트 clear처리 
					util.Control.reset(app, app, ["grdCmnDatasetRole", "grdNonCmnDatasetRole"]);			
					
					// 데이터셋목록 PK컬럼에 따른 로우 셀렉트
					if(msPkValues != ""){
						//TODO 수정
						util.Grid.selectRowByCondition(app, "grdCmnPgm", msPkValues);
					}
					util.Msg.alert("NLS-INF-M025");
				}
				if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbListSuccess);
			});
		}
	});
}

/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	//서브미션 실행
	util.Submit.send(app, "subOnLoad", function(pbSuccess){
		if(pbSuccess){
			//조회조건 콤보박스 언어키 redraw
			util.Control.redraw(app, "cbbLanDivRcd");
			//언어키 콤보박스 디폴트셋팅
			util.Control.setValue(app, app, "cbbLanDivRcd", util.getDefaultLocale(app));
			//조회조건 데이터셋명 포커스 처리
			util.Control.setFocus(app, "ipbDatasetNm");
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
	doList(function(pbSuccess){
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
function onGrdCmnDatasetSelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grdCmnDataset = e.control;
	if(util.Grid.getIndex(app, "grdCmnDataset") == -1){
		return false;
	}
	
	doListMstRowSelectDtl();
}

/*
 * "" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnUpClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnUp = e.control;
	moveRoleUp();
}

/*
 * "" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnDownClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnDown = e.control;
	moveRoleDown();
}
