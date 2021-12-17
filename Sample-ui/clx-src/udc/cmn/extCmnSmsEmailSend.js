var hostUtil;
var util = new ComUtil(app);

var skipOnChange = false;
var openedByChange = false;

//moIdsForExtCmnSender = {
//	grdId				: "grdExtCmnSndMgt",			// (필수) SMS 리피트 id
//	sendDivChar			: ["ghBtnRepNm","ghBtnStudNo"], // (선택) 발송문구구분_발송내용의 @ 키워드와 매핑됨
//	sndId				: "CMN01401",					// (선택) 발송id
//	unitSystemRcd		: "CB001CMN",					// (선택) 단위시스템구분코드		-- 발송Id입력 시 필수
//	repNm				: "rhBtnRepNm", 				// (필수 )수신자명 리피트 헤더 ID
//
//	phoneNo				: "ghBtnSndTelNo	",					// (필수) 휴대폰번호 리피트 헤더 ID
//	defSenderSms		: "01034090203",				// (선택) 보내는이(SMS)
//	sendMsgContSms  	: "",							// (선택) SMS발송 내용
//	sendTitleSms    	: "	발송제목",						// (선택) SMS발송 제목
//
//	email				: "ghBtnEmail",					// (필수) 이메일 리피트 헤더 ID
//	defSenderEmail		: "skyhawk0203@gmail.com", 		// (선택) 보내는이(Email)
//	defPersonalNmEmail 	: "",							// (선택) 보내는이 명(닉네임)(Email)
//	sendMsgContEmail	: "발송내용",						// (선택) Email발송 내용
//	sendTitleEmail		: "발송제목",						// (선택) Email발송 제목

var moExtCmnSender = {
	smsEmailDivCd		: "",	// SMS이메일구분코드[CMN013]
	grdId				: "",	// 그리드 id
	phoneNo 			: "",	// 전화번호(그리드 헤더 id)
	repNm 				: "",	// 수신자명(그리드 헤더 id)
	email 				: "",	// 이메일(그리드 헤더 id)
	defSenderSms		: "",	// 보내는이(sms)
	defSenderEmail		: "",	// 보내는이메일주소(Email)
	defPersonalNmEmail  : "",	// 보내는이 명(닉네임)(Email)
	sendDivCharStr 		: "",	// 발송문구구분값
	sendDivChar			: [],	// 발송문구구분
	sendDivCharSnd    	: [],	// 발송id가 입력되었을경우 구분값
	sendMsgContSms     	: "",	// SMS발송 내용
	sendTitleSms   		: "",	// SMS발송 제목
	sendMsgContEmail	: "",	// Email발송 내용
	sendTitleEmail		: ""	// Email발송 제목
};


/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	hostUtil = new ComUtil(app.getHostAppInstance());
	doExtCmnSmsEmailLoad();
}//onBodyLoad()

/**
 * @desc  SMS/Email 임포트 onLoad
 *				임포트를 사용하는 페이지는 필히 onLoadImportDone 이벤트 구현
 * @param
 */
function doExtCmnSmsEmailLoad() {
	util.Submit.send("subImpSendOnLoad", function(pbSuccess){
		if(pbSuccess){
			util.Control.redraw("cbbImpSendDiv");
			
			//sms
			if(ValueUtil.isNull(app.getAppProperty("phoneNo"))){
				util.SelectCtl.setValue("cbbImpSendDiv", "CMN01302");
				util.Control.setEnable(false, "cbbImpSendDiv");
				moExtCmnSender.smsEmailDivCd = "CMN01302";
			}
			//email
			if(ValueUtil.isNull(app.getAppProperty("email"))){
				util.SelectCtl.setValue("cbbImpSendDiv", "CMN01301");
				util.Control.setEnable(false, "cbbImpSendDiv");
				moExtCmnSender.smsEmailDivCd = "CMN01301";
			}
			// 발송Id
			var vsSendId = app.getAppProperty("sndId");
			// 단위시스템구분코드
			var vsUnitSystemRcd = app.getAppProperty("unitSystemRcd");
			// 발송ID와 단위시스템구분코드가 입력 되었을 경우 발송정보 조회
			if(!ValueUtil.isNull(vsSendId) && !ValueUtil.isNull(vsUnitSystemRcd)){
				util.DataMap.setValue("dmReqKey", "strSndId", vsSendId);
				util.DataMap.setValue("dmReqKey", "strUnitSystemRcd", vsUnitSystemRcd);
				// 발송정보 조회
				doImpGetSendInfo(function(pbSuccess) {
					if (pbSuccess) setInitParamExtCmnSenderBySndId();
				});	
			}else{
				setInitParamExtCmnSender();
			}
		}
	});
};//doExtCmnSmsEmailLoad()

