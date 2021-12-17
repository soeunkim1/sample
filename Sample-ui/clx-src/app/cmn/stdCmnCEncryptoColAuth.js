var util = new ComUtil(app);

/**
 * @desc 조회 수행
 * @param poCallBackFunc
 */
function doList(poCallBackFunc){
	util.Submit.send(app, "subList", function(pbSuccess){
		if(pbSuccess){
			util.Control.redraw(app, "grdCmnEncryptoAuth");
			//조회 후 콜백함수 수행
			if(util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
		}
	});
}

/**
 * @desc 저장
 */
function doSave(){
	//그리드 변경사항 체크
	if(!util.Grid.isModified(app, "grdCmnEncryptoAuth", "MSG")){
		return false;
	}
	
	//그리드 validation check
	if(!util.validate(app, "grdCmnEncryptoAuth")) return false;
	
	util.Submit.send(app, "subSave", function(pbSuccess){
		if(pbSuccess){
			doList(function(pbListSuccess){
				//갱신된 데이터가 조회되었습니다
				if(pbListSuccess) util.Msg.alert("NLS-INF-M025");
			});
		}
	});
}
/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	//서브미션 실행 (실패 시 cover page)
	util.Submit.send(app, "subOnLoad", function(pbSuccess){
		if(pbSuccess){
			util.Control.redraw(app, "cbbEncodeColRcd");
		}
	});
}

/*
 * "조회" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnSearchClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnSearch = e.control;
	//데이터 변경상태 체크 메세지
	if(util.Grid.isModified(app, "grdCmnEncryptoAuth", "CRM")){
		return false;
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
 * "사용자별 암호화 권한관리" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnEncryptoColAutClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button1 = e.control;
	util.Dialog.open(app, "app/cmn_old/cmnPEncryptoColAuth", 1080, 600, function(e){
		var dialog = e.control;
	}, {
		
	}, true);
}

/*
 * 사용자 정의 컨트롤에서 insert 이벤트 발생 시 호출.
 */
function onGrid_ids_btn1Insert(/* cpr.event.CUIEvent */ e){
	/** 
	 * @type udc.com.grid_IDS_Btn
	 */
	var grid_ids_btn1 = e.control;
	//조회조건에 설정한 값이 있으면 신규 시 자동으로 값 세팅
	var vsEncodeColRcd = util.SelectCtl.getValue("cbbEncodeColRcd");
	if(!ValueUtil.isNull(vsEncodeColRcd)){		
		util.Grid.setCellValue(app, "grdCmnEncryptoAuth", "ENCODE_COL_RCD", vsEncodeColRcd);
	}
	
	var vsUseId = util.DataMap.getValue(app, "dmReqList", "strUserId");
	var vsUseNm = util.DataMap.getValue(app, "dmReqList", "strUserNm");
	if(!ValueUtil.isNull(vsUseId) && !ValueUtil.isNull(vsUseNm)){
		util.Grid.setCellValue(app, "grdCmnEncryptoAuth", "USER_ID", vsUseId);
		util.Grid.setCellValue(app, "grdCmnEncryptoAuth", "USER_NM", vsUseNm);
	}
	
	var vsMenuId = util.DataMap.getValue(app, "dmReqList", "strMenuId");
	var vsMenuNm = util.DataMap.getValue(app, "dmReqList", "strMenuNm");
	if(!ValueUtil.isNull(vsMenuId) && !ValueUtil.isNull(vsMenuNm)){
		util.Grid.setCellValue(app, "grdCmnEncryptoAuth", "MENU_ID", vsMenuId);
		util.Grid.setCellValue(app, "grdCmnEncryptoAuth", "MENU_NM", vsMenuNm);
	}
	
	util.Grid.setCellValue(app, "grdCmnEncryptoAuth", "USE_YN", "Y");
	util.Grid.setCellValue(app, "grdCmnEncryptoAuth", "EFFT_ST_DT", "19000101");
	util.Grid.setCellValue(app, "grdCmnEncryptoAuth", "EFFT_END_DT", "99991231");
}

/*
 * 사용자 정의 컨트롤에서 save 이벤트 발생 시 호출.
 */
function onGrid_ids_btn1Save(/* cpr.event.CUIEvent */ e){
	/** 
	 * @type udc.com.grid_IDS_Btn
	 */
	var grid_ids_btn1 = e.control;
	doSave();
}
