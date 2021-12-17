//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
///<xtmlink path="./extCsrCMstPromBatch.xtm"/>

var extCsrCMstPromBatch = function() {

	var moPage = new Page();
	//임포트용 데이터 통신 오브젝트
	var moPObject = new PObject();

	/**
	 * @desc  Header Import onLoad
	 * @return void
	 * @author Choi In Seong 2016.05.13
     */
	moPage.onLoadImportDone_ImpTitle = function() {
		doHeaderOnLoad();
	};
				
	/**
	 * @desc 화면 온로드
	 * @param  
	 * @return 
	 * @author Choi In Seong 2016.05.13
	 */
	moPage.onModelConstructDone_extCsrCMstPromBatch = function() {
		//리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["rptSaTargetCnt"]);
		
		//서브미션 실행 (실패시 cover page)
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				
				util.DataMap.setValue(app, "dmReqList", "strSchYearRcd", util.DataMap.getValue(app, "dmResOnLoad", "strSchYearRcd"));
				util.DataMap.setValue(app, "dmReqList", "strSmtRcd", util.DataMap.getValue(app, "dmResOnLoad", "strSmtRcd"));
				
				util.Control.redraw(app, ["rptSaTargetCnt", "cbbSchYearRcd", "cbbSmtRcd"]);
				
				doList(function(pbSuccess) {
				// 조회 : "조회되었습니다." header 메세지 표시
					if(pbSuccess) {
						util.Msg.notify(app, "NLS.INF.M024");
					}
				});
			}
		});
	}

	/**
	 * @desc 학과별 대상인원수조회
	 * @param 
	 * @return 
	 * @author Choi In Seong 2016.05.13
	 */
	function doList(poCallBackFunc) {
		//strCommand: list 
		util.Submit.send(app, "subList",  function(pbSuccess) {
			if(pbSuccess){
				//rebuild
				util.Control.redraw(app, ["rptSaTargetCnt"]);
				var vnRowCnt = util.DataSet.getRowCount(app, "dsRptSaTargetCnt");
				var vsTotalCnt = 0;
				for(var i =1 ; i<=vnRowCnt ; i++){
					vsTotalCnt = vsTotalCnt + Number(util.Grid.getCellValue(app, "grdSaTargetCnt", "ATTE_STUD_CNT",i));
				}
				util.Control.setValue(app, "optTargetCnt", vsTotalCnt);
			}
			if(util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
		});
	}

	/**
	 * @desc 일괄진급처리 실행
	 * @param 
	 * @return 
	 * @author Choi In Seong 2016.05.13
	 */
	function doSave(pnStep) {
		if (!pnStep) {
			pnStep = "0";
		}
		
		util.DataMap.setValue(app, "dmReqList", "iStepNo", pnStep);
		
		//strCommand: save 
		util.Submit.send(app, "subSave", function(pbSuccess) {
			if (pbSuccess) {
				var vsMsg = util.DataMap.getValue(app, "dmResSave", "strMsg");
				if (vsMsg != "") {
					// @1\n  계속하시겠습니까?
					if (util.Msg.confirm("NLS-CRM-M034", [vsMsg]) ) {
						var vnStep = util.DataMap.getValue(app, "dmResSave", "iStepNo");
						return doSave(vnStep);
					} else {
						util.removeCover(app);
						return false;
					}
				} else {
					
					var vnProcCnt = util.DataMap.getValue(app, "dmResSave", "iProcCnt");
					util.Control.setValue(app, "optProcCnt", vnProcCnt);
					util.Msg.notify(app, "NLS.CSR.EXT010", [vnProcCnt]);
					util.removeCover(app);
					return true;
				}
			}else{
				util.removeCover(app);
				return false;
			}
		});
	}

	/**
	 * @desc 일괄진급처리 실행 버튼 클릭
	 * @param 
	 * @return 
	 * @author Choi In Seong 2016.05.13
	 */
	moPage.onClick_BtnSave = function() {
		util.coverPage(app);
		var vsSchYearRcd = util.SelectCtl.getLabel(app, "cbbSchYearRcd", util.SelectCtl.getSelectedIndex(app, "cbbSchYearRcd"));
		var vsSmtRcd = util.SelectCtl.getLabel(app, "cbbSmtRcd", util.SelectCtl.getSelectedIndex(app, "cbbSmtRcd"));
		//진급처리 실행 여부
		if(!util.Msg.confirm("NLS-CRM-EXT004", [vsSchYearRcd, vsSmtRcd]) ){
			util.removeCover(app);
			return false;
		}
		doSave();
	};
	
	/**
	 * @desc 학년도 변경시 조회
	 * @param 
	 * @return 
	 * @author Choi In Seong 2016.05.13
	 */
	moPage.onValueChanged_CbbSchYearRcd = function() {
		doList(function(pbSuccess) {
		// 조회 : "조회되었습니다." header 메세지 표시
			if(pbSuccess) {
				util.Msg.notify(app, "NLS.INF.M024");
			}
		});
	};
	
	/**
	 * @desc 학기변경시 조회
	 * @param 
	 * @return 
	 * @author Choi In Seong 2016.05.13
	 */
	moPage.onValueChanged_CbbSmtRcd = function() {
		doList(function(pbSuccess) {
		// 조회 : "조회되었습니다." header 메세지 표시
			if(pbSuccess) {
				util.Msg.notify(app, "NLS.INF.M024");
			}
		});
	};
	return moPage;
};

