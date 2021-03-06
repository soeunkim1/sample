/*
 * App URI: app/cmn/stdCmnCSatSer
 * Source Location: app/cmn/stdCmnCSatSer.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("app/cmn/stdCmnCSatSer", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			var util = new ComUtil(app);
			/*
			 * Body에서 load 이벤트 발생 시 호출.
			 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
			 */
			function onBodyLoad(/* cpr.events.CEvent */ e){
				// 기준일자 조회하는 내부 팝업 호출을 위한 단위시스템코드 설정
			//	setUnitSystem("CMN");
				
				//서브미션 실행 (실패시 cover page)
				util.Submit.send(app, "subOnLoad", function(pbSuccess){
					if(pbSuccess){
						//선택그룹refresh
						util.DataMap.setValue(app, "dmReqList", "strCurTime", util.DataMap.getValue(app, "dmResOnLoad", "strCurTime"));
						util.Control.redraw(app, ["cbbSerDiv","impschyearsmt1"]);
					}		
				}, true);
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
				if (!util.validate(app, "cbbSerDiv")) {
					return false;
				}
				//2.서브그리드 초기화
				util.Control.reset(app, app, ["grdMstInList","grdMstOutList"]);
				//3.조회 실행
				doList(function(pbSuccess) {
					// 조회 : "조회되었습니다." header 메세지 표시
					if(pbSuccess)util.Msg.notify(app, "NLS-INF-M024");
				});
			}
			
			/**
			 * @desc 조회 event
			 * @param poCallBackFunc 조회 후 callback함수
			 * @return void
			 */
			function doList(poCallBackFunc) {
				util.Submit.send(app, "subList", function(pbSuccess){
					if(pbSuccess){
						util.Control.redraw(app, "grdMstList");
						// 조회 후 콜백함수 수행
						if (util.isFunc(poCallBackFunc))poCallBackFunc(pbSuccess);
					}
				});
			}
			
			/*
			 * 그리드에서 selection-change 이벤트 발생 시 호출.
			 * detail의 cell 클릭하여 설정된 selectionunit에 해당되는 단위가 선택될 때 발생하는 이벤트.
			 */
			function onGrdMstListSelectionChange(/* cpr.events.CSelectionEvent */ e){
				/** 
				 * @type cpr.controls.Grid
				 */
				var grdMstList = e.control;
				
				if(util.Grid.getIndex(app, "grdMstList") == -1){
					return false;
				}
				
				//3.조회 실행
				doListSub(function(pbSuccess) {
					// 조회 : "조회되었습니다." header 메세지 표시
					if(pbSuccess)util.Msg.notify(app, "NLS-INF-M024");
				});
			}
			
			/**
			 * @desc 상세조회 event
			 * @param poCallBackFunc 조회 후 callback함수
			 * @return void
			 */
			function doListSub(poCallBackFunc) {
			
				var voRow = util.Grid.getIndex(app, "grdMstList")
				var vsCd = util.Grid.getCellValue(app, "grdMstList","CD",voRow)
				if (ValueUtil.isNull(voRow)) {
					//선택된 데이터가 없습니다.
					util.Msg.alert("NLS-WRN-M008");
					return;
				}
				// 조회조건set
				util.DataMap.setValue(app, "dmReqList", "strSerCodeRcd", vsCd);
				util.Submit.send(app, "subListSub", function(pbSuccess){
					if(pbSuccess){
						util.Control.redraw(app, ["grdMstInList","grdMstOutList"]);
						// 조회 후 콜백함수 수행
						if(util.isFunc(poCallBackFunc))poCallBackFunc(pbSuccess);
					}
				});
			}
			
			/*
			 * "" 버튼에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onBtnUpClick(/* cpr.events.CMouseEvent */ e){
				/** 
				 * @type cpr.controls.Button
				 */
				var btnUp = e.control;
				//계열지정 이수과정 목록으로 복사
				doRptDataCopy("grdMstInList", "grdMstOutList", "In");
			}
			
			/**
			 * @desc 계열지정 이수과정 목록으로 복사 event
			 * @param poCallBackFunc 조회 후 callback함수
			 * @return void
			 */
			function doRptDataCopy(psGrdCopyNm, psGrdDelNm, psGubun){
				
				var vaDelListRow = util.Grid.getCheckOrSelectedRowIndex(app, psGrdDelNm)
				var vsGrxMstDelTitle = app.lookup(psGrdDelNm).fieldLabel
				var vaIdxsDel = null;
				var voDelRow;
				
				if(String(vaDelListRow).isEmpty()){
					util.Msg.alert("NLS-INF-M045", [vaDelListRow]);
					return false;
				};
				
				//셋팅
			   for(var i=0; i< vaDelListRow.length; i++) {
					
					voDelRow = vaDelListRow[i];
					var voCopyRow = util.Grid.insertRow(app, psGrdCopyNm);
					
					var vsSpCd = util.Grid.getCellValue(app, psGrdDelNm, 		"SP_CD",			voDelRow);
					var vsSpNm = util.Grid.getCellValue(app, psGrdDelNm, 		"SP_NM",			voDelRow);
					var vsSaCdNm = util.Grid.getCellValue(app, psGrdDelNm, 		"SA_CD_NM",			voDelRow);
					var vsSpDnDivRcdNm = util.Grid.getCellValue(app, psGrdDelNm, "SP_DN_DIV_RCD_NM", voDelRow);
					var vsRefKey = util.Grid.getCellValue(app, psGrdDelNm, 		"REF_KEY",			voDelRow);
					
					util.Grid.setCellValue(app, psGrdCopyNm, "SP_CD",			vsSpCd,			voCopyRow);
					util.Grid.setCellValue(app, psGrdCopyNm, "SP_NM",			vsSpNm,			voCopyRow);
					util.Grid.setCellValue(app, psGrdCopyNm, "SA_CD_NM",			vsSaCdNm,		voCopyRow);
					util.Grid.setCellValue(app, psGrdCopyNm, "SP_DN_DIV_RCD_NM", vsSpDnDivRcdNm,	voCopyRow);
					util.Grid.setCellValue(app, psGrdCopyNm, "REF_KEY",			vsRefKey,		voCopyRow);
					
					if("In" == psGubun){
						
						var voStrSerDivRcd = util.DataMap.getValue(app, "dmReqList", "strSerDivRcd");
						var voStrSerCodeRcd = util.DataMap.getValue(app, "dmReqList", "strSerCodeRcd");
						util.Grid.setCellValue(app, psGrdCopyNm, "SER_DIV_RCD", voStrSerDivRcd, voCopyRow);
						util.Grid.setCellValue(app, psGrdCopyNm, "SER_RCD", voStrSerCodeRcd, voCopyRow);
					}
				
					util.Grid.deleteRow(app, psGrdDelNm);
			   }
			   //저장
				doSave();
			}
			
			/**
			 * @desc 작업저장 event
			 * @return void
			 */
			function doSave() {
				
				// 그리드의 변경사항 유/무를 반환
				if (!util.Grid.isModified(app, "grdMstInList", "MSG")) {
					return false;
				}
				// 그리드 유효성 검증
				if (!util.validate(app, "grdMstInList")) {
					return false;
				}
				util.Submit.send(app, "subSave", function(pbSuccess){
					if(pbSuccess){
						doListSub(function(pbListSuccess) {
							// 조회 : "갱신된 데이터가 조회되었습니다." header 메세지 표시
							if (pbListSuccess){
								util.Msg.notify(app, "NLS-INF-M025");
							}else{
								util.Msg.notify(app, "NLS-INF-M024");
							} 	
						});
					}
				});
			}
			
			/*
			 * "" 버튼에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onBtnDownClick(/* cpr.events.CMouseEvent */ e){
				/** 
				 * @type cpr.controls.Button
				 */
				var btnDown = e.control;
				//계열지정 이수과정 목록으로 복사
				doRptDataCopy("grdMstOutList", "grdMstInList", "Out");
			}
			
			
			/*
			 * 사용자 정의 컨트롤에서 searchCallBack 이벤트 발생 시 호출.
			 */
			function onImpschyearsmt1SearchCallBack(/* cpr.events.CUIEvent */ e){
				/** 
				 * @type udc.imp.impSchYearSmt
				 */
				var impschyearsmt1 = e.control;
			
				if (!util.validate(app, "impschyearsmt1")) {
					return false;
				}
				
				//3.조회 실행
				doListSub(function(pbSuccess) {
					// 조회 : "조회되었습니다." header 메세지 표시
					if(pbSuccess)util.Msg.notify(app, "NLS-INF-M024");
				});
			};
			// End - User Script
			
			// Header
			var dataSet_1 = new cpr.data.DataSet("dsMstList");
			dataSet_1.parseData({
				"info": "CMN_OPT_GRP_COND@LAN_DIV_RCD,OPT_GRP_CD,INPUT_KEY",
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_1);
			
			var dataSet_2 = new cpr.data.DataSet("dsMstInList");
			dataSet_2.parseData({
				"info": "CMN_SER@REF_KEY,SER_RCD,SER_DIV_RCD",
				"columns": [
					{"name": "SP_CD"},
					{"name": "SP_NM"},
					{"name": "SA_CD_NM"},
					{"name": "SP_DN_DIV_RCD_NM"},
					{"name": "REF_KEY"},
					{"name": "SER_DIV_RCD"},
					{"name": "SER_RCD"},
					{"name": "REMARK"},
					{"name": "SA_CD"},
					{"name": "SP_SUB_DIV_RCD"}
				],
				"rows": []
			});
			app.register(dataSet_2);
			
			var dataSet_3 = new cpr.data.DataSet("dsMstOutList");
			dataSet_3.parseData({
				"columns": [
					{"name": "SP_CD"},
					{"name": "SP_NM"},
					{"name": "SA_CD_NM"},
					{"name": "SP_DN_DIV_RCD_NM"},
					{"name": "REF_KEY"},
					{"name": "SA_CD"},
					{"name": "SP_SUB_DIV_RCD"},
					{"name": "SER_DIV_RCD"},
					{"name": "SER_RCD"}
				],
				"rows": []
			});
			app.register(dataSet_3);
			
			var dataSet_4 = new cpr.data.DataSet("dsSerDivRcdList");
			dataSet_4.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_4);
			var dataMap_1 = new cpr.data.DataMap("dmReqList");
			dataMap_1.parseData({
				"columns" : [
					{
						"name": "strCurTime",
						"dataType": "string"
					},
					{
						"name": "strSerCodeRcd",
						"dataType": "string"
					},
					{
						"name": "strSerDivRcd",
						"dataType": "string"
					}
				]
			});
			app.register(dataMap_1);
			
			var dataMap_2 = new cpr.data.DataMap("dmResOnLoad");
			dataMap_2.parseData({
				"columns" : [{
					"name": "strCurTime",
					"dataType": "string"
				}]
			});
			app.register(dataMap_2);
			var submission_1 = new cpr.protocols.Submission("subOnLoad");
			submission_1.action = "/cmn/StdCmnSatSer/";
			submission_1.mediaType = "application/x-www-form-urlencoded";
			submission_1.addResponseData(dataMap_2, false);
			submission_1.addResponseData(dataSet_4, false);
			app.register(submission_1);
			
			var submission_2 = new cpr.protocols.Submission("subList");
			submission_2.action = "/cmn/StdCmnSatSer/";
			submission_2.mediaType = "application/x-www-form-urlencoded";
			submission_2.addRequestData(dataMap_1);
			submission_2.addResponseData(dataSet_1, false);
			app.register(submission_2);
			
			var submission_3 = new cpr.protocols.Submission("subSave");
			submission_3.action = "/cmn/StdCmnSatSer/";
			submission_3.mediaType = "application/x-www-form-urlencoded";
			submission_3.addRequestData(dataSet_2);
			app.register(submission_3);
			
			var submission_4 = new cpr.protocols.Submission("subListSub");
			submission_4.action = "/cmn/StdCmnSatSer/";
			submission_4.mediaType = "application/x-www-form-urlencoded";
			submission_4.addRequestData(dataMap_1);
			submission_4.addResponseData(dataSet_2, false);
			submission_4.addResponseData(dataSet_3, false);
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
					"top": "7px",
					"left": "1160px",
					"width": "60px",
					"height": "25px"
				});
				var output_1 = new cpr.controls.Output("optOptSerDiv");
				output_1.value = "";
				output_1.style.setClasses(["require"]);
				output_1.bind("value").toLanguage("UI-SCR-LGPDIV");
				container.addChild(output_1, {
					"top": "5px",
					"left": "5px",
					"width": "100px",
					"height": "25px"
				});
				var comboBox_1 = new cpr.controls.ComboBox("cbbSerDiv");
				comboBox_1.userAttr({"require": "Y"});
				comboBox_1.bind("fieldLabel").toExpression("#optOptSerDiv.value");
				comboBox_1.bind("value").toDataMap(app.lookup("dmReqList"), "strSerDivRcd");
				(function(comboBox_1){
					comboBox_1.setItemSet(app.lookup("dsSerDivRcdList"), {
						"label": "CD_NM",
						"value": "CD"
					});
				})(comboBox_1);
				container.addChild(comboBox_1, {
					"top": "5px",
					"left": "110px",
					"width": "250px",
					"height": "25px"
				});
			})(group_1);
			container.addChild(group_1, {
				"top": "35px",
				"left": "5px",
				"width": "1225px",
				"height": "32px"
			});
			
			var group_2 = new cpr.controls.Container("grp_data");
			// Layout
			var xYLayout_3 = new cpr.controls.layouts.XYLayout();
			group_2.setLayout(xYLayout_3);
			(function(container){
				var userDefinedControl_2 = linker.userDefinedControl_2 = new udc.com.comTitle();
				userDefinedControl_2.bind("title").toLanguage("UI-SCR-LGPDEFLST");
				container.addChild(userDefinedControl_2, {
					"top": "5px",
					"left": "5px",
					"width": "355px",
					"height": "25px"
				});
				var grid_1 = linker.grid_1 = new cpr.controls.Grid("grdMstList");
				grid_1.init({
					"dataSet": app.lookup("dsMstList"),
					"columns": [
						{"width": "40px"},
						{"width": "100px"},
						{"width": "253px"}
					],
					"header": {
						"rows": [{"height": "27px"}],
						"cells": [
							{
								"constraint": {"rowIndex": 0, "colIndex": 0},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-GLS-NO");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 1},
								"configurator": function(cell){
									cell.style.setClasses(["require"]);
									cell.bind("text").toLanguage("UI-SCR-LGPCD");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 2},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-SCR-LGPCDNM");
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
									cell.columnName = "_repeatindex";
									cell.style.css({
										"text-align" : "center"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 1},
								"configurator": function(cell){
									cell.columnName = "CD";
									cell.style.css({
										"text-align" : "center"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 2},
								"configurator": function(cell){
									cell.columnName = "CD_NM";
								}
							}
						]
					}
				});
				if(typeof onGrdMstListSelectionChange == "function") {
					grid_1.addEventListener("selection-change", onGrdMstListSelectionChange);
				}
				container.addChild(grid_1, {
					"top": "30px",
					"left": "5px",
					"width": "410px",
					"height": "565px"
				});
				var userDefinedControl_3 = linker.userDefinedControl_3 = new udc.com.comTitle();
				userDefinedControl_3.bind("title").toLanguage("UI-SCR-LGPASGSPCDLIST");
				container.addChild(userDefinedControl_3, {
					"top": "5px",
					"left": "425px",
					"width": "355px",
					"height": "25px"
				});
				var grid_2 = linker.grid_2 = new cpr.controls.Grid("grdMstInList");
				grid_2.init({
					"dataSet": app.lookup("dsMstInList"),
					"columns": [
						{"width": "25px"},
						{"width": "25px"},
						{"width": "40px"},
						{"width": "100px"},
						{"width": "200px"},
						{"width": "200px"},
						{"width": "201px"},
						{
							"width": "138px",
							"visible": false
						},
						{
							"width": "140px",
							"visible": false
						},
						{
							"width": "136px",
							"visible": false
						},
						{
							"width": "105px",
							"visible": false
						},
						{
							"width": "88px",
							"visible": false
						},
						{
							"width": "98px",
							"visible": false
						}
					],
					"header": {
						"rows": [{"height": "27px"}],
						"cells": [
							{
								"constraint": {"rowIndex": 0, "colIndex": 0},
								"configurator": function(cell){
									cell.columnType = "checkbox";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 1},
								"configurator": function(cell){
									cell.text = "F";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 2},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-GLS-NO");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 3},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-SCR-LGPCD");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 4},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-SCR-LGPCDNM");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 5},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-SCR-LGPCDNM");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 6},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-SCR-LGPCDNM");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 7},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-SCR-LGPCDNM");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 8},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-SCR-LGPCDNM");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 9},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-SCR-LGPCDNM");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 10},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-SCR-LGPCDNM");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 11},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-SCR-LGPCDNM");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 12},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-SCR-LGPCDNM");
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
									cell.columnType = "checkbox";
									cell.style.css({
										"text-align" : "center"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 1},
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
								"constraint": {"rowIndex": 0, "colIndex": 2},
								"configurator": function(cell){
									cell.columnName = "_repeatindex";
									cell.style.css({
										"text-align" : "center"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 3},
								"configurator": function(cell){
									cell.columnName = "SP_CD";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 4},
								"configurator": function(cell){
									cell.columnName = "SP_NM";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 5},
								"configurator": function(cell){
									cell.columnName = "SA_CD_NM";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 6},
								"configurator": function(cell){
									cell.columnName = "SP_DN_DIV_RCD_NM";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 7},
								"configurator": function(cell){
									cell.columnName = "REF_KEY";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 8},
								"configurator": function(cell){
									cell.columnName = "SER_DIV_RCD";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 9},
								"configurator": function(cell){
									cell.columnName = "SER_RCD";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 10},
								"configurator": function(cell){
									cell.columnName = "REMARK";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 11},
								"configurator": function(cell){
									cell.columnName = "SA_CD";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 12},
								"configurator": function(cell){
									cell.columnName = "SP_SUB_DIV_RCD";
								}
							}
						]
					}
				});
				if(typeof onGrdMstInListSelectionChange == "function") {
					grid_2.addEventListener("selection-change", onGrdMstInListSelectionChange);
				}
				container.addChild(grid_2, {
					"top": "30px",
					"left": "425px",
					"width": "795px",
					"height": "280px"
				});
				var userDefinedControl_4 = linker.userDefinedControl_4 = new udc.com.comTitle();
				userDefinedControl_4.bind("title").toLanguage("UI-SCR-LGPASGSPCDLIST");
				container.addChild(userDefinedControl_4, {
					"top": "350px",
					"left": "425px",
					"width": "355px",
					"height": "25px"
				});
				var grid_3 = linker.grid_3 = new cpr.controls.Grid("grdMstOutList");
				grid_3.init({
					"dataSet": app.lookup("dsMstOutList"),
					"columns": [
						{"width": "25px"},
						{"width": "25px"},
						{"width": "40px"},
						{"width": "100px"},
						{"width": "200px"},
						{"width": "200px"},
						{"width": "201px"},
						{
							"width": "138px",
							"visible": false
						},
						{
							"width": "88px",
							"visible": false
						},
						{
							"width": "125px",
							"visible": false
						}
					],
					"header": {
						"rows": [{"height": "27px"}],
						"cells": [
							{
								"constraint": {"rowIndex": 0, "colIndex": 0},
								"configurator": function(cell){
									cell.columnType = "checkbox";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 1},
								"configurator": function(cell){
									cell.text = "F";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 2},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-GLS-NO");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 3},
								"configurator": function(cell){
									cell.style.setClasses(["require"]);
									cell.bind("text").toLanguage("UI-SCR-LGPCD");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 4},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-SCR-LGPCDNM");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 5},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-SCR-LGPCDNM");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 6},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-SCR-LGPCDNM");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 7},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-SCR-LGPCDNM");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 8},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-SCR-LGPCDNM");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 9},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-SCR-LGPCDNM");
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
									cell.columnType = "checkbox";
									cell.style.css({
										"text-align" : "center"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 1},
								"configurator": function(cell){
									cell.control = (function(){
										var output_3 = new cpr.controls.Output();
										output_3.style.css({
											"text-align" : "center"
										});
										return output_3;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 2},
								"configurator": function(cell){
									cell.columnName = "_repeatindex";
									cell.style.css({
										"text-align" : "center"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 3},
								"configurator": function(cell){
									cell.columnName = "SP_CD";
									cell.style.css({
										"text-align" : "center"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 4},
								"configurator": function(cell){
									cell.columnName = "SP_NM";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 5},
								"configurator": function(cell){
									cell.columnName = "SA_CD_NM";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 6},
								"configurator": function(cell){
									cell.columnName = "SP_DN_DIV_RCD_NM";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 7},
								"configurator": function(cell){
									cell.columnName = "REF_KEY";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 8},
								"configurator": function(cell){
									cell.columnName = "SA_CD";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 9},
								"configurator": function(cell){
									cell.columnName = "SP_SUB_DIV_RCD";
								}
							}
						]
					}
				});
				if(typeof onGrdMstOutListSelectionChange == "function") {
					grid_3.addEventListener("selection-change", onGrdMstOutListSelectionChange);
				}
				container.addChild(grid_3, {
					"top": "375px",
					"left": "425px",
					"width": "795px",
					"height": "220px"
				});
				var button_2 = new cpr.controls.Button("btnUp");
				button_2.value = "";
				if(typeof onBtnUpClick == "function") {
					button_2.addEventListener("click", onBtnUpClick);
				}
				container.addChild(button_2, {
					"top": "315px",
					"left": "750px",
					"width": "25px",
					"height": "25px"
				});
				var button_3 = new cpr.controls.Button("btnDown");
				button_3.value = "";
				if(typeof onBtnDownClick == "function") {
					button_3.addEventListener("click", onBtnDownClick);
				}
				container.addChild(button_3, {
					"top": "315px",
					"left": "839px",
					"width": "25px",
					"height": "25px"
				});
				var output_4 = new cpr.controls.Output("optKeyDate");
				output_4.value = "기준일자";
				output_4.style.setClasses(["require"]);
				container.addChild(output_4, {
					"top": "350px",
					"left": "911px",
					"width": "100px",
					"height": "25px"
				});
				var dateInput_1 = new cpr.controls.DateInput("dipKeyDate");
				dateInput_1.format = "YYYY-MM-DD";
				dateInput_1.bind("fieldLabel").toExpression("#optKeyDate.value");
				dateInput_1.bind("value").toDataMap(app.lookup("dmReqList"), "strCurTime");
				if(typeof onDipKeyDateValueChange == "function") {
					dateInput_1.addEventListener("value-change", onDipKeyDateValueChange);
				}
				container.addChild(dateInput_1, {
					"top": "350px",
					"left": "1015px",
					"width": "120px",
					"height": "25px"
				});
				var button_4 = new cpr.controls.Button("btnYearSmtHis");
				button_4.value = "";
				button_4.style.setClasses(["btn-pop-search"]);
				if(typeof onBtnYearSmtHisClick == "function") {
					button_4.addEventListener("click", onBtnYearSmtHisClick);
				}
				container.addChild(button_4, {
					"top": "350px",
					"left": "1135px",
					"width": "20px",
					"height": "25px"
				});
			})(group_2);
			container.addChild(group_2, {
				"top": "72px",
				"left": "5px",
				"width": "1225px",
				"height": "600px"
			});
			
			var embeddedApp_1 = new cpr.controls.EmbeddedApp("emaSchYearSmt");
			cpr.core.App.load("app/imp/impDialogSchYearSmt", function(app) {
				if(app){
					embeddedApp_1.app = app;
				}
			});
			container.addChild(embeddedApp_1, {
				"top": "50px",
				"left": "1255px",
				"width": "325px",
				"height": "75px"
			});
			if(typeof onBodyLoad == "function"){
				app.addEventListener("load", onBodyLoad);
			}
			// Linking
			linker.userDefinedControl_2.ctrl = linker.grid_1;
			linker.userDefinedControl_3.ctrl = linker.grid_2;
			linker.userDefinedControl_4.ctrl = linker.grid_3;
		}
	});
	app.title = "선택그룹조건입력";
	cpr.core.Platform.INSTANCE.register(app);
})();
