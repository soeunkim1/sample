//공통 모듈 사용
var util = new ComUtil(app);

// 헤더 텍스트 설정할 MAP 정의
var moMapForHeader = new cpr.utils.ObjectMap();
// 로그테이블목록 리피트 포커스찾기위한 PK값 
var msPkValues = "";

/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	// 1. 리피트 초기 설정 - appheader1 에서 설정
	// 2. 검색조건 초기 설정 - appheader1 에서 설정
	// 3. 첫번째 탭버튼 선택
	util.Tab.setSelectedTabItem(app, "tabMain", 1);
	// 4. 서브미션 실행 (실패시 cover page)
	util.Submit.send(app, "subOnLoad", function(pbSuccess){
		if(pbSuccess){
			// 로그이력탭 일자 조건 현재일로 셋팅
			var vsCurDt = util.DataMap.getValue(app, "dmResOnLoad", "strCurDt");
			util.Control.setValue(app, app, "dipStDt", vsCurDt);
			util.Control.setValue(app, app, "dipEndDt", vsCurDt);
			util.Control.redraw(app, ["dipStDt", "dipEndDt"]);
			util.Control.setFocus(app, "ipbTableNm");
		}
	}, true);
}//onBodyLoad()


/*
 * 탭 폴더에서 tabheader-click 이벤트 발생 시 호출.
 * 탭 아이템의 헤더 영역을 클릭하였을 때 발생하는 이벤트 입니다.
 */
function onTabMainTabheaderClick(/* cpr.events.CItemEvent */ e){
	/** 
	 * @type cpr.controls.TabFolder
	 */
	var tabMain = e.control;
	
	var vsSelTabId = util.Tab.getSelectedId(app, "tabMain");

	// 현재 선택된 탭의 상태 체크
	switch(vsSelTabId){
		// 로그테이블
		case 2: {
			// 포커스된 로우 담기
			var vnSelIdx = util.Grid.getIndex(app, "grdCmnLog");
			if(vnSelIdx == -1){
				// tab 이동 하지 않음
				util.Tab.setSelectedTabItem(app, "tabMain", 1);//로그테이블탭 강제 선택
				// "선택된 데이터가 없습니다." 
				util.Msg.warn("M008");
				return false;
			}

			var vsTableNm = util.Grid.getCellValue(app, "grdCmnLog", "LOG_TABLE_NAME");
			if(ValueUtil.fixNull(vsTableNm) == ""){
				util.Tab.setSelectedTabItem(app, "tabMain", 1);//로그테이블탭 강제 선택
				// 로그테이블는 존재하지 않습니다.
				util.Msg.warn("M006", ["로그테이블"]);
				return false;
			}
			
			// 리피터 변경사항 체크
			if (util.Grid.isModified(app, "grdCmnLog", "CRM")) {
				// tab 이동 하지 않음
				util.Tab.setSelectedTabItem(app, "tabMain", 1);//로그테이블탭 강제 선택
				return false;
			}
			break;
		}		
	}
	
	var vnIdx = util.Grid.getIndex(app, "grdCmnLog");
	msPkValues = util.Grid.getRowPKColumnValues(app, "grdCmnLog", vnIdx);
	//탭변경 후 처리 로직
	switch(vsSelTabId){
		// 로그테이블
		case 1: {
			doList(function(pbSuccess) {
				if(ValueUtil.fixNull(msPkValues) != ""){
					util.Grid.setFindRowCondition(app, "grdCmnLog", msPkValues);
				}
				// 조회 : "조회되었습니다." header 메세지 표시
				if(pbSuccess){
					util.Msg.notify(app, "NLS-INF-M024");
				}
			});
			break;
		}
		// 로그이력
		case 2: {
			// 로그이력탭 일자 조건 현재일로 셋팅
			doSetInitDate();
			
//			// 동적으로 그린 그리드를 삭제해준다.
			doDynamicRepeatDelete();
			
			//eXbuilder5에서 주석처리 되어 있음
//			doDetailList(function(pbSuccess) {
				// 조회 : "조회되었습니다." header 메세지 표시
//				if(pbSuccess){
//					util.Msg.notify("NLS-INF-M024");
//				}
//			});
			break;
		}
	}
}

