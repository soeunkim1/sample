/*
 * App URI: app/ccs/extCcsSLectEvalRsltProf
 * Source Location: app/ccs/extCcsSLectEvalRsltProf.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("app/ccs/extCcsSLectEvalRsltProf", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			﻿//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
			/// <xtmlink path="./extCcsSLectEvalRsltProf.xtm"/>
			
			/**
			 * 강의평가결과조회(교수용)
			 * @class extCcsSLectEvalRsltProf
			 * @author 박갑수 at 2016. 9. 12
			 */
			var extCcsSLectEvalRsltProf = function() {
				var moPage = new Page();
				
				// 임포트용 데이터 통신 오브젝트
				var moPObject = new Page();
				
				// 교직원 검색
				 moPObject.moIdsForStdCmnPPrsnSearch = [
				{
					 controlId					: "btnProfObjNo",
					 istrStaffGrpAuth			: "",					
					 istrWkdtyAuth			: "true",				
					 iKeyDate					: "",	
					 iStaffNo					: "ipbProfNm",			
					 iStaffGrpRcd				: "",		
					 iStaffGrpRcdLock		: "", 			
					 iStaffSubGrpRcd		: "",	
					 iStaffSubGrpRcdLock	: "",				
					 iStatusRcd				: "",				
					 iRepNm					: "",				
					 iObjDivRcd				: "",
					 iObjCd						: "",				
					 iObjNm					: "",	
					 istrObjCdInList			: "",
					 iWkgrdRcd				: "",	
					  
					 oObjNo					: "/root/reqKey/strProfObjNo",
					 oStaffNo					: "",					
					 oRepNm					: "ipbProfNm",					
					 oBirthday					: "",					
					 oStatNm					: "",				
					 oStatRcd					: "",					
					 oOgNm					: "",				
					 oOgCd						: "",				
					 oPosNm					: "",				
					 oPosCd					: "",				
					 oWkgrdNm				: "",			
					 oWkgrdRcd				: "",				
					 oStaffGrpRcd				: "",					
					 oStaffSubGrpRcd		: "",				
					 oHoRcd					: "",					
					 oSsn						: "",					
					 oWkdtyRcd				: "",					
					 oWkdtyNm				: "",				
					 func                         : function(){
						var vsSchYearRcd = util.Control.getValue(app, "cbbSchYearRcd");
						var vsSmtRcd = util.Control.getValue(app, "cbbSmtRcd");
						var vsProfNm = util.Control.getValue(app, "ipbProfNm");
						
						if(!ValueUtil.isNull(vsSchYearRcd) && !ValueUtil.isNull(vsSmtRcd ) && !ValueUtil.isNull(vsProfNm)){
							util.Header.clickSearch(app);
						}
					}
				}];
				
				// 학년도 학기를 원래데이터로 되돌리기위한 변수
				var msSchYearRcd = "";
				var msSmtRcd = "";
				
				/**
				 * @desc import 헤더 초기화
				 * @param 
				 * @return  void
				 * @author 박갑수 at 2016. 9. 12
				 */
				moPage.onLoadImportDone_ImpTitle = function() {
					// import 헤더 초기화
					doHeaderOnLoad();
				};
				
				/**
				 * @desc onLoad 실행
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 9. 12
				 */
				moPage.onModelConstructDone_ExtCcsSLectEvalRsltProf = function() {
					// 리피트 초기 설정
			//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
			//		ExtRepeat.init(["rptCcsOpenSub", "rptCcsLectEvalRslt1", "rptCcsLectEvalRslt2", "rptCcsLectEvalRslt3"]);
					// 검색조건 초기 설정
			//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
			//		ExtGroup.initSearchBox("grpSearch", ["grpData", "grpDataDtl"]);
							
					// 서브미션 호출
					//strCommand: onLoad 
					util.Submit.send(app, "subOnLoad", function(pbSuccess){
						if(pbSuccess){
							
							util.Control.redraw(app, ["cbbSchYearRcd", "cbbSmtRcd"]);
							
							util.Control.setFocus(app, "ipbProfNm");
							
							// 권한에 따른 조회조건 default값 세팅 
							doVisibleCtlByAuth();
							
							// 학년도 학기값 되돌리기위한 값
							msSchYearRcd = util.DataMap.getValue(app, "dmKeyDateMap", "YEAR");
							msSmtRcd = util.DataMap.getValue(app, "dmKeyDateMap", "SMT");
						}
					}, true);
				};
				
				/**
				 * 권한에 따른 조회조건 default값 세팅 
				 * @param 
				 * @type void
				 * @author 박갑수 at 2016. 9. 12
				 */	
				function doVisibleCtlByAuth() {
					
					// 개인권한[CC00104] : 
					if (moPageInfo.authRngRcd == "CC00104") {
						util.Control.setVisible(app, false, ["btnProfObjNo"]);
						util.Control.setEnable(app, false, ["ipbProfNm"]);
						//, "cbbSchYearRcd", "cbbSmtRcd"
						
						util.Control.setValue(app, "ipbProfNm", moUserInfo.userNm);
						util.DataMap.setValue(app, "dmReqKey", "strProfObjNo", moUserInfo.id);
						
						util.Header.clickSearch(app);
					}
				};
				
				/**
				 * @desc [cbbSchYearRcd]학년도 onValueChanged 이벤트
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 9. 12
				 */
				moPage.onValueChanged_CbbSchYearRcd = function() {
					// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
					doChangeYearSmt("year");
				};
				
				/**
				 * @desc [cbbSmtRcd]학기 onValueChanged 이벤트
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 9. 12
				 */
				moPage.onValueChanged_CbbSmtRcd = function() {
					// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
					doChangeYearSmt("smt");
				};
				
				/**
				 * @desc 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 9. 12
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
				
				/**
				 * @desc [btnProfObjNo]교수명(돋보기버튼) onClick 이벤트
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 9. 12
				 */
				moPage.onClick_BtnProfObjNo = function(sender) {
					// 교직원검색팝업 호출
					doOnClickStdCmnPPrsnSearch(sender);
				};
				
				/**
				 * @desc [ipbProfNm]교수명 onValueChanged 이벤트
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 9. 12
				 */
				moPage.onValueChanged_IpbProfNm = function(sender) {
					// 값변경시 교직원검색팝업 호출
					doOnChangeStdCmnPPrsnSearch(sender);
				};
				
				/**
				 * @desc [btnSearch]조회 onClick 이벤트
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 9. 12
				 */
				moPage.onClick_BtnSearch = function() {
			
					// 조회조건 필수 체크
					if(!util.validate(app, ["cbbSchYearRcd", "cbbSmtRcd", "ipbProfNm"])){
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
				 * @desc 강좌 목록 조회
				 * @param poCallBackFunc 콜백정의
				 * @return void
				 * @author 박갑수 at 2016. 9. 12
				 */
				function doList(poCallBackFunc) {
					
					//strCommand: list 
					util.Submit.send(app, "subList", function(pbSuccess){
						if(pbSuccess){
							util.Control.redraw(app, "grdCcsOpenSub");
						
							// 마스터에 데이터가 없을 경우 디테일 입력 불가
							if(util.Grid.getRowCount(app, "grdCcsOpenSub") < 1){
								util.Control.setEnable(app, false,["grpDataDtl"]);
								util.Control.reset(app, "rptCcsLectEvalRslt1");
								util.Control.reset(app, "rptCcsLectEvalRslt2");
								util.Control.reset(app, "rptCcsLectEvalRslt3");
								
								util.Control.setValue(app, "optAvgSum1", "");
								util.Control.setValue(app, "optAvgSum2", "");
							}else {
								util.Control.setEnable(app, true,["grpDataDtl"]);
							}
						}
						
						// 조회 후 콜백함수 수행
						if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
					});
				};
				
				/**
				 * @desc [rptCcsOpenSub]강좌목록 onRowSelect 이벤트
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 9. 12
				 */
				moPage.onRowSelect_RptCcsOpenSub = function() {
					// 세부내역 조회
					doListDtl();
				};
				
				/**
				 * @desc 상세 목록 조회
				 * @param poCallBackFunc 콜백정의
				 * @return void
				 * @author 박갑수 at 2016. 9. 12
				 */
				function doListDtl(poCallBackFunc) {
					
					var vsRefKey = util.Grid.getCellValue(app, "grdCcsOpenSub", "REF_KEY");
					
					// 참조키
					util.DataMap.setValue(app, "dmReqKey", "strRefKey", vsRefKey);
					
					if(ValueUtil.isNull(vsRefKey)){
						// 합계컬럼일경우 디테일 초기화
						util.Control.setEnable(app, false,["grpDataDtl"]);
						util.Control.reset(app, "rptCcsLectEvalRslt1");
						util.Control.reset(app, "rptCcsLectEvalRslt2");
						util.Control.reset(app, "rptCcsLectEvalRslt3");
						
						util.Control.setValue(app, "optAvgSum1", "");
						util.Control.setValue(app, "optAvgSum2", "");
					}else {
						util.Control.setEnable(app, true,["grpDataDtl"]);
						
						//strCommand: listDtl 
						util.Submit.send(app, "subListDtl", function(pbSuccess){
							if(pbSuccess){
								util.Control.redraw(app, "grdCcsLectEvalRslt1");
								util.Control.redraw(app, "grdCcsLectEvalRslt2");
								util.Control.redraw(app, "grdCcsLectEvalRslt3");
							}
							
							// 조회 후 콜백함수 수행
							if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
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
			
			var dataSet_3 = new cpr.data.DataSet("dsCcsOpenSub");
			dataSet_3.parseData({
				"columns": [
					{"name": "SA_CD_NM"},
					{"name": "SB_CD_NM"},
					{"name": "PNT"},
					{"name": "SB_LVL_RCD_NM"},
					{"name": "CMP_DIV_RCD_NM"},
					{"name": "DIVCLS_NM"},
					{"name": "TLSN_REQ_COUNT"},
					{"name": "EVAL_NOP"},
					{"name": "EVAL_AVG"},
					{"name": "ATD_RATE"},
					{"name": "REF_KEY"}
				],
				"rows": []
			});
			app.register(dataSet_3);
			
			var dataSet_4 = new cpr.data.DataSet("dsCcsLectEvalRslt3");
			dataSet_4.parseData({
				"columns": [{"name": "SJV_ANS"}],
				"rows": []
			});
			app.register(dataSet_4);
			
			var dataSet_5 = new cpr.data.DataSet("dsCcsLectEvalRslt1");
			dataSet_5.parseData({
				"columns": [
					{"name": "QUEST_CONT"},
					{"name": "A_CNT"},
					{"name": "B_CNT"},
					{"name": "C_CNT"},
					{"name": "D_CNT"},
					{"name": "E_CNT"},
					{"name": "AVG_SCR"}
				],
				"rows": []
			});
			app.register(dataSet_5);
			
			var dataSet_6 = new cpr.data.DataSet("dsCcsLectEvalRslt2");
			dataSet_6.parseData({
				"columns": [
					{"name": "QUEST_CONT"},
					{"name": "A_CNT"},
					{"name": "B_CNT"},
					{"name": "C_CNT"},
					{"name": "D_CNT"},
					{"name": "E_CNT"},
					{"name": "AVG_SCR"}
				],
				"rows": []
			});
			app.register(dataSet_6);
			var dataMap_1 = new cpr.data.DataMap("dmReqKey");
			dataMap_1.parseData({
				"columns" : [
					{
						"name": "strProfNm",
						"dataType": "string"
					},
					{
						"name": "strProfObjNo",
						"dataType": "string"
					},
					{
						"name": "strRefKey",
						"dataType": "string"
					},
					{
						"name": "strAvgSum1",
						"dataType": "string"
					},
					{
						"name": "strAvgSum2",
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
			submission_1.action = "/ccs/ExtCcsLectEvalRsltProf/";
			submission_1.mediaType = "application/x-www-form-urlencoded";
			submission_1.addResponseData(dataSet_1, false);
			submission_1.addResponseData(dataSet_2, false);
			submission_1.addResponseData(dataMap_2, false);
			app.register(submission_1);
			
			var submission_2 = new cpr.protocols.Submission("subDate");
			submission_2.action = "/cmn/StdCmnDateTime/";
			submission_2.mediaType = "application/x-www-form-urlencoded";
			submission_2.addRequestData(dataMap_2);
			submission_2.addResponseData(dataMap_2, false);
			app.register(submission_2);
			
			var submission_3 = new cpr.protocols.Submission("subList");
			submission_3.action = "/ccs/ExtCcsLectEvalRsltProf/";
			submission_3.mediaType = "application/x-www-form-urlencoded";
			submission_3.addRequestData(dataMap_1);
			submission_3.addRequestData(dataMap_2);
			submission_3.addResponseData(dataSet_3, false);
			app.register(submission_3);
			
			var submission_4 = new cpr.protocols.Submission("subListDtl");
			submission_4.action = "/ccs/ExtCcsLectEvalRsltProf/";
			submission_4.mediaType = "application/x-www-form-urlencoded";
			submission_4.addRequestData(dataMap_1);
			submission_4.addRequestData(dataMap_2);
			submission_4.addResponseData(dataSet_5, false);
			submission_4.addResponseData(dataSet_6, false);
			submission_4.addResponseData(dataSet_4, false);
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
				var output_1 = new cpr.controls.Output("optSchYearRcd");
				output_1.value = "";
				output_1.style.setClasses(["require"]);
				output_1.bind("value").toLanguage("UI-GLS-SCH_YEAR");
				container.addChild(output_1, {
					"top": "5px",
					"left": "5px",
					"width": "80px",
					"height": "25px"
				});
				var comboBox_1 = new cpr.controls.ComboBox("cbbSchYearRcd");
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
					"left": "90px",
					"width": "100px",
					"height": "25px"
				});
				var output_2 = new cpr.controls.Output("optSmtRcd");
				output_2.value = "";
				output_2.style.setClasses(["require"]);
				output_2.bind("value").toLanguage("UI-GLS-SMT");
				container.addChild(output_2, {
					"top": "5px",
					"left": "200px",
					"width": "80px",
					"height": "25px"
				});
				var comboBox_2 = new cpr.controls.ComboBox("cbbSmtRcd");
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
					"left": "285px",
					"width": "100px",
					"height": "25px"
				});
				var output_3 = new cpr.controls.Output("optProfNm");
				output_3.value = "";
				output_3.style.setClasses(["require"]);
				output_3.bind("value").toLanguage("UI-DB-PROF_NM");
				container.addChild(output_3, {
					"top": "5px",
					"left": "395px",
					"width": "90px",
					"height": "25px"
				});
				var inputBox_1 = new cpr.controls.InputBox("ipbProfNm");
				inputBox_1.userAttr({"require": "Y"});
				inputBox_1.bind("fieldLabel").toExpression("#optProfNm.value");
				inputBox_1.bind("value").toDataMap(app.lookup("dmReqKey"), "strProfNm");
				if(typeof onIpbProfNmValueChange == "function") {
					inputBox_1.addEventListener("value-change", onIpbProfNmValueChange);
				}
				container.addChild(inputBox_1, {
					"top": "5px",
					"left": "490px",
					"width": "100px",
					"height": "25px"
				});
				var button_2 = new cpr.controls.Button("btnProfObjNo");
				button_2.value = "";
				button_2.style.setClasses(["btn-pop-search"]);
				if(typeof onBtnProfObjNoClick == "function") {
					button_2.addEventListener("click", onBtnProfObjNoClick);
				}
				container.addChild(button_2, {
					"top": "5px",
					"left": "590px",
					"width": "20px",
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
				userDefinedControl_2.bind("title").toLanguage("UI-SCR-SKPLCLIST");
				container.addChild(userDefinedControl_2, {
					"top": "5px",
					"left": "5px",
					"width": "215px",
					"height": "25px"
				});
				var grid_1 = linker.grid_1 = new cpr.controls.Grid("grdCcsOpenSub");
				grid_1.init({
					"dataSet": app.lookup("dsCcsOpenSub"),
					"columns": [
						{"width": "40px"},
						{"width": "100px"},
						{"width": "110px"},
						{"width": "35px"},
						{"width": "45px"},
						{"width": "60px"},
						{"width": "35px"},
						{"width": "55px"},
						{"width": "55px"},
						{"width": "55px"},
						{"width": "55px"},
						{
							"width": "90px",
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
									cell.bind("text").toLanguage("UI-DB-SA_NM");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 2},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-DB-SB_CD_NM");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 3},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-DB-DIVCLS_NM");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 4},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-DB-DIVCLS_NM");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 5},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-DB-DIVCLS_NM");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 6},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-DB-DIVCLS_NM");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 7},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-DB-DIVCLS_NM");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 8},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-DB-DIVCLS_NM");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 9},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-DB-DIVCLS_NM");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 10},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-DB-DIVCLS_NM");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 11},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-DB-DIVCLS_NM");
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
									cell.columnName = "SA_CD_NM";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 2},
								"configurator": function(cell){
									cell.columnName = "SB_CD_NM";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 3},
								"configurator": function(cell){
									cell.columnName = "DIVCLS_NM";
									cell.style.css({
										"text-align" : "center"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 4},
								"configurator": function(cell){
									cell.columnName = "SB_LVL_RCD_NM";
									cell.style.css({
										"text-align" : "center"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 5},
								"configurator": function(cell){
									cell.columnName = "CMP_DIV_RCD_NM";
									cell.style.css({
										"text-align" : "center"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 6},
								"configurator": function(cell){
									cell.columnName = "PNT";
									cell.style.css({
										"text-align" : "right"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 7},
								"configurator": function(cell){
									cell.columnName = "TLSN_REQ_COUNT";
									cell.style.css({
										"text-align" : "right"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 8},
								"configurator": function(cell){
									cell.columnName = "EVAL_NOP";
									cell.style.css({
										"text-align" : "right"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 9},
								"configurator": function(cell){
									cell.columnName = "ATD_RATE";
									cell.style.css({
										"text-align" : "right"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 10},
								"configurator": function(cell){
									cell.columnName = "EVAL_AVG";
									cell.style.css({
										"text-align" : "right"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 11},
								"configurator": function(cell){
									cell.columnName = "REF_KEY";
								}
							}
						]
					}
				});
				if(typeof onGrdCcsOpenSubSelectionChange == "function") {
					grid_1.addEventListener("selection-change", onGrdCcsOpenSubSelectionChange);
				}
				container.addChild(grid_1, {
					"top": "30px",
					"left": "5px",
					"width": "653px",
					"height": "563px"
				});
			})(group_2);
			container.addChild(group_2, {
				"top": "72px",
				"left": "5px",
				"width": "665px",
				"height": "598px"
			});
			
			var group_3 = new cpr.controls.Container("grpDataDtl");
			// Layout
			var xYLayout_4 = new cpr.controls.layouts.XYLayout();
			group_3.setLayout(xYLayout_4);
			(function(container){
				var userDefinedControl_3 = linker.userDefinedControl_3 = new udc.com.comTitle();
				userDefinedControl_3.bind("title").toLanguage("UI-SCR-SKPLCLIST");
				container.addChild(userDefinedControl_3, {
					"top": "5px",
					"left": "5px",
					"width": "315px",
					"height": "25px"
				});
				var grid_2 = linker.grid_2 = new cpr.controls.Grid("grdCcsLectEvalRslt1");
				grid_2.init({
					"dataSet": app.lookup("dsCcsLectEvalRslt1"),
					"columns": [
						{"width": "300px"},
						{"width": "35px"},
						{"width": "35px"},
						{"width": "35px"},
						{"width": "35px"},
						{"width": "35px"},
						{"width": "55px"}
					],
					"header": {
						"rows": [{"height": "27px"}],
						"cells": [
							{
								"constraint": {"rowIndex": 0, "colIndex": 0},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-DB-SA_NM");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 1},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-DB-DIVCLS_NM");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 2},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-DB-DIVCLS_NM");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 3},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-DB-DIVCLS_NM");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 4},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-DB-DIVCLS_NM");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 5},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-DB-DIVCLS_NM");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 6},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-DB-DIVCLS_NM");
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
									cell.columnName = "QUEST_CONT";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 1},
								"configurator": function(cell){
									cell.columnName = "A_CNT";
									cell.style.css({
										"text-align" : "right"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 2},
								"configurator": function(cell){
									cell.columnName = "B_CNT";
									cell.style.css({
										"text-align" : "right"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 3},
								"configurator": function(cell){
									cell.columnName = "C_CNT";
									cell.style.css({
										"text-align" : "right"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 4},
								"configurator": function(cell){
									cell.columnName = "D_CNT";
									cell.style.css({
										"text-align" : "right"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 5},
								"configurator": function(cell){
									cell.columnName = "E_CNT";
									cell.style.css({
										"text-align" : "right"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 6},
								"configurator": function(cell){
									cell.columnName = "AVG_SCR";
									cell.style.css({
										"text-align" : "right"
									});
								}
							}
						]
					}
				});
				container.addChild(grid_2, {
					"top": "30px",
					"left": "5px",
					"width": "543px",
					"height": "190px"
				});
				var userDefinedControl_4 = linker.userDefinedControl_4 = new udc.com.comTitle();
				userDefinedControl_4.bind("title").toLanguage("UI-SCR-SKPLCLIST");
				container.addChild(userDefinedControl_4, {
					"top": "225px",
					"left": "5px",
					"width": "315px",
					"height": "25px"
				});
				var userDefinedControl_5 = linker.userDefinedControl_5 = new udc.com.comTitle();
				userDefinedControl_5.bind("title").toLanguage("UI-SCR-SKPLCLIST");
				container.addChild(userDefinedControl_5, {
					"top": "345px",
					"left": "5px",
					"width": "315px",
					"height": "25px"
				});
				var grid_3 = linker.grid_3 = new cpr.controls.Grid("grdCcsLectEvalRslt3");
				grid_3.init({
					"dataSet": app.lookup("dsCcsLectEvalRslt3"),
					"columns": [
						{"width": "40px"},
						{"width": "485px"}
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
									cell.bind("text").toLanguage("UI-DB-SA_NM");
								}
							}
						]
					},
					"detail": {
						"rows": [{"height": "47px"}],
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
									cell.columnName = "SJV_ANS";
									cell.control = (function(){
										var textArea_1 = new cpr.controls.TextArea("txtFrfActCont");
										textArea_1.readOnly = true;
										textArea_1.maxLength = 1000;
										textArea_1.bind("value").toDataColumn("SJV_ANS");
										return textArea_1;
									})();
								}
							}
						]
					}
				});
				container.addChild(grid_3, {
					"top": "370px",
					"left": "5px",
					"width": "543px",
					"height": "223px"
				});
				var grid_4 = linker.grid_4 = new cpr.controls.Grid("grdCcsLectEvalRslt2");
				grid_4.init({
					"dataSet": app.lookup("dsCcsLectEvalRslt2"),
					"columns": [
						{"width": "300px"},
						{"width": "35px"},
						{"width": "35px"},
						{"width": "35px"},
						{"width": "35px"},
						{"width": "35px"},
						{"width": "55px"}
					],
					"header": {
						"rows": [{"height": "27px"}],
						"cells": [
							{
								"constraint": {"rowIndex": 0, "colIndex": 0},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-DB-SA_NM");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 1},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-DB-DIVCLS_NM");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 2},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-DB-DIVCLS_NM");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 3},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-DB-DIVCLS_NM");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 4},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-DB-DIVCLS_NM");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 5},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-DB-DIVCLS_NM");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 6},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-DB-DIVCLS_NM");
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
									cell.columnName = "QUEST_CONT";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 1},
								"configurator": function(cell){
									cell.columnName = "A_CNT";
									cell.style.css({
										"text-align" : "right"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 2},
								"configurator": function(cell){
									cell.columnName = "B_CNT";
									cell.style.css({
										"text-align" : "right"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 3},
								"configurator": function(cell){
									cell.columnName = "C_CNT";
									cell.style.css({
										"text-align" : "right"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 4},
								"configurator": function(cell){
									cell.columnName = "D_CNT";
									cell.style.css({
										"text-align" : "right"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 5},
								"configurator": function(cell){
									cell.columnName = "E_CNT";
									cell.style.css({
										"text-align" : "right"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 6},
								"configurator": function(cell){
									cell.columnName = "AVG_SCR";
									cell.style.css({
										"text-align" : "right"
									});
								}
							}
						]
					}
				});
				container.addChild(grid_4, {
					"top": "250px",
					"left": "5px",
					"width": "543px",
					"height": "90px"
				});
				var output_4 = new cpr.controls.Output("optAvgSum1");
				output_4.value = "";
				output_4.bind("value").toLanguage("UI-GLS-SCH_YEAR");
				container.addChild(output_4, {
					"top": "5px",
					"left": "373px",
					"width": "60px",
					"height": "25px"
				});
				var output_5 = new cpr.controls.Output("optAvgSum1");
				output_5.value = "";
				output_5.dataType = "number";
				output_5.format = "###.00";
				output_5.style.css({
					"text-align" : "right"
				});
				output_5.bind("value").toDataMap(app.lookup("dmReqKey"), "strAvgSum1");
				container.addChild(output_5, {
					"top": "5px",
					"left": "438px",
					"width": "40px",
					"height": "25px"
				});
				var output_6 = new cpr.controls.Output("optAvgSum2");
				output_6.value = "";
				output_6.dataType = "number";
				output_6.format = "###.00";
				output_6.style.css({
					"text-align" : "right"
				});
				output_6.bind("value").toDataMap(app.lookup("dmReqKey"), "strAvgSum2");
				container.addChild(output_6, {
					"top": "225px",
					"left": "438px",
					"width": "40px",
					"height": "25px"
				});
				var output_7 = new cpr.controls.Output("optAvgSum2");
				output_7.value = "";
				output_7.bind("value").toLanguage("UI-GLS-SCH_YEAR");
				container.addChild(output_7, {
					"top": "225px",
					"left": "373px",
					"width": "60px",
					"height": "25px"
				});
			})(group_3);
			container.addChild(group_3, {
				"top": "72px",
				"left": "675px",
				"width": "555px",
				"height": "598px"
			});
			
			var embeddedApp_1 = new cpr.controls.EmbeddedApp("emaStdCmnPPrsnSearch");
			cpr.core.App.load("app/cmn/impStdCmnPPrsnSearch", function(app) {
				if(app){
					embeddedApp_1.app = app;
				}
			});
			container.addChild(embeddedApp_1, {
				"top": "675px",
				"left": "5px",
				"width": "100px",
				"height": "25px"
			});
			if(typeof onBodyLoad == "function"){
				app.addEventListener("load", onBodyLoad);
			}
			// Linking
			linker.userDefinedControl_2.ctrl = linker.grid_1;
			linker.userDefinedControl_3.ctrl = linker.grid_2;
			linker.userDefinedControl_4.ctrl = linker.grid_4;
			linker.userDefinedControl_5.ctrl = linker.grid_3;
		}
	});
	app.title = "강의평가결과조회(교수용)";
	cpr.core.Platform.INSTANCE.register(app);
})();
