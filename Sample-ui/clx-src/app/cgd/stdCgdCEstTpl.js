//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./stdCgdCEstTpl.xtm"/>

/**
 * 평가템플릿관리
 * @class stdCgdCEstTpl
 * @author 박갑수 at 2016. 3. 18
 */
var stdCgdCEstTpl = function() {
	var moPage = new Page();
	
	// 임포트용 데이터 통신 오브젝트
	var moPObject = new Page();
	
	// 평가템플릿 검색
	moIdsForStdCgdPEstTplPopup = [
	{
		 controlId					: "btnEstTplNm",			
		 iEstTplCd					: "",			
		 iEstTplNm				: "ipbEstTplNm",			
		 oEstTplCd				: "/root/reqKey/strTopEstTplCd",			
		 oEstTplNm				: "ipbEstTplNm",			
		 oUestTplCd				: "",		
		 oRefKey					: "",			
		 func : function(poParam) {
			 // 검색조건이 있을경우 조회
			var vsEstTplNm = util.Control.getValue(app, "ipbEstTplNm");
			if(!ValueUtil.isNull(vsEstTplNm)){
				util.Header.clickSearch(app);
			}
		 }
	 }];
	
	/**
	 * @desc import 헤더 초기화
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 3. 18
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		// import 헤더 초기화
		doHeaderOnLoad();
	};
	
	/**
	 * @desc onLoad 실행
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 18
	 */
	moPage.onModelConstructDone_StdCgdCEstTpl = function() {
		// 리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["rptCgdEstTpl", "rptCgdEstFactor"]);
		// 검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grpData", "grpDataDtl", "grpTree"]);
				
		// 서브미션 호출
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				// 조회조건 평가템플릿명포커스
				util.Control.setFocus(app, "ipbEstTplNm");
			}
		}, true);
	};
	
	/**
	 * @desc [btnEstTplNm]평가템플릿명(돋보기버튼) onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 18
	 */
	moPage.onClick_BtnEstTplNm = function(sender) {
		// 평가템플릿검색 팝업 호출
		doOnClickStdCgdPEstTplPopup(sender);
	};
	
	/**
	 * @desc [ipbEstTplNm]평가템플릿명 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 18
	 */
	moPage.onValueChanged_IpbEstTplNm = function(sender) {
		// 리피트 변경사항 체크
		if(util.Grid.isModified(app, ["grdCgdEstTpl", "grdCgdEstFactor"])){
			return false;
		}

		// 평가템플릿검색 팝업 호출
		doOnChangeStdCgdPEstTplPopup(sender);
	};
	
	/**
	 * @desc [btnSearch]조회 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 18
	 */
	moPage.onClick_BtnSearch = function() {
		 // 작업영역 리피트 변경 내역 체크
		if(util.Grid.isModified(app, "", "CRM")){
			return false;
		}
		
		// 조회조건 필수 체크
		if(!util.validate(app, ["ipbEstTplNm"])){
			return false;
		}

		// 조회
		doList(function(pbSuccess) {
			// 조회 : "조회되었습니다." header 메세지 표시
			if (pbSuccess) util.Msg.notify(app, "NLS.INF.M024");
		});
	};
	
	/**
	 * @desc 평가템플릿 목록 조회
	 * @param poCallBackFunc 콜백정의
	 * @return void
	 * @author 박갑수 at 2016. 3. 18
	 */
	function doList(poCallBackFunc) {
		// 디테일 리피트 변경시 변경내역 체크 방지
		util.Control.redraw(app, "grdCgdEstFactor");
		
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdCgdEstTpl");
				ExtTreeView.rebuild("trvCgdEstTpl");
				
				util.Tree.expandAllItems(app, "trvCgdEstTpl", true);
				
				// 마스터에 데이터가 없을 경우 디테일 입력 불가
				if(util.Grid.getRowCount(app, "grdCgdEstTpl") < 1){
					util.Control.setEnable(app, false,["grpDataDtl"]);
					util.Control.reset(app, "rptCgdEstFactor");
				}else{
					// 각 컨트롤 활성화 제어
					doMstRptStatus();
					doDtlRptStatus();
				}
			}
			
			// 조회 후 콜백함수 수행
			if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
		});
	};
	
	/**
	 * @desc 마스터 데이터의 변경내역이 존재여부에 따른 디테일 활성/비활성
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 18
	 */
	function doMstRptStatus(){
		if(util.Grid.isModified(app, "grdCgdEstTpl")){
			util.Control.setEnable(app, false, ["grpDataDtl"]);
		}else{
			util.Control.setEnable(app, true, ["grpDataDtl"]);
		}
	};

	/**
	 * @desc 디테일 데이터의 변경내역이 존재여부에 따른 마스터 활성/비활성
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 18
	 */
	function doDtlRptStatus(){
		if(util.Grid.isModified(app, "grdCgdEstFactor")){
			util.Control.setEnable(app, false, ["grpData", "grpTree"]);
		}else{
			util.Control.setEnable(app, true, ["grpData", "grpTree"]);
		}
	};
	
	/**
	 * @desc [rhCkbSelect]패널 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 18
	 */
	moPage.onValueChanged_RhCkbSelect = function() {
		// 리피트 패널 설정
//TO-BE: <ExtRepeat.selectedAllPanel> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.selectedAllPanel("rhCkbSelect");
	};
	
	/**
	 * @desc [rdIpbRflcRate]반영비율 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 18
	 */
	moPage.onValueChanged_RdIpbRflcRate = function() {
		ValidUtil.checkIntegerDecimal("rdIpbRflcRate", 3, 0, true);
		
		// 반영비율의 합이 100을 초과하는지 검사
		if(!doChkRflcRate()){
			util.Grid.setCellValue(app, "grdCgdEstTpl", "RFLC_RATE", "");
		}
	};
	
	/**
	 * @desc 반영비율의 합이 100을 초과하는지 검사
	 * @param 
	 * @return boolean
	 * @author 박갑수 at 2016. 3. 18
	 */
	function doChkRflcRate(){
		// 유효성 true or false
		var vbValid = true;

		var vnRowCnt = util.Grid.getRowCount(app, "grdCgdEstTpl");
		
		// 반영비율
		var vsRflcRate = util.Grid.getCellValue(app, "grdCgdEstTpl", "RFLC_RATE");
		if(ValueUtil.isNull(vsRflcRate)){
			return vbValid;
		}
		// 상위평가템플릿코드
		var vsUestTplCd = util.Grid.getCellValue(app, "grdCgdEstTpl", "UEST_TPL_CD");
			
		// 상위평가템플릿이 존재하지 않을경우 반영비율이 100 초과하는지 검사
		if(ValueUtil.isNull(vsUestTplCd)){
			if(ValueUtil.fixNull(util.Grid.getCellValue(app, "grdCgdEstTpl", "UPT_STATUS")) != "D"){
				
				if(100 < Number(vsRflcRate)){
					// "반영비율의 합이 100을 초과할 수 없습니다." 메시지 
					util.Msg.alert("NLS-CGD-M025");
					
					vbValid = false;
					return vbValid;
				}
			}
		// 상위평가템플릿이 존재하는경우 같은 상위평가템플릿의 반영비율이 100 초과하는지 검사
		}else {
			// 반영비율의 합
			var vnTotRflcRate = 0;
			
			for(var i=0; i<vnRowCnt; i++){
				var vnIdx = i+1;
				
				// 삭제일경우 제외
				var vsUptStatus = util.Grid.getCellValue(app, "grdCgdEstTpl", "UPT_STATUS", vnIdx);
				if(ValueUtil.fixNull(vsUptStatus) == "D") continue;
				
				var vsUestTplCdRow = util.Grid.getCellValue(app, "grdCgdEstTpl", "UEST_TPL_CD", vnIdx);
				
				if(vsUestTplCd == vsUestTplCdRow){
					// 반영비율
					var vsRflcRateRow = util.Grid.getCellValue(app, "grdCgdEstTpl", "RFLC_RATE", vnIdx);
					
					vnTotRflcRate = vnTotRflcRate + Number(vsRflcRateRow);
				}
			}
			
			if(100 < vnTotRflcRate){
				// "반영비율의 합이 100을 초과할 수 없습니다." 메시지 
				util.Msg.alert("NLS-CGD-M025");
				
				vbValid = false;
				return vbValid;
			}
		}

		return vbValid;
	};
	
	/**
	 * @desc [rdCbbUestTplCd]상위평가템플릿 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 18
	 */
	moPage.onValueChanged_RdCbbUestTplCd = function() {
		// 반영비율의 합이 100을 초과하는지 검사
		if(!doChkRflcRate()){
			util.Grid.setCellValue(app, "grdCgdEstTpl", "UEST_TPL_CD", "");
		}
	};
	
	/**
	 * @desc [btnNew]신규 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 18
	 */
	moPage.onClick_BtnNew = function() {
		// 신규로직
		doNew();
	};
	
	/**
	 * @desc 평가템플릿목록 신규
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 18
	 */
	function doNew(psUestTplCd){
		// 신규로우 추가
		var vnIdx = util.Grid.insertRow(app, "grdCgdEstTpl", "rdIpbEstTplCd");
		
		if(!ValueUtil.isNull(psUestTplCd)){
			util.Grid.setCellValue(app, "grdCgdEstTpl", "UEST_TPL_CD", psUestTplCd, vnIdx);
		}
		
		// 개인권한[CC00104] 
		if (moPageInfo.authRngRcd == "CC00104") {
			util.Grid.setCellValue(app, "grdCgdEstTpl", "APLY_LMT", moUserInfo.id, vnIdx);
		}
		
		// 마스터 데이터의 변경내역에 따른 디테일 활성/비활성
		doMstRptStatus();
	};
	
	/**
	 * @desc [btnDel]삭제 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 18
	 */
	moPage.onClick_BtnDel = function() {
		// 삭제
		util.Grid.deleteRow(app, "grdCgdEstTpl");
		// 마스터 데이터의 변경내역에 따른 디테일 활성/비활성
		doMstRptStatus();
	};
	
	/**
	 * @desc [btnRestore]작업취소 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 18
	 */
	moPage.onClick_BtnRestore = function() {
		// 작업취소
		util.Grid.restoreRow(app, "grdCgdEstTpl");
		// 마스터 데이터의 변경내역에 따른 디테일 활성/비활성
		doMstRptStatus();
	};
	
	/**
	 * @desc [btnSave]작업저장 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 18
	 */
	moPage.onClick_BtnSave = function() {
		// 작업저장
		doSave();
	};
	
	/**
	 * @desc 평가템플릿목록 변경사항 저장
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 18
	 */
	function doSave() {
		
		// 리피트 변경사항 체크
		if(!util.Grid.isModified(app, ["grdCgdEstTpl"], "MSG")){
			return false;
		}
		
		// 리피트 Validation Check		
		if(!util.validate(app, "grdCgdEstTpl")) return false;
		
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
	 * @desc [rptCgdEstTpl]평가템플릿목록 onRowSelect 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 18
	 */
	moPage.onRowSelect_RptCgdEstTpl = function() {
		// 마스터 신규일경우 평가요소목록 초기화
		if(util.Grid.getRowState(app, "grdCgdEstTpl") == cpr.data.tabledata.RowState.INSERTED){
			util.Control.reset(app, "rptCgdEstFactor");
			return false;
		}
		
		// 트리아이템 포커스
		var vsEstTplCd = util.Grid.getCellValue(app, "grdCgdEstTpl", "EST_TPL_CD");
		ExtTreeView.findItemValue("trvCgdEstTpl", vsEstTplCd);
		
		// 평가요소목록 조회
		doListDtl();
	};
	
	/**
	 * @desc 평가요소목록 조회
	 * @param poCallBackFunc 콜백정의
	 * @return void
	 * @author 박갑수 at 2016. 3. 18
	 */
	function doListDtl(poCallBackFunc) {
		
		// 참조키
		util.DataMap.setValue(app, "dmReqKey", "strEstTplCd", util.Grid.getCellValue(app, "grdCgdEstTpl", "EST_TPL_CD"));
		
		//strCommand: listFactor 
		util.Submit.send(app, "subListDtl", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdCgdEstFactor");
				
				// 디테일 리피트 상태에 따른 마스터 활성화 제어
				doDtlRptStatus();
			}
			
			// 조회 후 콜백함수 수행
			if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
		});
	};
	
	/**
	 * @desc [btnNewDtl]신규 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 18
	 */
	moPage.onClick_BtnNewDtl = function() {
		// 신규로우 추가
		var vnIdx = util.Grid.insertRow(app, "grdCgdEstFactor");
		
		// 평가템플릿코드 : 마스터목록
		var vsEstTplCd = util.DataMap.getValue(app, "dmReqKey", "strEstTplCd");
		util.Grid.setCellValue(app, "grdCgdEstFactor", "EST_TPL_CD", vsEstTplCd, vnIdx);
		
		// 디테일 리피트 상태에 따른 마스터 활성화 제어
		doDtlRptStatus();
	};
	
	/**
	 * @desc [btnDelDtl]삭제 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 18
	 */
	moPage.onClick_BtnDelDtl = function() {
		// 삭제
		util.Grid.deleteRow(app, "grdCgdEstFactor");
		// 디테일 리피트 상태에 따른 마스터 활성화 제어
		doDtlRptStatus();
	};
	
	/**
	 * @desc [btnRestoreDtl]작업취소 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 18
	 */
	moPage.onClick_BtnRestoreDtl = function() {
		// 작업취소
		util.Grid.restoreRow(app, "grdCgdEstFactor");
		// 디테일 리피트 상태에 따른 마스터 활성화 제어
		doDtlRptStatus();
	};
	
	/**
	 * @desc [btnSaveDtl]작업저장 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 18
	 */
	moPage.onClick_BtnSaveDtl = function() {
		// 작업저장
		doSaveDtl();
	};
	
	/**
	 * @desc 평가요소목록 변경사항 저장
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 18
	 */
	function doSaveDtl() {
		
		// 리피트 변경사항 체크
		if(!util.Grid.isModified(app, ["grdCgdEstFactor"], "MSG")){
			return false;
		}
		
		// 리피트 Validation Check		
		if(!util.validate(app, "grdCgdEstFactor")) return false;
		
		//strCommand: saveFactor 
		util.Submit.send(app, "subSaveDtl", function(pbSuccess){
			if(pbSuccess){
				doListDtl(function(pbListSuccess) {
					// 조회 : "갱신된 데이터가 조회되었습니다." header 메세지 표시
					if (pbListSuccess) util.Msg.notify(app, "NLS.INF.M025");
				});
			}
		});
	};
	
	/**
	 * @desc [rdIpbPscCiiDtl]만점기쥰 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 18
	 */
	moPage.onValueChanged_RdIpbPscCiiDtl = function() {
		ValidUtil.checkIntegerDecimal("rdIpbPscCiiDtl", 3, 0, true);
	};
	
	/**
	 * @desc [rdIpbRflcRateDtl]반영비율 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 18
	 */
	moPage.onValueChanged_RdIpbRflcRateDtl = function() {
		ValidUtil.checkIntegerDecimal("rdIpbRflcRateDtl", 3, 0, true);
		
		// 반영비율의 합이 100을 초과하는지 검사
		if(!doChkRflcRateDtl()){
			util.Grid.setCellValue(app, "grdCgdEstFactor", "RFLC_RATE", "");
		}
	};
	
	/**
	 * @desc 반영비율의 합이 100을 초과하는지 검사
	 * @param 
	 * @return boolean
	 * @author 박갑수 at 2016. 3. 18
	 */
	function doChkRflcRateDtl(){
		// 유효성 true or false
		var vbValid = true;

		var vnRowCnt = util.Grid.getRowCount(app, "grdCgdEstFactor");
		
		// 반영비율
		var vsRflcRate = util.Grid.getCellValue(app, "grdCgdEstFactor", "RFLC_RATE");
		if(ValueUtil.isNull(vsRflcRate)){
			return vbValid;
		}
		
		// 반영비율의 합
		var vnTotRflcRate = 0;
		
		for(var i=0; i<vnRowCnt; i++){
			var vnIdx = i+1;
			
			// 삭제일경우 제외
			var vsUptStatus = util.Grid.getCellValue(app, "grdCgdEstFactor", "UPT_STATUS", vnIdx);
			if(ValueUtil.fixNull(vsUptStatus) == "D") continue;
			
			// 반영비율
			var vsRflcRateRow = util.Grid.getCellValue(app, "grdCgdEstFactor", "RFLC_RATE", vnIdx);
			vnTotRflcRate = vnTotRflcRate + Number(vsRflcRateRow);
		}
		
		if(100 < vnTotRflcRate){
			// "반영비율의 합이 100을 초과할 수 없습니다." 메시지 
			util.Msg.alert("NLS-CGD-M025");
			
			vbValid = false;
			return vbValid;
		}

		return vbValid;
	};
	
	/**
	 * @desc [rhCkbSelectDtl]패널 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 18
	 */
	moPage.onValueChanged_RhCkbSelectDtl = function() {
		// 리피트 패널 설정
//TO-BE: <ExtRepeat.selectedAllPanel> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.selectedAllPanel("rhCkbSelectDtl");
	};
	
	/**
	 * @desc [trvCgdEstTpl]템플릿구조 onSelectionChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 18
	 */
	moPage.onSelectionChanged_TrvCgdEstTpl = function() {
		var vsEstTplCd = util.Tree.getSelectedValue(app, "trvCgdEstTpl");
		
		// 평가템플릿코드에해당하는 항목에 선택
		ExtRepeat.selectRowByValues("rptCgdEstTpl", "EST_TPL_CD:"+vsEstTplCd, true);
	};
	
	/**
	 * @desc [trvCgdEstTpl]템플릿구조 onrbuttondown 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 9
	 */
	moPage.onrbuttondown_TrvCgdEstTpl = function() {
		// 컨텍스트메뉴 열기
		doOpenContextMenu();
	};
	
	/**
	 * @desc 컨텍스트메뉴 열기
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 9
	 */
	function doOpenContextMenu() {
		var vsEstTplCd = util.Tree.getSelectedValue(app, "trvCgdEstTpl");
		
		if( ValueUtil.isNull(vsEstTplCd) ) {
			// "라인을 선택하세요."	메시지
			util.Msg.alert("NLS-INF-M023");
			return false;
		}
		
		// 하위 평가템플릿 생성
		model.addMenuCtrl(1, NLS.CCS.CRTTMP, 	"doNew(" + vsEstTplCd + ")", 0, "javascript");
		
		var vsMouPos = model.getMousePos();
		var vaMouPos = vsMouPos.split(",");
		model.popMenu(vaMouPos[0] , vaMouPos[1] );
	};
	
	/**
	 * @desc [rdCbbUestTplCd]템플릿구조 onSetFocus 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 9
	 */
	moPage.onSetFocus_RdCbbUestTplCd = function() {
		var vsEstTplCd = util.Grid.getCellValue(app, "grdCgdEstTpl", "EST_TPL_CD");
		ExtControl.setAttr("rdCbbUestTplCd", "nodeset", "/root/resList/rptCgdEstTpl/row[child::EST_TPL_CD != '"+vsEstTplCd+"' and UPT_STATUS != 'N' and UPT_STATUS !=  'D']");
		util.Control.redraw(app, "rdCbbUestTplCd");
	};
	
	return moPage;
};
