/*
 * App URI: app/cmn/stdCmnCRuleSetMgt
 * Source Location: app/cmn/stdCmnCRuleSetMgt.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("app/cmn/stdCmnCRuleSetMgt", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			//공통 모듈 사용
			var util = new ComUtil(app);
			
			/*
			 * Body에서 load 이벤트 발생 시 호출.
			 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
			 */
			function onBodyLoad( /* cpr.events.CEvent */ e) {
				
				//서브미션 실행 (실패시 cover page)
				util.Submit.send(app, "subOnLoad", function(pbSuccess) {
					if (pbSuccess) {
						// 콤보박스컨트롤 리빌드
						util.Control.redraw(app, "cbbCurAplyYear");
			
						// 룰셋명컨트롤 포커스
						util.Control.setFocus(app, "ipbRuleSetNm");
					}
				}, true);
			} //onBodyLoad()
			
			/*
			 * "" 버튼에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onBtnSearchClick( /* cpr.events.CMouseEvent */ e) {
				/** 
				 * @type cpr.controls.Button
				 */
				var btnSearch = e.control;
			
				// 데이터 변경상태 체크 메시지(기본, 임베디드 앱 존재 할 경우 isChangedFormData())
				if (util.Grid.isModified(app, "grdCmnRuleSet", "CRM")) {
					return false;
				} else {
					if(util.Grid.getIndex(app, "grdCmnRuleSet") != -1 ){
						util.Grid.revertAllData(app, "grdCmnRuleSet");
					}
				}
			
				// 조회조건 필수체크 : 교과과정적용학년도, 부서명 
				if (!util.validate(app, ["cbbCurAplyYear", "cmnobjsch1"])) {
					return false;
				}
				doList(function(pbSuccess) {
					// 조회 : "조회되었습니다." header 메세지 표시
					if (pbSuccess) {
						//seletRows를 하므로 동일한 메세지 발생
						util.Control.redraw(app, "grdCmnRuleEle");
						var vnCnt = util.Grid.getRowCount(app, "grdCmnRuleEle");
						if(vnCnt > 0){
							util.Grid.selectRow(app, "grdCmnRuleEle", 0);
						}
					}
				});
			} //onBtnSearchClick()
			
			function doList(poCallBackFunc) {
				// 조회 서브미션 호출
				util.Submit.send(app, "subList", function(pbSuccess) {
					if (pbSuccess) {
						util.Control.redraw(app, "grdCmnRuleEle");
						var vnCnt = util.Grid.getRowCount(app, "grdCmnRuleEle");
						//마스터에 데이터가 없을 경우 디테일 입력 불가
						if (vnCnt == -1) {
							util.Control.setEnable(app, false, "grpDataDtl");
							util.Control.reset(app, app, "grdCmnRuleSet");
						}
						// 조회 후 콜백함수 수행
						if (util.isFunc(poCallBackFunc)) {
							poCallBackFunc(pbSuccess);
						}
					}
				});
			} //doList()
			
			/**
			 * @desc   룰셋목록 rowselect event
			 *         구성요소목록 조회한다.
			 * @return void
			 */
			function doListMstRowSelectDtl(vsRuleEleIndex) {
				// 구성요소변경내역이 있을 경우
				if (util.Grid.isModified(app, "grdCmnRuleSet", "CRM")) {
					util.Grid.selectRow(app, "grdCmnRuleEle", util.Grid.getIndex(app, "grdCmnRuleEle"));
					return false;
				}
				// 룰셋목록에서 선택된 행으로 구성요소목록 조회
				doListDtl(function(pbSuccess) {
					// 조회 : "조회되었습니다." header 메세지 표시
					if (pbSuccess) {
						util.Msg.notify(app, "NLS-INF-M024");
						util.Control.redraw(app, "grdCmnRuleSet");
					}
				});
			} //doListMstRowSelectDtl()
			
			/**
			 * @desc   구성요소를 조회한다. (룰셋목록 rowSelect시, 작업저장시)
			 * @param {Object} 서브미션 실행 후 처리될 콜백 함수 
			 */
			function doListDtl(poCallBackFunc) {
				// 룰셋목록의 선택한 룰셋코드를 조회조건 인스턴스 set
				var vnCmnRulEleRow = util.Grid.getIndex(app, "grdCmnRuleEle");
				var vsRuleSetCd = util.Grid.getCellValue(app, "grdCmnRuleEle", "CD");
				if(vnCmnRulEleRow == -1){
					vsRuleSetCd = util.Grid.getCellValue(app, "grdCmnRuleEle", "CD",0);
				}
				util.DataMap.setValue(app, "dmReqListRuleSet", "strRuleSetCd", vsRuleSetCd)
			
				util.Submit.send(app, "subListDtl", function(pbSuccess) {
					if (pbSuccess) {
						// 조회 후 콜백함수 수행
						if (util.isFunc(poCallBackFunc)) {
							poCallBackFunc(pbSuccess);
						}
					}
				});
			} //doListDtl()
			
			/*
			 * 그리드에서 selection-change 이벤트 발생 시 호출.
			 * detail의 cell 클릭하여 설정된 selectionunit에 해당되는 단위가 선택될 때 발생하는 이벤트.
			 */
			function onGrdCmnRuleEleSelectionChange( /* cpr.events.CSelectionEvent */ e) {
				/** 
				 * @type cpr.controls.Grid
				 */
				var grdCmnRuleEle = e.control;
				
				if(util.Grid.getIndex(app, "grdCmnRuleEle") == -1){
					return false;
				}
				
				var vsRuleEleIndex = util.Grid.getIndex(app, "grdCmnRuleEle");
				doListMstRowSelectDtl(vsRuleEleIndex);
			} //onGrdCmnRuleEleSelectionChangel()
			
			/*
			 * 사용자 정의 컨트롤에서 insert 이벤트 발생 시 호출.
			 */
			function onGrid_ids_btn1Insert( /* cpr.event.CUIEvent */ e) {
				/** 
				 * @type udc.com.grid_IDS_Btn
				 */
				var grid_ids_btn1 = e.control;
				doInsertCmnRuleSet();
			} //onGrid_ids_btn1Insert()
			
			function doInsertCmnRuleSet() {
				// 1. 신규행 추가후 룰요소명 컬럼 포커스 
				var vnNewIdx = util.Grid.getIndex(app, "grdCmnRuleSet");
				// 2. 기본신규데이터 set
				// 룰셋목록의 선택한 룰셋코드
				var vsRuleSetCd = util.Grid.getCellValue(app, "grdCmnRuleEle", "CD");
			
				// 조회조건 : 부서코드
				var vsDeptCd = util.DataMap.getValue(app, "dmReqList", "strDeptCd");
			
				// 조회조건 : 부서객체구분코드
				var vsObjDivRcd = util.DataMap.getValue(app, "dmReqList", "strObjDivRcd");
				// 조회조건 : 교과과정학년도
				var vsCurAplyYear = util.DataMap.getValue(app, "dmReqList", "strCurAplyYear");
			
				// 숨김컬럼
				util.Grid.setCellValue(app, "grdCmnRuleSet", "RULE_SET_CD", vsRuleSetCd, vnNewIdx);
				util.Grid.setCellValue(app, "grdCmnRuleSet", "DEPT_CD", vsDeptCd, vnNewIdx);
				util.Grid.setCellValue(app, "grdCmnRuleSet", "OBJ_DIV_RCD", vsObjDivRcd, vnNewIdx);
				util.Grid.setCellValue(app, "grdCmnRuleSet", "SCH_YEAR_RCD", vsCurAplyYear, vnNewIdx);
			} //doInsertCmnRuleSet()
			
			/*
			 * 사용자 정의 컨트롤에서 save 이벤트 발생 시 호출.
			 */
			function onGrid_ids_btn1Save( /* cpr.event.CUIEvent */ e) {
				/** 
				 * @type udc.com.grid_IDS_Btn
				 */
				var grid_ids_btn1 = e.control;
				doSave();
			} //onGrid_ids_btn1Save()
			
			function doSave() {
				// 그리드 변경사항 체크
				if (!util.Grid.isModified(app, "grdCmnRuleSet", "MSG")) {
					return false;
				}
				//그리드 유효성 검증
				if (!util.validate(app, "grdCmnRuleSet")) {
					return false;
				}
			
				//	var vnCnt = ExtRepeat.rowCount("rptCmnRuleSet");
				var vnCnt = util.Grid.getRowCount(app, "grdCmnRuleSet");
			
				for (var i = 0; i < vnCnt; i++) {
					var vsOprOperatorCd = util.Grid.getCellValue(app, "grdCmnRuleSet", "CPR_OPERATOR_CD", i);
			
					var vsCprVal2 = util.Grid.getCellValue(app, "grdCmnRuleSet", "CPR_VAL_2", i);
			
					var vsRowStatus = util.Grid.getRowState(app, "grdCmnRuleSet", i);
					if (vsRowStatus != cpr.data.tabledata.RowState.INSERTED) {
						continue;
					}
			
					// 비교연산자 CMN0306 => Between일 경우
					if (vsOprOperatorCd == "CMN0306") {
						if (ValueUtil.isNull(vsCprVal2)) {
							util.Msg.warn("M100", ["비교연산자가 BETEEN인 경우 비교값2"]);
							app.lookup("grdCmnRuleSet").focusCell(i, "CPR_VAL_2");
							return false;
						}
					}
				}
			
				util.Submit.send(app, "subSave", function(pbSuccess) {
					if (pbSuccess) {
						doListDtl(function(pbListSuccess) {
							if (pbListSuccess) {
								// "갱신된 데이터가 조회되었습니다." 메시지 출력
								util.Msg.notify(app, "NLS-INF-M025");
							}
						});
					}
				});
			} //doSave()
			
			function doCprOperatorCdFilter() {
				var vsRuleEmtId = util.Grid.getCellValue(app, "grdCmnRuleSet", "RULE_EMT_ID");
			
			// 	룰요소의 리턴타입
				var vsRtrnType = app.lookup("dsRuleEleList").findFirstRow("RULE_EMT_ID=='" + vsRuleEmtId + "'");
			
			// 	리턴타입이 '비숫자'인 경우 비교연산자 필터링
				if (!ValueUtil.isNull(vsRtrnType) && vsRtrnType.getString("RTRN_TYPE_CD") == "CMN0402") {
					util.SelectCtl.setInsBind("gdCbbCprOperatorCd", "CD_PRP1=='CMN0402'");
				} else {
					util.SelectCtl.setInsBind("gdCbbCprOperatorCd", "CD_CLS=='CMN03'");
				}
				util.Control.redraw(app, "gdCbbCprOperatorCd");
			}
			
			/*
			 * 콤보 박스에서 selection-change 이벤트 발생 시 호출.
			 * ComboBox Item을 선택하여 선택된 값이 저장된 후에 발생하는 이벤트.
			 */
			function onGdCbbRuleEmtIdSelectionChange( /* cpr.events.CSelectionEvent */ e) {
				/** 
				 * @type cpr.controls.ComboBox
				 */
				var gdCbbRuleEmtId = e.control;
				doCprOperatorCdFilter();
			}//onGdCbbRuleEmtIdSelectionChange()
			
			/*
			 * 그리드에서 selection-change 이벤트 발생 시 호출.
			 * detail의 cell 클릭하여 설정된 selectionunit에 해당되는 단위가 선택될 때 발생하는 이벤트.
			 */
			function onGrdCmnRuleSetSelectionChange( /* cpr.events.CSelectionEvent */ e) {
				/** 
				 * @type cpr.controls.Grid
				 */
				var grdCmnRuleSet = e.control;
				doCprOperatorCdFilter();
			}//onGrdCmnRuleSetSelectionChange()
			
			/*
			 * 콤보 박스에서 selection-change 이벤트 발생 시 호출.
			 * ComboBox Item을 선택하여 선택된 값이 저장된 후에 발생하는 이벤트.
			 */
			function onGdCbbCprOperatorCdSelectionChange( /* cpr.events.CSelectionEvent */ e) {
				/** 
				 * @type cpr.controls.ComboBox
				 */
				var gdCbbCprOperatorCd = e.control;
				var vsCprOperatorCd = util.Grid.getCellValue(app, "grdCmnRuleSet", "CPR_OPERATOR_CD");
				// 비교연산자가 Between인 경우 비교값2를 빈값으로 리셋한다. -> 바인드에 따라 disable이 되기 때문에 리셋처리함.
				if (ValueUtil.fixNull(vsCprOperatorCd) == "CMN0306") {
					util.Grid.setCellValue(app, "grdCmnRuleSet", "CPR_VAL_2", "");
				}
				util.Control.redraw(app, "gdCbbCprOperatorCd");
			} //onGdCbbCprOperatorCdSelectionChange()
			
			/*
			 * 사용자 정의 컨트롤에서 searchCallBack 이벤트 발생 시 호출.
			 */
			function onCmnobjsch1SearchCallBack(/* cpr.events.CUIEvent */ e){
				/** 
				 * @type udc.cmn.cmnObjSch
				 */
				var cmnobjsch1 = e.control;
			//	var vsDeptCd = ExtControl.getValue("ipbDeptNm");
				var vsDeptCd = util.Control.getValue(app, "cmnobjsch1");			
				if(ValueUtil.fixNull(vsDeptCd) == "") {
					util.DataMap.setValue(app, "dmReqList", "strObjDivRcd", "");
				}
			}//onCmnobjsch1SearchCallBack()
			
			/*
			 * 인풋 박스에서 keydown 이벤트 발생 시 호출.
			 * 사용자가 키를 누를 때 발생하는 이벤트.
			 */
			function onIpbRuleSetNmKeydown(/* cpr.events.CKeyboardEvent */ e){
				/** 
				 * @type cpr.controls.InputBox
				 */
				var ipbRuleSetNm = e.control;
				// 엔터키 입력시 조회
				if (e.keyCode == 13) {
					app.lookup("btnSearch").click();
				}
			}//onIpbRuleSetNmKeydown()
			
			
			/*
			 * 그룹에서 keydown 이벤트 발생 시 호출.
			 * 사용자가 키를 누를 때 발생하는 이벤트.
			 */
			function onGrpSearchKeydown(/* cpr.events.CKeyboardEvent */ e){
				/** 
				 * @type cpr.controls.Container
				 */
				var grpSearch = e.control;
				if(e.keyCode == 13){
					app.lookup("btnSearch").click();
				}
			};
			// End - User Script
			
			// Header
			var dataSet_1 = new cpr.data.DataSet("dsYearList");
			dataSet_1.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_1);
			
			var dataSet_2 = new cpr.data.DataSet("dsCprOperatorCdList");
			dataSet_2.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"},
					{"name": "CD_CLS"},
					{"name": "CD_PRP1"}
				],
				"rows": []
			});
			app.register(dataSet_2);
			
			var dataSet_3 = new cpr.data.DataSet("dsRuleEleList");
			dataSet_3.parseData({
				"columns": [
					{"name": "RULE_EMT_NM"},
					{"name": "RULE_EMT_ID"},
					{"name": "RTRN_TYPE_CD"}
				],
				"rows": []
			});
			app.register(dataSet_3);
			
			var dataSet_4 = new cpr.data.DataSet("dsCmnRuleEle");
			dataSet_4.parseData({
				"info": "CMN_RULE_SET@RULE_SET_CD,RULE_EMT_ID,SCH_YEAR_RCD,DEPT_CD,OBJ_DIV_RCD",
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_4);
			
			var dataSet_5 = new cpr.data.DataSet("dsCmnRuleSet");
			dataSet_5.parseData({
				"info": "CMN_RULE_SET@RULE_SET_CD,RULE_EMT_ID,SCH_YEAR_RCD,DEPT_CD,OBJ_DIV_RCD",
				"columns": [
					{"name": "RULE_SET_CD"},
					{"name": "RULE_EMT_ID"},
					{"name": "SCH_YEAR_RCD"},
					{"name": "DEPT_CD"},
					{"name": "OBJ_DIV_RCD"},
					{"name": "CPR_OPERATOR_CD"},
					{"name": "CPR_VAL"},
					{"name": "CPR_VAL_2"},
					{"name": "MSG"},
					{"name": "APLY_ORD"},
					{"name": "REMARK"}
				],
				"rows": []
			});
			app.register(dataSet_5);
			var dataMap_1 = new cpr.data.DataMap("dmResOnLoad");
			dataMap_1.parseData({
				"columns" : [{
					"name": "strCurDt",
					"dataType": "string"
				}]
			});
			app.register(dataMap_1);
			
			var dataMap_2 = new cpr.data.DataMap("dmReqList");
			dataMap_2.parseData({
				"columns" : [
					{
						"name": "strCurAplyYear",
						"dataType": "string"
					},
					{
						"name": "strDeptCd",
						"dataType": "string"
					},
					{
						"name": "strDeptNm",
						"dataType": "string"
					},
					{
						"name": "strObjDivRcd",
						"dataType": "string"
					},
					{
						"name": "strRuleSetNm",
						"dataType": "string"
					}
				]
			});
			app.register(dataMap_2);
			
			var dataMap_3 = new cpr.data.DataMap("dmReqListRuleSet");
			dataMap_3.parseData({
				"columns" : [{
					"name": "strRuleSetCd",
					"dataType": "string"
				}]
			});
			app.register(dataMap_3);
			var submission_1 = new cpr.protocols.Submission("subOnLoad");
			submission_1.action = "/cmn/StdCmnRuleSetMgt/";
			submission_1.mediaType = "application/x-www-form-urlencoded";
			submission_1.addResponseData(dataSet_1, false);
			submission_1.addResponseData(dataSet_2, false);
			submission_1.addResponseData(dataSet_3, false);
			submission_1.addResponseData(dataMap_1, false);
			app.register(submission_1);
			
			var submission_2 = new cpr.protocols.Submission("subList");
			submission_2.action = "/cmn/StdCmnRuleSetMgt/";
			submission_2.mediaType = "application/x-www-form-urlencoded";
			submission_2.addRequestData(dataMap_2);
			submission_2.addResponseData(dataSet_4, false);
			app.register(submission_2);
			
			var submission_3 = new cpr.protocols.Submission("subSave");
			submission_3.action = "/cmn/StdCmnRuleSetMgt/";
			submission_3.mediaType = "application/x-www-form-urlencoded";
			submission_3.addRequestData(dataSet_5);
			app.register(submission_3);
			
			var submission_4 = new cpr.protocols.Submission("subListDtl");
			submission_4.action = "/cmn/StdCmnRuleSetMgt/";
			submission_4.mediaType = "application/x-www-form-urlencoded";
			submission_4.addRequestData(dataMap_2);
			submission_4.addRequestData(dataMap_3);
			submission_4.addResponseData(dataSet_5, false);
			app.register(submission_4);
			
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
				var output_1 = new cpr.controls.Output("optCurAplyYear");
				output_1.value = "";
				output_1.style.setClasses(["require"]);
				output_1.bind("value").toLanguage("UI-SCR-SUBPROGRDYRS");
				container.addChild(output_1, {
					"top": "5px",
					"left": "5px",
					"width": "150px",
					"height": "25px"
				});
				var comboBox_1 = new cpr.controls.ComboBox("cbbCurAplyYear");
				comboBox_1.userAttr({"require": "Y"});
				comboBox_1.bind("fieldLabel").toExpression("#optCurAplyYear.value");
				comboBox_1.bind("value").toDataMap(app.lookup("dmReqList"), "strCurAplyYear");
				(function(comboBox_1){
					comboBox_1.setItemSet(app.lookup("dsYearList"), {
						"label": "CD_NM",
						"value": "CD"
					});
				})(comboBox_1);
				container.addChild(comboBox_1, {
					"top": "5px",
					"left": "160px",
					"width": "100px",
					"height": "25px"
				});
				var output_2 = new cpr.controls.Output("optDeptNm");
				output_2.value = "";
				output_2.style.setClasses(["require"]);
				output_2.bind("value").toLanguage("UI-SCR-DEPTNM");
				container.addChild(output_2, {
					"top": "5px",
					"left": "270px",
					"width": "100px",
					"height": "25px"
				});
				var inputBox_1 = new cpr.controls.InputBox("ipbDeptNm");
				inputBox_1.userAttr({"require": "Y"});
				inputBox_1.bind("fieldLabel").toExpression("#optDeptNm.value");
				inputBox_1.bind("value").toDataMap(app.lookup("dmReqList"), "strDeptNm");
				if(typeof onIpbDeptNmValueChange == "function") {
					inputBox_1.addEventListener("value-change", onIpbDeptNmValueChange);
				}
				container.addChild(inputBox_1, {
					"top": "5px",
					"left": "375px",
					"width": "150px",
					"height": "25px"
				});
				var output_3 = new cpr.controls.Output("optRuleSetNm");
				output_3.value = "";
				output_3.bind("value").toLanguage("UI-DB-RULE_SET_NM");
				container.addChild(output_3, {
					"top": "5px",
					"left": "555px",
					"width": "100px",
					"height": "25px"
				});
				var inputBox_2 = new cpr.controls.InputBox("ipbRuleSetNm");
				inputBox_2.bind("fieldLabel").toExpression("#optRuleSetNm.value");
				inputBox_2.bind("value").toDataMap(app.lookup("dmReqList"), "strRuleSetNm");
				if(typeof onIpbRuleSetNmKeydown == "function") {
					inputBox_2.addEventListener("keydown", onIpbRuleSetNmKeydown);
				}
				container.addChild(inputBox_2, {
					"top": "5px",
					"left": "660px",
					"width": "200px",
					"height": "25px"
				});
				var button_2 = new cpr.controls.Button("btnDeptNm");
				button_2.value = "";
				button_2.style.setClasses(["btn-pop-search"]);
				if(typeof onBtnDeptNmClick == "function") {
					button_2.addEventListener("click", onBtnDeptNmClick);
				}
				container.addChild(button_2, {
					"top": "5px",
					"left": "525px",
					"width": "20px",
					"height": "25px"
				});
			})(group_1);
			container.addChild(group_1, {
				"top": "35px",
				"left": "5px",
				"width": "1225px",
				"height": "32px"
			});
			
			var group_2 = new cpr.controls.Container("grpDataDtl");
			// Layout
			var xYLayout_3 = new cpr.controls.layouts.XYLayout();
			group_2.setLayout(xYLayout_3);
			(function(container){
				var userDefinedControl_2 = linker.userDefinedControl_2 = new udc.com.comTitle();
				userDefinedControl_2.bind("title").toLanguage("UI-GLS-FCTOR");
				container.addChild(userDefinedControl_2, {
					"top": "5px",
					"left": "5px",
					"width": "265px",
					"height": "25px"
				});
				var button_3 = new cpr.controls.Button("btnNew");
				button_3.value = "신규";
				button_3.style.setClasses(["btn-new"]);
				if(typeof onBtnNewClick == "function") {
					button_3.addEventListener("click", onBtnNewClick);
				}
				container.addChild(button_3, {
					"top": "5px",
					"left": "705px",
					"width": "60px",
					"height": "25px"
				});
				var button_4 = new cpr.controls.Button("btnDel");
				button_4.value = "삭제";
				button_4.style.setClasses(["btn-delete"]);
				if(typeof onBtnDelClick == "function") {
					button_4.addEventListener("click", onBtnDelClick);
				}
				container.addChild(button_4, {
					"top": "5px",
					"left": "770px",
					"width": "60px",
					"height": "25px"
				});
				var button_5 = new cpr.controls.Button("btnRestore");
				button_5.value = "취소";
				button_5.style.setClasses(["btn-restore"]);
				if(typeof onBtnRestoreClick == "function") {
					button_5.addEventListener("click", onBtnRestoreClick);
				}
				container.addChild(button_5, {
					"top": "5px",
					"left": "835px",
					"width": "60px",
					"height": "25px"
				});
				var button_6 = new cpr.controls.Button("btnSave");
				button_6.value = "저장";
				button_6.style.setClasses(["btn-save"]);
				if(typeof onBtnSaveClick == "function") {
					button_6.addEventListener("click", onBtnSaveClick);
				}
				container.addChild(button_6, {
					"top": "5px",
					"left": "900px",
					"width": "60px",
					"height": "25px"
				});
				var grid_1 = linker.grid_1 = new cpr.controls.Grid("grdCmnRuleSet");
				grid_1.init({
					"dataSet": app.lookup("dsCmnRuleSet"),
					"columns": [
						{"width": "25px"},
						{"width": "25px"},
						{"width": "40px"},
						{"width": "165px"},
						{"width": "87px"},
						{"width": "67px"},
						{"width": "70px"},
						{"width": "73px"},
						{"width": "234px"},
						{"width": "168px"},
						{"width": "93px"},
						{"width": "90px"},
						{"width": "126px"},
						{"width": "130px"}
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
									cell.style.setClasses(["require"]);
									cell.bind("text").toLanguage("UI-DB-RULE_EMT_NM");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 4},
								"configurator": function(cell){
									cell.style.setClasses(["require"]);
									cell.bind("text").toLanguage("UI-SCR-CMPROPRTCD");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 5},
								"configurator": function(cell){
									cell.style.setClasses(["require"]);
									cell.bind("text").toLanguage("UI-DB-CPR_NUM");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 6},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-DB-CPR_NUM");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 7},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-SCR-APLYORD");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 8},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-GLS-MSG");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 9},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-GLS-REMARK");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 10},
								"configurator": function(cell){
									cell.style.setClasses(["require"]);
									cell.bind("text").toLanguage("UI-GLS-RCD");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 11},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-DB-DEPT_CD");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 12},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-DB-DEPT_OBJ_DIV_RCD");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 13},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-SCR-SUBPROGRDYRS");
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
										var output_4 = new cpr.controls.Output();
										output_4.style.css({
											"text-align" : "center"
										});
										return output_4;
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
									cell.columnName = "RULE_EMT_ID";
									cell.control = (function(){
										var comboBox_2 = new cpr.controls.ComboBox("gdCbbRuleEmtId");
										comboBox_2.userAttr({"require": "Y"});
										(function(comboBox_2){
											comboBox_2.addItem(new cpr.controls.Item("선택", ""));
											comboBox_2.setItemSet(app.lookup("dsRuleEleList"), {
												"label": "RULE_EMT_NM",
												"value": "RULE_EMT_ID"
											});
										})(comboBox_2);
										comboBox_2.bind("value").toDataColumn("RULE_EMT_ID");
										return comboBox_2;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 5},
								"configurator": function(cell){
									cell.columnName = "CPR_VAL";
									cell.control = (function(){
										var inputBox_3 = new cpr.controls.InputBox("gdIpbCprVal");
										inputBox_3.maxLength = 50;
										inputBox_3.userAttr({"require": "Y"});
										inputBox_3.bind("value").toDataColumn("CPR_VAL");
										return inputBox_3;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 6},
								"configurator": function(cell){
									cell.columnName = "CPR_VAL_2";
									cell.control = (function(){
										var inputBox_4 = new cpr.controls.InputBox("gdIpbCprVal2");
										inputBox_4.maxLength = 50;
										inputBox_4.bind("value").toDataColumn("CPR_VAL_2");
										return inputBox_4;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 7},
								"configurator": function(cell){
									cell.columnName = "APLY_ORD";
									cell.control = (function(){
										var inputBox_5 = new cpr.controls.InputBox("gdIpbAplyOgd");
										inputBox_5.maxLength = 10;
										inputBox_5.bind("value").toDataColumn("APLY_ORD");
										return inputBox_5;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 8},
								"configurator": function(cell){
									cell.columnName = "MSG";
									cell.control = (function(){
										var inputBox_6 = new cpr.controls.InputBox("gdIpbMsg");
										inputBox_6.maxLength = 1000;
										inputBox_6.bind("value").toDataColumn("MSG");
										return inputBox_6;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 9},
								"configurator": function(cell){
									cell.columnName = "REMARK";
									cell.control = (function(){
										var inputBox_7 = new cpr.controls.InputBox("gdIpbRemark");
										inputBox_7.maxLength = 1000;
										inputBox_7.bind("value").toDataColumn("REMARK");
										return inputBox_7;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 10},
								"configurator": function(cell){
									cell.columnName = "RULE_SET_CD";
									cell.control = (function(){
										var inputBox_8 = new cpr.controls.InputBox("gdIpbRuleSetCd");
										inputBox_8.maxLength = 10;
										inputBox_8.userAttr({"require": "Y"});
										inputBox_8.bind("value").toDataColumn("RULE_SET_CD");
										return inputBox_8;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 11},
								"configurator": function(cell){
									cell.columnName = "DEPT_CD";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 12},
								"configurator": function(cell){
									cell.columnName = "OBJ_DIV_RCD";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 13},
								"configurator": function(cell){
									cell.columnName = "SCH_YEAR_RCD";
								}
							}
						]
					}
				});
				if(typeof onGrdCmnRuleSetSelectionChange == "function") {
					grid_1.addEventListener("selection-change", onGrdCmnRuleSetSelectionChange);
				}
				container.addChild(grid_1, {
					"top": "30px",
					"left": "5px",
					"width": "955px",
					"height": "565px"
				});
			})(group_2);
			container.addChild(group_2, {
				"top": "72px",
				"left": "265px",
				"width": "965px",
				"height": "600px"
			});
			
			var group_3 = new cpr.controls.Container("grpDataMst");
			// Layout
			var xYLayout_4 = new cpr.controls.layouts.XYLayout();
			group_3.setLayout(xYLayout_4);
			(function(container){
				var userDefinedControl_3 = linker.userDefinedControl_3 = new udc.com.comTitle();
				userDefinedControl_3.bind("title").toLanguage("UI-SCR-RULESETLST");
				container.addChild(userDefinedControl_3, {
					"top": "5px",
					"left": "5px",
					"width": "215px",
					"height": "25px"
				});
				var grid_2 = linker.grid_2 = new cpr.controls.Grid("grdCmnRuleEle");
				grid_2.init({
					"dataSet": app.lookup("dsCmnRuleEle"),
					"columns": [
						{"width": "40px"},
						{"width": "187px"},
						{"width": "118px"}
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
									cell.bind("text").toLanguage("UI-DB-RULE_SET_NM");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 2},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-GLS-RCD");
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
									cell.columnName = "CD_NM";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 2},
								"configurator": function(cell){
									cell.columnName = "_repeatindex";
								}
							}
						]
					}
				});
				if(typeof onGrdCmnRuleEleSelectionChange == "function") {
					grid_2.addEventListener("selection-change", onGrdCmnRuleEleSelectionChange);
				}
				container.addChild(grid_2, {
					"top": "30px",
					"left": "5px",
					"width": "245px",
					"height": "565px"
				});
			})(group_3);
			container.addChild(group_3, {
				"top": "72px",
				"left": "5px",
				"width": "255px",
				"height": "600px"
			});
			
			var embeddedApp_1 = new cpr.controls.EmbeddedApp("emaStdCmnPobjSch");
			cpr.core.App.load("app/cmn/impStdCmnPObjSch", function(app) {
				if(app){
					embeddedApp_1.app = app;
				}
			});
			container.addChild(embeddedApp_1, {
				"top": "685px",
				"left": "5px",
				"width": "100px",
				"height": "25px"
			});
			if(typeof onBodyLoad == "function"){
				app.addEventListener("load", onBodyLoad);
			}
			// Linking
			linker.userDefinedControl_2.ctrl = linker.grid_1;
			linker.userDefinedControl_3.ctrl = linker.grid_2;
		}
	});
	app.title = "stdCmnCRuleSetMgt";
	cpr.core.Platform.INSTANCE.register(app);
})();