/**
 * 발송ID, 단위시스템구분코드에 해당하는 발송정보 GET
 * @member impExtCmnSmsEmailSend
 * @author 
 */
function doImpGetSendInfo(poCallBackFunc){
	util.Submit.send("subImpSendInfo", function(pbSuccess){
		if(pbSuccess){
			if(util.isFunc(poCallBackFunc)){
				poCallBackFunc(pbSuccess)
			}
		}
	});
};//doImpGetSendInfo()

/**
 * 필수값 settting	(발송ID, 단위시스템 입력된경우)
 * @member impExtCmnSmsEmailSend
 * @type void
 * @author 
 */
function setInitParamExtCmnSenderBySndId () {
	moExtCmnSender.grdId = app.getAppProperty("grdId");
	moExtCmnSender.phoneNo = app.getAppProperty("phoneNo");
	moExtCmnSender.email = app.getAppProperty("email");
	moExtCmnSender.sendDivChar = [app.getAppProperty("sendDivChar")];
	moExtCmnSender.repNm = app.getAppProperty("repNm");
	
	moExtCmnSender.defSenderSms = util.DataMap.getValue("dmSendInfo", "SND_TEL_NO");
	moExtCmnSender.defSenderEmail = util.DataMap.getValue("dmSendInfo", "EMAIL");
	moExtCmnSender.defPersonalNmEmail = util.DataMap.getValue("dmSendInfo", "NICKNAME");
	moExtCmnSender.sendTitleSms = util.DataMap.getValue("dmSendInfo", "SMS_TITLE");
	moExtCmnSender.sendMsgContSms = util.DataMap.getValue("dmSendInfo", "SMS_CONT");
	moExtCmnSender.sendTitleEmail = util.DataMap.getValue("dmSendInfo", "EMAIL_TITLE");
	moExtCmnSender.sendMsgContEmail = util.DataMap.getValue("dmSendInfo", "EMAIL_CONT");
	var vsSendDivChar = "";
	var voSendDivCharSnd = [];
	/** @type cpr.data.DataSet */
	var vcDsListSndNm = util.Control.lookup("dsListSndNm");
	var vnChildCnt = vcDsListSndNm.getRowCount();
	for(var i = 0; i < vnChildCnt; i++){
		var voChildRow = vcDsListSndNm.getRow(i);
		var vsChildCdNm = voChildRow.getValue("CD_NM");
		vsSendDivChar += voChildRow.getValue("CD_NM") + " , ";
		voSendDivCharSnd.push(voChildRow.getValue("COL"));
	}
	
	if(!ValueUtil.isNull(vsSendDivChar)){
		vsSendDivChar = vsSendDivChar.substring(0, vsSendDivChar.length-2);
		vsSendDivChar = vsSendDivChar.simpleReplace("/", ":" );
	}
	moExtCmnSender.sendDivCharStr = vsSendDivChar;
	moExtCmnSender.sendDivCharSnd = voSendDivCharSnd;
	
	if(app.getAppProperty("useDivCode") != null){
		util.SelectCtl.setInsBind("cbbImpSendDiv", "CD =' "+ app.getAppProperty("useDivCode") +"'", 0);
	}
};//setInitParamExtCmnSenderBySndId()


/**
 * 필수값 settting	(발송ID, 단위시스템 미입력)
 * @member impExtCmnSmsEmailSend
 * @type void
 */
