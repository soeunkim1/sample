//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCcsSLectTimeDaySche.xtm"/>

/**
 * 일자별 강의시간표
 * @class extCcsSLectTimeDaySche
 * @author 박갑수 at 2016. 8. 10
 */
var extCcsSLectTimeDaySche = function() {
	var moPage = new Page();
	
	// 임포트용 데이터 통신 오브젝트
	var moPObject = new Page();
	
	// 객체검색팝업 호출
	moPObject.moIdsForStdCmnPObjSch = [
		{
			controlId			:	"btnSaCdNm",
			iCd					:	"",
			iNm					:	"ipbSaCdNm",
			iObjDivRcd			:	["CC009OG", "CC009SA"],
			iStartObject    	:   "",
			iOtDivRcd			:	"",
			iOtIsTreeView	:	"",
			iLanDivRcd		:	"",
			iKeyDate			:	"/root/keyDateMap/ST_DT",
			iKeyEndDate		:	"",
			oObjDivRcd		:	"/root/reqKey/strObjDivRcd",
			oCd					:	"/root/reqKey/strObjCd",
			oCdNm				:	"ipbSaCdNm",
			oBegDt				:	"",
			oEndDt				:	"",
			oLanDivRcd		:	"",
			func 					:  function(){}
		}
	];
	
	// 강의실 검색
	 moPObject.moIdsForStdCcsPRoomPopup = [
		{
			 controlId					: "btnLectRoomCd",			
			 iLanDivRcd				: "/root/resOnLoad/strLanDivRcd",			
			 iBdCd						: "",			
			 iLectRoomNm			: "ipbLectRoomNm",		
			 iKeyDate					: "/root/keyDateMap/END_DT",			// (필수) 기준일
			 iLectDate					: "",			// (선택) 강의일자
			 iStTime					: "", 			// (선택) 시작시간
			 iEndTime					: "",			// (선택) 종료시간
			 iVacantRoomYn		: "",			// (선택) 빈강의실여부
			 oLectRoomCd			: "/root/reqKey/strLectRoomCd",			// 강의실코드
			 oBdCd						: "",			// 건물코드
			 oLectRoomNm			: "ipbLectRoomNm",
			 oSpvsDeptCd			: "",			
			 oObjDivRcd				: "",			
			 oLectRoomShortNm	: "",			
			 oPrpRcd					: "",			
			 oLectUseYn				: "",			// 강의실사용여부
			 oAccNop					: "",			
			 oFlrCnt						: "",			
			 oRemark					: "",			
			 oBdNm					: "",			// 건물명
			 func : function(poParam) {}
		 }
	 ];
	
	// 학년도 ,학기, 출력순서를 원래데이터로 되돌리기위한 변수
	var msSchYearRcd = "";
	var msSmtRcd = "";
	
	/**
	 * @desc import 헤더 초기화
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 8. 10
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		doHeaderOnLoad();
	};
	
	/**
	 * @desc onLoad 실행
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 8. 10
	 */
	moPage.onModelConstructDone_ExtCcsSLectTimeDaySche = function() {
		// 검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grpData"]);
		
		// 서브미션 실행 (실패시 cover page)
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				
				// 조회조건 컨트롤 refresh(학년도, 학기)
				util.Control.redraw(app, ["cbbSchYearRcd", "cbbSmtRcd", "ipbSaCdNm", "dipStDt", "dipEndDt", "cbbBdCd", "cbbStLttm", "cbbEndLttm", "cbbPrtOrd"]);
				
				// 조회조건초기값 세팅
				util.Control.setValue(app, "dipStDt", util.DataMap.getValue(app, "dmKeyDateMap", "ST_DT"));
				util.Control.setValue(app, "dipEndDt", util.DataMap.getValue(app, "dmKeyDateMap", "END_DT"));
				
				util.SelectCtl.selectItem(app, "cbbPrtOrd", 1);
				
				setStdCmnPObjSchObjInfo();
				
			}
		}, true);
	};
	
	/**
	 * @desc [cbbSchYearRcd]학년도 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 8. 10
	 */
	moPage.onValueChanged_CbbSchYearRcd = function() {
		// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
		doChangeYearSmt("year");
		
		// 조회조건 초기화
		doClearSch();
	};
	
	/**
	 * @desc [cbbSmtRcd]학기 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 8. 10
	 */
	moPage.onValueChanged_CbbSmtRcd = function() {
		// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
		doChangeYearSmt("smt");
		
		// 조회조건 초기화
		doClearSch();
	};
	
	/**
	 * @desc 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 8. 10
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
	 * @desc 조회조건 소속 초기화
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 8. 10
	 */
	function doClearSch(){
		util.Control.setValue(app, "ipbSaCdNm", "");
		util.DataMap.setValue(app, "dmReqKey", "strObjCd", "");
		util.DataMap.setValue(app, "dmReqKey", "strObjDivRcd", "");
		util.DataMap.setValue(app, "dmReqKey", "strListSaCd", "");
	};
	
	/**
	 * @desc [btnSaCdNm]소속(돋보기버튼) onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 8. 10
	 */
	moPage.onClick_BtnSaCdNm = function(sender) {
		// 객체검색팝업 호출
		doOnClickStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc [ipbSaCdNm]소속 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 8. 10
	 */
	moPage.onValueChanged_IpbSaCdNm = function(sender) {
		// 값변경시 객체검색팝업 호출
		doOnChangeStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc [dipStDt]시작일자 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 8. 10
	 */
	moPage.onValueChanged_DipStDt = function() {
		if(!doCheckDate("ST_DT")){
			util.Control.setValue(app, "dipStDt", "");
		}
	};
	
	/**
	 * @desc [dipEndDt]종료일자 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 8. 10
	 */
	moPage.onValueChanged_DipEndDt = function() {
		if( !doCheckDate("END_DT")){
			util.Control.setValue(app, "dipEndDt", "");
		}
	};

	/**
	 * @desc 시작일이 종료일보다 크거나 종료일이 시작일보다 작은지 검사
	 * @param psColNm		(필수) 날짜컬럼명
	 * @return boolean
	 * @author 박갑수 at 2016. 8. 10
	 */
	function doCheckDate(psColNm){
		// 유효성 true or false
		var vbValid = true;

		// 시작일자
		var vsStDt = util.Control.getValue(app, "dipStDt").substring(0, 8);
		// 종료일자
		var vsEndDt = util.Control.getValue(app, "dipEndDt").substring(0, 8);
		
		// 시작일 유효성 체크
		if(psColNm == "ST_DT"){
			if(!ValueUtil.isNull(vsEndDt) && vsStDt > vsEndDt){
				// "시작일이 종료일 보다 클 수 없습니다." 메시지 출력
				util.Msg.alert("NLS-CSS-M063");
				vbValid = false;
				return vbValid;
			}

		// 종료일 유효성 체크
		} else if(psColNm == "END_DT"){
			if(!ValueUtil.isNull(vsStDt) && vsStDt > vsEndDt){
				util.Msg.alert("NLS-CSS-M064");
				vbValid = false;
				return vbValid;
			}
		}
		
		return vbValid;
	};
	
	/**
	 * @desc [btnLectRoomCd]강의실(돋보기) onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 8. 10
	 */
	moPage.onClick_BtnLectRoomCd = function(sender) {
		// 강의실검색팝업 호출
		doOnClickStdCcsPRoomPopup(sender);
	};
	
	/**
	 * @desc [ipbLectRoomNm]강의실 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 8. 10
	 */
	moPage.onValueChanged_IpbLectRoomNm = function(sender) {
		 // 값변경시 강의실검색팝업 호출
		doOnChangeStdCcsPRoomPopup(sender);
	};
	
	/**
	 * @desc [cbbStLttm]시작교시 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 8. 10
	 */
	moPage.onValueChanged_CbbStLttm = function() {
		if( !doCheckLttm("ST_LTTM")){
			util.Control.setValue(app, "cbbStLttm", "");
		}
	};
	
	/**
	 * @desc [cbbEndLttm]종료교시 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 8. 10
	 */
	moPage.onValueChanged_CbbEndLttm = function() {
		if( !doCheckLttm("END_LTTM")){
			util.Control.setValue(app, "cbbEndLttm", "");
		}
	};
	
	/**
	 * @desc 시작교시 종료교시 유효성체크
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 26
	 */
	function doCheckLttm(psColId){
		// 유효성 true or false
		var vbValid = true;

		// 시작일자
		var vsStLttm = util.Control.getValue(app, "cbbStLttm");
		// 종료일자
		var vsEndLttm = util.Control.getValue(app, "cbbEndLttm");
		
		// 시작교시 종료교시 유효성 체크
		if(!ValueUtil.isNull(vsStLttm) && !ValueUtil.isNull(vsEndLttm)){
			if(Number(vsStLttm) > Number(vsEndLttm)){
				
				//  "@1 의 시간은 @2 의 시간 보다 빠를 수 없습니다." 메시지
				util.Msg.alert("NLS-CCS-M008", ["종료교시", "시작교시"]);
				
				vbValid = false;
				return vbValid;
			}
		}
		
		return vbValid;
	};
	
	/**
	 * @desc [btnSearch]조회 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 8. 10
	 */
	moPage.onClick_BtnSearch = function() {
		
		// 조회조건 필수 체크
		if(!util.validate(app, ["cbbSchYearRcd", "cbbSmtRcd", "ipbSaCdNm", "dipStDt", "dipEndDt", "cbbPrtOrd"])){
			return false;
		}
		
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				
				var vsSchYearRcd = util.Control.getValue(app, "cbbSchYearRcd");
				var vsSmtRcd = util.Control.getValue(app, "cbbSmtRcd");
				
				var voParam = {
						p_strLanDivRcd 		: util.DataMap.getValue(app, "dmResOnLoad", "strLanDivRcd"),	// 언어키
						p_strKeyDate 		: util.DataMap.getValue(app, "dmKeyDateMap", "END_DT"),		// 기준일자
						p_strSchYearRcd 	: vsSchYearRcd,															// 학년도코드
						p_strSmtRcd 			: vsSmtRcd,																	// 학기코드
						p_strListSaCd		: util.DataMap.getValue(app, "dmReqKey", "strListSaCd"),			// 학사부서코드 In조건용
						p_strStDt				: util.Control.getValue(app, "dipStDt"),										// 시작일자
						p_strEndDt				: util.Control.getValue(app, "dipEndDt"),									// 종료일자
						p_strBdCd				: util.Control.getValue(app, "cbbBdCd"),									// 건물
						p_strLectRoomCd	: util.DataMap.getValue(app, "dmReqKey", "strLectRoomCd"),		// 강의실코드
						p_strStLttm			: util.Control.getValue(app, "cbbStLttm"),									// 시작교시
						p_strEndLttm			: util.Control.getValue(app, "cbbEndLttm"),								// 종료교시
						p_strPrtOrd			: util.Control.getValue(app, "cbbPrtOrd"),									// 정렬순서
						p_strCheckAuthId 	: moUserInfo.id																// 사용자ID
				};
				
				var vsTitle = "일자별 강의시간표";
				
				var voOzFormParam = {
					  TITLE 		 : vsTitle			// 리포트타이틀
					, SUB_TITLE 	 : "" 					// 리포트서브타이틀		
					, FORM_TYPE : "flash"
				};
				
				util.Report.open(app, "hojReport", "extCcsSLectTimeDaySche", voOzFormParam, voParam);
			}
		});
	};
	
	
	
	
	
	return moPage;
};
