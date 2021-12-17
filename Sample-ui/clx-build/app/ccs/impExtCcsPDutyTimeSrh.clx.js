/*
 * App URI: app/ccs/impExtCcsPDutyTimeSrh
 * Source Location: app/ccs/impExtCcsPDutyTimeSrh.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("app/ccs/impExtCcsPDutyTimeSrh", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			
			// Header
			var dataMap_1 = new cpr.data.DataMap("dmInstance");
			dataMap_1.parseData({
				"columns" : [{
					"name": "root",
					"dataType": "string"
				}]
			});
			app.register(dataMap_1);
			
			var dataMap_2 = new cpr.data.DataMap("dmInstance");
			dataMap_2.parseData({
				"columns" : [{
					"name": "root",
					"dataType": "string"
				}]
			});
			app.register(dataMap_2);
			
			var dataMap_3 = new cpr.data.DataMap("dmResult");
			dataMap_3.parseData({
				"columns" : [
					{
						"name": "CD",
						"dataType": "string"
					},
					{
						"name": "LAN_DIV_RCD",
						"dataType": "string"
					},
					{
						"name": "CD_CLS",
						"dataType": "string"
					},
					{
						"name": "OG_CD",
						"dataType": "string"
					},
					{
						"name": "UCD",
						"dataType": "string"
					},
					{
						"name": "ULAN_DIV_RCD",
						"dataType": "string"
					},
					{
						"name": "CD_NM",
						"dataType": "string"
					},
					{
						"name": "CD_SHORT_NM",
						"dataType": "string"
					},
					{
						"name": "CD_LEN",
						"dataType": "string"
					},
					{
						"name": "PRT_ORD",
						"dataType": "string"
					},
					{
						"name": "EFFT_ST_DT",
						"dataType": "string"
					},
					{
						"name": "EFFT_END_DT",
						"dataType": "string"
					},
					{
						"name": "CD_DESC",
						"dataType": "string"
					},
					{
						"name": "UNIT_SYSTEM_RCD",
						"dataType": "string"
					},
					{
						"name": "CD_PRP1",
						"dataType": "string"
					},
					{
						"name": "CD_PRP2",
						"dataType": "string"
					},
					{
						"name": "CD_PRP3",
						"dataType": "string"
					},
					{
						"name": "CD_PRP4",
						"dataType": "string"
					},
					{
						"name": "CD_PRP5",
						"dataType": "string"
					},
					{
						"name": "CD_PRP6",
						"dataType": "string"
					},
					{
						"name": "CD_PRP7",
						"dataType": "string"
					},
					{
						"name": "CD_PRP8",
						"dataType": "string"
					},
					{
						"name": "CD_PRP9",
						"dataType": "string"
					},
					{
						"name": "CD_PRP10",
						"dataType": "string"
					}
				]
			});
			app.register(dataMap_3);
			
			var dataMap_4 = new cpr.data.DataMap("dmRes");
			dataMap_4.parseData({
				"columns" : [{
					"name": "count",
					"dataType": "string"
				}]
			});
			app.register(dataMap_4);
			
			var dataMap_5 = new cpr.data.DataMap("dmReq");
			dataMap_5.parseData({
				"columns" : [
					{
						"name": "strCdCls",
						"dataType": "string"
					},
					{
						"name": "strCdPrp1InCond",
						"dataType": "string"
					},
					{
						"name": "strWkdtyNm",
						"dataType": "string"
					},
					{
						"name": "strKeyDate",
						"dataType": "string"
					}
				]
			});
			app.register(dataMap_5);
			var submission_1 = new cpr.protocols.Submission("subPrecheckExtCcsDutyTimePopup");
			submission_1.action = "/ccs/ImpExtCcsDutyTimeSrh/";
			submission_1.mediaType = "application/x-www-form-urlencoded";
			submission_1.addRequestData(dataMap_5);
			submission_1.addResponseData(dataMap_3, false);
			submission_1.addResponseData(dataMap_4, false);
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
			var output_1 = new cpr.controls.Output("impExtCcsPDutyTimeSrhlabel");
			output_1.value = "직급/직책IMP";
			container.addChild(output_1, {
				"top": "0px",
				"left": "0px",
				"width": "120px",
				"height": "25px"
			});
		}
	});
	app.title = "직급/직책검색";
	cpr.core.Platform.INSTANCE.register(app);
})();
