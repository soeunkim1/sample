//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./stdCcsCRestAppManager.xtm"/>

/**
 * 휴보강조회
 * @class stdCcsCRestAppManager
 * @author 박갑수 at 2016. 3. 7
 */
var stdCcsCRestAppManager = function() {
	var moPage = new Page();
	
	// 임포트용 데이터 통신 오브젝트
	var moPObject = new Page();
	
	// 객체검색팝업 호출
	moPObject.moIdsForStdCmnPObjSch = [
	{
		controlId			:	"btnSaCd",
		iCd					:	"",
		iNm					:	"ipbSaNm",
		iObjDivRcd			:	["CC009SA", "CC009OG"],
		iStartObject    	:   "",
		iOtDivRcd			:	"",
		iOtIsTreeView	:	"",
		iLanDivRcd		:	"",
		iKeyDate			:	"",
		iKeyEndDate		:	"/root/keyDateMap/BEF_DT",
		oObjDivRcd		:	"/root/reqKey/strSaObjDivRcd",
		oCd					:	"/root/reqKey/strSaCd",
		oCdNm				:	"ipbSaNm",
		oBegDt				:	"",
		oEndDt				:	"",
		oLanDivRcd		:	"",
		func 					:  function(){
			// 검색조건이 있을경우 조회
			var vsSchYearRcd = util.Control.getValue(app, "cbbSchYearRcd");
			var vsSmtRcd = util.Control.getValue(app, "cbbSmtRcd");
			var vsSaCdNm = util.Control.getValue(app, "ipbSaNm");
			if(!ValueUtil.isNull(vsSchYearRcd) && !ValueUtil.isNull(vsSmtRcd) && !ValueUtil.isNull(vsSaCdNm)){
				util.Header.clickSearch(app);
			}
		}
	}];
	
	// 교직원 검색
	 moPObject.moIdsForStdCmnPPrsnSearch = [
	{
		 controlId					: "btnProfObjNo",
		 istrStaffGrpAuth			: "",					
		 istrWkdtyAuth			: "true",				
		 iKeyDate					: "",	
		 iStaffNo					: "ipbProfNm",			
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
		  
		 oObjNo					: "/root/reqKey/strProfObjNo",
		 oStaffNo					: "",					
		 oRepNm					: "ipbProfNm",					
		 oBirthday					: "",					
		 oStatNm					: "",				
		 oStatRcd					: "",					
		 oOgNm					: "",				
		 oOgCd						: "",				
		 oPosNm					: "",				
		 oPosCd					: "",				
		 oWkgrdNm				: "",			
		 oWkgrdRcd				: "",				
		 oStaffGrpRcd				: "",					
		 oStaffSubGrpRcd		: "",				
		 oHoRcd					: "",					
		 oSsn						: "",					
		 oWkdtyRcd				: "",					
		 oWkdtyNm				: "",				
		 func                         : function(poRtnValue){
			// 검색조건이 있을경우 조회
			var vsSchYearRcd = util.Control.getValue(app, "cbbSchYearRcd");
			var vsSmtRcd = util.Control.getValue(app, "cbbSmtRcd");
			var vsSaCdNm = util.Control.getValue(app, "ipbSaNm");
			var vsProfNm = util.Control.getValue(app, "ipbProfNm");
			if(!ValueUtil.isNull(vsSchYearRcd) && !ValueUtil.isNull(vsSmtRcd) && !ValueUtil.isNull(vsSaCdNm) && !ValueUtil.isNull(vsProfNm)){
				util.Header.clickSearch(app);
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
	 * @author 박갑수 at 2016. 3. 7
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		// import 헤더 초기화
		doHeaderOnLoad();
	};
	
	/**
	 * @desc onLoad 실행
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 7
	 */
	moPage.onModelConstructDone_StdCcsCRestAppManager = function() {
		// 리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["rptCcsRestApp"]);
		// 검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grpData"]);
		
		// 권한에따른 컨트롤 활성화 처리
		doVisibleCtlByAuth();
		
		// 서브미션 호출
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				
				util.Control.redraw(app, ["cbbSchYearRcd", "cbbSmtRcd", "cbbSkplcDt"]);
				
				// 권한에 따른 소속부서 default값 세팅 
				doSetCtlByAuth();
				
				// 개인권한일경우 바로조회
				if(moPageInfo.authRngRcd == "CC00104"){
					util.Header.clickSearch(app);
				}
			}
		}, true);
	};
	
	/**
	 * 권한에 따른 교수명 활성/비활성 처리
	 * @param 
	 * @type void
	 * @author 박갑수 at 2016. 2. 16
	 */	
	function doVisibleCtlByAuth() {
		
		// 개인권한[CC00104] : 
		if (moPageInfo.authRngRcd == "CC00104") {
			util.Control.setVisible(app, false, ["btnProfObjNo", "btnSaCd", "ipbSaNm", "lblSaNm"]);
			util.Control.setEnable(app, false, ["ipbProfNm", "cbbSchYearRcd", "cbbSmtRcd"]);
			
			util.Control.setValue(app, "ipbProfNm", moUserInfo.userNm);
			util.DataMap.setValue(app, "dmReqKey", "strProfObjNo", moUserInfo.id);
						
			util.Control.setStyleAttr(app, "lblSkplcDt", "left", "400");
			util.Control.setStyleAttr(app, "cbbSkplcDt", "left", "485");
			util.Control.setStyleAttr(app, "lblProfNm", "left", "595");
			util.Control.setStyleAttr(app, "ipbProfNm", "left", "690");
			
			util.Control.setStyleAttr(app, "lblSaNm", "left", "815");
			util.Control.setStyleAttr(app, "ipbSaNm", "left", "910");
		}
	};
	
	/**
	 * 권한에 따른 소속부서 default값 세팅 
	 * @param 
	 * @type void
	 * @author 박갑수 at 2016. 8. 9
	 */	
	function doSetCtlByAuth() {
		
		// 소속이하+지정부서이하권한[CC00101] 아닐경우 자신의 소속 Default 세팅 
		if (moPageInfo.authRngRcd == "CC00101") {
			
			util.DataMap.setValue(app, "dmReqKey", "strSaObjDivRcd", moUserInfo.asgnDeptDivRcd);
			util.DataMap.setValue(app, "dmReqKey", "strSaCd", moUserInfo.asgnDeptCd);
			util.Control.setValue(app, "ipbSaNm", moUserInfo.asgnDeptNm);
		}
	};
	
	/**
	 * @desc [btnSaCd]부서명(돋보기버튼) onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 7
	 */
	moPage.onClick_BtnSaCd = function(sender) {
		// 객체검색팝업 호출
		doOnClickStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc [ipbSaNm]부서명 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 7
	 */
	moPage.onValueChanged_IpbSaNm = function(sender) {
		// 값변경시 객체검색팝업 호출
		doOnChangeStdCmnPObjSch(sender);
	};
	
	 /**
	 * @desc [btnProfObjNo]교수명(돋보기버튼) onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 7
	 */
	moPage.onClick_BtnProfObjNo = function(sender) {
		// 교직원검색팝업 호출
		doOnClickStdCmnPPrsnSearch(sender);
	};
	
	/**
	 * @desc [ipbProfNm]교수명 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 7
	 */
	moPage.onValueChanged_IpbProfNm = function(sender) {
		// 값변경시 교직원검색팝업 호출
		doOnChangeStdCmnPPrsnSearch(sender);
	};
	
	/**
	 * @desc [cbbSchYearRcd]학년도 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 7
	 */
	moPage.onValueChanged_CbbSmtRcd = function() {
		// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
		doChangeYearSmt("smt");
	};
	
	/**
	 * @desc [cbbSmtRcd]학기 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 7
	 */
	moPage.onValueChanged_CbbSchYearRcd = function() {
		// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
		doChangeYearSmt("year");
	};
	
	/**
	 * @desc 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 7
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
	 * @author 박갑수 at 2016. 3. 7
	 */
	moPage.onClick_BtnSearch = function() {
		// 작업영역 리피트 변경 내역 체크
		if(util.Grid.isModified(app, "", "CRM")){
			return false;
		}
		
		// 개인권한[CC00104] : 
		if (moPageInfo.authRngRcd == "CC00104") {
			// 조회조건 필수 체크
			if(!util.validate(app, ["cbbSchYearRcd", "cbbSmtRcd"])){
				return false;
			}
		}else {
			// 조회조건 필수 체크
			if(!util.validate(app, ["cbbSchYearRcd", "cbbSmtRcd", "ipbSaNm"])){
				return false;
			}
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
	 * @desc 휴보강목록 조회
	 * @param poCallBackFunc 콜백정의
	 * @return void
	 * @author 박갑수 at 2016. 3. 7
	 */
	function doList(poCallBackFunc) {
		
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdCcsRestApp");	
				// 조회 후 콜백함수 수행
				if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess); 
			}
		});
	};
	
	/**
	 * @desc [btnCancelSch]결보강계획서 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 7. 7
	 */
	moPage.onClick_BtnCancelSch = function() {
		
		if(ValueUtil.isNull(util.Grid.getCheckOrSelectedRowIndex(app, "grdCcsRestApp"))){
			// 선택된 데이터가 없습니다.
			ComMsg.warn("M008");
			return false;
		}
		
		if(util.Grid.isModified(app, "grdCcsRestApp")){
			// '변경된 사항이 있습니다.\n변경 저장 혹은 취소 후  작업을 다시 수행 하십시오.'
			ComMsg.warn("M014");
			return false;
		}
		
		// 로우 선택 체크
		var vnSelectRowCnt = ExtInstance.getNodeListLength("/root/resList/rptCcsRestApp/row[child::DEL_CKB='Y']");
		var vaIdx = new Array;
		
		// 선택된로우가 있을경우 선택된로우 체크
		if(vnSelectRowCnt > 0){
			var vsIdx = util.Grid.getCheckOrSelectedRowIndex(app, "grdCcsRestApp");
			vaIdx = vsIdx.split(",");
			
		// 선택된로우가 없을경우 포커싱된 로우 체크
		}else {
			vaIdx[0] = util.Grid.getIndex(app, "grdCcsRestApp");
		}
		
		// 휴보강키 In조건용
		var vsRestAppKey = "";
		
		for(var i=0; i<vaIdx.length; i++){
			var vnIdx = vaIdx[i];
			
			// 휴보강구분 [CL105]
			var vsSkplcDivRcd = util.Grid.getCellValue(app, "grdCcsRestApp", "SKPLC_DIV_RCD", vnIdx);
			
			// 휴보강구분이 공휴일[CL10503] 일경우 경고메시지
			if(ValueUtil.fixNull(vsSkplcDivRcd) == "CL10503"){
				// 공휴일은 출력할 수 없습니다.
				util.Msg.alert("NLS-CCS-EXT015");
				return false;
			}else {
				
				// 휴강 [CL10501] 일경우
				if(ValueUtil.fixNull(vsSkplcDivRcd) == "CL10501"){
					
					var vsRefKey = util.Grid.getCellValue(app, "grdCcsRestApp", "REF_KEY", vnIdx);
					var vsProfObjNo = util.Grid.getCellValue(app, "grdCcsRestApp", "PROF_OBJ_NO", vnIdx);
					var vsSkplcDt = util.Grid.getCellValue(app, "grdCcsRestApp", "SKPLC_DT", vnIdx);
					var vsStLttm = util.Grid.getCellValue(app, "grdCcsRestApp", "ST_LTTM", vnIdx);
					var vsEndLttm = util.Grid.getCellValue(app, "grdCcsRestApp", "END_LTTM", vnIdx);
									
					if(i == 0){
						vsRestAppKey = vsRestAppKey + "('" + vsRefKey + vsProfObjNo + vsSkplcDt.substring(0, 8) + vsStLttm + vsEndLttm + "'";
					}else {
						vsRestAppKey = vsRestAppKey + ",'" + vsRefKey + vsProfObjNo + vsSkplcDt.substring(0, 8) + vsStLttm + vsEndLttm + "'";
					}
					
					if(i == (vaIdx.length-1)){
						vsRestAppKey = vsRestAppKey + ")";
					}
					
				// 보강 [CL10502] 일경우
				}else {
					
					var vsRefKey = util.Grid.getCellValue(app, "grdCcsRestApp", "REF_KEY", vnIdx);
					var vsProfObjNo = util.Grid.getCellValue(app, "grdCcsRestApp", "PROF_OBJ_NO", vnIdx);
					var vsSkplcDt = util.Grid.getCellValue(app, "grdCcsRestApp", "SPLC_FRC_DT", vnIdx);
					var vsStLttm = util.Grid.getCellValue(app, "grdCcsRestApp", "SPLC_FRC_ST_LTTM", vnIdx);
					var vsEndLttm = util.Grid.getCellValue(app, "grdCcsRestApp", "SPLC_FRC_END_LTTM", vnIdx);
				
					if(i == 0){
						vsRestAppKey = vsRestAppKey + "('" + vsRefKey + vsProfObjNo + vsSkplcDt.substring(0, 8) + vsStLttm + vsEndLttm + "'";
					}else {
						vsRestAppKey = vsRestAppKey + ",'" + vsRefKey + vsProfObjNo + vsSkplcDt.substring(0, 8) + vsStLttm + vsEndLttm + "'";
					}
					
					if(i == (vaIdx.length-1)){
						vsRestAppKey = vsRestAppKey + ")";
					}
				} 
				
			}
		}
						
		var vsSchYearRcd = util.Control.getValue(app, "cbbSchYearRcd");
		var vsSmtRcd = util.Control.getValue(app, "cbbSmtRcd");
		
		// 결 · 보강계 출력
		var voParam = {
				p_strLanDivRcd 			: msDefaultLocale	 			 // 언어키
			  ,	p_strKeyDate 			: util.DataMap.getValue(app, "dmKeyDateMap", "END_DT")	  	// 기준일
			  ,	p_strSchYearRcd		: vsSchYearRcd  				 // 학년도
			  ,	p_strSmtRcd 				: vsSmtRcd  						 // 학기
			  ,	p_strdiv 					: "Y"							 		 // 출력화면 외 화면에서 사용 (키조합 필요)
			  ,	p_strRestAppKey 		: vsRestAppKey					 // 휴보강키 In조건용
			  ,	p_strCheckAuthId 		: moUserInfo.id					 // 사용자ID
		};
				
		var voOzFormParam = {
				  TITLE : "결 · 보강계" 			//리포트타이틀
				, SUB_TITLE : "" 		//리포트서브타이틀		
				, FORM_TYPE : "flash"
		};	
				
		ReportUtil.fOzPopupOpen("결 · 보 강 계", "extCcsSRestSteadSchedule", voOzFormParam, voParam);
	};
	
	/**
	 * @desc [btnRsltSch]보강실시결과서 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 7. 7
	 */
	moPage.onClick_BtnRsltSch = function() {
		if(ValueUtil.isNull(util.Grid.getCheckOrSelectedRowIndex(app, "grdCcsRestApp"))){
			// 선택된 데이터가 없습니다.
			ComMsg.warn("M008");
			return false;
		}
		
		// 2. 변경사항저장여부 체크
		if(util.Grid.isModified(app, "grdCcsRestApp")){
			// '변경된 사항이 있습니다.\n변경 저장 혹은 취소 후  작업을 다시 수행 하십시오.'
			ComMsg.warn("M014");
			return false;
		}
		
		// 2. 로우 선택 체크
		var vnSelectRowCnt = ExtInstance.getNodeListLength("/root/resList/rptCcsRestApp/row[child::DEL_CKB='Y']");
		var vaIdx = new Array;
		
		// 선택된로우가 있을경우 선택된로우 체크
		if(vnSelectRowCnt > 0){
			var vsIdx = util.Grid.getCheckOrSelectedRowIndex(app, "grdCcsRestApp");
			vaIdx = vsIdx.split(",");
			
		// 선택된로우가 없을경우 포커싱된 로우 체크
		}else {
			vaIdx[0] = util.Grid.getIndex(app, "grdCcsRestApp");
		}
		
		// 휴보강키 In조건용
		var vsRestAppKey = "";
		
		for(var i=0; i<vaIdx.length; i++){
			var vnIdx = vaIdx[i];
			
			// 휴보강구분 [CL105]
			var vsSkplcDivRcd = util.Grid.getCellValue(app, "grdCcsRestApp", "SKPLC_DIV_RCD", vnIdx);
			
			// 휴보강구분이 공휴일[CL10503] 일경우 경고메시지
			if(ValueUtil.fixNull(vsSkplcDivRcd) == "CL10503"){
				// 공휴일은 출력할 수 없습니다.
				util.Msg.alert("NLS-CCS-EXT015");
				return false;
			}else {
				
				// 휴강 [CL10501] 일경우
				if(ValueUtil.fixNull(vsSkplcDivRcd) == "CL10501"){
					
					var vsRefKey = util.Grid.getCellValue(app, "grdCcsRestApp", "REF_KEY", vnIdx);
					var vsProfObjNo = util.Grid.getCellValue(app, "grdCcsRestApp", "PROF_OBJ_NO", vnIdx);
					var vsSkplcDt = util.Grid.getCellValue(app, "grdCcsRestApp", "SKPLC_DT", vnIdx);
									
					if(i == 0){
						vsRestAppKey = vsRestAppKey + "('" + vsRefKey + vsProfObjNo + vsSkplcDt.substring(0, 8) + "'";
					}else {
						vsRestAppKey = vsRestAppKey + ",'" + vsRefKey + vsProfObjNo + vsSkplcDt.substring(0, 8) + "'";
					}
					
					if(i == (vaIdx.length-1)){
						vsRestAppKey = vsRestAppKey + ")";
					}
					
				// 보강 [CL10502] 일경우
				}else {
					
					var vsRefKey = util.Grid.getCellValue(app, "grdCcsRestApp", "REF_KEY", vnIdx);
					var vsProfObjNo = util.Grid.getCellValue(app, "grdCcsRestApp", "PROF_OBJ_NO", vnIdx);
					var vsSkplcDt = util.Grid.getCellValue(app, "grdCcsRestApp", "SPLC_FRC_DT", vnIdx);
					
					if(i == 0){
						vsRestAppKey = vsRestAppKey + "('" + vsRefKey + vsProfObjNo + vsSkplcDt.substring(0, 8) + "'";
					}else {
						vsRestAppKey = vsRestAppKey + ",'" + vsRefKey + vsProfObjNo + vsSkplcDt.substring(0, 8) + "'";
					}
					
					if(i == (vaIdx.length-1)){
						vsRestAppKey = vsRestAppKey + ")";
					}
				} 
				
			}
		}
						
		var vsSchYearRcd = util.Control.getValue(app, "cbbSchYearRcd");
		var vsSmtRcd = util.Control.getValue(app, "cbbSmtRcd");
		
		// 보강실시결과보고서 출력
		var voParam = {
				p_strLanDivRcd 			: msDefaultLocale	 			 // 언어키
			  ,	p_strKeyDate 			: util.DataMap.getValue(app, "dmKeyDateMap", "END_DT")	  	// 기준일
			  ,	p_strSchYearRcd		: vsSchYearRcd  				 // 학년도
			  ,	p_strSmtRcd 				: vsSmtRcd  						 // 학기
			  ,	p_strdiv 					: "Y"							 		 // 출력화면 외 화면에서 사용 (키조합 필요)
			  ,	p_strRestAppKey 		: vsRestAppKey					 // 휴보강키 In조건용
			  ,	p_strCheckAuthId 		: moUserInfo.id					 // 사용자ID
		};
				
		var voOzFormParam = {
				  TITLE : "보강실시결과보고서" //리포트타이틀
				, SUB_TITLE : "" 		//리포트서브타이틀		
				, FORM_TYPE : "flash"
		};	
				
		ReportUtil.fOzPopupOpen("보강실시결과보고서", "extCcsSRealRsltRpt", voOzFormParam, voParam);
	};
	
	/**
	 * @desc [rhCkbSelect]패널 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 16
	 */
	moPage.onValueChanged_RhCkbSelect = function() {
		// 리피트 패널 설정
//TO-BE: <ExtRepeat.selectedAllPanel> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.selectedAllPanel("rhCkbSelect");
	};
	
	return moPage;
};
