//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCcsSLectEvalRsltRpt.xtm"/>

/**
 * 강의평가시행결과보고서
 * @class extCcsSLectEvalRsltRpt
 * @author 박갑수 at 2016. 8. 11
 */
var extCcsSLectEvalRsltRpt = function() {
	var moPage = new Page();
	
	// 학년도 ,학기, 출력순서를 원래데이터로 되돌리기위한 변수
	var msSchYearRcd = "";
	var msSmtRcd = "";
	
	/**
	 * @desc import 헤더 초기화
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 8. 11
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		doHeaderOnLoad();
	};
	
	/**
	 * @desc onLoad 실행
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 8. 11
	 */
	moPage.onModelConstructDone_ExtCcsSLectEvalRsltRpt = function() {
		// 검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grpData"]);
		
		// 서브미션 실행 (실패시 cover page)
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				
				
				// 조회조건 컨트롤 refresh(학년도, 학기)
				util.Control.redraw(app, ["cbbSchYearRcd", "cbbSmtRcd", "dipKeyDate"]);
				
				// 조회조건초기값 세팅
				util.Control.setValue(app, "ipbRank", "3");
			}
		}, true);
	};
	
	
	
	/**
	 * @desc 학년도, 학기 변경시 강의평가 기준일자를 가져온다. 학사일정 end_dt (강의평가 기간)
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 8. 11
	 */
	function doScheduleList() {
		
		// 서브미션 실행 (실패시 cover page)
		//strCommand: scheduleList 
		util.Submit.send(app, "subSche", function(pbSuccess){
			if(pbSuccess){
				var vsLectEvalEndDt = util.DataMap.getValue(app, "dmResOnLoad", "strKeyDate");
				var vsSchYearRcd 	= util.DataMap.getValue(app, "dmKeyDateMap", "YEAR");
				var vsSmtRcd		= util.DataMap.getValue(app, "dmKeyDateMap", "SMT");
				
				var vsSchYearRcdNm = ExtInstance.getValue("/root/resOnLoad/schYearRcdList/row"	, "CD_NM", "child::CD='"+vsSchYearRcd+"'");
				var vsSmtRcdNm 		= ExtInstance.getValue("/root/resOnLoad/smtRcdList/row"			, "CD_NM", "child::CD='"+vsSmtRcd+"'");
				
				
				if(vsLectEvalEndDt == ""){
					//alert(vsSchYearRcdNm + " "+vsSmtRcdNm+ " 에 학사일정 강의평가 기간이 등록 되어 있지 않습니다. \n기준일자를 선택 후 조회 하세요.");
					util.Msg.alert("NLS-CCS-EXT016", [vsSchYearRcdNm, vsSmtRcdNm]);
				}
				util.Control.redraw(app, [ "dipKeyDate"]);
			}
		});
	};
	
	
	
	
	
	
	
	/**
	 * @desc [cbbSchYearRcd]학년도 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 8. 11
	 */
	moPage.onValueChanged_CbbSchYearRcd = function() {
		// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
		doChangeYearSmt("year");
	};
	
	/**
	 * @desc [cbbSmtRcd]학기 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 8. 11
	 */
	moPage.onValueChanged_CbbSmtRcd = function() {
		// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
		doChangeYearSmt("smt");
	};
	
	/**
	 * @desc 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 8. 11
	 */
	function doChangeYearSmt(psDiv) {
		//strCommand: date 
		util.Submit.send(app, "subDate", function(pbSuccess){
			if(pbSuccess){				
				msSchYearRcd = util.DataMap.getValue(app, "dmKeyDateMap", "YEAR");
				msSmtRcd = util.DataMap.getValue(app, "dmKeyDateMap", "SMT");
				
				page.doScheduleList();
				
			// Exception 발생시
			}else {
				if(psDiv == "year"){
					util.Control.setValue(app, "cbbSchYearRcd", msSchYearRcd);
				}else if(psDiv == "smt"){
					util.Control.setValue(app, "cbbSmtRcd", msSmtRcd);
				}
			}
		});
	};
	
	/**
	 * @desc [cbbSmtRcd]학기 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 8. 11
	 */
	moPage.onValueChanged_IpbRank = function() {
		ValidUtil.checkIntegerDecimal("ipbRank", 3, 0, true);
	};
	
	/**
	 * @desc [btnSearch]조회 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 8. 11
	 */
	moPage.onClick_BtnSearch = function() {
		
		// 조회조건 필수 체크
		if(!util.validate(app, ["cbbSchYearRcd", "cbbSmtRcd", "dipKeyDate", "ipbRank"])){
			return false;
		}
		

		var vsSchYearRcd = util.Control.getValue(app, "cbbSchYearRcd");
		var vsSmtRcd = util.Control.getValue(app, "cbbSmtRcd");
		
		var voParam = {
				p_strLanDivRcd 		: util.DataMap.getValue(app, "dmResOnLoad", "strLanDivRcd"),	// 언어키
				p_strKeyDate 		: util.Control.getValue(app, "dipKeyDate"),									// 기준일자
				p_strSchYearRcd 	: vsSchYearRcd,															// 학년도코드
				p_strSmtRcd 			: vsSmtRcd,																	// 학기코드
				p_strRank				: util.Control.getValue(app, "ipbRank")										// 순위
		};
		
		var vsTitle = "강의평가시행결과보고서";
		
		var voOzFormParam = {
			  TITLE 		 : vsTitle			// 리포트타이틀
			, SUB_TITLE 	 : "" 					// 리포트서브타이틀		
			, FORM_TYPE : "flash"
		};
		
		util.Report.open(app, "hojReport", "extCcsSLectEvalRsltRpt", voOzFormParam, voParam);
	}
	
	
	
	
	return moPage;
};
