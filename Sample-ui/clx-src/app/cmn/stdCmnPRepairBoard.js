var util = new ComUtil(app);	
/******************************************************************************************************
 *	}];
 *  ▶ 설정가능 유형
 *      1. 인스턴스
 *      2. 리피트 디테일 셀 ID
 *      3. 컨트롤 ID
 *  ▶ 각 변수별 설명
 *      iXXX : 팝업에 전달될  input 파라미터
 *      oXXX : 팝업에서 선택한 값을 받을 데이터
 *  	1. controlId 			: 최초 이벤트의 버튼이나 그리드 id             			(필수)
 *  	2. iFileSerialNo		: 파일순번                                						(선택) 
 *  	3. iFileSubPath 		: 저장될 파일 폴더(appworks.properties에 정의된 폴더 경로)	(필수)	
 *  	4. iTableName 		: 파일업로드에 사용될 업무단 테이블명							(필수)
 *  	5. iIsHideDelete 		: 삭제버튼 숨기기 여부 								(선택)
 *								  	  default : false;
 *		6. iIsDownloadOnly	: 다운로드만 가능할지 여부(업로드X)							(선택)
 *								      default : false;
 *		7. iIsDirectUpLoad   : auto save기능을 사용하지 않고 파일업로드 팝업을 이용하여 업로드 후 업로드된 정보만 리턴받아 제어 할 경우 사용
 *									  default : false;
 *		8. iFileExtFilter		: 업로드가능 확장자(배열) 								(선택)
 *								  	  ex)["jpg","png"]
 *  	8. oFileSerailNo 		: 파일순번											(필수)
 *  	9. oFileCnt 			: 저장된 파일 갯수									(선택)
 *									  (	func의 args 대체 가능 poRtnFileInfo.strFileCnt)
 *									  리피트내 컬럼 지정시 updatable="False" 지정
 *  	10. oTmpFilePath 	: 임시폴더파일경로										(선택)
 *									  리피트일경우 null로 지정, TMP_FILE_PATH 데이터셋 생성됨
 *									  
 *		11.oFileDataChanged	: 파일업로드 변경 여부 판단									(필수)		
 *									  (	func의 args 대체 가능 poRtnFileInfo.isFileDataChanged)
 *
 *  	12. func 				: 팝업에서 선택한 값을 받은 후 추가 로직이 필요한 경우 함수
 *									  args..
 * 									  poRtnFileInfo.IS_FILE_CHG 		파일업로드 리피트 변경 여부
 *													FILE_CNT			업로드 파일 갯수
 *													TMP_FILE_PATH		임시파일경로
 *									  				FILE_SERAIL_NO		파일순번
 *******************************************************************************************************/	
var moIdsForStdCmnFileUtil = [{
	controlId 		: "btnFileDown",
	iFileSerialNo 	: "rdOptFileSerialNo",
	iFileSubPath 	:  "stdCmnCRepairBoard",
	iTableName 		: "CMN_MOD_BOARD",
	iIsDirectUpLoad	: null,
	iIsHideDelete 	: null,			
	iIsDownloadOnly : null,
	iFileExtFilter 	: null,
	oFileSerailNo	: null,
	oTmpFilePath	: null,			//리피트일경우 null로 지정
	oFileCnt		: "optFrfFileCnt",		
	oFileDataChanged: null,
	func			:function(poRtnFileInfo){
						if(poRtnFileInfo.IS_FILE_CHG && poRtnFileInfo.FILE_CNT == 0){
							//ExtRepeat.setValue("rptCmnModBoard", "FILE_SERIAL_NO", "");
							util.Grid.setCellValue(app, "grdCmnModBoard", "FILE_SERIAL_NO", "");
							doSave();
						}
					}
}];
 
var moPageInfo = null;
var moUserInfo = null;
					
/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	//리피트 초기 설정
//	ExtRepeat.init(["rptCmnModBoard"]);
	//검색조건 초기 설정
