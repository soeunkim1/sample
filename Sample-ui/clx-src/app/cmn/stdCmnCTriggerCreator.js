//공통 모듈 사용
var util = new ComUtil(app);

/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
		//리피트 초기 설정 - appheader1 에서 설정
		//검색조건 초기 설정 - appheader1 에서 설정
		
		//서브미션 실행 (실패시 cover page)
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				util.SelectCtl.selectItem(app, "cbbUnitSystemRcd", 0);
				util.Control.redraw(app, "cbbUnitSystemRcd");
			}
		}, true);
}//onBodyLoad()

/*
 * 그룹에서 keydown 이벤트 발생 시 호출.
 * 사용자가 키를 누를 때 발생하는 이벤트.
 */
function onGrpSearchKeydown(/* cpr.events.CKeyboardEvent */ e){
	/** 
	 * @type cpr.controls.Container
	 */
	var grpSearch = e.control;
	if(e.keyCode == 13){
		app.lookup("btnSearch").click();
	}
}//onGrpSearchKeydown()

/*
 * "" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnSearchClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnSearch = e.control;
	doList(function(pbSuccess) {
		// 조회 : "조회되었습니다." header 메세지 표시
		if (pbSuccess) {
			util.Msg.notify(app, "NLS-INF-M024");
		}
	});
}//onBtnSearchClick()

/**
 * @desc 조회 event
 * @param poCallBackFunc 조회 후 callback함수
 * @return void
 */
function doList(poCallBackFunc) {
	util.Submit.send(app, "subList", function(pbSuccess){
		if(pbSuccess){
			util.Control.redraw(app, "grdTable");
			// 조회 후 콜백함수 수행
			if (util.isFunc(poCallBackFunc)){
				poCallBackFunc(pbSuccess);
			}
		}
	});
}

/*
 * "" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnCrtTglTable1Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnCrtTglTable1 = e.control;
	doBtnCrtTriggerDelClick();
}//onBtnCrtTglTable1Click()

function doBtnCrtTriggerDelClick() {
	// 그리드에서 선택된 데이터를 체크한다.
	var vsPanelCheckIdx = util.Grid.getCheckOrSelectedRowIndex(app, "grdTable");
	var vnRow = 0;
	var vsTlgTableYn = "";
	var vsTableName = "";
	
	if(!ValueUtil.isNull(vsPanelCheckIdx) && vsPanelCheckIdx.length > 0){
		if(!confirm([util.Msg.getMsg("NLS-CMM-M048")])){
			return;
		}
		
		for(var i=0;i<vsPanelCheckIdx.length;i++){
			vnRow = vsPanelCheckIdx[i];
			vsTlgTableYn = util.Grid.getCellValue(app, "grdTable","TLG_TABLE_YN",vnRow);
			if(vsTlgTableYn == "N"){
				util.Msg.alert("NLS-CMM-M047", [util.Grid.getCellValue(app, "grdTable","TABLE_NAME",vnRow)]);	
				return;
			}
			vsTableName  += "'"+util.Grid.getCellValue(app, "grdTable","TABLE_NAME",vnRow) + "',";
			util.Grid.setRowState(app, "grdTable", cpr.data.tabledata.RowState.UPDATED, vnRow);
		}
		vsTableName = vsTableName.substring(0, vsTableName.length - 1);
		util.DataMap.setValue(app, "dmReqList", "strTableName", vsTableName);
		var vsCond = "TABLE_NAME == " + vsTableName;
		util.Grid.setFindRowCondition(app, "grdTable", vsCond);
		doCrtTblDel();
	}else{
		util.Msg.alert("NLS-WRN-M008");
	}
}

function doCrtTblDel(){
	
	util.Submit.send(app, "subCrtTblDel", function(pbSuccess){
		if(pbSuccess){
			//말풍선 옆에 특정 메세지를 표시한다.("갱신된 데이터가 조회되었습니다.")
			util.Msg.notify(app, "NLS-INF-M025");
			doList();
		}
	});
}

/*
 * "" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnCrtTglTableClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnCrtTglTable = e.control;
	doBtnCrtTriggerClick();
}//onBtnCrtTglTableClick()


/**
 * @desc TLG테이블생성 버튼 클릭 event
 * @return void
 */
