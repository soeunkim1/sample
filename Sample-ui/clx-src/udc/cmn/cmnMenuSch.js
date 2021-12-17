
var util = new ComUtil(app);
var hostUtil;

var skipOnChange = false;
var openedByChange = false;

function clearCallback(){
	// value redraw()
	var vcMenuId = app.lookup("ipbUdcMenuId");
	var vcMenuNm = app.lookup("ipbUdcMenuNm");
	
	skipOnChange = true;
	vcMenuId.value = "";
	vcMenuNm.value = "";
	skipOnChange = false;
	
	app.setAppProperty("oSystemRcd", "");
	app.setAppProperty("oMenuId", "");
	app.setAppProperty("oMenuNm", "");
	
	vcMenuId.focus();
}

/*
 * 인풋 박스에서 value-change 이벤트 발생 시 호출.
 * 변경된 value가 저장된 후에 발생하는 이벤트.
 */
function onIpbUdcMenuIdValueChange(/* cpr.events.CValueChangeEvent */e){
	/** 
	 * @type cpr.controls.InputBox
	 */
	var ipbUdcMenuId = e.control;
	return doOnChangeStdCmnPMenuSch();
}

/*
 * "" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnSearchUdcMenuClick(/* cpr.events.CMouseEvent */e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnSearchUdcMenu = e.control;
	
	if(app.getAppProperty("iIsParentGrpSearch")){
		if(hostUtil.Group.isGrpChgBtnSch(btnSearchUdcMenu)) return false;
	}
	
	doOnClickStdCmnPMenuSch();
}


/**
 * doOnChangeStdCmnPMenuSch(값 변경시 조회)  
 * @param  sender
 * @return  void
 */
function doOnChangeStdCmnPMenuSch(){
	// 오브젝트 검색 팝업이 붙은 컬럼이라면 값 변경시에 팝업이 필요하다.
	
	if(skipOnChange == true||openedByChange == true){
		// 팝업의 콜백으로 값이 세팅되어서 change 이벤트 발생한 경우
		// 이미 팝업을 처리하였기 때문에 다시 띄우지 않는다.
		return false;
	}
	
	
	var vsMenuId = util.Control.getValue("ipbUdcMenuId");
	// 이벤트가 발생한 내용 입력해준다.
	// 입력내용 삭제시 팝업없이 관련내용 삭제 -> 삭제인데도, 아래의 체크처리가 이루워짐에 따라 불필요한 메시지 호출됨으로 막아준다.
	if(ValueUtil.fixNull(vsMenuId) == ""){
		clearCallback();
		return false;
	}
	
	util.DataMap.setValue("dmReqKey", "strSystemRcd", app.getAppProperty("iSystemRcd"));
	util.DataMap.setValue("dmReqKey", "strMenuId", app.getAppProperty("iMenuId"));
	util.DataMap.setValue("dmReqKey", "strMenuNm", app.getAppProperty("iMenuNm"));
	util.DataMap.setValue("dmReqKey", "strPgmDtlTypeRcd", app.getAppProperty("iPgmDtlTypeRcd"));
	
	util.Submit.send("subPrecheckStdCmnPMenuSch", function(pbSuccess){
		if(pbSuccess){
			var vnCount = util.DataMap.getValue("dmCmnPMenuSchCount", "count");
			
			if(vnCount == 1){
				// 검색결과가 1건이면 팝업없이 바로 값세팅
				app.setAppProperty("oSystemRcd", util.DataMap.getValue("dmCmnPMenuSch", "UNIT_SYSTEM_RCD"));
				app.setAppProperty("oMenuId", util.DataMap.getValue("dmCmnPMenuSch", "MENU_ID"));
				app.setAppProperty("oMenuNm", util.DataMap.getValue("dmCmnPMenuSch", "MENU_NM"));
				
				skipOnChange = true;
				app.lookup("ipbUdcMenuId").value = app.getAppProperty("oMenuId");
				app.lookup("ipbUdcMenuNm").value = app.getAppProperty("oMenuNm");
				skipOnChange = false;
				
//				util.Control.redraw(["ipbUdcMenuId", "ipbUdcMenuNm"]);

				var event = new cpr.events.CUIEvent("searchCallBack");
				app.dispatchEvent(event);
				
				
			}else{
				// 검색결과가 여러건이면 팝업.
				return doOnClickStdCmnPMenuSch();
			}
		}
	});
	
	return true;
}

