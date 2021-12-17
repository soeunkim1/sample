//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCsrSStudTotIqy.xtm"/>


var extCsrSStudTotIqy = function() {
	var moPage = new Page();
	//임포트용 데이터 통신 오브젝트
	var moPObject = new PObject();

	/**
	 * 학생의 기본정보를 담아놓는 오브젝트
	 * @author Choi In Seong 2016. 6. 2
	 */	
	moPage.moParentObj = {
		studId 					: "", 					//학적사항관리 창의 조회된 학생아이디값
		headerStud 			: "", 					//학적사항관리 창의 헤더정보(학생)
		headerDept 			: "", 					//헤더의 소속정보
		headerCourse 		: "", 					//헤더의 과정정보
		headerRemark 		: "", 					//헤더의 기타정보
		studNo 					: "", 					//학적사항관리 창의 조회된 학번값
		keyDate 				: "", 					//기준일자
		subPageId				: ""					//서브페이지 아이
	};
	
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
		iStudNo 					: "ipbSchStudId",	
		iStudId 						: "",
		iStudNm 					: "",
		iKeyDate 					: "/root/resOnLoad/strKeyDate", 
		iObjDivRcd 				: "",
		iObjCd 						: "",
		iObjNm 					: "",
		iStatRcd 					:"",
		iStudDivRcd				: "",
		oStudId 					: "/root/reqList/strStudId",
		oStudNo 					: "ipbSchStudId",
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
		func : function(voParam) {
			var strStudId = voParam.Result.strStudId;
			if(!ValueUtil.isNull(strStudId)){
				util.Header.clickSearch(app);
			}
		}
	}
	];
	
	
	// 학점 취득현황 팝업 필수정의사항
	moPage.moStudRecCmpPopup = {
		  strStudId		: ""
		  , strOpenPgmDiv : "XTM"
	};
	
	
	
	/**
	 * @desc 화면 초기화 이벤트 실행
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 6. 2.
	 */	
	moPage.onModelConstructDone_StdCsrMstFrame = function() {
		doOnLoad();
		initSize();
	};
	
	
	/**
	 * @desc 학생정보 임포트 초기화
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 6. 2.
	 */
	moPage.onLoadImportDone_ImpStudInfo = function() {
		impStudInfo();
	};
	
	/**
	 * @desc 공통코드 호출 및 화면 초기화
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 6. 2.
	 */	
	function doOnLoad() {
		
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", "grp_impStudInfo");

		//리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["rptStudCsr", "frfStudCgd", "rptStudCgd", "rptStudReg", "rptStudCss"]);
		
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				util.DataMap.setValue(app, "dmReqList", "strKeyDate", util.DataMap.getValue(app, "dmResOnLoad", "strKeyDate"));
				util.Control.redraw(app, ["rptStudCsr", "frfStudCgd", "rptStudCgd", "rptStudReg", "rptStudCss","dipKeyDate"]);	
			}
			
			util.Control.setFocus(app, "ipbSchStudId");						
		});
		
	}
	
	/**
	 * @desc 입력된 학번으로 조회한다.
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 6. 2.
	 */	
	function doSearch() {
		
		if(!util.validate(app, ["ipbSchStudId","dipKeyDate"])) return false;
		
		var vsStudId  = util.DataMap.getValue(app, "dmReqList", "strStudId");
		var vsKeyDate = util.DataMap.getValue(app, "dmResOnLoad", "strKeyDate");

		var voImpStudInfoCallbackFunc = function(pbImpStudInfoCallBack) {
			doList(function(pbSuccess) {
				// 조회 : "조회되었습니다." header 메세지 표시
				if(pbSuccess) {
					util.Msg.notify(app, "NLS.INF.M024");
				}
			});
		};
		// 학생정보imp 조회
		setImpStudInfo(vsStudId, vsKeyDate, null, voImpStudInfoCallbackFunc);
	};

	
	/**
	 * @desc 학생 종합정보를 조회한다.
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 6. 2
	 */
	moPage.onClick_BtnSearch = function() {
		
		if(!util.validate(app, ["ipbSchStudId"])){
			return false;
		}
		doSearch();
	};
		
	/**
	 * @desc 학력조회 목록 조회
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 6. 2
	 */
	function doList(poCallBackFunc) {
		//strCommand: list 
		util.Submit.send(app, "subList",  function(pbSuccess) {
			if(pbSuccess){
				//rebuild
				util.Control.redraw(app, ["rptStudCsr", "frfStudCgd", "rptStudCgd", "rptStudReg", "rptStudCss"]);
			}
			
			if(util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
		});
	}

	
	/**
	 * @desc 화면을 모든 값을 초기화 한다.
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 6. 2
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		
		doHeaderOnLoad();
		
	};
	
	/**
	 * @desc 학생검색 팝업을 호출한다.
	 * @param sender 버튼의 이벤트 객체
	 * @return void
	 * @author Choi In Seong 2016. 6. 2
	 */
	moPage.onClick_BtnPopSearch = function(sender) {
		// 학생정보 초기화
		clearImpStudInfo02();
		doOnClickStdCsrPStSearch(sender);
		
	};
	
	/**
	 * @desc 학생 검색
	 * @param sender 인풋박스 이벤트 객체
	 * @return void
	 * @author Choi In Seong 2016. 6. 2
	 */
	moPage.onValueChanged_IpbSchStudId = function(sender) {
		doOnChangeStdCsrPStSearch(sender);
	};
	
	
	
	/**
	 * @desc [rdBtnPlanPaper]취득학점조회 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 20
	 */
	moPage.onClick_BtnGetPntSch = function() {
		var vsStudId = util.DataMap.getValue(app, "dmReqList", "strStudId");
		moStudRecCmpPopup.strStudId = vsStudId;
				
		var vsUrl = "../../inc/ccr/extCcrSStudRecCmpList.jsp";
		var vnWidth  = 800;
	    var vnHeight = 700;
	    var vnTop    = (window.screen.availHeight - vnHeight) / 2;
	    var vnLeft   = (window.screen.availWidth - vnWidth) / 2;
		
		 if (vnTop < 0) vnTop = 0;
	     if (vnLeft < 0) vnLeft = 0;
		
		var vsOption = "menubar=0,resizable=yes,scrollbars=yes,status=0,top="+vnTop+",left="+vnLeft+",width="+vnWidth+",height="+vnHeight;
		
		window.open(vsUrl, "extCcrSStudRecCmpList",  vsOption);
	};
	
	return moPage;
};
