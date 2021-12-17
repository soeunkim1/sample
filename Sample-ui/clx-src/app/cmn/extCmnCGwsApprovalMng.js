//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCmnCGwsApprovalMng.xtm"/>


var extCmnCGwsApprovalMng = function() {
	var moPage = new Page();
	
	/**
	 * @desc  Header Import onLoad
	 * @return void
	 * @author jeong-ho, Jeong 2016. 6. 21.
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		doHeaderOnLoad();
	};
	
	/**
	 * @desc  onModelConstructDone  event
	 * @return void
	 * @author jeong-ho, Jeong 2016. 6. 21.
	 */
	moPage.onModelConstructDone_ExtCmnCGwsApprovalMng = function() {
		// 리피트 및 조회그룹 관련 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grpDataMst", "grpDataDtl", "grpDataField"]);
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["rptMst", "rptDtl", "rptField"]);
		
		util.Header.clickSearch(app);
	};
	
	/**
	 * @desc  조회 버튼 click event 
	 * @return void
	 * @author jeong-ho, Jeong 6. 21.
	 */
	moPage.onClick_BtnSearch = function() {
		
		//작업영역 리피트 변경 내역 체크
		if(util.Grid.isModified(app, "", "CRM")){
			return false;
		}
		
		doListMst(function(pbSuccess) {
			// 조회 : "조회되었습니다." header 메세지 표시
			if (pbSuccess) util.Msg.notify(app, "NLS.INF.M024");
		});
	};
	
	/**
	 * @desc  조회 event 마스터 리피트 조회  	
	 * @param {Function} poCallBackFunc 콜백정의
	 * @return void
	 * @author jeong-ho, Jeong 2016. 6. 21.
	 */
	function doListMst(poCallBackFunc) {
				
		//디테일 리피트 변경시 변경내역 체크 방지
		util.Control.redraw(app, "grdDtl");
		util.Control.redraw(app, "grdField");
		
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdMst");
				//마스터에 데이터가 없을 경우 디테일 입력 불가
				if(util.Grid.getRowCount(app, "grdMst") < 1){
					util.Control.setEnable(app, false, ["grpDataDtl", "grpDataField"]);
					util.Control.reset(app, "rptDtl");
					util.Control.reset(app, "rptField");
				}else{
					// 각 컨트롤 활성화 제어
					doMstRptStatus();
					doDtlRptStatus();
					doFieldRptStatus();
				}	
			}
			// 조회 후 콜백함수 수행
			if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess); 
		}); 
	};
	
	/**
	 * @desc   마스터의 상태가 편집상태일 경우  디테일 disable
	 * @return void
	 * @author jeong-ho, Jeong 2016. 6. 21.
	 */
	function doMstRptStatus(){
		if(util.Grid.isModified(app, "grdMst")){
			util.Control.setEnable(app, false, ["grpDataDtl", "grpDataField"]);
		}else{
			util.Control.setEnable(app, true, ["grpDataDtl", "grpDataField"]);
		}
	};
	
	/**
	 * @desc   디테일 상태가 편집상태일 경우 마스터 disable
	 * @return void
	 * @author jeong-ho, Jeong 2016. 6. 21.
	 */
	function doDtlRptStatus(){
		if(util.Grid.isModified(app, "grdDtl")){
			util.Control.setEnable(app, false, ["grpDataMst", "grpDataField"]);
		}else{
			util.Control.setEnable(app, true, ["grpDataMst", "grpDataField"]);
		}
	};
	
	/**
	 * @desc   디테일 상태가 편집상태일 경우 마스터 disable
	 * @return void
	 * @author jeong-ho, Jeong 2016. 6. 21.
	 */
	function doFieldRptStatus(){
		if(util.Grid.isModified(app, "grdField")){
			util.Control.setEnable(app, false, ["grpDataMst", "grpDataDtl"]);
		}else{
			util.Control.setEnable(app, true, ["grpDataMst", "grpDataDtl"]);
		}
	};
	
	/**
	 * @desc   마스터 rowselect event
	 *              디테일 조회
	 * @return void
	 * @author jeong-ho, Jeong 2016. 6. 21.
	 */
	moPage.onRowSelect_RptMst = function() {
		doListMstRowSelectDtl();
	};
	
	/**
	 * @desc   마스터 rowselect event
	 *              디테일 조회
	 * @return void
	 * @author jeong-ho, Jeong 2016. 6. 21.
	 */
	function doListMstRowSelectDtl() {
		if(util.Grid.getRowState(app, "grdMst") == cpr.data.tabledata.RowState.INSERTED){
			util.Control.reset(app, "rptDtl");
			util.Control.reset(app, "rptField");
			return false;
		}			
		doListDtl();
	};
	
	/**
	 * @desc   마스터 rowselect event
	 *              디테일 조회
	 * @param {String} 호출되는 상태값
	 *  						 신규, 삭제시에서 호출될 경우 디테일 재조회
	 * @return void
	 * @author jeong-ho, Jeong 2016. 6. 21.
	 */
	function doListDtl(poCallBackFunc) {
		util.DataMap.setValue(app, "dmReqKey", "strAprvFormCd", util.Grid.getCellValue(app, "grdMst", "CD"));
		//strCommand: listDtl 
		util.Submit.send(app, "subListDtl", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdDtl");
				
				//마스터에 데이터가 없을 경우 디테일 입력 불가
				if(util.Grid.getRowCount(app, "grdDtl") < 1){
					util.Control.setEnable(app, false, ["grpDataField"]);
					util.Control.reset(app, "rptField");
				}else{
					// 각 컨트롤 활성화 제어
					doMstRptStatus();
					doDtlRptStatus();
					doFieldRptStatus();
				}
			}
			// 조회 후 콜백함수 수행
			if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess); 
		});
	};
	
	/**
	 * @desc 리피트 UPDATE 이벤트
	 * @return void
	 * @author jeong-ho, Jeong 2016. 6. 21.
	 */
	moPage.onUpdate_RptDtl = function() {
		doDtlRptStatus();
	};
	
	/**
	 * @desc 리피트 ROW SELECT 이벤트
	 * @return void
	 * @author jeong-ho, Jeong 2016. 6. 21.
	 */
	moPage.onRowSelect_RptDtl = function() {
		doListMstRowSelectField();
	};
	
	/**
	 * @desc   마스터 rowselect event
	 *              디테일 조회
	 * @return void
	 * @author jeong-ho, Jeong 2016. 6. 21.
	 */
	function doListMstRowSelectField() {
		if(util.Grid.getRowState(app, "grdDtl") == cpr.data.tabledata.RowState.INSERTED){
			util.Control.reset(app, "rptField");
			return false;
		}			
		doListField();
	};
	
	/**
	 * @desc   마스터 rowselect event
	 *              디테일 조회
	 * @param {String} 호출되는 상태값
	 *  						 신규, 삭제시에서 호출될 경우 디테일 재조회
	 * @return void
	 * @author jeong-ho, Jeong 2016. 6. 21.
	 */
	function doListField(poCallBackFunc) {
		util.DataMap.setValue(app, "dmReqKey", "strFieldCd", util.Grid.getCellValue(app, "grdDtl", "CD"));
		//strCommand: listField 
		util.Submit.send(app, "subListField", function(pbSuccess){
			if(pbSuccess){
				
				moPage.columnVisibleField();
				
				util.Control.redraw(app, "grdField");
			}
			// 조회 후 콜백함수 수행
			if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess); 
		});
	};
	
	moPage.columnVisibleField = function() {
		
		// 평정유형구분
		var vsCdPrp1 = util.Grid.getCellValue(app, "grdDtl", "CD_PRP1");
		
		// 첨부파일 = 03
		if (vsCdPrp1 == "03") {
			
			// 컬럼 보임/안보임
			util.Grid.showColumn(app, "rptField", "rdCbbFieldCdNm", "185");
			util.Grid.hideColumn(app, "rptField", "rdIpbFieldCdNm");
			
			// 헤더
			ExtControl.setAttr("rhBtnFieldCdNmCbb", "class", "rptHeaderReq");
			ExtControl.setAttr("rhBtnFieldCdNm", "class", "rptHeader");
			
			// 바디 css
			ExtControl.setAttr("rdCbbFieldCdNm", "class", "cbbRptReq");
			util.Control.setUserAttr(app, "rdCbbFieldCdNm", "require", "Y");
			
			ExtControl.setAttr("rdIpbFieldCdNm", "class", "ipbRpt");
			util.Control.setUserAttr(app, "rdIpbFieldCdNm", "require", "");
			
		} else {
			// 컬럼 보임/안보임
			util.Grid.showColumn(app, "rptField", "rdIpbFieldCdNm", "185");
			util.Grid.hideColumn(app, "rptField", "rdCbbFieldCdNm");
			
			// 헤더
			ExtControl.setAttr("rhBtnFieldCdNmCbb", "class", "rptHeader");
			ExtControl.setAttr("rhBtnFieldCdNm", "class", "rptHeaderReq");
			
			// 바디 css
			ExtControl.setAttr("rdCbbFieldCdNm", "class", "cbbRpt");
			util.Control.setUserAttr(app, "rdCbbFieldCdNm", "require", "");
			
			ExtControl.setAttr("rdIpbFieldCdNm", "class", "ipbRptReq");
			util.Control.setUserAttr(app, "rdIpbFieldCdNm", "require", "Y");
		}
	};
	
	/**
	 * @desc 신규 click event
	 * @return void
	 * @author jeong-ho, Jeong 2016. 6. 21.
	 */	
	moPage.onClick_BtnNew = function() {
		//해당 리피트의 편집 시작할 컬럼 지정
		var vnRowIndex = util.Grid.insertRow(app, "grdMst", "rdIpbCdPrp1");
		
		// 신규 row 기본값 세팅
		util.Grid.setCellValue(app, "grdMst", "LAN_DIV_RCD", util.getSystemLocale(), vnRowIndex);
		util.Grid.setCellValue(app, "grdMst", "CD_CLS", "CMN015", vnRowIndex);
		util.Grid.setCellValue(app, "grdMst", "EFFT_ST_DT", "19000101000000", vnRowIndex);
		util.Grid.setCellValue(app, "grdMst", "EFFT_END_DT", "99991231000000", vnRowIndex);
		
		// 마스터 리피터 상태에따른 디테일 제어
		doMstRptStatus();
	};
	
	/**
	 * @desc 삭제 click event
	 * @return void
	 * @author jeong-ho, Jeong 2016. 6. 21.
	 */	
	moPage.onClick_BtnDel = function() {
		var vnRptIdx = util.Grid.getIndex(app, "grdMst");
				
		//디테일 로우 건수 체크
		var vsIdxs =  util.Grid.getCheckOrSelectedRowIndex(app, "grdMst");
		
		var vsRptDtlLable = util.Grid.getTitle(app, "grdDtlDtl");
			
		if(!ValueUtil.isNull(vsIdxs)){
			
			var voIdx = vsIdxs.split(",");
		
			for( var i = 0 ; i < voIdx.length ; i++){
				
