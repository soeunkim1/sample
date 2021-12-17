var util = new ComUtil(app);

//날짜 체크에서 실패 시 이전값으로 돌리기위해 바꾸기 전 저장해 놓는 변수
var msOrgStDt = "";
var msOrgEndDt = "";
var msOrgStTime = "";
var msOrgEndTime = "";

/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	//프로그램ID로 모듈을 구분하여 공통이 아닌 모듈은 해당 모듈의 시스템만 검색할 수 있도록 제어
	var vsMenuId = util.Auth.getMenuInfo(app).get("MENU_ID").toUpperCase().substring(3, 6);
	
	if(vsMenuId != "CMN"){
		util.Control.setEnable(app, false, "cbbUnitSystemRcd");
		util.SelectCtl.selectItem(app, "cbbUnitSystemRcd", "CB001" + vsMenuId);
		
		//TODO 주석은 있으나 해당하는 소스는 없음. 어떤 동작??? 2018-04-04 HEENA
		//행위코드 필터 필요.
	}
	
	//서브미션 실행 (실패시 cover page)
	util.Submit.send(app, "subOnLoad", function(pbSuccess){
		if(pbSuccess){
			//콤보박스 redraw
			var vaComboId = ["cbbSchYearRcd",  "cbbSmtRcd", "cbbUnitSystemRcd", "cbbActRcd"];
			util.Control.redraw(app, vaComboId);
			
			//현재 학년도 설정
			var vsCurYearRcd = util.DataMap.getValue(app, "dmResOnLoad", "strCurYearRcd");
			util.SelectCtl.selectItem(app, "cbbSchYearRcd", vsCurYearRcd);
		}
	}, true);
}

/**
 * @desc 조회 실행
 * @param poCallBackFunc
 * @return void
 */
function doList(poCallBackFunc){
	util.Submit.send(app, "subList", function(pbSuccess) {
		if(pbSuccess){
			util.Control.redraw(app, "grdCmnSchedule");
			if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
		}
	});
}

/**
 * @desc 저장 실행
 * @return void
 */
function doSave() {

	//그리드 변경사항 체크
	if(!util.Grid.isModified(app, "grdCmnSchedule","MSG")){
		return false;
	}
	//그리드 유효성 검증
	if(!util.validate(app, "grdCmnSchedule")){
		return false;
	}
	
	util.Submit.send(app, "subSave", function(pbSuccess){
		if(pbSuccess){
			doList(function(pbListSuccess){
				if(pbListSuccess){
					// MSG : 갱신된 데이터가 조회되었습니다. header 메시지 표시
					util.Msg.notify(app, "NLS-INF-M025");
					// 조회된 데이터 건 수 반영을 위해 그리드 타이틀 redraw
				}
			});
		}
	});
}

/**
 * @desc 신규 입력시 조회조건의 값으로 기본값 설정
 * @param pnInsIdx 신규입력 로우의 인덱스
 * @return 
 */
