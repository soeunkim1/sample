//공통 모듈 사용
var util = new ComUtil(app);
// 탭 정의
var TAB = {
	// 단위테스트
	GRP : "tpcTestGrp",
	// 단위테스트진행
	ING : "tpcTesting",
	// 단위테스트리스트
	LIST : "tpcTestList"
};
// 탭버튼 정의
var TAB_BTN = {
	tpcTestGrp	: "tabBtnTestGrp",
	tpcTesting		: "tabBtnTesting",
	tpcTestList	: "tabBtnTestList"
};
var vbPageClick = false;
var msOrgStDt    = "";
var msOrgEndDt = "";
var msOrgEndYn = "";

/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	var vsMenuId = "";
	var vsMenuNm = "";

	var voHostApp = app.getHostAppInstance();
	if(voHostApp != null){
		vsMenuId = util.Auth.getMenuInfo(app).get("MENU_ID");
		vsMenuNm = util.Auth.getMenuInfo(app).get("MENU_NM");
	}else{
		var vsCurrentAppId = util.getApp().id;
		vsMenuId = vsCurrentAppId;
	}	
	
	//첫번째 탭으로 로딩	
	util.Tab.setSelectedTabItem(app, "tabMain", 1);
	//리퀘스트값 셋팅 PgmId
	util.DataMap.setValue(app, "dmReqCmd", "pgmid", vsMenuId);
	//서브미션 실행 (실패시 cover page)
	util.Submit.send(app, "subOnLoad", function(pbSuccess){
		if(pbSuccess){				
			var vsPgmInfo =  util.DataMap.getValue(app, "dmResOnLoad", "strPgmInfo");
			//eXbuilder5 주석
			//ExtControl.setValue("optPgmId"   , vsMenuId );
			//ExtControl.setValue("optPgmInfo" , vsPgmInfo);
			util.Control.setValue(app, app, "ipbPgmId", vsMenuId);
			util.Control.setValue(app, app, "optPgmInfo", vsPgmInfo);
			util.Control.redraw(app, ["ipbPgmId","optPgmInfo"]);
			// 조회
			onBtnSearchClick();
			util.Control.setEnable(app, true, "grpData");			
		}
	}, true);
	
}


/*
 * "" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnSearchClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var pgmid = util.DataMap.getValue(app, "dmReqCmd", "pgmid");

	//첫번째 탭으로 로딩
	util.Tab.setSelectedTabItem(app, "tabMain", 1);
	util.DataMap.setValue(app, "dmReqCmd", "strTabId", TAB.GRP);
	
	doList(function(pbSuccess) {
		// 조회 : "조회되었습니다." header 메세지 표시
		if (pbSuccess) {
			util.Control.redraw(app, "grdCmnUtestStep");
			util.Msg.notify(app, "NLS-INF-M024");
			util.Control.redraw(app, "ipbPgmId");
		}
	});
}

function doList(poCallBackFunc){
	// 조회조건 필수체크
	if(!util.validate(app, ["ipbPgmId"])){
		return false;
	}
	// 조회 서브미션 호출
	util.Submit.send(app, "subList", function(pbSuccess){
		if(pbSuccess){
			if(util.isFunc(poCallBackFunc))poCallBackFunc(pbSuccess);
		}
	});
}

/*
 * 인풋 박스에서 keydown 이벤트 발생 시 호출.
 * 사용자가 키를 누를 때 발생하는 이벤트.
 */
function onIpbPgmIdKeydown(/* cpr.events.CKeyboardEvent */ e){
	/** 
	 * @type cpr.controls.InputBox
	 */
	var ipbPgmId = e.control;
	if (e.keyCode == cpr.events.KeyCode.ENTER) {
		 onBtnSearchClick();
	}
}


/*
 * 사용자 정의 컨트롤에서 insert 이벤트 발생 시 호출.
 */
function onGrid_ids_btn1Insert(/* cpr.event.CUIEvent */ e){
	/** 
	 * @type udc.com.grid_IDS_Btn
	 */
	var grid_ids_btn1 = e.control;
	// 1. 신규로우 추가
	var vnIdx = util.Grid.insertRow(app, "grdCmnUtestStep");

	var vsPgmId	= util.DataMap.getValue(app, "dmReqCmd", "pgmid");	// 조회조건 : 메뉴 
	var rowCount = util.DataSet.getRowCount("dsCmnUtestStep");
	 
	var vsCurDt	= util.DataMap.getValue(app, "dmReqCmd", "curDt");	// 현재일자
	var vsUserId	= util.Auth.getUserInfo(app, "USER_ID");
	var vsUserNm = util.Auth.getUserInfo(app, "USER_NM");
	util.Grid.setCellValue(app, "grdCmnUtestStep", "PGM_ID", vsPgmId, vnIdx); 
	util.Grid.setCellValue(app, "grdCmnUtestStep", "TEST_DT", vsCurDt, vnIdx); 
	util.Grid.setCellValue(app, "grdCmnUtestStep", "USER_NM", vsUserNm, vnIdx); 
	util.Grid.setCellValue(app, "grdCmnUtestStep", "USER_ID", vsUserId, vnIdx);
}


