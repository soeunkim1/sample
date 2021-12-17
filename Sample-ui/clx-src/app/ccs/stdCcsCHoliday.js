//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./stdCcsCHoliday.xtm"/>

/**
 * 공휴일관리
 * @class stdCcsCBuild
 * @author 박갑수 at 2016. 2. 28
 */
var stdCcsCHoliday = function() {
	var moPage = new Page();
	
	// 학년도 학기를 원래데이터로 되돌리기위한 변수
	var msSchYearRcd = "";
	var msSmtRcd = "";
	
	/**
	 * @desc import 헤더 초기화
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 2. 28
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		// import 헤더 초기화
		doHeaderOnLoad();
	}
	
	/**
	 * @desc onLoad 실행
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 28
	 */
	moPage.onModelConstructDone_StdCcsCHoliday = function() {
		// 리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["rptCcsHoliday"]);
		// 검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grpData"]);
		
		// 서브미션 호출
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, ["cbbSchYearRcd", "cbbSmtRcd"]);
			}
		}, true);
	};
	
	/**
	 * @desc [cbbSchYearRcd]학년도 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 18
	 */
	moPage.onValueChanged_CbbSchYearRcd = function() {
		// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
		doChangeYearSmt("year");
	};
	
	/**
	 * @desc [cbbSmtRcd]학기 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 28
	 */
	moPage.onValueChanged_CbbSmtRcd = function() {
		// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
		doChangeYearSmt("smt");
	};
	
	/**
	 * @desc 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 28
	 */
	function doChangeYearSmt(psDiv) {
		//strCommand: date 
		util.Submit.send(app, "subDate", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, ["dipKeyDate"]);
				
				msSchYearRcd = util.DataMap.getValue(app, "dmKeyDateMap", "YEAR");
				msSmtRcd = util.DataMap.getValue(app, "dmKeyDateMap", "SMT");
				
			// Exception 발생시
			}else {
				if(psDiv == "year"){
					util.Control.setValue(app, "cbbSchYearRcd", msSchYearRcd);
				}else if(psDiv == "smt"){
					util.Control.setValue(app, "cbbSmtRcd", msSmtRcd);
				}
			}
		});
	};
	msSmtRcd
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
		
		// 조회조건 필수 체크
		if(!util.validate(app, ["cbbSchYearRcd", "cbbSmtRcd"])){
			return false;
		}

		// 조회
		doList(function(pbSuccess) {
			// 조회 : "조회되었습니다." header 메세지 표시
			if (pbSuccess) util.Msg.notify(app, "NLS.INF.M024");
		});
	}
	
	/**
	 * @desc 공휴일 목록 조회
	 * @param poCallBackFunc 콜백정의
	 * @return void
	 * @author 박갑수 at 2016. 2. 28
	 */
	function doList(poCallBackFunc) {
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdCcsHoliday");
			}
			
			// 조회 후 콜백함수 수행
			if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
		});
	};
	
	/**
	 * @desc [btnNew]신규 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 28
	 */
	moPage.onClick_BtnNew = function() {
		// 신규로우 추가
		var vnIdx = util.Grid.insertRow(app, "grdCcsHoliday");
		
		// 학년도 - 조회조건
		var vsSchYearRcd = util.Control.getValue(app, "cbbSchYearRcd");
		util.Grid.setCellValue(app, "grdCcsHoliday", "SCH_YEAR_RCD", vsSchYearRcd);
		
		// 학기 - 조회조건
		var vsSmtRcd = util.Control.getValue(app, "cbbSmtRcd");
		util.Grid.setCellValue(app, "grdCcsHoliday", "SMT_RCD", vsSmtRcd);
		util.Grid.setCellValue(app, "grdCcsHoliday", "SKPLC_DIV_RCD", "CL10503");
		
		
	};
	
	/**
	 * @desc [btnDel]삭제 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 28
	 */
	moPage.onClick_BtnDel = function() {
		// 해당 리피트 delete
		util.Grid.deleteRow(app, "grdCcsHoliday");
	};
	
	/**
	 * @desc [btnRestore]작업취소 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 28
	 */
	moPage.onClick_BtnRestore = function() {
		// 해당 리피트 상태 초기화
		util.Grid.restoreRow(app, "grdCcsHoliday");
	};
	
	/**
	 * @desc [btnSave]작업저장 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 28
	 */
	moPage.onClick_BtnSave = function() {
		// 작업저장
		doSave();
	};
	
	/**
	 * @desc 공휴일목록 변경사항 저장
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 28
	 */
	function doSave() {
		
		// 리피트 변경사항 체크
		if(!util.Grid.isModified(app, ["grdCcsHoliday"], "MSG")){
			return false;
		}

		// 리피트 Validation Check
		if(!util.validate(app, "grdCcsHoliday")) return false;

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
	 * @author 박갑수 at 2016. 2. 28
	 */
	moPage.onValueChanged_RhCkbSelect = function() {
		// 리피트 패널 설정
//TO-BE: <ExtRepeat.selectedAllPanel> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.selectedAllPanel("rhCkbSelect");
	};

	/**
	 * @desc [rdIpbHlyDt]일자 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 28
	 */
	moPage.onValueChanged_RdIpbHlyDt = function() {

		
		var vsHlyDt = util.Grid.getCellValue(app, "grdCcsHoliday", "HLY_DT");
		
		// 요일 찾기
		if (ValueUtil.isNull(vsHlyDt)) {
			util.Grid.setCellValue(app, "grdCcsHoliday", "DAY", "");
			return ;
		}
		
		var vsRptIndex = util.Grid.getIndex(app, "grdCcsHoliday");
		
		if(vsHlyDt.length == 8){
			util.Grid.setCellValue(app, "grdCcsHoliday", "HLY_DT", vsHlyDt + "000000", vsRptIndex);
		}
		
		/*
			일자 유효성 체크(학년도학기의 표준학기 시작일자 종료일자 사이의 일자인지 비교)
			하지만  3/2일 수요일 이지만 2/29일 시작일자로 할수 있다. 
			주석처리한다.
			2/29일 월요일, 3/1일(화)는 공휴일로 처리하여 보강하도록 한다.(특성 업무)
		*/
		/*
		if(!doCompareDate(vsHlyDt)) {
			util.Grid.setCellValue(app, "grdCcsHoliday", "DAY", "");
			util.Grid.setCellValue(app, "grdCcsHoliday", "HLY_DT", "");
			return ;
		}
		*/
		
		util.DataMap.setValue(app, "dmReqKey", "strDate", vsHlyDt);
		//strCommand: getWeekDay 
		util.Submit.send(app, "subWeekDay", function(pbSuccess){
			if(pbSuccess){
				var vsDay = util.DataMap.getValue(app, "dmResList", "strWeekName");
				if(!ValueUtil.isNull(vsDay)){
					util.Grid.setCellValue(app, "grdCcsHoliday", "DAY", vsDay, vsRptIndex);
				}else {
					util.Grid.setCellValue(app, "grdCcsHoliday", "DAY", "", vsRptIndex);
					util.Grid.setCellValue(app, "grdCcsHoliday", "HLY_DT", "", vsRptIndex);
				}
			}else {
				util.Grid.setCellValue(app, "grdCcsHoliday", "DAY", "", vsRptIndex);
				util.Grid.setCellValue(app, "grdCcsHoliday", "HLY_DT", "", vsRptIndex);
			}
		});
	};
	
	/**
	 * @desc [rdIpbSplcDt]보강일자 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 7. 15
	 */
	moPage.onValueChanged_RdIpbSplcDt = function() {
		var vsSplcDt = util.Grid.getCellValue(app, "grdCcsHoliday", "SPLC_DT");
		
		if(!ValueUtil.isNull(vsSplcDt)){
			var vsRptIndex = util.Grid.getIndex(app, "grdCcsHoliday");
		
			if(vsSplcDt.length == 8){
				util.Grid.setCellValue(app, "grdCcsHoliday", "SPLC_DT", vsSplcDt + "000000", vsRptIndex);
			}
		}
		
		//--보강일자 및 수업생성여부 둘장 하나만 입력되어야 한다.
		//page.onSplcDt_CrtYnCheck("DT");
	};
	
	/**
	 * @desc 일자 유효성 체크(학년도학기의 시작일자 종료일자 사이의 일자인지 비교)
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 28
	 */
	function doCompareDate(psDate) {
		var vbValid = true;
		
		var vsHlyDt = Number(psDate.substring(0,8));
		var vsStart = Number(util.DataMap.getValue(app, "dmKeyDateMap", "ST_DT").substring(0,8));
		var vsEnd   = Number(util.DataMap.getValue(app, "dmKeyDateMap", "END_DT").substring(0,8));
		
		if(vsEnd < vsHlyDt || vsHlyDt < vsStart) {
			
			util.Msg.alert("NLS-WRN-M142", [vsStart, vsEnd]);
			vbValid = false;
			return vbValid;
		}
		
		return vbValid;
	};
	
	/**
	 * @desc [rptCcsHoliday]공휴일목록 onRowSelect 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 2
	 */
	moPage.onRowSelect_RptCcsHoliday = function() {
		model.refreshBind("bindRptCcsHolidayUpd");
		model.refreshBind(null, "bindRptCcsHoliday");
		
	};
	
	
	
	/*
		종료일자가 있을 경우
		생성여부를 체크 할 수 없고,
		생성여부가 체크 되어 있을 경우, 종료일자를 넣을수 없다.
	*/
	moPage.onSplcDt_CrtYnCheck = function(vpCtlId) {
		
		var vnRptIndex = util.Grid.getIndex(app, "grdCcsHoliday");
		
		var vsSplcDt 	= util.Grid.getCellValue(app, "grdCcsHoliday", "SPLC_DT", vnRptIndex);
		var vsCrtYn 	= util.Grid.getCellValue(app, "grdCcsHoliday", "CRT_YN", vnRptIndex);
		
		if( "DT" == vpCtlId){
			if(!ValueUtil.isNull(vsSplcDt) && !ValueUtil.isNull(vsCrtYn)){				
				alert("보강일자와 수업생성여부 둘 중 하나만 입력되어야 합니다.");
				util.Grid.setCellValue(app, "grdCcsHoliday", "SPLC_DT", "", vnRptIndex, false, false);
			}
		}else{
			if(!ValueUtil.isNull(vsSplcDt) && !ValueUtil.isNull(vsCrtYn)){				
				alert("보강일자와 수업생성여부 둘 중 하나만 입력되어야 합니다.");
				util.Grid.setCellValue(app, "grdCcsHoliday", "CRT_YN", "", vnRptIndex, false, false);
			}
		}
		
		
		
	}
	
	
	
	
	
	
	
	moPage.onValueChanged_Checkbox1 = function() {
		//--보강일자 및 수업생성여부 둘장 하나만 입력되어야 한다.
		//page.onSplcDt_CrtYnCheck("YN");
	};
	return moPage;
};
