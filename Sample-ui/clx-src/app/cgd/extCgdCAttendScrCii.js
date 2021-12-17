//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCgdCAttendScrCii.xtm"/>

/**
 * 출석기준관리
 * @class extCgdCAttendScrCii
 * @author 박갑수 at 2016. 6. 1
 */
var extCgdCAttendScrCii = function() {
	var moPage = new Page();
	
	/**
	 * @desc import 헤더 초기화
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 6. 1
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		// import 헤더 초기화
		doHeaderOnLoad();
	};
	
	/**
	 * @desc onLoad 실행
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 6. 1
	 */
	moPage.onModelConstructDone_ExtCgdCAttendScrCii = function() {
		
		// 리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["rptExtCgdAttendScr"]);
		// 검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grpData"]);
		
		util.Header.clickSearch(app);
	};
	
	/**
	 * @desc [btnSearch]조회 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 6. 1
	 */
	moPage.onClick_BtnSearch = function() {
		 // 작업영역 리피트 변경 내역 체크
		if(util.Grid.isModified(app, "", "CRM")){
			return false;
		}

		// 조회
		doList(function(pbSuccess) {
			// 조회 : "조회되었습니다." header 메세지 표시
			if (pbSuccess) util.Msg.notify(app, "NLS.INF.M024");
		});
	};
	
	/**
	 * @desc  결석시수 조회
	 * @param {Function} poCallBackFunc 콜백정의
	 * @return void
	 * @author 박갑수 at 2016. 3. 16
	 */
	function doList(poCallBackFunc) {

		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdExtCgdAttendScr");	
				// 조회 후 콜백함수 수행
				if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess); 
			}
		});
	};
	
	/**
	 * @desc [rhCkbSelect]패널 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 6. 1
	 */
	moPage.onValueChanged_RhCkbSelect = function() {
		// 리피트 패널 설정
//TO-BE: <ExtRepeat.selectedAllPanel> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.selectedAllPanel("rhCkbSelect");
	};
	
	/**
	 * @desc [btnNew]신규 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 6. 1
	 */
	moPage.onClick_BtnNew = function() {
		// 해당 리피트 insert 후 편집 시작할 컬럼 지정
		var vnIdx = util.Grid.insertRow(app, "grdExtCgdAttendScr", "rdIpbWeekTc");
	};
	
	/**
	 * @desc [btnDel]삭제 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 6. 1
	 */
	moPage.onClick_BtnDel = function() {
		// 해당 리피트 delete
		util.Grid.deleteRow(app, "grdExtCgdAttendScr");
	};
	
	/**
	 * @desc [btnRestore]작업취소 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 6. 1
	 */
	moPage.onClick_BtnRestore = function() {
		// 해당 리피트 상태 초기화
		util.Grid.restoreRow(app, "grdExtCgdAttendScr");
	};
	
	/**
	 * @desc [btnSave]작업저장 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 6. 1
	 */
	moPage.onClick_BtnSave = function() {
		// 작업저장
		doSave();
	};
	
	/**
	 * @desc 결석시수 변경사항 저장
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 6. 1
	 */
	function doSave() {
		
		// 리피트 변경사항 체크
		if(!util.Grid.isModified(app, ["grdExtCgdAttendScr"], "MSG")){
			return false;
		}
		
		// 리피트 Validation Check
		if(!util.validate(app, "grdExtCgdAttendScr")) return false;

		//strCommand: save 
		util.Submit.send(app, "subSave", function(pbSuccess){
			if(pbSuccess){
				doList(function(pbListSuccess) {
					// 조회 : "갱신된 데이터가 조회되었습니다." header 메세지 표시
					if (pbListSuccess) util.Msg.notify(app, "NLS.INF.M025");
				});
			}
		});
	};
	
	/**
	 * @desc [rdIpbWeekTc]주당시간수 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 6. 1
	 */
	moPage.onValueChanged_RdIpbWeekTc = function() {
		ValidUtil.checkIntegerDecimal("rdIpbWeekTc", 3, 0, true);
	};
	
	/**
	 * @desc [rdIpbAbnTc]결석시간수 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 6. 1
	 */
	moPage.onValueChanged_RdIpbAbnTc = function() {
		ValidUtil.checkIntegerDecimal("rdIpbAbnTc", 3, 0, true);
	};
	
	/**
	 * @desc [rdIpbAllotPoint]배점 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 6. 1
	 */
	moPage.onValueChanged_RdIpbAllotPoint = function() {
		ValidUtil.checkIntegerDecimal("rdIpbAllotPoint", 3, 0, true);
	};
	return moPage;
};
