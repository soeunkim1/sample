//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCgtSDgrSheetPrt.xtm"/>


var extCgtSDgrSheetPrt = function() {
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
		oObjDivRcd 	: "/root/reqKey/strDeptObjDivRcd",
		oCd 		: "/root/reqKey/strDeptCd",
		oCdNm 		: "ipbDeptNm",
		oStDt 		: "",
		oEndDt 		: "",
		oLanDivRcd 	: "",
		func 		: ""
	}
	];
	
	/* 
	 * 학생 검색팝업 관련 설정사항
	 */
	moPObject.moIdsForStdCsrPStSearch = [
	{
		controlId     	: "btnStudNoPop",
		iStudNo       	: "ipbStudNo",
		iStudId       	: "",
		iStudNm       	: "",
		iKeyDate	  	: "",
		iObjDivRcd 		: "",
		iObjCd     	  	: "",
		iObjNm 			: "",
		iAuthYN		  	: "",
		oStudId       	: "/root/reqKey/strStudId",
		oStudNo       	: "ipbStudNo",
		oStudNm       	: "",
		oSsn          	: "",
		oStatNm 	  	: "",
		oStatRcd	  	: "",
		oProcRslt	  	: "",
		oProcRsltYear	: "",
		oSaCd         	: "",
		oSaNm         	: "",					
		oSpCd         	: "",
		oSpNm         	: "",
		oOgCd 		  	: "",
		oOgNm 		  	: "",
		func 		  	: ""
	}
	];
	
	/**
	 * @desc Header Import onLoad
	 * @return void
	 * @author Aeyoung Lee at 2016. 7. 8.
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		doHeaderOnLoad();
	};
	
	/**
	 * @desc 온로드
	 * @return void
	 * @author Aeyoung Lee at 2016. 7. 8.
	 */
	moPage.onModelConstructDone_ExtCgtSDgrSheetPrt = function() {
		//검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch",["grpData"]);
		
		//졸업학년도학기 임포트
		doOnLoadImpCgtSch(function(pbSuccess){
			if(pbSuccess){
				//strCommand: onLoad 
				util.Submit.send(app, "subOnload", function(pbSuccess){
					util.Control.redraw(app, "dipCgtDt");
					util.Control.setEnable(app, false, "dipCgtDt");
				});	
			}
		});
		
	};
	
	/**
	 * @desc 팝업호출시 기준일자 셋팅
	 * @param 
	 * @return 
	 * @author Aeyoung Lee at 2016. 7. 8.
	 */
	function doSetPopKeyDate() {
		var vsKeyDate = ExtInstance.getValue("instance('impExtCgtSch')/root/reqKey/strKeyDate").substr(0,8);
		moPObject.moIdsForStdCmnPObjSch[0].iKeyDate = vsKeyDate;
		moPObject.moIdsForStdCsrPStSearch[0].iKeyDate = vsKeyDate;
	};
	
	/**
	 * @desc 학과 팝업 클릭 이벤트
	 * @param 
	 * @return 
	 * @author Aeyoung Lee at 2016. 7. 8.
	 */
	moPage.onClick_BtnDeptNmPop = function(sender) {
		doSetPopKeyDate();
		doOnClickStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc 학과명 변경 이벤트
	 * @param 
	 * @return 
	 * @author Aeyoung Lee at 2016. 7. 8.
	 */
	moPage.onValueChanged_IpbDeptNm = function(sender) {
		doSetPopKeyDate();
		doOnChangeStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc 학번 변경 이벤트
	 * @param 
	 * @return 
	 * @author Aeyoung Lee at 2016. 7. 8.
	 */
	moPage.onClick_BtnStudNoPop = function(sender) {
		doSetPopKeyDate();
		doOnClickStdCsrPStSearch(sender);
	};
	
	/**
	 * @desc 학번 검색 팝업 클릭 이벤트
	 * @param 
	 * @return 
	 * @author Aeyoung Lee at 2016. 7. 8.
	 */
	moPage.onValueChanged_IpbStudNo = function(sender) {
		doSetPopKeyDate();
		doOnChangeStdCsrPStSearch(sender);
	};
	
	/**
	 * @desc 졸업학년도/졸업학기 변경시 학과, 학번 초기화
	 * @param 
	 * @return 
	 * @author Aeyoung Lee at 2016. 7. 8.
	 */
	function doSetKeyDateYearSmtImp(){
		// 2017.01.10 초기화로직 주석	
//		ExtControl.reset(["ipbDeptNm", "ipbStudNo"]);
//		ExtInstance.setValue("/root/reqKey/strDeptCd", "");
//		ExtInstance.setValue("/root/reqKey/strDeptObjDivRcd", "");
//		ExtInstance.setValue("/root/reqKey/strStudId", "");
		
		// 해당 졸업학년도/학기 기준으로 졸업일자 다시 셋팅
		//strCommand: onLoad 
		util.Submit.send(app, "subOnload", function(pbSuccess){
			util.Control.redraw(app, "dipCgtDt");
			util.Control.setEnable(app, false, "dipCgtDt");
		});	
	};
	
	/**
	 * @desc 조회조건 수행
	 * @param
	 * @@return 
	 * @author Aeyoung Lee at 2016. 7. 8.
	 */
	moPage.onClick_BtnSearch = function() {
		//1.조회조건 필수 체크(학년도)
		if(!util.validate(app, ["cbbSchYearImpCgt", "cbbSmtImpCgt", "dipCgtDt"])) return;
		
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				
				//리퀘스트 셋팅
				var voParam = {
							p_strSchYearRcd : ExtInstance.getValue("instance('impExtCgtSch')/root/reqKey/strCgtSchYearRcd")			// 학년도
						  , p_strSmtRcd : ExtInstance.getValue("instance('impExtCgtSch')/root/reqKey/strCgtSmtRcd") 						// 학기
						  , p_strStudId : util.DataMap.getValue(app, "dmReqKey", "strStudId") 																		// 학생ObjId
						  , p_strSaCd : util.DataMap.getValue(app, "dmResList", "strSaList") 																		// in 조건 학사부서
						  , p_strCgtDt : util.DataMap.getValue(app, "dmReqKey", "strCgtDt") 																			// 졸업일자
						  , p_strLandivRcd : msDefaultLocale
						}	
						
				 var voOzFormParam = {
							  TITLE : "학위증서" //리포트타이틀
							, SUB_TITLE : "" 		  //리포트서브타이틀		
							, FORM_TYPE : "ACTIVE"
							};	
							
				util.Report.open(app, "hojReport", "extCgtSDgrSheetPrt", voOzFormParam, voParam);
				
			}
		});
	};
	
	
	return moPage;
};
