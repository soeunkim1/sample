var util = new ComUtil(app);

/**
 * @desc  조회버튼이벤트(데이터셋목록을 조회한다.)
 * @param {Object} 서브미션 실행 후 처리될 콜백 함수
 * @return 데이터셋목록 조회
 */
function doList(poCallBackFunc){
	util.Submit.send(app, "subList", function(pbSuccess){
		if(pbSuccess){
			util.Control.redraw(app, "grdCmnDataset");
			
			//마스터에 데이터가 없을 경우 디테일 입력 불가
			if(util.Grid.getRowCount(app, "grdCmnDataset") < 1){
				util.Control.setEnable(app, false, ["grpDataDtl", "grpDataParam", "grpDataCond"]);
				util.Control.reset(app, app, ["grdCmnDatasetDtl", "grdCmnDatasetParam"]);
			}else{
				//각 컨트롤 활성화 제어
				doMstGrdStatus();
				doDtlGrdStatus();
			}
			//조회 후 콜백함수 수행
			if(util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
		}
	});
}

/**
 * @desc   마스터(데이터셋) rowselect event
 *             디테일(컬럼정보/필수파라미터) 조회
 * @return void
 */
function doListMstRowSelectDtl() {
    // 컬럼정보 데이터 변경내역 체크
//		if(util.Grid.isChangedData(["grdCmnDatasetDtl"], "CRM")){
//			util.Grid.selectRow("rptCmnDataset", ExtRepeat.getBeforeFocusRowIdx("rptCmnDataset"), false);				
//			return false;
//		}else{
//			ExtRepeat.rebuild("rptCmnDatasetDtl");
//		}
//		// 필수파라미터 변경내역 체크 
//		if(ExtRepeat.isChangedData(["rptCmnDatasetParam"], "CRM")){ 
//			ExtRepeat.selectRow("rptCmnDataset", ExtRepeat.getBeforeFocusRowIdx("rptCmnDataset"), false);		
////		ExtControl.setEnable(false, ["grpDataDtl", "grpData", "grpDataCond"]);
//			return false;
//		}else{
//			ExtRepeat.rebuild("rptCmnDatasetParam");
//		}
//		
//		if(ExtRepeat.isChangedData(["rptCmnDatasetCond"], "CRM")){ 
//			ExtRepeat.selectRow("rptCmnDataset", ExtRepeat.getBeforeFocusRowIdx("rptCmnDataset"), false);		
////		ExtControl.setEnable(false, ["grpDataDtl", "grpData", "grpDataParam"]);
//			return false;
//		}else{
//			ExtRepeat.rebuild("rptCmnDatasetCond");
//		}
	
	if(util.Grid.getRowState(app, "grdCmnDataset") == cpr.data.tabledata.RowState.INSERTED){
		util.Control.reset(app, app, ["grdCmnDatasetDtl", "grdCmnDatasetParam","grdCmnDatasetCond"]);
		return false;
	}
				
	doListDtl();
}
	
/**
 * @desc  [데이터셋 목록] 그리드에 신규행을 추가한다. 
 * @return  void
 */
function doInsertDataset(){
	// 1. 데이터셋목록의 신규행을 추가한 후, 시작행을 데이터셋명으로 설정한다. --> 속성 제어
//	var vnNewIdx = util.Grid.insertRow("grdCmnDataset", "gdIpbDatasetNm");
	
	// 2. 디폴트값 셋팅 : 언어키
	util.Grid.setCellValue(app, "grdCmnDataset", "LAN_DIV_RCD", util.getDefaultLocale(app));
	
	// 3. 마스터 리피터 상태에따른 디테일 제어
	doMstGrdStatus();
}

/**
 * @desc  [데이터셋 목록] 그리드를 작업저장 한다. 
 * @param {Object} 서브미션 실행 후 처리될 콜백 함수	
 * @return  void
 */
function doSave() {
	// 그리드 변경사항 체크
	if(!util.Grid.isModified(app, "grdCmnDataset", "MSG")){
		return false;
	}
	//그리드 validation check
	if(!util.validate(app, "grdCmnDataset")) return false;

	util.Submit.send(app, "subSave", function(pbSuccess){
		if(pbSuccess){
			doList(function(pbListSuccess) {
				// 조회 : "갱신된 데이터가 조회되었습니다." header 메세지 표시
				if (pbListSuccess) util.Msg.alert("NLS-INF-M025");
			});
		}
	});
}

/**
 * @desc   마스터(데이터셋) rowselect event
 *             디테일(컬럼정보/필수파라미터) 조회
 * @return void
 */
function doListDtl(poCallBackFunc){
	// 데이터셋목록의 SQL_ID
	var vsSqlId = util.Grid.getCellValue(app, "grdCmnDataset", "SQL_ID");
	util.DataMap.setValue(app, "dmReqListDtlParam", "strSqlId", vsSqlId);
	// 데이터셋목록의 언어키
	var vsLanDivRcd = util.Grid.getCellValue(app, "grdCmnDataset", "LAN_DIV_RCD");
	util.DataMap.setValue(app, "dmReqListDtlParam", "strLanDivRcd", vsLanDivRcd);
	
	util.Submit.send(app, "subListDtl", function(pbSuccess){
		if(pbSuccess){
			util.Control.redraw(app, ["grdCmnDatasetDtl", "grdCmnDatasetParam", "grdCmnDatasetCond"]);

			// 각 컨트롤 활성화 제어
//			doDtlRptStatus();
//			doDtlParamRptStatus();
			doMstGrdStatus();
		}
		// 조회 후 콜백함수 수행
		if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess); 
	});
}
		
