/*
 * App URI: app/cmn/extCmnOzPopup
 * Source Location: app/cmn/extCmnOzPopup.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("app/cmn/extCmnOzPopup", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			﻿
			//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
			/// <xtmlink path="./extCmnOzPopup.xtm"/>
			
			
			var extCmnOzPopup = function() {
					
				var moPage = new Page();
				var moPObject = new PObject();
				
						
				
			
				moPage.onModelConstructDone_extCmnOzPopup = function() {
					doOnLoad();
				};
				
				
				
				/**
				 * @desc  onLoad  	
				 * @return void
				 * @author xxxx 2015. 6. 5.
				 */
				function doOnLoad() {
					
					page.doParentGet();
					
				}
				
				
				
				/**
				 * @desc  doParentGet  	
				 * @return void
				 * @author xxxx 2015. 6. 5.
				 */
				function doParentGet() {
					
					if(ExtPopUp.isPopUp()) {
						
						// 호출한 페이지에서 파라미터 받기.								
						
						var voReportParm =  ExtPopUp.getParentVal("ReportUtil.voReportParm");
						
						ExtPopUp.getParentVal();
						
						//--타이틀 
						ExtControl.setTextValue("lblTitleHojReport", voReportParm.psTitle );
						util.Control.redraw(app, "lblTitleHojReport");
						
						
						
						util.Report.open(app, "hojReport", voReportParm.psOzrName, voReportParm.poFormParam, voReportParm.poParam, voReportParm.paChildFormParam, voReportParm.paChildParam, voReportParm.pbSessionChk);			
					}
					
				};
				
				
				
				
				
				moPage.onLoadImportDone_ImpTitle = function() {
					doHeaderOnLoad();
				};
				
				
				moPage.onClick_BtnCloseCancel = function() {
					// 팝업 닫기
					app.close();
				}
				
				
				
				return moPage;
			};;
			// End - User Script
			
			// Header
			var dataSet_1 = new cpr.data.DataSet("dsGenderRcdList");
			dataSet_1.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_1);
			
			var dataSet_2 = new cpr.data.DataSet("dsStudDivRcdList");
			dataSet_2.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_2);
			
			var dataSet_3 = new cpr.data.DataSet("dsNatRcdList");
			dataSet_3.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_3);
			
			var dataSet_4 = new cpr.data.DataSet("dsDayNightDivRcdList");
			dataSet_4.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_4);
			
			var dataSet_5 = new cpr.data.DataSet("dsSaCdList");
			dataSet_5.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_5);
			
			var dataSet_6 = new cpr.data.DataSet("dsBankRcdList");
			dataSet_6.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_6);
			
			var dataSet_7 = new cpr.data.DataSet("dsCmnTmpReg");
			dataSet_7.parseData({
				"columns": [
					{"name": "SA_NM"},
					{"name": "OWNER_NM"},
					{"name": "BANK_RCD"},
					{"name": "REP_NM"},
					{"name": "STUD_DIV_RCD"},
					{"name": "AEN"},
					{"name": "CLP_NO"},
					{"name": "EMAIL"},
					{"name": "ADDR2"},
					{"name": "ENG_NM"},
					{"name": "STUD_NO"},
					{"name": "ADDR1"},
					{"name": "NAT_RCD"},
					{"name": "GENDER_RCD"},
					{"name": "ZIPCODE"},
					{"name": "ACCT_NO"},
					{"name": "CHA_NM"},
					{"name": "DAY_NIGHT_DIV_RCD"},
					{"name": "SSN"},
					{"name": "FILE_SERIAL_NO"},
					{"name": "STUD_ID"},
					{"name": "SA_CD"}
				],
				"rows": []
			});
			app.register(dataSet_7);
			var dataMap_1 = new cpr.data.DataMap("dmReqKey");
			dataMap_1.parseData({
				"columns" : [
					{
						"name": "strStudNo",
						"dataType": "string"
					},
					{
						"name": "strSaNm",
						"dataType": "string"
					},
					{
						"name": "strSaCd",
						"dataType": "string"
					},
					{
						"name": "strStudId",
						"dataType": "string"
					}
				]
			});
			app.register(dataMap_1);
			
			var dataMap_2 = new cpr.data.DataMap("dmResOnLoad");
			dataMap_2.parseData({
				"columns" : [{
					"name": "strKeyDate",
					"dataType": "string"
				}]
			});
			app.register(dataMap_2);
			var submission_1 = new cpr.protocols.Submission("subOnLoad");
			submission_1.action = "/cmn/StdCmnTmpSingRepeat/";
			submission_1.mediaType = "application/x-www-form-urlencoded";
			submission_1.addResponseData(dataMap_2, false);
			submission_1.addResponseData(dataSet_1, false);
			submission_1.addResponseData(dataSet_2, false);
			submission_1.addResponseData(dataSet_3, false);
			submission_1.addResponseData(dataSet_4, false);
			submission_1.addResponseData(dataSet_5, false);
			submission_1.addResponseData(dataSet_6, false);
			app.register(submission_1);
			
			var submission_2 = new cpr.protocols.Submission("subList");
			submission_2.action = "/cmn/StdCmnTmpSingRepeat/";
			submission_2.mediaType = "application/x-www-form-urlencoded";
			submission_2.addRequestData(dataMap_1);
			submission_2.addResponseData(dataSet_7, false);
			app.register(submission_2);
			
			var submission_3 = new cpr.protocols.Submission("subSave");
			submission_3.action = "/cmn/StdCmnTmpSingRepeat/";
			submission_3.mediaType = "application/x-www-form-urlencoded";
			submission_3.addRequestData(dataSet_7);
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
			var userDefinedControl_1 = new udc.com.appHeader("appheader1");
			container.addChild(userDefinedControl_1, {
				"top": "5px",
				"right": "5px",
				"left": "5px",
				"height": "25px"
			});
			
			var group_1 = new cpr.controls.Container("grp_rptCmnTmpReg");
			// Layout
			var xYLayout_2 = new cpr.controls.layouts.XYLayout();
			group_1.setLayout(xYLayout_2);
			(function(container){
				var hTMLObject_1 = new cpr.controls.HTMLObject("hojReport");
				container.addChild(hTMLObject_1, {
					"top": "30px",
					"left": "5px",
					"width": "1175px",
					"height": "561px"
				});
				var userDefinedControl_2 = new udc.com.comFormTitle();
				userDefinedControl_2.bind("title").toLanguage("");
				container.addChild(userDefinedControl_2, {
					"top": "5px",
					"left": "5px",
					"width": "490px",
					"height": "25px"
				});
			})(group_1);
			container.addChild(group_1, {
				"top": "5px",
				"left": "5px",
				"width": "1186px",
				"height": "596px"
			});
			
			var button_1 = new cpr.controls.Button("btnCloseCancel");
			button_1.value = "";
			button_1.style.setClasses(["btn-commit"]);
			button_1.bind("value").toLanguage("UI-SCR-SCRNCLS");
			if(typeof onBtnCloseCancelClick == "function") {
				button_1.addEventListener("click", onBtnCloseCancelClick);
			}
			container.addChild(button_1, {
				"top": "605px",
				"left": "10px",
				"width": "60px",
				"height": "25px"
			});
			if(typeof onBodyLoad == "function"){
				app.addEventListener("load", onBodyLoad);
			}
		}
	});
	app.title = "extCmnOzPopup";
	cpr.core.Platform.INSTANCE.register(app);
})();
