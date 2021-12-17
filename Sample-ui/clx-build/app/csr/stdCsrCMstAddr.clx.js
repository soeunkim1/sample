/*
 * App URI: app/csr/stdCsrCMstAddr
 * Source Location: app/csr/stdCsrCMstAddr.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("app/csr/stdCsrCMstAddr", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			﻿//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
			/// <xtmlink path="./stdCsrCMstAddr.xtm"/>
			
			
			var stdCsrCMstAddr = function() {
				var moPage = new Page();
				var moPObject 	= new PObject();
					
				var msStudId = "";
				var msUseTabNm = "";
				
				/**
				 * 우편번호검색팝업 관련 설정사항
				 * 각 변수별 설명
				 *  iXXX : 팝업으로 input 전달될 파라미터
				 *  oXXX : 팝업에서 선택한 값을 받을 컬럼 아이디
				 *  [IN]
				 *   1. controlId					: (필수) 최초 이벤트의 버튼id
				 *  [OUT]
				 *  2. oZipCode					: 우편번호
				 *  3. oZipSeq					: 우편일련번호
				 *  4. oBdMno                    : 건물번호
				 *  5. oAddr						: 주소
				 *  6. func						: 팝업에서 선택한 값을 받은 후 추가 로직이 필요한 경우 함수 작성
				 * @member impStdCmnPZipSearch
				 * @type Array
				 * @author Choi In Seong at 16. 1. 26
				 */ 
				moPObject.moIdsForStdCmnPZipSearch = [
					 { 
						 controlId					: "btnPopZipcodeSearch",		//(필수)우편번호검색
						 oZipCode					: "ipbFrfZipcode",	//리턴 우편번호
						 oAddr						: "ipbFrfAddr1",		//리턴 주소
						 oAddrDtl					: "ipbFrfAddr2",		//리턴 주소
						 func				 			: null
					 }
				 ];
				
				moPage.onLoadImportDone_impSbpHeader = function() {
					doSbpHeaderOnLoad();
				};
				
				moPage.onModelConstructDone_StdCsrCMstEntr = function() {
					doOnLoad();
				};
				
				/**
				 * @desc 프리폼 변경여부 반환
				 * @param 
				 * @return boolean 변경여부
				 * @author Choi In Seong 2016. 1. 25
				 */
				function doCheckDataChange() {
					if(util.Grid.isModified(app, ["grdCmnAddr"], "CRM") ){
						return false;
					}else{
						return true;
					}
				};
				
				/**
				 * @desc doOnLoad 화면 초기화
				 * @param 
				 * @return void
				 * @author Choi In Seong 2016. 1. 25
				 */
				function doOnLoad(){
			
			//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
			//		ExtGroup.initSearchBox("grpSearchAddr", ["grp_rptCmnAddr"]);
					//리피트 초기화
			//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
			//		ExtRepeat.init(["rptCmnAddr", "frfCmnAddr"]);
			
					//메인 프레임에서 학생의 id를 받아 해당 기본정보 추출
					//strCommand: onLoad 
					util.Submit.send(app, "subOnLoad", function(pbSuccess) {
							if (pbSuccess) {
								
								// 부모멤버변수에담긴학번받음
								msStudId = moPage.parent.moParentObj.studId;
								msUseTabNm = moPage.parent.moParentObj.USE_TAB_NM;
								
								// 기준일자 셋팅(현재일자)
								util.Control.setValue(app, "dipStdDt", util.DataMap.getValue(app, "dmResOnLoad", "keyDt"));
								
								util.Control.redraw(app, ["frfCmnAddr", "cbbSchAddrPrpDivRcd", "dipStdDt"]);
								
								if (ValueUtil.isNull(msStudId)) {
									util.coverPage(app);
									return false;
								}else{
									//LIST CALL 
									util.Header.clickSearch(app);
								}
							}
						}
					);
				};
				
				/**
				 * @desc 해당 학생의 기본정보 데이터를 가져온다.
				 * @param poFunc 콜백함수
				 * @return void
				 * @author Choi In Seong 2016. 1. 25
				 */
				function doList(poFunc) {
					
					var vsPrpDivRcd = util.Control.getValue(app, "cbbSchAddrPrpDivRcd");
			
					util.DataMap.setValue(app, "dmReqList", "strStudId", msStudId);
					util.DataMap.setValue(app, "dmReqList", "strUseTabNm", msUseTabNm);
					util.DataMap.setValue(app, "dmReqList", "strPrpDivRcd", vsPrpDivRcd);
					
					// submission call 
					//strCommand: list 
					util.Submit.send(app, "subList",  function(pbSuccess) {
						if(pbSuccess){
							//화면에 rebuild
							util.Control.redraw(app, ["rptCmnAddr"]);
							doCompareFrfEnable();
							// 조회 내역이 없으면 프리폼 초기화
							var vnRptCnt = util.DataSet.getRowCount(app, "dsRptCmnAddr");
							if(vnRptCnt == 0){
								util.Control.reset(app, "frfCmnAddr");
							}
							util.Control.redraw(app, "lblRowCnt_rptCmnAddr");
						}
						
						if(util.isFunc(poFunc)) poFunc(pbSuccess);
					});
						
				};
				
				/**
				 * @desc 주소정보 신규
				 * @param
				 * @return void
				 * @author Choi In Seong 2016. 1. 25
				 */
				moPage.onClick_BtnNew = function() {
					
					var vsPrpDivRcd = util.Control.getValue(app, "cbbSchAddrPrpDivRcd");
					var vsPath = "/root/resList/rptCmnAddr/row[ child:: ADDR_PRP_DIV_RCD ='"+vsPrpDivRcd+"' and UPT_STATUS != 'N' ]";;
			// End - User Script
			
			// Header
			var dataSet_1 = new cpr.data.DataSet("dsCmnAddr");
			dataSet_1.parseData({
				"info": "CMN_ADDR@ADDR_PRP_DIV_RCD,USE_TAB_NM,KEY_TAB_NM,ST_DT,END_DT",
				"columns": [
					{"name": "HOMEPAGE1"},
					{"name": "KEY_TAB_NM"},
					{"name": "MESSENGER2"},
					{"name": "FAX_EXT_NO"},
					{"name": "MESSENGER1"},
					{"name": "HOMEPAGE2"},
					{"name": "REMARK"},
					{"name": "REP_ADDR_YN"},
					{"name": "ZIPSEQ"},
					{"name": "CLP_NO"},
					{"name": "ADDR2"},
					{"name": "ADDR1"},
					{"name": "AEN"},
					{"name": "RGN"},
					{"name": "EMAIL"},
					{"name": "REP_CTTP_RCD"},
					{"name": "ST_DT"},
					{"name": "END_DT"},
					{"name": "USE_TAB_NM"},
					{"name": "ADDR_PRP_DIV_RCD"},
					{"name": "CITY_NM"},
					{"name": "DRT_TEL_NO"},
					{"name": "REP_TEL_NO"},
					{"name": "POB_ZIPCODE"},
					{"name": "ZIPCODE"},
					{"name": "FAX_NO"},
					{"name": "PAGER_NO"},
					{"name": "NAT_RCD"},
					{"name": "POB"},
					{"name": "FLAG_GBN"}
				],
				"rows": []
			});
			app.register(dataSet_1);
			
			var dataSet_2 = new cpr.data.DataSet("dsFrfCmnAddr");
			dataSet_2.parseData({
				"columns": [
					{"name": "HOMEPAGE1"},
					{"name": "KEY_TAB_NM"},
					{"name": "MESSENGER2"},
					{"name": "FAX_EXT_NO"},
					{"name": "MESSENGER1"},
					{"name": "HOMEPAGE2"},
					{"name": "REMARK"},
					{"name": "REP_ADDR_YN"},
					{"name": "ZIPSEQ"},
					{"name": "CLP_NO"},
					{"name": "ADDR2"},
					{"name": "ADDR1"},
					{"name": "AEN"},
					{"name": "RGN"},
					{"name": "EMAIL"},
					{"name": "REP_CTTP_RCD"},
					{"name": "ST_DT"},
					{"name": "END_DT"},
					{"name": "USE_TAB_NM"},
					{"name": "ADDR_PRP_DIV_RCD"},
					{"name": "DRT_TEL_NO"},
					{"name": "CITY_NM"},
					{"name": "REP_TEL_NO"},
					{"name": "POB_ZIPCODE"},
					{"name": "ZIPCODE"},
					{"name": "FAX_NO"},
					{"name": "PAGER_NO"},
					{"name": "NAT_RCD"},
					{"name": "POB"},
					{"name": "FLAG_GBN"}
				],
				"rows": []
			});
			app.register(dataSet_2);
			
			var dataSet_3 = new cpr.data.DataSet("dsAddrAllList");
			dataSet_3.parseData({
				"columns": [
					{"name": "HOMEPAGE1"},
					{"name": "KEY_TAB_NM"},
					{"name": "MESSENGER2"},
					{"name": "FAX_EXT_NO"},
					{"name": "MESSENGER1"},
					{"name": "HOMEPAGE2"},
					{"name": "REMARK"},
					{"name": "REP_ADDR_YN"},
					{"name": "ZIPSEQ"},
					{"name": "CLP_NO"},
					{"name": "ADDR2"},
					{"name": "ADDR1"},
					{"name": "AEN"},
					{"name": "RGN"},
					{"name": "EMAIL"},
					{"name": "REP_CTTP_RCD"},
					{"name": "ST_DT"},
					{"name": "END_DT"},
					{"name": "USE_TAB_NM"},
					{"name": "ADDR_PRP_DIV_RCD"},
					{"name": "DRT_TEL_NO"},
					{"name": "CITY_NM"},
					{"name": "REP_TEL_NO"},
					{"name": "POB_ZIPCODE"},
					{"name": "ZIPCODE"},
					{"name": "FAX_NO"},
					{"name": "PAGER_NO"},
					{"name": "NAT_RCD"},
					{"name": "POB"},
					{"name": "FLAG_GBN"}
				],
				"rows": []
			});
			app.register(dataSet_3);
			
			var dataSet_4 = new cpr.data.DataSet("dsAddrList");
			dataSet_4.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_4);
			var dataMap_1 = new cpr.data.DataMap("dmReqList");
			dataMap_1.parseData({
				"columns" : [
					{
						"name": "strStudId",
						"dataType": "string"
					},
					{
						"name": "strUseTabNm",
						"dataType": "string"
					},
					{
						"name": "strPrpDivRcd",
						"dataType": "string"
					},
					{
						"name": "strStdDt",
						"dataType": "string"
					}
				]
			});
			app.register(dataMap_1);
			
			var dataMap_2 = new cpr.data.DataMap("dmResOnLoad");
			dataMap_2.parseData({
				"columns" : [{
					"name": "keyDt",
					"dataType": "string"
				}]
			});
			app.register(dataMap_2);
			var submission_1 = new cpr.protocols.Submission("subOnLoad");
			submission_1.action = "/csr/StdCsrMstAddr/";
			submission_1.mediaType = "application/x-www-form-urlencoded";
			submission_1.addRequestData(dataMap_1);
			submission_1.addResponseData(dataMap_2, false);
			submission_1.addResponseData(dataSet_4, false);
			app.register(submission_1);
			
			var submission_2 = new cpr.protocols.Submission("subList");
			submission_2.action = "/csr/StdCsrMstAddr/";
			submission_2.mediaType = "application/x-www-form-urlencoded";
			submission_2.addRequestData(dataMap_1);
			submission_2.addResponseData(dataSet_1, false);
			submission_2.addResponseData(dataSet_3, false);
			app.register(submission_2);
			
			var submission_3 = new cpr.protocols.Submission("subSave");
			submission_3.action = "/csr/StdCsrMstAddr/";
			submission_3.mediaType = "application/x-www-form-urlencoded";
			submission_3.addRequestData(dataMap_1);
			submission_3.addRequestData(dataSet_1);
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
			var group_1 = new cpr.controls.Container("grp_rptCmnAddr");
			// Layout
			var xYLayout_2 = new cpr.controls.layouts.XYLayout();
			group_1.setLayout(xYLayout_2);
			(function(container){
				var group_2 = linker.group_2 = new cpr.controls.Container("frfCmnAddr");
				group_2.style.setClasses(["form-box"]);
				// Layout
				var xYLayout_3 = new cpr.controls.layouts.XYLayout();
				group_2.setLayout(xYLayout_3);
				(function(container){
					var output_1 = new cpr.controls.Output("optAddrPrpDivRcd");
					output_1.value = "";
					output_1.style.setClasses(["require"]);
					output_1.bind("value").toLanguage("UI-SCR-ADDRUSENM");
					container.addChild(output_1, {
						"top": "5px",
						"left": "5px",
						"width": "95px",
						"height": "25px"
					});
					var output_2 = new cpr.controls.Output("optAddr1");
					output_2.value = "";
					output_2.bind("value").toLanguage("UI-DB-ADDR1");
					container.addChild(output_2, {
						"top": "105px",
						"left": "5px",
						"width": "95px",
						"height": "25px"
					});
					var output_3 = new cpr.controls.Output("optZipcode");
					output_3.value = "";
					output_3.bind("value").toLanguage("UI-GLS-ZIPCODE");
					container.addChild(output_3, {
						"top": "80px",
						"left": "5px",
						"width": "95px",
						"height": "25px"
					});
					var inputBox_1 = new cpr.controls.InputBox("ipbFrfAddr1");
					inputBox_1.enabled = false;
					inputBox_1.maxLength = 30;
					inputBox_1.bind("fieldLabel").toExpression("#optAddr1.value");
					inputBox_1.bind("value").toDataColumn("ADDR1");
					container.addChild(inputBox_1, {
						"top": "105px",
						"left": "105px",
						"width": "305px",
						"height": "25px"
					});
					var comboBox_1 = new cpr.controls.ComboBox("cbbFrfAddrPrpDivRcd");
					comboBox_1.enabled = false;
					comboBox_1.userAttr({"require": "Y"});
					comboBox_1.bind("fieldLabel").toExpression("#optAddrPrpDivRcd.value");
					comboBox_1.bind("value").toDataColumn("ADDR_PRP_DIV_RCD");
					(function(comboBox_1){
						comboBox_1.setItemSet(app.lookup("dsAddrList"), {
							"label": "CD_NM",
							"value": "CD"
						});
					})(comboBox_1);
					if(typeof onCbbFrfAddrPrpDivRcdSelectionChange == "function") {
						comboBox_1.addEventListener("selection-change", onCbbFrfAddrPrpDivRcdSelectionChange);
					}
					container.addChild(comboBox_1, {
						"top": "5px",
						"left": "105px",
						"width": "100px",
						"height": "25px"
					});
					var inputBox_2 = new cpr.controls.InputBox("ipbFrfZipcode");
					inputBox_2.enabled = false;
					inputBox_2.maxLength = 50;
					inputBox_2.bind("fieldLabel").toExpression("#optZipcode.value");
					inputBox_2.bind("value").toDataColumn("ZIPCODE");
					container.addChild(inputBox_2, {
						"top": "80px",
						"left": "105px",
						"width": "65px",
						"height": "25px"
					});
					var output_4 = new cpr.controls.Output("optStDt");
					output_4.value = "";
					output_4.style.setClasses(["require"]);
					output_4.bind("value").toLanguage("UI-DB-ST_DT");
					container.addChild(output_4, {
						"top": "30px",
						"left": "5px",
						"width": "95px",
						"height": "25px"
					});
					var output_5 = new cpr.controls.Output("optClpNo");
					output_5.value = "휴대전화1";
					container.addChild(output_5, {
						"top": "155px",
						"left": "5px",
						"width": "95px",
						"height": "25px"
					});
					var output_6 = new cpr.controls.Output("optAdmOfficerSysYn");
					output_6.value = "";
					output_6.bind("value").toLanguage("UI-DB-ADMOFFICERSYSYN");
					container.addChild(output_6, {
						"top": "355px",
						"left": "5px",
						"width": "95px",
						"height": "25px"
					});
					var numberEditor_1 = new cpr.controls.NumberEditor("ipbFrfClpNo");
					numberEditor_1.format = "999,999,999,999,999,999,999,999,999,999";
					numberEditor_1.bind("fieldLabel").toExpression("#optClpNo.value");
					numberEditor_1.bind("value").toDataColumn("CLP_NO");
					container.addChild(numberEditor_1, {
						"top": "155px",
						"left": "105px",
						"width": "120px",
						"height": "25px"
					});
					var inputBox_3 = new cpr.controls.InputBox("ipbZipSeq");
					inputBox_3.visible = false;
					inputBox_3.maxLength = 50;
					inputBox_3.bind("fieldLabel").toExpression("#optZipSeq.value");
					inputBox_3.bind("value").toDataColumn("ZIPSEQ");
					container.addChild(inputBox_3, {
						"top": "99px",
						"left": "200px",
						"width": "10px",
						"height": "25px"
					});
					var button_1 = new cpr.controls.Button("btnPopZipcodeSearch");
					button_1.value = "";
					button_1.style.setClasses(["btn-pop-search"]);
					if(typeof onBtnPopZipcodeSearchClick == "function") {
						button_1.addEventListener("click", onBtnPopZipcodeSearchClick);
					}
					container.addChild(button_1, {
						"top": "80px",
						"left": "170px",
						"width": "20px",
						"height": "25px"
					});
					var checkBox_1 = new cpr.controls.CheckBox("chkFrfAdmOfficerSysYn");
					checkBox_1.value = "";
					checkBox_1.trueValue = "Y";
					checkBox_1.falseValue = "";
					checkBox_1.text = "Y";
					checkBox_1.bind("fieldLabel").toExpression("#optAdmOfficerSysYn.value");
					checkBox_1.bind("value").toDataColumn("REP_ADDR_YN");
					container.addChild(checkBox_1, {
						"top": "355px",
						"left": "105px",
						"width": "35px",
						"height": "25px"
					});
					var output_7 = new cpr.controls.Output("optAddr2");
					output_7.value = "";
					output_7.bind("value").toLanguage("UI-DB-ADDR2");
					container.addChild(output_7, {
						"top": "130px",
						"left": "5px",
						"width": "95px",
						"height": "25px"
					});
					var numberEditor_2 = new cpr.controls.NumberEditor("ipbFrfAddr2");
					numberEditor_2.enabled = false;
					numberEditor_2.format = "99,999,999,999,999,999,999,999,999,999,999,999,999,999,999,999,999";
					numberEditor_2.bind("fieldLabel").toExpression("#optAddr2.value");
					numberEditor_2.bind("value").toDataColumn("ADDR2");
					container.addChild(numberEditor_2, {
						"top": "130px",
						"left": "105px",
						"width": "305px",
						"height": "25px"
					});
					var output_8 = new cpr.controls.Output("optEndDt");
					output_8.value = "";
					output_8.style.setClasses(["require"]);
					output_8.bind("value").toLanguage("UI-DB-END_DT");
					container.addChild(output_8, {
						"top": "30px",
						"left": "185px",
						"width": "95px",
						"height": "25px"
					});
					var output_9 = new cpr.controls.Output("optDrtTelNo");
					output_9.value = "";
					output_9.bind("value").toLanguage("UI-DB-HOME_TEL_NO");
					container.addChild(output_9, {
						"top": "206px",
						"left": "5px",
						"width": "95px",
						"height": "25px"
					});
					var numberEditor_3 = new cpr.controls.NumberEditor("ipbFrfDrtTelNo");
					numberEditor_3.format = "999,999,999,999,999,999,999,999,999,999";
					numberEditor_3.bind("fieldLabel").toExpression("#optDrtTelNo.value");
					numberEditor_3.bind("value").toDataColumn("DRT_TEL_NO");
					container.addChild(numberEditor_3, {
						"top": "206px",
						"left": "105px",
						"width": "120px",
						"height": "25px"
					});
					var output_10 = new cpr.controls.Output("optRepTelNo");
					output_10.value = "휴대전화2";
					container.addChild(output_10, {
						"top": "180px",
						"left": "5px",
						"width": "95px",
						"height": "25px"
					});
					var numberEditor_4 = new cpr.controls.NumberEditor("ipbFrfRepTelNo");
					numberEditor_4.format = "999,999,999,999,999,999,999,999,999,999";
					numberEditor_4.bind("fieldLabel").toExpression("#optRepTelNo.value");
					numberEditor_4.bind("value").toDataColumn("REP_TEL_NO");
					container.addChild(numberEditor_4, {
						"top": "180px",
						"left": "105px",
						"width": "120px",
						"height": "25px"
					});
					var output_11 = new cpr.controls.Output("optEmail");
					output_11.value = "";
					output_11.bind("value").toLanguage("UI-DB-EMAIL");
					container.addChild(output_11, {
						"top": "255px",
						"left": "5px",
						"width": "95px",
						"height": "25px"
					});
					var inputBox_4 = new cpr.controls.InputBox("ipbFrfEmail");
					inputBox_4.maxLength = 100;
					inputBox_4.bind("fieldLabel").toExpression("#optEmail.value");
					inputBox_4.bind("value").toDataColumn("EMAIL");
					container.addChild(inputBox_4, {
						"top": "255px",
						"left": "105px",
						"width": "305px",
						"height": "25px"
					});
					var output_12 = new cpr.controls.Output("optHomepage1");
					output_12.value = "";
					output_12.bind("value").toLanguage("UI-GLS-HOMEPAGE");
					container.addChild(output_12, {
						"top": "280px",
						"left": "5px",
						"width": "95px",
						"height": "25px"
					});
					var inputBox_5 = new cpr.controls.InputBox("ipbFrfHomepage1");
					inputBox_5.maxLength = 100;
					inputBox_5.bind("fieldLabel").toExpression("#optHomepage1.value");
					inputBox_5.bind("value").toDataColumn("HOMEPAGE1");
					container.addChild(inputBox_5, {
						"top": "280px",
						"left": "105px",
						"width": "305px",
						"height": "25px"
					});
					var output_13 = new cpr.controls.Output("optMessenger1");
					output_13.value = "";
					output_13.bind("value").toLanguage("UI-GLS-MESSAEGER");
					container.addChild(output_13, {
						"top": "305px",
						"left": "5px",
						"width": "95px",
						"height": "25px"
					});
					var inputBox_6 = new cpr.controls.InputBox("ipbFrfMessenger1");
					inputBox_6.maxLength = 100;
					inputBox_6.bind("fieldLabel").toExpression("#optMessenger1.value");
					inputBox_6.bind("value").toDataColumn("MESSENGER1");
					container.addChild(inputBox_6, {
						"top": "305px",
						"left": "105px",
						"width": "305px",
						"height": "25px"
					});
					var output_14 = new cpr.controls.Output("optRemark");
					output_14.value = "";
					output_14.bind("value").toLanguage("UI-GLS-REMARK");
					container.addChild(output_14, {
						"top": "330px",
						"left": "5px",
						"width": "95px",
						"height": "25px"
					});
					var inputBox_7 = new cpr.controls.InputBox("ipbFrfRemark");
					inputBox_7.maxLength = 1000;
					inputBox_7.bind("fieldLabel").toExpression("#optRemark.value");
					inputBox_7.bind("value").toDataColumn("REMARK");
					container.addChild(inputBox_7, {
						"top": "330px",
						"left": "105px",
						"width": "305px",
						"height": "25px"
					});
					var output_15 = new cpr.controls.Output("optRgn");
					output_15.value = "";
					output_15.bind("value").toLanguage("UI-DB-RGN");
					container.addChild(output_15, {
						"top": "55px",
						"left": "5px",
						"width": "95px",
						"height": "25px"
					});
					var inputBox_8 = new cpr.controls.InputBox("ipbFrfRgn");
					inputBox_8.maxLength = 100;
					inputBox_8.bind("fieldLabel").toExpression("#optRgn.value");
					inputBox_8.bind("value").toDataColumn("RGN");
					container.addChild(inputBox_8, {
						"top": "55px",
						"left": "105px",
						"width": "305px",
						"height": "25px"
					});
					var output_16 = new cpr.controls.Output("label1");
					output_16.value = "";
					output_16.bind("value").toLanguage("UI-SCR-CSRADDRGUIDMSG2");
					container.addChild(output_16, {
						"top": "80px",
						"left": "195px",
						"width": "210px",
						"height": "25px"
					});
					var inputBox_9 = new cpr.controls.InputBox("ipbFrfFlagGbn");
					inputBox_9.visible = false;
					inputBox_9.bind("value").toDataColumn("FLAG_GBN");
					container.addChild(inputBox_9, {
						"top": "5px",
						"left": "245px",
						"width": "15px",
						"height": "25px"
					});
					var inputBox_10 = new cpr.controls.InputBox("ipbFrfUseTabNm");
					inputBox_10.visible = false;
					inputBox_10.bind("value").toDataColumn("USE_TAB_NM");
					container.addChild(inputBox_10, {
						"top": "5px",
						"left": "265px",
						"width": "15px",
						"height": "25px"
					});
					var inputBox_11 = new cpr.controls.InputBox("iipbFrfKeyTabNm");
					inputBox_11.visible = false;
					inputBox_11.bind("value").toDataColumn("KEY_TAB_NM");
					container.addChild(inputBox_11, {
						"top": "5px",
						"left": "290px",
						"width": "15px",
						"height": "25px"
					});
					var output_17 = new cpr.controls.Output("optFrfEndDt");
					output_17.value = "";
					output_17.dataType = "date";
					output_17.format = "YYYY-MM-DD";
					output_17.bind("value").toDataColumn("END_DT");
					container.addChild(output_17, {
						"top": "30px",
						"left": "285px",
						"width": "70px",
						"height": "25px"
					});
					var output_18 = new cpr.controls.Output("optFrfStDt");
					output_18.value = "";
					output_18.dataType = "date";
					output_18.format = "YYYY-MM-DD";
					output_18.bind("value").toDataColumn("ST_DT");
					container.addChild(output_18, {
						"top": "30px",
						"left": "105px",
						"width": "70px",
						"height": "25px"
					});
					var output_19 = new cpr.controls.Output("label2");
					output_19.value = "";
					output_19.bind("value").toLanguage("UI-SCR-CSRADDRGUIDMSG1");
					container.addChild(output_19, {
						"top": "5px",
						"left": "210px",
						"width": "200px",
						"height": "25px"
					});
				})(group_2);
				container.addChild(group_2, {
					"top": "30px",
					"left": "605px",
					"width": "415px",
					"height": "391px"
				});
				var grid_1 = linker.grid_1 = new cpr.controls.Grid("grdCmnAddr");
				grid_1.init({
					"dataSet": app.lookup("dsCmnAddr"),
					"columns": [
						{"width": "25px"},
						{"width": "40px"},
						{"width": "90px"},
						{"width": "85px"},
						{"width": "85px"},
						{"width": "95px"},
						{"width": "70px"},
						{"width": "343px"},
						{
							"width": "95px",
							"visible": false
						},
						{
							"width": "95px",
							"visible": false
						},
						{
							"width": "95px",
							"visible": false
						},
						{
							"width": "95px",
							"visible": false
						},
						{
							"width": "95px",
							"visible": false
						},
						{
							"width": "95px",
							"visible": false
						},
						{
							"width": "95px",
							"visible": false
						},
						{
							"width": "95px",
							"visible": false
						},
						{
							"width": "95px",
							"visible": false
						},
						{
							"width": "95px",
							"visible": false
						},
						{"width": "95px"},
						{
							"width": "95px",
							"visible": false
						}
					],
					"header": {
						"rows": [{"height": "27px"}],
						"cells": [
							{
								"constraint": {"rowIndex": 0, "colIndex": 0},
								"configurator": function(cell){
									cell.text = "F";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 1},
								"configurator": function(cell){
									cell.text = "No";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 2},
								"configurator": function(cell){
									cell.style.setClasses(["require"]);
									cell.bind("text").toLanguage("UI-SCR-ADDRUSENM");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 3},
								"configurator": function(cell){
									cell.style.setClasses(["require"]);
									cell.bind("text").toLanguage("UI-DB-ST_DT");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 4},
								"configurator": function(cell){
									cell.style.setClasses(["require"]);
									cell.bind("text").toLanguage("UI-DB-END_DT");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 5},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-GLS-CLP");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 6},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-DB-ZIPCODE");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 7},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-DB-ADDR1");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 8},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-DB-ADDR2");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 9},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-DB-HOME_TEL_NO");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 10},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-DB-AEN");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 11},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-DB-REP_TEL_NO");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 12},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-DB-EMAIL");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 13},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-GLS-HOMEPAGE");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 14},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-DB-MESSENGER1");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 15},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-DB-REMARK");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 16},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-SCR-REPCTADDR");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 17},
								"configurator": function(cell){
									cell.text = "공통날짜변경\n플래그";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 18},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-DB-USE_TAB_NM");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 19},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-DB-KEY_TAB_NM");
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
									cell.control = (function(){
										var output_20 = new cpr.controls.Output();
										output_20.style.css({
											"text-align" : "center"
										});
										return output_20;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 1},
								"configurator": function(cell){
									cell.columnType = "rowindex";
									cell.style.css({
										"text-align" : "center"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 2},
								"configurator": function(cell){
									cell.columnName = "ADDR_PRP_DIV_RCD";
									cell.control = (function(){
										var comboBox_2 = new cpr.controls.ComboBox("gdAddrPrpDivRcd");
										comboBox_2.enabled = false;
										comboBox_2.hideButton = true;
										comboBox_2.userAttr({"require": "Y"});
										(function(comboBox_2){
											comboBox_2.addItem(new cpr.controls.Item("선택", ""));
											comboBox_2.setItemSet(app.lookup("dsAddrList"), {
												"label": "CD_NM",
												"value": "CD"
											});
										})(comboBox_2);
										comboBox_2.bind("value").toDataColumn("ADDR_PRP_DIV_RCD");
										return comboBox_2;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 3},
								"configurator": function(cell){
									cell.columnName = "ST_DT";
									cell.control = (function(){
										var output_21 = new cpr.controls.Output("gdOptStDt");
										output_21.dataType = "date";
										output_21.format = "YYYY-MM-DD";
										output_21.style.css({
											"text-align" : "center"
										});
										output_21.bind("value").toDataColumn("ST_DT");
										return output_21;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 4},
								"configurator": function(cell){
									cell.columnName = "END_DT";
									cell.control = (function(){
										var output_22 = new cpr.controls.Output("gdOptEndDt");
										output_22.dataType = "date";
										output_22.format = "YYYY-MM-DD";
										output_22.style.css({
											"text-align" : "center"
										});
										output_22.bind("value").toDataColumn("END_DT");
										return output_22;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 5},
								"configurator": function(cell){
									cell.columnName = "CLP_NO";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 6},
								"configurator": function(cell){
									cell.columnName = "ZIPCODE";
									cell.style.css({
										"text-align" : "center"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 7},
								"configurator": function(cell){
									cell.columnName = "ADDR1";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 8},
								"configurator": function(cell){
									cell.columnName = "ADDR2";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 9},
								"configurator": function(cell){
									cell.columnName = "DRT_TEL_NO";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 10},
								"configurator": function(cell){
									cell.columnName = "AEN";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 11},
								"configurator": function(cell){
									cell.columnName = "REP_TEL_NO";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 12},
								"configurator": function(cell){
									cell.columnName = "EMAIL";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 13},
								"configurator": function(cell){
									cell.columnName = "HOMEPAGE1";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 14},
								"configurator": function(cell){
									cell.columnName = "MESSENGER1";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 15},
								"configurator": function(cell){
									cell.columnName = "REMARK";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 16},
								"configurator": function(cell){
									cell.columnName = "REP_ADDR_YN";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 17},
								"configurator": function(cell){
									cell.columnName = "FLAG_GBN";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 18},
								"configurator": function(cell){
									cell.columnName = "USE_TAB_NM";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 19},
								"configurator": function(cell){
									cell.columnName = "KEY_TAB_NM";
								}
							}
						]
					}
				});
				if(typeof onGrdCmnAddrSelectionChange == "function") {
					grid_1.addEventListener("selection-change", onGrdCmnAddrSelectionChange);
				}
				container.addChild(grid_1, {
					"top": "30px",
					"left": "5px",
					"width": "595px",
					"height": "391px"
				});
				var userDefinedControl_1 = new udc.com.comFormTitle();
				userDefinedControl_1.bind("title").toLanguage("UI-SCR-ADDRINFO");
				container.addChild(userDefinedControl_1, {
					"top": "5px",
					"left": "5px",
					"width": "136px",
					"height": "25px"
				});
				var button_2 = new cpr.controls.Button("btnDel");
				button_2.value = "";
				button_2.style.setClasses(["btn-delete"]);
				button_2.bind("value").toLanguage("UI-SCR-DELETE");
				if(typeof onBtnDelClick == "function") {
					button_2.addEventListener("click", onBtnDelClick);
				}
				container.addChild(button_2, {
					"top": "5px",
					"left": "895px",
					"width": "60px",
					"height": "25px"
				});
				var button_3 = new cpr.controls.Button("btnNew");
				button_3.value = "";
				button_3.style.setClasses(["btn-new"]);
				button_3.bind("value").toLanguage("UI-SCR-NEW");
				if(typeof onBtnNewClick == "function") {
					button_3.addEventListener("click", onBtnNewClick);
				}
				container.addChild(button_3, {
					"top": "5px",
					"left": "830px",
					"width": "60px",
					"height": "25px"
				});
				var button_4 = new cpr.controls.Button("btnSave");
				button_4.value = "";
				button_4.style.setClasses(["btn-save"]);
				button_4.bind("value").toLanguage("UI-SCR-WRKSAVE");
				if(typeof onBtnSaveClick == "function") {
					button_4.addEventListener("click", onBtnSaveClick);
				}
				container.addChild(button_4, {
					"top": "5px",
					"left": "960px",
					"width": "60px",
					"height": "25px"
				});
				var output_23 = new cpr.controls.Output("optStdDt");
				output_23.value = "";
				output_23.bind("value").toLanguage("UI-SCR-STDDT");
				container.addChild(output_23, {
					"top": "5px",
					"left": "665px",
					"width": "65px",
					"height": "25px"
				});
				var dateInput_1 = new cpr.controls.DateInput("dipStdDt");
				dateInput_1.format = "YYYY-MM-DD";
				dateInput_1.userAttr({"require": "Y"});
				dateInput_1.bind("fieldLabel").toExpression("#optStdDt.value");
				dateInput_1.bind("value").toDataMap(app.lookup("dmReqList"), "strStdDt");
				container.addChild(dateInput_1, {
					"top": "5px",
					"left": "735px",
					"width": "90px",
					"height": "25px"
				});
			})(group_1);
			container.addChild(group_1, {
				"top": "37px",
				"left": "0px",
				"width": "1025px",
				"height": "426px"
			});
			
			var embeddedApp_1 = new cpr.controls.EmbeddedApp("emaSbpHeader");
			if(typeof onEmaSbpHeaderAppReady == "function") {
				embeddedApp_1.addEventListener("app-ready", onEmaSbpHeaderAppReady);
			}
			cpr.core.App.load("app/imp/impSbpHeader", function(app) {
				if(app){
					embeddedApp_1.app = app;
				}
			});
			container.addChild(embeddedApp_1, {
				"top": "440px",
				"left": "40px",
				"width": "96px",
				"height": "25px"
			});
			
			var embeddedApp_2 = new cpr.controls.EmbeddedApp("emaStdCmnPZipSearch");
			cpr.core.App.load("app/cmn/impStdCmnPZipSearch", function(app) {
				if(app){
					embeddedApp_2.app = app;
				}
			});
			container.addChild(embeddedApp_2, {
				"top": "440px",
				"left": "145px",
				"width": "50px",
				"height": "25px"
			});
			
			var group_3 = new cpr.controls.Container("grpSearchAddr");
			group_3.style.setClasses(["search-box"]);
			// Layout
			var xYLayout_4 = new cpr.controls.layouts.XYLayout();
			group_3.setLayout(xYLayout_4);
			(function(container){
				var output_24 = new cpr.controls.Output("optAddrPrpDivRcd1");
				output_24.value = "";
				output_24.bind("value").toLanguage("UI-SCR-ADDRUSENM");
				container.addChild(output_24, {
					"top": "5px",
					"left": "5px",
					"width": "80px",
					"height": "25px"
				});
				var comboBox_3 = new cpr.controls.ComboBox("cbbSchAddrPrpDivRcd");
				comboBox_3.bind("fieldLabel").toExpression("#optAddrPrpDivRcd.value");
				comboBox_3.bind("value").toDataMap(app.lookup("dmReqList"), "strPrpDivRcd");
				(function(comboBox_3){
					comboBox_3.addItem(new cpr.controls.Item("전체", ""));
					comboBox_3.setItemSet(app.lookup("dsAddrList"), {
						"label": "CD_NM",
						"value": "CD"
					});
				})(comboBox_3);
				container.addChild(comboBox_3, {
					"top": "5px",
					"left": "90px",
					"width": "125px",
					"height": "25px"
				});
				var button_5 = new cpr.controls.Button("btnSearch");
				button_5.value = "";
				button_5.style.setClasses(["btn-search"]);
				button_5.bind("value").toLanguage("UI-SCR-SCH");
				if(typeof onBtnSearchClick == "function") {
					button_5.addEventListener("click", onBtnSearchClick);
				}
				container.addChild(button_5, {
					"top": "5px",
					"left": "960px",
					"width": "60px",
					"height": "25px"
				});
			})(group_3);
			container.addChild(group_3, {
				"top": "0px",
				"left": "0px",
				"width": "1025px",
				"height": "32px"
			});
			if(typeof onBodyLoad == "function"){
				app.addEventListener("load", onBodyLoad);
			}
			// Linking
			linker.group_2.setBindContext(new cpr.bind.GridSelectionContext(linker.grid_1));
		}
	});
	app.title = "stdCsrCMstAddr";
	cpr.core.Platform.INSTANCE.register(app);
})();