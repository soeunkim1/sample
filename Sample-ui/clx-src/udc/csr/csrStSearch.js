var utilHost;
var util = new ComUtil(app);

var skipOnChange = false;
var openedByChange = false;

function clearCallback(){
	skipOnChange = true;
	app.lookup("ipbSchStudNo").value = ""
	app.lookup("ipbSchStudNm").value = ""	
	skipOnChange = false;
	
	app.setAppProperty("oStudId", "");
	app.setAppProperty("oStudNo", "");
	app.setAppProperty("oStudNm", "");
	app.setAppProperty("oStatNm", "");
	app.setAppProperty("oStatRcd", "");
	app.setAppProperty("oProcRslt", "");
	app.setAppProperty("oProcRsltYear", "");
	app.setAppProperty("oSaNm", "");
	app.setAppProperty("oSaCd", "");
	app.setAppProperty("oSpNm", "");
	app.setAppProperty("oSpCd", "");
	app.setAppProperty("oOgNm", "");
	app.setAppProperty("oOgCd", "");
	app.setAppProperty("oStudDivRcd", "");
	app.setAppProperty("oStudDivNm", "");
	app.setAppProperty("oBirthday", "");
	app.setAppProperty("oGenderRcd", "");
	app.setAppProperty("oGenderNm", "");
}

/**
 * 버튼 클릭시 팝업 호출
 */
function doOnClickStdCsrPStSearch(psNewObjNm) {
	
//	if(ExtGroup.isGrpChgImpPopSch(vsEventCtlId)) return false;
//	
//	if (moStdCsrPStSearch.openedByChange) {
//	// 검색어를 입력하고 팝업버튼을 누른경우
//	// 이미 change 이벤트에 의해 팝업이 떠있기 때문에 다시 띄우지 않는다.
//	return;
//	}
	
	var _app = app;
	
	var initValue = {
		strStudId 	: app.getAppProperty("iStudId"),
		strStudNo 	: app.getAppProperty("iStudNo"),
		strStudNm 	: app.getAppProperty("iStudNm"),
		strKeyDate 	: app.getAppProperty("iKeyDate"),
		strObjDivRcd : app.getAppProperty("iObjDivRcd"),
		strObjCd 		: app.getAppProperty("iObjCd"),
		strObjNm 	: app.getAppProperty("iObjNm"),
		strStatRcd 	: app.getAppProperty("iStatRcd"),
		strStudDivRcd : app.getAppProperty("iStudDivRcd")
	};
	
//	clearCallback();
	
	utilHost.Dialog.open("app/csr/csrPStSearch", 800, 500, function(/* cpr.events.CUIEvent */e){
		var dialog = e.control;

		var returnValue = dialog.returnValue;
		if(returnValue != null){
			_app.setAppProperty("oStudId", returnValue.STUD_ID);
			_app.setAppProperty("oStudNo", returnValue.STUD_NO);
			_app.setAppProperty("oStudNm", returnValue.REP_NM);
			_app.setAppProperty("oStatNm", returnValue.STAT_NM);
			_app.setAppProperty("oStatRcd", returnValue.STAT_RCD);
			_app.setAppProperty("oProcRslt", returnValue.PROC_RSLT);
			_app.setAppProperty("oProcRsltYear", returnValue.PROC_RSLT_YEAR);
			_app.setAppProperty("oSaCd", returnValue.SA_CD);
			_app.setAppProperty("oSaNm", returnValue.SA_NM);
			_app.setAppProperty("oSpCd", returnValue.SP_CD);
			_app.setAppProperty("oSpNm", returnValue.SP_NM);
			_app.setAppProperty("oOgCd", returnValue.OG_CD);
			_app.setAppProperty("oOgNm", returnValue.OG_NM);
			_app.setAppProperty("oStudDivRcd", returnValue.STUD_DIV_RCD);
			_app.setAppProperty("oStudDivNm", returnValue.STUD_DIV_NM);
			_app.setAppProperty("oBirthday", returnValue.BIRTHDAY);
			_app.setAppProperty("oGenderRcd", returnValue.GENDER_RCD);
			_app.setAppProperty("oGenderNm", returnValue.GENDER_NM);
			
			skipOnChange = true; //valueChange 이벤트 방지.
			_app.lookup("ipbSchStudNo").value = returnValue.STUD_NO;
			_app.lookup("ipbSchStudNm").value = returnValue.REP_NM
			skipOnChange = false; 
			
			var event = new cpr.events.CUIEvent("searchCallBack");
			_app.dispatchEvent(event);
		}else{
			if(ValueUtil.isNull(util.Control.getValue("ipbSchStudNm")) == true){
				skipOnChange = true; //valueChange 이벤트 방지.
				_app.lookup("ipbSchStudNo").value = "";
				_app.lookup("ipbSchStudNm").value = "";
				skipOnChange = false; 
			}
		}
		openedByChange = false;
	
	}, initValue);
}

