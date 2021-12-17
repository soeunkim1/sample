/*
 * App URI: app/ccr/extCcrSTlsnReqList
 * Source Location: app/ccr/extCcrSTlsnReqList.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("app/ccr/extCcrSTlsnReqList", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			﻿//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
			/// <xtmlink path="./extCcrSTlsnReqList.xtm"/>
			
			/**
			 * 수강신청조회
			 * @class stdCcrSTlsnReqList
			 * @author 박갑수 at 2016. 4. 19
			 */
			var extCcrSTlsnReqList = function() {
				var moPage = new Page();
				
				// 임포트용 데이터 통신 오브젝트
				var moPObject = new Page();
				
				// 객체검색팝업 호출
				moPObject.moIdsForStdCmnPObjSch = [
				{
					controlId			:	"btnSaCd",
					iCd					:	"",
					iNm					:	"ipbSaNm",
					iObjDivRcd			:	["CC009SA","CC009OG"],
					iStartObject    	:   "",
					iOtDivRcd			:	"",
					iOtIsTreeView	:	"",
					iLanDivRcd		:	"",
					iKeyDate			:	"/root/keyDateMap/ST_DT",
					iKeyEndDate		:	"",
					oObjDivRcd		:	"/root/reqKey/strSaObjDivRcd",
					oCd					:	"/root/reqKey/strSaCd",
					oCdNm				:	"ipbSaNm",
					oBegDt				:	"",
					oEndDt				:	"",
					oLanDivRcd		:	"",
					func 					:  function(){
						
					}
				}];
				
				// 학생검색팝업
				moPObject.moIdsForStdCsrPStSearch = [
				{
					controlId 					: "btnStudId",
					iStudNo 					: "ipbStudId",	
					iStudId 						: "",
					iStudNm 					: "",
					iKeyDate 					: "/root/keyDateMap/ST_DT", 
					iObjDivRcd 				: "",
					iObjCd 						: "",
					iObjNm 					: "",
					iStatRcd 					: "",
					iStudDivRcd				: "",
					oStudId 					: "/root/reqKey/strStudId",
					oStudNo 					: "ipbStudId",
					oStudNm 					: "",
					oStatNm 					: "",
					oStatRcd 					: "",
					oProcRslt 					: "",
					oProcRsltYear 			: "",
					oSaNm						: "ipbSaNm",
					oSaCd 						: "/root/reqKey/strSaCd",
					oSpNm 					: "",
					oSpCd 						: "",
					oOgNm 					: "",
					oOgCd 						: "",
					oStudDivRcd				: "",
					oStudDivNm				: "",
					oBirthday					: "",
					oGenderRcd				: "",
					oGenderNm				: "",
					func : function() {
						// 검색조건이 있을경우 조회
						var vsSchYearRcd = util.Control.getValue(app, "cbbSchYearRcd");
						var vsSmtRcd = util.Control.getValue(app, "cbbSmtRcd");
						var vsStudId = util.DataMap.getValue(app, "dmReqKey", "strStudId");
						
						if(!ValueUtil.isNull(vsSchYearRcd) && !ValueUtil.isNull(vsSmtRcd) && !ValueUtil.isNull(vsStudId)){
							util.Header.clickSearch(app);
						}
					}
				}];
				
				// 학년도 학기를 원래데이터로 되돌리기위한 변수
				var msSchYearRcd = "";
				var msSmtRcd = "";
				
				/**
				 * @desc import 헤더 초기화
				 * @param 
				 * @return  void
				 * @author 박갑수 at 2016. 4. 19
				 */
				moPage.onLoadImportDone_ImpTitle = function() {
					// import 헤더 초기화
					doHeaderOnLoad();
				};
				
				/**
				 * @desc onLoad 실행
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 4. 19
				 */
				moPage.onModelConstructDone_StdCcrSTlsnReqList = function() {
					// 개인권한[CC00104] : 
					if (moPageInfo.authRngRcd != "CC00104" && moPageInfo.authRngRcd != "CC00101") {
						// 리피트 초기 설정
			//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
			//			ExtRepeat.init(["rptCcrTlsnReq"]);
					}
					// 검색조건 초기 설정
			//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
			//		ExtGroup.initSearchBox("grpSearch", ["grpData"]);
					
					// 서브미션 호출
					//strCommand: onLoad 
					util.Submit.send(app, "subOnLoad", function(pbSuccess){
						if(pbSuccess){
							util.Control.redraw(app, ["cbbSchYearRcd", "cbbSmtRcd", "cbbClassRcd"]);
							
							
							var vsSmtRcd	= util.DataMap.getValue(app, "dmKeyDateMap", "SMT");
							
							if(vsSmtRcd == "CA00391" || vsSmtRcd == "CA00393"){
								moIdsForStdCmnPObjSch[0].iObjDivRcd = ["CC009SA","CC009OG"] ;
								ExtControl.setTextValue("lblDeptNm", "소속");
								util.Control.redraw(app, "lblDeptNm");
								
								setStdCmnPObjSchObjInfo();
							}else{
								moIdsForStdCmnPObjSch[0].iObjDivRcd = ["CC009SA"] ;
								ExtControl.setTextValue("lblDeptNm", "학사부서명");
								util.Control.redraw(app, "lblDeptNm");					
							}
								
								
							
							// 권한에따른 컨트롤 활성화 처리
							doVisibleCtlByAuth();
						}
					}, true);
				};
				
				/**
				 * 권한에 따른 컨트롤 활성/비활성 처리
				 * @param 
				 * @type void
				 * @author 박갑수 at 2016. 4. 19
				 */	
				function doVisibleCtlByAuth() {
					
					
					// 개인권한[CC00104] : 
					if (moPageInfo.authRngRcd == "CC00104" || moPageInfo.authRngRcd == "CC00101") {
						util.Control.setValue(app, "ipbSaNm", util.DataMap.getValue(app, "dmResOnLoad", "strSaNm"));
						util.DataMap.setValue(app, "dmReqKey", "strSaCd", util.DataMap.getValue(app, "dmResOnLoad", "strSaCd"));
						util.Control.setValue(app, "ipbStudId", util.DataMap.getValue(app, "dmResOnLoad", "strStudNo"));
						util.DataMap.setValue(app, "dmReqKey", "strStudId", util.DataMap.getValue(app, "dmResOnLoad", "strStudId"));
						util.Control.setValue(app, "ipbLvl", util.DataMap.getValue(app, "dmResOnLoad", "strLvl"));
						
						util.Control.setVisible(app, false, ["btnSaCd", "btnStudId", "lblLvl", "ipbLvl", "ipbDivclsNm", "lblDivclsNm"]);
						util.Control.setEnable(app, false, ["ipbSaNm", "ipbStudId", "ipbLvl", "cbbSchYearRcd", "cbbSmtRcd"]);
						
						util.Control.setStyleAttr(app, "ckbTLsnCancel", "left", "810");
						
						if(moPageInfo.authRngRcd == "CC00101"){
							util.Control.setVisible(app, false, ["ipbSaNm", "lblDeptNm", "ckbTLsnCancel", "ipbDivclsNm", "lblDivclsNm"]);
							util.Control.setVisible(app, true, ["btnStudId"]);
							util.Control.setEnable(app, true, ["ipbStudId"]);
							util.Control.setStyleAttr(app, "lblStId", "left", "360");
							util.Control.setStyleAttr(app, "ipbStudId", "left", "434");
							util.Control.setStyleAttr(app, "btnStudId", "left", "535");
							
						}
						
						// 바로조회
						if(moPageInfo.authRngRcd == "CC00104" ){
							util.Header.clickSearch(app);
						}
					}
				};
				
				/**
				 * @desc [btnSaCd]소속부서(돋보기버튼) onClick 이벤트
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 4. 19
				 */
				moPage.onClick_BtnSaCd = function(sender) {
					// 객체검색팝업 호출
					doOnClickStdCmnPObjSch(sender);
				};
				
				/**
				 * @desc [ipbSaNm]부서명 onValueChanged 이벤트
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 4. 19
				 */
				moPage.onValueChanged_IpbSaNm = function(sender) {
					// 값변경시 객체검색팝업 호출
					doOnChangeStdCmnPObjSch(sender);
				};
				
				/**
				 * @desc [cbbSchYearRcd]학년도 onValueChanged 이벤트
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 4. 19
				 */
				moPage.onValueChanged_CbbSmtRcd = function() {
					// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
					doChangeYearSmt("smt");
				};
				
				/**
				 * @desc [cbbSmtRcd]학기 onValueChanged 이벤트
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 4. 19
				 */
				moPage.onValueChanged_CbbSchYearRcd = function() {
					// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
					doChangeYearSmt("year");
				};
				
				/**
				 * @desc 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 4. 19
				 */
				function doChangeYearSmt(psDiv) {
					//strCommand: date 
					util.Submit.send(app, "subDate", function(pbSuccess){
						if(pbSuccess){				
							msSchYearRcd = util.DataMap.getValue(app, "dmKeyDateMap", "YEAR");
							msSmtRcd = util.DataMap.getValue(app, "dmKeyDateMap", "SMT");
							
							if(msSmtRcd == "CA00391" || msSmtRcd == "CA00393"){
								moIdsForStdCmnPObjSch[0].iObjDivRcd = ["CC009SA","CC009OG"] ;
								ExtControl.setTextValue("lblDeptNm", "소속");
								util.Control.redraw(app, "lblDeptNm");
								
								setStdCmnPObjSchObjInfo();
								
							}else{
								moIdsForStdCmnPObjSch[0].iObjDivRcd = ["CC009SA"] ;
								ExtControl.setTextValue("lblDeptNm", "학사부서명");
								util.Control.redraw(app, "lblDeptNm");
								
								util.DataMap.setValue(app, "dmReqKey", "strSaObjDivRcd", "");
								util.DataMap.setValue(app, "dmReqKey", "strSaCd", "");					
								util.Control.setValue(app, "ipbSaNm", "");
							}
							
							
							
						// Exception 발생시
						}else {
							if(psDiv == "year"){
								util.Control.setValue(app, "cbbSchYearRcd", msSchYearRcd);
							}else if(psDiv == "smt"){
								util.Control.setValue(app, "cbbSmtRcd", msSmtRcd);
							}
						}
					});
				};
				
				/**
				 * @desc [btnStudId]학번(돋보기버튼) onClick 이벤트
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 4. 19
				 */
				moPage.onClick_BtnStudId = function(sender) {
					// 학사부서조건 초기화
					util.DataMap.setValue(app, "dmReqKey", "strSaObjDivRcd", "");
					util.DataMap.setValue(app, "dmReqKey", "strSaCd", "");
					util.Control.setValue(app, "ipbSaNm", "");
					
					// 학생검색팝업 호출
					doOnClickStdCsrPStSearch(sender);
				};
				
				/**
				 * @desc [ipbStudId]학번 onValueChanged 이벤트
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 4. 19
				 */
				moPage.onValueChanged_IpbStudId = function(sender) {
					// 학사부서조건 초기화
					util.DataMap.setValue(app, "dmReqKey", "strSaObjDivRcd", "");
					util.DataMap.setValue(app, "dmReqKey", "strSaCd", "");
					util.Control.setValue(app, "ipbSaNm", "");
					
					// 값변경시 학생검색팝업 호출
					doOnChangeStdCsrPStSearch(sender);
				};
				
				/**
				 * @desc [btnSearch]조회 onClick 이벤트
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 4. 19
				 */
				moPage.onClick_BtnSearch = function() {
					// 작업영역 리피트 변경 내역 체크
					if(util.Grid.isModified(app, "", "CRM")){
						return false;
					}
			
					// 조회조건 필수 체크
					if(!util.validate(app, ["cbbSchYearRcd", "cbbSmtRcd"])){
						return false;
					}
					
					// 조회조건 필수체크 - 소속부서, 학번 중 한개는 입력되었는지 확인.
					if(!moPage.checkNotNullCtl()){
						return false;
					}
					
					
					
					var vsSmtRcd	= util.DataMap.getValue(app, "dmKeyDateMap", "SMT");
					if(vsSmtRcd == "CA00391" || vsSmtRcd == "CA00393"){
						
					}
					
					
			
					// 조회
					doList(function(pbSuccess) {
						if (pbSuccess){
							// 조회 : "조회되었습니다." header 메세지 표시
							util.Msg.notify(app, "NLS.INF.M024");
											
							util.removeCover(app);
						}else {
							var vsStudId = util.DataMap.getValue(app, "dmResOnLoad", "strStudId");
							if(ValueUtil.fixNull(vsStudId) == "X"){
								util.removeCover(app);
							}
						}
					});
				};
				
				/**
				 * @desc 소속부서, 학번 중 한개는 입력되었는지 확인.
				 * @param 
				 * @return boolean
				 * @author 박갑수 at 2016. 4. 19
				 */
				moPage.checkNotNullCtl = function() {
					var vbValid = true;
					
					// 소속부서
					var vsSaNm = util.Control.getValue(app, "ipbSaNm");
					// 학번
					var vsStudId = util.Control.getValue(app, "ipbStudId");
					
					if(ValueUtil.isNull(vsSaNm) && ValueUtil.isNull(vsStudId)){
						var vsMsgParam = ExtControl.getTextValue("lblDeptNm") + ", " + ExtControl.getTextValue("lblStId");
						
						// "조회조건[@1] 중 하나는 반드시 입력해야 합니다." 메시지 표시
						util.Msg.alert("NLS-CMM-M016", [vsMsgParam]);
						
						vbValid = false;
						return vbValid;
					}
					
					return vbValid;
				};
				
				/**
				 * @desc 휴보강목록 조회
				 * @param poCallBackFunc 콜백정의
				 * @return void
				 * @author 박갑수 at 2016. 4. 19
				 */
				function doList(poCallBackFunc) {
					// 조회 시 시간이 오래걸릴 경우 컨트롤들이 열린 상태로 조회가 되므로 막아줌
					util.coverPage(app);
					
					//strCommand: list 
					util.Submit.send(app, "subList", function(pbSuccess){
						if(pbSuccess){
							util.Control.redraw(app, "grdCcrTlsnReq");
							
							// 개인권한[CC00104] : 개인권한일경우 init 함수를 제외하여 따로 RowCont표시를 해야함.
							if (moPageInfo.authRngRcd == "CC00104" || moPageInfo.authRngRcd == "CC00101") {
								ExtRepeat.setCtlRptRowCnt("rptCcrTlsnReq");
							}
							
							// 조회 후 콜백함수 수행
							if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess); 
						}
					});
				};
				
				return moPage;
			};;
			// End - User Script
			
			// Header
			var dataSet_1 = new cpr.data.DataSet("dsSchYearRcdList");
			dataSet_1.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_1);
			
			var dataSet_2 = new cpr.data.DataSet("dsSmtRcdList");
			dataSet_2.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_2);
			
			var dataSet_3 = new cpr.data.DataSet("dsClassRcdList");
			dataSet_3.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_3);
			
			var dataSet_4 = new cpr.data.DataSet("dsCcrTlsnReq");
			dataSet_4.parseData({
				"columns": [
					{"name": "STUD_NM"},
					{"name": "STUD_NO"},
					{"name": "SA_NM"},
					{"name": "SA_CD"},
					{"name": "PROC_RSLT_YEAR"},
					{"name": "PNT"},
					{"name": "SB_CD"},
					{"name": "SB_NM"},
					{"name": "DIVCLS_CD"},
					{"name": "RE_TLSN_SCH_YEAR_RCD_NM"},
					{"name": "RE_TLSN_DIV_RCD_NM"},
					{"name": "RE_TLSN_SB_NM"},
					{"name": "LECT_TIME_CNT"},
					{"name": "MAIN_PROF"},
					{"name": "CANCEL_DTHR"},
					{"name": "XCP_DIV_RCD_NM"},
					{"name": "RE_TLSN_SMT_RCD_NM"},
					{"name": "DIVCLS_NM"},
					{"name": "CMP_DIV_RCD_NM"},
					{"name": "CLASS_RCD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_4);
			var dataMap_1 = new cpr.data.DataMap("dmResOnLoad");
			dataMap_1.parseData({
				"columns" : [
					{
						"name": "strStudId",
						"dataType": "string"
					},
					{
						"name": "strStudNo",
						"dataType": "string"
					},
					{
						"name": "strLvl",
						"dataType": "string"
					},
					{
						"name": "strSaCd",
						"dataType": "string"
					},
					{
						"name": "strSaNm",
						"dataType": "string"
					}
				]
			});
			app.register(dataMap_1);
			
			var dataMap_2 = new cpr.data.DataMap("dmReqKey");
			dataMap_2.parseData({
				"columns" : [
					{
						"name": "strStudId",
						"dataType": "string"
					},
					{
						"name": "strStudNo",
						"dataType": "string"
					},
					{
						"name": "strTlsnCancel",
						"dataType": "string"
					},
					{
						"name": "strLvl",
						"dataType": "string"
					},
					{
						"name": "strSaObjDivRcd",
						"dataType": "string"
					},
					{
						"name": "strSaCd",
						"dataType": "string"
					},
					{
						"name": "strSaNm",
						"dataType": "string"
					},
					{
						"name": "strDivclsNm",
						"dataType": "string"
					},
					{
						"name": "strClassRcd",
						"dataType": "string"
					}
				]
			});
			app.register(dataMap_2);
			
			var dataMap_3 = new cpr.data.DataMap("dmKeyDateMap");
			dataMap_3.parseData({
				"columns" : [
					{
						"name": "BEF_DT",
						"dataType": "string"
					},
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
			app.register(dataMap_3);
			var submission_1 = new cpr.protocols.Submission("subOnLoad");
			submission_1.action = "/ccr/ExtCcrTlsnReqList/";
			submission_1.mediaType = "application/x-www-form-urlencoded";
			submission_1.addResponseData(dataSet_1, false);
			submission_1.addResponseData(dataSet_2, false);
			submission_1.addResponseData(dataMap_3, false);
			submission_1.addResponseData(dataMap_1, false);
			submission_1.addResponseData(dataSet_3, false);
			app.register(submission_1);
			
			var submission_2 = new cpr.protocols.Submission("subDate");
			submission_2.action = "/cmn/StdCmnDateTime/";
			submission_2.mediaType = "application/x-www-form-urlencoded";
			submission_2.addRequestData(dataMap_3);
			submission_2.addResponseData(dataMap_3, false);
			app.register(submission_2);
			
			var submission_3 = new cpr.protocols.Submission("subList");
			submission_3.action = "/ccr/ExtCcrTlsnReqList/";
			submission_3.mediaType = "application/x-www-form-urlencoded";
			submission_3.addRequestData(dataMap_2);
			submission_3.addRequestData(dataMap_3);
			submission_3.addResponseData(dataSet_4, false);
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
			var embeddedApp_1 = new cpr.controls.EmbeddedApp("emaStdCmnPobjSch");
			cpr.core.App.load("app/cmn/impStdCmnPObjSch", function(app) {
				if(app){
					embeddedApp_1.app = app;
				}
			});
			container.addChild(embeddedApp_1, {
				"top": "675px",
				"left": "15px",
				"width": "100px",
				"height": "25px"
			});
			
			var group_1 = new cpr.controls.Container("grpData");
			// Layout
			var xYLayout_2 = new cpr.controls.layouts.XYLayout();
			group_1.setLayout(xYLayout_2);
			(function(container){
				var userDefinedControl_1 = linker.userDefinedControl_1 = new udc.com.comTitle();
				userDefinedControl_1.bind("title").toLanguage("UI-DB-BKGLIST");
				container.addChild(userDefinedControl_1, {
					"top": "5px",
					"left": "5px",
					"width": "215px",
					"height": "25px"
				});
				var grid_1 = linker.grid_1 = new cpr.controls.Grid("grdCcrTlsnReq");
				grid_1.init({
					"dataSet": app.lookup("dsCcrTlsnReq"),
					"columns": [
						{"width": "40px"},
						{"width": "140px"},
						{"width": "73px"},
						{"width": "74px"},
						{"width": "45px"},
						{"width": "45px"},
						{"width": "76px"},
						{"width": "145px"},
						{"width": "48px"},
						{"width": "76px"},
						{"width": "53px"},
						{"width": "90px"},
						{"width": "81px"},
						{"width": "128px"},
						{"width": "81px"},
						{"width": "72px"},
						{"width": "63px"},
						{
							"width": "85px",
							"visible": false
						},
						{
							"width": "100px",
							"visible": false
						}
					],
					"header": {
						"rows": [{"height": "27px"}],
						"cells": [
							{
								"constraint": {"rowIndex": 0, "colIndex": 0},
								"configurator": function(cell){
									cell.text = "No";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 1},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-GLS-MJR");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 2},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-GLS-STUD_ID");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 3},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-SCR-STUDNM");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 4},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-GLS-SHYR");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 5},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-GLS-SHYR");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 6},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-DB-SB_CD");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 7},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-DB-SB_NM");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 8},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-GLS-DIVCLS");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 9},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-DB-SB_CD");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 10},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-DB-PNT");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 11},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-SCR-RETLSNSCHYEAR");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 12},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-SCR-REDOSMT");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 13},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-SCR-RETLSNSBJNM");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 14},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-SCR-RETLSNDIV");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 15},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-DB-CLASSTIME_NM");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 16},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-SCR-CHARGPROF");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 17},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-DB-CANCEL_DT");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 18},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-SCR-CANCELRSNNM");
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
									cell.columnType = "rowindex";
									cell.style.css({
										"text-align" : "center"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 1},
								"configurator": function(cell){
									cell.columnName = "SA_NM";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 2},
								"configurator": function(cell){
									cell.columnName = "STUD_NO";
									cell.style.css({
										"text-align" : "center"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 3},
								"configurator": function(cell){
									cell.columnName = "STUD_NM";
									cell.style.css({
										"text-align" : "center"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 4},
								"configurator": function(cell){
									cell.columnName = "PROC_RSLT_YEAR";
									cell.style.css({
										"text-align" : "center"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 5},
								"configurator": function(cell){
									cell.columnName = "CLASS_RCD_NM";
									cell.style.css({
										"text-align" : "center"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 6},
								"configurator": function(cell){
									cell.columnName = "SB_CD";
									cell.style.css({
										"text-align" : "center"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 7},
								"configurator": function(cell){
									cell.columnName = "SB_NM";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 8},
								"configurator": function(cell){
									cell.columnName = "DIVCLS_NM";
									cell.style.css({
										"text-align" : "center"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 9},
								"configurator": function(cell){
									cell.columnName = "CMP_DIV_RCD_NM";
									cell.style.css({
										"text-align" : "center"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 10},
								"configurator": function(cell){
									cell.columnName = "PNT";
									cell.style.css({
										"text-align" : "right"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 11},
								"configurator": function(cell){
									cell.columnName = "RE_TLSN_SCH_YEAR_RCD_NM";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 12},
								"configurator": function(cell){
									cell.columnName = "RE_TLSN_SMT_RCD_NM";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 13},
								"configurator": function(cell){
									cell.columnName = "RE_TLSN_SB_NM";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 14},
								"configurator": function(cell){
									cell.columnName = "RE_TLSN_DIV_RCD_NM";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 15},
								"configurator": function(cell){
									cell.columnName = "LECT_TIME_CNT";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 16},
								"configurator": function(cell){
									cell.columnName = "MAIN_PROF";
									cell.style.css({
										"text-align" : "center"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 17},
								"configurator": function(cell){
									cell.columnName = "CANCEL_DTHR";
									cell.control = (function(){
										var output_1 = new cpr.controls.Output("gdOptCancelDthr");
										output_1.dataType = "date";
										output_1.format = "YYYY-MM-DD";
										output_1.style.css({
											"text-align" : "center"
										});
										output_1.bind("value").toDataColumn("CANCEL_DTHR");
										return output_1;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 18},
								"configurator": function(cell){
									cell.columnName = "XCP_DIV_RCD_NM";
								}
							}
						]
					}
				});
				container.addChild(grid_1, {
					"top": "30px",
					"left": "5px",
					"width": "1213px",
					"height": "563px"
				});
			})(group_1);
			container.addChild(group_1, {
				"top": "72px",
				"left": "5px",
				"width": "1225px",
				"height": "598px"
			});
			
			var userDefinedControl_2 = new udc.com.appHeader("appheader1");
			container.addChild(userDefinedControl_2, {
				"top": "5px",
				"right": "5px",
				"left": "5px",
				"height": "25px"
			});
			
			var group_2 = new cpr.controls.Container("grpSearch");
			group_2.style.setClasses(["search-box"]);
			// Layout
			var xYLayout_3 = new cpr.controls.layouts.XYLayout();
			group_2.setLayout(xYLayout_3);
			(function(container){
				var button_1 = new cpr.controls.Button("btnSearch");
				button_1.value = "";
				button_1.style.setClasses(["btn-search"]);
				button_1.bind("value").toLanguage("UI-SCR-SCH");
				if(typeof onBtnSearchClick == "function") {
					button_1.addEventListener("click", onBtnSearchClick);
				}
				container.addChild(button_1, {
					"top": "5px",
					"left": "1160px",
					"width": "60px",
					"height": "25px"
				});
				var output_2 = new cpr.controls.Output("optSchYearRcd");
				output_2.value = "";
				output_2.style.setClasses(["require"]);
				output_2.bind("value").toLanguage("UI-GLS-SCH_YEAR");
				container.addChild(output_2, {
					"top": "5px",
					"left": "5px",
					"width": "70px",
					"height": "25px"
				});
				var comboBox_1 = new cpr.controls.ComboBox("cbbSchYearRcd");
				comboBox_1.enabled = false;
				comboBox_1.userAttr({"require": "Y"});
				comboBox_1.bind("fieldLabel").toExpression("#optSchYearRcd.value");
				comboBox_1.bind("value").toDataMap(app.lookup("dmKeyDateMap"), "YEAR");
				(function(comboBox_1){
					comboBox_1.addItem(new cpr.controls.Item("선택", ""));
					comboBox_1.setItemSet(app.lookup("dsSchYearRcdList"), {
						"label": "CD_NM",
						"value": "CD"
					});
				})(comboBox_1);
				if(typeof onCbbSchYearRcdSelectionChange == "function") {
					comboBox_1.addEventListener("selection-change", onCbbSchYearRcdSelectionChange);
				}
				container.addChild(comboBox_1, {
					"top": "5px",
					"left": "80px",
					"width": "90px",
					"height": "25px"
				});
				var output_3 = new cpr.controls.Output("optSmtRcd");
				output_3.value = "";
				output_3.style.setClasses(["require"]);
				output_3.bind("value").toLanguage("UI-GLS-SMT");
				container.addChild(output_3, {
					"top": "5px",
					"left": "180px",
					"width": "70px",
					"height": "25px"
				});
				var comboBox_2 = new cpr.controls.ComboBox("cbbSmtRcd");
				comboBox_2.enabled = false;
				comboBox_2.userAttr({"require": "Y"});
				comboBox_2.bind("fieldLabel").toExpression("#optSmtRcd.value");
				comboBox_2.bind("value").toDataMap(app.lookup("dmKeyDateMap"), "SMT");
				(function(comboBox_2){
					comboBox_2.addItem(new cpr.controls.Item("선택", ""));
					comboBox_2.setItemSet(app.lookup("dsSmtRcdList"), {
						"label": "CD_NM",
						"value": "CD"
					});
				})(comboBox_2);
				if(typeof onCbbSmtRcdSelectionChange == "function") {
					comboBox_2.addEventListener("selection-change", onCbbSmtRcdSelectionChange);
				}
				container.addChild(comboBox_2, {
					"top": "5px",
					"left": "255px",
					"width": "90px",
					"height": "25px"
				});
				var output_4 = new cpr.controls.Output("optDeptNm");
				output_4.value = "소속";
				output_4.bind("value").toDataMap(app.lookup("dmTemp"), "strSchDeptNm");
				container.addChild(output_4, {
					"top": "5px",
					"left": "355px",
					"width": "90px",
					"height": "25px"
				});
				var inputBox_1 = new cpr.controls.InputBox("ipbSaNm");
				inputBox_1.bind("fieldLabel").toExpression("#optSaNm.value");
				inputBox_1.bind("value").toDataMap(app.lookup("dmReqKey"), "strSaNm");
				if(typeof onIpbSaNmValueChange == "function") {
					inputBox_1.addEventListener("value-change", onIpbSaNmValueChange);
				}
				container.addChild(inputBox_1, {
					"top": "5px",
					"left": "450px",
					"width": "140px",
					"height": "25px"
				});
				var button_2 = new cpr.controls.Button("btnSaCd");
				button_2.value = "";
				button_2.style.setClasses(["btn-pop-search"]);
				if(typeof onBtnSaCdClick == "function") {
					button_2.addEventListener("click", onBtnSaCdClick);
				}
				container.addChild(button_2, {
					"top": "5px",
					"left": "590px",
					"width": "20px",
					"height": "25px"
				});
				var output_5 = new cpr.controls.Output("optStId");
				output_5.value = "";
				output_5.bind("value").toLanguage("UI-DB-STUD_ID");
				container.addChild(output_5, {
					"top": "5px",
					"left": "620px",
					"width": "70px",
					"height": "25px"
				});
				var inputBox_2 = new cpr.controls.InputBox("ipbStudId");
				inputBox_2.maxLength = 100;
				inputBox_2.bind("fieldLabel").toExpression("#optStId.value");
				inputBox_2.bind("value").toDataMap(app.lookup("dmReqKey"), "strStudNo");
				if(typeof onIpbStudIdValueChange == "function") {
					inputBox_2.addEventListener("value-change", onIpbStudIdValueChange);
				}
				container.addChild(inputBox_2, {
					"top": "5px",
					"left": "695px",
					"width": "100px",
					"height": "25px"
				});
				var button_3 = new cpr.controls.Button("btnStudId");
				button_3.value = "";
				button_3.style.setClasses(["btn-pop-search"]);
				if(typeof onBtnStudIdClick == "function") {
					button_3.addEventListener("click", onBtnStudIdClick);
				}
				container.addChild(button_3, {
					"top": "5px",
					"left": "795px",
					"width": "20px",
					"height": "25px"
				});
				var output_6 = new cpr.controls.Output("optLvl");
				output_6.value = "";
				output_6.bind("value").toLanguage("UI-GLS-SHYR");
				container.addChild(output_6, {
					"top": "5px",
					"left": "979px",
					"width": "50px",
					"height": "25px"
				});
				var numberEditor_1 = new cpr.controls.NumberEditor("ipbLvl");
				numberEditor_1.format = "9";
				numberEditor_1.bind("fieldLabel").toExpression("#optLvl.value");
				numberEditor_1.bind("value").toDataMap(app.lookup("dmReqKey"), "strLvl");
				container.addChild(numberEditor_1, {
					"top": "5px",
					"left": "1033px",
					"width": "40px",
					"height": "25px"
				});
				var checkBox_1 = new cpr.controls.CheckBox("ckbTLsnCancel");
				checkBox_1.visible = false;
				checkBox_1.value = "";
				checkBox_1.trueValue = "CANCEL";
				checkBox_1.falseValue = "";
				checkBox_1.text = "수강취소포함";
				checkBox_1.bind("value").toDataMap(app.lookup("dmReqKey"), "strTlsnCancel");
				container.addChild(checkBox_1, {
					"top": "5px",
					"left": "1095px",
					"width": "45px",
					"height": "25px"
				});
				var output_7 = new cpr.controls.Output("optDivclsNm");
				output_7.value = "";
				output_7.bind("value").toLanguage("UI-GLS-SHYR");
				container.addChild(output_7, {
					"top": "5px",
					"left": "824px",
					"width": "50px",
					"height": "25px"
				});
				var comboBox_3 = new cpr.controls.ComboBox("cbbClassRcd");
				comboBox_3.bind("value").toDataMap(app.lookup("dmReqKey"), "strClassRcd");
				(function(comboBox_3){
					comboBox_3.addItem(new cpr.controls.Item("전체", ""));
					comboBox_3.setItemSet(app.lookup("dsClassRcdList"), {
						"label": "CD_NM",
						"value": "CD"
					});
				})(comboBox_3);
				container.addChild(comboBox_3, {
					"top": "5px",
					"left": "880px",
					"width": "90px",
					"height": "26px"
				});
			})(group_2);
			container.addChild(group_2, {
				"top": "35px",
				"left": "5px",
				"width": "1225px",
				"height": "32px"
			});
			
			var embeddedApp_2 = new cpr.controls.EmbeddedApp("emaStdCsrPStSearch");
			cpr.core.App.load("app/csr/impStdCsrPStSearch", function(app) {
				if(app){
					embeddedApp_2.app = app;
				}
			});
			container.addChild(embeddedApp_2, {
				"top": "675px",
				"left": "125px",
				"width": "100px",
				"height": "25px"
			});
			if(typeof onBodyLoad == "function"){
				app.addEventListener("load", onBodyLoad);
			}
			// Linking
			linker.userDefinedControl_1.ctrl = linker.grid_1;
		}
	});
	app.title = "수강신청조회";
	cpr.core.Platform.INSTANCE.register(app);
})();
