//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./stdCcsPSubPopup.xtm"/>

/**
 * 교과목검색팝업
 * @class stdCcsPSubPopup
 * @author 박갑수 at 2016. 1. 26
 */
var stdCcsPSubPopup = function() {
	var moPage = new Page();
	
	// 임포트용 데이터 통신 오브젝트
	var moPObject = new Page();
	
	// 팝업 내부사용 변수
	var moStdCcsPSubPopup = {
		controlId 						: "",
		openedByChange			: false,
		skipOnChange				: false,
		// 선택가능 범위를 제한
		strEndYn						: "",
		strLanDivRcd					: "",
		strKeyDate						: "",
		strCmpDivRcd				: "",
		strSpvsDeptCd				: "",
		strObjDivRcd					: "",
		strSpvsDeptNm				: "",
		strSbCd							: "",
		strSbNm						: "",
		
		// 선택열 결과 리턴
		Result : {
			SB_CD 						: "",
			SB_NO 						: "",
			OBJ_DIV_RCD 			: "",
			ST_DT 						: "",
			END_DT 					: "",
			LAN_DIV_RCD 			: "",
			REF_KEY 					: "",
			SB_NM 					: "",
			SHORT_NM 				: "",
			SB_CAT_RCD 			: "",
			SB_DIV_RCD 				: "",
			PNT 							: "",
			THEO_TC 					: "",
			EPAC_TC 					: "",
			SPVS_COLG_CD 		: "",
			SPVS_DEPT_CD 		: "",
			SPVS_DEPT_NM 		: "",
			CMP_DIV_RCD 			: "",
			REC_SCALE_RCD 		: "",
			SB_TYPE_RCD 			: "",
			SB_LVL_RCD 			: "",
			EVAL_METHOD_RCD 	: "",
			LECT_TYPE_RCD 		: "",
			SB_SMRY 					: "",
			REG_FEE_XCP_YN 	: "",
			SB_AMT 					: "",
			CMP_DIV_RCD_NM 	: "",
			SB_CAT_RCD_NM 		: "",
			RE_TLSN_YN_RCD 	: ""
		}
	};
	
	// 객체검색팝업 호출
	moPObject.moIdsForStdCmnPObjSch = [
	{
		controlId			:	"btnSpvsDeptNm",
		iCd					:	"",
		iNm					:	"ipbSpvsDeptNm",
		iObjDivRcd			:	["CC009SA"],
		iStartObject    	:   "",
		iOtDivRcd			:	"",
		iOtIsTreeView	:	"",
		iLanDivRcd		:	"/root/resOnLoad/strLanDivRcd",
		iKeyDate			:	"/root/reqKey/strKeyDate",
		iKeyEndDate		:	"",
		oObjDivRcd		:	"/root/reqKey/strObjDivRcd",
		oCd					:	"/root/reqKey/strSpvsDeptCd",
		oCdNm				:	"ipbSpvsDeptNm",
		oBegDt				:	"",
		oEndDt				:	"",
		oLanDivRcd		:	"",
		func 					:  function(poRtnValue){
			// 검색조건이 있을경우 조회
			var vsSpvsDeptNm = util.DataMap.getValue(app, "dmReqKey", "strSpvsDeptNm");
			if(!ValueUtil.isNull(vsSpvsDeptNm)){
				util.Header.clickSearch(app);
			}
		}
	}];
	
	/**
	 * @desc import 헤더 초기화
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 1. 28
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		// import 헤더 초기화
		doHeaderOnLoad();
	};
	
	/**
	 * @desc onLoad 실행
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 1. 28
	 */
	moPage.onModelConstructDone_StdCcsPSubPopup = function() {
		// 리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["rptCcsSub"]);
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
	 * @author 박갑수 at 2016. 1. 28
	 */
	function doParentGet() {
		
		if(ExtPopUp.isPopUp()) {
			
			// 호출한 페이지에서 파라미터 받기.													
			var voStdCcsPSubPopup =  ExtPopUp.getParentVal("moStdCcsPSubPopup");
			
			// 파라미터  값복사 (deep copy)
			for (var key in voStdCcsPSubPopup) {
				if (key == "Result") {
					// 결과 값은 복사하지 않음.
					continue;
				}
				moStdCcsPSubPopup [key] = voStdCcsPSubPopup [key];
			}
			
			// 팝업이 뜬후에는 false로 고침.
			voStdCcsPSubPopup.openedByChange = false;
		}
	};
	
	/**
	 * @desc 검색조건 및 코드값 세팅
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 1. 28
	 */
	function doOnLoad() {
		
		// 서브미션 호출
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if (pbSuccess) {
				
				util.Control.redraw(app, ["cbbCmpDivRcd"]);
				
				// 파라미터 받아서 초기 검색조건 세팅.
				var voParam = moStdCcsPSubPopup;
				
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
				
				// 객체구분코드
				if (!ValueUtil.isNull(voParam.strObjDivRcd)) {
					util.DataMap.setValue(app, "dmReqKey", "strObjDivRcd", voParam.strObjDivRcd);
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
					// 온로드시 시스템 Default 언어 세팅
					util.DataMap.setValue(app, "dmReqKey", "strKeyDate", "99991231");
				}
				
				// 폐기여부
				if (!ValueUtil.isNull(voParam.strEndYn) && ValueUtil.fixNull(voParam.strEndYn) == "Y") {
					util.Control.setValue(app, "ckbEndYn", voParam.strEndYn);
					util.Control.setEnable(app, false, ["ckbEndYn"]);
				}else {
					util.Control.setEnable(app, true, ["ckbEndYn"]);
				}
				
				// 주관부서코드, 주관부서명
				if (voParam.strSpvsDeptCd) {
					util.DataMap.setValue(app, "dmReqKey", "strSpvsDeptCd", voParam.strSpvsDeptCd);
					util.Control.setValue(app, "ipbSpvsDeptNm", voParam.strSpvsDeptNm);
				}
								
				// 검색조건이 입력되어 있는 경우 바로 검색 실행(돋보기버튼 제외)
				if(!voParam.controlId.startsWith("btn")){
					var vsSbNm = util.Control.getValue(app, "ipbSbCdNm");
					var vsSpvsDeptNm = util.Control.getValue(app, "ipbSpvsDeptNm");
					if (!ValueUtil.isNull(vsSbNm) || !ValueUtil.isNull(vsSpvsDeptNm)) {
						util.Header.clickSearch(app);
					}
				}
			}
		});
	};
	
	/**
	 * @desc [btnSpvsDeptNm]주관부서명(돋보기버튼) onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 1. 28
	 */
	moPage.onClick_BtnSpvsDeptNm = function(sender) {
		// 객체검색팝업 호출
		doOnClickStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc [ipbSpvsDeptNm]주관부서명 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 1. 28
	 */
	moPage.onValueChanged_IpbSpvsDeptNm = function(sender) {
		// 값변경시 객체검색팝업 호출
		doOnChangeStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc [ipbSbCdNm]교과목코드/명 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 1. 28
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
	 * @author 박갑수 at 2016. 1. 28
	 */
	moPage.onClick_BtnSearch = function() {
		// 조회조건 필수체크 - 주관부서, 교과목명 중 한개는 입력되었는지 확인.
		if(!moPage.checkNotNullCtl()){
			return false;
		}
		
		// 교과목목록 조회
		doList(function(pbSuccess) {
			// 조회 : "조회되었습니다." header 메세지 표시
			if (pbSuccess) util.Msg.notify(app, "NLS.INF.M024");
		});
	};
	
	/**
	 * @desc 교과목목록 조회
	 * @param poCallBackFunc 콜백정의
	 * @return void
	 * @author 박갑수 at 2016. 1. 28
	 */
	function doList(poCallBackFunc) {
		
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdCcsSub");	
				// 조회 후 콜백함수 수행
				if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess); 
			}
		});
	};
	
	/**
	 * @desc 주관부서, 교과목명 중 한개는 입력되었는지 확인.
	 * @param 
	 * @return boolean
	 * @author 박갑수 at 2016. 1. 28
	 */
	moPage.checkNotNullCtl = function() {
		var vbValid = true;
		
		// 주관부서명
		var vsSpvsDeptNm = util.Control.getValue(app, "ipbSpvsDeptNm");
		// 교과목코드/교과목명
		var vsSbCdNm = util.Control.getValue(app, "ipbSbCdNm");
		
		if(ValueUtil.isNull(vsSpvsDeptNm) && ValueUtil.isNull(vsSbCdNm)){
			var vsMsgParam = ExtControl.getTextValue("lblSpvsDeptNm") + ", " + ExtControl.getTextValue("lblSbCdNm");
			
			// "조회조건[@1] 중 하나는 반드시 입력해야 합니다." 메시지 표시
			util.Msg.alert("NLS-CMM-M016", [vsMsgParam]);
			
			vbValid = false;
			return vbValid;
		}
		
		return vbValid;
	};

	/**
	 * @desc [rptCcsSub]교과목목록 onDoubleClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 1. 28
	 */
	moPage.onDoubleClick_RptCcsSub = function() {
		// 선택닫기 함수
		doCloseOk();
	};
	
	/**
	 * @desc [btnCloseCancel]화면닫기 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 1. 28
	 */
	moPage.onClick_BtnCloseCancel = function() {
		// 팝업 닫기
		app.close();
	};
	
	/**
	 * @desc [btnSearch]선택닫기 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 1. 28
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
		var voResult = moStdCcsPSubPopup.Result;
		
		if(ValueUtil.isNull(util.Grid.getCheckOrSelectedRowIndex(app, "grdCcsSub"))){
			// 선택된 데이터가 없습니다.
			ComMsg.warn("M008");
			return false;
		}
		
		var vnIdx = util.Grid.getIndex(app, "grdCcsSub");
		
		voResult.SB_CD							= util.Grid.getCellValue(app, "grdCcsSub", "SB_CD", vnIdx);
		voResult.SB_NM			    		= util.Grid.getCellValue(app, "grdCcsSub", "SB_NM" , vnIdx);
		voResult.ST_DT 						= util.Grid.getCellValue(app, "grdCcsSub", "ST_DT" , vnIdx);
		voResult.END_DT   					= util.Grid.getCellValue(app, "grdCcsSub", "END_DT" , vnIdx);
		voResult.SHORT_NM      			= util.Grid.getCellValue(app, "grdCcsSub", "SHORT_NM" , vnIdx);
		voResult.SPVS_DEPT_NM 			= util.Grid.getCellValue(app, "grdCcsSub", "SPVS_DEPT_NM", vnIdx);
		voResult.CMP_DIV_RCD        	 	= util.Grid.getCellValue(app, "grdCcsSub", "CMP_DIV_RCD", vnIdx);
		voResult.SB_LVL_RCD 				= util.Grid.getCellValue(app, "grdCcsSub", "SB_LVL_RCD", vnIdx);
		voResult.SB_CAT_RCD        		= util.Grid.getCellValue(app, "grdCcsSub", "SB_CAT_RCD", vnIdx);
		voResult.SB_DIV_RCD					= util.Grid.getCellValue(app, "grdCcsSub", "SB_DIV_RCD", vnIdx);
		voResult.PNT          			 		= util.Grid.getCellValue(app, "grdCcsSub", "PNT", vnIdx);
		voResult.THEO_TC          			= util.Grid.getCellValue(app, "grdCcsSub", "THEO_TC", vnIdx);
		voResult.EPAC_TC          			= util.Grid.getCellValue(app, "grdCcsSub", "EPAC_TC", vnIdx);
		voResult.REC_SCALE_RCD			= util.Grid.getCellValue(app, "grdCcsSub", "REC_SCALE_RCD", vnIdx);
		voResult.SB_TYPE_RCD				= util.Grid.getCellValue(app, "grdCcsSub", "SB_TYPE_RCD" , vnIdx);
		voResult.LECT_TYPE_RCD 			= util.Grid.getCellValue(app, "grdCcsSub", "LECT_TYPE_RCD" , vnIdx);
		voResult.EVAL_METHOD_RCD   	= util.Grid.getCellValue(app, "grdCcsSub", "EVAL_METHOD_RCD" , vnIdx);
		voResult.REG_FEE_XCP_YN      	= util.Grid.getCellValue(app, "grdCcsSub", "REG_FEE_XCP_YN" , vnIdx);
		voResult.SB_AMT 						= util.Grid.getCellValue(app, "grdCcsSub", "SB_AMT", vnIdx);
		voResult.RE_TLSN_YN_RCD       	= util.Grid.getCellValue(app, "grdCcsSub", "RE_TLSN_YN_RCD", vnIdx);
		voResult.OBJ_DIV_RCD 				= util.Grid.getCellValue(app, "grdCcsSub", "OBJ_DIV_RCD", vnIdx);
		voResult.LAN_DIV_RCD            	= util.Grid.getCellValue(app, "grdCcsSub", "LAN_DIV_RCD", vnIdx);
		voResult.REF_KEY						= util.Grid.getCellValue(app, "grdCcsSub", "REF_KEY", vnIdx);
		voResult.SPVS_DEPT_CD          	= util.Grid.getCellValue(app, "grdCcsSub", "SPVS_DEPT_CD", vnIdx);
		voResult.SPVS_COLG_CD          	= util.Grid.getCellValue(app, "grdCcsSub", "SPVS_COLG_CD", vnIdx);
		voResult.SB_SMRY          			= util.Grid.getCellValue(app, "grdCcsSub", "SB_SMRY", vnIdx);
		voResult.SB_NO							= util.Grid.getCellValue(app, "grdCcsSub", "SB_NO", vnIdx);
		voResult.CMP_DIV_RCD_NM		= util.Grid.getCellValue(app, "grdCcsSub", "CMP_DIV_RCD_NM" , vnIdx);
		voResult.SB_CAT_RCD_NM 		= util.Grid.getCellValue(app, "grdCcsSub", "SB_CAT_RCD_NM" , vnIdx);
		
		ExtPopUp.closeLayeredPopup("callbackStdCcsPSubPopup", moStdCcsPSubPopup);
	};
	
	return moPage;
};