/**
 * @desc   doDynamicRepeatDelete  동적그리드를 삭제한다.
 * @return  void
 */
function doDynamicRepeatDelete(){
	var vnSize = moMapForHeader.size();
	if(vnSize > 0){	
		var vsKeys = moMapForHeader.keys();
		for(var i=(vsKeys.length-1); i>=0; i--){
			var voHeaderColumn = util.Grid.getHeaderColumn(app, "grdCmnLogHis", vsKeys[i])[0];
			app.lookup("grdCmnLogHis").deleteColumn(voHeaderColumn.colIndex);
		}
		//그리드를 다시 그린다.
		util.Control.redraw(app, "grdCmnLogHis");
		
		moMapForHeader.removeAll();
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
	if(e.keyCode == 13){
		app.lookup("btnSearch").click();
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
		// 데이터 변경상태 체크 메시지 
		if (util.Grid.isModified(app, "grdCmnLog", "CRM")) {
			return false;
		}
		
		// 첫번째 탭을 선택한다. 
		util.Tab.setSelectedTabItem(app, "tabMain", 1);
		
		// 포커스PK 빈값으로 초기화한다.
		msPkValues = "";
		
		doList(function(pbSuccess) {
			// 조회 : "조회되었습니다." header 메세지 표시
			if (pbSuccess) {
				util.Msg.notify(app, "NLS-INF-M024") ;
			}
		});	
}//onBtnSearchClick

/**
 * @desc  doList        로그테이블을 조회한다.
 * @param {Function} poCallBackFunc 콜백정의
 */
function doList(poCallBackFunc) {
	util.Submit.send(app, "subList", function(pbSuccess){
		if(pbSuccess){
			// 조회 후 콜백함수 수행
			if(util.isFunc(poCallBackFunc)){
				util.Control.redraw(app, "grdCmnLog");
				poCallBackFunc(pbSuccess);
			}
		}
	});
}//doList()		

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
}//onBtnSaveClick()

/**
 * @desc  작업저장한다.
 * @param {Function} poCallBackFunc 콜백정의
 */
function doSave(poCallBackFunc) {
	//그리드 변경사항 체크
	if(!util.Grid.isModified(app, "grdCmnLog","MSG")){
		return false;
	}
	util.Submit.send(app, "subSave", function(pbSuccess){
		if(pbSuccess){
			doList(function(pbListSuccess){
				if (pbListSuccess){
					// 저장 : "갱신된 데이터가 조회되었습니다." header 메세지 표시
					if(pbListSuccess){
						util.Msg.notify(app, "NLS-INF-M025");
					}
					if(util.isFunc(poCallBackFunc)){
						poCallBackFunc(pbSuccess);
					}
				}
			}); 
		}
	});
}//doSave()		
//onBtn3Click()

/*
 * "" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnRestoreClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnRestore = e.control;
	util.Grid.revertRowData(app, "grdCmnLog");
}//onBtnRestoreClick()

/**
 * @desc   로그이력 조회조건 날짜를 초기화 시킨다.
 */
function doSetInitDate(){
	// 로그이력탭 일자 조건 초기값 현재일로 셋팅
	var vsCurDt = util.DataMap.getValue(app, "dmResOnLoad", "strCurDt");
	util.Control.setValue(app, app, "dipStDt", vsCurDt);
	util.Control.setValue(app, app, "dipEndDt", vsCurDt);
	util.Control.redraw(app, ["dipStDt", "dipEndDt"]);
	util.Control.setFocus(app, "dipStDt");
}//doSetInitDate()

/**
 * @desc  로그이력 날짜를 체크한다.
 */
function doCheckDate(){
	// 컨트롤 유효성 검증
	if(!util.validate(app, ["dipStDt", "dipEndDt"])){
		doSetInitDate();
		return false;
	}
	
	var vsStDt = util.Control.getValue(app, "dipStDt");
	var vsEndDt = util.Control.getValue(app, "dipEndDt");
	
	var vdStDt = DateUtil.toDate(vsStDt, "YYYYMMDDHHmmss");
	var vdEndDt = DateUtil.toDate(vsEndDt,"YYYYMMDDHHmmss");
	
	// 두 날짜간의 일수 체크
    vdStDt.setHours(vdEndDt.getHours());
	vdStDt.setMinutes(vdEndDt.getMinutes());
    vdStDt.setSeconds(vdEndDt.getSeconds());
    vdStDt.setMilliseconds(vdEndDt.getMilliseconds());
    
    var mnMilliSpan = Number(vdEndDt) - Number(vdStDt);
   	var vnDaySpan = parseInt(mnMilliSpan / (1000 * 60 * 60 * 24));
	
	if(vnDaySpan > 7){
		// 검색기간은 최대 7일만 선택할 수 있습니다.
		util.Msg.warn("M009", ["검색기간은 최대 7일"]);
		doSetInitDate();
		return false;
	}
	return true;
}//doCheckDate()

/**
 * @desc   doDetailList  로그이력을 조회한다.
 * @param {Function} poCallBackFunc 콜백정의
 */
function doDetailList(poCallBackFunc) {		
	// 선택된 로그테이블명을 가져온다.
	var vsTableNm = util.Grid.getCellValue(app, "grdCmnLog", "LOG_TABLE_NAME");
	util.DataMap.setValue(app, "dmReqKeyHist", "strTableNm", vsTableNm);
	util.Submit.send(app, "subLogHisList", function(pbSuccess){
		if(pbSuccess){
			util.Control.redraw(app, "grdCmnLogHis");
			// 로그테이블의 컬럼을 통해 동적리피트를 생성한다.
			doDynamicRepeat();
			// 조회 후 콜백함수 수행
			if(util.isFunc(poCallBackFunc)){
				poCallBackFunc(pbSuccess);
			}
		}else{
			// 첫번째 탭으로 간다.
			util.Tab.setSelectedTabItem(app, "tabMain", 1);
		}
	});
}//doDetailList()

/**
 * @desc   doDynamicRepeat  동적리피트를 생성한다.
 */
function doDynamicRepeat(){
	// 이전 값(MAP)을 clear - doDynamicRepeatDelete()에서 실행
	
	// 1. 동적리피트 삭제
	doDynamicRepeatDelete();
	
	// 2. 컬럼 갯수를 가져온다.
	var vnLen = app.lookup("dsTblColNameList").getRowCount();
	
	// 3. 컬럼 갯수만큼 for문을 통해 동적리피트를 생성한다.
	for( var i = 0; i < vnLen ; i++){		
		// 3-1. 컬럼명
		var vsColumnName = util.DataSet.getValue(app, "dsTblColNameList", i, "COLUMN_NAME");
		
		// 3-2. 'TR_TRAN_DATE' / 'CRT_DTHR' /'UPD_DTHR' 컬럼이 있는 경우 date 컨트롤로 정의한다.
		var vsDetailCtlType = "";
		if(vsColumnName == "TR_TRAN_DATE" || vsColumnName == "CRT_DTHR" || vsColumnName == "UPD_DTHR"){
			vsDetailCtlType = "date";
		}else if(vsColumnName == "TR_TRAN_DIV"){
			vsDetailCtlType ="outputCenter";
		}else{
			vsDetailCtlType = "output";
		}
		
		// 3-3. 로그이력목록 생성(header, detail)
		doCreateRptDetailColumn(vsColumnName, vsDetailCtlType, i);
		// 3-4. 컬럼명을 헤더에 설정하기 위해 Map으로 담아준다.
		if(!ValueUtil.isNull(vsColumnName)){
			moMapForHeader.put(vsColumnName, vsColumnName);
		}
	}
	
	// 4. 로그이력목록 헤더 text 설정
	doSetHeaderRptCmnLogHisCtl(moMapForHeader);	
	// 5. 리피트를 다시 그린다.
	util.Control.redraw(app, "grdCmnLogHis");
}

/**
 * @desc  doCreateRptDetailColumn 로그이력목록의 컬럼생성
 */
function doCreateRptDetailColumn(psColumnNm, psColumnType, pnIdx){
	var colIdx = pnIdx+1;
	var output = (function(){
		var output_1 = new cpr.controls.Output("ghBtn" + psColumnNm);
		output_1.value = psColumnNm;
		return output_1;
	})();
	if(psColumnType == "outputCenter"){
		app.lookup("grdCmnLogHis").addColumn(
				{
					columnLayout : [ {
						width : "130px"
					} ],
					header : [ {
						rowIndex : 0,
						colIndex : colIdx,
						colSpan : 1,
						control : output,
						sortColumnName : psColumnNm,
					} ],
					detail : [ {
						rowIndex : 0,
						colIndex : colIdx,
						colSpan : 1,
						rowSpan : 1,
						columnName : psColumnNm,
						control : (function() {
							var output_2 = new cpr.controls.Output("gdOpt" + psColumnNm);
							output_2.style.css({
								"text-align" : "center"
							});
							if (output_2.isBindable("value")) {
								output_2.bind("value").toDataColumn(psColumnNm);
							}
							return output_2;
						})()
					} ]
				});
	}else if(psColumnType == "date"){
		app.lookup("grdCmnLogHis").addColumn(
				{
					columnLayout : [ {
						width : "130px"
					} ],
					header : [ {
						rowIndex : 0,
						colIndex : colIdx,
						colSpan : 1,
						control : output,
						sortColumnName : psColumnNm,
					} ],
					detail : [ {
						rowIndex : 0,
						colIndex : colIdx,
						colSpan : 1,
						rowSpan : 1,
						columnName : psColumnNm,
						control : (function() {
							var dateInput_1 = new cpr.controls.DateInput("gdOpt" + psColumnNm);
							dateInput_1.format = "YYYYMMDDHHmmss";
							dateInput_1.mask = "YYYY-MM-DD HH:mm:ss";
							if (dateInput_1.isBindable("value")) {
								dateInput_1.bind("value").toDataColumn(psColumnNm);
							}
							return dateInput_1;
						})()
					} ]
				});
	}else{
		app.lookup("grdCmnLogHis").addColumn(
				{
					columnLayout : [ {
						width : "130px"
					} ],
					header : [ {
						rowIndex : 0,
						colIndex : colIdx,
						colSpan : 1,
						control : output,
						sortColumnName : psColumnNm,
					} ],
					detail : [ {
						rowIndex : 0,
						colIndex : colIdx,
						colSpan : 1,
						rowSpan : 1,
						columnName : psColumnNm,
						control : (function() {
							var output_2 = new cpr.controls.Output("gdOpt" + psColumnNm);
							if (output_2.isBindable("value")) {
								output_2.bind("value").toDataColumn(psColumnNm);
							}
							return output_2;
						})()
					} ]
				});	
	}
	util.Control.redraw(app, "grdCmnLogHis");
}

/**
 * @desc  로그이력목록의 헤더컬럼 textValue set
 */
function doSetHeaderRptCmnLogHisCtl(paColumnMap){
	if(paColumnMap.size() > 0){	
		var vsKeys = paColumnMap.keys();
		for(var i=0; i < vsKeys.length; i++ ){
			var vcRhBtnCtrl = app.lookup("ghBtn" + vsKeys[i]);	
			
			vcRhBtnCtrl.value = vsKeys[i];
		}
	}		
}

/*
 * "" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnSearchHistClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnSearchHist = e.control;
	var vsTableNm = util.Grid.getCellValue(app, "grdCmnLog", "LOG_TABLE_NAME");
	if(ValueUtil.fixNull(vsTableNm) == ""){
		// 로그테이블는 존재하지 않습니다.
		util.Msg.warn("M006", ["로그테이블"]);
		// 첫번째 탭으로 간다.
		util.Tab.setSelectedTabItem(app, "tabMain", 1);
		return false;
	}
	
	// 조회조건인 날짜를 체크한다.
	if(!doCheckDate()){
		return false;
	}
	
	doDetailList(function(pbSuccess) {
		// 조회 : "조회되었습니다." header 메세지 표시
		if(pbSuccess){
			util.Control.redraw(app, "grdCmnLogHis_title");
			util.Msg.notify(app, "NLS-INF-M024");
		}
	});
}
