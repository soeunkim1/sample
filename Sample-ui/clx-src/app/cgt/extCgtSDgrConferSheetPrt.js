//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
///<xtmlink path="./extCgtSDgrConferSheetPrt.xtm"/>

var extCgtSDgrConferSheetPrt = function() {

	var moPage = new Page();
	//임포트용 데이터 통신 오브젝트
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
	 * @desc 온로드
	 * @return void
	 * @author 유형기 at 2016. 7. 12.
	 */
	moPage.onModelConstructDone_ExtCgtSDgrConferSheetPrt = function() {
		//검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch",["grpData"]);
		
		//졸업학년도학기 임포트
		doOnLoadImpCgtSch(function(pbSuccess){
			if(pbSuccess){
				//strCommand: onLoad 
				util.Submit.send(app, "subOnload", function(pbSuccess){
					util.Control.setValue(app, "dipSubDate",util.DataMap.getValue(app, "dmResOnLoad", "strCutDt"));
					
					util.Control.redraw(app, ["dipCgtDt","dipSubDate"]);
					util.Control.setEnable(app, false, "dipCgtDt");
				});	
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
		
		// 해당 졸업학년도/학기 기준으로 졸업일자 다시 셋팅
		//strCommand: onLoad 
		util.Submit.send(app, "subOnload", function(pbSuccess){
			util.Control.redraw(app, "dipCgtDt");
			util.Control.setEnable(app, false, "dipCgtDt");
		});	
		
	};

	/**
	 * @desc 조회버튼 클릭
	 * @param 
	 * @return void
	 * @author 유형기 at 2016. 7. 12.
	 */
	moPage.onClick_BtnSearch = function() {
		// 조회조건 필수 체크
		if(!util.validate(app, ["grpSearch"])){
			return false;
		}
		
		doList();
	};
	
	/**
	 * @desc 조회조건 수행
	 * @param
	 * @@return 
	 * @author 유형기 at 2016. 7. 12.
	 */
	function doList(poCallBackFunc) {
		
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				var vsSchYearSelIdx = util.SelectCtl.getSelectedIndex(app, "cbbSchYearImpCgt");
				var vsSmtSelIdx = util.SelectCtl.getSelectedIndex(app, "cbbSmtImpCgt");
				var vsSchYearSelNm = util.SelectCtl.getLabel(app, "cbbSchYearImpCgt", vsSchYearSelIdx);
				var vsSmtSelNm = util.SelectCtl.getLabel(app, "cbbSmtImpCgt", vsSmtSelIdx);
				
				//리퀘스트 셋팅
				var voParam = {
							p_strSchYearRcd : ExtInstance.getValue("instance('impExtCgtSch')/root/reqKey/strCgtSchYearRcd")			// 학년도코드
						  , p_strSmtRcd : ExtInstance.getValue("instance('impExtCgtSch')/root/reqKey/strCgtSmtRcd") 						// 학기코드
						  , p_strSaCd : util.DataMap.getValue(app, "dmResList", "strSaList") 																		// in 조건 학사부서
						  , p_strKeyDate : ExtInstance.getValue("instance('impExtCgtSch')/root/reqKey/strKeyDate") 							// 기준일자
						  , p_strCgtDt : util.DataMap.getValue(app, "dmReqKey", "strCgtDt")																			// 졸업일자
						  , p_strGetTime : util.DataMap.getValue(app, "dmReqKey", "strGetTime")																	// 수령시간
						  , p_strSubDate : util.DataMap.getValue(app, "dmReqKey", "strSubDate").substring(0, 8)																// 발송일자
						  , p_strLanDivRcd : msDefaultLocale
						  , p_strSchYearSelNm : vsSchYearSelNm																									// 학년도
						  , p_strSmtSelNm : vsSmtSelNm																													// 학기
						}	
				
				// 2017.01.18 active 모드로 변경
				 var voOzFormParam = {
							  TITLE : "학위수여통지서" //리포트타이틀
							, SUB_TITLE : "" 		  //리포트서브타이틀		
							, FORM_TYPE : "active"
							};	
							
				util.Report.open(app, "hojReport", "extCgtSDgrConferSheetPrt", voOzFormParam, voParam);
				
			}
		});
	}
	
	return moPage;
};

