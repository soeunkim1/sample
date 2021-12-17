//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCssSScalTransListPrt.xtm"/>


var extCssSScalTransListPrt = function() {
	var moPage = new Page();
	
	/**
	 * @desc Header Import onLoad
	 * @return void
	 * @author Aeyoung Lee at 2016. 9. 2.
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		doHeaderOnLoad();
	};
	
	/**
	 * @desc 온로드
	 * @return void
	 * @author Aeyoung Lee at 2016. 9. 2.
	 */
	moPage.onModelConstructDone_ExtCssSScalTransListPrt = function() {
		//검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch",["grpData"]);
		
		// 서브미션 실행 (실패시 cover page)
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				util.Control.setValue(app, "dipKeyDt", util.DataMap.getValue(app, "dmResOnload", "strKeyEndDt").substring(0,8));
			}
		});
	};
	
	/**
	 * 조회조건 수행
	 * @member moPage
	 * @type void
	 * @author Aeyoung Lee at 2016. 9. 2.
	 */
	moPage.onClick_BtnSearch = function() {
		//1.조회조건 필수 체크
		if(!util.validate(app, ["dipKeyDt"])){
			return false;
		}	
		
		doList();
	};
	
	/**
	 * @desc 조회조건 수행
	 * @param
	 * @@return 
	 * @author Aeyoung Lee at 2016. 9. 2.
	 */
	function doList(poCallBackFunc) {
		
		//리퀘스트 셋팅
		var voParam = {
					p_strKeyDate : util.DataMap.getValue(app, "dmReqKey", "strKeyDate") 			// 기준일자
				  , p_strTransExptYn : util.DataMap.getValue(app, "dmReqKey", "strTransExptYn") 	// 이월처리제외여부
				  , p_strLanDivRcd : msDefaultLocale
				}	
				
		var voOzFormParam = {
					  TITLE : "장학금이월자명단" //리포트타이틀
					, SUB_TITLE : "" 		//리포트서브타이틀		
					, FORM_TYPE : "flash"
					};	
					
		util.Report.open(app, "hojReport", "extCssSScalTransListPrt", voOzFormParam, voParam);
			
	}
		
	return moPage;
};
