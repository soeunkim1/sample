exports.getApp = function() {
	
	return app;
};

function onBodyLoad(/* cpr.events.CEvent */ e){
//	app.getHost().style.css(
//		{
//			  "background-color" : "transparent"
//			, "background-image" : "none"
//		}
//	);
	app.getHost().style.addClass("grp-title");
	var gridId = app.getAppProperty("gridId");
	var gridTitle = app.getAppProperty("gridTitle");
	var hostApp = app.getHostAppInstance();
	
	if(gridId){
		var vcHostTitle = hostApp.lookup(app.getHost().id);
		var vcGrd = hostApp.lookup(gridId);
		var vcDataSet = vcGrd.dataSet;
		vcHostTitle.bind("rowcount").toExpression("#" + vcDataSet.id + ".getRowCount()");
		if(gridTitle){
			app.lookup("optTilte").value = gridTitle;
		}else{
			app.lookup("optTilte").value = vcGrd.fieldLabel;	
		}
	}else{
		app.lookup("optSumText").visible = false;
		app.lookup("opt_rowcount").visible = false;
		app.lookup("optSumText2").visible = false;
		app.lookup("btnExcelExport").visible = false;
		var vsFormId = app.getAppProperty("formId");
		var vcForm = hostApp.lookup(vsFormId);
		app.lookup("optTilte").value = vcForm.fieldLabel;
	}
	
}



function onBodyPropertyChange(/* cpr.events.CPropertyChangeEvent */ e){
	if(e.property == "rowcount"){
		app.lookup("opt_rowcount").redraw();
	}
}





/*
 * "" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnExcelExportClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnExcelExport = e.control;
	var gridId = app.getAppProperty("gridId");
//	var comUtil = createComUtil(app.getHostAppInstance());
	var comUtil = new ComUtil(app.getHostAppInstance());
	comUtil.exportExcel(gridId,app.lookup("optTilte").value);
}

/*
 * Body에서 init 이벤트 발생 시 호출.
 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit(/* cpr.events.CEvent */ e){
}
