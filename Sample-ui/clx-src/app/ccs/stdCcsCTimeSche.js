//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./stdCcsCTimeSche.xtm"/>

/**
 * 강의시간표관리
 * @class stdCcsCTimeSche
 * @author 박갑수 at 2016. 2. 24
 */
var stdCcsCTimeSche = function() {
	var moPage = new Page();
	
	// 임포트용 데이터 통신 오브젝트
	var moPObject = new Page();
	
	// 객체검색팝업 호출
	moPObject.moIdsForStdCmnPObjSch = [
	{
		controlId			:	"btnDeptCd",
		iCd					:	"",
		iNm					:	"ipbDeptNm",
		iObjDivRcd			:	["CC009SA", "CC009OG"],
		iStartObject    	:   "",
		iOtDivRcd			:	"",
		iOtIsTreeView	:	"",
		iLanDivRcd		:	"/root/resOnLoad/strLanDivRcd",
		iKeyDate			:	"/root/keyDateMap/END_DT",
		iKeyEndDate		:	"",
		oObjDivRcd		:	"/root/reqKey/strDeptObjDivRcd",
		oCd					:	"/root/reqKey/strDeptCd",
		oCdNm				:	"ipbDeptNm",
		oBegDt				:	"",
		oEndDt				:	"",
		oLanDivRcd		:	"",
		func 					:  function(poRtnValue){
			
			var vsSchYearRcd = util.Control.getValue(app, "cbbSchYearRcd");
			var vsSmtRcd = util.Control.getValue(app, "cbbSmtRcd");
			var vsKeyDate = util.Control.getValue(app, "dipKeyDate");
			var vsDeptNm = util.DataMap.getValue(app, "dmReqKey", "strDeptNm");
			if(!ValueUtil.isNull(vsSchYearRcd) && !ValueUtil.isNull(vsSmtRcd) && !ValueUtil.isNull(vsKeyDate) && !ValueUtil.isNull(vsDeptNm)){
				// 조회조건 필수값 입력되었을경우 바로조회
				util.Header.clickSearch(app);
			}
		}
	}];

	 // 교직원 검색
	 moPObject.moIdsForStdCmnPPrsnSearch = [
	{
		 controlId					: "rdBtnProfProfNm",
		 istrStaffGrpAuth			: "",					
		 istrWkdtyAuth			: "",				
		 iKeyDate					: "/root/keyDateMap/END_DT",	
		 iStaffNo					: "rdIpbProfProfNm",			
		 iStaffGrpRcd				: "",		
		 iStaffGrpRcdLock		: "", 			
		 iStaffSubGrpRcd		: "",	
		 iStaffSubGrpRcdLock	: "",				
		 iStatusRcd				: "",				
		 iRepNm					: "",				
		 iObjDivRcd				: "CC009OG",
		 iObjCd						: "N",				
		 iObjNm					: "",	
		 istrObjCdInList			: "",
		 iWkgrdRcd				: "",	
		 iOgDisableCls			: true,
		  
		 oObjNo					: "rdIpbProfProfObjNo",
		 oStaffNo					: "rdIpbProfProfNo",					
		 oRepNm					: "rdIpbProfProfNm",					
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
		 func                         : function(poRtnValue){
			 // 담당교수 시간중복체크
			var vnIdx = util.Grid.getIndex(app, "grdCcsTimeProf");
			doOnChangeTimeProf(function(pbSuccess) {
				if (pbSuccess){
					util.Grid.setCellValue(app, "grdCcsTimeProf", "PROF_NM", "", vnIdx);
					util.Grid.setCellValue(app, "grdCcsTimeProf", "PROF_NO", "", vnIdx);
					util.Grid.setCellValue(app, "grdCcsTimeProf", "PROF_OBJ_NO", "", vnIdx);
				}
			});
		 }
	}];
	 
	 // 강의실 검색
	 moPObject.moIdsForStdCcsPRoomPopup = [
		{
			 controlId					: "btnLectRoomCd",			
			 iLanDivRcd				: "/root/resOnLoad/strLanDivRcd",			
			 iBdCd						: "",			
			 iLectRoomNm			: "ipbLectRoomNm",		
			 iKeyDate					: "/root/keyDateMap/END_DT",			// (필수) 기준일
			 iLectDate					: "",			// (선택) 강의일자
			 iStTime					: "", 			// (선택) 시작시간
			 iEndTime					: "",			// (선택) 종료시간
			 iVacantRoomYn		: "",			// (선택) 빈강의실여부
			 oLectRoomCd			: "/root/resPopup/strLectRoomCd",			// 강의실코드
			 oBdCd						: "",			// 건물코드
			 oLectRoomNm			: "ipbLectRoomNm",
			 oSpvsDeptCd			: "",			
			 oObjDivRcd				: "",			
			 oLectRoomShortNm	: "",			
			 oPrpRcd					: "",			
			 oLectUseYn				: "",			// 강의실사용여부
			 oAccNop					: "",			
			 oFlrCnt						: "",			
			 oRemark					: "",			
			 oBdNm					: "",			// 건물명
			 func : function(poParam) {
				 // 강의실명 세팅
				 var vsLectRoomNm = util.Control.getValue(app, "ipbLectRoomNm");
				util.Control.setValue(app, "optLectRoomNm", vsLectRoomNm);
				// 시간표 초기화
				doBtnRefresh(function(pbEnd) {
					if (pbEnd){
						// 강의시간표 설정
						doSetSchedule();
					}
				});
			 }
		 }
	 ];
	 
	 // 강의실별 시간표 
	 moPObject.moIdsForStdCcsPTimeSche = [
		{ 
			 controlId					: "btnLoomSchdule",	// (필수) 최초 이벤트의 버튼id
			 iLectRoomNm			: "ipbLectRoomNm",	// (필수) 강의실명
			 iLectRoomCd			: "/root/resPopup/strLectRoomCd",	// (필수) 강의실코드
			 iSchYearRcd				: "/root/keyDateMap/YEAR",	// (필수) 학년도
			 iSmtRcd					: "/root/keyDateMap/SMT",	// (필수) 학기
			 iKeyDate					: "/root/keyDateMap/END_DT",	// (필수) 기준일자 
			 func : function(poParam) { 
			 //팝업끝난후  후처리가 필요할때 입력
			 }
		 }
	 ];
	 
	 // 학년도 학기를 원래데이터로 되돌리기위한 변수
	var msSchYearRcd = "";
	var msSmtRcd = "";
	
	// 이전 로우로 되돌리기 위한 변수
	var mnRowIdx = 0;
	
	// 강의시간표 버튼 백그라운드 색상
	var msDefaultColor = "#EAEAEA";		// 기본				: 옅은회색
	var msMyColor 		= "#1DDB16";		// 내시간표		: 초록 
	var msOtherColor	= "#747474";		// 타강의시간표	: 진한회색
	var msOverColor 	= "#FF0000";		// 중복시간표		: 빨강
	
	/**
	 * @desc import 헤더 초기화
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 2. 24
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		// import 헤더 초기화
		doHeaderOnLoad();
	};
	
	/**
	 * @desc onLoad 실행
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 24
	 */
	moPage.onModelConstructDone_StdCcsCTimeSche = function() {
		// 리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["rptCcsOpenSub", "rptCcsTimeProf", "rptCcsTimeSche", "rptLectInfo"]);
		
		// 권한체크위한 사용자정보 세팅
		util.DataMap.setValue(app, "dmReqKey", "strUserObjNo", moUserInfo.id);
		
		// 서브미션 호출
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				
				util.Control.redraw(app, ["cbbSchYearRcd", "cbbSmtRcd", "dipKeyDate", "cbbSbLvlRcd"]);
				
				// 학년도 학기값 되돌리기위한 값
				msSchYearRcd = util.DataMap.getValue(app, "dmKeyDateMap", "YEAR");
				msSmtRcd = util.DataMap.getValue(app, "dmKeyDateMap", "SMT");
				
				var vsCheckSch = util.DataMap.getValue(app, "dmResOnLoad", "strCheckSch");
				if(vsCheckSch == "0"){
					// 검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//					ExtGroup.initSearchBox("grpSearch", ["grpOpenSub", "grpSchedule"]);
					util.Control.setEnable(app, false, ["grpTimeProf", "grpTimeSche"]);
					// "강의시간표 입력기간이 아닙니다." 메시지
					util.Msg.alert("NLS-CCS-M057");
				}else {
					// 검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//					ExtGroup.initSearchBox("grpSearch", ["grpOpenSub", "grpSchedule", "grpTimeProf", "grpTimeSche"]);
				}
				
				if(msSmtRcd == "CA00391" || msSmtRcd == "CA00393"){
					ExtControl.setAttr("btnWNew","visible",true);					
				}else{
					ExtControl.setAttr("btnWNew","visible",false);					
				}
				
				// 권한에 따른 소속부서 default값 세팅 
				doSetCtlByAuth();
				
				ExtControl.setAttr("rdCbbProfWdayRcd", "bind", "bindRptCyberYn");
				ExtControl.setAttr("rdCbbProfLttm", "bind", "bindRptCyberYn");
				ExtControl.setAttr("rdCbbProfEndLttm", "bind", "bindRptCyberYn");
				ExtControl.setAttr("rdCbbProfStWeek", "bind", "bindRptCyberYn");
				ExtControl.setAttr("rdCbbProfEndWeek", "bind", "bindRptCyberYn");
//TO-BE: <ExtControl.refreshBind> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//				ExtControl.refreshBind("bindRptCyberYn");
			}
		}, true);
	};
	
	/**
	 * 권한에 따른 소속부서 default값 세팅 
	 * @param 
	 * @type void
	 * @author 박갑수 at 2016. 8. 9
	 */	
	function doSetCtlByAuth() {
		
		// 전체권한[CC00102] 아닐경우 자신의 소속 Default 세팅 
		if (moPageInfo.authRngRcd != "CC00102") {
			
			util.DataMap.setValue(app, "dmReqKey", "strDeptObjDivRcd", moUserInfo.asgnDeptDivRcd);
			util.DataMap.setValue(app, "dmReqKey", "strDeptCd", moUserInfo.asgnDeptCd);
			util.Control.setValue(app, "ipbDeptNm", moUserInfo.asgnDeptNm);
		}
	};
	
	/**
	 * @desc [cbbSchYearRcd]학년도 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 24
	 */
	moPage.onValueChanged_CbbSchYearRcd = function() {
		// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
		doChangeYearSmt("year");
		
	};
	
	/**
	 * @desc [cbbSmtRcd]학기 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 24
	 */
	moPage.onValueChanged_CbbSmtRcd = function() {
		// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
		doChangeYearSmt("smt");
	};
	
	/**
	 * @desc 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 24
	 */
	function doChangeYearSmt(psDiv) {
		//strCommand: date 
		util.Submit.send(app, "subDate", function(pbSuccess){
			if(pbSuccess){
				msSchYearRcd = util.DataMap.getValue(app, "dmKeyDateMap", "YEAR");
				msSmtRcd = util.DataMap.getValue(app, "dmKeyDateMap", "SMT");
				
				if(msSmtRcd == "CA00391" || msSmtRcd == "CA00393"){
					ExtControl.setAttr("btnWNew","visible",true);					
				}else{
					ExtControl.setAttr("btnWNew","visible",false);					
				}
				
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
	 * @desc [IpbDeptNm]소속 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 24
	 */
	moPage.onValueChanged_IpbDeptNm = function(sender) {
		// 리피트 변경사항 체크
		if(util.Grid.isModified(app, ["grdCcsOpenSub"])){
			return false;
		}
		
		// 값변경시 객체검색팝업 호출
		doOnChangeStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc [btnDeptCd]소속(돋보기) onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 24
	 */
	moPage.onClick_BtnDeptCd = function(sender) {
		// 객체검색팝업 호출
		doOnClickStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc [btnSearch]조회 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 24
	 */
	moPage.onClick_BtnSearch = function() {
		// 작업영역 리피트 변경 내역 체크
		if(util.Grid.isModified(app, "", "CRM")){
			return false;
		}
		
		// 조회조건 필수 체크
		if(!util.validate(app, ["cbbSchYearRcd", "cbbSmtRcd", "dipKeyDate", "ipbDeptNm"])){
			return false;
		}
		
		util.coverPage(app);
		
		doBtnRefresh(function(pbEnd) {
			if (pbEnd){
				doList(function(pbSuccess) {
					if (pbSuccess){
						
						// 조회 : "조회되었습니다." header 메세지 표시
						util.Msg.notify(app, "NLS.INF.M024");
					}
				});
			}
		});
	};
	
	/**
	 * @desc 개설 분반 조회
	 * @param poCallBackFunc 콜백정의
	 * @return void
	 * @author 박갑수 at 2016. 2. 24
	 */
	function doList(poCallBackFunc) {
		// 디테일 리피트 변경시 변경내역 체크 방지
		util.Control.redraw(app, "grdCcsTimeProf");
		util.Control.redraw(app, "grdCcsTimeSche");
		
		//strCommand: listOpenSub 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdCcsOpenSub");
				
				// 마스터에 데이터가 없을 경우 디테일 입력 불가
				if(util.Grid.getRowCount(app, "grdCcsOpenSub") < 1){
					util.Control.setEnable(app, false,["grpSchedule", "grpTimeProf", "grpTimeSche"]);
					util.Control.reset(app, ["rptCcsTimeProf", "rptCcsTimeSche"]);
					
					// 조회데이터가 없을경우 강의시간표 초기화
					doBtnRefresh();
					
					// 화면커버 없앰
					util.removeCover(app);
				}else {
					// 각 컨트롤 활성화 제어
					doDtlRptStatus();
				}
				
				var vsLttmCnt = util.DataMap.getValue(app, "dmResList", "lttmCnt");	
				if(!ValueUtil.isNull(vsLttmCnt)){
					var vnLttmCnt = Number(vsLttmCnt);
					for(vnLttmCnt++; vnLttmCnt <=16; vnLttmCnt++){
						if(vnLttmCnt < 10){
							util.Control.setVisible(app, false, ["grp0"+vnLttmCnt]);
						}else {
							util.Control.setVisible(app, false, ["grp"+vnLttmCnt]);
						}
					}
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
	 * @author 박갑수 at 2016. 2. 26
	 */
	function doDtlRptStatus(){
		if(util.Grid.isModified(app, "grdCcsTimeProf")){
			util.Control.setEnable(app, false,["grpOpenSub", "grpSchedule", "grpTimeSche"]);
		}else{			
			if(util.Grid.getRowCount(app, "grdCcsTimeProf") == 0){
				util.Control.setEnable(app, false, ["grpSchedule", "grpTimeSche"]);
				util.Control.setEnable(app, true, ["grpOpenSub"]);
			}else {
				var vsCheckSch = util.DataMap.getValue(app, "dmResOnLoad", "strCheckSch");
				if(vsCheckSch == "0"){
					util.Control.setEnable(app, true, ["grpOpenSub", "grpSchedule"]);
					util.Control.setEnable(app, false, ["grpTimeProf", "grpTimeSche"]);
				}else {
					util.Control.setEnable(app, true, ["grpOpenSub", "grpSchedule"]);
					util.Control.setEnable(app, true, ["grpTimeProf", "grpTimeSche"]);
				}
			}
		}
	};
	
	/**
	 * @desc 강의실시간표 버튼 초기화
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 25
	 */
	function doBtnRefresh(poCallBackFunc){
		var vbEnd = false;
		for (var i = 1; i <= 16; i++) {
			var vcBtnRefre = "";
			var vcBtnRefreDay = "";
			if (i < 10) {
				vcBtnRefre = "btn0" + i;
			} else {
				vcBtnRefre = "btn" + i;
			}
			for (var j = 1; j <= 6; j++) {
				vcBtnRefreDay = vcBtnRefre + "CL1020" + j;
				util.Control.setStyleAttr(app, vcBtnRefreDay, "background-color", msDefaultColor);
				if(i == 16 && j == 6){
					vbEnd = true;
					// 콜백함수 수행
					if (util.isFunc(poCallBackFunc)) poCallBackFunc(vbEnd);
				}
			}
		}
	};

	/**
	 * @desc [rptCcsOpenSub]개설분반 onRowSelect 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 25
	 */
	moPage.onRowSelect_RptCcsOpenSub = function() {	
		// 폐강여부
		var vsExpYn = util.Grid.getCellValue(app, "grdCcsOpenSub", "EXP_YN");
		if(ValueUtil.fixNull(vsExpYn) == "Y"){
			// "폐강된 과목입니다." 메시지
			util.Msg.alert("NLS-CCS-M023");

			if(1 != mnRowIdx){
				util.Grid.selectRow(app, "grdCcsOpenSub", mnRowIdx);
			}
			
			mnRowIdx = 0;
			
			util.removeCover(app);
			return;
		}else {
			mnRowIdx = Number(util.Grid.getCheckOrSelectedRowIndex(app, "grdCcsOpenSub"));
		}
		
		util.DataMap.setValue(app, "dmReqKey", "strSaCd", util.Grid.getCellValue(app, "grdCcsOpenSub", "SA_CD"));							// 학사 부서코드
		util.DataMap.setValue(app, "dmReqKey", "strSaObjDivRcd", util.Grid.getCellValue(app, "grdCcsOpenSub", "SA_OBJ_DIV_RCD"));	// 학사 부서객체구분코드
		util.DataMap.setValue(app, "dmReqKey", "strCuCd", util.Grid.getCellValue(app, "grdCcsOpenSub", "CU_CD"));							// 교과그룹코드
		util.DataMap.setValue(app, "dmReqKey", "strDivclsNm", util.Grid.getCellValue(app, "grdCcsOpenSub", "DIVCLS_NM"));				// 분반명
		util.DataMap.setValue(app, "dmReqKey", "strSbLvlRcd", util.Grid.getCellValue(app, "grdCcsOpenSub", "SB_LVL_RCD"));				// 학년
		util.DataMap.setValue(app, "dmReqKey", "strRefKey", util.Grid.getCellValue(app, "grdCcsOpenSub", "REF_KEY"));						// 참조키
		util.DataMap.setValue(app, "dmReqKey", "strLectTypeRcd", util.Grid.getCellValue(app, "grdCcsOpenSub", "LECT_TYPE_RCD"));	// 강의유형
		
		var vsTeamTeachYn = util.Grid.getCellValue(app, "grdCcsOpenSub", "TEAM_TEACH_YN");
		util.DataMap.setValue(app, "dmReqKey", "strTeamTeachYn", vsTeamTeachYn);
		
		// 팀티칭일경우 강의시수 인정학점 수정가능
		if(ValueUtil.fixNull(vsTeamTeachYn) == "Y"){
			util.Control.setEnable(app, true, ["rdIpbProfRcogTimeCnt", "rdIpbProfLectPnt"]);
		}else {
			util.Control.setEnable(app, false, ["rdIpbProfRcogTimeCnt", "rdIpbProfLectPnt"]);
		}
		
		var vsLectTypeRcd = util.Grid.getCellValue(app, "grdCcsOpenSub", "LECT_TYPE_RCD");		// 강의유형 : 온라인강의[CA209CYBER]
		var vsDclRcdCd = util.Grid.getCellValue(app, "grdCcsOpenSub", "DCL_RCD_CD");				// 학문분야코드 : 현장실습[CA21240]
		
		var vnTheoEpacTc = 0;
		var vsTheoTc = util.Grid.getCellValue(app, "grdCcsOpenSub", "THEO_TC");						// 이론
		if(!ValueUtil.isNull(vsTheoTc)){
			vnTheoEpacTc = vnTheoEpacTc + Number(vsTheoTc);
		}
		var vsEpacTc = util.Grid.getCellValue(app, "grdCcsOpenSub", "EPAC_TC");						// 실습
		if(!ValueUtil.isNull(vsEpacTc)){
			vnTheoEpacTc = vnTheoEpacTc + Number(vsEpacTc);
		}
		
		// 온라인강의이거나 학문분야가 현장실습일경우, 이론+실습이 0인경우
		if(ValueUtil.fixNull(vsLectTypeRcd) == "CA209CYBER" || ValueUtil.fixNull(vsDclRcdCd).indexOf("CA21240") != -1 || vnTheoEpacTc == 0){
			util.DataMap.setValue(app, "dmReqKey", "strCyberYn", "Y");
			util.Control.setEnable(app, false, ["rdCbbProfWdayRcd", "rdCbbProfLttm", "rdCbbProfEndLttm", "rdCbbProfStWeek", "rdCbbProfEndWeek"]);
			util.Control.setVisible(app, true, ["lblComment1"]);
		}else {
			util.DataMap.setValue(app, "dmReqKey", "strCyberYn", "");
			util.Control.setEnable(app, true, ["rdCbbProfWdayRcd", "rdCbbProfLttm", "rdCbbProfEndLttm", "rdCbbProfStWeek", "rdCbbProfEndWeek"]);
			util.Control.setVisible(app, false, ["lblComment1"]);
		}
		
		// 강의실 초기화
		util.DataMap.setValue(app, "dmResPopup", "strLectRoomCd", "");
		util.Control.setValue(app, "ipbLectRoomNm", "");
		
		util.Control.setEnable(app, false,["rptCcsOpenSub"]);
		// 시간표 초기화
		doBtnRefresh(function(pbEnd) {
			if (pbEnd){
				// 분반별 시간/담당교수 조회
				doTimeProfList();
			}
		});
	};
	
	/**
	 * @desc 분반별 시간/담당교수 조회
	 * @param poCallBackFunc 콜백정의
	 * @return void
	 * @author 박갑수 at 2016. 2. 26
	 */
	function doTimeProfList(poCallBackFunc) {
		//strCommand: timeProfList 
		util.Submit.send(app, "subProfList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdCcsTimeProf");
				
				// 디테일 리피트 상태에 따른 마스터 활성화 제어
				doDtlRptStatus();
				
				// 강의실 조회
				doTimeScheList(function(pbSuccess) {
					if (pbSuccess){
						// 강의시간표 설정
						doSetSchedule();
					}
				});
			}
			// 조회 후 콜백함수 수행
			if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
		});
	};
	
	/**
	 * @desc 강의실 조회
	 * @param poCallBackFunc 콜백정의
	 * @return void
	 * @author 박갑수 at 2016. 2. 26
	 */
	function doTimeScheList(poCallBackFunc) {		
		//strCommand: listTimeSche 
		util.Submit.send(app, "subScheList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdCcsTimeSche");
			}
			// 조회 후 콜백함수 수행
			if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
		});
	};
	
	/**
	 * @desc 강의시간표 설정
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 29
	 */
	function doSetSchedule() {
		var vnTimeScheRowCnt =  util.Grid.getRowCount(app, "grdCcsTimeSche");
				
		// 강의실 데이터가 존재할경우
		var vsLectRoomCd = "";
		var vsLectRoomNm = "";
		
		if(ValueUtil.isNull(util.Control.getValue(app, "ipbLectRoomNm")) && vnTimeScheRowCnt > 0){
			vsLectRoomCd = util.Grid.getCellValue(app, "grdCcsTimeSche", "LECT_ROOM_CD", 1);
			vsLectRoomNm = util.Grid.getCellValue(app, "grdCcsTimeSche", "LECT_ROOM_NM", 1);
			
			util.Control.setValue(app, "ipbLectRoomNm", vsLectRoomNm);
			util.DataMap.setValue(app, "dmResPopup", "strLectRoomCd", vsLectRoomCd);
		}else {
			vsLectRoomCd = util.DataMap.getValue(app, "dmResPopup", "strLectRoomCd");
			vsLectRoomNm = util.Control.getValue(app, "ipbLectRoomNm");
		}
				
		util.DataMap.setValue(app, "dmReqKey", "strLectRoomCd", vsLectRoomCd);
		
		 // 강의실명 세팅
		util.Control.setValue(app, "optLectRoomNm", vsLectRoomNm);
		
		// 강의실정보 조회
		doLectList(function(pbListSuccess) {
			if (pbListSuccess){
				doSetScheduleColor(vsLectRoomCd);
			}
		});
	};
	
	/**
	 * @desc 강의시간표 색정보 설정
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 29
	 */
	function doSetScheduleColor(psLectRoomCd) {
		
		// 강의실데이터 rptCcsTimeSche에 따른 초록색 세팅
		var vnTimeScheRowCnt =  util.Grid.getRowCount(app, "grdCcsTimeSche");
		var vsRefKey = util.DataMap.getValue(app, "dmReqKey", "strRefKey");
		
		for(var i=0; i<vnTimeScheRowCnt; i++){
			var vnRowIdx = i+1;
			var vsRowLectRoomCd = util.Grid.getCellValue(app, "grdCcsTimeSche", "LECT_ROOM_CD", vnRowIdx);
			
//			if(psLectRoomCd == vsRowLectRoomCd || ValueUtil.isNull(vsRowLectRoomCd)){
				var vsLttm = util.Grid.getCellValue(app, "grdCcsTimeSche", "LTTM", vnRowIdx);
				var vsWdayRcd = util.Grid.getCellValue(app, "grdCcsTimeSche", "WDAY_RCD", vnRowIdx);
				var vsRowRefKey = util.Grid.getCellValue(app, "grdCcsTimeSche", "REF_KEY", vnRowIdx);
				
				var vsTmpLttm = ""+vsLttm;
				if (Number(vsLttm) < 10) {
					vsTmpLttm = "0" + vsLttm;
				}
				
				var vcBtn = "btn" + vsTmpLttm + vsWdayRcd;
				
				// 백그라운드컬러 설정 얻어와서 기본 색이 아닐경우 - 중복시간
				var vsBackGround = util.Control.getStyleAttr(app, vcBtn, "background-color");
				if(ValueUtil.fixNull(vsBackGround) != msDefaultColor){
					if(vsRefKey != vsRowRefKey){
						util.Control.setStyleAttr(app, vcBtn, "background-color", msOverColor);
					}
				}else {
					util.Control.setStyleAttr(app, vcBtn, "background-color", msMyColor);
				}
//			}
		}
		
		// 강의실정보데이터 rptLectInfo에 따른 회색 세팅
		var voLectInfoRowCnt = util.Grid.getRowCount(app, "grdLectInfo");
		
		for(var i=0; i<voLectInfoRowCnt; i++){
			var vnRowIdx = i+1;
			var vsLttm = util.Grid.getCellValue(app, "grdLectInfo", "LTTM", vnRowIdx);
			var vsWdayRcd = util.Grid.getCellValue(app, "grdLectInfo", "WDAY_RCD", vnRowIdx);
			var vsRowRefKey = util.Grid.getCellValue(app, "grdLectInfo", "REF_KEY", vnRowIdx);
			
			var vsTmpLttm = ""+vsLttm;
			if (Number(vsLttm) < 10) {
				vsTmpLttm = "0" + vsLttm;
			}
			
			var vcBtn = "btn" + vsTmpLttm + vsWdayRcd;
			
			// 백그라운드컬러 설정 얻어와서 기본 색이 아닐경우 - 중복시간
			var vsBackGround = util.Control.getStyleAttr(app, vcBtn, "background-color");
			if(ValueUtil.fixNull(vsBackGround) != msDefaultColor){
				if(vsRefKey != vsRowRefKey){
					util.Control.setStyleAttr(app, vcBtn, "background-color", msOverColor);
				}
			}else {
				util.Control.setStyleAttr(app, vcBtn, "background-color", msOtherColor);
			}
		}
		util.Control.setEnable(app, true,["rptCcsOpenSub"]);
		util.removeCover(app);
	};
	
	/**
	 * @desc 강의실정보 조회
	 * @param poCallBackFunc 콜백정의
	 * @return void
	 * @author 박갑수 at 2016. 2. 24
	 */
	function doLectList(poCallBackFunc) {
		//strCommand: lectList 
		util.Submit.send(app, "subLectList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdLectInfo");
			}
			// 조회 후 콜백함수 수행
			if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
		});
	};
	
	/**
	 * @desc [btnNew]신규 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 26
	 */
	moPage.onClick_BtnNew = function() {
		var vsLectTypeRcd = util.Grid.getCellValue(app, "grdCcsOpenSub", "LECT_TYPE_RCD");		// 강의유형 : 온라인강의[CA209CYBER]
		var vsDclRcdCd = util.Grid.getCellValue(app, "grdCcsOpenSub", "DCL_RCD_CD");				// 학문분야코드 : 현장실습[CA21240]
		var vsCmpDivRcd = util.Grid.getCellValue(app, "grdCcsOpenSub", "CMP_DIV_RCD");			// 이수구분
		var vsRefKey = util.Grid.getCellValue(app, "grdCcsOpenSub", "REF_KEY");							// 참조키
		var vsPnt = util.Grid.getCellValue(app, "grdCcsOpenSub", "PNT");										// 학점
		var vsTheoTc = util.Grid.getCellValue(app, "grdCcsOpenSub", "THEO_TC");						// 이론
		var vsEpacTc = util.Grid.getCellValue(app, "grdCcsOpenSub", "EPAC_TC");						// 실습
		
		var vnRowCnt = util.Grid.getRowCount(app, "grdCcsTimeProf");
		
		
		// 신규로우 추가
		var vnIdx = util.Grid.insertRow(app, "grdCcsTimeProf");
		
		if (vnRowCnt == 0) {
			// 첫번째 row에만 대표교수
			util.Grid.setCellValue(app, "grdCcsTimeProf", "REP_PROF_YN", "Y", vnIdx);
		}
		
		var vnTheoEpacTc = 0;
		var vsTheoTc = util.Grid.getCellValue(app, "grdCcsOpenSub", "THEO_TC");						// 이론
		if(!ValueUtil.isNull(vsTheoTc)){
			vnTheoEpacTc = vnTheoEpacTc + Number(vsTheoTc);
		}
		var vsEpacTc = util.Grid.getCellValue(app, "grdCcsOpenSub", "EPAC_TC");						// 실습
		if(!ValueUtil.isNull(vsEpacTc)){
			vnTheoEpacTc = vnTheoEpacTc + Number(vsEpacTc);
		}
		
		// 온라인강의이거나 학문분야가 현장실습일경우, 이론+실습이 0인경우
		if(ValueUtil.fixNull(vsLectTypeRcd) == "CA209CYBER" || ValueUtil.fixNull(vsDclRcdCd).indexOf("CA21240") != -1 || vnTheoEpacTc == 0){
			
			util.Grid.setCellValue(app, "grdCcsTimeProf", "REF_KEY", vsRefKey, vnIdx);
			util.Grid.setCellValue(app, "grdCcsTimeProf", "WDAY_RCD", "CL10201", vnIdx);		// 요일 : 월[CL10201]
			util.Grid.setCellValue(app, "grdCcsTimeProf", "LTTM", "0", vnIdx);
			util.Grid.setCellValue(app, "grdCcsTimeProf", "END_LTTM", "0", vnIdx);
			util.Grid.setCellValue(app, "grdCcsTimeProf", "ST_TIME", "0", vnIdx);
			util.Grid.setCellValue(app, "grdCcsTimeProf", "END_TIME", "0", vnIdx);
			util.Grid.setCellValue(app, "grdCcsTimeProf", "ST_WEEK", "0", vnIdx);
			util.Grid.setCellValue(app, "grdCcsTimeProf", "END_WEEK", "0", vnIdx);	
			util.Grid.setCellValue(app, "grdCcsTimeProf", "ST_WEEK_PRT", "0", vnIdx);
			util.Grid.setCellValue(app, "grdCcsTimeProf", "END_WEEK_PRT", "0", vnIdx);	
		// 일반강좌인경우
		}else {
			util.Grid.setCellValue(app, "grdCcsTimeProf", "REF_KEY", vsRefKey, vnIdx);
			util.Grid.setCellValue(app, "grdCcsTimeProf", "ST_WEEK", "1", vnIdx);
			util.Grid.setCellValue(app, "grdCcsTimeProf", "ST_WEEK_PRT", "1", vnIdx);
			
			var vnWeekCnt = util.DataSet.getRowCount(app, "dsMonWeekList");
						
			if(vnWeekCnt > 1){
				var vsEndWek = util.DataSet.getValue(app, "dsMonWeekList", "WEEK_SEQ" , vnWeekCnt-1);
			}else {
				var vsEndWek = util.DataSet.getValue(app, "dsMonWeekList", "WEEK_SEQ" , vnWeekCnt);
			}
			
			// 마지막주세팅
			util.Grid.setCellValue(app, "grdCcsTimeProf", "END_WEEK", vsEndWek, vnIdx);
			util.Grid.setCellValue(app, "grdCcsTimeProf", "END_WEEK_PRT", vsEndWek, vnIdx);
		}
		
		// 디테일 리피트 상태에 따른 마스터 활성화 제어
		doDtlRptStatus();
	};
	
	/**
	 * @desc [btnDel]삭제 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 26
	 */
	moPage.onClick_BtnDel = function() {
		// 신규가 아닌경우
		if(cpr.data.tabledata.RowState.INSERTED != util.Grid.getRowState(app, "grdCcsTimeProf")){
			
			util.DataMap.setValue(app, "dmReqDelChk", "strRefKey", util.Grid.getCellValue(app, "grdCcsTimeProf", "REF_KEY"));					// 참조키
			util.DataMap.setValue(app, "dmReqDelChk", "strProfObjNo", util.Grid.getCellValue(app, "grdCcsTimeProf", "PROF_OBJ_NO")); 	// 교수오브젝트번호
			util.DataMap.setValue(app, "dmReqDelChk", "strStLttm", util.Grid.getCellValue(app, "grdCcsTimeProf", "LTTM")); 						// 시작교시
			util.DataMap.setValue(app, "dmReqDelChk", "strEndLttm", util.Grid.getCellValue(app, "grdCcsTimeProf", "END_LTTM"));				// 종료교시
			
			// 삭제전 체크
			//strCommand: delChk 
			util.Submit.send(app, "subDelChk", function(pbSuccess){
				if(pbSuccess){
					
					// 휴보강데이터 존재여부(공휴일제외)
					var vsRestAppCnt = util.DataMap.getValue(app, "dmResDelChk", "strRestAppCnt");
					if(Number(ValueUtil.fixNull(vsRestAppCnt)) > 0){
						
						var vsMsgParam = util.DataMap.getValue(app, "dmResDelChk", "strRestAppSplcDt");
						// (@)일에 휴보강데이터가 존재하여 함께 삭제됩니다. \n계속 진행하시겠습니까?
						if(util.Msg.confirm("NLS-CRM-M078", [vsMsgParam])   ){
							// 삭제
							util.Grid.deleteRow(app, "grdCcsTimeProf");
							// 디테일 리피트 상태에 따른 마스터 활성화 제어
							doDtlRptStatus();
						}else {
							return false;
						}							
					}else {
						// 삭제
						util.Grid.deleteRow(app, "grdCcsTimeProf");
						// 디테일 리피트 상태에 따른 마스터 활성화 제어
						doDtlRptStatus();
					}
				}
			});
		}else {
			// 삭제
			util.Grid.deleteRow(app, "grdCcsTimeProf");
			// 디테일 리피트 상태에 따른 마스터 활성화 제어
			doDtlRptStatus();
		}
	};
	
	/**
	 * @desc [btnRestore]작업취소 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 26
	 */
	moPage.onClick_BtnRestore = function() {
		// 작업취소
		util.Grid.restoreRow(app, "grdCcsTimeProf");
		// 디테일 리피트 상태에 따른 마스터 활성화 제어
		doDtlRptStatus();
	};
	
	/**
	 * @desc [btnSave]작업저장 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 26
	 */
	moPage.onClick_BtnSave = function() {
		// 작업저장
		doSaveProf();
	};
	
	/**
	 * @desc 분반별 시간/담당교수 변경사항 저장
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 26
	 */
	function doSaveProf() {
		
		// 리피트 변경사항 체크
		if(!util.Grid.isModified(app, ["grdCcsTimeProf"], "MSG")){
			return false;
		}
		
		// 리피트 Validation Check		
		if(!util.validate(app, "grdCcsTimeProf")) return false;
		
	
		
		// 대표교수 1명인지체크
		var vnRowCnt = util.Grid.getRowCount(app, "grdCcsTimeProf");
		var vnRepProfCnt = 0;
		var vnDRowCnt = 0;
		for(var i=0; i<vnRowCnt; i++){
			var vnIdx = i+1;
			
			var vsRepProfYn = util.Grid.getCellValue(app, "grdCcsTimeProf", "REP_PROF_YN", vnIdx);
			var vsUptStatus = util.Grid.getCellValue(app, "grdCcsTimeProf", "UPT_STATUS", vnIdx);
			if(ValueUtil.fixNull(vsUptStatus) == "D"){
				vnDRowCnt ++;
				continue;
			}
			var vsDelCkb 	= util.Grid.getCellValue(app, "grdCcsTimeProf", "DEL_CKB", i+1);
			if(ValueUtil.fixNull(vsRepProfYn) == "Y"){
				if(vsDelCkb != 'D'){
					vnRepProfCnt ++;
				}
			}
		}
		if(vnRepProfCnt > 1){
			// "대표 교수는 한 명입니다."
			util.Msg.alert("NLS-CCS-M015");
			return false;
		}
		
		if(vnRepProfCnt == 0 && (vnRowCnt - vnDRowCnt) != 0){
			// "대표교수는 필수입니다. 대표교수를 지정해 주십시오."
			util.Msg.alert("NLS-CCS-M075");
			return false;
		}
		
		// 인정시수 유효성체크
		if(!doChkRcogTimeCnt()){
			return false;
		}
		
		// 인정학점 유효성체크
		if(!doChkLectPntCnt()){
			return false;
		}
		
		//strCommand: saveProf 
		util.Submit.send(app, "subSaveProf", function(pbSuccess){
			if(pbSuccess){
				doBtnRefresh(function(pbEnd) {
					if (pbEnd){
						doTimeProfList(function(pbListSuccess) {
							// 조회 : "갱신된 데이터가 조회되었습니다." header 메세지 표시
							if (pbListSuccess) util.Msg.notify(app, "NLS.INF.M025");
							
							// 디테일 리피트 상태에 따른 마스터 활성화 제어
							doDtlRptStatus();
						});
					}
				});
			}
		});
	};
	
	/**
	 * @desc [rdCbbDtlStLttm]시작교시 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 26
	 */
	moPage.onValueChanged_RdCbbProfLttm = function() {
		// 시작교시 종료교시 유효성 체크
		doChkLttm("LTTM");
		
		// 시작시간 값 세팅
		var vnIdx = util.Grid.getIndex(app, "grdCcsTimeProf");
		var vsStLttm = util.Grid.getCellValue(app, "grdCcsTimeProf", "LTTM");
		// 교시가 입력되었을경우
		if(!ValueUtil.isNull(vsStLttm)){
			var vsStTime = ExtInstance.getValue("/root/resList/timeList/row", "ST_TIME" , "child::LTTM='"+ vsStLttm +"'");
			if(ValueUtil.isNull(vsStTime)){
				// "교시값이 유효하지 않습니다." 메시지
				util.Msg.alert("NLS-CCS-M056");
				util.Grid.setCellValue(app, "grdCcsTimeProf", "LTTM", "", vnIdx);
				util.Grid.setCellValue(app, "grdCcsTimeProf", "ST_TIME", "", vnIdx);
			}else {
				util.Grid.setCellValue(app, "grdCcsTimeProf", "ST_TIME", vsStTime, vnIdx);
			}
		}
		
		// 담당교수 시간중복체크
		var vnIdx = util.Grid.getIndex(app, "grdCcsTimeProf");
		doOnChangeTimeProf(function(pbSuccess) {
			if (pbSuccess){
				util.Grid.setCellValue(app, "grdCcsTimeProf", "LTTM", "", vnIdx);
				util.Grid.setCellValue(app, "grdCcsTimeProf", "ST_TIME", "", vnIdx);
			}
		});
	};
	
	/**
	 * @desc [rdCbbDtlEndLttm]종료교시 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 26
	 */
	moPage.onValueChanged_RdCbbProfEndLttm = function() {
		// 시작교시 종료교시 유효성 체크
		doChkLttm("END_LTTM");
		
		// 종료시간 값 세팅
		var vnIdx = util.Grid.getIndex(app, "grdCcsTimeProf");
		var vsEndLttm = util.Grid.getCellValue(app, "grdCcsTimeProf", "END_LTTM");
		// 교시가 입력되었을경우
		if(!ValueUtil.isNull(vsEndLttm)){
			var vsEndTime = ExtInstance.getValue("/root/resList/timeList/row", "END_TIME" , "child::LTTM='"+ vsEndLttm +"'");
			if(ValueUtil.isNull(vsEndTime)){
				// "교시값이 유효하지 않습니다." 메시지
				util.Msg.alert("NLS-CCS-M056");
				util.Grid.setCellValue(app, "grdCcsTimeProf", "END_LTTM", "", vnIdx);
				util.Grid.setCellValue(app, "grdCcsTimeProf", "END_TIME", "", vnIdx);
			}else {
				util.Grid.setCellValue(app, "grdCcsTimeProf", "END_TIME", vsEndTime, vnIdx);
			}
		}
		
		// 담당교수 시간중복체크
		var vnIdx = util.Grid.getIndex(app, "grdCcsTimeProf");
		doOnChangeTimeProf(function(pbSuccess) {
			if (pbSuccess){
				util.Grid.setCellValue(app, "grdCcsTimeProf", "END_LTTM", "", vnIdx);
				util.Grid.setCellValue(app, "grdCcsTimeProf", "END_TIME", "", vnIdx);
			}
		});
	};
	
	/**
	 * @desc 시작교시 종료교시 유효성체크
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 26
	 */
	function doChkLttm(psColId){
		var vnIdx = util.Grid.getIndex(app, "grdCcsTimeProf");
		// 시작교시
		var vsStLttm = util.Grid.getCellValue(app, "grdCcsTimeProf", "LTTM");
		// 종료교시
		var vsEndLttm = util.Grid.getCellValue(app, "grdCcsTimeProf", "END_LTTM");
		// 시작교시 종료교시 유효성 체크
		if(!ValueUtil.isNull(vsStLttm) && !ValueUtil.isNull(vsEndLttm)){
			if(Number(vsStLttm) > Number(vsEndLttm)){
				var vsEndLttmTitle = ExtControl.getTextValue("rhBtnProfLttm");
				var vsStLttmTitle = ExtControl.getTextValue("rhBtnProfEndLttm");
				//  "@1 의 시간은 @2 의 시간 보다 빠를 수 없습니다." 메시지
				util.Msg.alert("NLS-CCS-M008", [vsEndLttmTitle, vsStLttmTitle]);
				
				util.Grid.setCellValue(app, "grdCcsTimeProf", psColId, "", vnIdx);
			}
		}
	};

	/**
	 * @desc [rdCbbProfStWeek]시작주차 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 26
	 */
	moPage.onValueChanged_RdCbbProfStWeek = function() {
		// 시작주차 종료주차 유효성 체크
		doChkWeek("ST_WEEK");
	};
	
	/**
	 * @desc [rdCbbProfEndWeek]종료주차 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 26
	 */
	moPage.onValueChanged_RdCbbProfEndWeek = function() {
		// 시작주차 종료주차 유효성 체크
		doChkWeek("END_WEEK");
	};
	
	/**
	 * @desc 시작주차 종료주차 유효성 체크
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 26
	 */
	function doChkWeek(psColId){
		var vnIdx = util.Grid.getIndex(app, "grdCcsTimeProf");
		// 시작주차
		var vsStWeek = util.Grid.getCellValue(app, "grdCcsTimeProf", "ST_WEEK");
		// 종료주차
		var vsEndWeek = util.Grid.getCellValue(app, "grdCcsTimeProf", "END_WEEK");
		// 시작주차 종료주차 유효성 체크
		if(!ValueUtil.isNull(vsStWeek) && !ValueUtil.isNull(vsEndWeek)){
			if(Number(vsStWeek) > Number(vsEndWeek)){
				var vsEndWeekTitle = ExtControl.getTextValue("rhBtnProfEndWeek");
				var vsStWeekTitle = ExtControl.getTextValue("rhBtnProfStWeek");
				//  "@1 의 시간은 @2 의 시간 보다 빠를 수 없습니다." 메시지
				util.Msg.alert("NLS-CCS-M008", [vsEndWeekTitle, vsStWeekTitle]);
				
				util.Grid.setCellValue(app, "grdCcsTimeProf", psColId, "", vnIdx);
			}
		}
	};
	
	/**
	 * @desc [rdCbbProfStWeek]시작주차 onSetFocus 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 26
	 */
	moPage.onSetFocus_RdCbbProfStWeek = function() {
		// 시작주차 종료주차 필터링
		doFilterWeek();
		
		// 담당교수 시간중복체크
		var vnIdx = util.Grid.getIndex(app, "grdCcsTimeProf");
		doOnChangeTimeProf(function(pbSuccess) {
			if (pbSuccess){
				util.Grid.setCellValue(app, "grdCcsTimeProf", "ST_WEEK", "", vnIdx);
				util.Grid.setCellValue(app, "grdCcsTimeProf", "ST_WEEK_PRT", "", vnIdx);
			}
		});
	};
	
	/**
	 * @desc [rdCbbProfEndWeek]종료주차 onSetFocus 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 26
	 */
	moPage.onSetFocus_RdCbbProfEndWeek = function() {
		// 시작주차 종료주차 필터링
		doFilterWeek();
		
		// 담당교수 시간중복체크
		var vnIdx = util.Grid.getIndex(app, "grdCcsTimeProf");
		doOnChangeTimeProf(function(pbSuccess) {
			if (pbSuccess){
				util.Grid.setCellValue(app, "grdCcsTimeProf", "END_WEEK", "", vnIdx);
				util.Grid.setCellValue(app, "grdCcsTimeProf", "END_WEEK_PRT", "", vnIdx);
			}
		});
	};
	
	/**
	 * @desc 시작주차 종료주차 필터링
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 26
	 */
	function doFilterWeek(){
		// 강의유형
		var vsLectTypeRcd = util.Grid.getCellValue(app, "grdCcsOpenSub", "LECT_TYPE_RCD");
		if(ValueUtil.fixNull(vsLectTypeRcd) == "CA209CYBER"){
			ExtControl.setAttr("rdCbbProfStWeek", "nodeset", "/root/resList/monWeekList/row[child::CYBER = 'Y']");
			ExtControl.setAttr("rdCbbProfEndWeek", "nodeset", "/root/resList/monWeekList/row[child::CYBER = 'Y']");
		}else {
			ExtControl.setAttr("rdCbbProfStWeek", "nodeset", "/root/resList/monWeekList/row[child::CYBER != 'Y']");
			ExtControl.setAttr("rdCbbProfEndWeek", "nodeset", "/root/resList/monWeekList/row[child::CYBER != 'Y']");
		}
		util.Control.redraw(app, ["rdCbbProfStWeek", "rdCbbProfEndWeek"]);
	};

	/**
	 * @desc 담당교수 시간중복체크
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 26
	 */
	function doOnChangeTimeProf(poCallBackFunc) {
		
		var vsProfObjNo  = util.Grid.getCellValue(app, "grdCcsTimeProf", "PROF_OBJ_NO");
		var vsStWeek  = util.Grid.getCellValue(app, "grdCcsTimeProf", "ST_WEEK");
		var vsEndWeek = util.Grid.getCellValue(app, "grdCcsTimeProf", "END_WEEK");
		var vsWdayRcd = util.Grid.getCellValue(app, "grdCcsTimeProf", "WDAY_RCD");
		var vsStTime = util.Grid.getCellValue(app, "grdCcsTimeProf", "ST_TIME");
		var vsEndTime = util.Grid.getCellValue(app, "grdCcsTimeProf", "END_TIME");
		var vsUptStatus = util.Grid.getCellValue(app, "grdCcsTimeProf", "UPT_STATUS");
		
		if (ValueUtil.isNull(vsProfObjNo) || ValueUtil.isNull(vsStWeek) || ValueUtil.isNull(vsEndWeek) 
			|| ValueUtil.isNull(vsWdayRcd) || ValueUtil.isNull(vsStTime) || ValueUtil.isNull(vsEndTime)
			|| ValueUtil.fixNull(vsUptStatus) != "N") {
			return;
		}
		
		// 강의유형 : 온라인[CA209CYBER]
		var vsLectTypeRcd = util.DataMap.getValue(app, "dmReqKey", "strLectTypeRcd");
		// 강의유형이 온라인인 경우, 중복시간을 확인하지 않는다.
		if(ValueUtil.fixNull(vsLectTypeRcd) == "CA209CYBER") return;
		// 시작주 종료주가 0일경우 중복시간을 확인하지 않는다. (사이버강의 현장실습 체크 제외)
		if(ValueUtil.fixNull(vsStWeek) == "0" || ValueUtil.fixNull(vsEndWeek) == "0") return;
		
		util.DataMap.setValue(app, "dmReqChcKey", "strProfObjNo", vsProfObjNo);
		util.DataMap.setValue(app, "dmReqChcKey", "strStWeek", vsStWeek);
		util.DataMap.setValue(app, "dmReqChcKey", "strEndWeek", vsEndWeek);
		util.DataMap.setValue(app, "dmReqChcKey", "strWdayRcd", vsWdayRcd);
		util.DataMap.setValue(app, "dmReqChcKey", "strStTime", vsStTime);
		util.DataMap.setValue(app, "dmReqChcKey", "strEndTime", vsEndTime);

		//strCommand: chkProf 
		util.Submit.send(app, "subChkProf", function(pbSuccess){
			if(pbSuccess){
				var vsProfYn = util.DataMap.getValue(app, "dmResList", "strProfYn");
				if (ValueUtil.fixNull(vsProfYn) == "N") {
					// "해당 시간에 수업이 있습니다."메시지 표시
					util.Msg.alert("NLS-CCS-M011");
					
					// 콜백함수 수행
					if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
				}
			}
		});
	};
	
	/**
	 * @desc [rdCbbProfRcogTimeCnt]인정시수 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 26
	 */
	moPage.onValueChanged_RdCbbProfRcogTimeCnt = function() {
		// 음수체크
		ValidUtil.checkIntegerDecimal("rdIpbProfRcogTimeCnt", 3, 0, true);
		
		// 인정시수 유효성체크
		if(!doChkRcogTimeCnt()){
			util.Grid.setCellValue(app, "grdCcsTimeProf", "RCOG_TIME_CNT", "");
		}
	};
	
	/**
	 * @desc 인정시수 유효성체크
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 28
	 */
	function doChkRcogTimeCnt(){
		// 유효성 true or false
		var vbValid = true;
		
		// 리피트 ID
		var vsRptId = "rptCcsTimeProf";
		// 리피트 RowCnt
		var vnRowCnt 	= util.Grid.getRowCount(app, vsRptId);		
		
		// 인정시수합계
		var vnRcogTimeCntSum = 0;		
		// 강의시수
		var vnLectTimeCnt = util.Grid.getCellValue(app, "grdCcsOpenSub", "LECT_TIME_CNT");
		
		for (var i = 0; i < vnRowCnt; i++) {
			var vnIdx = i+1;
			
			var vsUptStatus = util.Grid.getCellValue(app, vsRptId, "UPT_STATUS", vnIdx);
			// 삭제일경우 Skip
			if (vsUptStatus == "D") continue;
			
			// 인정시수
			var vnRcogTimeCnt = 0;
			var vsRcogTimeCnt = util.Grid.getCellValue(app, vsRptId, "RCOG_TIME_CNT", vnIdx);
			if(!ValueUtil.isNull(vsRcogTimeCnt)){
				vnRcogTimeCnt = Number(vsRcogTimeCnt);
			}
			
			vnRcogTimeCntSum = vnRcogTimeCntSum + vnRcogTimeCnt;	
		}
		
		// 인정시수가 강의시수를 초과하는지 검사
		if(vnRcogTimeCntSum > vnLectTimeCnt){
			// "@의 합[@]이(가) @[@]을(를) 초과합니다." 메시지
			var vsMsgParam1 = ExtControl.getTextValue("rhBtnProfRcogTimeCnt");	// 인정시수
			var vsMsgParam2 = ExtControl.getTextValue("rhBtnLectTimeCnt");	// 강의시수
			util.Msg.alert("NLS-CCS-M068", [vsMsgParam1, vnRcogTimeCntSum, vsMsgParam2, vnLectTimeCnt]);
			
			vbValid = false;
			return vbValid;
		}
		
		return vbValid;
	};
	
	/**
	 * @desc [rdIpbProfLectPnt]인정학점 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 26
	 */
	moPage.onValueChanged_RdIpbProfLectPnt = function() {
		// 음수체크
		ValidUtil.checkIntegerDecimal("rdIpbProfLectPnt", 3, 0, true);
		
		// 인정학점 유효성체크
		if(!doChkLectPntCnt()){
			util.Grid.setCellValue(app, "grdCcsTimeProf", "LECT_PNT", "");
		}
	};
	
	/**
	 * @desc 인정학점 유효성체크
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 28
	 */
	function doChkLectPntCnt(){
		// 유효성 true or false
		var vbValid = true;
		
		// 리피트 ID
		var vsRptId = "rptCcsTimeProf";
		// 리피트 RowCnt
		var vnRowCnt 	= util.Grid.getRowCount(app, vsRptId);		
		
		// 인정학점합계
		var vnLectPntSum = 0;		
		// 학점
		var vnPnt = util.Grid.getCellValue(app, "grdCcsOpenSub", "PNT");
		
		for (var i = 0; i < vnRowCnt; i++) {
			var vnIdx = i+1;
			
			var vsUptStatus = util.Grid.getCellValue(app, vsRptId, "UPT_STATUS", vnIdx);
			// 삭제일경우 Skip
			if (vsUptStatus == "D") continue;
			
			// 인정학점
			var vnLectPnt = 0;
			var vsLectPnt = util.Grid.getCellValue(app, vsRptId, "LECT_PNT", vnIdx);
			if(!ValueUtil.isNull(vsLectPnt)){
				vnLectPnt = Number(vsLectPnt);
			}
			
			vnLectPntSum = vnLectPntSum + vnLectPnt;	
		}
		
		// 인정학점이 학점을 초과하는지 검사
		if(vnLectPntSum > vnPnt){
			// "@의 합[@]이(가) @[@]을(를) 초과합니다." 메시지
			var vsMsgParam1 = ExtControl.getTextValue("rhBtnProfLectPnt");	// 인정학점
			var vsMsgParam2 = ExtControl.getTextValue("rhBtnPnt");				// 학점
			util.Msg.alert("NLS-CCS-M068", [vsMsgParam1, vnLectPntSum, vsMsgParam2, vnPnt]);
			
			vbValid = false;
			return vbValid;
		}
		
		return vbValid;
	};
	
	/**
	 * @desc [rdIpbProfProfNm]교수명 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 26
	 */
	moPage.onValueChanged_RdIpbProfProfNm = function(sender) {
		// 주차정보 입력 확인
		if(doChkWeekInfo()){
			// 값변경시 교직원검색팝업 호출
			doOnChangeStdCmnPPrsnSearch(sender);
		}
	};
	
	/**
	 * @desc [rdBtnProfProfNm]교수명(돋보기) onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 26
	 */
	moPage.onClick_RdBtnProfProfNm = function(sender) {
		// 주차정보 입력 확인
		if(doChkWeekInfo()){
			// 교직원검색팝업 호출
			doOnClickStdCmnPPrsnSearch(sender);
		}
	};
	
	/**
	 * @desc [rptCcsTimeProf]분반별 시간/담당교수 onRowSelect 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 28
	 */
	moPage.onRowSelect_RptCcsTimeProf = function() {
//TO-BE: <ExtControl.refreshBind> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtControl.refreshBind(["bindRptCcsTimeProf", "bindRptCyberYn", "binReadOnly"]);
		
		util.Control.setEnable(app, false, "rdCbbProfEndWeek");
		
		
	};

	/**
	 * @desc 주차정보 입력 확인
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 26
	 */
	function doChkWeekInfo(){
		var vbValid = true;
		var vsStWeek = util.Grid.getCellValue(app, "grdCcsTimeProf", "ST_WEEK");
		var vsEndWeek = util.Grid.getCellValue(app, "grdCcsTimeProf", "END_WEEK");
		if(ValueUtil.isNull(vsStWeek) || ValueUtil.isNull(vsEndWeek)){
			// "주차정보를 입력하시기 바랍니다." 메시지
			util.Msg.alert("NLS-CCS-M067");
			util.Grid.setCellValue(app, "grdCcsTimeProf", "PROF_OBJ_NO", "", vnIdx);
			util.Grid.setCellValue(app, "grdCcsTimeProf", "PROF_NM", "", vnIdx);
			util.Grid.setCellValue(app, "grdCcsTimeProf", "PROF_NO", "", vnIdx);
			vbValid = false;
			return vbValid;
		}
		
		return vbValid;
	};
	
	/**
	 * @desc [rdCbbProfWdayRcd]요일 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 26
	 */
	moPage.onValueChanged_RdCbbProfWdayRcd = function() {
		// 담당교수 시간중복체크
		var vnIdx = util.Grid.getIndex(app, "grdCcsTimeProf");
		doOnChangeTimeProf(function(pbSuccess) {
			if (pbSuccess){
				util.Grid.setCellValue(app, "grdCcsTimeProf", "WDAY_RCD", "", vnIdx);
			}
		});
	};
	
	/**
	 * @desc [ipbLectRoomNm]강의실 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 26
	 */
	moPage.onClick_BtnLectRoomCd = function(sender) {
		// 강의실검색팝업 호출
		doOnClickStdCcsPRoomPopup(sender);
	};
	
	/**
	 * @desc [btnLectRoomCd]강의실(돋보기) onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 26
	 */
	moPage.onValueChanged_IpbLectRoomNm = function(sender) {
		 // 값변경시 강의실검색팝업 호출
		doOnChangeStdCcsPRoomPopup(sender);
	};

	/**
	 * @desc [btnLectRoomUse]강의실사용 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 2
	 */
	moPage.onClick_BtnLectRoomUse = function() {
		// 강의실입력여부 체크
		var vsLectRoomNm = util.Control.getValue(app, "ipbLectRoomNm");
		var vsLectRoomCd = util.DataMap.getValue(app, "dmResPopup", "strLectRoomCd");
		if(ValueUtil.isNull(vsLectRoomNm) || ValueUtil.isNull(vsLectRoomCd)){
			// "사용할 강의실을 입력해 주십시오."
			util.Msg.alert("NLS-CCS-M069");
			return false;
		}
		
		// 강의실 중복사용 체크
		if(!doChkOverLectUse()){
			return false;
		}
		
		// 2. 로우 선택 체크
		var vnSelectRowCnt = ExtInstance.getNodeListLength("/root/resList/rptCcsTimeSche/row[child::DEL_CKB='Y']");
				
		// 선택된로우가 있을경우 선택된로우만 Update
		if(vnSelectRowCnt > 0){
			var vsIdx = util.Grid.getCheckOrSelectedRowIndex(app, "grdCcsTimeSche");
			var vaIdx = vsIdx.split(",");
			
			for(var i=0; i<vnSelectRowCnt; i++){
				var vnIdx = vaIdx[i];
				
				util.Grid.setCellValue(app, "grdCcsTimeSche", "LECT_ROOM_NM", vsLectRoomNm, vnIdx);
				util.Grid.setCellValue(app, "grdCcsTimeSche", "LECT_ROOM_CD", vsLectRoomCd, vnIdx);
			}
		
		// 선택된로우가 없을경우 전체Update
		}else {
			var vnRowCnt = util.Grid.getRowCount(app, "grdCcsTimeSche");
			
			for(var i=0; i<vnRowCnt; i++){
				var vnIdx = i+1;

				util.Grid.setCellValue(app, "grdCcsTimeSche", "LECT_ROOM_NM", vsLectRoomNm, vnIdx);
				util.Grid.setCellValue(app, "grdCcsTimeSche", "LECT_ROOM_CD", vsLectRoomCd, vnIdx);
			}
		}
		
		// 리피트 변경사항 체크
		if(!util.Grid.isModified(app, ["grdCcsTimeSche"], "MSG")){
			return false;
		}else {
			doBtnRefresh(function(pbEnd) {
				if (pbEnd){
					// 강의실 사용/삭제 변경사항 저장
					doSaveSche();
				}
			});
		}	
	};
	
	/**
	 * @desc 강의실 중복사용 체크
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 2
	 */
	function doChkOverLectUse(){
		var vbValid = true;
		
		// 2. 로우 선택 체크
		var vnSelectRowCnt = ExtInstance.getNodeListLength("/root/resList/rptCcsTimeSche/row[child::DEL_CKB='Y']");
		var vnRowCnt = util.Grid.getRowCount(app, "grdCcsTimeSche");
		
		for (var i = 1; i <= 16; i++) {
			var vcBtnRefre = "";
			var vcBtnRefreDay = "";
			if (i < 10) {
				vcBtnRefre = "btn0" + i;
			} else {
				vcBtnRefre = "btn" + i;
			}
			for (var j = 1; j <= 6; j++) {
				vcBtnRefreDay = vcBtnRefre + "CL1020" + j;
				var vsBackGround = util.Control.getStyleAttr(app, vcBtnRefreDay, "background-color");
				
				// 중복시간일경우 : 강의시간표가 중복시간표 표시일경우
				if(vsBackGround == msOverColor){
					
					if(vnSelectRowCnt > 0){
						var vsIdx = util.Grid.getCheckOrSelectedRowIndex(app, "grdCcsTimeSche");
						var vaIdx = vsIdx.split(",");
						
						for(var k=0; k<vnSelectRowCnt; k++){
							var vnIdx = vaIdx[k];
							
							var vsWdayRcd = util.Grid.getCellValue(app, "grdCcsTimeSche", "WDAY_RCD", vnIdx);
							var vsLttm = util.Grid.getCellValue(app, "grdCcsTimeSche", "LTTM", vnIdx);
							var vsTmpLttm = ""+ vsLttm;
							if (Number(vsLttm) < 10) {
								vsTmpLttm = "0" + vsLttm;
							}
							
							var vcBtnRefreDaySelRow = "btn" + vsTmpLttm + vsWdayRcd;
							if(vcBtnRefreDay == vcBtnRefreDaySelRow){
								
								var vsLectRoomNm = util.Control.getValue(app, "ipbLectRoomNm");
								var vsWdayRcd = "CL1020"+j;
								var vsWdayRcdNm = ExtInstance.getValue("/root/resOnLoad/wdayRcdList/row", "CD_NM" , "child::CD='"+ vsWdayRcd +"'");
								// "@강의실 @요일 @교시에 이미 배정된 수업이 존재합니다. \n 강의시간표를 확인해 주십시오."
								util.Msg.alert("NLS-CCS-M070", [vsLectRoomNm, vsWdayRcdNm, i]);
								
								vbValid = false;
								return vbValid;
							}else {
								continue;
							}
						} // for k;
					// 선택된로우가 없을경우 전체Update
					}else {
						for(var k=0; k<vnRowCnt; k++){
							
							var vnIdx = k+1;
							var vsWdayRcd = util.Grid.getCellValue(app, "grdCcsTimeSche", "WDAY_RCD", vnIdx);
							var vsLttm = util.Grid.getCellValue(app, "grdCcsTimeSche", "LTTM", vnIdx);
							var vsTmpLttm = ""+ vsLttm;
							if (Number(vsLttm) < 10) {
								vsTmpLttm = "0" + vsLttm;
							}
							
							var vcBtnRefreDaySelRow = "btn" + vsTmpLttm + vsWdayRcd;
							if(vcBtnRefreDay == vcBtnRefreDaySelRow){
								var vsLectRoomNm = util.Control.getValue(app, "ipbLectRoomNm");
								var vsWdayRcd = "CL1020"+j;
								var vsWdayRcdNm = ExtInstance.getValue("/root/resOnLoad/wdayRcdList/row", "CD_NM" , "child::CD='"+ vsWdayRcd +"'");
								// "@강의실 @요일 @교시에 이미 배정된 수업이 존재합니다. \n 강의시간표를 확인해 주십시오."
								util.Msg.alert("NLS-CCS-M070", [vsLectRoomNm, vsWdayRcdNm, i]);
								
								vbValid = false;
								return vbValid;
							}else {
								continue;
							}
						} // for k;
					}
				}
			}// for j;
		}// for i;
		
		return vbValid;
	};
	
	/**
	 * @desc [btnLectRoomDel]강의실삭제 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 2
	 */
	moPage.onClick_BtnLectRoomDel = function() {
		// 강의실이 없을경우 return
		var vnCnt = util.Grid.getRowCount(app, "grdCcsTimeSche");
		var vbRoomYn = false;
		for(var i=0; i<vnCnt; i++){
			var vsRoom = util.Grid.getCellValue(app, "grdCcsTimeSche", "LECT_ROOM_CD", i+1);
			if(!ValueUtil.isNull(vsRoom)){
				vbRoomYn = true;
				break;
			}
		}
		if(!vbRoomYn){
			return false;
		}
		
		//  로우 선택 체크
		var vnSelectRowCnt = ExtInstance.getNodeListLength("/root/resList/rptCcsTimeSche/row[child::DEL_CKB='Y']");
				
		// 선택된로우가 있을경우 선택된로우만 Update
		if(vnSelectRowCnt > 0){
			var vsIdx = util.Grid.getCheckOrSelectedRowIndex(app, "grdCcsTimeSche");
			var vaIdx = vsIdx.split(",");
			
			for(var i=0; i<vnSelectRowCnt; i++){
				var vnIdx = vaIdx[i];
				
				util.Grid.setCellValue(app, "grdCcsTimeSche", "LECT_ROOM_NM", "", vnIdx);
				util.Grid.setCellValue(app, "grdCcsTimeSche", "LECT_ROOM_CD", "", vnIdx);
			}
		
		// 선택된로우가 없을경우 전체Update
		}else {
			var vnRowCnt = util.Grid.getRowCount(app, "grdCcsTimeSche");
			
			for(var i=0; i<vnRowCnt; i++){
				var vnIdx = i+1;

				util.Grid.setCellValue(app, "grdCcsTimeSche", "LECT_ROOM_NM", "", vnIdx);
				util.Grid.setCellValue(app, "grdCcsTimeSche", "LECT_ROOM_CD", "", vnIdx);
			}
		}
		
		doBtnRefresh(function(pbEnd) {
			if (pbEnd){
				// 강의실 사용/삭제 변경사항 저장
				doSaveSche();
			}
		});
	};
	
	/**
	 * @desc 강의실 사용/삭제 변경사항 저장
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 2
	 */
	function doSaveSche() {
		
		// 리피트 변경사항 체크
		if(!util.Grid.isModified(app, ["grdCcsTimeSche"], "MSG")){
			return false;
		}
		
		//strCommand: save 
		util.Submit.send(app, "subSave", function(pbSuccess){
			if(pbSuccess){
				// 강의실 조회
				doTimeScheList(function(pbListSuccess) {
					// 조회 : "갱신된 데이터가 조회되었습니다." header 메세지 표시
					if (pbListSuccess) util.Msg.notify(app, "NLS.INF.M025");
					// 강의시간표 설정
					doSetSchedule();
				});
			}else {
				// Exception 발생시 값 되돌림
				var vnRowCnt = util.Grid.getRowCount(app, "grdCcsTimeSche");
				for(var i=0; i<vnRowCnt; i++){
					var vnIdx = i+1;
					
					var vcRpt = model.getControl("rptCcsTimeSche");
					var voDataSet = vcRpt.dataSet;
					
					util.Grid.setRowState(app, "grdCcsTimeSche", cpr.data.tabledata.RowState.UNCHANGED, vnIdx);
					voDataSet.restoreOriginVal(vnIdx);
				}
				util.DataMap.setValue(app, "dmRptPanel", "del_ckb", "");
				ExtRepeat.refresh("rptCcsTimeSche");
			}
		});
	};
	
	/**
	 * @desc [rhCkbSelect]패널 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 2
	 */
	moPage.onValueChanged_RhCkbSelect = function() {
		// 리피트 패널 설정
//TO-BE: <ExtRepeat.selectedAllPanel> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.selectedAllPanel("rhCkbSelect");
	};
	
	/**
	 * @desc [btnLoomSchdule]강의시간표 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 2
	 */
	moPage.onClick_BtnLoomSchdule = function(sender) {
		// 강의실별 시간표 검색팝업 호출
		doOnClickStdCcsPTimeSche(sender);
	};
	
	/**
	 * @desc [rptCcsTimeProf]분반별 시간/담당교수 onUpdate 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 2
	 */
	moPage.onUpdate_RptCcsTimeProf = function() {
		// 디테일 리피트 상태에 따른 마스터 활성화 제어
		doDtlRptStatus();
	};
	
	/**
	 * @desc [ipbSbNm]교과목명 onKeyDown 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 2
	 */
	moPage.onKeyDown_IpbSbNm = function(strKeyType, strKeyStatus) {
		// 엔터키 입력시 조회
		if(e.keyCode == cpr.events.KeyCode.ENTER){
			var vsSchYearRcd = util.Control.getValue(app, "cbbSchYearRcd");
			var vsSmtRcd = util.Control.getValue(app, "cbbSmtRcd");
			var vsDeptNm = util.Control.getValue(app, "ipbDeptNm");
			
			// 필수값 입력되었을경우 조회
			if(!ValueUtil.isNull(vsSchYearRcd) && !ValueUtil.isNull(vsSmtRcd) && !ValueUtil.isNull(vsDeptNm)){
				util.Header.clickSearch(app);
			}
		}
	};
	
	/**
	 * @desc [ipbDivclsNm]분반명 onKeyDown 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 2
	 */
	moPage.onKeyDown_IpbDivclsNm = function(strKeyType, strKeyStatus) {
		// 엔터키 입력시 조회
		if(e.keyCode == cpr.events.KeyCode.ENTER){
			var vsSchYearRcd = util.Control.getValue(app, "cbbSchYearRcd");
			var vsSmtRcd = util.Control.getValue(app, "cbbSmtRcd");
			var vsDeptNm = util.Control.getValue(app, "ipbDeptNm");
			
			// 필수값 입력되었을경우 조회
			if(!ValueUtil.isNull(vsSchYearRcd) && !ValueUtil.isNull(vsSmtRcd) && !ValueUtil.isNull(vsDeptNm)){
				util.Header.clickSearch(app);
			}
		}
	};
	
	/**
	 * @desc [btnLoomSchdulePrt]강의실별시간표 onKeyDown 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 2
	 */
	moPage.onClick_BtnLoomSchdulePrt = function() {
		
		var vsSchYearRcd = util.Control.getValue(app, "cbbSchYearRcd");
		var vsSmtRcd = util.Control.getValue(app, "cbbSmtRcd");
		var vsKeyDate = util.DataMap.getValue(app, "dmKeyDateMap", "END_DT");
		var vsRoomCd = util.DataMap.getValue(app, "dmResPopup", "strLectRoomCd");
				
		var voParam = {
				p_strLanDivRcd 		: msDefaultLocale,	 			// 언어키
				p_strKeyDate 		: vsKeyDate, 						// 기준일
				p_strSchYearRcd	: vsSchYearRcd, 				// 학년도
				p_strSmtRcd 			: vsSmtRcd,	   					// 학기
				p_strRoomCd	 		: vsRoomCd,       				// 강의실코드
				p_strMenuId 			: moPageInfo.menuId,			 // 메뉴ID
				p_strCheckAuthId 	: moUserInfo.id					// 사용자ID
		};
		
		var vsTitle = "강의실 시간표";
		
		var voOzFormParam = {
			  TITLE 		 : vsTitle			// 리포트타이틀
			, SUB_TITLE 	 : "" 					// 리포트서브타이틀		
			, FORM_TYPE : "flash"
		};
		
		ReportUtil.fOzPopupOpen("강의실 시간표", "extCcsSRoomSchdList", voOzFormParam, voParam);
	};
	
	
	moPage.onClick_BtnNew1 = function() {
		
		var vaWdayRcd = [
		    'CL10201'	//--월
			,'CL10202'	//--화
			,'CL10203'	//--수
			,'CL10204'	//--목
			,'CL10205'	//--금
		];
		
		var vsLectTypeRcd = util.Grid.getCellValue(app, "grdCcsOpenSub", "LECT_TYPE_RCD");		// 강의유형 : 온라인강의[CA209CYBER]
		var vsDclRcdCd = util.Grid.getCellValue(app, "grdCcsOpenSub", "DCL_RCD_CD");				// 학문분야코드 : 현장실습[CA21240]
		var vsCmpDivRcd = util.Grid.getCellValue(app, "grdCcsOpenSub", "CMP_DIV_RCD");			// 이수구분
		var vsRefKey = util.Grid.getCellValue(app, "grdCcsOpenSub", "REF_KEY");							// 참조키
		var vsPnt = util.Grid.getCellValue(app, "grdCcsOpenSub", "PNT");										// 학점
		var vsTheoTc = util.Grid.getCellValue(app, "grdCcsOpenSub", "THEO_TC");						// 이론
		var vsEpacTc = util.Grid.getCellValue(app, "grdCcsOpenSub", "EPAC_TC");						// 실습
		
		var vsInitRptIndex = util.Grid.getIndex(app, "grdCcsTimeProf");
		var vsWdayRcd = util.Grid.getCellValue(app, "grdCcsTimeProf", "WDAY_RCD", vsInitRptIndex);
		
		
		/*
			CL10201	월
			CL10202	화
			CL10203	수
			CL10204	목
			CL10205	금
		*/
		
		for(var i = 0 ; i<vaWdayRcd.length ; i++){
		
			if(vaWdayRcd[i] == vsWdayRcd){
				continue;
			}
		
			// 신규로우 추가
			var vnIdx = util.Grid.insertRow(app, "grdCcsTimeProf");
			
			ExtRepeat.copyToRowData("rptCcsTimeProf", vsInitRptIndex, "rptCcsTimeProf", vnIdx);
			util.Grid.setCellValue(app, "grdCcsTimeProf", "WDAY_RCD", vaWdayRcd[i] , vnIdx);
			util.Grid.setCellValue(app, "grdCcsTimeProf", "REP_PROF_YN", "" , vnIdx); //--대표교수 빈값
			
		}
		
		
		// 디테일 리피트 상태에 따른 마스터 활성화 제어
		doDtlRptStatus();
	}
	return moPage;
};
