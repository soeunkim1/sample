//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./stdCcsCOpenSubSearch.xtm"/>

/**
 * 개설과목이관
 * @class stdCcsCOpenSubSearch
 * @author 최영경 at 2016. 1. 20
 */
var stdCcsCOpenSubSearch = function() {
	var moPage = new Page();
	// 임포트용 데이터 통신 오브젝트
	var moPObject = new Page();
	
	
	/**
	 * @desc import 헤더 초기화
	 * @param 
	 * @return  void
	 * @author 최영경 at 2016. 1. 20
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		// import 헤더 초기화
		doHeaderOnLoad();
	};
	
	/**
	 * @desc onLoad 실행
	               온로드에서 조회를 해서 가져온다.
	 * @param 
	 * @return void
	 * @author 최영경 at 2016. 1. 20
	 */
	moPage.onModelConstructDone_StdCcsCWeek = function() {
		
		// 리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["rptMain"]);
		// 검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grpData"]);
		
		// 서브미션 호출
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				util.Control.setEnable(app, true, ["grpData"]);
				util.Control.redraw(app, ["cbbSchYearRcd", "cbbSmtRcd"]);
				util.Control.redraw(app, "grdMain");	
				
			}
		}, true);
	};
	
	/**
	 * @desc [cbbSchYearRcd]학년도 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 1. 20
	 */
	moPage.onValueChanged_CbbSchYearRcd = function() {
		// 학년도 학기에 해당하는 일자 가져오기
		// 학년도 학기에 해당하는 일자 가져오기
		page.doGetDateMain(function(pbSuccess){
			if(pbSuccess){
				page.doList();
			}
		});
	};
	
	/**
	 * @desc [cbbSmtRcd]학기 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 1. 20
	 */
	moPage.onValueChanged_CbbSmtRcd = function() {
		// 학년도 학기에 해당하는 일자 가져오기
		page.doGetDateMain(function(pbSuccess){
			if(pbSuccess){
				page.doList();
			}
		});
	};
	
	/**
	 * @desc 학년도, 학기의 표준학기 일자를 가져온다.
	 * @param poCallBackFunc 콜백정의
	 * @return void
	 * @author 박갑수 at 2016. 1. 20
	 */
	function doGetDateMain(poCallbackFunc) {
		
				
		//strCommand: date 
		util.Submit.send(app, "subDateMainStdCmnDateTime", function(pbSuccess){
			
			
			if (util.isFunc(poCallbackFunc)) poCallbackFunc(pbSuccess); 			
			
			
		});
	};
	
	
	
	/**
	 * @desc 개설과목 조회
	 * @param poCallBackFunc 콜백정의
	 * @return void
	 * @author 박갑수 at 2016. 1. 20
	 */
	function doList(poCallBackFunc) {
		
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				util.Control.setEnable(app, true, ["grpData"]);
				util.Control.redraw(app, "grdMain");	
				// 조회 후 콜백함수 수행
				if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess); 
			}
		});
	};
	
	
	
	
	/**
	 * @desc 개설과목 생성 버튼 이벤트
					1. 개설과목을 생성한다.
					2. 재조회를 한다.
	 * @param poCallBackFunc 콜백정의
	 * @return void
	 * @author 박갑수 at 2016. 1. 20
	 */
	moPage.onClick_btnInsert = function(e /*:eXria.event.Event*/) {
		
		// 기존 전체 데이터를 삭제하고 다시 생성합니다. 생성하시겠습니까?		
		if (!util.Msg.confirm("NLS-CRM-M037")  ) {
			return false;
		}
		
		if(doInsert(function(pbSuccess){
			if(pbSuccess){
				
				page.doList(function(pbSuccess){
					if(pbSuccess){						
						vsCountInsert = util.DataMap.getValue(app, "dmResList", "countInsert");
						//@1건 생성하였습니다.
						util.Msg.alert("NLS-INF-M043", [vsCountInsert]);
					}
				});
				
			}
		}));
		
	};
	
	
	/**
	 * @desc 개설과목을 생성한다.
	 * @param poCallBackFunc 콜백정의
	 * @return void
	 * @author 박갑수 at 2016. 1. 20
	 */
	function doInsert(poCallbackFunc) {	
		
		
		//strCommand: doInsert 
		util.Submit.send(app, "subDoInsert", function(pbSuccess){
			if(pbSuccess){				
				// 조회 후 콜백함수 수행
				if (util.isFunc(poCallbackFunc)) poCallbackFunc(pbSuccess); 
			}
		});
		
		
		
	};
	
	
	
	/**
	 * @desc 개설과목 삭제 이벤트
				1. 개설과목을 삭제 처리한다.
				2. 개설과목을 재조회 한다.
	 * @param poCallBackFunc 콜백정의
	 * @return void
	 * @author 박갑수 at 2016. 1. 20
	 */
	moPage.onClick_btnDel = function(e /*:eXria.event.Event*/) {
		
		// 테이블의 전체 데이터가 삭제됩니다. 삭제하시겠습니까?
		if (!util.Msg.confirm("NLS-CRM-M038")  ) {
			return;
		}
		
		
		if(page.doDelete(function(pbSuccess){
			if(pbSuccess){
				
				page.doList(function(pbSuccess){
					if(pbSuccess){
						
						vsCountDelete = util.DataMap.getValue(app, "dmResList", "countDelete");
						// @1건 삭제하였습니다.						
						util.Msg.alert("NLS-INF-M044", [vsCountDelete]);
					}
				});
				
			}
		}));
		
	};
	
	
	
	/**
	 * 개설과목이관 삭제
	 */
	function doDelete(poCallbackFunc) {		
		
		//strCommand: doDelete 
		util.Submit.send(app, "subDoDelete", function(pbSuccess){
			if(pbSuccess){				
				// 조회 후 콜백함수 수행
				if (util.isFunc(poCallbackFunc)) poCallbackFunc(pbSuccess); 
			}
		});
		
	};
	
	
	
	
	
	return moPage;
};