//	ExtGroup.initSearchBox("grpSearch", "grpData");

	//서브미션 실행 (실패시 cover page)
	util.Submit.send(app, "subOnLoad", function(pbSuccess){
		moPageInfo = util.Auth.getMenuInfo(app);
		moUserInfo = util.Auth.getUserInfo(app);
					
		if(pbSuccess){
			util.Control.redraw(app, "frfCmnModBoard");
			
			// 현재 선택한 메뉴명과 메뉴아이디
			var vsMenuId;
			var vsMenuNm;
							
//			var opener = model.getScriptModel("opener", "javascript");
//			if( opener.model.getContainerName() == "tmt_content" ){
//				vsMenuId = moPageInfo.menuId;
//				vsMenuNm = moPageInfo.menuNm;
//				
//			}else{
//				if( opener.model.getId().startsWith("std") || opener.model.getId().startsWith("ext") ){
//					vsMenuId = opener.model.getId();
//				}else{
//					var vsParentPathNm = opener.model.getBaseXtmPath().pathname;
//					
//					vsParentPathNm = vsParentPathNm.substring(vsParentPathNm.lastIndexOf("/")+1, vsParentPathNm.lastIndexOf(".xtm"));
//					vsMenuId = vsParentPathNm;
//				}
//				vsMenuNm = opener.model.getTitle();
//			}
			/** @type cpr.core.AppInstance */
			var voHostApp = app.getHostAppInstance();
			if(voHostApp != null){
				vsMenuId = moPageInfo.get("MENU_ID");
				vsMenuNm = moPageInfo.get("MENU_NM");
			}else{
				var vsCurrentAppId = util.getApp().id;
				vsMenuId = vsCurrentAppId
			}
			
			util.Control.setValue(app, app, "optPgmId", vsMenuId);
			util.Control.setValue(app, app, "optPgmNm", vsMenuNm);
			// 현재 사용자의 시스템관리자 여부, 사용자ID, 사용자명 
			var vsSystemMgrYn = moUserInfo.get("SYSTEM_MGR_YN");
			var vsUserId = moUserInfo.get("USER_ID");
			var vsUserNm = moUserInfo.get("USER_NM");

			// 시스템관리자가 아닌 경우, 본인 것만 조회되도록 -> 조회조건 등록자 기본입력
			// 시스템관리자인 경우 등록자 검색 가능하도록 처리
			if(vsSystemMgrYn != "Y"){				
				util.Control.setValue(app, app, "ipbRegtntId", vsUserId);
				util.Control.setValue(app, app, "optRegtntNm", vsUserNm);
				
				util.Control.setEnable(app, false, "cmnusersch1");
			}else{
				util.Control.setEnable(app, true, "cmnusersch1");
			}
			
			util.Control.setEnable(app, true, "grid_ids_btn1");
			
			// 조회
			/** @type udc.com.btnSearch*/
			var voBtnSearch = app.lookup("btnSearch");
			voBtnSearch.click();
		}
	}, true);
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
	var vsUserNm = util.Udc.getUdcAppProperty("cmnusersch1", "oUserNm");
	if(vsUserNm == ""){
		util.Udc.setUdcAppProperty("cmnusersch1", "iUserId", "");
		util.Control.redraw(app, "cmnusersch1");
	}
	
	if(!util.validate(app, "grpSearch") || util.Grid.isModified(app, "grdCmnModBoard", "CRM")) {
		e.stopImmediatePropagation();
		return false;
	}
	
	doList(function(pbSuccess){
		//조회: "조회되었습니다." header 메세지 표시.
		if(pbSuccess){
			util.Msg.notify(app, "NLS-INF-M024");
		}
	});
	
}

/*
 * 사용자 정의 컨트롤에서 searchCallBack 이벤트 발생 시 호출.
 */
function onCmnusersch1SearchCallBack(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type udc.cmn.cmnUserSch
	 */
	var cmnusersch1 = e.control;
//	cmnusersch1.redraw();
}


/**
 * 조회버튼 이벤트(의뢰내역 목록을 조회한다.)
 * @param poCallBackFunc 콜백함수
 */
function doList(poCallBackFunc){
	// 조회조건 필수체크
	// searchClick에서 수행
//	if(!ValidUtil.check(["optPgmId"])){
//		return false;
//	}

	util.Submit.send(app, "subList", function(pbSuccess){
		if(pbSuccess){
			// 의뢰내역목록 
			util.Control.redraw(app, ["grdCmnModBoard", "lblTitleRptCmnModBoard"]);
			
			var vnGrdCnt = util.Grid.getRowCount(app, "grdCmnModBoard");
			if(vnGrdCnt == 0){
				util.Control.setEnable(app, false, ["frfCmnModBoard"]);
			}
			if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
		}
	});
}

/**
 * 작업저장 event
 * @return void 
 */
