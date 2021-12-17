//공통 모듈 사용
var util = new ComUtil(app);
/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	
		util.Submit.send(app, "subOnLoad",function(pbSuccess){
			if(pbSuccess){
			  util.Control.redraw(app, ["cbbMenuDivList","cbbSystemdiv"]);
			  util.SelectCtl.selectItem(app, "cbbMenuDivList", 0);
			  util.SelectCtl.selectItem(app, "cbbSystemdiv", 0);
			}
		});
	
}//onBodyLoad()

function doSearch(){
	var vaUnitSystemRcd = "";
	var vnCnt = util.SelectCtl.getItemCount("cbbSystemdiv");
	var voInstRow = null;
	var voResMap = null;
	var voListParam = null;
	
	for (var i = 0; i < vnCnt; i++) {
		voInstRow = i+1;
		var vsUnitSystemRcd = util.SelectCtl.getValue(app, "cbbSystemdiv",voInstRow);
		if (i == (vnCnt - 2)) {
			vaUnitSystemRcd += vsUnitSystemRcd;
			break;
		}
		vaUnitSystemRcd += vsUnitSystemRcd + ",";
	}
	util.DataMap.setValue(app, "dmReqList", "arrUnitSystemRcd", vaUnitSystemRcd)
	doList();
}

function doList(){
	util.Submit.send(app, "subList",function(pbSuccess){
		if(pbSuccess) {
			util.Msg.notify(app, "NLS-INF-M024");
			util.Control.redraw(app, "grdResourceList");
		}
	});
}

function doListInfo(){
	util.Submit.send(app, "subListInfo",function(pbSuccess){
		if(pbSuccess) {
			util.Control.redraw(app, "txtResourceInfo");
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
	//필수항목을 검사합니다.
	if(!util.validate(app, ["cbbMenuDivList","cbbResourceCd"])){
		return false;
	}
	doSearch();
}

/*
 * 콤보 박스에서 selection-change 이벤트 발생 시 호출.
 * ComboBox Item을 선택하여 선택된 값이 저장된 후에 발생하는 이벤트.
 */
function onCbbMenuDivListSelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.ComboBox
	 */
	var cbbMenuDivList = e.control;
	//메뉴구분에 따른 시스템구분 필터
	var vsMenuDivList = util.Control.getValue(app, "cbbMenuDivList");
	app.lookup("dsMenuSystemList").setFilter("UMENU_ID== '"+ vsMenuDivList +"'");
}

/*
 * 그리드에서 selection-change 이벤트 발생 시 호출.
 * detail의 cell 클릭하여 설정된 selectionunit에 해당되는 단위가 선택될 때 발생하는 이벤트.
 */
function onGrdResourceListSelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grdResourceList = e.control;
	
	var vsResouceCd = util.DataMap.getValue(app, "dmReqList", "strResouceCd");
	var vnIndex = util.Grid.getIndex(app, "grdResourceList");
	if(vsResouceCd == "VW"){
		var vsText = util.DataSet.getValue(app, "dsResourceList", vnIndex, "TEXT");
		util.DataMap.setValue(app, "dmResList", "TEXT", vsText);
		util.Control.redraw(app, "txtResourceInfo");
	}else{
		var vsResourceNm = util.DataSet.getValue(app, "dsResourceList", vnIndex, "OBJECT_NAME");		
		var vsLastDdlTime = util.DataSet.getValue(app, "dsResourceList", vnIndex, "LAST_DDL_TIME");
		//util.DataMap.setValue를 사용하면 리소스명 인풋박스 value가 표시 됨
//		util.DataMap.setValue("dmReqList", "strGrxResourceNm", vsResourceNm);
		util.Submit.addParameter("subListInfo", "strGrxResourceNm", vsResourceNm);
		util.DataMap.setValue(app, "dmReqList", "strLastDdlTime", vsLastDdlTime);

		doListInfo();
	}
}//onGrdResourceListSelectionChange()

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
