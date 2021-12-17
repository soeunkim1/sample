//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCrsCBankFileCrt.xtm"/>


var extCrsCBankFileCrt = function() {
		
	var moPage = new Page();
	var moPObject = new PObject();
		
	/**
	 * 학생검색팝업 관련 설정사항
	 */
	moPObject.moIdsForStdCsrPStSearch = [
	{
		controlId 		: "btnStudPop",
		iStudNo 		: "ipbStudId",	
		iStudId 		: "",
		iStudNm 		: "",
		iKeyDate 		: "/root/reqKey/END_DT",
		iObjDivRcd 		: "", 
		iObjCd 			: "", 
		iObjNm 			: "",
		iAuthYN 		: "",
		iStatRcd 		: "",
		iStudDivRcd		: "",
		oStudId 		: "ipbStudIdObj",
		oStudNo 		: "ipbStudId",
		oStudNm 		: "",
		oStatNm 		: "",
		oStatRcd 		: "",
		oProcRslt 		: "",
		oProcRsltYear 	: "",
		oSaNm			: "",
		oSaCd 			: "",
		oSpNm 			: "",
		oSpCd 			: "",
		oOgNm 			: "",
		oOgCd 			: "",
		oStudDivRcd		: "",
		oStudDivNm		: "",
		oBirthday		: "",
		oGenderRcd		: "",
		oGenderNm		: "",
		func : null
	}
	];	
		
	/**
	 * @desc  Header Import onLoad
	 * @return void
	 * @author Aeyoung Lee 2016-05-31
	 */
	moPage.onLoadImportDone_ImpTitle = function() {		
		doHeaderOnLoad();
	};
	
	/**
	 * @desc 온로드 실행
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-05-31
	 */
	moPage.onModelConstructDone_ExtCrsCBankFileCrt = function() {
		//리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["rptError"]);
		
		//오루내역 리피트 visible = false
		util.Control.setVisible(app, false, ["grpData"]);
		
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){		
			if(pbSuccess) {	
				util.Control.redraw(app, ["cbbSchYear","cbbSmt","cbbBankRcd", "cbbAtte"]);
				
				util.SelectCtl.selectItem(app, "cbbBankRcd", 0);
				
				util.Control.setValue(app, "ckbPayTypeAll", "Y");
				
				// 학기, 납부형태에 따른 납부형태, 분납차수 제어
				doChangeExecCond();
			}
		});
	};
	
	/**
	 * @desc 학년도 콤보 체인지 이벤트
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-05-31
	 */
	moPage.onValueChanged_CbbYear = function() {
		doChangeDate();
	};
	
	/**
	 * @desc 학기 콤보 체인지 이벤트
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-05-31
	 */
	moPage.onValueChanged_CbbSmt = function() {
		doChangeDate();
		
		// 학기, 납부형태에 따른 납부형태, 분납차수 제어
		doChangeExecCond();
	};
	
	/**
	 * @desc 학년도학기 변경 이벤트 - 기준 시작일자, 종료일자 셋팅
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-05-31
	 */
	function doChangeDate() {
		util.DataMap.setValue(app, "dmReqKey", "ST_DT", "");
		util.DataMap.setValue(app, "dmReqKey", "END_DT", "");
		
		ExtSubmission.sendEx("subDate", "date"); 
	};
	
	/**
	 * @desc 납부형태-분납 변경 이벤트
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-05-31
	 */
	moPage.onValueChanged_CkbPayTypeDiv = function() {
		// 학기, 납부형태에 따른 납부형태, 분납차수 제어
		doChangeExecCond();
	};
	
	/**
	 * @desc 실행조건 학생팝업 클릭 이벤트
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-05-30
	 */
	moPage.onClick_BtnStudPop = function(sender) {
		doOnClickStdCsrPStSearch(sender);
	};
	
	/**
	 * @desc 실행조건 학생 변경 이벤트
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-05-30
	 */
	moPage.onValueChanged_IpbStudId = function(sender) {
		doOnChangeStdCsrPStSearch(sender);
	};
	
	/**
	 * @desc 실행조건 학기에 따른 납부형태, 분납차수 제어
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-05-30
	 */
	function doChangeExecCond() {
		var vsSmtCd = util.Control.getValue(app, "cbbSmt");
		var vsChkValue = vsSmtCd.substring(vsSmtCd.length - 2);
		
		//계절학기일경우 
		if ("91" == vsChkValue || "93" == vsChkValue) {
			util.Control.setEnable(app, false, ["ckbPayTypeAll", "ckbPayTypeDiv", "rdbDivPaySeq"]);
			
			util.Control.setValue(app, "ckbPayTypeDiv", "");
			util.Control.setValue(app, "rdbDivPaySeq", "");
			util.Control.setValue(app, "ckbPayTypeAll", "Y");
		} else {
			util.Control.setEnable(app, true, ["ckbPayTypeAll", "ckbPayTypeDiv"]);
			
			if(util.Control.getValue(app, "ckbPayTypeDiv") == "Y"){
				util.Control.setEnable(app, true, ["rdbDivPaySeq"]);
			}else{
				util.Control.setValue(app, "rdbDivPaySeq", "")	;
				util.Control.setEnable(app, false, ["rdbDivPaySeq"]);
			}	
		}
	};
	
	/**
	 * @desc 실행버튼 클릭 이벤트
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-05-31
	 */
	moPage.onClick_BtnSaveRun = function() { 
		
		util.Msg.notify(app, "null");	
		//오루내역 리피트 visible = false
		util.Control.setVisible(app, false, ["grpData"]);
		
		if(!util.validate(app, ["cbbSchYear", "cbbSmt", "cbbBankRcd"])) return;
		
		// 실행조건 유효성 체크
		if(!doCondValidation()) return;
		
		var vsSchYearSelIdx = util.SelectCtl.getSelectedIndex(app, "cbbSchYear");
		var vsSmtSelIdx = util.SelectCtl.getSelectedIndex(app, "cbbSmt");
		var vsBankSelIdx = util.SelectCtl.getSelectedIndex(app, "cbbBankRcd");
		
		//파일명 (학년도+학기+_+은행명)
		util.DataMap.setValue(app, "dmReqKey", "strFileNm", util.SelectCtl.getLabel(app, "cbbSchYear", vsSchYearSelIdx) + util.SelectCtl.getLabel(app, "cbbSmt", vsSmtSelIdx) + "_" + util.SelectCtl.getLabel(app, "cbbBankRcd", vsBankSelIdx));	
		
		// 2016.10.14 배치처리전 커버페이지 씌우는 로직추가
		util.coverPage(app);
		
		// 등록대상은행파일 생성 서브미션
		//strCommand: crtBankFile 
		util.Submit.send(app, "subCrtBankFile", function(pbSuccess){
			if(pbSuccess){
				var vsIsErr = util.DataMap.getValue(app, "dmResList", "isErr");
				if(vsIsErr == "Y"){
					//파일생성이 실패되었습니다. 오류목록을 확인하시길 바랍니다.
					util.Msg.alert("NLS-CRS-M102");
					util.Msg.notify(app, "NLS.CRS.M102");	
					
					//오루내역 리피트 visible
					util.Control.setVisible(app, true, ["grpData"]);
					util.Control.redraw(app, "grdError");
				}else{
					//오루내역 리피트 visible = false
					util.Control.setVisible(app, false, ["grpData"]);
					util.Control.redraw(app, "grdError");
					
					var vsResultCnt = util.DataMap.getValue(app, "dmResList", "strResultCnt");	
					
					//은행용 파일이 생성되었습니다.
					util.Msg.alert("NLS-CRS-M101", [vsResultCnt]);
					util.Msg.notify(app, "NLS.CRS.M100");	
					
					// 파일 셋팅
					var vsFileDir = util.DataMap.getValue(app, "dmFileInfo", "strFileDir");		//파일디렉토리경로
					var vsFileNm = util.DataMap.getValue(app, "dmFileInfo", "strFileNm");		//파일명
					var vsFileChgNm = util.DataMap.getValue(app, "dmFileInfo", "strFileChgNm");	//변환파일명(실제 서버에 저장된 파일명)
					var strTmpFilePath = util.DataMap.getValue(app, "dmFileInfo", "strTmpFilePath");	
					
					var voFileParam = {
								"strFileSubPath" : "",
								"strFileNm" : vsFileChgNm,
								"strOriFileNm" : vsFileNm,
								"strTmpFilePath" : strTmpFilePath,
								"strCommand" : "fileDownLoad"
					}
					
					//다운로드 받을 파일 위치, 다운로드받을 파일이름, 프로그래스동작여부(일단 ""), actionUrl
					FileUtil.downloadFile( "/std.cmn.StdCmnFileTransUtil.ex",voFileParam);
				}	
				
			}else{
				//파일생성이 실패되었습니다.
				util.Msg.alert("NLS-CRS-M099");
				util.Msg.notify(app, "NLS.CRS.M099");	
			}	
			
			util.removeCover(app);
		}); 
	};
	
	/**
	 * @desc 실행조건 검증
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-05-30
	 */
	function doCondValidation() {
		var vbValid = true;
		
		var vsPayTypeAll = util.Control.getValue(app, "ckbPayTypeAll");	//납부형태(전액)
		var vsPayTypeDiv = util.Control.getValue(app, "ckbPayTypeDiv"); 	//납부형태(분납)
		
		// 납부형태 체크
		if (ValueUtil.isNull(vsPayTypeAll) && ValueUtil.isNull(vsPayTypeDiv)) {
			vbValid = false;
			util.Msg.alert("NLS-WRN-M100", [ExtControl.getTextValue("lblPayType")]);
		}
		else if (vsPayTypeDiv == "Y") {
			
			var vsDivPaySeq = util.Control.getValue(app, "rdbDivPaySeq"); 	//분납차수 
			
			//분납차수.
			if (ValueUtil.isNull(vsDivPaySeq)) {
				vbValid = false;
				// 분납선택시 차수는 필수항목입니다.
				util.Msg.alert("NLS-CRS-M098");
				util.Control.setFocus(app, "rdbDivPaySeq");
			}
		}
		
		return vbValid;
	};
	
	
	return moPage;
};

