//공통 모듈 사용
var util = new ComUtil(app);

/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	
	
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
    if(util.Grid.isModified(app, "grdMstList", "CRM")){
		return false;
	}
	doSearch();
}//onBtnSearchClick()


/**
 * @desc doSearch event 화면 초기화
 * @param psBtnId 버튼ID
 */
function doSearch(){
	
	util.Submit.send(app, "subList", function(pbSuccess){
		if (pbSuccess) {
			util.Control.redraw(app, "grdMstList");
				// 우측상단 메세지창에 메세지를 입력한다. "조회되었습니다. "
				util.Msg.notify(app, "NLS-INF-M024");
		}
	});
	
}//doSearch()

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
}//onGrpSearchKeydown()

/*
 * 사용자 정의 컨트롤에서 save 이벤트 발생 시 호출.
 */
function onGrid_ids_btn1Save(/* cpr.event.CUIEvent */ e){
	/** 
	 * @type udc.com.grid_IDS_Btn
	 */
	var grid_ids_btn1 = e.control;
	doSave()
}//onGrid_ids_btn1Save()

/**
 * @desc doSave event 저장
 * @return void
 */
function doSave(){

   // 리피터 변경사항 체크
	if (!util.Grid.isModified(app, "grdMstList", "MSG")) {
		return false;
	}
	
	// 그리드 유효성 검증
	if (!util.validate(app, "grdMstList")) {
		return false;
	}
	util.Submit.send(app, "subSave", function(pbSuccess){
		if(pbSuccess){
			doSearch();
		}
	});
}//doSave()
/*
 * 사용자 정의 컨트롤에서 delete 이벤트 발생 시 호출.
 */
function onGrid_ids_btn1Delete(/* cpr.event.CUIEvent */ e){
	/** 
	 * @type udc.com.grid_IDS_Btn
	 */
	var grid_ids_btn1 = e.control;
//	var voRow =ExtRepeat.getIndex("rptMstList");
	var voRow = util.Grid.getIndex(app, "grdMstList");
	if (voRow == null) {
//		ComMsg.alert(NLS.WRN.M008);
		util.Msg.alert("NLS-WRN-M008");
		return;
	}
}

/*
 * "" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnNewFileClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnNewFile = e.control;
	doFileCreate();
}//onBtnNewFileClick()

/**
 * @desc doFileCreate event 파일생성
 */
function doFileCreate(){
	
	util.Submit.send(app, "subFileDown", function(pbSuccess){
		if(pbSuccess){
			
		}
	});
	
}//doFileCreate()
