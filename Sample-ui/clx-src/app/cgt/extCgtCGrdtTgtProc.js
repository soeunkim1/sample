//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCgtCGrdtTgtProc.xtm"/>


var extCgtCGrdtTgtProc = function() {
		
	var moPage = new Page();
		
	/**
	 * @desc  Header Import onLoad
	 * @return void
	 * @author Aeyoung Lee 2016-07-04
	 */
	moPage.onLoadImportDone_ImpTitle = function() {		
		doHeaderOnLoad();
	};
	
	/**
	 * @desc 온로드 실행
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-07-04
	 */
	moPage.onModelConstructDone_ExtCgtCGrdtTgtProc = function() {
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){		
			if(pbSuccess) {	
				util.Control.redraw(app, ["cbbSchYear","cbbSmt"]);
				
				// 졸업학년도 학기를 기본 설정
				util.Control.setValue(app, "cbbSchYear", util.DataMap.getValue(app, "dmCgtSchYearSmtRcdInfo", "SCH_YEAR_RCD"));
				util.Control.setValue(app, "cbbSmt", util.DataMap.getValue(app, "dmCgtSchYearSmtRcdInfo", "SMT_RCD"));
			}
		});
	};
	
	/**
	 * @desc 졸업대상자 선정 클릭 이벤트
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-07-04
	 */
	moPage.onClick_BtnSave = function(psStep) { 
		
		util.Msg.notify(app, "null");
		
		if(!util.validate(app, ["cbbSchYear", "cbbSmt"]))return 
		
		if(ValueUtil.isNull(psStep)){
			psStep = "0";
		}
		
		util.DataMap.setValue(app, "dmReqKey", "strStep", psStep);
		
		// 2016.10.14 배치처리전 커버페이지 씌우는 로직추가
		util.coverPage(app);
		
		//strCommand: save 
		util.Submit.send(app, "subSave", function(pbSuccess){
			if(pbSuccess){
				
				// 2017.01.11 확정처리전 데이터 있는지 확인하여 확정전데이터 삭제로직 추가
				var vsMsg = util.DataMap.getValue(app, "dmResList", "strMsg");
				if(vsMsg == "GRDT" || vsMsg == "ADT" || vsMsg == "TGT"){
					
					var vsCfmMsgCd = "";
					
					if(vsMsg == "GRDT"){
						//이미 학위증서번호가 부여되었습니다. 진행하시면 사정결과, 학위증서번호 및 졸업석차가 삭제됩니다. 진행하시겠습니까?
						vsCfmMsgCd = NLS.CRM.M104;
					}else if(vsMsg == "ADT"){
						//이미 졸업사정결과가 존재합니다. 진행하시면 졸업사정결과가 삭제됩니다. 진행하시겠습니까?
						vsCfmMsgCd = NLS.CRM.M093;
					}else if(vsMsg == "TGT"){
						//이미 졸업대상자를 생성하였습니다. 재작업 하시겠습니까?
						vsCfmMsgCd = NLS.CRM.M094;
					}	
					
					if (util.Msg.confirm("NLS-CRM-vsCfmMsgCd") ) {
						var vsStep = util.DataMap.getValue(app, "dmResList", "strStep");
						return moPage.onClick_BtnSave(vsStep);
					} else {
						util.removeCover(app);
						return false;
					}
					
				}else{
					// 처리건수
					var vnProcCnt = util.DataMap.getValue(app, "dmResList", "iProcCnt");
					
					util.Msg.notify(app, "NLS.CGT.M027", [vnProcCnt]);
					util.Msg.alert("NLS-CGT-M027", [vnProcCnt]);
				}	
			}else{
				util.Msg.notify(app, "null");
			}	
			
			util.removeCover(app);
		});
	};
	
	return moPage;
};

