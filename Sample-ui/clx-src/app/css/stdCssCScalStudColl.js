//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./stdCssCScalStudColl.xtm"/>

/**
 * 일괄장학생관리
 * @class stdCssCScalStudColl
 * @author Aeyoung Lee 2016. 3. 11
 */
var stdCssCScalStudColl = function() {
	var moPage = new Page();
	var moPObject 	= new PObject();
	
	/**
	 * 장학생(상세)팝업 관련 설정사항
	 */
	moPObject.moScalStudDtlParam = {
		progMode 	: null,
	  	studId   	: null,
	  	schYearRcd  : null,
	  	smtRcd   	: null,
	  	stDt  		: null,
	  	endDt  		: null,
	  	serialNo  	: null,
		saCd 		: null,
		studNm 		: null
	};
	
	/**
	 * @desc import 헤더 초기화
	 * @param 
	 * @return  void
	 * @author Aeyoung Lee 2016. 3. 15
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		// import 헤더 초기화
		doHeaderOnLoad();
	};
	
	/**
	 * @desc import 조회조건 초기화
	 * @param 
	 * @return  void
	 * @author Aeyoung Lee 2016. 3. 15
	 */
	moPage.onLoadImportDone_ImpCssScalCollSch = function() {
		onLoadCollImp();
	};
	
	/**
	 * @desc OnLoad 이벤트
	 * @param 
	 * @return  void
	 * @author Aeyoung Lee 2016. 3. 15
	 */
	function doOnLoad() {
		// 리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["rptScalStud"]);
		// 검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grpData"]);
		
		// 서브미션 호출
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, ["cbbProcStatRcd", "cbbProcStatRcdChange"]);
				util.Control.redraw(app, ["grdScalStud"]);
				
				util.Control.setFocus(app, "ipbDeptNmImp");
			}
		}, true);
	};
	
	/**
	 * @desc 조회 onClick 이벤트
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 15
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
	 * @desc 장학생목록 조회
	 * @param poCallBackFunc 콜백정의
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 15
	 */
	function doList(poCallBackFunc) {
		
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdScalStud");
			} 
			
			// 조회 후 콜백함수 수행
			if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
		});
	};
	
	/**
	 * @desc 리피트 더블클릭 이벤트
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 15
	 */
	moPage.onDoubleClick_RptScalStud = function() {
		doOpenDtl("UPD");
	};
	
	/**
	 * @desc [btnNew]신규 onClick 이벤트
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 15
	 */
	moPage.onClick_BtnNew = function() {
		doOpenDtl("NEW");
	};
	
	/**
	 * @desc [btnDel]삭제 onClick 이벤트
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 15
	 */
	moPage.onClick_BtnDel = function() {
		doUpdSts("delete");
	};
	
	/**
	 * @desc [btnRestore]작업취소 onClick 이벤트
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 15
	 */
	moPage.onClick_BtnRestore = function() {
		util.Grid.restoreRow(app, "grdScalStud");
	};
	
	/**
	 * @desc [btnSave]작업저장 onClick 이벤트
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 15
	 */
	moPage.onClick_BtnSave = function() {
		doSave();
	};
	
	/**
	 * @desc 장학생 저장
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 15
	 */
	function doSave() {
		// 리피트 변경사항 체크
		if(!util.Grid.isModified(app, ["grdScalStud"], "MSG")){
			return false;
		}
		
		//strCommand: save 
		util.Submit.send(app, "subSave", function(pbSuccess){
			if(pbSuccess){
				doList(function(pbListSuccess) {
					// 조회 : "갱신된 데이터가 조회되었습니다." header 메세지 표시
					if (pbListSuccess) util.Msg.notify(app, "NLS.INF.M025");
				});
			}
		});
	};
	
	/**
	 * @desc [btnStatChg]처리상태변경 onClick 이벤트
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 15
	 */
	moPage.onClick_BtnStatChg = function() {
		// Validation Check
		if(!util.validate(app, ["cbbProcStatRcdChange","dipProcStatRcdDt"])) return false;
		
		doUpdSts("change");
	};
	
	/**
	 * @desc 신규나 변경시 팝업창 호출
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 15
	 */
	function doOpenDtl(psMode) {
		// 리피트 변경사항 체크
		if(util.Grid.isModified(app, ["grdScalStud"], "CRM")){
			return false;
		}
		
		var voScalStudDtlParam = moPObject.moScalStudDtlParam;
		
		// 초기화
		voScalStudDtlParam.progMode = null;
		voScalStudDtlParam.studId = null;
		voScalStudDtlParam.schYearRcd = null;
		voScalStudDtlParam.smtRcd = null;
		voScalStudDtlParam.stDt = null;
		voScalStudDtlParam.endDt = null;
		voScalStudDtlParam.serialNo = null;
		
		// 팝업호출 정보 셋팅
		voScalStudDtlParam.progMode = psMode;
		voScalStudDtlParam.schYearRcd = ExtInstance.getValue("instance('insCssScalCollSch')/root/reqKey/date/YEAR");
		voScalStudDtlParam.smtRcd = ExtInstance.getValue("instance('insCssScalCollSch')/root/reqKey/date/SMT");
		voScalStudDtlParam.stDt = ExtInstance.getValue("instance('insCssScalCollSch')/root/reqKey/date/ST_DT");
		voScalStudDtlParam.endDt = ExtInstance.getValue("instance('insCssScalCollSch')/root/reqKey/date/END_DT");
		
		if(psMode == "UPD"){
			var vnIdx = util.Grid.getIndex(app, "grdScalStud");
			if(util.Grid.getIndex(app, "grdScalStud") == null) return;
			voScalStudDtlParam.serialNo = util.Grid.getCellValue(app, "grdScalStud", "SERIAL_NO", vnIdx);
			voScalStudDtlParam.studId = util.Grid.getCellValue(app, "grdScalStud", "STUD_ID", vnIdx);
			voScalStudDtlParam.saCd = util.Grid.getCellValue(app, "grdScalStud", "SA_CD", vnIdx);
			voScalStudDtlParam.studNm = util.Grid.getCellValue(app, "grdScalStud", "REP_NM", vnIdx);
		}
		
		// 팝업호출
		ExtPopUp.openLayeredPopup("/xtm/css/stdCssCScalStudDtl.xtm", 812, 600);
	};
	
	/**
	 * @desc 처리상태변경, 삭제 클릭시 
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 15
	 */
	function doUpdSts(psProcess) {
		if(!doSetParameter(psProcess)){
			// "@(을)를 선택해주세요" 메시지 출력
			util.Msg.alert("NLS-INF-M045", [NLS.NSCR.SCRSTUDLST]);
			return;
		}
		
		//strCommand: chkScalFeePmnt 
		util.Submit.send(app, "subUpdSts", function(pbSuccess){
			if(pbSuccess){
				// 로직 체크 결과 판별
				if(doChkResult()){
					if(psProcess == "delete"){
						// row 삭제
						util.Grid.deleteRow(app, "grdScalStud");
					}else if(psProcess == "change"){
						// 처리상태 일괄변경
						doStatChange();
					}	
				}	
			}
		});
	};
	
	/**
	 * @desc 그리드의 멀티선택된 row들의 조회조건들을 하나의 스트링으로 만드는 작업
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 15
	 */
	function doSetParameter(psProcess) {
		// 처리상태 변경인 경우에만 체크박스 체크
		if(psProcess == "change"){
			var vnChekNodeLength = ExtInstance.getNodeListLength("/root/resList/rptScalStud/row[child::DEL_CKB='Y']");
			if (vnChekNodeLength <= 0 ) {
				return false;
			}
		}	
		
		var vsPanelCheckIdx = util.Grid.getCheckOrSelectedRowIndex(app, "grdScalStud");
		if(vsPanelCheckIdx == null)  return false;
		
		var voPanelChk;
		
		if(String(vsPanelCheckIdx).indexOf(",") != -1){
			voPanelChk = vsPanelCheckIdx.split(",");
		}else{
			voPanelChk = new Array();
			voPanelChk[0] = vsPanelCheckIdx;
		}		
		
		var vsStudId, vsSerialNo, vsScalFeeCd;
		for(var i = voPanelChk.length - 1; i >= 0; i--) {
			
			if(i == voPanelChk.length - 1){
				vsStudId = util.Grid.getCellValue(app, "grdScalStud", "STUD_ID", voPanelChk[i]);
				vsSerialNo = util.Grid.getCellValue(app, "grdScalStud", "SERIAL_NO", voPanelChk[i]);
				vsScalFeeCd = util.Grid.getCellValue(app, "grdScalStud", "SCAL_FEE_CD", voPanelChk[i]);
			}else{
				vsStudId += "," + util.Grid.getCellValue(app, "grdScalStud", "STUD_ID", voPanelChk[i]);
				vsSerialNo += "," + util.Grid.getCellValue(app, "grdScalStud", "SERIAL_NO", voPanelChk[i]);
				vsScalFeeCd += "," + util.Grid.getCellValue(app, "grdScalStud", "SCAL_FEE_CD", voPanelChk[i]);
			}	
		}  
		
		util.DataMap.setValue(app, "dmReqKey", "strStudIdC", vsStudId);
		util.DataMap.setValue(app, "dmReqKey", "strSerialNo", vsSerialNo);
		util.DataMap.setValue(app, "dmReqKey", "strScalFeeCdC", vsScalFeeCd);
		ExtInstance.setValue("/root/reqKey/strSchYearRcdC", ExtInstance.getValue("instance('insCssScalCollSch')/root/reqKey/date/YEAR"));
		ExtInstance.setValue("/root/reqKey/strSmtRcdC", ExtInstance.getValue("instance('insCssScalCollSch')/root/reqKey/date/SMT"));
		
		return true;
	};	
	
	/**
	 * @desc 처리상태변경이나 삭제시 조건체크하고 체크된 로우의 키값을 셋팅
	 * @param 
	 * @return  void
	 * @author Aeyoung Lee at 2016. 2. 12
	 */
	function doChkResult(){
		var vnNodeLength = util.DataSet.getRowCount(app, "dsUpdList");
		if(vnNodeLength > 0){
			var voNode = ExtInstance.getNodeToObject("/root/resList/updList/row[1]");
			
			if(ValueUtil.isNull(voNode.STUD_ID)) return true;
			
			var vsProcTypeRcd = voNode.PROC_TYPE_RCD;
			var vsProcDt = voNode.PROC_DT;
			var vsDivPayNo = voNode.DIV_PAY_NO;
			var vsPayGrpKey = voNode.PAY_GRP_KEY;
			var vsErrMsg;
			
			if("CH303RCC" == vsProcTypeRcd) vsErrMsg = "A";
			else if("CH303TRN" == vsProcTypeRcd) vsErrMsg = "D";
			else if(!ValueUtil.isNull(vsPayGrpKey)) vsErrMsg = "B";	
			else if(!ValueUtil.isNull(vsDivPayNo)) vsErrMsg = "C";
			
			var vsCond = voNode.STUD_ID + "/" + voNode.SERIAL_NO + "/" + voNode.SCAL_FEE_CD;	
			
			var vnFindIdx = util.Grid.selectRowByCondition(app, "grdScalStud" , "/root/resList/rptScalStud/row/FIND_KEY", "==", vsCond, 0);
			var vnRowIdx = Number(vnFindIdx) + 1;
			
			if(vsErrMsg == "A") util.Msg.alert("NLS-CSS-M045", [vnRowIdx, NLS.NSCR.RCC]);  //@1번째 데이터가 환수 처리되었기 때문에 더이상 진행할 수 없습니다.
			else if(vsErrMsg == "B") util.Msg.alert("NLS-CSS-M085", [vnRowIdx]);	//@1번째 데이터가 납입그룹키가 존재하여 처리할 수 없습니다.
			else if(vsErrMsg == "C") util.Msg.alert("NLS-CSS-M086", [vnRowIdx]);	//@1번째 데이터가 분납번호가 존재하여 처리할 수 없습니다.
			else if(vsErrMsg == "D") util.Msg.alert("NLS-CSS-M045", [vnRowIdx, NLS.NSCR.TRANSZ]);	//@1번째 데이터가 이월 처리되었기 때문에 더이상 진행할 수 없습니다.
			
			return false;
		}
		return true;
	};
	
	/**
	 * @desc 처리상태 일괄변경
	 * @param 
	 * @return  void
	 * @author Aeyoung Lee at 2016. 2. 12
	 */
	function doStatChange(){
		var vsPanelCheckIdx = util.Grid.getCheckOrSelectedRowIndex(app, "grdScalStud");
		var voPanelChk;
		
		if(String(vsPanelCheckIdx).indexOf(",") != -1){
			voPanelChk = vsPanelCheckIdx.split(",");
		}else{
			voPanelChk = new Array();
			voPanelChk[0] = vsPanelCheckIdx;
		}		
		
		var vsProcStatRcd = util.Control.getValue(app, "cbbProcStatRcdChange");
		var vsProcDate =  util.Control.getValue(app, "dipProcStatRcdDt").substring(0, 8);
		for(var i = voPanelChk.length - 1; i >= 0; i--) {
			var vnRow = voPanelChk[i];
			
			var vsSetDateColId = "";
			switch(vsProcStatRcd){
				// 확정
				case "CH301CFM" :
					vsSetDateColId = "CNFM_DT";
					util.Grid.setCellValue(app, "grdScalStud", "CANCEL_DT", "", vnRow);
					break;
				// 취소	
				case "CH301CAN" :
					vsSetDateColId = "CANCEL_DT";
					break;
				// 신청	
				case "CH301REQ" :
					vsSetDateColId = "REQ_DT";
					break;
			}
			
			util.Grid.setCellValue(app, "grdScalStud", "PROC_STAT_RCD", vsProcStatRcd, vnRow);
			if(!ValueUtil.isNull(vsSetDateColId)){
				util.Grid.setCellValue(app, "grdScalStud", vsSetDateColId, vsProcDate, vnRow);	
			}	
			ExtRepeat.updateRow("rptScalStud", null, vnRow, false);
			
		}  
		
		ExtRepeat.refresh("rptScalStud");
		
		//처리상태가 일괄 변경되었습니다. 
		util.Msg.notify(app, "NLS.CSS.M028");
	};
	
	return moPage;
};
