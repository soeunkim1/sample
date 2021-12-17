
//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCssCDeptScalInput.xtm"/>


var extCssCDeptScalInput = function() {
		
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
		oPmntDivRcd 	: "ipbPmntDivRcd",
		oPmntItvRcd 	: "ipbPmntItvRcd",
		func 			: null
	}
	];
	
	/**
	 * 학생검색팝업 관련 설정사항
	 */
	moPObject.moIdsForStdCsrPStSearch = [
	{
		controlId 		: "btnFrfStudPop",
		iStudNo 		: "ipbFrfStudId",	
		iStudId 		: "",
		iStudNm 		: "",
		iKeyDate 		: "",
		iObjDivRcd 		: "", //"/root/reqKey/strDeptObjDivRcd",
		iObjCd 			: "", //"/root/reqKey/strDeptCd",
		iObjNm 			: "", //"/root/reqKey/strDeptNm",
		iAuthYN 		: "",
		iStatRcd 		: "CT301ATTE",
		iStudDivRcd		: "",
		oStudId 		: "ipbFrfStudIdObj",
		oStudNo 		: "ipbFrfStudId",
		oStudNm 		: "ipbFrfRepNm",
		oStatNm 		: "ipbFrfStatNm",
		oStatRcd 		: "",
		oProcRslt 		: "",
		oProcRsltYear 	: "ipbFrfProcRsltYear",
		oSaNm			: "",
		oSaCd 			: "",
		oSpNm 			: "ipbFrfSpNm",
		oSpCd 			: "",
		oOgNm 			: "",
		oOgCd 			: "",
		oStudDivRcd		: "",
		oStudDivNm		: "",
		oBirthday		: "",
		oGenderRcd		: "",
		oGenderNm		: "",
		func : function(poParam) {
			doStSearch(poParam);
		}
	}
	];
	
	/**
	 * @desc  Header Import onLoad
	 * @return void
	 * @author Aeyoung Lee 2016-05-12
	 */
	moPage.onLoadImportDone_ImpTitle = function() {		
		doHeaderOnLoad();
	};
	
	/**
	 * @desc 온로드 실행
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-05-12
	 */
	moPage.onModelConstructDone_ExtCssCDeptScalInput = function() {
		//리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["rptStudScal", "frfStudScal", "rptDptMjAlotNop"]);
		//검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grpData"]);
		
		//암호화컬럼 설정
		ExtRepeat.addOriginCol("rptStudScal", ["STUD_ACCT_NO"]);
		
		doOnLoad();
	};
	
	/**
	 * @desc 온로드 실행
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016-05-12
	 */
	function doOnLoad(){
		doOnLoadImpNS("CSS");
		
		// 서브미션 실행 (실패시 cover page)
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				// 세션 하위학사부서 중 하나 셋팅
				var vsUserSaCd = util.DataMap.getValue(app, "dmResOnLoad", "strUserSaCd");
				var vsUserSaNm = util.DataMap.getValue(app, "dmResOnLoad", "strUserSaNm");
				var vsUserObjDivRcd = util.DataMap.getValue(app, "dmResOnLoad", "strUserObjDivRcd");
				
				util.Control.setValue(app, "ipbDeptNm", vsUserSaNm);
				util.Control.setValue(app, "ipbDeptCd", vsUserSaCd);
				util.Control.setValue(app, "ipbDeptObjDivRcd", vsUserObjDivRcd);
				
				util.Control.setFocus(app, "ipbDeptNm");
			}
		}, true);
	};
	
	/**
	 * @desc 학년도 학기 임포트 값 변경 시 호출 함수 
	 * @author Aeyoung Lee 2016-08-05
	 */
	function doSetKeyDateYearSmtImp() {
		// 변경 시 학과, 장학금 리셋
		util.Control.reset(app, ["ipbDeptNm", "ipbDeptCd", "ipbDeptObjDivRcd", "ipbScalFeeNm", "ipbScalFeeCd", "ipbSsObjDivRcd", "ipbPmntDivRcd", "ipbPmntItvRcd"]);
	};	
	
	/**
	 * @desc 팝업호출시 기준일자 셋팅
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-05-12
	 */
	function doSetPopKeyDate() {
		var vsEndDt = ExtInstance.getValue("instance('impCommonN')/root/date/END_DT").substr(0,8);
		
		moPObject.moIdsForStdCmnPObjSch[0].iKeyDate = vsEndDt;
		moPObject.moIdsForStdCssPScalFeeSch[0].iKeyDate = vsEndDt;
		moPObject.moIdsForStdCsrPStSearch[0].iKeyDate = vsEndDt;
	};
	
	/**
	 * @desc 장학금명 변경 이벤트
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-05-12
	 */
	moPage.onValueChanged_IpbScalFeeNm = function(sender) {
		doSetPopKeyDate();
		doOnChangeStdCssPScalFeePop(sender);
	};
	
	/**
	 * @desc 장학금명 팝업 클릭 이벤트
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-05-12
	 */
	moPage.onClick_BtnScalFeeNmPop = function(sender) {
		doSetPopKeyDate();
		doOnClickStdCssPScalFeePop(sender);
	};
	
	/**
	 * @desc 학과명 변경 이벤트
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-05-12
	 */
	moPage.onValueChanged_IpbDeptNm = function(sender) {
		doSetPopKeyDate();
		doOnChangeStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc 학과 팝업 클릭 이벤트
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-05-12
	 */
	moPage.onClick_BtnDeptNmPop = function(sender) {
		doSetPopKeyDate();
		doOnClickStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc 조회 실행
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-05-12
	 */
	moPage.onClick_BtnSearch = function() {
		//작업영역 리피트 변경 내역 체크
		if(util.Grid.isModified(app, "", "CRM")){
			return false;
		}	
		
		if(!util.validate(app, ["cbbYearImpNS", "cbbSmtImpNS", "ipbDeptNm", "ipbScalFeeNm", "ipbDeptCd", "ipbScalFeeCd"])){
			return false;
		}
		
		doList(function(pbSuccess){
			if(pbSuccess) util.Msg.notify(app, "NLS.INF.M024");
		});	
	};
	
	/**
	 * @desc  장학생자료 목록을 조회한다.
	 * @param {Function} poCallBackFunc 콜백정의
	 * @return void
	 * @author Aeyoung Lee 2016-05-12
	 */
	function doList(poCallBackFunc) {
		
		util.DataMap.setValue(app, "dmReqKey", "strSchYearRcd", util.Control.getValue(app, "cbbYearImpNS"));
		util.DataMap.setValue(app, "dmReqKey", "strSmtRcd", util.Control.getValue(app, "cbbSmtImpNS"));
		ExtInstance.setValue("/root/reqKey/strKeyDate", ExtInstance.getValue("instance('impCommonN')/root/date/END_DT"));
		
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				
				util.Control.redraw(app, "grdStudScal");
				util.Control.redraw(app, "grdDptMjAlotNop");	
				
				// 학과입력기간 체크하여 기간이 아닌 경우 입력불가능 하도록 제어
				var vsInputTermYn = util.DataMap.getValue(app, "dmResList", "strInputTermYn");
				
				if(vsInputTermYn == "Y"){
					util.Control.setEnable(app, true, ["btnNew", "btnDel", "btnRestore", "btnSave", "frfStudScal"]);	
				}else{
					util.Control.setEnable(app, false, ["btnNew", "btnDel", "btnRestore", "btnSave", "frfStudScal"]);
					
					// 해당 장학금 입력기간이 아닙니다.메시지 표시
					util.Msg.alert("NLS-CSS-M092");
					return;
				}	
				
				// 지급구분에 따른 은행,계좌번호,예금주 필수항목 제어
				var vsPmntDivRcd = util.DataMap.getValue(app, "dmReqKey", "strPmntDivRcd");
				// 사후지급 필수
				if(vsPmntDivRcd == "CH001AFT"){
					ExtControl.setAttr("lblFrfStudBankCd", "class", "lblFrfReq");
					ExtControl.setAttr("lblFrfStudAcctNo", "class", "lblFrfReq");
					ExtControl.setAttr("lblFrfOwerNm", "class", "lblFrfReq");
					
					ExtControl.setAttr("cbbFrfStudBankCd", "class", "cbbFrfReq");
					ExtControl.setAttr("ipbFrfStudAcctNo", "class", "ipbFrffReq");
					ExtControl.setAttr("ipbFrfOwerNm", "class", "ipbFrfReq");
					
					util.Control.setUserAttr(app, "cbbFrfStudBankCd", "require", "Y");
					util.Control.setUserAttr(app, "ipbFrfStudAcctNo", "require", "Y");
					util.Control.setUserAttr(app, "ipbFrfOwerNm", "require", "Y");
					
					ExtControl.setAttr("cbbFrfStudBankCd", "emptyitem", "False");
					
				// 사전지급 비필수	
				}else{
					ExtControl.setAttr("lblFrfStudBankCd", "class", "lblFrf");
					ExtControl.setAttr("lblFrfStudAcctNo", "class", "lblFrf");
					ExtControl.setAttr("lblFrfOwerNm", "class", "lblFrf");
					
					ExtControl.setAttr("cbbFrfStudBankCd", "class", "cbbFrf");
					ExtControl.setAttr("ipbFrfStudAcctNo", "class", "ipbFrf");
					ExtControl.setAttr("ipbFrfOwerNm", "class", "ipbFrf");
					
					util.Control.setUserAttr(app, "cbbFrfStudBankCd", "require", "");
					util.Control.setUserAttr(app, "ipbFrfStudAcctNo", "require", "");
					util.Control.setUserAttr(app, "ipbFrfOwerNm", "require", "");
					
					ExtControl.setAttr("cbbFrfStudBankCd", "emptyitem", "True");
				}	
				
				//if(ExtRepeat.rowCount("rptStudScal") <= 0) {
				doCompareFrfEnable();	
				//}	
				
				
				if(util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
			}
		}); 
	};
	
	/**
	 * @desc   리피트 패널 체크
	 * @return void
	 * @author Aeyoung Lee 2016-05-12
	 */	
	moPage.onValueChanged_RhCkbSelect = function() {
		// 리피트 패널 설정
//TO-BE: <ExtRepeat.selectedAllPanel> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.selectedAllPanel("rhCkbSelect");
	};
	
	/**
	 * @desc   프리폼 변경시 리피트 반영
	 * @return void
	 * @author Aeyoung Lee 2016-05-12
	 */	
	moPage.onUpdate_FrfBase = function() {
		// 프리폼 업데이트내용 그리드 반영
//TO-BE: <ExtFreeForm.updateToRpt> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtFreeForm.updateToRpt("rptStudScal", "frfStudScal");
	}
	
	/**
	 * @desc   리피트 row select  이벤트
	 * @return void
	 * @author Aeyoung Lee 2016-05-12
	 */	
	moPage.onRowSelect_RptStudScal = function() {
		// 리피트 특정 row 데이터를 프리폼 copy
//TO-BE: <ExtRepeat.copyRowForm> 그리드-프리폼인 경우에는 selection바인딩으로 처리하기 때문에 불필요함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.copyRowForm("rptStudScal","frfStudScal");
		
		doCompareFrfEnable();
	};
		
	/**
	 * @desc  마스터 리피트 상태에 따른 디테일 프리폼 비활성화 제어
	 *			    1. index가 지정되지 않았을 경우
	 *			    2. 현재 index의 로우가 삭제 상태일 경우 
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016-05-12
	 */
	function doCompareFrfEnable() {
		
		var vnIdx = util.Grid.getIndex(app, "grdStudScal");
		var vsStaus = util.Grid.getRowState(app, "grdStudScal", vnIdx);
		
		// 마스터 로우 없을경우 프리폼 리셋
		var vsRowCnt = util.Grid.getRowCount(app, "grdStudScal");
		if( vsRowCnt <= 0 || !vnIdx){
			util.Control.reset(app, "frfStudScal");
		}	
		
		if( (!vnIdx) || vsStaus == "delete") {
			util.Control.setEnable(app, false, ["frfStudScal"]);	
		}else{
			
			// 학과입력기간 체크하여 기간이 아닌 경우 입력불가능 하도록 제어
			var vsInputTermYn = util.DataMap.getValue(app, "dmResList", "strInputTermYn");
			
			// 처리상태=학과입력, 신규인경우인 경우만 장학생정보 프리폼 수정 그 외 비활성화
			var vsProcStatRcd = util.Grid.getCellValue(app, "grdStudScal", "PROC_STAT_RCD", vnIdx);
			
			if(vsInputTermYn == "Y" && vsProcStatRcd == "CH301DPT"){
				util.Control.setEnable(app, true, ["frfStudScal"]);	
				
				if(vsStaus == "insert"){
					util.Control.setReadOnly(app, false, ["ipbFrfStudId", "btnFrfStudPop"]);	
				}else{
					util.Control.setReadOnly(app, true, ["ipbFrfStudId", "btnFrfStudPop"]);	
				}
			}else{
				util.Control.setEnable(app, false, ["frfStudScal"]);	
			}	
		}	
	};	
	
	/**
	 * @desc 신규 click event
	 * @return void
	 * @author Aeyoung Lee 2016-05-12
	 */		
	moPage.onClick_BtnNew = function() {
		//해당 리피트 insertRow 후 편집 시작할 컬럼 지정		
		var vnNewRow = util.Grid.insertRow(app, "grdStudScal");	
		
		var vsSchYearRcd  = ExtInstance.getValue("instance('impCommonN')/root/date/YEAR");
		var vsSmtRcd      = ExtInstance.getValue("instance('impCommonN')/root/date/SMT");
		var vsScalFeeCd   = util.DataMap.getValue(app, "dmReqKey", "strScalFeeCd");
		var vsSsObjDivRcd = util.DataMap.getValue(app, "dmReqKey", "strSsObjDivRcd");
		var vsPmntDivRcd = util.DataMap.getValue(app, "dmReqKey", "strPmntDivRcd");
		var vsPmntItvRcd = util.DataMap.getValue(app, "dmReqKey", "strPmntItvRcd");
		
		util.Grid.setCellValue(app, "grdStudScal", "SCH_YEAR_RCD"	, vsSchYearRcd	 , vnNewRow);
		util.Grid.setCellValue(app, "grdStudScal", "SMT_RCD"     	, vsSmtRcd		 , vnNewRow);
		util.Grid.setCellValue(app, "grdStudScal", "SCAL_FEE_CD"		, vsScalFeeCd	 , vnNewRow);
		util.Grid.setCellValue(app, "grdStudScal", "SS_OBJ_DIV_RCD"  , vsSsObjDivRcd  , vnNewRow);
		util.Grid.setCellValue(app, "grdStudScal", "PROC_STAT_RCD"	, "CH301DPT"	 , vnNewRow);	//학과입력(CH301DPT)
		util.Grid.setCellValue(app, "grdStudScal", "PMNT_DIV_RCD"	, vsPmntDivRcd	 , vnNewRow);	
		util.Grid.setCellValue(app, "grdStudScal", "PMNT_ITV_RCD"	, vsPmntItvRcd	 , vnNewRow);	
		util.Grid.setCellValue(app, "grdStudScal", "REQ_DT"			, util.DataMap.getValue(app, "dmResOnLoad", "strSysdate"), vnNewRow);	
		
		// 리피트 특정 row 데이터를 프리폼 copy
//TO-BE: <ExtRepeat.copyRowForm> 그리드-프리폼인 경우에는 selection바인딩으로 처리하기 때문에 불필요함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.copyRowForm("rptStudScal","frfStudScal", vnNewRow);
		
		doCompareFrfEnable();
		
		// 프리폼 항목 포커스
		util.Control.setFocus(app,  "ipbFrfStudId");
	};
	
	/**
	 * onClick_BtnFrfStudPop 학생검색버튼클릭이벤트
	 * @param sender
	 * @type void
	 * @author AeyoungLee 2016-05-12
	 */	
	moPage.onClick_BtnFrfStudPop = function(sender){
		doSetPopKeyDate();
		doOnClickStdCsrPStSearch(sender);
	};
	
	/**
	 * onValueChage_InputFrfStudId 학생변경이벤트
	 * @param sender
	 * @type void
	 * @author AeyoungLee 2016-05-12
	 */	
	moPage.onValueChanged_IpbFrfStudId = function(sender) {
		doSetPopKeyDate();
		doOnChangeStdCsrPStSearch(sender);
	};
	
	/**
	 * @desc 삭제 click event
	 * @return void
	 * @author Aeyoung Lee 2016-05-12
	 */	
	moPage.onClick_BtnDel = function() {
//		var vnChekNodeLength = ExtInstance.getNodeListLength("/root/resList/rptStudScal/row[child::DEL_CKB='Y']");
//		if (vnChekNodeLength <= 0 ) {
//			// "@(을)를 선택해주세요" 메시지 출력
//			ComMsg.alert(NLS.INF.M045, [ExtControl.getTextValue("lblTitleRptStudScal")]);
//			return false;
//		}
		
		var vsPanelCheckIdx = util.Grid.getCheckOrSelectedRowIndex(app, "grdStudScal");
		var voPanelChk;
		
		if(String(vsPanelCheckIdx).indexOf(",") != -1){
			voPanelChk = vsPanelCheckIdx.split(",");
		}else{
			voPanelChk = new Array();
			voPanelChk[0] = vsPanelCheckIdx;
		}	
		
		for(var i = 0; i < voPanelChk.length; i++) {
			var vnRow = voPanelChk[i];
			var vsProcStatRcd = util.Grid.getCellValue(app, "grdStudScal", "PROC_STAT_RCD", vnRow);
			
			if(vsProcStatRcd != "CH301DPT"){
				// @1번째 처리상태가 학과입력이 아니므로 삭제할 수 없습니다.
				util.Msg.alert("NLS-CSS-M093", [vnRow]);	
				return;
			}
		}  
		
		// 삭제처리
		util.Grid.deleteRow(app, "grdStudScal");
		
		// 로우가 없는 경우 rowSelect 이벤트가 일어나지 않으므로 이벤트 추가
		doCompareFrfEnable();
	};
	
	/**
	 * @desc 작업취소 click event
	 * @return void
	 * @author Aeyoung Lee 2016-05-12
	 */	
	moPage.onClick_BtnRestore = function() {
		util.Grid.restoreRow(app, "grdStudScal");
		
//TO-BE: <ExtRepeat.copyRowForm> 그리드-프리폼인 경우에는 selection바인딩으로 처리하기 때문에 불필요함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.copyRowForm("rptStudScal","frfStudScal");
		
		// 로우가 없는 경우 rowSelect 이벤트가 일어나지 않으므로 이벤트 추가
		doCompareFrfEnable();
	};
	
	/**
	 * @desc 작업저장 click event
	 * @return void
	 * @author Aeyoung Lee 2016-05-12
	 */	
	moPage.onClick_BtnSave = function() {
		// 리피터 변경사항 체크
		if(!util.Grid.isModified(app, ["grdStudScal"], "MSG")){
			return false;
		}
		
		//리피트 validation check
		if(!util.validate(app, "grdStudScal")) return false;
		
		//장학(수업료), 장학(입학금), 장학(기타) 중 하나는 필수입력 항목체크
		if(!doCheckAmt()) return false;
		
		//모든 데이터를 체크하기 위해 변경
		//strCommand: savePmnt 
		util.Submit.send(app, "subSave", function(pbSuccess){
			if(pbSuccess){
				
				// 신규시 pk_value 설정
				var vsPkSerialNo = util.DataMap.getValue(app, "dmRtnPkKeyInfo", "strInsSerialNo");
				if(!ValueUtil.isNull(vsPkSerialNo)){
					var vsPkValue = "STUD_ID:" + util.DataMap.getValue(app, "dmRtnPkKeyInfo", "strInsStudId") 
									+ ",SCH_YEAR_RCD:" + util.DataMap.getValue(app, "dmRtnPkKeyInfo", "strInsSchYearRcd") 
									+ ",SMT_RCD:" + util.DataMap.getValue(app, "dmRtnPkKeyInfo", "strInsSmtRcd")
									+ ",SERIAL_NO:" + util.DataMap.getValue(app, "dmRtnPkKeyInfo", "strInsSerialNo");
					ExtRepeat.setPkValues("rptStudScal", vsPkValue);
				}	
				
				doList(function(pbListSuccess){
					if(pbListSuccess) util.Msg.notify(app, "NLS.INF.M025");
				});
			}
		});
		
	};
	
	/**
	 * doCheckAmt 장학(수업료), 장학(입학금), 장학(기타) 중 하나는 필수입력 항목체크, 중복학생체크
	 * @return void
	 * @author AeyoungLee 2016-05-12
	 */	
	function doCheckAmt(){
		for (var i = 1; i <= util.Grid.getRowCount(app, "grdStudScal"); i++) {
			var vnEtcScal = util.Grid.getCellValue(app, "grdStudScal", "ETC_SCAL", i);
			var vnEntScal = util.Grid.getCellValue(app, "grdStudScal", "ENT_SCAL", i);
			var vnTutScal = util.Grid.getCellValue(app, "grdStudScal", "TUT_SCAL", i);
			
			var vbUptStatus = util.Grid.getRowState(app, "grdStudScal", i);
			if(vbUptStatus != "delete" && !(vnEtcScal > 0 || vnEntScal > 0 || vnTutScal > 0)){
				//@1번째 장학(수업료), 장학(입학금), 장학(기타) 중 하나는 입력되어야 합니다..
				util.Msg.alert("NLS-CSS-M094", [i+""]);
				//ExtRepeat.setColFocus("rptStudScal", i, "rdOptTutScal");
				util.Grid.selectRow(app, "grdStudScal", i);
				util.Control.setFocus(app, "ipbFrfTutScal");
				return false;
			}
			
			// 중복학생 체크
			var vsStudId = util.Grid.getCellValue(app, "grdStudScal", "STUD_ID", i);
			var vnStudScalCnt = ExtInstance.getNodeListLength("/root/resList/rptStudScal/row[child::STUD_ID='"+ vsStudId +"' and UPT_STATUS != 'D']");
			if(vnStudScalCnt > 1){
				// @번째 중복 입력된 학생이 존재합니다.
				util.Msg.alert("NLS-CSS-M098", [i+""]);
				//ExtRepeat.setColFocus("rptStudScal", i, "rdOptTutScal");
				util.Grid.selectRow(app, "grdStudScal", i);
				util.Control.setFocus(app, "ipbFrfTutScal");
				return false;
			}	
			
		}
		return true;
	};
	
	/**
	 * doStSearch 학생검색을 통한 학생정보를 장학생정보(moScalStudDtlParam)에 셋팅
	 * @return void
	 * @author AeyoungLee 2016-05-12
	 */	
	function doStSearch(poParam){
		
		var vbStudId = poParam.Result.strStudId;
		if(!ValueUtil.isNull(vbStudId)){
			
			var vsEndDt = ExtInstance.getValue("instance('impCommonN')/root/date/END_DT").substr(0,8);
			util.DataMap.setValue(app, "dmReqStudKey", "strStudId", vbStudId);
			util.DataMap.setValue(app, "dmReqStudKey", "strEndDt", vsEndDt);
			
			// 장학금 유효성 체크
			doSetScalCheckValid();
				
		}else{
			// 학생정보 초기화
			doClearStudInfo();
		}	
	};	
	
	/**
	 * doClearStudInfo 학생정보 clear
	 * @return void
	 * @author AeyoungLee 2016-05-12
	 */	
	function doClearStudInfo(){
		var vnIdx = util.Grid.getIndex(app, "grdStudScal");
		
		util.Grid.setCellValue(app, "grdStudScal", "STUD_ID", "", vnIdx);
		util.Grid.setCellValue(app, "grdStudScal", "STUD_NO", "", vnIdx);
		util.Grid.setCellValue(app, "grdStudScal", "REP_NM", "", vnIdx);
		util.Grid.setCellValue(app, "grdStudScal", "SP_NM", "", vnIdx);
		util.Grid.setCellValue(app, "grdStudScal", "PROC_RSLT_YEAR", "", vnIdx);
		util.Grid.setCellValue(app, "grdStudScal", "STAT_RCD", "", vnIdx);
		util.Grid.setCellValue(app, "grdStudScal", "STAT_NM", "", vnIdx);
		util.Grid.setCellValue(app, "grdStudScal", "STUD_BANK_CD", "", vnIdx);
		util.Grid.setCellValue(app, "grdStudScal", "STUD_ACCT_NO", "", vnIdx);
		util.Grid.setCellValue(app, "grdStudScal", "OWNER_NM", "", vnIdx);
		util.Grid.setCellValue(app, "grdStudScal", "SCAL_AMT", "", vnIdx);
		util.Grid.setCellValue(app, "grdStudScal", "ENT_SCAL", "", vnIdx);
		util.Grid.setCellValue(app, "grdStudScal", "TUT_SCAL", "", vnIdx);
		util.Grid.setCellValue(app, "grdStudScal", "ETC_SCAL", "", vnIdx);
		
		// 리피트 특정 row 데이터를 프리폼 copy
//TO-BE: <ExtRepeat.copyRowForm> 그리드-프리폼인 경우에는 selection바인딩으로 처리하기 때문에 불필요함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.copyRowForm("rptStudScal","frfStudScal", vnIdx);
	};	
	
	/**
	 * doCheckValid 장학금유효성체크 -> 서비스팩토리 호출
	 * @return void
	 * @author AeyoungLee 2016-05-12
	 */	
	function doSetScalCheckValid(poCallbackFunc){
		
		//strCommand: checkValid 
		util.Submit.send(app, "subCheckValid", function(pbSuccess) {
			
			if(pbSuccess){
				var vbPass = util.DataMap.getValue(app, "dmChkValid", "strPass");
				if(vbPass == "Y"){
					// 장학금 자동계산
					doCalcScalFee();
				} else {
					//서브미션을 통해 받아오던 리스트를 부모창에서 받아서 결과창에 뿌려준다.
					var vnScalFeeValidRst = util.DataSet.getRowCount(app, "dsListResult");
					
					if(vnScalFeeValidRst > 0){
						doShowRstMsgList("impExtCssScalValidRst");
					}	
				}
			}
		});
	};	
	
	
	/**
	 * doCalcScalFee 장학금액 계산
	 * @return void
	 * @author AeyoungLee 2016-05-12
	 */	
	function doCalcScalFee(){
		var vbSuccess = true;
		
		// 장학금자동계산여부 (CH304)
		var vbAutoScalFeeCalc =  util.DataMap.getValue(app, "dmResOnLoad", "strAutoScalFeeCalc");
		if(vbAutoScalFeeCalc != "Y"){
			return;
		}
			
		//장학금지급코드
		util.DataMap.setValue(app, "dmReqKey", "strPmntCiiRcd", util.Control.getValue(app, "ipbFrfPmntCiiRcd"));
		//장학금자동계산 서브미션
		//strCommand: calcScalFee 
		util.Submit.send(app, "subCalcScalFee", function(pbSuccess) {
			if (pbSuccess) {
				
				var vnIdx = util.Grid.getIndex(app, "grdStudScal");
				
				// 계산된 장학금 셋팅
				var vsEntScal = util.DataMap.getValue(app, "dmCalcScalAmt", "strCalcEntAmt");
				var vsTutScal = util.DataMap.getValue(app, "dmCalcScalAmt", "strCalcTutAmt");
				var vsEtcScal = util.DataMap.getValue(app, "dmCalcScalAmt", "strCalcEtcAmt");
				var vsFnreDivRcd = util.DataMap.getValue(app, "dmCalcScalAmt", "strFnreDivRcd");
				
				util.Grid.setCellValue(app, "grdStudScal", "ETC_SCAL", vsEtcScal, vnIdx);
				util.Grid.setCellValue(app, "grdStudScal", "ENT_SCAL", vsEntScal, vnIdx);
				util.Grid.setCellValue(app, "grdStudScal", "TUT_SCAL", vsTutScal, vnIdx);
				util.Grid.setCellValue(app, "grdStudScal", "FNRE_DIV_RCD", vsFnreDivRcd, vnIdx);
				
				//2016.08.17 selectRow, copyNode를 하게되면 프리폼 valuechage 이벤트가 일어남
				// 그래서 리피트, 프리폼 따로 셋팅하도록 함
//				ExtRepeat.selectRow("rptStudScal", vnIdx);
				
				util.FreeForm.setValue(app, "frfStudScal", "ETC_SCAL", vsEtcScal, false);
				util.FreeForm.setValue(app, "frfStudScal", "ENT_SCAL", vsEntScal, false);
				util.FreeForm.setValue(app, "frfStudScal", "TUT_SCAL", vsTutScal, false);
				util.FreeForm.setValue(app, "frfStudScal", "FNRE_DIV_RCD", vsFnreDivRcd);
				
				// 장학금액 셋팅
				doSetChangedSum();
				
				// 처리 결과 메시지 
				var vsMsg = util.DataMap.getValue(app, "dmCalcScalAmt", "strMsg");
				if(!ValueUtil.isNull(vsMsg)){
					util.Msg.alert("vsMsg");
				}
			}
		});
	};
	
	/**
	 * doSetChangedSum 장학생 지급내역의 금액을 프리폼 장학금금액에 셋팅한다.
	 * @return void
	 * @author AeyoungLee 2016-05-12
	 */	
	function doSetChangedSum(){
		
		var vnEntScal = Number(util.FreeForm.getValue(app, "frfStudScal", "ENT_SCAL"));
		var vnTutScal = Number(util.FreeForm.getValue(app, "frfStudScal", "TUT_SCAL"));
		var vnEtcScal = Number(util.FreeForm.getValue(app, "frfStudScal", "ETC_SCAL"));
		
		var vnSum = vnEntScal + vnTutScal + vnEtcScal;
		util.FreeForm.setValue(app, "frfStudScal", "SCAL_AMT", vnSum, false);
		util.Grid.setCellValue(app, "grdStudScal", "SCAL_AMT", vnSum);
	};
	
	/**
	 * onValueChanged_IpbFrfTutScal 장학(수업료) 변경 이벤트
	 * @return void
	 * @author AeyoungLee 2016-05-12
	 */	
	moPage.onValueChanged_IpbFrfTutScal = function() {
		// 장학금액 셋팅
		doSetChangedSum();
	};
	
	/**
	 * onValueChanged_IpbFrfEntScal 장학(입학금) 변경 이벤트
	 * @return void
	 * @author AeyoungLee 2016-05-12
	 */	
	moPage.onValueChanged_IpbFrfEntScal = function() {
		// 장학금액 셋팅
		doSetChangedSum();
	};
	
	/**
	 * onValueChanged_IpbFrfEtcScal 장학(기타) 변경 이벤트
	 * @return void
	 * @author AeyoungLee 2016-05-12
	 */	
	moPage.onValueChanged_IpbFrfEtcScal = function() {
		// 장학금액 셋팅
		doSetChangedSum();
	};
	
	/**
	 * onValueChanged_IpbFrfStudAcctNo 계좌번호 변경 이벤트
	 * @return void
	 * @author AeyoungLee 2016-05-12
	 */	
	moPage.onValueChanged_IpbFrfStudAcctNo = function() {
		var vsValue = util.FreeForm.getValue(app, "frfStudScal", "STUD_ACCT_NO");
		var vsChkValue = "";
		//특수문자만 입력시 널처리
		var specialChars = /[-~!#$^&*=+|:;?"<,.>']/;
		vsValue.split(specialChars).join("");
		
		if (vsValue.match(/[0-9]/g) != null) {
			vsChkValue = vsValue.match(/[0-9]/g).join("");
		} else {
			vsChkValue =  "";
		}
		util.FreeForm.setValue(app, "frfStudScal", "STUD_ACCT_NO", vsChkValue, false);
	};
	return moPage;
};

