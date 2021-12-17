//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./stdCrsCRegFeeCalc.xtm"/>


var stdCrsCRegFeeCalc = function() {
		
	var moPage = new Page();
		
	/**
	 * @desc  Header Import onLoad
	 * @return void
	 * @author Aeyoung Lee 2016-02-03
	 */
	moPage.onLoadImportDone_ImpTitle = function() {		
		doHeaderOnLoad();
	};
	
	/**
	 * @desc  조건 Import onLoad
	 * @return void
	 * @author Aeyoung Lee 2016-02-03
	 */
	moPage.onLoadImportDone_ImpCssScalCollSch = function() {
		onLoadOptGrpImp("CB01901", "getStudGrpList", null);
	};
	
	/**
	 * @desc 온로드 실행
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-02-03
	 */
	moPage.onModelConstructDone_StdCrsCRegFeeCalc = function() {
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){		
			if(pbSuccess) {
				util.Control.redraw(app, ["cbbYear","cbbSmt","cbbRegCls","cbbPrcd","dipIfrDt","dipPayCloseDt"]);
				
				var vsDefaultRegCls = ExtInstance.getValue("/root/resList/listRegCls/row", "CD", "child::CD_PRP1='Y'");
				
				util.SelectCtl.selectItem(app, "cbbRegCls", vsDefaultRegCls);
				util.SelectCtl.selectItem(app, "cbbPrcd", 0);
			}
			
		});
	};
	
	/**
	 * @desc 학년도 콤보 체인지 이벤트
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-02-03
	 */
	moPage.onValueChanged_CbbYear = function() {
		doChangeDate();
	};
	
	/**
	 * @desc 학기 콤보 체인지 이벤트
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-02-03
	 */
	moPage.onValueChanged_CbbSmt = function() {
		doChangeDate();
	};
	
	/**
	 * @desc 학년도학기 변경 이벤트 - 기준 시작일자, 종료일자 셋팅
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-02-03
	 */
	function doChangeDate() {
		util.DataMap.setValue(app, "dmDate", "ST_DT", "");
		util.DataMap.setValue(app, "dmDate", "END_DT", "");
		ExtSubmission.sendEx("subDate", "date"); 
	};
	
	/**
	 * @desc 실행버튼 클릭 이벤트
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-02-03
	 */
	 moPage.onClick_BtnSaveFeeCalc = function() {
		if(!doValidationImp()) return;
		
		if(!util.validate(app, ["cbbYear", "cbbSmt", "cbbRegCls", "cbbPrcd", "dipIfrDt"])) return;
		
		// 2016.10.14 배치처리전 커버페이지 씌우는 로직추가
		util.coverPage(app);
		
		//strCommand: saveFeeCalc 
		util.Submit.send(app, "subSaveFeeCalc", function(pbSuccess){
			if(pbSuccess){
				var vbRunStudCnt = util.DataMap.getValue(app, "dmResList", "strRunStudCnt");
				
				var vsFileDir = util.DataMap.getValue(app, "dmFileInfo", "strFileDir");		//파일디렉토리경로
				var vsFileNm = util.DataMap.getValue(app, "dmFileInfo", "strFileNm");		//파일명
				var vsFileChgNm = util.DataMap.getValue(app, "dmFileInfo", "strFileChgNm");	//변환파일명(실제 서버에 저장된 파일명)
				var strTmpFilePath = util.DataMap.getValue(app, "dmFileInfo", "strTmpFilePath");	
				
				// @1 명의 학생에 대해 수행했습니다. 로그 및 에러를 확인하세요.
				util.Msg.alert("NLS-CRS-M061", [vbRunStudCnt]);
				
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
			
			util.removeCover(app);
		}); 
	};
		
	return moPage;
};

