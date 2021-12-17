
//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCgtCGrdtTgtMng.xtm"/>


var extCgtCGrdtTgtMng = function() {
		
	var moPage = new Page();
	var moPObject = new PObject();
	
	/* 
	 * 객체 검색팝업 관련 설정사항
	 */
	moPObject.moIdsForStdCmnPObjSch = [
	{
		controlId 	: "btnSaNmPop",
		iCd 		: "",
		iNm 		: "ipbSaNm",
		iObjDivRcd 	: ["CC009SA"],
		iLanDivRcd 	: "",
		iKeyDate 	: "/root/resOnLoad/strKeyDate",
		oObjDivRcd 	: "ipbObjDivRcd",
		oCd 		: "ipbSaCd",
		oCdNm 		: "ipbSaNm",
		oStDt 		: "",
		oEndDt 		: "",
		oLanDivRcd 	: "",
		func : "" 
	}
	];
	
	/* 
	 * 학생 검색팝업 관련 설정사항
	 */
	moPObject.moIdsForStdCsrPStSearch = [
	{
		controlId     	: "rdBtnStudNo",
		iStudNo       	: "rdIpbStudNo",
		iStudId       	: "",
		iStudNm       	: "",
		iKeyDate	  	: "/root/resOnLoad/strKeyDate",
		iObjDivRcd 		: "",
		iObjCd     	  	: "",
		iObjNm 			: "",
		iAuthYN		  	: "",
		oStudId       	: "rdIpbStudId",
		oStudNo       	: "rdIpbStudNo",
		oStudNm       	: "rdOptRepNm",
		oSsn          	: "",
		oStatNm 	  	: "",
		oStatRcd	  	: "",
		oProcRslt	  	: "",
		oProcRsltYear	: "rdOptProcRsltYear",
		oSaCd         	: "",
		oSaNm         	: "rdOptSaNm",					
		oSpCd         	: "",
		oSpNm         	: "",
		oOgCd 		  	: "",
		oOgNm 		  	: "",
		func : function(poParam) {
			doStSearch(poParam);
		}
	}
	];
	
	/**
	 * @desc  Header Import onLoad
	 * @return void
	 * @author Aeyoung Lee 2016-07-06
	 */
	moPage.onLoadImportDone_ImpTitle = function() {		
		doHeaderOnLoad();
	};
	
	/**
	 * @desc 온로드 실행
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-07-06
	 */
	moPage.onModelConstructDone_extCgtCGrdtTgtMng = function() {
		//리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init("rptGrdtTgt");
		//검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grpData"]);
		
		doOnLoad();
	};
	
	/**
	 * @desc 온로드 실행
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016-07-06
	 */
	function doOnLoad(){
		// 서브미션 실행 (실패시 cover page)
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				// 졸업학년도 학기를 기본 설정
				util.Control.redraw(app, ["cbbSchYear","cbbSmt"]);
				util.Control.setValue(app, "cbbSchYear", util.DataMap.getValue(app, "dmResOnLoad", "strDefSchYearRcd"));
				util.Control.setValue(app, "cbbSmt", util.DataMap.getValue(app, "dmResOnLoad", "strDefSmtRcd"));
				
				util.Control.redraw(app, "grdGrdtTgt");
			}
		}, true);
	};
	
	/**
	 * @desc 학년도 콤보 체인지 이벤트
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-07-06
	 */
	moPage.onValueChanged_CbbSchYear = function() {
		doChangeDate();
	};
	
	/**
	 * @desc 학기 콤보 체인지 이벤트
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-07-06
	 */
	moPage.onValueChanged_CbbSmt = function() {
		doChangeDate();
	};
	
	/**
	 * @desc 학년도학기 변경 이벤트 - 기준 시작일자, 종료일자 셋팅
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-07-06
	 */
	function doChangeDate() {
		util.DataMap.setValue(app, "dmResOnLoad", "strKeyDate", "");
		
		//strCommand: getKeyDate 
		util.Submit.send(app, "subDate", function(){
			// 2017.01.09 소속정보 클리어 주석처리 
			// ExtControl.reset(["ipbSaNm","ipbSaCd","ipbObjDivRcd"]);	
		}); 
	};
		
	/**
	 * @desc 학사부서명 변경 이벤트
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-07-06
	 */
	moPage.onValueChanged_IpbSaNm = function(sender) {		
		doOnChangeStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc 학사부서 팝업 클릭 이벤트
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-07-06
	 */
	moPage.onClick_BtnSaNmPop = function(sender) {
		doOnClickStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc 조회 실행
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-07-06
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
	 * @desc   학생검색팝업 조회 후 해당 학생의 졸업유보를 조회한다.	
	 * @param  poParam 학생popObject
	 * @return void
	 * @author Aeyoung Lee 2016-07-06
	 */
	function doStSearch(poParam){
		var vsStudId = poParam.Result.strStudId;
		var vnCurIdx = poParam.rptRowIdx;
		
		if(!ValueUtil.isNull(vsStudId)){
			
			util.DataMap.setValue(app, "dmReqKey", "strStudId", vsStudId);
			//strCommand: getCgtExdYn 
			util.Submit.send(app, "subCgtExdYn", function(pbSuccess){							
				if(pbSuccess){
					var vsCgtExdYn = util.DataMap.getValue(app, "dmResPopStud", "strCgtExdYn");
					util.Grid.setCellValue(app, "grdGrdtTgt", "CGT_EXD_YN", vsCgtExdYn, vnCurIdx);
				}else{
					util.Grid.setCellValue(app, "grdGrdtTgt", "CGT_EXD_YN", "", vnCurIdx);
				}
			});
			
		}else{
			util.Grid.setCellValue(app, "grdGrdtTgt", "CGT_EXD_YN", "", vnCurIdx);
		}	
	};
	
	/**
	 * @desc  졸업대상자 목록을 조회한다.
	 * @param {Function} poCallBackFunc 콜백정의
	 * @return void
	 * @author Aeyoung Lee 2016-07-06
	 */
	function doList(poCallBackFunc) {
		
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdGrdtTgt");	
				
				if(util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
			}
		}); 
	};
	
	/**
	 * @desc 신규 click event
	 * @return void
	 * @author Aeyoung Lee 2016-07-06
	 */		
	moPage.onClick_BtnNew = function() {
		//해당 리피트 insertRow 후 편집 시작할 컬럼 지정		
		var voNewRow = util.Grid.insertRow(app, "grdGrdtTgt", "rdIpbStudNo");	
		
		var vsSchYearRcd  = util.DataMap.getValue(app, "dmResList", "strCgtSchYearRcd");
		var vsSmtRcd      = util.DataMap.getValue(app, "dmResList", "strCgtSmtRcd");
		
		util.Grid.setCellValue(app, "grdGrdtTgt", "SCH_YEAR_RCD"	, vsSchYearRcd, voNewRow);
		util.Grid.setCellValue(app, "grdGrdtTgt", "SMT_RCD"     	, vsSmtRcd, voNewRow);
		util.Grid.setCellValue(app, "grdGrdtTgt", "TGT_DIV_RCD"  , "CU109REGU", voNewRow);
	};
	
	/**
	 * @desc 삭제 click event
	 * @return void
	 * @author Aeyoung Lee 2016-07-06
	 */	
	moPage.onClick_BtnDel = function() {
		
		var vsPanelCheckIdx = util.Grid.getCheckOrSelectedRowIndex(app, "grdGrdtTgt");
		if(vsPanelCheckIdx == null){
			// "@(을)를 선택해주세요" 메시지 출력
			util.Msg.alert("NLS-INF-M045", [util.Control.setValue(app, "lblTitleRptGrdtTgt")]);
			return false;
		}	
		
		var voPanelChk;
		
		if(String(vsPanelCheckIdx).indexOf(",") != -1){
			voPanelChk = vsPanelCheckIdx.split(",");
		}else{
			voPanelChk = new Array();
			voPanelChk[0] = vsPanelCheckIdx;
		}		
		
		for(var i = 0; i < voPanelChk.length; i++) {
			var vnRow = voPanelChk[i];
			
			var vsCgtCnfmYn = util.Grid.getCellValue(app, "grdGrdtTgt", "CGT_CNFM_YN", vnRow);
			var vsCgtAdtYn = util.Grid.getCellValue(app, "grdGrdtTgt", "CGT_ADT_YN", vnRow);
			
			// 해당 학생의 졸업확정인 경우
			if(vsCgtCnfmYn == "Y"){
				// 이미 졸업확정처리가 완료되어 삭제할 수 없습니다.
				util.Msg.alert("NLS-CGT-M028", [vnRow+""]);
				return false;
			}	
			
			// 해당 학생의 졸업사정 결과가 존재하는 경우 
			if(vsCgtAdtYn == "Y"){
				//졸업사정결과가 존재하는 학생입니다. 대상자 삭제 시 사정결과도 함께 삭제됩니다. 진행하시겠습니까?
				if (util.Msg.confirm("NLS-CRM-M095", [vnRow+""]) ) {
					continue;
				} else {
					return false;
				}
			}	
		}  
		
		util.Grid.deleteRow(app, "grdGrdtTgt");
	};
	
	/**
	 * @desc 작업취소 click event
	 * @return void
	 * @author Aeyoung Lee 2016-07-06
	 */	
	moPage.onClick_BtnRestore = function() {
		util.Grid.restoreRow(app, "grdGrdtTgt");
	};
	
	/**
	 * @desc 작업저장 click event
	 * @return void
	 * @author Aeyoung Lee 2016-07-06
	 */	
	moPage.onClick_BtnSave = function() {
		// 리피터 변경사항 체크
		if(!util.Grid.isModified(app, ["grdGrdtTgt"], "MSG")){
			return false;
		}
		
		//리피트 validation check
		if(!util.validate(app, "grdGrdtTgt")) return false;
		
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
	 * @desc   리피트 학생검색팝업버튼 클릭 이벤트
	 * @return void
	 * @author Aeyoung Lee 2016-07-06
	 */	
	moPage.onClick_RdBtnStudNo = function(sender) {
		doOnClickStdCsrPStSearch(sender);
	};
	
	/**
	 * @desc   리피트 학생입력 이벤트
	 * @return void
	 * @author Aeyoung Lee 2016-07-06
	 */	
	moPage.onValueChanged_RdIpbStudNo = function(sender) {
		doOnChangeStdCsrPStSearch(sender);
	};
	
	/**
	 * @desc   리피트 row select  이벤트
	 * @return void
	 * @author Aeyoung Lee 2016-07-06
	 */	
	moPage.onRowSelect_RptGrdtTgt = function() {
//TO-BE: <ExtControl.refreshBind> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtControl.refreshBind("binRoPkColum");
	};
	
	/**
	 * @desc   리피트 패널 체크
	 * @return void
	 * @author Aeyoung Lee 2016-07-06
	 */	
	moPage.onValueChanged_RhCkbSelect = function() {
		// 리피트 패널 설정
//TO-BE: <ExtRepeat.selectedAllPanel> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.selectedAllPanel("rhCkbSelect");
	};

	return moPage;
};

