//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./stdCcsPCurriPopup.xtm"/>

/**
 * 교과과정검색팝업
 * @class stdCcsPCurriPopup
 * @author 박갑수 at 2016. 2. 3
 */
var stdCcsPCurriPopup = function() {
	var moPage = new Page();
	
	// 임포트용 데이터 통신 오브젝트
	var moPObject = new Page();
	
	 /*
	 * 팝업 내부사용 변수
	 * @member impStdCcsPCurriPopup
	 * @author 박갑수 at 2016. 2. 3
	 */
	var moStdCcsPCurriPopup = {
		controlId 						: "",
		openedByChange			: false,
		skipOnChange				: false,
		// 선택가능 범위를 제한
		blnSaSearchUse			: "",
		strObjDivRcd					: "",
		strKeyDate						: "",
		strSaCd							: "",
		strSaNm						: "",
		strSpCd							: "",
		strSbCd							: "",
		strSbNm						: "",
		strCmpDIvRcd				: "",
		strCuCd						: "",
		
		// 선택열 결과 리턴
		Result : {
			ST_DT 						: "",
			END_DT 					: "",
			CU_OBJ_DIV_RCD 		: "",
			CU_CD 						: "",
			SB_CD 						: "",
			SB_CD_NM 				: "",
			SB_OBJ_DIV_RCD 		: "",
			SA_CD 						: "",
			SA_CD_NM 				: "",
			SA_OBJ_DIV_RCD 		: "",
			SP_CD 						: "",
			SP_OBJ_DIV_RCD 		: "",
			DCL_RCD_CD 			: "",
			DCL_RCD_NM 			: "",
			SB_LVL_RCD 			: "",
			EST_PRD_RCD 			: "",
			EST_PRD_NM 			: "",
			EVAL_METHOD_RCD 	: "",
			LECT_TYPE_RCD 		: "",
			SB_CAT_RCD 			: "",
			SB_DIV_RCD 				: "",
			SB_TYPE_RCD 			: "",
			CMP_DIV_RCD 			: "",
			CUR_DIV_RCD 			: "",
			REC_SCALE_RCD 		: "",
			DAY_DIVCLS_CNT 		: "",
			NIGHT_DIVCLS_CNT 	: "",
			LECT_TIME_CNT 		: "",
			PNT 							: "",
			THEO_TC 					: "",
			EPAC_TC 					: "",
			TLSN_REQ_CAPA1 	: "",
			TLSN_REQ_CAPA2 	: "",
			TLSN_REQ_CAPA3 	: "",
			TLSN_REQ_CAPA4 	: "",
			RE_TLSN_YN_RCD 	: "",
			MAND_SB_YN 			: "",
			LECT_EVAL_XCP_YN 			: "",
			LECT_EVAL_SUM_XCP_YN 	: "",
			PNT_INSTCH_YN 		: "",
			REF_KEY 					: ""
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
		iLanDivRcd		:	"/root/resOnLoad/strLanDivRcd",
		iKeyDate			:	"/root/reqKey/strKeyDate",
		iKeyEndDate		:	"",
		oObjDivRcd		:	"/root/reqKey/strObjDivRcd",
		oCd					:	"/root/reqKey/strSaCd",
		oCdNm				:	"ipbSaNm",
		oBegDt				:	"",
		oEndDt				:	"",
		oLanDivRcd		:	"",
		func 					:  function(poRtnValue){
			// 검색조건이 있을경우 조회
			var vsSaNm = util.DataMap.getValue(app, "dmReqKey", "strSaNm");
			if(!ValueUtil.isNull(vsSaNm)){
				// 학사부서 입력시 이수과정목록, 교과그룹목록 GET
				doSpCuList(function(pbSuccess) {
					if (pbSuccess){						
						util.Header.clickSearch(app);
					}
				});
			}else {
				// 값 초기화
				util.Control.setValue(app, "cbbSpCd", "");
				util.Control.setValue(app, "cbbCuCd", "");
				util.Control.setValue(app, "ipbSbNm", "");
				util.DataMap.setValue(app, "dmReqKey", "strSbCd", "");
			}
		}
	}];
	
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
//		ExtRepeat.init(["rptCcsCurCls"]);
		// 검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grpData"]);
		
		// 기준일자 조회하는 내부 팝업 호출을 위한 단위시스템코드 설정
		setUnitSystem("CCS");
		
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
			var voStdCcsPCurriPopup =  ExtPopUp.getParentVal("moStdCcsPCurriPopup");
			
			// 파라미터  값복사 (deep copy)
			for (var key in voStdCcsPCurriPopup) {
				if (key == "Result") {
					// 결과 값은 복사하지 않음.
					continue;
				}
				moStdCcsPCurriPopup [key] = voStdCcsPCurriPopup [key];
			}
			
			// 팝업이 뜬후에는 false로 고침.
			voStdCcsPCurriPopup.openedByChange = false;
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
				
				util.Control.redraw(app, ["cbbCmpDivRcd", "cbbSpCd", "cbbCuCd", "cbbSbLvlRcd", "cbbEstPrdRcd"]);
				
				// 파라미터 받아서 초기 검색조건 세팅.
				var voParam = moStdCcsPCurriPopup;
				
				// 교과목명
				if (!ValueUtil.isNull(voParam.strSbNm)) {
					util.Control.setValue(app, "ipbSbCdNm", voParam.strSbNm);
				}
				
				// 교과목코드
				if (!ValueUtil.isNull(voParam.strSbCd)) {
					util.DataMap.setValue(app, "dmReqKey", "strSbCd", voParam.strSbCd);
				}
				
				// 이수구분코드
				if (!ValueUtil.isNull(voParam.strCmpDivRcd)) {
					util.Control.setValue(app, "cbbCmpDivRcd", voParam.strCmpDivRcd);
				}
				
				// 객체구분코드
				if (!ValueUtil.isNull(voParam.strObjDivRcd)) {
					util.DataMap.setValue(app, "dmReqKey", "strObjDivRcd", voParam.strObjDivRcd);
				}
				
				// 기준일자
				if (!ValueUtil.isNull(voParam.strKeyDate)) {
					util.Control.setValue(app, "dipKeyDate", voParam.strKeyDate);
				}
				
				// 학사부서 검색가능여부
				if (voParam.blnSaSearchUse || !ValueUtil.isNull(voParam.strSaCd)) {
					
					// 학사부서코드
					if (!ValueUtil.isNull(voParam.strSaCd)) {
						util.DataMap.setValue(app, "dmReqKey", "strSaCd", voParam.strSaCd);
						util.Control.setValue(app, "ipbSaNm", voParam.strSaNm);
						/*
							학사부서코드를 설정하고
							해당 교과그룹을 가져온다.
						*/
						doSpCuList(function(pbSuccess) {
							if (pbSuccess){													
								
							}
						});
				
												
						// 학사부서코드가 입력되었을경우만 이수과정 교과그룹 GET
						// 이수과정
						if (!ValueUtil.isNull(voParam.strSpCd)) {
							util.Control.setValue(app, "cbbSpCd", voParam.strSpCd);
						}
						
						// 교과그룹
						if (!ValueUtil.isNull(voParam.strCuCd)) {
							util.Control.setValue(app, "cbbCuCd", voParam.strCuCd);
						}
					}
				}else {
					util.Control.setEnable(app, false, ["ipbSaNm", "btnSaCd"]);
				}
				
				// 검색조건이 입력되어 있는 경우 바로 검색 실행(돋보기버튼제외)
				if(!voParam.controlId.startsWith("btn")){
					var vsSbNm = util.Control.getValue(app, "ipbSbCdNm");
					var vsSaNm = util.Control.getValue(app, "ipbSaNm");
					if (!ValueUtil.isNull(vsSbNm) || !ValueUtil.isNull(vsSaNm)) {
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
	 * @desc [btnSaCd]학사부서명(돋보기버튼) onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 3
	 */
	moPage.onClick_BtnSaCd = function(sender) {
		// 객체검색팝업 호출
		doOnClickStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc [ipbSaNm]학사부서명 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 3
	 */
	moPage.onValueChanged_IpbSaNm = function(sender) {
		// 값변경시 객체검색팝업 호출
		doOnChangeStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc [btnSearch]조회 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 3
	 */
	moPage.onClick_BtnSearch = function() {
		// 조회조건 필수체크 - 학사부서, 교과목명 중 한개는 입력되었는지 확인.
		if(!moPage.checkNotNullCtl()){
			return false;
		}
		
		// 교과과정목록 조회
		doList(function(pbSuccess) {
			// 조회 : "조회되었습니다." header 메세지 표시
			if (pbSuccess) util.Msg.notify(app, "NLS.INF.M024");
		});
	};
	
	/**
	 * @desc 학사부서, 교과목명 중 한개는 입력되었는지 확인.
	 * @param 
	 * @return boolean
	 * @author 박갑수 at 2016. 2. 3
	 */
	moPage.checkNotNullCtl = function() {
		var vbValid = true;
		
		// 학사부서명
		var vsSaNm = util.Control.getValue(app, "ipbSaNm");
		// 교과목명
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
	 * @desc 교과과정목록 조회
	 * @param poCallBackFunc 콜백정의
	 * @return void
	 * @author 박갑수 at 2016. 2. 3
	 */
	function doList(poCallBackFunc) {
		
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdCcsCurCls");	
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
		var voResult = moStdCcsPCurriPopup.Result;
		
		if(ValueUtil.isNull(util.Grid.getCheckOrSelectedRowIndex(app, "grdCcsCurCls"))){
			// 선택된 데이터가 없습니다.
			ComMsg.warn("M008");
			return false;
		}
		
		var vnIdx = util.Grid.getIndex(app, "grdCcsCurCls");
		
		voResult.ST_DT								= util.Grid.getCellValue(app, "grdCcsCurCls", "ST_DT", vnIdx);
		voResult.END_DT			    			= util.Grid.getCellValue(app, "grdCcsCurCls", "END_DT" , vnIdx);
		voResult.CU_OBJ_DIV_RCD 			= util.Grid.getCellValue(app, "grdCcsCurCls", "CU_OBJ_DIV_RCD" , vnIdx);
		voResult.CU_CD   							= util.Grid.getCellValue(app, "grdCcsCurCls", "CU_CD" , vnIdx);
		voResult.SB_CD      						= util.Grid.getCellValue(app, "grdCcsCurCls", "SB_CD" , vnIdx);
		voResult.SB_CD_NM 						= util.Grid.getCellValue(app, "grdCcsCurCls", "SB_CD_NM", vnIdx);
		voResult.SB_OBJ_DIV_RCD        	 	= util.Grid.getCellValue(app, "grdCcsCurCls", "SB_OBJ_DIV_RCD", vnIdx);
		voResult.SA_CD 							= util.Grid.getCellValue(app, "grdCcsCurCls", "SA_CD", vnIdx);
		voResult.SA_CD_NM        				= util.Grid.getCellValue(app, "grdCcsCurCls", "SA_CD_NM", vnIdx);
		voResult.SA_OBJ_DIV_RCD				= util.Grid.getCellValue(app, "grdCcsCurCls", "SA_OBJ_DIV_RCD", vnIdx);
		voResult.SP_CD          			 		= util.Grid.getCellValue(app, "grdCcsCurCls", "SP_CD", vnIdx);
		voResult.SP_OBJ_DIV_RCD          	= util.Grid.getCellValue(app, "grdCcsCurCls", "SP_OBJ_DIV_RCD", vnIdx);
		voResult.DCL_RCD_CD          			= util.Grid.getCellValue(app, "grdCcsCurCls", "DCL_RCD_CD", vnIdx);
		voResult.DCL_RCD_NM					= util.Grid.getCellValue(app, "grdCcsCurCls", "DCL_RCD_NM", vnIdx);
		voResult.SB_LVL_RCD					= util.Grid.getCellValue(app, "grdCcsCurCls", "SB_LVL_RCD" , vnIdx);
		voResult.EST_PRD_RCD 					= util.Grid.getCellValue(app, "grdCcsCurCls", "EST_PRD_RCD" , vnIdx);
		voResult.EST_PRD_NM   				= util.Grid.getCellValue(app, "grdCcsCurCls", "EST_PRD_NM" , vnIdx);
		voResult.EVAL_METHOD_RCD      	= util.Grid.getCellValue(app, "grdCcsCurCls", "EVAL_METHOD_RCD" , vnIdx);
		voResult.LECT_TYPE_RCD 				= util.Grid.getCellValue(app, "grdCcsCurCls", "LECT_TYPE_RCD", vnIdx);
		voResult.SB_CAT_RCD       			= util.Grid.getCellValue(app, "grdCcsCurCls", "SB_CAT_RCD", vnIdx);
		voResult.SB_DIV_RCD 					= util.Grid.getCellValue(app, "grdCcsCurCls", "SB_DIV_RCD", vnIdx);
		voResult.SB_TYPE_RCD            		= util.Grid.getCellValue(app, "grdCcsCurCls", "SB_TYPE_RCD", vnIdx);
		voResult.CMP_DIV_RCD					= util.Grid.getCellValue(app, "grdCcsCurCls", "CMP_DIV_RCD", vnIdx);
		voResult.CUR_DIV_RCD          			= util.Grid.getCellValue(app, "grdCcsCurCls", "CUR_DIV_RCD", vnIdx);
		voResult.REC_SCALE_RCD          	= util.Grid.getCellValue(app, "grdCcsCurCls", "REC_SCALE_RCD", vnIdx);
		voResult.DAY_DIVCLS_CNT          	= util.Grid.getCellValue(app, "grdCcsCurCls", "DAY_DIVCLS_CNT", vnIdx);
		voResult.NIGHT_DIVCLS_CNT			= util.Grid.getCellValue(app, "grdCcsCurCls", "NIGHT_DIVCLS_CNT", vnIdx);
		voResult.LECT_TIME_CNT				= util.Grid.getCellValue(app, "grdCcsCurCls", "LECT_TIME_CNT" , vnIdx);
		voResult.PNT 								= util.Grid.getCellValue(app, "grdCcsCurCls", "PNT" , vnIdx);
		voResult.THEO_TC 						= util.Grid.getCellValue(app, "grdCcsCurCls", "THEO_TC" , vnIdx);
		voResult.EPAC_TC   						= util.Grid.getCellValue(app, "grdCcsCurCls", "EPAC_TC" , vnIdx);
		voResult.TLSN_REQ_CAPA1      		= util.Grid.getCellValue(app, "grdCcsCurCls", "TLSN_REQ_CAPA1" , vnIdx);
		voResult.TLSN_REQ_CAPA2 			= util.Grid.getCellValue(app, "grdCcsCurCls", "TLSN_REQ_CAPA2", vnIdx);
		voResult.TLSN_REQ_CAPA3       		= util.Grid.getCellValue(app, "grdCcsCurCls", "TLSN_REQ_CAPA3", vnIdx);
		voResult.TLSN_REQ_CAPA4 			= util.Grid.getCellValue(app, "grdCcsCurCls", "TLSN_REQ_CAPA4", vnIdx);
		voResult.RE_TLSN_YN_RCD            = util.Grid.getCellValue(app, "grdCcsCurCls", "RE_TLSN_YN_RCD", vnIdx);
		voResult.MAND_SB_YN					= util.Grid.getCellValue(app, "grdCcsCurCls", "MAND_SB_YN", vnIdx);
		voResult.LECT_EVAL_XCP_YN      	= util.Grid.getCellValue(app, "grdCcsCurCls", "LECT_EVAL_XCP_YN", vnIdx);
		voResult.LECT_EVAL_SUM_XCP_YN  = util.Grid.getCellValue(app, "grdCcsCurCls", "LECT_EVAL_SUM_XCP_YN", vnIdx);
		voResult.PNT_INSTCH_YN          	= util.Grid.getCellValue(app, "grdCcsCurCls", "PNT_INSTCH_YN", vnIdx);
		voResult.REF_KEY							= util.Grid.getCellValue(app, "grdCcsCurCls", "REF_KEY", vnIdx);
		voResult.CU_CD_NM						= util.Grid.getCellValue(app, "grdCcsCurCls", "CU_CD_NM" , vnIdx);

		ExtPopUp.closeLayeredPopup("callbackStdCcsPCurriPopup", moStdCcsPCurriPopup);
	};
	
	/**
	 * @desc 이수과정, 교과그룹목록 조회
	 * @param poCallBackFunc 콜백정의, 교과목코드
	 * @return void
	 * @author 박갑수 at 2016. 2. 3
	 */
	function doSpCuList(poCallBackFunc, psCuCd) {
		//strCommand: getSaSpCu 
		util.Submit.send(app, "subSpCuList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, ["cbbSpCd", "cbbCuCd"]);
				
			// 조회 후 콜백함수 수행
			if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
			}
		});
	};

	/**
	 * @desc [cbbSpCd]이수과정 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 3
	 */
	moPage.onValueChanged_CbbSpCd = function() {
		// 이수과정에따른 교과그룹값 필터링
		var vsSpCd = util.Control.getValue(app, "cbbSpCd");
		if(!ValueUtil.isNull(vsSpCd)){
			vsSpCd = "CC009SP" + vsSpCd;
		}

		ExtSelectCtl.setInsBind("cbbCuCd", "[contains(PATH, '"+ vsSpCd +"')]");
	};
	
	/**
	 * @desc [btnYearSmt]기준일자(돋보기버튼) onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 25
	 */
	moPage.onClick_BtnYearSmt = function() {
		//기준일자 임포트(달력컨트롤ID,임포트ID)
		doOnclickSchYearSmt("dipKeyDate","impSchYearSmt");
	};
	
	return moPage;
};
