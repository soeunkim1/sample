
//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCrsCDeptRefundAply.xtm"/>


var extCrsCDeptRefundAply = function() {
		
	var moPage = new Page();
	var moPObject = new PObject();
	
	/**
	 * 학생검색팝업 관련 설정사항
	 */
	moPObject.moIdsForStdCsrPStSearch = [
	{
		controlId 		: "btnStudPop",
		iStudNo 		: "ipbStudId",	
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
		oStudNo 		: "ipbStudId",
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
	,{
		controlId 		: "btnFrfStudPop",
		iStudNo 		: "ipbFrfStudId",	
		iStudId 		: "",
		iStudNm 		: "",
		iKeyDate 		: "",
		iObjDivRcd 		: "", 
		iObjCd 			: "", 
		iObjNm 			: "",
		iAuthYN 		: "",
		iStatRcd 		: "",
		iStudDivRcd		: "",
		oStudId 		: "ipbFrfStudIdObj",
		oStudNo 		: "ipbFrfStudId",
		oStudNm 		: "optFrfRepNm",
		oStatNm 		: "optFrfStatNm",
		oStatRcd 		: "",
		oProcRslt 		: "",
		oProcRsltYear 	: "optFrfProcRsltYear",
		oSaNm			: "optFrfSaNm",
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
		func : function(voParam) {
			doGetRegScalInfo();
		}
	}
	];
	
	/**
	 * @desc  Header Import onLoad
	 * @return void
	 * @author Aeyoung Lee 2016-05-26
	 */
	moPage.onLoadImportDone_ImpTitle = function() {		
		doHeaderOnLoad();
	};
	
	/**
	 * @desc 온로드 실행
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-05-26
	 */
	moPage.onModelConstructDone_ExtCrsCDeptRefundAply = function() {
		//리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["rptRefundAply", "frfRefundAply"]);
		//검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grpData"]);
		//암호화컬럼 설정
		ExtRepeat.addOriginCol("rptRefundAply", ["STUD_ACCT_NO"]);
		
		doOnLoad();
	};
	
	/**
	 * @desc 온로드 실행
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016-05-26
	 */
	function doOnLoad(){
		// 서브미션 실행 (실패시 cover page)
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "cbbProcRsnRcd");
				
				// 현재일자 셋팅
				var vsSysdate = util.DataMap.getValue(app, "dmResOnLoad", "strSysdate").substring(0,8);
				util.Control.setValue(app, "ipbRefStDt", vsSysdate);
				util.Control.setValue(app, "ipbRefEndDt", vsSysdate);
				
				// 기준일자 = 현재일자
				util.DataMap.setValue(app, "dmReqKey", "strKeyDate", vsSysdate);
			}
		}, true);
	};
	
	/**
	 * @desc 팝업호출시 기준일자 셋팅
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-05-26
	 */
	function doSetPopKeyDate() {
		var vsSysdate = util.DataMap.getValue(app, "dmResOnLoad", "strSysdate").substring(0,8);
		
		moPObject.moIdsForStdCsrPStSearch[0].iKeyDate = vsSysdate;
		moPObject.moIdsForStdCsrPStSearch[1].iKeyDate = vsSysdate;
	};
	
	/**
	 * @desc 조회조건 학생 변경 이벤트
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-05-26
	 */
	moPage.onValueChanged_IpbStudId = function(sender) {
		doSetPopKeyDate();
		doOnChangeStdCsrPStSearch(sender);
	};
	
	/**
	 * @desc 조회조건 팝업 클릭 이벤트
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-05-26
	 */
	moPage.onClick_BtnStudPop = function(sender) {
		doSetPopKeyDate();
		doOnClickStdCsrPStSearch(sender);
	};
	
	/**
	 * @desc 조회 실행
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-05-26
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
	 * @desc  환불신청 목록을 조회한다.
	 * @param {Function} poCallBackFunc 콜백정의
	 * @return void
	 * @author Aeyoung Lee 2016-05-26
	 */
	function doList(poCallBackFunc) {
		
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdRefundAply");
				
				// 마스터 리피트 상태에 따른 디테일 프리폼 비활성화 제어
				doCompareFrfEnable();	
				
				if(util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
			}
		}); 
	};
	
	/**
	 * @desc   리피트 패널 체크
	 * @return void
	 * @author Aeyoung Lee 2016-05-26
	 */	
	moPage.onValueChanged_RhCkbSelect = function() {
		// 리피트 패널 설정
//TO-BE: <ExtRepeat.selectedAllPanel> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.selectedAllPanel("rhCkbSelect");
	};
	
	/**
	 * @desc   프리폼 변경시 리피트 반영
	 * @return void
	 * @author Aeyoung Lee 2016-05-26
	 */	
	moPage.onUpdate_FrfBase = function() {
		// 프리폼 업데이트내용 그리드 반영
//TO-BE: <ExtFreeForm.updateToRpt> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtFreeForm.updateToRpt("rptRefundAply", "frfRefundAply");
	}
	
	/**
	 * @desc   리피트 row select  이벤트
	 * @return void
	 * @author Aeyoung Lee 2016-05-26
	 */	
	moPage.onRowSelect_RptStudScal = function() {
		// 리피트 특정 row 데이터를 프리폼 copy
//TO-BE: <ExtRepeat.copyRowForm> 그리드-프리폼인 경우에는 selection바인딩으로 처리하기 때문에 불필요함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.copyRowForm("rptRefundAply","frfRefundAply");
		
		doCompareFrfEnable();
	};
		
	/**
	 * @desc  마스터 리피트 상태에 따른 디테일 프리폼 비활성화 제어
	 *			    1. index가 지정되지 않았을 경우
	 *			    2. 현재 index의 로우가 삭제 상태일 경우 
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016-05-26
	 */
	function doCompareFrfEnable() {
		var vnIdx = util.Grid.getIndex(app, "grdRefundAply");
		var vsStaus = util.Grid.getRowState(app, "grdRefundAply", vnIdx);
		
		// 마스터 로우 없을경우 프리폼 리셋
		var vsRowCnt = util.Grid.getRowCount(app, "grdRefundAply");
		if( vsRowCnt <= 0 || !vnIdx){
			util.Control.reset(app, "frfRefundAply");
		}	
		
		if( (!vnIdx) || vsStaus == "delete") {
			util.Control.setEnable(app, false, ["frfRefundAply"]);	
		}else{
			// 환불처리일 값이 잇는 경우 프리폼 비활성화
			var vsProcDt = util.Grid.getCellValue(app, "grdRefundAply", "PROC_DT", vnIdx);
			if(ValueUtil.isNull(vsProcDt)){
				util.Control.setEnable(app, true, ["frfRefundAply"]);	
				
				if(vsStaus == "insert"){
					ExtControl.setEnable (true, ["ipbFrfStudId", "btnFrfStudPop", "cbbFrfSchYearRcd", "cbbFrfSmtRcd", "cbbFrfItemCd"]);	
				}else{
					util.Control.setEnable(app, false, ["ipbFrfStudId", "btnFrfStudPop", "cbbFrfSchYearRcd", "cbbFrfSmtRcd", "cbbFrfItemCd"]);	
				}
				
				// 환불사유가 자퇴제적인 경우 환불금액 비활성화하고 환불율에 의해 자동계산되어지도록 함, 그 외는 직접입력
				var vsProcRsnRcd = util.Grid.getCellValue(app, "grdRefundAply", "PROC_RSN_RCD", vnIdx);
				if(vsProcRsnRcd == "CR30501"){
					util.Control.setEnable(app, false, ["ipbFrfAmt"]);
					util.Control.setEnable(app, true, ["iptFrfRefundTransRateNur", "iptFrfRefundTransRateDen"]);
				}else{
					util.Control.setEnable(app, true, ["ipbFrfAmt"]);
					util.Control.setEnable(app, false, ["iptFrfRefundTransRateNur", "iptFrfRefundTransRateDen"]);
				}	
				
			}else{
				util.Control.setEnable(app, false, ["frfRefundAply"]);	
			}	
		}	
	};	
	
	/**
	 * @desc 신규 click event
	 * @return void
	 * @author Aeyoung Lee 2016-05-26
	 */		
	moPage.onClick_BtnNew = function() {
		//해당 리피트 insertRow 후 편집 시작할 컬럼 지정		
		var vnNewRow = util.Grid.insertRow(app, "grdRefundAply");	
		
		var vsSchYearRcd  = util.DataMap.getValue(app, "dmResOnLoad", "strSchYearRcd");
		var vsSmtRcd      = util.DataMap.getValue(app, "dmResOnLoad", "strSmtRcd");
		var vsSysDate   = util.DataMap.getValue(app, "dmResOnLoad", "strSysdate");
		
		util.Grid.setCellValue(app, "grdRefundAply", "SCH_YEAR_RCD"	, vsSchYearRcd	 , vnNewRow);
		util.Grid.setCellValue(app, "grdRefundAply", "SMT_RCD"     	, vsSmtRcd		 , vnNewRow);
		util.Grid.setCellValue(app, "grdRefundAply", "INPUT_DT"	    , vsSysDate	 	 , vnNewRow);
		util.Grid.setCellValue(app, "grdRefundAply", "REG_CLS_RCD"	, "CR30101"	 	 , vnNewRow);	//등록금분류코드
		util.Grid.setCellValue(app, "grdRefundAply", "DESC_TYPE_RCD"	, "CR302REF"	 , vnNewRow);	//내역유형코드
		
		// 리피트 특정 row 데이터를 프리폼 copy
//TO-BE: <ExtRepeat.copyRowForm> 그리드-프리폼인 경우에는 selection바인딩으로 처리하기 때문에 불필요함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.copyRowForm("rptRefundAply","frfRefundAply", vnNewRow);
		
		doCompareFrfEnable();
		
		// 프리폼 항목 포커스
		util.Control.setFocus(app,  "ipbFrfStudId");
	};
	
	/**
	 * 프리폼 학생검색버튼클릭이벤트
	 * @param sender
	 * @type void
	 * @author AeyoungLee 2016-05-26
	 */	
	moPage.onClick_BtnFrfStudPop = function(sender){
		doSetPopKeyDate();
		doOnClickStdCsrPStSearch(sender);
	};
	
	/**
	 * 프리폼 학생변경이벤트
	 * @param sender
	 * @type void
	 * @author AeyoungLee 2016-05-26
	 */	
	moPage.onValueChanged_IpbFrfStudId = function(sender) {
		doSetPopKeyDate();
		doOnChangeStdCsrPStSearch(sender);
	};
	
	/**
	 * @desc 삭제 click event
	 * @return void
	 * @author Aeyoung Lee 2016-05-26
	 */	
	moPage.onClick_BtnDel = function() {
		
		var vsPanelCheckIdx = util.Grid.getCheckOrSelectedRowIndex(app, "grdRefundAply");
		var voPanelChk;
		
		if(String(vsPanelCheckIdx).indexOf(",") != -1){
			voPanelChk = vsPanelCheckIdx.split(",");
		}else{
			voPanelChk = new Array();
			voPanelChk[0] = vsPanelCheckIdx;
		}	
		
		for(var i = 0; i < voPanelChk.length; i++) {
			var vnRow = voPanelChk[i];
			var vsProcDt = util.Grid.getCellValue(app, "grdRefundAply", "PROC_DT", vnRow);
			
			if(!ValueUtil.isNull(vsProcDt)){
				// 환불처리가 완료된 건이 존재하여 삭제 불가능합니다.
				util.Msg.alert("NLS-CRS-M087");	
				util.Grid.selectRow(app, "grdRefundAply", vnRow);
				return;
			}
		}  
		
		// 삭제처리
		util.Grid.deleteRow(app, "grdRefundAply");
		
		// 로우가 없는 경우 rowSelect 이벤트가 일어나지 않으므로 이벤트 추가
		doCompareFrfEnable();
	};
	
	/**
	 * @desc 작업취소 click event
	 * @return void
	 * @author Aeyoung Lee 2016-05-26
	 */	
	moPage.onClick_BtnRestore = function() {
		util.Grid.restoreRow(app, "grdRefundAply");
		
		// 리피트 특정 row 데이터를 프리폼 copy
//TO-BE: <ExtRepeat.copyRowForm> 그리드-프리폼인 경우에는 selection바인딩으로 처리하기 때문에 불필요함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.copyRowForm("rptRefundAply","frfRefundAply");
		
		// 로우가 없는 경우 rowSelect 이벤트가 일어나지 않으므로 이벤트 추가
		doCompareFrfEnable();
	};
	
	/**
	 * @desc 작업저장 click event
	 * @return void
	 * @author Aeyoung Lee 2016-05-26
	 */	
	moPage.onClick_BtnSave = function() {
		// 리피터 변경사항 체크
		if(!util.Grid.isModified(app, ["grdRefundAply"], "MSG")){
			return false;
		}
		
		//리피트 validation check
		if(!util.validate(app, "grdRefundAply")) return false;
		
		//모든 데이터를 체크하기 위해 변경
		//strCommand: save 
		util.Submit.send(app, "subSave", function(pbSuccess){
			if(pbSuccess){
				
				// 신규시 pk_value 설정
				var vsPkSerialNo = util.DataMap.getValue(app, "dmRtnPkKeyInfo", "strInsSerialNo");
				if(!ValueUtil.isNull(vsPkSerialNo)){
					var vsPkValue = "STUD_ID:" + util.DataMap.getValue(app, "dmRtnPkKeyInfo", "strInsStudId") 
									+ ",SCH_YEAR_RCD:" + util.DataMap.getValue(app, "dmRtnPkKeyInfo", "strInsSchYearRcd") 
									+ ",SMT_RCD:" + util.DataMap.getValue(app, "dmRtnPkKeyInfo", "strInsSmtRcd")
									+ ",REG_CLS_RCD:" + util.DataMap.getValue(app, "dmRtnPkKeyInfo", "strInsRegClsRcd")
									+ ",ITEM_CD:" + util.DataMap.getValue(app, "dmRtnPkKeyInfo", "strInsItemCd")
									+ ",DESC_TYPE_RCD:" + util.DataMap.getValue(app, "dmRtnPkKeyInfo", "strInsDescTypeRcd")
									+ ",SERIAL_NO:" + util.DataMap.getValue(app, "dmRtnPkKeyInfo", "strInsSerialNo");
					ExtRepeat.setPkValues("rptRefundAply", vsPkValue);
				}	
				
				doList(function(pbListSuccess){
					if(pbListSuccess) util.Msg.notify(app, "NLS.INF.M025");
				});
			}
		});
	};
	
	/**
	 * 계좌번호 변경 이벤트
	 * @return void
	 * @author AeyoungLee 2016-05-26
	 */	
	moPage.onValueChanged_IpbFrfStudAcctNo = function() {
		var vsValue = util.FreeForm.getValue(app, "frfRefundAply", "STUD_ACCT_NO");
		var vsChkValue = "";
		//특수문자만 입력시 널처리
		var specialChars = /[-~!#$^&*=+|:;?"<,.>']/;
		vsValue.split(specialChars).join("");
		
		if (vsValue.match(/[0-9]/g) != null) {
			vsChkValue = vsValue.match(/[0-9]/g).join("");
		} else {
			vsChkValue =  "";
		}
		util.FreeForm.setValue(app, "frfRefundAply", "STUD_ACCT_NO", vsChkValue, false);
	};
	
	/**
	 * 환불금액 변경 이벤트 -> 저장시 체크로 변경
	 * @return void
	 * @author AeyoungLee 2016-05-26
	 */	
	moPage.onValueChanged_IpbFrfAmt = function() {
		
//		var vsValue = ExtFreeForm.getValue("frfRefundAply", "AMT");
//		
//		if(vsValue.length != 0 && Number(vsValue) < 1){
//			//-는 입력 안됨 : @은 0보다 큰수만 허용됩니다.
//			ComMsg.alert(NLS.CRS.M006, [NLS.NSCR.RFDAMT]);
//			ExtFreeForm.setValue("frfRefundAply", "AMT", "");
//			ExtControl.setFocus("ipbFrfAmt");
//			return;
//		}
	};
	
	/**
	 * @desc 환불신청 목록에 체크된 리피트 인덱스 배열 리턴
	 * @return Array 리피트에 체크된 인덱스 배열
	 * @author Aeyoung Lee 2016-05-26
	 */
	function doGetSelRowIdx() {
		
		var vsPanelCheckIdx = util.Grid.getCheckOrSelectedRowIndex(app, "grdRefundAply");
		var voPanelChk;
		
		if(String(vsPanelCheckIdx).indexOf(",") != -1){
			voPanelChk = vsPanelCheckIdx.split(",");
		}else{
			voPanelChk = new Array();
			voPanelChk[0] = vsPanelCheckIdx;
		}	
		
		return voPanelChk;
	};
	
	/**
	 * 환불 신청 버튼 클릭 이벤트
	 * @return void
	 * @author AeyoungLee 2016-05-26
	 */	
	moPage.onClick_BtnSaveAply = function() {
		// 환불신청 목록 선택 여부 체크
		var vnChekNodeLength = ExtInstance.getNodeListLength("/root/resList/rptRefundAply/row[child::DEL_CKB='Y']");
		if (vnChekNodeLength <= 0 ) {
			// "@(을)를 선택해주세요" 메시지 출력
			util.Msg.alert("NLS-INF-M045", [util.Grid.getTitle(app, "grdRefundAplyRefundAply")]);
			return false;
		}
		
		// 리피터 변경사항 체크
		if(util.Grid.isModified(app, ["grdRefundAply"])){
			//환불신청목록에 변경사항 있습니다. 먼저 저장하시기 바랍니다.
			util.Msg.alert("NLS-CRS-M088");
			return false;
		}
		
		util.Grid.setRowStateAll(app, "grdRefundAply", cpr.data.tabledata.RowState.UNCHANGED);
		var voPanelChk = moPage.doGetSelRowIdx();
		
		for(var i = 0; i < voPanelChk.length; i++) {
			var vnRow = voPanelChk[i];
			var vsProcPlanDt = util.Grid.getCellValue(app, "grdRefundAply", "PROC_PLAN_DT", vnRow);
			
			// 미신청 자료인지 체크
			if(!ValueUtil.isNull(vsProcPlanDt)){
				// 환불신청된 자료가 존재하여 처리불가합니다.
				util.Msg.alert("NLS-CRS-M089");	
				util.Grid.selectRow(app, "grdRefundAply", vnRow);
				util.Grid.setRowStateAll(app, "grdRefundAply", cpr.data.tabledata.RowState.UNCHANGED);
				return;
			}	
			
			// 은행, 계좌번호, 예금주 필수 입력 체크
			var vsStudBankRcd = util.Grid.getCellValue(app, "grdRefundAply", "STUD_BANK_RCD", vnRow);
			var vsStudAcctNo = util.Grid.getCellValue(app, "grdRefundAply", "STUD_ACCT_NO", vnRow);
			var vsOwnerNm = util.Grid.getCellValue(app, "grdRefundAply", "OWNER_NM", vnRow);
			
			if(ValueUtil.isNull(vsStudBankRcd)){
				util.Msg.alert("NLS-WRN-M100", [NLS.NSCR.BANK]);	
				util.Grid.selectRow(app, "grdRefundAply", vnRow);
				util.Control.setFocus(app, "cbbFrfStudBankCd");
				util.Grid.setRowStateAll(app, "grdRefundAply", cpr.data.tabledata.RowState.UNCHANGED);
				return;
			}	
			
			if(ValueUtil.isNull(vsStudAcctNo)){
				util.Msg.alert("NLS-WRN-M100", [NLS.NSCR.ACCT_NO]);	
				util.Grid.selectRow(app, "grdRefundAply", vnRow);
				util.Control.setFocus(app, "ipbFrfStudAcctNo");
				util.Grid.setRowStateAll(app, "grdRefundAply", cpr.data.tabledata.RowState.UNCHANGED);
				return;
			}	
			
			if(ValueUtil.isNull(vsOwnerNm)){
				util.Msg.alert("NLS-WRN-M100", [NLS.NSCR.OWNER_NM]);	
				util.Grid.selectRow(app, "grdRefundAply", vnRow);
				util.Control.setFocus(app, "ipbFrfOwerNm");
				util.Grid.setRowStateAll(app, "grdRefundAply", cpr.data.tabledata.RowState.UNCHANGED);
				return;
			}	
			
			util.Grid.setRowState(app, "grdRefundAply", cpr.data.tabledata.RowState.UPDATED, vnRow);
		}  
		
		// 환불신청처리 서브미션
		//strCommand: aplyRefund 
		util.Submit.send(app, "subAplyRefund", function(pbSuccess){
			if(pbSuccess){
				
				doList(function(pbListSuccess){	
					if(pbListSuccess){		
						//환불신청이 처리되었습니다.
						util.Msg.alert("NLS-CRS-M091");
						util.Msg.notify(app, "NLS.INF.M025");
					}
				});
			}else{
				util.Grid.setRowStateAll(app, "grdRefundAply", cpr.data.tabledata.RowState.UNCHANGED);	
			}	
		});
	}
	
	/**
	 * 환불신청취소 버튼 클릭 이벤트
	 * @return void
	 * @author AeyoungLee 2016-05-26
	 */	
	moPage.onClick_BtnSaveCancel = function() {
		// 환불신청 목록 선택 여부 체크
		var vnChekNodeLength = ExtInstance.getNodeListLength("/root/resList/rptRefundAply/row[child::DEL_CKB='Y']");
		if (vnChekNodeLength <= 0 ) {
			// "@(을)를 선택해주세요" 메시지 출력
			util.Msg.alert("NLS-INF-M045", [util.Grid.getTitle(app, "grdRefundAplyRefundAply")]);
			return false;
		}
		
		// 리피터 변경사항 체크
		if(util.Grid.isModified(app, ["grdRefundAply"])){
			//환불신청목록에 변경사항 있습니다. 먼저 저장하시기 바랍니다.
			util.Msg.alert("NLS-CRS-M088");
			return false;
		}
		
		util.Grid.setRowStateAll(app, "grdRefundAply", cpr.data.tabledata.RowState.UNCHANGED);
		var voPanelChk = doGetSelRowIdx();
		
		for(var i = 0; i < voPanelChk.length; i++) {
			var vnRow = voPanelChk[i];
			
			var vsProcPlanDt = util.Grid.getCellValue(app, "grdRefundAply", "PROC_PLAN_DT", vnRow);
			var vsProcDt = util.Grid.getCellValue(app, "grdRefundAply", "PROC_DT", vnRow);
			
			if(!(ValueUtil.isNull(vsProcDt) && !ValueUtil.isNull(vsProcPlanDt))){
				// 환불신청된 자료만 취소가능합니다. 처리불가합니다.
				util.Msg.alert("NLS-CRS-M090");	
				util.Grid.selectRow(app, "grdRefundAply", vnRow);
				util.Grid.setRowStateAll(app, "grdRefundAply", cpr.data.tabledata.RowState.UNCHANGED);
				return;
			}	
			
			util.Grid.setRowState(app, "grdRefundAply", cpr.data.tabledata.RowState.UPDATED, vnRow);
		}  
		
		// 환불신청취소 서브미션
		//strCommand: cancelRefund 
		util.Submit.send(app, "subCancelRefund", function(pbSuccess){
			if(pbSuccess){
				
				doList(function(pbListSuccess){
					if(pbListSuccess){		
						//환불신청취소가 처리되었습니다.
						util.Msg.alert("NLS-CRS-M092");
						util.Msg.notify(app, "NLS.INF.M025");
					}	
				});
			}else{
				util.Grid.setRowStateAll(app, "grdRefundAply", cpr.data.tabledata.RowState.UNCHANGED);	
			}	
		});
	};
	
	/**
	 * 기타증빙파일생성 버튼 클릭 이벤트
	 * @return void
	 * @author AeyoungLee 2016-11-09
	 */	
	moPage.onClick_BtnSaveFileCrt = function() {
		
		// 리피터 변경사항 체크
		if(util.Grid.isModified(app, ["grdRefundAply"])){
			//환불신청목록에 변경사항 있습니다. 먼저 저장하시기 바랍니다.
			util.Msg.alert("NLS-CRS-M088");
			return false;
		}
		
		// 배치처리전 커버페이지 씌우는 로직추가
		util.coverPage(app);
		
		//strCommand: crtFile 
		util.Submit.send(app, "subCrtFile", function(pbSuccessRun){
			if(pbSuccessRun){
				
				//파일이 생성되었습니다.
				util.Msg.alert("NLS-CRS-M109");
				util.Msg.notify(app, "NLS.CRS.M109");	
				
				// 파일 셋팅
				var vsFileDir = util.DataMap.getValue(app, "dmFileInfo", "strFileDir");		//파일디렉토리경로
				var vsFileNm = util.DataMap.getValue(app, "dmFileInfo", "strFileNm");		//파일명
				var vsFileChgNm = util.DataMap.getValue(app, "dmFileInfo", "strFileChgNm");	//변환파일명(실제 서버에 저장된 파일명)
				var strTmpFilePath = util.DataMap.getValue(app, "dmFileInfo", "strTmpFilePath");	
				
				var voFileParam = {
							"strFileSubPath" : "",
							"strFileNm" : vsFileChgNm,
							"strOriFileNm" : vsFileNm,
							"strTmpFilePath" : strTmpFilePath,
							"strCommand" : "fileDownLoad"
				}
				
				//다운로드 받을 파일 위치, 다운로드받을 파일이름, 프로그래스동작여부(일단 ""), actionUrl
				FileUtil.downloadFile( "/std.cmn.StdCmnFileTransUtil.ex",voFileParam);
			}else{
				//파일생성이 실패되었습니다.
				util.Msg.notify(app, "NLS.CRS.M110");	
			}	
			
			util.removeCover(app);
		});  
	};
	
	/**
	 * 학년도 변경이벤트
	 * @return void
	 * @author AeyoungLee 2016-11-09
	 */	
	moPage.onValueChanged_CbbFrfSchYearRcd = function() {
		doGetRegScalInfo();
	};
	
	/**
	 * 학기 변경이벤트
	 * @return void
	 * @author AeyoungLee 2016-11-09
	 */	
	moPage.onValueChanged_CbbFrfSmtRcd = function() {
		doGetRegScalInfo();
	};
	
	/**
	 * 등록금항목 변경이벤트
	 * @return void
	 * @author AeyoungLee 2016-11-09
	 */	
	moPage.onValueChanged_CbbFrfItemCd = function() {
		doGetRegScalInfo();
	};
	
	/**
	 * 학번, 학년도, 학기, 등록금항목 변경 시 등록금납입금액, 장학금액, 실납입액 조회 서브미션
	 * @return void
	 * @author AeyoungLee 2016-11-09
	 */	
	function doGetRegScalInfo() {
		
		var vsSchYearRcd = util.FreeForm.getValue(app, "frfRefundAply", "SCH_YEAR_RCD");
		var vsSmtRcd = util.FreeForm.getValue(app, "frfRefundAply", "SMT_RCD");
		var vsStudId = util.FreeForm.getValue(app, "frfRefundAply", "STUD_ID");
		var vsItemCd = util.FreeForm.getValue(app, "frfRefundAply", "ITEM_CD");
		
		if(ValueUtil.isNull(vsSchYearRcd) || ValueUtil.isNull(vsSmtRcd) || ValueUtil.isNull(vsStudId) || ValueUtil.isNull(vsItemCd)){
			util.FreeForm.setValue(app, "frfRefundAply", "REG_PAY_AMT", "");
			util.FreeForm.setValue(app, "frfRefundAply", "SCAL_AMT", "");
			util.FreeForm.setValue(app, "frfRefundAply", "REAL_PAY_AMT", "");
			return false;	
		}	
		
		util.DataMap.setValue(app, "dmReqStudKey", "strSchYearRcd", vsSchYearRcd);
		util.DataMap.setValue(app, "dmReqStudKey", "strSmtRcd", vsSmtRcd);
		util.DataMap.setValue(app, "dmReqStudKey", "strStudId", vsStudId);
		util.DataMap.setValue(app, "dmReqStudKey", "strItemCd", vsItemCd);
		
		//strCommand: regScalInfo 
		util.Submit.send(app, "subRegScalInfo", function(pbSuccess){
			if(pbSuccess){
				
				util.FreeForm.setValue(app, "frfRefundAply", "REG_PAY_AMT", util.DataMap.getValue(app, "dmRegScalInfo", "strRegPayAmt"));
				util.FreeForm.setValue(app, "frfRefundAply", "SCAL_AMT", util.DataMap.getValue(app, "dmRegScalInfo", "strScalAmt"));
				util.FreeForm.setValue(app, "frfRefundAply", "REAL_PAY_AMT", util.DataMap.getValue(app, "dmRegScalInfo", "strRealPayAmt"));
				
				// 환불율이 있는 경우 다시 계산하여 셋팅
				doGetCalcRefundInfo();
			}
			
		}); 
		
	};	
	
	/**
	 * 환불비율분자 변경이벤트
	 * @return void
	 * @author AeyoungLee 2016-11-16
	 */	
	moPage.onValueChanged_IptFrfRefundTransRateNur = function() {
		// 리프트 환불율 셋팅
		var vnRateNur = Number(util.FreeForm.getValue(app, "frfRefundAply", "REFUND_TRANS_RATE_NUR"));
		var vnRateDen = Number(util.FreeForm.getValue(app, "frfRefundAply", "REFUND_TRANS_RATE_DEN"));
		
		if(vnRateNur < 1 || vnRateDen < 1){
			util.Grid.setCellValue(app, "grdRefundAply", "REFUND_TRANS_RATE", "");	
		}else{
			util.Grid.setCellValue(app, "grdRefundAply", "REFUND_TRANS_RATE", vnRateNur + "/" + vnRateDen);	
		}
		
		doGetCalcRefundInfo();
	};
	
	/**
	 * 환불비율분모 변경이벤트
	 * @return void
	 * @author AeyoungLee 2016-11-16
	 */	
	moPage.onValueChanged_IptFrfRefundTransRateDen = function() {
		// 리프트 환불율 셋팅
		var vnRateNur = Number(util.FreeForm.getValue(app, "frfRefundAply", "REFUND_TRANS_RATE_NUR"));
		var vnRateDen = Number(util.FreeForm.getValue(app, "frfRefundAply", "REFUND_TRANS_RATE_DEN"));
		
		if(vnRateNur < 1 || vnRateDen < 1){
			util.Grid.setCellValue(app, "grdRefundAply", "REFUND_TRANS_RATE", "");	
		}else{
			util.Grid.setCellValue(app, "grdRefundAply", "REFUND_TRANS_RATE", vnRateNur + "/" + vnRateDen);	
		}
		
		doGetCalcRefundInfo();
	};
	
	/**
	 * 환불율 변경 시 실납입액 대비 계산 서브미션 호출
	 * @return void
	 * @author AeyoungLee 2016-11-15
	 */
	function doGetCalcRefundInfo() {
		
		var vsAmt = Number(util.FreeForm.getValue(app, "frfRefundAply", "REAL_PAY_AMT"));
		var vsRateNur = Number(util.FreeForm.getValue(app, "frfRefundAply", "REFUND_TRANS_RATE_NUR"));
		var vsRateDen = Number(util.FreeForm.getValue(app, "frfRefundAply", "REFUND_TRANS_RATE_DEN"));
		
		if(vsAmt < 1 || vsRateNur < 1 || vsRateDen < 1){
			util.FreeForm.setValue(app, "frfRefundAply", "AMT", "0");
			return false;	
		}	
		
		util.DataMap.setValue(app, "dmReqCalcKey", "strPayAmt", vsAmt);
		util.DataMap.setValue(app, "dmReqCalcKey", "strRateNur", vsRateNur);
		util.DataMap.setValue(app, "dmReqCalcKey", "strRateDen", vsRateDen);
		
		// 환불금액 계산 서브미션
		//strCommand: calcRefundInfo 
		util.Submit.send(app, "subCalcRefundInfo", function(pbSuccess){
			if(pbSuccess){
				util.FreeForm.setValue(app, "frfRefundAply", "AMT", util.DataMap.getValue(app, "dmCalcRefundInfo", "strCalcRefundAmt"));
			}
		}); 
	};
	
	/**
	 * 환불사유 변경시 환불금액, 환불율 컨트롤 제어
	 * @return void
	 * @author AeyoungLee 2016-11-15
	 */
	moPage.onValueChanged_CbbFrfProcRsnRcd = function() {
		// 환불사유가 자퇴제적인 경우 환불금액 비활성화하고 환불율에 의해 자동계산되어지도록 함, 그 외는 직접입력
		var vsProcRsnRcd = util.FreeForm.getValue(app, "frfRefundAply", "PROC_RSN_RCD");
		if(vsProcRsnRcd == "CR30501"){
			util.Control.setEnable(app, false, ["ipbFrfAmt"]);
			util.Control.setEnable(app, true, ["iptFrfRefundTransRateNur", "iptFrfRefundTransRateDen"]);
		}else{
			util.Control.setEnable(app, true, ["ipbFrfAmt"]);
			util.Control.setEnable(app, false, ["iptFrfRefundTransRateNur", "iptFrfRefundTransRateDen"]);
			
			util.FreeForm.setValue(app, "frfRefundAply", "REFUND_TRANS_RATE_NUR", "");
			util.FreeForm.setValue(app, "frfRefundAply", "REFUND_TRANS_RATE_DEN", "");
			util.Grid.setCellValue(app, "grdRefundAply", "REFUND_TRANS_RATE_NUR", "");
			util.Grid.setCellValue(app, "grdRefundAply", "REFUND_TRANS_RATE_DEN", "");
		}		
	};
	return moPage;
};
