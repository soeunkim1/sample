/*공통모듈*/
var util = new ComUtil(app);

/*사용자 정의 함수*/
//조회
function doList(poCallBackFunc){
	util.Submit.send(app, "subList", function(pbSuccess){
		if(pbSuccess){
			if(util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
		}
	});
}

//저장
function doSave(){
	//그리드에 변경 사항이 있는지 체크
	if(!util.Grid.isModified(app, "grdCmnOptGrpCond", "MSG")){
		return false;
	}
	
	//그리드에서 필수값 체크
	if(!util.validate(app, "grdCmnOptGrpCond")){
		return false;
	}
	
	util.Submit.send(app, "subSave", function(pbSuccess){
		if(pbSuccess){
			doList(function(pbListSuccess){
				if(pbListSuccess){
					//MSG --> 갱신된 데이터가 조회되었습니다.
					util.Msg.notify(app, "NLS-INF-M025");
				}
			});
		}
	});
}

/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	//조회 위한 콤보박스를 불러옴
	util.Submit.send(app, "subOnLoad", function(pbSuccess){
		if(pbSuccess){
			util.SelectCtl.selectItem(app, "cbbOptGrpCd", 0);
			util.Control.redraw(app, "cbbOptGrpCd");
		}
	}, false);
}

/*
 * 사용자 정의 컨트롤에서 search 이벤트 발생 시 호출.
 */
function onBtnSearchSearch(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type udc.com.btnSearch
	 */
	var btnSearch = e.control;
	//변경사항 체크
	if(util.Grid.isModified(app, "grdCmnOptGrpCond", "CRM")){
		return false;
	}
	
	//콤보박스가 필수이므로 조건이 설정되었는지 체크
	if(util.validate(app, "grpSearch")){
		doList(function(pbSuccess){
			if(pbSuccess){
				util.Msg.notify(app, "NLS-INF-M024");
			}
		});		
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
	//행 추가 시 PK인 OPT_GRP_CD에 콤보값을 넣어줌
	var pnRowIndex = util.Grid.getIndex(app, "grdCmnOptGrpCond");
	var psValue = util.Control.getValue(app, "cbbOptGrpCd");
	util.Grid.setCellValue(app, "grdCmnOptGrpCond", "OPT_GRP_CD", psValue, pnRowIndex);
}

/*
 * 사용자 정의 컨트롤에서 delete 이벤트 발생 시 호출.
 */
function onGrid_ids_btn1Delete(/* cpr.event.CUIEvent */ e){
	/** 
	 * @type udc.com.grid_IDS_Btn
	 */
	var grid_ids_btn1 = e.control;
	
	//XXX 기존 eXbuilder5에서 제대로 동작하지 않아 로직 삭제
//	var vaChkRowOrSelRowIdx = util.Grid.getChkRowOrSelRowIdx("grdCmnOptGrpCond");
//	for(var i = 0; i < vaChkRowOrSelRowIdx.length ; i++){
//		var vsStdYn = util.DataSet.getValue("dsCmnOptGrpCond", vaChkRowOrSelRowIdx[i], "STD_YN");
//		var vsRowState = util.Grid.getRowState("grdCmnOptGrpCond", vaChkRowOrSelRowIdx[i]);
//
//		if(vsRowState != 2 && vsStdYn == "Y"){
//			util.Msg.alert("NLS-CMM-M002");
//			util.Grid.revertRowData("grdCmnOptGrpCond");
//			util.Control.lookup("ghCkbSelect").checked = false;
//			return false;
//		}else{
//			util.Grid.deleteRow("grdCmnOptGrpCond");			
//		}
//	}
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


