//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCrsSRegTransListPrt.xtm"/>


var extCrsSRegTransListPrt = function() {
	var moPage = new Page();
	
	/**
	 * @desc Header Import onLoad
	 * @return void
	 * @author Aeyoung Lee at 2016. 10. 24.
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		doHeaderOnLoad();
	};
	
	/**
	 * @desc 온로드
	 * @return void
	 * @author Aeyoung Lee at 2016. 10. 24.
	 */
	moPage.onModelConstructDone_ExtCrsSRegTransListPrt = function() {
		//검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch",["grpData"]);
		
		//학년도학기 임포트
		doOnLoadImpNS("CRS");
	};
	
	/**
	 * 조회조건 수행
	 * @member moPage
	 * @type void
	 * @author Aeyoung Lee at 2016. 10. 24.
	 */
	moPage.onClick_BtnSearch = function() {
		//1.조회조건 필수 체크(학년도)
		if(!util.validate(app, ["cbbYearImpNS", "cbbSmtImpNS"])) return;
		
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
							p_strSchYearRcd : util.DataMap.getValue(app, "dmReqKey", "strSchYearRcd") 			// 학년도
						  , p_strSmtRcd : util.DataMap.getValue(app, "dmReqKey", "strSmtRcd") 					// 학기
						  , p_strSubTitle : util.DataMap.getValue(app, "dmReqKey", "strRptSubTitle")				// 학년도 학기명
						  , p_strCsrSmtRcd : util.DataMap.getValue(app, "dmResList", "strCsrSmtRcd")				// 학기(학적용)
						  , p_strKeyStDt : vsStDt 	// 해당학년도학기 시작일자
						  , p_strKeyEndDt : vsEndDt  // 해당학년도학기 종료일자
						  , p_strLanDivRcd : msDefaultLocale
						  , p_strPgmId : moPageInfo.pgmId
						  , p_strUserId : moUserInfo.userId
						}	
						
				 var voOzFormParam = {
							  TITLE : "등록이월 복학생 명단" //리포트타이틀
							, SUB_TITLE : "" 		//리포트서브타이틀		
							, FORM_TYPE : "flash"
							};	
							
				util.Report.open(app, "hojReport", "extCrsSRegTransListPrt", voOzFormParam, voParam);
			}
		});	
		
	};
		
	return moPage;
};
