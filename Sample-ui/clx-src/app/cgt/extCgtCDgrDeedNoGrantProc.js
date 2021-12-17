//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCgtCDgrDeedNoGrantProc.xtm"/>


var extCgtCDgrDeedNoGrantProc = function() {
		
	var moPage = new Page();
	var moPObject = new PObject();
		
	/**
	 * @desc  Header Import onLoad
	 * @return void
	 * @author Aeyoung Lee 2016-07-07
	 */
	moPage.onLoadImportDone_ImpTitle = function() {		
		doHeaderOnLoad();
	};
	
	/**
	 * @desc 온로드 실행
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-07-07
	 */
	moPage.onModelConstructDone_ExtCgtCDgrDeedNoGrantProc = function() {
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){		
			if(pbSuccess) {	
				util.Control.redraw(app, ["cbbSchYear","cbbSmt"]);
				
				// 졸업학년도 학기를 기본 설정
				util.Control.setValue(app, "cbbSchYear", util.DataMap.getValue(app, "dmResOnLoad", "strDefSchYearRcd"));
				util.Control.setValue(app, "cbbSmt", util.DataMap.getValue(app, "dmResOnLoad", "strDefSmtRcd"));
				
				// 시작학위번호, 시작증서번호 셋팅
				util.Control.setValue(app, "ipbStartDgrNo", util.DataMap.getValue(app, "dmDgrNoAndDeedNoInfo", "START_DGR_NO"));
				util.Control.setValue(app, "ipbStartDeedNo", util.DataMap.getValue(app, "dmDgrNoAndDeedNoInfo", "START_DEED_NO"));
				
				// 시작학위번호(심화)
				util.Control.setValue(app, "ipbStartShDgrNo", util.DataMap.getValue(app, "dmDgrNoAndDeedNoInfo", "START_SH_DGR_NO"));
				
				// 졸업회차(2017.01.11 추가)
				util.Control.setValue(app, "ipbCgtCnt", util.DataMap.getValue(app, "dmDgrNoAndDeedNoInfo", "START_GRDT_CNT"));
				
				util.Control.setEnable(app, false, ["ipbStartDgrNo", "ipbStartDeedNo", "ipbStartShDgrNo"]);
			}
		});
	};
	
	/**
	 * @desc 학년도 콤보 체인지 이벤트
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-07-07
	 */
	moPage.onValueChanged_CbbSchYear = function() {
		doChangeDate();
	};
	
	/**
	 * @desc 학기 콤보 체인지 이벤트
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-07-07
	 */
	moPage.onValueChanged_CbbSmt = function() {
		doChangeDate();
	};
	
	/**
	 * @desc 학년도학기 변경 이벤트 - 기준 시작일자, 종료일자 셋팅
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-07-07
	 */
	function doChangeDate() {
		util.Control.reset(app, ["ipbStartDgrNo", "ipbStartDeedNo", "ipbStartShDgrNo"]);
		
		//strCommand: startVal 
		util.Submit.send(app, "subStartVal", function(){
			// 시작학위번호, 시작증서번호 셋팅
			util.Control.setValue(app, "ipbStartDgrNo", util.DataMap.getValue(app, "dmDgrNoAndDeedNoInfo", "START_DGR_NO"));
			util.Control.setValue(app, "ipbStartDeedNo", util.DataMap.getValue(app, "dmDgrNoAndDeedNoInfo", "START_DEED_NO"));
			util.Control.setValue(app, "ipbStartShDgrNo", util.DataMap.getValue(app, "dmDgrNoAndDeedNoInfo", "START_SH_DGR_NO"));
			// 졸업회차(2017.01.11 추가)
			util.Control.setValue(app, "ipbCgtCnt", util.DataMap.getValue(app, "dmDgrNoAndDeedNoInfo", "START_GRDT_CNT"));
		}); 
	};
	
	
	/**
	 * @desc 학위/증서번호 부여 클릭 이벤트
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-07-07
	 */
	moPage.onClick_BtnSave = function(psStep) { 
		
		util.Msg.notify(app, "null");
		
		if(!util.validate(app, ["cbbSchYear", "cbbSmt", "ipbStartDgrNo", "ipbStartShDgrNo", "ipbStartDeedNo", "ipbCgtCnt"])) return;
		
		// 2016.10.18 커버를 씌우기 위해 사전체크는 동기로 변경 
//		// 사전체크
//		ExtSubmission.sendEx("subPreCheck", "preCheck", function(pbSuccess){
//			if(pbSuccess){
//				// 졸업사정결과 데이터 유무 여부
//				var vsCheckCgtDgrDeedNo = ExtInstance.getValue("/root/resList/strCheckCgtDgrDeedNo");
//				if(vsCheckCgtDgrDeedNo  == "Y"){
//					//증서/학위번호가 부여되었습니다. 재작업하시겠습니까?
//					if (ComMsg.confirm(NLS.CGT.M033) == "1") {
//						//학위/증서번호 부여
//						moPage.doSaveCgtDgrDeedNo();
//					} else {
//						//취소하였습니다.
//						Common.setMsgStatus(NLS.INF.M022);
//					}	
//				}else{
//					//학위/증서번호 부여
//					moPage.doSaveCgtDgrDeedNo();
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
			
		// 졸업사정결과 데이터 유무 여부
		var vsCheckCgtDgrDeedNo = util.DataMap.getValue(app, "dmResList", "strCheckCgtDgrDeedNo");
		if(vsCheckCgtDgrDeedNo  == "Y"){
			//증서/학위번호가 부여되었습니다. 재작업하시겠습니까?
			if (util.Msg.confirm("NLS-CGT-M033") ) {
				//학위/증서번호 부여
				doSaveCgtDgrDeedNo();
			} else {
				//취소하였습니다.
				util.Msg.notify(app, "NLS.INF.M022");
				util.removeCover(app);
				return;
			}	
		}else{
			//학위/증서번호 부여
			doSaveCgtDgrDeedNo();
		}			
	};
	
	/**
	 * @desc 학위/증서번호부여 서브미션 호출 함수
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-05-17
	 */
	function doSaveCgtDgrDeedNo() { 
		
		//strCommand: save 
		util.Submit.send(app, "subSave", function(pbSuccess){
			if(pbSuccess){
				//처리건수
				var strProcCnt = util.DataMap.getValue(app, "dmResList", "strProcCnt");
				
				util.Msg.notify(app, "NLS.CGT.M034", [strProcCnt]);
				util.Msg.alert("NLS-CGT-M034", [strProcCnt]);
			}else{
				util.Msg.notify(app, "null");
			}	
			
			util.removeCover(app);
		}); 	
	};
	
	return moPage;
};

