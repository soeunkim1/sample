//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
///<xtmlink path="./stdCmnSAuthRole.xtm"/>

var stdCmnSAuthRole = function() {

	var moPage = new Page();
	//임포트용 데이터 통신 오브젝트
	var moPObject = new PObject();

	/**
	 * @desc  Header Import onLoad
	 * @return void
     * @author xxxx at 2016.10.07
     */
	moPage.onLoadImportDone_ImpTitle = function() {
		doHeaderOnLoad();
	};


				
	/**
	 * @desc 
	 * @return 
	 * @author xxxx 2016.10.07
	 */
	moPage.onModelConstructDone_stdCmnSAuthRole = function() {
		
		//검색조건 초기 설정
		//ExtGroup.initSearchBox("grpSearch", ["grpData"], ["impStdApsStructure"]);
		
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["rptCmnUsrOperGrpUse", "rptCmnOperMenu","rptCmnMenu", "rptCmnMenuOper","rptCmnMenuUser"]);
		
		//트리 크기 설정
		impTreeNodeApplyStyleAttr("width", "240");
		impTreeNodeApplyStyleAttr("height", "563");
		
		
		var vcTrv = model.getControl("trvImpMst");
			vcTrv.on("DOMActivate", function(e){
					var vsSelValue = util.Tree.getSelectedValue(app, "trvImpMst");
					moPage.trvClickEvent(vsSelValue);
			});
			
			
			vcTrv.on("itemexpanding", function(e){
					
		//			ExtRepeat.reset(["rptCmnUsrOperGrpUse", "rptCmnOperMenu"]);
					
			});
		
		
		
		//서브미션 실행 (실패시 cover page)
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				
			
				var vsKeyDate = util.DataMap.getValue(app, "dmResOnLoad", "strKeyDate");
					
				impStdApsStructureList(moPageInfo.authRngRcd, vsKeyDate, true, true, false, moUserInfo.asgnDeptDivRcd, moUserInfo.asgnDeptCd, function(pbTrvSuccess){
					if(pbTrvSuccess){
						ExtTreeView.setExpandItem(getImpStdApsStructureTrvId(), true, model.getControl(getImpStdApsStructureTrvId()).getTreeList().get(0));
					}
				});
				
				
				util.Control.redraw(app, ["cbbUnitSystemRcd","rptCmnMenu"]);
				
				
				
				
			}
		}, true);
	};



	function doTabChange(psCaseId) {
		
			var vsSelTabId = util.Tab.getSelectedId(app, "tabMain");
				
				// 현재 선택된 탭의 상태 체크
				switch (vsSelTabId) {

					case "tpcAuth" : {
						
						
						break;
					}
					
					case "tpcDept" : {
						
						
						break;
					}
					
				}
				
				// 탭변경
				util.Tab.setSelectedTabItem(app, "tabMain", psCaseId);
				
				//탭변경 후 처리 로직
				switch (psCaseId) {

					case "tpcAuth" : {
						
						
						break;
					}

					case "tpcDept" : {
						
						break;
					}
				}
		
	}







	/**
	 * @desc 
	 * @param 
	 * @return 
	 * @author xxxx 2016.10.07
	 */
	function doList(poCallBackFunc) {

	}

	/**
	 * @desc 
	 * @param 
	 * @return 
	 * @author xxxx 2016.10.07
	 */
	function doSave() {

	}



	
	moPage.onClick_TabBtnStudInfo = function() {
		doTabChange("tpcAuth");
	};
	
	
	moPage.onClick_TabBtnDept = function() {
		doTabChange("tpcDept");
	};
	
	
	moPage.onClick_BtnExpend = function() {
		util.Tree.expandAllItems(app, "trvImpMst",true,null);//treeView전체목록 보여준다
	};
	
	
	
	moPage.trvClickEvent = function(){
		var vsSelValue = util.Tree.getSelectedValue(app, "trvImpMst");
		
	
		var vsValueType = vsSelValue.substring(0, 9);
		
		if (vsValueType == "CC009PRSN") {
			var vsStaffNo = vsSelValue.substr(9, vsSelValue.length - 9);
			
			moPage.getUsrOperGrp(vsStaffNo);
			
			
		}else{
			util.Control.reset(app, ["rptCmnUsrOperGrpUse", "rptCmnOperMenu"]);
			
		}
		
		
//		else if(vsValueType == "CC009OG10"){
//			
//		}
//		
	}
	
	
	
		
		
	
	
	
