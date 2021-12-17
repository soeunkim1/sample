/*
 * App URI: app/cmn/stdCmnPObjSch
 * Source Location: app/cmn/stdCmnPObjSch.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("app/cmn/stdCmnPObjSch", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			var util = new ComUtil(app);
			var initValue;
			
			
			var vaObjDivRcd =  ["CC009DG","CC009OT", "CC009OG", "CC009SA", "CC009SP", "CC009CU"];
			
			var moObjType = {
					CC009OG : "CC009OG",
					CC009SA : "CC009SA",
					CC009SP : "CC009SP",
					CC009CU : "CC009CU",
					CC009SB : "CC009SB",
					CC009OT : "CC009OT",  // for.외부부서추가  2011-12-27. by.Park ju wan
					CC009DG : "CC009DG"  // for.학위추가  2011-11-23. by.Oh hyun teak
				};
			
			var moObjDivRcdName = {};
			
			
			
			/*
			 * Body에서 load 이벤트 발생 시 호출.
			 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
			 */
			function onBodyLoad(/* cpr.events.CEvent */ e){
				
				
				var voMenuInfo = util.Auth.getMenuInfo(app);
				util.DataMap.setValue(app, "dmReqKey", "strOprtRoleId", voMenuInfo.get("OPRT_ROLE_ID"));
				util.DataMap.setValue(app, "dmReqKey", "authRngRcd", voMenuInfo.get("AUTH_RNG_RCD"));
				
				initValue = app.getHostProperty("initValue");
				
				util.DataMap.setValue(app, "dmReqKey", "strOtDivRcd", initValue.otDivRcd);
				util.DataMap.setValue(app, "dmReqKey", "strOtIsTreeView", initValue.otIsTreeView);
				
				
				util.DataMap.setValue(app, "dmReqKey", "strObjCd", initValue.strObjCd);
				util.DataMap.setValue(app, "dmReqKey", "strObjNm", initValue.strObjNm);
				
				
				util.DataMap.setValue(app, "dmReqKey", "strKeyDate", initValue.strKeyDate);
				util.DataMap.setValue(app, "dmReqKey", "strKeyEndDate", initValue.strKeyEndDate);
				
				util.DataMap.setValue(app, "dmReqKey", "strStartObject", initValue.strStartObject);
				util.DataMap.setValue(app, "dmReqKey", "strKeyEndDate", initValue.strKeyEndDate);
				util.DataMap.setValue(app, "dmReqKey", "strBetweenEndDtYn", initValue.strBetweenEndDtYn);
				
				//학위 검색 시 트리버튼 숨김 
				if( initValue.objDivRcd.indexOf("CC009DG") != -1 || ( initValue.objDivRcd.indexOf("CC009OT") != -1 &&  initValue.otIsTreeView != "Y"))
				{
					//todo...탭 버튼 숨김
					//ExtControl.setVisible(false,"tbtTree");
				}else{
					//ExtControl.setVisible(true,"tbtTree");
				}
				
				util.Submit.send(app, "subOnLoad", function(pbSuccess){
					
					if(pbSuccess){
						util.DataMap.setValue(app, "dmReqKey", "strObjDivRcd", initValue.objDivRcd);
						
						if(ValueUtil.isNull(app.getAppProperty("iLanDivRcd"))){
							util.DataMap.setValue(app, "dmReqKey", "strLanDivRcd", util.getDefaultLocale(app));
						}else{
							util.DataMap.setValue(app, "dmReqKey", "strLanDivRcd", initValue.lanDivRcd);
						}
						// 검색어가 입력되어 있는 경우 바로 검색 실행
						if (initValue.strObjNm) {
							// 검색 실행.
							onBtnSearchClick();
						} else {
							
							if(initValue.objDivRcd.indexOf("CC009OT") != -1 &&  initValue.otIsTreeView != "Y"){
								//2015.11.18 hyunteak 외부부서 팝업시 자동조회 부분 수정
								//doList();
								//ExtModel.dispatch("btnSearch","DOMActivate");
								onBtnSearchClick();
							}else if(initValue.objDivRcd.indexOf("CC009DG") != -1 &&  initValue.otIsTreeView != "Y"){
								onBtnSearchClick();
								//ExtModel.dispatch("btnSearch","DOMActivate");
							}else{
								util.Tab.setSelectedTabItem(app, "fldMst", 2);//doListTrv();
							}
						}
					}
					
				});
			}
			
			/**
			 * @desc  doList (검색탭 조회) 	
			 * @return void
			 * @author canlay38 2015. 7. 2.
			 */
			function doList() {
				
				
				util.Tab.setSelectedTabItem(app, "fldMst", 1);
				
				util.Submit.send(app, "subList", function(pbSuccess){
					
					if(pbSuccess){
						util.Msg.notify(app, "NLS-INF-M024") ;
						util.Control.redraw(app, "grid_title");
						
					}
				});
			};
			
			
			
			function doListTrv(){
				util.Tab.setSelectedTabItem(app, "fldMst", 2);
				//외부부서 treeView 사용유무
				var vsOtIsTreeView = util.DataMap.getValue(app, "dmReqKey", "strOtIsTreeView");
				
				if (typeof (vaObjDivRcd) == "string") {
					vaObjDivRcd = [vaObjDivRcd];
				}
				var voCheckedObjDivRcd = new Object();
				for (var i in vaObjDivRcd) {
					switch (vaObjDivRcd [i]) {
						case moObjType.CC009OG : {
							voCheckedObjDivRcd.CC009OG = true;
							break;
						}
						case moObjType.CC009SA : {
							voCheckedObjDivRcd.CC009SA = true;
							break;
						}
						case moObjType.CC009SP : {
							voCheckedObjDivRcd.CC009SP = true;
							break;
						}
						case moObjType.CC009CU : {
							voCheckedObjDivRcd.CC009CU = true;
							break;
						}
						
						case moObjType.CC009OT : {
							voCheckedObjDivRcd.CC009OT = true;
							break;
						}
						case moObjType.CC009DG : {
							voCheckedObjDivRcd.CC009DG = true;
							break;
						}
					}
				}
				var vsToObjDivRcd = "";
				if (voCheckedObjDivRcd.CC009CU) {
					vsToObjDivRcd = moObjType.CC009CU;
				} else if (voCheckedObjDivRcd.CC009SP) {
					vsToObjDivRcd = moObjType.CC009SP;
				} else if (voCheckedObjDivRcd.CC009SA) {
					vsToObjDivRcd = moObjType.CC009SA;
				} else if (voCheckedObjDivRcd.CC009OG) {
					vsToObjDivRcd = moObjType.CC009OG;
				} else if (voCheckedObjDivRcd.CC009OT && vsOtIsTreeView == "Y") {
					vsToObjDivRcd = moObjType.CC009OT;
				}else {
					// 트리구조를 사용할수 없는 객체구분입니다.
					return false;
				}
				
				
				util.DataMap.setValue(app, "dmReqKey", "strToObjDivRcd", vsToObjDivRcd);
				
				
				util.Submit.send(app, "subListTrv", function(pbSuccess){
					
					if(pbSuccess){
						util.Control.redraw(app, "treCmnObj");
						
					}
				});
			}
			
			
			function doCloseOk() {
				//app.setHostProperty("returnValue", row.getRowData());
				var voResult = {
						OBJ_DIV_RCD : "",
						CD : "",
						CD_NM : "",
						ST_DT : "",
						END_DT : "",
						LAN_DIV_RCD : ""
					};	
				
				
				if(util.Tab.getSelectedId(app, "fldMst") == 1){
					
					if(util.Grid.getCheckOrSelectedRowIndex(app, "grdCmnObj") < 0){
						//선택된 데이터가 없습니다.
						util.Msg.warn("M008");
						return false;
					}
					
					voResult.OBJ_DIV_RCD = util.Grid.getCellValue(app, "grdCmnObj", "OBJ_DIV_RCD");   //객체구분코드
					voResult.CD = util.Grid.getCellValue(app, "grdCmnObj", "CD");                 //객체코드
					voResult.CD_NM = util.Grid.getCellValue(app, "grdCmnObj", "CD_NM");                  //객체명
					voResult.ST_DT = util.Grid.getCellValue(app, "grdCmnObj", "ST_DT");                 //객체사용시작일자
					voResult.END_DT = util.Grid.getCellValue(app, "grdCmnObj", "END_DT");                 //객체사용종료일자
					voResult.LAN_DIV_RCD = util.Grid.getCellValue(app, "grdCmnObj", "LAN_DIV_RCD");  //언어키
					
				}else if(util.Tab.getSelectedId(app, "fldMst") == 2){
					
					var vsTab = app.lookup("fldMst");
					
					var vsTree = app.lookup("treCmnObj");
					
					var vsValue = util.Tree.getSelectedValue(app, "treCmnObj");
					
					
					
			//		vcTree.getItems().filter(function(item){
			//			if(item.label.indexOf(vsValue) >-1){
			//				var vsPValue = item.parentValue;
			//				var vaChildItem = vcTree.getChildren(item);
			//				var voParent = vcTree.getItemByValue(vsPValue);
			//				getParentMenuNode(voParent);
			//				vcTree.focusItem(item);
			//			}
			//			return false;
			//		});
					
					if(vsValue == null){
						//선택된 데이터가 없습니다.
						util.Msg.warn("M008");
						return false;
					}	
					
					
					var voRow = util.DataSet.findRow(app, "dsTrvCmnObj", "CKEY == " + "'" + vsValue +"'");
					
					if(voRow){
						voResult.CD = voRow.getValue("CD");                                         //객체코드
						voResult.ST_DT = voRow.getValue("ST_DT");                          //객체사용시작일자
						voResult.END_DT = voRow.getValue("END_DT");                          //객체사용종료일자
						voResult.OBJ_DIV_RCD = voRow.getValue("OBJ_DIV_RCD");          //객체구분코드
						voResult.REF_KEY = voRow.getValue("REF_KEY");                       //참조키
						voResult.LAN_DIV_RCD = voRow.getValue("LAN_DIV_RCD");         //언어키
						voResult.CD_NM = voRow.getValue("CD_NM");                           //객체명
						
					}
				}else{
					//alert("error. Invalid Tab");
					ComMsg.alert("error. Invalid Tab");
					return false;
				}	
				
				var vbSuccess = false;
				var vbSuccess1 = doCheckObjDivRcd(voResult.OBJ_DIV_RCD);
				var vbSuccess2 = doCheckLanDivRcd(voResult.LAN_DIV_RCD);
				vbSuccess = (vbSuccess1 && vbSuccess2);
				if (vbSuccess) {
					//ExtPopUp.closeLayeredPopup("callbackStdCmnPObjSch", moStdCmnPObjSch);
					app.setHostProperty("returnValue", voResult);
					app.close();
				}
				
			}
			
			/**
			 * @desc   doCheckObjDivRcd (유효한 객체구분을 선택했는지 체크) 	
			 * @param {String} 체크할 객체구분 코드
			 * @return void
			 */
			function doCheckObjDivRcd(psObjDivRcd){
				var voParam = initValue;
				if (voParam && voParam.objDivRcd && voParam.objDivRcd.length >= 1 && voParam.objDivRcd != "%") {
					
					var vaValidObjDivRcd = voParam.objDivRcd.split(",");
					
					var vaNames = new Array();
					
					for (var i in vaValidObjDivRcd) {
						if (psObjDivRcd == vaValidObjDivRcd [i]) {
							// 일치하는 코드가 있다면 OK
							return true;
						}
						var vaItems = app.lookup("cbbObjDivRcd").getItemsByValue(vaValidObjDivRcd [i]);
						
						vaItems.forEach(function(vcItem){
							vaNames.push(vcItem.label);
						});
						
					}
					
					// @만 선택할 수 있습니다.
					//ComMsg.alert(MESSAGE.WRN.M019, [vaNames.join()]);
					util.Msg.warn("M009", [vaNames.join()]);
					return false;
				} else {
					// 제한조건이 없으므로 항상 OK
					return true;
				}	
			}
			/*
			* @desc   doCheckLanDivRcd (유효한 언어키을 선택했는지 체크) 	
			* @param {String} 체크할 언어키 코드
			* @return void
			*/
			function doCheckLanDivRcd(psLanDivRcd){
				var voParam = initValue;
				if (voParam && voParam.lanDivRcd && voParam.lanDivRcd.length >= 1 && voParam.lanDivRcd  != "%") {
					var vaValidLanDivRcd = voParam.lanDivRcd.split(",");
					var vaNames = new Array();
					
					for (var i in vaValidLanDivRcd) {
						if (psLanDivRcd == vaValidLanDivRcd [i]) {
							// 일치하는 코드가 있다면 OK
							return true;
						}
						
						var vaItems = app.lookup("cbbLanDivRcd").getItemsByValue(vaValidObjDivRcd [i]);
						
						vaItems.forEach(function(vcItem){
							vaNames.push(vcItem.label);
						});
					}
					
					// @만 선택할 수 있습니다.
					//ComMsg.alert(MESSAGE.WRN.M019, [vaNames.join()]);
					util.Msg.warn("M009", [vaNames.join()]);
					return false;
				} else {
					// 제한조건이 없으므로 항상 OK
					return true;
				}
			}	
			
			
			
			/*
			 * 탭 폴더에서 selection-change 이벤트 발생 시 호출.
			 * Tab Item을 선택한 후에 발생하는 이벤트.
			 */
			function onFldMstSelectionChange(/* cpr.events.CSelectionEvent */ e){
				/** 
				 * @type cpr.controls.TabFolder
				 */
				var fldMst = e.control;
				var vcTab = fldMst;
				var vcTabItem = vcTab.getSelectedTabItem();
				
				if(vcTabItem.id == 2){
					doListTrv();
				}
			}
			
			/*
			 * "" 버튼에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onBtnCloseClick(/* cpr.events.CMouseEvent */ e){
				/** 
				 * @type cpr.controls.Button
				 */
				var btnClose = e.control;
				doCloseOk();
			}
			
			/*
			 * 그리드에서 row-dblclick 이벤트 발생 시 호출.
			 * detail이 row를 더블클릭 한 경우 발생하는 이벤트.
			 */
			function onGrdCmnObjRowDblclick(/* cpr.events.CGridEvent */ e){
				/** 
				 * @type cpr.controls.Grid
				 */
				var grdCmnObj = e.control;
				doCloseOk();
			}
			
			/*
			 * 트리에서 dblclick 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 더블 클릭할 때 발생하는 이벤트.
			 */
			function onTreCmnObjDblclick(/* cpr.events.CMouseEvent */ e){
				/** 
				 * @type cpr.controls.Tree
				 */
				var treCmnObj = e.control;
				doCloseOk();
			}
			
			
			
			/*
			 * "Button" 버튼에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onBtn2Click(/* cpr.events.CMouseEvent */ e){
				/** 
				 * @type cpr.controls.Button
				 */
				var btn2 = e.control;
				util.Tree.expandAllItems(app, "treCmnObj", true);
			}
			
			
			
			
			
			
			
			/*
			 * "" 버튼에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onBtnSearchClick(/* cpr.events.CMouseEvent */ e){
				/** 
				 * @type cpr.controls.Button
				 */
				doList();
				
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
				
				if (e.keyCode == 13) {
					doList();
				}
			};
			// End - User Script
			
			// Header
			var dataSet_1 = new cpr.data.DataSet("dsCmnSat");
			dataSet_1.parseData({
				"columns": [
					{"name": "OBJ_DIV_RCD"},
					{"name": "UNI_GRAD_NM"},
					{"name": "LAN_DIV_RCD"},
					{"name": "CD"},
					{"name": "REF_KEY"},
					{"name": "CD_NM"},
					{"name": "SA_POST_DIV_RCD_NM"},
					{"name": "ST_DT"},
					{"name": "END_DT"}
				],
				"rows": []
			});
			app.register(dataSet_1);
			
			var dataSet_2 = new cpr.data.DataSet("dsListObjDivRcd");
			dataSet_2.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_2);
			
			var dataSet_3 = new cpr.data.DataSet("dsListLanDivRcd");
			dataSet_3.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_3);
			
			var dataSet_4 = new cpr.data.DataSet("dsTrvCmnSat");
			dataSet_4.parseData({
				"columns": [
					{"name": "OBJ_DIV_RCD"},
					{"name": "UKEY"},
					{"name": "LAN_DIV_RCD"},
					{"name": "CD"},
					{"name": "REF_KEY"},
					{"name": "CD_NM"},
					{"name": "CKEY"},
					{"name": "ST_DT"},
					{"name": "IMG_PATH"},
					{"name": "END_DT"}
				],
				"rows": []
			});
			app.register(dataSet_4);
			var dataMap_1 = new cpr.data.DataMap("dmReqCmd");
			dataMap_1.parseData({
				"columns" : [
					{
						"name": "strObjNm",
						"dataType": "string"
					},
					{
						"name": "strOprtRoleId",
						"dataType": "string"
					},
					{
						"name": "strObjDivRcd",
						"dataType": "string"
					},
					{
						"name": "strObjCd",
						"dataType": "string"
					},
					{
						"name": "authRngRcd",
						"dataType": "string"
					},
					{
						"name": "strKeyDate",
						"dataType": "string"
					},
					{
						"name": "strLanDivRcd",
						"dataType": "string"
					},
					{
						"name": "strKeyEndDate",
						"dataType": "string"
					},
					{
						"name": "strOtIsTreeView",
						"dataType": "string"
					},
					{
						"name": "strStartObject",
						"dataType": "string"
					},
					{
						"name": "strOtDivRcd",
						"dataType": "string"
					},
					{
						"name": "strBetweenEndDtYn",
						"dataType": "string"
					}
				]
			});
			app.register(dataMap_1);
			
			var dataMap_2 = new cpr.data.DataMap("dmResOnLoad");
			dataMap_2.parseData({
				"columns" : [{
					"name": "strDefLanDivRcd",
					"dataType": "string"
				}]
			});
			app.register(dataMap_2);
			
			var dataMap_3 = new cpr.data.DataMap("dmReqListTrv");
			dataMap_3.parseData({
				"columns" : [{
					"name": "strToObjDivRcd",
					"dataType": "string"
				}]
			});
			app.register(dataMap_3);
			var submission_1 = new cpr.protocols.Submission("subOnLoad");
			submission_1.action = "/cmn/StdCmnObjSch/";
			submission_1.mediaType = "application/x-www-form-urlencoded";
			submission_1.addResponseData(dataSet_2, false);
			submission_1.addResponseData(dataSet_3, false);
			submission_1.addResponseData(dataMap_2, false);
			app.register(submission_1);
			
			var submission_2 = new cpr.protocols.Submission("subList");
			submission_2.action = "/cmn/StdCmnObjSch/";
			submission_2.mediaType = "application/x-www-form-urlencoded";
			submission_2.addRequestData(dataMap_1);
			submission_2.addResponseData(dataSet_1, false);
			app.register(submission_2);
			
			var submission_3 = new cpr.protocols.Submission("subListTrv");
			submission_3.action = "/cmn/StdCmnObjSch/";
			submission_3.mediaType = "application/x-www-form-urlencoded";
			submission_3.addRequestData(dataMap_1);
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
			var userDefinedControl_1 = new udc.com.appHeader("appheader1");
			container.addChild(userDefinedControl_1, {
				"top": "5px",
				"right": "5px",
				"left": "5px",
				"height": "25px"
			});
			
			var button_1 = new cpr.controls.Button("btnCloseOk");
			button_1.value = "선택닫기";
			if(typeof onBtnCloseOkClick == "function") {
				button_1.addEventListener("click", onBtnCloseOkClick);
			}
			container.addChild(button_1, {
				"top": "415px",
				"left": "582px",
				"width": "60px",
				"height": "25px"
			});
			
			var button_2 = new cpr.controls.Button("btnCloseCancel");
			button_2.value = "화면닫기";
			if(typeof onBtnCloseCancelClick == "function") {
				button_2.addEventListener("click", onBtnCloseCancelClick);
			}
			container.addChild(button_2, {
				"top": "415px",
				"left": "10px",
				"width": "60px",
				"height": "25px"
			});
			
			var tabFolder_1 = new cpr.controls.TabFolder("tabMst");
			
			var tabItem_1 = (function(tabFolder){
				var tabItem_1 = new cpr.controls.TabItem();
				tabItem_1.text = "tab1";
				tabItem_1.name = "tpgSearch";
				var group_1 = new cpr.controls.Container("grptpgSearch");
				// Layout
				var formLayout_1 = new cpr.controls.layouts.FormLayout();
				formLayout_1.topMargin = "0px";
				formLayout_1.rightMargin = "0px";
				formLayout_1.bottomMargin = "0px";
				formLayout_1.leftMargin = "0px";
				formLayout_1.horizontalSpacing = "0px";
				formLayout_1.verticalSpacing = "0px";
				formLayout_1.setColumns(["1fr"]);
				formLayout_1.setRows(["1fr"]);
				group_1.setLayout(formLayout_1);
				(function(container){
					var group_2 = new cpr.controls.Container("grpSearch");
					group_2.style.setClasses(["search-box"]);
					// Layout
					var xYLayout_2 = new cpr.controls.layouts.XYLayout();
					group_2.setLayout(xYLayout_2);
					(function(container){
						var output_1 = new cpr.controls.Output("optObjDivRcd");
						output_1.value = "";
						output_1.bind("value").toLanguage("UI-SCR-OBJDIV");
						container.addChild(output_1, {
							"top": "5px",
							"left": "5px",
							"width": "90px",
							"height": "25px"
						});
						var output_2 = new cpr.controls.Output("optLanDivRcd");
						output_2.value = "";
						output_2.bind("value").toLanguage("UI-SCR-LANKEY");
						container.addChild(output_2, {
							"top": "5px",
							"left": "246px",
							"width": "90px",
							"height": "25px"
						});
						var inputBox_1 = new cpr.controls.InputBox("ipbObjCd");
						inputBox_1.bind("value").toDataMap(app.lookup("dmReqCmd"), "strObjCd");
						if(typeof onIpbObjCdKeydown == "function") {
							inputBox_1.addEventListener("keydown", onIpbObjCdKeydown);
						}
						container.addChild(inputBox_1, {
							"top": "28px",
							"left": "98px",
							"width": "140px",
							"height": "25px"
						});
						var output_3 = new cpr.controls.Output("optObjCd");
						output_3.value = "";
						output_3.bind("value").toLanguage("UI-DB-OBJ_CD");
						container.addChild(output_3, {
							"top": "28px",
							"left": "5px",
							"width": "90px",
							"height": "25px"
						});
						var output_4 = new cpr.controls.Output("optObjNm");
						output_4.value = "";
						output_4.bind("value").toLanguage("UI-SCR-OBJNM");
						container.addChild(output_4, {
							"top": "28px",
							"left": "246px",
							"width": "90px",
							"height": "25px"
						});
						var inputBox_2 = new cpr.controls.InputBox("ipbObjNm");
						inputBox_2.bind("value").toDataMap(app.lookup("dmReqCmd"), "strObjNm");
						if(typeof onIpbObjNmKeydown == "function") {
							inputBox_2.addEventListener("keydown", onIpbObjNmKeydown);
						}
						container.addChild(inputBox_2, {
							"top": "28px",
							"left": "340px",
							"width": "140px",
							"height": "25px"
						});
						var button_3 = new cpr.controls.Button("btnSearch");
						button_3.value = "조회";
						button_3.style.setClasses(["btn-search"]);
						if(typeof onBtnSearchClick == "function") {
							button_3.addEventListener("click", onBtnSearchClick);
						}
						if(typeof onBtnSearchClick == "function") {
							button_3.addEventListener("click", onBtnSearchClick);
						}
						container.addChild(button_3, {
							"top": "5px",
							"left": "565px",
							"width": "60px",
							"height": "25px"
						});
						var comboBox_1 = new cpr.controls.ComboBox("cbbObjDivRcd");
						comboBox_1.multiple = true;
						comboBox_1.userAttr({"require": "Y"});
						comboBox_1.bind("fieldLabel").toExpression("#optSystemTitle.value");
						comboBox_1.bind("value").toDataMap(app.lookup("dmReqCmd"), "strObjDivRcd");
						(function(comboBox_1){
							comboBox_1.addItem(new cpr.controls.Item("전체", ""));
							comboBox_1.setItemSet(app.lookup("dsListObjDivRcd"), {
								"label": "CD_NM",
								"value": "CD"
							});
						})(comboBox_1);
						container.addChild(comboBox_1, {
							"top": "4px",
							"left": "98px",
							"width": "140px",
							"height": "25px"
						});
						var comboBox_2 = new cpr.controls.ComboBox("cbbLanDivRcd");
						comboBox_2.userAttr({"require": "Y"});
						comboBox_2.bind("fieldLabel").toExpression("#optSystemTitle.value");
						comboBox_2.bind("value").toDataMap(app.lookup("dmReqCmd"), "strLanDivRcd");
						(function(comboBox_2){
							comboBox_2.addItem(new cpr.controls.Item("전체", ""));
							comboBox_2.setItemSet(app.lookup("dsListLanDivRcd"), {
								"label": "CD_NM",
								"value": "CD"
							});
						})(comboBox_2);
						container.addChild(comboBox_2, {
							"top": "5px",
							"left": "340px",
							"width": "140px",
							"height": "25px"
						});
						var output_5 = new cpr.controls.Output("ipbObjDivRcd");
						output_5.visible = false;
						output_5.value = "";
						container.addChild(output_5, {
							"top": "4px",
							"left": "98px",
							"width": "140px",
							"height": "25px"
						});
					})(group_2);
					container.addChild(group_2, {
						"top": "5px",
						"left": "5px",
						"width": "630px",
						"height": "55px"
					});
					var group_3 = new cpr.controls.Container("grp_rptCmnSat");
					// Layout
					var xYLayout_3 = new cpr.controls.layouts.XYLayout();
					group_3.setLayout(xYLayout_3);
					(function(container){
						var userDefinedControl_2 = linker.userDefinedControl_2 = new udc.com.comTitle();
						userDefinedControl_2.bind("title").toLanguage("");
						container.addChild(userDefinedControl_2, {
							"top": "5px",
							"left": "5px",
							"width": "256px",
							"height": "25px"
						});
						var grid_1 = linker.grid_1 = new cpr.controls.Grid("grdCmnSat");
						grid_1.init({
							"dataSet": app.lookup("dsCmnSat"),
							"columns": [
								{"width": "77px"},
								{"width": "65px"},
								{"width": "253px"},
								{"width": "67px"},
								{"width": "72px"},
								{"width": "72px"},
								{"width": "122px"},
								{
									"width": "51px",
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
											cell.bind("text").toLanguage("UI-SCR-OBJDIV");
										}
									},
									{
										"constraint": {"rowIndex": 0, "colIndex": 1},
										"configurator": function(cell){
											cell.bind("text").toLanguage("UI-DB-OBJ_CD");
										}
									},
									{
										"constraint": {"rowIndex": 0, "colIndex": 2},
										"configurator": function(cell){
											cell.bind("text").toLanguage("UI-SCR-OBJNM");
										}
									},
									{
										"constraint": {"rowIndex": 0, "colIndex": 3},
										"configurator": function(cell){
											cell.bind("text").toLanguage("UI-SCR-DIVISION");
										}
									},
									{
										"constraint": {"rowIndex": 0, "colIndex": 4},
										"configurator": function(cell){
											cell.bind("text").toLanguage("UI-DB-ST_DT");
										}
									},
									{
										"constraint": {"rowIndex": 0, "colIndex": 5},
										"configurator": function(cell){
											cell.bind("text").toLanguage("UI-DB-END_DT");
										}
									},
									{
										"constraint": {"rowIndex": 0, "colIndex": 6},
										"configurator": function(cell){
											cell.bind("text").toLanguage("UI-SCR-DGRDIV");
										}
									},
									{
										"constraint": {"rowIndex": 0, "colIndex": 7},
										"configurator": function(cell){
											cell.text = "REF_KEY";
										}
									},
									{
										"constraint": {"rowIndex": 0, "colIndex": 8},
										"configurator": function(cell){
											cell.text = "LAN_DIV_RCD";
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
											cell.columnName = "OBJ_DIV_RCD";
											cell.control = (function(){
												var comboBox_3 = new cpr.controls.ComboBox("gdCbbObjDivRcd");
												comboBox_3.enabled = false;
												comboBox_3.hideButton = true;
												(function(comboBox_3){
													comboBox_3.setItemSet(app.lookup("dsListObjDivRcd"), {
														"label": "CD_NM",
														"value": "CD"
													});
												})(comboBox_3);
												comboBox_3.bind("value").toDataColumn("OBJ_DIV_RCD");
												return comboBox_3;
											})();
										}
									},
									{
										"constraint": {"rowIndex": 0, "colIndex": 1},
										"configurator": function(cell){
											cell.columnName = "CD";
										}
									},
									{
										"constraint": {"rowIndex": 0, "colIndex": 2},
										"configurator": function(cell){
											cell.columnName = "CD_NM";
										}
									},
									{
										"constraint": {"rowIndex": 0, "colIndex": 3},
										"configurator": function(cell){
											cell.columnName = "UNI_GRAD_NM";
										}
									},
									{
										"constraint": {"rowIndex": 0, "colIndex": 4},
										"configurator": function(cell){
											cell.columnName = "ST_DT";
										}
									},
									{
										"constraint": {"rowIndex": 0, "colIndex": 5},
										"configurator": function(cell){
											cell.columnName = "END_DT";
										}
									},
									{
										"constraint": {"rowIndex": 0, "colIndex": 6},
										"configurator": function(cell){
											cell.columnName = "SA_POST_DIV_RCD_NM";
										}
									},
									{
										"constraint": {"rowIndex": 0, "colIndex": 7},
										"configurator": function(cell){
											cell.columnName = "REF_KEY";
										}
									},
									{
										"constraint": {"rowIndex": 0, "colIndex": 8},
										"configurator": function(cell){
											cell.columnName = "LAN_DIV_RCD";
										}
									}
								]
							}
						});
						if(typeof onGrdCmnSatRowDblclick == "function") {
							grid_1.addEventListener("row-dblclick", onGrdCmnSatRowDblclick);
						}
						container.addChild(grid_1, {
							"top": "30px",
							"left": "5px",
							"width": "620px",
							"height": "245px"
						});
					})(group_3);
					container.addChild(group_3, {
						"top": "65px",
						"left": "5px",
						"width": "630px",
						"height": "280px"
					});
				})(group_1);
				tabItem_1.content = group_1;
				return tabItem_1;
			})(tabFolder_1);
			tabFolder_1.addTabItem(tabItem_1);
			
			var tabItem_2 = (function(tabFolder){
				var tabItem_2 = new cpr.controls.TabItem();
				tabItem_2.text = "tab1";
				tabItem_2.name = "tpgTree";
				var group_4 = new cpr.controls.Container("grptpgTree");
				// Layout
				var formLayout_2 = new cpr.controls.layouts.FormLayout();
				formLayout_2.topMargin = "0px";
				formLayout_2.rightMargin = "0px";
				formLayout_2.bottomMargin = "0px";
				formLayout_2.leftMargin = "0px";
				formLayout_2.horizontalSpacing = "0px";
				formLayout_2.verticalSpacing = "0px";
				formLayout_2.setColumns(["1fr"]);
				formLayout_2.setRows(["1fr"]);
				group_4.setLayout(formLayout_2);
				(function(container){
					var button_4 = new cpr.controls.Button("btnExpandAll");
					button_4.value = "";
					button_4.bind("value").toLanguage("UI-SCR-SHOWALL");
					if(typeof onBtnExpandAllClick == "function") {
						button_4.addEventListener("click", onBtnExpandAllClick);
					}
					container.addChild(button_4, {
						"top": "5px",
						"left": "5px",
						"width": "70px",
						"height": "25px"
					});
				})(group_4);
				tabItem_2.content = group_4;
				return tabItem_2;
			})(tabFolder_1);
			tabFolder_1.addTabItem(tabItem_2);
			tabFolder_1.setSelectedTabItem(tabItem_1);
			container.addChild(tabFolder_1, {
				"top": "60px",
				"left": "5px",
				"width": "640px",
				"height": "350px"
			});
			
			var button_5 = new cpr.controls.Button("tbtSearch");
			button_5.value = "";
			button_5.bind("value").toLanguage("UI-GLS-SRH");
			if(typeof onTbtSearchClick == "function") {
				button_5.addEventListener("click", onTbtSearchClick);
			}
			container.addChild(button_5, {
				"top": "35px",
				"left": "5px",
				"width": "80px",
				"height": "25px"
			});
			
			var button_6 = new cpr.controls.Button("tbtTree");
			button_6.value = "";
			button_6.bind("value").toLanguage("UI-SCR-TREESTRU");
			if(typeof onTbtTreeClick == "function") {
				button_6.addEventListener("click", onTbtTreeClick);
			}
			container.addChild(button_6, {
				"top": "35px",
				"left": "87px",
				"width": "80px",
				"height": "25px"
			});
			if(typeof onBodyLoad == "function"){
				app.addEventListener("load", onBodyLoad);
			}
			// Linking
			linker.userDefinedControl_2.ctrl = linker.grid_1;
		}
	});
	app.title = "객체검색화면(PopUp)";
	cpr.core.Platform.INSTANCE.register(app);
})();