/**
 * @desc  마스터의 상태가 신규나 삭제가 있을경우 디테일(컬럼정보/필수파라미터) disable
 * @return void
 */
function doMstGrdStatus(){
	var vaGrpCtrl = ["grpDataDtl", "grpDataParam", "grpDataCond"];
	
	if(util.Grid.isModified(app, "grdCmnDataset")){
		util.Control.setEnable(app, false, vaGrpCtrl);
	}else{
		util.Control.setEnable(app, true, vaGrpCtrl);
	}
}		

/**
 * @desc  [컬럼정보 목록] 그리드에 신규행을 추가한다. 
 * @return  void
 */
function doInsertDatasetDtl(){
	var vnCnt = util.Grid.getRowCount(app, "grdCmnDatasetDtl"); // 컬럼정보목록 행 갯수
	// 1. 컬럼정보목록의 신규행을 추가한 후, 시작행을 컬럼명으로 설정한다. -> 신규행은 마지막행 아래에 추가함.
	var vnNewIdx = util.Grid.insertRow(app, "grdCmnDatasetDtl", vnCnt);
	
	// 2. 디폴트값 셋팅 : 언어키, 순번, 쿼리ID
	util.Grid.setCellValue(app, "grdCmnDatasetDtl", "LAN_DIV_RCD", util.getDefaultLocale(app), vnNewIdx);
	util.Grid.setCellValue(app, "grdCmnDatasetDtl", "SERIAL_NO", vnCnt+1, vnNewIdx);
	var vsSqlId = util.Grid.getCellValue(app, "grdCmnDataset", "SQL_ID"); // [데이터셋목록]의 쿼리ID
	util.Grid.setCellValue(app, "grdCmnDatasetDtl", "SQL_ID", vsSqlId, vnNewIdx);
	
	// 3. 디테일[컬럼정보]리피터 상태에따른 이외의 컨트롤제어
	doDtlGrdStatus();
}

/**
 * @desc  디테일[컬럼정보]의 상태가 편집상태 일경우  그외의 컨트롤(데이터셋/필수파라미터) disable
 * @return void
 */
function doDtlGrdStatus(){
	var vaGrpCtrl = ["grpData", "grpDataParam", "grpDataCond"];
	
	if(util.Grid.isModified(app, "grdCmnDatasetDtl")){
			util.Control.setEnable(app, false, vaGrpCtrl);
	}else{
		util.Control.setEnable(app, true, vaGrpCtrl);
	}
}

/**
 * @desc  [컬럼정보 목록] 그리드를 작업저장 한다. 
 * @param {Object} 서브미션 실행 후 처리될 콜백 함수	
 * @return  void
 */
