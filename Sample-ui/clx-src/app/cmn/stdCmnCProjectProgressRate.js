var util = new ComUtil(app);

/******************************************************************************************************
*  단위시스템 중메뉴 조회 팝업 관련  
*******************************************************************************************************/
var moStdCmnProjectProgressRateMenuSch = [{
	iBaseDt : "",		     // 기준일자
	iBaseYoil : "",          // 기준요일
 	iUnitSystemRcd : ""  // 단위시스템
}];

/**
 * @desc 메뉴구분 콤보박스 변경 시 시스템구분 콤보박스에서 해당 메뉴구분의 하위메뉴만 표시한다.
 * @param psTabDiv  각 탭마다 사용하기 때문에 콤보박스 탭구분자를 넘겨준다.
 */
function setSystemDivListByMenuDiv(psTabDiv){
	var vsMainId = "cbbMenuDivRcd" + psTabDiv;
	var vsSubId = "cbbSystemDivRcd" + psTabDiv;
	
	var vsMainValue = util.SelectCtl.getValue(vsMainId);
	
	//TODO 테스트
	util.SelectCtl.setInsBind(vsSubId, "CD_PRP5 == '" + vsMainValue + "'");
}

/**
 * @desc doListProgress 첫번째 탭 진척현황을 조회한다.
 * @param {Function} poCallBackFunc 콜백정의
 * @return void
 */
function doListProgress(poCallBackFunc){
	util.Submit.send(app, "subListProgress", function(pbSuccess){
		if(pbSuccess){
			util.Control.redraw(app, ["grdProgress", "grdProgressDtl"]);
			
			//요약 컨트롤 리드로우
			util.Control.redraw(app, ["optPlanRate", "optCmplRate"]);
			
			//조회 후 콜백함수 수행
			if(util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
		}
	});
}

/**
 * @desc doListWeekRecord 두번째탭 주별실적목록 그리드를 동적으로 생성할 헤더 및 데이터를 조회한다.
 * @param {Function} poCallBackFunc 콜백정의
 * @return void
 */
function doListWeekRecord(poCallBackFunc){
	util.Submit.send(app, "subListWeekRecord", function(pbSuccess){
		if(pbSuccess){
			// 주별실적목록 동적리피트를 그린다.
			doDynamicGridWeekRate("grdWeekRate");
			// 주별실적목록 상세 동적리피트를 그린다.
			doDynamicGridWeekRate("grdWeekRateDtl");
			// 조회 후 콜백함수 수행
			if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess); 
		}
	});
}

/**
 * @desc  doListDevWork 세번째탭 개발현황 그리드를 동적으로 생성할 헤더 및 데이터를 조회한다.  
 * @param {Function} poCallBackFunc 콜백정의
 * @return void
 */
function doListDevWork(poCallBackFunc) {
	util.Submit.send(app, "subListDevWork", function(pbSuccess){
		if(pbSuccess){
			// 개발현황 목록 동적리피트를 그린다.
			doDynamicRepeatDevWork();
			// 조회 후 콜백함수 수행
			if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess); 
		}
	}); 
}

/**
 * @desc  doListDevCharger  네번째탭 개발상세현황 개발자별목록을 조회한다.  
 * @param {Function} poCallBackFunc 콜백정의
 * @return void
 */
function doListDevCharger(poCallBackFunc) {
	util.Submit.send(app, "subListDevCharger", function(pbSuccess){
		if(pbSuccess){
			util.Control.redraw(app, "grdDevCharger");

			// 조회 후 콜백함수 수행
			if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess); 
		}
	}); 
}

/**
 * @desc  doListDevChargerPgm  네번째탭 개발상세현황 개발자 금주차주일정목록을 조회한다.  
 * @param {Function} poCallBackFunc 콜백정의
 * @return void
 */
