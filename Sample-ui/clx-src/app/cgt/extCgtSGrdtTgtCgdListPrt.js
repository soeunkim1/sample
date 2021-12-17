//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCgtSGrdtTgtCgdListPrt.xtm"/>


var extCgtSGrdtTgtCgdListPrt = function() {
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
		iObjDivRcd 	: ["CC009SA"],
		iLanDivRcd 	: "",
		iKeyDate 	: "",
		oObjDivRcd 	: "/root/reqKey/strDeptObjDivRcd",
		oCd 		: "/root/reqKey/strDeptCd",
		oCdNm 		: "ipbDeptNm",
		oStDt 		: "",
		oEndDt 		: "",
		oLanDivRcd 	: "",
		func : function(poParam) {
			
			util.DataMap.setValue(app, "dmReqKey", "strStudId", "");
			util.Control.setValue(app, "ipbStudId", "");
			util.DataMap.setValue(app, "dmReqKey", "strStudNo", "");
			util.Control.redraw(app, "ipbStudId");
				
			
		}
	}
	];
	
	
	
	// 학생검색팝업
	moPObject.moIdsForStdCsrPStSearch = [
	{
		controlId 					: "btnStudId",
		iStudNo 					: "ipbStudId",	
		iStudId 						: "",
		iStudNm 					: "",
		iKeyDate 					: "/root/resOnLoad/strCutDt", 
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
		oSaNm						: "ipbDeptNm",
		oSaCd 						: "/root/reqKey/strDeptCd",
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
			var vsStudId = util.Control.getValue(app, "ipbStudId");
			// 검색조건있을경우 바로조회
			if(!ValueUtil.isNull(vsStudId)){
				util.DataMap.setValue(app, "dmReqKey", "strDeptObjDivRcd", "CC009SA");
				util.Header.clickSearch(app);
			}
		}
	}];
	
	
	
	
	/**
	 * @desc Header Import onLoad
	 * @return void
	 * @author 유형기 at 2016. 7. 11.
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		doHeaderOnLoad();
	};
	
	/**
	 * @desc 온로드
	 * @return void
	 * @author 유형기 at 2016. 7. 11.
	 */
	moPage.onModelConstructDone_ExtCgtSGrdtTgtListPrt = function() {
		//검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch",["grpData"]);
		
		//졸업학년도학기 임포트
		doOnLoadImpCgtSch();
		
		
	};
	
	/**
	 * @desc 팝업호출시 기준일자 셋팅
	 * @param 
	 * @return 
	 * @author 유형기 at 2016. 7. 11.
	 */
	function doSetPopKeyDate() {
		var vsKeyDate = ExtInstance.getValue("instance('impExtCgtSch')/root/reqKey/strKeyDate").substr(0,8);
		moPObject.moIdsForStdCmnPObjSch[0].iKeyDate = vsKeyDate;
	};
	
	/**
	 * @desc 학과 팝업 클릭 이벤트
	 * @param 
	 * @return 
	 * @author 유형기 at 2016. 7. 11.
	 */
	moPage.onClick_BtnDeptNmPop = function(sender) {
		doSetPopKeyDate();
		doOnClickStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc 학과명 변경 이벤트
	 * @param 
	 * @return 
	 * @author 유형기 at 2016. 7. 11.
	 */
	moPage.onValueChanged_IpbDeptNm = function(sender) {
		doSetPopKeyDate();
		doOnChangeStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc 졸업학년도/졸업학기 변경시 학과 초기화
	 * @param 
	 * @return 
	 * @author 유형기 at 2016. 7. 11.
	 */
	function doSetKeyDateYearSmtImp(){
		util.Control.reset(app, ["ipbDeptNm"]);
		util.DataMap.setValue(app, "dmReqKey", "strDeptCd", "");
		util.DataMap.setValue(app, "dmReqKey", "strDeptObjDivRcd", "");
	};
	
	/**
	 * @desc 조회조건 수행
	 * @param
	 * @@return 
	 * @author 유형기 at 2016. 7. 11.
	 */
	moPage.onClick_BtnSearch = function() {
		//1.조회조건 필수 체크(학년도)
		if(!util.validate(app, ["cbbSchYearImpCgt", "cbbSmtImpCgt", "ipbDeptNm"])) return;
		
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				
				var vsSchYearSelIdx = util.SelectCtl.getSelectedIndex(app, "cbbSchYearImpCgt");
				var vsSmtSelIdx = util.SelectCtl.getSelectedIndex(app, "cbbSmtImpCgt");
			    var vsYearSmt = util.SelectCtl.getLabel(app, "cbbSchYearImpCgt", vsSchYearSelIdx) + " " + util.SelectCtl.getLabel(app, "cbbSmtImpCgt", vsSmtSelIdx);	
				var vsSaCd		= util.DataMap.getValue(app, "dmReqKey", "strDeptCd");
				var vsReRecYn	= util.DataMap.getValue(app, "dmReqKey", "strReRecYn");
				
				//리퀘스트 셋팅
				var voParam = {
							p_strSchYearRcd 	: ExtInstance.getValue("instance('impExtCgtSch')/root/reqKey/strCgtSchYearRcd")			// 학년도
						  , p_strSmtRcd 			: ExtInstance.getValue("instance('impExtCgtSch')/root/reqKey/strCgtSmtRcd") 						// 학기						  
						  , p_strListSaCd 		: util.DataMap.getValue(app, "dmResList", "strSaList") 																		// in 조건 학사부서
						  , p_strKeyDate 		: ExtInstance.getValue("instance('impExtCgtSch')/root/reqKey/strKeyDate") 							// 기준일자
						  , p_strStudId			: util.DataMap.getValue(app, "dmReqKey", "strStudId")
						  , p_strLanDivRcd 		: msDefaultLocale																											// 언어
						  , p_strYearSmt 		: vsYearSmt
						  , p_strReRecYn 		: vsReRecYn
						}	
				
				 var voOzFormParam = {
							  TITLE :  "졸업대상자 성적"   //리포트타이틀
							, SUB_TITLE : "" 		         //리포트서브타이틀		
							, FORM_TYPE : "active"
							};	
							
				util.Report.open(app, "hojReport", "extCgtSGrdtTgtCgdListPrt", voOzFormParam, voParam);
				
			}
		});
	};
	
	
	
	moPage.onClick_BtnStudId = function(sender) {
		// 학생검색팝업 호출
		doOnClickStdCsrPStSearch(sender);
	}
	
	moPage.onValueChanged_IpbStudId = function(sender) {
		// 값변경시 학생검색팝업 호출
		doOnChangeStdCsrPStSearch(sender);
	}
	return moPage;
};
