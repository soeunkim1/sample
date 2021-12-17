//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./stdCssPScalFeePop.xtm"/>


var stdCssPScalFeePop = function() {
	var moPage = new Page();
	//임포트용 데이터 통신 오브젝트
	var moPObject = new PObject();
	
	/*
	 * 부모 페이지에서 받아온 기본값을 받는 객체
	 * 내부적으로 Result라는 객체를 가지고 있으며, 부모에 넘겨줄 결과값을 저장
	 * @member stdCssPScalFeePop
	 * @author AeyoungLee 2016. 2. 29.
	 */
	moPObject.moStdCssPScalFeePop = {
		// 팝업 작동 내부사용
		controlId : "",
		openedByChange : false,
		// 선택가능 범위를 제한함.
		objDivRcd : "CC009SS",
		lanDivRcd : "/root/resOnLoad/strDefLanDivRcd",
		// 검색어 기본값 지정
		strKeyDate    	 : "",
		strScalFeeCd 	 : "",
		strScalFeeNm     : "",
		strScalFeeCls1   : "",
		strScalFeeCls2   : "",
		strScalFeeCls3   : "",
		strScalFeeCls4   : "",
		strScalFeeCls5   : "",
		strDeptCd 		 : "",				
		strDeptObjDivRcd : "",				
		strMngDeptDiv    : "",				
		strWrkScalYn     : "",				
		strStudReqYn     : "",				
		strCntiScalYn    : "",
		// 선택열 결과 리턴 - 모든 칼럼을 넘겨줄 수 있도록 한다.
		result : {
			SCAL_FEE_CD : "",
			ST_DT : "",
			END_DT : "",
			OBJ_DIV_RCD : "", 
			REF_KEY : "",
			LAN_DIV_RCD : "", 
			DEPT_CD : "",
			DEPT_OBJ_DIV_RCD : "", 
			DEPT_NM : "",
			SCAL_FEE_NM : "",
			SHORT_NM : "",
			PRT_SCAL_FEE_NM : "",
			SCAL_FNDTN_CD : "",
			PMNT_DIV_RCD : "",
			WRK_SCAL_YN : "",
			DUP_PMNT_YN : "",
			MNG_DEPT_DIV_RCD : "",
			STUD_REQ_YN : "",
			CNTI_SCAL_YN : "",
			PMNT_CNT : "",
			PMNT_ITV_RCD : "",
			CERT_SHEET_NPRT_YN : "",
			PRT_ORD : "",
			SCAL_FEE_CLS1_RCD : "",
			SCAL_FEE_CLS2_RCD : "",
			SCAL_FEE_CLS3_RCD : "",
			SCAL_FEE_CLS4_RCD : "",
			SCAL_FEE_CLS5_RCD : "",
			DESC1 : "",
			DESC2 : "",
			DESC3 : "",
			DESC4 : "",
			DESC5 : ""
		}
	};
	
	/**
	 * doOnLoadSetting  화면 오픈 시 수행되는 함수
	 * @member stdCssPScalFeePop
	 * @type void
	 * @author AeyoungLee 2016. 2. 29.
	 */
	moPage.onModelConstructDone_StdCssPScalFeePop = function(){
		//리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init("rptScalFee");
		//검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", "grpData");
		
		//호출한 페이지에서 파라미터 받기.
		doParentGet();
		
		//화면 온로드 서브미션 호출
		doOnLoad();
	}
	
	/**
	 * doSearch 조회 서브미션
	 * @member stdCssPScalFeePop
	 * @type void
	 * @author AeyoungLee 2016. 2. 29.
	 */	
	function doParentGet(){
		if(ExtPopUp.isPopUp()) {
			// 호출한 페이지에서 파라미터 받기.													
			var voStdCssPScalFeeSch =  ExtPopUp.getParentVal("moStdCssPScalFeeSch");
					
			// 파라미터  값복사 (deep copy)
			for (var key in voStdCssPScalFeeSch) {
				if (key == "result") {
					// 결과 값은 복사하지 않음.
					continue;
				}
				moStdCssPScalFeePop [key] = voStdCssPScalFeeSch [key];
			}
			// 팝업이 뜬후에는 false로 고침.
			voStdCssPScalFeeSch.openedByChange = false;
		}
	}
	
	/**
	 * doSearch 조회 서브미션
	 * @member stdCssPScalFeePop
	 * @type void
	 * @author AeyoungLee 2016. 2. 29.
	 */	
	function doOnLoad(){
		// 파라미터 받아서 초기 검색조건 세팅.
		var voParam = moStdCssPScalFeePop;
		
		if (voParam.objDivRcd) {
			util.DataMap.setValue(app, "dmReqKey", "strObjDivRcd", voParam.objDivRcd);
		}
		if (voParam.lanDivRcd) {
			util.DataMap.setValue(app, "dmReqKey", "strLanDivRcd", voParam.lanDivRcd);
		}
		if (voParam.strScalFeeCd) {
			util.Control.setValue(app, "ipbScalFeeCd", voParam.strScalFeeCd);
		}
		if (voParam.strScalFeeNm) {
			util.Control.setValue(app, "ipbScalFeeNm", voParam.strScalFeeNm);
		}
		if (voParam.strScalFeeCls1) {
			util.Control.setValue(app, "cbbScalFeeCls1", voParam.strScalFeeCls1);
		}
		if (voParam.strScalFeeCls2) {
			util.Control.setValue(app, "cbbScalFeeCls2", voParam.strScalFeeCls2);
		}
		if (voParam.strScalFeeCls3) {
			util.Control.setValue(app, "cbbScalFeeCls3", voParam.strScalFeeCls3);
		}
		if (voParam.strScalFeeCls4) {
			util.Control.setValue(app, "cbbScalFeeCls4", voParam.strScalFeeCls4);
		}
		if (voParam.strScalFeeCls5) {
			util.Control.setValue(app, "cbbScalFeeCls5", voParam.strScalFeeCls5);
		}
		if (voParam.strKeyDate) {
			util.DataMap.setValue(app, "dmReqKey", "strKeyDate", voParam.strKeyDate);
		}
		if (voParam.strDeptCd) {
			util.DataMap.setValue(app, "dmReqKey", "strDeptCd", voParam.strDeptCd);
		}
		if (voParam.strDeptObjDivRcd) {
			util.DataMap.setValue(app, "dmReqKey", "strDeptObjDiv", voParam.strDeptObjDivRcd);
		}
		if (voParam.strMngDeptDiv) {
			util.DataMap.setValue(app, "dmReqKey", "strMngDeptDiv", voParam.strMngDeptDiv);
		}
		if (voParam.strWrkScalYn) {
			util.DataMap.setValue(app, "dmReqKey", "strWrkScalYn", voParam.strWrkScalYn);
		}
		if (voParam.strStudReqYn) {
			util.DataMap.setValue(app, "dmReqKey", "strStudReqYn", voParam.strStudReqYn);
		}
		if (voParam.strCntiScalYn) {
			util.DataMap.setValue(app, "dmReqKey", "strCntiScalYn", voParam.strCntiScalYn);
		}
			
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, ["cbbScalFeeCls1", "cbbScalFeeCls2", "cbbScalFeeCls3", "cbbScalFeeCls4", "cbbScalFeeCls5"]);
			}
				
			// 바로 검색 실행
			if ((voParam.strScalFeeCd || voParam.strScalFeeNm)) {
				util.Header.clickSearch(app);
			}
			
		});
	}
		
		
	 /**
	 * doList 조회 
	 * @member stdCssPScalFeePop
	 * @type void
	 * @author AeyoungLee 2016. 2. 29.
	 */
	function doList() {
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "rptScalFee");
				util.Msg.notify(app, "NLS.INF.M024");
			}
			
		});
	};
	
	/**
	 * doCloseOk (선택닫기 이벤트시 호출) 	
	 * @member stdCssPScalFeePop
	 * @type void
	 * @author AeyoungLee 2016. 2. 29.
	 */
	function doCloseOk() {
		if(ValueUtil.isNull(util.Grid.getCheckOrSelectedRowIndex(app, "grdScalFee"))){
			//선택된 데이터가 없습니다.
			ComMsg.warn("M008");
			return false;
		}
		
		var vnIdx = util.Grid.getIndex(app, "grdScalFee");
		
		var voResult = moStdCssPScalFeePop.result;
		
		voResult.SCAL_FEE_CD		= util.Grid.getCellValue(app, "grdScalFee", "SCAL_FEE_CD", vnIdx);
		voResult.ST_DT				= util.Grid.getCellValue(app, "grdScalFee", "ST_DT", vnIdx);
		voResult.END_DT				= util.Grid.getCellValue(app, "grdScalFee", "END_DT", vnIdx);
		voResult.OBJ_DIV_RCD		= util.Grid.getCellValue(app, "grdScalFee", "OBJ_DIV_RCD", vnIdx);
		voResult.REF_KEY			= util.Grid.getCellValue(app, "grdScalFee", "REF_KEY", vnIdx);
		voResult.LAN_DIV_RCD		= util.Grid.getCellValue(app, "grdScalFee", "LAN_DIV_RCD", vnIdx);
		voResult.DEPT_CD			= util.Grid.getCellValue(app, "grdScalFee", "DEPT_CD", vnIdx);
		voResult.DEPT_OBJ_DIV_RCD	= util.Grid.getCellValue(app, "grdScalFee", "DEPT_OBJ_DIV_RCD", vnIdx);
		voResult.DEPT_NM			= util.Grid.getCellValue(app, "grdScalFee", "DEPT_NM", vnIdx);
		voResult.SCAL_FEE_NM		= util.Grid.getCellValue(app, "grdScalFee", "SCAL_FEE_NM", vnIdx);
		voResult.SHORT_NM			= util.Grid.getCellValue(app, "grdScalFee", "SHORT_NM", vnIdx);
		voResult.PRT_SCAL_FEE_NM	= util.Grid.getCellValue(app, "grdScalFee", "PRT_SCAL_FEE_NM", vnIdx);
		voResult.SCAL_FNDTN_CD		= util.Grid.getCellValue(app, "grdScalFee", "SCAL_FNDTN_CD", vnIdx);
		voResult.PMNT_DIV_RCD		= util.Grid.getCellValue(app, "grdScalFee", "PMNT_DIV_RCD", vnIdx);
		voResult.WRK_SCAL_YN		= util.Grid.getCellValue(app, "grdScalFee", "WRK_SCAL_YN", vnIdx);
		voResult.DUP_PMNT_YN		= util.Grid.getCellValue(app, "grdScalFee", "DUP_PMNT_YN", vnIdx);
		voResult.MNG_DEPT_DIV_RCD	= util.Grid.getCellValue(app, "grdScalFee", "MNG_DEPT_DIV_RCD", vnIdx);
		voResult.STUD_REQ_YN		= util.Grid.getCellValue(app, "grdScalFee", "STUD_REQ_YN", vnIdx);
		voResult.CNTI_SCAL_YN		= util.Grid.getCellValue(app, "grdScalFee", "CNTI_SCAL_YN", vnIdx);
		voResult.PMNT_CNT			= util.Grid.getCellValue(app, "grdScalFee", "PMNT_CNT", vnIdx);
		voResult.PMNT_ITV_RCD		= util.Grid.getCellValue(app, "grdScalFee", "PMNT_ITV_RCD", vnIdx);
		voResult.PRT_ORD			= util.Grid.getCellValue(app, "grdScalFee", "PRT_ORD", vnIdx);
		voResult.SCAL_FEE_CLS1_RCD	= util.Grid.getCellValue(app, "grdScalFee", "SCAL_FEE_CLS1_RCD", vnIdx);
		voResult.SCAL_FEE_CLS2_RCD	= util.Grid.getCellValue(app, "grdScalFee", "SCAL_FEE_CLS2_RCD", vnIdx);
		voResult.SCAL_FEE_CLS3_RCD	= util.Grid.getCellValue(app, "grdScalFee", "SCAL_FEE_CLS3_RCD", vnIdx);
		voResult.SCAL_FEE_CLS4_RCD	= util.Grid.getCellValue(app, "grdScalFee", "SCAL_FEE_CLS4_RCD", vnIdx);
		voResult.SCAL_FEE_CLS5_RCD	= util.Grid.getCellValue(app, "grdScalFee", "SCAL_FEE_CLS5_RCD", vnIdx);
		voResult.DESC1				= util.Grid.getCellValue(app, "grdScalFee", "DESC1", vnIdx);
		voResult.DESC2				= util.Grid.getCellValue(app, "grdScalFee", "DESC2", vnIdx);
		voResult.DESC3				= util.Grid.getCellValue(app, "grdScalFee", "DESC3", vnIdx);
		voResult.DESC4				= util.Grid.getCellValue(app, "grdScalFee", "DESC4", vnIdx);
		voResult.DESC5				= util.Grid.getCellValue(app, "grdScalFee", "DESC5", vnIdx);
		
		if(ExtPopUp.isPopUp()){
			ExtPopUp.closeLayeredPopup("callbackStdCssPScalFeePop", moStdCssPScalFeePop);
		}				
	}

	return moPage;
};
