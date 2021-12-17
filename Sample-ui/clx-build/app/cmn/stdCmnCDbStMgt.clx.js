/*
 * App URI: app/cmn/stdCmnCDbStMgt
 * Source Location: app/cmn/stdCmnCDbStMgt.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("app/cmn/stdCmnCDbStMgt", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			//공통 모듈 사용
			var util = new ComUtil(app);;
			// End - User Script
			
			// Header
			var dataSet_1 = new cpr.data.DataSet("dsPageInfo");
			dataSet_1.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "LAN_DIV_RCD"},
					{"name": "CD_CLS"},
					{"name": "OG_CD"},
					{"name": "UCD"},
					{"name": "ULAN_DIV_RCD"},
					{"name": "CD_NM"},
					{"name": "CD_SHORT_NM"},
					{"name": "CD_LEN"},
					{"name": "PRT_ORD"},
					{"name": "EFFT_ST_DT"},
					{"name": "EFFT_END_DT"},
					{"name": "CD_DESC"},
					{"name": "UNIT_SYSTEM_RCD"},
					{"name": "CD_PRP1"},
					{"name": "CD_PRP2"},
					{"name": "CD_PRP3"},
					{"name": "STD_YN"},
					{"name": "CD_PRP4"},
					{"name": "CD_PRP5"},
					{"name": "CD_PRP6"},
					{"name": "CD_PRP7"},
					{"name": "CD_PRP8"},
					{"name": "CD_PRP9"},
					{"name": "CD_PRP10"},
					{"name": "CRT_DTHR"},
					{"name": "CRT_USER_ID"},
					{"name": "CRT_PGM_ID"},
					{"name": "CRT_IP_MAC"},
					{"name": "UPD_DTHR"},
					{"name": "UPD_USER_ID"},
					{"name": "UPD_PGM_ID"},
					{"name": "UPD_IP_MAC"},
					{"name": "OG_NM"}
				],
				"rows": []
			});
			app.register(dataSet_1);
			var dataMap_1 = new cpr.data.DataMap("dmReqCmd");
			dataMap_1.parseData({
				"columns" : [{
					"name": "strCdCls",
					"dataType": "string"
				}]
			});
			app.register(dataMap_1);
			var submission_1 = new cpr.protocols.Submission("subList");
			submission_1.action = "/cmn/StdCmnDbStMgt/";
			submission_1.mediaType = "application/x-www-form-urlencoded";
			submission_1.addRequestData(dataMap_1);
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
			var userDefinedControl_1 = new udc.com.appHeader("appheader1");
			container.addChild(userDefinedControl_1, {
				"top": "5px",
				"right": "5px",
				"left": "5px",
				"height": "25px"
			});
			
			var button_1 = new cpr.controls.Button("tabBtnTableData");
			button_1.value = "";
			button_1.bind("value").toLanguage("UI-SCR-TABLE_MGT");
			if(typeof onTabBtnTableDataClick == "function") {
				button_1.addEventListener("click", onTabBtnTableDataClick);
			}
			container.addChild(button_1, {
				"top": "35px",
				"left": "5px",
				"width": "100px",
				"height": "28px"
			});
			
			var button_2 = new cpr.controls.Button("tabBtnUserSource");
			button_2.value = "";
			button_2.bind("value").toLanguage("UI-SCR-USER_SOURCE");
			if(typeof onTabBtnUserSourceClick == "function") {
				button_2.addEventListener("click", onTabBtnUserSourceClick);
			}
			container.addChild(button_2, {
				"top": "35px",
				"left": "106px",
				"width": "100px",
				"height": "28px"
			});
			
			var button_3 = new cpr.controls.Button("tabBtnDomainMgt");
			button_3.value = "";
			button_3.bind("value").toLanguage("UI-SCR-DOMAIN_MGT");
			if(typeof onTabBtnDomainMgtClick == "function") {
				button_3.addEventListener("click", onTabBtnDomainMgtClick);
			}
			container.addChild(button_3, {
				"top": "35px",
				"left": "207px",
				"width": "100px",
				"height": "28px"
			});
			
			var button_4 = new cpr.controls.Button("tabBtnDicMng");
			button_4.value = "";
			button_4.bind("value").toLanguage("UI-SCR-DIC_MGT");
			if(typeof onTabBtnDicMngClick == "function") {
				button_4.addEventListener("click", onTabBtnDicMngClick);
			}
			container.addChild(button_4, {
				"top": "35px",
				"left": "308px",
				"width": "100px",
				"height": "28px"
			});
			
			var button_5 = new cpr.controls.Button("tabBtnPhysicAgrCnfm");
			button_5.value = "";
			button_5.bind("value").toLanguage("UI-SCR-PHYSIC_AGR_CNFM");
			if(typeof onTabBtnPhysicAgrCnfmClick == "function") {
				button_5.addEventListener("click", onTabBtnPhysicAgrCnfmClick);
			}
			container.addChild(button_5, {
				"top": "35px",
				"left": "409px",
				"width": "110px",
				"height": "28px"
			});
			
			var button_6 = new cpr.controls.Button("tabBtnStdComment");
			button_6.value = "";
			button_6.bind("value").toLanguage("UI-SCR-COMMENT_CRT");
			if(typeof onTabBtnStdCommentClick == "function") {
				button_6.addEventListener("click", onTabBtnStdCommentClick);
			}
			container.addChild(button_6, {
				"top": "35px",
				"left": "520px",
				"width": "140px",
				"height": "28px"
			});
			
			var button_7 = new cpr.controls.Button("tabBtnUsePhysic");
			button_7.value = "";
			button_7.bind("value").toLanguage("UI-SCR-PHYSIC_USE_CHK");
			if(typeof onTabBtnUsePhysicClick == "function") {
				button_7.addEventListener("click", onTabBtnUsePhysicClick);
			}
			container.addChild(button_7, {
				"top": "35px",
				"left": "661px",
				"width": "150px",
				"height": "28px"
			});
			
			var button_8 = new cpr.controls.Button("tabBtnChkPhysicNm");
			button_8.value = "";
			button_8.bind("value").toLanguage("UI-SCR-PHYSIC_CHK");
			if(typeof onTabBtnChkPhysicNmClick == "function") {
				button_8.addEventListener("click", onTabBtnChkPhysicNmClick);
			}
			container.addChild(button_8, {
				"top": "35px",
				"left": "812px",
				"width": "100px",
				"height": "28px"
			});
			
			var button_9 = new cpr.controls.Button("tabBtnCrtComment");
			button_9.value = "";
			button_9.bind("value").toLanguage("UI-SCR-COMMENT_CRT");
			if(typeof onTabBtnCrtCommentClick == "function") {
				button_9.addEventListener("click", onTabBtnCrtCommentClick);
			}
			container.addChild(button_9, {
				"top": "35px",
				"left": "913px",
				"width": "112px",
				"height": "28px"
			});
			
			var hTMLObject_1 = new cpr.controls.HTMLObject("subPage");
			container.addChild(hTMLObject_1, {
				"top": "63px",
				"left": "0px",
				"width": "1235px",
				"height": "607px"
			});
			if(typeof onBodyLoad == "function"){
				app.addEventListener("load", onBodyLoad);
			}
		}
	});
	app.title = "트리거생성";
	cpr.core.Platform.INSTANCE.register(app);
})();