function doSaveDtl() {
	// 리피터 변경사항 체크
	if(!util.Grid.isModified(app, "grdCmnDatasetDtl", "MSG")){
		return false;
	}
	//리피트 validation check
	if(!util.validate(app, "grdCmnDatasetDtl")) return false;

	util.Submit.send(app, "subSaveDtl", function(pbSuccess){
		if(pbSuccess){
			doListDatasetDtl(function(pbListSuccess) {
				//마스터 그리드내 디테일 건수 갱신(DTL_CNT 컬럼은 updateable : false로 설정)
				util.Grid.setCellValue(app, "grdCmnDataset", "DTL_CNT", util.Grid.getRowCount(app, "grdCmnDatasetDtl"));
					
				// 조회 : "갱신된 데이터가 조회되었습니다." header 메세지 표시
				if (pbListSuccess) util.Msg.alert("NLS-INF-M025");
			});
		}
	});
}

/**
 * @desc   컬럼정보조회
 * @return void
 */
function doListDatasetDtl(poCallBackFunc){
	// 데이터셋목록의 SQL_ID
	var vsSqlId = util.Grid.getCellValue(app, "grdCmnDataset", "SQL_ID");
	util.DataMap.setValue(app, "dmReqListDtlParam", "strSqlId", vsSqlId);
	// 데이터셋목록의 언어키
	var vsLanDivRcd = util.Grid.getCellValue(app, "grdCmnDataset", "LAN_DIV_RCD");
	util.DataMap.setValue(app, "dmReqListDtlParam", "strLanDivRcd", vsLanDivRcd);
	
	util.Submit.send(app, "subListDatasetDtl", function(pbSuccess){
		if(pbSuccess){
			util.Control.redraw(app, "grdCmnDatasetDtl");

			// 각 컨트롤 활성화 제어
			doDtlGrdStatus();
		}
		// 조회 후 콜백함수 수행
		if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess); 
	});
}

/**
 * @desc   필수파라미터 조회
 * @return void
 */
function doListDatasetParam(poCallBackFunc){
	// 데이터셋목록의 SQL_ID
	var vsSqlId = util.Grid.getCellValue(app, "grdCmnDataset", "SQL_ID");
	util.DataMap.setValue(app, "dmReqListDtlParam", "strSqlId", vsSqlId);
	// 데이터셋목록의 언어키
	var vsLanDivRcd = util.Grid.getCellValue(app, "grdCmnDataset", "LAN_DIV_RCD");
	util.DataMap.setValue(app, "dmReqListDtlParam", "strLanDivRcd", vsLanDivRcd);
	
	util.Submit.send(app, "subListDatasetParam", function(pbSuccess){
		if(pbSuccess){
			util.Control.redraw(app, "grdCmnDatasetParam");

			// 각 컨트롤 활성화 제어
			doDtlParamGrdStatus();
		}
		// 조회 후 콜백함수 수행
		if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess); 
	});
}

/**
 * @desc   필수파라미터 조회
 * @return void
 */
function doListDatasetCond(poCallBackFunc){
	// 데이터셋목록의 SQL_ID
	var vsSqlId = util.Grid.getCellValue(app, "grdCmnDataset", "SQL_ID");
	util.DataMap.setValue(app, "dmReqListDtlParam", "strSqlId", vsSqlId);
	// 데이터셋목록의 언어키
	var vsLanDivRcd = util.Grid.getCellValue(app, "grdCmnDataset", "LAN_DIV_RCD");
	util.DataMap.setValue(app, "dmReqListDtlParam", "strLanDivRcd", vsLanDivRcd);
	
	util.Submit.send(app, "subListDatasetCond", function(pbSuccess){
		if(pbSuccess){
			util.Control.redraw(app, "grdCmnDatasetCond");

			// 각 컨트롤 활성화 제어
			doDtlCondGrdStatus();
		}
		// 조회 후 콜백함수 수행
		if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess); 
	});
}
			
/**
 * @desc  [필수파라미터 목록] 그리드를 신규행을 추가한다. 
 * @return  void
 */
