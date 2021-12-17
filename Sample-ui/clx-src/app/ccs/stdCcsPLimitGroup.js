//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./stdCcsPLimitGroup.xtm"/>

/**
 * 그룹검색
 * @class stdCcsPLimitGroup
 * @author 박갑수 at 2016. 4. 12
 */
var stdCcsPLimitGroup = function() {
	var moPage = new Page();
	
	// 임포트용 데이터 통신 오브젝트
	var moPObject = new Page();
	
	// 객체검색팝업 호출
	moPObject.moIdsForStdCmnPObjSch = [
	{
		controlId			:	"btnAply",
		iCd					:	"",
		iNm					:	"",
		iObjDivRcd			:	["CC009OG","CC009SA"],
		iStartObject    	:   "",
		iOtDivRcd			:	"",
		iOtIsTreeView	:	"",
		iLanDivRcd		:	"",
		iKeyDate			:	"/root/reqKey/strKeyDate",
		iKeyEndDate		:	"",
		oObjDivRcd		:	"/root/reqKey/strObjDivRcd",
		oCd					:	"/root/reqKey/strObjCd",
		oCdNm				:	"",
		oBegDt				:	"",
		oEndDt				:	"",
		oLanDivRcd		:	"",
		func 					:  function(){
			
			// 하위학사부서목록 조회 후 세팅
			doSaList(function(pbSuccess) {
				
				// 학사부서 목록 수만큼 Insert처리
				var vnLength = util.DataSet.getRowCount(app, "dsSaList");
				
				var vsGrpCd = util.DataMap.getValue(app, "dmReqKey", "strSelGrpCd");
				for(var i=0; i<vnLength; i++){
					var vsObjCd = util.DataSet.getValue(app, "dsSaList", "OBJ_CD" , i+1);
					var vsObjNm = util.DataSet.getValue(app, "dsSaList", "OBJ_CD_NM" , i+1);
					var vsObjDivRcd =  util.DataSet.getValue(app, "dsSaList", "OBJ_DIV_RCD" , i+1);
					
					// 신규로우 추가
					var vnIdx = util.Grid.insertRow(app, "grdCcsPermitLimitGroupSub");
					
					util.Grid.setCellValue(app, "grdCcsPermitLimitGroupSub", "GRP_CD", vsGrpCd);
					util.Grid.setCellValue(app, "grdCcsPermitLimitGroupSub", "SA_CD", vsObjCd);
					util.Grid.setCellValue(app, "grdCcsPermitLimitGroupSub", "SA_CD_NM", vsObjNm);
					util.Grid.setCellValue(app, "grdCcsPermitLimitGroupSub", "SA_OBJ_DIV_RCD", vsObjDivRcd);
				}
				
				// 디테일 리피트 상태에 따른 마스터 활성화 제어
				doDtlRptStatus();
			});
		}
	},
	{
		controlId			:	"rdBtnSaCdNmDtl",
		iCd					:	"rdIpbSaCdDtl",
		iNm					:	"rdIpbSaCdNmDtl",
		iObjDivRcd			:	["CC009SA"],
		iStartObject    	:   "",
		iOtDivRcd			:	"",
		iOtIsTreeView	:	"",
		iLanDivRcd		:	"",
		iKeyDate			:	"/root/reqKey/strKeyDate",
		iKeyEndDate		:	"",
		oObjDivRcd		:	"rdIpbSaObjDivRcdDtl",
		oCd					:	"rdIpbSaCdDtl",
		oCdNm				:	"rdIpbSaCdNmDtl",
		oBegDt				:	"",
		oEndDt				:	"",
		oLanDivRcd		:	"",
		func 					:  function(){
		}
	}];
	
	// 팝업 내부사용 변수
	var moStdCcsPLimitGroup = {
		controlId 						: "",
		openedByChange			: false,
		skipOnChange				: false,
		// 선택가능 범위를 제한
		strGrpCd						: "",
		strGrpNm						: "",
		strKeyDate						: "",

		// 선택열 결과 리턴
		Result : {
			GRP_CD					: "",	
			GRP_NM					: ""
		}
	};
	
	/**
	 * @desc import 헤더 초기화
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 4. 12
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		// import 헤더 초기화
		doHeaderOnLoad();
	};
	
	/**
	 * @desc onLoad 실행
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 12
	 */
	moPage.onModelConstructDone_StdCcsPLimitGroup = function() {
		// 리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["rptCcsPermitLimitGroup", "rptCcsPermitLimitGroupSub"]);
		// 검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grpData", "grpDataDtl"]);
				
		// 호출한 페이지에서 파라미터 받기.
		doParentGet();
		
		// 화면 온로드
		doOnLoad();
	};
	
	/**
	 * @desc 호출한 페이지에서 파라미터 받기
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 12
	 */
	function doParentGet() {
		
		if(ExtPopUp.isPopUp()) {
			
			// 호출한 페이지에서 파라미터 받기.													
			var voStdCcsPLimitPopup =  ExtPopUp.getParentVal("moStdCcsPLimitGroup");
			
			// 파라미터  값복사 (deep copy)
			for (var key in voStdCcsPLimitPopup) {
				if (key == "Result") {
					// 결과 값은 복사하지 않음.
					continue;
				}
				moStdCcsPLimitGroup [key] = voStdCcsPLimitPopup [key];
			}
			
			// 팝업이 뜬후에는 false로 고침.
			voStdCcsPLimitPopup.openedByChange = false;
		}
	};
	
	/**
	 * @desc 검색조건 및 코드값 세팅
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 12
	 */
	function doOnLoad() {
		
		// 파라미터 받아서 초기 검색조건 세팅.
		var voParam = moStdCcsPLimitGroup;
		// 그룹코드
		if (!ValueUtil.isNull(voParam.strGrpCd)) {
			util.Control.setValue(app, "ipbGrpCd", voParam.strGrpCd);
		}
		
		// 그룹명
		if (!ValueUtil.isNull(voParam.strGrpNm)) {
			util.Control.setValue(app, "ipbGrpNm", voParam.strGrpNm);
		}
		
		// 기준일자
		if (!ValueUtil.isNull(voParam.strKeyDate)) {
			util.DataMap.setValue(app, "dmReqKey", "strKeyDate", voParam.strKeyDate);
		}
		
		if(!voParam.controlId.startsWith("btn")){
			if (voParam.strGrpCd || voParam.strGrpNm) {
				util.Header.clickSearch(app);
			}else {
				// 그룹코드 포커싱
				util.Control.setFocus(app, "ipbGrpCd");
			}
		}else {
			// 그룹코드 포커싱
			util.Control.setFocus(app, "ipbGrpCd");
		}
	};
	
	/**
	 * @desc [ipbGrpCd]그룹코드 onKeyDown 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 12
	 */
	moPage.onKeyDown_IpbGrpCd = function(strKeyType, strKeyStatus) {
		if(e.keyCode == cpr.events.KeyCode.ENTER){
			util.Header.clickSearch(app);
		}
	};
	
	/**
	 * @desc [ipbGrpCd]그룹명 onKeyDown 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 12
	 */
	moPage.onKeyDown_IpbGrpNm = function(strKeyType, strKeyStatus) {
		if(e.keyCode == cpr.events.KeyCode.ENTER){
			util.Header.clickSearch(app);
		}
	};
	
	/**
	 * @desc [btnSearch]조회 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 12
	 */
	moPage.onClick_BtnSearch = function() {

		doList(function(pbSuccess) {
			// 조회 : "조회되었습니다." header 메세지 표시
			if (pbSuccess) util.Msg.notify(app, "NLS.INF.M024");
		});
	};
	
	/**
	 * @desc 그룹목록 조회
	 * @param poCallBackFunc 콜백정의
	 * @return void
	 * @author 박갑수 at 2016. 4. 12
	 */
	function doList(poCallBackFunc) {
		// 디테일 리피트 변경시 변경내역 체크 방지
		util.Control.redraw(app, "grdCcsPermitLimitGroupSub");
		
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdCcsPermitLimitGroup");
				
				// 마스터에 데이터가 없을 경우 디테일 입력 불가
				if(util.Grid.getRowCount(app, "grdCcsPermitLimitGroup") < 1){
					util.Control.setEnable(app, false,["grpDataDtl"]);
					util.Control.reset(app, "rptCcsPermitLimitGroupSub");
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
	 * @author 박갑수 at 2016. 4. 12
	 */
	function doMstRptStatus(){
		if(util.Grid.isModified(app, "grdCcsPermitLimitGroup")){
			util.Control.setEnable(app, false, ["grpDataDtl"]);
		}else{
			util.Control.setEnable(app, true, ["grpDataDtl"]);
		}
	};

	/**
	 * @desc 디테일 데이터의 변경내역이 존재여부에 따른 마스터 활성/비활성
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 12
	 */
	function doDtlRptStatus(){
		if(util.Grid.isModified(app, "grdCcsPermitLimitGroupSub")){
			util.Control.setEnable(app, false, ["grpData"]);
		}else{
			util.Control.setEnable(app, true, ["grpData"]);
		}
	};
	
	/**
	 * @desc [btnNew]신규 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 12
	 */
	moPage.onClick_BtnNew = function() {
		// 신규로우 추가
		var vnIdx = util.Grid.insertRow(app, "grdCcsPermitLimitGroup", "rdIpbGrpCd");
		
		// 마스터 데이터의 변경내역에 따른 디테일 활성/비활성
		doMstRptStatus();
	};
	
	/**
	 * @desc [btnDel]삭제 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 12
	 */
	moPage.onClick_BtnDel = function() {
		// 삭제
		util.Grid.deleteRow(app, "grdCcsPermitLimitGroup");
		// 마스터 데이터의 변경내역에 따른 디테일 활성/비활성
		doMstRptStatus();
	};
	
	/**
	 * @desc [btnRestore]작업취소 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 12
	 */
	moPage.onClick_BtnRestore = function() {
		// 작업취소
		util.Grid.restoreRow(app, "grdCcsPermitLimitGroup");
		// 마스터 데이터의 변경내역에 따른 디테일 활성/비활성
		doMstRptStatus();
	};
	
	/**
	 * @desc [btnSave]작업저장 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 12
	 */
	moPage.onClick_BtnSave = function() {
		// 작업저장
		doSave();
	};
	
	/**
	 * @desc 그룹목록 변경사항 저장
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 12
	 */
	function doSave() {
		
		// 리피트 변경사항 체크
		if(!util.Grid.isModified(app, ["grdCcsPermitLimitGroup"], "MSG")){
			return false;
		}
		
		// 리피트 Validation Check		
		if(!util.validate(app, "grdCcsPermitLimitGroup")) return false;
		
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
	 * @desc [rptCcsPermitLimitGroup]그룹목록 onRowSelect 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 12
	 */
	moPage.onRowSelect_RptCcsPermitLimitGroup = function() {
		// 마스터 신규일경우 평가요소목록 초기화
		if(util.Grid.getRowState(app, "grdCcsPermitLimitGroup") == cpr.data.tabledata.RowState.INSERTED){
			util.Control.reset(app, "rptCcsPermitLimitGroupSub");
			return false;
		}
		
		// 그룹별 학사부서목록 조회
		doListDtl();
	};
	
	/**
	 * @desc 그룹별 학사부서목록 조회
	 * @param poCallBackFunc 콜백정의
	 * @return void
	 * @author 박갑수 at 2016. 4. 12
	 */
	function doListDtl(poCallBackFunc) {
		// 참조키
		util.DataMap.setValue(app, "dmReqKey", "strSelGrpCd", util.Grid.getCellValue(app, "grdCcsPermitLimitGroup", "GRP_CD"));
		
		//strCommand: listSub 
		util.Submit.send(app, "subListDtl", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdCcsPermitLimitGroupSub");
				
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
	 * @author 박갑수 at 2016. 4. 12
	 */
	moPage.onClick_BtnNewDtl = function() {
		// 신규로우 추가
		var vnIdx = util.Grid.insertRow(app, "grdCcsPermitLimitGroupSub", "rdIpbSaCdNmDtl");
		
		var vsGrpCd = util.DataMap.getValue(app, "dmReqKey", "strSelGrpCd");
		// 그룹코드 : 마스터 그룹코드
		util.Grid.setCellValue(app, "grdCcsPermitLimitGroupSub", "GRP_CD", vsGrpCd);
		
		// 디테일 리피트 상태에 따른 마스터 활성화 제어
		doDtlRptStatus();
	};
	
	/**
	 * @desc [btnDelDtl]삭제 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 12
	 */
	moPage.onClick_BtnDelDtl = function() {
		// 삭제
		util.Grid.deleteRow(app, "grdCcsPermitLimitGroupSub");
		// 마스터 데이터의 변경내역에 따른 디테일 활성/비활성
		doDtlRptStatus();
	};
	
	/**
	 * @desc [btnRestoreDtl]작업취소 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 12
	 */
	moPage.onClick_BtnRestoreDtl = function() {
		// 작업취소
		util.Grid.restoreRow(app, "grdCcsPermitLimitGroupSub");
		// 마스터 데이터의 변경내역에 따른 디테일 활성/비활성
		doDtlRptStatus();
	};
	
	/**
	 * @desc [btnSaveDtl]작업저장 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 12
	 */
	moPage.onClick_BtnSaveDtl = function() {
		// 작업저장
		doSaveDtl();
	};
	
	/**
	 * @desc 평가요소목록 변경사항 저장
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 12
	 */
	function doSaveDtl() {
		
		// 리피트 변경사항 체크
		if(!util.Grid.isModified(app, ["grdCcsPermitLimitGroupSub"], "MSG")){
			return false;
		}
		
		// 리피트 Validation Check		
		if(!util.validate(app, "grdCcsPermitLimitGroupSub")) return false;
		
		// 학사부서 중복체크
		if(!doCheckDup()){
			return false;
		}
		
		//strCommand: save 
		util.Submit.send(app, "subSave", function(pbSuccess){
			if(pbSuccess){
				doListDtl(function(pbListSuccess) {
					// 조회 : "갱신된 데이터가 조회되었습니다." header 메세지 표시
					if (pbListSuccess) util.Msg.notify(app, "NLS.INF.M025");
				});
			}
		});
	};
	
	/**
	 * @desc 데이터 중복 체크 - 학사부서 중복 확인
	 * @param 
	 * @return boolean
	 * @author 박갑수 at 2016. 4. 12
	 */
	function doCheckDup() {
		// 유효성 true or false
		var vbValid = true;
		
		// 리피트 ID
		var vsRptId = "rptCcsPermitLimitGroupSub";
		// 리피트 RowCnt
		var vnRowCnt 	= util.Grid.getRowCount(app, vsRptId);		
		
		for (var i = 1; i <= vnRowCnt; i++) {
			
			var vsUptStatusOri = util.Grid.getCellValue(app, vsRptId, "UPT_STATUS", i);
			// 삭제일경우 Skip
			if (vsUptStatusOri == "D") continue;
			
			var vsSaCdOri = util.Grid.getCellValue(app, vsRptId, "SA_CD", i);		// 학사부서코드
			
			for (var j = 1; j <= vnRowCnt; j++) {
				// 같은 row일경우 Skip
				if (i == j) continue;
				
				var vsUptStatus = util.Grid.getCellValue(app, vsRptId, "UPT_STATUS", j);
				// 삭제일경우 Skip
				if (vsUptStatus == "D") continue;
				
				var vsSaCd = util.Grid.getCellValue(app, vsRptId, "SA_CD", j);		// 비교값 : 학사부서코드
				
				// 중복체크
				if (vsSaCdOri == vsSaCd) {
					var vsTitle = util.Grid.getTitle(app, "grdCcsPermitLimitGroupSubCcsPermitLimitGroupSub");
					var vsSaTitleNm = ExtControl.getTextValue("rhBtnSaCdNmDtl");
					var vsSaNm = util.Grid.getCellValue(app, vsRptId, "SA_CD_NM", j);
					// "@1 @2에 중복된 @3(이)가 있습니다." 메시지
					util.Msg.alert("NLS-CCS-M019", [vsTitle, vsSaTitleNm, vsSaNm]);
					ExtRepeat.setColFocus(vsRptId, j, "rdIpbSaCdNmDtl");
					vbValid = false;
					return vbValid;
				}
			}
		}
		
		return vbValid;
	};
	
	/**
	 * @desc [btnAply]일괄적용 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 12
	 */
	moPage.onClick_BtnAply = function(sender) {
		if(ValueUtil.isNull(util.Grid.getCheckOrSelectedRowIndex(app, "grdCcsPermitLimitGroup"))){
			// 선택된 데이터가 없습니다.
			ComMsg.warn("M008");
			return false;
		}
		
		// 객체검색팝업 호출
		doOnClickStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc 하위 학사부서목록 조회
	 * @param poCallBackFunc 콜백정의
	 * @return void
	 * @author 박갑수 at 2016. 4. 12
	 */
	function doSaList(poCallBackFunc) {
		//strCommand: saBatchApply 
		util.Submit.send(app, "subSaList", function(pbSuccess){
			if(pbSuccess){
			}
			
			// 조회 후 콜백함수 수행
			if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess); 
		});
	};
	
	/**
	 * @desc [rhCkbSelectDtl]패널 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 12
	 */
	moPage.onValueChanged_RhCkbSelectDtl = function() {
		// 리피트 패널 설정
//TO-BE: <ExtRepeat.selectedAllPanel> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.selectedAllPanel("rhCkbSelectDtl");
	};
	
	/**
	 * @desc [rdBtnSaCdNmDtl]학사부서명 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 7
	 */
	moPage.onClick_RdBtnSaCdNmDtl = function(sender) {
		// 객체검색팝업 호출
		doOnClickStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc [rdIpbSaCdNmDtl]학사부서명 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 7
	 */
	moPage.onValueChanged_RdIpbSaCdNmDtl = function(sender) {
		// 값변경시 객체검색팝업 호출
		doOnChangeStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc [rdIpbSaCdDtl]학사부서코드 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 7
	 */
	moPage.onValueChanged_RdIpbSaCdDtl = function(sender) {
		// 값변경시 객체검색팝업 호출
		doOnChangeStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc [rptCcsPermitLimitGroup]그룹목록 onDoubleClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 7
	 */
	moPage.onDoubleClick_RptCcsPermitLimitGroup = function() {
		// 선택닫기 함수
		doCloseOk();
	};
	
	/**
	 * @desc [btnCloseOk]선택닫기 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 7
	 */
	moPage.onClick_BtnCloseOk = function() {
		// 선택닫기 함수
		doCloseOk();
	};
	
	/**
	 * @desc [btnCloseCancel]화면닫기 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 7
	 */
	moPage.onClick_BtnCloseCancel = function() {
		// 팝업 닫기
		app.close();
	};

	/**
	 * @desc 부모페이지 리턴
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 7
	 */
	function doCloseOk(){
		// 리피터 변경사항 체크
		if(util.Grid.isModified(app, ["grdCcsPermitLimitGroup", "grdCcsPermitLimitGroupSub"])){
			// "변경된 사항이 있습니다. 작업저장 혹은 취소 후 실행해 주시기 바랍니다." 메시지
			util.Msg.alert("NLS-WRN-M014");
			
			return false;
		}
		
		var voResult = moStdCcsPLimitGroup.Result;
		
		if(ValueUtil.isNull(util.Grid.getCheckOrSelectedRowIndex(app, "grdCcsPermitLimitGroup"))){
			// 선택된 데이터가 없습니다.
			ComMsg.warn("M008");
			return false;
		}
		
		var vnIdx = util.Grid.getIndex(app, "grdCcsPermitLimitGroup");
		
		voResult.GRP_CD				= util.Grid.getCellValue(app, "grdCcsPermitLimitGroup", "GRP_CD", vnIdx);
		voResult.GRP_NM			    = util.Grid.getCellValue(app, "grdCcsPermitLimitGroup", "GRP_NM" , vnIdx);
		
		ExtPopUp.closeLayeredPopup("callbackStdCcsPLimitGroup", moStdCcsPLimitGroup);
	};
	
	return moPage;
};
