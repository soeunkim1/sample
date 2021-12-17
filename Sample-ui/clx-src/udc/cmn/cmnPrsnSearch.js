
var util = new ComUtil(app);
var hostUtil;

var skipOnChange = false;
var openedByChange = false;

function clearCallback(){
	skipOnChange = true;
	app.lookup("ipbUdcProfNo").value = "";
	app.lookup("ipbUdcProfNm").value = "";
	skipOnChange = false;
	
	app.setAppProperty("oAfpAppDt", "");
	app.setAppProperty("oBirthday", "");
	app.setAppProperty("oHoRcd", "");
	app.setAppProperty("oIoForeignDivRcd", "");
	app.setAppProperty("oObjNo", "");
	app.setAppProperty("oOgCd", "");
	app.setAppProperty("oOgNm", "");
	app.setAppProperty("oPosCd", "");
	app.setAppProperty("oPosNm", "");
	app.setAppProperty("oProfDivRcd", "");
	app.setAppProperty("oPvactCiiDt", "");
	app.setAppProperty("oRepNm", "");
	app.setAppProperty("oSsn", "");
	app.setAppProperty("oStaffGrpRcd", "");
	app.setAppProperty("oStaffNo", "");
	app.setAppProperty("oStaffSubGrpRcd", "");
	app.setAppProperty("oStatNm", "");
	app.setAppProperty("oStatRcd", "");
	app.setAppProperty("oWkdtyNm", "");
	app.setAppProperty("oWkdtyRcd", "");
	app.setAppProperty("oWkgrdNm", "");
	app.setAppProperty("oWkgrdRcd", "");

}

/*
 * Body에서 property-change 이벤트 발생 시 호출.
 * 앱의 속성이 변경될 때 발생하는 이벤트 입니다.
 */
