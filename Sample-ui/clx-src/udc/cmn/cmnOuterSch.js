
var util = new ComUtil(app);
var hostUtil;

var skipOnChange = false;
var openedByChange = false;

function clearCallback(){
	skipOnChange = true;
	app.lookup("ipbUdcOuterId").value = ""
	app.lookup("ipbUdcOuterNm").value = ""	
	skipOnChange = false;
	
	app.setAppProperty("oOtsId", "");
	app.setAppProperty("oSsn", "");
	app.setAppProperty("oKorNm", "");
	app.setAppProperty("oEngNm", "");
	app.setAppProperty("oChaNm", "");
	app.setAppProperty("oGenderRcd", "");
	app.setAppProperty("oBirthDay", "");
	app.setAppProperty("oLnrSlrDivRcd", "");
	app.setAppProperty("oEmail", "");
	app.setAppProperty("oClpNo", "");
	app.setAppProperty("oZipCode", "");
	app.setAppProperty("oZipSeq", "");
	app.setAppProperty("oAddr1", "");
	app.setAppProperty("oAddr2", "");
	app.setAppProperty("oHomeTelNo", "");
	app.setAppProperty("oNatRcd", "");
}

/*
 * Body에서 property-change 이벤트 발생 시 호출.
 * 앱의 속성이 변경될 때 발생하는 이벤트 입니다.
 */
