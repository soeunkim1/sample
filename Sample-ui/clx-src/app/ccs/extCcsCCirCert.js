//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCcsCCirCert.xtm"/>

/**
 * 개설분반관리
 * @class extCcsCTlsnDivclsMng
 * @author 박갑수 at 2016. 4. 25
 */
var extCcsCCirCert = function() {
	var moPage = new Page();
	
	// 임포트용 데이터 통신 오브젝트
	var moPObject = new Page();
	
	
	// 교직원 검색
	moPObject.moIdsForStdCmnPPrsnSearch = [
	{
		 controlId					: "rdBtnProfObjNo",
		 istrStaffGrpAuth			: "",					
		 istrWkdtyAuth			: "true",				
		 iKeyDate					: "",	
		 iStaffNo					: "rdIpbProfObjNm",			
		 iStaffGrpRcd				: "",		
		 iStaffGrpRcdLock		: "", 			
		 iStaffSubGrpRcd		: "",	
		 iStaffSubGrpRcdLock	: "",				
		 iStatusRcd				: "",				
		 iRepNm					: "",				
		 iObjDivRcd				: "",
		 iObjCd						: "",				
		 iObjNm					: "",	
		 istrObjCdInList			: "",
		 iWkgrdRcd				: "",	
		  
		 oObjNo					: "rdOutProfObjNo",
		 oStaffNo					: "rdOutPutObjNo",					
		 oRepNm					: "rdIpbProfObjNm",					
		 oBirthday					: "",					
		 oStatNm					: "",				
		 oStatRcd					: "",					
		 oOgNm					: "rdProfOgNm",				
		 oOgCd						: "",				
		 oPosNm					: "",				
		 oPosCd					: "",				
		 oWkgrdNm				: "arewkGrdNm",			
		 oWkgrdRcd				: "",				
		 oStaffGrpRcd				: "",					
		 oStaffSubGrpRcd		: "ipbStaffSubGrpRcd",				
		 oHoRcd					: "",					
		 oSsn						: "",					
		 oWkdtyRcd				: "",					
		 oWkdtyNm				: "",				
		 func                         : function(poRtnValue){
			 
			
			/*
				외래강사를 선택 하였을 경우 종료일자를 넣어준다.
			*/
			var vsLectEndDt    = "";
			if(poRtnValue != null && poRtnValue.Result != null ){
				if(poRtnValue.Result.strStaffSubGrpRcd == "CF00340"){
					vsLectEndDt    = util.DataMap.getValue(app, "dmResOnLoad", "strLectEndDt");		
					util.Grid.setCellValue(app, "grdMain", "END_DT"     , vsLectEndDt     , poRtnValue.rptRowIdx);
				}else{
					vsLectEndDt    = util.DataMap.getValue(app, "dmKeyDateMapRpt", "END_DT");		
					util.Grid.setCellValue(app, "grdMain", "END_DT"     , vsLectEndDt     , poRtnValue.rptRowIdx);
				}
			}
			
			
			
		
			if(poRtnValue.Result.strObjNo != null && poRtnValue.Result.strObjNo != ""){
				util.DataMap.setValue(app, "dmReqKey", "strProfObjNo", poRtnValue.Result.strObjNo);
				page.doProfList(true, poRtnValue.rptRowIdx);
			}else{
				page.doProfList(false, poRtnValue.rptRowIdx);
			}
			
		 }
	}];
	
	
	
	// 교과목검색팝업 호출
	moPObject.moIdsForStdCcsPSubPopup = [
	{
		 controlId					: "btnSbCd",			
		 iEndYn						: "",						
		 iLanDivRcd				: "",					
		 iKeyDate					: "/root/keyDateMap/END_DT",		
		 iSbCd						: "",			
		 iSbNm						: "ipbSbNm",
		 iCmpDivRcd				: "", 			
		 iSpvsDeptCd				: "",		
		 iSpvsDeptNm			: "",		
		 iObjDivRcd				: "",
		 oSbCd						: "ipbSbCd",			
		 oObjDivRcd				: "",			
		 oStDt						: "",			
		 oEndDt						: "",			
		 oLanDivRcd				: "",			
		 oRefKey					: "",			
		 oSbNm					: "ipbSbNm",			
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
			
			if(poParam.Result.SB_CD != null && poParam.Result.SB_CD != ""){
				util.DataMap.setValue(app, "dmReqKey", "strSbCd", poParam.Result.SB_CD);
				page.doProfList(true, poParam.rptRowIdx);
			}else{
				page.doProfList(false, poParam.rptRowIdx);
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
	 * @author 박갑수 at 2016. 4. 25
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		// import 헤더 초기화
		doHeaderOnLoad();
	};
	
	/**
	 * @desc onLoad 실행
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 25
	 */
	moPage.onModelConstructDone_ExtCcsCTlsnDivclsMng = function() {
		// 리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["rptMain"]);
		// 검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grpData"]);
		
		// 서브미션 호출
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				
				util.Control.redraw(app, ["cbbSchYearRcd", "cbbSmtRcd", "cbbWkdtyRcd", "ipbLectEndDt"]);
				util.SelectCtl.selectItem(app, "cbbWkdtyRcd", 0);
				
				var vsLectEndDt = util.DataMap.getValue(app, "dmResOnLoad", "strLectEndDt");
				if(vsLectEndDt == ""){
					alert("학사일정에 종강일자가 등록되어 있지 않습니다.");
				}
				
				
			}
		}, true);
	};
	
	/**
	 * @desc [cbbSchYearRcd]학년도 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 25
	 */
	moPage.onValueChanged_CbbSchYearRcd = function() {
		// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
		doChangeYearSmt("year");
		
		// 검색조건을 초기화
		doClearSchCtl();
	};
	
	/**
	 * @desc [cbbSmtRcd]학기 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 25
	 */
	moPage.onValueChanged_CbbSmtRcd = function() {
		// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
		doChangeYearSmt("smt");
		
		// 검색조건을 초기화
		doClearSchCtl();
	};
	
	/**
	 * @desc 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 25
	 */
	function doChangeYearSmt(psDiv) {
		
		var vsYear = util.DataMap.getValue(app, "dmKeyDateMap", "YEAR");
		var vsSmt  = util.DataMap.getValue(app, "dmKeyDateMap", "SMT");
		
		if(vsYear == "" || vsSmt == "") return;
		
		//strCommand: date 
		util.Submit.send(app, "subDate", function(pbSuccess){
			if(pbSuccess){				
				msSchYearRcd = util.DataMap.getValue(app, "dmKeyDateMap", "YEAR");
				msSmtRcd = util.DataMap.getValue(app, "dmKeyDateMap", "SMT");
				var vsLectEndDt = util.DataMap.getValue(app, "dmResOnLoad", "strLectEndDt");
				if(vsLectEndDt == ""){
					alert("학사일정에 종강일자가 등록되어 있지 않습니다.");
				}
				
				util.Control.redraw(app, ["ipbLectEndDt"]);
				
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
	 * @desc 학년도 학기 변경시 검색조건을 초기화 한다.
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 25
	 */
	function doClearSchCtl() {
	};
	
	 /**
	 * @desc [btnProfObjNo]교수명 onKeyDown 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 10. 7
	 */
	moPage.onKeyDown_IpbProfNm = function(strKeyType, strKeyStatus) {
		var vsSchYearRcd = util.Control.getValue(app, "cbbSchYearRcd");
		var vsSmtRcd = util.Control.getValue(app, "cbbSmtRcd");
		
		if(!ValueUtil.isNull(vsSchYearRcd) && !ValueUtil.isNull(vsSmtRcd)){
			// 엔터키 입력시 조회
			if(e.keyCode == cpr.events.KeyCode.ENTER){
				util.Header.clickSearch(app);
			}
		}
	};
	
	/**
	 * @desc [btnSearch]조회 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 25
	 */
	moPage.onClick_BtnSearch = function() {
		 // 작업영역 리피트 변경 내역 체크
		if(util.Grid.isModified(app, "", "CRM")){
			return false;
		}
		
		// 조회조건 필수 체크
		if(!util.validate(app, ["cbbSchYearRcd", "cbbSmtRcd"])){
			return false;
		}
		
		var vsYear  				=	util.DataMap.getValue(app, "dmKeyDateMap", "YEAR");
		var vsSmt					= 	util.DataMap.getValue(app, "dmKeyDateMap", "SMT");
		var vsStaffSubGrpRcd	= 	util.DataMap.getValue(app, "dmReqKey", "strStaffSubGrpRcd");
		var vsProfNm				= 	util.DataMap.getValue(app, "dmReqKey", "strProfNm");
		
		if( (vsYear == "" || vsSmt == "") && vsStaffSubGrpRcd == "" && vsProfNm == ""){
			alert("검색조건 한가지는 선택 해야 합니다. \n[ (학년도,학기), 교직원하위그룹, 교수명 ]");
			return;
		}
		

		// 조회
		doList(function(pbSuccess) {
			// 조회 : "조회되었습니다." header 메세지 표시
			if (pbSuccess) util.Msg.notify(app, "NLS.INF.M024");
		});
	};
	
	/**
	 * @desc 학과별 반편성 목록 조회
	 * @param {Function} poCallBackFunc 콜백정의
	 * @return void
	 * @author 박갑수 at 2016. 4. 25
	 */
	function doList(poCallBackFunc) {
		
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
	 * @desc 교직원번호 검색 후 강의시수내역을 가져와 설정한다.
	 * @param {Function} poCallBackFunc 콜백정의
	 * @return void
	 * @author 박갑수 at 2016. 4. 25
	 */
	function doProfList(vpBool, rptRowIdx) {
		
		var vsSchYearRcd 	= util.Grid.getCellValue(app, "grdMain", "SCH_YEAR_RCD"     , rptRowIdx);
		var vsSmtRcd 		= util.Grid.getCellValue(app, "grdMain", "SMT_RCD"     , rptRowIdx);
		var vsObjNo 			= util.Grid.getCellValue(app, "grdMain", "OBJ_NO"     , rptRowIdx);
		var vsSbCd 			= util.Grid.getCellValue(app, "grdMain", "SB_CD"     , rptRowIdx);
		
		
		 
		if(vpBool){
				
				if(vsSchYearRcd != "" &&  vsSmtRcd != "" && vsObjNo != "" && vsSbCd != ""){
			
					//strCommand: profList 
					util.Submit.send(app, "subProfList", function(pbSuccess){
						if(pbSuccess){
							
							var vsLectCnt	= util.DataMap.getValue(app, "dmResList", "strLectCnt");
							
							util.Grid.setCellValue(app, "grdMain", "TIME_CNT"     , vsLectCnt     , rptRowIdx);
							
							
						}
					});
				}
		}else{
			util.Grid.setCellValue(app, "grdMain", "TIME_CNT"     , "0"  , rptRowIdx);
			
		}
	};
	
	
	
	/**
	 * @desc [btnNew]신규 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 25
	 */
	moPage.onClick_BtnNew = function() {
		// 해당 리피트 insert 후 편집 시작할 컬럼 지정
		var vnIdx = util.Grid.insertRow(app, "grdMain", "rdIpbProfObjNm");
		
		// 신규 Defalut값 설정 
		// 학년도 : 조회조건
		var vsSchYearRcd 	= util.Control.getValue(app, "cbbSchYearRcd");
		var vsSmtRcd 		= util.Control.getValue(app, "cbbSmtRcd");
		var vsStDt				= util.DataMap.getValue(app, "dmKeyDateMap", "ST_DT");
		var vsEndDt			= util.DataMap.getValue(app, "dmKeyDateMap", "END_DT");
		
		if(vsSchYearRcd != ""){
			util.Grid.setCellValue(app, "grdMain", "SCH_YEAR_RCD", vsSchYearRcd, vnIdx);
		}
		
		if(vsSmtRcd != ""){
			util.Grid.setCellValue(app, "grdMain", "SMT_RCD", vsSmtRcd, vnIdx);
		}
		
		
		if(vsSchYearRcd != "" && vsSmtRcd != ""){
			page.onValueChanged_rptSchYearRcd();
		}
		
		
		
		
		
	};
	
	/**
	 * @desc [btnDel]삭제 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 25
	 */
	moPage.onClick_BtnDel = function() {
		// 해당 리피트 delete
		util.Grid.deleteRow(app, "grdMain");
	};
	
	/**
	 * @desc [btnRestore]작업취소 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 25
	 */
	moPage.onClick_BtnRestore = function() {
		// 해당 리피트 상태 초기화
		util.Grid.restoreRow(app, "grdMain");
	};
	
	/**
	 * @desc [btnSave]작업저장 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 25
	 */
	moPage.onClick_BtnSave = function() {
		// 작업저장
		doSave();
	};
	
	/**
	 * @desc 학과별 반편성 목록 변경사항 저장
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 25
	 */
	function doSave() {
		
		// 리피트 변경사항 체크
		if(!util.Grid.isModified(app, ["grdMain"], "MSG")){
			return false;
		}
		
		// 리피트 Validation Check
		if(!util.validate(app, "grdMain")) return false;

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
	 * @desc [btnSaDivclsBat]학과별반정보일괄생성 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 25
	 */
	moPage.onClick_BtnSaDivclsBat = function() {
		
		page.doSaveByBatch();		
		
	};
	
	
	function doSaveByBatch(psStep){
		
		
		
		if(ValueUtil.isNull(psStep)){
			psStep = "0";
		}
		
		var vsSchYearRcd 	= util.DataMap.getValue(app, "dmKeyDateMap", "YEAR");
		var vsSmtRcd		= util.DataMap.getValue(app, "dmKeyDateMap", "SMT");
		var vsSchYearRcdNm	= ExtInstance.getValue("/root/resOnLoad/schYearRcdList/row", "CD_NM" , "child::CD= '"+vsSchYearRcd+"'");
		var vsSmtRcdNm	= ExtInstance.getValue("/root/resOnLoad/smtRcdList/row", "CD_NM" , "child::CD= '"+vsSmtRcd+"'");
		var vsStaffSubGrpRcd	= util.DataMap.getValue(app, "dmReqKey", "strStaffSubGrpRcd");
		var vsLectEndDt			= util.DataMap.getValue(app, "dmResOnLoad", "strLectEndDt");
		
		
		if(vsSchYearRcd == "" || vsSmtRcd == ""){
			alert("검색조건 학년도, 학기를 선택 하시기 바랍니다.");
			return;
		}
		
		
		if("CF00340" == vsStaffSubGrpRcd || "" == vsStaffSubGrpRcd){
			if("" == vsLectEndDt){
				alert("시간강사의 경우 종강일자가 필요합니다.");
				return;
			}
		}
		
		
		util.DataMap.setValue(app, "dmReqKey", "strSchYearRcdNm", vsSchYearRcdNm);
		util.DataMap.setValue(app, "dmReqKey", "strSmtRcdNm", vsSmtRcdNm);
		
		util.DataMap.setValue(app, "dmReqKey", "strStep", psStep);
		//strCommand: saveByBatch 
		util.Submit.send(app, "subSaveByBatch", function(pbSuccess){
			if(pbSuccess){
				var vsMsg = util.DataMap.getValue(app, "dmResList", "strMsg");
				if(!ValueUtil.isNull(vsMsg)){
					if(util.Msg.confirm("NLS-CRM-M034", [vsMsg]) ){
						var vsStep = util.DataMap.getValue(app, "dmReqKey", "strStep");
						return page.doSaveByBatch(vsStep);
					}else{
						return false;
					}
				}else{
					// 처리되었습니다.
					util.Msg.alert("NLS-INF-M003");
					page.doList("save");
				}			
			}
		});
		
	}
	
	/**
	 * @desc [rhCkbSelect]패널 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 25
	 */
	moPage.onValueChanged_RhCkbSelect = function() {
		// 리피트 패널 설정
//TO-BE: <ExtRepeat.selectedAllPanel> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.selectedAllPanel("rhCkbSelect");
	};
	
	/**
	 * @desc [rdIpbSaNm]학사부서 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 25
	 */
	
//	moPage.onValueChanged_RdIpbSaNm = function(sender) {
//		// 값변경시 객체검색팝업 호출
//		doOnChangeStdCmnPObjSch(sender);
//	};
	
	
	/**
	 * @desc 교직원검색 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 25
	 */
	moPage.onClick_RdBtnSaNm = function(sender) {
		// 객체검색팝업 호출
		doOnClickStdCmnPPrsnSearch(sender);
	};
	
	/**
	 * @desc 교직원검색 onChang 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 25
	 */
	moPage.onValueChanged_RdIpbProfObjNm = function(sender) {
		doOnChangeStdCmnPPrsnSearch(sender);
	};
	
	/**
	 * @desc [rptExtCcsEstDivcls]학과별 반편성 목록 onRowSelect 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 25
	 */
	moPage.onRowSelect_RptExtCcsEstDivcls = function() {
//TO-BE: <ExtControl.refreshBind> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtControl.refreshBind(["bindRptNew"]);
		
		
	};
	
	
	moPage.onValueChanged_RdIpbSaNm1 = function(sender) {
		// 값변경시 객체검색팝업 호출
		doOnChangeStdCmnPObjSch(sender);
	}
	
	
	

	
	moPage.onClick_RdBtnProfObjNo1 = function(sender) {
		// 교과목검색팝업 호출
		doOnClickStdCcsPSubPopup(sender);
	}
	
	
	
	/**
	 * @desc [cbbSchYearRcd]학년도 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 25
	 */
	moPage.onValueChanged_rptSchYearRcd = function(psDiv) {
		
		
		var vsRptIndex 		= util.Grid.getIndex(app, "grdMain");
		var vsSchYearRcd	= util.Grid.getCellValue(app, "grdMain", "SCH_YEAR_RCD"	, vsRptIndex);
		var vsSmtRcd		= util.Grid.getCellValue(app, "grdMain", "SMT_RCD"			, vsRptIndex);
		
		if(vsSchYearRcd != "" && vsSmtRcd != ""){
			if(vsSmtRcd == "CA00390" || vsSmtRcd == "CA00391"){
				vsSmtRcd = "CA00310";
			}else if(vsSmtRcd == "CA00392" || vsSmtRcd == "CA00393"){
				vsSmtRcd = "CA00320";
			}
			util.DataMap.setValue(app, "dmKeyDateMapRpt", "YEAR"	, vsSchYearRcd);
			util.DataMap.setValue(app, "dmKeyDateMapRpt", "SMT"	, vsSmtRcd);
			
		
			//strCommand: date 
			util.Submit.send(app, "subRptDate", function(pbSuccess){
				if(pbSuccess){				
				
					var vsStDt		= util.DataMap.getValue(app, "dmKeyDateMapRpt", "ST_DT");
					var vsEndDt	= util.DataMap.getValue(app, "dmKeyDateMapRpt", "END_DT");
					
					util.Grid.setCellValue(app, "grdMain", "ST_DT", vsStDt, vsRptIndex);
					util.Grid.setCellValue(app, "grdMain", "END_DT", vsEndDt, vsRptIndex);
					
					
				// Exception 발생시
				}else {
					
				}
			});
			
		}
	};
	
	
	
	
	
	moPage.onValueChanged_Combobox1 = function() {
		page.onValueChanged_rptSchYearRcd("year");
	};
	
	
	moPage.onValueChanged_Combobox2 = function() {
		page.onValueChanged_rptSchYearRcd("smt");
	};
	return moPage;
};
