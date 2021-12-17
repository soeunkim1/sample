//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCrsCBankFileReg.xtm"/>


var extCrsCBankFileReg = function() {
		
	var moPage = new Page();
	var moPObject = new PObject();
		
	/* 
	 * 납입계좌 검색팝업 관련 설정사항
	 */
	moPObject.moIdsForStdCrsPAcctSch = [
	{
		controlId : "btnPayAcctNmPop",
		iCd : "",
		iNm : "ipbPayAcctNm",
		oAcctCd : "ipbPayAcctNo",
		oAcctNm : "ipbPayAcctNm",
		func : null
	}
	]
		
	/**
	 * @desc  Header Import onLoad
	 * @return void
	 * @author Aeyoung Lee 2016-06-04
	 */
	moPage.onLoadImportDone_ImpTitle = function() {		
		doHeaderOnLoad();
	};
	
	/**
	 * @desc 온로드 실행
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-06-04
	 */
	moPage.onModelConstructDone_ExtCBankFileReg = function() {
		//리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["rptProcRst"]);
		
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){		
			if(pbSuccess) {	
				util.Control.redraw(app, ["cbbSchYear","cbbSmt"]);
			}
		});
	};
	
	/**
	 * @desc 학년도 콤보 체인지 이벤트
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-06-04
	 */
	moPage.onValueChanged_CbbYear = function() {
		doChangeDate();
	};
	
	/**
	 * @desc 학기 콤보 체인지 이벤트
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-06-04
	 */
	moPage.onValueChanged_CbbSmt = function() {
		doChangeDate();
	};
	
	/**
	 * @desc 학년도학기 변경 이벤트 - 기준 시작일자, 종료일자 셋팅
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-06-04
	 */
	function doChangeDate() {
		util.DataMap.setValue(app, "dmReqKey", "ST_DT", "");
		util.DataMap.setValue(app, "dmReqKey", "END_DT", "");
		
		ExtSubmission.sendEx("subDate", "date"); 
	};
	
	/**
	 * @desc 실행조건 납입계좌팝업 클릭 이벤트
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-06-04
	 */
	moPage.onClick_BtnPayAcctNmPop = function(sender) {
		doOnClickStdCrsPAcctSch(sender);
	};
	
	/**
	 * @desc 실행조건 납입계좌 변경 이벤트
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-06-04
	 */
	moPage.onValueChanged_IpbPayAcctNm = function(sender) {
		doOnChangeStdCrsPAcctSch(sender);
	};
	
	/**
	 * @desc Browse 버튼 클릭 이벤트 (File Dialog 창 open)
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-06-04
	 */
	moPage.onClick_BtnSaveBrowse = function() {
		FileUtil.getFileName(true, ["txt"], function(psFileNm){
			util.Control.setValue(app, "optFilePath", psFileNm);
		},"",false);
	}
	
	/**
	 * @desc 실행버튼 클릭 이벤트
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-06-04
	 */
	moPage.onClick_BtnSaveRun = function() { 	
		if(!util.validate(app, ["cbbSchYear", "cbbSmt", "ipbPayAcctNm", "optFilePath"])) return;
		
		// 2016.10.14 배치처리전 커버페이지 씌우는 로직추가
		util.coverPage(app);
		
		// 등록대상은행파일 생성 서브미션
		//strCommand: procFileReg 
		util.Submit.send(app, "subBankFileReg", function(pbSuccess){
			if(pbSuccess){
				var vnAllCount = util.DataMap.getValue(app, "dmResList", "intAllCount");
				var vnPCount = util.DataMap.getValue(app, "dmResList", "intPCount");
				var vnFCount = util.DataMap.getValue(app, "dmResList", "intFCount");
				
				// 총건수
				if(vnAllCount == null || vnAllCount == "") {
					vnAllCount = "0";
				}
					
				// 정상처리건수	
				if(vnPCount == null || vnPCount == "") {
					vsResultCnt = "0";
				}
				
				//전 체 @건 중 @건 성공하였습니다.
				util.Msg.alert("NLS-CRS-M103", [vnAllCount, vnPCount]);
				
				// 은행파일이 등록처리되었습니다.
				util.Msg.notify(app, "NLS.CRS.M104");
				
				util.Control.redraw(app, "grdProcRst");
			}else{
				// 처리가 취소되었습니다.
				util.Msg.notify(app, "NLS.INF.M013");
				util.Control.reset(app, "rptProcRst");
			}
			
			util.Control.setValue(app, "optFilePath", "");
			
			util.removeCover(app);
		}); 
	};
	
	return moPage;
};

