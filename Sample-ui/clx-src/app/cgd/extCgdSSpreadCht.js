//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCgdSSpreadCht.xtm"/>

/**
 * 학과별 성적분포표
 * @class extCgdSSpreadCht
 * @author 박갑수 at 2016. 9. 21
 */
var extCgdSSpreadCht = function() {
	var moPage = new Page();
	
	/**
	 * @desc import 헤더 초기화
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 9. 21
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		doHeaderOnLoad();
	};
	
	/**
	 * @desc onLoad 실행
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 9. 21
	 */
	moPage.onModelConstructDone_ExtCgdSSpreadCht = function() {
		// 검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grpData"]);
		
		// 서브미션 실행 (실패시 cover page)
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				
				// 조회조건 컨트롤 refresh
				util.Control.redraw(app, ["cbbSchYearRcd", "cbbSmtRcd", "cbbCmpDivRcd"]);
				
				// 이수구분 : 전공 default값 세팅
				util.SelectCtl.selectItem(app, "cbbCmpDivRcd", 1);
			}
		}, true);
	};
	
	/**
	 * @desc [btnSearch]조회 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 9. 21
	 */
	moPage.onClick_BtnSearch = function() {
		
		// 조회조건 필수 체크
		if(!util.validate(app, ["cbbSchYearRcd", "cbbCmpDivRcd"])){
			return false;
		}
		
		var vsSchYearRcd = util.Control.getValue(app, "cbbSchYearRcd");
		var vsSmtRcd = util.Control.getValue(app, "cbbSmtRcd");
		var vsCmpDivRcd = util.Control.getValue(app, "cbbCmpDivRcd");
		
		// 이수구분 In조건용
		var vsCmpDivRcdIn = "(";
		
		var vnLength = util.DataSet.getRowCount(app, "dsCmpDivRcdList");
		var vnCnt = 0; 
		for(var i=0; i<vnLength; i++){
			
			var vsCdPrp6 = util.DataSet.getValue(app, "dsCmpDivRcdList", "CD_PRP6" , i+1);
			
			if(vsCdPrp6 == vsCmpDivRcd){
				var vsCd = util.DataSet.getValue(app, "dsCmpDivRcdList", "CD" , i+1);
				
				if(vnCnt == 0){
					vsCmpDivRcdIn = vsCmpDivRcdIn + "'" + vsCd + "'";
				}else {
					
					vsCmpDivRcdIn = vsCmpDivRcdIn + ", '" + vsCd + "'";
				}
				vnCnt++;
			}
		}
		
		vsCmpDivRcdIn = vsCmpDivRcdIn + ")";
		
		var voParam = {
				p_strLanDivRcd 		: util.DataMap.getValue(app, "dmResOnLoad", "strLanDivRcd"),	// 언어키
				p_strSchYearRcd 	: vsSchYearRcd,															// 학년도코드
				p_strSmtRcd 			: vsSmtRcd,																	// 학기코드
				p_strCmpDivRcdIn	: vsCmpDivRcdIn,															// 이수구분 In조건용
				p_strCheckAuthId 	: moUserInfo.id																// 사용자ID
		};
		
		var vsSchYearRcdNm = ExtInstance.getValue("/root/resOnLoad/schYearRcdList/row", "CD_NM" , "child::CD='"+ vsSchYearRcd +"'");
		var vsSmtRcdNm = ExtInstance.getValue("/root/resOnLoad/smtRcdList/row", "CD_NM" , "child::CD='"+ vsSmtRcd +"'");
		var vsCmpDivRcdNm = ExtInstance.getValue("/root/resOnLoad/cteCmpDivRcdList/row", "CD_NM" , "child::CD='"+ vsCmpDivRcd +"'");
		var vsTitle = "";
		if(ValueUtil.isNull(vsSmtRcdNm)){
			vsTitle = vsSchYearRcdNm + " 학부(과)별 성적분포표(" + vsCmpDivRcdNm + ")";
		}else {
			vsTitle = vsSchYearRcdNm + " " + vsSmtRcdNm + " 학부(과)별 성적분포표(" + vsCmpDivRcdNm + ")";
		}
				
		var voOzFormParam = {
			  TITLE 		 : vsTitle			// 리포트타이틀
			, SUB_TITLE 	 : "" 					// 리포트서브타이틀		
			, FORM_TYPE : "flash"
		};
		
		util.Report.open(app, "hojReport", "extCgdSSpreadCht", voOzFormParam, voParam);
	};
	
	
	
	
	return moPage;
};
