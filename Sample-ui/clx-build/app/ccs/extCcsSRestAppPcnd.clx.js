/*
 * App URI: app/ccs/extCcsSRestAppPcnd
 * Source Location: app/ccs/extCcsSRestAppPcnd.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("app/ccs/extCcsSRestAppPcnd", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			﻿//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
			/// <xtmlink path="./extCcsSRestAppPcnd.xtm"/>
			
			/**
			 * 결보강현황
			 * @class extCcsSRestAppPcnd
			 * @author 박갑수 at 2016. 10. 6
			 */
			var extCcsSRestAppPcnd = function() {
				var moPage = new Page();
				
				// 학년도 ,학기, 출력순서를 원래데이터로 되돌리기위한 변수
				var msSchYearRcd = "";
				var msSmtRcd = "";
				
				/**
				 * @desc import 헤더 초기화
				 * @param 
				 * @return  void
				 * @author 박갑수 at 2016. 10. 6
				 */
				moPage.onLoadImportDone_ImpTitle = function() {
					// import 헤더 초기화
					doHeaderOnLoad();
				};
				
				/**
				 * @desc onLoad 실행
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 10. 6
				 */
				moPage.onModelConstructDone_ExtCcsSRestAppPcnd = function() {
					// 검색조건 초기 설정
			//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
			//		ExtGroup.initSearchBox("grpSearch", ["grpData"]);
					
					// 서브미션 실행 (실패시 cover page)
					//strCommand: onLoad 
					util.Submit.send(app, "subOnLoad", function(pbSuccess){
						if(pbSuccess){
							
							util.Control.setValue(app, "radInOut", "OUT");
							// 조회조건 컨트롤 refresh(학년도, 학기)
							util.Control.redraw(app, ["cbbSchYearRcd", "cbbSmtRcd", "dipFromDate", "dipToDate", "radInOut"]);
							
							util.Control.setValue(app, "ckbHoliday", "Y");
						}
					}, true);
				};
				
				/**
				 * @desc [cbbSchYearRcd]학년도 onValueChanged 이벤트
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 10. 6
				 */
				moPage.onValueChanged_CbbSchYearRcd = function() {
					// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
					doChangeYearSmt("year");
				};
				
				/**
				 * @desc [cbbSmtRcd]학기 onValueChanged 이벤트
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 10. 6
				 */
				moPage.onValueChanged_CbbSmtRcd = function() {
					// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
					doChangeYearSmt("smt");
				};
				
				/**
				 * @desc 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 10. 6
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
				 * @desc [dipFromDate]결보강시작일자 onValueChanged 이벤트
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 10. 6
				 */
				moPage.onValueChanged_DipFromDate = function() {
					if(!doCheckDate("ST_DT")){
						util.Control.setValue(app, "dipFromDate", "");
					}
				};
				
				/**
				 * @desc [dipToDate]결보강종료일자 onValueChanged 이벤트
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 10. 6
				 */
				moPage.onValueChanged_DipToDate = function() {
					if( !doCheckDate("END_DT")){
						util.Control.setValue(app, "dipToDate", "");
					}
				};
				
				/**
				 * @desc 시작일이 종료일보다 크거나 종료일이 시작일보다 작은지 검사
				 * @param psColNm		(필수) 날짜컬럼명
				 * @return boolean
				 * @author 박갑수 at 2016. 10. 6
				 */
				function doCheckDate(psColNm){
					// 유효성 true or false
					var vbValid = true;
			
					// 시작일자
					var vsStDt = util.Control.getValue(app, "dipFromDate").substring(0, 8);
					// 종료일자
					var vsEndDt = util.Control.getValue(app, "dipToDate").substring(0, 8);
					
					// 시작일 유효성 체크
					if(psColNm == "ST_DT"){
						if(!ValueUtil.isNull(vsEndDt) && vsStDt > vsEndDt){
							// "시작일이 종료일 보다 클 수 없습니다." 메시지 출력
							util.Msg.alert("NLS-CSS-M063");
							vbValid = false;
							return vbValid;
						}
			
					// 종료일 유효성 체크
					} else if(psColNm == "END_DT"){
						if(!ValueUtil.isNull(vsStDt) && vsStDt > vsEndDt){
							util.Msg.alert("NLS-CSS-M064");
							vbValid = false;
							return vbValid;
						}
					}
					
					return vbValid;
				};
				
				/**
				 * @desc [btnSearch]조회 onClick 이벤트
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 8. 10
				 */
				moPage.onClick_BtnSearch = function() { 
					 
					 // 조회조건 필수 체크
					if(!util.validate(app, ["cbbSchYearRcd", "cbbSmtRcd", "dipFromDate", "dipToDate"])){
						return false;
					}
					
					var vsSchYearRcd = util.Control.getValue(app, "cbbSchYearRcd");
					var vsSmtRcd = util.Control.getValue(app, "cbbSmtRcd");
					var vsHoliday = util.Control.getValue(app, "ckbHoliday");
					var vsDiv		= util.DataMap.getValue(app, "dmReqKey", "strDiv");
					var vsHolidayIn = "";
					
					if(ValueUtil.fixNull(vsHoliday) == "Y"){
						vsHolidayIn = "('CL10501', 'CL10503')";
					}else {
						vsHolidayIn = "('CL10501')";
					}
					
					var voParam = {
							p_strLanDivRcd 		: util.DataMap.getValue(app, "dmResOnLoad", "strLanDivRcd"),	// 언어키
							p_strSchYearRcd 	: vsSchYearRcd,															// 학년도코드
							p_strSmtRcd 			: vsSmtRcd,																	// 학기코드
							p_strStDt				: util.Control.getValue(app, "dipFromDate"),								// 시작일자
							p_strEndDt				: util.Control.getValue(app, "dipToDate"),									// 종료일자
							p_strLectDiv			: util.Control.getValue(app, "ckbLectDIv"),									// 강좌별
							p_strHoliday			: vsHolidayIn,																	// 공휴일포함
							p_strDiv					: vsDiv,																	// 결강/보강
							p_strError				: util.Control.getValue(app, "ckbError"),									// 오류
							p_strCheckAuthId 	: moUserInfo.id																// 사용자ID
					};
					
					var vsSchYearRcdNm = ExtInstance.getValue("/root/resOnLoad/schYearRcdList/row", "CD_NM" , "child::CD='"+vsSchYearRcd+"'");
					var vsSmtRcdNm = ExtInstance.getValue("/root/resOnLoad/smtRcdList/row", "CD_NM" , "child::CD='"+vsSmtRcd+"'");
					
					var vsTitle = vsSchYearRcdNm + " " + vsSmtRcdNm + " 결,보강 현황";
					
					var voOzFormParam = {
						  TITLE 		 : vsTitle			// 리포트타이틀
						, SUB_TITLE 	 : "" 					// 리포트서브타이틀		
						, FORM_TYPE : "flash"
					};
					
					util.Report.open(app, "hojReport", "extCcsSRestAppPcnd", voOzFormParam, voParam);
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
			var dataMap_1 = new cpr.data.DataMap("dmResOnLoad");
			dataMap_1.parseData({
				"columns" : [{
					"name": "strLanDivRcd",
					"dataType": "string"
				}]
			});
			app.register(dataMap_1);
			
			var dataMap_2 = new cpr.data.DataMap("dmReqKey");
			dataMap_2.parseData({
				"columns" : [
					{
						"name": "strLectDiv",
						"dataType": "string"
					},
					{
						"name": "strHoliday",
						"dataType": "string"
					},
					{
						"name": "strError",
						"dataType": "string"
					},
					{
						"name": "strDiv",
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
			var submission_1 = new cpr.protocols.Submission("subOnLoad");
			submission_1.action = "/ccs/ExtCcsRestAppPcnd/";
			submission_1.mediaType = "application/x-www-form-urlencoded";
			submission_1.addResponseData(dataSet_1, false);
			submission_1.addResponseData(dataSet_2, false);
			submission_1.addResponseData(dataMap_3, false);
			submission_1.addResponseData(dataMap_1, false);
			app.register(submission_1);
			
			var submission_2 = new cpr.protocols.Submission("subDate");
			submission_2.action = "/cmn/StdCmnDateTime/";
			submission_2.mediaType = "application/x-www-form-urlencoded";
			submission_2.addRequestData(dataMap_3);
			submission_2.addResponseData(dataMap_3, false);
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
					"width": "90px",
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
					"left": "100px",
					"width": "100px",
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
					"left": "305px",
					"width": "100px",
					"height": "25px"
				});
				var output_2 = new cpr.controls.Output("optSmtRcd");
				output_2.value = "";
				output_2.style.setClasses(["require"]);
				output_2.bind("value").toLanguage("NLS-DLG-LBL-L002");
				container.addChild(output_2, {
					"top": "5px",
					"left": "210px",
					"width": "90px",
					"height": "25px"
				});
				var dateInput_1 = new cpr.controls.DateInput("dipFromDate");
				dateInput_1.userAttr({"require": "Y"});
				dateInput_1.style.css({
					"text-align" : "center"
				});
				dateInput_1.bind("fieldLabel").toExpression("#optFromDate.value");
				dateInput_1.bind("value").toDataMap(app.lookup("dmKeyDateMap"), "ST_DT");
				if(typeof onDipFromDateValueChange == "function") {
					dateInput_1.addEventListener("value-change", onDipFromDateValueChange);
				}
				container.addChild(dateInput_1, {
					"top": "5px",
					"left": "539px",
					"width": "100px",
					"height": "25px"
				});
				var dateInput_2 = new cpr.controls.DateInput("dipToDate");
				dateInput_2.userAttr({"require": "Y"});
				dateInput_2.style.css({
					"text-align" : "center"
				});
				dateInput_2.bind("fieldLabel").toExpression("#optFromDate.value");
				dateInput_2.bind("value").toDataMap(app.lookup("dmKeyDateMap"), "END_DT");
				if(typeof onDipToDateValueChange == "function") {
					dateInput_2.addEventListener("value-change", onDipToDateValueChange);
				}
				container.addChild(dateInput_2, {
					"top": "5px",
					"left": "659px",
					"width": "100px",
					"height": "25px"
				});
				var output_3 = new cpr.controls.Output("optKeyDate");
				output_3.value = "~";
				container.addChild(output_3, {
					"top": "7px",
					"left": "641px",
					"width": "15px",
					"height": "15px"
				});
				var checkBox_1 = new cpr.controls.CheckBox("ckbLectDIv");
				checkBox_1.value = "";
				checkBox_1.trueValue = "Y";
				checkBox_1.falseValue = "";
				checkBox_1.text = "강좌별";
				checkBox_1.bind("value").toDataMap(app.lookup("dmReqKey"), "strLectDiv");
				container.addChild(checkBox_1, {
					"top": "5px",
					"left": "771px",
					"width": "70px",
					"height": "25px"
				});
				var checkBox_2 = new cpr.controls.CheckBox("ckbHoliday");
				checkBox_2.value = "";
				checkBox_2.trueValue = "Y";
				checkBox_2.falseValue = "";
				checkBox_2.text = "공휴일포함";
				checkBox_2.bind("value").toDataMap(app.lookup("dmReqKey"), "strHoliday");
				container.addChild(checkBox_2, {
					"top": "5px",
					"left": "845px",
					"width": "90px",
					"height": "25px"
				});
				var checkBox_3 = new cpr.controls.CheckBox("ckbError");
				checkBox_3.value = "";
				checkBox_3.trueValue = "FALSE";
				checkBox_3.falseValue = "";
				checkBox_3.text = "오류(결강시수=보강시수)";
				checkBox_3.bind("value").toDataMap(app.lookup("dmReqKey"), "strError");
				container.addChild(checkBox_3, {
					"top": "5px",
					"left": "939px",
					"width": "199px",
					"height": "25px"
				});
				var radioButton_1 = new cpr.controls.RadioButton("radInOut");
				radioButton_1.bind("value").toDataMap(app.lookup("dmReqKey"), "strDiv");
				(function(radioButton_1){
					radioButton_1.addItem(new cpr.controls.Item("결강", "OUT"));
					radioButton_1.addItem(new cpr.controls.Item("보강", "IN"));
				})(radioButton_1);
				container.addChild(radioButton_1, {
					"top": "5px",
					"left": "420px",
					"width": "115",
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
				var userDefinedControl_2 = new udc.com.comFormTitle();
				userDefinedControl_2.bind("title").toLanguage("UI-SCR-TCHRLICISSUELIST");
				container.addChild(userDefinedControl_2, {
					"top": "5px",
					"left": "5px",
					"width": "200px",
					"height": "25px"
				});
				var hTMLObject_1 = new cpr.controls.HTMLObject("hojReport");
				container.addChild(hTMLObject_1, {
					"top": "30px",
					"left": "5px",
					"width": "1213px",
					"height": "565px"
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
	app.title = "결보강현황";
	cpr.core.Platform.INSTANCE.register(app);
})();