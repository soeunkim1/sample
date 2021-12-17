//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./stdCsrSStSearchTemplate.xtm"/>


var stdCsrSStSearchTemplate = function() {
	var moPage = new Page();
	//임포트용 데이터 통신 오브젝트
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
		controlId 					: "btnPopSearch",
		iStudNo 					: "ipbStudNo",	
		iStudId 						: "ipbStudId",
		iStudNm 					: "ipbStudNm",
		iKeyDate 					: "dipKeyDate", 
		iObjDivRcd 				: "cbbObjDivRcd",
		iObjCd 						: "ipbSaCd",
		iObjNm 					: "ipbSaNm",
		iStatRcd 					: "cbbStatus",
		iStudDivRcd				: "cbbStudDivRcd",
		oStudId 					: "optStudId",
		oStudNo 					: "optStudNo",
		oStudNm 					: "optStudNm",
		oStatNm 					: "optStatNm",
		oStatRcd 					: "optStatRcd",
		oProcRslt 					: "optProcRslt",
		oProcRsltYear 			: "optProcRsltYear",
		oSaNm						: "optSaNm",
		oSaCd 						: "optSaCd",
		oSpNm 					: "optSpNm",
		oSpCd 						: "optSpCd",
		oOgNm 					: "optOgNm",
		oOgCd 						: "optOgCd",
		oStudDivRcd				: "optStudDivRcd",
		oStudDivNm				: "optStudDivNm",
		oBirthday					: "optBirthday",
		oGenderRcd				: "optGenderRcd",
		oGenderNm				: "optGenderNm",
		func : function() {
		}
	}
	];
	
	/**
	 * @desc 화면 초기화 이벤트 실행
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 2. 29.
	 */	
	moPage.onModelConstructDone_StdCsrMstFrame = function() {
		doOnLoad();
	};
	
	/**
	 * @desc 화면을 모든 값을 초기화 한다.
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 2. 29
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		
		doHeaderOnLoad();
		
	};
	
	function doOnLoad() {
		// 서브미션 호출
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if (pbSuccess) {				
				util.Control.redraw(app, ["cbbStatus", "cbbStudDivRcd", "cbbObjDivRcd"]);
			}
		});
	}
	
	/**
	 * @desc 학생검색 팝업을 호출한다.
	 * @param sender 버튼의 이벤트 객체
	 * @return void
	 * @author Choi In Seong 2016. 2. 29
	 */
	moPage.onClick_BtnPopSearch = function(sender) {
		
		doOnClickStdCsrPStSearch(sender);
		
	}
	
	/**
	 * @desc 학생 검색
	 * @param sender 인풋박스 이벤트 객체
	 * @return void
	 * @author Choi In Seong 2016. 2. 29
	 */
	moPage.onKeyDown_IpbSchStudId = function(strKeyType, strKeyStatus, sender) {
		if(e.keyCode == cpr.events.KeyCode.ENTER){
			doOnChangeStdCsrPStSearch(sender);
		}
	}
	
	/**
	 * @desc 학생 검색
	 * @param sender 인풋박스 이벤트 객체
	 * @return void
	 * @author Choi In Seong 2016. 2. 29
	 */
	moPage.onKeyDown_IpbStudNm = function(strKeyType, strKeyStatus, sender) {
		if(e.keyCode == cpr.events.KeyCode.ENTER){
			doOnChangeStdCsrPStSearch(sender);
		}
	};

	return moPage;
};
