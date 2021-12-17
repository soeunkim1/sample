
var util;

exports.getApp = function() {
	
	return app;
};

/*
 * "+" 버튼에서 click 이벤트 발생 시 호출. 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnInsertClick(/* cpr.events.CMouseEvent */e) {
	/**
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	var vsGridId = app.getAppProperty("gridId");
	var vsDefaultEvent = app.getAppProperty("defaultEvent");
	if (vsGridId != null && vsDefaultEvent.indexOf("insert") != -1) {
		util.Grid.insertRow(vsGridId, app.getAppProperty("insFocusColumn"));
	}
	var event = new cpr.events.CUIEvent("insert");
	var vbStatus = app.dispatchEvent(event);
	
	if(vbStatus){
		var idrCommonEvent = new cpr.events.CUIEvent("idrCommonEvent");
		idrCommonEvent.status = "insert";
		app.dispatchEvent(idrCommonEvent);	
	}
}

/*
 * "-" 버튼에서 click 이벤트 발생 시 호출. 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnDelClick(/* cpr.events.CMouseEvent */e) {
	/**
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	var vsGridId = app.getAppProperty("gridId");
	
	var vsDefaultEvent = app.getAppProperty("defaultEvent");
	if (vsGridId != null && vsDefaultEvent.indexOf("delete") != -1) {
		util.Grid.deleteRow(vsGridId);
	}
	
	var event = new cpr.events.CUIEvent("delete");
	var vbStatus = app.dispatchEvent(event);
	
	if(vbStatus){
		var idrCommonEvent = new cpr.events.CUIEvent("idrCommonEvent");
		idrCommonEvent.status = "delete";
		app.dispatchEvent(idrCommonEvent);	
	}
	
}

/*
 * "V" 버튼에서 click 이벤트 발생 시 호출. 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnSaveClick(/* cpr.events.CMouseEvent */e) {
	/**
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	var event = new cpr.events.CUIEvent("save");
	app.dispatchEvent(event);
}

/*
 * Body에서 property-change 이벤트 발생 시 호출. 앱의 속성이 변경될 때 발생하는 이벤트 입니다.
 */
function onBodyPropertyChange(/* cpr.events.CPropertyChangeEvent */e) {
//	if (e.property == "udcEnabled") {
//		
//		app.lookup("grpIdsBtn").enabled = app.getAppProperty("udcEnabled");
//	}
	
	if (e.property.indexOf("Enabled") != -1 || e.property.indexOf("enabled") != -1 ) {
		app.lookup("btnInsert").redraw();
		app.lookup("btnDel").redraw();
		app.lookup("btnSave").redraw();
		app.lookup("btnRestore").redraw();
		app.lookup("grpIdsBtn").redraw();
		
	}
}


/*
 * "취소" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnRestoreClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnRestore = e.control;
	
	var vsGridId = app.getAppProperty("gridId");
	var vsDefaultEvent = app.getAppProperty("defaultEvent");
	if (vsGridId != null && vsDefaultEvent.indexOf("restore") != -1) {
		util.Grid.revertRowData(vsGridId);
	}
	 
	 var event = new cpr.events.CUIEvent("restore");
	 var vbStatus = app.dispatchEvent(event);
	 
	 if(vbStatus){
		var idrCommonEvent = new cpr.events.CUIEvent("idrCommonEvent");
		idrCommonEvent.status = "restore";
		app.dispatchEvent(idrCommonEvent);	
	}
}

/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	util = new ComUtil(app.getHostAppInstance());
}
