//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCsrPErrStList.xtm"/>


var extCsrPErrStList = function() {
	var moPage = new Page();

	/**
	 * @desc onModelConstructDone 이벤트
	 * @param 
	 * @return void
	 * @author	 Choi In Seong 2016. 03. 28.
	 */
	moPage.onModelConstructDone_StdCsrPStSearch = function() {
		
		//리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init("rptError");
	
		//화면 온로드 호출
		doOnLoad();
	};
	
	/**
	 * @desc 받아온 에러 목록 셋팅
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 03. 28.
	 */
	function doOnLoad() {
		
		var voErrorList = ExtPopUp.getParentVal("moErrorList");
		var voErrorFileInfo = ExtPopUp.getParentVal("moErrorFileInfo");
		var vnCnt = voErrorList.length;
		ExtInstance.copyNodeListObj("/root/resList/errStList", voErrorList );
		
		util.Control.redraw(app, "grdError");
		
		FileUtil.downloadFile( "/std.cmn.StdCmnFileTransUtil.ex",voErrorFileInfo);
	}

	/**
	 * @desc 화면닫기 버튼 클릭
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 03. 28.
	 */
	moPage.onClick_btnCloseCancel = function() {
		app.close();
	};
	
	/**
	 * @desc 헤더 온로드 실행
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 03. 28.
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		doHeaderOnLoad();
	};
	
	
	return moPage;
};
