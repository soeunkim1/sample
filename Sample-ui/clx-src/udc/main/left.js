//var comUtil = createComUtil(app);
var util = new ComUtil(app);
/**
 * 외부에서 메뉴 선택처리
 **/
exports.selectMenu = function(menuId) {
	
}
exports.getMenuTreeApp = function(){
	
	return app.lookup("menuTree");
}

exports.insFavoriteMenu = function(){
	
	util.Submit.send("subFavorSave", function(pbSuccess){
		if(pbSuccess){
			
			doFavoriteMenu();
		}
	});
	
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
//	var subGetMenuList = app.lookup("subGetMenuList");
//	subGetMenuList.send();
	doFavoriteMenu();
}

function doFavoriteMenu(){
	
	util.Submit.send("subFavorite", function(pbSuccess){
		util.Control.redraw("treFavorite");
	});
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
	var menuTree = app.lookup("menuTree");
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
 * 트리에서 before-selection-change 이벤트 발생 시 호출.
 * 선택된 Item 값이 저장되기 전에 발생하는 이벤트. 다음 이벤트로 selection-change가 발생합니다.
 */
function onMenuTreeBeforeSelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.Tree
	 */
	var menuTree = e.control;
	var oldSelection = e.oldSelection; // event 객체에 대한 명세(어떤 객체들이 들어가 있는지, API 또는 도움말) --> API를 통해 세부 메소드 및 객체 접근 참조
	var newSelection = e.newSelection; // event 객체에 대한 명세(어떤 객체들이 들어가 있는지, API 또는 도움말) --> API를 통해 세부 메소드 및 객체 접근 참조
	
	var eventObject = new cpr.events.CSelectionEvent("menu_before_select", { oldSelection: createEventParam(oldSelection), newSelection: createEventParam(newSelection) });
	app.dispatchEvent(eventObject);
	
	// 메뉴의 선택 차단
	if(eventObject.defaultPrevented == true) {
		//e.preventDefault();
	}
}

/*
 * 트리에서 selection-change 이벤트 발생 시 호출.
 * 선택된 Item 값이 저장된 후에 발생하는 이벤트.
 */
function onMenuTreeSelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.Tree
	 */
	var menuTree = e.control;
	var oldSelection = e.oldSelection; // event 객체에 대한 명세(어떤 객체들이 들어가 있는지, API 또는 도움말) --> API를 통해 세부 메소드 및 객체 접근 참조
	var newSelection = e.newSelection; // event 객체에 대한 명세(어떤 객체들이 들어가 있는지, API 또는 도움말) --> API를 통해 세부 메소드 및 객체 접근 참조

	var eventObject = new cpr.events.CSelectionEvent("menu_select", { oldSelection: createEventParam(oldSelection), newSelection: createEventParam(newSelection) });
	app.dispatchEvent(eventObject);
}

/*
 * 트리에서 item-click 이벤트 발생 시 호출.
 * 아이템 클릭시 발생하는 이벤트.
 */
function onMenuTreeItemClick(/* cpr.events.CItemEvent */ e){
	/** 
	 * @type cpr.controls.Tree
	 */
	var menuTree = e.control;
	
	var selectedItem = e.item;
	
	var eventObject = new cpr.events.CItemEvent("menu_click", { item: createEventParam(selectedItem) });
	app.dispatchEvent(eventObject);
}



/*
 * "" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnExpendClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnExpend = e.control;
	var menuTree = app.lookup("menuTree");
	menuTree.expandAllItems();
	menuTree.redraw();
}

/*
 * "" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnCollapseClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnCollapse = e.control;
	var menuTree = app.lookup("menuTree");
	menuTree.collapseAllItems();
	menuTree.redraw();
	
}

/*
 * 인풋 박스에서 keydown 이벤트 발생 시 호출.
 * 사용자가 키를 누를 때 발생하는 이벤트.
 */
