//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCcsSLectEvalConvTypePrt.xtm"/>

/**
 * 개설과목관리
 * @class stdCcsCCurClsFrf
 * @author 박갑수 at 2016. 2. 4
 */
var extCcsSLectEvalConvTypePrt = function() {
	var moPage = new Page();
	
	// 임포트용 데이터 통신 오브젝트
	var moPObject = new Page();
	
	
	// 객체검색팝업 호출
	moPObject.moIdsForStdCmnPObjSch = [
	{
		controlId			:	"btnSaCd",
		iCd					:	"",
		iNm					:	"ipbSaNm",
		iObjDivRcd			:	["CC009OG"],
		iStartObject    	:   "",
		iOtDivRcd			:	"",
		iOtIsTreeView	:	"",
		iLanDivRcd		:	"/root/resOnLoad/strLanDivRcd",
		iKeyDate			:	"/root/keyDateMap/ST_DT",
		iKeyEndDate		:	"",
		oObjDivRcd		:	"/root/reqKey/strObjDivRcd",
		oCd					:	"/root/reqKey/strObjCd",
		oCdNm				:	"ipbSaNm",
		oBegDt				:	"",
		oEndDt				:	"",
		oLanDivRcd		:	"",
		func 					:  function(poRtnValue){
		}
	}];
	
	
	
	
	// 학년도 학기를 원래데이터로 되돌리기위한 변수
	var msSchYearRcd = "";
	var msSmtRcd = "";
	
	/**
	 * @desc import 헤더 초기화
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 2. 4
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		// import 헤더 초기화
		doHeaderOnLoad();
	};
	
	/**
	 * @desc onLoad 실행
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 4
	 */
	moPage.onModelConstructDone_StdCcsCOpenSubFrf = function() {
		
		
		
		// 검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grpData"]);
		
		// 서브미션 호출
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				
				util.Control.redraw(app, ["cbbSchYearRcd", "cbbSmtRcd", "cbbDiv", "cbbDeptDiv", "dipKeyDate"]);
				// 학년도 학기값 되돌리기위한 값
				msSchYearRcd = util.DataMap.getValue(app, "dmKeyDateMap", "YEAR");
				msSmtRcd = util.DataMap.getValue(app, "dmKeyDateMap", "SMT");
				
				util.SelectCtl.selectItem(app, "cbbDiv", 0);
				util.SelectCtl.selectItem(app, "cbbDeptDiv", 0);
				
				setStdCmnPObjSchObjInfo();
				
			}
		}, true);
	};
	
	
	
	/**
	 * @desc [cbbSchYearRcd]학년도 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 4
	 */
	moPage.onValueChanged_CbbSchYearRcd = function() {
		// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
		doChangeYearSmt("year");
	};
	
	/**
	 * @desc [cbbSmtRcd]학기 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 4
	 */
	moPage.onValueChanged_CbbSmtRcd = function() {
		// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
		doChangeYearSmt("smt");
	};
	
	/**
	 * @desc 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 5
	 */
	function doChangeYearSmt(psDiv) {
		//strCommand: date 
		util.Submit.send(app, "subDate", function(pbSuccess){
			if(pbSuccess){
				msSchYearRcd = util.DataMap.getValue(app, "dmKeyDateMap", "YEAR");
				msSmtRcd = util.DataMap.getValue(app, "dmKeyDateMap", "SMT");
				
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
	 * @desc [btnSearch]조회 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 11
	 */
	moPage.onClick_BtnSearch = function() {
		 
		 
		 // 조회조건 필수 체크
		if(!util.validate(app, ["cbbSchYearRcd", "cbbSmtRcd", "dipKeyDate", "ipbSaNm"])){
			return false;
		}
		
		doList(function(pbSuccess) {
			
		});
	};
	
	/**
	 * @desc 개설과목목록 조회
	 * @param poCallBackFunc 콜백정의
	 * @return void
	 * @author 박갑수 at 2016. 2. 11
	 */
	function doList(poCallBackFunc) {	
	
		//strCommand: ogList 
		util.Submit.send(app, "subOgList", function(pbSuccess){
			if(pbSuccess){
		
	
					var vsSchYearRcd 	=  util.DataMap.getValue(app, "dmKeyDateMap", "YEAR");
					var vsSmtRcd 		=  util.DataMap.getValue(app, "dmKeyDateMap", "SMT");
					var vsKeyDate 		=  util.DataMap.getValue(app, "dmResOnLoad", "strKeyDate");
					var vsStaffSubGrp 	=  util.DataMap.getValue(app, "dmReqKey", "strStaffSubGrp");
					var vsDeptDiv 		=  util.DataMap.getValue(app, "dmReqKey", "strDeptDiv");
					var vsUpCnt 			= util.DataMap.getValue(app, "dmReqKey", "strUpCnt");
					var vsDownCnt 		= util.DataMap.getValue(app, "dmReqKey", "strDownCnt");
					var vsOgCdList 		= util.DataMap.getValue(app, "dmResList", "strListOgCd");				
					var vsRepNm			= util.DataMap.getValue(app, "dmReqKey", "strRepNm");
				
				
					var voParam = {
							p_strLanDivRcd 		: util.DataMap.getValue(app, "dmResOnLoad", "strLanDivRcd"),	// 언어키
							p_strKeyDate 		: vsKeyDate,									// 기준일자
							p_strSchYearRcd 	: vsSchYearRcd,															// 학년도코드
							p_strSmtRcd 			: vsSmtRcd,																	// 학기코드
							p_strStaffSubGrp     : vsStaffSubGrp,						//--전임/비전임
							p_strDeptDiv			: vsDeptDiv,							//전체 /  학과
							p_strUpCnt				: vsUpCnt,								//상위
							p_strDownCnt		: vsDownCnt,							//하위
							p_strOgCd	 			: vsOgCdList,  													      	 			// 부서코드
							p_strRepNm			: vsRepNm,							//성명
							p_strMenuId 				: moPageInfo.menuId,												// 메뉴ID
							p_strCheckAuthId 		: moUserInfo.id														// 사용자ID
					};
					
					var vsTitle = "";
					var vsSchYearRcdValue 	= vsSchYearRcd.substring(5, 10);		
					var vsSmtRcdValue		= ExtInstance.getValue("/root/resOnLoad/smtRcdList/row", "CD_NM", "child::CD = '"+vsSmtRcd+"'");
					
					
					vsTitle = vsSchYearRcdValue+"-"+vsSmtRcdValue;
					/*
						전임 : CF00310
						외래 : CF00399
					*/		
					if('CF00310' == vsStaffSubGrp){
						vsTitle = vsTitle+" 전임교수";
					}else if('CF00399' == vsStaffSubGrp){
						vsTitle = vsTitle+" 외래교수";
					}else{
						vsTitle = vsTitle+" 전체";
					}
					
					vsTitle = vsTitle + " 환산점수 집계표";
					
					if(!ValueUtil.isNull(vsUpCnt)){
						vsTitle = vsTitle + "-(상위 "+vsUpCnt+"위)";
					}
					
					if(!ValueUtil.isNull(vsDownCnt)){
						vsTitle = vsTitle + "-(하위 "+vsDownCnt+"위)";
					}
					
					
					var voOzFormParam = {
						  TITLE 		 : vsTitle			// 리포트타이틀
						, SUB_TITLE 	 : "" 					// 리포트서브타이틀		
						, FORM_TYPE : "flash"
					};
					
					util.Report.open(app, "hojReport", "extCcsSLectEvalConvTypePrt", voOzFormParam, voParam);
					
					
			}
		});
		
	};
	
	
	
	
	moPage.onClick_BtnSaCd = function(sender) {
		// 객체검색팝업 호출
		doOnClickStdCmnPObjSch(sender);
	}
	
	moPage.onValueChanged_IpbSaNm = function(sender) {
		
		
		// 값변경시 객체검색팝업 호출
		doOnChangeStdCmnPObjSch(sender);
	}
	return moPage;
};