/*
 * 사용자 정의 컨트롤에서 delete 이벤트 발생 시 호출.
 */
function onGrid_ids_btn1Delete(/* cpr.event.CUIEvent */ e){
	/** 
	 * @type udc.com.grid_IDS_Btn
	 */
	var grid_ids_btn1 = e.control;
	var vsPanelCheckIdx = util.Grid.getCheckOrSelectedRowIndex(app, "grdCmnUtestStep");
	
	//삭제할 행 없을 경우..
	if (vsPanelCheckIdx == null) {
		util.Msg.notify(app, "NLS-WRN-M008");
		return;
	}
	for( var i = 0 ; i < vsPanelCheckIdx.length ; i++){
		
		var vsEndYn = util.Grid.getCellValue(app, "grdCmnUtestStep", "END_YN", vsPanelCheckIdx[i]);
	
		if ("Y" == vsEndYn) {
			//단위테스트가 종료된 데이터는 삭제할수 없습니다.
			util.Msg.notify(app, "NLS-CMM-M039");
			return false;
		}
	}
	util.Grid.deleteRow(app, "grdCmnUtestStep");	
}


/*
 * 사용자 정의 컨트롤에서 save 이벤트 발생 시 호출.
 */
function onGrid_ids_btn1Save(/* cpr.event.CUIEvent */ e){
	/** 
	 * @type udc.com.grid_IDS_Btn
	 */
	var grid_ids_btn1 = e.control;
	var vnTabIndex = util.Tab.getSelectedId(app, "tabMain");
	
	var vsTestDt = util.Control.getValue(app, "gdDipTestDt");
	var vsEndDt = util.Control.getValue(app, "gdDipEndDt");	
	if(vsEndDt != ""){
		if(vsTestDt > vsEndDt){
			util.Msg.notify(app, "종료일이 시작일보다 작을 수 없습니다.","WARNING");
			return false;
		} 
	}
	
	switch(vnTabIndex){
		case 1 : doSave(TAB.GRP); break;
		case 2 : doSave(TAB.LIST); break;
		case 3 : doSave(TAB.ING); break;
	}	
}

function doSave(psBtnId){
	var vsGrdId = "";
				
	switch (psBtnId) {
		//탭-단위테스트
		case TAB.GRP : { 
			vsGrdId = "grdCmnUtestStep";
			break;
		}
		//탭-단위테스트진행
		case TAB.ING : { 
			vsGrdId = "grdCmnUtestRslt";
			break;
		}
		//탭-단위테스트내역
		case TAB.LIST : { 
			vsGrdId = "grdCmnUtestList";
			break;
		}
	}
	
	// 리피터 변경사항 체크
	if(!util.Grid.isModified(app, vsGrdId, "MSG")){
		return false;
	}
	//리피트 validation check
	if(!util.validateGrid(vsGrdId)) return false;
	util.DataMap.setValue(app, "dmReqCmd", "strTabId", psBtnId);
	util.Submit.send(app, "subSave", function(pbSuccess){
		if(pbSuccess){
			doList(function(pbListSuccess) {
				// 조회 : "갱신된 데이터가 조회되었습니다." header 메세지 표시
				if (pbListSuccess) {
					util.Control.redraw(app, vsGrdId);
					util.Msg.notify(app, "NLS-INF-M025");
				}
			});
		}
	});
}

/*
 * 탭 폴더에서 selection-change 이벤트 발생 시 호출.
 * Tab Item을 선택한 후에 발생하는 이벤트.
 */
function onTabMainSelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.TabFolder
	 */
	var vnTabIndex = e.newSelection.id;
	var vsSelTabId = e.oldSelection.id;
	switch(vnTabIndex){
		case 1 : doTabChange(TAB.GRP,vsSelTabId); break;
		case 2 : doTabChange(TAB.LIST,vsSelTabId); break;
		case 3 : doTabChange(TAB.ING,vsSelTabId); break;
	}
}

