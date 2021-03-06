/*
 * App URI: app/cmn/stdCmnPMenuSch
 * Source Location: app/cmn/stdCmnPMenuSch.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("app/cmn/stdCmnPMenuSch", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			var util = new ComUtil(app);
			/******************************************************************************
			 * 부모 페이지에서 받아온 기본값을 받는 객체
			 * 내부적으로 Result라는 객체를 가지고 있으며, 부모에 넘겨줄 결과값을 저장
			 * @member moStdCmnPMenuSch
			 ******************************************************************************/	
			//var moStdCmnPMenuSch = {
			//	// 팝업 작동 내부사용
			//	controlId : "",
			//	openedByChange : false,
			//	
			//	// 검색어 기본값 지정
			//	strSystemRcd : "",
			//	strMenuId : "",
			//	strMenuNm : "",
			//	strPgmDtlTypeRcd : "",
			//	
			//	// 선택열 결과 리턴
			//	Result : {
			//		UNIT_SYSTEM_RCD : "", // 단위시스템구분
			//		MENU_ID : "",                // 메뉴ID
			//		MENU_NM : ""               // 메뉴명
			//	}
			//};
			
			/*
			 * Body에서 load 이벤트 발생 시 호출.
			 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
			 */
			function onBodyLoad(/* cpr.events.CEvent */ e){
				//리피트 초기 설정
			//	ExtRepeat.init(["rptCmnMenu"]);
				//검색조건 초기 설정
			//	ExtGroup.initSearchBox("grpSearch", "grpData");
				
				//부모창에서 전달한 값을 받는다.
				doParentGet();
				
				//서브미션 실행 (실패시 cover page)
				util.Submit.send(app, "subOnLoad", function(pbSuccess){
					if(pbSuccess){
						// 시스템구분 첫번째 셋팅
						util.Control.redraw(app, ["cbbUnitSystemRcd"]);
						
						// 메뉴ID/명 컨트롤 포커스
						if(util.Grid.getRowCount(app, "dsCmnMenu") == 0){
							util.Control.setFocus(app, "ipbMenuId");
						}
						
						// 조건값이 둘 중 하나만 있어도 바로 자동 조회를 한다.
						if (util.Control.getValue(app, "cbbUnitSystemRcd") != "" || util.Control.getValue(app, "ipbMenuId") != "") {
							/**@type cpr.controls.Button*/
							var voBtnSearch = app.lookup("btnSearch");
							voBtnSearch.click();
						}
					}
				}, true);
			}
			
			/**
			 * 호출한 페이지에서 파라미터 받기
			 */
			function doParentGet() {
				// 호출한 페이지에서 파라미터 받기.													
				var voStdCmnPMenuSch =  app.getHostProperty("initValue");
						
				// 파라미터  값복사 (deep copy)
			//	for (var key in voStdCmnPMenuSch) {
			//		if (key == "Result") {
			//			// 결과 값은 복사하지 않음.
			//			continue;
			//		}
			//		moStdCmnPMenuSch [key] = voStdCmnPMenuSch [key];
			//	}
				// 팝업이 뜬후에는 false로 고침.
			//	voStdCmnPMenuSch.openedByChange = false;
				
				// 파라미터 받아서 초기 검색조건 세팅.
				var voParam = voStdCmnPMenuSch;
				
				// 시스템구분
				if (voParam.strSystemRcd) {
					util.SelectCtl.setValue(app, "cbbUnitSystemRcd", voParam.strSystemRcd);
				}
				
				// 메뉴ID
				if (voParam.strMenuId) {
					util.Control.setValue(app, app, "ipbMenuId", voParam.strMenuId);
				}
				
				util.DataMap.setValue(app, "dmReqList", "strPgmDtlTypeRcd", voParam.strPgmDtlTypeRcd)
			};
			
			
			
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
					/** @type udc.com.btnSearch*/
					var voBtnSearch = app.lookup("btnSearch");
					voBtnSearch.click();
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
				doList(function(pbSuccess) {
					if (pbSuccess) {
						util.Msg.notify(app, "NLS-INF-M024");
					}
				});
			}
			
			/**
			 * 조회버튼 이벤트(메뉴 목록을 조회한다.)
			 * @param poCallBackFunc 콜백함수
			 */
			function doList(poCallBackFunc) {			
				// 조회 서브미션 호출
				util.Submit.send(app, "subList", function(pbSuccess){
					if(pbSuccess){
						// 메뉴목록 
						util.Control.redraw(app, "grpData");
						
						// 조회 후 콜백함수 수행
						if (util.isFunc(poCallBackFunc)) {
							poCallBackFunc(pbSuccess)
						}; 
					}
				});
			}
			
			/**
			 * doCloseOk (선택닫기 이벤트시 호출) 	
			 * @return void 
			 */
			function doCloseOk() {
				var vsSelectIndxs = util.Grid.getIndex(app, "grdCmnMenu");
				
				if(ValueUtil.isNull(vsSelectIndxs)){
					//선택된 데이터가 없습니다.
					util.Msg.warn("M008");
					return false;
				}
			
			//	var voResult = moStdCmnPMenuSch.Result;
				var voResult = app.lookup("grdCmnMenu").getSelectedRow().getRowData();
			
			//	var vnIdx = ExtRepeat.getIndex("rptCmnMenu");
			//	voResult.UNIT_SYSTEM_RCD = ExtRepeat.getValue("rptCmnMenu", "rdCbbUnitSystemRcd", vnIdx);   //단위시스템코드
			//	voResult.MENU_ID = ExtRepeat.getValue("rptCmnMenu", "rdOptMenuId", vnIdx);      //메뉴ID
			//	voResult.MENU_NM = ExtRepeat.getValue("rptCmnMenu", "rdOptPgmNm", vnIdx);   //메뉴명
				
			//	ExtPopUp.closeLayeredPopup("callbackStdCmnPMenuSch", moStdCmnPMenuSch);
				app.setHostProperty("returnValue", voResult);
			
				app.close();
			}
			
			/*
			 * 그리드에서 row-dblclick 이벤트 발생 시 호출.
			 * detail이 row를 더블클릭 한 경우 발생하는 이벤트.
			 */
			function onGrdCmnMenuRowDblclick(/* cpr.events.CGridEvent */ e){
				/** 
				 * @type cpr.controls.Grid
				 */
				var grdCmnMenu = e.control;
				doCloseOk();
			}
			
			/*
			 * "선택닫기" 버튼에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onBtnCloseOkClick(/* cpr.events.CMouseEvent */ e){
				/**  
				 * @type cpr.controls.Button
				 */
				var btnCloseOk = e.control;
				doCloseOk();
			}
			
			/*
			 * "화면닫기" 버튼에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onBtnCloseClick(/* cpr.events.CMouseEvent */ e){
				/** 
				 * @type cpr.controls.Button
				 */
				var btnClose = e.control;
				app.close();
			};
			// End - User Script
			
			// Header
			var dataSet_1 = new cpr.data.DataSet("dsUnitSystemRcdList");
			dataSet_1.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_1);
			
			var dataSet_2 = new cpr.data.DataSet("dsCmnMenu");
			dataSet_2.parseData({
				"columns": [
					{"name": "MENU_ID"},
					{"name": "PGM_ID"},
					{"name": "MENU_NM"},
					{"name": "UMENU_NM"},
					{"name": "UNIT_SYSTEM_RCD"}
				],
				"rows": []
			});
			app.register(dataSet_2);
			var dataMap_1 = new cpr.data.DataMap("dmReqList");
			dataMap_1.parseData({
				"columns" : [
					{
						"name": "strSystemRcd",
						"dataType": "string"
					},
					{
						"name": "strMenuId",
						"dataType": "string"
					},
					{
						"name": "strPgmDtlTypeRcd",
						"dataType": "string"
					}
				]
			});
			app.register(dataMap_1);
			var submission_1 = new cpr.protocols.Submission("subOnLoad");
			submission_1.action = "/cmn/StdCmnMenuSch/";
			submission_1.mediaType = "application/x-www-form-urlencoded";
			submission_1.addResponseData(dataSet_1, false);
			app.register(submission_1);
			
			var submission_2 = new cpr.protocols.Submission("subList");
			submission_2.action = "/cmn/StdCmnMenuSch/";
			submission_2.mediaType = "application/x-www-form-urlencoded";
			submission_2.addRequestData(dataMap_1);
			submission_2.addResponseData(dataSet_2, false);
			app.register(submission_2);
			
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
			
			var group_1 = new cpr.controls.Container("grpData");
			// Layout
			var xYLayout_2 = new cpr.controls.layouts.XYLayout();
			group_1.setLayout(xYLayout_2);
			(function(container){
				var userDefinedControl_2 = linker.userDefinedControl_2 = new udc.com.comTitle();
				userDefinedControl_2.bind("title").toLanguage("UI-GLS-REQZ");
				container.addChild(userDefinedControl_2, {
					"top": "5px",
					"left": "5px",
					"width": "215px",
					"height": "25px"
				});
				var grid_1 = linker.grid_1 = new cpr.controls.Grid("grdCmnMenu");
				grid_1.init({
					"dataSet": app.lookup("dsCmnMenu"),
					"columns": [
						{"width": "40px"},
						{"width": "178px"},
						{"width": "225px"},
						{"width": "102px"},
						{"width": "110px"}
					],
					"header": {
						"rows": [{"height": "27px"}],
						"cells": [
							{
								"constraint": {"rowIndex": 0, "colIndex": 0},
								"configurator": function(cell){
									cell.text = "No";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 1},
								"configurator": function(cell){
									cell.text = "메뉴ID";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 2},
								"configurator": function(cell){
									cell.text = "메뉴명";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 3},
								"configurator": function(cell){
									cell.text = "단위시스템";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 4},
								"configurator": function(cell){
									cell.text = "상위메뉴명";
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
									cell.columnName = "MENU_ID";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 2},
								"configurator": function(cell){
									cell.columnName = "MENU_NM";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 3},
								"configurator": function(cell){
									cell.columnName = "UNIT_SYSTEM_RCD";
									cell.control = (function(){
										var comboBox_1 = new cpr.controls.ComboBox("gdCbbUnitSystemRcd");
										comboBox_1.enabled = false;
										comboBox_1.hideButton = true;
										(function(comboBox_1){
											comboBox_1.setItemSet(app.lookup("dsUnitSystemRcdList"), {
												"label": "CD_NM",
												"value": "CD"
											});
										})(comboBox_1);
										comboBox_1.bind("value").toDataColumn("UNIT_SYSTEM_RCD");
										return comboBox_1;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 4},
								"configurator": function(cell){
									cell.columnName = "UMENU_NM";
								}
							}
						]
					}
				});
				if(typeof onGrdCmnMenuRowDblclick == "function") {
					grid_1.addEventListener("row-dblclick", onGrdCmnMenuRowDblclick);
				}
				container.addChild(grid_1, {
					"top": "30px",
					"left": "5px",
					"width": "675px",
					"height": "275px"
				});
			})(group_1);
			container.addChild(group_1, {
				"top": "67px",
				"left": "5px",
				"width": "685px",
				"height": "310px"
			});
			
			var group_2 = new cpr.controls.Container("grpSearch");
			group_2.style.setClasses(["search-box"]);
			// Layout
			var xYLayout_3 = new cpr.controls.layouts.XYLayout();
			group_2.setLayout(xYLayout_3);
			(function(container){
				var button_1 = new cpr.controls.Button("btnSearch");
				button_1.value = "조회";
				button_1.style.setClasses(["btn-search"]);
				if(typeof onBtnSearchClick == "function") {
					button_1.addEventListener("click", onBtnSearchClick);
				}
				container.addChild(button_1, {
					"top": "5px",
					"left": "620px",
					"width": "60px",
					"height": "25px"
				});
				var output_1 = new cpr.controls.Output("optUnitSystemRcd");
				output_1.value = "";
				output_1.bind("value").toLanguage("UI-SCR-SYSTEMDIV");
				container.addChild(output_1, {
					"top": "5px",
					"left": "5px",
					"width": "100px",
					"height": "25px"
				});
				var comboBox_2 = new cpr.controls.ComboBox("cbbUnitSystemRcd");
				comboBox_2.bind("fieldLabel").toExpression("#optUnitSystemRcd.value");
				comboBox_2.bind("value").toDataMap(app.lookup("dmReqList"), "strSystemRcd");
				(function(comboBox_2){
					comboBox_2.addItem(new cpr.controls.Item("전체", ""));
					comboBox_2.setItemSet(app.lookup("dsUnitSystemRcdList"), {
						"label": "CD_NM",
						"value": "CD"
					});
				})(comboBox_2);
				container.addChild(comboBox_2, {
					"top": "5px",
					"left": "110px",
					"width": "130px",
					"height": "25px"
				});
				var output_2 = new cpr.controls.Output("optMenuId");
				output_2.value = "";
				output_2.bind("value").toLanguage("UI-DB-MENU_ID");
				container.addChild(output_2, {
					"top": "5px",
					"left": "250px",
					"width": "100px",
					"height": "25px"
				});
				var inputBox_1 = new cpr.controls.InputBox("ipbMenuId");
				inputBox_1.bind("value").toDataMap(app.lookup("dmReqList"), "strMenuId");
				if(typeof onIpbMenuIdKeydown == "function") {
					inputBox_1.addEventListener("keydown", onIpbMenuIdKeydown);
				}
				container.addChild(inputBox_1, {
					"top": "5px",
					"left": "355px",
					"width": "200px",
					"height": "25px"
				});
			})(group_2);
			container.addChild(group_2, {
				"top": "35px",
				"left": "5px",
				"width": "685px",
				"height": "32px"
			});
			
			var button_2 = new cpr.controls.Button("btnClose");
			button_2.value = "화면닫기";
			if(typeof onBtnCloseClick == "function") {
				button_2.addEventListener("click", onBtnCloseClick);
			}
			container.addChild(button_2, {
				"top": "380px",
				"left": "5px",
				"width": "60px",
				"height": "25px"
			});
			
			var button_3 = new cpr.controls.Button("btnCloseOk");
			button_3.value = "선택닫기";
			if(typeof onBtnCloseOkClick == "function") {
				button_3.addEventListener("click", onBtnCloseOkClick);
			}
			container.addChild(button_3, {
				"top": "380px",
				"left": "630px",
				"width": "60px",
				"height": "25px"
			});
			if(typeof onBodyLoad == "function"){
				app.addEventListener("load", onBodyLoad);
			}
			// Linking
			linker.userDefinedControl_2.ctrl = linker.grid_1;
		}
	});
	app.title = "메뉴검색팝업";
	cpr.core.Platform.INSTANCE.register(app);
})();
