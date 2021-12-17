var util = new ComUtil(app);
/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	util.Submit.send(app, "subOnLoad", function(pbSuccess){
		if(pbSuccess){
			util.SelectCtl.selectItem(app, "cbbGrpUsePlcRcd", 0);
		}
	}, true);
}

/**
 * @desc 조회 event
 * @param poCallBackFunc 조회 후 callback 함수
 * @return void
 */
function doList(poCallBackFunc){
	util.Submit.send(app, "subList", function(pbSuccess){
		if(pbSuccess){
			util.Control.redraw(app, "grdCmnOptGrp");
			if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess); 
		}
	});
}

/**
 * @desc 저장 event
 * @return void
 */
function doSave(){
	
	//그리드 변경사항 체크
	if(!util.Grid.isModified(app, "grdCmnOptGrp","MSG")){
		return false;
	}
	//그리드 유효성 검증
	if(!util.validate(app, "grdCmnOptGrp")){
		return false;
	}
	
	util.Submit.send(app, "subSave", function(pbSuccess){
		if(pbSuccess){
			doList(function(pbListSuccess){
				if (pbListSuccess){
					// MSG : 갱신된 데이터가 조회되었습니다. header 메시지 표시
					util.Msg.notify(app, "NLS-INF-M025");
				}
			}); 
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
	
	//현재 insert된 row index
	var vnIdx = util.Grid.getIndex(app, "grdCmnOptGrp");
	//현재 조회조건(그릅사용처)의 value
	var vsValue = util.SelectCtl.getValue("cbbGrpUsePlcRcd");
	
	//선택된 조회조건이 있을 경우, 조회조건과 동일한 그리드 컬럼에 현재 조회조건의 value를 자동 셋팅.
	if(vsValue != "%"){
		util.Grid.setCellValue(app, "grdCmnOptGrp", "GRP_USE_PLC_RCD", vsValue, vnIdx);
	}
	
	// TODO eXbuilder5의 주석 >> 조회조건에 셋팅된 내역이 있으면(???), 동작은 신규시 사용여부 'Y'자동셋팅. 
	// 신규시 자동셋팅한다.(사용여부 ='Y')
	util.Grid.setCellValue(app, "grdCmnOptGrp", "USE_YN", "Y", vnIdx);
}

/*
 * 사용자 정의 컨트롤에서 delete 이벤트 발생 시 호출.
 */
function onGrid_ids_btn1Delete(/* cpr.event.CUIEvent */ e){
	/** 
	 * @type udc.com.grid_IDS_Btn
	 */
	var grid_ids_btn1 = e.control;
	
	var vaCheckedIdx = util.Grid.getCheckOrSelectedRowIndex(app, "grdCmnOptGrp");
	
	for(var i = 0 ; i < vaCheckedIdx.length ; i ++){
		var vsStdYn = util.Grid.getCellValue(app, "grdCmnOptGrp", "STD_YN", vaCheckedIdx[i]);
		var vsRowStatus = util.Grid.getRowState(app, "grdCmnOptGrp", vaCheckedIdx[i]);
	
		if(vsRowStatus != cpr.data.tabledata.RowState.INSERTED && vsStdYn == "Y"){
			util.Msg.notify(app, "NLS-CMM-M002");
			return false;
		}
	}
	
	util.Grid.deleteRow(app, "grdCmnOptGrp");
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
 * "조회" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnSearchClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnSearch = e.control;
	
	if(util.Grid.isModified(app, )){
			return false;
	}
	
	//조회 실행
	doList(function(pbSuccess){
		if (pbSuccess){ 
			// MSG : 조회되었습니다. header 메시지 표시
			util.Msg.notify(app, "NLS-INF-M024");
		}
	});
}
