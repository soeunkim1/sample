var util = new ComUtil(app);

/**
 * 호출한 페이지에서 파라미터 받기
 */
function doParentGet(){
	// 팝업일 경우 부모창에 넘겨준 값을 복사될 대상 인스턴스로 넣어준다.
	if(util.Dialog.isPopup(app)){
		var voStdCmnProjectProgressRateMenuSch = app.getHostProperty("initValue");
		
		if(!ValueUtil.isNull(voStdCmnProjectProgressRateMenuSch)){
			var vsBaseDt = voStdCmnProjectProgressRateMenuSch[0].iBaseDt;    // 기준일자
			var vsBaseYoil = voStdCmnProjectProgressRateMenuSch[0].iBaseYoil;  // 기준요일
			var vsUnitSystemRcd = voStdCmnProjectProgressRateMenuSch[0].iUnitSystemRcd; // 단위시스템
			
			util.DataMap.setValue(app, "dmReqKey", "strBaseDt", vsBaseDt);
			util.DataMap.setValue(app, "dmReqKey", "strUnitSystemRcd", vsBaseYoil);
			util.DataMap.setValue(app, "dmReqKey", "strBaseYoil", vsUnitSystemRcd);
		}
	}
}

/**
 * 조회버튼 이벤트 (단위시스템 중메뉴별 목록을 조회한다.)
 */
 function doList(){
 	//조회 서브미션 호출
 	util.Submit.send(app, "subList", function(pbSuccess){
 		if(pbSuccess){
 			//메뉴목록
 			util.Control.redraw(app, "grdProgressDtl");
 		}
 	});
 }
 
/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	//부모창에서 전달한 값을 받는다.
	doParentGet();
	
	//서브미션 실행 (실패 시 cover page)
	doList();
}

/*
 * "" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnCloseClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnClose = e.control;
	app.close();
}
