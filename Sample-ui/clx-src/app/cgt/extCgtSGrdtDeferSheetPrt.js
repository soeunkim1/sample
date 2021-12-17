//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
///<xtmlink path="./extCgtSGrdtDeferSheetPrt.xtm"/>

var extCgtSGrdtDeferSheetPrt = function() {

	var moPage = new Page();
	//임포트용 데이터 통신 오브젝트
	var moPObject = new PObject();

	/******************************************************************************************************
	 *  객체검색팝업 관련 설정사항
	 *  ▶ 설정가능 유형
	 *      1. 인스턴스
	 *      2. 리피트 디테일 셀 ID
	 *      3. 컨트롤 ID
	 *  ▶ 각 변수별 설명
	 *      iXXX : 팝업에 전달될  input 파라미터
	 *      oXXX : 팝업에서 선택한 값을 받을 데이터
	 *  	1. controlId 		: 최초 이벤트의 버튼이나 그리드 id             (필수)
	 *  	2. iCd 				: 검색조건 부서코드                                 (선택) 
	 *  	3. iNm 				: 검색조건 부서명									(선택)	
	 *  	4. iObjDivRcd 	: 검색될 객체구분코드 종류						(필수)
	 *								  (CC009OG : "행정부서", CC009SA : "학사부서", CC009SP : "이수과정", CC009CU : "교과그룹", CC009OT : "외부부서")
	 *  	5. iStartObject 	: 검색시작부서 										(선택)
	 *								  ("CC009OG20000,CC009OG70000",) 
	 *		6. iOtDivRcd 		: 외부부서구분코드 									(선택)
	 *								  (외부부서[CC009OT]일때 사용) ("CB008UNIV, CB008HSCL")
	 *		7. iOtIsTreeView	: 트리보이기 유무 									(선택)
	 *								  default : N (외부부서[CC009OT]일때 사용) "Y" 
	 *  	8. iLanDivRcd 	: 언어키													(선택)
	 *  	9. iKeyDate 		: 기준일													(필수)
	 *  	10. oObjDivRcd 	: 객체구분코드 
	 *  	11. oCd 			: 부서코드
	 *  	12. oCdNm 		: 부서명
	 *  	13. oBegDt 		: 시작일
	 *  	14. oEndDt 		: 종료일
	 *  	15. oLanDivRcd 	: 언어키
	 *  	16. func 			: 팝업에서 선택한 값을 받은 후 추가 로직이 필요한 경우 함수
	 *									  
	 *******************************************************************************************************/	
	moPObject.moIdsForStdCmnPObjSch = [
		{   //교직원검색 조회조건 행정부서
			controlId			:	"btnPopSearch",
			iCd					:	"",
			iNm					:	"ipbDeptNm",
			iObjDivRcd			:	["CC009SA", "CC009OG"],
			iStartObject    	:   "",
			iOtDivRcd			:	"",
			iOtIsTreeView	:	"",
			iLanDivRcd		:	"",
			iKeyDate			:	"/root/reqList/strKeyDate",
			iKeyEndDate		:	"",
			oObjDivRcd		:	"/root/reqList/strObjDivRcd",
			oCd					:	"/root/reqList/strDeptCd",
			oCdNm				:	"ipbDeptNm",
			oBegDt				:	"",
			oEndDt				:	"",
			oLanDivRcd		:	"",
			func 					:  null
		}
	];
	
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
		iKeyDate 					: "/root/reqList/strKeyDate",
		iObjDivRcd 				: "",
		iObjCd 						: "",
		iObjNm 					: "",
		iStatRcd 					:"",
		iStudDivRcd				: "",
		oStudId 					: "/root/reqList/strStudId",
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
	
	/**
	 * @desc Header Import onLoad
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 5. 18
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		doHeaderOnLoad();
	};

	/**
	 * @desc 화면 온로드
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 5. 18
	 */
	moPage.onModelConstructDone_extCsrSStudAddrPrt = function() {
		// 조회조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch",["grp_rptCsrShreg"]);
		
		//졸업학년도학기 임포트
		doOnLoadImpCgtSch();
		
		//서브미션 실행 (실패시 cover page)
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				
				util.DataMap.setValue(app, "dmReqList", "strKeyDate", util.DataMap.getValue(app, "dmResOnLoad", "strKeyDate"));
				// 조회조건 초기화
				util.Control.redraw(app, ["dipSndDt"]);
		
			}
		});
	}

	/**
	 * @desc 조회버튼 클릭
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 5. 18
	 */
	moPage.onClick_BtnSearch = function() {
		// 조회조건 필수 체크
		if(!util.validate(app, ["grpSearch"])){
			return false;
		}
		
		doList();
	};
	
	/**
	 * @desc 조회
	 * @param 
	 * @return 
	 * @author Choi In Seong 2016. 5. 18
	 */
	function doList(poCallBackFunc) {
		
		
		ExtInstance.setValue( "/root/reqList/strSchYearRcd", ExtInstance.getValue("instance('impExtCgtSch')/root/reqKey/strCgtSchYearRcd"));
		ExtInstance.setValue( "/root/reqList/strSmtRcd", ExtInstance.getValue("instance('impExtCgtSch')/root/reqKey/strCgtSmtRcd"));
		
		
		//리퀘스트 셋팅
		var voParam = {
					p_strSchYearRcd        : ExtInstance.getValue("instance('impExtCgtSch')/root/reqKey/strCgtSchYearRcd"),
					p_strSmtRcd               : ExtInstance.getValue("instance('impExtCgtSch')/root/reqKey/strCgtSmtRcd"),
					p_strStudId                 : util.DataMap.getValue(app, "dmReqList", "strStudId"),
					p_strSndDt                 : util.DataMap.getValue(app, "dmReqList", "strSndDt"),
					p_strIfrSheetDivRcd     : "CSR12309",
					p_strLandivRcd           : msDefaultLocale
				}	
		
		 var voOzFormParam = {
				  TITLE :  "졸업유보 통지서"  //리포트타이틀
				, SUB_TITLE : "" //리포트서브타이틀		
				, FORM_TYPE : "flash"
			};	
				
		util.Report.open(app, "hojReport", "extCgtSGrdtDeferSheetPrt", voOzFormParam, voParam);
	}
	
	/**
	 * @desc 소속 검색 팝업 호출
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 5. 18
	 */
	moPage.onClick_BtnPopSearch = function(sender) {
		doOnClickStdCmnPObjSch(sender);
	}
	
	/**
	 * @desc 소속 검색
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 5. 18
	 */	
	moPage.onValueChanged_IpbDeptNm = function(sender) {
		doOnChangeStdCmnPObjSch(sender);
	}
	
	/**
	 * @desc 소속 권한 처리
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 5. 18
	 */
	moPage.onLoadImportDone_ImpStdCmnPobjSch = function() {
		setStdCmnPObjSchObjInfo();
	}
	
	
