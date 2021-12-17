//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCgtCGrdtRnkProc.xtm"/>


var extCgtCGrdtRnkProc = function() {
		
	var moPage = new Page();
	var moPObject = new PObject();
		
	/**
	 * @desc  Header Import onLoad
	 * @return void
	 * @author Aeyoung Lee 2016-07-21
	 */
	moPage.onLoadImportDone_ImpTitle = function() {		
		doHeaderOnLoad();
	};
	
	/**
	 * @desc 온로드 실행
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-07-21
	 */
	moPage.onModelConstructDone_ExtCgtCGrdtRnkProc = function() {
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
	 * @desc 졸업석차부여 선정 클릭 이벤트
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-07-21
	 */
	moPage.onClick_BtnSave = function(psStep) { 
		
		util.Msg.notify(app, "null");
		
		if(!util.validate(app, ["cbbSchYear", "cbbSmt"])) return;
		
		// 2016.10.18 커버를 씌우기 위해 사전체크는 동기로 변경 
//		// 사전체크
//		ExtSubmission.sendEx("subPreCheck", "preCheck", function(pbSuccess){
//			if(pbSuccess){
//				// 해당 학년도, 학기에 졸업석차부여 작업을 이미 처리했는지 확인
//				var strCheckCgtRnk = ExtInstance.getValue("/root/resList/strCheckCgtRnk");
//				if(strCheckCgtRnk  == "Y"){
//					//이미 졸업석차부여한 자료가 존재합니다. 이전 자료가 삭제됩니다. 재작업하시겠습니까?
//					if (ComMsg.confirm(NLS.CGT.M035) == "1") {
//						//석차 부여
//						moPage.doSaveCgtRnk();
//					} else {
//						//취소하였습니다.
//						Common.setMsgStatus(NLS.INF.M022);
//					}	
//				}else{
//					//석차 부여
//					moPage.doSaveCgtRnk();
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
		
		// 해당 학년도, 학기에 졸업석차부여 작업을 이미 처리했는지 확인
		var strCheckCgtRnk = util.DataMap.getValue(app, "dmResList", "strCheckCgtRnk");
		if(strCheckCgtRnk  == "Y"){
			//이미 졸업석차부여한 자료가 존재합니다. 이전 자료가 삭제됩니다. 재작업하시겠습니까?
			if (util.Msg.confirm("NLS-CGT-M035") ) {
				//석차 부여
				doSaveCgtRnk();
			} else {
				//취소하였습니다.
				util.Msg.notify(app, "NLS.INF.M022");
				util.removeCover(app);
				return;
			}	
		}else{
			//석차 부여
			doSaveCgtRnk();
		}	
		
	};
	
	/**
	 * @desc 석차부여 호출 함수
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-05-17
	 */
	function doSaveCgtRnk() { 
		
		//strCommand: save 
		util.Submit.send(app, "subSave", function(pbSuccess){
			if(pbSuccess){
				//처리건수
				var strProcCnt = util.DataMap.getValue(app, "dmResList", "strProcCnt");
				
				// @명의 석차부여가 완료되었습니다.
				util.Msg.notify(app, "NLS.CGT.M036", [strProcCnt]);
				util.Msg.alert("NLS-CGT-M036", [strProcCnt]);
			}else{
				 util.Msg.notify(app, "null");
			}
			
			util.removeCover(app);
		}); 	
	};
	
	return moPage;
};