function onIpbMenuSearchKeydown(/* cpr.events.CKeyboardEvent */ e){
	/** 
	 * @type cpr.controls.InputBox
	 */
	var ipbMenuSearch = e.control;
	if (e.keyCode == 13) {
		var vsValue = ipbMenuSearch.value;
		
		var vcTree = app.lookup("menuTree");
		vcTree.collapseAllItems();
		if(!vsValue) return;
		vcTree.getItems().filter(function(item){
			if(item.label.indexOf(vsValue) >-1){
				var vsPValue = item.parentValue;
				var vaChildItem = vcTree.getChildren(item);
				var voParent = vcTree.getItemByValue(vsPValue);
				getParentMenuNode(voParent);
				vcTree.focusItem(item);
			}
			return false;
		});
		
		function getParentMenuNode(poTreeItem){
			
			if(!poTreeItem) return;
			
			if(poTreeItem.parentValue == "root"){
				vcTree.expandItem(poTreeItem);
			}else{
				vcTree.expandItem(poTreeItem);
				getParentMenuNode(vcTree.getItemByValue(poTreeItem.parentValue));
			}
		}
		/*
		var vaTreeItems = vcTree.findItems({label:vsValue});
		
		for(var key in vaTreeItems){
			var vsPValue = vaTreeItems[key].parentValue;
			if(!vsPValue) break;
			var vaChildItem = vcTree.getChildren(vaTreeItems[key]);
			if(vaChildItem.length > 0) break;
			var voParent = vcTree.getItemByValue(vsPValue);
			getParentMenuNode(voParent);
			
		}*/
	}
	
}

var leftmenuexpended = true;
/*
 * "" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnMenuExpendClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnMenuExpend = e.control;
	
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	var container = app.getRootAppInstance().getContainer();
	var leftmenu = app.getRootAppInstance().lookup("left_menu");
	var mainmdi = app.getRootAppInstance().lookup("main_mdi");
	
	var voRect = app.getContainer().getActualRect();
	
	var vnLeft = Number(voRect.left);
	
	if(vnLeft > 0) {
		//접힘.
		container.updateConstraint(leftmenu,{
			positions: [
						{
							"media": "all and (min-width: 1024px)",
							"top": "60px",
							"bottom": "5px",
							"left": "-200px",
							"width": "215px"
						}, 
						{
							"media": "all and (min-width: 500px) and (max-width: 1024px)",
							"top": "60px",
							"bottom": "5px",
							"left": "-200px",
							"width": "215px"
						}, 
						{
							"media": "all and (max-width: 500px)",
							"top": "60px",
							"bottom": "5px",
							"left": "-200px",
							"width": "215px"
						}
					]
			});
		
		container.updateConstraint(mainmdi,{
			positions: [
						{
							"media": "all and (min-width: 1024px)",
							"top": "60px",
							"right": "5px",
							"bottom": "5px",
							"left": "15px"
						}, 
						{
							"media": "all and (min-width: 500px) and (max-width: 1024px)",
							"top": "60px",
							"right": "2px",
							"bottom": "5px",
							"left": "15px"
						}, 
						{
							"media": "all and (max-width: 500px)",
							"top": "60px",
							"right": "1px",
							"bottom": "5px",
							"left": "15px"
						}
					]
			});
		leftmenuexpended = false;
	} else {
		
		container.updateConstraint(leftmenu,{
			positions: [
					{
						"media": "all and (min-width: 1024px)",
						"top": "60px",
						"bottom": "5px",
						"left": "5px",
						"width": "215px"
					}, 
					{
						"media": "all and (min-width: 500px) and (max-width: 1024px)",
						"top": "60px",
						"bottom": "5px",
						"left": "5px",
						"width": "215px"
					}, 
					{
						"media": "all and (max-width: 500px)",
						"top": "60px",
						"bottom": "5px",
						"left": "5px",
						"width": "215px"
					}
				]
			});
		
		
		container.updateConstraint(mainmdi,{
				positions: [
					{
						"media": "all and (min-width: 1024px)",
						"top": "60px",
						"right": "5px",
						"bottom": "5px",
						"left": "220px"
					}, 
					{
						"media": "all and (min-width: 500px) and (max-width: 1024px)",
						"top": "60px",
						"right": "5px",
						"bottom": "5px",
						"left": "15px"
					}, 
					{
						"media": "all and (max-width: 500px)",
						"top": "60px",
						"right": "5px",
						"bottom": "5px",
						"left": "15px"
					}
				]
			});
		leftmenuexpended = true;
	}
	
}

/*
 * 트리에서 item-click 이벤트 발생 시 호출.
 * 아이템 클릭시 발생하는 이벤트.
 */
function onTreFavoriteItemClick(/* cpr.events.CItemEvent */ e){
	/** 
	 * @type cpr.controls.Tree
	 */
	var treFavorite = e.control;
	
	var selectedItem = e.item;
	
	var eventObject = new cpr.events.CItemEvent("favorite_menu_click", { item: createEventParam(selectedItem) });
	app.dispatchEvent(eventObject);
}
