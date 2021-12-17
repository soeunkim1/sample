//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./stdCcsCClassManage2.xtm"/>

/**
 * 분합반처리
 * @class stdCcsCClassManage
 * @author 박갑수 at 2016. 3. 15
 */
var stdCcsCClassManage2 = function() {
	var moPage = new Page();
	
	// 임포트용 데이터 통신 오브젝트
	var moPObject = new Page();
	
	// 개설과목검색팝업 호출
	moIdsForStdCcsPOpenSubPopup = [
	{
		 controlId					: "btnSbCd",			
		 iDivClsYn					: "N",		
		 iLanDivRcd				: "/root/resOnLoad/strLanDivRcd",
		 iKeyDate             		: "/root/keyDateMap/ST_DT",
		 iSchYearRcd             : "cbbSchYearRcd",
		 iSmtRcd             		: "cbbSmtRcd",
		 iSaCd        				: "",			
		 iSaNm        				: "",		
		 iSaObjDivRcd       		: "",		
		 iSbCd        				: "",			
		 iSbNm        				: "ipbSchSbNm",		
		 iCmpDivRcd        		: "",			
		 
		 oSpCd						: "",			
		 oSpNm					: "",			
		 oSbCd						: "/root/reqKey/strSbCd",			
		 oSbNm					: "ipbSchSbNm",			
		 oSaCd						: "/root/reqKey/strSaCd",			
		 oSaNm					: "",			
		 oCuCd						: "/root/reqKey/strCuCd",		
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
		 oSbLvlRcd				: "/root/reqKey/strSbLvlRcd",
		 func : function(poParam) {
			 
			// 분반목록 조회
			doDivclsList(function(pbSuccess) {
				if (pbSuccess){
					// 검색조건이 있을경우 조회
					var vsSchYearRcd = util.Control.getValue(app, "cbbSchYearRcd");
					var vsSmtRcd = util.Control.getValue(app, "cbbSmtRcd");
					var vsSbNm = util.DataMap.getValue(app, "dmReqKey", "strSbNm");
					if(!ValueUtil.isNull(vsSchYearRcd) && !ValueUtil.isNull(vsSmtRcd) && !ValueUtil.isNull(vsSbNm)){
						util.Header.clickSearch(app);
					}
				}
			});
		 }
	}];
	
	// 학년도 학기를 원래데이터로 되돌리기위한 변수
	var msSchYearRcd = "";
	var msSmtRcd = "";
	
	/**
	 * @desc import 헤더 초기화
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 3. 15
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		// import 헤더 초기화
		doHeaderOnLoad();
	};
	
	/**
	 * @desc onLoad 실행
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 15
	 */
	moPage.onModelConstructDone_StdCcsCClassManage = function() {
		// 리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["rptCcrTlsnReqLeft", "rptCcrTlsnReqRight"]);
		// 검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grpData"]);
		
		// 서브미션 호출
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				
				util.Control.redraw(app, ["cbbSchYearRcd", "cbbSmtRcd"]);
				// 학년도 학기값 되돌리기위한 값
				msSchYearRcd = util.DataMap.getValue(app, "dmKeyDateMap", "YEAR");
				msSmtRcd = util.DataMap.getValue(app, "dmKeyDateMap", "SMT");
				
				util.Control.setFocus(app, "ipbSaNm");
			}
		}, true);
	};
	
	/**
	 * @desc [cbbSchYearRcd]학년도 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 15
	 */
	moPage.onValueChanged_CbbSchYearRcd = function() {
		// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
		doChangeYearSmt("year");
	};
	
	/**
	 * @desc [cbbSmtRcd]학기 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 15
	 */
	moPage.onValueChanged_CbbSmtRcd = function() {
		// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
		doChangeYearSmt("smt");
	};
	
	/**
	 * @desc 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 15
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
	 * @desc [IpbSchSbNm]교과목명 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 15
	 */
	moPage.onValueChanged_IpbSchSbNm = function(sender) {
		// 리피트 변경사항 체크
		if(util.Grid.isModified(app, ["grdCcrTlsnReqLeft", "grdCcrTlsnReqRight"])){
			return false;
		}
		
		// 값변경시 교과목검색팝업 호출
		doOnChangeStdCcsPOpenSubPopup(sender);
	};
	
	/**
	 * @desc [btnSbCd]교과목명(돋보기버튼) onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 15
	 */
	moPage.onClick_BtnSbCd = function(sender) {
		// 개설과목검색팝업 호출
		doOnClickStdCcsPOpenSubPopup(sender);
	};
	
	/**
	 * @desc [btnSearch]조회 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 15
	 */
	moPage.onClick_BtnSearch = function() {
		// 작업영역 리피트 변경 내역 체크
		if(util.Grid.isModified(app, "", "CRM")){
			return false;
		}
		
		// 조회조건 필수 체크
		if(!util.validate(app, ["cbbSchYearRcd", "cbbSmtRcd", "ipbSchSbNm"])){
			return false;
		}
		
		// 조회
		doList(function(pbSuccess) {
			if (pbSuccess){
				// 조회 : "조회되었습니다." header 메세지 표시
				util.Msg.notify(app, "NLS.INF.M024");
				
				doClearCtl("LEFT");
				doClearCtl("RIGHT");
			}
		});
	};
	
	/**
	 * @desc 분반목록 조회
	 * @param poCallBackFunc 콜백정의
	 * @return void
	 * @author 박갑수 at 2016. 3. 15
	 */
	function doDivclsList(poCallBackFunc) {
		//strCommand: getDivclsList2 
		util.Submit.send(app, "subDivclsList", function(pbSuccess){
			if(pbSuccess){
				
				util.Control.redraw(app, ["cbbDivclsCd", "cbbDivclsCd1"]);
				
				// 조회 후 콜백함수 수행
				if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
			}
		});
	};
	
	/**
	 * @desc [rhCkbSelect]패널 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 15
	 */
	moPage.onValueChanged_RhCkbSelect = function() {
		// 리피트 패널 설정
//TO-BE: <ExtRepeat.selectedAllPanel> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.selectedAllPanel("rhCkbSelect");
	};
	
	/**
	 * @desc [rhCkbSelect1]패널(right) onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 15
	 */
	moPage.onValueChanged_RhCkbSelect1 = function() {
		// 리피트 패널 설정
//TO-BE: <ExtRepeat.selectedAllPanel> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.selectedAllPanel("rhCkbSelect1");
	};

	/**
	 * @desc [cbbDivclsCd]분반 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 15
	 */
	moPage.onValueChanged_CbbDivclsCd = function() {
				
		// 컨트롤 값세팅
		var vsDivclsCd = util.Control.getValue(app, "cbbDivclsCd");
		// 참조키
		var vsRefKey = ExtInstance.getValue("/root/resList/divclsList/row", "REF_KEY" , "child::DIVCLS_CD='"+ vsDivclsCd +"'");
		util.DataMap.setValue(app, "dmReqKey", "strLeftRefKey", vsRefKey);
		// 학사부서
		var vsSaNm = ExtInstance.getValue("/root/resList/divclsList/row", "SA_CD_NM" , "child::DIVCLS_CD='"+ vsDivclsCd +"'");
		util.Control.setValue(app, "optSaNm", vsSaNm);
		// 교과목명
		var vsSbNm = ExtInstance.getValue("/root/resList/divclsList/row", "SB_CD_NM" , "child::DIVCLS_CD='"+ vsDivclsCd +"'"); 
		util.Control.setValue(app, "optSbNm", vsSbNm);
		// 담당교수
		var vsProfNm = ExtInstance.getValue("/root/resList/divclsList/row", "PROF_NM" , "child::DIVCLS_CD='"+ vsDivclsCd +"'"); 
		util.Control.setValue(app, "optProfNm", vsProfNm);
		 // 학점
		var vsPnt = ExtInstance.getValue("/root/resList/divclsList/row", "PNT" , "child::DIVCLS_CD='"+ vsDivclsCd +"'"); 
		util.Control.setValue(app, "optPnt", vsPnt);
		 // 학년
		var vsSbLvlRcdNm = ExtInstance.getValue("/root/resList/divclsList/row", "SB_LVL_RCD_NM" , "child::DIVCLS_CD='"+ vsDivclsCd +"'"); 
		util.Control.setValue(app, "optSbLvlRcdNm", vsSbLvlRcdNm);
		// 이수구분
		var vsCmpDivRcdNm = ExtInstance.getValue("/root/resList/divclsList/row", "CMP_DIV_RCD_NM" , "child::DIVCLS_CD='"+ vsDivclsCd +"'"); 
		util.Control.setValue(app, "optCmpDivRcd", vsCmpDivRcdNm);
		// 시간표,강의실
		var vsLectRoomLttmNm = ExtInstance.getValue("/root/resList/divclsList/row", "LECT_ROOM_LTTM_NM" , "child::DIVCLS_CD='"+ vsDivclsCd +"'"); 
		util.Control.setValue(app, "optLectRoomNm", vsLectRoomLttmNm);
		
		// 분반이없을경우 리피터 초기화
		if(ValueUtil.isNull(vsDivclsCd)){
			util.Control.reset(app, "rptCcrTlsnReqLeft");
		}
		
		// 동일한 분반을 입력한 경우, 경고메세지 출력, 관련컨트롤 초기화
		var vsRightRefKey = util.DataMap.getValue(app, "dmReqKey", "strRightRefKey");
		if(!ValueUtil.isNull(vsRefKey) && !ValueUtil.isNull(vsRightRefKey)){
			if(vsRefKey == vsRightRefKey){
				// 분반이 @1쪽과 같은 수 없습니다.
				//ComMsg.alert(NLS.WRN.M021, [NLS.NSCR.RIGHT]);
				alert("양쪽 모두 같은 강좌를 선택 할 수 없습니다.");
				
				doClearCtl("LEFT");
				
				return;
			}
		}
		
		if(!ValueUtil.isNull(vsRefKey)){
			// 조회
			doList(function(pbSuccess) {
				if (pbSuccess){
					// 조회 : "조회되었습니다." header 메세지 표시
					util.Msg.notify(app, "NLS.INF.M024");
				}
			});
		}
	};
	
	/**
	 * @desc 컨트롤 초기화
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 15
	 */
	function doClearCtl(psGbn) {
		var vaLeftCtls = ["optSaNm", "optSbNm", "optProfNm", "optPnt", "optCmpDivRcd", "optLectRoomNm"];
		var vaRightCtls = ["optSaNm1", "optSbNm1", "optProfNm1", "optPnt1", "optCmpDivRcd1", "optLectRoomNm1"];
		
		if(psGbn == "LEFT"){
			util.Control.reset(app, vaLeftCtls);
			ExtSelectCtl.setValue("cbbDivclsCd", "");
			util.Control.reset(app, "rptCcrTlsnReqLeft");
			util.DataMap.setValue(app, "dmReqKey", "strLeftRefKey", "");
		}
		
		if(psGbn == "RIGHT"){
			util.Control.reset(app, vaRightCtls);
			ExtSelectCtl.setValue("cbbDivclsCd1", "");
			util.Control.reset(app, "rptCcrTlsnReqRight");
			util.DataMap.setValue(app, "dmReqKey", "strRightRefKey", "");
		}
	};
	
	/**
	 * @desc 분합반대상목록 조회
	 * @param poCallBackFunc 콜백정의
	 * @return void
	 * @author 박갑수 at 2016. 3. 15
	 */
	function doList(poCallBackFunc) {
		//strCommand: getSbList 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				
				ExtTreeView.rebuild(["rptCcrTlsnReqLeft", "rptCcrTlsnReqRight"]);
				
				// 조회 후 콜백함수 수행
				if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
			}
		});
	};
	
	/**
	 * @desc [cbbDivclsCd1]분반(right) onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 15
	 */
	moPage.onValueChanged_CbbDivclsCd1 = function() {
		
		// 컨트롤 값세팅
		var vsDivclsCd = util.Control.getValue(app, "cbbDivclsCd1");
		// 참조키
		var vsRefKey = ExtInstance.getValue("/root/resList/divclsList/row", "REF_KEY" , "child::DIVCLS_CD='"+ vsDivclsCd +"'"); 
		util.DataMap.setValue(app, "dmReqKey", "strRightRefKey", vsRefKey);
		// 학사부서
		var vsSaNm = ExtInstance.getValue("/root/resList/divclsList/row", "SA_CD_NM" , "child::DIVCLS_CD='"+ vsDivclsCd +"'");
		util.Control.setValue(app, "optSaNm1", vsSaNm);
		// 교과목명
		var vsSbNm = ExtInstance.getValue("/root/resList/divclsList/row", "SB_CD_NM" , "child::DIVCLS_CD='"+ vsDivclsCd +"'"); 
		util.Control.setValue(app, "optSbNm1", vsSbNm);
		// 담당교수
		var vsProfNm = ExtInstance.getValue("/root/resList/divclsList/row", "PROF_NM" , "child::DIVCLS_CD='"+ vsDivclsCd +"'"); 
		util.Control.setValue(app, "optProfNm1", vsProfNm);
		 // 학점
		var vsPnt = ExtInstance.getValue("/root/resList/divclsList/row", "PNT" , "child::DIVCLS_CD='"+ vsDivclsCd +"'"); 
		util.Control.setValue(app, "optPnt1", vsPnt);
		 // 학년
		var vsSbLvlRcdNm = ExtInstance.getValue("/root/resList/divclsList/row", "SB_LVL_RCD_NM" , "child::DIVCLS_CD='"+ vsDivclsCd +"'"); 
		util.Control.setValue(app, "optSbLvlRcdNm1", vsSbLvlRcdNm);
		// 이수구분
		var vsCmpDivRcdNm = ExtInstance.getValue("/root/resList/divclsList/row", "CMP_DIV_RCD_NM" , "child::DIVCLS_CD='"+ vsDivclsCd +"'"); 
		util.Control.setValue(app, "optCmpDivRcd1", vsCmpDivRcdNm);
		// 시간표,강의실
		var vsLectRoomLttmNm = ExtInstance.getValue("/root/resList/divclsList/row", "LECT_ROOM_LTTM_NM" , "child::DIVCLS_CD='"+ vsDivclsCd +"'"); 
		util.Control.setValue(app, "optLectRoomNm1", vsLectRoomLttmNm);
		
		// 분반이없을경우 리피터 초기화
		if(ValueUtil.isNull(vsDivclsCd)){
			util.Control.reset(app, "rptCcrTlsnReqRight");
		}
		
		// 동일한 분반을 입력한 경우, 경고메세지 출력, 관련컨트롤 초기화
		var vsLeftRefKey = util.DataMap.getValue(app, "dmReqKey", "strLeftRefKey");
		if(!ValueUtil.isNull(vsRefKey) && !ValueUtil.isNull(vsLeftRefKey)){
			if(vsRefKey == vsLeftRefKey){
				// 분반이 @1쪽과 같은 수 없습니다.
				util.Msg.alert("NLS-WRN-M021", [NLS.NSCR.LEFT]);
				
				doClearCtl("RIGHT");
				
				return;
			}
		}
		
		if(!ValueUtil.isNull(vsRefKey)){
			// 조회
			doList(function(pbSuccess) {
				if (pbSuccess){
					// 조회 : "조회되었습니다." header 메세지 표시
					util.Msg.notify(app, "NLS.INF.M024");
				}
			});
		}
	};
	
	/**
	 * @desc [btnRight]오른쪽이동 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 15
	 */
	moPage.onClick_BtnRight = function() {
		// 1. 참조키 입력되어있는지 체크
		var vsLeftRefKey = util.DataMap.getValue(app, "dmReqKey", "strLeftRefKey");
		var vsRightRefKey = util.DataMap.getValue(app, "dmReqKey", "strRightRefKey");
		
		if(ValueUtil.isNull(vsRightRefKey)){
			// @쪽 분반을 선택해 주십시오.
			util.Msg.alert("NLS-CCS-M074", [NLS.NSCR.RIGHT]);
			return false;
		}
		
		// 2. 로우 선택 체크
		var vnRowCnt = ExtInstance.getNodeListLength("/root/resList/rptCcrTlsnReqLeft/row[child::DEL_CKB='Y']");
		
		if(vnRowCnt == null || vnRowCnt == 0){
			// 라인을 선택하세요.
			util.Msg.alert("NLS-INF-M023");
			return false;
		}
		
		var vsIdx = util.Grid.getCheckOrSelectedRowIndex(app, "grdCcrTlsnReqLeft");
		var vaIdx = vsIdx.split(",");
		
		for(var i=0; i<vaIdx.length; i++){
			// 3. 중복체크
			var vnIdx = vaIdx[i];
			
			// 중복일경우 Skip
			var vsDuplYn = util.Grid.getCellValue(app, "grdCcrTlsnReqLeft", "DUPL_YN", vnIdx);
			if(ValueUtil.fixNull(vsDuplYn) == "Y"){
				continue;
			}
			
			var vnNewRowIdx = util.Grid.insertRow(app, "grdCcrTlsnReqRight");
		
			util.Grid.setCellValue(app, "grdCcrTlsnReqRight", "REF_KEY", vsRightRefKey, vnNewRowIdx);
			
			var vsStudId = util.Grid.getCellValue(app, "grdCcrTlsnReqLeft", "STUD_ID", vnIdx);
			util.Grid.setCellValue(app, "grdCcrTlsnReqRight", "STUD_ID", vsStudId, vnNewRowIdx);
			
			var vsStudNo = util.Grid.getCellValue(app, "grdCcrTlsnReqLeft", "STUD_NO", vnIdx);
			util.Grid.setCellValue(app, "grdCcrTlsnReqRight", "STUD_NO", vsStudNo, vnNewRowIdx);
			
			var vsStudNm = util.Grid.getCellValue(app, "grdCcrTlsnReqLeft", "STUD_NM", vnIdx);
			util.Grid.setCellValue(app, "grdCcrTlsnReqRight", "STUD_NM", vsStudNm, vnNewRowIdx);
			
			var vsPnt = util.Grid.getCellValue(app, "grdCcrTlsnReqLeft", "PNT", vnIdx);
			util.Grid.setCellValue(app, "grdCcrTlsnReqRight", "PNT", vsPnt, vnNewRowIdx);
			
			var vsTheoTc = util.Grid.getCellValue(app, "grdCcrTlsnReqLeft", "THEO_TC", vnIdx);
			util.Grid.setCellValue(app, "grdCcrTlsnReqRight", "THEO_TC", vsTheoTc, vnNewRowIdx);
			
			var vsEpacTc = util.Grid.getCellValue(app, "grdCcrTlsnReqLeft", "EPAC_TC", vnIdx);
			util.Grid.setCellValue(app, "grdCcrTlsnReqRight", "EPAC_TC", vsEpacTc, vnNewRowIdx);
			
			var vsCmpDivRcd = util.Grid.getCellValue(app, "grdCcrTlsnReqLeft", "CMP_DIV_RCD", vnIdx);
			util.Grid.setCellValue(app, "grdCcrTlsnReqRight", "CMP_DIV_RCD", vsCmpDivRcd, vnNewRowIdx);
			
			var vsReTlsnSchYearRcd = util.Grid.getCellValue(app, "grdCcrTlsnReqLeft", "RE_TLSN_SCH_YEAR_RCD", vnIdx);
			util.Grid.setCellValue(app, "grdCcrTlsnReqRight", "RE_TLSN_SCH_YEAR_RCD", vsReTlsnSchYearRcd, vnNewRowIdx);
			
			var vsReTlsnSmtRcd = util.Grid.getCellValue(app, "grdCcrTlsnReqLeft", "RE_TLSN_SMT_RCD", vnIdx);
			util.Grid.setCellValue(app, "grdCcrTlsnReqRight", "RE_TLSN_SMT_RCD", vsReTlsnSmtRcd, vnNewRowIdx);
			
			var vsReTlsnSbCd = util.Grid.getCellValue(app, "grdCcrTlsnReqLeft", "RE_TLSN_SB_CD", vnIdx);
			util.Grid.setCellValue(app, "grdCcrTlsnReqRight", "RE_TLSN_SB_CD", vsReTlsnSbCd, vnNewRowIdx);
			
			var vsReTlsnDivRcd = util.Grid.getCellValue(app, "grdCcrTlsnReqLeft", "RE_TLSN_DIV_RCD", vnIdx);
			util.Grid.setCellValue(app, "grdCcrTlsnReqRight", "RE_TLSN_DIV_RCD", vsReTlsnDivRcd, vnNewRowIdx);
			
			var vsXcpDivRcd = util.Grid.getCellValue(app, "grdCcrTlsnReqLeft", "XCP_DIV_RCD", vnIdx);
			util.Grid.setCellValue(app, "grdCcrTlsnReqRight", "XCP_DIV_RCD", vsXcpDivRcd, vnNewRowIdx);
			
			var vsTlsnDivRcd = util.Grid.getCellValue(app, "grdCcrTlsnReqLeft", "TLSN_DIV_RCD", vnIdx);
			util.Grid.setCellValue(app, "grdCcrTlsnReqRight", "TLSN_DIV_RCD", vsTlsnDivRcd, vnNewRowIdx);
			
			var vsTlsnPsnDivRcd = util.Grid.getCellValue(app, "grdCcrTlsnReqLeft", "TLSN_PSN_DIV_RCD", vnIdx);
			util.Grid.setCellValue(app, "grdCcrTlsnReqRight", "TLSN_PSN_DIV_RCD", vsTlsnPsnDivRcd, vnNewRowIdx);

			var vsSchYearRcd = util.Grid.getCellValue(app, "grdCcrTlsnReqLeft", "SCH_YEAR_RCD", vnIdx);
			util.Grid.setCellValue(app, "grdCcrTlsnReqRight", "SCH_YEAR_RCD", vsSchYearRcd, vnNewRowIdx);
			
			var vsSmtRcd = util.Grid.getCellValue(app, "grdCcrTlsnReqLeft", "SMT_RCD", vnIdx);
			util.Grid.setCellValue(app, "grdCcrTlsnReqRight", "SMT_RCD", vsSmtRcd, vnNewRowIdx);
			
			var vsTlsnCapaDiv = util.Grid.getCellValue(app, "grdCcrTlsnReqLeft", "TLSN_CAPA_DIV", vnIdx);
			util.Grid.setCellValue(app, "grdCcrTlsnReqRight", "TLSN_CAPA_DIV", vsTlsnCapaDiv, vnNewRowIdx);
			
			var vsAplyDthr = util.Grid.getCellValue(app, "grdCcrTlsnReqLeft", "APLY_DTHR", vnIdx);
			util.Grid.setCellValue(app, "grdCcrTlsnReqRight", "APLY_DTHR", vsAplyDthr, vnNewRowIdx);
			
			var vsCancelDthr = util.Grid.getCellValue(app, "grdCcrTlsnReqLeft", "CANCEL_DTHR", vnIdx);
			util.Grid.setCellValue(app, "grdCcrTlsnReqRight", "CANCEL_DTHR", vsCancelDthr, vnNewRowIdx);
			
			var vsCancelBtn = util.Grid.getCellValue(app, "grdCcrTlsnReqLeft", "CANCEL_BTN", vnIdx);
			util.Grid.setCellValue(app, "grdCcrTlsnReqRight", "CANCEL_BTN", vsCancelBtn, vnNewRowIdx);

			// 해당ROW DELETE
			ExtControl.getControl("rptCcrTlsnReqLeft").setRowStatus(vnIdx, "delete");
		}
		
		util.Control.setEnable(app, false, ["btnRight", "btnLeft"]);
		
		// 작업저장
		doSave();
	};
	
	/**
	 * @desc [btnLeft]왼쪽이동 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 15
	 */
	moPage.onClick_BtnLeft = function() {

		// 1. 참조키 입력되어있는지 체크
		var vsLeftRefKey = util.DataMap.getValue(app, "dmReqKey", "strLeftRefKey");
		var vsRightRefKey = util.DataMap.getValue(app, "dmReqKey", "strRightRefKey");
		
		if(ValueUtil.isNull(vsLeftRefKey)){
			// @쪽 분반을 선택해 주십시오.
			util.Msg.alert("NLS-CCS-M074", [NLS.NSCR.LEFT]);
			return false;
		}
		
		// 2. 로우 선택 체크
		var vnRowCnt = ExtInstance.getNodeListLength("/root/resList/rptCcrTlsnReqRight/row[child::DEL_CKB='Y']");
		
		if(vnRowCnt == null || vnRowCnt == 0){
			// 라인을 선택하세요.
			util.Msg.alert("NLS-INF-M023");
			return false;
		}
		
		var vsIdx = util.Grid.getCheckOrSelectedRowIndex(app, "grdCcrTlsnReqRight");
		var vaIdx = vsIdx.split(",");
		
		for(var i=0; i<vaIdx.length; i++){
			// 3. 중복체크
			var vnIdx = vaIdx[i];
			
			// 중복일경우 Skip
			var vsDuplYn = util.Grid.getCellValue(app, "grdCcrTlsnReqRight", "DUPL_YN", vnIdx);
			if(ValueUtil.fixNull(vsDuplYn) == "Y"){
				continue;
			}
			
			var vnNewRowIdx = util.Grid.insertRow(app, "grdCcrTlsnReqLeft");
		
			util.Grid.setCellValue(app, "grdCcrTlsnReqLeft", "REF_KEY", vsLeftRefKey, vnNewRowIdx);
			
			var vsStudId = util.Grid.getCellValue(app, "grdCcrTlsnReqRight", "STUD_ID", vnIdx);
			util.Grid.setCellValue(app, "grdCcrTlsnReqLeft", "STUD_ID", vsStudId, vnNewRowIdx);
			
			var vsStudNo = util.Grid.getCellValue(app, "grdCcrTlsnReqRight", "STUD_NO", vnIdx);
			util.Grid.setCellValue(app, "grdCcrTlsnReqLeft", "STUD_NO", vsStudNo, vnNewRowIdx);
			
			var vsStudNm = util.Grid.getCellValue(app, "grdCcrTlsnReqRight", "STUD_NM", vnIdx);
			util.Grid.setCellValue(app, "grdCcrTlsnReqLeft", "STUD_NM", vsStudNm, vnNewRowIdx);
			
			var vsPnt = util.Grid.getCellValue(app, "grdCcrTlsnReqRight", "PNT", vnIdx);
			util.Grid.setCellValue(app, "grdCcrTlsnReqLeft", "PNT", vsPnt, vnNewRowIdx);
			
			var vsTheoTc = util.Grid.getCellValue(app, "grdCcrTlsnReqRight", "THEO_TC", vnIdx);
			util.Grid.setCellValue(app, "grdCcrTlsnReqLeft", "THEO_TC", vsTheoTc, vnNewRowIdx);
			
			var vsEpacTc = util.Grid.getCellValue(app, "grdCcrTlsnReqRight", "EPAC_TC", vnIdx);
			util.Grid.setCellValue(app, "grdCcrTlsnReqLeft", "EPAC_TC", vsEpacTc, vnNewRowIdx);
			
			var vsCmpDivRcd = util.Grid.getCellValue(app, "grdCcrTlsnReqRight", "CMP_DIV_RCD", vnIdx);
			util.Grid.setCellValue(app, "grdCcrTlsnReqLeft", "CMP_DIV_RCD", vsCmpDivRcd, vnNewRowIdx);
			
			var vsReTlsnSchYearRcd = util.Grid.getCellValue(app, "grdCcrTlsnReqRight", "RE_TLSN_SCH_YEAR_RCD", vnIdx);
			util.Grid.setCellValue(app, "grdCcrTlsnReqLeft", "RE_TLSN_SCH_YEAR_RCD", vsReTlsnSchYearRcd, vnNewRowIdx);
			
			var vsReTlsnSmtRcd = util.Grid.getCellValue(app, "grdCcrTlsnReqRight", "RE_TLSN_SMT_RCD", vnIdx);
			util.Grid.setCellValue(app, "grdCcrTlsnReqLeft", "RE_TLSN_SMT_RCD", vsReTlsnSmtRcd, vnNewRowIdx);
			
			var vsReTlsnSbCd = util.Grid.getCellValue(app, "grdCcrTlsnReqRight", "RE_TLSN_SB_CD", vnIdx);
			util.Grid.setCellValue(app, "grdCcrTlsnReqLeft", "RE_TLSN_SB_CD", vsReTlsnSbCd, vnNewRowIdx);
			
			var vsReTlsnDivRcd = util.Grid.getCellValue(app, "grdCcrTlsnReqRight", "RE_TLSN_DIV_RCD", vnIdx);
			util.Grid.setCellValue(app, "grdCcrTlsnReqLeft", "RE_TLSN_DIV_RCD", vsReTlsnDivRcd, vnNewRowIdx);
			
			var vsXcpDivRcd = util.Grid.getCellValue(app, "grdCcrTlsnReqRight", "XCP_DIV_RCD", vnIdx);
			util.Grid.setCellValue(app, "grdCcrTlsnReqLeft", "XCP_DIV_RCD", vsXcpDivRcd, vnNewRowIdx);
			
			var vsTlsnDivRcd = util.Grid.getCellValue(app, "grdCcrTlsnReqRight", "TLSN_DIV_RCD", vnIdx);
			util.Grid.setCellValue(app, "grdCcrTlsnReqLeft", "TLSN_DIV_RCD", vsTlsnDivRcd, vnNewRowIdx);
			
			var vsTlsnPsnDivRcd = util.Grid.getCellValue(app, "grdCcrTlsnReqRight", "TLSN_PSN_DIV_RCD", vnIdx);
			util.Grid.setCellValue(app, "grdCcrTlsnReqLeft", "TLSN_PSN_DIV_RCD", vsTlsnPsnDivRcd, vnNewRowIdx);

			var vsSchYearRcd = util.Grid.getCellValue(app, "grdCcrTlsnReqRight", "SCH_YEAR_RCD", vnIdx);
			util.Grid.setCellValue(app, "grdCcrTlsnReqLeft", "SCH_YEAR_RCD", vsSchYearRcd, vnNewRowIdx);
			
			var vsSmtRcd = util.Grid.getCellValue(app, "grdCcrTlsnReqRight", "SMT_RCD", vnIdx);
			util.Grid.setCellValue(app, "grdCcrTlsnReqLeft", "SMT_RCD", vsSmtRcd, vnNewRowIdx);
			
			var vsTlsnCapaDiv = util.Grid.getCellValue(app, "grdCcrTlsnReqRight", "TLSN_CAPA_DIV", vnIdx);
			util.Grid.setCellValue(app, "grdCcrTlsnReqLeft", "TLSN_CAPA_DIV", vsTlsnCapaDiv, vnNewRowIdx);
			
			var vsAplyDthr = util.Grid.getCellValue(app, "grdCcrTlsnReqRight", "APLY_DTHR", vnIdx);
			util.Grid.setCellValue(app, "grdCcrTlsnReqLeft", "APLY_DTHR", vsAplyDthr, vnNewRowIdx);
			
			var vsCancelDthr = util.Grid.getCellValue(app, "grdCcrTlsnReqRight", "CANCEL_DTHR", vnIdx);
			util.Grid.setCellValue(app, "grdCcrTlsnReqLeft", "CANCEL_DTHR", vsCancelDthr, vnNewRowIdx);
			
			var vsCancelBtn = util.Grid.getCellValue(app, "grdCcrTlsnReqRight", "CANCEL_BTN", vnIdx);
			util.Grid.setCellValue(app, "grdCcrTlsnReqLeft", "CANCEL_BTN", vsCancelBtn, vnNewRowIdx);
			
			// 해당ROW DELETE
			ExtControl.getControl("rptCcrTlsnReqRight").setRowStatus(vnIdx, "delete");
						
			
		}
		util.Control.setEnable(app, false, ["btnRight", "btnLeft"]);
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
		if(!util.Grid.isModified(app, ["grdCcrTlsnReqLeft", "grdCcrTlsnReqRight"], "MSG")){
			util.Control.setEnable(app, true, ["btnRight", "btnLeft"]);
			return false;
		}
		
		//strCommand: save 
		util.Submit.send(app, "subSave", function(pbSuccess){
			if(pbSuccess){
				doList(function(pbListSuccess) {
					// 조회 : "갱신된 데이터가 조회되었습니다." header 메세지 표시
					if (pbListSuccess){
						util.Control.setEnable(app, true, ["btnRight", "btnLeft"]);
						util.Msg.notify(app, "NLS.INF.M025");
					}
				});
			}else{
				util.Control.setEnable(app, true, ["btnRight", "btnLeft"]);
			}
		}, true);
	};
	
	return moPage;
};