function doListDevChargerPgm(poCallBackFunc){
	// 개발자별 목록의 개발자명
	var vsDevChargerNm = util.Grid.getCellValue(app, "grdDevCharger", "DEV_CHARGER_NM");
	if(ValueUtil.fixNull(vsDevChargerNm) == ""){
		util.Control.reset(app, app, "grdDevChargerPgm");
		return false;
	}
	util.DataMap.setValue(app, "dmReqKeyDevChargerPgm", "strDevChargerNm", vsDevChargerNm);
	util.Submit.send(app, "subListDevChargerPgm", function(pbSuccess){
		if(pbSuccess){
			util.Control.redraw(app, "grdDevChargerPgm");
			// 조회 후 콜백함수 수행
			if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess); 
		}
	}); 
}

//삭제해야 하는 컬럼의 개수
var vnDeleteColCnt = 0;
var maDeleteWeekCol = new cpr.utils.ObjectMap();
/**
 * @desc  doDynamicGridWeekRate  두번째탭 주별현황 그리드를 동적으로 그린다.
 * @param psRptId 그리드아이디 
 * @return  void
 */
function doDynamicGridWeekRate(psGrdId){
	var vsGrdId = psGrdId;
	var vbDeletable = false;

	// 1. 컬럼 갯수를 가져온다.
	var vnLen = app.lookup("dsWeekRateHeader").getRowCount();
	
	// 2. 동적으로 추가한 컬럼을 삭제한다.
	for( var i = 0; i < vnLen ; i++){		
		// 2-1. 컬럼명
		var vsColumnName = util.DataSet.getValue(app, "dsWeekRateHeader", i, "DAY");
		var vsTopColumnName = util.DataSet.getValue(app, "dsWeekRateHeader", i, "YYMM");
		
		var vcGrdWeekRatePlanHeader = app.lookup("ghBtnPlan" + vsGrdId + vsTopColumnName + vsColumnName);
		var vcGrdWeekRateRsltHeader = app.lookup("ghBtnRslt" + vsGrdId + vsTopColumnName + vsColumnName);
		
		// 2-2. 최상위 헤더값이 있는지 확인
		if(vcGrdWeekRateRsltHeader && vcGrdWeekRatePlanHeader){
			vbDeletable = true;
		}else{
			vbDeletable = false;
		}
	}
	
	//2-3. 삭제 가능한 상태일때 뒤에서 부터 삭제
	if(vbDeletable == true){
		for(var j = maDeleteWeekCol.get(vsGrdId) ; j > 0 ; j--){
			app.lookup(vsGrdId).deleteColumn(j);
		}
		//ObjectMap 초기화
		maDeleteWeekCol.remove(vsGrdId);
	}
	
	// 3. 컬럼 갯수만큼 동적그리드를 생성한다.
	// 주별실적목록 생성(header, detail)
	doCreateGrdWeekRateDetailColumn(vsGrdId);

	// 4. 리피트를 다시 그린다.
	util.Control.redraw(app, vsGrdId);
}

/**
 * @desc  doCreateGrdWeekRateDetailColumn  주별실적목록의 컬럼생성
 * @param psGrdId                 그리드 아이디 
 * @return void
 */
