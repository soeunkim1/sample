/*
 * App URI: app/csr/extCsrSVendInfo
 * Source Location: app/csr/extCsrSVendInfo.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("app/csr/extCsrSVendInfo", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			﻿//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
			/// <xtmlink path="./extCsrSVendInfo.xtm"/>
			
			
			var extCsrSVendInfo = function() {
				var moPage = new Page();
				//임포트용 데이터 통신 오브젝트
				var moPObject = new PObject();
				
				var msStudId = "";
				var msStudNo = "";
				
				//등록 popUp에 학년도 Text,학기Text,학적등록구분Text,이수과정구분Text,이수과정text,학적등록사유Text 추가해서 넘겨줌 
				//등록 popUp에 넘겨줄 값 
				moPObject.moAltObj = {
					studId				: "", 		//학적사항관리 창의 조회된 학번값		
					headerStud		: "", 		//학적사항관리 창의 헤더정보(학생) 
					headerCourse	: "", 		//
					headerDept		: "",		//
					headerRemark	: "", 		//
					studNo	 			: "", 		//학번
					year 					: "", 		//년도
					smt 					: "", 		//학기
					stDt 					: "", 		//시작일자
					endDt 				: "", 		//종료일자
					keyDate	 			: "",		//기준일자
					altPsn				: ""		//
				};
				
				/**
				 * 부모 페이지에서 받아온 휴학 사유 리스트
				 */	
				moPObject.moAltAbs = {
					absPossibleList	: ""
				};
				
				/**
				 * 사용처 : 상세팝업 .
				 */
				moPObject.moDtl = {
					studId 				: "",
					refKey 				: "",
					altDivNm 			: "",
					stDt 					: "",
					serialNo 			: "",
					endDt 				: "",
					schYearNm 		: "",
					smtNm 				: "",
					altRsnDivNm 		: "",
					altRsnNm 			: "",
					altDt 					: "",
					cancelDt 			: "",
					cancelRsnNm 	: "",
					absSmtCntNm 	: "",
					cstDt 				: "",
					chgDesc 			: "",
					chgBefDesc 		: "",
					remark 				: "",
					befEndDt 			: "",
					altDivRcd 			: ""
				};
				
				/******************************************************************************************************
				 *  공통파일업로드 관련 설정사항 사용법
				 *
				 * 예시)
				 * var moIdsForStdCmnFileUtil = [{
				 *		controlId 					: "btnFileUpLoad",
				 *		iFileSerialNo 				: "rdOptFileSerialNo",
				 *		iFileSubPath 				:  model.getTitle(),
				 *		iTableName 				: "CMN_TMP_REG",
				 *		iIsDirectUpLoad			: null,
				 *     isFileSelectorOnly       : null,
				 *		iIsHideDelete 				: null,			
				 *		iIsDownloadOnly 		: null,
				 *		iFileExtFilter 				: null,
				 *		oFileSerailNo				: "rdOptFileSerialNo",
				 *		oTmpFilePath			: null,			//리피트일경우 null로 지정
				 *		oFileCnt					: null,		
				 *		oFileDataChanged		: null,
				 *		func							: function(poRtnFileInfo){
				 *											ex)
				 *											if(poRtnFileInfo.IS_FILE_CHG && poRtnFileInfo.FILE_CNT == 0){
																util.FreeForm.setValue(app, "frfCmnDevStd", "FILE_SERIAL_NO", "", true); 
																doSave();
															}
				 *										}
				 *	}];
				 *  ▶ 설정가능 유형
				 *      1. 인스턴스
				 *      2. 리피트 디테일 셀 ID
				 *      3. 컨트롤 ID
				 *  ▶ 각 변수별 설명
				 *      iXXX : 팝업에 전달될  input 파라미터
				 *      oXXX : 팝업에서 선택한 값을 받을 데이터
				 *  	1. controlId 			: 최초 이벤트의 버튼이나 그리드 id             						(필수)
				 *  	2. iFileSerialNo		: 파일순번                                										(선택) 
				 *  	3. iFileSubPath 		: 저장될 파일 폴더(appworks.properties에 정의된 폴더 경로)	(필수)	
				 *  	4. iTableName 		: 파일업로드에 사용될 업무단 테이블명								(필수)
				 *  	5. iIsHideDelete 		: 삭제버튼 숨기기 여부 													(선택)
				 *								  	  default : false;
				 *		6. iIsDownloadOnly	: 다운로드만 가능할지 여부(업로드X)									(선택)
				 *								      default : false;
				 *		7. iIsDirectUpLoad   : auto save기능을 사용하지 않고 파일업로드 팝업을 이용하여 업로드 후 업로드된 정보만 리턴받아 제어 할 경우 사용
				 *									  default : false;
				 *		8. isFileSelectorOnly : 파일 셀럭터를 이용하여 응용프로그램에서 탬프 파일 경로만 취득하여 제어할 경우경우 사용
				 *									  default : false;
				 *		9. iFileExtFilter		: 업로드가능 확장자(배열) 												(선택)
				 *								  	  ex)["jpg","png"]
				 *  	10. oFileSerailNo 		: 파일순번																		(필수)
				 *  	11. oFileCnt 			: 저장된 파일 갯수															(선택)
				 *									  (	func의 args 대체 가능 poRtnFileInfo.strFileCnt)
				 *									  리피트내 컬럼 지정시 updatable="False" 지정
				 *  	12. oTmpFilePath 	: 임시폴더파일경로															(선택)
				 *									  리피트일경우 null로 지정, TMP_FILE_PATH 데이터셋 생성됨
				 *									  
				 *		13.oFileDataChanged	: 파일업로드 변경 여부 판단											(필수)		
				 *									  (	func의 args 대체 가능 poRtnFileInfo.isFileDataChanged)
				 *
				 *  	14. func 				: 팝업에서 선택한 값을 받은 후 추가 로직이 필요한 경우 함수
				 *									  args..
				 * 									  poRtnFileInfo.IS_FILE_CHG 			파일업로드 리피트 변경 여부
				 *															 FILE_CNT					업로드 파일 갯수
				 *															 TMP_FILE_PATH		임시파일경로
				 *									  						 FILE_SERAIL_NO		파일순번
				 *******************************************************************************************************/	
				moPObject.moIdsForStdCmnFileUtil = [{
					controlId 					: "rdImgFileUpload",
					iFileSerialNo 				: "rdIpbFileSerialNo",
					iFileSubPath 				:  "extCsrCFileMng",
					iTableName 				: "EXT_CSR_FILE",
					iIsDirectUpLoad			: true,
					isFileSelectorOnly       : null,
					iIsHideDelete 				: true,			
					iIsDownloadOnly 		: true,
					iFileExtFilter 				: null,
					oFileSerailNo				: "rdIpbFileSerialNo",
					oTmpFilePath			: null,			//리피트일경우 null로 지정
					oFileCnt					: "rdOptFileCnt",		
					oFileDataChanged		: null,
					func							: function(poRtnFileInfo){
														if(poRtnFileInfo.IS_FILE_CHG && poRtnFileInfo.FILE_CNT == 0){
															util.Grid.setCellValue(app, "grdExtCsrVend", "FILE_SERIAL_NO", "", null, true);
														}else{
															util.Grid.setCellValue(app, "grdExtCsrVend", "FILE_SERIAL_NO", poRtnFileInfo.FILE_SERAIL_NO, null, true);
														}
													}
				}];
				/**
				 * 헤더 초기화
				 * @member moPage
				 * @type void
				 * @author hyunteak at 16. 5. 23 오후 4:13
				 */
				moPage.onLoadImportDone_ImpSbpHeader = function() {
					doSbpHeaderOnLoad();
				}
				
				/**
				 * 화면 초기화
				 * @member moPage
				 * @type void
				 * @author hyunteak at 16. 5. 23 오후 4:13
				 */
				moPage.onModelConstructDone_ExtCsrSVendInfo = function() {
					//리피트 초기 설정
			//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
			//		ExtRepeat.init("rptExtCsrVend");
			
					// 부모멤버변수에담긴학번받음
					msStudId = moPage.parent.moParentObj.studId;
					msStudNo = moPage.parent.moParentObj.studNo;
					util.DataMap.setValue(app, "dmReqKey", "stdPgmNm", moPage.parent.moParentObj.subPageId);
					
					moPObject.moAltObj.studId 		= msStudId;
					moPObject.moAltObj.studNo 		= msStudNo; // STUD_ID -> STUD_NO로 변경되면서 추가된 부분 (정정호 2011.08.05)
					moPObject.moAltObj.headerStud 	= moPage.parent.moParentObj.headerStud;
					
					doList(function(pbSuccess) {
						// 조회 : "조회되었습니다." header 메세지 표시
						if(pbSuccess) {
							moPage.parentSendMsg("lblTitleRptExtCsrVend", NLS.INF.M024);
						}
					});
				};
				/**
				 * 조회
				 * @member moPage
				 * @param {?} poCallBackFunc
				 * @type void
				 * @author hyunteak at 16. 5. 23 오후 4:13
				 */
				function doList(poCallBackFunc) {
					
					var vsCancelCkbVal= "N";
					var vsCancelCkbCtlVal = util.Control.getValue(app, "ckbCancel");
					if (vsCancelCkbCtlVal == "Y") vsCancelCkbVal = "Y";
					
					util.DataMap.setValue(app, "dmReqKey", "strCancelCkbVal", vsCancelCkbVal);
					util.DataMap.setValue(app, "dmReqKey", "strStudId", msStudId);
					
					//strCommand: list 
					util.Submit.send(app, "subList", function(pbSuccess) {
							if (pbSuccess) {
								util.Control.redraw(app, "grdExtCsrVend");
							}
							if(util.isFunc(poCallBackFunc))	poCallBackFunc(pbSuccess);
						}
					);
				};
				/**
				 * 부모 헤더에 메세지 뿌리기
				 * @member moPage
				 * @param {?} psCtrlId
				 * @param {?} psMsgCodeNm
				 * @type void
				 * @author hyunteak at 16. 5. 23 오후 4:13
				 */
				moPage.parentSendMsg = function(psCtrlId, psMsgCodeNm) {
					var vsMsg = ExtControl.getTextValue(psCtrlId);
					vsMsg     = "[" + vsMsg + "]";
				
					util.Msg.notify(app, vsMsg + psMsgCodeNm);	
				};
				
				/**
				 * 리피트 변경여부 반환
				 * @member moPage
				 * @type Boolean
				 * @return 
				 * @author hyunteak at 16. 5. 23 오후 4:13
				 */
				function doCheckDataChange() {
					if(util.Grid.isModified(app, ["grdExtCsrVend"], "CRM") ){
						return false;
					}else{
						return true;
					}
				};
				
				moPage.onValueChanged_RhCkbSelect = function() {
			//TO-BE: <ExtRepeat.selectedAllPanel> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
			//		ExtRepeat.selectedAllPanel("rhCkbSelect");
				}
				/**
				 * 파일 다운로드
				 * @member moPage
				 * @param {?} sender
				 * @type void
				 * @author hyunteak at 16. 5. 23 오후 4:14
				 */
				moPage.onClick_RdImgFileUpload = function(sender) {
					doOnClickStdCmnPFileUtil(sender);
				}
				return moPage;
			};;
			// End - User Script
			
			// Header
			var dataSet_1 = new cpr.data.DataSet("dsConMenuNewList");
			dataSet_1.parseData({
				"columns": [
					{"name": "CD_PRP1"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_1);
			
			var dataSet_2 = new cpr.data.DataSet("dsConMenuDelList");
			dataSet_2.parseData({
				"columns": [
					{"name": "CD_PRP2"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_2);
			
			var dataSet_3 = new cpr.data.DataSet("dsExtCsrVend");
			dataSet_3.parseData({
				"info": "EXT_CSR_VEND@STUD_ID,SCH_YEAR_RCD,SMT_RCD,VEND_CD",
				"columns": [
					{"name": "STUD_ID"},
					{"name": "SCH_YEAR_RCD"},
					{"name": "SCH_YEAR_NM"},
					{"name": "SMT_RCD"},
					{"name": "SMT_NM"},
					{"name": "VEND_CD"},
					{"name": "VEND_NM"},
					{"name": "ST_DT"},
					{"name": "END_DT"},
					{"name": "TEL_NO"},
					{"name": "ADDR"},
					{"name": "ONOFFI_CERT_SUBMIT_DT"},
					{"name": "CONTR_SUBMIT_DT"},
					{"name": "HSCL_GRDT_CERT_SUBMIT_DT"},
					{"name": "BIZKD"},
					{"name": "BIZKD_NM"},
					{"name": "FILE_SERIAL_NO"},
					{"name": "FILE_CNT"},
					{"name": "BIZM_NO"}
				],
				"rows": []
			});
			app.register(dataSet_3);
			
			var dataSet_4 = new cpr.data.DataSet("dsAbsPossibleList");
			dataSet_4.parseData({
				"columns": [
					{"name": "CD_NM"},
					{"name": "CD"}
				],
				"rows": []
			});
			app.register(dataSet_4);
			var dataMap_1 = new cpr.data.DataMap("dmReqKey");
			dataMap_1.parseData({
				"columns" : [
					{
						"name": "strCancelCkbVal",
						"dataType": "string"
					},
					{
						"name": "strStudId",
						"dataType": "string"
					},
					{
						"name": "strPopTarget",
						"dataType": "string"
					},
					{
						"name": "stdPgmNm",
						"dataType": "string"
					}
				]
			});
			app.register(dataMap_1);
			
			var dataMap_2 = new cpr.data.DataMap("dmReqSbp");
			dataMap_2.parseData({
				"columns" : [
					{
						"name": "checkPgmId",
						"dataType": "string"
					},
					{
						"name": "checkMenuNm",
						"dataType": "string"
					},
					{
						"name": "checkUserId",
						"dataType": "string"
					}
				]
			});
			app.register(dataMap_2);
			
			var dataMap_3 = new cpr.data.DataMap("dmResList");
			dataMap_3.parseData({
				"columns" : [{
					"name": "subPageNm",
					"dataType": "string"
				}]
			});
			app.register(dataMap_3);
			
			var dataMap_4 = new cpr.data.DataMap("dmResCurrentDate");
			dataMap_4.parseData({
				"columns" : [
					{
						"name": "stDt",
						"dataType": "string"
					},
					{
						"name": "endDt",
						"dataType": "string"
					},
					{
						"name": "year",
						"dataType": "string"
					},
					{
						"name": "smt",
						"dataType": "string"
					}
				]
			});
			app.register(dataMap_4);
			var submission_1 = new cpr.protocols.Submission("subOnLoad");
			submission_1.action = "/csr/ExtCsrVendInfo/";
			submission_1.mediaType = "application/x-www-form-urlencoded";
			submission_1.addRequestData(dataMap_1);
			submission_1.addResponseData(dataSet_3, false);
			submission_1.addResponseData(dataMap_4, false);
			submission_1.addResponseData(dataSet_1, false);
			submission_1.addResponseData(dataSet_2, false);
			submission_1.addResponseData(dataMap_3, false);
			app.register(submission_1);
			
			var submission_2 = new cpr.protocols.Submission("subList");
			submission_2.action = "/csr/ExtCsrVendInfo/";
			submission_2.mediaType = "application/x-www-form-urlencoded";
			submission_2.addRequestData(dataMap_1);
			submission_2.addResponseData(dataSet_3, false);
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
			var group_1 = new cpr.controls.Container("grpData");
			// Layout
			var xYLayout_2 = new cpr.controls.layouts.XYLayout();
			group_1.setLayout(xYLayout_2);
			(function(container){
				var userDefinedControl_1 = linker.userDefinedControl_1 = new udc.com.comTitle();
				userDefinedControl_1.bind("title").toLanguage("UI-GLS-VEND_INFO");
				container.addChild(userDefinedControl_1, {
					"top": "5px",
					"left": "5px",
					"width": "265px",
					"height": "25px"
				});
				var grid_1 = linker.grid_1 = new cpr.controls.Grid("grdExtCsrVend");
				grid_1.init({
					"dataSet": app.lookup("dsExtCsrVend"),
					"columns": [
						{"width": "40px"},
						{"width": "81px"},
						{"width": "36px"},
						{"width": "171px"},
						{"width": "80px"},
						{"width": "80px"},
						{"width": "80px"},
						{"width": "80px"},
						{"width": "182px"},
						{"width": "80px"},
						{"width": "47px"},
						{"width": "47px"},
						{
							"width": "90px",
							"visible": false
						},
						{
							"width": "90px",
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
									cell.bind("text").toLanguage("UI-GLS-SCH_YEAR");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 2},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-GLS-SMT");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 3},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-GLS-VEND_NM");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 4},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-DB-ONOFFI_ST_DT");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 5},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-DB-ONOFFI_END_DT");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 6},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-SCR-COMP_TEL_NO");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 7},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-GLS-BIZM_NO");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 8},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-GLS-VEND_ADDR");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 9},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-GLS-HSCL_GRDT_CERT_SUBMIT_DT");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 10},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-GLS-GRDT_FILE");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 11},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-SCR-ATCHFILECNT");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 12},
								"configurator": function(cell){
									cell.text = "파일일련번호";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 13},
								"configurator": function(cell){
									cell.text = "오브젝트ID";
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
									cell.columnName = "SCH_YEAR_NM";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 2},
								"configurator": function(cell){
									cell.columnName = "SMT_NM";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 3},
								"configurator": function(cell){
									cell.columnName = "VEND_NM";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 4},
								"configurator": function(cell){
									cell.columnName = "ST_DT";
									cell.control = (function(){
										var output_1 = new cpr.controls.Output("gdOptStDt");
										output_1.dataType = "date";
										output_1.format = "YYYY-MM-DD";
										output_1.style.css({
											"text-align" : "center"
										});
										output_1.bind("value").toDataColumn("ST_DT");
										return output_1;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 5},
								"configurator": function(cell){
									cell.columnName = "END_DT";
									cell.control = (function(){
										var output_2 = new cpr.controls.Output("gdOptEndDt");
										output_2.dataType = "date";
										output_2.format = "YYYY-MM-DD";
										output_2.style.css({
											"text-align" : "center"
										});
										output_2.bind("value").toDataColumn("END_DT");
										return output_2;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 6},
								"configurator": function(cell){
									cell.columnName = "TEL_NO";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 7},
								"configurator": function(cell){
									cell.columnName = "BIZM_NO";
									cell.style.css({
										"text-align" : "center"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 8},
								"configurator": function(cell){
									cell.columnName = "ADDR";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 9},
								"configurator": function(cell){
									cell.columnName = "ONOFFI_CERT_SUBMIT_DT";
									cell.control = (function(){
										var output_3 = new cpr.controls.Output("gdOptOnoffiCertSubmitDt");
										output_3.dataType = "date";
										output_3.format = "YYYY-MM-DD";
										output_3.style.css({
											"text-align" : "center"
										});
										output_3.bind("value").toDataColumn("ONOFFI_CERT_SUBMIT_DT");
										return output_3;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 10},
								"configurator": function(cell){
									cell.columnName = "";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 11},
								"configurator": function(cell){
									cell.columnName = "FILE_CNT";
									cell.style.css({
										"text-align" : "right"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 12},
								"configurator": function(cell){
									cell.columnName = "FILE_SERIAL_NO";
									cell.control = (function(){
										var inputBox_1 = new cpr.controls.InputBox("gdIpbFileSerialNo");
										inputBox_1.maxLength = 50;
										inputBox_1.bind("value").toDataColumn("FILE_SERIAL_NO");
										return inputBox_1;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 13},
								"configurator": function(cell){
									cell.columnName = "STUD_ID";
									cell.control = (function(){
										var inputBox_2 = new cpr.controls.InputBox("gdIpbStudId");
										inputBox_2.maxLength = 20;
										inputBox_2.bind("value").toDataColumn("STUD_ID");
										return inputBox_2;
									})();
								}
							}
						]
					}
				});
				container.addChild(grid_1, {
					"top": "30px",
					"left": "5px",
					"width": "1015px",
					"height": "428px"
				});
			})(group_1);
			container.addChild(group_1, {
				"top": "0px",
				"left": "0px",
				"width": "1025px",
				"height": "463px"
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
				"top": "455px",
				"left": "75px",
				"width": "96px",
				"height": "25px"
			});
			
			var embeddedApp_2 = new cpr.controls.EmbeddedApp("emaFile");
			cpr.core.App.load("app/imp/impFileUtil", function(app) {
				if(app){
					embeddedApp_2.app = app;
				}
			});
			container.addChild(embeddedApp_2, {
				"top": "462px",
				"left": "180px",
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
	app.title = "extCsrSVendInfo";
	cpr.core.Platform.INSTANCE.register(app);
})();