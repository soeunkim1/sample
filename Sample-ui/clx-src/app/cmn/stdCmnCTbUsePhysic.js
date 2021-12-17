//공통 모듈 사용
var util = new ComUtil(app);

/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	
}//onBodyLoad()

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

	if(!util.validate(app, "ipbSchStId")){
		return false;
	}
	doSearch();
}//onBtnSearchClick()

/**
 * @desc doSearch event 조회
 * @return void
 */
function doSearch(){
	util.Submit.send(app, "subList", function(pbSuccess){
		if (pbSuccess) {
			util.Control.redraw(app, "grdUsePhsList");
			util.Msg.notify(app, "NLS-INF-M024");
		}
	});
}//doSearch()

