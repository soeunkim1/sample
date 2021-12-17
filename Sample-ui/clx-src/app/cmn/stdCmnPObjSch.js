var util = new ComUtil(app);
var initValue;


var vaObjDivRcd =  ["CC009DG","CC009OT", "CC009OG", "CC009SA", "CC009SP", "CC009CU"];

var moObjType = {
		CC009OG : "CC009OG",
		CC009SA : "CC009SA",
		CC009SP : "CC009SP",
		CC009CU : "CC009CU",
		CC009SB : "CC009SB",
		CC009OT : "CC009OT",  // for.외부부서추가  2011-12-27. by.Park ju wan
		CC009DG : "CC009DG"  // for.학위추가  2011-11-23. by.Oh hyun teak
	};

var moObjDivRcdName = {};



/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	
	
	var voMenuInfo = util.Auth.getMenuInfo(app);
	util.DataMap.setValue(app, "dmReqKey", "strOprtRoleId", voMenuInfo.get("OPRT_ROLE_ID"));
	util.DataMap.setValue(app, "dmReqKey", "authRngRcd", voMenuInfo.get("AUTH_RNG_RCD"));
	
	initValue = app.getHostProperty("initValue");
	
	util.DataMap.setValue(app, "dmReqKey", "strOtDivRcd", initValue.otDivRcd);
	util.DataMap.setValue(app, "dmReqKey", "strOtIsTreeView", initValue.otIsTreeView);
	
	
	util.DataMap.setValue(app, "dmReqKey", "strObjCd", initValue.strObjCd);
	util.DataMap.setValue(app, "dmReqKey", "strObjNm", initValue.strObjNm);
	
	
	util.DataMap.setValue(app, "dmReqKey", "strKeyDate", initValue.strKeyDate);
	util.DataMap.setValue(app, "dmReqKey", "strKeyEndDate", initValue.strKeyEndDate);
	
	util.DataMap.setValue(app, "dmReqKey", "strStartObject", initValue.strStartObject);
	util.DataMap.setValue(app, "dmReqKey", "strKeyEndDate", initValue.strKeyEndDate);
	util.DataMap.setValue(app, "dmReqKey", "strBetweenEndDtYn", initValue.strBetweenEndDtYn);
	
	//학위 검색 시 트리버튼 숨김 
	if( initValue.objDivRcd.indexOf("CC009DG") != -1 || ( initValue.objDivRcd.indexOf("CC009OT") != -1 &&  initValue.otIsTreeView != "Y"))
	{
		//todo...탭 버튼 숨김
		//ExtControl.setVisible(false,"tbtTree");
	}else{
		//ExtControl.setVisible(true,"tbtTree");
	}
	
	util.Submit.send(app, "subOnLoad", function(pbSuccess){
		
		if(pbSuccess){
			util.DataMap.setValue(app, "dmReqKey", "strObjDivRcd", initValue.objDivRcd);
			
			if(ValueUtil.isNull(app.getAppProperty("iLanDivRcd"))){
				util.DataMap.setValue(app, "dmReqKey", "strLanDivRcd", util.getDefaultLocale(app));
			}else{
				util.DataMap.setValue(app, "dmReqKey", "strLanDivRcd", initValue.lanDivRcd);
			}
			// 검색어가 입력되어 있는 경우 바로 검색 실행
			if (initValue.strObjNm) {
				// 검색 실행.
				onBtnSearchClick();
			} else {
				
				if(initValue.objDivRcd.indexOf("CC009OT") != -1 &&  initValue.otIsTreeView != "Y"){
					//2015.11.18 hyunteak 외부부서 팝업시 자동조회 부분 수정
					//doList();
					//ExtModel.dispatch("btnSearch","DOMActivate");
					onBtnSearchClick();
				}else if(initValue.objDivRcd.indexOf("CC009DG") != -1 &&  initValue.otIsTreeView != "Y"){
					onBtnSearchClick();
					//ExtModel.dispatch("btnSearch","DOMActivate");
				}else{
					util.Tab.setSelectedTabItem(app, "fldMst", 2);//doListTrv();
				}
			}
		}
		
	});
}

/**
 * @desc  doList (검색탭 조회) 	
 * @return void
 * @author canlay38 2015. 7. 2.
 */
function doList() {
	
	
	util.Tab.setSelectedTabItem(app, "fldMst", 1);
	
	util.Submit.send(app, "subList", function(pbSuccess){
		
		if(pbSuccess){
			util.Msg.notify(app, "NLS-INF-M024") ;
			util.Control.redraw(app, "grid_title");
			
		}
	});
};



