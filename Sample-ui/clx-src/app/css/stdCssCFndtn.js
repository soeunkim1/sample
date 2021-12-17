//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./stdCssCFndtn.xtm"/>

/**
 * 재단관리
 * @class stdCssCFndtn
 * @author Aeyoung Lee 2016. 2. 17
 */
var stdCssCFndtn = function() {
	var moPage = new Page();
	var moPObject 	= new PObject();
		
	// 탭 정의
	var TAB = {
		MANAGE	: "tabManage",
		HIS    	: "tabHistory",
		LAN   	: "tabLan",
		ADDR   	: "tabAddr"
	};
		
	// 탭버튼 정의
	var TAB_BTN = {
		tabManage	: "tabBtnManage",
		tabHistory	: "tabBtnHistory",
		tabLan    	: "tabBtnLan",
		tabAddr    	: "tabBtnAddr"
	};
	
	/**
	 * 우편번호검색팝업 관련 설정사항
	 *  [IN]
	 *  1. controlId : (필수) 최초 이벤트의 버튼id
	 *  [OUT]
	 *  2. oZipCode : 우편번호
	 *  3. oZipSeq  : 우편일련번호
	 *  4. oBdMno   : 건물번호
	 *  5. oAddr	: 주소
	 *  6. func		: 팝업에서 선택한 값을 받은 후 추가 로직이 필요한 경우 함수 작성
	 * @member impStdCmnPZipSearch
	 * @type Array
	 * @author Choi In Seong at 16. 1. 26
	 */ 
	moPObject.moIdsForStdCmnPZipSearch = [
		 { 
			 controlId : "btnPopZipcode",	//(필수)우편번호검색
			 oZipCode  : "ipbFrfZipcodeAddr",	//리턴 우편번호
			 oZipSeq   : "ipbFrfZipseqAddr",	//리턴 우편일련번호
			 oAddr	   : "ipbFrfAddr1Addr",		//리턴 주소
			 oAddrDtl  : "ipbFrfAddr2Addr",		//리턴 주소
			 func	   : null
		 }
	 ];
	
	var msSystemLanDivRcd = "";
	var msCurrentDt = "";
	var msKeyDt = "";
	
	/**
	 * @desc import 헤더 초기화
	 * @param 
	 * @return  void
	 * @author Aeyoung Lee 2016. 2. 17
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		// import 헤더 초기화
		doHeaderOnLoad();
	};
	
	/**
	 * @desc OnLoad 이벤트
	 * @param 
	 * @return  void
	 * @author Aeyoung Lee 2016. 2. 17
	 */
	function doOnLoad() {
		// 리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["rptFndtn", "frfFndtn", "rptFndtnHistory", "rptFndtnLan", "rptFndtnAddr", "frfFndtnAddr"]);
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
				
				msSystemLanDivRcd = util.DataMap.getValue(app, "dmResOnLoad", "strSystemLan");
				msCurrentDt = util.DataMap.getValue(app, "dmResOnLoad", "strCutDt");
				msKeyDt = util.DataMap.getValue(app, "dmResOnLoad", "strKeyDt");
				
				util.Control.setValue(app, "dipKeyDt", msKeyDt);	
				util.Control.setFocus(app, "ipbFndtnNm");
			}
		}, true);
	};
	
	/**
	 * @desc 기준일자(돋보기버튼) onClick 이벤트
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 2. 17
	 */
	moPage.onClick_BtnYearSmt = function() {
		//기준일자 임포트(달력컨트롤ID,임포트ID)
		doOnclickSchYearSmt("dipKeyDt","impSchYearSmt");
	};
	
	/**
	 * @desc 기준일자 Enter KeyUp 이벤트
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 2. 17
	 */
	moPage.onKeyUp_DipKeyDt = function(strKeyType, strKeyStatus) {
		// 엔터키 입력시 조회
		if(e.keyCode == cpr.events.KeyCode.ENTER){
			util.Header.clickSearch(app);
		}
	};
	
	/**
	 * @desc 재단명 Enter KeyDown 이벤트
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 2. 17
	 */
	moPage.onKeyDown_IpbFndtnNm= function(strKeyType, strKeyStatus) {
		// 엔터키 입력시 조회
		if(e.keyCode == cpr.events.KeyCode.ENTER){
			util.Header.clickSearch(app);
		}
	}
	
	/**
	 * @desc 조회 onClick 이벤트
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 2. 17
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
		ExtRepeat.setPkValues("rptFndtn", "");
		
		// 조회
		doList(function(pbSuccess) {
			if (pbSuccess){
				
				if(util.Grid.getRowCount(app, "grdFndtn") == 0){
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
	 * @desc 재단목록 조회
	 * @param poCallBackFunc 콜백정의
	 * @return void
	 * @author Aeyoung Lee 2016. 2. 17
	 */
	function doList(poCallBackFunc) {
		//strCommand: listFndtn 
		util.Submit.send(app, "subFndList", function(pbSuccess){
			if(pbSuccess){
				
				util.Control.redraw(app, "grdFndtn");
				
//				// 폐기처리로 인해 데이터가 없어질경우 [데이터관리] 텝으로 이동하기 위함.
//				var strTmpCd = ExtInstance.getValue("/root/reqSelRow/strTmpScalFndtnCd");
//				var vnLength = ExtInstance.getNodeListLength("/root/resList/rptFndtn/row[child::SCAL_FNDTN_CD = '"+ strTmpCd +"']");
//				if(ValueUtil.isNull(strTmpCd) || vnLength == 0){
//					if(ExtRepeat.rowCount("rptFndtn") == 0){
//						// 데이터관리  tab으로 이동
//						ExtTab.setTabBtn("tabMain", TAB_BTN.tabManage);
//						ExtTab.toggle("tabMain", TAB.MANAGE);
//						// 마스터 리피트 상태에 따른 디테일 프리폼 비활성화 제어
//						this.doCompareFrfEnable();
//					}
//					ExtModel.dispatch("tabBtnManage","DOMActivate");
//				}
				
			} 
			
			// 조회 후 콜백함수 수행
			if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
		});
	};
	
	/**
	 * @desc [rptFndtn]재단목록 onRowSelect 이벤트
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 2. 17
	 */
	moPage.onRowSelect_RptFndtn = function() {
		
		util.DataMap.setValue(app, "dmReqKey", "strScalFndtnCd", util.Grid.getCellValue(app, "grdFndtn", "SCAL_FNDTN_CD"));// 장학재단코드
		util.DataMap.setValue(app, "dmReqKey", "strRefKey"	  , util.Grid.getCellValue(app, "grdFndtn", "REF_KEY")); 	 // 참조키
		util.DataMap.setValue(app, "dmReqKey", "strLanDivRcd"  , util.Grid.getCellValue(app, "grdFndtn", "LAN_DIV_RCD"));  // 언어구분
		util.DataMap.setValue(app, "dmReqKey", "strScalFndtnNm", util.Grid.getCellValue(app, "grdFndtn", "SCAL_FNDTN_NM"));// 장학재단명
		
		var vsSelTabId = util.Tab.getSelectedId(app, "tabMain");
		doTabChange(vsSelTabId);
	};
	
	/**
	 * @desc  마스터 리피트 상태에 따른 디테일 프리폼 비활성화 제어
	 *			    1. index가 지정되지 않았을 경우
	 *			    2. 현재 index의 로우가 삭제 상태일 경우 
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 2. 17
	 */
	function doCompareFrfEnable() {
		var vnIdx = util.Grid.getIndex(app, "grdFndtn");
		var vsStaus = util.Grid.getRowState(app, "grdFndtn", vnIdx);
		
		// 마스터 로우 없을경우 프리폼 리셋
		if(!vnIdx) util.Control.reset(app, "frfFndtn");
		
		if( (!vnIdx) || vsStaus == "delete") {
			util.Control.setEnable(app, false, ["frfFndtn"]);	
		}else{
			
			util.Control.setEnable(app, true, ["frfFndtn"]);
			
			// 신규일때만 활성화처리 그 외(복사 등) 비활성화
			var vsFlagGbn = util.Grid.getCellValue(app, "grdFndtn", "FLAG_GBN", vnIdx);
			if( vsStaus == "insert" && vsFlagGbn != "C"){
				util.Control.setEnable(app, true, "ipbFrfFndtnCdBase");
			}else{
				util.Control.setEnable(app, false, "ipbFrfFndtnCdBase");
			}	
		}	
		
	};
	
	/**
	 * @desc [tabBtnManage]데이터관리 onClick 이벤트
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 2. 17
	 */
	moPage.onClick_TabBtnManage = function() {
		doTabChange(TAB.MANAGE);
	};
	
	/**
	 * @desc [tabBtnHistory]이력관리 onClick 이벤트
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 2. 17
	 */
	moPage.onClick_TabBtnHistory = function() {
		doTabChange(TAB.HIS);
	};
	
	/**
	 * @desc [tabBtnLan]언어 onClick 이벤트
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 2. 17
	 */
	moPage.onClick_TabBtnLan = function() {
		doTabChange(TAB.LAN);
	};
	
	/**
	 * @desc [tabBtnLan]주소정보 onClick 이벤트
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 2. 17
	 */
	moPage.onClick_TabBtnAddr = function() {
		doTabChange(TAB.ADDR);
	}
	
	/**
	 * @desc 탭 변경시
	 * @param  {String} psCaseId 탭페이지명
	 * @return void
	 * @author Aeyoung Lee 2016. 2. 17
	 */
	function doTabChange(psCaseId) {
		
		// 재단목록 선택된 ROW 검사
		var vnSelectRowIdx = util.Grid.getIndex(app, "grdFndtn");
		
		if (!vnSelectRowIdx) {
			// 데이터관리 프리폼 초기화
			util.Control.reset(app, "frfFndtn");
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
					if(util.Grid.isModified(app, ["grdFndtn"], "CRM") ){
						// tab 이동 하지 않음
						ExtTab.setTabBtn("tabMain", TAB_BTN[vsSelTabId]);
						return false;
					}else{
						// 재단 목록 변경이 일어난 후 다른탭으로 이동시 프리폼 리셋 처리
						if(util.Grid.isModified(app, ["grdFndtn"])){
							util.Grid.revertAllData(app, "grdFndtn");
							util.Control.reset(app, "frfFndtn");
						}
					}	
					break;
				}
				
				// 1-2. 이력관리  버튼 선택
				case TAB.HIS : {
					// 이력관리 리피트 변경내역 있는 경우
					if(util.Grid.isModified(app, ["grdFndtnHistory"], "CRM")){
						// tab 이동 하지 않음
						ExtTab.setTabBtn("tabMain", TAB_BTN[vsSelTabId]);
						return false;
					}else{
						if(util.Grid.isModified(app, ["grdFndtnHistory"]) ){
							// 이력 목록 리셋
							util.Grid.revertAllData(app, "grdFndtnHistory");
						}
					}
					break;
				}
				
				// 1-3. 언어 버튼 선택
				case TAB.LAN : {
					// 언어 리피트 변경내역 있는 경우
					if(util.Grid.isModified(app, ["grdFndtnLan"], "CRM")){
						// tab 이동 하지 않음
						ExtTab.setTabBtn("tabMain", TAB_BTN[vsSelTabId]);
						return false;
					}else{
						// 언어 목록 변경이 일어난 후 다른탭으로 이동시 프리폼 리셋 처리
						if(util.Grid.isModified(app, ["grdFndtnLan"])){
							util.Grid.revertAllData(app, "grdFndtnLan");
							util.Control.reset(app, "frfFndtnLan");
						}
					}
					break;
				}
				
				// 1-4. 주소정보 버튼 선택
				case TAB.ADDR : {
					// 언어 리피트 변경내역 있는 경우
					if(util.Grid.isModified(app, ["grdFndtnAddr"], "CRM")){
						// tab 이동 하지 않음
						ExtTab.setTabBtn("tabMain", TAB_BTN[vsSelTabId]);
						return false;
					}else{
						// 언어 목록 변경이 일어난 후 다른탭으로 이동시 프리폼 리셋 처리
						if(util.Grid.isModified(app, ["grdFndtnAddr"])){
							util.Grid.revertAllData(app, "grdFndtnAddr");
							util.Control.reset(app, "frfFndtnAddr");
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
			// 3-4. 주소 조회
			case TAB.ADDR : {
				doListAddr();
				break;
			}
		}
	};
	
	/**
	 * @desc 재단(프리폼) 조회
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 2. 17
	 */
	function doListDtl() {
		// 리피트 특정 row 데이터를 프리폼 copy
//TO-BE: <ExtRepeat.copyRowForm> 그리드-프리폼인 경우에는 selection바인딩으로 처리하기 때문에 불필요함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.copyRowForm("rptFndtn","frfFndtn");
		
		// 마스터 리피트 상태에 따른 디테일 프리폼 비활성화 제어
		doCompareFrfEnable();
	};
	
	/**
	 * @desc 히스토리(이력)목록 조회
	 * @param poCallBackFunc 콜백정의
	 * @return void
	 * @author Aeyoung Lee 2016. 2. 17
	 */
	function doListHistory(poCallBackFunc) {
		
		util.Control.setValue(app, "dipKeyDtHistory", util.DataMap.getValue(app, "dmReqKey", "strKeyDt"));
		
		// 이력관리 조회 서브이션 
		//strCommand: listFndHist 
		util.Submit.send(app, "subFndListHistory", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdFndtnHistory");
			}
			
			// 조회 후 콜백함수 수행
			if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
		});
	};
	
	/**
	 * @desc 언어목록 조회
	 * @param poCallBackFunc 콜백정의
	 * @return void
	 * @author Aeyoung Lee 2016. 2. 17
	 */
	function doListLan(poCallBackFunc) {
		
		// 언어목록 조회 서브이션 
		//strCommand: listFndLan 
		util.Submit.send(app, "subFndListLan", function(pbSuccess){
			if(pbSuccess){
				
				util.Control.redraw(app, "grdFndtnLan");
				
				if(util.Grid.getIndex(app, "grdFndtnLan") <= 0){
					util.Control.reset(app, "frfFndtnLan");
					util.Control.setEnable(app, false, ["frfFndtnLan"]);		
				}else{
					util.Control.setEnable(app, true, ["frfFndtnLan"]);		
				}	
			}
			
			// 조회 후 콜백함수 수행
			if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
		});
	};
	
	/**
	 * @desc 주소목록 조회
	 * @param poCallBackFunc 콜백정의
	 * @return void
	 * @author Aeyoung Lee 2016. 2. 17
	 */
	function doListAddr(poCallBackFunc) {
		
		// 주소기준일자 셋팅
		util.Control.setValue(app, "dipKeyDtAddr", util.DataMap.getValue(app, "dmReqKey", "strKeyDt"));
		
		util.Control.redraw(app, ["ipbFndtnCdAddr","ipbFndtnNmAddr","dipKeyDtAddr"]);
		
		// 언어목록 조회 서브이션 
		//strCommand: listFndAddr 
		util.Submit.send(app, "subFndListAddr", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdFndtnAddr");
				
				if(util.Grid.getIndex(app, "grdFndtnAddr") <= 0){
					util.Control.reset(app, "frfFndtnAddr");
					util.Control.setEnable(app, false, ["frfFndtnAddr"]);		
				}else{
					util.Control.setEnable(app, true, ["frfFndtnAddr"]);		
				}	
			}
			
			// 조회 후 콜백함수 수행
			if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
		});
	};
	
	/**
	 * @desc [frfFndtn]재단 onUpdate 이벤트
	 * @param 
	 * @return  
	 * @author Aeyoung Lee at 2016. 1. 26
	 */
	moPage.onUpdate_FrfFndtn = function() {
		// 프리폼 업데이트내용 그리드 반영
//TO-BE: <ExtFreeForm.updateToRpt> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtFreeForm.updateToRpt("rptFndtn", "frfFndtn");
	};
	
	/**
	 * @desc [ipbFrfFndtnCdBase] 재단코드 변경 이벤트
			- 재단코드가 이미 사용중인 건인지 체크
	 * @param 
	 * @return  
	 * @author Aeyoung Lee at 2016. 1. 26
	 */
	moPage.onValueChanged_IpbFrfFndtnCdBase = function() {
		
		var vsStatus = util.Grid.getRowState(app, "grdFndtn");
		
		if(vsStatus == "insert"){
			
			util.DataMap.setValue(app, "dmReqCheck", "strScalFndtnCd", util.Control.getValue(app, "ipbFrfFndtnCdBase"));	// 장학재단코드
			util.DataMap.setValue(app, "dmReqCheck", "strStDt"		, "");			// 시작일자
			util.DataMap.setValue(app, "dmReqCheck", "strEndDt"		, "");			// 종료일자
			
			//strCommand: checkFndtnCd 
			util.Submit.send(app, "subCheckScalFndtnCd", function(pbSuccess){
				if(pbSuccess){
					var vsCnt = util.DataMap.getValue(app, "dmResList", "resultCount");
					if(Number(vsCnt) > 0){
						util.Msg.alert("NLS-CSS-M068");
						util.Grid.setCellValue(app, "grdFndtn", "SCAL_FNDTN_CD", "", util.Grid.getIndex(app, "grdFndtn"));
						util.Control.setValue(app, "ipbFrfFndtnCdBase", "");
					}
					
				}
			});
		}	
	};
	
	/**
	 * @desc [btnCopy]복사 onClick 이벤트
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 2. 17
	 */
	moPage.onClick_BtnCopy = function() {
		// 데이터관리 변경내역 있는 경우
		if(util.Grid.isModified(app, ["grdFndtn"])){
			var vsMsgParam = util.Grid.getTitle(app, "grdFndtnFndtn");
			//@의 시점 복사 작업은 [작업저장]후 진행하시기 바랍니다.
			util.Msg.alert("NLS-CSS-M089", [vsMsgParam]);
			return false;
		}	
		
		// 기준일자 필수 체크
		if(!util.validate(app, ["dipKeyDt"])){
			return false;
		}
		
		// 마스터 리피트 row 선택여부 체크
		var vnOrgRowIdx = util.Grid.getIndex(app, "grdFndtn");
		if(vnOrgRowIdx == "0"){
			var vsMsgParam = util.Grid.getTitle(app, "grdFndtnFndtn");
			// "@(을)를 선택해주세요" 메시지 출력
			util.Msg.alert("NLS-INF-M045", [vsMsgParam]);
			return;
		}
		
		var vsStDt = util.Grid.getCellValue(app, "grdFndtn", "ST_DT", vnOrgRowIdx).substring(0, 8);
		var vsEndDt = util.Grid.getCellValue(app, "grdFndtn", "END_DT", vnOrgRowIdx).substring(0, 8);
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
			var vsMsgParam = ExtControl.getTextValue("lblTitleFrfFndtn");
			// "폐기된 @은(는) 복사할 수 없습니다. 이력관리 탭에서 복구해주시기 바랍니다." 메시지 출력.
			util.Msg.alert("NLS-WRN-M208", [vsMsgParam]);
			return;
		}
		
		// 신규로우 추가
		var vnNextRow = util.Grid.insertRow(app, "grdFndtn", null, vnOrgRowIdx);		
		ExtRepeat.copyToRowData("rptFndtn", vnOrgRowIdx, "rptFndtn", vnNextRow);
		
		// 기본값 세팅
		util.Grid.setCellValue(app, "grdFndtn", "UPT_STATUS", "N", vnNextRow);
		util.Grid.setCellValue(app, "grdFndtn", "LAN_DIV_RCD", msSystemLocale	  , vnNextRow);
		util.Grid.setCellValue(app, "grdFndtn", "ST_DT"	  	, vsKeyDate+"000000", vnNextRow);
		util.Grid.setCellValue(app, "grdFndtn", "END_DT"	 	, "99991231000000"  , vnNextRow);
		util.Grid.setCellValue(app, "grdFndtn", "REF_KEY"	, ""  , vnNextRow);
		util.Grid.setCellValue(app, "grdFndtn", "FLAG_GBN"	, "C" , vnNextRow);
		
