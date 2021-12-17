//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCcsCAttend.xtm"/>

/**
 * 출결관리
 * @class extCcsCAttend
 * @author 박갑수 at 2016. 5. 2
 */
var extCcsCAttend = function() {
	var moPage = new Page();
	
	var moPObject = new PObject();
	
	// 교직원검색팝업 호출
	moPObject.moIdsForStdCmnPPrsnSearch = [
	{ 
		 controlId					: "btnProfNm",
		 istrStaffGrpAuth			: "",					
		 istrWkdtyAuth			: "true",
		 iKeyDate					: "/root/keyDateMap/END_DT",
		 iStaffNo					: "ipbProfNm",				
		 iStaffGrpRcd				: "",	
		 iStaffGrpRcdLock		: "", 				
		 iStaffSubGrpRcd		: "",				
		 iStaffSubGrpRcdLock	: "",		
		 iStatusRcd				: "",		
		 iRepNm					: "",		
		 iObjDivRcd				: "",			
		 iObjCd						: "",			
		 iObjNm					: "",		
		 istrObjCdInList			: "",		
		 iWkgrdRcd				: "",			
		  
		 oObjNo					: "/root/reqKey/strProfObjNo",		
		 oStaffNo					: "",				
		 oRepNm					: "ipbProfNm",			
		 oBirthday					: "",			
		 oStatNm					: "",		
		 oStatRcd					: "",			
		 oOgNm					: "",			
		 oOgCd						: "",				
		 oPosNm					: "",				
		 oPosCd					: "",				
		 oWkgrdNm				: "",			
		 oWkgrdRcd				: "",			
		 oStaffGrpRcd				: "",				
		 oStaffSubGrpRcd		: "",			
		 oHoRcd					: "",				
		 oSsn						: "",					
		 oWkdtyRcd				: "",				
		 oWkdtyNm				: "",	
		 func                         : function(poParam){
			// 담당교과목목록 조회
			doChargeSbList();
		}
	}];
	
	// 개설과목검색팝업 호출
	moIdsForStdCcsPOpenSubPopup = [
	{
		 controlId					: "btnSbNm",			
		 iDivClsYn					: "Y",		
		 iLanDivRcd				: "/root/resOnLoad/strLanDivRcd",
		 iKeyDate             		: "/root/keyDateMap/ST_DT",
		 iSchYearRcd             : "cbbSchYearRcd",
		 iSmtRcd             		: "cbbSmtRcd",
		 iSaCd        				: "",			
		 iSaNm        				: "",		
		 iSaObjDivRcd       		: "",		
		 iSbCd        				: "",			
		 iSbNm        				: "ipbSbNm",		
		 iCmpDivRcd        		: "",			
		 
		 oSpCd						: "",			
		 oSpNm					: "",			
		 oSbCd						: "",			
		 oSbNm					: "ipbSbNm",			
		 oSaCd						: "",			
		 oSaNm					: "",			
		 oCuCd						: "",		
		 oCuNm					: "",		
		 oSchYearRcd			: "",		
		 oSmtRcd					: "",	
		 oDivclsCd					: "",	
		 oDivclsNm				: "",	
		 oCmpDivRcd				: "",		
		 oPnt							: "/root/reqKey/strPnt",		
		 oTheoTc					: "/root/reqKey/strTheoTc",	
		 oEpacTc					: "/root/reqKey/strEpacTc",	
		 oSbDivRcd				: "",		
		 oSbTypeRcd				: "",		
		 oSaPostDivRcd			: "",		
		 oProfNo					: "",	
		 oProfNm					: "",			
		 oLectRoomNm			: "",		
		 oRefKey					: "/root/reqKey/strRefKey",
		 oSbLvlRcd				: "",
		 oLectTimeCnt			: "/root/reqKey/strLectTimeCnt",
		 func : function(poParam) {
			// 검색조건이 있을경우 조회
			var vsSchYearRcd = util.Control.getValue(app, "cbbSchYearRcd");
			var vsSmtRcd = util.Control.getValue(app, "cbbSmtRcd");
			var vsRefKey = util.DataMap.getValue(app, "dmReqKey", "strRefKey");
			if(!ValueUtil.isNull(vsSchYearRcd) && !ValueUtil.isNull(vsSmtRcd) && !ValueUtil.isNull(vsRefKey)){
				util.Header.clickSearch(app);
			}
		 }
	}];
	
	// 학년도 학기를 원래데이터로 되돌리기위한 변수
	var msSchYearRcd = "";
	var msSmtRcd = "";
	
	/**
	 * @desc import 헤더 초기화
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 5. 2
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		// import 헤더 초기화
		doHeaderOnLoad();
	};
	
	/**
	 * @desc onLoad 실행
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 2
	 */
	moPage.onModelConstructDone_ExtCcsCAttend = function() {
		// 리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["rptCcsTimeDay", "rptExtCcsAttend"]);
		// 검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grpData", "grpDataDtl"]);
		
		// 권한에따른 교수명 컬럼 검색가능 여부
		doVisibleCtlByAuth();
		
		// 서브미션 호출
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				
				util.Control.redraw(app, ["cbbSchYearRcd", "cbbSmtRcd", "cbbPrtOrd"]);
				
				// 라디오버튼 교수명으로 default값 세팅
				util.Control.setValue(app, "rdbProfOrSb", "PROF");
				
				// 출력순서 학번으로 default값 세팅
				util.SelectCtl.selectItem(app, "cbbPrtOrd", 0);
				
				// 학년도 학기값 되돌리기위한 값
				msSchYearRcd = util.DataMap.getValue(app, "dmKeyDateMap", "YEAR");
				msSmtRcd = util.DataMap.getValue(app, "dmKeyDateMap", "SMT");
				
				// 개인권한[CC00104]일경우 담당교과목 조회
				if(moPageInfo.authRngRcd == "CC00104"){
					// 담당교과목목록 조회
					doChargeSbList();
				}
			}
		}, true);
	};
	
	/**
	 * 권한에 따른 교수명 활성/비활성 처리
	 * @param 
	 * @type void
	 * @author 박갑수 at 2016. 5. 2
	 */	
	function doVisibleCtlByAuth() {
		
		// 개인권한[CC00104] : 
		if (moPageInfo.authRngRcd == "CC00104") {
			util.Control.setVisible(app, false, ["btnProfNm", "lblSbNm", "ipbSbNm", "btnSbNm"]);
			util.Control.setEnable(app, false, ["rdbProfOrSb", "cbbSchYearRcd", "ipbProfNm"]);
						
			util.Control.setValue(app, "ipbProfNm", moUserInfo.userNm);
			util.DataMap.setValue(app, "dmReqKey", "strProfObjNo", moUserInfo.id);
			util.Control.setStyleAttr(app, "ipbProfNm", "width", "120");
		}
	};
	
	/**
	 * @desc 담당교과목목록 조회
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 5. 2
	 */
	function doChargeSbList() {
		//strCommand: chargeSbList 
		util.Submit.send(app, "subChargeSbList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "cbbSbCd");
				util.SelectCtl.selectItem(app, "cbbSbCd", 0);
			}
		});
	};
	
	/**
	 * @desc [cbbSchYearRcd]학년도 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 2
	 */
	moPage.onValueChanged_CbbSchYearRcd = function() {
		// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
		doChangeYearSmt("year");
				
	};
	
	/**
	 * @desc [cbbSmtRcd]학기 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 2
	 */
	moPage.onValueChanged_CbbSmtRcd = function() {
		// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
		doChangeYearSmt("smt");
				
	};
	
	/**
	 * @desc 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 2
	 */
	function doChangeYearSmt(psDiv) {
		
		//--전체 권한이 아닐경우.
		if (moPageInfo.authRngRcd != "CC00102") {
			
			/*
				수업의 학년도 학기 설정에서
				1학기이면 1학기, 여름학기만 선택 할 수 있고,
				2학기이면 2학기, 동계학기만 선택 할 수 있다.
			*/
			var vsSmtRcdOrg 	= util.DataMap.getValue(app, "dmResOnLoad", "strSmtRcdOrg");
			var vsSmtRcd		= util.DataMap.getValue(app, "dmKeyDateMap", "SMT");
			if('CA00390' == vsSmtRcdOrg||'CA00391' == vsSmtRcdOrg){			
				if('CA00390' != vsSmtRcd && 'CA00391' != vsSmtRcd){
					var vsSmtNm1 = ExtInstance.getValue("/root/resOnLoad/smtRcdList/row", "CD_NM", "child::CD = 'CA00390'");
					var vsSmtNm2 = ExtInstance.getValue("/root/resOnLoad/smtRcdList/row", "CD_NM", "child::CD = 'CA00391'");
					//alert("(1학기, 하계계절)만 선택 할 수 있습니다.");
					util.Msg.alert("NLS-CCS-M089", [vsSmtNm1, vsSmtNm2]);
					util.Control.setValue(app, "cbbSmtRcd", msSmtRcd);
					return false;
				}			
			}else if('CA00392' == vsSmtRcdOrg||'CA00393' == vsSmtRcdOrg){			
				if('CA00392' != vsSmtRcd && 'CA00393' != vsSmtRcd){
					var vsSmtNm1 = ExtInstance.getValue("/root/resOnLoad/smtRcdList/row", "CD_NM", "child::CD = 'CA00392'");
					var vsSmtNm2 = ExtInstance.getValue("/root/resOnLoad/smtRcdList/row", "CD_NM", "child::CD = 'CA00393'");
					//alert("(2학기, 동계계절)만 선택 할 수 있습니다.");
					util.Msg.alert("NLS-CCS-M089", [vsSmtNm1, vsSmtNm2]);
					util.Control.setValue(app, "cbbSmtRcd", msSmtRcd);
					return false;
				}			
			}else{
				//--시스템 내부 장애가 발생하였습니다.\n 정보전산원에 문의 하시기 바랍니다.
				util.Msg.alert("NLS-ERR-SRV");
			}
		}
		
		
		
		
		
		
		
		
		//strCommand: date 
		util.Submit.send(app, "subDate", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, ["dipKeyDate"]);
				
				msSchYearRcd = util.DataMap.getValue(app, "dmKeyDateMap", "YEAR");
				msSmtRcd = util.DataMap.getValue(app, "dmKeyDateMap", "SMT");
				
				// 조회조건(교수명, 개설과목 담당교과목)항목초기화
				doClearSchCtl();
				
			// Exception 발생시
			}else {
				if(psDiv == "year"){
					util.Control.setValue(app, "cbbSchYearRcd", msSchYearRcd);
				}else if(psDiv == "smt"){
					util.Control.setValue(app, "cbbSmtRcd", msSmtRcd);
				}
			}
		});
		
		return true;
	};
	
	/**
	 * @desc 조회조건(교수명, 개설과목 담당교과목)항목초기화
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 2
	 */
	function doClearSchCtl() {
		if (moPageInfo.authRngRcd == "CC00104") {
			// 담당교과목목록 조회
			doChargeSbList();
		}else{
			// 교수명
			util.Control.setValue(app, "ipbProfNm", "");
			util.DataMap.setValue(app, "dmReqKey", "strProfObjNo", "");
			// 개설과목
			util.Control.setValue(app, "ipbSbNm", "");
			util.DataMap.setValue(app, "dmReqKey", "strRefKey");
			// 담당교과목
			util.Control.setValue(app, "cbbSbCd", "");
			ExtSelectCtl.deleteAllItem("cbbSbCd");
		}
		
	};
	
	/**
	 * @desc [btnProfNm]교수명(돋보기버튼) onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 2
	 */
	moPage.onClick_BtnProfNm = function(sender) {
		// 교직원검색팝업 호출
		doOnClickStdCmnPPrsnSearch(sender);
	};
	
	
	/**
	 * @desc [ipbProfNm]교수명 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 2
	 */
	moPage.onValueChanged_IpbProfNm = function(sender) {
		// 리피트 변경사항 체크
		if(util.Grid.isModified(app, ["grdExtCcsAttend"])){
			return false;
		}
		
		if(moPageInfo.authRngRcd == "CC00104"){
			return false;
		}
		
		// 값변경시 교직원검색팝업 호출
		doOnChangeStdCmnPPrsnSearch(sender);
	};
	
	/**
	 * @desc [btnSbNm]개설과목(돋보기버튼) onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 2
	 */
	moPage.onClick_BtnSbNm = function(sender) {
		// 개설과목검색팝업 호출
		doOnClickStdCcsPOpenSubPopup(sender);
	};
	
	/**
	 * @desc [ipbSbNm]개설과목 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 2
	 */
	moPage.onValueChanged_IpbSbNm = function(sender) {
		// 리피트 변경사항 체크
		if(util.Grid.isModified(app, ["grdExtCcsAttend"])){
			return false;
		}
		
		if(moPageInfo.authRngRcd == "CC00104"){
			return false;
		}
		
		// 값변경시 교직원검색팝업 호출
		doOnChangeStdCcsPOpenSubPopup(sender);
	};
	
	/**
	 * @desc [rdbProfOrSb]교수or교과목 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 2
	 */
	moPage.onValueChanged_RdbProfOrSb = function() {
		var vsProfOrSb = util.Control.getValue(app, "rdbProfOrSb");

		// 교과목일경우
		if(ValueUtil.fixNull(vsProfOrSb) == "SB"){
			util.Control.setVisible(app, true, ["lblSbNm", "ipbSbNm", "btnSbNm"]);
			util.Control.setVisible(app, false, ["lblProfNm", "ipbProfNm", "btnProfNm", "lblSbCd", "cbbSbCd"]);
			
			util.Control.setStyleAttr(app, "lblPrtOrd", "left", "685");
			util.Control.setStyleAttr(app, "cbbPrtOrd", "left", "760");
		// 교수일경우
		}else {
			util.Control.setVisible(app, false, ["lblSbNm", "ipbSbNm", "btnSbNm"]);
			util.Control.setVisible(app, true, ["lblProfNm", "ipbProfNm", "btnProfNm", "lblSbCd", "cbbSbCd"]);
			
			util.Control.setStyleAttr(app, "lblPrtOrd", "left", "995");
			util.Control.setStyleAttr(app, "cbbPrtOrd", "left", "1070");
		}
		
		// 조회조건(교수명, 개설과목 담당교과목)항목초기화
		doClearSchCtl();
	};
	
	/**
	 * @desc [btnSearch]조회 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 2
	 */
	moPage.onClick_BtnSearch = function() {
		 // 작업영역 리피트 변경 내역 체크
		if(util.Grid.isModified(app, "", "CRM")){
			return false;
		}
		
		// 교수명or교과목
		var vsProfOrSb = util.Control.getValue(app, "rdbProfOrSb");
		
		// 교과목일경우
		if(ValueUtil.fixNull(vsProfOrSb) == "SB"){
			// 조회조건 필수 체크
			if(!util.validate(app, ["cbbSchYearRcd", "cbbSmtRcd", "ipbSbNm"])){
				return false;
			}
						
		// 교수일경우
		}else {
			// 조회조건 필수 체크
			if(!util.validate(app, ["cbbSchYearRcd", "cbbSmtRcd", "ipbProfNm", "cbbSbCd"])){
				return false;
			}
		}
		
		// 조회
		doList(function(pbSuccess) {
			// 조회 : "조회되었습니다." header 메세지 표시
			if (pbSuccess) util.Msg.notify(app, "NLS.INF.M024");
		}, true);
	};
	
	/**
	 * @desc 수업일 조회
	 * @param poCallBackFunc 콜백정의
	 * @return void
	 * @author 박갑수 at 2016. 5. 2
	 */
	function doList(poCallBackFunc, pbBtnSearch) {
		// 디테일 리피트 변경시 변경내역 체크 방지
		util.Control.redraw(app, "grdExtCcsAttend");
		
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				
				// 출결석점수 여부에따른 디테일활성화여부
				var vsAttendInputCnt = util.DataMap.getValue(app, "dmResList", "strAttendInputCnt");
				if(0 < Number(vsAttendInputCnt)){
					util.Control.setVisible(app, true, ["lblComment"]);
					util.Control.setEnable(app, false, ["btnSave"]);
					util.Control.setReadOnly(app, true, ["rptExtCcsAttend"]);
				}else {
					util.Control.setVisible(app, false, ["lblComment"]);
					util.Control.setEnable(app, true, ["btnSave"]);
					util.Control.setReadOnly(app, false, ["rptExtCcsAttend"]);
				}
				
				// 담당교과목 or 개설과목에따른 학점, 이론+실습, 강의시수 세팅
				doSetOptValue();
				
				var vsPkValue = util.DataMap.getValue(app, "dmResList", "strPkValue");
				
				if(!ValueUtil.isNull(vsPkValue) && pbBtnSearch){
					ExtRepeat.setPkValues("rptCcsTimeDay", vsPkValue);
					util.Control.redraw(app, "grdCcsTimeDay");
				}else {
					util.Control.redraw(app, "grdCcsTimeDay");
				}
								
				// 마스터에 데이터가 없을 경우 디테일 입력 불가
				if(util.Grid.getRowCount(app, "grdCcsTimeDay") < 1){
					util.Control.setEnable(app, false,["grpDataDtl"]);
					util.Control.reset(app, "rptExtCcsAttend");
				}else{
					// 각 컨트롤 활성화 제어
					doDtlRptStatus();
				}
			}
			
			// 조회 후 콜백함수 수행
			if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
		});
	};
	
	/**
	 * @desc 디테일 데이터의 변경내역이 존재여부에 따른 마스터 활성/비활성
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 2
	 */
	function doDtlRptStatus(){
		if(util.Grid.isModified(app, "grdExtCcsAttend")){
			util.Control.setEnable(app, false, ["grpData"]);
		}else{
			util.Control.setEnable(app, true, ["grpData"]);
		}
	};
	
	/**
	 * @desc 출석부 조회
	 * @param poCallBackFunc 콜백정의
	 * @return void
	 * @author 박갑수 at 2016. 5. 2
	 */
	function doSetOptValue() {
		var vsRefKey = util.Control.getValue(app, "cbbSbCd");
		// 담당교과목 값이 없을경우 개설과목의 리턴값
		if(ValueUtil.isNull(vsRefKey)){
			
			// 학점
			var vsPnt = util.DataMap.getValue(app, "dmReqKey", "strPnt");
			if(ValueUtil.isNull(vsPnt)){
				vsPnt = "0";
			}
			
			// 이론
			var vsTheoTc = util.DataMap.getValue(app, "dmReqKey", "strTheoTc");
			if(ValueUtil.isNull(vsTheoTc)){
				vsTheoTc = "0";
			}
			
			// 실숩
			var vsEpacTc = util.DataMap.getValue(app, "dmReqKey", "strEpacTc");
			if(ValueUtil.isNull(vsEpacTc)){
				vsEpacTc = "0";
			}
			
			// 이론+실습
			var vnTheoTcEpacTc = Number(vsTheoTc) + Number(vsEpacTc);
			
			// 강의시수
			var vsLectTimeCnt = util.DataMap.getValue(app, "dmReqKey", "strLectTimeCnt");
			if(ValueUtil.isNull(vsLectTimeCnt)){
				vsLectTimeCnt = "0";
			}
			
			util.Control.setValue(app, "optPnt", vsPnt);
			util.Control.setValue(app, "optTheoTcEpacTc", vnTheoTcEpacTc);
			// ExtControl.setValue("optLectTimeCnt", vsLectTimeCnt);
			
		// 담당교과목 값이 있을경우 담당과목의 값 세팅
		}else {
			
			// 학점
			var vsPnt = ExtInstance.getValue("/root/resList/chargeSbList/row", "PNT" , "child::REF_KEY='"+vsRefKey+"'");
			if(ValueUtil.isNull(vsPnt)){
				vsPnt = "0";
			}
			
			// 이론
			var vsTheoTc = ExtInstance.getValue("/root/resList/chargeSbList/row", "THEO_TC" , "child::REF_KEY='"+vsRefKey+"'");
			if(ValueUtil.isNull(vsTheoTc)){
				vsTheoTc = "0";
			}
			
			// 실숩
			var vsEpacTc = ExtInstance.getValue("/root/resList/chargeSbList/row", "EPAC_TC" , "child::REF_KEY='"+vsRefKey+"'");
			if(ValueUtil.isNull(vsEpacTc)){
				vsEpacTc = "0";
			}
			
			// 이론+실습
			var vnTheoTcEpacTc = Number(vsTheoTc) + Number(vsEpacTc);
			
			// 강의시수
			var vsLectTimeCnt = ExtInstance.getValue("/root/resList/chargeSbList/row", "LECT_TIME_CNT" , "child::REF_KEY='"+vsRefKey+"'");
			if(ValueUtil.isNull(vsLectTimeCnt)){
				vsLectTimeCnt = "0";
			}
			
			util.Control.setValue(app, "optPnt", vsPnt);
			
			
		
		
			util.Control.setValue(app, "optTheoTcEpacTc", vnTheoTcEpacTc);
			// ExtControl.setValue("optLectTimeCnt", vsLectTimeCnt);
		}
	};
	
	/**
	 * @desc [rptCcsTimeDay]수업일 onRowSelect 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 2
	 */
	moPage.onRowSelect_RptCcsTimeDay = function() {		
		// 출석부 조회
		doListDtl();
		
		
	};
	
	/**
	 * @desc 출석부조회
	 * @param poCallBackFunc 콜백정의
	 * @return void
	 * @author 박갑수 at 2016. 5. 2
	 */
	function doListDtl(pnIdx, poCallBackFunc) {
		
		if(ValueUtil.isNull(pnIdx)){
			util.DataMap.setValue(app, "dmReqSelRow", "strLectDt", util.Grid.getCellValue(app, "grdCcsTimeDay", "LECT_DT"));
			util.DataMap.setValue(app, "dmReqSelRow", "strSklcDt", util.Grid.getCellValue(app, "grdCcsTimeDay", "SKLC_DT"));
			
			util.DataMap.setValue(app, "dmReqSelRow", "strRefKey", util.Grid.getCellValue(app, "grdCcsTimeDay", "REF_KEY"));
			util.DataMap.setValue(app, "dmReqSelRow", "strSkplcDivRcd", util.Grid.getCellValue(app, "grdCcsTimeDay", "SKPLC_DIV_RCD"));
		}else {
			util.DataMap.setValue(app, "dmReqSelRow", "strLectDt", util.Grid.getCellValue(app, "grdCcsTimeDay", "LECT_DT", pnIdx));
			util.DataMap.setValue(app, "dmReqSelRow", "strSklcDt", util.Grid.getCellValue(app, "grdCcsTimeDay", "SKLC_DT", pnIdx));
			util.DataMap.setValue(app, "dmReqSelRow", "strRefKey", util.Grid.getCellValue(app, "grdCcsTimeDay", "REF_KEY", pnIdx));
			util.DataMap.setValue(app, "dmReqSelRow", "strSkplcDivRcd", util.Grid.getCellValue(app, "grdCcsTimeDay", "SKPLC_DIV_RCD", pnIdx));
		}
		
		//strCommand: listAttend 
		util.Submit.send(app, "subListDtl", function(pbSuccess){
			if(pbSuccess){

				util.Control.redraw(app, "grdExtCcsAttend");
				
				var vsSmtRcd = util.DataMap.getValue(app, "dmKeyDateMap", "SMT");
				//if(vsSmtRcd == 'CA00391' || vsSmtRcd == 'CA00393'){
					var vnTheoTcEpacTc = util.DataMap.getValue(app, "dmResList", "strLectTimeCnt");
					util.Control.setValue(app, "optTheoTcEpacTc", vnTheoTcEpacTc);
				//}
				
							
				// 바인드 리플래시
//TO-BE: <ExtControl.refreshBind> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//				ExtControl.refreshBind(["bindAttendStudId1", "bindAttendStudId2", "bindAttendStudId3", "bindAttendStudId4", "bindAttendStudId5"]);
			}
			
			// 조회 후 콜백함수 수행
			if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
		});
	};
	
	
	
	
	/**
	 * @desc [btnSave]작업저장 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 4
	 */
	moPage.onClick_BtnSave = function() {
		var vnIdx = util.Grid.getIndex(app, "grdCcsTimeDay");
		var vsCloseYn = util.Grid.getCellValue(app, "grdCcsTimeDay", "CLOSE_YN", vnIdx);
		var vsLectDt = util.Grid.getCellValue(app, "grdCcsTimeDay", "LECT_DT_SHOW", vnIdx);
		var vsMsg = "";
		if(ValueUtil.fixNull(vsCloseYn) == "Y"){
		// (@)일자 출석체크 마감을 취소 하시겠습니까?
			vsMsg = "("+vsLectDt+")"+NLS.CCS.EXT001;
		}else {
		// (@)일자 출석체크 완료 하시겠습니까?
			vsMsg = "("+vsLectDt+")"+NLS.CCS.EXT002;
		}
		
		// @ 하시겠습니까?
		if(util.Msg.confirm("NLS-CRM-M010", [vsMsg])   ){
			util.Grid.setRowStateAll(app, "grdExtCcsAttend", cpr.data.tabledata.RowState.UPDATED);
			
			util.DataMap.setValue(app, "dmReqSelRow", "strCloseYn", vsCloseYn);
		}else {
			// 서버에서 기존 마감여부와 반대로 처리함..  작업저장만 하기 위해서
			util.DataMap.setValue(app, "dmReqSelRow", "strCloseYn", "Y");
		}
		
		// 작업저장
		doSave();
	};
	
	/**
	 * @desc 출석부 목록 변경사항 저장
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 4
	 */
	function doSave() {
		// 변경사항 체크
		if(!util.Grid.isModified(app, "grdExtCcsAttend")){
			return false;
		}
		
		var vsPkValue = "LECT_DT_SHOW:" + util.Grid.getCellValue(app, "grdCcsTimeDay", "LECT_DT_SHOW");

		//strCommand: save 
		util.Submit.send(app, "subSave", function(pbSuccess){
			if(pbSuccess){
				ExtControl.getControl("rptCcsTimeDay").pk_values =  vsPkValue;
				
				doList(function(pbListSuccess) {
					// 조회 : "갱신된 데이터가 조회되었습니다." header 메세지 표시
					if (pbListSuccess) util.Msg.notify(app, "NLS.INF.M025");

					// 디테일 리피트 상태에 따른 마스터 활성화 제어
					doDtlRptStatus();
				});
			}
		});
	};
	
	/**
	 * @desc [ipbFrfLectTimeCnt1]결석시수1 onRowSelect 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 4
	 */
	 moPage.onValueChanged_IpbFrfLectTimeCnt1 = function() {
		// 결석시수 체크
		doChkAbnTimeCnt("ABN_TIME_CNT_1", "ipbFrfLectTimeCnt1");
	};
	
	/**
	 * @desc [ipbFrfLectTimeCnt2]결석시수2 onRowSelect 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 4
	 */
	moPage.onValueChanged_IpbFrfLectTimeCnt2 = function() {
		// 결석시수 체크
		doChkAbnTimeCnt("ABN_TIME_CNT_2", "ipbFrfLectTimeCnt2");
	};
	
	/**
	 * @desc [ipbFrfLectTimeCnt3]결석시수3 onRowSelect 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 4
	 */
	moPage.onValueChanged_IpbFrfLectTimeCnt3 = function() {
		// 결석시수 체크
		doChkAbnTimeCnt("ABN_TIME_CNT_3", "ipbFrfLectTimeCnt3");
	};
	
	/**
	 * @desc [ipbFrfLectTimeCnt4]결석시수4 onRowSelect 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 4
	 */
	moPage.onValueChanged_IpbFrfLectTimeCnt4 = function() {
		// 결석시수 체크
		doChkAbnTimeCnt("ABN_TIME_CNT_4", "ipbFrfLectTimeCnt4");
	};
	
	/**
	 * @desc [ipbFrfLectTimeCnt5]결석시수5 onRowSelect 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 4
	 */
	moPage.onValueChanged_IpbFrfLectTimeCnt5 = function() {
		// 결석시수 체크
		doChkAbnTimeCnt("ABN_TIME_CNT_5", "ipbFrfLectTimeCnt5");
	};
	
	/**
	 * @desc 결석시수 체크
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 4
	 */
	function doChkAbnTimeCnt(psColNm, psCtlId) {
		var vnIdx = util.Grid.getIndex(app, "grdExtCcsAttend");
		
		var vsSmtRcd = util.DataMap.getValue(app, "dmKeyDateMap", "SMT");
		// 이론+실습 시수
		var vsTheoTcEpacTc = util.Control.getValue(app, "optTheoTcEpacTc");
		
		
		//if(vsSmtRcd == 'CA00391' || vsSmtRcd == 'CA00393'){
			vsTheoTcEpacTc = ValueUtil.fixNumber(util.DataMap.getValue(app, "dmResList", "strLectTimeCnt"));
		//}
		
		
		
		// 결석시수
		var vsAbnTimeCnt = util.Grid.getCellValue(app, "grdExtCcsAttend", psColNm,vnIdx);
		if(!ValueUtil.isNull(vsAbnTimeCnt)){
			
			// 이론+실습 시수보다 결석시수가 큰경우
			if(Number(vsTheoTcEpacTc) < Number(vsAbnTimeCnt)){
				// 현 강좌는 @ 시수 입니다. 결석시수를 확인하세요.
				util.Msg.alert("NLS-CCS-EXT003", [vsTheoTcEpacTc]);
				
				util.Grid.setCellValue(app, "grdExtCcsAttend", psColNm, "", vnIdx);
				ExtRepeat.setColFocus("rptExtCcsAttend", vnIdx, psCtlId);
			}
		}
	};
	
	/**
	 * @desc [ipbFrfLectTimeCnt1]결석시수1 onSetFocus 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 4
	 */
	moPage.onSetFocus_IpbFrfLectTimeCnt1 = function() {
		doChkLimitDt("RSN_1", "txtRsn1");
	};
	
	/**
	 * @desc [ipbFrfLectTimeCnt2]결석시수2 onSetFocus 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 4
	 */
	moPage.onSetFocus_IpbFrfLectTimeCnt2 = function() {
		doChkLimitDt("RSN_2", "txtRsn2");
	};
	
	/**
	 * @desc [ipbFrfLectTimeCnt3]결석시수3 onSetFocus 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 4
	 */
	moPage.onSetFocus_IpbFrfLectTimeCnt3 = function() {
		doChkLimitDt("RSN_3", "txtRsn3");
	};
	
	/**
	 * @desc [ipbFrfLectTimeCnt4]결석시수4 onSetFocus 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 4
	 */
	moPage.onSetFocus_IpbFrfLectTimeCnt4 = function() {
		doChkLimitDt("RSN_4", "txtRsn4");
	};
	
	/**
	 * @desc [ipbFrfLectTimeCnt5]결석시수5 onSetFocus 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 4
	 */
	moPage.onSetFocus_IpbFrfLectTimeCnt5 = function() {
		doChkLimitDt("RSN_5", "txtRsn5");
	};
	
	/**
	 * @desc 출결입력기간제어 일자
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 4
	 */
	function doChkLimitDt(psColNm, psCtlId) {
		
		var vnIdx = util.Grid.getIndex(app, "grdExtCcsAttend");
		
		var vsLimitDt = util.DataMap.getValue(app, "dmLimitDt", "LIMIT_DT");
		// 제한일자
		if(!ValueUtil.isNull(vsLimitDt)){
			// 사유
			var vsRsn = util.Grid.getCellValue(app, "grdExtCcsAttend", psColNm, vnIdx);
			var vsLectDt = util.DataMap.getValue(app, "dmReqSelRow", "strLectDt").substr(0,8);
			
			if(ValueUtil.isNull(vsRsn) && Number(vsLimitDt) > Number(vsLectDt)){
				// "입력기간이지난 출석부는 사유를 먼저 입력하시기 바랍니다." 메시지 출력
				util.Msg.alert("NLS-CCS-EXT004");
				ExtRepeat.setColFocus("rptExtCcsAttend", vnIdx, psCtlId);
			}
		}
	};
	
	/**
	 * @desc [ipbFrfLectTimeCnt1]결석시수1 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 4
	 */
	moPage.onClick_IpbFrfLectTimeCnt1 = function() {
		// 학번
		var vsStudId = util.Grid.getCellValue(app, "grdExtCcsAttend", "STUD_ID_1");
		
		// 경고메시지 조건 체크
		doChkAltMsg(vsStudId);
	};
	
	/**
	 * @desc [ipbFrfLectTimeCnt2]결석시수2 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 4
	 */
	moPage.onClick_IpbFrfLectTimeCnt2 = function() {
		// 학번
		var vsStudId = util.Grid.getCellValue(app, "grdExtCcsAttend", "STUD_ID_2");
		
		// 경고메시지 조건 체크
		doChkAltMsg(vsStudId);
	};
	
	/**
	 * @desc [ipbFrfLectTimeCnt3]결석시수3 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 4
	 */
	moPage.onClick_IpbFrfLectTimeCnt3 = function() {
		// 학번
		var vsStudId = util.Grid.getCellValue(app, "grdExtCcsAttend", "STUD_ID_3");
		
		// 경고메시지 조건 체크
		doChkAltMsg(vsStudId);
	};
	
	/**
	 * @desc [ipbFrfLectTimeCnt4]결석시수4 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 4
	 */
	moPage.onClick_IpbFrfLectTimeCnt4 = function() {
		// 학번
		var vsStudId = util.Grid.getCellValue(app, "grdExtCcsAttend", "STUD_ID_4");
		
		// 경고메시지 조건 체크
		doChkAltMsg(vsStudId);
	};
	
	/**
	 * @desc [ipbFrfLectTimeCnt5]결석시수5 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 4
	 */
	moPage.onClick_IpbFrfLectTimeCnt5 = function() {
		// 학번
		var vsStudId = util.Grid.getCellValue(app, "grdExtCcsAttend", "STUD_ID_5");
		 
		// 경고메시지 조건 체크
		doChkAltMsg(vsStudId);
	};
	
	/**
	 * @desc 경고메시지 조건 체크
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 4
	 */
	function doChkAltMsg(psStudId){
		// 1. STUD_ID가 있을경우
		if(!ValueUtil.isNull(psStudId)){
			// 2. 출결평가가 입력되있지 않을경우
			var vsAttendInputCnt = util.DataMap.getValue(app, "dmResList", "strAttendInputCnt");
			
			if(0 == Number(vsAttendInputCnt)){
				// 3.마감여부가 Y인경우
				var vsCloseYn =  util.Grid.getCellValue(app, "grdCcsTimeDay", "CLOSE_YN");
				if(ValueUtil.fixNull(vsCloseYn) == "Y"){
					
					// 마감이 되어 입력 할 수 없습니다.
					util.Msg.alert("NLS-CCS-EXT013");
				}
			}
		}
	};
	
	return moPage;
};
