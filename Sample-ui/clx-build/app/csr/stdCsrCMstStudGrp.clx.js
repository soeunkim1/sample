/*
 * App URI: app/csr/stdCsrCMstStudGrp
 * Source Location: app/csr/stdCsrCMstStudGrp.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("app/csr/stdCsrCMstStudGrp", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			﻿//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
			///<xtmlink path="./stdCsrCMstStudGrp.xtm"/>
			
			var stdCsrCMstStudGrp = function() {
			
				var moPage = new Page();
				//임포트용 데이터 통신 오브젝트
				var moPObject = new PObject();
			
				var msStudId = "";
				
				/**
				 * @desc  Header Import onLoad
				 * @return void
			     * @author Choi In Seong 2016. 6. 21
			     */
				moPage.onLoadImportDone_ImpSbpHeader = function() {
					doSbpHeaderOnLoad();
				}
				
				/**
				 * @desc 화면 온로드
				 * @return 
				 * @author Choi In Seong 2016. 6. 21
				 */
				moPage.onModelConstructDone_stdCsrCMstStudGrp = function() {
				
					//리피트 초기 설정
			//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
			//		ExtRepeat.init("rptCsrStudGrp");
			
					// 검색조건 초기 설정
			//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
			//		ExtGroup.initSearchBox("grpSearch", ["grp_rptCsrStudGrp"]);
					
					//서브미션 실행 (실패시 cover page)
					//strCommand: onLoad 
					util.Submit.send(app, "subOnLoad", function(pbSuccess){
						if(pbSuccess){
							setUnitSystem("CSR");
							
							util.Control.redraw(app, ["dipKeyDate"]);
							util.Control.setEnable(app, ["dipKeyDate"], false);
							var voParentPage = ExtSubPage.getParent();
							
							// 부모멤버변수에담긴학번받음
							msStudId = moPage.parent.moParentObj.studId;
							if (ValueUtil.isNull(msStudId)) {
								return false;
							}else{
								//LIST CALL 
								util.Header.clickSearch(app);
							}
						}
					});
				}
			
				/**
				 * @desc 조회버튼 클릭
				 * @param 
				 * @return void
				 * @author Choi In Seong 2016. 6. 21
				 */
				moPage.onClick_BtnSearch = function() {
					// 조회조건 필수 체크
					if(!util.validate(app, ["dipKeyDate"])){
						return false;
					}
					doList(function(pbSuccess) {
						// 조회 : "조회되었습니다." header 메세지 표시
						if(pbSuccess) {
							moPage.parentSendMsg("lblTitleRptCsrStudGrp", NLS.INF.M024);
						}
					});
				};
				
				/**
				 * @desc 학생그룹조회
				 * @param 
				 * @return void
				 * @author Choi In Seong 2016. 6. 21
				 */
				function doList(poCallBackFunc) {
					
					util.DataMap.setValue(app, "dmReqList", "strStudId", msStudId);
			
					//strCommand: list 
					util.Submit.send(app, "subList", function(pbSuccess){
						if(pbSuccess){
							util.Control.redraw(app, "grdCsrStudGrp");
							util.Control.redraw(app, "lblRowCnt_rptCsrStudGrp");
						}
						// 조회 후 콜백함수 수행
						if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
					});
				}
			
				/**
				 * @desc 기간중복 체크
				 * @param 
				 * @return void
				 * @author Choi In Seong 2016. 6. 21
				 */
				function doDateValidation(poRow){
					var vbValid = true;
					
					var vsGrpPrpRcd = util.Grid.getCellValue(app, "grdCsrStudGrp", "GRP_PRP_RCD");
					var vsStDt = util.Grid.getCellValue(app, "grdCsrStudGrp", "ST_DT");
					var vsEndDt = util.Grid.getCellValue(app, "grdCsrStudGrp", "END_DT");
					
					var vcRpt = ExtControl.getControl("rptCsrStudGrp");
					var vnIndex = vcRpt.getIndex() ;
					 
					var vnRowCnt = util.Grid.getRowCount(app, "grdCsrStudGrp")
					
					for (var i = 1 ; i <= vnRowCnt ; i++) {
						
						if (vnIndex == i) continue;
						if(vsGrpPrpRcd != util.Grid.getCellValue(app, "grdCsrStudGrp", "GRP_PRP_RCD", i)) continue;
						if(util.Grid.getCellValue(app, "grdCsrStudGrp", "UPT_STATUS", i) == "D") continue;
						
						var vsComStDt = util.Grid.getCellValue(app, "grdCsrStudGrp", "ST_DT", i);
						var vsComEndDt = util.Grid.getCellValue(app, "grdCsrStudGrp", "END_DT", i);
						
						//포함할경우
						if (vsStDt <= vsComStDt && vsEndDt >= vsComEndDt) {
							vbValid = false;
							break;
						}
						
						if (vsComStDt <= vsStDt && vsStDt <= vsComEndDt) {
							vbValid = false;
							break;
						}
						
						if (vsComStDt <= vsEndDt && vsEndDt <= vsComEndDt) {
							vbValid = false;
							break;
						}
					}
					
					if(!vbValid) {
						util.Grid.setCellValue(app, "grdCsrStudGrp", "GRP_PRP_RCD", "");
						moPage.parentSendMsg("lblTitleRptCsrStudGrp", NLS.CSR.EXT023);
					}
					return vbValid;
				};
				
				/**
				 * @desc 부모 헤더에 메세지 뿌리기
				 * @param psCtrlId 
				 * @param psMsgCode 
				 * @return void
				 * @author Choi In Seong 2016. 6. 21
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
				 * @author Choi In Seong 2016. 6. 21
				 */
				function doCheckDataChange() {
					if(util.Grid.isModified(app, ["grdCsrStudGrp"], "CRM") ){
						return false;
					}else{
						return true;
					}
				};
			
				/**
				 * @desc 학생그룹 신규
				 * @param 
				 * @return void
				 * @author Choi In Seong 2016. 6. 21
				 */
				moPage.onClick_BtnNew = function() {
					var strKeyDate = util.DataMap.getValue(app, "dmResOnLoad", "strKeyDate");
					//해당 리피트 insertRow 후 편집 시작할 컬럼 지정
					util.Grid.insertRow(app, "grdCsrStudGrp");
					util.Grid.setCellValue(app, "grdCsrStudGrp", "STUD_ID", msStudId);
			
					var vsStDt = "";
					var vsEndDt = "";
					// 학기 시작일, 종료일을 가져온다.
					vsStDt = getKeyDateCond("/strStDt");
					if(!ValueUtil.isNull(vsStDt)){
						vsEndDt = getKeyDateCond("/strEndDt");
					}
				
					if(ValueUtil.isNull(vsStDt)) {
						vsStDt = util.DataMap.getValue(app, "dmReqList", "strKeyDate");
					}
					
					if(ValueUtil.isNull(vsEndDt)) {
						vsEndDt = util.DataMap.getValue(app, "dmReqList", "strEndDate");
					}
					
					util.Grid.setCellValue(app, "grdCsrStudGrp", "ST_DT", vsStDt);
					util.Grid.setCellValue(app, "grdCsrStudGrp", "END_DT", vsEndDt);
			
				};
			
				/**
				 * @desc 학생그룹 삭제
				 * @param 
				 * @return void
				 * @author Choi In Seong 2016. 6. 21
				 */
				moPage.onClick_BtnDel = function() {
					if(ValueUtil.isNull(util.Grid.getCheckOrSelectedRowIndex(app, "grdCsrStudGrp"))){
						moPage.parentSendMsg("lblTitleRptCsrStudGrp", NLS.INF.M005);
						return false;
					} else {
						util.Grid.deleteRow(app, "grdCsrStudGrp");
					}
				};
			
				/**
				 * @desc 학생그룹 작업취소
				 * @param 
				 * @return void
				 * @author Choi In Seong 2016. 6. 21
				 */
				moPage.onClick_BtnRestore = function() {
					util.Grid.restoreRow(app, "grdCsrStudGrp");
				};
			
				/**
				 * @desc 학생그룹 작업저장버튼 클릭
				 * @param 
				 * @return void
				 * @author Choi In Seong 2016. 6. 21
				 */
				moPage.onClick_BtnSave = function() {
					doSubSave();
				};
				
				/**
				 * @desc 학생그룹 저장
				 * @param 
				 * @return void
				 * @author Choi In Seong 2016. 6. 21
				 */
				function doSubSave(poCallbackFunc) {
					
					// 리피터 변경사항 체크
					if(!util.Grid.isModified(app, ["grdCsrStudGrp"], null)){
						moPage.parentSendMsg("lblTitleRptCsrStudGrp",NLS.WRN.M007);
						if(util.isFunc(poCallbackFunc)) poCallbackFunc(false);
						return false;
					}
					//리피트 validation check
					if(!util.validate(app, "grdCsrStudGrp")){
						if(util.isFunc(poCallbackFunc)) poCallbackFunc(false);
						return false;
					}
			
					//strCommand: save 
					util.Submit.send(app, "subSave", function(pbSuccessSave) {
							if(pbSuccessSave) {
								
								//저장성공 메세지 출력
								doList(function(pbSuccessList) {
									// 조회 : "조회되었습니다." header 메세지 표시
									if(pbSuccessList) {
										moPage.parentSendMsg("lblTitleRptCsrStudGrp",NLS.INF.M025);
									}
									if(util.isFunc(poCallbackFunc))	poCallbackFunc(pbSuccessList);
								});
							}
						}
					);
				};
			
				/**
				 * @desc 리피트 panel click event
				 * @param
				 * @return void
				 * @author Choi In Seong 2016. 6. 21
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
				 * @author Choi In Seong 2016. 6. 21
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
				 * @author Choi In Seong 2016. 6. 21
				 */
				function doCheckDataChange() {
					if(util.Grid.isModified(app, ["grdCsrStudGrp"], "CRM") ){
						return false;
					}else{
						return true;
					}
				};
				
				moPage.onClick_BtnYearSmt = function() {
					doOnclickSchYearSmt("dipKeyDate","impSchYearSmt");
				};
				
				/**
				 * @desc 그룹용도코드 변경시 날짜 체크
				 * @param 
				 * @return boolean 변경여부
				 * @author Choi In Seong 2016. 6. 21
				 */	
				moPage.onValueChanged_RdCbbGrpPrpRcd = function() {
					doDateValidation();
				};
				return moPage;
			};;
			// End - User Script
			
			// Header
			var dataSet_1 = new cpr.data.DataSet("dsGrpPrpRcdList");
			dataSet_1.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_1);
			
			var dataSet_2 = new cpr.data.DataSet("dsCsrStudGrp");
			dataSet_2.parseData({
				"info": "CSR_STUD_GRP@GRP_PRP_RCD,STUD_ID,ST_DT,END_DT",
				"columns": [
					{"name": "GRP_PRP_RCD"},
					{"name": "STUD_ID"},
					{"name": "ST_DT"},
					{"name": "END_DT"},
					{"name": "STUD_GRP_CLS"}
				],
				"rows": []
			});
			app.register(dataSet_2);
			var dataMap_1 = new cpr.data.DataMap("dmReqList");
			dataMap_1.parseData({
				"columns" : [
					{
						"name": "strKeyDate",
						"dataType": "string"
					},
					{
						"name": "strStudId",
						"dataType": "string"
					},
					{
						"name": "strEndDate",
						"dataType": "string"
					}
				]
			});
			app.register(dataMap_1);
			var submission_1 = new cpr.protocols.Submission("subOnLoad");
			submission_1.action = "/csr/StdCsrMstStudGrp/";
			submission_1.mediaType = "application/x-www-form-urlencoded";
			submission_1.addResponseData(dataSet_1, false);
			submission_1.addResponseData(dataMap_1, false);
			app.register(submission_1);
			
			var submission_2 = new cpr.protocols.Submission("subList");
			submission_2.action = "/csr/StdCsrMstStudGrp/";
			submission_2.mediaType = "application/x-www-form-urlencoded";
			submission_2.addRequestData(dataMap_1);
			submission_2.addResponseData(dataSet_2, false);
			app.register(submission_2);
			
			var submission_3 = new cpr.protocols.Submission("subSave");
			submission_3.action = "/csr/StdCsrMstStudGrp/";
			submission_3.mediaType = "application/x-www-form-urlencoded";
			submission_3.addRequestData(dataSet_2);
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
					"left": "960px",
					"width": "60px",
					"height": "25px"
				});
				var output_1 = new cpr.controls.Output("optKeyDate");
				output_1.value = "";
				output_1.style.setClasses(["require"]);
				output_1.bind("value").toLanguage("UI-SCR-STDDT");
				container.addChild(output_1, {
					"top": "5px",
					"left": "5px",
					"width": "100px",
					"height": "25px"
				});
				var button_2 = new cpr.controls.Button("btnYearSmt");
				button_2.value = "";
				button_2.style.setClasses(["btn-pop-search"]);
				if(typeof onBtnYearSmtClick == "function") {
					button_2.addEventListener("click", onBtnYearSmtClick);
				}
				container.addChild(button_2, {
					"top": "5px",
					"left": "180px",
					"width": "20px",
					"height": "25px"
				});
				var output_2 = new cpr.controls.Output("dipKeyDate");
				output_2.value = "";
				output_2.dataType = "date";
				output_2.format = "YYYY-MM-DD";
				output_2.style.setClasses(["require"]);
				output_2.bind("value").toDataMap(app.lookup("dmReqList"), "strKeyDate");
				container.addChild(output_2, {
					"top": "5px",
					"left": "110px",
					"width": "70px",
					"height": "25px"
				});
			})(group_1);
			container.addChild(group_1, {
				"top": "0px",
				"left": "0px",
				"width": "1025px",
				"height": "32px"
			});
			
			var group_2 = new cpr.controls.Container("grp_rptCsrStudGrp");
			// Layout
			var xYLayout_3 = new cpr.controls.layouts.XYLayout();
			group_2.setLayout(xYLayout_3);
			(function(container){
				var userDefinedControl_1 = linker.userDefinedControl_1 = new udc.com.comTitle();
				userDefinedControl_1.bind("title").toLanguage("UI-SCR-STUGRPMAN");
				container.addChild(userDefinedControl_1, {
					"top": "5px",
					"left": "5px",
					"width": "265px",
					"height": "25px"
				});
				var button_3 = new cpr.controls.Button("btnNew");
				button_3.value = "";
				button_3.style.setClasses(["btn-new"]);
				button_3.bind("value").toLanguage("UI-SCR-NEW");
				if(typeof onBtnNewClick == "function") {
					button_3.addEventListener("click", onBtnNewClick);
				}
				container.addChild(button_3, {
					"top": "5px",
					"left": "765px",
					"width": "60px",
					"height": "25px"
				});
				var button_4 = new cpr.controls.Button("btnDel");
				button_4.value = "";
				button_4.style.setClasses(["btn-delete"]);
				button_4.bind("value").toLanguage("UI-SCR-DELETE");
				if(typeof onBtnDelClick == "function") {
					button_4.addEventListener("click", onBtnDelClick);
				}
				container.addChild(button_4, {
					"top": "5px",
					"left": "830px",
					"width": "60px",
					"height": "25px"
				});
				var button_5 = new cpr.controls.Button("btnRestore");
				button_5.value = "";
				button_5.style.setClasses(["btn-restore"]);
				button_5.bind("value").toLanguage("UI-SCR-WRKCANCL");
				if(typeof onBtnRestoreClick == "function") {
					button_5.addEventListener("click", onBtnRestoreClick);
				}
				container.addChild(button_5, {
					"top": "5px",
					"left": "895px",
					"width": "60px",
					"height": "25px"
				});
				var button_6 = new cpr.controls.Button("btnSave");
				button_6.value = "";
				button_6.style.setClasses(["btn-save"]);
				button_6.bind("value").toLanguage("UI-SCR-WRKSAVE");
				if(typeof onBtnSaveClick == "function") {
					button_6.addEventListener("click", onBtnSaveClick);
				}
				container.addChild(button_6, {
					"top": "5px",
					"left": "960px",
					"width": "60px",
					"height": "25px"
				});
				var grid_1 = linker.grid_1 = new cpr.controls.Grid("grdCsrStudGrp");
				grid_1.init({
					"dataSet": app.lookup("dsCsrStudGrp"),
					"columns": [
						{"width": "25px"},
						{"width": "25px"},
						{"width": "40px"},
						{"width": "150px"},
						{"width": "70px"},
						{"width": "70px"},
						{"width": "300px"},
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
									cell.bind("text").toLanguage("UI-SCR-GRPUSECD");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 4},
								"configurator": function(cell){
									cell.style.setClasses(["require"]);
									cell.bind("text").toLanguage("UI-DB-ST_DT");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 5},
								"configurator": function(cell){
									cell.style.setClasses(["require"]);
									cell.bind("text").toLanguage("UI-DB-END_DT");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 6},
								"configurator": function(cell){
									cell.style.setClasses(["require"]);
									cell.bind("text").toLanguage("UI-SCR-STUGRPDIS");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 7},
								"configurator": function(cell){
									cell.text = "오브젝트ID";
									cell.style.setClasses(["require"]);
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
										var output_3 = new cpr.controls.Output();
										output_3.style.css({
											"text-align" : "center"
										});
										return output_3;
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
									cell.columnName = "GRP_PRP_RCD";
									cell.control = (function(){
										var comboBox_1 = new cpr.controls.ComboBox("gdCbbGrpPrpRcd");
										comboBox_1.userAttr({"require": "Y"});
										(function(comboBox_1){
											comboBox_1.addItem(new cpr.controls.Item("선택", ""));
											comboBox_1.setItemSet(app.lookup("dsGrpPrpRcdList"), {
												"label": "CD_NM",
												"value": "CD"
											});
										})(comboBox_1);
										comboBox_1.bind("value").toDataColumn("GRP_PRP_RCD");
										return comboBox_1;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 4},
								"configurator": function(cell){
									cell.columnName = "ST_DT";
									cell.control = (function(){
										var output_4 = new cpr.controls.Output("output1");
										output_4.dataType = "date";
										output_4.format = "YYYY-MM-DD";
										output_4.bind("value").toDataColumn("ST_DT");
										return output_4;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 5},
								"configurator": function(cell){
									cell.columnName = "END_DT";
									cell.control = (function(){
										var output_5 = new cpr.controls.Output("output2");
										output_5.dataType = "date";
										output_5.format = "YYYY-MM-DD";
										output_5.bind("value").toDataColumn("END_DT");
										return output_5;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 6},
								"configurator": function(cell){
									cell.columnName = "STUD_GRP_CLS";
									cell.control = (function(){
										var inputBox_1 = new cpr.controls.InputBox("gdIpbStudGrpCls");
										inputBox_1.maxLength = 50;
										inputBox_1.userAttr({"require": "Y"});
										inputBox_1.bind("value").toDataColumn("STUD_GRP_CLS");
										return inputBox_1;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 7},
								"configurator": function(cell){
									cell.columnName = "STUD_ID";
									cell.control = (function(){
										var inputBox_2 = new cpr.controls.InputBox("gdIpbStudId");
										inputBox_2.maxLength = 20;
										inputBox_2.userAttr({"require": "Y"});
										inputBox_2.bind("value").toDataColumn("STUD_ID");
										return inputBox_2;
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
					"height": "391px"
				});
			})(group_2);
			container.addChild(group_2, {
				"top": "37px",
				"left": "0px",
				"width": "1025px",
				"height": "426px"
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
				"top": "465px",
				"left": "80px",
				"width": "96px",
				"height": "25px"
			});
			
			var embeddedApp_2 = new cpr.controls.EmbeddedApp("emaSchYearSmt");
			cpr.core.App.load("app/imp/impDialogSchYearSmt", function(app) {
				if(app){
					embeddedApp_2.app = app;
				}
			});
			container.addChild(embeddedApp_2, {
				"top": "463px",
				"left": "200px",
				"width": "325px",
				"height": "75px"
			});
			if(typeof onBodyLoad == "function"){
				app.addEventListener("load", onBodyLoad);
			}
			// Linking
			linker.userDefinedControl_1.ctrl = linker.grid_1;
		}
	});
	app.title = "stdCsrCMstStudGrp";
	cpr.core.Platform.INSTANCE.register(app);
})();
