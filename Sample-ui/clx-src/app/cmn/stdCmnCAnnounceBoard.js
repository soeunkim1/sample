var util = new ComUtil(app);

//시작일자
var msStDt = "";
//종료일자
var msEndDt = "";


/**
 * 날짜, 구분자, 더하기 or 빼기 vsValue를 무조건 더한다.
 * @param psDate 계산대상날짜
 * @param psDiv 구분자(년 : Year, 월 : Month, 일 : Day)
 * @param psValue 계산값(양수 or 음수)
 */
function doGetDate(psDate, psDiv, psValue){
	var vsYear = psDate.substring(0, 4);
	var vsMonth = psDate.substring(4, 6);
	var vsDay = psDate.substring(6, 8);
	var vsChangeDate = "";
	
	if (psDiv == "Year") {
		vsChangeDate = new Date(vsYear + Number(psValue), vsMonth - 2, vsDay);
	} else if (psDiv == "Month") {
		vsChangeDate = new Date(vsYear, Number(vsMonth) - 1 + Number(psValue), vsDay);
		
	} else if (psDiv == "day") {
		vsChangeDate = new Date(vsYear + vsValue, vsMonth - 1, Number(vsDay) + Number(psValue));
	}
	
	var vsReYear = vsChangeDate.getFullYear();
	
	var vsReMonth = "0" + (vsChangeDate.getMonth() + 1);
	vsReMonth = vsReMonth.substring(vsReMonth.length - 2);
	
	var vsReDay = "0" + vsChangeDate.getDate();
	vsReDay = vsReDay.substring(vsReDay.length - 2);
	
	return (vsReYear + vsReMonth + vsReDay);
}

//날짜 체크에서 실패 시 이전값으로 돌리기위해 바꾸기 전 저장해 놓는 변수
var msOrgStDt = "";
var msOrgEndDt = "";
var msOrgAnncStDt = "";
var msOrgAnncEndDt = "";

/**
 * 시작일자, 종료일자 입력 시 비교체크로직을 수행한다.
 * @param psEventDivNm
 */
 function checkCalendarTime(psEventDivNm){
 	var vsStDt = util.Control.getValue(app, "dipStDt");
	var vsEndDt = util.Control.getValue(app, "dipEndDt");
	
	var vsAnncStDt = util.Control.getValue(app, "dipFrfAnncStDt");
	var vsAnncEndDt = util.Control.getValue(app, "dipFrfAnncEndDt");
	
	if(psEventDivNm == "ST_DT"){ //시작일자인 경우
		if(vsEndDt != "" && !(vsStDt <= vsEndDt)){
			util.Msg.alert("NLS-WRN-M129");
			util.Control.setValue(app, app, "dipStDt", msOrgStDt);
		}else {
			msOrgStDt = vsStDt;
		}	
	} else if(psEventDivNm == "END_DT"){// 종료일자인 경우
		if(vsStDt != "" &&!(vsEndDt >= vsStDt)){
			util.Msg.alert("NLS-CSS-M064");
			util.Control.setValue(app, app, "dipEndDt", msOrgEndDt);
		}else {
			msOrgEndDt = vsEndDt;		
		}
	} else if(psEventDivNm == "ANNC_ST_DT"){ //프리폼 시작일자인 경우
		if(vsAnncEndDt != "" && !(vsAnncStDt <= vsAnncEndDt)){
			util.Msg.alert("NLS-WRN-M129");
			util.Control.setValue(app, app, "dipFrfAnncStDt", msOrgAnncStDt);
		}else {
			msOrgAnncStDt = msOrgAnncStDt;
		}	
	} else if(psEventDivNm == "ANNC_END_DT"){//프리폼 종료일자인 경우
		if(vsAnncStDt != "" && !(vsAnncEndDt >= vsAnncStDt)){
			util.Msg.alert("NLS-CSS-M064");
			util.Control.setValue(app, app, "dipFrfAnncEndDt", msOrgAnncEndDt);
		}else {
			msOrgAnncEndDt = vsAnncEndDt;
		}
	}
 }

/**
 * 조회 실행
 */
