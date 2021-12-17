﻿//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCgdSWarnIfrSheet.xtm"/>

/**
 * 대체 인정과목표
 * @class extCgdSWarnIfrSheet
 * @author 박갑수 at 2016. 6. 29
 */
var extCgdSWarnIfrSheet = function() {
	var moPage = new Page();
	var moPObject = new PObject();
	
	/**
	 * 학생검색팝업 관련 설정사항
	 * 설정가능 유형 : 
	 *   1. 인스턴스((/root/시작))
	 *   2. 그리드의 셀 (ghc시작)
	 *   3. 컨트롤 id
	 * 각 변수별 설명
	 *  iXXX : 팝업으로 input 전달될 파라미터
	 *  oXXX : 팝업에서 선택한 값을 받을 컬럼 아이디
	 *  1. controlId 			: 최초 이벤트의 버튼이나 그리드 id	(필수)
	 *  2. iStudNo 			: 검색조건 학번								(선택) (값이 존재할 경우 4자리 이상)
	 *  3. iStudId 				: 검색조건 학번오브젝트					(선택)
	 *  4. iStudNm 			: 이름        									(선택) (값이 존재할 경우 2자리 이상)
	 *  5. iKeyDate 			: 기준일 										(필수)
	 *  6. iObjDivRcd 		: 객체구분코드 								(선택)
	 *  7. iObjCd 				: 부서코드										(선택)
	 *  8. iObjNm 			: 부서명											(선택) 
	 *  10. iStatRcd			: 학적상태										(선택) 
	 *  11. iStudDivRcd		: 학생구분										(선택) 
	 *  12. oStudId			: 학번오브젝트
	 *  13. oStudNo 			: 학번
	 *  14. oStudNm 		: 이름
	 *  15. oStatNm 			: 학적상태명
	 *  16. oStatRcd 			: 학적상태코드
	 *  17. oProcRslt 		: 진급학기
	 *  18. oProcRsltYear 	: 진급학년
	 *  19. oSaCd 			: 학사부서코드명
	 *  20. oSaNm 			: 학사부서명
	 *  21. oSpCd 			: 이수과정코드명
	 *  22. oSpNm 			: 이수과정명
	 *  23. oOgCd 			: 행정부서코드명
	 *  24. oOgNm 			: 행정부서명
	 *  25. oStudDivRcd		: 학생구분코드
	 *  26. oStudDivNm		: 학생구분명
	 *  27. oBirthday			: 생년월일
	 *  28. oGenderRcd		: 성별코드
	 *  29. oGenderNm		: 성별명
	 *  30. func 				: 팝업에서 선택한 값을 받은 후 추가 로직이 필요한 경우 함수 작성
	 */
	moPObject.moIdsForStdCsrPStSearch = [
	{
		controlId 					: "btnPopStudSearch",
		iStudNo 					: "ipbStudNo",	
		iStudId 						: "",
		iStudNm 					: "",
		iKeyDate 					: "/root/keyDateMap/END_DT",
		iObjDivRcd 				: "",
		iObjCd 						: "",
		iObjNm 					: "",
		iStatRcd 					:"",
		iStudDivRcd				: "",
		oStudId 					: "/root/reqKey/strStudId",
		oStudNo 					: "ipbStudNo",
		oStudNm 					: "",
		oStatNm 					: "",
		oStatRcd 					: "",
		oProcRslt 					: "",
		oProcRsltYear 			: "",
		oSaNm						: "",
		oSaCd 						: "",
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
		}
	}
	];
	
	// 객체검색팝업 호출
	moPObject.moIdsForStdCmnPObjSch = [
	{
		controlId			:	"btnOgCdNm",
		iCd					:	"",
		iNm					:	"ipbOgCdNm",
		iObjDivRcd			:	["CC009OG"],
		iStartObject    	:   "",
		iOtDivRcd			:	"",
		iOtIsTreeView	:	"",
		iLanDivRcd		:	"",
		iKeyDate			:	"/root/keyDateMap/ST_DT",
		iKeyEndDate		:	"",
		oObjDivRcd		:	"/root/reqKey/strObjDivRcd",
		oCd					:	"/root/reqKey/strObjCd",
		oCdNm				:	"ipbOgCdNm",
		oBegDt				:	"",
		oEndDt				:	"",
		oLanDivRcd		:	"",
		func 					:  function(){
		}
	}];
	
	// 학년도 ,학기, 출력순서를 원래데이터로 되돌리기위한 변수
	var msSchYearRcd = "";
	var msSmtRcd = "";
	
	/**
	 * @desc import 헤더 초기화
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 6. 29
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		doHeaderOnLoad();
	};
	
	/**
	 * @desc onLoad 실행
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 6. 29
	 */
	moPage.onModelConstructDone_ExtCgdSWarnIfrSheet = function() {
		// 검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grpData"]);
		
		// 서브미션 실행 (실패시 cover page)
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				
				// 조회조건 컨트롤 refresh(학년도, 학기)
				util.Control.redraw(app, ["cbbSchYearRcd", "cbbSmtRcd"]);
				
				// 학기 필터링으로인해 계절학기일경우 빈값으로 세팅
				var vsSmtRcd = util.Control.getValue(app, "cbbSmtRcd");
				var vsCdPrp1 = ExtInstance.getValue("/root/resOnLoad/smtRcdList/row", "CD_PRP1" , "child::CD='"+vsSmtRcd+"'");
				if(ValueUtil.fixNull(vsCdPrp1) != "CA00101"){
					util.Control.setValue(app, "cbbSmtRcd", "");
				}
				
				util.DataMap.setValue(app, "dmReqKey", "strWarn", "CD21102");
				
				util.Control.setValue(app, "ipbOgCdNm", moUserInfo.asgnDeptNm);
				util.DataMap.setValue(app, "dmReqKey", "strObjCd", moUserInfo.asgnDeptCd);
				util.DataMap.setValue(app, "dmReqKey", "strObjDivRcd", moUserInfo.asgnDeptDivRcd);
			}
		}, true);
	};
	
	/**
	 * @desc [cbbSchYearRcd]학년도 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 6. 29
	 */
	moPage.onValueChanged_CbbSchYearRcd = function() {
		// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
		doChangeYearSmt("year");
	};
	
	/**
	 * @desc [cbbSmtRcd]학기 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 6. 29
	 */
	moPage.onValueChanged_CbbSmtRcd = function() {
		// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
		doChangeYearSmt("smt");
	};
	
	/**
	 * @desc 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 6. 29
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
	 * @author 박갑수 at 2016. 6. 29
	 */
	moPage.onClick_BtnSearch = function() {
		
		// 조회조건 필수 체크
		if(!util.validate(app, ["grpSearch"])){
			return false;
		}
		
		var vsSchYearRcd = util.Control.getValue(app, "cbbSchYearRcd");
		var vsSmtRcd = util.Control.getValue(app, "cbbSmtRcd");
		
		var voParam = {
				p_strLandivRcd 		: util.DataMap.getValue(app, "dmResOnLoad", "strLanDivRcd"),	// 언어키
				p_strPKeyDate 		: util.DataMap.getValue(app, "dmKeyDateMap", "END_DT"),		// 기준일자
				p_strSchYearRcd 	: vsSchYearRcd,															// 학년도코드
				p_strSmtRcd 			: vsSmtRcd,																	// 학기코드
				p_strCheckAuthId 	: moUserInfo.id,																// 사용자ID
				p_strWarn				: util.Control.getValue(app, "cbbWarn"),								    // 경고/제적구분
				p_strStudId             : util.DataMap.getValue(app, "dmReqKey", "strStudId"),				// 학번
				p_strSndDt             : util.DataMap.getValue(app, "dmReqKey", "strSendDt"),				// 발행일자
				p_strDiv					: "Y",			// 발송구분
				p_strOgNm			: "<" + util.Control.getValue(app, "ipbOgCdNm")	+ ">"					// 주관부서
		};
		
		var vsSchYearRcdNm = ExtInstance.getValue("/root/resOnLoad/schYearRcdList/row", "CD_NM" , "child::CD='"+ vsSchYearRcd +"'");
		var vsSmtRcdNm = ExtInstance.getValue("/root/resOnLoad/smtRcdList/row", "CD_NM" , "child::CD='"+ vsSmtRcd +"'");
		var vsTitle = "학사경고자 가정통신문";
		
		var voOzFormParam = {
			  TITLE 		 : vsTitle			// 리포트타이틀
			, SUB_TITLE 	 : "학사경고자가정통신문" 					// 리포트서브타이틀		
			, FORM_TYPE : "flash"
		};
		
		util.Report.open(app, "hojReport", "extCgdSWarnIfrSheet", voOzFormParam, voParam);
	}
	
	
	
	moPage.onClick_BtnPopStudSearch = function(sender) {
		doOnClickStdCsrPStSearch(sender);
	};
	
	moPage.onValueChanged_IpbStudNo = function(sender) {
		doOnChangeStdCsrPStSearch(sender);
	};
	
	
	/**
	 * @desc [btnOgCdNm]주관부서(돋보기) onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 8. 17
	 */
	moPage.onClick_BtnOgCdNm = function(sender) {
		// 객체검색팝업 호출
		doOnClickStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc [ipbOgCdNm]주관부서 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 8. 17
	 */
	moPage.onValueChanged_IpbOgCdNm = function(sender) {
		// 값변경시 객체검색팝업 호출
		doOnChangeStdCmnPObjSch(sender);
	};
	
	return moPage;
};
