//공통 모듈 사용
var util = new ComUtil(app);

/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad( /* cpr.events.CEvent */ e) {
	
	//서브미션 실행 (실패시 cover page)
	util.Submit.send(app, "subOnLoad", function(pbSuccess) {
		if (pbSuccess) {
			// 콤보박스컨트롤 리빌드
			util.Control.redraw(app, "cbbCurAplyYear");

			// 룰셋명컨트롤 포커스
			util.Control.setFocus(app, "ipbRuleSetNm");
		}
	}, true);
} //onBodyLoad()

/*
 * "" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnSearchClick( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btnSearch = e.control;

	// 데이터 변경상태 체크 메시지(기본, 임베디드 앱 존재 할 경우 isChangedFormData())
	if (util.Grid.isModified(app, "grdCmnRuleSet", "CRM")) {
		return false;
	} else {
		if(util.Grid.getIndex(app, "grdCmnRuleSet") != -1 ){
			util.Grid.revertAllData(app, "grdCmnRuleSet");
		}
	}

	// 조회조건 필수체크 : 교과과정적용학년도, 부서명 
	if (!util.validate(app, ["cbbCurAplyYear", "cmnobjsch1"])) {
		return false;
	}
	doList(function(pbSuccess) {
		// 조회 : "조회되었습니다." header 메세지 표시
		if (pbSuccess) {
			//seletRows를 하므로 동일한 메세지 발생
			util.Control.redraw(app, "grdCmnRuleEle");
			var vnCnt = util.Grid.getRowCount(app, "grdCmnRuleEle");
			if(vnCnt > 0){
				util.Grid.selectRow(app, "grdCmnRuleEle", 0);
			}
		}
	});
} //onBtnSearchClick()

function doList(poCallBackFunc) {
	// 조회 서브미션 호출
	util.Submit.send(app, "subList", function(pbSuccess) {
		if (pbSuccess) {
			util.Control.redraw(app, "grdCmnRuleEle");
			var vnCnt = util.Grid.getRowCount(app, "grdCmnRuleEle");
			//마스터에 데이터가 없을 경우 디테일 입력 불가
			if (vnCnt == -1) {
				util.Control.setEnable(app, false, "grpDataDtl");
				util.Control.reset(app, app, "grdCmnRuleSet");
			}
			// 조회 후 콜백함수 수행
			if (util.isFunc(poCallBackFunc)) {
				poCallBackFunc(pbSuccess);
			}
		}
	});
} //doList()

/**
 * @desc   룰셋목록 rowselect event
 *         구성요소목록 조회한다.
 * @return void
 */
function doListMstRowSelectDtl(vsRuleEleIndex) {
	// 구성요소변경내역이 있을 경우
	if (util.Grid.isModified(app, "grdCmnRuleSet", "CRM")) {
		util.Grid.selectRow(app, "grdCmnRuleEle", util.Grid.getIndex(app, "grdCmnRuleEle"));
		return false;
	}
	// 룰셋목록에서 선택된 행으로 구성요소목록 조회
	doListDtl(function(pbSuccess) {
		// 조회 : "조회되었습니다." header 메세지 표시
		if (pbSuccess) {
			util.Msg.notify(app, "NLS-INF-M024");
			util.Control.redraw(app, "grdCmnRuleSet");
		}
	});
} //doListMstRowSelectDtl()

/**
 * @desc   구성요소를 조회한다. (룰셋목록 rowSelect시, 작업저장시)
 * @param {Object} 서브미션 실행 후 처리될 콜백 함수 
 */
function doListDtl(poCallBackFunc) {
	// 룰셋목록의 선택한 룰셋코드를 조회조건 인스턴스 set
	var vnCmnRulEleRow = util.Grid.getIndex(app, "grdCmnRuleEle");
	var vsRuleSetCd = util.Grid.getCellValue(app, "grdCmnRuleEle", "CD");
	if(vnCmnRulEleRow == -1){
		vsRuleSetCd = util.Grid.getCellValue(app, "grdCmnRuleEle", "CD",0);
	}
	util.DataMap.setValue(app, "dmReqListRuleSet", "strRuleSetCd", vsRuleSetCd)

	util.Submit.send(app, "subListDtl", function(pbSuccess) {
		if (pbSuccess) {
			// 조회 후 콜백함수 수행
			if (util.isFunc(poCallBackFunc)) {
				poCallBackFunc(pbSuccess);
			}
		}
	});
} //doListDtl()

/*
 * 그리드에서 selection-change 이벤트 발생 시 호출.
 * detail의 cell 클릭하여 설정된 selectionunit에 해당되는 단위가 선택될 때 발생하는 이벤트.
 */
