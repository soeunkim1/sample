/*
 * App URI: app/cmn/stdCmnCTableLogMgt
 * Source Location: app/cmn/stdCmnCTableLogMgt.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("app/cmn/stdCmnCTableLogMgt", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			//공통 모듈 사용
			var util = new ComUtil(app);
			
			// 헤더 텍스트 설정할 MAP 정의
			var moMapForHeader = new cpr.utils.ObjectMap();
			// 로그테이블목록 리피트 포커스찾기위한 PK값 
			var msPkValues = "";
			
			/*
			 * Body에서 load 이벤트 발생 시 호출.
			 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
			 */
			function onBodyLoad(/* cpr.events.CEvent */ e){
				// 1. 리피트 초기 설정 - appheader1 에서 설정
				// 2. 검색조건 초기 설정 - appheader1 에서 설정
				// 3. 첫번째 탭버튼 선택
				util.Tab.setSelectedTabItem(app, "tabMain", 1);
				// 4. 서브미션 실행 (실패시 cover page)
				util.Submit.send(app, "subOnLoad", function(pbSuccess){
					if(pbSuccess){
						// 로그이력탭 일자 조건 현재일로 셋팅
						var vsCurDt = util.DataMap.getValue(app, "dmResOnLoad", "strCurDt");
						util.Control.setValue(app, app, "dipStDt", vsCurDt);
						util.Control.setValue(app, app, "dipEndDt", vsCurDt);
						util.Control.redraw(app, ["dipStDt", "dipEndDt"]);
						util.Control.setFocus(app, "ipbTableNm");
					}
				}, true);
			}//onBodyLoad()
			
			
			/*
			 * 탭 폴더에서 tabheader-click 이벤트 발생 시 호출.
			 * 탭 아이템의 헤더 영역을 클릭하였을 때 발생하는 이벤트 입니다.
			 */
			function onTabMainTabheaderClick(/* cpr.events.CItemEvent */ e){
				/** 
				 * @type cpr.controls.TabFolder
				 */
				var tabMain = e.control;
				
				var vsSelTabId = util.Tab.getSelectedId(app, "tabMain");
			
				// 현재 선택된 탭의 상태 체크
				switch(vsSelTabId){
					// 로그테이블
					case 2: {
						// 포커스된 로우 담기
						var vnSelIdx = util.Grid.getIndex(app, "grdCmnLog");
						if(vnSelIdx == -1){
							// tab 이동 하지 않음
							util.Tab.setSelectedTabItem(app, "tabMain", 1);//로그테이블탭 강제 선택
							// "선택된 데이터가 없습니다." 
							util.Msg.warn("M008");
							return false;
						}
			
						var vsTableNm = util.Grid.getCellValue(app, "grdCmnLog", "LOG_TABLE_NAME");
						if(ValueUtil.fixNull(vsTableNm) == ""){
							util.Tab.setSelectedTabItem(app, "tabMain", 1);//로그테이블탭 강제 선택
							// 로그테이블는 존재하지 않습니다.
							util.Msg.warn("M006", ["로그테이블"]);
							return false;
						}
						
						// 리피터 변경사항 체크
						if (util.Grid.isModified(app, "grdCmnLog", "CRM")) {
							// tab 이동 하지 않음
							util.Tab.setSelectedTabItem(app, "tabMain", 1);//로그테이블탭 강제 선택
							return false;
						}
						break;
					}		
				}
				
				var vnIdx = util.Grid.getIndex(app, "grdCmnLog");
				msPkValues = util.Grid.getRowPKColumnValues(app, "grdCmnLog", vnIdx);
				//탭변경 후 처리 로직
				switch(vsSelTabId){
					// 로그테이블
					case 1: {
						doList(function(pbSuccess) {
							if(ValueUtil.fixNull(msPkValues) != ""){
								util.Grid.setFindRowCondition(app, "grdCmnLog", msPkValues);
							}
							// 조회 : "조회되었습니다." header 메세지 표시
							if(pbSuccess){
								util.Msg.notify(app, "NLS-INF-M024");
							}
						});
						break;
					}
					// 로그이력
					case 2: {
						// 로그이력탭 일자 조건 현재일로 셋팅
						doSetInitDate();
						
			//			// 동적으로 그린 그리드를 삭제해준다.
						doDynamicRepeatDelete();
						
						//eXbuilder5에서 주석처리 되어 있음
			//			doDetailList(function(pbSuccess) {
							// 조회 : "조회되었습니다." header 메세지 표시
			//				if(pbSuccess){
			//					util.Msg.notify("NLS-INF-M024");
			//				}
			//			});
						break;
					}
				}
			}
			
			/**
			 * @desc   doDynamicRepeatDelete  동적그리드를 삭제한다.
			 * @return  void
			 */
			function doDynamicRepeatDelete(){
				var vnSize = moMapForHeader.size();
				if(vnSize > 0){	
					var vsKeys = moMapForHeader.keys();
					for(var i=(vsKeys.length-1); i>=0; i--){
						var voHeaderColumn = util.Grid.getHeaderColumn(app, "grdCmnLogHis", vsKeys[i])[0];
						app.lookup("grdCmnLogHis").deleteColumn(voHeaderColumn.colIndex);
					}
					//그리드를 다시 그린다.
					util.Control.redraw(app, "grdCmnLogHis");
					
					moMapForHeader.removeAll();
				}	
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
				if(e.keyCode == 13){
					app.lookup("btnSearch").click();
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
					if (util.Grid.isModified(app, "grdCmnLog", "CRM")) {
						return false;
					}
					
					// 첫번째 탭을 선택한다. 
					util.Tab.setSelectedTabItem(app, "tabMain", 1);
					
					// 포커스PK 빈값으로 초기화한다.
					msPkValues = "";
					
					doList(function(pbSuccess) {
						// 조회 : "조회되었습니다." header 메세지 표시
						if (pbSuccess) {
							util.Msg.notify(app, "NLS-INF-M024") ;
						}
					});	
			}//onBtnSearchClick
			
			/**
			 * @desc  doList        로그테이블을 조회한다.
			 * @param {Function} poCallBackFunc 콜백정의
			 */
			function doList(poCallBackFunc) {
				util.Submit.send(app, "subList", function(pbSuccess){
					if(pbSuccess){
						// 조회 후 콜백함수 수행
						if(util.isFunc(poCallBackFunc)){
							util.Control.redraw(app, "grdCmnLog");
							poCallBackFunc(pbSuccess);
						}
					}
				});
			}//doList()		
			
			/*
			 * "" 버튼에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onBtnSaveClick(/* cpr.events.CMouseEvent */ e){
				/** 
				 * @type cpr.controls.Button
				 */
				var btnSave = e.control;
				doSave();
			}//onBtnSaveClick()
			
			/**
			 * @desc  작업저장한다.
			 * @param {Function} poCallBackFunc 콜백정의
			 */
			function doSave(poCallBackFunc) {
				//그리드 변경사항 체크
				if(!util.Grid.isModified(app, "grdCmnLog","MSG")){
					return false;
				}
				util.Submit.send(app, "subSave", function(pbSuccess){
					if(pbSuccess){
						doList(function(pbListSuccess){
							if (pbListSuccess){
								// 저장 : "갱신된 데이터가 조회되었습니다." header 메세지 표시
								if(pbListSuccess){
									util.Msg.notify(app, "NLS-INF-M025");
								}
								if(util.isFunc(poCallBackFunc)){
									poCallBackFunc(pbSuccess);
								}
							}
						}); 
					}
				});
			}//doSave()		
			//onBtn3Click()
			
			/*
			 * "" 버튼에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onBtnRestoreClick(/* cpr.events.CMouseEvent */ e){
				/** 
				 * @type cpr.controls.Button
				 */
				var btnRestore = e.control;
				util.Grid.revertRowData(app, "grdCmnLog");
			}//onBtnRestoreClick()
			
			/**
			 * @desc   로그이력 조회조건 날짜를 초기화 시킨다.
			 */
			function doSetInitDate(){
				// 로그이력탭 일자 조건 초기값 현재일로 셋팅
				var vsCurDt = util.DataMap.getValue(app, "dmResOnLoad", "strCurDt");
				util.Control.setValue(app, app, "dipStDt", vsCurDt);
				util.Control.setValue(app, app, "dipEndDt", vsCurDt);
				util.Control.redraw(app, ["dipStDt", "dipEndDt"]);
				util.Control.setFocus(app, "dipStDt");
			}//doSetInitDate()
			
			/**
			 * @desc  로그이력 날짜를 체크한다.
			 */
			function doCheckDate(){
				// 컨트롤 유효성 검증
				if(!util.validate(app, ["dipStDt", "dipEndDt"])){
					doSetInitDate();
					return false;
				}
				
				var vsStDt = util.Control.getValue(app, "dipStDt");
				var vsEndDt = util.Control.getValue(app, "dipEndDt");
				
				var vdStDt = DateUtil.toDate(vsStDt, "YYYYMMDDHHmmss");
				var vdEndDt = DateUtil.toDate(vsEndDt,"YYYYMMDDHHmmss");
				
				// 두 날짜간의 일수 체크
			    vdStDt.setHours(vdEndDt.getHours());
				vdStDt.setMinutes(vdEndDt.getMinutes());
			    vdStDt.setSeconds(vdEndDt.getSeconds());
			    vdStDt.setMilliseconds(vdEndDt.getMilliseconds());
			    
			    var mnMilliSpan = Number(vdEndDt) - Number(vdStDt);
			   	var vnDaySpan = parseInt(mnMilliSpan / (1000 * 60 * 60 * 24));
				
				if(vnDaySpan > 7){
					// 검색기간은 최대 7일만 선택할 수 있습니다.
					util.Msg.warn("M009", ["검색기간은 최대 7일"]);
					doSetInitDate();
					return false;
				}
				return true;
			}//doCheckDate()
			
			/**
			 * @desc   doDetailList  로그이력을 조회한다.
			 * @param {Function} poCallBackFunc 콜백정의
			 */
			function doDetailList(poCallBackFunc) {		
				// 선택된 로그테이블명을 가져온다.
				var vsTableNm = util.Grid.getCellValue(app, "grdCmnLog", "LOG_TABLE_NAME");
				util.DataMap.setValue(app, "dmReqKeyHist", "strTableNm", vsTableNm);
				util.Submit.send(app, "subLogHisList", function(pbSuccess){
					if(pbSuccess){
						util.Control.redraw(app, "grdCmnLogHis");
						// 로그테이블의 컬럼을 통해 동적리피트를 생성한다.
						doDynamicRepeat();
						// 조회 후 콜백함수 수행
						if(util.isFunc(poCallBackFunc)){
							poCallBackFunc(pbSuccess);
						}
					}else{
						// 첫번째 탭으로 간다.
						util.Tab.setSelectedTabItem(app, "tabMain", 1);
					}
				});
			}//doDetailList()
			
			/**
			 * @desc   doDynamicRepeat  동적리피트를 생성한다.
			 */
			function doDynamicRepeat(){
				// 이전 값(MAP)을 clear - doDynamicRepeatDelete()에서 실행
				
				// 1. 동적리피트 삭제
				doDynamicRepeatDelete();
				
				// 2. 컬럼 갯수를 가져온다.
				var vnLen = app.lookup("dsTblColNameList").getRowCount();
				
				// 3. 컬럼 갯수만큼 for문을 통해 동적리피트를 생성한다.
				for( var i = 0; i < vnLen ; i++){		
					// 3-1. 컬럼명
					var vsColumnName = util.DataSet.getValue(app, "dsTblColNameList", i, "COLUMN_NAME");
					
					// 3-2. 'TR_TRAN_DATE' / 'CRT_DTHR' /'UPD_DTHR' 컬럼이 있는 경우 date 컨트롤로 정의한다.
					var vsDetailCtlType = "";
					if(vsColumnName == "TR_TRAN_DATE" || vsColumnName == "CRT_DTHR" || vsColumnName == "UPD_DTHR"){
						vsDetailCtlType = "date";
					}else if(vsColumnName == "TR_TRAN_DIV"){
						vsDetailCtlType ="outputCenter";
					}else{
						vsDetailCtlType = "output";
					}
					
					// 3-3. 로그이력목록 생성(header, detail)
					doCreateRptDetailColumn(vsColumnName, vsDetailCtlType, i);
					// 3-4. 컬럼명을 헤더에 설정하기 위해 Map으로 담아준다.
					if(!ValueUtil.isNull(vsColumnName)){
						moMapForHeader.put(vsColumnName, vsColumnName);
					}
				}
				
				// 4. 로그이력목록 헤더 text 설정
				doSetHeaderRptCmnLogHisCtl(moMapForHeader);	
				// 5. 리피트를 다시 그린다.
				util.Control.redraw(app, "grdCmnLogHis");
			}
			
			/**
			 * @desc  doCreateRptDetailColumn 로그이력목록의 컬럼생성
			 */
			function doCreateRptDetailColumn(psColumnNm, psColumnType, pnIdx){
				var colIdx = pnIdx+1;
				var output = (function(){
					var output_1 = new cpr.controls.Output("ghBtn" + psColumnNm);
					output_1.value = psColumnNm;
					return output_1;
				})();
				if(psColumnType == "outputCenter"){
					app.lookup("grdCmnLogHis").addColumn(
							{
								columnLayout : [ {
									width : "130px"
								} ],
								header : [ {
									rowIndex : 0,
									colIndex : colIdx,
									colSpan : 1,
									control : output,
									sortColumnName : psColumnNm,
								} ],
								detail : [ {
									rowIndex : 0,
									colIndex : colIdx,
									colSpan : 1,
									rowSpan : 1,
									columnName : psColumnNm,
									control : (function() {
										var output_2 = new cpr.controls.Output("gdOpt" + psColumnNm);
										output_2.style.css({
											"text-align" : "center"
										});
										if (output_2.isBindable("value")) {
											output_2.bind("value").toDataColumn(psColumnNm);
										}
										return output_2;
									})()
								} ]
							});
				}else if(psColumnType == "date"){
					app.lookup("grdCmnLogHis").addColumn(
							{
								columnLayout : [ {
									width : "130px"
								} ],
								header : [ {
									rowIndex : 0,
									colIndex : colIdx,
									colSpan : 1,
									control : output,
									sortColumnName : psColumnNm,
								} ],
								detail : [ {
									rowIndex : 0,
									colIndex : colIdx,
									colSpan : 1,
									rowSpan : 1,
									columnName : psColumnNm,
									control : (function() {
										var dateInput_1 = new cpr.controls.DateInput("gdOpt" + psColumnNm);
										dateInput_1.format = "YYYYMMDDHHmmss";
										dateInput_1.mask = "YYYY-MM-DD HH:mm:ss";
										if (dateInput_1.isBindable("value")) {
											dateInput_1.bind("value").toDataColumn(psColumnNm);
										}
										return dateInput_1;
									})()
								} ]
							});
				}else{
					app.lookup("grdCmnLogHis").addColumn(
							{
								columnLayout : [ {
									width : "130px"
								} ],
								header : [ {
									rowIndex : 0,
									colIndex : colIdx,
									colSpan : 1,
									control : output,
									sortColumnName : psColumnNm,
								} ],
								detail : [ {
									rowIndex : 0,
									colIndex : colIdx,
									colSpan : 1,
									rowSpan : 1,
									columnName : psColumnNm,
									control : (function() {
										var output_2 = new cpr.controls.Output("gdOpt" + psColumnNm);
										if (output_2.isBindable("value")) {
											output_2.bind("value").toDataColumn(psColumnNm);
										}
										return output_2;
									})()
								} ]
							});	
				}
				util.Control.redraw(app, "grdCmnLogHis");
			}
			
			/**
			 * @desc  로그이력목록의 헤더컬럼 textValue set
			 */
			function doSetHeaderRptCmnLogHisCtl(paColumnMap){
				if(paColumnMap.size() > 0){	
					var vsKeys = paColumnMap.keys();
					for(var i=0; i < vsKeys.length; i++ ){
						var vcRhBtnCtrl = app.lookup("ghBtn" + vsKeys[i]);	
						
						vcRhBtnCtrl.value = vsKeys[i];
					}
				}		
			}
			
			/*
			 * "" 버튼에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onBtnSearchHistClick(/* cpr.events.CMouseEvent */ e){
				/** 
				 * @type cpr.controls.Button
				 */
				var btnSearchHist = e.control;
				var vsTableNm = util.Grid.getCellValue(app, "grdCmnLog", "LOG_TABLE_NAME");
				if(ValueUtil.fixNull(vsTableNm) == ""){
					// 로그테이블는 존재하지 않습니다.
					util.Msg.warn("M006", ["로그테이블"]);
					// 첫번째 탭으로 간다.
					util.Tab.setSelectedTabItem(app, "tabMain", 1);
					return false;
				}
				
				// 조회조건인 날짜를 체크한다.
				if(!doCheckDate()){
					return false;
				}
				
				doDetailList(function(pbSuccess) {
					// 조회 : "조회되었습니다." header 메세지 표시
					if(pbSuccess){
						util.Control.redraw(app, "grdCmnLogHis_title");
						util.Msg.notify(app, "NLS-INF-M024");
					}
				});
			};
			// End - User Script
			
			// Header
			var dataSet_1 = new cpr.data.DataSet("dsCmnLog");
			dataSet_1.parseData({
				"info": "CMN_LOG@TABLE_NAME,TRIGGER_NAME",
				"columns": [
					{"name": "TABLE_NAME"},
					{"name": "LOG_TABLE_YN"},
					{"name": "LOG_TABLE_NAME"},
					{"name": "COMMENTS"},
					{"name": "TRIGGER_NAME"},
					{"name": "STATUS"}
				],
				"rows": []
			});
			app.register(dataSet_1);
			
			var dataSet_2 = new cpr.data.DataSet("dsTblColNameList");
			dataSet_2.parseData({
				"columns": [
					{"name": "COLUMN_NAME"},
					{"name": "COMMENTS"},
					{"name": "HEADER"}
				],
				"rows": []
			});
			app.register(dataSet_2);
			var dataMap_1 = new cpr.data.DataMap("dmResOnLoad");
			dataMap_1.parseData({
				"columns" : [{
					"name": "strCurDt",
					"dataType": "string"
				}]
			});
			app.register(dataMap_1);
			
			var dataMap_2 = new cpr.data.DataMap("dmReqKey");
			dataMap_2.parseData({
				"columns" : [{
					"name": "strTableNm",
					"dataType": "string"
				}]
			});
			app.register(dataMap_2);
			
			var dataMap_3 = new cpr.data.DataMap("dmReqKeyHist");
			dataMap_3.parseData({
				"columns" : [
					{
						"name": "strTableNm",
						"dataType": "string"
					},
					{
						"name": "strStDt",
						"dataType": "string"
					},
					{
						"name": "strEndDt",
						"dataType": "string"
					}
				]
			});
			app.register(dataMap_3);
			
			var dataMap_4 = new cpr.data.DataMap("dmCmnLogHis");
			dataMap_4.parseData({
				"columns" : [{
					"name": "row",
					"dataType": "string"
				}]
			});
			app.register(dataMap_4);
			var submission_1 = new cpr.protocols.Submission("subOnLoad");
			submission_1.action = "/cmn/StdCmnTableLogMgt/";
			submission_1.mediaType = "application/x-www-form-urlencoded";
			submission_1.addResponseData(dataMap_1, false);
			app.register(submission_1);
			
			var submission_2 = new cpr.protocols.Submission("subList");
			submission_2.action = "/cmn/StdCmnTableLogMgt/";
			submission_2.mediaType = "application/x-www-form-urlencoded";
			submission_2.addRequestData(dataMap_2);
			submission_2.addResponseData(dataSet_1, false);
			app.register(submission_2);
			
			var submission_3 = new cpr.protocols.Submission("subSave");
			submission_3.action = "/cmn/StdCmnTableLogMgt/";
			submission_3.mediaType = "application/x-www-form-urlencoded";
			submission_3.addRequestData(dataSet_1);
			app.register(submission_3);
			
			var submission_4 = new cpr.protocols.Submission("subLogHisList");
			submission_4.action = "/cmn/StdCmnTableLogMgt/";
			submission_4.mediaType = "application/x-www-form-urlencoded";
			submission_4.addRequestData(dataMap_3);
			submission_4.addResponseData(dataSet_2, false);
			submission_4.addResponseData(dataMap_4, false);
			app.register(submission_4);
			
			app.supportMedia("all and (min-width: 1235px)", "default");
			app.supportMedia("all and (min-width: 1020px) and (max-width: 1234px)", "notebook");
			app.supportMedia("all and (min-width: 760px) and (max-width: 1019px)", "tablet");
			app.supportMedia("all and (max-width: 759px)", "mobile");
			
			// Configure root container
			var container = app.getContainer();
			container.style.css({
				"width" : "100%",
				"top" : "0px",
				"height" : "100%",
				"left" : "0px"
			});
			
			// Layout
			var xYLayout_1 = new cpr.controls.layouts.XYLayout();
			container.setLayout(xYLayout_1);
			
			// UI Configuration
			var userDefinedControl_1 = new udc.com.appHeader("appheader1");
			container.addChild(userDefinedControl_1, {
				"top": "5px",
				"right": "5px",
				"left": "5px",
				"height": "25px"
			});
			
			var group_1 = new cpr.controls.Container("grpSearch");
			group_1.style.setClasses(["search-box"]);
			// Layout
			var xYLayout_2 = new cpr.controls.layouts.XYLayout();
			group_1.setLayout(xYLayout_2);
			(function(container){
				var button_1 = new cpr.controls.Button("btnSearch");
				button_1.value = "";
				button_1.style.setClasses(["btn-search"]);
				button_1.bind("value").toLanguage("UI-SCR-SCH");
				if(typeof onBtnSearchClick == "function") {
					button_1.addEventListener("click", onBtnSearchClick);
				}
				container.addChild(button_1, {
					"top": "5px",
					"left": "1160px",
					"width": "60px",
					"height": "25px"
				});
				var output_1 = new cpr.controls.Output("optTableNm");
				output_1.value = "";
				output_1.bind("value").toLanguage("UI-SCR-TBNM");
				container.addChild(output_1, {
					"top": "5px",
					"left": "5px",
					"width": "100px",
					"height": "25px"
				});
				var inputBox_1 = new cpr.controls.InputBox("ipbTableNm");
				inputBox_1.imeMode = "inactive";
				inputBox_1.bind("fieldLabel").toExpression("#optTableNm.value");
				inputBox_1.bind("value").toDataMap(app.lookup("dmReqKey"), "strTableNm");
				if(typeof onIpbTableNmKeydown == "function") {
					inputBox_1.addEventListener("keydown", onIpbTableNmKeydown);
				}
				container.addChild(inputBox_1, {
					"top": "5px",
					"left": "110px",
					"width": "200px",
					"height": "25px"
				});
			})(group_1);
			container.addChild(group_1, {
				"top": "35px",
				"left": "5px",
				"width": "1225px",
				"height": "32px"
			});
			
			var group_2 = new cpr.controls.Container("grpData");
			// Layout
			var xYLayout_3 = new cpr.controls.layouts.XYLayout();
			group_2.setLayout(xYLayout_3);
			(function(container){
				var tabFolder_1 = new cpr.controls.TabFolder("tabMain");
				
				var tabItem_1 = (function(tabFolder){
					var tabItem_1 = new cpr.controls.TabItem();
					tabItem_1.text = "tab1";
					tabItem_1.name = "tpcLogTbl";
					var group_3 = new cpr.controls.Container("grptpcLogTbl");
					// Layout
					var formLayout_1 = new cpr.controls.layouts.FormLayout();
					formLayout_1.topMargin = "0px";
					formLayout_1.rightMargin = "0px";
					formLayout_1.bottomMargin = "0px";
					formLayout_1.leftMargin = "0px";
					formLayout_1.horizontalSpacing = "0px";
					formLayout_1.verticalSpacing = "0px";
					formLayout_1.setColumns(["1fr"]);
					formLayout_1.setRows(["1fr"]);
					group_3.setLayout(formLayout_1);
					(function(container){
						var grid_1 = linker.grid_1 = new cpr.controls.Grid("grdCmnLog");
						grid_1.init({
							"dataSet": app.lookup("dsCmnLog"),
							"columns": [
								{"width": "25px"},
								{"width": "40px"},
								{"width": "160px"},
								{"width": "127px"},
								{"width": "215px"},
								{"width": "76px"},
								{"width": "549px"}
							],
							"header": {
								"rows": [{"height": "27px"}],
								"cells": [
									{
										"constraint": {"rowIndex": 0, "colIndex": 0},
										"configurator": function(cell){
											cell.text = "F";
										}
									},
									{
										"constraint": {"rowIndex": 0, "colIndex": 1},
										"configurator": function(cell){
											cell.text = "No";
										}
									},
									{
										"constraint": {"rowIndex": 0, "colIndex": 2},
										"configurator": function(cell){
											cell.style.setClasses(["require"]);
											cell.bind("text").toLanguage("UI-SCR-TBNM");
										}
									},
									{
										"constraint": {"rowIndex": 0, "colIndex": 3},
										"configurator": function(cell){
											cell.style.setClasses(["require"]);
											cell.bind("text").toLanguage("UI-SCR-LOGTBYN");
										}
									},
									{
										"constraint": {"rowIndex": 0, "colIndex": 4},
										"configurator": function(cell){
											cell.style.setClasses(["require"]);
											cell.bind("text").toLanguage("UI-SCR-TRIGERNM");
										}
									},
									{
										"constraint": {"rowIndex": 0, "colIndex": 5},
										"configurator": function(cell){
											cell.bind("text").toLanguage("UI-GLS-STAT");
										}
									},
									{
										"constraint": {"rowIndex": 0, "colIndex": 6},
										"configurator": function(cell){
											cell.bind("text").toLanguage("UI-SCR-TBCMT");
										}
									}
								]
							},
							"detail": {
								"rows": [{"height": "25px"}],
								"cells": [
									{
										"constraint": {"rowIndex": 0, "colIndex": 0},
										"configurator": function(cell){
											cell.control = (function(){
												var output_2 = new cpr.controls.Output();
												output_2.style.css({
													"text-align" : "center"
												});
												return output_2;
											})();
										}
									},
									{
										"constraint": {"rowIndex": 0, "colIndex": 1},
										"configurator": function(cell){
											cell.columnType = "rowindex";
											cell.style.css({
												"text-align" : "center"
											});
										}
									},
									{
										"constraint": {"rowIndex": 0, "colIndex": 2},
										"configurator": function(cell){
											cell.columnName = "TABLE_NAME";
										}
									},
									{
										"constraint": {"rowIndex": 0, "colIndex": 3},
										"configurator": function(cell){
											cell.columnName = "LOG_TABLE_YN";
											cell.style.css({
												"text-align" : "center"
											});
										}
									},
									{
										"constraint": {"rowIndex": 0, "colIndex": 4},
										"configurator": function(cell){
											cell.columnName = "TRIGGER_NAME";
										}
									},
									{
										"constraint": {"rowIndex": 0, "colIndex": 5},
										"configurator": function(cell){
											cell.columnName = "STATUS";
											cell.control = (function(){
												var checkBox_1 = new cpr.controls.CheckBox("ckbStatus");
												checkBox_1.value = "";
												checkBox_1.trueValue = "Y";
												checkBox_1.falseValue = "";
												checkBox_1.text = "ENABLE";
												checkBox_1.bind("value").toDataColumn("STATUS");
												return checkBox_1;
											})();
										}
									},
									{
										"constraint": {"rowIndex": 0, "colIndex": 6},
										"configurator": function(cell){
											cell.columnName = "COMMENTS";
										}
									}
								]
							}
						});
						if(typeof onGrdCmnLogSelectionChange == "function") {
							grid_1.addEventListener("selection-change", onGrdCmnLogSelectionChange);
						}
						container.addChild(grid_1, {
							"top": "30px",
							"left": "5px",
							"width": "1200px",
							"height": "525px"
						});
						var button_2 = new cpr.controls.Button("btnRestore");
						button_2.value = "";
						button_2.style.setClasses(["btn-restore"]);
						button_2.bind("value").toLanguage("UI-SCR-WRKCANCL");
						if(typeof onBtnRestoreClick == "function") {
							button_2.addEventListener("click", onBtnRestoreClick);
						}
						container.addChild(button_2, {
							"top": "5px",
							"left": "1080px",
							"width": "60px",
							"height": "25px"
						});
						var button_3 = new cpr.controls.Button("btnSave");
						button_3.value = "";
						button_3.style.setClasses(["btn-save"]);
						button_3.bind("value").toLanguage("UI-SCR-WRKSAVE");
						if(typeof onBtnSaveClick == "function") {
							button_3.addEventListener("click", onBtnSaveClick);
						}
						container.addChild(button_3, {
							"top": "5px",
							"left": "1145px",
							"width": "60px",
							"height": "25px"
						});
						var userDefinedControl_2 = linker.userDefinedControl_2 = new udc.com.comTitle();
						userDefinedControl_2.bind("title").toLanguage("UI-SCR-LOGTBLST");
						container.addChild(userDefinedControl_2, {
							"top": "5px",
							"left": "5px",
							"width": "265px",
							"height": "25px"
						});
					})(group_3);
					tabItem_1.content = group_3;
					return tabItem_1;
				})(tabFolder_1);
				tabFolder_1.addTabItem(tabItem_1);
				
				var tabItem_2 = (function(tabFolder){
					var tabItem_2 = new cpr.controls.TabItem();
					tabItem_2.text = "tab1";
					tabItem_2.name = "tpcLogHis";
					var group_4 = new cpr.controls.Container("grptpcLogHis");
					// Layout
					var formLayout_2 = new cpr.controls.layouts.FormLayout();
					formLayout_2.topMargin = "0px";
					formLayout_2.rightMargin = "0px";
					formLayout_2.bottomMargin = "0px";
					formLayout_2.leftMargin = "0px";
					formLayout_2.horizontalSpacing = "0px";
					formLayout_2.verticalSpacing = "0px";
					formLayout_2.setColumns(["1fr"]);
					formLayout_2.setRows(["1fr"]);
					group_4.setLayout(formLayout_2);
					(function(container){
						var output_3 = new cpr.controls.Output("label1");
						output_3.value = "~";
						container.addChild(output_3, {
							"top": "5px",
							"left": "110px",
							"width": "20px",
							"height": "25px"
						});
						var button_4 = new cpr.controls.Button("btnSearchHist");
						button_4.value = "";
						button_4.style.setClasses(["btn-search"]);
						button_4.bind("value").toLanguage("UI-SCR-SCH");
						if(typeof onBtnSearchHistClick == "function") {
							button_4.addEventListener("click", onBtnSearchHistClick);
						}
						container.addChild(button_4, {
							"top": "5px",
							"left": "240px",
							"width": "60px",
							"height": "25px"
						});
						var grid_2 = new cpr.controls.Grid("grdCmnLogHis");
						grid_2.init({
							"dataSet": app.lookup("dsCmnLogHis"),
							"columns": [{"width": "40px"}],
							"header": {
								"rows": [{"height": "27px"}],
								"cells": [{
									"constraint": {"rowIndex": 0, "colIndex": 0},
									"configurator": function(cell){
										cell.text = "No";
									}
								}]
							},
							"detail": {
								"rows": [{"height": "25px"}],
								"cells": [{
									"constraint": {"rowIndex": 0, "colIndex": 0},
									"configurator": function(cell){
										cell.columnType = "rowindex";
										cell.style.css({
											"text-align" : "center"
										});
									}
								}]
							}
						});
						container.addChild(grid_2, {
							"top": "30px",
							"left": "5px",
							"width": "1200px",
							"height": "525px"
						});
						var dateInput_1 = new cpr.controls.DateInput("dipStDt");
						dateInput_1.style.css({
							"text-align" : "center"
						});
						dateInput_1.bind("fieldLabel").toExpression("#로그이력 시작일자.value");
						dateInput_1.bind("value").toDataMap(app.lookup("dmReqKeyHist"), "strStDt");
						container.addChild(dateInput_1, {
							"top": "5px",
							"left": "5px",
							"width": "100px",
							"height": "25px"
						});
						var dateInput_2 = new cpr.controls.DateInput("dipEndDt");
						dateInput_2.style.css({
							"text-align" : "center"
						});
						dateInput_2.bind("fieldLabel").toExpression("#로그이력 종료일자.value");
						dateInput_2.bind("value").toDataMap(app.lookup("dmReqKeyHist"), "strEndDt");
						container.addChild(dateInput_2, {
							"top": "5px",
							"left": "135px",
							"width": "100px",
							"height": "25px"
						});
					})(group_4);
					tabItem_2.content = group_4;
					return tabItem_2;
				})(tabFolder_1);
				tabFolder_1.addTabItem(tabItem_2);
				tabFolder_1.setSelectedTabItem(tabItem_1);
				container.addChild(tabFolder_1, {
					"top": "35px",
					"left": "5px",
					"width": "1215px",
					"height": "560px"
				});
				var button_5 = new cpr.controls.Button("tabBtnLogTbl");
				button_5.value = "";
				button_5.bind("value").toLanguage("UI-SCR-LOGTBLST");
				if(typeof onTabBtnLogTblClick == "function") {
					button_5.addEventListener("click", onTabBtnLogTblClick);
				}
				container.addChild(button_5, {
					"top": "8px",
					"left": "5px",
					"width": "115px",
					"height": "28px"
				});
				var button_6 = new cpr.controls.Button("tabBtnLogHis");
				button_6.value = "";
				button_6.bind("value").toLanguage("UI-SCR-LOGHISTO");
				if(typeof onTabBtnLogHisClick == "function") {
					button_6.addEventListener("click", onTabBtnLogHisClick);
				}
				container.addChild(button_6, {
					"top": "8px",
					"left": "121px",
					"width": "100px",
					"height": "28px"
				});
			})(group_2);
			container.addChild(group_2, {
				"top": "72px",
				"left": "5px",
				"width": "1225px",
				"height": "603px"
			});
			if(typeof onBodyLoad == "function"){
				app.addEventListener("load", onBodyLoad);
			}
			// Linking
			linker.userDefinedControl_2.ctrl = linker.grid_1;
		}
	});
	app.title = "로그테이블관리";
	cpr.core.Platform.INSTANCE.register(app);
})();
