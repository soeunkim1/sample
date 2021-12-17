//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCssCScalStudUpload.xtm"/>


var extCssCScalStudUpload = function() {
		
	var moPage = new Page();
	var moPObject = new PObject();
	
	/* 
	 * 장학금 검색팝업 관련 설정사항
	 */
	moPObject.moIdsForStdCssPScalFeeSch = [
	{
		controlId 		: "btnScalFeeNmPop",
		iCd 			: "",
		iNm 			: "ipbScalFeeNm",
		iObjDivRcd 		: "CC009SS",
		iLanDivRcd 		: "",
		iKeyDate		: "/root/reqKey/END_DT",
		iScalFeeCls1	: "",	
		iScalFeeCls2	: "",	
		iScalFeeCls3	: "",	
		iScalFeeCls4	: "",	
		iScalFeeCls5	: "",	
		iDeptCd 		: "",		
		iDeptObjDivRcd 	: "",	
		iMngDeptDiv		: "", 
		iWrkScalYn		: "",
		oScalFeeCd 		: "ipbScalFeeCd",
		oScalFeeNm 		: "ipbScalFeeNm",
		oObjDivRcd 		: "ipbSsObjDivRcd",
		oPmntDivRcd 	: "",
		oPmntItvRcd 	: "",
		func 			: null
	}
	];
		
	/**
	 * @desc  Header Import onLoad
	 * @return void
	 * @author Aeyoung Lee 2016-05-18
	 */
	moPage.onLoadImportDone_ImpTitle = function() {		
		doHeaderOnLoad();
	};
	
	/**
	 * @desc 온로드 실행
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-05-18
	 */
	moPage.onModelConstructDone_ExtCssCScalStudUpload = function() {
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){		
			if(pbSuccess) {	
				util.Control.redraw(app, ["cbbSchYear","cbbSmt"]);
				util.Control.setValue(app, "dipProcPlanDt", util.DataMap.getValue(app, "dmResList", "strSysDate").substring(0,8));
			}
		});
	};
	
	/**
	 * @desc 학년도 콤보 체인지 이벤트
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-05-18
	 */
	moPage.onValueChanged_CbbYear = function() {
		doChangeDate();
	};
	
	/**
	 * @desc 학기 콤보 체인지 이벤트
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-05-18
	 */
	moPage.onValueChanged_CbbSmt = function() {
		doChangeDate();
	};
	
	/**
	 * @desc 학년도학기 변경 이벤트 - 기준 시작일자, 종료일자 셋팅
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-05-18
	 */
	function doChangeDate() {
		util.DataMap.setValue(app, "dmReqKey", "ST_DT", "");
		util.DataMap.setValue(app, "dmReqKey", "END_DT", "");
		//strCommand: date 
		util.Submit.send(app, "subDate", function(){
			//ExtControl.reset(["ipbScalFeeNm","ipbScalFeeCd","ipbSsObjDivRcd"]);	
		}); 
	};
	
	/**
	 * @desc 장학금명 팝업 클릭 이벤트
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-08-30
	 */
	moPage.onClick_BtnScalFeeNmPop = function(sender) {
		doOnClickStdCssPScalFeePop(sender);
	}
	
	/**
	 * @desc 장학금명 변경 이벤트
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-08-30
	 */
	moPage.onValueChanged_IpbScalFeeNm = function(sender) {
		doOnChangeStdCssPScalFeePop(sender);
	}
	
	/**
	 * @desc 다운로드버튼 클릭이벤트 (업로드양식다운로드)
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-05-18
	 */
	moPage.onClick_BtnSaveFileDown = function() {
				
		var vsFileChgNm = "장학_장학생일괄업로드파일.xlsx";
		
		var voParam = {
					"strFileSubPath" : "stdCmnCTemplateFile",
					"strFileNm" 	 : vsFileChgNm,
					"strOriFileNm" 	 : vsFileChgNm,
					"strTmpFilePath" : "",
					"strCommand" 	 : "fileDownLoad"
		}
		//다운로드 받을 파일 위치, 다운로드받을 파일이름, 프로그래스동작여부(일단 ""), actionUrl
		FileUtil.downloadFile( "/std.cmn.StdCmnFileTransUtil.ex",voParam);
	};
	
	/**
	 * @desc Browse 버튼 클릭 이벤트 (File Dialog 창 open)
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-05-18
	 */
	moPage.onClick_BtnSaveBrowse = function() {
		FileUtil.getFileName(true, ["xls", "xlsx"], function(psFileNm){
			util.Control.setValue(app, "optFilePath", psFileNm);
		},"",false);
	};
	
	/**
	 * @desc 실행버튼 클릭 이벤트
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-05-18
	 */
	moPage.onClick_BtnSaveRun = function() {
		
		util.Msg.notify(app, "null");
		
		if(!util.validate(app, ["cbbSchYear", "cbbSmt", "ipbScalFeeNm", "ipbScalFeeCd", "dipProcPlanDt", "optFilePath"])) return;
		
		// 2016.12.1 컴펌메시지 추가
		// 체크예외처리여부를 선택하였습니다.\n장학금 유효성 체크사항을 제외하고 처리하시겠습니까?
		var vsExptProcYn = util.Control.getValue(app, "ckbExptProcYn");
		if(vsExptProcYn == "Y"){
			if(!util.Msg.confirm("NLS-CSS-M109") ) return;
		}
		
		// 2016.10.14 배치처리전 커버페이지 씌우는 로직추가
		util.coverPage(app);
		
		// 엑셀업로드 서브미션
		//strCommand: execUpload 
		util.Submit.send(app, "subExecUpload", function(pbSuccess){
			if(pbSuccess){
				
				var vsErrorCnt = util.DataMap.getValue(app, "dmResList", "strErrorCnt"); // 오류갯수
				
				if(vsErrorCnt == null || vsErrorCnt == "") {
					// 오류개수 값이 없을때 0으로 세팅 
					vsErrorCnt = "0";
				}
				
				if(vsErrorCnt > 0 ){
					util.Control.setValue(app, "optFilePath", "");
					
					var vsFileDir = util.DataMap.getValue(app, "dmFileInfo", "strFileDir");
					var vsFileNm = util.DataMap.getValue(app, "dmFileInfo", "strFileNm");
					var vsFileChgNm = util.DataMap.getValue(app, "dmFileInfo", "strFileChgNm");
					var strTmpFilePath = util.DataMap.getValue(app, "dmFileInfo", "strTmpFilePath");
					
					var voParam = {
						"strFileSubPath" : "",
						"strFileNm" : vsFileNm,
						"strOriFileNm" : vsFileNm,
						"strTmpFilePath" : strTmpFilePath,
						"strCommand" : "fileDownLoad"
					}
					
					//다운로드 받을 파일 위치, 다운로드받을 파일이름, 프로그래스동작여부(일단 ""), actionUrl
					FileUtil.downloadFile( "/std.cmn.StdCmnFileTransUtil.ex",voParam);
					
				}
				
				// 총건수
				var vsTotCnt = util.DataMap.getValue(app, "dmResList", "strTotCnt");
				if(vsTotCnt == null || vsTotCnt == "") {
					vsTotCnt = "0";
				}
					
				// 정상처리건수	
				var vsResultCnt = util.DataMap.getValue(app, "dmResList", "strResultCnt");
				if(vsResultCnt == null || vsResultCnt == "") {
					// 총 count 가 없을때 0으로 세팅. 2013.02.01
					vsResultCnt = "0";
				}
				
				// 총 @건 중 정상처리 @건,  오류 @건 처리되었습니다.\n오류 건이 있을 경우 오류파일의 내용을 참고하십시오.
				if(vsErrorCnt > 0 ){
					util.Msg.alert("NLS-CSS-M096", [vsTotCnt, vsResultCnt, vsErrorCnt, NLS.CSS.M097]);	
				}else{
					util.Msg.alert("NLS-CSS-M096", [vsTotCnt, vsResultCnt, vsErrorCnt]);		
				}	
				
				// 파일업로드가 완료되었습니다.
				util.Msg.notify(app, "NLS.INF.M038");
					
			}else{
				// 처리가 취소되었습니다.
				util.Msg.notify(app, "NLS.INF.M013");
			}
			
			util.Control.setValue(app, "optFilePath", "");
			
			util.removeCover(app);
		});
	};
	
	
	
	return moPage;
};

