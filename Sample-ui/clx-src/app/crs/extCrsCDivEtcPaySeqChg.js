//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCrsCDivEtcPaySeqChg.xtm"/>


var extCrsCDivEtcPaySeqChg = function() {
		
	var moPage = new Page();
		
	/**
	 * @desc  Header Import onLoad
	 * @return void
	 * @author Aeyoung Lee 2016-10-07
	 */
	moPage.onLoadImportDone_ImpTitle = function() {		
		doHeaderOnLoad();
	};
	
	/**
	 * @desc 온로드 실행
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-10-07
	 */
	moPage.onModelConstructDone_ExtCrsCDivEtcPaySeqChg = function() {
		
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){		
			if(pbSuccess) {	
				util.Control.redraw(app, ["cbbSchYear","cbbSmt"]);
				
				util.Control.setValue(app, "rdbProcDiv", "1");
			}
		});
	};
	
	/**
	 * @desc 실행버튼 클릭 이벤트
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-10-07
	 */
	moPage.onClick_BtnSaveRun = function() { 
		
		util.Msg.notify(app, "null");	
		
		if(!util.validate(app, ["cbbSchYear", "cbbSmt", "rdbProcDiv"])) return;
		
		var vsSchYearSelIdx = util.SelectCtl.getSelectedIndex(app, "cbbSchYear");
		var vsSmtSelIdx = util.SelectCtl.getSelectedIndex(app, "cbbSmt");
		
		// 2016.10.14 배치처리전 커버페이지 씌우는 로직추가
		util.coverPage(app);
		
		//strCommand: run 
		util.Submit.send(app, "subRun", function(pbSuccessRun){
			if(pbSuccessRun){
				//산출결과를 요약하여 뿌려줌
				var vnRltCnt = Number(util.DataMap.getValue(app, "dmResList", "strRltStudCnt"));
				
				if(vnRltCnt <= 0){
					// 대상 자료가 없습니다.
					util.Msg.notify(app, "NLS.CRS.M107");
					util.Msg.alert("NLS-CRS-M107");	
					
				}else{
					// @건 처리되었습니다.
					util.Msg.notify(app, "NLS.CRS.M108", [vnRltCnt]);
					util.Msg.alert("NLS-CRS-M108", [vnRltCnt]);	
				}
				
			}	
			
			util.removeCover(app);
		}); 	
	};
	
	return moPage;
};


