
//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./stdCrsCRefundCii.xtm"/>


var stdCrsCRefundCii = function() {
		
	var moPage = new Page();
	var moPObject = new PObject();
		
	
	/**
	 * @desc  Header Import onLoad
	 * @return void
	 * @author Aeyoung Lee 2016-02-01
	 */
	moPage.onLoadImportDone_ImpTitle = function() {		
		doHeaderOnLoad();
	};
	
	/**
	 * @desc 온로드 실행
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-02-01
	 */
	moPage.onLoad = function() {
		//리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init("rptCrsRefundCii");
		//검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grpData"]);
		
		doOnLoad();
		util.Control.setFocus(app, "cbbProcRsnRcd");
	};
	
	/**
	 * @desc 조회 실행
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-02-01
	 */
	moPage.onClick_BtnSearch = function() {
		//작업영역 리피트 변경 내역 체크
		if(util.Grid.isModified(app, "", "CRM")){
			return false;
		}	
		
		doList(function(pbSuccess){
			if(pbSuccess) util.Msg.notify(app, "NLS.INF.M024");
		});	
	};
	
	/**
	 * @desc 신규 click event
	 * @return void
	 * @author Aeyoung Lee 2016-02-01
	 */		
	moPage.onClick_BtnNew = function() {
		doSetNewRow();
	};
	
	/**
	 * @desc 삭제 click event
	 * @return void
	 * @author Aeyoung Lee 2016-02-01
	 */	
	moPage.onClick_BtnDel = function() {
		doDelRow();
	};
	
	/**
	 * @desc 작업취소 click event
	 * @return void
	 * @author Aeyoung Lee 2016-02-01
	 */	
	moPage.onClick_BtnRestore = function() {
		util.Grid.restoreRow(app, "grdCrsRefundCii");
	};
	
	/**
	 * @desc 작업저장 click event
	 * @return void
	 * @author Aeyoung Lee 2016-02-01
	 */	
	moPage.onClick_BtnSave = function() {
		doSave();
		
	};
	
	/**
	 * @desc 온로드 실행
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 02. 01.
	 */
	function doOnLoad(){
		doOnLoadImpNS("CRS");
		// 서브미션 실행 (실패시 cover page)
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, ["cbbCrsMenuItem", "cbbProcRsnRcd"]);
				util.SelectCtl.selectItem(app, "cbbProcRsnRcd", 0);
				util.SelectCtl.selectItem(app, "cbbCrsMenuItem", 0);
				util.Control.redraw(app, "grdCrsRefundCii");
			}
		}, true);
	};
	
	
	/**
	 * @desc  등록금환불기준 목록을 조회한다.
	 * @param {Function} poCallBackFunc 콜백정의
	 * @return void
	 * @author Aeyoung Lee 2016-02-01
	 */
	function doList(poCallBackFunc) {
		
		
		if(!util.validate(app, ["cbbProcRsnRcd", "cbbYearImpNS", "cbbSmtImpNS", "cbbCrsMenuItem"])){
			return false;
		}
		
		util.DataMap.setValue(app, "dmReqKey", "strSchYearRcd", util.Control.getValue(app, "cbbYearImpNS"));
		util.DataMap.setValue(app, "dmReqKey", "strSmtRcd", util.Control.getValue(app, "cbbSmtImpNS"));
		util.DataMap.setValue(app, "dmReqKey", "YEAR", util.Control.getValue(app, "cbbYearImpNS"));
		util.DataMap.setValue(app, "dmReqKey", "SMT", util.Control.getValue(app, "cbbSmtImpNS"));
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdCrsRefundCii");	
				
				if(util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
			}
		}); 
	};
	
	/**
	 * @desc  신규로우를 추가한다.
	 * @return void
	 * @author Aeyoung Lee 2016-02-01
	 */
	function doSetNewRow() {
		//해당 리피트 insertRow 후 편집 시작할 컬럼 지정		
		var voNewRow = util.Grid.insertRow(app, "grdCrsRefundCii", "rdDipLsnStDt");	
		
		var vsProcRsnRcd = util.DataMap.getValue(app, "dmReqKey", "strProcRsnCd");
		var vsItemCd     = util.DataMap.getValue(app, "dmReqKey", "strItemCd");
		var vsSchYearRcd = util.DataMap.getValue(app, "dmReqKey", "strSchYearRcd");
		var vsSmtRcd     = util.DataMap.getValue(app, "dmReqKey", "strSmtRcd");
		
		util.Grid.setCellValue(app, "grdCrsRefundCii", "PROC_RSN_RCD", vsProcRsnRcd, voNewRow);
		util.Grid.setCellValue(app, "grdCrsRefundCii", "ITEM_CD"     , vsItemCd, voNewRow);
		util.Grid.setCellValue(app, "grdCrsRefundCii", "SCH_YEAR_RCD", vsSchYearRcd, voNewRow);
		util.Grid.setCellValue(app, "grdCrsRefundCii", "SMT_RCD"     , vsSmtRcd, voNewRow);
	};
	
	/**
	 * @desc  현재 로우를 삭제한다.
	 * @return void
	 * @author Aeyoung Lee 2016-02-01
	 */
	function doDelRow() {
		
		if(!util.Grid.getIndex(app, "grdCrsRefundCii")){
			util.Msg.alert("NLS-MSG-WRN-M004(NLS-SCR-RFDSTDLST"));  
			return;		
		}
		
		util.Grid.deleteRow(app, "grdCrsRefundCii");
	};
	
	/**
	 * @desc  강의실목록 리피트 저장 submission 실행
	 * @return void
	 * @author Aeyoung Lee 2016-02-01
	 */
	function doSave() {
		
		// 리피터 변경사항 체크
		if(!util.Grid.isModified(app, ["grdCrsRefundCii"], "MSG")){
			return false;
		}
		
		//리피트 validation check
		if(!util.validate(app, "grdCrsRefundCii")) return false;
		
		var vbSaved = false;
		
		if(!doCheckDate()){
			//strCommand: save 
			util.Submit.send(app, "subSave", function(pbSuccess){
				if(pbSuccess){
					doList(function(pbListSuccess){
						if(pbListSuccess) util.Msg.notify(app, "NLS.INF.M025");
					});
				}
			});
		}else{
			util.Msg.alert("NLS-CRS-M016");
		}	
		
		return vbSaved;
	};
	
	/**
	 * @desc  수업일자가 겹쳐지는체 체크
	 * @return void
	 * @author Aeyoung Lee 2016-02-01
	 */
	function doCheckDate() {
		var vsMLsnStDt, vsMLsnEndDt, vsSLsnStDt, vsSLsnEndDt;
		var vsMRowStatus, vsSRowStatus;
		var vnRpnCnt = util.Grid.getRowCount(app, "grdCrsRefundCii");
		
		for(var k = 1, l = vnRpnCnt+1; k < l; k++){
			
			vsMLsnStDt = util.Grid.getCellValue(app, "grdCrsRefundCii", "LSN_ST_DT", k);
			vsMLsnEndDt = util.Grid.getCellValue(app, "grdCrsRefundCii", "LSN_END_DT", k);
			
			vsMRowStatus = util.Grid.getRowState(app, "grdCrsRefundCii", k);
			
			if(vsMRowStatus == "delete") continue;
			for(var i = 1, j = vnRpnCnt+1; i < j; i++){
				
				if(i == k) continue;
				vsSRowStatus = util.Grid.getRowState(app, "grdCrsRefundCii", i);
				
				if(vsSRowStatus == "delete") continue;
				vsSLsnStDt = util.Grid.getCellValue(app, "grdCrsRefundCii", "LSN_ST_DT", i);
				vsSLsnEndDt = util.Grid.getCellValue(app, "grdCrsRefundCii", "LSN_END_DT", i);
				if(vsSLsnStDt.length == 0 || vsSLsnEndDt.length == 0) continue; 
				if(vsMLsnStDt >= vsSLsnStDt && vsMLsnStDt <= vsSLsnEndDt) return true;
				if(vsMLsnEndDt >= vsSLsnStDt && vsMLsnEndDt <= vsSLsnEndDt) return true;
				if(vsMLsnStDt != 0 && vsMLsnEndDt != 0){		
					if(vsMLsnStDt >= vsSLsnStDt && vsMLsnEndDt <= vsSLsnEndDt) return true;	
					if(vsSLsnStDt > vsMLsnStDt && vsSLsnStDt < vsMLsnEndDt) return true;
				}
			}
		}
		return false;
		
	}
	
	/**
	 * @desc   리피트 수업시작일자 변경 이벤트
	 * @return void
	 * @author Aeyoung Lee 2016-02-01
	 */
	moPage.onValueChanged_RdDipLsnStDt = function() {
		doChkGrxValid("LSN_ST_DT");
	};
	
	/**
	 * @desc   리피트 수업종료일자 변경 이벤트
	 * @return void
	 * @author Aeyoung Lee 2016-02-01
	 */
	moPage.onValueChanged_RdDipLsnEndDt = function() {
		doChkGrxValid("LSN_END_DT");
	};
	
	/**
	 * @desc   리피트 비율분자 변경 이벤트
	 * @return void
	 * @author Aeyoung Lee 2016-02-01
	 */
	moPage.onValueChanged_RdIpbRateNur = function() {
		doChkGrxValid("RATE_NUR");
	};
	
	/**
	 * @desc   리피트 비율분모 변경 이벤트
	 * @return void
	 * @author Aeyoung Lee 2016-02-01
	 */
	moPage.onValueChanged_RdIpbRateDen = function() {
		doChkGrxValid("RATE_DEN");
	};
	
	/**
	 * @desc   그리드의 값이 변경되었을때 각컬럼별 유효성 체크
	 * @return void
	 * @author Aeyoung Lee 2016-02-01
	 */
	function doChkGrxValid(psDiv){
		var vnRowIdx = util.Grid.getIndex(app, "grdCrsRefundCii");
		var vnChkValue = util.Grid.getCellValue(app, "grdCrsRefundCii", psDiv, vnRowIdx)	;
		
		// 비율분자
		if(psDiv == "RATE_NUR"){
			if(vnChkValue.length != 0 && vnChkValue < 0){
				util.Msg.alert("NLS-CRS-M014");	
				util.Grid.setCellValue(app, "grdCrsRefundCii", psDiv, "", vnRowIdx);
				return;
			}	
		}
		// 비율분모
		else if(psDiv == "RATE_DEN"){
			if(vnChkValue.length != 0 && vnChkValue < 0){
				util.Msg.alert("NLS-CRS-M006(NLS-SCR-DEN"));
				util.Grid.setCellValue(app, "grdCrsRefundCii", psDiv, "", vnRowIdx);
				return;
			}	
		}	
		
		switch(psDiv){
			case "RATE_NUR" :
			case "RATE_DEN" :
				var vnRateNur = Number(util.Grid.getCellValue(app, "grdCrsRefundCii", "RATE_NUR", vnRowIdx));
				var vnRateDen = Number(util.Grid.getCellValue(app, "grdCrsRefundCii", "RATE_DEN", vnRowIdx));
				if(psDiv == "RATE_DEN" && vnChkValue.length != 0 && vnChkValue < 1){
					util.Msg.alert("NLS-CRS-M009");
					util.Grid.setCellValue(app, "grdCrsRefundCii", psDiv, "", vnRowIdx);
				}else if(vnRateDen != "" && vnRateDen < vnRateNur){
					util.Msg.alert("NLS-CRS-M010");
					util.Grid.setCellValue(app, "grdCrsRefundCii", psDiv, "", vnRowIdx);
				}
				break;
			case "LSN_ST_DT" :
			case "LSN_END_DT" :
				var vnStDt = util.Grid.getCellValue(app, "grdCrsRefundCii", "LSN_ST_DT", vnRowIdx);
				var vnEndDt = util.Grid.getCellValue(app, "grdCrsRefundCii", "LSN_END_DT", vnRowIdx);
				if(vnStDt == "" || vnEndDt == "") break;
				if(vnStDt > vnEndDt){
					util.Msg.alert("NLS-CRS-M008");
					util.Grid.setCellValue(app, "grdCrsRefundCii", psDiv, "", vnRowIdx);
					break;
				}
				break;
			default :
			break;
		}	
			
	};	
	
	/**
	 * @desc   리피트 패널 체크
	 * @return void
	 * @author Aeyoung Lee 2016-02-02
	 */	
	moPage.onValueChanged_RhCkbSelect = function() {
		// 리피트 패널 설정
//TO-BE: <ExtRepeat.selectedAllPanel> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.selectedAllPanel("rhCkbSelect");
	};
	return moPage;
};

