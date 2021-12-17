//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./stdCcsCOpenSubFrf.xtm"/>

/**
 * 개설과목관리
 * @class stdCcsCCurClsFrf
 * @author 박갑수 at 2016. 2. 4
 */
var stdCcsCOpenSubFrf = function() {
	var moPage = new Page();
	
	// 임포트용 데이터 통신 오브젝트
	var moPObject = new Page();
	
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
		iKeyDate			:	"/root/keyDateMap/ST_DT",
		iKeyEndDate		:	"",
		oObjDivRcd		:	"/root/reqKey/strSaObjDivRcd",
		oCd					:	"/root/reqKey/strSaCd",
		oCdNm				:	"ipbSaNm",
		oBegDt				:	"",
		oEndDt				:	"",
		oLanDivRcd		:	"",
		func 					:  function(poRtnValue){
			// 검색조건이 있을경우 조회
			var vsSchYearRcd = util.Control.getValue(app, "cbbSchYearRcd");
			var vsSmtRcd = util.Control.getValue(app, "cbbSmtRcd");
			var vsSaNm = util.DataMap.getValue(app, "dmReqKey", "strSaNm");
			if(!ValueUtil.isNull(vsSaNm)){
				// 학사부서 입력시 이수과정목록, 교과그룹목록 GET
				doCuList(function(pbSuccess) {
					if (pbSuccess){
						// 조회조건 필수값 입력되었을경우 바로조회
						if(!ValueUtil.isNull(vsSchYearRcd) && !ValueUtil.isNull(vsSmtRcd)){
							// ExtModel.dispatch("btnSearch", "DOMActivate");
						}
					}
				});
			}else {
				// 값 초기화
				util.Control.setValue(app, "cbbCuCd", "");
			}
		}
	}];
	
	// 개설과목검색팝업 호출
	moIdsForStdCcsPOpenSubPopup = [
	{ 
		 controlId					: "btnSbCd",			
		 iDivClsYn					: "",		
		 iLanDivRcd				: "/root/resOnLoad/strLanDivRcd",
		 iKeyDate             		: "/root/keyDateMap/ST_DT",
		 iSchYearRcd             : "cbbSchYearRcd",
		 iSmtRcd             		: "cbbSmtRcd",
		 iSaCd        				: "/root/reqKey/strSaCd",			
		 iSaNm        				: "ipbSaNm",		
		 iSaObjDivRcd       		: "/root/reqKey/strSaObjDivRcd",		
		 iSbCd        				: "ipbSbNm",			
		 iSbNm        				: "",		
		 iCmpDivRcd        		: "",			
		 
		 oSpCd						: "",			
		 oSpNm					: "",			
		 oSbCd						: "/root/reqKey/strSbCd",			
		 oSbNm					: "ipbSbNm",			
		 oSaCd						: "",			
		 oSaNm					: "",			
		 oCuCd						: "",		
		 oCuNm					: "",		
		 oSchYearRcd			: "",		
		 oSmtRcd					: "",	
		 oDivclsCd					: "",	
		 oDivclsNm				: "",	
		 oCmpDivRcd				: "",		
		 oPnt							: "",		
		 oTheoTc					: "",	
		 oEpacTc					: "",	
		 oSbDivRcd				: "",		
		 oSbTypeRcd				: "",		
		 oSaPostDivRcd			: "",		
		 oProfNo					: "",	
		 oProfNm					: "",			
		 oLectRoomNm			: "",		
		 oRefKey					: "",		
		 func : function(poParam) { 
			// 검색조건이 있을경우 조회
			var vsSchYearRcd = util.Control.getValue(app, "cbbSchYearRcd");
			var vsSmtRcd = util.Control.getValue(app, "cbbSmtRcd");
			var vsSaNm = util.DataMap.getValue(app, "dmReqKey", "strSaNm");
			var vsSbNm = util.DataMap.getValue(app, "dmReqKey", "strSbNm");
			if(!ValueUtil.isNull(vsSchYearRcd) && !ValueUtil.isNull(vsSmtRcd) && !ValueUtil.isNull(vsSaNm) && !ValueUtil.isNull(vsSbNm)){
				util.Header.clickSearch(app);
			}
		 }
	 }
	 ,
	 { 
		 controlId					: "btnFrfSbCd",			
		 iDivClsYn					: "Y",		
		 iLanDivRcd				: "/root/resOnLoad/strLanDivRcd",
		 iKeyDate             		: "/root/keyDateMap/ST_DT",
		 iSchYearRcd             : "cbbSchYearRcd",
		 iSmtRcd             		: "/root/reqKey/strParamSmtRcd",
		 iSaCd        				: "",			
		 iSaNm        				: "",		
		 iSaObjDivRcd       		: "",		
		 iSbCd        				: "",			
		 iSbNm        				: "ipbFrfSbNm",		
		 iCmpDivRcd        		: "",			
		 
		 oSpCd						: "",			
		 oSpNm					: "",			
		 oSbCd						: "ipbFrfSbCd",			
		 oSbNm					: "ipbFrfSbNm",			
		 oSaCd						: "",			
		 oSaNm					: "",			
		 oCuCd						: "",		
		 oCuNm					: "",		
		 oSchYearRcd			: "",		
		 oSmtRcd					: "",	
		 oDivclsCd					: "ipbFrfDivclsCd",	
		 oDivclsNm				: "ipbFrfDivclsNm",	
		 oCmpDivRcd				: "cbbFrfCmpDivRcd",		
		 oPnt							: "ipbFrfPnt",		
		 oTheoTc					: "ipbFrfTheoTc",	
		 oEpacTc					: "ipbFrfEpacTc",	
		 oSbDivRcd				: "cbbFrfSbDivRcd",		
		 oSbLvlRcd                : "cbbFrfSblvlRcd",
		 oSbCatRcd				: "cbbFrfSbCatRcd",
		 oLectTypeRcd  		: "cbbFrfLectTypeRcd",
		 oRecScaleRcd			: "cbbFrfRecScaleRcd",
		 oSbTypeRcd				: "",		
		 oSaPostDivRcd			: "",		
		 oProfNo					: "",	
		 oProfNm					: "",			
		 oLectRoomNm			: "",		
		 oRefKey					: "",		
		 func : function(poParam) { 
		 
			if(!ValueUtil.isNull(poParam.Result.SB_CD)){
				
				var vnIdx = poParam.rptRowIdx;
				
				
				var vsSmtRcd = util.Control.getValue(app, "cbbSmtRcd");
				var vnLecTimeCnt = 0;
				if("CA00391" == vsSmtRcd || "CA00393" == vsSmtRcd){
					
					vnLecTimeCnt = ((ValueUtil.fixNumber(poParam.Result.THEO_TC) + ValueUtil.fixNumber(poParam.Result.EPAC_TC)) * 15) /2;
				}
				
				
				util.FreeForm.setValue(app, "frfCcsOpenSub", "PNT",poParam.Result.PNT, false, true);
				util.Grid.setCellValue(app, "grdCcsOpenSub", "PNT", poParam.Result.PNT, vnIdx);
				
				util.FreeForm.setValue(app, "frfCcsOpenSub", "THEO_TC", poParam.Result.THEO_TC, false, true);
				util.Grid.setCellValue(app, "grdCcsOpenSub", "THEO_TC", poParam.Result.THEO_TC, vnIdx);
				
				util.FreeForm.setValue(app, "frfCcsOpenSub", "EPAC_TC", poParam.Result.EPAC_TC, false, true);
				util.Grid.setCellValue(app, "grdCcsOpenSub", "EPAC_TC", poParam.Result.EPAC_TC, vnIdx);
				
				util.FreeForm.setValue(app, "frfCcsOpenSub", "LECT_TIME_CNT", vnLecTimeCnt, false, true);
				util.Grid.setCellValue(app, "grdCcsOpenSub", "LECT_TIME_CNT", vnLecTimeCnt, vnIdx);
				
				util.FreeForm.setValue(app, "frfCcsOpenSub", "CMP_DIV_RCD", poParam.Result.CMP_DIV_RCD, false, true);
				util.Grid.setCellValue(app, "grdCcsOpenSub", "CMP_DIV_RCD", poParam.Result.CMP_DIV_RCD, vnIdx);
				
				util.FreeForm.setValue(app, "frfCcsOpenSub", "CU_OBJ_DIV_RCD", "CC009CU", false, true);
				util.Grid.setCellValue(app, "grdCcsOpenSub", "CU_OBJ_DIV_RCD", "CC009CU", vnIdx);
				
				util.FreeForm.setValue(app, "frfCcsOpenSub", "SB_OBJ_DIV_RCD", "CC009SB", false, true);
				util.Grid.setCellValue(app, "grdCcsOpenSub", "SB_OBJ_DIV_RCD", "CC009SB", vnIdx);
				
				util.FreeForm.setValue(app, "frfCcsOpenSub", "SA_OBJ_DIV_RCD", "CC009SA", false, true);
				util.Grid.setCellValue(app, "grdCcsOpenSub", "SA_OBJ_DIV_RCD", "CC009SA", vnIdx);
					
				
				util.FreeForm.setValue(app, "frfCcsOpenSub", "TLSN_REQ_CAPA1", "45", false, true);
				util.Grid.setCellValue(app, "grdCcsOpenSub", "TLSN_REQ_CAPA1", "45", vnIdx);
				
				util.FreeForm.setValue(app, "frfCcsOpenSub", "TLSN_REQ_CAPA2", "0", false, true);
				util.Grid.setCellValue(app, "grdCcsOpenSub", "TLSN_REQ_CAPA2", "0", vnIdx);
				
				util.FreeForm.setValue(app, "frfCcsOpenSub", "TLSN_REQ_CAPA3", "0", false, true);
				util.Grid.setCellValue(app, "grdCcsOpenSub", "TLSN_REQ_CAPA3", "0", vnIdx);
				
				util.FreeForm.setValue(app, "frfCcsOpenSub", "TLSN_REQ_CAPA4", "0", false, true);
				util.Grid.setCellValue(app, "grdCcsOpenSub", "TLSN_REQ_CAPA4", "0", vnIdx);
			}
			
		 }
	 }
	 ];
	
	// 교과과정검색팝업 호출
	 moIdsForStdCcsPCurriPopup = [
	{
		 controlId					: "btnFrfSbCd",	
		 iSaSearchUse			: false,
		 iObjDivRcd				: "",
		 iKeyDate					: "/root/keyDateMap/ST_DT",	
		 iSaCd						: "/root/reqKey/strSaCd",	
		 iSaNm						: "/root/reqKey/strSaNm",
		 iSpCd						: "",
		 iSbCd						: "",
		 iSbNm						: "ipbFrfSbNm",
		 iCmpDivRcd				: "",	
		 iCuCd						: "", 
		 oStDt						: "",
		 oEndDt						: "",	
		 oCuCd						: "",
		 oCuObjDivRcd			: "",	
		 oSbCd						: "ipbFrfSbCd",	
		 oSbNm					: "ipbFrfSbNm",	
		 oSbObjDivRcd			: "ipbFrfSbObjDIvRcd",	
		 oSaCd						: "",
		 oSaNm					: "",
		 oSaObjDivRcd			: "",
		 oSpCd						: "cbbFrfSpCd",
		 oSpObjDivRcd			: "ipbFrfSpObjDivRcd",	
		 oDclRcdCd				: "ipbFrfDclRcd",
		 oDclRcdNm				: "ipbFrfDclRcdNm",
		 oSbLvlRcd				: "cbbFrfSblvlRcd",
		 oEstPrdRcd				: "",
		 oEstPrdNm				: "",	
		 oEvalMethodRcd		: "cbbFrfEvalMethodRcd",	
		 oLectTypeRcd			: "cbbFrfLectTypeRcd",	
		 oSbCatRcd				: "cbbFrfSbCatRcd",
		 oSbDivRcd				: "cbbFrfSbDivRcd",	
		 oSbTypeRcd				: "cbbFrfSbTypeRcd",
		 oCmpDivRcd				: "/root/resPopup/strFrfCmpDivRcd",
		 oCurDivRcd				: "",
		 oRecScaleRcd			: "cbbFrfRecScaleRcd",
		 oDayDivclsCnt			: "",
		 oNightDivclsCnt			: "",
		 oLectTimeCnt			: "/root/resPopup/strFrfLectTimeCnt",	
		 oPnt							: "/root/resPopup/strFrfPnt",	
		 oTheoTc					: "/root/resPopup/strFrfTheoTc",	
		 oEpacTc					: "/root/resPopup/strFrfEpacTc",
		 oTlsnReqCapa1		: "/root/resPopup/strTlsnReqCapa1",
		 oTlsnReqCapa2		: "/root/resPopup/strTlsnReqCapa2",
		 oTlsnReqCapa3		: "/root/resPopup/strTlsnReqCapa3",
		 oTlsnReqCapa4		: "/root/resPopup/strTlsnReqCapa4",
		 oReTlsnYnRcd			: "cbbFrfReTlsnYnRcd",
		 oMandSbYn				: "",
		 oLectEvalXcpYn		: "ckbFrfLectEvalXcpYn",	
		 oLectEvalSumXcpYn	: "ckbFrfLectEvalSumXcpYn",
		 oPntInstchYn			: "",
		 oRefKey					: "",	
		 oCuCdNm				: "",	
		 func : function(poParam) {
			 // 이수구분 임시 인스턴스값으로 받아 프리폼에 세팅 : 팝업값 세팅시 이수구분의 ValueChange 이벤트로인해 리피터에 해당값이 반영 안됨.
			 var vnIdx = util.Grid.getIndex(app, "grdCcsOpenSub");
			 
			var vsCmpDivRcd = util.DataMap.getValue(app, "dmResPopup", "strFrfCmpDivRcd");
			util.FreeForm.setValue(app, "frfCcsOpenSub", "CMP_DIV_RCD", vsCmpDivRcd, false, true);
			util.Grid.setCellValue(app, "grdCcsOpenSub", "CMP_DIV_RCD", vsCmpDivRcd, vnIdx);
					
			// 교직전공[CA20121]. 교직교양[CA20122]
			if(ValueUtil.fixNull(vsCmpDivRcd) == "CA20121" || ValueUtil.fixNull(vsCmpDivRcd) == "CA20122"){
				
				// 평가방법 : 절대평가[CA21001]
				util.FreeForm.setValue(app, "frfCcsOpenSub", "EVAL_METHOD_RCD", "CA21001");
				util.Grid.setCellValue(app, "grdCcsOpenSub", "EVAL_METHOD_RCD", "CA21001", vnIdx);
				util.FreeForm.setValue(app, "frfCcsOpenSub", "REL_EST_TYPE_RCD", "");
				util.Grid.setCellValue(app, "grdCcsOpenSub", "REL_EST_TYPE_RCD", "", vnIdx);
				
				util.Control.setEnable(app, false, ["cbbFrfRelEstTypeRcd"]);
			}else {
				
				// 평가방법 : 상대평가[CA21002], 상대평가유형 : 상대평가[CD20901]
				util.FreeForm.setValue(app, "frfCcsOpenSub", "EVAL_METHOD_RCD", "CA21002");
				util.Grid.setCellValue(app, "grdCcsOpenSub", "EVAL_METHOD_RCD", "CA21002", vnIdx);
				util.FreeForm.setValue(app, "frfCcsOpenSub", "REL_EST_TYPE_RCD", "CD20901");
				util.Grid.setCellValue(app, "grdCcsOpenSub", "REL_EST_TYPE_RCD", "CD20901", vnIdx);
				
				util.Control.setEnable(app, true, ["cbbFrfRelEstTypeRcd"]);
			}
			
			util.FreeForm.setValue(app, "frfCcsOpenSub", "PNT", util.DataMap.getValue(app, "dmResPopup", "strFrfPnt"), false, true);
			util.Grid.setCellValue(app, "grdCcsOpenSub", "PNT", util.DataMap.getValue(app, "dmResPopup", "strFrfPnt"), vnIdx);
			
			util.FreeForm.setValue(app, "frfCcsOpenSub", "THEO_TC", util.DataMap.getValue(app, "dmResPopup", "strFrfTheoTc"), false, true);
			util.Grid.setCellValue(app, "grdCcsOpenSub", "THEO_TC", util.DataMap.getValue(app, "dmResPopup", "strFrfTheoTc"), vnIdx);
			
			util.FreeForm.setValue(app, "frfCcsOpenSub", "EPAC_TC", util.DataMap.getValue(app, "dmResPopup", "strFrfEpacTc"), false, true);
			util.Grid.setCellValue(app, "grdCcsOpenSub", "EPAC_TC", util.DataMap.getValue(app, "dmResPopup", "strFrfEpacTc"), vnIdx);
			
			util.FreeForm.setValue(app, "frfCcsOpenSub", "LECT_TIME_CNT", util.DataMap.getValue(app, "dmResPopup", "strFrfLectTimeCnt"), false, true);
			util.Grid.setCellValue(app, "grdCcsOpenSub", "LECT_TIME_CNT", util.DataMap.getValue(app, "dmResPopup", "strFrfLectTimeCnt"), vnIdx);
			
			util.FreeForm.setValue(app, "frfCcsOpenSub", "TLSN_REQ_CAPA1", util.DataMap.getValue(app, "dmResPopup", "strTlsnReqCapa1"), false, true);
			util.Grid.setCellValue(app, "grdCcsOpenSub", "TLSN_REQ_CAPA1", util.DataMap.getValue(app, "dmResPopup", "strTlsnReqCapa1"), vnIdx);
			
			util.FreeForm.setValue(app, "frfCcsOpenSub", "TLSN_REQ_CAPA2", "0", false, true);
			util.Grid.setCellValue(app, "grdCcsOpenSub", "TLSN_REQ_CAPA2", "0", vnIdx);
			
			util.FreeForm.setValue(app, "frfCcsOpenSub", "TLSN_REQ_CAPA3", "0", false, true);
			util.Grid.setCellValue(app, "grdCcsOpenSub", "TLSN_REQ_CAPA3", "0", vnIdx);
			
			util.FreeForm.setValue(app, "frfCcsOpenSub", "TLSN_REQ_CAPA4", "0", false, true);
			util.Grid.setCellValue(app, "grdCcsOpenSub", "TLSN_REQ_CAPA4", "0", vnIdx);
			
			util.FreeForm.setValue(app, "frfCcsOpenSub", "CU_OBJ_DIV_RCD", "CC009CU");
			util.Grid.setCellValue(app, "grdCcsOpenSub", "CU_OBJ_DIV_RCD", "CC009CU", vnIdx);
			
			
		 }
	 }];
	 
	 // 학문분야검색
	moPObject.moIdsForStdCcsPDclExtendPopup = [
	{
		controlId 			: "btnFrfDclRcd",
		iLanDivRcd 		: "",
		iRefKey 			: "ipbFrfRefKey",				
		iCmpDivRcd 		: "cbbFrfCmpDivRcd",
		iDclRcdCd 		: "ipbFrfDclRcd",
		iDclRcdNm 		: "ipbFrfDclRcdNm",					
		iReadOnlyYn 		: "",
		iStdDclRcdYn 	: "",							//학문분야 표준임포트 사용여부
		oOutDclRcdNm 	: "ipbFrfDclRcdNm",	//학문분야 이름
		oOutDclRcdCd 	: "ipbFrfDclRcd",			//학문분야 배열코드															
		func : function(poParam) {
			var vsDclRcd = util.FreeForm.getValue(app, "frfCcsOpenSub", "DCL_RCD_CD");
			
			var vnIdx = util.Grid.getIndex(app, "grdCcsOpenSub");
			
			if(ValueUtil.fixNull(vsDclRcd).indexOf("CA21240") != -1){
				
				// 평가방법 : 절대평가[CA21001]
				util.FreeForm.setValue(app, "frfCcsOpenSub", "EVAL_METHOD_RCD", "CA21001");
				util.Grid.setCellValue(app, "grdCcsOpenSub", "EVAL_METHOD_RCD", "CA21001", vnIdx);
				util.FreeForm.setValue(app, "frfCcsOpenSub", "REL_EST_TYPE_RCD", "");
				util.Grid.setCellValue(app, "grdCcsOpenSub", "REL_EST_TYPE_RCD", "", vnIdx);
				
				util.Control.setEnable(app, false, ["cbbFrfRelEstTypeRcd"]);
			}else {
				
				// 평가방법 : 상대평가[CA21002], 상대평가유형 : 상대평가[CD20901]
				util.FreeForm.setValue(app, "frfCcsOpenSub", "EVAL_METHOD_RCD", "CA21002");
				util.Grid.setCellValue(app, "grdCcsOpenSub", "EVAL_METHOD_RCD", "CA21002", vnIdx);
				util.FreeForm.setValue(app, "frfCcsOpenSub", "REL_EST_TYPE_RCD", "CD20901");
				util.Grid.setCellValue(app, "grdCcsOpenSub", "REL_EST_TYPE_RCD", "CD20901", vnIdx);
				
				util.Control.setEnable(app, true, ["cbbFrfRelEstTypeRcd"]);
			}
		}
	}];
	
	// 학년도 학기를 원래데이터로 되돌리기위한 변수
	var msSchYearRcd = "";
	var msSmtRcd = "";
	
	/**
	 * @desc import 헤더 초기화
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 2. 4
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		// import 헤더 초기화
		doHeaderOnLoad();
	};
	
	/**
	 * @desc onLoad 실행
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 4
	 */
	moPage.onModelConstructDone_StdCcsCOpenSubFrf = function() {
		// 리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["rptCcsOpenSub"]);
		// 검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grpData"]);
		
		// 서브미션 호출
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				
				util.Control.redraw(app, ["cbbSchYearRcd", "cbbSmtRcd", "cbbSbLvlRcd", "cbbCmpDivRcd", "cbbCuCd"]);
				// 학년도 학기값 되돌리기위한 값
				msSchYearRcd = util.DataMap.getValue(app, "dmKeyDateMap", "YEAR");
				msSmtRcd = util.DataMap.getValue(app, "dmKeyDateMap", "SMT");
				
				util.Control.setFocus(app, "ipbSaNm");
			}
		}, true);
	};
	
	/**
	 * @desc [btnSaCd]학사부서명(돋보기버튼) onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 4
	 */
	moPage.onClick_BtnSaCd = function(sender) {
		// 객체검색팝업 호출
		doOnClickStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc [ipbSaNm]학사부서명 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 4
	 */
	moPage.onValueChanged_IpbSaNm = function(sender) {
		// 리피트 변경사항 체크
		if(util.Grid.isModified(app, ["grdCcsOpenSub"])){
			return false;
		}
		
		// 값변경시 객체검색팝업 호출
		doOnChangeStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc [btnSaCd]교과목명(돋보기버튼) onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 4
	 */
	moPage.onClick_BtnSbCd = function(sender) {
		// 개설과목검색팝업 호출
		doOnClickStdCcsPOpenSubPopup(sender);
	};
	
	/**
	 * @desc [ipbSbNm]교과목명 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 4
	 */
	moPage.onValueChanged_IpbSbNm = function(sender) {
		// 리피트 변경사항 체크
		if(util.Grid.isModified(app, ["grdCcsOpenSub"])){
			return false;
		}
		
		// 값변경시 교과목검색팝업 호출
		doOnChangeStdCcsPOpenSubPopup(sender);
	};
	
	/**
	 * @desc [cbbSchYearRcd]학년도 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 4
	 */
	moPage.onValueChanged_CbbSchYearRcd = function() {
		// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
		doChangeYearSmt("year");
	};
	
	/**
	 * @desc [cbbSmtRcd]학기 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 4
	 */
	moPage.onValueChanged_CbbSmtRcd = function() {
		// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
		doChangeYearSmt("smt");
	};
	
	/**
	 * @desc 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 5
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
	 * @desc [btnSearch]조회 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 11
	 */
	moPage.onClick_BtnSearch = function() {
		 // 작업영역 리피트 변경 내역 체크
		if(util.Grid.isModified(app, "", "CRM")){
			return false;
		}
		
		// 조회조건 필수 체크
		if(!util.validate(app, ["cbbSchYearRcd", "cbbSmtRcd", "ipbSaNm"])){
			return false;
		}

		// 조회
		doList(function(pbSuccess) {
			if (pbSuccess){
				// 조회 : "조회되었습니다." header 메세지 표시
				util.Msg.notify(app, "NLS.INF.M024");
			}
		});
	};
	
	/**
	 * @desc 개설과목목록 조회
	 * @param poCallBackFunc 콜백정의
	 * @return void
	 * @author 박갑수 at 2016. 2. 11
	 */
	function doList(poCallBackFunc) {			
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				
				/*
					계절학기 이면 정규학기로 설정을 한다.
				*/
				var vsSmtRcd = util.Control.getValue(app, "cbbSmtRcd");
				if( "CA00391" == vsSmtRcd){
					util.DataMap.setValue(app, "dmReqKey", "strParamSmtRcd", "CA00390");
				}else if("CA00393" == vsSmtRcd){
					util.DataMap.setValue(app, "dmReqKey", "strParamSmtRcd", "CA00392");
				}
				
				ExtTreeView.rebuild(["rptCcsOpenSub"]);
				
				if(util.Grid.getRowCount(app, "grdCcsOpenSub") == 0){
					// 마스터 리피트 상태에 따른 디테일 프리폼 비활성화 제어
					doCompareFrfEnable();
				}
					
				// 조회 후 콜백함수 수행
				if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
			}
		});
	};
	
	/**
	 * @desc [rptCcsOpenSub]개설과목목록 onRowSelect 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 11
	 */
	moPage.onRowSelect_RptCcsOpenSub = function() {
		// 리피트 현재 index get
		var vnIndex = util.Grid.getIndex(app, "grdCcsOpenSub");
		// 리피트 특정 row 데이터를 프리폼 copy
//TO-BE: <ExtRepeat.copyRowForm> 그리드-프리폼인 경우에는 selection바인딩으로 처리하기 때문에 불필요함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.copyRowForm("rptCcsOpenSub", "frfCcsOpenSub", vnIndex);
		// 프리폼 비활성화 제어
		doCompareFrfEnable();
		var vsCuCd = util.FreeForm.getValue(app, "frfCcsOpenSub", "CU_CD");
		//--교과그룹을 필터링한다. 이수구분 -> 학사부서코드로 필터링한다.
		 page.onValueChanged_CbbFrfSpCd();
		if("" != vsCuCd){
			 util.FreeForm.setValue(app, "frfCcsOpenSub", "CU_CD", vsCuCd, false, true);
		}
		
	};
	
	/**
	 * @desc  마스터 리피트 상태에 따른 디테일 프리폼 비활성화 제어
	 *			    1. index가 지정되지 않았을 경우
	 *			    2. 현재 index의 로우가 삭제 상태일 경우 
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 11
	 */
	function doCompareFrfEnable() {
		// 신규시 제어 컬럼
		var vaEnableCtl = ["cbbFrfCmpDivRcd", "ipbFrfSbNm", "btnFrfSbCd", "ipbFrfDivclsCd", "cbbFrfCuCd"];
		
		// 마스터 로우 없을경우 프리폼 리셋
		if(!util.Grid.getIndex(app, "grdCcsOpenSub")){
			util.Control.reset(app, "frfCcsOpenSub");
		}
		
		if( (!util.Grid.getIndex(app, "grdCcsOpenSub")) 
			|| util.Grid.getRowState(app, "grdCcsOpenSub") == cpr.data.tabledata.RowState.DELETED) {
				
			util.Control.setEnable(app, false, ["frfCcsOpenSub"]);	
			
		} else {
			util.Control.setEnable(app, true, ["frfCcsOpenSub"]);	
			
			// 신규 상태에따른 프리폼항목 제어
			if(util.Grid.getRowState(app, "grdCcsOpenSub") == cpr.data.tabledata.RowState.INSERTED){
				util.Control.setEnable(app, true, vaEnableCtl);	
			}else {
				util.Control.setEnable(app, false, vaEnableCtl);	
			}
		}
		
		// 평가방법코드 : 상대평가[CA21002]
		var vsEvalMethodRcd = util.Grid.getCellValue(app, "grdCcsOpenSub", "EVAL_METHOD_RCD");
		// 상대평가일경우만 상대평가유형 활성화
		if(ValueUtil.fixNull(vsEvalMethodRcd) == "CA21002"){
			util.Control.setEnable(app, true, ["cbbFrfRelEstTypeRcd"]);
		}else {
			util.Control.setEnable(app, false, ["cbbFrfRelEstTypeRcd"]);
		}
	};
	
	/**
	 * @desc [frfCcsOpenSub]개설과목 상세내역 onUpdate 이벤트
	 * @param pbStatus Boolean
	 * @return  
	 * @author 박갑수 at 2016. 2. 11
	 */
	moPage.onUpdate_FrfCcsOpenSub = function() {
		// 프리폼 업데이트내용 그리드 반영
//TO-BE: <ExtFreeForm.updateToRpt> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtFreeForm.updateToRpt("rptCcsOpenSub", "frfCcsOpenSub");
	};
	
	/**
	 * @desc [btnCopy]개설복사 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 11
	 */
	moPage.onClick_BtnCopy = function() {
		var vnOrgRowIdx = util.Grid.getIndex(app, "grdCcsOpenSub");
		// 마스터 리피트 row 선택여부 체크
		if(vnOrgRowIdx == "0"){
			
			var vsMsgParam = util.Grid.getTitle(app, "grdCcsOpenSubCcsOpenSub");
			// "@(을)를 선택해주세요" 메시지 출력
			util.Msg.alert("NLS-INF-M045", [vsMsgParam]);
			return;
		}
		
		var voNextRow   = util.Grid.insertRow(app, "grdCcsOpenSub");
		
		// 값 복사
		ExtRepeat.copyToRowData("rptCcsOpenSub", vnOrgRowIdx, "rptCcsOpenSub", voNextRow);
		
		// 값복사후 Row의 내용 프리폼 반영을위해
		util.Grid.selectRow(app, "grdCcsOpenSub", voNextRow);
		
		util.Grid.setCellValue(app, "grdCcsOpenSub", "UPT_STATUS", "N", voNextRow);
		
		// 기본값 세팅
		// 분반명 : 초기화
		util.FreeForm.setValue(app, "frfCcsOpenSub", "DIVCLS_CD", "");
		
		// 분반코드 : 초기화
		util.FreeForm.setValue(app, "frfCcsOpenSub", "DIVCLS_NM", "");
		
		// 참조키 : 초기화
		util.Grid.setCellValue(app, "grdCcsOpenSub", "REF_KEY", "", voNextRow);
	};
	
	/**
	 * @desc [btnNew]신규 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 11
	 */
	moPage.onClick_BtnNew = function() {
		// 신규로우 추가
		var vnIdx = util.Grid.insertRow(app, "grdCcsOpenSub");
		
		// 신규 Defalut값 설정
		// 학년도 : 조회조건 학년도
		var vsSchYearRcd = util.DataMap.getValue(app, "dmKeyDateMap", "YEAR");
		util.Grid.setCellValue(app, "grdCcsOpenSub", "SCH_YEAR_RCD", vsSchYearRcd, vnIdx);
		
		// 학기 : 조회조건 학기
		var vsSmtRcd = util.DataMap.getValue(app, "dmKeyDateMap", "SMT");
		util.Grid.setCellValue(app, "grdCcsOpenSub", "SMT_RCD", vsSmtRcd, vnIdx);
		
		// 학사부서 코드 : 조회조건 학사부서코드
		var vsSaCd = util.DataMap.getValue(app, "dmReqKey", "strSaCd");
		util.Grid.setCellValue(app, "grdCcsOpenSub", "SA_CD", vsSaCd, vnIdx);
		util.FreeForm.setValue(app, "frfCcsOpenSub", "SA_CD", vsSaCd);
		
		// 학사부서명 : 조회조건 학사부서명
		var vsSaNm = util.DataMap.getValue(app, "dmReqKey", "strSaNm");
		util.FreeForm.setValue(app, "frfCcsOpenSub", "SA_CD_NM", vsSaNm);
		
		// 학사부서 객체구분코드 : 조회조건 학사부서 객체구분코드
		var vsSaObjDivRcd = util.DataMap.getValue(app, "dmReqKey", "strSaObjDivRcd");
		util.Grid.setCellValue(app, "grdCcsOpenSub", "SA_OBJ_DIV_RCD", vsSaObjDivRcd, vnIdx);
	
		// 교과그룹 : 조회조건 교과그룹
		var vsCuCd = util.Control.getValue(app, "cbbCuCd");
		util.FreeForm.setValue(app, "frfCcsOpenSub", "CU_CD", vsCuCd);
		
		// 평가방법 : 상대평가[CA21002]
		var vsEvalMethodRcd = "CA21002";
		util.FreeForm.setValue(app, "frfCcsOpenSub", "EVAL_METHOD_RCD", vsEvalMethodRcd);
		
		// 상대평가유형 : 상대평가[CD20901]
		var vsRelEstTypeRcd = "CD20901";
		util.FreeForm.setValue(app, "frfCcsOpenSub", "REL_EST_TYPE_RCD", vsRelEstTypeRcd);
		
		// 언어키 : 시스템 Locale
		util.Grid.setCellValue(app, "grdCcsOpenSub", "LAN_DIV_RCD", msSystemLocale, vnIdx);
		
		// 수강신청정원1 : 0
		// ExtFreeForm.setValue("frfCcsOpenSub", "TLSN_REQ_CAPA1", "0");
		
		//--교과그룹을 필터링한다. 이수구분 -> 학사부서코드로 필터링한다.
		page.onValueChanged_CbbFrfSpCd();
	};
	
	/**
	 * @desc [btnDel]삭제 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 11
	 */
	moPage.onClick_BtnDel = function() {
		// 참조키
		var vsRefKey = util.Grid.getCellValue(app, "grdCcsOpenSub", "REF_KEY");
		util.DataMap.setValue(app, "dmReqKey", "strRefKey", vsRefKey);
	
		if(!ValueUtil.isNull(vsRefKey)){
			//strCommand: delChk 
			util.Submit.send(app, "subDelChk", function(pbSuccess){
				if(pbSuccess){
					var vsFullNm = "";
					var vbCheck = true;
					
					// 강의시간표 데이터 존재 여부 
					var vsTimeSche = util.DataMap.getValue(app, "dmResDelChk", "strTimeSche");
					if(ValueUtil.fixNull(vsTimeSche) == "Y"){
						if(ValueUtil.isNull(vsFullNm)){
							vsFullNm = NLS.CCS.TIMESCHE;
						}else {
							vsFullNm = vsFullNm + "," + NLS.CCS.TIMESCHE;
						}
						
						vbCheck = false;
					}
					
					// 강의계획서 데이터 존재 여부
					var vsLectSche = util.DataMap.getValue(app, "dmResDelChk", "strLectSche");
					if(ValueUtil.fixNull(vsLectSche) == "Y"){
						if(ValueUtil.isNull(vsFullNm)){
							vsFullNm = NLS.CCS.LECTSCHE;
						}else {
							vsFullNm = vsFullNm + "," + NLS.CCS.LECTSCHE;
						}
						
						vbCheck = false;
					}
					
					// 휴보강 데이터 존재 여부
					var vsRestApp = util.DataMap.getValue(app, "dmResDelChk", "strRestApp");
					if(ValueUtil.fixNull(vsRestApp) == "Y"){
						if(ValueUtil.isNull(vsFullNm)){
							vsFullNm = NLS.CCS.RESTAPP;
						}else {
							vsFullNm = vsFullNm + "," + NLS.CCS.RESTAPP;
						}
						
						vbCheck = false;
					}
					
					if(!vbCheck){
						if(util.Msg.confirm("NLS-CRM-M074", [vsFullNm])   ){
							util.Grid.deleteRow(app, "grdCcsOpenSub");
						}else {
							return false;
						}
					}else {
						// 삭제
						util.Grid.deleteRow(app, "grdCcsOpenSub");
						
						/*
							신규 상태로만 존재할경우
							[삭제]버튼 클릭 시 리피터에 데어터가 없어진다. 그러므로
							프리폼에 잔여가 남아 초기화 하는 작업이 필요하다.
						*/
						var vnCcsOpenRpt = util.Grid.getRowCount(app, "grdCcsOpenSub");
						if(vnCcsOpenRpt < 1){
							util.Control.reset(app, "rptCcsOpenSub");
						}
						
					}
					
					// 마스터 리피트 상태에 따른 디테일 프리폼 비활성화 제어
					doCompareFrfEnable();
				}
			});
		}else {
			// 삭제
			util.Grid.deleteRow(app, "grdCcsOpenSub");
		}
	};
	
	/**
	 * @desc [btnRestore]작업취소 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 11
	 */
	moPage.onClick_BtnRestore = function() {
		// 작업취소
		util.Grid.restoreRow(app, "grdCcsOpenSub");
		// 마스터 리피트 상태에 따른 디테일 프리폼 비활성화 제어
		doCompareFrfEnable();
		// 취소내용 프리폼 반영
//TO-BE: <ExtRepeat.copyRowForm> 그리드-프리폼인 경우에는 selection바인딩으로 처리하기 때문에 불필요함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.copyRowForm("rptCcsOpenSub", "frfCcsOpenSub");
	};
	
	/**
	 * @desc [btnSave]작업저장 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 11
	 */
	moPage.onClick_BtnSave = function() {
		// 작업저장
		doSave();
	};
	
	/**
	 * @desc 개설과목목록 변경사항 저장
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 11
	 */
	function doSave() {
		
		// 리피트 변경사항 체크
		if(!util.Grid.isModified(app, ["grdCcsOpenSub"], "MSG")){
			return false;
		}
		
		//--프리폼 필수체크를 한다.
		if(!util.validate(app, "frfCcsOpenSub")) return false;
		
		
		// 리피트 Validation Check
		if(!util.validate(app, "grdCcsOpenSub")) return false;

		//strCommand: saveOpenSub 
		util.Submit.send(app, "subSave", function(pbSuccess){
			if(pbSuccess){
								
				//조회건수가 0건이면 프리폼이 내역이 반영되지 않기 떄문
				util.Control.reset(app, "frfCcsOpenSub");
				
				doList(function(pbListSuccess) {
					// 조회 : "갱신된 데이터가 조회되었습니다." header 메세지 표시
					if (pbListSuccess) util.Msg.notify(app, "NLS.INF.M025");
				});
			}
		});
	};
	
	/**
	 * @desc [cbbFrfSpCd]이수과정 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 11
	 */
	moPage.onValueChanged_CbbFrfSpCd = function() {
		// 이수과정에따른 교과그룹값 필터링
		// 이수과정에따른 교과그룹값 필터링
		var vsSpCd = util.Control.getValue(app, "cbbFrfSpCd");
		if(!ValueUtil.isNull(vsSpCd)){
			vsSpCd = "CC009SP" + vsSpCd;
		}else {
			var vsSaCd = util.Grid.getCellValue(app, "grdCcsOpenSub", "SA_CD");
			vsSpCd = "CC009SA" + vsSaCd
		}

		ExtSelectCtl.setInsBind("cbbFrfCuCd", "[contains(PATH, '"+ vsSpCd +"')]");
	};
	
	/**
	 * @desc [btnFrfSbCd]교과목명(돋보기버튼) onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 11
	 */
	moPage.onClick_BtnFrfSbCd = function(sender) {
		
		var vsSmtRcd = util.Control.getValue(app, "cbbSmtRcd");
		
		if("CA00391" == vsSmtRcd || "CA00393" == vsSmtRcd){			
			doOnClickStdCcsPOpenSubPopup(sender);
		}else{
			// 교과과정검색팝업 호출
			doOnClickStdCcsPCurriPopup(sender);
		}
		
		
		
	};
	
	/**
	 * @desc [ipbFrfSbNm]교과목명 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 11
	 */
	moPage.onValueChanged_IpbFrfSbNm = function(sender) {
		var vsSmtRcd = util.Control.getValue(app, "cbbSmtRcd");
		
		if("CA00391" == vsSmtRcd || "CA00393" == vsSmtRcd){			
			doOnChangeStdCcsPOpenSubPopup(sender);
		}else{
			// 값변경시 교과과정검색팝업 호출
			doOnChangeStdCcsPCurriPopup(sender);
		}
				
		
	};
	
	/**
	 * @desc [btnFrfDclRcd]학문분야(돋보기버튼) onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 11
	 */
	moPage.onClick_BtnFrfDclRcd = function(sender) {
		// 학문분야검색팝업 호출
		doOnClickStdCcsPDclExtendPopup(sender);
	};
	
	/**
	 * @desc [cbbFrfCmpDivRcd]이수구분 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 11
	 */
	moPage.onValueChanged_CbbFrfCmpDivRcd = function() {
		// 학문분야 초기화
		util.FreeForm.setValue(app, "frfCcsOpenSub", "DCL_RCD_NM", "");
		util.FreeForm.setValue(app, "frfCcsOpenSub", "DCL_RCD_CD", "");
		
		var vnIdx = util.Grid.getIndex(app, "grdCcsOpenSub");
		
		var vsCmpDivRcd = util.FreeForm.getValue(app, "frfCcsOpenSub", "CMP_DIV_RCD");
		
		// 교직전공[CA20121]. 교직교양[CA20122]
		if(ValueUtil.fixNull(vsCmpDivRcd) == "CA20121" || ValueUtil.fixNull(vsCmpDivRcd) == "CA20122"){
			
			// 평가방법 : 절대평가[CA21001]
			util.FreeForm.setValue(app, "frfCcsOpenSub", "EVAL_METHOD_RCD", "CA21001");
			util.Grid.setCellValue(app, "grdCcsOpenSub", "EVAL_METHOD_RCD", "CA21001", vnIdx);
			
			util.Control.setEnable(app, false, ["cbbFrfRelEstTypeRcd"]);
			util.FreeForm.setValue(app, "frfCcsOpenSub", "REL_EST_TYPE_RCD", "");
			util.Grid.setCellValue(app, "grdCcsOpenSub", "REL_EST_TYPE_RCD", "", vnIdx);
		}else {
			
			// 평가방법 : 상대평가[CA21002], 상대평가유형 : 상대평가[CD20901]
			util.FreeForm.setValue(app, "frfCcsOpenSub", "EVAL_METHOD_RCD", "CA21002");
			util.Grid.setCellValue(app, "grdCcsOpenSub", "EVAL_METHOD_RCD", "CA21002", vnIdx);
			util.FreeForm.setValue(app, "frfCcsOpenSub", "REL_EST_TYPE_RCD", "CD20901");
			util.Grid.setCellValue(app, "grdCcsOpenSub", "REL_EST_TYPE_RCD", "CD20901", vnIdx);
			util.Control.setEnable(app, true, ["cbbFrfRelEstTypeRcd"]);
		}
	};

	/**
	 * @desc [cbbFrfEvalMethodRcd]평가방법 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 11
	 */
	moPage.onValueChanged_CbbFrfEvalMethodRcd = function() {
		// 평가방법코드 : 상대평가[CA21002]
		var vsEvalMethodRcd = util.Control.getValue(app, "cbbFrfEvalMethodRcd");
		// 상대평가일경우만 상대평가유형 활성화
		if(ValueUtil.fixNull(vsEvalMethodRcd) == "CA21002"){
			util.Control.setEnable(app, true, ["cbbFrfRelEstTypeRcd"]);
		}else {
			util.Control.setEnable(app, false, ["cbbFrfRelEstTypeRcd"]);
			util.FreeForm.setValue(app, "frfCcsOpenSub", "REL_EST_TYPE_RCD", "");
		}
	};
	
	
	
	
	
	/**
	 * @desc 음수를  입력 할 수 없다.
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 2. 2
	 */
	moPage.onValueChanged_checkIntegerDecimal = function(vpCtl) {
		
		ValidUtil.checkIntegerDecimal(vpCtl, 3, 1, true);
	};
	
	
	/**
	 * @desc 학점 음수 불가.
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 2. 2
	 */
	moPage.onValueChanged_IpbFrfPnt = function() {
		page.onValueChanged_checkIntegerDecimal("ipbFrfPnt");
	};
	
	
	/**
	 * @desc 이론 음수 불가.
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 2. 2
	 */
	moPage.onValueChanged_IpbFrfTheoTc = function() {
		page.onValueChanged_checkIntegerDecimal("ipbFrfTheoTc");
	};
	
	
	/**
	 * @desc 실습 음수 불가.
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 2. 2
	 */
	moPage.onValueChanged_IpbFrfEpacTc = function() {
		page.onValueChanged_checkIntegerDecimal("ipbFrfEpacTc");
	};
	
	
	/**
	 * @desc 강의시수 음수 불가.
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 2. 2
	 */
	moPage.onValueChanged_IpbFrfLectTimeCnt = function() {
		page.onValueChanged_checkIntegerDecimal("ipbFrfLectTimeCnt");
	};
	
	
	moPage.onValueChanged_IpbFrfTlsnReqCapa1 = function() {
		page.onValueChanged_checkIntegerDecimal("ipbFrfTlsnReqCapa1");
	};
	
	/**
	 * @desc 교과그룹목록 조회
	 * @param poCallBackFunc 콜백정의, 교과목코드
	 * @return void
	 * @author 박갑수 at 2016. 2. 1
	 */
	function doCuList(poCallBackFunc, psCuCd) {
		//strCommand: getSaCu 
		util.Submit.send(app, "subCuList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, ["cbbCuCd"]);
				util.SelectCtl.selectItem(app, "cbbCuCd", 0);
			// 조회 후 콜백함수 수행
			if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
			}
		});
	};
	
	
	
	moPage.onSetFocus_CbbFrfCuCd = function() {
		page.onValueChanged_CbbFrfSpCd();
	};
	return moPage;
};
