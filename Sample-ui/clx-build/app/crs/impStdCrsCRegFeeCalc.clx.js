/*
 * App URI: app/crs/impStdCrsCRegFeeCalc
 * Source Location: app/crs/impStdCrsCRegFeeCalc.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("app/crs/impStdCrsCRegFeeCalc", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			
			// Header
			var dataSet_1 = new cpr.data.DataSet("dsListOptGrpCd");
			dataSet_1.parseData({
				"columns": [
					{"name": "OPT_GRP_CD"},
					{"name": "OPT_GRP_NM"},
					{"name": "PRCD_CD"}
				],
				"rows": []
			});
			app.register(dataSet_1);
			
			var dataSet_2 = new cpr.data.DataSet("dsListOptGrpCond");
			dataSet_2.parseData({
				"columns": [
					{"name": "PRT_ORD"},
					{"name": "LAN_DIV_RCD"},
					{"name": "NM_CONTROL_ID"},
					{"name": "OPT_GRP_CD"},
					{"name": "SRH_SCREEN_ID"},
					{"name": "INPUT_NM"},
					{"name": "INPUT_KEY"},
					{"name": "MAND_YN"},
					{"name": "CONTROL_ID"}
				],
				"rows": []
			});
			app.register(dataSet_2);
			
			var dataSet_3 = new cpr.data.DataSet("dsSimul");
			dataSet_3.parseData({
				"columns": [
					{"name": "STUD_ID"},
					{"name": "STUD_NO"},
					{"name": "BIRTHDAY"},
					{"name": "SSN"},
					{"name": "SA_NM"},
					{"name": "REP_NM"}
				],
				"rows": []
			});
			app.register(dataSet_3);
			var dataMap_1 = new cpr.data.DataMap("dmReqKey");
			dataMap_1.parseData({
				"columns" : [
					{
						"name": "strOptGrpCd",
						"dataType": "string"
					},
					{
						"name": "strStudIdFrom",
						"dataType": "string"
					},
					{
						"name": "strStudIdTo",
						"dataType": "string"
					},
					{
						"name": "strStudNoFrom",
						"dataType": "string"
					},
					{
						"name": "strStudNoTo",
						"dataType": "string"
					},
					{
						"name": "strUsePlcCd",
						"dataType": "string"
					},
					{
						"name": "strSfMethod",
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
			app.register(dataMap_1);
			var submission_1 = new cpr.protocols.Submission("subInitImp");
			submission_1.action = "/crs/StdCrsRegFeeCalc/";
			submission_1.mediaType = "application/x-www-form-urlencoded";
			submission_1.addRequestData(dataMap_1);
			submission_1.addResponseData(dataSet_1, false);
			app.register(submission_1);
			
			var submission_2 = new cpr.protocols.Submission("subGrpCdImp");
			submission_2.action = "/crs/StdCrsRegFeeCalc/";
			submission_2.mediaType = "application/x-www-form-urlencoded";
			submission_2.addRequestData(dataMap_1);
			submission_2.addResponseData(dataSet_2, false);
			app.register(submission_2);
			
			var submission_3 = new cpr.protocols.Submission("subSimulImp");
			submission_3.action = "/crs/StdCrsRegFeeCalc/";
			submission_3.mediaType = "application/x-www-form-urlencoded";
			submission_3.addRequestData(dataMap_1);
			submission_3.addResponseData(dataSet_3, false);
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
			var comboBox_1 = new cpr.controls.ComboBox("cbbOptGrpCdImp");
			comboBox_1.userAttr({"require": "Y"});
			comboBox_1.bind("fieldLabel").toExpression("#optSchYearImp.value");
			comboBox_1.bind("value").toDataMap(app.lookup("dmReqKey"), "strOptGrpCd");
			(function(comboBox_1){
				comboBox_1.setItemSet(app.lookup("dsListOptGrpCd"), {
					"label": "OPT_GRP_NM",
					"value": "OPT_GRP_CD"
				});
			})(comboBox_1);
			if(typeof onCbbOptGrpCdImpSelectionChange == "function") {
				comboBox_1.addEventListener("selection-change", onCbbOptGrpCdImpSelectionChange);
			}
			container.addChild(comboBox_1, {
				"top": "0px",
				"left": "145px",
				"width": "325px",
				"height": "25px"
			});
			
			var output_1 = new cpr.controls.Output("optOptGrpCdImp");
			output_1.value = "";
			output_1.style.setClasses(["require"]);
			output_1.bind("value").toLanguage("UI-SCR-STDTCHOIGRP");
			container.addChild(output_1, {
				"top": "0px",
				"left": "0px",
				"width": "140px",
				"height": "25px"
			});
			
			var output_2 = new cpr.controls.Output("optStudIdImp");
			output_2.value = "";
			output_2.bind("value").toLanguage("UI-GLS-STUD_ID");
			container.addChild(output_2, {
				"top": "25px",
				"left": "0px",
				"width": "140px",
				"height": "25px"
			});
			
			var inputBox_1 = new cpr.controls.InputBox("ipbStudIdFromImp");
			inputBox_1.maxLength = 50;
			inputBox_1.userAttr({"require": "Y"});
			inputBox_1.bind("fieldLabel").toExpression("#optStudIdImp.value");
			inputBox_1.bind("value").toDataMap(app.lookup("dmReqKey"), "strStudNoFrom");
			if(typeof onIpbStudIdFromImpValueChange == "function") {
				inputBox_1.addEventListener("value-change", onIpbStudIdFromImpValueChange);
			}
			container.addChild(inputBox_1, {
				"top": "25px",
				"left": "145px",
				"width": "140px",
				"height": "25px"
			});
			
			var button_1 = new cpr.controls.Button("btnStudIdFromPopImp");
			button_1.value = "";
			button_1.style.setClasses(["btn-pop-search"]);
			if(typeof onBtnStudIdFromPopImpClick == "function") {
				button_1.addEventListener("click", onBtnStudIdFromPopImpClick);
			}
			container.addChild(button_1, {
				"top": "25px",
				"left": "285px",
				"width": "20px",
				"height": "25px"
			});
			
			var inputBox_2 = new cpr.controls.InputBox("ipbStudIdObjFromImp");
			inputBox_2.visible = false;
			inputBox_2.bind("fieldLabel").toExpression("#optStudIdImp.value");
			inputBox_2.bind("value").toDataMap(app.lookup("dmReqKey"), "strStudIdFrom");
			container.addChild(inputBox_2, {
				"top": "25px",
				"left": "499px",
				"width": "30px",
				"height": "25px"
			});
			
			var inputBox_3 = new cpr.controls.InputBox("ipbStudIdToImp");
			inputBox_3.maxLength = 50;
			inputBox_3.userAttr({"require": "Y"});
			inputBox_3.bind("fieldLabel").toExpression("#optStudIdImp.value");
			inputBox_3.bind("value").toDataMap(app.lookup("dmReqKey"), "strStudNoTo");
			if(typeof onIpbStudIdToImpValueChange == "function") {
				inputBox_3.addEventListener("value-change", onIpbStudIdToImpValueChange);
			}
			container.addChild(inputBox_3, {
				"top": "25px",
				"left": "330px",
				"width": "140px",
				"height": "25px"
			});
			
			var button_2 = new cpr.controls.Button("btnStudIdToPopImp");
			button_2.value = "";
			button_2.style.setClasses(["btn-pop-search"]);
			if(typeof onBtnStudIdToPopImpClick == "function") {
				button_2.addEventListener("click", onBtnStudIdToPopImpClick);
			}
			container.addChild(button_2, {
				"top": "25px",
				"left": "470px",
				"width": "20px",
				"height": "25px"
			});
			
			var inputBox_4 = new cpr.controls.InputBox("ipbStudIdObjToImp");
			inputBox_4.visible = false;
			inputBox_4.bind("fieldLabel").toExpression("#optStudIdImp.value");
			inputBox_4.bind("value").toDataMap(app.lookup("dmReqKey"), "strStudIdTo");
			container.addChild(inputBox_4, {
				"top": "25px",
				"left": "534px",
				"width": "30px",
				"height": "25px"
			});
			
			var output_3 = new cpr.controls.Output("optText1");
			output_3.value = "~";
			container.addChild(output_3, {
				"top": "25px",
				"left": "311px",
				"width": "15px",
				"height": "25px"
			});
			
			var embeddedApp_1 = new cpr.controls.EmbeddedApp("emaStdCsrPStSch");
			cpr.core.App.load("app/csr/impStdCsrPStSearch", function(app) {
				if(app){
					embeddedApp_1.app = app;
				}
			});
			container.addChild(embeddedApp_1, {
				"top": "695px",
				"left": "35px",
				"width": "100px",
				"height": "25px"
			});
			
			var image_1 = new cpr.controls.Image("imgParamImp");
			image_1.src = "images/imgs/card--pencil.png";
			(function(image_1){
			})(image_1);
			container.addChild(image_1, {
				"top": "0px",
				"left": "475px",
				"width": "20px",
				"height": "25px"
			});
			
			var image_2 = new cpr.controls.Image("imgSimulationImp");
			image_2.src = "images/imgs/card--arrow.png";
			(function(image_2){
			})(image_2);
			container.addChild(image_2, {
				"top": "0px",
				"left": "500px",
				"width": "20px",
				"height": "25px"
			});
		}
	});
	app.title = "impStdCrsCRegFeeCalc";
	cpr.core.Platform.INSTANCE.register(app);
})();