function doInsertDatasetParam(){
	var vnCnt = util.Grid.getRowCount(app, "grdCmnDatasetParam"); // 필수파라미터목록 행 갯수
	// 1. 필수파라미터목록의 신규행을 추가한 후, 시작행을 필수파라미터구분으로 설정한다. -> 신규행은 마지막행 아래에 추가함.
	var vnNewIdx = util.Grid.insertRow(app, "grdCmnDatasetParam", "gdCbbReqParamRcdParam", vnCnt);
	
	// 2. 디폴트값 셋팅 : 언어키, 쿼리ID
	util.Grid.setCellValue(app, "grdCmnDatasetParam", "LAN_DIV_RCD", util.getDefaultLocale(app), vnNewIdx);
	var vsSqlId = util.Grid.getCellValue(app, "grdCmnDataset", "SQL_ID"); // [데이터셋목록]의 쿼리ID
	util.Grid.setCellValue(app, "grdCmnDatasetParam", "SQL_ID", vsSqlId, vnNewIdx);
	
	// 3. 디테일[필수파라미터 정보]리피터 상태에따른 이외의 컨트롤제어
	doDtlParamGrdStatus();
}			
		
/**
 * @desc  [검색조건 목록] 그리드를 신규행을 추가한다. 
 * @return  void
 */
function doInsertDatasetCond(){
	var vnCnt = util.Grid.getRowCount(app, "grdCmnDatasetCond"); // 검색조건목록 행 갯수
	// 1. 검색조건목록의 신규행을 추가한 후, 시작행을 필수파라미터구분으로 설정한다. -> 신규행은 마지막행 아래에 추가함.
	var vnNewIdx = util.Grid.insertRow(app, "grdCmnDatasetCond", "gdCbbCondTypeCd", vnCnt);
	
	// 2. 디폴트값 셋팅 : 언어키, 쿼리ID
	util.Grid.setCellValue(app, "grdCmnDatasetCond", "LAN_DIV_RCD", util.getDefaultLocale(app), vnNewIdx);
	var vsSqlId = util.Grid.getCellValue(app, "grdCmnDataset", "SQL_ID"); // [데이터셋목록]의 쿼리ID
	util.Grid.setCellValue(app, "grdCmnDatasetCond", "SQL_ID", vsSqlId, vnNewIdx);
	
	// 3. 디테일[필수파라미터 정보]리피터 상태에따른 이외의 컨트롤제어
	doDtlCondGrdStatus();
}		
			
/**
 * @desc  디테일[필수파라미터 정보]의 상태가 편집상태일 경우 그외의 컨트롤(데이터셋/컬럼정보) disable
 * @return void
 */
function doDtlParamGrdStatus(){
	var vaGrpCtrl = ["grpData", "grpDataDtl", "grpDataCond"];
	
	if(util.Grid.isModified(app, "grdCmnDatasetParam")){
			util.Control.setEnable(app, false, vaGrpCtrl);
	}else{
		util.Control.setEnable(app, true, vaGrpCtrl);
	}
}			
	
/**
 * @desc  디테일[검색조건 정보]의 상태가 편집상태 일 경우 그외의 컨트롤(데이터셋/컬럼정보) disable
 * @return void
 * @author Kim Bora  2015.12. 07.
 */
function doDtlCondGrdStatus(){
	var vaGrpCtrl = ["grpData", "grpDataDtl", "grpDataParam"];
	
	if(util.Grid.isModified(app, "grdCmnDatasetCond")){
			util.Control.setEnable(app, false, vaGrpCtrl);
	}else{
		util.Control.setEnable(app, true, vaGrpCtrl);
	}
}
	
/**
 * @desc  [필수파라미터 목록] 그리드를 작업저장 한다. 
 * @param {Object} 서브미션 실행 후 처리될 콜백 함수	
 * @return  void
 */
function doSaveParam() {
	// 리피터 변경사항 체크
	if(!util.Grid.isModified(app, "grdCmnDatasetParam", "MSG")){
		return false;
	}
	//리피트 validation check
	if(!util.validate(app, "grdCmnDatasetParam")) return false;

	util.Submit.send(app, "subSaveParam", function(pbSuccess){
		if(pbSuccess){
			doListDatasetParam(function(pbListSuccess) {
				// 조회 : "갱신된 데이터가 조회되었습니다." header 메세지 표시
				if (pbListSuccess) util.Msg.alert("NLS-INF-M025");
			});
		}
	});
}		
	
/**
 * @desc  [검색조건 목록] 그리드를 작업저장 한다. 
 * @param {Object} 서브미션 실행 후 처리될 콜백 함수	
 * @return  void
 */
