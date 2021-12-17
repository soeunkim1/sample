/*
 * App URI: app/csr/stdCsrPMstRegCancel
 * Source Location: app/csr/stdCsrPMstRegCancel.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("app/csr/stdCsrPMstRegCancel", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			﻿//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
			/// <xtmlink path="./stdCsrPMstRegCancel.xtm"/>
			
			
			var stdCsrPMstRegCancel = function() {
				var moPage = new Page();
				//임포트용 데이터 통신 오브젝트
				var moPObject = new PObject();
			
				/**
				 * @desc onModelConstructDone 이벤트
				 * @param 
				 * @return void
				 * @author	 Choi In Seong 2016. 2. 2.
				 */
				moPage.onModelConstructDone_StdCsrPMstRegCancel = function() {
					//리피트 초기 설정
			//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
			//		ExtRepeat.init("frfCsrEnroll");
			
					//화면 온로드 서브미션 호출
					doOnLoad();
				};
				
				/**
				 * @desc 학적등록정보 조회
				 * @param
				 * @return void
				 * @author Choi In Seong 2016. 01. 12.
				 */
				function doOnLoad() {
					var voRegiObj = ExtPopUp.getParentVal("moRegiObj");
					// 부모멤버변수에담긴학번받음
			
					var vsStudId 			= voRegiObj["studId"];
					var vsStudNo 		= voRegiObj["studNo"];
					var vsHeaderStud 	= voRegiObj["headerStud"];
					
					util.DataMap.setValue(app, "dmReqKey", "strStudNo", vsStudNo);
					util.DataMap.setValue(app, "dmReqKey", "strStudInfo", vsHeaderStud);
					util.DataMap.setValue(app, "dmReqKey", "strStudId", vsStudId);
					
					// 등록정보에서 가져온 학번과 학생 정보 화면에 매핑 
					util.Control.setValue(app, "optStudNo", vsStudNo);
					util.Control.setValue(app, "optStud", vsHeaderStud);
					
					//키값에 매핑되는 학생의 등록정보 GET, 학년도 학기의 시작일 GET, 취소사유 List
					//등록정보 
					var vsEnrollDiv 		= voRegiObj["enrollDivRcd"];
					var vsSpDiv 			= voRegiObj["spDivRcd"];
					var vsRegStatRcd 	= voRegiObj["regStatRcd"];
					var vsSaCd 			= voRegiObj["saCd"];
					var vsSpCd 			= voRegiObj["spCd"];
					var vsProcDt 			= voRegiObj["procDt"];
					
					util.DataMap.setValue(app, "dmReqKey", "strStudId", vsStudId);
					util.DataMap.setValue(app, "dmReqKey", "strEnrollDivRcd", vsEnrollDiv);
					util.DataMap.setValue(app, "dmReqKey", "strSpDivRcd", vsSpDiv);
					util.DataMap.setValue(app, "dmReqKey", "strRegStatRcd", vsRegStatRcd);
					util.DataMap.setValue(app, "dmReqKey", "strSaCd", vsSaCd);
					util.DataMap.setValue(app, "dmReqKey", "strSpCd", vsSpCd);
					util.DataMap.setValue(app, "dmReqKey", "strProcDt", vsProcDt);
					
					//학년도 학기의 시작일 
					var vsYear 			= voRegiObj["schYearRcd"];
					var vsSmt 				= voRegiObj["smtRcd"];
					
					util.DataMap.setValue(app, "dmReqKey", "strSchYearRcd", vsYear);
					util.DataMap.setValue(app, "dmReqKey", "strSmtRcd", vsSmt);
					
					// onLoad submission call
					//strCommand: onLoad 
					util.Submit.send(app, "subOnLoad", function(pbSuccess) {
						if(pbSuccess){
							util.Control.redraw(app, ["frfCsrEnroll"]);
							
							var vsEnrollStat = util.FreeForm.getValue(app, "frfCsrEnroll", "REG_STAT_RCD");
							// 등록상태가 아니면 취소 불가
							if (vsEnrollStat != "CT109ENRO") {
								var vsEnrollStatNm =  NLS.CSR.M114; //등록
								var vsRegiCls = NLS.CSR.M054; //취소
								util.Msg.alert("NLS-CSR-M002", [vsEnrollStatNm, vsRegiCls]);
								ExtPopUp.closeLayeredPopup("onClick_BtnSearch");
							}
								
							// 종료일은 학년도학기의 시작일로 setting 
							var vsStDt = util.DataMap.getValue(app, "dmResOnLoad", "stDt");
							util.FreeForm.setValue(app, "frfCsrEnroll", "END_DT", vsStDt);
							
							// 등록상태를 취소로 setting
							util.FreeForm.setValue(app, "frfCsrEnroll", "REG_STAT_RCD", "CT109CANC");
							
							//취소TEXT세팅 
							var vsStatNm = page.doInitStatNm("CT109CANC");
							util.FreeForm.setValue(app, "frfCsrEnroll", "REG_STAT_NM", vsStatNm);
							
							// 2012.01.10 취소일자(CANCEL_DT)컬럼추가에 의한 로직 추가, 취소일은 현재일자로 setting 
							var vsCanDt = util.DataMap.getValue(app, "dmResOnLoad", "canDt");
							util.FreeForm.setValue(app, "frfCsrEnroll", "CANCEL_DT", vsCanDt);
							
							util.Control.redraw(app, ["cbbFrfEnrollCancelRsnRcd"]);
						} else {
							//2013.12.16. onLoad실패시 팝업닫기
							ExtModel.dispatch("btnCloseCancel", "DOMActivate");
						}
					});
				}
			
				/**
				 * @desc 등록취소코드 명 반환
				 * @param
				 * @return void
				 * @author Choi In Seong 2016. 01. 12.
				 */
				function doInitStatNm(psCd) {
					//등록상태 취소 초기값 세팅 
					var vnSize = util.DataSet.getRowCount(app, "dsStatList");
					var vsCdNm = "";
					if(vnSize>0){
						vsCdNm = ExtInstance.getValue("/root/resOnLoad/statList/row", "CD_NM", "child::CD ='"+psCd+"'");
					}
					return vsCdNm;
				};
				
				/**
				 * @desc 학적등록 저장
				 * @param 
				 * @return boolean
				 * @author Choi In Seong 2016. 2. 2.
				 */
				function doSave() {
					//strCommand: save 
					util.Submit.send(app, "subSave", function(pbSuccess) {
						if (pbSuccess) {
							// 저장완료시 성공이면, 팝업 닫고, 기본정보 Refresh.
							//팝업창 닫기
							ExtPopUp.closeLayeredPopup("doPopCallList");
						}
					});
				};
				
				
				/**
				 * @desc 학적등록 저장 버튼 event
				 * @param
				 * @return void
				 * @author Choi In Seong 2016. 2. 2.
				 */
				moPage.onClick_BtnSave = function() {
					
					// 리피터 변경사항 체크
					if(!util.Grid.isModified(app, ["frfCsrEnroll"], "MSG")){
						return false;
					}
					
					//리피트 validation check
					if(!util.validate(app, "frfCsrEnroll")){
						return false;
					}
					
					doSave();
				};
				
				/**
				 * @desc 선택닫기 버튼 클릭
				 * @param 
				 * @return void
				 * @author Choi In Seong 2016. 2. 2.
				 */
				moPage.onClick_BtnCloseOk = function() {
					doCloseOk();
				};
				
				/**
				 * @desc 헤더 온로드 실행
				 * @param 
				 * @return void
				 * @author Choi In Seong 2016. 2. 2.
				 */
				moPage.onLoadImportDone_ImpTitle = function() {
					doHeaderOnLoad();
				};
				
				/**
				 * @desc 화면닫기 버튼 클릭
				 * @param 
				 * @return void
				 * @author Choi In Seong 2016. 2. 2.
				 */
				moPage.onClick_BtnCloseCancel = function() {
					app.close();
				};
			
				return moPage;
			};;
			// End - User Script
			
			// Header
			var dataSet_1 = new cpr.data.DataSet("dsCsrEnroll");
			dataSet_1.parseData({
				"columns": [
					{"name": "SA_CD"},
					{"name": "SP_NM"},
					{"name": "SHREG_ALT_KEY"},
					{"name": "SP_DIV_NM"},
					{"name": "ENROLL_DIV_RCD"},
					{"name": "ENROLL_RSN_RCD"},
					{"name": "STUD_ID"},
					{"name": "SP_CD"},
					{"name": "ENROLL_CANCEL_RSN_RCD"},
					{"name": "SMT_RCD"},
					{"name": "ENROLL_RSN_NM"},
					{"name": "SMT_NM"},
					{"name": "CANCEL_DT"},
					{"name": "REG_STAT_RCD"},
					{"name": "OG_CD"},
					{"name": "ST_DT"},
					{"name": "UREF_KEY"},
					{"name": "END_DT"},
					{"name": "REF_KEY"},
					{"name": "REG_STAT_NM"},
					{"name": "ENROLL_DIV_NM"},
					{"name": "SCH_YEAR_NM"},
					{"name": "CUR_APLY_YEAR_RCD"},
					{"name": "OG_NM"},
					{"name": "SCH_YEAR_RCD"},
					{"name": "SP_DIV_RCD"},
					{"name": "PROC_DT"},
					{"name": "SA_NM"},
					{"name": "CUR_APLY_YEAR_NM"}
				],
				"rows": []
			});
			app.register(dataSet_1);
			
			var dataSet_2 = new cpr.data.DataSet("dsReasonList");
			dataSet_2.parseData({
				"columns": [
					{"name": "PRT_ORD"},
					{"name": "STD_YN"},
					{"name": "LAN_DIV_RCD"},
					{"name": "CD_NM"},
					{"name": "UCD"},
					{"name": "CD_LEN"},
					{"name": "CD_PRP1"},
					{"name": "ULAN_DIV_RCD"},
					{"name": "CD_PRP2"},
					{"name": "CD_PRP3"},
					{"name": "CD_DESC"},
					{"name": "UNIT_SYSTEM_RCD"},
					{"name": "EFFT_END_DT"},
					{"name": "CD_SHORT_NM"},
					{"name": "CD_CLS"},
					{"name": "CD"},
					{"name": "EFFT_ST_DT"}
				],
				"rows": []
			});
			app.register(dataSet_2);
			
			var dataSet_3 = new cpr.data.DataSet("dsStatList");
			dataSet_3.parseData({
				"columns": [
					{"name": "PRT_ORD"},
					{"name": "STD_YN"},
					{"name": "LAN_DIV_RCD"},
					{"name": "CD_NM"},
					{"name": "UCD"},
					{"name": "CD_LEN"},
					{"name": "CD_PRP1"},
					{"name": "ULAN_DIV_RCD"},
					{"name": "CD_PRP2"},
					{"name": "CD_PRP3"},
					{"name": "CD_DESC"},
					{"name": "UNIT_SYSTEM_RCD"},
					{"name": "EFFT_END_DT"},
					{"name": "CD_SHORT_NM"},
					{"name": "CD_CLS"},
					{"name": "CD"},
					{"name": "EFFT_ST_DT"}
				],
				"rows": []
			});
			app.register(dataSet_3);
			var dataMap_1 = new cpr.data.DataMap("dmReqKey");
			dataMap_1.parseData({
				"columns" : [
					{
						"name": "strStudId",
						"dataType": "string"
					},
					{
						"name": "strEnrollDivRcd",
						"dataType": "string"
					},
					{
						"name": "strSchYearRcd",
						"dataType": "string"
					},
					{
						"name": "strSaCd",
						"dataType": "string"
					},
					{
						"name": "strProcDt",
						"dataType": "string"
					},
					{
						"name": "strSmtRcd",
						"dataType": "string"
					},
					{
						"name": "strSpDivRcd",
						"dataType": "string"
					},
					{
						"name": "strSpCd",
						"dataType": "string"
					},
					{
						"name": "strRegStatRcd",
						"dataType": "string"
					},
					{
						"name": "strStudNo",
						"dataType": "string"
					},
					{
						"name": "strStudInfo",
						"dataType": "string"
					},
					{
						"name": "strStudViewId",
						"dataType": "string"
					}
				]
			});
			app.register(dataMap_1);
			
			var dataMap_2 = new cpr.data.DataMap("dmResOnLoad");
			dataMap_2.parseData({
				"columns" : [
					{
						"name": "stDt",
						"dataType": "string"
					},
					{
						"name": "canDt",
						"dataType": "string"
					}
				]
			});
			app.register(dataMap_2);
			var submission_1 = new cpr.protocols.Submission("subOnLoad");
			submission_1.action = "/csr/StdCsrMstRegCancel/";
			submission_1.mediaType = "application/x-www-form-urlencoded";
			submission_1.addRequestData(dataMap_1);
			submission_1.addResponseData(dataMap_2, false);
			submission_1.addResponseData(dataSet_2, false);
			submission_1.addResponseData(dataSet_3, false);
			submission_1.addResponseData(dataSet_1, false);
			app.register(submission_1);
			
			var submission_2 = new cpr.protocols.Submission("subSave");
			submission_2.action = "/csr/StdCsrMstRegCancel/";
			submission_2.mediaType = "application/x-www-form-urlencoded";
			app.register(submission_2);
			
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
			var group_1 = new cpr.controls.Container("grp_frfCsrEnroll");
			// Layout
			var xYLayout_2 = new cpr.controls.layouts.XYLayout();
			group_1.setLayout(xYLayout_2);
			(function(container){
				var group_2 = new cpr.controls.Container("frfCsrEnroll");
				group_2.style.setClasses(["form-box"]);
				// Layout
				var xYLayout_3 = new cpr.controls.layouts.XYLayout();
				group_2.setLayout(xYLayout_3);
				(function(container){
					var output_1 = new cpr.controls.Output("optSaNm");
					output_1.value = "";
					output_1.bind("value").toLanguage("UI-GLS-SA");
					container.addChild(output_1, {
						"top": "55px",
						"left": "5px",
						"width": "115px",
						"height": "25px"
					});
					var output_2 = new cpr.controls.Output("optFrfSchYearRcd");
					output_2.value = "";
					output_2.bind("value").toLanguage("UI-GLS-SCH_YEAR");
					container.addChild(output_2, {
						"top": "5px",
						"left": "5px",
						"width": "115px",
						"height": "25px"
					});
					var output_3 = new cpr.controls.Output("optFrfEnrollDivRcd");
					output_3.value = "";
					output_3.bind("value").toLanguage("UI-SCR-SCREGDIV");
					container.addChild(output_3, {
						"top": "30px",
						"left": "5px",
						"width": "115px",
						"height": "25px"
					});
					var output_4 = new cpr.controls.Output("optFrfEnrollRsnRcd");
					output_4.value = "";
					output_4.bind("value").toLanguage("UI-SCR-SCHREGRSN");
					container.addChild(output_4, {
						"top": "105px",
						"left": "5px",
						"width": "115px",
						"height": "25px"
					});
					var output_5 = new cpr.controls.Output("optFrfCurAplyYearRcd");
					output_5.value = "";
					output_5.bind("value").toLanguage("UI-SCR-SUBPROCYRS");
					container.addChild(output_5, {
						"top": "105px",
						"left": "285px",
						"width": "120px",
						"height": "25px"
					});
					var output_6 = new cpr.controls.Output("optFrfStDt");
					output_6.value = "";
					output_6.bind("value").toLanguage("UI-SCR-EFETSTDT");
					container.addChild(output_6, {
						"top": "130px",
						"left": "5px",
						"width": "115px",
						"height": "25px"
					});
					var output_7 = new cpr.controls.Output("optFrfOgCdNm");
					output_7.value = "";
					output_7.bind("value").toLanguage("UI-GLS-OG");
					container.addChild(output_7, {
						"top": "155px",
						"left": "5px",
						"width": "115px",
						"height": "25px"
					});
					var output_8 = new cpr.controls.Output("optFrfSmtRcd");
					output_8.value = "";
					output_8.bind("value").toLanguage("UI-GLS-SMT");
					container.addChild(output_8, {
						"top": "5px",
						"left": "285px",
						"width": "120px",
						"height": "25px"
					});
					var output_9 = new cpr.controls.Output("optFrfSpDivRcd");
					output_9.value = "";
					output_9.bind("value").toLanguage("UI-SCR-SPCORSDIV");
					container.addChild(output_9, {
						"top": "30px",
						"left": "285px",
						"width": "120px",
						"height": "25px"
					});
					var output_10 = new cpr.controls.Output("optFrfSpCd");
					output_10.value = "";
					output_10.bind("value").toLanguage("UI-GLS-SP");
					container.addChild(output_10, {
						"top": "80px",
						"left": "5px",
						"width": "115px",
						"height": "25px"
					});
					var output_11 = new cpr.controls.Output("optFrfEndDt");
					output_11.value = "";
					output_11.bind("value").toLanguage("UI-SCR-EFETEDDT");
					container.addChild(output_11, {
						"top": "130px",
						"left": "285px",
						"width": "120px",
						"height": "25px"
					});
					var inputBox_1 = new cpr.controls.InputBox("ipbFrfSaCd");
					inputBox_1.visible = false;
					inputBox_1.bind("fieldLabel").toExpression("#optSaNm.value");
					inputBox_1.bind("value").toDataMap(app.lookup("dmRow"), "SA_CD");
					container.addChild(inputBox_1, {
						"top": "60px",
						"left": "565px",
						"width": "10px",
						"height": "25px"
					});
					var inputBox_2 = new cpr.controls.InputBox("ipbFrfStudId");
					inputBox_2.visible = false;
					inputBox_2.bind("value").toDataMap(app.lookup("dmRow"), "STUD_ID");
					container.addChild(inputBox_2, {
						"top": "130px",
						"left": "500px",
						"width": "10px",
						"height": "25px"
					});
					var inputBox_3 = new cpr.controls.InputBox("ipbFrfOgCd");
					inputBox_3.visible = false;
					inputBox_3.bind("value").toDataMap(app.lookup("dmRow"), "OG_CD");
					container.addChild(inputBox_3, {
						"top": "130px",
						"left": "515px",
						"width": "10px",
						"height": "25px"
					});
					var output_12 = new cpr.controls.Output("optFrfSchYearRcd");
					output_12.value = "";
					output_12.bind("value").toDataMap(app.lookup("dmRow"), "SCH_YEAR_NM");
					container.addChild(output_12, {
						"top": "5px",
						"left": "125px",
						"width": "150px",
						"height": "25px"
					});
					var output_13 = new cpr.controls.Output("optFrfEnrollDivRcd");
					output_13.value = "";
					output_13.bind("value").toDataMap(app.lookup("dmRow"), "ENROLL_DIV_NM");
					container.addChild(output_13, {
						"top": "30px",
						"left": "125px",
						"width": "150px",
						"height": "25px"
					});
					var output_14 = new cpr.controls.Output("optSaNm");
					output_14.value = "";
					output_14.bind("value").toDataMap(app.lookup("dmRow"), "SA_NM");
					container.addChild(output_14, {
						"top": "55px",
						"left": "125px",
						"width": "450px",
						"height": "25px"
					});
					var output_15 = new cpr.controls.Output("optFrfSmtRcd");
					output_15.value = "";
					output_15.bind("value").toDataMap(app.lookup("dmRow"), "SMT_NM");
					container.addChild(output_15, {
						"top": "5px",
						"left": "410px",
						"width": "165px",
						"height": "25px"
					});
					var output_16 = new cpr.controls.Output("optFrfSpDivRcd");
					output_16.value = "";
					output_16.bind("value").toDataMap(app.lookup("dmRow"), "SP_DIV_NM");
					container.addChild(output_16, {
						"top": "30px",
						"left": "410px",
						"width": "165px",
						"height": "25px"
					});
					var output_17 = new cpr.controls.Output("optFrfSpCd");
					output_17.value = "";
					output_17.bind("value").toDataMap(app.lookup("dmRow"), "SP_NM");
					container.addChild(output_17, {
						"top": "80px",
						"left": "125px",
						"width": "450px",
						"height": "25px"
					});
					var output_18 = new cpr.controls.Output("optFrfEnrollRsnRcd");
					output_18.value = "";
					output_18.bind("value").toDataMap(app.lookup("dmRow"), "ENROLL_RSN_NM");
					container.addChild(output_18, {
						"top": "105px",
						"left": "125px",
						"width": "150px",
						"height": "25px"
					});
					var output_19 = new cpr.controls.Output("optFrfCurAplyYearRcd");
					output_19.value = "";
					output_19.bind("value").toDataMap(app.lookup("dmRow"), "CUR_APLY_YEAR_NM");
					container.addChild(output_19, {
						"top": "105px",
						"left": "410px",
						"width": "165px",
						"height": "25px"
					});
					var output_20 = new cpr.controls.Output("optFrfStDt");
					output_20.value = "";
					output_20.dataType = "date";
					output_20.format = "YYYY-MM-DD";
					output_20.bind("value").toDataMap(app.lookup("dmRow"), "ST_DT");
					container.addChild(output_20, {
						"top": "130px",
						"left": "125px",
						"width": "70px",
						"height": "25px"
					});
					var output_21 = new cpr.controls.Output("optFrfEndDt");
					output_21.value = "";
					output_21.dataType = "date";
					output_21.format = "YYYY-MM-DD";
					output_21.bind("value").toDataMap(app.lookup("dmRow"), "END_DT");
					container.addChild(output_21, {
						"top": "130px",
						"left": "410px",
						"width": "70px",
						"height": "25px"
					});
					var output_22 = new cpr.controls.Output("optFrfOgCdNm");
					output_22.value = "";
					output_22.bind("value").toDataMap(app.lookup("dmRow"), "OG_NM");
					container.addChild(output_22, {
						"top": "155px",
						"left": "125px",
						"width": "150px",
						"height": "25px"
					});
					var output_23 = new cpr.controls.Output("optFrfRegStatNm");
					output_23.value = "";
					output_23.bind("value").toLanguage("UI-SCR-REGSTATU");
					container.addChild(output_23, {
						"top": "155px",
						"left": "285px",
						"width": "120px",
						"height": "25px"
					});
					var output_24 = new cpr.controls.Output("optFrfRegStatNm");
					output_24.value = "";
					output_24.bind("value").toDataMap(app.lookup("dmRow"), "REG_STAT_NM");
					container.addChild(output_24, {
						"top": "155px",
						"left": "410px",
						"width": "165px",
						"height": "25px"
					});
					var output_25 = new cpr.controls.Output("optFrfEnrollCancelRsnRcd");
					output_25.value = "";
					output_25.style.setClasses(["require"]);
					output_25.bind("value").toLanguage("UI-SCR-SCREGCACLRS");
					container.addChild(output_25, {
						"top": "180px",
						"left": "5px",
						"width": "115px",
						"height": "25px"
					});
					var comboBox_1 = new cpr.controls.ComboBox("cbbFrfEnrollCancelRsnRcd");
					comboBox_1.userAttr({"require": "Y"});
					comboBox_1.bind("fieldLabel").toExpression("#optFrfEnrollCancelRsnRcd.value");
					comboBox_1.bind("value").toDataMap(app.lookup("dmRow"), "ENROLL_CANCEL_RSN_RCD");
					(function(comboBox_1){
						comboBox_1.setItemSet(app.lookup("dsReasonList"), {
							"label": "CD_NM",
							"value": "CD"
						});
					})(comboBox_1);
					container.addChild(comboBox_1, {
						"top": "180px",
						"left": "125px",
						"width": "150px",
						"height": "25px"
					});
					var output_26 = new cpr.controls.Output("optFrfCancelDt");
					output_26.value = "";
					output_26.style.setClasses(["require"]);
					output_26.bind("value").toLanguage("UI-SCR-SCHREGRSN");
					container.addChild(output_26, {
						"top": "180px",
						"left": "285px",
						"width": "120px",
						"height": "25px"
					});
					var dateInput_1 = new cpr.controls.DateInput("iptFrfCancelDt");
					dateInput_1.userAttr({"require": "Y"});
					dateInput_1.bind("fieldLabel").toExpression("#optFrfCancelDt.value");
					dateInput_1.bind("value").toDataMap(app.lookup("dmRow"), "CANCEL_DT");
					container.addChild(dateInput_1, {
						"top": "180px",
						"left": "410px",
						"width": "90px",
						"height": "25px"
					});
					var inputBox_4 = new cpr.controls.InputBox("iptFrfRegStatRcd");
					inputBox_4.visible = false;
					inputBox_4.bind("value").toDataMap(app.lookup("dmRow"), "REG_STAT_RCD");
					container.addChild(inputBox_4, {
						"top": "130px",
						"left": "530px",
						"width": "10px",
						"height": "25px"
					});
				})(group_2);
				container.addChild(group_2, {
					"top": "90px",
					"left": "5px",
					"width": "580px",
					"height": "205px"
				});
				var userDefinedControl_1 = linker.userDefinedControl_1 = new udc.com.comTitle();
				userDefinedControl_1.ctrl = app.lookup("grdCsrEnroll");
				userDefinedControl_1.bind("title").toLanguage("UI-SCR-STUDTINFO");
				container.addChild(userDefinedControl_1, {
					"top": "65px",
					"left": "5px",
					"width": "285px",
					"height": "25px"
				});
				var group_3 = new cpr.controls.Container("frfStudInfo");
				group_3.style.setClasses(["form-box"]);
				// Layout
				var xYLayout_4 = new cpr.controls.layouts.XYLayout();
				group_3.setLayout(xYLayout_4);
				(function(container){
					var output_27 = new cpr.controls.Output("optStud");
					output_27.value = "";
					output_27.bind("value").toDataMap(app.lookup("dmReqKey"), "strStudInfo");
					container.addChild(output_27, {
						"top": "30px",
						"left": "125px",
						"width": "450px",
						"height": "25px"
					});
					var output_28 = new cpr.controls.Output("optStudNm");
					output_28.value = "";
					output_28.bind("value").toLanguage("UI-GLS-PER_NM");
					container.addChild(output_28, {
						"top": "30px",
						"left": "5px",
						"width": "115px",
						"height": "25px"
					});
					var output_29 = new cpr.controls.Output("optStudNo");
					output_29.value = "";
					output_29.bind("value").toLanguage("UI-GLS-STUD_ID");
					container.addChild(output_29, {
						"top": "5px",
						"left": "5px",
						"width": "115px",
						"height": "25px"
					});
					var output_30 = new cpr.controls.Output("optStudNo");
					output_30.value = "";
					output_30.bind("value").toDataMap(app.lookup("dmReqKey"), "strStudNo");
					container.addChild(output_30, {
						"top": "5px",
						"left": "125px",
						"width": "450px",
						"height": "25px"
					});
				})(group_3);
				container.addChild(group_3, {
					"top": "5px",
					"left": "5px",
					"width": "580px",
					"height": "55px"
				});
			})(group_1);
			container.addChild(group_1, {
				"top": "35px",
				"left": "5px",
				"width": "590px",
				"height": "300px"
			});
			
			var button_1 = new cpr.controls.Button("btnCloseCancel");
			button_1.value = "";
			button_1.bind("value").toLanguage("UI-SCR-SCRNCLS");
			if(typeof onBtnCloseCancelClick == "function") {
				button_1.addEventListener("click", onBtnCloseCancelClick);
			}
			container.addChild(button_1, {
				"top": "340px",
				"left": "5px",
				"width": "60px",
				"height": "25px"
			});
			
			var userDefinedControl_2 = new udc.com.appHeader("appheader1");
			container.addChild(userDefinedControl_2, {
				"top": "5px",
				"right": "5px",
				"left": "5px",
				"height": "25px"
			});
			
			var button_2 = new cpr.controls.Button("btnSave");
			button_2.value = "";
			button_2.style.setClasses(["btn-save"]);
			button_2.bind("value").toLanguage("UI-SCR-WRKSAVE");
			if(typeof onBtnSaveClick == "function") {
				button_2.addEventListener("click", onBtnSaveClick);
			}
			container.addChild(button_2, {
				"top": "340px",
				"left": "530px",
				"width": "65px",
				"height": "25px"
			});
			if(typeof onBodyLoad == "function"){
				app.addEventListener("load", onBodyLoad);
			}
		}
	});
	app.title = "등록취소";
	cpr.core.Platform.INSTANCE.register(app);
})();