function doTabChange(psCaseId,vsSelTabId){
var curSelectInfo="";
curSelectInfo =  util.DataMap.getValue(app, "dmReqCmd", "testSerialNo");
// 2. 탭변경
// 3. 탭변경 후 처리 로직
	switch (psCaseId) {
		// 3-1. 단위테스트 조회
		case TAB.GRP : {
			var varSeq = util.DataMap.getValue(app, "dmReqCmd", "testSerialNo");
	
			util.DataMap.setValue(app, "dmReqCmd", "strTabId", TAB.GRP);
			
			var voCallBackFunc = function(){
				 util.Control.redraw(app, "grdCmnUtestStep");
				 if(ValueUtil.fixNull(varSeq) !="")
				{	
					util.Grid.selectRowByCondition(app, "grdCmnUtestStep", "SEQ=='" + varSeq + "'");
				}
				util.Msg.notify(app, "NLS-INF-M024");				
				
			};
			doList(voCallBackFunc);
		
		break;
		}
		// 3-2. 단위테스트진행 조회
		case TAB.ING : {
			//현재 선택된 row가 없을 경우 1번 탭으로 이동한다. 
			if( curSelectInfo == "" || curSelectInfo == null ) {
				//선택된 단위테스트 그룹이 없습니다.
				util.Msg.alert("NLS-CMM-M036");
				// tab 이동 하지 않음
				var psTabValue = "";
				switch(vsSelTabId){
					case 1: psTabValue = "tabBtnTestGrp"; break;
					case 2: psTabValue = "tpcTestList"; break;
					case 3: psTabValue = "tabBtnTesting"; break;
				}
				util.DataMap.setValue(app, "dmReqCmd", "strTabId", psTabValue);
				
				return false;
			 }
			 util.DataMap.setValue(app, "dmReqCmd", "strTabId", TAB.ING);
			//단위테스트진행 조회
			var voCallBackFunc = function() {
				
				var vEndYn = ValueUtil.fixNull(util.DataMap.getValue(app, "dmReqCmd", "endYn"));
				var isCan = true;
				if ("Y" == vEndYn) {
					isCan = false;
				}
				util.Control.setEnable(app, isCan, ["grdCmnUtestRslt"]);
				util.Control.redraw(app, "grdCmnUtestRslt");
				util.Msg.notify(app, "NLS-INF-M024");
			};
			doList(voCallBackFunc);
			break;
		}
		
		// 3-3. 단위테스트리스트 조회
		case TAB.LIST : {
		 util.DataMap.setValue(app, "dmReqCmd", "strTabId", TAB.LIST);
		 doList(function(pbSuccess) {
			
		// 조회 : "조회되었습니다." header 메세지 표시
			if (pbSuccess) {
				util.Control.redraw(app, "grdCmnUtestList");	
				util.Msg.notify(app, "NLS-INF-M024");
				}
			});
			
			break;
		}
	}
}

function setTestinInfor(){
	var vaCnt = util.DataSet.getRowCount("dsCmnUtestStep");
	var voRow = util.Grid.getIndex(app, "grdCmnUtestStep"); 
	
	if( vaCnt == null ) {
		util.DataMap.setValue(app, "dmReqCmd", "testSerialNo", "");
		util.DataMap.setValue(app, "dmTestingInfo", "info", "");
		util.Control.redraw(app, "grdCmnUtestStep_title");
	}else{
	var varSeq    = util.Grid.getCellValue(app, "grdCmnUtestStep", "SEQ");
	var varInfor1 = util.Grid.getCellValue(app, "grdCmnUtestStep", "USER_NM");
	util.Grid.setGridTitle("grdCmnUtestRslt_title", varSeq + "차 " + varInfor1);
	util.DataMap.setValue(app, "dmReqCmd", "testSerialNo", varSeq);
	}
}

/*
 * 사용자 정의 컨트롤에서 insert 이벤트 발생 시 호출.
 */
function onGrid_ids_btn2Insert(/* cpr.event.CUIEvent */ e){
	/** 
	 * @type udc.com.grid_IDS_Btn
	 */
	var grid_ids_btn2 = e.control;
	var voRowList = util.Grid.insertRow(app, "grdCmnUtestList");
	util.Grid.setCellValue(app, "grdCmnUtestList", "PGM_ID", util.Auth.getMenuInfo(app).get("MENU_ID"), voRowList);
	util.Grid.setCellValue(app, "grdCmnUtestList", "TEST_DIV_RCD", "CM80002", voRowList);
	util.Grid.setCellValue(app, "grdCmnUtestList", "TEST_DESC_RCD", "CM802999", voRowList);
}


