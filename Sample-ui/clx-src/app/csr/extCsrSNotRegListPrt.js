//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
///<xtmlink path="./extCsrSNotRegListPrt.xtm"/>

var extCsrSNotRegListPrt = function() {

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
	 * @desc Header Import onLoad
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 6. 20
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		doHeaderOnLoad();
	};

	/**
	 * @desc 화면 온로드
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 6. 20
	 */
	moPage.onModelConstructDone_extCsrSStudAddrPrt = function() {
		// 조회조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch",["grp_rptCsrShreg"]);
		
		//서브미션 실행 (실패시 cover page)
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				
				util.DataMap.setValue(app, "dmReqList", "strKeyDate", util.DataMap.getValue(app, "dmResOnLoad", "strKeyDate"));
				util.DataMap.setValue(app, "dmReqList", "strPrtObjDivRcd", "CC009OG");
				
				// 조회조건 초기화
				util.Control.redraw(app, ["cbbYearRcd", "cbbSmtRcd","cbbObjDivRcd"]);

				// 소속 포커스
				util.Control.setFocus(app, "ipbDeptNm");				
			}
		});
	}

	/**
	 * @desc 조회버튼 클릭
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 6. 20
	 */
	moPage.onClick_BtnSearch = function() {
		// 조회조건 필수 체크
		if(!util.validate(app, ["ipbDeptNm", "cbbYearRcd","cbbSmtRcd"])){
			return false;
		}
		
		doList();
	};
	
	/**
	 * @desc 조회
	 * @param 
	 * @return 
	 * @author Choi In Seong 2016. 6. 20
	 */
	function doList(poCallBackFunc) {
				
		// submission call 
		//strCommand: list 
		util.Submit.send(app, "subList",  function(pbSuccess) {
			if(pbSuccess){
				
				var vsSchYearNm = util.SelectCtl.getLabel(app, "cbbYearRcd", util.SelectCtl.getSelectedIndex(app, "cbbYearRcd"));
				var vsSmtNm = util.SelectCtl.getLabel(app, "cbbSmtRcd", util.SelectCtl.getSelectedIndex(app, "cbbSmtRcd"));
				var vsSaNm = util.DataMap.getValue(app, "dmReqList", "strDeptNm");
				var vsSchTitle = "학년도 : " + vsSchYearNm + "    학기 : " + vsSmtNm.substr(0,3);
				
				//리퀘스트 셋팅
				var voParam = {
							p_strDeptCd               : util.DataMap.getValue(app, "dmReqList", "strDeptCd"),
							p_strCrsSmtRcd         : util.DataMap.getValue(app, "dmReqList", "strCrsSmtRcd"),
							p_strKeyDate              : util.DataMap.getValue(app, "dmReqList", "strKeyDate"),
							p_strSchYearRcd        : util.DataMap.getValue(app, "dmReqList", "strSchYearRcd"),
							p_strSmtRcd               : util.DataMap.getValue(app, "dmReqList", "strSmtRcd"),
							p_strSchYearNm         : vsSchYearNm,
							p_strSmtNm               : vsSmtNm.substr(0,3),
							p_strDeptNm              : vsSaNm,
							p_strSaList                 : util.DataMap.getValue(app, "dmResList", "strSaList"),
							p_strPrtObjDivRcd        : util.DataMap.getValue(app, "dmReqList", "strPrtObjDivRcd"),
						    p_strPrtPageNextYn     : util.DataMap.getValue(app, "dmReqList", "strPrtPageNextYn"), 
							p_strLanDivRcd           : msDefaultLocale,
							p_strSchTitle               : vsSchTitle
						}	
						
				var vsTitle = vsSchYearNm + " " + vsSmtNm.substr(0,3) + " 미등록자 명단";  
				
				 var voOzFormParam = {
						  TITLE :  vsTitle  //리포트타이틀
						, SUB_TITLE : "" //리포트서브타이틀
						, FORM_TYPE : "flash"
					};	
						
				util.Report.open(app, "hojReport", "extCsrSNotRegListPrt", voOzFormParam, voParam);
		
			}
			if(util.isFunc(poCallBackFunc)) poFunc(pbSuccess);
		});
	}
	
	/**
	 * @desc 소속 검색 팝업 호출
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 6. 20
	 */
	moPage.onClick_BtnPopSearch = function(sender) {
		doOnClickStdCmnPObjSch(sender);
	}
	
	/**
	 * @desc 소속 검색
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 6. 20
	 */	
	moPage.onValueChanged_IpbDeptNm = function(sender) {
		doOnChangeStdCmnPObjSch(sender);
	}
	
	/**
	 * @desc 소속 권한 처리
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 6. 20
	 */
	moPage.onLoadImportDone_ImpStdCmnPobjSch = function() {
		setStdCmnPObjSchObjInfo();
	}
	
	moPage.onValueChanged_CbbSmtRcd = function() {
		doGetKeyDate();
	}
	
	moPage.onValueChanged_CbbYearRcd = function() {
		doGetKeyDate();
	}
	
	/**
	 * @desc 학년도, 학기에 해당되는 기준일을 조회한다.
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 6. 20
	 */
	function doGetKeyDate() {
	
		//strCommand: getKeyDate 
		util.Submit.send(app, "subGetKeyDate", function(pbSuccess) {

			if (pbSuccess) {
				//전체권한일시 최상위 부서가 셋팅 되어 있으면 초기화 하지 않음
				var vsDeptCd = util.DataMap.getValue(app, "dmReqList", "strDeptCd");
				if(moPageInfo.authRngRcd == "CC00102"){
					if(vsDeptCd != ExtInstance.getValue("instance('insStdCmnPObjSch')/root/resListObjInfo/strObjCd")){
						util.Control.setValue(app, "ipbDeptNm", "");
						util.Control.setValue(app, "ipbDeptCd", "");
						util.DataMap.setValue(app, "dmReqList", "strObjDivRcd", "");
					}
				// 전체권한 이외의 권한일시 자신의 소속 부서가 셋팅되어 있으면 초기화 하지 않음
				}else if(moPageInfo.authRngRcd == "CC00101" || moPageInfo.authRngRcd == "CC00105" || moPageInfo.authRngRcd == "CC00106" || moPageInfo.authRngRcd == "CC00107"){
					if(vsDeptCd != moUserInfo.asgnDeptCd){
						util.Control.setValue(app, "ipbDeptNm", "");
						util.Control.setValue(app, "ipbDeptCd", "");
						util.DataMap.setValue(app, "dmReqList", "strObjDivRcd", "");
					}
				}
				util.DataMap.setValue(app, "dmReqList", "strKeyDate", util.DataMap.getValue(app, "dmResGetKeyDate", "strKeyDate"));
				util.DataMap.setValue(app, "dmReqList", "strEndDate", util.DataMap.getValue(app, "dmResGetKeyDate", "strEndDate"));
			} else {
				util.DataMap.setValue(app, "dmReqList", "strSchYearRcd", "");
				util.DataMap.setValue(app, "dmReqList", "strSmtRcd", "");
				util.DataMap.setValue(app, "dmReqList", "strKeyDate", "");
				util.DataMap.setValue(app, "dmReqList", "strEndDate", "");
				util.Control.setValue(app, "cbbYearRcd", "");
				util.Control.setValue(app, "cbbSmtRcd", "");
			}
		});
	};
	
	return moPage;
};
