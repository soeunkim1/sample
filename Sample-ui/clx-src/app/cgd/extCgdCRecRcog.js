//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCgdCRecRcog.xtm"/>

/**
 * 성적인정관리
 * @class extCgdCRecRcog
 * @author 박갑수 at 2016. 3. 28
 */
var extCgdCRecRcog = function() {
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
		iKeyDate 					: "/root/keyDateMap/END_DT", 
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
		 controlId					: "rdBtnRcogRecNm",			
		 iEndYn						: "",						
		 iLanDivRcd				: "",					
		 iKeyDate					: "99991231",		
		 iSbCd						: "",			
		 iSbNm						: "rdIpbRcogRecNm",
		 iCmpDivRcd				: "", 			
		 iSpvsDeptCd				: "",		
		 iSpvsDeptNm			: "",		
		 iObjDivRcd				: "CC009SA",
		 oSbCd						: "rdIpbRcogRecCd",			
		 oObjDivRcd				: "",
		 oStDt						: "",
		 oEndDt						: "",
		 oLanDivRcd				: "",
		 oRefKey					: "",
		 oSbNm					: "rdIpbRcogRecNm",			
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
		 oRecScaleRcd			: "",
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
			 // 현재 인덱스
			 var vnIdx = util.Grid.getIndex(app, "grdCgdRecRcog");
			 util.Grid.setCellValue(app, "grdCgdRecRcog", "REQ_PNT",  util.Grid.getCellValue(app, "grdCgdRecRcog", "GET_PNT", vnIdx), vnIdx);
			 util.Grid.setCellValue(app, "grdCgdRecRcog", "GET_PNT",  util.Grid.getCellValue(app, "grdCgdRecRcog", "GET_PNT", vnIdx), vnIdx);
			 util.Grid.setCellValue(app, "grdCgdRecRcog", "EST_PNT",  util.Grid.getCellValue(app, "grdCgdRecRcog", "GET_PNT", vnIdx), vnIdx);
			 
			 // 다른팝업 세팅값 초기화
			 util.Grid.setCellValue(app, "grdCgdRecRcog", "SP_DGR_RCD", "", vnIdx);
		}
	 },
	 {
		 controlId					: "rdBtnIsriCdNm",			
		 iEndYn						: "",						
		 iLanDivRcd				: "",					
		 iKeyDate					: "99991231",		
		 iSbCd						: "",			
		 iSbNm						: "rdIpbIsriCdNm",
		 iCmpDivRcd				: "", 			
		 iSpvsDeptCd				: "",		
		 iSpvsDeptNm			: "",		
		 iObjDivRcd				: "CC009SA",
		 oSbCd						: "rdIpbIsriCd",			
		 oObjDivRcd				: "",
		 oStDt						: "",
		 oEndDt						: "",
		 oLanDivRcd				: "",
		 oRefKey					: "",
		 oSbNm					: "rdIpbIsriCdNm",			
		 oShortNm					: "",			
		 oSbCatRcd				: "",			
		 oSbDivRcd				: "",			
		 oPnt							: "",
		 oTheoTc					: "",		
		 oEpacTc					: "",	
		 oSpvsColgCd			: "",			
		 oSpvsDeptCd			: "",			
		 oSpvsDeptNm			: "",		
		 oCmpDivRcd				: "",			
		 oRecScaleRcd			: "",
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
		}
	 }];
	 
	 // 외부교과목검색
	 moPObject.moIdsForStdCgdPCosPopup = [
	{
		 controlId					: "rdBtnRcogRecNm",		
		 iOsCd						: "",		
		 iOsNm						: "rdIpbRcogRecNm",		
		 iOsPrpRcd				: "rdCbbRcogRecPrpRcd",		
		 iOtCd						: "",		
		 iKeyDate					: "rdDipStDt",		
		 iLanDivRcd				: "",		
		 oOsCd						: "rdIpbRcogRecCd",	
		 oOsNm					: "rdIpbRcogRecNm",		
		 oObjDivRcd				: "",
		 oOtCd						: "",			
		 oOtNm						: "",	
		 oOtObjDivRcd			: "",
		 oOsPrpRcd				: "",	
		 oOsDivRcd				: "",	
		 oOsDivNm				: "",
		 func : function(poParam) {
			 // 현재 인덱스
			 var vnIdx = util.Grid.getIndex(app, "grdCgdRecRcog");
			 
			 // 다른팝업 세팅값 초기화
			 util.Grid.setCellValue(app, "grdCgdRecRcog", "GET_PNT", "0", vnIdx);
			 util.Grid.setCellValue(app, "grdCgdRecRcog", "EST_PNT", "0", vnIdx);
			 util.Grid.setCellValue(app, "grdCgdRecRcog", "REQ_PNT", "0", vnIdx);
			 util.Grid.setCellValue(app, "grdCgdRecRcog", "SP_DGR_RCD", "", vnIdx);
			 util.Grid.setCellValue(app, "grdCgdRecRcog", "CMP_DIV_RCD", "", vnIdx);
		 }
	 }];
	 
	 // 성적인정항목검색
	moPObject.moIdsForStdCgdPRrPopup = [
	{
		 controlId					: "rdBtnRcogRecNm",			
		 iRrCd						: "",			
		 iRrNm						: "rdIpbIsriCdNm",			
		 iRrDivRcd					: "",			
		 iRrPrpRcd					: "rdCbbRcogRecPrpRcd",		
		 iKeyDate					: "rdDipStDt",		
		 iLanDivRcd				: "",			
		 oRrCd						: "rdIpbRcogRecCd",		
		 oRrNm						: "rdIpbRcogRecNm",			
		 oObjDivRcd				: "",		
		 oRrDivRcd				: "",			
		 oRrDivNm					: "",			
		 oRrPrpRcd				: "",			
		 oRrPrpNm				: "",			
		 oRrPnt						: "rdIpbGetPnt",			
		 oSpDgrRcd				: "rdCbbSpDgrRcd",			
		 oSpDgrNm				: "",			
		 func : function(poParam) {
			 // 현재 인덱스
			 var vnIdx = util.Grid.getIndex(app, "grdCgdRecRcog");
			 util.Grid.setCellValue(app, "grdCgdRecRcog", "REQ_PNT",  util.Grid.getCellValue(app, "grdCgdRecRcog", "GET_PNT", vnIdx), vnIdx);
			 util.Grid.setCellValue(app, "grdCgdRecRcog", "GET_PNT",  util.Grid.getCellValue(app, "grdCgdRecRcog", "GET_PNT", vnIdx), vnIdx);
			 util.Grid.setCellValue(app, "grdCgdRecRcog", "EST_PNT",  util.Grid.getCellValue(app, "grdCgdRecRcog", "GET_PNT", vnIdx), vnIdx);
			 
			 // 다른팝업 세팅값 초기화
			 util.Grid.setCellValue(app, "grdCgdRecRcog", "CMP_DIV_RCD", "", vnIdx);
		 }
	 },
	 {
		 controlId					: "rdBtnIsriCdNm",			
		 iRrCd						: "",			
		 iRrNm						: "rdIpbRcogRecNm",			
		 iRrDivRcd					: "",			
		 iRrPrpRcd					: "rdCbbRcogRecPrpRcd",		
		 iKeyDate					: "rdDipStDt",		
		 iLanDivRcd				: "",			
		 oRrCd						: "rdIpbRcogRecCd",		
		 oRrNm						: "rdIpbRcogRecNm",			
		 oObjDivRcd				: "",		
		 oRrDivRcd				: "",			
		 oRrDivNm					: "",			
		 oRrPrpRcd				: "",			
		 oRrPrpNm				: "",			
		 oRrPnt						: "rdIpbGetPnt",			
		 oSpDgrRcd				: "rdCbbSpDgrRcd",			
		 oSpDgrNm				: "",			
		 func : function(poParam) {
		 }
	 }
	 ];
	 
	 // 학문분야검색
	moPObject.moIdsForStdCcsPDclExtendPopup = [
	{
		controlId 			: "rdBtnDclRcdNm",
		iLanDivRcd 		: "",
		iRefKey 			: "rdIpbRefKey",				
		iCmpDivRcd 		: "rdCbbCmpDivRcd",
		iDclRcdCd 		: "",
		iDclRcdNm 		: "",					
		iReadOnlyYn 		: "",
		iStdDclRcdYn 	: "",							// 학문분야 표준임포트 사용여부
		oOutDclRcdNm 	: "rdIpbDclRcdNm",		// 학문분야 이름
		oOutDclRcdCd 	: "rdIpbDclRcd",			// 학문분야 배열코드															
		func : function(poParam) {}
	}];
	
	// 인정성적단위 팝업용
	moPage.moIdsForRcogRecUnitRcd = 
	{
		iCd		: "",
		iCdNm	: ""
	};
	
	// 교환학생 팝업용
	moPage.moIdsForExhPgmId = 
	{
		iStudId	: ""
	};

	/**
	 * @desc import 헤더 초기화
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 3. 28
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		// import 헤더 초기화
		doHeaderOnLoad();
	};
	
	/**
	 * @desc 학생정보 import 초기화
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 3. 28
	 */
	moPage.onLoadImportDone_ImpStudInfo = function() {
		// 학생정보 import 초기화
		impStudInfo();
	};
	
	/**
	 * @desc onLoad 실행
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 28
	 */
	moPage.onModelConstructDone_ExtCgdCRecRcog = function() {
		// 리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["rptCgdRecRcog"]);
		// 검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grpData"]);
		
		//impStudInf02(학생정보 임포트) 초기화
		initSize();
		
		// 서브미션 호출
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				// 학번 포커스
				util.Control.setFocus(app, "ipbStudId");
			}
		}, true);
	};
	
	/**
	 * @desc [btnStudId]학번(돋보기버튼) onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 28
	 */
	moPage.onClick_BtnStudId = function(sender) {
		// 학생검색팝업 호출
		doOnClickStdCsrPStSearch(sender);
	};
	
	/**
	 * @desc [ipbStudId]학번 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 28
	 */
	moPage.onValueChanged_IpbStudId = function(sender) {
		// 리피트 변경사항 체크
		if(util.Grid.isModified(app, ["grdCgdRecRcog"])){
			return false;
		}
		
		// 값변경시 학생검색팝업 호출
		doOnChangeStdCsrPStSearch(sender);
	};
	
	/**
	 * @desc [btnSearch]조회 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 28
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
		var vsKeyDate = util.DataMap.getValue(app, "dmKeyDateMap", "END_DT");
		
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
	 * @desc 성적인정관리목록 조회
	 * @param poCallBackFunc 콜백정의
	 * @return void
	 * @author 박갑수 at 2016. 3. 28
	 */
	function doList(poCallBackFunc) {
		
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdCgdRecRcog");
				
				// 성적이관여부에따른 ROW색 설정
				doSetRowClr();
				
				// 조회 후 콜백함수 수행
				if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess); 
			}
		});
	};
	
	/**
	 * @desc 성적이관여부에따른 ROW색 설정
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 28
	 */
	function doSetRowClr() {
		var vnRowCnt = util.Grid.getRowCount(app, "grdCgdRecRcog");
		for(var i=0; i<vnRowCnt; i++){
			var vnIdx = i+1;
			
			var vsRecTrsfYn = util.Grid.getCellValue(app, "grdCgdRecRcog", "REC_TRSF_YN", vnIdx);
			if(ValueUtil.fixNull(vsRecTrsfYn) == "Y"){
				ExtRepeat.setRowClr("rptCgdRecRcog", vnIdx,"#F8F4CE");
			}
		}
	};
	
	/**
	 * @desc [rhCkbSelect]패널 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 28
	 */
	moPage.onValueChanged_RhCkbSelect = function() {
		// 리피트 패널 설정
//TO-BE: <ExtRepeat.selectedAllPanel> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.selectedAllPanel("rhCkbSelect");
	};
	
	/**
	 * @desc [btnNew]신규 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 28
	 */
	moPage.onClick_BtnNew = function() {
		// 해당 리피트 insert 후 편집 시작할 컬럼 지정
		var vnIdx = util.Grid.insertRow(app, "grdCgdRecRcog", "rdCbbRcogRecGrpRcd");
		
		// 신규 Defalut값 설정 
		// 학생ID : 조회조건
		var vsStudId = util.DataMap.getValue(app, "dmReqKey", "strStudId");
		util.Grid.setCellValue(app, "grdCgdRecRcog", "STUD_ID", vsStudId, vnIdx);
		
		// 학년도 : 수업학년도
		var vsSchYearRcd = util.DataMap.getValue(app, "dmKeyDateMap", "YEAR");
		util.Grid.setCellValue(app, "grdCgdRecRcog", "SCH_YEAR_RCD", vsSchYearRcd, vnIdx);
		
		// 학기 : 수업학기
		var vsSmtRcd = util.DataMap.getValue(app, "dmKeyDateMap", "SMT");
		//ExtRepeat.setValue("rptCgdRecRcog", "SMT_RCD", vsSmtRcd, vnIdx);
		
		// 합산학기 : 수업학기
		util.Grid.setCellValue(app, "grdCgdRecRcog", "SUM_SMT_RCD", vsSmtRcd, vnIdx);
		
		// 시작일자 : 수업시작일자
		var vsStDt = util.DataMap.getValue(app, "dmKeyDateMap", "ST_DT");
		util.Grid.setCellValue(app, "grdCgdRecRcog", "ST_DT", vsStDt, vnIdx);
		
		// 종료일자 : 수업종료일자
		var vsEndDt = util.DataMap.getValue(app, "dmKeyDateMap", "END_DT");
		util.Grid.setCellValue(app, "grdCgdRecRcog", "END_DT", vsEndDt, vnIdx);
		
		// 신청학점, 취득학점, 평가학점 : 0
		util.Grid.setCellValue(app, "grdCgdRecRcog", "REQ_PNT", 0, vnIdx);
		util.Grid.setCellValue(app, "grdCgdRecRcog", "GET_PNT", 0, vnIdx);
		util.Grid.setCellValue(app, "grdCgdRecRcog", "EST_PNT", 0, vnIdx);
		
		// 인정성적용도 : 교환성적인정[CD105EXH]
		util.Grid.setCellValue(app, "grdCgdRecRcog", "RCOG_REC_PRP_RCD", "CD105001", vnIdx);
		// 객체구분 : 외부교과목[CC009OS]
		util.Grid.setCellValue(app, "grdCgdRecRcog", "RCOG_REC_OBJ_DIV_RCD", "CC009RR", vnIdx);
		// 인정성적단위 : 기타만점[CD10906]
		//ExtRepeat.setValue("rptCgdRecRcog", "RCOG_REC_UNIT_RCD", "CD10905", vnIdx);
		
		// 성적이관여부에따른 ROW색 설정 - 신규시 Index로인해 없어지는부분 방지
		doSetRowClr();
	};
	
	/**
	 * @desc [btnDel]삭제 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 28
	 */
	moPage.onClick_BtnDel = function() {
		
		// 2. 로우 선택 체크
		var vnSelectRowCnt = ExtInstance.getNodeListLength("/root/resList/rptCgdRecRcog/row[child::DEL_CKB='Y']");
				
		// 선택된로우가 있을경우 선택된로우 체크
		if(vnSelectRowCnt > 0){
			var vsIdx = util.Grid.getCheckOrSelectedRowIndex(app, "grdCgdRecRcog");
			var vaIdx = vsIdx.split(",");
			
			for(var i=0; i<vnSelectRowCnt; i++){
				var vnIdx = vaIdx[i];
				
				// 성적이관여부
				var vsRecTrsfYn = util.Grid.getCellValue(app, "grdCgdRecRcog", "REC_TRSF_YN", vnIdx);
				if(ValueUtil.fixNull(vsRecTrsfYn) == "Y"){
					// "@1번째는 이미 성적이관 처리된 데이터입니다." 메시지
					util.Msg.alert("NLS-CGD-M018", [vnIdx]);
					return;
				}
			}
		// 선택된로우가 없을경우 포커싱된 로우 체크
		}else {
			// 성적이관여부
			var vsRecTrsfYn = util.Grid.getCellValue(app, "grdCgdRecRcog", "REC_TRSF_YN");
			var vnIdx = util.Grid.getIndex(app, "grdCgdRecRcog");
			if(ValueUtil.fixNull(vsRecTrsfYn) == "Y"){
				// "@1번째는 이미 성적이관 처리된 데이터입니다." 메시지
				util.Msg.alert("NLS-CGD-M018", [vnIdx]);
				return;
			}
		}
		
		// 해당 리피트 delete
		util.Grid.deleteRow(app, "grdCgdRecRcog");
	};
	
	/**
	 * @desc [btnRestore]작업취소 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 28
	 */
	moPage.onClick_BtnRestore = function() {
		// 해당 리피트 상태 초기화
		util.Grid.restoreRow(app, "grdCgdRecRcog");
	};
	
	/**
	 * @desc [btnSave]작업저장 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 28
	 */
	moPage.onClick_BtnSave = function() {
		// 작업저장
		doSave();
	};
	
	/**
	 * @desc 성적인정관리목록 변경사항 저장
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 28
	 */
	function doSave() {
		
		// 리피트 변경사항 체크
		if(!util.Grid.isModified(app, ["grdCgdRecRcog"], "MSG")){
			return false;
		}
		
		// 리피트 Validation Check
		if(!util.validate(app, "grdCgdRecRcog")) return false;
		
		// 교내인정항목 객체구분값 입력 시 교내인정항목 필수입력
		if(!moPage.checkNotNullRpt()){
			return false;
		}
		
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
	 * @desc 교내인정항목 객체구분값 입력 시 교내인정항목 필수입력 - (입력하지 않은 경우 이관처리시 오류가 발생함)
	 * @param 
	 * @return boolean
	 * @author 박갑수 at 2016. 3. 28
	 */
	moPage.checkNotNullRpt = function() {
		// 유효성 true or false
		var vbValid = true;
		
		var vsRptId = "rptCgdRecRcog"
		// 리피트 RowCnt
		var vnRowCnt 	= util.Grid.getRowCount(app, vsRptId);		
		// 리피트 인덱스
		var vnRptIndex 	= util.Grid.getIndex(app, vsRptId);
		
		for (var i = 1; i <= vnRowCnt; i++) {
			var vsUptStatus = util.Grid.getCellValue(app, vsRptId, "UPT_STATUS", i);
			// 변경이없거나 삭제일경우 Skip
			if (ValueUtil.isNull(vsUptStatus) || vsUptStatus == "D") continue;
			
			// 교내인정항목객체구분
			var vsIsriObjDivRcd = util.Grid.getCellValue(app, vsRptId, "ISRI_OBJ_DIV_RCD", i);
			if(!ValueUtil.isNull(vsIsriObjDivRcd)){
				// 교내인정항목명
				var vsIsriCdNm = util.Grid.getCellValue(app, vsRptId, "ISRI_CD_NM", i);
				if(ValueUtil.isNull(vsIsriCdNm)){
	
					// "교내인정항목 객체구분 입력시 교내인정항목은 필수 입력항목입니다." 메시지
					util.Msg.alert("NLS-CGD-M033");
					ExtRepeat.setColFocus(vsRptId, i, "rdIpbIsriCdNm");
					
					vbValid = false;
					return vbValid;
				}
			}
		}
	
		return vbValid;
	};
	
	/**
	 * @desc [btnTrsf]성적이관 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 28
	 */
	moPage.onClick_BtnTrsf = function() {
		// 변경사항저장여부 체크 
		if(util.Grid.isModified(app, "grdCgdRecRcog")){
			// '변경된 사항이 있습니다. 먼저 저장하시기 바랍니다.'
			ComMsg.warn(NLS.ABG.M043);
			return;
		}
		
//		if(ExtRepeat.isChangedData(["rptCgdRecRcog"])){
//			// "변경사항을 저장한 후 처리됩니다. 저장하시겠습니까?" 메시지
//			if(ComMsg.confirm("M035")== 1){
//				// 리피트 Validation Check
//				if(!ValidUtil.check("rptCgdRecRcog")) return false;
//				
//				// 교내인정항목 객체구분값 입력 시 교내인정항목 필수입력
//				if(!moPage.checkNotNullRpt()) return false;
//			}else {
//				
//				// "처리가 취소되었습니다." 메시지
//				Common.setMsgStatus(NLS.INF.M013);
//				return false;
//			}
//		}

		// 로우선텍 체크
		var vsIdx = util.Grid.getCheckOrSelectedRowIndex(app, "grdCgdRecRcog");
		if(ValueUtil.isNull(vsIdx)){
			// "성적이관할 데이터를 선택하세요." 메시지
			util.Msg.alert("NLS-CGD-M003");
			return;
		}
		
		// 성적이관
		var vsTrsfTitle = ExtControl.getTextValue("btnTrsf");
		// @을(를) 처리하시겠습니까?
		if(!util.Msg.confirm("NLS-CRM-M018", [vsTrsfTitle]) ){
			return;
		}
		
		var vaIdx = vsIdx.split(",");
		for(var i=0; i<vaIdx.length; i++){
			
			var vnIdx = vaIdx[i];
			var vsRecTrsfYn = util.Grid.getCellValue(app, "grdCgdRecRcog", "REC_TRSF_YN", vnIdx);
			// 이미 성적이관 처리된 데이터인지 확인
			if(ValueUtil.fixNull(vsRecTrsfYn) == "Y"){
				// @번째는 이미 성적이관 처리된 데이터입니다.
				util.Msg.alert("NLS-CGD-M018", [vnIdx]);
				return;
			}
			
			// 학년도, 학기, 합산학기, 시작일자, 종료일자, 인정성적단위, 객체구분, 인정성적명 필수 확인
			var vaReqCol 	 = ["SCH_YEAR_RCD", "SMT_RCD", "SUM_SMT_RCD", "ST_DT", "END_DT", "RCOG_REC_UNIT_RCD", "RCOG_REC_OBJ_DIV_RCD", "RCOG_REC_NM"];
			var vaReqHeader = ["rhBtnSchYearRcd", "rhBtnSmtRcd", "rhBtnSumSmtRcd", "rhBtnStDt", "rhBtnEndDt", "rhBtnRcogRecUnitRcd", "rhBtnRcogRecObjDivRcd", "rhBtnRcogRecNm"];
			var vaReqBody 	 = ["rdCbbSchYearRcd", "rdCbbSmtRcd", "rdCbbSumSmtRcd", "rdDipStDt", "rdDipEndDt", "rdCbbRcogRecUnitRcd", "rdCbbRcogRecObjDivRcd", "rdIpbRcogRecNm"];
			
			for(var j=0; j<vaReqCol.length; j++){
				var vsValue = util.Grid.getCellValue(app, "grdCgdRecRcog", vaReqCol[j], vnIdx);
				if(ValueUtil.isNull(vsValue)){
					var vsTitle = ExtControl.getTextValue(vaReqHeader[j]);
					
					// @ 번째줄에서 성적이관시 @ 항목은 필수입력입니다. 
					util.Msg.alert("NLS-CGD-M016", [vnIdx, vsTitle]);
					// 항목포커싱
					ExtRepeat.setColFocus("rptCgdRecRcog", vnIdx, vaReqBody[j]);
					
					return;
				}
			}
			
			util.Grid.setCellValue(app, "grdCgdRecRcog", "FLAG_TRANS", "!", vnIdx);
		}
		
		//strCommand: trans 
		util.Submit.send(app, "subTrans", function(pbSuccess){
			if(pbSuccess){
				doList(function(pbListSuccess) {
					// "저장되었습니다." 메시지
					if (pbListSuccess) util.Msg.notify(app, "NLS.INF.M001");
				});
			}else {
				// Exception 발생시 값 되돌림
				for(var i=0; i<vaIdx.length; i++){
					var vnIdx = vaIdx[i];
					
					var vcRpt = ExtControl.getControl("rptCgdRecRcog");
					var voDataSet = vcRpt.dataSet;
					
					util.Grid.setRowState(app, "grdCgdRecRcog", cpr.data.tabledata.RowState.UNCHANGED, vnIdx);
					voDataSet.restoreOriginVal(vnIdx);
				}
				
				util.DataMap.setValue(app, "dmRptPanel", "del_ckb", "");
				ExtRepeat.refresh("rptCgdRecRcog");
			}
		});
	};
	
	/**
	 * @desc [btnTrsfCls]성적이관취소 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 28
	 */
	moPage.onClick_BtnTrsfCls = function() {
		// 변경사항저장여부 체크 
		if(util.Grid.isModified(app, "grdCgdRecRcog")){
			// '변경된 사항이 있습니다. 먼저 저장하시기 바랍니다.'
			ComMsg.warn(NLS.ABG.M043);
			return;
		}
		
//		if(ExtRepeat.isChangedData(["rptCgdRecRcog"])){
//			// "변경사항을 저장한 후 처리됩니다. 저장하시겠습니까?" 메시지
//			if(ComMsg.confirm("M035")== 1){
//				// 리피트 Validation Check
//				if(!ValidUtil.check("rptCgdRecRcog")) return false;
//				
//				// 교내인정항목 객체구분값 입력 시 교내인정항목 필수입력
//				if(!moPage.checkNotNullRpt()) return false;
//			}else {
//				
//				// "처리가 취소되었습니다." 메시지
//				Common.setMsgStatus(NLS.INF.M013);
//				return false;
//			}
//		}

		// 로우선텍 체크
		var vsIdx = util.Grid.getCheckOrSelectedRowIndex(app, "grdCgdRecRcog");
		if(ValueUtil.isNull(vsIdx)){
			// "성적이관취소할 데이터를 선택하세요." 메시지
			util.Msg.alert("NLS-CGD-M019");
			return;
		}
		
		// 성적이관취소
		var vsTrsfClsTitle = ExtControl.getTextValue("btnTrsfCls");
		// @을(를) 처리하시겠습니까?
		if(!util.Msg.confirm("NLS-CRM-M018", [vsTrsfClsTitle]) ){
			return;
		}
		
		var vaIdx = vsIdx.split(",");
		for(var i=0; i<vaIdx.length; i++){
			
			var vnIdx = vaIdx[i];
			var vsRecTrsfYn = util.Grid.getCellValue(app, "grdCgdRecRcog", "REC_TRSF_YN", vnIdx);
			// 성적이관 처리된 데이터인지 확인
			if(ValueUtil.fixNull(vsRecTrsfYn) != "Y"){
				// "@번째는 성적이관된 데이터가 아닙니다. 이관 취소할 수 없습니다." 메시지
				util.Msg.alert("NLS-CGD-M020", [vnIdx]);
				return;
			}
			
			util.Grid.setCellValue(app, "grdCgdRecRcog", "FLAG_TRANS", "!", vnIdx);
		}
		
		//strCommand: transCancel 
		util.Submit.send(app, "subTrans", function(pbSuccess){
			if(pbSuccess){
				doList(function(pbListSuccess) {
					// "저장되었습니다." 메시지
					if (pbListSuccess) util.Msg.notify(app, "NLS.INF.M001");
				});
			}else {
				// Exception 발생시 값 되돌림
				for(var i=0; i<vaIdx.length; i++){
					var vnIdx = vaIdx[i];
					
					var vcRpt = ExtControl.getControl("rptCgdRecRcog");
					var voDataSet = vcRpt.dataSet;
					
					util.Grid.setRowState(app, "grdCgdRecRcog", cpr.data.tabledata.RowState.UNCHANGED, vnIdx);
					voDataSet.restoreOriginVal(vnIdx);
				}
				
				util.DataMap.setValue(app, "dmRptPanel", "del_ckb", "");
				ExtRepeat.refresh("rptCgdRecRcog");
			}
		});
	};
	
	/**
	 * @desc [rptCgdRecRcog]성적인정관리목록 onRowSelect 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 28
	 */
	moPage.onRowSelect_RptCgdRecRcog = function() {
//TO-BE: <ExtControl.refreshBind> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtControl.refreshBind(["bindRecTrsfYn", "bindRecNm"]);
	};
	
	/**
	 * @desc [rdCbbRcogRecObjDivRcd]객체구분 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 28
	 */
	moPage.onValueChanged_RdCbbRcogRecObjDivRcd = function() {
//TO-BE: <ExtControl.refreshBind> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtControl.refreshBind(["bindObjDivRcd"]);
		
		// 인정성적명, 인정성적코드 초기화
		util.Grid.setCellValue(app, "grdCgdRecRcog", "RCOG_REC_NM", "");
		util.Grid.setCellValue(app, "grdCgdRecRcog", "RCOG_REC_CD", "");
		
		util.Grid.setCellValue(app, "grdCgdRecRcog", "SCH_YEAR_RCD", util.DataMap.getValue(app, "dmKeyDateMap", "YEAR"));
		util.Grid.setCellValue(app, "grdCgdRecRcog", "SMT_RCD", "");
		util.Grid.setCellValue(app, "grdCgdRecRcog", "SUM_SMT_RCD", "");
		util.Grid.setCellValue(app, "grdCgdRecRcog", "ST_DT", util.DataMap.getValue(app, "dmKeyDateMap", "ST_DT"));
		util.Grid.setCellValue(app, "grdCgdRecRcog", "END_DT", util.DataMap.getValue(app, "dmKeyDateMap", "END_DT"));
		
		util.Grid.setCellValue(app, "grdCgdRecRcog", "REQ_PNT", 0);
		util.Grid.setCellValue(app, "grdCgdRecRcog", "GET_PNT", 0);
		util.Grid.setCellValue(app, "grdCgdRecRcog", "EST_PNT", 0);
		
		util.Grid.setCellValue(app, "grdCgdRecRcog", "CMP_DIV_RCD", "");
		util.Grid.setCellValue(app, "grdCgdRecRcog", "RCOG_REC_UNIT_RCD", "");
		util.Grid.setCellValue(app, "grdCgdRecRcog", "REC_NM", "");
		
		var vsRcogRecObjDivRcd = util.Grid.getCellValue(app, "grdCgdRecRcog", "RCOG_REC_OBJ_DIV_RCD");
		// 외부교과목[CC009OS]이 아닐경우 - 교내인정항목 초기화
		if(vsRcogRecObjDivRcd != "CC009OS"){
			util.Grid.setCellValue(app, "grdCgdRecRcog", "ISRI_CD", "");
			util.Grid.setCellValue(app, "grdCgdRecRcog", "ISRI_CD_NM", "");
			util.Grid.setCellValue(app, "grdCgdRecRcog", "ISRI_OBJ_DIV_RCD", "");
		}
	};
	
	/**
	 * @desc [rdCbbCmpDivRcd]이수구분 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 28
	 */
	moPage.onValueChanged_RdCbbCmpDivRcd = function() {
		// 학문분야명, 학문분야코드 초기화
		util.Grid.setCellValue(app, "grdCgdRecRcog", "DCL_RCD_NM", "");
		util.Grid.setCellValue(app, "grdCgdRecRcog", "DCL_RCD", "");
	};
	
	/**
	 * @desc [rdIpbReqPnt]신청학점 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 28
	 */
	moPage.onValueChanged_RdIpbReqPnt = function() {
		ValidUtil.checkIntegerDecimal("rdIpbReqPnt", 3, 2, true);
	};
	
	/**
	 * @desc [rdIpbGetPnt]취득학점 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 28
	 */
	moPage.onValueChanged_RdIpbGetPnt = function() {
		ValidUtil.checkIntegerDecimal("rdIpbGetPnt", 3, 2, true);
		
		//--취득학점을 평가학점으로 복사한다.
		var vsGetPnt = util.Grid.getCellValue(app, "grdCgdRecRcog", "GET_PNT");
		util.Grid.setCellValue(app, "grdCgdRecRcog", "EST_PNT", vsGetPnt, null);
	};
	
	/**
	 * @desc [rdIpbEstPnt]평가학점 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 28
	 */
	moPage.onValueChanged_RdIpbEstPnt = function() {
		ValidUtil.checkIntegerDecimal("rdIpbEstPnt", 3, 2, true);
	};

	/**
	 * @desc [rdCbbIsriObjDivRcd]객체구분 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 28
	 */
	moPage.onValueChanged_RdCbbIsriObjDivRcd = function() {
		// 교내인정항목명, 교내인정항목코드 초기화
		util.Grid.setCellValue(app, "grdCgdRecRcog", "ISRI_CD_NM", "");
		util.Grid.setCellValue(app, "grdCgdRecRcog", "ISRI_CD", "");
	};
	
	/**
	 * @desc [rdCbbSchYearRcd]학년도 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 28
	 */
	moPage.onValueChanged_RdCbbSchYearRcd = function() {
		// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
		doChangeYearSmt();
	};
	
	/**
	 * @desc [rdCbbSmtRcd]학기 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 28
	 */
	moPage.onValueChanged_RdCbbSmtRcd = function() {
		
		//--학기를 합산학기로 복사한다.
		var vsSmt = util.Grid.getCellValue(app, "grdCgdRecRcog", "SMT_RCD");
		util.Grid.setCellValue(app, "grdCgdRecRcog", "SUM_SMT_RCD", vsSmt, null);
		
		
		// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
		doChangeYearSmt();
	};
	
	/**
	 * @desc 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 28
	 */
	function doChangeYearSmt() {
		var vsYear = util.Grid.getCellValue(app, "grdCgdRecRcog", "SCH_YEAR_RCD");
		var vsSmt = util.Grid.getCellValue(app, "grdCgdRecRcog", "SMT_RCD");

		// 학년도 학기가 모두 입력되어있을경우만 조회
		if(!ValueUtil.isNull(vsYear) && !ValueUtil.isNull(vsSmt)){
			
			//--정규학기, 계절학기가 아닐 경우 1학기로 전달한다.
			if(vsSmt  != 'CA00390' && vsSmt  != 'CA00391' && vsSmt  != 'CA00392' && vsSmt  != 'CA00393'){
				vsSmt = 'CA00390';
			}
			
			
			util.DataMap.setValue(app, "dmResDateMap", "YEAR", vsYear);
			util.DataMap.setValue(app, "dmResDateMap", "SMT", vsSmt);
			
			//strCommand: date 
			util.Submit.send(app, "subDate", function(pbSuccess){
				if(pbSuccess){
					var vsStDt = util.DataMap.getValue(app, "dmResDateMap", "ST_DT");
					var vsEndDt = util.DataMap.getValue(app, "dmResDateMap", "END_DT");
					
					util.Grid.setCellValue(app, "grdCgdRecRcog", "ST_DT", vsStDt);
					util.Grid.setCellValue(app, "grdCgdRecRcog", "END_DT", vsEndDt);
					
				// Exception 발생시
				}else {
					// 현재 학년도 학기로 다시 세팅
					var vsSchYearRcd = util.DataMap.getValue(app, "dmKeyDateMap", "YEAR");
					var vsSmt = util.DataMap.getValue(app, "dmKeyDateMap", "SMT");
					var vsStDt = util.DataMap.getValue(app, "dmKeyDateMap", "ST_DT");
					var vsEndDt = util.DataMap.getValue(app, "dmKeyDateMap", "END_DT");
					
					util.Grid.setCellValue(app, "grdCgdRecRcog", "SCH_YEAR_RCD", vsSchYearRcd);
					util.Grid.setCellValue(app, "grdCgdRecRcog", "SMT_RCD", vsSmt);
					util.Grid.setCellValue(app, "grdCgdRecRcog", "ST_DT", vsStDt);
					util.Grid.setCellValue(app, "grdCgdRecRcog", "END_DT", vsEndDt);
				}
			});
		}
	};
	
	/**
	 * @desc [rdBtnDclRcdNm]학문분야 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 28
	 */
	moPage.onClick_RdBtnDclRcdNm = function(sender) {
		// 학문분야검색팝업 호출
		doOnClickStdCcsPDclExtendPopup(sender);
	};
	
	/**
	 * @desc [rdBtnRcogRecNm]인정성적 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 28
	 */
	moPage.onClick_RdBtnRcogRecNm = function(sender) {
		var vsRcogRecObjDivRcd = util.Grid.getCellValue(app, "grdCgdRecRcog", "RCOG_REC_OBJ_DIV_RCD");
		
		// 객체구분이 입력되었는지 확인
		if(ValueUtil.isNull(vsRcogRecObjDivRcd)){
			// "객체구분을 선택하세요." 메시지 
			util.Msg.alert("NLS-CGD-M005");
			return;
		}
		
		// 객체구분값에따른 팝업 분기처리
		// 외부교과목[CC009OS]
		if(vsRcogRecObjDivRcd == "CC009OS"){
			// 외부교과목검색 팝업 호출
			doOnClickStdCgdPCosPopup(sender);
		
		// 성적인정항목[CC009RR]
		}else if(vsRcogRecObjDivRcd == "CC009RR"){
			// 성적인정항목검색 팝업 호출
			doOnClickStdCgdPRrPopup(sender);
		
		// 내부교과목[CC009SB]
		}else if(vsRcogRecObjDivRcd == "CC009SB"){
			// 교과목검색 팝업 호출
			doOnClickStdCcsPSubPopup(sender);
		}
	};

	/**
	 * @desc [rdBtnRcogRecNm]인정성적 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 28
	 */
	moPage.onValueChanged_RdIpbRcogRecNm = function(sender) {
		var vsRcogRecObjDivRcd = util.Grid.getCellValue(app, "grdCgdRecRcog", "RCOG_REC_OBJ_DIV_RCD");
		
		var vsRcogRecNm = util.Grid.getCellValue(app, "grdCgdRecRcog", "RCOG_REC_NM");
		
		// 객체구분이 입력되었는지 확인
		if(ValueUtil.isNull(vsRcogRecObjDivRcd) && !ValueUtil.isNull(vsRcogRecNm)){
			// "객체구분을 선택하세요." 메시지 
			util.Msg.alert("NLS-CGD-M005");
			return;
		}
		
		// 객체구분값에따른 팝업 분기처리
		// 외부교과목[CC009OS]
		if(vsRcogRecObjDivRcd == "CC009OS"){
			// 외부교과목검색 팝업 호출
			doOnChangeStdCgdPCosPopup(sender);
		
		// 성적인정항목[CC009RR]
		}else if(vsRcogRecObjDivRcd == "CC009RR"){
			// 성적인정항목검색 팝업 호출
			doOnChangeStdCgdPRrPopup(sender);
		
		// 내부교과목[CC009SB]
		}else if(vsRcogRecObjDivRcd == "CC009SB"){
			// 교과목검색 팝업 호출
			doOnChangeStdCcsPSubPopup(sender);
		}
	};
	
	/**
	 * @desc [rdBtnIsriCdNm]교내인정항목 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 28
	 */
	moPage.onClick_RdBtnIsriCdNm = function(sender) {
		var vsIsriObjDivRcd = util.Grid.getCellValue(app, "grdCgdRecRcog", "ISRI_OBJ_DIV_RCD");
		
		// 교내인정항목 객체구분이 입력되었는지 확인
		if(ValueUtil.isNull(vsIsriObjDivRcd)){
			// "교내인정항목 객체구분을 선택하세요." 메시지 
			util.Msg.alert("NLS-CGD-M022");
			return;
		}
		
		// 교내인정항목 객체구분값에따른 팝업 분기처리
		// 성적인정항목[CC009RR]
		if(vsIsriObjDivRcd == "CC009RR"){
			// 성적인정항목검색 팝업 호출
			doOnClickStdCgdPRrPopup(sender);
		// 내부교과목[CC009SB]
		}else if(vsIsriObjDivRcd == "CC009SB"){
			// 교과목검색 팝업 호출
			doOnClickStdCcsPSubPopup(sender);
		}
	};
	
	/**
	 * @desc [rdBtnIsriCdNm]교내인정항목 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 28
	 */
	moPage.onValueChanged_RdIpbIsriCdNm = function(sender) {
		var vsIsriObjDivRcd = util.Grid.getCellValue(app, "grdCgdRecRcog", "ISRI_OBJ_DIV_RCD");
		
		var vsIsriCdNm = util.Grid.getCellValue(app, "grdCgdRecRcog", "ISRI_CD_NM");
		
		// 교내인정항목 객체구분이 입력되었는지 확인
		if(ValueUtil.isNull(vsIsriObjDivRcd) && !ValueUtil.isNull(vsIsriCdNm)){
			// "교내인정항목 객체구분을 선택하세요." 메시지 
			util.Msg.alert("NLS-CGD-M022");
			return;
		}
		
		// 교내인정항목 객체구분값에따른 팝업 분기처리
		// 성적인정항목[CC009RR]
		if(vsIsriObjDivRcd == "CC009RR"){
			// 성적인정항목검색 팝업 호출
			doOnChangeStdCgdPRrPopup(sender);
		// 내부교과목[CC009SB]
		}else if(vsIsriObjDivRcd == "CC009SB"){
			// 교과목검색 팝업 호출
			doOnChangeStdCcsPSubPopup(sender);
		}
	};
	
	/**
	 * @desc [rdCbbRcogRecUnitRcd]인정성적단위 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 28
	 */
	moPage.onValueChanged_RdCbbRcogRecUnitRcd = function() {
		// 인정성적단위 : 100점만점[CD10904], 기타만점[CD10906]
		var vsRcogRecUnitRcd = util.Grid.getCellValue(app, "grdCgdRecRcog", "RCOG_REC_UNIT_RCD");
		if(ValueUtil.fixNull(vsRcogRecUnitRcd) != "CD10904" && ValueUtil.fixNull(vsRcogRecUnitRcd) != "CD10906" && !ValueUtil.isNull(vsRcogRecUnitRcd)){
		
//TO-BE: <ExtControl.refreshBind> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//			ExtControl.refreshBind(["bindRecNm"]);
			// 인정성적단위 팝업 호출
			doOpenRcogRecUnitRcd(vsRcogRecUnitRcd);
		}else{
			/*
			100점만점을 선택 시 [인정성적]을 초기화 한다.
			*/			
			if("CD10904" == vsRcogRecUnitRcd){
				util.Grid.setCellValue(app, "grdCgdRecRcog", "REC_NM", "", null);
			}
		}
	};
	
	/**
	 * @desc 인정성적단위 팝업 호출
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 30
	 */
	function doOpenRcogRecUnitRcd(psRcogRecUnitRcd){
		// 인정성적 초기화
		util.Grid.setCellValue(app, "grdCgdRecRcog", "REC_NM", "");
		util.Grid.setCellValue(app, "grdCgdRecRcog", "RCOG_REC", "");
		
		// 인정성적단위 용도1코드 : 성적스케일코드[CD101]
		var vsUnitRcdCdPrp1 = ExtInstance.getValue("/root/resOnLoad/rcogRecUnitRcdList/row", "CD_PRP1" , "child::CD='"+psRcogRecUnitRcd+"'");
		var vsCdNm = ExtInstance.getValue("/root/resOnLoad/rcogRecUnitRcdList/row", "CD_NM" , "child::CD='"+psRcogRecUnitRcd+"'");
		
		// 성적스케일 용도1코드 : 성적단위코드
		var vsCdPrp1 = ExtInstance.getValue("/root/resOnLoad/recCiiRcdList/row", "CD_PRP1" , "child::CD='"+vsUnitRcdCdPrp1+"'");
		moIdsForRcogRecUnitRcd.iCd = vsCdPrp1;
		moIdsForRcogRecUnitRcd.iCdNm = vsCdNm;
		
		ExtPopUp.openLayeredPopup("/xtm/cgd/stdCgdPRcogRecUnitRcd.xtm", 170, 300);	
	};
	
	/**
	 * @desc 성적등급 팝업 콜백함수
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 30
	 */
	moPage.callbackRcogRecUnitRcdPopup= function(paRtnValue){
		// [0]코드, [1]코드명
		var vnIdx = util.Grid.getIndex(app, "grdCgdRecRcog");
		
		util.Grid.setCellValue(app, "grdCgdRecRcog", "RCOG_REC", paRtnValue[0], vnIdx);
		util.Grid.setCellValue(app, "grdCgdRecRcog", "REC_NM", paRtnValue[1], vnIdx);
		
		
		// "선택한 성적등급은 @ 입니다." 헤더 메시지 표시
		
		util.Msg.notify(app, "NLS.CGD.M010", [paRtnValue[1]]);
		
		if (paRtnValue[1].endsWith("F")) {
			util.Grid.setCellValue(app, "grdCgdRecRcog", "GET_PNT", "0", vnIdx);
			util.Grid.setCellValue(app, "grdCgdRecRcog", "EST_PNT", "0", vnIdx);
		}else {
//			ExtRepeat.setValue("rptCgdRecRcog", "GET_PNT", "0", vnIdx);
//			ExtRepeat.setValue("rptCgdRecRcog", "EST_PNT", "0", vnIdx);
		}
		
		
		
		
	};

	/**
	 * @desc [rdIpbRecNm]인정성적 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 30
	 */
	moPage.onValueChanged_RdIpbRecNm = function() {
		// 인정성적단위 : 100점만점[CD10904], 기타만점[CD10906]
		var vsRcogRecUnitRcd = util.Grid.getCellValue(app, "grdCgdRecRcog", "RCOG_REC_UNIT_RCD");
		var vsRecNm = util.Grid.getCellValue(app, "grdCgdRecRcog", "REC_NM");
		if(ValueUtil.fixNull(vsRcogRecUnitRcd) != "CD10904" && ValueUtil.fixNull(vsRcogRecUnitRcd) != "CD10906" && !ValueUtil.isNull(vsRcogRecUnitRcd)){
			if(ValueUtil.isNull(vsRecNm)){
				// 인정성적단위 팝업 호출
				doOpenRcogRecUnitRcd(vsRcogRecUnitRcd);
			}
		}else {
			util.Grid.setCellValue(app, "grdCgdRecRcog", "RCOG_REC", vsRecNm);
		}
	};
	
	/**
	 * @desc [rdBtnExhPgmIdNm]교환프로그램 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 30
	 */
	moPage.onClick_RdBtnExhPgmIdNm = function() {
		var vsStudId = util.DataMap.getValue(app, "dmReqKey", "strStudId");
		moIdsForExhPgmId.iStudId = vsStudId;
		
		ExtPopUp.openLayeredPopup("/xtm/cgd/stdCgdPExhPgmId.xtm", 700, 280);	
	};
	
	/**
	 * @desc 교환학생검색 팝업 콜백함수
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 30
	 */
	moPage.callbackExhPgmIdPopup= function(paRtnValue){
		// [0]교환프로그램Id, [1]교환프로그램명
		var vnIdx = util.Grid.getIndex(app, "grdCgdRecRcog");
		util.Grid.setCellValue(app, "grdCgdRecRcog", "EXH_PGM_ID", paRtnValue[0], vnIdx);
		util.Grid.setCellValue(app, "grdCgdRecRcog", "EXH_PGM_ID_NM", paRtnValue[1], vnIdx);
		// "선택한 교환 프로그램은 @ 입니다." 헤더 메시지 표시
		util.Msg.notify(app, "NLS.CGD.M013", [paRtnValue[1]]);
	};
	
	/**
	 * @desc [rdCbbRcogRecPrpRcd]인정성적용도 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 30
	 */
	moPage.onValueChanged_RdCbbRcogRecPrpRcd = function() {
//TO-BE: <ExtControl.refreshBind> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtControl.refreshBind(["bindRcogRecPrpRcd"]);
		// 교환프로그램 초기화
		util.Grid.setCellValue(app, "grdCgdRecRcog", "EXH_PGM_ID", "");
		util.Grid.setCellValue(app, "grdCgdRecRcog", "EXH_PGM_ID_NM", "");
	};
	
	return moPage;
};