function doCreateGrdWeekRateDetailColumn(psGrdId){
	//1. 컬럼 추가하는 데 필요한 변수 선언
	var vnCellIdx = 7; //컬럼을 추가할 cellIndex (기준)
	var vnColCnt = 0; //YYMM의 일수(DAY) 개수
	var vnLen = app.lookup("dsWeekRateHeader").getRowCount(); //dsWeekRateHeader의 행 개수
	
	for(var i = 0 ; i < vnLen ; i++){
		var vsColNm = util.DataSet.getValue(app, "dsWeekRateHeader", i, "DAY"); //주 관련 일수
		var vsTopColNm = util.DataSet.getValue(app, "dsWeekRateHeader", i, "YYMM"); //최상위 컬럼명 (년, 월)
		var vsValue = null;	
		
		//3. 계획 및 설계 추가
		//계획 header (rowIndex : 2)
		addGrdCellConfig(2, vnCellIdx, 1, "ghBtnPlan" + psGrdId + vsTopColNm + vsColNm, "UI-GLS-DEV");
		//계획 detail (rowIndex : 0 --> null(헤더와 구분 위해서))
		vsValue = "PLAN_CNT" + (i+1);
		addGrdCellConfig(null, vnCellIdx, 1, "gdOpt" + psGrdId + vsTopColNm + vsColNm + vsValue, vsValue, "right");
		
		vnCellIdx++;
		
		//실적 header (rowIndex : 2)
		addGrdCellConfig(2, vnCellIdx, 1, "ghBtnRslt" + psGrdId + vsTopColNm + vsColNm, "UI-SCR-PERFORMANCE");
		//실적 detail (rowIndex : 0 --> null)
		vsValue = "CMPL_CNT" + (i+1);
		addGrdCellConfig(null, vnCellIdx, 1, "gdOpt" + psGrdId + vsTopColNm + vsColNm + vsValue, vsValue, "right");
		//개발 header와 실적 header (rowIndex : 2) 를 합침
		addGrdCellConfig(1, (vnCellIdx - 1), 2, "ghBtn" + psGrdId + vsTopColNm + vsColNm, vsColNm);
		
		vnColCnt++;
		
		var vnCnt = util.DataSet.findRow(app, "dsWeekRateHeader", "YYMM == '" + vsTopColNm + "'" , true).length;
		if(vnCnt == vnColCnt){
			addGrdCellConfig(0, (vnCellIdx - (vnColCnt * 2)) + 1, vnColCnt * 2, "ghBtnTop" + psGrdId + vsTopColNm, vsTopColNm);
			vnColCnt = 0;
			
			vnDeleteColCnt++;
		}
		
		vnCellIdx++;
	}
	//4. 컬럼 추가
	app.lookup(psGrdId).addColumn({
		columnLayout : vaColLayout,
		header : vaHdGrdCellConfig,
		detail : vaDtlGrdCellConfig
	});
	
	//5. 삭제 시 참조할 ObjectMap에 그리드 아이디와 삭제할 컬럼의 개수를 넣는다.
	maDeleteWeekCol.put(psGrdId, vnDeleteColCnt);
	
	//6. 초기화
	vaColLayout.length = 0;
	vaHdGrdCellConfig.length = 0;
	vaDtlGrdCellConfig.length = 0;
	vnDeleteColCnt = 0;
}

//addColumn 시 필요한 cellConfig를 저장할 변수
var vaColLayout = [];
var vaHdGrdCellConfig = [];
var vaDtlGrdCellConfig = [];

/**
 * @desc addCoulmn 시 필요한 cellConfig(columnLayout, header, detail) 구성
 * @param {number} pnRowIdx rowIndex 값
 * @param {number} pnColIdx colIndex 값
 * @param {number} pnColSpan colSpan 값
 * @param {string} psCtrlId 컨트롤의 아이디
 * @param {string} psValue 컨트롤의 값
 * @param {boolean} psTextAlign 컨트롤의 text-align 스타일
 */
function addGrdCellConfig(pnRowIdx, pnColIdx, pnColSpan, psCtrlId, psValue, psTextAlign){
	//1. 헤더 및 디테일에 들어갈 컨트롤(아웃풋) 설정
	var vsTextAlign = "center";
	var vcOutput = 
		(function(){
			//1-1. 컨트롤 아이디
			var vcControl = new cpr.controls.Output(psCtrlId);
			//1-2. 컨트롤 바인딩 혹은 값
			if(ValueUtil.isNull(pnRowIdx) == false && psValue.substring(0, 2) == "UI"){
				vcControl.bind("value").toLanguage(psValue);				
			}else if(ValueUtil.isNull(pnRowIdx) == true){
				vcControl.bind("value").toDataColumn(psValue);
			}else{				
				vcControl.value =psValue; 
			}
			//1-3. 스타일
			if(psTextAlign != vsTextAlign){
				vsTextAlign = psTextAlign; 
			}
			vcControl.style.css({
				"text-align" : psTextAlign
			});				
			return vcControl;
	})();
	
	//2. cellConfig를 변수에 담음
	if(ValueUtil.isNull(pnRowIdx) == false){
		vaHdGrdCellConfig.push({
			rowIndex : pnRowIdx,
			colIndex : pnColIdx,
			colSpan : pnColSpan,
			control : vcOutput
		});
	}else{
		vaDtlGrdCellConfig.push({
			rowIndex : 0,
			colIndex : pnColIdx,
			colSpan : pnColSpan,
			columnName : psValue,
			control : vcOutput
		});
		vaColLayout.push({
			width : "35px"
		});
	}
}

