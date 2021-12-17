//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
///<xtmlink path="./extCsrCGudProfClass.xtm"/>

var extCsrCGudProfClass = function() {

	var moPage = new Page();
	//임포트용 데이터 통신 오브젝트
	var moPObject = new PObject();
	//개별 조회조건
	var moPerCrt = ["lblStudNo", "ipbStudNo", "btnStudPopSearch"];
	//개별 외 조회조건
	var moOtherCrt = ["lblSaNm", "ipbSaNm", "btnSaPopSearch", "lblSchYearRcd", "cbbSchYearRcd", "lblSmtRcd", "cbbSmtRcd", "lblStatRcd", "cbbStatRcd", 
	                          "lblProcRsltYear", "cbbProcRsltYear", "lblRepNm", "ipbProfNm", "btnProfPopSearch", "lblClassRcd", "cbbClassRcd", "lblGenderRcd", "cbbGenderRcd",
							  "lblNatYn", "ckbNatYn"];
	
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
		controlId 					: "btnStudPopSearch",
		iStudNo 					: "ipbStudNo",	
		iStudId 						: "",
		iStudNm 					: "",
		iKeyDate 					: "/root/resOnLoad/strKeyDate", 
		iObjDivRcd 				: "",
		iObjCd 						: "",
		iObjNm 					: "",
		iStatRcd 					: "",
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
		{   //소속 조회조건 행정,학사 부서
			controlId			:	"btnSaPopSearch",
			iCd					:	"",
			iNm					:	"ipbSaNm",
			iObjDivRcd			:	["CC009SA", "CC009OG"],
			iStartObject    	:   "",
			iOtDivRcd			:	"",
			iOtIsTreeView	:	"",
			iLanDivRcd		:	"",
			iKeyDate			:	"/root/reqList/strKeyDate",
			iKeyEndDate		:	"",
			oObjDivRcd		:	"/root/reqList/strObjDivRcd",
			oCd					:	"/root/reqList/strSaCd",
			oCdNm				:	"ipbSaNm",
			oBegDt				:	"",
			oEndDt				:	"",
			oLanDivRcd		:	"",
			func 					:  null
		}
	];
	
	
	/*******************필수정의사항 start**********************/ 
	/**
	 * 교직원검색팝업 관련 설정사항
	 * 각 변수별 설명
	 *  iXXX : 팝업으로 input 전달될 파라미터
	 *  oXXX : 팝업에서 선택한 값을 받을 컬럼 아이디
	 *  [IN]
	 *   1. controlId					: (필수) 최초 이벤트의 버튼id
	 *   2. istrStaffGrpAuth			: (선택) 교직원 그룹에 대한 인사자료권한 적용여부(적용시 : true)
	 *   3. istrWkdtyAuth			: (선택) 보직에 해당되는 사람 조회여부(조회시 : true), 현재사용하지 않음(2013.04.11)
	 *   4. iKeyDate					: (선택) 기준일자(NULL일 경우 현재일자)
	 *   4. iStaffNo					: (선택) 교직원번호
	 *   5. iStaffGrpRcd				: (선택) 교직원 그룹[CF001]
	 *   6. iStaffGrpRcdLock		: (선택) 교직원그룹 잠금적용여부(적용시 : true), 교직원 팝업에서 조건변경해도 활성안됨.
	 *   7. iStaffSubGrpRcd		: (선택) 교직원 하위그룹[CF003]
	 *   8. iStaffSubGrpRcdLock	: (선택) 교직원 하위그룹 잠금적용여부(적용시 : true), 교직원 팝업에서 조건변경해도 활성안됨.
	 *   9. iStatusRcd				: (선택) 상태[CF005](재직, 휴직, 퇴직 등을 말함)
	 *  10. iRepNm					: (선택) 성명
	 *  11. iObjDivRcd				: (선택) 객체구분코드[CC009]
	 *  12. iObjCd						: (선택) 부서코드
	 *  13. iObjNm					: (선택) 부서명
	 *  14. istrObjCdInList			: (선택) 복수 행정부서 지정(부서에 대한 IN조건 "'A','B','C'" 형식으로 셋팅)
	 *  15. iWkgrdRcd				: (선택) 직급[CF007]
	 *  [OUT]
	 *  16. oObjNo					: 오브젝트번호
	 *  17. oStaffNo					: 교직원번호
	 *  18. oRepNm					: 성명
	 *  19. oBirthday					: 생년월일
	 *  20. oStatNm					: 상태명
	 *  21. oStatRcd					: 상태코드
	 *  22. oOgNm					: 부서명
	 *  23. oOgCd						: 부서코드
	 *  24. oPosNm					: 포지션명
	 *  25. oPosCd					: 포지션코드
	 *  26. oWkgrdNm				: 직급명
	 *  27. oWkgrdRcd				: 직급코드
	 *  28. oStaffGrpRcd			: 교직원그룹코드
	 *  29. oStaffSubGrpRcd		: 교직원하위그룹코드
	 *  30. oHoRcd					: 호봉코드
	 *  31. oSsn						: 주민등록번호
	 *  32. oWkdtyRcd				: 직책코드
	 *  33. oWkdtyNm				: 직책명
	 *  34. func						: 팝업에서 선택한 값을 받은 후 추가 로직이 필요한 경우 함수 작성
	 * @member impStdCmnPPrsnSearch
	 * @type Array
	 * @author cis at 16. 3. 29
	 */ 
	 moPObject.moIdsForStdCmnPPrsnSearch = [
		 { 
			 controlId					: "btnProfPopSearch",				//(필수)교직원검색 버튼ID
			 istrStaffGrpAuth			: "",										//(선택)셋팅 교직원 그룹에 대한 인사자료권한 적용여부(적용시 : true)
			 istrWkdtyAuth			: "true",									//(선택)셋팅 보직에 해당되는 사람 조회여부(조회시 : true), 현재사용하지 않음(2013.04.11)
			 iKeyDate					: "/root/reqList/strKeyDate",	//(선택) 셋팅 기준일자(NULL일 경우 현재일자)
			 iStaffNo					: "ipbProfNm",						//(선택) 셋팅 교직원번호
			 iStaffGrpRcd				: "",										//(선택) 셋팅 교직원그룹
			 iStaffGrpRcdLock		: "", 										//(선택) 셋팅 교직원그룹 잠금적용여부(적용시 : true), 교직원 팝업에서 조건변경해도 활성안됨.
			 iStaffSubGrpRcd		: "",										//(선택) 셋팅 교직원 하위그룹[CF003]
			 iStaffSubGrpRcdLock	: "",										//(선택) 셋팅 교직원 하위그룹 잠금적용여부(적용시 : true), 교직원 팝업에서 조건변경해도 활성안됨.
			 iStatusRcd				: "",										//(선택) 셋팅 상태[CF005](재직, 휴직, 퇴직 등을 말함)
			 iRepNm					: "",										//(선택) 셋팅 성명
			 iObjDivRcd				: "",										//(선택) 셋팅 객체구분코드[CC009]
			 iObjCd						: "",										//(선택) 셋팅 부서코드
			 iObjNm					: "",										//(선택) 셋팅 부서명
			 istrObjCdInList			: "",										//(선택) 셋팅 복수 행정부서 지정(부서에 대한 IN조건 "'A','B','C'" 형식으로 셋팅)
			 iWkgrdRcd				: "",										//(선택) 셋팅 직급[CF007]
			  
			 oObjNo					: "/root/reqList/strProfId",		//리턴 오브젝트번호
			 oStaffNo					: "",										//리턴 교직원번호
			 oRepNm					: "ipbProfNm",						//리턴 성명
			 oBirthday					: "",										//리턴 생년월일[CF001]
			 oStatNm					: "",										//리턴 상태명
			 oStatRcd					: "",										//리턴 상태코드
			 oOgNm					: "",										//리턴 부서명
			 oOgCd						: "",										//리턴 부서코드
			 oPosNm					: "",										//리턴 직위명
			 oPosCd					: "",										//리턴 직위코드
			 oWkgrdNm				: "",										//리턴 직급명
			 oWkgrdRcd				: "",										//리턴 직급
			 oStaffGrpRcd				: "",										//리턴 교직원그룹 
			 oStaffSubGrpRcd		: "",										//리턴 교직원 하위그룹 
			 oHoRcd					: "",										//리턴 호봉코드
			 oSsn						: "",										//리턴 주민번호
			 oWkdtyRcd				: "",										//리턴 직책코드 
			 oWkdtyNm				: "",										//리턴 직책명 
			 func                         : null
		 },
		 { 
			 controlId					: "btnBatchProfPopSearch",		//(필수)교직원검색 버튼ID
			 istrStaffGrpAuth			: "",										//(선택)셋팅 교직원 그룹에 대한 인사자료권한 적용여부(적용시 : true)
			 istrWkdtyAuth			: "true",									//(선택)셋팅 보직에 해당되는 사람 조회여부(조회시 : true), 현재사용하지 않음(2013.04.11)
			 iKeyDate					: "/root/reqList/strKeyDate",	//(선택) 셋팅 기준일자(NULL일 경우 현재일자)
			 iStaffNo					: "ipbBatchRepNm",				//(선택) 셋팅 교직원번호
			 iStaffGrpRcd				: "",										//(선택) 셋팅 교직원그룹
			 iStaffGrpRcdLock		: "", 										//(선택) 셋팅 교직원그룹 잠금적용여부(적용시 : true), 교직원 팝업에서 조건변경해도 활성안됨.
			 iStaffSubGrpRcd		: "",										//(선택) 셋팅 교직원 하위그룹[CF003]
			 iStaffSubGrpRcdLock	: "",										//(선택) 셋팅 교직원 하위그룹 잠금적용여부(적용시 : true), 교직원 팝업에서 조건변경해도 활성안됨.
			 iStatusRcd				: "",										//(선택) 셋팅 상태[CF005](재직, 휴직, 퇴직 등을 말함)
			 iRepNm					: "",										//(선택) 셋팅 성명
			 iObjDivRcd				: "",										//(선택) 셋팅 객체구분코드[CC009]
			 iObjCd						: "",										//(선택) 셋팅 부서코드
			 iObjNm					: "",										//(선택) 셋팅 부서명
			 istrObjCdInList			: "",										//(선택) 셋팅 복수 행정부서 지정(부서에 대한 IN조건 "'A','B','C'" 형식으로 셋팅)
			 iWkgrdRcd				: "",										//(선택) 셋팅 직급[CF007]
			  
			 oObjNo					: "/root/reqList/strBatchProfId",//리턴 오브젝트번호
			 oStaffNo					: "",										//리턴 교직원번호
			 oRepNm					: "ipbBatchRepNm",				//리턴 성명
			 oBirthday					: "",										//리턴 생년월일[CF001]
			 oStatNm					: "",										//리턴 상태명
			 oStatRcd					: "",										//리턴 상태코드
			 oOgNm					: "",										//리턴 부서명
			 oOgCd						: "",										//리턴 부서코드
			 oPosNm					: "",										//리턴 직위명
			 oPosCd					: "",										//리턴 직위코드
			 oWkgrdNm				: "",										//리턴 직급명
			 oWkgrdRcd				: "",										//리턴 직급
			 oStaffGrpRcd				: "",										//리턴 교직원그룹 
			 oStaffSubGrpRcd		: "",										//리턴 교직원 하위그룹 
			 oHoRcd					: "",										//리턴 호봉코드
			 oSsn						: "",										//리턴 주민번호
			 oWkdtyRcd				: "",										//리턴 직책코드 
			 oWkdtyNm				: "",										//리턴 직책명 
			 func                         : null
		 },
		 { 
			 controlId					: "rdBtnProfNm",						//(필수)교직원검색 버튼ID
			 istrStaffGrpAuth			: "",										//(선택)셋팅 교직원 그룹에 대한 인사자료권한 적용여부(적용시 : true)
			 istrWkdtyAuth			: "true",									//(선택)셋팅 보직에 해당되는 사람 조회여부(조회시 : true), 현재사용하지 않음(2013.04.11)
			 iKeyDate					: "/root/reqList/strKeyDate",	//(선택) 셋팅 기준일자(NULL일 경우 현재일자)
			 iStaffNo					: "rdIpbProfNm",						//(선택) 셋팅 교직원번호
			 iStaffGrpRcd				: "",										//(선택) 셋팅 교직원그룹
			 iStaffGrpRcdLock		: "", 										//(선택) 셋팅 교직원그룹 잠금적용여부(적용시 : true), 교직원 팝업에서 조건변경해도 활성안됨.
			 iStaffSubGrpRcd		: "",										//(선택) 셋팅 교직원 하위그룹[CF003]
			 iStaffSubGrpRcdLock	: "",										//(선택) 셋팅 교직원 하위그룹 잠금적용여부(적용시 : true), 교직원 팝업에서 조건변경해도 활성안됨.
			 iStatusRcd				: "",										//(선택) 셋팅 상태[CF005](재직, 휴직, 퇴직 등을 말함)
			 iRepNm					: "",										//(선택) 셋팅 성명
			 iObjDivRcd				: "",										//(선택) 셋팅 객체구분코드[CC009]
			 iObjCd						: "",										//(선택) 셋팅 부서코드
			 iObjNm					: "",										//(선택) 셋팅 부서명
			 istrObjCdInList			: "",										//(선택) 셋팅 복수 행정부서 지정(부서에 대한 IN조건 "'A','B','C'" 형식으로 셋팅)
			 iWkgrdRcd				: "",										//(선택) 셋팅 직급[CF007]
			  
			 oObjNo					: "rdOptProfId",						//리턴 오브젝트번호
			 oStaffNo					: "",										//리턴 교직원번호
			 oRepNm					: "rdIpbProfNm",						//리턴 성명
			 oBirthday					: "",										//리턴 생년월일[CF001]
			 oStatNm					: "",										//리턴 상태명
			 oStatRcd					: "",										//리턴 상태코드
			 oOgNm					: "",										//리턴 부서명
			 oOgCd						: "",										//리턴 부서코드
			 oPosNm					: "",										//리턴 직위명
			 oPosCd					: "",										//리턴 직위코드
			 oWkgrdNm				: "",										//리턴 직급명
			 oWkgrdRcd				: "",										//리턴 직급
			 oStaffGrpRcd				: "",										//리턴 교직원그룹 
			 oStaffSubGrpRcd		: "",										//리턴 교직원 하위그룹 
			 oHoRcd					: "",										//리턴 호봉코드
			 oSsn						: "",										//리턴 주민번호
			 oWkdtyRcd				: "",										//리턴 직책코드 
			 oWkdtyNm				: "",										//리턴 직책명 
			 func                         : null
		 }
	];
	
	/**
	 * @desc 헤더 온로드
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 3. 29
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		doHeaderOnLoad();
	};

	/**
	 * @desc 화면 온로드
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 3. 29
	 */
	moPage.onModelConstructDone_extCsrCGudProfClass = function() {
		//리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["rptCsrShreg", "rptCsrGudProf", "rptCsrClass"]);
		// 2. 검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grpData"]);
		
		//서브미션 실행 (실패시 cover page)
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				
				util.DataMap.setValue(app, "dmReqList", "strSchYearRcd", util.DataMap.getValue(app, "dmResOnLoad", "strSchYearRcd"));
				util.DataMap.setValue(app, "dmReqList", "strSmtRcd", util.DataMap.getValue(app, "dmResOnLoad", "strSmtRcd"));
				util.DataMap.setValue(app, "dmReqList", "strStatRcd", "CT301ATTE");
				util.DataMap.setValue(app, "dmReqList", "strKeyDate", util.DataMap.getValue(app, "dmResOnLoad", "strKeyDate"));				
				
				util.Control.redraw(app, ["cbbDivRcd", "cbbDivRcd", "cbbSchYearRcd", "cbbSmtRcd", "cbbStatRcd", "cbbProcRsltYear", "cbbClassRcd", "cbbGenderRcd", "cbbBatchClassRcd"]);
			}
		});
	}

	/**
	 * @desc 조회버튼 클릭
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 3. 29
	 */
	moPage.onClick_BtnSearch = function() {
		
		if(util.Grid.isModified(app, "", "CRM")){
			return false;
		}
		// 조회조건 필수 체크
		//개별 변경일시 배정구분과 학번만 체크
		if(util.DataMap.getValue(app, "dmReqList", "strDivRcd") != "CSR13005"){
			if(!util.validate(app, ["cbbDivRcd", "ipbSaNm", "cbbSchYearRcd", "cbbSmtRcd"])){
				return false;
			}
		}else{
			if(!util.validate(app, ["cbbDivRcd", "ipbStudNo"])){
				return false;
			}
		}
		
		doList(function(pbSuccess) {
			// 조회 : "조회되었습니다." header 메세지 표시
			if(pbSuccess) {
				util.Msg.notify(app, "NLS.INF.M024");
			}
		});
	};
	
	/**
	 * @desc 학생목록 조회
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 3. 29
	 */
	function doList(poCallBackFunc) {
		
		//strCommand: list 
		util.Submit.send(app, "subList",  function(pbSuccess) {
			if(pbSuccess){
				//rebuild
				util.Control.redraw(app, ["rptCsrShreg"]);
			}
			if(util.Grid.getRowCount(app, "grdCsrShreg") < 1){
				util.Control.reset(app, ["rptCsrGudProf", "rptCsrClass"]);
			}
			if(util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
		});
	}

	/**
	 * @desc 지도교수, 반정보 조회
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 3. 29
	 */
	moPage.onRowSelect_RptCsrShreg = function() {
		util.DataMap.setValue(app, "dmReqDetailList", "strStudId", util.Grid.getCellValue(app, "grdCsrShreg", "STUD_ID"));
		doDetailList();
	};
	
	function doDetailList() {
		//strCommand: detailList 
		util.Submit.send(app, "subDetailList",  function(pbSuccess) {
			if(pbSuccess){
				//rebuild
				util.Control.redraw(app, ["rptCsrGudProf", "rptCsrClass"]);
			}
		});
	}
	
	/**
	 * @desc 작업취소
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 3. 29
	 */
	moPage.onClick_BtnRestore = function() {
		util.Grid.restoreRow(app, "grdCsrShreg");
	};
	
	/**
	 * @desc 저장버튼 클릭
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 3. 29
	 */
	moPage.onClick_BtnSave = function() {
		doSave();
	};
	
	/**
	 * @desc 지도교수 반정보 저장
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 3. 29
	 */
	function doSave() {
		
		// 리피터 변경사항 체크
		if(!util.Grid.isModified(app, ["grdCsrShreg"], "MSG")){
			return false;
		}
		//리피트 validation check
		if(!util.validate(app, "grdCsrShreg")) return false;
		
		var vsDivRcd = util.DataMap.getValue(app, "dmReqList", "strDivRcd");

		var vsDivRcdPrp1 = ExtInstance.getValue("/root/resOnLoad/divRcdList/row", "CD_PRP1", "child::CD='"+vsDivRcd+"'");
		
		util.DataMap.setValue(app, "dmReqList", "strRsnDivRcd", vsDivRcdPrp1);
		
		//strCommand: save 
		util.Submit.send(app, "subSave", function(pbSuccessSave) {
				if(pbSuccessSave) {
					//저장성공 메세지 출력
					doList(function(pbSuccessList) {
						// 조회 : "조회되었습니다." header 메세지 표시
						if(pbSuccessList) {
							util.Msg.notify(app, "NLS.INF.M025");
						}
					});
				}
			}
		);
	}

	/**
	 * @desc 리피트 panel click event
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 3. 29
	 */
	moPage.onValueChanged_RhCkbSelect = function() {
//TO-BE: <ExtRepeat.selectedAllPanel> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.selectedAllPanel("rhCkbSelect");
	};

	/**
	 * @desc 배정구분 변경
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 3. 29
	 */
	moPage.onValueChanged_CbbDivRcd = function() {
		//개별 변경일시 배정구분과 학 만 보여줌
		if(util.DataMap.getValue(app, "dmReqList", "strDivRcd") == "CSR13005"){
			doSetCtlVisibleByDivRcd(true);
		}else{
			doSetCtlVisibleByDivRcd(false);
		}
	};
	
	/**
	 * @desc 선택한 학생 일괄배치
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 3. 29
	 */
	moPage.onClick_BtnBatch = function() {
		
		var voRpt = ExtControl.getControl("rptCsrShreg");
		var vsPath = voRpt.getRepeatAttr().getNodeSet();
		var vbPanel = false;
		var vsResult = "";
		var psUpdStatusId = AppConstants.DEL_COL_REF;
		// 리피트 패널 존재 여부 체크
		if(ExtInstance.getNodeObj(vsPath + "/" + AppConstants.DEL_COL_REF) != null){
			vbPanel = true;
		}
		
		if(ExtControl.getControl(psUpdStatusId)){
			 var vsRef = ExtControl.getControl(psUpdStatusId).getAttr("ref");
             vsRef = vsRef.substr(vsRef.lastIndexOf("/")+1, vsRef.length);
             psUpdStatusId = vsRef;
		}   
		
		if(vbPanel) {

			vsResult = voRpt.dataSet.find(psUpdStatusId + ":Y");
			
			if(vsResult == ""){
				// 라인을 선택하세요.
				util.Msg.alert("NLS-INF-M023");
				return false;
			}
			
		}else{
			// 라인을 선택하세요.
			util.Msg.alert("NLS-INF-M023");
			return false;
		}
		
		var vsBatchProfId = util.DataMap.getValue(app, "dmReqList", "strBatchProfId");
		var vsBatchProfNm = util.DataMap.getValue(app, "dmReqList", "strBatchProf");
		var vsBatchClass = util.DataMap.getValue(app, "dmReqList", "strBatchClass");
		
		//지도교수나 반 중 반드시 한개는 존재해야 함
		if(ValueUtil.isNull(vsBatchProfNm) && ValueUtil.isNull(vsBatchClass)){
			//지도교수, 반 중 1가지는 필수 입력해야 합니다.
			util.Msg.alert("NLS-CSR-EXT001");
			return false
		}
		
		var voPanelChk;
		
		if(String(vsResult).indexOf(",") != -1){
			voPanelChk = vsResult.split(",");
		}else{
			voPanelChk = new Array();
			voPanelChk[0] = vsResult;
		}
		
		for(var i = voPanelChk.length - 1; i >= 0; i--) {
			util.Grid.setRowState(app, "grdCsrShreg", cpr.data.tabledata.RowState.UPDATED, voPanelChk[i]);
			if(!ValueUtil.isNull(vsBatchProfNm)){
				util.Grid.setCellValue(app, "grdCsrShreg", "PROF_OBJ_NO", vsBatchProfId,  voPanelChk[i], true);
				util.Grid.setCellValue(app, "grdCsrShreg", "PROF_NM", vsBatchProfNm,  voPanelChk[i], true);
				util.Grid.setCellValue(app, "grdCsrShreg", "UPT_STATUS", "U",  voPanelChk[i], true);
			}
			if(!ValueUtil.isNull(vsBatchClass)){
				util.Grid.setCellValue(app, "grdCsrShreg", "CLASS_RCD", vsBatchClass,  voPanelChk[i], true);
				util.Grid.setCellValue(app, "grdCsrShreg", "UPT_STATUS", "U",  voPanelChk[i], true);
			}
		}
	};
	
	/**
	 * @desc 배정구분 변경에 따른 컨트롤제어
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 3. 29
	 */
	function doSetCtlVisibleByDivRcd(pbVisible){
		//개별변경 일시 배정구분과 학번만 보여줌 
		util.Control.setVisible(app, pbVisible, moPerCrt);
		util.Control.setVisible(app, !pbVisible, moOtherCrt);
	}
	
	/**
	 * @desc 학년도 학기 변경에 따른 표준일자 반환
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 3. 29
	 */
	moPage.onValueChanged_CbbSchYearRcd = function() {
		doGetKeyDate();
	};
	
	/**
	 * @desc 학년도 학기 변경에 따른 표준일자 반환
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 3. 29
	 */
	moPage.onValueChanged_CbbSmtRcd = function() {
		doGetKeyDate();
	};
	
	/**
	 * @desc 학년도 학기 변경에 따른 표준일자 반환
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 3. 29
	 */
	function doGetKeyDate() {
		//1. 서브미션 수행
		//strCommand: getKeyDate 
		util.Submit.send(app, "subGetKeyDate", function(pbSuccess){
			if(pbSuccess) {
				//전체권한일시 최상위 부서가 셋팅 되어 있으면 초기화 하지 않음
				var strSaCd = util.DataMap.getValue(app, "dmReqList", "strSaCd");
				if(moPageInfo.authRngRcd == "CC00102"){
					if(strSaCd != ExtInstance.getValue("instance('insStdCmnPObjSch')/root/resListObjInfo/strObjCd")){
						util.Control.reset(app, ["ipbSaNm", "ipbSaCd", "ipbStudNo", "ipbStudId", "ipbBatchRepNm", "ipbBatchRepNm"]);
						util.DataMap.setValue(app, "dmReqList", "strObjDivRcd", "");
					}
				// 전체권한 이외의 권한일시 자신의 소속 부서가 셋팅되어 있으면 초기화 하지 않음
				}else if(moPageInfo.authRngRcd == "CC00101" || moPageInfo.authRngRcd == "CC00105" || moPageInfo.authRngRcd == "CC00106" || moPageInfo.authRngRcd == "CC00107"){
					if(strSaCd != moUserInfo.asgnDeptCd){
						util.Control.reset(app, ["ipbSaNm", "ipbSaCd", "ipbStudNo", "ipbStudId", "ipbBatchRepNm", "ipbBatchRepNm"]);
						util.DataMap.setValue(app, "dmReqList", "strObjDivRcd", "");		
					}
				}
				util.DataMap.setValue(app, "dmReqList", "strKeyDate", util.DataMap.getValue(app, "dmResGetKeyDate", "strKeyDate"));
			}else{
				util.Control.reset(app, ["ipbSaNm", "ipbSaCd", "ipbStudNo", "ipbStudId", "ipbBatchRepNm", "ipbBatchRepNm", "cbbSchYearRcd", "cbbSmtRcd"]);
				util.DataMap.setValue(app, "dmReqList", "strObjDivRcd", "");
				util.DataMap.setValue(app, "dmReqList", "strKeyDate", util.DataMap.getValue(app, "dmResGetKeyDate", "strKeyDate"));
			}
		});
	};


	/**
	 * @desc 소속 조회
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 3. 29
	 */
	moPage.onValueChanged_IpbSaNm = function(sender) {
		doOnChangeStdCmnPObjSch(sender);
	}
	
	/**
	 * @desc 소속조회 팝업 호출
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 3. 29
	 */
	moPage.onClick_BtnSaPopSearch = function(sender) {
		doOnClickStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc 학생조회 팝업 호출
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 3. 29
	 */
	moPage.onClick_BtnStudPopSearch = function(sender) {
		doOnClickStdCsrPStSearch(sender);
	};
	
	/**
	 * @desc 학생 조회
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 3. 29
	 */
	moPage.onValueChanged_IpbStudNo = function(sender) {
		doOnChangeStdCsrPStSearch(sender);
	};
	
	/**
	 * @desc 지도교수조회 팝업 호출(조회조건)
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 3. 29
	 */
	moPage.onClick_BtnProfPopSearch = function(sender) {
		doOnClickStdCmnPPrsnSearch(sender);
	};
	
	/**
	 * @desc 지도교수조회(조회조건)
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 3. 29
	 */
	moPage.onValueChanged_IpbProfNm = function(sender) {
		doOnChangeStdCmnPPrsnSearch(sender);
	};
	
	/**
	 * @desc 지도교수조회(일괄배정)
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 3. 29
	 */
	moPage.onValueChanged_IpbBatchRepNm = function(sender) {
		doOnChangeStdCmnPPrsnSearch(sender);
	};

	/**
	 * @desc 지도교수조회 팝업 호출(일괄배정)
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 3. 29
	 */
	moPage.onClick_BtnBatchProfPopSearch = function(sender) {
		doOnClickStdCmnPPrsnSearch(sender);
	};
	
	/**
	 * @desc 지도교수조회 팝업 호출(리피트)
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 3. 29
	 */
	moPage.onClick_RdBtnProfNm = function(sender) {
		doOnClickStdCmnPPrsnSearch(sender);
	};
	
	/**
	 * @desc 지도교수조회(리피트)
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 3. 29
	 */
	moPage.onValueChanged_RdIpbProfNm = function(sender) {
		doOnChangeStdCmnPPrsnSearch(sender);
	};
	
	
	moPage.onLoadImportDone_ImpStdCmnPobjSch = function() {
		setStdCmnPObjSchObjInfo();
	};
	return moPage;
};

