/*
 * App URI: app/cmn/stdCmnPSort
 * Source Location: app/cmn/stdCmnPSort.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("app/cmn/stdCmnPSort", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			
			// Header
			var dataMap_1 = new cpr.data.DataMap("dmList");
			dataMap_1.parseData({
				"columns" : [
					{
						"name": "column",
						"dataType": "string"
					},
					{
						"name": "sorttype",
						"dataType": "string"
					},
					{
						"name": "sortorder",
						"dataType": "string"
					},
					{
						"name": "andor",
						"dataType": "string"
					}
				]
			});
			app.register(dataMap_1);
			
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
			var group_1 = new cpr.controls.Container("group4");
			// Layout
			var xYLayout_2 = new cpr.controls.layouts.XYLayout();
			group_1.setLayout(xYLayout_2);
			(function(container){
				var button_1 = new cpr.controls.Button("btnNew");
				button_1.value = "신규";
				button_1.style.setClasses(["btn-new"]);
				if(typeof onBtnNewClick == "function") {
					button_1.addEventListener("click", onBtnNewClick);
				}
				container.addChild(button_1, {
					"top": "5px",
					"left": "233px",
					"width": "60px",
					"height": "25px"
				});
				var button_2 = new cpr.controls.Button("btnDel");
				button_2.value = "삭제";
				button_2.style.setClasses(["btn-delete"]);
				if(typeof onBtnDelClick == "function") {
					button_2.addEventListener("click", onBtnDelClick);
				}
				container.addChild(button_2, {
					"top": "5px",
					"left": "299px",
					"width": "60px",
					"height": "25px"
				});
				var grid_1 = new cpr.controls.Grid("grdRight");
				grid_1.init({
					"dataSet": app.lookup("dsTempRSortList"),
					"columns": [
						{"width": "21px"},
						{"width": "120px"},
						{"width": "91px"},
						{"width": "112px"}
					],
					"header": {
						"rows": [{"height": "27px"}],
						"cells": [
							{
								"constraint": {"rowIndex": 0, "colIndex": 0},
								"configurator": function(cell){
									cell.text = "";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 1},
								"configurator": function(cell){
									cell.text = "정렬대상";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 2},
								"configurator": function(cell){
									cell.text = "정렬Type";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 3},
								"configurator": function(cell){
									cell.text = "정렬방식";
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
									cell.columnName = "_repeatindex";
									cell.control = (function(){
										var inputBox_1 = new cpr.controls.InputBox("inputbox1");
										inputBox_1.enabled = false;
										inputBox_1.readOnly = true;
										inputBox_1.bind("value").toDataColumn("_repeatindex");
										return inputBox_1;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 1},
								"configurator": function(cell){
									cell.columnName = "column";
									cell.control = (function(){
										var comboBox_1 = new cpr.controls.ComboBox("combobox4");
										(function(comboBox_1){
											comboBox_1.setItemSet(app.lookup("dsTempLSortList"), {
												"label": "name",
												"value": "column"
											});
										})(comboBox_1);
										comboBox_1.bind("value").toDataColumn("column");
										return comboBox_1;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 2},
								"configurator": function(cell){
									cell.columnName = "sorttype";
									cell.control = (function(){
										var comboBox_2 = new cpr.controls.ComboBox("combobox2");
										(function(comboBox_2){
											comboBox_2.addItem(new cpr.controls.Item("문자", "text"));
											comboBox_2.addItem(new cpr.controls.Item("숫자", "number"));
										})(comboBox_2);
										comboBox_2.bind("value").toDataColumn("sorttype");
										return comboBox_2;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 3},
								"configurator": function(cell){
									cell.columnName = "sortorder";
									cell.control = (function(){
										var comboBox_3 = new cpr.controls.ComboBox("combobox1");
										(function(comboBox_3){
											comboBox_3.addItem(new cpr.controls.Item("오름차순", "true"));
											comboBox_3.addItem(new cpr.controls.Item("내림차순", "false"));
										})(comboBox_3);
										comboBox_3.bind("value").toDataColumn("sortorder");
										return comboBox_3;
									})();
								}
							}
						]
					}
				});
				container.addChild(grid_1, {
					"top": "30px",
					"left": "5px",
					"width": "355",
					"height": "269px"
				});
			})(group_1);
			container.addChild(group_1, {
				"top": "30px",
				"left": "5px",
				"width": "365px",
				"height": "305px"
			});
			
			var button_3 = new cpr.controls.Button("button1");
			button_3.value = "정렬";
			if(typeof onButton1Click == "function") {
				button_3.addEventListener("click", onButton1Click);
			}
			container.addChild(button_3, {
				"top": "5px",
				"left": "238px",
				"width": "60px",
				"height": "25px"
			});
			
			var button_4 = new cpr.controls.Button("button2");
			button_4.value = "reset";
			if(typeof onButton2Click == "function") {
				button_4.addEventListener("click", onButton2Click);
			}
			container.addChild(button_4, {
				"top": "5px",
				"left": "304px",
				"width": "60px",
				"height": "25px"
			});
			
			var button_5 = new cpr.controls.Button("btnSave");
			button_5.value = "닫기";
			button_5.style.setClasses(["btn-save"]);
			if(typeof onBtnSaveClick == "function") {
				button_5.addEventListener("click", onBtnSaveClick);
			}
			container.addChild(button_5, {
				"top": "340px",
				"left": "307px",
				"width": "60px",
				"height": "25px"
			});
			if(typeof onBodyLoad == "function"){
				app.addEventListener("load", onBodyLoad);
			}
		}
	});
	app.title = "Untitled";
	cpr.core.Platform.INSTANCE.register(app);
})();