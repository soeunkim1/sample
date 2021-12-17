
//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCssCInPartStud.xtm"/>


var extCssCInPartStud = function() {
		
	var moPage = new Page();
	var moPObject = new PObject();
	
	/**
	 * 학생검색팝업 관련 설정사항
	 */
	moPObject.moIdsForStdCsrPStSearch = [
	{
		controlId 		: "btnStudPop",
		iStudNo 		: "ipbStudNo",	
		iStudId 		: "",
		iStudNm 		: "",
		iKeyDate 		: "",
		iObjDivRcd 		: "", 
		iObjCd 			: "", 
		iObjNm 			: "", 
		iAuthYN 		: "",
		iStatRcd 		: "",
		iStudDivRcd		: "",
		oStudId 		: "ipbStudIdObj",
		oStudNo 		: "ipbStudNo",
		oStudNm 		: "",
		oStatNm 		: "",
		oStatRcd 		: "",
		oProcRslt 		: "",
		oProcRsltYear 	: "",
		oSaNm			: "",
		oSaCd 			: "",
		oSpNm 			: "",
		oSpCd 			: "",
		oOgNm 			: "",
		oOgCd 			: "",
		oStudDivRcd		: "",
		oStudDivNm		: "",
		oBirthday		: "",
		oGenderRcd		: "",
		oGenderNm		: "",
		func : null
	}
	,
	{
		controlId     	: "rdBtnStudNo",
		iStudNo       	: "rdIpbStudNo",
		iStudId       	: "",
		iStudNm       	: "",
		iKeyDate	  	: "/root/reqKey/strKeyDate",
		iObjDivRcd 		: "",
		iObjCd     	  	: "",
		iObjNm 			: "",
		iAuthYN		  	: "",
		oStudId       	: "rdIpbStudId",
		oStudNo       	: "rdIpbStudNo",
		oStudNm       	: "rdOptRepNm",
		oSsn          	: "",
		oStatNm 	  	: "rdOptStatNm",
		oStatRcd	  	: "",
		oProcRslt	  	: "",
		oProcRsltYear	: "",
		oSaCd         	: "",
		oSaNm         	: "rdOptSaNm",					
		oSpCd         	: "",
		oSpNm         	: "",
		oOgCd 		  	: "",
		oOgNm 		  	: "",
		func : null
	}
	];
	
	/**
	 * @desc  Header Import onLoad
	 * @return void
	 * @author Aeyoung Lee 2016-09-02
	 */
	moPage.onLoadImportDone_ImpTitle = function() {		
		doHeaderOnLoad();
	};
	
	/**
	 * @desc 온로드 실행
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-09-02
	 */
	moPage.onModelConstructDone_ExtCssCInPartStud = function() {
		//리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["rptInpartStud"]);
		//검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grpData"]);
		
		doOnLoadImpNS("CSS");
		
		ExtSubmission.sendEx("subOnLoad", "onLoad");
	};
	
	/**
	 * @desc 팝업호출시 기준일자 셋팅
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-09-02
	 */
	function doSetPopKeyDate() {
		var vsEndDt = ExtInstance.getValue("instance('impCommonN')/root/date/END_DT").substr(0,8);
		
		moPObject.moIdsForStdCsrPStSearch[0].iKeyDate = vsEndDt;
	};
	
	/**
	 * 학생변경이벤트
	 * @param sender
	 * @type void
	 * @author AeyoungLee 2016-09-02
	 */	
	moPage.onValueChanged_IpbStudNo = function(sender) {
		doSetPopKeyDate();
		doOnChangeStdCsrPStSearch(sender);
	};
	
	/**
	 * 학생검색버튼클릭이벤트
	 * @param sender
	 * @type void
	 * @author AeyoungLee 2016-09-02
	 */
	moPage.onClick_BtnStudPop = function(sender) {
		doSetPopKeyDate();
		doOnClickStdCsrPStSearch(sender);
	};
	
	/**
	 * @desc 조회 실행
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-09-02
	 */
	moPage.onClick_BtnSearch = function() {
		//작업영역 리피트 변경 내역 체크
		if(util.Grid.isModified(app, "", "CRM")){
			return false;
		}	
		
		if(!util.validate(app, ["cbbYearImpNS", "cbbSmtImpNS"])){
			return false;
		}
		
		doList(function(pbSuccess){
			if(pbSuccess) util.Msg.notify(app, "NLS.INF.M024");
		});	
	};
	
	/**
	 * @desc  학생 소득분위자료 목록을 조회한다.
	 * @param {Function} poCallBackFunc 콜백정의
	 * @return void
	 * @author Aeyoung Lee 2016-09-02
	 */
	function doList(poCallBackFunc) {
		
		util.DataMap.setValue(app, "dmReqKey", "strSchYearRcd", util.Control.getValue(app, "cbbYearImpNS"));
		util.DataMap.setValue(app, "dmReqKey", "strSmtRcd", util.Control.getValue(app, "cbbSmtImpNS"));
		ExtInstance.setValue("/root/reqKey/strKeyDate", ExtInstance.getValue("instance('impCommonN')/root/date/END_DT"));
		
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				
				util.Control.redraw(app, "grdInpartStud");
				
				if(util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
			}
		}); 
	};
	
	/**
	 * @desc   리피트 패널 체크
	 * @return void
	 * @author Aeyoung Lee 2016-09-02
	 */	
	moPage.onValueChanged_RhCkbSelect = function() {
		// 리피트 패널 설정
//TO-BE: <ExtRepeat.selectedAllPanel> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.selectedAllPanel("rhCkbSelect");
	};
	
	/**
	 * @desc   리피트 학생검색팝업버튼 클릭 이벤트
	 * @return void
	 * @author Aeyoung Lee 2016-09-02
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
	 * @desc 신규 click event
	 * @return void
	 * @author Aeyoung Lee 2016-09-02
	 */		
	moPage.onClick_BtnNew = function() {
		//해당 리피트 insertRow 후 편집 시작할 컬럼 지정		
		var vnNewRow = util.Grid.insertRow(app, "grdInpartStud");	
		
		var vsSchYearRcd  = ExtInstance.getValue("instance('impCommonN')/root/date/YEAR");
		var vsSmtRcd      = ExtInstance.getValue("instance('impCommonN')/root/date/SMT");
		
		util.Grid.setCellValue(app, "grdInpartStud", "SCH_YEAR_RCD"	, vsSchYearRcd	 , vnNewRow);
		util.Grid.setCellValue(app, "grdInpartStud", "SMT_RCD"     	, vsSmtRcd		 , vnNewRow);
		
		// 프리폼 항목 포커스
		ExtRepeat.setColFocus("rptInpartStud", vnNewRow, "rdIpbStudNo"); 
	};
	
	/**
	 * @desc 삭제 click event
	 * @return void
	 * @author Aeyoung Lee 2016-09-02
	 */	
	moPage.onClick_BtnDel = function() {
		util.Grid.deleteRow(app, "grdInpartStud");
	};
	
	/**
	 * @desc 작업취소 click event
	 * @return void
	 * @author Aeyoung Lee 2016-09-02
	 */	
	moPage.onClick_BtnRestore = function() {
		util.Grid.restoreRow(app, "grdInpartStud");
	};
	
	/**
	 * @desc 작업저장 click event
	 * @return void
	 * @author Aeyoung Lee 2016-09-02
	 */	
	moPage.onClick_BtnSave = function() {
		// 리피터 변경사항 체크
		if(!util.Grid.isModified(app, ["grdInpartStud"], "MSG")){
			return false;
		}
		
		//리피트 validation check
		if(!util.validate(app, "grdInpartStud")) return false;
		
		//저장 서브미션
		//strCommand: save 
		util.Submit.send(app, "subSave", function(pbSuccess){
			if(pbSuccess){
				
				//재조회
				doList(function(pbListSuccess){
					if(pbListSuccess) util.Msg.notify(app, "NLS.INF.M025");
				});
			}
		});
		
	};
	
	/**
	 * @desc   리피트 row select  이벤트
	 * @return void
	 * @author Aeyoung Lee 2016-09-02
	 */	
	moPage.onRowSelect_RptInpartStud = function() {
//TO-BE: <ExtControl.refreshBind> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtControl.refreshBind("binRoPkColum");
	};
	
	/**
	 * @desc 다운로드버튼 클릭이벤트 (업로드양식다운로드)
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-09-02
	 */
	moPage.onClick_BtnSaveFileDown = function() {
		var vsFileChgNm = "장학_학생소득분위업로드파일.xlsx";
		
		var voParam = {
					"strFileSubPath" : "stdCmnCTemplateFile",
					"strFileNm" 	 : vsFileChgNm,
					"strOriFileNm" 	 : vsFileChgNm,
					"strTmpFilePath" : "",
					"strCommand" 	 : "fileDownLoad"
		}
		//다운로드 받을 파일 위치, 다운로드받을 파일이름, 프로그래스동작여부(일단 ""), actionUrl
		FileUtil.downloadFile( "/std.cmn.StdCmnFileTransUtil.ex",voParam);
	};
	
	/**
	 * @desc Browse 버튼 클릭 이벤트 (File Dialog 창 open)
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-09-02
	 */
	moPage.onClick_BtnSaveBrowse = function() {
		FileUtil.getFileName(true, ["xls", "xlsx"], function(psFileNm){
			util.Control.setValue(app, "optFilePath", psFileNm);
		},"",false);
	};
	
	
	/**
	 * @desc 업로드버튼 클릭 이벤트
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-09-02
	 */
	moPage.onClick_BtnSaveUpload = function() {
		
		util.Msg.notify(app, "null");
		
		// 리피터 변경사항 체크
		if(util.Grid.isModified(app, ["grdInpartStud"], "CRM")){
			return false;
		}	
		
		// 필수항목 체크
		if(!util.validate(app, ["cbbYearImpNS", "cbbSmtImpNS", "optFilePath"])) return;
		
		// 2016.10.14 배치처리전 커버페이지 씌우는 로직추가
		util.coverPage(app);
		
		// 엑셀업로드 서브미션
		//strCommand: execUpload 
		util.Submit.send(app, "subExecUpload", function(pbSuccess){
			if(pbSuccess){
				
				var vsErrorCnt = util.DataMap.getValue(app, "dmResList", "strErrorCnt"); // 오류갯수
				
				if(vsErrorCnt == null || vsErrorCnt == "") {
					// 오류개수 값이 없을때 0으로 세팅 
					vsErrorCnt = "0";
				}
				
				if(vsErrorCnt > 0 ){
					util.Control.setValue(app, "optFilePath", "");
					
					var vsFileDir = util.DataMap.getValue(app, "dmFileInfo", "strFileDir");
					var vsFileNm = util.DataMap.getValue(app, "dmFileInfo", "strFileNm");
					var vsFileChgNm = util.DataMap.getValue(app, "dmFileInfo", "strFileChgNm");
					var strTmpFilePath = util.DataMap.getValue(app, "dmFileInfo", "strTmpFilePath");
					
					var voParam = {
						"strFileSubPath" : "",
						"strFileNm" : vsFileNm,
						"strOriFileNm" : vsFileNm,
						"strTmpFilePath" : strTmpFilePath,
						"strCommand" : "fileDownLoad"
					}
					
					//다운로드 받을 파일 위치, 다운로드받을 파일이름, 프로그래스동작여부(일단 ""), actionUrl
					FileUtil.downloadFile( "/std.cmn.StdCmnFileTransUtil.ex",voParam);
					
				}
				
				// 총건수
				var vsTotCnt = util.DataMap.getValue(app, "dmResList", "strTotCnt");
				if(vsTotCnt == null || vsTotCnt == "") {
					vsTotCnt = "0";
				}
					
				// 정상처리건수	
				var vsResultCnt = util.DataMap.getValue(app, "dmResList", "strResultCnt");
				if(vsResultCnt == null || vsResultCnt == "") {
					// 총 count 가 없을때 0으로 세팅. 2013.02.01
					vsResultCnt = "0";
				}
				
				// 총 @건 중 정상처리 @건,  오류 @건 처리되었습니다.\n오류 건이 있을 경우 오류파일의 내용을 참고하십시오.
				if(vsErrorCnt > 0 ){
					util.Msg.alert("NLS-CSS-M096", [vsTotCnt, vsResultCnt, vsErrorCnt, NLS.CSS.M097]);	
				}else{
					util.Msg.alert("NLS-CSS-M096", [vsTotCnt, vsResultCnt, vsErrorCnt]);		
				}	
				
				if(Number(vsResultCnt) > 0){
					//재조회
					doList(function(pbListSuccess){
						if(pbListSuccess) util.Msg.notify(app, "NLS.INF.M025");
					});		
				}	
				
			}else{
				// 처리가 취소되었습니다.
				util.Msg.notify(app, "NLS.INF.M013");
			}
			
			util.Control.setValue(app, "optFilePath", "");
			util.removeCover(app);
		});
		
	};
	
	return moPage;
};

