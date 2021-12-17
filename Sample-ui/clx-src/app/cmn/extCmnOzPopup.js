
//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCmnOzPopup.xtm"/>


var extCmnOzPopup = function() {
		
	var moPage = new Page();
	var moPObject = new PObject();
	
			
	

	moPage.onModelConstructDone_extCmnOzPopup = function() {
		doOnLoad();
	};
	
	
	
	/**
	 * @desc  onLoad  	
	 * @return void
	 * @author xxxx 2015. 6. 5.
	 */
	function doOnLoad() {
		
		page.doParentGet();
		
	}
	
	
	
	/**
	 * @desc  doParentGet  	
	 * @return void
	 * @author xxxx 2015. 6. 5.
	 */
	function doParentGet() {
		
		if(ExtPopUp.isPopUp()) {
			
			// 호출한 페이지에서 파라미터 받기.								
			
			var voReportParm =  ExtPopUp.getParentVal("ReportUtil.voReportParm");
			
			ExtPopUp.getParentVal();
			
			//--타이틀 
			ExtControl.setTextValue("lblTitleHojReport", voReportParm.psTitle );
			util.Control.redraw(app, "lblTitleHojReport");
			
			
			
			util.Report.open(app, "hojReport", voReportParm.psOzrName, voReportParm.poFormParam, voReportParm.poParam, voReportParm.paChildFormParam, voReportParm.paChildParam, voReportParm.pbSessionChk);			
		}
		
	};
	
	
	
	
	
	moPage.onLoadImportDone_ImpTitle = function() {
		doHeaderOnLoad();
	};
	
	
	moPage.onClick_BtnCloseCancel = function() {
		// 팝업 닫기
		app.close();
	}
	
	
	
	return moPage;
};

