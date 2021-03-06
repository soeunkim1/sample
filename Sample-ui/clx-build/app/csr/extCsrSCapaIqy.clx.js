/*
 * App URI: app/csr/extCsrSCapaIqy
 * Source Location: app/csr/extCsrSCapaIqy.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("app/csr/extCsrSCapaIqy", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			﻿//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
			///<xtmlink path="./extCsrSCapaIqy.xtm"/>
			
			var extCsrSCapaIqy = function() {
			
				var moPage = new Page();
				//임포트용 데이터 통신 오브젝트
				var moPObject = new PObject();
			
				/**
				 * @desc  Header Import onLoad
				 * @return void
				 * @author Choi In Seong 2016. 4. 22
			     */
				moPage.onLoadImportDone_ImpTitle = function() {
					doHeaderOnLoad();
				};
							
				/**
				 * @desc 여석조회 화면 온로드
				 * @param 
				 * @return void
				 * @author Choi In Seong 2016. 4. 22
				 */
				moPage.onModelConstructDone_extCsrSCapaIqy = function() {
					//리피트 초기 설정
			//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
			//		ExtRepeat.init(["rptEmpty"]);
					// 2. 검색조건 초기 설정
			//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
			//		ExtGroup.initSearchBox("grpSearch", ["grp_rptEmpty"]);
					
					//서브미션 실행 (실패시 cover page)
					//strCommand: onLoad 
					util.Submit.send(app, "subOnLoad", function(pbSuccess){
						if(pbSuccess){
							
							util.DataMap.setValue(app, "dmReqList", "strKeyDate", util.DataMap.getValue(app, "dmResOnLoad", "strKeyDate"));
							util.DataMap.setValue(app, "dmReqList", "strEndDt", util.DataMap.getValue(app, "dmResOnLoad", "strKeyDate"));
							util.Control.setValue(app, "rdbCapIoDivRcd", "%");
							util.Control.redraw(app, ["dipKeyDate", "dipEndDt", "rdbCapIoDivRcd"]);
						}
					});
				}
			
				/**
				 * @desc 여석조회
				 * @param 
				 * @return void
				 * @author Choi In Seong 2016. 4. 22
				 */
				function doList(poCallBackFunc) {
					//strCommand: list 
					util.Submit.send(app, "subList",  function(pbSuccess) {
						if(pbSuccess){
							//rebuild
							util.Control.redraw(app, ["rptEmpty"]);
						}
						if(util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
					});
				}
			
				/**
				 * @desc 여석조회 버튼 클릭
				 * @param 
				 * @return void
				 * @author Choi In Seong 2016. 4. 22
				 */
				moPage.onClick_BtnSearch = function() {
					// 조회조건 필수 체크
					if(!util.validate(app, ["dipKeyDate", "dipEndDt"])){
						return false;
					}
					
					doList(function(pbSuccess) {
						// 조회 : "조회되었습니다." header 메세지 표시
						if(pbSuccess) {
							util.Msg.notify(app, "NLS.INF.M024");
						}
					});
				};
				return moPage;
			};;
			// End - User Script
			
			// Header
			var dataSet_1 = new cpr.data.DataSet("dsCapIoDivRcdList");
			dataSet_1.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_1);
			
			var dataSet_2 = new cpr.data.DataSet("dsEmpty");
			dataSet_2.parseData({
				"info": "CSR_STATUS@STUD_ID,STAT_RCD,ST_DT,END_DT,ATV_STAT_RCD,PROC_DT",
				"columns": [
					{"name": "SA_CD"},
					{"name": "SP_CD"},
					{"name": "SA_SP_DAY_NM"},
					{"name": "PROC_RSLT"},
					{"name": "INVIT_NOP"},
					{"name": "CAP_IO_IN_CNT"},
					{"name": "CAP_IO_OUT_CNT"},
					{"name": "CHG_CNT"},
					{"name": "CHAN_EMPTY_CNT"},
					{"name": "REEN_EMPTY_CNT"},
					{"name": "EMPTY_CNT"}
				],
				"rows": []
			});
			app.register(dataSet_2);
			var dataMap_1 = new cpr.data.DataMap("dmResOnLoad");
			dataMap_1.parseData({
				"columns" : [{
					"name": "strKeyDate",
					"dataType": "string"
				}]
			});
			app.register(dataMap_1);
			
			var dataMap_2 = new cpr.data.DataMap("dmReqList");
			dataMap_2.parseData({
				"columns" : [
					{
						"name": "strKeyDate",
						"dataType": "string"
					},
					{
						"name": "strEndDt",
						"dataType": "string"
					},
					{
						"name": "strCapIoDivRcd",
						"dataType": "string"
					}
				]
			});
			app.register(dataMap_2);
			var submission_1 = new cpr.protocols.Submission("subOnLoad");
			submission_1.action = "/csr/ExtCsrCapaIqy/";
			submission_1.mediaType = "application/x-www-form-urlencoded";
			submission_1.addResponseData(dataSet_1, false);
			submission_1.addResponseData(dataMap_1, false);
			app.register(submission_1);
			
			var submission_2 = new cpr.protocols.Submission("subList");
			submission_2.action = "/csr/ExtCsrCapaIqy/";
			submission_2.mediaType = "application/x-www-form-urlencoded";
			submission_2.addRequestData(dataMap_2);
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
				var output_1 = new cpr.controls.Output("optKeyDate");
				output_1.value = "기준일";
				output_1.style.setClasses(["require"]);
				container.addChild(output_1, {
					"top": "5px",
					"left": "5px",
					"width": "80px",
					"height": "25px"
				});
				var dateInput_1 = new cpr.controls.DateInput("dipKeyDate");
				dateInput_1.userAttr({"require": "Y"});
				dateInput_1.style.css({
					"text-align" : "center"
				});
				dateInput_1.bind("fieldLabel").toExpression("#optKeyDate.value");
				dateInput_1.bind("value").toDataMap(app.lookup("dmReqList"), "strKeyDate");
				container.addChild(dateInput_1, {
					"top": "5px",
					"left": "90px",
					"width": "90px",
					"height": "25px"
				});
				var dateInput_2 = new cpr.controls.DateInput("dipEndDt");
				dateInput_2.style.css({
					"text-align" : "center"
				});
				dateInput_2.bind("fieldLabel").toExpression("#optKeyDate.value");
				dateInput_2.bind("value").toDataMap(app.lookup("dmReqList"), "strEndDt");
				container.addChild(dateInput_2, {
					"top": "5px",
					"left": "195px",
					"width": "90px",
					"height": "25px"
				});
				var output_2 = new cpr.controls.Output("optCapIoDivRcd");
				output_2.value = "정원내외";
				container.addChild(output_2, {
					"top": "5px",
					"left": "295px",
					"width": "80px",
					"height": "25px"
				});
				var output_3 = new cpr.controls.Output("label1");
				output_3.value = "~";
				container.addChild(output_3, {
					"top": "5px",
					"left": "180px",
					"width": "15px",
					"height": "25px"
				});
				var radioButton_1 = new cpr.controls.RadioButton("rdbCapIoDivRcd");
				radioButton_1.bind("fieldLabel").toExpression("#optCapIoDivRcd.value");
				radioButton_1.bind("value").toDataMap(app.lookup("dmReqList"), "strCapIoDivRcd");
				(function(radioButton_1){
					radioButton_1.setItemSet(app.lookup("dsCapIoDivRcdList"), {
						"label": "CD_NM",
						"value": "CD"
					})
				})(radioButton_1);
				container.addChild(radioButton_1, {
					"top": "5px",
					"left": "380px",
					"width": "285px",
					"height": "25px"
				});
			})(group_1);
			container.addChild(group_1, {
				"top": "35px",
				"left": "5px",
				"width": "1225px",
				"height": "32px"
			});
			
			var group_2 = new cpr.controls.Container("grp_rptEmpty");
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
				var grid_1 = linker.grid_1 = new cpr.controls.Grid("grdEmpty");
				grid_1.init({
					"dataSet": app.lookup("dsEmpty"),
					"columns": [
						{"width": "40px"},
						{"width": "323px"},
						{"width": "49px"},
						{"width": "84px"},
						{"width": "107px"},
						{"width": "111px"},
						{"width": "178px"},
						{"width": "111px"},
						{"width": "198px"}
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
									cell.text = "소속";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 2},
								"configurator": function(cell){
									cell.text = "학년";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 3},
								"configurator": function(cell){
									cell.text = "입학정원수";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 4},
								"configurator": function(cell){
									cell.text = "정원내제적생";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 5},
								"configurator": function(cell){
									cell.text = "정원외제적생";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 6},
								"configurator": function(cell){
									cell.text = "재입학 여석수\n(입학정원-학년재적수)";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 7},
								"configurator": function(cell){
									cell.text = "전과생수\n(1학기/2학기)";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 8},
								"configurator": function(cell){
									cell.text = "전과 여석수\n(제적수-재입학수-전과수)";
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
									cell.columnName = "SA_SP_DAY_NM";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 2},
								"configurator": function(cell){
									cell.columnName = "PROC_RSLT";
									cell.style.css({
										"text-align" : "center"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 3},
								"configurator": function(cell){
									cell.columnName = "INVIT_NOP";
									cell.style.css({
										"text-align" : "right"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 4},
								"configurator": function(cell){
									cell.columnName = "CAP_IO_IN_CNT";
									cell.style.css({
										"text-align" : "right"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 5},
								"configurator": function(cell){
									cell.columnName = "CAP_IO_OUT_CNT";
									cell.style.css({
										"text-align" : "right"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 6},
								"configurator": function(cell){
									cell.columnName = "REEN_EMPTY_CNT";
									cell.style.css({
										"text-align" : "right"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 7},
								"configurator": function(cell){
									cell.columnName = "CHG_CNT";
									cell.style.css({
										"text-align" : "right"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 8},
								"configurator": function(cell){
									cell.columnName = "CHAN_EMPTY_CNT";
									cell.style.css({
										"text-align" : "right"
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
	app.title = "extCsrSCapaIqy";
	cpr.core.Platform.INSTANCE.register(app);
})();
