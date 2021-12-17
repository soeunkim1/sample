//공통 유틸(Util) 클래스
var util = createCommonUtil();

function onBodyLoad(/* cpr.events.CEvent */ e){
	/**@type cpr.controls.Grid */
	var vcCtrl = app.getAppProperty("ctrl");
	if(vcCtrl && vcCtrl.type == "grid"){
		if(vcCtrl.dataSet){
			app.setAppProperty("rowCount", vcCtrl.dataSet.getRowCount());
		}else{
			app.setAppProperty("rowCount", "0");
		}
	}
	
	//다운로드 권한이 없으면... 엑셀버튼 숨김
	if(util.Auth.getMenuInfo(app, "DOWNLOAD_YN") !== "Y"){
		app.setAppProperty("showExportExcel", false);
	}
	
	//모바일 화면이면... 엑셀버튼 숨김
//	var mainApp = util.getMainApp(app);
//	if(mainApp){
//		if(mainApp.getContainer().userAttr("adaptive-screen") === "true"){
//			app.setAppProperty("showExportExcel", false);
//			
//			var layout = app.lookup("grp1").getLayout();
//			layout.setColumnVisible(1, false);
//			layout.setColumnVisible(2, false);
//			layout.setColumnVisible(3, false);
//			layout.setColumnVisible(4, false);
//		}
//	}
}

/*
 * "엑셀출력" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnExcelExportClick(/* cpr.events.CMouseEvent */ e){
	var vcCtrl = app.getAppProperty("ctrl");
	var exportTitle = !ValueUtil.isNull(app.getAppProperty("exportExcelTitle")) ? app.getAppProperty("exportExcelTitle") : app.lookup("optTilte").value;
	
	
	var _app = vcCtrl.getAppInstance();
	util.Grid.exportData(_app, vcCtrl.id, exportTitle, null, "xlsx", null, !app.getAppProperty("exportHiddenColumns"), app.getAppProperty("exportExcludePart"));
}

/*
 * Body에서 property-change 이벤트 발생 시 호출.
 * 앱의 속성이 변경될 때 발생하는 이벤트 입니다.
 */
function onBodyPropertyChange(/* cpr.events.CPropertyChangeEvent */ e){
	if(e.property == "rowCount"){
		app.lookup("optRowCount").redraw();
	}else if(e.property == "showExportExcel"){
		if(app.getAppProperty("showExportExcel") === false){
			app.lookup("grp1").getLayout().setColumnVisible(6, false);
		}
	}else if(e.property == "title"){
		app.lookup("optTilte").value = e.newValue;
	}
}