function setKeyValueForInsert(pnInsIdx){
	
	var vsSchYearRcd = util.DataMap.getValue(app, "dmReqList", "strSchYearRcd"); // 학년도
	var vsSmtRcd = util.DataMap.getValue(app, "dmReqList", "strSmtRcd"); // 학기
	var vsUnitSystemRcd = util.DataMap.getValue(app, "dmReqList", "strUnitSystemRcd"); // 시스템구분
	var vsActRcd = util.DataMap.getValue(app, "dmReqList", "strActRcd"); // 행위코드
	var vsDeptCd = util.DataMap.getValue(app, "dmReqList", "strDeptCd"); // 부서코드
	var vsObjDivRcd = util.DataMap.getValue(app, "dmReqList", "strObjDivRcd"); // 객체구분코드
	var vsDeptNm = util.DataMap.getValue(app, "dmReqList", "strDeptNm"); 	// 부서코드
	
	var vsMenuId = util.Auth.getMenuInfo(app).get("MENU_ID").toUpperCase().substring(3, 6);
	
	if(vsMenuId != "CMN"){
		util.Grid.setCellValue(app, "grdCmnSchedule", "PRP1", "CB001" + vsMenuId, pnInsIdx);
	}else{
		util.Grid.setCellValue(app, "grdCmnSchedule", "PRP1", vsUnitSystemRcd, pnInsIdx);
	}
	
	util.Grid.setCellValue(app, "grdCmnSchedule", "SCH_YEAR_RCD", vsSchYearRcd, pnInsIdx);
	util.Grid.setCellValue(app, "grdCmnSchedule", "SMT_RCD", vsSmtRcd, pnInsIdx);
	util.Grid.setCellValue(app, "grdCmnSchedule", "ACT_RCD", vsActRcd, pnInsIdx);

	//2018-04-04 HEENA : TOP_OBJ_INFO 사용 X -> 조회조건이 있을 경우, 조회조건과 동일. 없을 경우 null값
	util.Grid.setCellValue(app, "grdCmnSchedule", "DEPT_CD", ValueUtil.isNull(vsDeptCd) ? null : vsDeptCd, pnInsIdx);
	util.Grid.setCellValue(app, "grdCmnSchedule", "OBJ_DIV_RCD", ValueUtil.isNull(vsObjDivRcd) ? null : vsObjDivRcd, pnInsIdx);
	util.Grid.setCellValue(app, "grdCmnSchedule", "DEPT_CD_NM", ValueUtil.isNull(vsDeptNm) ? null : vsDeptNm, pnInsIdx);
	util.Grid.setCellValue(app, "grdCmnSchedule", "ST_TIME", "000000", pnInsIdx);
	util.Grid.setCellValue(app, "grdCmnSchedule", "END_TIME", "235959", pnInsIdx);
}

/**
 * @desc 날짜 체크에서 실패 시 이전값으로 돌리기위해 날짜, 시간을 변수에 복사한다.
 * @param pnInsIdx 
 * @return 
 */
function copyDateBeforeChange(){
	
	var vnIdx = util.Grid.getIndex(app, "grdCmnSchedule");
	
	msOrgStDt = util.Grid.getCellValue(app, "grdCmnSchedule", "ST_DT", vnIdx);
	msOrgEndDt = util.Grid.getCellValue(app, "grdCmnSchedule", "END_DT", vnIdx);
	msOrgStTime = util.Grid.getCellValue(app, "grdCmnSchedule", "ST_TIME", vnIdx);
	msOrgEndTime = util.Grid.getCellValue(app, "grdCmnSchedule", "END_TIME", vnIdx);
}

/*
 * 사용자 정의 컨트롤에서 insert 이벤트 발생 시 호출.
 */
function onGrid_ids_btn1Insert(/* cpr.event.CUIEvent */ e){
	/** 
	 * @type udc.com.grid_IDS_Btn
	 */
	var grid_ids_btn1 = e.control;
	var vnInsIdx = util.Grid.getIndex(app, "grdCmnSchedule");
	setKeyValueForInsert(vnInsIdx);
}

/*
 * 사용자 정의 컨트롤에서 save 이벤트 발생 시 호출.
 */
function onGrid_ids_btn1Save(/* cpr.event.CUIEvent */ e){
	/** 
	 * @type udc.com.grid_IDS_Btn
	 */
	var grid_ids_btn1 = e.control;
	doSave();
}

/*
 * "조회" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnSearchClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnSearch = e.control;
	
	if(util.Grid.isModified(app, "grdCmnSchedule", "CRM")){
		return false;
	}
	
	//조회 실행
	doList(function(pbSuccess){
		if (pbSuccess){ 
			// MSG : 조회되었습니다. header 메시지 표시
			util.Msg.notify(app, "NLS-INF-M024");
		}
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
		/** @type udc.com.btnSearch*/	
		var btnSearch = app.lookup("btnSearch");
		btnSearch.click();
	}
}
