//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCgdCRec.xtm"/>

/**
 * 성적관리
 * @class extCgdCRec
 * @author 박갑수 at 2016. 4. 4
 */
var extCgdCRec = function() {
	var moPage = new Page();
	
	// 임포트용 데이터 통신 오브젝트
	var moPObject = new Page();
	
	// 학생검색팝업
	moPObject.moIdsForStdCsrPStSearch = [
	{
		controlId 					: "btnStudId",
		iStudNo 					: "ipbStudId",	
		iStudId 						: "",
		iStudNm 					: "",
		iKeyDate 					: "/root/resOnLoad/strCutDt", 
		iObjDivRcd 				: "",
		iObjCd 						: "",
		iObjNm 					: "",
		iStatRcd 					: "",
		iStudDivRcd				: "",
		oStudId 					: "/root/reqKey/strStudId",
		oStudNo 					: "ipbStudId",
		oStudNm 					: "",
		oStatNm 					: "",
		oStatRcd 					: "",
		oProcRslt 					: "",
		oProcRsltYear 			: "",
		oSaNm						: "",
		oSaCd 						: "",
		oSpNm 					: "",
		oSpCd 						: "",
		oOgNm 					: "",
		oOgCd 						: "",
		oStudDivRcd				: "",
		oStudDivNm				: "",
		oBirthday					: "",
		oGenderRcd				: "",
		oGenderNm				: "",
		func : function() {
			var vsStudId = util.Control.getValue(app, "ipbStudId");
			// 검색조건있을경우 바로조회
			if(!ValueUtil.isNull(vsStudId)){
				util.Header.clickSearch(app);
			}
		}
	}];
	
	// 교과목검색팝업 호출
	moPObject.moIdsForStdCcsPSubPopup = [
	{
		 controlId					: "rdBtnRecNm",			
		 iEndYn						: "",						
		 iLanDivRcd				: "",					
		 iKeyDate					: "rdDipStDt",		
		 iSbCd						: "",			
		 iSbNm						: "rdIpbRecNm",
		 iCmpDivRcd				: "", 			
		 iSpvsDeptCd				: "",		
		 iSpvsDeptNm			: "",		
		 iObjDivRcd				: "",
		 oSbCd						: "rdIpbRecCd",			
		 oObjDivRcd				: "",
		 oStDt						: "",
		 oEndDt						: "",
		 oLanDivRcd				: "",
		 oRefKey					: "",
		 oSbNm					: "rdIpbRecNm",			
		 oShortNm					: "",			
		 oSbCatRcd				: "",			
		 oSbDivRcd				: "",			
		 oPnt							: "rdIpbGetPnt",
		 oTheoTc					: "",		
		 oEpacTc					: "",	
		 oSpvsColgCd			: "",			
		 oSpvsDeptCd			: "",			
		 oSpvsDeptNm			: "",		
		 oCmpDivRcd				: "rdCbbCmpDivRcd",			
		 oRecScaleRcd			: "rdCbbRecCiiRcd",
		 oSbTypeRcd				: "",
		 oSbLvlRcd				: "",
		 oEvalMethodRcd		: "",
		 oLectTypeRcd			: "",
		 oSbSmry					: "",
		 oRegFeeXcpYn			: "",
		 oSbAmt					: "",
		 oCmpDivRcdNm		: "",
		 oSbCatRcdNm			: "",
		 oReTlsnYnRcd			: "",
		 func : function(poParam) {
			// 성적스케일코드 조회후 세팅
			doGetRecCiiRcd(function(pbSuccess) {
				if (pbSuccess){
					
					var vnIdx = util.Grid.getIndex(app, "grdCgdRec");
					if(poParam.Result.PNT != null && poParam.Result.PNT != ""){
						// 다른팝업 세팅값 초기화
						util.Grid.setCellValue(app, "grdCgdRec", "REQ_PNT", poParam.Result.PNT, vnIdx);
						//ExtRepeat.setValue("rptCgdRec", "GET_PNT", poParam.Result.PNT, vnIdx);
						util.Grid.setCellValue(app, "grdCgdRec", "EST_PNT", poParam.Result.PNT, vnIdx);
					}else{
						// 다른팝업 세팅값 초기화
						//ExtRepeat.setValue("rptCgdRec", "GET_PNT", "", vnIdx);
						util.Grid.setCellValue(app, "grdCgdRec", "EST_PNT", "", vnIdx);
						util.Grid.setCellValue(app, "grdCgdRec", "REQ_PNT", "", vnIdx);
						
						
					}
			 
					 
			 
			 
					// 재수강여부 확인 - 재수강이 있을경우 재수강팝업
					doReTlsnChk();
				}
			});
		}
	 }];
	 
	  // 외부교과목검색
	 moPObject.moIdsForStdCgdPCosPopup = [
	{
		 controlId					: "rdBtnRecNm",		
		 iOsCd						: "",		
		 iOsNm						: "rdIpbRecNm",		
		 iOsPrpRcd				: "",		
		 iOtCd						: "",		
		 iKeyDate					: "rdDipStDt",		
		 iLanDivRcd				: "",		
		 oOsCd						: "rdIpbRecCd",	
		 oOsNm					: "rdIpbRecNm",		
		 oObjDivRcd				: "",
		 oOtCd						: "",			
		 oOtNm						: "",	
		 oOtObjDivRcd			: "",
		 oOsPrpRcd				: "",	
		 oOsDivRcd				: "",	
		 oOsDivNm				: "",
		 func : function(poParam) {
			 // 현재 인덱스
			 var vnIdx = util.Grid.getIndex(app, "grdCgdRec");
			 
			 // 다른팝업 세팅값 초기화
			 util.Grid.setCellValue(app, "grdCgdRec", "GET_PNT", "", vnIdx);
			 util.Grid.setCellValue(app, "grdCgdRec", "EST_PNT", "", vnIdx);
			 util.Grid.setCellValue(app, "grdCgdRec", "CMP_DIV_RCD", "", vnIdx);
			 
			 // 성적스케일코드 조회후 세팅
			 doGetRecCiiRcd();
		 }
	 }];
	 
	 // 성적인정항목검색
	moPObject.moIdsForStdCgdPRrPopup = [
	{
		 controlId					: "rdBtnRecNm",			
		 iRrCd						: "",			
		 iRrNm						: "rdIpbRecNm",			
		 iRrDivRcd					: "",			
		 iRrPrpRcd					: "",		
		 iKeyDate					: "rdDipStDt",		
		 iLanDivRcd				: "",			
		 oRrCd						: "rdIpbRecCd",		
		 oRrNm						: "rdIpbRecNm",			
		 oObjDivRcd				: "",		
		 oRrDivRcd				: "",			
		 oRrDivNm					: "",			
		 oRrPrpRcd				: "",			
		 oRrPrpNm				: "",			
		 oRrPnt						: "rdIpbReqPnt",			
		 oSpDgrRcd				: "",			
		 oSpDgrNm				: "",			
		 func : function(poParam) {
			 
			 
			 var vnIdx = util.Grid.getIndex(app, "grdCgdRec");
			if(poParam.Result.PNT != null && poParam.Result.RR_PNT != ""){
				// 다른팝업 세팅값 초기화
				 //ExtRepeat.setValue("rptCgdRec", "REQ_PNT", poParam.Result.RR_PNT, vnIdx);
				 util.Grid.setCellValue(app, "grdCgdRec", "GET_PNT", poParam.Result.RR_PNT, vnIdx);
				 util.Grid.setCellValue(app, "grdCgdRec", "EST_PNT", poParam.Result.RR_PNT, vnIdx);
			}else{
				// 다른팝업 세팅값 초기화
				//ExtRepeat.setValue("rptCgdRec", "REQ_PNT", "", vnIdx);
				util.Grid.setCellValue(app, "grdCgdRec", "GET_PNT", "", vnIdx);
				util.Grid.setCellValue(app, "grdCgdRec", "EST_PNT", "", vnIdx);
			}
			 
			 // 다른팝업 세팅값 초기화
			 util.Grid.setCellValue(app, "grdCgdRec", "CMP_DIV_RCD", "", vnIdx);
			 
			 // 성적스케일코드 조회후 세팅
			 doGetRecCiiRcd();
		 }
	 }];
	 
	  // 학문분야검색
	moPObject.moIdsForStdCcsPDclExtendPopup = [
	{
		controlId 			: "rdBtnDclRcdNm",
		iLanDivRcd 		: "",
		iRefKey 			: "rdIpbRefKey",				
		iCmpDivRcd 		: "rdCbbCmpDivRcd",
		iDclRcdCd 		: "rdIpbDclRcd",
		iDclRcdNm 		: "rdIpbDclRcdNm",					
		iReadOnlyYn 		: "",
		iStdDclRcdYn 	: "",							// 학문분야 표준임포트 사용여부
		oOutDclRcdNm 	: "rdIpbDclRcdNm",		// 학문분야 이름
		oOutDclRcdCd 	: "rdIpbDclRcd",			// 학문분야 배열코드															
		func : function(poParam) {}
	}];
	
	// 재수강대상용
	moPage.moIdsForReTlsn = 
	{
		iStudId			: "",
		iRecCd			: "",
		iRecNm			: "",
		iSchYearRcd	: "",
		iSmtRcd		: "",
		iRefKey			: "",
		iCmpDivRcd	: "",
		iKeyDate		: ""
	};
	
	// 분반코드용
	moPage.moIdsForDivcls = 
	{
		iSchYearRcd	: "",
		iSmtRcd		: "",
		iRecCd			: ""
	};
	 
	/**
	 * @desc import 헤더 초기화
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 4. 4
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		// import 헤더 초기화
		doHeaderOnLoad();
	};
	
	/**
	 * @desc 학생정보 import 초기화
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 4. 4
	 */
	moPage.onLoadImportDone_ImpStudInfo = function() {
		// 학생정보 import 초기화
		impStudInfo();
	};

	/**
	 * @desc onLoad 실행
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 4
	 */
	moPage.onModelConstructDone_ExtCgdCRec = function() {
		// 리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["rptCgdRec", "rptCgdRecSum"]);
		// 검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grpData"]);
		
		//impStudInf02(학생정보 임포트) 초기화
		initSize();
		
		// 서브미션 호출
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, ["cbbSchYearRcd", "cbbSmtRcd"]);
				// 학번 포커스
				util.Control.setFocus(app, "ipbStudId");
				
				ExtControl.setAttr("rdIpbDivclsCd", "bind", "bindDivcls");
//TO-BE: <ExtControl.refreshBind> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//				ExtControl.refreshBind("bindDivcls");
			}
		}, true);
	};
	
	/**
	 * @desc [btnStudId]학번(돋보기버튼) onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 4
	 */
	moPage.onClick_BtnStudId = function(sender) {
		// 학생검색팝업 호출
		doOnClickStdCsrPStSearch(sender);
	};

	/**
	 * @desc [ipbStudId]학번 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 4
	 */
	moPage.onValueChanged_IpbStudId = function(sender) {
		// 리피트 변경사항 체크
		if(util.Grid.isModified(app, ["grdCgdRec"])){
			return false;
		}
		
		// 값변경시 학생검색팝업 호출
		doOnChangeStdCsrPStSearch(sender);
	};
	
	/**
	 * @desc [btnSearch]조회 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 4
	 */
	moPage.onClick_BtnSearch = function() {
		 // 작업영역 리피트 변경 내역 체크
		if(util.Grid.isModified(app, "", "CRM")){
			return false;
		}
		
		// 조회조건 필수 체크
		if(!util.validate(app, ["ipbStudId"])){
			return false;
		}
		
		//(IMPORT)학번전달
		var vsStudId = util.DataMap.getValue(app, "dmReqKey", "strStudId");
		var vsKeyDate = util.DataMap.getValue(app, "dmResOnLoad", "strKeyDate");
		
		// 학생정보imp 조회
		setImpStudInfo(vsStudId, vsKeyDate, null, function(pbSuccess) {
			if (pbSuccess){
				
				// 이미지 업로드 버튼 보이기 여부 설정
				setVisibleUploadStudImgBtn(false);
				
				// 조회
				doList(function(pbSuccess) {
					// 조회 : "조회되었습니다." header 메세지 표시
					if (pbSuccess) util.Msg.notify(app, "NLS.INF.M024");
				});
			}
		});
	};
	
	/**
	 * @desc 과목별성적목록 조회
	 * @param poCallBackFunc 콜백정의
	 * @return void
	 * @author 박갑수 at 2016. 4. 4
	 */
	function doList(poCallBackFunc) {
		
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				
				util.Control.redraw(app, "grdCgdRec");
				util.Control.redraw(app, "grdCgdRecSum");
				
				// 성적이관여부 에따른 ROW색 설정
				doSetRowClr();
			}
			
			// 조회 후 콜백함수 수행
			if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess); 
		});
	};
	
	/**
	 * @desc [btnNew]신규 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 4
	 */
	moPage.onClick_BtnNew = function() {
		
		// 해당 리피트 insert 후 편집 시작할 컬럼 지정
		var vnIdx = util.Grid.insertRow(app, "grdCgdRec", "rdCbbSchYearRcd");
		
		// 신규 Defalut값 설정 
		// 학생ID : 조회조건
		var vsStudId = util.DataMap.getValue(app, "dmReqKey", "strStudId");
		util.Grid.setCellValue(app, "grdCgdRec", "STUD_ID", vsStudId, vnIdx);
		
		// 분반 - 00으로 세팅
		util.Grid.setCellValue(app, "grdCgdRec", "DIVCLS_CD", "00", vnIdx);
		
		// 객체구분 - 교과목[CC009SB] : 신규시에 내부교과목만 사용
		util.Grid.setCellValue(app, "grdCgdRec", "OBJ_DIV_RCD", "CC009SB", vnIdx);
		
		// 성적이관여부 에따른 ROW색 설정 - 신규시 Index로인해 없어지는부분 방지
		doSetRowClr();
	};
	
	/**
	 * @desc [btnDel]삭제 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 4
	 */
	moPage.onClick_BtnDel = function() {
		var vnIdx = util.Grid.getIndex(app, "grdCgdRec");
		
		// 신규일경우는 삭제 아닐경우는 삭제구분에 포커싱
		if(util.Grid.getRowState(app, "grdCgdRec", vnIdx) == cpr.data.tabledata.RowState.INSERTED){
			// 해당 리피트 delete
			util.Grid.deleteRow(app, "grdCgdRec");
		}else {
			
			// 성적이관여부
			var vsRecTrsfYn = util.Grid.getCellValue(app, "grdCgdRec", "REC_TRSF_YN", vnIdx);
			if(ValueUtil.fixNull(vsRecTrsfYn) == "Y"){
				// "@1번째는 이미 성적이관 처리된 데이터입니다." 메시지
				util.Msg.alert("NLS-CGD-M018", [vnIdx]);
				return;
			}else {
				// 삭제구분에 포커싱
				ExtRepeat.setColFocus("rptCgdRec", vnIdx, "rdCbbDelDivRcd");
			}
		}
	};
	
	/**
	 * @desc [btnRestore]작업취소 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 4
	 */
	moPage.onClick_BtnRestore = function() {
		// 해당 리피트 상태 초기화
		util.Grid.restoreRow(app, "grdCgdRec");
		
		var vnIdx = util.Grid.getIndex(app, "grdCgdRec");
		// 삭제구분
		var vsDelDivRcd = util.Grid.getCellValue(app, "grdCgdRec", "DEL_DIV_RCD", vnIdx);
		
		// 삭제구분에따른 색설정
		doSetRowDelClr(vnIdx, vsDelDivRcd);
	};
	
	/**
	 * @desc [btnSave]작업저장 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 4
	 */
	moPage.onClick_BtnSave = function() {
		// 작업저장
		doSave();
	};
	
	/**
	 * @desc 과목별성적목록 변경사항 저장
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 4
	 */
	function doSave() {
		
		// 리피트 변경사항 체크
		if(!util.Grid.isModified(app, ["grdCgdRec"], "MSG")){
			return false;
		}
		
		// 리피트 Validation Check
		if(!util.validate(app, "grdCgdRec")) return false;
		
		// 성적구분에따른 취득, 평가학점 확인
		if(!doChkPnt()) return false;
		
		// 점수유효성체크
		if(!doChkScr()) return false;
		
		//strCommand: save 
		util.Submit.send(app, "subSave", function(pbSuccess){
			if(pbSuccess){
				doList(function(pbListSuccess) {
					// 조회 : "갱신된 데이터가 조회되었습니다." header 메세지 표시
					if (pbListSuccess) util.Msg.notify(app, "NLS.INF.M025");
				});
			}
		});
	};
	
	/**
	 * @desc 성적구분이 이수실패일경우 취득학점, 평가학점이 0인지 확인
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 4
	 */
	function doChkPnt(){
		// 유효성 true or false
		var vbValid = true;
		
		var vsRptId = "rptCgdRec"
		// 리피트 RowCnt
		var vnRowCnt 	= util.Grid.getRowCount(app, vsRptId);		
		// 리피트 인덱스
		var vnRptIndex 	= util.Grid.getIndex(app, vsRptId);
		
		for (var i = 1; i <= vnRowCnt; i++) {
			var vsUptStatus = util.Grid.getCellValue(app, vsRptId, "UPT_STATUS", i);
			// 변경이없거나 삭제일경우 Skip
			if (ValueUtil.isNull(vsUptStatus) || vsUptStatus == "D") continue;
			
			// 성적구분
			var vsRecDivRcd = util.Grid.getCellValue(app, vsRptId, "REC_DIV_RCD", i);
			// 성적구분이 이수실패[CD21002]일 경우
			if(vsRecDivRcd == "CD21002"){
				// 취득학점, 평가학점
				var vsGetPnt = util.Grid.getCellValue(app, vsRptId, "GET_PNT", i);
				var vsEstPnt = util.Grid.getCellValue(app, vsRptId, "EST_PNT", i);
				
				if(ValueUtil.fixNull(vsGetPnt) != "0"){
					var vsRptTiele = ExtControl.getTextValue("rptCgdRec");
					var vsMsgParam = ExtControl.getTextValue("rhBtnGetPnt");
					
					// "@목록의 @번째 항목의 성적구분이 이수실패인경우 @은(는) 0 으로 입력하시기 바랍니다." 메시지
					util.Msg.alert("NLS-CGD-M052", [vsRptTiele, i, vsMsgParam]);
					ExtRepeat.setColFocus(vsRptId, i, "rdIpbGetPnt");
					
					vbValid = false;
					return vbValid;
				}
				
				if(ValueUtil.fixNull(vsEstPnt) != "0"){
					var vsRptTiele = util.Grid.getTitle(app, "grdCgdRecInputCgdRecInput");
					var vsMsgParam = ExtControl.getTextValue("rhBtnEstPnt");
					
					// "@목록의 @번째 항목의 성적구분이 이수실패인경우 @은(는) 0 으로 입력하시기 바랍니다." 메시지
					util.Msg.alert("NLS-CGD-M052", [vsRptTiele, i, vsMsgParam]);
					ExtRepeat.setColFocus(vsRptId, i, "rdIpbEstPnt");
					
					vbValid = false;
					return vbValid;
				}
			}
		}
	
		return vbValid;		
	}
	
	/**
	 * @desc 점수유효성체크 - 등급의 최대/최소점수 범위인지 비교
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 4
	 */
	function doChkScr(){
		// 유효성 true or false
		var vbValid = true;
		
		var vsRptId = "rptCgdRec"
		// 리피트 RowCnt
		var vnRowCnt 	= util.Grid.getRowCount(app, vsRptId);		
		// 리피트 인덱스
		var vnRptIndex 	= util.Grid.getIndex(app, vsRptId);
		
		for (var i = 1; i <= vnRowCnt; i++) {
			var vsUptStatus = util.Grid.getCellValue(app, vsRptId, "UPT_STATUS", i);
			// 변경이없거나 삭제일경우 Skip
			if (ValueUtil.isNull(vsUptStatus) || vsUptStatus == "D") continue;
			
			// 등급
			var vsGrdRcd = util.Grid.getCellValue(app, vsRptId, "GRD_RCD", i);
			var vsRecCiiRcd = util.Grid.getCellValue(app, vsRptId, "REC_CII_RCD", i);
			// 등급이 입력되었을경우 - 입력된 점수가 등급에 해당하는 최대/최소 점수 범위인지 검사
			if(!ValueUtil.isNull(vsGrdRcd)){
				
				var voNodeObj = ExtInstance.getNodeToObject("/root/resOnLoad/cgdConvGrdStdList/row[child::REC_CII_RCD = '"+vsRecCiiRcd+"' and GRD_RCD = '"+vsGrdRcd+"']");
				
				var vnMinScr = Number(voNodeObj.MIN_SCR);
				var vnMaxScr = Number(voNodeObj.MAX_SCR);
				
				var vnScr = Number(util.Grid.getCellValue(app, vsRptId, "SCR", i));
				
				if(vnMinScr > vnScr || vnScr > vnMaxScr){
					var vsRptTiele = util.Grid.getTitle(app, "grdCgdRecInputCgdRecInput");
					var vsGrdRcdNm = ExtInstance.getValue("/root/resOnLoad/grdRcdWithScaleList/row", "GRD_NM" , "child::GRD_RCD='"+vsGrdRcd+"'");
					
					// @목록의 @번째 @등급의 점수는 @ ~ @ 사이값으로 입력해야 합니다.
					util.Msg.alert("NLS-CGD-M053", [vsRptTiele, i, vsGrdRcdNm, vnMinScr, vnMaxScr]);
					ExtRepeat.setColFocus(vsRptId, i, "rdIpbScr");
					
					vbValid = false;
					return vbValid;
				}
			}
		}
	
		return vbValid;		
	}

	/**
	 * @desc [rdCbbSchYearRcd]학년도 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 4
	 */
	moPage.onValueChanged_RdCbbSchYearRcd = function() {
		// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
		doChangeYearSmt("year");
		
		// 학년도 학기 변경시 Row 다른값들 초기화
		doSetCtlClear();
	};
	
	/**
	 * @desc [rdCbbSmtRcd]학기 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 4
	 */
	moPage.onValueChanged_RdCbbSmtRcd = function() {
		// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
		doChangeYearSmt("smt");
		
		// 학년도 학기 변경시 Row 다른값들 초기화
		doSetCtlClear();
	};
	
	/**
	 * @desc 학년도, 학기값 변경시 row 컨트롤 초기화
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 4
	 */
	function doSetCtlClear(){
		var vnIdx = util.Grid.getIndex(app, "grdCgdRec");
		var vaCtl = ["DCL_RCD_CD", "DEL_RSN", "DEL_DIV_RCD", "REC_CORR_RSN", "REC_CORR_DTHR", "RE_TLSN_DIV_RCD", "RE_TLSN_SB_CD_NM", 
							"RE_TLSN_SB_CD", "RE_TLSN_SMT_RCD", "RE_TLSN_SCH_YEAR_RCD", "EST_PNT", "GET_PNT", "REQ_PNT", "REC_DIV_RCD", "GP", 
							"SCR", "GRD_RCD", "REC_CII_RCD", "DCL_RCD_NM", "CMP_DIV_RCD", "RCOG_REC_PRP_RCD", "REC_NM", "REC_CD"];
		
		// 초기화
		for(var i=0; i<vaCtl.length; i++){
			util.Grid.setCellValue(app, "grdCgdRec", vaCtl[i], "", vnIdx);
		}
		
		// 분반 - 00으로 세팅
		util.Grid.setCellValue(app, "grdCgdRec", "DIVCLS_CD", "00", vnIdx);
	};
	
	/**
	 * @desc 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 4
	 */
	function doChangeYearSmt(psDiv) {
		var vsYear 	= util.Grid.getCellValue(app, "grdCgdRec", "SCH_YEAR_RCD");
		var vsSmt 		= util.Grid.getCellValue(app, "grdCgdRec", "SMT_RCD");
		var vsSmtOrg = util.Grid.getCellValue(app, "grdCgdRec", "SMT_RCD");	//--합계학기에 복사하기위한 변수.

		// 학년도 학기가 모두 입력되어있을경우만 조회
		if(!ValueUtil.isNull(vsYear) && !ValueUtil.isNull(vsSmt)){
			
			//--정규학기, 계절학기가 아닐 경우 1학기로 전달한다.
			if(vsSmt  != 'CA00390' && vsSmt  != 'CA00391' && vsSmt  != 'CA00392' && vsSmt  != 'CA00393'){
				vsSmt = 'CA00390';
			}
			
			
			
			util.DataMap.setValue(app, "dmKeyDateMap", "YEAR", vsYear);
			util.DataMap.setValue(app, "dmKeyDateMap", "SMT", vsSmt);
			
			//strCommand: date 
			util.Submit.send(app, "subDate", function(pbSuccess){
				if(pbSuccess){
					var vsStDt = util.DataMap.getValue(app, "dmKeyDateMap", "ST_DT");
					var vsEndDt = util.DataMap.getValue(app, "dmKeyDateMap", "END_DT");
					
					util.Grid.setCellValue(app, "grdCgdRec", "ST_DT", vsStDt);
					util.Grid.setCellValue(app, "grdCgdRec", "END_DT", vsEndDt);
					
					if(psDiv == "smt"){
						util.Grid.setCellValue(app, "grdCgdRec", "SUM_SMT_RCD", vsSmtOrg);
					}
					
				// Exception 발생시
				}else {
					// 학년도 학기값 초기화시킴
					util.Grid.setCellValue(app, "grdCgdRec", "SCH_YEAR_RCD", "");
					util.Grid.setCellValue(app, "grdCgdRec", "SMT_RCD", "");
					util.Grid.setCellValue(app, "grdCgdRec", "SUM_SMT_RCD", "");
					
//					// 학년도 학기값 초기화시킴
//					if(psDiv == "year"){
//						ExtRepeat.setValue("rptCgdRec", "SCH_YEAR_RCD", "");
//					}else if(psDiv == "smt"){
//						ExtRepeat.setValue("rptCgdRec", "SMT_RCD", "");
//						ExtRepeat.setValue("rptCgdRec", "SUM_SMT_RCD", "");
//					}
				}
			});
		}
	};
	
	/**
	 * @desc [rdBtnRecNm]인정성적 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 4
	 */
	moPage.onClick_RdBtnRecNm = function(sender) {
		var vsSchYearRcd = util.Grid.getCellValue(app, "grdCgdRec", "SCH_YEAR_RCD");
		var vsSmtRcd = util.Grid.getCellValue(app, "grdCgdRec", "SMT_RCD");
		
		// 객체구분이 입력되었는지 확인
		if(ValueUtil.isNull(vsSchYearRcd) || ValueUtil.isNull(vsSmtRcd)){
			// "학년도, 학기를 선택하세요." 메시지 
			util.Msg.alert("NLS-INF-M028");
			return;
		}
		
		var vsObjDivRcd = util.Grid.getCellValue(app, "grdCgdRec", "OBJ_DIV_RCD");
		
		// 객체구분이 입력되었는지 확인
		if(ValueUtil.isNull(vsObjDivRcd)){
			// "객체구분을 선택하세요." 메시지 
			util.Msg.alert("NLS-CGD-M005");
			return;
		}
		
		// 성적스케일값 초기화
		util.Grid.setCellValue(app, "grdCgdRec", "REC_CII_RCD", "");
		
		// 객체구분값에따른 팝업 분기처리
		// 외부교과목[CC009OS]
		if(vsObjDivRcd == "CC009OS"){
			// 외부교과목검색 팝업 호출
			doOnClickStdCgdPCosPopup(sender);
		
		// 성적인정항목[CC009RR]
		}else if(vsObjDivRcd == "CC009RR"){
			// 성적인정항목검색 팝업 호출
			doOnClickStdCgdPRrPopup(sender);
		
		// 내부교과목[CC009SB]
		}else if(vsObjDivRcd == "CC009SB"){
			// 교과목검색 팝업 호출
			doOnClickStdCcsPSubPopup(sender);
		}
	};
	
	/**
	 * @desc [rdIpbRecNm]과목명 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 4
	 */
	moPage.onValueChanged_RdIpbRecNm = function(sender) {
		
		var vsSchYearRcd = util.Grid.getCellValue(app, "grdCgdRec", "SCH_YEAR_RCD");
		var vsSmtRcd = util.Grid.getCellValue(app, "grdCgdRec", "SMT_RCD");
		
		// 객체구분이 입력되었는지 확인
		if(ValueUtil.isNull(vsSchYearRcd) || ValueUtil.isNull(vsSmtRcd)){
			// "학년도, 학기를 선택하세요." 메시지 
			util.Msg.alert("NLS-INF-M028");
			util.Grid.setCellValue(app, "grdCgdRec", "REC_NM", "");
			return;
		}
		
		var vsObjDivRcd = util.Grid.getCellValue(app, "grdCgdRec", "OBJ_DIV_RCD");
		
		// 객체구분이 입력되었는지 확인
		if(ValueUtil.isNull(vsObjDivRcd)){
			// "객체구분을 선택하세요." 메시지 
			util.Msg.alert("NLS-CGD-M005");
			util.Grid.setCellValue(app, "grdCgdRec", "REC_NM", "");
			return;
		}
		
		// 성적스케일값 초기화
		util.Grid.setCellValue(app, "grdCgdRec", "REC_CII_RCD", "");
		// 분반목록 초기화
		util.Grid.setCellValue(app, "grdCgdRec", "DIVCLS_CD", "00");
		
		// 객체구분값에따른 팝업 분기처리
		// 외부교과목[CC009OS]
		if(vsObjDivRcd == "CC009OS"){
			// 외부교과목검색 팝업 호출
			doOnChangeStdCgdPCosPopup(sender);
		
		// 성적인정항목[CC009RR]
		}else if(vsObjDivRcd == "CC009RR"){
			// 성적인정항목검색 팝업 호출
			doOnChangeStdCgdPRrPopup(sender);
		
		// 내부교과목[CC009SB]
		}else if(vsObjDivRcd == "CC009SB"){
			// 교과목검색 팝업 호출
			doOnChangeStdCcsPSubPopup(sender);
		}
	};
	
	/**
	 * @desc 성적스케일코드 조회후 세팅
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 4
	 */
	function doGetRecCiiRcd(poCallBackFunc) {
		var vnIdx = util.Grid.getIndex(app, "grdCgdRec");
		
		var vsRecCd = util.Grid.getCellValue(app, "grdCgdRec", "REC_CD", vnIdx);
		var vsObjDivRcd = util.Grid.getCellValue(app, "grdCgdRec", "OBJ_DIV_RCD", vnIdx);
		var vsSchYearRcd = util.Grid.getCellValue(app, "grdCgdRec", "SCH_YEAR_RCD", vnIdx);
		var vsEndDt = util.Grid.getCellValue(app, "grdCgdRec", "END_DT", vnIdx);
		
		 // 교과목코드 없을경우 리턴
		 if(ValueUtil.isNull(vsRecCd)) return;
		
		util.DataMap.setValue(app, "dmReqSelRow", "strRecCd", vsRecCd);
		util.DataMap.setValue(app, "dmReqSelRow", "strObjDivRcd", vsObjDivRcd);
		util.DataMap.setValue(app, "dmReqSelRow", "strSchYearRcd", vsSchYearRcd);
		util.DataMap.setValue(app, "dmReqSelRow", "strKeyDate", vsEndDt);
		
		//strCommand: getRecStdRcd 
		util.Submit.send(app, "subGetRecCiiRcd", function(pbSuccess){
			if(pbSuccess){
				
				// 성적스케일값 세팅
				var vsRecCiiRcd = util.DataMap.getValue(app, "dmResList", "strRecCiiRcd");
				util.Grid.setCellValue(app, "grdCgdRec", "REC_CII_RCD", vsRecCiiRcd, vnIdx);
			}
			
			// 조회 후 콜백함수 수행
			if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess); 
		});
	};
	
	/**
	 * @desc [rdBtnDclRcdNm]학문분야 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 4
	 */
	moPage.onClick_RdBtnDclRcdNm = function(sender) {
		// 학문분야검색팝업 호출
		doOnClickStdCcsPDclExtendPopup(sender);
	};
	
	/**
	 * @desc 재수강여부 확인 - 재수강이 있을경우 재수강 대상
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 4
	 */
	function doReTlsnChk() {
		var vnIdx = util.Grid.getIndex(app, "grdCgdRec");
		
		var vsRecCd = util.Grid.getCellValue(app, "grdCgdRec", "REC_CD", vnIdx);
		var vsRecNm = util.Grid.getCellValue(app, "grdCgdRec", "REC_NM", vnIdx);
		var vsSchYearRcd = util.Grid.getCellValue(app, "grdCgdRec", "SCH_YEAR_RCD", vnIdx);
		var vsSmtRcd = util.Grid.getCellValue(app, "grdCgdRec", "SMT_RCD", vnIdx);
		var vsEndDt = util.Grid.getCellValue(app, "grdCgdRec", "END_DT", vnIdx);
		var vsCmpDivRcd = util.Grid.getCellValue(app, "grdCgdRec", "CMP_DIV_RCD", vnIdx);
		
		 // 교과목코드 없을경우 리턴
		 if(ValueUtil.isNull(vsRecCd)) return;
		
		util.DataMap.setValue(app, "dmReqSelRow", "strRecCd", vsRecCd);
		util.DataMap.setValue(app, "dmReqSelRow", "strRecNm", vsRecNm);
		util.DataMap.setValue(app, "dmReqSelRow", "strSchYearRcd", vsSchYearRcd);
		util.DataMap.setValue(app, "dmReqSelRow", "strSmtRcd", vsSmtRcd);
		util.DataMap.setValue(app, "dmReqSelRow", "strKeyDate", vsEndDt);
		util.DataMap.setValue(app, "dmReqSelRow", "strCmpDivRcd", vsCmpDivRcd);
		
		//strCommand: doCheckRetake 
		util.Submit.send(app, "subReTlsnChk", function(pbSuccess){
			if(pbSuccess){
				
				// 재수강 확인
				var vnCnt = util.DataSet.getRowCount(app, "dsCandidateList");
				
				if(vnCnt > 0){
					var vsStudId = util.DataMap.getValue(app, "dmReqKey", "strStudId");
					
					moIdsForReTlsn.iStudId 			= vsStudId;
					moIdsForReTlsn.iRecCd 		= vsRecCd;
					moIdsForReTlsn.iRecNm 		= vsRecNm;
					moIdsForReTlsn.iSchYearRcd = vsSchYearRcd;
					moIdsForReTlsn.iSmtRcd 		= vsSmtRcd;
					moIdsForReTlsn.iCmpDivRcd	= vsCmpDivRcd;
					moIdsForReTlsn.iKeyDate 		= vsEndDt;
					
					ExtPopUp.openLayeredPopup("/xtm/cgd/extCgdPReTlsn.xtm", 700, 280);
					
				}else {
					// 재수강관련 항목 초기화
					util.Grid.setCellValue(app, "grdCgdRec", "RE_TLSN_SCH_YEAR_RCD", "", vnIdx);
					util.Grid.setCellValue(app, "grdCgdRec", "RE_TLSN_SMT_RCD", "", vnIdx);
					util.Grid.setCellValue(app, "grdCgdRec", "RE_TLSN_SB_CD", "", vnIdx);
					util.Grid.setCellValue(app, "grdCgdRec", "RE_TLSN_SB_CD_NM", "", vnIdx);
					util.Grid.setCellValue(app, "grdCgdRec", "RE_TLSN_DIV_RCD", "", vnIdx);
					
					// 분반목록 GET
					doOpenDivcls();
				}
			}else {
				// Exception 발생시 팝업항목 초기화
				util.Grid.setCellValue(app, "grdCgdRec", "REC_CD", "", vnIdx);
				util.Grid.setCellValue(app, "grdCgdRec", "REC_NM", "", vnIdx);
				util.Grid.setCellValue(app, "grdCgdRec", "CMP_DIV_RCD", "", vnIdx);
				util.Grid.setCellValue(app, "grdCgdRec", "REC_CII_RCD", "", vnIdx);
				util.Grid.setCellValue(app, "grdCgdRec", "GET_PNT", "", vnIdx);
				util.Grid.setCellValue(app, "grdCgdRec", "EST_PNT", "", vnIdx);
			}
		});
	};
	
	/**
	 * @desc 재수강대상 콜백함수 - 선택닫기
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 4
	 */
	moPage.callbackReTlsnPopup= function(paRtnValue){
		// [0]재수강학년도, [1]재수강학기, [2]재수강과목코드, [3]재수강과목명, [4]재수강구분
		var vnIdx = util.Grid.getIndex(app, "grdCgdRec");
		util.Grid.setCellValue(app, "grdCgdRec", "RE_TLSN_SCH_YEAR_RCD", paRtnValue[0], vnIdx);
		util.Grid.setCellValue(app, "grdCgdRec", "RE_TLSN_SMT_RCD", paRtnValue[1], vnIdx);
		util.Grid.setCellValue(app, "grdCgdRec", "RE_TLSN_SB_CD", paRtnValue[2], vnIdx);
		util.Grid.setCellValue(app, "grdCgdRec", "RE_TLSN_SB_CD_NM", paRtnValue[3], vnIdx);
		util.Grid.setCellValue(app, "grdCgdRec", "RE_TLSN_DIV_RCD", paRtnValue[4], vnIdx);
		
		// 분반목록 GET
		doOpenDivcls();
	};
	
	/**
	 * @desc 재수강대상 콜백함수 - 화면닫기
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 4
	 */
	moPage.callbackReTlsnPopupCancel= function(){
		// "처리가 취소되었습니다." Header 메시지 표시
		util.Msg.notify(app, "NLS.INF.M013");
		
		// 분반목록 GET
		doOpenDivcls();
	};
	
	/**
	 * @desc [rdCbbCmpDivRcd]이수구분 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 4
	 */
	moPage.onValueChanged_RdCbbCmpDivRcd = function() {
		// 학문분야명, 학문분야코드 초기화
		util.Grid.setCellValue(app, "grdCgdRec", "DCL_RCD_NM", "");
		util.Grid.setCellValue(app, "grdCgdRec", "DCL_RCD", "");
	};
	
	/**
	 * @desc 성적이관여부에따른 ROW색 설정
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 4
	 */
	function doSetRowClr() {
		var vnRowCnt = util.Grid.getRowCount(app, "grdCgdRec");
		for(var i=0; i<vnRowCnt; i++){
			var vnIdx = i+1;
			
			var vsRecTrsfYn = util.Grid.getCellValue(app, "grdCgdRec", "REC_TRSF_YN", vnIdx);
			if(ValueUtil.fixNull(vsRecTrsfYn) == "Y"){
				ExtRepeat.setRowClr("rptCgdRec", vnIdx,"#F8F4CE");
			}
			
			// 삭제구분
			var vsDelDivRcd = util.Grid.getCellValue(app, "grdCgdRec", "DEL_DIV_RCD", vnIdx);
			
			// 삭제구분에따른 색설정
			doSetRowDelClr(vnIdx, vsDelDivRcd);
		}
	};
	
	/**
	 * @desc 삭제구분에따른 ROW색 설정
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 4
	 */
	function doSetRowDelClr(pnRowIdx, psDelDivRcd) {
		var vsRecTrsfYn = util.Grid.getCellValue(app, "grdCgdRec", "REC_TRSF_YN", pnRowIdx);
		if(ValueUtil.fixNull(vsRecTrsfYn) != "Y"){
			if(ValueUtil.isNull(psDelDivRcd)){
				ExtRepeat.setRowClr("rptCgdRec", pnRowIdx,"#FFFFFF");
			}else {
				ExtRepeat.setRowClr("rptCgdRec", pnRowIdx,"#FFCDCD");
			}
		}
	};
	
	/**
	 * @desc [rdCbbDelDivRcd]삭제구분 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 4
	 */
	moPage.onValueChanged_RdCbbDelDivRcd = function() {
		var vnIdx = util.Grid.getIndex(app, "grdCgdRec");
		
		// 삭제구분
		var vsDelDivRcd = util.Grid.getCellValue(app, "grdCgdRec", "DEL_DIV_RCD");
		
		// 삭제구분에따른 색설정
		doSetRowDelClr(vnIdx, vsDelDivRcd);
	};
	
	/**
	 * @desc [rdCbbGrdRcd]등급 onSetFocus 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 4
	 */
	moPage.onSetFocus_RdCbbGrdRcd = function() {
		var vnIdx = util.Grid.getIndex(app, "grdCgdRec");
		var vsRecCiiRcd = util.Grid.getCellValue(app, "grdCgdRec", "REC_CII_RCD", vnIdx);
		
		// 성적기준구분값에따른 필터링
		ExtControl.setAttr("rdCbbGrdRcd", "nodeset", "/root/resOnLoad/grdRcdWithScaleList/row[child::REC_SCALE_RCD = '"+vsRecCiiRcd+"'] " );
		util.Control.redraw(app, "rdCbbGrdRcd");
	};
	
	/**
	 * @desc [rdCbbGrdRcd]등급 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 4
	 */
	moPage.onValueChanged_RdCbbGrdRcd = function() {
		// 등급 -> 평점, 점수 세팅
		var vnIdx = util.Grid.getIndex(app, "grdCgdRec");
		var vsRecCiiRcd = util.Grid.getCellValue(app, "grdCgdRec", "REC_CII_RCD", vnIdx);
		var vsGrdRcd = util.Grid.getCellValue(app, "grdCgdRec", "GRD_RCD", vnIdx);
		
		var vnLength = ExtInstance.getNodeListLength("/root/resOnLoad/cgdConvGrdStdList/row[child::REC_CII_RCD = '"+vsRecCiiRcd+"']");
		if(vnLength > 0){
			 			 
			var voNodeObj = ExtInstance.getNodeToObject("/root/resOnLoad/cgdConvGrdStdList/row[child::REC_CII_RCD = '"+vsRecCiiRcd+"' and GRD_RCD = '"+vsGrdRcd+"']");
			if(voNodeObj){
				util.Grid.setCellValue(app, "grdCgdRec", "GP", voNodeObj.CONV_GP,vnIdx);
//				ExtRepeat.setValue("rptCgdRec", "SCR", voNodeObj.CONV_SCR,vnIdx);
			}else {
				util.Grid.setCellValue(app, "grdCgdRec", "GP", "0",vnIdx);
//				ExtRepeat.setValue("rptCgdRec", "SCR", "0",vnIdx);
			}
		}
		
		// 성적구분코드, 취득학점, 평가학점 세팅
		doPntSf(vnIdx);
	};
	
	/**
	 * @desc [rdCbbRecCiiRcd]성적기준구분 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 4
	 */
	moPage.onValueChanged_RdCbbRecCiiRcd = function() {
		var vnIdx = util.Grid.getIndex(app, "grdCgdRec");
		// 등급 초기화
		util.Grid.setCellValue(app, "grdCgdRec", "GRD_RCD", "", vnIdx);
		
		// 성적구분코드, 취득학점, 평가학점 세팅
		doPntSf(vnIdx);
	};
	
	/**
	 * @desc [rdIpbScr]점수 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 4
	 */
	moPage.onValueChanged_RdIpbScr = function() {
		ValidUtil.checkIntegerDecimal("rdIpbScr", 3, 2, true);
		
		// 점수 -> 등급, 평점 세팅
		var vnIdx = util.Grid.getIndex(app, "grdCgdRec");
		var vsRecCiiRcd = util.Grid.getCellValue(app, "grdCgdRec", "REC_CII_RCD", vnIdx);
		var vnScr = Number(util.Grid.getCellValue(app, "grdCgdRec", "SCR", vnIdx));
		
		var vnLength = ExtInstance.getNodeListLength("/root/resOnLoad/cgdConvGrdStdList/row[child::REC_CII_RCD = '"+vsRecCiiRcd+"']");
		if(vnLength > 0){
			var voNodeObj = ExtInstance.getNodeToObject("/root/resOnLoad/cgdConvGrdStdList/row[child::REC_CII_RCD = '"+vsRecCiiRcd+"' and MAX_SCR >= '"+vnScr+"' and MIN_SCR <= '"+vnScr+"']");
			if(voNodeObj){
				util.Grid.setCellValue(app, "grdCgdRec", "GRD_RCD", voNodeObj.GRD_RCD,vnIdx);
				util.Grid.setCellValue(app, "grdCgdRec", "GP", voNodeObj.CONV_GP,vnIdx);
			}else {
				util.Grid.setCellValue(app, "grdCgdRec", "GRD_RCD", "",vnIdx);
				util.Grid.setCellValue(app, "grdCgdRec", "GP", "0",vnIdx);
			}
		}
		
		// 성적구분코드, 취득학점, 평가학점 세팅
		doPntSf(vnIdx);
	};
	
	/**
	 * @desc [rdIpbGp]평점 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 4
	 */
	moPage.onValueChanged_RdIpbGp = function() {
		ValidUtil.checkIntegerDecimal("rdIpbGp", 3, 2, true);
		
		// 평점 -> 등급, 점수 세팅
		var vnIdx = util.Grid.getIndex(app, "grdCgdRec");
		var vsRecCiiRcd = util.Grid.getCellValue(app, "grdCgdRec", "REC_CII_RCD", vnIdx);
		var vnGp = Number(util.Grid.getCellValue(app, "grdCgdRec", "GP", vnIdx));
		
		var vnLength = ExtInstance.getNodeListLength("/root/resOnLoad/cgdConvGrdStdList/row[child::REC_CII_RCD = '"+vsRecCiiRcd+"']");
		if(vnLength > 0){
			var voNodeObj = ExtInstance.getNodeToObject("/root/resOnLoad/cgdConvGrdStdList/row[child::REC_CII_RCD = '"+vsRecCiiRcd+"' and MAX_GP >= '"+vnGp+"' and MIN_GP <= '"+vnGp+"']");
			if(voNodeObj){
				util.Grid.setCellValue(app, "grdCgdRec", "GRD_RCD", voNodeObj.GRD_RCD,vnIdx);
//				ExtRepeat.setValue("rptCgdRec", "SCR", voNodeObj.CONV_SCR,vnIdx);
			}else {
				util.Grid.setCellValue(app, "grdCgdRec", "GRD_RCD", "",vnIdx);
//				ExtRepeat.setValue("rptCgdRec", "SCR", "0",vnIdx);
			}
		}
		
		// 성적구분코드, 취득학점, 평가학점 세팅
		doPntSf(vnIdx);
	};
	
	/**
	 * @desc [rdIpbReqPnt ]신청학점 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 4
	 */
	moPage.onValueChanged_RdIpbReqPnt = function() {
		
		
		ValidUtil.checkIntegerDecimal("rdIpbReqPnt", 3, 2, true);
		
		var vnIdx = util.Grid.getIndex(app, "grdCgdRec");
		// 성적구분코드, 취득학점, 평가학점 세팅
		
		doPntSf(vnIdx);
		
	};
	
	/**
	 * @desc [rdIpbGetPnt]취득학점 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 4
	 */
	moPage.onValueChanged_RdIpbGetPnt = function() {
		
		
		ValidUtil.checkIntegerDecimal("rdIpbGetPnt", 3, 2, true);
		
		var vsGetPnt = util.Grid.getCellValue(app, "grdCgdRec", "GET_PNT");
		util.Grid.setCellValue(app, "grdCgdRec", "EST_PNT", vsGetPnt);
	};
	
	/**
	 * @desc [rdIpbEstPnt]평가학점 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 4
	 */
	moPage.onValueChanged_RdIpbEstPnt = function() {
		ValidUtil.checkIntegerDecimal("rdIpbEstPnt", 3, 2, true);
	};
	
	/**
	 * @desc 성적구분코드, 취득학점, 평가학점 세팅
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 4
	 */
	function doPntSf(pnRowIdx) {
		
		var vsRecCiiRcd = util.Grid.getCellValue(app, "grdCgdRec", "REC_CII_RCD", pnRowIdx);
		var vsGrdRcd = util.Grid.getCellValue(app, "grdCgdRec", "GRD_RCD", pnRowIdx);
		var vsScr = util.Grid.getCellValue(app, "grdCgdRec", "SCR", pnRowIdx);
		var vsGp = util.Grid.getCellValue(app, "grdCgdRec", "GP", pnRowIdx);
		var vsReqPnt = util.Grid.getCellValue(app, "grdCgdRec", "REQ_PNT", pnRowIdx);
		var vsGetPnt = util.Grid.getCellValue(app, "grdCgdRec", "GET_PNT", pnRowIdx);
		var vsEstPnt = util.Grid.getCellValue(app, "grdCgdRec", "EST_PNT", pnRowIdx);
		
		util.DataMap.setValue(app, "dmReqPntSf", "strRecCiiRcd", vsRecCiiRcd);
		util.DataMap.setValue(app, "dmReqPntSf", "strGrdRcd", vsGrdRcd);
		util.DataMap.setValue(app, "dmReqPntSf", "strScr", vsScr);
		util.DataMap.setValue(app, "dmReqPntSf", "strGp", vsGp);
		util.DataMap.setValue(app, "dmReqPntSf", "strReqPnt", vsReqPnt);
		util.DataMap.setValue(app, "dmReqPntSf", "strGetPnt", vsGetPnt);
		util.DataMap.setValue(app, "dmReqPntSf", "strEstPnt", vsEstPnt);
		
		//strCommand: doPntSf 
		util.Submit.send(app, "subPntSf", function(pbSuccess){
			if(pbSuccess){
				
				var vsRecDivRcd = util.DataMap.getValue(app, "dmResPntSf", "strRecDivRcd");
				var vsGetPnt = util.DataMap.getValue(app, "dmResPntSf", "strGetPnt");
				var vsEstPnt = util.DataMap.getValue(app, "dmResPntSf", "strEstPnt");
				
				util.Grid.setCellValue(app, "grdCgdRec", "REC_DIV_RCD", vsRecDivRcd, pnRowIdx);
				util.Grid.setCellValue(app, "grdCgdRec", "GET_PNT", vsGetPnt, pnRowIdx);
				util.Grid.setCellValue(app, "grdCgdRec", "EST_PNT", vsEstPnt, pnRowIdx);
			}
		});
	};
	
	/**
	 * @desc 분반목록
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 4
	 */
	function doOpenDivcls() {
		var vnIdx = util.Grid.getIndex(app, "grdCgdRec");
		
		var vsSchYearRcd 	= util.Grid.getCellValue(app, "grdCgdRec", "SCH_YEAR_RCD", vnIdx);
		var vsSmtRcd     	= util.Grid.getCellValue(app, "grdCgdRec", "SMT_RCD", vnIdx);
		var vsRecCd       	= util.Grid.getCellValue(app, "grdCgdRec", "REC_CD", vnIdx);
		var vsObjDivRcd     = util.Grid.getCellValue(app, "grdCgdRec", "OBJ_DIV_RCD", vnIdx);
		
		if(ValueUtil.isNull(vsSchYearRcd) || ValueUtil.isNull(vsSmtRcd) || ValueUtil.isNull(vsRecCd) || ValueUtil.fixNull(vsObjDivRcd) != "CC009SB"){
			util.Grid.setCellValue(app, "grdCgdRec", "DIVCLS_CD", "00");
		}else {
			moIdsForDivcls.iSchYearRcd 	= vsSchYearRcd;
			moIdsForDivcls.iSmtRcd 		= vsSmtRcd;
			moIdsForDivcls.iRecCd 			= vsRecCd;
			
			ExtPopUp.openLayeredPopup("/xtm/cgd/stdCgdPDivcls.xtm", 170, 190);
		}
	};
	
	/**
	 * @desc [rdBtnDivclsCd]분반코드 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 4
	 */
	moPage.onClick_RdBtnDivclsCd = function() {
		// 분반목록 세팅
		doOpenDivcls();
	};
	
	/**
	 * @desc [rdIpbDivclsCd]분반코드 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 5
	 */
	moPage.onClick_RdIpbDivclsCd = function() {
		var vnIdx = util.Grid.getIndex(app, "grdCgdRec");
		if(util.Grid.getRowState(app, "grdCgdRec", vnIdx) == cpr.data.tabledata.RowState.INSERTED){
			// 분반목록 세팅
			doOpenDivcls();
		}else {
			return;
		}
	};
	
	/**
	 * @desc 분반검색 콜백함수 - 화면닫기
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 4
	 */
	moPage.callbackDivclsPopup= function(psRtnVal){
		var vnIdx = util.Grid.getIndex(app, "grdCgdRec");
		util.Grid.setCellValue(app, "grdCgdRec", "DIVCLS_CD", psRtnVal, vnIdx);
	};
	
	/**
	 * @desc [rptCgdRec]과목별성적목록 onRowSelect 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 5
	 */
	moPage.onRowSelect_RptCgdRec = function() {
//TO-BE: <ExtControl.refreshBind> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtControl.refreshBind(["bindRecTrsfYn", "bindCgdRecNew", "bindDivcls"]);
		
		
		/*
			rowColor이  최상위 색상으로 되어 있어서
			삭제 및 이관된 자료의 색상을 표현이 안된다.
			rowSelect  rowColor를 변경하였지만..
			속도가 느려져서 주석 처리함.
		*/
		/*
		var vsRowColor = util.Control.getProperty(app, "rptCgdRec", "rowcolor");
		//--이관여부
		var vsRecTrsfYn = util.Grid.getCellValue(app, "grdCgdRec", "REC_TRSF_YN");
		// 삭제구분
		var vsDelDivRcd = util.Grid.getCellValue(app, "grdCgdRec", "DEL_DIV_RCD");
		
		if(ValueUtil.isNull(vsDelDivRcd) && ValueUtil.isNull(vsRecTrsfYn)){
			
			if(vsRowColor == "#DDF1F4"){
				return true;
			}			
			ExtControl.setAttr("rptCgdRec", "rowcolor", "#DDF1F4");
		}else{			
			
			if(ValueUtil.fixNull(vsRecTrsfYn) == "Y"){
				ExtControl.setAttr("rptCgdRec", "rowcolor", "#F8F4CE");
			}
			
			if(!ValueUtil.isNull(vsDelDivRcd)){
				ExtControl.setAttr("rptCgdRec", "rowcolor", "#FFCDCD");
			}
			
		}			
		model.refreshControl("rptCgdRec");  
		*/
			
	};
	
	/**
	 * @desc [rdCbbRecDivRcd]성적구분 onRowSelect 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 5
	 */
	moPage.onValueChanged_RdCbbRecDivRcd = function() {
		var vnIdx = util.Grid.getIndex(app, "grdCgdRec");
		// 성적구분 : 이수완료[CD21001], 이수실패[CD21002]
		var vsRecDivRcd = util.Grid.getCellValue(app, "grdCgdRec", "REC_DIV_RCD", vnIdx);
		var vsGrdRcd = util.Grid.getCellValue(app, "grdCgdRec", "GRD_RCD", vnIdx); 
		
		if(!ValueUtil.isNull(vsGrdRcd)){
			var vsCdPrp1 = ExtInstance.getValue("/root/resOnLoad/grdRcdWithScaleList/row", "CD_PRP1" , "child::GRD_RCD='"+vsGrdRcd+"'");
			var vsGrdRcdNm = ExtInstance.getValue("/root/resOnLoad/grdRcdWithScaleList/row", "GRD_NM" , "child::GRD_RCD='"+vsGrdRcd+"'");
			var vsRecDivRcdNm = ExtInstance.getValue("/root/resOnLoad/recDivRcdList/row", "CD_NM" , "child::CD='"+vsRecDivRcd+"'");
			
			// 이수완료일경우
			if(ValueUtil.fixNull(vsRecDivRcd) == "CD21001"){
				if(ValueUtil.fixNull(vsCdPrp1) == "CD21002"){
					// 등급이 @ 이므로 @가 아닙니다.
					util.Msg.alert("NLS-CGD-M051", [vsGrdRcdNm, vsRecDivRcdNm]);
					// 이수실패세팅, 취득, 평가학점 초기화
					util.Grid.setCellValue(app, "grdCgdRec", "REC_DIV_RCD", "CD21002",vnIdx);
				}
			// 이수실패일경우
			}else if(ValueUtil.fixNull(vsRecDivRcd) == "CD21002"){
				if(ValueUtil.fixNull(vsCdPrp1) != vsRecDivRcd){
					// 등급이 @ 이므로 @가 아닙니다.
					util.Msg.alert("NLS-CGD-M051", [vsGrdRcdNm, vsRecDivRcdNm]);
					// 이수성공세팅 초기화
					util.Grid.setCellValue(app, "grdCgdRec", "REC_DIV_RCD", "CD21001",vnIdx);
				}
			}
		}
		
	};
	
	/**
	 * @desc [btnGiveUp]학기포기 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 5
	 */
	moPage.onClick_BtnGiveUp = function() {
		// 리피트 변경사항 체크
		if(util.Grid.isModified(app, ["grdCgdRec"])){
			// "변경된 사항이 있습니다. 작업저장 혹은 취소 후 실행해 주시기 바랍니다." 메시지
			util.Msg.alert("NLS-WRN-M014");
			
			return false;
		}
		
		var vsSchSchYearRcd = util.Control.getValue(app, "cbbSchYearRcd");
		var vsSchSmtRcd = util.Control.getValue(app, "cbbSmtRcd");
		
		// 학년도 학기 전체 확인
		if(!ValueUtil.isNull(vsSchSchYearRcd) || !ValueUtil.isNull(vsSchSmtRcd)){

			// "학년도, 학기를 전체로 설정 후 다시 진행 하시기 바랍니다." 메시지
			util.Msg.alert("NLS-CGD-EXT006");
			
			return false;
		}
		
		var vnRowCnt = util.Grid.getRowCount(app, "grdCgdRec");
		if(vnRowCnt > 0){
			
			// 서브미션 호출
			//strCommand: maxYearSmt 
			util.Submit.send(app, "subMaxYearSmt", function(pbSuccess){
				if(pbSuccess){
					
					var vsMaxSchYearRcd = util.DataMap.getValue(app, "dmReqKey", "strMaxSchYearRcd");
					var vsMaxSmtRcd = util.DataMap.getValue(app, "dmReqKey", "strMaxSmtRcd");

					if(!ValueUtil.isNull(vsMaxSchYearRcd) && !ValueUtil.isNull(vsMaxSmtRcd)){
						
						// @을(를) 처리하시겠습니까?
						var vsSchYearRcdNm = ExtInstance.getValue("/root/resOnLoad/schYearRcdList/row", "CD_NM" , "child::CD='"+vsMaxSchYearRcd+"'");
						var vsSmtRcdNm = ExtInstance.getValue("/root/resOnLoad/smtRcdList/row", "CD_NM" , "child::CD='"+ vsMaxSmtRcd + "'");
						
						var vsMsg = vsSchYearRcdNm + " " + vsSmtRcdNm + " " + ExtControl.getTextValue("btnGiveUp");
								
						if(util.Msg.confirm("NLS-CRM-M018", [vsMsg]) ){
							
							//strCommand: giveUp 
							util.Submit.send(app, "subGiveUp", function(pbSuccess){
								if(pbSuccess){
									doList(function(pbListSuccess) {
										
										if (pbListSuccess){
											// 조회 : "처리되었습니다." header 메세지 표시
											util.Msg.notify(app, "NLS.INF.M003");
											
											var vnFocusRow = 0;
											for(var i=0; i<vnRowCnt; i++){
												
												var vnIdx = i+1;
												
												var vsSchYearRcd = util.Grid.getCellValue(app, "grdCgdRec", "SCH_YEAR_RCD", vnIdx);
												var vsSmtRcd = util.Grid.getCellValue(app, "grdCgdRec", "SMT_RCD", vnIdx);
												
												var vsDelDivRcd = util.Grid.getCellValue(app, "grdCgdRec", "DEL_DIV_RCD", vnIdx);
												
												// 학년도 학기, 학기포기에 포커싱
												if(vsMaxSchYearRcd == vsSchYearRcd && vsMaxSmtRcd == vsSmtRcd && ValueUtil.fixNull(vsDelDivRcd) == "CD20102"){
													vnFocusRow = vnIdx;
												}
											}

											// 삭제구분 포커싱
											ExtRepeat.setColFocus("rptCgdRec", vnFocusRow, "rdCbbDelDivRcd", false);
										}
									});
								}
							});

						}else {
							
							return false;
						}
					}else {
						// "학생의 성적이 존재하지 않습니다." 메시지 
						util.Msg.alert("NLS-CGD-EXT007");
						
						return false;
					}
				}
			});
			
		}else {
			// "학생의 성적이 존재하지 않습니다." 메시지 
			util.Msg.alert("NLS-CGD-EXT007");
			
			return false;
		}
	};
	
	/**
	 * @desc [rdCbbDelDivRcd]삭제구분 onSetFocus 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 9. 5
	 */
	moPage.onSetFocus_RdCbbDelDivRcd = function() {		
		// 학기포기 필터링
		ExtControl.setAttr("rdCbbDelDivRcd", "nodeset", "/root/resOnLoad/delDivRcdList/row[child::CD_PRP1 != 'Y'] " );
		util.Control.redraw(app, "rdCbbDelDivRcd");
	};
	
	return moPage;
};
