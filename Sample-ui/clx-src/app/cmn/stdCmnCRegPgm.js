var util = new ComUtil(app);
/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	
	util.Submit.send(app, "subOnLoad", function(pbSuccess){
		
		if(pbSuccess){
			util.SelectCtl.setValue(app, "cbbLanDivRcd", util.getDefaultLocale(app));
			util.Control.setFocus(app, "ipbPgmNm");
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
	
	if(util.Grid.isModified(app, "grdCmnPgm", "CRM")){
		return false;
	}
	
	doList(function(pbSuccess){
		if (pbSuccess){ 
			util.Msg.notify(app, "NLS-INF-M024") ;
		}
	});
	
}

/**
 * @desc 조회 서브미션 실행
 * @param 
 * @return 
 * @author
 */
function doList(poCallBackFunc) {

	util.Submit.send(app, "subList", function(pbSuccess){
		if(pbSuccess){
			var vnCnt = util.Grid.getRowCount(app, "grdCmnPgm");
			util.Control.redraw(app, ["grdCmnPgm"]);
			if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess); 
		}
	});
}


/*
 * 사용자 정의 컨트롤에서 insert 이벤트 발생 시 호출.
 */
function onGrid_ids_btn1Insert(/* cpr.event.CUIEvent */ e){
	/** 
	 * @type udc.com.grid_IDS_Btn
	 */
	var grid_ids_btn1 = e.control;
	
	util.Control.setFocus(app, "ipbFrfPgmId");
	
	//조회조건의 값
	var vsUnitSystemRcd = util.DataMap.getValue(app, "dmReqList", "strUnitSystemRcd");
	var vsLanDivRcd = util.DataMap.getValue(app, "dmReqList", "strLanDivRcd");
	
	util.Grid.setCellValue(app, "grdCmnPgm", "UNIT_SYSTEM_RCD", vsUnitSystemRcd);
	util.Grid.setCellValue(app, "grdCmnPgm", "LAN_DIV_RCD", vsLanDivRcd);
	
	util.Grid.setCellValue(app, "grdCmnPgm", "USE_YN", "Y");
	util.Grid.setCellValue(app, "grdCmnPgm", "APLY_YN", "Y");
	util.Grid.setCellValue(app, "grdCmnPgm", "PGM_DIV_RCD", "CB00402");
	util.Grid.setCellValue(app, "grdCmnPgm", "PGM_TYPE_RCD", "CB00301");
	
}


function doSave() {

	//그리드 변경사항 체크
	if(!util.Grid.isModified(app, "grdCmnPgm","MSG")){
		return false;
	}
	
	//그리드 유효성 검증
	if(!util.validate(app, "grdCmnPgm")){
		return false;
	}

	util.Submit.send(app, "subSave", function(pbSuccess){
		if(pbSuccess){
			doList(function(pbListSuccess){
				if (pbListSuccess) util.Msg.notify(app, "NLS-INF-M025");
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
	doSave();
}


/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnFileUpLoadClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnFileUpLoad = e.control;
	util.FileUtil.getFileName(".xls , .xlsx", function(paFiles){
		
		var voSubPgmSave = app.lookup("subPgmSave");
		
		util.Submit.addFileParameter(app, "subPgmSave", paFiles);
		
		util.Submit.send(app, "subPgmSave", function(pbSuccess){
			
			if(pbSuccess){
				doList();
			}
		});
	}, 1);
}

/*
 * 사용자 정의 컨트롤에서 idrCommonEvent 이벤트 발생 시 호출.
 */
function onGrid_ids_btn1IdrCommonEvent(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type udc.com.grid_IDS_Btn
	 */
	var grid_ids_btn1 = e.control;
	util.Control.redraw(app, "frfCmnPgm");
}
