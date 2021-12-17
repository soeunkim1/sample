//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCrsSRegFeeBillPrt.xtm"/>


var extCrsSRegFeeBillPrt = function() {
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
	
	/**
	 * 학생검색팝업 관련 설정사항
	 */
	moPObject.moIdsForStdCsrPStSearch = [
	{
		controlId 		: "btnStudPop",
		iStudNo 		: "ipbStudId",	
		iStudId 		: "",
		iStudNm 		: "",
		iKeyDate 		: "/root/reqKey/date/END_DT",
		iObjDivRcd 		: "", 
		iObjCd 			: "", 
		iObjNm 			: "",
		iAuthYN 		: "",
		iStatRcd 		: "",
		iStudDivRcd		: "",
		oStudId 		: "ipbStudIdObj",
		oStudNo 		: "ipbStudId",
		oStudNm 		: "",
		oStatNm 		: "",
		oStatRcd 		: "",
		oProcRslt 		: "",
		oProcRsltYear 	: "",
		oSaNm			: "",
		oSaCd 			: "",
		oSpNm 			: "",
		oSpCd 			: "",
		oOgNm 			: "",
		oOgCd 			: "",
		oStudDivRcd		: "",
		oStudDivNm		: "",
		oBirthday		: "",
		oGenderRcd		: "",
		oGenderNm		: "",
		func : null
	}
	];	
	
	
	/**
	 * @desc Header Import onLoad
	 * @return void
	 * @author Aeyoung Lee at 2016. 6. 20
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		doHeaderOnLoad();
	}
	
	/**
	 * @desc 온로드
	 * @return void
	 * @author Aeyoung Lee at 2016. 6. 20
	 */
	moPage.onModelConstructDone_ExtCrsSRegFeeBillPrt = function() {
		//검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch",["grpData"]);
		doOnLoad();	
	};
	
	/**
	 * @desc 온로드 실행
	 * @param 
	 * @return void
	 * @author Aeyoung Lee at 2016. 6. 20
	 */
	function doOnLoad(){
		
		// 서브미션 실행 (실패시 cover page)
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, ["cbbSchYear","cbbSmt"]);
				
				// 납부기간, 납부장소 defalut 셋팅
				var vsDefPayDt = util.DataMap.getValue(app, "dmResOnLoad", "strDefPayDt");
				var vsDefPayPlace = util.DataMap.getValue(app, "dmResOnLoad", "strDefPayPlace");
				util.Control.setValue(app, "ipbPayDt", vsDefPayDt);
				util.Control.setValue(app, "ipbPayPlace", vsDefPayPlace);
				
				util.Control.setValue(app, "ckbPayTypeAll", "Y");
				// 학기, 납부형태에 따른 납부형태, 분납차수 제어
				doChangeExecCond();
			}
		});
	};
	
	/**
	 * @desc  기준날짜의 값을 리셋팅
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 6. 20
	 */
	function doChangeSchYearSmt() {
		util.DataMap.setValue(app, "dmDate", "ST_DT","");	
		util.DataMap.setValue(app, "dmDate", "END_DT","");	
		
		// 시점관련 컨트롤 초기화
		util.Control.reset(app, ["ipbDeptNm", "ipbDeptCd", "ipbDeptObjDivRcd", "ipbStudId", "ipbStudIdObj"]);
		
		// 해당학년도학기 표준일자 서브미션 호출
		ExtSubmission.sendEx("subDate", "date");
	};
	
	/**
	 * @desc  학년도 값변경 이벤트
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 6. 20
	 */
	moPage.onValueChanged_CbbSchYear = function() {
		doChangeSchYearSmt();
	};
	
	/**
	 * @desc  학기 값변경 이벤트
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 6. 20
	 */
	moPage.onValueChanged_CbbSmt = function() {
		doChangeSchYearSmt();
	};
	
	/**
	 * @desc 학과 팝업 클릭 이벤트
	 * @param 
	 * @return 
	 * @author Aeyoung Lee at 2016. 6. 20
	 */
	moPage.onClick_BtnDeptNmPop = function(sender) {
		doOnClickStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc 학과명 변경 이벤트
	 * @param 
	 * @return 
	 * @author Aeyoung Lee at 2016. 6. 20
	 */
	moPage.onValueChanged_IpbDeptNm = function(sender) {
		doOnChangeStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc 학생검샙팝업 클릭 이벤트
	 * @param 
	 * @return 
	 * @author Aeyoung Lee at 2016. 6. 20
	 */
	moPage.onClick_BtnStudPop = function(sender) {
		doOnClickStdCsrPStSearch(sender);
	}
	
	/**
	 * @desc 학번 변경 이벤트
	 * @param 
	 * @return 
	 * @author Aeyoung Lee at 2016. 6. 20
	 */
	moPage.onValueChanged_IpbStudId = function(sender) {
		doOnChangeStdCsrPStSearch(sender);
	};
	
	/**
	 * @desc 납부형태-분납 변경 이벤트
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-06-20
	 */
	moPage.onValueChanged_CkbPayTypeDiv = function() {
		// 학기, 납부형태에 따른 납부형태, 분납차수 제어
		doChangeExecCond();
	};
	
	/**
	 * @desc 실행조건 학기에 따른 납부형태, 분납차수 제어
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-06-20
	 */
	function doChangeExecCond() {
		var vsSmtCd = util.Control.getValue(app, "cbbSmt");
		var vsChkValue = vsSmtCd.substring(vsSmtCd.length - 2);
		
		//계절학기일경우 
		if ("91" == vsChkValue || "93" == vsChkValue) {
			util.Control.setEnable(app, false, ["ckbPayTypeAll", "ckbPayTypeDiv", "rdbDivPaySeq"]);
			
			util.Control.setValue(app, "ckbPayTypeDiv", "");
			util.Control.setValue(app, "rdbDivPaySeq", "");
			util.Control.setValue(app, "ckbPayTypeAll", "Y");
		} else {
			util.Control.setEnable(app, true, ["ckbPayTypeAll", "ckbPayTypeDiv"]);
			
			if(util.Control.getValue(app, "ckbPayTypeDiv") == "Y"){
				util.Control.setEnable(app, true, ["rdbDivPaySeq"]);
			}else{
				util.Control.setValue(app, "rdbDivPaySeq", "")	;
				util.Control.setEnable(app, false, ["rdbDivPaySeq"]);
			}	
		}
	};
	
	/**
	 * @desc 실행조건 검증
	 * @param 
	 * @return 
	 * @author Aeyoung Lee at 2016. 6. 20
	 */
	function doCondValidation() {
		var vbValid = true;
		
		var vsPayTypeAll = util.Control.getValue(app, "ckbPayTypeAll");	//납부형태(전액)
		var vsPayTypeDiv = util.Control.getValue(app, "ckbPayTypeDiv"); 	//납부형태(분납)
		
		// 납부형태 체크
		if (ValueUtil.isNull(vsPayTypeAll) && ValueUtil.isNull(vsPayTypeDiv)) {
			vbValid = false;
			util.Msg.alert("NLS-WRN-M100", [ExtControl.getTextValue("lblPayType")]);
		}
		else if (vsPayTypeDiv == "Y") {
			
			var vsDivPaySeq = util.Control.getValue(app, "rdbDivPaySeq"); 	//분납차수 
			
			//분납차수.
			if (ValueUtil.isNull(vsDivPaySeq)) {
				vbValid = false;
				// 분납선택시 차수는 필수항목입니다.
				util.Msg.alert("NLS-CRS-M098");
				util.Control.setFocus(app, "rdbDivPaySeq");
			}
		}
		
		return vbValid;
	};
	
	/**
	 * 조회조건 수행
	 * @member moPage
	 * @type void
	 * @author Aeyoung Lee at 2016. 6. 20
	 */
	moPage.onClick_BtnSearch = function() {
		//1.조회조건 필수 체크(학년도)
		if(!util.validate(app, ["cbbSchYear", "cbbSmt"])) return;
		
		// 필수외 조건유효성 체크
		if(!doCondValidation()) return;
		
		var vsStDt = util.DataMap.getValue(app, "dmDate", "ST_DT").substr(0,8);
		var vsEndDt = util.DataMap.getValue(app, "dmDate", "END_DT").substr(0,8);
		util.DataMap.setValue(app, "dmReqKey", "strKeyDate", vsEndDt);
		
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				
				//리퀘스트 셋팅
				var voParam = {
							p_strSchYearRcd : util.DataMap.getValue(app, "dmDate", "YEAR") 			// 학년도
						  , p_strSmtRcd : util.DataMap.getValue(app, "dmDate", "SMT") 				// 학기
						  , p_strStudId : util.DataMap.getValue(app, "dmReqKey", "strStudId") 				// 학생ObjId
						  , p_strPayTypeAll : util.DataMap.getValue(app, "dmReqKey", "strPayTypeAll") 		// 납부형태(전액)
						  , p_strPayTypeDiv : util.DataMap.getValue(app, "dmReqKey", "strPayTypeDiv") 		// 납부형태(분납)
						  , p_strDivPaySeq : util.DataMap.getValue(app, "dmReqKey", "strDivPaySeq") 			// 분납차수
						  , p_strPayDt : util.DataMap.getValue(app, "dmReqKey", "strPayDt") 					// 납부기간
						  , p_strPayPlace : util.DataMap.getValue(app, "dmReqKey", "strPayPlace") 			// 납부장소
						  , p_strSaList : util.DataMap.getValue(app, "dmResList", "strSaList")				// 학사부서 (in 조건)
						  , p_strKeyStDt : vsStDt 	// 해당학년도학기 시작일자
						  , p_strKeyEndDt : vsEndDt  // 해당학년도학기 종료일자
						  , p_strLandivRcd : msDefaultLocale
						}	
						
				 var voOzFormParam = {
							  TITLE : "등록금고지서" //리포트타이틀
							, SUB_TITLE : "" 		  //리포트서브타이틀		
							, FORM_TYPE : "flash"
							};	
							
				util.Report.open(app, "hojReport", "extCrsSRegFeeBill", voOzFormParam, voParam);
				
			}
		});
	};
	
	
	return moPage;
};
