//공통 모듈 사용
var util = createCommonUtil();

/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	//서브미션 실행 (실패시 cover page)
	util.Submit.send(app, app, "subOnLoad", function(pbSuccess){
		if(pbSuccess){
			util.SelectCtl.setValue(app, app, "cbbLanDivRcd", util.getDefaultLocale(app));
			util.Control.redraw(app, app, ["cbbUnitSystemRcd", "cbbMsgCd", "cbbLanDivRcd"]);
		}		
	}, true);
}

/*
 * "" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onAppheader1Search(/* cpr.events.CAppEvent */ e){
	// 데이터 변경상태 체크
	if (util.Grid.isModified(app, app, "grdCmnMessage", "CRM")) {
		return false;
	}
	
	//조회 서브미션 수행
	doList(function(pbSuccess) {
		// 조회 : "조회되었습니다." header 메세지 표시
		if (pbSuccess) {
			util.Msg.notify(app, app, "NLS-INF-M024");
		}
	});
}

/**
 * @desc 조회 event
 * @param poCallBackFunc 조회 후 callback함수
 */
function doList(poCallBackFunc) {
	util.Submit.send(app, app, "subList", function(pbSuccess){
		if(pbSuccess){
			// 조회 후 콜백함수 수행
			if(util.isFunc(poCallBackFunc)){
				 poCallBackFunc(pbSuccess);
			}
		}
	});
}

/*
 * 그룹에서 keydown 이벤트 발생 시 호출.
 * 사용자가 키를 누를 때 발생하는 이벤트.
 */
function onGrpSearchKeydown(/* cpr.events.CKeyboardEvent */ e){
	if(e.keyCode == cpr.events.KeyCode.ENTER){
		util.Header.clickSearch(app);
	}
}

/*
 * 사용자 정의 컨트롤에서 insert 이벤트 발생 시 호출.
 */
function onAppheader1Insert(/* cpr.events.CAppEvent */ e){
	// 조회조건에 셋팅된 내역이 있으면 신규시 자동셋팅한다.(시스템구분, 언어키, 메시지구분)
	util.Grid.setCellValue(app, app, "grdCmnMessage", "UNIT_SYSTEM_RCD", util.SelectCtl.getValue(app, "cbbUnitSystemRcd"), e.rowIndex);// 시스템구분
	util.Grid.setCellValue(app, app, "grdCmnMessage", "LAN_DIV_RCD", util.SelectCtl.getValue(app, "cbbLanDivRcd"), e.rowIndex);// 언어키
	util.Grid.setCellValue(app, app, "grdCmnMessage", "MSG_DIV_RCD", util.SelectCtl.getValue(app, "cbbMsgCd"), e.rowIndex);// 메세지구분
}

/*
 * 사용자 정의 컨트롤에서 delete 이벤트 발생 시 호출.
 */
function onAppheader1Delete(/* cpr.events.CAppEvent */ e){
	var vsPanelCheckIdx = util.Grid.getCheckOrSelectedRowIndex(app, "grdCmnMessage");
	for(var i=0, len= vsPanelCheckIdx.length; i<len; i++){
		var vsStdYn = util.Grid.getCellValue(app, app, "grdCmnMessage", "STD_YN", vsPanelCheckIdx[i]);
		var vsRowStatus = util.Grid.getRowState(app, app, "grdCmnMessage", vsPanelCheckIdx[i]);
		if(vsRowStatus != cpr.data.tabledata.RowState.INSERTED && vsStdYn == "Y"){
			util.Msg.alert("NLS-CMM-M002");
			//RowState 복구
			util.Grid.revertRowData(app, app, "grdCmnMessage", vsPanelCheckIdx[i]);
			return false;
		}
	}
	util.Grid.deleteRow(app, app, "grdCmnMessage");
}

/*
 * 사용자 정의 컨트롤에서 restore 이벤트 발생 시 호출.
 * 취소 클릭 이벤트
 */
function onAppheader1Restore(/* cpr.events.CAppEvent */ e){
	util.Grid.restoreRow(app, "grdCmnMessage");
}

/*
 * 사용자 정의 컨트롤에서 save 이벤트 발생 시 호출.
 */
function onAppheader1Save(/* cpr.events.CAppEvent */ e){
	doSave();
}

/**
 * @desc 작업저장 event
 * @return void
 */
function doSave() {
	// 그리드의 변경사항 유/무를 반환
	if (!util.Grid.isModified(app, app, "grdCmnMessage", "MSG")) return false;
	
	// 그리드 유효성 검증
	if (!util.validate(app, app, "grdCmnMessage")) return false;
	
	util.Submit.send(app, app, "subSave", function(pbSuccess){
		if(pbSuccess){
			//데이터 재조회
			doList(function(pbListSuccess) {
				// 조회 : "갱신된 데이터가 조회되었습니다." header 메세지 표시
				if(pbListSuccess){
					util.Msg.notify(app, app, "NLS-INF-M025");
				} 
			});
		}
	});
}
