var util = new ComUtil(app);

/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */e){

	//서브미션 실행 (실패시 cover page)
	util.Submit.send(app, "subOnLoad", function(pbSuccess){
		if(pbSuccess){
			util.Control.redraw(app, "frfCmnModBoard");
			// 콤보박스 컨트롤 리드로우
			util.Control.redraw(app, "cbbUnitSystemRcd", "cbbRegDivRcd", "ckbActStatRcd");
			// 조치상태 체크박스 전체 체크 
			util.SelectCtl.setAllChkItem("cbgActStatRcd");
			
			// 등록일자 자동 셋팅(현재일 한달전 ~ 현재일자)
			var vsCurDt = util.DataMap.getValue(app, "dmResOnLoad", "strCurDt");// 현재일자
			var vsLastDt = DateUtil.addDate(vsCurDt, -30);// 한달전
			
			util.Control.setValue(app, app, "dipRegStDt", vsLastDt);// 등록시작일자
			util.Control.setValue(app, app, "dipRegEndDt", vsCurDt);// 등록종료일자);
			
			var vsAuthRngRcd = util.Auth.getMenuInfo(app).get("AUTH_RNG_RCD");
			
			if(vsAuthRngRcd == "CC00104"){
				//세션정보를 이용해 사용자ID값 세팅
				util.Control.setValue(app, app, "ipbRegtntId", util.Auth.getUserInfo(app, "USER_ID"));
				util.Control.setValue(app, app, "optRegtntNm", util.Auth.getUserInfo(app, "USER_NM"));
				var vaCtlIds = ["btnRegtntNm", "ipbRegtntId", "cbbFrfRegDivRcd"]
				util.Control.setEnable(app, false, vaCtlIds);
			}
			
			/**
			 * @type cpr.controls.Button
			 */
			var vcBtnSearch = app.lookup("btnSearch");
			vcBtnSearch.click();
		}
	}, true);
}

/**
 * @desc 조회버튼 이벤트(단위시스템 목록을 조회한다.)
 * @param poCallBackFunc 콜백함수
 * @author Kim Bora 2015. 11. 11.
 */
function doList(poCallBackFunc){
	// 1. 조회 서브미션 호출
	util.Submit.send(app, "subList", function(pbSuccess){
		if(pbSuccess){
			// 단위시스템목록 
			util.Control.redraw(app, "grdCmnModBoardUnit");
			
			var vnCnt = util.Grid.getRowCount(app, "grdCmnModBoardUnit");
			var vaCtlIds = ["grdCmnModBoard", "frfCmnModBoard"];
			
			if(vnCnt == 0){
				util.Control.reset(app, "frfCmnModBoard");
				util.Control.reset(app, app, "grdCmnModBoard");
				util.Control.setEnable(app, false, vaCtlIds);
			}else{
				util.Control.setEnable(app, true, vaCtlIds);
			}
			
			if(util.isFunc(poCallBackFunc))poCallBackFunc(pbSuccess);
		}
	});
}

/**
 * @desc  [의뢰내역] 리피트를 조회한다.
 *             (단위시스템 rowSelect시, 작업저장시) 
 * @param poCallBackFunc 콜백함수
 * @author Kim Bora 2015. 11. 11.
 */
function doListCmnModBoard(poCallBackFunc){
	// 1. 단위시스템목록의 선택된 행 값을 가져와 조회값 셋팅
	var vsSubSystId = util.Grid.getCellValue(app, "grdCmnModBoardUnit", "SUB_SYST_ID");// 단위시스템ID

	util.DataMap.setValue(app, "dmReqListBoard", "strSubSysId", vsSubSystId);
	
	util.Submit.send(app, "subListBoard", function(pbSuccess){
		if(pbSuccess){
			util.Control.redraw(app, "grdCmnModBoard");
			// 건수 요약 컨트롤 리빌드
			var vaCtlIds = ["lblRowCnt_grdCmnModBoard", "lblAllCnt", "lblUnCmplCnt", "lblAcceptCnt", "lblCmplCnt", "lblPostPoneCnt", "lblPlanCnt"];
			util.Control.redraw(app, vaCtlIds);
			
			var vnCnt = util.Grid.getRowCount(app, "grdCmnModBoard");
			
			if(vnCnt < 1){
				util.Control.reset(app, app, "grdCmnModBoard");
				util.Control.reset(app, "frfCmnModBoard");
				util.Control.setEnable(app, false, "frfCmnModBoard");
			}else{
				util.Control.setEnable(app, true, "frfCmnModBoard");
			}
			
			// 조회 후 콜백함수 수행
			if(util.isFunc(poCallBackFunc))poCallBackFunc(pbSuccess);
		}
	});
}

/**
 * @desc 작업저장 event
 * @return void 
 * @author Kim Bora 2015. 11. 11.
 */
