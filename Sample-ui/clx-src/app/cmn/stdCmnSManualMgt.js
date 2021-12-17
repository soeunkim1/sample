//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./stdCmnSManualMgt.xtm"/>


var stdCmnSManualMgt = function() {
	var moPage = new Page();
	
	moPage.onLoadImportDone_ImpTitle = function() {
		doHeaderOnLoad();
	}
	
	
	/**
	 * @desc 조회버튼 클릭
	 * @param 
	 * @return void
	 * @author Kim jung Geun 2016. 6. 10
	 */
	moPage.onClick_BtnSearch = function() {

		doList();
	};
	
	/**
	 * @desc  온라인매뉴얼 출력
	 * @param 
	 * @return 
	 * @author Kim jung Geun 2016. 6. 10
	 */
	function doList(poCallBackFunc) {

		
		//1.조회조건 필수 체크(학년도)
		if(!util.validate(app, ["cbbUnitSystemRcd"])) return false;

		//리퀘스트 셋팅
		var voParam = {
					p_strUnitSystemRcd             : util.DataMap.getValue(app, "dmReqList", "strSystemRcd")
				,	p_strMenuId         : util.DataMap.getValue(app, "dmReqList", "strPgmIdNm")
				,  p_strDomain              : Common.getMainWindowUrl()
		};	
		
		var voOzFormParam = {
				  TITLE : "토마토대학교 차세대 통합정보시스템 구축" //리포트타이틀
				, SUB_TITLE :  util.SelectCtl.getLabel(app, "cbbUnitSystemRcd",util.SelectCtl.getSelectedIndex(app, "cbbUnitSystemRcd"))//리포트서브타이틀		
				, FORM_TYPE : "flash"
		};	
						
		util.Report.open(app, "hojReport", "stdCmnSManualMgt", voOzFormParam, voParam);
	}
	
	
	/**
	 * 온로드
	 * @member moPage
	 * @type void
	 * @author Kim jung Geun 2016. 6. 10
	 */
	function doOnLoad(){
		//검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox( "grpSearch","grp_rptExtCetListPrt");

		//서브미션 실행 (실패시 cover page)
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
    
		if(pbSuccess)
		{	
				util.Control.redraw(app, ["cbbUnitSystemRcd"]);
				util.SelectCtl.selectItem(app, "cbbUnitSystemRcd", 0); // 시스템구분 첫번째 셋팅
				util.Control.setFocus(app, "ipbMenuId"); // 메뉴ID명 setFocus
		}
	}, true);
	}
	
	/* 온로드 */								
	moPage.onModelConstructDone_StdCmnSManualMgt = function() {
		doOnLoad();
	};
	return moPage;
};
