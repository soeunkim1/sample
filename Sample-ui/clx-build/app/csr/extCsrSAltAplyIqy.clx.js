/*
 * App URI: app/csr/extCsrSAltAplyIqy
 * Source Location: app/csr/extCsrSAltAplyIqy.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("app/csr/extCsrSAltAplyIqy", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			﻿//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
			/// <xtmlink path="./extCsrSAltAplyIqy.xtm"/>
			
			
			var extCsrSAltAplyIqy = function() {
				var moPage = new Page();
				var moPObject = new PObject();
				
				moPObject.moIdsForExtCsrAplyAbs = [
				{
					controlId 					: "btnNewAbsReq",
					iStudId 						: "/root/reqList/strStudId",
					iUseTabNm				: "CSR_SHREG",
					func : function() {
						doOnLoad();
					}
				}
				];
				
				moPObject.moIdsForExtCsrAplyRetu = [
				{
					controlId 					: "btnNewRtnReq",
					iStudId 						: "/root/reqList/strStudId",
					iUseTabNm				: "CSR_SHREG",
					func : function() {
						doOnLoad();
					}
				}
				];
				
				moPage.onLoadImportDone_ImpTitle = function() {
					doHeaderOnLoad();
				}
				
				/**
				 * @desc 온로드 실행
				 * @return void
				 * @author Choi In Seong 2016. 01. 11.
				 */
				moPage.onModelConstructDone_StdCsrCAplyYearSmt = function() {
					doOnLoad();
				};
				
				/**
				 * @desc 온로드 실행
				 * @return void
				 * @author Choi In Seong 2016. 01. 11.
				 */
				function doOnLoad() {
					
					util.DataMap.setValue(app, "dmReqList", "strStudId", moUserInfo.id);
					
					// 서브미션 실행 (실패시 cover page)
					//strCommand: onLoad 
					util.Submit.send(app, "subOnLoad", function(pbSuccess){
						if(pbSuccess){
							util.Msg.notify(app, "NLS.INF.M024");
							
							util.Control.redraw(app, ["frfRtnResult"]);
							debugger;
							var vsAbsPlanYn = util.DataMap.getValue(app, "dmResOnLoad", "strAbsPlanYn");
							var vsRtnPlanYn = util.DataMap.getValue(app, "dmResOnLoad", "strRtnPlanYn");
							var vsKeyDate = util.DataMap.getValue(app, "dmResOnLoad", "strKeyDate");
							
							var strAbsStDt = util.DataMap.getValue(app, "dmResOnLoad", "strAbsStDt");
							var strAbsEndDt = util.DataMap.getValue(app, "dmResOnLoad", "strAbsEndDt");
							var strRtnStDt = util.DataMap.getValue(app, "dmResOnLoad", "strRtnStDt");
							var strRtnEndDt = util.DataMap.getValue(app, "dmResOnLoad", "strRtnEndDt");
			
							ExtControl.setTextValue("lblAbsTitle", ComMsg.getMsg(NLS.CSR.EXT002, [strAbsStDt, strAbsEndDt]));
							// 군휴학 타이틀
							if(vsAbsPlanYn == "N"){
								ExtControl.setAttr("lblAbsTitle", "class", "title_red");
							}else{
								ExtControl.setAttr("lblAbsTitle", "class", "title_green");
							}
							
							ExtControl.setTextValue("lblRtnTitle", ComMsg.getMsg(NLS.CSR.EXT003, [strRtnStDt, strRtnEndDt]));
							//복학 타이틀
							if(vsRtnPlanYn == "N"){
								ExtControl.setAttr("lblRtnTitle", "class", "title_red");
							}else{
								ExtControl.setAttr("lblRtnTitle", "class", "title_green");
							}
							
							var vsAbsRowYn = util.DataMap.getValue(app, "dmResOnLoad", "frfAbsResultYn");
							var vsRtnRowYn = util.DataMap.getValue(app, "dmResOnLoad", "frfRtnResultYn");
							
							// 군휴학, 복학 데이터 존재여부 체크
							if(vsAbsRowYn == "Y"){
								util.Control.setVisible(app, true, ["frfAbsResult"]);
							}else{
								util.Control.setVisible(app, false, ["frfAbsResult"]);
							}
							if(vsRtnRowYn == "Y"){
								util.Control.setVisible(app, true, ["frfRtnResult"]);
							}else{
								util.Control.setVisible(app, false, ["frfRtnResult"]);
							}
							
							// 신청상태 / 비고
							var vsAbsAplyStatRcd = util.FreeForm.getValue(app, "frfAbsResult","APLY_STAT_RCD");
							var vsAbsRemark = util.FreeForm.getValue(app, "frfAbsResult","CANCEL_REMARK");
							var vsRtnAplyStatRcd = util.FreeForm.getValue(app, "frfRtnResult","APLY_STAT_RCD");
							var vsRtnRemark = util.FreeForm.getValue(app, "frfRtnResult","CANCEL_REMARK");
							
							// 신청 불가 사유
							var vsAbsAplyFalseRsn = util.DataMap.getValue(app, "dmResOnLoad", "strAbsAplyFalseRsn");
							var vsRtnAplyFalseRsn = util.DataMap.getValue(app, "dmResOnLoad", "strRtnAplyFalseRsn");
							
							if(!ValueUtil.isNull(vsAbsAplyFalseRsn)){
								ExtControl.setTextValue("lblAbsAplyFalseRsn", ComMsg.getMsg(NLS.CSR.EXT004, [vsAbsAplyFalseRsn]));
								util.Control.setVisible(app, true, ["lblAbsAplyFalseRsn"]);
							}else{
								if(vsAbsAplyStatRcd=="CSR10330"){
									if(!ValueUtil.isNull(vsAbsRemark)){
										ExtControl.setTextValue("lblAbsAplyFalseRsn", ComMsg.getMsg(NLS.CSR.EXT011, [vsAbsRemark]));
										util.Control.setVisible(app, true, ["lblAbsAplyFalseRsn"]);
									}else{
										ExtControl.setTextValue("lblAbsAplyFalseRsn", "");
										util.Control.setVisible(app, false, ["lblAbsAplyFalseRsn"]);
									}
								}else{
									ExtControl.setTextValue("lblAbsAplyFalseRsn", "");	
									util.Control.setVisible(app, false, ["lblAbsAplyFalseRsn"]);
								}
							}
							
							if(!ValueUtil.isNull(vsRtnAplyFalseRsn)){
								ExtControl.setTextValue("lblRtnAplyFalseRsn", ComMsg.getMsg(NLS.CSR.EXT004, [vsRtnAplyFalseRsn]));
								util.Control.setVisible(app, true, ["lblRtnAplyFalseRsn"]);
							}else{
								if(vsRtnAplyStatRcd=="CSR10330"){
									if(!ValueUtil.isNull(vsRtnRemark)){
										ExtControl.setTextValue("lblRtnAplyFalseRsn", ComMsg.getMsg(NLS.CSR.EXT011, [vsRtnRemark]));
										util.Control.setVisible(app, true, ["lblRtnAplyFalseRsn"]);
									}else{
										ExtControl.setTextValue("lblRtnAplyFalseRsn", "");
										util.Control.setVisible(app, false, ["lblRtnAplyFalseRsn"]);
									}
								}else{
									ExtControl.setTextValue("lblRtnAplyFalseRsn", "");
									util.Control.setVisible(app, false, ["lblRtnAplyFalseRsn"]);
								}
							}
							
							// 라벨 refresh
							util.Control.redraw(app, [ "lblRtnTitle", "lblRtnAplyFalseRsn"]);
							
							// 군휴학, 복학 신청 가능 여부에 따른 컨트롤 제어
							var vsAbsYn = util.DataMap.getValue(app, "dmResOnLoad", "strAbsYn");
							var vsRtnYn = util.DataMap.getValue(app, "dmResOnLoad", "strRtnYn");
							
							// 신청가능
							if(vsAbsYn == "Y"){
								util.Control.setEnable(app, true, ["btnNewAbsReq"]);
								
								ExtControl.setAttr("lblAbsAply", "class", "circle_green_fill");
								ExtControl.setAttr("lblAbsProc", "class", "circle_yellow");
								ExtControl.setAttr("lblAbsFalse", "class", "circle_red");
								
								ExtControl.setAttr("btnNewAbsReq", "class", "btn_b_green");
								
								ExtControl.setAttr("lblFrfAbsAplyDt", "class", "text_green");
								ExtControl.setAttr("lblFrfAbsProcResult", "class", "text_green");
								ExtControl.setAttr("optFrfAbsAplyDt", "class", "text_green");
								ExtControl.setAttr("optFrfAbsProcResult", "class", "text_green");
								ExtControl.setAttr("lblAbsAplyFalseRsn", "class", "condition_text02");
								
							// 진행중
							}else if(vsAbsYn == "P"){
								util.Control.setEnable(app, true, ["btnNewAbsReq"]);
								
								ExtControl.setAttr("lblAbsAply", "class", "circle_green");
								ExtControl.setAttr("lblAbsProc", "class", "circle_yellow_fill");
								ExtControl.setAttr("lblAbsFalse", "class", "circle_red");
								
								ExtControl.setAttr("btnNewAbsReq", "class", "btn_b_yellow");
			
								ExtControl.setAttr("lblFrfAbsAplyDt", "class", "text_yellow");
								ExtControl.setAttr("lblFrfAbsProcResult", "class", "text_yellow");
								ExtControl.setAttr("optFrfAbsAplyDt", "class", "text_yellow");
								ExtControl.setAttr("optFrfAbsProcResult", "class", "text_yellow");
								
							// 신청불가
							}else{
								util.Control.setEnable(app, false, ["btnNewAbsReq"]);
								
								ExtControl.setAttr("lblAbsAply", "class", "circle_green");
								ExtControl.setAttr("lblAbsProc", "class", "circle_yellow");
								ExtControl.setAttr("lblAbsFalse", "class", "circle_red_fill");
								
								ExtControl.setAttr("btnNewAbsReq", "class", "btn_b_gray");
			
								ExtControl.setAttr("lblFrfAbsAplyDt", "class", "text_red");
								ExtControl.setAttr("lblFrfAbsProcResult", "class", "text_red");
								ExtControl.setAttr("optFrfAbsAplyDt", "class", "text_red");
								ExtControl.setAttr("optFrfAbsProcResult", "class", "text_red");
								ExtControl.setAttr("lblAbsAplyFalseRsn", "class", "condition_text01");
								
							}
							
							//신청가능
							if(vsRtnYn == "Y"){
								util.Control.setEnable(app, true, ["btnNewRtnReq"]);
								
								ExtControl.setAttr("lblRtnAply", "class", "circle_green_fill");
								ExtControl.setAttr("lblRtnProc", "class", "circle_yellow");
								ExtControl.setAttr("lblRtnFalse", "class", "circle_red");
								
								ExtControl.setAttr("btnNewRtnReq", "class", "btn_b_green");
								
								ExtControl.setAttr("lblFrfRtnAplyDt", "class", "text_green");
								ExtControl.setAttr("lblFrfRtnProcResult", "class", "text_green");
								ExtControl.setAttr("optFrfRtnAplyDt", "class", "text_green");
								ExtControl.setAttr("optFrfRtnProcResult", "class", "text_green");
								ExtControl.setAttr("lblRtnAplyFalseRsn", "class", "condition_text02");
								
							// 진행중
							}else if(vsRtnYn == "P"){
								util.Control.setEnable(app, true, ["btnNewRtnReq"]);
								
								ExtControl.setAttr("lblRtnAply", "class", "circle_green");
								ExtControl.setAttr("lblRtnProc", "class", "circle_yellow_fill");
								ExtControl.setAttr("lblRtnFalse", "class", "circle_red");
								
								ExtControl.setAttr("btnNewRtnReq", "class", "btn_b_yellow");
								
								ExtControl.setAttr("lblFrfRtnAplyDt", "class", "text_yellow");
								ExtControl.setAttr("lblFrfRtnProcResult", "class", "text_yellow");
								ExtControl.setAttr("optFrfRtnAplyDt", "class", "text_yellow");
								ExtControl.setAttr("optFrfRtnProcResult", "class", "text_yellow");
								
							// 신청불가
							}else{
								util.Control.setEnable(app, false, ["btnNewRtnReq"]);
								
								ExtControl.setAttr("lblRtnAply", "class", "circle_green");
								ExtControl.setAttr("lblRtnProc", "class", "circle_yellow");
								ExtControl.setAttr("lblRtnFalse", "class", "circle_red_fill");
								
								ExtControl.setAttr("btnNewRtnReq", "class", "btn_b_gray");
			
								ExtControl.setAttr("lblFrfRtnAplyDt", "class", "text_red");
								ExtControl.setAttr("lblFrfRtnProcResult", "class", "text_red");
								ExtControl.setAttr("optFrfRtnAplyDt", "class", "text_red");
								ExtControl.setAttr("optFrfRtnProcResult", "class", "text_red");
								ExtControl.setAttr("lblRtnAplyFalseRsn", "class", "condition_text01");
								
							}
						}
					});
				}
				
				/**
				 * @desc 군휴학신청 메뉴로 이동
				 * @param 
				 * @return void
				 * @author Choi In Seong 2016. 3. 30
				 */
				
			//	moPage.onClick_BtnAbsReq = function(sender) {
			//		// 메뉴열기 
			//		// 학사의 휴학신청
			//		// 프로그램 완성 후 링크 예정 2016.04.01
			//		doOnClickExtCsrPAplyAbs(sender);
			//	};
				
				
				/**
				 * @desc 복학신청 메뉴로 이동
				 * @param 
				 * @return void
				 * @author Choi In Seong 2016. 3. 30
				 */
				
			//	moPage.onClick_BtnRtnReq = function(sender) {
			//		// 메뉴열기 
			//		// 학사의 복학신청
			//		doOnClickExtCsrPAplyRetu(sender);
			//	};
				
				
				moPage.onClick_BtnRtnReq = function(sender) {
					// 메뉴열기 
					// 학사의 복학신청
					doOnClickExtCsrPAplyRetu(sender);
				}
				
				
			//	moPage.onClick_BtnNewRtnReq1 = function(sender) {
			//		// 메뉴열기 
			//		// 학사의 복학신청
			//		doOnClickExtCsrPAplyRetu(sender);
			//	}
				
				
				
				
			//	moPage.onClick_BtnAbsReq = function() {
			//		doOnClickExtCsrPAplyAbs(sender);
			//	};
				
				return moPage;
			};;
			// End - User Script
			
			// Header
			var dataMap_1 = new cpr.data.DataMap("dmFrfAbsResult");
			dataMap_1.parseData({
				"columns" : [
					{
						"name": "APLY_STAT_NM",
						"dataType": "string"
					},
					{
						"name": "DISP_APLY_DT",
						"dataType": "string"
					},
					{
						"name": "APLY_RESULT",
						"dataType": "string"
					},
					{
						"name": "CANCEL_REMARK",
						"dataType": "string"
					},
					{
						"name": "APLY_STAT_RCD",
						"dataType": "string"
					}
				]
			});
			app.register(dataMap_1);
			
			var dataMap_2 = new cpr.data.DataMap("dmFrfRtnResult");
			dataMap_2.parseData({
				"columns" : [
					{
						"name": "APLY_STAT_NM",
						"dataType": "string"
					},
					{
						"name": "DISP_APLY_DT",
						"dataType": "string"
					},
					{
						"name": "APLY_RESULT",
						"dataType": "string"
					},
					{
						"name": "CANCEL_REMARK",
						"dataType": "string"
					},
					{
						"name": "APLY_STAT_RCD",
						"dataType": "string"
					}
				]
			});
			app.register(dataMap_2);
			
			var dataMap_3 = new cpr.data.DataMap("dmResOnLoad");
			dataMap_3.parseData({
				"columns" : [
					{
						"name": "strAbsPlanYn",
						"dataType": "string"
					},
					{
						"name": "strRtnPlanYn",
						"dataType": "string"
					},
					{
						"name": "strAbsYn",
						"dataType": "string"
					},
					{
						"name": "strRtnYn",
						"dataType": "string"
					},
					{
						"name": "strAbsAplyFalseRsn",
						"dataType": "string"
					},
					{
						"name": "strRtnAplyFalseRsn",
						"dataType": "string"
					},
					{
						"name": "strKeyDate",
						"dataType": "string"
					},
					{
						"name": "frfAbsResultYn",
						"dataType": "string"
					},
					{
						"name": "frfRtnResultYn",
						"dataType": "string"
					},
					{
						"name": "strAbsStDt",
						"dataType": "string"
					},
					{
						"name": "strAbsEndDt",
						"dataType": "string"
					},
					{
						"name": "strRtnStDt",
						"dataType": "string"
					},
					{
						"name": "strRtnEndDt",
						"dataType": "string"
					}
				]
			});
			app.register(dataMap_3);
			
			var dataMap_4 = new cpr.data.DataMap("dmYearSmt");
			dataMap_4.parseData({
				"columns" : [
					{
						"name": "CD_PRP4",
						"dataType": "string"
					},
					{
						"name": "LAN_DIV_RCD",
						"dataType": "string"
					},
					{
						"name": "CD_PRP3",
						"dataType": "string"
					},
					{
						"name": "CD_CLS",
						"dataType": "string"
					},
					{
						"name": "CD",
						"dataType": "string"
					}
				]
			});
			app.register(dataMap_4);
			
			var dataMap_5 = new cpr.data.DataMap("dmReqList");
			dataMap_5.parseData({
				"columns" : [{
					"name": "strStudId",
					"dataType": "string"
				}]
			});
			app.register(dataMap_5);
			var submission_1 = new cpr.protocols.Submission("subOnLoad");
			submission_1.action = "/csr/ExtCsrAltAplyIqy/";
			submission_1.mediaType = "application/x-www-form-urlencoded";
			submission_1.addRequestData(dataMap_5);
			submission_1.addResponseData(dataMap_3, false);
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
			var group_1 = new cpr.controls.Container("grpData");
			// Layout
			var xYLayout_2 = new cpr.controls.layouts.XYLayout();
			group_1.setLayout(xYLayout_2);
			(function(container){
				var group_2 = new cpr.controls.Container("group6");
				// Layout
				var xYLayout_3 = new cpr.controls.layouts.XYLayout();
				group_2.setLayout(xYLayout_3);
				(function(container){
					var group_3 = new cpr.controls.Container("group9");
					// Layout
					var xYLayout_4 = new cpr.controls.layouts.XYLayout();
					group_3.setLayout(xYLayout_4);
					(function(container){
					})(group_3);
					container.addChild(group_3, {
						"top": "10px",
						"left": "550px",
						"width": "60px",
						"height": "215px"
					});
				})(group_2);
				container.addChild(group_2, {
					"top": "70px",
					"left": "15px",
					"width": "1170px",
					"height": "240px"
				});
				var output_1 = new cpr.controls.Output("optRtnTitle");
				output_1.value = "";
				container.addChild(output_1, {
					"top": "10px",
					"left": "30px",
					"width": "1159px",
					"height": "45px"
				});
				var button_1 = new cpr.controls.Button("btnNewRtnReq");
				button_1.value = "복학 신청";
				if(typeof onBtnNewRtnReqClick == "function") {
					button_1.addEventListener("click", onBtnNewRtnReqClick);
				}
				container.addChild(button_1, {
					"top": "105px",
					"left": "30px",
					"width": "525px",
					"height": "174px"
				});
				var output_2 = new cpr.controls.Output("optRtnAplyFalseRsn");
				output_2.value = "";
				container.addChild(output_2, {
					"top": "320px",
					"left": "40px",
					"width": "1135px",
					"height": "70px"
				});
				var group_4 = new cpr.controls.Container("group8");
				// Layout
				var xYLayout_5 = new cpr.controls.layouts.XYLayout();
				group_4.setLayout(xYLayout_5);
				(function(container){
				})(group_4);
				container.addChild(group_4, {
					"top": "110px",
					"left": "635px",
					"width": "535px",
					"height": "167px"
				});
				var group_5 = new cpr.controls.Container("frfRtnResult");
				group_5.visible = false;
				group_5.style.setClasses(["form-box"]);
				// Layout
				var xYLayout_6 = new cpr.controls.layouts.XYLayout();
				group_5.setLayout(xYLayout_6);
				(function(container){
					var output_3 = new cpr.controls.Output("optFrfRtnAplyDt");
					output_3.value = "신청일자 :";
					container.addChild(output_3, {
						"top": "10px",
						"left": "5px",
						"width": "170px",
						"height": "55px"
					});
					var output_4 = new cpr.controls.Output("optFrfRtnProcResult");
					output_4.value = "처리상태 :";
					container.addChild(output_4, {
						"top": "75px",
						"left": "5px",
						"width": "170px",
						"height": "55px"
					});
					var output_5 = new cpr.controls.Output("optFrfRtnProcResult");
					output_5.value = "";
					output_5.bind("value").toDataMap(app.lookup("dmFrfRtnResult"), "APLY_RESULT");
					container.addChild(output_5, {
						"top": "75px",
						"left": "190px",
						"width": "310px",
						"height": "55px"
					});
					var output_6 = new cpr.controls.Output("optFrfRtnAplyDt");
					output_6.value = "";
					output_6.dataType = "date";
					output_6.format = "YYYY.MM.DD";
					output_6.bind("value").toDataMap(app.lookup("dmFrfRtnResult"), "DISP_APLY_DT");
					container.addChild(output_6, {
						"top": "10px",
						"left": "190px",
						"width": "235px",
						"height": "55px"
					});
					var output_7 = new cpr.controls.Output("frfOptRtnCancelRemark");
					output_7.visible = false;
					output_7.value = "";
					output_7.bind("value").toDataMap(app.lookup("dmFrfRtnResult"), "CANCEL_REMARK");
					container.addChild(output_7, {
						"top": "10px",
						"left": "630px",
						"width": "10px",
						"height": "35px"
					});
					var output_8 = new cpr.controls.Output("output2");
					output_8.visible = false;
					output_8.value = "";
					output_8.bind("value").toDataMap(app.lookup("dmFrfRtnResult"), "APLY_STAT_RCD");
					container.addChild(output_8, {
						"top": "5px",
						"left": "660px",
						"width": "15px",
						"height": "40px"
					});
				})(group_5);
				container.addChild(group_5, {
					"top": "115px",
					"left": "645px",
					"width": "530px",
					"height": "144px"
				});
				var output_9 = new cpr.controls.Output("label3");
				output_9.value = "\u203b 신청결과를 다음날 오후에 확인 후 수강신청 해 주십시오.";
				container.addChild(output_9, {
					"top": "405px",
					"left": "30px",
					"width": "675px",
					"height": "25px"
				});
			})(group_1);
			container.addChild(group_1, {
				"top": "35px",
				"left": "5px",
				"width": "1225px",
				"height": "635px"
			});
			
			var userDefinedControl_1 = new udc.com.appHeader("appheader1");
			container.addChild(userDefinedControl_1, {
				"top": "5px",
				"right": "5px",
				"left": "5px",
				"height": "25px"
			});
			
			var embeddedApp_1 = new cpr.controls.EmbeddedApp("emaort1");
			cpr.core.App.load("app/csr/impExtCsrPAplyAbs", function(app) {
				if(app){
					embeddedApp_1.app = app;
				}
			});
			container.addChild(embeddedApp_1, {
				"top": "675px",
				"left": "45px",
				"width": "100px",
				"height": "25px"
			});
			
			var embeddedApp_2 = new cpr.controls.EmbeddedApp("emaort2");
			cpr.core.App.load("app/csr/impExtCsrPAplyRetu", function(app) {
				if(app){
					embeddedApp_2.app = app;
				}
			});
			container.addChild(embeddedApp_2, {
				"top": "675px",
				"left": "150px",
				"width": "100px",
				"height": "25px"
			});
			
			var output_10 = new cpr.controls.Output("optRtnFalse");
			output_10.value = "";
			container.addChild(output_10, {
				"top": "155px",
				"left": "580px",
				"width": "40px",
				"height": "40px"
			});
			
			var output_11 = new cpr.controls.Output("optRtnProc");
			output_11.value = "";
			container.addChild(output_11, {
				"top": "205px",
				"left": "580px",
				"width": "40px",
				"height": "40px"
			});
			
			var output_12 = new cpr.controls.Output("optRtnAply");
			output_12.value = "";
			container.addChild(output_12, {
				"top": "255px",
				"left": "580px",
				"width": "40px",
				"height": "40px"
			});
			if(typeof onBodyLoad == "function"){
				app.addEventListener("load", onBodyLoad);
			}
		}
	});
	app.title = "학적변동신청내역조회";
	cpr.core.Platform.INSTANCE.register(app);
})();
