//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./stdCcsCRestApp1.xtm"/>

/**
 * 휴보강관리1 - 휴강 보강 분리
 * @class stdCcsCRestApp1
 * @author 박갑수 at 2016. 8. 19
 */
var stdCcsCRestApp1 = function() {
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
		 controlId					: "rdBtnDtlLectRoomCd1",			
		 iLanDivRcd				: "",			
		 iBdCd						: "",		
		 iLectRoomNm			: "rdIpbDtlLectRoomNm1",		
		 iKeyDate					: "/root/keyDateMap/END_DT",
		 iLectDate					: "rdDipDtlSkplcDt1",
		 iStTime					: "rdCbbDtlStLttm1", 			
		 iEndTime					: "rdCbbDtlEndLttm1",			
		 iVacantRoomYn		: "",			
		 oLectRoomCd			: "rdIpbDtlLectRoomCd1",			
		 oBdCd						: "",			
		 oLectRoomNm			: "rdIpbDtlLectRoomNm1",			
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
		defSenderSms     		: "031",													// (선택) 보내는이(SMS)
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
	 * @author 박갑수 at 2016. 8. 19
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		// import 헤더 초기화
		doHeaderOnLoad();
	};
	
	/**
	 * @desc onLoad 실행
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 8. 19
	 */
	moPage.onModelConstructDone_StdCcsCRestApp1 = function() {
		// 리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["rptCcsOpenSub", "rptCcsRestApp", "rptStudList", "rptCcsRestApp1"]);
		// 검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grpData", "grpDataDtl", "grpDataDtl1"]);
		
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
						util.Control.setVisible(app, false, ["btnNew", "btnDel", "btnRestore", "btnSave", "btnNewDtl", "btnDelDtl", "btnRestoreDtl", "btnSaveDtl"]);
						util.Control.setReadOnly(app, true, ["rptCcsRestApp", "rptCcsRestApp1"]);
					}else {
						util.Control.setVisible(app, true, ["btnNew", "btnDel", "btnRestore", "btnSave", "btnNewDtl", "btnDelDtl", "btnRestoreDtl", "btnSaveDtl"]);
						util.Control.setReadOnly(app, false, ["rptCcsRestApp", "rptCcsRestApp1"]);
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
	 * @author 박갑수 at 2016. 8. 19
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
	 * @author 박갑수 at 2016. 8. 19
	 */
	moPage.onValueChanged_CbbSmtRcd = function() {
		// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
		doChangeYearSmt("smt");
	};
	
	/**
	 * @desc [cbbSmtRcd]학기 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 8. 19
	 */
	moPage.onValueChanged_CbbSchYearRcd = function() {
		// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
		doChangeYearSmt("year");
	};
	
	/**
	 * @desc 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 8. 19
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
	 * @author 박갑수 at 2016. 8. 19
	 */
	moPage.onClick_BtnProfObjNo = function(sender) {
		// 교직원검색팝업 호출
		doOnClickStdCmnPPrsnSearch(sender);
	};
	
	/**
	 * @desc [ipbProfNm]교수명 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 8. 19
	 */
	moPage.onValueChanged_IpbProfNm = function(sender) {
		// 리피트 변경사항 체크
		if(util.Grid.isModified(app, ["grdCcsRestApp", "grdCcsRestApp1"])){
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
	 * @author 박갑수 at 2016. 8. 19
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
	 * @author 박갑수 at 2016. 8. 19
	 */
	function doList(poCallBackFunc) {
		// 디테일 리피트 변경시 변경내역 체크 방지
		util.Control.reset(app, "rptCcsRestApp");
		util.Control.reset(app, "rptCcsRestApp1");
		
		//strCommand: listProf 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdCcsOpenSub");
			
				// 마스터에 데이터가 없을 경우 디테일 입력 불가
				if(util.Grid.getRowCount(app, "grdCcsOpenSub") < 1){
					util.Control.setEnable(app, false,["grpDataDtl", "grpDataDtl1"]);
					util.Control.reset(app, "rptCcsRestApp");
					util.Control.reset(app, "rptCcsRestApp1");
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
	 * @author 박갑수 at 2016. 8. 19
	 */
	function doDtlRptStatus(){
		if(util.Grid.isModified(app, "grdCcsRestApp")){
			util.Control.setEnable(app, false, ["grpData", "grpDataDtl1", "impSnd"]);
		}else{
			
			if(ValueUtil.fixNumber(util.Grid.getRowCount(app, "grdCcsRestApp")) > 0){
				util.Control.setEnable(app, true, ["grpDataDtl1", "impSnd"]);
			}else {
				util.Control.setEnable(app, false, ["grpDataDtl1", "impSnd"]);
			}
			
			util.Control.setEnable(app, true, ["grpData"]);
		}
	};
	
	/**
	 * @desc [rptCcsOpenSub]강의목록 onRowSelect 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 8. 19
	 */
	moPage.onRowSelect_RptCcsOpenSub = function() {
		// 휴강목록조회
		doListDtl();
	};
	
	/**
	 * @desc 휴강 목록 조회
	 * @param poCallBackFunc 콜백정의
	 * @return void
	 * @author 박갑수 at 2016. 8. 19
	 */
	function doListDtl(poCallBackFunc) {	
		// 참조키
		util.DataMap.setValue(app, "dmReqKey", "strRefKey", util.Grid.getCellValue(app, "grdCcsOpenSub", "REF_KEY"));
		util.DataMap.setValue(app, "dmReqKey", "strSaCd", util.Grid.getCellValue(app, "grdCcsOpenSub", "SA_CD"));
		util.DataMap.setValue(app, "dmReqKey", "strSaObjDivRcd", util.Grid.getCellValue(app, "grdCcsOpenSub", "SA_OBJ_DIV_RCD"));
		util.DataMap.setValue(app, "dmReqKey", "strProfObjNo", util.Grid.getCellValue(app, "grdCcsOpenSub", "PROF_OBJ_NO"));
				
		ExtRepeat.setPkValues("rptCcsRestApp", ExtRepeat.getPKColRowValues("rptCcsRestApp"))
		
		// 디테일 리피트 변경시 변경내역 체크 방지
		util.Control.redraw(app, "grdCcsRestApp1");
		//strCommand: listRest 
		util.Submit.send(app, "subListDtl", function(pbSuccess){
			if(pbSuccess){
				
				util.Control.redraw(app, "grdCcsRestApp");
				
				//  휴보강목록 존재여부에따른 SMS활성화 여부
				if(util.Grid.getRowCount(app, "grdCcsRestApp") == 0){
					util.Control.setEnable(app, false, ["impSnd"]);
				}
			
				// 마스터에 데이터가 없을 경우 디테일 입력 불가
				if(util.Grid.getRowCount(app, "grdCcsRestApp") < 1){
					util.Control.setEnable(app, false,["grpDataDtl1"]);
					util.Control.reset(app, "rptCcsRestApp1");
					
					//  휴강목록 존재여부에따른 SMS활성화 여부
					util.Control.setEnable(app, false, ["impSnd"]);
				}else{
					// 각 컨트롤 활성화 제어
					doDtlRptStatus1();
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
	 * @author 박갑수 at 2016. 8. 19
	 */
	function doDtlRptStatus1(){
		if(util.Grid.isModified(app, "grdCcsRestApp1")){
			util.Control.setEnable(app, false, ["grpDataDtl", "grpData"]);
		}else{
			var vnRowCnt = util.Grid.getRowCount(app, "grdCcsRestApp");
			
			if(ValueUtil.fixNumber(vnRowCnt) > 0){
				util.Control.setEnable(app, true, ["grpDataDtl1"]);
			}else {
				util.Control.setEnable(app, false, ["grpDataDtl1"]);
			}
			
			util.Control.setEnable(app, true, ["grpDataDtl", "grpData"]);
		}
	};
	
	/**
	 * @desc [rptCcsRestApp]휴보강목록 onRowSelect 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 8. 19
	 */
	moPage.onRowSelect_RptCcsRestApp = function() {
		if(cpr.data.tabledata.RowState.INSERTED == util.Grid.getRowState(app, "grdCcsRestApp")){
			util.Control.reset(app, "rptCcsRestApp1");
		}else {
			// 보강목록조회
			doListDtl1(function(pbSuccess){
				if (pbSuccess){
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
				}
			});
		}
	};
	
	/**
	 * @desc 학생목록, SMS목록 조회
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 8. 22
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
		
		//strCommand: listStud 
		util.Submit.send(app, "subStudList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdStudList");
			}
			
			// 조회 후 콜백함수 수행
			if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
		});
	};
	
	/**
	 * @desc Email Sms값 재설정
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 8. 22
	 */
	doBefAppExtCmnSmsEmailSend = function(){
		moPObject.moIdsForExtCmnSender.sendMsgContSms = util.DataMap.getValue(app, "dmResList", "strSmsCont");
		moPObject.moIdsForExtCmnSender.sendTitleSms = util.DataMap.getValue(app, "dmResList", "strSmsTitle");
	};

	/**
	 * @desc [rptCcsRestApp]휴보강목록 onUpdate 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 8. 19
	 */
	moPage.onUpdate_RptCcsRestApp = function() {
		// 디테일 리피트 상태에 따른 마스터 활성화 제어
		doDtlRptStatus();
	};
	
	/**
	 * @desc 보강 목록 조회
	 * @param poCallBackFunc 콜백정의
	 * @return void
	 * @author 박갑수 at 2016. 8. 19
	 */
	function doListDtl1(poCallBackFunc) {
		
		var vsSkplcDt = ValueUtil.fixNull(util.Grid.getCellValue(app, "grdCcsRestApp", "SKPLC_DT"));
		// 참조키
		util.DataMap.setValue(app, "dmReqKey", "strAppSkplcDt", vsSkplcDt);
		util.DataMap.setValue(app, "dmReqKey", "strAppStLttm", util.Grid.getCellValue(app, "grdCcsRestApp", "ST_LTTM"));
		util.DataMap.setValue(app, "dmReqKey", "strAppEndLttm", util.Grid.getCellValue(app, "grdCcsRestApp", "END_LTTM"));
		
		//strCommand: listApp 
		util.Submit.send(app, "subListDtl1", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdCcsRestApp1");
				
				// 각 컨트롤 활성화 제어
				doDtlRptStatus1();
			}
			
			// 조회 후 콜백함수 수행
			if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
		});
	};
	
	/**
	 * @desc [btnNewDtl]신규 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 8. 19
	 */
	moPage.onClick_BtnNewDtl = function() {
		// 신규로우 추가
		var vnIdx = util.Grid.insertRow(app, "grdCcsRestApp", "rdCbbDtlSkplcDivRcd");
		
		// 신규 Defalut값 설정 
		// 참조키 : 마스터목록
		var vsRefKey = util.Grid.getCellValue(app, "grdCcsOpenSub", "REF_KEY");
		util.Grid.setCellValue(app, "grdCcsRestApp", "REF_KEY", vsRefKey, vnIdx);
		
		// 교수오브젝트번호 : 마스터목록
		var vsProfObjNo = util.Grid.getCellValue(app, "grdCcsOpenSub", "PROF_OBJ_NO");
		util.Grid.setCellValue(app, "grdCcsRestApp", "PROF_OBJ_NO", vsProfObjNo, vnIdx);
		
		// 휴보강구분 : 휴강[CL10501]
		var vsSkplcDivRcd = "CL10501";
		util.Grid.setCellValue(app, "grdCcsRestApp", "SKPLC_DIV_RCD", vsSkplcDivRcd, vnIdx);
		
		// 디테일 리피트 상태에 따른 마스터 활성화 제어
		doDtlRptStatus();
	};
	
	/**
	 * @desc [btnDelDtl]삭제 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 8. 19
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
		
		var vsRowCnt = util.Grid.getRowCount(app, "grdCcsRestApp1");
		if(ValueUtil.fixNumber(vsRowCnt) > 0){
			// 보강목록이 존재합니다.\n보강목록 삭제 후 휴강목록 삭제가 가능합니다.
			util.Msg.alert("NLS-CCS-M084");
			return false;
		}
		
		// 삭제
		util.Grid.deleteRow(app, "grdCcsRestApp");
		// 디테일 리피트 상태에 따른 마스터 활성화 제어
		doDtlRptStatus();
	};
	
	/**
	 * @desc [btnRestoreDtl]작업취소 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 8. 19
	 */
	moPage.onClick_BtnRestoreDtl = function() {
		// 작업취소
		util.Grid.restoreRow(app, "grdCcsRestApp");
		// 디테일 리피트 상태에 따른 마스터 활성화 제어
		doDtlRptStatus();
	};
	
	/**
	 * @desc [btnSaveDtl]작업저장 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 8. 19
	 */
	moPage.onClick_BtnSaveDtl = function() {
		// 작업저장
		doSave();
	};
	
	/**
	 * @desc 휴강 목록 변경사항 저장
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 8. 19
	 */
	function doSave() {
		
		// 리피트 변경사항 체크
		if(!util.Grid.isModified(app, ["grdCcsRestApp"], "MSG")){
			return false;
		}
		
		// 리피트 Validation Check		
		if(!util.validate(app, "grdCcsRestApp")) return false;
		
		var vsCutDt = util.DataMap.getValue(app, "dmResOnLoad", "strCutDt");
		vsCutDt = vsCutDt.substr(0, 8);
		
		var vnRowCnt = util.Grid.getRowCount(app, "grdCcsRestApp");
		for(var i=0; i< vnRowCnt; i++){
			var vnIdx = i+1;
			
			var vnUptStatus = util.Grid.getCellValue(app, "grdCcsRestApp", "UPT_STATUS", vnIdx);
			
			if(ValueUtil.fixNull(vnUptStatus) == "N"){
				var vsSkplcDt = util.Grid.getCellValue(app, "grdCcsRestApp", "SKPLC_DT", vnIdx);
				
				if(vsSkplcDt < vsCutDt){
					//alert("현재 일자이전 수업을 휴/보강 처리 할 수 없습니다.");
					
					util.Msg.alert("NLS-CCS-M088");
				}
				
				
				if(vsSkplcDt.indexOf("000000") == -1){
					util.Grid.setCellValue(app, "grdCcsRestApp", "SKPLC_DT", vsSkplcDt + "000000", vnIdx);
				}
			}
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
	 * @desc [rdDipDtlSkplcDt]휴보강일자 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 8. 19
	 */
	moPage.onValueChanged_RdDipDtlSkplcDt = function() {
		var vnIdx = util.Grid.getIndex(app, "grdCcsRestApp");

		var vsSkplcDivRcd = util.Grid.getCellValue(app, "grdCcsRestApp", "SKPLC_DIV_RCD");
		var vsSkplcDt = util.Grid.getCellValue(app, "grdCcsRestApp", "SKPLC_DT");
		// 2. 휴보강일자 빈값인지 체크
		if(ValueUtil.isNull(vsSkplcDt)){
			// 휴보강일자, 요일, 주차, 시작교시, 종료교시, 강의실코드, 강의실명 초기화
			doClearSkplcCtl(vnIdx);
			return false;
		}

		util.DataMap.setValue(app, "dmReqKey", "strSkplcDt", vsSkplcDt);
		util.DataMap.setValue(app, "dmReqKey", "strSkplcDivRcd", vsSkplcDivRcd);
		
		// 미달강좌보강기간 체크용
		util.DataMap.setValue(app, "dmReqKey", "strSplcFrcDivRcd", "");
		
		// 3. 주차정보 조회
		//strCommand: getWeekSeq 
		util.Submit.send(app, "subWeekSeq", function(pbSuccess){
			if(pbSuccess){
				
				var vsWeekSeq = util.DataMap.getValue(app, "dmResList", "strWeekSeq");
					
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
						
						var vnAttendCnt = ValueUtil.fixNumber(util.DataMap.getValue(app, "dmResList", "strAttendCnt"));
						if(vnAttendCnt > 0 ){
							//-- @1일 출결 정보가 존재합니다. 보강하시는 일자에 출결정보를 입력하세요.
							/*
								@1일 출결 정보는 삭제 됩니다. 보강하시는 일자에 출결정보를 입력하세요.
							*/
							util.Msg.alert("NLS-CCS-M085", [vsSkplcDt]);
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
			
			}else {
				// 휴보강일자, 요일, 주차, 시작교시, 종료교시 초기화
				doClearSkplcCtl(vnIdx);
			}
		});
	};
	
	/**
	 * @desc 후보강관련 컬럼 초기화
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 8. 19
	 */
	function doClearSkplcCtl(poRowIdx){
		// 휴보강일자, 요일, 주차, 시작교시, 종료교시, 강의실코드, 강의실명 초기화
		util.Grid.setCellValue(app, "grdCcsRestApp", "SKPLC_DT", "", poRowIdx);
		util.Grid.setCellValue(app, "grdCcsRestApp", "DAY", "", poRowIdx);
		util.Grid.setCellValue(app, "grdCcsRestApp", "WEEK_SEQ", "", poRowIdx);
		util.Grid.setCellValue(app, "grdCcsRestApp", "ST_LTTM", "", poRowIdx);
		util.Grid.setCellValue(app, "grdCcsRestApp", "END_LTTM", "", poRowIdx);
		util.Grid.setCellValue(app, "grdCcsRestApp", "LECT_ROOM_NM", "", poRowIdx);
		util.Grid.setCellValue(app, "grdCcsRestApp", "LECT_ROOM_CD", "", poRowIdx);
	};
	
	/**
	 * @desc 요일찾기
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 8. 19
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
	 * @author 박갑수 at 2016. 8. 19
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
	 * @author 박갑수 at 2016. 8. 19
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
	 * @author 박갑수 at 2016. 8. 22
	 */
	moPage.onValueChanged_RdCbbDtlStLttm = function() {
		// 시작교시 종료교시 유효성 체크
		if(!doChkLttm()){
			util.Grid.setCellValue(app, "grdCcsRestApp", "ST_LTTM", "");
		}
	};
	
	/**
	 * @desc [rdCbbDtlStLttm]시작교시 onSetFocus 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 8. 19
	 */
	moPage.onSetFocus_RdCbbDtlStLttm = function() {
		// 교시정보 필터링
		doSetFilterLttm();
	};
	
	/**
	 * @desc [rdCbbDtlEndLttm]종료교시 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 8. 22
	 */
	moPage.onValueChanged_RdCbbDtlEndLttm = function() {
		// 시작교시 종료교시 유효성 체크
		if(!doChkLttm()){
			util.Grid.setCellValue(app, "grdCcsRestApp", "END_LTTM", "");
		}
	};
	
	/**
	 * @desc [rdCbbDtlEndLttm]종료교시 onSetFocus 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 8. 19
	 */
	moPage.onSetFocus_RdCbbDtlEndLttm = function() {
		// 교시정보 필터링
		doSetFilterLttm();
	};
	
	/**
	 * @desc 시작교시 종료교시 유효성체크
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 8. 22
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
		}
		
		return vbValid;
	};
	
	/**
	 * @desc 교시정보 필터링
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 8. 19
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
	 * @desc import SmsEmail발송 초기화
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 8. 22
	 */
	moPage.onLoadImportDone_ImpSnd = function() {
		doExtCmnSmsEmailLoad();
	};
	
	/**
	 * @desc [btnNewDtl1]신규 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 8. 22
	 */
	moPage.onClick_BtnNewDtl1 = function() {
		// 신규로우 추가
		var vnIdx = util.Grid.insertRow(app, "grdCcsRestApp1", "rdDipDtlSkplcDt1");
		
		// 신규 Defalut값 설정 
		// 참조키 : 마스터목록
		var vsRefKey = util.Grid.getCellValue(app, "grdCcsRestApp", "REF_KEY");
		util.Grid.setCellValue(app, "grdCcsRestApp1", "REF_KEY", vsRefKey, vnIdx);
		
		// 교수오브젝트번호 : 마스터목록
		var vsProfObjNo = util.Grid.getCellValue(app, "grdCcsRestApp", "PROF_OBJ_NO");
		util.Grid.setCellValue(app, "grdCcsRestApp1", "PROF_OBJ_NO", vsProfObjNo, vnIdx);
		
		// 휴보강구분 : 보강[CL10502]
		var vsSkplvDivRcd = "CL10502"
		util.Grid.setCellValue(app, "grdCcsRestApp1", "SKPLC_DIV_RCD", vsSkplvDivRcd, vnIdx);
		
		// 휴강일자(보강예상일) : 마스터목록
		var vsSkplcDt = util.Grid.getCellValue(app, "grdCcsRestApp", "SKPLC_DT");
		util.Grid.setCellValue(app, "grdCcsRestApp1", "SPLC_FRC_DT", vsSkplcDt, vnIdx);
		
		// 시작교시(보강예상시작교시) : 마스터목록
		var vsStLttm = util.Grid.getCellValue(app, "grdCcsRestApp", "ST_LTTM");
		util.Grid.setCellValue(app, "grdCcsRestApp1", "SPLC_FRC_ST_LTTM", vsStLttm, vnIdx);
		
		// 종료교시(보강예상종료교시) : 마스터목록
		var vsEndLttm = util.Grid.getCellValue(app, "grdCcsRestApp", "END_LTTM");
		util.Grid.setCellValue(app, "grdCcsRestApp1", "SPLC_FRC_END_LTTM", vsEndLttm, vnIdx);
		
		// 디테일 리피트 상태에 따른 마스터 활성화 제어
		doDtlRptStatus1();
	};
	
	/**
	 * @desc [btnDelDtl1]삭제 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 8. 22
	 */
	moPage.onClick_BtnDelDtl1 = function() {
		// 삭제
		util.Grid.deleteRow(app, "grdCcsRestApp1");
		// 디테일 리피트 상태에 따른 마스터 활성화 제어
		doDtlRptStatus1();
	};
	
	/**
	 * @desc [btnRestoreDtl1]작업취소 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 8. 22
	 */
	moPage.onClick_BtnRestoreDtl1 = function() {
		// 작업취소
		util.Grid.restoreRow(app, "grdCcsRestApp1");
		// 디테일 리피트 상태에 따른 마스터 활성화 제어
		doDtlRptStatus1();
	};
	
	/**
	 * @desc [btnSaveDtl1]작업저장 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 8. 22
	 */
	moPage.onClick_BtnSaveDtl1 = function() {
		// 작업저장
		doSave1();
	};
	
	/**
	 * @desc 보강 목록 변경사항 저장
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 8. 22
	 */
	function doSave1() {
		
		// 리피트 변경사항 체크
		if(!util.Grid.isModified(app, ["grdCcsRestApp1"], "MSG")){
			return false;
		}
		
		// 리피트 Validation Check		
		if(!util.validate(app, "grdCcsRestApp1")) return false;
		
		
		/*
			야간 수업은 야간 보강
			주간 수업은 주간 보강 교시를 입력 해야한다.
		*/
		if(!page.checkDayNightLttm())return false;
		
		//strCommand: save 
		util.Submit.send(app, "subSave", function(pbSuccess){
			if(pbSuccess){
				doListDtl(function(pbListSuccess) {
					// 조회 : "갱신된 데이터가 조회되었습니다." header 메세지 표시
					if (pbListSuccess) util.Msg.notify(app, "NLS.INF.M025");
					
					// 보강 저장여부 - 보강이 신규로 저장될 경우 SMS 안내 메시지
					var vsSkplcDivRcdSaveYn = util.DataMap.getValue(app, "dmResList", "strSkplcDivRcdSaveYn");
					var strSkplcDivRcdSaveTimeSutdDuty = util.DataMap.getValue(app, "dmResList", "strSkplcDivRcdSaveTimeSutdDuty");
					
					if(ValueUtil.fixNull(strSkplcDivRcdSaveTimeSutdDuty) == "Y"){
						//--등록 하신 보강시간에 학생의 수강과목의 수업시간과 겹칩니다. 확인하시기 바랍니다.
						util.Msg.alert("NLS-CCS-M086");
						
						util.DataMap.setValue(app, "dmResList", "strSkplcDivRcdSaveTimeSutdDuty", "");
					}
					
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
	
	
	/*
		보강시 주야구분에 따라
		교시를 입력 할 수 있다.
		주간은 주간교시만 1~9
		야간은 야간교시만 10~15
	*/
	moPage.checkDayNightLttm = function(){
		
		var vnRptIndex = util.Grid.getIndex(app, "grdCcsOpenSub");
		var vsDayNightDivRcd = util.Grid.getCellValue(app, "grdCcsOpenSub", "DAY_NIGHT_DIV_RCD", vnRptIndex);
		
		var vnRptReppCnt = util.Grid.getRowCount(app, "grdCcsRestApp1");
		
		var vsUpdStatus = "";
		for(var i = 1 ; i<=vnRptReppCnt ; i++){
			vsUpdStatus =  util.Grid.getCellValue(app, "grdCcsRestApp1", "UPT_STATUS", i);
		
			if(vsUpdStatus == 'N' || vsUpdStatus == 'U'){
				
				var vsStLttm = ValueUtil.fixNumber(util.Grid.getCellValue(app, "grdCcsRestApp1", "ST_LTTM", i));
				var vsEndLttm = ValueUtil.fixNumber(util.Grid.getCellValue(app, "grdCcsRestApp1", "END_LTTM", i));
				
				
				//--주간
				if(vsDayNightDivRcd == 'CA01301'){
					if(vsStLttm >= 10){
						
						util.Msg.alert("NLS-CCS-M087");
						return false;
					}
					
					if(vsEndLttm >= 10){
						util.Msg.alert("NLS-CCS-M087");
						return false;
					}
					
				//--야간
				}else if(vsDayNightDivRcd == 'CA01302'){
					if(vsStLttm <= 9){
						util.Msg.alert("NLS-CCS-M087");
						return false;
					}
					
					if(vsEndLttm <= 9){
						util.Msg.alert("NLS-CCS-M087");
						return false;
					}
				}
				
			}
		}
		
		return true;
		
	}
	
	
	
	
	/**
	 * @desc [rdDipDtlSkplcDt1]보강일자 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 8. 22
	 */
	moPage.onValueChanged_RdDipDtlSkplcDt1 = function() {

		var vnIdx = util.Grid.getIndex(app, "grdCcsRestApp1");
		var vsSkplcDt = util.Grid.getCellValue(app, "grdCcsRestApp1", "SKPLC_DT");
		var vsSkplcDivRcd = util.Grid.getCellValue(app, "grdCcsRestApp1", "SKPLC_DIV_RCD");
		
		// 2. 휴보강일자 빈값인지 체크
		if(ValueUtil.isNull(vsSkplcDt)){
			// 휴보강일자, 요일, 주차, 시작교시, 종료교시, 강의실코드, 강의실명 초기화
			doClearSkplcCtl1(vnIdx);
			return false;
		}else {
			util.Grid.setCellValue(app, "grdCcsRestApp1", "SKPLC_DT", vsSkplcDt + "000000", vnIdx);
		}
		
		// 휴강일의 휴보강구분
		var vsSkplcDivRcdApp = util.Grid.getCellValue(app, "grdCcsRestApp", "SKPLC_DIV_RCD");
		util.DataMap.setValue(app, "dmReqKey", "strSplcFrcDivRcd", vsSkplcDivRcdApp);
		util.DataMap.setValue(app, "dmReqKey", "strSkplcDt", vsSkplcDt);
		util.DataMap.setValue(app, "dmReqKey", "strSkplcDivRcd", vsSkplcDivRcd);
		
		// 3. 주차정보 조회
		//strCommand: getWeekSeq 
		util.Submit.send(app, "subWeekSeq", function(pbSuccess){
			if(pbSuccess){
				
				var vsWeekSeq = util.DataMap.getValue(app, "dmResList", "strWeekSeq");
				
				// 요일세팅
				if(ValueUtil.isNull(vsSkplcDt)){
					util.Grid.setCellValue(app, "grdCcsRestApp1", "DAY", "", vnIdx);
					return false;
				}else {
					var vsDay = moPage.doGetDay(vsSkplcDt);
					util.Grid.setCellValue(app, "grdCcsRestApp1", "DAY", vsDay, vnIdx);
					util.Grid.setCellValue(app, "grdCcsRestApp1", "WEEK_SEQ", vsWeekSeq, vnIdx);	// 서브미션 결과 주차정보
				}
				
				// 휴보강시간중복여부 확인
				//strCommand: getCheckDateAndGetLectDtForEmpty 
				util.Submit.send(app, "subChkDtAndGetLectDtForEmpty", function(pbSuccess){
					if(!pbSuccess){
						// 휴보강일자, 요일, 주차, 시작교시, 종료교시, 강의실코드, 강의실명 초기화
						doClearSkplcCtl1(vnIdx);	
					}
				});
			}else {
				// 휴보강일자, 요일, 주차, 시작교시, 종료교시, 강의실코드, 강의실명 초기화
				doClearSkplcCtl1(vnIdx);
			}
		});
	};
	
	/**
	 * @desc 후보강관련 컬럼 초기화
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 8. 19
	 */
	function doClearSkplcCtl1(poRowIdx){
		// 휴보강일자, 요일, 주차, 시작교시, 종료교시, 강의실코드, 강의실명 초기화
		util.Grid.setCellValue(app, "grdCcsRestApp1", "SKPLC_DT", "", poRowIdx, true, false);
		util.Grid.setCellValue(app, "grdCcsRestApp1", "DAY", "", poRowIdx, true, false);
		util.Grid.setCellValue(app, "grdCcsRestApp1", "WEEK_SEQ", "", poRowIdx, true, false);
		util.Grid.setCellValue(app, "grdCcsRestApp1", "ST_LTTM", "", poRowIdx, true, false);
		util.Grid.setCellValue(app, "grdCcsRestApp1", "END_LTTM", "", poRowIdx, true, false);
		util.Grid.setCellValue(app, "grdCcsRestApp1", "LECT_ROOM_NM", "", poRowIdx, true, false);
		util.Grid.setCellValue(app, "grdCcsRestApp1", "LECT_ROOM_CD", "", poRowIdx, true, false);
	};
	
	/**
	 * @desc [rdIpbDtlDay1]요일 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 8. 22
	 */
	moPage.onValueChanged_RdIpbDtlDay1 = function() {
		var vnIdx = util.Grid.getIndex(app, "grdCcsRestApp1");
		
		// 요일변경시
		var vsDay = util.Grid.getCellValue(app, "grdCcsRestApp1", "DAY", vnIdx);
		
		// 일요일일경우
		if("CL10207" == vsDay) {
			// 일요일은 수업할수 없습니다.
			util.Msg.alert("NLS-CCS-M017");
			// 휴보강일자, 요일, 주차, 시작교시, 종료교시, 강의실코드, 강의실명 초기화
			doClearSkplcCtl1(vnIdx);
		}
	};
	
	/**
	 * @desc [rdCbbDtlStLttm1]시작교시 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 8. 22
	 */
	moPage.onValueChanged_RdCbbDtlEndLttm1 = function() {
		// 시작교시 종료교시 유효성 체크
		if(!doChkLttm1()){
			util.Grid.setCellValue(app, "grdCcsRestApp1", "END_LTTM", "");
		}
	};
	
	/**
	 * @desc [rdCbbDtlEndLttm1]종료교시 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 8. 22
	 */
	moPage.onValueChanged_RdCbbDtlStLttm1 = function() {
		// 시작교시 종료교시 유효성 체크
		if(!doChkLttm1()){
			util.Grid.setCellValue(app, "grdCcsRestApp1", "ST_LTTM", "");
		}
	};

	/**
	 * @desc 시작교시 종료교시 유효성체크
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 8. 22
	 */
	function doChkLttm1(){
		var vbValid = true;
		
		var vnIdx = util.Grid.getIndex(app, "grdCcsRestApp1");
		// 시작교시
		var vsStLttm = util.Grid.getCellValue(app, "grdCcsRestApp1", "ST_LTTM");
		// 종료교시
		var vsEndLttm = util.Grid.getCellValue(app, "grdCcsRestApp1", "END_LTTM");
		// 시작교시 종료교시 유효성 체크
		if(!ValueUtil.isNull(vsStLttm) && !ValueUtil.isNull(vsEndLttm)){
			if(Number(vsStLttm) > Number(vsEndLttm)){
				var vsEndLttmTitle = ExtControl.getTextValue("rhBtnDtlEndLttm1");
				var vsStLttmTitle = ExtControl.getTextValue("rhBtnDtlStLttm1");
				//  "@1 의 시간은 @2 의 시간 보다 빠를 수 없습니다." 메시지
				util.Msg.alert("NLS-CCS-M008", [vsEndLttmTitle, vsStLttmTitle]);
				
				vbValid = false;
				return vbValid;
			}
		}
		
		return vbValid;
	};

	/**
	 * @desc [rdBtnDtlLectRoomCd1]강의실명(돋보기버튼) onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 8. 22
	 */
	moPage.onClick_RdBtnDtlLectRoomCd1 = function(sender) {
		// 강의실팝업 오픈 전 체크
		if(!doPreChkLectRoomPopup("btn")){
			return false;
		}else {
			// 강의실검색팝업 호출
			doOnClickStdCcsPRoomPopup(sender);
		}
	};
	
	/**
	 * @desc [rdIpbDtlLectRoomNm1]강의실명 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 8. 22
	 */
	moPage.onValueChanged_RdIpbDtlLectRoomNm1 = function(sender) {
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
	 * @author 박갑수 at 2016. 8. 22
	 */
	function doPreChkLectRoomPopup(psDiv){
		var vbValid = true;
		
		// 휴보강시간 중복여부가 'Y'인지 체크 - 빈강의실 포함여부
		var vsCdPrp1 = util.DataMap.getValue(app, "dmResOnLoad", "strCdPrp1");

		if(ValueUtil.fixNull(vsCdPrp1) == "Y"){
			moPObject.moIdsForStdCcsPRoomPopup[0].iVacantRoomYn = "N";
		}else {
			moPObject.moIdsForStdCcsPRoomPopup[0].iVacantRoomYn = "Y";
		}
		
		var vsStLttm = util.Grid.getCellValue(app, "grdCcsRestApp1", "ST_LTTM");
		var vsEndLttm = util.Grid.getCellValue(app, "grdCcsRestApp1", "END_LTTM");
		var vsLectRoomNm = util.Grid.getCellValue(app, "grdCcsRestApp1", "LECT_ROOM_NM");
		if(!ValueUtil.isNull(vsLectRoomNm) || !ValueUtil.isNull(psDiv)){
			if(ValueUtil.isNull(vsStLttm) || ValueUtil.isNull(vsEndLttm)){
				// "교시 정보를 먼저 입력해야합니다." 메시지
				util.Msg.alert("NLS-CCS-M020");
				util.Grid.setCellValue(app, "grdCcsRestApp1", "LECT_ROOM_NM", "");
				vbValid = false;
				return vbValid;
			}
		}
		
		return vbValid;
	};
	
	/**
	 * @desc [rptCcsRestApp1]보강목록 onUpdate 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 8. 22
	 */
	moPage.onUpdate_RptCcsRestApp1 = function() {
		// 디테일 리피트 상태에 따른 마스터 활성화 제어
		doDtlRptStatus1();
	};
	
	/**
	 * @desc [btnRsltSch]보강실시결과서 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 8. 22
	 */
	moPage.onClick_BtnRsltSch = function() {
		if(ValueUtil.isNull(util.Grid.getCheckOrSelectedRowIndex(app, "grdCcsRestApp"))){
			// 선택된 데이터가 없습니다.
			ComMsg.warn("M008");
			return false;
		}
		
		// 2. 변경사항저장여부 체크
		if(util.Grid.isModified(app, "grdCcsRestApp1")){
			// '변경된 사항이 있습니다.\n변경 저장 혹은 취소 후  작업을 다시 수행 하십시오.'
			ComMsg.warn("M014");
			return false;
		}
		
		// 휴보강구분 [CL105]
		var vsSkplcDivRcd = util.Grid.getCellValue(app, "grdCcsRestApp", "SKPLC_DIV_RCD");
		
		// 휴보강구분이 공휴일[CL10503] 일경우 경고메시지
		if(ValueUtil.fixNull(vsSkplcDivRcd) == "CL10503"){
			// 공휴일자료는 출력할 수 없습니다.
			util.Msg.alert("NLS-CCS-EXT015");
			
			return false;
		}else {
			var vsRefKey = util.Grid.getCellValue(app, "grdCcsRestApp", "REF_KEY");
			var vsProfObjNo = util.Grid.getCellValue(app, "grdCcsRestApp", "PROF_OBJ_NO");
			var vsSkplcDt = util.Grid.getCellValue(app, "grdCcsRestApp", "SKPLC_DT");
							
			vsRestAppKey = "('" + vsRefKey + vsProfObjNo + vsSkplcDt.substring(0, 8) + "')";
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
	 * @desc [btnCancelSch]결보강계획서 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 8. 22
	 */
	moPage.onClick_BtnCancelSch = function() {
		if(ValueUtil.isNull(util.Grid.getCheckOrSelectedRowIndex(app, "grdCcsRestApp"))){
			// 선택된 데이터가 없습니다.
			ComMsg.warn("M008");
			return false;
		}
		
		// 2. 변경사항저장여부 체크
		if(util.Grid.isModified(app, "grdCcsRestApp1")){
			// '변경된 사항이 있습니다.\n변경 저장 혹은 취소 후  작업을 다시 수행 하십시오.'
			ComMsg.warn("M014");
			return false;
		}
		
		// 휴보강구분 [CL105]
		var vsSkplcDivRcd = util.Grid.getCellValue(app, "grdCcsRestApp", "SKPLC_DIV_RCD");
		
		// 휴보강구분이 공휴일[CL10503] 일경우 경고메시지
		if(ValueUtil.fixNull(vsSkplcDivRcd) == "CL10503"){
			// 공휴일자료는 출력할 수 없습니다.
			util.Msg.alert("NLS-CCS-EXT015");
			
			return false;
		}else {
			
			var vsRefKey = util.Grid.getCellValue(app, "grdCcsRestApp", "REF_KEY");
			var vsProfObjNo = util.Grid.getCellValue(app, "grdCcsRestApp", "PROF_OBJ_NO");
			var vsSkplcDt = util.Grid.getCellValue(app, "grdCcsRestApp", "SKPLC_DT");
			var vsStLttm = util.Grid.getCellValue(app, "grdCcsRestApp", "ST_LTTM");
			var vsEndLttm = util.Grid.getCellValue(app, "grdCcsRestApp", "END_LTTM");
							
			vsRestAppKey = "('" + vsRefKey + vsProfObjNo + vsSkplcDt.substring(0, 8) +  vsStLttm + vsEndLttm + "')";
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
	
	return moPage;
};
