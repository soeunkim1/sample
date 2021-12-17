//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCssSScalPmntCertPrt.xtm"/>


var extCssSScalPmntCertPrt = function() {
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
	 * @author Aeyoung Lee at 2016. 10. 18.
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		doHeaderOnLoad();
	};
	
	/**
	 * @desc 온로드
	 * @return void
	 * @author Aeyoung Lee at 2016. 10. 18.
	 */
	moPage.onModelConstructDone_ExtCssSScalPmntCertPrt = function() {
		//검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch",["grpData"]);
		
		//온로드 서브미션
		//strCommand: onLoad 
		util.Submit.send(app, "subOnload", function(pbSuccess){
			if(pbSuccess){
				
				// 권한에따른 컨트롤 활성화 처리
				doVisibleCtlByAuth();	
			}
		});
		
	};
	
	/**
	 * 권한에 따른 학번명 활성/비활성 처리	 
	 * @param 
	 * @type void
	 * @author Aeyoung Lee at 2016. 10. 18.
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
	 * @author Aeyoung Lee at 2016. 10. 18.
	 */
	moPage.onClick_BtnStudPop = function(sender) {
		doOnClickStdCsrPStSearch(sender);
	}
	
	/**
	 * @desc 학번 변경 이벤트
	 * @param 
	 * @return 
	 * @author Aeyoung Lee at 2016. 10. 18.
	 */
	moPage.onValueChanged_IpbStudId = function(sender) {
		doOnChangeStdCsrPStSearch(sender);
	};
	
	/**
	 * 조회조건 수행
	 * @member moPage
	 * @type void
	 * @author Aeyoung Lee at 2016. 10. 18.
	 */
	moPage.onClick_BtnSearch = function() {
		//1.조회조건 필수 체크
		if(!util.validate(app, ["ipbStudId", "ipbStudIdObj"])){
			return false;
		}	
		
		doList();
	};
	
	/**
	 * @desc 조회조건 수행
	 * @param
	 * @@return 
	 * @author Aeyoung Lee at 2016. 10. 18.
	 */
	function doList(poCallBackFunc) {
		
		// 권한체크 및 재휴학생 체크 서브미션
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				
				//리퀘스트 셋팅
				var voParam = {
						    p_strStudId : util.DataMap.getValue(app, "dmReqKey", "strStudId") 				// 학생ObjId
						  ,	p_strReSchYearRcd : util.DataMap.getValue(app, "dmResList", "strReSchYearRcd") 	// 재입학학년도
						  ,	p_strReSmtRcd : util.DataMap.getValue(app, "dmResList", "strReSmtRcd") 			// 재입학학기
						  , p_strLanDivRcd : msDefaultLocale
						}	
						
				 var voOzFormParam = {
							  TITLE : "장학금(비)수혜확인서" //리포트타이틀
							, SUB_TITLE : "" 		  		 //리포트서브타이틀		
							, FORM_TYPE : "flash"
							};	
							
				util.Report.open(app, "hojReport", "extCssSScalPmntCertPrt", voOzFormParam, voParam);
			}
		}, true);	
	}
	
	return moPage;
};
