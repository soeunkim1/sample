
//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCssCDeptInputTerm.xtm"/>


var extCssCDeptInputTerm = function() {
		
	var moPage = new Page();
	var moPObject = new PObject();
	
	/* 
	 * 장학금 검색팝업 관련 설정사항
	 */
	moPObject.moIdsForStdCssPScalFeeSch = [
	{
		controlId 		: "rdBtnScalFeeNmPop",
		iCd 			: "",
		iNm 			: "rdIpbScalFeeNm",
		iObjDivRcd 		: "CC009SS",
		iLanDivRcd 		: "",
		iKeyDate		: "",
		iScalFeeCls1	: "",	
		iScalFeeCls2	: "",	
		iScalFeeCls3	: "",	
		iScalFeeCls4	: "",	
		iScalFeeCls5	: "",	
		iDeptCd 		: "",		
		iDeptObjDivRcd 	: "",		
		iMngDeptDiv		: "CH002DPT", // 학과(CH002DPT)
		oScalFeeCd 		: "rdIpbScalFeeCd",
		oScalFeeNm 		: "rdIpbScalFeeNm",
		oObjDivRcd 		: "rdIpbSsObjDivRcd",
		oPmntDivRcd 	: "",
		oPmntItvRcd 	: "",
		func 			: null
	}
	];
	
	/**
	 * @desc  Header Import onLoad
	 * @return void
	 * @author Aeyoung Lee 2016-04-14
	 */
	moPage.onLoadImportDone_ImpTitle = function() {		
		doHeaderOnLoad();
	};
	
	/**
	 * @desc 온로드 실행
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-04-14
	 */
	moPage.onModelConstructDone_ExtCssCDeptInputTerm = function() {
		//리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init("rptDptmjScalInputTerm");
		//검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grpData"]);
		
		doOnLoadImpNS("CSS");
	};
	
	/**
	 * @desc 조회 실행
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-04-14
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
	 * @desc  학과장학생입력기간 자료 조회한다.
	 * @param {Function} poCallBackFunc 콜백정의
	 * @return void
	 * @author Aeyoung Lee 2016-04-14
	 */
	function doList(poCallBackFunc) {
		//장학금검색 기준일자(해당학년도학기 종료일자) 셋팅
		var vsEndDt = ExtInstance.getValue("instance('impCommonN')/root/date/END_DT").substr(0,8);
		moPObject.moIdsForStdCssPScalFeeSch[0].iKeyDate = vsEndDt;
		
		//조회파라미터 셋팅
		util.DataMap.setValue(app, "dmReqKey", "strSchYearRcd", util.Control.getValue(app, "cbbYearImpNS"));
		util.DataMap.setValue(app, "dmReqKey", "strSmtRcd", util.Control.getValue(app, "cbbSmtImpNS"));
		ExtInstance.setValue("/root/reqKey/strKeyDate", ExtInstance.getValue("instance('impCommonN')/root/date/END_DT"));
		
		//조회서브미션
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdDptmjScalInputTerm");	
				
				if(util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
			}
		}); 
	};
	
	/**
	 * @desc 신규 click event
	 * @return void
	 * @author Aeyoung Lee 2016-04-14
	 */		
	moPage.onClick_BtnNew = function() {
		//해당 리피트 insertRow 후 편집 시작할 컬럼 지정		
		var voNewRow = util.Grid.insertRow(app, "grdDptmjScalInputTerm", "rdIpbScalFeeNm");	
		
		var vsSchYearRcd = util.DataMap.getValue(app, "dmReqKey", "strSchYearRcd");
		var vsSmtRcd	 = util.DataMap.getValue(app, "dmReqKey", "strSmtRcd");
		
		util.Grid.setCellValue(app, "grdDptmjScalInputTerm", "SCH_YEAR_RCD", vsSchYearRcd, voNewRow);
		util.Grid.setCellValue(app, "grdDptmjScalInputTerm", "SMT_RCD"     , vsSmtRcd	, voNewRow);				
	};
	
	/**
	 * @desc 삭제 click event
	 * @return void
	 * @author Aeyoung Lee 2016-04-14
	 */	
	moPage.onClick_BtnDel = function() {
		util.Grid.deleteRow(app, "grdDptmjScalInputTerm");
	};
	
	/**
	 * @desc 작업취소 click event
	 * @return void
	 * @author Aeyoung Lee 2016-04-14
	 */	
	moPage.onClick_BtnRestore = function() {
		util.Grid.restoreRow(app, "grdDptmjScalInputTerm");
	};
	
	/**
	 * @desc 작업저장 click event
	 * @return void
	 * @author Aeyoung Lee 2016-04-14
	 */	
	moPage.onClick_BtnSave = function() {
		// 리피터 변경사항 체크
		if(!util.Grid.isModified(app, ["grdDptmjScalInputTerm"], "MSG")){
			return false;
		}
		
		//리피트 validation check
		if(!util.validate(app, "grdDptmjScalInputTerm")) return false;
		
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
	 * @desc   리피트 장학금명 변경 이벤트
	 * @return void
	 * @author Aeyoung Lee 2016-04-14
	 */
	moPage.onValueChanged_RptDptmjScalInputTerm = function(psDiv, sender) {
		var vnRowIdx = util.Grid.getIndex(app, "grdDptmjScalInputTerm");
		
		// 장학금명
		if(psDiv == "SCAL_FEE_NM"){
			doOnChangeStdCssPScalFeePop(sender);
		}	
		
		switch(psDiv){
			case "ST_DT" :
			case "END_DT" :
				var vnStDt = util.Grid.getCellValue(app, "grdDptmjScalInputTerm", "ST_DT", vnRowIdx).substring(0,8);
				var vnEndDt = util.Grid.getCellValue(app, "grdDptmjScalInputTerm", "END_DT", vnRowIdx).substring(0, 8);
				
				if(vnStDt == "" || vnEndDt == "") break;
				if(vnStDt > vnEndDt){
					// @은(는) @보다 클 수 없습니다
					util.Msg.alert("NLS-WRN-M052", [ExtControl.getTextValue("rhBtnStDt"), ExtControl.getTextValue("rhBtnEndDt")]);
					util.Grid.setCellValue(app, "grdDptmjScalInputTerm", psDiv, "", vnRowIdx);
					break;
				}
				break;
			default :
			break;
		}
	};
	
	/**
	 * @desc 리피트 장학금 팝업 클릭 이벤트
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-04-14
	 */
	moPage.onClick_RdBtnScalFeeNmPop = function(sender) {
		doOnClickStdCssPScalFeePop(sender);
	};
	
	/**
	 * @desc   리피트 패널 체크
	 * @return void
	 * @author Aeyoung Lee 2016-04-14
	 */	
	moPage.onValueChanged_RhCkbSelect = function() {
		// 리피트 패널 설정
//TO-BE: <ExtRepeat.selectedAllPanel> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.selectedAllPanel("rhCkbSelect");
	};
	
	/**
	 * @desc   리피트 row select  이벤트
	 * @return void
	 * @author Aeyoung Lee 2016-04-14
	 */	
	moPage.onRowSelect_RptDptMjAlotNop = function() {
//TO-BE: <ExtControl.refreshBind> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtControl.refreshBind("binRoPkColum");
	};
	
	return moPage;
};