//	moPage.onValueChanged_IpbUserNm = function() {
//		
//	};
	
	
	
	moPage.getUsrOperGrp = function(psStaffNo, poCallBackFunc){
		
				
		util.DataMap.setValue(app, "dmReqList", "strStaffNo" , psStaffNo);
		
		
		//strCommand: listUsrOperGrp 
		util.Submit.send(app, "subListUsrOperGrp", function(pbSuccess){
			if(pbSuccess){
				
				util.Control.redraw(app, "grdCmnUsrOperGrpUse");
				
				if( util.Grid.getRowCount(app, "grdCmnUsrOperGrpUse") < 1){
					util.Control.reset(app, "rptCmnOperMenu");
				}
				
				// 조회 후 콜백함수 수행
				if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
			}
		});
		
	};
	
	
	
	
	moPage.onRowSelect_RptCmnUsrOperGrpUse = function() {
		moPage.getCmnOperMenu();
	};
	
	moPage.getCmnOperMenu = function(poCallBackFunc){
		
		
		
		util.DataMap.setValue(app, "dmRoot", "reqList", "strOprtRoleId", util.Grid.getCellValue(app, "grdCmnUsrOperGrpUse","OPRT_ROLE_ID"));
		//ExtInstance.setValue("/root/reqListOperMenu", "strLanDivRcd", vsLanDivRcd);
		
		
		//strCommand: listOperMenu 
		util.Submit.send(app, "subListOperMenu", function(pbSuccess){
			if(pbSuccess){
				
				util.Control.redraw(app, "grdCmnOperMenu");
				
							
				// 조회 후 콜백함수 수행
				if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
			}
		});
				
				
		
	};
	
	
	moPage.getCmnMenuOper = function(poCallBackFunc){
		
		
		
		util.DataMap.setValue(app, "dmRoot", "reqList", "strMenuId", util.Grid.getCellValue(app, "grdCmnMenu","MENU_ID"));
				
		//strCommand: listMenuOper 
		util.Submit.send(app, "subListMenuOper", function(pbSuccess){
			if(pbSuccess){
				
				util.Control.redraw(app, "grdCmnMenuOper");
		
			
			}
		});
				
				
		
	};
	
	moPage.getCmnMenuUser = function(){
		
		
		
		util.DataMap.setValue(app, "dmRoot", "reqList", "strOprtRoldIdMenu", util.Grid.getCellValue(app, "grdCmnMenuOper","OPRT_ROLE_ID"));
				
		//strCommand: listMenuOperUser 
		util.Submit.send(app, "subListMenuOperUser", function(pbSuccess){
			if(pbSuccess){
				
				util.Control.redraw(app, "grdCmnMenuUser");
		
				
			}
		});
				
				
		
	};
	
	
	moPage.getOperGrpText = function(){
		
		var vsFilterNm = ExtInput.getText("ipbOperNm"); // 검색어
		var vcRpt = model.getControl("rptCmnUsrOperGrpUse");
		
		vcRpt.filterRemoveAll(); // 기존 필터 제거
		vcRpt.setFilter("OPRT_ROLE_ID", "like", vsFilterNm, false);
		vcRpt.setFilter("OPRT_ROLE_NM", "like", vsFilterNm, false);
		vcRpt.filter(true);
	}
	
	
	moPage.getMenuOperText = function(){
		
		var vsFilterNm1 = ExtInput.getText("ipbMenu"); // 검색어
		
		var vsFilterNm2 = ExtInput.getText("ipbUnitSystem"); // 검색어
		
		var vcRpt = model.getControl("rptCmnMenu");
				
		vcRpt.filterRemoveAll(); // 기존 필터 제거
		vcRpt.setFilter("MENU_NM", "like", vsFilterNm1, false);
		vcRpt.setFilter("MENU_ID", "like", vsFilterNm1, false);
		
		
		//vcRpt.setFilter("UNIT_SYSTEM_RCD_NM", "like", vsFilterNm2, false);
		vcRpt.filter(true);
	};
	
	
	
	moPage.getMenuText = function(){
		
		var vsFilterNm = ExtInput.getText("ipbMenuNm"); // 검색어
		var vcRpt = model.getControl("rptCmnOperMenu");
		
		vcRpt.filterRemoveAll(); // 기존 필터 제거
		vcRpt.setFilter("MENU_ID", "like", vsFilterNm, false);
		vcRpt.setFilter("MENU_NM", "like", vsFilterNm, false);
		vcRpt.filter(true);
	}
	
	moPage.onClick_BtnSearchPgm = function() {
		moPage.getOperGrpText();
	};
	
	
	moPage.onKeyDown_IpbOperNm = function(strKeyType, strKeyStatus) {
		if(strKeyType == 13) { ExtModel.dispatch("btnSearchOper", "DOMActivate");  }
	};
	
	moPage.onKeyDown_IpbMenu = function(strKeyType, strKeyStatus) {
		if(strKeyType == 13) { ExtModel.dispatch("btnSearchMe", "DOMActivate");  }
	}
	
	moPage.onClick_BtnSearchMenu = function() {
		moPage.getMenuText();
	}
	
	

	
	
	moPage.onRowSelect_RptCmnMenu = function() {
		moPage.getCmnMenuOper();
	};
	
	

	
	
	moPage.onKeyDown_IpbMenu = function(strKeyType, strKeyStatus) {
		if(strKeyType == 13) { ExtModel.dispatch("btnSearchMe", "DOMActivate");  }
	}
	

	
	
	
	moPage.onClick_BtnSearchMe = function() {
		
		//strCommand: listMenu 
		util.Submit.send(app, "subListMenu", function(pbSuccess){
			if(pbSuccess){
				
				util.Control.redraw(app, "grdCmnMenu");
				
				
				if ( util.Grid.getRowCount(app, "grdCmnMenu") < 1 ) util.Control.reset(app, ["grdCmnMenuOper","grdCmnMenuUser"]);
		
				
			}
		});
	};
	
	
	moPage.onValueChanged_CbbUnitSystemRcd = function() {
		ExtModel.dispatch("btnSearchMe", "DOMActivate");
	};
	
	
	moPage.onKeyDown_IpbUserNm = function(strKeyType, strKeyStatus) {
		if(strKeyType == 13){
		
			var vsUserNm      = ExtControl.getTextValue("ipbUserNm");
					
			if(vsUserNm !="")
			{
				//펼쳐진 트리 모두 감추기
				util.Tree.expandAllItems(app, "trvImpMst",false);
			
				var vcTrv = model.getControl("trvImpMst");
				
		        var voRtn =  vcTrv.getRoot().findItemFromLabel(vsUserNm);
		
				if(ValueUtil.isNull(voRtn)){
					
					util.Control.reset(app, ["rptCmnUsrOperGrpUse", "rptCmnOperMenu"]);
					vcTrv.setValue("");
		
					
				}else{
					//메뉴명 으로 검색
					ExtTreeView.findItemValue("trvImpMst", vsUserNm, "LABEL",  true);
					moPage.trvClickEvent();
				}		
			}
		}
	};
	
	
	moPage.onRowSelect_RptCmnMenuOper = function() {
		moPage.getCmnMenuUser();
	};
	return moPage;
};

