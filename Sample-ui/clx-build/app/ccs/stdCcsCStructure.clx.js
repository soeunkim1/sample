/*
 * App URI: app/ccs/stdCcsCStructure
 * Source Location: app/ccs/stdCcsCStructure.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("app/ccs/stdCcsCStructure", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			﻿//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
			/// <xtmlink path="./stdCcsCStructure.xtm"/>
			
			/**
			 * 학사구조관리
			 * @class stdCcsCCurClsFrf
			 * @author 박갑수 at 2016. 2. 15
			 */
			var stdCcsCStructure = function() {
				var moPage = new Page();
				
				// 임포트용 데이터 통신 오브젝트
				var moPObject = new Page();
				
				// 학년도 학기를 원래데이터로 되돌리기위한 변수
				var msSchYearRcd = "";
				var msSmtRcd = "";
				
				var moTreeNodeForContextMenu = null;
				
				var maDelUKey = [];
				var maDelCKey = [];
				
				// Academic Structure의 서브페이지용 파라미터
				moPObject.moAcademicStructure = {
					mode 		: "",
					treeNode 	: null,
					name 		: "",
					objType 	: "",
					objCd 		: "",
					year 			: "",
					smt 			: "",
					keyDate 	: ""
				};
			
				/**
				 * @desc onLoad 실행
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 2. 15
				 */
				moPage.onModelConstructDone_StdCcsCStructure = function() {
					// 검색조건 초기 설정
			//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
			//		ExtGroup.initSearchBox("grpSearch", ["grpData"]);
							
					// 서브미션 호출
					//strCommand: onLoad 
					util.Submit.send(app, "subOnLoad", function(pbSuccess){
						if(pbSuccess){
							
							util.Control.redraw(app, ["cbbSchYearRcd", "cbbSmtRcd", "dipKeyDate"]);
							
							// 조회 실행
							util.Header.clickSearch(app);
									
							// 학년도 학기값 되돌리기위한 값
							msSchYearRcd = util.DataMap.getValue(app, "dmKeyDateMap", "YEAR");
							msSmtRcd = util.DataMap.getValue(app, "dmKeyDateMap", "SMT");
						}
					}, true);
				};
				
				/**
				 * @desc [cbbSchYearRcd]학년도 onValueChanged 이벤트
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 2. 15
				 */
				moPage.onValueChanged_CbbSchYearRcd = function() {
					// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
					doChangeYearSmt("year");
				};
				
				/**
				 * @desc [cbbSmtRcd]학기 onValueChanged 이벤트
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 2. 15
				 */
				moPage.onValueChanged_CbbSmtRcd = function() {
					// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
					doChangeYearSmt("smt");
				};
				
				/**
				 * @desc 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 2. 15
				 */
				function doChangeYearSmt(psDiv) {
					//strCommand: date 
					util.Submit.send(app, "subDate", function(pbSuccess){
						if(pbSuccess){
							
							msSchYearRcd = util.DataMap.getValue(app, "dmKeyDateMap", "YEAR");
							msSmtRcd = util.DataMap.getValue(app, "dmKeyDateMap", "SMT");
							util.Control.redraw(app, "dipKeyDate");
							
						// Exception 발생시
						}else {
							if(psDiv == "year"){
								util.Control.setValue(app, "cbbSchYearRcd", msSchYearRcd);
							}else if(psDiv == "smt"){
								util.Control.setValue(app, "cbbSmtRcd", msSmtRcd);
							}
						}
					});
				};
				
				/**
				 * @desc [btnUnfoldTrvDept]트리뷰 펼치기 onClick 이벤트
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 2. 15
				 */
				moPage.onClick_BtnUnfoldTrvDept = function() {
					// 트리뷰 펼치기
					doUnfoldTrvDept();
				};
				
				/**
				 * @desc 트리뷰 펼치기
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 2. 15
				 */
				function doUnfoldTrvDept() {
									
					util.Control.setVisible(app, true, ["trvDept", "btnLeftSlide", "btnFoldTrvDept"]);
					util.Control.setVisible(app, false, ["btnUnfoldTrvDept"]);
							
					var voHtmlObj = model.window().document.getElementById("htmlObjMst");
					voHtmlObj.style.left = "316px";
					voHtmlObj.style.width = "917px";
				};
				
				/**
				 * @desc [btnLeftSlide]트리뷰 접기 onClick 이벤트
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 2. 15
				 */
				moPage.onClick_BtnLeftSlide = function() {
					// 트리뷰 접기
					doFoldTrvDept();
				};
				
				/**
				 * @desc [btnFoldTrvDept]트리뷰 접기 onClick 이벤트
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 2. 15
				 */
				moPage.onClick_BtnFoldTrvDept = function() {
					// 트리뷰 접기
					doFoldTrvDept();
				};
				
				/**
				 * @desc 트리뷰 접기
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 2. 15
				 */
				function doFoldTrvDept() {
									
					util.Control.setVisible(app, false, ["trvDept", "btnLeftSlide", "btnFoldTrvDept"]);
					util.Control.setVisible(app, true, ["btnUnfoldTrvDept"]);
					
					var voHtmlObj = model.window().document.getElementById("htmlObjMst");
					voHtmlObj.style.left = "15px";
					voHtmlObj.style.width = "1218px";
				};
				
				/**
				 * @desc [btnSearch]조회 onClick 이벤트
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 2. 15
				 */
				moPage.onClick_BtnSearch = function() {
					 // 작업영역 리피트 변경 내역 체크
					if(util.Grid.isModified(app, "", "CRM")){
						return false;
					}
							
					// 조회조건 필수 체크
					if(!util.validate(app, ["cbbSchYearRcd", "cbbSmtRcd", "dipKeyDate"])){
						return false;
					}
					
					var vsSbpRef = util.Control.getProperty(app, "htmlObjMst", "ref");
					if( !ValueUtil.isNull(vsSbpRef)) ExtSubPage.setPage("htmlObjMst", "xtm/cmn/blank.html", true);
					// 트리뷰 초기화
					model.deleteChildNodes("/root/resList/trvTmpDept");
					model.deleteChildNodes("/root/resList/trvDept");
					ExtTreeView.rebuild(["trvDept"]);
					
					
					util.DataMap.setValue(app, "dmReqKey", "strSchKind", "SCH");
				
					// 조회
					doRefreshTreeNode("SCH", function(pbSuccess) {
						if (pbSuccess){
							
							ExtSubPage.setPage("htmlObjMst", "", true);
							page.doUnfoldTrvDept();
							
							
							// 조회 : "조회되었습니다." header 메세지 표시
							util.Msg.notify(app, "NLS.INF.M024");
							ExtTreeView.rebuild(["trvDept"]);			
							
							var vsSchCkey = util.DataMap.getValue(app, "dmResList", "strSchCkey");
							
							
							ExtTreeView.findItemValue("trvDept",  vsSchCkey, "VALUE");
							var vsCkey = ExtInstance.getValue("/root/resList/trvDept/row", "CKEY" , "child::UKEY='"+vsSchCkey+"'");
							
							var voItem = ExtTreeView.getFindItem("trvDept", vsCkey);
							ExtTreeView.setParentExpandItem("trvDept", voItem);
							
							ExtTreeView.findItemValue("trvDept",  vsSchCkey, "VALUE");
						}
						
						util.DataMap.setValue(app, "dmReqKey", "strSchKind", "");
						
					});
				};
				
				/**
				 * @desc 트리노드 새로고침
				 * @param poCallBackFunc 콜백정의
				 * @return void
				 * @author 박갑수 at 2016. 2. 15
				 */
				function doRefreshTreeNode(poNode, poCallBackFunc) {
					
					return doLoadTreeNode(poNode, "refresh", poCallBackFunc);
				};
				
				/**
				 * @desc 특정 노드의 동적 하위 노드 구성
				 * @param poNode 동적으로 하위 노드가 구성될 트리노드
				 * @param psEventType 동적트리 노드 구성을 유발시킨 이벤트 구분코드(노드 클릭과 노드 펼침에 따라 트리컨트롤 렌더링을 구분하기 위한 문자열 값. "toggle" 이 외에는 생략가능)
				 * @param poCallBackFunc 콜백정의
				 * @return void
				 * @author 박갑수 at 2016. 2. 15
				 */
				function doLoadTreeNode(poNode, psEventType, poCallBackFunc) {
					var vcTrvDept = ExtControl.getControl("trvDept");
			
					var vsObjType = "";
					var vsObjCd = "";
					
					
					
					// 트리뷰 선택된 아이템의 키값
					var vsCkey 	= util.Tree.getSelectedValue(app, "trvDept");
					vsObjType 	= ExtInstance.getValue("/root/resList/trvDept/row", "OBJTYPE" , "child::CKEY='"+ vsCkey +"'");
					vsObjCd 		= ExtInstance.getValue("/root/resList/trvDept/row", "OBJCD" , "child::CKEY='"+ vsCkey +"'");
					
					
					
					
					var vsLcnt = ExtInstance.getValue("/root/resList/trvDept/row", "LCNT" , "child::CKEY='"+ vsCkey +"'");
					var vnLcnt = 0;
					if(!ValueUtil.isNull(vsLcnt)){
						vnLcnt = Number(vsLcnt);
					}
					
					// ROOT가 아니고 (자식노드를 가지고있거나 자식카운트(LCNT)가 0이라면 ) return 시킴
					//if(vsObjType != "ROOT" && (ExtTreeView.isExistChildItem("trvDept") || 0 == vnLcnt)) return false;
					//RESCH
					
					if("SCH" != poNode && "CC009CU" != vsObjType && "RESCH" != poNode){
						return false;
					}
					
					util.DataMap.setValue(app, "dmReqKey", "strKeyDate", util.Control.getValue(app, "dipKeyDate"));
					util.DataMap.setValue(app, "dmReqKey", "strEventType", psEventType);
					if("RESCH" != poNode){
						util.DataMap.setValue(app, "dmReqKey", "strObjCd", vsObjCd);
						util.DataMap.setValue(app, "dmReqKey", "strObjType", vsObjType);			
					}
					
					//strCommand: list 
					util.Submit.send(app, "subList", function(pbSuccess){
						if(pbSuccess){
							
							var obj = model.getNodeListObj( "/root/resList/trvTmpDept/row" );
							model.copyNodeListObj( "/root/resList/trvDept", obj );				
							model.deleteChildNodes("/root/resList/trvTmpDept");
			
							// 조회 후 콜백함수 수행
							if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
						}
					});
				};
				
				function doLoadTreeNode2(poNode, psEventType, poCallBackFunc) {
					var vcTrvDept = ExtControl.getControl("trvDept");
			
					var vsObjType = "";
					var vsObjCd = "";
					
					// 트리뷰 선택된 아이템의 키값
					var vsCkey 	= util.Tree.getSelectedValue(app, "trvDept");
					vsObjType 	= ExtInstance.getValue("/root/resList/trvDept/row", "OBJTYPE" , "child::CKEY='"+ vsCkey +"'");
					vsObjCd 		= ExtInstance.getValue("/root/resList/trvDept/row", "OBJCD" , "child::CKEY='"+ vsCkey +"'");
					
					var vsLcnt = ExtInstance.getValue("/root/resList/trvDept/row", "LCNT" , "child::CKEY='"+ vsCkey +"'");
					var vnLcnt = 0;
					if(!ValueUtil.isNull(vsLcnt)){
						vnLcnt = Number(vsLcnt);
					}
					
					// ROOT가 아니고 (자식노드를 가지고있거나 자식카운트(LCNT)가 0이라면 ) return 시킴
					//if(vsObjType != "ROOT" && (ExtTreeView.isExistChildItem("trvDept") || 0 == vnLcnt)) return false;
					//RESCH
					
					if("SCH" != poNode && "CC009CU" != vsObjType && "RESCH" != poNode){
						return false;
					}
					
					util.DataMap.setValue(app, "dmReqKey", "strKeyDate", util.Control.getValue(app, "dipKeyDate"));
					util.DataMap.setValue(app, "dmReqKey", "strEventType", psEventType);
					if("RESCH" != poNode){			
						util.DataMap.setValue(app, "dmReqKey", "strObjCd", vsObjCd);
						util.DataMap.setValue(app, "dmReqKey", "strObjType", vsObjType);			
					}
							
					//strCommand: list 
					util.Submit.send(app, "subList2", function(pbSuccess){
						if(pbSuccess){
							
							maDelUKey[0] = vsCkey;
							// 자식노드 삭제
							doDelChildNode();
									
							ExtTreeView.doRebuildSelectedItem("trvDept");
							
							var obj = model.getNodeListObj( "/root/resList/trvTmpDept/row" );
							
							model.copyNodeListObj( "/root/resList/trvDept", obj );				
							model.deleteChildNodes("/root/resList/trvTmpDept");
			
							// 조회 후 콜백함수 수행
							if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
						}
					});
				};
				
				/**
				 * @desc 학위학사구조목록 Delete
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 8. 1
				 */
				function doDelChildNode() {
							
					var vcTree = ExtControl.getControl("trvDept");
					var vsNodeSet = vcTree.getAttr("nodeset");
					
					var vnDelIdx = 0;
					
					for(var i=0; i<maDelUKey.length; i++){
						
						var vsCKey = maDelUKey[i];
									
						var voNodeList = model.getNodeListObj(vsNodeSet + "[child::UKEY='" + vsCKey + "']");
						
						if(null != voNodeList){
							for(var j=0; j<voNodeList.length; j++){
								var voChildObj =  ExtInstance.getNodeToObject(voNodeList[j]);
								
								var voItem = ExtTreeView.getFindItem("trvDept", voChildObj.CKEY);
								if(ExtTreeView.isExistChildItem("trvDept", voItem)){
									maDelCKey[vnDelIdx] = voChildObj.CKEY;
									vnDelIdx ++ ;
								}
								
								model.deleteNode(vsNodeSet + "[child::CKEY='" + voChildObj.CKEY + "']");
							}
						}
					}
					
					maDelUKey = [];
					for(var k=0; k<maDelCKey.length; k++){
						maDelUKey[k] = maDelCKey[k];
					}
					maDelCKey = [];
					
					if(maDelUKey.length > 0){
						return doDelChildNode();
					}
				};
				
				
				
				/**
				 * @desc [trvDept]학사구조목록 onSelectionChanged 이벤트
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 3. 9
				 */
				moPage.onSelectionChanged_TrvDept = function(vpKind) {
			
					var vsCkey = util.Tree.getSelectedValue(app, "trvDept");
					
					var voNode = ExtInstance.getNodeToObject("/root/resList/trvDept/row[child::CKEY = '"+ vsCkey +"']");		
					var vnUpNodecnt = ExtInstance.getNodeListLength("/root/resList/trvDept/row[child::UKEY = '"+ vsCkey +"']");
					
					//--자식 노드가 있을 경우 재조회를 하지 않는다.
					//--kind : pass  교과그룹의 서브페이지에서 작업저장 시 교과그룹을 다시 가져오기 위함.
			//		if(vpKind != 'pass'){
			//			if(vnUpNodecnt > 0){
			//				return false;
			//			}
			//		}
					
					
					doLoadTreeNode2(voNode, "", function(pbSuccess) {
						if (pbSuccess){
							
							var voItem = ExtTreeView.getFindItem("trvDept", vsCkey);
			
							ExtTreeView.doRebuildSelectedItem("trvDept");
							
							// 리빌드 후 선택했던 ITEM 찾아줌
							ExtTreeView.setParentExpandItem("trvDept", voItem);
							// 선택한 ITEM 포커싱
							ExtTreeView.findItemValue("trvDept", vsCkey, "VALUE");
						}
					});
				};
			
				/**
				 * @desc [trvDept]학사구조목록 onrbuttondown 이벤트
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 3. 9
				 */
				moPage.onrbuttondown_TrvDept = function() {
					// 컨텍스트메뉴 열기
					doOpenContextMenu();
				};
				
				/**
				 * @desc 컨텍스트메뉴 열기
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 3. 9
				 */
				function doOpenContextMenu() {
					var vsCkey = util.Tree.getSelectedValue(app, "trvDept");
					
					if( ValueUtil.isNull(vsCkey) ) {
						// "라인을 선택하세요."	메시지
						util.Msg.alert("NLS-INF-M023");
						return false;
					}
					
					//기존 메뉴추가내역 삭제
					model.menuRemoveAll();
					
					var vsMode = "";
					
					var vsObjDivRcd = ExtInstance.getValue("/root/resList/trvDept/row", "OBJTYPE", "child:: CKEY='" + vsCkey + "'");
					
					switch (vsObjDivRcd){
						case null : {
							return;
						}
						// 행정부서
						case "CC009OG" : {
							//메뉴추가
							model.addMenuCtrl(1, NLS.NSCR.EDITOG, 	"doOnClickContextMenu(" + vsCkey + ", " + "editOG" + ")", 0, "javascript");			// 행정부서 편집
							model.addMenuCtrl(2, NLS.NSCR.DOWNOG, 	"doOnClickContextMenu(" + vsCkey + ", " + "OG_OG" + ")", 0, "javascript");	// 하위 행정부서 관리
							model.addMenuCtrl(3, NLS.NSCR.DOWNSA, 	"doOnClickContextMenu(" + vsCkey + ", " + "OG_SA" + ")", 0, "javascript");	// 하위 학사부서 관리
							//model.addMenuCtrl(4, NLS.NSCR.REFRESH, 	"doGetNodeForRefresh("+ vsCkey +")", 0, "javascript");									// 새로고침
							
							var vsMouPos = model.getMousePos();
							var vaMouPos = vsMouPos.split(",");
							model.popMenu(vaMouPos[0] , vaMouPos[1] );
							
							break;
						}
						// 학사부서
						case "CC009SA" : {				
							//메뉴추가
							model.addMenuCtrl(1, NLS.NSCR.EDITSA, 	"doOnClickContextMenu(" + vsCkey + ", " + "editSA" + ")", 0, "javascript");		// 학사부서 편집
							model.addMenuCtrl(2, NLS.NSCR.DOWNSA, 	"doOnClickContextMenu(" + vsCkey + ", " + "SA_SA" + ")", 0, "javascript");	// 하위 학사부서 관리
							model.addMenuCtrl(3, NLS.NSCR.DOWNSP, 	"doOnClickContextMenu(" + vsCkey + ", " + "SA_SP" + ")", 0, "javascript");	// 하위 이수과정 관리
							model.addMenuCtrl(4, NLS.NSCR.DOWNSB, 	"doOnClickContextMenu(" + vsCkey + ", " + "SA_SB" + ")", 0, "javascript");	// 주관학과인 교과목 관리
							model.addMenuCtrl(5, NLS.NSCR.DOWNCLS, "doOnClickContextMenu(" + vsCkey + ", " + "SA_CLS" + ")", 0, "javascript");	// 교과과정 관리
							//model.addMenuCtrl(7, NLS.NSCR.REFRESH, 	"doGetNodeForRefresh("+ vsCkey +")", 0, "javascript");								// 새로고침
						
							var vsMouPos = model.getMousePos();
							var vaMouPos = vsMouPos.split(",");
							model.popMenu(vaMouPos[0] , vaMouPos[1] );
				
							break;
						}
						// 이수과정
						case "CC009SP" : {
							//메뉴추가
							model.addMenuCtrl(1, NLS.NSCR.EDITSP, 	"doOnClickContextMenu(" + vsCkey + ", " + "editSP" + ")", 0, "javascript");		// 이수과정 편집
							model.addMenuCtrl(2, NLS.NSCR.DOWNCLS, "doOnClickContextMenu(" + vsCkey + ", " + "SP_CLS" + ")", 0, "javascript");	// 교과과정 관리
							//model.addMenuCtrl(4, NLS.NSCR.REFRESH, 	"doGetNodeForRefresh("+ vsCkey +")", 0, "javascript");								// 새로고침
							
							var vsMouPos = model.getMousePos();
							var vaMouPos = vsMouPos.split(",");
							model.popMenu(vaMouPos[0] , vaMouPos[1] );
				
							break;
						}
						// 교과그룹
						case "CC009CU" : {
							//메뉴추가
							model.addMenuCtrl(1, NLS.NSCR.EDITCU, 	"doOnClickContextMenu(" + vsCkey + ", " + "editCU" + ")", 0, "javascript");		// 교과그룹 편집
							model.addMenuCtrl(2, NLS.NSCR.DOWNCLS, "doOnClickContextMenu(" + vsCkey + ", " + "CU_CLS" + ")", 0, "javascript");	// 교과과정 관리
							model.addMenuCtrl(3, NLS.NSCR.REFRESH, 	"doGetNodeForRefresh("+ vsCkey +")", 0, "javascript");								// 새로고침
							
							var vsMouPos = model.getMousePos();
							var vaMouPos = vsMouPos.split(",");
							model.popMenu(vaMouPos[0] , vaMouPos[1] );
				
							break;
						}
						// 교과목
						case "CC009SB" : {
							//메뉴추가
							model.addMenuCtrl(1, NLS.NSCR.EDITSB, 	"doOnClickContextMenu(" + vsCkey + ", " + "editSB" + ")", 0, "javascript");		// 교과목 편집
							//model.addMenuCtrl(2, NLS.NSCR.REFRESH, 	"doGetNodeForRefresh("+ vsCkey +")", 0, "javascript");								// 새로고침
							
							var vsMouPos = model.getMousePos();
							var vaMouPos = vsMouPos.split(",");
							model.popMenu(vaMouPos[0] , vaMouPos[1] );
				
							break;
						}
						default : {
							// "준비중입니다."
							util.Msg.alert("NLS-CMM-M017");
							return;
						}
					}
				};
				
				 /**
				 * @desc 컨텍스트메뉴 새로고침 
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 3. 9
				 */
				function doGetNodeForRefresh(psCkey){
					
					page.onSelectionChanged_TrvDept('pass');
					
				};
			
				 /**
				 * @desc 컨텍스트메뉴 선택시 서브페이지 오픈
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 3. 9
				 */
				function doOnClickContextMenu (psCkey, psMode){
					
					// 서브페이지 로드 여부
					var vbIsLoadSubPage = false;
					// 서브페이지
					var vsSubPageSrc = "";
					
					// 페이지 구성
					switch (psMode){
						case null : {
							return;
						}
						// 행정부서
						case "editOG" :
						case "OG_OG" : {
							vbIsLoadSubPage = true;
							vsSubPageSrc = "xtm/cmn/stdCmnCOgtMgt.xtm";
							break;
						}
						// 학사부서
						case "editSA" :
						case "SA_SA" :
						case "OG_SA" : {
							// 학사부서
							vbIsLoadSubPage = true;
							vsSubPageSrc = "xtm/cmn/stdCmnCSatMgt.xtm";
							break;
						}
						// 이수과정
						case "editSP" :
						case "SA_SP" : {
							vbIsLoadSubPage = true;
							vsSubPageSrc = "xtm/cmn/stdCmnCSptMgt.xtm";
							break;
						}
						// 교과그룹
						case "editCU" :
						case "SA_CU" :
						case "SP_CU" :
						case "CU_CU" : {
							vbIsLoadSubPage = true;
							vsSubPageSrc = "xtm/ccs/stdCcsCCurGroupFrf.xtm";
							break;
						}
						// 교과과정
						case "SA_CLS" :
						case "SP_CLS" :
						case "CU_CLS" : {
							// 교과과정.
							vbIsLoadSubPage = true;
							vsSubPageSrc = "xtm/ccs/stdCcsCCurClsFrf.xtm";
							break;
						}
						
						// 교과목
						case "editSB" :
						case "SA_SB" : {
							vbIsLoadSubPage = true;
							vsSubPageSrc = "xtm/ccs/stdCcsCSubjectFrf.xtm";
							break;
						}
						
						default : {
							// "준비중입니다."
							util.Msg.alert("NLS-CMM-M017");
							return;
						}
					}
					
					if (vbIsLoadSubPage) {
									
						var vsName 		= ExtInstance.getValue("/root/resList/trvDept/row", "NAME", "child:: CKEY='" + psCkey + "'");
						var vsObjCd 		= ExtInstance.getValue("/root/resList/trvDept/row", "OBJCD", "child:: CKEY='" + psCkey + "'");
						var vsObjType 	= ExtInstance.getValue("/root/resList/trvDept/row", "OBJTYPE", "child:: CKEY='" + psCkey + "'");
									
						moPObject.moAcademicStructure.mode 		= psMode;
						moPObject.moAcademicStructure.treeNode 	= psCkey;
						moPObject.moAcademicStructure.name		= vsName;
						moPObject.moAcademicStructure.objType 	= vsObjType;
						moPObject.moAcademicStructure.objCd 		= vsObjCd;
						moPObject.moAcademicStructure.year 		= util.Control.getValue(app, "cbbSchYearRcd");
						moPObject.moAcademicStructure.smt 			= util.Control.getValue(app, "cbbSmtRcd");
						moPObject.moAcademicStructure.keyDate 	= util.Control.getValue(app, "dipKeyDate");
						
						// 트리뷰 접기
						doFoldTrvDept();
									
						ExtSubPage.setPage("htmlObjMst", vsSubPageSrc, true);
					}
				};
					
				/**
				 * @desc 컨텍스트메뉴 선택시 서브페이지 오픈
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 3. 9
				 */
				function doCropPageToControl(poPage, pnTop, pnLeft, pnHeight, pnWidth) {
					var vsSub = ExtControl.getControl("htmlObjMst");
					var voSubCanvas = ExtSubPage.getSubPage("htmlObjMst").model.getView().getCanvas();
			
					voSubCanvas.style.top = "-" + pnTop + "px";
					voSubCanvas.style.left = "-" + pnLeft + "px";
			
					voSubCanvas.parentNode.style.height = pnHeight  + "px";
					voSubCanvas.parentNode.style.width = pnWidth  + "px";
					voSubCanvas.parentNode.style.overflow = "hidden";
				};
				
				/**
				 * @desc 컨텍스트메뉴 선택시 서브페이지 오픈
				 * @param 
				 * @return void
				 * @author 박갑수 at 2016. 3. 9
				 */
				moPage.callbackAcademicStructureSubPageSave = function() {
					
					// 서브페이지 저장시 해당 트리노드 새로고침
					//var vsCkey = ExtTreeView.getSelectedValue("trvDept");
			//		var vsCkey = moPObject.moAcademicStructure.objCd+""+moPObject.moAcademicStructure.objType;
					var vsCkey = moPObject.moAcademicStructure.treeNode;
					
					var vsUpObjCd 		= "";
					var vsUpObjDivRcd = "";
					
					var vsUkey = ExtInstance.getValue("/root/resList/trvDept/row", "UKEY" , "child::CKEY='"+ vsCkey +"'");
					
							
					var voNode = ExtInstance.getNodeToObject("/root/resList/trvDept/row[child::CKEY = '"+ vsUkey +"']");
					
					vsUpObjDivRcd 		= vsUkey.substring(vsUkey.length-7 , vsUkey.length);
					vsUpObjCd			= vsUkey.substring(0, vsUkey.length-7 );
					
					util.DataMap.setValue(app, "dmReqKey", "strUpObjCd"			, vsUpObjCd);
					util.DataMap.setValue(app, "dmReqKey", "strUpObjectType"	, vsUpObjDivRcd);
					util.DataMap.setValue(app, "dmReqKey", "strObjCd"				, vsUpObjCd);
					util.DataMap.setValue(app, "dmReqKey", "strObjType"			, vsUpObjDivRcd);
					
					doRefreshTreeNode('RESCH', function(pbSuccess) {
						if (pbSuccess){
							var voItem = ExtTreeView.getFindItem("trvDept", vsCkey);
							
							ExtTreeView.rebuild("trvDept");
							
							// 리빌드 후 선택했던 ITEM 찾아줌
							ExtTreeView.setParentExpandItem("trvDept", voItem);
							
							
							// 선택한 ITEM 포커싱
							ExtTreeView.findItemValue("trvDept", vsCkey, "VALUE");
							
							if('CC009CU' == moPObject.moAcademicStructure.objType){
								page.onSelectionChanged_TrvDept('pass');
							}
							/****************************************************/
							
							
							
							
							
						}
					});
				};
				
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
			
			var dataSet_2 = new cpr.data.DataSet("dsSmtRcdList");
			dataSet_2.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_2);
			
			var dataSet_3 = new cpr.data.DataSet("dsLanDivRcdList");
			dataSet_3.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CD_NM"}
				],
				"rows": []
			});
			app.register(dataSet_3);
			
			var dataSet_4 = new cpr.data.DataSet("dsTrvTmpDept");
			dataSet_4.parseData({
				"columns": [
					{"name": "UKEY"},
					{"name": "OBJCD"},
					{"name": "NAME"},
					{"name": "LCNT"},
					{"name": "CKEY"},
					{"name": "OBJTYPE"},
					{"name": "IMG_PATH"}
				],
				"rows": []
			});
			app.register(dataSet_4);
			
			var dataSet_5 = new cpr.data.DataSet("dsTrvDept");
			dataSet_5.parseData({
				"columns": [
					{"name": "UKEY"},
					{"name": "OBJCD"},
					{"name": "NAME"},
					{"name": "LCNT"},
					{"name": "CKEY"},
					{"name": "OBJTYPE"},
					{"name": "IMG_PATH"}
				],
				"rows": []
			});
			app.register(dataSet_5);
			var dataMap_1 = new cpr.data.DataMap("dmResList");
			dataMap_1.parseData({
				"columns" : [
					{
						"name": "strNodeName",
						"dataType": "string"
					},
					{
						"name": "strSchCkey",
						"dataType": "string"
					}
				]
			});
			app.register(dataMap_1);
			
			var dataMap_2 = new cpr.data.DataMap("dmReqKey");
			dataMap_2.parseData({
				"columns" : [
					{
						"name": "strKeyDate",
						"dataType": "string"
					},
					{
						"name": "strObjCd",
						"dataType": "string"
					},
					{
						"name": "strObjType",
						"dataType": "string"
					},
					{
						"name": "strEventType",
						"dataType": "string"
					},
					{
						"name": "strSchObjType",
						"dataType": "string"
					},
					{
						"name": "strUpObjCd",
						"dataType": "string"
					},
					{
						"name": "strUpObjectType",
						"dataType": "string"
					},
					{
						"name": "strSchKind",
						"dataType": "string"
					}
				]
			});
			app.register(dataMap_2);
			
			var dataMap_3 = new cpr.data.DataMap("dmKeyDateMap");
			dataMap_3.parseData({
				"columns" : [
					{
						"name": "BEF_DT",
						"dataType": "string"
					},
					{
						"name": "YEAR",
						"dataType": "string"
					},
					{
						"name": "SMT",
						"dataType": "string"
					},
					{
						"name": "ST_DT",
						"dataType": "string"
					},
					{
						"name": "END_DT",
						"dataType": "string"
					}
				]
			});
			app.register(dataMap_3);
			var submission_1 = new cpr.protocols.Submission("subOnLoad");
			submission_1.action = "/ccs/StdCcsStructure/";
			submission_1.mediaType = "application/x-www-form-urlencoded";
			submission_1.addResponseData(dataSet_1, false);
			submission_1.addResponseData(dataSet_2, false);
			submission_1.addResponseData(dataSet_3, false);
			submission_1.addResponseData(dataMap_3, false);
			app.register(submission_1);
			
			var submission_2 = new cpr.protocols.Submission("subDate");
			submission_2.action = "/cmn/StdCmnDateTime/";
			submission_2.mediaType = "application/x-www-form-urlencoded";
			submission_2.addRequestData(dataMap_3);
			submission_2.addResponseData(dataMap_3, false);
			app.register(submission_2);
			
			var submission_3 = new cpr.protocols.Submission("subList");
			submission_3.action = "/ccs/StdCcsStructure/";
			submission_3.mediaType = "application/x-www-form-urlencoded";
			submission_3.addRequestData(dataMap_2);
			submission_3.addRequestData(dataMap_3);
			submission_3.addResponseData(dataSet_5, false);
			submission_3.addResponseData(dataMap_1, false);
			submission_3.addResponseData(dataSet_4, false);
			app.register(submission_3);
			
			var submission_4 = new cpr.protocols.Submission("subList2");
			submission_4.action = "/ccs/StdCcsStructure/";
			submission_4.mediaType = "application/x-www-form-urlencoded";
			submission_4.addRequestData(dataMap_2);
			submission_4.addRequestData(dataMap_3);
			submission_4.addResponseData(dataMap_1, false);
			submission_4.addResponseData(dataSet_4, false);
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
			var group_1 = new cpr.controls.Container("grpData");
			// Layout
			var xYLayout_2 = new cpr.controls.layouts.XYLayout();
			group_1.setLayout(xYLayout_2);
			(function(container){
				var button_1 = new cpr.controls.Button("btnFoldTrvDept");
				button_1.value = "";
				if(typeof onBtnFoldTrvDeptClick == "function") {
					button_1.addEventListener("click", onBtnFoldTrvDeptClick);
				}
				container.addChild(button_1, {
					"top": "5px",
					"left": "305px",
					"width": "8px",
					"height": "500px"
				});
				var button_2 = new cpr.controls.Button("btnLeftSlide");
				button_2.value = "";
				if(typeof onBtnLeftSlideClick == "function") {
					button_2.addEventListener("click", onBtnLeftSlideClick);
				}
				container.addChild(button_2, {
					"top": "5px",
					"left": "300px",
					"width": "12px",
					"height": "35px"
				});
				var button_3 = new cpr.controls.Button("btnUnfoldTrvDept");
				button_3.visible = false;
				button_3.value = "";
				if(typeof onBtnUnfoldTrvDeptClick == "function") {
					button_3.addEventListener("click", onBtnUnfoldTrvDeptClick);
				}
				container.addChild(button_3, {
					"top": "5px",
					"left": "0px",
					"width": "10px",
					"height": "300px"
				});
				var hTMLObject_1 = new cpr.controls.HTMLObject("htmlObjMst");
				container.addChild(hTMLObject_1, {
					"top": "1px",
					"left": "318px",
					"width": "910px",
					"height": "600px"
				});
			})(group_1);
			container.addChild(group_1, {
				"top": "72px",
				"left": "5px",
				"width": "1230px",
				"height": "603px"
			});
			
			var userDefinedControl_1 = new udc.com.appHeader("appheader1");
			container.addChild(userDefinedControl_1, {
				"top": "5px",
				"right": "5px",
				"left": "5px",
				"height": "25px"
			});
			
			var group_2 = new cpr.controls.Container("grpSearch");
			group_2.style.setClasses(["search-box"]);
			// Layout
			var xYLayout_3 = new cpr.controls.layouts.XYLayout();
			group_2.setLayout(xYLayout_3);
			(function(container){
				var button_4 = new cpr.controls.Button("btnSearch");
				button_4.value = "";
				button_4.style.setClasses(["btn-search"]);
				button_4.bind("value").toLanguage("UI-GLS-IQY");
				if(typeof onBtnSearchClick == "function") {
					button_4.addEventListener("click", onBtnSearchClick);
				}
				container.addChild(button_4, {
					"top": "5px",
					"left": "1165px",
					"width": "60px",
					"height": "25px"
				});
				var output_1 = new cpr.controls.Output("optKeyDate");
				output_1.value = "";
				output_1.style.setClasses(["require"]);
				output_1.bind("value").toLanguage("UI-SCR-STDDT");
				container.addChild(output_1, {
					"top": "5px",
					"left": "415px",
					"width": "90px",
					"height": "25px"
				});
				var dateInput_1 = new cpr.controls.DateInput("dipKeyDate");
				dateInput_1.userAttr({"require": "Y"});
				dateInput_1.style.css({
					"text-align" : "center"
				});
				dateInput_1.bind("fieldLabel").toExpression("#optKeyDate.value");
				dateInput_1.bind("value").toDataMap(app.lookup("dmKeyDateMap"), "ST_DT");
				container.addChild(dateInput_1, {
					"top": "5px",
					"left": "510px",
					"width": "100px",
					"height": "25px"
				});
				var output_2 = new cpr.controls.Output("optSchYearRcd");
				output_2.value = "";
				output_2.style.setClasses(["require"]);
				output_2.bind("value").toLanguage("UI-GLS-SCH_YEAR");
				container.addChild(output_2, {
					"top": "5px",
					"left": "5px",
					"width": "90px",
					"height": "25px"
				});
				var comboBox_1 = new cpr.controls.ComboBox("cbbSchYearRcd");
				comboBox_1.enabled = false;
				comboBox_1.userAttr({"require": "Y"});
				comboBox_1.bind("fieldLabel").toExpression("#optSchYearRcd.value");
				comboBox_1.bind("value").toDataMap(app.lookup("dmKeyDateMap"), "YEAR");
				(function(comboBox_1){
					comboBox_1.addItem(new cpr.controls.Item("선택", ""));
					comboBox_1.setItemSet(app.lookup("dsSchYearRcdList"), {
						"label": "CD_NM",
						"value": "CD"
					});
				})(comboBox_1);
				if(typeof onCbbSchYearRcdSelectionChange == "function") {
					comboBox_1.addEventListener("selection-change", onCbbSchYearRcdSelectionChange);
				}
				container.addChild(comboBox_1, {
					"top": "5px",
					"left": "100px",
					"width": "100px",
					"height": "25px"
				});
				var output_3 = new cpr.controls.Output("optSmtRcd");
				output_3.value = "";
				output_3.style.setClasses(["require"]);
				output_3.bind("value").toLanguage("UI-GLS-SMT");
				container.addChild(output_3, {
					"top": "5px",
					"left": "210px",
					"width": "90px",
					"height": "25px"
				});
				var comboBox_2 = new cpr.controls.ComboBox("cbbSmtRcd");
				comboBox_2.enabled = false;
				comboBox_2.userAttr({"require": "Y"});
				comboBox_2.bind("fieldLabel").toExpression("#optSmtRcd.value");
				comboBox_2.bind("value").toDataMap(app.lookup("dmKeyDateMap"), "SMT");
				(function(comboBox_2){
					comboBox_2.addItem(new cpr.controls.Item("선택", ""));
					comboBox_2.setItemSet(app.lookup("dsSmtRcdList"), {
						"label": "CD_NM",
						"value": "CD"
					});
				})(comboBox_2);
				if(typeof onCbbSmtRcdSelectionChange == "function") {
					comboBox_2.addEventListener("selection-change", onCbbSmtRcdSelectionChange);
				}
				container.addChild(comboBox_2, {
					"top": "5px",
					"left": "305px",
					"width": "100px",
					"height": "25px"
				});
			})(group_2);
			container.addChild(group_2, {
				"top": "35px",
				"left": "5px",
				"width": "1230px",
				"height": "32px"
			});
			if(typeof onBodyLoad == "function"){
				app.addEventListener("load", onBodyLoad);
			}
		}
	});
	app.title = "학사구조관리";
	cpr.core.Platform.INSTANCE.register(app);
})();