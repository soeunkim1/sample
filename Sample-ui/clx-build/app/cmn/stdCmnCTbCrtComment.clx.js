/*
 * App URI: app/cmn/stdCmnCTbCrtComment
 * Source Location: app/cmn/stdCmnCTbCrtComment.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("app/cmn/stdCmnCTbCrtComment", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			//공통 모듈 사용
			var util = new ComUtil(app);
			
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
			}//onGrpSearchKeydown()
			
			/*
			 * "" 버튼에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onBtnSearchClick(/* cpr.events.CMouseEvent */ e){
				/** 
				 * @type cpr.controls.Button
				 */
				var btnSearch = e.control;
				
				// 데이터 변경상태 체크 메시지(기본, 임베디드 앱 존재 할 경우 isChangedFormData())
				if (util.Grid.isModified(app, "grdMst", "CRM")) {
					return false;
				}
				
				//필수항목을 검사합니다.
				if(!util.validate(app, "ipbSchcol")){
					return false;
				}
				doSearch("btnSearch");
			}//onBtnSearchClick()
			
			function doSearch(psBtnId){
				util.Submit.send(app, "subList", function(pbSuccess){
					if(pbSuccess){
						util.Control.redraw(app, "grdMst");
						if(psBtnId == "btnSearch"){
							util.Msg.notify(app, "NLS-INF-M024");
						}else{
							util.Msg.notify(app, "NLS-INF-M025");
						}
					}
				});
			}//doSearch()
			
			/*
			 * "쿼리생성" 버튼에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onBtnNewClick(/* cpr.events.CMouseEvent */ e){
				/** 
				 * @type cpr.controls.Button
				 */
				var btnNew = e.control;
				doQueryCerate();
			}//onBtnNewClick()
			
			/**
			 * @desc doQueryCerate event 커멘트 쿼리 생성
			 * @return void
			 */
			function doQueryCerate(){
				var vsPanelCheckIdx = util.Grid.getCheckOrSelectedRowIndex(app, "grdMst");
				
				if (ValueUtil.isNull(vsPanelCheckIdx)) {
					util.Msg.notify(app, "NLS-INF-M045", "INFO", ["데이터"]);
					return false;
				}else{		
					var vnCnt = vsPanelCheckIdx.length;
					for (var i = 0; i < vnCnt; i++) {
						var vnIndex = vsPanelCheckIdx[i];
			
						var vsTableNm = util.Grid.getCellValue(app, "grdMst", "TABLE_NAME", vnIndex);
						var vsColNm = util.Grid.getCellValue(app, "grdMst", "COLUMN_NAME", vnIndex);
						var vsModifyComment	= util.Grid.getCellValue(app, "grdMst", "MODIFY_COMMENTS", vnIndex);
						var vsCmnCd = util.Grid.getCellValue(app, "grdMst", "CMN_CODE", vnIndex);
			
						if(ValueUtil.fixNull(vsModifyComment) == "" || vsModifyComment == ""){
							util.Msg.warn("M100",["수정할 설명"]);
							
							//eXbuilder5에서 주석처리 되어 있음
							//var voRow = vcGrxMst.getRowIndex(vnIndex);
							//vcGrxMst.startEdit(voRow,"ghcModifyComments");
							return;
						}				
						
						var vsTmp = vsModifyComment.split("'");
						vsModifyComment = "";
						for(var k=0; k<vsTmp.length; k++){
							vsModifyComment += vsTmp[k];
						}
						
						util.Grid.setCellValue(app, "grdMst", "MODIFY_COMMENTS", vsModifyComment, vnIndex);
						util.Grid.setCellValue(app, "grdMst", "CMN_CODE", vsCmnCd, vnIndex);
						util.Grid.setRowState(app, "grdMst", cpr.data.tabledata.RowState.UPDATED, vnIndex);
					}
					
					util.Submit.send(app, "subExcute", function(pbSuccess){
						if(pbSuccess) {
							util.Control.redraw(app, "grdWrMst");
							util.Control.redraw(app, "grdWrMst_title");
							util.Msg.notify(app, "NLS-INF-M043", "INFO", [i]);
						}
					});
				}
			}
			/*
			 * "" 버튼에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onBtnCrtClick(/* cpr.events.CMouseEvent */ e){
				/** 
				 * @type cpr.controls.Button
				 */
				var btnCrt = e.control;
				doCommentExcute();
			}//onBtnCrtClick()
			
			/**
			 * @desc doCommentExcute event 커멘트 쿼리 실행
			 * @return void
			 */
			function doCommentExcute(){
				var voRow = util.Grid.getIndex(app, "grdWrMst");
				var vcRpt = app.lookup("grdWrMst");
			
				util.DataMap.setValue(app, "dmReqList","voGrxwrMstQuery",util.Grid.getCellValue(app, "grdWrMst", "QUREY_TXT", voRow)); 
				util.Submit.send(app, "subQurey", function(pbSuccess){
					if(pbSuccess){
						//커멘트를 성공적으로 저장하였습니다.
						util.Msg.notify(app, "NLS-INF-M010", "INFO", ["Comment"]);
									
						app.lookup("dsWrMst").realDeleteRow(voRow);
						util.Control.redraw(app, "grdWrMst");
						util.Control.redraw(app, "grdWrMst_title");
						
						var vnRowCnt = util.Grid.getRowCount(app, "grdWrMst");
						if(vnRowCnt == 0){
							doSearch("grdWrMst");
						}
					}else{
						util.Msg.notify(app, "NLS-INF-M033");
					}
				});
			}//doCommentExcute()
			
			/*
			 * "" 버튼에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onBtnRestoreClick(/* cpr.events.CMouseEvent */ e){
				/** 
				 * @type cpr.controls.Button
				 */
				var btnRestore = e.control;
				util.Grid.revertRowData(app, "grdMst");
			};
			// End - User Script
			
			// Header
			var dataSet_1 = new cpr.data.DataSet("dsMst");
			dataSet_1.parseData({
				"columns": [
					{"name": "TABLE_NAME"},
					{"name": "T_COMMENTS"},
					{"name": "COLUMN_NAME"},
					{"name": "COMMENTS"},
					{"name": "MODIFY_COMMENTS"},
					{"name": "CMN_CODE"}
				],
				"rows": []
			});
			app.register(dataSet_1);
			
			var dataSet_2 = new cpr.data.DataSet("dsWrMst");
			dataSet_2.parseData({
				"columns": [
					{"name": "TABLE_NAME"},
					{"name": "QUREY_TXT"}
				],
				"rows": []
			});
			app.register(dataSet_2);
			var dataMap_1 = new cpr.data.DataMap("dmReqList");
			dataMap_1.parseData({
				"columns" : [
					{
						"name": "vsColumNM",
						"dataType": "string"
					},
					{
						"name": "voGrxwrMstQuery",
						"dataType": "string"
					}
				]
			});
			app.register(dataMap_1);
			var submission_1 = new cpr.protocols.Submission("subList");
			submission_1.action = "/cmn/StdCmnTbCrtComment/";
			submission_1.mediaType = "application/x-www-form-urlencoded";
			submission_1.addRequestData(dataMap_1);
			submission_1.addResponseData(dataSet_1, false);
			app.register(submission_1);
			
			var submission_2 = new cpr.protocols.Submission("subExcute");
			submission_2.action = "/cmn/StdCmnTbCrtComment/";
			submission_2.mediaType = "application/x-www-form-urlencoded";
			submission_2.addRequestData(dataSet_1);
			submission_2.addResponseData(dataSet_2, false);
			app.register(submission_2);
			
			var submission_3 = new cpr.protocols.Submission("subQurey");
			submission_3.action = "/cmn/StdCmnTbCrtComment/";
			submission_3.mediaType = "application/x-www-form-urlencoded";
			submission_3.addRequestData(dataMap_1);
			app.register(submission_3);
			
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
				var output_1 = new cpr.controls.Output("optSchcol");
				output_1.value = "";
				output_1.style.setClasses(["require"]);
				output_1.bind("value").toLanguage("UI-SCR-SCH_COL");
				container.addChild(output_1, {
					"top": "5px",
					"left": "5px",
					"width": "80px",
					"height": "25px"
				});
				var inputBox_1 = new cpr.controls.InputBox("ipbSchcol");
				inputBox_1.imeMode = "inactive";
				inputBox_1.userAttr({"require": "Y"});
				inputBox_1.bind("fieldLabel").toExpression("#optSchcol.value");
				inputBox_1.bind("value").toDataMap(app.lookup("dmReqList"), "vsColumNM");
				if(typeof onIpbSchcolKeydown == "function") {
					inputBox_1.addEventListener("keydown", onIpbSchcolKeydown);
				}
				container.addChild(inputBox_1, {
					"top": "5px",
					"left": "90px",
					"width": "200px",
					"height": "25px"
				});
			})(group_1);
			container.addChild(group_1, {
				"top": "5px",
				"left": "5px",
				"width": "1225px",
				"height": "32px"
			});
			
			var group_2 = new cpr.controls.Container("grpMst");
			// Layout
			var xYLayout_3 = new cpr.controls.layouts.XYLayout();
			group_2.setLayout(xYLayout_3);
			(function(container){
				var userDefinedControl_1 = linker.userDefinedControl_1 = new udc.com.comTitle();
				userDefinedControl_1.bind("title").toLanguage("UI-SCR-COMMENT_CRT");
				container.addChild(userDefinedControl_1, {
					"top": "5px",
					"left": "5px",
					"width": "300px",
					"height": "25px"
				});
				var grid_1 = linker.grid_1 = new cpr.controls.Grid("grdMst");
				grid_1.init({
					"dataSet": app.lookup("dsMst"),
					"columns": [
						{"width": "25px"},
						{"width": "40px"},
						{"width": "160px"},
						{"width": "160px"},
						{"width": "190px"},
						{"width": "126px"},
						{"width": "126px"},
						{"width": "126px"},
						{"width": "25px"}
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
									cell.bind("text").toLanguage("UI-GLS-NO");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 2},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-SCR-TBNM");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 3},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-SCR-CREATEDT");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 4},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-DB-COLNM");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 5},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-SCR-EXPLAIN");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 6},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-SCR-EXPLAIN");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 7},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-DB-CD_NM");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 8},
								"configurator": function(cell){
									cell.text = "F";
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
									cell.columnName = "word";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 4},
								"configurator": function(cell){
									cell.columnName = "COLUMN_NAME";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 5},
								"configurator": function(cell){
									cell.columnName = "COMMENTS";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 6},
								"configurator": function(cell){
									cell.columnName = "MODIFY_COMMENTS";
									cell.control = (function(){
										var inputBox_2 = new cpr.controls.InputBox("gdIpbModifyComments");
										inputBox_2.bind("value").toDataColumn("MODIFY_COMMENTS");
										return inputBox_2;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 7},
								"configurator": function(cell){
									cell.columnName = "CMN_CODE";
									cell.control = (function(){
										var inputBox_3 = new cpr.controls.InputBox("gdIpbCmnCode");
										inputBox_3.bind("value").toDataColumn("CMN_CODE");
										return inputBox_3;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 8},
								"configurator": function(cell){
									cell.control = (function(){
										var output_2 = new cpr.controls.Output();
										output_2.style.css({
											"text-align" : "center"
										});
										return output_2;
									})();
								}
							}
						]
					}
				});
				if(typeof onGrdMstSelectionChange == "function") {
					grid_1.addEventListener("selection-change", onGrdMstSelectionChange);
				}
				container.addChild(grid_1, {
					"top": "30px",
					"left": "5px",
					"width": "1215px",
					"height": "200px"
				});
				var userDefinedControl_2 = linker.userDefinedControl_2 = new udc.com.comTitle();
				userDefinedControl_2.bind("title").toLanguage("UI-SCR-CRT_QUERY");
				container.addChild(userDefinedControl_2, {
					"top": "235px",
					"left": "5px",
					"width": "265px",
					"height": "25px"
				});
				var grid_2 = linker.grid_2 = new cpr.controls.Grid("grdWrMst");
				grid_2.init({
					"dataSet": app.lookup("dsWrMst"),
					"columns": [
						{"width": "40px"},
						{"width": "843px"},
						{"width": "60px"}
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
									cell.bind("text").toLanguage("UI-SCR-CRT_QUREY_TXT");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 2},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-GLS-CRT");
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
									cell.columnType = "rowindex";
									cell.style.css({
										"text-align" : "center"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 1},
								"configurator": function(cell){
									cell.columnName = "QUREY_TXT";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 2},
								"configurator": function(cell){
									cell.columnName = "word";
									cell.control = (function(){
										var button_2 = new cpr.controls.Button("btnCrt");
										button_2.bind("value").toDataColumn("word");
										return button_2;
									})();
								}
							}
						]
					}
				});
				if(typeof onGrdWrMstSelectionChange == "function") {
					grid_2.addEventListener("selection-change", onGrdWrMstSelectionChange);
				}
				container.addChild(grid_2, {
					"top": "260px",
					"left": "5px",
					"width": "1215px",
					"height": "285px"
				});
				var button_3 = new cpr.controls.Button("btnNew");
				button_3.value = "쿼리생성";
				if(typeof onBtnNewClick == "function") {
					button_3.addEventListener("click", onBtnNewClick);
				}
				container.addChild(button_3, {
					"top": "5px",
					"left": "1095px",
					"width": "60px",
					"height": "25px"
				});
				var button_4 = new cpr.controls.Button("btnRestore");
				button_4.value = "취소";
				button_4.style.setClasses(["btn-restore"]);
				if(typeof onBtnRestoreClick == "function") {
					button_4.addEventListener("click", onBtnRestoreClick);
				}
				container.addChild(button_4, {
					"top": "5px",
					"left": "1160px",
					"width": "60px",
					"height": "25px"
				});
			})(group_2);
			container.addChild(group_2, {
				"top": "42px",
				"left": "5px",
				"width": "1225px",
				"height": "550px"
			});
			
			var userDefinedControl_3 = new udc.com.appHeader("appheader1");
			container.addChild(userDefinedControl_3, {
				"top": "5px",
				"right": "5px",
				"left": "5px",
				"height": "25px"
			});
			if(typeof onBodyLoad == "function"){
				app.addEventListener("load", onBodyLoad);
			}
			// Linking
			linker.userDefinedControl_1.ctrl = linker.grid_1;
			linker.userDefinedControl_2.ctrl = linker.grid_2;
		}
	});
	app.title = "Untitled";
	cpr.core.Platform.INSTANCE.register(app);
})();
