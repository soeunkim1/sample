/*
 * App URI: app/cmn/stdCmnCOuterUserMgt
 * Source Location: app/cmn/stdCmnCOuterUserMgt.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("app/cmn/stdCmnCOuterUserMgt", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			var util = new ComUtil(app);
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
			 *  4. oBdMno					: 건물번호
			 *  5. oAddr						: 주소
			 *  6. func						: 팝업에서 선택한 값을 받은 후 추가 로직이 필요한 경우 함수 작성
			 * @member impStdCmnPZipSearch
			 * @type Array
			 * @author hyunteak at 15. 12. 09
			 */ 
			//moIdsForStdCmnPZipSearch = [
			//	 { 
			//		 controlId					: "btnFrfZipCode",		//(필수)우편번호검색
			//		 oZipCode					: "ipbFrfZipcode",	//리턴 우편번호
			//		 oZipSeq					: "ipbFrfZipseq",	//리턴 우편일련번호
			//		 oBdMno					: "",	//리턴 우편일련번호
			//		 oAddr						: "optFrfAddr1",		//리턴 주소
			//		 oAddrDtl					: "ipbFrfAddr2",		//리턴 주소
			//		 func : function(poParam){
			//
			//		 }
			//	 }
			// ];	
			
			/*
			 * Body에서 load 이벤트 발생 시 호출.
			 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
			 */
			function onBodyLoad(/* cpr.events.CEvent */ e){
				//리피트 초기 설정
			//	ExtRepeat.init("rptCmnPartyOutside");
				//검색조건 초기 설정
			//	ExtGroup.initSearchBox("grpSearch", "grpData");
			
				//DataSet Info 설정 및 IgnoreReqPk = Y 설정.	
			//	ExtRepeat.addOriginCol("rptCmnPartyOutside", ["SSN"]);
				
				
				//서브미션 실행 (실패시 cover page)
				util.Submit.send(app, "subOnLoad", function(pbSuccess){
					if(pbSuccess) {
						util.Control.setFocus(app, "ipbUserNm");
						util.Control.redraw(app, ["grpCmnPartyOutside"]);
					}
				}, true);
			}
			
			/*
			 * "" 버튼에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onBtnSearchClick(/* cpr.events.CMouseEvent */ e){
				/** 
				 * @type cpr.controls.Button
				 */
				var btnSearch = e.control;
				
				//그리드 변경여부 체크
				if(util.Grid.isModified(app, "grdCmnPartyOutside", "CRM")) return false;
				
				//조회조건 필수값 체크
				if(!util.validate(app, ["grpSearch"])) return false;
				
				doList(function(pbSuccess){
					if(pbSuccess){
						//조회되었습니다.
						util.Msg.notify(app, "NLS-INF-M024");
					};
				});
			};
			
			/**
			 * doList  외부사용자목록을 조회한다.  
			 * @param {Function} poCallBackFunc 콜백정의
			 * @return void
			 */
			function doList(poCallBackFunc) {
				util.Submit.send(app, "subList", function(pbSuccess){
					if(pbSuccess) {
						util.Control.redraw(app, ["grdCmnPartyOutside"]);
						
						//expression binding으로 설정.
			//			var vnCnt = util.Grid.getRowCount("grdCmnPartyOutside");
			//			if(vnCnt < 1) {
			//				util.Control.reset(["grpCmnPartyOutside"]);
			//				util.Control.setEnable(false, ["grpCmnPartyOutside"]);
			//			};
						
						// 조회 후 콜백함수 수행
						if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
					};
				}, true);
			};
			
			/*
			 * 그리드에서 selection-change 이벤트 발생 시 호출.
			 * detail의 cell 클릭하여 설정된 selectionunit에 해당되는 단위가 선택될 때 발생하는 이벤트.
			 */
			function onGrdCmnPartyOutsideSelectionChange(/* cpr.events.CSelectionEvent */ e){
				/** 
				 * @type cpr.controls.Grid
				 */
				var grdCmnPartyOutside = e.control;
			//	doSelectRptCmnPartyOutside();
			};
			
			/**
			 * expression binding으로 설정.
			 */
			//function doSelectRptCmnPartyOutside() {
			//	var vnIdx = util.Grid.getIndex("grdCmnPartyOutside");
				// 프리폼 활성화 비활성화 제어 -> expression binding
			//	doCompareFrfEnable(vnIdx);
			//	리피트 특정 row 데이터를 프리폼 copy -> 상대컬럼 binding
			//	ExtRepeat.copyRowForm("rptCmnPartyOutside", "frfCmnPartyOutside", vnIndex);
			//};
			
			///**
			// * @desc 셀렉트 여부에 따라 프리폼 활성화 제어
			// * @param {Number} pnIndex 
			// * @return void
			// * @author 최동원 2018. 04. 10.
			// */
			//function doCompareFrfEnable(pnIdx) {
			//	if( ValueUtil.isNull(pnIdx) || !util.Control.isEnable("grdCmnPartyOutside") 
			//			|| util.Grid.getRowState("grdCmnPartyOutside", pnIdx) == cpr.data.tabledata.RowState.DELETED) {
			//		util.Control.setEnable(false, ["grpCmnPartyOutside"]);
			//	}else{
			//		util.Control.setEnable(true, ["grpCmnPartyOutside"]);
			//	};
			//};
			
			/*
			 * 사용자 정의 컨트롤에서 insert 이벤트 발생 시 호출.
			 */
			function onGrid_ids_btn1Insert(/* cpr.event.CUIEvent */ e){
				/** 
				 * @type udc.com.grid_IDS_Btn
				 */
				var grid_ids_btn1 = e.control;
				
				util.Control.setFocus(app, "ipbFrfOtsId");
			}
			
			/*
			 * 사용자 정의 컨트롤에서 save 이벤트 발생 시 호출.
			 */
			function onGrid_ids_btn1Save(/* cpr.event.CUIEvent */ e){
				/** 
				 * @type udc.com.grid_IDS_Btn
				 */
				var grid_ids_btn1 = e.control;
				doSave();
			};
			
			/**
			 * @desc  [외부사용자목록] 작업저장 click event 
			 * @param {Function} poCallBackFunc 콜백정의
			 * @return void
			 * @author 최동원 2018. 04. 10.
			 */
			function doSave() {
				//그리드 변경사항 체크
				if( !util.Grid.isModified(app, ["grdCmnPartyOutside"], "MSG") ) return false;
				
				//그리드 validation check
				if( !util.validate(app, "grdCmnPartyOutside") ) return false;
				
				util.Submit.send(app, "subSave", function(pbSuccess){
					if(pbSuccess) {
						doList(function(pbListSuccess){
							if(pbListSuccess) {
								util.Msg.notify(app, "NLS-INF-M025");
							};
						});
					};
				}, false);
			}
			
			/*
			 * 그룹에서 keydown 이벤트 발생 시 호출.
			 * 사용자가 키를 누를 때 발생하는 이벤트.
			 */
			function onGrpSearchKeydown(/* cpr.events.CKeyboardEvent */ e){
				/** 
				 * @type cpr.controls.Container
				 */
				var grpSearch = e.control;
				if(e.keyCode == cpr.events.KeyCode.ENTER){
					/** @type udc.com.btnSearch*/	
					var btnSearch = app.lookup("btnSearch");
					btnSearch.click();
				}
			}
			
			/*
			 * 사용자 정의 컨트롤에서 idrCommonEvent 이벤트 발생 시 호출.
			 */
			function onGrid_ids_btn1IdrCommonEvent(/* cpr.events.CUIEvent */ e){
				/** 
				 * @type udc.com.grid_IDS_Btn
				 */
				var grid_ids_btn1 = e.control;
				util.Control.redraw(app, "grpCmnPartyOutside");
			};
			// End - User Script
			
			// Header
			var dataSet_1 = new cpr.data.DataSet("dsGenderRcdList");
			dataSet_1.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_1);
			
			var dataSet_2 = new cpr.data.DataSet("dsLnrSlrDivRcdList");
			dataSet_2.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_2);
			
			var dataSet_3 = new cpr.data.DataSet("dsNatRcdList");
			dataSet_3.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_3);
			
			var dataSet_4 = new cpr.data.DataSet("dsCmnPartyOutside");
			dataSet_4.parseData({
				"info": "CMN_PARTY_OUTSIDE@OTS_ID",
				"columns": [
					{"name": "OTS_ID"},
					{"name": "SSN"},
					{"name": "KOR_NM"},
					{"name": "ENG_NM"},
					{"name": "CHA_NM"},
					{"name": "GENDER_RCD"},
					{"name": "BIRTHDAY"},
					{"name": "LNR_SLR_DIV_RCD"},
					{"name": "EMAIL"},
					{"name": "CLP_NO"},
					{"name": "ADDR1"},
					{"name": "ZIPCODE"},
					{"name": "ZIPSEQ"},
					{"name": "ADDR2"},
					{"name": "HOME_TEL_NO"},
					{"name": "NAT_RCD"},
					{"name": "REMARK1"},
					{"name": "REMARK2"}
				],
				"rows": []
			});
			app.register(dataSet_4);
			
			var dataSet_5 = new cpr.data.DataSet("dsFrfCmnPartyOutside");
			dataSet_5.parseData({
				"columns": [
					{"name": "OTS_ID"},
					{"name": "SSN"},
					{"name": "KOR_NM"},
					{"name": "ENG_NM"},
					{"name": "CHA_NM"},
					{"name": "GENDER_RCD"},
					{"name": "BIRTHDAY"},
					{"name": "LNR_SLR_DIV_RCD"},
					{"name": "EMAIL"},
					{"name": "CLP_NO"},
					{"name": "ADDR1"},
					{"name": "ZIPCODE"},
					{"name": "ZIPSEQ"},
					{"name": "ADDR2"},
					{"name": "HOME_TEL_NO"},
					{"name": "NAT_RCD"},
					{"name": "REMARK1"},
					{"name": "REMARK2"}
				],
				"rows": []
			});
			app.register(dataSet_5);
			var dataMap_1 = new cpr.data.DataMap("dmReqList");
			dataMap_1.parseData({
				"columns" : [
					{
						"name": "strUserId",
						"dataType": "string"
					},
					{
						"name": "strUserNm",
						"dataType": "string"
					}
				]
			});
			app.register(dataMap_1);
			var submission_1 = new cpr.protocols.Submission("subOnLoad");
			submission_1.action = "/cmn/StdCmnOuterUserMgt/";
			submission_1.mediaType = "application/x-www-form-urlencoded";
			submission_1.addResponseData(dataSet_1, false);
			submission_1.addResponseData(dataSet_2, false);
			submission_1.addResponseData(dataSet_3, false);
			app.register(submission_1);
			
			var submission_2 = new cpr.protocols.Submission("subList");
			submission_2.action = "/cmn/StdCmnOuterUserMgt/";
			submission_2.mediaType = "application/x-www-form-urlencoded";
			submission_2.addRequestData(dataMap_1);
			submission_2.addResponseData(dataSet_4, false);
			app.register(submission_2);
			
			var submission_3 = new cpr.protocols.Submission("subSave");
			submission_3.action = "/cmn/StdCmnOuterUserMgt/";
			submission_3.mediaType = "application/x-www-form-urlencoded";
			submission_3.addRequestData(dataSet_4);
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
					"top": "5px",
					"left": "1160px",
					"width": "60px",
					"height": "25px"
				});
				var output_1 = new cpr.controls.Output("optUserId");
				output_1.value = "외부인ID";
				container.addChild(output_1, {
					"top": "5px",
					"left": "5px",
					"width": "100px",
					"height": "25px"
				});
				var inputBox_1 = new cpr.controls.InputBox("ipbUserId");
				inputBox_1.bind("fieldLabel").toExpression("#optUserId.value");
				inputBox_1.bind("value").toDataMap(app.lookup("dmReqList"), "strUserId");
				if(typeof onIpbUserIdKeydown == "function") {
					inputBox_1.addEventListener("keydown", onIpbUserIdKeydown);
				}
				container.addChild(inputBox_1, {
					"top": "5px",
					"left": "110px",
					"width": "120px",
					"height": "25px"
				});
				var output_2 = new cpr.controls.Output("optUserNm");
				output_2.value = "사용자명";
				container.addChild(output_2, {
					"top": "5px",
					"left": "240px",
					"width": "100px",
					"height": "25px"
				});
				var inputBox_2 = new cpr.controls.InputBox("ipbUserNm");
				inputBox_2.bind("fieldLabel").toExpression("#optUserNm.value");
				inputBox_2.bind("value").toDataMap(app.lookup("dmReqList"), "strUserNm");
				if(typeof onIpbUserNmKeydown == "function") {
					inputBox_2.addEventListener("keydown", onIpbUserNmKeydown);
				}
				container.addChild(inputBox_2, {
					"top": "5px",
					"left": "345px",
					"width": "130px",
					"height": "25px"
				});
			})(group_1);
			container.addChild(group_1, {
				"top": "35px",
				"left": "5px",
				"width": "1225px",
				"height": "32px"
			});
			
			var group_2 = new cpr.controls.Container("grpData");
			// Layout
			var xYLayout_3 = new cpr.controls.layouts.XYLayout();
			group_2.setLayout(xYLayout_3);
			(function(container){
				var userDefinedControl_2 = linker.userDefinedControl_2 = new udc.com.comTitle();
				userDefinedControl_2.bind("title").toLanguage("");
				container.addChild(userDefinedControl_2, {
					"top": "5px",
					"left": "5px",
					"width": "265px",
					"height": "25px"
				});
				var button_2 = new cpr.controls.Button("btnNew");
				button_2.value = "신규";
				button_2.style.setClasses(["btn-new"]);
				if(typeof onBtnNewClick == "function") {
					button_2.addEventListener("click", onBtnNewClick);
				}
				container.addChild(button_2, {
					"top": "5px",
					"left": "965px",
					"width": "60px",
					"height": "25px"
				});
				var button_3 = new cpr.controls.Button("btnDel");
				button_3.value = "삭제";
				button_3.style.setClasses(["btn-delete"]);
				if(typeof onBtnDelClick == "function") {
					button_3.addEventListener("click", onBtnDelClick);
				}
				container.addChild(button_3, {
					"top": "5px",
					"left": "1030px",
					"width": "60px",
					"height": "25px"
				});
				var button_4 = new cpr.controls.Button("btnRestore");
				button_4.value = "취소";
				button_4.style.setClasses(["btn-restore"]);
				if(typeof onBtnRestoreClick == "function") {
					button_4.addEventListener("click", onBtnRestoreClick);
				}
				container.addChild(button_4, {
					"top": "5px",
					"left": "1095px",
					"width": "60px",
					"height": "25px"
				});
				var button_5 = new cpr.controls.Button("btnSave");
				button_5.value = "저장";
				button_5.style.setClasses(["btn-save"]);
				if(typeof onBtnSaveClick == "function") {
					button_5.addEventListener("click", onBtnSaveClick);
				}
				container.addChild(button_5, {
					"top": "5px",
					"left": "1160px",
					"width": "60px",
					"height": "25px"
				});
				var grid_1 = linker.grid_1 = new cpr.controls.Grid("grdCmnPartyOutside");
				grid_1.init({
					"dataSet": app.lookup("dsCmnPartyOutside"),
					"columns": [
						{"width": "25px"},
						{"width": "25px"},
						{"width": "40px"},
						{"width": "128px"},
						{"width": "127px"},
						{"width": "131px"},
						{"width": "137px"},
						{"width": "130px"},
						{
							"width": "52px",
							"visible": false
						},
						{
							"width": "83px",
							"visible": false
						},
						{
							"width": "68px",
							"visible": false
						},
						{
							"width": "101px",
							"visible": false
						},
						{
							"width": "100px",
							"visible": false
						},
						{
							"width": "66px",
							"visible": false
						},
						{
							"width": "197px",
							"visible": false
						},
						{
							"width": "179px",
							"visible": false
						},
						{
							"width": "102px",
							"visible": false
						},
						{
							"width": "80px",
							"visible": false
						},
						{
							"width": "92px",
							"visible": false
						},
						{
							"width": "92px",
							"visible": false
						},
						{
							"width": "92px",
							"visible": false
						}
					],
					"header": {
						"rows": [{"height": "27px"}],
						"cells": [
							{
								"constraint": {"rowIndex": 0, "colIndex": 0},
								"configurator": function(cell){
									cell.columnType = "checkbox";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 1},
								"configurator": function(cell){
									cell.text = "F";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 2},
								"configurator": function(cell){
									cell.text = "No";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 3},
								"configurator": function(cell){
									cell.text = "외부인ID";
									cell.style.setClasses(["require"]);
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 4},
								"configurator": function(cell){
									cell.text = "사회보장번호";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 5},
								"configurator": function(cell){
									cell.text = "한글명";
									cell.style.setClasses(["require"]);
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 6},
								"configurator": function(cell){
									cell.text = "영문명";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 7},
								"configurator": function(cell){
									cell.text = "한자명";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 8},
								"configurator": function(cell){
									cell.text = "성별";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 9},
								"configurator": function(cell){
									cell.text = "생년월일";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 10},
								"configurator": function(cell){
									cell.text = "양(음)력";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 11},
								"configurator": function(cell){
									cell.text = "E-Mail";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 12},
								"configurator": function(cell){
									cell.text = "휴대전화번호";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 13},
								"configurator": function(cell){
									cell.text = "우편번호";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 14},
								"configurator": function(cell){
									cell.text = "주소";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 15},
								"configurator": function(cell){
									cell.text = "상세주소";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 16},
								"configurator": function(cell){
									cell.text = "자택전화번호";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 17},
								"configurator": function(cell){
									cell.text = "국가";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 18},
								"configurator": function(cell){
									cell.text = "우편일련번호";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 19},
								"configurator": function(cell){
									cell.text = "비고1";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 20},
								"configurator": function(cell){
									cell.text = "비고2";
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
									cell.columnType = "checkbox";
									cell.style.css({
										"text-align" : "center"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 1},
								"configurator": function(cell){
									cell.control = (function(){
										var output_3 = new cpr.controls.Output();
										output_3.style.css({
											"text-align" : "center"
										});
										return output_3;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 2},
								"configurator": function(cell){
									cell.columnType = "rowindex";
									cell.style.css({
										"text-align" : "center"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 3},
								"configurator": function(cell){
									cell.columnName = "OTS_ID";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 4},
								"configurator": function(cell){
									cell.columnName = "SSN";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 5},
								"configurator": function(cell){
									cell.columnName = "KOR_NM";
									cell.style.css({
										"text-align" : "center"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 6},
								"configurator": function(cell){
									cell.columnName = "ENG_NM";
									cell.style.css({
										"text-align" : "center"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 7},
								"configurator": function(cell){
									cell.columnName = "CHA_NM";
									cell.style.css({
										"text-align" : "center"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 8},
								"configurator": function(cell){
									cell.columnName = "GENDER_RCD";
									cell.control = (function(){
										var comboBox_1 = new cpr.controls.ComboBox("gdCbbGenderRcd");
										comboBox_1.enabled = false;
										comboBox_1.hideButton = true;
										comboBox_1.multiple = true;
										(function(comboBox_1){
											comboBox_1.setItemSet(app.lookup("dsGenderRcdList"), {
												"label": "CD_NM",
												"value": "CD"
											});
										})(comboBox_1);
										comboBox_1.bind("value").toDataColumn("GENDER_RCD");
										return comboBox_1;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 9},
								"configurator": function(cell){
									cell.columnName = "BIRTHDAY";
									cell.control = (function(){
										var output_4 = new cpr.controls.Output("gdOptBirthday");
										output_4.dataType = "date";
										output_4.format = "YYYY-MM-DD";
										output_4.style.css({
											"text-align" : "center"
										});
										output_4.bind("value").toDataColumn("BIRTHDAY");
										return output_4;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 10},
								"configurator": function(cell){
									cell.columnName = "LNR_SLR_DIV_RCD";
									cell.control = (function(){
										var comboBox_2 = new cpr.controls.ComboBox("gdOptLnrSlrDivRcd");
										comboBox_2.enabled = false;
										comboBox_2.hideButton = true;
										(function(comboBox_2){
											comboBox_2.setItemSet(app.lookup("dsLnrSlrDivRcdList"), {
												"label": "CD_NM",
												"value": "CD"
											});
										})(comboBox_2);
										comboBox_2.bind("value").toDataColumn("LNR_SLR_DIV_RCD");
										return comboBox_2;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 11},
								"configurator": function(cell){
									cell.columnName = "EMAIL";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 12},
								"configurator": function(cell){
									cell.columnName = "CLP_NO";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 13},
								"configurator": function(cell){
									cell.columnName = "ZIPCODE";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 14},
								"configurator": function(cell){
									cell.columnName = "ADDR1";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 15},
								"configurator": function(cell){
									cell.columnName = "ADDR2";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 16},
								"configurator": function(cell){
									cell.columnName = "HOME_TEL_NO";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 17},
								"configurator": function(cell){
									cell.columnName = "NAT_RCD";
									cell.control = (function(){
										var comboBox_3 = new cpr.controls.ComboBox("gdCbbNatRcd");
										comboBox_3.enabled = false;
										comboBox_3.hideButton = true;
										(function(comboBox_3){
											comboBox_3.setItemSet(app.lookup("dsNatRcdList"), {
												"label": "CD_NM",
												"value": "CD"
											});
										})(comboBox_3);
										comboBox_3.bind("value").toDataColumn("NAT_RCD");
										return comboBox_3;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 18},
								"configurator": function(cell){
									cell.columnName = "ZIPSEQ";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 19},
								"configurator": function(cell){
									cell.columnName = "REMARK1";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 20},
								"configurator": function(cell){
									cell.columnName = "REMARK2";
								}
							}
						]
					}
				});
				if(typeof onGrdCmnPartyOutsideSelectionChange == "function") {
					grid_1.addEventListener("selection-change", onGrdCmnPartyOutsideSelectionChange);
				}
				container.addChild(grid_1, {
					"top": "30px",
					"left": "5px",
					"width": "745px",
					"height": "564px"
				});
				var userDefinedControl_3 = new udc.com.comFormTitle();
				userDefinedControl_3.bind("title").toLanguage("");
				container.addChild(userDefinedControl_3, {
					"top": "5px",
					"left": "755px",
					"width": "150px",
					"height": "25px"
				});
				var group_3 = linker.group_3 = new cpr.controls.Container("frfCmnPartyOutside");
				group_3.style.setClasses(["form-box"]);
				// Layout
				var xYLayout_4 = new cpr.controls.layouts.XYLayout();
				group_3.setLayout(xYLayout_4);
				(function(container){
					var output_5 = new cpr.controls.Output("optFrfOtsId");
					output_5.value = "외부인ID";
					output_5.style.setClasses(["require"]);
					container.addChild(output_5, {
						"top": "5px",
						"left": "5px",
						"width": "100px",
						"height": "25px"
					});
					var inputBox_3 = new cpr.controls.InputBox("ipbFrfOtsId");
					inputBox_3.maxLength = 50;
					inputBox_3.userAttr({"require": "Y"});
					inputBox_3.bind("fieldLabel").toExpression("#optFrfOtsId.value");
					inputBox_3.bind("value").toDataColumn("OTS_ID");
					container.addChild(inputBox_3, {
						"top": "5px",
						"left": "110px",
						"width": "120px",
						"height": "25px"
					});
					var output_6 = new cpr.controls.Output("optFrfSsn");
					output_6.value = "";
					output_6.bind("value").toLanguage("UI-SCR-SSNNO");
					container.addChild(output_6, {
						"top": "5px",
						"left": "240px",
						"width": "100px",
						"height": "25px"
					});
					var inputBox_4 = new cpr.controls.InputBox("ipbFrfSsn");
					inputBox_4.maxLength = 30;
					inputBox_4.bind("fieldLabel").toExpression("#optSsn.value");
					inputBox_4.bind("value").toDataColumn("SSN");
					container.addChild(inputBox_4, {
						"top": "5px",
						"left": "345px",
						"width": "110px",
						"height": "25px"
					});
					var output_7 = new cpr.controls.Output("optFrfKorNm");
					output_7.value = "한글명";
					output_7.style.setClasses(["require"]);
					container.addChild(output_7, {
						"top": "30px",
						"left": "5px",
						"width": "100px",
						"height": "25px"
					});
					var inputBox_5 = new cpr.controls.InputBox("ipbFrfKorNm");
					inputBox_5.maxLength = 100;
					inputBox_5.bind("fieldLabel").toExpression("#optKorNm.value");
					inputBox_5.bind("value").toDataColumn("KOR_NM");
					container.addChild(inputBox_5, {
						"top": "30px",
						"left": "110px",
						"width": "120px",
						"height": "25px"
					});
					var output_8 = new cpr.controls.Output("optFrfEngNm");
					output_8.value = "영문명";
					container.addChild(output_8, {
						"top": "30px",
						"left": "240px",
						"width": "100px",
						"height": "25px"
					});
					var inputBox_6 = new cpr.controls.InputBox("ipbFrfEngNm");
					inputBox_6.maxLength = 100;
					inputBox_6.bind("fieldLabel").toExpression("#optEngNm.value");
					inputBox_6.bind("value").toDataColumn("ENG_NM");
					container.addChild(inputBox_6, {
						"top": "30px",
						"left": "345px",
						"width": "110px",
						"height": "25px"
					});
					var output_9 = new cpr.controls.Output("optFrfChaNm");
					output_9.value = "한자명";
					container.addChild(output_9, {
						"top": "55px",
						"left": "5px",
						"width": "100px",
						"height": "25px"
					});
					var inputBox_7 = new cpr.controls.InputBox("ipbFrfChaNm");
					inputBox_7.maxLength = 100;
					inputBox_7.bind("fieldLabel").toExpression("#optChaNm.value");
					inputBox_7.bind("value").toDataColumn("CHA_NM");
					container.addChild(inputBox_7, {
						"top": "55px",
						"left": "110px",
						"width": "120px",
						"height": "25px"
					});
					var output_10 = new cpr.controls.Output("optFrfGenderRcd");
					output_10.value = "성별";
					container.addChild(output_10, {
						"top": "55px",
						"left": "240px",
						"width": "100px",
						"height": "25px"
					});
					var comboBox_4 = new cpr.controls.ComboBox("cbbFrfGenderRcd");
					comboBox_4.bind("fieldLabel").toExpression("#optGenderRcd.value");
					comboBox_4.bind("value").toDataColumn("GENDER_RCD");
					(function(comboBox_4){
						comboBox_4.setItemSet(app.lookup("dsGenderRcdList"), {
							"label": "CD_NM",
							"value": "CD"
						});
					})(comboBox_4);
					container.addChild(comboBox_4, {
						"top": "55px",
						"left": "345px",
						"width": "110px",
						"height": "25px"
					});
					var output_11 = new cpr.controls.Output("optFrfBirthday");
					output_11.value = "생년월일";
					container.addChild(output_11, {
						"top": "80px",
						"left": "240px",
						"width": "100px",
						"height": "25px"
					});
					var output_12 = new cpr.controls.Output("optFrfLnrSlrDivRcd");
					output_12.value = "양(음)력";
					container.addChild(output_12, {
						"top": "80px",
						"left": "5px",
						"width": "100px",
						"height": "25px"
					});
					var comboBox_5 = new cpr.controls.ComboBox("cbbFrfLnrSlrDivRcd");
					comboBox_5.bind("fieldLabel").toExpression("#optLnrSlrDivRcd.value");
					comboBox_5.bind("value").toDataColumn("LNR_SLR_DIV_RCD");
					(function(comboBox_5){
						comboBox_5.setItemSet(app.lookup("dsLnrSlrDivRcdList"), {
							"label": "CD_NM",
							"value": "CD"
						});
					})(comboBox_5);
					container.addChild(comboBox_5, {
						"top": "80px",
						"left": "110px",
						"width": "120px",
						"height": "25px"
					});
					var output_13 = new cpr.controls.Output("optFrfEmail");
					output_13.value = "이메일";
					container.addChild(output_13, {
						"top": "105px",
						"left": "5px",
						"width": "100px",
						"height": "25px"
					});
					var inputBox_8 = new cpr.controls.InputBox("ipbFrfEmail");
					inputBox_8.maxLength = 100;
					inputBox_8.bind("fieldLabel").toExpression("#optEmail.value");
					inputBox_8.bind("value").toDataColumn("EMAIL");
					container.addChild(inputBox_8, {
						"top": "105px",
						"left": "110px",
						"width": "120px",
						"height": "25px"
					});
					var output_14 = new cpr.controls.Output("optFrfClpNo");
					output_14.value = "휴대전화번호";
					container.addChild(output_14, {
						"top": "180px",
						"left": "5px",
						"width": "100px",
						"height": "25px"
					});
					var inputBox_9 = new cpr.controls.InputBox("ipbFrfClpNo");
					inputBox_9.maxLength = 30;
					inputBox_9.bind("fieldLabel").toExpression("#optClpNo.value");
					inputBox_9.bind("value").toDataColumn("CLP_NO");
					container.addChild(inputBox_9, {
						"top": "180px",
						"left": "110px",
						"width": "120px",
						"height": "25px"
					});
					var output_15 = new cpr.controls.Output("optFrfAddr1");
					output_15.value = "";
					output_15.bind("value").toDataColumn("ADDR1");
					container.addChild(output_15, {
						"top": "130px",
						"left": "215px",
						"width": "240px",
						"height": "25px"
					});
					var output_16 = new cpr.controls.Output("optFrfZipcode");
					output_16.value = "주소";
					container.addChild(output_16, {
						"top": "130px",
						"left": "5px",
						"width": "100px",
						"height": "45px"
					});
					var inputBox_10 = new cpr.controls.InputBox("ipbFrfZipcode");
					inputBox_10.enabled = false;
					inputBox_10.maxLength = 10;
					inputBox_10.bind("fieldLabel").toExpression("#optZipcode.value");
					inputBox_10.bind("value").toDataColumn("ZIPCODE");
					container.addChild(inputBox_10, {
						"top": "130px",
						"left": "110px",
						"width": "75px",
						"height": "25px"
					});
					var inputBox_11 = new cpr.controls.InputBox("ipbFrfZipseq");
					inputBox_11.visible = false;
					inputBox_11.maxLength = 10;
					inputBox_11.bind("value").toDataColumn("CLP_NO");
					container.addChild(inputBox_11, {
						"top": "130px",
						"left": "215px",
						"width": "65px",
						"height": "25px"
					});
					var inputBox_12 = new cpr.controls.InputBox("ipbFrfAddr2");
					inputBox_12.maxLength = 500;
					inputBox_12.bind("value").toDataColumn("ADDR2");
					container.addChild(inputBox_12, {
						"top": "155px",
						"left": "110px",
						"width": "345px",
						"height": "25px"
					});
					var output_17 = new cpr.controls.Output("optFrfHomeTelNo");
					output_17.value = "집전화번호";
					container.addChild(output_17, {
						"top": "180px",
						"left": "240px",
						"width": "100px",
						"height": "25px"
					});
					var inputBox_13 = new cpr.controls.InputBox("ipbFrfHomeTelNo");
					inputBox_13.maxLength = 30;
					inputBox_13.bind("fieldLabel").toExpression("#optHomeTelNo.value");
					inputBox_13.bind("value").toDataColumn("HOME_TEL_NO");
					container.addChild(inputBox_13, {
						"top": "180px",
						"left": "345px",
						"width": "110px",
						"height": "25px"
					});
					var output_18 = new cpr.controls.Output("optFrfNatRcd");
					output_18.value = "국가";
					container.addChild(output_18, {
						"top": "105px",
						"left": "240px",
						"width": "100px",
						"height": "25px"
					});
					var comboBox_6 = new cpr.controls.ComboBox("cbbFrfNatRcd");
					comboBox_6.bind("fieldLabel").toExpression("#optNatRcd.value");
					comboBox_6.bind("value").toDataColumn("NAT_RCD");
					(function(comboBox_6){
						comboBox_6.setItemSet(app.lookup("dsNatRcdList"), {
							"label": "CD_NM",
							"value": "CD"
						});
					})(comboBox_6);
					container.addChild(comboBox_6, {
						"top": "105px",
						"left": "345px",
						"width": "110px",
						"height": "25px"
					});
					var dateInput_1 = new cpr.controls.DateInput("dipFrfBirthday");
					dateInput_1.format = "YYYY-MM-DD";
					dateInput_1.style.css({
						"text-align" : "center"
					});
					dateInput_1.bind("value").toDataColumn("BIRTHDAY");
					container.addChild(dateInput_1, {
						"top": "80px",
						"left": "345px",
						"width": "110px",
						"height": "25px"
					});
					var button_6 = new cpr.controls.Button("btnFrfZipCode");
					button_6.value = "";
					button_6.style.setClasses(["btn-pop-search"]);
					if(typeof onBtnFrfZipCodeClick == "function") {
						button_6.addEventListener("click", onBtnFrfZipCodeClick);
					}
					container.addChild(button_6, {
						"top": "130px",
						"left": "190px",
						"width": "20px",
						"height": "25px"
					});
					var output_19 = new cpr.controls.Output("optFrfRemark1");
					output_19.value = "비고1";
					container.addChild(output_19, {
						"top": "205px",
						"left": "5px",
						"width": "100px",
						"height": "100px"
					});
					var textArea_1 = new cpr.controls.TextArea("txtFrfRemark1");
					textArea_1.maxLength = 1000;
					textArea_1.bind("value").toDataColumn("REMARK1");
					container.addChild(textArea_1, {
						"top": "205px",
						"left": "110px",
						"width": "345px",
						"height": "100px"
					});
					var output_20 = new cpr.controls.Output("optFrfRemark2");
					output_20.value = "비고2";
					container.addChild(output_20, {
						"top": "310px",
						"left": "5px",
						"width": "100px",
						"height": "80px"
					});
					var textArea_2 = new cpr.controls.TextArea("txtFrfRemark2");
					textArea_2.maxLength = 1000;
					textArea_2.bind("value").toDataColumn("REMARK2");
					container.addChild(textArea_2, {
						"top": "310px",
						"left": "110px",
						"width": "345px",
						"height": "80px"
					});
				})(group_3);
				container.addChild(group_3, {
					"top": "30px",
					"left": "755px",
					"width": "465px",
					"height": "564px"
				});
			})(group_2);
			container.addChild(group_2, {
				"top": "72px",
				"left": "5px",
				"width": "1225px",
				"height": "600px"
			});
			
			var embeddedApp_1 = new cpr.controls.EmbeddedApp("emaStdCmnPZipSch");
			cpr.core.App.load("app/cmn/impStdCmnPZipSearch", function(app) {
				if(app){
					embeddedApp_1.app = app;
				}
			});
			container.addChild(embeddedApp_1, {
				"top": "677px",
				"left": "35px",
				"width": "50px",
				"height": "25px"
			});
			if(typeof onBodyLoad == "function"){
				app.addEventListener("load", onBodyLoad);
			}
			// Linking
			linker.userDefinedControl_2.ctrl = linker.grid_1;
			linker.group_3.setBindContext(new cpr.bind.GridSelectionContext(linker.grid_1));
		}
	});
	app.title = "stdCmnCOuterUserMgt";
	cpr.core.Platform.INSTANCE.register(app);
})();
