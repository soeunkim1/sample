//cpr.core.NotificationCenter.INSTANCE.subscribe("notice", this, function(msg) {
//	var glbConsole = app.lookup("glb_console");
//	glbConsole.info(msg);
//});

var util = new ComUtil(app);

cpr.core.NotificationCenter.INSTANCE.subscribe("app-logout", this, function(msg) {
	app.lookup("btnLogout").click();
});


function createEventParam(selection) {
	var param = {menuId : null, menuNm : null, appId : null};
	if(selection) {
		var item;
		if(Array.isArray(selection)) {
			if(selection.length > 0) {
				item = selection[0].row;
			} else {
				return param;
			}
		} else {
			item = selection.row;
		}
		param.menuKey = item.getValue("MENU_KEY");
		param.umenuKey = item.getValue("UMENU_KEY");
		param.menuNm = item.getValue("MENU_NM");
		param.appId = item.getValue("CALL_PAGE");
	}
	return param;
}


exports.getAppHeader = function(){
	return app.lookup("ngbHeaderMenu");
}

exports.getApp = function(){
	return app;
}

exports.getHeaderId = function(){
	var vcHeaderMenu =  app.lookup("ngbHeaderMenu");
	var items = vcHeaderMenu.getSelection();
	return items[0].value;
}






/*
 * "Logout" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	app.dispatchEvent(new cpr.events.CUIEvent("logout"));
}

/*
 * "X" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick2(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	app.dispatchEvent(new cpr.events.CUIEvent("close"));
}



/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	var subLoadMenu = app.lookup("sub_header_load");
	subLoadMenu.send();
	
	
}

/*
 * 서브미션에서 submit-success 이벤트 발생 시 호출.
 * 통신이 성공하면 발생합니다.
 */
function onSub_header_loadSubmitSuccess2(/* cpr.events.CSubmissionEvent */ e){
	/** 
	 * @type cpr.protocols.Submission
	 */
	
	var sub_header_load = e.control;
	var vcNgbHeader = app.lookup("ngbHeaderMenu");
	vcNgbHeader.redraw();
	var vnItemCnt = vcNgbHeader.getItemCount();
	if(vnItemCnt > 0){
		vcNgbHeader.selectItem(0);
	}
	
}


/*
 * 네비게이션 바에서 selection-change 이벤트 발생 시 호출.
 * 선택된 Item 값이 저장된 후에 발생하는 이벤트.
 */
function onNgbHeaderMenuSelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.NavigationBar
	 */
	var menuTree = e.control;
	var oldSelection = e.oldSelection; // event 객체에 대한 명세(어떤 객체들이 들어가 있는지, API 또는 도움말) --> API를 통해 세부 메소드 및 객체 접근 참조
	var newSelection = e.newSelection; // event 객체에 대한 명세(어떤 객체들이 들어가 있는지, API 또는 도움말) --> API를 통해 세부 메소드 및 객체 접근 참조
	
	var eventObject = new cpr.events.CSelectionEvent("headerMenuSelection", { oldSelection: createEventParam(oldSelection), newSelection: createEventParam(newSelection) });
	app.dispatchEvent(eventObject);
	
	// 메뉴의 선택 차단
	if(eventObject.defaultPrevented == true) {
		e.preventDefault();
	}
	
//	onNgbHeaderMenuItemClick(e);
//	var ngbHeaderMenu = e.control;
//	app.dispatchEvent(new cpr.events.CUIEvent("headerMenuSelection"));
	
}

/*
 * 네비게이션 바에서 item-click 이벤트 발생 시 호출.
 * 아이템 클릭시 발생하는 이벤트.
 */
function onNgbHeaderMenuItemClick(/* cpr.events.CItemEvent */ e){
	/** 
	 * @type cpr.controls.NavigationBar
	 */
	var menuTree = e.control;
	
	var selectedItem = e.item;
	
	var eventObject = new cpr.events.CItemEvent("header_menu_click", { item: createEventParam(selectedItem) });
	app.dispatchEvent(eventObject);
}

/*
 * 이미지에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onImageClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Image
	 */
	var image = e.control;
	app.dispatchEvent(new cpr.events.CUIEvent("logo_click"));
}


