/*
 * App URI: app/ccs/stdCcsCHoliday
 * Source Location: app/ccs/stdCcsCHoliday.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("app/ccs/stdCcsCHoliday", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			﻿//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
			/// <xtmlink path="./stdCcsCHoliday.xtm"/>
			
			/**
			 * 공휴일관리
			 * @class stdCcsCBuild
			 * @author 박갑수 at 2016. 2. 28
			 */
			var stdCcsCHoliday = function() {
				var moPage = new Page();
				
				// 학년도 학기를 원래데이터로 되돌리기위한 변수
				var msSchYearRcd = "";
				var msSmtRcd = "";
				
				/**
				 * @desc import 헤더 초기화
				 * @param 
				 * @return  void
				 * @author 박갑수 at 2016. 2. 28
				 */
				moPage.onLoadImportDone_ImpTitle = function() {
					// import 헤더 초기화
					doHeaderOnLoad();
				}
				
				/**
				 * @desc onLoad 실행
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 2. 28
				 */
				moPage.onModelConstructDone_StdCcsCHoliday = function() {
					// 리피트 초기 설정
			//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
			//		ExtRepeat.init(["rptCcsHoliday"]);
					// 검색조건 초기 설정
			//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
			//		ExtGroup.initSearchBox("grpSearch", ["grpData"]);
					
					// 서브미션 호출
					//strCommand: onLoad 
					util.Submit.send(app, "subOnLoad", function(pbSuccess){
						if(pbSuccess){
							util.Control.redraw(app, ["cbbSchYearRcd", "cbbSmtRcd"]);
						}
					}, true);
				};
				
				/**
				 * @desc [cbbSchYearRcd]학년도 onValueChanged 이벤트
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 2. 18
				 */
				moPage.onValueChanged_CbbSchYearRcd = function() {
					// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
					doChangeYearSmt("year");
				};
				
				/**
				 * @desc [cbbSmtRcd]학기 onValueChanged 이벤트
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 2. 28
				 */
				moPage.onValueChanged_CbbSmtRcd = function() {
					// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
					doChangeYearSmt("smt");
				};
				
				/**
				 * @desc 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 2. 28
				 */
				function doChangeYearSmt(psDiv) {
					//strCommand: date 
					util.Submit.send(app, "subDate", function(pbSuccess){
						if(pbSuccess){
							util.Control.redraw(app, ["dipKeyDate"]);
							
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
				msSmtRcd
				/**
				 * @desc [btnSearch]조회 onClick 이벤트
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 2. 28
				 */
				moPage.onClick_BtnSearch = function() {
					 // 작업영역 리피트 변경 내역 체크
					if(util.Grid.isModified(app, "", "CRM")){
						return false;
					}
					
					// 조회조건 필수 체크
					if(!util.validate(app, ["cbbSchYearRcd", "cbbSmtRcd"])){
						return false;
					}
			
					// 조회
					doList(function(pbSuccess) {
						// 조회 : "조회되었습니다." header 메세지 표시
						if (pbSuccess) util.Msg.notify(app, "NLS.INF.M024");
					});
				}
				
				/**
				 * @desc 공휴일 목록 조회
				 * @param poCallBackFunc 콜백정의
				 * @return void
				 * @author 박갑수 at 2016. 2. 28
				 */
				function doList(poCallBackFunc) {
					//strCommand: list 
					util.Submit.send(app, "subList", function(pbSuccess){
						if(pbSuccess){
							util.Control.redraw(app, "grdCcsHoliday");
						}
						
						// 조회 후 콜백함수 수행
						if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
					});
				};
				
				/**
				 * @desc [btnNew]신규 onClick 이벤트
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 2. 28
				 */
				moPage.onClick_BtnNew = function() {
					// 신규로우 추가
					var vnIdx = util.Grid.insertRow(app, "grdCcsHoliday");
					
					// 학년도 - 조회조건
					var vsSchYearRcd = util.Control.getValue(app, "cbbSchYearRcd");
					util.Grid.setCellValue(app, "grdCcsHoliday", "SCH_YEAR_RCD", vsSchYearRcd);
					
					// 학기 - 조회조건
					var vsSmtRcd = util.Control.getValue(app, "cbbSmtRcd");
					util.Grid.setCellValue(app, "grdCcsHoliday", "SMT_RCD", vsSmtRcd);
					util.Grid.setCellValue(app, "grdCcsHoliday", "SKPLC_DIV_RCD", "CL10503");
					
					
				};
				
				/**
				 * @desc [btnDel]삭제 onClick 이벤트
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 2. 28
				 */
				moPage.onClick_BtnDel = function() {
					// 해당 리피트 delete
					util.Grid.deleteRow(app, "grdCcsHoliday");
				};
				
				/**
				 * @desc [btnRestore]작업취소 onClick 이벤트
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 2. 28
				 */
				moPage.onClick_BtnRestore = function() {
					// 해당 리피트 상태 초기화
					util.Grid.restoreRow(app, "grdCcsHoliday");
				};
				
				/**
				 * @desc [btnSave]작업저장 onClick 이벤트
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 2. 28
				 */
				moPage.onClick_BtnSave = function() {
					// 작업저장
					doSave();
				};
				
				/**
				 * @desc 공휴일목록 변경사항 저장
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 2. 28
				 */
				function doSave() {
					
					// 리피트 변경사항 체크
					if(!util.Grid.isModified(app, ["grdCcsHoliday"], "MSG")){
						return false;
					}
			
					// 리피트 Validation Check
					if(!util.validate(app, "grdCcsHoliday")) return false;
			
					//strCommand: save 
					util.Submit.send(app, "subSave", function(pbSuccess){
						if(pbSuccess){
							doList(function(pbListSuccess) {
								// 조회 : "갱신된 데이터가 조회되었습니다." header 메세지 표시
								if (pbListSuccess) util.Msg.notify(app, "NLS.INF.M025");
							});
						}
					});
				};
				
				/**
				 * @desc [rhCkbSelect]패널 onValueChanged 이벤트
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 2. 28
				 */
				moPage.onValueChanged_RhCkbSelect = function() {
					// 리피트 패널 설정
			//TO-BE: <ExtRepeat.selectedAllPanel> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
			//		ExtRepeat.selectedAllPanel("rhCkbSelect");
				};
			
				/**
				 * @desc [rdIpbHlyDt]일자 onValueChanged 이벤트
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 2. 28
				 */
				moPage.onValueChanged_RdIpbHlyDt = function() {
			
					
					var vsHlyDt = util.Grid.getCellValue(app, "grdCcsHoliday", "HLY_DT");
					
					// 요일 찾기
					if (ValueUtil.isNull(vsHlyDt)) {
						util.Grid.setCellValue(app, "grdCcsHoliday", "DAY", "");
						return ;
					}
					
					var vsRptIndex = util.Grid.getIndex(app, "grdCcsHoliday");
					
					if(vsHlyDt.length == 8){
						util.Grid.setCellValue(app, "grdCcsHoliday", "HLY_DT", vsHlyDt + "000000", vsRptIndex);
					}
					
					/*
						일자 유효성 체크(학년도학기의 표준학기 시작일자 종료일자 사이의 일자인지 비교)
						하지만  3/2일 수요일 이지만 2/29일 시작일자로 할수 있다. 
						주석처리한다.
						2/29일 월요일, 3/1일(화)는 공휴일로 처리하여 보강하도록 한다.(특성 업무)
					*/
					/*
					if(!doCompareDate(vsHlyDt)) {
						util.Grid.setCellValue(app, "grdCcsHoliday", "DAY", "");
						util.Grid.setCellValue(app, "grdCcsHoliday", "HLY_DT", "");
						return ;
					}
					*/
					
					util.DataMap.setValue(app, "dmReqKey", "strDate", vsHlyDt);
					//strCommand: getWeekDay 
					util.Submit.send(app, "subWeekDay", function(pbSuccess){
						if(pbSuccess){
							var vsDay = util.DataMap.getValue(app, "dmResList", "strWeekName");
							if(!ValueUtil.isNull(vsDay)){
								util.Grid.setCellValue(app, "grdCcsHoliday", "DAY", vsDay, vsRptIndex);
							}else {
								util.Grid.setCellValue(app, "grdCcsHoliday", "DAY", "", vsRptIndex);
								util.Grid.setCellValue(app, "grdCcsHoliday", "HLY_DT", "", vsRptIndex);
							}
						}else {
							util.Grid.setCellValue(app, "grdCcsHoliday", "DAY", "", vsRptIndex);
							util.Grid.setCellValue(app, "grdCcsHoliday", "HLY_DT", "", vsRptIndex);
						}
					});
				};
				
				/**
				 * @desc [rdIpbSplcDt]보강일자 onValueChanged 이벤트
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 7. 15
				 */
				moPage.onValueChanged_RdIpbSplcDt = function() {
					var vsSplcDt = util.Grid.getCellValue(app, "grdCcsHoliday", "SPLC_DT");
					
					if(!ValueUtil.isNull(vsSplcDt)){
						var vsRptIndex = util.Grid.getIndex(app, "grdCcsHoliday");
					
						if(vsSplcDt.length == 8){
							util.Grid.setCellValue(app, "grdCcsHoliday", "SPLC_DT", vsSplcDt + "000000", vsRptIndex);
						}
					}
					
					//--보강일자 및 수업생성여부 둘장 하나만 입력되어야 한다.
					//page.onSplcDt_CrtYnCheck("DT");
				};
				
				/**
				 * @desc 일자 유효성 체크(학년도학기의 시작일자 종료일자 사이의 일자인지 비교)
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 2. 28
				 */
				function doCompareDate(psDate) {
					var vbValid = true;
					
					var vsHlyDt = Number(psDate.substring(0,8));
					var vsStart = Number(util.DataMap.getValue(app, "dmKeyDateMap", "ST_DT").substring(0,8));
					var vsEnd   = Number(util.DataMap.getValue(app, "dmKeyDateMap", "END_DT").substring(0,8));
					
					if(vsEnd < vsHlyDt || vsHlyDt < vsStart) {
						
						util.Msg.alert("NLS-WRN-M142", [vsStart, vsEnd]);
						vbValid = false;
						return vbValid;
					}
					
					return vbValid;
				};
				
				/**
				 * @desc [rptCcsHoliday]공휴일목록 onRowSelect 이벤트
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 3. 2
				 */
				moPage.onRowSelect_RptCcsHoliday = function() {
					model.refreshBind("bindRptCcsHolidayUpd");
					model.refreshBind(null, "bindRptCcsHoliday");
					
				};
				
				
				
				/*
					종료일자가 있을 경우
					생성여부를 체크 할 수 없고,
					생성여부가 체크 되어 있을 경우, 종료일자를 넣을수 없다.
				*/
				moPage.onSplcDt_CrtYnCheck = function(vpCtlId) {
					
					var vnRptIndex = util.Grid.getIndex(app, "grdCcsHoliday");
					
					var vsSplcDt 	= util.Grid.getCellValue(app, "grdCcsHoliday", "SPLC_DT", vnRptIndex);
					var vsCrtYn 	= util.Grid.getCellValue(app, "grdCcsHoliday", "CRT_YN", vnRptIndex);
					
					if( "DT" == vpCtlId){
						if(!ValueUtil.isNull(vsSplcDt) && !ValueUtil.isNull(vsCrtYn)){				
							alert("보강일자와 수업생성여부 둘 중 하나만 입력되어야 합니다.");
							util.Grid.setCellValue(app, "grdCcsHoliday", "SPLC_DT", "", vnRptIndex, false, false);
						}
					}else{
						if(!ValueUtil.isNull(vsSplcDt) && !ValueUtil.isNull(vsCrtYn)){				
							alert("보강일자와 수업생성여부 둘 중 하나만 입력되어야 합니다.");
							util.Grid.setCellValue(app, "grdCcsHoliday", "CRT_YN", "", vnRptIndex, false, false);
						}
					}
					
					
					
				}
				
				
				
				
				
				
				
				moPage.onValueChanged_Checkbox1 = function() {
					//--보강일자 및 수업생성여부 둘장 하나만 입력되어야 한다.
					//page.onSplcDt_CrtYnCheck("YN");
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
			
			var dataSet_3 = new cpr.data.DataSet("dsSkplcDivRcdList");
			dataSet_3.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_3);
			
			var dataSet_4 = new cpr.data.DataSet("dsCcsHoliday");
			dataSet_4.parseData({
				"info": "CCS_HOLIDAY@SCH_YEAR_RCD,SMT_RCD,HLY_DT",
				"columns": [
					{"name": "SCH_YEAR_RCD"},
					{"name": "SMT_RCD"},
					{"name": "HLY_DT"},
					{"name": "HLY_NM"},
					{"name": "SKPLC_DIV_RCD"},
					{"name": "DAY"},
					{"name": "SPLC_DT"},
					{"name": "SPLC_DT_ORG"},
					{"name": "CRT_YN"}
				],
				"rows": []
			});
			app.register(dataSet_4);
			var dataMap_1 = new cpr.data.DataMap("dmResList");
			dataMap_1.parseData({
				"columns" : [{
					"name": "strWeekName",
					"dataType": "string"
				}]
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
			
			var dataMap_3 = new cpr.data.DataMap("dmReqKey");
			dataMap_3.parseData({
				"columns" : [{
					"name": "strDate",
					"dataType": "string"
				}]
			});
			app.register(dataMap_3);
			var submission_1 = new cpr.protocols.Submission("subOnLoad");
			submission_1.action = "/ccs/StdCcsHoliday/";
			submission_1.mediaType = "application/x-www-form-urlencoded";
			submission_1.addResponseData(dataSet_1, false);
			submission_1.addResponseData(dataSet_2, false);
			submission_1.addResponseData(dataSet_3, false);
			submission_1.addResponseData(dataMap_2, false);
			app.register(submission_1);
			
			var submission_2 = new cpr.protocols.Submission("subDate");
			submission_2.action = "/cmn/StdCmnDateTime/";
			submission_2.mediaType = "application/x-www-form-urlencoded";
			submission_2.addRequestData(dataMap_2);
			submission_2.addResponseData(dataMap_2, false);
			app.register(submission_2);
			
			var submission_3 = new cpr.protocols.Submission("subList");
			submission_3.action = "/ccs/StdCcsHoliday/";
			submission_3.mediaType = "application/x-www-form-urlencoded";
			submission_3.addRequestData(dataMap_2);
			submission_3.addResponseData(dataSet_4, false);
			app.register(submission_3);
			
			var submission_4 = new cpr.protocols.Submission("subSave");
			submission_4.action = "/ccs/StdCcsHoliday/";
			submission_4.mediaType = "application/x-www-form-urlencoded";
			submission_4.addRequestData(dataSet_4);
			app.register(submission_4);
			
			var submission_5 = new cpr.protocols.Submission("subWeekDay");
			submission_5.action = "/ccs/StdCcsHoliday/";
			submission_5.mediaType = "application/x-www-form-urlencoded";
			submission_5.addRequestData(dataMap_3);
			submission_5.addResponseData(dataMap_1, false);
			app.register(submission_5);
			
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
			var group_1 = new cpr.controls.Container("grpData");
			// Layout
			var xYLayout_2 = new cpr.controls.layouts.XYLayout();
			group_1.setLayout(xYLayout_2);
			(function(container){
				var userDefinedControl_1 = linker.userDefinedControl_1 = new udc.com.comTitle();
				userDefinedControl_1.bind("title").toLanguage("UI-SCR-HLYLIST");
				container.addChild(userDefinedControl_1, {
					"top": "5px",
					"left": "5px",
					"width": "215px",
					"height": "25px"
				});
				var button_1 = new cpr.controls.Button("btnNew");
				button_1.value = "";
				button_1.style.setClasses(["btn-new"]);
				button_1.bind("value").toLanguage("UI-SCR-NEW");
				if(typeof onBtnNewClick == "function") {
					button_1.addEventListener("click", onBtnNewClick);
				}
				container.addChild(button_1, {
					"top": "5px",
					"left": "963px",
					"width": "60px",
					"height": "25px"
				});
				var button_2 = new cpr.controls.Button("btnDel");
				button_2.value = "";
				button_2.style.setClasses(["btn-delete"]);
				button_2.bind("value").toLanguage("UI-SCR-DELETE");
				if(typeof onBtnDelClick == "function") {
					button_2.addEventListener("click", onBtnDelClick);
				}
				container.addChild(button_2, {
					"top": "5px",
					"left": "1028px",
					"width": "60px",
					"height": "25px"
				});
				var button_3 = new cpr.controls.Button("btnRestore");
				button_3.value = "";
				button_3.style.setClasses(["btn-restore"]);
				button_3.bind("value").toLanguage("UI-SCR-WRKCANCL");
				if(typeof onBtnRestoreClick == "function") {
					button_3.addEventListener("click", onBtnRestoreClick);
				}
				container.addChild(button_3, {
					"top": "5px",
					"left": "1093px",
					"width": "60px",
					"height": "25px"
				});
				var button_4 = new cpr.controls.Button("btnSave");
				button_4.value = "";
				button_4.style.setClasses(["btn-save"]);
				button_4.bind("value").toLanguage("UI-SCR-WRKSAVE");
				if(typeof onBtnSaveClick == "function") {
					button_4.addEventListener("click", onBtnSaveClick);
				}
				container.addChild(button_4, {
					"top": "5px",
					"left": "1158px",
					"width": "60px",
					"height": "25px"
				});
				var grid_1 = linker.grid_1 = new cpr.controls.Grid("grdCcsHoliday");
				grid_1.init({
					"dataSet": app.lookup("dsCcsHoliday"),
					"columns": [
						{"width": "25px"},
						{"width": "25px"},
						{"width": "40px"},
						{"width": "110px"},
						{"width": "60px"},
						{"width": "123px"},
						{"width": "123px"},
						{"width": "704px"},
						{
							"width": "80px",
							"visible": false
						},
						{
							"width": "80px",
							"visible": false
						},
						{
							"width": "130px",
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
									cell.bind("text").toLanguage("UI-GLS-DT");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 4},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-GLS-WDAY");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 5},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-GLS-DT");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 6},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-GLS-DT");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 7},
								"configurator": function(cell){
									cell.style.setClasses(["require"]);
									cell.bind("text").toLanguage("UI-DB-CONTENT");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 8},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-SCR-SKPLCDIVR");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 9},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-SCR-SKPLCDIVR");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 10},
								"configurator": function(cell){
									cell.style.setClasses(["require"]);
									cell.bind("text").toLanguage("UI-SCR-SKPLCDIVR");
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
										var output_1 = new cpr.controls.Output();
										output_1.style.css({
											"text-align" : "center"
										});
										return output_1;
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
									cell.columnName = "HLY_DT";
									cell.control = (function(){
										var dateInput_1 = new cpr.controls.DateInput("gdIpbHlyDt");
										dateInput_1.userAttr({"require": "Y"});
										dateInput_1.style.css({
											"text-align" : "center"
										});
										dateInput_1.bind("value").toDataColumn("HLY_DT");
										return dateInput_1;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 4},
								"configurator": function(cell){
									cell.columnName = "DAY";
									cell.style.css({
										"text-align" : "center"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 5},
								"configurator": function(cell){
									cell.columnName = "SPLC_DT";
									cell.control = (function(){
										var dateInput_2 = new cpr.controls.DateInput("gdIpbSplcDt");
										dateInput_2.style.css({
											"text-align" : "center"
										});
										dateInput_2.bind("value").toDataColumn("SPLC_DT");
										return dateInput_2;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 6},
								"configurator": function(cell){
									cell.columnName = "CRT_YN";
									cell.control = (function(){
										var checkBox_1 = new cpr.controls.CheckBox("checkbox1");
										checkBox_1.value = "";
										checkBox_1.trueValue = "Y";
										checkBox_1.falseValue = "";
										checkBox_1.text = "";
										checkBox_1.style.css({
											"text-align" : "center"
										});
										checkBox_1.bind("value").toDataColumn("CRT_YN");
										return checkBox_1;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 7},
								"configurator": function(cell){
									cell.columnName = "HLY_NM";
									cell.control = (function(){
										var inputBox_1 = new cpr.controls.InputBox("gdIpbHlyNm");
										inputBox_1.maxLength = 1000;
										inputBox_1.userAttr({"require": "Y"});
										inputBox_1.bind("value").toDataColumn("HLY_NM");
										return inputBox_1;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 8},
								"configurator": function(cell){
									cell.columnName = "SCH_YEAR_RCD";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 9},
								"configurator": function(cell){
									cell.columnName = "SMT_RCD";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 10},
								"configurator": function(cell){
									cell.columnName = "SKPLC_DIV_RCD";
									cell.control = (function(){
										var comboBox_1 = new cpr.controls.ComboBox("gdCbbSkplcDivRcd");
										comboBox_1.userAttr({"require": "Y"});
										(function(comboBox_1){
											comboBox_1.addItem(new cpr.controls.Item("선택", ""));
											comboBox_1.setItemSet(app.lookup("dsSkplcDivRcdList"), {
												"label": "CD_NM",
												"value": "CD"
											});
										})(comboBox_1);
										comboBox_1.bind("value").toDataColumn("SKPLC_DIV_RCD");
										return comboBox_1;
									})();
								}
							}
						]
					}
				});
				if(typeof onGrdCcsHolidaySelectionChange == "function") {
					grid_1.addEventListener("selection-change", onGrdCcsHolidaySelectionChange);
				}
				container.addChild(grid_1, {
					"top": "30px",
					"left": "5px",
					"width": "1213px",
					"height": "563px"
				});
			})(group_1);
			container.addChild(group_1, {
				"top": "72px",
				"left": "5px",
				"width": "1225px",
				"height": "598px"
			});
			
			var group_2 = new cpr.controls.Container("grpSearch");
			group_2.style.setClasses(["search-box"]);
			// Layout
			var xYLayout_3 = new cpr.controls.layouts.XYLayout();
			group_2.setLayout(xYLayout_3);
			(function(container){
				var button_5 = new cpr.controls.Button("btnSearch");
				button_5.value = "";
				button_5.style.setClasses(["btn-search"]);
				button_5.bind("value").toLanguage("UI-SCR-SCH");
				if(typeof onBtnSearchClick == "function") {
					button_5.addEventListener("click", onBtnSearchClick);
				}
				container.addChild(button_5, {
					"top": "5px",
					"left": "1158px",
					"width": "60px",
					"height": "25px"
				});
				var output_2 = new cpr.controls.Output("optSchYearRcd");
				output_2.value = "";
				output_2.style.setClasses(["require"]);
				output_2.bind("value").toLanguage("UI-GLS-SCH_YEAR");
				container.addChild(output_2, {
					"top": "5px",
					"left": "5px",
					"width": "80px",
					"height": "25px"
				});
				var comboBox_2 = new cpr.controls.ComboBox("cbbSchYearRcd");
				comboBox_2.userAttr({"require": "Y"});
				comboBox_2.bind("fieldLabel").toExpression("#optSchYearRcd.value");
				comboBox_2.bind("value").toDataMap(app.lookup("dmKeyDateMap"), "YEAR");
				(function(comboBox_2){
					comboBox_2.addItem(new cpr.controls.Item("선택", ""));
					comboBox_2.setItemSet(app.lookup("dsSchYearRcdList"), {
						"label": "CD_NM",
						"value": "CD"
					});
				})(comboBox_2);
				if(typeof onCbbSchYearRcdSelectionChange == "function") {
					comboBox_2.addEventListener("selection-change", onCbbSchYearRcdSelectionChange);
				}
				container.addChild(comboBox_2, {
					"top": "5px",
					"left": "90px",
					"width": "100px",
					"height": "25px"
				});
				var output_3 = new cpr.controls.Output("optSmtRcd");
				output_3.value = "";
				output_3.style.setClasses(["require"]);
				output_3.bind("value").toLanguage("UI-GLS-SMT");
				container.addChild(output_3, {
					"top": "5px",
					"left": "200px",
					"width": "80px",
					"height": "25px"
				});
				var comboBox_3 = new cpr.controls.ComboBox("cbbSmtRcd");
				comboBox_3.userAttr({"require": "Y"});
				comboBox_3.bind("fieldLabel").toExpression("#optSmtRcd.value");
				comboBox_3.bind("value").toDataMap(app.lookup("dmKeyDateMap"), "SMT");
				(function(comboBox_3){
					comboBox_3.addItem(new cpr.controls.Item("선택", ""));
					comboBox_3.setItemSet(app.lookup("dsSmtRcdList"), {
						"label": "CD_NM",
						"value": "CD"
					});
				})(comboBox_3);
				if(typeof onCbbSmtRcdSelectionChange == "function") {
					comboBox_3.addEventListener("selection-change", onCbbSmtRcdSelectionChange);
				}
				container.addChild(comboBox_3, {
					"top": "5px",
					"left": "285px",
					"width": "100px",
					"height": "25px"
				});
			})(group_2);
			container.addChild(group_2, {
				"top": "35px",
				"left": "5px",
				"width": "1225px",
				"height": "32px"
			});
			
			var userDefinedControl_2 = new udc.com.appHeader("appheader1");
			container.addChild(userDefinedControl_2, {
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
		}
	});
	app.title = "공휴일관리";
	cpr.core.Platform.INSTANCE.register(app);
})();