function doSave(){
	// 리피터 변경사항 체크
	if(!util.Grid.isModified(app, "grdCmnModBoard", "MSG")){
		return false;
	}
	//리피트 validation check
	if(!util.validate(app, "grdCmnModBoard")) {
		return false;
	}

	util.Submit.send(app, "subSave", function(pbSuccess){
		if(pbSuccess){
			doList(function(pbListSuccess) {
				// 조회 : "갱신된 데이터가 조회되었습니다." header 메세지 표시
				if (pbListSuccess) {
					util.Msg.notify(app, "NLS-INF-M025");
					
					var vsSerialNo = util.DataMap.getValue(app, "dmResList", "SERIAL_NO");
					if(!ValueUtil.isNull(vsSerialNo)){
						util.Grid.selectRowByCondition(app, "grdCmnModBoard", "SERIAL_NO == '" + vsSerialNo + "'");
					}
				}
			});
		}
	});
}

/*
 * 그리드에서 selection-change 이벤트 발생 시 호출.
 * detail의 cell 클릭하여 설정된 selectionunit에 해당되는 단위가 선택될 때 발생하는 이벤트.
 */
function onGrdCmnModBoardSelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grdCmnModBoard = e.control;
	doSelectRptCmnModBoard();
}

function doSelectRptCmnModBoard(){
	var vnIndex = util.Grid.getIndex(app, "grdCmnModBoard");
	// 프리폼 활성화 비활성화 제어
	doCompareFrfEnable(vnIndex);
	
	// 시스템관리자일 경우 조치관련 컨트롤 입력가능하게 처리
	var vsSystemMgrYn = util.Auth.getUserInfo(app, "SYSTEM_MGR_YN");
	util.Control.setEnable(app, true, ["cbbFrfActStatRcd", "dipFrfActDt", "dipFrfActPlanDt", "ipbFrfActPsnNm", "ipbFrfCnfmPsnNm"]);
	util.Control.setReadOnly(app, false, ["txtFrfActCont"]);
	
	//리피트 특정 row 데이터를 프리폼 copy
	// context binding으로 해결 
//	ExtRepeat.copyRowForm("rptCmnModBoard", "frfCmnModBoard", vnIndex);
}

/**
 * 셀렉트 여부에 따라 프리폼 활성화 제어
 * @param {Number} pnIndex 
 * @return void
 */
function doCompareFrfEnable(pnIndex) {
	if( util.Grid.getRowCount(app, "grdCmnModBoard") == 0 
		|| util.Grid.getIndex(app, "grdCmnModBoard") == -1 
		|| util.Control.isEnable("grdCmnModBoard") == false 
		|| util.Grid.getRowState(app, "grdCmnModBoard", pnIndex) == cpr.data.tabledata.RowState.DELETED){
		util.Control.setEnable(app, false, ["frfCmnModBoard"]);
	} else {
		util.Control.setEnable(app, true, ["frfCmnModBoard"]);	
	}
}

/*
 * 사용자 정의 컨트롤에서 insert 이벤트 발생 시 호출.
 */
function onGrid_ids_btn1Insert(/* cpr.event.CUIEvent */ e){
	/** 
	 * @type udc.com.grid_IDS_Btn
	 */
	var grid_ids_btn1 = e.control;
	doInsert();
}

/**
 * 신규 행을 추가한다.
 * @return void
 */
