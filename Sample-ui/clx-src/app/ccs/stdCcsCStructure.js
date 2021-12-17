//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
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
};
