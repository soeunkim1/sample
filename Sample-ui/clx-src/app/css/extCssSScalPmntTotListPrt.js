//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCssSScalPmntTotListPrt.xtm"/>


var extCssSScalPmntTotListPrt = function() {
	var moPage = new Page();
	var moPObject = new PObject();
	
	/* 
	 * 객체 검색팝업 관련 설정사항
	 */
	moPObject.moIdsForStdCmnPObjSch = [
	{
		controlId 	: "btnDeptNmPop",
		iCd 		: "",
		iNm 		: "ipbDeptNm",
		iObjDivRcd 	: ["CC009OG","CC009SA"],
		iLanDivRcd 	: "",
		iKeyDate 	: "/root/reqKey/date/END_DT",
		oObjDivRcd 	: "ipbDeptObjDivRcd",
		oCd 		: "ipbDeptCd",
		oCdNm 		: "ipbDeptNm",
		oStDt 		: "",
		oEndDt 		: "",
		oLanDivRcd 	: "",
		func 		: ""
	}
	];
	
	/* 
	 * 장학금 검색팝업 관련 설정사항
	 */
	moPObject.moIdsForStdCssPScalFeeSch = [
	{
		controlId 		: "btnScalFeeNmPop",
		iCd 			: "",
		iNm 			: "ipbScalFeeNm",
		iObjDivRcd 		: "CC009SS",
		iLanDivRcd 		: "",
		iKeyDate		: "/root/reqKey/date/END_DT",
		iScalFeeCls1	: "",	
		iScalFeeCls2	: "",	
		iScalFeeCls3	: "",	
		iScalFeeCls4	: "",	
		iScalFeeCls5	: "",	
		iDeptCd 		: "",		
		iDeptObjDivRcd 	: "",	
		iMngDeptDiv		: "", 
		oScalFeeCd 		: "ipbScalFeeCd",
		oScalFeeNm 		: "ipbScalFeeNm",
		oObjDivRcd 		: "ipbSsObjDivRcd",
		oPmntDivRcd 	: "",
		oPmntItvRcd 	: "",
		func 			: null
	}
	];
	
	/**
	 * @desc Header Import onLoad
	 * @return void
	 * @author Aeyoung Lee at 2016. 6. 16.
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		doHeaderOnLoad();
	}
	
	/**
	 * @desc 온로드
	 * @return void
	 * @author Aeyoung Lee at 2016. 6. 16.
	 */
	moPage.onModelConstructDone_ExtCssSScalStudListPrt = function() {
		//검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch",["grpData"]);
		
		doOnLoad();	
	};
	
	/**
	 * @desc 온로드 실행
	 * @param 
	 * @return void
	 * @author Aeyoung Lee at 2016. 6. 16.
	 */
	function doOnLoad(){
		
		// 서브미션 실행 (실패시 cover page)
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, ["cbbSchYear","cbbSmt","cbbScalFeeCls1","cbbScalFeeCls2","cbbScalFeeCls3","cbbScalFeeCls4","cbbScalFeeCls5","cbbPmntDiv"]);
			}
		});
	};
	
	/**
	 * @desc 장학금명 팝업 클릭 이벤트
	 * @param 
	 * @return 
	 * @author Aeyoung Lee at 2016. 6. 16.
	 */
	moPage.onClick_BtnScalFeeNmPop = function(sender) {
		doOnClickStdCssPScalFeePop(sender);
	};
	
	/**
	 * @desc 장학금명 변경 이벤트
	 * @param 
	 * @return 
	 * @author Aeyoung Lee at 2016. 6. 16.
	 */
	moPage.onValueChanged_IpbScalFeeNm = function(sender) {
		doOnChangeStdCssPScalFeePop(sender);
	};
	
	/**
	 * @desc 학과 팝업 클릭 이벤트
	 * @param 
	 * @return 
	 * @author Aeyoung Lee at 2016. 6. 16.
	 */
	moPage.onClick_BtnDeptNmPop = function(sender) {
		doOnClickStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc 학과명 변경 이벤트
	 * @param 
	 * @return 
	 * @author Aeyoung Lee at 2016. 6. 16.
	 */
	moPage.onValueChanged_IpbDeptNm = function(sender) {
		doOnChangeStdCmnPObjSch(sender);
	};
	
	/**
	 * 조회조건 수행
	 * @member moPage
	 * @type void
	 * @author Aeyoung Lee at 2016. 6. 16.
	 */
	moPage.onClick_BtnSearch = function() {
		//1.조회조건 필수 체크(학년도)
		if(!util.validate(app, ["cbbSchYear"])) return;
		
		var vsStDt = util.DataMap.getValue(app, "dmDate", "ST_DT").substr(0,8);
		var vsEndDt = util.DataMap.getValue(app, "dmDate", "END_DT").substr(0,8);
		util.DataMap.setValue(app, "dmReqKey", "strKeyDate", vsEndDt);
		
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				
				var vsSchYearSelIdx = util.SelectCtl.getSelectedIndex(app, "cbbSchYear");
				var vsSmtSelIdx = util.SelectCtl.getSelectedIndex(app, "cbbSmt");
				util.DataMap.setValue(app, "dmReqKey", "strRptSubTitle", util.SelectCtl.getLabel(app, "cbbSchYear", vsSchYearSelIdx) + " " + util.SelectCtl.getLabel(app, "cbbSmt", vsSmtSelIdx));	
				
				//리퀘스트 셋팅
				var voParam = {
							p_strSchYearRcd : util.DataMap.getValue(app, "dmDate", "YEAR") 				// 학년도
						  , p_strSmtRcd : util.DataMap.getValue(app, "dmDate", "SMT") 					// 학기
						  , p_strScalFeeCd : util.DataMap.getValue(app, "dmReqKey", "strScalFeeCd") 				// 장학금
						  , p_strSsObjDivRcd : util.DataMap.getValue(app, "dmReqKey", "strSsObjDivRcd") 			// 장학금객체구분코드
						  , p_strPmntDivRcd : util.DataMap.getValue(app, "dmReqKey", "strPmntDivRcd") 			// 지급구분
						  , p_strScalFeeCls1 : util.DataMap.getValue(app, "dmReqKey", "strScalFeeCls1") 			// 장학금분류1
						  , p_strScalFeeCls2 : util.DataMap.getValue(app, "dmReqKey", "strScalFeeCls2") 			// 장학금분류2
						  , p_strScalFeeCls3 : util.DataMap.getValue(app, "dmReqKey", "strScalFeeCls3") 			// 장학금분류3
						  , p_strScalFeeCls4 : util.DataMap.getValue(app, "dmReqKey", "strScalFeeCls4") 			// 장학금분류4
						  , p_strScalFeeCls5 : util.DataMap.getValue(app, "dmReqKey", "strScalFeeCls5") 			// 장학금분류5
						  , p_strSaList : util.DataMap.getValue(app, "dmResList", "strSaList")
						  , p_strSubTitle : util.DataMap.getValue(app, "dmReqKey", "strRptSubTitle")
						  , p_strKeyStDt : vsStDt 	// 해당학년도학기 시작일자
						  , p_strKeyEndDt : vsEndDt  // 해당학년도학기 종료일자
						  , p_strLandivRcd : msDefaultLocale
						}	
						
				 var voOzFormParam = {
							  TITLE : "장학금지급현황" //리포트타이틀
							, SUB_TITLE : "" 		  //리포트서브타이틀		
							, FORM_TYPE : "flash"
							};	
							
				util.Report.open(app, "hojReport", "extCssSScalPmntTotListPrt", voOzFormParam, voParam);
				
			}
		});
	};
	
	/**
	 * @desc  기준날짜의 값을 리셋팅
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 6. 16.
	 */
	 function doChangeSchYearSmt() {
		util.DataMap.setValue(app, "dmDate", "ST_DT","");	
		util.DataMap.setValue(app, "dmDate", "END_DT","");	
		
		// 시점관련 컨트롤 초기화
		//ExtControl.reset(["ipbDeptNm", "ipbDeptCd", "ipbDeptObjDivRcd", "ipbScalFeeNm", "ipbScalFeeCd"]);
		
		// 해당학년도학기 표준일자 서브미션 호출
		ExtSubmission.sendEx("subDate", "date");	
	};
	
	/**
	 * @desc  학년도 값변경 이벤트
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 6. 16.
	 */
	moPage.onValueChanged_CbbSchYear = function() {
		doChangeSchYearSmt();
	};
	
	/**
	 * @desc  학기 값변경 이벤트
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 6. 16.
	 */
	moPage.onValueChanged_CbbSmt = function() {
		doChangeSchYearSmt();
	};
	return moPage;
};