function doInsert(){
	// 1. 신규로우 추가
	// 공통으로 수행
//	var vnIdx = ExtRepeat.insertRow("rptCmnModBoard");

	var vnIdx = util.Grid.getIndex(app, "grdCmnModBoard");
	var vsMenuId = util.Control.getValue(app, "optPgmId"); // 조회조건 : 메뉴 
	var vsCurDt = util.DataMap.getValue(app, "dmResOnLoad", "strCurDt"); // 현재일자 

	util.DataSet.setValue(app, "dsCmnModBoard", vnIdx, "REQ_ID", "REQ-"+vsMenuId);					// 요청ID
	util.DataSet.setValue(app, "dsCmnModBoard", vnIdx, "MENU_PGM_ID", vsMenuId);					// 메뉴ID
	util.DataSet.setValue(app, "dsCmnModBoard", vnIdx, "ACT_STAT_RCD", "MGT0901");					// 조치상태 : 등록[MGT0901] 2015.12.22 추가 hyunteak
	util.DataSet.setValue(app, "dsCmnModBoard", vnIdx, "REG_DT", vsCurDt);						// 등록일자
	util.DataSet.setValue(app, "dsCmnModBoard", vnIdx, "REGTNT_ID", util.Auth.getUserInfo(app, "USER_ID"));	// 등록자ID
	util.DataSet.setValue(app, "dsCmnModBoard", vnIdx, "REGTNT_NM", util.Auth.getUserInfo(app, "USER_NM"));	// 등록자명
	util.DataSet.setValue(app, "dsCmnModBoard", vnIdx, "REG_DIV_RCD", "MGT0302");					// 등록구분 : 오류[MGT0301]
	util.DataSet.setValue(app, "dsCmnModBoard", vnIdx, "ACT_STAT_RCD", "MGT0901");					// 조치상태 : 등록[MGT0901]
	
	var vsDevChargeNm = util.DataSet.getValue(app, "dsCmnPgmList", vnIdx, "DEV_CHARGER_NM");
	var vsDrawChargeNm = util.DataSet.getValue(app, "dsCmnPgmList", vnIdx, "DRAW_CHARGER_NM");
		
	util.DataSet.setValue(app, "dsCmnModBoard", vnIdx, "ACT_PSN_NM", vsDevChargeNm);				// 조치자명
	util.DataSet.setValue(app, "dsCmnModBoard", vnIdx, "CNFM_PSN_NM", vsDrawChargeNm);				// 확인자명

	util.Control.redraw(app, "grdCmnModBoard");
	// 프리폼의 콤보박스에 포커스
	util.Control.setFocus(app, "txtFrfErrorCont");
}
/*
 * 사용자 정의 컨트롤에서 delete 이벤트 발생 시 호출.
 */
function onGrid_ids_btn1Delete(/* cpr.event.CUIEvent */ e){
	/** 
	 * @type udc.com.grid_IDS_Btn
	 */
	var grid_ids_btn1 = e.control;

	if(util.Grid.getIndex(app, "grdCmnModBoard") != -1){
		doSelectRptCmnModBoard();
	}else{
		 util.Control.setEnable(app, false, ["frfCmnModBoard"]);
	}
}

/*
 * 사용자 정의 컨트롤에서 restore 이벤트 발생 시 호출.
 */
function onGrid_ids_btn1Restore(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type udc.com.grid_IDS_Btn
	 */
	var grid_ids_btn1 = e.control;
	doSelectRptCmnModBoard();
}

/*
 * 사용자 정의 컨트롤에서 save 이벤트 발생 시 호출.
 */
function onGrid_ids_btn1Save(/* cpr.event.CUIEvent */ e){
	/** 
	 * @type udc.com.grid_IDS_Btn
	 */
	var grid_ids_btn1 = e.control;
	doSave();
}


/*
 * 콤보 박스에서 selection-change 이벤트 발생 시 호출.
 * ComboBox Item을 선택하여 선택된 값이 저장된 후에 발생하는 이벤트.
 */
function onCbbFrfActStatRcdSelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.ComboBox
	 */
	var cbbFrfActStatRcd = e.control;

	// 조치상태에 따른 조치일자 제어
	var vsActSts = cbbFrfActStatRcd.value; // 조치상태
	
	if(vsActSts == "MGT0903" || vsActSts == "MGT0905"){
		var vsActDt = util.Control.getValue(app, "dipFrfActDt");
		var vsActPlanDt = util.Control.getValue(app, "dipFrfActPlanDt");
		var vsCurDt = util.DataMap.getValue(app, "dmResOnLoad", "strCurDt");
		if(ValueUtil.isNull(vsActDt)){
			util.Control.setValue(app, app, "dipFrfActDt", vsCurDt);
		}
		
		if(ValueUtil.isNull(vsActPlanDt)){
			util.Control.setValue(app, app, "dipFrfActPlanDt", vsCurDt);
		}
		
	}else{
		util.Control.setValue(app, app, "dipFrfActDt", "");
	}
}

/*
 * "화면닫기" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnCancelClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnCancel = e.control;
	if(util.Grid.isModified(app, "grdCmnModBoard", "MSG")){
		return false;
	}
	//리피트 validation check
	if(!util.validate(app, "grdCmnModBoard")) {
		return false;
	}
	
//	util.Msg.confirm("M010", null, psMsgBoxType);
	app.close();
}

/*
 * 사용자 정의 컨트롤에서 upLoadCallBack 이벤트 발생 시 호출.
 */
function onCmnfileutil1UpLoadCallBack(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type udc.cmn.cmnFileUtil
	 */
	var cmnfileutil1 = e.control;
	util.Control.redraw(app, "optFrfFileCnt");
}
