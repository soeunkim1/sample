//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./stdCssCScalFee.xtm"/>

/**
 * 장학금관리
 * @class stdCssCScalFee
 * @author Aeyoung Lee 2016. 2. 23
 */
var stdCssCScalFee = function() {
	var moPage = new Page();
	// 임포트용 데이터 통신 오브젝트
	var moPObject = new Page();
		
	// 탭 정의
	var TAB = {
		MANAGE	: "tabManage",
		HIS    	: "tabHistory",
		LAN   	: "tabLan",
		PMNT   	: "tabPmnt",
		QUAL   	: "tabQual"
	};
		
	// 탭버튼 정의
	var TAB_BTN = {
		tabManage	: "tabBtnManage",
		tabHistory	: "tabBtnHistory",
		tabLan    	: "tabBtnLan",
		tabPmnt    	: "tabBtnPmnt",
		tabQual    	: "tabBtnQual"
	};
	
	// 객체검색팝업 호출
	moPObject.moIdsForStdCmnPObjSch = [
	{
		controlId		:	"btnFrfDeptPop",
		iCd				:	"",
		iNm				:	"ipbFrfDeptNmBase",
		iObjDivRcd		:	["CC009OG"],
		iStartObject   	:   "",
		iOtDivRcd		:	"",
		iOtIsTreeView	:	"",
		iLanDivRcd		:	"/root/resOnLoad/strSystemLan",
		iKeyDate		:	"dipKeyDt",
		iKeyEndDate		:	"",
		oObjDivRcd		:	"",
		oCd				:	"ipbFrfDeptCdBase",
		oCdNm			:	"ipbFrfDeptNmBase",
		oBegDt			:	"",
		oEndDt			:	"",
		oLanDivRcd		:	"",
		func 			:  null
	}];
	
	// 재단검색팝업 호출
	moIdsForStdCssPFndtnPop = [
	{ 
		controlId		: "btnFrfFndtnPop",		
		iKeyDate		: "dipKeyDt",			
		iScalFndtnCd	: "",					
		iScalFndtnNm	: "ipbFrfScalFndtnNmBase",
		oScalFndtnCd	: "ipbFrfScalFndtnCdBase",	
		oScalFndtnNm	: "ipbFrfScalFndtnNmBase",			
		oStDt			: "",			
		oEndDt			: "",			
		oRepNm			: "",				
		oChagDeptNm	: "",					
		oInturNm		: "",				
		oAddr1			: "",				
		oAddr2			: "",				
		oDrtTelNo		: "",				
		func 			: null
	}];
	
	var msSystemLanDivRcd = "";
	var msCurrentDt = "";
	var msKeyDt = "";
	
	/**
	 * @desc import 헤더 초기화
	 * @param 
	 * @return  void
	 * @author Aeyoung Lee 2016. 2. 23
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		// import 헤더 초기화
		doHeaderOnLoad();
	};
	
	/**
	 * @desc OnLoad 이벤트
	 * @param 
	 * @return  void
	 * @author Aeyoung Lee 2016. 2. 23
	 */
	function doOnLoad() {
		// 리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["rptBase","frfBase","rptBaseHistory","rptBaseLan","rptPmntAmt","rptQualCii"]);
		// 검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grpData", "grpDataDtl"]);
		
		// 데이터관리  tab으로 이동
		ExtTab.setTabBtn("tabMain", TAB_BTN.tabManage);
		util.Tab.setSelectedTabItem(app, "tabMain", TAB.MANAGE);
		
		// 기준일자 조회하는 내부 팝업 호출을 위한 단위시스템코드 설정
		setUnitSystem("CSS");
		
		// 서브미션 호출
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, ["cbbScalFeeCls1","cbbScalFeeCls2","cbbScalFeeCls3","cbbScalFeeCls4","cbbScalFeeCls5"]);
				
				msSystemLanDivRcd = util.DataMap.getValue(app, "dmResOnLoad", "strSystemLan");
				msCurrentDt = util.DataMap.getValue(app, "dmResOnLoad", "strCutDt");
				msKeyDt = util.DataMap.getValue(app, "dmResOnLoad", "strKeyDt");
				
				util.Control.setValue(app, "dipKeyDt", msKeyDt);	
				//ExtControl.setValue("dipKeyDtHistory", msKeyDt);	
				
				util.Control.setFocus(app, "ipbScalNm");
			}
		}, true);
	};
	
	/**
	 * @desc 기준일자(돋보기버튼) onClick 이벤트
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 2. 23
	 */
	moPage.onClick_BtnYearSmt = function() {
		//기준일자 임포트(달력컨트롤ID,임포트ID)
		doOnclickSchYearSmt("dipKeyDt","impSchYearSmt");
	};
	
	/**
	 * @desc 기준일자 Enter KeyDown 이벤트
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 2. 23
	 */
	moPage.onKeyUp_DipKeyDt = function(strKeyType, strKeyStatus) {
		// 엔터키 입력시 조회
		if(e.keyCode == cpr.events.KeyCode.ENTER){
			util.Header.clickSearch(app);
		}
	};

	/**
	 * @desc 장학금명 Enter KeyDown 이벤트
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 2. 23
	 */
	moPage.onKeyDown_IpbScalNm= function(strKeyType, strKeyStatus) {
		// 엔터키 입력시 조회
		if(e.keyCode == cpr.events.KeyCode.ENTER){
			util.Header.clickSearch(app);
		}
	}
	
	/**
	 * @desc 조회 onClick 이벤트
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 2. 23
	 */
	moPage.onClick_BtnSearch = function() {
		 // 작업영역 리피트 변경 내역 체크
		if(util.Grid.isModified(app, "", "CRM")){
			return false;
		}
		
		// 조회조건 필수 체크
		if(!util.validate(app, ["dipKeyDt"])){
			return false;
		}
		
		// 데이터관리  tab으로 이동
		ExtTab.setTabBtn("tabMain", TAB_BTN.tabManage);
		util.Tab.setSelectedTabItem(app, "tabMain", TAB.MANAGE);
		
		// pkValue 초기화
		ExtRepeat.setPkValues("rptBase", "");
		
		// 조회
		doList(function(pbSuccess) {
			if (pbSuccess){
				
				if(util.Grid.getRowCount(app, "grdBase") == 0){
					// 데이터관리  tab으로 이동
					ExtTab.setTabBtn("tabMain", TAB_BTN.tabManage);
					util.Tab.setSelectedTabItem(app, "tabMain", TAB.MANAGE);
					// 마스터 리피트 상태에 따른 디테일 프리폼 비활성화 제어
					doCompareFrfEnable();
					
					// "조회된 내역이 없습니다."
					util.Msg.notify(app, "NLS.WRN.M005");
				}else{
					// "조회되었습니다."
					util.Msg.notify(app, "NLS.INF.M024");	
				}	
			}
		});
	};
	
	/**
	 * @desc 장학금목록 조회
	 * @param poCallBackFunc 콜백정의
	 * @return void
	 * @author Aeyoung Lee 2016. 2. 23
	 */
	function doList(poCallBackFunc) {
		//strCommand: listBase 
		util.Submit.send(app, "subBaseList", function(pbSuccess){
			if(pbSuccess){
				
				util.Control.redraw(app, "grdBase");
				
//				// 폐기처리로 인해 데이터가 없어질경우 [데이터관리] 텝으로 이동하기 위함.
//				var strTmpCd = ExtInstance.getValue("/root/reqSelRow/strTmpScalFndtnCd");
//				var vnLength = ExtInstance.getNodeListLength("/root/resList/rptBase/row[child::SCAL_FNDTN_CD = '"+ strTmpCd +"']");
//				if(ValueUtil.isNull(strTmpCd) || vnLength == 0){
					if(util.Grid.getRowCount(app, "grdBase") == 0){
						// 데이터관리  tab으로 이동
						ExtTab.setTabBtn("tabMain", TAB_BTN.tabManage);
						util.Tab.setSelectedTabItem(app, "tabMain", TAB.MANAGE);
						// 마스터 리피트 상태에 따른 디테일 프리폼 비활성화 제어
						doCompareFrfEnable();
					}
//					ExtModel.dispatch("tabBtnManage","DOMActivate");
//				}
				
			} 
			
			// 조회 후 콜백함수 수행
			if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
		});
	};
	
	/**
	 * @desc [rptBase]장학금목록 onRowSelect 이벤트
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 2. 23
	 */
	moPage.onRowSelect_RptBase = function() {
		
		util.DataMap.setValue(app, "dmReqKey", "strScalFeeCd", util.Grid.getCellValue(app, "grdBase", "SCAL_FEE_CD"));  // 장학금코드
		util.DataMap.setValue(app, "dmReqKey", "strScalFeeNm", util.Grid.getCellValue(app, "grdBase", "SCAL_FEE_NM"));  // 장학금
		util.DataMap.setValue(app, "dmReqKey", "strRefKey"	, util.Grid.getCellValue(app, "grdBase", "REF_KEY")); 	  // 참조키
		util.DataMap.setValue(app, "dmReqKey", "strLanDivRcd", util.Grid.getCellValue(app, "grdBase", "LAN_DIV_RCD"));  // 언어구분
		
		var vsSelTabId = util.Tab.getSelectedId(app, "tabMain");
		doTabChange(vsSelTabId);
	};
	
	/**
	 * @desc  마스터 리피트 상태에 따른 디테일 프리폼 비활성화 제어
	 *			    1. index가 지정되지 않았을 경우
	 *			    2. 현재 index의 로우가 삭제 상태일 경우 
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 2. 23
	 */
	function doCompareFrfEnable() {
		
		var vnIdx = util.Grid.getIndex(app, "grdBase");
		var vsStaus = util.Grid.getRowState(app, "grdBase", vnIdx);
		
		// 마스터 로우 없을경우 프리폼 리셋
		if(!vnIdx) util.Control.reset(app, "frfBase");
		
		if( (!vnIdx) || vsStaus == "delete") {
			util.Control.setEnable(app, false, ["frfBase"]);	
		}else{
			
			util.Control.setEnable(app, true, ["frfBase"]);
			
			// 신규일때만 활성화처리 그 외(복사 등) 비활성화
			var vsFlagGbn = util.Grid.getCellValue(app, "grdBase", "FLAG_GBN", vnIdx);
			if( vsStaus == "insert" && vsFlagGbn != "C"){
				//ExtControl.setEnable(true, "ipbFrfScalFeeCdBase");
				util.Control.setReadOnly(app, false, "ipbFrfScalFeeCdBase");
			}
			else{
				//ExtControl.setEnable(false, "ipbFrfScalFeeCdBase");
				util.Control.setReadOnly(app, true, "ipbFrfScalFeeCdBase");
			}	
		}	
	};
	
	/**
	 * @desc [tabBtnManage]데이터관리 onClick 이벤트
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 2. 23
	 */
	moPage.onClick_TabBtnManage = function() {
		doTabChange(TAB.MANAGE);
	};
	
	/**
	 * @desc [tabBtnHistory]이력관리 onClick 이벤트
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 2. 23
	 */
	moPage.onClick_TabBtnHistory = function() {
		doTabChange(TAB.HIS);
	};
	
	/**
	 * @desc [tabBtnLan]언어 onClick 이벤트
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 2. 23
	 */
	moPage.onClick_TabBtnLan = function() {
		doTabChange(TAB.LAN);
	};
	
	/**
	 * @desc [tabBtnPmnt]지급금액기준 onClick 이벤트
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 2. 23
	 */
	moPage.onClick_TabBtnPmnt = function() {
		doTabChange(TAB.PMNT);
	}
	
	/**
	 * @desc [tabBtnQual]자격기준 onClick 이벤트
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 2. 23
	 */
	moPage.onClick_TabBtnQual = function() {
		doTabChange(TAB.QUAL);
	}
	
	/**
	 * @desc 탭 변경시
	 * @param  {String} psCaseId 탭페이지명
	 * @return void
	 * @author Aeyoung Lee 2016. 2. 24
	 */
	function doTabChange(psCaseId) {
		// 장학금목록 선택된 ROW 검사
		var vnSelectRowIdx = util.Grid.getIndex(app, "grdBase");
		
		if (!vnSelectRowIdx) {
			// 데이터관리 프리폼 초기화
			util.Control.reset(app, "frfBase");
			// 데이터관리  tab으로 이동
			ExtTab.setTabBtn("tabMain", TAB_BTN.tabManage);
			util.Tab.setSelectedTabItem(app, "tabMain", TAB.MANAGE);
			
			return;
		}
		
		util.Control.setEnable(app, true, ["grpData"]);
		
		// 선택된 TAB
		var vsSelTabId = util.Tab.getSelectedId(app, "tabMain");
		
		// 1. 현재 선택된 탭의 상태 체크
		if(psCaseId != vsSelTabId){
			switch (vsSelTabId) {
				// 1-1. 데이터관리
				case TAB.MANAGE : {
					// 데이터관리 변경내역 있는 경우
					if(util.Grid.isModified(app, ["grdBase"], "CRM") ){
						// tab 이동 하지 않음
						ExtTab.setTabBtn("tabMain", TAB_BTN[vsSelTabId]);
						return false;
					}else{
						// 재단 목록 변경이 일어난 후 다른탭으로 이동시 리셋 처리
						if(util.Grid.isModified(app, ["grdBase"])){
							util.Grid.revertAllData(app, "grdBase");
							util.Control.reset(app, "frfBase");
						}
					}	
					break;
				}
				
				// 1-2. 이력관리
				case TAB.HIS : {
					// 이력관리 리피트 변경내역 있는 경우
					if(util.Grid.isModified(app, ["grdBaseHistory"], "CRM")){
						// tab 이동 하지 않음
						ExtTab.setTabBtn("tabMain", TAB_BTN[vsSelTabId]);
						return false;
					}else{
						// 리셋 처리
						if(util.Grid.isModified(app, ["grdBaseHistory"]) ){
							util.Grid.revertAllData(app, "grdBaseHistory");
						}
					}
					break;
				}
				
				// 1-3. 언어
				case TAB.LAN : {
					// 언어 리피트 변경내역 있는 경우
					if(util.Grid.isModified(app, ["grdBaseLan"], "CRM")){
						// tab 이동 하지 않음
						ExtTab.setTabBtn("tabMain", TAB_BTN[vsSelTabId]);
						return false;
					}else{
						// 언어 목록 변경이 일어난 후 다른탭으로 이동시 리셋 처리
						if(util.Grid.isModified(app, ["grdBaseLan"])){
							util.Grid.revertAllData(app, "grdBaseLan");
							util.Control.reset(app, "frfBaseLan");
						}
					}
					break;
				}
				
				// 1-4. 지급금액기준
				case TAB.PMNT : {
					// 지급금액기준 리피트 변경내역 있는 경우
					if(util.Grid.isModified(app, ["grdPmntAmt"], "CRM")){
						// tab 이동 하지 않음
						ExtTab.setTabBtn("tabMain", TAB_BTN[vsSelTabId]);
						return false;
					}else{
						// 지급금액기준 변경이 일어난 후 다른탭으로 이동시 리셋 처리
						if(util.Grid.isModified(app, ["grdPmntAmt"])){
							util.Grid.revertAllData(app, "grdPmntAmt");
						}
					}
					break;
				}
				
				// 1-5. 자격기준
				case TAB.QUAL : {
					// 자격기준 리피트 변경내역 있는 경우
					if(util.Grid.isModified(app, ["grdQualCii"], "CRM")){
						// tab 이동 하지 않음
						ExtTab.setTabBtn("tabMain", TAB_BTN[vsSelTabId]);
						return false;
					}else{
						// 자격기준 변경이 일어난 후 다른탭으로 이동시 리셋 처리
						if(util.Grid.isModified(app, ["grdQualCii"])){
							util.Grid.revertAllData(app, "grdQualCii");
						}
					}
					break;
				}
			}
		}
	
		// 2. 탭변경
		util.Tab.setSelectedTabItem(app, "tabMain", psCaseId);
		
		// 3. 탭변경 후 처리 로직
		switch (psCaseId) {
			// 3-1. 데이터관리 조회
			case TAB.MANAGE : {
				doListDtl();
				break;
			}
			// 3-2. 이력관리 조회
			case TAB.HIS : {
				doListHistory();
				break;
			}
			// 3-3. 언어 조회
			case TAB.LAN : {
				doListLan();
				break;
			}
			// 3-4. 지급금액기준 조회
			case TAB.PMNT : {
				doListPmnt();
				break;
			}
			// 3-5. 자격기준 조회
			case TAB.QUAL : {
				doListQual();
				break;
			}
		}
	};
	
	/**
	 * @desc 장학금(프리폼) 조회
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 2. 24
	 */
	function doListDtl() {
		// 리피트 특정 row 데이터를 프리폼 copy
//TO-BE: <ExtRepeat.copyRowForm> 그리드-프리폼인 경우에는 selection바인딩으로 처리하기 때문에 불필요함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.copyRowForm("rptBase","frfBase");
		
		// 마스터 리피트 상태에 따른 디테일 프리폼 비활성화 제어
		doCompareFrfEnable();
	};
	
	/**
	 * @desc 히스토리(이력)목록 조회
	 * @param poCallBackFunc 콜백정의
	 * @return void
	 * @author Aeyoung Lee 2016. 2. 24
	 */
	function doListHistory(poCallBackFunc) {
		
		util.Control.setValue(app, "dipKeyDtHistory", util.DataMap.getValue(app, "dmReqKey", "strKeyDt"));
		
		// 이력관리 조회 서브이션 
		//strCommand: listBaseHist 
		util.Submit.send(app, "subBaseListHistory", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdBaseHistory");
			}
			
			// 조회 후 콜백함수 수행
			if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
		});
	};
	
	/**
	 * @desc 언어목록 조회
	 * @param poCallBackFunc 콜백정의
	 * @return void
	 * @author Aeyoung Lee 2016. 2. 24
	 */
	function doListLan(poCallBackFunc) {
		
		// 언어목록 조회 서브이션 
		//strCommand: listBaseLan 
		util.Submit.send(app, "subBaseListLan", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdBaseLan");
				
				if(util.Grid.getRowCount(app, "grdBaseLan") <= 0){
					util.Control.reset(app, "frfBaseLan");
					// 프리폼 비활성화 제어
					doCompareFrfEnableLan();	
				}	
			}
			
			// 조회 후 콜백함수 수행
			if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
		});
	};
	
	/**
	 * @desc 지급금액기준목록 조회
	 * @param poCallBackFunc 콜백정의
	 * @return void
	 * @author Aeyoung Lee 2016. 2. 25
	 */
	function doListPmnt(poCallBackFunc) {
		
		util.Control.redraw(app, ["ipbScalFeeCdPmnt","ipbScalFeeNmPmnt"]);
		
		// 언어목록 조회 서브이션 
		//strCommand: listPmntAmtCii 
		util.Submit.send(app, "subPmntAmtCiiList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdPmntAmt");
			}
			
			// 조회 후 콜백함수 수행
			if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
		});
	};
	
	/**
	 * @desc 자격기준목록 조회
	 * @param poCallBackFunc 콜백정의
	 * @return void
	 * @author Aeyoung Lee 2016. 2. 26
	 */
	function doListQual(poCallBackFunc) {
		
		util.Control.redraw(app, ["ipbScalFeeCdQual","ipbScalFeeNmQual"]);
		
		// 언어목록 조회 서브이션 
		//strCommand: listQualCii 
		util.Submit.send(app, "subQualCiiList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdQualCii");
			}
			
			// 조회 후 콜백함수 수행
			if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
		});
	};
	
	/**
	 * @desc [frfBase]장학금 onUpdate 이벤트
	 * @param 
	 * @return  
	 * @author Aeyoung Lee 2016. 2. 24
	 */
	moPage.onUpdate_FrfBase = function() {
		// 프리폼 업데이트내용 그리드 반영
//TO-BE: <ExtFreeForm.updateToRpt> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtFreeForm.updateToRpt("rptBase", "frfBase");
	};
	
	/**
	 * @desc [btnFrfDeptPop]행정부서 검색 버튼 클릭
	 * @param sender
	 * @return  
	 * @author Aeyoung Lee 2016. 2. 24
	 */
	moPage.onClick_BtnFrfDeptPop = function(sender) {
		doOnClickStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc [ipbFrfDeptNmBase]행정부서 값변경 이벤트
	 * @param sender
	 * @return  
	 * @author Aeyoung Lee 2016. 2. 24
	 */
	moPage.onValueChanged_IpbFrfDeptNmBase = function(sender) {
		doOnChangeStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc [btnFrfFndtnPop]재단 검색 버튼 클릭
	 * @param sender
	 * @return  
	 * @author Aeyoung Lee 2016. 2. 24
	 */
	moPage.onClick_BtnFrfFndtnPop = function(sender) {
		doOnClickStdCssPFndtnPop(sender);
	};
	
	/**
	 * @desc [ipbFrfScalFndtnNmBase]재단 값변경 이벤트
	 * @param sender
	 * @return  
	 * @author Aeyoung Lee 2016. 2. 24
	 */
	moPage.onValueChanged_IpbFrfScalFndtnNmBase = function(sender) {
		doOnChangeStdCssPFndtnPop(sender);
	};
	
	/**
	 * @desc [ipbFrfScalFeeCdBase] 장학금코드 변경 이벤트
			- 장학금코드가 이미 사용중인 건인지 체크
	 * @param 
	 * @return  
	 * @author Aeyoung Lee 2016. 2. 24
	 */
	moPage.onValueChanged_IpbFrfScalFeeCdBase = function() {
		
		var vsStatus = util.Grid.getRowState(app, "grdBase");
		
		if(vsStatus == "insert"){
			
			util.DataMap.setValue(app, "dmReqCheck", "strScalFeeCd", util.Control.getValue(app, "ipbFrfScalFeeCdBase"));	// 장학금코드
			util.DataMap.setValue(app, "dmReqCheck", "strStDt"	  , "");	
			util.DataMap.setValue(app, "dmReqCheck", "strEndDt"	  , "");	
			
			//strCommand: checkScalFeeCd 
			util.Submit.send(app, "subCheckScalFeeCd", function(pbSuccess){
				if(pbSuccess){
					var vsCnt = util.DataMap.getValue(app, "dmResList", "resultCount");
					if(Number(vsCnt) > 0){
						util.Msg.alert("NLS-CSS-M078");
						util.Control.setValue(app, "ipbFrfScalFeeCdBase", "");
					}
				}
			});
		}	
	};
	
	/**
	 * @desc [btnCopy]복사 onClick 이벤트
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 2. 24
	 */
	moPage.onClick_BtnCopy = function() {
		// 데이터관리 변경내역 있는 경우
		if(util.Grid.isModified(app, ["grdBase"])){
			var vsMsgParam = ExtControl.getTextValue("lblTitleFrfBase");
			//@의 시점 복사 작업은 [작업저장]후 진행하시기 바랍니다.
			util.Msg.alert("NLS-CSS-M089", [vsMsgParam]);
			return false;
		}	
		
		// 기준일자 필수 체크
		if(!util.validate(app, ["dipKeyDt"])){
			return false;
		}
		
		// 마스터 리피트 row 선택여부 체크
		var vnOrgRowIdx = util.Grid.getIndex(app, "grdBase");
		if(vnOrgRowIdx == "0"){
			var vsMsgParam = util.Grid.getTitle(app, "grdBaseBase");
			// "@(을)를 선택해주세요" 메시지 출력
			util.Msg.alert("NLS-INF-M045", [vsMsgParam]);
			return;
		}
		
		var vsStDt = util.Grid.getCellValue(app, "grdBase", "ST_DT", vnOrgRowIdx).substring(0, 8);
		var vsEndDt = util.Grid.getCellValue(app, "grdBase", "END_DT", vnOrgRowIdx).substring(0, 8);
		var vsKeyDate = util.DataMap.getValue(app, "dmReqKey", "strKeyDt").substring(0, 8);
		
		if(vsEndDt != "99991231"){
			// 종료일이 9999-12-31인 데이터만 @1할 수 있습니다. 
			util.Msg.alert("NLS-CSS-M001", [NLS.NSCR.COPY]);
			return;
		}	
		
		if(vsStDt >= vsKeyDate){
			// 기준일자는 유효기간의 시작일보다 이후여야 합니다. 
			util.Msg.alert("NLS-CSS-M003");
			return;
		}	
		
		// 폐기여부 확인--??
		if(Number(vsEndDt) <= Number(vsKeyDate)){
			var vsMsgParam = ExtControl.getTextValue("lblTitleFrfBase");
			// "폐기된 @은(는) 복사할 수 없습니다. 이력관리 탭에서 복구해주시기 바랍니다." 메시지 출력.
			util.Msg.alert("NLS-WRN-M208", [vsMsgParam]);
			return;
		}
		
		// 신규로우 추가
		var vnNextRow   = util.Grid.insertRow(app, "grdBase", null, vnOrgRowIdx);
		
		ExtRepeat.copyToRowData("rptBase", vnOrgRowIdx, "rptBase", vnNextRow);
		
		// 기본값 세팅
		util.Grid.setCellValue(app, "grdBase", "UPT_STATUS", "N"					, vnNextRow);
		util.Grid.setCellValue(app, "grdBase", "LAN_DIV_RCD", msSystemLocale		, vnNextRow);
		util.Grid.setCellValue(app, "grdBase", "ST_DT"	   , vsKeyDate+"000000"	, vnNextRow);
		util.Grid.setCellValue(app, "grdBase", "END_DT"	   , "99991231000000"	, vnNextRow);
		util.Grid.setCellValue(app, "grdBase", "REF_KEY"	   , ""					, vnNextRow);
		util.Grid.setCellValue(app, "grdBase", "FLAG_GBN"   , "C"				, vnNextRow);
		
//TO-BE: <ExtRepeat.copyRowForm> 그리드-프리폼인 경우에는 selection바인딩으로 처리하기 때문에 불필요함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.copyRowForm("rptBase","frfBase", vnNextRow);
		
		// 셋팅하고 로우체인지가 일어나는게 아니므로 호출해야함
		doCompareFrfEnable();	
		
		// 프리폼 항목 포커스
		util.Control.setFocus(app,  "ipbFrfScalFeeNmBase");
	};
	
	/**
	 * @desc [btnNew]신규 onClick 이벤트
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 2. 24
	 */
	moPage.onClick_BtnNew = function() {
		// 복사한 이력이 존재하는지 확인
		var vnCopyNodeLength = ExtInstance.getNodeListLength("/root/resList/rptBase/row[child::FLAG_GBN='C']");
		if(vnCopyNodeLength > 0){
			//복사중인 데이터가 있습니다. 저장 후 진행하세요.
			util.Msg.alert("NLS-CSS-M088");
			return false;
		}
		
		// 기준일자 필수 체크
		if(!util.validate(app, ["dipKeyDt"])){
			return false;
		}
		
		// 신규로우 추가
		var vnIdx = util.Grid.insertRow(app, "grdBase");
		
		// 신규 Defalut값 설정 
		util.Grid.setCellValue(app, "grdBase", "ST_DT", util.DataMap.getValue(app, "dmReqKey", "strKeyDt"), vnIdx);
		util.Grid.setCellValue(app, "grdBase", "END_DT", "99991231000000", vnIdx);
		util.Grid.setCellValue(app, "grdBase", "OBJ_DIV_RCD", "CC009SS", vnIdx);
		util.Grid.setCellValue(app, "grdBase", "DEPT_OBJ_DIV_RCD", "CC009OG", vnIdx);
		util.Grid.setCellValue(app, "grdBase", "LAN_DIV_RCD", msSystemLocale, vnIdx);
		util.Grid.setCellValue(app, "grdBase", "FLAG_GBN", "N", vnIdx);
		
		// 리피트 특정 row 데이터를 프리폼 copy
//TO-BE: <ExtRepeat.copyRowForm> 그리드-프리폼인 경우에는 selection바인딩으로 처리하기 때문에 불필요함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.copyRowForm("rptBase","frfBase");
		
		// 셋팅하고 로우체인지가 일어나는게 아니므로 호출해야함
		doCompareFrfEnable();	
		
		// 프리폼 항목 포커스
		util.Control.setFocus(app,  "ipbFrfScalFeeCdBase");
	};
	
	/**
	 * @desc [btnDel]삭제 onClick 이벤트
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 2. 24
	 */
	moPage.onClick_BtnDel = function() {
		
		// 마스터 리피트 row 선택여부 체크
		var vnOrgRowIdx = util.Grid.getIndex(app, "grdBase");
		if(vnOrgRowIdx == "0"){
			var vsMsgParam = util.Grid.getTitle(app, "grdBaseBase");
			// "@(을)를 선택해주세요" 메시지 출력
			util.Msg.alert("NLS-INF-M045", [vsMsgParam]);
			return;
		}
		
		var vsRptStatus = util.Grid.getRowState(app, "grdBase", vnOrgRowIdx);
		if(vsRptStatus == "insert"){
			// 삭제
			util.Grid.deleteRow(app, "grdBase");
			// 마스터 리피트 상태에 따른 디테일 프리폼 비활성화 제어
			doCompareFrfEnable();
		}else{
			
			// 복사한 이력이 존재하는지 확인
			var vnCopyNodeLength = ExtInstance.getNodeListLength("/root/resList/rptBase/row[child::FLAG_GBN='C']");
			if(vnCopyNodeLength > 0){
				//복사중인 데이터가 있습니다. 저장 후 진행하세요.
				util.Msg.alert("NLS-CSS-M088");
				return false;
			}
			
			var vsScalFeeCd = util.Grid.getCellValue(app, "grdBase", "SCAL_FEE_CD", vnOrgRowIdx);
			var vsStDt = util.Grid.getCellValue(app, "grdBase", "ST_DT", vnOrgRowIdx).substring(0, 8);
			var vsEndDt = util.Grid.getCellValue(app, "grdBase", "END_DT", vnOrgRowIdx).substring(0, 8);
			var vsKeyDate = util.DataMap.getValue(app, "dmReqKey", "strKeyDt").substring(0, 8);
			
			if(vsEndDt != "99991231"){
				// 종료일이 9999-12-31인 데이터만 @1할 수 있습니다. 
				util.Msg.alert("NLS-CSS-M001", [NLS.NSCR.DEL]);
				return;
			}	
			
			// 장학금코드 사용 중인지 체크
			util.DataMap.setValue(app, "dmReqCheck", "strScalFeeCd", vsScalFeeCd);	// 장학금코드
				
			//strCommand: checkScalCdUsedForDel 
			util.Submit.send(app, "subCheckScalCdUsed", function(pbSuccess){
				if(pbSuccess){
					var vsCheck = util.DataMap.getValue(app, "dmResList", "strCheckUsed");
					if(vsCheck == "Y"){
						//사용중인 @1 코드입니다
						util.Msg.alert("NLS-CSS-M013", [NLS.NSCR.SCRS]);
						return;
					}
					
					// 삭제
					util.Grid.deleteRow(app, "grdBase");
					// 마스터 리피트 상태에 따른 디테일 프리폼 비활성화 제어
					doCompareFrfEnable();
				}
			});
		}	
	};
	
	/**
	 * @desc [btnRestore]작업취소 onClick 이벤트
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 2. 24
	 */
	moPage.onClick_BtnRestore = function() {
		// 작업취소
		util.Grid.restoreRow(app, "grdBase");
		// 마스터 리피트 상태에 따른 디테일 프리폼 비활성화 제어
		doCompareFrfEnable();
		// 취소내용 프리폼 반영
//TO-BE: <ExtRepeat.copyRowForm> 그리드-프리폼인 경우에는 selection바인딩으로 처리하기 때문에 불필요함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.copyRowForm("rptBase", "frfBase");
	};
	
	/**
	 * @desc [btnSave]작업저장 onClick 이벤트
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 2. 24
	 */
	moPage.onClick_BtnSave = function() {
		doSave();
	};
	
	/**
	 * @desc [btnSave]데이터관리 저장 전 체크
			- 연속장학금여부가 Y인경우 지급횟수 반드시 입력
			- 지급횟수에 값이 있을시 숫자인지, 0보다 큰지 체크
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 2. 24
	 */
	function doCheckBefSaveBase() {
		
		var vnRpnCnt = util.Grid.getRowCount(app, "grdBase");
		
		for(var i = 1; i <= vnRpnCnt; i++){
			
			var vsCntiScalYn = util.Grid.getCellValue(app, "grdBase", "CNTI_SCAL_YN", i);
			var vsPmntCnt = util.Grid.getCellValue(app, "grdBase", "PMNT_CNT", i); 
			if(vsCntiScalYn == "Y" && ValueUtil.isNull(vsPmntCnt)) {
				util.Msg.alert("NLS-CSS-M029");
				util.Control.setFocus(app, "ipbFrfPmntCntBase");
				return false;
			}
			
			if(!ValueUtil.isNull(vsPmntCnt)){
				if(!ValueUtil.isNumber(vsPmntCnt)){
					util.Msg.alert("NLS-WRN-M104", [NLS.NSCR.PAYCNT]);	
					util.FreeForm.setValue(app, "frfBase", "PMNT_CNT", "");
					return false;
				}else if(Number(vsPmntCnt) < 1){
					util.Msg.alert("NLS-CSS-M076");
					util.FreeForm.setValue(app, "frfBase", "PMNT_CNT", "");
					return false;
				}	
			}	
		}	
		
		return true;
	};
	
	/**
	 * @desc 장학금목록 저장
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 2. 24
	 */
	function doSave() {
		
		// 리피트 변경사항 체크
		if(!util.Grid.isModified(app, ["grdBase"], "MSG")){
			return false;
		}
		
		// 리피트 Validation Check
		if(!util.validate(app, "grdBase")) return false;
		
		// 데이터관리 저장전 체크로직
		if(!doCheckBefSaveBase()) return false;
		
		//strCommand: saveBase 
		util.Submit.send(app, "subSave", function(pbSuccess){
			if(pbSuccess){
				
				//조회건수가 0건이면 프리폼이 내역이 반영되지 않기 떄문
				util.Control.reset(app, "frfBase");
				
				doList(function(pbListSuccess) {
					// 조회 : "갱신된 데이터가 조회되었습니다." header 메세지 표시
					if (pbListSuccess) util.Msg.notify(app, "NLS.INF.M025");
				});
			}else {
				// "저장중 오류가 발생하였습니다." 메시지 표시
				util.Msg.notify(app, "NLS.WRN.M119");
				util.Tab.setSelectedTabItem(app, "tabMain", TAB.MANAGE);
			}
		});
	};
	
	/**
	 * @desc 폐기/복구일자(돋보기버튼) onClick 이벤트
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 2. 24
	 */
	moPage.onClick_BtnYearSmtHis = function() {
		//기준일자 임포트(달력컨트롤ID,임포트ID)
		doOnclickSchYearSmt("dipKeyDtHistory","impSchYearSmt");
	};
	
	/**
	 * @desc 마스터 그리드의 pk_colvalues 값 세팅
	 * @param 
	 * @return  void
	 * @author Aeyoung Lee at 2016. 2. 12
	 */
	moPage.setCssBaseInfoPkColRowValue = function(vpRptDetail){
		var vsPkColValues = ExtRepeat.getPKColRowValues(vpRptDetail);					
		if(!ValueUtil.isNull(vsPkColValues)){
			ExtRepeat.setPkValues("rptBase", vsPkColValues);
		}
	};
	
	/**
	 * @desc 기준일 이전날짜 추출
	 * @param 기준일
	 * @return  기준일 이전일
	 * @author Aeyoung Lee 2016. 2. 24
	 */
	moPage.getBefDate = function(psKeyDate) {
		
		var y  = psKeyDate.substring(0, 4);
		var m = psKeyDate.substring(4, 6);
		var d  = psKeyDate.substring(6, 8);
		var befDt = new Date(y, m - 1, d - 1);
		var befDtYear = befDt.getFullYear().toString();	
		var befDtMonth = eval(befDt.getMonth() + 1).toString();
		var befDtDate = befDt.getDate().toString();
		
		if (befDtMonth.length == 1) befDtMonth = "0" + befDtMonth;
		if (befDtDate.length == 1) befDtDate = "0" + befDtDate;
		
		var vsBefDate = befDtYear + befDtMonth + befDtDate + "000000";
		
		return vsBefDate;
	};
	
	/**
	 * @desc [btnDisUse]폐기 onClick 이벤트
	 * @param 
	 * @return  void
	 * @author Aeyoung Lee 2016. 2. 24
	 */
	moPage.onClick_BtnDisUse = function() {
		doDisUseHistory();
	};
	
	/**
	 * @desc 장학금 폐기
	 * @param 
	 * @return  void
	 * @author Aeyoung Lee 2016. 2. 24
	 */
	function doDisUseHistory() {
		var vnCnt = Number(util.Grid.getRowCount(app, "grdBaseHistory"));
		if(vnCnt == 0) return;
		
		// 폐기/복구일자 유효성 체크
		if(!util.validate(app, "dipKeyDtHistory")) return false;
		
		// 조회조건 기준일자 : 마스터 포커스용
		var vsSchKeyDt = util.DataMap.getValue(app, "dmReqKey", "strKeyDt").substring(0, 8);
		var vsKeyDtHist = util.Control.getValue(app, "dipKeyDtHistory").substring(0, 8);
		
		var vnMaxRowIdx = null;
		var vsMaxEndDt 	= null;
		var vsMaxStDt 	= null;
		for (var i = 1; i <= vnCnt; i++) {
			var vsEndDt = util.Grid.getCellValue(app, "grdBaseHistory", "END_DT", i).substring(0, 8);
			var vsStDt  = util.Grid.getCellValue(app, "grdBaseHistory", "ST_DT", i).substring(0, 8);
			if (vsEndDt == "99991231") {
				vsMaxEndDt 	= vsEndDt;
				vsMaxStDt   = vsStDt;
				vnMaxRowIdx = i;
				break;
			}
		}
		
		// 종료일자가 99991231이 아닐때, 폐기 불가
		if (vsMaxEndDt == null) {
			// "폐기 가능한 데이터가 없습니다." 메시지 표시
			util.Msg.alert("NLS-INF-M029");
			return;
		}
		
		// 폐기일자 -1
		var vsBefDate = this.getBefDate(vsKeyDtHist).substring(0, 8);	
		
		if (vsMaxStDt > vsBefDate) {
			// 해당 기준일자로 폐기가능한 테이터가 없습니다.
			util.Msg.alert("NLS-CSS-M007", [NLS.NSCR.DISUSE]);
			return;
		}
		
		// 장학금코드 사용 중인지 체크
		util.DataMap.setValue(app, "dmReqCheck", "strScalFeeCd", util.DataMap.getValue(app, "dmReqKey", "strScalFeeCd"));	// 장학금코드
		util.DataMap.setValue(app, "dmReqCheck", "strKeyDtHistory", vsKeyDtHist);									// 폐기일자
		
		// 폐기 가능여부 체크
		//strCommand: checkScalCdUsedForDisUse 
		util.Submit.send(app, "subCheckScalCdUsed", function(pbSuccess){
			if(pbSuccess){
				//폐기 가능할때 
				var vsCheck = util.DataMap.getValue(app, "dmResList", "strCheckUsed");
				if(vsCheck == "Y"){
					// 사용중인 장학금 코드입니다.
					util.Msg.alert("NLS-CSS-M013" ,[NLS.NSCR.SCRS]);
					return;
				}
					
				// 전날자로 타겟로우의 종료일자 업데이트
				var vsMsgDate = vsKeyDtHist.substring(0, 4) + NLS.NSCR.YEAR + vsKeyDtHist.substring(4, 6) + NLS.NSCR.MONTH + vsKeyDtHist.substring(6, 8) + NLS.NSCR.DAY;
				
				// "@부로 폐기합니다. \n진행하시겠습니까?" 메시지
				if(util.Msg.confirm("NLS-CRM-M047", [vsMsgDate]) ){
					util.Grid.setCellValue(app, "grdBaseHistory", "END_DT", vsBefDate + "000000", vnMaxRowIdx);
					util.Grid.selectRow(app, "grdBaseHistory", vnMaxRowIdx, true);
					
					/*
						그리드에 pk_colvalues를 넣는다.
						조회 후 찾아주기 위함.
					*/
					if(vsSchKeyDt+"000000" >= vsMaxStDt+"000000"){
						this.setCssBaseInfoPkColRowValue("rptBaseHistory");
					}else{
						this.setCssBaseInfoPkColRowValue("rptBase");
					}
					
					doSaveHis();
				}
			}
		});
	};
	
	/**
	 * @desc [btnDisUseCanc]폐기취소 onClick 이벤트
	 * @param 
	 * @return  void
	 * @author Aeyoung Lee 2016. 2. 24
	 */
	moPage.onClick_BtnDisUseCanc = function() {
		doUseCancHistory();
	};
	
	/**
	 * @desc 장학금 폐기취소
	 * @param 
	 * @return  void
	 * @author Aeyoung Lee 2016. 2. 24
	 */
	function doUseCancHistory() {
		var vnCnt = util.Grid.getRowCount(app, "grdBaseHistory");
		if(vnCnt == 0) return;	
		
		// 조회조건 기준일자 : 마스터 포커스용
		var vsSchKeyDt = util.DataMap.getValue(app, "dmReqKey", "strKeyDt").substring(0, 8);
		
		var vnMaxRowIdx = null;
		var vsMaxEndDt 	= null;
		var vsMaxStDt   = null;
		for (var i = 1; i <= vnCnt; i++) {
			var vsStDt  = util.Grid.getCellValue(app, "grdBaseHistory", "ST_DT", i).substring(0, 8);
			var vsEndDt = util.Grid.getCellValue(app, "grdBaseHistory", "END_DT", i).substring(0, 8);
			if ((vsMaxEndDt == null) || (vsMaxEndDt != null && vsMaxEndDt < vsEndDt)) {
				vsMaxStDt  = vsStDt;
				vsMaxEndDt = vsEndDt;
				vnMaxRowIdx = i;
			}
		}

		if (vsMaxEndDt == "99991231" ) {
			// 폐기처리된 데이터가 없습니다
			util.Msg.alert("NLS-CSS-M009");
			return;
		}
		
		// "마지막 데이터의 종료일이 9999년 12월 31일로 변경됩니다. \n진행하시겠습니까?" 메시지
		if(util.Msg.confirm("NLS-CRM-M048") ){
			util.Grid.setCellValue(app, "grdBaseHistory", "END_DT", "99991231000000", vnMaxRowIdx);
			util.Grid.selectRow(app, "grdBaseHistory", vnMaxRowIdx);
			
			/*
				그리드에 pk_colvalues를 넣는다.
				조회 후 찾아주기 위함.
			*/
			if(vsSchKeyDt+"000000" >= vsMaxStDt+"000000"){
				this.setCssBaseInfoPkColRowValue("rptBaseHistory");
			}else{
				this.setCssBaseInfoPkColRowValue("rptBase");
			}
			
			// 이력사항 변경사항 저장
			doSaveHis();
		}
	};
	
	/**
	 * @desc [btnRecover]복구 onClick 이벤트
	 * @param 
	 * @return  void
	 * @author Aeyoung Lee 2016. 2. 24
	 */
	moPage.onClick_BtnRecover = function() {
		doRecoverHistory();
	};
	
	/**
	 * @desc 장학금 복구 : 가장 최근의 레코드를 카피하여 insert한다. (단, 기준일자가 최종일자보다 커야 한다.)
	 * @param 
	 * @return  void
	 * @author Aeyoung Lee 2016. 2. 24
	 */
	function doRecoverHistory() {
		var vnCnt = util.Grid.getRowCount(app, "grdBaseHistory");
		if(vnCnt == 0) return;
		
		// 폐기/복구일자 유효성 체크
		if(!util.validate(app, "dipKeyDtHistory")) return false;
		
		var vsSchKeyDt = util.DataMap.getValue(app, "dmReqKey", "strKeyDt").substring(0, 8);	// 조회조건 기준일자 : 마스터 포커스용
		var vsKeyDtHistory = util.Control.getValue(app, "dipKeyDtHistory").substring(0, 8);	// 폐기/복구일자
		
		var vsMaxStDt   = null;
		var vsMaxEndDt  = null;
		var vnMaxRowIdx = null;
		for (var i = 1; i <= vnCnt; i++) {
			var vsStDt = util.Grid.getCellValue(app, "grdBaseHistory", "ST_DT", i).substring(0, 8);
			var vsEndDt = util.Grid.getCellValue(app, "grdBaseHistory", "END_DT", i).substring(0, 8);
			if ((vsMaxEndDt == null) || (vsMaxEndDt != null && vsMaxEndDt < vsEndDt)) {
				vsMaxStDt = vsStDt;
				vsMaxEndDt = vsEndDt;
				vnMaxRowIdx = i;
			}
		}
		
		if(vsMaxEndDt == "99991231"){
			util.Msg.alert("NLS-CSS-M075");
			return;
		}	
		
		if (vsMaxEndDt >= vsKeyDtHistory) {
			util.Msg.alert("NLS-CSS-M007", [NLS.NSCR.RECOVERY]);
			return;
		}
		
		 var vsMsgDate = vsKeyDtHistory.substring(0, 4) + NLS.NSCR.YEAR + vsKeyDtHistory.substring(4, 6) + NLS.NSCR.MONTH + vsKeyDtHistory.substring(6, 8) + NLS.NSCR.DAY;
		 
		//  "시작일 @ 종료일 9999년12월31일로 데이터가 복구됩니다. \n진행하시겠습니까?"
		 if (util.Msg.confirm("NLS-CRM-M049", [vsMsgDate]) ) {
			/*
				그리드에 pk_colvalues를 넣는다.
				조회 후 찾아주기 위함.
			*/
			if(vsSchKeyDt+"000000" >= vsMaxStDt+"000000"){
				this.setCssBaseInfoPkColRowValue("rptBaseHistory");
			}else{
				this.setCssBaseInfoPkColRowValue("rptBase");
			} 
			
			var vnNextRow = util.Grid.insertRow(app, "grdBaseHistory", null, vnMaxRowIdx);
			ExtRepeat.copyToRowData("rptBaseHistory", vnMaxRowIdx, "rptBaseHistory", vnNextRow);
			
			util.Grid.setCellValue(app, "grdBaseHistory", "ST_DT"	  , vsKeyDtHistory + "000000", vnNextRow);
			util.Grid.setCellValue(app, "grdBaseHistory", "END_DT"	  , "99991231000000"		 , vnNextRow);
			util.Grid.setCellValue(app, "grdBaseHistory", "REF_KEY"	  , ""						 , vnNextRow);
			util.Grid.setCellValue(app, "grdBaseHistory", "UPT_STATUS" , "N"						 , vnNextRow);
			
			// 이력사항 변경사항 저장
			doSaveHis();
		 }
	};
	
	/**
	 * @desc 이력관리목록 변경사항 저장
	 * @param 
	 * @return  
	 * @author Aeyoung Lee 2016. 2. 24
	 */
	function doSaveHis() {
		// 리피트 변경사항 체크
		if(!util.Grid.isModified(app, ["grdBaseHistory"], "MSG")){
			return false;
		}
		
		//strCommand: saveBaseHist 
		util.Submit.send(app, "subSaveHistory", function(pbSuccess){
			if(pbSuccess) {
//				// 디테일 저장시 마스터의 포커스를 찾아가기위한 인스턴스 설정
//				var vsSbCd =  ExtInstance.getValue("/root/reqSelRow/strSbCd");
//				ExtInstance.setValue("/root/reqSelRow/strTmpSbCd", vsSbCd);
				util.Control.redraw(app, "grdBaseHistory");
				
				//재단목록조회
				doList(function(pbSuccess) {
					if (pbSuccess){
						// 조회 : "갱신된 데이터가 조회되었습니다." header 메세지 표시
						util.Msg.notify(app, "NLS.INF.M025");
						
//						// 탭이동용 인스턴스 초기화
//						ExtInstance.setValue("/root/reqSelRow/strTmpSbCd", "");
					}
				});
			}else {
				// "저장중 오류가 발생하였습니다." 메시지 표시
				util.Msg.notify(app, "NLS.WRN.M119");
				util.Tab.setSelectedTabItem(app, "tabMain", TAB.HIS);
			}
		});
	};
	
	/**
	 * @desc [rptBaseLan]언어목록 onRowSelect 이벤트
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 2. 25
	 */
	moPage.onRowSelect_RptBaseLan = function() {
		// 리피트 특정 row 데이터를 프리폼 copy
//TO-BE: <ExtRepeat.copyRowForm> 그리드-프리폼인 경우에는 selection바인딩으로 처리하기 때문에 불필요함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.copyRowForm("rptBaseLan", "frfBaseLan");
		// 프리폼 비활성화 제어
		doCompareFrfEnableLan();
	};
	
	/**
	 * @desc [frfBaseLan]언어목록 onUpdate 이벤트
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 2. 25
	 */
	moPage.onUpdate_FrfBaseLan = function() {
		// 프리폼 업데이트내용 그리드 반영
//TO-BE: <ExtFreeForm.updateToRpt> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtFreeForm.updateToRpt("rptBaseLan", "frfBaseLan");
	};
	
	/**
	 * @desc  마스터 리피트 상태에 따른 디테일 프리폼 비활성화 제어(언어목록)
	 *			    1. index가 지정되지 않았을 경우
	 *			    2. 현재 index의 로우가 삭제 상태일 경우 
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 2. 25
	 */
	function doCompareFrfEnableLan() {
		
		if( (!util.Grid.getIndex(app, "grdBaseLan")) || util.Grid.getRowState(app, "grdBaseLan") == cpr.data.tabledata.RowState.DELETED){
			util.Control.setEnable(app, false, ["frfBaseLan"]);	
		} else {
			util.Control.setEnable(app, true, ["frfBaseLan"]);	
			
			// 기본언어인 경우 프리폼항목 Enable false
			var vaDefLanPkEnableCtl = ["cbbFrfLanDivRcdLan"];
			var vaDefLanEnableCtl = ["ipbFrfScalFeeNmLan", "ipbFrfShortNmLan", "ipbFrfPrtScalFeeNmLan", "txtFrfDesc1Lan", "txtFrfDesc2Lan", "txtFrfDesc3Lan", "txtFrfDesc4Lan", "txtFrfDesc5Lan"];
			
			var vsStandLan = util.DataMap.getValue(app, "dmReqKey", "strLanDivRcd");
			var vsLan = util.Grid.getCellValue(app, "grdBaseLan", "LAN_DIV_RCD");
			
			if(vsStandLan == vsLan && util.Grid.getRowState(app, "grdBaseLan") != cpr.data.tabledata.RowState.INSERTED){
				util.Control.setEnable(app, false, vaDefLanPkEnableCtl);	
				util.Control.setEnable(app, false, vaDefLanEnableCtl);	
			}else if(util.Grid.getRowState(app, "grdBaseLan") == ""){
				util.Control.setEnable(app, false, vaDefLanPkEnableCtl);	
				util.Control.setEnable(app, true, vaDefLanEnableCtl);	
			}else{
				util.Control.setEnable(app, true, vaDefLanPkEnableCtl);	
				util.Control.setEnable(app, true, vaDefLanEnableCtl);		
			}
		}
		
		// 언어목록 변경사항 에따른 재단목록 Enable 처리
		if(util.Grid.isModified(app, "grdBaseLan")){
			util.Control.setEnable(app, false, ["grpData"]);
		}else {
			util.Control.setEnable(app, true, ["grpData"]);
		}
	};
	
	/**
	 * @desc [btnNewLan]신규(언어) onClick 이벤트
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 2. 25
	 */
	moPage.onClick_BtnNewLan = function() {
		// 신규로우 추가
		var vnIdx = util.Grid.insertRow(app, "grdBaseLan");
		
		// 신규 Defalut값 설정 		
		util.Grid.setCellValue(app, "grdBaseLan", "SCAL_FEE_CD", util.DataMap.getValue(app, "dmReqKey", "strScalFeeCd"));	// 장학금코드
		util.Grid.setCellValue(app, "grdBaseLan", "REF_KEY"	  , util.DataMap.getValue(app, "dmReqKey", "strRefKey"));	// 참조키
		
//TO-BE: <ExtRepeat.copyRowForm> 그리드-프리폼인 경우에는 selection바인딩으로 처리하기 때문에 불필요함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.copyRowForm("rptBaseLan", "frfBaseLan", vnIdx);
		
		// 프리폼 항목 포커스
		util.Control.setFocus(app,  "cbbFrfLanDivRcdLan");
	};
	
	/**
	 * @desc [btnDelLan]삭제(언어) onClick 이벤트
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 2. 25
	 */
	moPage.onClick_BtnDelLan = function() {
		// 기본언어구분
		var vsStnLanDivRcd = ValueUtil.fixNull(util.DataMap.getValue(app, "dmReqKey", "strLanDivRcd"));
		var vsLanDivRcd =  util.FreeForm.getValue(app, "frfBaseLan", "LAN_DIV_RCD")
		
		var vsUptStatus = util.Grid.getRowState(app, "grdBaseLan", "UPT_STATUS");
		if (vsStnLanDivRcd == vsLanDivRcd && vsUptStatus != "insert"){
			// 기본언어레코드는 삭제할 수 없습니다. 메시지 표시
			util.Msg.alert("NLS-WRN-M010");
			return;
		}
		
		// 삭제
		util.Grid.deleteRow(app, "grdBaseLan");
		// 마스터 리피트 상태에 따른 디테일 프리폼 비활성화 제어
		doCompareFrfEnableLan();
	};
	
	/**
	 * @desc [btnRestoreLan]작업취소(언어) onClick 이벤트
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 2. 25
	 */
	moPage.onClick_BtnRestoreLan = function() {
		// 작업취소
		util.Grid.restoreRow(app, "grdBaseLan");
		// 취소내용 프리폼 반영
//TO-BE: <ExtRepeat.copyRowForm> 그리드-프리폼인 경우에는 selection바인딩으로 처리하기 때문에 불필요함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.copyRowForm("rptBaseLan", "frfBaseLan");
		// 마스터 리피트 상태에 따른 디테일 프리폼 비활성화 제어
		doCompareFrfEnableLan();
	};
	
	/**
	 * @desc [btnSaveLan]작업저장(언어) onClick 이벤트
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 2. 25
	 */
	moPage.onClick_BtnSaveLan = function() {
		// 언어목록 변경사항 저장
		doSaveLan();
	};
	
	/**
	 * @desc 언어목록 변경사항 저장
	 * @param 
	 * @return  
	 * @author Aeyoung Lee 2016. 2. 25
	 */
	function doSaveLan() {
		// 리피트 변경사항 체크
		if(!util.Grid.isModified(app, ["grdBaseLan"], "MSG")){
			return false;
		}
		
		// 리피트 Validation Check
		if(!util.validate(app, "grdBaseLan")) return false;
		
		//strCommand: saveBaseLan 
		util.Submit.send(app, "subSaveLan", function(pbSuccess){
			if(pbSuccess) {
				// 언어목록 조회
				doListLan(function(pbSuccessList) {
					if(pbSuccessList){
						// "갱신된 데이터가 조회되었습니다." header 메세지 표시
						util.Msg.notify(app, "NLS.INF.M025");
					}
				});
			}else {
				// "저장중 오류가 발생하였습니다." 메시지 표시
				util.Msg.notify(app, "NLS.WRN.M119");
			}
		});
	};
	
	/**
	 * @desc 해당 리피트의 순번(serial_no) 리턴
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 2. 25
	 */
	function doGetMaxSerialNo(psRptNm) {
		var vnCnt = util.Grid.getRowCount(app, psRptNm);
		var vnMaxSerialNo = 0;
		for (var i = 1; i <= vnCnt; i++) {
			var vsSerialNo = Number(util.Grid.getCellValue(app, psRptNm, "SERIAL_NO", i));
			if (vnMaxSerialNo < vsSerialNo) {
				vnMaxSerialNo = vsSerialNo;
			}
		}
		return vnMaxSerialNo+1;
	};
	
	
	/**
	 * @desc [btnNewPmnt]신규(지급금액기준) onClick 이벤트
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 2. 25
	 */
	moPage.onClick_BtnNewPmnt = function() {
		// 신규로우 추가
		var vnIdx = util.Grid.insertRow(app, "grdPmntAmt","rdCbbFnreDivRcdPmnt");
		
		// 신규 Defalut값 설정 		
		util.Grid.setCellValue(app, "grdPmntAmt", "ST_DT" , util.DataMap.getValue(app, "dmReqKey", "strKeyDt"));
		util.Grid.setCellValue(app, "grdPmntAmt", "END_DT", "99991231000000");
		util.Grid.setCellValue(app, "grdPmntAmt", "SCAL_FEE_CD", util.DataMap.getValue(app, "dmReqKey", "strScalFeeCd"));	// 장학금코드
		util.Grid.setCellValue(app, "grdPmntAmt", "OBJ_DIV_RCD", "CC009SS");
		util.Grid.setCellValue(app, "grdPmntAmt", "SERIAL_NO", doGetMaxSerialNo("grdPmntAmt"));
	};
	
	/**
	 * @desc [btnDelPmnt]삭제(지급금액기준) onClick 이벤트
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 2. 25
	 */
	moPage.onClick_BtnDelPmnt = function() {
		// 삭제
		util.Grid.deleteRow(app, "grdPmntAmt");
	};
	
	/**
	 * @desc [btnRestorePmnt]작업취소(지급금액기준) onClick 이벤트
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 2. 25
	 */
	moPage.onClick_BtnRestorePmnt = function() {
		// 작업취소
		util.Grid.restoreRow(app, "grdPmntAmt");
	};
	
	/**
	 * @desc [btnSavePmnt]작업저장(지급금액기준) onClick 이벤트
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 2. 25
	 */
	moPage.onClick_BtnSavePmnt = function() {
		// 지급금액기준 변경사항 저장
		doSavePmnt();
	};
	
	/**
	 * @desc [btnSavePmnt]지급금액기준 저장 전 체크
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 2. 25
	 */
	function doCheckBefSavePmnt() {
		
		var vnRpnCnt = util.Grid.getRowCount(app, "grdPmntAmt");
		
		for(var i = 1; i <= vnRpnCnt; i++){
			
			var vsStatus = util.Grid.getRowState(app, "grdPmntAmt", i);
			var vsPmntCiiRcd = util.Grid.getCellValue(app, "grdPmntAmt", "PMNT_CII_RCD", i);
			var vsUnitRcd = util.Grid.getCellValue(app, "grdPmntAmt", "UNIT_RCD", i); 
			
			if(vsStatus != "delete" && vsPmntCiiRcd == "CH201UNT" &&  ValueUtil.isNull(vsUnitRcd)){
				util.Msg.alert("NLS-CSS-M080", [i]);
				return false;
			}	
		}	
		
		//항목기준/재원구분별
	  	if(!doCheckDupDate("rptPmntAmt", "ITEM_CD", null, "ST_DT", "END_DT", [NLS.NSCR.ITEMSTD + "/" + NLS.NSCR.FIRSRDIVRCD], "FNRE_DIV_RCD")){
	   		return false;
		}
		
		//단위계산/재원구분별
	 	if(!doCheckDupDate("rptPmntAmt", "PMNT_CII_RCD", "CH201UNT", "ST_DT", "END_DT", [NLS.NSCR.UNITCAL + "/" + NLS.NSCR.FIRSRDIVRCD], "FNRE_DIV_RCD")){
			return false;	
		}	
		
		return true;
	};
	
	/**
	 * @desc 컬럼[psCompareColId]의 value별 겹치는 날짜가 존재하는지 체크
	 * @param {?} psRptId
	 * @param {?} psCompareColId
	 * @param {?} psCompareColValue
	 * @param {?} psStDtId
	 * @param {?} psEndDtId
	 * @param {?} paMsg
	 * @param {?} psCompareColIdSub
	 * @return Boolean	
	 * @author Aeyoung Lee 2016. 2. 25
	 */
	function doCheckDupDate(psRptId, psCompareColId, psCompareColValue, psStDtId, psEndDtId, paMsg, psCompareColIdSub) {
  		var vnCnt = util.Grid.getRowCount(app, psRptId);
  		for (var i = 1; i <= vnCnt; i++) {
   			if(util.Grid.getRowState(app, psRptId,i) == cpr.data.tabledata.RowState.DELETED) continue;
			
   			var vbCompareColBase = util.Grid.getCellValue(app, psRptId, psCompareColId, i);
			if(!ValueUtil.isNull(psCompareColIdSub)) var vbCompareColBaseSub = util.Grid.getCellValue(app, psRptId, psCompareColIdSub, i);
			
			// 비교값이 존재하는 경우 비교값과 대상값이 같은 경우만 체크
			if( (!ValueUtil.isNull(psCompareColValue)) && (vbCompareColBase != psCompareColValue) ) continue; 
			
			var vbBegDtBase = util.Grid.getCellValue(app, psRptId, psStDtId, i).substring(0, 8);
			var vbEndDtBase = util.Grid.getCellValue(app, psRptId, psEndDtId, i).substring(0, 8);
			
			for(var j = 1; j <= vnCnt; j++){
				if(i == j) continue;
				if(util.Grid.getRowState(app, psRptId, j) == cpr.data.tabledata.RowState.DELETED) continue;
				
 				var vbCompareCol =  util.Grid.getCellValue(app, psRptId, psCompareColId, j);
 				var vbBegDt = util.Grid.getCellValue(app, psRptId, psStDtId, j).substring(0, 8);
 				var vbEndDt = util.Grid.getCellValue(app, psRptId, psEndDtId, j).substring(0, 8);
				
				//비교하는 특정값이 있는 경우
				if(!ValueUtil.isNull(psCompareColValue)){
					
					if(vbCompareCol == psCompareColValue){
						
						var vbCompareColSub = util.Grid.getCellValue(app, psRptId, psCompareColIdSub, j);
						
						if(vbCompareColBaseSub == vbCompareColSub) {
							if(vbBegDt <= vbBegDtBase && vbBegDtBase <= vbEndDt){
								util.Msg.alert("NLS-CSS-M079", paMsg);
								return false;
							}
							if(vbBegDt <= vbEndDtBase && vbEndDtBase <= vbEndDt){
								util.Msg.alert("NLS-CSS-M079", paMsg);
								return false;
							}
						}
					}else{
						
						if(vbBegDt >= vbBegDtBase && vbBegDt <= vbEndDtBase){
							util.Msg.alert("NLS-CSS-M079", [NLS.NSCR.UNITCAL]);
							return false;
						}
						if(vbEndDt >= vbBegDtBase && vbEndDt <= vbEndDtBase){
							util.Msg.alert("NLS-CSS-M079", [NLS.NSCR.UNITCAL]);
							return false;
						}
						
						if(vbBegDt <= vbBegDtBase && vbBegDtBase <= vbEndDt){
							util.Msg.alert("NLS-CSS-M079", [NLS.NSCR.UNITCAL]);
							return false;
						}
						if(vbBegDt <= vbEndDtBase && vbEndDtBase <= vbEndDt){
							util.Msg.alert("NLS-CSS-M079", [NLS.NSCR.UNITCAL]);
							return false;
						}	
						
					}	
					
				// 특정값 아닐 경우
				}else{
					
					if(!ValueUtil.isNull(psCompareColIdSub)){
						
						var vbCompareColSub = util.Grid.getCellValue(app, psRptId, psCompareColIdSub, j);
						
						if(vbCompareColBase == vbCompareCol && vbCompareColBaseSub == vbCompareColSub) {
							if(vbBegDt <= vbBegDtBase && vbBegDtBase <= vbEndDt){
								util.Msg.alert("NLS-CSS-M079", paMsg);
								return false;
							}
							if(vbBegDt <= vbEndDtBase && vbEndDtBase <= vbEndDt){
								util.Msg.alert("NLS-CSS-M079", paMsg);
								return false;
							}
						}
						
					}else{
						
						if(vbCompareColBase == vbCompareCol) {
							if(vbBegDt <= vbBegDtBase && vbBegDtBase <= vbEndDt) {
								util.Msg.alert("NLS-CSS-M079", paMsg);
								return false;
							}
							if(vbBegDt <= vbEndDtBase && vbEndDtBase <= vbEndDt) {
								util.Msg.alert("NLS-CSS-M079", paMsg);
								return false;
							}
						}
					}
				}	
			}   
 		}
 		return true;
	};
	
	/**
	 * @desc 지급기준/재원구분 중복체크 
	 * @param {?} pbGrxId
	 * @param {?} pbCompareColId 지급기준
	 * @param {?} pbCompareColValue 단위계산값[CH201UNT]
	 * @param {?} pbBegDtId
	 * @param {?} pbEndDtId
	 * @param {?} pbCompareColIdSub 재원구분
	 * @return Boolean	
	 * @author Aeyoung Lee 2016. 2. 25
	 */
	function doCheckDupDatePmntCiiRcd(pbGrxId, pbCompareColId, pbCompareColValue, pbBegDtId, pbEndDtId, pbCompareColIdSub) {
  		var vnCnt = util.Grid.getRowCount(app, pbGrxId);
  		for (var i = 1; i <= vnCnt; i++) {
   			if(util.Grid.getRowState(app, pbGrxId, i) == cpr.data.tabledata.RowState.DELETED) continue;
			
   			var vbCompareColBase = util.Grid.getCellValue(app, pbGrxId, pbCompareColId, i);
			
			// row의 지급기준이 단위계산값일 경우
   			if(vbCompareColBase == pbCompareColValue) {
				var vbBegDtBase = util.Grid.getCellValue(app, pbGrxId, pbBegDtId, i);	
				var vbEndDtBase = util.Grid.getCellValue(app, pbGrxId, pbEndDtId, i);
				
				//재원구분
				var vbCompareColBaseSub = util.Grid.getCellValue(app, pbGrxId, pbCompareColIdSub, i);
				
				if( (!ValueUtil.isNull(vbBegDtBase)) && (!ValueUtil.isNull(vbEndDtBase)) && (!ValueUtil.isNull(vbCompareColBaseSub)) ){
					for (var j = 1; j <= vnCnt; j++) {
						
						if(util.Grid.getRowState(app, pbGrxId, j) == cpr.data.tabledata.RowState.DELETED) continue;
			   			if(i == j) continue;
						
						var vbBegDt = util.Grid.getCellValue(app, pbGrxId, pbBegDtId, j);
		 				var vbEndDt = util.Grid.getCellValue(app, pbGrxId, pbEndDtId, j);
						
						var vbCompareCol = util.Grid.getCellValue(app, pbGrxId, pbCompareColId, j);			//지급기준
						var vbCompareColSub = util.Grid.getCellValue(app, pbGrxId, pbCompareColIdSub, j);	//재원구분
						
						//단위계산별
						if(vbCompareCol == pbCompareColValue){
							
							//재원이 같을경우
							if(vbCompareColBaseSub == vbCompareColSub){
								if(vbBegDt <= vbBegDtBase && vbBegDtBase <= vbEndDt){
									util.Msg.alert("NLS-CSS-M079", [NLS.SCR.UNITCAL+"/"+NLS.SCR.FIRSRDIVRCD]);
									return false;
								}
								if(vbBegDt <= vbEndDtBase && vbEndDtBase <= vbEndDt){
									util.Msg.alert("NLS-CSS-M079", [NLS.SCR.UNITCAL+"/"+NLS.SCR.FIRSRDIVRCD]);
									return false;
								}
							}
							
						//단위계산끼리아닐경우 날짜가 같으면 안됨.	
						}else{
							if(vbBegDt <= vbBegDtBase && vbBegDtBase <= vbEndDt){
								util.Msg.alert("NLS-CSS-M079", [NLS.SCR.UNITCAL]);
								return false;
							}
							if(vbBegDt <= vbEndDtBase && vbEndDtBase <= vbEndDt){
								util.Msg.alert("NLS-CSS-M079", [NLS.SCR.UNITCAL]);
								return false;
							}
						}			
		 		 	}
				}
			}
	 	}
 		return true;
	};
	
	/**
	 * @desc 지급금액기준 변경사항 저장
	 * @param 
	 * @return  
	 * @author Aeyoung Lee 2016. 2. 25
	 */
	function doSavePmnt() {
		// 리피트 변경사항 체크
		if(!util.Grid.isModified(app, ["grdPmntAmt"], "MSG")){
			return false;
		}
		
		// 리피트 Validation Check
		if(!util.validate(app, "grdPmntAmt")) return false;
		
		// 업무적 로직 체크
		if(!doCheckBefSavePmnt()) return false;
		
		//strCommand: savePmntAmtCii 
		util.Submit.send(app, "subSavePmntAmtCii", function(pbSuccess){
			if(pbSuccess){
				// 지급금액기준목록 조회
				doListPmnt(function(pbSuccessList) {
					if(pbSuccessList){
						// "갱신된 데이터가 조회되었습니다." header 메세지 표시
						util.Msg.notify(app, "NLS.INF.M025");
					}
				});
			}else{
				// "저장중 오류가 발생하였습니다." 메시지 표시
				util.Msg.notify(app, "NLS.WRN.M119");
			}
		});
	};
	
	/**
	 * @desc 지급금액기준 리피트 row Select Event
	 * @param 
	 * @return  
	 * @author Aeyoung Lee 2016. 2. 25
	 */
	moPage.onRowSelect_RptPmntAmt = function() {
//TO-BE: <ExtControl.refreshBind> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtControl.refreshBind("binRoPmntCiiUnit");
	};
	
	/**
	 * @desc 지급금액기준 리피트 Value Change Event
	 * @param 
	 * @return  
	 * @author Aeyoung Lee 2016. 2. 25
	 */
	function doAfterValueChangRptPmntAmt(psDiv) {
		
		var vnRowIdx = util.Grid.getIndex(app, "grdPmntAmt");
		var vsValue = util.Grid.getCellValue(app, "grdPmntAmt", psDiv, vnRowIdx);
		var vnValue = null;
		
		if(psDiv == "SERIAL_NO"){
			if(vsValue <= 0){
				util.Msg.alert("NLS-CSS-M052");
				util.Grid.setCellValue(app, "grdPmntAmt", psDiv, "", vnRowIdx);	
				return false;
			}
		}	
		
		if(psDiv == "ST_DT" || psDiv == "END_DT"){
			var vsStDt = util.Grid.getCellValue(app, "grdPmntAmt", "ST_DT", vnRowIdx);
			var vsEndDt = util.Grid.getCellValue(app, "grdPmntAmt", "END_DT", vnRowIdx);
			
			if(vsStDt != "" && vsEndDt != "") {
				if(vsStDt > vsEndDt){
					util.Msg.alert("NLS-WRN-M016");
					util.Grid.setCellValue(app, "grdPmntAmt", psDiv, "", vnRowIdx);	
					return false;
				}
			}
		}
		
		if(psDiv == "PMNT_CII_RCD"){
//TO-BE: <ExtControl.refreshBind> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//			ExtControl.refreshBind("binRoPmntCiiUnit");
			
			if(vsValue != "CH201UNT"){
				util.Grid.setCellValue(app, "grdPmntAmt", "UNIT_RCD", "", vnRowIdx);	
				util.Grid.setCellValue(app, "grdPmntAmt", "UNIT_ALOT_VAL", "", vnRowIdx);	
            }
            
			if(vsValue == "CH201RAT"){
				if(Number(util.Grid.getCellValue(app, "grdPmntAmt", "CII_VAL", vnRowIdx)) > 100) {
					//지급기준이 비율인 경우 기준값은 100을 넘을 수 없습니다.
					util.Msg.alert("NLS-CSS-M024");
					util.Grid.setCellValue(app, "grdPmntAmt", psDiv, "", vnRowIdx);	
					return false;
				}
			}
		}	
		
		if(psDiv == "CII_VAL"){
			if(vsValue <= 0){
				util.Msg.alert("NLS-CRS-M006", [NLS.NSCR.STDVAL]);
				util.Grid.setCellValue(app, "grdPmntAmt", psDiv, "", vnRowIdx);	
				return false;
			}
			
			if(util.Grid.getCellValue(app, "grdPmntAmt", "PMNT_CII_RCD", vnRowIdx) == "CH201RAT") {
				if(Number(vsValue) > 100){
					//지급기준이 비율인 경우 기준값은 100을 넘을 수 없습니다.
					util.Msg.alert("NLS-CSS-M024");
					util.Grid.setCellValue(app, "grdPmntAmt", psDiv, "", vnRowIdx);	
					return false;
				}
			}
		}	
	};
	
	
	/**
	 * @desc [btnNewQual]신규(자격기준) onClick 이벤트
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 2. 26
	 */
	moPage.onClick_BtnNewQual = function() {
		// 신규로우 추가
		var vnIdx = util.Grid.insertRow(app, "grdQualCii","rdCbbQualCiiRcdQual");
		
		// 신규 Defalut값 설정 		
		util.Grid.setCellValue(app, "grdQualCii", "ST_DT" , util.DataMap.getValue(app, "dmReqKey", "strKeyDt"));
		util.Grid.setCellValue(app, "grdQualCii", "END_DT", "99991231000000");
		util.Grid.setCellValue(app, "grdQualCii", "SCAL_FEE_CD", util.DataMap.getValue(app, "dmReqKey", "strScalFeeCd"));	// 장학금코드
		util.Grid.setCellValue(app, "grdQualCii", "OBJ_DIV_RCD", "CC009SS");
		util.Grid.setCellValue(app, "grdQualCii", "SERIAL_NO", doGetMaxSerialNo("grdQualCii"));
	};
	
	/**
	 * @desc [btnDelQual]삭제(자격기준) onClick 이벤트
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 2. 26
	 */
	moPage.onClick_BtnDelQual = function() {
		// 삭제
		util.Grid.deleteRow(app, "grdQualCii");
	};
	
	/**
	 * @desc [btnRestoreQual]작업취소(자격기준) onClick 이벤트
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 2. 25
	 */
	moPage.onClick_BtnRestoreQual = function() {
		// 작업취소
		util.Grid.restoreRow(app, "grdQualCii");
	};
	
	/**
	 * @desc [btnSaveQual]작업저장(자격기준) onClick 이벤트
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 2. 26
	 */
	moPage.onClick_BtnSaveQual = function() {
		// 자격기준 변경사항 저장
		doSaveQual();
	};
	
	/**
	 * @desc 자격기준 변경사항 저장
	 * @param 
	 * @return  
	 * @author Aeyoung Lee 2016. 2. 26
	 */
	function doSaveQual() {
		// 리피트 변경사항 체크
		if(!util.Grid.isModified(app, ["grdQualCii"], "MSG")){
			return false;
		}
		
		// 리피트 Validation Check
		if(!util.validate(app, "grdQualCii")) return false;
		
		// 자격기준별 중복체크
		if(!doCheckDupDate("rptQualCii", "QUAL_CII_RCD", null, "ST_DT", "END_DT", [NLS.NSCR.QUALISTD], null)) return false;
		
		//strCommand: saveQualCii 
		util.Submit.send(app, "subSaveQualCii", function(pbSuccess){
			if(pbSuccess){
				// 자격기준목록 조회
				doListQual(function(pbSuccessList) {
					if(pbSuccessList){
						// "갱신된 데이터가 조회되었습니다." header 메세지 표시
						util.Msg.notify(app, "NLS.INF.M025");
					}
				});
			}else{
				// "저장중 오류가 발생하였습니다." 메시지 표시
				util.Msg.notify(app, "NLS.WRN.M119");
			}
		});
	};
	
	/**
	 * @desc 자격기준 리피트 row Select Event
	 * @param 
	 * @return  
	 * @author Aeyoung Lee 2016. 2. 26
	 */
	moPage.onRowSelect_RptQualCii = function() {
//TO-BE: <ExtControl.refreshBind> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtControl.refreshBind(["binRoQualCiiNum1","binRoQualCiiNum2","binRoQualCiiChar1","binRoQualCiiChar2"]);
	};
	
	/**
	 * @desc 자격기준 리피트 Value Change Event
	 * @param 
	 * @return  
	 * @author Aeyoung Lee 2016. 2. 26
	 */
	function doAfterValueChangRptQualCii(psDiv) {
		
		var vnRowIdx = util.Grid.getIndex(app, "grdQualCii");
		var vsValue = util.Grid.getCellValue(app, "grdQualCii", psDiv, vnRowIdx);
		var vnValue = null;
		
		if(psDiv == "SERIAL_NO"){
			if(vsValue <= 0){
				util.Msg.alert("NLS-CSS-M052");
				util.Grid.setCellValue(app, "grdQualCii", psDiv, "", vnRowIdx);	
				return false;
			}
		}	
		
		if(psDiv == "ST_DT" || psDiv == "END_DT"){
			var vsStDt = util.Grid.getCellValue(app, "grdQualCii", "ST_DT", vnRowIdx);
			var vsEndDt = util.Grid.getCellValue(app, "grdQualCii", "END_DT", vnRowIdx);
			
			if(vsStDt != "" && vsEndDt != "") {
				if(vsStDt > vsEndDt){
					util.Msg.alert("NLS-WRN-M016");
					util.Grid.setCellValue(app, "grdQualCii", psDiv, "", vnRowIdx);	
					return false;
				}
			}
		}
		
		if(psDiv == "QUAL_CII_RCD"){
//TO-BE: <ExtControl.refreshBind> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//			ExtControl.refreshBind(["binRoQualCiiNum1","binRoQualCiiNum2","binRoQualCiiChar1","binRoQualCiiChar2"]);
			
			var vnNodeLength = util.DataSet.getRowCount(app, "dsListQualCii");
			
			var vsPrp1 = ExtInstance.getValue("/root/resOnLoad/listQualCii/row", "CD_PRP1", "child::CD='" + vsValue + "'");
			var vsPrp2 = ExtInstance.getValue("/root/resOnLoad/listQualCii/row", "CD_PRP2", "child::CD='" + vsValue + "'");
			var vsPrp3 = ExtInstance.getValue("/root/resOnLoad/listQualCii/row", "CD_PRP3", "child::CD='" + vsValue + "'");
			var vsPrp4 = ExtInstance.getValue("/root/resOnLoad/listQualCii/row", "CD_PRP4", "child::CD='" + vsValue + "'");
			
			
			if(vsPrp1 != "Y"){
				util.Grid.setCellValue(app, "grdQualCii", "CII_NUM_VAL1", "", vnRowIdx);	
			}	
			
			if(vsPrp2 != "Y"){
				util.Grid.setCellValue(app, "grdQualCii", "CII_NUM_VAL2", "", vnRowIdx);	
			}	
			
			if(vsPrp3 != "Y"){
				util.Grid.setCellValue(app, "grdQualCii", "CII_CHAR_VAL1", "", vnRowIdx);	
			}
			
			if(vsPrp4 != "Y"){
				util.Grid.setCellValue(app, "grdQualCii", "CII_CHAR_VAL2", "", vnRowIdx);	
			}
		}	
		
	};
	
	
	return moPage;
};
