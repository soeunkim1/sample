//공통 모듈 사용
var util = new ComUtil(app);

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

/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
		
	util.Submit.send(app, "subOnLoad", function(pbSuccess){
		if(pbSuccess){
		  util.Control.redraw(app, "ckbSelect")
		}
	});
}//onBodyLoad()

/*
 * "" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnSearchClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnSearch = e.control;
	//조회
	doSearch("btnSearch");
}//onBtnSearchClick()

/**
 * @desc doSearch event 화면 조회
 * @param psBtnId 버튼ID
 */
function doSearch(psBtnId){
	util.Submit.send(app, "subList", function(pbSuccess){
		if (pbSuccess) {
			util.Control.redraw(app, "grdMst");
			util.Msg.notify(app, "NLS-INF-M024");
		}
	});
}
