/*공통모듈*/
var util = new ComUtil(app);

/* 사용자 정의 함수 */

/**
 * @desc 마스터의 상태가 편집상태일 경우 디테일 disabled
 */
function doMstRptStatus() {
	if (util.Grid.isModified(app, "grdCmnConfCodeCls")) {
		util.Control.setEnable(app, false, [ "grp_grdCmnConfCodeCd" ]);
	} else {
		util.Control.setEnable(app, true, [ "grp_grdCmnConfCodeCd" ]);
	}
}

/**
 * @desc 디테일 상태가 편집상태일 경우 마스터 disabled
 */
function doDtlRptStatus() {
	if (util.Grid.isModified(app, "grdCmnConfCodeCd")) {
		util.Control.setEnable(app, false, [ "grp_grdCmnConfCodeCls" ]);
	} else {
		util.Control.setEnable(app, true, [ "grp_grdCmnConfCodeCls" ]);
	}
}

var pbString = false;
/**
 * @desc ObjectMap을 {key = value} 형태로 변경
 * @param {cpr.utils.ObjectMap} poObjMap 
 * @param {boolean} (optional) pbString String형태로의 변환 여부 (default : false)
 */
function rebuildObjMap(/**@type cpr.utils.ObjecMap*/poObjMap, /**@type boolean*/pbString){
	var vaKeys = poObjMap.keys();
	var vaMap = [];
	
	for(var i = 0 ; i < poObjMap.size() ; i++){
		vaMap.push(vaKeys[i] + "=" + poObjMap.get(vaKeys[i]));
	}
	
	if(pbString == true){
		var vsMap = "{" + vaMap.join() + "}";
		return vsMap;
	}
	
	return vaMap;
}

/**
 * @desc 조회 
 * @param poCallBackFunc
 */