/*
 * 사용자 정의 컨트롤에서 delete 이벤트 발생 시 호출.
 */
function onGrid_ids_btn2Delete(/* cpr.event.CUIEvent */ e){
	/** 
	 * @type udc.com.grid_IDS_Btn
	 */
	var grid_ids_btn2 = e.control;
	var vsPanelCheckIdx = util.Grid.getCheckOrSelectedRowIndex(app, "grdCmnUtestList");
	for( var i = 0 ; i < vsPanelCheckIdx.length ; i++){
		
		var vsCodeDiv = util.Grid.getCellValue(app, "grdCmnUtestList", "TEST_DIV_RCD", vsPanelCheckIdx[i]);
	
		if ("CM80001" == vsCodeDiv) {
			//공통부분 단위테스트 목록은 삭제할수 없습니다.
			util.Msg.alert("NLS.CMM.M038");
			return false;
		}
	}
	util.Grid.deleteRow(app, "grdCmnUtestList");
}


/*
 * 사용자 정의 컨트롤에서 save 이벤트 발생 시 호출.
 */
function onGrid_ids_btn2Save(/* cpr.event.CUIEvent */ e){
	/** 
	 * @type udc.com.grid_IDS_Btn
	 */
	var grid_ids_btn2 = e.control;
	doSave(TAB.LIST);
}

/*
 * "" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnCopyCodeClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnCopyCode = e.control;
	util.DataSet.clear("dsCmnUtestList");
	doCopyCode();
}

function doCopyCode(){
	//변경사항 있으면 리턴
	if(util.Grid.isModified(app, ["grdCmnUtestList"]))
	{
		return false;
	}
	
	util.Submit.send(app, "subCopyList", function(pbSuccess){
		if(pbSuccess){
			doList();						
		}
	}, true);
}


/*
 * "" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnAutoNumClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnAutoNum = e.control;
	doAuthNum();
}

function doAuthNum(){
	var vnCnt     = util.Grid.getRowCount(app, "grdCmnUtestList");
	var vnMax     = 0 ; 
	
	for( var i=0 ; i < vnCnt ; i++ ){
		var vRow = i+1;
		
		var vnTemp =util.Grid.getCellValue(app, "grdCmnUtestList", "PRT_ORD", vRow);
		if( vnMax  < Number(vnTemp) ){
			vnMax = Number(vnTemp) 	;
		}  
	}  
	
	for( var i=0 ; i < vnCnt ; i++ ){
		var vRow = i+1;
		var vnTemp = util.Grid.getCellValue(app, "grdCmnUtestList", "PRT_ORD", vRow);
		if(ValueUtil.isNull(vnTemp) )
		{
			util.Grid.setCellValue(app, "grdCmnUtestList", "PRT_ORD", vnMax + ( i * 10 ), vRow);
		}
		
	}  
}

/*
 * "" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnCopyListClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnCopyList = e.control;
	util.DataSet.clear("dsCmnUtestRslt");
	doCopyList();
}

function doCopyList(){
	//변경사항 있으면 리턴
	if(util.Grid.isModified(app, ["grdCmnUtestRslt"]))
	{
		return false;
	}
	util.Submit.send(app, "subCopyList", function(pbSuccess){
		if(pbSuccess){
				util.DataMap.setValue(app, "dmReqCmd", "strTabId", TAB.ING);
				doList(function(pbListSuccess) {
				// 조회 : "갱신된 데이터가 조회되었습니다." header 메세지 표시
					if (pbListSuccess) {
						util.Control.redraw(app, "grdCmnUtestRslt");
						util.Msg.notify(app, "NLS-INF-M025");
					}
				});						
		}
	}, true);
}

/*
 * "저장" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnSaveIngClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnSaveIng = e.control;
	doSave(TAB.ING);
}

/*
 * 탭 폴더에서 before-selection-change 이벤트 발생 시 호출.
 * Tab Item을 선택하기 전 발생하는 이벤트. 다음 이벤트로 select 이벤트를 발생합니다.
 */
function onTabMainBeforeSelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.TabFolder
	 */
	var tabMain = e.control;
	
	var vsSelTabId = e.oldSelection.id;
	//단위테스트 신규건이 있으면 메시지'단위테스트그룹 등록후 선택 가능합니다.'
	if(vsSelTabId == 1)
	{
		var vsRowStatus = util.Grid.getRowState(app, "grdCmnUtestStep");
		var vnRowCnt     = util.Grid.getRowCount(app, "grdCmnUtestStep");
		if(vsRowStatus==cpr.data.tabledata.RowState.INSERTED || vnRowCnt == 0){
			util.Msg.alert("NLS-CMM-M037");
			return false;
		}
	}
	
	// 1. 현재 선택된 탭의 상태 체크
	switch (vsSelTabId) {
		
		// 1-1. 단위테스트
		case 1 : {	
			// 단위테스트 리피트 변경내역 있는 경우
			if(util.Grid.isModified(app, ["grdCmnUtestStep"], "CRM")){
				// tab 이동 하지 않음
				return false;
			}else{
				if(util.Grid.isModified(app, ["grdCmnUtestStep"])){
					//단위테스트 목록 리셋
					util.Grid.revertAllData(app, "grdCmnUtestStep");					
				}
			}
			break;
		}
		
		// 1-2. 단위테스트진행  버튼 선택
		case 3 : {	
		    // 단위테스트진행 리피트 변경내역 있는 경우
			if(util.Grid.isModified(app, ["grdCmnUtestRslt"], "CRM")){
				// tab 이동 하지 않음
				return false;
			}else
			{
				if(util.Grid.isModified(app, ["grdCmnUtestRslt"]) )
				{
					//단위테스트진행 목록 리셋
					util.Grid.revertAllData(app, "grdCmnUtestRslt");
				}
			}
			break;
		}
		
		// 1-3. 단위테스트리스트 버튼 선택
		case 2 : {	
		    // 단위테스트리스트 리피트 변경내역 있는 경우
			if(util.Grid.isModified(app, ["grdCmnUtestList"], "CRM")){	
				// tab 이동 하지 않음
				return false;
			}else{
				if(util.Grid.isModified(app, ["grdCmnUtestList"])){
					//단위테스트리스트 목록 리셋
					util.Grid.revertAllData(app, "grdCmnUtestList");
				}
			}
			break;
		}
	}
	//1-4단위테스트 차수 사용자 셋팅
	setTestinInfor();
}

/*
 * 데이트 인풋에서 value-change 이벤트 발생 시 호출.
 * Dateinput의 value를 변경하여 변경된 값이 저장된 후에 발생하는 이벤트.
 */
function onGdDipEndDtValueChange(/* cpr.events.CValueChangeEvent */ e){
	/** 
	 * @type cpr.controls.DateInput
	 */
	var gdDipEndDt = e.control;
	var vnRow = util.Grid.getIndex(app, "grdCmnUtestStep");
	var vsEndDt = util.Grid.getCellValue(app, "grdCmnUtestStep", "END_DT", vnRow);
	
	if(vsEndDt ==""){
		util.Grid.setCellValue(app, "grdCmnUtestStep", "END_YN", "", vnRow);
	}else{
		util.Grid.setCellValue(app, "grdCmnUtestStep", "END_YN", "Y", vnRow);
		checkCalendarDt("END_DT");
	} 
}

function checkCalendarDt(psColNm){
	var vnRow = util.Grid.getIndex(app, "grdCmnUtestStep");
	var vsTestDt = util.Grid.getCellValue(app, "grdCmnUtestStep", "TEST_DT", vnRow);
	var vsEndDt = util.Grid.getCellValue(app, "grdCmnUtestStep", "END_DT", vnRow);
	var vsEndYn = util.Grid.getCellValue(app, "grdCmnUtestStep", "END_YN", vnRow);
	
	if(psColNm == "TEST_DT"){ //시작일자인 경우
	if(vsEndDt != "" && (vsTestDt > vsEndDt)){
		util.Msg.notify(app, "NLS-WRN-M129");
		util.Grid.setCellValue(app, "grdCmnUtestStep", "TEST_DT", msOrgStDt, vnRow);
		}else {
			msOrgStDt = vsTestDt;
		}	
	} else if(psColNm == "END_DT"){// 종료일자인 경우
	if(vsTestDt != "" && (vsTestDt > vsEndDt)){
		util.Msg.notify(app, "NLS-CSS-M064");
		util.Grid.setCellValue(app, "grdCmnUtestStep", "END_DT", "", vnRow);		
		util.Grid.setCellValue(app, "grdCmnUtestStep", "END_YN", "", vnRow);
		}
	} 
}


/*
 * 데이트 인풋에서 value-change 이벤트 발생 시 호출.
 * Dateinput의 value를 변경하여 변경된 값이 저장된 후에 발생하는 이벤트.
 */
function onGdDipTestDtValueChange(/* cpr.events.CValueChangeEvent */ e){
	/** 
	 * @type cpr.controls.DateInput
	 */
	var gdDipTestDt = e.control;
	checkCalendarDt("TEST_DT");
}
