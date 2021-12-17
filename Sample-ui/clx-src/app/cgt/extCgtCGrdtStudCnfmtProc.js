//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCgtCGrdtStudCnfmtProc.xtm"/>


var extCgtCGrdtStudCnfmtProc = function() {
		
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
	moPage.onModelConstructDone_ExtCgtCGrdtCnfmtProc = function() {
		
		//리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["rptError"]);
		
		//오루내역 리피트 visible = false
		util.Control.setVisible(app, false, ["grpData"]);
		
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){		
			if(pbSuccess) {	
				util.Control.redraw(app, ["cbbSchYear","cbbSmt"]);
				
				// 졸업학년도 학기를 기본 설정
				util.Control.setValue(app, "cbbSchYear", util.DataMap.getValue(app, "dmResOnLoad", "strDefSchYearRcd"));
				util.Control.setValue(app, "cbbSmt", util.DataMap.getValue(app, "dmResOnLoad", "strDefSmtRcd"));
				
				// 졸업일자 셋팅
				util.Control.setValue(app, "dipCgtDate", util.DataMap.getValue(app, "dmResOnLoad", "strDefCgtDt"));
			}
		});
	};
	
	/**
	 * @desc 졸업학년도 변경 이벤트
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-08-05
	 */
	moPage.onValueChanged_CbbSchYear = function() {
		doChangeDate();
	};
	
	/**
	 * @desc 졸업학기 변경 이벤트
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-08-05
	 */
	moPage.onValueChanged_CbbSmt = function() {
		doChangeDate();
	};
	
	/**
	 * @desc 졸업학년도/학기 변경 시 졸업일자 셋팅
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-08-05
	 */
	function doChangeDate() {
		
		//strCommand: getKeyDate 
		util.Submit.send(app, "subDate", function(pbSuccess){		
			if(pbSuccess) {
				// 졸업일자 셋팅
				util.Control.setValue(app, "dipCgtDate", util.DataMap.getValue(app, "dmResOnLoad", "strDefCgtDt"));	
			}
		});
	};	
	
	/**
	 * @desc 졸업확정 클릭 이벤트
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-07-21
	 */
	moPage.onClick_BtnSave = function() { 
	
		util.Msg.notify(app, "null");	
		//오루내역 리피트 visible = false
		util.Control.setVisible(app, false, ["grpData"]);
		
		var vsSchYearSelIdx = util.SelectCtl.getSelectedIndex(app, "cbbSchYear");
		var vsSmtSelIdx = util.SelectCtl.getSelectedIndex(app, "cbbSmt");
		var vsYearSmtNm = util.SelectCtl.getLabel(app, "cbbSchYear", vsSchYearSelIdx) + " " + util.SelectCtl.getLabel(app, "cbbSmt", vsSmtSelIdx);
		
		if(!util.validate(app, ["cbbSchYear", "cbbSmt", "dipCgtDate", "dipAltDate"]))return 
	
		//처리 후 취소가 불가능합니다. @ 졸업확정처리를 진행하시겠습니까? 
		if (!util.Msg.confirm("NLS-CGT-M038", [vsYearSmtNm]) ) {
			return;
		} 
		
		// 2016.10.14 배치처리전 커버페이지 씌우는 로직추가
		util.coverPage(app);
		
		//졸업확정 서브미션
		//strCommand: save 
		util.Submit.send(app, "subSave", function(pbSuccess){
			if(pbSuccess){
				
				var vnIsErr = util.DataSet.getRowCount(app, "dsListErrRtn");
				//처리건수
				var strProcCnt = util.DataMap.getValue(app, "dmResList", "strProcCnt");
				
				// 에러가 없는 경우
				if(vnIsErr == 0){
					// @명의 졸업확정처리가 완료되었습니다.
					util.Msg.notify(app, "NLS.CGT.M039", [strProcCnt, ""]);
					util.Msg.alert("NLS-CGT-M039", [strProcCnt,""]);	
					
				}else{
					
					// @명의 졸업확정처리가 완료되었습니다.오류내역이 존재하오니 오류학생목록을 확인하세요.
					util.Msg.notify(app, "NLS.CGT.M039", [strProcCnt, ""]);
					util.Msg.alert("NLS-CGT-M039", [strProcCnt, "\n" + NLS.CGT.M040]);	
					
					//오루내역 리피트 visible
					util.Control.setVisible(app, true, ["grpData"]);
					util.Control.redraw(app, "grdError");
				}	
				
			}else{
				 util.Msg.notify(app, "null");
			}	
			
			util.removeCover(app);
		}); 	
		
	};
	
	return moPage;
};

