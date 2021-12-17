//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCcrSTlsnAplyCnfmSheet.xtm"/>

/**
 * 과목별 수강신청 현황
 * @class extCcrSTlsnAplyCnfmSheet
 * @author 유형기 at 2016. 6. 28
 */
var extCcrSTlsnAplyCnfmSheet = function() {
	var moPage = new Page();
	
	// 임포트용 데이터 통신 오브젝트
	var moPObject = new Page();
	
	// 객체검색팝업 호출
	moPObject.moIdsForStdCmnPObjSch = [
	{
		controlId			:	"btnSaCdNm",
		iCd					:	"",
		iNm					:	"ipbSaCdNm",
		iObjDivRcd			:	["CC009SA"],
		iStartObject    	:   "",
		iOtDivRcd			:	"",
		iOtIsTreeView	:	"",
		iLanDivRcd		:	"",
		iKeyDate			:	"/root/keyDateMap/ST_DT",
		iKeyEndDate		:	"",
		oObjDivRcd		:	"/root/reqKey/strObjDivRcd",
		oCd					:	"/root/reqKey/strObjCd",
		oCdNm				:	"ipbSaCdNm",
		oBegDt				:	"",
		oEndDt				:	"",
		oLanDivRcd		:	"",
		func 					:  function(){
			/*
			var vsObjCd = util.DataMap.getValue(app, "dmReqKey", "strObjCd");
			if(!ValueUtil.isNull(vsObjCd)){
				// 학사부서 In조건용
				doSaInList();
			}
			*/
		}
	}];
	
	// 학생검색팝업
	moPObject.moIdsForStdCsrPStSearch = [
	{
		controlId 					: "btnStudId",
		iStudNo 					: "ipbStudId",	
		iStudId 						: "",
		iStudNm 					: "",
		iKeyDate 					: "/root/keyDateMap/ST_DT", 
		iObjDivRcd 				: "CC009SA",
		iObjCd 						: "",
		iObjNm 					: "",
		iStatRcd 					: "",
		iStudDivRcd				: "",
		oStudId 					: "/root/reqKey/strStudId",
		oStudNo 					: "ipbStudId",
		oStudNm 					: "",
		oStatNm 					: "",
		oStatRcd 					: "",
		oProcRslt 					: "",
		oProcRsltYear 			: "",
		oSaNm						: "",
		oSaCd 						: "/root/reqKey/strStudSaCd",
		oSpNm 					: "",
		oSpCd 						: "",
		oOgNm 					: "",
		oOgCd 						: "",
		oStudDivRcd				: "",
		oStudDivNm				: "",
		oBirthday					: "",
		oGenderRcd				: "",
		oGenderNm				: "",
		func : function() {
			
			// 검색조건이 있을경우 조회
			
			var vsSchYearRcd = util.Control.getValue(app, "cbbSchYearRcd");
			var vsSmtRcd = util.Control.getValue(app, "cbbSmtRcd");
			var vsStudId = util.DataMap.getValue(app, "dmReqKey", "strStudId");
			
			if(!ValueUtil.isNull(vsSchYearRcd) && !ValueUtil.isNull(vsSmtRcd) && !ValueUtil.isNull(vsStudId)){
				util.Header.clickSearch(app);
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
	 * @author 유형기 at 2016. 6. 28
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		doHeaderOnLoad();
	};
	
	/**
	 * @desc onLoad 실행
	 * @param 
	 * @return void
	 * @author 유형기 at 2016. 6. 28
	 */
	moPage.onModelConstructDone_ExtCcrSTlsnAplyCnfmSheet = function() {
		
		// 검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grpData"]);
		
		// 권한에따른 교수명 컬럼 검색가능 여부
		doVisibleCtlByAuth();
		
		if (moPageInfo.authRngRcd == "CC00104") {
			util.Control.setValue(app, "radiobutton4", "STUD");
			util.DataMap.setValue(app, "dmReqKey", "strDiv", "STUD");
		}else {
			util.Control.setValue(app, "radiobutton4", "DEPT");
			util.DataMap.setValue(app, "dmReqKey", "strDiv", "DEPT");
		}
		
		// 서브미션 실행 (실패시 cover page)
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				
				// 조회조건 컨트롤 refresh(학년도, 학기)
				util.Control.redraw(app, ["cbbSchYearRcd", "cbbSmtRcd", "cbbClassRcd"]);
				util.SelectCtl.selectItem(app, "cbbClassRcd", 0);
				setStdCmnPObjSchObjInfo();
				
				page.onValueChanged_Radiobutton4();				
			}
		}, true);
	};
	
	/**
	 * 권한에 따른 조회조건 컨트롤 활성/비활성 처리
	 * @param 
	 * @type void
	 * @author 박갑수 at 2016. 6. 29
	 */	
	function doVisibleCtlByAuth() {
		
		// 개인권한[CC00104] : 
		if (moPageInfo.authRngRcd == "CC00104") {
			util.Control.setVisible(app, false, ["btnStudId"]);
			util.Control.setEnable(app, false, ["radiobutton4", "ipbStudId", "cbbSchYearRcd", "cbbSmtRcd"]);
			
			util.Control.setValue(app, "ipbStudId", moUserInfo.studNo);
			util.DataMap.setValue(app, "dmReqKey", "strStudId", moUserInfo.id);
		}
	};
	
	/**
	 * @desc [cbbSchYearRcd]학년도 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 유형기 at 2016. 6. 28
	 */
	moPage.onValueChanged_CbbSchYearRcd = function() {
		// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
		doChangeYearSmt("year");
		
		// 조회조건 초기화
		doClearSch();
	};
	
	/**
	 * @desc [cbbSmtRcd]학기 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 유형기 at 2016. 6. 28
	 */
	moPage.onValueChanged_CbbSmtRcd = function() {
		// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
		doChangeYearSmt("smt");
		
		// 조회조건 초기화
		doClearSch();
	};
	
	/**
	 * @desc 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
	 * @param 
	 * @return void
	 * @author 유형기 at 2016. 6. 28
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
	 * @desc 조회조건(학사부서) 초기화
	 * @param 
	 * @return void
	 * @author 유형기 at 2016. 6. 28
	 */
	function doClearSch(){
		util.Control.setValue(app, "ipbSaCdNm", "");
		util.DataMap.setValue(app, "dmReqKey", "strObjCd", "");
		util.DataMap.setValue(app, "dmReqKey", "strObjDivRcd", "");
		util.DataMap.setValue(app, "dmReqKey", "strListSaCd", "");
		util.Control.setValue(app, "ipbGradeRcd","");
		util.Control.setValue(app, "cbbClassRcd","");
		util.Control.setValue(app, "ipbStudId","");
		
	};
	
	/**
	 * @desc [btnSaCdNm]소속(돋보기버튼) onClick 이벤트
	 * @param 
	 * @return void
	 * @author 유형기 at 2016. 6. 28
	 */
	moPage.onClick_BtnSaCdNm = function(sender) {
		// 객체검색팝업 호출
		doOnClickStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc [ipbSaCdNm]소속 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 유형기 at 2016. 6. 28
	 */
	moPage.onValueChanged_IpbSaCdNm = function(sender) {
		// 값변경시 객체검색팝업 호출
		doOnChangeStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc [btnSearch]조회 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 유형기 at 2016. 6. 28
	 */
	moPage.onClick_BtnSearch = function() {
		
		
		var vsSchDiv = util.DataMap.getValue(app, "dmReqKey", "strDiv");
		if(vsSchDiv == 'STUD'){
			util.Control.setUserAttr(app, "ipbStudId" , "require" , "Y");
			util.Control.setUserAttr(app, "ipbSaCdNm" , "require" , "");
		}else{
			util.Control.setUserAttr(app, "ipbStudId" , "require" , "");
			util.Control.setUserAttr(app, "ipbSaCdNm" , "require" , "Y");
		}
		
		
		//필수값 체크
		if(!util.validate(app, ["grpSearch"])) return false;
		
		
		var vsSchDiv = util.DataMap.getValue(app, "dmReqKey", "strDiv");
		var vsStudNo 	= "";
		var vsGradeRcd = "";	//--학년
		var vsClassRcd 	= "";	//--반
		if(vsSchDiv == "DEPT"){
		
			util.DataMap.setValue(app, "dmReqKey", "strReqObjCd", util.DataMap.getValue(app, "dmReqKey", "strObjCd"));
			util.DataMap.setValue(app, "dmReqKey", "strReqObjDivRcd", util.DataMap.getValue(app, "dmReqKey", "strObjDivRcd"));			
			vsStudNo= "";
			vsGradeRcd	= util.Control.getValue(app, "ipbGradeRcd");
			vsClassRcd	= util.Control.getValue(app, "cbbClassRcd");
		}else{
			
			util.DataMap.setValue(app, "dmReqKey", "strReqObjCd", util.DataMap.getValue(app, "dmReqKey", "strStudSaCd"));
			util.DataMap.setValue(app, "dmReqKey", "strReqObjDivRcd", "CC009SA");			
			vsStudNo = util.DataMap.getValue(app, "dmReqKey", "strStudId");
			vsGradeRcd = "";
			vsClassRcd ="";
		}
				
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				var vsSchYearRcd = util.Control.getValue(app, "cbbSchYearRcd");
				var vsSmtRcd = util.Control.getValue(app, "cbbSmtRcd");
				
				// 개인권한일경우 학사부서 In조건 세팅
				if(moPageInfo.authRngRcd == "CC00104"){
					util.DataMap.setValue(app, "dmReqKey", "strListSaCd", "('" + moUserInfo.asgnDeptCd + "')");
				}
				
				var voParam = {
						p_strLanDivRcd 		: util.DataMap.getValue(app, "dmResOnLoad", "strLanDivRcd"),				// 언어키
						p_strKeyDate 		: util.DataMap.getValue(app, "dmKeyDateMap", "END_DT"),					// 기준일자
						p_strSchYearRcd 	: vsSchYearRcd,																		// 학년도코드
						p_strSmtRcd 			: vsSmtRcd,																				// 학기코드
						p_strListSaCd		: util.DataMap.getValue(app, "dmReqKey", "strListSaCd"),						// 학사부서코드 In조건용
						p_strCheckAuthId 	: moUserInfo.id,																			// 사용자ID
						p_strGradeRcd		: vsGradeRcd, 									// 학년
						p_strClassRcd		: vsClassRcd, 					// 반
						p_strStudNo			: vsStudNo				        // 학번
				};

				var vsTitle = "수강신청확인 및 변경원";
				
				var voOzFormParam = {
					  TITLE 		 : vsTitle			// 리포트타이틀
					, SUB_TITLE 	 : "" 					// 리포트서브타이틀		
					, FORM_TYPE : "flash"
				};
				
				util.Report.open(app, "hojReport", "extCcrSTlsnAplyCnfmSheet", voOzFormParam, voParam);
			}
		});
		
		
	}
	
	/**
	 * @desc 객체 하위 학사부서 In조건용 String 조회
	 * @param 
	 * @return void
	 * @author 유형기 at 2016. 6. 28
	 */
	function doSaInList(){
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				
			}
		});
	};
	
	
	moPage.onClick_BtnStudId = function(sender) {
		// 학생검색팝업 호출
		doOnClickStdCsrPStSearch(sender);
	}
	
	moPage.onValueChanged_IpbStudId = function(sender) {
		// 값변경시 학생검색팝업 호출
		doOnChangeStdCsrPStSearch(sender);
	}
	
	
	/*
		소속 / 학생에 따라 컨트롤을 보이기 안보이기 한다.
	*/
	moPage.onValueChanged_Radiobutton4 = function() {
		
		var vsSchDiv = util.DataMap.getValue(app, "dmReqKey", "strDiv");
		
		var vaDept = ["lblSaCdNm", "ipbSaCdNm", "btnSaCdNm", "lblGradeRcd", "ipbGradeRcd", "lblClassRcd", "cbbClassRcd"];
		var vaStud	= ["lblStId", "ipbStudId", "btnStudId"];
		
		
		if(vsSchDiv == "STUD"){
			util.Control.setVisible(app, true, vaStud);
			util.Control.setVisible(app, false, vaDept);
			
			
		}else{
			util.Control.setVisible(app, false, vaStud);
			util.Control.setVisible(app, true, vaDept);
		}
		
		
	};
	
	
	
	return moPage;
};
