//공통 모듈 사용
var util = new ComUtil(app);

/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	
	util.Submit.send(app, "subOnLoad", function(pbSuccess){
		if(pbSuccess){
		  util.Control.redraw(app, ["cbbMenuDivList","cbbSystemdiv"]);
		  util.SelectCtl.selectItem(app, "cbbMenuDivList", 0);
		  util.SelectCtl.selectItem(app, "cbbSystemdiv", 0);
		}
	});
}//onBodyLoad()

/**
 * @desc doSearch event 테이블 목록 조회한다.
 * @param psArg 조회구분자
 * @return void
 */
function doSearch(){
	
	var vaUnitSystemRcd = "";
	var vnCnt = util.SelectCtl.getItemCount("cbbSystemdiv")
	var voInstRow = null;
	var voResMap = null;
	var voListParam = null;
	
	if(vnCnt > 1){
		for (var i = 0; i < vnCnt; i++) {
			voInstRow = i+1;
			var vsUnitSystemRcd = util.SelectCtl.getValue(app, "cbbSystemdiv",voInstRow);
			if (i == (vnCnt - 2)) {
				vaUnitSystemRcd += vsUnitSystemRcd;
				break;
			}
			vaUnitSystemRcd += vsUnitSystemRcd + ",";
		}
	}
	util.DataMap.setValue(app, "dmReqList", "arrUnitSystemRcd", vaUnitSystemRcd)
	util.Submit.send(app, "subList", function(pbSuccess){
		if (pbSuccess) {
			util.Control.redraw(app, "grdTableMain");
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
		// 엔터키 입력시 조회
	if (e.keyCode == 13) {
		app.lookup("btnSearch").click();
	}
}//onGrpSearchKeydown()

/*
 * "" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnSearchClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnSearch = e.control;
	doSearch("btnSearch");
}//onBtnSearchClick()

/*
 * 그리드에서 selection-change 이벤트 발생 시 호출.
 * detail의 cell 클릭하여 설정된 selectionunit에 해당되는 단위가 선택될 때 발생하는 이벤트.
 */
function onGrdTableMainSelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grdTableMain = e.control;
	
	if(util.Grid.getIndex(app, "grdTableMain") == -1){
		return false;
	}
	
	var vnRow = util.Grid.getIndex(app, "grdTableMain")
	var vsTableName = util.Grid.getCellValue(app, "grdTableMain","OBJECT_NAME",vnRow)
	util.DataMap.setValue(app, "dmReqList", "strTableName", vsTableName);
	// 테이블정의 조회한다.
	doColumnList();
}//onGrdTableMainSelectionChange

/**
 * @desc doColumnList event 테이블정의,인덱스 조회한다.
 */
function doColumnList(){
	
	//비동기 처리 후 실행될 콜백 메서드를 voFunc에 할당한다.
	var voFunc = function(vbSuccess) {
		if (vbSuccess == true) {

			util.Control.redraw(app, "grdTableDefine");
			if(util.Grid.getRowCount(app, "grdTableDefine") != 0){
				util.Grid.selectRow(app, "grdTableDefine", 0);
			}
			
			util.Control.redraw(app, "grdTableIndex");
			if(util.Grid.getRowCount(app, "grdTableIndex") != 0){
				util.Grid.selectRow(app, "grdTableIndex", 0);
			}
			// import 헤더(header.xrf) 말풍선 옆에 특정 메세지를 표시한다. ("조회되었습니다.")
			util.Msg.notify(app, "NLS-INF-M024");
		}
	};
	util.Submit.send(app, "subColumnList", voFunc);
	
}//doColumnList()
/*
 * 그리드에서 selection-change 이벤트 발생 시 호출.
 * detail의 cell 클릭하여 설정된 selectionunit에 해당되는 단위가 선택될 때 발생하는 이벤트.
 */
function onGrdTableDefineSelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grdTableDefine = e.control;
	
	if(util.Grid.getIndex(app, "grdTableDefine") == -1){
		return false;
	}
	
	var vnIndex = util.Grid.getIndex(app, "grdTableDefine");
	var vsComment = util.DataSet.getValue(app, "dsTableDefine", vnIndex, "COL_NAME");
	var vsIsValue = vsComment.indexOf('[');
	var vsCd = "";

	if(vsIsValue > -1){
		vsCd = vsComment.split('[');
		vsCd = vsCd[1].replace(']', "");
		if(vsCd == null)return false;	
	}
	
	util.DataMap.setValue(app, "dmReqList", "strCd", vsCd);
	if (!doCodeList()){
		return false;
	} 
	
}//onGrdTableDefineSelectionChange

/**
 * @desc doCodeList event 구분코드 조회한다.
 * @return void
 */
function doCodeList(){
	util.Submit.send(app, "subCodeList", function(pbSuccess){
		if (pbSuccess) {
			util.Control.redraw(app, "grdGbnCode");
			if(util.Grid.getRowCount(app, "grdGbnCode") != 0){
				util.Grid.selectRow(app, "grdGbnCode", 0);	
			}
			util.Control.redraw(app, "grdGbnCode_title");
		}
	});
}//doCodeList()

/*
 * "" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnPrintClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnPrint = e.control;
	
	var vcMenu = new cpr.controls.Menu("menu");
	vcMenu.addItem(new cpr.controls.TreeItem("테이블정의서출력", "1", "root"));
	vcMenu.addItem(new cpr.controls.TreeItem("데이터업로드", "2", "root"));
	vcMenu.addItem(new cpr.controls.TreeItem("데이터양식다운로드", "3", "root"));
	
	vcMenu.addEventListener("selection-change", function(/**@type cpr.events.CSelectionEvent */ e){
		var vaNewSelection = e.newSelection;
		switch(vaNewSelection[0].value){
			case "1":
				doPrint();
			break;
			case "2":
				doDataUpLoad();
			break;
			case "3":
				doTableFormDown();
			break;
		}
		vcMenu.hide();
		vcMenu.dispose();
	});
	
	vcMenu.addEventListenerOnce("blur", function(/**@type cpr.events.CFocusEvent*/ e){
		vcMenu.hide();
		vcMenu.dispose();	
	});
	
	vcMenu.rootValue = "root";
	
	/**@type cpr.controls.Container */
	var vcRootContainer = app.getRootAppInstance().getContainer();
	vcRootContainer.addChild(vcMenu, {
		positions: [
			
			{
				"media": "all and (min-width: 1024px)",
				width: "200px",
				height: "100px",
				position: "absolute",
				left: e.x + "px",
				top: e.y + "px"
			},
			{
				"media": "all and (min-width: 500px) and (max-width: 1024px)",
				width: "200px",
				height: "100px",
				position: "absolute",
				left: e.x + "px",
				top: e.y + "px"
			},
			{
				"media": "all and (max-width: 500px)",
				width: "200px",
				height: "100px",
				position: "absolute",
				left: e.x + "px",
				top: e.y + "px"
			}
		]
	});
	vcMenu.focus();
	
}//onBtnPrintClick()

