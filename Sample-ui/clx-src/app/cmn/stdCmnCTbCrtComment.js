//공통 모듈 사용
var util = new ComUtil(app);

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
	
	// 데이터 변경상태 체크 메시지(기본, 임베디드 앱 존재 할 경우 isChangedFormData())
	if (util.Grid.isModified(app, "grdMst", "CRM")) {
		return false;
	}
	
	//필수항목을 검사합니다.
	if(!util.validate(app, "ipbSchcol")){
		return false;
	}
	doSearch("btnSearch");
}//onBtnSearchClick()

function doSearch(psBtnId){
	util.Submit.send(app, "subList", function(pbSuccess){
		if(pbSuccess){
			util.Control.redraw(app, "grdMst");
			if(psBtnId == "btnSearch"){
				util.Msg.notify(app, "NLS-INF-M024");
			}else{
				util.Msg.notify(app, "NLS-INF-M025");
			}
		}
	});
}//doSearch()

/*
 * "쿼리생성" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnNewClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnNew = e.control;
	doQueryCerate();
}//onBtnNewClick()

/**
 * @desc doQueryCerate event 커멘트 쿼리 생성
 * @return void
 */
function doQueryCerate(){
	var vsPanelCheckIdx = util.Grid.getCheckOrSelectedRowIndex(app, "grdMst");
	
	if (ValueUtil.isNull(vsPanelCheckIdx)) {
		util.Msg.notify(app, "NLS-INF-M045", "INFO", ["데이터"]);
		return false;
	}else{		
		var vnCnt = vsPanelCheckIdx.length;
		for (var i = 0; i < vnCnt; i++) {
			var vnIndex = vsPanelCheckIdx[i];

			var vsTableNm = util.Grid.getCellValue(app, "grdMst", "TABLE_NAME", vnIndex);
			var vsColNm = util.Grid.getCellValue(app, "grdMst", "COLUMN_NAME", vnIndex);
			var vsModifyComment	= util.Grid.getCellValue(app, "grdMst", "MODIFY_COMMENTS", vnIndex);
			var vsCmnCd = util.Grid.getCellValue(app, "grdMst", "CMN_CODE", vnIndex);

			if(ValueUtil.fixNull(vsModifyComment) == "" || vsModifyComment == ""){
				util.Msg.warn("M100",["수정할 설명"]);
				
				//eXbuilder5에서 주석처리 되어 있음
				//var voRow = vcGrxMst.getRowIndex(vnIndex);
				//vcGrxMst.startEdit(voRow,"ghcModifyComments");
				return;
			}				
			
			var vsTmp = vsModifyComment.split("'");
			vsModifyComment = "";
			for(var k=0; k<vsTmp.length; k++){
				vsModifyComment += vsTmp[k];
			}
			
			util.Grid.setCellValue(app, "grdMst", "MODIFY_COMMENTS", vsModifyComment, vnIndex);
			util.Grid.setCellValue(app, "grdMst", "CMN_CODE", vsCmnCd, vnIndex);
			util.Grid.setRowState(app, "grdMst", cpr.data.tabledata.RowState.UPDATED, vnIndex);
		}
		
		util.Submit.send(app, "subExcute", function(pbSuccess){
			if(pbSuccess) {
				util.Control.redraw(app, "grdWrMst");
				util.Control.redraw(app, "grdWrMst_title");
				util.Msg.notify(app, "NLS-INF-M043", "INFO", [i]);
			}
		});
	}
}
/*
 * "" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnCrtClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnCrt = e.control;
	doCommentExcute();
}//onBtnCrtClick()

/**
 * @desc doCommentExcute event 커멘트 쿼리 실행
 * @return void
 */
function doCommentExcute(){
	var voRow = util.Grid.getIndex(app, "grdWrMst");
	var vcRpt = app.lookup("grdWrMst");

	util.DataMap.setValue(app, "dmReqList","voGrxwrMstQuery",util.Grid.getCellValue(app, "grdWrMst", "QUREY_TXT", voRow)); 
	util.Submit.send(app, "subQurey", function(pbSuccess){
		if(pbSuccess){
			//커멘트를 성공적으로 저장하였습니다.
			util.Msg.notify(app, "NLS-INF-M010", "INFO", ["Comment"]);
						
			app.lookup("dsWrMst").realDeleteRow(voRow);
			util.Control.redraw(app, "grdWrMst");
			util.Control.redraw(app, "grdWrMst_title");
			
			var vnRowCnt = util.Grid.getRowCount(app, "grdWrMst");
			if(vnRowCnt == 0){
				doSearch("grdWrMst");
			}
		}else{
			util.Msg.notify(app, "NLS-INF-M033");
		}
	});
}//doCommentExcute()

/*
 * "" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnRestoreClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnRestore = e.control;
	util.Grid.revertRowData(app, "grdMst");
}
