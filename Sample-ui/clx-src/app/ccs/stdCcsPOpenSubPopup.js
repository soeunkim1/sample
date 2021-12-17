//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./stdCcsPOpenSubPopup.xtm"/>

/**
 * 개설과목검색팝업
 * @class stdCcsPOpenSubPopup
 * @author 박갑수 at 2016. 2. 11
 */
var stdCcsPOpenSubPopup = function() {
	var moPage = new Page();
	
	// 임포트용 데이터 통신 오브젝트
	var moPObject = new Page();
	
	// 팝업 내부사용 변수
	var moStdCcsPOpenSubPopup = {
		controlId 						: "",
		openedByChange			: false,
		skipOnChange				: false,
		// 선택가능 범위를 제한
		strDivClsYn					: "",
		strLanDivRcd					: "",
		strKeyDate						: "",
		strSchYearRcd				: "",
		strSmtRcd						: "",
		strSaCd							: "",
		strSaNm						: "",
		strSaObjDivRcd				: "",
		strSbCd							: "",
		strSbNm						: "",
		strCmpDivRcd				: "",
		// 선택열 결과 리턴
		Result : {
			SP_CD 						: "",
			SP_NM 					: "",
			SB_CD 						: "",
			SB_NM						: "",
			SA_CD 						: "",
			SA_NM 					: "",
			CU_CD 						: "",
			CU_NM 					: "",
			SCH_YEAR_RCD 		: "",
			SMT_RCD 				: "",
			DIVCLS_CD 				: "",
			DIVCLS_NM 				: "",
			CMP_DIV_RCD 			: "",
			PNT 							: "",
			THEO_TC 					: "",
			EPAC_TC 					: "",
			SB_DIV_RCD 				: "",
			SB_TYPE_RCD 			: "",
			SA_POST_DIV_RCD 	: "",
			PROF_NO 					: "",
			PROF_NM 				: "",
			LECT_ROOM_NM 		: "",
			REF_KEY 					: "",
			SB_LVL_RCD				: "",
			LECT_TIME_CNT		: "",
			SB_CAT_RCD			:"",
			LECT_TYPE_RCD		:"",
			REC_SCALE_RCD		:""
		}
	};
	
	// 객체검색팝업 호출
	moPObject.moIdsForStdCmnPObjSch = [
	{
		controlId			:	"btnSaCd",
		iCd					:	"",
		iNm					:	"ipbSaNm",
		iObjDivRcd			:	["CC009SA"],
		iStartObject    	:   "",
		iOtDivRcd			:	"",
		iOtIsTreeView	:	"",
		iLanDivRcd		:	"/root/reqKey/strLanDivRcd",
		iKeyDate			:	"/root/reqKey/strKeyDate",
		iKeyEndDate		:	"",
		oObjDivRcd		:	"/root/reqKey/strSaObjDivRcd",
		oCd					:	"/root/reqKey/strSaCd",
		oCdNm				:	"ipbSaNm",
		oBegDt				:	"",
		oEndDt				:	"",
		oLanDivRcd		:	"",
		func 					:  function(poRtnValue){
			// 검색조건이 있을경우 조회
			var vsSaNm = util.DataMap.getValue(app, "dmReqKey", "strSaNm");
			if(!ValueUtil.isNull(vsSaNm)){
				util.Header.clickSearch(app);
			}
		}
	}];
	
	/**
	 * @desc import 헤더 초기화
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 2. 11
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		// import 헤더 초기화
		doHeaderOnLoad();
	};
	
	/**
	 * @desc onLoad 실행
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 11
	 */
	moPage.onModelConstructDone_StdCcsPOpenSubPopup = function() {
		// 리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["rptCcsOpenSub"]);
		// 검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grpData"]);
		
		//--화면오픈 시 분반명을 처음부터 보이지 않게 설정하여 진행하도록 한다.
		util.Grid.hideColumn(app, "rptCcsOpenSub", "rdOptDivclsNm");
		
		// 호출한 페이지에서 파라미터 받기.
		doParentGet();

		// 화면 온로드
		doOnLoad();
	};
	
	/**
	 * @desc 호출한 페이지에서 파라미터 받기
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 11
	 */
	function doParentGet() {
		
		if(ExtPopUp.isPopUp()) {
			
			// 호출한 페이지에서 파라미터 받기.													
			var voStdCcsPOpenSubPopup =  ExtPopUp.getParentVal("moStdCcsPOpenSubPopup");
			
			// 파라미터  값복사 (deep copy)
			for (var key in voStdCcsPOpenSubPopup) {
				if (key == "Result") {
					// 결과 값은 복사하지 않음.
					continue;
				}
				moStdCcsPOpenSubPopup [key] = voStdCcsPOpenSubPopup [key];
			}
			
			// 팝업이 뜬후에는 false로 고침.
			voStdCcsPOpenSubPopup.openedByChange = false;
		}
	};
	
	/**
	 * @desc 검색조건 및 코드값 세팅
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 11
	 */
	function doOnLoad() {
		
		var voParam = moStdCcsPOpenSubPopup;
				
		// 서브미션 호출
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if (pbSuccess) {
				
				util.Control.redraw(app, ["cbbCmpDivRcd"]);
				
				// 파라미터 받아서 초기 검색조건 세팅.
				
				// 분반여부
				if (!ValueUtil.isNull(voParam.strDivClsYn) && ValueUtil.fixNull(voParam.strDivClsYn) == "Y") {
					util.Control.setValue(app, "ckbDivclsYn", voParam.strDivClsYn);
					util.Control.setEnable(app, true, ["ckbDivclsYn"]);
				}else if(!ValueUtil.isNull(voParam.strDivClsYn) && ValueUtil.fixNull(voParam.strDivClsYn) == "N"){
					util.Control.setVisible(app, false, ["ckbDivclsYn"]);
				}else {
					//ExtControl.setEnable(false, ["ckbDivclsYn"]);
					//--비활성을 보이지 않도록 함.
					util.Control.setVisible(app, false, ["ckbDivclsYn"]);
				}
				
				// 교과목명
				if (!ValueUtil.isNull(voParam.strSbNm) || !ValueUtil.isNull(voParam.strSbCd)) {
					
					// 둘다 입력되었을경우 교과목명만 세팅
					if(!ValueUtil.isNull(voParam.strSbNm) && !ValueUtil.isNull(voParam.strSbCd)){
						util.Control.setValue(app, "ipbSbCdNm", voParam.strSbNm);
					}else {
						if(!ValueUtil.isNull(voParam.strSbNm)){
							util.Control.setValue(app, "ipbSbCdNm", voParam.strSbNm);
						}else if(!ValueUtil.isNull(voParam.strSbCd)){
							util.Control.setValue(app, "ipbSbCdNm", voParam.strSbCd);
						}
					}
				}
				
				// 이수구분코드
				if (!ValueUtil.isNull(voParam.strCmpDivRcd)) {
					
					var vsCmpDivRcd = "";
					
					// 배열로 입력되었을경우도 첫번째값만 사용
					if(voParam.strCmpDivRcd instanceof Array){
						  vsCmpDivRcd = voParam.strCmpDivRcd[0];
					}else {
						vsCmpDivRcd = voParam.strCmpDivRcd
					}
					
					util.DataMap.setValue(app, "dmReqKey", "strCmpDivRcd", vsCmpDivRcd);
				}
				
				// 학년도
				if (!ValueUtil.isNull(voParam.strSchYearRcd)) {
					util.DataMap.setValue(app, "dmReqKey", "strSchYearRcd", voParam.strSchYearRcd);
				}
				
				// 학기
				if (!ValueUtil.isNull(voParam.strSmtRcd)) {
					util.DataMap.setValue(app, "dmReqKey", "strSmtRcd", voParam.strSmtRcd);
				}
				
				// 학사부서코드, 학사부서명
				if (!ValueUtil.isNull(voParam.strSaCd)) {
					util.DataMap.setValue(app, "dmReqKey", "strSaCd", voParam.strSaCd);
					util.Control.setValue(app, "ipbSaNm", voParam.strSaNm);
				}
				
				// 학사부서 객체구분코드
				if (!ValueUtil.isNull(voParam.strSaObjDivRcd)) {
					util.DataMap.setValue(app, "dmReqKey", "strSaObjDivRcd", voParam.strSaObjDivRcd);
				}
				
				// 언어키
				if (!ValueUtil.isNull(voParam.strLanDivRcd)) {
					util.DataMap.setValue(app, "dmReqKey", "strLanDivRcd", voParam.strLanDivRcd);
				}else {
					// 온로드시 시스템 Default 언어 세팅
					util.DataMap.setValue(app, "dmReqKey", "strLanDivRcd", util.DataMap.getValue(app, "dmResOnLoad", "strLanDivRcd"));
				}
				
				// 기준일자
				if (!ValueUtil.isNull(voParam.strKeyDate)) {
					util.DataMap.setValue(app, "dmReqKey", "strKeyDate", voParam.strKeyDate);
				}else {
					// 학기 시작일자
					var vsStDt = util.DataMap.getValue(app, "dmKeyDateMap", "ST_DT");
					util.DataMap.setValue(app, "dmReqKey", "strKeyDate", vsStDt);
				}

				// 검색조건이 입력되어 있는 경우 바로 검색 실행(돋보기버튼제외)
				if(!voParam.controlId.startsWith("btn")){
					var vsSaNm = util.Control.getValue(app, "ipbSaNm");
					var vsSbCdNm = util.Control.getValue(app, "ipbSbCdNm");
					if (!ValueUtil.isNull(vsSaNm) || !ValueUtil.isNull(vsSbCdNm)) {
						util.Header.clickSearch(app);
					}
				}
			}
		});
	};
	
	/**
	 * @desc [btnSaCd]학사부서명(돋보기버튼) onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 11
	 */
	moPage.onClick_BtnSaCd = function(sender) {
		// 객체검색팝업 호출
		doOnClickStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc [ipbSaNm]학사부서명 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 11
	 */
	moPage.onValueChanged_IpbSaNm = function(sender) {
		// 값변경시 객체검색팝업 호출
		doOnChangeStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc [ipbSbCdNm]교과목코드/명 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 11
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
	 * @author 박갑수 at 2016. 2. 11
	 */
	moPage.onClick_BtnSearch = function() {
		// 조회조건 필수체크 - 학사부서, 교과목명 중 한개는 입력되었는지 확인.
		if(!moPage.checkNotNullCtl()){
			return false;
		}
		
		// 개설과목목목록 조회
		doList(function(pbSuccess) {
			// 조회 : "조회되었습니다." header 메세지 표시
			if (pbSuccess) util.Msg.notify(app, "NLS.INF.M024");
		});
	};
	
	/**
	 * @desc 개설과목목목록 조회
	 * @param poCallBackFunc 콜백정의
	 * @return void
	 * @author 박갑수 at 2016. 2. 11
	 */
	function doList(poCallBackFunc) {
		
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				
				// 분반 체크에 따른 컬럼 보이기 여부
				moPage.columnVisible();

				util.Control.redraw(app, "grdCcsOpenSub");	
				// 조회 후 콜백함수 수행
				if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess); 
			}
		});
	};
	 
	 /**
	 * @desc 분반 체크에 따른 컬럼 보이기 여부
	 * @param  
	 * @return void
	 * @author 박갑수 at 2016. 2. 11
	 */
	moPage.columnVisible = function() {
		// 분반여부
		var vsDivclsYn = util.Control.getValue(app, "ckbDivclsYn");
		// 분반코드, 분반명, 교수번호, 교수명, 강의실컬럼 보이기 여부 설정
		if(ValueUtil.isNull(vsDivclsYn)){
			util.Grid.hideColumn(app, "rptCcsOpenSub", "rdOptDivclsCd");
			util.Grid.hideColumn(app, "rptCcsOpenSub", "rdOptDivclsNm");
			util.Grid.hideColumn(app, "rptCcsOpenSub", "rdOptProfNo");
			util.Grid.hideColumn(app, "rptCcsOpenSub", "rdOptProfNm");
			util.Grid.hideColumn(app, "rptCcsOpenSub", "rdOptLectRoomNm");
		}else {
			util.Grid.showColumn(app, "rptCcsOpenSub", "rdOptDivclsCd", "70");
			util.Grid.showColumn(app, "rptCcsOpenSub", "rdOptDivclsNm", "43");
			util.Grid.showColumn(app, "rptCcsOpenSub", "rdOptProfNo", "70");
			util.Grid.showColumn(app, "rptCcsOpenSub", "rdOptProfNm", "100");
			util.Grid.showColumn(app, "rptCcsOpenSub", "rdOptLectRoomNm", "100");
		}
	};
	
	/**
	 * @desc 학사부서, 교과목명 중 한개는 입력되었는지 확인.
	 * @param 
	 * @return boolean
	 * @author 박갑수 at 2016. 2. 24
	 */
	moPage.checkNotNullCtl = function() {
		var vbValid = true;
		
		// 학사부서명
		var vsSaNm = util.Control.getValue(app, "ipbSaNm");
		// 교과목코드/교과목명
		var vsSbCdNm = util.Control.getValue(app, "ipbSbCdNm");
		
		if(ValueUtil.isNull(vsSaNm) && ValueUtil.isNull(vsSbCdNm)){
			var vsMsgParam = ExtControl.getTextValue("lblSaNm") + ", " + ExtControl.getTextValue("lblSbCdNm");
			
			// "조회조건[@1] 중 하나는 반드시 입력해야 합니다." 메시지 표시
			util.Msg.alert("NLS-CMM-M016", [vsMsgParam]);
			
			vbValid = false;
			return vbValid;
		}
		
		return vbValid;
	};
	
	/**
	 * @desc [rptCcsOpenSub]개설과목목록 onDoubleClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 11
	 */
	moPage.onDoubleClick_RptCcsOpenSub = function() {
		// 선택닫기 함수
		doCloseOk();
	};
	
	/**
	 * @desc [btnSearch]선택닫기 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 11
	 */
	moPage.onClick_BtnCloseOk = function() {
		// 선택닫기 함수
		doCloseOk();
	};
	
	/**
	 * @desc 부모페이지 리턴
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 11
	 */
	function doCloseOk(){
		var voResult = moStdCcsPOpenSubPopup.Result;
		
		if(ValueUtil.isNull(util.Grid.getCheckOrSelectedRowIndex(app, "grdCcsOpenSub"))){
			// 선택된 데이터가 없습니다.
			ComMsg.warn("M008");
			return false;
		}
		
		var vnIdx = util.Grid.getIndex(app, "grdCcsOpenSub");
		
		voResult.SP_CD							= util.Grid.getCellValue(app, "grdCcsOpenSub", "SP_CD", vnIdx);
		voResult.SP_NM			    		= util.Grid.getCellValue(app, "grdCcsOpenSub", "SP_NM" , vnIdx);
		voResult.SB_CD 						= util.Grid.getCellValue(app, "grdCcsOpenSub", "SB_CD" , vnIdx);
		voResult.SB_NM   						= util.Grid.getCellValue(app, "grdCcsOpenSub", "SB_NM" , vnIdx);
		voResult.SA_CD			      			= util.Grid.getCellValue(app, "grdCcsOpenSub", "SA_CD" , vnIdx);
		voResult.SA_NM 						= util.Grid.getCellValue(app, "grdCcsOpenSub", "SA_NM", vnIdx);
		voResult.CU_CD        	 				= util.Grid.getCellValue(app, "grdCcsOpenSub", "CU_CD", vnIdx);
		voResult.SCH_YEAR_RCD 			= util.Grid.getCellValue(app, "grdCcsOpenSub", "SCH_YEAR_RCD", vnIdx);
		voResult.SMT_RCD        			= util.Grid.getCellValue(app, "grdCcsOpenSub", "SMT_RCD", vnIdx);
		voResult.DIVCLS_CD					= util.Grid.getCellValue(app, "grdCcsOpenSub", "DIVCLS_CD", vnIdx);
		voResult.DIVCLS_NM          		= util.Grid.getCellValue(app, "grdCcsOpenSub", "DIVCLS_NM", vnIdx);
		voResult.CMP_DIV_RCD          	= util.Grid.getCellValue(app, "grdCcsOpenSub", "CMP_DIV_RCD", vnIdx);
		voResult.PNT          					= util.Grid.getCellValue(app, "grdCcsOpenSub", "PNT", vnIdx);
		voResult.THEO_TC						= util.Grid.getCellValue(app, "grdCcsOpenSub", "THEO_TC", vnIdx);
		voResult.EPAC_TC						= util.Grid.getCellValue(app, "grdCcsOpenSub", "EPAC_TC" , vnIdx);
		voResult.SB_DIV_RCD 				= util.Grid.getCellValue(app, "grdCcsOpenSub", "SB_DIV_RCD" , vnIdx);
		voResult.SB_TYPE_RCD   			= util.Grid.getCellValue(app, "grdCcsOpenSub", "SB_TYPE_RCD" , vnIdx);
		voResult.SA_POST_DIV_RCD      	= util.Grid.getCellValue(app, "grdCcsOpenSub", "SA_POST_DIV_RCD" , vnIdx);
		voResult.PROF_NO 					= util.Grid.getCellValue(app, "grdCcsOpenSub", "PROF_NO", vnIdx);
		voResult.PROF_NM       				= util.Grid.getCellValue(app, "grdCcsOpenSub", "PROF_NM", vnIdx);
		voResult.LECT_ROOM_NM 			= util.Grid.getCellValue(app, "grdCcsOpenSub", "LECT_ROOM_NM", vnIdx);
		voResult.REF_KEY            			= util.Grid.getCellValue(app, "grdCcsOpenSub", "REF_KEY", vnIdx);
		voResult.SB_LVL_RCD            	= util.Grid.getCellValue(app, "grdCcsOpenSub", "SB_LVL_RCD", vnIdx);
		voResult.LECT_TIME_CNT          = util.Grid.getCellValue(app, "grdCcsOpenSub", "LECT_TIME_CNT", vnIdx);
		voResult.SB_CAT_RCD          		= util.Grid.getCellValue(app, "grdCcsOpenSub", "SB_CAT_RCD", vnIdx);
		voResult.LECT_TYPE_RCD          		= util.Grid.getCellValue(app, "grdCcsOpenSub", "LECT_TYPE_RCD", vnIdx);
		voResult.REC_SCALE_RCD          		= util.Grid.getCellValue(app, "grdCcsOpenSub", "REC_SCALE_RCD", vnIdx);
		
		
		
		
		ExtPopUp.closeLayeredPopup("callbackStdCcsPOpenSubPopup", moStdCcsPOpenSubPopup);
	};
	
	/**
	 * @desc [btnCloseCancel]화면닫기 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 11
	 */
	moPage.onClick_BtnCloseCancel = function() {
		// 팝업 닫기
		app.close();
	};
	
	return moPage;
};
