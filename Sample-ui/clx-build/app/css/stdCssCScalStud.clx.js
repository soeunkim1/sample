/*
 * App URI: app/css/stdCssCScalStud
 * Source Location: app/css/stdCssCScalStud.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("app/css/stdCssCScalStud", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			﻿//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
			///<xtmlink path="./stdCssCScalStud.xtm"/>
			
			var stdCssCScalStud = function() {
			
				var moPage = new Page();
				var moPObject = new PObject();
				
				/**
				 * 장학생(상세)팝업 관련 설정사항
				 */
				moPObject.moScalStudDtlParam = {
					progMode : null,
					serialNo : null,
					
					studId : null,
					studNo : null,
					schYearRcd : null,
					smtRcd : null,
					stDt : null,
					endDt : null,
					currentDt : null,
					
					studNm : null,
					ogCd : null,
					ogNm : null,
					saCd : null,
					saNm : null,
					spCd : null,
					spNm : null,
					statRcd : null,
					statNm : null
				};
			
				/**
				 * @desc import 서브페이지 초기화
				 * @member stdCssCScalStud
				 * @param
				 * @return void
				 * @author Aeyoung Lee 2016. 3. 3.
				 */
				moPage.onLoadImportDone_ImpSbpHeader = function() {
					doSbpHeaderOnLoad();
				}
				
				/**
				 * @desc 화면 온로드
				 * @member stdCssCScalStud
				 * @param
				 * @return void
				 * @author Aeyoung Lee 2016. 3. 3.
				 */
				moPage.onModelConstructDone_stdCssCScalStud = function() {
					
					//리피트 초기 설정
			//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
			//		ExtRepeat.init("rptScalStud");
					
					// 부모창에 있는 값 셋팅
					var voParentInfo = moPage.parent.moCmnInfo;
					
					moPObject.moScalStudDtlParam.studNm = voParentInfo.studNm;
					moPObject.moScalStudDtlParam.ogCd = voParentInfo.ogCd;
					moPObject.moScalStudDtlParam.ogNm = voParentInfo.ogNm;
					moPObject.moScalStudDtlParam.saCd = voParentInfo.saCd;
					moPObject.moScalStudDtlParam.saNm = voParentInfo.saNm;
					moPObject.moScalStudDtlParam.spCd = voParentInfo.spCd;
					moPObject.moScalStudDtlParam.spNm = voParentInfo.spNm;
					moPObject.moScalStudDtlParam.statRcd = voParentInfo.statRcd;
					moPObject.moScalStudDtlParam.statNm = voParentInfo.statNm;
					
					moPObject.moScalStudDtlParam.studId = voParentInfo.studId;
					moPObject.moScalStudDtlParam.studNo = voParentInfo.studNo;
					moPObject.moScalStudDtlParam.schYearRcd = voParentInfo.schYearRcd;
					moPObject.moScalStudDtlParam.smtRcd = voParentInfo.smtRcd;
					moPObject.moScalStudDtlParam.currentDt = voParentInfo.currentDt;
					moPObject.moScalStudDtlParam.stDt = voParentInfo.stDt;
					moPObject.moScalStudDtlParam.endDt = voParentInfo.endDt;
					
					util.DataMap.setValue(app, "dmSchedule", "strSchYearRcd", voParentInfo.schYearRcd);
					util.DataMap.setValue(app, "dmSchedule", "strSmtRcd"	  , voParentInfo.smtRcd);
					util.DataMap.setValue(app, "dmSchedule", "strStDt"	  , voParentInfo.stDt);
					util.DataMap.setValue(app, "dmSchedule", "strEndDt"	  , voParentInfo.endDt);
					util.DataMap.setValue(app, "dmReqKey", "strStudId"	 		  , voParentInfo.studId);
						
					// 조회
					doList(function(pbSuccess) {
						if (pbSuccess){
							// "조회되었습니다."
							setParentMsg(NLS.INF.M024);		
						}
					});
				};
			
				/**
				 * @desc 장학생 내역을 조회한다.
				 * @member stdCssCScalStud
				 * @param poCallBackFunc 콜백 함수
				 * @return void
				 * @author Aeyoung Lee 2016. 3. 3.
				 */
				function doList(poCallBackFunc) {
					
					//strCommand: onLoad 
					util.Submit.send(app, "subOnLoad", function(pbSuccess) {
						if (pbSuccess) {
							util.Control.redraw(app, ["rptScalStud"]);
						}
						
						if(util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
					});
				};
				
				/**
				 * @desc 신규등록 팝업 호출
				 * @member stdCssCScalStud
				 * @param   
				 * @return void
				 * @author Aeyoung Lee 2016. 3. 3.
				 */
				moPage.onClick_BtnNew = function() {
					var vsSerialNo = 0;
					for (var i = 1; i <= util.Grid.getRowCount(app, "grdScalStud"); i++) {
						var vsSerialNoTemp =  util.Grid.getCellValue(app, "grdScalStud", "SERIAL_NO", i);
						if (vsSerialNo < vsSerialNoTemp) {
							vsSerialNo = vsSerialNoTemp;
						}
					}
					vsSerialNo = vsSerialNo + 1;
					moPObject.moScalStudDtlParam.progMode = "ADD";
					moPObject.moScalStudDtlParam.serialNo = vsSerialNo;
					
					ExtPopUp.openLayeredPopup("/xtm/css/stdCssCScalStudDtl.xtm", 812, 600);
				};
				
				/**
				 * @desc 삭제버튼 클릭 이벤트
				 * @member stdCssCScalStud
				 * @param   
				 * @return void
				 * @author Aeyoung Lee 2016. 3. 3.
				 */
				moPage.onClick_BtnDel = function() {
					var vnRowIdx = util.Grid.getCheckOrSelectedRowIndex(app, "grdScalStud")
					if(ValueUtil.isNull(vnRowIdx)){
						var vsMsgParam = util.Grid.getTitle(app, "grdScalStudScalStud");
						// "@(을)를 선택해주세요" 메시지 출력
						util.Msg.alert("NLS-INF-M045", [vsMsgParam]);
						return;
					}	
					
					/*
					 * 현재 "삭제할 수 없습니다."라고 나오는 메시지를 세분화하여 사용자의 이해를 높인다.
					 * ghcDelYn이 Y면 삭제가 가능하다.
					 */	
					var vsDelYn = util.Grid.getCellValue(app, "grdScalStud", "DEL_YN", vnRowIdx);
					 
					if (vsDelYn == "Y") {
						util.Grid.deleteRow(app, "grdScalStud");
					} else if (vsDelYn == "PAYGRPKEY") {
						//납입그룹키 존재
						util.Msg.alert("NLS-CSS-M084", [NLS.NSCR.PAYGRPKEY]);
					} else if (vsDelYn == "DIVPAYNO") {
						//분납번호 존재
						util.Msg.alert("NLS-CSS-M084", [NLS.NSCR.DIVPAYNO]);
					} else if (vsDelYn == "RCC") {
						//환수 데이터 존재
						util.Msg.alert("NLS-CSS-M084", [NLS.NSCR.RCC]);
					} else if (vsDelYn == "TRN") {
						//이월 데이터 존재
						util.Msg.alert("NLS-CSS-M084", [NLS.NSCR.TRANSZ]);
					}
				};
				
				/**
				 * @desc 작업취소 클릭 이벤트
				 * @member stdCssCScalStud
				 * @param   
				 * @return void
				 * @author Aeyoung Lee 2016. 3. 3.
				 */
				moPage.onClick_BtnRestore = function() {
					util.Grid.restoreRow(app, "grdScalStud");
				};
				
				/**
				 * @desc 작업저장 클릭 이벤트
				 * @member stdCssCScalStud
				 * @param 
				 * @return boolean 변경여부
				 * @author Aeyoung Lee 2016. 3. 3.
				 */
				moPage.onClick_BtnSave = function() {
					doSave();
				};
				
				/**
				 * @desc 작업저장
				 * @member stdCssCScalStud
				 * @param poCallbackFunc 콜백함수
				 * @return Boolean
				 * @author Aeyoung Lee 2016. 3. 3.
				 */
				function doSave(poCallbackFunc) {
					// 리피터 변경사항 체크
					if(!util.Grid.isModified(app, ["grdScalStud"], null)){
						this.setParentMsg(NLS.WRN.M007);
					}
					
					//strCommand: save 
					util.Submit.send(app, "subSave", function(pbSuccessSave) {
						if(pbSuccessSave) {
							//저장성공 메세지 출력
							doList(function(pbSuccessList) {
								// "갱신된 데이터가 조회되었습니다."
								if(pbSuccessList) {
									this.setParentMsg(NLS.INF.M025);
								}
								
								if(util.isFunc(poCallbackFunc))	poCallbackFunc(pbSuccessList);
							});
						}
					});
				};
				
				/**
				 * @desc 리피트 로우 더블클릭 이벤트
				 * @member stdCssCScalStud
				 * @param 
				 * @return void
				 * @author Aeyoung Lee 2016. 3. 3.
				 */
				moPage.onRowDoubleClick_RptScalStud = function() {
					var vnRowIdx = util.Grid.getCheckOrSelectedRowIndex(app, "grdScalStud")
					
					if(ValueUtil.isNull(vnRowIdx)){
						var vsMsgParam = util.Grid.getTitle(app, "grdScalStudScalStud");
						// "@(을)를 선택해주세요" 메시지 출력
						util.Msg.alert("NLS-INF-M045", [vsMsgParam]);	
					}	
					
					var vsSerialNo = util.Grid.getCellValue(app, "grdScalStud", "SERIAL_NO", vnRowIdx);
					
					moPObject.moScalStudDtlParam.progMode = "UPD";
					moPObject.moScalStudDtlParam.serialNo = vsSerialNo;
					
					ExtPopUp.openLayeredPopup("/xtm/css/stdCssCScalStudDtl.xtm", 812, 600);
				};
				
				/**
				 * @desc 부모 헤더에 메세지 뿌리기
				 * @member stdCssCScalStud
				 * @param psMsgCode 
				 * @return void
				 * @author Aeyoung Lee 2016. 3. 3.
				 */
				moPage.setParentMsg = function(psMsgCode) {
					util.Msg.notify(app, psMsgCode);	
				};
				
				/**
				 * @desc 변경사항체크 - 부모창에서 호출용
				 * @member stdCssCScalStud
				 * @return void
				 * @author Aeyoung Lee 2016. 3. 3.
				 */
				function doCheckDataChange() {
					if(util.Grid.isModified(app, ["grdScalStud"], "CRM") ){
						return false;
					}else{
						return true;
					}
				};
				
				return moPage;
			};;
			// End - User Script
			
			// Header
			var dataSet_1 = new cpr.data.DataSet("dsListPmntDiv");
			dataSet_1.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_1);
			
			var dataSet_2 = new cpr.data.DataSet("dsListPmntItv");
			dataSet_2.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_2);
			
			var dataSet_3 = new cpr.data.DataSet("dsListWrkEval");
			dataSet_3.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_3);
			
			var dataSet_4 = new cpr.data.DataSet("dsListProcStat");
			dataSet_4.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_4);
			
			var dataSet_5 = new cpr.data.DataSet("dsScalStud");
			dataSet_5.parseData({
				"info": "CSS_SCAL_STUD@STUD_ID,SCH_YEAR_RCD,SMT_RCD,SERIAL_NO",
				"columns": [
					{"name": "SERIAL_NO"},
					{"name": "SCAL_FEE_CD"},
					{"name": "SCAL_FEE_NM"},
					{"name": "SCAL_AMT"},
					{"name": "PMNT_DIV_RCD"},
					{"name": "PMNT_ITV_RCD"},
					{"name": "PROC_STAT_RCD"},
					{"name": "REQ_DT"},
					{"name": "CNFM_DT"},
					{"name": "CANCEL_DT"},
					{"name": "HOPE_OG_OBJ_DIV_RCD"},
					{"name": "HOPE_WRK_DEPT_CD"},
					{"name": "HOPE_WRK_DEPT_NM"},
					{"name": "WRK_DEPT_CD"},
					{"name": "WRK_DEPT_NM"},
					{"name": "WRK_CHAG_OPRT"},
					{"name": "WRK_ST_DT"},
					{"name": "WRK_END_DT"},
					{"name": "WRK_EVAL_RCD"},
					{"name": "REMARK"},
					{"name": "REQ_DESC"},
					{"name": "CANCEL_DESC"},
					{"name": "DEL_YN"},
					{"name": "SCH_YEAR_RCD"},
					{"name": "SMT_RCD"},
					{"name": "OG_OBJ_DIV_RCD"},
					{"name": "SS_OBJ_DIV_RCD"},
					{"name": "REF_KEY"}
				],
				"rows": []
			});
			app.register(dataSet_5);
			var dataMap_1 = new cpr.data.DataMap("dmReqKey");
			dataMap_1.parseData({
				"columns" : [
					{
						"name": "strStudId",
						"dataType": "string"
					},
					{
						"name": "strObjDivRcd",
						"dataType": "string"
					},
					{
						"name": "strScalFeeCd",
						"dataType": "string"
					}
				]
			});
			app.register(dataMap_1);
			
			var dataMap_2 = new cpr.data.DataMap("dmSchedule");
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
						"name": "strStDt",
						"dataType": "string"
					},
					{
						"name": "strEndDt",
						"dataType": "string"
					}
				]
			});
			app.register(dataMap_2);
			
			var dataMap_3 = new cpr.data.DataMap("dmResultInfo");
			dataMap_3.parseData({
				"columns" : [
					{
						"name": "MSG",
						"dataType": "string"
					},
					{
						"name": "RESULT",
						"dataType": "string"
					}
				]
			});
			app.register(dataMap_3);
			
			var dataMap_4 = new cpr.data.DataMap("dmResList");
			dataMap_4.parseData({
				"columns" : [{
					"name": "strScalFeeAmt",
					"dataType": "string"
				}]
			});
			app.register(dataMap_4);
			var submission_1 = new cpr.protocols.Submission("subOnLoad");
			submission_1.action = "/css/StdCssScalStud/";
			submission_1.mediaType = "application/x-www-form-urlencoded";
			submission_1.addRequestData(dataMap_2);
			submission_1.addRequestData(dataMap_1);
			submission_1.addResponseData(dataSet_1, false);
			submission_1.addResponseData(dataSet_2, false);
			submission_1.addResponseData(dataSet_3, false);
			submission_1.addResponseData(dataSet_4, false);
			submission_1.addResponseData(dataSet_5, false);
			app.register(submission_1);
			
			var submission_2 = new cpr.protocols.Submission("subSave");
			submission_2.action = "/css/StdCssScalStud/";
			submission_2.mediaType = "application/x-www-form-urlencoded";
			submission_2.addRequestData(dataSet_5);
			app.register(submission_2);
			
			var submission_3 = new cpr.protocols.Submission("subCheckValid");
			submission_3.action = "/css/StdCssScalStud/";
			submission_3.mediaType = "application/x-www-form-urlencoded";
			submission_3.addRequestData(dataMap_1);
			submission_3.addResponseData(dataMap_4, false);
			app.register(submission_3);
			
			var submission_4 = new cpr.protocols.Submission("subCalcScalFee");
			submission_4.action = "/css/StdCssScalStud/";
			submission_4.mediaType = "application/x-www-form-urlencoded";
			submission_4.addRequestData(dataMap_1);
			submission_4.addRequestData(dataMap_2);
			submission_4.addResponseData(dataMap_4, false);
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
				"top": "397px",
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
				userDefinedControl_1.bind("title").toLanguage("");
				container.addChild(userDefinedControl_1, {
					"top": "5px",
					"left": "5px",
					"width": "265px",
					"height": "25px"
				});
				var button_2 = new cpr.controls.Button("btnNew");
				button_2.value = "";
				button_2.style.setClasses(["btn-new"]);
				button_2.bind("value").toLanguage("UI-SCR-NEWREG");
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
				button_3.bind("value").toLanguage("UI-SCR-REGCHG");
				if(typeof onBtnDelClick == "function") {
					button_3.addEventListener("click", onBtnDelClick);
				}
				container.addChild(button_3, {
					"top": "5px",
					"left": "829px",
					"width": "60px",
					"height": "25px"
				});
				var button_4 = new cpr.controls.Button("btnRestore");
				button_4.value = "";
				button_4.style.setClasses(["btn-restore"]);
				button_4.bind("value").toLanguage("UI-SCR-REGCANCL");
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
				var grid_1 = linker.grid_1 = new cpr.controls.Grid("grdScalStud");
				grid_1.init({
					"dataSet": app.lookup("dsScalStud"),
					"columns": [
						{"width": "25px"},
						{"width": "40px"},
						{"width": "43px"},
						{"width": "119px"},
						{"width": "99px"},
						{"width": "88px"},
						{"width": "77px"},
						{"width": "80px"},
						{"width": "80px"},
						{"width": "80px"},
						{"width": "80px"},
						{"width": "100px"},
						{"width": "100px"},
						{"width": "100px"},
						{"width": "80px"},
						{"width": "81px"},
						{"width": "79px"},
						{"width": "165px"},
						{"width": "205px"},
						{"width": "204px"}
					],
					"header": {
						"rows": [{"height": "27px"}],
						"cells": [
							{
								"constraint": {"rowIndex": 0, "colIndex": 0},
								"configurator": function(cell){
									cell.text = "F";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 1},
								"configurator": function(cell){
									cell.text = "No";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 2},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-SCR-SCREGDIV");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 3},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-DB-PRI");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 4},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-GLS-SCH_YEAR");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 5},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-GLS-SMT");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 6},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-SCR-SPCORSDIV");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 7},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-SCR-REGSTATU");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 8},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-GLS-SA");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 9},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-GLS-SP");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 10},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-DB-ST_DT");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 11},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-DB-END_DT");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 12},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-GLS-OG");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 13},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-SCR-SCHREGRSN");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 14},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-DB-CANCEL_DT");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 15},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-SCR-SCHRGNRSN");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 16},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-SCR-SUBPROCYRS");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 17},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-DB-ENROLL_DIV_RCD");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 18},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-DB-SP_DIV_RCD");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 19},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-DB-SP_DIV_RCD");
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
									cell.columnName = "SERIAL_NO";
									cell.style.css({
										"text-align" : "center"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 3},
								"configurator": function(cell){
									cell.columnName = "SCAL_FEE_NM";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 4},
								"configurator": function(cell){
									cell.columnName = "SCAL_AMT";
									cell.control = (function(){
										var output_2 = new cpr.controls.Output("gdOptScalAmt");
										output_2.dataType = "number";
										output_2.format = "s#,###";
										output_2.style.css({
											"text-align" : "right"
										});
										output_2.bind("value").toDataColumn("SCAL_AMT");
										return output_2;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 5},
								"configurator": function(cell){
									cell.columnName = "PMNT_DIV_RCD";
									cell.control = (function(){
										var comboBox_1 = new cpr.controls.ComboBox("gdCbbPmntDivRcd");
										comboBox_1.enabled = false;
										comboBox_1.hideButton = true;
										(function(comboBox_1){
											comboBox_1.setItemSet(app.lookup("dsListPmntDiv"), {
												"label": "CD_NM",
												"value": "CD"
											});
										})(comboBox_1);
										comboBox_1.bind("value").toDataColumn("PMNT_DIV_RCD");
										return comboBox_1;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 6},
								"configurator": function(cell){
									cell.columnName = "PMNT_ITV_RCD";
									cell.control = (function(){
										var comboBox_2 = new cpr.controls.ComboBox("gdCbbPmntItvRcd");
										comboBox_2.enabled = false;
										comboBox_2.hideButton = true;
										(function(comboBox_2){
											comboBox_2.setItemSet(app.lookup("dsListPmntItv"), {
												"label": "CD_NM",
												"value": "CD"
											});
										})(comboBox_2);
										comboBox_2.bind("value").toDataColumn("PMNT_ITV_RCD");
										return comboBox_2;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 7},
								"configurator": function(cell){
									cell.columnName = "PROC_STAT_RCD";
									cell.control = (function(){
										var comboBox_3 = new cpr.controls.ComboBox("gdCbbProcStatRcd");
										comboBox_3.enabled = false;
										comboBox_3.hideButton = true;
										(function(comboBox_3){
											comboBox_3.setItemSet(app.lookup("dsListProcStat"), {
												"label": "CD_NM",
												"value": "CD"
											});
										})(comboBox_3);
										comboBox_3.bind("value").toDataColumn("PROC_STAT_RCD");
										return comboBox_3;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 8},
								"configurator": function(cell){
									cell.columnName = "REQ_DT";
									cell.control = (function(){
										var output_3 = new cpr.controls.Output("gdOptReqDt");
										output_3.dataType = "date";
										output_3.format = "YYYY-MM-DD";
										output_3.style.css({
											"text-align" : "center"
										});
										output_3.bind("value").toDataColumn("REQ_DT");
										return output_3;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 9},
								"configurator": function(cell){
									cell.columnName = "CNFM_DT";
									cell.control = (function(){
										var output_4 = new cpr.controls.Output("gdOptCnfmDt");
										output_4.dataType = "date";
										output_4.format = "YYYY-MM-DD";
										output_4.style.css({
											"text-align" : "center"
										});
										output_4.bind("value").toDataColumn("CNFM_DT");
										return output_4;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 10},
								"configurator": function(cell){
									cell.columnName = "CANCEL_DT";
									cell.control = (function(){
										var output_5 = new cpr.controls.Output("gdOptCancelDt");
										output_5.dataType = "date";
										output_5.format = "YYYY-MM-DD";
										output_5.style.css({
											"text-align" : "center"
										});
										output_5.bind("value").toDataColumn("CANCEL_DT");
										return output_5;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 11},
								"configurator": function(cell){
									cell.columnName = "HOPE_WRK_DEPT_NM";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 12},
								"configurator": function(cell){
									cell.columnName = "WRK_DEPT_NM";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 13},
								"configurator": function(cell){
									cell.columnName = "WRK_CHAG_OPRT";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 14},
								"configurator": function(cell){
									cell.columnName = "WRK_ST_DT";
									cell.control = (function(){
										var output_6 = new cpr.controls.Output("gdOptWrkStDt");
										output_6.dataType = "date";
										output_6.format = "YYYY-MM-DD";
										output_6.style.css({
											"text-align" : "center"
										});
										output_6.bind("value").toDataColumn("WRK_ST_DT");
										return output_6;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 15},
								"configurator": function(cell){
									cell.columnName = "WRK_END_DT";
									cell.control = (function(){
										var output_7 = new cpr.controls.Output("gdOptWrkEndDt");
										output_7.dataType = "date";
										output_7.format = "YYYY-MM-DD";
										output_7.style.css({
											"text-align" : "center"
										});
										output_7.bind("value").toDataColumn("WRK_END_DT");
										return output_7;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 16},
								"configurator": function(cell){
									cell.columnName = "WRK_EVAL_RCD";
									cell.control = (function(){
										var comboBox_4 = new cpr.controls.ComboBox("gdCbbWrkEvalRcd");
										comboBox_4.enabled = false;
										comboBox_4.hideButton = true;
										(function(comboBox_4){
											comboBox_4.setItemSet(app.lookup("dsListWrkEval"), {
												"label": "CD_NM",
												"value": "CD"
											});
										})(comboBox_4);
										comboBox_4.bind("value").toDataColumn("WRK_EVAL_RCD");
										return comboBox_4;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 17},
								"configurator": function(cell){
									cell.columnName = "REMARK";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 18},
								"configurator": function(cell){
									cell.columnName = "REQ_DESC";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 19},
								"configurator": function(cell){
									cell.columnName = "CANCEL_DESC";
								}
							}
						]
					},
					"footer": {
						"rows": [{"height": "25px"}],
						"cells": [
							{
								"constraint": {"rowIndex": 0, "colIndex": 0},
								"configurator": function(cell){
									cell.expr = "\"\"";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 1},
								"configurator": function(cell){
									cell.expr = "\"\"";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 2},
								"configurator": function(cell){
									cell.expr = "\"\"";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 3},
								"configurator": function(cell){
									cell.expr = "\"합계\"";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 4},
								"configurator": function(cell){
									cell.expr = "getSum(\"SCAL_AMT\")";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 5},
								"configurator": function(cell){
									cell.expr = "\"\"";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 6},
								"configurator": function(cell){
									cell.expr = "\"\"";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 7},
								"configurator": function(cell){
									cell.expr = "\"\"";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 8},
								"configurator": function(cell){
									cell.expr = "\"\"";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 9},
								"configurator": function(cell){
									cell.expr = "\"\"";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 10},
								"configurator": function(cell){
									cell.expr = "\"\"";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 11},
								"configurator": function(cell){
									cell.expr = "\"\"";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 12},
								"configurator": function(cell){
									cell.expr = "\"\"";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 13},
								"configurator": function(cell){
									cell.expr = "\"\"";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 14},
								"configurator": function(cell){
									cell.expr = "\"\"";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 15},
								"configurator": function(cell){
									cell.expr = "\"\"";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 16},
								"configurator": function(cell){
									cell.expr = "\"\"";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 17},
								"configurator": function(cell){
									cell.expr = "\"\"";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 18},
								"configurator": function(cell){
									cell.expr = "\"\"";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 19},
								"configurator": function(cell){
									cell.expr = "\"\"";
								}
							}
						]
					}
				});
				if(typeof onGrdScalStudRowDblclick == "function") {
					grid_1.addEventListener("row-dblclick", onGrdScalStudRowDblclick);
				}
				container.addChild(grid_1, {
					"top": "30px",
					"left": "5px",
					"width": "1014px",
					"height": "394px"
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
	app.title = "stdCssCScalStud";
	cpr.core.Platform.INSTANCE.register(app);
})();