/**
 * @desc  doDynamicRepeatDevWork  세번째탭 개발현황 담당업무 리피트를 동적으로 그린다.
 * @return  void
 */
function doDynamicRepeatDevWork(){				
	// 1. 컬럼 갯수를 가져온다.
	var vnLen = app.lookup("dsDevWorkHeader").getRowCount();
	var vbDeletable = false;
	
	// 2. 컬럼 갯수만큼 for문을 통해 동적리피트를 생성한다.
	for( var i = 0; i < vnLen ; i++){		
		// 2-1. 컬럼명
		var vsColumnName = util.DataSet.getValue(app, "dsDevWorkHeader", i, "MM");
		var vsTopColumnName = util.DataSet.getValue(app, "dsDevWorkHeader", i, "YYMM");

		// 2-2. 개발현황 담당업무목록  최상위 header
		var vcGrdDevWorkHeader = app.lookup("ghBtn" + vsColumnName);
		if(vcGrdDevWorkHeader){
			vbDeletable = true;
		}else{
			vbDeletable = false;
		}
	}
	
	//colIndex가 3번째인 컬럼을 지워야 하므로 +2 해줌
	if(vbDeletable == true){
		for(var j = maDeleteWeekCol.get("grdDevWork") + 2; j > 2 ; j--){
			app.lookup("grdDevWork").deleteColumn(j);
		}
		//ObjectMap 초기화
		maDeleteWeekCol.remove("grdDevWork");
	}
	
	doCreateRptWorkDevDetailColumn();
	
	// 3. 리피트를 다시 그린다.
	util.Control.redraw(app, "grdDevWork");
}

/**
 * @desc  doCreateRptWorkDevDetailColumn  개발현황 담당업무목록의 컬럼생성
 * @return void
 */
