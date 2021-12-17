var util = new ComUtil(app);
var hostUtil;
var skipOnChange = false;
var openedByChange = false;

function clearCallback(){
	skipOnChange = true;
	app.lookup("dipKeyDate").value = ""
	skipOnChange = false;
	
	app.setAppProperty("oKeyDate", "");
	app.setAppProperty("oSchYearRcd", "");
	app.setAppProperty("oSmtRcd", "");
	app.setAppProperty("oStDt", "");
	app.setAppProperty("oEndDt", "");
	
}

/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	hostUtil = new ComUtil(app.getHostAppInstance());
}


/*
 * Body에서 property-change 이벤트 발생 시 호출.
 * 앱의 속성이 변경될 때 발생하는 이벤트 입니다.
 */
function onBodyPropertyChange(/* cpr.events.CPropertyChangeEvent */ e){
	var vsProperty = e.property;
	
	if(vsProperty == "iKeyDate" || vsProperty == "oKeyDate"){
		app.lookup("dipKeyDate").redraw();
	}
	
	if(vsProperty == "required"){
		var vsRequired = app.getAppProperty("required");
		if(vsRequired == "Y"){
			var vcDipKeyDateId = app.lookup("dipKeyDate");
			vcDipKeyDateId.userAttr({
				"required":"Y"
			});
			vcDipKeyDateId.fieldLabel = app.getAppProperty("fieldLabel");
		}
	}
}


/*
 * "" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnYearSmtClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnYearSmt = e.control;
	
//	if(app.getAppProperty("iIsParentGrpSearch")){
//		if(hostUtil.Group.isGrpChgBtnSch()) return false;
//	}
	
	if(openedByChange){
		return false;
	}
	
	var initValue = {
		strUnitSystem : app.getAppProperty("iUnitSystem")
	};
	
	
	var voDialogProp = {
//		"left": e.clientX-voHostActualRect.left,
//		"top" : e.clientY-voHostActualRect.top,
		headerVisible: false,
		headerMovable: false,
		resizable: false
	}
	
	var voHostActualRect = app.getHostAppInstance().getActualRect();
	var vnLeft = e.clientX - voHostActualRect.left;
	var vnTop = e.clientY - voHostActualRect.top;
	
	if(vnLeft + 325 > voHostActualRect.width){
		voDialogProp.left = vnLeft - 325;
	}else {
		voDialogProp.left = vnLeft;
	}
	
	if(vnTop + 75 > voHostActualRect.height) {
		voDialogProp.top = vnTop - 75;
	}else {
		voDialogProp.top = vnTop;
	}
	
	openedByChange = true;
	
	var _app = app;
	hostUtil.Dialog.open("app/imp/impDialogSchYearSmt", 325, 75, function(/**@type cpr.events.CUIEvent*/ e){
		var dialog = e.control;
		var returnValue = dialog.returnValue;
		
		if(returnValue != null){
			_app.setAppProperty("oKeyDate", returnValue.strStDt);
			_app.setAppProperty("oSchYearRcd", returnValue.strSchYearRcd);
			_app.setAppProperty("oSmtRcd", returnValue.strSmtRcd);
			_app.setAppProperty("oStDt", returnValue.strStDt);
			_app.setAppProperty("oEndDt", returnValue.strEndDt);
			_app.setAppProperty("value", returnValue.strStDt);
			
			skipOnChange = true;
			_app.lookup("dipKeyDate").value = returnValue.strStDt;
			skipOnChange = false;
			
			var event = new cpr.events.CUIEvent("searchCallBack");
			_app.dispatchEvent(event);
		}
		
		openedByChange = false;
	}, initValue, voDialogProp);
}


/*
 * 데이트 인풋에서 value-change 이벤트 발생 시 호출.
 * Dateinput의 value를 변경하여 변경된 값이 저장된 후에 발생하는 이벤트.
 */
function onDipKeyDateValueChange(/* cpr.events.CValueChangeEvent */ e){
	/** 
	 * @type cpr.controls.DateInput
	 */
	var dipKeyDate = e.control;
	
	if(skipOnChange == true || openedByChange == true){
		return false;
	}
	
	if(ValueUtil.isNull(dipKeyDate.value) == true){
		clearCallback();
		return false;
	}
	
	var event = new cpr.events.CUIEvent("searchCallBack");
	app.dispatchEvent(event);
}


/*
 * 데이트 인풋에서 keydown 이벤트 발생 시 호출.
 * 사용자가 키를 누를 때 발생하는 이벤트.
 */
function onDipKeyDateKeydown(/* cpr.events.CKeyboardEvent */ e){
	/** 
	 * @type cpr.controls.DateInput
	 */
	var dipKeyDate = e.control;
	if(e.keyCode == cpr.events.KeyCode.ENTER){
		e.stopPropagation();
	}
}
