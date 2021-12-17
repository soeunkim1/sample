//공통 모듈 사용
var util = new ComUtil(app);

/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	
	util.Submit.send(app, "subOnLoad", function(pbSuccess){
		if (pbSuccess) {
			util.Control.setFocus(app, "ipbPgmNm");
		}
	},true);
	
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
	// 데이터 변경상태 체크 메시지 
	if (util.Grid.isModified(app, "grdCmnSbpDef", "CRM")) {
		return false;
	}
	
	doList(function(pbSuccess) {
		// 조회 : "조회되었습니다." header 메세지 표시
		util.Msg.notify(app, "NLS-INF-M024");
	});
	
}//onBtnSearchClick()

/**
 * @desc 조회 event
 * @param poCallBackFunc 조회 후 callback함수
 * @return void
 */
function doList(poCallBackFunc) {
	
	util.Submit.send(app, "subList", function(pbSuccess){
		if(pbSuccess){
			util.Control.redraw(app, "grdCmnSbpDef");
			// 조회 후 콜백함수 수행
			if(util.isFunc(poCallBackFunc)){
				poCallBackFunc(pbSuccess);
			}
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
}//onGrid_ids_btn1Save()

function doSave() {

	// 그리드 변경사항 체크
	if(!util.Grid.isModified(app, "grdCmnSbpDef","MSG")){
		return false;
	}
	//그리드 유효성 검증
	if(!util.validate(app, "grdCmnSbpDef")){
		return false;
	}
	
	util.Submit.send(app, "subSave", function(pbSuccess){
		if(pbSuccess){
			doList(function(pbListSuccess){
				if (pbListSuccess){
					// 조회 : "갱신된 데이터가 조회되었습니다." header 메세지 표시
					util.Msg.notify(app, "NLS-INF-M025");
				}
			}); 
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
	//Enter 입력시
	if (e.keyCode == 13) {
		app.lookup("btnSearch").click();
	}
}//onGrpSearchKeydown()