function doSaveCond() {
	// 리피터 변경사항 체크
	if(!util.Grid.isModified(app, "grdCmnDatasetCond", "MSG")){
		return false;
	}
	//리피트 validation check
	if(!util.validate(app, "grdCmnDatasetCond")) return false;

	util.Submit.send(app, "subSaveCond", function(pbSuccess){
		if(pbSuccess){
			doListDatasetCond(function(pbListSuccess) {
				// 조회 : "갱신된 데이터가 조회되었습니다." header 메세지 표시
				if (pbListSuccess) util.Msg.alert("NLS-INF-M025");
			});
		}
	});
}
	
//function doChangeRptCmnDataset(){
	// 필수파라미터 변경내역 체크 
//	if(util.Grid.isModified(["grdCmnDataset"], "CRM")){
//		ExtRepeat.selectRow("grdCmnDataset", ExtRepeat.getBeforeFocusRowIdx("grdCmnDataset"), false);				
//		return false;
//	}else{
//		util.Grid.revertAllData("grdCmnDataset");
//	}
//	util.Control.refreshBind("binGrdCmnDataset");
//}	
	
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
			//언어키 콤보박스 디폴트 셋팅
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
	//그리드 변경사항 체크
	if(util.Grid.isModified(app, ["grdCmnDataset","grdCmnDatasetDtl", "grdCmnDatasetCond", "grdCmnDatasetParam"], "CRM")){
		return false;
	}else{
		util.Grid.revertAllData(app, "grdCmnDataset");
		util.Grid.revertAllData(app, "grdCmnDatasetDtl");
		util.Grid.revertAllData(app, "grdCmnDatasetParam");
	}
	
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
 * 사용자 정의 컨트롤에서 insert 이벤트 발생 시 호출.
 */
function onGrid_ids_btn4Insert(/* cpr.event.CUIEvent */ e){
	/** 
	 * @type udc.com.grid_IDS_Btn
	 */
	var grid_ids_btn4 = e.control;
	doInsertDataset();
}

/*
 * 사용자 정의 컨트롤에서 delete 이벤트 발생 시 호출.
 */
function onGrid_ids_btn4Delete(/* cpr.event.CUIEvent */ e){
	/** 
	 * @type udc.com.grid_IDS_Btn
	 */
	var grid_ids_btn4 = e.control;
	var vnGrdIdx = util.Grid.getIndex(app, "grdCmnDataset");
	
	//디테일 로우 건수 체크
	var vsIdxs = util.Grid.getCheckOrSelectedRowIndex(app, "grdCmnDataset");
	
	var vsGrdLable = util.Grid.getTitle(app, "grdCmnDataset"); //데이터셋 목록 라벨
	var vsGrdDtlLable = util.Grid.getTitle(app, "grdCmnDatasetDtl"); //컬럼정보 목록 라벨
	
	if(!ValueUtil.isNull(vsIdxs)){
		var voIdx = String(vsIdxs).split(",");
		
		for(var i = 0 ; i < voIdx.length ; i++){
			var vnCnt = util.DataSet.getValue(app, "dsCmnDataset", voIdx[i], "DTL_CNT");
			
			if(vnCnt > 0){
				//@1 @2번째 항목에 대한 @3의 데이터가 존재합니다. @3의 데이터 삭제 후 삭제 가능합니다.
				util.Msg.warn("M214", [vsGrdLable, voIdx[i], vsGrdDtlLable, vsGrdDtlLable]);
				return false;
			}
		}
	}
	
	util.Grid.deleteRow(app, "grdCmnDataset");
	
	//신규 후 삭제일 경우 필요
	if(util.Grid.getRowState(app, "grdCmnDataset") == cpr.data.tabledata.RowState.UNCHANGED){
		doListMstRowSelectDtl();
	}
	
	//마스터 그리드 상태에 따른 디테일 제어
	doMstGrdStatus();
}

/*
 * 사용자 정의 컨트롤에서 restore 이벤트 발생 시 호출.
 */
function onGrid_ids_btn4Restore(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type udc.com.grid_IDS_Btn
	 */
	var grid_ids_btn4 = e.control;
	var vsStatus = util.Grid.getRowState(app, "grdCmnDataset");
	
	if(vsStatus == cpr.data.tabledata.RowState.INSERTED){
		doListMstRowSelectDtl();
	}
	doMstGrdStatus();
}

/*
 * 사용자 정의 컨트롤에서 save 이벤트 발생 시 호출.
 */
