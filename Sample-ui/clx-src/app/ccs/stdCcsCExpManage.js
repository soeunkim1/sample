//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./stdCcsCExpManage.xtm"/>

/**
 * 개설과목관리
 * @class stdCcsCCurClsFrf
 * @author 박갑수 at 2016. 2. 4
 */
var stdCcsCExpManage = function() {
	var moPage = new Page();
	
	// 임포트용 데이터 통신 오브젝트
	var moPObject = new Page();
	

	
	// 개설과목검색팝업 호출
	moIdsForStdCcsPOpenSubPopup = [
	{ 
		 controlId					: "btnFrfSbCd",			
		 iDivClsYn					: "Y",		
		 iLanDivRcd				: "/root/resOnLoad/strLanDivRcd",
		 iKeyDate             		: "/root/keyDateMap/ST_DT",
		 iSchYearRcd             : "cbbSchYearRcd",
		 iSmtRcd             		: "cbbSmtRcd",
		 iSaCd        				: "",			
		 iSaNm        				: "ipbFrfSbNm",		
		 iSaObjDivRcd       		: "",		
		 iSbCd        				: "",			
		 iSbNm        				: "",		
		 iCmpDivRcd        		: "",			
		 
		 oSpCd						: "",			
		 oSpNm					: "",			
		 oSbCd						: "",			
		 oSbNm					: "ipbFrfSbNm",			
		 oSaCd						: "",			
		 oSaNm					: "",			
		 oCuCd						: "",		
		 oCuNm					: "",		
		 oSchYearRcd			: "",		
		 oSmtRcd					: "",	
		 oDivclsCd					: "",	
		 oDivclsNm				: "",	
		 oCmpDivRcd				: "",		
		 oPnt							: "",		
		 oTheoTc					: "",	
		 oEpacTc					: "",	
		 oSbDivRcd				: "",		
		 oSbTypeRcd				: "",		
		 oSaPostDivRcd			: "",		
		 oProfNo					: "",	
		 oProfNm					: "",			
		 oLectRoomNm			: "",		
		 oRefKey					: "",		
		 func : function(poParam) { 
		
		 }
	 }];
	
	
	
	// 학년도 학기를 원래데이터로 되돌리기위한 변수
	var msSchYearRcd = "";
	var msSmtRcd = "";
	
	/**
	 * @desc import 헤더 초기화
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 2. 4
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		// import 헤더 초기화
		doHeaderOnLoad();
	};
	
	/**
	 * @desc onLoad 실행
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 4
	 */
	moPage.onModelConstructDone_StdCcsCOpenSubFrf = function() {
		// 리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["rptCcsOpenSub"]);
		// 검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grpData"]);
		
		// 서브미션 호출
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				
				util.Control.redraw(app, ["cbbFrfCmpDivRcd"]);
				util.Control.redraw(app, ["cbbSchYearRcd", "cbbSmtRcd"]);
				util.Control.setEnable(app, true, ["grpData1"]);
				
				
				util.Control.setValue(app, "radDivRcd", "3");
				
				util.DataMap.setValue(app, "dmRow", "KeyDate", util.DataMap.getValue(app, "dmKeyDateMap", "ST_DT"));
				
				
				
				util.DataMap.setValue(app, "dmRow", "strSchDiv", "CNT");
				util.Control.redraw(app, "radSchDiv");
				page.onValueChanged_Radiobutton5();
				
				
				/*
					이수구분, 교과목명 컨트롤을 활성/비활성 처리한다.
				*/
				page.onValueChanged_Radiobutton34();
				
			}
		}, true);
	};
	
	
	
	/**
	 * @desc [cbbSchYearRcd]학년도 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 4
	 */
	moPage.onValueChanged_CbbSchYearRcd = function() {
		// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
		doChangeYearSmt("year");
	};
	
	/**
	 * @desc [cbbSmtRcd]학기 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 4
	 */
	moPage.onValueChanged_CbbSmtRcd = function() {
		// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
		doChangeYearSmt("smt");
	};
	
	/**
	 * @desc 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 5
	 */
	function doChangeYearSmt(psDiv) {
		//strCommand: date 
		util.Submit.send(app, "subDate", function(pbSuccess){
			if(pbSuccess){
				
				msSchYearRcd = util.DataMap.getValue(app, "dmKeyDateMap", "YEAR");
				msSmtRcd = util.DataMap.getValue(app, "dmKeyDateMap", "SMT");
				util.DataMap.setValue(app, "dmRow", "KeyDate", util.DataMap.getValue(app, "dmKeyDateMap", "ST_DT"));
				
			// Exception 발생시
			}else {
				if(psDiv == "year"){
					util.Control.setValue(app, "cbbSchYearRcd", msSchYearRcd);
				}else if(psDiv == "smt"){
					util.Control.setValue(app, "cbbSmtRcd", msSmtRcd);
				}
			}
		});
	};
	
	
	
	
	
	/**
	 * @desc [btnSearch]조회 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 11
	 */
	moPage.onClick_BtnSearch = function() {
		 // 작업영역 리피트 변경 내역 체크
		if(util.Grid.isModified(app, "", "CRM")){
			return false;
		}
		
		// 조회조건 필수 체크
		if(!util.validate(app, ["cbbSchYearRcd", "cbbSmtRcd"])){
			return false;
		}
		
		
		var vsRadDiv = util.DataMap.getValue(app, "dmRow", "strDiv");
		if(vsRadDiv == 1 ){
			//모든 값이 널인경우 체크
			if (page.doCheckAllNullConditionCtl()) {
				return false;
			}
				
		}else if(vsRadDiv == 2 ){
			var vsSbNm     = util.DataMap.getValue(app, "dmRow", "strSbNm");
			var vsDivClsCd = util.DataMap.getValue(app, "dmRow", "strDivclsCd");
			if(vsSbNm == ""){
				
				util.Msg.alert("NLS-CCS-M048");
				return false;
			}
		}else{
			//--조건 없이 인원수만 체크한다.
		}
		
		var vsSchDiv = util.DataMap.getValue(app, "dmRow", "strSchDiv");
		
		if(vsSchDiv == 'CNT'){
			//--폐강 기준(수강정원)
			var vsValue = util.DataMap.getValue(app, "dmRow", "strNumber");
			if (vsValue == null || vsValue == "") {
				util.Msg.alert("NLS-CCS-M049");
				return  false;
			}
			
			//--단위
			var vsValue = util.DataMap.getValue(app, "dmRow", "strPercentOrCnt");
			if (vsValue == null || vsValue == "") {
				util.Msg.alert("NLS-CCS-M050");
				return  false;
			}
		}else if(vsSchDiv == 'SB_NM'){
			var vsSbNm     = util.DataMap.getValue(app, "dmRow", "strSbNm");
			if(vsSbNm == ""){
				
				util.Msg.alert("NLS-CCS-M048");
				return false;
			}
		}else{
			
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
	 * @desc 개설과목목록 조회
	 * @param poCallBackFunc 콜백정의
	 * @return void
	 * @author 박갑수 at 2016. 2. 11
	 */
	function doList(poCallBackFunc) {				
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				
				//ExtInstance.setValue("/root/reqKey/strExpYn", "");
				
				ExtTreeView.rebuild(["rptCcsOpenSub"]);
									
				// 조회 후 콜백함수 수행
				if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
			}
		});
	};
	
	
	/**
	 * @desc 조회 시 구분에 따라 null 체크를 한다.
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 11
	 */
	function doCheckAllNullConditionCtl() {
		
		
		var voCtls = ["cbbFrfCmpDivRcd"];
		
		var resultFlag = true;
		var vnArgc = voCtls.length;
		for (var i = 0; i < vnArgc; i++) {
			
			var voCtl = util.Control.getValue(app, voCtls[i]);
			
			
			if(voCtl != "") {
				resultFlag = false;
				return resultFlag;
			}
		}
		if(resultFlag == true) {			
			util.Msg.alert("NLS-CCS-M051");
			return resultFlag;
		}
	};	
	
	
	
	/**
	 * @desc [btnRestore]작업취소 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 11
	 */
	moPage.onClick_BtnRestore = function() {
		// 작업취소
		util.Grid.restoreRow(app, "grdCcsOpenSub");		
		
		// 취소내용 프리폼 반영
//TO-BE: <ExtRepeat.copyRowForm> 그리드-프리폼인 경우에는 selection바인딩으로 처리하기 때문에 불필요함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.copyRowForm("rptCcsOpenSub");
	};
	
	
	
	
	
	/**
	 * @desc [btnSave]작업저장 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 11
	 */
	moPage.onClick_BtnSave = function() {
		// 작업저장
		doSave();
	};
	
	
	
	
	/**
	 * @desc 개설과목목록 변경사항 저장
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 11
	 */
	function doSave() {
		
		// 리피트 변경사항 체크
		if(!util.Grid.isModified(app, ["grdCcsOpenSub"], "MSG")){
			return false;
		}
		
			
		//처리하시겠습니까?
		if(!util.Msg.confirm("NLS-CRM-M008") ) {		
			return false;
		}
		
		// 리피트 Validation Check
		if(!util.validate(app, "grdCcsOpenSub")) return false;

		//strCommand: save 
		util.Submit.send(app, "subSave", function(pbSuccess){
			if(pbSuccess){
			
				doList(function(pbListSuccess) {
					// 조회 : "갱신된 데이터가 조회되었습니다." header 메세지 표시
					if (pbListSuccess) util.Msg.notify(app, "NLS.INF.M025");
				});
			}
		});
	};
	
	
	
	/**
	 * @desc 개설과목 검핵팝업 onValueChanged
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 11
	 */
	moPage.onValueChanged_IpbFrfSbNm = function(sender) {
		// 값변경시 교과과정검색팝업 호출
		doOnChangeStdCcsPOpenSubPopup(sender);
	}
	
	
	/**
	 * @desc 개설과목 검색팝업 버튼
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 11
	 */
	moPage.onClick_BtnFrfSbCd = function(sender) {
		// 교과과정검색팝업 호출
		doOnClickStdCcsPOpenSubPopup(sender);
	}
	
	
	
	/**
	 * @desc 이수구분으로 검색, 교과목명으로 검색 할 것인지 활성/비활성 처리한다.
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 11
	 */
	
	moPage.onValueChanged_Radiobutton34 = function() {
		
		var vsSchDiv 			= 	util.DataMap.getValue(app, "dmRow", "strDiv");
		
		
		var vaCmpDivRcd	= ["cbbFrfCmpDivRcd"];
		var vaSbCtl			= ["ipbFrfSbNm","btnFrfSbCd","ipbFrfDivclsNm"];
		
		if(vsSchDiv == '1'){
			util.Control.setEnable(app, true, vaCmpDivRcd);
			util.Control.setEnable(app, false, vaSbCtl);
			util.DataMap.setValue(app, "dmReqKey", "strSbNm", "");
			util.DataMap.setValue(app, "dmReqKey", "strDivclsCd", "");
			//ExtControl.refresh(vaSbCtl);
			
			
		}else{
			util.Control.setEnable(app, false, vaCmpDivRcd);
			util.Control.setEnable(app, true, vaSbCtl);
			util.DataMap.setValue(app, "dmReqKey", "strCmpDivRcd", "");
			
			//ExtControl.refresh(vaCmpDivRcd);
		}
		
	};
	
	/*
		과목명 및 인원수 검색
	*/
	moPage.onValueChanged_Radiobutton5 = function() {
		
		var vsSchDiv 	= util.DataMap.getValue(app, "dmRow", "strSchDiv");
		util.Control.setVisible(app, false, ['lblTlsnCnt','ipbFrfSaCdNm','lblUnit','cbbFrfUnit','lblSbNm','ipbSbNm', 'label2']);
		
		if(vsSchDiv == "CNT"){
			util.Control.setVisible(app, true, ['lblTlsnCnt','ipbFrfSaCdNm','lblUnit','cbbFrfUnit']);
			util.DataMap.setValue(app, "dmRow", "strSbNm", "");
			util.Control.redraw(app, ['ipbFrfSaCdNm','cbbFrfUnit']);
		}else if(vsSchDiv == 'SB_NM'){
		
			util.Control.setVisible(app, true, ['lblSbNm','ipbSbNm']);
			
			util.DataMap.setValue(app, "dmRow", "strPercentOrCnt", "");
			util.DataMap.setValue(app, "dmRow", "strNumber", "");
			util.Control.redraw(app, ['ipbSbNm']);
			
			util.Control.setFocus(app, "ipbSbNm");
			
		}else{
			util.Control.setVisible(app, true, ['label2']);
			
			util.DataMap.setValue(app, "dmRow", "strPercentOrCnt", "");
			util.DataMap.setValue(app, "dmRow", "strNumber", "");
			util.DataMap.setValue(app, "dmRow", "strSbNm", "");
			util.Control.redraw(app, ['ipbSbNm']);
			util.Control.redraw(app, ['ipbFrfSaCdNm','cbbFrfUnit']);
			
		}
		
	};
	
	
	/**
	 * @desc [ipbSbNm]과목명 onKeyDown 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 27
	 */
	moPage.onKeyDown_IpbSbNm = function(strKeyType, strKeyStatus) {
		// 엔터키 입력시 조회
		if(e.keyCode == cpr.events.KeyCode.ENTER){
			util.Header.clickSearch(app);
		}
	};
	
	
	
	
	
	moPage.onValueChanged_Checkbox2 = function() {
		
		
		var vsExpYn	= util.Control.getValue(app, "ckbExpYn");
		if(vsExpYn == "")return false;
		
		var vnRowCnt = util.Grid.getRowCount(app, "grdCcsOpenSub");
		
		for(var i =1 ; i<=vnRowCnt ; i++){
			
			var vsRptExpYn = util.Grid.getCellValue(app, "grdCcsOpenSub", "EXP_YN", i);
			if(vsRptExpYn == ""){
				util.Grid.setCellValue(app, "grdCcsOpenSub", "EXP_YN","Y", i);
				util.Grid.setCellValue(app, "grdCcsOpenSub", "UPT_STATUS","U", i);
				
			}
			
		}
		
		
	};
	
	
	
	
	
	
	return moPage;
};
