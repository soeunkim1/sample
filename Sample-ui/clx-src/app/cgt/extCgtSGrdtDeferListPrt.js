//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCgtSGrdtDeferListPrt.xtm"/>


var extCgtSGrdtDeferListPrt = function() {
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
	
	/**
	 * @desc Header Import onLoad
	 * @return void
	 * @author 유형기 at 2016. 7. 12.
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		doHeaderOnLoad();
	};
	
	/**
	 * @desc 객체검색 Import onLoad
	 * @return void
	 * @author Aeyoung Lee at 2017. 1. 18.
	 */
	moPage.onLoadImportDone_ImpStdCmnPobjSch = function() {
		setStdCmnPObjSchObjInfo();
	};
	
	/**
	 * @desc 온로드
	 * @return void
	 * @author 유형기 at 2016. 7. 12.
	 */
	moPage.onModelConstructDone_ExtCgtSGrdtDeferListPrt = function() {
		//검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch",["grpData"]);
		
		//졸업학년도학기 임포트
		doOnLoadImpCgtSch(function(){
			
			// 2017.01.18 학과에서 출력할 수 있도록 권한 부여하여 권한별 로직 적용
			// 전체권한[CC00102] : 
			if (moPageInfo.authRngRcd != "CC00102") {
				
				// 학과용 자동셋팅
				util.Control.setValue(app, "ckbPageNext", "Y");
				
				// 소속부서 자동셋팅
				util.Control.setValue(app, "ipbDeptNm", moUserInfo.asgnDeptNm);
				util.DataMap.setValue(app, "dmReqKey", "strDeptCd", moUserInfo.asgnDeptCd);
				util.DataMap.setValue(app, "dmReqKey", "strDeptObjDivRcd", moUserInfo.asgnDeptDivRcd);
				
				// 바로 조회
				util.Header.clickSearch(app);
			}	
		});
		
	};
	
	/**
	 * @desc 팝업호출시 기준일자 셋팅
	 * @param 
	 * @return 
	 * @author 유형기 at 2016. 7. 12.
	 */
	function doSetPopKeyDate() {
		var vsKeyDate = ExtInstance.getValue("instance('impExtCgtSch')/root/reqKey/strKeyDate").substr(0,8);
		moPObject.moIdsForStdCmnPObjSch[0].iKeyDate = vsKeyDate;
	};
	
	/**
	 * @desc 학과 팝업 클릭 이벤트
	 * @param 
	 * @return 
	 * @author 유형기 at 2016. 7. 12.
	 */
	moPage.onClick_BtnDeptNmPop = function(sender) {
		doSetPopKeyDate();
		doOnClickStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc 학과명 변경 이벤트
	 * @param 
	 * @return 
	 * @author 유형기 at 2016. 7. 12.
	 */
	moPage.onValueChanged_IpbDeptNm = function(sender) {
		doSetPopKeyDate();
		doOnChangeStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc 졸업학년도/졸업학기 변경시 학과 초기화
	 * @param 
	 * @return 
	 * @author 유형기 at 2016. 7. 12.
	 */
	function doSetKeyDateYearSmtImp(){
		// 2017.01.10 초기화로직 주석	
//		ExtControl.reset(["ipbDeptNm"]);
//		ExtInstance.setValue("/root/reqKey/strDeptCd", "");
//		ExtInstance.setValue("/root/reqKey/strDeptObjDivRcd", "");
	};
	
	/**
	 * @desc 조회조건 수행
	 * @param
	 * @@return 
	 * @author 유형기 at 2016. 7. 12.
	 */
	moPage.onClick_BtnSearch = function() {
		//1.조회조건 필수 체크(학년도)
		// 2017.01.18 학과에서 출력하도록 학과 필수로 변경
		if(!util.validate(app, ["cbbSchYearImpCgt", "cbbSmtImpCgt", "ipbDeptNm"])){
			return false;
		}
		
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				var vsSchYearSelIdx = util.SelectCtl.getSelectedIndex(app, "cbbSchYearImpCgt");
				var vsSmtSelIdx = util.SelectCtl.getSelectedIndex(app, "cbbSmtImpCgt");
			    var vsYearSmtTitle = util.SelectCtl.getLabel(app, "cbbSchYearImpCgt", vsSchYearSelIdx) + " " + util.SelectCtl.getLabel(app, "cbbSmtImpCgt", vsSmtSelIdx) + " 졸업유보자명부";	
				
				//리퀘스트 셋팅
				var voParam = {
							p_strSchYearRcd : ExtInstance.getValue("instance('impExtCgtSch')/root/reqKey/strCgtSchYearRcd")			// 학년도
						  , p_strSmtRcd : ExtInstance.getValue("instance('impExtCgtSch')/root/reqKey/strCgtSmtRcd") 				// 학기
						  , p_strSaCd : util.DataMap.getValue(app, "dmResList", "strSaList") 											// in 조건 학사부서
						  , p_strDeptPrtYn : util.DataMap.getValue(app, "dmReqKey", "strDeptPrtYn") 										// 2017.01.11 학과용 추가
						  , p_strKeyDate : ExtInstance.getValue("instance('impExtCgtSch')/root/reqKey/strKeyDate") 					// 기준일자
						  , p_strLandivRcd : msDefaultLocale																		// 언어
						}	
				
				 var voOzFormParam = {
							  TITLE : vsYearSmtTitle   //리포트타이틀
							, SUB_TITLE : "" 		   //리포트서브타이틀		
							, FORM_TYPE : "flash"
							};	
							
				util.Report.open(app, "hojReport", "extCgtSGrdtDeferListPrt", voOzFormParam, voParam);
				
			}
		});
	};
	
	return moPage;
};
