
var util = new ComUtil(app);
var hostUtil;

var skipOnChange = false;
var openedByChange = false;

function clearCallback(){
	skipOnChange = true;
	app.lookup("ipbUdcUserNm").value = ""
	app.lookup("ipbUdcUserId").value = ""	
	skipOnChange = false;
	
	app.setAppProperty("oUserDivRcd", "");
	app.setAppProperty("oUserId", "");
	app.setAppProperty("oUserNm", "");
	app.setAppProperty("oStatCd", "");
	app.setAppProperty("oStatNm", "");
	app.setAppProperty("oDeptCd", "");
	app.setAppProperty("oDeptNm", "");
	app.setAppProperty("oId", "");
	app.setAppProperty("oSsn", "");
	app.setAppProperty("oPartyId", "");
}

/*
 * 인풋 박스에서 value-change 이벤트 발생 시 호출.
 * 변경된 value가 저장된 후에 발생하는 이벤트.
 */
function onIpbUdcUserIdValueChange(/* cpr.events.CValueChangeEvent */e){
	/** 
	 * @type cpr.controls.InputBox
	 */
	var ipbUdcUserId = e.control;
	if(skipOnChange == true||openedByChange == true){
		// 팝업의 콜백으로 값이 세팅되어서 change 이벤트 발생한 경우
		// 이미 팝업을 처리하였기 때문에 다시 띄우지 않는다.
		return false;
	}
	
	
	var vsUserId = ipbUdcUserId.value;
	// 이벤트가 발생한 내용 입력해준다.
	// 입력내용 삭제시 팝업없이 관련내용 삭제 -> 삭제인데도, 아래의 체크처리가 이루워짐에 따라 불필요한 메시지 호출됨으로 막아준다.
	//	clearCallback();
	
	if(vsUserId == ""){
		clearCallback();
		return false;
	}
	
	if(checkUserValue() == null){
		clearCallback();
		return false;
	}
	
	util.DataMap.setValue("dmReqKey", "authRngRcd", util.getMenuInfo().get("AUTH_RNG_RCD"));
	util.DataMap.setValue("dmReqKey", "strKeyDate", app.getAppProperty("iKeyDate"));
	util.DataMap.setValue("dmReqKey", "strUseYn", app.getAppProperty("iUseYn"));
	util.DataMap.setValue("dmReqKey", "strUserId", app.getAppProperty("iUserId"));
	util.DataMap.setValue("dmReqKey", "strUserNm", app.getAppProperty("iUserNm"));
	util.DataMap.setValue("dmReqKey", "strUserDivRcd", app.getAppProperty("iUserDivRcd"));
	
	util.Submit.send("subPrecheckStdCmnPUserSch", function(pbSuccess){
		if(pbSuccess){
			var vnCount = util.DataMap.getValue("dmCmnPUserSchCount", "count");
			
			if(vnCount == 1){
				// 검색결과가 1건이면 팝업없이 바로 값세팅
				app.setAppProperty("oUserDivRcd", util.DataMap.getValue("dmCmnPUserSch", "USER_DIV_RCD"));
				app.setAppProperty("oUserId", util.DataMap.getValue("dmCmnPUserSch", "USER_ID"));
				app.setAppProperty("oUserNm", util.DataMap.getValue("dmCmnPUserSch", "USER_NM"));
				app.setAppProperty("oStatCd", util.DataMap.getValue("dmCmnPUserSch", "STAT_CD"));
				app.setAppProperty("oStatNm", util.DataMap.getValue("dmCmnPUserSch", "STAT_NM"));
				app.setAppProperty("oDeptCd", util.DataMap.getValue("dmCmnPUserSch", "DEPT_CD"));
				app.setAppProperty("oDeptNm", util.DataMap.getValue("dmCmnPUserSch", "DEPT_NM"));
				app.setAppProperty("oId", util.DataMap.getValue("dmCmnPUserSch", "ID"));
				app.setAppProperty("oSsn", util.DataMap.getValue("dmCmnPUserSch", "SSN"));
				app.setAppProperty("oPartyId", util.DataMap.getValue("dmCmnPUserSch", "PARTY_ID"));
				
				skipOnChange = true;
				app.lookup("ipbUdcUserId").value = app.getAppProperty("oUserId");
				app.lookup("ipbUdcUserNm").value = app.getAppProperty("oUserNm");
				skipOnChange = false;
				
				var event = new cpr.events.CUIEvent("searchCallBack");
				app.dispatchEvent(event);
				
			}else{
				// 검색결과가 여러건이면 팝업.
				app.lookup("btnUdcUser").click();
			}
		}
	});
}

/*
 * "" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnSearchUdcUserClick(/* cpr.events.CMouseEvent */e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnSearchUdcUser = e.control;
	
	if(app.getAppProperty("iIsParentGrpSearch")){
		if(hostUtil.Group.isGrpChgBtnSch()) return false;
	}
	
	if(openedByChange) {
		// 검색어를 입력하고 팝업버튼을 누른경우
		// 이미 change 이벤트에 의해 팝업이 떠있기 때문에 다시 띄우지 않는다.
		return false;
	}
	
	var voUser = null;
	var vsUserId = app.lookup("ipbUdcUserId").value;
	if(vsUserId && vsUserId != ""){
		voUser = checkUserValue();
		if(voUser == null){		
			return false;
		}
	}
	