function doListTrv(){
	util.Tab.setSelectedTabItem(app, "fldMst", 2);
	//외부부서 treeView 사용유무
	var vsOtIsTreeView = util.DataMap.getValue(app, "dmReqKey", "strOtIsTreeView");
	
	if (typeof (vaObjDivRcd) == "string") {
		vaObjDivRcd = [vaObjDivRcd];
	}
	var voCheckedObjDivRcd = new Object();
	for (var i in vaObjDivRcd) {
		switch (vaObjDivRcd [i]) {
			case moObjType.CC009OG : {
				voCheckedObjDivRcd.CC009OG = true;
				break;
			}
			case moObjType.CC009SA : {
				voCheckedObjDivRcd.CC009SA = true;
				break;
			}
			case moObjType.CC009SP : {
				voCheckedObjDivRcd.CC009SP = true;
				break;
			}
			case moObjType.CC009CU : {
				voCheckedObjDivRcd.CC009CU = true;
				break;
			}
			
			case moObjType.CC009OT : {
				voCheckedObjDivRcd.CC009OT = true;
				break;
			}
			case moObjType.CC009DG : {
				voCheckedObjDivRcd.CC009DG = true;
				break;
			}
		}
	}
	var vsToObjDivRcd = "";
	if (voCheckedObjDivRcd.CC009CU) {
		vsToObjDivRcd = moObjType.CC009CU;
	} else if (voCheckedObjDivRcd.CC009SP) {
		vsToObjDivRcd = moObjType.CC009SP;
	} else if (voCheckedObjDivRcd.CC009SA) {
		vsToObjDivRcd = moObjType.CC009SA;
	} else if (voCheckedObjDivRcd.CC009OG) {
		vsToObjDivRcd = moObjType.CC009OG;
	} else if (voCheckedObjDivRcd.CC009OT && vsOtIsTreeView == "Y") {
		vsToObjDivRcd = moObjType.CC009OT;
	}else {
		// 트리구조를 사용할수 없는 객체구분입니다.
		return false;
	}
	
	
	util.DataMap.setValue(app, "dmReqKey", "strToObjDivRcd", vsToObjDivRcd);
	
	
	util.Submit.send(app, "subListTrv", function(pbSuccess){
		
		if(pbSuccess){
			util.Control.redraw(app, "treCmnObj");
			
		}
	});
}


function doCloseOk() {
	//app.setHostProperty("returnValue", row.getRowData());
	var voResult = {
			OBJ_DIV_RCD : "",
			CD : "",
			CD_NM : "",
			ST_DT : "",
			END_DT : "",
			LAN_DIV_RCD : ""
		};	
	
	
	if(util.Tab.getSelectedId(app, "fldMst") == 1){
		
		if(util.Grid.getCheckOrSelectedRowIndex(app, "grdCmnObj") < 0){
			//선택된 데이터가 없습니다.
			util.Msg.warn("M008");
			return false;
		}
		
		voResult.OBJ_DIV_RCD = util.Grid.getCellValue(app, "grdCmnObj", "OBJ_DIV_RCD");   //객체구분코드
		voResult.CD = util.Grid.getCellValue(app, "grdCmnObj", "CD");                 //객체코드
		voResult.CD_NM = util.Grid.getCellValue(app, "grdCmnObj", "CD_NM");                  //객체명
		voResult.ST_DT = util.Grid.getCellValue(app, "grdCmnObj", "ST_DT");                 //객체사용시작일자
		voResult.END_DT = util.Grid.getCellValue(app, "grdCmnObj", "END_DT");                 //객체사용종료일자
		voResult.LAN_DIV_RCD = util.Grid.getCellValue(app, "grdCmnObj", "LAN_DIV_RCD");  //언어키
		
	}else if(util.Tab.getSelectedId(app, "fldMst") == 2){
		
		var vsTab = app.lookup("fldMst");
		
		var vsTree = app.lookup("treCmnObj");
		
		var vsValue = util.Tree.getSelectedValue(app, "treCmnObj");
		
		
		
//		vcTree.getItems().filter(function(item){
//			if(item.label.indexOf(vsValue) >-1){
//				var vsPValue = item.parentValue;
//				var vaChildItem = vcTree.getChildren(item);
//				var voParent = vcTree.getItemByValue(vsPValue);
//				getParentMenuNode(voParent);
//				vcTree.focusItem(item);
//			}
//			return false;
//		});
		
		if(vsValue == null){
			//선택된 데이터가 없습니다.
			util.Msg.warn("M008");
			return false;
		}	
		
		
		var voRow = util.DataSet.findRow(app, "dsTrvCmnObj", "CKEY == " + "'" + vsValue +"'");
		
		if(voRow){
			voResult.CD = voRow.getValue("CD");                                         //객체코드
			voResult.ST_DT = voRow.getValue("ST_DT");                          //객체사용시작일자
			voResult.END_DT = voRow.getValue("END_DT");                          //객체사용종료일자
			voResult.OBJ_DIV_RCD = voRow.getValue("OBJ_DIV_RCD");          //객체구분코드
			voResult.REF_KEY = voRow.getValue("REF_KEY");                       //참조키
			voResult.LAN_DIV_RCD = voRow.getValue("LAN_DIV_RCD");         //언어키
			voResult.CD_NM = voRow.getValue("CD_NM");                           //객체명
			
		}
	}else{
		//alert("error. Invalid Tab");
		ComMsg.alert("error. Invalid Tab");
		return false;
	}	
	
	var vbSuccess = false;
	var vbSuccess1 = doCheckObjDivRcd(voResult.OBJ_DIV_RCD);
	var vbSuccess2 = doCheckLanDivRcd(voResult.LAN_DIV_RCD);
	vbSuccess = (vbSuccess1 && vbSuccess2);
	if (vbSuccess) {
		//ExtPopUp.closeLayeredPopup("callbackStdCmnPObjSch", moStdCmnPObjSch);
		app.setHostProperty("returnValue", voResult);
		app.close();
	}
	
}

