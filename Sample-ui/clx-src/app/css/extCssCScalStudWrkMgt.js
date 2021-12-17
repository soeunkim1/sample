
//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCssCScalStudWrkMgt.xtm"/>


var extCssCScalStudWrkMgt = function() {
		
	var moPage = new Page();
	var moPObject = new PObject();
	
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
		iMngDeptDiv		: "", 
		iWrkScalYn		: "Y",
		oScalFeeCd 		: "ipbScalFeeCd",
		oScalFeeNm 		: "ipbScalFeeNm",
		oObjDivRcd 		: "ipbSsObjDivRcd",
		oPmntDivRcd 	: "",
		oPmntItvRcd 	: "",
		func 			: null
	}
	];
	
	/**
	 * 학생검색팝업 관련 설정사항
	 */
	moPObject.moIdsForStdCsrPStSearch = [
	{
		controlId     	: "rdBtnStudNoMst",
		iStudNo       	: "rdIpbStudNoMst",
		iStudId       	: "",
		iStudNm       	: "",
		iKeyDate	  	: "/root/reqKey/strKeyDate",
		iObjDivRcd 		: "",
		iObjCd     	  	: "",
		iObjNm 			: "",
		iAuthYN		  	: "",
		oStudId       	: "rdIpbStudIdMst",
		oStudNo       	: "rdIpbStudNoMst",
		oStudNm       	: "rdOptRepNmMst",
		oSsn          	: "",
		oStatNm 	  	: "",
		oStatRcd	  	: "",
		oProcRslt	  	: "",
		oProcRsltYear	: "",
		oSaCd         	: "",
		oSaNm         	: "rdOptSaNmMst",					
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
	 * @author Aeyoung Lee 2016-09-07
	 */
	moPage.onLoadImportDone_ImpTitle = function() {		
		doHeaderOnLoad();
	};
	
	/**
	 * @desc 온로드 실행
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-09-07
	 */
	moPage.onModelConstructDone_ExtCssCScalStudWrkMgt = function() {
		//리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["rptWrkStudMst", "rptMonPmntDtl"]);
		//검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grpDataMst", "grpDataDtl"]);
		//암호화컬럼 설정
		ExtRepeat.addOriginCol("rptMonPmntDtl", ["ACCT_NO"]);
		
		doOnLoadImpNS("CSS");
		
		ExtSubmission.sendEx("subOnLoad", "onLoad");
	};
	
	/**
	 * @desc 팝업호출시 기준일자 셋팅
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-09-07
	 */
	function doSetPopKeyDate() {
		var vsEndDt = ExtInstance.getValue("instance('impCommonN')/root/date/END_DT").substr(0,8);
		
		moPObject.moIdsForStdCssPScalFeeSch[0].iKeyDate = vsEndDt;
	};
	
	/**
	 * 장학금검색버튼클릭이벤트
	 * @param sender
	 * @type void
	 * @author Aeyoung Lee 2016-09-07
	 */	
	moPage.onClick_BtnScalFeeNmPop = function(sender) {
		doSetPopKeyDate();
		doOnClickStdCssPScalFeePop(sender);
	};
	
	/**
	 * 장학금변경이벤트
	 * @param sender
	 * @type void
	 * @author Aeyoung Lee 2016-09-07
	 */	
	moPage.onValueChanged_IpbScalFeeNm = function(sender) {
		doSetPopKeyDate();
		doOnChangeStdCssPScalFeePop(sender);
	};
	
	/**
	 * 학년도 학기 변경시 장학금 조건 초기화
	 * @param sender
	 * @type void
	 * @author Aeyoung Lee 2016-09-07
	 */
	function doSetKeyDateYearSmtImp(){
		util.Control.reset(app, ["ipbScalFeeNm", "ipbScalFeeCd", "ipbSsObjDivRcd"]);
	};	
	
	/**
	 * @desc 근무처 Enter Key 입력시 자동조회
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-09-07
	 */
	moPage.onKeyDown_IpbWrkPlace = function(strKeyType, strKeyStatus) {
		// 엔터키 입력시 조회
		if(e.keyCode == cpr.events.KeyCode.ENTER){
			util.Header.clickSearch(app);
		}
	};
	
	/**
	 * @desc 조회 실행
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-09-07
	 */
	moPage.onClick_BtnSearch = function() {
		//작업영역 리피트 변경 내역 체크
		if(util.Grid.isModified(app, "", "CRM")){
			return false;
		}	
		
		if(!util.validate(app, ["cbbYearImpNS", "cbbSmtImpNS", "ipbScalFeeNm", "ipbScalFeeCd"])){
			return false;
		}
		
		// pk 초기화
		ExtRepeat.setPkValues("rptWrkStudMst", "");
		ExtRepeat.setPkValues("rptMonPmntDtl", "");
		
		doListMst(function(pbSuccess){
			if(pbSuccess) util.Msg.notify(app, "NLS.INF.M024");
		});	
	};
	
	/**
	 * @desc  근로장학 목록을 조회한다.
	 * @param {Function} poCallBackFunc 콜백정의
	 * @return void
	 * @author Aeyoung Lee 2016-09-07
	 */
	function doListMst(poCallBackFunc) {
		
		util.DataMap.setValue(app, "dmReqKey", "strSchYearRcd", util.Control.getValue(app, "cbbYearImpNS"));
		util.DataMap.setValue(app, "dmReqKey", "strSmtRcd", util.Control.getValue(app, "cbbSmtImpNS"));
		ExtInstance.setValue("/root/reqKey/strKeyDate", ExtInstance.getValue("instance('impCommonN')/root/date/END_DT"));
		
		//strCommand: listWrkMst 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdWrkStudMst");
				
				//마스터에 데이터가 없을 경우 디테일 입력 불가
				if(util.Grid.getRowCount(app, "grdWrkStudMst") < 1){
					util.Control.setEnable(app, false,["grpDataDtl"]);
					util.Control.reset(app, "rptMonPmntDtl");
				}else{
					// 각 컨트롤 활성화 제어
					doMstRptStatus();
					doDtlRptStatus();
				}
				
				// 조회 후 콜백함수 수행
				if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess); 
			}
		}); 
	};
	
	/**
	 * @desc   마스터의 상태가 편집상태일 경우  디테일 disable
	 * @return void
	 * @author Aeyoung Lee 2016-09-07
	 */
	function doMstRptStatus(){
		
		if(util.Grid.isModified(app, "grdWrkStudMst")){
			util.Control.setEnable(app, false, ["grpDataDtl"]);
		}else{
			util.Control.setEnable(app, true, ["grpDataDtl"]);
		}
	};
	
	/**
	 * @desc   디테일 상태가 편집상태일 경우 마스터 disable
	 * @return void
	 * @author Aeyoung Lee 2016-09-07
	 */
	function doDtlRptStatus(){
		
		if(util.Grid.isModified(app, "grdMonPmntDtl")){
			util.Control.setEnable(app, false, ["grpDataMst"]);
		}else{
			util.Control.setEnable(app, true, ["grpDataMst"]);
		}
	};
	
	/**
	 * @desc   리피트 패널 체크
	 * @return void
	 * @author Aeyoung Lee 2016-09-07
	 */	
	moPage.onValueChanged_RhCkbSelectMst = function() {
		// 리피트 패널 설정
//TO-BE: <ExtRepeat.selectedAllPanel> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.selectedAllPanel("rhCkbSelectMst");
	};
	
	/**
	 * @desc   리피트 학생검색팝업버튼 클릭 이벤트
	 * @return void
	 * @author Aeyoung Lee 2016-09-07
	 */	
	moPage.onClick_RdBtnStudNoMst = function(sender) {
		doOnClickStdCsrPStSearch(sender);
	};
	
	/**
	 * @desc   리피트 학생입력 이벤트
	 * @return void
	 * @author Aeyoung Lee 2016-07-06
	 */	
	moPage.onValueChanged_RdIpbStudNoMst = function(sender) {
		doOnChangeStdCsrPStSearch(sender);
	};
	
	/**
	 * @desc 신규 click event
	 * @return void
	 * @author Aeyoung Lee 2016-09-07
	 */		
	moPage.onClick_BtnNewMst = function() {
		//해당 리피트 insertRow 후 편집 시작할 컬럼 지정		
		var vnNewRow = util.Grid.insertRow(app, "grdWrkStudMst");	
		
		var vsSchYearRcd  = ExtInstance.getValue("instance('impCommonN')/root/date/YEAR");
		var vsSmtRcd      = ExtInstance.getValue("instance('impCommonN')/root/date/SMT");
		
		util.Grid.setCellValue(app, "grdWrkStudMst", "SCH_YEAR_RCD"	, vsSchYearRcd	 , vnNewRow);
		util.Grid.setCellValue(app, "grdWrkStudMst", "SMT_RCD"     	, vsSmtRcd		 , vnNewRow);
		util.Grid.setCellValue(app, "grdWrkStudMst", "CNFM_DT"     	, util.DataMap.getValue(app, "dmResOnLoad", "strSysDate").substring(0,8), vnNewRow);
		util.Grid.setCellValue(app, "grdWrkStudMst", "SCAL_AMT"     	, 0				 , vnNewRow);
		
		// 프리폼 항목 포커스
		ExtRepeat.setColFocus("rptWrkStudMst", vnNewRow, "rdIpbRemarkMst"); 
		
		// 마스터 리피터 상태에따른 디테일 제어
		doMstRptStatus();
	};
	
	/**
	 * @desc 삭제 click event
	 * @return void
	 * @author Aeyoung Lee 2016-09-07
	 */	
	moPage.onClick_BtnDelMst = function() {
		
		var vsPanelCheckIdx = util.Grid.getCheckOrSelectedRowIndex(app, "grdWrkStudMst");
		if (!ValueUtil.isNull(vsPanelCheckIdx)) {
			if(!util.Msg.confirm("NLS-CSS-M107") ) return;
		}
		
		util.Grid.deleteRow(app, "grdWrkStudMst");
		
		// 마스터 리피터 상태에따른 디테일 제어
		doMstRptStatus();
	};
	
	/**
	 * @desc 작업취소 click event
	 * @return void
	 * @author Aeyoung Lee 2016-09-07
	 */	
	moPage.onClick_BtnRestoreMst = function() {
		util.Grid.restoreRow(app, "grdWrkStudMst");
		
		if(util.Grid.getRowState(app, "grdWrkStudMst") == cpr.data.tabledata.RowState.INSERTED) {
			ExtModel.dispatch("rptWrkStudMst", "rowselect");
		}
		
		// 마스터 리피터 상태에따른 디테일 제어
		doMstRptStatus();
	};
	
	/**
	 * @desc 작업저장 click event
	 * @return void
	 * @author Aeyoung Lee 2016-09-07
	 */	
	moPage.onClick_BtnSaveMst = function() {
		// 리피터 변경사항 체크
		if(!util.Grid.isModified(app, ["grdWrkStudMst"], "MSG")){
			return false;
		}
		
		//리피트 validation check
		if(!util.validate(app, "grdWrkStudMst")) return false;
		
		//저장 서브미션
		//strCommand: saveWrkMst 
		util.Submit.send(app, "subSave", function(pbSuccess){
			if(pbSuccess){
				
				// 신규시 pk_value 설정
				var vsPkSerialNo = util.DataMap.getValue(app, "dmRtnPkKeyMstInfo", "strInsSerialNo");
				if(!ValueUtil.isNull(vsPkSerialNo)){
					var vsPkValue = "STUD_ID:" + util.DataMap.getValue(app, "dmRtnPkKeyMstInfo", "strInsStudId") 
									+ ",SCH_YEAR_RCD:" + util.DataMap.getValue(app, "dmRtnPkKeyMstInfo", "strInsSchYearRcd") 
									+ ",SMT_RCD:" + util.DataMap.getValue(app, "dmRtnPkKeyMstInfo", "strInsSmtRcd")
									+ ",SERIAL_NO:" + util.DataMap.getValue(app, "dmRtnPkKeyMstInfo", "strInsSerialNo");
					ExtRepeat.setPkValues("rptWrkStudMst", vsPkValue);
				}	
				
				//재조회
				doListMst(function(pbListSuccess){
					if(pbListSuccess) util.Msg.notify(app, "NLS.INF.M025");
				});
			}
		});
		
	};
	
	/**
	 * @desc   리피트 row select  이벤트
	 * @return void
	 * @author Aeyoung Lee 2016-09-07
	 */	
	moPage.onRowSelect_RptInpartStud = function(poCallBackFunc) {
//TO-BE: <ExtControl.refreshBind> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtControl.refreshBind("binRoPkColum");
		
		if(util.Grid.getRowState(app, "grdWrkStudMst") == cpr.data.tabledata.RowState.INSERTED){
			util.Control.reset(app, "rptMonPmntDtl");
			return false;
		}
		
		doListDtl();
	};
	
	/**
	 * @desc  월별지급 목록을 조회한다.
	 * @param {Function} poCallBackFunc 콜백정의
	 * @return void
	 * @author Aeyoung Lee 2016-09-07
	 */
	function doListDtl(poCallBackFunc) {
		
		util.DataMap.setValue(app, "dmReqDtlKey", "strSchYearRcd", util.Grid.getCellValue(app, "grdWrkStudMst", "SCH_YEAR_RCD"));
		util.DataMap.setValue(app, "dmReqDtlKey", "strSmtRcd", util.Grid.getCellValue(app, "grdWrkStudMst", "SMT_RCD"));
		util.DataMap.setValue(app, "dmReqDtlKey", "strStudId", util.Grid.getCellValue(app, "grdWrkStudMst", "STUD_ID"));
		util.DataMap.setValue(app, "dmReqDtlKey", "strSerialNo", util.Grid.getCellValue(app, "grdWrkStudMst", "SERIAL_NO"));
		
		//strCommand: listPmntDtl 
		util.Submit.send(app, "subListDtl", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdMonPmntDtl");
			}
			// 조회 후 콜백함수 수행
			if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess); 
		});
	};
	
	/**
	 * @desc   리피트Dtl 패널 체크
	 * @return void
	 * @author Aeyoung Lee 2016-09-07
	 */	
	moPage.onValueChanged_RhCkbSelectDtl = function() {
		// 리피트 패널 설정
//TO-BE: <ExtRepeat.selectedAllPanel> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.selectedAllPanel("rdChkSelectDtl");
	};
	
	/**
	 * @desc 신규Dtl click event
	 * @return void
	 * @author Aeyoung Lee 2016-09-07
	 */	
	moPage.onClick_BtnNewDtl = function() {
		//해당 리피트 insertRow 후 편집 시작할 컬럼 지정		
		var vnNewRow = util.Grid.insertRow(app, "grdMonPmntDtl", "rdDipWrkYymmDtl");	
		
		util.Grid.setCellValue(app, "grdMonPmntDtl", "SCH_YEAR_RCD", util.DataMap.getValue(app, "dmReqDtlKey", "strSchYearRcd"), vnNewRow);
		util.Grid.setCellValue(app, "grdMonPmntDtl", "SMT_RCD"     , util.DataMap.getValue(app, "dmReqDtlKey", "strSmtRcd")	 , vnNewRow);
		util.Grid.setCellValue(app, "grdMonPmntDtl", "STUD_ID"     , util.DataMap.getValue(app, "dmReqDtlKey", "strStudId")	 , vnNewRow);
		util.Grid.setCellValue(app, "grdMonPmntDtl", "SERIAL_NO"   , util.DataMap.getValue(app, "dmReqDtlKey", "strSerialNo")	 , vnNewRow);
		
		// 디테일 리피터 상태에따른 마스터 제어
		doDtlRptStatus();
	};
	
	/**
	 * @desc 삭제Dtl click event
	 * @return void
	 * @author Aeyoung Lee 2016-09-07
	 */
	moPage.onClick_BtnDelDtl = function() {
		util.Grid.deleteRow(app, "grdMonPmntDtl");
		
		// 디테일 리피터 상태에따른 마스터 제어
		doDtlRptStatus();
	};
	
	/**
	 * @desc 작업취소Dtl click event
	 * @return void
	 * @author Aeyoung Lee 2016-09-07
	 */
	moPage.onClick_BtnRestoreDtl = function() {
		util.Grid.restoreRow(app, "grdMonPmntDtl");
		
		// 디테일 리피터 상태에따른 마스터 제어
		doDtlRptStatus();
	};
	
	/**
	 * @desc 저장Dtl click event
	 * @return void
	 * @author Aeyoung Lee 2016-09-07
	 */	
	moPage.onClick_BtnSaveDtl = function() {
		// 리피터 변경사항 체크
		if(!util.Grid.isModified(app, ["grdMonPmntDtl"], "MSG")){
			return false;
		}
		
		//리피트 validation check
		if(!util.validate(app, "grdMonPmntDtl")) return false;
		
		//저장 서브미션
		//strCommand: savePmntDtl 
		util.Submit.send(app, "subSaveDtl", function(pbSuccess){
			if(pbSuccess){
				
				util.Control.redraw(app, "grdMonPmntDtl");
				
				// 신규시 pk_value 설정
				var vsPkSerialNo = util.DataMap.getValue(app, "dmRtnPkKeyDtlInfo", "strInsPmntSerialNo");
				if(!ValueUtil.isNull(vsPkSerialNo)){
					var vsPkMstValue = "STUD_ID:" + util.DataMap.getValue(app, "dmRtnPkKeyDtlInfo", "strInsStudId") 
									+ ",SCH_YEAR_RCD:" + util.DataMap.getValue(app, "dmRtnPkKeyDtlInfo", "strInsSchYearRcd") 
									+ ",SMT_RCD:" + util.DataMap.getValue(app, "dmRtnPkKeyDtlInfo", "strInsSmtRcd")
									+ ",SERIAL_NO:" + util.DataMap.getValue(app, "dmRtnPkKeyDtlInfo", "strInsSerialNo");
					ExtRepeat.setPkValues("rptWrkStudMst", vsPkMstValue);
					
					var vsPkValue = "STUD_ID:" + util.DataMap.getValue(app, "dmRtnPkKeyDtlInfo", "strInsStudId") 
									+ ",SCH_YEAR_RCD:" + util.DataMap.getValue(app, "dmRtnPkKeyDtlInfo", "strInsSchYearRcd") 
									+ ",SMT_RCD:" + util.DataMap.getValue(app, "dmRtnPkKeyDtlInfo", "strInsSmtRcd")
									+ ",SERIAL_NO:" + util.DataMap.getValue(app, "dmRtnPkKeyDtlInfo", "strInsSerialNo")
									+ ",PROC_TYPE_RCD:" + util.DataMap.getValue(app, "dmRtnPkKeyDtlInfo", "strInsProcTypeRcd")
									+ ",PMNT_SERIAL_NO:" + util.DataMap.getValue(app, "dmRtnPkKeyDtlInfo", "strInsPmntSerialNo");
					ExtRepeat.setPkValues("rptMonPmntDtl", vsPkValue);
				}	
				
				//재조회
				doListMst(function(pbListSuccess){
					if(pbListSuccess) util.Msg.notify(app, "NLS.INF.M025");
				});
			}
		});
	};
	
	/**
	 * 계좌번호 변경 이벤트
	 * @return void
	 * @author AeyoungLee 2016-09-08
	 */	
	moPage.onValueChanged_RdIpbStudAcctNoDtl = function() {
		var vnIdx = util.Grid.getIndex(app, "grdMonPmntDtl");
		var vsValue = util.Grid.getCellValue(app, "grdMonPmntDtl", "ACCT_NO", vnIdx);
		var vsChkValue = "";
		//특수문자만 입력시 널처리
		var specialChars = /[-~!#$^&*=+|:;?"<,.>']/;
		vsValue.split(specialChars).join("");
		
		if (vsValue.match(/[0-9]/g) != null) {
			vsChkValue = vsValue.match(/[0-9]/g).join("");
		} else {
			vsChkValue =  "";
		}
		util.Grid.setCellValue(app, "grdMonPmntDtl", "ACCT_NO", vsChkValue, vnIdx, false);
	};
	
	
	
	return moPage;
};

