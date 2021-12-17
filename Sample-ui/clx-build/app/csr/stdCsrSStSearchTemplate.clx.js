/*
 * App URI: app/csr/stdCsrSStSearchTemplate
 * Source Location: app/csr/stdCsrSStSearchTemplate.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("app/csr/stdCsrSStSearchTemplate", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			﻿//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
			/// <xtmlink path="./stdCsrSStSearchTemplate.xtm"/>
			
			
			var stdCsrSStSearchTemplate = function() {
				var moPage = new Page();
				//임포트용 데이터 통신 오브젝트
				var moPObject = new PObject();
			
				/**
				 * 학생검색팝업 관련 설정사항
				 * 설정가능 유형 : 
				 *   1. 인스턴스((/root/시작))
				 *   2. 그리드의 셀 (ghc시작)
				 *   3. 컨트롤 id
				 * 각 변수별 설명
				 *  iXXX : 팝업으로 input 전달될 파라미터
				 *  oXXX : 팝업에서 선택한 값을 받을 컬럼 아이디
				 *  1. controlId 			: 최초 이벤트의 버튼이나 그리드 id	(필수)
				 *  2. iStudNo 			: 검색조건 학번								(선택) (값이 존재할 경우 4자리 이상)
				 *  3. iStudId 				: 검색조건 학번오브젝트					(선택)
				 *  4. iStudNm 			: 이름        									(선택) (값이 존재할 경우 2자리 이상)
				 *  5. iKeyDate 			: 기준일 										(필수)
				 *  6. iObjDivRcd 		: 객체구분코드 								(선택)
				 *  7. iObjCd 				: 부서코드										(선택)
				 *  8. iObjNm 			: 부서명											(선택) 
				 *  10. iStatRcd			: 학적상태										(선택) 
				 *  11. iStudDivRcd		: 학생구분										(선택) 
				 *  12. oStudId			: 학번오브젝트
				 *  13. oStudNo 			: 학번
				 *  14. oStudNm 		: 이름
				 *  15. oStatNm 			: 학적상태명
				 *  16. oStatRcd 			: 학적상태코드
				 *  17. oProcRslt 		: 진급학기
				 *  18. oProcRsltYear 	: 진급학년
				 *  19. oSaCd 			: 학사부서코드명
				 *  20. oSaNm 			: 학사부서명
				 *  21. oSpCd 			: 이수과정코드명
				 *  22. oSpNm 			: 이수과정명
				 *  23. oOgCd 			: 행정부서코드명
				 *  24. oOgNm 			: 행정부서명
				 *  25. oStudDivRcd		: 학생구분코드
				 *  26. oStudDivNm		: 학생구분명
				 *  27. oBirthday			: 생년월일
				 *  28. oGenderRcd		: 성별코드
				 *  29. oGenderNm		: 성별명
				 *  30. func 				: 팝업에서 선택한 값을 받은 후 추가 로직이 필요한 경우 함수 작성
				 */
				moPObject.moIdsForStdCsrPStSearch = [
				{
					controlId 					: "btnPopSearch",
					iStudNo 					: "ipbStudNo",	
					iStudId 						: "ipbStudId",
					iStudNm 					: "ipbStudNm",
					iKeyDate 					: "dipKeyDate", 
					iObjDivRcd 				: "cbbObjDivRcd",
					iObjCd 						: "ipbSaCd",
					iObjNm 					: "ipbSaNm",
					iStatRcd 					: "cbbStatus",
					iStudDivRcd				: "cbbStudDivRcd",
					oStudId 					: "optStudId",
					oStudNo 					: "optStudNo",
					oStudNm 					: "optStudNm",
					oStatNm 					: "optStatNm",
					oStatRcd 					: "optStatRcd",
					oProcRslt 					: "optProcRslt",
					oProcRsltYear 			: "optProcRsltYear",
					oSaNm						: "optSaNm",
					oSaCd 						: "optSaCd",
					oSpNm 					: "optSpNm",
					oSpCd 						: "optSpCd",
					oOgNm 					: "optOgNm",
					oOgCd 						: "optOgCd",
					oStudDivRcd				: "optStudDivRcd",
					oStudDivNm				: "optStudDivNm",
					oBirthday					: "optBirthday",
					oGenderRcd				: "optGenderRcd",
					oGenderNm				: "optGenderNm",
					func : function() {
					}
				}
				];
				
				/**
				 * @desc 화면 초기화 이벤트 실행
				 * @param
				 * @return void
				 * @author Choi In Seong 2016. 2. 29.
				 */	
				moPage.onModelConstructDone_StdCsrMstFrame = function() {
					doOnLoad();
				};
				
				/**
				 * @desc 화면을 모든 값을 초기화 한다.
				 * @param
				 * @return void
				 * @author Choi In Seong 2016. 2. 29
				 */
				moPage.onLoadImportDone_ImpTitle = function() {
					
					doHeaderOnLoad();
					
				};
				
				function doOnLoad() {
					// 서브미션 호출
					//strCommand: onLoad 
					util.Submit.send(app, "subOnLoad", function(pbSuccess){
						if (pbSuccess) {				
							util.Control.redraw(app, ["cbbStatus", "cbbStudDivRcd", "cbbObjDivRcd"]);
						}
					});
				}
				
				/**
				 * @desc 학생검색 팝업을 호출한다.
				 * @param sender 버튼의 이벤트 객체
				 * @return void
				 * @author Choi In Seong 2016. 2. 29
				 */
				moPage.onClick_BtnPopSearch = function(sender) {
					
					doOnClickStdCsrPStSearch(sender);
					
				}
				
				/**
				 * @desc 학생 검색
				 * @param sender 인풋박스 이벤트 객체
				 * @return void
				 * @author Choi In Seong 2016. 2. 29
				 */
				moPage.onKeyDown_IpbSchStudId = function(strKeyType, strKeyStatus, sender) {
					if(e.keyCode == cpr.events.KeyCode.ENTER){
						doOnChangeStdCsrPStSearch(sender);
					}
				}
				
				/**
				 * @desc 학생 검색
				 * @param sender 인풋박스 이벤트 객체
				 * @return void
				 * @author Choi In Seong 2016. 2. 29
				 */
				moPage.onKeyDown_IpbStudNm = function(strKeyType, strKeyStatus, sender) {
					if(e.keyCode == cpr.events.KeyCode.ENTER){
						doOnChangeStdCsrPStSearch(sender);
					}
				};
			
				return moPage;
			};;
			// End - User Script
			
			// Header
			var dataSet_1 = new cpr.data.DataSet("dsStatusList");
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
			
			var dataSet_3 = new cpr.data.DataSet("dsObjDivRcdList");
			dataSet_3.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_3);
			var dataMap_1 = new cpr.data.DataMap("dmReqKey");
			dataMap_1.parseData({
				"columns" : [
					{
						"name": "strSaCd",
						"dataType": "string"
					},
					{
						"name": "strSaNm",
						"dataType": "string"
					},
					{
						"name": "strAuthYn",
						"dataType": "string"
					},
					{
						"name": "strStatRcd",
						"dataType": "string"
					},
					{
						"name": "strStudNo",
						"dataType": "string"
					},
					{
						"name": "strStudId",
						"dataType": "string"
					},
					{
						"name": "currentDate",
						"dataType": "string"
					},
					{
						"name": "strStudNm",
						"dataType": "string"
					},
					{
						"name": "strObjDivRcd",
						"dataType": "string"
					},
					{
						"name": "strStudDivRcd",
						"dataType": "string"
					}
				]
			});
			app.register(dataMap_1);
			
			var dataMap_2 = new cpr.data.DataMap("dmResList");
			dataMap_2.parseData({
				"columns" : [
					{
						"name": "strOptStudNo",
						"dataType": "string"
					},
					{
						"name": "strOptStudId",
						"dataType": "string"
					},
					{
						"name": "strOptStudNm",
						"dataType": "string"
					},
					{
						"name": "strOptStatCd",
						"dataType": "string"
					},
					{
						"name": "strOptStatNm",
						"dataType": "string"
					},
					{
						"name": "strOptProcRslt",
						"dataType": "string"
					},
					{
						"name": "strOptProcRsltYear",
						"dataType": "string"
					},
					{
						"name": "strOptSaCd",
						"dataType": "string"
					},
					{
						"name": "strOptSaNm",
						"dataType": "string"
					},
					{
						"name": "strOptSpCd",
						"dataType": "string"
					},
					{
						"name": "strOptSpNm",
						"dataType": "string"
					},
					{
						"name": "strOptOgCd",
						"dataType": "string"
					},
					{
						"name": "strOptOgNm",
						"dataType": "string"
					},
					{
						"name": "strOptStudDivRcd",
						"dataType": "string"
					},
					{
						"name": "strOptStudDivNm",
						"dataType": "string"
					},
					{
						"name": "strOptBirthday",
						"dataType": "string"
					},
					{
						"name": "strOptGenderRcd",
						"dataType": "string"
					},
					{
						"name": "strOptGenderNm",
						"dataType": "string"
					},
					{
						"name": "newElement",
						"dataType": "string"
					}
				]
			});
			app.register(dataMap_2);
			var submission_1 = new cpr.protocols.Submission("subOnLoad");
			submission_1.action = "/csr/StdCsrStSearch/";
			submission_1.mediaType = "application/x-www-form-urlencoded";
			submission_1.addResponseData(dataSet_1, false);
			submission_1.addResponseData(dataSet_2, false);
			submission_1.addResponseData(dataSet_3, false);
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
			var group_1 = new cpr.controls.Container("grpSearch");
			group_1.style.setClasses(["search-box"]);
			// Layout
			var xYLayout_2 = new cpr.controls.layouts.XYLayout();
			group_1.setLayout(xYLayout_2);
			(function(container){
			})(group_1);
			container.addChild(group_1, {
				"top": "35px",
				"left": "5px",
				"width": "1225px",
				"height": "32px"
			});
			
			var userDefinedControl_1 = new udc.com.appHeader("appheader1");
			container.addChild(userDefinedControl_1, {
				"top": "5px",
				"right": "5px",
				"left": "5px",
				"height": "25px"
			});
			
			var group_2 = new cpr.controls.Container("grpData");
			// Layout
			var xYLayout_3 = new cpr.controls.layouts.XYLayout();
			group_2.setLayout(xYLayout_3);
			(function(container){
				var output_1 = new cpr.controls.Output("optSchStNo");
				output_1.value = "";
				output_1.bind("value").toLanguage("UI-GLS-STUD_ID");
				container.addChild(output_1, {
					"top": "5px",
					"left": "5px",
					"width": "115px",
					"height": "25px"
				});
				var inputBox_1 = new cpr.controls.InputBox("ipbStudNo");
				inputBox_1.bind("value").toDataMap(app.lookup("dmReqKey"), "strStudNo");
				if(typeof onIpbStudNoKeydown == "function") {
					inputBox_1.addEventListener("keydown", onIpbStudNoKeydown);
				}
				container.addChild(inputBox_1, {
					"top": "6px",
					"left": "125px",
					"width": "151px",
					"height": "25px"
				});
				var button_1 = new cpr.controls.Button("btnPopSearch");
				button_1.value = "";
				button_1.style.setClasses(["btn-pop-search"]);
				if(typeof onBtnPopSearchClick == "function") {
					button_1.addEventListener("click", onBtnPopSearchClick);
				}
				container.addChild(button_1, {
					"top": "5px",
					"left": "281px",
					"width": "20px",
					"height": "25px"
				});
				var output_2 = new cpr.controls.Output("optKeyDate");
				output_2.value = "";
				output_2.bind("value").toLanguage("UI-SCR-STDDT");
				container.addChild(output_2, {
					"top": "105px",
					"left": "5px",
					"width": "115px",
					"height": "25px"
				});
				var dateInput_1 = new cpr.controls.DateInput("dipKeyDate");
				dateInput_1.bind("value").toDataMap(app.lookup("dmReqKey"), "currentDate");
				container.addChild(dateInput_1, {
					"top": "106px",
					"left": "125px",
					"width": "150px",
					"height": "25px"
				});
				var output_3 = new cpr.controls.Output("optSchStId");
				output_3.value = "";
				output_3.bind("value").toLanguage("UI-DB-OBJNO");
				container.addChild(output_3, {
					"top": "80px",
					"left": "5px",
					"width": "115px",
					"height": "25px"
				});
				var inputBox_2 = new cpr.controls.InputBox("ipbStudId");
				inputBox_2.bind("value").toDataMap(app.lookup("dmReqKey"), "strStudId");
				container.addChild(inputBox_2, {
					"top": "81px",
					"left": "125px",
					"width": "151px",
					"height": "25px"
				});
				var output_4 = new cpr.controls.Output("optSchStNm");
				output_4.value = "";
				output_4.bind("value").toLanguage("UI-SCR-NAME");
				container.addChild(output_4, {
					"top": "30px",
					"left": "5px",
					"width": "115px",
					"height": "25px"
				});
				var inputBox_3 = new cpr.controls.InputBox("ipbStudNm");
				inputBox_3.bind("value").toDataMap(app.lookup("dmReqKey"), "strStudNm");
				if(typeof onIpbStudNmKeydown == "function") {
					inputBox_3.addEventListener("keydown", onIpbStudNmKeydown);
				}
				container.addChild(inputBox_3, {
					"top": "30px",
					"left": "125px",
					"width": "151px",
					"height": "25px"
				});
				var output_5 = new cpr.controls.Output("optSaCd");
				output_5.value = "";
				output_5.bind("value").toLanguage("UI-DB-SA_CD");
				container.addChild(output_5, {
					"top": "130px",
					"left": "5px",
					"width": "115px",
					"height": "25px"
				});
				var inputBox_4 = new cpr.controls.InputBox("ipbSaCd");
				inputBox_4.bind("value").toDataMap(app.lookup("dmReqKey"), "strSaCd");
				container.addChild(inputBox_4, {
					"top": "131px",
					"left": "125px",
					"width": "150px",
					"height": "25px"
				});
				var output_6 = new cpr.controls.Output("optSaNm");
				output_6.value = "";
				output_6.bind("value").toLanguage("UI-DB-SA_CD_NM");
				container.addChild(output_6, {
					"top": "155px",
					"left": "5px",
					"width": "115px",
					"height": "25px"
				});
				var inputBox_5 = new cpr.controls.InputBox("ipbSaNm");
				inputBox_5.bind("value").toDataMap(app.lookup("dmReqKey"), "strSaNm");
				container.addChild(inputBox_5, {
					"top": "155px",
					"left": "125px",
					"width": "150px",
					"height": "25px"
				});
				var output_7 = new cpr.controls.Output("optStatus");
				output_7.value = "";
				output_7.bind("value").toLanguage("UI-SCR-SCHREGST");
				container.addChild(output_7, {
					"top": "230px",
					"left": "5px",
					"width": "115px",
					"height": "25px"
				});
				var comboBox_1 = new cpr.controls.ComboBox("cbbStatus");
				comboBox_1.bind("value").toDataMap(app.lookup("dmReqKey"), "strStatRcd");
				(function(comboBox_1){
					comboBox_1.setItemSet(app.lookup("dsStatusList"), {
						"label": "CD_NM",
						"value": "CD"
					});
				})(comboBox_1);
				container.addChild(comboBox_1, {
					"top": "230px",
					"left": "125px",
					"width": "150px",
					"height": "25px"
				});
				var output_8 = new cpr.controls.Output("optStudDivRcd");
				output_8.value = "";
				output_8.bind("value").toLanguage("UI-SCR-STDDIS");
				container.addChild(output_8, {
					"top": "255px",
					"left": "5px",
					"width": "115px",
					"height": "25px"
				});
				var comboBox_2 = new cpr.controls.ComboBox("cbbStudDivRcd");
				comboBox_2.bind("fieldLabel").toExpression("#optStudDivRcd.value");
				comboBox_2.bind("value").toDataMap(app.lookup("dmReqKey"), "strStudDivRcd");
				(function(comboBox_2){
					comboBox_2.setItemSet(app.lookup("dsStudDivRcdList"), {
						"label": "CD_NM",
						"value": "CD"
					});
				})(comboBox_2);
				container.addChild(comboBox_2, {
					"top": "255px",
					"left": "125px",
					"width": "150px",
					"height": "25px"
				});
				var output_9 = new cpr.controls.Output("optStudNo");
				output_9.value = "";
				output_9.bind("value").toDataMap(app.lookup("dmResList"), "strOptStudNo");
				container.addChild(output_9, {
					"top": "5px",
					"left": "500px",
					"width": "360px",
					"height": "25px"
				});
				var output_10 = new cpr.controls.Output("optOptStNo");
				output_10.value = "";
				output_10.bind("value").toLanguage("UI-GLS-STUD_ID");
				container.addChild(output_10, {
					"top": "5px",
					"left": "390px",
					"width": "105px",
					"height": "25px"
				});
				var output_11 = new cpr.controls.Output("optOptStId");
				output_11.value = "";
				output_11.bind("value").toLanguage("UI-DB-OBJNO");
				container.addChild(output_11, {
					"top": "30px",
					"left": "390px",
					"width": "105px",
					"height": "25px"
				});
				var output_12 = new cpr.controls.Output("optStudId");
				output_12.value = "";
				output_12.bind("value").toDataMap(app.lookup("dmResList"), "strOptStudId");
				container.addChild(output_12, {
					"top": "30px",
					"left": "500px",
					"width": "360px",
					"height": "25px"
				});
				var output_13 = new cpr.controls.Output("optOptStNm");
				output_13.value = "";
				output_13.bind("value").toLanguage("UI-SCR-NAME");
				container.addChild(output_13, {
					"top": "55px",
					"left": "390px",
					"width": "105px",
					"height": "25px"
				});
				var output_14 = new cpr.controls.Output("optStudNm");
				output_14.value = "";
				output_14.bind("value").toDataMap(app.lookup("dmResList"), "strOptStudNm");
				container.addChild(output_14, {
					"top": "55px",
					"left": "500px",
					"width": "360px",
					"height": "25px"
				});
				var output_15 = new cpr.controls.Output("optOptStatNm");
				output_15.value = "";
				output_15.bind("value").toLanguage("UI-SCR-SCHREGST");
				container.addChild(output_15, {
					"top": "80px",
					"left": "390px",
					"width": "105px",
					"height": "25px"
				});
				var output_16 = new cpr.controls.Output("optStatNm");
				output_16.value = "";
				output_16.bind("value").toDataMap(app.lookup("dmResList"), "strOptStatNm");
				container.addChild(output_16, {
					"top": "80px",
					"left": "500px",
					"width": "360px",
					"height": "25px"
				});
				var output_17 = new cpr.controls.Output("optOptStatRcd");
				output_17.value = "";
				output_17.bind("value").toLanguage("UI-SCR-SCREGSTATCD");
				container.addChild(output_17, {
					"top": "105px",
					"left": "390px",
					"width": "105px",
					"height": "25px"
				});
				var output_18 = new cpr.controls.Output("optStatRcd");
				output_18.value = "";
				output_18.bind("value").toDataMap(app.lookup("dmResList"), "strOptStatCd");
				container.addChild(output_18, {
					"top": "105px",
					"left": "500px",
					"width": "360px",
					"height": "25px"
				});
				var output_19 = new cpr.controls.Output("optOptProcRslt");
				output_19.value = "";
				output_19.bind("value").toLanguage("UI-DB-PROM_SMT_RCD");
				container.addChild(output_19, {
					"top": "130px",
					"left": "390px",
					"width": "105px",
					"height": "25px"
				});
				var output_20 = new cpr.controls.Output("optProcRslt");
				output_20.value = "";
				output_20.bind("value").toDataMap(app.lookup("dmResList"), "strOptProcRslt");
				container.addChild(output_20, {
					"top": "130px",
					"left": "500px",
					"width": "360px",
					"height": "25px"
				});
				var output_21 = new cpr.controls.Output("optOptProcRsltYear");
				output_21.value = "진급학년";
				container.addChild(output_21, {
					"top": "155px",
					"left": "390px",
					"width": "105px",
					"height": "25px"
				});
				var output_22 = new cpr.controls.Output("optProcRsltYear");
				output_22.value = "";
				output_22.bind("value").toDataMap(app.lookup("dmResList"), "strOptProcRsltYear");
				container.addChild(output_22, {
					"top": "155px",
					"left": "500px",
					"width": "360px",
					"height": "25px"
				});
				var output_23 = new cpr.controls.Output("optOptSaCd");
				output_23.value = "";
				output_23.bind("value").toLanguage("UI-DB-SA_CD");
				container.addChild(output_23, {
					"top": "180px",
					"left": "390px",
					"width": "105px",
					"height": "25px"
				});
				var output_24 = new cpr.controls.Output("optSaCd");
				output_24.value = "";
				output_24.bind("value").toDataMap(app.lookup("dmResList"), "strOptSaCd");
				container.addChild(output_24, {
					"top": "180px",
					"left": "500px",
					"width": "360px",
					"height": "25px"
				});
				var output_25 = new cpr.controls.Output("optOptSpNm");
				output_25.value = "";
				output_25.bind("value").toLanguage("UI-GLS-SP");
				container.addChild(output_25, {
					"top": "255px",
					"left": "390px",
					"width": "105px",
					"height": "25px"
				});
				var output_26 = new cpr.controls.Output("optSpNm");
				output_26.value = "";
				output_26.bind("value").toDataMap(app.lookup("dmResList"), "strOptSpNm");
				container.addChild(output_26, {
					"top": "255px",
					"left": "500px",
					"width": "360px",
					"height": "25px"
				});
				var output_27 = new cpr.controls.Output("optOptSpCd");
				output_27.value = "";
				output_27.bind("value").toLanguage("UI-DB-SP_CD");
				container.addChild(output_27, {
					"top": "230px",
					"left": "390px",
					"width": "105px",
					"height": "25px"
				});
				var output_28 = new cpr.controls.Output("optSpCd");
				output_28.value = "";
				output_28.bind("value").toDataMap(app.lookup("dmResList"), "strOptSpCd");
				container.addChild(output_28, {
					"top": "230px",
					"left": "500px",
					"width": "360px",
					"height": "25px"
				});
				var output_29 = new cpr.controls.Output("optOptSaNm");
				output_29.value = "";
				output_29.bind("value").toLanguage("UI-GLS-SA");
				container.addChild(output_29, {
					"top": "205px",
					"left": "390px",
					"width": "105px",
					"height": "25px"
				});
				var output_30 = new cpr.controls.Output("optSaNm");
				output_30.value = "";
				output_30.bind("value").toDataMap(app.lookup("dmResList"), "strOptSaNm");
				container.addChild(output_30, {
					"top": "205px",
					"left": "500px",
					"width": "360px",
					"height": "25px"
				});
				var output_31 = new cpr.controls.Output("optOptStudDivRcd");
				output_31.value = "";
				output_31.bind("value").toLanguage("UI-DB-STUD_DIV_RCD");
				container.addChild(output_31, {
					"top": "330px",
					"left": "390px",
					"width": "105px",
					"height": "25px"
				});
				var output_32 = new cpr.controls.Output("optStudDivRcd");
				output_32.value = "";
				output_32.bind("value").toDataMap(app.lookup("dmResList"), "strOptStudDivRcd");
				container.addChild(output_32, {
					"top": "330px",
					"left": "500px",
					"width": "360px",
					"height": "25px"
				});
				var output_33 = new cpr.controls.Output("optOptOgNm");
				output_33.value = "";
				output_33.bind("value").toLanguage("UI-GLS-OG");
				container.addChild(output_33, {
					"top": "305px",
					"left": "390px",
					"width": "105px",
					"height": "25px"
				});
				var output_34 = new cpr.controls.Output("optOgNm");
				output_34.value = "";
				output_34.bind("value").toDataMap(app.lookup("dmResList"), "strOptOgNm");
				container.addChild(output_34, {
					"top": "305px",
					"left": "500px",
					"width": "360px",
					"height": "25px"
				});
				var output_35 = new cpr.controls.Output("optOptOgCd");
				output_35.value = "";
				output_35.bind("value").toLanguage("UI-DB-OG_CD");
				container.addChild(output_35, {
					"top": "280px",
					"left": "390px",
					"width": "105px",
					"height": "25px"
				});
				var output_36 = new cpr.controls.Output("optOgCd");
				output_36.value = "";
				output_36.bind("value").toDataMap(app.lookup("dmResList"), "strOptOgCd");
				container.addChild(output_36, {
					"top": "280px",
					"left": "500px",
					"width": "360px",
					"height": "25px"
				});
				var output_37 = new cpr.controls.Output("optOptGenderRcd");
				output_37.value = "";
				output_37.bind("value").toLanguage("UI-DB-GENDER_RCD");
				container.addChild(output_37, {
					"top": "405px",
					"left": "390px",
					"width": "105px",
					"height": "25px"
				});
				var output_38 = new cpr.controls.Output("optGenderRcd");
				output_38.value = "";
				output_38.bind("value").toDataMap(app.lookup("dmResList"), "strOptGenderRcd");
				container.addChild(output_38, {
					"top": "405px",
					"left": "500px",
					"width": "360px",
					"height": "25px"
				});
				var output_39 = new cpr.controls.Output("optOptBirthday");
				output_39.value = "";
				output_39.bind("value").toLanguage("UI-GLS-BIRTHDAY");
				container.addChild(output_39, {
					"top": "380px",
					"left": "390px",
					"width": "105px",
					"height": "25px"
				});
				var output_40 = new cpr.controls.Output("optBirthday");
				output_40.value = "";
				output_40.bind("value").toDataMap(app.lookup("dmResList"), "strOptBirthday");
				container.addChild(output_40, {
					"top": "380px",
					"left": "500px",
					"width": "360px",
					"height": "25px"
				});
				var output_41 = new cpr.controls.Output("optOptStudDivNm");
				output_41.value = "";
				output_41.bind("value").toLanguage("UI-SCR-STDDIS");
				container.addChild(output_41, {
					"top": "355px",
					"left": "390px",
					"width": "105px",
					"height": "25px"
				});
				var output_42 = new cpr.controls.Output("optStudDivNm");
				output_42.value = "";
				output_42.bind("value").toDataMap(app.lookup("dmResList"), "strOptStudDivNm");
				container.addChild(output_42, {
					"top": "355px",
					"left": "500px",
					"width": "360px",
					"height": "25px"
				});
				var output_43 = new cpr.controls.Output("optOptGenderNm");
				output_43.value = "";
				output_43.bind("value").toLanguage("UI-GLS-GENDER");
				container.addChild(output_43, {
					"top": "430px",
					"left": "390px",
					"width": "105px",
					"height": "25px"
				});
				var output_44 = new cpr.controls.Output("optGenderNm");
				output_44.value = "";
				output_44.bind("value").toDataMap(app.lookup("dmResList"), "strOptGenderNm");
				container.addChild(output_44, {
					"top": "430px",
					"left": "500px",
					"width": "360px",
					"height": "25px"
				});
				var output_45 = new cpr.controls.Output("optAuthYn1");
				output_45.value = "";
				output_45.bind("value").toLanguage("UI-DB-OBJ_DIV_RCD");
				container.addChild(output_45, {
					"top": "180px",
					"left": "5px",
					"width": "115px",
					"height": "25px"
				});
				var comboBox_3 = new cpr.controls.ComboBox("cbbObjDivRcd");
				comboBox_3.bind("value").toDataMap(app.lookup("dmReqKey"), "strObjDivRcd");
				(function(comboBox_3){
					comboBox_3.setItemSet(app.lookup("dsObjDivRcdList"), {
						"label": "CD_NM",
						"value": "CD"
					});
				})(comboBox_3);
				container.addChild(comboBox_3, {
					"top": "180px",
					"left": "125px",
					"width": "150px",
					"height": "25px"
				});
			})(group_2);
			container.addChild(group_2, {
				"top": "72px",
				"left": "5px",
				"width": "1225px",
				"height": "598px"
			});
			
			var embeddedApp_1 = new cpr.controls.EmbeddedApp("emaort2");
			cpr.core.App.load("app/csr/impStdCsrPStSearch", function(app) {
				if(app){
					embeddedApp_1.app = app;
				}
			});
			container.addChild(embeddedApp_1, {
				"top": "665px",
				"left": "110px",
				"width": "100px",
				"height": "25px"
			});
			if(typeof onBodyLoad == "function"){
				app.addEventListener("load", onBodyLoad);
			}
		}
	});
	app.title = "stdCsrMstFrame";
	cpr.core.Platform.INSTANCE.register(app);
})();