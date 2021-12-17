/*
 * App URI: app/cmn/stdCmnCDefaulRole
 * Source Location: app/cmn/stdCmnCDefaulRole.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("app/cmn/stdCmnCDefaulRole", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			﻿//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
			/// <xtmlink path="./stdCmnCDefaulRole.xtm"/>
			
			var stdCmnCDefaulRole = function() {
				var moPage = new Page();
				
				moPage.onLoadImportDone_ImpTitle = function() {
					doHeaderOnLoad();
				}
				
				moPage.onModelConstructDone_StdCmnCDefaulRole = function() {
					doOnLoad();
				};
				
				/** 온로드
				 * @desc
				 * @param
				 * @return
				 * @author 강현우 2016.02.24
				 */	
				function doOnLoad() {
					
					//리피트 초기 설정
			//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
			//		ExtRepeat.init(["rptCmnDefaulRole", "rptCmnRole"]);
					//검색조건 초기 설정
			//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
			//		ExtGroup.initSearchBox("grpSearch", "grpData");
					//서브미션 실행 (실패시 cover page)
					//strCommand: onLoad 
					util.Submit.send(app, "subOnLoad", function(pbSuccess) {
						if (pbSuccess) {
							//기본 언어키로 초기값 설정
							util.DataMap.setValue(app, "dmRoot", "reqList", "strLanDivRcd", msSystemLocale);
						}
					}, true);
				}
				
				/** 조회
				 * @desc
				 * @param 조회후 콜백함수
				 * @return
				 * @author 강현우 2016.02.24
				 */	
				function doList(poCallBackFunc) {
					
					//strCommand: list 
					util.Submit.send(app, "subList", function(pbSuccess) {
						if (pbSuccess) {
											
							util.Control.redraw(app, "grdCmnRole");
							util.Control.redraw(app, "grdCmnDefaulRole");
							
							ExtTreeView.rebuild(["trvCmnUserDiv"]);
							// 조회 후 콜백함수 수행
							if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
						}
					});
				}
				
				/**
				 * @desc 작업저장
				 * @param
				 * @return void
				 * @author 강현우 2016.02.25
				 */	
				function doSave() {
					
					// 리피터 변경사항 체크
					if (!util.Grid.isModified(app, "grdCmnDefaulRole", "MSG")) {
						return false;
					}
					//리피트 validation check
					if (!util.validate(app, "grdCmnDefaulRole")) return false;
					
					//strCommand: save 
					util.Submit.send(app, "subSave", function(pbSuccess) {
						if (pbSuccess) {
							
							doList(function(pbListSuccess) {
								// 조회 : "갱신된 데이터가 조회되었습니다." header 메세지 표시
								if (pbListSuccess) util.Msg.notify(app, "NLS.INF.M025");
							});
						}
					});
					
				}
				
				/**
				 * @desc 신분별업무역할메뉴 목록을 등록한다.
				 * @param
				 * @return void
				 * @author 강현우 2016.02.24
				 */	
				var maRelatedCds = []; // 선택 사용자와 관련된 사용자 CD 담을 배열
				
				//비교할 컬럼 목록
				var maCompareCols = ["USER_DIV_RCD", "USER_DIV_NM"];
				var msCompareRole = "OPRT_ROLE_ID"; //업무역할 ID
				
				var mnInsertRowCnt = 0; //입력건수
				
				moPage.insertSelectedMenu = function() {
					// 추가할 사용자CD (선택되어진 항목들을 ','구분자로 가져옴)
					var vsUserCd = ExtTreeView.getSelectedItems("trvCmnUserDiv", "VALUE");
					// 추가할 업무역할의 ID
					var vsOprtRoleId = util.Grid.getCellValue(app, "grdCmnRole", "OPRT_ROLE_ID", util.Grid.getIndex(app, "grdCmnRole"));
					var vsOprtRoleNm = util.Grid.getCellValue(app, "grdCmnRole", "OPRT_ROLE_NM", util.Grid.getIndex(app, "grdCmnRole"));
					
					if (ValueUtil.isNull(vsUserCd) || ValueUtil.isNull(vsOprtRoleId)) {
						//이관할 데이터를 선택하세요. 
						util.Msg.alert("NLS-INF-M006");
						return;
					}
					
					// 추가할 사용자 배열
					var vaUserCds = null;
					if (String(vsUserCd).indexOf(",") != - 1) {
						vaUserCds = vsUserCd.split(",");
					} else {
						vaUserCds = new Array();
						vaUserCds [0] = vsUserCd;
					}
					
					mnInsertRowCnt = 0;
					
					moPage.validAndInsertData(vaUserCds, vsOprtRoleId, vsOprtRoleNm);
					
			//		for (var i = 0; i < vaUserCds.length; i++) {
			//			//초기화
			//			maRelatedCds = [];
			//			
			//			var vsCd = vaUserCds [i]; // 사용자CD
			//			
			//			//자식키 존재여부를 확인하고 하위노드들만 전역변수에 담는다.
			//			//moPage.getChildIds(vsCd);
			//			
			//			//전역변수에 담은 키값들로 사용자구분목록을 찾고 선택한 업무역할을 리피트에 입력한다.
			//			moPage.validAndInsertData(vaUserCds, vsOprtRoleId);
			//			
			//		}
					
					// "이관되었습니다."
					if (mnInsertRowCnt > 0) util.Msg.notify(app, "NLS.INF.M007");
					
				};
				
				/**
				 * @desc 선택한 사용자를 등록하되 자식이 있는 경우 자식사용자들의 CD를 maRelatedCds 에 등록한다.
				 * @param psUserCd
				 * @return
				 * @author 강현우 2016.02.11
				 */	
				moPage.getChildIds = function(psUserCd) {
					
					//입력받은 키를 부모키로 가지는 메뉴 인스턴스를 가져옴
					var voChildList = ExtInstance.getNodeListObj("/root/resList/trvCmnUserDiv/row[child::UP_CD='" + psUserCd + "']");
					
					//자식노드가 없다면 입력받은 키를 배열에 등록
					if (voChildList == null || voChildList.length == 0) {
						maRelatedCds.push(psUserCd);
						return;
					}
					
					var vnChildCnt = voChildList.length;
					for (var i = 0; i < vnChildCnt; i++) {
						var voChildRow = ExtInstance.getNodeToObject(voChildList [i]);
						var vsChildUserCd = voChildRow.USER_DIV_RCD;
						
						//자식사용자 스스로가 자식사용자를 가지고 있을 경우 새로 검색
						//없을 경우 자식CD만 maRelatedCds에 등록
						var vnChildChildCnt = ExtInstance.getNodeListLength("/root/resList/trvCmnUserDiv/row[child::UP_CD='" + vsChildUserCd + "']"); //자식사용자를 부모로 가지는 사용자구분 검색 
						if (vnChildChildCnt == 0 || vnChildChildCnt == null) maRelatedCds.push(vsChildUserCd);
						else moPage.getChildIds(vsChildUserCd);
						
					}
					
				};
				
				/**
				 * @desc 입력받은 키값의 배열을 리피트에 존재하는지 체크 후, 없는 경우 등록한다.
				 * @param paCds 사용자구분코드
				 * @param psOprtRoleId 업무역할ID
				 * @return
				 * @author 강현우 2016.02.25
				 */	
				moPage.validAndInsertData = function(paCds, psOprtRoleId, psOprtRoleNm) {
					if (paCds == null || psOprtRoleId == null) return;
					
					// 선택한 사용자구분의 하위 사용자들 
					for (var i = 0; i < paCds.length; i++) {
						var voUserRow = ExtInstance.getNodeListObj("/root/resList/trvCmnUserDiv/row[child::USER_DIV_RCD='" + paCds [i] + "']");
						
						if (voUserRow == null) continue;
						
						var voRowObj = ExtInstance.getNodeToObject(voUserRow [0]);
						var vsUserNm = voRowObj.USER_DIV_NM;
						
						//2016.02.25 강현우 리피트존재 여부 체크를 상태코드 valueChange로 이동
						moPage.insertToRepeat(voUserRow, psOprtRoleId, psOprtRoleNm);
						
					}
					
				};
				
				/**
				 * @desc 메뉴의 인스턴스 로우를 리피트에 등록
				 * @param
				 * @return
				 * @author 강현우 2016.02.25
				 */	
				moPage.insertToRepeat = function(poMenuRow, psOprtRoleId, psOprtRoleNm) {
					//신규 행 생성
					var vnInsIdx = util.Grid.insertRow(app, "grdCmnDefaulRole");
					
					//선택한 메뉴의 각 컬럼값을 신규행에 입력
					for (var i = 0; i < maCompareCols.length; i++) {
						var vsCompareValue = ExtInstance.getNodeToObject(poMenuRow [0]) [maCompareCols [i]];
						util.Grid.setCellValue(app, "grdCmnDefaulRole", maCompareCols [i], vsCompareValue, vnInsIdx);
					}
					util.Grid.setCellValue(app, "grdCmnDefaulRole", msCompareRole, psOprtRoleId, vnInsIdx);
					util.Grid.setCellValue(app, "grdCmnDefaulRole", "OPRT_ROLE_NM", psOprtRoleNm, vnInsIdx);
					
					util.Grid.setCellValue(app, "grdCmnDefaulRole", "APLY_YN", "Y", vnInsIdx);
					
					//입력건수 +1
					mnInsertRowCnt++;
				};
				
				moPage.onClick_BtnSearch = function() {
					// 데이터 변경상태 체크 메시지 
					if (util.Grid.isModified(app, "", "CRM")) {
						return false;
					}
					
					doList(function(pbSuccess) {
						// 조회 : "조회되었습니다." header 메세지 표시
						if (pbSuccess) util.Msg.notify(app, "NLS.INF.M024");
					});
				};
				
				/**
				 * @desc 상태코드 입력시 리피트에 중복되는 컬럼이 있는지 체크
				 * @param paConValue
				 * @return vbResult
				 * @author 강현우 2016.02.25
				 */	
				moPage.isExistData = function(paConValue) {
					var vbResult = false;
					var vsCondition = "";
					var vaCompareCols = ["USER_DIV_RCD", "STAT_RCD", "OPRT_ROLE_ID"];
					
					// 비교문 작성 
					for (var i = 0; i < vaCompareCols.length; i++) {
						if (i > 0) {
							vsCondition += " and ";
						}
						vsCondition += vaCompareCols [i] + "='" + paConValue [i] + "' ";
					}
					
					//해당 인스턴스 존재여부 체크
					var vnExistDataCnt = ExtInstance.getNodeListLength("/root/resList/rptCmnDefaulRole/row[child::" + vsCondition + "]");
					// 자기자신을 제외하고 PK값들이 동일한 로우가 존재할 경우
					if (vnExistDataCnt > 1) {
						// 중복된 항목이 존재합니다.목록을 확인하시기 바랍니다.
						util.Msg.alert("NLS-ERR-M006");
						vbResult = true;
					}
					return vbResult;
					
				}
				
				moPage.onValueChanged_RdOptStatRcd = function() {
					var vnIdx = util.Grid.getIndex(app, "grdCmnDefaulRole");
					var vnCbbIdx = util.SelectCtl.getSelectedIndex(app, "rdCbbStatRcd");
					
					var vsUserDivRcd = util.Grid.getCellValue(app, "grdCmnDefaulRole", "USER_DIV_RCD", vnIdx); //사용자구분
					var vsStatRcd = util.SelectCtl.getValue(app, "rdCbbStatRcd", vnCbbIdx); //지정하고자하는 상태코드 
					
					var vsOprtRoleId = util.Grid.getCellValue(app, "grdCmnDefaulRole", "OPRT_ROLE_ID", vnIdx); //업무역할ID
					
					var vaConValue = [vsUserDivRcd, vsStatRcd, vsOprtRoleId];
					
					//중복되는 컬럼이 있는지 체크
					if (moPage.isExistData(vaConValue)) {
						util.Grid.setCellValue(app, "grdCmnDefaulRole", "STAT_RCD", "");
						return;
					}
					
					var voUserDivList = ExtInstance.getNodeListObj("/root/resList/trvCmnUserDiv/row[child::USER_DIV_RCD='" + vsUserDivRcd + "']");
					var vsUserDiv = ExtInstance.getNodeToObject(voUserDivList[0]).USER_DIV_RCD_DIV;
					
					var voStatRow = ExtInstance.getNodeListObj("/root/resOnLoad/statRcdList/row[child::CD='" + vsStatRcd + "']");
					var vsStat = ExtInstance.getNodeToObject(voStatRow[0]).CD_PRP3;
					
					if (vsStatRcd == "CC01000") return;
					
					
					if(vsUserDiv != vsStat){
						util.Msg.alert("NLS-CMM-M046");
						util.Grid.setCellValue(app, "grdCmnDefaulRole", "STAT_RCD", "");
					}
				};
				
				moPage.onValueChanged_RhCkbSelect = function() {
			//TO-BE: <ExtRepeat.selectedAllPanel> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
			//		ExtRepeat.selectedAllPanel("rhCkbSelect");
				}
				
				
			//	moPage.onUpdate_RptCmnUserQikMenu = function() {
			//		//ExtRepeat.updateRow("rptCmnDefaulRole");
			//	}
				
				
				moPage.onClick_BtnInsert = function() {
					moPage.insertSelectedMenu();
				}
				
				moPage.onClick_BtnSave = function() {
					doSave();
				}
				
				moPage.onClick_BtnRestore = function() {
					util.Grid.restoreRow(app, "grdCmnDefaulRole");
				}
				
				moPage.onClick_BtnDel = function() {
					util.Grid.deleteRow(app, "grdCmnDefaulRole");
				}
				
				moPage.onKeyDown_IpbOprtRoleId = function(strKeyType, strKeyStatus) {
					if (strKeyType == 13) {
						util.Header.clickSearch(app);
					}
				};
				
				moPage.onKeyDown_IpbOprtRoleNm = function(strKeyType, strKeyStatus) {
					if (strKeyType == 13) {
						util.Header.clickSearch(app);
					}
				};
				
				
				moPage.onRowSelect_RptCmnRole = function() {
					var vnIdx = util.Grid.getIndex(app, "grdCmnRole");
					var vsOprtRoleNm = util.Grid.getCellValue(app, "grdCmnRole", "OPRT_ROLE_NM", vnIdx);
					ExtControl.setTextValue("lblSelectedRoleNm", "[ "+ vsOprtRoleNm + " ]");
					util.Control.redraw(app, "lblSelectedRoleNm");
				};
				
				
				moPage.onRowSelect_RptCmnDefaulRole = function() {
					//var vsUserDivRcd = ExtRepeat.getValue("rptCmnDefaulRole", "USER_DIV_RCD"); //사용자구분
					//
					//var vsTrvPValue = "";
					//
					//function getParentValue(psValue){
					//	
					//	var voItem = ExtTreeView.getFindItem("trvCmnUserDiv", psValue);
					//	var voPItem = voItem.getParent();
					//	var vsPValue = voPItem.getValue();
					//	if(ValueUtil.isNull(vsPValue)){
					//		vsTrvPValue = psValue;
					//		return;
					//	}else{
					//		getParentValue(vsPValue);
					//	}
					//
					//}
					//
					//getParentValue(vsUserDivRcd);
					//
					//alert(vsTrvPValue);
					
					//ExtControl.rebuild("rdCbbStatRcd");
				};
				
				
				
			//	moPage.onSetFocus_RdCbbStatRcd = function() {
			//		
			//	};
				
				return moPage;
			};;
			// End - User Script
			
			// Header
			var dataSet_1 = new cpr.data.DataSet("dsUserDivRcdList");
			dataSet_1.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_1);
			
			var dataSet_2 = new cpr.data.DataSet("dsStatRcdList");
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
			
			var dataSet_4 = new cpr.data.DataSet("dsMngObjDivRcdList");
			dataSet_4.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_4);
			
			var dataSet_5 = new cpr.data.DataSet("dsCmnRole");
			dataSet_5.parseData({
				"info": "CMN_ROLE@OPRT_ROLE_ID",
				"columns": [
					{"name": "OPRT_ROLE_ID"},
					{"name": "OPRT_ROLE_NM"},
					{"name": "DEPT_CD"},
					{"name": "OBJ_DIV_RCD"},
					{"name": "OPRT_ROLE_DESC"},
					{"name": "USE_YN"},
					{"name": "MNG_DEPT_CD"},
					{"name": "MNG_OBJ_DIV_RCD"},
					{"name": "ST_DT"},
					{"name": "END_DT"},
					{"name": "EXP_DT"},
					{"name": "BASE_AUTH_YN"}
				],
				"rows": []
			});
			app.register(dataSet_5);
			
			var dataSet_6 = new cpr.data.DataSet("dsCmnDefaulRole");
			dataSet_6.parseData({
				"info": "CMN_DEFAUL_ROLE@USER_DIV_RCD,STAT_RCD,OPRT_ROLE_ID",
				"columns": [
					{"name": "USER_DIV_RCD"},
					{"name": "STAT_RCD"},
					{"name": "OPRT_ROLE_ID"},
					{"name": "APLY_YN"},
					{"name": "REMARK"},
					{"name": "USER_DIV_NM"},
					{"name": "STAT_NM"},
					{"name": "OPRT_ROLE_NM"}
				],
				"rows": []
			});
			app.register(dataSet_6);
			
			var dataSet_7 = new cpr.data.DataSet("dsTrvCmnUserDiv");
			dataSet_7.parseData({
				"columns": [
					{"name": "USER_DIV_RCD"},
					{"name": "USER_DIV_NM"},
					{"name": "UP_CD"}
				],
				"rows": []
			});
			app.register(dataSet_7);
			var dataMap_1 = new cpr.data.DataMap("dmReqKey");
			dataMap_1.parseData({
				"columns" : [
					{
						"name": "strOprtRoleId",
						"dataType": "string"
					},
					{
						"name": "strOprtRoleNm",
						"dataType": "string"
					},
					{
						"name": "strLanDivRcd",
						"dataType": "string"
					}
				]
			});
			app.register(dataMap_1);
			var submission_1 = new cpr.protocols.Submission("subOnLoad");
			submission_1.action = "/cmn/StdCmnDefaulRole/";
			submission_1.mediaType = "application/x-www-form-urlencoded";
			submission_1.addResponseData(dataSet_1, false);
			submission_1.addResponseData(dataSet_2, false);
			submission_1.addResponseData(dataSet_3, false);
			submission_1.addResponseData(dataSet_4, false);
			app.register(submission_1);
			
			var submission_2 = new cpr.protocols.Submission("subList");
			submission_2.action = "/cmn/StdCmnDefaulRole/";
			submission_2.mediaType = "application/x-www-form-urlencoded";
			submission_2.addRequestData(dataMap_1);
			submission_2.addResponseData(dataSet_5, false);
			submission_2.addResponseData(dataSet_6, false);
			submission_2.addResponseData(dataSet_7, false);
			app.register(submission_2);
			
			var submission_3 = new cpr.protocols.Submission("subSave");
			submission_3.action = "/cmn/StdCmnDefaulRole/";
			submission_3.mediaType = "application/x-www-form-urlencoded";
			submission_3.addRequestData(dataSet_6);
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
				var output_1 = new cpr.controls.Output("optOprtRoleId");
				output_1.value = "";
				output_1.bind("value").toLanguage("UI-DB-OPRT_ROLE_ID");
				container.addChild(output_1, {
					"top": "5px",
					"left": "5px",
					"width": "100px",
					"height": "25px"
				});
				var button_1 = new cpr.controls.Button("btnSearch");
				button_1.value = "";
				button_1.style.setClasses(["btn-search"]);
				button_1.bind("value").toLanguage("UI-SCR-SCH");
				if(typeof onBtnSearchClick == "function") {
					button_1.addEventListener("click", onBtnSearchClick);
				}
				container.addChild(button_1, {
					"top": "5px",
					"left": "1160px",
					"width": "60px",
					"height": "25px"
				});
				var output_2 = new cpr.controls.Output("optOprtRoleNm");
				output_2.value = "";
				output_2.bind("value").toLanguage("UI-DB-OPRT_ROLE_NM");
				container.addChild(output_2, {
					"top": "5px",
					"left": "250px",
					"width": "100px",
					"height": "25px"
				});
				var inputBox_1 = new cpr.controls.InputBox("ipbOprtRoleId");
				inputBox_1.imeMode = "inactive";
				inputBox_1.bind("fieldLabel").toExpression("#optOprtRoleId.value");
				inputBox_1.bind("value").toDataMap(app.lookup("dmReqKey"), "strOprtRoleId");
				if(typeof onIpbOprtRoleIdKeydown == "function") {
					inputBox_1.addEventListener("keydown", onIpbOprtRoleIdKeydown);
				}
				container.addChild(inputBox_1, {
					"top": "5px",
					"left": "110px",
					"width": "130px",
					"height": "25px"
				});
				var inputBox_2 = new cpr.controls.InputBox("ipbOprtRoleNm");
				inputBox_2.bind("fieldLabel").toExpression("#optOprtRoleNm.value");
				inputBox_2.bind("value").toDataMap(app.lookup("dmReqKey"), "strOprtRoleNm");
				if(typeof onIpbOprtRoleNmKeydown == "function") {
					inputBox_2.addEventListener("keydown", onIpbOprtRoleNmKeydown);
				}
				container.addChild(inputBox_2, {
					"top": "5px",
					"left": "355px",
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
					"left": "520px",
					"width": "265px",
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
					"left": "1030px",
					"width": "60px",
					"height": "25px"
				});
				var button_3 = new cpr.controls.Button("btnRestore");
				button_3.value = "";
				button_3.style.setClasses(["btn-restore"]);
				button_3.bind("value").toLanguage("UI-SCR-WRKCANCL");
				if(typeof onBtnRestoreClick == "function") {
					button_3.addEventListener("click", onBtnRestoreClick);
				}
				container.addChild(button_3, {
					"top": "5px",
					"left": "1095px",
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
					"left": "1160px",
					"width": "60px",
					"height": "25px"
				});
				var userDefinedControl_3 = new udc.com.comFormTitle();
				userDefinedControl_3.bind("title").toLanguage("UI-SCR-USEDIVLST");
				container.addChild(userDefinedControl_3, {
					"top": "290px",
					"left": "5px",
					"width": "150px",
					"height": "25px"
				});
				var button_5 = new cpr.controls.Button("btnInsert");
				button_5.value = "";
				if(typeof onBtnInsertClick == "function") {
					button_5.addEventListener("click", onBtnInsertClick);
				}
				container.addChild(button_5, {
					"top": "285px",
					"left": "490px",
					"width": "25px",
					"height": "25px"
				});
				var grid_1 = linker.grid_1 = new cpr.controls.Grid("grdCmnDefaulRole");
				grid_1.init({
					"dataSet": app.lookup("dsCmnDefaulRole"),
					"columns": [
						{"width": "25px"},
						{"width": "25px"},
						{"width": "40px"},
						{"width": "123px"},
						{"width": "103px"},
						{"width": "150px"},
						{"width": "140px"},
						{"width": "140px"},
						{"width": "65px"},
						{"width": "220px"}
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
									cell.bind("text").toLanguage("UI-DB-USER_DIV_RCD");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 4},
								"configurator": function(cell){
									cell.style.setClasses(["require"]);
									cell.bind("text").toLanguage("UI-DB-USER_DIV_RCD");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 5},
								"configurator": function(cell){
									cell.style.setClasses(["require"]);
									cell.bind("text").toLanguage("UI-DB-STAT_RCD");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 6},
								"configurator": function(cell){
									cell.style.setClasses(["require"]);
									cell.bind("text").toLanguage("UI-DB-OPRT_ROLE_ID");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 7},
								"configurator": function(cell){
									cell.style.setClasses(["require"]);
									cell.bind("text").toLanguage("UI-DB-OPRT_ROLE_ID");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 8},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-DB-APLY_YN");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 9},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-DB-REMARK");
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
									cell.columnName = "USER_DIV_RCD";
									cell.control = (function(){
										var comboBox_1 = new cpr.controls.ComboBox("gdCbbUserDivRcd");
										comboBox_1.userAttr({"require": "Y"});
										(function(comboBox_1){
											comboBox_1.addItem(new cpr.controls.Item("선택", ""));
											comboBox_1.setItemSet(app.lookup("dsTrvCmnUserDiv"), {
												"label": "USER_DIV_NM",
												"value": "USER_DIV_RCD"
											});
										})(comboBox_1);
										comboBox_1.bind("value").toDataColumn("USER_DIV_RCD");
										return comboBox_1;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 4},
								"configurator": function(cell){
									cell.columnName = "USER_DIV_RCD";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 5},
								"configurator": function(cell){
									cell.columnName = "STAT_RCD";
									cell.control = (function(){
										var comboBox_2 = new cpr.controls.ComboBox("gdCbbStatRcd");
										(function(comboBox_2){
											comboBox_2.setItemSet(app.lookup("dsStatRcdList"), {
												"label": "CD_NM",
												"value": "CD"
											});
										})(comboBox_2);
										comboBox_2.bind("value").toDataColumn("STAT_RCD");
										return comboBox_2;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 6},
								"configurator": function(cell){
									cell.columnName = "OPRT_ROLE_ID";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 7},
								"configurator": function(cell){
									cell.columnName = "OPRT_ROLE_NM";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 8},
								"configurator": function(cell){
									cell.columnName = "APLY_YN";
									cell.control = (function(){
										var checkBox_1 = new cpr.controls.CheckBox("gdCkbAplyYn");
										checkBox_1.value = "";
										checkBox_1.trueValue = "Y";
										checkBox_1.falseValue = "";
										checkBox_1.text = "";
										checkBox_1.style.css({
											"text-align" : "center"
										});
										checkBox_1.bind("value").toDataColumn("APLY_YN");
										return checkBox_1;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 9},
								"configurator": function(cell){
									cell.columnName = "REMARK";
								}
							}
						]
					}
				});
				if(typeof onGrdCmnDefaulRoleSelectionChange == "function") {
					grid_1.addEventListener("selection-change", onGrdCmnDefaulRoleSelectionChange);
				}
				container.addChild(grid_1, {
					"top": "30px",
					"left": "520px",
					"width": "700px",
					"height": "565px"
				});
				var userDefinedControl_4 = linker.userDefinedControl_4 = new udc.com.comTitle();
				userDefinedControl_4.bind("title").toLanguage("");
				container.addChild(userDefinedControl_4, {
					"top": "5px",
					"left": "5px",
					"width": "265px",
					"height": "25px"
				});
				var output_4 = new cpr.controls.Output("optSelectedRoleNm");
				output_4.value = "";
				container.addChild(output_4, {
					"top": "5px",
					"left": "165px",
					"width": "150px",
					"height": "25px"
				});
				var grid_2 = linker.grid_2 = new cpr.controls.Grid("grdCmnRole");
				grid_2.init({
					"dataSet": app.lookup("dsCmnRole"),
					"columns": [
						{"width": "40px"},
						{"width": "112px"},
						{"width": "156px"},
						{"width": "158px"},
						{
							"width": "64px",
							"visible": false
						},
						{
							"width": "100px",
							"visible": false
						},
						{
							"width": "65px",
							"visible": false
						},
						{
							"width": "100px",
							"visible": false
						},
						{
							"width": "120px",
							"visible": false
						},
						{
							"width": "100px",
							"visible": false
						},
						{
							"width": "100px",
							"visible": false
						},
						{
							"width": "100px",
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
									cell.text = "No";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 1},
								"configurator": function(cell){
									cell.style.setClasses(["require"]);
									cell.bind("text").toLanguage("UI-DB-OPRT_ROLE_ID");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 2},
								"configurator": function(cell){
									cell.style.setClasses(["require"]);
									cell.bind("text").toLanguage("UI-DB-OPRT_ROLE_NM");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 3},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-DB-OPRT_ROLE_DESC");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 4},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-DB-DEPT_CD");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 5},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-DB-OBJ_DIV_RCD");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 6},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-DB-USE_YN");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 7},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-DB-MNG_DEPT_CD");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 8},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-DB-MNG_DEPT_DIV_RCD");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 9},
								"configurator": function(cell){
									cell.style.setClasses(["require"]);
									cell.bind("text").toLanguage("UI-DB-ST_DT");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 10},
								"configurator": function(cell){
									cell.style.setClasses(["require"]);
									cell.bind("text").toLanguage("UI-DB-END_DT");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 11},
								"configurator": function(cell){
									cell.bind("text").toLanguage("UI-DB-EXP_DT");
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 12},
								"configurator": function(cell){
									cell.text = "기본권한여부";
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
									cell.columnName = "OPRT_ROLE_ID";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 2},
								"configurator": function(cell){
									cell.columnName = "OPRT_ROLE_NM";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 3},
								"configurator": function(cell){
									cell.columnName = "OPRT_ROLE_DESC";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 4},
								"configurator": function(cell){
									cell.columnName = "DEPT_CD";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 5},
								"configurator": function(cell){
									cell.columnName = "OBJ_DIV_RCD";
									cell.control = (function(){
										var comboBox_3 = new cpr.controls.ComboBox("gdCbbObjDivRcd");
										comboBox_3.enabled = false;
										(function(comboBox_3){
											comboBox_3.setItemSet(app.lookup("dsObjDivRcdList"), {
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
								"constraint": {"rowIndex": 0, "colIndex": 6},
								"configurator": function(cell){
									cell.columnName = "USE_YN";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 7},
								"configurator": function(cell){
									cell.columnName = "MNG_DEPT_CD";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 8},
								"configurator": function(cell){
									cell.columnName = "MNG_OBJ_DIV_RCD";
									cell.control = (function(){
										var comboBox_4 = new cpr.controls.ComboBox("gdCbbMngDivRcd");
										comboBox_4.enabled = false;
										(function(comboBox_4){
											comboBox_4.setItemSet(app.lookup("dsMngObjDivRcdList"), {
												"label": "CD_NM",
												"value": "CD"
											});
										})(comboBox_4);
										comboBox_4.bind("value").toDataColumn("MNG_OBJ_DIV_RCD");
										return comboBox_4;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 9},
								"configurator": function(cell){
									cell.columnName = "ST_DT";
									cell.control = (function(){
										var output_5 = new cpr.controls.Output("gdOptStDt");
										output_5.dataType = "date";
										output_5.format = "yy-mm-dd";
										output_5.bind("value").toDataColumn("ST_DT");
										return output_5;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 10},
								"configurator": function(cell){
									cell.columnName = "END_DT";
									cell.control = (function(){
										var output_6 = new cpr.controls.Output("gdOptEndDt");
										output_6.dataType = "date";
										output_6.format = "yy-mm-dd";
										output_6.bind("value").toDataColumn("END_DT");
										return output_6;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 11},
								"configurator": function(cell){
									cell.columnName = "EXP_DT";
									cell.control = (function(){
										var output_7 = new cpr.controls.Output("gdOptExpDt");
										output_7.dataType = "date";
										output_7.format = "yy-mm-dd";
										output_7.bind("value").toDataColumn("EXP_DT");
										return output_7;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 12},
								"configurator": function(cell){
									cell.columnName = "BASE_AUTH_YN";
								}
							}
						]
					}
				});
				if(typeof onGrdCmnRoleSelectionChange == "function") {
					grid_2.addEventListener("selection-change", onGrdCmnRoleSelectionChange);
				}
				container.addChild(grid_2, {
					"top": "30px",
					"left": "5px",
					"width": "480px",
					"height": "255px"
				});
			})(group_2);
			container.addChild(group_2, {
				"top": "72px",
				"left": "5px",
				"width": "1225px",
				"height": "600px"
			});
			if(typeof onBodyLoad == "function"){
				app.addEventListener("load", onBodyLoad);
			}
			// Linking
			linker.userDefinedControl_2.ctrl = linker.grid_1;
			linker.userDefinedControl_4.ctrl = linker.grid_2;
		}
	});
	app.title = "신분별 기본권한 설정";
	cpr.core.Platform.INSTANCE.register(app);
})();
