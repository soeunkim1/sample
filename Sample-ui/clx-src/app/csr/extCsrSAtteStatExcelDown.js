//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
///<xtmlink path="./extCsrSAtteStatExcelDown.xtm"/>

var extCsrSAtteStatExcelDown = function() {

	var moPage = new Page();
	//임포트용 데이터 통신 오브젝트
	var moPObject = new PObject();
	
	/**
	 * @desc Header Import onLoad
	 * @param 
	 * @return void
	 * @author Sunyoung park 2016.12.1 
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		doHeaderOnLoad();
	};
	

	/**
	 * @desc 실행버튼 클릭시 엑셀로 데이터를 다운로드 하는 기능을 실행한다. 
	 * @param 
	 * @return void
	 * @author Sunyoung park 2016.12.1 
	 */
	moPage.onClick_BtnSaveRun = function() {
		
		if(!util.validate(app, ["dipKeyDate"])) return; 
		
		// 배치처리전 커버페이지 씌우는 로직추가
		util.coverPage(app);
		
		//strCommand: exportExcel 
		util.Submit.send(app, "subExecDown", function(pbSuccess){
			if(pbSuccess){
//				
				var vsFileDir = util.DataMap.getValue(app, "dmFileInfo", "strFileDir");
				var vsFileNm = util.DataMap.getValue(app, "dmFileInfo", "strFileNm");
				var vsFileChgNm = util.DataMap.getValue(app, "dmFileInfo", "strFileChgNm");
				var strTmpFilePath = util.DataMap.getValue(app, "dmFileInfo", "strTmpFilePath");
				debugger;
				var voParam = {
					"strFileSubPath" : "",
					"strFileNm" : vsFileNm,
					"strOriFileNm" : vsFileNm,
					"strTmpFilePath" : strTmpFilePath,
					"strCommand" : "fileDownLoad"
				}
				
				//다운로드 받을 파일 위치, 다운로드받을 파일이름, 프로그래스동작여부(일단 ""), actionUrl
				FileUtil.downloadFile( "/std.cmn.StdCmnFileTransUtil.ex",voParam);
//				
				// 정보추출이 처리되었습니다. 생성파일을 확인하십시오.
				util.Msg.alert("NLS-CSS-M106");
				util.Msg.notify(app, "NLS.CSS.M106");
					
			}else{
				// 처리가 취소되었습니다.
				util.Msg.notify(app, "NLS.INF.M013");
			}
			
			util.removeCover(app);
		});
	}
	

	/**
	 * @desc 코드정보 가져오기 
	 * @param 
	 * @return void
	 * @author Sunyoung park 2016.12.1 
	 */	
	moPage.onModelConstructDone_ExtCsrSAtteStatExcelDown = function() {
		
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){		
			if(pbSuccess) {	
				util.DataMap.setValue(app, "dmReqList", "strKeyDate", util.DataMap.getValue(app, "dmResOnLoad", "strCutDt"));
				util.Control.redraw(app, "dipKeyDate");
				util.Control.redraw(app, ["cbbDgrCrsDivRcd","cbbCapIoDivRcd","cbbAss"]);
			}
		});
	};
	
	
	
	
	moPage.onClick_BtnYearSmt = function() {
		//기준일자 임포트(달력컨트롤ID,임포트ID)
		doOnclickSchYearSmt("dipKeyDate","impSchYearSmt");
	};
	return moPage;
};

