//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCrsSStudPaySheetPrt.xtm"/>


var extCrsSStudPaySheetPrt = function() {
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
	 * @author Aeyoung Lee at 2016. 6. 23
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		doHeaderOnLoad();
	};
	
	/**
	 * @desc 온로드
	 * @return void
	 * @author Aeyoung Lee at 2016. 6. 23
	 */
	moPage.onModelConstructDone_ExtCrsSStudPaySheetPrt = function() {
		//검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch",["grpData"]);
		
		//학년도학기 임포트
		doOnLoadImpNS("CRS", function(pbSuccess){
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
	 * @author Aeyoung Lee at 2016. 6. 23
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
	 * @desc 팝업호출시 기준일자 셋팅
	 * @param 
	 * @return 
	 * @author Aeyoung Lee at 2016. 6. 23
	 */
	function doSetPopKeyDate() {
		var vsEndDt = ExtInstance.getValue("instance('impCommonN')/root/date/END_DT").substr(0,8);
		
		moPObject.moIdsForStdCsrPStSearch[0].iKeyDate = vsEndDt;
	};
	
	/**
	 * @desc 학생검샙팝업 클릭 이벤트
	 * @param 
	 * @return 
	 * @author Aeyoung Lee at 2016. 6. 23
	 */
	moPage.onClick_BtnStudPop = function(sender) {
		doSetPopKeyDate();
		doOnClickStdCsrPStSearch(sender);
	}
	
	/**
	 * @desc 학번 변경 이벤트
	 * @param 
	 * @return 
	 * @author Aeyoung Lee at 2016. 6. 23
	 */
	moPage.onValueChanged_IpbStudId = function(sender) {
		doSetPopKeyDate();
		doOnChangeStdCsrPStSearch(sender);
	};
	
	/**
	 * 조회조건 수행
	 * @member moPage
	 * @type void
	 * @author Aeyoung Lee at 2016. 6. 23
	 */
	moPage.onClick_BtnSearch = function() {
		//1.조회조건 필수 체크
		if(!util.validate(app, ["cbbYearImpNS", "cbbSmtImpNS", "ipbStudId", "ipbStudIdObj"])){
			return false;
		}	
		
		doList();
	};
	
	/**
	 * @desc 조회조건 수행
	 * @param
	 * @@return 
	 * @author Aeyoung Lee at 2016. 6. 23
	 */
	function doList(poCallBackFunc) {
		
		var vsStDt = ExtInstance.getValue("instance('impCommonN')/root/date/ST_DT").substr(0,8);
		var vsEndDt = ExtInstance.getValue("instance('impCommonN')/root/date/END_DT").substr(0,8);
		
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				
				//리퀘스트 셋팅
				var voParam = {
							p_strSchYearRcd : util.Control.getValue(app, "cbbYearImpNS") 			// 학년도
						  , p_strSmtRcd : util.Control.getValue(app, "cbbSmtImpNS") 				// 학기
						  , p_strStudId : util.DataMap.getValue(app, "dmReqKey", "strStudId") 	// 학생ObjId
						  , p_strKeyStDt : vsStDt 	// 해당학년도학기 시작일자
						  , p_strKeyEndDt : vsEndDt  // 해당학년도학기 종료일자
						  , p_strLandivRcd : msDefaultLocale
						}	
						
				 var voOzFormParam = {
							  TITLE : "등록금납부확인서" //리포트타이틀
							, SUB_TITLE : "" 		  //리포트서브타이틀		
							, FORM_TYPE : "flash"
							};	
							
				util.Report.open(app, "hojReport", "extCrsSStudPaySheetPrt", voOzFormParam, voParam);
				
			}
		});
	}
	
	return moPage;
};
