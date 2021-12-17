//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCmnPDraftPaper.xtm"/>


var extCmnPDraftPaper = function() {
	var moPage = new Page();
	
	/**
	 * @desc Header Import onLoad
	 * @return void
	 * @author jeong-ho, Jeong 2016. 6. 10.
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		doHeaderOnLoad();
	};
	
	moPage.moDraftPaperParam = {
	};
	
	moPage.getDraftPaperParam = function() {
		return moPage.moDraftPaperParam;
	};
	
	/**
	 * @desc  onModelConstructDone  event
	 * @return void
	 * @author jeong-ho, Jeong 2016. 6. 13.
	 */
	moPage.onModelConstructDone_ExtCmnPDraftPaper = function() {
		var voParentParam =  ExtPopUp.getParentVal("moExtCmnGwsCommon");
		moDraftPaperParam = voParentParam;
		
		model.getControl("htmlobject").setSrc("../../xtm/cmn/groupware/draftPaper.jsp", true);
	};
	
	/**
	 * @desc  화면닫기 click event
	 * @return void
	 * @author jeong-ho, Jeong 2016. 6. 10.
	 */
	moPage.onClick_BtnClose = function() {
		var voRtnParam;
		ExtPopUp.closeLayeredPopup("callbackExtCmnGwsCommon", voRtnParam);
	};
	return moPage;
};