function onGrdCmnRuleEleSelectionChange( /* cpr.events.CSelectionEvent */ e) {
	/** 
	 * @type cpr.controls.Grid
	 */
	var grdCmnRuleEle = e.control;
	
	if(util.Grid.getIndex(app, "grdCmnRuleEle") == -1){
		return false;
	}
	
	var vsRuleEleIndex = util.Grid.getIndex(app, "grdCmnRuleEle");
	doListMstRowSelectDtl(vsRuleEleIndex);
} //onGrdCmnRuleEleSelectionChangel()

/*
 * 사용자 정의 컨트롤에서 insert 이벤트 발생 시 호출.
 */
function onGrid_ids_btn1Insert( /* cpr.event.CUIEvent */ e) {
	/** 
	 * @type udc.com.grid_IDS_Btn
	 */
	var grid_ids_btn1 = e.control;
	doInsertCmnRuleSet();
} //onGrid_ids_btn1Insert()

function doInsertCmnRuleSet() {
	// 1. 신규행 추가후 룰요소명 컬럼 포커스 
	var vnNewIdx = util.Grid.getIndex(app, "grdCmnRuleSet");
	// 2. 기본신규데이터 set
	// 룰셋목록의 선택한 룰셋코드
	var vsRuleSetCd = util.Grid.getCellValue(app, "grdCmnRuleEle", "CD");

	// 조회조건 : 부서코드
	var vsDeptCd = util.DataMap.getValue(app, "dmReqList", "strDeptCd");

	// 조회조건 : 부서객체구분코드
	var vsObjDivRcd = util.DataMap.getValue(app, "dmReqList", "strObjDivRcd");
	// 조회조건 : 교과과정학년도
	var vsCurAplyYear = util.DataMap.getValue(app, "dmReqList", "strCurAplyYear");

	// 숨김컬럼
	util.Grid.setCellValue(app, "grdCmnRuleSet", "RULE_SET_CD", vsRuleSetCd, vnNewIdx);
	util.Grid.setCellValue(app, "grdCmnRuleSet", "DEPT_CD", vsDeptCd, vnNewIdx);
	util.Grid.setCellValue(app, "grdCmnRuleSet", "OBJ_DIV_RCD", vsObjDivRcd, vnNewIdx);
	util.Grid.setCellValue(app, "grdCmnRuleSet", "SCH_YEAR_RCD", vsCurAplyYear, vnNewIdx);
} //doInsertCmnRuleSet()

/*
 * 사용자 정의 컨트롤에서 save 이벤트 발생 시 호출.
 */
function onGrid_ids_btn1Save( /* cpr.event.CUIEvent */ e) {
	/** 
	 * @type udc.com.grid_IDS_Btn
	 */
	var grid_ids_btn1 = e.control;
	doSave();
} //onGrid_ids_btn1Save()

function doSave() {
	// 그리드 변경사항 체크
	if (!util.Grid.isModified(app, "grdCmnRuleSet", "MSG")) {
		return false;
	}
	//그리드 유효성 검증
	if (!util.validate(app, "grdCmnRuleSet")) {
		return false;
	}

	//	var vnCnt = ExtRepeat.rowCount("rptCmnRuleSet");
	var vnCnt = util.Grid.getRowCount(app, "grdCmnRuleSet");

	for (var i = 0; i < vnCnt; i++) {
		var vsOprOperatorCd = util.Grid.getCellValue(app, "grdCmnRuleSet", "CPR_OPERATOR_CD", i);

		var vsCprVal2 = util.Grid.getCellValue(app, "grdCmnRuleSet", "CPR_VAL_2", i);

		var vsRowStatus = util.Grid.getRowState(app, "grdCmnRuleSet", i);
		if (vsRowStatus != cpr.data.tabledata.RowState.INSERTED) {
			continue;
		}

		// 비교연산자 CMN0306 => Between일 경우
		if (vsOprOperatorCd == "CMN0306") {
			if (ValueUtil.isNull(vsCprVal2)) {
				util.Msg.warn("M100", ["비교연산자가 BETEEN인 경우 비교값2"]);
				app.lookup("grdCmnRuleSet").focusCell(i, "CPR_VAL_2");
				return false;
			}
		}
	}

	util.Submit.send(app, "subSave", function(pbSuccess) {
		if (pbSuccess) {
			doListDtl(function(pbListSuccess) {
				if (pbListSuccess) {
					// "갱신된 데이터가 조회되었습니다." 메시지 출력
					util.Msg.notify(app, "NLS-INF-M025");
				}
			});
		}
	});
} //doSave()

