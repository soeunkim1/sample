
//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCssCAlotNop.xtm"/>


var extCssCAlotNop = function() {
		
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
		iObjDivRcd 	: ["CC009SA"],
		iLanDivRcd 	: "",
		iKeyDate 	: "",
		oObjDivRcd 	: "ipbDeptObjDivRcd",
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
		oObjDivRcd 	: "rdIpbDeptObjDivRcd",
		oCd 		: "rdIpbDeptCd",
		oCdNm 		: "rdIpbDeptNm",
		oStDt 		: "",
		oEndDt 		: "",
		oLanDivRcd 	: "",
		func 		: ""
	}
	];
	
	/* 
	 * 장학금 검색팝업 관련 설정사항
	 */
	moPObject.moIdsForStdCssPScalFeeSch = [
	{
		controlId 		: "btnScalFeeNmPop",
		iCd 			: "",
		iNm 			: "ipbScalFeeNm",
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
		oScalFeeCd 		: "ipbScalFeeCd",
		oScalFeeNm 		: "ipbScalFeeNm",
		oObjDivRcd 		: "ipbSsObjDivRcd",
		oPmntDivRcd 	: "",
		oPmntItvRcd 	: "",
		func 			: null
	}
	];
	
	/**
	 * @desc  Header Import onLoad
	 * @return void
	 * @author Aeyoung Lee 2016-04-11
	 */
	moPage.onLoadImportDone_ImpTitle = function() {		
		doHeaderOnLoad();
	};
	
	/**
	 * @desc 온로드 실행
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-04-11
	 */
	moPage.onModelConstructDone_ExtCssCAlotNop = function() {
		//리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init("rptDptMjAlotNop");
		//검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grpData"]);
		
		doOnLoad();
	};
	
	/**
	 * @desc 온로드 실행
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016-04-11
	 */
	function doOnLoad(){
		doOnLoadImpNS("CSS");
		// 서브미션 실행 (실패시 cover page)
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				//ExtControl.refresh(["rdCbbSpSubDivCd", "rdCbbDayNightDivRcd"]);
				util.Control.redraw(app, "grdDptMjAlotNop");
			}
		}, true);
	};
	
	/**
	 * @desc 학년도 학기 임포트 값 변경 시 호출 함수 
	 * @author Aeyoung Lee 2016-08-05
	 */
	function doSetKeyDateYearSmtImp() {
		// 변경 시 학과, 장학금 리셋
		util.Control.reset(app, ["ipbDeptNm", "ipbDeptCd", "ipbDeptObjDivRcd", "ipbScalFeeNm", "ipbScalFeeCd", "ipbSsObjDivRcd"]);
	};
	
	/**
	 * @desc 팝업호출시 기준일자 셋팅
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-04-11
	 */
	function doSetPopKeyDate() {
		var vsEndDt = ExtInstance.getValue("instance('impCommonN')/root/date/END_DT").substr(0,8);
		
		moPObject.moIdsForStdCmnPObjSch[0].iKeyDate = vsEndDt;
		moPObject.moIdsForStdCmnPObjSch[1].iKeyDate = vsEndDt;
		moPObject.moIdsForStdCssPScalFeeSch[0].iKeyDate = vsEndDt;
	};
	
	/**
	 * @desc 장학금명 변경 이벤트
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-04-11
	 */
	moPage.onValueChanged_IpbScalFeeNm = function(sender) {
		doSetPopKeyDate();
		doOnChangeStdCssPScalFeePop(sender);
	};
	
	/**
	 * @desc 장학금명 팝업 클릭 이벤트
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-04-11
	 */
	moPage.onClick_BtnScalFeeNmPop = function(sender) {
		doSetPopKeyDate();
		doOnClickStdCssPScalFeePop(sender);
	};
	
	/**
	 * @desc 학과명 변경 이벤트
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-04-11
	 */
	moPage.onValueChanged_IpbDeptNm = function(sender) {
		doSetPopKeyDate();
		doOnChangeStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc 학과 팝업 클릭 이벤트
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-04-11
	 */
	moPage.onClick_BtnDeptNmPop = function(sender) {
		doSetPopKeyDate();
		doOnClickStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc 조회 실행
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-04-11
	 */
	moPage.onClick_BtnSearch = function() {
		//작업영역 리피트 변경 내역 체크
		if(util.Grid.isModified(app, "", "CRM")){
			return false;
		}	
		
		if(!util.validate(app, ["cbbYearImpNS", "cbbSmtImpNS", "ipbScalFeeNm", "ipbScalFeeCd"])){
			return false;
		}
		
		doList(function(pbSuccess){
			if(pbSuccess) util.Msg.notify(app, "NLS.INF.M024");
		});	
	};
	
	/**
	 * @desc  배정인원 목록을 조회한다.
	 * @param {Function} poCallBackFunc 콜백정의
	 * @return void
	 * @author Aeyoung Lee 2016-04-11
	 */
	function doList(poCallBackFunc) {
		
		util.DataMap.setValue(app, "dmReqKey", "strSchYearRcd", util.Control.getValue(app, "cbbYearImpNS"));
		util.DataMap.setValue(app, "dmReqKey", "strSmtRcd", util.Control.getValue(app, "cbbSmtImpNS"));
		ExtInstance.setValue("/root/reqKey/strKeyDate", ExtInstance.getValue("instance('impCommonN')/root/date/END_DT"));
		
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdDptMjAlotNop");	
				
				if(util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
			}
		}); 
	};
	
	/**
	 * @desc 신규 click event
	 * @return void
	 * @author Aeyoung Lee 2016-04-11
	 */		
	moPage.onClick_BtnNew = function() {
		//해당 리피트 insertRow 후 편집 시작할 컬럼 지정		
		var voNewRow = util.Grid.insertRow(app, "grdDptMjAlotNop", "rdIpbDeptNm");	
		
		var vsSchYearRcd  = ExtInstance.getValue("instance('impCommonN')/root/date/YEAR");
		var vsSmtRcd      = ExtInstance.getValue("instance('impCommonN')/root/date/SMT");
		var vsScalFeeCd   = util.DataMap.getValue(app, "dmReqKey", "strScalFeeCd");
		var vsSsObjDivRcd = util.DataMap.getValue(app, "dmReqKey", "strSsObjDivRcd");
		var vsDeptCd	  = util.DataMap.getValue(app, "dmReqKey", "strDeptCd");
		var vsDeptNm	  = util.DataMap.getValue(app, "dmReqKey", "strDeptNm");
		var vsDeptObjDivRcd = util.DataMap.getValue(app, "dmReqKey", "strDeptObjDivRcd");
		
		util.Grid.setCellValue(app, "grdDptMjAlotNop", "SCH_YEAR_RCD"	, vsSchYearRcd, voNewRow);
		util.Grid.setCellValue(app, "grdDptMjAlotNop", "SMT_RCD"     	, vsSmtRcd, voNewRow);
		util.Grid.setCellValue(app, "grdDptMjAlotNop", "SCAL_FEE_CD"		, vsScalFeeCd, voNewRow);
		util.Grid.setCellValue(app, "grdDptMjAlotNop", "SS_OBJ_DIV_RCD"  , vsSsObjDivRcd, voNewRow);
		util.Grid.setCellValue(app, "grdDptMjAlotNop", "DEPT_CD"     	, vsDeptCd, voNewRow);
		util.Grid.setCellValue(app, "grdDptMjAlotNop", "DEPT_NM"     	, vsDeptNm, voNewRow);
		util.Grid.setCellValue(app, "grdDptMjAlotNop", "DEPT_OBJ_DIV_RCD", vsDeptObjDivRcd, voNewRow);
	};
	
	/**
	 * @desc 삭제 click event
	 * @return void
	 * @author Aeyoung Lee 2016-04-11
	 */	
	moPage.onClick_BtnDel = function() {
		util.Grid.deleteRow(app, "grdDptMjAlotNop");
	};
	
	/**
	 * @desc 작업취소 click event
	 * @return void
	 * @author Aeyoung Lee 2016-04-11
	 */	
	moPage.onClick_BtnRestore = function() {
		util.Grid.restoreRow(app, "grdDptMjAlotNop");
	};
	
	/**
	 * @desc 작업저장 click event
	 * @return void
	 * @author Aeyoung Lee 2016-04-11
	 */	
	moPage.onClick_BtnSave = function() {
		// 리피터 변경사항 체크
		if(!util.Grid.isModified(app, ["grdDptMjAlotNop"], "MSG")){
			return false;
		}
		
		//리피트 validation check
		if(!util.validate(app, "grdDptMjAlotNop")) return false;
		
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
	 * @desc   리피트 값 변경 이벤트
	 * @return void
	 * @author Aeyoung Lee 2016-04-11
	 */
	moPage.onValueChanged_RptDptMjAlotNop = function(psDiv, sender) {
		var vnRowIdx = util.Grid.getIndex(app, "grdDptMjAlotNop");
		var vnChkValue = util.Grid.getCellValue(app, "grdDptMjAlotNop", psDiv, vnRowIdx)	;
		
		if(psDiv == "SHYR" || psDiv == "ALOT_NOP"){
			
			if(!ValueUtil.isNull(vnChkValue)){
				
				if(!ValueUtil.isNumber(vnChkValue)){
					// @은(는) 숫자만 입력할 수 있습니다.
					if(psDiv == "SHYR"){
						util.Msg.alert("NLS-WRN-M104", [NLS.NSCR.SHYR]);
					}else if(psDiv == "ALOT_NOP"){
						util.Msg.alert("NLS-WRN-M104", [NLS.NSCR.ALOTNOP]);
					}	
					
					util.Grid.setCellValue(app, "grdDptMjAlotNop", psDiv, "", vnRowIdx);
					return;
				}	
			}	
		}	
		
		// 부서명
		else if(psDiv == "DEPT_NM"){
			doSetPopKeyDate();
			doOnChangeStdCmnPObjSch(sender);
		}	
	};
	
	/**
	 * @desc 리피트 학과 팝업 클릭 이벤트
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-04-11
	 */
	moPage.onClick_RdBtnDeptNmPop = function(sender) {
		doSetPopKeyDate();
		doOnClickStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc   리피트 패널 체크
	 * @return void
	 * @author Aeyoung Lee 2016-04-11
	 */	
	moPage.onValueChanged_RhCkbSelect = function() {
		// 리피트 패널 설정
//TO-BE: <ExtRepeat.selectedAllPanel> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.selectedAllPanel("rhCkbSelect");
	};
	
	/**
	 * @desc   리피트 row select  이벤트
	 * @return void
	 * @author Aeyoung Lee 2016-04-11
	 */	
	moPage.onRowSelect_RptDptMjAlotNop = function() {
//TO-BE: <ExtControl.refreshBind> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtControl.refreshBind("binRoPkColum");
	};
	
	return moPage;
};