function onBodyPropertyChange(/* cpr.events.CPropertyChangeEvent */e){
	var vsProperty = e.property;
	if(vsProperty == "iUserId" || vsProperty == "oOtsId"){
		app.lookup("ipbUdcOuterNm").redraw();
	}
	
	if(vsProperty == "required"){
		var vsRequired = app.getAppProperty("required");
		if(vsRequired == "Y"){
			var vcIpbUdcMenuId = app.lookup("ipbUdcOuterNm");
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
 * 인풋 박스에서 value-change 이벤트 발생 시 호출.
 * 변경된 value가 저장된 후에 발생하는 이벤트.
 */
function onIpbUdcOuterIdValueChange(/* cpr.events.CValueChangeEvent */ e){
	/** 
	 * @type cpr.controls.InputBox
	 */
	var ipbUdcOuterId = e.control;
	if(skipOnChange == true || openedByChange == true){
		return false;
	}
	
	var vsUserId = ipbUdcOuterId.value;
	// 입력내용 삭제시 팝업없이 관련내용 삭제 -> 삭제인데도, 아래의 체크처리가 이루워짐에 따라 불필요한 메시지 호출됨으로 막아준다.
	if(vsUserId == ""){
		clearCallback();
		return false;
	}
	
	// 사용자ID가 한글인 경우는 사용자명으로 검색되도록 그외의 경우 사용자ID로 검색되도록 처리한다.
	var vsStrUserId = "";
	var vsStrUserNm = "";
	if(ValueUtil.isNull(vsUserId) == false){
		if(ValueUtil.checkType("KOR", vsUserId) == true){
			vsStrUserId = "";
			vsStrUserNm = vsUserId;
		}else {
			vsStrUserId = vsUserId;
			vsStrUserNm = "";
		}
	}else {
		vsStrUserId = "";
		vsStrUserNm = vsUserId;
	}
	
	util.DataMap.setValue("dmReqKey", "strUserId", app.getAppProperty("iUserId"));
	util.DataMap.setValue("dmReqKey", "strUserNm", app.getAppProperty("iUserNm"));
	
	util.Submit.send("subPrecheckStdCmnPOuterUserSch", function(pbSuccess){
		if(pbSuccess){
			var vnCount = util.DataMap.getValue("dmCmnPOuterUserSchCount", "count");
			
			if(vnCount == 1){
				// 검색결과가 1건이면 팝업없이 바로 값세팅
				app.setAppProperty("oOtsId", util.DataMap.getValue("dmCmnPOuterUserSch", "OTS_ID"));
				app.setAppProperty("oSsn", util.DataMap.getValue("dmCmnPOuterUserSch", "SSN"));
				app.setAppProperty("oKorNm", util.DataMap.getValue("dmCmnPOuterUserSch", "KOR_NM"));
				app.setAppProperty("oEngNm", util.DataMap.getValue("dmCmnPOuterUserSch", "ENG_NM"));
				app.setAppProperty("oChaNm", util.DataMap.getValue("dmCmnPOuterUserSch", "CHA_NM"));
				app.setAppProperty("oGenderRcd", util.DataMap.getValue("dmCmnPOuterUserSch", "GENDER_RCD"));
				app.setAppProperty("oBirthDay", util.DataMap.getValue("dmCmnPOuterUserSch", "BIRTHDAY"));
				app.setAppProperty("oLnrSlrDivRcd", util.DataMap.getValue("dmCmnPOuterUserSch", "LNR_SLR_DIV_RCD"));
				app.setAppProperty("oEmail", util.DataMap.getValue("dmCmnPOuterUserSch", "EMAIL"));
				app.setAppProperty("oClpNo", util.DataMap.getValue("dmCmnPOuterUserSch", "CLP_NO"));
				app.setAppProperty("oZipCode", util.DataMap.getValue("dmCmnPOuterUserSch", "ZIPCODE"));
				app.setAppProperty("oZipSeq", util.DataMap.getValue("dmCmnPOuterUserSch", "ZIPSEQ"));
				app.setAppProperty("oAddr1", util.DataMap.getValue("dmCmnPOuterUserSch", "ADDR1"));
				app.setAppProperty("oAddr2", util.DataMap.getValue("dmCmnPOuterUserSch", "ADDR2"));
				app.setAppProperty("oHomeTelNo", util.DataMap.getValue("dmCmnPOuterUserSch", "HOME_TEL_NO"));
				app.setAppProperty("oNatRcd", util.DataMap.getValue("dmCmnPOuterUserSch", "NAT_RCD"));
				
				skipOnChange = true;
				app.lookup("ipbUdcOuterId").value = app.getAppProperty("oOtsId");
				app.lookup("ipbUdcOuterNm").value = app.getAppProperty("iUserId");
				skipOnChange = false;
				
				var event = new cpr.events.CUIEvent("searchCallBack");
				app.dispatchEvent(event);
				
			}else{
				// 검색결과가 여러건이면 팝업.
				app.lookup("btnUdcOuter").click();
			}
		}
	});
}

/*
 * "" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnSearchUdcOuterClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnSearchUdcOuter = e.control;
	if(app.getAppProperty("iIsParentGrpSearch")){
		if(hostUtil.Group.isGrpChgBtnSch()) return false;
	}
	
	if(openedByChange == true) {
		// 검색어를 입력하고 팝업버튼을 누른경우
		// 이미 change 이벤트에 의해 팝업이 떠있기 때문에 다시 띄우지 않는다.
		return false;
	}
	
	// 사용자ID가 한글인 경우는 사용자명으로 검색되도록 그외의 경우 사용자ID로 검색되도록 처리한다.
	var vsUserId = app.lookup("ipbUdcOuterId").value;
	var vsStrUserId = "";
	var vsStrUserNm = "";
	if(ValueUtil.isNull(vsUserId) == false){
		if(ValueUtil.checkType("KOR", vsUserId) == true){
			vsStrUserId = "";
			vsStrUserNm = vsUserId;
		}else {
			vsStrUserId = vsUserId;
			vsStrUserNm = "";
		}
	}else {
		vsStrUserId = "";
		vsStrUserNm = vsUserId;
	}
	
//	clearCallback();
	
	var initValue = {
		strUserId:		vsStrUserId, 
		strUserNm:		vsStrUserNm, 
	}
	
	openedByChange = true;
	var _app = app;
	hostUtil.Dialog.open("app/cmn/cmnPOuterUserSch", 700, 400, function(/**@type cpr.events.CUIEvent */e){
		/**@type cpr.controls.Dialog*/
		var dialog = e.control;
		var returnValue = dialog.returnValue;
		if(returnValue!=null){
			_app.setAppProperty("oOtsId", returnValue.OTS_ID);
			_app.setAppProperty("oSsn", returnValue.SSN);
			_app.setAppProperty("oKorNm", returnValue.KOR_NM);
			_app.setAppProperty("oEngNm", returnValue.ENG_NM);
			_app.setAppProperty("oChaNm", returnValue.CHA_NM);
			_app.setAppProperty("oGenderRcd", returnValue.GENDER_RCD);
			_app.setAppProperty("oBirthDay", returnValue.BIRTHDAY);
			_app.setAppProperty("oLnrSlrDivRcd", returnValue.LNR_SLR_DIV_RCD);
			_app.setAppProperty("oEmail", returnValue.EMAIL);
			_app.setAppProperty("oClpNo", returnValue.CLP_NO);
			_app.setAppProperty("oZipCode", returnValue.ZIPCODE);
			_app.setAppProperty("oZipSeq", returnValue.ZIPSEQ);
			_app.setAppProperty("oAddr1", returnValue.ADDR1);
			_app.setAppProperty("oAddr2", returnValue.ADDR2);
			_app.setAppProperty("oHomeTelNo", returnValue.HOME_TEL_NO);
			_app.setAppProperty("oNatRcd", returnValue.NAT_RCD);
			
			skipOnChange = true;
			_app.lookup("ipbUdcOuterId").value = returnValue.OTS_ID;
			_app.lookup("ipbUdcOuterNm").value = _app.getAppProperty("oKorNm");
			skipOnChange = false;
			
			var event = new cpr.events.CUIEvent("searchCallBack");
			_app.dispatchEvent(event);
		}else{
			if(ValueUtil.isNull(util.Control.getValue("ipbUdcOuterId")) == true){
				skipOnChange = true;//valueChange 이벤트 방지.
				_app.lookup("ipbUdcOuterId").value = "";
				_app.lookup("ipbUdcOuterNm").value = "";
				skipOnChange = false;
			}
		}
		
		util.Control.redraw(["ipbUdcOuterId", "ipbUdcOuterNm"]);
		openedByChange = false;
		
	}, initValue);
}

/*
 * 인풋 박스에서 keydown 이벤트 발생 시 호출.
 * 사용자가 키를 누를 때 발생하는 이벤트.
 */
function onIpbUdcOuterIdKeydown(/* cpr.events.CKeyboardEvent */ e){
	/** 
	 * @type cpr.controls.InputBox
	 */
	var ipbUdcOuterId = e.control;
	if (e.keyCode == cpr.events.KeyCode.ENTER) {
		 e.stopPropagation();
	}
}
