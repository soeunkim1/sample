/*공통모듈*/
var util = new ComUtil(app);

//프로그램목록 그리드 포커스 찾기위한 PK값
var msPkValues = "";
//메뉴얼 복사 팝업 관련
var moStdCmnManualCopySch = [{
	iMenuId : ""	//메뉴 ID
}];

/**
 * 프로그램목록 조회
 */
function doList(poCallBackFunc){
	// 1. 조회조건 필수체크 : 시스템구분
	if(!util.validate(app, "cbbUnitSystemRcd")) return false;		
	
	// 2. 조회 서브미션 호출
	util.Submit.send(app, "subList", function(pbSuccess){
		if(pbSuccess){
			
			//XXX 컬러 바인딩 (스타일 바인딩) 사용
//			var vnIdx = util.Grid.getRowCount("grdCmnPgm");
//				for(var i = 1; i <= vnIdx ; i++){
//					var vsWriteYn = util.Grid.getCellValue("", "WRITE_YN", i);
//					if(vsWriteYn == "Y"){
//						
//					}
//				}
			if(util.isFunc(poCallBackFunc)){
				poCallBackFunc(pbSuccess);
			}
		}
	});
}

/**
 * 화면구분 조회
 */
function doListCmnHelp(poCallBackFunc){
	// 1. 프로그램목록의 선택된 행 값을 가져와 조회값 셋팅
	var vsPgmId = util.Grid.getCellValue(app, "grdCmnPgm", "PGM_ID"); //프로그램 ID
	var vsMenuId = util.Grid.getCellValue(app, "grdCmnPgm", "MENU_ID"); // 메뉴ID
	
	util.DataMap.setValue(app, "dmReqListHelp", "strPgmId", vsPgmId);
	util.DataMap.setValue(app, "dmReqListHelp", "strMenuId", vsMenuId);
	
	// 2. 화면구분목록 조회 서브미션 호출
	util.Submit.send(app, "subListHelp", function(pbSuccess){
		if(pbSuccess){
			//화면구분목록 그리드 상태값에 따른 컨트롤 제어
			doGrdCmnHelpStatus();
		}
		
		if(util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
	});
}

/**
 * [화면구분] 그리드 저장
 */
 function doSaveCmnHelp(poCallBackFunc){
 	    // 1. 변경사항을 체크한다.
		if(!util.Grid.isModified(app, ["grdCmnHelp"], "MSG")){
			return false;
		}
		
		// 2. 필수값을 체크한다.
		if(!util.validate(app, ["grdCmnHelp"])) return false;
		
		// 저장 후 프로그램목록을 찾아갈 PK를 설정한다.
		var vnIdx = util.Grid.getIndex(app, "grdCmnPgm");
		msPkValues = util.Grid.getRowPKColumnValues(app, "grdCmnPgm", vnIdx);

		// 3. 저장 서브미션을 호출한다.
		util.Submit.send(app, "subSaveHelp", function(pbSuccess){
			if(pbSuccess){
				//재조회
				doList(function(pbListSuccess){
					if(ValueUtil.fixNull(msPkValues) != ""){
						util.Grid.selectRowByCondition(app, "grdCmnPgm", msPkValues);
					}
					
					if(pbListSuccess) util.Msg.notify(app, "NLS-INF-M025");
					if(util.isFunc(poCallBackFunc)) poCallBackFunc(pbListSuccess); 
				});
			}
		});
 }

/**
 * 화면구분목록 변경 상태에 따른 컨트롤 제어
 */
function doGrdCmnHelpStatus(){
	// 1. 제어할 컨트롤 배열 선언 : 프로그램목록, 탭
	var vaCtrl = ["grpDataPgm", "grpDataTabMain"];

	if(util.Grid.isModified(app, "grdCmnHelp")){
		util.Control.setEnable(app, false, vaCtrl);
	}else{
		util.Control.setEnable(app, true, vaCtrl);
		
		//화면구분목록의 건수가 없는 경우 탭 컨트롤 비활성화 처리
		var vnGrdCmnHelp = util.Grid.getRowCount(app, "grdCmnHelp");
		if(vnGrdCmnHelp < 1){
			util.Control.setEnable(app, false, "grpDataTabMain");
			
			var vaGrdCtrl = ["grdCmnCompDesc", "grdCmnCompScrnEmt", "grdCmnCompBtnDesc"];
			util.Control.reset(app, app, vaGrdCtrl);
		}else{
			util.Control.setEnable(app, true, "grpDataTabMain");
		}
	}				
}

/**
 * 탭변경에 따른 컨트롤 활성화 처리(프로그램 목록, 화면구분목록)
 */
function doTabChangeEnable(){
	//제어할 컨트롤 배열 선언 : 프로그램목록, 화면구분목록
	var vaCtrl = ["grpDataPgm", "grpDataHelp"];
	util.Control.setEnable(app, true, vaCtrl);
}

/** 
 *첫번째 탭(개요/화면구성요소/버튼설명) 조회
 */
function doListTabCompInfo(poCallBackFunc){
	// 1. 화면구분목록의 선택된 행 값을 가져와 조회값 셋팅
	var vsPgmId = util.Grid.getCellValue(app, "grdCmnHelp", "PGM_ID"); //프로그램 ID
	var vsMenuId = util.Grid.getCellValue(app, "grdCmnHelp", "MENU_ID"); //메뉴 ID
	var vsScreenDivNm = util.Grid.getCellValue(app, "grdCmnHelp", "SCREEN_DIV"); //화면구분명

	util.DataMap.setValue(app, "dmReqListTab", "strPgmId", vsPgmId);
	util.DataMap.setValue(app, "dmReqListTab", "strMenuId", vsMenuId);
	util.DataMap.setValue(app, "dmReqListTab", "strScreenDiv", vsScreenDivNm);

	// 2.  개요/화면구성요소/버튼설명 탭 조회 서브미션 호출	
	util.Submit.send(app, "subListTabCompInfo", function(pbSuccess){
		if(pbSuccess){
		}
		
		//조회 후 콜백함수 수행
		if(util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
	});
}

/**
 * [첫번째 탭 --> 개요/전제조건/제약사항] 그리드 조회
 */
 function doListCmnCompDesc(poCallBackFunc){
 	// 1. 개요/전제조건/제약사항 조회 서브미션 호출
 	util.Submit.send(app, "subListDesc", function(pbSuccess){
 		if(pbSuccess){
 			//첫번째 탭 그리드들의 상태값에 따른 컨트롤 제어
 			doTabCompInfoStatus();
 		}
 		//조회 후 콜백함수 수행
 		if(util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
 	});
 }

/**
 * [첫번째 탭 --> 개요/전제조건/제약사항] 그리드 저장
 */
 function doSaveCmnCompDesc(poCallBackFunc){
 	//1. 변경사항 체크
 	if(!util.Grid.isModified(app, "grdCmnCompDesc", "MSG")){
 		return false;
 	}
 	
 	//2. 필수값 체크
 	if(!util.validate(app, "grdCmnCompDesc")) return false;
 	
 	//3. 저장 서브미션 호출
 	util.Submit.send(app, "subSaveDesc", function(pbSuccess){
 		if(pbSuccess){
 			//재조회
 			doListCmnCompDesc(function(pbListSuccess){
 				if(pbListSuccess) util.Msg.notify(app, "NLS-INF-M025");
 				if(util.isFunc(poCallBackFunc)) poCallBackFunc(pbListSuccess);
 			});
 		}
 	});
 }

/**
 * [첫번째 탭 --> 화면구성요소] 그리드 조회
 */
 function doListCmnCompScrnEmt(poCallBackFunc){
 	//1. 화면구성요소 조회 서브미션 호출
 	util.Submit.send(app, "subListScrnEmt", function(pbSuccess){
 		if(pbSuccess){
 			//첫번째 탭 그리드들의 상태값에 따른 컨트롤 제어
 			doTabCompInfoStatus();
 		}
 		//조회 후 콜백함수 수행
 		if(util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
 	});
 }

/**
 * [첫번째 탭 --> 화면구성요소] 그리드 저장
 */
 function doSaveCmnCompScrnEmt(poCallBackFunc){
 	//1. 변경사항 체크
 	if(!util.Grid.isModified(app, ["grdCmnCompScrnEmt"], "MSG")){
 		return false;
 	}
 	//2. 필수값 체크
 	if(!util.validate(app, ["grdCmnCompScrnEmt"])) return false;
 	//3. 저장 서브미션 호출
 	util.Submit.send(app, "subSaveScrnEmt", function(pbSuccess){
 		if(pbSuccess){
 			//재조회
 			doListCmnCompScrnEmt(function(pbListSuccess){
 				if(pbListSuccess) util.Msg.notify(app, "NLS-INF-M025");
 				if(util.isFunc(poCallBackFunc)) poCallBackFunc(pbListSuccess);
 			});
 		}
 	});
 }

/**
 * [첫번째 탭 --> 버튼설명] 그리드 조회
 */
 function doListCmnCompBtnDesc(poCallBackFunc){
 	//1. 버튼설명 그리드 조회 서브미션 호출
 	util.Submit.send(app, "subListBtnDesc", function(pbSuccess){
 		if(pbSuccess){
 			//첫번째 탭 그리드들의 상태값에 따른 컨트롤 제어
 			doTabCompInfoStatus();
 		}
 		//조회 후 콜백함수 수행
 		if(util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
 	});
 }
 
 /**
 * [첫번째 탭 --> 버튼설명] 그리드 저장
 */
 function doSaveCmnCompBtnDesc(poCallBackFunc){
 	//1.  변경사항 체크
 	if(!util.Grid.isModified(app, ["grdCmnCompBtnDesc"], "MSG")){
 		return false;
 	}
 	
 	//2. 필수값 체크
 	if(!util.validate(app, ["grdCmnCompBtnDesc"])) return false;
 	
 	//3. 저장 서브미션 호출
 	util.Submit.send(app, "subSaveBtnDesc", function(pbSuccess){
 		if(pbSuccess){
 			//재조회
 			doListCmnCompBtnDesc(function(pbListSuccess){
 				if(pbListSuccess) util.Msg.notify(app, "NLS-INF-M025");
 				if(util.isFunc(poCallBackFunc)) poCallBackFunc(pbListSuccess);
 			});
 		}
 	});
 }

/**
 * 첫번째 탭 그리드들의 변경 상태에 따른 컨트롤 제어
 */
 function doTabCompInfoStatus(){
 	//1. 제어할 컨트롤 배열 선언 : 프로그램목록, 화면구분목록
 	var vaCtrl = ["grpDataPgm", "grpDataHelp"];
 	
 	//2. 신규 또는 삭제일 경우 비활성화 처리
 	if(util.Grid.isModified(app, "grdCmnCompDesc") ||
 		util.Grid.isModified(app, "grdCmnCompScrnEmt") ||
 		util.Grid.isModified(app, "grdCmnCompBtnDesc")){
 		util.Control.setEnable(app, false, vaCtrl);
 	}else{
 		util.Control.setEnable(app, true, vaCtrl);
 	}
 }


/**
 * 두번째 탭(조건부/항목설명) 조회
 */
function doListTabItemInfo(poCallBackFunc){
	// 1. 화면구분목록의 선택된 행 값을 가져와 조회값 셋팅
	var vsPgmId = util.Grid.getCellValue(app, "grdCmnHelp", "PGM_ID"); //프로그램 ID
	var vsMenuId = util.Grid.getCellValue(app, "grdCmnHelp", "MENU_ID"); //메뉴 ID
	var vsScreenDivNm = util.Grid.getCellValue(app, "grdCmnHelp", "SCREEN_DIV"); //화면구분명
	
	util.DataMap.setValue(app, "dmReqListTab", "strPgmId", vsPgmId);
	util.DataMap.setValue(app, "dmReqListTab", "strMenuId", vsMenuId);
	util.DataMap.setValue(app, "dmReqListTab", "strScreenDiv", vsScreenDivNm);
	
	// 2.  개요/화면구성요소/버튼설명 탭 조회 서브미션 호출
	util.Submit.send(app, "subListTabItemInfo", function(pbSuccess){
		if(pbSuccess){
			
			//화면구성요소에 행이 없을 경우 항목설명에 새로운 데이터를 저장할 수 없도록 함
			if(util.Grid.getRowCount(app, "grdCmnCompOrgEmt") > 0){
				util.Control.setEnable(app, true, "grid_ids_btn5");
			}else{
				util.Control.setEnable(app, false, "grid_ids_btn5");		
			}
		}
		
		//조회 후 콜백함수 수행
		if(util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
	});
}

/**
 * [두번째 탭 --> 조건부] 그리드 조회
 */
function doListCmnCompCond(poCallBackFunc){
	util.Submit.send(app, "subListCond", function(pbSuccess){
		if(pbSuccess){
			//두번째 탭 그리드들의 상태값에 따른 컨트롤 제어
			doTabItemInfoStatus();
		}
		// 조회 후 콜백함수 수행
		if(util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
	});
}

/**
 * [두번째 탭 --> 조건부] 그리드 저장
 */
 function doSaveCmnCompCond(poCallBackFunc){
 	//1. 변경사항 체크
 	if(!util.Grid.isModified(app, ["grdCmnCompCond"], "MSG")){
 		return false;
 	}
 	
 	//2. 필수값 체크
 	if(!util.validate(app, ["grdCmnCompCond"])) return false;
 	
 	//3. 저장 서브미션 호출
 	util.Submit.send(app, "subSaveCond", function(pbSuccess){
 		if(pbSuccess){
 			//재조회
 			doListCmnCompCond(function(pbListSuccess){
 				if(pbListSuccess) util.Msg.notify(app, "NLS-INF-M025");
 				if(util.isFunc(poCallBackFunc)) poCallBackFunc(pbListSuccess);
 			});
 		}
 	});
 }

/**
 * [두번째 탭 --> 항목설명] 그리드 조회
 */
 function doListCmnHelpItem(poCallBackFunc){
 	//1. 화면구성요소 그리드의 구분값으로 조회조건 설정
 	var vsDivNm = util.Grid.getCellValue(app, "grdCmnCompOrgEmt", "DIV_NM");
 	util.DataMap.setValue(app, "dmReqListTab", "strDivNm", vsDivNm);
 	
 	if(ValueUtil.isNull(vsDivNm)){
 		return false;
 	}
 	
 	//2. [항목설명] 그리드 조회 서브미션 호출
 	util.Submit.send(app, "subListHelpItem", function(pbSuccess){
 		if(pbSuccess){
 			//두번째 탭 그리드들의 상태값에 따른 컨트롤 제어
 			doTabItemInfoStatus();
 		}
 		//조회 후 콜백함수 수행
 		if(util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
 	});
 }

/**
 * [두번째 탭 --> 항목설명] 그리드 저장
 */
 function doSaveCmnHelpItem(poCallBackFunc){
 	//1. 변경사항 체크
 	if(!util.Grid.isModified(app, ["grdCmnHelpItem"], "MSG")){
 		return false;
 	}
 	
 	//2. 필수값 체크
 	if(!util.validate(app, ["grdCmnHelpItem"])) return false;
 	
 	//3. 저장 서브미션 호출
 	util.Submit.send(app, "subSaveHelpItem", function(pbSuccess){
 		if(pbSuccess){
 			//재조회
 			doListCmnHelpItem(function(pbListSuccess){
 				if(pbListSuccess) util.Msg.notify(app, "NLS-INF-M025");
 				if(util.isFunc(poCallBackFunc)) poCallBackFunc(pbListSuccess);
 			});
 		}
 	});
 }

/**
 * 두번째 탭 그리드들의 변경 상태에 따른 컨트롤 제어
 */
function doTabItemInfoStatus(){
	//1. 제어할 컨트롤 배열 선언 : 프로그램목록, 화면구분목록
	var vaCtrl = ["grpDataPgm", "grpDataHelp"];
	
	//2. 신규 또는 삭제일 경우 비활성화처리
	if(util.Grid.isModified(app, ["grdCmnCompCond"]) ||
		util.Grid.isModified(app, ["grdCmnHelpItem"])){
		util.Control.setEnable(app, false, vaCtrl);
	}else{
			util.Control.setEnable(app, true, vaCtrl);			
	}
}

/**
 * 세번째 탭(화면이미지/관련화면) 조회
 */
function doListTabImgInfo(poCallBackFunc){
	// 1. 화면구분목록의 선택된 행 값을 가져와 조회값 셋팅
	var vsPgmId = util.Grid.getCellValue(app, "grdCmnHelp", "PGM_ID"); //프로그램 ID
	var vsMenuId = util.Grid.getCellValue(app, "grdCmnHelp", "MENU_ID"); //메뉴 ID
	var vsScreenDivNm = util.Grid.getCellValue(app, "grdCmnHelp", "SCREEN_DIV"); //화면구분명
	
	util.DataMap.setValue(app, "dmReqListTab", "strPgmId", vsPgmId);
	util.DataMap.setValue(app, "dmReqListTab", "strMenuId", vsMenuId);
	util.DataMap.setValue(app, "dmReqListTab", "strScreenDiv", vsScreenDivNm);
	
	// 2.  개요/화면구성요소/버튼설명 탭 조회 서브미션 호출
	util.Submit.send(app, "subListTabImgInfo", function(pbSuccess){
		if(pbSuccess){
		}
		
		//조회 후 콜백함수 수행
		if(util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
	});
}

/**
 * [세번째 탭 --> 관련화면목록] 그리드 조회
 */
 function doListCmnCompRelScrn(poCallBackFunc){
 	//1. [관련화면목록] 그리드 조회 서브미션 호출
 	util.Submit.send(app, "subListRelScrn", function(pbSuccess){
 		if(pbSuccess){
 			//2. 세번째 탭 그리드들의 상태값에 따른 컨트롤 제어
 			doTabImgInfoStatus();
 		}
 		//조회 후 콜백함수 수행
 		if(util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
 	});
 }
 
 /**
  * [세번째 탭 --> 관련화면목록] 그리드 저장
  */
  function doSaveCmnCompRelScrn(poCallBackFunc){
  	//1. 변경사항 체크
  	if(!util.Grid.isModified(app, ["grdCmnCompRelScrn"], "MSG")){
  		return false;
  	}
  	
  	//2. 필수값 체크
  	if(!util.validate(app, ["grdCmnCompRelScrn"])) return false;
  	
  	//3. 저장 서브미션 호출
  	util.Submit.send(app, "subSaveRelScrn", function(pbSuccess){
  		if(pbSuccess){
  			//재조회
  			doListCmnCompRelScrn(function(pbListSuccess){
  				if(pbListSuccess) util.Msg.notify(app, "NLS-INF-M025");
  				if(util.isFunc(poCallBackFunc)) poCallbackFunc(pbListSuccess);
  			});
  		}
  	});
  }

/**
 * 메뉴얼 복사버튼 콜백함수
 */
exports.doCallBackManualCopy =  function(psTargetMenuId){
 	//프로그램목록을 조회한다.
 	doList(function(pbListSuccess){
 		if(pbListSuccess){
 			util.Msg.notify(app, "NLS-INF-M025");
 			
 			//복사된 메뉴의 포커스를 찾아준다.
 			if(psTargetMenuId != null){
 				util.Grid.selectRowByCondition(app, "grdCmnPgm", "MENU_ID == '" + psTargetMenuId + "'");
 			}
 		}
 	});
 }

/**
 * 세번째 탭 그리드들의 변경 상태에 따른 컨트롤 제어
 */
function doTabImgInfoStatus(){
	//1. 제어할 컨트롤 배열 선언 : 프로그램목록, 화면구분목록
	var vaCtrl = ["grpDataPgm", "grpDataHelp"];
	
	//2. 편집상태일 경우 비활성화 처리
	if(util.Grid.isModified(app, "grdCmnCompRelScrn")){
		util.Control.setEnable(app, false, vaCtrl);
	}else{
		util.Control.setEnable(app, true, vaCtrl);
	}
}
 
/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */e){	
	//첫번째 탭(개요/화면구성요소/버튼설명)으로 로딩		
	util.Tab.setSelectedTabItem(app, "tabMain", 1);
	
	//서브미션 실행 (실패시 cover page)
	util.Submit.send(app, "subOnLoad", function(pbSuccess){
		if(pbSuccess){
			util.Control.redraw(app, ["cbbUnitSystemRcd"]);
			util.SelectCtl.selectItem(app, "cbbUnitSystemRcd", 0);
			
			util.Control.setFocus(app, "ipbMenuId");
		}
	}, true);
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
	if(e.keyCode == cpr.events.KeyCode.ENTER){
		var btnSearch = app.lookup("btnSearch");
		btnSearch.click();
	}
}

/*
 * "" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnSearchClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnSearch = e.control;
	//데이터 변경상태 체크 메세지
	if(util.Grid.isModified(app, )){
		return false;
	}
	
	doList(function(pbSuccess){
		if(pbSuccess) util.Msg.notify(app, "NLS-INF-M024");
	});
}

/*
 * 그리드에서 selection-change 이벤트 발생 시 호출.
 * detail의 cell 클릭하여 설정된 selectionunit에 해당되는 단위가 선택될 때 발생하는 이벤트.
 */
function onGrdCmnPgmSelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grdCmnPgm = e.control;
	
	if(util.Grid.getIndex(app, "grdCmnPgm") == -1){
		return false;
	}
	
	//1. 프로그램목록에서 선택된 행으로 화면구분목록 조회
	doListCmnHelp(function(pbSuccess){
		if(pbSuccess){
			//2. 첫번째 탭(개요/화면구성요소/버튼설명)으로 로딩
			util.Tab.setSelectedTabItem(app, "tabMain", 1);
		}
	});
}

/*
 * 그리드에서 selection-change 이벤트 발생 시 호출.
 * detail의 cell 클릭하여 설정된 selectionunit에 해당되는 단위가 선택될 때 발생하는 이벤트.
 */
function onGrdCmnHelpSelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grdCmnHelp = e.control;
	if(util.Grid.getIndex(app, "grdCmnHelp") == -1){
		return false;
	}
	
	//선택된 현재 행 상태를 가져와 INSERT/UPDATE/DELETE가 아닐 경우에만 탭 조회를 한다.
	var vsRowState = util.Grid.getRowState(app, "grdCmnHelp");
	
	if(vsRowState == cpr.data.tabledata.RowState.UNCHANGED){
		onTabMainSelectionChange(e);
	}
}

/*
 * 탭 폴더에서 before-selection-change 이벤트 발생 시 호출.
 * Tab Item을 선택하기 전 발생하는 이벤트. 다음 이벤트로 select 이벤트를 발생합니다.
 */
function onTabMainBeforeSelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.TabFolder
	 */
	var tabMain = e.control;
	var vsSelTabId = util.Tab.getSelectedId(app, "tabMain");
	
	//1. 현재 선택된 탭의 상태 체크
	switch(vsSelTabId){
		//1-1. 개요/화면구성요소/버튼설명 선택
		case 1 : {
			//개요/전제조건/제약사항 그리드 변경내역 있는 경우
			if(util.Grid.isModified(app, ["grdCmnCompBtnDesc"], "CRM")){
				//tab 이동하지 않음
				e.preventDefault();
				return false;
			}
			
			//화면구성요소 그리드 변경내역 있는 경우
			if(util.Grid.isModified(app, ["grdCmnCompScrnEmt"], "CRM")){
				//tab 이동하지 않음
				e.preventDefault();
				return false;
			}
			
			//버튼설명 그리드 변경내역 있는 경우
			if(util.Grid.isModified(app, ["grdCmnCompDesc"], "CRM")){
				//tab 이동하지 않음
				e.preventDefault();
				return false;
			}
			
			break;
		}
		
		//1-2. 조건부/항목설명 선택
		case 2 : {
			//조건부 그리드 변경내역 있는 경우
			if(util.Grid.isModified(app, ["grdCmnCompCond"], "CRM")){
				//tab 이동하지 않음
				e.preventDefault();
				return false;
			}
			
			//항목설명 그리드 변경내역 있는 경우
			if(util.Grid.isModified(app, ["grdCmnHelpItem"], "CRM")){
				//tab 이동하지 않음
				e.preventDefault();
				return false;
			}

			break;
		}
		
		//1-3. 화면이미지/관련화면 선택
		case 3 : {
			//관련화면 그리드 변경내역 있는 경우
			if(util.Grid.isModified(app, ["grdCmnCompRelScrn"], "CRM")){
				//tab 이동하지 않음
				e.preventDefault();
				return false;
			}

			break;
		}
	}
}

/*
 * 탭 폴더에서 selection-change 이벤트 발생 시 호출.
 * Tab Item을 선택한 후에 발생하는 이벤트.
 */
function onTabMainSelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.TabFolder
	 */
	var tabMain = e.control;
	//2. 탭변경 후 처리 로직
	var vsSelTabId = util.Tab.getSelectedId(app, "tabMain");
	
	switch(vsSelTabId){
		//2-1. 개요/화면구성요소/버튼설명
		case 1: {
			doListTabCompInfo(function(pbSuccess){
				if(pbSuccess){
					//조회 : 조회되었습니다 메세지 표시
					util.Msg.notify(app, "NLS-INF-M024");
					doTabChangeEnable();
				}
			});
			
			break;
		}
		
		//2-2. 조건부/항목설명
		case 2: {
			doListTabItemInfo(function(pbSuccess){
				if(pbSuccess){
					//조회 : 조회되었습니다 메세지 표시
					util.Msg.notify(app, "NLS-INF-M024");
					doTabChangeEnable();
				}
			});
			
			break;
		}
		
		//2-3. 화면이미지/관련화면
		case 3: {
			doListTabImgInfo(function(pbSuccess){
				if(pbSuccess){
					//조회 : 조회되었습니다 메세지 표시
					util.Msg.notify(app, "NLS-INF-M024");
					doTabChangeEnable();
				}
			});
			
			break;
		}
	}
}

/*
 * "" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnOpenMenuClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnOpenMenu = e.control;
	//선택그룹정의 메뉴가 열림
	var vsMenuId = util.Grid.getCellValue(app, "grdCmnPgm", "MENU_ID");
	var vsPgmId = util.Grid.getCellValue(app, "grdCmnPgm", "PGM_ID");
	if(vsMenuId){
		util.doOpenAuthMenu(vsMenuId+vsPgmId);
	}
}

/*
 * "" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnCopyClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnCopy = e.control;
	//프로그램목록의 선택(포커스)된 인덱스를 가져온다.
	var vnIdx = util.Grid.getIndex(app, "grdCmnPgm");
	
	if(vnIdx == -1){
		//msg : 선택된 데이터가 없습니다.
		util.Msg.notify(app, "NLS-WRN-M008");
		return false;
	}
	
	var vsPgmMenuId = util.Grid.getCellValue(app, "grdCmnPgm", "MENU_ID");
	moStdCmnManualCopySch[0].iMenuId = vsPgmMenuId;
	
	//메뉴얼 복사 팝업
	util.Dialog.open(app, "app/cmn_old/cmnPManualCopy", 750, 400, function(e){
		var dialog = e.control;
	}, moStdCmnManualCopySch);
}

/*
 * 사용자 정의 컨트롤에서 insert 이벤트 발생 시 호출.
 */
function onGrid_ids_btn1Insert(/* cpr.event.CUIEvent */ e){
	/** 
	 * @type udc.com.grid_IDS_Btn
	 */
	var grid_ids_btn1 = e.control;
	//1. 신규행 추가 후 화면구분 컬럼에 시작행 설정
	var vnCnt = util.Grid.getRowCount(app, "grdCmnHelp");		//화면구분목록 행 갯수
	
	//2. 기본값 설정 : 프로그램목록(프로그램ID, 메뉴ID)의 선택된 행 값, 출력순서(화면구분목록 행 갯수)
	var vsPgmId = util.Grid.getCellValue(app, "grdCmnPgm", "PGM_ID");	//프로그램ID
	var vsMenuId = util.Grid.getCellValue(app, "grdCmnPgm", "MENU_ID");	//메뉴ID
	
	util.Grid.setCellValue(app, "grdCmnHelp", "PGM_ID", vsPgmId); 
	util.Grid.setCellValue(app, "grdCmnHelp", "MENU_ID", vsMenuId); 
	util.Grid.setCellValue(app, "grdCmnHelp", "PRT_ORD", vnCnt); 
	
	//3. 화면구분목록 그리드 상태값에 따른 컨트롤 제어
	doGrdCmnHelpStatus();
}

/*
 * 사용자 정의 컨트롤에서 delete 이벤트 발생 시 호출.
 */
function onGrid_ids_btn1Delete(/* cpr.event.CUIEvent */ e){
	/** 
	 * @type udc.com.grid_IDS_Btn
	 */
	var grid_ids_btn1 = e.control;
	doGrdCmnHelpStatus();
}

/*
 * 사용자 정의 컨트롤에서 restore 이벤트 발생 시 호출.
 */
function onGrid_ids_btn1Restore(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type udc.com.grid_IDS_Btn
	 */
	var grid_ids_btn1 = e.control;
	//화면구분목록 그리드 상태값에 따른 컨트롤 제어
	doGrdCmnHelpStatus();
}

/*
 * 사용자 정의 컨트롤에서 save 이벤트 발생 시 호출.
 */
function onGrid_ids_btn1Save(/* cpr.event.CUIEvent */ e){
	/** 
	 * @type udc.com.grid_IDS_Btn
	 */
	var grid_ids_btn1 = e.control;
	doSaveCmnHelp();
}

/*
 * "미리보기" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnHelpPrevClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnHelpPrev = e.control;
	
}

/*
 * 사용자 정의 컨트롤에서 insert 이벤트 발생 시 호출.
 */
function onGrid_ids_btn4Insert(/* cpr.event.CUIEvent */ e){
	/** 
	 * @type udc.com.grid_IDS_Btn
	 */
	var grid_ids_btn4 = e.control;
	// 1. 신규행 추가 후 구성요소컬럼에 시작행 설정
	var vnCnt = util.Grid.getRowCount(app, "grdCmnCompDesc");

	// 2. 기본값 설정 : 프로그램목록(프로그램ID, 메뉴ID)의 선택된 행 값
	var vsPgmId = util.Grid.getCellValue(app, "grdCmnHelp", "PGM_ID");     // 프로그램ID
	var vsMenuId = util.Grid.getCellValue(app, "grdCmnHelp", "MENU_ID"); // 메뉴ID
	var vsScreenDivNm = util.Grid.getCellValue(app, "grdCmnHelp", "SCREEN_DIV"); // 화면구분명
 								
	util.Grid.setCellValue(app, "grdCmnCompDesc", "PGM_ID", vsPgmId);
	util.Grid.setCellValue(app, "grdCmnCompDesc", "MENU_ID", vsMenuId);
	util.Grid.setCellValue(app, "grdCmnCompDesc", "SCREEN_DIV", vsScreenDivNm);
				
	// 3. 첫번째 탭 그리드들의 상태값에 따른 컨트롤 제어
	doTabCompInfoStatus();
}

/*
 * 사용자 정의 컨트롤에서 delete 이벤트 발생 시 호출.
 */
function onGrid_ids_btn4Delete(/* cpr.event.CUIEvent */ e){
	/** 
	 * @type udc.com.grid_IDS_Btn
	 */
	var grid_ids_btn4 = e.control;
	doTabCompInfoStatus();
}

/*
 * 사용자 정의 컨트롤에서 restore 이벤트 발생 시 호출.
 */
function onGrid_ids_btn4Restore(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type udc.com.grid_IDS_Btn
	 */
	var grid_ids_btn4 = e.control;
	doTabCompInfoStatus();
}

/*
 * 사용자 정의 컨트롤에서 save 이벤트 발생 시 호출.
 */
function onGrid_ids_btn4Save(/* cpr.event.CUIEvent */ e){
	/** 
	 * @type udc.com.grid_IDS_Btn
	 */
	var grid_ids_btn4 = e.control;
	doSaveCmnCompDesc();
}

/*
 * 그리드에서 update 이벤트 발생 시 호출.
 * Grid의 행 데이터가 수정되었을 때 이벤트.
 */
function onGrdCmnCompScrnEmtUpdate(/* cpr.events.CGridEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grdCmnCompScrnEmt = e.control;
	doTabCompInfoStatus();	
}

/*
 * 사용자 정의 컨트롤에서 insert 이벤트 발생 시 호출.
 */
function onGrid_ids_btn3Insert(/* cpr.event.CUIEvent */ e){
	/** 
	 * @type udc.com.grid_IDS_Btn
	 */
	var grid_ids_btn3 = e.control;
	// 1. 신규행 추가 후 구분 컬럼에 시작행 설정 --> 속성설정(insFocusColumn)

	// 2. 기본값 설정 : 프로그램목록(프로그램ID, 메뉴ID, 화면구분명)의 선택된 행 값, 출력순서
	var vsPgmId = util.Grid.getCellValue(app, "grdCmnHelp", "PGM_ID");     // 프로그램ID
	var vsMenuId = util.Grid.getCellValue(app, "grdCmnHelp", "MENU_ID"); // 메뉴ID
	var vsScreenDivNm = util.Grid.getCellValue(app, "grdCmnHelp", "SCREEN_DIV"); // 화면구분명
	var vnCnt = util.Grid.getRowCount(app, "grdCmnCompScrnEmt"); // 화면구성요소 그리드 로우카운트 
	
	util.Grid.setCellValue(app, "grdCmnCompScrnEmt", "PGM_ID", vsPgmId);
	util.Grid.setCellValue(app, "grdCmnCompScrnEmt", "MENU_ID", vsMenuId);
	util.Grid.setCellValue(app, "grdCmnCompScrnEmt", "SCREEN_DIV", vsScreenDivNm);
	util.Grid.setCellValue(app, "grdCmnCompScrnEmt", "ORG_EMT", "CMN1204"); // 구성요소 : 화면구성요소(CMN1204)
	util.Grid.setCellValue(app, "grdCmnCompScrnEmt", "PRT_ORD", vnCnt); // 출력순서 
	
	// 3. 첫번째 탭 그리드들의 상태값에 따른 컨트롤 제어
	doTabCompInfoStatus();
}

/*
 * 사용자 정의 컨트롤에서 delete 이벤트 발생 시 호출.
 */
function onGrid_ids_btn3Delete(/* cpr.event.CUIEvent */ e){
	/** 
	 * @type udc.com.grid_IDS_Btn
	 */
	var grid_ids_btn3 = e.control;
	doTabCompInfoStatus();
}

/*
 * 사용자 정의 컨트롤에서 restore 이벤트 발생 시 호출.
 */
function onGrid_ids_btn3Restore(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type udc.com.grid_IDS_Btn
	 */
	var grid_ids_btn3 = e.control;
	doTabCompInfoStatus();
}

/*
 * 사용자 정의 컨트롤에서 save 이벤트 발생 시 호출.
 */
function onGrid_ids_btn3Save(/* cpr.event.CUIEvent */ e){
	/** 
	 * @type udc.com.grid_IDS_Btn
	 */
	var grid_ids_btn3 = e.control;
	doSaveCmnCompScrnEmt();
}

/*
 * 그리드에서 update 이벤트 발생 시 호출.
 * Grid의 행 데이터가 수정되었을 때 이벤트.
 */
function onGrdCmnCompBtnDescUpdate(/* cpr.events.CGridEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grdCmnCompBtnDesc = e.control;
	doTabCompInfoStatus();
}

/*
 * 사용자 정의 컨트롤에서 insert 이벤트 발생 시 호출.
 */
function onGrid_ids_btn2Insert(/* cpr.event.CUIEvent */ e){
	/** 
	 * @type udc.com.grid_IDS_Btn
	 */
	var grid_ids_btn2 = e.control;
	// 1. 신규행 추가 후 구분 컬럼에 시작행 설정 --> 속성설정(insFocusColumn)

	// 2. 기본값 설정 : 프로그램목록(프로그램ID, 메뉴ID, 화면구분명)의 선택된 행 값, 출력순서
	var vsPgmId = util.Grid.getCellValue(app, "grdCmnHelp", "PGM_ID");     // 프로그램ID
	var vsMenuId = util.Grid.getCellValue(app, "grdCmnHelp", "MENU_ID"); // 메뉴ID
	var vsScreenDivNm = util.Grid.getCellValue(app, "grdCmnHelp", "SCREEN_DIV"); // 화면구분명
	var vnCnt = util.Grid.getRowCount(app, "grdCmnCompBtnDesc"); // 버튼설명 그리드 로우카운트 
	
	util.Grid.setCellValue(app, "grdCmnCompBtnDesc", "PGM_ID", vsPgmId);
	util.Grid.setCellValue(app, "grdCmnCompBtnDesc", "MENU_ID", vsMenuId);
	util.Grid.setCellValue(app, "grdCmnCompBtnDesc", "SCREEN_DIV", vsScreenDivNm);
	util.Grid.setCellValue(app, "grdCmnCompBtnDesc", "ORG_EMT", "CMN1206"); // 구성요소 : 처리버튼[CMN1206]
	util.Grid.setCellValue(app, "grdCmnCompBtnDesc", "PRT_ORD", vnCnt); // 출력순서 
	
	// 3. 첫번째 탭 그리드들의 상태값에 따른 컨트롤 제어
	doTabCompInfoStatus();
}

/*
 * 사용자 정의 컨트롤에서 delete 이벤트 발생 시 호출.
 */
function onGrid_ids_btn2Delete(/* cpr.event.CUIEvent */ e){
	/** 
	 * @type udc.com.grid_IDS_Btn
	 */
	var grid_ids_btn2 = e.control;
	doTabCompInfoStatus();
}

/*
 * 사용자 정의 컨트롤에서 restore 이벤트 발생 시 호출.
 */
function onGrid_ids_btn2Restore(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type udc.com.grid_IDS_Btn
	 */
	var grid_ids_btn2 = e.control;
	doTabCompInfoStatus();
}

/*
 * 사용자 정의 컨트롤에서 save 이벤트 발생 시 호출.
 */
function onGrid_ids_btn2Save(/* cpr.event.CUIEvent */ e){
	/** 
	 * @type udc.com.grid_IDS_Btn
	 */
	var grid_ids_btn2 = e.control;
	doSaveCmnCompBtnDesc();
}

/*
 * 그리드에서 update 이벤트 발생 시 호출.
 * Grid의 행 데이터가 수정되었을 때 이벤트.
 */
function onGrdCmnCompCondUpdate(/* cpr.events.CGridEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grdCmnCompCond = e.control;
	doTabCompInfoStatus();
}

/*
 * 사용자 정의 컨트롤에서 insert 이벤트 발생 시 호출.
 */
function onGrid_ids_btn6Insert(/* cpr.event.CUIEvent */ e){
	/** 
	 * @type udc.com.grid_IDS_Btn
	 */
	var grid_ids_btn6 = e.control;
	// 1. 신규행 추가 후 구성요소컬럼에 시작행 설정 --> 속성설정(insFocusColumn)

	// 2. 기본값 설정 : 프로그램목록(프로그램ID, 메뉴ID, 화면구분명)의 선택된 행 값, 출력순서,
	var vsPgmId = util.Grid.getCellValue(app, "grdCmnHelp", "PGM_ID");     // 프로그램ID
	var vsMenuId = util.Grid.getCellValue(app, "grdCmnHelp", "MENU_ID"); // 메뉴ID
	var vsScreenDivNm = util.Grid.getCellValue(app, "grdCmnHelp", "SCREEN_DIV"); // 화면구분명
	var vnCnt = util.Grid.getRowCount(app, "grdCmnCompCond"); //  조건부 그리드 로우카운트 
	
	util.Grid.setCellValue(app, "grdCmnCompCond", "PGM_ID", vsPgmId);
	util.Grid.setCellValue(app, "grdCmnCompCond", "MENU_ID", vsMenuId);
	util.Grid.setCellValue(app, "grdCmnCompCond", "SCREEN_DIV", vsScreenDivNm);
	util.Grid.setCellValue(app, "grdCmnCompCond", "ORG_EMT", "CMN1205");  // 구성요소 : 조건부항목[CMN1205] 
	util.Grid.setCellValue(app, "grdCmnCompCond", "PRT_ORD", vnCnt);           // 출력순서 
				
	// 3. 두번째 탭 그리드들의 상태값에 따른 컨트롤 제어
	doTabItemInfoStatus();
}

/*
 * 사용자 정의 컨트롤에서 delete 이벤트 발생 시 호출.
 */
function onGrid_ids_btn6Delete(/* cpr.event.CUIEvent */ e){
	/** 
	 * @type udc.com.grid_IDS_Btn
	 */
	var grid_ids_btn6 = e.control;
	doTabItemInfoStatus();
}

/*
 * 사용자 정의 컨트롤에서 restore 이벤트 발생 시 호출.
 */
function onGrid_ids_btn6Restore(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type udc.com.grid_IDS_Btn
	 */
	var grid_ids_btn6 = e.control;
	doTabItemInfoStatus();
}

/*
 * 사용자 정의 컨트롤에서 save 이벤트 발생 시 호출.
 */
function onGrid_ids_btn6Save(/* cpr.event.CUIEvent */ e){
	/** 
	 * @type udc.com.grid_IDS_Btn
	 */
	var grid_ids_btn6 = e.control;
	doSaveCmnCompCond();
}

/*
 * 그리드에서 selection-change 이벤트 발생 시 호출.
 * detail의 cell 클릭하여 설정된 selectionunit에 해당되는 단위가 선택될 때 발생하는 이벤트.
 */
function onGrdCmnCompOrgEmtSelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grdCmnCompOrgEmt = e.control;
	if(util.Grid.getIndex(app, "grdCmnHelpItem") == -1){
		return false;
	}
	
	// 1. [항목설명] 그리드 변경체크 : 변경된 경우 이전 행 선택
	// beforeFocusRowIdx 해주기 위해 항목설명 그리드 before-selection-change 시 그리드 변경 체크
//	if(util.Grid.isModified("grdCmnHelpItem", "CRM")){
//		util.Grid.selectRows("grdCmnCompOrgEmt", ExtRepeat.getBeforeFocusRowIdx("rptCmnCompOrgEmt");
//		return false;
//	}
	
	// 2. [항목설명] 그리드 조회
	doListCmnHelpItem();
}

/*
 * 그리드에서 update 이벤트 발생 시 호출.
 * Grid의 행 데이터가 수정되었을 때 이벤트.
 */
function onGrdCmnHelpItemUpdate(/* cpr.events.CGridEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grdCmnHelpItem = e.control;
	doTabItemInfoStatus();
}

/*
 * 사용자 정의 컨트롤에서 insert 이벤트 발생 시 호출.
 */
function onGrid_ids_btn5Insert(/* cpr.event.CUIEvent */ e){
	/** 
	 * @type udc.com.grid_IDS_Btn
	 */
	var grid_ids_btn5 = e.control;
	// 1. 신규행 추가 후 구성요소컬럼에 시작행 설정 --> 속성설정(insFocusColumn)

	// 2. 기본값 설정 : 프로그램목록(프로그램ID, 메뉴ID, 화면구분명), 화면구성요소(구분)의 선택된 행 값, 출력순서
	var vsPgmId = util.Grid.getCellValue(app, "grdCmnHelp", "PGM_ID");     // 프로그램ID
	var vsMenuId = util.Grid.getCellValue(app, "grdCmnHelp", "MENU_ID"); // 메뉴ID
	var vsScreenDivNm = util.Grid.getCellValue(app, "grdCmnHelp", "SCREEN_DIV"); // 화면구분명
	var vsDivNm = util.Grid.getCellValue(app, "grdCmnCompOrgEmt", "DIV_NM");  // [화면구성요소]그리드의 구분
	var vnCnt = util.Grid.getRowCount(app, "grdCmnHelpItem"); // 항목설명 그리드 로우카운트 
	
	util.Grid.setCellValue(app, "grdCmnHelpItem", "PGM_ID", vsPgmId);
	util.Grid.setCellValue(app, "grdCmnHelpItem", "MENU_ID", vsMenuId);
	util.Grid.setCellValue(app, "grdCmnHelpItem", "SCREEN_DIV", vsScreenDivNm);
	util.Grid.setCellValue(app, "grdCmnHelpItem", "SCREEN_EMT_NM", vsDivNm);  // 화면요소명 
	util.Grid.setCellValue(app, "grdCmnHelpItem", "PRT_ORD", vnCnt);                    // 출력순서 
				
	// 3. 두번째 탭 리피트들의 상태값에 따른 컨트롤 제어
	doTabItemInfoStatus();
}

/*
 * 사용자 정의 컨트롤에서 delete 이벤트 발생 시 호출.
 */
function onGrid_ids_btn5Delete(/* cpr.event.CUIEvent */ e){
	/** 
	 * @type udc.com.grid_IDS_Btn
	 */
	var grid_ids_btn5 = e.control;
	doTabItemInfoStatus();
}

/*
 * 사용자 정의 컨트롤에서 restore 이벤트 발생 시 호출.
 */
function onGrid_ids_btn5Restore(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type udc.com.grid_IDS_Btn
	 */
	var grid_ids_btn5 = e.control;
	doTabItemInfoStatus();
}

/*
 * 사용자 정의 컨트롤에서 save 이벤트 발생 시 호출.
 */
function onGrid_ids_btn5Save(/* cpr.event.CUIEvent */ e){
	/** 
	 * @type udc.com.grid_IDS_Btn
	 */
	var grid_ids_btn5 = e.control;
	doSaveCmnHelpItem();
}

/*
 * 그리드에서 update 이벤트 발생 시 호출.
 * Grid의 행 데이터가 수정되었을 때 이벤트.
 */
function onGrdCmnCompRelScrnUpdate(/* cpr.events.CGridEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grdCmnCompRelScrn = e.control;
	doTabImgInfoStatus();
}

/*
 * 사용자 정의 컨트롤에서 insert 이벤트 발생 시 호출.
 */
function onGrid_ids_btn7Insert(/* cpr.event.CUIEvent */ e){
	/** 
	 * @type udc.com.grid_IDS_Btn
	 */
	var grid_ids_btn7 = e.control;
	// 1. 신규행 추가 후 관련화면구분 컬럼에 시작행 설정 --> 속성설정(insFocusColumn)

	// 2. 기본값 설정 : 프로그램목록(프로그램ID, 메뉴ID, 화면구분명)의 선택된 행 값, 출력순서,
	var vsPgmId = util.Grid.getCellValue(app, "grdCmnHelp", "PGM_ID");     // 프로그램ID
	var vsMenuId = util.Grid.getCellValue(app, "grdCmnHelp", "MENU_ID"); // 메뉴ID
	var vsScreenDivNm = util.Grid.getCellValue(app, "grdCmnHelp", "SCREEN_DIV"); // 화면구분명
	var vnCnt = util.Grid.getRowCount(app, "grdCmnCompRelScrn"); // 관련화면목록 리피트 로우카운트 
	
	util.Grid.setCellValue(app, "grdCmnCompRelScrn", "PGM_ID", vsPgmId);
	util.Grid.setCellValue(app, "grdCmnCompRelScrn", "MENU_ID", vsMenuId);
	util.Grid.setCellValue(app, "grdCmnCompRelScrn", "SCREEN_DIV", vsScreenDivNm);
	util.Grid.setCellValue(app, "grdCmnCompRelScrn", "ORG_EMT", "CMN1207");  // 구성요소 : 관련화면[CMN1207] 
	util.Grid.setCellValue(app, "grdCmnCompRelScrn", "PRT_ORD", vnCnt);           // 출력순서 
				
	// 3. 세번째 탭 리피트들의 상태값에 따른 컨트롤 제어
	doTabImgInfoStatus();
}

/*
 * 사용자 정의 컨트롤에서 delete 이벤트 발생 시 호출.
 */
function onGrid_ids_btn7Delete(/* cpr.event.CUIEvent */ e){
	/** 
	 * @type udc.com.grid_IDS_Btn
	 */
	var grid_ids_btn7 = e.control;
	doTabImgInfoStatus();
}

/*
 * 사용자 정의 컨트롤에서 restore 이벤트 발생 시 호출.
 */
function onGrid_ids_btn7Restore(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type udc.com.grid_IDS_Btn
	 */
	var grid_ids_btn7 = e.control;
	doTabImgInfoStatus();
}

/*
 * 사용자 정의 컨트롤에서 save 이벤트 발생 시 호출.
 */
function onGrid_ids_btn7Save(/* cpr.event.CUIEvent */ e){
	/** 
	 * @type udc.com.grid_IDS_Btn
	 */
	var grid_ids_btn7 = e.control;
	doSaveCmnCompRelScrn();
}

/*
 * 콤보 박스에서 selection-change 이벤트 발생 시 호출.
 * ComboBox Item을 선택하여 선택된 값이 저장된 후에 발생하는 이벤트.
 */
function onGdCbbOrgEmtSelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.ComboBox
	 */
	var gdCbbOrgEmt = e.control;
	// 구성요소 변경시 
	var vsOrgEmt = util.Grid.getCellValue(app, "grdCmnCompDesc", "ORG_EMT");
	
	if(vsOrgEmt == "CMN1201"){
		util.Grid.setCellValue(app, "grdCmnCompDesc", "PRT_ORD", "1");
	}else if(vsOrgEmt == "CMN1202"){
		util.Grid.setCellValue(app, "grdCmnCompDesc", "PRT_ORD", "2");
	}else if(vsOrgEmt == "CMN1203"){
		util.Grid.setCellValue(app, "grdCmnCompDesc", "PRT_ORD", "3");
	}
}

/*
 * 그리드에서 update 이벤트 발생 시 호출.
 * Grid의 행 데이터가 수정되었을 때 이벤트.
 */
function onGrdCmnCompDescUpdate(/* cpr.events.CGridEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grdCmnCompDesc = e.control;
	doTabCompInfoStatus();
}

/*
 * 그리드에서 before-selection-change 이벤트 발생 시 호출.
 * detail의 cell 클릭하여 설정된 selectionunit에 해당되는 단위가 선택되기 전에 발생하는 이벤트.
 */
function onGrdCmnCompOrgEmtBeforeSelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grdCmnCompOrgEmt = e.control;
	if(util.Grid.isModified(app, "grdCmnHelpItem", "CRM")){
		return false;
	}
}



