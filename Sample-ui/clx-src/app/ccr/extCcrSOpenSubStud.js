//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCcrSOpenSubStud.xtm"/>

/**
 * 수강과목조회
 * @class extCcrSOpenSubStud
 * @author 박갑수 at 2016. 6. 29
 */
var extCcrSOpenSubStud = function() {
	var moPage = new Page();
	
	// 탭 정의
	var TAB = {
		// 금학기수강
		CCR	: "tabCcr",
		// 이수교과목
		CGD  : "tabCgd"
	};
	
	// 임포트용 데이터 통신 오브젝트
	var moPObject = new Page();
	
	// 학생검색팝업
	moPObject.moIdsForStdCsrPStSearch = [
	{
		controlId 					: "btnStudId",
		iStudNo 					: "ipbStudId",	
		iStudId 						: "",
		iStudNm 					: "",
		iKeyDate 					: "/root/keyDateMap/END_DT", 
		iObjDivRcd 				: "",
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
		oSaCd 						: "",
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
//			var vsSchYearRcd = ExtControl.getValue("cbbSchYearRcd");
//			var vsSmtRcd = ExtControl.getValue("cbbSmtRcd");
//			var vsStudId = ExtInstance.getValue("/root/reqKey/strStudId");
//			
//			if(!ValueUtil.isNull(vsSchYearRcd) && !ValueUtil.isNull(vsSmtRcd) && !ValueUtil.isNull(vsStudId)){
//				ExtModel.dispatch("btnSearch", "DOMActivate");
//			}
		}
	}];
	
	// 학년도 학기를 원래데이터로 되돌리기위한 변수
	var msSchYearRcd = "";
	var msSmtRcd = "";
	
	/**
	 * @desc import 헤더 초기화
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 6. 29
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		// import 헤더 초기화
		doHeaderOnLoad();
	};
	
	/**
	 * @desc onLoad 실행
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 6. 29
	 */
	moPage.onModelConstructDone_ExtCcrSOpenSubStud = function() {
		// 리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["rptCcrTlsnReq"]);
		// 검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grpData"]);
		
		// 권한에따른 교수명 컬럼 검색가능 여부
		doVisibleCtlByAuth();
				
		// 서브미션 호출
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, ["cbbSchYearRcd", "cbbSmtRcd", "cbbSchDiv"]);
				
				// 검색구분값 - 금학기수강 Default
				util.Control.setValue(app, "cbbSchDiv", "CCR");
				util.Tab.setSelectedTabItem(app, "tabMain", TAB.CCR);
				
				// 학년도 학기값 되돌리기위한 값
				msSchYearRcd = util.DataMap.getValue(app, "dmKeyDateMap", "YEAR");
				msSmtRcd = util.DataMap.getValue(app, "dmKeyDateMap", "SMT");
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
			util.Control.setEnable(app, false, ["ipbStudId"]);
			
			util.Control.setValue(app, "ipbStudId", moUserInfo.studNo);
			util.DataMap.setValue(app, "dmReqKey", "strStudId", moUserInfo.id);
			util.Control.setStyleAttr(app, "ipbStudId", "width", "120");
		}
	};
	
	/**
	 * @desc [cbbSchYearRcd]학년도 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 6. 29
	 */
	moPage.onValueChanged_CbbSchYearRcd = function() {
		// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
		doChangeYearSmt("year");
	};
	
	/**
	 * @desc [cbbSmtRcd]학기 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 6. 29
	 */
	moPage.onValueChanged_CbbSmtRcd = function() {
		// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
		doChangeYearSmt("smt");
	};
	
	/**
	 * @desc 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 6. 29
	 */
	function doChangeYearSmt(psDiv) {
		//strCommand: date 
		util.Submit.send(app, "subDate", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, ["dipKeyDate"]);
				
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
	 * @desc [btnStudId]학번(돋보기버튼) onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 6. 29
	 */
	moPage.onClick_BtnStudId = function(sender) {
		// 학생검색팝업 호출
		doOnClickStdCsrPStSearch(sender);
	};
	
	/**
	 * @desc [ipbStudId]학번 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 6. 29
	 */
	moPage.onValueChanged_IpbStudId = function(sender) {
		// 값변경시 학생검색팝업 호출
		doOnChangeStdCsrPStSearch(sender);
	};
	
	/**
	 * @desc [cbbSchDiv]검색구분 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 6. 29
	 */
	moPage.onValueChanged_CbbSchDiv = function() {
		var vsSchDiv = util.Control.getValue(app, "cbbSchDiv");
		
		if(ValueUtil.fixNull(vsSchDiv) == "CGD"){
			util.Control.setEnable(app, false, ["cbbSchYearRcd", "cbbSmtRcd"]);
			
			util.Tab.setSelectedTabItem(app, "tabMain", TAB.CGD);
		}else {
			util.Control.setEnable(app, true, ["cbbSchYearRcd", "cbbSmtRcd"]);
			
			util.Tab.setSelectedTabItem(app, "tabMain", TAB.CCR);
		}
	};
	
	/**
	 * @desc [btnSearch]조회 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 6. 29
	 */
	moPage.onClick_BtnSearch = function() {
		// 작업영역 리피트 변경 내역 체크
		if(util.Grid.isModified(app, "", "CRM")){
			return false;
		}
		
		var vsSchDiv = util.Control.getValue(app, "cbbSchDiv");
		if(ValueUtil.fixNull(vsSchDiv) == "CGD"){
			// 조회조건 필수 체크
			if(!util.validate(app, ["ipbStudId", "cbbSchDiv"])){
				return false;
			}
		}else {
			// 조회조건 필수 체크
			if(!util.validate(app, ["cbbSchYearRcd", "cbbSmtRcd", "ipbStudId", "cbbSchDiv"])){
				return false;
			}
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
	 * @author 박갑수 at 2016. 6. 29
	 */
	function doList(poCallBackFunc) {

		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdCcrTlsnReq");
				util.Control.redraw(app, "grdCcrTlsnReq1");
				
				// 조회 후 콜백함수 수행
				if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess); 
			}
		});
	};
	
	/**
	 * @desc [rdBtnPlanPaper]강의계획서 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 6. 29
	 */
	moPage.onClick_RdBtnPlanBtn = function() {
		
		var vsKeyDate = "";
		
		var vsSchDiv = util.Control.getValue(app, "cbbSchDiv");
		
		if(ValueUtil.fixNull(vsSchDiv) == "CGD"){
			vsKeyDate = util.DataMap.getValue(app, "dmResOnLoad", "strKeyDate");
		}else {
			vsKeyDate = util.DataMap.getValue(app, "dmKeyDateMap", "END_DT");
		}
		
		var vsSchYearRcd = util.Grid.getCellValue(app, "grdCcrTlsnReq", "SCH_YEAR_RCD");
		var vsSmtRcd = util.Grid.getCellValue(app, "grdCcrTlsnReq", "SMT_RCD");
		var vsSaCd = util.Grid.getCellValue(app, "grdCcrTlsnReq", "SA_CD");
		var vsRefKey = util.Grid.getCellValue(app, "grdCcrTlsnReq", "REF_KEY");
		
		var vsPlanBtn = util.Grid.getCellValue(app, "grdCcrTlsnReq", "PLAN_BTN");
		
		if(ValueUtil.isNull(vsPlanBtn)){
			// "작성된 강의계획서가 없습니다." 메시지
			util.Msg.alert("NLS-CCR-EXT003");
			return false;
		}else {
			// 강의계획서 출력
			var voParam = {
					p_strLanDivRcd 			: msDefaultLocale	 			 // 언어키
				  ,	p_strKeyDate 			: vsKeyDate	  					 // 기준일
				  ,	p_strSchYearRcd		: vsSchYearRcd  				 // 학년도
				  ,	p_strSmtRcd 				: vsSmtRcd  						 // 학기
				  ,	p_strSaCd	 				: vsSaCd  							 // 부서코드
				  ,	p_strRefKey 				: vsRefKey							 // 교과목참조키
				  ,	p_strCheckAuthId 		: moUserInfo.id					 // 사용자ID
			};
					
			var voOzFormParam = {
					  TITLE 		 : "강의계획서" 		//리포트타이틀
					, SUB_TITLE   : "" 		//리포트서브타이틀		
					, FORM_TYPE : "flash"
			};	
					
			ReportUtil.fOzPopupOpen("강의계획서", "stdNcsSCurPrt04", voOzFormParam, voParam);
		}
	};
	
	/**
	 * @desc [rdBtnPlanPaper1]강의계획서 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 6. 29
	 */
	moPage.onClick_RdBtnPlanBtn1 = function() {
		
		var vsKeyDate = "";
		
		var vsSchDiv = util.Control.getValue(app, "cbbSchDiv");
		
		if(ValueUtil.fixNull(vsSchDiv) == "CGD"){
			vsKeyDate = util.DataMap.getValue(app, "dmResOnLoad", "strKeyDate");
		}else {
			vsKeyDate = util.DataMap.getValue(app, "dmKeyDateMap", "END_DT");
		}
		
		var vsSchYearRcd = util.Grid.getCellValue(app, "grdCcrTlsnReq1", "SCH_YEAR_RCD");
		var vsSmtRcd = util.Grid.getCellValue(app, "grdCcrTlsnReq1", "SMT_RCD");
		var vsSaCd = util.Grid.getCellValue(app, "grdCcrTlsnReq1", "SA_CD");
		var vsRefKey = util.Grid.getCellValue(app, "grdCcrTlsnReq1", "REF_KEY");
		
		var vsPlanBtn = util.Grid.getCellValue(app, "grdCcrTlsnReq1", "PLAN_BTN");
		
		if(ValueUtil.isNull(vsPlanBtn)){
			// "작성된 강의계획서가 없습니다." 메시지
			util.Msg.alert("NLS-CCR-EXT003");
			return false;
		}else {
			// 강의계획서 출력
			var voParam = {
					p_strLanDivRcd 			: msDefaultLocale	 			 // 언어키
				  ,	p_strKeyDate 			: vsKeyDate	  					 // 기준일
				  ,	p_strSchYearRcd		: vsSchYearRcd  				 // 학년도
				  ,	p_strSmtRcd 				: vsSmtRcd  						 // 학기
				  ,	p_strSaCd	 				: vsSaCd  							 // 부서코드
				  ,	p_strRefKey 				: vsRefKey							 // 교과목참조키
				  ,	p_strCheckAuthId 		: moUserInfo.id					 // 사용자ID
			};
					
			var voOzFormParam = {
					  TITLE 		 : "강의계획서" 		//리포트타이틀
					, SUB_TITLE   : "" 		//리포트서브타이틀		
					, FORM_TYPE : "flash"
			};	
					
			ReportUtil.fOzPopupOpen("강의계획서", "stdNcsSCurPrt04", voOzFormParam, voParam);
		}
	}
	
	/**
	 * @desc [rdBtnEvalBtn]평가계획서 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 6. 29
	 */
	moPage.onClick_RdBtnEvalBtn = function() {
		var vsSchYearRcd = util.Grid.getCellValue(app, "grdCcrTlsnReq", "SCH_YEAR_RCD");
		var vsSmtRcd = util.Grid.getCellValue(app, "grdCcrTlsnReq", "SMT_RCD");
		var vsSaCd = util.Grid.getCellValue(app, "grdCcrTlsnReq", "SA_CD");
		var vsRefKey = util.Grid.getCellValue(app, "grdCcrTlsnReq", "CUR_REF_KEY");
		var vsCuCd = util.Grid.getCellValue(app, "grdCcrTlsnReq", "CU_CD");
		var vsKeyDate = util.DataMap.getValue(app, "dmKeyDateMap", "END_DT");
		
		var vsEvalBtn = util.Grid.getCellValue(app, "grdCcrTlsnReq", "EVAL_BTN");
		
		if(ValueUtil.isNull(vsEvalBtn)){
			// "작성된 평가계획서가 없습니다." 메시지
			util.Msg.alert("NLS-CCR-EXT004");
			return false;
		}else {
			
			// 평가계획서 출력
			var voParam = {
					p_strLanDivRcd 			: msDefaultLocale	 			// 언어키
				  ,	p_strKeyDate 			: vsKeyDate	  					// 기준일
				  ,	p_strSchYearRcd		: vsSchYearRcd  				// 학년도
				  ,	p_strSmtRcd 				: vsSmtRcd  						// 학기
				  ,	p_strSaCd	 				: vsSaCd  							// 부서코드
				  ,	p_strRefKey 				: vsRefKey							// 교과목참조키
				  , p_strCuCd					: vsCuCd							// 교과그룹코드
				  ,	p_strCheckAuthId 		: moUserInfo.id					// 사용자ID
			};
			
			var voOzFormParam = {
					  TITLE 		 : "평가계획서" 		//리포트타이틀
					, SUB_TITLE   : "" 		//리포트서브타이틀		
					, FORM_TYPE : "flash"
			};	
					
			ReportUtil.fOzPopupOpen("평가계획서", "stdNcsSCurPrt03", voOzFormParam, voParam);
		}
	};
	
	return moPage;
};
