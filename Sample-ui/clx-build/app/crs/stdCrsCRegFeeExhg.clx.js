/*
 * App URI: app/crs/stdCrsCRegFeeExhg
 * Source Location: app/crs/stdCrsCRegFeeExhg.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("app/crs/stdCrsCRegFeeExhg", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			﻿//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
			///<xtmlink path="./stdCrsCRegFeeExhg.xtm"/>
			
			var stdCrsCRegFeeExhg = function() {
			
				var moPage = new Page();
			
				/**
				 * @desc import 서브페이지 초기화
				 * @member stdCrsCRegFeeExhg
				 * @param
				 * @return void
				 * @author Aeyoung Lee 2016. 3. 30.
				 */
				moPage.onLoadImportDone_ImpSbpHeader = function() {
					doSbpHeaderOnLoad();
				}
				
				/**
				 * @desc 화면 온로드
				 * @member stdCrsCRegFeeExhg
				 * @param
				 * @return void
				 * @author Aeyoung Lee 2016. 3. 30.
				 */
				moPage.onModelConstructDone_StdCrsCRegFeeExhg = function() {
					
					//리피트 초기 설정
			//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
			//		ExtRepeat.init("rptRegFeeExh");
					
					// 부모창에 있는 값 셋팅
					var voParentInfo = moPage.parent.moCmnInfo;
					
					util.DataMap.setValue(app, "dmReqKey", "strStudId"	 , voParentInfo.studId);
					util.DataMap.setValue(app, "dmReqKey", "strSchYearRcd", voParentInfo.schYearRcd);
					util.DataMap.setValue(app, "dmReqKey", "strSmtRcd"	 , voParentInfo.smtRcd);
					util.DataMap.setValue(app, "dmReqKey", "strRegClsRcd" , voParentInfo.regClsRcd);
						
					// 조회
					doList(function(pbSuccess) {
						if (pbSuccess){
							// "조회되었습니다."
							moPage.setParentMsg(NLS.INF.M024);		
						}
					});
				};
			
				/**
				 * @desc 등록금대체내역 목록을 조회한다.
				 * @member stdCrsCRegFeeExhg
				 * @param poCallBackFunc 콜백 함수
				 * @return void
				 * @author Aeyoung Lee 2016. 3. 30.
				 */
				function doList(poCallBackFunc) {
					
					//strCommand: onLoad 
					util.Submit.send(app, "subOnLoad", function(pbSuccess) {
						if (pbSuccess) {
							util.Control.redraw(app, "grdRegFeeExh");
						}
						
						if(util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
					});
				};
				
				/**
				 * @desc 신규버튼 클릭 이벤트
				 * @member stdCrsCRegFeeExhg
				 * @param   
				 * @return void
				 * @author Aeyoung Lee 2016. 3. 30.
				 */
				moPage.onClick_BtnNew = function() {
					var vnNewRow = util.Grid.insertRow(app, "grdRegFeeExh", "rdCbbItemCd");
					
					util.Grid.setCellValue(app, "grdRegFeeExh", "STUD_ID"	  , util.DataMap.getValue(app, "dmReqKey", "strStudId"), vnNewRow);
					util.Grid.setCellValue(app, "grdRegFeeExh", "SCH_YEAR_RCD" , util.DataMap.getValue(app, "dmReqKey", "strSchYearRcd"), vnNewRow);
					util.Grid.setCellValue(app, "grdRegFeeExh", "SMT_RCD"	  , util.DataMap.getValue(app, "dmReqKey", "strSmtRcd"), vnNewRow);
					util.Grid.setCellValue(app, "grdRegFeeExh", "REG_CLS_RCD"  , util.DataMap.getValue(app, "dmReqKey", "strRegClsRcd"), vnNewRow);
					util.Grid.setCellValue(app, "grdRegFeeExh", "DESC_TYPE_RCD", "CR302EXH", vnNewRow);
					util.Grid.setCellValue(app, "grdRegFeeExh", "AMT" 		  , "0", vnNewRow);
				};
				
				/**
				 * @desc 삭제버튼 클릭 이벤트
				 * @member stdCrsCRegFeeExhg
				 * @param   
				 * @return void
				 * @author Aeyoung Lee 2016. 3. 30.
				 */
				moPage.onClick_BtnDel = function() {
					util.Grid.deleteRow(app, "grdRegFeeExh");
				};
				
				/**
				 * @desc 작업취소버튼 클릭 이벤트
				 * @member stdCrsCRegFeeExhg
				 * @param   
				 * @return void
				 * @author Aeyoung Lee 2016. 3. 30.
				 */
				moPage.onClick_BtnRestore = function() {
					util.Grid.restoreRow(app, "grdRegFeeExh");
				};
				
				/**
				 * @desc 작업저장버튼 클릭 이벤트
				 * @member stdCrsCRegFeeExhg
				 * @param   
				 * @return void
				 * @author Aeyoung Lee 2016. 3. 30.
				 */
				moPage.onClick_BtnSave = function() {
					// 리피터 변경사항 체크
					if(!util.Grid.isModified(app, ["grdRegFeeExh"], null)){
						moPage.setParentMsg(NLS.WRN.M007);
						return false;
					}
					
					// Validation Check
					if(!util.validate(app, ["grdRegFeeExh"])) return false;
					
					//저장서브미션
					//strCommand: save 
					util.Submit.send(app, "subSave", function(pbSuccessSave) {
						if(pbSuccessSave) {
							//저장성공 메세지 출력
							doList(function(pbSuccessList) {
								// "갱신된 데이터가 조회되었습니다."
								if(pbSuccessList) {
									this.setParentMsg(NLS.INF.M025);
								}
							});
						}
					});
				};
				
				/**
				 * onValueChanged_RptRegFeeExh 등록금 대체내역 변경 이벤트
				 * @member stdCrsCRegFeeExhg
				 * @param  psColDiv 변경된 ref
				 * @return void
				 * @author Aeyoung Lee 2016. 3. 30.
				 */	
				moPage.onValueChanged_RptRegFeeExh = function(psColDiv) {
					var vnIdx = util.Grid.getIndex(app, "grdRegFeeExh");
					var vsValue = util.Grid.getCellValue(app, "grdRegFeeExh", psColDiv, vnIdx);
					
					// 등록금항목
					if(psColDiv == "ITEM_CD"){
						if(!ValueUtil.isNull(vsValue)){
							util.Grid.setCellValue(app, "grdRegFeeExh", "SERIAL_NO", doGetSerialNo(vnIdx, vsValue), vnIdx);	
						}else{
							util.Grid.setCellValue(app, "grdRegFeeExh", "SERIAL_NO", "", vnIdx);	
						}	
			        }
				};
				
				/**
				 * doGetSerialNo 순번리턴
				 * @param  pnIdx 선택된 로우 인덱스
				 * @param  psItemCd 선택된 등록금항목 코드
				 * @member stdCrsCRegFeeExhg
				 * @return vnMaxSerialNo 
				 * @author Aeyoung Lee 2016. 3. 30.
				 */
				function doGetSerialNo(pnIdx, psItemCd) {
					var vnMaxSerialNo = null;
					for (var i = 1; i <= util.Grid.getRowCount(app, "grdRegFeeExh"); i++) {
						
						if(pnIdx == i) continue;
						
						var vsItemCd = util.Grid.getCellValue(app, "grdRegFeeExh", "ITEM_CD", i);
						
						if(psItemCd == vsItemCd){
							var vnSerialNo = Number(util.Grid.getCellValue(app, "grdRegFeeExh", "SERIAL_NO", i));
							
							if(vnMaxSerialNo == null){
								vnMaxSerialNo = vnSerialNo
							}else{
								if(vnMaxSerialNo < vnSerialNo) vnMaxSerialNo = vnSerialNo;
							}	
						}	
					}	
					return vnMaxSerialNo + 1;
				};	
				
				/**
				 * @desc 부모 헤더에 메세지 뿌리기
				 * @member stdCrsCRegFeeExhg
				 * @param psMsgCode 메시지 코드
				 * @param  paMsg 메시지 변수 
				 * @return void
				 * @author Aeyoung Lee 2016. 3. 30.
				 */
				moPage.setParentMsg = function(psMsgCode, paMsg) {
					util.Msg.notify(app, psMsgCode, paMsg);	
				};
				
				/**
				 * @desc 변경사항체크 - 부모창에서 호출용
				 * @member stdCrsCRegFeeExhg
				 * @return void
				 * @author Aeyoung Lee 2016. 3. 30.
				 */
				function doCheckDataChange() {
					if(util.Grid.isModified(app, ["grdRegFeeExh"], "CRM") ){
						return false;
					}else{
						return true;
					}
				};
				
				return moPage;
			};;
			// End - User Script
			
			// Header
			var dataSet_1 = new cpr.data.DataSet("dsListCrsItem");
			dataSet_1.parseData({
				"columns": [
					{"name": "ITEM_CD"},
					{"name": "ITEM_NM"}
				],
				"rows": []
			});
			app.register(dataSet_1);
			
			var dataSet_2 = new cpr.data.DataSet("dsRegFeeExh");
			dataSet_2.parseData({
				"info": "CRS_REG_FEE_PAY@ITEM_CD,SERIAL_NO,STUD_ID,SCH_YEAR_RCD,SMT_RCD,REG_CLS_RCD,DESC_TYPE_RCD",
				"columns": [
					{"name": "ITEM_CD"},
					{"name": "SERIAL_NO"},
					{"name": "AMT"},
					{"name": "PROC_DT"},
					{"name": "REMARK"},
					{"name": "STUD_ID"},
					{"name": "SCH_YEAR_RCD"},
					{"name": "SMT_RCD"},
					{"name": "REG_CLS_RCD"},
					{"name": "DESC_TYPE_RCD"}
				],
				"rows": []
			});
			app.register(dataSet_2);
			var dataMap_1 = new cpr.data.DataMap("dmReqKey");
			dataMap_1.parseData({
				"columns" : [
					{
						"name": "strStudId",
						"dataType": "string"
					},
					{
						"name": "strSchYearRcd",
						"dataType": "string"
					},
					{
						"name": "strSmtRcd",
						"dataType": "string"
					},
					{
						"name": "strRegClsRcd",
						"dataType": "string"
					}
				]
			});
			app.register(dataMap_1);
			var submission_1 = new cpr.protocols.Submission("subOnLoad");
			submission_1.action = "/crs/StdCrsRegFeeExhg/";
			submission_1.mediaType = "application/x-www-form-urlencoded";
			submission_1.addRequestData(dataMap_1);
			submission_1.addResponseData(dataSet_1, false);
			submission_1.addResponseData(dataSet_2, false);
			app.register(submission_1);
			
			var submission_2 = new cpr.protocols.Submission("subSave");
			submission_2.action = "/crs/StdCrsRegFeeExhg/";
			submission_2.mediaType = "application/x-www-form-urlencoded";
			submission_2.addRequestData(dataMap_1);
			submission_2.addRequestData(dataSet_2);
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
			var group_1 = new cpr.controls.Container("grpSearchRegi");
			group_1.style.setClasses(["search-box"]);
			// Layout
			var xYLayout_2 = new cpr.controls.layouts.XYLayout();
			group_1.setLayout(xYLayout_2);
			(function(container){
				var button_1 = new cpr.controls.Button("btnSearch");
				button_1.visible = false;
				button_1.value = "조회";
				button_1.style.setClasses(["btn-search"]);
				if(typeof onBtnSearchClick == "function") {
					button_1.addEventListener("click", onBtnSearchClick);
				}
				container.addChild(button_1, {
					"top": "0px",
					"left": "110px",
					"width": "15px",
					"height": "25px"
				});
			})(group_1);
			container.addChild(group_1, {
				"top": "5px",
				"left": "465px",
				"width": "115px",
				"height": "25px"
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
				"top": "415px",
				"left": "0px",
				"width": "96px",
				"height": "25px"
			});
			
			var group_2 = new cpr.controls.Container("grpDataDtl");
			// Layout
			var xYLayout_3 = new cpr.controls.layouts.XYLayout();
			group_2.setLayout(xYLayout_3);
			(function(container){
				var userDefinedControl_1 = linker.userDefinedControl_1 = new udc.com.comTitle();
				userDefinedControl_1.bind("title").toLanguage("UI-SCR-REGFEESUBRCLST");
				container.addChild(userDefinedControl_1, {
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
					"left": "764px",
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
					"left": "829px",
					"width": "60px",
					"height": "25px"
				});
				var grid_1 = linker.grid_1 = new cpr.controls.Grid("grdRegFeeExh");
				grid_1.init({
					"dataSet": app.lookup("dsRegFeeExh"),
					"columns": [
						{"width": "25px"},
						{"width": "25px"},
						{"width": "40px"},
						{"width": "125px"},
						{"width": "59px"},
						{"width": "117px"},
						{"width": "103px"},
						{"width": "518px"}
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
									cell.bind("text").toLanguage("UI-SCR-TUITIONITEM");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 4},
								"configurator": function(cell){
									cell.style.setClasses(["require"]);
									cell.bind("text").toLanguage("UI-GLS-SERIAL_NO");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 5},
								"configurator": function(cell){
									cell.style.setClasses(["require"]);
									cell.bind("text").toLanguage("UI-GLS-AMT");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 6},
								"configurator": function(cell){
									cell.style.setClasses(["require"]);
									cell.bind("text").toLanguage("UI-GLS-DT");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 7},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-GLS-REMARK");
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
									cell.columnName = "ITEM_CD";
									cell.control = (function(){
										var comboBox_1 = new cpr.controls.ComboBox("gdCbbItemCd");
										comboBox_1.userAttr({"require": "Y"});
										(function(comboBox_1){
											comboBox_1.addItem(new cpr.controls.Item("선택", ""));
											comboBox_1.setItemSet(app.lookup("dsListCrsItem"), {
												"label": "ITEM_NM",
												"value": "ITEM_CD"
											});
										})(comboBox_1);
										comboBox_1.bind("value").toDataColumn("ITEM_CD");
										return comboBox_1;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 4},
								"configurator": function(cell){
									cell.columnName = "SERIAL_NO";
									cell.style.css({
										"text-align" : "center"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 5},
								"configurator": function(cell){
									cell.columnName = "AMT";
									cell.control = (function(){
										var output_2 = new cpr.controls.Output("gdOptAmt");
										output_2.dataType = "number";
										output_2.format = "s#,###";
										output_2.style.css({
											"text-align" : "right"
										});
										output_2.bind("value").toDataColumn("AMT");
										return output_2;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 6},
								"configurator": function(cell){
									cell.columnName = "PROC_DT";
									cell.control = (function(){
										var dateInput_1 = new cpr.controls.DateInput("gdDipProcDt");
										dateInput_1.userAttr({"require": "Y"});
										dateInput_1.style.css({
											"text-align" : "center"
										});
										dateInput_1.bind("value").toDataColumn("PROC_DT");
										return dateInput_1;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 7},
								"configurator": function(cell){
									cell.columnName = "REMARK";
									cell.control = (function(){
										var inputBox_1 = new cpr.controls.InputBox("gdIpbRemark");
										inputBox_1.maxLength = 1000;
										inputBox_1.bind("value").toDataColumn("REMARK");
										return inputBox_1;
									})();
								}
							}
						]
					}
				});
				container.addChild(grid_1, {
					"top": "30px",
					"left": "5px",
					"width": "1014px",
					"height": "394px"
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
					"left": "894px",
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
					"left": "959px",
					"width": "60px",
					"height": "25px"
				});
			})(group_2);
			container.addChild(group_2, {
				"top": "0px",
				"left": "0px",
				"width": "1025px",
				"height": "430px"
			});
			if(typeof onBodyLoad == "function"){
				app.addEventListener("load", onBodyLoad);
			}
			// Linking
			linker.userDefinedControl_1.ctrl = linker.grid_1;
		}
	});
	app.title = "등록금대체관리";
	cpr.core.Platform.INSTANCE.register(app);
})();