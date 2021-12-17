//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
///<xtmlink path="./extCsrCRemoIfrSnd.xtm"/>

var extCsrCRemoIfrSnd = function() {

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
		{   //소속 조회조건 행정,학사부서
			controlId			:	"btnPopSearch",
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
		
	/**
	 * @desc 헤더 온로드
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 3. 11
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		doHeaderOnLoad();
	};
	
	/**
	 * @desc 화면 온로드
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 3. 11
	 */
	moPage.onModelConstructDone_extCsrCRemoIfrSnd = function() {
		
		//리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init("rptRemoIfrSnd");
		// 2. 검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grpData"]);
		
		//서브미션 실행 (실패시 cover page)
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				util.Control.setValue(app, "cbbYearRcd", util.DataMap.getValue(app, "dmDefYearSmtRcdInfo", "YEAR"));
				util.Control.setValue(app, "cbbSmtRcd", util.DataMap.getValue(app, "dmDefYearSmtRcdInfo", "SMT"));
				util.DataMap.setValue(app, "dmReqList", "strKeyDate", util.DataMap.getValue(app, "dmResOnLoad", "strKeyDate"));
				
				util.Control.redraw(app, ["cbbYearRcd", "cbbSmtRcd", "cbbAltRsnRcd"]);
				
				// 통지서발송임포트 init 함수
				doInitByImpExtCsrIfrSndCommon("", "rptRemoIfrSnd", function(pbSuccess){
					if(pbSuccess){
						doList();
					}
				}, "Y", null, util.DataMap.getValue(app, "dmReqList", "strKeyDate"), util.DataMap.getValue(app, "/root/reqList/strSchYearRcd"), util.DataMap.getValue(app, "/root/reqList/strSmtRcd"));
				
			}
		});
	}

	/**
	 * @desc 학년도 변경시 표훈학기 날짜 반환
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 02. 23.
	 */
	moPage.onValueChanged_CbbYearRcd = function() {
		doGetKeyDate();
	};
	
	/**
	 * @desc 학기 변경시 표훈학기 날짜 반환
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 02. 23.
	 */
	moPage.onValueChanged_CbbSmtRcd = function() {
		doGetKeyDate();
	};
	
	/**
	 * @desc 학년도, 학기에 해당되는 기준일을 조회한다.
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 3. 11.
	 */
	function doGetKeyDate() {
	
		//strCommand: getKeyDate 
		util.Submit.send(app, "subGetKeyDate", function(pbSuccess) {

			if (pbSuccess) {
				//전체권한일시 최상위 부서가 셋팅 되어 있으면 초기화 하지 않음
				var strSaCd = util.DataMap.getValue(app, "dmReqList", "strSaCd");
				if(moPageInfo.authRngRcd == "CC00102"){
					if(strSaCd != ExtInstance.getValue("instance('insStdCmnPObjSch')/root/resListObjInfo/strObjCd")){
						util.Control.setValue(app, "ipbSaNm", "");
						util.Control.setValue(app, "ipbSaCd", "");
						util.DataMap.setValue(app, "dmReqList", "strObjDivRcd", "");
						
					}
				// 전체권한 이외의 권한일시 자신의 소속 부서가 셋팅되어 있으면 초기화 하지 않음
				}else if(moPageInfo.authRngRcd == "CC00101" || moPageInfo.authRngRcd == "CC00105" || moPageInfo.authRngRcd == "CC00106" || moPageInfo.authRngRcd == "CC00107"){
					if(strSaCd != moUserInfo.asgnDeptCd){
						util.Control.setValue(app, "ipbSaNm", "");
						util.Control.setValue(app, "ipbSaCd", "");
						util.DataMap.setValue(app, "dmReqList", "strObjDivRcd", "");
					}
				}
				util.DataMap.setValue(app, "dmReqList", "strKeyDate", util.DataMap.getValue(app, "dmResGetKeyDate", "strKeyDate"));
			} else {
				util.DataMap.setValue(app, "dmReqList", "strSchYearRcd", "");
				util.DataMap.setValue(app, "dmReqList", "strSmtRcd", "");
				util.DataMap.setValue(app, "dmReqList", "strKeyDate", "");
				util.Control.setValue(app, "cbbYearRcd", "");
				util.Control.setValue(app, "cbbSmtRcd", "");
			}
			
			// 통지서출력시 사용될 값을 다시 세팅한다.
			setKeyDateByImpExtCsrIfrSndCommon(util.DataMap.getValue(app, "dmReqList", "strKeyDate"));
			setSchYearRcdByImpExtCsrIfrSndCommon(util.DataMap.getValue(app, "dmReqList", "strSchYearRcd"));
			setSmtRcdByImpExtCsrIfrSndCommon(util.DataMap.getValue(app, "dmReqList", "strSmtRcd"));
		});
	};
	
	/**
	 * @desc 리피트 panel click event
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 3. 11.
	 */
	moPage.onValueChanged_RhCkbSelect = function() {
//TO-BE: <ExtRepeat.selectedAllPanel> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.selectedAllPanel("rhCkbSelect");
	};

	/**
	 * @desc 소속 검색
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 3. 11
	 */
	moPage.onValueChanged_IpbSaCd = function(sender) {
		doOnChangeStdCmnPObjSch(sender);
	}
	
	/**
	 * @desc 객체검색 팝업 호출
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 3. 11
	 */
	moPage.onClick_BtnPopSearch = function(sender) {
		doOnClickStdCmnPObjSch(sender);
	}
	
	/**
	 * @desc 소속 검색
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 3. 11
	 */
	moPage.onValueChanged_IpbSaNm = function(sender) {
		doOnChangeStdCmnPObjSch(sender);
	}
		
	/**
	 * @desc 조회 버튼 클릭 이밴트
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 3. 11
	 */
	moPage.onClick_BtnSearch = function() {
		
		// 조회조건 필수 체크
		if(!util.validate(app, ["cbbYearRcd", "cbbSmtRcd", "ipbSaNm", "cbbAltRsnRcd"])){
			return false;
		}
		doList(function(pbSuccess) {
			// 조회 : "조회되었습니다." header 메세지 표시
			if(pbSuccess) {
				util.Msg.notify(app, "NLS.INF.M024");
			}
		});
	};
		
	/**
	 * @desc 제적생 목록 조회
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 3. 11
	 */
	function doList(poFunc) {
		// submission call 
		//strCommand: list 
		util.Submit.send(app, "subList",  function(pbSuccess) {
			if(pbSuccess){
				//rebuild
				util.Control.redraw(app, ["rptRemoIfrSnd"]);
			}
			
			if(util.isFunc(poFunc)) poFunc(pbSuccess);
		});
			
	};

	/**
	 * @desc 제적사유 콤보박스 값 변경시 실행되는 함수
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 3. 11
	 */
	moPage.onValueChanged_CbbAltRsnRcd = function() {
		var vsAltRsnRcd = util.Control.getValue(app, "cbbAltRsnRcd");
		setIfrSheetDivRcdByImpExtCsrIfrSndCommon(ExtInstance.getValue("/root/resOnLoad/altRsnRcdList/row[ child:: CD='"+ vsAltRsnRcd +"' ]/CD_PRP2"));
	};

	/**
	 * @desc 객체검색 팝업 전체권한 최상위부서 셋팅
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 3. 11
	 */
	moPage.onLoadImportDone_ImpStdCmnPobjSch = function() {
		setStdCmnPObjSchObjInfo();
	};
	return moPage;
};

