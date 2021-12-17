/*
 * App URI: app/ccs/extCcsSLectEvalConvType
 * Source Location: app/ccs/extCcsSLectEvalConvType.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("app/ccs/extCcsSLectEvalConvType", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			﻿//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
			/// <xtmlink path="./extCcsSLectEvalConvType.xtm"/>
			
			/**
			 * 개설과목관리
			 * @class stdCcsCCurClsFrf
			 * @author 박갑수 at 2016. 2. 4
			 */
			var extCcsSLectEvalConvType = function() {
				var moPage = new Page();
				
				// 임포트용 데이터 통신 오브젝트
				var moPObject = new Page();
				
				
				
				// 학년도 학기를 원래데이터로 되돌리기위한 변수
				var msSchYearRcd = "";
				var msSmtRcd = "";
				
				/**
				 * @desc import 헤더 초기화
				 * @param 
				 * @return  void
				 * @author 박갑수 at 2016. 2. 4
				 */
				moPage.onLoadImportDone_ImpTitle = function() {
					// import 헤더 초기화
					doHeaderOnLoad();
				};
				
				/**
				 * @desc onLoad 실행
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 2. 4
				 */
				moPage.onModelConstructDone_StdCcsCOpenSubFrf = function() {
					
					
					// 리피트 초기 설정
			//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
			//		ExtRepeat.init(["rptMain"]);
					
					// 검색조건 초기 설정
			//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
			//		ExtGroup.initSearchBox("grpSearch", ["grpData"]);
					
					// 서브미션 호출
					//strCommand: onLoad 
					util.Submit.send(app, "subOnLoad", function(pbSuccess){
						if(pbSuccess){
							
							util.Control.redraw(app, ["cbbSchYearRcd", "cbbSmtRcd", "cbbDiv", "cbbDeptDiv", "dipKeyDate"]);
							// 학년도 학기값 되돌리기위한 값
							msSchYearRcd = util.DataMap.getValue(app, "dmKeyDateMap", "YEAR");
							msSmtRcd = util.DataMap.getValue(app, "dmKeyDateMap", "SMT");
							
							util.SelectCtl.selectItem(app, "cbbDiv", 0);
							util.SelectCtl.selectItem(app, "cbbDeptDiv", 0);
							
						}
					}, true);
				};
				
				
				
				/**
				 * @desc [cbbSchYearRcd]학년도 onValueChanged 이벤트
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 2. 4
				 */
				moPage.onValueChanged_CbbSchYearRcd = function() {
					// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
					doChangeYearSmt("year");
				};
				
				/**
				 * @desc [cbbSmtRcd]학기 onValueChanged 이벤트
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 2. 4
				 */
				moPage.onValueChanged_CbbSmtRcd = function() {
					// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
					doChangeYearSmt("smt");
				};
				
				/**
				 * @desc 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 2. 5
				 */
				function doChangeYearSmt(psDiv) {
					//strCommand: date 
					util.Submit.send(app, "subDate", function(pbSuccess){
						if(pbSuccess){
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
				 * @desc [btnSearch]조회 onClick 이벤트
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 2. 11
				 */
				moPage.onClick_BtnSearch = function() {
					 
					 
					 // 조회조건 필수 체크
					if(!util.validate(app, ["cbbSchYearRcd", "cbbSmtRcd", "dipKeyDate"])){
						return false;
					}
					
					doList(function(pbSuccess) {
						// 조회 : "조회되었습니다." header 메세지 표시
						if (pbSuccess) util.Msg.notify(app, "NLS.INF.M024");
					});	
					
				};
				
				/**
				 * @desc 개설과목목록 조회
				 * @param poCallBackFunc 콜백정의
				 * @return void
				 * @author 박갑수 at 2016. 2. 11
				 */
				function doList(poCallBackFunc) {	
				
					//strCommand: list 
					util.Submit.send(app, "subList", function(pbSuccess){
						if(pbSuccess){
							util.Control.redraw(app, "grdMain");	
							
							var vnRptRowCnt = util.Grid.getRowCount(app, "grdMain");
							
							var vsYearSmt1 = "";				
							var vsYearSmt2 = "";
							
							for( i = 1 ; i<=vnRptRowCnt ; i++){
								if(ValueUtil.fixNull(vsYearSmt1) != "" && ValueUtil.fixNull(vsYearSmt2) != "" ){
									continue;
								}
								vsYearSmt1	= util.Grid.getCellValue(app, "grdMain", "YEAR_SMT1", i );
								vsYearSmt2	= util.Grid.getCellValue(app, "grdMain", "YEAR_SMT2", i );
							
							}
							
							
							ExtControl.setTextValue("rhBtnYearSmt1", vsYearSmt1);
							ExtControl.setTextValue("rhBtnYearSmt2", vsYearSmt2);
							
							
							// 조회 후 콜백함수 수행
							if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess); 
						}
					}); 
					
					
				};
				
				
				
			//	moPage.onValueChanged_RhCkbSelect = function() {
			//		ExtRepeat.selectedAllPanel("rhCkbSelect");
			//	}
				
				return moPage;
			};;
			// End - User Script
			
			// Header
			var dataSet_1 = new cpr.data.DataSet("dsListCuDivRcd");
			dataSet_1.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_1);
			
			var dataSet_2 = new cpr.data.DataSet("dsDayNightDivRcdList");
			dataSet_2.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_2);
			
			var dataSet_3 = new cpr.data.DataSet("dsSaPostDivRcdList");
			dataSet_3.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_3);
			
			var dataSet_4 = new cpr.data.DataSet("dsEvalMethodRcdList");
			dataSet_4.parseData({
				"columns": [
					{"name": "CD_NM"},
					{"name": "CD"}
				],
				"rows": []
			});
			app.register(dataSet_4);
			
			var dataSet_5 = new cpr.data.DataSet("dsLectTypeRcdList");
			dataSet_5.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_5);
			
			var dataSet_6 = new cpr.data.DataSet("dsCmpDivRcdList");
			dataSet_6.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_6);
			
			var dataSet_7 = new cpr.data.DataSet("dsRelEstTypeCdList");
			dataSet_7.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_7);
			
			var dataSet_8 = new cpr.data.DataSet("dsSbLvlRcdList");
			dataSet_8.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"},
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_8);
			
			var dataSet_9 = new cpr.data.DataSet("dsLectEvalTypeRcd");
			dataSet_9.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_9);
			
			var dataSet_10 = new cpr.data.DataSet("dsReTlsnYnRcdList");
			dataSet_10.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_10);
			
			var dataSet_11 = new cpr.data.DataSet("dsSbTypeRcdList");
			dataSet_11.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_11);
			
			var dataSet_12 = new cpr.data.DataSet("dsRecCiiRcdList");
			dataSet_12.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_12);
			
			var dataSet_13 = new cpr.data.DataSet("dsSbDivRcdList");
			dataSet_13.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_13);
			
			var dataSet_14 = new cpr.data.DataSet("dsSchYearRcdList");
			dataSet_14.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_14);
			
			var dataSet_15 = new cpr.data.DataSet("dsSmtRcdList");
			dataSet_15.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_15);
			
			var dataSet_16 = new cpr.data.DataSet("dsListMain");
			dataSet_16.parseData({
				"info": "CCS_LECT_EVAL_FCTOR@SCH_YEAR_RCD,SMT_RCD,OBJ_CD,OBJ_DIV_RCD,LECT_DIV_RCD,SERIAL_NO,LAN_DIV_RCD",
				"columns": [
					{"name": "ALL_RNK"},
					{"name": "DPT_RNK"},
					{"name": "OG_NM"},
					{"name": "WKGRD_NM"},
					{"name": "STAFF_NO"},
					{"name": "REP_NM"},
					{"name": "OPEN_SUB_CNT"},
					{"name": "TLSN_NOP"},
					{"name": "EVAL_NOP"},
					{"name": "EVAL_SCR"},
					{"name": "EVAL_AVG"},
					{"name": "STAFF_SUB_GRP_RCD"},
					{"name": "PROF_TOT"},
					{"name": "EVAL_AVG1"},
					{"name": "EVAL_AVG2"},
					{"name": "YEAR_SMT1"},
					{"name": "YEAR_SMT2"}
				],
				"rows": []
			});
			app.register(dataSet_16);
			var dataMap_1 = new cpr.data.DataMap("dmResOnLoad");
			dataMap_1.parseData({
				"columns" : [
					{
						"name": "strLanDivRcd",
						"dataType": "string"
					},
					{
						"name": "strKeyDate",
						"dataType": "string"
					}
				]
			});
			app.register(dataMap_1);
			
			var dataMap_2 = new cpr.data.DataMap("dmReqKey");
			dataMap_2.parseData({
				"columns" : [
					{
						"name": "strSaCd",
						"dataType": "string"
					},
					{
						"name": "strSaNm",
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
						"name": "strSaObjDivRcd",
						"dataType": "string"
					},
					{
						"name": "strSbObjDivRcd",
						"dataType": "string"
					},
					{
						"name": "strRefKey",
						"dataType": "string"
					},
					{
						"name": "strSbLvlRcd",
						"dataType": "string"
					},
					{
						"name": "strCmpDivRcd",
						"dataType": "string"
					},
					{
						"name": "strCuCd",
						"dataType": "string"
					},
					{
						"name": "strCuDivRcd",
						"dataType": "string"
					},
					{
						"name": "strStaffSubGrp",
						"dataType": "string"
					},
					{
						"name": "strDeptDiv",
						"dataType": "string"
					},
					{
						"name": "strUpCnt",
						"dataType": "string"
					},
					{
						"name": "strDownCnt",
						"dataType": "string"
					}
				]
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
			
			var dataMap_4 = new cpr.data.DataMap("dmResPopup");
			dataMap_4.parseData({
				"columns" : [
					{
						"name": "strFrfCmpDivRcd",
						"dataType": "string"
					},
					{
						"name": "strFrfPnt",
						"dataType": "string"
					},
					{
						"name": "strFrfTheoTc",
						"dataType": "string"
					},
					{
						"name": "strFrfEpacTc",
						"dataType": "string"
					},
					{
						"name": "strFrfLectTimeCnt",
						"dataType": "string"
					},
					{
						"name": "strTlsnReqCapa1",
						"dataType": "string"
					},
					{
						"name": "strTlsnReqCapa2",
						"dataType": "string"
					},
					{
						"name": "strTlsnReqCapa3",
						"dataType": "string"
					},
					{
						"name": "strTlsnReqCapa4",
						"dataType": "string"
					}
				]
			});
			app.register(dataMap_4);
			
			var dataMap_5 = new cpr.data.DataMap("dmResDelChk");
			dataMap_5.parseData({
				"columns" : [
					{
						"name": "strTimeSche",
						"dataType": "string"
					},
					{
						"name": "strLectSche",
						"dataType": "string"
					},
					{
						"name": "strRestApp",
						"dataType": "string"
					},
					{
						"name": "headersmt1",
						"dataType": "string"
					}
				]
			});
			app.register(dataMap_5);
			var submission_1 = new cpr.protocols.Submission("subOnLoad");
			submission_1.action = "/ccs/ExtCcsSLectEvalConvType/";
			submission_1.mediaType = "application/x-www-form-urlencoded";
			submission_1.addResponseData(dataSet_14, false);
			submission_1.addResponseData(dataSet_15, false);
			submission_1.addResponseData(dataMap_3, false);
			submission_1.addResponseData(dataMap_1, false);
			app.register(submission_1);
			
			var submission_2 = new cpr.protocols.Submission("subList");
			submission_2.action = "/ccs/ExtCcsSLectEvalConvType/";
			submission_2.mediaType = "application/x-www-form-urlencoded";
			submission_2.addRequestData(dataMap_3);
			submission_2.addRequestData(dataMap_2);
			submission_2.addRequestData(dataMap_1);
			submission_2.addResponseData(dataSet_16, false);
			app.register(submission_2);
			
			var submission_3 = new cpr.protocols.Submission("subDate");
			submission_3.action = "/cmn/StdCmnDateTime/";
			submission_3.mediaType = "application/x-www-form-urlencoded";
			submission_3.addRequestData(dataMap_3);
			submission_3.addResponseData(dataMap_3, false);
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
					"left": "1158px",
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
					"width": "80",
					"height": "25px"
				});
				var comboBox_1 = new cpr.controls.ComboBox("cbbSchYearRcd");
				comboBox_1.enabled = false;
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
					"width": "90",
					"height": "25px"
				});
				var comboBox_2 = new cpr.controls.ComboBox("cbbSmtRcd");
				comboBox_2.enabled = false;
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
					"left": "275px",
					"width": "90px",
					"height": "25px"
				});
				var output_2 = new cpr.controls.Output("optSmtRcd");
				output_2.value = "";
				output_2.style.setClasses(["require"]);
				output_2.bind("value").toLanguage("NLS-DLG-LBL-L002");
				container.addChild(output_2, {
					"top": "5px",
					"left": "190px",
					"width": "80px",
					"height": "25px"
				});
				var output_3 = new cpr.controls.Output("optCuCd");
				output_3.value = "";
				output_3.bind("value").toLanguage("UI-SCR-SUBGRUP");
				container.addChild(output_3, {
					"top": "5px",
					"left": "560px",
					"width": "80px",
					"height": "25px"
				});
				var comboBox_3 = new cpr.controls.ComboBox("cbbDiv");
				comboBox_3.bind("fieldLabel").toExpression("#optCuCd.value");
				comboBox_3.bind("value").toDataMap(app.lookup("dmReqKey"), "strStaffSubGrp");
				(function(comboBox_3){
					comboBox_3.addItem(new cpr.controls.Item("전임", "CF00310"));
					comboBox_3.addItem(new cpr.controls.Item("외래", "CF00399"));
					comboBox_3.addItem(new cpr.controls.Item("전체", ""));
				})(comboBox_3);
				container.addChild(comboBox_3, {
					"top": "5px",
					"left": "645px",
					"width": "90px",
					"height": "25px"
				});
				var output_4 = new cpr.controls.Output("optCuCd1");
				output_4.value = "";
				output_4.bind("value").toLanguage("UI-SCR-SUBGRUP");
				container.addChild(output_4, {
					"top": "5px",
					"left": "745px",
					"width": "80px",
					"height": "25px"
				});
				var comboBox_4 = new cpr.controls.ComboBox("cbbDeptDiv");
				comboBox_4.bind("fieldLabel").toExpression("#optCuCd.value");
				comboBox_4.bind("value").toDataMap(app.lookup("dmReqKey"), "strDeptDiv");
				(function(comboBox_4){
					comboBox_4.addItem(new cpr.controls.Item("전체순위", "ALL"));
					comboBox_4.addItem(new cpr.controls.Item("학과순위", "DEPT"));
					comboBox_4.addItem(new cpr.controls.Item("전체", ""));
				})(comboBox_4);
				container.addChild(comboBox_4, {
					"top": "5px",
					"left": "830px",
					"width": "90px",
					"height": "25px"
				});
				var output_5 = new cpr.controls.Output("optCuCd2");
				output_5.value = "";
				output_5.bind("value").toLanguage("UI-SCR-SUBGRUP");
				container.addChild(output_5, {
					"top": "5px",
					"left": "930px",
					"width": "53px",
					"height": "25px"
				});
				var output_6 = new cpr.controls.Output("optCuCd3");
				output_6.value = "";
				output_6.bind("value").toLanguage("UI-SCR-SUBGRUP");
				container.addChild(output_6, {
					"top": "5px",
					"left": "1042px",
					"width": "53px",
					"height": "25px"
				});
				var numberEditor_1 = new cpr.controls.NumberEditor("inputbox1");
				numberEditor_1.style.css({
					"text-align" : "center"
				});
				numberEditor_1.bind("value").toDataMap(app.lookup("dmReqKey"), "strUpCnt");
				container.addChild(numberEditor_1, {
					"top": "5px",
					"left": "987px",
					"width": "45px",
					"height": "25px"
				});
				var numberEditor_2 = new cpr.controls.NumberEditor("inputbox2");
				numberEditor_2.style.css({
					"text-align" : "center"
				});
				numberEditor_2.bind("value").toDataMap(app.lookup("dmReqKey"), "strDownCnt");
				container.addChild(numberEditor_2, {
					"top": "5px",
					"left": "1099px",
					"width": "45px",
					"height": "25px"
				});
				var dateInput_1 = new cpr.controls.DateInput("dipKeyDate");
				dateInput_1.userAttr({"require": "Y"});
				dateInput_1.bind("fieldLabel").toExpression("#optKeyDate.value");
				dateInput_1.bind("value").toDataMap(app.lookup("dmResOnLoad"), "strKeyDate");
				container.addChild(dateInput_1, {
					"top": "5px",
					"left": "460px",
					"width": "90px",
					"height": "25px"
				});
				var output_7 = new cpr.controls.Output("optKeyDate");
				output_7.value = "기준일자";
				output_7.style.setClasses(["require"]);
				container.addChild(output_7, {
					"top": "5px",
					"left": "375px",
					"width": "80px",
					"height": "25px"
				});
			})(group_1);
			container.addChild(group_1, {
				"top": "35px",
				"left": "5px",
				"width": "1225px",
				"height": "30px"
			});
			
			var embeddedApp_1 = new cpr.controls.EmbeddedApp("emaStdCmnPobjSch");
			cpr.core.App.load("app/cmn/impStdCmnPObjSch", function(app) {
				if(app){
					embeddedApp_1.app = app;
				}
			});
			container.addChild(embeddedApp_1, {
				"top": "680px",
				"left": "5px",
				"width": "100px",
				"height": "25px"
			});
			
			var group_2 = new cpr.controls.Container("grpData");
			// Layout
			var xYLayout_3 = new cpr.controls.layouts.XYLayout();
			group_2.setLayout(xYLayout_3);
			(function(container){
				var userDefinedControl_2 = new udc.com.comFormTitle();
				userDefinedControl_2.bind("title").toLanguage("UI-SCR-TCHRLICISSUELIST");
				container.addChild(userDefinedControl_2, {
					"top": "5px",
					"left": "5px",
					"width": "200px",
					"height": "25px"
				});
				var grid_1 = new cpr.controls.Grid("grdMain");
				grid_1.init({
					"dataSet": app.lookup("dsListMain"),
					"columns": [
						{"width": "40px"},
						{"width": "72px"},
						{"width": "76px"},
						{"width": "186px"},
						{"width": "94px"},
						{"width": "82px"},
						{"width": "77px"},
						{"width": "63px"},
						{"width": "75px"},
						{"width": "76px"},
						{"width": "72px"},
						{"width": "75px"},
						{"width": "110px"},
						{"width": "110px"}
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
									cell.bind("text").toLanguage("UI-DB-LECT_ROOM_SHORT_NM");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 2},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-DB-LECT_ROOM_SHORT_NM");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 3},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-DB-LECT_ROOM_SHORT_NM");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 4},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-DB-LECT_ROOM_SHORT_NM");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 5},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-DB-LECT_ROOM_SHORT_NM");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 6},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-DB-LECT_ROOM_SHORT_NM");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 7},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-DB-LECT_ROOM_SHORT_NM");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 8},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-DB-LECT_ROOM_SHORT_NM");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 9},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-DB-LECT_ROOM_SHORT_NM");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 10},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-DB-LECT_ROOM_SHORT_NM");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 11},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-DB-LECT_ROOM_SHORT_NM");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 12},
								"configurator": function(cell){
									cell.text = "";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 13},
								"configurator": function(cell){
									cell.text = "";
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
									cell.columnName = "ALL_RNK";
									cell.style.css({
										"text-align" : "center"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 2},
								"configurator": function(cell){
									cell.columnName = "DPT_RNK";
									cell.style.css({
										"text-align" : "center"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 3},
								"configurator": function(cell){
									cell.columnName = "OG_NM";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 4},
								"configurator": function(cell){
									cell.columnName = "WKGRD_NM";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 5},
								"configurator": function(cell){
									cell.columnName = "STAFF_NO";
									cell.style.css({
										"text-align" : "center"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 6},
								"configurator": function(cell){
									cell.columnName = "REP_NM";
									cell.style.css({
										"text-align" : "center"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 7},
								"configurator": function(cell){
									cell.columnName = "OPEN_SUB_CNT";
									cell.control = (function(){
										var output_8 = new cpr.controls.Output("gdOptProfNm6");
										output_8.dataType = "number";
										output_8.format = "s#,###";
										output_8.style.css({
											"text-align" : "right"
										});
										output_8.bind("value").toDataColumn("OPEN_SUB_CNT");
										return output_8;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 8},
								"configurator": function(cell){
									cell.columnName = "TLSN_NOP";
									cell.control = (function(){
										var output_9 = new cpr.controls.Output("gdOptProfNm7");
										output_9.dataType = "number";
										output_9.format = "s#,###";
										output_9.style.css({
											"text-align" : "right"
										});
										output_9.bind("value").toDataColumn("TLSN_NOP");
										return output_9;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 9},
								"configurator": function(cell){
									cell.columnName = "EVAL_NOP";
									cell.control = (function(){
										var output_10 = new cpr.controls.Output("gdOptProfNm8");
										output_10.dataType = "number";
										output_10.format = "s#,###";
										output_10.style.css({
											"text-align" : "right"
										});
										output_10.bind("value").toDataColumn("EVAL_NOP");
										return output_10;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 10},
								"configurator": function(cell){
									cell.columnName = "EVAL_SCR";
									cell.control = (function(){
										var output_11 = new cpr.controls.Output("gdOptProfNm9");
										output_11.dataType = "number";
										output_11.format = "s#,###";
										output_11.style.css({
											"text-align" : "right"
										});
										output_11.bind("value").toDataColumn("EVAL_SCR");
										return output_11;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 11},
								"configurator": function(cell){
									cell.columnName = "EVAL_AVG";
									cell.control = (function(){
										var output_12 = new cpr.controls.Output("gdOptProfNm10");
										output_12.dataType = "number";
										output_12.format = "###.00";
										output_12.style.css({
											"text-align" : "right"
										});
										output_12.bind("value").toDataColumn("EVAL_AVG");
										return output_12;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 12},
								"configurator": function(cell){
									cell.columnName = "EVAL_AVG1";
									cell.control = (function(){
										var output_13 = new cpr.controls.Output("gdOptProfNm22");
										output_13.dataType = "number";
										output_13.format = "###.00";
										output_13.style.css({
											"text-align" : "right"
										});
										output_13.bind("value").toDataColumn("EVAL_AVG1");
										return output_13;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 13},
								"configurator": function(cell){
									cell.columnName = "EVAL_AVG2";
									cell.control = (function(){
										var output_14 = new cpr.controls.Output("gdOptProfNm23");
										output_14.dataType = "number";
										output_14.format = "###.00";
										output_14.style.css({
											"text-align" : "right"
										});
										output_14.bind("value").toDataColumn("EVAL_AVG2");
										return output_14;
									})();
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
									cell.expr = "\"\"";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 4},
								"configurator": function(cell){
									cell.expr = "\"\"";
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
									cell.expr = "getRowCount()";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 7},
								"configurator": function(cell){
									cell.expr = "getSum(\"OPEN_SUB_CNT\")";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 8},
								"configurator": function(cell){
									cell.expr = "getSum(\"TLSN_NOP\")";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 9},
								"configurator": function(cell){
									cell.expr = "getSum(\"EVAL_NOP\")";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 10},
								"configurator": function(cell){
									cell.expr = "getSum(\"EVAL_SCR\")";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 11},
								"configurator": function(cell){
									cell.expr = "getSum(\"EVAL_NOP\")";
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
							}
						]
					}
				});
				container.addChild(grid_1, {
					"top": "32px",
					"left": "5px",
					"width": "1215px",
					"height": "563px"
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
		}
	});
	app.title = "개설과목관리";
	cpr.core.Platform.INSTANCE.register(app);
})();