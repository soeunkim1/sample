//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCgdSSceneRecRslt.xtm"/>

/**
 * 현장실습결과 점수표
 * @class extCgdSSceneRecRslt
 * @author 박갑수 at 2016. 10. 4
 */
var extCgdSSceneRecRslt = function() {
	var moPage = new Page();
	
	// 임포트용 데이터 통신 오브젝트
	var moPObject = new Page();
	
	// 객체검색팝업 호출
	moPObject.moIdsForStdCmnPObjSch = [
	{
		controlId			:	"btnSaCdNm",
		iCd					:	"",
		iNm					:	"ipbSaCdNm",
		iObjDivRcd			:	["CC009OG", "CC009SA"],
		iStartObject    	:   "",
		iOtDivRcd			:	"",
		iOtIsTreeView	:	"",
		iLanDivRcd		:	"",
		iKeyDate			:	"/root/keyDateMap/END_DT",
		iKeyEndDate		:	"",
		oObjDivRcd		:	"/root/reqKey/strObjDivRcd",
		oCd					:	"/root/reqKey/strObjCd",
		oCdNm				:	"ipbSaCdNm",
		oBegDt				:	"",
		oEndDt				:	"",
		oLanDivRcd		:	"",
		func 					:  function(){
		}
	}];
	
	
	
	// 교직원검색팝업 호출
	moPObject.moIdsForStdCmnPPrsnSearch = [
	{ 
		 controlId					: "btnProfId",
		 istrStaffGrpAuth			: "",					
		 istrWkdtyAuth			: "true",
		 iKeyDate					: "/root/keyDateMap/END_DT",
		 iStaffNo					: "ipbProfNm",				
		 iStaffGrpRcd				: "",	
		 iStaffGrpRcdLock		: "", 				
		 iStaffSubGrpRcd		: "",				
		 iStaffSubGrpRcdLock	: "",		
		 iStatusRcd				: "",		
		 iRepNm					: "ipbProfNm",		
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
			 
			 // 값이 없는 경우 초기화
			if(ValueUtil.isNull(util.DataMap.getValue(app, "dmReqKey", "strProfObjNo"))) {
				// 조회조건(담당교과목) 콤보박스 초기화
				doClearChargeSb();
				
			// 값이 있는 경우 담당교과목록 조회
			} else {
				// 담당교과목목록 조회
				doChargeSbList(function(pbSuccess) {
					if(pbSuccess) util.SelectCtl.selectItem(app, "cbbRefKey", 0);
				});
			}
		}
	}];
	
	
	
	// 학년도 ,학기, 출력순서를 원래데이터로 되돌리기위한 변수
	var msSchYearRcd = "";
	var msSmtRcd = "";
	
	/**
	 * @desc import 헤더 초기화
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 10. 4
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		doHeaderOnLoad();
	};
	
	/**
	 * @desc onLoad 실행
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 10. 4
	 */
	moPage.onModelConstructDone_ExtCgdSSceneRecRslt = function() {
		// 검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grpData"]);
		
		// 권한에 따른 조회조건 활성화
		doVisibleCtlByAuth();
		
		// 서브미션 실행 (실패시 cover page)
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				
				// 조회조건 컨트롤 refresh
				util.Control.redraw(app, ["cbbSchYearRcd", "cbbSmtRcd"]);
				
				
				
				// 전체권한[CC00102]인 경우
					if( moPageInfo.authRngRcd == "CC00102") {
						
						// 라디오버튼 교수명으로 default값 세팅
						util.Control.setValue(app, "rdbProfOrSb", "DEPT");
						page.onValueChanged_RdbProfOrSb();
				
						setStdCmnPObjSchObjInfo();
					}else{
						page.doChargeSbList();
					}
				
			}
		}, true);
	};
	
	
	/**
	 * 권한에 따른 조회조건 활성/비활성 처리
	 * @param 
	 * @type void
	 * @author 양선하 2016.05.10
	 */	
	function doVisibleCtlByAuth() {
		
		// 전체권한[CC00102]이 아닌 경우 컨트롤 비활성화
		if( moPageInfo.authRngRcd == "CC00104") {
			
			util.Control.setValue(app, "rdbProfOrSb", "PROF");
			page.onValueChanged_RdbProfOrSb();
			// 교수명 세팅
			util.Control.setValue(app, "ipbProfNm", moUserInfo.userNm);
			util.DataMap.setValue(app, "dmReqKey", "strProfObjNo", moUserInfo.id);
			util.Control.setStyleAttr(app, "ipbProfNm", "width", 140);
			// 교과목 검색, 교수검색버튼 숨김
			util.Control.setVisible(app, false, ["lblClassRcdNm", "ipbClassRcdNm", "ipbProcRsltYear", "lblProcRsltYear", "btnSaCdNm", "ipbSaCdNm", "lblSaCdNm", "btnProfId"]);
			// 교수명 라벨 보이기
			util.Control.setVisible(app, true, ["lblProfNm"]);
			// 학년도, 학기, 구분(교수별,과목별), 교수명 비활성화
			util.Control.setEnable(app, false, ["cbbSchYearRcd", "cbbSmtRcd", "rdbProfOrSb", "ipbProfNm"]);
			
			
		}
		
	};
	
	
	
	/**
	 * @desc [cbbSchYearRcd]학년도 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 10. 4
	 */
	moPage.onValueChanged_CbbSchYearRcd = function() {
		// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
		doChangeYearSmt("year");
		
		doClearSchCtl();
		
		// 조회조건(담당교과목) 콤보박스 초기화
		doClearChargeSb();
		
		// 조회조건 초기화
		doClearSch();
	};
	
	/**
	 * @desc [cbbSmtRcd]학기 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 10. 4
	 */
	moPage.onValueChanged_CbbSmtRcd = function() {
		// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
		doChangeYearSmt("smt");
		
		doClearSchCtl();
		
		// 조회조건(담당교과목) 콤보박스 초기화
		doClearChargeSb();
		
		// 조회조건 초기화
		doClearSch();
	};
	
	/**
	 * @desc [btnSaCdNm]소속(돋보기버튼) onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 10. 4
	 */
	moPage.onClick_BtnSaCdNm = function(sender) {
		// 객체검색팝업 호출
		doOnClickStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc [ipbSaCdNm]소속 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 10. 4
	 */
	moPage.onValueChanged_IpbSaCdNm = function(sender) {
		// 값변경시 객체검색팝업 호출
		doOnChangeStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 10. 4
	 */
	function doChangeYearSmt(psDiv) {
		//strCommand: date 
		util.Submit.send(app, "subDate", function(pbSuccess){
			if(pbSuccess){				
				msSchYearRcd = util.DataMap.getValue(app, "dmKeyDateMap", "YEAR");
				msSmtRcd = util.DataMap.getValue(app, "dmKeyDateMap", "SMT");
				
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
	 * @desc 조회조건 초기화
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 10. 4
	 */
	function doClearSch(){
		util.Control.setValue(app, "ipbSaCdNm", "");
		util.DataMap.setValue(app, "dmReqKey", "strObjCd", "");
		util.DataMap.setValue(app, "dmReqKey", "strObjDivRcd", "");
		util.DataMap.setValue(app, "dmReqKey", "strListSaCd", "");
	};

	/**
	 * @desc [btnSearch]조회 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 10. 4
	 */
	moPage.onClick_BtnSearch = function() {
		
		var vsProfOrSb = util.Control.getValue(app, "rdbProfOrSb");
		var vaCtlId = ["cbbSchYearRcd", "cbbSmtRcd", "ipbSaCdNm"];
		if(vsProfOrSb == 'DEPT'){
			vaCtlId = ["cbbSchYearRcd", "cbbSmtRcd", "ipbSaCdNm"];
		}else{
			vaCtlId = ["cbbSchYearRcd", "cbbSmtRcd", "ipbProfNm"];
			util.DataMap.setValue(app, "dmReqKey", "strObjDivRcd", "CC009OG");
			util.DataMap.setValue(app, "dmReqKey", "strObjCd", "1000");
		}
		
		
		// 조회조건 필수 체크
		if(!util.validate(app, vaCtlId)){
			return false;
		}
		
		
		
		
		
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				var vsSchYearRcd = util.Control.getValue(app, "cbbSchYearRcd");
				var vsSmtRcd = util.Control.getValue(app, "cbbSmtRcd");
				var vsSaCdList = util.DataMap.getValue(app, "dmReqKey", "strListSaCd");
				var vsProfObjNo	= util.DataMap.getValue(app, "dmReqKey", "strProfObjNo");
				var vsRefKey		= util.DataMap.getValue(app, "dmReqKey", "strRefKey");
				
				if(vsProfOrSb == 'DEPT'){
					vsProfObjNo = "";
					vsRefKey = "";
					vsSaCdList = "AND CGD.SA_CD IN "+ vsSaCdList;
				}else{
					vsSaCdList = "";
				}
				
				var voParam = {
						p_strLanDivRcd 		: util.DataMap.getValue(app, "dmResOnLoad", "strLanDivRcd"),	// 언어키
						p_strKeyDate 		: util.DataMap.getValue(app, "dmKeyDateMap", "END_DT"),		// 기준일자
						p_strSchYearRcd 	: vsSchYearRcd,															// 학년도코드
						p_strSmtRcd 			: vsSmtRcd,																	// 학기코드
						p_strListSaCd		: vsSaCdList,			// 학사부서코드 In조건용
						p_strProcRsltYear	: util.Control.getValue(app, "ipbProcRsltYear"),							// 학년
						p_strClassRcdNm	: util.Control.getValue(app, "ipbClassRcdNm"),							// 학과반
						p_strProfObjNo		: vsProfObjNo,							// 교수
						p_strRefKey		    : vsRefKey,									//--개설과목
						p_strCheckAuthId 	: moUserInfo.id																// 사용자ID
				};
				
				var vsSchYearRcdNm = ExtInstance.getValue("/root/resOnLoad/schYearRcdList/row", "CD_NM" , "child::CD='"+ vsSchYearRcd +"'");
				var vsSmtRcdNm = ExtInstance.getValue("/root/resOnLoad/smtRcdList/row", "CD_NM" , "child::CD='"+ vsSmtRcd +"'");
			
				var vsTitle = vsSchYearRcdNm + " " + vsSmtRcdNm + " 현장실습결과 점수표";
				
				var voOzFormParam = {
					  TITLE 		 : vsTitle			// 리포트타이틀
					, SUB_TITLE 	 : "" 					// 리포트서브타이틀		
					, FORM_TYPE : "flash"
				};
				
				util.Report.open(app, "hojReport", "extCgdSSceneRecRslt", voOzFormParam, voParam);
			}
		});
	};
	
	
	
	moPage.onValueChanged_RdbProfOrSb = function() {
		
		var vsProfOrSb = util.Control.getValue(app, "rdbProfOrSb");
		var vbVisible = true;
		
		// 소속일 경우
		if(ValueUtil.fixNull(vsProfOrSb) == "DEPT"){
			util.Control.setVisible(app, true, ["lblClassRcdNm", "ipbClassRcdNm", "ipbProcRsltYear", "lblProcRsltYear", "btnSaCdNm", "ipbSaCdNm", "lblSaCdNm"]);
			util.Control.setVisible(app, false, ["lblProfNm", "ipbProfNm", "btnProfId", "cbbRefKey", "lblRefKey"]);
		// 교수일경우
		}else {
			util.Control.setVisible(app, false, ["lblClassRcdNm", "ipbClassRcdNm", "ipbProcRsltYear", "lblProcRsltYear", "btnSaCdNm", "ipbSaCdNm", "lblSaCdNm"]);
			util.Control.setVisible(app, true, ["lblProfNm", "ipbProfNm", "btnProfId", "cbbRefKey", "lblRefKey"]);
		}	
		
	}
	
	
	
	
	moPage.onClick_BtnProfId = function(poSender) {
		doOnClickStdCmnPPrsnSearch(poSender);
	}
	
	moPage.onValueChanged_IpbProfNm = function(poSender) {
		doOnChangeStdCmnPPrsnSearch(poSender);
	}
	
	
	/**
	 * @desc 담당교과목 콤보박스 reset
	 * @param 
	 * @return void
	 * @author 양선하 2016.05. 13
	 */
	function doClearChargeSb() {
		
		ExtSelectCtl.deleteAllItem("cbbRefKey");
		util.Control.setValue(app, "cbbRefKey", "");
	}
	
	
	/**
	 * @desc 조회조건(교수명, 개설과목 담당교과목)항목초기화
	 * @param 
	 * @return void
	 * @author 양선하 2016.05.10
	 */
	function doClearSchCtl() {
		
		// 교수명
		util.Control.setValue(app, "ipbProfNm", "");
		util.DataMap.setValue(app, "dmReqKey", "strProfObjNo", "");
		// 개설과목
		util.Control.setValue(app, "ipbSbNm", "");
		util.DataMap.setValue(app, "dmReqKey", "strRefKey", "");
	};
	
	
	/**
	 * @desc 담당교과목목록 조회
	 * @param {Function} poCallBackFunc 콜백 함수
	 * @return  void
	 * @author 양선하 2016.05.10
	 */
	function doChargeSbList(poCallBackFunc) {
		//strCommand: listChargeSb 
		util.Submit.send(app, "subChargeSbList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "cbbRefKey");
				util.SelectCtl.selectItem(app, "cbbRefKey", 0);
				
				// 조회 후 콜백함수 수행
				if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
			}
		});
	};
	
	
	return moPage;
};
