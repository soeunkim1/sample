//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./stdCmnSOzChartTemplate.xtm"/>


var stdCmnSOzChartTemplate = function() {
	var moPage = new Page();
	/**
	 * 헤더 초기화
	 * @member moPage
	 * @type void
	 * @author hyunteak at 16. 3. 4 오후 1:02
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		doHeaderOnLoad();
	}
	/**
	 * 화면 초기화
	 * @member moPage
	 * @type void
	 * @author hyunteak at 16. 3. 4 오후 1:02
	 */
	moPage.onModelConstructDone_StdCmnSOzChartTemplate = function() {
		//온로드
		doOnLoad();
	};
	/**
	 * 온로드
	 * @member moPage
	 * @type void
	 * @author hyunteak at 16. 3. 4 오후 1:02
	 */
	function doOnLoad() {
		
		//검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grp_rptCmnChartTmpReg"]);
		
	}
	/**
	 * 조회버튼 클릭이벤트 
	 * @member moPage
	 * @type void
	 * @author hyunteak at 16. 3. 4 오후 1:03
	 */
	moPage.onClick_BtnSearch = function() {
		//odi 파라미터
		var voParam = {};
		//기본 파라미터		
		 var voOzFormParam = {
				  TITLE : "토마토대학교 차세대 통합정보시스템 구축" //리포트타이틀
				, SUB_TITLE : "오즈차트" //리포트서브타이틀		
				, FORM_TYPE : "flash"
			};	
		//레포트 호출		
		util.Report.open(app, "hojReport", "stdCmnSChartTmpReg", voOzFormParam, voParam);
	}

	return moPage;
};
