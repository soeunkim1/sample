//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCssSScalStudPmntListPrt.xtm"/>


var extCssSScalStudPmntListPrt = function() {
	var moPage = new Page();
	var moPObject = new PObject();
	
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
	 * @author Aeyoung Lee at 2016. 8. 31.
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		doHeaderOnLoad();
	}
	
	/**
	 * @desc 온로드
	 * @return void
	 * @author Aeyoung Lee at 2016. 8. 31.
	 */
	moPage.onModelConstructDone_ExtCssSScalStudPmntListPrt = function() {
		//검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch",["grpData"]);
		
		doOnLoad();	
	};
	
	/**
	 * @desc 온로드 실행
	 * @param 
	 * @return void
	 * @author Aeyoung Lee at 2016. 8. 31.
	 */
	function doOnLoad(){
		doOnLoadImpNS("CSS");
	};
	
	/**
	 * @desc 팝업호출시 기준일자 셋팅
	 * @param 
	 * @return 
	 * @author Aeyoung Lee at 2016. 8. 31.
	 */
	function doSetPopKeyDate() {
		var vsEndDt = ExtInstance.getValue("instance('impCommonN')/root/date/END_DT").substr(0,8);
		
		moPObject.moIdsForStdCsrPStSearch[0].iKeyDate = vsEndDt;
	};
	
	/**
	 * @desc 학생검색 팝업 클릭 이벤트
	 * @param 
	 * @return 
	 * @author Aeyoung Lee at 2016. 8. 31.
	 */
	moPage.onClick_BtnStudPop = function(sender) {
		doSetPopKeyDate();
		doOnClickStdCsrPStSearch(sender);
	};
	
	/**
	 * @desc 학번 변경 이벤트
	 * @param 
	 * @return 
	 * @author Aeyoung Lee at 2016. 8. 31.
	 */
	moPage.onValueChanged_IpbStudId = function(sender) {
		doSetPopKeyDate();
		doOnChangeStdCsrPStSearch(sender);
	};
	
	/**
	 * 조회조건 수행
	 * @member moPage
	 * @type void
	 * @author Aeyoung Lee at 2016. 8. 31.
	 */
	moPage.onClick_BtnSearch = function() {
		//1.조회조건 필수 체크(학년도)
		if(!util.validate(app, ["cbbYearImpNS", "cbbSmtImpNS"])){
			return false;
		}	
		
		doList();
	};
	
	/**
	 * @desc 조회조건 수행
	 * @param
	 * @@return 
	 * @author Aeyoung Lee at 2016. 8. 31.
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
				
				var vsSchYearSelIdx = util.SelectCtl.getSelectedIndex(app, "cbbYearImpNS");
				var vsSmtSelIdx = util.SelectCtl.getSelectedIndex(app, "cbbSmtImpNS");
				util.DataMap.setValue(app, "dmReqKey", "strRptSubTitle", util.SelectCtl.getLabel(app, "cbbYearImpNS", vsSchYearSelIdx) + " " + util.SelectCtl.getLabel(app, "cbbSmtImpNS", vsSmtSelIdx));	
				
				//리퀘스트 셋팅
				var voParam = {
							p_strSchYearRcd : util.DataMap.getValue(app, "dmReqKey", "strSchYearRcd") 	// 학년도
						  , p_strSmtRcd : util.DataMap.getValue(app, "dmReqKey", "strSmtRcd") 			// 학기
						  , p_strStudId : util.DataMap.getValue(app, "dmReqKey", "strStudId") 			// 학생Id
						  , p_strKeyEndDt  : vsEndDt												// 기준일자(학년도학기 종료일)
						  , p_strKeyStDt   : vsStDt 												// 기준일자(학년도학기 시작일)
						  , p_strCsrSmtRcd : util.DataMap.getValue(app, "dmResList", "strCsrSmtRcd")		// 학적용학기
						  , p_strSubTitle : util.DataMap.getValue(app, "dmReqKey", "strRptSubTitle")
						  , p_strLanDivRcd : msDefaultLocale
						  , p_strPgmId : moPageInfo.pgmId
						  , p_strUserId : moUserInfo.userId
						}	
						
				 var voOzFormParam = {
							  TITLE : "장학금지급현황(학생별)" //리포트타이틀
							, SUB_TITLE : "" 		//리포트서브타이틀		
							, FORM_TYPE : "flash"
							};	
							
				util.Report.open(app, "hojReport", "extCssSScalStudPmntListPrt", voOzFormParam, voParam);
			}
		});
			
	};
	
	return moPage;
};