function onGrid_ids_btn4Save(/* cpr.event.CUIEvent */ e){
	/** 
	 * @type udc.com.grid_IDS_Btn
	 */
	var grid_ids_btn4 = e.control;
	doSave();
}

/*
 * 사용자 정의 컨트롤에서 insert 이벤트 발생 시 호출.
 */
function onGrid_ids_btn1Insert(/* cpr.event.CUIEvent */ e){
	/** 
	 * @type udc.com.grid_IDS_Btn
	 */
	var grid_ids_btn1 = e.control;
	doInsertDatasetDtl();
}

/*
 * 사용자 정의 컨트롤에서 delete 이벤트 발생 시 호출.
 */
function onGrid_ids_btn1Delete(/* cpr.event.CUIEvent */ e){
	/** 
	 * @type udc.com.grid_IDS_Btn
	 */
	var grid_ids_btn1 = e.control;
	doDtlGrdStatus();
}

/*
 * 사용자 정의 컨트롤에서 restore 이벤트 발생 시 호출.
 */
function onGrid_ids_btn1Restore(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type udc.com.grid_IDS_Btn
	 */
	var grid_ids_btn1 = e.control;
	doDtlGrdStatus();
}

/*
 * 사용자 정의 컨트롤에서 save 이벤트 발생 시 호출.
 */
function onGrid_ids_btn1Save(/* cpr.event.CUIEvent */ e){
	/** 
	 * @type udc.com.grid_IDS_Btn
	 */
	var grid_ids_btn1 = e.control;
	doSaveDtl();
}

/*
 * 사용자 정의 컨트롤에서 insert 이벤트 발생 시 호출.
 */
function onGrid_ids_btn2Insert(/* cpr.event.CUIEvent */ e){
	/** 
	 * @type udc.com.grid_IDS_Btn
	 */
	var grid_ids_btn2 = e.control;
	doInsertDatasetCond();
}

/*
 * 사용자 정의 컨트롤에서 delete 이벤트 발생 시 호출.
 */
function onGrid_ids_btn2Delete(/* cpr.event.CUIEvent */ e){
	/** 
	 * @type udc.com.grid_IDS_Btn
	 */
	var grid_ids_btn2 = e.control;
	doDtlCondGrdStatus();
}

/*
 * 사용자 정의 컨트롤에서 restore 이벤트 발생 시 호출.
 */
function onGrid_ids_btn2Restore(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type udc.com.grid_IDS_Btn
	 */
	var grid_ids_btn2 = e.control;
	doDtlCondGrdStatus();
}

/*
 * 사용자 정의 컨트롤에서 save 이벤트 발생 시 호출.
 */
function onGrid_ids_btn2Save(/* cpr.event.CUIEvent */ e){
	/** 
	 * @type udc.com.grid_IDS_Btn
	 */
	var grid_ids_btn2 = e.control;
	doSaveCond();
}

/*
 * 사용자 정의 컨트롤에서 insert 이벤트 발생 시 호출.
 */
function onGrid_ids_btn3Insert(/* cpr.event.CUIEvent */ e){
	/** 
	 * @type udc.com.grid_IDS_Btn
	 */
	var grid_ids_btn3 = e.control;
	doInsertDatasetParam();
}

/*
 * 사용자 정의 컨트롤에서 delete 이벤트 발생 시 호출.
 */
function onGrid_ids_btn3Delete(/* cpr.event.CUIEvent */ e){
	/** 
	 * @type udc.com.grid_IDS_Btn
	 */
	var grid_ids_btn3 = e.control;
	doDtlParamGrdStatus();
}

/*
 * 사용자 정의 컨트롤에서 restore 이벤트 발생 시 호출.
 */
function onGrid_ids_btn3Restore(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type udc.com.grid_IDS_Btn
	 */
	var grid_ids_btn3 = e.control;
	doDtlParamGrdStatus();
}

/*
 * 사용자 정의 컨트롤에서 save 이벤트 발생 시 호출.
 */
function onGrid_ids_btn3Save(/* cpr.event.CUIEvent */ e){
	/** 
	 * @type udc.com.grid_IDS_Btn
	 */
	var grid_ids_btn3 = e.control;
	doSaveParam();
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
//	ExtControl.refreshBind("binRptCmnDataset");
}
