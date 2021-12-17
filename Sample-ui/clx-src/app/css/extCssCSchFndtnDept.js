
//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCssCSchFndtnDept.xtm"/>


var extCssCSchFndtnDept = function() {
		
	var moPage = new Page();
	var moPObject = new PObject();
	
	/* 
	 * 객체 검색팝업 관련 설정사항
	 */
	moPObject.moIdsForStdCmnPObjSch = [
	{
		controlId 	: "btnDeptNmPop",
		iCd 		: "",
		iNm 		: "ipbDeptNm",
		iObjDivRcd 	: ["CC009OG","CC009SA"],
		iLanDivRcd 	: "",
		iKeyDate 	: "",
		oObjDivRcd 	: "ipbObjDivRcd",
		oCd 		: "ipbDeptCd",
		oCdNm 		: "ipbDeptNm",
		oStDt 		: "",
		oEndDt 		: "",
		oLanDivRcd 	: "",
		func 		: ""
	},
	{
		controlId 	: "rdBtnDeptNmPop",
		iCd 		: "",
		iNm 		: "rdIpbDeptNm",
		iObjDivRcd 	: ["CC009SA"],
		iLanDivRcd 	: "",
		iKeyDate 	: "",
		oObjDivRcd 	: "rdIpbObjDivRcd",
		oCd 		: "rdOptDeptCd",
		oCdNm 		: "rdIpbDeptNm",
		oStDt 		: "",
		oEndDt 		: "",
		oLanDivRcd 	: "",
		func 		: ""
	}
	];
	
	/**
	 * @desc  Header Import onLoad
	 * @return void
	 * @author Aeyoung Lee 2016-04-12
	 */
	moPage.onLoadImportDone_ImpTitle = function() {		
		doHeaderOnLoad();
	};
	
	/**
	 * @desc 온로드 실행
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-04-12
	 */
	moPage.onModelConstructDone_ExtCssCSchFndtnDept = function() {
		//리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init("rptSchFndtnDept");
		//검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grpData"]);
		
		doOnLoad();	
	};

	/**
	 * @desc 온로드 실행
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016-04-12
	 */
	function doOnLoad(){
		
		// 서브미션 실행 (실패시 cover page)
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdSchFndtnDept");
				
				var vsEndDt = util.DataMap.getValue(app, "dmDate", "END_DT").substr(0,8);
				
				// 2016.11.30 현재시점에 미래신설과의 매핑정보를 입력해야하기 때문에 현재 살아있는 학과를 대상으로 하기 위해 날짜를 '99991231'로 변경
				moPObject.moIdsForStdCmnPObjSch[0].iKeyDate = "99991231";
				moPObject.moIdsForStdCmnPObjSch[1].iKeyDate = "99991231";
			}
		}, true);
	};
	
	/**
	 * @desc 소속명 변경 이벤트
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-04-12
	 */
	moPage.onValueChanged_IpbDeptNm = function(sender) {
		doOnChangeStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc 소속 팝업 클릭 이벤트
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-04-12
	 */
	moPage.onClick_BtnDeptNmPop = function(sender) {
		doOnClickStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc 조회 실행
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-04-12
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
	 * @desc  장학재단학과코드 목록을 조회한다.
	 * @param {Function} poCallBackFunc 콜백정의
	 * @return void
	 * @author Aeyoung Lee 2016-04-12
	 */
	function doList(poCallBackFunc) {
		
		util.DataMap.setValue(app, "dmReqKey", "strKeyDate", util.DataMap.getValue(app, "dmDate", "END_DT"));
		
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdSchFndtnDept");	
				
				if(util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
			}
		}); 
	};
	
	/**
	 * @desc 신규 click event
	 * @return void
	 * @author Aeyoung Lee 2016-04-12
	 */		
	moPage.onClick_BtnNew = function() {
		//해당 리피트 insertRow 후 편집 시작할 컬럼 지정		
		var voNewRow = util.Grid.insertRow(app, "grdSchFndtnDept", "rdIpbDeptNm");	
		
		var vsDeptCd	= util.DataMap.getValue(app, "dmReqKey", "strDeptCd");
		var vsDeptNm	= util.DataMap.getValue(app, "dmReqKey", "strDeptNm");
		var vsObjDivRcd = util.DataMap.getValue(app, "dmReqKey", "strObjDivRcd");
		
		if(vsObjDivRcd == "CC009SA"){
			util.Grid.setCellValue(app, "grdSchFndtnDept", "DEPT_CD"    , vsDeptCd, voNewRow);
			util.Grid.setCellValue(app, "grdSchFndtnDept", "DEPT_NM"    , vsDeptNm, voNewRow);
		}	
		
		util.Grid.setCellValue(app, "grdSchFndtnDept", "OBJ_DIV_RCD", "CC009SA", voNewRow);		
	};
	
	/**
	 * @desc 삭제 click event
	 * @return void
	 * @author Aeyoung Lee 2016-04-12
	 */	
	moPage.onClick_BtnDel = function() {
		util.Grid.deleteRow(app, "grdSchFndtnDept");
	};
	
	/**
	 * @desc 작업취소 click event
	 * @return void
	 * @author Aeyoung Lee 2016-04-12
	 */	
	moPage.onClick_BtnRestore = function() {
		util.Grid.restoreRow(app, "grdSchFndtnDept");
	};
	
	/**
	 * @desc 작업저장 click event
	 * @return void
	 * @author Aeyoung Lee 2016-04-12
	 */	
	moPage.onClick_BtnSave = function() {
		// 리피터 변경사항 체크
		if(!util.Grid.isModified(app, ["grdSchFndtnDept"], "MSG")){
			return false;
		}
		
		//리피트 validation check
		if(!util.validate(app, "grdSchFndtnDept")) return false;
		
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
	 * @desc   리피트 부서명 변경 이벤트
	 * @return void
	 * @author Aeyoung Lee 2016-04-12
	 */
	moPage.onValueChanged_RptSchFndtnDept = function(psDiv, sender) {
		// 부서명
		if(psDiv == "DEPT_NM"){
			doOnChangeStdCmnPObjSch(sender);
		}	
	};
	
	
	/**
	 * @desc 리피트 학과 팝업 클릭 이벤트
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-04-12
	 */
	moPage.onClick_RdBtnDeptNmPop = function(sender) {
		doOnClickStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc   리피트 패널 체크
	 * @return void
	 * @author Aeyoung Lee 2016-04-12
	 */	
	moPage.onValueChanged_RhCkbSelect = function() {
		// 리피트 패널 설정
//TO-BE: <ExtRepeat.selectedAllPanel> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.selectedAllPanel("rhCkbSelect");
	};
	
	/**
	 * @desc   리피트 row select  이벤트
	 * @return void
	 * @author Aeyoung Lee 2016-04-12
	 */	
	moPage.onRowSelect_RptDptMjAlotNop = function() {
//TO-BE: <ExtControl.refreshBind> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtControl.refreshBind("binRoPkColum");
	};
	
	return moPage;
};

