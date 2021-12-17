
//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./stdCmnSOzTemplate.xtm"/>


var stdCmnSOzTemplate = function() {
		
	var moPage = new Page();
	var moPObject = new PObject();
	
			/******************************************************************************************************
			 *  학생검색팝업 관련 설정사항
			 *  ▶ 설정가능 유형
			 *      1. 인스턴스
			 *      2. 리피트 디테일 셀 ID
			 *      3. 컨트롤 ID
			 *  ▶ 각 변수별 설명
			 *      iXXX : 팝업에 전달될  input 파라미터
			 *      oXXX : 팝업에서 선택한 값을 받을 데이터
			 *      1. controlId			: 최초 이벤트의 버튼이나 그리드 id	(필수)
			 *      2. iStudNo 			: 검색조건 학번					    		(선택) (값이 존재할 경우 4자리 이상)
			 *      3. iStudId 				: 검색조건 학번오브젝트					(선택)
			 *      4. iStudNm 			: 이름        				            		(선택) (값이 존재할 경우 2자리 이상)
			 *      5. iKeyDate 			: 기준일 										(필수) (기준일자(학년도학기 종료일),안주면 최종데이터나옴)
			 *      6. iObjDivRcd 		: 객체구분코드 								(선택)
			 *      7. iObjCd 				: 부서코드										(선택)
			 *      8. iObjNm 			: 부서명											(선택) 
			 *      9. iAuthYN				: 권한미적용여부 (미적용시: "Y")		(선택) 
			 *     10. iStatRcd			: 학적상태코드								(선택) "CT301ATTE,CT301ABSE,CT301COMP,CT301GRAD,CT301REMO"
			 *     11. oStudId				: 학번오브젝트
			 *     12. oStudNo 			: 학번
			 *     13. oStudNm 			: 이름
			 *     14. oSsn 				: 주민번호
			 *     15. oStatNm 			: 학적상태명
			 *     16. oStatRcd 			: 학적상태코드
			 *     17. oProcRslt 			: 진급학기
			 *     18. oProcRsltYear 	: 진급학년
			 *     19. oSaCd 				: 학사부서코드명
			 *     20. oSaNm 			: 학사부서명
			 *     21. oSpCd 				: 이수과정코드명
			 *     22. oSpNm 			: 이수과정명
			 *     23. oOgCd 				: 행정부서코드명
			 *     24. oOgNm 			: 행정부서명
			 *     25. func 				: 팝업에서 선택한 값을 받은 후 추가 로직이 필요한 경우 함수 작성
			 *									  
			 *******************************************************************************************************/	
			moPObject.moIdsForStdCsrPStSearch = [
			{
				controlId     		: "btnStudNo",
				iStudNo       		: "ipbStudNo",		
				iStudId       		: "",
				iStudNm       		: "",
				iKeyDate	  		: "/root/resOnLoad/strKeyDate",
				iObjDivRcd 		: "",
				iObjCd     	  		: "",
				iObjNm 			: "",
				iAuthYN		  		: "",
				iStatRcd			: "",
				oStudId       		: "/root/reqKey/strStudId",
				oStudNo       		: "ipbStudNo",		
				oStudNm       	: "",
				oSsn          		: "",
				oStatNm 	  		: "",
				oStatRcd	  		: "",
				oProcRslt	  		: "",
				oProcRsltYear    : "",
				oSaCd         		: "",
				oSaNm         	: "",					
				oSpCd         		: "",
				oSpNm         	: "",
				oOgCd 		  		: "",
				oOgNm 		  	: "",
				func 		  			: null
			},
			{
				controlId     		: "rdBtnStudNo",
				iStudNo       		: "rdIpbStudNo",
				iStudId       		: "",
				iStudNm       		: "",
				iKeyDate	  		: "/root/resOnLoad/strKeyDate",
				iObjDivRcd 		: "",
				iObjCd     	  		: "",
				iObjNm 			: "",
				iAuthYN		  		: "",
				oStudId       		: "rdIpbStudId",
				oStudNo       		: "rdIpbStudNo",
				oStudNm       	: "rdIpbRepNm",
				oSsn          		: "rdIpbSsn",
				oStatNm 	  		: "",
				oStatRcd	  		: "",
				oProcRslt	  		: "",
				oProcRsltYear	: "",
				oSaCd         		: "",
				oSaNm         	: "",					
				oSpCd         		: "",
				oSpNm         	: "",
				oOgCd 		  		: "",
				oOgNm 		  	: "",
				func 		  		    : null
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
			{
				controlId			:	"btnSaNm",
				iCd					:	"",
				iNm					:	"ipbSaNm",
				iObjDivRcd			:	["CC009OG","CC009SA"],
				iStartObject    	:   "",
				iOtDivRcd			:	"",
				iOtIsTreeView	:	"",
				iLanDivRcd		:	"",
				iKeyDate			:	"/root/resOnLoad/strKeyDate",
				iKeyEndDate		:	"",
				oObjDivRcd		:	"",
				oCd					:	"/root/reqKey/strSaCd",
				oCdNm				:	"ipbSaNm",
				oBegDt				:	"",
				oEndDt				:	"",
				oLanDivRcd		:	"",
				func 					:  null
			},
			{
				controlId			:	"rdBtnSaNm",
				iCd					:	"",
				iNm					:	"rdIpbSaNm",
				iObjDivRcd			:	["CC009SA"],
				iStartObject    	:   "",
				iOtDivRcd			:	"",
				iOtIsTreeView	:	"",
				iLanDivRcd		:	"",
				iKeyDate			:	"/root/resOnLoad/strKeyDate",
				iKeyEndDate		:	"",
				oObjDivRcd		:	"",
				oCd					:	"rdIpbSaCd",
				oCdNm				:	"rdIpbSaNm",
				oBegDt				:	"",
				oEndDt				:	"",
				oLanDivRcd		:	"",
				func					:	null
			}
			];
			
	/**
	 * @desc  onLoad  	
	 * @return void
	 * @author xxxx 2015. 6. 5.
	 */
	function doOnLoad() {
		
		//검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grp_rptCmnTmpReg"]);
		
	}
	


	moPage.onModelConstructDone_stdCmnSOzTemplate = function() {
		doOnLoad();
	};
	
	
	moPage.onClick_BtnSearch = function() {
		var voParam = {
					p_strLanDivRcd 	: msDefaultLocale,	 												// 언어키
					p_strKeyDate 	: "20160111",		 													// 기준일자
					p_strStudNo 		: util.DataMap.getValue(app, "root/reqKey", "strStudNo"),	// 학번
					p_strSaCd 		: util.DataMap.getValue(app, "root/reqKey", "strSaCd"),	 	// 학사부서 코드
					p_strCheckAuthId : moUserInfo.id														//사용자ID
					
				};
				
			 var voOzFormParam = {
					  TITLE : "토마토대학교 차세대 통합정보시스템 구축" //리포트타이틀
					, SUB_TITLE : "서브타이틀" //리포트서브타이틀		
					, FORM_TYPE : "flash"
				};	
				
		util.Report.open(app, "hojReport", "stdCmnSTmpReg", voOzFormParam, voParam);
	};
	
	
	
	moPage.onValueChanged_IpbSaNm = function(sender) {
		doOnChangeStdCmnPObjSch(sender);
	};
	
	
	moPage.onValueChanged_IpbStudNo = function(sender) {
		doOnChangeStdCsrPStSearch(sender);
	};
	
	
	

	
	
	moPage.onClick_BtnSaNm = function(sender) {
		doOnClickStdCmnPObjSch(sender);
	};
	
	
	moPage.onClick_BtnStudNo = function(sender) {
		doOnClickStdCsrPStSearch(sender);
	};
	
	
	
	
	
	moPage.onLoadImportDone_ImpTitle = function() {
		doHeaderOnLoad();
	};
	
	
	moPage.onClick_BtnOzPopup = function() {
		
		
		var voParam = {
					p_strLanDivRcd 	: msDefaultLocale,	 												// 언어키
					p_strKeyDate 	: "20160111",		 													// 기준일자
					p_strStudNo 		: util.DataMap.getValue(app, "root/reqKey", "strStudNo"),	// 학번
					p_strSaCd 		: util.DataMap.getValue(app, "root/reqKey", "strSaCd"),	 	// 학사부서 코드
					p_strCheckAuthId : moUserInfo.id														//사용자ID
					
				};
				
			 var voOzFormParam = {
					  TITLE : "토마토대학교 차세대 통합정보시스템 구축" //리포트타이틀
					, SUB_TITLE : "서브타이틀" //리포트서브타이틀		
					, FORM_TYPE : "flash"
				};	
				
		ReportUtil.fOzPopupOpen("학생목록", "stdCmnSTmpReg", voOzFormParam, voParam);
		
	};
	return moPage;
};

