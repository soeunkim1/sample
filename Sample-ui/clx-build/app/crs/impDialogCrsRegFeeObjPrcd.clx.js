/*
 * App URI: app/crs/impDialogCrsRegFeeObjPrcd
 * Source Location: app/crs/impDialogCrsRegFeeObjPrcd.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("app/crs/impDialogCrsRegFeeObjPrcd", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			
			// Header
			var dataSet_1 = new cpr.data.DataSet("dsListPrcdCd");
			dataSet_1.parseData({
				"columns": [
					{"name": "PRCD_CD"},
					{"name": "PRCD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_1);
			var dataMap_1 = new cpr.data.DataMap("dmReqKey");
			dataMap_1.parseData({
				"columns" : [
					{
						"name": "strPrcdCd",
						"dataType": "string"
					},
					{
						"name": "strErrorMsg",
						"dataType": "string"
					}
				]
			});
			app.register(dataMap_1);
			var submission_1 = new cpr.protocols.Submission("subOnLoadImp");
			submission_1.action = "/crs/StdCrsRegFeeObjPrcd/";
			submission_1.mediaType = "application/x-www-form-urlencoded";
			submission_1.addResponseData(dataSet_1, false);
			app.register(submission_1);
			
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
			var group_1 = new cpr.controls.Container("grpDataDtl");
			// Layout
			var xYLayout_2 = new cpr.controls.layouts.XYLayout();
			group_1.setLayout(xYLayout_2);
			(function(container){
				var userDefinedControl_1 = new udc.com.comFormTitle();
				userDefinedControl_1.bind("title").toLanguage("UI-SCR-QUESTION");
				container.addChild(userDefinedControl_1, {
					"top": "5px",
					"left": "5px",
					"width": "415px",
					"height": "25px"
				});
				var button_1 = new cpr.controls.Button("btnSaveYes");
				button_1.value = "";
				button_1.bind("value").toLanguage("UI-SCR-YES");
				if(typeof onBtnSaveYesClick == "function") {
					button_1.addEventListener("click", onBtnSaveYesClick);
				}
				container.addChild(button_1, {
					"top": "30px",
					"left": "295px",
					"width": "60px",
					"height": "25px"
				});
				var button_2 = new cpr.controls.Button("btnNo");
				button_2.value = "";
				button_2.bind("value").toLanguage("UI-SCR-NOO");
				if(typeof onBtnNoClick == "function") {
					button_2.addEventListener("click", onBtnNoClick);
				}
				container.addChild(button_2, {
					"top": "30px",
					"left": "360px",
					"width": "60px",
					"height": "25px"
				});
				var output_1 = new cpr.controls.Output("optcbbPrcdCdImp");
				output_1.value = "";
				output_1.style.setClasses(["require"]);
				output_1.bind("value").toLanguage("UI-SCR-TUITCALPRC");
				container.addChild(output_1, {
					"top": "30px",
					"left": "5px",
					"width": "100px",
					"height": "25px"
				});
				var comboBox_1 = new cpr.controls.ComboBox("cbbPrcdCdImp");
				comboBox_1.userAttr({"require": "Y"});
				comboBox_1.bind("fieldLabel").toExpression("#optcbbPrcdCdImp.value");
				comboBox_1.bind("value").toDataMap(app.lookup("dmReqKey"), "strPrcdCd");
				(function(comboBox_1){
					comboBox_1.setItemSet(app.lookup("dsListPrcdCd"), {
						"label": "PRCD_NM",
						"value": "PRCD_CD"
					});
				})(comboBox_1);
				if(typeof onCbbPrcdCdImpSelectionChange == "function") {
					comboBox_1.addEventListener("selection-change", onCbbPrcdCdImpSelectionChange);
				}
				container.addChild(comboBox_1, {
					"top": "30px",
					"left": "110px",
					"width": "180px",
					"height": "25px"
				});
				var output_2 = new cpr.controls.Output("optErrorMsgImp");
				output_2.value = "";
				output_2.bind("value").toDataMap(app.lookup("dmReqKey"), "strErrorMsg");
				container.addChild(output_2, {
					"top": "55px",
					"left": "5px",
					"width": "415px",
					"height": "30px"
				});
			})(group_1);
			container.addChild(group_1, {
				"top": "0px",
				"left": "0px",
				"width": "425px",
				"height": "90px"
			});
		}
	});
	app.title = "????????? ????????????";
	cpr.core.Platform.INSTANCE.register(app);
})();
