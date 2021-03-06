/*
 * App URI: app/cgt/extCgtCScrngCii
 * Source Location: app/cgt/extCgtCScrngCii.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("app/cgt/extCgtCScrngCii", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			﻿
			//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
			/// <xtmlink path="./extCgtCScrngCii.xtm"/>
			
			
			var extCgtCScrngCii = function() {
					
				var moPage = new Page();
				
				/**
				 * @desc  Header Import onLoad
				 * @return void
				 * @author Aeyoung Lee 2016-07-04
				 */
				moPage.onLoadImportDone_ImpTitle = function() {		
					doHeaderOnLoad();
				};
				
				/**
				 * @desc 온로드 실행
				 * @param 
				 * @return 
				 * @author Aeyoung Lee 2016-07-04
				 */
				moPage.onModelConstructDone_ExtCgtCScrngCii = function() {
					//리피트 초기 설정
			//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
			//		ExtRepeat.init("rptScrngCii");
					//검색조건 초기 설정
			//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
			//		ExtGroup.initSearchBox("grpSearch", ["grpData"]);
					
					doOnLoad();	
				};
			
				/**
				 * @desc 온로드 실행
				 * @param 
				 * @return void
				 * @author Aeyoung Lee 2016-07-04
				 */
				function doOnLoad(){
					
					// 서브미션 실행 (실패시 cover page)
					//strCommand: onLoad 
					util.Submit.send(app, "subOnLoad", function(pbSuccess){
						if(pbSuccess){
							// 학위구분, 학제구분, 입학학년도 콤보 리스트 구성
							util.Control.redraw(app, ["cbbDgrCrsDivRcd", "cbbAssDivRcd", "cbbEnterSchYearRcd"]);
							util.SelectCtl.selectItem(app, "cbbDgrCrsDivRcd", 0);
							util.SelectCtl.selectItem(app, "cbbAssDivRcd", 0);
							
							// 입학학년도에 졸업학년도 설정
							util.Control.setValue(app, "cbbEnterSchYearRcd", util.DataMap.getValue(app, "dmResOnLoad", "strCgtSchYearRcd"));
							
							util.Control.redraw(app, "grdScrngCii");
						}
					}, true);
				};
				
				/**
				 * @desc 조회 실행
				 * @param 
				 * @return 
				 * @author Aeyoung Lee 2016-07-04
				 */
				moPage.onClick_BtnSearch = function() {
					//작업영역 리피트 변경 내역 체크
					if(util.Grid.isModified(app, "", "CRM")){
						return false;
					}	
					
					if(!util.validate(app, ["grpSearch"])){
						return false;
					}
					
					doList(function(pbSuccess){
						if(pbSuccess) util.Msg.notify(app, "NLS.INF.M024");
					});	
				};
				
				/**
				 * @desc  졸업사정기준 목록을 조회한다.
				 * @param {Function} poCallBackFunc 콜백정의
				 * @return void
				 * @author Aeyoung Lee 2016-07-04
				 */
				function doList(poCallBackFunc) {
					
					//strCommand: list 
					util.Submit.send(app, "subList", function(pbSuccess){
						if(pbSuccess){
							util.Control.redraw(app, "grdScrngCii");	
							
							if(util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
						}
					}); 
				};
				
				/**
				 * @desc 신규 click event
				 * @return void
				 * @author Aeyoung Lee 2016-07-04
				 */		
				moPage.onClick_BtnNew = function() {
					//해당 리피트 insertRow 후 편집 시작할 컬럼 지정		
					var voNewRow = util.Grid.insertRow(app, "grdScrngCii", "rdCbbCiiDivRcd");	
					
					var vsDgrCrsDivRcd = util.DataMap.getValue(app, "dmReqKey", "strDgrCrsDivRcd");
					var vsAssDivRcd	   = util.DataMap.getValue(app, "dmReqKey", "strAssDivRcd");
					var vsKeyDt	       = util.DataMap.getValue(app, "dmResList", "strKeyDt").substring(0,8);
					
					util.Grid.setCellValue(app, "grdScrngCii", "DGR_CRS_DIV_RCD", vsDgrCrsDivRcd, voNewRow);
					util.Grid.setCellValue(app, "grdScrngCii", "ASS_DIV_RCD"    , vsAssDivRcd   , voNewRow);
					util.Grid.setCellValue(app, "grdScrngCii", "DGR_CRS_DIV_RCD_1", vsDgrCrsDivRcd, voNewRow);
					util.Grid.setCellValue(app, "grdScrngCii", "ASS_DIV_RCD_1"    , vsAssDivRcd   , voNewRow);
					util.Grid.setCellValue(app, "grdScrngCii", "ST_DT" 	       , vsKeyDt  	   , voNewRow);
					util.Grid.setCellValue(app, "grdScrngCii", "END_DT"  	   , "99991231"    , voNewRow);
				};
				
				/**
				 * @desc 삭제 click event
				 * @return void
				 * @author Aeyoung Lee 2016-07-04
				 */	
				moPage.onClick_BtnDel = function() {
					util.Grid.deleteRow(app, "grdScrngCii");
				};
				
				/**
				 * @desc 작업취소 click event
				 * @return void
				 * @author Aeyoung Lee 2016-07-04
				 */	
				moPage.onClick_BtnRestore = function() {
					util.Grid.restoreRow(app, "grdScrngCii");
				};
				
				/**
				 * @desc 작업저장 click event
				 * @return void
				 * @author Aeyoung Lee 2016-07-04
				 */	
				moPage.onClick_BtnSave = function() {
					// 리피터 변경사항 체크
					if(!util.Grid.isModified(app, ["grdScrngCii"], "MSG")){
						return false;
					}
					
					//리피트 validation check
					if(!util.validate(app, "grdScrngCii")) return false;
					
					//strCommand: save 
					util.Submit.send(app, "subSave", function(pbSuccess){
						if(pbSuccess){
							doList(function(pbListSuccess){
								if(pbListSuccess) util.Msg.notify(app, "NLS.INF.M025");
							});
						}
					});
					
				};
					
				/**
				 * @desc   리피트 패널 체크
				 * @return void
				 * @author Aeyoung Lee 2016-07-04
				 */	
				moPage.onValueChanged_RhCkbSelect = function() {
					// 리피트 패널 설정
			//TO-BE: <ExtRepeat.selectedAllPanel> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
			//		ExtRepeat.selectedAllPanel("rhCkbSelect");
				};
				
				return moPage;
			};;
			// End - User Script
			
			// Header
			var dataSet_1 = new cpr.data.DataSet("dsListDgrCrsDivRcd");
			dataSet_1.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_1);
			
			var dataSet_2 = new cpr.data.DataSet("dsListAssDivRcd");
			dataSet_2.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_2);
			
			var dataSet_3 = new cpr.data.DataSet("dsListCiiDivRcd");
			dataSet_3.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"},
					{"name": "CD_PRP1"},
					{"name": "CD_PRP2"}
				],
				"rows": []
			});
			app.register(dataSet_3);
			
			var dataSet_4 = new cpr.data.DataSet("dsListYear");
			dataSet_4.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_4);
			
			var dataSet_5 = new cpr.data.DataSet("dsScrngCii");
			dataSet_5.parseData({
				"info": "EXT_CGT_SCRNG_CII@DGR_CRS_DIV_RCD,ASS_DIV_RCD,CII_DIV_RCD,ST_DT",
				"columns": [
					{"name": "DGR_CRS_DIV_RCD_1"},
					{"name": "ASS_DIV_RCD_1"},
					{"name": "CII_DIV_RCD"},
					{"name": "ST_DT"},
					{"name": "END_DT"},
					{"name": "CII_VAL"},
					{"name": "REMARK"},
					{"name": "DGR_CRS_DIV_RCD"},
					{"name": "ASS_DIV_RCD"}
				],
				"rows": []
			});
			app.register(dataSet_5);
			var dataMap_1 = new cpr.data.DataMap("dmReqKey");
			dataMap_1.parseData({
				"columns" : [
					{
						"name": "strDgrCrsDivRcd",
						"dataType": "string"
					},
					{
						"name": "strAssDivRcd",
						"dataType": "string"
					},
					{
						"name": "strEnterSchYearRcd",
						"dataType": "string"
					}
				]
			});
			app.register(dataMap_1);
			
			var dataMap_2 = new cpr.data.DataMap("dmResOnLoad");
			dataMap_2.parseData({
				"columns" : [{
					"name": "strCgtSchYearRcd",
					"dataType": "string"
				}]
			});
			app.register(dataMap_2);
			
			var dataMap_3 = new cpr.data.DataMap("dmResList");
			dataMap_3.parseData({
				"columns" : [{
					"name": "strKeyDt",
					"dataType": "string"
				}]
			});
			app.register(dataMap_3);
			var submission_1 = new cpr.protocols.Submission("subOnLoad");
			submission_1.action = "/cgt/ExtCgtScrngCii/";
			submission_1.mediaType = "application/x-www-form-urlencoded";
			submission_1.addResponseData(dataSet_1, false);
			submission_1.addResponseData(dataSet_2, false);
			submission_1.addResponseData(dataSet_3, false);
			submission_1.addResponseData(dataSet_4, false);
			submission_1.addResponseData(dataMap_2, false);
			app.register(submission_1);
			
			var submission_2 = new cpr.protocols.Submission("subList");
			submission_2.action = "/cgt/ExtCgtScrngCii/";
			submission_2.mediaType = "application/x-www-form-urlencoded";
			submission_2.addRequestData(dataMap_1);
			submission_2.addResponseData(dataSet_5, false);
			submission_2.addResponseData(dataMap_3, false);
			app.register(submission_2);
			
			var submission_3 = new cpr.protocols.Submission("subSave");
			submission_3.action = "/cgt/ExtCgtScrngCii/";
			submission_3.mediaType = "application/x-www-form-urlencoded";
			submission_3.addRequestData(dataSet_5);
			submission_3.addRequestData(dataMap_1);
			submission_3.addRequestData(dataMap_3);
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
				var output_1 = new cpr.controls.Output("optDgrCrsDivRcd");
				output_1.value = "";
				output_1.style.setClasses(["require"]);
				output_1.bind("value").toLanguage("UI-SCR-DGRDIV");
				container.addChild(output_1, {
					"top": "5px",
					"left": "5px",
					"width": "100px",
					"height": "25px"
				});
				var comboBox_1 = new cpr.controls.ComboBox("cbbDgrCrsDivRcd");
				comboBox_1.userAttr({"require": "Y"});
				comboBox_1.bind("fieldLabel").toExpression("#optDgrCrsDivRcd.value");
				comboBox_1.bind("value").toDataMap(app.lookup("dmReqKey"), "strDgrCrsDivRcd");
				(function(comboBox_1){
					comboBox_1.setItemSet(app.lookup("dsListDgrCrsDivRcd"), {
						"label": "CD_NM",
						"value": "CD"
					});
				})(comboBox_1);
				container.addChild(comboBox_1, {
					"top": "5px",
					"left": "110px",
					"width": "145px",
					"height": "25px"
				});
				var comboBox_2 = new cpr.controls.ComboBox("cbbAssDivRcd");
				comboBox_2.userAttr({"require": "Y"});
				comboBox_2.bind("fieldLabel").toExpression("#optAssDivRcd.value");
				comboBox_2.bind("value").toDataMap(app.lookup("dmReqKey"), "strAssDivRcd");
				(function(comboBox_2){
					comboBox_2.setItemSet(app.lookup("dsListAssDivRcd"), {
						"label": "CD_NM",
						"value": "CD"
					});
				})(comboBox_2);
				container.addChild(comboBox_2, {
					"top": "5px",
					"left": "370px",
					"width": "145px",
					"height": "25px"
				});
				var output_2 = new cpr.controls.Output("optAssDivRcd");
				output_2.value = "";
				output_2.style.setClasses(["require"]);
				output_2.bind("value").toLanguage("UI-SCR-ASS_DIV");
				container.addChild(output_2, {
					"top": "5px",
					"left": "265px",
					"width": "100px",
					"height": "25px"
				});
				var output_3 = new cpr.controls.Output("optEnterSchYearRcd");
				output_3.value = "";
				output_3.style.setClasses(["require"]);
				output_3.bind("value").toLanguage("UI-SCR-ENTRSCHYEAR");
				container.addChild(output_3, {
					"top": "5px",
					"left": "525px",
					"width": "100px",
					"height": "25px"
				});
				var comboBox_3 = new cpr.controls.ComboBox("cbbEnterSchYearRcd");
				comboBox_3.userAttr({"require": "Y"});
				comboBox_3.bind("fieldLabel").toExpression("#optEnterSchYearRcd.value");
				comboBox_3.bind("value").toDataMap(app.lookup("dmReqKey"), "strEnterSchYearRcd");
				(function(comboBox_3){
					comboBox_3.setItemSet(app.lookup("dsListYear"), {
						"label": "CD_NM",
						"value": "CD"
					});
				})(comboBox_3);
				container.addChild(comboBox_3, {
					"top": "5px",
					"left": "630px",
					"width": "145px",
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
				var userDefinedControl_2 = linker.userDefinedControl_2 = new udc.com.comTitle();
				userDefinedControl_2.bind("title").toLanguage("UI-SCR-GRASRNCII");
				container.addChild(userDefinedControl_2, {
					"top": "5px",
					"left": "5px",
					"width": "315px",
					"height": "25px"
				});
				var button_2 = new cpr.controls.Button("btnNew");
				button_2.value = "";
				button_2.style.setClasses(["btn-new"]);
				button_2.bind("value").toLanguage("UI-SCR-NEW");
				if(typeof onBtnNewClick == "function") {
					button_2.addEventListener("click", onBtnNewClick);
				}
				container.addChild(button_2, {
					"top": "5px",
					"left": "965px",
					"width": "60px",
					"height": "25px"
				});
				var button_3 = new cpr.controls.Button("btnDel");
				button_3.value = "";
				button_3.style.setClasses(["btn-delete"]);
				button_3.bind("value").toLanguage("UI-SCR-DELETE");
				if(typeof onBtnDelClick == "function") {
					button_3.addEventListener("click", onBtnDelClick);
				}
				container.addChild(button_3, {
					"top": "5px",
					"left": "1030px",
					"width": "60px",
					"height": "25px"
				});
				var button_4 = new cpr.controls.Button("btnRestore");
				button_4.value = "";
				button_4.style.setClasses(["btn-restore"]);
				button_4.bind("value").toLanguage("UI-SCR-WRKCANCL");
				if(typeof onBtnRestoreClick == "function") {
					button_4.addEventListener("click", onBtnRestoreClick);
				}
				container.addChild(button_4, {
					"top": "5px",
					"left": "1095px",
					"width": "60px",
					"height": "25px"
				});
				var button_5 = new cpr.controls.Button("btnSave");
				button_5.value = "";
				button_5.style.setClasses(["btn-save"]);
				button_5.bind("value").toLanguage("UI-SCR-WRKSAVE");
				if(typeof onBtnSaveClick == "function") {
					button_5.addEventListener("click", onBtnSaveClick);
				}
				container.addChild(button_5, {
					"top": "5px",
					"left": "1160px",
					"width": "60px",
					"height": "25px"
				});
				var grid_1 = linker.grid_1 = new cpr.controls.Grid("grdScrngCii");
				grid_1.init({
					"dataSet": app.lookup("dsScrngCii"),
					"columns": [
						{"width": "25px"},
						{"width": "25px"},
						{"width": "40px"},
						{"width": "135px"},
						{"width": "135px"},
						{"width": "135px"},
						{"width": "80px"},
						{"width": "106px"},
						{"width": "107px"},
						{"width": "427px"},
						{
							"width": "80px",
							"visible": false
						},
						{
							"width": "80px",
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
									cell.text = "No";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 3},
								"configurator": function(cell){
									cell.style.setClasses(["require"]);
									cell.bind("text").toLanguage("UI-SCR-DGRDIV");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 4},
								"configurator": function(cell){
									cell.style.setClasses(["require"]);
									cell.bind("text").toLanguage("UI-SCR-ASS_DIV");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 5},
								"configurator": function(cell){
									cell.style.setClasses(["require"]);
									cell.bind("text").toLanguage("UI-SCR-CIIDIV");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 6},
								"configurator": function(cell){
									cell.style.setClasses(["require"]);
									cell.bind("text").toLanguage("UI-GLS-PNT");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 7},
								"configurator": function(cell){
									cell.style.setClasses(["require"]);
									cell.bind("text").toLanguage("UI-DB-ST_DT");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 8},
								"configurator": function(cell){
									cell.style.setClasses(["require"]);
									cell.bind("text").toLanguage("UI-DB-END_DT");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 9},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-SCR-REMARK");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 10},
								"configurator": function(cell){
									cell.style.setClasses(["require"]);
									cell.bind("text").toLanguage("UI-SCR-DGRDIV");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 11},
								"configurator": function(cell){
									cell.style.setClasses(["require"]);
									cell.bind("text").toLanguage("UI-SCR-DGRDIV");
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
										var output_4 = new cpr.controls.Output();
										output_4.style.css({
											"text-align" : "center"
										});
										return output_4;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 2},
								"configurator": function(cell){
									cell.columnType = "rowindex";
									cell.style.css({
										"text-align" : "center"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 3},
								"configurator": function(cell){
									cell.columnName = "DGR_CRS_DIV_RCD_1";
									cell.control = (function(){
										var comboBox_4 = new cpr.controls.ComboBox("gdCbbDgrCrsDivRcd1");
										comboBox_4.enabled = false;
										comboBox_4.hideButton = true;
										comboBox_4.userAttr({"require": "Y"});
										(function(comboBox_4){
											comboBox_4.addItem(new cpr.controls.Item("선택", ""));
											comboBox_4.setItemSet(app.lookup("dsListDgrCrsDivRcd"), {
												"label": "CD_NM",
												"value": "CD"
											});
										})(comboBox_4);
										comboBox_4.bind("value").toDataColumn("DGR_CRS_DIV_RCD_1");
										return comboBox_4;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 4},
								"configurator": function(cell){
									cell.columnName = "ASS_DIV_RCD_1";
									cell.control = (function(){
										var comboBox_5 = new cpr.controls.ComboBox("gdCbbAssDivRcd1");
										comboBox_5.enabled = false;
										comboBox_5.hideButton = true;
										comboBox_5.userAttr({"require": "Y"});
										(function(comboBox_5){
											comboBox_5.addItem(new cpr.controls.Item("선택", ""));
											comboBox_5.setItemSet(app.lookup("dsListAssDivRcd"), {
												"label": "CD_NM",
												"value": "CD"
											});
										})(comboBox_5);
										comboBox_5.bind("value").toDataColumn("ASS_DIV_RCD_1");
										return comboBox_5;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 5},
								"configurator": function(cell){
									cell.columnName = "CII_DIV_RCD";
									cell.control = (function(){
										var comboBox_6 = new cpr.controls.ComboBox("gdCbbCiiDivRcd");
										comboBox_6.userAttr({"require": "Y"});
										(function(comboBox_6){
											comboBox_6.addItem(new cpr.controls.Item("선택", ""));
											comboBox_6.setItemSet(app.lookup("dsListCiiDivRcd"), {
												"label": "CD_NM",
												"value": "CD"
											});
										})(comboBox_6);
										comboBox_6.bind("value").toDataColumn("CII_DIV_RCD");
										return comboBox_6;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 6},
								"configurator": function(cell){
									cell.columnName = "CII_VAL";
									cell.control = (function(){
										var numberEditor_1 = new cpr.controls.NumberEditor("gdIpbCiiVal");
										numberEditor_1.spinButton = false;
										numberEditor_1.format = "999,999,999,999,999";
										numberEditor_1.userAttr({"require": "Y"});
										numberEditor_1.bind("value").toDataColumn("CII_VAL");
										return numberEditor_1;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 7},
								"configurator": function(cell){
									cell.columnName = "ST_DT";
									cell.control = (function(){
										var dateInput_1 = new cpr.controls.DateInput("gdDipStDt");
										dateInput_1.userAttr({"require": "Y"});
										dateInput_1.style.css({
											"text-align" : "center"
										});
										dateInput_1.bind("value").toDataColumn("ST_DT");
										return dateInput_1;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 8},
								"configurator": function(cell){
									cell.columnName = "END_DT";
									cell.control = (function(){
										var dateInput_2 = new cpr.controls.DateInput("gdDipEndDt");
										dateInput_2.style.css({
											"text-align" : "center"
										});
										dateInput_2.bind("value").toDataColumn("END_DT");
										return dateInput_2;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 9},
								"configurator": function(cell){
									cell.columnName = "REMARK";
									cell.control = (function(){
										var inputBox_1 = new cpr.controls.InputBox("gdIpbRemark");
										inputBox_1.maxLength = 300;
										inputBox_1.bind("value").toDataColumn("REMARK");
										return inputBox_1;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 10},
								"configurator": function(cell){
									cell.columnName = "DGR_CRS_DIV_RCD";
									cell.control = (function(){
										var comboBox_7 = new cpr.controls.ComboBox("gdCbbDgrCrsDivRcd");
										comboBox_7.enabled = false;
										comboBox_7.hideButton = true;
										comboBox_7.userAttr({"require": "Y"});
										(function(comboBox_7){
											comboBox_7.addItem(new cpr.controls.Item("선택", ""));
											comboBox_7.setItemSet(app.lookup("dsListDgrCrsDivRcd"), {
												"label": "CD_NM",
												"value": "CD"
											});
										})(comboBox_7);
										comboBox_7.bind("value").toDataColumn("DGR_CRS_DIV_RCD");
										return comboBox_7;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 11},
								"configurator": function(cell){
									cell.columnName = "ASS_DIV_RCD";
									cell.control = (function(){
										var comboBox_8 = new cpr.controls.ComboBox("gdCbbAssDivRcd");
										comboBox_8.enabled = false;
										comboBox_8.hideButton = true;
										comboBox_8.userAttr({"require": "Y"});
										(function(comboBox_8){
											comboBox_8.addItem(new cpr.controls.Item("선택", ""));
											comboBox_8.setItemSet(app.lookup("dsListAssDivRcd"), {
												"label": "CD_NM",
												"value": "CD"
											});
										})(comboBox_8);
										comboBox_8.bind("value").toDataColumn("ASS_DIV_RCD");
										return comboBox_8;
									})();
								}
							}
						]
					}
				});
				container.addChild(grid_1, {
					"top": "30px",
					"left": "5px",
					"width": "1215px",
					"height": "563px"
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
	app.title = "졸업사정기준관리";
	cpr.core.Platform.INSTANCE.register(app);
})();
