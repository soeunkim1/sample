
/**
 * PageIndexing을 위한 기초 데이터 설정
 * @param totCnt
 * @param pageSize
 * @param rowSize
 * @param pageIdx
 */
exports.setPaging = function(totCnt, pageSize, rowSize, pageIdx) {
	app.lookup("optCurrentIdx").value = pageIdx;
	app.lookup("optTot").value = totCnt;
	
	var pageCnt = 0;
	if(totCnt > 0 && rowSize > 0) {
		pageCnt = Math.ceil(totCnt / rowSize);
	}
	app.lookup("optPageCnt").value = pageCnt;
	
	var pageIndex = app.lookup("pageIndex");
	pageIndex.currentPageIndex = pageIdx;
	pageIndex.totalRowCount = totCnt;
	pageIndex.pageRowCount = rowSize;
	pageIndex.viewPageCount = pageSize;
	
	var pageIndex = app.lookup("pageIndex");
	if(totCnt == 0) {
		pageIndex.visible = false;
	} else {
		pageIndex.visible = true;
	}
	
	app.getContainer().redraw();
}

/*
 * 페이지 인덱서에서 before-selection-change 이벤트 발생 시 호출.
 * Page index를 선택하여 선택된 페이지가 변경되기 전에 발생하는 이벤트. 다음 이벤트로 selection-change를 발생합니다.
 */
function onPageIndexBeforeSelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.PageIndexer
	 */
	var pageIndex = e.control;
	
	var selectionEvent = new cpr.events.CSelectionEvent("before-pagechange", {
		oldSelection: e.oldSelection,
		newSelection: e.newSelection
	});
	
	app.dispatchEvent(selectionEvent);
	
	// 기본처리가 중단되었을 때 변경을 취소함.
	if(selectionEvent.defaultPrevented == true) {
		e.preventDefault();
	}
}

/*
 * 페이지 인덱서에서 selection-change 이벤트 발생 시 호출.
 * Page index를 선택하여 선택된 페이지가 변경된 후에 발생하는 이벤트.
 */
function onPageIndexSelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.PageIndexer
	 */
	var pageIndex = e.control;
	
	var selectionEvent = new cpr.events.CSelectionEvent("pagechange", {
		oldSelection: e.oldSelection,
		newSelection: e.newSelection
	});
	
	app.dispatchEvent(selectionEvent);
	
	app.lookup("optCurrentIdx").value = e.newSelection;
}

