var util = new ComUtil(app);

/** 조회
 * @desc 
 * @param 조회후 콜백함수
 */
function doList(poCallBackFunc){
	util.Submit.send(app, "subList", function(pbSuccess){
		if(pbSuccess){
			util.Control.redraw(app, "grdCmnPgm");
			
			//조회 후 콜백함수 수행
			if(util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
		}
	});
}

/**
 * @desc doUTestIng event 진행내역 조회한다.
 * @return void
 */
function doUTestIng(poCallBackFunc){
	var vnPgmRow = util.Grid.getIndex(app, "grdCmnPgm");
	var vnRow = util.Grid.getIndex(app, "grdCmnUtestStep");
	var vsSeq = util.Grid.getCellValue(app, "grdCmnUtestStep","SEQ",vnRow);
	var vsPgmId = util.Grid.getCellValue(app, "grdCmnPgm","PGM_ID",vnPgmRow);
	util.DataMap.setValue(app, "dmReqList", "strTestSerialNo", vsSeq);
	util.DataMap.setValue(app, "dmReqList", "strUtestIngPgmId", vsPgmId);

	util.Submit.send(app, "subListDtl", function(pbSuccess){
		if(pbSuccess){
			util.Control.redraw(app, "grdCmnUtestRslt");
			
			// 조회 후 콜백함수 수행
			if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
		}
	});
}

/**
 * @desc doUTestGrp event 진행내역 조회한다.
 * @return void
 */
function doUTestGrp(poCallBackFunc){
	var vnRow = util.Grid.getIndex(app, "grdCmnPgm");
	var vsPgmId = util.Grid.getCellValue(app, "grdCmnPgm","PGM_ID",vnRow);
	
	util.DataMap.setValue(app, "dmReqList", "strUtestGrpPgmId", vsPgmId);

	util.Submit.send(app, "subSubList", function(pbSuccess){
		if(pbSuccess){
			util.Control.redraw(app, "grdCmnUtestStep");

			// 조회 후 콜백함수 수행
			if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
		}
	});
}

/**
 * @desc doTreeMenuClick event 메뉴 클릭시 조회조건 셋팅후 데이터 조회
 * @return void
 */
function doTreeMenuClick(){
	var vsValue = util.Tree.getSelectedValue(app, "trvCmnMenu");
			
	if(vsValue == null){
		//선택된 데이터가 없습니다.
		util.Msg.warn("M008");
		return false;
	}	

	var voValueNode = util.DataSet.findRow(app, "dsTrvCmnMenu", "KEYSET == '" + vsValue + "'");
	
	if(voValueNode.getValue("PGM_ID") !="MENUHEADER")	{
		util.Control.setValue(app, app, "ipbPgmId", voValueNode.getValue("PGM_ID"));
		util.Control.setValue(app, app, "ipbPgmNm", voValueNode.getValue("PGM_NM"));
		var btnSearch = app.lookup("btnSearch");
		btnSearch.click();
	}
}

/**
 * @desc 메뉴검색 팝업 콜백함수
 * @return void
 */
function doMenuSearchAfter(){
	var vsMenuId = util.Control.getValue(app, "ipbPgmId");   //조회조건 프로그램 아이디
	var vsMenuNm = util.Control.getValue(app, "ipbPgmNm");//트리 프로그램 메뉴명
	var vsSchMenuId = util.Control.getValue(app, "ipbSchPgmId");//트리 프로그램 메뉴ID
	
	if(vsSchMenuId !=""){
		//펼쳐진 트리 모두 감추기
		util.Tree.expandAllItems(app, "trvCmnMenu", false);
		//메뉴명 으로 검색
		util.Tree.getItem("trvCmnMenu", vsMenuNm, "LABEL");
		//트리선택 메뉴 조회
		doTreeMenuClick();
	}
}

/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	//서브미션 실행
	util.Submit.send(app, "subOnInit", function(pbSuccess){
		if(pbSuccess){
			util.Control.redraw(app, ["cbbSysDiv"]);
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
	if(!util.validate(app, "grpSearch")) return false;
	
	doList(function(pbSuccess){
		if(pbSuccess){
			var vnCnt = util.Grid.getRowCount(app, "grdCmnPgm");
			var vnFailCnt = 0;
			
			if(vnCnt == 0){
				util.Control.reset(app, app, ["grdCmnUtestStep", "grdCmnUtestRslt"]);
			}else{
				for(var i = 0 ; i < vnCnt ; i++){
					var vsUtestYn = util.Grid.getCellValue(app, "grdCmnPgm", "EXIST_TEST_CASE_YN", i);
					var vsDoNotCnt = util.Grid.getCellValue(app, "grdCmnPgm", "DONOT_CNT", i);
					
					//컬러 바인딩 사용
					//1. 테스트 케이스가 등록이 안 된 경우
					if(ValueUtil.fixNull(vsUtestYn) != "Y"){
//						ExtRepeat.Cell("rptCmnPgm", 2, i, "PGM_NM", "#c5141c")
						vnFailCnt++;
					//2.미완료된 테스트 건수가 남아있는 경우
					}else if(vsDoNotCnt > 0){
//						ExtRepeat.Cell("rptCmnPgm", 2, i, "PGM_NM", "#0000ff")
						vnFailCnt++;
					}
				}
			}
			util.Control.setValue(app, app, "lblFailCnt", vnFailCnt);
			
			//조회되었습니다.
//			util.Msg.info("M024");
		}
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
 * 그리드에서 selection-change 이벤트 발생 시 호출.
 * detail의 cell 클릭하여 설정된 selectionunit에 해당되는 단위가 선택될 때 발생하는 이벤트.
 */
function onGrdCmnPgmSelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grdCmnPgm = e.control;
	if(util.Grid.getIndex(app, "grdCmnPgm") == -1){
		return false;
	}
	
	//단위테스트그룹
	doUTestGrp(function(pbSuccess){
		var vnCnt = util.Grid.getRowCount(app, "grdCmnUtestStep");
		if(vnCnt == 0){
			util.Control.reset(app, app, "grdCmnUtestRslt");
		}
		//조회되었습니다.
		if(pbSuccess) util.Msg.alert("NLS-INF-M024");
	});
}

/*
 * 그리드에서 selection-change 이벤트 발생 시 호출.
 * detail의 cell 클릭하여 설정된 selectionunit에 해당되는 단위가 선택될 때 발생하는 이벤트.
 */
function onGrdCmnUtestStepSelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grdCmnUtestStep = e.control;
	if(util.Grid.getIndex(app, "grdCmnUtestStep") == -1){
		return false;
	}
	
	doUTestIng(function(pbSuccess){
		//조회되었습니다.
		util.Msg.alert("NLS-INF-M024");
	});
}
