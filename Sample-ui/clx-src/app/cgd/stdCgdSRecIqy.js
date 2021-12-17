//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./stdCgdSRecIqy.xtm"/>

/**
 * 금학기성적조회
 * @class stdCgdSRecIqy
 * @author 박갑수 at 2016. 4. 1
 */
var stdCgdSRecIqy = function() {
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
		iKeyDate 					: "/root/keyDateMap/ST_DT", 
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
			var vsSchYearRcd = util.Control.getValue(app, "cbbSchYearRcd");
			var vsSmtRcd = util.Control.getValue(app, "cbbSmtRcd");
			var vsStudId = util.Control.getValue(app, "ipbStudId");
			// 검색조건있을경우 바로조회
			if(!ValueUtil.isNull(vsSchYearRcd) && !ValueUtil.isNull(vsSmtRcd) && !ValueUtil.isNull(vsStudId)){
				util.Header.clickSearch(app);
			}
		}
	}];
	
	// 성적평가요소검색
	moPage.moIdsForCgdEstFctorStudInfo = 
	{
		iStudId 		  : "",
		iTlsnRefKey : "",
		iKeyDate 	  : ""
	};
	
	// 학년도 학기를 원래데이터로 되돌리기위한 변수
	var msSchYearRcd = "";
	var msSmtRcd = "";
	
	/**
	 * @desc import 헤더 초기화
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 4. 1
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		// import 헤더 초기화
		doHeaderOnLoad();
	};
	
	/**
	 * @desc 학생정보 import 초기화
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 4. 1
	 */
	moPage.onLoadImportDone_ImpStudInfo = function() {
		// 학생정보 import 초기화
		impStudInfo();
	};
	
	/**
	 * @desc onLoad 실행
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 1
	 */
	moPage.onModelConstructDone_StdCgdSRecIqy = function() {
		// 리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["rptCgdRecInput"]);
		// 검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grpData"]);
		
		// 서브미션 호출
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				
				util.Control.redraw(app, ["cbbSchYearRcd", "cbbSmtRcd"]);
				// 개인권한[CC00104] : 
				if (moPageInfo.authRngRcd == "CC00104") {
					util.Control.setValue(app, "ipbStudId", moUserInfo.studNo);
					util.DataMap.setValue(app, "dmReqKey", "strStudId", moUserInfo.id);
					
					// 학생의 성적열람기간체크
					doStudentLoadOfScreen(function(pbSuccess) {
						// 조회 : "조회되었습니다." header 메세지 표시
						if (pbSuccess){
							util.Control.setEnable(app, false, ["cbbSchYearRcd", "cbbSmtRcd", "ipbStudId"]);
							util.Control.setVisible(app, false, ["btnStudId", "btnSearch"]);
							
							// 바로조회
							util.Header.clickSearch(app);
						}
					});
				
				}else {
//					// 관리자의 성적열람기간체크
//					moPage.doAdminLoadOfScreen();
				}
			}
		}, true);
	};
	
	/**
	 * @desc 학생의 성적열람기간체크
	 * @param poCallBackFunc 콜백정의
	 * @return void
	 * @author 박갑수 at 2016. 4. 1
	 */
	function doStudentLoadOfScreen(poCallBackFunc) {
		
		//strCommand: doStudentLoadOfScreen 
		util.Submit.send(app, "subStudChk", function(pbSuccess){
			if(!pbSuccess){
				util.coverPage(app);
			}
			
			// 조회 후 콜백함수 수행
			if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess); 
		});
	};
	
	/**
	 * @desc 관리자의 성적열람기간체크
	 * @param poCallBackFunc 콜백정의
	 * @return void
	 * @author 박갑수 at 2016. 4. 1
	 */
	function doAdminLoadOfScreen(pnStep) {
		if(ValueUtil.isNull(pnStep)){
			pnStep = "0";
		}
		
		util.DataMap.setValue(app, "dmReqKey", "intStep", pnStep);
		
		//strCommand: doAdminLoadOfScreen 
		util.Submit.send(app, "subAdminChk", function(pbSuccess){
			if(pbSuccess){
				var vsMsg = util.DataMap.getValue(app, "dmInteractiveMsg", "strMsg");
				
				if(!ValueUtil.isNull(vsMsg)){
					// @\n 무시하고 계속하시겠습니까?
					if(util.Msg.confirm("NLS-CRM-M027", [vsMsg])){
						var vnStep = util.DataMap.getValue(app, "dmInteractiveMsg", "intStep");
						doAdminLoadOfScreen(vnStep);
					}
				}
				
			}else {
				util.coverPage(app);
			}
		});
	};
	
	/**
	 * @desc [cbbSchYearRcd]학년도 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 1
	 */
	moPage.onValueChanged_CbbSchYearRcd = function() {
		// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
		doChangeYearSmt("year");
	};
	
	/**
	 * @desc [cbbSmtRcd]학기 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 1
	 */
	moPage.onValueChanged_CbbSmtRcd = function() {
		// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
		doChangeYearSmt("smt");
	};
	
	/**
	 * @desc 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 1
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
	 * @desc [btnStudId]학번(돋보기버튼) onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 1
	 */
	moPage.onClick_BtnStudId = function(sender) {
		// 학생검색팝업 호출
		doOnClickStdCsrPStSearch(sender);
	};
	
	/**
	 * @desc [ipbStudId]학번 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 1
	 */
	moPage.onValueChanged_IpbStudId = function(sender) {
		// 값변경시 학생검색팝업 호출
		doOnChangeStdCsrPStSearch(sender);
	};
	
	/**
	 * @desc [btnSearch]조회 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 1
	 */
	moPage.onClick_BtnSearch = function() {
		// 조회조건 필수 체크
		if(!util.validate(app, ["cbbSchYearRcd", "cbbSmtRcd", "ipbStudId"])){
			return false;
		}
		
		//(IMPORT)학번전달
		var vsStudId = util.DataMap.getValue(app, "dmReqKey", "strStudId");
		var vsKeyDate = util.DataMap.getValue(app, "dmKeyDateMap", "ST_DT");
		
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
	 * @desc 성적내역 조회
	 * @param poCallBackFunc 콜백정의
	 * @return void
	 * @author 박갑수 at 2016. 4. 1
	 */
	function doList(poCallBackFunc) {
		
		// 성적내역 조회전 권한에따른 체크
		doChkList(function(pbSuccess) {
			
			if(pbSuccess){
			
				//strCommand: list 
				util.Submit.send(app, "subList", function(pbSuccess){
					if(pbSuccess){
						util.Control.redraw(app, "grdCgdRecInput");
						
						util.Control.redraw(app, ["optEstPnt", "optGetPnt", "optTotGp", "optAvgGp", "optPercentage"]);
						// 조회 후 콜백함수 수행
						if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess); 
					}
				});
			}else{
				util.coverPage(app);
			}
		});
	};
	
	/**
	 * @desc 성적내역 조회전 권한에따른 체크
	 * @param poCallBackFunc 콜백정의
	 * @return void
	 * @author 박갑수 at 2016. 4. 1
	 */
	function doChkList(poCallBackFunc) {
		// 개인권한[CC00104] : 
		if (moPageInfo.authRngRcd == "CC00104") {
			/*************************************************************************************
			 * 강의평가확인여부 default값
			 * CD21201 = 전체조회(강의평가가 하나라도 안되있으면 금학기 성적조회 불가)
			 * CD21202 = 해당항목확인(강의평가가 된 과목만 금학기 성적 조회 가능) 
			 * CD21203 = 전체확인(강의평가 여부에 상관없이 다 조회 가능)
			 *************************************************************************************/
			
			var vsCdPrp1 = util.DataMap.getValue(app, "dmResOnLoad", "strCdPrp1");
			
			// 전체조회(강의평가가 하나라도 안되있으면 금학기 성적조회 불가)
			if(ValueUtil.fixNull(vsCdPrp1) == "CD21201"){
				
				//strCommand: checkLectEvaluation 
				util.Submit.send(app, "subLectEvalChk", function(pbSuccess){
					if(pbSuccess){
						var vsLectYn = util.DataMap.getValue(app, "dmResList", "resCheckLectEvalution");
						
						if(ValueUtil.fixNull(vsLectYn) == "N"){
							// 강의평가를 하지 않아 금학기 성적조회가 불가합니다.
							util.Msg.alert("NLS-CGD-M030");
							
							if (util.isFunc(poCallBackFunc)) poCallBackFunc(false); 
						}else {
							if (util.isFunc(poCallBackFunc)) poCallBackFunc(true);
						}
					}
				});
				
			// // 해당항목확인(강의평가가 된 과목만 금학기 성적 조회 가능): 서버단처리 , 전체확인(강의평가 여부에 상관없이 다 조회 가능)
			}else {
				if (util.isFunc(poCallBackFunc)) poCallBackFunc(true);
			}
		}else {
			if (util.isFunc(poCallBackFunc)) poCallBackFunc(true);
		}
	};
	
	/**
	 * @desc [rptCgdRecInput]성적내역 onDoubleClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 1
	 */
	moPage.onDoubleClick_RptCgdRecInput = function() {
		// 개인권한이 아닐경우만 팝업 오픈
		if (moPageInfo.authRngRcd != "CC00104") {
			moIdsForCgdEstFctorStudInfo.iStudId 			= util.Grid.getCellValue(app, "grdCgdRecInput", "STUD_ID");
			moIdsForCgdEstFctorStudInfo.iTlsnRefKey 	= util.Grid.getCellValue(app, "grdCgdRecInput", "TLSN_REF_KEY");
			moIdsForCgdEstFctorStudInfo.iKeyDate 		= util.DataMap.getValue(app, "dmKeyDateMap", "ST_DT");
			
			ExtPopUp.openLayeredPopup("/xtm/cgd/extCgdPEstFctorStudInfo.xtm", 550, 280);
		}
	};
	
	return moPage;
};