function doCreateRptWorkDevDetailColumn(){
	//1. 초기값 설정
	var vnCellIdx = 10; //컬럼을 추가할 cellIndex (기준)
	var vnCnt = app.lookup("dsDevWorkHeader").getRowCount(); //dsDevWorkHeader의 행 개수
	
	//2. 월별일정 컬럼 추가
	for(var i = 0 ; i < vnCnt ; i++){
		var vsColNm = util.DataSet.getValue(app, "dsDevWorkHeader", i, "MM");
		var vsDtlValue = null;
		
		// 계획 및 실적 추가
		// 계획 header (rowIndex : 2)
		addGrdCellConfig(2, vnCellIdx, 1, "ghBtnMonthPlan" + vsColNm, "UI-GLS-DEV");
		// 계획 detail (rowIndex : 0)
		vsDtlValue = "MONTH_PLAN_CNT"+ (i + 1);
		addGrdCellConfig(null, vnCellIdx, 1, "gdOpt" + vsDtlValue, vsDtlValue, "right"); 
		
		vnCellIdx++;
		
		//실적 header (rowIndex : 2)
		addGrdCellConfig(2, vnCellIdx, 1, "ghBtnMonthRslt" + vsColNm, "UI-SCR-PERFORMANCE");
		// 실적 detail (rowIndex : 0 --> null)
		vsDtlValue = "MONTH_RSLT_CNT" + (i + 1);
		addGrdCellConfig(null, vnCellIdx, 1, "gdOpt" + vsDtlValue, vsDtlValue, "right");
		// 개발 header와 실적 header 합침
		addGrdCellConfig(1, (vnCellIdx - 1), 2, "ghBtn" + vsColNm, vsColNm + util.Msg.getMsg("UI-DB-MM"));
		
		if(i == (vnCnt - 1)){
			addGrdCellConfig(0, 10, vnCnt * 2, "ghBtnTopMm", "UI-SCR-MONLY_SCH");
			vnDeleteColCnt++;
		}
		vnCellIdx++;
	}
	
	//3. 소계컬럼 초기값 설정
	// 최상위 헤더타이틀 배열
	var vaArrayTopHeader = [];
	vaArrayTopHeader = ["UI-SCR-DEV_TYPE_STATIS", "UI-SCR-INCO_TYPE_STATIS", "UI-SCR-WEEK_SCHE_TYPE_STATIS", "UI-SCR-WEEK_PERF_TYPE_STATIS"];
	//컬럼 ID 배열
	var vaArrayColId = [];
	vaArrayColId = ["DEV", "UNCMPL", "THIS_DEV", "THIS"];
	
	//4. 소계컬럼 추가
	for(var j = 0 ; j < vaArrayTopHeader.length ; j++){
		//입력, 조회, 출력, 일괄, 기타 header 와 detail
		addGrdCellConfig(2, vnCellIdx, 1, vaArrayColId[j] + "_INPUT", "UI-SCR-CRUD_PGM");
		addGrdCellConfig(null, vnCellIdx, 1, "gdOpt" + vaArrayColId[j] + "_INPUT", vaArrayColId[j] + "_INPUT", "right");
		
		vnCellIdx++;
		
		addGrdCellConfig(2, vnCellIdx, 1, vaArrayColId[j] + "_SEARCH", "UI-SCR-SCH");
		addGrdCellConfig(null, vnCellIdx, 1, "gdOpt" + vaArrayColId[j] + "_SEARCH", vaArrayColId[j] + "_SEARCH", "right");
		
		vnCellIdx++;
		
		addGrdCellConfig(2, vnCellIdx, 1, vaArrayColId[j] + "_OUTPUT", "UI-GLS-PRT");
		addGrdCellConfig(null, vnCellIdx, 1, "gdOpt" + vaArrayColId[j] + "_OUTPUT", vaArrayColId[j] + "_OUTPUT", "right");
		
		vnCellIdx++;
		
		addGrdCellConfig(2, vnCellIdx, 1, vaArrayColId[j] + "_PLACE", "UI-SCR-BATCH_ALL");
		addGrdCellConfig(null, vnCellIdx, 1, "gdOpt" + vaArrayColId[j] + "_PLACE", vaArrayColId[j] + "_PLACE", "right");
		
		vnCellIdx++;
		
		addGrdCellConfig(2, vnCellIdx, 1, vaArrayColId[j] + "_ETC", "UI-GLS-ETC");
		addGrdCellConfig(null, vnCellIdx, 1, "gdOpt" + vaArrayColId[j] + "_ETC", vaArrayColId[j] + "_ETC", "right");
		
		//두번째 헤더 
		addGrdCellConfig(1, (vnCellIdx - 4), 5, "ghBtnHeaderSum"+(j+1), "");
		// 첫번째 헤더
		addGrdCellConfig(0, (vnCellIdx - 4), 5, "ghBtnHeaderTopSum"+(j+1), vaArrayTopHeader[j]);
		vnDeleteColCnt++;
		
		vnCellIdx++;
	}
	
	//5. 월별일정 컬럼과 소계 컬럼 추가
	app.lookup("grdDevWork").addColumn({
		columnLayout : vaColLayout,
		header : vaHdGrdCellConfig,
		detail : vaDtlGrdCellConfig
	});
	
	//6. 삭제 시 참조할 ObjectMap에 그리드 아이디와 삭제할 컬럼의 개수를 넣는다.
	maDeleteWeekCol.put("grdDevWork", vnDeleteColCnt);
	
	//7. 초기화
	vaColLayout.length = 0;
	vaHdGrdCellConfig.length = 0;
	vaDtlGrdCellConfig.length = 0;
	vnDeleteColCnt = 0;
	
}

