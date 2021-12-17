var utilHost;
var util = new ComUtil(app);
/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	utilHost = new ComUtil(app.getHostAppInstance());
}

/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnUdcFileUpClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	
	var btnUdcFileUp = e.control;
	var _app = app;
	var initValue = {
			iFileSerialNo : app.getAppProperty("iFileSerialNo"),
			iIsDownloadOnly : app.getAppProperty("iIsDownloadOnly"),
			iFileExtFilter : app.getAppProperty("iFileExtFilter"),
			iLimitFileSize : app.getAppProperty("iLimitFileSize"),
			iMaxFileCnt : app.getAppProperty("iMaxFileCnt")
		};
	
	utilHost.Dialog.open("app/cmn/cmnPFileUtil", 710, 350, function(/* cpr.events.CUIEvent */e){
		var dialog = e.control;
		var returnValue = dialog.returnValue;
		
		if(returnValue != null){
			_app.setAppProperty("oFileSerailNo", returnValue.FILE_SERIAL_NO);
			_app.setAppProperty("oFileCnt", returnValue.FILE_CNT);
			var event = new cpr.events.CUIEvent("upLoadCallBack");
			event.fileInfo = returnValue;
			app.dispatchEvent(event);
		}
		
		
	}, initValue, {headerClose: false});
	
};


