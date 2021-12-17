//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCcsSRoomPcnd.xtm"/>

/**
 * 강의실현황
 * @class extCcsSRoomPcnd
 * @author 박갑수 at 2016. 7. 6
 */
var extCcsSRoomPcnd = function() {
	var moPage = new Page();
	
	// 임포트용 데이터 통신 오브젝트
	var moPObject = new Page();
	
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
		 func : function(poParam) {
					
		 }
	 }];
	
	// 학년도 ,학기, 출력순서를 원래데이터로 되돌리기위한 변수
	var msSchYearRcd = "";
	var msSmtRcd = "";
	
	/**
	 * @desc import 헤더 초기화
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 7. 6
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		doHeaderOnLoad();
	};
	
	/**
	 * @desc onLoad 실행
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 7. 6
	 */
	moPage.onModelConstructDone_ExtCcsSRoomPcnd = function() {
		// 검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grpData"]);
		
		// 서브미션 실행 (실패시 cover page)
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				
				// 조회조건 컨트롤 refresh(학년도, 학기)
				util.Control.redraw(app, ["cbbSchYearRcd", "cbbSmtRcd"]);
				
				// 학년도 학기값 되돌리기위한 값
				msSchYearRcd = util.DataMap.getValue(app, "dmKeyDateMap", "YEAR");
				msSmtRcd = util.DataMap.getValue(app, "dmKeyDateMap", "SMT");
				
				util.Control.setFocus(app, "ipbLectRoomNm");
			}
		}, true);
	};
	
	/**
	 * @desc [cbbSchYearRcd]학년도 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 7. 9
	 */
	moPage.onValueChanged_CbbSchYearRcd = function() {
		// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
		doChangeYearSmt("year");
	};
	
	/**
	 * @desc [cbbSmtRcd]학기 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 7. 9
	 */
	moPage.onValueChanged_CbbSmtRcd = function() {
		// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
		doChangeYearSmt("smt");
	};
	
	/**
	 * @desc 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 7. 9
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
	 * @desc [btnLectRoomCd]강의실(돋보기버튼) onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 7. 9
	 */
	moPage.onClick_BtnLectRoomCd = function(sender) {
		// 강의실검색팝업 호출
		doOnClickStdCcsPRoomPopup(sender);
	};
	
	/**
	 * @desc [ipbLectRoomNm]강의실 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 7. 9
	 */
	moPage.onValueChanged_IpbLectRoomNm = function(sender) {
		 // 값변경시 강의실검색팝업 호출
		doOnChangeStdCcsPRoomPopup(sender);
	};
	
	/**
	 * @desc [btnSearch]조회 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 7. 9
	 */
	moPage.onClick_BtnSearch = function() {
		// 조회조건 필수 체크
		if(!util.validate(app, ["cbbSchYearRcd", "cbbSmtRcd", "ipbLectRoomNm"])){
			return false;
		}

		var vsSchYearRcd = util.Control.getValue(app, "cbbSchYearRcd");
		var vsSmtRcd = util.Control.getValue(app, "cbbSmtRcd");

		var voParam = {
				p_strLanDivRcd 		: util.DataMap.getValue(app, "dmResOnLoad", "strLanDivRcd"),	// 언어키
				p_strKeyDate 		: util.DataMap.getValue(app, "dmKeyDateMap", "END_DT"),		// 기준일자
				p_strSchYearRcd 	: vsSchYearRcd,															// 학년도코드
				p_strSmtRcd 			: vsSmtRcd,																	// 학기코드
				p_strLectRoomCd	: util.DataMap.getValue(app, "dmReqKey", "strLectRoomCd"),		// 강의실코드
				p_strCheckAuthId 	: moUserInfo.id																// 사용자ID
		};
		
		var vsTitle = "강의실현황";
		
		var voOzFormParam = {
			  TITLE 		 : vsTitle			// 리포트타이틀
			, SUB_TITLE 	 : "" 					// 리포트서브타이틀		
			, FORM_TYPE : "flash"
		};
		
		util.Report.open(app, "hojReport", "extCcsSRoomPcnd", voOzFormParam, voParam);
	}
	
	return moPage;
};
