//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./stdCcsCRestApp.xtm"/>

/**
 * 휴보강관리
 * @class stdCcsCRestApp
 * @author 박갑수 at 2016. 2. 16
 */
var stdCcsCRestApp = function() {
	var moPage = new Page();
	
	// 임포트용 데이터 통신 오브젝트
	var moPObject = new Page();
	
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
			var vsProfNm = util.Control.getValue(app, "ipbProfNm");
			var vsKeyDate = util.Control.getValue(app, "dipKeyDate");
			if(!ValueUtil.isNull(vsSchYearRcd) && !ValueUtil.isNull(vsSmtRcd) && !ValueUtil.isNull(vsProfNm) && !ValueUtil.isNull(vsKeyDate)){
				util.Header.clickSearch(app);
			}
		 }
	}];
	
	// 강의실검색
	moPObject.moIdsForStdCcsPRoomPopup = [
	{
		 controlId					: "rdBtnDtlLectRoomCd",			
		 iLanDivRcd				: "",			
		 iBdCd						: "",		
		 iLectRoomNm			: "rdIpbDtlLectRoomNm",		
		 iKeyDate					: "/root/keyDateMap/END_DT",
		 iLectDate					: "rdDipDtlSkplcDt",
		 iStTime					: "rdCbbDtlStLttm", 			
		 iEndTime					: "rdCbbDtlEndLttm",			
		 iVacantRoomYn		: "",			
		 oLectRoomCd			: "rdIpbDtlLectRoomCd",			
		 oBdCd						: "",			
		 oLectRoomNm			: "rdIpbDtlLectRoomNm",			
		 oSpvsDeptCd			: "",			
		 oObjDivRcd				: "",			
		 oLectRoomShortNm	: "",		
		 oPrpRcd					: "",	
		 oLectUseYn				: "",			
		 oAccNop					: "",	
		 oFlrCnt						: "",			
		 oRemark					: "",		
		 oBdNm					: "",
		 func : function(poParam) { 
		 //팝업끝난후  후처리가 필요할때 입력
		 }
	 }];
	 
	// SMS/Email 발송
	moPObject.moIdsForExtCmnSender = {
		rptId			 				: "rptStudList",										// (필수) SMS 리피트 id
		sendDivChar 	 			: "", 														// (선택) 발송문구구분_발송내용의 @ 키워드와 매핑됨
		sndId						: "",														// (선택) 발송id
		unitSystemRcd			: "",														// (선택) 단위시스템구분코드		-- 발송Id입력 시 필수
		repNm						: "rhBtnRepNm", 									// (필수 )수신자명 리피트 헤더 ID
		
		/*************************************SMS*************************************************************/
		phoneNo			 		: "rhBtnStudClpNo",									// (필수) 휴대폰번호 그리드 헤더 id
		defSenderSms     		: "031",										// (선택) 보내는이(SMS)
		sendMsgContSms    	: "",														// (선택) SMS발송 내용
		sendTitleSms        	: "",														// (선택) SMS발송 제목
		/******************************************************************************************************/
		
		/*************************************Email*************************************************************/
		email			 			: "",														// (필수) 이메일 그리드 헤더 id
		defSenderEmail 	 		: "", 														// (선택) 보내는이(Email)
		defPersonalNmEmail 	: "",												 		// (선택) 보내는이 명(닉네임)(Email)
		sendMsgContEmail	: "",														// (선택) Email발송 내용
		sendTitleEmail			: "",														// (선택) Email발송 제목
		/******************************************************************************************************/
		
		callBackfunc : function(pbSuccess, psSmsEmailDivCd, paIdxs) {
			if(pbSuccess){
				var vnCnt = util.Grid.getRowCount(app, "grdStudList");
				
				// @건 발송되었습니다.
				util.Msg.alert("NLS-CCS-M081", [vnCnt]);
			}
		}
	};
	
	// 학년도 학기를 원래데이터로 되돌리기위한 변수
	var msSchYearRcd = "";
	var msSmtRcd = "";
	
	/**
	 * @desc import 헤더 초기화
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 2. 16
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		// import 헤더 초기화
		doHeaderOnLoad();
	};
	
	/**
	 * @desc onLoad 실행
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 16
	 */
	moPage.onModelConstructDone_StdCcsCRestApp = function() {
		// 리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["rptCcsOpenSub", "rptCcsRestApp", "rptStudList"]);
		// 검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grpData", "grpDataDtl"]);
		
		// 권한에따른 교수명 컬럼 검색가능 여부
		doVisibleCtlByAuth();
				
		// 서브미션 호출
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				
				util.Control.redraw(app, ["cbbSchYearRcd", "cbbSmtRcd", "dipKeyDate"]);
				
				// 학년도 학기값 되돌리기위한 값
				msSchYearRcd = util.DataMap.getValue(app, "dmKeyDateMap", "YEAR");
				msSmtRcd = util.DataMap.getValue(app, "dmKeyDateMap", "SMT");
				
				//  휴보강입력기간 제어여부
				var vsInputYn = util.DataMap.getValue(app, "dmResOnLoad", "strInputYn");
				if(ValueUtil.fixNull(vsInputYn) == "Y"){
					// 입력기간 포함여부 : 0 미포함, 1 포함
					var vsPeriod = util.DataMap.getValue(app, "dmResOnLoad", "iPeriod");
					
					if(ValueUtil.fixNull(vsPeriod) == "0"){
						// "휴보강 입력기간이 아닙니다." 메시지
						util.Msg.alert("NLS-CCS-M083");
						util.Control.setVisible(app, false, ["btnNewDtl", "btnDelDtl", "btnRestoreDtl", "btnSaveDtl"]);
						util.Control.setReadOnly(app, true, ["rptCcsRestApp"]);
					}else {
						util.Control.setVisible(app, true, ["btnNewDtl", "btnDelDtl", "btnRestoreDtl", "btnSaveDtl"]);
						util.Control.setReadOnly(app, false, ["rptCcsRestApp"]);
					}
				}
				
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
			util.Control.setVisible(app, false, ["btnProfObjNo"]);
			util.Control.setEnable(app, false, ["ipbProfNm", "cbbSchYearRcd", "cbbSmtRcd"]);
						
			util.Control.setValue(app, "ipbProfNm", moUserInfo.userNm);
			util.DataMap.setValue(app, "dmReqKey", "strProfObjNo", moUserInfo.id);
		}
	};
	
	/**
	 * @desc [cbbSchYearRcd]학년도 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 16
	 */
	moPage.onValueChanged_CbbSchYearRcd = function() {
		// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
		doChangeYearSmt("year");
	};
	
	/**
	 * @desc [cbbSmtRcd]학기 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 16
	 */
	moPage.onValueChanged_CbbSmtRcd = function() {
		// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
		doChangeYearSmt("smt");
	};
	
	/**
	 * @desc 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 16
	 */
	function doChangeYearSmt(psDiv) {
		//strCommand: date 
		util.Submit.send(app, "subDate", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, ["dipKeyDate"]);
				
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
	 * @desc [btnProfObjNo]교수명(돋보기버튼) onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 16
	 */
	moPage.onClick_BtnProfObjNo = function(sender) {
		// 교직원검색팝업 호출
		doOnClickStdCmnPPrsnSearch(sender);
	};
	
	/**
	 * @desc [ipbProfNm]교수명 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 16
	 */
	moPage.onValueChanged_IpbProfNm = function(sender) {
		// 리피트 변경사항 체크
		if(util.Grid.isModified(app, ["grdCcsRestApp"])){
			return false;
		}
		
		if(moPageInfo.authRngRcd != "CC00102"){
			return false;
		}
		
		// 값변경시 교직원검색팝업 호출
		doOnChangeStdCmnPPrsnSearch(sender);
	};
	
	/**
	 * @desc [btnSearch]조회 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 16
	 */
	moPage.onClick_BtnSearch = function() {
		// 작업영역 리피트 변경 내역 체크
		if(util.Grid.isModified(app, "", "CRM")){
			return false;
		}
		
		// 조회조건 필수 체크
		if(!util.validate(app, ["cbbSchYearRcd", "cbbSmtRcd", "ipbProfNm", "dipKeyDate"])){
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
	 * @desc 강의 목록 조회
	 * @param poCallBackFunc 콜백정의
	 * @return void
	 * @author 박갑수 at 2016. 2. 16
	 */
	function doList(poCallBackFunc) {
		// 디테일 리피트 변경시 변경내역 체크 방지
		util.Control.redraw(app, "grdCcsRestApp");
		
		//strCommand: listProf 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdCcsOpenSub");
			
				// 마스터에 데이터가 없을 경우 디테일 입력 불가
				if(util.Grid.getRowCount(app, "grdCcsOpenSub") < 1){
					util.Control.setEnable(app, false,["grpDataDtl"]);
					util.Control.reset(app, "rptCcsRestApp");
				}else{
					// 각 컨트롤 활성화 제어
					doDtlRptStatus();
				}
			}
			
			// 조회 후 콜백함수 수행
			if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
		});
	};
	
	/**
	 * @desc 디테일 데이터의 변경내역이 존재여부에 따른 마스터 활성/비활성
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 16
	 */
	function doDtlRptStatus(){
		if(util.Grid.isModified(app, "grdCcsRestApp")){
			util.Control.setEnable(app, false, ["grpData"]);
		}else{
			util.Control.setEnable(app, true, ["grpData"]);
		}
	};
	
	/**
	 * @desc [rptCcsOpenSub]강의목록 onRowSelect 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 16
	 */
	moPage.onRowSelect_RptCcsOpenSub = function() {
		// 휴보강 목록 조회
		doListDtl();
	};
	
	/**
	 * @desc 휴보강 목록 조회
	 * @param poCallBackFunc 콜백정의
	 * @return void
	 * @author 박갑수 at 2016. 2. 16
	 */
	function doListDtl(poCallBackFunc) {
		
		// 참조키
		util.DataMap.setValue(app, "dmReqKey", "strRefKey", util.Grid.getCellValue(app, "grdCcsOpenSub", "REF_KEY"));
		util.DataMap.setValue(app, "dmReqKey", "strSaCd", util.Grid.getCellValue(app, "grdCcsOpenSub", "SA_CD"));
		util.DataMap.setValue(app, "dmReqKey", "strSaObjDivRcd", util.Grid.getCellValue(app, "grdCcsOpenSub", "SA_OBJ_DIV_RCD"));
		util.DataMap.setValue(app, "dmReqKey", "strProfObjNo", util.Grid.getCellValue(app, "grdCcsOpenSub", "PROF_OBJ_NO"));
		//strCommand: getStdCcsRestAppListByProf 
		util.Submit.send(app, "subListDtl", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdCcsRestApp");
				
				//  휴보강목록 존재여부에따른 SMS활성화 여부
				if(util.Grid.getRowCount(app, "grdCcsRestApp") == 0){
					util.Control.setEnable(app, false, ["impSnd"]);
				}
			}
			
			// 조회 후 콜백함수 수행
			if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
		});
	};
	
	/**
	 * @desc [btnNewDtl]신규 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 17
	 */
	moPage.onClick_BtnNewDtl = function() {
		// 신규로우 추가
		var vnIdx = util.Grid.insertRow(app, "grdCcsRestApp", "rdCbbDtlSkplcDivRcd");
		
		// 신규 Defalut값 설정 
		// 참조키 : 마스터목록
		var vsRefKey = util.Grid.getCellValue(app, "grdCcsOpenSub", "REF_KEY");
		util.Grid.setCellValue(app, "grdCcsRestApp", "REF_KEY", vsRefKey, vnIdx);
		
		// 교수오브젝트번호 : 마스터목록
		var vsRefKey = util.Grid.getCellValue(app, "grdCcsOpenSub", "PROF_OBJ_NO");
		util.Grid.setCellValue(app, "grdCcsRestApp", "PROF_OBJ_NO", vsRefKey, vnIdx);
		
		// 디테일 리피트 상태에 따른 마스터 활성화 제어
		doDtlRptStatus();
		
		// Sms import 활성화여부
		doSetSmsEnable();
	};
	
	/**
	 * @desc [btnDelDtl]삭제 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 17
	 */
	moPage.onClick_BtnDelDtl = function() {
		// 휴보강구분
		var vsSkplcDivRcd = util.Grid.getCellValue(app, "grdCcsRestApp", "SKPLC_DIV_RCD");
		// 공휴일[CL10503]
		if(ValueUtil.fixNull(vsSkplcDivRcd) == "CL10503"){
			// "공휴일 데이터는 삭제할 수 없습니다." 메시지
			util.Msg.alert("NLS-CCS-M076");
			return false;
		}
		
		// 삭제
		util.Grid.deleteRow(app, "grdCcsRestApp");
		// 디테일 리피트 상태에 따른 마스터 활성화 제어
		doDtlRptStatus();
		
		// Sms import 활성화여부
		doSetSmsEnable();
	};
	
	/**
	 * @desc [btnRestoreDtl]작업취소 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 17
	 */
	moPage.onClick_BtnRestoreDtl = function() {
		// 작업취소
		util.Grid.restoreRow(app, "grdCcsRestApp");
		// 디테일 리피트 상태에 따른 마스터 활성화 제어
		doDtlRptStatus();
		
		// Sms import 활성화여부
		doSetSmsEnable();
	};
	
	/**
	 * @desc [btnSaveDtl]작업저장 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 17
	 */
	moPage.onClick_BtnSaveDtl = function() {
		// 작업저장
		doSave();
	};
	
	/**
	 * @desc 휴보강 목록 변경사항 저장
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 17
	 */
	function doSave() {
		
		// 리피트 변경사항 체크
		if(!util.Grid.isModified(app, ["grdCcsRestApp"], "MSG")){
			return false;
		}
		
		// 리피트 Validation Check		
		if(!util.validate(app, "grdCcsRestApp")) return false;
		
		// 리피트 필수값 : 보강일경우 휴강일자 필수
		if(!moPage.checkNotNullRpt()){
			return false;
		}
		
		//strCommand: save 
		util.Submit.send(app, "subSave", function(pbSuccess){
			if(pbSuccess){
				doListDtl(function(pbListSuccess) {
					// 조회 : "갱신된 데이터가 조회되었습니다." header 메세지 표시
					if (pbListSuccess) util.Msg.notify(app, "NLS.INF.M025");
					
					// 보강 저장여부 - 보강이 신규로 저장될 경우 SMS 안내 메시지
					var vsSkplcDivRcdSaveYn = util.DataMap.getValue(app, "dmResList", "strSkplcDivRcdSaveYn");
					if(ValueUtil.fixNull(vsSkplcDivRcdSaveYn) == "Y"){
						// "수강학생들에게 보강 안내(SMS)를 하셔야 합니다." 메시지 출력
						util.Msg.alert("NLS-CCS-M066");
						
						util.DataMap.setValue(app, "dmResList", "strSkplcDivRcdSaveYn", "");
					}
					
					// 디테일 리피트 상태에 따른 마스터 활성화 제어
					doDtlRptStatus();
				});
			}
		});
	};
	
	/**
	 * @desc 보강일경우 휴강일자 필수
	 * @param 
	 * @return boolean
	 * @author 박갑수 at 2016. 2. 18
	 */
	moPage.checkNotNullRpt = function() {
		// 유효성 true or false
		var vbValid = true;
		
		var vsRptId = "rptCcsRestApp"
		// 리피트 RowCnt
		var vnRowCnt 	= util.Grid.getRowCount(app, vsRptId);		
		// 리피트 인덱스
		var vnRptIndex 	= util.Grid.getIndex(app, vsRptId);
		
		for (var i = 1; i <= vnRowCnt; i++) {
			var vsUptStatus = util.Grid.getCellValue(app, vsRptId, "UPT_STATUS", i);
			// 변경이없거나 삭제일경우 Skip
			if (ValueUtil.isNull(vsUptStatus) || vsUptStatus == "D") continue;
			
			// 휴보강구분 : 보강[CL10502]
			var vsSkplcDivRcd = util.Grid.getCellValue(app, vsRptId, "SKPLC_DIV_RCD", i);
			// 보강일경우 휴강일자 필수
			if(vsSkplcDivRcd == "CL10502"){
				// 휴강일자
				var vsFrcDt = util.Grid.getCellValue(app, vsRptId, "KEY_VALUE", i);
				if(ValueUtil.isNull(vsFrcDt)){
					var vsRptTiele = util.Grid.getTitle(app, "grdCcsRestAppCcsRestApp");
					var vsMsgParam = ExtControl.getTextValue("rhBtnDtlSplcFrcKeyValue");
					
					// "@목록의 @번째 항목의 @은(는) 필수 입력 항목입니다." 메시지
					util.Msg.alert("NLS-CCS-M065", [vsRptTiele, i, vsMsgParam]);
					util.Grid.selectRow(app, vsRptId, i, true);
					
					vbValid = false;
					return vbValid;
				}
			}
		}
	
		return vbValid;
	};
	
	/**
	 * @desc [rptCcsRestApp]휴보강목록 onRowSelect 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 17
	 */
	moPage.onRowSelect_RptCcsRestApp = function() {
		
		if(cpr.data.tabledata.RowState.INSERTED == util.Grid.getRowState(app, "grdCcsRestApp")){
			ExtControl.setAttr("rdCbbDtlSkplcDivRcd", "nodeset", "/root/resOnLoad/skplcDivRcdList/row[child::CD = 'CL10501' or CD = 'CL10502'] " );			
		}else{
			ExtControl.setAttr("rdCbbDtlSkplcDivRcd", "nodeset", "/root/resOnLoad/skplcDivRcdList/row" );			
		}
		util.Control.redraw(app, "rdCbbDtlSkplcDivRcd");
		
		model.refreshBind(null, "bindRptCcsRestAppNew");
		
		// Sms import 활성화여부
		if(util.Grid.isModified(app, ["grdCcsRestApp"])){
			util.Control.setEnable(app, false, ["impSnd"]);
		}else {
			util.Control.setEnable(app, false, ["impSnd"]);
			doGetStudList(function(pbSuccess) {
				if (pbSuccess){
					util.Control.setEnable(app, true, ["impSnd"]);
				}
			});
		}
	};
	
	/**
	 * @desc Sms import 활성화여부
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 17
	 */
	function doSetSmsEnable() {
		if(util.Grid.isModified(app, ["grdCcsRestApp"])){
			util.Control.setEnable(app, false, ["impSnd"]);
		}else {
			util.Control.setEnable(app, true, ["impSnd"]);
		}
	};
	
	/**
	 * @desc [rdCbbDtlSkplcDivRcd]휴보강구분 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 17
	 */
	moPage.onValueChanged_RdCbbDtlSkplcDivRcd = function() {
		model.refreshBind(null, "bindRptBySkplcDt");
		
		// 휴보강일자, 요일, 주차, 시작교시, 종료교시, 강의실코드, 강의실명 초기화
		var vnIdx = util.Grid.getIndex(app, "grdCcsRestApp");
		doClearSkplcCtl(vnIdx);
		// 그외 - 휴강일자 초기화
		util.Grid.setCellValue(app, "grdCcsRestApp", "SPLC_FRC_DT", "", vnIdx);
		util.Grid.setCellValue(app, "grdCcsRestApp", "KEY_VALUE", "", vnIdx);
	};
	
	/**
	 * @desc 후보강관련 컬럼 초기화
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 17
	 */
	function doClearSkplcCtl(poRowIdx){
		// 휴보강일자, 요일, 주차, 시작교시, 종료교시, 강의실코드, 강의실명 초기화
		util.Grid.setCellValue(app, "grdCcsRestApp", "SKPLC_DT", "", poRowIdx, true, false);
		util.Grid.setCellValue(app, "grdCcsRestApp", "DAY", "", poRowIdx, true, false);
		util.Grid.setCellValue(app, "grdCcsRestApp", "WEEK_SEQ", "", poRowIdx, true, false);
		util.Grid.setCellValue(app, "grdCcsRestApp", "ST_LTTM", "", poRowIdx, true, false);
		util.Grid.setCellValue(app, "grdCcsRestApp", "END_LTTM", "", poRowIdx, true, false);
		util.Grid.setCellValue(app, "grdCcsRestApp", "LECT_ROOM_NM", "", poRowIdx, true, false);
		util.Grid.setCellValue(app, "grdCcsRestApp", "LECT_ROOM_CD", "", poRowIdx, true, false);
	};
	
	/**
	 * @desc [rdDipDtlSkplcDt]휴보강일자 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 17
	 */
	moPage.onValueChanged_RdDipDtlSkplcDt = function() {
		var vnIdx = util.Grid.getIndex(app, "grdCcsRestApp");
		var vsSkplcDt = util.Grid.getCellValue(app, "grdCcsRestApp", "SKPLC_DT");
		
		// 1. 휴보강 구분값 입력체크
		var vsSkplcDivRcd = util.Grid.getCellValue(app, "grdCcsRestApp", "SKPLC_DIV_RCD");
		if(ValueUtil.isNull(vsSkplcDivRcd) && !ValueUtil.isNull(vsSkplcDt)){
			var vsTitle = ExtControl.getTextValue("rhBtnDtlSkplcDivRcd");
			// "@1을(를) 입력하십시오." 메시지
			util.Msg.alert("NLS-WRN-M003", [vsTitle]);
			// 휴보강일자, 요일, 주차, 시작교시, 종료교시, 강의실코드, 강의실명 초기화
			doClearSkplcCtl(vnIdx);
			ExtRepeat.setColFocus("rptCcsRestApp", vnIdx, "SKPLC_DIV_RCD");
			
			return false;
		}
		
		// 2. 휴보강일자 빈값인지 체크
		if(ValueUtil.isNull(vsSkplcDt)){
			// 휴보강일자, 요일, 주차, 시작교시, 종료교시, 강의실코드, 강의실명 초기화
			doClearSkplcCtl(vnIdx);
			return false;
		}
		
		
		util.DataMap.setValue(app, "dmReqKey", "strSkplcDt", vsSkplcDt);
		util.DataMap.setValue(app, "dmReqKey", "strSkplcDivRcd", vsSkplcDivRcd);
		
		var vsKeyValue = util.Grid.getCellValue(app, "grdCcsRestApp", "KEY_VALUE");
		if(!ValueUtil.isNull(vsKeyValue)){
			// 보강-휴강일의 휴보강구분
			var vsSplcFrcDivRcd = ExtInstance.getValue("/root/resList/restDayList/row", "SKPLC_DIV_RCD" , "child::KEY_VALUE='"+ vsKeyValue +"'");
			util.DataMap.setValue(app, "dmReqKey", "strSplcFrcDivRcd", vsSplcFrcDivRcd);
		}else {
			util.DataMap.setValue(app, "dmReqKey", "strSplcFrcDivRcd", "");
		}
		
		// 3. 주차정보 조회
		//strCommand: getWeekSeq 
		util.Submit.send(app, "subWeekSeq", function(pbSuccess){
			if(pbSuccess){
				
				var vsWeekSeq = util.DataMap.getValue(app, "dmResList", "strWeekSeq");
				// 휴강[CL10501]
				if(vsSkplcDivRcd == "CL10501"){
					
					// 3-1. 교수에대한 해당날짜의 수업교시를 가져온 후 수업여부확인, 강의실정보, 요일정보 세팅					
					doCheckDateAndLectDt(function(pbSuccess) {
						if (pbSuccess){
							
							var vnLength = util.DataSet.getRowCount(app, "dsLectDtInfo");
							// 해당 휴보강일자의 수업 존재유무 확인
							if(vnLength == 0){
								// "해당 일자에 수업이 없습니다." 메시지 출력
								util.Msg.alert("NLS-CCS-M012");
								// 휴보강일자, 요일, 주차, 시작교시, 종료교시, 강의실코드, 강의실명 초기화
								doClearSkplcCtl(vnIdx);
								return false;
							}
							
							// 강의실 명 강의실코드 세팅
							var vsLectRoomCd = util.DataSet.getValue(app, "dsLectDtInfo", "LECT_ROOM_CD" , "1");
							var vsLectRoomNm = util.DataSet.getValue(app, "dsLectDtInfo", "LECT_ROOM_NM" , "1");
							
							if(ValueUtil.isNull(vsLectRoomCd) || ValueUtil.isNull(vsLectRoomNm)){
								// "강의실이 등록되어있지 않습니다." 메시지 출력
								util.Msg.alert("NLS-CCS-M035");
								// 휴보강일자, 요일, 주차, 시작교시, 종료교시, 강의실코드, 강의실명 초기화
								doClearSkplcCtl(vnIdx);
								return false;
							}else {
								util.Grid.setCellValue(app, "grdCcsRestApp", "LECT_ROOM_CD", vsLectRoomCd, vnIdx);
								util.Grid.setCellValue(app, "grdCcsRestApp", "LECT_ROOM_NM", vsLectRoomNm, vnIdx, false, true);
							}
						
							// 요일세팅
							if(ValueUtil.isNull(vsSkplcDt)){
								util.Grid.setCellValue(app, "grdCcsRestApp", "DAY", "", vnIdx);
								return false;
							}else {
								var vsDay = moPage.doGetDay(vsSkplcDt);
								util.Grid.setCellValue(app, "grdCcsRestApp", "DAY", vsDay, vnIdx);
								util.Grid.setCellValue(app, "grdCcsRestApp", "WEEK_SEQ", vsWeekSeq, vnIdx);	// 서브미션 결과 주차정보
							}
							
						}else {
							// 휴보강일자, 요일, 주차, 시작교시, 종료교시, 강의실코드, 강의실명 초기화
							doClearSkplcCtl(vnIdx);
							return false;
						}
					});
				// End if 휴강일경우
				// 보강[CL10502]
				}else if(vsSkplcDivRcd == "CL10502"){
					// 요일세팅
					if(ValueUtil.isNull(vsSkplcDt)){
						util.Grid.setCellValue(app, "grdCcsRestApp", "DAY", "", vnIdx);
						return false;
					}else {
						var vsDay = moPage.doGetDay(vsSkplcDt);
						util.Grid.setCellValue(app, "grdCcsRestApp", "DAY", vsDay, vnIdx);
						util.Grid.setCellValue(app, "grdCcsRestApp", "WEEK_SEQ", vsWeekSeq, vnIdx);	// 서브미션 결과 주차정보
					}
					
					// 휴보강시간중복여부 확인
					//strCommand: getCheckDateAndGetLectDtForEmpty 
					util.Submit.send(app, "subChkDtAndGetLectDtForEmpty", function(pbSuccess){
						if(!pbSuccess){
							// 휴보강일자, 요일, 주차, 시작교시, 종료교시, 강의실코드, 강의실명 초기화
							doClearSkplcCtl(vnIdx);	
						}
					});
				}
			}else {
				// 휴보강일자, 요일, 주차, 시작교시, 종료교시, 강의실코드, 강의실명 초기화
				doClearSkplcCtl(vnIdx);
			}
		});
	};
	
	/**
	 * @desc 요일찾기
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 17
	 */
	function doGetDay (psDate) {
		var year = psDate.substring(0, 4);
		var mon = psDate.substring(4, 6);
		var day = psDate.substring(6, 8);
		var date = new Date(year, mon - 1, day);

		var weekNumber = date.getDay();
		var weekName = null;
		
		switch (weekNumber)
		{
			case 0 : weekName = ExtInstance.getValue("/root/resOnLoad/wdayRcdList/row", "CD_NM" , "child::CD='CL10207'"); break;
			case 1 : weekName = ExtInstance.getValue("/root/resOnLoad/wdayRcdList/row", "CD_NM" , "child::CD='CL10201'"); break;
			case 2 : weekName = ExtInstance.getValue("/root/resOnLoad/wdayRcdList/row", "CD_NM" , "child::CD='CL10202'"); break;
			case 3 : weekName = ExtInstance.getValue("/root/resOnLoad/wdayRcdList/row", "CD_NM" , "child::CD='CL10203'"); break;
			case 4 : weekName = ExtInstance.getValue("/root/resOnLoad/wdayRcdList/row", "CD_NM" , "child::CD='CL10204'"); break;
			case 5 : weekName = ExtInstance.getValue("/root/resOnLoad/wdayRcdList/row", "CD_NM" , "child::CD='CL10205'"); break;
			case 6 : weekName = ExtInstance.getValue("/root/resOnLoad/wdayRcdList/row", "CD_NM" , "child::CD='CL10206'"); break;
			default : break;
		}

		return weekName;
	};
	
	/**
	 * @desc 교수에대한 해당날짜의 수업교시 GET
	 * @param poCallBackFunc 콜백정의
	 * @return void
	 * @author 박갑수 at 2016. 2. 16
	 */
	function doCheckDateAndLectDt(poCallBackFunc) {
		//strCommand: getCheckDateAndGetLectDt 
		util.Submit.send(app, "subChkDtAndGetLectDt", function(pbSuccess){
			if(pbSuccess){
				// 조회 후 콜백함수 수행
				if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
			}
		});
	};
	
	/**
	 * @desc [rdIpbDtlDay]요일 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 17
	 */
	moPage.onValueChanged_RdIpbDtlDay = function() {
		var vnIdx = util.Grid.getIndex(app, "grdCcsRestApp");
		
		// 요일변경시
		var vsDay = util.Grid.getCellValue(app, "grdCcsRestApp", "DAY", vnIdx);
		
		// 일요일일경우
		if("CL10207" == vsDay) {
			// 일요일은 수업할수 없습니다.
			util.Msg.alert("NLS-CCS-M017");
			// 휴보강일자, 요일, 주차, 시작교시, 종료교시, 강의실코드, 강의실명 초기화
			doClearSkplcCtl(vnIdx);
		}
	};
	
	/**
	 * @desc [rdCbbDtlStLttm]시작교시 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 17
	 */
	moPage.onValueChanged_RdCbbDtlStLttm = function() {
		// 시작교시 종료교시 유효성 체크
		if(!doChkLttm()){
			util.Grid.setCellValue(app, "grdCcsRestApp", "ST_LTTM", "");
		}
	};
	
	/**
	 * @desc [rdCbbDtlEndLttm]종료교시 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 17
	 */
	moPage.onValueChanged_RdCbbDtlEndLttm = function() {
		// 시작교시 종료교시 유효성 체크
		if(!doChkLttm()){
			util.Grid.setCellValue(app, "grdCcsRestApp", "END_LTTM", "");
		}
	};
	
	/**
	 * @desc 시작교시 종료교시 유효성체크
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 17
	 */
	function doChkLttm(){
		var vbValid = true;
		
		var vnIdx = util.Grid.getIndex(app, "grdCcsRestApp");
		// 시작교시
		var vsStLttm = util.Grid.getCellValue(app, "grdCcsRestApp", "ST_LTTM");
		// 종료교시
		var vsEndLttm = util.Grid.getCellValue(app, "grdCcsRestApp", "END_LTTM");
		// 시작교시 종료교시 유효성 체크
		if(!ValueUtil.isNull(vsStLttm) && !ValueUtil.isNull(vsEndLttm)){
			if(Number(vsStLttm) > Number(vsEndLttm)){
				var vsEndLttmTitle = ExtControl.getTextValue("rhBtnDtlEndLttm");
				var vsStLttmTitle = ExtControl.getTextValue("rhBtnDtlStLttm");
				//  "@1 의 시간은 @2 의 시간 보다 빠를 수 없습니다." 메시지
				util.Msg.alert("NLS-CCS-M008", [vsEndLttmTitle, vsStLttmTitle]);
				
				vbValid = false;
				return vbValid;
			}
			
			// 휴보강구분 : 보강[CL10502]
			var vsSkplcDivRcd = util.Grid.getCellValue(app, "grdCcsRestApp", "SKPLC_DIV_RCD");
			// 보강일경우 보강교시 유효성체크
			if(ValueUtil.fixNull(vsSkplcDivRcd) == "CL10502"){
				// 보강시간 = 보강 종료교시 - 보강시작교시
				var vsSplcFrcStLttm = util.Grid.getCellValue(app, "grdCcsRestApp", "SPLC_FRC_ST_LTTM");
				var vsSplcFrcEndLttm = util.Grid.getCellValue(app, "grdCcsRestApp", "SPLC_FRC_END_LTTM");
				
				if(!ValueUtil.isNull(vsSplcFrcStLttm) && !ValueUtil.isNull(vsSplcFrcEndLttm)){
					var vnSplcTime = Number(vsSplcFrcEndLttm) - Number(vsSplcFrcStLttm);
					var vnLttmTime = Number(vsEndLttm) - Number(vsStLttm);
					
					if(vnSplcTime != vnLttmTime){
						// "보강시간의 시수[@]가 휴강시간의 시수[@]와 같지 않습니다." 메시지
						util.Msg.alert("NLS-CCS-M078", [vnLttmTime+1, vnSplcTime+1]);
						
						vbValid = false;
						return vbValid;
					}
				}
			}
		}
		
		return vbValid;
	};
	
	/**
	 * @desc [rdBtnDtlLectRoomCd]강의실명(돋보기버튼) onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 17
	 */
	moPage.onClick_RdBtnDtlLectRoomCd = function(sender) {
		// 강의실팝업 오픈 전 체크
		if(!doPreChkLectRoomPopup()){
			return false;
		}else {
			// 강의실검색팝업 호출
			doOnClickStdCcsPRoomPopup(sender);
		}
	};
	
	/**
	 * @desc [rdIpbDtlLectRoomNm]강의실명 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 17
	 */
	moPage.onValueChanged_RdIpbDtlLectRoomNm = function(sender) {
		// 강의실팝업 오픈 전 체크
		if(!doPreChkLectRoomPopup()){
			return false;
		}else {
			// 강의실검색팝업 호출
			doOnChangeStdCcsPRoomPopup(sender);
		}
	};
	
	/**
	 * @desc 강의실팝업 오픈 전 체크 		
	 *				1. 휴보강시간 중복여부가 'Y'인지 체크 - 빈강의실 포함여부,   
	 *				2. 교시정보 입력여부 체크
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 17
	 */
	function doPreChkLectRoomPopup(){
		var vbValid = true;
		
		// 휴보강시간 중복여부가 'Y'인지 체크 - 빈강의실 포함여부
		var vsCdPrp1 = util.DataMap.getValue(app, "dmResOnLoad", "strCdPrp1");

		if(ValueUtil.fixNull(vsCdPrp1) == "Y"){
			moPObject.moIdsForStdCcsPRoomPopup[0].iVacantRoomYn = "N";
		}else {
			moPObject.moIdsForStdCcsPRoomPopup[0].iVacantRoomYn = "Y";
		}
		
		var vsStLttm = util.Grid.getCellValue(app, "grdCcsRestApp", "ST_LTTM");
		var vsEndLttm = util.Grid.getCellValue(app, "grdCcsRestApp", "END_LTTM");
		var vsLectRoomNm = util.Grid.getCellValue(app, "grdCcsRestApp", "LECT_ROOM_NM");
		if(!ValueUtil.isNull(vsLectRoomNm)){
			if(ValueUtil.isNull(vsStLttm) || ValueUtil.isNull(vsEndLttm)){
				// "교시 정보를 먼저 입력해야합니다." 메시지
				util.Msg.alert("NLS-CCS-M020");
				util.Grid.setCellValue(app, "grdCcsRestApp", "LECT_ROOM_NM", "");
				vbValid = false;
				return vbValid;
			}
		}
		
		return vbValid;
	};
	

	/**
	 * @desc 신규데이터중 휴강데이터의 일자가 보강데이터의 일자와 일치하는 데이터가 있는지 체크
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 11
	 */
	function doCheckSkplcDtYn(psSplcFrcDt){
		// 유효성 true or false
		var vbValid = true;
		
		var vsRptId = "rptCcsRestApp"
		// 리피트 RowCnt
		var vnRowCnt 	= util.Grid.getRowCount(app, vsRptId);		
		
		for (var i = 0; i <= vnRowCnt; i++) {
			var vnIdx = i+1;
			
			var vsUptStatus = util.Grid.getCellValue(app, vsRptId, "UPT_STATUS", vnIdx);
			var vsSkplcDivRcd = util.Grid.getCellValue(app, vsRptId, "SKPLC_DIV_RCD", vnIdx);
			// 신규이고 휴보강구분이 휴강[CL10501]인경우
			if (vsUptStatus == "N" && vsSkplcDivRcd == "CL10501"){
				// 휴강일자
				var vsSkplcDt = util.Grid.getCellValue(app, vsRptId, "SKPLC_DT", vnIdx);
				// 보강일과 휴강일이 같은경우
				if(!ValueUtil.isNull(vsSkplcDt) && vsSkplcDt == psSplcFrcDt){
					// "휴강데이터를 먼저 저장 후 보강데이터를 저장하시기 바랍니다." 메시지
					util.Msg.alert("NLS-CCS-M073");
					vbValid = false;
					return vbValid;
				}
			}
		}
	
		return vbValid;
	};
	
	/**
	 * @desc [rdCbbDtlStLttm]시작교시 onSetFocus 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 17
	 */
	moPage.onSetFocus_RdCbbDtlStLttm = function() {
		// 교시정보 필터링
		doSetFilterLttm();
	};
	
	/**
	 * @desc [rdCbbDtlEndLttm]종료교시 onSetFocus 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 17
	 */
	moPage.onSetFocus_RdCbbDtlEndLttm = function() {
		// 교시정보 필터링
		doSetFilterLttm();
	};
	
	/**
	 * @desc 교시정보 필터링
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 17
	 */
	function doSetFilterLttm(){
		// 휴보강일자
		var vsSkplcDt = util.Grid.getCellValue(app, "grdCcsRestApp", "SKPLC_DT");
		// 교시정보 필터링
		if(!ValueUtil.isNull(vsSkplcDt)){
			
			var vsTmpLttm = util.Grid.getCellValue(app, "grdCcsRestApp", "TMP_LTTM");
			
			if(ValueUtil.isNull(vsTmpLttm)){
				var vnLength = util.DataSet.getRowCount(app, "dsLectDtInfo");
				var vsNodeSet = "/root/resOnLoad/weekSeqList/row[child::";
				for(var i=0; i<vnLength; i++){
					var vsLttm = util.DataSet.getValue(app, "dsLectDtInfo", "LTTM" , i+1);
					
					if(i < vnLength-1){
						vsNodeSet = vsNodeSet + "LTTM ='"+ vsLttm + "' or "
					// 마지막 로우
					}else {
						vsNodeSet = vsNodeSet + "LTTM ='"+ vsLttm + "']"
					}
				}
				util.Grid.setCellValue(app, "grdCcsRestApp", "TMP_LTTM", vsNodeSet);
				ExtControl.setAttr("rdCbbDtlStLttm", "nodeset", vsNodeSet);
				ExtControl.setAttr("rdCbbDtlEndLttm", "nodeset", vsNodeSet);
			}else {
				ExtControl.setAttr("rdCbbDtlStLttm", "nodeset", vsTmpLttm);
				ExtControl.setAttr("rdCbbDtlEndLttm", "nodeset", vsTmpLttm);
			}
		}else{
			ExtControl.setAttr("rdCbbDtlStLttm", "nodeset", "/root/resOnLoad/weekSeqList/row");
			ExtControl.setAttr("rdCbbDtlEndLttm", "nodeset", "/root/resOnLoad/weekSeqList/row");
		}
		util.Control.redraw(app, ["rdCbbDtlStLttm", "rdCbbDtlEndLttm"]);
	};
	
	/**
	 * @desc [btnSMS]휴보강목록 onUpdate 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 17
	 */
	moPage.onUpdate_RptCcsRestApp = function() {
		// 디테일 리피트 상태에 따른 마스터 활성화 제어
		doDtlRptStatus();
	};
	
	/**
	 * @desc [rdCbbDtlSplcFrcKeyValue]휴강일자 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 17
	 */
	moPage.onValueChanged_RdCbbDtlSplcFrcKeyValue = function() {
		
		var vsKeyValue = util.Grid.getCellValue(app, "grdCcsRestApp", "KEY_VALUE");
		// 휴강일자
		var vsSkplcDt = ExtInstance.getValue("/root/resList/restDayList/row", "SKPLC_DT" , "child::KEY_VALUE='"+vsKeyValue+"'");
		var vsStLttm = ExtInstance.getValue("/root/resList/restDayList/row", "ST_LTTM" , "child::KEY_VALUE='"+vsKeyValue+"'");
		var vsEndLttm = ExtInstance.getValue("/root/resList/restDayList/row", "END_LTTM" , "child::KEY_VALUE='"+vsKeyValue+"'");
				
		// 현재 Index
		var vnNowIdx = util.Grid.getIndex(app, "grdCcsRestApp");
		// 보강예상일자 중복체크
		var vnRowCnt = util.Grid.getRowCount(app, "grdCcsRestApp");
		for(var i=0; i<vnRowCnt; i++){
			var vnIdx = i+1;
			// 휴보강구분 : 보강[CL10502]일경우만
			var vsSkplcDivRcd = util.Grid.getCellValue(app, "grdCcsRestApp", "SKPLC_DIV_RCD", vnIdx);
			if(vsSkplcDivRcd != "CL10502") continue;
			
			// 삭제인경우 제외
			var vsUptStatus = util.Grid.getCellValue(app, "grdCcsRestApp", "UPT_STATUS", vnIdx);
			if(vsUptStatus == "D") continue;
			
			// 자기자신제외
			if(vnNowIdx == vnIdx) continue;
			
			var vsKeyValueOri = util.Grid.getCellValue(app, "grdCcsRestApp", "KEY_VALUE", vnIdx);
			
			// 같다면 중복처리
			if(vsKeyValue == vsKeyValueOri){
				
				// [@]일에 해당하는 보강이 존재합니다. 
				util.Msg.alert("NLS-CCS-M077", [vsSkplcDt.substr(0,8)]);
				
				util.Grid.setCellValue(app, "grdCcsRestApp", "SPLC_FRC_DT", "");
				util.Grid.setCellValue(app, "grdCcsRestApp", "KEY_VALUE", "");
				
				return;
			}
		}

		// 보강예상일자에 휴강일자 세팅
		util.Grid.setCellValue(app, "grdCcsRestApp", "SPLC_FRC_DT", vsSkplcDt);
		util.Grid.setCellValue(app, "grdCcsRestApp", "SPLC_FRC_ST_LTTM", vsStLttm);
		util.Grid.setCellValue(app, "grdCcsRestApp", "SPLC_FRC_END_LTTM", vsEndLttm);
		
		// 시작교시 종료교시 유효성 체크
		if(!doChkLttm()){
			util.Grid.setCellValue(app, "grdCcsRestApp", "SPLC_FRC_DT", "");
			util.Grid.setCellValue(app, "grdCcsRestApp", "SPLC_FRC_ST_LTTM", "");
			util.Grid.setCellValue(app, "grdCcsRestApp", "SPLC_FRC_END_LTTM", "");
			util.Grid.setCellValue(app, "grdCcsRestApp", "KEY_VALUE", "");
		}
		
		// 휴보강일자
		var vsSkplcDt = util.Grid.getCellValue(app, "grdCcsRestApp", "SKPLC_DT");
		// 공휴일 보강의 미달강좌보강기간체크
		if(!ValueUtil.isNull(vsKeyValue) && !ValueUtil.isNull(vsSkplcDt)){
			var vsSplcFrcDivRcd = ExtInstance.getValue("/root/resList/restDayList/row", "SKPLC_DIV_RCD" , "child::KEY_VALUE='"+ vsKeyValue +"'");
			util.DataMap.setValue(app, "dmReqKey", "strSplcFrcDivRcd", vsSplcFrcDivRcd);
			
			//strCommand: getChkSplcFrcPeriod 
			util.Submit.send(app, "subChkSplcFrcPeriod", function(pbSuccess){
				if(!pbSuccess){
					// 보강정보 초기화
					util.Grid.setCellValue(app, "grdCcsRestApp", "SPLC_FRC_DT", "");
					util.Grid.setCellValue(app, "grdCcsRestApp", "SPLC_FRC_ST_LTTM", "");
					util.Grid.setCellValue(app, "grdCcsRestApp", "SPLC_FRC_END_LTTM", "");
					util.Grid.setCellValue(app, "grdCcsRestApp", "KEY_VALUE", "");
				}
			});
			
		}else {
			util.DataMap.setValue(app, "dmReqKey", "strSplcFrcDivRcd", "");
		}
	};
	
	/**
	 * @desc import SmsEmail발송 초기화
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 5. 17
	 */
	moPage.onLoadImportDone_ImpSnd = function() {
		doExtCmnSmsEmailLoad();
	};
	
	
	/**
	 * @desc import 발송문작성 버튼 공통스트립트 전 이벤트
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 5. 17
	 */
	function doBefAppExtCmnSmsEmailSend() {

		var vnRowIdx = util.Grid.getIndex(app, "grdCcsRestApp");
		// 리피트 row 선택여부 체크
		if(vnRowIdx == "0"){
			
			var vsMsgParam = util.Grid.getTitle(app, "grdCcsRestAppCcsRestApp");
			// "@(을)를 선택해주세요" 메시지 출력
			util.Msg.alert("NLS-INF-M045", [vsMsgParam]);
			return false;
		}
		
		// 마스터 row(대상) 변경내역 체크
		if(util.Grid.isModified(app, ["grdCcsRestApp"])){
			// "휴보강목록에 변경내역이 존재합니다.\n작업저장 후에 SMS 발송이 가능합니다." 메시지 출력			
			util.Msg.alert("NLS-CCS-M080");
			return false;
		}
	};
	
	/**
	 * @desc 학생목록, SMS목록 조회
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 5. 17
	 */
	function doGetStudList(poCallBackFunc){
		
		util.DataMap.setValue(app, "dmReqSelRowApp", "strRefKey", util.Grid.getCellValue(app, "grdCcsRestApp", "REF_KEY"));
		util.DataMap.setValue(app, "dmReqSelRowApp", "strProfObjNo", util.Grid.getCellValue(app, "grdCcsRestApp", "PROF_OBJ_NO"));
		util.DataMap.setValue(app, "dmReqSelRowApp", "strSkplcDt", util.Grid.getCellValue(app, "grdCcsRestApp", "SKPLC_DT"));
		util.DataMap.setValue(app, "dmReqSelRowApp", "strSkplcDivRcd", util.Grid.getCellValue(app, "grdCcsRestApp", "SKPLC_DIV_RCD"));
		util.DataMap.setValue(app, "dmReqSelRowApp", "strSbNm", util.Grid.getCellValue(app, "grdCcsOpenSub", "SB_NM"));
		util.DataMap.setValue(app, "dmReqSelRowApp", "strDay", util.Grid.getCellValue(app, "grdCcsRestApp", "DAY"));
		util.DataMap.setValue(app, "dmReqSelRowApp", "strStLttm", util.Grid.getCellValue(app, "grdCcsRestApp", "ST_LTTM"));
		util.DataMap.setValue(app, "dmReqSelRowApp", "strEndLttm", util.Grid.getCellValue(app, "grdCcsRestApp", "END_LTTM"));
		util.DataMap.setValue(app, "dmReqSelRowApp", "strLectRoomNm", util.Grid.getCellValue(app, "grdCcsRestApp", "LECT_ROOM_NM"));
		util.DataMap.setValue(app, "dmReqSelRowApp", "strSplcFrcDt", util.Grid.getCellValue(app, "grdCcsRestApp", "SPLC_FRC_DT"));
		
		//strCommand: listStud 
		util.Submit.send(app, "subStudList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdStudList");
	
				moPObject.moIdsForExtCmnSender.sendMsgContSms = util.DataMap.getValue(app, "dmResList", "strSmsCont");
				moPObject.moIdsForExtCmnSender.sendTitleSms = util.DataMap.getValue(app, "dmResList", "strSmsTitle");
			}
			
			// 조회 후 콜백함수 수행
			if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
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
		
		// 2. 변경사항저장여부 체크
		if(util.Grid.isModified(app, "grdCcsRestApp")){
			// '변경된 사항이 있습니다.\n변경 저장 혹은 취소 후  작업을 다시 수행 하십시오.'
			ComMsg.warn("M014");
			return false;
		}
		
		// 휴보강구분 [CL105]
		var vsSkplcDivRcd = util.Grid.getCellValue(app, "grdCcsRestApp", "SKPLC_DIV_RCD");
		var vsRestAppKey = "";
		
		// 공휴일의 보강자료인지 확인
		var vsKeyValue = util.Grid.getCellValue(app, "grdCcsRestApp", "KEY_VALUE");
		var vsSkplcDivRcdLink = ExtInstance.getValue("/root/resList/restDayList/row", "SKPLC_DIV_RCD" , "child::KEY_VALUE='"+ vsKeyValue +"'");
		
		// 휴보강구분이 공휴일[CL10503] 일경우 경고메시지
		if(ValueUtil.fixNull(vsSkplcDivRcd) == "CL10503" || ValueUtil.fixNull(vsSkplcDivRcdLink) == "CL10503"){
			// 공휴일자료는 출력할 수 없습니다.
			util.Msg.alert("NLS-CCS-EXT015");
			
			return false;
		}else {
			
			// 휴강 [CL10501] 일경우
			if(ValueUtil.fixNull(vsSkplcDivRcd) == "CL10501"){
				
				var vsRefKey = util.Grid.getCellValue(app, "grdCcsRestApp", "REF_KEY");
				var vsProfObjNo = util.Grid.getCellValue(app, "grdCcsRestApp", "PROF_OBJ_NO");
				var vsSkplcDt = util.Grid.getCellValue(app, "grdCcsRestApp", "SKPLC_DT");
				var vsStLttm = util.Grid.getCellValue(app, "grdCcsRestApp", "ST_LTTM");
				var vsEndLttm = util.Grid.getCellValue(app, "grdCcsRestApp", "END_LTTM");
								
				vsRestAppKey = "('" + vsRefKey + vsProfObjNo + vsSkplcDt.substring(0, 8) +  vsStLttm + vsEndLttm + "')";
				
			// 보강 [CL10502] 일경우
			}else {
				
				var vsRefKey = util.Grid.getCellValue(app, "grdCcsRestApp", "REF_KEY");
				var vsProfObjNo = util.Grid.getCellValue(app, "grdCcsRestApp", "PROF_OBJ_NO");
				var vsSkplcDt = util.Grid.getCellValue(app, "grdCcsRestApp", "SPLC_FRC_DT");
				var vsStLttm = util.Grid.getCellValue(app, "grdCcsRestApp", "SPLC_FRC_ST_LTTM");
				var vsEndLttm = util.Grid.getCellValue(app, "grdCcsRestApp", "SPLC_FRC_END_LTTM");
				
				vsRestAppKey = "('" + vsRefKey + vsProfObjNo + vsSkplcDt.substring(0, 8) +  vsStLttm + vsEndLttm + "')";
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
				
		ReportUtil.fOzPopupOpen("결 · 보강계", "extCcsSRestSteadSchedule", voOzFormParam, voParam);
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
		
		// 휴보강구분 [CL105]
		var vsSkplcDivRcd = util.Grid.getCellValue(app, "grdCcsRestApp", "SKPLC_DIV_RCD");
		var vsRestAppKey = "";
		
		// 공휴일의 보강자료인지 확인
		var vsKeyValue = util.Grid.getCellValue(app, "grdCcsRestApp", "KEY_VALUE");
		var vsSkplcDivRcdLink = ExtInstance.getValue("/root/resList/restDayList/row", "SKPLC_DIV_RCD" , "child::KEY_VALUE='"+ vsKeyValue +"'");
		
		// 휴보강구분이 공휴일[CL10503] 일경우 경고메시지
		if(ValueUtil.fixNull(vsSkplcDivRcd) == "CL10503" || ValueUtil.fixNull(vsSkplcDivRcdLink) == "CL10503"){
			// 공휴일자료는 출력할 수 없습니다.
			util.Msg.alert("NLS-CCS-EXT015");
			
			return false;
		}else {
			
			// 휴강 [CL10501] 일경우
			if(ValueUtil.fixNull(vsSkplcDivRcd) == "CL10501"){
				
				var vsRefKey = util.Grid.getCellValue(app, "grdCcsRestApp", "REF_KEY");
				var vsProfObjNo = util.Grid.getCellValue(app, "grdCcsRestApp", "PROF_OBJ_NO");
				var vsSkplcDt = util.Grid.getCellValue(app, "grdCcsRestApp", "SKPLC_DT");
								
				vsRestAppKey = "('" + vsRefKey + vsProfObjNo + vsSkplcDt.substring(0, 8) + "')";
				
			// 보강 [CL10502] 일경우
			}else {
				
				var vsRefKey = util.Grid.getCellValue(app, "grdCcsRestApp", "REF_KEY");
				var vsProfObjNo = util.Grid.getCellValue(app, "grdCcsRestApp", "PROF_OBJ_NO");
				var vsSkplcDt = util.Grid.getCellValue(app, "grdCcsRestApp", "SPLC_FRC_DT");
				
				vsRestAppKey = "('" + vsRefKey + vsProfObjNo + vsSkplcDt.substring(0, 8) + "')";
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
	
	return moPage;
};