function doList(poCallBackFunc) {
	util.Submit.send(app, "subList", function(pbSuccess) {
		if (pbSuccess) {
			util.Control.redraw(app, "grdCmnConfCodeCls");
			// 마스터 그리드에 데이터가 없을 경우 디테일에서 입력 불가
			if (util.Grid.getRowCount(app, "grdCmnConfCodeCls") < 1) {
				util.Control.setEnable(app, false, "grp_grdCmnConfCodeCd");
				util.Control.reset(app, app, "grdCmnConfCodeCd");
			} else {
				// 컨트롤 활성화
				doMstRptStatus();
				doDtlRptStatus();
			}
		}
		if(util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
	});
}

/**
 * @desc 코드분류목록 조회
 * 			코드용도 1 ~ 10 데이터로 코드목록의 코드용도 1~10 컬럼 생성
 * 			"/" 구분자로 comboBox 생성
 */
function doListDtl() {
	if (util.Grid.getRowState(app, "grdCmnConfCodeCls") == cpr.data.tabledata.RowState.INSERTED) {
		util.Control.reset(app, app, "grdCmnConfCodeCd");
		return false;
	}

	var vsCd = util.Grid.getCellValue(app, "grdCmnConfCodeCls", "CD");
	var vsUpCd = util.Grid.getCellValue(app, "grdCmnConfCodeCls", "UCD");

	util.DataMap.setValue(app, "dmReqList", "strCdCls", vsCd);
	util.DataMap.setValue(app, "dmReqList", "strClsUpCd", vsUpCd);

	var vsStdYn = util.Grid.getCellValue(app, "grdCmnConfCodeCls", "STD_YN");
	var vsCfgYn = util.Grid.getCellValue(app, "grdCmnConfCodeCls", "CFG_YN");

	if (vsStdYn == "Y" && vsCfgYn == "Y") {
		util.Control.setVisible(app, false, [ "grid_ids_btn2" ]);
	} else {
		util.Control.setVisible(app, true, [ "grid_ids_btn2" ]);
	}

	var mapCodes = new cpr.utils.ObjectMap();
	//마스터 (코드분류목록)의 코드용도 1 ~ 10의 데이터로 디테일(코드목록)의 코드용도 1 ~ 10 컬럼의 컨트롤 type과 헤더명을 설정
	for (var i = 1; i <= 10; i++) {
		var vsCdPrpNm = "CD_PRP" + i;
		var vsCdPrpValue = util.Grid.getCellValue(app, "grdCmnConfCodeCls",
				vsCdPrpNm);
				
		//마스터(코드분류목록) 코드용도값이 "/"가 포함일 경우 코드로 매핑됨_comboBox
		if (!ValueUtil.isNull(vsCdPrpValue) && vsCdPrpValue.match("/")) {
			mapCodes.put(vsCdPrpNm, vsCdPrpValue);
			
			var vcDataSet = app.lookup("ds" + vsCdPrpNm + "_CODE");
			if(!ValueUtil.isNull(vcDataSet)){				
				app.lookup("subListDtlCode").addResponseData(vcDataSet, true);
			}
		}
	}

	util.DataMap.setValue(app, "dmReqList", "strCodes", rebuildObjMap(mapCodes, true));
	
	//코드분류목록에 해당되는 코드목록 get, 코드용도 1 ~ 10 정보 get 
	util.Submit.send(app, "subListDtlCode", function(pbSuccess) {
		if (pbSuccess) {
			var mapCdPrpsForHeader = new cpr.utils.ObjectMap();
			var vnIdx = util.Grid.getIndex(app, "grdCmnConfCodeCls");
			var isCmnConfCode = false;
			for (var i = 1; i <= 10; i++) {
				var vsCdPrpNm = "CD_PRP" + i;
				// 코드목록 header
				var vcRptcmnconfcodecdHeader = util.Control
						.lookup("ghBtnRptcmnconfcodecd" + vsCdPrpNm);
				// 코드목록 detail
				var vcRptcmnconfcodecdDtl = util.Control
						.lookup("gdIpbRptcmnconfcodecd" + vsCdPrpNm);

				var vsCdPrpValue = util.Grid.getCellValue(app, "grdCmnConfCodeCls",
						vsCdPrpNm);
				var vsDetailCtlType;
				// 키워드 포함될 경우 --> "/CHECK" 이면 checkbox, 그 외는 combobox
				if (vsCdPrpValue.split("/").length > 1) {
					var vsType = vsCdPrpValue.split("/")[1].trim()
							.toUpperCase();
					if (ValueUtil.isNull(vsType)) {
						vsDetailCtlType = "inputbox";
					} else {
						vsDetailCtlType = vsType == "CHECK" ? "Checkbox"
								: "Combobox";
					}
				} else {
					vsDetailCtlType = "Inputbox";
				}

				// 코드목록 header와 detail 삭제
				var voHeaderColumn = util.Grid.getHeaderColumn(app, 
						"grdCmnConfCodeCd", vsCdPrpNm)[0];
				if (vcRptcmnconfcodecdHeader && vcRptcmnconfcodecdDtl) {
					app.lookup("grdCmnConfCodeCd").deleteColumn(
							voHeaderColumn.colIndex);
				}

				// 코드목록 1~10 생성(header, detail)
				createRptDetailColumn(vsCdPrpNm, vsDetailCtlType, i);

				if (!ValueUtil.isNull(vsCdPrpValue)) {
					mapCdPrpsForHeader.put(vsCdPrpNm, vsCdPrpValue);
				}
			}
			
			//코드목록 헤더 text 설정
			setHeaderRptCmnConfCodeCdCtl(mapCdPrpsForHeader);
			util.Control.redraw(app, "grdCmnConfCodeCd");
			util.Submit.send(app, "subListDtl", function(pbSuccess) {
				if (pbSuccess) {
					util.Control.redraw(app, "grdCmnConfCodeCd");
				}
			});
		}
	});
}

/**
 * @desc 코드분류목록의 코드용도 1 ~ 10 데이터로 코드목록의 코드용도 1 ~ 10 헤더컬럼 textValue set
 * @param paCdPrpMap
 */
function setHeaderRptCmnConfCodeCdCtl(/**@type cpr.utils.ObjectMap*/ paCdPrpMap) {
	if (paCdPrpMap.size() > 0) {
		var vsKeys = paCdPrpMap.keys();
		for(var i = 0 ; i < vsKeys.length ; i++){
			var vsValue = paCdPrpMap.get(vsKeys[i]);
			var vcCdPrps = app.lookup("ghBtnRptcmnconfcodecd" + vsKeys[i]);
			//헤더 값을 변경하기 위해 다국어 설정 해제
			vcCdPrps.unbind("value");
			var voCdprpValues = vsValue.split("/");
			vcCdPrps.value = voCdprpValues[0];
		}
		
		//new Map() 사용하지 않아 주석 처리
//		var keySet = paCdPrpMap.keySet().iterator();
//
//		while (keySet.hasNext()) {
//			var vsKey = keySet.next();
//			var vsValue = paCdPrpMap.get(vsKey);
//			var vcCdPrps = util.Control.lookup("ghBtnRptcmnconfcodecd" + vsKey);
//			//헤더 값을 변경하기 위해 다국어 설정 해제
//			vcCdPrps.unbind("value");
//			var voCdprpValues = vsValue.split("/");
//			vcCdPrps.value = voCdprpValues[0];
//		}
	}
}

/**
 * @desc 코드분류목록의 코드용도 1 ~ 10 데이터로 코드목록의 코드용도 1 ~ 10 컬럼 생성
 * @param psColumnNm
 * @param psColumnType
 * @param pnIdx
 */
function createRptDetailColumn(psColumnNm, psColumnType, pnIdx) {
	var output = (function(){
		var output = new cpr.controls.Output("ghBtnRptcmnconfcodecd" + psColumnNm);
		output.value = "코드용도" + pnIdx;
		output.bind("value").toLanguage("UI-DB-"+psColumnNm);
		output.bind("tooltip").toLanguage("UI-DB-"+psColumnNm);
		return output;
	})();
	if (psColumnType == "Combobox") {
		app.lookup("grdCmnConfCodeCd").addColumn(
				{
					columnLayout : [ {
						width : "140px"
					} ],
					header : [ {
						rowIndex : 0,
						colIndex : 29,
						colSpan : 1,
						control : output
					} ],
					detail : [ {
						rowIndex : 0,
						colIndex : 29,
						colSpan : 1,
						rowSpan : 1,
						columnName : psColumnNm,
						sortColumnName : psColumnNm,
						control : (function() {
							var comboBox = new cpr.controls.ComboBox(
									"gdIpbRptcmnconfcodecd" + psColumnNm);
							(function(comboBox) {
								comboBox.addItem(new cpr.controls.Item("", ""));
								comboBox.setItemSet(app
										.lookup("ds" + psColumnNm + "_CODE"), {
									label : "CD_NM",
									value : "CD"
								})
							})(comboBox);
							if (comboBox.isBindable("value")) {
								comboBox.bind("value").toDataColumn(
										psColumnNm);
							}
							return comboBox;
						})()
					} ]
				});
	} else if (psColumnType == "Checkbox") {
		app.lookup("grdCmnConfCodeCd").addColumn(
				{
					columnLayout : [ {
						width : "140px"
					} ],
					header : [ {
						rowIndex : 0,
						colIndex : 29,
						colSpan : 1,
						control : output
					} ],
					detail : [ {
						rowIndex : 0,
						colIndex : 29,
						colSpan : 1,
						rowSpan : 1,
						columnName : psColumnNm,
						sortColumnName : psColumnNm,
						control : (function() {
							var checkBox = new cpr.controls.CheckBox(
									"gdIpbRptcmnconfcodecd" + psColumnNm);
							checkBox.text = "";
							checkBox.trueValue = "Y";
							checkBox.style.css({
								"text-align" : "center"
							});
							if (checkBox.isBindable("value")) {
								checkBox.bind("value").toDataColumn(
										psColumnNm);
							}
							return checkBox
						})()
					} ]
				});
	} else {
		app.lookup("grdCmnConfCodeCd").addColumn(
				{
					columnLayout : [ {
						width : "140px"
					} ],
					header : [ {
						rowIndex : 0,
						colIndex : 29,
						colSpan : 1,
						control : output,
						sortColumnName : psColumnNm
					} ],
					detail : [ {
						rowIndex : 0,
						colIndex : 29,
						colSpan : 1,
						rowSpan : 1,
						columnName : psColumnNm,
						control : (function() {
							var inputBox = new cpr.controls.InputBox(
									"gdIpbRptcmnconfcodecd" + psColumnNm);
							if (inputBox.isBindable("value")) {
								inputBox.bind("value").toDataColumn(
										psColumnNm);
							}
							return inputBox;
						})()
					} ]
				});
	}
	util.Control.redraw(app, "grdCmnConfCodeCd");
}

/**
 * @desc 작업저장
 * 			코드분류목록(마스터), 코드목록(디테일) 저장
 * @param poCallBackFunc
 */
function doSave(poCallBackFunc) {
	// 그리드에 변경 사항이 있는지 체크
	 if(!util.Grid.isModified(app, "grdCmnConfCodeCls", "MSG")){
		 return false;
	 }

	// 그리드에서 필수값 체크
	if (!util.validate(app, "grdCmnConfCodeCls")) {
		return false;
	}

	util.Submit.send(app, "subSave", function(pbSuccess) {
		if (pbSuccess) {
			if (util.Grid.isModified(app, "grdCmnConfCodeCd")) {
				util.Control.redraw(app, "grdCmnConfCodeCd");
			}

			doList(function(pbListSuccess) {
				if (pbListSuccess)
					util.Msg.alert("NLS-INF-M025");
				if (util.isFunc(poCallBackFunc))
					poCallBackFunc(pbListSuccess);
			});
		}
	});
}

/**
 * @desc 작업저장
 * 			코드분류목록(마스터), 코드목록(디테일) 저장
 * @param poCallBackFunc
 */
function doSaveDtl(poCallBackFunc) {
	if(!util.Grid.isModified(app, "grdCmnConfCodeCd", "MSG")){
		return false;
	}

	if (!util.validate(app, [ "grdCmnConfCodeCd" ]))
		return false;

	util.Submit.send(app, "subSaveDtl", function(pbSuccess) {
		if (pbSuccess) {
			util.Submit.send(app, "subListDtl", function(pbSuccess) {
				if (pbSuccess) {
					util.Control.redraw(app, "grdCmnConfCodeCd");
					doDtlRptStatus();
					util.Msg.alert("NLS-INF-M025");
				}
			});
		}
	});
}

/*
 * Body에서 load 이벤트 발생 시 호출. 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */e) {
	// 언어가 한국어가 아닐 경우 visible false
	if(util.getDefaultLocale(app) != "CS003KR"){
		app.lookup("lblCont").visible = false;		
	}
	
	//체크박스그룹 데이터맵 바인딩 관련 오류로 null 값으로 초기화
	util.DataMap.setValue(app, "dmReqList", "strCfgYn", null);

	util.Submit.send(app, "subOnLoad", function(pbSuccess) {
		if (pbSuccess) {
			util.Control.redraw(app, [ "cbbUnitSystemRcd", "cbbCdCls" ]);
			
			// 프로그램 ID로 모듈을 구분하여 공통이 아닌 모듈은 해당 모듈의 시스템만 검색할 수 있도록 제어
			var vsMenuId = util.Auth.getMenuInfo(app).get("MENU_ID").toUpperCase().substring(3, 6);
			
			if(vsMenuId != "CMN"){
				util.Control.setEnable(app, false, "cbbUnitSystemRcd");
				util.SelectCtl.setValue(app, "cbbUnitSystemRcd", "CB001" + vsMenuId);
			}
		}
	}, false);
}

