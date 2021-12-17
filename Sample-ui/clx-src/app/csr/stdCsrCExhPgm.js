//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
///<xtmlink path="./stdCsrCExhPgm.xtm"/>

var stdCsrCExhPgm = function() {

	var moPage = new Page();
	//임포트용 데이터 통신 오브젝트
	var moPObject = new PObject();

	// 탭 정의
	moPage.TAB = {
		//데이타 관리
		EXH_PGM_MNG  	: "tabExhPgmMng",
		//이력관리
		EXH_PGM_HIS    	: "tabExhPgmHis",
		//언어
		EXH_PGM_LANG 	: "tabExhPgmLang"
	};
	// 탭버튼 정의
	moPage.TAB_BTN = {
		//데이타 관리
		tabExhPgmMng   		: "tabBtnExhPgmMng",
		//이력관리
		tabExhPgmHis  	        : "tabBtnExhPgmHistory",
		//언어
		tabExhPgmLang       	: "tabBtnExhPgmLang"
	};
	
	/**
	 * @desc  Header Import onLoad
	 * @return void
     * @author Choi In Seong 2016. 6. 21
     */
	moPage.onLoadImportDone_ImpTitle = function() {
		doHeaderOnLoad();
	};

	/**
	 * @desc 조회조건 엔터 시 바로 조회
	 * @param 
	 * @return 
	 * @author Choi In Seong 2016. 6. 21
	 */
	moPage.onKeyDown_IpbExhPgmCd = function(strKeyType, strKeyStatus) {
		// 엔터키 입력시 조회
		if(e.keyCode == cpr.events.KeyCode.ENTER){
			// 검색 실행.
			ExtModel.dispatch("btnSearch","DOMActivate");
		}
	};
	
	/**
	 * @desc 조회조건 엔터 시 바로 조회
	 * @param 
	 * @return 
	 * @author Choi In Seong 2016. 6. 21
	 */
	moPage.onKeyDown_IpbExhPgmNm = function(strKeyType, strKeyStatus) {
		// 엔터키 입력시 조회
		if(e.keyCode == cpr.events.KeyCode.ENTER){
			// 검색 실행.
			ExtModel.dispatch("btnSearch","DOMActivate");
		}
	};
	
	/**
	 * @desc 탭선택
	 * @param 
	 * @return 
	 * @author Choi In Seong 2016. 6. 21
	 */
	moPage.onClick_TabBtnExhPgmMng = function() {
		doTabChange(moPage.TAB.EXH_PGM_MNG);
	};
	
	/**
	 * @desc 탭선택
	 * @param 
	 * @return 
	 * @author Choi In Seong 2016. 6. 21
	 */
	moPage.onClick_TabBtnExhPgmHistory = function() {
		doTabChange(moPage.TAB.EXH_PGM_HIS);
	};
	
	/**
	 * @desc 탭선택
	 * @param 
	 * @return 
	 * @author Choi In Seong 2016. 6. 21
	 */
	moPage.onClick_TabBtnExhPgmLang = function() {
		doTabChange(moPage.TAB.EXH_PGM_LANG);
	};
	
	/**
	 * @desc 기준일자 선택
	 * @param 
	 * @return 
	 * @author Choi In Seong 2016. 6. 21
	 */
	moPage.onClick_BtnYearSmt = function() {
		doOnclickSchYearSmt("dipKeyDate","impSchYearSmt");
	}
	
	/**
	 * @desc 기준일자 선택
	 * @param 
	 * @return 
	 * @author Choi In Seong 2016. 6. 21
	 */
	moPage.onClick_BtnYearSmtHistory = function() {
		doOnclickSchYearSmt("dipKeyDateHistory","impSchYearSmt");
	};
	
	/**
	 * @desc 화면 온로드
	 * @return 
	 * @author Choi In Seong 2016. 6. 21
	 */
	moPage.onModelConstructDone_stdCsrCExhPgm = function() {
		
		//리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["rptCsrExhPgm", "rptCsrExhPgmHistory", "rptCsrExhPgmLang"]);
		// 2. 검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grp_rptCsrExhPgm"]);
		
		setUnitSystem("CSR");
		
		// 첫번째 탭버튼 선택
		ExtTab.setTabBtn("tabMain",  moPage.TAB_BTN.tabExhPgmMng);
		util.Tab.setSelectedTabItem(app, "tabMain",moPage.TAB.EXH_PGM_MNG);
		
		//서브미션 실행 (실패시 cover page)
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				
				util.DataMap.setValue(app, "dmReqList", "strLanGbn", msSystemLocale);
				
				util.Control.redraw(app, ["dipKeyDate", "cbbDivRcd", "cbbExhPgmTypeRcd", "dipKeyDateHistory"]);
				
				util.Control.setFocus(app, "dipKeyDate");
			}
		});
	}

	/**
	 * @desc 조회 버튼 클릭
	 * @param 
	 * @return 
	 * @author Choi In Seong 2016. 6. 21
	 */
	moPage.onClick_BtnSearch = function() {
		
		var vsSelTabId = util.Tab.getSelectedId(app, "tabMain");
		 //작업영역 리피트 변경 내역 체크
		if(util.Grid.isModified(app, "", "CRM")){
			return false;
		}else{
			doClearTab(vsSelTabId);
		}
		//조회조건 필수 체크 기준일자
		if(!util.validate(app, ["dipKeyDate"])) return false;
		
		// 첫번째 탭버튼 선택
		ExtTab.setTabBtn("tabMain",  moPage.TAB_BTN.tabExhPgmMng);
		util.Tab.setSelectedTabItem(app, "tabMain",moPage.TAB.EXH_PGM_MNG);
		
		doList(function(pbSuccess) {
			// 조회 : "조회되었습니다." header 메세지 표시
			if(pbSuccess) util.Msg.notify(app, "NLS.INF.M024");
		});
	};

	/**
	 * @desc 탭 리피트 초기화
	 * @param 
	 * @return 
	 * @author Choi In Seong 2016. 6. 21
	 */
	function doClearTab(vsSelTabId){

		if(vsSelTabId !="")
		{
			if(vsSelTabId == moPage.TAB.EXH_PGM_MNG){
				//적용그룹관리 
				util.Grid.revertAllData(app, "grdCsrExhPgm");
				
			}else if(vsSelTabId == moPage.TAB.EXH_PGM_HIS){
				//평가항목관리
				util.Grid.revertAllData(app, "grdCsrExhPgmHistory");
				
			}else if(vsSelTabId == moPage.TAB.EXH_PGM_LANG){
				//평가항목관리
				util.Grid.revertAllData(app, "grdCsrExhPgmLang");
			}
		}
	}

	 /**
	  * 탭 변경사항 체크 후 조회
	  * @member moPage
	  * @param {?} psCaseId
	  * @type Boolean
	  * @return 
	  * @author hyunteak at 16. 3. 8 오전 11:23
	  */
	function doTabChange (psCaseId){

		var vsSelTabId = util.Tab.getSelectedId(app, "tabMain");
		
		// 1. 현재 선택된 탭의 상태 체크
		switch (vsSelTabId) {
			// 데이타 관리
			case moPage.TAB.EXH_PGM_MNG: {
					if(psCaseId != moPage.TAB.EXH_PGM_MNG){
						// 데이타 관리 변경내역 있는 경우
						if(util.Grid.isModified(app, ["grdCsrExhPgm"], "CRM") ){
							// tab 이동 하지 않음
							ExtTab.setTabBtn("tabMain", moPage.TAB_BTN[vsSelTabId]);
							return false;
						}else{
							if(ValueUtil.isNull(util.Grid.getCheckOrSelectedRowIndex(app, "grdCsrExhPgm"))){
								util.Msg.notify(app, "NLS.INF.M023");
								// tab 이동 하지 않음
								ExtTab.setTabBtn("tabMain", moPage.TAB_BTN[vsSelTabId]);
								return false;
							}
							
							if(util.Grid.isModified(app, ["grdCsrExhPgm"]))	{
								//이력 목록 리셋
								util.Grid.revertAllData(app, "grdCsrExhPgm");
								//이력 기본정보 리셋
								util.Control.reset(app, "frfCsrExhPgm");
							}
						}
					}
				break;
			}
			
			// 이력관리
			case moPage.TAB.EXH_PGM_HIS: {
					if(psCaseId != moPage.TAB.EXH_PGM_HIS){
						// 이력관리 변경내역이 있는 경우
						if(util.Grid.isModified(app, ["grdCsrExhPgmHistory"], "CRM") ){
							// tab 이동 하지 않음
							ExtTab.setTabBtn("tabMain", moPage.TAB_BTN[vsSelTabId]);
							return false;
						}else{	
							// 선택된 행이 없을 시 막음
							if(ValueUtil.isNull(util.Grid.getCheckOrSelectedRowIndex(app, "grdCsrExhPgmHistory"))){
								util.Msg.notify(app, "NLS.INF.M023");
								// tab 이동 하지 않음
								ExtTab.setTabBtn("tabMain", moPage.TAB_BTN[vsSelTabId]);
								return false;
							}

							if(util.Grid.isModified(app, ["grdCsrExhPgmHistory"]))	{
								//이력 목록 리셋
								util.Grid.revertAllData(app, "grdCsrExhPgmHistory");
							}
						}
					}
				break;
			}
			
			// 언어
			case moPage.TAB.EXH_PGM_LANG: {
					if(psCaseId != moPage.TAB.EXH_PGM_LANG){
						// 언어 목록에 변경내역이 있는 경우
						if(util.Grid.isModified(app, ["grdCsrExhPgmLang"], "CRM") ){
							// tab 이동 하지 않음
							ExtTab.setTabBtn("tabMain", moPage.TAB_BTN[vsSelTabId]);
							return false;
						}else
						{	
							//언어 작업취소
							util.Grid.restoreRow(app, "grdCsrExhPgmLang");
						}
					}
				break;
			}
			
		}
		
		var vsExhPgmCd  = util.Grid.getCellValue(app, "grdCsrExhPgm", "EXH_PGM_CD");  //교환프로그램코드
		var vsRefKey        = util.Grid.getCellValue(app, "grdCsrExhPgm", "REF_KEY");    //REF_KEY
		var vsLanDivRcd   = util.Grid.getCellValue(app, "grdCsrExhPgm", "LAN_DIV_RCD"); //언어구분코드
		
		util.DataMap.setValue(app, "dmReqSelRow", "strExhPgmCd", vsExhPgmCd);
		util.DataMap.setValue(app, "dmReqSelRow", "strRefKey",   vsRefKey);
		util.DataMap.setValue(app, "dmReqSelRow", "strLanGbn",   vsLanDivRcd);
		
		// 탭변경
		util.Tab.setSelectedTabItem(app, "tabMain", psCaseId);
		// 탭변경 후 처리 로직
		switch (psCaseId) {
			// 3-1. 평가항목관리 조회
			case moPage.TAB.EXH_PGM_MNG : {
				doSearchManage();
				
				break;
			}
			// 적용그룹관리 조회
			case moPage.TAB.EXH_PGM_HIS : {
				//var 
				doListHistory(function(pbSuccess) {
					// 조회 : "조회되었습니다." header 메세지 표시
					if(pbSuccess) util.Msg.notify(app, "NLS.INF.M024");
				});
				
				break;
			}
			
			case moPage.TAB.EXH_PGM_LANG : {
				//var 
				doListLang(function(pbSuccess) {
					// 조회 : "조회되었습니다." header 메세지 표시
					if(pbSuccess) util.Msg.notify(app, "NLS.INF.M024");
				});
				
				break;
			}
		}
	}

	/**
	 * @desc 교환프로그램 목록 조회
	 * @param 
	 * @return 
	 * @author Choi In Seong 2016. 6. 21
	 */
	function doList(poCallBackFunc) {
		//strCommand: list 
		util.Submit.send(app, "subList",  function(pbSuccess) {
			if(pbSuccess){
				//rebuild
				util.Control.redraw(app, ["rptCsrExhPgm"]);
				if(util.Grid.getIndex(app, "grdCsrExhPgm")){
					util.Control.setEnable(app, true, "frfCsrExhPgm");
				}else{
					util.Control.setEnable(app, false, "frfCsrExhPgm");
					util.Control.reset(app, "frfCsrExhPgm");
				}
			}
			if(util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
		});
	}

	/**
	 * @desc 교환프로그램 상세 조회
	 * @param 
	 * @return 
	 * @author Choi In Seong 2016. 6. 21
	 */
	function doSearchManage() {
		//1.행정부서목록 포커싱된 인덱스
		var vnIndex = util.Grid.getIndex(app, "grdCsrExhPgm");
		//2.학사부서코드 활성화여부
		var vsFlagGbn = util.Grid.getCellValue(app, "grdCsrExhPgm","FLAG_GBN",vnIndex);
		var vsRowStatus = util.Grid.getRowState(app, "grdCsrExhPgm");
		//신규시만 활성화 ,복사 or 수정시 비 활성화
		if(vsFlagGbn !="C" &&  vsRowStatus =="insert")
		{
			util.Control.setEnable(app, true,"ipbFrfExhPgmCd");
		}else
		{
			util.Control.setEnable(app, false,"ipbFrfExhPgmCd");
		}
		//3.리피트 특정 row 데이터를 프리폼 copy
//TO-BE: <ExtRepeat.copyRowForm> 그리드-프리폼인 경우에는 selection바인딩으로 처리하기 때문에 불필요함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.copyRowForm("rptCsrExhPgm","frfCsrExhPgm", vnIndex);
	}
	
	/**
	 * @desc 이력 목록 조회
	 * @param 
	 * @return 
	 * @author Choi In Seong 2016. 6. 21
	 */
	function doListHistory(poCallBackFunc) {
		//strCommand: listHistory 
		util.Submit.send(app, "subListHistory",  function(pbSuccess) {
			if(pbSuccess){
				//rebuild
				util.Control.redraw(app, ["rptCsrExhPgmHistory"]);
			}
			if(util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
		});
	}
	
	/**
	 * @desc 언어 목록 조회
	 * @param 
	 * @return 
	 * @author Choi In Seong 2016. 6. 21
	 */
	function doListLang(poCallBackFunc) {
		//strCommand: listLang 
		util.Submit.send(app, "subListLang",  function(pbSuccess) {
			if(pbSuccess){
				//rebuild
				util.Control.redraw(app, ["rptCsrExhPgmLang"]);
			}
			if(util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
		});
	}

	/**
	 * @desc 교환프로그램 신규
	 * @param 
	 * @return 
	 * @author Choi In Seong 2016. 6. 21
	 */
	moPage.onClick_BtnNew = function() {
		
		util.Control.setEnable(app, true, "frfCsrExhPgm");
		
		var strKeyDate = util.DataMap.getValue(app, "dmReqList", "strKeyDate");
		//해당 리피트 insertRow 후 편집 시작할 컬럼 지정
		util.Grid.insertRow(app, "grdCsrExhPgm");

		var vsStDt = util.DataMap.getValue(app, "dmReqList", "strKeyDate");
		var vsDivRcd = util.DataMap.getValue(app, "dmReqList", "strDivRcd");
		var vsTypeRcd = util.DataMap.getValue(app, "dmReqList", "strExhPgmTypeRcd");
		
		var vsDate = vsStDt.substring(0, 8);
		vsDate += "000000";
		
		util.Grid.setCellValue(app, "grdCsrExhPgm", "ST_DT", vsDate);  // 조회 조건 기준일자
		util.Grid.setCellValue(app, "grdCsrExhPgm", "END_DT", "99991231000000");  // 종료일
		util.Grid.setCellValue(app, "grdCsrExhPgm", "LAN_DIV_RCD", msSystemLocale); // 언어구분코드
		util.Grid.setCellValue(app, "grdCsrExhPgm", "OBJ_DIV_RCD", "CC009EX");  // 객체구분코드
		util.Grid.setCellValue(app, "grdCsrExhPgm", "EXH_PGM_DIV_RCD", vsDivRcd);  //  교환프로그램구분
		util.Grid.setCellValue(app, "grdCsrExhPgm", "EXH_PGM_TYPE_RCD", vsTypeRcd);  // 교환프로그램유형
		util.Grid.setCellValue(app, "grdCsrExhPgm", "FLAG_GBN", "N"); 
		
		util.FreeForm.setValue(app, "frfCsrExhPgm", "ST_DT", vsDate);
		util.FreeForm.setValue(app, "frfCsrExhPgm", "END_DT", "99991231000000");
		util.FreeForm.setValue(app, "frfCsrExhPgm", "LAN_DIV_RCD", msSystemLocale); // 언어구분코드
		util.FreeForm.setValue(app, "frfCsrExhPgm", "OBJ_DIV_RCD", "CC009EX");  // 객체구분코드
		util.FreeForm.setValue(app, "frfCsrExhPgm", "EXH_PGM_DIV_RCD", vsDivRcd);  //  교환프로그램구분
		util.FreeForm.setValue(app, "frfCsrExhPgm", "EXH_PGM_TYPE_RCD", vsTypeRcd);  // 교환프로그램유형
		util.FreeForm.setValue(app, "frfCsrExhPgm", "FLAG_GBN", "N"); 
	};
	
	/**
	 * @desc 교환프로그램 복사
	 * @param 
	 * @return 
	 * @author Choi In Seong 2016. 6. 21
	 */
	moPage.onClick_BtnCopy = function() {
		var voRpt = ExtControl.getControl("rptCsrExhPgm");
		vsSelIdx = voRpt.getSelectedRowPos("", "");
					
		if(vsSelIdx == ""){
			// 라인을 선택하세요.
			util.Msg.notify(app, "NLS.INF.M023");
			return false;
		}
		
		util.Control.setEnable(app, true, "frfCsrExhPgm");
		var vsExhPgmCd = util.Grid.getCellValue(app, "grdCsrExhPgm", "EXH_PGM_CD", vsSelIdx);
		var vsKeyDate = util.DataMap.getValue(app, "dmReqList", "strKeyDate");
		var vnNewIdx =  util.Grid.insertRow(app, "grdCsrExhPgm");
		//선택된 행 복사
		ExtRepeat.copyToRowData("rptCsrExhPgm", vsSelIdx, "rptCsrExhPgm", vnNewIdx);
		
		var vsDate = vsKeyDate.substring(0, 8);
		vsDate += "000000";

		util.Grid.setCellValue(app, "grdCsrExhPgm", "ST_DT", vsDate, vnNewIdx);
		util.Grid.setCellValue(app, "grdCsrExhPgm", "END_DT", "99991231000000", vnNewIdx);
		util.Grid.setCellValue(app, "grdCsrExhPgm", "REF_KEY", "", vnNewIdx);
		
		util.Grid.setCellValue(app, "grdCsrExhPgm", "UPT_STATUS", "N", vnNewIdx);
		util.Grid.setCellValue(app, "grdCsrExhPgm", "FLAG_GBN", "C", vnNewIdx);
		ExtRepeat.setPkValues("rptCsrExhPgm", "EXH_PGM_CD:"+vsExhPgmCd+",ST_DT:"+vsDate+",END_DT:99991231000000");
		//리피트 row 데이터를 프리폼 copy
		doSearchManage();
	};
	
	/**
	 * @desc 교환프로그램 삭제
	 * @param 
	 * @return 
	 * @author Choi In Seong 2016. 6. 21
	 */
	moPage.onClick_BtnDel = function() {
		var voRpt = ExtControl.getControl("rptCsrExhPgm");
		vsSelIdx = voRpt.getSelectedRowPos("", "");
					
		if(vsSelIdx == ""){
			// 라인을 선택하세요.
			util.Msg.notify(app, "NLS.INF.M023");
			return false;
		}
			
		var vsUptStatus = util.Grid.getCellValue(app, "grdCsrExhPgm", "UPT_STATUS");
		if(vsUptStatus !="D"){
			doUsedCheck();
		}
	};
	
	/**
	 * @desc 교환프로그램 사용여부 체크
	 * @param 
	 * @return 
	 * @author Choi In Seong 2016. 6. 21
	 */
	function doUsedCheck() {
		var vsExhPgmCd = util.Grid.getCellValue(app, "grdCsrExhPgm", "EXH_PGM_CD");
		util.DataMap.setValue(app, "dmResUsedCheck", "strExhPgmCd", vsExhPgmCd);
		
		//strCommand: usedCheck 
		util.Submit.send(app, "subUsedCheck",  function(pbSuccess) {
			if(pbSuccess){
				var vnResult = util.DataMap.getValue(app, "dmResUsedCheck", "strUsedCheck");
				if (vnResult == "1") {
						// 사용중인 프로그램입니다. 삭제 할 수 없습니다.
						util.Msg.alert("NLS-CSR-M019");
						return;
					} else {
						// 사용중이 아니면 삭제하도록 세팅.
						util.Grid.deleteRow(app, "grdCsrExhPgm");
						if(util.Grid.getIndex(app, "grdCsrExhPgm")){
							util.Control.setEnable(app, true, "frfCsrExhPgm");
							doSearchManage();
						}else{
							util.Control.setEnable(app, false, "frfCsrExhPgm");
							util.Control.reset(app, "frfCsrExhPgm");
						}
					}
			}
		});
	};
	
	/**
	 * @desc 교환프로그램 작업취소
	 * @param 
	 * @return 
	 * @author Choi In Seong 2016. 6. 21
	 */
	moPage.onClick_BtnRestore = function() {
		util.Grid.restoreRow(app, "grdCsrExhPgm");
		if(util.Grid.getIndex(app, "grdCsrExhPgm")){
			util.Control.setEnable(app, true, "frfCsrExhPgm");
			doSearchManage();
		}else{
			util.Control.setEnable(app, false, "frfCsrExhPgm");
			util.Control.reset(app, "frfCsrExhPgm");
		}
	};
	
	/**
	 * @desc 교환프로그램 작업저장
	 * @param 
	 * @return 
	 * @author Choi In Seong 2016. 6. 21
	 */
	moPage.onClick_BtnSave = function() {
		
		// 리피터 변경사항 체크
		if(!util.Grid.isModified(app, ["grdCsrExhPgm"], "MSG")){
			return false;
		}
		
		if(!doCheckTerm()){
			return;
		}
		
		//리피트 validation check
		if(!util.validate(app, "grdCsrExhPgm")) return false;
		
		doSave();
	};
	
	/**
	 * @desc 교환프로그램 저장
	 * @param 
	 * @return 
	 * @author Choi In Seong 2016. 6. 21
	 */
	function doSave(poCallbackFunc) {

		//strCommand: save 
		util.Submit.send(app, "subSave", function(pbSuccessSave) {
				if(pbSuccessSave) {
					
					//저장성공 메세지 출력
					doList(function(pbSuccessList) {
						// 조회 : "조회되었습니다." header 메세지 표시
						if(pbSuccessList) {
							util.Msg.notify(app, "NLS.INF.M025");
						}
						if(util.isFunc(poCallbackFunc))	poCallbackFunc(pbSuccessList);
					});
				}
			}
		);
	}
	
	/**
	 * @desc 기간단위코드 체크
	 * @param 
	 * @return 
	 * @author Choi In Seong 2016. 6. 21
	 */
	function doCheckTerm() {
		var vnCnt = util.Grid.getRowCount(app, "grdCsrExhPgm");
	
		for (var i = 1; i <= vnCnt; i++) {
			var vsPgmMinTerm = util.Grid.getCellValue(app, "grdCsrExhPgm", "PGM_MIN_TERM", i );
			var vsPgmMaxTerm = util.Grid.getCellValue(app, "grdCsrExhPgm", "PGM_MAX_TERM", i );
			var vsTermUnitRcd = util.Grid.getCellValue(app, "grdCsrExhPgm", "TERM_UNIT_RCD", i );
			if ((vsPgmMinTerm != ""
			|| vsPgmMaxTerm != "")
			&& vsTermUnitRcd == "") {
				//프로그램 기간단위코드를 입력해주세요
				util.Msg.alert("NLS-CSR-M018");
				return false;
				break;
			}
	}
		return true;
	};
	
	/**
	 * @desc 교환프로그램 폐기
	 * @param 
	 * @return 
	 * @author Choi In Seong 2016. 6. 21
	 */
	moPage.onClick_BtnDisUseHistory = function() {
		var vnCnt = util.Grid.getRowCount(app, "grdCsrExhPgmHistory");
		
		// 9999레코드를  조회조건의 학기의 (시작일자 - 1초) 로 업데이트 = 해당학기까지 유효한 데이타
		var voMaxRow   = null;
		var vnMaxEndDt = null;
		for (var i = 1 ; i <= vnCnt ; i++) {
			var vsEndDt = util.Grid.getCellValue(app, "grdCsrExhPgmHistory", "END_DT", i);
			if (vsEndDt.substring(0, 8) == "99991231") {
				vnMaxEndDt = vsEndDt;
				voMaxRow = i;
				break;
			}
		}
		
		// 1. 종료일자가 99991231이 아닐때.
		if (voMaxRow == null) {
			// 폐기 가능한 데이터가 없습니다.
			util.Msg.alert("NLS-INF-M029");
			return;
		}
		
		// 99991231가 있는 로우의 시작일
		var vsStDt            = util.Grid.getCellValue(app, "grdCsrExhPgmHistory", "ST_DT", voMaxRow);
		var vsKeyDate   	  = util.DataMap.getValue(app, "dmReqList", "strKeyDateHistory");
		var vsBefKeyDate = moPage.getBefDate(vsKeyDate);
		
		if (vsStDt >= vsBefKeyDate) {
			// 폐기 가능한 데이터가 없습니다.
			util.Msg.alert("NLS-INF-M029");
			return;
		}
		
        var vsMsgCiiDate = vsBefKeyDate.substring(0, 4) + NLS.NSCR.YEAR + vsBefKeyDate.substring(4, 6) + NLS.NSCR.MONTH + vsBefKeyDate.substring(6, 8) + NLS.NSCR.DAY;
		if(util.Msg.confirm("NLS-CRM-M047", [vsMsgCiiDate]) ){
			// 전날자로 타겟로우의 종료일자 업데이트
			util.Grid.setCellValue(app, "grdCsrExhPgmHistory", "END_DT", vsBefKeyDate, voMaxRow);
            doSaveHistory();
        }
	};
	
	/**
	 * @desc 이력 저장
	 * @param 
	 * @return 
	 * @author Choi In Seong 2016. 6. 21
	 */
	function doSaveHistory(poCallbackFunc) {

		//strCommand: save 
		util.Submit.send(app, "subSaveHistory", function(pbSuccessSave) {
				if(pbSuccessSave) {
					
					//저장성공 메세지 출력
					doListHistory(function(pbSuccessList) {
						// 조회 : "조회되었습니다." header 메세지 표시
						if(pbSuccessList) {
							util.Msg.notify(app, "NLS.INF.M025");
						}
						if(util.isFunc(poCallbackFunc))	poCallbackFunc(pbSuccessList);
					});
				}
			}
		);
	};
	
	/**
	 * @desc 이전 일자 반환
	 * @param 
	 * @return 
	 * @author Choi In Seong 2016. 6. 21
	 */
	moPage.getBefDate = function(keyDate) {
		var y = keyDate.substring(0, 4);
		var m = keyDate.substring(4, 6);
		var d = keyDate.substring(6, 8);
		var befDt = new Date(y, m - 1, d - 1);
		
		var befDtYear  = befDt.getFullYear().toString();
		var befDtMonth = eval(befDt.getMonth() + 1).toString();
		var befDtDate  = befDt.getDate().toString();
		
		if (befDtMonth.length == 1) befDtMonth = "0" + befDtMonth;
		if (befDtDate.length == 1) befDtDate = "0" + befDtDate;
		
		var rtnBefDt = befDtYear + befDtMonth + befDtDate + "000000";
		
		return rtnBefDt;
	};
	
	/**
	 * @desc 교환프로그램 폐기취소
	 * @param 
	 * @return 
	 * @author Choi In Seong 2016. 6. 21
	 */
	moPage.onClick_BtnDisUseCancHistory = function() {
		var vnCnt = util.Grid.getRowCount(app, "grdCsrExhPgmHistory");
		
		var voMaxRow   = null;
		var vnMaxEndDt = null;
		
		for (var i = 1 ; i <= vnCnt ; i++) {
			var vsEndDt = util.Grid.getCellValue(app, "grdCsrExhPgmHistory", "END_DT", i);
			if (i == 0 || vnMaxEndDt < vsEndDt) {
				vnMaxEndDt = vsEndDt;
				voMaxRow   = i;
			}
		}
		
		if (vnMaxEndDt.substring(0, 8) == "99991231") {
			//폐기취소 가능한 데이터가 없습니다.
			util.Msg.alert("NLS-INF-M030");
			return;
		}
		
		if(util.Msg.confirm("NLS-CRM-M048") ){	
			util.Grid.setCellValue(app, "grdCsrExhPgmHistory", "END_DT", "99991231000000", voMaxRow);
            doSaveHistory();
        }
	}
	
	/**
	 * @desc 교환프로그램 복구
	 * @param 
	 * @return 
	 * @author Choi In Seong 2016. 6. 21
	 */
	moPage.onClick_BtnRecoverHistory = function() {
		
		var vnCnt = util.Grid.getRowCount(app, "grdCsrExhPgmHistory");
		
		// 요약: 가장 최근의 레코드를 카피하여 insert한다. (단, 기준일자가 최종일자보다 커야 한다.)
		
		var vnMaxEndDt  = null;
		var voMaxRow    = null;
		
		for (var i = 1 ; i <= vnCnt ; i++) {
			var vsEndDt = util.Grid.getCellValue(app, "grdCsrExhPgmHistory", "END_DT", i);
				
			if (i == 0 || vnMaxEndDt < vsEndDt) {
				vnMaxEndDt = vsEndDt;
				voMaxRow = i;
			}
		}
		
		// key date
		var vsHistoryKeyDate = util.DataMap.getValue(app, "dmReqList", "strKeyDateHistory");
		if (vnMaxEndDt >= vsHistoryKeyDate) {
			// 복구 가능한 DATA가 없습니다.
			util.Msg.alert("NLS-WRN-M128");
			return;
		}
		
        var vsCiiDate = vsHistoryKeyDate;
        var vsMsgCiiDate = vsCiiDate.substring(0, 4) + NLS.NSCR.YEAR + vsCiiDate.substring(4, 6) + NLS.NSCR.MONTH + vsCiiDate.substring(6, 8) + NLS.NSCR.DAY;
		
		if(util.Msg.confirm("NLS-CRM-M049", [vsMsgCiiDate]) ){
			var voNextRow = util.Grid.insertRow(app, "grdCsrExhPgmHistory");
			
			//선택된 행 복사
			ExtRepeat.copyToRowData("rptCsrExhPgmHistory", voMaxRow, "rptCsrExhPgmHistory", voNextRow);
		
			util.Grid.setCellValue(app, "grdCsrExhPgmHistory", "REF_KEY", "", voNextRow);
			util.Grid.setCellValue(app, "grdCsrExhPgmHistory", "ST_DT", vsHistoryKeyDate, voNextRow);
			util.Grid.setCellValue(app, "grdCsrExhPgmHistory", "END_DT", "99991231000000", voNextRow);
			util.Grid.setCellValue(app, "grdCsrExhPgmHistory", "UPT_STATUS", "N", voNextRow)
			doSaveHistory();
		}
	};

	/**
	 * @desc 교환프로그램 언어 신규
	 * @param 
	 * @return 
	 * @author Choi In Seong 2016. 6. 21
	 */
	moPage.onClick_BtnNewLang = function() {
		var strKeyDate = util.DataMap.getValue(app, "dmReqList", "strKeyDate");
		//해당 리피트 insertRow 후 편집 시작할 컬럼 지정
		util.Grid.insertRow(app, "grdCsrExhPgmLang");

		var vsRefKey   = util.DataMap.getValue(app, "dmReqSelRow", "strRefKey");
		var vsExhPgmCd = util.DataMap.getValue(app, "dmReqSelRow", "strExhPgmCd");
		
		util.Grid.setCellValue(app, "grdCsrExhPgmLang", "REF_KEY", vsRefKey);
		util.Grid.setCellValue(app, "grdCsrExhPgmLang", "EXH_PGM_CD", vsExhPgmCd);
	};
	
	/**
	 * @desc 교환프로그램 언어 삭제
	 * @param 
	 * @return 
	 * @author Choi In Seong 2016. 6. 21
	 */
	moPage.onClick_BtnDelLang = function() {
		var voRpt = ExtControl.getControl("rptCsrExhPgmLang");
		vsSelIdx = voRpt.getSelectedRowPos("", "");
					
		if(vsSelIdx == ""){
			// 라인을 선택하세요.
			util.Msg.notify(app, "NLS.INF.M023");
			return false;
		}
		
		var vsLanGbnMain = util.DataMap.getValue(app, "dmReqSelRow", "strLanGbn");
		var vsLanGbnCurr = util.Grid.getCellValue(app, "grdCsrExhPgmLang", "LAN_DIV_RCD");
		var vsUptStatus  = util.Grid.getCellValue(app, "grdCsrExhPgmLang", "UPT_STATUS");
		
		// 지우려고 하는 row가 main table에서 default LAN_GBN 과 동일하면 삭제할 수 없음
		// new를 지우려 하는 경우는 가능함
		if (vsLanGbnMain == vsLanGbnCurr && vsUptStatus != "N") {
			util.Msg.alert("NLS-WRN-M010");
			return;
		}
		
		util.Grid.deleteRow(app, "grdCsrExhPgmLang");
	};
	
	/**
	 * @desc 교환프로그램 언어 작업취소
	 * @param 
	 * @return 
	 * @author Choi In Seong 2016. 6. 21
	 */
	moPage.onClick_BtnRestoreLang = function() {
		util.Grid.restoreRow(app, "grdCsrExhPgmLang");
	};
	
	/**
	 * @desc 교환프로그램 언어 작업저장
	 * @param 
	 * @return 
	 * @author Choi In Seong 2016. 6. 21
	 */
	moPage.onClick_BtnSaveLang = function() {
				
		// 리피터 변경사항 체크
		if(!util.Grid.isModified(app, ["grdCsrExhPgmLang"], "MSG")){
			return false;
		}
		
		//리피트 validation check
		if(!util.validate(app, "grdCsrExhPgmLang")) return false;
		
		doSaveLang();
	};
	
	/**
	 * @desc 교환프로그램 언어 작업저장
	 * @param 
	 * @return 
	 * @author Choi In Seong 2016. 6. 21
	 */
	function doSaveLang(poCallbackFunc) {

		//strCommand: saveLang 
		util.Submit.send(app, "subSaveLang", function(pbSuccessSave) {
				if(pbSuccessSave) {
					
					//저장성공 메세지 출력
					doListLang(function(pbSuccessList) {
						// 조회 : "조회되었습니다." header 메세지 표시
						if(pbSuccessList) {
							util.Msg.notify(app, "NLS.INF.M025");
						}
						if(util.isFunc(poCallbackFunc))	poCallbackFunc(pbSuccessList);
					});
				}
			}
		);
	}
	
	/**
	 * @desc 교환프로그램 목록 선택
	 * @param 
	 * @return 
	 * @author Choi In Seong 2016. 6. 21
	 */
	moPage.onRowSelect_RptCsrExhPgm = function() {
		
		var vsTab = util.Tab.getSelectedId(app, "tabMain");
		// 선택된 현재 행 상태를 가져와 INSERT/UPDATE/DELETE가 아닐 경우만 탭 조회를 한다.
		var vsRowStatus = util.Grid.getRowState(app, "grdCsrExhPgm");
		var vsIndex = "";
		if(vsTab=="tabExhPgmMng"){
			vsIndex =TAB.EXH_PGM_MNG;
		}else if(vsTab=="tabExhPgmHis"){
			vsIndex =TAB.EXH_PGM_HIS;
		}else if(vsTab=="tabExhPgmLang"){
			vsIndex =TAB.EXH_PGM_LANG;
		}
		doTabChange(vsIndex);
	};
	
	
	
	moPage.onUpdate_FrfCsrExhPgm = function() {
//TO-BE: <ExtFreeForm.updateToRpt> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtFreeForm.updateToRpt("rptCsrExhPgm","frfCsrExhPgm");
	};
	return moPage;
};