function doList(poCallBackFunc){
	util.Control.setEnable(app, false, ["frfCmnBoard"]);
	util.Control.reset(app, ["ipbFrfTitle", "dipFrfAnncDt", "cbbFrfUserDivRcd", "ckbFrfEmgcyYn"
	, "cbbFrfBoardDivRcd", "dipFrfAnncStDt", "dipFrfAnncEndDt", "ipbFrfLinkUrl", "optFrfFileCnt"]);
	
	//에디터(HTML Object)값 초기화
	util.HtmlEditorUtil.setValue("embFrfContent", "");
	
	util.Submit.send(app, "subList", function(pbSuccess){
		if(pbSuccess){
			//공지대상 -- 선행데이터인 전체 ""(공백) 선택
			util.SelectCtl.selectItem(app, "cbbUserDivRcd", 0); 
			util.SelectCtl.selectItem(app, "cbbFrfUserDivRcd", 0);
			util.Control.redraw(app, ["grdCmnBoard", "frfCmnBoard", "embFrfContent"]);
			//조회 후 콜백함수 수행
			if(util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
		}
	});
}

/**
 * 그리드 선택 행을 프리폼에 표시 --> 바인딩 적용으로 사용하지 않음
 */
function selectGrdRow(){
//	var vnIdx = util.Grid.getIndex("grdCmnBoard");
//	
//	doCompareFrfEnabled();
//	
//	util.Grid.copyRowGrpForm("grdCmnBoard", "frfCmnBoard", vnIdx);
//	
//	var vsCont = util.Grid.getCellValue("grdCmnBoard", "CONT", vnIdx);
//	callEditorSetEditorContent("embFrfContent", vsCont);
}

/**
 * 선택 여부에 따라 프리폼 활성화 제어
 * @param pnIndex
 */
 function doCompareFrfEnabled(pnIndex){
 	if(util.Grid.getIndex(app, "grdCmnBoard") == -1 || util.Control.getUserAttr(app, "grdCmnBoard", "enable") == "False"
 		|| util.Grid.getCellValue(app, "grdCmnBoard", "gdOptUptStatus") == "D"){
 		util.Control.setEnable(app, false, ["frfCmnBoard"]);
 		
 		//프리폼에 따라 에디터 enabled 제어
		util.Control.setEnable(app, false, "embFrfContent");
 	}else{
 		util.Control.setEnable(app, true, ["frfCmnBoard"]);
 		
 		//프리폼에 따라 에디터 enabled 제어
		util.Control.setEnable(app, true, "embFrfContent");
 	}
 }
 
 /**
  * 저장 실행
  */
  function doSave(){
	  
//	  var vsCont = util.HtmlEditorUtil.getValue("embFrfContent");	
//	  util.Grid.setCellValue("grdCmnBoard", "CONT", vsCont);
	  	
  	//그리드 변경사항 체크
  	if(!util.Grid.isModified(app, "grdCmnBoard", "MSG")){
  		return false;
  	}
	
  	//그리드 validation check
  	if(!util.validate(app, "grdCmnBoard")) return false;
  	
  	//저장 서브미션 실행
  	util.Submit.send(app, "subSave", function(pbSuccess){
  		if(pbSuccess){
  			doList(function(pbListSuccess){
  				//조회 : "갱신된 데이터가 조회되었습니다"
  				if(pbListSuccess) util.Msg.alert("NLS-INF-M025");
  			});
  		}
  	});
  }
 
 /**
  * 에디터에서 MOUSE OUT 이벤트 이후 호출할 이벤트 예시
  * @param psEditorValue 에디터에 입력된 데이터
  */
 exports.callBackOnChangeSmartEditor = function(psEditorValue){
 	//에디터에서 마우스가 나왔을 경우 에디터의 내용을 프리폼 해당컬럼에 setValue 한다.
 	
 	var vnIdx = util.Grid.getIndex(app, "grdCmnBoard");
 	if(vnIdx != -1){
 		var vsCont = util.DataSet.getValue(app, "dsCmnBoard", vnIdx, "CONT");
 		if(vsCont != psEditorValue){
 			util.Grid.setCellValue(app, "grdCmnBoard", "CONT", psEditorValue, vnIdx);
 		}
 			
 	}
 }
 
/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	
	//서브미션 실행 (실패 시 cover page)
	util.Submit.send(app, "subOnLoad", function(pbSuccess){
		if(pbSuccess){
			util.Control.redraw(app, "cbbUserDivRcd");
			util.SelectCtl.selectItem(app, "cbbUserDivRcd", 0);
			
			var vsCutDt = util.DataMap.getValue(app, "dmResOnLoad", "strCutDt");
			if(!ValueUtil.isNull) vsCutDt = vsCutDt.substring(0, 8);
			
			var vsBefMmDt = doGetDate(vsCutDt, "Month", -1);
			
			util.Control.setValue(app, app, "dipStDt", vsBefMmDt);
			util.Control.setValue(app, app, "dipEndDt", vsCutDt);
			
			msStDt = vsBefMmDt;
			msEndDt = vsCutDt;
			//날짜비교용 저장
			msOrgStDt = vsBefMmDt;
			msOrgEndDt = vsCutDt;
		}
		
		util.HtmlEditorUtil.init("embFrfContent", "callBackOnChangeSmartEditor", app);
		
		
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
	// 데이터 변경상태 체크 메시지 
	if(util.Grid.isModified(app, "grdCmnBoard", "CRM")){
		return false;
	}
	if(!util.validate(app, "grpSearch")) return false;
	
	doList(function(pbSuccess){
			//조회 : "조회되었습니다."
			if(pbSuccess) util.Msg.alert("NLS-INF-M024");
		});
		
	
}

/*
 * 데이트 인풋에서 value-change 이벤트 발생 시 호출.
 * Dateinput의 value를 변경하여 변경된 값이 저장된 후에 발생하는 이벤트.
 */
function onDipStDtValueChange(/* cpr.events.CValueChangeEvent */ e){
	/** 
	 * @type cpr.controls.DateInput
	 */
	var dipStDt = e.control;
	checkCalendarTime("ST_DT");
}

/*
 * 데이트 인풋에서 focus 이벤트 발생 시 호출.
 * 컨트롤이 포커스를 획득한 후 발생하는 이벤트.
 */
function onDipStDtFocus(/* cpr.events.CFocusEvent */ e){
	/** 
	 * @type cpr.controls.DateInput
	 */
	var dipStDt = e.control;
	//에디터 비활성화
//	callEditorSetEnableEditor("embFrfContent", false);
	util.Control.setEnable(app, false, "embFrfContent");
}

/*
 * 데이트 인풋에서 value-change 이벤트 발생 시 호출.
 * Dateinput의 value를 변경하여 변경된 값이 저장된 후에 발생하는 이벤트.
 */
function onDipEndDtValueChange(/* cpr.events.CValueChangeEvent */ e){
	/** 
	 * @type cpr.controls.DateInput
	 */
	var dipEndDt = e.control;
	checkCalendarTime("END_DT");
}

/*
 * 데이트 인풋에서 focus 이벤트 발생 시 호출.
 * 컨트롤이 포커스를 획득한 후 발생하는 이벤트.
 */
function onDipEndDtFocus(/* cpr.events.CFocusEvent */ e){
	/** 
	 * @type cpr.controls.DateInput
	 */
	var dipEndDt = e.control;
//	callEditorSetEnableEditor("embFrfContent", false);
	util.Control.setEnable(app, false, "embFrfContent");
}

/*
 * 사용자 정의 컨트롤에서 insert 이벤트 발생 시 호출.
 */
function onGrid_ids_btn1Insert(/* cpr.event.CUIEvent */ e){
	/** 
	 * @type udc.com.grid_IDS_Btn
	 */
	var grid_ids_btn1 = e.control;
	//신규기본값 설정
	var vsUserNm = util.Auth.getUserInfo(app, "USER_NM");
	var vsCutDt = util.DataMap.getValue(app, "dmResOnLoad", "strCutDt");
	var vsAnncStDt = vsCutDt;
	var vsAnncEndDt = doGetDate(vsCutDt, "Month", 1);
	var vsUserDivRcd = util.DataMap.getValue(app, "dmReqList", "strUserDivRcd");
	
	util.HtmlEditorUtil.setValue("embFrfContent", "");
	
	util.Grid.setCellValue(app, "grdCmnBoard", "ANNC_FUND_NM", vsUserNm);
	util.Grid.setCellValue(app, "grdCmnBoard", "ANNC_DT", vsCutDt);
	util.Grid.setCellValue(app, "grdCmnBoard", "ANNC_ST_DT", vsAnncStDt);
	util.Grid.setCellValue(app, "grdCmnBoard", "ANNC_END_DT", vsAnncEndDt);
	util.Grid.setCellValue(app, "grdCmnBoard", "USER_DIV_RCD", vsUserDivRcd);
	
	var vsBoardDivRcd = util.SelectCtl.getValue(app, "cbbFrfBoardDivRcd", 0);
	util.Grid.setCellValue(app, "grdCmnBoard", "ANNC_DIV_RCD", vsBoardDivRcd);
	
	//프리폼 내 포커스
	util.Control.setFocus(app, "ipbFrfTitle");
}

/*
 * 사용자 정의 컨트롤에서 delete 이벤트 발생 시 호출.
 */
function onGrid_ids_btn1Delete(/* cpr.event.CUIEvent */ e){
	/** 
	 * @type udc.com.grid_IDS_Btn
	 */
	var grid_ids_btn1 = e.control;
	if(util.Grid.getIndex(app, "grdCmnBoard")){
//		selectGrdRow();
		onGrdCmnBoardSelectionChange(e);
	}else{
		util.Control.setEnable(app, false, ["frfCmnBoard"]);
		
		//에디터 비활성화
//		callEditorSetEnableEditor("embFrfContent", false);
		util.Control.setEnable(app, false, ["embFrfContent"]);

		//에디터 값 초기화
//		callEditorSetEditorContent("embFrfContent", "");
		util.HtmlEditorUtil.setValue("embFrfContent", "");
	}
}

/*
 * 사용자 정의 컨트롤에서 restore 이벤트 발생 시 호출.
 */
function onGrid_ids_btn1Restore(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type udc.com.grid_IDS_Btn
	 */
	var grid_ids_btn1 = e.control;
	
	if(util.Grid.getIndex(app, "grdCmnBoard") > -1){
		onGrdCmnBoardSelectionChange();
	}else{
		util.Control.setEnable(app, false, ["frfCmnBoard"]);
		//에디터 비활성화
		util.Control.setEnable(app, false, ["embFrfContent"]);
		//에디터 값 초기화
		util.HtmlEditorUtil.setValue("embFrfContent", "");
	}
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
 * 그리드에서 selection-change 이벤트 발생 시 호출.
 * detail의 cell 클릭하여 설정된 selectionunit에 해당되는 단위가 선택될 때 발생하는 이벤트.
 */
function onGrdCmnBoardSelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var vnIdx = util.Grid.getIndex(app, "grdCmnBoard");
	
	doCompareFrfEnabled();
	var vsCont = util.DataSet.getValue(app, "dsCmnBoard", vnIdx, "CONT");
	util.HtmlEditorUtil.setValue("embFrfContent", vsCont);
	util.HtmlEditorUtil.setEnable("embFrfContent", true);
	
}

/*
 * 사용자 정의 컨트롤에서 upLoadCallBack 이벤트 발생 시 호출.
 */
function onCmnfileutil1UpLoadCallBack(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type udc.cmn.cmnFileUtil
	 */
	var cmnfileutil1 = e.control;
//	if(util.Grid.isModified("grdCmnBoard") && util.Control.getValue("optFrfFileCnt")){
//		util.Grid.setCellValue("grdCmnBoard", "FILE_SERIAL_NO", "");
//		doSave();
//	}
}

/*
 * 사용자 정의 컨트롤에서 idrCommonEvent 이벤트 발생 시 호출.
 */
function onGrid_ids_btn1IdrCommonEvent(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type udc.com.grid_IDS_Btn
	 */
	var grid_ids_btn1 = e.control;
	util.Control.redraw(app, "frfCmnBoard");
}


/*
 * 데이트 인풋에서 value-change 이벤트 발생 시 호출.
 * Dateinput의 value를 변경하여 변경된 값이 저장된 후에 발생하는 이벤트.
 */
function onDipFrfAnncStDtValueChange(/* cpr.events.CValueChangeEvent */ e){
	/** 
	 * @type cpr.controls.DateInput
	 */
	var dipFrfAnncStDt = e.control;
	checkCalendarTime("ANNC_ST_DT");
}


/*
 * 데이트 인풋에서 value-change 이벤트 발생 시 호출.
 * Dateinput의 value를 변경하여 변경된 값이 저장된 후에 발생하는 이벤트.
 */
function onDipFrfAnncEndDtValueChange(/* cpr.events.CValueChangeEvent */ e){
	/** 
	 * @type cpr.controls.DateInput
	 */
	var dipFrfAnncEndDt = e.control;
	
	var vsAnncEndDt = util.Control.getValue(app, "dipFrfAnncEndDt");
	
	// value-change가 2번 발생 해 공지종료일자가 공백일 경우 다음을 실행하지 않음
	if(ValueUtil.isNull(vsAnncEndDt)){
		return false;
	}
	
	checkCalendarTime("ANNC_END_DT");
}
