//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCssSScalByScalFeeClsList.xtm"/>

/**
 * 장학분류별장학내역조회
 * @class extCssSScalByScalFeeClsList
 * @author Aeyoung Lee 2016.12.07
 */
var extCssSScalByScalFeeClsList = function() {
	var moPage = new Page();
	var moPObject 	= new PObject();
	
	/**
	 * @desc import 헤더 초기화
	 * @param 
	 * @return  void
	 * @author Aeyoung Lee 2016.12.07
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		// import 헤더 초기화
		doHeaderOnLoad();
	};
	
	/**
	 * @desc import 조회조건 초기화
	 * @param 
	 * @return  void
	 * @author Aeyoung Lee 2016.12.07
	 */
	moPage.onLoadImportDone_ImpCssScalCollSch = function() {
		onLoadCollImp(false);
	};
	
	/**
	 * @desc OnLoad 이벤트
	 * @param 
	 * @return  void
	 * @author Aeyoung Lee 2016.12.07
	 */
	function doOnLoad() {
		// 리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["rptScalStud"]);
		// 검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grpData"]);
		
		util.Control.redraw(app, ["grdScalStud"]);
				
		util.Control.setFocus(app, "ipbDeptNmImp");
	};
	
	/**
	 * @desc 조회 onClick 이벤트
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016.12.07
	 */
	moPage.onClick_BtnSearch = function() {
		 // 작업영역 리피트 변경 내역 체크
		if(util.Grid.isModified(app, "", "CRM")){
			return false;
		}
		
		// 조회조건 필수 체크
		if(!util.validate(app, ["grpSearch"])){
			return false;
		}
		
		// 조회
		doList(function(pbSuccess) {
			if (pbSuccess){
				// "조회되었습니다."
				util.Msg.notify(app, "NLS.INF.M024");					
			}
		});
	};
	
	/**
	 * @desc 장학생목록 조회
	 * @param poCallBackFunc 콜백정의
	 * @return void
	 * @author Aeyoung Lee 2016.12.07
	 */
	function doList(poCallBackFunc) {
		
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdScalStud");
			} 
			
			// 조회 후 콜백함수 수행
			if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
		});
	};

	return moPage;
};
