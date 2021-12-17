exports.getApp = function() {
	
	return app;
};

/*
 * Body에서 property-change 이벤트 발생 시 호출.
 * 앱의 속성이 변경될 때 발생하는 이벤트 입니다.
 */
function onBodyPropertyChange(/* cpr.events.CPropertyChangeEvent */ e){
	app.lookup("otp_title").redraw();
}

/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	
	var voHostApp = app.getHostAppInstance();
	var util = new ComUtil(voHostApp);
	
	//modal 팝업 여부
	/**@type cpr.controls.Output*/
	var vcOptTitle = app.lookup("otp_title");
	var voMenuInfo = null;
	var vcIpbPgmTitle = app.lookup("ipbPgmTitle");
	
	if(vcOptTitle.value && vcOptTitle.value != ""){
		voMenuInfo = util.getMenuInfo();
		if(voMenuInfo){			
			vcIpbPgmTitle.value = voMenuInfo.get("PGM_ID");
		}
		vcIpbPgmTitle.redraw();
	}else {
		var voTopHostApp = app.getRootAppInstance();
		if(voTopHostApp){
			/**@type cpr.controls.MDIFolder*/
			var vcMdi = voTopHostApp.lookup("main_mdi");
			if(vcMdi){
				var vcItem = vcMdi.getSelectedTabItem();
				voMenuInfo = vcItem.userattr("menuInfo");
				if(voMenuInfo){
					var voData = JSON.parse(voMenuInfo);
					vcOptTitle.value = voData.MENU_PATH;
					vcIpbPgmTitle.value = voData.PGM_ID;
				}else{
					vcOptTitle.value = vcItem.text;
				}
				
				vcOptTitle.redraw();
				vcIpbPgmTitle.redraw();
			}
		}
	}
	
	if(voHostApp){
		//그리드 초기화
		var vsGridIds = ValueUtil.isNull(voHostApp.getAppProperty("gridIds")) 
							? app.getAppProperty("gridIds") : voHostApp.getAppProperty("gridIds");
		
		if(vsGridIds){
			var vaGridIds = vsGridIds.split(",");
			util.Grid.init(vaGridIds);
		}
		
		//조회조건 그룹 
		var vsHostGrpSchId = ValueUtil.isNull(voHostApp.getAppProperty("grpSchIds")) 
								? app.getAppProperty("grpSchIds") : voHostApp.getAppProperty("grpSchIds");
		//데이터 영역 그룹
		var vsHostGrpDataId = ValueUtil.isNull(voHostApp.getAppProperty("grpDataIds")) 
								? app.getAppProperty("grpDataIds") : voHostApp.getAppProperty("grpDataIds");
		
		if(vsHostGrpSchId && vsHostGrpDataId){
			
			util.Group.initSearchBox(vsHostGrpSchId, vsHostGrpDataId.trimAll().split(","));
		}
		
		doImpMenuAuthCtls(null, util);
	}
	
	
	
	
	
//	if(voHostApp){
//		
//		
//		
//		
//		
//		if(vsHostGrpSchId){
//			
//			var vaHostGrpSchId = vsHostGrpSchId.split(",");
//			
//			vaHostGrpSchId.some(function(vsGrpId){
//				
//				var vcHostGrpSch = voHostApp.lookup(vsGrpId);
//				var vaHostGrpSchChild = vcHostGrpSch.getChildren();
//				
//				vaHostGrpSchChild.some(function(vcGrpSchChild){
//					
//					var vsChildId = vcGrpSchChild.id;
//					if(vsChildId){
//						if(vsChildId.indexOf("btnSearch") != -1){
//							vcGrpSchChild.addEventListener("click", function(e){
//								
//								//리피트 변경 여부 체크 필요 todo...
//								if(vsHostGrpDataId){
//									var vaHostGrpDataId = vsHostGrpDataId.split(",");
//									
//									vaHostGrpDataId.some(function(vsGrpId){
//										var vcHostGrpData = voHostApp.lookup(vsGrpId);
//										//vcHostDataGrpSch.enabled = false;
//										var vaHostGrpData = vcHostGrpData.getChildren();
//										
//										vaHostGrpData.some(function(vcChild){
//											vcChild.enabled = true;
//											vcChild.redraw();
//										});
//										
//									});
//									
//								}
//							});
//						}
//					}
//					
//				});
//				
//				var vcDataMap = vcHostGrpSch.getBindContext().dataMap;
//				vcDataMap.addEventListener("update", function(/* cpr.events.CDataEvent */e){
//					
//					if(vsHostGrpDataId){
//						var vaHostGrpDataId = vsHostGrpDataId.split(",");
//						
//						vaHostGrpDataId.some(function(vsGrpId){
//							var vcHostGrpData = voHostApp.lookup(vsGrpId);
//							//vcHostDataGrpSch.enabled = false;
//							var vaHostGrpData = vcHostGrpData.getChildren();
//							
//							vaHostGrpData.some(function(vcChild){
//								vcChild.enabled = false;
//								vcChild.redraw();
//							});
//							
//						});
//						
//					}
//					var vcReqData = e.control;
//					
//					//vcReqData.setValue(e.columnName, e.beforeValue);
//				});
//				
//			});
//			
//			
//		}
//		
//		
//	}
	
}


