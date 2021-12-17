/*
 * App URI: app/ccr/extCcrSTlsnAplyCnfmSheet2
 * Source Location: app/ccr/extCcrSTlsnAplyCnfmSheet2.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("app/ccr/extCcrSTlsnAplyCnfmSheet2", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			﻿//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
			/// <xtmlink path="./extCcrSTlsnAplyCnfmSheet2.xtm"/>
			
			/**
			 * 과목별 수강신청 현황
			 * @class extCcrSTlsnAplyCnfmSheet
			 * @author 유형기 at 2016. 6. 28
			 */
			var extCcrSTlsnAplyCnfmSheet2 = function() {
				var moPage = new Page();
				
				// 임포트용 데이터 통신 오브젝트
				var moPObject = new Page();
				
				// 객체검색팝업 호출
				moPObject.moIdsForStdCmnPObjSch = [
				{
					controlId			:	"btnSaCdNm",
					iCd					:	"",
					iNm					:	"ipbSaCdNm",
					iObjDivRcd			:	["CC009SA"],
					iStartObject    	:   "",
					iOtDivRcd			:	"",
					iOtIsTreeView	:	"",
					iLanDivRcd		:	"",
					iKeyDate			:	"/root/keyDateMap/ST_DT",
					iKeyEndDate		:	"",
					oObjDivRcd		:	"/root/reqKey/strObjDivRcd",
					oCd					:	"/root/reqKey/strObjCd",
					oCdNm				:	"ipbSaCdNm",
					oBegDt				:	"",
					oEndDt				:	"",
					oLanDivRcd		:	"",
					func 					:  function(){
						/*
						var vsObjCd = util.DataMap.getValue(app, "dmReqKey", "strObjCd");
						if(!ValueUtil.isNull(vsObjCd)){
							// 학사부서 In조건용
							doSaInList();
						}
						*/
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
					iObjDivRcd 				: "CC009SA",
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
					oSaNm						: "",
					oSaCd 						: "/root/reqKey/strStudSaCd",
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
				
				
				// 학년도 ,학기, 출력순서를 원래데이터로 되돌리기위한 변수
				var msSchYearRcd = "";
				var msSmtRcd = "";
				
				/**
				 * @desc import 헤더 초기화
				 * @param 
				 * @return  void
				 * @author 유형기 at 2016. 6. 28
				 */
				moPage.onLoadImportDone_ImpTitle = function() {
					doHeaderOnLoad();
				};
				
				/**
				 * @desc onLoad 실행
				 * @param 
				 * @return void
				 * @author 유형기 at 2016. 6. 28
				 */
				moPage.onModelConstructDone_ExtCcrSTlsnAplyCnfmSheet = function() {
					
					// 검색조건 초기 설정
			//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
			//		ExtGroup.initSearchBox("grpSearch", ["grpData"]);
					
					// 권한에따른 교수명 컬럼 검색가능 여부
					doVisibleCtlByAuth();
					
					if (moPageInfo.authRngRcd == "CC00104") {
						util.Control.setValue(app, "radiobutton4", "STUD");
						util.DataMap.setValue(app, "dmReqKey", "strDiv", "STUD");
					}else {
						util.Control.setValue(app, "radiobutton4", "DEPT");
						util.DataMap.setValue(app, "dmReqKey", "strDiv", "DEPT");
					}
					
					// 서브미션 실행 (실패시 cover page)
					//strCommand: onLoad 
					util.Submit.send(app, "subOnLoad", function(pbSuccess){
						if(pbSuccess){
							
							// 조회조건 컨트롤 refresh(학년도, 학기)
							util.Control.redraw(app, ["cbbSchYearRcd", "cbbSmtRcd", "cbbClassRcd"]);
							util.SelectCtl.selectItem(app, "cbbClassRcd", 0);
							setStdCmnPObjSchObjInfo();
							
							page.onValueChanged_Radiobutton4();				
						}
					}, true);
				};
				
				/**
				 * 권한에 따른 조회조건 컨트롤 활성/비활성 처리
				 * @param 
				 * @type void
				 * @author 박갑수 at 2016. 6. 29
				 */	
				function doVisibleCtlByAuth() {
					
					// 개인권한[CC00104] : 
					if (moPageInfo.authRngRcd == "CC00104") {
						util.Control.setVisible(app, false, ["btnStudId"]);
						util.Control.setEnable(app, false, ["radiobutton4", "ipbStudId", "cbbSchYearRcd", "cbbSmtRcd"]);
						
						util.Control.setValue(app, "ipbStudId", moUserInfo.studNo);
						util.DataMap.setValue(app, "dmReqKey", "strStudId", moUserInfo.id);
					}
				};
				
				/**
				 * @desc [cbbSchYearRcd]학년도 onValueChanged 이벤트
				 * @param 
				 * @return void
				 * @author 유형기 at 2016. 6. 28
				 */
				moPage.onValueChanged_CbbSchYearRcd = function() {
					// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
					doChangeYearSmt("year");
					
					// 조회조건 초기화
					doClearSch();
				};
				
				/**
				 * @desc [cbbSmtRcd]학기 onValueChanged 이벤트
				 * @param 
				 * @return void
				 * @author 유형기 at 2016. 6. 28
				 */
				moPage.onValueChanged_CbbSmtRcd = function() {
					// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
					doChangeYearSmt("smt");
					
					// 조회조건 초기화
					doClearSch();
				};
				
				/**
				 * @desc 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
				 * @param 
				 * @return void
				 * @author 유형기 at 2016. 6. 28
				 */
				function doChangeYearSmt(psDiv) {
					//strCommand: date 
					util.Submit.send(app, "subDate", function(pbSuccess){
						if(pbSuccess){				
							msSchYearRcd = util.DataMap.getValue(app, "dmKeyDateMap", "YEAR");
							msSmtRcd = util.DataMap.getValue(app, "dmKeyDateMap", "SMT");
							
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
				 * @desc 조회조건(학사부서) 초기화
				 * @param 
				 * @return void
				 * @author 유형기 at 2016. 6. 28
				 */
				function doClearSch(){
					util.Control.setValue(app, "ipbSaCdNm", "");
					util.DataMap.setValue(app, "dmReqKey", "strObjCd", "");
					util.DataMap.setValue(app, "dmReqKey", "strObjDivRcd", "");
					util.DataMap.setValue(app, "dmReqKey", "strListSaCd", "");
					util.Control.setValue(app, "ipbGradeRcd","");
					util.Control.setValue(app, "cbbClassRcd","");
					util.Control.setValue(app, "ipbStudId","");
					
				};
				
				/**
				 * @desc [btnSaCdNm]소속(돋보기버튼) onClick 이벤트
				 * @param 
				 * @return void
				 * @author 유형기 at 2016. 6. 28
				 */
				moPage.onClick_BtnSaCdNm = function(sender) {
					// 객체검색팝업 호출
					doOnClickStdCmnPObjSch(sender);
				};
				
				/**
				 * @desc [ipbSaCdNm]소속 onValueChanged 이벤트
				 * @param 
				 * @return void
				 * @author 유형기 at 2016. 6. 28
				 */
				moPage.onValueChanged_IpbSaCdNm = function(sender) {
					// 값변경시 객체검색팝업 호출
					doOnChangeStdCmnPObjSch(sender);
				};
				
				/**
				 * @desc [btnSearch]조회 onClick 이벤트
				 * @param 
				 * @return void
				 * @author 유형기 at 2016. 6. 28
				 */
				moPage.onClick_BtnSearch = function() {
					
					
					var vsSchDiv = util.DataMap.getValue(app, "dmReqKey", "strDiv");
					if(vsSchDiv == 'STUD'){
						util.Control.setUserAttr(app, "ipbStudId" , "require" , "Y");
						util.Control.setUserAttr(app, "ipbSaCdNm" , "require" , "");
					}else{
						util.Control.setUserAttr(app, "ipbStudId" , "require" , "");
						util.Control.setUserAttr(app, "ipbSaCdNm" , "require" , "Y");
					}
					
					
					//필수값 체크
					if(!util.validate(app, ["grpSearch"])) return false;
					
					
					var vsSchDiv = util.DataMap.getValue(app, "dmReqKey", "strDiv");
					var vsStudNo 	= "";
					var vsGradeRcd = "";	//--학년
					var vsClassRcd 	= "";	//--반
					if(vsSchDiv == "DEPT"){
					
						util.DataMap.setValue(app, "dmReqKey", "strReqObjCd", util.DataMap.getValue(app, "dmReqKey", "strObjCd"));
						util.DataMap.setValue(app, "dmReqKey", "strReqObjDivRcd", util.DataMap.getValue(app, "dmReqKey", "strObjDivRcd"));			
						vsStudNo= "";
						vsGradeRcd	= util.Control.getValue(app, "ipbGradeRcd");
						vsClassRcd	= util.Control.getValue(app, "cbbClassRcd");
					}else{
						
						util.DataMap.setValue(app, "dmReqKey", "strReqObjCd", util.DataMap.getValue(app, "dmReqKey", "strStudSaCd"));
						util.DataMap.setValue(app, "dmReqKey", "strReqObjDivRcd", "CC009SA");			
						vsStudNo = util.DataMap.getValue(app, "dmReqKey", "strStudId");
						vsGradeRcd = "";
						vsClassRcd ="";
					}
							
					//strCommand: list 
					util.Submit.send(app, "subList", function(pbSuccess){
						if(pbSuccess){
							var vsSchYearRcd = util.Control.getValue(app, "cbbSchYearRcd");
							var vsSmtRcd = util.Control.getValue(app, "cbbSmtRcd");
							
							// 개인권한일경우 학사부서 In조건 세팅
							if(moPageInfo.authRngRcd == "CC00104"){
								util.DataMap.setValue(app, "dmReqKey", "strListSaCd", "('" + moUserInfo.asgnDeptCd + "')");
							}
							
							var voParam = {
									p_strLanDivRcd 		: util.DataMap.getValue(app, "dmResOnLoad", "strLanDivRcd"),				// 언어키
									p_strKeyDate 		: util.DataMap.getValue(app, "dmKeyDateMap", "END_DT"),					// 기준일자
									p_strSchYearRcd 	: vsSchYearRcd,																		// 학년도코드
									p_strSmtRcd 			: vsSmtRcd,																				// 학기코드
									p_strListSaCd		: util.DataMap.getValue(app, "dmReqKey", "strListSaCd"),						// 학사부서코드 In조건용
									p_strCheckAuthId 	: moUserInfo.id,																			// 사용자ID
									p_strGradeRcd		: vsGradeRcd, 									// 학년
									p_strClassRcd		: vsClassRcd, 					// 반
									p_strStudNo			: vsStudNo				        // 학번
							};
			
							var vsTitle = "수강신청확인";
							
							var voOzFormParam = {
								  TITLE 		 : vsTitle			// 리포트타이틀
								, SUB_TITLE 	 : "" 					// 리포트서브타이틀		
								, FORM_TYPE : "flash"
							};
							
							util.Report.open(app, "hojReport", "extCcrSTlsnAplyCnfmSheet2", voOzFormParam, voParam);
						}
					});
					
					
				}
				
				/**
				 * @desc 객체 하위 학사부서 In조건용 String 조회
				 * @param 
				 * @return void
				 * @author 유형기 at 2016. 6. 28
				 */
				function doSaInList(){
					//strCommand: list 
					util.Submit.send(app, "subList", function(pbSuccess){
						if(pbSuccess){
							
						}
					});
				};
				
				
				moPage.onClick_BtnStudId = function(sender) {
					// 학생검색팝업 호출
					doOnClickStdCsrPStSearch(sender);
				}
				
				moPage.onValueChanged_IpbStudId = function(sender) {
					// 값변경시 학생검색팝업 호출
					doOnChangeStdCsrPStSearch(sender);
				}
				
				
				/*
					소속 / 학생에 따라 컨트롤을 보이기 안보이기 한다.
				*/
				moPage.onValueChanged_Radiobutton4 = function() {
					
					var vsSchDiv = util.DataMap.getValue(app, "dmReqKey", "strDiv");
					
					var vaDept = ["lblSaCdNm", "ipbSaCdNm", "btnSaCdNm", "lblGradeRcd", "ipbGradeRcd", "lblClassRcd", "cbbClassRcd"];
					var vaStud	= ["lblStId", "ipbStudId", "btnStudId"];
					
					
					if(vsSchDiv == "STUD"){
						util.Control.setVisible(app, true, vaStud);
						util.Control.setVisible(app, false, vaDept);
						
						
					}else{
						util.Control.setVisible(app, false, vaStud);
						util.Control.setVisible(app, true, vaDept);
					}
					
					
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
			
			var dataSet_2 = new cpr.data.DataSet("dsSchClassRcdList");
			dataSet_2.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_2);
			
			var dataSet_3 = new cpr.data.DataSet("dsSmtRcdList");
			dataSet_3.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_3);
			var dataMap_1 = new cpr.data.DataMap("dmResOnLoad");
			dataMap_1.parseData({
				"columns" : [{
					"name": "strLanDivRcd",
					"dataType": "string"
				}]
			});
			app.register(dataMap_1);
			
			var dataMap_2 = new cpr.data.DataMap("dmReqKey");
			dataMap_2.parseData({
				"columns" : [
					{
						"name": "strObjNm",
						"dataType": "string"
					},
					{
						"name": "strObjCd",
						"dataType": "string"
					},
					{
						"name": "strObjDivRcd",
						"dataType": "string"
					},
					{
						"name": "strListSaCd",
						"dataType": "string"
					},
					{
						"name": "strStudId",
						"dataType": "string"
					},
					{
						"name": "strStudNo",
						"dataType": "string"
					},
					{
						"name": "strGrade",
						"dataType": "string"
					},
					{
						"name": "strClassRcd",
						"dataType": "string"
					},
					{
						"name": "strDiv",
						"dataType": "string"
					},
					{
						"name": "strStudSaCd",
						"dataType": "string"
					},
					{
						"name": "strStudObjDivRcd",
						"dataType": "string"
					},
					{
						"name": "strReqObjCd",
						"dataType": "string"
					},
					{
						"name": "strReqObjDivRcd",
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
						"name": "END_DT",
						"dataType": "string"
					},
					{
						"name": "ST_DT",
						"dataType": "string"
					}
				]
			});
			app.register(dataMap_3);
			var submission_1 = new cpr.protocols.Submission("subOnLoad");
			submission_1.action = "/ccr/ExtCcrTlsnAplyCnfmSheet/";
			submission_1.mediaType = "application/x-www-form-urlencoded";
			submission_1.addResponseData(dataSet_3, false);
			submission_1.addResponseData(dataSet_1, false);
			submission_1.addResponseData(dataMap_3, false);
			submission_1.addResponseData(dataMap_1, false);
			submission_1.addResponseData(dataSet_2, false);
			app.register(submission_1);
			
			var submission_2 = new cpr.protocols.Submission("subList");
			submission_2.action = "/ccr/ExtCcrTlsnAplyCnfmSheet/";
			submission_2.mediaType = "application/x-www-form-urlencoded";
			submission_2.addRequestData(dataMap_2);
			submission_2.addRequestData(dataMap_3);
			submission_2.addResponseData(dataMap_2, false);
			app.register(submission_2);
			
			var submission_3 = new cpr.protocols.Submission("subDate");
			submission_3.action = "/cmn/StdCmnDateTime/";
			submission_3.mediaType = "application/x-www-form-urlencoded";
			submission_3.addRequestData(dataMap_3);
			submission_3.addResponseData(dataMap_3, false);
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
				"left": "5px",
				"width": "100px",
				"height": "25px"
			});
			
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
				var userDefinedControl_2 = new udc.com.comFormTitle();
				userDefinedControl_2.bind("title").toLanguage("UI-SCR-NCSLUMPLIST");
				container.addChild(userDefinedControl_2, {
					"top": "5px",
					"left": "5px",
					"width": "290px",
					"height": "25px"
				});
				var hTMLObject_1 = new cpr.controls.HTMLObject("hojReport");
				container.addChild(hTMLObject_1, {
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
			
			var group_2 = new cpr.controls.Container("grpSearch");
			group_2.style.setClasses(["search-box"]);
			// Layout
			var xYLayout_3 = new cpr.controls.layouts.XYLayout();
			group_2.setLayout(xYLayout_3);
			(function(container){
				var button_1 = new cpr.controls.Button("btnSearch");
				button_1.value = "조회";
				button_1.style.setClasses(["btn-search"]);
				if(typeof onBtnSearchClick == "function") {
					button_1.addEventListener("click", onBtnSearchClick);
				}
				container.addChild(button_1, {
					"top": "5px",
					"left": "1158px",
					"width": "60px",
					"height": "25px"
				});
				var output_1 = new cpr.controls.Output("optSchYearRcd");
				output_1.value = "";
				output_1.style.setClasses(["require"]);
				output_1.bind("value").toLanguage("UI-GLS-SCH_YEAR");
				container.addChild(output_1, {
					"top": "5px",
					"left": "5px",
					"width": "80px",
					"height": "25px"
				});
				var comboBox_1 = new cpr.controls.ComboBox("cbbSchYearRcd");
				comboBox_1.userAttr({"require": "Y"});
				comboBox_1.bind("fieldLabel").toExpression("#optSchYearRcd.value");
				comboBox_1.bind("value").toDataMap(app.lookup("dmKeyDateMap"), "YEAR");
				(function(comboBox_1){
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
					"left": "90px",
					"width": "100px",
					"height": "25px"
				});
				var output_2 = new cpr.controls.Output("optSmtRcd");
				output_2.value = "";
				output_2.style.setClasses(["require"]);
				output_2.bind("value").toLanguage("UI-GLS-SMT");
				container.addChild(output_2, {
					"top": "5px",
					"left": "200px",
					"width": "80px",
					"height": "25px"
				});
				var comboBox_2 = new cpr.controls.ComboBox("cbbSmtRcd");
				comboBox_2.userAttr({"require": "Y"});
				comboBox_2.bind("fieldLabel").toExpression("#optSmtRcd.value");
				comboBox_2.bind("value").toDataMap(app.lookup("dmKeyDateMap"), "SMT");
				(function(comboBox_2){
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
					"left": "285px",
					"width": "100px",
					"height": "25px"
				});
				var inputBox_1 = new cpr.controls.InputBox("ipbSaCdNm");
				inputBox_1.maxLength = 100;
				inputBox_1.bind("fieldLabel").toExpression("#optSaCdNm.value");
				inputBox_1.bind("value").toDataMap(app.lookup("dmReqKey"), "strObjNm");
				if(typeof onIpbSaCdNmValueChange == "function") {
					inputBox_1.addEventListener("value-change", onIpbSaCdNmValueChange);
				}
				container.addChild(inputBox_1, {
					"top": "5px",
					"left": "659px",
					"width": "110px",
					"height": "25px"
				});
				var output_3 = new cpr.controls.Output("optSaCdNm");
				output_3.value = "";
				output_3.style.setClasses(["require"]);
				output_3.bind("value").toLanguage("UI-GLS-ASGN");
				container.addChild(output_3, {
					"top": "5px",
					"left": "575px",
					"width": "80px",
					"height": "25px"
				});
				var button_2 = new cpr.controls.Button("btnSaCdNm");
				button_2.value = "";
				button_2.style.setClasses(["btn-pop-search"]);
				if(typeof onBtnSaCdNmClick == "function") {
					button_2.addEventListener("click", onBtnSaCdNmClick);
				}
				container.addChild(button_2, {
					"top": "5px",
					"left": "770px",
					"width": "20px",
					"height": "25px"
				});
				var output_4 = new cpr.controls.Output("optStId");
				output_4.value = "";
				output_4.style.setClasses(["require"]);
				output_4.bind("value").toLanguage("UI-DB-STUD_ID");
				container.addChild(output_4, {
					"top": "5px",
					"left": "575px",
					"width": "80px",
					"height": "25px"
				});
				var inputBox_2 = new cpr.controls.InputBox("ipbStudId");
				inputBox_2.visible = false;
				inputBox_2.maxLength = 100;
				inputBox_2.bind("fieldLabel").toExpression("#optStId.value");
				inputBox_2.bind("value").toDataMap(app.lookup("dmReqKey"), "strStudNo");
				if(typeof onIpbStudIdValueChange == "function") {
					inputBox_2.addEventListener("value-change", onIpbStudIdValueChange);
				}
				container.addChild(inputBox_2, {
					"top": "5px",
					"left": "660px",
					"width": "110px",
					"height": "25px"
				});
				var button_3 = new cpr.controls.Button("btnStudId");
				button_3.visible = false;
				button_3.value = "";
				button_3.style.setClasses(["btn-pop-search"]);
				if(typeof onBtnStudIdClick == "function") {
					button_3.addEventListener("click", onBtnStudIdClick);
				}
				container.addChild(button_3, {
					"top": "5px",
					"left": "770px",
					"width": "20px",
					"height": "25px"
				});
				var comboBox_3 = new cpr.controls.ComboBox("cbbClassRcd");
				comboBox_3.bind("fieldLabel").toExpression("#optClassRcd.value");
				comboBox_3.bind("value").toDataMap(app.lookup("dmReqKey"), "strClassRcd");
				(function(comboBox_3){
					comboBox_3.addItem(new cpr.controls.Item("전체", ""));
					comboBox_3.setItemSet(app.lookup("dsSchClassRcdList"), {
						"label": "CD_NM",
						"value": "CD"
					});
				})(comboBox_3);
				container.addChild(comboBox_3, {
					"top": "5px",
					"left": "1025px",
					"width": "60px",
					"height": "25px"
				});
				var output_5 = new cpr.controls.Output("optClassRcd");
				output_5.value = "반";
				container.addChild(output_5, {
					"top": "5px",
					"left": "950px",
					"width": "70px",
					"height": "25px"
				});
				var output_6 = new cpr.controls.Output("optGradeRcd");
				output_6.value = "학년";
				container.addChild(output_6, {
					"top": "5px",
					"left": "800px",
					"width": "70px",
					"height": "25px"
				});
				var numberEditor_1 = new cpr.controls.NumberEditor("ipbGradeRcd");
				numberEditor_1.format = "9";
				numberEditor_1.bind("value").toDataMap(app.lookup("dmReqKey"), "strGrade");
				container.addChild(numberEditor_1, {
					"top": "5px",
					"left": "875px",
					"width": "66px",
					"height": "25px"
				});
				var radioButton_1 = new cpr.controls.RadioButton("radiobutton4");
				radioButton_1.bind("value").toDataMap(app.lookup("dmReqKey"), "strDiv");
				(function(radioButton_1){
					radioButton_1.addItem(new cpr.controls.Item("학사부서명", "DEPT"));
					radioButton_1.addItem(new cpr.controls.Item("학생", "STUD"));
				})(radioButton_1);
				if(typeof onRadiobutton4ValueChange == "function") {
					radioButton_1.addEventListener("value-change", onRadiobutton4ValueChange);
				}
				container.addChild(radioButton_1, {
					"top": "5px",
					"left": "395px",
					"width": "170px",
					"height": "25px"
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
				"left": "135px",
				"width": "100px",
				"height": "25px"
			});
			if(typeof onBodyLoad == "function"){
				app.addEventListener("load", onBodyLoad);
			}
		}
	});
	app.title = "수강신청확인및변경원";
	cpr.core.Platform.INSTANCE.register(app);
})();
