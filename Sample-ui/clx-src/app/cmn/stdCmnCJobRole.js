var util = new ComUtil(app);

/**
 * @desc 조회
 * @param poCallBackFunc 콜백함수
 */
function doList(poCallBackFunc){
	util.Submit.send(app, "subList", function(pbSuccess){
		if(pbSuccess){
			util.Control.redraw(app, "grdCmnRole");
			if(util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
		}
	});
}

/**
 * @desc 저장
 */
function doSave(){
	//그리드 변경사항 체크
	if(!util.Grid.isModified(app, "grdCmnRole", "MSG")){
			return false;
	}
	
	//그리드 validation check
	if(!util.validate(app, "grdCmnRole")) return false;
	
	util.Submit.send(app, "subSave", function(pbSuccess){
		if(pbSuccess){
			doList(function(pbListSuccess){
				//갱신된 데이터가 조회되었습니다.
				if(pbListSuccess) util.Msg.alert("NLS-INF-M025");
			});
		}
	});
}

//날짜 체크에서 실패 시 이전값으로 돌리기위해 바꾸기 전 저장해 놓는 변수
var msOrgStDt = "";
var msOrgEndDt = "";

/**
 * @desc 날짜 체크에서 실패 시 이전값으로 돌리기위해 날짜, 시간을 변수에 복사한다.
 */
function copyDateBeforeChange(){
	var vnIdx = util.Grid.getIndex(app, "grdCmnRole");
	
	msOrgStDt = util.Grid.getCellValue(app, "grdCmnRole", "ST_DT", vnIdx);
	msOrgEndDt = util.Grid.getCellValue(app, "grdCmnRole", "END_DT", vnIdx); 
}

/**
 * @desc 시작일자, 종료일자, 시작시간, 종료시간 입력 시 비교체크로직을 수행한다.
 * @param psColNm
 */
function checkCalendarTime(psColNm){
	var vsStDt = util.Grid.getCellValue(app, "grdCmnRole", "ST_DT");
	var vsEndDt = util.Grid.getCellValue(app, "grdCmnRole", "END_DT");
	
	if(psColNm == "ST_DT"){ //시작일자인 경우
		if(vsEndDt != "" && !(vsStDt <= vsEndDt)){
			util.Msg.alert("NLS-WRN-M129");
			util.Grid.setCellValue(app, "grdCmnRole", "ST_DT", msOrgStDt);
		}else{
			msOrgStDt = vsStDt;
		}
	}else if(psColNm == "END_DT"){ //종료일자인 경우
		if(vsStDt != "" && !(vsEndDt >= vsStDt)){
			util.Msg.alert("NLS-WRN-M129");
			util.Grid.setCellValue(app, "grdCmnRole", "END_DT", msOrgEndDt);
		}else{
			msOrgEndDt = vsEndDt;
		}
	}
}

/**
 * @desc 삭제 전 삭제할 데이터의 사용여부를 체크한다.
 */
function checkUseYnBefDel(){
	var vbResult = true;
	var vsSelIdxs = util.Grid.getCheckOrSelectedRowIndex(app, "grdCmnRole");
	
	if(ValueUtil.isNull(vsSelIdxs)){
		util.Msg.alert("NLS-INF-M005");
		return false;
	}
	
	var vaIdxs = null;
	if(String(vsSelIdxs).indexOf(",") != -1){
		vaIdxs = String(vsSelIdxs).split(",");
	}else{
		vaIdxs = [];
		vaIdxs[0] = vsSelIdxs;
	}
	
	var vsUseYn = "";
	for(var i = 0 ; i < vaIdxs.length ; i++){
		vsUseYn = util.Grid.getCellValue(app, "grdCmnRole", "USE_YN", vaIdxs[i]);
		if(vsUseYn == "Y"){
			vbResult = false;
			
			//사용중인 업무역할은 삭제할 수 없습니다.
			util.Msg.alert("NLS-CMM-M013");
			break;
		}
	}
	return vbResult;
}

/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	util.Submit.send(app, "subOnLoad", function(pbSuccess){
		if(pbSuccess){
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
	if(util.Grid.isModified(app, "grdCmnRole", "CRM")){
		return false;
	}
	
	doList(function(pbSuccess){
		//조회되었습니다.
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
	if (e.keyCode == cpr.events.KeyCode.ENTER) {
		var btnSearch = app.lookup("btnSearch");
		btnSearch.click();
	}
}

/*
 * 사용자 정의 컨트롤에서 insert 이벤트 발생 시 호출.
 */
function onGrid_ids_btn1Insert(/* cpr.event.CUIEvent */ e){
	/** 
	 * @type udc.com.grid_IDS_Btn
	 */
	var grid_ids_btn1 = e.control;
	util.Grid.setCellValue(app, "grdCmnRole", "ST_DT", "19000101");
	util.Grid.setCellValue(app, "grdCmnRole", "END_DT", "99991231");
}
/*
 * 사용자 정의 컨트롤에서 delete 이벤트 발생 시 호출.
 */
function onGrid_ids_btn1Delete(/* cpr.event.CUIEvent */ e){
	/** 
	 * @type udc.com.grid_IDS_Btn
	 */
	var grid_ids_btn1 = e.control;
	if(checkUseYnBefDel()){
		util.Grid.deleteRow(app, "grdCmnRole");
	}
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
 * 그리드에서 selection-change 이벤트 발생 시 호출.
 * detail의 cell 클릭하여 설정된 selectionunit에 해당되는 단위가 선택될 때 발생하는 이벤트.
 */
function onGrdCmnRoleSelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grdCmnRole = e.control;
	copyDateBeforeChange();
}

/*
 * 데이트 인풋에서 value-change 이벤트 발생 시 호출.
 * Dateinput의 value를 변경하여 변경된 값이 저장된 후에 발생하는 이벤트.
 */
function onGdDipStDtValueChange(/* cpr.events.CValueChangeEvent */ e){
	/** 
	 * @type cpr.controls.DateInput
	 */
	var gdDipStDt = e.control;
	checkCalendarTime("ST_DT");
}

/*
 * 데이트 인풋에서 value-change 이벤트 발생 시 호출.
 * Dateinput의 value를 변경하여 변경된 값이 저장된 후에 발생하는 이벤트.
 */
function onGdDipEndDtValueChange(/* cpr.events.CValueChangeEvent */ e){
	/** 
	 * @type cpr.controls.DateInput
	 */
	var gdDipEndDt = e.control;
	checkCalendarTime("END_DT");
}