//TO-BE: <ExtRepeat.copyRowForm> 그리드-프리폼인 경우에는 selection바인딩으로 처리하기 때문에 불필요함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.copyRowForm("rptFndtn","frfFndtn", vnNextRow);
		
		// 셋팅하고 로우체인지가 일어나는게 아니므로 호출해야함
		doCompareFrfEnable();	
		
		// 프리폼 항목 포커스
		util.Control.setFocus(app,  "ipbFrfFndtnNmBase");
	};
	
	/**
	 * @desc [btnNew]신규 onClick 이벤트
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 2. 17
	 */
	moPage.onClick_BtnNew = function() {
		// 복사한 이력이 존재하는지 확인
		var vnCopyNodeLength = ExtInstance.getNodeListLength("/root/resList/rptFndtn/row[child::FLAG_GBN='C']");
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
		var vnIdx = util.Grid.insertRow(app, "grdFndtn");
		
		// 신규 Defalut값 설정 
		util.Grid.setCellValue(app, "grdFndtn", "ST_DT", util.DataMap.getValue(app, "dmReqKey", "strKeyDt"), vnIdx);
		util.Grid.setCellValue(app, "grdFndtn", "END_DT", "99991231000000", vnIdx);
		util.Grid.setCellValue(app, "grdFndtn", "LAN_DIV_RCD", msSystemLocale, vnIdx);
		util.Grid.setCellValue(app, "grdFndtn", "FLAG_GBN", "N", vnIdx);
		
		// 리피트 특정 row 데이터를 프리폼 copy
//TO-BE: <ExtRepeat.copyRowForm> 그리드-프리폼인 경우에는 selection바인딩으로 처리하기 때문에 불필요함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.copyRowForm("rptFndtn","frfFndtn");
		
		// 셋팅하고 로우체인지가 일어나는게 아니므로 호출해야함
		doCompareFrfEnable();	
		
		// 프리폼 항목 포커스
		util.Control.setFocus(app,  "ipbFrfFndtnCdBase");
	};
	
	/**
	 * @desc [btnDel]삭제 onClick 이벤트
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 2. 17
	 */
	moPage.onClick_BtnDel = function() {
		// 마스터 리피트 row 선택여부 체크
		var vnOrgRowIdx = util.Grid.getIndex(app, "grdFndtn");
		if(vnOrgRowIdx == "0"){
			var vsMsgParam = util.Grid.getTitle(app, "grdFndtnFndtn");
			// "@(을)를 선택해주세요" 메시지 출력
			util.Msg.alert("NLS-INF-M045", [vsMsgParam]);
			return;
		}
		
		var vsRptStatus = util.Grid.getRowState(app, "grdFndtn", vnOrgRowIdx);
		if(vsRptStatus == "insert"){
			// 삭제
			util.Grid.deleteRow(app, "grdFndtn");
			// 마스터 리피트 상태에 따른 디테일 프리폼 비활성화 제어
			doCompareFrfEnable();	
			return;
			
		}else {
			
			// 복사한 이력이 존재하는지 확인
			var vnCopyNodeLength = ExtInstance.getNodeListLength("/root/resList/rptFndtn/row[child::FLAG_GBN='C']");
			if(vnCopyNodeLength > 0){
				//복사중인 데이터가 있습니다. 저장 후 진행하세요.
				util.Msg.alert("NLS-CSS-M088");
				return false;
			}
			
			// 신규건이면 작업취소
			var vsScalFndtnCd = util.Grid.getCellValue(app, "grdFndtn", "SCAL_FNDTN_CD", vnOrgRowIdx);
			var vsStDt = util.Grid.getCellValue(app, "grdFndtn", "ST_DT", vnOrgRowIdx).substring(0, 8);
			var vsEndDt = util.Grid.getCellValue(app, "grdFndtn", "END_DT", vnOrgRowIdx).substring(0, 8);
			var vsKeyDate = util.DataMap.getValue(app, "dmReqKey", "strKeyDt").substring(0, 8);
			
			if(vsEndDt != "99991231"){
				// 종료일이 9999-12-31인 데이터만 @1할 수 있습니다. 
				util.Msg.alert("NLS-CSS-M001", [NLS.NSCR.DEL]);
				return;
			}	
			
			// 장학재단코드 사용 중인지 체크
			util.DataMap.setValue(app, "dmReqCheck", "strScalFndtnCd", vsScalFndtnCd);	// 장학재단코드
			util.DataMap.setValue(app, "dmReqCheck", "strStDt"		, vsStDt);			// 시작일자
			util.DataMap.setValue(app, "dmReqCheck", "strEndDt"		, vsEndDt);			// 종료일자
				
			//strCommand: checkScalFndtnCd 
			util.Submit.send(app, "subCheckScalFndtnCd", function(pbSuccess){
				if(pbSuccess){
					var vnResCnt = Number(util.DataMap.getValue(app, "dmResList", "resultCount"));
					if(vnResCnt != 0){
						// 사용중인 장학금재단 코드입니다.
						util.Msg.alert("NLS-CSS-M013" ,[NLS.NSCR.REGFEEFNDTN]);
						return ;
					}
					// 삭제
					util.Grid.deleteRow(app, "grdFndtn");
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
	 * @author Aeyoung Lee 2016. 2. 17
	 */
	moPage.onClick_BtnRestore = function() {
		// 작업취소
		util.Grid.restoreRow(app, "grdFndtn");
		// 마스터 리피트 상태에 따른 디테일 프리폼 비활성화 제어
		doCompareFrfEnable();
		// 취소내용 프리폼 반영
//TO-BE: <ExtRepeat.copyRowForm> 그리드-프리폼인 경우에는 selection바인딩으로 처리하기 때문에 불필요함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.copyRowForm("rptFndtn", "frfFndtn");
	};
	
	/**
	 * @desc [btnSave]작업저장 onClick 이벤트
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 2. 17
	 */
	moPage.onClick_BtnSave = function() {
		// 작업저장
		doSave();
	};
	
	/**
	 * @desc 재단목록 저장
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 2. 17
	 */
	function doSave() {
		
		// 리피트 변경사항 체크
		if(!util.Grid.isModified(app, ["grdFndtn"], "MSG")){
			return false;
		}
		
		// 리피트 Validation Check
		if(!util.validate(app, "grdFndtn")) return false;
		
		//strCommand: saveFndtn 
		util.Submit.send(app, "subSave", function(pbSuccess){
			if(pbSuccess){
				
				//조회건수가 0건이면 프리폼이 내역이 반영되지 않기 떄문
				util.Control.reset(app, "frfFndtn");
				
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
	 * @author Aeyoung Lee 2016. 2. 17
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
	moPage.setCssFndtnPkColRowValue = function(vpRptDetail){
		var vsPkColValues = ExtRepeat.getPKColRowValues(vpRptDetail);					
		if(!ValueUtil.isNull(vsPkColValues)){
			ExtRepeat.setPkValues("rptFndtn", vsPkColValues);
		}
	};
	
	/**
	 * @desc 기준일 이전날짜 추출
	 * @param 기준일
	 * @return  기준일 이전일
	 * @author Aeyoung Lee 2016. 2. 17
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
	 * @author Aeyoung Lee 2016. 2. 17
	 */
	moPage.onClick_BtnDisUse = function() {
		// 재단 폐기
		doDisUseHistory();
	};
	
	/**
	 * @desc 재단 폐기
	 * @param 
	 * @return  void
	 * @author Aeyoung Lee 2016. 2. 17
	 */
	function doDisUseHistory() {
		var vnCnt = Number(util.Grid.getRowCount(app, "grdFndtnHistory"));
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
			var vsEndDt = util.Grid.getCellValue(app, "grdFndtnHistory", "END_DT", i).substring(0, 8);
			var vsStDt  = util.Grid.getCellValue(app, "grdFndtnHistory", "ST_DT", i).substring(0, 8);
			if (vsEndDt == "99991231") {
				vsMaxEndDt 	= vsEndDt;
				vsMaxStDt   = vsStDt;
				vnMaxRowIdx = i;
				break;
			}
		}
		
		// 종료일자가 99991231이 아닐때, 폐기 불가
		if (vnMaxRowIdx == null) {
			// "폐기 가능한 데이터가 없습니다." 메시지 표시
			util.Msg.alert("NLS-INF-M029");
			return;
		}
		
		var vsBefDate = this.getBefDate(vsKeyDtHist).substring(0, 8);	// 폐기일자 -1
		
		if (vsMaxStDt > vsBefDate) {
			// 해당 기준일자로 폐기가능한 테이터가 없습니다.
			util.Msg.alert("NLS-CSS-M007", [NLS.NSCR.DISUSE]);
			return;
		}
		
		util.DataMap.setValue(app, "dmReqKey", "strStDt", vsKeyDtHist);
		util.DataMap.setValue(app, "dmReqKey", "strEndDt", vsMaxEndDt);
		
		// 폐기 가능여부 체크
		//strCommand: checkScalFndtnCd 
		util.Submit.send(app, "subCheckScalFndtnCd", function(pbSuccess){
			if(pbSuccess){
				
				//폐기 가능할때 
				var vnResCnt = Number(util.DataMap.getValue(app, "dmResList", "resultCount"));
				if(vnResCnt != 0){
					// 사용중인 장학금재단 코드입니다.
					util.Msg.alert("NLS-CSS-M013" ,[NLS.NSCR.REGFEEFNDTN]);
					return ;
				}
					
				// 전날자로 타겟로우의 종료일자 업데이트
				var vsMsgDate = vsKeyDtHist.substring(0, 4) + NLS.NSCR.YEAR + vsKeyDtHist.substring(4, 6) + NLS.NSCR.MONTH + vsKeyDtHist.substring(6, 8) + NLS.NSCR.DAY;
				
				// "@부로 폐기합니다. \n진행하시겠습니까?" 메시지
				if(util.Msg.confirm("NLS-CRM-M047", [vsMsgDate])   ){
					util.Grid.setCellValue(app, "grdFndtnHistory", "END_DT", vsBefDate + "000000", vnMaxRowIdx);
					util.Grid.selectRow(app, "grdFndtnHistory", vnMaxRowIdx, true);
					
					/*
						그리드에 pk_colvalues를 넣는다.
						조회 후 찾아주기 위함.
					*/
					if(vsSchKeyDt+"000000" >= vsMaxStDt+"000000"){
						this.setCssFndtnPkColRowValue("rptFndtnHistory");
					}else{
						this.setCssFndtnPkColRowValue("rptFndtn");
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
	 * @author Aeyoung Lee 2016. 2. 17
	 */
	moPage.onClick_BtnDisUseCanc = function() {
		// 교과목 폐기취소
		doUseCancHistory();
	};
	
	/**
	 * @desc 재단 폐기취소
	 * @param 
	 * @return  void
	 * @author Aeyoung Lee 2016. 2. 17
	 */
	function doUseCancHistory() {
		var vnCnt = util.Grid.getRowCount(app, "grdFndtnHistory");
		if(vnCnt == 0) return;	
		
		// 조회조건 기준일자 : 마스터 포커스용
		var vsSchKeyDt = util.DataMap.getValue(app, "dmReqKey", "strKeyDt").substring(0, 8);
		
		var vnMaxRowIdx = null;
		var vsMaxEndDt 	= null;
		var vsMaxStDt   = null;
		for (var i = 1; i <= vnCnt; i++) {
			var vsStDt  = util.Grid.getCellValue(app, "grdFndtnHistory", "ST_DT", i).substring(0, 8);
			var vsEndDt = util.Grid.getCellValue(app, "grdFndtnHistory", "END_DT", i).substring(0, 8);
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
			util.Grid.setCellValue(app, "grdFndtnHistory", "END_DT", "99991231000000", vnMaxRowIdx);
			util.Grid.selectRow(app, "grdFndtnHistory", vnMaxRowIdx);
			
			/*
				그리드에 pk_colvalues를 넣는다.
				조회 후 찾아주기 위함.
			*/
			if(vsSchKeyDt+"000000" >= vsMaxStDt+"000000"){
				this.setCssFndtnPkColRowValue("rptFndtnHistory");
			}else{
				this.setCssFndtnPkColRowValue("rptFndtn");
			}
			
			// 이력사항 변경사항 저장
			doSaveHis();
		}
	};
	
	/**
	 * @desc [btnRecover]복구 onClick 이벤트
	 * @param 
	 * @return  void
	 * @author Aeyoung Lee 2016. 2. 17
	 */
	moPage.onClick_BtnRecover = function() {
		// 재단 복구
		doRecoverHistory();
	};
	
	/**
	 * @desc 재단 복구 : 가장 최근의 레코드를 카피하여 insert한다. (단, 기준일자가 최종일자보다 커야 한다.)
	 * @param 
	 * @return  void
	 * @author Aeyoung Lee 2016. 2. 17
	 */
	function doRecoverHistory() {
		var vnCnt = util.Grid.getRowCount(app, "grdFndtnHistory");
		if(vnCnt == 0) return;
		
		// 폐기/복구일자 유효성 체크
		if(!util.validate(app, "dipKeyDtHistory")) return false;
		
		var vsSchKeyDt = util.DataMap.getValue(app, "dmReqKey", "strKeyDt").substring(0, 8);	// 조회조건 기준일자 : 마스터 포커스용
		var vsKeyDtHistory = util.Control.getValue(app, "dipKeyDtHistory").substring(0, 8);	// 폐기/복구일자
		
		var vsMaxStDt   = null;
		var vsMaxEndDt  = null;
		var vnMaxRowIdx = null;
		for (var i = 1; i <= vnCnt; i++) {
			var vsStDt = util.Grid.getCellValue(app, "grdFndtnHistory", "ST_DT", i).substring(0, 8);
			var vsEndDt = util.Grid.getCellValue(app, "grdFndtnHistory", "END_DT", i).substring(0, 8);
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
		 if (util.Msg.confirm("NLS-CRM-M049", [vsMsgDate])   ) {
			/*
				그리드에 pk_colvalues를 넣는다.
				조회 후 찾아주기 위함.
			*/
			if(vsSchKeyDt+"000000" >= vsMaxStDt+"000000"){
				this.setCssFndtnPkColRowValue("rptFndtnHistory");
			}else{
				this.setCssFndtnPkColRowValue("rptFndtn");
			}
			
			// 찾은로우 다음로우에 inserRow를 진행해야함 인덱스가 중복되는 경우가 있기때문
			var vnNextRow = util.Grid.insertRow(app, "grdFndtnHistory", null, vnMaxRowIdx);
			ExtRepeat.copyToRowData("rptFndtnHistory", vnMaxRowIdx, "rptFndtnHistory", vnNextRow);
			
			util.Grid.setCellValue(app, "grdFndtnHistory", "ST_DT"	  , vsKeyDtHistory + "000000", vnNextRow);
			util.Grid.setCellValue(app, "grdFndtnHistory", "END_DT"	  , "99991231000000"		 , vnNextRow);
			util.Grid.setCellValue(app, "grdFndtnHistory", "REF_KEY"	  , ""						 , vnNextRow);
			util.Grid.setCellValue(app, "grdFndtnHistory", "UPT_STATUS", "N"						 , vnNextRow);
			
			// 이력사항 변경사항 저장
			doSaveHis();
		 }
	};
	
	/**
	 * @desc 이력관리목록 변경사항 저장
	 * @param 
	 * @return  
	 * @author Aeyoung Lee 2016. 2. 17
	 */
	function doSaveHis() {
		// 리피트 변경사항 체크
		if(!util.Grid.isModified(app, ["grdFndtnHistory"], "MSG")){
			return false;
		}
		
		//strCommand: saveFndtn 
		util.Submit.send(app, "subSaveHistory", function(pbSuccess){
			if(pbSuccess) {
//				// 디테일 저장시 마스터의 포커스를 찾아가기위한 인스턴스 설정
//				var vsSbCd =  ExtInstance.getValue("/root/reqSelRow/strSbCd");
//				ExtInstance.setValue("/root/reqSelRow/strTmpSbCd", vsSbCd);
				util.Control.redraw(app, "grdFndtnHistory");
				
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
	 * @desc [rptFndtnLan]언어목록 onRowSelect 이벤트
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 2. 18
	 */
	moPage.onRowSelect_RptFndtnLan = function() {
		// 리피트 특정 row 데이터를 프리폼 copy
//TO-BE: <ExtRepeat.copyRowForm> 그리드-프리폼인 경우에는 selection바인딩으로 처리하기 때문에 불필요함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.copyRowForm("rptFndtnLan", "frfFndtnLan");
		// 프리폼 비활성화 제어
		doCompareFrfEnableLan();
	};
	
	/**
	 * @desc [frfFndtnLan]언어목록 onUpdate 이벤트
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 2. 18
	 */
	moPage.onUpdate_FrfFndtnLan = function() {
		// 프리폼 업데이트내용 그리드 반영
//TO-BE: <ExtFreeForm.updateToRpt> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtFreeForm.updateToRpt("rptFndtnLan", "frfFndtnLan");
	};
	
	/**
	 * @desc  마스터 리피트 상태에 따른 디테일 프리폼 비활성화 제어(언어목록)
	 *			    1. index가 지정되지 않았을 경우
	 *			    2. 현재 index의 로우가 삭제 상태일 경우 
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 2. 18
	 */
	function doCompareFrfEnableLan() {
	
		if( (!util.Grid.getIndex(app, "grdFndtnLan")) || util.Grid.getRowState(app, "grdFndtnLan") == cpr.data.tabledata.RowState.DELETED){
			util.Control.setEnable(app, false, ["frfFndtnLan"]);	
		} else {
			
			// 기본언어인 경우 프리폼항목 Enable false
			var vaDefLanPkEnableCtl = ["cbbFrfLanDivRcdLan"];
			var vaDefLanEnableCtl = ["ipbFrfFndtnNmLan", "ipbFrfShortNmLan", "ipbFrfPrtNmLan", "ipbFrfRepNmLan", "ipbFrfChagDeptNmLan", "ipbFrfChargerNmLan", "ipbFrfInturNmLan", "txtFrfIntuBkgrLan"];
			
			var vsStandLan = util.DataMap.getValue(app, "dmReqKey", "strLanDivRcd");
			var vsLan = util.Grid.getCellValue(app, "grdFndtnLan", "LAN_DIV_RCD");
			
			if(vsStandLan == vsLan && util.Grid.getRowState(app, "grdFndtnLan") != cpr.data.tabledata.RowState.INSERTED){
				util.Control.setEnable(app, false, vaDefLanPkEnableCtl);	
				util.Control.setEnable(app, false, vaDefLanEnableCtl);	
			}else if(util.Grid.getRowState(app, "grdFndtnLan") == ""){
				util.Control.setEnable(app, false, vaDefLanPkEnableCtl);	
				util.Control.setEnable(app, true, vaDefLanEnableCtl);	
			}else{
				util.Control.setEnable(app, true, vaDefLanPkEnableCtl);	
				util.Control.setEnable(app, true, vaDefLanEnableCtl);		
			}	
		}
		
		// 언어목록 변경사항 에따른 재단목록 Enable 처리
		if(util.Grid.isModified(app, "grdFndtnLan")){
			util.Control.setEnable(app, false, ["grpData"]);
		}else {
			util.Control.setEnable(app, true, ["grpData"]);
		}
	};
	
	/**
	 * @desc [btnNewLan]신규(언어) onClick 이벤트
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 2. 18
	 */
	moPage.onClick_BtnNewLan = function() {
		// 신규로우 추가
		var vnIdx = util.Grid.insertRow(app, "grdFndtnLan");
		
		// 신규 Defalut값 설정 		
		util.Grid.setCellValue(app, "grdFndtnLan", "SCAL_FNDTN_CD", util.DataMap.getValue(app, "dmReqKey", "strScalFndtnCd"));	// 재단코드
		util.Grid.setCellValue(app, "grdFndtnLan", "REF_KEY"	     , util.DataMap.getValue(app, "dmReqKey", "strRefKey"));			// 참조키
		
//TO-BE: <ExtRepeat.copyRowForm> 그리드-프리폼인 경우에는 selection바인딩으로 처리하기 때문에 불필요함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.copyRowForm("rptFndtnLan", "frfFndtnLan", vnIdx);
		
		// 프리폼 항목 포커스
		util.Control.setFocus(app,  "cbbFrfLanDivRcdLan");
	};
	
	/**
	 * @desc [btnDelLan]삭제(언어) onClick 이벤트
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 2. 18
	 */
	moPage.onClick_BtnDelLan = function() {
		
		// 기본언어구분
		var vsStnLanDivRcd = ValueUtil.fixNull(util.DataMap.getValue(app, "dmReqKey", "strLanDivRcd"));
		var vsLanDivRcd =  util.FreeForm.getValue(app, "frfFndtnLan", "LAN_DIV_RCD")
		
		var vsUptStatus = util.Grid.getRowState(app, "grdFndtnLan", "UPT_STATUS");
		if (vsStnLanDivRcd == vsLanDivRcd && vsUptStatus != "insert"){
			// 기본언어레코드는 삭제할 수 없습니다. 메시지 표시
			util.Msg.alert("NLS-WRN-M010");
			return;
		}
		
		// 삭제
		util.Grid.deleteRow(app, "grdFndtnLan");
		// 마스터 리피트 상태에 따른 디테일 프리폼 비활성화 제어
		doCompareFrfEnableLan();
	};
	
	/**
	 * @desc [btnRestoreLan]작업취소(언어) onClick 이벤트
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 2. 18
	 */
	moPage.onClick_BtnRestoreLan = function() {
		// 작업취소
		util.Grid.restoreRow(app, "grdFndtnLan");
		// 취소내용 프리폼 반영
//TO-BE: <ExtRepeat.copyRowForm> 그리드-프리폼인 경우에는 selection바인딩으로 처리하기 때문에 불필요함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.copyRowForm("rptFndtnLan", "frfFndtnLan");
		// 마스터 리피트 상태에 따른 디테일 프리폼 비활성화 제어
		doCompareFrfEnableLan();
	};
	
	/**
	 * @desc [btnSaveLan]작업저장(언어) onClick 이벤트
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 2. 18
	 */
	moPage.onClick_BtnSaveLan = function() {
		// 언어목록 변경사항 저장
		doSaveLan();
	};
	
	/**
	 * @desc 언어목록 변경사항 저장
	 * @param 
	 * @return  
	 * @author Aeyoung Lee 2016. 2. 18
	 */
	function doSaveLan() {
		// 리피트 변경사항 체크
		if(!util.Grid.isModified(app, ["grdFndtnLan"], "MSG")){
			return false;
		}
		
		// 리피트 Validation Check
		if(!util.validate(app, "grdFndtnLan")) return false;
		
		//strCommand: saveScalFndtnLan 
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
	 * @desc [rptFndtnAddr]주소목록 onRowSelect 이벤트
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 2. 18
	 */
	moPage.onRowSelect_RptFndtnAddr = function() {
		// 리피트 특정 row 데이터를 프리폼 copy
//TO-BE: <ExtRepeat.copyRowForm> 그리드-프리폼인 경우에는 selection바인딩으로 처리하기 때문에 불필요함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.copyRowForm("rptFndtnAddr", "frfFndtnAddr");
		// 프리폼 비활성화 제어
		doCompareFrfEnableAddr();
	}
	
	/**
	 * @desc 기준일자-주소(돋보기버튼) onClick 이벤트
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 2. 17
	 */
	moPage.onClick_BtnYearSmtAddr = function() {
		//기준일자 임포트(달력컨트롤ID,임포트ID)
		doOnclickSchYearSmt("dipKeyDtAddr","impSchYearSmt");
	}
	
	/**
	 * @desc [frfFndtnAddr]주소목록 onUpdate 이벤트
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 2. 18
	 */
	moPage.onUpdate_FrfFndtnAddr = function() {
		// 프리폼 업데이트내용 그리드 반영
//TO-BE: <ExtFreeForm.updateToRpt> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtFreeForm.updateToRpt("rptFndtnAddr", "frfFndtnAddr");
	}
	
	/**
	 * @desc  마스터 리피트 상태에 따른 디테일 프리폼 비활성화 제어(주소목록)
	 *			    1. index가 지정되지 않았을 경우
	 *			    2. 현재 index의 로우가 삭제 상태일 경우 
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 2. 18
	 */
	function doCompareFrfEnableAddr() {
		
		if( (!util.Grid.getIndex(app, "grdFndtnAddr")) || util.Grid.getRowState(app, "grdFndtnAddr") == cpr.data.tabledata.RowState.DELETED){
			util.Control.setEnable(app, false, ["frfFndtnAddr"]);	
		} else {
			util.Control.setEnable(app, true, ["frfFndtnAddr"]);	
		}
		
		// 주소목록 변경사항 에따른 재단목록 Enable 처리
		if(util.Grid.isModified(app, "grdFndtnAddr")){
			util.Control.setEnable(app, false, ["grpData"]);
		}else {
			util.Control.setEnable(app, true, ["grpData"]);
		}
	};
	
	/**
	 * @desc [btnPopZipcode]우편번호검색버튼 onClick 이벤트
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 2. 18
	 */
	moPage.onClick_BtnPopZipcode = function(sender) {
		doOnClickStdCmnPZipSearch(sender);
	};
	
	/**
	 * @desc [btnNewAddr]신규(주소) onClick 이벤트
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 2. 18
	 */
	moPage.onClick_BtnNewAddr = function() {
		// 기준일자 필수 체크
		if(!util.validate(app, ["dipKeyDtAddr"])){
			return false;
		}
		
		var vsKeyDtAddr = util.Control.getValue(app, "dipKeyDtAddr").substring(0, 8);
		var vsMaxStDt   = null;
		var vsMaxEndDt  = null;
		var vnMaxRowIdx = null;
		var vsTmpStDt   = null;
		for (var i = 1; i <= util.Grid.getRowCount(app, "grdFndtnAddr"); i++) {
			
			var vsStatus = util.Grid.getRowState(app, "grdFndtnAddr", i);
			if(vsStatus == "delete") continue;
			
			var vsStDt = util.Grid.getCellValue(app, "grdFndtnAddr", "ST_DT", i).substring(0, 8);
			var vsEndDt = util.Grid.getCellValue(app, "grdFndtnAddr", "END_DT", i).substring(0, 8);
			if ((vsMaxEndDt == null) || (vsMaxEndDt != null && vsMaxEndDt < vsEndDt)) {
				vsMaxStDt = vsStDt;
				vsMaxEndDt = vsEndDt;
				vnMaxRowIdx = i;
			}
			
			if (vsKeyDtAddr < vsStDt) {
				vsTmpStDt = Math.max(vsTmpStDt, vsStDt);
			}
		}
		
		if(vsMaxStDt >= vsKeyDtAddr){
			// 해당 기준일자로 신규가능한 테이터가 없습니다.
			util.Msg.alert("NLS-CSS-M007", ["신규"]);
			return;
		}	
		
		if(vnMaxRowIdx != null){
			util.Grid.setCellValue(app, "grdFndtnAddr", "END_DT", this.getBefDate(vsKeyDtAddr), vnMaxRowIdx);
			util.Grid.selectRow(app, "grdFndtnAddr", vnMaxRowIdx);
		}	
		
		// 최초입력인 경우 19000101, 그외 기준값
		var vsAddrNodeLength = ExtInstance.getNodeListLength("/root/resList/rptFndtnAddr/row[child::UPT_STATUS !='D']");
		var vsNewStDt = vsAddrNodeLength == 0 ? "19000101000000" : vsKeyDtAddr+"000000";
		
		// 중간시점 삽입하는 경우 종료일자를 전데이터의 시작일자 -1
		var vsNewEndDt = vsTmpStDt == null ? "99991231000000" : this.getBefDate(vsTmpStDt);
		
		var vnIdx = util.Grid.insertRow(app, "grdFndtnAddr", vnMaxRowIdx);
		
		// 신규 Defalut값 설정 		
		util.Grid.setCellValue(app, "grdFndtnAddr", "ADDR_PRP_DIV_RCD", "CB011BASE"		, vnIdx);	
		util.Grid.setCellValue(app, "grdFndtnAddr", "USE_TAB_NM"	 	 , "CSS_FNDTN"		, vnIdx);	
		util.Grid.setCellValue(app, "grdFndtnAddr", "KEY_TAB_NM"		 , util.DataMap.getValue(app, "dmReqKey", "strScalFndtnCd"), vnIdx);
		util.Grid.setCellValue(app, "grdFndtnAddr", "ST_DT"			 , vsNewStDt		, vnIdx);	
		util.Grid.setCellValue(app, "grdFndtnAddr", "END_DT"			 , vsNewEndDt		, vnIdx);	
		util.Grid.setCellValue(app, "grdFndtnAddr", "REP_ADDR_YN"	 , "Y"				, vnIdx);
		
//TO-BE: <ExtRepeat.copyRowForm> 그리드-프리폼인 경우에는 selection바인딩으로 처리하기 때문에 불필요함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.copyRowForm("rptFndtnAddr", "frfFndtnAddr", vnIdx);
		
		// 프리폼 항목 포커스
		util.Control.setFocus(app,  "ipbFrfZipcodeAddr");
	};
	
	/**
	 * @desc [btnDelLan]삭제(주소) onClick 이벤트
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 2. 18
	 */
	moPage.onClick_BtnDelAddr= function() {
		// 마스터 리피트 row 선택여부 체크
		var vnOrgRowIdx = util.Grid.getIndex(app, "grdFndtnAddr");
		if(vnOrgRowIdx == "0"){
			var vsMsgParam = util.Grid.getTitle(app, "grdFndtnAddrFndtnAddr");
			// "@(을)를 선택해주세요" 메시지 출력
			util.Msg.alert("NLS-INF-M045", [vsMsgParam]);
			return;
		}
		
		var vsDelEndDt = util.FreeForm.getValue(app, "frfFndtnAddr", "END_DT").substring(0, 8);
		
		if(vsDelEndDt != "99991231"){
			// 종료일이 9999-12-31인 데이터만 @1할 수 있습니다. 
			util.Msg.alert("NLS-CSS-M001", [NLS.NSCR.DEL]);
			return;
		}
		
		// 삭제
		util.Grid.deleteRow(app, "grdFndtnAddr");
		
		// 9999-12-31 이전자료의 인덱스값을 가지고 옴
		var vsMaxEndDt  = null;
		var vnMaxRowIdx = null;
		for (var i = 1; i <= util.Grid.getRowCount(app, "grdFndtnAddr"); i++) {
			
			var vsStatus = util.Grid.getRowState(app, "grdFndtnAddr", i);
			if(vsStatus == "delete") continue;
			
			var vsEndDt = util.Grid.getCellValue(app, "grdFndtnAddr", "END_DT", i).substring(0, 8);
			if ((vsMaxEndDt == null) || (vsMaxEndDt != null && vsMaxEndDt < vsEndDt)) {
				vsMaxEndDt = vsEndDt;
				vnMaxRowIdx = i;
			}
		}
		
		if(vnMaxRowIdx != null){			
			// 99991231 이전 데이터를 99991231로 변경
			util.Grid.setCellValue(app, "grdFndtnAddr", "END_DT", "99991231000000", vnMaxRowIdx);
			ExtRepeat.updateRow("rptFndtnAddr", "UPT_STATUS", vnMaxRowIdx);
		}
		// 마스터 리피트 상태에 따른 디테일 프리폼 비활성화 제어
		doCompareFrfEnableAddr();
	};
	
	/**
	 * @desc [btnSaveLan]작업저장(주소) onClick 이벤트
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 2. 18
	 */
	moPage.onClick_BtnSaveAddr = function() {
		// 주소목록 변경사항 저장
		doSaveAddr();
	};
	
	/**
	 * @desc 주소목록 변경사항 저장
	 * @param 
	 * @return  
	 * @author Aeyoung Lee 2016. 2. 18
	 */
	function doSaveAddr() {
		// 리피트 변경사항 체크
		if(!util.Grid.isModified(app, ["grdFndtnAddr"], "MSG")){
			return false;
		}
		
		// 리피트 Validation Check
		if(!util.validate(app, "grdFndtnAddr")) return false;
		
		//strCommand: saveAddr 
		util.Submit.send(app, "subSaveAddr", function(pbSuccess){
			if(pbSuccess) {
				// 주소목록 조회
				doListAddr(function(pbSuccessList) {
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
	
	return moPage;
};
