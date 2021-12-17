var initValue;
var util = new ComUtil(app);
/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	initValue = app.getHostProperty("initValue");
	if(initValue){
		if(ValueUtil.fixBoolean(initValue.iIsDownloadOnly)){
			util.Control.setVisible(app, false, ["btnFileUpLoad","btnDel"]);
		}
		
		if(!ValueUtil.isNull(initValue.iFileSerialNo)){
			util.DataMap.setValue(app, "dmFileInfo", "strFileSeriaNo", initValue.iFileSerialNo);
			util.DataMap.setValue(app, "dmIsFileSeriaNo", "isFileSeriaNo", "Y");
			doList();
		}else{
			util.Control.setVisible(app, false, ["btnAllDown"]);
			util.DataMap.setValue(app, "dmIsFileSeriaNo", "isFileSeriaNo", "N");
		}	
		
	}
}

/**
 * @desc   파일순번으로 파일리스트 취득
 * @param poCallBackFunc
 * @return VOID
 * @author
 */
function doList() {
	
	util.Submit.send(app, "subList", function(pbSuccess){
		if (pbSuccess){ 
			util.Msg.notify(app, "NLS-INF-M024") ;
			
			util.Control.redraw(app, "grdCmnFile");
			if(util.Grid.getRowCount(app, "grdCmnFile") > 0){
				util.DataMap.setValue(app, "dmFileInfo", "strFileSeriaNo", 
				util.Grid.getCellValue(app, "grdCmnFile", "FILE_SERIAL_NO", 0));
			}
		}
		
	});
}
/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnFileUpLoadClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnFileUpLoad = e.control;
	
	
	if(!ValueUtil.isNull(initValue.iMaxFileCnt)){
		
		if(util.Grid.getRowCount(app, "grdCmnFile") >= ValueUtil.fixNumber(initValue.iMaxFileCnt)){
			util.Msg.warn("M058", [initValue.iMaxFileCnt]);
			return false;
		}
	}
	
	util.FileUtil.getFileName(initValue.iFileExtFilter, function(paFiles){
		
		util.Submit.addFileParameter(app, "subFileUpLoad", paFiles);
		util.Submit.send(app, "subFileUpLoad", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdCmnFile");
			}
		});
	}, initValue.iMaxFileCnt, initValue.iLimitFileSize);
	
	
}



/*
 * 그리드에서 cell-click 이벤트 발생 시 호출.
 * Grid의 Cell 클릭시 발생하는 이벤트.
 */
function onGrdCmnFileCellClick(/* cpr.events.CGridEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grdCmnFile = e.control;
	var voCellInfo = grdCmnFile.getCellInfo(e.cellIndex);
	
	if(voCellInfo.columnName == "DOWN_BTN_NM"){
		
		util.DataMap.setValue(app, "dmFileInfo", "strSeq", util.Grid.getCellValue(app, "grdCmnFile", "SEQ"));
		
		util.Submit.send(app, "subFileExist", function(pbSuccess){
			if(pbSuccess){
				util.Submit.send(app, "subFileDown", function(pbSuccess){
	
				});
			}
		});
	}
	
}

/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnAllDownClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnAllDown = e.control;
	
	if(util.Grid.getRowCount(app, "grdCmnFile") > 0){
		
		util.Submit.send(app, "subAllFileDown", function(pbSuccess){
	
		});
	}
}

/*
 * "" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnDelClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnDel = e.control;
	
	var vaIdx = app.lookup("grdCmnFile").getCheckRowIndices();
	
	if(vaIdx.length < 1){
		util.Msg.alert("NLS-INF-M005");
		return false;
		
	}else{
		if(util.Msg.confirm("NLS-CRM-M004")){
			
			vaIdx.forEach(function(vnIdx){
				util.Grid.setRowState(app, "grdCmnFile", cpr.data.tabledata.RowState.DELETED, vnIdx);	
				
			});
			
			util.Submit.send(app, "subDelFile", function(pbSuccess){
				if(pbSuccess){
					doList();
				}
			});
		}
		
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
	
	var voResult = {
			FILE_SERIAL_NO : "",
			FILE_CNT : ""
		};	
		
	var vsFileSerialNo;
	var vnFileCnt = util.Grid.getRowCount(app, "grdCmnFile");
		
	if(vnFileCnt > 0){
		vsFileSerialNo = util.Grid.getCellValue(app, "grdCmnFile", "FILE_SERIAL_NO", 0);
	}else{
		vsFileSerialNo = "";
	}
	
	if( vnFileCnt == 0 && !ValueUtil.isNull(initValue.iFileSerialNo) )
	{
		util.Msg.alert("전체 첨부파일 삭제시 창을 닫은 후 저장버튼을 클릭해야 합니다.");
	}
	
	if( vnFileCnt != 0 && ValueUtil.isNull(initValue.iFileSerialNo) )
	{
		util.Msg.alert("최초 첨부파일 업로드시 창을 닫은 후 저장버튼을 클릭해야 합니다.");
	}
	
	voResult.FILE_SERIAL_NO = vsFileSerialNo;
	voResult.FILE_CNT = vnFileCnt;
	
	app.setHostProperty("returnValue", voResult);
	app.close();
}

/*
 * "" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onGdBtnFileDownClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var gdBtnFileDown = e.control;
	util.DataMap.setValue(app, "dmFileInfo", "strSeq", util.Grid.getCellValue(app, "grdCmnFile", "SEQ"));
	util.Submit.send(app, "subFileExist", function(pbSuccess){
		if(pbSuccess){
			util.Submit.send(app, "subFileDown", function(pbSuccess){

			});
		}
	});
}
