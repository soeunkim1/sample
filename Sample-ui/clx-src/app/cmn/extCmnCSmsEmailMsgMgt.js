//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
///<xtmlink path="./extCmnCSmsEmailMsgMgt.xtm"/>

/**
 * @desc   에디터에서 MOUSE OUT 이벤트 이후 호출할 이벤트 예시
 * @param  {?} psEditorValue 에디터에 입력된 데이터
 * @return void
 * @author 최경민 2015.12.07
 */
function callBackOnChangeSmartEditor(psEditorValue){
	//에디터에서 마우스가 나왔을 경우 에디터의 내용을 프리폼 해당컬럼에 셋밸류한다.
	util.FreeForm.setValue(app, "frfExtCmnSndMgt", "SND_CONT", psEditorValue, true);
} 
			
var extCmnCSmsEmailMsgMgt = function() {

	var moPage = new Page();
	//임포트용 데이터 통신 오브젝트
	var moPObject = new PObject();
	

	

	/**
	 * @desc  Header Import onLoad
	 * @return void
     * @author xxxx at 2016.02.02
     */
	moPage.onLoadImportDone_ImpTitle = function() {
		doHeaderOnLoad();
	};


				
	/**
	 * @desc 
	 * @return 
	 * @author xxxx 2016.02.02
	 */
	moPage.onModelConstructDone_extCmnCSmsEmailMsgMgt = function() {
		
		//리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init("rptExtCmnSndMgt", "frfExtCmnSndMgt");
		//검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", "grpData");
		//서브미션 실행 (실패시 cover page)
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				
					ExtRepeat.refresh(["cbbSystemDivRcd", "cbbSmsDivCd", "frfExtCmnSndMgt"]);
					
						//프로그램ID로 모듈을 구분하여 공통이 아닌 모듈은 해당 모듈의 시스템만 검색할 수 있도록 제어
						var vsMenuId = moPageInfo.menuId.toUpperCase().substring(3, 6);
		
						if(vsMenuId != "CMN"){
							
							util.Control.setEnable(app, false, "cbbSystemDivRcd");
							ExtSelectCtl.setValue("cbbSystemDivRcd", "CB001" + vsMenuId);
						
						} else {
							util.SelectCtl.selectItem(app, "cbbSystemDivRcd", 0);
						}
								
					util.SelectCtl.selectItem(app, "cbbSmsDivCd", 1);
					
					if(vsMenuId == "CET"){
						util.Control.setEnable(app, false, "cbbSmsDivCd");
					}
					
					
						
					//moPage.onGetSndIdList();
					
								
			}
		});
	}

   /**
	 * @desc
	 *
	 * @return void
	 * @author xxxx 2016.02.02
	 */
	moPage.onClick_BtnNew = function() {
		
		var vsSmsDiv = ExtSelectCtl.getValue("cbbSmsDivCd");
		var vsSystemCd = ExtSelectCtl.getValue("cbbSystemDivRcd");
		
		//해당 리피트 insertRow 후 편집 시작할 컬럼 지정
		var vnIdx = util.Grid.insertRow(app, "grdExtCmnSndMgt");
		util.Grid.setCellValue(app, "grdExtCmnSndMgt", "SND_DIV_RCD", vsSmsDiv);
		util.Grid.setCellValue(app, "grdExtCmnSndMgt", "UNIT_SYSTEM_RCD", vsSystemCd);
	};

   /**
	 * @desc
	 *
	 * @return void
	 * @author xxxx 2016.02.02
	 */
	moPage.onClick_BtnDel = function() {
		util.Grid.deleteRow(app, "grdExtCmnSndMgt");
		doCompareFrfEnable();
	};

   /**
	 * @desc
	 *
	 * @return void
	 * @author xxxx 2016.02.02
	 */
	moPage.onClick_BtnRestore = function() {
		util.Grid.restoreRow(app, "grdExtCmnSndMgt");
		doCompareFrfEnable();
		
//TO-BE: <ExtRepeat.copyRowForm> 그리드-프리폼인 경우에는 selection바인딩으로 처리하기 때문에 불필요함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.copyRowForm("rptExtCmnSndMgt", "frfExtCmnSndMgt");
					
		
	};

   /**
	 * @desc
	 *
	 * @return void
	 * @author xxxx 2016.02.02
	 */
	moPage.onClick_BtnSave = function() {
		doSave();
	};

   /**
	 * @desc
	 *
	 * @return void
	 * @author xxxx 2016.02.02
	 */
	moPage.onClick_BtnSearch = function() {
		 //작업영역 리피트 변경 내역 체크
		if(util.Grid.isModified(app, "", "CRM")){
			return false;
		}
		
		if(!util.validate(app, ["cbbSystemDivRcd","cbbSmsDivCd"])) return;
		
		
		doList(function(pbSuccess) {
				doCompareFrfEnable();
				// 조회 : "조회되었습니다." header 메세지 표시
				if (pbSuccess) util.Msg.notify(app, "NLS.INF.M024");
			});
			
		//var vsSmsDiv = ExtSelectCtl.getValue("cbbSmsDivCd");
		
		//SMS
		//if(vsSmsDiv == "CMN01301"){
		//	moPage.doList(function(pbSuccess) {
		//		moPage.doCompareFrfEnable();
		//		// 조회 : "조회되었습니다." header 메세지 표시
		//		if (pbSuccess) Common.setMsgStatus(NLS.INF.M024);
		//	});
		//}else{
		//	//뷰어 오픈 및 초기설정 이후 조회 실행
		//	callEditorSetPage("htmlEmailCont", false, moPageInfo.menuId, "callBackOnChangeSmartEditor", function(){
		//		
		//		moPage.doList(function(pbSuccess) {
		//			moPage.doCompareFrfEnable();
		//			// 조회 : "조회되었습니다." header 메세지 표시
		//			if (pbSuccess) Common.setMsgStatus(NLS.INF.M024);
		//		});
		//		
		//	});
		//}
	};

	/**
	 * @desc 
	 * @param 
	 * @return 
	 * @author xxxx 2016.02.02
	 */
	function doList(poCallBackFunc) {

		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdExtCmnSndMgt");
				
				var vnCnt = util.Grid.getRowCount(app, "grdExtCmnSndMgt");
				if(vnCnt < 1){
					util.Control.reset(app, "frfExtCmnSndMgt");					
				}
			
				// 조회 후 콜백함수 수행
				if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
			}
		});
	}

	/**
	 * @desc 
	 * @param 
	 * @return 
	 * @author xxxx 2016.02.02
	 */
	function doSave() {

		// 리피터 변경사항 체크
		if(!util.Grid.isModified(app, "grdExtCmnSndMgt", "MSG")){
			return false;
		}
		//리피트 validation check
		if(!util.validate(app, "grdExtCmnSndMgt")) return false;

		//strCommand: save 
		util.Submit.send(app, "subSave", function(pbSuccess){
			if(pbSuccess){
				doList(function(pbListSuccess) {
					// 조회 : "갱신된 데이터가 조회되었습니다." header 메세지 표시
					if (pbListSuccess) util.Msg.notify(app, "NLS.INF.M025");
				});
			}
		});
	}

	/**
	 * @desc 리피트 panel click event
	 * @param
	 * @return void
	 * @author xxxx 2016.02.02
	 */
	moPage.onValueChanged_RhCkbSelect = function() {
//TO-BE: <ExtRepeat.selectedAllPanel> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.selectedAllPanel("rhCkbSelect");
	};	/**
	/**
	 * @desc 마스터 리피트 상태에 따른 프리폼 비활성화 제어
	 * @param
	 * @return void
	 * @author xxxx 2016.02.02
	 */
	function doCompareFrfEnable() {
		
		var vsSmsDiv = ExtSelectCtl.getValue("cbbSmsDivCd");
		
		if( (!util.Grid.getIndex(app, "grdExtCmnSndMgt"))
			|| util.Grid.getRowState(app, "grdExtCmnSndMgt") == cpr.data.tabledata.RowState.DELETED) {
			
			util.Control.setEnable(app, false, ["frfExtCmnSndMgt"]);	
			//EMail
				if(vsSmsDiv == "CMN01302"){
					callEditorSetEnableEditor("htmlEmailCont", false);
				}
			
		} else {
			
				util.Control.setEnable(app, true, ["frfExtCmnSndMgt"]);	
				
				//EMail
				if(vsSmsDiv == "CMN01302"){
					callEditorSetEnableEditor("htmlEmailCont", true);
					var vsCont =  util.Grid.getCellValue(app, "grdExtCmnSndMgt", "SND_CONT");
					
					callEditorSetEditorContent("htmlEmailCont", vsCont);
				}
			
		}
	}

	/**
	 * @desc 리피트 rowSelect event
	 * @param
	 * @return void
	 * @author xxxx 2016.02.02
	 */
	moPage.onRowSelect_RptExtCmnSndMgt = function() {
		
		// 리피트 현재 index get
		var vnIndex = util.Grid.getIndex(app, "grdExtCmnSndMgt");
		var vsSmsDiv = ExtSelectCtl.getValue("cbbSmsDivCd");
		var vcFrfSndCtl = model.getControl("cbbFrfSndId");	
		var vsOrgRef = vcFrfSndCtl.setAttr("nodeset", "/root/resOnLoad/msgDivCdAllList/row[child:: UCD = '"+ ExtSelectCtl.getValue("cbbSystemDivRcd") +"']");
		vcFrfSndCtl.refresh();
				
		//리피트 특정 row 데이터를 프리폼 copy
//TO-BE: <ExtRepeat.copyRowForm> 그리드-프리폼인 경우에는 selection바인딩으로 처리하기 때문에 불필요함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.copyRowForm("rptExtCmnSndMgt", "frfExtCmnSndMgt", vnIndex);
		doCbbFrfSndIdChage();
		//프리폼 비활성화 제어
		doCompareFrfEnable();
		
		
	};

	/**
	 * @desc 프리폼 update event
	 * @param
	 * @return void
	 * @author xxxx 2016.02.02
	 */
	moPage.onUpdate_FrfExtCmnSndMgt = function() {
//TO-BE: <ExtFreeForm.updateToRpt> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtFreeForm.updateToRpt("rptExtCmnSndMgt", "frfExtCmnSndMgt");
	};

	
	
	moPage.onValueChanged_CbbSystemDivRcd = function() {
		
	};
	
	
	moPage.onValueChanged_CbbSmsDivCd = function() {
		doChgSmsDivCdCtl();
	};
	

	function doChgSmsDivCdCtl(){
		
		var vsSmsDiv = ExtSelectCtl.getValue("cbbSmsDivCd");
				
		//SMS
		if(vsSmsDiv == "CMN01301"){
			util.Control.setVisible(app, false, ["lblFrfEmail","ipbFrfEmail", "lblFrfSndPsn", "ipbFrfSndPsn", "htmlEmailCont"]);
			var domContent = model.window().document.getElementById("htmlEmailCont");
			domContent.style.display = "none";
		
			util.Control.setVisible(app, true, ["lblFrfSndTelNo","ipbFrfSndTelNo","txtFrfSndCont"]);
			
			util.Control.setEnable(app, true, "rdbFrfDiv");
			
		}else{
			util.Control.setVisible(app, true, ["lblFrfEmail","ipbFrfEmail", "lblFrfSndPsn", "ipbFrfSndPsn", "htmlEmailCont"]);
			var domContent = model.window().document.getElementById("htmlEmailCont");
			domContent.style.display = "inline";
			util.Control.setVisible(app, false, ["lblFrfSndTelNo","ipbFrfSndTelNo","txtFrfSndCont"]);
			util.Control.setEnable(app, false, "rdbFrfDiv");
			
			//뷰어 오픈 및 초기설정 이후 조회 실행
			callEditorSetPage("htmlEmailCont", false, moPageInfo.menuId, "callBackOnChangeSmartEditor", function(){
				
				
				
			});
	
		}
		
		//var vcFrfDiv = model.getControl("rdbFrfDiv");
		
		
		
	}
	
	
	moPage.onValueChanged_CbbFrfSndId = function() {
		
		var vnIdx = util.SelectCtl.getSelectedIndex(app, "cbbFrfSndId");
		
		var vsFrfSndIdLable = util.SelectCtl.getLabel(app, "cbbFrfSndId", vnIdx);
		
		util.Grid.setCellValue(app, "grdExtCmnSndMgt", "SND_NM", vsFrfSndIdLable);
		
		doCbbFrfSndIdChage();
		
	};
	
	function doCbbFrfSndIdChage(){
		
		util.DataMap.setValue(app, "dmReqList", "strSndIdNm", util.FreeForm.getValue(app, "frfExtCmnSndMgt", "SND_ID"));
					
				
		//strCommand: getSndNm 
		util.Submit.send(app, "subSndNm", function(pbSuccess){
					if(pbSuccess){			
						//ExtControl.rebuild("rdbFrfDiv");
						util.Control.redraw(app, "rdbFrfDiv");
						
					}
				});
		
	}
	
	

	
	
	
	