/**
 * doOnClickStdCmnPMenuSch(돋보기 버튼을 클릭시 사용자 검색 팝업 호출)  
 * @param  sender
 * @return void
 */
function doOnClickStdCmnPMenuSch(){
//	if(hostUtil.Group.isGrpChgBtnSch()){
//		return false
//	};
	
	if(openedByChange) {
		// 검색어를 입력하고 팝업버튼을 누른경우
		// 이미 change 이벤트에 의해 팝업이 떠있기 때문에 다시 띄우지 않는다.
		return false;
	}
	
	var initValue = {
		strSystemRcd:		app.getAppProperty("iSystemRcd"), 
		strMenuId:			app.getAppProperty("iMenuId"), 
		strMenuNm:			app.getAppProperty("iMenuNm"), 
		strPgmDtlTypeRcd:	app.getAppProperty("iPgmDtlTypeRcd")
	}
	
	openedByChange = true;
	var _app = app;
	hostUtil.Dialog.open("app/cmn/cmnPMenuSch", 700, 405, function(/**@type cpr.events.CUIEvent */e){
		var dialog = e.control;
		var returnValue = dialog.returnValue;
		if(returnValue!=null){
			app.setAppProperty("oMenuDivRcd", util.DataMap.getValue("dmCmnPMenuSch", "UNIT_SYSTEM_RCD"));
			app.setAppProperty("oMenuId", util.DataMap.getValue("dmCmnPMenuSch", "MENU_ID"));
			app.setAppProperty("oMenuNm", util.DataMap.getValue("dmCmnPMenuSch", "MENU_NM"));
			
			skipOnChange = true;
			_app.lookup("ipbUdcMenuId").value = returnValue.MENU_ID;
			_app.lookup("ipbUdcMenuNm").value = returnValue.MENU_NM;
			skipOnChange = false;
			
			var event = new cpr.events.CUIEvent("searchCallBack");
			_app.dispatchEvent(event);
		}else{
			if(ValueUtil.isNull(util.Control.getValue("ipbUdcMenuNm")) == true){				
				skipOnChange = true;//valueChange 이벤트 방지.
				_app.lookup("ipbUdcMenuId").value = "";
				_app.lookup("ipbUdcMenuNm").value = "";
				skipOnChange = false;
			}
		}
//		util.Control.redraw(["ipbUdcMenuId", "ipbUdcMenuNm"]);
		
		openedByChange = false;
	}, initValue);
}

/*
 * Body에서 property-change 이벤트 발생 시 호출.
 * 앱의 속성이 변경될 때 발생하는 이벤트 입니다.
 */
function onBodyPropertyChange(/* cpr.events.CPropertyChangeEvent */e){
	var vsProperty = e.property;
	if(vsProperty == "iMenuId" || vsProperty == "oMenuId"){
		app.lookup("ipbUdcMenuId").redraw();
	}
	
	if(vsProperty == "required"){
		var vsRequired = app.getAppProperty("required");
		if(vsRequired == "Y"){
			var vcIpbUdcMenuId = app.lookup("ipbUdcMenuId");
			vcIpbUdcMenuId.userAttr({
				"required":"Y"
			});
			vcIpbUdcMenuId.fieldLabel = app.getAppProperty("fieldLabel");
		}
	}
}

/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */e){
	hostUtil = new ComUtil(app.getHostAppInstance());
}

/*
 * 인풋 박스에서 keydown 이벤트 발생 시 호출.
 * 사용자가 키를 누를 때 발생하는 이벤트.
 */
function onIpbUdcMenuIdKeydown(/* cpr.events.CKeyboardEvent */ e){
	/** 
	 * @type cpr.controls.InputBox
	 */
	var ipbUdcMenuId = e.control;
	if (e.keyCode == cpr.events.KeyCode.ENTER) {
		 e.stopPropagation();
	}
}
