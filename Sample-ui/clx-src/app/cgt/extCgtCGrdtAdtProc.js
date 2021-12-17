//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCgtCGrdtAdtProc.xtm"/>


var extCgtCGrdtAdtProc = function() {
		
	var moPage = new Page();
	var moPObject = new PObject();
	
	/* 
	 * 객체 검색팝업 관련 설정사항
	 */
	moPObject.moIdsForStdCmnPObjSch = [
	{
		controlId 	: "btnDeptNmPop",
		iCd 		: "",
		iNm 		: "ipbDeptNm",
		iObjDivRcd 	: ["CC009OG", "CC009SA"],
		iLanDivRcd 	: "",
		iKeyDate 	: "/root/resOnLoad/strKeyDate",
		oObjDivRcd 	: "ipbObjDivRcd",
		oCd 		: "ipbDeptCd",
		oCdNm 		: "ipbDeptNm",
		oStDt 		: "",
		oEndDt 		: "",
		oLanDivRcd 	: "",
		func 		: ""
	}
	];
	
	/* 
	 * 학생 검색팝업 관련 설정사항
	 */
	moPObject.moIdsForStdCsrPStSearch = [
	{
		controlId     	: "btnStudNoPop",
		iStudNo       	: "ipbStudNo",
		iStudId       	: "",
		iStudNm       	: "",
		iKeyDate	  	: "/root/resOnLoad/strKeyDate",
		iObjDivRcd 		: "",
		iObjCd     	  	: "",
		iObjNm 			: "",
		iAuthYN		  	: "",
		oStudId       	: "ipbStudId",
		oStudNo       	: "ipbStudNo",
		oStudNm       	: "",
		oSsn          	: "",
		oStatNm 	  	: "",
		oStatRcd	  	: "",
		oProcRslt	  	: "",
		oProcRsltYear	: "",
		oSaCd         	: "",
		oSaNm         	: "",					
		oSpCd         	: "",
		oSpNm         	: "",
		oOgCd 		  	: "",
		oOgNm 		  	: "",
		func 		  	: ""
	}
	];
		
	/**
	 * @desc  Header Import onLoad
	 * @return void
	 * @author Aeyoung Lee 2016-07-07
	 */
	moPage.onLoadImportDone_ImpTitle = function() {		
		doHeaderOnLoad();
	};
	
	/**
	 * @desc  객체검색팝업 Import onLoad
	 * @return void
	 * @author Aeyoung Lee 2016-07-07
	 */
	moPage.onLoadImportDone_ImpStdCmnPobjSch = function() {
		setStdCmnPObjSchObjInfo();
	};
	
	/**
	 * @desc 온로드 실행
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-07-07
	 */
	moPage.onModelConstructDone_ExtCgtCGrdtAdtProc = function() {
		//리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init("rptScrngErrRst");
		//검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearchExecCond", ["grpTmp"]);
		
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){		
			if(pbSuccess) {	
				util.Control.redraw(app, ["cbbSchYear","cbbSmt"]);
				
				// 졸업학년도 학기를 기본 설정
				util.Control.setValue(app, "cbbSchYear", util.DataMap.getValue(app, "dmResOnLoad", "strDefSchYearRcd"));
				util.Control.setValue(app, "cbbSmt", util.DataMap.getValue(app, "dmResOnLoad", "strDefSmtRcd"));
			}
		});
	};
	
	/**
	 * @desc 학년도 콤보 체인지 이벤트
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-07-07
	 */
	moPage.onValueChanged_CbbSchYear = function() {
		doChangeDate();
	};
	
	/**
	 * @desc 학기 콤보 체인지 이벤트
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-07-07
	 */
	moPage.onValueChanged_CbbSmt = function() {
		doChangeDate();
	};
	
	/**
	 * @desc 학년도학기 변경 이벤트 - 기준 시작일자, 종료일자 셋팅
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-07-07
	 */
	function doChangeDate() {
		util.DataMap.setValue(app, "dmResOnLoad", "strKeyDate", "");
		
		//strCommand: getKeyDate 
		util.Submit.send(app, "subDate", function(){
			// 2017.01.09 소속 및 학생정보 클리어 주석처리 
			//ExtControl.reset(["ipbDeptNm","ipbDeptCd","ipbObjDivRcd", "ipbStudNo", "ipbStudId"]);	
		}); 
	};
	
	/**
	 * @desc 학사부서명 변경 이벤트
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-07-06
	 */
	moPage.onValueChanged_IpbDeptNm = function(sender) {	
		doOnChangeStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc 학사부서 팝업 클릭 이벤트
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-07-06
	 */
	moPage.onClick_BtnDeptNmPop = function(sender) {
		doOnClickStdCmnPObjSch(sender);
	};
	
	
	/**
	 * @desc 학번 변경 이벤트
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-07-06
	 */
	moPage.onValueChanged_IpbStudNo = function(sender) {
		doOnChangeStdCsrPStSearch(sender);
	};
	
	/**
	 * @desc 학생검색 팝업 클릭 이벤트
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-07-06
	 */
	moPage.onClick_BtnStudNoPop = function(sender) {
		doOnClickStdCsrPStSearch(sender);
	};
	
	/**
	 * @desc 졸업사정 실행 클릭 이벤트
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-07-07
	 */
	moPage.onClick_BtnSave = function(psStep) { 
		
		util.Msg.notify(app, "null");
		
		if(!util.validate(app, ["cbbSchYear", "cbbSmt", "ipbDeptNm", "ipbDeptCd", "ipbObjDivRcd"]))return 
		
		util.Control.setVisible(app, false, "grpData");
		
		// 2016.10.18 커버를 씌우기 위해 사전체크는 동기로 변경 
//		// 사전체크
//		ExtSubmission.sendEx("subPreCheck", "preCheck", function(pbSuccess){
//			if(pbSuccess){
//				// 졸업사정결과 데이터 유무 여부
//				var vsCheckCgtAdtRslt = ExtInstance.getValue("/root/resList/strCheckCgtAdtRslt");
//				if(vsCheckCgtAdtRslt == "Y"){
//					//이미 졸업사정하였습니다. 재작업하시겠습니까?
//					if (ComMsg.confirm(NLS.CGT.M029) == "1") {
//						//기존에 작업한 예외처리자를 그대로 남겨놓겠습니까?
//						if (ComMsg.confirm(NLS.CGT.M030) == "1") {
//							ExtInstance.setValue("/root/reqKey/strExptProcAddYn", "Y");
//						} else {
//							ExtInstance.setValue("/root/reqKey/strExptProcAddYn", "N");
//						}	
//						
//						//졸업사정 진행
//						moPage.doSaveCgtAdtProc();
//						
//					} else {
//						//취소하였습니다.
//						Common.setMsgStatus(NLS.INF.M022);
//					}	
//				}else{
//					//졸업사정 진행
//					moPage.doSaveCgtAdtProc();
//				}	
//				
//			}else Common.setMsgStatus(null);
//			
//			Common.removeCover();
//		}); 

		// 배치전 커버페이지 적용
		util.coverPage(app);
		
		// 사전체크
		var vbSuccess = ExtSubmission.sendEx("subPreCheck", "preCheck");
		
		if(!vbSuccess){
			util.removeCover(app);
			return;
		}	
		
		// 졸업사정결과 데이터 유무 여부
		var vsCheckCgtAdtRslt = util.DataMap.getValue(app, "dmResList", "strCheckCgtAdtRslt");
		// 졸업확정 데이터 유무 여부(2017.01.11 추가)
		var vsCheckCgtGrdtStud = util.DataMap.getValue(app, "dmResList", "strCheckCgtGrdtStud");
		
		if(vsCheckCgtAdtRslt == "Y" || vsCheckCgtGrdtStud == "Y"){
			//이미 학위증서번호가 부여되었습니다. 학위증서번호 및 졸업석차를 삭제하고 재작업하시겠습니까?
			//이미 졸업사정하였습니다. 재작업하시겠습니까?
			if (util.Msg.confirm("NLS-CRM-vsCheckCgtGrdtStud == Y ?  NLS.CGT.M041 : NLS.CGT.M029" ) ) {
				//기존에 작업한 예외처리자를 그대로 남겨놓겠습니까?
				if (util.Msg.confirm("NLS-CGT-M030") ) {
					util.DataMap.setValue(app, "dmReqKey", "strExptProcAddYn", "Y");
				} else {
					util.DataMap.setValue(app, "dmReqKey", "strExptProcAddYn", "N");
				}	
				
				//졸업사정 진행
				doSaveCgtAdtProc();
				
			} else {
				//취소하였습니다.
				util.Msg.notify(app, "NLS.INF.M022");
				util.removeCover(app);
				return;
			}	
		}else{
			//졸업사정 진행
			doSaveCgtAdtProc();
		}	
	};
	
	/**
	 * @desc 졸업사정서브미션 호출 함수
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-05-17
	 */
	function doSaveCgtAdtProc() { 
		
		//strCommand: save 
		util.Submit.send(app, "subSave", function(pbSuccess){
			if(pbSuccess){
				
				var vnErrLength = util.DataSet.getRowCount(app, "dsRptScrngErrRst");
				
				if(vnErrLength > 0){
					//해당 졸업대상자에 대해 사정기준이 없는 경우가 있어 작업을 중단합니다./n사정기준오류 대상자 목록을 확인하세요.
					util.Msg.alert("NLS-CGT-M037");
					util.Control.redraw(app, "grdScrngErrRst");
					util.Control.setVisible(app, true, "grpData");
				}else{
					//처리건수
					var strProcCgtAdtRsltCnt = util.DataMap.getValue(app, "dmResList", "strProcCgtAdtRsltCnt");
					util.Msg.notify(app, "NLS.CGT.M031", [strProcCgtAdtRsltCnt]);
					util.Msg.alert("NLS-CGT-M031", [strProcCgtAdtRsltCnt]);
				}	
				
			}else{
				 util.Msg.notify(app, "null");
			}	
			
			util.removeCover(app);
		}); 	
	};
	
	return moPage;
};