function doSave(){
	// 리피터 변경사항 체크
	if(!util.Grid.isModified(app, "grdCmnModBoard", "MSG")){
		return false;
	}
	//리피트 validation check				
	if(!util.validate(app, "grdCmnModBoard"))return false;
	
	util.Submit.send(app, "subSave", function(pbSuccess){
		if(pbSuccess){
			var vsPkValue = util.DataMap.getValue(app, "dmResList", "strUnitSysteRcd");
			
			if(!ValueUtil.isNull(vsPkValue)){
				util.Grid.setFindRowCondition(app, "grdCmnModBoardUnit", vsPkValue);
			}
			
			doList(function(pbListSuccess){
				// 조회 : "조회되었습니다." header 메세지 표시
				if(pbListSuccess){
					// MSG : 갱신된 데이터가 조회되었습니다. header 메시지 표시
					util.Msg.notify(app, "NLS-INF-M025");
				}
			});
		}
	});
}

/**
 * @desc 리피트 rowSelect event
 * @return void 
 * @author Kim Bora 2015. 11. 11.
 */
function doSelectGrdCmnModBoard(){
	var vnIndex = util.Grid.getIndex(app, "grdCmnModBoard");
	// 프리폼 활성화 비활성화 제어
	doCompareFrfEnable(vnIndex);
}

/**
 * @desc 셀렉트 여부에 따라 프리폼 활성화 제어
 * @param {Number} pnIndex 
 * @return void
 * @author Kim Bora 2015. 11. 11.
 */
function doCompareFrfEnable(pnIndex){
	if( (util.Grid.getIndex(app, "grdCmnModBoard")) < 0 || util.Control.getUserAttr(app, "grdCmnModBoard", "enabled") == "false"
				|| util.Grid.getRowState(app, "grdCmnModBoard", pnIndex)==cpr.data.tabledata.RowState.DELETED) {
					util.Control.setEnable(app, false, "frfCmnModBoard");	
	} else {
		util.Control.setEnable(app, true, "frfCmnModBoard");	
	}
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
	
	if(util.Grid.isModified(app, )){
		return false;
	}
	
	doList(function(pbSuccess){
		// MSG : 조회되었습니다. header 메시지 표시
		if(pbSuccess){
			util.Control.redraw(app, "lblRowCnt_grdCmnModBoardUnit");
		}	util.Msg.notify(app, "NLS-INF-M024");
	})
}

/*
 * 그리드에서 selection-change 이벤트 발생 시 호출.
 * detail의 cell 클릭하여 설정된 selectionunit에 해당되는 단위가 선택될 때 발생하는 이벤트.
 */
function onGrdCmnModBoardUnitSelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grdCmnModBoardUnit = e.control;
	
	var vnIndex = util.Grid.getIndex(app, "grdCmnModBoardUnit");
	
	if(vnIndex != -1){
		doListCmnModBoard();	
	}
}

/*
 * "" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnNewClick(/* cpr.events.CMouseEvent */ e){
	
	// 메뉴열기
//	var vsMenuId = util.Grid.getCellValue("grdCmnModBoard", "MENU_PGM_ID");
//	var vsTopMenuId = util.Grid.getCellValue("grdCmnModBoard", "TOP_MENU_ID");
	
	var vsMenuKey = util.DataSet.getValue(app, "dsCmnModBoard", util.Grid.getIndex(app, "grdCmnModBoard"), "MENU_KEY");
	if(vsMenuKey)
		util.doOpenAuthMenu(vsMenuKey);
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
	util.Grid.deleteRow(app, "grdCmnModBoard");
	
	if(util.Grid.getIndex(app, "grdCmnModBoard")){
		doSelectGrdCmnModBoard();
	}else{
		util.Control.setEnable(app, false, "frfCmnModBoard");
	}
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
 * 그리드에서 selection-change 이벤트 발생 시 호출.
 * detail의 cell 클릭하여 설정된 selectionunit에 해당되는 단위가 선택될 때 발생하는 이벤트.
 */
function onGrdCmnModBoardSelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grdCmnModBoard = e.control;
	doSelectGrdCmnModBoard();
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
	
	util.Grid.revertRowData(app, "grdCmnModBoard");
	
	if(util.Grid.getIndex(app, "grdCmnModBoard") > -1){
		doSelectGrdCmnModBoard();
	} else {
		util.Control.setEnable(app, false, ["frfCmnModBoard"]);
	}
}

/*
 * 콤보 박스에서 selection-change 이벤트 발생 시 호출.
 * ComboBox Item을 선택하여 선택된 값이 저장된 후에 발생하는 이벤트.
 */
function onCbbFrfActStatRcdSelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.ComboBox
	 */
	var cbbFrfActStatRcd = e.control;
	
	// 조치상태에 따른 조치일자 제어
	var vsActSts = util.Control.getValue(app, "cbbFrfActStatRcd"); // 조치상태

	if(vsActSts == "MGT0903" || vsActSts == "MGT0905"){
		
		var vsActDt = util.Control.getValue(app, "dipFrfActDt");
		var vsActPlanDt = util.Control.getValue(app, "dipFrfActPlanDt");
		
		var vsCurDt = util.DataMap.getValue(app, "dmResOnLoad", "strCurDt");
	if(ValueUtil.isNull(vsActDt)){
		util.Control.setValue(app, app, "dipFrfActDt", vsCurDt);
	}
	
	if(ValueUtil.isNull(vsActPlanDt)){
		util.Control.setValue(app, app, "dipFrfActPlanDt", vsCurDt);
	}
	
	}else{
		util.Control.setValue(app, app, "dipFrfActDt", "");
	}
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


