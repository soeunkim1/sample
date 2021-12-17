//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCcsCProfDutyCntMng.xtm"/>

/**
 * 교원별 책임시수관리
 * @class extCcsCProfDutyCntMng
 * @author 박갑수 at 2016. 8. 30
 */
var extCcsCProfDutyCntMng = function() {
	var moPage = new Page();
	
	var moPObject = new PObject();
	
	// 객체검색팝업 호출
	moPObject.moIdsForStdCmnPObjSch = [
	{
		controlId			:	"btnOgNm",
		iCd					:	"",
		iNm					:	"ipbOgNm",
		iObjDivRcd			:	["CC009OG"],
		iStartObject    	:   "",
		iOtDivRcd			:	"",
		iOtIsTreeView	:	"",
		iLanDivRcd		:	"/root/resOnLoad/strLanDivRcd",
		iKeyDate			:	"/root/keyDateMap/END_DT",
		iKeyEndDate		:	"",
		oObjDivRcd		:	"",
		oCd					:	"/root/reqKey/strOgCd",
		oCdNm				:	"ipbOgNm",
		oBegDt				:	"",
		oEndDt				:	"",
		oLanDivRcd		:	"",
		func 					:  function(){}
	}];
	
	/**
	 * @desc import 헤더 초기화
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 8. 30
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		// import 헤더 초기화
		doHeaderOnLoad();
	};
	
	/**
	 * @desc onLoad 실행
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 8. 30
	 */
	moPage.onModelConstructDone_ExtCcsCProfDutyCntMng = function() {
				// 리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["rptExtCcsProfDuty"]);
		// 검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grpData"]);
		
		// 서브미션 호출
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				
				util.DataMap.setValue(app, "dmReqKey", "strStatusRcd", "CF00501");
				
				util.Control.redraw(app, ["cbbStaffGrpRcd", "cbbStaffSubGrpRcd", "cbbStatusRcd"]);
				
				util.Control.setFocus(app, "ipbRepNm");
			}
		}, true);
	};
	
	/**
	 * @desc [cbbStaffGrpRcd]교직원그룹 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 8. 30
	 */
	moPage.onValueChanged_CbbStaffGrpRcd = function() {
		var vsStaffGrpRcd = util.Control.getValue(app, "cbbStaffGrpRcd");
		
		//교직원그룹값에 따른 필터 처리
		if(!ValueUtil.fixNull(vsStaffGrpRcd)){
			util.Control.redraw(app, ["cbbStaffSubGrpRcd"]);
		}else{
			ExtSelectCtl.cascadeList("cbbStaffGrpRcd", "cbbStaffSubGrpRcd", "CD_PRP1");
		}
		//교직원하위그룹값에 전체값 세팅
		var vsStaffSubGrpRcd =util.Control.getValue(app, "cbbStaffSubGrpRcd");
		// 빈값("") 또는 null이 아니면 [전체]를 선택하도록 한다. 
		if (!ValueUtil.isNull(vsStaffSubGrpRcd)) {
			// 0번째 index인 [전체] 선택하도록 함.
			util.SelectCtl.selectItem(app, "cbbStaffSubGrpRcd", 0);
		}
	};
	
	/**
	 * @desc [btnOgNm]행정부서(돋보기버튼) onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 9
	 */
	moPage.onClick_BtnOgNm = function(sender) {
		// 객체검색팝업 호출
		doOnClickStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc [ipbOgNm]행정부서 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 8. 30
	 */
	moPage.onValueChanged_IpbOgNm = function(sender) {
		// 리피트 변경사항 체크
		if(util.Grid.isModified(app, ["grdExtCcsProfDuty"])){
			return false;
		}
		
		// 값변경시 객체검색팝업 호출
		doOnChangeStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc [ipbStaffNo]교직원번호 onKeyDown 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 8. 30
	 */
	moPage.onKeyDown_IpbStaffNo = function(strKeyType, strKeyStatus) {
		var vsStDt = util.Control.getValue(app, "dipStDt");
		var vsEndDt = util.Control.getValue(app, "dipEndDt");
		
		// 엔터키 입력시 조회 && 필수값 입력시조회
		if(e.keyCode == cpr.events.KeyCode.ENTER && !ValueUtil.isNull(vsStDt) && !ValueUtil.isNull(vsEndDt)){
			// 검색 실행.
			model.dispatch("btnSearch","DOMActivate");
		}
	};
	
	/**
	 * @desc [ipbRepNm]이름 onKeyDown 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 8. 30
	 */
	moPage.onKeyDown_IpbRepNm = function(strKeyType, strKeyStatus) {
		var vsStDt = util.Control.getValue(app, "dipStDt");
		var vsEndDt = util.Control.getValue(app, "dipEndDt");
		var vsRepNm	= util.Control.getValue(app, "ipbRepNm");
		
		// 엔터키 입력시 조회 && 필수값 입력시조회
		if(e.keyCode == cpr.events.KeyCode.ENTER &&  ( (!ValueUtil.isNull(vsStDt) && !ValueUtil.isNull(vsEndDt)) || !ValueUtil.isNull(vsRepNm) )   ){
			// 검색 실행.
			model.dispatch("btnSearch","DOMActivate");
		}
	};
	
	/**
	 * @desc [ckbRetireYn]정년퇴직여부 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 8. 30
	 */
	moPage.onValueChanged_CkbRetireYn = function() {
		var vsCkbRetireYn = util.Control.getValue(app, "ckbRetireYn");
		
		if(ValueUtil.isNull(vsCkbRetireYn)){
			util.Control.setValue(app, "dipStDt", "");
			util.Control.setValue(app, "dipEndDt", "");
			util.Control.setVisible(app, false, ["lblPeriod", "dipStDt", "lblDtDiv", "dipEndDt"]);
		}else {
			util.Control.setValue(app, "dipStDt", util.DataMap.getValue(app, "dmKeyDateMap", "ST_DT"));
			util.Control.setValue(app, "dipEndDt", util.DataMap.getValue(app, "dmKeyDateMap", "END_DT"));
			util.Control.setVisible(app, true, ["lblPeriod", "dipStDt", "lblDtDiv", "dipEndDt"]);
		}
	};
	
	/**
	 * @desc [ipbRepNm]재직기간(시작) onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 8. 30
	 */
	moPage.onValueChanged_DipStDt = function() {
		if(!doCheckDate("ST_DT")){
			util.Control.setValue(app, "dipStDt", "");
		}
	};
	
	/**
	 * @desc [ipbRepNm]재직기간(종료) onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 8. 30
	 */
	moPage.onValueChanged_DipEndDt = function() {
		if(!doCheckDate("END_DT")){
			util.Control.setValue(app, "dipEndDt", "");
		}
	};
	
	/**
	 * @desc 시작일이 종료일보다 크거나 종료일이 시작일보다 작은지 검사
	 * @param psColNm		(필수) 날짜컬럼명
	 * @return boolean
	 * @author 박갑수 at 2016. 8. 30
	 */
	function doCheckDate(psColNm){
		// 유효성 true or false
		var vbValid = true;

		// 시작일자
		var vsStDt = util.Control.getValue(app, "dipStLsnDt").substring(0, 8);
		// 종료일자
		var vsEndDt = util.Control.getValue(app, "dipEndLsnDt").substring(0, 8);
		
		// 시작일 유효성 체크
		if(psColNm == "ST_DT"){
			if(!ValueUtil.isNull(vsEndDt) && vsStDt > vsEndDt){
				// "시작일이 종료일 보다 클 수 없습니다." 메시지 출력
				util.Msg.alert("NLS-CSS-M063");
				vbValid = false;
				return vbValid;
			}

		// 종료일 유효성 체크
		} else if(psColNm == "END_DT"){
			if(!ValueUtil.isNull(vsStDt) && vsStDt > vsEndDt){
				util.Msg.alert("NLS-CSS-M064");
				vbValid = false;
				return vbValid;
			}
		}
		
		return vbValid;
	};
	
	/**
	 * @desc [btnSearch]조회 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 28
	 */
	moPage.onClick_BtnSearch = function() {
		// 작업영역 리피트 변경 내역 체크
		if(util.Grid.isModified(app, "", "CRM")){
			return false;
		}
		
		var vsCkbRetireYn = util.Control.getValue(app, "ckbRetireYn");
		
		if(!ValueUtil.isNull(vsCkbRetireYn)){
			if(!util.validate(app, ["dipStDt", "dipEndDt"])){
				return false;
			}
		}

		// 조회
		doList(function(pbSuccess) {
			if (pbSuccess){
				// 조회 : "조회되었습니다." header 메세지 표시
				util.Msg.notify(app, "NLS.INF.M024");
			}
		});
	};
	
	/**
	 * @desc 교원 목록 조회
	 * @param poCallBackFunc 콜백정의
	 * @return void
	 * @author 박갑수 at 2016. 8. 30
	 */
	function doList(poCallBackFunc) {
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdExtCcsProfDuty");
			}
			
			// 조회 후 콜백함수 수행
			if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
		});
	};

	/**
	 * @desc [btnRestore]작업취소 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 8. 30
	 */
	moPage.onClick_BtnRestore = function() {
		// 해당 리피트 상태 초기화
		util.Grid.restoreRow(app, "grdExtCcsProfDuty");
	};
	
	/**
	 * @desc [btnSave]작업저장 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 8. 30
	 */
	moPage.onClick_BtnSave = function() {
		// 작업저장
		doSave();
	};
	
	/**
	 * @desc 교원목록 변경사항 저장
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 8. 30
	 */
	function doSave() {
		
		// 리피트 변경사항 체크
		if(!util.Grid.isModified(app, ["grdExtCcsProfDuty"], "MSG")){
			return false;
		}

		// 리피트 Validation Check
		if(!util.validate(app, "grdExtCcsProfDuty")) return false;

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
	 * @desc [rhCkbSelect]패널 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 8. 30
	 */
	moPage.onValueChanged_RhCkbSelect = function() {
		// 리피트 패널 설정
//TO-BE: <ExtRepeat.selectedAllPanel> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.selectedAllPanel("rhCkbSelect");
	};
	
	/**
	 * @desc [rdIpbDutyTimeCnt]책임시수 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 8. 30
	 */
	moPage.onValueChanged_RdIpbDutyTimeCnt = function() {
		ValidUtil.checkIntegerDecimal("rdIpbDutyTimeCnt", 2, 0, true);
	};

	/**
	 * @desc [btnDutyTimeCnt]책임시수산정 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 8. 30
	 */
	moPage.onClick_BtnDutyTimeCnt = function() {
		// 교직원그룹
		var vsStaffGrpRcd = util.Control.getValue(app, "cbbStaffGrpRcd");
		// 상태구분
		var vsStatusRcd = util.Control.getValue(app, "cbbStatusRcd");

		if(ValueUtil.isNull(vsStaffGrpRcd) || ValueUtil.isNull(vsStatusRcd)){
			// 책임시수산정 시 조회조건의 교직원그룹, 상태구분은 필수입력 항목입니다.
			util.Msg.alert("NLS-CCS-EXT056");
		}else {
			var vsCtlNm = ExtControl.getTextValue("btnDutyTimeCnt");
			
			var vsStaffGrpRcdNm = ExtInstance.getValue("/root/resOnLoad/staffGrpRcdList/row", "CD_NM" , "child::CD='"+vsStaffGrpRcd+"'");
			var vsStatusRcdNm = ExtInstance.getValue("/root/resOnLoad/statusRcdList/row", "CD_NM" , "child::CD='"+vsStatusRcd+"'");
			
			var vsTitle = "(" + vsStaffGrpRcdNm + ", " + vsStatusRcdNm + ") " + vsCtlNm;
			
			// 책임시수산정 을(를) 처리하시겠습니까?" 메시지
			if(!util.Msg.confirm("NLS-CRM-M018", [vsTitle]) ){
				return false;
			}else {
				//strCommand: dutyCntBat 
				util.Submit.send(app, "subDutyCntBat", function(pbSuccess){
					if(pbSuccess){
						doList(function(pbListSuccess) {
							// 조회 : "갱신된 데이터가 조회되었습니다." header 메세지 표시
							if (pbListSuccess) util.Msg.notify(app, "NLS.INF.M025");
						});
					}
				});
			}
		}
	};
	return moPage;
};
