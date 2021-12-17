//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
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
};
