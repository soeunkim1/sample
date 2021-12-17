var util = new ComUtil(app);
/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	// 기준일자 조회하는 내부 팝업 호출을 위한 단위시스템코드 설정
//	setUnitSystem("CMN");
	
	//서브미션 실행 (실패시 cover page)
	util.Submit.send(app, "subOnLoad", function(pbSuccess){
		if(pbSuccess){
			//선택그룹refresh
			util.DataMap.setValue(app, "dmReqList", "strCurTime", util.DataMap.getValue(app, "dmResOnLoad", "strCurTime"));
			util.Control.redraw(app, ["cbbSerDiv","impschyearsmt1"]);
		}		
	}, true);
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
	if (!util.validate(app, "cbbSerDiv")) {
		return false;
	}
	//2.서브그리드 초기화
	util.Control.reset(app, app, ["grdMstInList","grdMstOutList"]);
	//3.조회 실행
	doList(function(pbSuccess) {
		// 조회 : "조회되었습니다." header 메세지 표시
		if(pbSuccess)util.Msg.notify(app, "NLS-INF-M024");
	});
}

/**
 * @desc 조회 event
 * @param poCallBackFunc 조회 후 callback함수
 * @return void
 */
function doList(poCallBackFunc) {
	util.Submit.send(app, "subList", function(pbSuccess){
		if(pbSuccess){
			util.Control.redraw(app, "grdMstList");
			// 조회 후 콜백함수 수행
			if (util.isFunc(poCallBackFunc))poCallBackFunc(pbSuccess);
		}
	});
}

/*
 * 그리드에서 selection-change 이벤트 발생 시 호출.
 * detail의 cell 클릭하여 설정된 selectionunit에 해당되는 단위가 선택될 때 발생하는 이벤트.
 */
function onGrdMstListSelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grdMstList = e.control;
	
	if(util.Grid.getIndex(app, "grdMstList") == -1){
		return false;
	}
	
	//3.조회 실행
	doListSub(function(pbSuccess) {
		// 조회 : "조회되었습니다." header 메세지 표시
		if(pbSuccess)util.Msg.notify(app, "NLS-INF-M024");
	});
}

/**
 * @desc 상세조회 event
 * @param poCallBackFunc 조회 후 callback함수
 * @return void
 */
function doListSub(poCallBackFunc) {

	var voRow = util.Grid.getIndex(app, "grdMstList")
	var vsCd = util.Grid.getCellValue(app, "grdMstList","CD",voRow)
	if (ValueUtil.isNull(voRow)) {
		//선택된 데이터가 없습니다.
		util.Msg.alert("NLS-WRN-M008");
		return;
	}
	// 조회조건set
	util.DataMap.setValue(app, "dmReqList", "strSerCodeRcd", vsCd);
	util.Submit.send(app, "subListSub", function(pbSuccess){
		if(pbSuccess){
			util.Control.redraw(app, ["grdMstInList","grdMstOutList"]);
			// 조회 후 콜백함수 수행
			if(util.isFunc(poCallBackFunc))poCallBackFunc(pbSuccess);
		}
	});
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
	//계열지정 이수과정 목록으로 복사
	doRptDataCopy("grdMstInList", "grdMstOutList", "In");
}

/**
 * @desc 계열지정 이수과정 목록으로 복사 event
 * @param poCallBackFunc 조회 후 callback함수
 * @return void
 */
function doRptDataCopy(psGrdCopyNm, psGrdDelNm, psGubun){
	
	var vaDelListRow = util.Grid.getCheckOrSelectedRowIndex(app, psGrdDelNm)
	var vsGrxMstDelTitle = app.lookup(psGrdDelNm).fieldLabel
	var vaIdxsDel = null;
	var voDelRow;
	
	if(String(vaDelListRow).isEmpty()){
		util.Msg.alert("NLS-INF-M045", [vaDelListRow]);
		return false;
	};
	
	//셋팅
   for(var i=0; i< vaDelListRow.length; i++) {
		
		voDelRow = vaDelListRow[i];
		var voCopyRow = util.Grid.insertRow(app, psGrdCopyNm);
		
		var vsSpCd = util.Grid.getCellValue(app, psGrdDelNm, 		"SP_CD",			voDelRow);
		var vsSpNm = util.Grid.getCellValue(app, psGrdDelNm, 		"SP_NM",			voDelRow);
		var vsSaCdNm = util.Grid.getCellValue(app, psGrdDelNm, 		"SA_CD_NM",			voDelRow);
		var vsSpDnDivRcdNm = util.Grid.getCellValue(app, psGrdDelNm, "SP_DN_DIV_RCD_NM", voDelRow);
		var vsRefKey = util.Grid.getCellValue(app, psGrdDelNm, 		"REF_KEY",			voDelRow);
		
		util.Grid.setCellValue(app, psGrdCopyNm, "SP_CD",			vsSpCd,			voCopyRow);
		util.Grid.setCellValue(app, psGrdCopyNm, "SP_NM",			vsSpNm,			voCopyRow);
		util.Grid.setCellValue(app, psGrdCopyNm, "SA_CD_NM",			vsSaCdNm,		voCopyRow);
		util.Grid.setCellValue(app, psGrdCopyNm, "SP_DN_DIV_RCD_NM", vsSpDnDivRcdNm,	voCopyRow);
		util.Grid.setCellValue(app, psGrdCopyNm, "REF_KEY",			vsRefKey,		voCopyRow);
		
		if("In" == psGubun){
			
			var voStrSerDivRcd = util.DataMap.getValue(app, "dmReqList", "strSerDivRcd");
			var voStrSerCodeRcd = util.DataMap.getValue(app, "dmReqList", "strSerCodeRcd");
			util.Grid.setCellValue(app, psGrdCopyNm, "SER_DIV_RCD", voStrSerDivRcd, voCopyRow);
			util.Grid.setCellValue(app, psGrdCopyNm, "SER_RCD", voStrSerCodeRcd, voCopyRow);
		}
	
		util.Grid.deleteRow(app, psGrdDelNm);
   }
   //저장
	doSave();
}

/**
 * @desc 작업저장 event
 * @return void
 */
function doSave() {
	
	// 그리드의 변경사항 유/무를 반환
	if (!util.Grid.isModified(app, "grdMstInList", "MSG")) {
		return false;
	}
	// 그리드 유효성 검증
	if (!util.validate(app, "grdMstInList")) {
		return false;
	}
	util.Submit.send(app, "subSave", function(pbSuccess){
		if(pbSuccess){
			doListSub(function(pbListSuccess) {
				// 조회 : "갱신된 데이터가 조회되었습니다." header 메세지 표시
				if (pbListSuccess){
					util.Msg.notify(app, "NLS-INF-M025");
				}else{
					util.Msg.notify(app, "NLS-INF-M024");
				} 	
			});
		}
	});
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
	//계열지정 이수과정 목록으로 복사
	doRptDataCopy("grdMstOutList", "grdMstInList", "Out");
}


/*
 * 사용자 정의 컨트롤에서 searchCallBack 이벤트 발생 시 호출.
 */
function onImpschyearsmt1SearchCallBack(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type udc.imp.impSchYearSmt
	 */
	var impschyearsmt1 = e.control;

	if (!util.validate(app, "impschyearsmt1")) {
		return false;
	}
	
	//3.조회 실행
	doListSub(function(pbSuccess) {
		// 조회 : "조회되었습니다." header 메세지 표시
		if(pbSuccess)util.Msg.notify(app, "NLS-INF-M024");
	});
}
