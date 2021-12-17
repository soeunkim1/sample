var util = new ComUtil(app);

/**
 * 호출한 페이지에서 파라미터 받기
 */
function doParentGet(){
	//팝업일 경우 부모창에 넘겨준 값을 복사될 대상 데이터 맵에 넣어준다.
	if(util.Dialog.isPopup(app)){
		var voStdCmnManualCopySch = app.getHostProperty("initValue");
		if(!ValueUtil.isNull(voStdCmnManualCopySch)){
			var vsMenuId = voStdCmnManualCopySch[0].iMenuId;
			
			util.DataMap.setValue(app, "dmReqKeyCopy", "strTargetMenuId", vsMenuId);
		}		
	}
}

/**
 * 조회버튼 이벤트(메뉴 목록 조회)
 */
 function doList(poCallBackFunc){
 	//조회 서브미션 호출
 	util.Submit.send(app, "subList", function(pbSuccess){
 		if(pbSuccess){
 			//메뉴목록 타이틀
 			util.Control.redraw(app, ["lblTitleRptCmnManual"]);
 			//메뉴목록
 			util.Control.redraw(app, "grdCmnManual");
 		}
 	});
 }

/**
 * 복사
 */
 function doCopy(){
 	// 선택(포커스)된 인덱스를 가져온다.
 	var vnIdx = util.Grid.getIndex(app, "grdCmnManual");
	
	if(vnIdx == -1){
		// "선택된 데이터가 없습니다."
		util.Msg.warn("M008");
		return false;
	}
	
	// 선택(포커스)된 정보를 데이터맵에 담는다.
	var vsSrcMenuId = util.Grid.getCellValue(app, "grdCmnManual", "MENU_ID");
	util.DataMap.setValue(app, "dmReqKeyCopy", "strSrcMenuId", vsSrcMenuId);	

	var vsTargetMenuId	= util.DataMap.getValue(app, "dmReqKeyCopy", "strTargetMenuId");	
	
	util.Submit.send(app, "subCopy", function(pbSuccess){
		if(pbSuccess){
			//복사되었습니다.
			util.Msg.alert("NLS-INF-M004", [util.Msg.getMsg("NLS-SCR-COPY")]); //@복사
			
			//팝업일 경우
			if(util.Dialog.isPopup(app)){				
				//콜백함수 호출 후 팝업 닫음
				var hostApp = app.getHostAppInstance();
				if(hostApp.hasAppMethod("doCallBackManualCopy")){
					hostApp.callAppMethod("doCallBackManualCopy", vsTargetMenuId);
				}
				app.close();	
			}
		}
	});
 }

/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	//부모창에서 전달한 값을 받는다.
	doParentGet();
	
	//서브미션 실행 (실패시 cover page)
	util.Submit.send(app, "subOnLoad", function(pbSuccess){
		if(pbSuccess){
			//시스템구분 첫번째 셋팅
			util.Control.redraw(app, ["cbbUnitSystemRcd"]);
			util.SelectCtl.selectItem(app, "cbbUnitSystemRcd", 0);
			
			//메뉴ID/명 컨트롤 포커스
			util.Control.setFocus(app, "ipbMenuId");
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
	doList(function(pbSuccess){
		if(pbSuccess) util.Msg.notify(app, "NLS-INF-M024");
	});
}

/*
 * "" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnCopyClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnCopy = e.control;
	doCopy();
}

/*
 * "" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnCloseClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnClose = e.control;
	app.close();
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
		var voBtnSearch = app.lookup("btnSearch");
		voBtnSearch.click();
	}
}