//	moPage.onValueChanged_RdbFrfDiv = function() {
//		var vcTxt = model.getControl("txtFrfSndCont");
//		var vsDivValue = ExtControl.getValue("rdbFrfDiv");
//		var vsTxtValue = vcTxt.getText();
//		var vsInsertValue = vsTxtValue.insert(vcTxt.getCaretCtrl().getSelectionStart(), vsDivValue);
//		ExtFreeForm.setValue("frfExtCmnSndMgt", "SND_CONT", vsInsertValue);
//	};
	
	
	moPage.onValueChanged_RdbFrfDiv = function() {
		var vcTxt = model.getControl("txtFrfSndCont");
		var vsDivValue = util.Control.getValue(app, "rdbFrfDiv");
		var vsTxtValue = vcTxt.getText();
		var vsInsertValue = vsTxtValue.insert(vcTxt.getCaretCtrl().getSelectionStart(), vsDivValue);
		util.FreeForm.setValue(app, "frfExtCmnSndMgt", "SND_CONT", vsInsertValue);
	}
	
	
	moPage.onSetFocus_CbbSmsDivCd = function() {
			var vsSmsDiv = ExtSelectCtl.getValue("cbbSmsDivCd");
			
						
			//SMS
			if(vsSmsDiv == "CMN01302"){
			util.Control.setVisible(app, true, ["lblFrfEmail","ipbFrfEmail", "lblFrfSndPsn", "ipbFrfSndPsn", "htmlEmailCont"]);
				var domContent = model.window().document.getElementById("htmlEmailCont");
				domContent.style.display = "inline";
				util.Control.setVisible(app, false, ["lblFrfSndTelNo","ipbFrfSndTelNo","txtFrfSndCont"]);
				util.Control.setEnable(app, false, "rdbFrfDiv");
				
				//뷰어 오픈 및 초기설정 이후 조회 실행
				callEditorSetPage("htmlEmailCont", false, moPageInfo.menuId, "callBackOnChangeSmartEditor", function(){
					
					
					
				});
				
			}else{
				
		
			}
	};
	return moPage;
};

