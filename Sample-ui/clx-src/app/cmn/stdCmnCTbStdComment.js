//공통 모듈 사용
var util = new ComUtil(app);

/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	
	util.Submit.send(app, "subOnInit", function(pbSuccess){
		if(pbSuccess){
			util.Control.redraw(app, "ckbSelect");
			util.SelectCtl.selectItem(app, "cbbChose",0);
		}
	});
}

/*
 * 콤보 박스에서 selection-change 이벤트 발생 시 호출.
 * ComboBox Item을 선택하여 선택된 값이 저장된 후에 발생하는 이벤트.
 */
function onCbbChoseSelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.ComboBox
	 */
	var cbbChose = e.control;
	var vsCbbChoseLabel = util.SelectCtl.getLabel(app, "cbbChose", util.SelectCtl.getSelectedIndex(app, "cbbChose"));
	var vcGrid = app.lookup("grdMst");
	
	if(vsCbbChoseLabel == "컬럼기준COMENT"){
		util.Control.setFieldLabel("grdMst", "UI-SCR-CLUM_CMT_BASE");
	}else{
		util.Control.setFieldLabel("grdMst", "UI-SCR-CMT_CLUM_BASE");
	}
	util.Control.redraw(app, "grdMst_title");
}//onCbbChoseSelectionChange()

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
	if(!util.validate(app, "cbbChose")){
		return false;
	}
	//process에서 method지정
	doSearch(util.DataMap.getValue(app, "dmRoot", "vsCommnetcbbChose"));
}//onBtnSearchClick()

/**
 * @desc doSearch event 화면 조회
 * @param psCommend 조회구분
 * @return void
 */
function doSearch(psCommend){
	app.lookup("subList").action ="cmn/CmnTbComment/";
	app.lookup("subList").action += psCommend + ".do";
	util.Submit.send(app, "subList", function(pbSuccess){
		if (pbSuccess) {
			util.Control.redraw(app, "grdMst");
			util.Msg.notify(app, "NLS-INF-M024");
		}
	});		
}//doSearch()
