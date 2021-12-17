/*
 * App URI: app/cgd/extCgdCNewStudRrBat
 * Source Location: app/cgd/extCgdCNewStudRrBat.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("app/cgd/extCgdCNewStudRrBat", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			﻿//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
			/// <xtmlink path="./extCgdCNewStudRrBat.xtm"/>
			
			/**
			 * 신입생 인정학점 생성
			 * @class extCgdCNewStudRrBat
			 * @author 박갑수 at 2016. 9. 26
			 */
			var extCgdCNewStudRrBat = function() {
				var moPage = new Page();
				
				// 임포트용 데이터 통신 오브젝트
				var moPObject = new Page();
				
				// 교과목검색팝업 호출
				moPObject.moIdsForStdCcsPSubPopup = [
				{
					 controlId					: "btnSbCd",			
					 iEndYn						: "",						
					 iLanDivRcd				: "",					
					 iKeyDate					: "/root/keyDateMap/END_DT",		
					 iSbCd						: "",			
					 iSbNm						: "ipbSbNm",
					 iCmpDivRcd				: "", 			
					 iSpvsDeptCd				: "",		
					 iSpvsDeptNm			: "",		
					 iObjDivRcd				: "",
					 oSbCd						: "/root/reqKey/strSbCd",			
					 oObjDivRcd				: "",			
					 oStDt						: "",			
					 oEndDt						: "",			
					 oLanDivRcd				: "",			
					 oRefKey					: "",			
					 oSbNm					: "ipbSbNm",			
					 oShortNm					: "",			
					 oSbCatRcd				: "",			
					 oSbDivRcd				: "",			
					 oPnt							: "/root/reqKey/strPnt",
					 oTheoTc					: "",
					 oEpacTc					: "",	
					 oSpvsColgCd			: "",			
					 oSpvsDeptCd			: "",			
					 oSpvsDeptNm			: "",		
					 oCmpDivRcd				: "/root/reqKey/strCmpDivRcd",			
					 oRecScaleRcd			: "",		
					 oSbTypeRcd				: "",		
					 oSbLvlRcd				: "",		
					 oEvalMethodRcd		: "",		
					 oLectTypeRcd			: "",	
					 oSbSmry					: "",		
					 oRegFeeXcpYn			: "",	
					 oSbAmt					: "",		
					 oCmpDivRcdNm		: "",		
					 oSbCatRcdNm			: "",	
					 oReTlsnYnRcd			: "",
					 func : function(poParam) {}
				 }];
				
				// 학년도 학기를 원래데이터로 되돌리기위한 변수
				var msSchYearRcd = "";
				var msSmtRcd = "";
				
				/**
				 * @desc import 헤더 초기화
				 * @param 
				 * @return  void
				 * @author 박갑수 at 2016. 9. 26
				 */
				moPage.onLoadImportDone_ImpTitle = function() {
					// import 헤더 초기화
					doHeaderOnLoad();
				};
				
				/**
				 * @desc onLoad 실행
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 9. 26
				 */
				moPage.onModelConstructDone_ExtCgdCNewStudRrBat = function() {
					// 리피트 초기 설정
			//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
			//		ExtRepeat.init(["rptCgdRec"]);
					// 검색조건 초기 설정
			//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
			//		ExtGroup.initSearchBox("grpSearch", ["grpData"]);
					
					// 서브미션 호출
					//strCommand: onLoad 
					util.Submit.send(app, "subOnLoad", function(pbSuccess){
						if(pbSuccess){
							
							util.Control.redraw(app, ["cbbSchYearRcd", "cbbSmtRcd"]);
							var vsSmtRcd = util.Control.getValue(app, "cbbSmtRcd");
							
							// 1학기가 아닐경우 
							if(ValueUtil.fixNull(vsSmtRcd) != "CA00390"){
								util.Control.setValue(app, "cbbSmtRcd", "CA00390");
								// 기준일자 조회
								moPage.onValueChanged_CbbSmtRcd();
							}
							
						}
					}, true);
				};
				
				/**
				 * @desc [cbbSchYearRcd]학년도 onValueChanged 이벤트
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 9. 26
				 */
				moPage.onValueChanged_CbbSchYearRcd = function() {
					// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
					doChangeYearSmt("year");
				};
				
				/**
				 * @desc [cbbSmtRcd]학기 onValueChanged 이벤트
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 9. 26
				 */
				moPage.onValueChanged_CbbSmtRcd = function() {
					// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회	
					doChangeYearSmt("smt");
				};
				
				/**
				 * @desc [ipbSchAss]학제 onValueChanged 이벤트
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 9. 26
				 */
				moPage.onValueChanged_IpbSchAss = function() {
					ValidUtil.checkIntegerDecimal("ipbSchAss", 1, 0, true);
				};
				
				/**
				 * @desc [btnSearch]조회 onClick 이벤트
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 9. 26
				 */
				moPage.onClick_BtnSearch = function() {
					// 조회조건 필수 체크
					if(!util.validate(app, ["cbbSchYearRcd", "cbbSmtRcd", "ipbSchAss"])){
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
				 * @desc 인정학점 생성 학생목록 조회
				 * @param poCallBackFunc 콜백정의
				 * @return void
				 * @author 박갑수 at 2016. 9. 26
				 */
				function doList(poCallBackFunc) {
					
					//strCommand: list 
					util.Submit.send(app, "subList", function(pbSuccess){
						if(pbSuccess){
							util.Control.redraw(app, "grdCgdRec");
							
							// 조회 후 콜백함수 수행
							if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess); 
						}
					});
				};
				
				/**
				 * @desc [ipbAss]학제 onValueChanged 이벤트
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 9. 26
				 */
				moPage.onValueChanged_IpbAss = function() {
					ValidUtil.checkIntegerDecimal("ipbAss", 1, 0, true);
				};
				
				/**
				 * @desc [btnSbCd]교과목명(돋보기버튼) onClick 이벤트
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 9. 26
				 */
				moPage.onClick_BtnSbCd = function(sender) {
					// 교과목검색팝업 호출
					doOnClickStdCcsPSubPopup(sender);
				};
				
				/**
				 * @desc [ipbSbNm]교과목명 onValueChanged 이벤트
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 9. 26
				 */
				moPage.onValueChanged_IpbSbNm = function(sender) {
					// 값변경시 교과목검색팝업 호출
					doOnChangeStdCcsPSubPopup(sender);
				};
				
				/**
				 * @desc [btnAllBat]일괄생성 onClick 이벤트
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 9. 26
				 */
				moPage.onClick_BtnAllBat = function() {
					// 필수체크
					if(!util.validate(app, ["ipbAss", "ipbSbNm"])){
						return false;
					}
					
					// 일괄수강신청 전 체크
					doSaveChk(function(pbSuccess) {
						if (pbSuccess){
							// 일괄수강신청
							doAllBat();
						}
					});
				};
				
				/**
				 * @desc  일괄생성 전 체크
				 * @param {Function} poCallBackFunc 콜백정의
				 * @return void
				 * @author 박갑수 at 2016. 9. 26
				 */
				function doSaveChk(poCallBackFunc) {
					//strCommand: saveChk 
					util.Submit.send(app, "subSaveChk", function(pbSuccess){
						if(pbSuccess){
							
							var vsAss = util.Control.getValue(app, "ipbAss");
							var vsSbNm = util.Control.getValue(app, "ipbSbNm");
							
							var vsSaveChk = util.DataMap.getValue(app, "dmResList", "strChkYn");
							if(ValueUtil.fixNull(vsSaveChk) == "Y"){
								// 기존에 생성 한 인정성적 자료가 존재합니다. 삭제 후
								var vsMsg = NLS.CGD.EXT008;
								// "기존에 생성 한 인정성적 자료가 존재합니다. 삭제 후 [@학제, @]으로 생성 하시겠습니까?" 메시지
								if(!util.Msg.confirm("NLS-CRM-EXT016", [vsMsg, vsAss, vsSbNm]) ){
									// 콜백함수실행
									if (util.isFunc(poCallBackFunc)) poCallBackFunc(false);
									return false;
								}
							}else {
								var vsMsg = "";
								// [@학제, @]으로 생성 하시겠습니까?" 메시지
								if(!util.Msg.confirm("NLS-CRM-EXT016", [vsMsg, vsAss, vsSbNm]) ){
									// 콜백함수실행
									if (util.isFunc(poCallBackFunc)) poCallBackFunc(false);
									return false;
								}
							}
							
							// 콜백함수실행
							if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess); 
						}
					});
				};
				
				/**
				 * @desc 일괄생성
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 9. 26
				 */
				function doAllBat() {
					//strCommand: save 
					util.Submit.send(app, "subSave", function(pbSuccess){
						if(pbSuccess){
							// 조회
							doList(function(pbSuccess) {
								if (pbSuccess){
									// "처리되었습니다." 헤더 메시지
							util.Msg.notify(app, "NLS.INF.M003");
								}
							});
						}else {
							// "처리가 취소되었습니다." 헤더 메시지
							util.Msg.notify(app, "NLS.INF.M013");
						}
					});
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
					{"name": "CD_NM"},
					{"name": "CD_PRP1"}
				],
				"rows": []
			});
			app.register(dataSet_2);
			
			var dataSet_3 = new cpr.data.DataSet("dsCgdRec");
			dataSet_3.parseData({
				"columns": [
					{"name": "SA_NM"},
					{"name": "STUD_NO"},
					{"name": "REP_NM"},
					{"name": "PROC_RSLT_YEAR"},
					{"name": "CLASS_RCD"},
					{"name": "ASS"},
					{"name": "REC_CD"},
					{"name": "GET_PNT"},
					{"name": "SB_NM"}
				],
				"rows": []
			});
			app.register(dataSet_3);
			var dataMap_1 = new cpr.data.DataMap("dmReqKey");
			dataMap_1.parseData({
				"columns" : [
					{
						"name": "strSchAss",
						"dataType": "string"
					},
					{
						"name": "strAss",
						"dataType": "string"
					},
					{
						"name": "strSbCd",
						"dataType": "string"
					},
					{
						"name": "strSbNm",
						"dataType": "string"
					},
					{
						"name": "strPnt",
						"dataType": "string"
					},
					{
						"name": "strCmpDivRcd",
						"dataType": "string"
					}
				]
			});
			app.register(dataMap_1);
			
			var dataMap_2 = new cpr.data.DataMap("dmResList");
			dataMap_2.parseData({
				"columns" : [{
					"name": "strChkYn",
					"dataType": "string"
				}]
			});
			app.register(dataMap_2);
			
			var dataMap_3 = new cpr.data.DataMap("dmKeyDateMap");
			dataMap_3.parseData({
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
			app.register(dataMap_3);
			var submission_1 = new cpr.protocols.Submission("subOnLoad");
			submission_1.action = "/cgd/ExtCgdNewStudRrBat/";
			submission_1.mediaType = "application/x-www-form-urlencoded";
			submission_1.addResponseData(dataSet_1, false);
			submission_1.addResponseData(dataSet_2, false);
			submission_1.addResponseData(dataMap_3, false);
			app.register(submission_1);
			
			var submission_2 = new cpr.protocols.Submission("subList");
			submission_2.action = "/cgd/ExtCgdNewStudRrBat/";
			submission_2.mediaType = "application/x-www-form-urlencoded";
			submission_2.addRequestData(dataMap_1);
			submission_2.addRequestData(dataMap_3);
			submission_2.addResponseData(dataSet_3, false);
			app.register(submission_2);
			
			var submission_3 = new cpr.protocols.Submission("subSaveChk");
			submission_3.action = "/cgd/ExtCgdNewStudRrBat/";
			submission_3.mediaType = "application/x-www-form-urlencoded";
			submission_3.addRequestData(dataMap_1);
			submission_3.addRequestData(dataMap_3);
			submission_3.addResponseData(dataMap_2, false);
			app.register(submission_3);
			
			var submission_4 = new cpr.protocols.Submission("subSave");
			submission_4.action = "/cgd/ExtCgdNewStudRrBat/";
			submission_4.mediaType = "application/x-www-form-urlencoded";
			submission_4.addRequestData(dataMap_1);
			submission_4.addRequestData(dataMap_3);
			submission_4.addRequestData(dataMap_2);
			app.register(submission_4);
			
			var submission_5 = new cpr.protocols.Submission("subDate");
			submission_5.action = "/cmn/StdCmnDateTime/";
			submission_5.mediaType = "application/x-www-form-urlencoded";
			submission_5.addRequestData(dataMap_3);
			submission_5.addResponseData(dataMap_3, false);
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
				output_2.bind("value").toLanguage("NLS-DLG-LBL-L002");
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
				var output_3 = new cpr.controls.Output("optSchAss");
				output_3.value = "";
				output_3.style.setClasses(["require"]);
				output_3.bind("value").toLanguage("UI-SCR-TGTSTUDCNT");
				container.addChild(output_3, {
					"top": "5px",
					"left": "395px",
					"width": "60px",
					"height": "25px"
				});
				var numberEditor_1 = new cpr.controls.NumberEditor("ipbSchAss");
				numberEditor_1.enabled = false;
				numberEditor_1.format = "9";
				numberEditor_1.userAttr({"require": "Y"});
				numberEditor_1.bind("fieldLabel").toExpression("#optSchAss.value");
				numberEditor_1.bind("value").toDataMap(app.lookup("dmReqKey"), "strSchAss");
				if(typeof onIpbSchAssValueChange == "function") {
					numberEditor_1.addEventListener("value-change", onIpbSchAssValueChange);
				}
				container.addChild(numberEditor_1, {
					"top": "5px",
					"left": "460px",
					"width": "30px",
					"height": "25px"
				});
				var button_1 = new cpr.controls.Button("btnSearch");
				button_1.value = "";
				button_1.style.setClasses(["btn-search"]);
				button_1.bind("value").toLanguage("UI-SCR-SCH");
				if(typeof onBtnSearchClick == "function") {
					button_1.addEventListener("click", onBtnSearchClick);
				}
				container.addChild(button_1, {
					"top": "5px",
					"left": "1158px",
					"width": "60px",
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
				var button_2 = new cpr.controls.Button("btnAllBat");
				button_2.value = "";
				button_2.style.setClasses(["btn-commit"]);
				button_2.bind("value").toLanguage("UI-SCR-CCRTLSNREQBAT");
				if(typeof onBtnAllBatClick == "function") {
					button_2.addEventListener("click", onBtnAllBatClick);
				}
				container.addChild(button_2, {
					"top": "5px",
					"left": "1088px",
					"width": "60px",
					"height": "25px"
				});
				var userDefinedControl_2 = linker.userDefinedControl_2 = new udc.com.comTitle();
				userDefinedControl_2.bind("title").toLanguage("UI-SCR-NOLECTSTUD");
				container.addChild(userDefinedControl_2, {
					"top": "5px",
					"left": "5px",
					"width": "310px",
					"height": "25px"
				});
				var grid_1 = linker.grid_1 = new cpr.controls.Grid("grdCgdRec");
				grid_1.init({
					"dataSet": app.lookup("dsCgdRec"),
					"columns": [
						{"width": "40px"},
						{"width": "250px"},
						{"width": "120px"},
						{"width": "150px"},
						{"width": "80px"},
						{"width": "80px"},
						{"width": "80px"},
						{"width": "120px"},
						{"width": "200px"},
						{"width": "83px"}
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
									cell.bind("text").toLanguage("UI-GLS-ASGN");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 2},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-SCR-NAME");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 3},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-SCR-NAME");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 4},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-GLS-SHYR");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 5},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-GLS-CLASSZ");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 6},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-GLS-CLASSZ");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 7},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-SCR-NAME");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 8},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-GLS-ASGN");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 9},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-GLS-CLASSZ");
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
									cell.columnName = "SA_NM";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 2},
								"configurator": function(cell){
									cell.columnName = "STUD_NO";
									cell.style.css({
										"text-align" : "center"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 3},
								"configurator": function(cell){
									cell.columnName = "REP_NM";
									cell.style.css({
										"text-align" : "center"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 4},
								"configurator": function(cell){
									cell.columnName = "PROC_RSLT_YEAR";
									cell.style.css({
										"text-align" : "center"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 5},
								"configurator": function(cell){
									cell.columnName = "CLASS_RCD";
									cell.style.css({
										"text-align" : "center"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 6},
								"configurator": function(cell){
									cell.columnName = "ASS";
									cell.style.css({
										"text-align" : "center"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 7},
								"configurator": function(cell){
									cell.columnName = "REC_CD";
									cell.style.css({
										"text-align" : "center"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 8},
								"configurator": function(cell){
									cell.columnName = "SB_NM";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 9},
								"configurator": function(cell){
									cell.columnName = "GET_PNT";
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
					"width": "1213px",
					"height": "563px"
				});
				var output_4 = new cpr.controls.Output("optAss");
				output_4.value = "";
				output_4.style.setClasses(["require"]);
				output_4.bind("value").toLanguage("UI-SCR-TGTSTUDCNT");
				container.addChild(output_4, {
					"top": "5px",
					"left": "698px",
					"width": "60px",
					"height": "25px"
				});
				var numberEditor_2 = new cpr.controls.NumberEditor("ipbAss");
				numberEditor_2.format = "9";
				numberEditor_2.userAttr({"require": "Y"});
				numberEditor_2.bind("fieldLabel").toExpression("#optAss.value");
				numberEditor_2.bind("value").toDataMap(app.lookup("dmReqKey"), "strAss");
				if(typeof onIpbAssValueChange == "function") {
					numberEditor_2.addEventListener("value-change", onIpbAssValueChange);
				}
				container.addChild(numberEditor_2, {
					"top": "5px",
					"left": "763px",
					"width": "30px",
					"height": "25px"
				});
				var output_5 = new cpr.controls.Output("optSbNm");
				output_5.value = "";
				output_5.style.setClasses(["require"]);
				output_5.bind("value").toLanguage("UI-DB-SB_CD_NM");
				container.addChild(output_5, {
					"top": "5px",
					"left": "803px",
					"width": "90px",
					"height": "25px"
				});
				var inputBox_1 = new cpr.controls.InputBox("ipbSbNm");
				inputBox_1.maxLength = 100;
				inputBox_1.userAttr({"require": "Y"});
				inputBox_1.bind("fieldLabel").toExpression("#optSbNm.value");
				inputBox_1.bind("value").toDataMap(app.lookup("dmReqKey"), "strSbNm");
				if(typeof onIpbSbNmValueChange == "function") {
					inputBox_1.addEventListener("value-change", onIpbSbNmValueChange);
				}
				container.addChild(inputBox_1, {
					"top": "5px",
					"left": "898px",
					"width": "160px",
					"height": "25px"
				});
				var button_3 = new cpr.controls.Button("btnSbCd");
				button_3.value = "";
				button_3.style.setClasses(["btn-pop-search"]);
				if(typeof onBtnSbCdClick == "function") {
					button_3.addEventListener("click", onBtnSbCdClick);
				}
				container.addChild(button_3, {
					"top": "5px",
					"left": "1058px",
					"width": "20px",
					"height": "25px"
				});
			})(group_2);
			container.addChild(group_2, {
				"top": "72px",
				"left": "5px",
				"width": "1225px",
				"height": "598px"
			});
			
			var embeddedApp_1 = new cpr.controls.EmbeddedApp("emaStdCcsPSubPopup");
			cpr.core.App.load("app/ccs/impStdCcsPSubPopup", function(app) {
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
		}
	});
	app.title = "신입생 인정학점 생성";
	cpr.core.Platform.INSTANCE.register(app);
})();
