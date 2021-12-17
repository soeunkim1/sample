var util = new ComUtil(app);
var hostUtil;

var skipOnChange = false;
var openedByChange = false;

function clearCallback(){
	// value redraw()
	var vcNatNm = app.lookup("ipbUdcNatNm");
	var vcNatCd = app.lookup("ipbUdcNatCd");
	
	skipOnChange = true;
	vcNatNm.value = "";
	vcNatCd.value = "";
	skipOnChange = false;
	
	app.setAppProperty("oSystemRcd", "");
	app.setAppProperty("oNatCd", "");
	app.setAppProperty("oNatNm", "");
	
	vcNatNm.focus();
}

/*
 * 인풋 박스에서 value-change 이벤트 발생 시 호출.
 * 변경된 value가 저장된 후에 발생하는 이벤트.
 */
function onIpbUdcNatIdValueChange(/* cpr.events.CValueChangeEvent */e){
	/** 
	 * @type cpr.controls.InputBox
	 */
	var ipbUdcNatId = e.control;
	return doOnChangeStdCmnPNat();
}

/*
 * "" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnSearchUdcNatClick(/* cpr.events.CMouseEvent */e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnSearchUdcNat = e.control;
	
	if(app.getAppProperty("iIsParentGrpSearch")){
		if(utilHost.Group.isGrpChgBtnSch(btnSearchUdcObj)) return false;
	}
	doOnClickStdCmnPNat();
}


/**
 * doOnChangeStdCmnPNat(값 변경시 조회)  
 * @param  sender
 * @return  void
 */
function doOnChangeStdCmnPNat(){
	// 오브젝트 검색 팝업이 붙은 컬럼이라면 값 변경시에 팝업이 필요하다.
	
	if(skipOnChange == true||openedByChange == true){
		// 팝업의 콜백으로 값이 세팅되어서 change 이벤트 발생한 경우
		// 이미 팝업을 처리하였기 때문에 다시 띄우지 않는다.
		return false;
	}
	
	
	var vsNatId = util.Control.getValue("ipbUdcNatNm");
	// 이벤트가 발생한 내용 입력해준다.
	// 입력내용 삭제시 팝업없이 관련내용 삭제 -> 삭제인데도, 아래의 체크처리가 이루워짐에 따라 불필요한 메시지 호출됨으로 막아준다.
	if(ValueUtil.fixNull(vsNatId) == ""){
		clearCallback();
		return false;
	}
	
	util.DataMap.setValue("dmReqKey", "strNatNm", app.getAppProperty("iNatNm"));
	util.DataMap.setValue("dmReqKey", "strLanDivRcd", app.getAppProperty("iLanDivRcd"));
	
	util.Submit.send("subPrecheckStdCmnPNat", function(pbSuccess){
		if(pbSuccess){
			var vnCount = util.DataMap.getValue("dmCmnPNatCount", "count");
			
			if(vnCount == 1){
				// 검색결과가 1건이면 팝업없이 바로 값세팅
				app.setAppProperty("oNatCd", util.DataMap.getValue("dmCmnPNat", "NAT_CD"));
				app.setAppProperty("oNatNm", util.DataMap.getValue("dmCmnPNat", "NAT_NM"));
				
				skipOnChange = true;
				app.lookup("ipbUdcNatCd").value = app.getAppProperty("oNatCd");
				app.lookup("ipbUdcNatNm").value = app.getAppProperty("oNatNm");
				skipOnChange = false;
				
				util.Control.redraw(["ipbUdcNatCd", "ipbUdcNatNm"]);

				var event = new cpr.events.CUIEvent("searchCallBack");
				app.dispatchEvent(event);
				
				
			}else{
				// 검색결과가 여러건이면 팝업.
				return doOnClickStdCmnPNat();
			}
		}
	});
}

/**
 * doOnClickStdCmnPNat(돋보기 버튼을 클릭시 사용자 검색 팝업 호출)  
 * @param  sender
 * @return void
 */
function doOnClickStdCmnPNat(){
	if(hostUtil.Group.isGrpChgBtnSch()){
		return false
	};
	
	if(openedByChange) {
		// 검색어를 입력하고 팝업버튼을 누른경우
		// 이미 change 이벤트에 의해 팝업이 떠있기 때문에 다시 띄우지 않는다.
		return false;
	}
	
	var initValue = {
		strLanDivRcd: app.getAppProperty("iLanDivRcd"), 
		strNatNm: app.getAppProperty("iNatNm"), 
	}
	
	openedByChange = true;
	var _app = app;
	hostUtil.Dialog.open("app/cmn/cmnPNat", 650, 440, function(/**@type cpr.events.CUIEvent */e){
		var dialog = e.control;
		var returnValue = dialog.returnValue;
		if(returnValue!=null){
			app.setAppProperty("oNatCd", util.DataMap.getValue("dmCmnPNat", "NAT_CD"));
			app.setAppProperty("oNatNm", util.DataMap.getValue("dmCmnPNat", "NAT_NM"));
			
			skipOnChange = true;
			app.lookup("ipbUdcNatCd").value = app.getAppProperty("oNatCd");
			app.lookup("ipbUdcNatNm").value = app.getAppProperty("oNatNm");
			skipOnChange = false;
			
			var event = new cpr.events.CUIEvent("searchCallBack");
			_app.dispatchEvent(event);
		}else{
			if(ValueUtil.isNull(util.Control.getValue("ipbUdcNatNm")) == true){
				skipOnChange = true;//valueChange 이벤트 방지.
				_app.lookup("ipbUdcNatCd").value = "";
				_app.lookup("ipbUdcNatNm").value = "";
				skipOnChange = false;
			}
		}
		
		openedByChange = false;
		
	}, initValue);
}

/*
 * Body에서 property-change 이벤트 발생 시 호출.
 * 앱의 속성이 변경될 때 발생하는 이벤트 입니다.
 */
function onBodyPropertyChange(/* cpr.events.CPropertyChangeEvent */e){
	var vsProperty = e.property;
	if(vsProperty == "iNatNm" || vsProperty == "iNatNm"){
		app.lookup("ipbUdcNatNm").redraw();
	}
	
	if(vsProperty == "required"){
		var vsRequired = app.getAppProperty("required");
		if(vsRequired == "Y"){
			var vcIpbUdcNatNm = app.lookup("ipbUdcNatNm");
			vcIpbUdcNatNm.userAttr({
				"required":"Y"
			});
			vcIpbUdcNatNm.fieldLabel = app.getAppProperty("fieldLabel");
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
function onIpbUdcNatNmKeydown(/* cpr.events.CKeyboardEvent */ e){
	/** 
	 * @type cpr.controls.InputBox
	 */
	var ipbUdcNatNm = e.control;
	if (e.keyCode == cpr.events.KeyCode.ENTER) {
		 e.stopPropagation();
	}
}
