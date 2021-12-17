//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCssCCntiScalScrngProc.xtm"/>


var extCssCCntiScalScrngProc = function() {
		
	var moPage = new Page();
		
	/**
	 * @desc  Header Import onLoad
	 * @return void
	 * @author Aeyoung Lee 2016-12-15
	 */
	moPage.onLoadImportDone_ImpTitle = function() {		
		doHeaderOnLoad();
	};
	
	/**
	 * @desc 온로드 실행
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-12-15
	 */
	moPage.onModelConstructDone_ExtCssCCntiScalScrng = function() {
		// 리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["rptScrngTgt"]);
		// 검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grpData"]);
		
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){		
			if(pbSuccess) {	
				util.Control.redraw(app, ["cbbSchYear","cbbSmt"]);
			}
		});
	};
	
	/**
	 * @desc 조회버튼 클릭 이벤트
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-12-15
	 */
	moPage.onClick_BtnSearch = function() {
		// 작업영역 리피트 변경 내역 체크
		if(util.Grid.isModified(app, "", "CRM")){
			return false;
		}
		
		// 조회조건 필수 체크
		if(!util.validate(app, ["grpSearch"])){
			return false;
		}
		
		// 조회
		doList(function(pbSuccess) {
			if (pbSuccess){
				// "조회되었습니다."
				util.Msg.notify(app, "NLS.INF.M024");					
			}
		});
		
	};
	
	/**
	 * @desc 연속장학생선발대상 목록
	 * @param poCallBackFunc 콜백정의
	 * @return 
	 * @author Aeyoung Lee 2016-12-15
	 */
	function doList(poCallBackFunc) {
		
		//strCommand: doTgtList 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdScrngTgt");
			} 
			
			// 조회 후 콜백함수 수행
			if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
		});
	};
	
	/**
	 * @desc 입학장학금 변경 이벤트
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-12-15
	 */
	moPage.onValueChanged_RdIpbEntScalAmt = function() {
		// 장학금액 셋팅
		doSetScalAmt();
	};
	
	/**
	 * @desc 수업장학금 변경 이벤트
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-12-15
	 */
	moPage.onValueChanged_RdIpbTutScalAmt = function() {
		// 장학금액 셋팅
		doSetScalAmt();
	};
	
	/**
	 * @desc 입학장학금, 수업장학금 조정가능하게 하여 두개의 합을 장학금액에 셋팅한다.
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-12-15
	 */
	function doSetScalAmt() {
		
		var vnEntScalAMt = Number(util.Grid.getCellValue(app, "grdScrngTgt", "ENT_SCAL_AMT"));
		var vnTutScalAMt = Number(util.Grid.getCellValue(app, "grdScrngTgt", "TUT_SCAL_AMT"));
		
		util.Grid.setCellValue(app, "grdScrngTgt", "SCAL_AMT", vnEntScalAMt + vnTutScalAMt);
	};
	
	/**
	 * @desc 실행버튼 클릭 이벤트
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-12-15
	 */
	moPage.onClick_BtnSaveRun = function() { 
		
		// 연속장학생선발대상 목록 선택 여부 체크
		var vnChekNodeLength = ExtInstance.getNodeListLength("/root/resList/rptScrngTgt/row[child::DEL_CKB='Y']");
		if (vnChekNodeLength <= 0 ) {
			// "@(을)를 선택해주세요" 메시지 출력
			util.Msg.alert("NLS-INF-M045", [util.Grid.getTitle(app, "grdScrngTgtScrngTgt")]);
			return false;
		}
		
		// 리피트 validation check
		if(!util.validate(app, "grdScrngTgt")) return false;
		
		util.Grid.setRowStateAll(app, "grdScrngTgt", cpr.data.tabledata.RowState.UNCHANGED);
		var voPanelChk = moPage.doGetSelRowIdx();
		
		for(var i = 0; i < voPanelChk.length; i++) {
			var vnRow = voPanelChk[i];
			var vsScalStudYn = util.Grid.getCellValue(app, "grdScrngTgt", "SCAL_STUD_YN", vnRow);
			var vsChkErrDesc = util.Grid.getCellValue(app, "grdScrngTgt", "CHK_ERR_DESC", vnRow);
			
			// 기선발 자료인지 체크
			if(vsScalStudYn == "Y"){
				// @번째 기선발된 연속장학금내역이 존재하여 처리불가합니다.
				util.Msg.alert("NLS-CSS-M110", [vnRow]);	
				util.Grid.selectRow(app, "grdScrngTgt", vnRow);
				util.Grid.setRowStateAll(app, "grdScrngTgt", cpr.data.tabledata.RowState.UNCHANGED);
				return;
			}	
			
			// 장학금유효성 체크 내역이 존재하는지 체크
			if(!ValueUtil.isNull(vsChkErrDesc)){
				// @번째 장학금체크내역이 존재하여 처리불가합니다.
				util.Msg.alert("NLS-CSS-M111", [vnRow]);	
				util.Grid.selectRow(app, "grdScrngTgt", vnRow);
				util.Grid.setRowStateAll(app, "grdScrngTgt", cpr.data.tabledata.RowState.UNCHANGED);
				return;
			}	
			
			util.Grid.setRowState(app, "grdScrngTgt", cpr.data.tabledata.RowState.UPDATED, vnRow);
		}  
		
		// 배치전 커버페이지 적용
		util.coverPage(app);
		
		// 연속장학생사정처리 서브미션
		//strCommand: run 
		util.Submit.send(app, "subRun", function(pbSuccess){
			if(pbSuccess){
				
				doList(function(pbListSuccess){	
					if(pbListSuccess){		
						//산출결과를 요약하여 뿌려줌
						var vsInsertStudCnt = util.DataMap.getValue(app, "dmResList", "strRltStudCnt");
						
						// @건 선발되었습니다.
						util.Msg.notify(app, "NLS.CSS.M104");
						util.Msg.alert("NLS-CSS-M105", [vsInsertStudCnt]);
						
						util.removeCover(app);
					}
				});
				
			}else{
				util.Grid.setRowStateAll(app, "grdScrngTgt", cpr.data.tabledata.RowState.UNCHANGED);	
				util.removeCover(app);
			}	
			
		}); 	
		
	};
	
	/**
	 * @desc 연속장학생선발대상 목록에 체크된 리피트 인덱스 배열 리턴
	 * @param 
	 * @return Array 리피트에 체크된 인덱스 배열
	 * @author Aeyoung Lee 2016-12-15
	 */
	function doGetSelRowIdx() {
		
		var vsPanelCheckIdx = util.Grid.getCheckOrSelectedRowIndex(app, "grdScrngTgt");
		var voPanelChk;
		
		if(String(vsPanelCheckIdx).indexOf(",") != -1){
			voPanelChk = vsPanelCheckIdx.split(",");
		}else{
			voPanelChk = new Array();
			voPanelChk[0] = vsPanelCheckIdx;
		}	
		
		return voPanelChk;
	};
	
	/**
	 * @desc 작업취소버튼 클릭 이벤트
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-12-15
	 */
	moPage.onClick_BtnRestore = function() {
		util.Grid.restoreRow(app, "grdScrngTgt");
	}
	return moPage;
};