/*
 * 버튼(btnTools)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnToolsClick(/* cpr.events.CMouseEvent */ e){
	/**@type cpr.controls.Grid */
	var grid = app.getAppProperty("ctrl");
	if(grid == null){
		alert("Can not find Target Grid Control!");
		return false;
	}
	
	var ctxMenu = new cpr.controls.Menu("ctx_menu");
	ctxMenu.addItem(new cpr.controls.TreeItem("찾기", "1", "root"));
	ctxMenu.addItem(new cpr.controls.TreeItem("정렬취소", "2", "root"));
	ctxMenu.addItem(new cpr.controls.TreeItem("필터", "3", "root"));
	ctxMenu.addItem(new cpr.controls.TreeItem("필터취소", "4", "root"));
//	ctxMenu.addItem(new cpr.controls.TreeItem("컬럼숨김", "5", "root"));
//	ctxMenu.addItem(new cpr.controls.TreeItem("인쇄", "6", "root"));
	
	ctxMenu.addEventListener("item-click", function(/**@type cpr.events.CItemEvent */ e){
		var itemValue = e.item.value;
		//찾기
		if(itemValue == "1"){
			//팝업 호출 파라메터
			var initValue = {"grid": grid, "headerRowIndex":app.getAppProperty("headerRowIndex")};
			util.Dialog.open(app, "app/cmn/stdCmnPFind", 500, 150, function(e){
			
			}, initValue);
		//정렬취소
		}else if(itemValue == "2"){
			if(grid) grid.header.clearSort();
		//필터 보여주기
		}else if(itemValue == "3"){
			var isHFiltered = false;
			var column, filterStr;
			for(var i=0, len=grid.header.cellCount; i<len; i++){
				column = grid.header.getColumn(i);
				filterStr = column.getFilter();
				if(filterStr != null && filterStr[0] != "__all__"){
					isHFiltered = true;
					break;
				}
			}
			if(!isHFiltered){
				var hTRowIndex = app.getAppProperty("headerRowIndex");
				for(var i=0, len=grid.header.cellCount; i<len; i++){
					column = grid.header.getColumn(i);
					if(hTRowIndex > -1){
						if((column.rowIndex + column.rowSpan) == (hTRowIndex+1) && column.targetColumnName != ""){
							column.filterable = true;
						}
					}else{
						if(column.targetColumnName != ""){
							column.filterable = true;
						}
					}
				}
			}
		//필터 해제 및 필터 숨김
		}else if(itemValue == "4"){
			if(grid){
				grid.header.clearFilter();
				var column;
				for(var i=0, len=grid.header.cellCount; i<len; i++){
					column = grid.header.getColumn(i);
					column.filterable = false;
				}
			}
		//컬럼 숨김/보이기
		}else if(itemValue == "5"){
			//팝업 호출 파라메터
			var initValue = {"grid": grid, "headerRowIndex":app.getAppProperty("headerRowIndex")};
			util.Dialog.open(app, "app/cmn/stdCmnPColumns", 400, 330, function(e){
			
			}, initValue);
		
		//인쇄
		}else if(itemValue == "6"){
			/**@type cpr.controls.Grid */
			var targetEle = document.getElementById("uuid-"+grid.uuid);
			// 3.DOM의 text를 얻습니다.
			var content = targetEle.innerHTML;
			// 오픈되는 윈도우에 프린트하려는 데이터를 공유합니다.
		    sessionStorage.setItem("print-content", content);
		    var windowWidth = (window.innerWidth | document.body.clientWidth)-500;
			var windowHeight = (window.innerHeight | document.body.clientHeight)-300;
			var width = windowWidth > 600 ? windowWidth : 600;
			var height = windowHeight > 400 ? windowHeight : 400;
			
			//print하는 페이지를 엽니다.
			var popWindow = window.open('/jsp/print.html',"print",'left=100,top=100, resizable=yes, height='+height+',width='+width);
		}
		ctxMenu.dispose();
	});
	ctxMenu.addEventListenerOnce("blur", function(/**@type cpr.events.CFocusEvent*/ e){
		e.control.dispose();
	});
		
	/**@type cpr.controls.Container */
	var rootContainer = null;
	var showConstraint = {
		"position" : "absolute",
		"width" : "130px",
		"height" : "60px"
	};
	if(util.Dialog.isPopup(grid.getAppInstance())){
		rootContainer = grid.getAppInstance().getContainer();
		
		if((e.clientY - rootContainer.getActualRect().top + 130) > rootContainer.getActualRect().height )
			showConstraint.top = (e.clientY - rootContainer.getActualRect().top - 130) +"px";
		else
			showConstraint.top = (e.clientY - rootContainer.getActualRect().top) +"px";
		
		showConstraint.left = (e.clientX - (rootContainer.getActualRect().left + 130)) + "px";
	}else{
		rootContainer = grid.getAppInstance().getRootAppInstance().getContainer();
		
		showConstraint.top = e.clientY + "px";
		if(e.clientX < 130){
			showConstraint.left = "0px";
		}else{
			showConstraint.left = (e.clientX - 130) + "px";
		}
	}
	if(rootContainer.getLayout() instanceof cpr.controls.layouts.FormLayout){
		rootContainer.floatControl(ctxMenu, showConstraint);
	}else{
		rootContainer.addChild(ctxMenu, showConstraint);
	}
	ctxMenu.focus();
}
