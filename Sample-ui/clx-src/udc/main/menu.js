//var comUtil = createComUtil(app);
var comUtil = new ComUtil(app);
/**
 * 외부에서 메뉴 선택처리
 **/
exports.selectMenu = function(menuId) {
	
}

exports.getSubMenuList = function(vsTopMenuId){
	
	var dmReqKey = app.lookup("dmReqKey");
	dmReqKey.setValue("strTopMenuId", vsTopMenuId);
	var subGetMenuList = app.lookup("subGetMenuList");
	subGetMenuList.send();
}
/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	
}

/*
 * 서브미션에서 submit-success 이벤트 발생 시 호출.
 * 통신이 성공하면 발생합니다.
 */
function onSubGetMenuListSubmitSuccess(/* cpr.events.CSubmissionEvent */ e){
	/** 
	 * @type cpr.protocols.Submission
	 */
	var subGetMenuList = e.control;
	var menuTree = app.lookup("mnu");
//	menuTree.expandAllItems();
	menuTree.redraw();
}

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



/*
 * 메뉴에서 before-selection-change 이벤트 발생 시 호출.
 * 선택된 Item 값이 저장되기 전에 발생하는 이벤트. 다음 이벤트로 selection-change가 발생합니다.
 */
function onMnuBeforeSelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.Menu
	 */
	var mnu = e.control;
	var oldSelection = e.oldSelection; // event 객체에 대한 명세(어떤 객체들이 들어가 있는지, API 또는 도움말) --> API를 통해 세부 메소드 및 객체 접근 참조
	var newSelection = e.newSelection; // event 객체에 대한 명세(어떤 객체들이 들어가 있는지, API 또는 도움말) --> API를 통해 세부 메소드 및 객체 접근 참조
	
	var eventObject = new cpr.events.CSelectionEvent("menu_before_select", { oldSelection: createEventParam(oldSelection), newSelection: createEventParam(newSelection) });
	app.dispatchEvent(eventObject);
	
	// 메뉴의 선택 차단
	if(eventObject.defaultPrevented == true) {
		e.preventDefault();
	}
	
}

/*
 * 메뉴에서 selection-change 이벤트 발생 시 호출.
 * Menu Item을 선택하여 선택된 값이 저장된 후에 발생하는 이벤트.
 */
function onMnuSelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.Menu
	 */
	var mnu = e.control;
	var oldSelection = e.oldSelection; // event 객체에 대한 명세(어떤 객체들이 들어가 있는지, API 또는 도움말) --> API를 통해 세부 메소드 및 객체 접근 참조
	var newSelection = e.newSelection; // event 객체에 대한 명세(어떤 객체들이 들어가 있는지, API 또는 도움말) --> API를 통해 세부 메소드 및 객체 접근 참조

	var eventObject = new cpr.events.CSelectionEvent("menu_select", { oldSelection: createEventParam(oldSelection), newSelection: createEventParam(newSelection) });
	app.dispatchEvent(eventObject);
	
}

/*
 * 메뉴에서 item-click 이벤트 발생 시 호출.
 * 아이템 클릭시 발생하는 이벤트.
 */
function onMnuItemClick(/* cpr.events.CItemEvent */ e){
	/** 
	 * @type cpr.controls.Menu
	 */
	var mnu = e.control;
	var selectedItem = e.item;
	var eventObject = new cpr.events.CItemEvent("menu_click", { item: createEventParam(selectedItem) });
	app.dispatchEvent(eventObject);
	
}
