//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./stdCmnPPsnConsentApply.xtm"/>

var stdCmnPPsnConsentApply = function() {
		
	var moPage = new Page();
	//임포트용 데이터 통신 오브젝트
	var moPObject = new PObject();
	
	
	
	moPage.onModelConstructDone_StdCmnPPsnConsentApply = function() {
		//서브미션 실행 (실패시 cover page)
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
					
				util.Control.redraw(app, "frfCmnPsnConsent");
						
			}
		}, true);
	};
	
	
	function doSave(poCallBackFunc) {
		
		var vnCnt = util.Grid.getRowCount(app, "frfCmnPsnConsent");
		
		for (var i = 1 ; i <= vnCnt ; i++){
			
			var vsContYn = util.Grid.getCellValue(app, "frfCmnPsnConsent",  "CONSENT_YN", i);
			
			if(vsContYn != "Y"){
						
				var vsItemNm = util.Grid.getCellValue(app, "frfCmnPsnConsent",  "ITEM_NM", i);
				util.Msg.alert("NLS-CMM-M045", [vsItemNm]);
				return false;
			}
		}

		//strCommand: save 
		util.Submit.send(app, "subSave", function(pbSuccess){
			if(pbSuccess){
				if(Common.findMainWindow().coverViewPrivateConsent){
					Common.findMainWindow().coverViewPrivateConsent(false);
				}
			}
		});
	}

	
	moPage.onValueChanged_CkbAll = function() {
		var vsChkValue = ExtControl.getTextValue("ckbAll");
		
		var vnCnt = util.Grid.getRowCount(app, "frfCmnPsnConsent");
		
		for (var i = 0 ; i <= vnCnt ; i++){
			if(vsChkValue == "Y")
				util.Grid.setCellValue(app, "frfCmnPsnConsent",  "CONSENT_YN", "Y", i + 1);
			else util.Grid.setCellValue(app, "frfCmnPsnConsent",  "CONSENT_YN", "", i + 1);
		}
	
	}
	
	moPage.onClick_BtnSave = function() {
		doSave();
	}
	
	moPage.onClick_BtnPrivacyTable = function() {
		var leftPos = (screen.availWidth - 690)/2;
		var topPos = (screen.availHeight - 710)/3;
		window.open("/privacyStandardSheet.html", "PRIVACY_SHEET", "top="+topPos+",left="+leftPos+",width=689,height=710,scroll=no,status=no,resizable=no");
	}
	
	
	moPage.onClick_BtnClose = function() {
		if(Common.findMainWindow().coverViewPrivateConsent){
			Common.findMainWindow().coverViewPrivateConsent(false);
		} 
	};
	return moPage;
};

