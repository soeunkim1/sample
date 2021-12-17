/*
 * App URI: app/imp/impDialogSchYearSmt
 * Source Location: app/imp/impDialogSchYearSmt.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("app/imp/impDialogSchYearSmt", {
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
			var dataMap_1 = new cpr.data.DataMap("dmRequest");
			dataMap_1.parseData({
				"columns" : [{
					"name": "strUnitSystem",
					"dataType": "string"
				}]
			});
			app.register(dataMap_1);
			
			var dataMap_2 = new cpr.data.DataMap("dmDate");
			dataMap_2.parseData({
				"columns" : [
					{
						"name": "strSchYearRcd",
						"dataType": "string"
					},
					{
						"name": "strEndDt",
						"dataType": "string"
					},
					{
						"name": "strSmtRcd",
						"dataType": "string"
					},
					{
						"name": "strStDt",
						"dataType": "string"
					}
				]
			});
			app.register(dataMap_2);
			var submission_1 = new cpr.protocols.Submission("subOnLoadImpNNS");
			submission_1.action = "/cmn/StdCmnDateTime/";
			submission_1.mediaType = "application/x-www-form-urlencoded";
			submission_1.addRequestData(dataMap_1);
			submission_1.addResponseData(dataSet_1, false);
			submission_1.addResponseData(dataSet_2, false);
			submission_1.addResponseData(dataMap_2, false);
			app.register(submission_1);
			
			var submission_2 = new cpr.protocols.Submission("subDateImpNNS");
			submission_2.action = "/cmn/StdCmnDateTime/";
			submission_2.mediaType = "application/x-www-form-urlencoded";
			submission_2.addRequestData(dataMap_1);
			submission_2.addRequestData(dataMap_2);
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
			var userDefinedControl_1 = linker.userDefinedControl_1 = new udc.com.comTitle();
			userDefinedControl_1.ctrl = app.lookup("grdManage");
			userDefinedControl_1.bind("title").toLanguage("");
			container.addChild(userDefinedControl_1, {
				"top": "0px",
				"left": "0px",
				"width": "265px",
				"height": "25px"
			});
			
			var comboBox_1 = new cpr.controls.ComboBox("cbbYearImp");
			comboBox_1.userAttr({"require": "Y"});
			comboBox_1.bind("fieldLabel").toExpression("#optYear.value");
			comboBox_1.bind("value").toDataMap(app.lookup("dmDate"), "strSchYearRcd");
			(function(comboBox_1){
				comboBox_1.setItemSet(app.lookup("dsYearList"), {
					"label": "CD_NM",
					"value": "CD"
				});
			})(comboBox_1);
			if(typeof onCbbYearImpSelectionChange == "function") {
				comboBox_1.addEventListener("selection-change", onCbbYearImpSelectionChange);
			}
			container.addChild(comboBox_1, {
				"top": "25px",
				"left": "60px",
				"width": "100px",
				"height": "25px"
			});
			
			var output_1 = new cpr.controls.Output("optYear");
			output_1.value = "학년도";
			output_1.style.setClasses(["require"]);
			container.addChild(output_1, {
				"top": "25px",
				"left": "5px",
				"width": "50px",
				"height": "25px"
			});
			
			var output_2 = new cpr.controls.Output("optSmt");
			output_2.value = "학기";
			output_2.style.setClasses(["require"]);
			container.addChild(output_2, {
				"top": "25px",
				"left": "165px",
				"width": "50px",
				"height": "25px"
			});
			
			var comboBox_2 = new cpr.controls.ComboBox("cbbSmtImp");
			comboBox_2.userAttr({"require": "Y"});
			comboBox_2.bind("fieldLabel").toExpression("#optSmt.value");
			comboBox_2.bind("value").toDataMap(app.lookup("dmDate"), "strSmtRcd");
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
				"top": "25px",
				"left": "220px",
				"width": "100px",
				"height": "25px"
			});
			
			var button_1 = new cpr.controls.Button("btnSearch1");
			button_1.value = "OK";
			if(typeof onBtnSearch1Click == "function") {
				button_1.addEventListener("click", onBtnSearch1Click);
			}
			container.addChild(button_1, {
				"top": "50px",
				"left": "195px",
				"width": "60px",
				"height": "25px"
			});
			
			var button_2 = new cpr.controls.Button("btnSearch2");
			button_2.value = "Cancel";
			if(typeof onBtnSearch2Click == "function") {
				button_2.addEventListener("click", onBtnSearch2Click);
			}
			container.addChild(button_2, {
				"top": "50px",
				"left": "260px",
				"width": "60px",
				"height": "25px"
			});
		}
	});
	app.title = "impStdCmnPObjSch";
	cpr.core.Platform.INSTANCE.register(app);
})();
