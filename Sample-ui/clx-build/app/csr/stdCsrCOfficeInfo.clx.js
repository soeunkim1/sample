/*
 * App URI: app/csr/stdCsrCOfficeInfo
 * Source Location: app/csr/stdCsrCOfficeInfo.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("app/csr/stdCsrCOfficeInfo", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			﻿//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
			///<xtmlink path="./stdCsrCOfficeInfo.xtm"/>
			
			var stdCsrCOfficeInfo = function() {
			
				var moPage = new Page();
				//임포트용 데이터 통신 오브젝트
				var moPObject = new PObject();
				
				var msStudId = "";
				
				/**
				 * @desc 서브페이지 임포트 온로드
				 * @return 
				 * @author Choi In Seong. 2016.03.03
				 */
				moPage.onLoadImportDone_ImpSbpHeader = function() {
					doSbpHeaderOnLoad();
				}
			
				/**
				 * @desc 화면 온로드
				 * @return 
				 * @author Choi In Seong. 2016.03.03
				 */
				moPage.onModelConstructDone_stdCsrCOffice = function() {
			
					//리피트 초기 설정
			//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
			//		ExtRepeat.init("rptCsrOfficeInfo");
			
					//서브미션 실행 (실패시 cover page)
					//strCommand: onLoad 
					util.Submit.send(app, "subOnLoad", function(pbSuccess){
						if(pbSuccess){
							
							util.Control.redraw(app, ["rptCsrOfficeInfo"]);
							
							// 부모멤버변수에담긴학번받음
							msStudId = moPage.parent.moParentObj.studId;
							if (ValueUtil.isNull(msStudId)) {
								return false;
							}else{
								doList(function(pbSuccess) {
									// 조회 : "조회되었습니다." header 메세지 표시
									if(pbSuccess) {
										moPage.parentSendMsg("lblTitleRptCsrOfficeInfo", NLS.INF.M024);
									}
								});
							}
						}
					});
				}
			
				/**
				 * @desc 직장정보 조회
				 * @param 
				 * @return void
				 * @author Choi In Seong. 2016.03.03
				 */
				function doList(poCallBackFunc) {
					util.DataMap.setValue(app, "dmReqList", "strStudId", msStudId);
					//strCommand: list 
					util.Submit.send(app, "subList", function(pbSuccess){
						if(pbSuccess){
							util.Control.redraw(app, "grdCsrOfficeInfo");
							util.Control.redraw(app, ["lblRowCnt_rptCsrOfficeInfo"]);
							// 조회 후 콜백함수 수행
							if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
						}
					});
				}
				
			   /**
				 * @desc 직장정보 신규
				 * @param
				 * @return void
				 * @author Choi In Seong. 2016.03.03
				 */
				moPage.onClick_BtnNew = function() {
					//해당 리피트 insertRow 후 편집 시작할 컬럼 지정
					util.Grid.insertRow(app, "grdCsrOfficeInfo");
					util.Grid.setCellValue(app, "grdCsrOfficeInfo", "STUD_ID", msStudId);
					util.Grid.setCellValue(app, "grdCsrOfficeInfo", "ONOFFI_END_DT", "99991231");
				};
			
			   /**
				 * @desc 직장정보 삭제
				 * @param
				 * @return void
				 * @author Choi In Seong. 2016.03.03
				 */
				moPage.onClick_BtnDel = function() {
					if(util.Grid.getIndex(app, "grdCsrOfficeInfo")==0){
						//건수가 없을 경우 부모창에 메시지를 뿌림
						moPage.parentSendMsg("lblTitleRptCsrOfficeInfo", NLS.INF.M005);
						return false;
					}else{
						util.Grid.deleteRow(app, "grdCsrOfficeInfo");
					}
				};
			
			   /**
				 * @desc 직장정보 작업취소
				 * @param
				 * @return void
				 * @author Choi In Seong. 2016.03.03
				 */
				moPage.onClick_BtnRestore = function() {
					util.Grid.restoreRow(app, "grdCsrOfficeInfo");
				};
			
			   /**
				 * @desc 직장정보 저장
				 * @param
				 * @return void
				 * @author Choi In Seong. 2016.03.03
				 */
				moPage.onClick_BtnSave = function() {
					doSubSave();
				};
			
				/**
				 * @desc 
				 * @param 
				 * @return 
				 * @author Choi In Seong. 2016.03.03
				 */
				function doSubSave(poCallbackFunc) {
			
					// 리피터 변경사항 체크
					if(!util.Grid.isModified(app, ["grdCsrOfficeInfo"], null)){
						moPage.parentSendMsg("lblTitleRptCsrOfficeInfo",NLS.WRN.M007);
						if(util.isFunc(poCallbackFunc)) poCallbackFunc(false);
						return false;
					}
					
					//리피트 validation check
					if(!util.validate(app, "grdCsrOfficeInfo")){
						if(util.isFunc(poCallbackFunc)) poCallbackFunc(false);
						return false;
					}
					
					//strCommand: save 
					util.Submit.send(app, "subSave", function(pbSuccessSave) {
							if(pbSuccessSave) {
								var vsLastSerialNo = util.DataMap.getValue(app, "dmResList", "strLastSerialNo");
								//마지막 순번있으면 포커싱 가도록
								if(vsLastSerialNo!=""){
									ExtRepeat.setPkValues("rptCsrOfficeInfo", vsLastSerialNo);
								}
								
								//저장성공 메세지 출력
								doList(function(pbSuccessList) {
									// 조회 : "조회되었습니다." header 메세지 표시
									if(pbSuccessList) {
										moPage.parentSendMsg("lblTitleRptCsrOfficeInfo",NLS.INF.M025);
									}
									if(util.isFunc(poCallbackFunc))	poCallbackFunc(pbSuccessList);
								});
							}
						}
					);
				}
			
				/**
				 * @desc 리피트 panel click event
				 * @param
				 * @return void
				 * @author Choi In Seong. 2016.03.03
				 */
				moPage.onValueChanged_RhCkbSelect = function() {
			//TO-BE: <ExtRepeat.selectedAllPanel> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
			//		ExtRepeat.selectedAllPanel("rhCkbSelect");
				};
			
				/**
				 * @desc 부모 헤더에 메세지 뿌리기
				 * @param psCtrlId 
				 * @param psMsgCode 
				 * @return void
				 * @author Choi In Seong. 2016.03.03
				 */
				moPage.parentSendMsg = function(psCtrlId, psMsgCodeNm) {
					var vsMsg = ExtControl.getTextValue(psCtrlId);
					vsMsg     = "[" + vsMsg + "]";
				
					util.Msg.notify(app, vsMsg + psMsgCodeNm);	
				};
			
				/**
				 * @desc 변경여부 반환
				 * @param 
				 * @return boolean 변경여부
				 * @author Choi In Seong. 2016.03.03
				 */
				function doCheckDataChange() {
					if(util.Grid.isModified(app, ["grdCsrOfficeInfo"], "CRM") ){
						return false;
					}else{
						return true;
					}
				};
				
				return moPage;
			};;
			// End - User Script
			
			// Header
			var dataSet_1 = new cpr.data.DataSet("dsOfficeDivRcdList");
			dataSet_1.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_1);
			
			var dataSet_2 = new cpr.data.DataSet("dsCsrOffice");
			dataSet_2.parseData({
				"info": "CSR_OFFICE@STUD_ID,SERIAL_NO",
				"columns": [
					{"name": "STUD_ID"},
					{"name": "SERIAL_NO"},
					{"name": "OFFICE_NM"},
					{"name": "OFFICE_DIV_RCD"},
					{"name": "POSI_NM"},
					{"name": "ONOFFI_ST_DT"},
					{"name": "ONOFFI_END_DT"},
					{"name": "REMARK"}
				],
				"rows": []
			});
			app.register(dataSet_2);
			var dataMap_1 = new cpr.data.DataMap("dmReqList");
			dataMap_1.parseData({
				"columns" : [{
					"name": "strStudId",
					"dataType": "string"
				}]
			});
			app.register(dataMap_1);
			
			var dataMap_2 = new cpr.data.DataMap("dmResList");
			dataMap_2.parseData({
				"columns" : [{
					"name": "strLastSerialNo",
					"dataType": "string"
				}]
			});
			app.register(dataMap_2);
			var submission_1 = new cpr.protocols.Submission("subOnLoad");
			submission_1.action = "/csr/StdCsrOfficeInfo/";
			submission_1.mediaType = "application/x-www-form-urlencoded";
			submission_1.addResponseData(dataSet_1, false);
			app.register(submission_1);
			
			var submission_2 = new cpr.protocols.Submission("subList");
			submission_2.action = "/csr/StdCsrOfficeInfo/";
			submission_2.mediaType = "application/x-www-form-urlencoded";
			submission_2.addRequestData(dataMap_1);
			submission_2.addResponseData(dataSet_2, false);
			app.register(submission_2);
			
			var submission_3 = new cpr.protocols.Submission("subSave");
			submission_3.action = "/csr/StdCsrOfficeInfo/";
			submission_3.mediaType = "application/x-www-form-urlencoded";
			submission_3.addRequestData(dataMap_1);
			submission_3.addResponseData(dataMap_2, false);
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
			var group_1 = new cpr.controls.Container("grpData");
			// Layout
			var xYLayout_2 = new cpr.controls.layouts.XYLayout();
			group_1.setLayout(xYLayout_2);
			(function(container){
				var userDefinedControl_1 = linker.userDefinedControl_1 = new udc.com.comTitle();
				userDefinedControl_1.bind("title").toLanguage("UI-SCR-WORKINF");
				container.addChild(userDefinedControl_1, {
					"top": "5px",
					"left": "5px",
					"width": "265px",
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
					"left": "765px",
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
					"left": "830px",
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
					"left": "895px",
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
					"left": "960px",
					"width": "60px",
					"height": "25px"
				});
				var grid_1 = linker.grid_1 = new cpr.controls.Grid("grdCsrOfficeInfo");
				grid_1.init({
					"dataSet": app.lookup("dsCsrOffice"),
					"columns": [
						{"width": "25px"},
						{"width": "25px"},
						{"width": "40px"},
						{"width": "40px"},
						{"width": "184px"},
						{"width": "266px"},
						{"width": "118px"},
						{"width": "100px"},
						{"width": "100px"},
						{"width": "113px"},
						{
							"width": "62px",
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
									cell.bind("text").toLanguage("UI-GLS-SERIAL_NO");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 4},
								"configurator": function(cell){
									cell.style.setClasses(["require"]);
									cell.bind("text").toLanguage("UI-SCR-OFFICENM");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 5},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-SCR-OFFICEDIV");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 6},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-DB-POSI_NM");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 7},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-DB-ONOFFI_ST_DT");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 8},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-DB-ONOFFI_END_DT");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 9},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-GLS-REMARK");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 10},
								"configurator": function(cell){
									cell.style.setClasses(["require"]);
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
									cell.columnName = "SERIAL_NO";
									cell.style.css({
										"text-align" : "right"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 4},
								"configurator": function(cell){
									cell.columnName = "OFFICE_NM";
									cell.control = (function(){
										var inputBox_1 = new cpr.controls.InputBox("gdIpbOfficeNm");
										inputBox_1.maxLength = 100;
										inputBox_1.userAttr({"require": "Y"});
										inputBox_1.bind("value").toDataColumn("OFFICE_NM");
										return inputBox_1;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 5},
								"configurator": function(cell){
									cell.columnName = "OFFICE_DIV_RCD";
									cell.control = (function(){
										var comboBox_1 = new cpr.controls.ComboBox("gdCbbOfficeDivRcd");
										(function(comboBox_1){
											comboBox_1.setItemSet(app.lookup("dsOfficeDivRcdList"), {
												"label": "CD_NM",
												"value": "CD"
											});
										})(comboBox_1);
										comboBox_1.bind("value").toDataColumn("OFFICE_DIV_RCD");
										return comboBox_1;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 6},
								"configurator": function(cell){
									cell.columnName = "POSI_NM";
									cell.control = (function(){
										var inputBox_2 = new cpr.controls.InputBox("gdIpbPosiNm");
										inputBox_2.maxLength = 50;
										inputBox_2.bind("value").toDataColumn("POSI_NM");
										return inputBox_2;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 7},
								"configurator": function(cell){
									cell.columnName = "ONOFFI_ST_DT";
									cell.control = (function(){
										var dateInput_1 = new cpr.controls.DateInput("gdDipOnoffiStDt");
										dateInput_1.style.css({
											"text-align" : "center"
										});
										dateInput_1.bind("value").toDataColumn("ONOFFI_ST_DT");
										return dateInput_1;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 8},
								"configurator": function(cell){
									cell.columnName = "ONOFFI_END_DT";
									cell.control = (function(){
										var dateInput_2 = new cpr.controls.DateInput("gdDipOnoffiEndDt");
										dateInput_2.style.css({
											"text-align" : "center"
										});
										dateInput_2.bind("value").toDataColumn("ONOFFI_END_DT");
										return dateInput_2;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 9},
								"configurator": function(cell){
									cell.columnName = "REMARK";
									cell.control = (function(){
										var inputBox_3 = new cpr.controls.InputBox("gdIpbRemark");
										inputBox_3.maxLength = 300;
										inputBox_3.bind("value").toDataColumn("REMARK");
										return inputBox_3;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 10},
								"configurator": function(cell){
									cell.columnName = "STUD_ID";
									cell.control = (function(){
										var inputBox_4 = new cpr.controls.InputBox("gdIpbStudId");
										inputBox_4.maxLength = 20;
										inputBox_4.userAttr({"require": "Y"});
										inputBox_4.bind("value").toDataColumn("STUD_ID");
										return inputBox_4;
									})();
								}
							}
						]
					}
				});
				container.addChild(grid_1, {
					"top": "30px",
					"left": "5px",
					"width": "1015px",
					"height": "428px"
				});
			})(group_1);
			container.addChild(group_1, {
				"top": "0px",
				"left": "0px",
				"width": "1025px",
				"height": "463px"
			});
			
			var embeddedApp_1 = new cpr.controls.EmbeddedApp("emaSbpHeader");
			if(typeof onEmaSbpHeaderAppReady == "function") {
				embeddedApp_1.addEventListener("app-ready", onEmaSbpHeaderAppReady);
			}
			cpr.core.App.load("app/imp/impSbpHeader", function(app) {
				if(app){
					embeddedApp_1.app = app;
				}
			});
			container.addChild(embeddedApp_1, {
				"top": "445px",
				"left": "70px",
				"width": "96px",
				"height": "25px"
			});
			if(typeof onBodyLoad == "function"){
				app.addEventListener("load", onBodyLoad);
			}
			// Linking
			linker.userDefinedControl_1.ctrl = linker.grid_1;
		}
	});
	app.title = "stdCsrCOfficeInfo";
	cpr.core.Platform.INSTANCE.register(app);
})();