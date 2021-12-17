/*
 * App URI: app/ccr/stdCcrCTlsnCancelStstatusBat
 * Source Location: app/ccr/stdCcrCTlsnCancelStstatusBat.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("app/ccr/stdCcrCTlsnCancelStstatusBat", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			﻿//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
			/// <xtmlink path="./stdCcrCTlsnCancelStstatusBat.xtm"/>
			
			/**
			 * 수강신청일괄취소
			 * @class stdCcrCTlsnCancelStstatusBat
			 * @author 박갑수 at 2016. 4. 20
			 */
			var stdCcrCTlsnCancelStstatusBat = function() {
				var moPage = new Page();
				
				// 학년도 학기를 원래데이터로 되돌리기위한 변수
				var msSchYearRcd = "";
				var msSmtRcd = "";
				
				/**
				 * @desc import 헤더 초기화
				 * @param 
				 * @return  void
				 * @author 박갑수 at 2016. 4. 20
				 */
				moPage.onLoadImportDone_ImpTitle = function() {
					// import 헤더 초기화
					doHeaderOnLoad();
				};
				
				/**
				 * @desc onLoad 실행
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 4. 20
				 */
				moPage.onModelConstructDone_StdCcrCTlsnCancelStstatusBat = function() {
					// 리피트 초기 설정
			//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
			//		ExtRepeat.init(["rptCcrTlsnReq"]);
						
					// 검색조건 초기 설정
			//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
			//		ExtGroup.initSearchBox("grpSearch", ["grpData"]);
					
					// 서브미션 호출
					//strCommand: onLoad 
					util.Submit.send(app, "subOnLoad", function(pbSuccess){
						if(pbSuccess){
							util.Control.redraw(app, ["cbbSchYearRcd", "cbbSmtRcd", "dipKeyDate"]);
						}
					}, true);
				};
				
				/**
				 * @desc [cbbSmtRcd]학기 onValueChanged 이벤트
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 4. 20
				 */
				moPage.onValueChanged_CbbSmtRcd = function() {
					// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
					doChangeYearSmt("smt");
				};
				
				 /**
				 * @desc [cbbSchYearRcd]학년도 onValueChanged 이벤트
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 4. 20
				 */
				moPage.onValueChanged_CbbSchYearRcd = function() {
					// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
					doChangeYearSmt("year");
				};
				
				/**
				 * @desc 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 4. 20
				 */
				function doChangeYearSmt(psDiv) {
					//strCommand: date 
					util.Submit.send(app, "subDate", function(pbSuccess){
						if(pbSuccess){				
							msSchYearRcd = util.DataMap.getValue(app, "dmKeyDateMap", "YEAR");
							msSmtRcd = util.DataMap.getValue(app, "dmKeyDateMap", "SMT");
							
						// Exception 발생시
						}else {
							if(psDiv == "year"){
								util.Control.setValue(app, "cbbSchYearRcd", msSchYearRcd);
							}else if(psDiv == "smt"){
								util.Control.setValue(app, "cbbSmtRcd", msSmtRcd);
							}
						}
					});
				};
				
				/**
				 * @desc [btnSearch]조회 onClick 이벤트
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 4. 20
				 */
				moPage.onClick_BtnSearch = function() {
					// 작업영역 리피트 변경 내역 체크
					if(util.Grid.isModified(app, "", "CRM")){
						return false;
					}
			
					// 조회조건 필수 체크
					if(!util.validate(app, ["cbbSchYearRcd", "cbbSmtRcd", "dipKeyDate"])){
						return false;
					}
			
					// 조회
					doList(function(pbSuccess) {
						if (pbSuccess){
							// 조회 : "조회되었습니다." header 메세지 표시
							util.Msg.notify(app, "NLS.INF.M024");
						}
					});
				};
				
				/**
				 * @desc 재학생 외 수강신청 된 자료 리스트 조회
				 * @param poCallBackFunc 콜백정의
				 * @return void
				 * @author 박갑수 at 2016. 4. 20
				 */
				function doList(poCallBackFunc) {
					
					//strCommand: list 
					util.Submit.send(app, "subList", function(pbSuccess){
						if(pbSuccess){
							util.Control.redraw(app, "grdCcrTlsnReq");
			
							// 조회 후 콜백함수 수행
							if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess); 
						}
					});
				};
				
				/**
				 * @desc [btnSave]작업저장 onClick 이벤트
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 4. 20
				 */
				moPage.onClick_BtnSave = function() {
					// 작업저장
					doSave();
				};
				
				/**
				 * @desc 점수환산관리목록 변경사항 저장
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 3. 16
				 */
				function doSave() {
					// 행갯수
					var vnRowCnt = util.Grid.getRowCount(app, "grdCcrTlsnReq");
					
					if(vnRowCnt == 0){
						// "수강신청을 취소할 내역이 존재하지 않습니다." 
						util.Msg.alert("NLS-CCR-M008");
						return ;
					}
					
					if(util.Msg.confirm("NLS-CRM-M020", [NLS.NSCR.REGCRSDATA, NLS.NSCR.CANCEL]) ){
						util.Grid.setRowStateAll(app, "grdCcrTlsnReq", cpr.data.tabledata.RowState.UPDATED);
						
						//strCommand: save 
						util.Submit.send(app, "subSave", function(pbSuccess){
							if(pbSuccess){
								// "처리되었습니다." 메시지
								util.Msg.alert("NLS-INF-M003");
								
								doList(function(pbListSuccess) {
									// 조회 : "갱신된 데이터가 조회되었습니다." header 메세지 표시
									if (pbListSuccess) util.Msg.notify(app, "NLS.INF.M025");
								});
							}
						});
					}
				};
				
				return moPage;
			};;
			// End - User Script
			
			// Header
			var dataSet_1 = new cpr.data.DataSet("dsSchYearRcdList");
			dataSet_1.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_1);
			
			var dataSet_2 = new cpr.data.DataSet("dsSmtRcdList");
			dataSet_2.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_2);
			
			var dataSet_3 = new cpr.data.DataSet("dsStatRcdList");
			dataSet_3.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_3);
			
			var dataSet_4 = new cpr.data.DataSet("dsCcrTlsnReq");
			dataSet_4.parseData({
				"columns": [
					{"name": "STUD_ID"},
					{"name": "STAT_RCD"},
					{"name": "STUD_NO"},
					{"name": "SP_NM"},
					{"name": "SA_NM"},
					{"name": "REP_NM"},
					{"name": "PROC_RSLT_YEAR"}
				],
				"rows": []
			});
			app.register(dataSet_4);
			var dataMap_1 = new cpr.data.DataMap("dmReqKey");
			dataMap_1.parseData({
				"columns" : [
					{
						"name": "strStudId",
						"dataType": "string"
					},
					{
						"name": "strStudNo",
						"dataType": "string"
					},
					{
						"name": "strTlsnCancel",
						"dataType": "string"
					},
					{
						"name": "strLvl",
						"dataType": "string"
					},
					{
						"name": "strSaObjDivRcd",
						"dataType": "string"
					},
					{
						"name": "strSaCd",
						"dataType": "string"
					},
					{
						"name": "strSaNm",
						"dataType": "string"
					}
				]
			});
			app.register(dataMap_1);
			
			var dataMap_2 = new cpr.data.DataMap("dmKeyDateMap");
			dataMap_2.parseData({
				"columns" : [
					{
						"name": "BEF_DT",
						"dataType": "string"
					},
					{
						"name": "YEAR",
						"dataType": "string"
					},
					{
						"name": "SMT",
						"dataType": "string"
					},
					{
						"name": "ST_DT",
						"dataType": "string"
					},
					{
						"name": "END_DT",
						"dataType": "string"
					}
				]
			});
			app.register(dataMap_2);
			var submission_1 = new cpr.protocols.Submission("subOnLoad");
			submission_1.action = "/ccr/StdCcrTlsnCancelStstatusBat/";
			submission_1.mediaType = "application/x-www-form-urlencoded";
			submission_1.addResponseData(dataSet_1, false);
			submission_1.addResponseData(dataSet_2, false);
			submission_1.addResponseData(dataMap_2, false);
			submission_1.addResponseData(dataSet_3, false);
			app.register(submission_1);
			
			var submission_2 = new cpr.protocols.Submission("subDate");
			submission_2.action = "/cmn/StdCmnDateTime/";
			submission_2.mediaType = "application/x-www-form-urlencoded";
			submission_2.addRequestData(dataMap_2);
			submission_2.addResponseData(dataMap_2, false);
			app.register(submission_2);
			
			var submission_3 = new cpr.protocols.Submission("subList");
			submission_3.action = "/ccr/StdCcrTlsnCancelStstatusBat/";
			submission_3.mediaType = "application/x-www-form-urlencoded";
			submission_3.addRequestData(dataMap_1);
			submission_3.addRequestData(dataMap_2);
			submission_3.addResponseData(dataSet_4, false);
			app.register(submission_3);
			
			var submission_4 = new cpr.protocols.Submission("subSave");
			submission_4.action = "/ccr/StdCcrTlsnCancelStstatusBat/";
			submission_4.mediaType = "application/x-www-form-urlencoded";
			submission_4.addRequestData(dataSet_4);
			submission_4.addRequestData(dataMap_2);
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
				var output_1 = new cpr.controls.Output("optSchYearRcd");
				output_1.value = "";
				output_1.style.setClasses(["require"]);
				output_1.bind("value").toLanguage("UI-GLS-TARGET_SCH_YEAR");
				container.addChild(output_1, {
					"top": "5px",
					"left": "5px",
					"width": "90px",
					"height": "25px"
				});
				var comboBox_1 = new cpr.controls.ComboBox("cbbSchYearRcd");
				comboBox_1.enabled = false;
				comboBox_1.userAttr({"require": "Y"});
				comboBox_1.bind("fieldLabel").toExpression("#optSchYearRcd.value");
				comboBox_1.bind("value").toDataMap(app.lookup("dmKeyDateMap"), "YEAR");
				(function(comboBox_1){
					comboBox_1.addItem(new cpr.controls.Item("선택", ""));
					comboBox_1.setItemSet(app.lookup("dsSchYearRcdList"), {
						"label": "CD_NM",
						"value": "CD"
					});
				})(comboBox_1);
				if(typeof onCbbSchYearRcdSelectionChange == "function") {
					comboBox_1.addEventListener("selection-change", onCbbSchYearRcdSelectionChange);
				}
				container.addChild(comboBox_1, {
					"top": "5px",
					"left": "100px",
					"width": "100px",
					"height": "25px"
				});
				var output_2 = new cpr.controls.Output("optSmtRcd");
				output_2.value = "";
				output_2.style.setClasses(["require"]);
				output_2.bind("value").toLanguage("UI-GLS-TARGET_SMT");
				container.addChild(output_2, {
					"top": "5px",
					"left": "210px",
					"width": "90px",
					"height": "25px"
				});
				var comboBox_2 = new cpr.controls.ComboBox("cbbSmtRcd");
				comboBox_2.enabled = false;
				comboBox_2.userAttr({"require": "Y"});
				comboBox_2.bind("fieldLabel").toExpression("#optSmtRcd.value");
				comboBox_2.bind("value").toDataMap(app.lookup("dmKeyDateMap"), "SMT");
				(function(comboBox_2){
					comboBox_2.addItem(new cpr.controls.Item("선택", ""));
					comboBox_2.setItemSet(app.lookup("dsSmtRcdList"), {
						"label": "CD_NM",
						"value": "CD"
					});
				})(comboBox_2);
				if(typeof onCbbSmtRcdSelectionChange == "function") {
					comboBox_2.addEventListener("selection-change", onCbbSmtRcdSelectionChange);
				}
				container.addChild(comboBox_2, {
					"top": "5px",
					"left": "305px",
					"width": "100px",
					"height": "25px"
				});
				var output_3 = new cpr.controls.Output("optKeyDate");
				output_3.value = "";
				output_3.style.setClasses(["require"]);
				output_3.bind("value").toLanguage("UI-SCR-STUDSTATSTDD");
				container.addChild(output_3, {
					"top": "5px",
					"left": "415px",
					"width": "120px",
					"height": "25px"
				});
				var dateInput_1 = new cpr.controls.DateInput("dipKeyDate");
				dateInput_1.visible = false;
				dateInput_1.userAttr({"require": "Y"});
				dateInput_1.style.css({
					"text-align" : "center"
				});
				dateInput_1.bind("fieldLabel").toExpression("#optKeyDate.value");
				dateInput_1.bind("value").toDataMap(app.lookup("dmKeyDateMap"), "END_DT");
				container.addChild(dateInput_1, {
					"top": "5px",
					"left": "540px",
					"width": "100px",
					"height": "25px"
				});
			})(group_1);
			container.addChild(group_1, {
				"top": "35px",
				"left": "5px",
				"width": "1225px",
				"height": "32px"
			});
			
			var userDefinedControl_1 = new udc.com.appHeader("appheader1");
			container.addChild(userDefinedControl_1, {
				"top": "5px",
				"right": "5px",
				"left": "5px",
				"height": "25px"
			});
			
			var group_2 = new cpr.controls.Container("grpData");
			// Layout
			var xYLayout_3 = new cpr.controls.layouts.XYLayout();
			group_2.setLayout(xYLayout_3);
			(function(container){
				var userDefinedControl_2 = linker.userDefinedControl_2 = new udc.com.comTitle();
				userDefinedControl_2.bind("title").toLanguage("UI-SCR-REQCRSDTAEXCESTUD");
				container.addChild(userDefinedControl_2, {
					"top": "5px",
					"left": "5px",
					"width": "360px",
					"height": "25px"
				});
				var grid_1 = linker.grid_1 = new cpr.controls.Grid("grdCcrTlsnReq");
				grid_1.init({
					"dataSet": app.lookup("dsCcrTlsnReq"),
					"columns": [
						{"width": "40px"},
						{"width": "300px"},
						{"width": "150px"},
						{"width": "180px"},
						{"width": "130px"},
						{"width": "130px"},
						{"width": "270px"},
						{
							"width": "110px",
							"visible": false
						}
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
									cell.bind("text").toLanguage("UI-SCR-STUDASGN");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 2},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-GLS-STUD_ID");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 3},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-SCR-STUDNM");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 4},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-SCR-SHYRSTEP");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 5},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-SCR-SCHREGST");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 6},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-DB-SP_NM");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 7},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-DB-OBJNO");
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
									cell.columnName = "SA_NM";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 2},
								"configurator": function(cell){
									cell.columnName = "STUD_NO";
									cell.style.css({
										"text-align" : "center"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 3},
								"configurator": function(cell){
									cell.columnName = "REP_NM";
									cell.style.css({
										"text-align" : "center"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 4},
								"configurator": function(cell){
									cell.columnName = "PROC_RSLT_YEAR";
									cell.style.css({
										"text-align" : "center"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 5},
								"configurator": function(cell){
									cell.columnName = "STAT_RCD";
									cell.control = (function(){
										var comboBox_3 = new cpr.controls.ComboBox("gdCbbStatRcd");
										comboBox_3.enabled = false;
										comboBox_3.hideButton = true;
										(function(comboBox_3){
											comboBox_3.setItemSet(app.lookup("dsStatRcdList"), {
												"label": "CD_NM",
												"value": "CD"
											});
										})(comboBox_3);
										comboBox_3.bind("value").toDataColumn("STAT_RCD");
										return comboBox_3;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 6},
								"configurator": function(cell){
									cell.columnName = "SP_NM";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 7},
								"configurator": function(cell){
									cell.columnName = "STUD_ID";
								}
							}
						]
					}
				});
				container.addChild(grid_1, {
					"top": "30px",
					"left": "5px",
					"width": "1213px",
					"height": "563px"
				});
				var button_2 = new cpr.controls.Button("btnSave");
				button_2.value = "";
				button_2.style.setClasses(["btn-save"]);
				button_2.bind("value").toLanguage("UI-SCR-WRKSAVE");
				if(typeof onBtnSaveClick == "function") {
					button_2.addEventListener("click", onBtnSaveClick);
				}
				container.addChild(button_2, {
					"top": "5px",
					"left": "1158px",
					"width": "60px",
					"height": "25px"
				});
			})(group_2);
			container.addChild(group_2, {
				"top": "72px",
				"left": "5px",
				"width": "1225px",
				"height": "598px"
			});
			if(typeof onBodyLoad == "function"){
				app.addEventListener("load", onBodyLoad);
			}
			// Linking
			linker.userDefinedControl_2.ctrl = linker.grid_1;
		}
	});
	app.title = "수강신청일괄취소";
	cpr.core.Platform.INSTANCE.register(app);
})();