/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	// 1. 리피트 초기 설정 -- 앱헤더에 설정
	// 2. 검색조건 초기 설정 -- 앱헤더에 설정
	// 3. 첫번째 탭 아이템 선택
	util.Tab.setSelectedTabItem(app, "tabMain", 1);
	
	// 4. 서브미션 실행 (실패시 cover page)
	util.Submit.send(app, "subOnLoad", function(pbSuccess){
		if(pbSuccess){
			util.Control.redraw(app, ["cbbMenuDivRcdProgress", "cbbSystemDivRcdProgress", "cbbMenuDivRcdWeek", "cbbSystemDivRcdWeek", "cbbDrawDevDivRcdWeek"]);
			util.Control.setValue(app, app, "cbbDrawDevDivRcdWeek", 10); //설계개발구분 : 설계
			
			//프로젝트 기준일자
			var vsProjectStDt = util.DataSet.getValue(app, "dsProjectPeriodList", 0, "CD_PRP1"); // 프로젝트시작일
			var vsProjectEndDt =  util.DataSet.getValue(app, "dsProjectPeriodList", 0, "CD_PRP2"); // 프로젝트종료일
			var vsBaseYoil = util.DataSet.getValue(app, "dsProjectPeriodList", 0, "CD_PRP3"); // 프로젝트 기준요일
			
			util.DataMap.setValue(app, "dmReqKey", "strProjectStDt", vsProjectStDt);
			util.DataMap.setValue(app, "dmReqKey", "strProjectEndDt", vsProjectEndDt);
			util.DataMap.setValue(app, "dmReqKey", "strBaseYoil", vsBaseYoil);
			
			var vsBaseDt = util.DataMap.getValue(app, "dmResOnLoad", "strCurDt");
			util.Control.setValue(app, app, "dipBaseDtProgress", vsBaseDt); // 첫번째탭 기준일자
			util.Control.setValue(app, app, "dipBaseDtWeek", vsBaseDt); 		// 두번째탭 기준일자
			util.Control.setValue(app, app, "dipBaseDtDevWork", vsBaseDt);  // 세번째탭 기준일자
			util.Control.setValue(app, app, "dipBaseDtDevDtl", vsBaseDt); 	 // 네번째탭 기준일자
		}
	});
}

/*
 * 그룹에서 keydown 이벤트 발생 시 호출.
 * 사용자가 키를 누를 때 발생하는 이벤트.
 */
function onGrpSearchProgressKeydown(/* cpr.events.CKeyboardEvent */ e){
	/** 
	 * @type cpr.controls.Container
	 */
	var grpSearchProgress = e.control;
	if(e.keyCode == cpr.events.KeyCode.ENTER){
		var btnSearch = app.lookup("btnSearch1");
		btnSearch.click();
	}
}

/*
 * "조회" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnSearch1Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnSearch1 = e.control;
	//필수 조회조건 체크
	if(!util.validate(app, "dipBaseDtProgress")){
		return false;
	}
	
	doListProgress(function(pbSuccess){
		//조회되었습니다.
		if(pbSuccess) util.Msg.alert("NLS-INF-M024");
	});
}



/*
 * 콤보 박스에서 selection-change 이벤트 발생 시 호출.
 * ComboBox Item을 선택하여 선택된 값이 저장된 후에 발생하는 이벤트.
 */
function onCbbMenuDivRcdProgressSelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.ComboBox
	 */
	var cbbMenuDivRcdProgress = e.control;
	setSystemDivListByMenuDiv("Progress");
}

/*
 * 그룹에서 keydown 이벤트 발생 시 호출.
 * 사용자가 키를 누를 때 발생하는 이벤트.
 */
function onGrpSearchWeekKeydown(/* cpr.events.CKeyboardEvent */ e){
	/** 
	 * @type cpr.controls.Container
	 */
	var grpSearchWeek = e.control;
	if(e.keyCode == cpr.events.KeyCode.ENTER){
		var btnSearch = app.lookup("btnSearch");
		btnSearch.click();
	}
}

