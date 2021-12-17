//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCrsSStudRegFeeList.xtm"/>


var extCrsSStudRegFeeList = function() {
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
	 *  1. controlId 		: 최초 이벤트의 버튼이나 그리드 id	(필수)
	 *  2. iStudNo 			: 검색조건 학번						(선택) (값이 존재할 경우 4자리 이상)
	 *  3. iStudId 			: 검색조건 학번오브젝트				(선택)
	 *  4. iStudNm 			: 이름        						(선택) (값이 존재할 경우 2자리 이상)
	 *  5. iKeyDate 		: 기준일 							(필수)
	 *  6. iObjDivRcd 		: 객체구분코드 						(선택)
	 *  7. iObjCd 			: 부서코드							(선택)
	 *  8. iObjNm 			: 부서명							(선택) 
	 *  9. iAuthYN			: 권한미적용여부 (미적용시: "Y")	(선택) 
	 *  10. iStatRcd		: 학적상태							(선택) 
	 *  11. iStudDivRcd		: 학생구분							(선택) 
	 *  12. oStudId			: 학번오브젝트
	 *  13. oStudNo 		: 학번
	 *  14. oStudNm 		: 이름
	 *  15. oStatNm 		: 학적상태명
	 *  16. oStatRcd 		: 학적상태코드
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
	 *  27. oBirthday		: 생년월일
	 *  28. oGenderRcd		: 성별코드
	 *  29. oGenderNm		: 성별명
	 *  30. func 			: 팝업에서 선택한 값을 받은 후 추가 로직이 필요한 경우 함수 작성
	 */
	moPObject.moIdsForStdCsrPStSearch = [
	{
		controlId 		: "btnPopSearch",
		iStudNo 		: "ipbSchStudId",	
		iStudId 		: "",
		iStudNm 		: "",
		iKeyDate 		: "", 
		iObjDivRcd 		: "",
		iObjCd 			: "",
		iObjNm 			: "",
		iAuthYN 		: "",
		iStatRcd 		: "",
		iStudDivRcd		: "",
		oStudId 		: "ipbSchStudIdObj",
		oStudNo 		: "ipbSchStudId",
		oStudNm 		: "",
		oStatNm 		: "",
		oStatRcd 		: "",
		oProcRslt 		: "",
		oProcRsltYear 	: "",
		oSaNm			: "",
		oSaCd 			: "",
		oSpNm 			: "",
		oSpCd 			: "",
		oOgNm 			: "",
		oOgCd 			: "",
		oStudDivRcd		: "",
		oStudDivNm		: "",
		oBirthday		: "",
		oGenderRcd		: "",
		oGenderNm		: "",
		func : function(poParam) {
			doStSearch(poParam);
		}
	}
	];
	
	var msSysdate = "";
	
	/**
	 * @desc import 헤더 초기화
	 * @member extCrsSStudRegFeeList
	 * @param
	 * @return void
	 * @author Aeyoung Lee 2016. 4. 22.
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		doHeaderOnLoad();
	};
	
	/**
	 * @desc import 학생정보 임포트 초기화
	 * @member extCrsSStudRegFeeList
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 4. 22.
	 */
	moPage.onLoadImportDone_ImpStudInfo = function() {
		impStudInfo();
	};
	
	/**
	 * @desc 화면 온로드
	 * @member extCrsSStudRegFeeList
	 * @param
	 * @return void
	 * @author Aeyoung Lee 2016. 4. 22.
	 */	
	moPage.onModelConstructDone_ExtCrsSStudRegFeeList = function() {
		//리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init("rptStudReg");
		//검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grpData","grpDataDtl"]);
		
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				msSysdate = util.DataMap.getValue(app, "dmDate", "CUT_DT").substring(0,8);
				moPObject.moIdsForStdCsrPStSearch[0].iKeyDate = msSysdate;
			}
			
			//impStudInf02(학생정보 임포트) 초기화
			initSize();
			
			// 권한에따른 컨트롤 활성화 처리
			doVisibleCtlByAuth();
		});
	};
	
	/**
	 * 권한에 따른 학번명 활성/비활성 처리
	 * @member extCrsSStudRegFeeList
	 * @param 
	 * @type void
	 * @author Aeyoung Lee 2016. 4. 22.
	 */	
	function doVisibleCtlByAuth() {
		
		// 전체권한[CC00102] : 
		if (moPageInfo.authRngRcd == "CC00102") {
			util.Control.setEnable(app, true, ["ipbSchStudId", "btnPopSearch"]);
			
			util.Control.setValue(app, "ipbSchStudId", "");
			util.Control.setValue(app, "ipbSchStudIdObj", "");	
			
			util.Control.setFocus(app, "ipbSchStudId");
		}else{
			util.Control.setEnable(app, false, ["ipbSchStudId", "btnPopSearch"]);
			
			util.Control.setValue(app, "ipbSchStudId", moUserInfo.userNm);
			util.Control.setValue(app, "ipbSchStudIdObj", moUserInfo.id);
			
			// 바로 조회
			util.Header.clickSearch(app);
		}	
	};
	
	/**
	 * @desc 학생검색 팝업을 호출한다.
	 * @member extCrsSStudRegFeeList
	 * @param sender 버튼의 이벤트 객체
	 * @return void
	 * @author Aeyoung Lee 2016. 4. 22.
	 */
	moPage.onClick_BtnPopSearch = function(sender) {
		doOnClickStdCsrPStSearch(sender);
	};
	
	/**
	 * @desc 학생 검색
	 * @member extCrsSStudRegFeeList
	 * @param sender 인풋박스 이벤트 객체
	 * @return void
	 * @author Aeyoung Lee 2016. 4. 22.
	 */
	moPage.onValueChanged_IpbSchStudId = function(sender) {
		doOnChangeStdCsrPStSearch(sender);
	};
	
	/**
	 * @desc 입력된 학생정보 셋팅한 후 조회이벤트 호출
	 * @member extCrsSStudRegFeeList
	 * @param poParam 학생정보
	 * @return void
	 * @author Aeyoung Lee 2016. 4. 22.
	 */	
	function doStSearch(poParam) {
		var vsStudId = util.Control.getValue(app, "ipbSchStudId");
		
		if(!ValueUtil.isNull(vsStudId)){
			util.Header.clickSearch(app);
		}
	};
	
	/**
	 * @desc 조회 버튼 클릭 이벤트
	 * @member extCrsSStudRegFeeList
	 * @param
	 * @return void
	 * @author Aeyoung Lee 2016. 4. 22.
	 */
	moPage.onClick_BtnSearch = function() {
		if(!util.validate(app, ["grpSearch"])) return false;
		
		var poImpStudInfoCallbackFunc = function(pbImpStudInfoCallBack) {
				
			if(pbImpStudInfoCallBack) {
				//strCommand: list 
				util.Submit.send(app, "subList", function(pbSuccess){
					if(pbSuccess){
						util.Control.redraw(app, "grdStudReg");
						util.Msg.notify(app, "NLS.INF.M024");
					}
				});	
			}
		}
		
		//학번에 해당하는 학생정보를 가져온다.
		var vsStudId = util.DataMap.getValue(app, "dmReqKey", "strStudId");
		setImpStudInfo(vsStudId, msSysdate, null, poImpStudInfoCallbackFunc);	
	};
	
	return moPage;
};