/*
 * 콤보 박스에서 selection-change 이벤트 발생 시 호출. ComboBox Item을 선택하여 선택된 값이 저장된 후에 발생하는
 * 이벤트.
 */
function onCbbUnitSystemRcdSelectionChange(/* cpr.events.CSelectionEvent */e) {
	/**
	 * @type cpr.controls.ComboBox
	 */
	var cbbUnitSystemRcd = e.control;
	// 단위시스템의 콤보박스 바뀌었을 때 해당 콤보박스 Value에 따른 코드구분 콤보박스를 구성
//	if (util.SelectCtl.getValue("cbbUnitSystemRcd") == "") {
//		util.Control.lookup("dsCdClsList").clearFilter();
//		return false;
//	}
//해당 콤보박스 컨트롤의 fiterExp 속성으로 변경 필요...
	util.SelectCtl.cascadeList("cbbUnitSystemRcd", "cbbCdCls",
			"UNIT_SYSTEM_RCD");
}

/*
 * 사용자 정의 컨트롤에서 search 이벤트 발생 시 호출.
 */
function onBtnSearchSearch(/* cpr.events.CUIEvent */e) {
	/**
	 * @type udc.com.btnSearch
	 */
	var btnSearch = e.control;

	if(util.Grid.isModified(app, ["grdCmnConfCodeCls", "grdCmnConfCodeCd"], "CRM")){
		return false;
	}

	doList(function(pbSuccess) {
		if (pbSuccess) {
			util.Msg.alert("NLS-INF-M024");
		}
	});
}