// EVENT ////////////////////////////////////////////////////////////////////////////////////////////

/*
 * "" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnPopSearchClick(/* cpr.events.CMouseEvent */ e){

	doOnClickStdCsrPStSearch();
}

/*
 * 인풋 박스에서 value-change 이벤트 발생 시 호출.
 * 변경된 value가 저장된 후에 발생하는 이벤트.
 */
function onIpbSchStudIdValueChange(/* cpr.events.CValueChangeEvent */ e){
	/** 
	 * @type cpr.controls.InputBox
	 */
	var ipbSchStudId = e.control;

	if(skipOnChange == true||openedByChange == true){
		// 팝업의 콜백으로 값이 세팅되어서 change 이벤트 발생한 경우
		// 이미 팝업을 처리하였기 때문에 다시 띄우지 않는다.
		return false;
	}
	
	var vsSchStudId = ipbSchStudId.value;
	// 이벤트가 발생한 내용 입력해준다.
	// 입력내용 삭제시 팝업없이 관련내용 삭제 -> 삭제인데도, 아래의 체크처리가 이루워짐에 따라 불필요한 메시지 호출됨으로 막아준다.
	//	clearCallback();
	
	if(vsSchStudId == ""){
		clearCallback();
		return false;
	}
	
	if(checkStudValue() == false){
		clearCallback();
		return false;
	}
	
	var voMenuInfo = util.getMenuInfo();
	
	util.DataMap.setValue("dmReq", "authRngRcd", util.getMenuInfo().get("AUTH_RNG_RCD"));
	util.DataMap.setValue("dmReq", "strOprtRoleId", util.getMenuInfo().get("OPRT_ROLE_ID"));
	util.DataMap.setValue("dmReq", "strStudId", app.getAppProperty("iStudId"));
	util.DataMap.setValue("dmReq", "strStudNo", app.getAppProperty("iStudNo"));
	util.DataMap.setValue("dmReq", "strStudNm", app.getAppProperty("iStudNm"));
	util.DataMap.setValue("dmReq", "strKeyDate", app.getAppProperty("iKeyDate"));
	util.DataMap.setValue("dmReq", "strStatus", app.getAppProperty("iStudDivRcd"));
	util.DataMap.setValue("dmReq", "strObjDivRcd", app.getAppProperty("iObjDivRcd"));
	util.DataMap.setValue("dmReq", "strObjCd", app.getAppProperty("iObjCd"));
	util.DataMap.setValue("dmReq", "strStudDivRcd", app.getAppProperty("iStudDivRcd"));
	
	util.Submit.send("subPrecheckStdCsrPStSearch", function(pbSuccess){
		if(pbSuccess){
			var vnCount = util.DataMap.getValue("dmRes", "count");
			
			if(vnCount == 1){
				// 검색결과가 1건이면 팝업없이 바로 값세팅
				app.setAppProperty("oStudId", util.DataMap.getValue("dmResult", "STUD_ID"));
				app.setAppProperty("oStudNo", util.DataMap.getValue("dmResult", "STUD_NO"));
				app.setAppProperty("oStudNm", util.DataMap.getValue("dmResult", "REP_NM"));
				app.setAppProperty("oStatNm", util.DataMap.getValue("dmResult", "STAT_NM"));
				app.setAppProperty("oStatRcd", util.DataMap.getValue("dmResult", "STAT_RCD"));
				app.setAppProperty("oProcRslt", util.DataMap.getValue("dmResult", "PROC_RSLT"));
				app.setAppProperty("oProcRsltYear", util.DataMap.getValue("dmResult", "PROC_RSLT_YEAR"));
				app.setAppProperty("oSaNm", util.DataMap.getValue("dmResult", "SA_NM"));
				app.setAppProperty("oSaCd", util.DataMap.getValue("dmResult", "SA_CD"));
				app.setAppProperty("oSpNm", util.DataMap.getValue("dmResult", "SP_NM"));
				app.setAppProperty("oSpCd", util.DataMap.getValue("dmResult", "SP_CD"));
				app.setAppProperty("oOgNm", util.DataMap.getValue("dmResult", "OG_NM"));
				app.setAppProperty("oOgCd", util.DataMap.getValue("dmResult", "OG_CD"));
				app.setAppProperty("oStudDivRcd	", util.DataMap.getValue("dmResult", "STUD_DIV_RCD"));
				app.setAppProperty("oStudDivNm", util.DataMap.getValue("dmResult", "STUD_DIV_NM"));
				app.setAppProperty("oBirthday", util.DataMap.getValue("dmResult", "BIRTHDAY"));
				app.setAppProperty("oGenderRcd", util.DataMap.getValue("dmResult", "GENDER_RCD"));
				app.setAppProperty("oGenderNm", util.DataMap.getValue("dmResult", "GENDER_NM"));

				
				skipOnChange = true;
				app.lookup("ipbSchStudNo").value = app.getAppProperty("oStudNo");
				app.lookup("ipbSchStudNm").value = app.getAppProperty("oStudNm");
				skipOnChange = false;
				
				var event = new cpr.events.CUIEvent("searchCallBack");
				app.dispatchEvent(event);
				
			}else{
				// 검색결과가 여러건이면 팝업.
				app.lookup("btnPopSearch").click();
			}
		}
	});
}

