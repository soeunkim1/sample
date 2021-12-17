//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCcsPDutyTimeSrh.xtm"/>

/**
 * 교과과정검색팝업
 * @class stdCcsPCurriPopup
 * @author 박갑수 at 2016. 2. 3
 */
var extCcsPDutyTimeSrh = function() {
	var moPage = new Page();
	
	// 임포트용 데이터 통신 오브젝트
	var moPObject = new Page();
	
	 /*
	 * 팝업 내부사용 변수
	 * @member impStdCcsPCurriPopup
	 * @author 박갑수 at 2016. 2. 3
	 */
	var moExtCcsPDutyTimeSrh = {
		controlId 						: "",
		openedByChange			: false,
		skipOnChange				: false
		// 선택가능 범위를 제한
		, strCdCls        : ""	// 코드분류
		, strCdPrp1InCond : ""	// 코드용도1 IN 조건절
		, strKeyDate      : ""	// 기준일
		, strWkdtyNm      : "" 	// 직책명
		
		// 선택열 결과 리턴
		, Result : {
			CD                : "",
			LAN_DIV_RCD       : "",
			CD_CLS            : "",
			OG_CD             : "",
			UCD               : "",
			ULAN_DIV_RCD      : "",
			CD_NM             : "",
			CD_SHORT_NM       : "",
			CD_LEN            : "",
			PRT_ORD           : "",
			EFFT_ST_DT        : "",
			EFFT_END_DT       : "",
			CD_DESC           : "",
			UNIT_SYSTEM_RCD   : "",
			CD_PRP1           : "",
			CD_PRP2           : "",
			CD_PRP3           : "",
			CD_PRP4           : "",
			CD_PRP5           : "",
			CD_PRP6           : "",
			CD_PRP7           : "",
			CD_PRP8           : "",
			CD_PRP9           : "",
			CD_PRP10          : ""
		}
	};
	
	
	/**
	 * @desc import 헤더 초기화
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 2. 3
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		// import 헤더 초기화
		doHeaderOnLoad();
	};
	
	/**
	 * @desc onLoad 실행
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 3
	 */
	moPage.onModelConstructDone_StdCcsPCurriPopup = function() {
		// 리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["rptMain"]);
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
	 * @author 박갑수 at 2016. 2. 3
	 */
	function doParentGet() {
		
		if(ExtPopUp.isPopUp()) {
			
			// 호출한 페이지에서 파라미터 받기.													
			var voExtCcsPDutyTimeSrh =  ExtPopUp.getParentVal("moExtCcsPDutyTimeSrh");
			
			// 파라미터  값복사 (deep copy)
			for (var key in voExtCcsPDutyTimeSrh) {
				if (key == "Result") {
					// 결과 값은 복사하지 않음.
					continue;
				}
				moExtCcsPDutyTimeSrh [key] = voExtCcsPDutyTimeSrh [key];
			}
			
			// 팝업이 뜬후에는 false로 고침.
			voExtCcsPDutyTimeSrh.openedByChange = false;
		}
	};
	
	/**
	 * @desc 검색조건 및 코드값 세팅
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 3
	 */
	function doOnLoad() {
		
		// 서브미션 호출
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if (pbSuccess) {
				
				util.Control.redraw(app, ["cbbWkdtyDivRcd", "rdCbbCmpDivCd"]);
				
				// 파라미터 받아서 초기 검색조건 세팅.
				var voParam = moExtCcsPDutyTimeSrh;
				
				// 직책명
				if (!ValueUtil.isNull(voParam.strWkdtyNm)) {
					util.Control.setValue(app, "ipbWkdtyNm", voParam.strWkdtyNm);
				}
				
				if(!voParam.controlId.startsWith("btn")){
					var vsWkdtyNm = util.Control.getValue(app, "ipbWkdtyNm");
					
					if (!ValueUtil.isNull(vsWkdtyNm)) {
						util.Header.clickSearch(app);
					}
				}
				
				
				
			}
		});
	};
	
	/**
	 * @desc [ipbSbCdNm]교과목명 onKeyDown 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 3
	 */
	moPage.onKeyDown_IpbSbCdNm = function(strKeyType, strKeyStatus) {
		// 엔터키 입력시 조회
		if(e.keyCode == cpr.events.KeyCode.ENTER){
			util.Header.clickSearch(app);
		}
	};
	
	
	/**
	 * @desc [btnSearch]조회 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 3
	 */
	moPage.onClick_BtnSearch = function() {
		
		// 교과과정목록 조회
		doList(function(pbSuccess) {
			// 조회 : "조회되었습니다." header 메세지 표시
			if (pbSuccess) util.Msg.notify(app, "NLS.INF.M024");
		});
	};
	
	
	
	
	/**
	 * @desc 교과과정목록 조회
	 * @param poCallBackFunc 콜백정의
	 * @return void
	 * @author 박갑수 at 2016. 2. 3
	 */
	function doList(poCallBackFunc) {
		
		var strWkdtyDivRcd = util.DataMap.getValue(app, "dmReqKey", "strWkdtyDivRcd");
		var vsCdCls = ExtInstance.getValue("/root/resOnLoad/wkdtyDivRcdList/row", "CD_PRP1", "child::CD='"+strWkdtyDivRcd+"'");
		
		util.DataMap.setValue(app, "dmReqKey", "strCdCls", vsCdCls);
		
		
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdMain");	
				// 조회 후 콜백함수 수행
				if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess); 
			}
		});
	};
	
	/**
	 * @desc [rptCcsCurCls]교과과정목록 onDoubleClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 3
	 */
	moPage.onDoubleClick_RptCcsCurCls = function() {
		// 선택닫기 함수
		doCloseOk();
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
	
	/**
	 * @desc [btnSearch]선택닫기 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 3
	 */
	moPage.onClick_BtnCloseOk = function() {
		// 선택닫기 함수
		doCloseOk();
	};
	
	/**
	 * @desc 부모페이지 리턴
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 1. 28
	 */
	function doCloseOk(){
		var voResult = moExtCcsPDutyTimeSrh.Result;
		
		if(ValueUtil.isNull(util.Grid.getCheckOrSelectedRowIndex(app, "grdMain"))){
			// 선택된 데이터가 없습니다.
			ComMsg.warn("M008");
			return false;
		}
		
		var vnIdx = util.Grid.getIndex(app, "grdMain");
		var vsRptId = "rptMain";
		
		voResult.CD                = util.Grid.getCellValue(app, vsRptId, "CD"              ,vnIdx);
		voResult.LAN_DIV_RCD       = util.Grid.getCellValue(app, vsRptId, "LAN_DIV_RCD"     ,vnIdx);
		voResult.CD_CLS            = util.Grid.getCellValue(app, vsRptId, "CD_CLS"          ,vnIdx);
		voResult.OG_CD             = util.Grid.getCellValue(app, vsRptId, "OG_CD"           ,vnIdx);
		voResult.UCD               = util.Grid.getCellValue(app, vsRptId, "UCD"             ,vnIdx);
		voResult.ULAN_DIV_RCD      = util.Grid.getCellValue(app, vsRptId, "ULAN_DIV_RCD"    ,vnIdx);
		voResult.CD_NM             = util.Grid.getCellValue(app, vsRptId, "CD_NM"           ,vnIdx);
		voResult.CD_SHORT_NM       = util.Grid.getCellValue(app, vsRptId, "CD_SHORT_NM"     ,vnIdx);
		voResult.CD_LEN            = util.Grid.getCellValue(app, vsRptId, "CD_LEN"          ,vnIdx);
		voResult.PRT_ORD           = util.Grid.getCellValue(app, vsRptId, "PRT_ORD"         ,vnIdx);
		voResult.EFFT_ST_DT        = util.Grid.getCellValue(app, vsRptId, "EFFT_ST_DT"      ,vnIdx);
		voResult.EFFT_END_DT       = util.Grid.getCellValue(app, vsRptId, "EFFT_END_DT"     ,vnIdx);
		voResult.CD_DESC           = util.Grid.getCellValue(app, vsRptId, "CD_DESC"         ,vnIdx);
		voResult.UNIT_SYSTEM_RCD   = util.Grid.getCellValue(app, vsRptId, "UNIT_SYSTEM_RCD" ,vnIdx);
		voResult.CD_PRP1           = util.Grid.getCellValue(app, vsRptId, "CD_PRP1"         ,vnIdx);
		voResult.CD_PRP2           = util.Grid.getCellValue(app, vsRptId, "CD_PRP2"         ,vnIdx);
		voResult.CD_PRP3           = util.Grid.getCellValue(app, vsRptId, "CD_PRP3"         ,vnIdx);
		voResult.CD_PRP4           = util.Grid.getCellValue(app, vsRptId, "CD_PRP4"         ,vnIdx);
		voResult.CD_PRP5           = util.Grid.getCellValue(app, vsRptId, "CD_PRP5"         ,vnIdx);
		voResult.CD_PRP6           = util.Grid.getCellValue(app, vsRptId, "CD_PRP6"         ,vnIdx);
		voResult.CD_PRP7           = util.Grid.getCellValue(app, vsRptId, "CD_PRP7"         ,vnIdx);
		voResult.CD_PRP8           = util.Grid.getCellValue(app, vsRptId, "CD_PRP8"         ,vnIdx);
		voResult.CD_PRP9           = util.Grid.getCellValue(app, vsRptId, "CD_PRP9"         ,vnIdx);
		voResult.CD_PRP10          = util.Grid.getCellValue(app, vsRptId, "CD_PRP10"        ,vnIdx);

		ExtPopUp.closeLayeredPopup("callbackExtCcsPDutyTimeSrh", moExtCcsPDutyTimeSrh);
	};
	
	
	return moPage;
};
