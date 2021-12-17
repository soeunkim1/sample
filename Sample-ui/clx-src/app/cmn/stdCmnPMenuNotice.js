//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./stdCmnPMenuNotice.xtm"/>


var stdCmnPMenuNotice = function() {
	var moPage = new Page();
	var msContent = "";
	
	moPage.onModelConstructDone_StdCmnPMenuNotice = function() {
			
			
			util.DataMap.setValue(app, "dmReqKey", "strMenuId", moPageInfo.menuId);
			//strCommand: mainlist 
			util.Submit.send(app, "subMenuNotice", function(pbSuccess){
			if(pbSuccess){
				moPage.setTxtContent(util.DataMap.getValue(app, "dmResList", "strContent"));
				ExtSubPage.setPage("hojContent", "inc/common/mainBoard.html", true);
			}
		}); 
		
	};
	
		// 조회시 불러온 공지사항의 내용을 mainBoard.html에서 호출하여 화면에 뿌려줌 
	moPage.getTxtContent = function() {
		return msContent;
		
	};
	
	//조회시 데이터베이스로부터 가져온 내용 값을 전역변수에 담는다.
	moPage.setTxtContent = function(psContent) {
		msContent = psContent;
	};
	
	moPage.onLoadImportDone_ImpTitle = function() {
		doHeaderOnLoad();
	}
	
	moPage.onClick_BtnClose = function() {
		app.close();
	}
	return moPage;
};
