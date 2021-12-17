/*
 * App URI: app/csr/stdCsrSStudExhPgm
 * Source Location: app/csr/stdCsrSStudExhPgm.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("app/csr/stdCsrSStudExhPgm", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			﻿//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
			///<xtmlink path="./stdCsrSStudExhPgm.xtm"/>
			
			var stdCsrSStudExhPgm = function() {
			
				var moPage = new Page();
				//임포트용 데이터 통신 오브젝트
				var moPObject = new PObject();
			
				var msStudId = "";
				var msStudNo = "";
				var msKeyDate = "";
				
				moPage.moExhObj = {
					  headerStud 	: "" //학적사항관리 창의 헤더정보(학생) 
					, studId     	: "" //학적사항관리 창의 조회된 학생아이디값	
					, studNo     	: "" //학적사항관리 창의 조회된 학번값	
					, modCd    	: "" //C:생성 M:는 수정 
					, otCd      	 	: "" //외부부서 코드  
					, exhPgmCd	: "" //교환프로그램 코드
					, stDt      		: "" //시작일자 
					, endDt      	: "" //종료일자  
					, keyDt	     	: "" //학적부 기준일자
				};
				
				/**
				 * @desc  Header Import onLoad
				 * @return void
			     * @author Choi In Seong at 2016. 6. 24
			     */
				moPage.onLoadImportDone_ImpSbpHeader = function() {
					doSbpHeaderOnLoad();
				}
			
				/**
				 * @desc 화면 온로드
				 * @return 
				 * @author Choi In Seong at 2016. 6. 24
				 */
				moPage.onModelConstructDone_stdCsrSStudExhPgm = function() {
					
					//리피트 초기 설정
			//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
			//		ExtRepeat.init("rptCsrExhStud");
			
					// 부모멤버변수에담긴학번받음
					msStudId = moPage.parent.moParentObj.studId;
					msStudNo = moPage.parent.moParentObj.studNo;
					msKeyDate = moPage.parent.moParentObj.keyDate;
			
					//strCommand: onLoad 
					util.Submit.send(app, "subOnLoad", function(pbSuccess) {
						if (pbSuccess) {
							doList(function(pbSuccess) {
								// 조회 : "조회되었습니다." header 메세지 표시
								if(pbSuccess) {
									moPage.parentSendMsg("lblTitleRptCsrExhStud", NLS.INF.M024);
								}
							});
						}
					});
				}
			
				
				/**
				 * @desc 팝업 조회 조건 셋팅
				 * @return 
				 * @author Choi In Seong at 2016. 6. 24
				 */
				function doPoPUpOpenPre(poModCd) {
					moPage.moExhObj.headerStud 	= moPage.parent.moParentObj.headerStud;
					moPage.moExhObj.modCd      	= poModCd;
					moPage.moExhObj.keyDt      		= msKeyDate;
					
					if(poModCd == "C") {
						moPage.moExhObj.studId 			= msStudId;
						moPage.moExhObj.studNo			= msStudNo;
						moPage.moExhObj.otCd 			= "";
						moPage.moExhObj.exhPgmCd 	= "";
						moPage.moExhObj.stDt    			= "";
						moPage.moExhObj.endDt    		= "";
					
					} else if(poModCd == "M") {	//변경버튼 클릭시
						moPage.moExhObj.studId   		= util.Grid.getCellValue(app, "grdCsrExhStud", "STUD_ID");
						moPage.moExhObj.studNo			= msStudNo;
						moPage.moExhObj.otCd 			= util.Grid.getCellValue(app, "grdCsrExhStud", "OT_CD"); 	//외부부서 코드  
						moPage.moExhObj.exhPgmCd 	= util.Grid.getCellValue(app, "grdCsrExhStud", "EXH_PGM_CD"); //교환프로그램 코드
						moPage.moExhObj.stDt    			= util.Grid.getCellValue(app, "grdCsrExhStud", "ST_DT");    //시작일자 
						moPage.moExhObj.endDt    		= util.Grid.getCellValue(app, "grdCsrExhStud", "END_DT");   //종료일자  
					}
				};
			
				/**
				 * @desc 학적변동 정보 조회
				 * @param poCallBackFunc 콜백 함수
				 * @return void
				 * @author Choi In Seong 2016.02.11
				 */
				function doList(poCallBackFunc) {
					
					util.DataMap.setValue(app, "dmReqList", "strStudId", msStudId);
					
					//strCommand: list 
					util.Submit.send(app, "subList", function(pbSuccess) {
							if (pbSuccess) {
								util.Control.redraw(app, "grdCsrExhStud");
								util.Control.redraw(app, "lblRowCnt_rptCsrExhStud");
							}
							if(util.isFunc(poCallBackFunc))	poCallBackFunc(pbSuccess);
						}
					);
				};
			
				/**
				 * @desc 저장버튼 클릭
				 * @return void
				 * @author Choi In Seong 2016. 6. 24
				 */
				moPage.onClick_BtnSave = function() {
					// 리피터 변경사항 체크
					if(!util.Grid.isModified(app, ["grdCsrExhStud"], "MSG")){
						return false;
					}
					
					//리피트 validation check
					if(!util.validate(app, "grdCsrExhStud")) return false;
					
					doSubSave();
				};
				
				/**
				 * @desc   교환학생 저장
				 * @param 
				 * @return 
				 * @author Choi In Seong 2016. 6. 24
				 */
				function doSubSave(poCallbackFunc) {
					//save submission call
					//strCommand: save 
					util.Submit.send(app, "subSave", function(pbSuccessSave) {
							if(pbSuccessSave) {
								//저장성공 메세지 출력
								doList(function(pbSuccessList) {
									// 조회 : "조회되었습니다." header 메세지 표시
									if(pbSuccessList) {
										moPage.parentSendMsg("lblTitleRptCsrExhStud",NLS.INF.M025);
									}
									if(util.isFunc(poCallbackFunc))	poCallbackFunc(pbSuccessList);
								});
							}
						}
					);
				}
			
				/**
				 * @desc 부모 헤더에 메세지 뿌리기
				 * @param psCtrlId 
				 * @param psMsgCode 
				 * @return void
				 * @author Choi In Seong 2016. 6. 24
				 */
				moPage.parentSendMsg = function(psCtrlId, psMsgCodeNm) {
					var vsMsg = ExtControl.getTextValue(psCtrlId);
					vsMsg     = "[" + vsMsg + "]";
				
					util.Msg.notify(app, vsMsg + psMsgCodeNm);	
				};
				
				/**
				 * @desc 리피트 변경여부 반환
				 * @param 
				 * @return boolean 변경여부
				 * @author Choi In Seong 2016. 6. 24
				 */
				function doCheckDataChange() {
					
					if(util.Grid.isModified(app, ["grdCsrExhStud"], "CRM") ){
						return false;
					}else{
						return true;
					}
				};
				
				/**
				 * @desc 팝업이 닫이면서 조회 실행
				 * @param 
				 * @return void
				 * @author Choi In Seong 2016. 6. 24
				 */
				function doPopCallList() {
					var voCallBackSaveAfter = function(pbSuccessAfter) {
						if(pbSuccessAfter) {
							moPage.parentSendMsg("lblTitleRptCsrExhStud",NLS.INF.M025);
						}
					};
					ExtSubPage.getParent().callScript("doSaveAfter", voCallBackSaveAfter);
				};
				
				
				/**
				 * @desc 선택한 신규 팝업호출
				 * @return void
				 * @author Choi In Seong 2016. 6. 24
				 */
				moPage.onClick_BtnNew = function() {
					
					var vnNewCnt = util.DataSet.getRowCount(app, "dsConMenuNewList");
					var vsCdPrp1 = "";
					var vsCdPrp2 = "";
					var vsCd = "";
					//contextMenu 초기화
					ExtModel.removeContextAll();
					//contextMenu 목록 셋팅
					for(var i = 1 ; i <= vnNewCnt ; i++){
						vsCd = util.DataSet.getValue(app, "dsConMenuNewList", "CD", i);
						vsCdPrp1 = util.DataSet.getValue(app, "dsConMenuNewList", "CD_PRP1", i);
						vsCdPrp2 = util.DataSet.getValue(app, "dsConMenuNewList", "CD_PRP2", i);
						ExtModel.addContextMenu(i, vsCdPrp1, "newContextMenu('" + vsCdPrp2 + "','" + vsCd +"')");
					}
					//contextMenu 오픈 위치 셋팅
					var vnLeft = Number(util.Control.getStyleAttr(app, "btnNew", "left"));
					var vnHeight = Number(ValidUtil.excNumHyphen(util.Control.getStyleAttr(app, "btnNew", "height")));
					var vnTop = Number(util.Control.getStyleAttr(app, "btnNew", "top"));
					var vnBottom = vnHeight + vnTop;
					
					doPoPUpOpenPre("C");
					
					ExtModel.popContextMenu(vnLeft, vnBottom);
				};
				
				/**
				 * @desc 신규 팝업 호출 전 변경 체크
				 * @param psSelectId 팝업ID
				 * @param psSelectNm 팝업명
				 * @return void
				 * @author Choi In Seong 2016. 6. 24
				 */
				moPage.newContextMenu = function(psSelectId, psSelectCd) {
					// 리피터 변경사항 체크
					if(!util.Grid.isModified(app, ["grdCsrExhStud"], "CRM")){
						doList(function(pbSuccess) {
							if(pbSuccess) {
								moPage.getSbpPerssion(psSelectId, psSelectCd);
							}
						});
					}
				};
				
				/**
				 * @desc 선택한 팝업호출
				 * @param psSelectId 팝업ID
				 * @param psSelectNm 팝업명
				 * @return void
				 * @author Choi In Seong 2016. 6. 24
				 */
				moPage.getSbpPerssion = function(psSelectId, psSelectCd) {
					
					switch (psSelectCd) {
						case "CT813VIST" : {
							doOpenPopupByExhPgm(psSelectId, 600, 340);
							break;
						}
						
						case "CT813DISP" : {
							doOpenPopupByExhPgm(psSelectId, 600, 365);
							break;
						}
						
					}
					return false; 
					
				};
				
				/**
				 * @desc 선택한 팝업호출
				 * @param psSelectId 팝업ID
				 * @param psWidth 팝업 넓이
				 * @param psHeight 팝업 높이
				 * @return void
				 * @author Choi In Seong 2016. 6. 24
				 */
				function doOpenPopupByExhPgm (psSelectId, psWidth, psHeight){
					ExtPopUp.openLayeredPopup("/xtm/csr/"+ psSelectId +".xtm", psWidth, psHeight);
				};
				
			
				/**
				 * @desc 선택한 팝업호출
				 * @param psSelectId 팝업ID
				 * @param psWidth 팝업 넓이
				 * @param psHeight 팝업 높이
				 * @return void
				 * @author Choi In Seong 2016. 6. 24
				 */
				moPage.onClick_BtnChg = function() {
					
					if(ValueUtil.isNull(util.Grid.getCheckOrSelectedRowIndex(app, "grdCsrExhStud"))){
						util.Msg.alert("NLS-WRN-M008");
						return;
					}
					var vsExhCd = util.Grid.getCellValue(app, "grdCsrExhStud", "EXH_CD");
					var vsPgmId = ExtInstance.getValue("/root/resOnLoad/conMenuNewList/row", "CD_PRP2", "child::CD='"+vsExhCd+"'");
					
					doPoPUpOpenPre("M");
			
					// 리피터 변경사항 체크
					if(!util.Grid.isModified(app, ["grdCsrExhStud"], "CRM")){
						doList(function(pbSuccess) {
							if(pbSuccess) {
								moPage.getSbpPerssion(vsPgmId, vsExhCd);
							}
						});
					}
				};
				
				/**
				 * @desc 학생정보 삭제
				 * @return void
				 * @author Choi In Seong 2016. 6. 24
				 */
				moPage.onClick_BtnDel = function() {
					if(ValueUtil.isNull(util.Grid.getCheckOrSelectedRowIndex(app, "grdCsrExhStud"))){
						moPage.parentSendMsg("lblTitleRptCsrExhStud", NLS.INF.M005);
						return false;
					} else {
						util.Grid.deleteRow(app, "grdCsrExhStud");
					}
				};
				return moPage;
			};;
			// End - User Script
			
			// Header
			var dataSet_1 = new cpr.data.DataSet("dsConMenuNewList");
			dataSet_1.parseData({
				"columns": [
					{"name": "CD_PRP1"},
					{"name": "CD_PRP2"},
					{"name": "CD"}
				],
				"rows": []
			});
			app.register(dataSet_1);
			
			var dataSet_2 = new cpr.data.DataSet("dsCsrExhStud");
			dataSet_2.parseData({
				"info": "CSR_EXH_STUD@STUD_ID,OT_CD,EXH_PGM_CD,ST_DT,END_DT",
				"columns": [
					{"name": "EXH_NM"},
					{"name": "EXH_CD"},
					{"name": "STUD_ID"},
					{"name": "OT_CD"},
					{"name": "OT_NM"},
					{"name": "EXH_PGM_CD"},
					{"name": "EXH_PGM_NM"},
					{"name": "ST_DT"},
					{"name": "END_DT"},
					{"name": "CAT_RCD"},
					{"name": "CAT_NM"},
					{"name": "REF_KEY"}
				],
				"rows": []
			});
			app.register(dataSet_2);
			var dataMap_1 = new cpr.data.DataMap("dmReqList");
			dataMap_1.parseData({
				"columns" : [
					{
						"name": "strStudId",
						"dataType": "string"
					},
					{
						"name": "strLanGbn",
						"dataType": "string"
					}
				]
			});
			app.register(dataMap_1);
			var submission_1 = new cpr.protocols.Submission("subOnLoad");
			submission_1.action = "/csr/StdCsrStudExhPgm/";
			submission_1.mediaType = "application/x-www-form-urlencoded";
			submission_1.addResponseData(dataSet_1, false);
			app.register(submission_1);
			
			var submission_2 = new cpr.protocols.Submission("subList");
			submission_2.action = "/csr/StdCsrStudExhPgm/";
			submission_2.mediaType = "application/x-www-form-urlencoded";
			submission_2.addRequestData(dataMap_1);
			submission_2.addResponseData(dataSet_2, false);
			app.register(submission_2);
			
			var submission_3 = new cpr.protocols.Submission("subSave");
			submission_3.action = "/csr/StdCsrStudExhPgm/";
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
			var group_1 = new cpr.controls.Container("grp_rptCsrExhStud");
			// Layout
			var xYLayout_2 = new cpr.controls.layouts.XYLayout();
			group_1.setLayout(xYLayout_2);
			(function(container){
				var userDefinedControl_1 = linker.userDefinedControl_1 = new udc.com.comTitle();
				userDefinedControl_1.bind("title").toLanguage("");
				container.addChild(userDefinedControl_1, {
					"top": "5px",
					"left": "5px",
					"width": "265px",
					"height": "25px"
				});
				var button_1 = new cpr.controls.Button("btnNew");
				button_1.value = "신규";
				button_1.style.setClasses(["btn-new"]);
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
				button_2.value = "삭제";
				button_2.style.setClasses(["btn-delete"]);
				if(typeof onBtnDelClick == "function") {
					button_2.addEventListener("click", onBtnDelClick);
				}
				container.addChild(button_2, {
					"top": "5px",
					"left": "895px",
					"width": "60px",
					"height": "25px"
				});
				var button_3 = new cpr.controls.Button("btnChg");
				button_3.value = "변경";
				if(typeof onBtnChgClick == "function") {
					button_3.addEventListener("click", onBtnChgClick);
				}
				container.addChild(button_3, {
					"top": "5px",
					"left": "830px",
					"width": "60px",
					"height": "25px"
				});
				var button_4 = new cpr.controls.Button("btnSave");
				button_4.value = "저장";
				button_4.style.setClasses(["btn-save"]);
				if(typeof onBtnSaveClick == "function") {
					button_4.addEventListener("click", onBtnSaveClick);
				}
				container.addChild(button_4, {
					"top": "5px",
					"left": "960px",
					"width": "60px",
					"height": "25px"
				});
				var grid_1 = linker.grid_1 = new cpr.controls.Grid("grdCsrExhStud");
				grid_1.init({
					"dataSet": app.lookup("dsCsrExhStud"),
					"columns": [
						{"width": "25px"},
						{"width": "40px"},
						{"width": "100px"},
						{"width": "180px"},
						{"width": "180px"},
						{"width": "70px"},
						{"width": "70px"},
						{"width": "160px"},
						{
							"width": "90px",
							"visible": false
						},
						{
							"width": "122px",
							"visible": false
						},
						{
							"width": "70px",
							"visible": false
						},
						{
							"width": "78px",
							"visible": false
						},
						{
							"width": "45px",
							"visible": false
						},
						{"width": "45px"}
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
									cell.text = "방문/파견";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 3},
								"configurator": function(cell){
									cell.text = "대상학교";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 4},
								"configurator": function(cell){
									cell.text = "교환프로그램";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 5},
								"configurator": function(cell){
									cell.text = "시작일자";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 6},
								"configurator": function(cell){
									cell.text = "종료일자";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 7},
								"configurator": function(cell){
									cell.text = "교환프로그램범주";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 8},
								"configurator": function(cell){
									cell.text = "오브젝트ID";
									cell.style.setClasses(["require"]);
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 9},
								"configurator": function(cell){
									cell.text = "외부부서코드[외부부서-파견대학코드]";
									cell.style.setClasses(["require"]);
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 10},
								"configurator": function(cell){
									cell.text = "교환프로그램코드";
									cell.style.setClasses(["require"]);
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 11},
								"configurator": function(cell){
									cell.text = "범주코드[CT809]";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 12},
								"configurator": function(cell){
									cell.text = "참조키";
									cell.style.setClasses(["require"]);
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 13},
								"configurator": function(cell){
									cell.text = "방문/파견코드";
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
									cell.columnName = "EXH_NM";
									cell.style.css({
										"text-align" : "center"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 3},
								"configurator": function(cell){
									cell.columnName = "OT_NM";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 4},
								"configurator": function(cell){
									cell.columnName = "EXH_PGM_NM";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 5},
								"configurator": function(cell){
									cell.columnName = "ST_DT";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 6},
								"configurator": function(cell){
									cell.columnName = "END_DT";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 7},
								"configurator": function(cell){
									cell.columnName = "CAT_NM";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 8},
								"configurator": function(cell){
									cell.columnName = "STUD_ID";
									cell.control = (function(){
										var inputBox_1 = new cpr.controls.InputBox("gdIpbStudId");
										inputBox_1.maxLength = 20;
										inputBox_1.userAttr({"require": "Y"});
										inputBox_1.bind("value").toDataColumn("STUD_ID");
										return inputBox_1;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 9},
								"configurator": function(cell){
									cell.columnName = "OT_CD";
									cell.control = (function(){
										var inputBox_2 = new cpr.controls.InputBox("gdIpbOtCd");
										inputBox_2.maxLength = 10;
										inputBox_2.userAttr({"require": "Y"});
										inputBox_2.bind("value").toDataColumn("OT_CD");
										return inputBox_2;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 10},
								"configurator": function(cell){
									cell.columnName = "EXH_PGM_CD";
									cell.control = (function(){
										var inputBox_3 = new cpr.controls.InputBox("gdIpbExhPgmCd");
										inputBox_3.maxLength = 10;
										inputBox_3.userAttr({"require": "Y"});
										inputBox_3.bind("value").toDataColumn("EXH_PGM_CD");
										return inputBox_3;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 11},
								"configurator": function(cell){
									cell.columnName = "CAT_RCD";
									cell.control = (function(){
										var inputBox_4 = new cpr.controls.InputBox("gdOptCatRcd");
										inputBox_4.bind("value").toDataColumn("CAT_RCD");
										return inputBox_4;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 12},
								"configurator": function(cell){
									cell.columnName = "REF_KEY";
									cell.control = (function(){
										var inputBox_5 = new cpr.controls.InputBox("gdIpbRefKey");
										inputBox_5.maxLength = 50;
										inputBox_5.userAttr({"require": "Y"});
										inputBox_5.bind("value").toDataColumn("REF_KEY");
										return inputBox_5;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 13},
								"configurator": function(cell){
									cell.columnName = "EXH_CD";
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
				"top": "465px",
				"left": "75px",
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
	app.title = "stdCsrSStudExhPgm";
	cpr.core.Platform.INSTANCE.register(app);
})();
