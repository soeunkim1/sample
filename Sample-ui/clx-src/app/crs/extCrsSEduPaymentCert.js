//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCrsSEduPaymentCert.xtm"/>


var extCrsSEduPaymentCert = function() {
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
		iKeyDate 		: "/root/resList/strSysdate",
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
		func : function(poParam) {
			if(!ValueUtil.isNull(poParam.Result.strStudId)){
				util.Header.clickSearch(app);
			}	
		}
	}
	];	
	
	
	/**
	 * @desc Header Import onLoad
	 * @return void
	 * @author Aeyoung Lee at 2016. 9. 27.
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		doHeaderOnLoad();
	};
	
	/**
	 * @desc 온로드
	 * @return void
	 * @author Aeyoung Lee at 2016. 9. 27.
	 */
	moPage.onModelConstructDone_ExtCrsSEduPaymentCert = function() {
		//검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch",["grpData"]);
		
		//온로드 서브미션
		//strCommand: onLoad 
		util.Submit.send(app, "subOnload", function(pbSuccess){
			if(pbSuccess){
				
				util.Control.redraw(app, ["cbbSchYear"]);
				util.Control.setValue(app, "cbbSchYear", util.DataMap.getValue(app, "dmResList", "YEAR"));
				
				// 권한에따른 컨트롤 활성화 처리
				doVisibleCtlByAuth();	
			}
		});
		
	};
	
	/**
	 * 권한에 따른 학번명 활성/비활성 처리	 
	 * @param 
	 * @type void
	 * @author Aeyoung Lee at 2016. 9. 27.
	 */	
	function doVisibleCtlByAuth() {
		
		// 전체권한[CC00102] : 
		if (moPageInfo.authRngRcd == "CC00102") {
			util.Control.setEnable(app, true, ["ipbStudId", "btnStudPop"]);
			
			util.Control.setValue(app, "ipbStudId", "");
			util.Control.setValue(app, "ipbStudIdObj", "");	
			
			util.Control.setFocus(app, "ipbStudId");
		}else{
			util.Control.setEnable(app, false, ["ipbStudId", "btnStudPop"]);
			
			util.Control.setValue(app, "ipbStudId", moUserInfo.studNo);
			util.Control.setValue(app, "ipbStudIdObj", moUserInfo.id);
			
			// 바로 조회
			util.Header.clickSearch(app);
		}	
	};
		
	/**
	 * @desc 학생검샙팝업 클릭 이벤트
	 * @param 
	 * @return 
	 * @author Aeyoung Lee at 2016. 9. 27.
	 */
	moPage.onClick_BtnStudPop = function(sender) {
		doOnClickStdCsrPStSearch(sender);
	}
	
	/**
	 * @desc 학번 변경 이벤트
	 * @param 
	 * @return 
	 * @author Aeyoung Lee at 2016. 9. 27.
	 */
	moPage.onValueChanged_IpbStudId = function(sender) {
		doOnChangeStdCsrPStSearch(sender);
	};
	
	/**
	 * 조회조건 수행
	 * @member moPage
	 * @type void
	 * @author Aeyoung Lee at 2016. 9. 27.
	 */
	moPage.onClick_BtnSearch = function() {
		//1.조회조건 필수 체크
		if(!util.validate(app, ["cbbSchYear", "ipbStudId", "ipbStudIdObj"])){
			return false;
		}	
		
		doList();
	};
	
	/**
	 * @desc 조회조건 수행
	 * @param
	 * @@return 
	 * @author Aeyoung Lee at 2016. 9. 27.
	 */
	function doList(poCallBackFunc) {
		
		// 권한체크 및 재휴학생 체크 서브미션
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				
				//리퀘스트 셋팅
				var voParam = {
							p_strSchYearRcd : util.Control.getValue(app, "cbbSchYear") 			// 학년도
						  , p_strStudId : util.DataMap.getValue(app, "dmReqKey", "strStudId") 	// 학생ObjId
						  , p_strLandivRcd : msDefaultLocale
						}	
						
				 var voOzFormParam = {
							  TITLE : "교육비납입증명서" //리포트타이틀
							, SUB_TITLE : "" 		  //리포트서브타이틀		
							, FORM_TYPE : "flash"
							};	
							
				util.Report.open(app, "hojReport", "extCrsSEduPaymentCert", voOzFormParam, voParam);
			}
		}, true);	
	}
	
	return moPage;
};
