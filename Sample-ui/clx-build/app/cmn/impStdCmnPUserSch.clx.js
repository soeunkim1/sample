/*
 * App URI: app/cmn/impStdCmnPUserSch
 * Source Location: app/cmn/impStdCmnPUserSch.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("app/cmn/impStdCmnPUserSch", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			
			// Header
			var dataMap_1 = new cpr.data.DataMap("dmResult");
			dataMap_1.parseData({
				"columns" : [
					{
						"name": "USER_DIV_RCD",
						"dataType": "string"
					},
					{
						"name": "USER_ID",
						"dataType": "string"
					},
					{
						"name": "USER_NM",
						"dataType": "string"
					},
					{
						"name": "STAT_CD",
						"dataType": "string"
					},
					{
						"name": "STAT_NM",
						"dataType": "string"
					},
					{
						"name": "DEPT_CD",
						"dataType": "string"
					},
					{
						"name": "DEPT_NM",
						"dataType": "string"
					},
					{
						"name": "ID",
						"dataType": "string"
					},
					{
						"name": "SSN",
						"dataType": "string"
					},
					{
						"name": "PARTY_ID",
						"dataType": "string"
					}
				]
			});
			app.register(dataMap_1);
			
			var dataMap_2 = new cpr.data.DataMap("dmRes");
			dataMap_2.parseData({
				"columns" : [{
					"name": "count",
					"dataType": "string"
				}]
			});
			app.register(dataMap_2);
			
			var dataMap_3 = new cpr.data.DataMap("dmReq");
			dataMap_3.parseData({
				"columns" : [
					{
						"name": "strUserDivRcd",
						"dataType": "string"
					},
					{
						"name": "strUserId",
						"dataType": "string"
					},
					{
						"name": "strUserNm",
						"dataType": "string"
					},
					{
						"name": "strUseYn",
						"dataType": "string"
					},
					{
						"name": "strKeyDate",
						"dataType": "string"
					},
					{
						"name": "authRngRcd",
						"dataType": "string"
					}
				]
			});
			app.register(dataMap_3);
			var submission_1 = new cpr.protocols.Submission("subPrecheckStdCmnPUserSch");
			submission_1.action = "/cmn/StdCmnUserSch/";
			submission_1.mediaType = "application/x-www-form-urlencoded";
			submission_1.addRequestData(dataMap_3);
			submission_1.addResponseData(dataMap_1, false);
			submission_1.addResponseData(dataMap_2, false);
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
			var output_1 = new cpr.controls.Output("label1");
			output_1.value = "사용자검색 IMP";
			container.addChild(output_1, {
				"top": "0px",
				"left": "0px",
				"width": "120px",
				"height": "25px"
			});
		}
	});
	app.title = "impStdCmnPUserSch";
	cpr.core.Platform.INSTANCE.register(app);
})();
