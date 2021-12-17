/*
 * App URI: app/crs/extCrsSStudRegFeeList
 * Source Location: app/crs/extCrsSStudRegFeeList.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("app/crs/extCrsSStudRegFeeList", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			﻿//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
			/// <xtmlink path="./extCrsSStudRegFeeList.xtm"/>
			
			
			var extCrsSStudRegFeeList = function() {
				var moPage = new Page();
				//임포트용 데이터 통신 오브젝트
				var moPObject = new PObject();
				
				/**
				 * 학생검색팝업 관련 설정사항
				 * 설정가능 유형 : 
				 *   1. 인스턴스((/root/시작))
				 *   2. 그리드의 셀 (ghc시작)
				 *   3. 컨트롤 id
				 * 각 변수별 설명
				 *  iXXX : 팝업으로 input 전달될 파라미터
				 *  oXXX : 팝업에서 선택한 값을 받을 컬럼 아이디
				 *  1. controlId 		: 최초 이벤트의 버튼이나 그리드 id	(필수)
				 *  2. iStudNo 			: 검색조건 학번						(선택) (값이 존재할 경우 4자리 이상)
				 *  3. iStudId 			: 검색조건 학번오브젝트				(선택)
				 *  4. iStudNm 			: 이름        						(선택) (값이 존재할 경우 2자리 이상)
				 *  5. iKeyDate 		: 기준일 							(필수)
				 *  6. iObjDivRcd 		: 객체구분코드 						(선택)
				 *  7. iObjCd 			: 부서코드							(선택)
				 *  8. iObjNm 			: 부서명							(선택) 
				 *  9. iAuthYN			: 권한미적용여부 (미적용시: "Y")	(선택) 
				 *  10. iStatRcd		: 학적상태							(선택) 
				 *  11. iStudDivRcd		: 학생구분							(선택) 
				 *  12. oStudId			: 학번오브젝트
				 *  13. oStudNo 		: 학번
				 *  14. oStudNm 		: 이름
				 *  15. oStatNm 		: 학적상태명
				 *  16. oStatRcd 		: 학적상태코드
				 *  17. oProcRslt 		: 진급학기
				 *  18. oProcRsltYear 	: 진급학년
				 *  19. oSaCd 			: 학사부서코드명
				 *  20. oSaNm 			: 학사부서명
				 *  21. oSpCd 			: 이수과정코드명
				 *  22. oSpNm 			: 이수과정명
				 *  23. oOgCd 			: 행정부서코드명
				 *  24. oOgNm 			: 행정부서명
				 *  25. oStudDivRcd		: 학생구분코드
				 *  26. oStudDivNm		: 학생구분명
				 *  27. oBirthday		: 생년월일
				 *  28. oGenderRcd		: 성별코드
				 *  29. oGenderNm		: 성별명
				 *  30. func 			: 팝업에서 선택한 값을 받은 후 추가 로직이 필요한 경우 함수 작성
				 */
				moPObject.moIdsForStdCsrPStSearch = [
				{
					controlId 		: "btnPopSearch",
					iStudNo 		: "ipbSchStudId",	
					iStudId 		: "",
					iStudNm 		: "",
					iKeyDate 		: "", 
					iObjDivRcd 		: "",
					iObjCd 			: "",
					iObjNm 			: "",
					iAuthYN 		: "",
					iStatRcd 		: "",
					iStudDivRcd		: "",
					oStudId 		: "ipbSchStudIdObj",
					oStudNo 		: "ipbSchStudId",
					oStudNm 		: "",
					oStatNm 		: "",
					oStatRcd 		: "",
					oProcRslt 		: "",
					oProcRsltYear 	: "",
					oSaNm			: "",
					oSaCd 			: "",
					oSpNm 			: "",
					oSpCd 			: "",
					oOgNm 			: "",
					oOgCd 			: "",
					oStudDivRcd		: "",
					oStudDivNm		: "",
					oBirthday		: "",
					oGenderRcd		: "",
					oGenderNm		: "",
					func : function(poParam) {
						doStSearch(poParam);
					}
				}
				];
				
				var msSysdate = "";
				
				/**
				 * @desc import 헤더 초기화
				 * @member extCrsSStudRegFeeList
				 * @param
				 * @return void
				 * @author Aeyoung Lee 2016. 4. 22.
				 */
				moPage.onLoadImportDone_ImpTitle = function() {
					doHeaderOnLoad();
				};
				
				/**
				 * @desc import 학생정보 임포트 초기화
				 * @member extCrsSStudRegFeeList
				 * @param 
				 * @return void
				 * @author Aeyoung Lee 2016. 4. 22.
				 */
				moPage.onLoadImportDone_ImpStudInfo = function() {
					impStudInfo();
				};
				
				/**
				 * @desc 화면 온로드
				 * @member extCrsSStudRegFeeList
				 * @param
				 * @return void
				 * @author Aeyoung Lee 2016. 4. 22.
				 */	
				moPage.onModelConstructDone_ExtCrsSStudRegFeeList = function() {
					//리피트 초기 설정
			//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
			//		ExtRepeat.init("rptStudReg");
					//검색조건 초기 설정
			//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
			//		ExtGroup.initSearchBox("grpSearch", ["grpData","grpDataDtl"]);
					
					//strCommand: onLoad 
					util.Submit.send(app, "subOnLoad", function(pbSuccess){
						if(pbSuccess){
							msSysdate = util.DataMap.getValue(app, "dmDate", "CUT_DT").substring(0,8);
							moPObject.moIdsForStdCsrPStSearch[0].iKeyDate = msSysdate;
						}
						
						//impStudInf02(학생정보 임포트) 초기화
						initSize();
						
						// 권한에따른 컨트롤 활성화 처리
						doVisibleCtlByAuth();
					});
				};
				
				/**
				 * 권한에 따른 학번명 활성/비활성 처리
				 * @member extCrsSStudRegFeeList
				 * @param 
				 * @type void
				 * @author Aeyoung Lee 2016. 4. 22.
				 */	
				function doVisibleCtlByAuth() {
					
					// 전체권한[CC00102] : 
					if (moPageInfo.authRngRcd == "CC00102") {
						util.Control.setEnable(app, true, ["ipbSchStudId", "btnPopSearch"]);
						
						util.Control.setValue(app, "ipbSchStudId", "");
						util.Control.setValue(app, "ipbSchStudIdObj", "");	
						
						util.Control.setFocus(app, "ipbSchStudId");
					}else{
						util.Control.setEnable(app, false, ["ipbSchStudId", "btnPopSearch"]);
						
						util.Control.setValue(app, "ipbSchStudId", moUserInfo.userNm);
						util.Control.setValue(app, "ipbSchStudIdObj", moUserInfo.id);
						
						// 바로 조회
						util.Header.clickSearch(app);
					}	
				};
				
				/**
				 * @desc 학생검색 팝업을 호출한다.
				 * @member extCrsSStudRegFeeList
				 * @param sender 버튼의 이벤트 객체
				 * @return void
				 * @author Aeyoung Lee 2016. 4. 22.
				 */
				moPage.onClick_BtnPopSearch = function(sender) {
					doOnClickStdCsrPStSearch(sender);
				};
				
				/**
				 * @desc 학생 검색
				 * @member extCrsSStudRegFeeList
				 * @param sender 인풋박스 이벤트 객체
				 * @return void
				 * @author Aeyoung Lee 2016. 4. 22.
				 */
				moPage.onValueChanged_IpbSchStudId = function(sender) {
					doOnChangeStdCsrPStSearch(sender);
				};
				
				/**
				 * @desc 입력된 학생정보 셋팅한 후 조회이벤트 호출
				 * @member extCrsSStudRegFeeList
				 * @param poParam 학생정보
				 * @return void
				 * @author Aeyoung Lee 2016. 4. 22.
				 */	
				function doStSearch(poParam) {
					var vsStudId = util.Control.getValue(app, "ipbSchStudId");
					
					if(!ValueUtil.isNull(vsStudId)){
						util.Header.clickSearch(app);
					}
				};
				
				/**
				 * @desc 조회 버튼 클릭 이벤트
				 * @member extCrsSStudRegFeeList
				 * @param
				 * @return void
				 * @author Aeyoung Lee 2016. 4. 22.
				 */
				moPage.onClick_BtnSearch = function() {
					if(!util.validate(app, ["grpSearch"])) return false;
					
					var poImpStudInfoCallbackFunc = function(pbImpStudInfoCallBack) {
							
						if(pbImpStudInfoCallBack) {
							//strCommand: list 
							util.Submit.send(app, "subList", function(pbSuccess){
								if(pbSuccess){
									util.Control.redraw(app, "grdStudReg");
									util.Msg.notify(app, "NLS.INF.M024");
								}
							});	
						}
					}
					
					//학번에 해당하는 학생정보를 가져온다.
					var vsStudId = util.DataMap.getValue(app, "dmReqKey", "strStudId");
					setImpStudInfo(vsStudId, msSysdate, null, poImpStudInfoCallbackFunc);	
				};
				
				return moPage;
			};;
			// End - User Script
			
			// Header
			var dataSet_1 = new cpr.data.DataSet("dsStudReg");
			dataSet_1.parseData({
				"info": "EXT_CSS_DPTMJ_SCAL_INPUT_TERM@SCH_YEAR_RCD,SMT_RCD,SCAL_FEE_CD,SS_OBJ_DIV_RCD",
				"columns": [
					{"name": "SCH_YEAR_RCD"},
					{"name": "SMT_RCD"},
					{"name": "SCH_YEAR_NM"},
					{"name": "SMT_NM"},
					{"name": "PAY_DT"},
					{"name": "PAY_AMT"},
					{"name": "ENT_PAY"},
					{"name": "TUT_PAY"},
					{"name": "SCAL_AMT"},
					{"name": "TUT_SCAL"},
					{"name": "ENT_SCAL"},
					{"name": "PAY_ACCT_RCD_NM"},
					{"name": "SCAL_PAY"},
					{"name": "ETC_ST_PAY"},
					{"name": "ETC_BK_PAY"},
					{"name": "ETC_AM_PAY"},
					{"name": "DIV"}
				],
				"rows": []
			});
			app.register(dataSet_1);
			var dataMap_1 = new cpr.data.DataMap("dmReqKey");
			dataMap_1.parseData({
				"columns" : [
					{
						"name": "strStudNo",
						"dataType": "string"
					},
					{
						"name": "strStudId",
						"dataType": "string"
					}
				]
			});
			app.register(dataMap_1);
			
			var dataMap_2 = new cpr.data.DataMap("dmDate");
			dataMap_2.parseData({
				"columns" : [{
					"name": "CUT_DT",
					"dataType": "string"
				}]
			});
			app.register(dataMap_2);
			var submission_1 = new cpr.protocols.Submission("subOnLoad");
			submission_1.action = "/crs/ExtCrsStudRegFeeList/";
			submission_1.mediaType = "application/x-www-form-urlencoded";
			submission_1.addResponseData(dataMap_2, false);
			app.register(submission_1);
			
			var submission_2 = new cpr.protocols.Submission("subList");
			submission_2.action = "/crs/ExtCrsStudRegFeeList/";
			submission_2.mediaType = "application/x-www-form-urlencoded";
			submission_2.addRequestData(dataMap_1);
			submission_2.addResponseData(dataSet_1, false);
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
			var group_1 = new cpr.controls.Container("grpData");
			// Layout
			var xYLayout_2 = new cpr.controls.layouts.XYLayout();
			group_1.setLayout(xYLayout_2);
			(function(container){
				var embeddedApp_1 = new cpr.controls.EmbeddedApp("emaStudInfo");
				if(typeof onEmaStudInfoAppReady == "function") {
					embeddedApp_1.addEventListener("app-ready", onEmaStudInfoAppReady);
				}
				cpr.core.App.load("app/csr/impStudInf02", function(app) {
					if(app){
						embeddedApp_1.app = app;
					}
				});
				container.addChild(embeddedApp_1, {
					"top": "5px",
					"left": "5px",
					"width": "1215px",
					"height": "120px"
				});
			})(group_1);
			container.addChild(group_1, {
				"top": "72px",
				"left": "5px",
				"width": "1225px",
				"height": "131px"
			});
			
			var group_2 = new cpr.controls.Container("grpSearch");
			group_2.style.setClasses(["search-box"]);
			// Layout
			var xYLayout_3 = new cpr.controls.layouts.XYLayout();
			group_2.setLayout(xYLayout_3);
			(function(container){
				var output_1 = new cpr.controls.Output("optSchStId");
				output_1.value = "";
				output_1.style.setClasses(["require"]);
				output_1.bind("value").toLanguage("UI-GLS-STUD_ID");
				container.addChild(output_1, {
					"top": "5px",
					"left": "5px",
					"width": "70px",
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
					"left": "1160px",
					"width": "60px",
					"height": "25px"
				});
				var inputBox_1 = new cpr.controls.InputBox("ipbSchStudId");
				inputBox_1.maxLength = 100;
				inputBox_1.bind("fieldLabel").toExpression("#optSchStId.value");
				inputBox_1.bind("value").toDataMap(app.lookup("dmReqKey"), "strStudNo");
				if(typeof onIpbSchStudIdValueChange == "function") {
					inputBox_1.addEventListener("value-change", onIpbSchStudIdValueChange);
				}
				container.addChild(inputBox_1, {
					"top": "5px",
					"left": "80px",
					"width": "130px",
					"height": "25px"
				});
				var button_2 = new cpr.controls.Button("btnPopSearch");
				button_2.value = "";
				button_2.style.setClasses(["btn-pop-search"]);
				if(typeof onBtnPopSearchClick == "function") {
					button_2.addEventListener("click", onBtnPopSearchClick);
				}
				container.addChild(button_2, {
					"top": "5px",
					"left": "210px",
					"width": "20px",
					"height": "25px"
				});
				var inputBox_2 = new cpr.controls.InputBox("ipbSchStudIdObj");
				inputBox_2.visible = false;
				inputBox_2.userAttr({"require": "Y"});
				inputBox_2.bind("fieldLabel").toExpression("#optSchStId.value");
				inputBox_2.bind("value").toDataMap(app.lookup("dmReqKey"), "strStudId");
				container.addChild(inputBox_2, {
					"top": "5px",
					"left": "230px",
					"width": "96px",
					"height": "25px"
				});
			})(group_2);
			container.addChild(group_2, {
				"top": "35px",
				"left": "5px",
				"width": "1225px",
				"height": "32px"
			});
			
			var userDefinedControl_1 = new udc.com.appHeader("appheader1");
			container.addChild(userDefinedControl_1, {
				"top": "5px",
				"right": "5px",
				"left": "5px",
				"height": "25px"
			});
			
			var embeddedApp_2 = new cpr.controls.EmbeddedApp("emaort2");
			cpr.core.App.load("app/csr/impStdCsrPStSearch", function(app) {
				if(app){
					embeddedApp_2.app = app;
				}
			});
			container.addChild(embeddedApp_2, {
				"top": "675px",
				"left": "5px",
				"width": "100px",
				"height": "25px"
			});
			
			var group_3 = new cpr.controls.Container("grpDataDtl");
			// Layout
			var xYLayout_4 = new cpr.controls.layouts.XYLayout();
			group_3.setLayout(xYLayout_4);
			(function(container){
				var userDefinedControl_2 = linker.userDefinedControl_2 = new udc.com.comTitle();
				userDefinedControl_2.bind("title").toLanguage("UI-SCR-REGHISTLIST");
				container.addChild(userDefinedControl_2, {
					"top": "5px",
					"left": "5px",
					"width": "315px",
					"height": "25px"
				});
				var grid_1 = linker.grid_1 = new cpr.controls.Grid("grdStudReg");
				grid_1.init({
					"dataSet": app.lookup("dsStudReg"),
					"columns": [
						{"width": "40px"},
						{"width": "80px"},
						{"width": "70px"},
						{"width": "86px"},
						{"width": "95px"},
						{"width": "95px"},
						{"width": "95px"},
						{"width": "100px"},
						{"width": "100px"},
						{"width": "97px"},
						{"width": "76px"},
						{"width": "90px"},
						{"width": "90px"},
						{"width": "90px"}
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
									cell.bind("text").toLanguage("UI-GLS-SCH_YEAR");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 2},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-GLS-SMT");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 3},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-SCR-REGISTDAT");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 4},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-SCR-PAYAMOUNT");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 5},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-SCR-ENTRFEE");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 6},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-SCR-LSNFEE");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 7},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-SCR-SCHMINUSCALAMT");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 8},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-SCR-PAY_SCALFEE");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 9},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-SCR-REGPLACE");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 10},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-SCR-REGPLACE");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 11},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-SCR-REGPLACE");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 12},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-SCR-REGPLACE");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 13},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-SCR-REGPLACE");
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
									cell.columnName = "PAY_DT";
									cell.control = (function(){
										var output_2 = new cpr.controls.Output("gdOptPayDt");
										output_2.dataType = "date";
										output_2.format = "YYYY-MM-DD";
										output_2.style.css({
											"text-align" : "center"
										});
										output_2.bind("value").toDataColumn("PAY_DT");
										return output_2;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 4},
								"configurator": function(cell){
									cell.columnName = "PAY_AMT";
									cell.control = (function(){
										var output_3 = new cpr.controls.Output("gdOptPayAmt");
										output_3.dataType = "number";
										output_3.format = "s#,###";
										output_3.style.css({
											"text-align" : "right"
										});
										output_3.bind("value").toDataColumn("PAY_AMT");
										return output_3;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 5},
								"configurator": function(cell){
									cell.columnName = "ENT_PAY";
									cell.control = (function(){
										var output_4 = new cpr.controls.Output("gdOptEntPay");
										output_4.dataType = "number";
										output_4.format = "s#,###";
										output_4.style.css({
											"text-align" : "right"
										});
										output_4.bind("value").toDataColumn("ENT_PAY");
										return output_4;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 6},
								"configurator": function(cell){
									cell.columnName = "TUT_PAY";
									cell.control = (function(){
										var output_5 = new cpr.controls.Output("gdOptTutPay");
										output_5.dataType = "number";
										output_5.format = "s#,###";
										output_5.style.css({
											"text-align" : "right"
										});
										output_5.bind("value").toDataColumn("TUT_PAY");
										return output_5;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 7},
								"configurator": function(cell){
									cell.columnName = "SCAL_AMT";
									cell.control = (function(){
										var output_6 = new cpr.controls.Output("gdOptScalAmt");
										output_6.dataType = "number";
										output_6.format = "s#,###";
										output_6.style.css({
											"text-align" : "right"
										});
										output_6.bind("value").toDataColumn("SCAL_AMT");
										return output_6;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 8},
								"configurator": function(cell){
									cell.columnName = "SCAL_PAY";
									cell.control = (function(){
										var output_7 = new cpr.controls.Output("gdOptScalPay");
										output_7.dataType = "number";
										output_7.format = "s#,###";
										output_7.style.css({
											"text-align" : "right"
										});
										output_7.bind("value").toDataColumn("SCAL_PAY");
										return output_7;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 9},
								"configurator": function(cell){
									cell.columnName = "PAY_ACCT_RCD_NM";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 10},
								"configurator": function(cell){
									cell.columnName = "DIV";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 11},
								"configurator": function(cell){
									cell.columnName = "ETC_ST_PAY";
									cell.control = (function(){
										var output_8 = new cpr.controls.Output("gdOptEtcStPay");
										output_8.dataType = "number";
										output_8.format = "s#,###";
										output_8.style.css({
											"text-align" : "right"
										});
										output_8.bind("value").toDataColumn("ETC_ST_PAY");
										return output_8;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 12},
								"configurator": function(cell){
									cell.columnName = "ETC_BK_PAY";
									cell.control = (function(){
										var output_9 = new cpr.controls.Output("gdOptEtcBkPay");
										output_9.dataType = "number";
										output_9.format = "s#,###";
										output_9.style.css({
											"text-align" : "right"
										});
										output_9.bind("value").toDataColumn("ETC_BK_PAY");
										return output_9;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 13},
								"configurator": function(cell){
									cell.columnName = "ETC_AM_PAY";
									cell.control = (function(){
										var output_10 = new cpr.controls.Output("gdOptEtcAmPay");
										output_10.dataType = "number";
										output_10.format = "s#,###";
										output_10.style.css({
											"text-align" : "right"
										});
										output_10.bind("value").toDataColumn("ETC_AM_PAY");
										return output_10;
									})();
								}
							}
						]
					}
				});
				container.addChild(grid_1, {
					"top": "30px",
					"left": "5px",
					"width": "1210px",
					"height": "432px"
				});
			})(group_3);
			container.addChild(group_3, {
				"top": "208px",
				"left": "5px",
				"width": "1225px",
				"height": "467px"
			});
			if(typeof onBodyLoad == "function"){
				app.addEventListener("load", onBodyLoad);
			}
			// Linking
			linker.userDefinedControl_2.ctrl = linker.grid_1;
		}
	});
	app.title = "학생별 등록이력조회";
	cpr.core.Platform.INSTANCE.register(app);
})();