var utilHost;
var util = new ComUtil(app);

exports.setStdCmnPObjSchObjInfo = function(){
	
	
}

exports.focus = function(){
	app.lookup("ipbUdcObjNm").focus();
}

exports.getApp = function(){
	return app;
}


var skipOnChange = false;

var openedByChange = false;

/**
 * @desc   clearCallback  
 * @return void
 */
function clearCallback() {
	
	app.setAppProperty("oObjDivRcd", "");
	app.setAppProperty("oCd", "");
	app.setAppProperty("oCdNm", "");
	app.setAppProperty("oBegDt", "");
	app.setAppProperty("oEndDt", "");
	app.setAppProperty("oLanDivRcd", "");
	app.lookup("ipbUdcObjCd").value = "";
	
}


/*
 * 인풋 박스에서 before-value-change 이벤트 발생 시 호출.
 * 변경된 value가 저장되기 전에 발생하는 이벤트. 다음 이벤트로 value-change가 발생합니다.
 */
function onIpbUdcObjNmBeforeValueChange(/* cpr.events.CValueChangeEvent */ e){
	/** 
	 * @type cpr.controls.InputBox
	 */
//	var ipbUdcObjNm = e.control;
//	if(skipOnChange){
//		e.preventDefault();
//		skipOnChange = false;
//	}
}



/*
 * 인풋 박스에서 value-change 이벤트 발생 시 호출.
 * 변경된 value가 저장된 후에 발생하는 이벤트.
 */
function onIpbUdcObjNmValueChange(/* cpr.events.CValueChangeEvent */ e){
	/** 
	 * @type cpr.controls.InputBox
	 */
	
	var ipbUdcObjNm = e.control;
//	debugger;
	if(skipOnChange || openedByChange) return;
	
	var vsNewObjNm = e.newValue;
	
	clearCallback();
	
	if(vsNewObjNm == ""){
		//clearCallback();
		var event = new cpr.events.CUIEvent("searchCallBack");
		app.dispatchEvent(event);
		return false;
	}
	
	var voMenuInfo = utilHost.getMenuInfo();
	util.DataMap.setValue("dmReqKey", "authRngRcd", voMenuInfo.get("AUTH_RNG_RCD"));
	util.DataMap.setValue("dmReqKey", "strObjDivRcd", app.getAppProperty("iObjDivRcd"));
	util.DataMap.setValue("dmReqKey", "strStartObject", app.getAppProperty("iStartObject"));
	util.DataMap.setValue("dmReqKey", "strOtDivRcd", app.getAppProperty("iOtDivRcd"));
	util.DataMap.setValue("dmReqKey", "strOtIsTreeView", app.getAppProperty("iOtIsTreeView"));
	util.DataMap.setValue("dmReqKey", "strBetweenEndDtYn", app.getAppProperty("iBetweenEndDtYn"));
	util.DataMap.setValue("dmReqKey", "strLanDivRcd", app.getAppProperty("iLanDivRcd"));
	util.DataMap.setValue("dmReqKey", "strKeyDate", app.getAppProperty("iKeyDate"));
	util.DataMap.setValue("dmReqKey", "strKeyEndDate", app.getAppProperty("iKeyEndDate"));
	util.DataMap.setValue("dmReqKey", "strObjNm", e.newValue);
	//util.DataMap.setValue("dmReqKey", "strObjCd", app.getAppProperty("iCd"));
	
	skipOnChange = true;
	util.Submit.send("subPrecheckCmnPObjSch", function(pbSuccess){
		if(pbSuccess){
			
			var vnCount = util.DataMap.getValue("dmCmnPObjSchCount", "count");
			
			if(vnCount == 1){
				app.setAppProperty("oObjDivRcd", util.DataMap.getValue("dmCmnPObjSch","OBJ_DIV_RCD"));
				app.setAppProperty("oCd", util.DataMap.getValue("dmCmnPObjSch","CD"));
				app.setAppProperty("oCdNm", util.DataMap.getValue("dmCmnPObjSch","CD_NM"));
				app.setAppProperty("oBegDt", util.DataMap.getValue("dmCmnPObjSch","ST_DT"));
				app.setAppProperty("oEndDt", util.DataMap.getValue("dmCmnPObjSch","END_DT"));
				app.setAppProperty("oLanDivRcd", util.DataMap.getValue("dmCmnPObjSch","LAN_DIV_RCD"));
				skipOnChange = true; //valueChange 이벤트 방지.
				app.lookup("ipbUdcObjNm").value = util.DataMap.getValue("dmCmnPObjSch","CD_NM");
				app.lookup("ipbUdcObjCd").value = util.DataMap.getValue("dmCmnPObjSch","CD");
				skipOnChange = false; 
				
				var event = new cpr.events.CUIEvent("searchCallBack");
				app.dispatchEvent(event);
				
			}else{
				//clearCallback();
				openCmnPObjSch(vsNewObjNm, e);
			}
			
			
		}
	});
	
}


