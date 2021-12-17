/*
 * App URI: app/csr/extCsrPMstAltWith
 * Source Location: app/csr/extCsrPMstAltWith.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("app/csr/extCsrPMstAltWith", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			﻿//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
			/// <xtmlink path="./extCsrPMstAltWith.xtm"/>
			
			var extCsrPMstAltWith = function() {
				var moPage = new Page();
				//임포트용 데이터 통신 오브젝트
				var moPObject = new PObject();
			
				/**
				 * @desc 헤더 온로드 실행
				 * @param 
				 * @return void
				 * @author Sunyoung , PARK 2016.02.24
				 */
				moPage.onLoadImportDone_ImpTitle = function() {
					doHeaderOnLoad();
				};
				
				/**
				 * @desc 팝업 닫기
				 * @param 
				 * @return void
				 * @author Sunyoung , PARK 2016.02.24
				 */
				moPage.onClick_BtnCloseCancel = function() {
					app.close();
				};
				
				/**
				 * @desc onModelConstructDone 이벤트
				 * @param 
				 * @return void
				 * @author	 Sunyoung , PARK 2016.02.24
				 */
				moPage.onModelConstructDone_StdCsrRStSearch = function() {
					//리피트 초기 설정
			//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
			//		ExtRepeat.init(["frfCsrShregAlt"]);
					//화면 온로드 서브미션 호출
					doOnLoad();
				};
				
				/**
				 * @desc 프리폼 신규 생성
				 * @param
				 * @return void
				 * @author Sunyoung, PARK 2016.02.24
				 */
				function doSubInsertRow(vsFrfId) {
					util.FreeForm.setValue(app, vsFrfId, AppConstants.CUD_COL_REF, "I");
					//프리폼 신규
					util.FreeForm.insertRow(app, vsFrfId);
					var vsStudId = util.DataMap.getValue(app, "dmReqKey", "strStudId");
					//학생 ObjectId 셋팅
					util.FreeForm.setValue(app, vsFrfId, "STUD_ID", vsStudId);
					util.Grid.setRowState(app, vsFrfId, cpr.data.tabledata.RowState.INSERTED,1);
					//신규입력이 Ok
					util.Control.setEnable(app, true, [vsFrfId]);
				};
				
				
			
			
				/**
				 * @desc   부모창의 학생정보를 파라미터로 받아 화면 초기화 설정 
				 * @param
				 * @return void
				 * @author Sunyoung, PARK 2016.02.24
				 */
				function doOnLoad() {
					
					var voAltObj = ExtPopUp.getParentVal("moAltObj");
					
					// 부모멤버변수에담긴학번받음
					util.DataMap.setValue(app, "dmReqKey", "strStudNo", voAltObj["studNo"]);
					util.DataMap.setValue(app, "dmReqKey", "strHeaderCourse", voAltObj["headerCourse"]);
					util.DataMap.setValue(app, "dmReqKey", "strStudInfo", voAltObj["headerStud"]);
					util.DataMap.setValue(app, "dmReqKey", "strSchYearRcd", voAltObj["year"]);
					util.DataMap.setValue(app, "dmReqKey", "strSmtRcd", voAltObj["smt"]);
					util.DataMap.setValue(app, "dmReqKey", "strStudId", voAltObj["studId"]);
					
					//strCommand: onLoad 
					util.Submit.send(app, "subOnLoad", function (pbSuccess) {
						if (pbSuccess){
							util.Control.redraw(app, ["frfCsrShregAlt"]);
							
							// 학생의 학번정보를 화면에 입력
							util.Control.setValue(app, "optStudNo", voAltObj["studNo"]);
							util.Control.setValue(app, "optStud", voAltObj["headerStud"]);
							util.Control.setValue(app, "optCourse", voAltObj["headerCourse"]);
							
							// 제적 신규 
							doSubInsertRow("frfCsrShregAlt");
							
							util.FreeForm.setValue(app, "frfCsrShregAlt", "SCH_YEAR_RCD", voAltObj["year"]);
							util.FreeForm.setValue(app, "frfCsrShregAlt", "SMT_RCD", voAltObj["smt"]);
							
							// 학적변동일 Set
							var vsChgDt = util.DataMap.getValue(app, "dmResOnLoad", "CurrentDate");
							util.FreeForm.setValue(app, "frfCsrShregAlt", "ALT_DT", vsChgDt);
							
							util.Control.redraw(app, ["cbbFrfSchYearRcd", "cbbFrfSmtRcd", "cbbFrfAltRsnRcd","cbbFrfRefundBankRcd","dipFrfAltDt","cbbFrfRefundSchYearRcd","cbbFrfRefundSmtRcd"]);
							
						}else{
							ExtModel.dispatch("btnCloseCancel", "DOMActivate");
						}			
					});
				};
				 
				 /**
				 * @desc 저장 SF에서 오류 메시지가 있으면 확인창 띄움.
				 * @param
				 * @return void
				 * @author Sunyoung , PARK 2016.02.24
				 */
				function doSave(pnStep) {
					if (!pnStep) {
						pnStep = "0";
					}
					
					util.DataMap.setValue(app, "dmInteractiveMsg", "intStep", pnStep);
					
					//strCommand: saveGlobal 
					util.Submit.send(app, "subSave", function(pbSuccess) {
						if (pbSuccess) {
							var vsMsg = util.DataMap.getValue(app, "dmInteractiveMsg", "strMsg");
							if (vsMsg != "") {
								// @1\n  계속하시겠습니까?
								if (util.Msg.confirm("NLS-CRM-M034", [vsMsg]) ) {
									var vnStep = util.DataMap.getValue(app, "dmInteractiveMsg", "intStep");
									return doSave(vnStep);
								} else {
									return false;
								}
							} else {
								//부모창 목록 재조회
								//팝업창 닫기
								ExtPopUp.closeLayeredPopup("doPopCallList");
								return true;
							}
						}else{
							return false;
						}
					});
				};	
				
				
				/**
				 * @desc 제적신규 저장 버튼 event
				 * @param
				 * @return void
				 * @author Sunyoung , PARK 2016.02.24
				 */
				moPage.onClick_BtnSave = function() {
				
					//리피트 validation check
					if(!util.validate(app, ["frfCsrShregAlt"])){
						return false;
					}
			
					util.DataMap.setValue(app, "dmReqKey", "strPopTarget", "stdCsrPMstAltWith");
					//strCommand: popupMnu 
					util.Submit.send(app, "subMstAltPopupMnu", function(pbSuccess){
						if (pbSuccess) {
							doSave();
						}
					});
				};
					
				moPage.onModelConstructDone_StdCsrPMstAltWith = function() {
					//리피트 초기 설정
			//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
			//		ExtRepeat.init(["frfCsrShregAlt"]);
					ExtRepeat.addOriginCol("frfCsrShregAlt", ["REFUND_ACCT_NO"]);
					//화면 온로드 서브미션 호출
					doOnLoad();
				};
				
			
				moPage.onValueChanged_DipFrfAltDt = function() {
					doChgYearSmtAltDt();
				};
				
				
				moPage.onValueChanged_CbbFrfSchYearRcd = function() {
					doChgYearSmtAltDt();
				};
				
				
				moPage.onValueChanged_CbbFrfSmtRcd = function() {
					doChgYearSmtAltDt();
				};
				
				 /**
				 * @desc  학년도,학기,변동일자 Click시
				 * @param
				 * @return void
				 * @author Choi In Seong 2016. 02. 19.
				 */
				function doChgYearSmtAltDt() {
					
					var vsYear = util.FreeForm.getValue(app, "frfCsrShregAlt", "SCH_YEAR_RCD");
					util.DataMap.setValue(app, "dmDateMain", "YEAR", vsYear);
					
					var vsSmt = util.FreeForm.getValue(app, "frfCsrShregAlt", "SMT_RCD");
					util.DataMap.setValue(app, "dmDateMain", "SMT", vsSmt);
					
					var vsAltDt = util.FreeForm.getValue(app, "frfCsrShregAlt", "ALT_DT");
					util.DataMap.setValue(app, "dmDateMain", "ALT_DT", vsAltDt);
					
					if (!ValueUtil.isNull(vsYear) && !ValueUtil.isNull(vsSmt) && !ValueUtil.isNull(vsAltDt)) {
						// 학사력 추출.
						doChangeDate();
					}
				};
				
				 /**
				 * @desc  환불정보 조회
				 * @param
				 * @return void
				 * @author Choi In Seong 2016. 02. 19.
				 */
				function doChangeDate() {
					
					//strCommand: refList 
					util.Submit.send(app, "subRefList", function(pbSuccess) {
						if (pbSuccess) {
							var strRefSchYearRcd = util.DataMap.getValue(app, "dmDateMain", "strRefSchYearRcd");
							var strRefSmtRcd = util.DataMap.getValue(app, "dmDateMain", "strRefSmtRcd");
							var strRefCiiDt = util.DataMap.getValue(app, "dmDateMain", "strRefCiiDt");
							
							util.FreeForm.setValue(app, "frfCsrShregAlt", "REFUND_SCH_YEAR_RCD", strRefSchYearRcd);
							util.FreeForm.setValue(app, "frfCsrShregAlt", "REFUND_SMT_RCD", strRefSmtRcd);
							util.FreeForm.setValue(app, "frfCsrShregAlt", "REFUND_CII_DT", strRefCiiDt);
							util.Control.redraw(app, ["cbbFrfRefundSchYearRcd", "cbbFrfRefundSmtRcd", "dipFrfRefundCiiDt"]);
							util.Control.redraw(app, ["rptRefundItem"]);
						} else {
							util.FreeForm.setValue(app, "frfCsrShregAlt", "REFUND_SCH_YEAR_RCD", "");
							util.FreeForm.setValue(app, "frfCsrShregAlt", "REFUND_SMT_RCD", "");
							util.FreeForm.setValue(app, "frfCsrShregAlt", "REFUND_CII_DT", "");
							util.Control.redraw(app, ["cbbFrfRefundSchYearRcd", "cbbFrfRefundSmtRcd", "dipFrfRefundCiiDt"]);
							util.Control.redraw(app, ["rptRefundItem"]);
							ExtModel.dispatch("btnCloseCancel", "DOMActivate");
						}
					});
					
				};
				
				return moPage;
			};;
			// End - User Script
			
			// Header
			var dataSet_1 = new cpr.data.DataSet("dsRefundItem");
			dataSet_1.parseData({
				"columns": [
					{"name": "ITEM_CD"},
					{"name": "REFUND_RATE_DEN"},
					{"name": "REFUND_RATE_NUR"},
					{"name": "REFUND_AMT"},
					{"name": "REFUND_RATE"}
				],
				"rows": []
			});
			app.register(dataSet_1);
			
			var dataSet_2 = new cpr.data.DataSet("dsReasonList");
			dataSet_2.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_2);
			
			var dataSet_3 = new cpr.data.DataSet("dsRefundBankRcdList");
			dataSet_3.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_3);
			
			var dataSet_4 = new cpr.data.DataSet("dsRefundRateRcdList");
			dataSet_4.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_4);
			
			var dataSet_5 = new cpr.data.DataSet("dsSchYearList");
			dataSet_5.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_5);
			
			var dataSet_6 = new cpr.data.DataSet("dsSmtList");
			dataSet_6.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_6);
			
			var dataSet_7 = new cpr.data.DataSet("dsSmtCrsList");
			dataSet_7.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_7);
			
			var dataSet_8 = new cpr.data.DataSet("dsListItemCd");
			dataSet_8.parseData({
				"columns": [
					{"name": "ITEM_CD"},
					{"name": "ITEM_NM"}
				],
				"rows": []
			});
			app.register(dataSet_8);
			var dataMap_1 = new cpr.data.DataMap("dmReqKey");
			dataMap_1.parseData({
				"columns" : [
					{
						"name": "strStudId",
						"dataType": "string"
					},
					{
						"name": "strPopTarget",
						"dataType": "string"
					},
					{
						"name": "strStudNo",
						"dataType": "string"
					},
					{
						"name": "strStudInfo",
						"dataType": "string"
					},
					{
						"name": "strHeaderCourse",
						"dataType": "string"
					},
					{
						"name": "strSchYearRcd",
						"dataType": "string"
					},
					{
						"name": "intStep",
						"dataType": "string"
					},
					{
						"name": "strPageId",
						"dataType": "string"
					},
					{
						"name": "stdPgmNm",
						"dataType": "string"
					},
					{
						"name": "strSmtRcd",
						"dataType": "string"
					}
				]
			});
			app.register(dataMap_1);
			
			var dataMap_2 = new cpr.data.DataMap("dmCsrShregAlt");
			dataMap_2.parseData({
				"columns" : [
					{
						"name": "STUD_ID",
						"dataType": "string"
					},
					{
						"name": "ALT_DIV_RCD",
						"dataType": "string"
					},
					{
						"name": "SERIAL_NO",
						"dataType": "string"
					},
					{
						"name": "SCH_YEAR_RCD",
						"dataType": "string"
					},
					{
						"name": "SMT_RCD",
						"dataType": "string"
					},
					{
						"name": "ALT_RSN_DIV_RCD",
						"dataType": "string"
					},
					{
						"name": "ALT_RSN_RCD",
						"dataType": "string"
					},
					{
						"name": "ALT_DT",
						"dataType": "string"
					},
					{
						"name": "CANCEL_DT",
						"dataType": "string"
					},
					{
						"name": "CANCEL_RSN_RCD",
						"dataType": "string"
					},
					{
						"name": "ABS_SMT_CNT_RCD",
						"dataType": "string"
					},
					{
						"name": "CST_DT",
						"dataType": "string"
					},
					{
						"name": "REF_KEY",
						"dataType": "string"
					},
					{
						"name": "UREF_KEY",
						"dataType": "string"
					},
					{
						"name": "CHG_DESC",
						"dataType": "string"
					},
					{
						"name": "CHG_BEF_DESC",
						"dataType": "string"
					},
					{
						"name": "ENROLL_SHREG_KEY",
						"dataType": "string"
					},
					{
						"name": "REMARK",
						"dataType": "string"
					},
					{
						"name": "REG_TRANS_RCD",
						"dataType": "string"
					},
					{
						"name": "REG_TRANS_AMT",
						"dataType": "string"
					},
					{
						"name": "REC_RCOG_YN",
						"dataType": "string"
					},
					{
						"name": "REFUND_SCH_YEAR_RCD",
						"dataType": "string"
					},
					{
						"name": "REFUND_SMT_RCD",
						"dataType": "string"
					},
					{
						"name": "REFUND_BANK_RCD",
						"dataType": "string"
					},
					{
						"name": "REFUND_ACCT_NO",
						"dataType": "string"
					},
					{
						"name": "REFUND_ACCT_HLD",
						"dataType": "string"
					},
					{
						"name": "REFUND_CII_DT",
						"dataType": "string"
					}
				]
			});
			app.register(dataMap_2);
			
			var dataMap_3 = new cpr.data.DataMap("dmResOnLoad");
			dataMap_3.parseData({
				"columns" : [
					{
						"name": "CurrentDate",
						"dataType": "string"
					},
					{
						"name": "subPageNm",
						"dataType": "string"
					}
				]
			});
			app.register(dataMap_3);
			
			var dataMap_4 = new cpr.data.DataMap("dmInteractiveMsg");
			dataMap_4.parseData({
				"columns" : [
					{
						"name": "intStep",
						"dataType": "string"
					},
					{
						"name": "strMsg",
						"dataType": "string"
					}
				]
			});
			app.register(dataMap_4);
			
			var dataMap_5 = new cpr.data.DataMap("dmDateMain");
			dataMap_5.parseData({
				"columns" : [
					{
						"name": "YEAR",
						"dataType": "string"
					},
					{
						"name": "SMT",
						"dataType": "string"
					},
					{
						"name": "ALT_DT",
						"dataType": "string"
					},
					{
						"name": "strRefSchYearRcd",
						"dataType": "string"
					},
					{
						"name": "strRefSmtRcd",
						"dataType": "string"
					},
					{
						"name": "strRefCiiDt",
						"dataType": "string"
					}
				]
			});
			app.register(dataMap_5);
			var submission_1 = new cpr.protocols.Submission("subOnLoad");
			submission_1.action = "/csr/ExtCsrMstAltWith/";
			submission_1.mediaType = "application/x-www-form-urlencoded";
			submission_1.addRequestData(dataMap_1);
			submission_1.addResponseData(dataSet_5, false);
			submission_1.addResponseData(dataSet_6, false);
			submission_1.addResponseData(dataSet_2, false);
			submission_1.addResponseData(dataMap_3, false);
			submission_1.addResponseData(dataSet_3, false);
			submission_1.addResponseData(dataSet_4, false);
			submission_1.addResponseData(dataSet_7, false);
			submission_1.addResponseData(dataSet_8, false);
			app.register(submission_1);
			
			var submission_2 = new cpr.protocols.Submission("subSave");
			submission_2.action = "/csr/ExtCsrMstAltWith/";
			submission_2.mediaType = "application/x-www-form-urlencoded";
			submission_2.addRequestData(dataMap_1);
			submission_2.addRequestData(dataMap_4);
			submission_2.addResponseData(dataMap_4, false);
			app.register(submission_2);
			
			var submission_3 = new cpr.protocols.Submission("subMstAltPopupMnu");
			submission_3.action = "/csr/StdCsrMstAlt/";
			submission_3.mediaType = "application/x-www-form-urlencoded";
			submission_3.addRequestData(dataMap_1);
			app.register(submission_3);
			
			var submission_4 = new cpr.protocols.Submission("subRefList");
			submission_4.action = "/csr/ExtCsrMstAltWith/";
			submission_4.mediaType = "application/x-www-form-urlencoded";
			submission_4.addRequestData(dataMap_5);
			submission_4.addRequestData(dataMap_1);
			submission_4.addResponseData(dataMap_5, false);
			submission_4.addResponseData(dataSet_1, false);
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
			var group_1 = new cpr.controls.Container("grpData");
			// Layout
			var xYLayout_2 = new cpr.controls.layouts.XYLayout();
			group_1.setLayout(xYLayout_2);
			(function(container){
				var userDefinedControl_1 = linker.userDefinedControl_1 = new udc.com.comTitle();
				userDefinedControl_1.ctrl = app.lookup("grdCsrShregAlt");
				userDefinedControl_1.bind("title").toLanguage("UI-SCR-REMNEWMK");
				container.addChild(userDefinedControl_1, {
					"top": "90px",
					"left": "5px",
					"width": "250px",
					"height": "25px"
				});
				var group_2 = new cpr.controls.Container("frfCsrShregAlt");
				group_2.style.setClasses(["form-box"]);
				// Layout
				var xYLayout_3 = new cpr.controls.layouts.XYLayout();
				group_2.setLayout(xYLayout_3);
				(function(container){
					var output_1 = new cpr.controls.Output("optFrfSchYearRcd");
					output_1.value = "";
					output_1.style.setClasses(["require"]);
					output_1.bind("value").toLanguage("UI-SCR-REMYEAR");
					container.addChild(output_1, {
						"top": "5px",
						"left": "5px",
						"width": "110px",
						"height": "25px"
					});
					var comboBox_1 = new cpr.controls.ComboBox("cbbFrfSchYearRcd");
					comboBox_1.userAttr({"require": "Y"});
					comboBox_1.bind("fieldLabel").toExpression("#optFrfSchYearRcd.value");
					comboBox_1.bind("value").toDataMap(app.lookup("dmCsrShregAlt"), "SCH_YEAR_RCD");
					(function(comboBox_1){
						comboBox_1.setItemSet(app.lookup("dsSchYearList"), {
							"label": "CD_NM",
							"value": "CD"
						});
					})(comboBox_1);
					if(typeof onCbbFrfSchYearRcdSelectionChange == "function") {
						comboBox_1.addEventListener("selection-change", onCbbFrfSchYearRcdSelectionChange);
					}
					container.addChild(comboBox_1, {
						"top": "5px",
						"left": "120px",
						"width": "165px",
						"height": "25px"
					});
					var inputBox_1 = new cpr.controls.InputBox("ipbFrfStudIdRtn");
					inputBox_1.visible = false;
					inputBox_1.bind("value").toDataMap(app.lookup("dmCsrShregAlt"), "STUD_ID");
					container.addChild(inputBox_1, {
						"top": "30px",
						"left": "530px",
						"width": "10px",
						"height": "25px"
					});
					var inputBox_2 = new cpr.controls.InputBox("iptFrfSerialNoRtn");
					inputBox_2.visible = false;
					inputBox_2.bind("value").toDataMap(app.lookup("dmCsrShregAlt"), "SERIAL_NO");
					container.addChild(inputBox_2, {
						"top": "30px",
						"left": "545px",
						"width": "10px",
						"height": "25px"
					});
					var output_2 = new cpr.controls.Output("optFrfAltDt");
					output_2.value = "";
					output_2.style.setClasses(["require"]);
					output_2.bind("value").toLanguage("UI-SCR-SCHREGCHGDT");
					container.addChild(output_2, {
						"top": "30px",
						"left": "295px",
						"width": "110px",
						"height": "25px"
					});
					var dateInput_1 = new cpr.controls.DateInput("dipFrfAltDt");
					dateInput_1.format = "YYYY-MM-DD";
					dateInput_1.userAttr({"require": "Y"});
					dateInput_1.bind("fieldLabel").toExpression("#optFrfAltDt.value");
					dateInput_1.bind("value").toDataMap(app.lookup("dmCsrShregAlt"), "ALT_DT");
					if(typeof onDipFrfAltDtValueChange == "function") {
						dateInput_1.addEventListener("value-change", onDipFrfAltDtValueChange);
					}
					container.addChild(dateInput_1, {
						"top": "30px",
						"left": "410px",
						"width": "90px",
						"height": "25px"
					});
					var output_3 = new cpr.controls.Output("optFrfSmtRcd");
					output_3.value = "";
					output_3.style.setClasses(["require"]);
					output_3.bind("value").toLanguage("UI-SCR-REMSMT");
					container.addChild(output_3, {
						"top": "5px",
						"left": "295px",
						"width": "110px",
						"height": "25px"
					});
					var comboBox_2 = new cpr.controls.ComboBox("cbbFrfSmtRcd");
					comboBox_2.userAttr({"require": "Y"});
					comboBox_2.bind("fieldLabel").toExpression("#optFrfSmtRcd.value");
					comboBox_2.bind("value").toDataMap(app.lookup("dmCsrShregAlt"), "SMT_RCD");
					(function(comboBox_2){
						comboBox_2.setItemSet(app.lookup("dsSmtList"), {
							"label": "CD_NM",
							"value": "CD"
						});
					})(comboBox_2);
					if(typeof onCbbFrfSmtRcdSelectionChange == "function") {
						comboBox_2.addEventListener("selection-change", onCbbFrfSmtRcdSelectionChange);
					}
					container.addChild(comboBox_2, {
						"top": "5px",
						"left": "410px",
						"width": "165px",
						"height": "25px"
					});
					var output_4 = new cpr.controls.Output("optFrfAltRsnRcd");
					output_4.value = "";
					output_4.style.setClasses(["require"]);
					output_4.bind("value").toLanguage("UI-SCR-REMRSN");
					container.addChild(output_4, {
						"top": "30px",
						"left": "5px",
						"width": "110px",
						"height": "25px"
					});
					var comboBox_3 = new cpr.controls.ComboBox("cbbFrfAltRsnRcd");
					comboBox_3.userAttr({"require": "Y"});
					comboBox_3.bind("fieldLabel").toExpression("#optFrfAltRsnRcd.value");
					comboBox_3.bind("value").toDataMap(app.lookup("dmCsrShregAlt"), "ALT_RSN_RCD");
					(function(comboBox_3){
						comboBox_3.setItemSet(app.lookup("dsReasonList"), {
							"label": "CD_NM",
							"value": "CD"
						});
					})(comboBox_3);
					container.addChild(comboBox_3, {
						"top": "30px",
						"left": "120px",
						"width": "165px",
						"height": "25px"
					});
					var output_5 = new cpr.controls.Output("optFrfRemark");
					output_5.value = "";
					output_5.bind("value").toLanguage("UI-GLS-REMARK");
					container.addChild(output_5, {
						"top": "55px",
						"left": "5px",
						"width": "110px",
						"height": "25px"
					});
					var inputBox_3 = new cpr.controls.InputBox("ipbFrfRemark");
					inputBox_3.maxLength = 300;
					inputBox_3.bind("fieldLabel").toExpression("#optFrfRemark.value");
					inputBox_3.bind("value").toDataMap(app.lookup("dmCsrShregAlt"), "REMARK");
					container.addChild(inputBox_3, {
						"top": "55px",
						"left": "120px",
						"width": "455px",
						"height": "25px"
					});
					var dateInput_2 = new cpr.controls.DateInput("dipFrfRefundCiiDt");
					dateInput_2.enabled = false;
					dateInput_2.format = "YYYY-MM-DD";
					dateInput_2.bind("fieldLabel").toExpression("#optFrfRefundCiiDt.value");
					dateInput_2.bind("value").toDataMap(app.lookup("dmCsrShregAlt"), "REFUND_CII_DT");
					container.addChild(dateInput_2, {
						"top": "140px",
						"left": "410px",
						"width": "90px",
						"height": "25px"
					});
					var output_6 = new cpr.controls.Output("optFrfRefundCiiDt");
					output_6.value = "";
					output_6.bind("value").toLanguage("UI-SCR-RFDSTDT");
					container.addChild(output_6, {
						"top": "140px",
						"left": "295px",
						"width": "110px",
						"height": "25px"
					});
					var comboBox_4 = new cpr.controls.ComboBox("cbbFrfRefundSmtRcd");
					comboBox_4.enabled = false;
					comboBox_4.bind("fieldLabel").toExpression("#optFrfRefundSmtRcd.value");
					comboBox_4.bind("value").toDataMap(app.lookup("dmCsrShregAlt"), "REFUND_SMT_RCD");
					(function(comboBox_4){
						comboBox_4.setItemSet(app.lookup("dsSmtCrsList"), {
							"label": "CD_NM",
							"value": "CD"
						});
					})(comboBox_4);
					container.addChild(comboBox_4, {
						"top": "165px",
						"left": "410px",
						"width": "165px",
						"height": "25px"
					});
					var output_7 = new cpr.controls.Output("optFrfRefundSmtRcd");
					output_7.value = "";
					output_7.bind("value").toLanguage("UI-SCR-REFUNDSMT");
					container.addChild(output_7, {
						"top": "165px",
						"left": "295px",
						"width": "110px",
						"height": "25px"
					});
					var comboBox_5 = new cpr.controls.ComboBox("cbbFrfRefundSchYearRcd");
					comboBox_5.enabled = false;
					comboBox_5.bind("fieldLabel").toExpression("#optFrfRefundSchYearRcd.value");
					comboBox_5.bind("value").toDataMap(app.lookup("dmCsrShregAlt"), "REFUND_SCH_YEAR_RCD");
					(function(comboBox_5){
						comboBox_5.setItemSet(app.lookup("dsSchYearList"), {
							"label": "CD_NM",
							"value": "CD"
						});
					})(comboBox_5);
					container.addChild(comboBox_5, {
						"top": "165px",
						"left": "120px",
						"width": "165px",
						"height": "25px"
					});
					var output_8 = new cpr.controls.Output("optFrfRefundSchYearRcd");
					output_8.value = "";
					output_8.bind("value").toLanguage("UI-SCR-REFUNDSCHYEAR");
					container.addChild(output_8, {
						"top": "165px",
						"left": "5px",
						"width": "110px",
						"height": "25px"
					});
					var inputBox_4 = new cpr.controls.InputBox("ipbFrfRefundAcctHld");
					inputBox_4.maxLength = 100;
					inputBox_4.bind("fieldLabel").toExpression("#optFrfRefundAcctHld.value");
					inputBox_4.bind("value").toDataMap(app.lookup("dmCsrShregAlt"), "REFUND_ACCT_HLD");
					container.addChild(inputBox_4, {
						"top": "115px",
						"left": "410px",
						"width": "165px",
						"height": "25px"
					});
					var output_9 = new cpr.controls.Output("optFrfRefundAcctHld1");
					output_9.value = "";
					output_9.bind("value").toLanguage("UI-SCR-RTRNWHY");
					container.addChild(output_9, {
						"top": "115px",
						"left": "295px",
						"width": "110px",
						"height": "25px"
					});
					var numberEditor_1 = new cpr.controls.NumberEditor("ipbFrfRefundAcctNo");
					numberEditor_1.format = "99,999,999,999,999,999,999,999,999,999,999,999,999,999,999,999,999";
					numberEditor_1.bind("fieldLabel").toExpression("#optFrfRefundAcctNo.value");
					numberEditor_1.bind("value").toDataMap(app.lookup("dmCsrShregAlt"), "REFUND_ACCT_NO");
					container.addChild(numberEditor_1, {
						"top": "140px",
						"left": "120px",
						"width": "165px",
						"height": "25px"
					});
					var output_10 = new cpr.controls.Output("optFrfRefundAcctNo1");
					output_10.value = "";
					output_10.bind("value").toLanguage("UI-SCR-REFUNDACCTNO");
					container.addChild(output_10, {
						"top": "140px",
						"left": "5px",
						"width": "110px",
						"height": "25px"
					});
					var comboBox_6 = new cpr.controls.ComboBox("cbbFrfRefundBankRcd");
					comboBox_6.bind("fieldLabel").toExpression("#optFrfRefundBankRcd.value");
					comboBox_6.bind("value").toDataMap(app.lookup("dmCsrShregAlt"), "REFUND_BANK_RCD");
					(function(comboBox_6){
						comboBox_6.setItemSet(app.lookup("dsRefundBankRcdList"), {
							"label": "CD_NM",
							"value": "CD"
						});
					})(comboBox_6);
					container.addChild(comboBox_6, {
						"top": "115px",
						"left": "120px",
						"width": "165px",
						"height": "25px"
					});
					var output_11 = new cpr.controls.Output("optFrfRefundBankCd1");
					output_11.value = "";
					output_11.bind("value").toLanguage("UI-SCR-REFUNDBANK");
					container.addChild(output_11, {
						"top": "115px",
						"left": "5px",
						"width": "110px",
						"height": "25px"
					});
				})(group_2);
				container.addChild(group_2, {
					"top": "115px",
					"left": "5px",
					"width": "581px",
					"height": "191px"
				});
				var group_3 = new cpr.controls.Container("frfStudInfo");
				group_3.style.setClasses(["form-box"]);
				// Layout
				var xYLayout_4 = new cpr.controls.layouts.XYLayout();
				group_3.setLayout(xYLayout_4);
				(function(container){
					var output_12 = new cpr.controls.Output("optCourse");
					output_12.value = "";
					output_12.bind("value").toLanguage("UI-GLS-CRS");
					container.addChild(output_12, {
						"top": "55px",
						"left": "5px",
						"width": "110px",
						"height": "25px"
					});
					var output_13 = new cpr.controls.Output("optCourse");
					output_13.value = "";
					output_13.bind("value").toDataMap(app.lookup("dmReqKey"), "strHeaderCourse");
					container.addChild(output_13, {
						"top": "55px",
						"left": "120px",
						"width": "455px",
						"height": "25px"
					});
					var output_14 = new cpr.controls.Output("optStud");
					output_14.value = "";
					output_14.bind("value").toDataMap(app.lookup("dmReqKey"), "strStudInfo");
					container.addChild(output_14, {
						"top": "30px",
						"left": "120px",
						"width": "455px",
						"height": "25px"
					});
					var output_15 = new cpr.controls.Output("optStudNm");
					output_15.value = "";
					output_15.bind("value").toLanguage("UI-GLS-PER_NM");
					container.addChild(output_15, {
						"top": "30px",
						"left": "5px",
						"width": "110px",
						"height": "25px"
					});
					var output_16 = new cpr.controls.Output("optStudNo");
					output_16.value = "";
					output_16.bind("value").toLanguage("UI-GLS-STUD_ID");
					container.addChild(output_16, {
						"top": "5px",
						"left": "5px",
						"width": "110px",
						"height": "25px"
					});
					var output_17 = new cpr.controls.Output("optStudNo");
					output_17.value = "";
					output_17.bind("value").toDataMap(app.lookup("dmReqKey"), "strStudNo");
					container.addChild(output_17, {
						"top": "5px",
						"left": "120px",
						"width": "455px",
						"height": "25px"
					});
				})(group_3);
				container.addChild(group_3, {
					"top": "5px",
					"left": "5px",
					"width": "580px",
					"height": "80px"
				});
				var grid_1 = linker.grid_1 = new cpr.controls.Grid("grdRefundItem");
				grid_1.init({
					"dataSet": app.lookup("dsRefundItem"),
					"columns": [
						{"width": "40px"},
						{"width": "100px"},
						{"width": "150px"},
						{"width": "100px"}
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
									cell.bind("text").toLanguage("UI-DB-GUD_PROF");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 2},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-SCR-GUDPROF");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 3},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-DB-END_DT");
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
									cell.columnName = "ITEM_CD";
									cell.control = (function(){
										var comboBox_7 = new cpr.controls.ComboBox("gdCbbRefundItem");
										comboBox_7.enabled = false;
										comboBox_7.hideButton = true;
										(function(comboBox_7){
											comboBox_7.setItemSet(app.lookup("dsListItemCd"), {
												"label": "ITEM_NM",
												"value": "ITEM_CD"
											});
										})(comboBox_7);
										comboBox_7.bind("value").toDataColumn("ITEM_CD");
										return comboBox_7;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 2},
								"configurator": function(cell){
									cell.columnName = "REFUND_AMT";
									cell.control = (function(){
										var output_18 = new cpr.controls.Output("gdOptRefundAmt");
										output_18.dataType = "number";
										output_18.format = "s#,##0";
										output_18.style.css({
											"text-align" : "right"
										});
										output_18.bind("value").toDataColumn("REFUND_AMT");
										return output_18;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 3},
								"configurator": function(cell){
									cell.columnName = "REFUND_RATE";
									cell.style.css({
										"text-align" : "center"
									});
								}
							}
						]
					}
				});
				container.addChild(grid_1, {
					"top": "335px",
					"left": "5px",
					"width": "580px",
					"height": "120px"
				});
			})(group_1);
			container.addChild(group_1, {
				"top": "35px",
				"left": "5px",
				"width": "590px",
				"height": "460px"
			});
			
			var button_1 = new cpr.controls.Button("btnCloseCancel");
			button_1.value = "";
			button_1.bind("value").toLanguage("UI-SCR-SCRNCLS");
			if(typeof onBtnCloseCancelClick == "function") {
				button_1.addEventListener("click", onBtnCloseCancelClick);
			}
			container.addChild(button_1, {
				"top": "500px",
				"left": "5px",
				"width": "60px",
				"height": "25px"
			});
			
			var userDefinedControl_2 = new udc.com.appHeader("appheader1");
			container.addChild(userDefinedControl_2, {
				"top": "5px",
				"right": "5px",
				"left": "5px",
				"height": "25px"
			});
			
			var button_2 = new cpr.controls.Button("btnSave");
			button_2.value = "";
			button_2.style.setClasses(["btn-save"]);
			button_2.bind("value").toLanguage("UI-SCR-WRKSAVE");
			if(typeof onBtnSaveClick == "function") {
				button_2.addEventListener("click", onBtnSaveClick);
			}
			container.addChild(button_2, {
				"top": "500px",
				"left": "535px",
				"width": "60px",
				"height": "25px"
			});
			
			var userDefinedControl_3 = linker.userDefinedControl_3 = new udc.com.comTitle();
			userDefinedControl_3.ctrl = app.lookup("grdCsrShregAlt2");
			userDefinedControl_3.bind("title").toLanguage("UI-GLS-REFUND");
			container.addChild(userDefinedControl_3, {
				"top": "235px",
				"left": "10px",
				"width": "250px",
				"height": "25px"
			});
			
			var userDefinedControl_4 = linker.userDefinedControl_4 = new udc.com.comTitle();
			userDefinedControl_4.bind("title").toLanguage("UI-GLS-REFUND");
			container.addChild(userDefinedControl_4, {
				"top": "345px",
				"left": "10px",
				"width": "250px",
				"height": "25px"
			});
			if(typeof onBodyLoad == "function"){
				app.addEventListener("load", onBodyLoad);
			}
			// Linking
			linker.userDefinedControl_4.ctrl = linker.grid_1;
		}
	});
	app.title = "제적 - 신규";
	cpr.core.Platform.INSTANCE.register(app);
})();