function doCprOperatorCdFilter() {
	var vsRuleEmtId = util.Grid.getCellValue(app, "grdCmnRuleSet", "RULE_EMT_ID");

// 	룰요소의 리턴타입
	var vsRtrnType = app.lookup("dsRuleEleList").findFirstRow("RULE_EMT_ID=='" + vsRuleEmtId + "'");

// 	리턴타입이 '비숫자'인 경우 비교연산자 필터링
	if (!ValueUtil.isNull(vsRtrnType) && vsRtrnType.getString("RTRN_TYPE_CD") == "CMN0402") {
		util.SelectCtl.setInsBind("gdCbbCprOperatorCd", "CD_PRP1=='CMN0402'");
	} else {
		util.SelectCtl.setInsBind("gdCbbCprOperatorCd", "CD_CLS=='CMN03'");
	}
	util.Control.redraw(app, "gdCbbCprOperatorCd");
}

/*
 * 콤보 박스에서 selection-change 이벤트 발생 시 호출.
 * ComboBox Item을 선택하여 선택된 값이 저장된 후에 발생하는 이벤트.
 */
function onGdCbbRuleEmtIdSelectionChange( /* cpr.events.CSelectionEvent */ e) {
	/** 
	 * @type cpr.controls.ComboBox
	 */
	var gdCbbRuleEmtId = e.control;
	doCprOperatorCdFilter();
}//onGdCbbRuleEmtIdSelectionChange()

/*
 * 그리드에서 selection-change 이벤트 발생 시 호출.
 * detail의 cell 클릭하여 설정된 selectionunit에 해당되는 단위가 선택될 때 발생하는 이벤트.
 */
function onGrdCmnRuleSetSelectionChange( /* cpr.events.CSelectionEvent */ e) {
	/** 
	 * @type cpr.controls.Grid
	 */
	var grdCmnRuleSet = e.control;
	doCprOperatorCdFilter();
}//onGrdCmnRuleSetSelectionChange()

/*
 * 콤보 박스에서 selection-change 이벤트 발생 시 호출.
 * ComboBox Item을 선택하여 선택된 값이 저장된 후에 발생하는 이벤트.
 */
function onGdCbbCprOperatorCdSelectionChange( /* cpr.events.CSelectionEvent */ e) {
	/** 
	 * @type cpr.controls.ComboBox
	 */
	var gdCbbCprOperatorCd = e.control;
	var vsCprOperatorCd = util.Grid.getCellValue(app, "grdCmnRuleSet", "CPR_OPERATOR_CD");
	// 비교연산자가 Between인 경우 비교값2를 빈값으로 리셋한다. -> 바인드에 따라 disable이 되기 때문에 리셋처리함.
	if (ValueUtil.fixNull(vsCprOperatorCd) == "CMN0306") {
		util.Grid.setCellValue(app, "grdCmnRuleSet", "CPR_VAL_2", "");
	}
	util.Control.redraw(app, "gdCbbCprOperatorCd");
} //onGdCbbCprOperatorCdSelectionChange()

/*
 * 사용자 정의 컨트롤에서 searchCallBack 이벤트 발생 시 호출.
 */
function onCmnobjsch1SearchCallBack(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type udc.cmn.cmnObjSch
	 */
	var cmnobjsch1 = e.control;
//	var vsDeptCd = ExtControl.getValue("ipbDeptNm");
	var vsDeptCd = util.Control.getValue(app, "cmnobjsch1");			
	if(ValueUtil.fixNull(vsDeptCd) == "") {
		util.DataMap.setValue(app, "dmReqList", "strObjDivRcd", "");
	}
}//onCmnobjsch1SearchCallBack()

/*
 * 인풋 박스에서 keydown 이벤트 발생 시 호출.
 * 사용자가 키를 누를 때 발생하는 이벤트.
 */
function onIpbRuleSetNmKeydown(/* cpr.events.CKeyboardEvent */ e){
	/** 
	 * @type cpr.controls.InputBox
	 */
	var ipbRuleSetNm = e.control;
	// 엔터키 입력시 조회
	if (e.keyCode == 13) {
		app.lookup("btnSearch").click();
	}
}//onIpbRuleSetNmKeydown()


/*
 * 그룹에서 keydown 이벤트 발생 시 호출.
 * 사용자가 키를 누를 때 발생하는 이벤트.
 */
function onGrpSearchKeydown(/* cpr.events.CKeyboardEvent */ e){
	/** 
	 * @type cpr.controls.Container
	 */
	var grpSearch = e.control;
	if(e.keyCode == 13){
		app.lookup("btnSearch").click();
	}
}
