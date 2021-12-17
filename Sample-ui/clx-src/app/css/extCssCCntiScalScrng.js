//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCssCCntiScalScrng.xtm"/>


var extCssCCntiScalScrng = function() {
		
	var moPage = new Page();
		
	/**
	 * @desc  Header Import onLoad
	 * @return void
	 * @author Aeyoung Lee 2016-05-17
	 */
	moPage.onLoadImportDone_ImpTitle = function() {		
		doHeaderOnLoad();
	};
	
	/**
	 * @desc 온로드 실행
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-05-17
	 */
	moPage.onModelConstructDone_ExtCssCCntiScalScrng = function() {
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
	 * @author Aeyoung Lee 2016-05-17
	 */
	moPage.onValueChanged_CbbYear = function() {
		doChangeDate();
	};
	
	/**
	 * @desc 학기 콤보 체인지 이벤트
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-05-17
	 */
	moPage.onValueChanged_CbbSmt = function() {
		doChangeDate();
	};
	
	/**
	 * @desc 학년도학기 변경 이벤트 - 기준 시작일자, 종료일자 셋팅
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-05-17
	 */
	function doChangeDate() {
		util.DataMap.setValue(app, "dmReqKey", "ST_DT", "");
		util.DataMap.setValue(app, "dmReqKey", "END_DT", "");
		ExtSubmission.sendEx("subDate", "date"); 
	};
	
	/**
	 * @desc 실행버튼 클릭 이벤트
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-05-17
	 */
	moPage.onClick_BtnSaveRun = function() { 
		
		util.Msg.notify(app, "null");
		
		if(!util.validate(app, ["cbbSchYear", "cbbSmt"])) return;
		
		// 2016.10.14 커버를 씌우기 위해 사전체크는 동기로 변경 
//		ExtSubmission.sendEx("subChk", "doCheck", function(pbSuccess){
//			if(pbSuccess){
//				var vsConfirm = ExtInstance.getValue("/root/resList/strConfirm");
//				if(vsConfirm == "Y"){
//					//이미 해당 장학금선발자료가 존재합니다. 모두 삭제하고 다시 작업하시겠습니까?
//					if (ComMsg.confirm(NLS.CSS.M095) == "1") {
//						//연속장학생 일괄사정처리 수행
//						moPage.doRunCntiScalScrng();
//					} else {
//						//취소하였습니다.
//						Common.setMsgStatus(NLS.INF.M022);
//					}	
//				}else{
//					//연속장학생 일괄사정처리 수행
//					moPage.doRunCntiScalScrng();
//				}	
//			}
//			
//			Common.removeCover();
//		}); 
		
		// 배치전 커버페이지 적용
		util.coverPage(app);
		
		// 사전체크
		var vbSuccess = ExtSubmission.sendEx("subChk", "doCheck"); 
		
		if(!vbSuccess){
			util.removeCover(app);
			return;
		}	
		
		var vsConfirm = util.DataMap.getValue(app, "dmResList", "strConfirm");
		if(vsConfirm == "Y"){
			//이미 해당 장학금선발자료가 존재합니다. 모두 삭제하고 다시 작업하시겠습니까?
			if (util.Msg.confirm("NLS-CSS-M095") ) {
				//연속장학생 일괄사정처리 수행
				doRunCntiScalScrng();
			} else {
				//취소하였습니다.
				util.Msg.notify(app, "NLS.INF.M022");
				util.removeCover(app);
				return;
			}	
		}else{
			//연속장학생 일괄사정처리 수행
			doRunCntiScalScrng();
		}	
	};
	
	/**
	 * @desc 실행버튼 클릭 이벤트
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-05-17
	 */
	function doRunCntiScalScrng() { 
		
		//strCommand: run 
		util.Submit.send(app, "subRun", function(pbSuccessRun){
			if(pbSuccessRun){
				//산출결과를 요약하여 뿌려줌
				var vsInsertStudCnt = util.DataMap.getValue(app, "dmResList", "strRltStudCnt");
				
				util.Msg.notify(app, "NLS.CSS.M104");
				util.Msg.alert("NLS-CSS-M105", [vsInsertStudCnt]);
			}	
			
			util.removeCover(app);
		}); 	
	};
	
	return moPage;
};