/*
 * 그리드에서 selection-change 이벤트 발생 시 호출. detail의 cell 클릭하여 설정된 selectionunit에 해당되는
 * 단위가 선택될 때 발생하는 이벤트.
 */
function onGrdCmnConfCodeClsSelectionChange(/* cpr.events.CSelectionEvent */e) {
	/**
	 * @type cpr.controls.Grid
	 */
	var grdCmnConfCodeCls = e.control;
	//조회조건을 클릭했을 때 clearSelection 하면서 selection-change 발생해 선택행이 없을 경우 조회하지 않도록 함 
	if(util.Grid.getIndex(app, "grdCmnConfCodeCls") == -1){
		return false;
	}
	
	doListDtl();
}

/*
 * 사용자 정의 컨트롤에서 insert 이벤트 발생 시 호출.
 */
function onGrid_ids_btn1Insert(/* cpr.event.CUIEvent */ e){
	/** 
	 * @type udc.com.grid_IDS_Btn
	 */
	var grid_ids_btn1 = e.control;
	
	//새로 추가된 그리드에 값 설정
	var vnIdx = util.Grid.getIndex(app, "grdCmnConfCodeCls");
	
	util.Grid.setCellValue(app, "grdCmnConfCodeCls", "LAN_DIV_RCD", util.getSystemLocale(app), vnIdx);
	util.Grid.setCellValue(app, "grdCmnConfCodeCls", "CD_CLS", "CFG", vnIdx);
	util.Grid.setCellValue(app, "grdCmnConfCodeCls", "UNIT_SYSTEM_RCD", util.SelectCtl.getValue("cbbUnitSystemRcd"), vnIdx);
	util.Grid.setCellValue(app, "grdCmnConfCodeCls", "EFFT_ST_DT", 19000101, vnIdx);
	util.Grid.setCellValue(app, "grdCmnConfCodeCls", "EFFT_END_DT", 99991231, vnIdx);
	
	//마스터 그리드 상태에 따른 디테일 제어
	doMstRptStatus();
}

