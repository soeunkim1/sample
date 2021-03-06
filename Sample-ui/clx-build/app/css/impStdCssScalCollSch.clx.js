/*
 * App URI: app/css/impStdCssScalCollSch
 * Source Location: app/css/impStdCssScalCollSch.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("app/css/impStdCssScalCollSch", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			
			// Header
			var dataSet_1 = new cpr.data.DataSet("dsYearList");
			dataSet_1.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_1);
			
			var dataSet_2 = new cpr.data.DataSet("dsSmtList");
			dataSet_2.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_2);
			
			var dataSet_3 = new cpr.data.DataSet("dsListScalFeeCls1");
			dataSet_3.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_3);
			
			var dataSet_4 = new cpr.data.DataSet("dsListScalFeeCls2");
			dataSet_4.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_4);
			
			var dataSet_5 = new cpr.data.DataSet("dsListScalFeeCls3");
			dataSet_5.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_5);
			
			var dataSet_6 = new cpr.data.DataSet("dsListScalFeeCls4");
			dataSet_6.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_6);
			
			var dataSet_7 = new cpr.data.DataSet("dsListScalFeeCls5");
			dataSet_7.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_7);
			
			var dataSet_8 = new cpr.data.DataSet("dsListPrcdStatRcd");
			dataSet_8.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_8);
			
			var dataSet_9 = new cpr.data.DataSet("dsListPmntDivRcd");
			dataSet_9.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_9);
			
			var dataSet_10 = new cpr.data.DataSet("dsListPmntItvRcd");
			dataSet_10.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_10);
			var dataMap_1 = new cpr.data.DataMap("dmReqKey");
			dataMap_1.parseData({
				"columns" : [
					{
						"name": "strScalFeeCls1",
						"dataType": "string"
					},
					{
						"name": "strScalFeeCls2",
						"dataType": "string"
					},
					{
						"name": "strScalFeeCls3",
						"dataType": "string"
					},
					{
						"name": "strScalFeeCls4",
						"dataType": "string"
					},
					{
						"name": "strScalFeeCls5",
						"dataType": "string"
					},
					{
						"name": "strPmntDivRcd",
						"dataType": "string"
					},
					{
						"name": "strPmntItvRcd",
						"dataType": "string"
					},
					{
						"name": "strUnitSystem",
						"dataType": "string"
					},
					{
						"name": "strDeptCd",
						"dataType": "string"
					},
					{
						"name": "strDeptNm",
						"dataType": "string"
					},
					{
						"name": "strDeptObjDivRcd",
						"dataType": "string"
					},
					{
						"name": "strScalFeeCd",
						"dataType": "string"
					},
					{
						"name": "strScalFeeNm",
						"dataType": "string"
					},
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
			
			var dataMap_3 = new cpr.data.DataMap("dmDateChg");
			dataMap_3.parseData({
				"columns" : [{
					"name": "SMT",
					"dataType": "string"
				}]
			});
			app.register(dataMap_3);
			
			var dataMap_4 = new cpr.data.DataMap("dmResOnLoad");
			dataMap_4.parseData({
				"columns" : [{
					"name": "strDefLanDivRcd",
					"dataType": "string"
				}]
			});
			app.register(dataMap_4);
			var submission_1 = new cpr.protocols.Submission("subOnLoadCollImp");
			submission_1.action = "/css/StdCssScalCollSch/";
			submission_1.mediaType = "application/x-www-form-urlencoded";
			submission_1.addResponseData(dataSet_1, false);
			submission_1.addResponseData(dataSet_2, false);
			submission_1.addResponseData(dataSet_4, false);
			submission_1.addResponseData(dataSet_5, false);
			submission_1.addResponseData(dataSet_6, false);
			submission_1.addResponseData(dataSet_8, false);
			submission_1.addResponseData(dataSet_3, false);
			submission_1.addResponseData(dataSet_9, false);
			submission_1.addResponseData(dataSet_7, false);
			submission_1.addResponseData(dataSet_10, false);
			submission_1.addResponseData(dataMap_2, false);
			submission_1.addResponseData(dataMap_4, false);
			app.register(submission_1);
			
			var submission_2 = new cpr.protocols.Submission("subDateCollImp");
			submission_2.action = "/css/StdCssDateTime/";
			submission_2.mediaType = "application/x-www-form-urlencoded";
			submission_2.addRequestData(dataMap_1);
			submission_2.addRequestData(dataMap_2);
			submission_2.addRequestData(dataMap_3);
			submission_2.addResponseData(dataMap_2, false);
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
			var comboBox_1 = new cpr.controls.ComboBox("cbbSchYearImp");
			comboBox_1.userAttr({"require": "Y"});
			comboBox_1.bind("fieldLabel").toExpression("#optSchYearImp.value");
			comboBox_1.bind("value").toDataMap(app.lookup("dmDate"), "YEAR");
			(function(comboBox_1){
				comboBox_1.setItemSet(app.lookup("dsYearList"), {
					"label": "CD_NM",
					"value": "CD"
				});
			})(comboBox_1);
			if(typeof onCbbSchYearImpSelectionChange == "function") {
				comboBox_1.addEventListener("selection-change", onCbbSchYearImpSelectionChange);
			}
			container.addChild(comboBox_1, {
				"top": "0px",
				"left": "85px",
				"width": "130px",
				"height": "25px"
			});
			
			var output_1 = new cpr.controls.Output("optSchYearImp");
			output_1.value = "";
			output_1.style.setClasses(["require"]);
			output_1.bind("value").toLanguage("UI-GLS-SCH_YEAR");
			container.addChild(output_1, {
				"top": "0px",
				"left": "0px",
				"width": "80px",
				"height": "25px"
			});
			
			var output_2 = new cpr.controls.Output("optSmtImp");
			output_2.value = "";
			output_2.style.setClasses(["require"]);
			output_2.bind("value").toLanguage("UI-GLS-SMT");
			container.addChild(output_2, {
				"top": "0px",
				"left": "225px",
				"width": "80px",
				"height": "25px"
			});
			
			var comboBox_2 = new cpr.controls.ComboBox("cbbSmtImp");
			comboBox_2.userAttr({"require": "Y"});
			comboBox_2.bind("fieldLabel").toExpression("#optSmtImp.value");
			comboBox_2.bind("value").toDataMap(app.lookup("dmDate"), "SMT");
			(function(comboBox_2){
				comboBox_2.setItemSet(app.lookup("dsSmtList"), {
					"label": "CD_NM",
					"value": "CD"
				});
			})(comboBox_2);
			if(typeof onCbbSmtImpSelectionChange == "function") {
				comboBox_2.addEventListener("selection-change", onCbbSmtImpSelectionChange);
			}
			container.addChild(comboBox_2, {
				"top": "0px",
				"left": "310px",
				"width": "130px",
				"height": "25px"
			});
			
			var output_3 = new cpr.controls.Output("optDeptNmImp");
			output_3.value = "";
			output_3.style.setClasses(["require"]);
			output_3.bind("value").toLanguage("UI-GLS-ASGN");
			container.addChild(output_3, {
				"top": "0px",
				"left": "450px",
				"width": "80px",
				"height": "25px"
			});
			
			var inputBox_1 = new cpr.controls.InputBox("ipbDeptNmImp");
			inputBox_1.maxLength = 50;
			inputBox_1.userAttr({"require": "Y"});
			inputBox_1.bind("fieldLabel").toExpression("#optDeptNmImp.value");
			inputBox_1.bind("value").toDataMap(app.lookup("dmReqKey"), "strDeptNm");
			if(typeof onIpbDeptNmImpValueChange == "function") {
				inputBox_1.addEventListener("value-change", onIpbDeptNmImpValueChange);
			}
			container.addChild(inputBox_1, {
				"top": "0px",
				"left": "535px",
				"width": "140px",
				"height": "25px"
			});
			
			var button_1 = new cpr.controls.Button("btnDeptNmPopImp");
			button_1.value = "";
			button_1.style.setClasses(["btn-pop-search"]);
			if(typeof onBtnDeptNmPopImpClick == "function") {
				button_1.addEventListener("click", onBtnDeptNmPopImpClick);
			}
			container.addChild(button_1, {
				"top": "0px",
				"left": "675px",
				"width": "20px",
				"height": "25px"
			});
			
			var output_4 = new cpr.controls.Output("optScalFeeCls1Imp");
			output_4.value = "";
			output_4.bind("value").toLanguage("UI-SCR-SCRSDIV1");
			container.addChild(output_4, {
				"top": "25px",
				"left": "0px",
				"width": "80px",
				"height": "25px"
			});
			
			var comboBox_3 = new cpr.controls.ComboBox("cbbScalFeeCls1Imp");
			comboBox_3.bind("fieldLabel").toExpression("#optScalFeeCls1Imp.value");
			comboBox_3.bind("value").toDataMap(app.lookup("dmReqKey"), "strScalFeeCls1");
			(function(comboBox_3){
				comboBox_3.addItem(new cpr.controls.Item("??????", ""));
				comboBox_3.setItemSet(app.lookup("dsListScalFeeCls1"), {
					"label": "CD_NM",
					"value": "CD"
				});
			})(comboBox_3);
			container.addChild(comboBox_3, {
				"top": "25px",
				"left": "85px",
				"width": "130px",
				"height": "25px"
			});
			
			var output_5 = new cpr.controls.Output("optScalFeeCls2Imp");
			output_5.value = "";
			output_5.bind("value").toLanguage("UI-SCR-SCRSDIV2");
			container.addChild(output_5, {
				"top": "25px",
				"left": "225px",
				"width": "80px",
				"height": "25px"
			});
			
			var comboBox_4 = new cpr.controls.ComboBox("cbbScalFeeCls2Imp");
			comboBox_4.bind("fieldLabel").toExpression("#optScalFeeCls2Imp.value");
			comboBox_4.bind("value").toDataMap(app.lookup("dmReqKey"), "strScalFeeCls2");
			(function(comboBox_4){
				comboBox_4.addItem(new cpr.controls.Item("??????", ""));
				comboBox_4.setItemSet(app.lookup("dsListScalFeeCls2"), {
					"label": "CD_NM",
					"value": "CD"
				});
			})(comboBox_4);
			container.addChild(comboBox_4, {
				"top": "25px",
				"left": "310px",
				"width": "130px",
				"height": "25px"
			});
			
			var output_6 = new cpr.controls.Output("optScalFeeCls3Imp");
			output_6.value = "";
			output_6.bind("value").toLanguage("UI-SCR-SCRSDIV3");
			container.addChild(output_6, {
				"top": "25px",
				"left": "450px",
				"width": "80px",
				"height": "25px"
			});
			
			var comboBox_5 = new cpr.controls.ComboBox("cbbScalFeeCls3Imp");
			comboBox_5.bind("fieldLabel").toExpression("#optScalFeeCls3Imp.value");
			comboBox_5.bind("value").toDataMap(app.lookup("dmReqKey"), "strScalFeeCls3");
			(function(comboBox_5){
				comboBox_5.addItem(new cpr.controls.Item("??????", ""));
				comboBox_5.setItemSet(app.lookup("dsListScalFeeCls3"), {
					"label": "CD_NM",
					"value": "CD"
				});
			})(comboBox_5);
			if(typeof onCbbScalFeeCls3ImpSelectionChange == "function") {
				comboBox_5.addEventListener("selection-change", onCbbScalFeeCls3ImpSelectionChange);
			}
			container.addChild(comboBox_5, {
				"top": "25px",
				"left": "535px",
				"width": "160px",
				"height": "25px"
			});
			
			var output_7 = new cpr.controls.Output("optScalFeeCls4Imp");
			output_7.value = "";
			output_7.bind("value").toLanguage("UI-SCR-SCRSDIV4");
			container.addChild(output_7, {
				"top": "25px",
				"left": "705px",
				"width": "80px",
				"height": "25px"
			});
			
			var comboBox_6 = new cpr.controls.ComboBox("cbbScalFeeCls4Imp");
			comboBox_6.bind("fieldLabel").toExpression("#optScalFeeCls4Imp.value");
			comboBox_6.bind("value").toDataMap(app.lookup("dmReqKey"), "strScalFeeCls4");
			(function(comboBox_6){
				comboBox_6.addItem(new cpr.controls.Item("??????", ""));
				comboBox_6.setItemSet(app.lookup("dsListScalFeeCls4"), {
					"label": "CD_NM",
					"value": "CD"
				});
			})(comboBox_6);
			container.addChild(comboBox_6, {
				"top": "25px",
				"left": "790px",
				"width": "130px",
				"height": "25px"
			});
			
			var output_8 = new cpr.controls.Output("optScalFeeCls5Imp");
			output_8.value = "";
			output_8.bind("value").toLanguage("UI-SCR-SCRSDIV5");
			container.addChild(output_8, {
				"top": "25px",
				"left": "927px",
				"width": "80px",
				"height": "25px"
			});
			
			var comboBox_7 = new cpr.controls.ComboBox("cbbScalFeeCls5Imp");
			comboBox_7.bind("fieldLabel").toExpression("#optScalFeeCls5Imp.value");
			comboBox_7.bind("value").toDataMap(app.lookup("dmReqKey"), "strScalFeeCls5");
			(function(comboBox_7){
				comboBox_7.addItem(new cpr.controls.Item("??????", ""));
				comboBox_7.setItemSet(app.lookup("dsListScalFeeCls5"), {
					"label": "CD_NM",
					"value": "CD"
				});
			})(comboBox_7);
			container.addChild(comboBox_7, {
				"top": "25px",
				"left": "1012px",
				"width": "130px",
				"height": "25px"
			});
			
			var output_9 = new cpr.controls.Output("optScalFeeNmImp");
			output_9.value = "";
			output_9.bind("value").toLanguage("UI-SCR-SCRS");
			container.addChild(output_9, {
				"top": "0px",
				"left": "927px",
				"width": "80px",
				"height": "25px"
			});
			
			var inputBox_2 = new cpr.controls.InputBox("ipbScalFeeNmImp");
			inputBox_2.maxLength = 50;
			inputBox_2.bind("fieldLabel").toExpression("#optScalFeeNmImp.value");
			inputBox_2.bind("value").toDataMap(app.lookup("dmReqKey"), "strScalFeeNm");
			if(typeof onIpbScalFeeNmImpValueChange == "function") {
				inputBox_2.addEventListener("value-change", onIpbScalFeeNmImpValueChange);
			}
			container.addChild(inputBox_2, {
				"top": "0px",
				"left": "1012px",
				"width": "110px",
				"height": "25px"
			});
			
			var button_2 = new cpr.controls.Button("btnScalFeeNmPopImp");
			button_2.value = "";
			button_2.style.setClasses(["btn-pop-search"]);
			if(typeof onBtnScalFeeNmPopImpClick == "function") {
				button_2.addEventListener("click", onBtnScalFeeNmPopImpClick);
			}
			container.addChild(button_2, {
				"top": "0px",
				"left": "1122px",
				"width": "20px",
				"height": "25px"
			});
			
			var output_10 = new cpr.controls.Output("optPmntDivImp");
			output_10.value = "";
			output_10.bind("value").toLanguage("UI-SCR-PMNTDIV");
			container.addChild(output_10, {
				"top": "50px",
				"left": "0px",
				"width": "80px",
				"height": "25px"
			});
			
			var comboBox_8 = new cpr.controls.ComboBox("cbbPmntDivImp");
			comboBox_8.bind("fieldLabel").toExpression("#optPmntDivImp.value");
			comboBox_8.bind("value").toDataMap(app.lookup("dmReqKey"), "strPmntDivRcd");
			(function(comboBox_8){
				comboBox_8.addItem(new cpr.controls.Item("??????", ""));
				comboBox_8.setItemSet(app.lookup("dsListPmntDivRcd"), {
					"label": "CD_NM",
					"value": "CD"
				});
			})(comboBox_8);
			container.addChild(comboBox_8, {
				"top": "50px",
				"left": "85px",
				"width": "130px",
				"height": "25px"
			});
			
			var output_11 = new cpr.controls.Output("optPmntItvRcdImp");
			output_11.value = "";
			output_11.bind("value").toLanguage("UI-SCR-PAYITV");
			container.addChild(output_11, {
				"top": "50px",
				"left": "225px",
				"width": "80px",
				"height": "25px"
			});
			
			var comboBox_9 = new cpr.controls.ComboBox("cbbPmntItvRcdImp");
			comboBox_9.bind("fieldLabel").toExpression("#optPmntItvRcdImp.value");
			comboBox_9.bind("value").toDataMap(app.lookup("dmReqKey"), "strPmntItvRcd");
			(function(comboBox_9){
				comboBox_9.addItem(new cpr.controls.Item("??????", ""));
				comboBox_9.setItemSet(app.lookup("dsListPmntItvRcd"), {
					"label": "CD_NM",
					"value": "CD"
				});
			})(comboBox_9);
			container.addChild(comboBox_9, {
				"top": "50px",
				"left": "310px",
				"width": "130px",
				"height": "25px"
			});
			
			var output_12 = new cpr.controls.Output("optStudIdImp");
			output_12.value = "";
			output_12.bind("value").toLanguage("UI-GLS-STUD_ID");
			container.addChild(output_12, {
				"top": "0px",
				"left": "705px",
				"width": "80px",
				"height": "25px"
			});
			
			var inputBox_3 = new cpr.controls.InputBox("ipbStudIdImp");
			inputBox_3.maxLength = 50;
			inputBox_3.bind("fieldLabel").toExpression("#optStudIdImp.value");
			inputBox_3.bind("value").toDataMap(app.lookup("dmReqKey"), "strStudNo");
			if(typeof onIpbStudIdImpValueChange == "function") {
				inputBox_3.addEventListener("value-change", onIpbStudIdImpValueChange);
			}
			container.addChild(inputBox_3, {
				"top": "0px",
				"left": "790px",
				"width": "110px",
				"height": "25px"
			});
			
			var button_3 = new cpr.controls.Button("btnSchStudIdPopImp");
			button_3.value = "";
			button_3.style.setClasses(["btn-pop-search"]);
			if(typeof onBtnSchStudIdPopImpClick == "function") {
				button_3.addEventListener("click", onBtnSchStudIdPopImpClick);
			}
			container.addChild(button_3, {
				"top": "0px",
				"left": "900px",
				"width": "20px",
				"height": "25px"
			});
			
			var embeddedApp_1 = new cpr.controls.EmbeddedApp("emaStdCssPScalFeeSch");
			cpr.core.App.load("app/css/impStdCssPScalFeePop", function(app) {
				if(app){
					embeddedApp_1.app = app;
				}
			});
			container.addChild(embeddedApp_1, {
				"top": "85px",
				"left": "225px",
				"width": "100px",
				"height": "25px"
			});
			
			var embeddedApp_2 = new cpr.controls.EmbeddedApp("emaStdCsrPStSch");
			cpr.core.App.load("app/csr/impStdCsrPStSearch", function(app) {
				if(app){
					embeddedApp_2.app = app;
				}
			});
			container.addChild(embeddedApp_2, {
				"top": "85px",
				"left": "0px",
				"width": "100px",
				"height": "25px"
			});
			
			var embeddedApp_3 = new cpr.controls.EmbeddedApp("emaStdCmnPobjSch");
			if(typeof onEmaStdCmnPobjSchAppReady == "function") {
				embeddedApp_3.addEventListener("app-ready", onEmaStdCmnPobjSchAppReady);
			}
			cpr.core.App.load("app/cmn/impStdCmnPObjSch", function(app) {
				if(app){
					embeddedApp_3.app = app;
				}
			});
			container.addChild(embeddedApp_3, {
				"top": "85px",
				"left": "110px",
				"width": "100px",
				"height": "25px"
			});
			
			var inputBox_4 = new cpr.controls.InputBox("ipbStudIdObjImp");
			inputBox_4.visible = false;
			inputBox_4.bind("fieldLabel").toExpression("#optStudIdImp.value");
			inputBox_4.bind("value").toDataMap(app.lookup("dmReqKey"), "strStudId");
			container.addChild(inputBox_4, {
				"top": "0px",
				"left": "919px",
				"width": "5px",
				"height": "25px"
			});
			
			var inputBox_5 = new cpr.controls.InputBox("ipbDeptCdImp");
			inputBox_5.visible = false;
			inputBox_5.bind("fieldLabel").toExpression("#optDeptNmImp.value");
			inputBox_5.bind("value").toDataMap(app.lookup("dmReqKey"), "strDeptCd");
			container.addChild(inputBox_5, {
				"top": "0px",
				"left": "697px",
				"width": "5px",
				"height": "25px"
			});
			
			var inputBox_6 = new cpr.controls.InputBox("ipbScalFeeCdImp");
			inputBox_6.visible = false;
			inputBox_6.bind("fieldLabel").toExpression("#optScalFeeNmImp.value");
			inputBox_6.bind("value").toDataMap(app.lookup("dmReqKey"), "strScalFeeCd");
			container.addChild(inputBox_6, {
				"top": "0px",
				"left": "1142px",
				"width": "5px",
				"height": "25px"
			});
			
			var inputBox_7 = new cpr.controls.InputBox("ipbDeptObjDivRcdImp");
			inputBox_7.visible = false;
			inputBox_7.bind("fieldLabel").toExpression("#optDeptNmImp.value");
			inputBox_7.bind("value").toDataMap(app.lookup("dmReqKey"), "strDeptObjDivRcd");
			container.addChild(inputBox_7, {
				"top": "0px",
				"left": "701px",
				"width": "5px",
				"height": "25px"
			});
		}
	});
	app.title = "impStdCssScalCollSch";
	cpr.core.Platform.INSTANCE.register(app);
})();
