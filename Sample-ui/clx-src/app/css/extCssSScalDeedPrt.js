//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCssSScalDeedPrt.xtm"/>


var extCssSScalDeedPrt = function() {
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
		iKeyDate 	: "",
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
		iKeyDate		: "",
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
	 * 학생검색팝업 관련 설정사항
	 */
	moPObject.moIdsForStdCsrPStSearch = [
	{
		controlId 		: "btnStudPop",
		iStudNo 		: "ipbStudId",	
		iStudId 		: "",
		iStudNm 		: "",
		iKeyDate 		: "",
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
	 * @author Aeyoung Lee at 2016. 6. 14.
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		doHeaderOnLoad();
	}
	
	/**
	 * @desc 온로드
	 * @return void
	 * @author Aeyoung Lee at 2016. 6. 14.
	 */
	moPage.onModelConstructDone_ExtCssSScalDeedPrt = function() {
		//검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch",["grpData"]);
		
		doOnLoad();	
	};
	
	/**
	 * @desc 온로드 실행
	 * @param 
	 * @return void
	 * @author Aeyoung Lee at 2016. 6. 14.
	 */
	function doOnLoad(){
		doOnLoadImpNS("CSS");
		
		// 서브미션 실행 (실패시 cover page)
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				// 현재일자
				var vsSysDate = util.DataMap.getValue(app, "dmResOnLoad", "strSysDate").substring(0,8);
				util.Control.setValue(app, "dipConferDt", vsSysDate);
			}
		});
	};
	
	/**
	 * @desc 팝업호출시 기준일자 셋팅
	 * @param 
	 * @return 
	 * @author Aeyoung Lee at 2016. 6. 14.
	 */
	function doSetPopKeyDate() {
		var vsEndDt = ExtInstance.getValue("instance('impCommonN')/root/date/END_DT").substr(0,8);
		
		moPObject.moIdsForStdCmnPObjSch[0].iKeyDate = vsEndDt;
		moPObject.moIdsForStdCssPScalFeeSch[0].iKeyDate = vsEndDt;
		moPObject.moIdsForStdCsrPStSearch[0].iKeyDate = vsEndDt;
	};
	
	/**
	 * @desc 장학금명 팝업 클릭 이벤트
	 * @param 
	 * @return 
	 * @author Aeyoung Lee at 2016. 6. 14.
	 */
	moPage.onClick_BtnScalFeeNmPop = function(sender) {
		doSetPopKeyDate();
		doOnClickStdCssPScalFeePop(sender);
	};
	
	/**
	 * @desc 장학금명 변경 이벤트
	 * @param 
	 * @return 
	 * @author Aeyoung Lee at 2016. 6. 14.
	 */
	moPage.onValueChanged_IpbScalFeeNm = function(sender) {
		doSetPopKeyDate();
		doOnChangeStdCssPScalFeePop(sender);
	};
	
	/**
	 * @desc 학과 팝업 클릭 이벤트
	 * @param 
	 * @return 
	 * @author Aeyoung Lee at 2016. 6. 14.
	 */
	moPage.onClick_BtnDeptNmPop = function(sender) {
		doSetPopKeyDate();
		doOnClickStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc 학과명 변경 이벤트
	 * @param 
	 * @return 
	 * @author Aeyoung Lee at 2016. 6. 14.
	 */
	moPage.onValueChanged_IpbDeptNm = function(sender) {
		doSetPopKeyDate();
		doOnChangeStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc 학생검색 팝업 클릭 이벤트
	 * @param 
	 * @return 
	 * @author Aeyoung Lee at 2016. 11. 31.
	 */
	moPage.onClick_BtnStudPop = function(sender) {
		doSetPopKeyDate();
		doOnClickStdCsrPStSearch(sender);
	};
	
	/**
	 * @desc 학번 변경 이벤트
	 * @param 
	 * @return 
	 * @author Aeyoung Lee at 2016. 11. 31.
	 */
	moPage.onValueChanged_IpbStudId = function(sender) {
		doSetPopKeyDate();
		doOnChangeStdCsrPStSearch(sender);
	};
	
	/**
	 * @desc 증서번호부여 버튼 클릭 이벤트
	 * @param 
	 * @return 
	 * @author Aeyoung Lee at 2016. 6. 14.
	 */
	moPage.onClick_BtnSaveDeed = function() {
		
		util.Msg.notify(app, "null");
		
		// 필수항목 체크
		if(!util.validate(app, ["cbbYearImpNS", "cbbSmtImpNS"])) return;
		
		util.DataMap.setValue(app, "dmReqKey", "strSchYearRcd", util.Control.getValue(app, "cbbYearImpNS"));
		util.DataMap.setValue(app, "dmReqKey", "strSmtRcd", util.Control.getValue(app, "cbbSmtImpNS"));
		ExtInstance.setValue("/root/reqKey/strKeyDate", ExtInstance.getValue("instance('impCommonN')/root/date/END_DT").substr(0,8));
		
		// 2016.11.3 컴펌메시지 추가
		// 증서번호부여를 처리하시겠습니까?
		if(!util.Msg.confirm("NLS-CSS-M108") ) return;
		
		// 2016.10.14 배치처리전 커버페이지 씌우는 로직추가
		util.coverPage(app);
		
		//strCommand: save 
		util.Submit.send(app, "subSave", function(pbSuccess){
			if(pbSuccess){
				var vsProcCnt = util.DataMap.getValue(app, "dmResList", "strProcUpdCnt");
				
				//@명의 증서번호부여가 처리되었습니다.
				util.Msg.alert("NLS-CSS-M101", [vsProcCnt]);
				//증서번호부여가 처리되었습니다.
				util.Msg.notify(app, "NLS.CSS.M102");		
			}else{
				//증서번호부여를 실패하였습니다.
				util.Msg.notify(app, "NLS.CSS.M103");
			}	
			
			util.removeCover(app);
		});  
	};
	
	/**
	 * 조회조건 수행
	 * @member moPage
	 * @type void
	 * @author Aeyoung Lee at 2016. 6. 14.
	 */
	moPage.onClick_BtnSearch = function() {
		//1.조회조건 필수 체크(학년도)
		if(!util.validate(app, ["cbbYearImpNS", "cbbSmtImpNS", "ipbScalFeeNm", "ipbScalFeeCd", "dipConferDt"])){
			return false;
		}	
		
		doList();
	};
	
	/**
	 * @desc 조회조건 수행
	 * @param
	 * @@return 
	 * @author Aeyoung Lee at 2016. 6. 14.
	 */
	function doList(poCallBackFunc) {
		
		var vsStDt = ExtInstance.getValue("instance('impCommonN')/root/date/ST_DT").substr(0,8);
		var vsEndDt = ExtInstance.getValue("instance('impCommonN')/root/date/END_DT").substr(0,8);
		
		util.DataMap.setValue(app, "dmReqKey", "strSchYearRcd", util.Control.getValue(app, "cbbYearImpNS"));
		util.DataMap.setValue(app, "dmReqKey", "strSmtRcd", util.Control.getValue(app, "cbbSmtImpNS"));
		util.DataMap.setValue(app, "dmReqKey", "strKeyDate", vsEndDt);
		
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				
				//리퀘스트 셋팅
				var voParam = {
							p_strSchYearRcd : util.DataMap.getValue(app, "dmReqKey", "strSchYearRcd") 			// 학년도
						  , p_strSmtRcd : util.DataMap.getValue(app, "dmReqKey", "strSmtRcd") 					// 학기
						  , p_strScalFeeCd : util.DataMap.getValue(app, "dmReqKey", "strScalFeeCd") 				// 장학금
						  , p_strSsObjDivRcd : util.DataMap.getValue(app, "dmReqKey", "strSsObjDivRcd") 			// 장학금객체구분코드
						  , p_strSaList : util.DataMap.getValue(app, "dmResList", "strSaList")
						  , p_strConferDt : util.DataMap.getValue(app, "dmReqKey", "strConferDt")
						  , p_strStudId : util.DataMap.getValue(app, "dmReqKey", "strStudId")
						  , p_strKeyStDt : vsStDt 	// 해당학년도학기 시작일자
						  , p_strKeyEndDt : vsEndDt  // 해당학년도학기 종료일자
						  , p_strLandivRcd : msDefaultLocale
						}	
						
				 var voOzFormParam = {
							  TITLE : "장 학 증 서" //리포트타이틀
							, SUB_TITLE : "" 		//리포트서브타이틀		
							, FORM_TYPE : "flash"
							};	
							
				util.Report.open(app, "hojReport", "extCssSScalDeedPrt", voOzFormParam, voParam);
				
			}
		});
	}
	
	
	
	return moPage;
};
