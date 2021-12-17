/*
 * App URI: app/crs/extCrsSStudRegFeeBillPrt
 * Source Location: app/crs/extCrsSStudRegFeeBillPrt.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("app/crs/extCrsSStudRegFeeBillPrt", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			﻿//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
			/// <xtmlink path="./extCrsSStudRegFeeBillPrt.xtm"/>
			
			
			var extCrsSStudRegFeeBillPrt = function() {
				var moPage = new Page();
				
				/**
				 * @desc Header Import onLoad
				 * @return void
				 * @author Aeyoung Lee at 2016. 6. 21
				 */
				moPage.onLoadImportDone_ImpTitle = function() {
					doHeaderOnLoad();
				}
				
				/**
				 * @desc 온로드
				 * @return void
				 * @author Aeyoung Lee at 2016. 6. 21
				 */
				moPage.onModelConstructDone_ExtCrsSStudRegFeeBillPrt = function() {
					
					if(moUserInfo.userDivRcd != "CC00501"){
						//학생만 사용가능한 화면입니다.
						util.Msg.alert("NLS-CRS-M093");
						util.coverPage(app);
						return;
					}	
					
					doOnLoad();	
				};
				
				/**
				 * @desc 온로드 실행
				 * @param 
				 * @return void
				 * @author Aeyoung Lee at 2016. 6. 21
				 */
				function doOnLoad(){
					
					util.DataMap.setValue(app, "dmReqKey", "strStudId", moUserInfo.id);
					
					// 서브미션 실행 (실패시 cover page)
					//strCommand: onLoad 
					util.Submit.send(app, "subOnLoad", function(pbSuccess){
						if(pbSuccess){
							
							var vsStDt = util.DataMap.getValue(app, "dmDate", "ST_DT").substr(0,8);
							var vsEndDt = util.DataMap.getValue(app, "dmDate", "END_DT").substr(0,8);
							
							//리퀘스트 셋팅
							var voParam = {
										p_strSchYearRcd : util.DataMap.getValue(app, "dmDate", "YEAR") 			// 학년도
									  , p_strSmtRcd : util.DataMap.getValue(app, "dmDate", "SMT") 				// 학기
									  , p_strStudId : util.DataMap.getValue(app, "dmReqKey", "strStudId") 				// 학생ObjId
									  , p_strPayTypeAll : util.DataMap.getValue(app, "dmResOnLoad", "strPayTypeAll") 		// 납부형태(전액)
									  , p_strPayTypeDiv : util.DataMap.getValue(app, "dmResOnLoad", "strPayTypeDiv") 		// 납부형태(분납)
									  , p_strDivPaySeq : util.DataMap.getValue(app, "dmResOnLoad", "strDivPaySeq") 			// 분납차수
									  , p_strPayDt : util.DataMap.getValue(app, "dmResOnLoad", "strDefPayDt") 					// 납부기간
									  , p_strPayPlace : util.DataMap.getValue(app, "dmResOnLoad", "strDefPayPlace") 			// 납부장소
									  , p_strSaList : ""
									  , p_strKeyStDt : vsStDt 	// 해당학년도학기 시작일자
									  , p_strKeyEndDt : vsEndDt  // 해당학년도학기 종료일자
									  , p_strLandivRcd : msDefaultLocale
									}	
									
							 var voOzFormParam = {
										  TITLE : "등록금고지서" //리포트타이틀
										, SUB_TITLE : "" 		  //리포트서브타이틀		
										, FORM_TYPE : "flash"
										};	
										
							util.Report.open(app, "hojReport", "extCrsSRegFeeBill", voOzFormParam, voParam);
						}
					});
				};
			
				return moPage;
			};;
			// End - User Script
			
			// Header
			var dataMap_1 = new cpr.data.DataMap("dmDate");
			dataMap_1.parseData({
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
			app.register(dataMap_1);
			
			var dataMap_2 = new cpr.data.DataMap("dmResOnLoad");
			dataMap_2.parseData({
				"columns" : [
					{
						"name": "strPayTypeAll",
						"dataType": "string"
					},
					{
						"name": "strPayTypeDiv",
						"dataType": "string"
					},
					{
						"name": "strDivPaySeq",
						"dataType": "string"
					},
					{
						"name": "strDefPayDt",
						"dataType": "string"
					},
					{
						"name": "strDefPayPlace",
						"dataType": "string"
					}
				]
			});
			app.register(dataMap_2);
			
			var dataMap_3 = new cpr.data.DataMap("dmReqKey");
			dataMap_3.parseData({
				"columns" : [{
					"name": "strStudId",
					"dataType": "string"
				}]
			});
			app.register(dataMap_3);
			var submission_1 = new cpr.protocols.Submission("subOnLoad");
			submission_1.action = "/crs/ExtCrsStudRegFeeBillPrt/";
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
			var userDefinedControl_1 = new udc.com.appHeader("appheader1");
			container.addChild(userDefinedControl_1, {
				"top": "5px",
				"right": "5px",
				"left": "5px",
				"height": "25px"
			});
			
			var group_1 = new cpr.controls.Container("grpData");
			// Layout
			var xYLayout_2 = new cpr.controls.layouts.XYLayout();
			group_1.setLayout(xYLayout_2);
			(function(container){
				var hTMLObject_1 = new cpr.controls.HTMLObject("hojReport");
				container.addChild(hTMLObject_1, {
					"top": "5px",
					"left": "5px",
					"width": "1215px",
					"height": "635px"
				});
			})(group_1);
			container.addChild(group_1, {
				"top": "35px",
				"left": "5px",
				"width": "1225px",
				"height": "645px"
			});
			if(typeof onBodyLoad == "function"){
				app.addEventListener("load", onBodyLoad);
			}
		}
	});
	app.title = "등록금고지서(학생용)";
	cpr.core.Platform.INSTANCE.register(app);
})();
