//공통 모듈 사용
var util = new ComUtil(app);
/*
 * Body에서 load 이벤트 발생 시 호출. 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */e) {
	util.Submit.send(app, "subOnLoad", function(pbSuccess) {
		if (pbSuccess) {
			// 콤보박스에 선행데이터로 들어가있는 0번째 행("전체")가 선택 됨
			util.SelectCtl.selectItem(app, "cbbSmtGrpCd", 0);
			// 콤보박스를 갱신 후 다시 그린다.
			util.Control.redraw(app, "cbbSmtGrpCd");
		}
	}, true);
}

/**
 * @desc 조회 event
 * @param poCallBackFunc 조회 후 callback함수
 * @return void
 */
function doList(poCallBackFunc) {
	util.Submit.send(app, "subList", function(pbSuccess) {
		if (pbSuccess) {
			// poCallBackFunc가 null이 아니고 타입이 함수이면
			if (util.isFunc(poCallBackFunc)) {
				poCallBackFunc(pbSuccess);
			}
		}
	});
}

/**
 * @desc 작업저장 event
 * @return void
 */
function doSave() {
	// 그리드의 변경사항 유/무를 반환
	if (!util.Grid.isModified(app, "grdCmnConfSmtGrp", "MSG")) {
		return false;
	}
	// 그리드 유효성 검증
	if (!util.validate(app, "grdCmnConfSmtGrp")) {
		return false;
	}
	util.Submit.send(app, "subSave", function(pbSuccess) {
		if (pbSuccess) {
			doList(function(pbListSuccess) {
				if (pbListSuccess) {
					// "갱신된 데이터가 조회되었습니다." 메시지 출력
					util.Msg.notify(app, "NLS-INF-M025");
				}
			});
		}
	});
}

/*
 * 사용자 정의 컨트롤에서 search 이벤트 발생 시 호출.
 */
function onBtnsearchSearch(/* cpr.events.CUIEvent */e) {
	/**
	 * @type udc.com.btnSearch
	 */
	var btnsearch = e.control;
	// 데이터 변경상태 체크 메시지(기본, 임베디드 앱 존재 할 경우 isChangedFormData())
	if (util.Grid.isModified(app, "grdCmnConfSmtGrp", "CRM")) {
		return false;
	}

	doList(function(pbSuccess) {
		if (pbSuccess) {
			util.Msg.notify(app, "NLS-INF-M024");
		}
	});
}

/*
 * 사용자 정의 컨트롤에서 save 이벤트 발생 시 호출.
 */
function onGrid_ids_btn1Save(/* cpr.event.CUIEvent */e) {
	/**
	 * @type udc.com.grid_IDS_Btn
	 */
	var grid_ids_btn1 = e.control;
	// 위에서 정의한 함수 호출
	doSave();
}

/*
 * 사용자 정의 컨트롤에서 insert 이벤트 발생 시 호출.
 */
function onGrid_ids_btn1Insert(/* cpr.event.CUIEvent */e) {
	/**
	 * @type udc.com.grid_IDS_Btn
	 */
	var grid_ids_btn1 = e.control;

	// 그리드에 선택된 행을 가져온다.
	var vnRowIndex = util.Grid.getIndex(app, "grdCmnConfSmtGrp");

	// 선택된 체크박스 값 가져온다.
	var vsValue = util.SelectCtl.getValue("cbbSmtGrpCd");
	if(vsValue != "%"){
		// 체크박스 값과 행을 이용하여 그리드에서 "SMT_GRP_RCD" 값 을 셋팅한다.
		util.Grid.setCellValue(app, "grdCmnConfSmtGrp", "SMT_GRP_RCD", vsValue, vnRowIndex);
	}
}

/*
 * 사용자 정의 컨트롤에서 delete 이벤트 발생 시 호출.
 */
//function onGrid_ids_btn1Delete(/* cpr.event.CUIEvent */e) {
	/**
	 * @type udc.com.grid_IDS_Btn
	 */
//	var grid_ids_btn1 = e.control;

	//로직 삭제 되었다고 함
//	var vsPanelCheckIdx = ExtRepeat.getSelIdxOrFRowIdx("rptCmnConfSmtGrp");
//	var vaPanelChk = vsPanelCheckIdx.split(",");
	
//	for( var i = 0 ; i < vaPanelChk.length ; i++){
//		var vsStdYn = ExtRepeat.getValue("rptCmnConfSmtGrp", "STD_YN", vaPanelChk[i]);
//		var vsRowStatus = ExtRepeat.getRowStatusChk("rptCmnConfSmtGrp", vaPanelChk[i]);
//		
//		if(vsRowStatus != "insert" && vsStdYn == "Y"){
//			ComMsg.alert(NLS.CMM.M002);
//			return false;
//		}
//	}
//	ExtRepeat.deleteRow("rptCmnConfSmtGrp");
//}