function setInitParamExtCmnSender() {
	
	moExtCmnSender.grdId 				= app.getAppProperty("grdId");
	moExtCmnSender.phoneNo 				= app.getAppProperty("phoneNo");
	moExtCmnSender.repNm 				= app.getAppProperty("repNm");
	moExtCmnSender.email 				= app.getAppProperty("email");
	moExtCmnSender.sendDivChar			= [app.getAppProperty("sendDivChar")];
	moExtCmnSender.defPersonalNmEmail 	= app.getAppProperty("defPersonalNmEmail");
	moExtCmnSender.sendTitleSms 		= app.getAppProperty("sendTitleSms");			// SMS발송제목
	moExtCmnSender.sendMsgContSms		= app.getAppProperty("sendMsgContSms");			// SMS발송내용
	moExtCmnSender.sendTitleEmail 		= app.getAppProperty("sendTitleEmail");			// Email발송제목
	moExtCmnSender.sendMsgContEmail 	= app.getAppProperty("sendMsgContEmail");		// Email발송내용
	
	var vnRowIndex;
	if(ValueUtil.isNull(app.getAppProperty("defSenderEmail"))){
		vnRowIndex = util.DataSet.findRow("dsSendDivList", "CD = 'CMN01302'").getIndex();
		moExtCmnSender.defSenderEmail = util.DataSet.getValue("dsSendDivList", vnRowIndex, "CD_PRP1");
	}else{
		moExtCmnSender.defSenderEmail = app.getAppProperty("defSenderEmail");
	}
	
	if(ValueUtil.isNull(app.getAppProperty("defSenderSms"))){
		vnRowIndex = util.DataSet.findRow("dsSendDivList", "CD = 'CMN01301'").getIndex();
		moExtCmnSender.defSenderEmail = util.DataSet.getValue("dsSendDivList", vnRowIndex, "CD_PRP1");
	}else{
		moExtCmnSender.defSenderSms = app.getAppProperty("defSenderSms");
	}
	
	if(app.getAppProperty("useDivCode") != null){
		util.SelectCtl.setInsBind("cbbImpSendDiv", "CD = '" + app.getAppProperty("useDivCode") +"'", pnSelectedIdx);
	}
};//setInitParamExtCmnSender()
/*
 * "발송문작성" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnImpSendDivClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnImpSendDiv = e.control;
	
	
	// 팝업의 콜백으로 값이 세팅되어서 change 이벤트 발생한 경우
	// 이미 팝업을 처리하였기 때문에 다시 띄우지 않는다.
	if(skipOnChange == true||openedByChange == true){
		return ;
	}
	
	if (!util.validate("cbbImpSendDiv")) {
		return false;
	}
	
		// 발송Id
		var vsSendId = app.getAppProperty("sndId");
		// 단위시스템구분코드
		var vsUnitSystemRcd = app.getAppProperty("unitSystemRcd");
		// 발송ID와 단위시스템구분코드가 입력 되었을 경우 발송정보 조회
		if(!ValueUtil.isNull(vsSendId) && !ValueUtil.isNull(vsUnitSystemRcd)){
			util.DataMap.setValue("dmReqKey", "strSndId", vsSendId);
			util.DataMap.setValue("dmReqKey", "strUnitSystemRcd", vsUnitSystemRcd);
			// 발송정보 조회
			doImpGetSendInfo(function(pbSuccess) {
				if(pbSuccess){
					setInitParamExtCmnSenderBySndId();	
				}
			});	
		}else {
			setInitParamExtCmnSender();
		}
//	}
	if(ValueUtil.isNull(moExtCmnSender.smsEmailDivCd)){
		moExtCmnSender.smsEmailDivCd = util.SelectCtl.getValue("cbbImpSendDiv");
	}
	
	if(moExtCmnSender.smsEmailDivCd == "CMN01302"){
		openedByChange = true;
		hostUtil.Dialog.open("app/cmn/extCmnPEmailSend", 1005, 640, function(/**@type cpr.events.CUIEvent */e){	
			openedByChange = false;
		}, moExtCmnSender);
		return;
	}else{
		openedByChange = true;
		hostUtil.Dialog.open("app/cmn/extCmnPSmsSend", 710, 510, function(/**@type cpr.events.CUIEvent */e){	
			openedByChange = false;
		}, moExtCmnSender);
		return;		
	}
}//onBtnImpSendDivClick()

/*
 * 콤보 박스에서 selection-change 이벤트 발생 시 호출.
 * ComboBox Item을 선택하여 선택된 값이 저장된 후에 발생하는 이벤트.
 */
function onCbbImpSendDivSelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.ComboBox
	 */
	var cbbImpSendDiv = e.control;
	var vsSendDiv = util.SelectCtl.getValue("cbbImpSendDiv");
	moExtCmnSender.smsEmailDivCd = vsSendDiv;
}//onCbbImpSendDivSelectionChange()