function doImpMenuAuthCtls(psMenuAuthDivRcd, poUtil){
	if(psMenuAuthDivRcd == null){
		psMenuAuthDivRcd = poUtil.getMenuInfo().get("MENU_AUTH_DIV_RCD");
	}else{
		//권한 매핑 컨트롤 초기화.
		var vaInitBtnCtl = poUtil.Group.getChildType("button");
		vaInitBtnCtl.forEach(function (vcCtl, index, array) {
			
			if(vcCtl._authDisable){
				vcCtl._authDisable = false;
				vcCtl.enabled = true;
			}
		});	
			
	}
											
	if(psMenuAuthDivRcd != "CC00701"){
	
		var vaBtnCtl = poUtil.Group.getChildType("button");
		vaBtnCtl.forEach(function (vcCtl, index, array) {			
				
				var vsBtnId = vcCtl.id;
				//조회권한
				if(psMenuAuthDivRcd == "CC00702"){
					if( vsBtnId.startsWith("btnInsert") || vsBtnId.startsWith("btnNew") || vsBtnId.startsWith("btnCopy") || vsBtnId.startsWith("btnDel") || vsBtnId.startsWith("btnSave") ){
						vcCtl.enabled = false;
						vcCtl._authDisable = true;
					}
					
				//수정권한
				}else if(psMenuAuthDivRcd == "CC00704"){
					
					if( vsBtnId.startsWith("btnInsert") || vsBtnId.startsWith("btnNew") || vsBtnId.startsWith("btnCopy") || vsBtnId.startsWith("btnDel") ){
						
						vcCtl.enabled = false;
						vcCtl._authDisable = true;
					}
					
				//입력+수정권한
				}else if(psMenuAuthDivRcd == "CC00703"){
					if( vsBtnId.startsWith("btnDel") ){
						vcCtl.enabled = false;
						vcCtl._authDisable = true;
						
					}
					
				}
			});
		}	
	
}

/*
 * Body에서 init 이벤트 발생 시 호출.
 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit(/* cpr.events.CEvent */ e){
	
}



/*
 * 이미지에서 contextmenu 이벤트 발생 시 호출.
 * 마우스의 오른쪽 버튼이 클릭되거나 컨텍스트 메뉴 키가 눌려지면 호출되는 이벤트.
 */
function onImageContextmenu(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Image
	 */
	var image = e.control;
	var voHostApp = app.getHostAppInstance();
	var util = new ComUtil(voHostApp);
	
	if(util.Dialog.isPopup() == true){
		// 팝업 시 같은 host 에서 모든 팝업 호출이 필요
		//TODO 팝업으로 열린 화면일 경우에는 메뉴가 뜨지 않음. 따라서, 개발요청일 경우는 컨텍스트 메뉴 없도록 해야함
		return;
	}
	
	e.preventDefault();
		
	var vcMenu = new cpr.controls.Menu("menu");
//	vcMenu.style.css({
//		width: "200px",
//		height: "100px"
//	})
	
	//단위 테스트 아이템	
	var vcItemUTest = new cpr.controls.TreeItem("", "1", "root");
	vcItemUTest.bind("label").toLanguage("UI-SCR-UTEST");
	
	//프로그램 변경 요청 아이템
	var vcItemDevReq = new cpr.controls.TreeItem("", "2", "root");
	vcItemDevReq.bind("label").toLanguage("UI-SCR-DEVREQ");
	
	//운영일경우 단위테스트 제외.
//	if(window.location.host.indexOf("") == -1){
//		vcMenu.addItem(vcItemUTest);
//	}
	vcMenu.addItem(vcItemUTest);
	vcMenu.addItem(vcItemDevReq);

	vcMenu.addEventListener("selection-change", function(/**@type cpr.events.CSelectionEvent */ e){
		var vaNewSelection = e.newSelection;
		switch(vaNewSelection[0].value){
			case "1":
				util.Dialog.openModaless("app/cmn/cmnPUnitTest", 1090, 675);
			break;
			case "2":
				util.Dialog.openModaless("app/cmn/cmnPRepairBoard", 830, 670);
			break;
		}
		vcMenu.hide();
		vcMenu.dispose();
	});
	
	vcMenu.addEventListenerOnce("blur", function(/**@type cpr.events.CFocusEvent*/ e){
		vcMenu.hide();
		vcMenu.dispose();
	});
	
//	vcMenu.rootValue = "root";
	
	/**@type cpr.controls.Container */
	var vcRootContainer = app.getRootAppInstance().getContainer();
	vcRootContainer.addChild(vcMenu, {
		positions: [			
			{
				"media": "all and (min-width: 1024px)",
				width: "200px",
				height: "100px",
				position: "absolute",
				left: e.clientX + "px",
				top: e.clientY + "px"
			},
			{
				"media": "all and (min-width: 500px) and (max-width: 1024px)",
				width: "200px",
				height: "100px",
				position: "absolute",
				left: e.clientX + "px",
				top: e.clientY + "px"
			},
			{
				"media": "all and (max-width: 500px)",
				width: "200px",
				height: "100px",
				position: "absolute",
				left: e.clientX + "px",
				top: e.clientY + "px"
			}
		]
	});
		
	vcMenu.focus();
	
}