//	clearCallback();
	
	var initValue = {
		strKeyDate:		app.getAppProperty("iKeyDate"), 
		strUseYn:		app.getAppProperty("iUseYn"), 
		strUserId:		voUser == null ? app.getAppProperty("iUserId") : voUser.userId, 
		strUserNm:		voUser == null ? app.getAppProperty("iUserNm") : voUser.userNm, 
		strUserDivRcd:	app.getAppProperty("iUserDivRcd")
	}
	
	openedByChange = true;
	var _app = app;
	hostUtil.Dialog.open("app/cmn/cmnPUserSch", 700, 400, function(/**@type cpr.events.CUIEvent */e){
		var dialog = e.control;
		var returnValue = dialog.returnValue;
		if(returnValue!=null){
			_app.setAppProperty("oUserDivRcd", returnValue.USER_DIV_RCD);
			_app.setAppProperty("oUserId", returnValue.USER_ID);
			_app.setAppProperty("oUserNm", returnValue.USER_NM);
			_app.setAppProperty("oStatCd", returnValue.STAT_CD);
			_app.setAppProperty("oStatNm", returnValue.STAT_NM);
			_app.setAppProperty("oDeptCd", returnValue.DEPT_CD);
			_app.setAppProperty("oDeptNm", returnValue.DEPT_NM);
			_app.setAppProperty("oId", returnValue.ID);
			_app.setAppProperty("oSsn", returnValue.SSN);
			_app.setAppProperty("oPartyId", returnValue.PARTY_ID);
			
			skipOnChange = true;
			_app.lookup("ipbUdcUserId").value = returnValue.USER_ID;
			_app.lookup("ipbUdcUserNm").value = returnValue.USER_NM;
			skipOnChange = false;
			
			var event = new cpr.events.CUIEvent("searchCallBack");
			_app.dispatchEvent(event);
		}else{
			if(ValueUtil.isNull(util.Control.getValue("ipbUdcUserId")) == true){
				skipOnChange = true;//valueChange 이벤트 방지.
				_app.lookup("ipbUdcUserId").value = "";
				_app.lookup("ipbUdcUserNm").value = "";
				skipOnChange = false;
			}
		}
		
//		util.Control.redraw(["ipbUdcUserId", "ipbUdcUserNm"]);
		openedByChange = false;
		
	}, initValue);
}

/**
 * 입력된 사용자 이름 또는 id에 대한 글자 수 체크.  
 * @return {Object} userId, userNm.
 */
function checkUserValue(){
	// 사용자ID와 사용자명을 체크한다.
	var vsUserId = app.lookup("ipbUdcUserId").value;
	var vsStrUserId = "";
	var vsStrUserNm = "";
	
	// 사용자ID가 한글인 경우는 사용자명으로 검색되도록 그외의 경우 사용자ID로 검색되도록 처리한다.
	if(!ValueUtil.isNull(vsUserId)){		
		if(ValueUtil.checkType("KOR",vsUserId)){
			vsStrUserId = "";
			vsStrUserNm = vsUserId;
			
			if(vsStrUserNm.length < 2){
				util.Msg.warn("M213", ["2"]);
				return;
			}
		}else{
			vsStrUserId = vsUserId;
			vsStrUserNm = "";
			if(vsStrUserId != ""){
				if(vsStrUserId.length < 4){
					//"사용자ID는 @1자 이상으로 입력해야 합니다. "
					util.Msg.warn("M212", ["4"]);
					return;
				}
			}
		}						
	}else{
		vsStrUserId = "";
		vsStrUserNm = app.lookup("ipbUdcUserNm").value
		
		if(vsStrUserNm.length < 2){
			util.Msg.warn("M213", ["2"]);
			return null;
		}
	}
	
	return {userId: vsStrUserId, userNm: vsStrUserNm};
}

/*
 * Body에서 property-change 이벤트 발생 시 호출.
 * 앱의 속성이 변경될 때 발생하는 이벤트 입니다.
 */
function onBodyPropertyChange(/* cpr.events.CPropertyChangeEvent */e){
	var vsProperty = e.property;
	
	if(vsProperty == "iUserId" || vsProperty == "oUserId"){
		app.lookup("ipbUdcUserId").redraw();
	}
	
	if(vsProperty == "iUserNm" || vsProperty == "oUserNm"){
		app.lookup("ipbUdcUserNm").redraw();
	}
	
	if(vsProperty == "required"){
		var vsRequired = app.getAppProperty("required");
		if(vsRequired == "Y"){
			var vcIpbUdcUserId = app.lookup("ipbUdcUserId");
			vcIpbUdcUserId.userAttr({
				"required":"Y"
			});
			vcIpbUdcUserId.fieldLabel = app.getAppProperty("fieldLabel");
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
function onIpbUdcUserIdKeydown(/* cpr.events.CKeyboardEvent */ e){
	/** 
	 * @type cpr.controls.InputBox
	 */
	var ipbUdcUserId = e.control;
	if (e.keyCode == cpr.events.KeyCode.ENTER) {
		 e.stopPropagation();
	}
}
