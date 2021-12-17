//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./stdCcsPRoomPopup.xtm"/>

/**
 * 강의실검색(Popup)
 * @class stdCcsPRoomPopup
 * @author 박갑수 at 2016. 1. 19
 */
var stdCcsPRoomPopup = function() {
	var moPage = new Page();

	// 팝업 내부사용 변수
	var moStdCcsPRoomPopup = {
		controlId 						: "",
		openedByChange			: false,
		skipOnChange				: false,
		// 선택가능 범위를 제한
		strLanDivRcd					: "",
		strBdCd							: "",
		strLectRoomNm				: "",
		strKeyDate						: "",
		strLectDate					: "",
		strStTime						: "",
		strEndTime					: "",
		strVacantRoomYn			: "",
		
		// 선택열 결과 리턴
		Result : {
			LECT_ROOM_CD		: "",
			BD_CD						: "",	
			LECT_ROOM_NM		: "",
			SPVS_DEPT_CD			: "",
			OBJ_DIV_RCD			: "",
			LECT_ROOM_SHORT_NM	: "",
			PRP_RCD					: "",
			LECT_USE_YN			: "",
			ACC_NOP					: "",
			FLR_CNT					: "",
			REMARK					: "",
			BD_NM						: ""
		}
	};
	
	/**
	 * @desc import 헤더 초기화
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 1. 19
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		// import 헤더 초기화
		doHeaderOnLoad();
	};
	
	/**
	 * @desc onLoad 실행
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 1. 19
	 */
	moPage.onModelConstructDone_StdCcsPRoomPopup = function() {
		// 리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["rptCcsRoom"]);
		// 검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grpData"]);
		
		// 호출한 페이지에서 파라미터 받기.
		doParentGet();

		// 화면 온로드
		doOnLoad();
	};
	
	/**
	 * @desc 호출한 페이지에서 파라미터 받기
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 1. 19
	 */
	function doParentGet() {
		
		if(ExtPopUp.isPopUp()) {
			
			// 호출한 페이지에서 파라미터 받기.													
			var voStdCcsPRoomPopup =  ExtPopUp.getParentVal("moStdCcsPRoomPopup");
			
			// 파라미터  값복사 (deep copy)
			for (var key in voStdCcsPRoomPopup) {
				if (key == "Result") {
					// 결과 값은 복사하지 않음.
					continue;
				}
				moStdCcsPRoomPopup [key] = voStdCcsPRoomPopup [key];
			}
			
			// 팝업이 뜬후에는 false로 고침.
			voStdCcsPRoomPopup.openedByChange = false;
		}
	};
	
	/**
	 * @desc 검색조건 및 코드값 세팅
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 1. 19
	 */
	function doOnLoad() {
		
		// 파라미터 받아서 초기 검색조건 세팅.
		var voParam = moStdCcsPRoomPopup;
		
		if (!ValueUtil.isNull(voParam.strBdCd)) {
			util.DataMap.setValue(app, "dmReqKey", "strBdCd", voParam.strBdCd);
		}
		
		if (!ValueUtil.isNull(voParam.strLectRoomNm)) {
			util.Control.setValue(app, "ipbLectRoomNm", voParam.strLectRoomNm);
		}
		
		if (!ValueUtil.isNull(voParam.strLanDivRcd)) {
			util.DataMap.setValue(app, "dmReqKey", "strLanDivRcd", voParam.strLanDivRcd);
		}
		
		if(!ValueUtil.isNull(voParam.strKeyDate)) {
			util.DataMap.setValue(app, "dmReqKey", "strKeyDate", voParam.strKeyDate);
		}
		
		if(!ValueUtil.isNull(voParam.strLectDate)) {
			util.DataMap.setValue(app, "dmReqKey", "strLectDate", voParam.strLectDate);
		}
		
		if(!ValueUtil.isNull(voParam.strStTime)) {
			util.DataMap.setValue(app, "dmReqKey", "strStTime", voParam.strStTime);
		}
		
		if(!ValueUtil.isNull(voParam.strEndTime)) {
			util.DataMap.setValue(app, "dmReqKey", "strEndTime", voParam.strEndTime);
		}

		if(!ValueUtil.isNull(voParam.strVacantRoomYn)) {
			util.DataMap.setValue(app, "dmReqKey", "strVacantRoomYn", voParam.strVacantRoomYn);
		}
		
		// 서브미션 호출
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if (pbSuccess) {
				
				util.Control.redraw(app, ["cbbBdCd"]);
				
				if (!ValueUtil.isNull(voParam.strBdCd)) {
					util.DataMap.setValue(app, "dmReqKey", "strBdCd", voParam.strBdCd);
				}
				
				// 검색조건이 입력되어 있는 경우 바로 검색 실행(돋보기버튼제외)
				if(!voParam.controlId.startsWith("btn")){
					if (voParam.strBdCd || voParam.strLectRoomNm) {
						util.Header.clickSearch(app);
					}
				}
			}
		});
		
	};
	
	/**
	 * @desc [IpbLectRoomNm]강의실명 onKeyDown 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 1. 19
	 */
	moPage.onKeyDown_IpbLectRoomNm = function(strKeyType, strKeyStatus) {
		// 엔터키 입력시 조회
		if(e.keyCode == cpr.events.KeyCode.ENTER){
			util.Header.clickSearch(app);
		}
	};
	
	/**
	 * @desc [btnSearch]조회 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 1. 19
	 */
	moPage.onClick_BtnSearch = function() {

		doList(function(pbSuccess) {
			// 조회 : "조회되었습니다." header 메세지 표시
			if (pbSuccess) util.Msg.notify(app, "NLS.INF.M024");
		});
	};
	
	/**
	 * @desc 강의실목록 조회
	 * @param poCallBackFunc 콜백정의
	 * @return void
	 * @author 박갑수 at 2016. 1. 19
	 */
	function doList(poCallBackFunc) {
		
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdCcsRoom");	
				// 조회 후 콜백함수 수행
				if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess); 
			}
		});
	};
	
	/**
	 * @desc [rptCcsRoom]강의실목록 onDoubleClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 1. 19
	 */
	moPage.onDoubleClick_RptCcsRoom = function() {
		// 선택닫기 함수
		doCloseOk();
	};
	
	/**
	 * @desc [btnCloseCancel]화면닫기 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 1. 19
	 */
	moPage.onClick_BtnCloseCancel = function() {
		// 팝업 닫기
		app.close();
	};
	
	/**
	 * @desc [btnCloseOk]선택닫기 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 1. 19
	 */
	moPage.onClick_BtnCloseOk = function() {
		// 선택닫기 함수
		doCloseOk();
	};
	
	/**
	 * @desc 부모페이지 리턴
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 1. 19
	 */
	function doCloseOk(){
		var voResult = moStdCcsPRoomPopup.Result;
		
		if(ValueUtil.isNull(util.Grid.getCheckOrSelectedRowIndex(app, "grdCcsRoom"))){
			// 선택된 데이터가 없습니다.
			ComMsg.warn("M008");
			return false;
		}
		
		var vnIdx = util.Grid.getIndex(app, "grdCcsRoom");
		
		voResult.LECT_ROOM_CD				= util.Grid.getCellValue(app, "grdCcsRoom", "LECT_ROOM_CD", vnIdx);
		voResult.BD_CD			    				= util.Grid.getCellValue(app, "grdCcsRoom", "BD_CD" , vnIdx);
		voResult.LECT_ROOM_NM 				= util.Grid.getCellValue(app, "grdCcsRoom", "LECT_ROOM_NM" , vnIdx);
		voResult.SPVS_DEPT_CD   				= util.Grid.getCellValue(app, "grdCcsRoom", "SPVS_DEPT_CD" , vnIdx);
		voResult.OBJ_DIV_RCD      				= util.Grid.getCellValue(app, "grdCcsRoom", "OBJ_DIV_RCD" , vnIdx);
		voResult.LECT_ROOM_SHORT_NM 	= util.Grid.getCellValue(app, "grdCcsRoom", "LECT_ROOM_SHORT_NM", vnIdx);
		voResult.PRP_RCD         				= util.Grid.getCellValue(app, "grdCcsRoom", "PRP_RCD", vnIdx);
		voResult.LECT_USE_YN 					= util.Grid.getCellValue(app, "grdCcsRoom", "LECT_USE_YN", vnIdx);
		voResult.ACC_NOP            			= util.Grid.getCellValue(app, "grdCcsRoom", "ACC_NOP", vnIdx);
		voResult.FLR_CNT							= util.Grid.getCellValue(app, "grdCcsRoom", "FLR_CNT", vnIdx);
		voResult.REMARK          			 	= util.Grid.getCellValue(app, "grdCcsRoom", "REMARK", vnIdx);
		voResult.BD_NM          					= util.Grid.getCellValue(app, "grdCcsRoom", "BD_NM", vnIdx);
		
		ExtPopUp.closeLayeredPopup("callbackStdCcsPRoomPopup", moStdCcsPRoomPopup);
	};
	
	return moPage;
};
