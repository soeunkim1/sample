/*
 * App URI: app/csr/extCsrSAtteStatByProCenter
 * Source Location: app/csr/extCsrSAtteStatByProCenter.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("app/csr/extCsrSAtteStatByProCenter", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			﻿//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
			///<xtmlink path="./extCsrSAtteStatByProCenter.xtm"/>
			
			var extCsrSAtteStatByProCenter = function() {
			
				var moPage = new Page();
				//임포트용 데이터 통신 오브젝트
				var moPObject = new PObject();
			
				/**
				 * @desc  Header Import onLoad
				 * @return void
			     * @author Sunyoung,PARK at 2016.12.21
			     */
				moPage.onLoadImportDone_ImpTitle = function() {
					doHeaderOnLoad();
				};
			
			
				/******************************************************************************************************
				 *  객체검색팝업 관련 설정사항
				 *  ▶ 설정가능 유형
				 *      1. 인스턴스
				 *      2. 리피트 디테일 셀 ID
				 *      3. 컨트롤 ID
				 *  ▶ 각 변수별 설명
				 *      iXXX : 팝업에 전달될  input 파라미터
				 *      oXXX : 팝업에서 선택한 값을 받을 데이터
				 *  	1. controlId 		: 최초 이벤트의 버튼이나 그리드 id             (필수)
				 *  	2. iCd 				: 검색조건 부서코드                                 (선택) 
				 *  	3. iNm 				: 검색조건 부서명									(선택)	
				 *  	4. iObjDivRcd 	: 검색될 객체구분코드 종류						(필수)
				 *								  (CC009OG : "행정부서", CC009SA : "학사부서", CC009SP : "이수과정", CC009CU : "교과그룹", CC009OT : "외부부서")
				 *  	5. iStartObject 	: 검색시작부서 										(선택)
				 *								  ("CC009OG20000,CC009OG70000",) 
				 *		6. iOtDivRcd 		: 외부부서구분코드 									(선택)
				 *								  (외부부서[CC009OT]일때 사용) ("CB008UNIV, CB008HSCL")
				 *		7. iOtIsTreeView	: 트리보이기 유무 									(선택)
				 *								  default : N (외부부서[CC009OT]일때 사용) "Y" 
				 *  	8. iLanDivRcd 	: 언어키													(선택)
				 *  	9. iKeyDate 		: 기준일													(필수)
				 *  	10. oObjDivRcd 	: 객체구분코드 
				 *  	11. oCd 			: 부서코드
				 *  	12. oCdNm 		: 부서명
				 *  	13. oBegDt 		: 시작일
				 *  	14. oEndDt 		: 종료일
				 *  	15. oLanDivRcd 	: 언어키
				 *  	16. func 			: 팝업에서 선택한 값을 받은 후 추가 로직이 필요한 경우 함수
				 *									  
				 *******************************************************************************************************/	
				moPObject.moIdsForStdCmnPObjSch = [
					{   //교직원검색 조회조건 행정부서
						controlId			:	"btnPopSearch",
						iCd					:	"",
						iNm					:	"ipbDeptNm",
						iObjDivRcd			:	["CC009SA", "CC009OG"],
						iStartObject    	:   "",
						iOtDivRcd			:	"",
						iOtIsTreeView	:	"",
						iLanDivRcd		:	"",
						iKeyDate			:	"/root/reqList/strKeyDate",
						iKeyEndDate		:	"",
						oObjDivRcd		:	"/root/reqList/strObjDivRcd",
						oCd					:	"/root/reqList/strDeptCd",
						oCdNm				:	"ipbDeptNm",
						oBegDt				:	"",
						oEndDt				:	"",
						oLanDivRcd		:	"",
						func 					:  null
					}
				];
			
			
							
				/**
				 * @desc 
				 * @return 
				 * @author Sunyoung,PARK 2016.12.21
				 */
				moPage.onModelConstructDone_extCsrSAtteStatByProCenter = function() {
			
					//리피트 초기 설정
			//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
			//		ExtRepeat.init("rptExtCsrList");
					//검색조건 초기 설정
			//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
			//		ExtGroup.initSearchBox("grpSearch", "grpData");
					//서브미션 실행 (실패시 cover page)
					//strCommand: onLoad 
					util.Submit.send(app, "subOnLoad", function(pbSuccess){
						if(pbSuccess){
							
							util.DataMap.setValue(app, "dmReqList", "strSchYearRcd", util.DataMap.getValue(app, "dmResOnLoad", "strSchYearRcd"));
							util.DataMap.setValue(app, "dmReqList", "strKeyDate", util.DataMap.getValue(app, "dmResOnLoad", "strCutDt"));
							util.Control.redraw(app, ["dipKeyDate", "cbbSchYearRcd", "cbbClassRcd", "cbbAbsRsnRcd","cbbInvitPrdRcd","cbbEntrSeltRcd","cbbDayNightRcd","cbbPrtDiv","cbbGenderRcd"]);
						}
					});
				}
			
			
			   /**
				 * @desc
				 *
				 * @return void
				 * @author Sunyoung,PARK 2016.12.21
				 */
				moPage.onClick_BtnSearch = function() {
					 //작업영역 리피트 변경 내역 체크
					if(util.Grid.isModified(app, "", "CRM")){
						return false;
					}
					var vsExcelYn = util.Control.getValue(app, "cbbPrtDiv");
					
					if (vsExcelYn =="Y") {
						util.coverPage(app);
						doExcelList(function(pbsuccess){
							// 조회 : "조회되었습니다." header 메세지 표시
							if (pbSuccess) util.Msg.notify(app, "NLS.INF.M024");
						});
						util.removeCover(app);
					}else {
						doList(function(pbSuccess) {
							// 조회 : "조회되었습니다." header 메세지 표시
							if (pbSuccess) util.Msg.notify(app, "NLS.INF.M024");
						});
					}
				};
			
				/**
				 * @desc 재학생현황 
				 * @param 
				 * @return 
				 * @author Sunyoung,PARK  2016.12.21
				 */
				function doList(poCallBackFunc) {
			
					//strCommand: list 
					util.Submit.send(app, "subList", function(pbSuccess){
						if(pbSuccess){
							util.Control.redraw(app, "grdExtCsrList");
							// 조회 후 콜백함수 수행
							if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
						}
					});
				}
				
				
				/**
				 * @desc  재학생 현황- 명단 (엑셀다운로드 )
				 * @param 
				 * @return 
				 * @author Sunyoung,PARK  2016.12.22
				 */
				function doExcelList(poCallBackFunc) {
					
					//1.조회조건 필수 체크(학년도)
					if(!util.validate(app, ["grpSearch"])) return false;
							
						//strCommand: exportExcel 
						util.Submit.send(app, "subExportExcel", function(pbSuccess){
						if(pbSuccess){
							
								//파일디렉토리경로
								var vsFileDir = util.DataMap.getValue(app, "dmFileInfo", "strFileDir");
								//파일명
								var vsOriFileNm = util.DataMap.getValue(app, "dmFileInfo", "strFileNm");
								//변환파일명(실제 서버에 저장된 파일명)
								var vsFileChgNm = util.DataMap.getValue(app, "dmFileInfo", "strFileChgNm");
								var vsTmpFilePath	= util.DataMap.getValue(app, "dmFileInfo", "strTmpFilePath");
								var voParam = {
											"strFileSubPath" : "",
											"strFileNm" : "",
											"strOriFileNm" : vsOriFileNm,
											"strTmpFilePath" : vsTmpFilePath,
											"strCommand" : "fileDownLoad"
								}
								
								//다운로드 받을 파일 위치, 다운로드받을 파일이름, 프로그래스동작여부(일단 ""), actionUrl
								FileUtil.downloadFile( "/std.cmn.StdCmnFileTransUtil.ex",voParam);		
							}
							
						});
					
			
				}
			
				
				moPage.onClick_BtnPopSearch = function(sender) {
					// 기준일자 체크
					var vsKeyDate = util.Control.getValue(app, "dipKeyDate");
					var vsTitle = ExtControl.getTextValue("lblKeyDate");
					if (ValueUtil.isNull(vsKeyDate)) {
						util.Control.setValue(app, "ipbDeptNm", "");
						util.Control.setValue(app, "ipbDeptCd", "");
						//기준일자를 입력하여 주십시오.
						util.Msg.alert("NLS-CSR-M121",[vsTitle]);
						return;
					}
					doOnClickStdCmnPObjSch(sender);
				}
				
				moPage.onValueChanged_IpbDeptNm = function(sender) {
					// 기준일자 체크
					var vsKeyDate = util.Control.getValue(app, "dipKeyDate");
					var vsTitle = ExtControl.getTextValue("lblKeyDate");
					if (ValueUtil.isNull(vsKeyDate)) {
						util.Control.setValue(app, "ipbDeptNm", "");
						util.Control.setValue(app, "ipbDeptCd", "");
						//기준일자를 입력하여 주십시오.
						util.Msg.alert("NLS-CSR-M121",[vsTitle]);
						return;
					}
					
					doOnChangeStdCmnPObjSch(sender);
				}
				
				
				
				/**
				 * @desc 소속 권한 처리
				 * @param 
				 * @return void
				 * @author Choi In Seong 2016. 5. 10
				 */	
				moPage.onLoadImportDone_ImpStdCmnPobjSch = function() {
					setStdCmnPObjSchObjInfo();
				}
				
				
				
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
			
			var dataSet_2 = new cpr.data.DataSet("dsGenderRcdList");
			dataSet_2.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_2);
			
			var dataSet_3 = new cpr.data.DataSet("dsAbsRsnRcdList");
			dataSet_3.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_3);
			
			var dataSet_4 = new cpr.data.DataSet("dsInvitPrdRcdList");
			dataSet_4.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_4);
			
			var dataSet_5 = new cpr.data.DataSet("dsEntrSeltRcdList");
			dataSet_5.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_5);
			
			var dataSet_6 = new cpr.data.DataSet("dsDayNightRcdList");
			dataSet_6.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_6);
			
			var dataSet_7 = new cpr.data.DataSet("dsClassRcdList");
			dataSet_7.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_7);
			
			var dataSet_8 = new cpr.data.DataSet("dsCsrShreg");
			dataSet_8.parseData({
				"columns": [
					{"name": "OG_NM"},
					{"name": "DAY_NIGHT_DIV_NM"},
					{"name": "SHYR"},
					{"name": "CLASS_NM"},
					{"name": "ATTE_NOP"},
					{"name": "GENDER_NM"},
					{"name": "GENDER_NOP"},
					{"name": "ABS_CNT1"},
					{"name": "ABS_CNT2"},
					{"name": "ABS_CNT3"},
					{"name": "PRD_CNT1"},
					{"name": "PRD_CNT2"},
					{"name": "SELT_CNT1"},
					{"name": "SELT_CNT2"},
					{"name": "SELT_CNT3"},
					{"name": "INVW_TGT"},
					{"name": "CHAN_HOPE"},
					{"name": "CHAN_TGT"},
					{"name": "REMO_CNT1"},
					{"name": "REMO_CNT2"},
					{"name": "REMO_CNT3"},
					{"name": "STUD_SATIS_RATE"},
					{"name": "PRD_CNT3"}
				],
				"rows": []
			});
			app.register(dataSet_8);
			var dataMap_1 = new cpr.data.DataMap("dmResOnLoad");
			dataMap_1.parseData({
				"columns" : [
					{
						"name": "strCutDt",
						"dataType": "string"
					},
					{
						"name": "strSchYearRcd",
						"dataType": "string"
					}
				]
			});
			app.register(dataMap_1);
			
			var dataMap_2 = new cpr.data.DataMap("dmReqList");
			dataMap_2.parseData({
				"columns" : [
					{
						"name": "strSchYearRcd",
						"dataType": "string"
					},
					{
						"name": "strMonth",
						"dataType": "string"
					},
					{
						"name": "strDeptCd",
						"dataType": "string"
					},
					{
						"name": "strShyr",
						"dataType": "string"
					},
					{
						"name": "strClassRcd",
						"dataType": "string"
					},
					{
						"name": "strGenderRcd",
						"dataType": "string"
					},
					{
						"name": "strAbsRsnRcdByAtte",
						"dataType": "string"
					},
					{
						"name": "strInvitPrdRcd",
						"dataType": "string"
					},
					{
						"name": "strEntrSeltRcd",
						"dataType": "string"
					},
					{
						"name": "strDayNightRcd",
						"dataType": "string"
					},
					{
						"name": "strKeyDate",
						"dataType": "string"
					},
					{
						"name": "strStudListYN",
						"dataType": "string"
					},
					{
						"name": "strObjDivRcd",
						"dataType": "string"
					},
					{
						"name": "strDeptNm",
						"dataType": "string"
					}
				]
			});
			app.register(dataMap_2);
			
			var dataMap_3 = new cpr.data.DataMap("dmFileInfo");
			dataMap_3.parseData({
				"columns" : [
					{
						"name": "strFileDir",
						"dataType": "string"
					},
					{
						"name": "strFileNm",
						"dataType": "string"
					},
					{
						"name": "strFileChgNm",
						"dataType": "string"
					},
					{
						"name": "strTmpFilePath",
						"dataType": "string"
					}
				]
			});
			app.register(dataMap_3);
			var submission_1 = new cpr.protocols.Submission("subOnLoad");
			submission_1.action = "/csr/ExtCsrAtteStatByProCenter/";
			submission_1.mediaType = "application/x-www-form-urlencoded";
			submission_1.addResponseData(dataSet_7, false);
			submission_1.addResponseData(dataSet_2, false);
			submission_1.addResponseData(dataSet_4, false);
			submission_1.addResponseData(dataSet_5, false);
			submission_1.addResponseData(dataSet_6, false);
			submission_1.addResponseData(dataSet_3, false);
			submission_1.addResponseData(dataMap_1, false);
			submission_1.addResponseData(dataSet_1, false);
			app.register(submission_1);
			
			var submission_2 = new cpr.protocols.Submission("subList");
			submission_2.action = "/csr/ExtCsrAtteStatByProCenter/";
			submission_2.mediaType = "application/x-www-form-urlencoded";
			submission_2.addRequestData(dataMap_2);
			submission_2.addResponseData(dataSet_8, false);
			app.register(submission_2);
			
			var submission_3 = new cpr.protocols.Submission("subExportExcel");
			submission_3.action = "/csr/ExtCsrAtteStatByProCenter/";
			submission_3.mediaType = "application/x-www-form-urlencoded";
			submission_3.addRequestData(dataMap_2);
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
			var userDefinedControl_1 = new udc.com.appHeader("appheader1");
			container.addChild(userDefinedControl_1, {
				"top": "5px",
				"right": "5px",
				"left": "5px",
				"height": "25px"
			});
			
			var group_1 = new cpr.controls.Container("grpSearch");
			group_1.style.setClasses(["search-box"]);
			// Layout
			var xYLayout_2 = new cpr.controls.layouts.XYLayout();
			group_1.setLayout(xYLayout_2);
			(function(container){
				var button_1 = new cpr.controls.Button("btnSearch");
				button_1.value = "조회";
				button_1.style.setClasses(["btn-search"]);
				if(typeof onBtnSearchClick == "function") {
					button_1.addEventListener("click", onBtnSearchClick);
				}
				container.addChild(button_1, {
					"top": "6px",
					"left": "1155px",
					"width": "60px",
					"height": "25px"
				});
				var output_1 = new cpr.controls.Output("optSchYearRcd");
				output_1.value = "학년도";
				output_1.style.setClasses(["require"]);
				container.addChild(output_1, {
					"top": "5px",
					"left": "5px",
					"width": "100px",
					"height": "25px"
				});
				var comboBox_1 = new cpr.controls.ComboBox("cbbSchYearRcd");
				comboBox_1.userAttr({"require": "Y"});
				comboBox_1.bind("fieldLabel").toExpression("#optSchYearRcd.value");
				comboBox_1.bind("value").toDataMap(app.lookup("dmReqList"), "strSchYearRcd");
				(function(comboBox_1){
					comboBox_1.setItemSet(app.lookup("dsSchYearRcdList"), {
						"label": "CD_NM",
						"value": "CD"
					});
				})(comboBox_1);
				container.addChild(comboBox_1, {
					"top": "5px",
					"left": "110px",
					"width": "85px",
					"height": "25px"
				});
				var output_2 = new cpr.controls.Output("optMonth");
				output_2.value = "월";
				container.addChild(output_2, {
					"top": "5px",
					"left": "200px",
					"width": "45px",
					"height": "25px"
				});
				var output_3 = new cpr.controls.Output("optObjSch");
				output_3.value = "소속";
				output_3.style.setClasses(["require"]);
				container.addChild(output_3, {
					"top": "5px",
					"left": "308px",
					"width": "70px",
					"height": "25px"
				});
				var output_4 = new cpr.controls.Output("optShyr");
				output_4.value = "학년";
				container.addChild(output_4, {
					"top": "5px",
					"left": "620px",
					"width": "70px",
					"height": "25px"
				});
				var inputBox_1 = new cpr.controls.InputBox("ipbShyr");
				inputBox_1.bind("fieldLabel").toExpression("#optShyr.value");
				inputBox_1.bind("value").toDataMap(app.lookup("dmReqList"), "strShyr");
				container.addChild(inputBox_1, {
					"top": "5px",
					"left": "695px",
					"width": "40px",
					"height": "25px"
				});
				var output_5 = new cpr.controls.Output("optClassRcd");
				output_5.value = "반";
				container.addChild(output_5, {
					"top": "5px",
					"left": "740px",
					"width": "70px",
					"height": "25px"
				});
				var comboBox_2 = new cpr.controls.ComboBox("cbbClassRcd");
				comboBox_2.bind("fieldLabel").toExpression("#optClassRcd.value");
				comboBox_2.bind("value").toDataMap(app.lookup("dmReqList"), "strClassRcd");
				(function(comboBox_2){
					comboBox_2.addItem(new cpr.controls.Item("전체", ""));
					comboBox_2.setItemSet(app.lookup("dsClassRcdList"), {
						"label": "CD_NM",
						"value": "CD"
					});
				})(comboBox_2);
				container.addChild(comboBox_2, {
					"top": "5px",
					"left": "815px",
					"width": "70px",
					"height": "25px"
				});
				var output_6 = new cpr.controls.Output("optGenderRcd");
				output_6.value = "남/녀";
				container.addChild(output_6, {
					"top": "5px",
					"left": "889px",
					"width": "70px",
					"height": "25px"
				});
				var comboBox_3 = new cpr.controls.ComboBox("cbbGenderRcd");
				comboBox_3.bind("fieldLabel").toExpression("#optGenderRcd.value");
				comboBox_3.bind("value").toDataMap(app.lookup("dmReqList"), "strGenderRcd");
				(function(comboBox_3){
					comboBox_3.addItem(new cpr.controls.Item("전체", ""));
					comboBox_3.setItemSet(app.lookup("dsGenderRcdList"), {
						"label": "CD_NM",
						"value": "CD"
					});
				})(comboBox_3);
				container.addChild(comboBox_3, {
					"top": "5px",
					"left": "964px",
					"width": "70px",
					"height": "25px"
				});
				var output_7 = new cpr.controls.Output("optAbsRsnRcd");
				output_7.value = "휴학유형";
				container.addChild(output_7, {
					"top": "30px",
					"left": "5px",
					"width": "100px",
					"height": "25px"
				});
				var comboBox_4 = new cpr.controls.ComboBox("cbbAbsRsnRcd");
				comboBox_4.bind("fieldLabel").toExpression("#optAbsRsnRcd.value");
				comboBox_4.bind("value").toDataMap(app.lookup("dmReqList"), "strAbsRsnRcdByAtte");
				(function(comboBox_4){
					comboBox_4.addItem(new cpr.controls.Item("전체", ""));
					comboBox_4.setItemSet(app.lookup("dsAbsRsnRcdList"), {
						"label": "CD_NM",
						"value": "CD"
					});
				})(comboBox_4);
				container.addChild(comboBox_4, {
					"top": "30px",
					"left": "110px",
					"width": "100px",
					"height": "25px"
				});
				var output_8 = new cpr.controls.Output("optInvitPrdRcd");
				output_8.value = "모집유형";
				container.addChild(output_8, {
					"top": "30px",
					"left": "215px",
					"width": "75px",
					"height": "25px"
				});
				var comboBox_5 = new cpr.controls.ComboBox("cbbInvitPrdRcd");
				comboBox_5.bind("fieldLabel").toExpression("#optInvitPrdRcd.value");
				comboBox_5.bind("value").toDataMap(app.lookup("dmReqList"), "strInvitPrdRcd");
				(function(comboBox_5){
					comboBox_5.addItem(new cpr.controls.Item("전체", ""));
					comboBox_5.setItemSet(app.lookup("dsInvitPrdRcdList"), {
						"label": "CD_NM",
						"value": "CD"
					});
				})(comboBox_5);
				container.addChild(comboBox_5, {
					"top": "30px",
					"left": "300px",
					"width": "80px",
					"height": "25px"
				});
				var output_9 = new cpr.controls.Output("optEntrSeltRcd");
				output_9.value = "모집전형";
				container.addChild(output_9, {
					"top": "30px",
					"left": "384px",
					"width": "100px",
					"height": "25px"
				});
				var comboBox_6 = new cpr.controls.ComboBox("cbbEntrSeltRcd");
				comboBox_6.bind("fieldLabel").toExpression("#optEntrSeltRcd.value");
				comboBox_6.bind("value").toDataMap(app.lookup("dmReqList"), "strEntrSeltRcd");
				(function(comboBox_6){
					comboBox_6.addItem(new cpr.controls.Item("전체", ""));
					comboBox_6.setItemSet(app.lookup("dsEntrSeltRcdList"), {
						"label": "CD_NM",
						"value": "CD"
					});
				})(comboBox_6);
				container.addChild(comboBox_6, {
					"top": "30px",
					"left": "490px",
					"width": "130px",
					"height": "25px"
				});
				var output_10 = new cpr.controls.Output("optDayNightRcd");
				output_10.value = "주간/야간";
				container.addChild(output_10, {
					"top": "30px",
					"left": "621px",
					"width": "100px",
					"height": "25px"
				});
				var comboBox_7 = new cpr.controls.ComboBox("cbbDayNightRcd");
				comboBox_7.bind("fieldLabel").toExpression("#optDayNightRcd.value");
				comboBox_7.bind("value").toDataMap(app.lookup("dmReqList"), "strDayNightRcd");
				(function(comboBox_7){
					comboBox_7.addItem(new cpr.controls.Item("전체", ""));
					comboBox_7.setItemSet(app.lookup("dsDayNightRcdList"), {
						"label": "CD_NM",
						"value": "CD"
					});
				})(comboBox_7);
				container.addChild(comboBox_7, {
					"top": "30px",
					"left": "726px",
					"width": "84px",
					"height": "25px"
				});
				var output_11 = new cpr.controls.Output("optKeyDate");
				output_11.value = "기준일자";
				output_11.style.setClasses(["require"]);
				container.addChild(output_11, {
					"top": "30px",
					"left": "814px",
					"width": "75px",
					"height": "25px"
				});
				var dateInput_1 = new cpr.controls.DateInput("dipKeyDate");
				dateInput_1.userAttr({"require": "Y"});
				dateInput_1.bind("fieldLabel").toExpression("#optKeyDate.value");
				dateInput_1.bind("value").toDataMap(app.lookup("dmReqList"), "strKeyDate");
				container.addChild(dateInput_1, {
					"top": "30px",
					"left": "894px",
					"width": "107px",
					"height": "25px"
				});
				var comboBox_8 = new cpr.controls.ComboBox("cbbMonth");
				comboBox_8.bind("fieldLabel").toExpression("#optMonth.value");
				comboBox_8.bind("value").toDataMap(app.lookup("dmReqList"), "strMonth");
				(function(comboBox_8){
					comboBox_8.addItem(new cpr.controls.Item("1월", "1"));
					comboBox_8.addItem(new cpr.controls.Item("2월", "2"));
					comboBox_8.addItem(new cpr.controls.Item("3월", "3"));
					comboBox_8.addItem(new cpr.controls.Item("4월", "4"));
					comboBox_8.addItem(new cpr.controls.Item("5월", "5"));
					comboBox_8.addItem(new cpr.controls.Item("6월", "6"));
					comboBox_8.addItem(new cpr.controls.Item("7월", "7"));
					comboBox_8.addItem(new cpr.controls.Item("8월", "8"));
					comboBox_8.addItem(new cpr.controls.Item("9월", "9"));
					comboBox_8.addItem(new cpr.controls.Item("10월", "10"));
					comboBox_8.addItem(new cpr.controls.Item("11월", "11"));
					comboBox_8.addItem(new cpr.controls.Item("12월", "12"));
					comboBox_8.addItem(new cpr.controls.Item("전체", ""));
				})(comboBox_8);
				container.addChild(comboBox_8, {
					"top": "5px",
					"left": "250px",
					"width": "55px",
					"height": "25px"
				});
				var inputBox_2 = new cpr.controls.InputBox("ipbDeptNm");
				inputBox_2.userAttr({"require": "Y"});
				inputBox_2.bind("fieldLabel").toExpression("#optObjSch.value");
				inputBox_2.bind("value").toDataMap(app.lookup("dmReqList"), "strDeptNm");
				if(typeof onIpbDeptNmValueChange == "function") {
					inputBox_2.addEventListener("value-change", onIpbDeptNmValueChange);
				}
				container.addChild(inputBox_2, {
					"top": "5px",
					"left": "385px",
					"width": "165px",
					"height": "25px"
				});
				var button_2 = new cpr.controls.Button("btnPopSearch");
				button_2.value = "";
				button_2.style.setClasses(["btn-pop-search"]);
				if(typeof onBtnPopSearchClick == "function") {
					button_2.addEventListener("click", onBtnPopSearchClick);
				}
				container.addChild(button_2, {
					"top": "5px",
					"left": "551px",
					"width": "20px",
					"height": "25px"
				});
				var inputBox_3 = new cpr.controls.InputBox("ipbDeptCd");
				inputBox_3.visible = false;
				inputBox_3.bind("value").toDataMap(app.lookup("dmReqList"), "strDeptCd");
				container.addChild(inputBox_3, {
					"top": "5px",
					"left": "575px",
					"width": "15px",
					"height": "25px"
				});
				var output_12 = new cpr.controls.Output("optPrtDiv");
				output_12.value = "출력구분";
				output_12.style.setClasses(["require"]);
				container.addChild(output_12, {
					"top": "30px",
					"left": "1005px",
					"width": "74px",
					"height": "25px"
				});
				var comboBox_9 = new cpr.controls.ComboBox("cbbPrtDiv");
				comboBox_9.userAttr({"require": "Y"});
				comboBox_9.bind("fieldLabel").toExpression("#optPrtDiv.value");
				comboBox_9.bind("value").toDataMap(app.lookup("dmReqList"), "strStudListYN");
				(function(comboBox_9){
					comboBox_9.addItem(new cpr.controls.Item("재학생현황", ""));
					comboBox_9.addItem(new cpr.controls.Item("재학생명단(Excel)", "Y"));
				})(comboBox_9);
				container.addChild(comboBox_9, {
					"top": "30px",
					"left": "1084px",
					"width": "131px",
					"height": "25px"
				});
			})(group_1);
			container.addChild(group_1, {
				"top": "30px",
				"left": "5px",
				"width": "1225px",
				"height": "60px"
			});
			
			var group_2 = new cpr.controls.Container("grpData");
			// Layout
			var xYLayout_3 = new cpr.controls.layouts.XYLayout();
			group_2.setLayout(xYLayout_3);
			(function(container){
				var userDefinedControl_2 = linker.userDefinedControl_2 = new udc.com.comTitle();
				userDefinedControl_2.ctrl = app.lookup("grdCsrShreg");
				userDefinedControl_2.bind("title").toLanguage("");
				container.addChild(userDefinedControl_2, {
					"top": "5px",
					"left": "5px",
					"width": "265px",
					"height": "25px"
				});
				var grid_1 = new cpr.controls.Grid("grdExtCsrList");
				grid_1.init({
					"dataSet": app.lookup("dsCsrShreg"),
					"columns": [
						{"width": "186px"},
						{"width": "44px"},
						{"width": "38px"},
						{"width": "38px"},
						{"width": "60px"},
						{"width": "62px"},
						{"width": "63px"},
						{"width": "191px"},
						{"width": "70px"},
						{"width": "62px"},
						{"width": "61px"},
						{"width": "171px"},
						{"width": "55px"},
						{"width": "58px"},
						{"width": "60px"},
						{"width": "233px"},
						{"width": "75px"},
						{"width": "80px"},
						{"width": "80px"},
						{"width": "108px"},
						{"width": "93px"},
						{"width": "95px"},
						{"width": "198px"},
						{"width": "67px"},
						{"width": "67px"},
						{"width": "66px"},
						{"width": "112px"}
					],
					"header": {
						"rows": [{"height": "27px"}],
						"cells": [
							{
								"constraint": {"rowIndex": 0, "colIndex": 0},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-GLS-STUD_ID");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 1},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-GLS-PER_NM");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 2},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-GLS-SHYR");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 3},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-GLS-SMT");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 4},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-SCR-REGTRANSZ");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 5},
								"configurator": function(cell){
									cell.text = "성별";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 6},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-SCR-APRVDIV");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 7},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-SCR-ATCHFILE");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 8},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-DB-ALT_DT");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 9},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-SCR-ATCHFILE");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 10},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-SCR-FILECNT");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 11},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-SCR-FILECNT");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 12},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-SCR-FILECNT");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 13},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-SCR-FILECNT");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 14},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-SCR-FILECNT");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 15},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-SCR-ATCHFILE");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 16},
								"configurator": function(cell){
									cell.text = "일반전형";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 17},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-SCR-SCHREGST");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 18},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-SCR-CHGRSNNM");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 19},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-SCR-RTRSCHYS");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 20},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-SCR-RTRSCHSMSTR");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 21},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-DB-REC_RCOG_YN");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 22},
								"configurator": function(cell){
									cell.text = "학과탈락율";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 23},
								"configurator": function(cell){
									cell.text = "남여";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 24},
								"configurator": function(cell){
									cell.text = "반";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 25},
								"configurator": function(cell){
									cell.text = "학년";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 26},
								"configurator": function(cell){
									cell.text = "학생만족도";
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
									cell.columnName = "OG_NM";
									cell.style.css({
										"text-align" : "center"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 1},
								"configurator": function(cell){
									cell.columnName = "DAY_NIGHT_DIV_NM";
									cell.style.css({
										"text-align" : "center"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 2},
								"configurator": function(cell){
									cell.columnName = "SHYR";
									cell.style.css({
										"text-align" : "center"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 3},
								"configurator": function(cell){
									cell.columnName = "CLASS_NM";
									cell.style.css({
										"text-align" : "center"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 4},
								"configurator": function(cell){
									cell.columnName = "ATTE_NOP";
									cell.style.css({
										"text-align" : "right"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 5},
								"configurator": function(cell){
									cell.columnName = "GENDER_NM";
									cell.style.css({
										"text-align" : "right"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 6},
								"configurator": function(cell){
									cell.columnName = "GENDER_NOP";
									cell.style.css({
										"text-align" : "right"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 7},
								"configurator": function(cell){
									cell.columnName = "ABS_CNT1";
									cell.style.css({
										"text-align" : "right"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 8},
								"configurator": function(cell){
									cell.columnName = "ABS_CNT2";
									cell.style.css({
										"text-align" : "right"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 9},
								"configurator": function(cell){
									cell.columnName = "ABS_CNT3";
									cell.style.css({
										"text-align" : "right"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 11},
								"configurator": function(cell){
									cell.columnName = "PRD_CNT1";
									cell.style.css({
										"text-align" : "right"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 12},
								"configurator": function(cell){
									cell.columnName = "PRD_CNT2";
									cell.style.css({
										"text-align" : "right"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 13},
								"configurator": function(cell){
									cell.columnName = "PRD_CNT3";
									cell.style.css({
										"text-align" : "right"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 15},
								"configurator": function(cell){
									cell.columnName = "SELT_CNT1";
									cell.style.css({
										"text-align" : "right"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 16},
								"configurator": function(cell){
									cell.columnName = "SELT_CNT2";
									cell.style.css({
										"text-align" : "right"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 17},
								"configurator": function(cell){
									cell.columnName = "SELT_CNT3";
									cell.style.css({
										"text-align" : "right"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 19},
								"configurator": function(cell){
									cell.columnName = "INVW_TGT";
									cell.style.css({
										"text-align" : "right"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 20},
								"configurator": function(cell){
									cell.columnName = "CHAN_HOPE";
									cell.style.css({
										"text-align" : "right"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 21},
								"configurator": function(cell){
									cell.columnName = "CHAN_TGT";
									cell.style.css({
										"text-align" : "right"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 22},
								"configurator": function(cell){
									cell.columnName = "REMO_CNT1";
									cell.style.css({
										"text-align" : "right"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 23},
								"configurator": function(cell){
									cell.columnName = "REMO_CNT2";
									cell.style.css({
										"text-align" : "right"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 24},
								"configurator": function(cell){
									cell.columnName = "REMO_CNT3";
									cell.style.css({
										"text-align" : "right"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 26},
								"configurator": function(cell){
									cell.columnName = "STUD_SATIS_RATE";
									cell.style.css({
										"text-align" : "right"
									});
								}
							}
						]
					}
				});
				container.addChild(grid_1, {
					"top": "30px",
					"left": "6px",
					"width": "1210px",
					"height": "544px"
				});
			})(group_2);
			container.addChild(group_2, {
				"top": "92px",
				"left": "5px",
				"width": "1225px",
				"height": "579px"
			});
			
			var embeddedApp_1 = new cpr.controls.EmbeddedApp("emaStdCmnPobjSch");
			if(typeof onEmaStdCmnPobjSchAppReady == "function") {
				embeddedApp_1.addEventListener("app-ready", onEmaStdCmnPobjSchAppReady);
			}
			cpr.core.App.load("app/cmn/impStdCmnPObjSch", function(app) {
				if(app){
					embeddedApp_1.app = app;
				}
			});
			container.addChild(embeddedApp_1, {
				"top": "676px",
				"left": "100px",
				"width": "95px",
				"height": "25px"
			});
			if(typeof onBodyLoad == "function"){
				app.addEventListener("load", onBodyLoad);
			}
		}
	});
	app.title = "extCsrSAtteStatByProCenter";
	cpr.core.Platform.INSTANCE.register(app);
})();
