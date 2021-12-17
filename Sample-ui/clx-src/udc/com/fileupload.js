
var util = new ComUtil(app);

exports.getFiles = function() {
	var fileuploader = app.lookup("fudComFileUpLoad");
	return fileuploader.getFiles();
};


exports.getFileUploader = function() {
	return app.lookup("fudComFileUpLoad");
};



/*
 * 파일 업로드에서 sendbutton-click 이벤트 발생 시 호출.
 * 파일을 전송하는 button을 클릭 시 발생하는 이벤트.
 */
function onFud1SendbuttonClick(/* cpr.events.CEvent */ e){
	/** 
	 * @type cpr.controls.FileUpload
	 */
	var fud1 = e.control;
	var eventObj = new cpr.events.CEvent("filesend");
	app.dispatchEvent(eventObj);
}

/*
 * 파일 업로드에서 maxsize-exceed 이벤트 발생 시 호출.
 * 파일을 추가 시 파일의 크기가 최대 일 경우 발생하는 이벤트. 추가할 파일이 최대 크기보다 큰 경우 발생합니다. 추가된 파일들의 합계가 최대 크기보다 큰 경우 발생합니다.
 */
function onFudComFileUpLoadMaxsizeExceed(/* cpr.events.CFileUploadEvent */ e){
	/** 
	 * @type cpr.controls.FileUpload
	 */
	var fudComFileUpLoad = e.control;
	util.Msg.warn("M057", [fudComFileUpLoad.limitFileSize]);
	
}

/*
 * 파일 업로드에서 maxcount-exceed 이벤트 발생 시 호출.
 * 파일을 추가 할 때 파일의 개수가 최대 일 경우 발생하는 이벤트.
 */
function onFudComFileUpLoadMaxcountExceed(/* cpr.events.CFileUploadEvent */ e){
	/** 
	 * @type cpr.controls.FileUpload
	 */
	var fudComFileUpLoad = e.control;
	util.Msg.warn("M058", [fudComFileUpLoad.maxFileCount]);
	fudComFileUpLoad.removeAllFiles();
	
}

/*
 * 파일 업로드에서 extension-violate 이벤트 발생 시 호출.
 * 파일 추가 시 파일의 확장자와 기존에 등록된 확장자의 유형이 다를 경우 발생하는 이벤트.
 */
function onFudComFileUpLoadExtensionViolate(/* cpr.events.CFileUploadEvent */ e){
	/** 
	 * @type cpr.controls.FileUpload
	 */
	var fudComFileUpLoad = e.control;
	util.Msg.warn("M059", [fudComFileUpLoad.extensions]);
	
}

/*
 * "취소" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnCancleClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnCancle = e.control;

	var eventObj = new cpr.events.CEvent("filecancle");
	app.dispatchEvent(eventObj);
	
}
