//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCsrSGrdtPlanInspt.xtm"/>


var extCsrSGrdtPlanInspt = function() {
		
	var moPage = new Page();
		
	/**
	 * @desc  Header Import onLoad
	 * @return void
	 * @author Aeyoung Lee 2016-09-01
	 */
	moPage.onLoadImportDone_ImpTitle = function() {		
		doHeaderOnLoad();
	};
	
	/**
	 * @desc 다운로드버튼 클릭이벤트 (업로드양식다운로드)
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-09-01
	 */
	moPage.onClick_BtnSaveFileDown = function() {
		var vsFileChgNm = "학적_졸업예정자실태조사.xlsx";
		
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
	 * @author Aeyoung Lee 2016-09-01
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
	 * @author Aeyoung Lee 2016-09-01
	 */
	moPage.onClick_BtnSaveRun = function() {
		
		if(!util.validate(app, ["cbbSchYear", "cbbSmt", "dipKeyDate"])) return; 
		
		// 2016.10.14 배치처리전 커버페이지 씌우는 로직추가
		util.coverPage(app);
		
		
		// 엑셀업로드 서브미션
		//strCommand: execUpload 
		util.Submit.send(app, "subExecUpload", function(pbSuccess){
			if(pbSuccess){
				
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
				
				// 정보추출이 처리되었습니다. 생성파일을 확인하십시오.
				util.Msg.alert("NLS-CSS-M106");
				util.Msg.notify(app, "NLS.CSS.M106");
					
			}else{
				// 처리가 취소되었습니다.
				util.Msg.notify(app, "NLS.INF.M013");
			}
			
			util.Control.setValue(app, "optFilePath", "");
			util.removeCover(app);
		});
	};
	
	
	moPage.onModelConstructDone_ExtCsrSGrdtPlanInspt = function() {
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){		
			if(pbSuccess) {	
				util.Control.redraw(app, "dipKeyDate");
				util.Control.redraw(app, ["cbbSchYear","cbbSmt"]);
			}
		});
	};
	return moPage;
};