/*
 * 사용자 정의 컨트롤에서 restore 이벤트 발생 시 호출.
 */
function onGrid_ids_btn1Restore(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type udc.com.grid_IDS_Btn
	 */
	var grid_ids_btn1 = e.control;
	var vsRowState = util.Grid.getRowState(app, "grdCmnConfCodeCls");
	util.Grid.revertRowData(app, "grdCmnConfCodeCls");
	if(vsRowState != cpr.data.tabledata.RowState.INSERTED){
		doListDtl();		
	}
	doMstRptStatus();
}



/*
 * 사용자 정의 컨트롤에서 delete 이벤트 발생 시 호출.
 */
function onGrid_ids_btn1Delete(/* cpr.event.CUIEvent */ e){
	/** 
	 * @type udc.com.grid_IDS_Btn
	 */
	var grid_ids_btn1 = e.control;
	var vsStdYn = util.Grid.getCellValue(app, "grdCmnConfCodeCls", "STD_YN");
	var vsCfgYn = util.Grid.getCellValue(app, "grdCmnConfCodeCls", "CFG_YN");
	
	var vsRowState = util.Grid.getRowState(app, "grdCmnConfCodeCls");
	
	if(vsRowState != cpr.data.tabledata.RowState.INSERTED && vsCfgYn == "Y"){
		util.Msg.alert("NLS-CMM-M040");
		return false;
	}
	
	var vsTitleCls = util.Grid.getTitle(app, "grdCmnConfCodeCls");
	var vsTitleCd = util.Grid.getTitle(app, "grdCmnConfCodeCd");
	var vnDtlRowCnt = util.Grid.getRowCount(app, "grdCmnConfCodeCd");
	
	if(vnDtlRowCnt > 0){
		util.Msg.warn("M196", [vsTitleCls, vsTitleCd, vsTitleCd]);
		return false;
	}
	
	util.Grid.deleteRow(app, "grdCmnConfCodeCls");
	
	//마스터 리피터 상태에 따른 디테일 제어
	doMstRptStatus();
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
 * 사용자 정의 컨트롤에서 insert 이벤트 발생 시 호출.
 */
function onGrid_ids_btn2Insert(/* cpr.event.CUIEvent */ e){
	/** 
	 * @type udc.com.grid_IDS_Btn
	 */
	var grid_ids_btn2 = e.control;
	
	// 기본값 설정
	var vnIdx = util.Grid.getIndex(app, "grdCmnConfCodeCd");
	
	var vsCdCls = util.Grid.getCellValue(app, "grdCmnConfCodeCls", "CD");
	var vsUnitSystemRcd = util.Grid.getCellValue(app, "grdCmnConfCodeCls", "UNIT_SYSTEM_RCD");
	var vsStDt =  util.Grid.getCellValue(app, "grdCmnConfCodeCls", "EFFT_ST_DT");
	var vsEndDt =  util.Grid.getCellValue(app, "grdCmnConfCodeCls", "EFFT_END_DT");
	var vsCfgYn =  util.Grid.getCellValue(app, "grdCmnConfCodeCls", "CFG_YN");
	
	util.Grid.setCellValue(app, "grdCmnConfCodeCd", "CD_CLS", vsCdCls, vnIdx);
	util.Grid.setCellValue(app, "grdCmnConfCodeCd", "CD", vsCdCls, vnIdx);
	util.Grid.setCellValue(app, "grdCmnConfCodeCd", "UNIT_SYSTEM_RCD", vsUnitSystemRcd, vnIdx);
	util.Grid.setCellValue(app, "grdCmnConfCodeCd", "EFFT_ST_DT", vsStDt, vnIdx);
	util.Grid.setCellValue(app, "grdCmnConfCodeCd", "EFFT_END_DT", vsEndDt, vnIdx);
	util.Grid.setCellValue(app, "grdCmnConfCodeCd", "CFG_YN", vsCfgYn, vnIdx);
	util.Grid.setCellValue(app, "grdCmnConfCodeCd", "LAN_DIV_RCD", util.getSystemLocale(app), vnIdx);
	
	// 마스터 리피터 상태에따른 디테일 제어
	doDtlRptStatus();
}



/*
 * 사용자 정의 컨트롤에서 delete 이벤트 발생 시 호출.
 */
function onGrid_ids_btn2Delete(/* cpr.event.CUIEvent */ e){
	/** 
	 * @type udc.com.grid_IDS_Btn
	 */
	var grid_ids_btn2 = e.control;
	var vsCheckIdx = util.Grid.getCheckOrSelectedRowIndex(app, "grdCmnConfCodeCd");
	
	for( var i = 0 ; i < vsCheckIdx.length ; i++ ){
		var vsStdYn = util.Grid.getCellValue(app, "grdCmnConfCodeCd", "STD_YN", vsCheckIdx[i]);
		var vsCfgYn = util.Grid.getCellValue(app, "grdCmnConfCodeCd", "CFG_YN", vsCheckIdx[i]);
		var vsRowState = util.Grid.getRowState(app, "grdCmnConfCodeCd", vsCheckIdx[i]);
		
		if(vsRowState != cpr.data.tabledata.RowState.INSERTED && vsStdYn == "Y"){
			util.Msg.alert("NLS-CMM-M002");
			return false;
		}
	}
	
	util.Grid.deleteRow(app, "grdCmnConfCodeCd");
	//디테일 그리드 상태에 따른 마스터 제어
	doDtlRptStatus();
}

/*
 * 사용자 정의 컨트롤에서 restore 이벤트 발생 시 호출.
 */
function onGrid_ids_btn2Restore(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type udc.com.grid_IDS_Btn
	 */
	var grid_ids_btn2 = e.control;
	//디테일 그리드 상태에 따른 마스터 제어
	doDtlRptStatus();
}

/*
 * 사용자 정의 컨트롤에서 save 이벤트 발생 시 호출.
 */
function onGrid_ids_btn2Save(/* cpr.event.CUIEvent */ e){
	/** 
	 * @type udc.com.grid_IDS_Btn
	 */
	var grid_ids_btn2 = e.control;
	doSaveDtl();
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
	if (e.keyCode == cpr.events.KeyCode.ENTER) {
		var btnSearch = app.lookup("btnSearch");
		btnSearch.click();
	}
}

/*
 * 그리드에서 selection-change 이벤트 발생 시 호출.
 * detail의 cell 클릭하여 설정된 selectionunit에 해당되는 단위가 선택될 때 발생하는 이벤트.
 */
function onGrdCmnConfCodeCdSelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grdCmnConfCodeCd = e.control;
	doDtlRptStatus();
}

/*
 * 그리드에서 update 이벤트 발생 시 호출.
 * Grid의 행 데이터가 수정되었을 때 이벤트.
 */
function onGrdCmnConfCodeClsUpdate(/* cpr.events.CGridEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grdCmnConfCodeCls = e.control;
	doMstRptStatus();
}

/*
 * 그리드에서 update 이벤트 발생 시 호출.
 * Grid의 행 데이터가 수정되었을 때 이벤트.
 */
function onGrdCmnConfCodeCdUpdate(/* cpr.events.CGridEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grdCmnConfCodeCd = e.control;
	doDtlRptStatus();
}