/**
 * @desc doDataUpLoad event 출력한다.
 * @return void
 */
function doDataUpLoad(){
	if(util.Grid.getRowCount(app, "grdTableMain") < 1) {
		return;
	}
	util.FileUtil.getFileName(".xls , .xlsx", function(psFileNm){
		if(psFileNm){
			util.Submit.addFileParameter(app, "subDataUpLoad", psFileNm);
			util.Submit.send(app, "subDataUpLoad", function(pbSuccess){
				if(pbSuccess){
			
				}
			});
		}
	}, 1);
}//doDataUpLoad()

/**
 * @desc doPrint event 출력한다.
 * @return void
 */
function doPrint(){
	
	if(util.Grid.getRowCount(app, "grdTableMain") < 1){
		return;
	}
	util.Submit.send(app, "subExportExcel", function(pbSuccess){
		if(pbSuccess){
			
		}
	});
}//doPrint()
/**
 * @desc doTableFormDown event 출력한다.
 * @return void
 */
function doTableFormDown(){
	if(util.Grid.getRowCount(app, "grdTableMain") < 1){
		return;
	}
	
	util.Submit.send(app, "subFormDown", function(pbSuccess){
		if(pbSuccess){

		}
	});
}//doTableFormDown()

/*
 * 콤보 박스에서 selection-change 이벤트 발생 시 호출.
 * ComboBox Item을 선택하여 선택된 값이 저장된 후에 발생하는 이벤트.
 */
function onCbbMenuDivListSelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.ComboBox
	 */
	var cbbMenuDivList = e.control;
	
	//cascadeList 사용시 조회가 다르게 출력됨
//	util.SelectCtl.cascadeList("cbbMenuDivList", "cbbSystemdiv", "UMENU_ID",0);

	var vsMenuDivList = util.Control.getValue(app, "cbbMenuDivList");
	app.lookup("dsMenuSystemList").setFilter("UMENU_ID== '"+ vsMenuDivList +"'");
	
}//onCbbMenuDivListSelectionChange()
