//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./stdCcsPTimeSche.xtm"/>

/**
 * 강의실별 시간표
 * @class stdCcsPTimeSche
 * @author 박갑수 at 2016. 3. 2
 */
var stdCcsPTimeSche = function() {
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
			 iKeyDate					: "/root/reqKey/strKeyDate",			// (필수) 기준일
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
		 }
	 ];
	
	/*
	 * 팝업 내부사용 변수
	 * @member impStdCcsPTimeSche
	 * @author 박갑수 at 2016. 3. 3
	 */
	var moStdCcsPTimeSche = {
		controlId 						: "",
		openedByChange			: false,
		skipOnChange				: false,
		// 선택가능 범위를 제한
		strLectRoomNm				: "",
		strLectRoomCd				: "",
		strSchYearRcd				: "",
		strSmtRcd						: "",
		strKeyDate						: ""
	};
	
	var msDefaultColor = "#EAEAEA";		// 기본		: 옅은회색
	var msSelectColor 	= "#1DDB16";		// 선택		: 초록 
	var msMyColor		= "#747474";		// 시간표	: 진한회색
	
	/**
	 * @desc import 헤더 초기화
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 3. 2
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		// import 헤더 초기화
		doHeaderOnLoad();
	};
	
	/**
	 * @desc onLoad 실행
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 3
	 */
	moPage.onModelConstructDone_StdCcsPTimeSche = function() {
		// 리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["rptCcsLectInfo"]);
		// 검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grpData", "grpSchedule"]);
		
		// 호출한 페이지에서 파라미터 받기.
		doParentGet();

		// 화면 온로드
		doOnLoad();
	};
	
	/**
	 * @desc 호출한 페이지에서 파라미터 받기
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 3
	 */
	function doParentGet() {
		
		if(ExtPopUp.isPopUp()) {
			
			// 호출한 페이지에서 파라미터 받기.													
			var voStdCcsPTimeSche =  ExtPopUp.getParentVal("moStdCcsPTimeSche");
			
			// 파라미터  값복사 (deep copy)
			for (var key in voStdCcsPTimeSche) {
				if (key == "Result") {
					// 결과 값은 복사하지 않음.
					continue;
				}
				moStdCcsPTimeSche [key] = voStdCcsPTimeSche [key];
			}
			
			// 팝업이 뜬후에는 false로 고침.
			voStdCcsPTimeSche.openedByChange = false;
		}
	};
	
	/**
	 * @desc 검색조건 및 코드값 세팅
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 3
	 */
	function doOnLoad() {
		
		// 서브미션 호출
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if (pbSuccess) {
								
				// 파라미터 받아서 초기 검색조건 세팅.
				var voParam = moStdCcsPTimeSche;
				
				// 강의실명
				if (!ValueUtil.isNull(voParam.strLectRoomNm)) {
					util.Control.setValue(app, "ipbLectRoomNm", voParam.strLectRoomNm);
				}
				
				// 강의실코드
				if (!ValueUtil.isNull(voParam.strLectRoomCd)) {
					util.DataMap.setValue(app, "dmReqKey", "strLectRoomCd", voParam.strLectRoomCd);
				}
				
				// 학년도
				if (!ValueUtil.isNull(voParam.strSchYearRcd)) {
					util.DataMap.setValue(app, "dmReqKey", "strSchYearRcd", voParam.strSchYearRcd);
				}
				
				// 학기
				if (!ValueUtil.isNull(voParam.strSmtRcd)) {
					util.DataMap.setValue(app, "dmReqKey", "strSmtRcd", voParam.strSmtRcd);
				}
				
				// 기준일자
				if (!ValueUtil.isNull(voParam.strKeyDate)) {
					util.DataMap.setValue(app, "dmReqKey", "strKeyDate", voParam.strObjDivRcd);
				}
				
				// 바로조회
				if(!ValueUtil.isNull(voParam.strLectRoomNm) && !ValueUtil.isNull(voParam.strLectRoomCd)){
					util.Header.clickSearch(app);
				}
			}
		});
	};
	
	/**
	 * @desc [btnLectRoomCd]강의실(돋보기) onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 2
	 */
	moPage.onClick_BtnLectRoomCd = function(sender) {
		// 강의실검색팝업 호출
		doOnClickStdCcsPRoomPopup(sender);
	};
	
	/**
	 * @desc [ipbLectRoomNm]강의실 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 2
	 */
	moPage.onValueChanged_IpbLectRoomNm = function(sender) {
		// 값변경시 강의실검색팝업 호출
		doOnChangeStdCcsPRoomPopup(sender);
	};

	/**
	 * @desc [btnSearch]조회 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 2
	 */
	moPage.onClick_BtnSearch = function() {
		// 조회조건 필수 체크
		if(!util.validate(app, ["ipbLectRoomNm"])){
			return false;
		}
		
		// 개설분반 조회
		doList(function(pbSuccess) {
			// 조회 : "조회되었습니다." header 메세지 표시
			if (pbSuccess) util.Msg.notify(app, "NLS.INF.M024");
			// 강의시간표버튼 초기화
			doBtnRefresh();
			var vnRowCnt = util.Grid.getRowCount(app, "grdCcsLectInfo");
			if(vnRowCnt > 0){
				// 강의시간표 설정
				doSetScheduleColor();
			}
		});
	};
	
	/**
	 * @desc 개설분반 조회
	 * @param poCallBackFunc 콜백정의
	 * @return void
	 * @author 박갑수 at 2016. 3. 2
	 */
	function doList(poCallBackFunc) {
		
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdCcsLectInfo");	
				// 조회 후 콜백함수 수행
				if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess); 
			}
		});
	};
	
	/**
	 * @desc 강의실시간표 버튼 초기화
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 2
	 */
	function doBtnRefresh(){
		for (var i = 1; i <= 16; i++) {
			var vcBtnRefre = "";
			var vcBtnRefreDay = "";
			if (i < 10) {
				vcBtnRefre = "btn0" + i;
			} else {
				vcBtnRefre = "btn" + i;
			}
			for (var j = 1; j <= 6; j++) {
				vcBtnRefreDay = vcBtnRefre + "CL1020" + j;
				util.Control.setStyleAttr(app, vcBtnRefreDay, "background-color", msDefaultColor);
			}
		}
	};
	
	/**
	 * @desc 강의시간표 색정보 설정
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 3
	 */
	function doSetScheduleColor() {
	
		// 강의실데이터 rptCcsTimeSche에 따른 회색 세팅
		var vnRowCnt =  util.Grid.getRowCount(app, "grdCcsLectInfo");
		var vnNowIdx = util.Grid.getIndex(app, "grdCcsLectInfo");
		
		for(var i=0; i<vnRowCnt; i++){
			var vnRowIdx = i+1;

			var vsLttm = util.Grid.getCellValue(app, "grdCcsLectInfo", "LTTM", vnRowIdx);
			var vsWdayRcd = util.Grid.getCellValue(app, "grdCcsLectInfo", "WDAY_RCD", vnRowIdx);
			
			var vsTmpLttm = ""+vsLttm;
			if (Number(vsLttm) < 10) {
				vsTmpLttm = "0" + vsLttm;
			}
			
			var vcBtn = "btn" + vsTmpLttm + vsWdayRcd;
			
			if(vnRowIdx == vnNowIdx){
				// 백그라운드 색 설정 : 초록
				util.Control.setStyleAttr(app, vcBtn, "background-color", msSelectColor);
			}else {
				// 백그라운드 색 설정 : 회색
				util.Control.setStyleAttr(app, vcBtn, "background-color", msMyColor);
			}
		}
	};
	
	/**
	 * @desc [rptCcsLectInfo]개설분반 onRowSelect 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 3
	 */
	moPage.onRowSelect_RptCcsLectInfo = function() {
		doSetScheduleColor();
	};
	
	/**
	 * @desc [btnCloseCancel]화면닫기 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 3
	 */
	moPage.onClick_BtnCloseCancel = function() {
		// 팝업 닫기
		app.close();
	};
	
	return moPage;
};
