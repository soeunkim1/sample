/*
 * App URI: app/cmn/stdCmnPNat
 * Source Location: app/cmn/stdCmnPNat.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("app/cmn/stdCmnPNat", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			var util = new ComUtil(app);
			var moObjDivRcdName = {};
							
			var moLanDivRcdName = {};
			
			//var moStdCmnPNat = {
			//	// 팝업 작동 내부사용
			//	controlId : null,		// 팝업을 호출한 아이디
			//	openedByChange : false,		// 값 변경에 의한 호출 여부
			//	
			//	strLanDivRcd : "",		// 언어키
			//	strNatNm : "",		// 국가명
			//	
			//	// 선택가능 범위를 제한함.
			//	// 검색어 기본값 지정
			//	result : {
			//		NAT_CD : "",	//국가코드
			//		NAT_NM : "",		//국가명
			//		KEDI_CODE : ""		//KEDI 국가코드
			//	}
			//};
			/*
			 * Body에서 load 이벤트 발생 시 호출.
			 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
			 */
			function onBodyLoad(/* cpr.events.CEvent */ e){
			//	ExtRepeat.init("rptCmnNat");
			//	//검색조건 초기 설정
			//	ExtGroup.initSearchBox("grpSearch", "grp_rptCmnNat");
				
				// 호출한 페이지에서 파라미터 받기.													
			//	var voStdCmnPNatSch =  ExtPopUp.getParentVal("moStdCmnPNat");
			//	var voStdCmnPNatSch = util.getApp().getHostProperty("initValue");
						
				// 파라미터  값복사 (deep copy)
			//	for (var key in voStdCmnPNatSch) {
			//		if (key == "result") {
			//			// 결과 값은 복사하지 않음.
			//			continue;
			//		}
			//		moStdCmnPNat [key] = voStdCmnPNatSch [key];
			//	}
				// 팝업이 뜬후에는 false로 고침.
			//	voStdCmnPNatSch.openedByChange = false;
				
				// 파라미터 받아서 초기 검색조건 세팅.
			//	var voParam = moStdCmnPNat;
				var voParam = app.getHostProperty("initValue");
			
				// 서브미션 호출
				util.Submit.send(app, "subOnLoad", function(pbSuccess){
					if (pbSuccess) {	
			//			ExtControl.refresh(["cbbLanDivRcd"]);
						util.Control.redraw(app, "cbbLanDivRcd");
						
						if (voParam) {
							// 언어키
							if (voParam.strLanDivRcd) {
			//					ExtControl.setValue("cbbLanDivRcd",voParam.strLanDivRcd);
								util.Control.setValue(app, app, "cbbLanDivRcd", voParam.strLanDivRcd);
							}
							// 국가명
							if (voParam.strNatNm) {
								util.Control.setValue(app, app, "ipbNatNm", voParam.strNatNm);
							}
							
						}
						// 검색어가 입력되어 있는 경우 바로 검색 실행
						if (voParam.strNatNm != "") {
							// 검색 실행.
							/**@type cpr.controls.Button */
							var voBtnSearch = app.lookup("btnSearch");
							voBtnSearch.click();
						}
					} 
				}, true);
			}
			
			
			/**
			 * doList (검색탭 조회) 	
			 * @return void
			 */
			function doList() {
				//조회 
				util.Submit.send(app, "subList", function(pbSuccess){
					if(pbSuccess){
						util.Control.redraw(app, "grdCmnNat");
						util.Msg.notify(app, "NLS-INF-M024");
					}
				});
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
					/** @type cpr.controls.Button*/
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
				if(!util.validate(app, ["ipbNatNm","cbbLanDivRcd"])) return false;
				
				doList();
			}
			
			/**
			 * doCloseOk (선택닫기 이벤트시 호출) 	
			 * @return void
			 */
			function doCloseOk() {
			//	var voResult = moStdCmnPNat.result;
				var vsSelectIndxs = util.Grid.getCheckOrSelectedRowIndex(app, "grdCmnNat");
				if(ValueUtil.isNull(vsSelectIndxs)){
					//선택된 데이터가 없습니다.
					util.Msg.notify(app, "M008");
					return false;
				}
				
				var voResult = app.lookup("grdCmnNat").getSelectedRow().getRowData();
			
			//	var vnIdx = ExtRepeat.getIndex("rptCmnNat");
			//		
			//	voResult.NAT_CD = ExtRepeat.getValue("rptCmnNat"  , "rdOptCd"      , vnIdx);       //국가코드
			//	voResult.NAT_NM = ExtRepeat.getValue("rptCmnNat" , "rdOptCdNm" , vnIdx);      //국가명
			//	voResult.KEDI_CODE = ExtRepeat.getValue("rptCmnNat" , "rdOptCdPrp1" , vnIdx);      //KEDI 국가코드
			
			//	ExtPopUp.closeLayeredPopup("callbackStdCmnPNatSch", moStdCmnPNat);
				app.setHostProperty("returnValue", voResult);
				app.close();
			}
			
			/*
			 * 그리드에서 row-dblclick 이벤트 발생 시 호출.
			 * detail이 row를 더블클릭 한 경우 발생하는 이벤트.
			 */
			function onGrdCmnNatRowDblclick(/* cpr.events.CGridEvent */ e){
				/** 
				 * @type cpr.controls.Grid
				 */
				var grdCmnNat = e.control;
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
			function onBtnCloseCancelClick(/* cpr.events.CMouseEvent */ e){
				/** 
				 * @type cpr.controls.Button
				 */
				var btnCloseCancel = e.control;
				app.close();
			};
			// End - User Script
			
			// Header
			var dataSet_1 = new cpr.data.DataSet("dsCmnNat");
			dataSet_1.parseData({
				"columns": [
					{"name": "PRT_ORD"},
					{"name": "LAN_DIV_RCD"},
					{"name": "CD_NM"},
					{"name": "UCD"},
					{"name": "OG_CD"},
					{"name": "CD_LEN"},
					{"name": "CD_PRP10"},
					{"name": "CD_PRP1"},
					{"name": "ULAN_DIV_RCD"},
					{"name": "CD_PRP2"},
					{"name": "CD_PRP3"},
					{"name": "CD_PRP4"},
					{"name": "CD_PRP5"},
					{"name": "CD_PRP6"},
					{"name": "CD_PRP7"},
					{"name": "CD_PRP8"},
					{"name": "CD_DESC"},
					{"name": "CD_PRP9"},
					{"name": "UNIT_SYSTEM_RCD"},
					{"name": "EFFT_END_DT"},
					{"name": "CD_SHORT_NM"},
					{"name": "CD_CLS"},
					{"name": "CD"},
					{"name": "EFFT_ST_DT"}
				],
				"rows": []
			});
			app.register(dataSet_1);
			
			var dataSet_2 = new cpr.data.DataSet("dsListLanDivRcd");
			dataSet_2.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_2);
			var dataMap_1 = new cpr.data.DataMap("dmReqCmd");
			dataMap_1.parseData({
				"columns" : [
					{
						"name": "strNatNm",
						"dataType": "string"
					},
					{
						"name": "strLanDivRcd",
						"dataType": "string"
					}
				]
			});
			app.register(dataMap_1);
			var submission_1 = new cpr.protocols.Submission("subOnLoad");
			submission_1.action = "/cmn/StdCmnNat/";
			submission_1.mediaType = "application/x-www-form-urlencoded";
			submission_1.addResponseData(dataMap_1, false);
			submission_1.addResponseData(dataSet_2, false);
			app.register(submission_1);
			
			var submission_2 = new cpr.protocols.Submission("subList");
			submission_2.action = "/cmn/StdCmnNat/";
			submission_2.mediaType = "application/x-www-form-urlencoded";
			submission_2.addRequestData(dataMap_1);
			submission_2.addResponseData(dataSet_1, false);
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
			
			var button_1 = new cpr.controls.Button("btnCloseOk");
			button_1.value = "선택닫기";
			if(typeof onBtnCloseOkClick == "function") {
				button_1.addEventListener("click", onBtnCloseOkClick);
			}
			container.addChild(button_1, {
				"top": "415px",
				"left": "582px",
				"width": "60px",
				"height": "25px"
			});
			
			var button_2 = new cpr.controls.Button("btnCloseCancel");
			button_2.value = "화면닫기";
			button_2.style.setClasses(["btn-commit"]);
			if(typeof onBtnCloseCancelClick == "function") {
				button_2.addEventListener("click", onBtnCloseCancelClick);
			}
			container.addChild(button_2, {
				"top": "415px",
				"left": "10px",
				"width": "60px",
				"height": "25px"
			});
			
			var group_1 = new cpr.controls.Container("grpSearch");
			group_1.style.setClasses(["search-box"]);
			// Layout
			var xYLayout_2 = new cpr.controls.layouts.XYLayout();
			group_1.setLayout(xYLayout_2);
			(function(container){
				var output_1 = new cpr.controls.Output("optNatNm");
				output_1.value = "";
				output_1.style.setClasses(["require"]);
				output_1.bind("value").toLanguage("UI-SCR-CNTRYNM");
				container.addChild(output_1, {
					"top": "5px",
					"left": "5px",
					"width": "90px",
					"height": "25px"
				});
				var output_2 = new cpr.controls.Output("optLanDivRcd");
				output_2.value = "";
				output_2.style.setClasses(["require"]);
				output_2.bind("value").toLanguage("UI-SCR-LANKEY");
				container.addChild(output_2, {
					"top": "5px",
					"left": "250px",
					"width": "90px",
					"height": "25px"
				});
				var inputBox_1 = new cpr.controls.InputBox("ipbNatNm");
				inputBox_1.userAttr({"require": "Y"});
				inputBox_1.bind("fieldLabel").toExpression("#optNatNm.value");
				inputBox_1.bind("value").toDataMap(app.lookup("dmReqCmd"), "strNatNm");
				if(typeof onIpbNatNmKeydown == "function") {
					inputBox_1.addEventListener("keydown", onIpbNatNmKeydown);
				}
				container.addChild(inputBox_1, {
					"top": "5px",
					"left": "100px",
					"width": "140px",
					"height": "25px"
				});
				var button_3 = new cpr.controls.Button("btnSearch");
				button_3.value = "조회";
				button_3.style.setClasses(["btn-search"]);
				if(typeof onBtnSearchClick == "function") {
					button_3.addEventListener("click", onBtnSearchClick);
				}
				if(typeof onBtnSearchClick == "function") {
					button_3.addEventListener("click", onBtnSearchClick);
				}
				container.addChild(button_3, {
					"top": "5px",
					"left": "575px",
					"width": "60px",
					"height": "25px"
				});
				var comboBox_1 = new cpr.controls.ComboBox("cbbLanDivRcd");
				comboBox_1.userAttr({"require": "Y"});
				comboBox_1.bind("fieldLabel").toExpression("#optLanDivRcd.value");
				comboBox_1.bind("value").toDataMap(app.lookup("dmReqCmd"), "strLanDivRcd");
				(function(comboBox_1){
					comboBox_1.addItem(new cpr.controls.Item("전체", ""));
					comboBox_1.setItemSet(app.lookup("dsListLanDivRcd"), {
						"label": "CD_NM",
						"value": "CD"
					});
				})(comboBox_1);
				container.addChild(comboBox_1, {
					"top": "5px",
					"left": "344px",
					"width": "140px",
					"height": "25px"
				});
			})(group_1);
			container.addChild(group_1, {
				"top": "35px",
				"left": "5px",
				"width": "640px",
				"height": "32px"
			});
			
			var group_2 = new cpr.controls.Container("grp_rptCmnNat");
			// Layout
			var xYLayout_3 = new cpr.controls.layouts.XYLayout();
			group_2.setLayout(xYLayout_3);
			(function(container){
				var userDefinedControl_2 = linker.userDefinedControl_2 = new udc.com.comTitle();
				userDefinedControl_2.bind("title").toLanguage("");
				container.addChild(userDefinedControl_2, {
					"top": "5px",
					"left": "5px",
					"width": "256px",
					"height": "25px"
				});
				var grid_1 = linker.grid_1 = new cpr.controls.Grid("grdCmnNat");
				grid_1.init({
					"dataSet": app.lookup("dsCmnNat"),
					"columns": [
						{"width": "40px"},
						{"width": "120px"},
						{"width": "452px"},
						{
							"width": "67px",
							"visible": false
						},
						{
							"width": "100px",
							"visible": false
						},
						{
							"width": "100px",
							"visible": false
						},
						{
							"width": "100px",
							"visible": false
						}
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
									cell.bind("text").toLanguage("UI-DB-NAT_RCD");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 2},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-SCR-CNTRYNM");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 3},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-SCR-DIVISION");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 4},
								"configurator": function(cell){
									cell.text = "CD_CLS";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 5},
								"configurator": function(cell){
									cell.text = "PRT_ORD";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 6},
								"configurator": function(cell){
									cell.text = "CD_PRP1";
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
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 3},
								"configurator": function(cell){
									cell.columnName = "LAN_DIV_RCD";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 4},
								"configurator": function(cell){
									cell.columnName = "CD_CLS";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 5},
								"configurator": function(cell){
									cell.columnName = "PRT_ORD";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 6},
								"configurator": function(cell){
									cell.columnName = "CD_PRP1";
								}
							}
						]
					}
				});
				if(typeof onGrdCmnNatRowDblclick == "function") {
					grid_1.addEventListener("row-dblclick", onGrdCmnNatRowDblclick);
				}
				container.addChild(grid_1, {
					"top": "30px",
					"left": "5px",
					"width": "630px",
					"height": "303px"
				});
			})(group_2);
			container.addChild(group_2, {
				"top": "72px",
				"left": "5px",
				"width": "640px",
				"height": "338px"
			});
			if(typeof onBodyLoad == "function"){
				app.addEventListener("load", onBodyLoad);
			}
			// Linking
			linker.userDefinedControl_2.ctrl = linker.grid_1;
		}
	});
	app.title = "국가검색화면(PopUp)";
	cpr.core.Platform.INSTANCE.register(app);
})();