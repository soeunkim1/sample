//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
///<xtmlink path="./extCgdSSbRankSheet.xtm"/>

var extCgdSSbRankSheet = function() {

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
	{
		controlId			:	"btnSaNm",
		iCd					:	"",
		iNm					:	"ipbSaNm",
		iObjDivRcd			:	["CC009SA"],
		iStartObject    	:   "",
		iOtDivRcd			:	"",
		iOtIsTreeView	:	"",
		iLanDivRcd		:	"/root/resOnLoad/strLanDivRcd",
		iKeyDate			:	"/root/reqKey/strKeyDate",
		iKeyEndDate		:	"",
		oObjDivRcd		:	"/root/reqKey/strSaObjDivRcd",
		oCd					:	"/root/reqKey/strSaCd",
		oCdNm				:	"ipbSaNm",
		oBegDt				:	"",
		oEndDt				:	"",
		oLanDivRcd		:	"",
		func 					:  function(poRtnValue){
			
		}
	}
	];
	
	
	
	moIdsForStdCcsPOpenSubPopup = [
	{ 
		 controlId					: "btnSbCd",			// (필수) 최초 이벤트의 버튼id
		 iDivClsYn					: "",			// (선택) 분반여부
		 iLanDivRcd				: "",			// (선택) 언어구분
		 iKeyDate             		: "/root/reqKey/strKeyDate",			// (선택) 기준일자
		 iSchYearRcd             : "cbbSchYearRcd",			// (필수) 학년도
		 iSmtRcd             		: "cbbSmtRcd",			// (필수) 학기
		 iSaCd        				: "/root/reqKey/strSaCd",			// (선택) 학사부서코드
		 iSaNm        				: "ipbSaNm",			// (필수) 학사부서명		(학사부서명, (교과목명or교과목코드) 둘중 하나 필수)
		 iSaObjDivRcd       		: "CC009SA",			// (선택) 학사부서객체구분코드
		 iSbCd        				: "",			// (선택) 교과목코드
		 iSbNm        				: "ipbSbNm",			// (필수) 교과목명		(학사부서명, (교과목명or교과목코드) 둘중 하나 필수)
		 iCmpDivRcd        		: "",			// (선택) 이수구분
		 
		 oSpCd						: "",			// 이수과정코드
		 oSpNm					: "",			// 이수과정명
		 oSbCd						: "/root/reqKey/strSbCd",			// 교과목코드
		 oSbNm					: "ipbSbNm",			// 교과목명
		 oSaCd						: "",			// 학사부서코드
		 oSaNm					: "",			// 학사부서명
		 oCuCd						: "",			// 교과그룹코드
		 oCuNm					: "",			// 교과그룹명
		 oSchYearRcd			: "",			// 학년도
		 oSmtRcd					: "",			// 학기
		 oDivclsCd					: "",			// 분반코드
		 oDivclsNm				: "",			// 분반명
		 oCmpDivRcd				: "",			// 이수구분코드
		 oPnt							: "",			// 학점
		 oTheoTc					: "",			// 이론
		 oEpacTc					: "",			// 실습
		 oSbDivRcd				: "",			// 교과구분코드
		 oSbTypeRcd				: "",			// 교과목유형코드
		 oSaPostDivRcd			: "",			// 학부대학원구분코드
		 oProfNo					: "",			// 교수번호
		 oProfNm					: "",			// 교수명
		 oLectRoomNm			: "",			// 강의실명
		 oRefKey					: "",			// 참조키
		 oSbLvlRcd				: "",			// 학년
		 oLectTimeCnt			: "",			// 강의시수
		 func : function(poParam) {
			
		}
	 }
 ];
				 
				 
	
	
	
	// 학년도 학기를 원래데이터로 되돌리기위한 변수
	var msSchYearRcd = "";
	var msSmtRcd = "";
	
	/**
	 * @desc  Header Import onLoad
	 * @return void
     * @author 양선하 at 2016.06.20
     */
	moPage.onLoadImportDone_ImpTitle = function() {
		doHeaderOnLoad();
	};
				
	/**
	 * @desc 화면 초기화
	 * @return 
	 * @author 양선하 2016.06.20
	 */
	moPage.onModelConstructDone_extCgdSSbRankSheet = function() {
		doOnLoad();
	}


	/**
	 * @desc 온로드 실행
	 * @return 
	 * @author 양선하 2016.06.20
	 */
	function doOnLoad() {
		
		//검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", "grpData");
		
		//서브미션 실행 (실패시 cover page)
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
					
					//조회조건 컨트롤 refresh(학년도, 학기)
					util.Control.redraw(app, ["cbbSchYearRcd", "cbbSmtRcd", "cbbDayNightDivRcdList"]);
					
					var vsDefYear = util.DataMap.getValue(app, "dmKeyDateMap", "YEAR");
					var vsDefSmt = util.DataMap.getValue(app, "dmKeyDateMap", "SMT");
					var vsKeyDate = util.DataMap.getValue(app, "dmKeyDateMap", "END_DT");
					
					if(ValueUtil.isNull(vsDefYear)) {
						// 콤보박스 첫 번째 값 세팅
						util.SelectCtl.selectItem(app, "cbbSchYearRcd", 0);
					} else {
						//NCS학년도로 기본 셋팅
						util.Control.setValue(app, "cbbSchYearRcd",vsDefYear);
					}
					
					if(ValueUtil.isNull(vsDefSmt)) {
						// 콤보박스 첫 번째 값 세팅
						util.SelectCtl.selectItem(app, "cbbSmtRcd", 0);
					} else {
						//NCS학기로 기본 셋팅
						util.Control.setValue(app, "cbbSmtRcd",vsDefSmt);
					}
					
					// 기준일 세팅
					util.DataMap.setValue(app, "dmRoot", "reqKey", "strKeyDate", vsKeyDate);
					
					// 학사부서 focus
					util.Control.setFocus(app, "ipbSaNm");
					
			}
		});
	};
	
	/**
	 * @desc 조회조건(학사부서)항목초기화
	 * @param 
	 * @return void
	 * @author 양선하 2016.06.20
	 */
	function doClearSchCtl() {
		
		// 학사부서
		util.Control.setValue(app, "ipbSaNm", "");
		util.DataMap.setValue(app, "dmReqKey", "strSaObjDivRcd", "");
		util.DataMap.setValue(app, "dmReqKey", "strSaCd", "");
		util.Control.setValue(app, "cbbDayNightDivRcdList","")
		util.Control.setValue(app, "ipbSbNm","")
	};
	

	/**
	 * @desc 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회 함수
	 * @param 
	 * @return void
	 * @author 양선하 2016.06.20
	 */
	function doChangeYearSmt(psDiv) {
		
		util.DataMap.setValue(app, "dmRoot", "keyDateMap", "YEAR", util.DataMap.getValue(app, "dmReqKey", "strSchYearRcd"));
		util.DataMap.setValue(app, "dmRoot", "keyDateMap", "SMT", util.DataMap.getValue(app, "dmReqKey", "strSmtRcd"));
		
		//strCommand: date 
		util.Submit.send(app, "subDate", function(pbSuccess){
			if(pbSuccess){
				msSchYearRcd = util.DataMap.getValue(app, "dmKeyDateMap", "YEAR");
				msSmtRcd = util.DataMap.getValue(app, "dmKeyDateMap", "SMT");
				
				var vsKeyDate = util.DataMap.getValue(app, "dmKeyDateMap", "END_DT");
				
				// 조회조건 세팅
				util.Control.setValue(app, "cbbSchYearRcd", msSchYearRcd);
				util.Control.setValue(app, "cbbSmtRcd", msSmtRcd);
				util.DataMap.setValue(app, "dmRoot", "reqKey", "strKeyDate", vsKeyDate);
				
			// Exception 발생시
			}else {
				if(psDiv == "year"){
					util.Control.setValue(app, "cbbSchYearRcd", msSchYearRcd);
				}else if(psDiv == "smt"){
					util.Control.setValue(app, "cbbSmtRcd", msSchYearRcd);
				}
				util.DataMap.setValue(app, "dmRoot", "reqKey", "strKeyDate", "");
			}
		});
	};
	
	/**
	 * @desc [btnSearch] 조회 버튼 on click 이벤트
	 * @return void
	 * @author 양선하 2016.06.20
	 */
	moPage.onClick_BtnSearch = function() {

		 //작업영역 리피트 변경 내역 체크
		if(util.Grid.isModified(app, "", "CRM")){
			return false;
		}
		
		//필수값 체크
		if(!util.validate(app, ["grpSearch"])) return false;
		
		var voParam = {
				p_strLanDivRcd 		: msDefaultLocale,	 														// 언어키
				p_strKeyDate 		: util.DataMap.getValue(app, "root/reqKey", "strKeyDate"),			// 기준일자(시작일)
				p_strEndDate 		: util.DataMap.getValue(app, "dmKeyDateMap", "END_DT"),		// 기준일자(종료일)
				p_strSchYearRcd 	: util.DataMap.getValue(app, "root/reqKey", "strSchYearRcd"),		// 학년도코드
				p_strSmtRcd 			: util.DataMap.getValue(app, "root/reqKey", "strSmtRcd"),			// 학기코드
				p_strSaCd				: util.DataMap.getValue(app, "root/reqKey", "strSaCd"),				// 학과코드
				p_strDayNightDivRcdList			: util.DataMap.getValue(app, "root/reqKey", "strDayNightDivRcdList"),				// 주야구분
				p_strSbNm			: util.DataMap.getValue(app, "root/reqKey", "strSbCd"),				// 교과목명
				p_strCheckAuthId 	: moUserInfo.id																//사용자ID
			};
		
		 var voOzFormParam = {
			  TITLE : "과목별 성적순위표" //리포트타이틀
			, SUB_TITLE : "" //리포트서브타이틀		
			, FORM_TYPE : "flash"
		};	
				
		util.Report.open(app, "hojReport", "extCgdSSbRankSheet", voOzFormParam, voParam);
		
	};
	
	
	/**
	 * @desc [cbbSchYearRcd] 학년도 value changed 이벤트
	 * @param 
	 * @return void
	 * @author 양선하 2016.06.20
	 */
	moPage.onValueChanged_CbbSchYearRcd = function() {
		// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
		doChangeYearSmt("year");
		
		// 조회조건(학사부서명, 학생명)항목초기화
		doClearSchCtl();
	};
	
	/**
	 * @desc [cbbSmtRcd]학기 value changed 이벤트
	 * @param 
	 * @return void
	 * @author 양선하 2016.06.20
	 */
	moPage.onValueChanged_CbbSmtRcd = function() {
		// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
		doChangeYearSmt("smt");
		
		// 조회조건(학사부서명, 학생명)항목초기화
		doClearSchCtl();
	};
	
	/**
	 * @desc [btnSaNm]학사부서명 버튼 click 이벤트
	 * @param 
	 * @return void
	 * @author 양선하 2016.06.20
	 */
	moPage.onClick_BtnSaNm = function(sender) {
		doOnClickStdCmnPObjSch(sender);
	}
	
	/**
	 * @desc [IpbSaNm]학사부서명 value changed 이벤트
	 * @param 
	 * @return void
	 * @author 양선하 2016.06.20
	 */
	moPage.onValueChanged_IpbSaNm = function(sender) {
		doOnChangeStdCmnPObjSch(sender);
	}
	
	
	
	moPage.onClick_BtnSbCd = function(sender) {
		// 교과목검색팝업 호출
		doOnClickStdCcsPOpenSubPopup(sender);
	}
	
	moPage.onValueChanged_IpbSbNm = function(sender) {
		// 값변경시 교과목검색팝업 호출
		doOnChangeStdCcsPOpenSubPopup(sender);
	}
	return moPage;
};