/**
 * 입력된 학번 또는 학생 id에 대한 글자 수 체크.  
 * @return {Object} studNo, studNm.
 */
function checkStudValue(){
	// 사용자ID와 사용자명을 체크한다.
	var vsStudNo= app.lookup("ipbSchStudNo").value;
	var vsStudNm = "";
	
	// 입력된 학번이 한글인 경우는 학생 이름으로 검색되도록 하고 숫자인 경우 학번으로 검색되도록 하고 그외의 경우 학생ID로 검색되도록 처리한다.
	if(!ValueUtil.isNull(vsStudNo)){
		if(ValueUtil.isNumber(vsStudNo)){
			vsStudNm = "";
			if(vsStudNo.length < 2){
				util.Msg.warn("M101", [cpr.I18N.INSTANCE.message("NLS-SCR-STUDID"), ""+"2"]);
				return false;
			}
		}else{
			vsStudNo = "";
			vsStudNm = app.lookup("ipbSchStudNo").value;
			if(vsStudNm.length < 2){
				util.Msg.warn("M101", [cpr.I18N.INSTANCE.message("NLS-SCR-NAME"), ""+"2"]);
				return false;
			}
		}
	}else{
		vsStudNo = "";
		vsStudNm = app.lookup("ipbSchStudNo").value;
		if(vsStudNm.length < 2){
			util.Msg.warn("M101", [cpr.I18N.INSTANCE.message("NLS-SCR-NAME"), ""+"2"]);
			return false;
		}
	}
	
	return {studNo: vsStudNo, studNm: vsStudNm};
}

/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	utilHost = new ComUtil(app.getHostAppInstance());
}

/*
 * Body에서 property-change 이벤트 발생 시 호출.
 * 앱의 속성이 변경될 때 발생하는 이벤트 입니다.
 */
function onBodyPropertyChange(/* cpr.events.CPropertyChangeEvent */ e){
	var vsProperty = e.property;
	
	if(vsProperty == "iStudNo" || vsProperty == "oStudNo"){
		app.lookup("ipbSchStudNo").redraw();
	}
	
	if(vsProperty == "iStudId" || vsProperty == "oStudId"){
		app.lookup("ipbSchStudNm").redraw();
	}
	
	if(vsProperty == "required"){
		var vsRequired = app.getAppProperty("required");
		if(vsRequired == "Y"){
			var vcIpbUdcUserId = app.lookup("ipbSchStudNo");
			vcIpbUdcUserId.userAttr({
				"required":"Y"
			});
			vcIpbUdcUserId.fieldLabel = app.getAppProperty("fieldLabel");
		}
	}
}

/*
 * 인풋 박스에서 keydown 이벤트 발생 시 호출.
 * 사용자가 키를 누를 때 발생하는 이벤트.
 */
function onIpbSchStudNoKeydown(/* cpr.events.CKeyboardEvent */ e){
	/** 
	 * @type cpr.controls.InputBox
	 */
	var ipbSchStudNo = e.control;
	if(e.keyCode == cpr.events.KeyCode.ENTER){
		e.stopPropagation();
	}
}