function openCmnPObjSch(psNewObjNm){
	
	if(openedByChange) return;
	var _app = app;
	
	var vsObjNm = ""; 
	if(psNewObjNm){
		vsObjNm = psNewObjNm;
	}else{
		vsObjNm = app.getAppProperty("iCdNm");
	}
	var initValue = {
			objDivRcd : app.getAppProperty("iObjDivRcd"),
			lanDivRcd : app.getAppProperty("iLanDivRcd"),
			otDivRcd : app.getAppProperty("iOtDivRcd"),
			otIsTreeView : app.getAppProperty("iOtIsTreeView"),
			// 검색어 기본값 지정
			strObjCd : '',
			strObjNm : vsObjNm,
			strKeyDate : app.getAppProperty("iKeyDate"),
			strKeyEndDate : app.getAppProperty("iKeyEndDate"),
			strStartObject: app.getAppProperty("iStartObject"),
			strBetweenEndDtYn : app.getAppProperty("iBetweenEndDtYn")
		};
	//팝업 방지..
	openedByChange = true;
	utilHost.Dialog.open("app/cmn/cmnPObjSch", 700, 490, function(/* cpr.events.CUIEvent */e){
		var dialog = e.control;
		var returnValue = dialog.returnValue;
		if(returnValue != null){
			_app.setAppProperty("oObjDivRcd", returnValue.OBJ_DIV_RCD);
			_app.setAppProperty("oCd", returnValue.CD);
			_app.setAppProperty("oCdNm", returnValue.CD_NM);
			_app.setAppProperty("oBegDt", returnValue.ST_DT);
			_app.setAppProperty("oEndDt", returnValue.END_DT);
			_app.setAppProperty("oLanDivRcd", returnValue.LAN_DIV_RCD);
			skipOnChange = true; //valueChange 이벤트 방지.
			_app.lookup("ipbUdcObjNm").value = returnValue.CD_NM;
			_app.lookup("ipbUdcObjCd").value = returnValue.CD;
			skipOnChange = false; 
			var event = new cpr.events.CUIEvent("searchCallBack");
			_app.dispatchEvent(event);
		}else{
			skipOnChange = true; //valueChange 이벤트 방지.
			if(ValueUtil.isNull(_app.lookup("ipbUdcObjCd").value)){
				_app.setAppProperty("oCdNm", "");
				_app.setAppProperty("oCd", "");
				_app.lookup("ipbUdcObjNm").value = "";	
			}
			skipOnChange = false; 
//			clearCallback();
		}
		openedByChange = false;
	}, initValue);
	
	
}
/*
 * Body에서 property-change 이벤트 발생 시 호출.
 * 앱의 속성이 변경될 때 발생하는 이벤트 입니다.
 */
function onBodyPropertyChange(/* cpr.events.CPropertyChangeEvent */ e){
	
	var vsProperty = e.property;
	
	if(e.property == "iCdNm" || e.property == "oCdNm"){
		app.lookup("ipbUdcObjNm").redraw();
	}
	
	if(e.property == "iCd" || e.property == "oCd"){
		app.lookup("ipbUdcObjCd").redraw();
	}
	
	if(e.property == "required"){
		
		var vsRequired = app.getAppProperty("required");
		
		if(vsRequired == "Y"){
			var vcIpbUdcObjCd = app.lookup("ipbUdcObjCd");
			var voUserAttr = vcIpbUdcObjCd.userattr();
			voUserAttr["required"] = "Y";
			
			vcIpbUdcObjCd.fieldLabel = app.getAppProperty("fieldLable");
		}
	}
	
//	var dmReqKey = app.lookup("dmReqKey");
//	if(vsProperty){
//		vsProperty = vsProperty.substring(1, vsProperty.length);
//		vsProperty = "str" + vsProperty;
//		if(dmReqKey.isExistColumn(vsProperty)){
//			dmReqKey.setValue(vsProperty, e.newValue);
//		}
//		
//	}
	
}

/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	
	utilHost = new ComUtil(app.getHostAppInstance());
	/*
	var hostApp = app.getHostAppInstance();
	var vcHostTitle = hostApp.lookup(app.getHost().id);
	if(vcHostTitle.userattr("required") == "Y"){
		app.lookup("ipbUdcObjNm").style.css("class","required");
		app.lookup("ipbUdcObjNm").redraw();
	}*/
}

/*
 * "" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnSearchUdcObjClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnSearchUdcObj = e.control;
	
	if(app.getAppProperty("iIsParentGrpSearch")){
		if(utilHost.Group.isGrpChgBtnSch(btnSearchUdcObj)) return false;
	}
	openCmnPObjSch();
}



/*
 * 인풋 박스에서 keydown 이벤트 발생 시 호출.
 * 사용자가 키를 누를 때 발생하는 이벤트.
 */
function onIpbUdcObjNmKeydown(/* cpr.events.CKeyboardEvent */ e){
	/** 
	 * @type cpr.controls.InputBox
	 */
	var ipbUdcObjNm = e.control;
	 if (e.keyCode == 13) {
		 e.stopPropagation();
	 }
}
