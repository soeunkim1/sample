var util = new ComUtil(app);
/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	util.Submit.send(app, "subOnLoad", function(pbSuccess){
		
	}, false);
}

/**
 * @desc  조회 event 학생목록(마스터) 조회  	
 * @param {Function} poCallBackFunc 콜백정의
 * @return void
 * @author xxxx 2015. 6. 5.
 */
function doListMst(poCallBackFunc) {
	
	util.Control.reset(app, app, "grdDtl");	
	util.Submit.send(app, "subList", function(pbSuccess){
		if(pbSuccess){
			var vnCnt = util.Grid.getRowCount(app, "grdMst");
			if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess); 
		}
	});
	
}

/**
 * @desc   마스터 rowselect event
 *              디테일 조회
 * @return void
 */
function doListMstRowSelectDtl() {				
	
	if(util.Grid.getRowState(app, "grdMst") == cpr.data.tabledata.RowState.INSERTED){
		util.Control.reset(app, app, "grdDtl");
		return false;
	}
	doListDtl();
}


/**
 * @desc   마스터 rowselect event
 *              디테일 조회
 * @param {String} 호출되는 상태값
 *  						 신규, 삭제시에서 호출될 경우 디테일 재조회
 * @return void
 */
function doListDtl(poCallBackFunc) {
	
	var vsStudId = util.Grid.getCellValue(app, "grdMst", "STUD_ID");
	
	if(ValueUtil.isNull(vsStudId)) return false;
	
	util.DataMap.setValue(app, "dmReqKey", "strDtlStudId", vsStudId);
	
	util.Submit.send(app, "subListDtl", function(pbSuccess){
		if(pbSuccess){
		}
		// 조회 후 콜백함수 수행
		if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess); 
	});
}

/*
 * 그리드에서 selection-change 이벤트 발생 시 호출.
 * detail의 cell 클릭하여 설정된 selectionunit에 해당되는 단위가 선택될 때 발생하는 이벤트.
 */
function onGrdMstSelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grdMst = e.control;
	
	if(util.Grid.getIndex(app, "grdMst") == -1){
		return false;
	}
	doListMstRowSelectDtl();
}



/*
 * 사용자 정의 컨트롤에서 delete 이벤트 발생 시 호출.
 */
function onGrid_ids_btn1Delete(/* cpr.event.CUIEvent */ e){
	/** 
	 * @type udc.com.grid_IDS_Btn
	 */
	var grid_ids_btn1 = e.control;
	
	//상세내역이 존재하면... 삭제 불가
	var vnDtlRowCnt = util.Grid.getRowCount(app, "grdDtl");
	
	if(vnDtlRowCnt  > 0){
		util.Msg.warn("M054", [util.Grid.getIndex(app, "grdMst") + 1, app.lookup("grdMst").fieldLabel,
		                       app.lookup("grdDtl").fieldLabel]);
		return false;
	}
	//선택된 행 삭제
	util.Grid.deleteRow(app, "grdMst");
}


function doSaveMst(poCallBackFunc) {
	
	if(!util.Grid.isModified(app, "grdMst", "MSG")){
		return false;
	}
	
	if(!util.validate(app, "grdMst")) return false;
	
	util.Submit.send(app, "subSave", function(pbSuccess){
		if(pbSuccess){
			doListMst(function(pbListSuccess) {
				
				if (pbListSuccess) util.Msg.notify(app, "NLS-INF-M024");
				
				if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbListSuccess); 
			});
		}
	});
}

/**
 * @desc   디테일 작업저장 event
 *              
 * @return void
 * @author xxxx 2015. 6. 5.
 */
function doSaveDtl(poCallBackFunc) {
	
	if(!util.Grid.isModified(app, "grdDtl", "MSG")){
		return false;
	}
	
	if(!util.validate(app, "grdDtl")) return false;
	
	util.Submit.send(app, "subSaveDtl", function(pbSuccess){
		if(pbSuccess){
			doListDtl(function(pbListSuccess) {
				if(pbListSuccess){
					util.Msg.notify(app, "NLS-INF-M024");
				}
				
			});
		}
	});
}

/*
 * 사용자 정의 컨트롤에서 save 이벤트 발생 시 호출.
 */
function onGrid_ids_btn1Save(/* cpr.event.CUIEvent */ e){
	/** 
	 * @type udc.com.grid_IDS_Btn
	 */
	var grid_ids_btn1 = e.control;
	doSaveMst();
}

/*
 * 사용자 정의 컨트롤에서 insert 이벤트 발생 시 호출.
 */
function onGrid_ids_btn2Insert(/* cpr.event.CUIEvent */ e){
	/** 
	 * @type udc.com.grid_IDS_Btn
	 */
	var grid_ids_btn2 = e.control;
	var vsStudId = util.Grid.getCellValue(app, "grdMst", "STUD_ID");
	util.Grid.setCellValue(app, "grdDtl", "STUD_ID", vsStudId);
}

/*
 * 사용자 정의 컨트롤에서 save 이벤트 발생 시 호출.
 */
function onGrid_ids_btn2Save(/* cpr.event.CUIEvent */ e){
	/** 
	 * @type udc.com.grid_IDS_Btn
	 */
	var grid_ids_btn2 = e.control;
	doSaveDtl();
}

/*
 * 데이터셋에서 update 이벤트 발생 시 호출.
 * 데이터가 수정되는 경우 발생하는 이벤트. 발생 메소드 : setValue, updateRow
 */
function onDsMstUpdate(/* cpr.events.CDataEvent */ e){
	/** 
	 * @type cpr.data.DataSet
	 */
	var dsMst = e.control;
	util.Control.redraw(app, "grid_ids_btn_Dtl");
}

/*
 * 데이터셋에서 update 이벤트 발생 시 호출.
 * 데이터가 수정되는 경우 발생하는 이벤트. 발생 메소드 : setValue, updateRow
 */
function onDsDtlUpdate(/* cpr.events.CDataEvent */ e){
	/** 
	 * @type cpr.data.DataSet
	 */
	var dsDtl = e.control;
	util.Control.redraw(app, "grid_ids_btn_Mst");
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
	
	if(util.Grid.isModified(app, ["grdMst","grdDtl"], "CRM")){
		return false;
	}
	
	doListMst(function(pbSuccess) {
		// 조회 : "조회되었습니다." header 메세지 표시
		if (pbSuccess) util.Msg.notify(app, "NLS-INF-M024") ;
	});
	
}



/*
 * 데이터셋에서 load 이벤트 발생 시 호출.
 * build 메소드에 의해 데이터 구조가 재구성될 때 발생하는 이벤트. 초기 생성시에도 발생합니다.
 */
function onDsDtlLoad(/* cpr.events.CDataEvent */ e){
	/** 
	 * @type cpr.data.DataSet
	 */
	var dsDtl = e.control;
	util.Control.redraw(app, "grid_ids_btn_Mst");
}

/*
 * 사용자 정의 컨트롤에서 idrCommonEvent 이벤트 발생 시 호출.
 */
function onGrid_ids_btn_MstIdrCommonEvent(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type udc.com.grid_IDS_Btn
	 */
	var grid_ids_btn_Mst = e.control;
	util.Control.redraw(app, "grid_ids_btn_Dtl");
}

/*
 * 사용자 정의 컨트롤에서 idrCommonEvent 이벤트 발생 시 호출.
 */
function onGrid_ids_btn_DtlIdrCommonEvent(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type udc.com.grid_IDS_Btn
	 */
	var grid_ids_btn_Dtl = e.control;
	util.Control.redraw(app, "grid_ids_btn_Mst");
}