//	moPage.onValueChanged_CbbSmtRcd = function() {
//		moPage.doGetKeyDate();
//	}
	
	
	
//	moPage.onValueChanged_CbbYearRcd = function() {
//		moPage.doGetKeyDate();
//	}
	
	
	/**
	 * @desc 학년도, 학기에 해당되는 기준일을 조회한다.
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 5. 18.
	 */
	function doGetKeyDate() {
	
		//strCommand: getKeyDate 
		util.Submit.send(app, "subGetKeyDate", function(pbSuccess) {
			if (pbSuccess) {
				util.DataMap.setValue(app, "dmReqList", "strKeyDate", util.DataMap.getValue(app, "dmResGetKeyDate", "strKeyDate"));
			} else {
				util.DataMap.setValue(app, "dmReqList", "strSchYearRcd", "");
				util.DataMap.setValue(app, "dmReqList", "strSmtRcd", "");
				util.DataMap.setValue(app, "dmReqList", "strKeyDate", "");
				util.Control.setValue(app, "cbbYearRcd", "");
				util.Control.setValue(app, "cbbSmtRcd", "");
			}
		});
	};
	
	/**
	 * @desc 학생조회
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 5. 18.
	 */
	moPage.onValueChanged_IpbStudNo = function(sender) {
		doOnChangeStdCsrPStSearch(sender);
	}
	
	/**
	 * @desc 학생조회 팝업 호출
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 5. 18.
	 */
	moPage.onClick_BtnPopStudSearch = function(sender) {
		doOnClickStdCsrPStSearch(sender);
	};
	
	
	/**
	 * @desc 복학대상자 안내문 발송 후 유무 확인 
	 * @param
	 * @return void
	 * @author Sunyoung,PARK 2016.12.29 
	 */
	moPage.onClick_BtnSaveSnd = function() {
		
		// @1 하시겠습니까?
		if(util.Msg.confirm("NLS-CRM-M010", [ExtControl.getTextValue("btnSaveSnd")])!=1) return false;
		
		util.coverPage(app);
		
		//서브미션 실행 (실패시 cover page)
		//strCommand: sndIfrSheet 
		util.Submit.send(app, "subSndIfrSheet", function(pbSuccess){
			if(pbSuccess){
				var strInsCnt = util.DataMap.getValue(app, "dmResResult", "strInsCnt");
				MsgBox.show(strInsCnt + "건 발송정보 저장하였습니다."  , "ok", "발송완료");
			}
			util.removeCover(app);
		});
	};
	return moPage;
};

