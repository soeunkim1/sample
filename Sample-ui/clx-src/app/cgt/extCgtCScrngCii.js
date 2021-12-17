
//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCgtCScrngCii.xtm"/>


var extCgtCScrngCii = function() {
		
	var moPage = new Page();
	
	/**
	 * @desc  Header Import onLoad
	 * @return void
	 * @author Aeyoung Lee 2016-07-04
	 */
	moPage.onLoadImportDone_ImpTitle = function() {		
		doHeaderOnLoad();
	};
	
	/**
	 * @desc 온로드 실행
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-07-04
	 */
	moPage.onModelConstructDone_ExtCgtCScrngCii = function() {
		//리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init("rptScrngCii");
		//검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grpData"]);
		
		doOnLoad();	
	};

	/**
	 * @desc 온로드 실행
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016-07-04
	 */
	function doOnLoad(){
		
		// 서브미션 실행 (실패시 cover page)
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				// 학위구분, 학제구분, 입학학년도 콤보 리스트 구성
				util.Control.redraw(app, ["cbbDgrCrsDivRcd", "cbbAssDivRcd", "cbbEnterSchYearRcd"]);
				util.SelectCtl.selectItem(app, "cbbDgrCrsDivRcd", 0);
				util.SelectCtl.selectItem(app, "cbbAssDivRcd", 0);
				
				// 입학학년도에 졸업학년도 설정
				util.Control.setValue(app, "cbbEnterSchYearRcd", util.DataMap.getValue(app, "dmResOnLoad", "strCgtSchYearRcd"));
				
				util.Control.redraw(app, "grdScrngCii");
			}
		}, true);
	};
	
	/**
	 * @desc 조회 실행
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-07-04
	 */
	moPage.onClick_BtnSearch = function() {
		//작업영역 리피트 변경 내역 체크
		if(util.Grid.isModified(app, "", "CRM")){
			return false;
		}	
		
		if(!util.validate(app, ["grpSearch"])){
			return false;
		}
		
		doList(function(pbSuccess){
			if(pbSuccess) util.Msg.notify(app, "NLS.INF.M024");
		});	
	};
	
	/**
	 * @desc  졸업사정기준 목록을 조회한다.
	 * @param {Function} poCallBackFunc 콜백정의
	 * @return void
	 * @author Aeyoung Lee 2016-07-04
	 */
	function doList(poCallBackFunc) {
		
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdScrngCii");	
				
				if(util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
			}
		}); 
	};
	
	/**
	 * @desc 신규 click event
	 * @return void
	 * @author Aeyoung Lee 2016-07-04
	 */		
	moPage.onClick_BtnNew = function() {
		//해당 리피트 insertRow 후 편집 시작할 컬럼 지정		
		var voNewRow = util.Grid.insertRow(app, "grdScrngCii", "rdCbbCiiDivRcd");	
		
		var vsDgrCrsDivRcd = util.DataMap.getValue(app, "dmReqKey", "strDgrCrsDivRcd");
		var vsAssDivRcd	   = util.DataMap.getValue(app, "dmReqKey", "strAssDivRcd");
		var vsKeyDt	       = util.DataMap.getValue(app, "dmResList", "strKeyDt").substring(0,8);
		
		util.Grid.setCellValue(app, "grdScrngCii", "DGR_CRS_DIV_RCD", vsDgrCrsDivRcd, voNewRow);
		util.Grid.setCellValue(app, "grdScrngCii", "ASS_DIV_RCD"    , vsAssDivRcd   , voNewRow);
		util.Grid.setCellValue(app, "grdScrngCii", "DGR_CRS_DIV_RCD_1", vsDgrCrsDivRcd, voNewRow);
		util.Grid.setCellValue(app, "grdScrngCii", "ASS_DIV_RCD_1"    , vsAssDivRcd   , voNewRow);
		util.Grid.setCellValue(app, "grdScrngCii", "ST_DT" 	       , vsKeyDt  	   , voNewRow);
		util.Grid.setCellValue(app, "grdScrngCii", "END_DT"  	   , "99991231"    , voNewRow);
	};
	
	/**
	 * @desc 삭제 click event
	 * @return void
	 * @author Aeyoung Lee 2016-07-04
	 */	
	moPage.onClick_BtnDel = function() {
		util.Grid.deleteRow(app, "grdScrngCii");
	};
	
	/**
	 * @desc 작업취소 click event
	 * @return void
	 * @author Aeyoung Lee 2016-07-04
	 */	
	moPage.onClick_BtnRestore = function() {
		util.Grid.restoreRow(app, "grdScrngCii");
	};
	
	/**
	 * @desc 작업저장 click event
	 * @return void
	 * @author Aeyoung Lee 2016-07-04
	 */	
	moPage.onClick_BtnSave = function() {
		// 리피터 변경사항 체크
		if(!util.Grid.isModified(app, ["grdScrngCii"], "MSG")){
			return false;
		}
		
		//리피트 validation check
		if(!util.validate(app, "grdScrngCii")) return false;
		
		//strCommand: save 
		util.Submit.send(app, "subSave", function(pbSuccess){
			if(pbSuccess){
				doList(function(pbListSuccess){
					if(pbListSuccess) util.Msg.notify(app, "NLS.INF.M025");
				});
			}
		});
		
	};
		
	/**
	 * @desc   리피트 패널 체크
	 * @return void
	 * @author Aeyoung Lee 2016-07-04
	 */	
	moPage.onValueChanged_RhCkbSelect = function() {
		// 리피트 패널 설정
//TO-BE: <ExtRepeat.selectedAllPanel> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.selectedAllPanel("rhCkbSelect");
	};
	
	return moPage;
};

