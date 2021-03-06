/*
 * App URI: app/csr/stdCsrPExhPopup
 * Source Location: app/csr/stdCsrPExhPopup.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("app/csr/stdCsrPExhPopup", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			﻿//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
			/// <xtmlink path="./stdCsrPExhPopup.xtm"/>
			
			
			var stdCsrPExhPopup = function() {
				var moPage = new Page();
				//임포트용 데이터 통신 오브젝트
				var moPObject = new PObject();
				//팝업 오픈시 조회가능여부
				var mbSearchYn = true;
					
				moPObject.moStdCsrPExhPopup = {
					// 팝업 작동 내부사용
					controlId 						: "",			//  최초 이벤트의 버튼이나 그리드 id
					openedByChange 			: false,		
					skipOnChange 				: false,
					// 선택가능 범위를 제한함.
					KeyDate                		: "",
					StDt								: "",
					EndDt							: "",
					pgmCd 							: "", 		//교환프로그램 코드 
					pgmNm 						: "", 		//교환프로그램명 
					pgmDivRcd 					: [], 	//["CT80101","CT80102","CT80103"],
					pgmTypeRcd 				: [],	//["CT80301"],
					// 선택열 결과 리턴
					Result : {
						EXH_PGM_CD 				: "",
						EXH_PGM_NM 				: "",
						EXH_PGM_DIV_RCD 		: "",
						EXH_PGM_DIV_NM		 	: "",
						EXH_PGM_TYPE_RCD 	: "",
						EXH_PGM_TYPE_NM		: "",
						PGM_MIN_TERM			: "",
						PGM_MAX_TERM 			: "",
						FIRSR_DIV_RCD 			: "",
						FIRSR_DIV_NM				: "",
						TERM_UNIT_RCD 			: "",
						TERM_UNIT_NM			: "",
						REF_KEY 						: ""
					}
				};
			
				/**
				 * @desc onModelConstructDone 이벤트
				 * @param 
				 * @return void
				 * @author	 Choi In Seong 2016. 7. 8.
				 */
				moPage.onModelConstructDone_StdCsrPStSearch = function() {
					//리피트 초기 설정
			//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
			//		ExtRepeat.init("rptCsrExhPgm");
					//검색조건 초기 설정
			//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
			//		ExtGroup.initSearchBox("grpSearch", "grp_rptCsrExhPgm");
					//호출한 페이지에서 파라미터 받기.
					doParentGet();
					//화면 온로드 서브미션 호출
					doOnLoad();
				};
				
				/**
				 * @desc 부모창에서 보낸 변수 받기
				 * @param
				 * @return void
				 * @author Choi In Seong 2016. 7. 8.
				 */
				function doParentGet() {
					if(ExtPopUp.isPopUp()) {
						// 호출한 페이지에서 파라미터 받기.													
						var voStdCsrPExhPopup =  ExtPopUp.getParentVal("moStdCsrPExhPopup");
						// 파라미터  값복사 (deep copy)
						for (var key in voStdCsrPExhPopup) {
							if (key == "Result") {
								// 결과 값은 복사하지 않음.
								continue;
							}
							moPObject.moStdCsrPExhPopup [key] = voStdCsrPExhPopup [key];
						}
						// 팝업이 뜬후에는 false로 고침.
						voStdCsrPExhPopup.openedByChange = false;
					}
				}
				
				/**
				 * @desc 받아온 변수 조회조건에 셋팅
				 * @param
				 * @return void
				 * @author Choi In Seong 2016. 7. 8.
				 */
				function doOnLoad() {
					
					// 파라미터 받아서 초기 검색조건 세팅.
					var voParam = moPObject.moStdCsrPExhPopup;
					
					//pgmCd : "", //교환프로그램 코드
					if (!ValueUtil.isNull(voParam.pgmCd)) {
						util.Control.setValue(app, "ipbExhPgmCd", voParam.pgmCd);
					}
					
					//pgmNm : "", //교환프로그램명 
					if (!ValueUtil.isNull(voParam.pgmNm)) {
						util.Control.setValue(app, "ipbExhPgmNm", voParam.pgmNm);
					}
					
					//날짜
					if (!ValueUtil.isNull(voParam.StDt)) {
						util.DataMap.setValue(app, "dmReqKey", "strKeyDate",  voParam.StDt);
					}
					
					// 서브미션 호출
					//strCommand: onLoad 
					util.Submit.send(app, "subOnLoad", function(pbSuccess){
						if (pbSuccess) {
							util.Control.redraw(app, ["cbbExhPgmDivRcd", "cbbExhPgmTypeRcd"]);
							
							if (voParam.pgmDivRcd) {
								//교환프로그램 구분 
								if (typeof (voParam.pgmDivRcd) == "string") {
									voParam.pgmDivRcd = [voParam.pgmDivRcd];
								} else {
									var vaTempArray = new Array();
									var vsTemp = "";
									for (var i = 0; i < voParam.pgmDivRcd.length; i++) {
										vaTempArray.push(voParam.pgmDivRcd [i]);
										vsTemp += voParam.pgmDivRcd [i] + ",";
									}
									voParam.pgmDivRcd = vaTempArray;
								}
								
								if (voParam.pgmDivRcd.length == 1) {
									util.Control.setValue(app, "cbbExhPgmDivRcd", voParam.pgmDivRcd [0]);
									util.Control.setVisible(app, false, "ipbExhPgmDivRcd");
								}else if (voParam.pgmDivRcd.length == 0) {
									util.Control.setVisible(app, false, "ipbExhPgmDivRcd");
								}else{
									util.DataMap.setValue(app, "dmReqKey", "strPgmDiv", vsTemp.substring(0 , vsTemp.length - 1));
									util.Control.setVisible(app, true, "ipbExhPgmDivRcd");
								}
								
								if(!ValueUtil.isNull(voParam.pgmDivRcd)){
									util.Control.setEnable(app, false, ["cbbExhPgmDivRcd"]);	
								}
							}
							
							var vsPgmDiv = util.DataMap.getValue(app, "dmReqKey", "strPgmDiv");
							
							 var vaObjDivRcd =  vsPgmDiv.split(",");
							 var vsTObjDivRcd = "";
							 for(var o = 0 ; o < vaObjDivRcd.length ; o++){
								  vsTObjDivRcd += ExtControl.getControl("cbbExhPgmDivRcd").getLabelFromValue(vaObjDivRcd[o]) + ",";
							 }
							 
							util.Control.setValue(app, "ipbObjDivRcd", vsTObjDivRcd.substring(0 , vsTObjDivRcd.length -1));
								
								
							//교환프로그램 유형코드 pgmTypeRcd
							if (voParam.pgmTypeRcd) {
								if (typeof (voParam.pgmTypeRcd) == "string") {
									voParam.pgmTypeRcd = [voParam.pgmTypeRcd];
								} else {
									var vaTempArray = new Array();
									var vsTempType = "";
									for (var i = 0; i < voParam.pgmTypeRcd.length; i++) {
										vaTempArray.push(voParam.pgmTypeRcd [i]);
										vsTempType += voParam.pgmDivRcd [i] + ",";
									}
									voParam.pgmTypeRcd = vaTempArray;
								}
								
								if (voParam.pgmTypeRcd.length == 1) {
									util.Control.setValue(app, "cbbExhPgmTypeRcd", voParam.pgmTypeRcd [0]);
									util.Control.setVisible(app, false, "ipbExhPgmTypeRcd");
								}else if (voParam.pgmTypeRcd.length == 0) {
									util.Control.setVisible(app, false, "ipbExhPgmTypeRcd");
								}else{
									util.DataMap.setValue(app, "dmReqKey", "strPgmType", vsTemp.substring(0 , vsTemp.length - 1));
									util.Control.setVisible(app, true, "ipbExhPgmTypeRcd");
								}
								
								if(!ValueUtil.isNull(voParam.pgmTypeRcd)){
									util.Control.setEnable(app, false, ["cbbExhPgmTypeRcd"]);	
								}
							}
								
							var vsPgmType = util.DataMap.getValue(app, "dmReqKey", "strPgmType");
							
							 var vaObjTypeRcd =  vsPgmType.split(",");
							 var vsTObjTypeRcd = "";
							 for(var o = 0 ; o < vaObjTypeRcd.length ; o++){
								  vsTObjTypeRcd += ExtControl.getControl("cbbExhPgmTypeRcd").getLabelFromValue(vaObjTypeRcd[o]) + ",";
							 }
							 
							util.Control.setValue(app, "ipbExhPgmTypeRcd", vsTObjTypeRcd.substring(0 , vsTObjTypeRcd.length -1));
								
								
							// 교환프로그램코드, 명이 입력되어 있는 경우 바로 검색 실행
							if (voParam.pgmCd || voParam.pgmNm) {
								util.Header.clickSearch(app);
							}
						}
					});
				}
				
				/**
				 * @desc 교환프로그램 조회
				 * @param
				 * @return void
				 * @author Choi In Seong 2016. 7. 8.
				 */
				function doList() {
					
					var voParam = moPObject.moStdCsrPExhPopup;
					
					util.DataMap.setValue(app, "dmReqKey", "strStDt", voParam.StDt);
					util.DataMap.setValue(app, "dmReqKey", "strEndDt", voParam.EndDt);
					
					//strCommand: list 
					util.Submit.send(app, "subList", function(pbSuccess){
						if (pbSuccess) {
							util.Control.redraw(app, "grdCsrExhPgm");
							
							var vnCnt = util.Grid.getRowCount(app, "grdCsrExhPgm");
							if(vnCnt == 0)	util.Msg.notify(app, "NLS.WRN.M005"); // 조회된 내역이 없습니다.
							else util.Msg.notify(app, "NLS.INF.M024"); // 조회되었습니다.
						}
					});
				}
				
				/**
				 * @desc 조회 버튼 클릭
				 * @param
				 * @return void
				 * @author Choi In Seong 2016. 7. 8.
				 */
				moPage.onClick_BtnSearch = function() {
					doList();
				};
				
				/**
				 * @desc 선택 행의 교환프로그램 정보 반환
				 * @param
				 * @return void
				 * @author Choi In Seong 2016. 7. 8.
				 */
				moPage.onRowDoubleClick_RptCsrShreg = function() {
					doCloseOk();
				};
				
				/**
				 * @desc 교환프로그램정보 반환 이벤트
				 * @param 
				 * @return boolean 데이터 존재 여부
				 * @author Choi In Seong 2016. 7. 8.
				 */
				function doCloseOk() {
					// 선택된 데이터가 없을 시 
					if(ValueUtil.isNull(util.Grid.getCheckOrSelectedRowIndex(app, "grdCsrExhPgm"))){
						util.Msg.alert("NLS-WRN-M008"); //선택된 데이터가 없습니다.
						return false;
					}
					//선택된 행
					var vnIdx = util.Grid.getIndex(app, "grdCsrExhPgm");;
			// End - User Script
			
			// Header
			var dataSet_1 = new cpr.data.DataSet("dsCsrExhPgm");
			dataSet_1.parseData({
				"columns": [
					{"name": "EXH_PGM_CD"},
					{"name": "ST_DT"},
					{"name": "END_DT"},
					{"name": "OBJ_DIV_RCD"},
					{"name": "LAN_DIV_RCD"},
					{"name": "REF_KEY"},
					{"name": "EXH_PGM_NM"},
					{"name": "EXH_PGM_SHORT_NM"},
					{"name": "EXH_PGM_DESC"},
					{"name": "EXH_PGM_DIV_RCD"},
					{"name": "EXH_PGM_TYPE_RCD"},
					{"name": "FIRSR_DIV_RCD"},
					{"name": "EXH_PGM_DIV_NM"},
					{"name": "EXH_PGM_TYPE_NM"},
					{"name": "FIRSR_DIV_NM"},
					{"name": "PGM_MIN_TERM"},
					{"name": "PGM_MAX_TERM"},
					{"name": "TERM_UNIT_RCD"},
					{"name": "TERM_UNIT_NM"}
				],
				"rows": []
			});
			app.register(dataSet_1);
			
			var dataSet_2 = new cpr.data.DataSet("dsExhPgmDivList");
			dataSet_2.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_2);
			
			var dataSet_3 = new cpr.data.DataSet("dsExhPgmTypeList");
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
						"name": "strPgmType",
						"dataType": "string"
					},
					{
						"name": "strPgmCd",
						"dataType": "string"
					},
					{
						"name": "strStDt",
						"dataType": "string"
					},
					{
						"name": "strEndDt",
						"dataType": "string"
					},
					{
						"name": "strPgmNm",
						"dataType": "string"
					},
					{
						"name": "strPgmDiv",
						"dataType": "string"
					},
					{
						"name": "strKeyDate",
						"dataType": "string"
					}
				]
			});
			app.register(dataMap_1);
			var submission_1 = new cpr.protocols.Submission("subOnLoad");
			submission_1.action = "/csr/StdCsrExhPopup/";
			submission_1.mediaType = "application/x-www-form-urlencoded";
			submission_1.addResponseData(dataSet_2, false);
			submission_1.addResponseData(dataSet_3, false);
			app.register(submission_1);
			
			var submission_2 = new cpr.protocols.Submission("subList");
			submission_2.action = "/csr/StdCsrExhPopup/";
			submission_2.mediaType = "application/x-www-form-urlencoded";
			submission_2.addRequestData(dataMap_1);
			submission_2.addResponseData(dataSet_1, false);
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
			var group_1 = new cpr.controls.Container("grp_rptCsrExhPgm");
			// Layout
			var xYLayout_2 = new cpr.controls.layouts.XYLayout();
			group_1.setLayout(xYLayout_2);
			(function(container){
				var grid_1 = linker.grid_1 = new cpr.controls.Grid("grdCsrExhPgm");
				grid_1.init({
					"dataSet": app.lookup("dsCsrExhPgm"),
					"columns": [
						{"width": "115px"},
						{"width": "110px"},
						{"width": "115px"},
						{"width": "75px"},
						{"width": "70px"},
						{"width": "70px"},
						{"width": "70px"},
						{"width": "70px"},
						{
							"width": "84px",
							"visible": false
						},
						{
							"width": "84px",
							"visible": false
						},
						{
							"width": "90px",
							"visible": false
						},
						{
							"width": "97px",
							"visible": false
						},
						{
							"width": "110px",
							"visible": false
						},
						{
							"width": "89px",
							"visible": false
						},
						{
							"width": "91px",
							"visible": false
						}
					],
					"header": {
						"rows": [{"height": "27px"}],
						"cells": [
							{
								"constraint": {"rowIndex": 0, "colIndex": 0},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-DB-EXH_PGM_CD");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 1},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-DB-EXH_PGM_NM");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 2},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-SCR-DIV");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 3},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-SCR-TYPE");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 4},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-GLS-FIRSR");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 5},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-SCR-MINTERM");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 6},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-SCR-MAXTERM");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 7},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-SCR-TERMUNIT");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 8},
								"configurator": function(cell){
									cell.text = "구분코드";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 9},
								"configurator": function(cell){
									cell.text = "유형코드";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 10},
								"configurator": function(cell){
									cell.text = "재원코드";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 11},
								"configurator": function(cell){
									cell.text = "기간단위코드";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 12},
								"configurator": function(cell){
									cell.text = "참조키";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 13},
								"configurator": function(cell){
									cell.text = "시작일자";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 14},
								"configurator": function(cell){
									cell.text = "종료일자";
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
									cell.columnName = "EXH_PGM_CD";
									cell.style.css({
										"text-align" : "center"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 1},
								"configurator": function(cell){
									cell.columnName = "EXH_PGM_NM";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 2},
								"configurator": function(cell){
									cell.columnName = "EXH_PGM_DIV_NM";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 3},
								"configurator": function(cell){
									cell.columnName = "EXH_PGM_TYPE_NM";
									cell.style.css({
										"text-align" : "center"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 4},
								"configurator": function(cell){
									cell.columnName = "FIRSR_DIV_NM";
									cell.style.css({
										"text-align" : "center"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 5},
								"configurator": function(cell){
									cell.columnName = "PGM_MIN_TERM";
									cell.style.css({
										"text-align" : "center"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 6},
								"configurator": function(cell){
									cell.columnName = "PGM_MAX_TERM";
									cell.style.css({
										"text-align" : "center"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 7},
								"configurator": function(cell){
									cell.columnName = "TERM_UNIT_NM";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 8},
								"configurator": function(cell){
									cell.columnName = "EXH_PGM_DIV_RCD";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 9},
								"configurator": function(cell){
									cell.columnName = "EXH_PGM_TYPE_RCD";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 10},
								"configurator": function(cell){
									cell.columnName = "FIRSR_DIV_RCD";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 11},
								"configurator": function(cell){
									cell.columnName = "TERM_UNIT_RCD";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 12},
								"configurator": function(cell){
									cell.columnName = "REF_KEY";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 13},
								"configurator": function(cell){
									cell.columnName = "ST_DT";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 14},
								"configurator": function(cell){
									cell.columnName = "END_DT";
								}
							}
						]
					}
				});
				if(typeof onGrdCsrExhPgmRowDblclick == "function") {
					grid_1.addEventListener("row-dblclick", onGrdCsrExhPgmRowDblclick);
				}
				container.addChild(grid_1, {
					"top": "30px",
					"left": "5px",
					"width": "710px",
					"height": "258px"
				});
				var userDefinedControl_1 = linker.userDefinedControl_1 = new udc.com.comTitle();
				userDefinedControl_1.bind("title").toLanguage("UI-SCR-EXCGPGLST");
				container.addChild(userDefinedControl_1, {
					"top": "5px",
					"left": "5px",
					"width": "280px",
					"height": "25px"
				});
			})(group_1);
			container.addChild(group_1, {
				"top": "97px",
				"left": "5px",
				"width": "720px",
				"height": "293px"
			});
			
			var button_1 = new cpr.controls.Button("btnCloseCancel");
			button_1.value = "";
			button_1.bind("value").toLanguage("UI-SCR-SCRNCLS");
			if(typeof onBtnCloseCancelClick == "function") {
				button_1.addEventListener("click", onBtnCloseCancelClick);
			}
			container.addChild(button_1, {
				"top": "395px",
				"left": "5px",
				"width": "60px",
				"height": "25px"
			});
			
			var button_2 = new cpr.controls.Button("btnCloseOk");
			button_2.value = "";
			button_2.bind("value").toLanguage("UI-SCR-CHOICLS");
			if(typeof onBtnCloseOkClick == "function") {
				button_2.addEventListener("click", onBtnCloseOkClick);
			}
			container.addChild(button_2, {
				"top": "395px",
				"left": "665px",
				"width": "60px",
				"height": "25px"
			});
			
			var group_2 = new cpr.controls.Container("grpSearch");
			group_2.style.setClasses(["search-box"]);
			// Layout
			var xYLayout_3 = new cpr.controls.layouts.XYLayout();
			group_2.setLayout(xYLayout_3);
			(function(container){
				var output_1 = new cpr.controls.Output("optExhPgmCd");
				output_1.value = "";
				output_1.bind("value").toLanguage("UI-DB-EXH_PGM_CD");
				container.addChild(output_1, {
					"top": "30px",
					"left": "5px",
					"width": "110px",
					"height": "25px"
				});
				var inputBox_1 = new cpr.controls.InputBox("ipbExhPgmCd");
				inputBox_1.bind("fieldLabel").toExpression("#optStudId.value");
				inputBox_1.bind("value").toDataMap(app.lookup("dmReqKey"), "strPgmCd");
				if(typeof onIpbExhPgmCdKeydown == "function") {
					inputBox_1.addEventListener("keydown", onIpbExhPgmCdKeydown);
				}
				container.addChild(inputBox_1, {
					"top": "30px",
					"left": "120px",
					"width": "70px",
					"height": "25px"
				});
				var output_2 = new cpr.controls.Output("optExhPgmNm");
				output_2.value = "";
				output_2.bind("value").toLanguage("UI-DB-EXH_PGM_NM");
				container.addChild(output_2, {
					"top": "30px",
					"left": "200px",
					"width": "95px",
					"height": "25px"
				});
				var inputBox_2 = new cpr.controls.InputBox("ipbExhPgmNm");
				inputBox_2.bind("fieldLabel").toExpression("#optStudNm.value");
				inputBox_2.bind("value").toDataMap(app.lookup("dmReqKey"), "strPgmNm");
				if(typeof onIpbExhPgmNmKeydown == "function") {
					inputBox_2.addEventListener("keydown", onIpbExhPgmNmKeydown);
				}
				container.addChild(inputBox_2, {
					"top": "30px",
					"left": "300px",
					"width": "135px",
					"height": "25px"
				});
				var output_3 = new cpr.controls.Output("optExhPgmDivRcd");
				output_3.value = "";
				output_3.bind("value").toLanguage("UI-SCR-EXCHGDIV");
				container.addChild(output_3, {
					"top": "5px",
					"left": "5px",
					"width": "110px",
					"height": "25px"
				});
				var button_3 = new cpr.controls.Button("btnSearch");
				button_3.value = "";
				button_3.style.setClasses(["btn-search"]);
				button_3.bind("value").toLanguage("UI-SCR-SCH");
				if(typeof onBtnSearchClick == "function") {
					button_3.addEventListener("click", onBtnSearchClick);
				}
				container.addChild(button_3, {
					"top": "5px",
					"left": "655px",
					"width": "60px",
					"height": "25px"
				});
				var comboBox_1 = new cpr.controls.ComboBox("cbbExhPgmDivRcd");
				comboBox_1.bind("value").toDataMap(app.lookup("dmReqKey"), "strPgmDiv");
				(function(comboBox_1){
					comboBox_1.addItem(new cpr.controls.Item("전체", ""));
					comboBox_1.setItemSet(app.lookup("dsExhPgmDivList"), {
						"label": "CD_NM",
						"value": "CD"
					});
				})(comboBox_1);
				container.addChild(comboBox_1, {
					"top": "5px",
					"left": "120px",
					"width": "140px",
					"height": "25px"
				});
				var output_4 = new cpr.controls.Output("optExhPgmTypeRcd");
				output_4.value = "";
				output_4.bind("value").toLanguage("UI-SCR-EXCHGPGTYP");
				container.addChild(output_4, {
					"top": "5px",
					"left": "270px",
					"width": "110px",
					"height": "25px"
				});
				var comboBox_2 = new cpr.controls.ComboBox("cbbExhPgmTypeRcd");
				comboBox_2.bind("value").toDataMap(app.lookup("dmReqKey"), "strPgmType");
				(function(comboBox_2){
					comboBox_2.addItem(new cpr.controls.Item("전체", ""));
					comboBox_2.setItemSet(app.lookup("dsExhPgmTypeList"), {
						"label": "CD_NM",
						"value": "CD"
					});
				})(comboBox_2);
				container.addChild(comboBox_2, {
					"top": "5px",
					"left": "385px",
					"width": "100px",
					"height": "25px"
				});
				var output_5 = new cpr.controls.Output("ipbExhPgmDivRcd");
				output_5.visible = false;
				output_5.value = "";
				container.addChild(output_5, {
					"top": "5px",
					"left": "120px",
					"width": "140px",
					"height": "25px"
				});
				var output_6 = new cpr.controls.Output("ipbExhPgmTypeRcd");
				output_6.visible = false;
				output_6.value = "";
				container.addChild(output_6, {
					"top": "5px",
					"left": "385px",
					"width": "150px",
					"height": "25px"
				});
			})(group_2);
			container.addChild(group_2, {
				"top": "35px",
				"left": "5px",
				"width": "720px",
				"height": "57px"
			});
			
			var userDefinedControl_2 = new udc.com.appHeader("appheader1");
			container.addChild(userDefinedControl_2, {
				"top": "5px",
				"right": "5px",
				"left": "5px",
				"height": "25px"
			});
			if(typeof onBodyLoad == "function"){
				app.addEventListener("load", onBodyLoad);
			}
			// Linking
			linker.userDefinedControl_1.ctrl = linker.grid_1;
		}
	});
	app.title = "학생검색팝업";
	cpr.core.Platform.INSTANCE.register(app);
})();
