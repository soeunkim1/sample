//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCssCNatScalFileCrt.xtm"/>


var extCssCNatScalFileCrt = function() {
		
	var moPage = new Page();
		
	/**
	 * @desc  Header Import onLoad
	 * @return void
	 * @author Aeyoung Lee 2016-06-09
	 */
	moPage.onLoadImportDone_ImpTitle = function() {		
		doHeaderOnLoad();
	};
	
	/**
	 * @desc 온로드 실행
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-06-09
	 */
	moPage.onModelConstructDone_ExtCssCNatScalFileCrt = function() {
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){		
			if(pbSuccess) {	
				util.Control.redraw(app, ["cbbSchYear","cbbSmt"]);
				
				// 2016.10.05 등록마감일자 삭제 내부로직으로 처리하도록 변경함
				// 등록마감일자 현재일자 디폴트 셋팅 
				//var vsSysDate = ExtInstance.getValue("/root/resOnLoad/strSysDate").substring(0,8);
				//ExtControl.setValue("dipRegCloseDt", vsSysDate);
				
				// 학생구분, 자료구분 첫번째값 디폴트 셋팅
				util.SelectCtl.selectItem(app, "cbbStudDiv", 0);
				util.SelectCtl.selectItem(app, "cbbDataDiv", 0);
			}
		});
	};
	
	/**
	 * @desc 실행버튼 클릭 이벤트
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-06-09
	 */
	moPage.onClick_BtnSaveRun = function() { 
	
		util.Msg.notify(app, "null");
		
		if(!util.validate(app, ["cbbSchYear", "cbbSmt", "cbbStudDiv", "cbbDataDiv"])) return;
		
		var vsSchYearSelIdx = util.SelectCtl.getSelectedIndex(app, "cbbSchYear");
		var vsSmtSelIdx = util.SelectCtl.getSelectedIndex(app, "cbbSmt");
		var vsDataSelIdx = util.SelectCtl.getSelectedIndex(app, "cbbDataDiv");
		var vsStudSelIdx = util.SelectCtl.getSelectedIndex(app, "cbbStudDiv");
		
		//파일명 (학년도+학기+_자료구분_학생구분)
		util.DataMap.setValue(app, "dmReqKey", "strCrtFileNm", util.SelectCtl.getLabel(app, "cbbSchYear", vsSchYearSelIdx) + "_" + util.SelectCtl.getLabel(app, "cbbSmt", vsSmtSelIdx) + "_" + util.SelectCtl.getLabel(app, "cbbDataDiv", vsDataSelIdx) + "_" + util.SelectCtl.getLabel(app, "cbbStudDiv", vsStudSelIdx));	
		
		// 2016.10.14 배치처리전 커버페이지 씌우는 로직추가
		util.coverPage(app);
		
		//strCommand: crtSchFile 
		util.Submit.send(app, "subCrtFile", function(pbSuccessRun){
			if(pbSuccessRun){
				
				//파일이 생성되었습니다.
				util.Msg.alert("NLS-CSS-M100");
				util.Msg.notify(app, "NLS.CSS.M100");	

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
			}else{
				//파일생성이 실패되었습니다.
				util.Msg.alert("NLS-CSS-M099");
				util.Msg.notify(app, "NLS.CSS.M099");	
			}	
			
			util.removeCover(app);
		});  
	};
	
	return moPage;
};