function doBtnCrtTriggerClick() {
	// 그리드에서 선택된 데이터를 체크한다.
	var vsPanelCheckIdx = util.Grid.getCheckOrSelectedRowIndex(app, "grdTable");
	var vnRow = 0;
	var vsTlgTableYn = "";
	var vsTableName = "";
	
	if(!ValueUtil.isNull(vsPanelCheckIdx) && vsPanelCheckIdx.length > 0){
		
		for(var i=0;i<vsPanelCheckIdx.length;i++){
			vnRow = vsPanelCheckIdx[i];
			vsTlgTableYn = util.Grid.getCellValue(app, "grdTable","TLG_TABLE_YN",vnRow);
			if(vsTlgTableYn == "Y"){
				// 이미 TLG테이블이 생성된 내역이 있습니다.생성할 수 없습니다.
				util.Msg.alert("NLS-CMM-M029");
				return;
			}
			vsTableName  += "'"+util.Grid.getCellValue(app, "grdTable","TABLE_NAME",vnRow) + "',";
			util.Grid.setRowState(app, "grdTable", cpr.data.tabledata.RowState.UPDATED, vnRow);
		}

		//TLG테이블을 생성
		if(!util.Msg.confirm("NLS-CRM-M010", [util.Msg.getMsg("NLS-CMM-M030")])){//TLG테이블을 생성합니다.
			return;
		}
		vsTableName = vsTableName.substring(0, vsTableName.length - 1);
		util.DataMap.setValue(app, "dmReqList", "strTableName", vsTableName);
		var vsCond = "TABLE_NAME == " + vsTableName;
		util.Grid.setFindRowCondition(app, "grdTable", vsCond);
		doCrtTbl();
	}else{
		// 선택된 데이터가 없습니다.)
		util.Msg.alert("NLS-WRN-M008");
	}
}//doBtnCrtTriggerClick()

/**
 * @desc TLG테이블생성
 * @return void
 */
function doCrtTbl(){
	util.Submit.send(app, "subCrtTbl", function(pbSuccess){
		if(pbSuccess){
			//말풍선 옆에 특정 메세지를 표시한다.("갱신된 데이터가 조회되었습니다.")
			util.Msg.notify(app, "NLS-INF-M025");
			doList();
		}
	});
}//doCrtTbl()
/*
 * "" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnCrtTriggerClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnCrtTrigger = e.control;
	doBtnCrtTrigger();
}//onBtnCrtTriggerClick()

/**
 * @desc TLG트리거생성 버튼 클릭 event
 * @return void
 */
function doBtnCrtTrigger() {

	// 그리드에서 선택된 데이터를 체크한다.
	var vsPanelCheckIdx = util.Grid.getCheckOrSelectedRowIndex(app, "grdTable");
	var vnRow = 0;
	var vsTlgTableYn = "";
	var vsTableName = "' '";
	
	if(!ValueUtil.isNull(vsPanelCheckIdx) && vsPanelCheckIdx.length > 0){
		
		for(var i=0;i<vsPanelCheckIdx.length;i++){
			vnRow = vsPanelCheckIdx[i];
			vsTlgTableYn = util.Grid.getCellValue(app, "grdTable","TLG_TABLE_YN",vnRow);
			vsTableName  += ", '"+util.Grid.getCellValue(app, "grdTable","TABLE_NAME",vnRow) + "'";
			if(vsTlgTableYn != "Y"){
				//TGL테이블이 생성되지 않은 내역이 있습니다.
				util.Msg.alert("NLS-CMM-M031");
				return;
			}

			util.Grid.setRowState(app, "grdTable", cpr.data.tabledata.RowState.UPDATED, vnRow);
		}
		
		//TLG 트리거를 생성합니다.
		if(!util.Msg.confirm("NLS-CRM-M010", [util.Msg.getMsg("NLS-CMM-M032")])){
			return;
		}
		util.DataMap.setValue(app, "dmReqList", "strTableName", vsTableName);
		var vsCond = "TABLE_NAME == " + vsTableName;
		util.Grid.setFindRowCondition(app, "grdTable", vsCond);
		doCrtTrigger();
	}else{
		// 선택된 데이터가 없습니다.
		util.Msg.alert("NLS-WRN-M008");
	}
}//doBtnCrtTrigger()

/**
 * @desc TLG트리거생성
 * @return void
 */
function doCrtTrigger(){
	util.Submit.send(app, "subCrtTlg", function(pbSuccess){
		if(pbSuccess){
			//말풍선 옆에 특정 메세지를 표시한다. ("갱신된 데이터가 조회되었습니다.")
			util.Msg.notify(app, "NLS-INF-M025");
			doList();
		}
	});
}//doCrtTrigger()
