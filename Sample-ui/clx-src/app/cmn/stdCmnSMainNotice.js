//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./stdCmnSMainNotice.xtm"/>



var stdCmnSMainNotice = function() {
	var moPage = new Page();
	var moPObject = new PObject();
	
	// 팝업 작동 내부 사용 
	moPObject.mnNoticeSeq;
	
	moPObject.mnEventStart = "L";
	/**
	 * @desc 헤더 온로드 실행
	 * @param
	 * @return void
	 * @author 강현우 2016.02.02
	 */	
	moPage.onLoadImportDone_ImpTitle = function() {
		doHeaderOnLoad();
	}
	
	/**
	 * @desc  공지사항 목록 조회
	 * @param poCollBackFunc
	 * @return void
	 * @author 강현우 2016.02.02
	 */	
	function doList(poCollBackFunc) {
		
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess) {
			if (pbSuccess) {				
				util.Control.redraw(app, "grdCmnBoard");	
			}
			if (util.isFunc(poCollBackFunc)) {
				poCollBackFunc(pbSuccess);
			}
		});
		
	};
	
	/**
	 * @desc  주요일정 목록 조회
	 * @param
	 * @return void
	 * @author 강현우 2016.02.02
	 */	
	function doScheduleList() {

		//strCommand: mainlist 
		util.Submit.send(app, "subScheduleList", function(pbSuccess) {
			if (pbSuccess) {
				util.Control.redraw(app, "grdCmnSchedule");
				
			}
		});
	};
	
	/**
	 * @desc  사용자별 바로가기 메뉴목록 조회
	 * @param
	 * @return void
	 * @author 강현우 2016.02.12
	 */	
	function doQikMenu() {
		
		util.DataMap.setValue(app, "dmRoot", "reqKey", "strChkMain", "main");
		
		//strCommand: qikList 
		util.Submit.send(app, "subQikList", function(pbSuccess) {
			if (pbSuccess) {
				
				// 사용자별 바로가기 설정된 항목의 개수 
				var vnMenuCnt = util.DataSet.getRowCount(app, "dsFrfCmnUserQikMenu");
				
				// 프리폼을 사용자 구분에 따라 동적으로 생성
				
				var vnCtlTop = 10;
				var vnCtlLeft = 0;

				for (var i = 1; i <= vnMenuCnt; i++) {
