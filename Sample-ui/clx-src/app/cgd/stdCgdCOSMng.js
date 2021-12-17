//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./stdCgdCOSMng.xtm"/>

/**
 * 외부교과목관리
 * @class stdCgdCOSMng
 * @author 박갑수 at 2016. 3. 25
 */
var stdCgdCOSMng = function() {
	var moPage = new Page();
	
	// 임포트용 데이터 통신 오브젝트
	var moPObject = new Page();
	
	// 객체검색팝업 호출
	moPObject.moIdsForStdCmnPObjSch = [
	{
		controlId			:	"btnOtCd",
		iCd					:	"",
		iNm					:	"ipbOtNm",
		iObjDivRcd			:	["CC009OT"],
		iStartObject    	:   "",
		iOtDivRcd			:	"",
		iOtIsTreeView	:	"",
		iLanDivRcd		:	"",
		iKeyDate			:	"dipKeyDate",
		iKeyEndDate		:	"",
		oObjDivRcd		:	"/root/reqKey/strOtObjDivRcd",
		oCd					:	"/root/reqKey/strOtCd",
		oCdNm				:	"ipbOtNm",
		oBegDt				:	"",
		oEndDt				:	"",
		oLanDivRcd		:	"",
		func 					:  function(poRtnValue){
			// 조회조건 있을시 바로검색
			var vsKeyDate = util.Control.getValue(app, "dipKeyDate");
			var vsOtNm = util.Control.getValue(app, "ipbOtNm");
			if(!ValueUtil.isNull(vsKeyDate) && !ValueUtil.isNull(vsOtNm)){
				util.Header.clickSearch(app);
			}
		}
	},
	{
		controlId			:	"btnFrfOtCd",
		iCd					:	"",
		iNm					:	"ipbFrfOtNm",
		iObjDivRcd			:	["CC009OT"],
		iStartObject    	:   "",
		iOtDivRcd			:	"",
		iOtIsTreeView	:	"",
		iLanDivRcd		:	"",
		iKeyDate			:	"dipKeyDate",
		iKeyEndDate		:	"",
		oObjDivRcd		:	"ipbFrfOtObjDivRcd",
		oCd					:	"ipbFrfOtCd",
		oCdNm				:	"ipbFrfOtNm",
		oBegDt				:	"",
		oEndDt				:	"",
		oLanDivRcd		:	"",
		func 					:  function(poRtnValue){}
	}];
	
	// 탭 정의
	var TAB = {
		// 데이터관리
		MANAGE	: "tabManage",
		// 이력관리
		HIS    		: "tabHistory",
		// 언어
		LANG   		: "tabLang"
	};
	
	// 탭버튼 정의
	var TAB_BTN = {
		tabManage	: "tabBtnManage",
		tabHistory		: "tabBtnHistory",
		tabLang    		: "tabBtnLang"
	};
	
	/**
	 * @desc import 헤더 초기화
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 3. 24
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		// import 헤더 초기화
		doHeaderOnLoad();
	};
	
	/**
	 * @desc onLoad 실행
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 24
	 */
	moPage.onModelConstructDone_StdCgdCOSMng = function() {
		// 리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["rptCgdOs", "rptCgdOsHistory", "rptCgdOsLang"]);
		// 검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grpData", "grpDataDtl"]);
		//3.첫번째 탭으로 로딩
		util.Tab.setSelectedTabItem(app, "tabMain", TAB.MANAGE);
		// 기준일자 조회하는 내부 팝업 호출을 위한 단위시스템코드 설정
		setUnitSystem("CGD");
		
		// 서브미션 호출
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				
				util.Control.redraw(app, ["dipKeyDate", "cbbOsPrpRcd"]);
				util.Control.setFocus(app, "ipbOsCd");
			}
		}, true);
	};
	
	/**
	 * @desc [btnYearSmt]기준일자(돋보기버튼) onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 24
	 */
	moPage.onClick_BtnYearSmt = function() {
		//기준일자 임포트(달력컨트롤ID,임포트ID)
		doOnclickSchYearSmt("dipKeyDate","impSchYearSmt");
	};
	
	/**
	 * @desc [ipbOsCd]외부교과목코드 onKeyDown 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 24
	 */
	moPage.onKeyDown_IpbOsCd = function(strKeyType, strKeyStatus) {
		// 엔터키 입력시 조회
		if(e.keyCode == cpr.events.KeyCode.ENTER){
			var vsKeyDate = util.Control.getValue(app, "dipKeyDate");
			if(!ValueUtil.isNull(vsKeyDate)){
				util.Header.clickSearch(app);
			}
		}
	};
	
	/**
	 * @desc [ipbOsNm]외부교과목명 onKeyDown 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 24
	 */
	moPage.onKeyDown_IpbOsNm = function(strKeyType, strKeyStatus) {
		// 엔터키 입력시 조회
		if(e.keyCode == cpr.events.KeyCode.ENTER){
			var vsKeyDate = util.Control.getValue(app, "dipKeyDate");
			if(!ValueUtil.isNull(vsKeyDate)){
				util.Header.clickSearch(app);
			}
		}
	};
	
	/**
	 * @desc [ipbOtNm]외부부서 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 24
	 */
	moPage.onValueChanged_IpbOtNm = function(sender) {
		// 리피트 변경사항 체크
		if(util.Grid.isModified(app, ["grdCgdOs", "grdCgdOsLang"])){
			return false;
		}
		
		// 값변경시 객체검색팝업 호출
		doOnChangeStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc [btnOtCd]외부부서명(돋보기버튼) onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 24
	 */
	moPage.onClick_BtnOtCd = function(sender) {
		// 객체검색팝업 호출
		doOnClickStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc [btnSearch]조회 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 24
	 */
	moPage.onClick_BtnSearch = function() {
		 // 작업영역 리피트 변경 내역 체크
		if(util.Grid.isModified(app, "", "CRM")){
			return false;
		}
		
		// 조회조건 필수 체크
		if(!util.validate(app, ["dipKeyDate"])){
			return false;
		}

		// 조회
		doList(function(pbSuccess) {
			if (pbSuccess){
				// 조회 : "조회되었습니다." header 메세지 표시
				util.Msg.notify(app, "NLS.INF.M024");
			}
		});
	};
	
	/**
	 * @desc 외부교과목목록 조회
	 * @param poCallBackFunc 콜백정의
	 * @return void
	 * @author 박갑수 at 2016. 3. 24
	 */
	function doList(poCallBackFunc) {
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdCgdOs");
				
				// 폐기처리로 인해 데이터가 없어질경우 [데이터관리] 텝으로 이동하기 위함.
				var vsOsCd = util.DataMap.getValue(app, "dmReqSelRow", "strTmpOsCd");
				var vnLength = ExtInstance.getNodeListLength("/root/resList/rptCgdOs/row[child::OS_CD = '"+ vsOsCd  +"']");
				if(ValueUtil.isNull(vsOsCd ) || vnLength == 0){
					if(util.Grid.getRowCount(app, "grdCgdOs") == 0){
						// 마스터 리피트 상태에 따른 디테일 프리폼 비활성화 제어
						doCompareFrfEnable();
					}
					ExtModel.dispatch("tabBtnManage","DOMActivate");
				}
			}
			
			// 조회 후 콜백함수 수행
			if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
		});
	};
	
	/**
	 * @desc [rptCgdOs]외부교과목목록 onRowSelect 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 24
	 */
	moPage.onRowSelect_RptCgdOs = function() {
		var vsTab = util.Tab.getSelectedId(app, "tabMain");
		var vsIndex = "";
		
		if(vsTab=="tabManage"){
			vsIndex = TAB.MANAGE;
		}else if(vsTab=="tabHistory"){
			vsIndex =TAB.HIS;
		}else if(vsTab=="tabLang"){
			vsIndex =TAB.LANG;
		}
		
		var voSelectRowIdx = util.Grid.getIndex(app, "grdCgdOs");
		util.DataMap.setValue(app, "dmReqSelRow", "strOsCd", util.Grid.getCellValue(app, "grdCgdOs", "OS_CD"  	,voSelectRowIdx));						// 외부교과목코드
		util.DataMap.setValue(app, "dmReqSelRow", "strRefKey", util.Grid.getCellValue(app, "grdCgdOs", "REF_KEY"  ,voSelectRowIdx)); 				// 참조키
		util.DataMap.setValue(app, "dmReqSelRow", "strLanDivRcd", util.Grid.getCellValue(app, "grdCgdOs", "LAN_DIV_RCD"  ,voSelectRowIdx)); 	// 언어구분
		
		// 마스터 리피트 상태에 따른 디테일 프리폼 비활성화 제어
		doCompareFrfEnable();
		
		doTabChange(vsIndex);
	};
	
	/**
	 * @desc  마스터 리피트 상태에 따른 디테일 프리폼 비활성화 제어
	 *			    1. index가 지정되지 않았을 경우
	 *			    2. 현재 index의 로우가 삭제 상태일 경우 
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 24
	 */
	function doCompareFrfEnable() {
		// 신규시 제어 컬럼
		var vaEnableCtl = ["ipbFrfOsCd"];
		
		// 마스터 로우 없을경우 프리폼 리셋
		if(!util.Grid.getIndex(app, "grdCgdOs")){
			util.Control.reset(app, "frfCgdOs");
		}
		
		if( (!util.Grid.getIndex(app, "grdCgdOs")) 
			|| util.Grid.getRowState(app, "grdCgdOs") == cpr.data.tabledata.RowState.DELETED) {
				
			util.Control.setEnable(app, false, ["frfCgdOs"]);
			
		} else {
			util.Control.setEnable(app, true, ["frfCgdOs"]);	
			
			var vsFlgGbn = util.Grid.getCellValue(app, "grdCgdOs", "FLAG_GBN", util.Grid.getIndex(app, "grdCgdOs"));
			// 신규 상태에따른 프리폼항목 제어
			if(util.Grid.getRowState(app, "grdCgdOs") == cpr.data.tabledata.RowState.INSERTED && ValueUtil.fixNull(vsFlgGbn) != "C"){
				util.Control.setEnable(app, true, vaEnableCtl);	
			}else {
				util.Control.setEnable(app, false, vaEnableCtl);	
			}
		}
	};
	
	/**
	 * @desc [tabBtnManage]데이터관리 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 24
	 */
	moPage.onClick_TabBtnManage = function() {
		doTabChange(TAB.MANAGE);
	};
	
	/**
	 * @desc [tabBtnHistory]이력관리 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 24
	 */
	moPage.onClick_TabBtnHistory = function() {
		doTabChange(TAB.HIS);
	};
	
	/**
	 * @desc [tabBtnLang]언어 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 24
	 */
	moPage.onClick_TabBtnLang = function() {
		doTabChange(TAB.LANG);
	};
	
	/**
	 * @desc 탭 변경시
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 24
	 */
	function doTabChange(psCaseId) {
		// 선택된 TAB
		var vsSelTabId = util.Tab.getSelectedId(app, "tabMain");
		
		// 1. 현재 선택된 탭의 상태 체크
		switch (vsSelTabId) {
			// 1-1. 데이터관리
			
			case TAB.MANAGE : {
				if(psCaseId != TAB.MANAGE){
					// 데이터관리 변경내역 있는 경우
					if(util.Grid.isModified(app, ["grdCgdOs"], "CRM") ){
						// tab 이동 하지 않음
						ExtTab.setTabBtn("tabMain", TAB_BTN[vsSelTabId]);
						return false;
					}else{
						// 교과목 목록 변경이 일어난 후 다른탭으로 이동시 프리폼 리셋 처리
						if(util.Grid.isModified(app, ["grdCgdOs"])){
							// 교과목 목록 리셋
							util.Grid.revertAllData(app, "grdCgdOs");
							// 교과목 리셋
							util.Control.reset(app, "frfCgdOs");
						}
					}
				}					
				break;
			}
			
			// 1-2. 이력관리  버튼 선택
			case TAB.HIS : {
				// 이력관리 리피트 변경내역 있는 경우
				if(util.Grid.isModified(app, ["grdCgdOsHistory"], "CRM")){
					// tab 이동 하지 않음
					ExtTab.setTabBtn("tabMain", TAB_BTN[vsSelTabId]);
					
					return false;
				}else{
					if(util.Grid.isModified(app, ["grdCgdOsHistory"]) ){
						// 이력 목록 리셋
						util.Grid.revertAllData(app, "grdCgdOsHistory");
					}
				}
																				
				break;
			}
			
			// 1-3. 언어 버튼 선택
			case TAB.LANG : {
				// 언어 리피트 변경내역 있는 경우
				if(util.Grid.isModified(app, ["grdCgdOsLang"], "CRM")){
					// tab 이동 하지 않음
					ExtTab.setTabBtn("tabMain", TAB_BTN[vsSelTabId]);
					return false;
				}else{
					// 언어 목록 변경이 일어난 후 다른탭으로 이동시 프리폼 리셋 처리
					if(util.Grid.isModified(app, ["grdCgdOsLang"])){
						// 교과목 목록 리셋
						util.Grid.revertAllData(app, "grdCgdOsLang");
					}
				}
							
				break;
			}
		}
	
		// 2. 탭변경
		util.Tab.setSelectedTabItem(app, "tabMain", psCaseId);
		// 3. 탭변경 후 처리 로직
		switch (psCaseId) {
			// 3-1. 데이터관리 조회
			case TAB.MANAGE : {
				// 성적인정항목 상세 조회
				doListDtl();
				
				break;
			}
			// 3-2. 이력관리 조회
			case TAB.HIS : {
				// 교과목목록 선택된 ROW 검사
				var voSelectRowIdx = util.Grid.getIndex(app, "grdCgdOs");
				
				if (!voSelectRowIdx) {
					// 데이터관리 프리폼 초기화
					util.Control.reset(app, "frfCgdOs");
					// 데이터관리  tab으로 이동
					ExtTab.setTabBtn("tabMain", TAB_BTN.tabManage);
					util.Tab.setSelectedTabItem(app, "tabMain", TAB.MANAGE);
					
					return;
				}
				
				// 이력조회
				doListHistory();
				
				break;
			}
			// 3-3. 언어 조회
			case TAB.LANG : {
				// 교과목목록 선택된 ROW 검사
				var voSelectRowIdx = util.Grid.getIndex(app, "grdCgdOs");
				
				if (!voSelectRowIdx) {
					var vsMsgParam = util.Grid.getTitle(app, "grdCgdOsCgdOs");
					// "@(을)를 선택해주세요" 메시지 출력
					util.Msg.alert("NLS-INF-M045", [vsMsgParam]);
					// 데이터관리  tab으로 이동
					ExtTab.setTabBtn("tabMain", TAB_BTN.tabManage);
					util.Tab.setSelectedTabItem(app, "tabMain", TAB.MANAGE);
					
					return;
				}
				
				//언어 조회
				doListLang();
				
				break;
			}
		}
		
		// 외부교과목목록 활성화
		util.Control.setEnable(app, true, ["grpData"]);
	};
	
	/**
	 * @desc 외부교과목(프리폼) 조회
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 24
	 */
	function doListDtl() {
		
		// 외부교과목 포커싱된 인덱스
		var vnIndex = util.Grid.getIndex(app, "grdCgdOs");
		
		// 리피트 특정 row 데이터를 프리폼 copy
//TO-BE: <ExtRepeat.copyRowForm> 그리드-프리폼인 경우에는 selection바인딩으로 처리하기 때문에 불필요함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.copyRowForm("rptCgdOs","frfCgdOs", vnIndex);
	};
	
	/**
	 * @desc [btnCopy]복사 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 24
	 */
	moPage.onClick_BtnCopy = function() {
		
		var vnOrgRowIdx = util.Grid.getIndex(app, "grdCgdOs");
		// 마스터 리피트 row 선택여부 체크
		if(vnOrgRowIdx == "0"){
			
			var vsMsgParam = util.Grid.getTitle(app, "grdCgdOsCgdOs");
			// "@(을)를 선택해주세요" 메시지 출력
			util.Msg.alert("NLS-INF-M045", [vsMsgParam]);
			return;
		}
		
		// 마스터 row(대상) 변경내역 체크
		var vsUptStatus = util.Grid.getCellValue(app, "grdCgdOs", "UPT_STATUS", vnOrgRowIdx);
		if(util.Grid.isModified(app, ["grdCgdOs"])){
			var vsMsgParam = ExtControl.getTextValue("lblTitleFrfCgdOs");
			// "@의 시점 복사 작업은 [작업저장]후 진행하시기 바랍니다." 메시지 출력			
			util.Msg.alert("NLS-CCS-M062", [vsMsgParam]);
			return;
		}
		
		// 종료일자
		var vsEndDt = util.Grid.getCellValue(app, "grdCgdOs", "END_DT", vnOrgRowIdx).substring(0, 8);
		var vsKeyDate = util.DataMap.getValue(app, "dmReqKey", "strKeyDate").substring(0, 8);
		
		// 폐기여부 확인
		if(Number(vsEndDt) <= Number(vsKeyDate)){
			var vsMsgParam = ExtControl.getTextValue("lblTitleFrfCgdOs");
			// "폐기된 @은(는) 복사할 수 없습니다. 이력관리 탭에서 복구해주시기 바랍니다." 메시지 출력.
			util.Msg.alert("NLS-WRN-M208", [vsMsgParam]);
			return;
		}
		
		var voNextRow   = util.Grid.insertRow(app, "grdCgdOs");
		
		// 상세 조회
		doListDtl();
		
		// 값 복사
		ExtRepeat.copyToRowData("rptCgdOs", vnOrgRowIdx, "rptCgdOs", voNextRow);
		
		// 값복사후 Row의 내용 프리폼 반영을위해
		util.Grid.selectRow(app, "grdCgdOs", voNextRow);
		
		util.Grid.setCellValue(app, "grdCgdOs", "UPT_STATUS", "N", voNextRow);
		
		// 기본값 세팅
		// 시작일자 : 조회조건 기준일자
		util.FreeForm.setValue(app, "frfCgdOs", "ST_DT", vsKeyDate+"000000");
		
		// 종료일자 : 99991231
		util.FreeForm.setValue(app, "frfCgdOs", "END_DT", "99991231000000");
		
		// 참조키 : ""
		util.Grid.setCellValue(app, "grdCgdOs", "REF_KEY", "", voNextRow);
		
		// 언어키 : 시스템로케일
		var vsLanDivRcd = msSystemLocale;
		util.Grid.setCellValue(app, "grdCgdOs", "LAN_DIV_RCD", vsLanDivRcd, voNextRow);
		
		// FLAG_GBN : C
		var vsFlagGbn = "C";
		util.Grid.setCellValue(app, "grdCgdOs", "FLAG_GBN", vsFlagGbn, voNextRow);
		
		util.Control.setEnable(app, false, ["ipbFrfOsCd"]);
	};
	
	/**
	 * @desc [btnNew]신규 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 24
	 */
	moPage.onClick_BtnNew = function() {

		var voChildListLength = ExtInstance.getNodeListLength("/root/resList/rptCgdOs/row[child::FLAG_GBN = 'C']");
		if(voChildListLength > 0 ){
			//-- 복사기능 처리내역이 있습니다. 작업저장 후 진행 하시기 바랍니다.
			util.Msg.alert("NLS-CCS-M072");
			return;
		}

		// 신규로우 추가
		var vnIdx = util.Grid.insertRow(app, "grdCgdOs");
		
		// 신규 Defalut값 설정 

		// 시작일자 : 조회조건 기준일자
		var vsStDt = util.DataMap.getValue(app, "dmReqKey", "strKeyDate");
		util.FreeForm.setValue(app, "frfCgdOs", "ST_DT", vsStDt);
		
		// 종료일자 : 99991231000000
		var vsEndDt = "99991231000000";
		util.FreeForm.setValue(app, "frfCgdOs", "END_DT", vsEndDt);
		
		// 객체구분코드 : 외부교과목[CC009OS]
		var vsObjDivRcd = "CC009OS";
		util.Grid.setCellValue(app, "grdCgdOs", "OBJ_DIV_RCD", vsObjDivRcd, vnIdx);
		
		// 언어키 : 시스템로케일
		var vsLanDivRcd = msSystemLocale;
		util.Grid.setCellValue(app, "grdCgdOs", "LAN_DIV_RCD", vsLanDivRcd, vnIdx);
		
		// FLAG_GBN : N
		var vsFlagGbn = "N";
		util.Grid.setCellValue(app, "grdCgdOs", "FLAG_GBN", vsFlagGbn, vnIdx);
				
		// 프리폼 항목 포커스
		util.Control.setFocus(app,  "cbbFrfOsDivRcd");
	};
	
	/**
	 * @desc [btnDel]삭제 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 24
	 */
	moPage.onClick_BtnDel = function() {
		
		var voChildListLength = ExtInstance.getNodeListLength("/root/resList/rptCgdOs/row[child::FLAG_GBN = 'C']");		
		if(voChildListLength >0 ){
			var vsFlgGbn = util.Grid.getCellValue(app, "grdCgdOs", "FLAG_GBN", util.Grid.getIndex(app, "grdCgdOs"));
			if(vsFlgGbn != 'C'){
				//--복사기능 처리내역이 있습니다. 작업저장 후 진행 하시기 바랍니다.
				util.Msg.alert("NLS-CCS-M072");
				return;
			}
		}
		
		// 삭제
		util.Grid.deleteRow(app, "grdCgdOs");
		// 마스터 리피트 상태에 따른 디테일 프리폼 비활성화 제어
		doCompareFrfEnable();
	};
	
	/**
	 * @desc [btnRestore]작업취소 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 24
	 */
	moPage.onClick_BtnRestore = function() {
		// 작업취소
		util.Grid.restoreRow(app, "grdCgdOs");
		// 마스터 리피트 상태에 따른 디테일 프리폼 비활성화 제어
		doCompareFrfEnable();
		// 취소내용 프리폼 반영
//TO-BE: <ExtRepeat.copyRowForm> 그리드-프리폼인 경우에는 selection바인딩으로 처리하기 때문에 불필요함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.copyRowForm("rptCgdOs", "frfCgdOs");
	};
	
	/**
	 * @desc [btnSave]작업저장 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 24
	 */
	moPage.onClick_BtnSave = function() {
		// 작업저장
		doSave();
	};
	
	/**
	 * @desc 외부교과목목록 변경사항 저장
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 24
	 */
	function doSave() {
		
		// 리피트 변경사항 체크
		if(!util.Grid.isModified(app, ["grdCgdOs"], "MSG")){
			return false;
		}
		
		// 리피트 Validation Check		
		if(!util.validate(app, "grdCgdOs")) return false;
		
		//strCommand: save 
		util.Submit.send(app, "subSave", function(pbSuccess){
			if(pbSuccess){
								
				//조회건수가 0건이면 프리폼이 내역이 반영되지 않기 떄문
				util.Control.reset(app, "frfCgdOs");
				
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
	 * @desc [frfCgdOs]외부교과목 onUpdate 이벤트
	 * @param pbStatus Boolean
	 * @return  
	 * @author 박갑수 at 2016. 3. 24
	 */
	moPage.onUpdate_FrfCgdOs = function() {
		// 프리폼 업데이트내용 그리드 반영
//TO-BE: <ExtFreeForm.updateToRpt> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtFreeForm.updateToRpt("rptCgdOs", "frfCgdOs");
	};
	
	/**
	 * @desc [btnFrfOtCd]외부부서명(돋보기버튼) onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 24
	 */
	moPage.onClick_BtnFrfOtCd = function(sender) {
		// 객체검색팝업 호출
		doOnClickStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc [ipbFrfOtNm]외부부서명 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 24
	 */
	moPage.onValueChanged_IpbFrfOtNm = function(sender) {
		// 값변경시 객체검색팝업 호출
		doOnChangeStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc 히스토리(이력)목록 조회
	 * @param poCallBackFunc 콜백정의
	 * @return void
	 * @author 박갑수 at 2016. 3. 24
	 */
	function doListHistory(poCallBackFunc) {
		
		var vsHisDate = util.DataMap.getValue(app, "dmReqKey", "strKeyDateHistory");
		var vsKeyDate = util.DataMap.getValue(app, "dmReqKey", "strKeyDate");
		
		// 폐기/복구일자 모두 지워졌을 경우 조회조건 기준일자 셋팅
		if(vsHisDate ==""){
			util.DataMap.setValue(app, "dmReqKey", "strKeyDateHistory", vsKeyDate);
		}
		
		// 폐기/복구일자 defalut세팅
		util.Control.redraw(app, "dipKeyDateHistory"); 
		
		// 이력관리 조회 서브이션 
		//strCommand: listHistory 
		util.Submit.send(app, "subListHistory", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdCgdOsHistory");
			}
			
			// 조회 후 콜백함수 수행
			if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
		});
	};
	
	/**
	 * @desc [btnYearSmtHis]폐기/복구일자(돋보기버튼) onClick 이벤트
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 3. 24
	 */
	moPage.onClick_BtnYearSmtHis = function() {
		// 기준일자 임포트(달력컨트롤ID,임포트ID)
		doOnclickSchYearSmt("dipKeyDateHistory", "impSchYearSmt");
	};
	
	/**
	 * @desc [btnDisUse]폐기 onClick 이벤트
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 3. 24
	 */
	moPage.onClick_BtnDisUse = function() {
		// 폐기
		doDisUseHistory();
	};
	
	/**
	 * @desc 외부교과목 폐기
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 3. 24
	 */
	function doDisUseHistory() {
		// 9999레코드를  조회조건의 학기의 (시작일자 - 1초) 로 업데이트 = 해당학기까지 유효한 데이타
		var vnCnt =  util.Grid.getRowCount(app, "grdCgdOsHistory");
		// 조회조건 기준일자 : 마스터 포커스용
		var vsSchKeyDate = util.DataMap.getValue(app, "dmReqKey", "strKeyDate").substring(0, 8);
		
		// 폐기/복구일자 유효성 체크
		if(!util.validate(app, "dipKeyDateHistory")) return false;
		
		var vnMaxRowIdx   = null;
		var vnMaxEndDt 	= null;
		for (var i = 0; i < vnCnt; i++) {
			var vnRowIdx = i+1;
			
			var vsEndDt = util.Grid.getCellValue(app, "grdCgdOsHistory", "END_DT", vnRowIdx).substring(0, 8);
			if (vsEndDt == "99991231") {
				vnMaxEndDt 		= vsEndDt;
				vnMaxRowIdx   	= vnRowIdx;
				
				break;
			}
		}
		
		// 1. 종료일자가 99991231이 아닐때, 폐기 불가
		if (vnMaxRowIdx == null) {
			// "폐기 가능한 데이터가 없습니다." 메시지 표시
			util.Msg.alert("NLS-INF-M029");
			return;
		}
		
		// 99991231가 있는 로우의 시작일
		var vsStDt   = util.Grid.getCellValue(app, "grdCgdOsHistory", "ST_DT", vnMaxRowIdx).substring(0, 8);
		var vsKeyDate = util.Control.getValue(app, "dipKeyDateHistory").substring(0, 8);
		var vsBefDate = moPage.getBefDate(vsKeyDate).substring(0, 8);
		
		if (vsStDt >= vsBefDate) {
			// 폐기 가능한 데이터가 없습니다.
			util.Msg.alert("NLS-INF-M029");
			return;
		}
		
		// 전날자로 타겟로우의 종료일자 업데이트
		var vsMsgDate = vsBefDate.substring(0, 4) + NLS.NSCR.YEAR + vsBefDate.substring(4, 6) + NLS.NSCR.MONTH + vsBefDate.substring(6, 8) + NLS.NSCR.DAY;
		
		// "@부로 폐기합니다. \n진행하시겠습니까?" 메시지
		if(util.Msg.confirm("NLS-CRM-M047", [vsMsgDate]) ){
			util.Grid.setCellValue(app, "grdCgdOsHistory", "END_DT", vsBefDate + "000000", vnMaxRowIdx);
			util.Grid.selectRow(app, "grdCgdOsHistory", vnMaxRowIdx, true);
			
			/*
				그리드에 pk_colvalues를 넣는다.
				조회 후 찾아주기 위함.
				var vsSchKeyDate = util.DataMap.getValue(app, "dmReqKey", "strKeyDate");
			*/
			if(vsSchKeyDate+"000000" >= vsStDt+"000000"){
				moPage.setCgdOsPkColRowValue("rptCgdOsHistory");
			}else{
				moPage.setCgdOsPkColRowValue("rptCgdOs");
			}
			
			doSaveHis();
		}
	};
	
	/**
	 * @desc 마스터 그리드의 pk_colvalues 값 세팅
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 3. 24
	 */
	moPage.setCgdOsPkColRowValue = function(vpRptDetail){
		var vcRptCgdOs = ExtControl.getControl("rptCgdOs");
		
		var vsPkColValues = ExtRepeat.getPKColRowValues(vpRptDetail);					
		if(!ValueUtil.isNull(vsPkColValues)){
			vcRptCgdOs.pk_values = vsPkColValues;
		}
	};
	
	/**
	 * @desc 기준일 이전날짜 추출
	 * @param 기준일
	 * @return  기준일 이전일
	 * @author 박갑수 at 2016. 3. 24
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
	 * @desc 이력관리목록 변경사항 저장
	 * @param 
	 * @return  
	 * @author 박갑수 at 2016. 3. 24
	 */
	function doSaveHis() {
		// 리피트 변경사항 체크
		if(!util.Grid.isModified(app, ["grdCgdOsHistory"], "MSG")){
			return false;
		}
		
		//strCommand: save 
		util.Submit.send(app, "subSaveHistory", function(pbSuccess){
			if(pbSuccess) {
				
				// 디테일 저장시 마스터의 포커스를 찾아가기위한 인스턴스 설정
				var vsOsCd =  util.DataMap.getValue(app, "dmReqSelRow", "strOsCd");
				util.DataMap.setValue(app, "dmReqSelRow", "strTmpOsCd", vsOsCd);
								
				util.Control.redraw(app, "grdCgdOsHistory");
				
				// 외부교과목목록 조회
				doList(function(pbSuccess) {
					if (pbSuccess){
						// 조회 : "갱신된 데이터가 조회되었습니다." header 메세지 표시
						util.Msg.notify(app, "NLS.INF.M025");
						
						// 마스터 포커스용 인스턴스 초기화
						util.DataMap.setValue(app, "dmReqSelRow", "strTmpOsCd", "");
					}
				});

			}else {
				// "저장중 오류가 발생하였습니다." 메시지 표시
				util.Msg.notify(app, "NLS.WRN.M119");
				doListHistory();
			}
		});
	};
	
	/**
	 * @desc [btnDisUseCanc]폐기취소 onClick 이벤트
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 3. 24
	 */
	moPage.onClick_BtnDisUseCanc = function() {
		// 폐기취소
		doUseCancHistory();
	};
	
	/**
	 * @desc 외부교과목 폐기취소
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 3. 24
	 */
	function doUseCancHistory() {
		
		var vnCnt = util.Grid.getRowCount(app, "grdCgdOsHistory");
		// 조회조건 기준일자 : 마스터 포커스용
		var vsSchKeyDate = util.DataMap.getValue(app, "dmReqKey", "strKeyDate").substring(0, 8);
		
		//폐기/복구일자 유효성 체크
		if(!util.validate(app, "dipKeyDateHistory")) return false;
		
		var vnMaxRowIdx   = null;
		var vnMaxEndDt 	= null;
		for (var i = 0; i < vnCnt; i++) {
			var vnRowIdx = i+1;
			
			var vsEndDt = util.Grid.getCellValue(app, "grdCgdOsHistory", "END_DT", vnRowIdx).substring(0, 8);
			if ((vnMaxEndDt == null) || (vnMaxEndDt != null && vnMaxEndDt < vsEndDt)) {
				vnMaxEndDt = vsEndDt;
				vnMaxRowIdx = vnRowIdx;
			}
		}

		if (vnMaxEndDt == "99991231" ) {
			// 폐기취소 가능한 데이터가 없습니다.
			util.Msg.alert("NLS-INF-M030");
			
			return;
		}
		
		// "마지막 데이터의 종료일이 9999년 12월 31일로 변경됩니다. \n진행하시겠습니까?" 메시지
		if(util.Msg.confirm("NLS-CRM-M048") ){
			util.Grid.setCellValue(app, "grdCgdOsHistory", "END_DT", "99991231000000", vnMaxRowIdx);
			util.Grid.selectRow(app, "grdCgdOsHistory", vnMaxRowIdx);
			
			var vsBefDate =  util.Grid.getCellValue(app, "grdCgdOsHistory", "ST_DT", vnMaxRowIdx).substring(0, 8);
			/*
				그리드에 pk_colvalues를 넣는다.
				조회 후 찾아주기 위함.
				
			*/
			if(vsSchKeyDate+"000000" >= vsBefDate+"000000"){
				moPage.setCgdOsPkColRowValue("rptCgdOsHistory");
			}else{
				moPage.setCgdOsPkColRowValue("rptCgdOs");
			}
			
			// 이력사항 변경사항 저장
			doSaveHis();
		}
	};
	
	/**
	 * @desc [btnRecover]복구 onClick 이벤트
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 3. 24
	 */
	moPage.onClick_BtnRecover = function() {
		// 교과목 복구
		doRecoverHistory();
	};
	
	/**
	 * @desc 성적인정항목 복구
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 3. 24
	 */
	function doRecoverHistory() {
		
		// 요약: 가장 최근의 레코드를 카피하여 insert한다. (단, 기준일자가 최종일자보다 커야 한다.)
		var vnCnt = util.Grid.getRowCount(app, "grdCgdOsHistory");
		// 조회조건 기준일자 : 마스터 포커스용
		var vsSchKeyDate	= util.DataMap.getValue(app, "dmReqKey", "strKeyDate").substring(0, 8);
		
		var vnMaxEndDt = null;
		var vnRowIdx = null;
		var vnMaxRowIdx = null;
		var vnMaxRowNum = null;
		
		// 폐기/복구일자 유효성 체크
		if(!util.validate(app, "dipKeyDateHistory")) return false;
		
		for (var i = 0; i < vnCnt; i++) {
			voRowIdx = i+1;
			
			var vsEndDt = util.Grid.getCellValue(app, "grdCgdOsHistory", "END_DT", voRowIdx).substring(0, 8);
			if ((vnMaxEndDt == null) || (vnMaxEndDt != null && vnMaxEndDt < vsEndDt)) {
				vnMaxEndDt = vsEndDt;
				vnMaxRowIdx = vnRowIdx;
				vnMaxRowNum = i;
			}
		}
		
		// 폐기/복구일자
		var vsHistoryKeyDate = util.Control.getValue(app, "dipKeyDateHistory").substring(0, 8);
		
		if (vnMaxEndDt >= vsHistoryKeyDate) {
			// "복구 가능한 DATA가 없습니다." 메시지 표시
			util.Msg.alert("NLS-WRN-M128");
			
			return;
		}
		
		 var vsMsgCiiDate = vsHistoryKeyDate.substring(0, 4) + NLS.NSCR.YEAR + vsHistoryKeyDate.substring(4, 6) + NLS.NSCR.MONTH + vsHistoryKeyDate.substring(6, 8) + NLS.NSCR.DAY;
		 
		//  "시작일 @ 종료일 9999년12월31일로 데이터가 복구됩니다. \n진행하시겠습니까?"
		 if (util.Msg.confirm("NLS-CRM-M049", [vsMsgCiiDate]) ) {
			 
			vnMaxRowNum  = util.Grid.getIndex(app, "grdCgdOsHistory");
			var voNextRow   = util.Grid.insertRow(app, "grdCgdOsHistory");
			 
			ExtRepeat.copyToRowData("rptCgdOsHistory", vnMaxRowNum, "rptCgdOsHistory", voNextRow);
			
			var vsKeyDate = util.Control.getValue(app, "dipKeyDateHistory").substring(0, 8);
			util.Grid.setCellValue(app, "grdCgdOsHistory", "REF_KEY", "", voNextRow);
			util.Grid.setCellValue(app, "grdCgdOsHistory", "ST_DT", vsKeyDate + "000000", voNextRow);
			util.Grid.setCellValue(app, "grdCgdOsHistory", "END_DT", "99991231000000", voNextRow);
			util.Grid.setCellValue(app, "grdCgdOsHistory", "UPT_STATUS", "N", voNextRow);
			
			/*
				그리드에 pk_colvalues를 넣는다.
				조회 후 찾아주기 위함.
			*/
			if(vsSchKeyDate+"000000" >= vsKeyDate+"000000"){
				moPage.setCgdOsPkColRowValue("rptCgdOsHistory");
			}else{
				moPage.setCgdOsPkColRowValue("rptCgdOs");
			}
			
			// 이력사항 변경사항 저장
			doSaveHis();
		 }
	};
	
	/**
	 * @desc 언어목록 조회
	 * @param poCallBackFunc 콜백정의
	 * @return void
	 * @author 박갑수 at 2016. 3. 24
	 */
	function doListLang(poCallBackFunc) {
		
		// 언어목록 조회 서브이션 
		//strCommand: listLang 
		util.Submit.send(app, "subListLang", function(pbSuccess){
			if(pbSuccess){
				
				util.Control.redraw(app, "grdCgdOsLang");
			}
			
			// 조회 후 콜백함수 수행
			if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
		});
	};
	
	/**
	 * @desc [rptCgdOsLang]언어목록 onRowSelect 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 24
	 */
	moPage.onRowSelect_RptCgdOsLang = function() {
//TO-BE: <ExtControl.refreshBind> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtControl.refreshBind(["bindRptCgdOsLang"]);
		
		// 디테일 리피트 상태에 따른 마스터 활성화 제어
		doEnableMst();
	};
	
	/**
	 * @desc  디테일 리피트 상태에 따른 마스터 활성화 제어
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 24
	 */
	function doEnableMst() {
		// 언어목록 변경사항 에따른 교과목목록 Enable 처리
		if(util.Grid.isModified(app, "grdCgdOsLang")){
			util.Control.setEnable(app, false, ["grpData"]);
		}else {
			util.Control.setEnable(app, true, ["grpData"]);
		}
	};
	
	/**
	 * @desc [btnNewLan]신규(언어) onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 24
	 */
	moPage.onClick_BtnNewLan = function() {
		// 신규로우 추가
		var vnIdx = util.Grid.insertRow(app, "grdCgdOsLang");
		
		// 신규 Defalut값 설정 
		// 외부교과코드 : 마스터목록
		var vsOsCd = util.DataMap.getValue(app, "dmReqSelRow", "strOsCd");
		util.Grid.setCellValue(app, "grdCgdOsLang", "OS_CD", vsOsCd, vnIdx);
		// 참조키 : 마스터목록
		var vsRefKey = util.DataMap.getValue(app, "dmReqSelRow", "strRefKey");
		util.Grid.setCellValue(app, "grdCgdOsLang", "REF_KEY", vsRefKey, vnIdx);
		// 디테일 리피트 상태에 따른 마스터 활성화 제어
		doEnableMst();
	};
	
	/**
	 * @desc [btnDelLan]삭제(언어) onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 24
	 */
	moPage.onClick_BtnDelLan = function() {
		
		// 기본언어구분
		var vsLangDivRcd = util.DataMap.getValue(app, "dmReqSelRow", "strLanDivRcd");
		var vnRptIdx = util.Grid.getIndex(app, "grdCgdOsLang");
		
		var vsUptStatus = util.Grid.getCellValue(app, "grdCgdOsLang", "UPT_STATUS");
		if (ValueUtil.fixNull(vsLangDivRcd) == util.Grid.getCellValue(app, "grdCgdOsLang", "LAN_DIV_RCD", vnRptIdx)
		    && ValueUtil.isNull(vsUptStatus)) {
			// 기본언어레코드는 삭제할 수 없습니다. 메시지 표시
			util.Msg.alert("NLS-WRN-M010");
			return;
		}
		// 삭제
		util.Grid.deleteRow(app, "grdCgdOsLang");
		// 디테일 리피트 상태에 따른 마스터 활성화 제어
		doEnableMst();
	};
	
	/**
	 * @desc [btnRestoreLan]작업취소(언어) onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 24
	 */
	moPage.onClick_BtnRestoreLan = function() {
		// 해당 리피트 상태 초기화
		util.Grid.restoreRow(app, "grdCgdOsLang");
		// 디테일 리피트 상태에 따른 마스터 활성화 제어
		doEnableMst();
	};
	
	/**
	 * @desc [btnSaveLan]작업저장(언어) onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 24
	 */
	moPage.onClick_BtnSaveLan = function() {
		// 언어목록 변경사항 저장
		doSaveLan();
	};
	
	/**
	 * @desc 언어목록 변경사항 저장
	 * @param 
	 * @return  
	 * @author 박갑수 at 2016. 3. 24
	 */
	function doSaveLan() {
		// 리피트 변경사항 체크
		if(!util.Grid.isModified(app, ["grdCgdOsLang"], "MSG")){
			return false;
		}
		
		// 리피트 Validation Check
		if(!util.validate(app, "grdCgdOsLang")) return false;
		
		//strCommand: saveLang 
		util.Submit.send(app, "subSaveLang", function(pbSuccess){
			if(pbSuccess) {
				// 언어목록 조회
				doListLang(function(pbSuccessList) {
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
