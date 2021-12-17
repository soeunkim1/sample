/*
 * App URI: app/csr/extCsrSGudStatList
 * Source Location: app/csr/extCsrSGudStatList.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("app/csr/extCsrSGudStatList", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			﻿//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
			///<xtmlink path="./extCsrSGudStatList.xtm"/>
			
			var extCsrSGudStatList = function() {
			
				var moPage = new Page();
				//임포트용 데이터 통신 오브젝트
				var moPObject = new PObject();
			
				/**
				 * @desc  Header Import onLoad
				 * @return void
			     * @author xxxx at 2016.10.10
			     */
				moPage.onLoadImportDone_ImpTitle = function() {
					doHeaderOnLoad();
				};
			
			
							
				/**
				 * @desc 
				 * @return 
				 * @author xxxx 2016.10.10
				 */
				moPage.onModelConstructDone_extCsrSGudStatList = function() {
			
					//리피트 초기 설정
			//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
			//		ExtRepeat.init("rptCsrGudProf");
					//검색조건 초기 설정
			//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
			//		ExtGroup.initSearchBox("grpSearch", "grpData");
					//서브미션 실행 (실패시 cover page)
					//strCommand: onLoad 
					util.Submit.send(app, "subOnLoad", function(pbSuccess){
						if(pbSuccess){
							
							util.DataMap.setValue(app, "dmReqList", "strSchYearRcd", util.DataMap.getValue(app, "dmResOnLoad", "strSchYearRcd"));
							util.DataMap.setValue(app, "dmReqList", "strSmtRcd", util.DataMap.getValue(app, "dmResOnLoad", "strSmtRcd"));
							util.DataMap.setValue(app, "dmReqList", "strKeyDt", util.DataMap.getValue(app, "dmResOnLoad", "strKeyDt"));
							util.Control.redraw(app, ["cbbSchYearRcd", "cbbSmtRcd"]);
							
						}
					});
				}
			
				
			
			
			   /**
				 * @desc
				 *
				 * @return void
				 * @author xxxx 2016.10.10
				 */
				moPage.onClick_BtnSearch = function() {
					 //작업영역 리피트 변경 내역 체크
					if(util.Grid.isModified(app, "", "CRM")){
						return false;
					}
					doList(function(pbSuccess) {
						// 조회 : "조회되었습니다." header 메세지 표시
						if (pbSuccess) util.Msg.notify(app, "NLS.INF.M024");
					});
				};
			
				/**
				 * @desc 
				 * @param 
				 * @return 
				 * @author xxxx 2016.10.10
				 */
				function doList(poCallBackFunc) {
			
					//strCommand: list 
					util.Submit.send(app, "subList", function(pbSuccess){
						if(pbSuccess){
							util.Control.redraw(app, "grdCsrGudProf");
							// 조회 후 콜백함수 수행
							if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
						}
					});
				}
			
				/**
				 * @desc 
				 * @param 
				 * @return 
				 * @author xxxx 2016.10.10
				 */
				function doSave() {
			
					// 리피터 변경사항 체크
					if(!util.Grid.isModified(app, "grdCsrGudProf", "MSG")){
						return false;
					}
					//리피트 validation check
					if(!util.validate(app, "grdCsrGudProf")) return false;
			
					//strCommand: save 
					util.Submit.send(app, "subSave", function(pbSuccess){
						if(pbSuccess){
							doList(function(pbListSuccess) {
								// 조회 : "갱신된 데이터가 조회되었습니다." header 메세지 표시
								if (pbListSuccess) util.Msg.notify(app, "NLS.INF.M025");
							});
						}
					});
				}
			
				/**
				 * @desc 리피트 panel click event
				 * @param
				 * @return void
				 * @author xxxx 2016.10.10
				 */
				moPage.onValueChanged_RhCkbSelect = function() {
			//TO-BE: <ExtRepeat.selectedAllPanel> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
			//		ExtRepeat.selectedAllPanel("rhCkbSelect");
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
			
			var dataSet_3 = new cpr.data.DataSet("dsCsrGudProf");
			dataSet_3.parseData({
				"columns": [
					{"name": "SCH_YEAR_NM"},
					{"name": "SMT_NM"},
					{"name": "GUD_PROF_NM"},
					{"name": "CLASS_NM"},
					{"name": "DAY_NIGHT_NM"},
					{"name": "CLASS_CNT"},
					{"name": "ATTE_CNT"}
				],
				"rows": []
			});
			app.register(dataSet_3);
			var dataMap_1 = new cpr.data.DataMap("dmResOnLoad");
			dataMap_1.parseData({
				"columns" : [
					{
						"name": "strSchYearRcd",
						"dataType": "string"
					},
					{
						"name": "strSmtRcd",
						"dataType": "string"
					},
					{
						"name": "strKeyDt",
						"dataType": "string"
					}
				]
			});
			app.register(dataMap_1);
			
			var dataMap_2 = new cpr.data.DataMap("dmReqList");
			dataMap_2.parseData({
				"columns" : [
					{
						"name": "strSchYearRcd",
						"dataType": "string"
					},
					{
						"name": "strSmtRcd",
						"dataType": "string"
					},
					{
						"name": "strKeyDt",
						"dataType": "string"
					}
				]
			});
			app.register(dataMap_2);
			var submission_1 = new cpr.protocols.Submission("subOnLoad");
			submission_1.action = "/csr/ExtCsrGudStatList/";
			submission_1.mediaType = "application/x-www-form-urlencoded";
			submission_1.addResponseData(dataSet_1, false);
			submission_1.addResponseData(dataSet_2, false);
			submission_1.addResponseData(dataMap_1, false);
			app.register(submission_1);
			
			var submission_2 = new cpr.protocols.Submission("subList");
			submission_2.action = "/csr/ExtCsrGudStatList/";
			submission_2.mediaType = "application/x-www-form-urlencoded";
			submission_2.addRequestData(dataMap_2);
			submission_2.addResponseData(dataSet_3, false);
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
			
			var group_1 = new cpr.controls.Container("grpSearch");
			group_1.style.setClasses(["search-box"]);
			// Layout
			var xYLayout_2 = new cpr.controls.layouts.XYLayout();
			group_1.setLayout(xYLayout_2);
			(function(container){
				var button_1 = new cpr.controls.Button("btnSearch");
				button_1.value = "조회";
				button_1.style.setClasses(["btn-search"]);
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
				output_1.value = "학년도";
				output_1.style.setClasses(["require"]);
				container.addChild(output_1, {
					"top": "5px",
					"left": "5px",
					"width": "100px",
					"height": "25px"
				});
				var comboBox_1 = new cpr.controls.ComboBox("cbbSchYearRcd");
				comboBox_1.userAttr({"require": "Y"});
				comboBox_1.bind("fieldLabel").toExpression("#optSchYearRcd.value");
				comboBox_1.bind("value").toDataMap(app.lookup("dmReqList"), "strSchYearRcd");
				(function(comboBox_1){
					comboBox_1.setItemSet(app.lookup("dsSchYearRcdList"), {
						"label": "CD_NM",
						"value": "CD"
					});
				})(comboBox_1);
				container.addChild(comboBox_1, {
					"top": "5px",
					"left": "110px",
					"width": "130px",
					"height": "25px"
				});
				var output_2 = new cpr.controls.Output("optSmtRcd");
				output_2.value = "학기";
				output_2.style.setClasses(["require"]);
				container.addChild(output_2, {
					"top": "5px",
					"left": "250px",
					"width": "100px",
					"height": "25px"
				});
				var comboBox_2 = new cpr.controls.ComboBox("cbbSmtRcd");
				comboBox_2.userAttr({"require": "Y"});
				comboBox_2.bind("fieldLabel").toExpression("#optSmtRcd.value");
				comboBox_2.bind("value").toDataMap(app.lookup("dmReqList"), "strSmtRcd");
				(function(comboBox_2){
					comboBox_2.setItemSet(app.lookup("dsSmtRcdList"), {
						"label": "CD_NM",
						"value": "CD"
					});
				})(comboBox_2);
				container.addChild(comboBox_2, {
					"top": "5px",
					"left": "355px",
					"width": "130px",
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
				userDefinedControl_2.bind("title").toLanguage("");
				container.addChild(userDefinedControl_2, {
					"top": "5px",
					"left": "5px",
					"width": "265px",
					"height": "25px"
				});
				var grid_1 = linker.grid_1 = new cpr.controls.Grid("grdCsrGudProf");
				grid_1.init({
					"dataSet": app.lookup("dsCsrGudProf"),
					"columns": [
						{"width": "40px"},
						{"width": "137px"},
						{"width": "132px"},
						{"width": "200px"},
						{"width": "106px"},
						{"width": "236px"},
						{
							"width": "105px",
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
									cell.text = "학년도명";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 2},
								"configurator": function(cell){
									cell.text = "학기명";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 3},
								"configurator": function(cell){
									cell.text = "지도교수명";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 4},
								"configurator": function(cell){
									cell.text = "주/야";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 5},
								"configurator": function(cell){
									cell.text = "담당반수";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 6},
								"configurator": function(cell){
									cell.text = "재학생수";
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
									cell.columnName = "SCH_YEAR_NM";
									cell.style.css({
										"text-align" : "center"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 2},
								"configurator": function(cell){
									cell.columnName = "SMT_NM";
									cell.style.css({
										"text-align" : "center"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 3},
								"configurator": function(cell){
									cell.columnName = "GUD_PROF_NM";
									cell.style.css({
										"text-align" : "center"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 4},
								"configurator": function(cell){
									cell.columnName = "DAY_NIGHT_NM";
									cell.style.css({
										"text-align" : "center"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 5},
								"configurator": function(cell){
									cell.columnName = "CLASS_CNT";
									cell.style.css({
										"text-align" : "right"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 6},
								"configurator": function(cell){
									cell.columnName = "ATTE_CNT";
									cell.style.css({
										"text-align" : "center"
									});
								}
							}
						]
					}
				});
				container.addChild(grid_1, {
					"top": "30px",
					"left": "5px",
					"width": "1215px",
					"height": "565px"
				});
			})(group_2);
			container.addChild(group_2, {
				"top": "72px",
				"left": "5px",
				"width": "1225px",
				"height": "600px"
			});
			if(typeof onBodyLoad == "function"){
				app.addEventListener("load", onBodyLoad);
			}
			// Linking
			linker.userDefinedControl_2.ctrl = linker.grid_1;
		}
	});
	app.title = "extCsrSGudStatList";
	cpr.core.Platform.INSTANCE.register(app);
})();