function onBodyPropertyChange(/* cpr.events.CPropertyChangeEvent */e){
	var vsProperty = e.property;
	
	if(vsProperty == "iRepNm" || vsProperty == "oRepNm"){
		app.lookup("ipbUdcProfNm").redraw();
	}
	
	if(vsProperty == "iStaffNo" || vsProperty == "oStaffNo"){
		app.lookup("ipbUdcProfNo").redraw();
	}
	
	if(vsProperty == "required"){
		var vsRequired = app.getAppProperty("required");
		if(vsRequired == "Y"){
			var vcIpbUdcProfNm = app.lookup("ipbUdcProfNm");
			vcIpbUdcProfNm.userAttr({
				"required":"Y"
			});
			vcIpbUdcProfNm.fieldLabel = app.getAppProperty("fieldLabel");
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

/**
 * 입력된 교직원 이름 또는 No에 대한 글자 수 체크.  
 * @return {Object} userId, userNm.
 */
function checkProfValue(){
	// 사용자ID와 사용자명을 체크한다.
	var vsProfNm = util.Control.getValue("ipbUdcProfNm");
	var strStaffNo = "";
	var strRepNm = "";
	
	
	if(ValueUtil.isNull(vsProfNm) == true){
		return false;
	}
	
	if(ValueUtil.fixNumber(vsProfNm)){
		if(vsProfNm.length < 2){
			//"교직원ID는 @1자 이상으로 입력해야 합니다. "
			util.Msg.warn("M031", ["교직원ID","2"]);
			clearCallback();
			return false;
		}
		strStaffNo = vsProfNm;
		strRepNm = "";
		
	}else {
		if(vsProfNm.length < 2){
			//"교직원명은 @1자 이상으로 입력해야 합니다. "
			util.Msg.warn("M031", ["교직원명","2", "2"]);
			clearCallback();
			return false;
		}
		strStaffNo = "";
		strRepNm = strStaffNo;
	}
	
	return {staffNo: strStaffNo, repNm: strRepNm};
}

/*
 * 인풋 박스에서 value-change 이벤트 발생 시 호출.
 * 변경된 value가 저장된 후에 발생하는 이벤트.
 */
function onIpbUdcProfNmValueChange(/* cpr.events.CValueChangeEvent */ e){
	/** 
	 * @type cpr.controls.InputBox
	 */
	var ipbUdcProfNm = e.control;
	if(skipOnChange == true||openedByChange == true){
		// 팝업의 콜백으로 값이 세팅되어서 change 이벤트 발생한 경우
		// 이미 팝업을 처리하였기 때문에 다시 띄우지 않는다.
		return false;
	}
	
	if(checkUserValue() == null){
		clearCallback();
		return false;
	}
	
	var voMenuInfo = util.getMenuInfo();
	
	util.DataMap.setValue("dmReq", "authRngRcd", voMenuInfo.AUTH_RNG_RCD);
	util.DataMap.setValue("dmReq", "strStaffGrpAuth", app.getAppProperty("iStaffGrpAuth"));
	util.DataMap.setValue("dmReq", "strWkdtyAuth", app.getAppProperty("iWkdtyAuth"));
	util.DataMap.setValue("dmReq", "strStaffGrpRcd", app.getAppProperty("iStaffGrpRcd"));
	util.DataMap.setValue("dmReq", "strStaffSubGrpRcd", app.getAppProperty("iStaffSubGrpRcd"));
	util.DataMap.setValue("dmReq", "strStatRcd", app.getAppProperty("iStatusRcd"));
	util.DataMap.setValue("dmReq", "strStaffNo", app.getAppProperty("iStaffNo"));
	util.DataMap.setValue("dmReq", "strRepNm", app.getAppProperty("iRepNm"));
	util.DataMap.setValue("dmReq", "strKeyDate", app.getAppProperty("iKeyDate"));
	util.DataMap.setValue("dmReq", "strObjDivRcd", app.getAppProperty("iObjDivRcd"));
	util.DataMap.setValue("dmReq", "strObjCd", app.getAppProperty("iObjCd"));
	util.DataMap.setValue("dmReq", "strWkgrdRcd", app.getAppProperty("iWkgrdRcd"));
	util.DataMap.setValue("dmReq", "strOprtRoleId", voMenuInfo.OPRT_ROLE_ID);
	util.DataMap.setValue("dmReq", "strPresIncludCls", app.getAppProperty("iPresIncludCls"));
	
	util.Submit.send("subPrecheckStdCmnRPrsnSearch", function(pbSuccess){
		if(pbSuccess){
			var vnCount = util.DataMap.getValue("dmRes", "count");
			
			if(vnCount == 1){
				// 검색결과가 1건이면 팝업없이 바로 값세팅
				app.setAppProperty("oAfpAppDt", util.DataMap.getValue("dmResult", "AFP_APP_DT"));
				app.setAppProperty("oBirthday", util.DataMap.getValue("dmResult", "BIRTHDAY"));
				app.setAppProperty("oHoRcd", util.DataMap.getValue("dmResult", "HO_RCD"));
				app.setAppProperty("oIoForeignDivRcd", util.DataMap.getValue("dmResult", "IO_FOREIGN_DIV_RCD"));
				app.setAppProperty("oObjNo", util.DataMap.getValue("dmResult", "OBJ_NO"));
				app.setAppProperty("oOgCd", util.DataMap.getValue("dmResult", "OG_CD"));
				app.setAppProperty("oOgNm", util.DataMap.getValue("dmResult", "OG_NM"));
				app.setAppProperty("oPosCd", util.DataMap.getValue("dmResult", "POS_CD"));
				app.setAppProperty("oPosNm", util.DataMap.getValue("dmResult", "POS_NM"));
				app.setAppProperty("oProfDivRcd", util.DataMap.getValue("dmResult", ""));
				app.setAppProperty("oPvactCiiDt", util.DataMap.getValue("dmResult", ""));
				app.setAppProperty("oRepNm", util.DataMap.getValue("dmResult", "REP_NM"));
				app.setAppProperty("oSsn", util.DataMap.getValue("dmResult", "SSN"));
				app.setAppProperty("oStaffGrpRcd", util.DataMap.getValue("dmResult", "STAFF_GRP_RCD"));
				app.setAppProperty("oStaffNo", util.DataMap.getValue("dmResult", "STAFF_NO"));
				app.setAppProperty("oStaffSubGrpRcd", util.DataMap.getValue("dmResult", "STAFF_SUB_GRP_RCD"));
				app.setAppProperty("oStatNm", util.DataMap.getValue("dmResult", "STAT_NM"));
				app.setAppProperty("oStatRcd", util.DataMap.getValue("dmResult", "STAT_RCD"));
				app.setAppProperty("oWkdtyNm", util.DataMap.getValue("dmResult", "WKDTY_NM"));
				app.setAppProperty("oWkdtyRcd", util.DataMap.getValue("dmResult", "WKDTY_RCD"));
				app.setAppProperty("oWkgrdNm", util.DataMap.getValue("dmResult", "WKGRD_NM"));
				app.setAppProperty("oWkgrdRcd", util.DataMap.getValue("dmResult", "WKGRD_RCD"));
				
				skipOnChange = true;
				app.lookup("ipbUdcProfNm").value = app.getAppProperty("oRepNm");
				app.lookup("ipbUdcProfNo").value = app.getAppProperty("oStaffNo");
				skipOnChange = false;
				
				var event = new cpr.events.CUIEvent("searchCallBack");
				app.dispatchEvent(event);
				
			}else{
				// 검색결과가 여러건이면 팝업.
				app.lookup("btnUdcProf").click();
			}
		}
	});
}

/*
 * "" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnSearchUdcProfClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnSearchUdcProf = e.control;
	if(app.getAppProperty("iIsParentGrpSearch")){
		if(hostUtil.Group.isGrpChgBtnSch()) return false;
	}
	
	if(openedByChange) {
		// 검색어를 입력하고 팝업버튼을 누른경우
		// 이미 change 이벤트에 의해 팝업이 떠있기 때문에 다시 띄우지 않는다.
		return false;
	}
	
	var voProf = null;
	var vsProfNm = app.lookup("ipbUdcProfNm").value;
	if(vsProfNm != ""){
		voProf = checkProfValue();
		if(voProf == null){
			e.stopPropagation();
			return false;
		}
	}
	
//	clearCallback();
	
	var initValue = {
		strStaffGrpAuth 		: app.getAppProperty("istrStaffGrpAuth"),
		strWkdtyAuth 			: app.getAppProperty("istrWkdtyAuth"),
		strStaffGrpRcd 			: app.getAppProperty("iStaffGrpRcd"),
		strStaffGrpRcdLock 		: app.getAppProperty("iStaffGrpRcdLock"),
		strStaffSubGrpRcd 		: app.getAppProperty("iStaffSubGrpRcd"),
		strStaffSubGrpRcdLock 	: app.getAppProperty("iStaffSubGrpRcdLock"),
		strStatusRcd 			: app.getAppProperty("iStatusRcd"),
		
		strStaffNo 				: "",
		strRepNm 				: app.getAppProperty("iRepNm"),
		strKeyDate 				: app.getAppProperty("iKeyDate"),
		strObjDivRcd 			: app.getAppProperty("iObjDivRcd"),
		strObjCd 				: app.getAppProperty("iObjCd"),
		strObjNm 				: app.getAppProperty("iObjNm"),
		strObjCdInList 			: app.getAppProperty("istrObjCdInList"),
		strWkgrdRcd 			: app.getAppProperty("iWkgrdRcd"),
		strOgDisableCls 		: app.getAppProperty("iOgDisableCls"),
		strPresIncludCls 		: app.getAppProperty("iPresIncludCls")
	};
	
	openedByChange = true;
	var _app = app;
	hostUtil.Dialog.open("app/cmn/cmnPPrsnSearch", 720, 400, function(/**@type cpr.events.CUIEvent */e){
		var dialog = e.control;
		var returnValue = dialog.returnValue;
		if(returnValue!=null){
			_app.setAppProperty("oAfpAppDt", returnValue.AFP_APP_DT);
			_app.setAppProperty("oBirthday", returnValue.BIRTHDAY);
			_app.setAppProperty("oHoRcd", returnValue.HO_RCD);
			_app.setAppProperty("oIoForeignDivRcd", returnValue.IO_FOREIGN_DIV_RCD);
			_app.setAppProperty("oObjNo", returnValue.OBJ_NO);
			_app.setAppProperty("oOgCd", returnValue.OG_CD);
			_app.setAppProperty("oOgNm", returnValue.OG_NM);
			_app.setAppProperty("oPosCd", returnValue.POS_CD);
			_app.setAppProperty("oPosNm", returnValue.POS_NM);
			_app.setAppProperty("oProfDivRcd", "");
			_app.setAppProperty("oPvactCiiDt", "");
			_app.setAppProperty("oRepNm", returnValue.REP_NM);
			_app.setAppProperty("oSsn", returnValue.SSN);
			_app.setAppProperty("oStaffGrpRcd", returnValue.STAFF_GRP_RCD);
			_app.setAppProperty("oStaffNo", returnValue.STAFF_NO);
			_app.setAppProperty("oStaffSubGrpRcd", returnValue.STAFF_SUB_GRP_RCD);
			_app.setAppProperty("oStatNm", returnValue.STAT_NM);
			_app.setAppProperty("oStatRcd", returnValue.STAT_RCD);
			_app.setAppProperty("oWkdtyNm", returnValue.WKDTY_NM);
			_app.setAppProperty("oWkdtyRcd", returnValue.WKDTY_RCD);
			_app.setAppProperty("oWkgrdNm", returnValue.WKGRD_NM);
			_app.setAppProperty("oWkgrdRcd", returnValue.WKGRD_RCD);
						
			skipOnChange = true;
			_app.lookup("ipbUdcProfNm").value = returnValue.REP_NM;
			_app.lookup("ipbUdcProfNo").value = returnValue.STAFF_NO;
			skipOnChange = false;
			
			var event = new cpr.events.CUIEvent("searchCallBack");
			_app.dispatchEvent(event);
		}else{
			if(ValueUtil.isNull(util.Control.getValue("ipbUdcProfNm")) == true){
				skipOnChange = true;//valueChange 이벤트 방지.
				_app.lookup("ipbUdcProfNm").value = "";
				_app.lookup("ipbUdcProfNo").value = "";
				skipOnChange = false;
			}
		}
		
		util.Control.redraw(["ipbUdcProfNm", "ipbUdcProfNo"]);
		openedByChange = false;
		
	}, initValue);
}

/*
 * 인풋 박스에서 keydown 이벤트 발생 시 호출.
 * 사용자가 키를 누를 때 발생하는 이벤트.
 */
function onIpbUdcProfNmKeydown(/* cpr.events.CKeyboardEvent */ e){
	/** 
	 * @type cpr.controls.InputBox
	 */
	var ipbUdcProfNm = e.control;
	if (e.keyCode == cpr.events.KeyCode.ENTER) {
		 e.stopPropagation();
	}
}