/**
 * @desc   doCheckObjDivRcd (유효한 객체구분을 선택했는지 체크) 	
 * @param {String} 체크할 객체구분 코드
 * @return void
 */
function doCheckObjDivRcd(psObjDivRcd){
	var voParam = initValue;
	if (voParam && voParam.objDivRcd && voParam.objDivRcd.length >= 1 && voParam.objDivRcd != "%") {
		
		var vaValidObjDivRcd = voParam.objDivRcd.split(",");
		
		var vaNames = new Array();
		
		for (var i in vaValidObjDivRcd) {
			if (psObjDivRcd == vaValidObjDivRcd [i]) {
				// 일치하는 코드가 있다면 OK
				return true;
			}
			var vaItems = app.lookup("cbbObjDivRcd").getItemsByValue(vaValidObjDivRcd [i]);
			
			vaItems.forEach(function(vcItem){
				vaNames.push(vcItem.label);
			});
			
		}
		
		// @만 선택할 수 있습니다.
		//ComMsg.alert(MESSAGE.WRN.M019, [vaNames.join()]);
		util.Msg.warn("M009", [vaNames.join()]);
		return false;
	} else {
		// 제한조건이 없으므로 항상 OK
		return true;
	}	
}
/*
* @desc   doCheckLanDivRcd (유효한 언어키을 선택했는지 체크) 	
* @param {String} 체크할 언어키 코드
* @return void
*/
function doCheckLanDivRcd(psLanDivRcd){
	var voParam = initValue;
	if (voParam && voParam.lanDivRcd && voParam.lanDivRcd.length >= 1 && voParam.lanDivRcd  != "%") {
		var vaValidLanDivRcd = voParam.lanDivRcd.split(",");
		var vaNames = new Array();
		
		for (var i in vaValidLanDivRcd) {
			if (psLanDivRcd == vaValidLanDivRcd [i]) {
				// 일치하는 코드가 있다면 OK
				return true;
			}
			
			var vaItems = app.lookup("cbbLanDivRcd").getItemsByValue(vaValidObjDivRcd [i]);
			
			vaItems.forEach(function(vcItem){
				vaNames.push(vcItem.label);
			});
		}
		
		// @만 선택할 수 있습니다.
		//ComMsg.alert(MESSAGE.WRN.M019, [vaNames.join()]);
		util.Msg.warn("M009", [vaNames.join()]);
		return false;
	} else {
		// 제한조건이 없으므로 항상 OK
		return true;
	}
}	



/*
 * 탭 폴더에서 selection-change 이벤트 발생 시 호출.
 * Tab Item을 선택한 후에 발생하는 이벤트.
 */
function onFldMstSelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.TabFolder
	 */
	var fldMst = e.control;
	var vcTab = fldMst;
	var vcTabItem = vcTab.getSelectedTabItem();
	
	if(vcTabItem.id == 2){
		doListTrv();
	}
}

/*
 * "" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnCloseClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnClose = e.control;
	doCloseOk();
}

/*
 * 그리드에서 row-dblclick 이벤트 발생 시 호출.
 * detail이 row를 더블클릭 한 경우 발생하는 이벤트.
 */
function onGrdCmnObjRowDblclick(/* cpr.events.CGridEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grdCmnObj = e.control;
	doCloseOk();
}

/*
 * 트리에서 dblclick 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 더블 클릭할 때 발생하는 이벤트.
 */
function onTreCmnObjDblclick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Tree
	 */
	var treCmnObj = e.control;
	doCloseOk();
}



/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn2Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn2 = e.control;
	util.Tree.expandAllItems(app, "treCmnObj", true);
}







/*
 * "" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnSearchClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	doList();
	
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
	
	if (e.keyCode == 13) {
		doList();
	}
}
