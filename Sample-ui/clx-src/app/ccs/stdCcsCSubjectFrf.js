//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./stdCcsCSubjectFrf.xtm"/>

/**
 * 교과목관리
 * @class stdCcsCWeek
 * @author 박갑수 at 2016. 1. 21
 */
var stdCcsCSubjectFrf = function() {
	var moPage = new Page();
	
	// 임포트용 데이터 통신 오브젝트
	var moPObject = new Page();
	
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
			
	// 객체검색팝업 호출
	moPObject.moIdsForStdCmnPObjSch = [
	{
		controlId			:	"btnSpvsDeptNm",
		iCd					:	"",
		iNm					:	"ipbSpvsDeptNm",
		iObjDivRcd			:	["CC009SA"],
		iStartObject    	:   "",
		iOtDivRcd			:	"",
		iOtIsTreeView	:	"",
		iLanDivRcd		:	"",
		iKeyDate			:	"dipKeyDate",
		iKeyEndDate		:	"",
		oObjDivRcd		:	"",
		oCd					:	"/root/reqKey/strSpvsDeptCd",
		oCdNm				:	"ipbSpvsDeptNm",
		oBegDt				:	"",
		oEndDt				:	"",
		oLanDivRcd		:	"",
		func 					:  function(poRtnValue){
			// 검색조건이 있을경우 조회
			var vsSpvsDeptNm = util.DataMap.getValue(app, "dmReqKey", "strSpvsDeptNm");
			var vsKeyDate = util.DataMap.getValue(app, "dmReqKey", "strKeyDate");
			if(!ValueUtil.isNull(vsSpvsDeptNm) && !ValueUtil.isNull(vsKeyDate)){
				util.Header.clickSearch(app);
			}
		}
	},
	{
		controlId			:	"btnFrfSpvsDept",
		iCd					:	"",
		iNm					:	"ipbFrfSpvsDeptNm",
		iObjDivRcd			:	["CC009SA"],
		iStartObject    	:   "",
		iOtDivRcd			:	"",
		iOtIsTreeView	:	"",
		iLanDivRcd		:	"",
		iKeyDate			:	"dipKeyDate",
		iKeyEndDate		:	"",
		oObjDivRcd		:	"",
		oCd					:	"ipbFrfSpvsDeptCd",
		oCdNm				:	"ipbFrfSpvsDeptNm",
		oBegDt				:	"",
		oEndDt				:	"",
		oLanDivRcd		:	"",
		func 					:  function(poRtnValue){
			
			var vsSpvsDeptNm = util.Control.getValue(app, "ipbFrfSpvsDeptNm");
			
			if(!ValueUtil.isNull(vsSpvsDeptNm) ){
				util.Control.setFocus(app, "cbbFrfSblvlRcd"); 
			}
			
			
			}
	},
	{
		controlId			:	"btnFrfSpvsColg",
		iCd					:	"",
		iNm					:	"ipbFrfSpvsColgNm",
		iObjDivRcd			:	["CC009OG"],
		iStartObject    	:   "",
		iOtDivRcd			:	"",
		iOtIsTreeView	:	"",
		iLanDivRcd		:	"",
		iKeyDate			:	"dipKeyDate",
		iKeyEndDate		:	"",
		oObjDivRcd		:	"",
		oCd					:	"ipbFrfSpvsColgCd",
		oCdNm				:	"ipbFrfSpvsColgNm",
		oBegDt				:	"",
		oEndDt				:	"",
		oLanDivRcd		:	"",
		func 					:  function(poRtnValue){}
	}];
	
	// 학사구조관리에서 교과목관리페이지 호출시, 서브페이지용 파라미터
	moPObject.moAcademicStructure = {
		// Academic Structure의 서브페이지용 파라미터
		mode     : "",
		treeNode : null,
		name     : "",
		objType  : "",
		objCd    : "",
		year     : "",
		smt      : "",
		keyDate  : ""
	};
	
	/**
	 * @desc 학사구조관리에서 교과그룹관리페이지 호출시 OnLoad 이벤트
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 1. 29
	 */
	function doOnLoadWithAcademicStructure() {
		var voParentPage = ExtSubPage.getParent();
		var voParentParam = voParentPage.callScriptVal("moAcademicStructure");
		
		for (var key in  voParentParam ) {
			moAcademicStructure [key] = voParentParam[key];
		}
		
		var voParam = moAcademicStructure;
		
		// Academic Structure 모드가 지정되어 있는 경우에만
		if (voParam.mode) {
			var vnTop = util.Control.getStyleAttr(app, "grpData", "top");
			var vnLeft = util.Control.getStyleAttr(app, "grpData", "left");
			var vnGrpDataHeight = util.Control.getStyleAttr(app, "grpData", "height");
			var vnGrpDataDtlHeight = util.Control.getStyleAttr(app, "grpDataDtl", "height");
			var vnWidth = util.Control.getStyleAttr(app, "grpData", "width");
			
			vnTop = vnTop.replace(/[^0-9]/g, '');
			vnLeft = vnLeft.replace(/[^0-9]/g, '');
			vnGrpDataHeight = vnGrpDataHeight.replace(/[^0-9]/g, '');
			vnGrpDataDtlHeight = vnGrpDataDtlHeight.replace(/[^0-9]/g, '');
			vnWidth = vnWidth.replace(/[^0-9]/g, '');
			
			var vnHeight = String(Number(vnGrpDataHeight) + Number(vnGrpDataDtlHeight) + 5);
			
			var vsCallFunc =  "doCropPageToControl(null, "+ vnTop + ", " + vnLeft + ", " +  vnHeight + ", " + vnWidth+")";
			voParentPage.callScriptVal( vsCallFunc);
			
			// 검색조건 세팅
			util.Control.setValue(app, "ipbSbNm",voParam.name);
			util.Control.setValue(app, "dipKeyDate",voParam.keyDate);
			util.Control.setValue(app, "dipKeyDateHistory",voParam.keyDate);
			
			util.DataMap.setValue(app, "dmReqKey", "strAsMode",voParam.mode);
			util.DataMap.setValue(app, "dmReqKey", "strObjCd",voParam.objCd);
			
			// 조회조건 필수체크 Skip하기 위해
			// ExtControl.setValue("ipbSpvsDeptNm",voParam.name);

			//조회
			util.Header.clickSearch(app);
		}
	};
	
	/**
	 * @desc 작업저장시 학사구조관리의 콜백메서드 실행
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 1. 29
	 */
	function doSaveWithAcademicStructure() {
		var voParam = moAcademicStructure;
		if(voParam.mode){
			var voParentPage = ExtSubPage.getParent();
			
			voParentPage.callScriptVal("callbackAcademicStructureSubPageSave()");
		}
	};
	
	/**
	 * @desc 헤더메시지 표시(부모창이 있는 경우 부모의 헤더에 메시지 표시)
	 * @param 메시지
	 * @return 
	 * @author 박갑수 at 2016. 3. 9
	 */
	function doSetMsgStatus(psMsg) {
		var voParam = moAcademicStructure;
		
		//부모페이지가 있는 경우 부모페이지의 헤더에 표시한다.
		if(voParam.mode){
			var voParentPage = ExtSubPage.getParent();
			var vsCallFunc =  "util.Msg.notify(app,  "'"+ psMsg + "'" )";
			voParentPage.callScriptVal(vsCallFunc);
		
		} else {
			util.Msg.notify(app, "psMsg");
		}
	};
	
	/**
	 * @desc import 헤더 초기화
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 1. 22
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		// import 헤더 초기화
		doHeaderOnLoad();
	};

	/**
	 * @desc onLoad 실행
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 1. 22
	 */
	moPage.onModelConstructDone_StdCcsCSubjectFrf = function() {
		// 리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["rptCcsSub", "rptCcsSubHistory", "rptCcsSubLang"]);
		// 검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grpData", "grpDataDtl"]);
		//3.첫번째 탭으로 로딩
		util.Tab.setSelectedTabItem(app, "tabMain", TAB.MANAGE);
		// 기준일자 조회하는 내부 팝업 호출을 위한 단위시스템코드 설정
		setUnitSystem("CCS");
		
		// 서브미션 호출
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				
				util.Control.redraw(app, ["dipKeyDate", "cbbCmpDivRcd"]);
				
				// 학사부서관리 호출시
				doOnLoadWithAcademicStructure();
				
				util.Control.setFocus(app, "ipbSpvsDeptNm");
			}
		}, true);
	};
	
	/**
	 * @desc [btnYearSmt]기준일자(돋보기버튼) onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 1. 22
	 */
	moPage.onClick_BtnYearSmt = function() {
		//기준일자 임포트(달력컨트롤ID,임포트ID)
		doOnclickSchYearSmt("dipKeyDate","impSchYearSmt");
	};
	
	/**
	 * @desc [btnSpvsDeptNm]주관부서명(돋보기버튼) onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 1. 22
	 */
	moPage.onClick_BtnSpvsDeptNm = function(sender) {
		// 객체검색팝업 호출
		doOnClickStdCmnPObjSch(sender);
	};

	/**
	 * @desc [btnSpvsDeptNm]주관부서명 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 1. 22
	 */
	moPage.onValueChanged_IpbSpvsDeptNm = function(sender) {
		// 리피트 변경사항 체크
		if(util.Grid.isModified(app, ["grdCcsSub"])){
			return false;
		}
		
		// 값변경시 객체검색팝업 호출
		doOnChangeStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc [ipbSbCd]교과목코드 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 1. 22
	 */
	moPage.onKeyDown_IpbSbCd = function(strKeyType, strKeyStatus) {
		// 엔터키 입력시 조회
		if(e.keyCode == cpr.events.KeyCode.ENTER){
			var vsKeyDate = util.Control.getValue(app, "dipKeyDate");
			var vsSbCd = util.Control.getValue(app, "ipbSbCd");
			
			if(!ValueUtil.isNull(vsKeyDate) && !ValueUtil.isNull(vsSbCd)){
				util.Header.clickSearch(app);
			}
		}
	};
	
	/**
	 * @desc [ipbSbNm]교과목명 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 1. 22
	 */
	moPage.onKeyDown_IpbSbNm = function(strKeyType, strKeyStatus) {
		// 엔터키 입력시 조회
		if(e.keyCode == cpr.events.KeyCode.ENTER){
			var vsKeyDate = util.Control.getValue(app, "dipKeyDate");
			var vsSbNm = util.Control.getValue(app, "ipbSbNm");
			
			if(!ValueUtil.isNull(vsKeyDate) && !ValueUtil.isNull(vsSbNm)){
				util.Header.clickSearch(app);
			}
		}
	};
	
	/**
	 * @desc [btnSearch]조회 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 1. 22
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
		
		// 조회조건 필수체크 - 주관부서, 교과목명, 교과목코드 중 한개는 입력되었는지 확인.
		if(!moPage.checkNotNullCtl()){
			return false;
		}

		// 조회
		doList(function(pbSuccess) {
			if (pbSuccess){
				// 조회 : "조회되었습니다." header 메세지 표시
				doSetMsgStatus(NLS.INF.M024);
			}
		});
	};
	
	/**
	 * @desc 교과목목록 조회
	 * @param poCallBackFunc 콜백정의
	 * @return void
	 * @author 박갑수 at 2016. 1. 22
	 */
	function doList(poCallBackFunc) {
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){

				util.Control.redraw(app, "grdCcsSub");
				
				// 폐기처리로 인해 데이터가 없어질경우 [데이터관리] 텝으로 이동하기 위함.
				var strSbCd = util.DataMap.getValue(app, "dmReqSelRow", "strTmpSbCd");
				var vnLength = ExtInstance.getNodeListLength("/root/resList/rptCcsSub/row[child::SB_CD = '"+ strSbCd +"']");
				if(ValueUtil.isNull(strSbCd) || vnLength == 0){
					if(util.Grid.getRowCount(app, "grdCcsSub") == 0){
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
	 * @desc 주관부서, 교과목명, 교과목코드 중 한개는 입력되었는지 확인.
	 * @param 
	 * @return boolean
	 * @author 박갑수 at 2016. 3. 24
	 */
	moPage.checkNotNullCtl = function() {
		var vbValid = true;
		
		// 주관부서명
		var vsSpvsDeptNm = util.Control.getValue(app, "ipbSpvsDeptNm");
		// 교과목코드
		var vsSbCd = util.Control.getValue(app, "ipbSbCd");
		// 교과목코드
		var vsSbNm = util.Control.getValue(app, "ipbSbNm");
		
		if(ValueUtil.isNull(vsSpvsDeptNm) && ValueUtil.isNull(vsSbCd) && ValueUtil.isNull(vsSbNm)){
			var vsMsgParam = ExtControl.getTextValue("lblSpvsDeptNm") + ", " + ExtControl.getTextValue("lblSbCd")+ ", " + ExtControl.getTextValue("lblSbNm");
			
			// "조회조건[@1] 중 하나는 반드시 입력해야 합니다." 메시지 표시
			util.Msg.alert("NLS-CMM-M016", [vsMsgParam]);
			
			vbValid = false;
			return vbValid;
		}
		
		return vbValid;
	};
	
	/**
	 * @desc [rptCcsSub]교과목목록 onRowSelect 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 1. 22
	 */
	moPage.onRowSelect_RptCcsSub = function() {
		
		var vsTab = util.Tab.getSelectedId(app, "tabMain");
		var vsIndex = "";
		
		if(vsTab=="tabManage"){		
			vsIndex = TAB.MANAGE;
		}else if(vsTab=="tabHistory"){
			vsIndex =TAB.HIS;
		}else if(vsTab=="tabLang"){
			vsIndex =TAB.LANG;
		}
		
		var voSelectRowIdx = util.Grid.getIndex(app, "grdCcsSub");
		util.DataMap.setValue(app, "dmReqSelRow", "strSbCd"		, util.Grid.getCellValue(app, "grdCcsSub","SB_CD"  ,voSelectRowIdx));						// 교과목코드
		util.DataMap.setValue(app, "dmReqSelRow", "strRefKey"	, util.Grid.getCellValue(app, "grdCcsSub","REF_KEY"  ,voSelectRowIdx)); 				// 참조키
		util.DataMap.setValue(app, "dmReqSelRow", "strLanDivRcd", util.Grid.getCellValue(app, "grdCcsSub","LAN_DIV_RCD"  ,voSelectRowIdx)); 	// 언어구분
		
		// 마스터 리피트 상태에 따른 디테일 프리폼 비활성화 제어
		doCompareFrfEnable();
		
		doTabChange(vsIndex);
	};
	
	/**
	 * @desc [tabBtnManage]데이터관리 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 1. 22
	 */
	moPage.onClick_TabBtnManage = function() {
		doTabChange(TAB.MANAGE);
	};
	
	/**
	 * @desc [tabBtnHistory]이력관리 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 1. 22
	 */
	moPage.onClick_TabBtnHistory = function() {
		doTabChange(TAB.HIS);
	};
	
	/**
	 * @desc [tabBtnLang]언어 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 1. 22
	 */
	moPage.onClick_TabBtnLang = function() {
		doTabChange(TAB.LANG);
	};
	
	/**
	 * @desc 탭 변경시
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 1. 22
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
					if(util.Grid.isModified(app, ["grdCcsSub"], "CRM") ){
						// tab 이동 하지 않음
						ExtTab.setTabBtn("tabMain", TAB_BTN[vsSelTabId]);
						return false;
					}else{
						// 교과목 목록 변경이 일어난 후 다른탭으로 이동시 프리폼 리셋 처리
						if(util.Grid.isModified(app, ["grdCcsSub"])){
							// 교과목 목록 리셋
							util.Grid.revertAllData(app, "grdCcsSub");
							// 교과목 리셋
							util.Control.reset(app, "frfCcsSub");
						}
					}
				}					
				break;
			}
			
			// 1-2. 이력관리  버튼 선택
			case TAB.HIS : {
				// 이력관리 리피트 변경내역 있는 경우
				if(util.Grid.isModified(app, ["grdCcsSubHistory"], "CRM")){
					// tab 이동 하지 않음
					ExtTab.setTabBtn("tabMain", TAB_BTN[vsSelTabId]);
					
					return false;
				}else{
					if(util.Grid.isModified(app, ["grdCcsSubHistory"]) ){
						// 이력 목록 리셋
						util.Grid.revertAllData(app, "grdCcsSubHistory");
					}
				}
																				
				break;
			}
			
			// 1-3. 언어 버튼 선택
			case TAB.LANG : {
				// 언어 리피트 변경내역 있는 경우
				if(util.Grid.isModified(app, ["grdCcsSubLang"], "CRM")){
					// tab 이동 하지 않음
					ExtTab.setTabBtn("tabMain", TAB_BTN[vsSelTabId]);
					return false;
				}else{
					// 언어 목록 변경이 일어난 후 다른탭으로 이동시 프리폼 리셋 처리
					if(util.Grid.isModified(app, ["grdCcsSubLang"])){
						// 교과목 목록 리셋
						util.Grid.revertAllData(app, "grdCcsSubLang");
						// 교과목 리셋
						util.Control.reset(app, "frfCcsSubLang");
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
				// 교과목 상세 조회
				doListDtl();
				
				break;
			}
			// 3-2. 이력관리 조회
			case TAB.HIS : {
				// 교과목목록 선택된 ROW 검사
				var voSelectRowIdx = util.Grid.getIndex(app, "grdCcsSub");
				
				if (!voSelectRowIdx) {
					// 데이터관리 프리폼 초기화
					util.Control.reset(app, "frfCcsSub");
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
				var voSelectRowIdx = util.Grid.getIndex(app, "grdCcsSub");
				
				if (!voSelectRowIdx) {
					var vsMsgParam = util.Grid.getTitle(app, "grdCcsSubCcsSub");
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
	};
	
	/**
	 * @desc 교과목(프리폼) 조회
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 1. 22
	 */
	function doListDtl() {
		
		// 교과목 포커싱된 인덱스
		var vnIndex = util.Grid.getIndex(app, "grdCcsSub");
		
		// 리피트 특정 row 데이터를 프리폼 copy
//TO-BE: <ExtRepeat.copyRowForm> 그리드-프리폼인 경우에는 selection바인딩으로 처리하기 때문에 불필요함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.copyRowForm("rptCcsSub","frfCcsSub", vnIndex);
	};
	
	/**
	 * @desc 히스토리(이력)목록 조회
	 * @param poCallBackFunc 콜백정의
	 * @return void
	 * @author 박갑수 at 2016. 1. 22
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
		
		var voSelectRowIdx = util.Grid.getIndex(app, "grdCcsSub");
		util.DataMap.setValue(app, "dmReqSelRow", "strSbCd"		, util.Grid.getCellValue(app, "grdCcsSub","SB_CD"  ,voSelectRowIdx));						// 교과목코드
		util.DataMap.setValue(app, "dmReqSelRow", "strRefKey"	, util.Grid.getCellValue(app, "grdCcsSub","REF_KEY"  ,voSelectRowIdx)); 				// 참조키
					
		// 이력관리 조회 서브이션 
		//strCommand: listHistory 
		util.Submit.send(app, "subListHistory", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdCcsSubHistory");
			}
			
			// 조회 후 콜백함수 수행
			if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
		});
	};
	
	/**
	 * @desc [btnYearSmtHis]폐기/복구일자(돋보기버튼) onClick 이벤트
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 1. 25
	 */
	 moPage.onClick_BtnYearSmtHis = function() {
		// 기준일자 임포트(달력컨트롤ID,임포트ID)
		doOnclickSchYearSmt("dipKeyDateHistory", "impSchYearSmt");
	};
	
	/**
	 * @desc [btnDisUse]폐기 onClick 이벤트
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 1. 25
	 */
	moPage.onClick_BtnDisUse = function() {
		// 교과목 폐기
		doDisUseHistory();
	};
	
	/**
	 * @desc 교과목 폐기
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 1. 25
	 */
	function doDisUseHistory() {
		// 9999레코드를  조회조건의 학기의 (시작일자 - 1초) 로 업데이트 = 해당학기까지 유효한 데이타
		var vnCnt =  util.Grid.getRowCount(app, "grdCcsSubHistory");
		// 조회조건 기준일자 : 마스터 포커스용
		var vsSchKeyDate = util.DataMap.getValue(app, "dmReqKey", "strKeyDate").substring(0, 8);
	
		// 폐기/복구일자 유효성 체크
		if(!util.validate(app, "dipKeyDateHistory")) return false;
		
		var vnMaxRowIdx   = null;
		var vnMaxEndDt 	= null;
		for (var i = 0; i < vnCnt; i++) {
			var vnRowIdx = i+1;
			
			var vsEndDt = util.Grid.getCellValue(app, "grdCcsSubHistory", "END_DT", vnRowIdx).substring(0, 8);
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
		var vsStDt   = util.Grid.getCellValue(app, "grdCcsSubHistory", "ST_DT", vnMaxRowIdx).substring(0, 8);
		var vsKeyDate = util.Control.getValue(app, "dipKeyDateHistory").substring(0, 8);
		var vsBefDate = moPage.getBefDate(vsKeyDate).substring(0, 8);
		
		if (vsStDt >= vsBefDate) {
			// 폐기 가능한 데이터가 없습니다.
			util.Msg.alert("NLS-INF-M029");
			return;
		}
		
		util.DataMap.setValue(app, "dmReqKeyHis", "strSbCd", util.Grid.getCellValue(app, "grdCcsSubHistory", "SB_CD", vnMaxRowIdx));
		util.DataMap.setValue(app, "dmReqKeyHis", "strObjDivRcd", util.Grid.getCellValue(app, "grdCcsSubHistory", "OBJ_DIV_RCD", vnMaxRowIdx));
		util.DataMap.setValue(app, "dmReqKeyHis", "strStDt", util.Grid.getCellValue(app, "grdCcsSubHistory", "ST_DT", vnMaxRowIdx));
		util.DataMap.setValue(app, "dmReqKeyHis", "strEndDt", util.Grid.getCellValue(app, "grdCcsSubHistory", "END_DT", vnMaxRowIdx));
		
		// 폐기 가능여부 체크
		//strCommand: chkDisHistoryPre 
		util.Submit.send(app, "subChkDisHistoryPre", function(pbSuccess){
			if(pbSuccess){

				//폐기 가능할때 
				var vsDisYn = util.DataMap.getValue(app, "dmReqKeyHis", "strDisHistoryYn");
				if(vsDisYn == "Y"){
					// "교과목을 폐기하면 교과과정도 폐기됩니다. 폐기하시겠습니까?" 메시지
					if (!util.Msg.confirm("NLS-CRM-M026") ) {
						return ;
					}
				}
					
				// 전날자로 타겟로우의 종료일자 업데이트
				var vsMsgDate = vsBefDate.substring(0, 4) + NLS.NSCR.YEAR + vsBefDate.substring(4, 6) + NLS.NSCR.MONTH + vsBefDate.substring(6, 8) + NLS.NSCR.DAY;
				
				// "@부로 폐기합니다. \n진행하시겠습니까?" 메시지
				if(util.Msg.confirm("NLS-CRM-M047", [vsMsgDate])   ){
					util.Grid.setCellValue(app, "grdCcsSubHistory", "END_DT", vsBefDate + "000000", vnMaxRowIdx);
					util.Grid.selectRow(app, "grdCcsSubHistory", vnMaxRowIdx, true);
					
					/*
						그리드에 pk_colvalues를 넣는다.
						조회 후 찾아주기 위함.
						var vsSchKeyDate = util.DataMap.getValue(app, "dmReqKey", "strKeyDate");
					*/
					if(vsSchKeyDate+"000000" >= vsStDt+"000000"){
						moPage.setCcsSubPkColRowValue("rptCcsSubHistory");
					}else{
						moPage.setCcsSubPkColRowValue("rptCcsSub");
					}
					
					doSaveHis();
				}
			}
				
			// 이력탭용 인스턴스값 초기화
			util.DataMap.setValue(app, "dmReqKeyHis", "strSbCd", "");
			util.DataMap.setValue(app, "dmReqKeyHis", "strObjDivRcd", "");
			util.DataMap.setValue(app, "dmReqKeyHis", "strStDt", "");
			util.DataMap.setValue(app, "dmReqKeyHis", "strEndDt", "");
		});
	};
	
	/**
	 * @desc 기준일 이전날짜 추출
	 * @param 기준일
	 * @return  기준일 이전일
	 * @author 박갑수 at 2016. 1. 25
	 */
	moPage.getBefDate = function(psKeyDate) {
		
			var y  = psKeyDate.substring(0, 4);
			var m = psKeyDate.substring(4, 6);
			var d  = psKeyDate.substring(6, 8);
			var befDt = new Date(y, m - 1, d - 1);
			var befDtYear = befDt.getFullYear().toString();	// 2012.02.29 크롬에서도 정상적으로 작동되도록 수정함. 윤경희
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
	 * @author 박갑수 at 2016. 1. 25
	 */
	function doSaveHis() {
		// 리피트 변경사항 체크
		if(!util.Grid.isModified(app, ["grdCcsSubHistory"], "MSG")){
			return false;
		}
		
		//strCommand: save 
		util.Submit.send(app, "subSaveHistory", function(pbSuccess){
			if(pbSuccess) {
				// 디테일 저장시 마스터의 포커스를 찾아가기위한 인스턴스 설정
				var vsSbCd =  util.DataMap.getValue(app, "dmReqSelRow", "strSbCd");
				util.DataMap.setValue(app, "dmReqSelRow", "strTmpSbCd", vsSbCd);
				
				doSaveWithAcademicStructure();	
				
				util.Control.redraw(app, "grdCcsSubHistory");
				
				//이력조회
				doList(function(pbSuccess) {
					if (pbSuccess){
						// 조회 : "갱신된 데이터가 조회되었습니다." header 메세지 표시
						doSetMsgStatus(NLS.INF.M025);
						
						// 탭이동용 인스턴스 초기화
						util.DataMap.setValue(app, "dmReqSelRow", "strTmpSbCd", "");
					}
				});
			}else {
				// "저장중 오류가 발생하였습니다." 메시지 표시
				doSetMsgStatus(NLS.WRN.M119);
//				ExtTab.toggle("tabMain", TAB.HIS);
				// 이력조회
				doListHistory();
			}
		});
	};

	/**
	 * @desc [btnDisUseCanc]폐기취소 onClick 이벤트
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 1. 25
	 */
	moPage.onClick_BtnDisUseCanc = function() {
		// 교과목 폐기취소
		doUseCancHistory();
	};
	
	/**
	 * @desc 교과목 폐기취소
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 1. 25
	 */
	function doUseCancHistory() {
		
		var vnCnt = util.Grid.getRowCount(app, "grdCcsSubHistory");
		// 조회조건 기준일자 : 마스터 포커스용
		var vsSchKeyDate = util.DataMap.getValue(app, "dmReqKey", "strKeyDate").substring(0, 8);
		
		//폐기/복구일자 유효성 체크
		if(!util.validate(app, "dipKeyDateHistory")) return false;
		
		var vnMaxRowIdx   = null;
		var vnMaxEndDt 	= null;
		for (var i = 0; i < vnCnt; i++) {
			var vnRowIdx = i+1;
			
			var vsEndDt = util.Grid.getCellValue(app, "grdCcsSubHistory", "END_DT", vnRowIdx).substring(0, 8);
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
		if(util.Msg.confirm("NLS-CRM-M048")   ){
			util.Grid.setCellValue(app, "grdCcsSubHistory", "END_DT", "99991231000000", vnMaxRowIdx);
			util.Grid.selectRow(app, "grdCcsSubHistory", vnMaxRowIdx);
			
			var vsBefDate =  util.Grid.getCellValue(app, "grdCcsSubHistory", "ST_DT", vnMaxRowIdx).substring(0, 8);
			/*
				그리드에 pk_colvalues를 넣는다.
				조회 후 찾아주기 위함.
				
			*/
			if(vsSchKeyDate+"000000" >= vsBefDate+"000000"){
				moPage.setCcsSubPkColRowValue("rptCcsSubHistory");
			}else{
				moPage.setCcsSubPkColRowValue("rptCcsSub");
			}
			
			// 이력사항 변경사항 저장
			doSaveHis();
		}
	};
	
	/**
	 * @desc 마스터 그리드의 pk_colvalues 값 세팅
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 2. 12
	 */
	moPage.setCcsSubPkColRowValue = function(vpRptDetail){
		var vcRptCcsSub = model.getControl("rptCcsSub");
		var vsPkColValues = ExtRepeat.getPKColRowValues(vpRptDetail);					
		if(!ValueUtil.isNull(vsPkColValues)){
			vcRptCcsSub.pk_values = vsPkColValues;
		}
	};
	
	/**
	 * @desc [btnRecover]복구 onClick 이벤트
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 1. 25
	 */
	moPage.onClick_BtnRecover = function() {
		// 교과목 복구
		doRecoverHistory();
	};
	
	/**
	 * @desc 교과목 복구
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 1. 25
	 */
	function doRecoverHistory() {
		
		// 요약: 가장 최근의 레코드를 카피하여 insert한다. (단, 기준일자가 최종일자보다 커야 한다.)
		var vnCnt = util.Grid.getRowCount(app, "grdCcsSubHistory");
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
			
			var vsEndDt = util.Grid.getCellValue(app, "grdCcsSubHistory", "END_DT", voRowIdx).substring(0, 8);
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
		 if (util.Msg.confirm("NLS-CRM-M049", [vsMsgCiiDate])   ) {
			 
			vnMaxRowNum  = util.Grid.getIndex(app, "grdCcsSubHistory");
			var voNextRow   = util.Grid.insertRow(app, "grdCcsSubHistory");
			 
			ExtRepeat.copyToRowData("rptCcsSubHistory", vnMaxRowNum, "rptCcsSubHistory", voNextRow);
			
			var vsKeyDate = util.Control.getValue(app, "dipKeyDateHistory").substring(0, 8);
			util.Grid.setCellValue(app, "grdCcsSubHistory", "REF_KEY", "", voNextRow);
			util.Grid.setCellValue(app, "grdCcsSubHistory", "ST_DT", vsKeyDate + "000000", voNextRow);
			util.Grid.setCellValue(app, "grdCcsSubHistory", "END_DT", "99991231000000", voNextRow);
			util.Grid.setCellValue(app, "grdCcsSubHistory", "UPT_STATUS", "N", voNextRow);
			
			/*
				그리드에 pk_colvalues를 넣는다.
				조회 후 찾아주기 위함.
			*/
			if(vsSchKeyDate+"000000" >= vsKeyDate+"000000"){
				moPage.setCcsSubPkColRowValue("rptCcsSubHistory");
			}else{
				moPage.setCcsSubPkColRowValue("rptCcsSub");
			}
			
			// 이력사항 변경사항 저장
			doSaveHis();
		 }
	};
	
	/**
	 * @desc [frfCcsSub]교과목 onUpdate 이벤트
	 * @param pbStatus Boolean
	 * @return  
	 * @author 박갑수 at 2016. 1. 26
	 */
	moPage.onUpdate_FrfCcsSub = function() {
		// 프리폼 업데이트내용 그리드 반영
//TO-BE: <ExtFreeForm.updateToRpt> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtFreeForm.updateToRpt("rptCcsSub", "frfCcsSub");
	};
	
	/**
	 * @desc [btnCopy]복사 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 1. 26
	 */
	moPage.onClick_BtnCopy = function() {
		
		var vnOrgRowIdx = util.Grid.getIndex(app, "grdCcsSub");
		// 마스터 리피트 row 선택여부 체크
		if(vnOrgRowIdx == "0"){
			
			var vsMsgParam = util.Grid.getTitle(app, "grdCcsSubCcsSub");
			// "@(을)를 선택해주세요" 메시지 출력
			util.Msg.alert("NLS-INF-M045", [vsMsgParam]);
			return;
		}
		
		// 마스터 row(대상) 변경내역 체크
		
		var vsUptStatus = util.Grid.getCellValue(app, "grdCcsSub", "UPT_STATUS", vnOrgRowIdx);
		if(util.Grid.isModified(app, ["grdCcsSub"])){
			var vsMsgParam = ExtControl.getTextValue("lblTitleFrfCcsSub");
			// "@의 시점 복사 작업은 [작업저장]후 진행하시기 바랍니다." 메시지 출력			
			util.Msg.alert("NLS-CCS-M062", [vsMsgParam]);
			return;
		}
		
		// 종료일자
		var vsEndDt = util.Grid.getCellValue(app, "grdCcsSub", "END_DT", vnOrgRowIdx).substring(0, 8);
		var vsKeyDate = util.DataMap.getValue(app, "dmReqKey", "strKeyDate").substring(0, 8);
		
		// 폐기여부 확인
		if(Number(vsEndDt) <= Number(vsKeyDate)){
			var vsMsgParam = ExtControl.getTextValue("lblTitleFrfCcsSub");
			// "폐기된 @은(는) 복사할 수 없습니다. 이력관리 탭에서 복구해주시기 바랍니다." 메시지 출력.
			util.Msg.alert("NLS-WRN-M208", [vsMsgParam]);
			return;
		}
		
		var voNextRow   = util.Grid.insertRow(app, "grdCcsSub");
		
		// 교과목 상세 조회
		doListDtl();
		
		// 값 복사
		ExtRepeat.copyToRowData("rptCcsSub", vnOrgRowIdx, "rptCcsSub", voNextRow);
		
		// 값복사후 Row의 내용 프리폼 반영을위해
		util.Grid.selectRow(app, "grdCcsSub", voNextRow);
		
		util.Grid.setCellValue(app, "grdCcsSub", "UPT_STATUS", "N", voNextRow);
		
		// 기본값 세팅
		// 시작일자 : 조회조건 기준일자
		util.FreeForm.setValue(app, "frfCcsSub", "ST_DT", vsKeyDate+"000000");
		
		// 종료일자 : 99991231
		util.FreeForm.setValue(app, "frfCcsSub", "END_DT", "99991231000000");
		
		// 참조키 : ""
		util.Grid.setCellValue(app, "grdCcsSub", "REF_KEY", "", voNextRow);
		
		// 언어키 : 시스템로케일
		var vsLanDivRcd = msSystemLocale;
		util.Grid.setCellValue(app, "grdCcsSub", "LAN_DIV_RCD", vsLanDivRcd, voNextRow);
		
		// FLAG_GBN : C
		var vsFlagGbn = "C";
		util.Grid.setCellValue(app, "grdCcsSub", "FLAG_GBN", vsFlagGbn, voNextRow);
		
		util.Control.setEnable(app, false, ["ipbFrfSbCd"]);
	};
	
	/**
	 * @desc [btnNew]신규 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 1. 26
	 */
	moPage.onClick_BtnNew = function() {
		
		
		var voChildList = ExtInstance.getNodeListLength("/root/resList/rptCcsSub/row[child::FLAG_GBN = 'C']");
		if(voChildList != null && voChildList > 0 ){
			//-- 복사기능 처리내역이 있습니다. 작업저장 후 진행 하시기 바랍니다.
			util.Msg.alert("NLS-CCS-M072");
			return;
		}
		
		
		// 신규로우 추가
		var vnIdx = util.Grid.insertRow(app, "grdCcsSub");
		
		/*
			교과목코드 자동일 경우 enable 처리한다.
		*/
		var vsCreateSbCdYn = util.DataMap.getValue(app, "dmResOnLoad", "strCreateSbCdYn");
		if( ValueUtil.fixNull(vsCreateSbCdYn) == "Y"){					
			util.Control.setEnable(app, false, "ipbFrfSbCd");			
			util.Control.redraw(app, "ipbFrfSbCd");
			util.Control.redraw(app, "ipbFrfSbCd");
		}
		
		
		
		// 신규 Defalut값 설정 
		// 주관부서명 : 조회조건
		var vsSpvsDeptNm = util.DataMap.getValue(app, "dmReqKey", "strSpvsDeptNm");
		util.FreeForm.setValue(app, "frfCcsSub", "SPVS_DEPT_NM", vsSpvsDeptNm, false, false );
		//--프로폼에 주관부서에 이벤트가 있으므로 발을 하지 않도록 false로 주었지만 리피터로 데이터를 전달하기 위해 setValue를 한다.
		util.Grid.setCellValue(app, "grdCcsSub", "SPVS_DEPT_NM", vsSpvsDeptNm, vnIdx);
		
		// 주관부서코드 : 조회조건
		var vsSpvsDeptCd = util.DataMap.getValue(app, "dmReqKey", "strSpvsDeptCd");
		util.FreeForm.setValue(app, "frfCcsSub", "SPVS_DEPT_CD", vsSpvsDeptCd);
		
		//--학년 cbbFrfSblvlRcd
		util.SelectCtl.selectItem(app, "cbbFrfSblvlRcd", 0);
		util.FreeForm.setValue(app, "frfCcsSub", "SB_LVL_RCD", "");
		
		// 이수구분 : 조회조건
		util.SelectCtl.selectItem(app, "cbbFrfCmpDivRcd", 0);
		var vsCmpDivRcd = util.DataMap.getValue(app, "dmReqKey", "strCmpDivRcd");
		util.FreeForm.setValue(app, "frfCcsSub", "CMP_DIV_RCD", vsCmpDivRcd);
		
		// 시작일자 : 조회조건 기준일자
		var vsStDt = util.DataMap.getValue(app, "dmReqKey", "strKeyDate");
		util.FreeForm.setValue(app, "frfCcsSub", "ST_DT", vsStDt);
		
		// 종료일자 : 99991231
		var vsEndDt = "99991231000000";
		util.FreeForm.setValue(app, "frfCcsSub", "END_DT", vsEndDt);
		
		// 객체구분코드 : 교과목[CC009SB]
		var vsObjDivRcd = "CC009SB";
		util.Grid.setCellValue(app, "grdCcsSub", "OBJ_DIV_RCD", vsObjDivRcd, vnIdx);
		
		// 언어키 : 시스템로케일
		var vsLanDivRcd = msSystemLocale;
		util.Grid.setCellValue(app, "grdCcsSub", "LAN_DIV_RCD", vsLanDivRcd, vnIdx);
		
		
		// 성적스케일코드
		util.FreeForm.setValue(app, "frfCcsSub", "REC_SCALE_RCD", "CD10106", false, true);
		util.Grid.setCellValue(app, "grdCcsSub", "REC_SCALE_RCD", "CD10106", vnIdx);
		
		// 평가방법 : 상대평가[CA21002]
		util.FreeForm.setValue(app, "frfCcsSub", "EVAL_METHOD_RCD", "CA21002");
		util.Grid.setCellValue(app, "grdCcsSub", "EVAL_METHOD_RCD", "CA21002", vnIdx);
		
		// 강의유형 : 오프라인[CA209LECT]
		util.FreeForm.setValue(app, "frfCcsSub", "LECT_TYPE_RCD", "CA209LECT", false, true);
		util.Grid.setCellValue(app, "grdCcsSub", "LECT_TYPE_RCD", "CA209LECT", vnIdx);
		
		
		// FLAG_GBN : N
		var vsFlagGbn = "N";
		util.Grid.setCellValue(app, "grdCcsSub", "FLAG_GBN", vsFlagGbn, vnIdx);
				
		// 프리폼 항목 포커스
		util.Control.setFocus(app,  "ipbFrfSbNm");
	};
	
	/**
	 * @desc [btnDel]삭제 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 1. 26
	 */
	moPage.onClick_BtnDel = function() {
		
		var voChildList = ExtInstance.getNodeListLength("/root/resList/rptCcsSub/row[child::FLAG_GBN = 'C']");		
		if(voChildList != null && voChildList >0 ){
			var vsFlgGbn = util.Grid.getCellValue(app, "grdCcsSub", "FLAG_GBN", util.Grid.getIndex(app, "grdCcsSub"));
			if(vsFlgGbn != 'C'){
				//--복사기능 처리내역이 있습니다. 작업저장 후 진행 하시기 바랍니다.
				util.Msg.alert("NLS-CCS-M072");
				return;
			}
			
		}
		
		// 삭제
		util.Grid.deleteRow(app, "grdCcsSub");
		// 마스터 리피트 상태에 따른 디테일 프리폼 비활성화 제어
		doCompareFrfEnable();
	};
	
	/**
	 * @desc  마스터 리피트 상태에 따른 디테일 프리폼 비활성화 제어
	 *			    1. index가 지정되지 않았을 경우
	 *			    2. 현재 index의 로우가 삭제 상태일 경우 
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 1. 26
	 */
	function doCompareFrfEnable() {
		// 신규시 제어 컬럼
		var vaEnableCtl = [];
		// 교과목코드 자동생성 SF 사용여부 - 사용안할경우 제어컬럼 추가
		var vsCreateSbCdYn = util.DataMap.getValue(app, "dmResOnLoad", "strCreateSbCdYn");
		if(ValueUtil.isNull(vsCreateSbCdYn) || ValueUtil.fixNull(vsCreateSbCdYn) != "Y"){
			vaEnableCtl.push("ipbFrfSbCd");			
		}else{
			ExtControl.setAttr("ipbFrfSbCd", "class", "ipbFrf");
			ExtControl.setAttr("lblFrfSbCd", "class", "lblFrf");			
			util.Control.setEnable(app, false, "ipbFrfSbCd");
			util.Control.setUserAttr(app, "ipbFrfSbCd", "require", "notNull=no");
			util.Control.setUserAttr(app, "rdOptSbCd", "require", "notNull=no");
			util.Control.redraw(app, ["ipbFrfSbCd", "rdOptSbCd"]);			
			
		}
		
		// 마스터 로우 없을경우 프리폼 리셋
		if(!util.Grid.getIndex(app, "grdCcsSub")){
			util.Control.reset(app, "frfCcsSub");
		}
		
		if( (!util.Grid.getIndex(app, "grdCcsSub")) 
			|| util.Grid.getRowState(app, "grdCcsSub") == cpr.data.tabledata.RowState.DELETED) {
				
			util.Control.setEnable(app, false, ["frfCcsSub"]);	
			
		} else {
			util.Control.setEnable(app, true, ["frfCcsSub"]);	
			
			var vsFlgGbn = util.Grid.getCellValue(app, "grdCcsSub", "FLAG_GBN", util.Grid.getIndex(app, "grdCcsSub"));
			// 신규 상태에따른 프리폼항목 제어
			if(util.Grid.getRowState(app, "grdCcsSub") == cpr.data.tabledata.RowState.INSERTED && ValueUtil.fixNull(vsFlgGbn) != "C"){
				util.Control.setEnable(app, true, vaEnableCtl);	
			}else {
				util.Control.setEnable(app, false, vaEnableCtl);	
			}
		}	
	};
	
	/**
	 * @desc [btnRestore]작업취소 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 1. 26
	 */
	moPage.onClick_BtnRestore = function() {
		// 작업취소
		util.Grid.restoreRow(app, "grdCcsSub");
		// 마스터 리피트 상태에 따른 디테일 프리폼 비활성화 제어
		doCompareFrfEnable();
		// 취소내용 프리폼 반영
//TO-BE: <ExtRepeat.copyRowForm> 그리드-프리폼인 경우에는 selection바인딩으로 처리하기 때문에 불필요함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.copyRowForm("rptCcsSub", "frfCcsSub");
	};
	
	/**
	 * @desc [btnSave]작업저장 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 1. 26
	 */
	moPage.onClick_BtnSave = function() {
		// 작업저장
		doSave();
	};
	
	/**
	 * @desc 교과목목록 변경사항 저장
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 1. 26
	 */
	function doSave() {
		
		// 리피트 변경사항 체크
		if(!util.Grid.isModified(app, ["grdCcsSub"], "MSG")){
			return false;
		}
		
		// 리피트 Validation Check
		if(!util.validate(app, "grdCcsSub")) return false;

		//strCommand: save 
		util.Submit.send(app, "subSave", function(pbSuccess){
			if(pbSuccess){
				
				doSaveWithAcademicStructure();
				
				//조회건수가 0건이면 프리폼이 내역이 반영되지 않기 떄문
				util.Control.reset(app, "frfCcsSub");
				
				var vsPkValues = util.DataMap.getValue(app, "dmResList", "strPkValues");				
				if(!ValueUtil.isNull(vsPkValues)){
					
					ExtRepeat.setPkValues("rptCcsSub" , vsPkValues);
				}
				
				doList(function(pbListSuccess) {
					// 조회 : "갱신된 데이터가 조회되었습니다." header 메세지 표시
					if (pbListSuccess) doSetMsgStatus(NLS.INF.M025);
				});
			}else {
				// "저장중 오류가 발생하였습니다." 메시지 표시
				doSetMsgStatus(NLS.WRN.M119);
				util.Tab.setSelectedTabItem(app, "tabMain", TAB.MANAGE);
			}
		});
	};
	
	/**
	 * @desc [rptCcsSubLang]언어목록 onRowSelect 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 1. 26
	 */
	moPage.onRowSelect_RptCcsSubLang = function() {
		// 리피트 현재 index get
		var vnIndex = util.Grid.getIndex(app, "grdCcsSubLang");
		// 리피트 특정 row 데이터를 프리폼 copy
//TO-BE: <ExtRepeat.copyRowForm> 그리드-프리폼인 경우에는 selection바인딩으로 처리하기 때문에 불필요함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.copyRowForm("rptCcsSubLang", "frfCcsSubLang", vnIndex);
		// 프리폼 비활성화 제어
		doCompareFrfEnableLan();
	};
	
	/**
	 * @desc  마스터 리피트 상태에 따른 디테일 프리폼 비활성화 제어(언어목록)
	 *			    1. index가 지정되지 않았을 경우
	 *			    2. 현재 index의 로우가 삭제 상태일 경우 
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 1. 26
	 */
	function doCompareFrfEnableLan() {
		var vaEnableCtl = ["cbbFrfLanDivRcdLan"];
		
		if( (!util.Grid.getIndex(app, "grdCcsSubLang")) 
			|| util.Grid.getRowState(app, "grdCcsSubLang") == cpr.data.tabledata.RowState.DELETED) {
				
			util.Control.setEnable(app, false, ["frfCcsSubLang"]);	
		} else {
			util.Control.setEnable(app, true, ["frfCcsSubLang"]);	
			
			// 신규 상태에따른 프리폼항목 제어
			if(util.Grid.getRowState(app, "grdCcsSubLang") == cpr.data.tabledata.RowState.INSERTED){
				util.Control.setEnable(app, true, vaEnableCtl);	
			}else {
				util.Control.setEnable(app, false, vaEnableCtl);	
			}
		}
		
		// 언어목록 변경사항 에따른 교과목목록 Enable 처리
		if(util.Grid.isModified(app, "grdCcsSubLang")){
			util.Control.setEnable(app, false, ["grpData"]);
		}else {
			util.Control.setEnable(app, true, ["grpData"]);
		}
	};
	
	/**
	 * @desc 언어목록 조회
	 * @param poCallBackFunc 콜백정의
	 * @return void
	 * @author 박갑수 at 2016. 1. 25
	 */
	function doListLang(poCallBackFunc) {
		
		// 언어목록 조회 서브이션 
		//strCommand: listLang 
		util.Submit.send(app, "subListLang", function(pbSuccess){
			if(pbSuccess){
				
				util.Control.redraw(app, "grdCcsSubLang");
			}
			
			// 조회 후 콜백함수 수행
			if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
		});
	};
	
	/**
	 * @desc [btnNewLan]신규(언어) onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 1. 26
	 */
	moPage.onClick_BtnNewLan = function() {
		// 신규로우 추가
		var vnIdx = util.Grid.insertRow(app, "grdCcsSubLang");
		
		// 신규 Defalut값 설정 
		// 교과목코드 : 마스터목록
		var vsSbCd = util.DataMap.getValue(app, "dmReqSelRow", "strSbCd");
		util.FreeForm.setValue(app, "frfCcsSubLang", "SB_CD", vsSbCd);
		// 참조키 : 마스터목록
		var vsRefKey = util.DataMap.getValue(app, "dmReqSelRow", "strRefKey");
		util.FreeForm.setValue(app, "frfCcsSubLang", "REF_KEY", vsRefKey);
		
		// 프리폼 항목 포커스
		util.Control.setFocus(app,  "cbbFrfLanDivRcdLan");
	};
	
	/**
	 * @desc [btnDelLan]삭제(언어) onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 1. 26
	 */
	moPage.onClick_BtnDelLan = function() {
		
		// 기본언어구분
		var vsLangDivRcd = util.DataMap.getValue(app, "dmReqSelRow", "strLanDivRcd");
		
		var vsUptStatus = util.Grid.getCellValue(app, "grdCcsSubLang", "UPT_STATUS");
		if (ValueUtil.fixNull(vsLangDivRcd) == util.FreeForm.getValue(app, "frfCcsSubLang", "LAN_DIV_RCD")
		    && ValueUtil.isNull(vsUptStatus)) {
			// 기본언어레코드는 삭제할 수 없습니다. 메시지 표시
			util.Msg.alert("NLS-WRN-M010");
			return;
		}
		// 삭제
		util.Grid.deleteRow(app, "grdCcsSubLang");
		// 마스터 리피트 상태에 따른 디테일 프리폼 비활성화 제어
		doCompareFrfEnableLan();
	};
	
	/**
	 * @desc [btnRestoreLan]작업취소(언어) onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 1. 26
	 */
	moPage.onClick_BtnRestoreLan = function() {
		// 작업취소
		util.Grid.restoreRow(app, "grdCcsSubLang");
		// 마스터 리피트 상태에 따른 디테일 프리폼 비활성화 제어
		doCompareFrfEnableLan();
		// 취소내용 프리폼 반영
//TO-BE: <ExtRepeat.copyRowForm> 그리드-프리폼인 경우에는 selection바인딩으로 처리하기 때문에 불필요함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.copyRowForm("rptCcsSubLang", "frfCcsSubLang");
	};
	
	/**
	 * @desc [btnSaveLan]작업저장(언어) onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 1. 20
	 */
	moPage.onClick_BtnSaveLan = function() {
		// 언어목록 변경사항 저장
		doSaveLan();
	};
	
	/**
	 * @desc 언어목록 변경사항 저장
	 * @param 
	 * @return  
	 * @author 박갑수 at 2016. 1. 25
	 */
	function doSaveLan() {
		// 리피트 변경사항 체크
		if(!util.Grid.isModified(app, ["grdCcsSubLang"], "MSG")){
			return false;
		}
		
		// 리피트 Validation Check
		if(!util.validate(app, "grdCcsSubLang")) return false;
		
		//strCommand: saveLang 
		util.Submit.send(app, "subSaveLang", function(pbSuccess){
			if(pbSuccess) {
				// 언어목록 조회
				doListLang(function(pbSuccessList) {
					if(pbSuccessList){
						// "갱신된 데이터가 조회되었습니다." header 메세지 표시
						doSetMsgStatus(NLS.INF.M025);
						
						doSaveWithAcademicStructure();	
					}
				});
			}else {
				// "저장중 오류가 발생하였습니다." 메시지 표시
				doSetMsgStatus(NLS.WRN.M119);
			}
		});
	};
	
	/**
	 * @desc [frfCcsSubLang]언어목록 onUpdate 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 1. 26
	 */
	moPage.onUpdate_FrfCcsSubLang = function() {
		// 프리폼 업데이트내용 그리드 반영
//TO-BE: <ExtFreeForm.updateToRpt> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtFreeForm.updateToRpt("rptCcsSubLang", "frfCcsSubLang");
	};
	
	/**
	 * @desc [btnFrfSpvsDept]주관부서명(돋보기버튼) onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 1. 22
	 */
	moPage.onClick_BtnFrfSpvsDept = function(sender) {
		// 객체검색팝업 호출
		doOnClickStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc [ipbFrfSpvsDeptNm]주관부서명 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 1. 22
	 */
	moPage.onValueChanged_IpbFrfSpvsDeptNm = function(sender) {
		// 값변경시 객체검색팝업 호출
		doOnChangeStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc [btnFrfSpvsColg]주관대학명(돋보기버튼) onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 1. 22
	 */
	moPage.onClick_BtnFrfSpvsColg = function(sender) {
		// 객체검색팝업 호출
		doOnClickStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc [IpbFrfSpvsColgNm]주관대학명 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 1. 22
	 */
	moPage.onValueChanged_IpbFrfSpvsColgNm = function(sender) {
		// 값변경시 객체검색팝업 호출
		doOnChangeStdCmnPObjSch(sender);
	};
	
	
	/**
	 * @desc 학점 음수를  입력 할 수 없다.
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 2. 2
	 */
	moPage.onValueChanged_IpbFrfPnt = function() {
		page.onValueChanged_checkIntegerDecimal("ipbFrfPnt");
	};
	
	
	/**
	 * @desc 이론시수 음수를  입력 할 수 없다.
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 2. 2
	 */
	moPage.onValueChanged_IpbFrfTheoTc = function() {
		if(!page.onValueChanged_checkIntegerDecimal("ipbFrfTheoTc")) return false;
		
		page.doSetSbCatRcd();
		
		
	};
	
	/**
	 * @desc 실습 음수를  입력 할 수 없다.
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 2. 2
	 */
	moPage.onValueChanged_IpbFrfEpacTc = function() {
		if(!page.onValueChanged_checkIntegerDecimal("ipbFrfEpacTc"))return false;
		
		page.doSetSbCatRcd();
	};
	
	
	/**
	 * @desc  음수를  입력 할 수 없다.
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 2. 2
	 */
	moPage.onValueChanged_checkIntegerDecimal = function(vpCtl) {
		
		ValidUtil.checkIntegerDecimal(vpCtl, 3, 0, true);
		
		return true;
	};
	
	
		
	
	/**
	 * @desc 교과목 범주
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 10. 12
	 */
	function doSetSbCatRcd(){
		// 교과목범주[CA203] - 이론[CA20301], 실습[CA20302], 이론+실습[CA20303]
		var vsSbCatRcd = "";
		
		// 이론
		var vsTheoTc = util.FreeForm.getValue(app, "frfCcsSub", "THEO_TC");
		// 실습
		var vsEpacTc = util.FreeForm.getValue(app, "frfCcsSub", "EPAC_TC");
		
		if(ValueUtil.fixNumber(vsTheoTc) > 0){
			if(ValueUtil.fixNumber(vsEpacTc) > 0){
				vsSbCatRcd = "CA20303";	// 이론 + 실습
			}else {
				vsSbCatRcd = "CA20301";	// 이론
			}
		}else {
			if(ValueUtil.fixNumber(vsEpacTc) > 0){
				vsSbCatRcd = "CA20302";	// 실습
			}else {
				vsSbCatRcd = "";
			}
		}
		
		util.FreeForm.setValue(app, "frfCcsSub", "SB_CAT_RCD", vsSbCatRcd);
		util.Grid.setCellValue(app, "grdCcsSub", "SB_CAT_RCD", vsSbCatRcd);		
	};
	
	
	
	
	moPage.onClick_BtnSave1 = function() {
		// 작업저장
		doSave();
	};
	
	
	
	
	
	return moPage;
};
