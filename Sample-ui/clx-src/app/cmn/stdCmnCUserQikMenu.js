//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./stdCmnCUserQikMenu.xtm"/>

var stdCmnCUserQikMenu = function() {
	var moPage = new Page();
	
	/**
	 * @desc 헤더 온로드 실행
	 * @param
	 * @return void
	 * @author 강현우 2016.02.11
	 */	
	moPage.onLoadImportDone_ImpTitle = function() {
		doHeaderOnLoad();
	}
	
	/**
	 * @desc 온로드 실행
	 * @param
	 * @return void
	 * @author 강현우 2016.02.11
	 */	
	moPage.onModelConstructDone_StdCmnCUserQikMenu = function() {
		doOnLoad();
	};
	
	/** 온로드
	 * @desc
	 * @param
	 * @return void
	 * @author 강현우 2016.02.11
	 */	
	function doOnLoad() {
		
		//리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["rptCmnUserQikMenu"]);
		//검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", "grpData");
		
		//서브미션 실행
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess) {
			if (pbSuccess) {
				
				//기본 언어키로 초기값 설정
				util.DataMap.setValue(app, "dmRoot", "reqList", "strLanDivRcd", msSystemLocale);
				//조회조건 콤보박스 리빌드
				util.Control.redraw(app, ["cbbUserDivRcd"]);
				//세션정보를 이용해 사용자구분값, ID 세팅
				util.Control.setValue(app, "cbbUserDivRcd", moUserInfo.userDivRcd);
				util.DataMap.setValue(app, "dmRoot", "reqList", "strUserId", moUserInfo.id);
				
			}
		}, true);
	}
	
	/**
	 * @desc 조회 실행
	 * @param
	 * @return void
	 * @author 강현우 2016.02.11
	 */	
	function doList(poCallBackFunc) {
		
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess) {
			if (pbSuccess) {
				
				util.Control.redraw(app, "grdCmnUserQikMenu");
				ExtTreeView.rebuild(["trvCmnMenu"]);
				
				if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
			}
		});
	};
	
	/**
	 * @desc 메뉴목록에서 선택한 메뉴를 바로가기 메뉴 목록에 등록한다.
	 * @param
	 * @return void
	 * @author 강현우 2016.02.11
	 */	
	var maRelatedIds = []; // 선택 메뉴와 관련된 메뉴 ID 담을 배열 
	var maMissIds = [];
	//비교할 컬럼 목록
	var maCompareCols = ["MENU_ID", "MENU_NM", "PGM_ID"];
	var msTopMenuCode = ""; //최상위 메뉴 코드
	var mnInsertRowCnt = 0; //입력건수
	moPage.insertSelectedMenu = function() {
		// 추가할 메뉴ID (선택되어진 항목들을 ,구분자로 가져옴)
		var vsMenuId = ExtTreeView.getSelectedItems("trvCmnMenu", "VALUE");
		var vsUserId = util.DataMap.getValue(app, "dmRoot", "reqList", "strUserId");
		
		if (ValueUtil.isNull(vsMenuId) || ValueUtil.isNull(vsUserId)) {
			//이관할 데이터를 선택하세요. 
			util.Msg.alert("NLS-INF-M006");
			return;
		}
		
		// 추가할 메뉴 배열
		var vaIds = null;
		if (String(vsMenuId).indexOf(",") != - 1) {
			vaIds = vsMenuId.split(",");
		} else {
			vaIds = new Array();
			vaIds [0] = vsMenuId;
		}
		
		maMissIds = [];
		mnInsertRowCnt = 0;
		
		for (var i = 0; i < vaIds.length; i++) {
			//초기화
			msTopMenuCode = ""; //최상위 메뉴코드
			maRelatedIds = [];
			
			var vsId = vaIds [i]; // 메뉴ID
			
			//부모 자식키를 전역변수에 담는다.
			moPage.getParentIds(vsId, true);
			moPage.getChildIds(vsId);
			
			//전역변수에 담은 키값들로 메뉴목록을 찾아 리피트에 입력한다.
			moPage.validAndInsertData(maRelatedIds);
			
		}
		
		//기존에는 중복등으로 인해 미등록된 메뉴가 0건인 경우 "이관되었습니다." 표시로직이었으나
		//상위메뉴이거나 menuheader 인경우도 maMissIds에 추가되므로 
		//리피트에 입력한 경우가 1건 이상인 경우 표시하도록 수정
		//if(maMissIds.length == 0) Common.setMsgStatus(NLS.INF.M007); 
		if (mnInsertRowCnt > 0) util.Msg.notify(app, "NLS.INF.M007");
		
	};
	
	/**
	 * @desc 선택한 메뉴의 부모메뉴 ID를 maRelatedIds 에 등록한다.
	 * @param
	 * @return
	 * @author 강현우 2016.02.11
	 */	
	moPage.getParentIds = function(psMenuId, pbIsFirst) {
		// 선택한 메뉴의 부모메뉴
		var vsParentMenuId = ExtInstance.getValue("/root/resList/trvCmnMenu/row", "UMENU_ID", "child::MENU_ID='" + psMenuId + "'");
		if (pbIsFirst != true) {
			maRelatedIds.push(psMenuId);
		}
		
		//부모 존재시 계속진행, 최상위인경우 전역변수에 값입력
		if (! !vsParentMenuId) {
			moPage.getParentIds(vsParentMenuId);
		} else {
			//부모가 없는 경우는 자신이 최상위코드가 된다.
			msTopMenuCode = psMenuId;
		}
	};
	
	/**
	 * @desc 선택한 메뉴와, 자식메뉴의 ID를 maRelatedIds 에 등록한다.
	 * @param
	 * @return
	 * @author 강현우 2016.02.11
	 */	
	moPage.getChildIds = function(psMenuId) {
		
		//선택한 메뉴의 레벨과 이름 
		var vsMenuLvl = ExtInstance.getValue("/root/resList/trvCmnMenu/row", "MENU_LVL", "child::MENU_ID='" + psMenuId + "'");
		var vsMenuNm = ExtInstance.getValue("/root/resList/trvCmnMenu/row", "MENU_NM", "child::MENU_ID='" + psMenuId + "'");
		
		//상위폴더 (프로그램의 바로 위 폴더를 제외한) 선택시
		if (vsMenuLvl == "0" || vsMenuLvl == "1") {
			
			//중메뉴 이상의 메뉴는 선택할 수 없습니다.\n최하위 메뉴를 선택하여 주세요.
			ComMsg.warn("M220");
			
			maMissIds.push("[" + vsMenuNm + "]");
			return false;
		}
		
		//입력받은 키를 배열에 등록
		maRelatedIds.push(psMenuId);
		
		//입력받은 키를 부모키로 가지는 메뉴 인스턴스를 가져옴
		var voChildList = ExtInstance.getNodeListObj("/root/resList/trvCmnMenu/row[child::UMENU_ID='" + psMenuId + "']");
		
		if (voChildList == null) return;
		
		var vnChildCnt = voChildList.length;
		for (var i = 0; i < vnChildCnt; i++) {
			var voChildRow = ExtInstance.getNodeToObject(voChildList [i]);
			var vsChildMenuId = voChildRow.MENU_ID;
			
			//자식메뉴 스스로가 자식메뉴를 가지고 있을 경우 새로 검색
			//없을 경우 자식ID만 maRelatedIds에 등록
			var vnChildChildCnt = ExtInstance.getNodeListLength("/root/resList/trvCmnMenu/row[child::UMENU_ID='" + vsChildMenuId + "']"); //자식메뉴를 부모로 가지는 메뉴 검색 
			if (vnChildChildCnt == 0 || vnChildChildCnt == null) maRelatedIds.push(vsChildMenuId);
			else moPage.getChildIds(vsChildMenuId);
			
		}
		
	};
	
	/**
	 * @desc 입력받은 키값의 배열을 리피트에 존재하는지, 메뉴헤더 인지 체크 후, 없는 경우 등록한다.
	 * @param
	 * @return
	 * @author 강현우 2016.02.11
	 */	
	moPage.validAndInsertData = function(paIds) {
		if (paIds == null) return;
		
		// 선택한 메뉴의 상위, 하위 메뉴들 
		for (var i = 0; i < paIds.length; i++) {
			var voMenuRow = ExtInstance.getNodeListObj("/root/resList/trvCmnMenu/row[child::MENU_ID='" + paIds [i] + "']");
			
			if (voMenuRow == null) continue;
			
			var voRowObj = ExtInstance.getNodeToObject(voMenuRow [0]);
			var vsMenuNm = voRowObj.MENU_NM;
			var vsPgmId = voRowObj.PGM_ID; //메뉴헤더 체크를 위해 가져옴
			
			if (!moPage.isExistData(voMenuRow) && "MENUHEADER" != vsPgmId) moPage.insertToRepeat(voMenuRow);
			else maMissIds.push("[" + vsMenuNm + "]");
			
		}
		
	};
	
	/**
	 * @desc 메뉴의 인스턴스 로우로 리피트에 이미 존재하는지 체크
	 * @param
	 * @return vbResult
	 * @author 강현우 2016.02.11
	 */	
	moPage.isExistData = function(poMenuRow) {
		var vbResult = false;
		var vsCondition = "";
		//비교 조건문 생성
		for (var i = 0; i < maCompareCols.length; i++) {
			if (i > 0) {
				vsCondition += " and ";
			}
			var vsConValue = ExtInstance.getNodeToObject(poMenuRow [0]) [maCompareCols [i]];
			vsCondition += maCompareCols [i] + "='" + vsConValue + "' ";
		}
		var vsMenuNm = ExtInstance.getNodeToObject(poMenuRow [0]).MENU_NM;
		
		//해당 인스턴스 존재여부 체크
		var vnExistDataCnt = ExtInstance.getNodeListLength("/root/resList/rptCmnUserQikMenu/row[child::" + vsCondition + "]");
		if (vnExistDataCnt > 0) {
			// vsMenuNm 은 등록된 즐겨찾기 메뉴입니다.
			ComMsg.warn("M211", [vsMenuNm]);
			vbResult = true;
		}
		
		return vbResult;
	};
	
	/**
	 * @desc 메뉴의 인스턴스 로우를 리피트에 등록
	 * @param
	 * @return
	 * @author 강현우 2016.02.11
	 */	
	moPage.insertToRepeat = function(poMenuRow) {
		//신규 행 생성
		var vnInsIdx = util.Grid.insertRow(app, "grdCmnUserQikMenu");
		
		//선택한 메뉴의 각 컬럼값을 신규행에 입력
		for (var i = 0; i < maCompareCols.length; i++) {
			var vsCompareValue = ExtInstance.getNodeToObject(poMenuRow [0]) [maCompareCols [i]];
			util.Grid.setCellValue(app, "grdCmnUserQikMenu", maCompareCols [i], vsCompareValue, vnInsIdx);
		}
		
		var vsUserId = util.DataMap.getValue(app, "dmReqList", "strUserId");
		var vsUserDivRcd = util.DataMap.getValue(app, "dmReqList", "strUserDivRcd");
		var vsLanDivRcd = msDefaultLocale; //언어키 - 헤더의 기본설정언어
		
		var vsUserDivRcdLable = util.SelectCtl.getLabelByValue(app, "cbbUserDivRcd", vsUserDivRcd);
		
		util.Grid.setCellValue(app, "grdCmnUserQikMenu", "USER_ID", vsUserId, vnInsIdx);
		
		util.Grid.setCellValue(app, "grdCmnUserQikMenu", "USER_DIV_RCD", vsUserDivRcd, vnInsIdx);
		util.Grid.setCellValue(app, "grdCmnUserQikMenu", "USER_DIV_NM", vsUserDivRcdLable, vnInsIdx);
		util.Grid.setCellValue(app, "grdCmnUserQikMenu", "LAN_DIV_RCD", vsLanDivRcd, vnInsIdx);
		util.Grid.setCellValue(app, "grdCmnUserQikMenu", "TOP_MENU_CODE", msTopMenuCode, vnInsIdx);
		
		//신규입력시 로우카운트에 맞춰서 자동으로 출력순서를 입력한다.
		var vnRptCnt = util.Grid.getRowCount(app, "grdCmnUserQikMenu");
		util.Grid.setCellValue(app, "grdCmnUserQikMenu", "PRT_ORD", vnRptCnt, vnInsIdx);
		
		//입력건수 +1
		mnInsertRowCnt++;
	};
	
	/**
	 * @desc 조회 클릭
	 * @param
	 * @return void
	 * @author 강현우 2016.02.11
	 */	
	moPage.onClick_BtnSearch = function() {
		// 데이터 변경상태 체크 메시지 
		if (util.Grid.isModified(app, "", "CRM")) {
			return false;
		}
		
		if (!util.validate(app, "grpSearch")) return false;
		
		doList(function(pbSuccess) {
			// 조회 : "조회되었습니다." header 메세지 표시
			if (pbSuccess) util.Msg.notify(app, "NLS.INF.M024");
		});
	}
	
	/**
	 * @desc 저장
	 * @param
	 * @return void
	 * @author 강현우 2016.02.12
	 */	
	function doSave() {
		
		// 리피터 변경사항 체크
		if (!util.Grid.isModified(app, "grdCmnUserQikMenu", "MSG")) {
			return false;
		}
		//리피트 validation check
		if (!util.validate(app, "grdCmnUserQikMenu")) return false;
		
		//strCommand: save 
		util.Submit.send(app, "subSave", function(pbSuccess) {
			if (pbSuccess) {
				
				//메인 공지사항 바로가기메뉴 재조회
				//				moPage.doQikMenu();
				
				doList(function(pbListSuccess) {
					// 조회 : "갱신된 데이터가 조회되었습니다." header 메세지 표시
					if (pbListSuccess) util.Msg.notify(app, "NLS.INF.M025");
				});
			}
		});
		
	}
	
	/**
	 * @desc 공지사항 메인페이지의 바로가기메뉴 재조회
	 * @param
	 * @return
	 * @author 강현우 2016.02.12
	 */	
	function doFavorMenu() {
		var voMainWindow = Common.findMainWindow();
		var offset = voMainWindow.location.href.indexOf(voMainWindow.location.host) + voMainWindow.location.host.length;
		var ctxPath = voMainWindow.location.href.substring(offset, voMainWindow.location.href.indexOf('/', offset + 1));
		voMainWindow.doFavorList(ctxPath);
	};
	
	moPage.onClick_BtnInsert = function() {
		moPage.insertSelectedMenu();
	}
	
	moPage.onClick_BtnSave = function() {
		doSave();
	}
	
	moPage.onClick_BtnRestore = function() {
		util.Grid.restoreRow(app, "grdCmnUserQikMenu");
	}
	
	moPage.onClick_BtnDel = function() {
		util.Grid.deleteRow(app, "grdCmnUserQikMenu");
	}
	
	moPage.onUpdate_RptCmnUserQikMenu = function() {
		ExtRepeat.updateRow("rptCmnUserQikMenu");
	};
	
	moPage.onValueChanged_RhCkbSelect = function() {
//TO-BE: <ExtRepeat.selectedAllPanel> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.selectedAllPanel("rhCkbSelect");
	};
	
	return moPage;
};
