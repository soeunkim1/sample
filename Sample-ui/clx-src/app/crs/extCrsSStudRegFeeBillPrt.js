//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCrsSStudRegFeeBillPrt.xtm"/>


var extCrsSStudRegFeeBillPrt = function() {
	var moPage = new Page();
	
	/**
	 * @desc Header Import onLoad
	 * @return void
	 * @author Aeyoung Lee at 2016. 6. 21
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		doHeaderOnLoad();
	}
	
	/**
	 * @desc 온로드
	 * @return void
	 * @author Aeyoung Lee at 2016. 6. 21
	 */
	moPage.onModelConstructDone_ExtCrsSStudRegFeeBillPrt = function() {
		
		if(moUserInfo.userDivRcd != "CC00501"){
			//학생만 사용가능한 화면입니다.
			util.Msg.alert("NLS-CRS-M093");
			util.coverPage(app);
			return;
		}	
		
		doOnLoad();	
	};
	
	/**
	 * @desc 온로드 실행
	 * @param 
	 * @return void
	 * @author Aeyoung Lee at 2016. 6. 21
	 */
	function doOnLoad(){
		
		util.DataMap.setValue(app, "dmReqKey", "strStudId", moUserInfo.id);
		
		// 서브미션 실행 (실패시 cover page)
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				
				var vsStDt = util.DataMap.getValue(app, "dmDate", "ST_DT").substr(0,8);
				var vsEndDt = util.DataMap.getValue(app, "dmDate", "END_DT").substr(0,8);
				
				//리퀘스트 셋팅
				var voParam = {
							p_strSchYearRcd : util.DataMap.getValue(app, "dmDate", "YEAR") 			// 학년도
						  , p_strSmtRcd : util.DataMap.getValue(app, "dmDate", "SMT") 				// 학기
						  , p_strStudId : util.DataMap.getValue(app, "dmReqKey", "strStudId") 				// 학생ObjId
						  , p_strPayTypeAll : util.DataMap.getValue(app, "dmResOnLoad", "strPayTypeAll") 		// 납부형태(전액)
						  , p_strPayTypeDiv : util.DataMap.getValue(app, "dmResOnLoad", "strPayTypeDiv") 		// 납부형태(분납)
						  , p_strDivPaySeq : util.DataMap.getValue(app, "dmResOnLoad", "strDivPaySeq") 			// 분납차수
						  , p_strPayDt : util.DataMap.getValue(app, "dmResOnLoad", "strDefPayDt") 					// 납부기간
						  , p_strPayPlace : util.DataMap.getValue(app, "dmResOnLoad", "strDefPayPlace") 			// 납부장소
						  , p_strSaList : ""
						  , p_strKeyStDt : vsStDt 	// 해당학년도학기 시작일자
						  , p_strKeyEndDt : vsEndDt  // 해당학년도학기 종료일자
						  , p_strLandivRcd : msDefaultLocale
						}	
						
				 var voOzFormParam = {
							  TITLE : "등록금고지서" //리포트타이틀
							, SUB_TITLE : "" 		  //리포트서브타이틀		
							, FORM_TYPE : "flash"
							};	
							
				util.Report.open(app, "hojReport", "extCrsSRegFeeBill", voOzFormParam, voParam);
			}
		});
	};

	return moPage;
};