/*
 * "" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnSearchClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnSearch = e.control;
	//필수 조회조건 체크
	if(!util.validate(app, ["cbbDrawDevDivRcdWekk", "dipBaseDtWeek"])){
		return false;
	}
	
	doListWeekRecord(function(pbSuccess){
		//조회되었습니다.
		if(pbSuccess) util.Msg.alert("NLS-INF-M024");
	});
}

/*
 * 그룹에서 keydown 이벤트 발생 시 호출.
 * 사용자가 키를 누를 때 발생하는 이벤트.
 */
function onGrpSearchDevKeydown(/* cpr.events.CKeyboardEvent */ e){
	/** 
	 * @type cpr.controls.Container
	 */
	var grpSearchDev = e.control;
	if(e.keyCode == cpr.events.KeyCode.ENTER){
		var btnSearch = app.lookup("btnSearchDev");
		btnSearch.click();
	}
}

/*
 * "" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnSearchDevClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnSearchDev = e.control;
	//필수 조회조건 체크
	if(!util.validate(app, "dipBaseDtDevWork")){
		return false;
	}
	
	doListDevWork(function(pbSuccess){
		//조회되었습니다
		if(pbSuccess) util.Msg.alert("NLS-INF-M024");
	});
}

/*
 * "" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnSearch2Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnSearch2 = e.control;
	//필수 조회조건 체크
	if(!util.validate(app, "dipBaseDtDevDtl")){
		return false;
	}
	
	doListDevCharger(function(pbSuccess){
		//조회되었습니다
		if(pbSuccess) util.Msg.alert("NLS-INF-M024");
	});
}

/*
 * 그룹에서 keydown 이벤트 발생 시 호출.
 * 사용자가 키를 누를 때 발생하는 이벤트.
 */
function onGrpSearchKeydown(/* cpr.events.CKeyboardEvent */ e){
	/** 
	 * @type cpr.controls.Container
	 */
	var grpSearch = e.control;
	if(e.keyCode == cpr.events.KeyCode.ENTER){
		var btnSearch = app.lookup("btnSearch2");
		btnSearch.click();
	}
}

/*
 * 콤보 박스에서 selection-change 이벤트 발생 시 호출.
 * ComboBox Item을 선택하여 선택된 값이 저장된 후에 발생하는 이벤트.
 */
function onCbbMenuDivRcdWeekSelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.ComboBox
	 */
	var cbbMenuDivRcdWeek = e.control;
	setSystemDivListByMenuDiv("Week");
}

/*
 * 인풋 박스에서 dblclick 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 더블 클릭할 때 발생하는 이벤트.
 */
function onGdIpbUnitSystemNmDtlDblclick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.InputBox
	 */
	var gdIpbUnitSystemNmDtl = e.control;
	// 진척현황목록DTL의 선택(포커스)된 인덱스를 가져온다.
	var vnIdx = util.Grid.getIndex(app, "grdProgressDtl");
	
	if(vnIdx == -1){
		// "선택된 데이터가 없습니다."
		util.Msg.warn("M008");
		return false;
	}
	
	var vsUnitSystemRcd = util.Grid.getCellValue(app, "grdProgressDtl", "UNIT_SYSTEM_RCD", vnIdx); // 단위시스템
	var vsBaseDt = util.Control.getValue(app, "dipBaseDtProgress"); // 기준일자
	var vsBaseYoil = util.DataMap.getValue(app, "dmReqKey", "strBaseYoil"); // 기준요일
	
	moStdCmnProjectProgressRateMenuSch[0].iBaseDt = vsBaseDt;
	moStdCmnProjectProgressRateMenuSch[0].iBaseYoil = vsBaseYoil;
	moStdCmnProjectProgressRateMenuSch[0].iUnitSystemRcd = vsUnitSystemRcd;
	
	util.Dialog.open(app, "app/cmn_old/cmnPProjectProgressRateMenu", 1125, 410, function(e){
		var dialog = e.control;
	}, moStdCmnProjectProgressRateMenuSch);
}
