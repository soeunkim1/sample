
//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./stdCcsCRsltType.xtm"/>


var stdCcsCRsltType = function() {
		
	
	var moPage = new Page();
	var moPObject = new PObject();
	
			
			
	
	
	/**
	 * @desc  Header Import onLoad
	 * @return void
	 * @author 최영경 2016-01-18
	 */
	moPage.onLoadImportDone_ImpTitle = function() {		
		
		doHeaderOnLoad();
		
	};
	
	
	
	
	/**
	 * @desc 온로드 실행
	 * @param 
	 * @return 
	 * @author 최영경 2016-01-18
	 */
	function doOnLoad() {
		
		//리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init("rptMain");
		//검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grpData"]);
		
		
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				
				util.Control.redraw(app, ["cbbTypeRcd"]);
				util.SelectCtl.selectItem(app, "cbbTypeRcd", 0);
				
			}
		}, true);
		
	};
	
	
	
	
	/**
	 * @desc 조회 실행
	 * @param 
	 * @return 
	 * @author 최영경 2016-01-18
	 */
	moPage.onClick_BtnSearch = function() {
		
		 //작업영역 리피트 변경 내역 체크
		if(util.Grid.isModified(app, "", "CRM")){
			return false;
		}		
		
		doList(function(pbSuccess) {
			// 조회 : "조회되었습니다." header 메세지 표시
			if (pbSuccess) util.Msg.notify(app, "NLS.INF.M024");
		});		
	
	};
	
	
	
	
	/**
	 * @desc  강의평가유형목록 조회한다.
	 * @param {Function} poCallBackFunc 콜백정의
	 * @return void
	 * @author 최영경 2016-01-18
	 */
	function doList(poCallBackFunc) {
		
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdMain");	
				// 조회 후 콜백함수 수행
				if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess); 
			}
		}); 
	}
	
	
	/**
	 * @desc 강의평가유형목록 리피트 panel click event
	 *			 강의평가유형목록 리피트 row all check
	 * @return void
	 * @author 최영경 2016-01-18
	 */	
	moPage.onValueChanged_RhCkbSelect = function() {
//TO-BE: <ExtRepeat.selectedAllPanel> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.selectedAllPanel("rhCkbSelect");
	};
	
	
	
	
	/**
	 * @desc 신규 click event
	 *            강의평가유형목록 리피트 row 추가
	 * @return void
	 * @author 최영경 2016-01-18
	 */		
	moPage.onClick_BtnNew = function() {
		
		//해당 리피트 insertRow 후 편집 시작할 컬럼 지정		
		var voNewRow = util.Grid.insertRow(app, "grdMain", "rdIpbSerialNo");		
		
		var vsAnsTypeRcd 	= util.DataMap.getValue(app, "dmReqList", "strAnsTypeRcd");
		var vsLanDivRcdList 	=	 util.DataMap.getValue(app, "dmResOnLoad", "strLanDivRcd");
		
		util.Grid.setCellValue(app, "grdMain"	, "ANS_TYPE_RCD"	, vsAnsTypeRcd		, voNewRow, false, true);
		util.Grid.setCellValue(app, "grdMain"	, "LAN_DIV_RCD"		, vsLanDivRcdList		, voNewRow, false, false);
		
	};
	
	
	
	/**
	 * @desc 삭제 click event
	 *            강의평가유형목록 리피트 index row 삭제 status 변경
	 * @return void
	 * @author 최영경 2016-01-18
	 */	
	moPage.onClick_BtnDel = function() {
		util.Grid.deleteRow(app, "grdMain");
	};
	
	/**
	 * @desc 작업취소 click event
	 *            강의평가유형목록 리피트 index row restore
	 * @return void
	 * @author 최영경 2016-01-18
	 */	
	moPage.onClick_BtnRestore = function() {
		util.Grid.restoreRow(app, "grdMain");
	};
	
	/**
	 * @desc 작업저장 click event
	 *            강의평가유형목록  리피트 변경내역 저장
	 * @return void
	 * @author 최영경 2016-01-18
	 */	
	moPage.onClick_BtnSave = function() {
		doSave();
		
	};
	
	
	/**
	 * @desc  강의평가유형목록  리피트 저장 submission 실행
	 * @return void
	 * @author 최영경 2016-01-18
	 */
	function doSave() {
		
		// 리피터 변경사항 체크
		if(!util.Grid.isModified(app, ["grdMain"], "MSG")){
			return false;
		}
		
		//리피트 validation check
		if(!util.validate(app, "grdMain")) return false;
		
		//strCommand: save 
		util.Submit.send(app, "subSave", function(pbSuccess){
			
			if(pbSuccess){
				page.doList(function(pbListSuccess) {
					// 조회 : "갱신된 데이터가 조회되었습니다." header 메세지 표시
					if (pbListSuccess) util.Msg.notify(app, "NLS.INF.M025");
				});
			}
		});
	}
	
	
	
	
	/**
	 * @desc  답변점수 음수입력을 하지 못하도록 한다.
	 * @return void
	 * @author 최영경 2016-01-18
	 */
	moPage.onValueChanged_RdIpbAnsScr = function() {
		
		ValidUtil.checkIntegerDecimal("rdIpbAnsScr", 3, 0, true);
		
	};
	return moPage;
};

