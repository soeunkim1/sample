var util = new ComUtil(app);

//var mnBeforeIndex = 0;
//var msvsRefKeyTab2 = null;
//var msOgtCdTab2 = null;
//var mGrxSelectRow = null;
var flg = "";
//var vaIns = ["tabMain", "btnSave"];
//var vaSel = ["btnSearch", "cbbDeptDivRcd", "ipbDeptDivNm", "cbbLangList", "dipKeyDate", "cbbYearList", "cbbSmtList", "impDateHelp"];

/******************************************************************************************************
 *  객체검색팝업 관련 설정사항
 *  ▶ 설정가능 유형
 *      1. 인스턴스
 *      2. 리피트 디테일 셀 ID
 *      3. 컨트롤 ID
 *  ▶ 각 변수별 설명
 *      iXXX : 팝업에 전달될  input 파라미터
 *      oXXX : 팝업에서 선택한 값을 받을 데이터
 *  	1. controlId 		: 최초 이벤트의 버튼이나 그리드 id             (필수)
 *  	2. iCd 				: 검색조건 부서코드                                 (선택) 
 *  	3. iNm 				: 검색조건 부서명									(선택)	
 *  	4. iObjDivRcd 	: 검색될 객체구분코드 종류						(필수)
 *								  (CC009OG : "행정부서", CC009SA : "학사부서", CC009SP : "이수과정", CC009CU : "교과그룹", CC009OT : "외부부서")
 *  	5. iStartObject 	: 검색시작부서 										(선택)
 *								  ("CC009OG20000,CC009OG70000",) 
 *		6. iOtDivRcd 		: 외부부서구분코드 									(선택)
 *								  (외부부서[CC009OT]일때 사용) ("CB008UNIV, CB008HSCL")
 *		7. iOtIsTreeView	: 트리보이기 유무 									(선택)
 *								  default : N (외부부서[CC009OT]일때 사용) "Y" 
 *  	8. iLanDivRcd 	: 언어키													(선택)
 *  	9. iKeyDate 		: 기준일													(필수)
 *  	10. oObjDivRcd 	: 객체구분코드 
 *  	11. oCd 			: 부서코드
 *  	12. oCdNm 		: 부서명
 *  	13. oBegDt 		: 시작일
 *  	14. oEndDt 		: 종료일
 *  	15. oLanDivRcd 	: 언어키
 *  	16. func 			: 팝업에서 선택한 값을 받은 후 추가 로직이 필요한 경우 함수
 *									  
 *******************************************************************************************************/
//var moIdsForStdCmnPObjSch = [{ //데이터관리 부분선언
//		controlId: "btnFrfSaNm",
//		iCd: "",
//		iNm: "ipbFrfSaNm",
//		iObjDivRcd: ["CC009OT"],
//		iStartObject: "",
//		iOtDivRcd: "",
//		iOtIsTreeView: "Y",
//		iLanDivRcd: "cbbLangList",
//		iKeyDate: "dipKeyDate",
//		iKeyEndDate: "",
//		oObjDivRcd: "ipbFrfUobjDivRcd",
//		oCd: "ipbFrfSaCd",
//		oCdNm: "ipbFrfSaNm",
//		oBegDt: "",
//		oEndDt: "",
//		oLanDivRcd: "",
//		func: null
//	},
//	{ //통폐합관리 부분선언
//		controlId: "rdBtnDeptCdNm",
//		iCd: "",
//		iNm: "rdIpbOriObjDetailUni",
//		iObjDivRcd: ["CC009OT"],
//		iStartObject: "",
//		iOtDivRcd: "",
//		iOtIsTreeView: "Y",
//		iLanDivRcd: "cbbLangList",
//		iKeyDate: "dipKeyDate",
//		iKeyEndDate: "",
//		oObjDivRcd: "rdIpbObjDivRcdUni",
//		oCd: "rdIpbOriObjDetailCdUni",
//		oCdNm: "rdIpbOriObjDetailUni",
//		oBegDt: "",
//		oEndDt: "",
//		oLanDivRcd: "",
//		func: null
//	},
//	{ //데이터관리 부분선언(학위)
//		controlId: "btnFrfDgNm",
//		iCd: "",
//		iNm: "ipbFrfDgNm",
//		iObjDivRcd: ["CC009DG"],
//		iStartObject: "",
//		iOtDivRcd: "",
//		iOtIsTreeView: "",
//		iLanDivRcd: "",
//		iKeyDate: "dipKeyDate",
//		iKeyEndDate: "",
//		oObjDivRcd: "",
//		oCd: "ipbFrfDgCd",
//		oCdNm: "ipbFrfDgNm",
//		oBegDt: "",
//		oEndDt: "",
//		oLanDivRcd: "",
//		func: null
//	}
//];
//
//var moIdsForStdCmnPNatSch = [{
//	controlId: "btnFrfNatNm",
//	iLanDivRcd: "ipbFrfLangKey",
//	iNatNm: "ipbFrfNatNm",
//	oNatCd: "ipbFrfNatCd",
//	oNatNm: "ipbFrfNatNm",
//	func: null
//}];

// Academic Structure\
var moAcademicStructure = {
	// Academic Structure의 서브페이지용 파라미터
	mode: "",
	treeNode: null,
	name: "",
	objType: "",
	objCd: "",
	year: "",
	smt: "",
	keyDate: ""
};

// 탭 정의
var TAB = {
	// 데이터관리
	MANAGE: 1,
	// 이력관리
	HIS: 2,
	// 언어
	LANG: 3,
	//통폐합 관리
	UNI: 4
};

/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad( /* cpr.events.CEvent */ e) {

	// 기준일자 조회하는 내부 팝업 호출을 위한 단위시스템코드 설정  -> udc 속성으로 설정
//	util.Udc.setUdcAppProperty("dipKeyDate", "iUnitSystem", "CMN");
//	util.Udc.setUdcAppProperty("dipKeyDateHistory", "iUnitSystem", "CMN");

	//4. 서브미션 실행 
	util.Submit.send(app, "subOnLoad", function(pbSuccess) {
		if (pbSuccess) {
			// 콤보박스에 선행데이터로 들어가있는 0번째 행("전체")가 선택 됨
			util.SelectCtl.selectItem(app, "cbbDeptDivRcd", 0);
			//컴트롤 초기화
			util.Control.redraw(app, ["cbbDeptDivRcd", "cbbYearList", "cbbSmtList", "cbbYearListHis", "cbbSmtListHis", "cbbLangList", "dipKeyDate"]);
			doOnLoadWithAcademicStructure();
		}
	})
}

/**
 * @desc  doOnLoadWithAcademicStructure  	
 * @return void
 * @author hyunteak 2015. 11. 17.
 */
function doOnLoadWithAcademicStructure() {

	if (util.Dialog.isPopup(app) == false || initValue == null) {
		return;
	}
	//이 페이지가 임포트 되었을때 부모의 값을 가져와서 작업을 해야 함.
	moAcademicStructure = app.getHostProperty("initValue");
	var voParam = moAcademicStructure;

	// Academic Structure 모드가 지정되어 있는 경우에만
	if (voParam.mode) {
		// 화면 위쪽  검색조건이 안보이도록 잘라내기.
		// rtgMain 컨트롤의 시작위치로 맞춤
		//		parent.doCropPageToControl(page, "rtgMain");
		var voGrpActualRect = util.Control.getActualRect("grpManage");
		var vnTop = voGrpActualRect.top;
		var vnLeft = voGrpActualRect.left;
		var vnHeight = voGrpActualRect.height;
		var vnWidth = voGrpActualRect.width;

		vnTop = vnTop.replace(/.[^0-9]/g, '');
		vnLeft = vnLeft.replace(/[^0-9]/g, '');
		vnHeight = vnHeight.replace(/[^0-9]/g, '');
		vnWidth = vnWidth.replace(/[^0-9]/g, '');

		var hostApp = app.getHostAppInstance();
		if (hostApp.hasAppMethod("doCropPageToControl")) {
			hostApp.callAppMethod("doCropPageToControl", [null, vnTop, vnLeft, vnHeight, vnWidth]);
		}

		// 검색조건 세팅
		util.Control.setValue(app, app, "cbbDeptDivRcd", voParam.name);
		util.Control.setValue(app, app, "cbbYearList", voParam.year);
		util.Control.setValue(app, app, "cbbSmtList", voParam.smt);
		util.Control.setValue(app, app, "dipKeyDate", voParam.keyDate);
		
		util.DataMap.setValue(app, "dmReqWithAS", "strAsMode", voParam.mode);
		util.DataMap.setValue(app, "dmReqWithAS", "strObjCd", voParam.objCd);
		//조회
		doSearch("btnSearch");
	}
};

/**
 * doSearch  	조회 버튼 클릭 이벤트
 * @param {String} 	arg
 * @param {Object}	poCallbackFunc
 * @param {String}	psOgCd
 * @return void
 */
function doSearch(arg, poCallbackFunc, psOtCd) {
	// 1. 조회조건 필수체크 : 기준일자
	if (!util.validate(app, "dipKeyDate")) return false;

	var vbSuccess = false;
	var vsfindOtCd = psOtCd;

	//2. 조회 서브미션 호출
	util.Submit.send(app, "subListManage", function(pbSuccess){
		if (pbSuccess) {
			//2.1행정부서목록 리피트 리빌드
			util.Control.redraw(app, "grdManage");
			//notifier가 전역 설정이므로 상관 없이 설정.
			util.Msg.notify(app, "NLS-INF-M024");
			//부서코드가 넘어 오면 로우 포커싱 해줌 이력관리 탭 
			if (ValueUtil.fixNull(vsfindOtCd) != "") {
//				util.Grid.findRowByCondition("grdManage", "OT_CD == " + vsfindOtCd);
				//이력탭 조회
				util.Tab.setSelectedTabItem(app, "tabMain", TAB.HIS);
			} else {
				//데이터관리화면으로 리턴
				util.Tab.setSelectedTabItem(app, "tabMain", TAB.MANAGE);
			}

			// 조회 후 콜백함수 수행
			if (util.isFunc(poCallbackFunc)) poCallBackFunc(pbSuccess);
		}
	});
};

/*
 * 그룹에서 keydown 이벤트 발생 시 호출.
 * 사용자가 키를 누를 때 발생하는 이벤트.
 */
function onGrpSearchKeydown( /* cpr.events.CKeyboardEvent */ e) {
	/** 
	 * @type cpr.controls.Container
	 */
	var grpSearch = e.control;
	if (e.keyCode == cpr.events.KeyCode.ENTER) {
		app.lookup("btnSearch").click();
	}
}

/*
 * "" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnSearchClick( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btnSearch = e.control;
	// 리피트 변경사항체크 
	if (util.Grid.isModified(app, "grdManage", "CRM")) {
		return false;
	}
	var arg = "btnSearch";

	//조회 이벤트 실행
	doSearch(arg);
}

/*
 * 그리드에서 selection-change 이벤트 발생 시 호출.
 * detail의 cell 클릭하여 설정된 selectionunit에 해당되는 단위가 선택될 때 발생하는 이벤트.
 */
function onGrdManageSelectionChange( /* cpr.events.CSelectionEvent */ e) {
	/** 
	 * @type cpr.controls.Grid
	 */
	var grdManage = e.control;
	
	var vnIdx = util.Grid.getIndex(app, "grdManage");
	if(vnIdx == -1){
		return;
	}

	var vsTabId = util.Tab.getSelectedId(app, "tabMain");
	// 선택된 현재 행 상태를 가져와 INSERT/UPDATE/DELETE가 아닐 경우만 탭 조회를 한다.
	var vsRowStatus = util.Grid.getRowState(app, "grdManage");
	if (vsRowStatus == cpr.data.tabledata.RowState.UNCHANGED) {
		doSearchDetail(vsTabId);
	}
}

/*
 * 탭 폴더에서 before-selection-change 이벤트 발생 시 호출.
 * Tab Item을 선택하기 전 발생하는 이벤트. 다음 이벤트로 select 이벤트를 발생합니다.
 */
function onTabMainBeforeSelectionChange( /* cpr.events.CSelectionEvent */ e) {
	/** 
	 * @type cpr.controls.TabFolder
	 */
	var tabMain = e.control;
	var vsSelTabId = e.oldSelection.id

	// 1. 현재 선택된 탭의 상태 체크
	switch (vsSelTabId) {
		// 1-1. 데이터관리
		case TAB.MANAGE:
			{
				if (e.newSelection.id != TAB.MANAGE) {
					// 데이터관리 변경내역 있는 경우
					if (util.Grid.isModified(app, ["grdManage"], "CRM")) {
						// tab 이동 하지 않음
						return false;
					} else {
						//외부부서 목록 변경이 일어난 후 다른탭으로 이동시 프리폼 리셋 처리
						if (util.Grid.isModified(app, ["grdManage"])) {
							//외부부서 목록 리셋
							util.Grid.revertAllData(app, "grdManage");
							//외부부서 기본정보 리셋
							util.Control.redraw(app, "frfManage");
						}
					}
				}
				break;
			}
			// 1-2. 이력관리  버튼 선택
		case TAB.HIS:
			{
				// 이력관리 리피트 변경내역 있는 경우
				if (util.Grid.isModified(app, ["grdHistory"], "CRM")) {
					// tab 이동 하지 않음
					return false;
				} else {
					if (util.Grid.isModified(app, ["grdHistory"])) {
						//이력 목록 리셋
						util.Grid.revertAllData(app, "grdHistory");
					}
				}
				break;
			}
			// 1-3. 언어 버튼 선택
		case TAB.LANG:
			{
				// 언어 리피트 변경내역 있는 경우
				if (util.Grid.isModified(app, ["grdLang"], "CRM")) {
					// tab 이동 하지 않음
					return false;
				} else {
					if (util.Grid.isModified(app, ["grdLang"])) {
						//언어 목록 리셋
						util.Grid.revertAllData(app, "grdLang");
					}
				}
				break;
			}
			// 1-4. 통폐합관리 버튼 선택
		case TAB.UNI:
			{
				// 언어 리피트 변경내역 있는 경우
				if (util.Grid.isModified(app, ["grdUni"], "CRM")) {
					// tab 이동 하지 않음
					return false;
				} else {
					if (util.Grid.isModified(app, ["grdUni"])) {
						//통폐합관리 목록 리셋
						util.Grid.revertAllData(app, "grdUni");
					}
				}
				break;
			}
	}
}

/*
 * 탭 폴더에서 selection-change 이벤트 발생 시 호출.
 * Tab Item을 선택한 후에 발생하는 이벤트.
 */
function onTabMainSelectionChange( /* cpr.events.CSelectionEvent */ e) {
	/** 
	 * @type cpr.controls.TabFolder
	 */
	var tabMain = e.control;
	doSearchDetail(e.newSelection.id);
}

/**
 * 탭변경 또는 메인 그리드에서 selection-change 이벤트가 발생했을 경우 처리 로직 
 * @param {String} psCaseId 탭ID
 * @return void
 */
function doSearchDetail(psCaseId) {
	// 3. 탭변경 후 처리 로직
	switch (psCaseId) {
		// 3-1. 데이터관리 조회
		case TAB.MANAGE:
			{
				//expression binding으로 로직 처리.
				//			doSearchManage();
				break;
			}
			// 3-2. 이력관리 조회
		case TAB.HIS:
			{
				//이력조회
				doSearchHistory(function(pbSuccess) {
					// 조회 : "조회되었습니다." header 메세지 표시
					if (pbSuccess) util.Msg.notify(app, "NLS-INF-M024");
				});
				break;
			}
			// 3-3. 언어 조회
		case TAB.LANG:
			{
				//언어 조회
				doSearchLang(function(pbSuccess) {
					// 조회 : "조회되었습니다." header 메세지 표시
					if (pbSuccess) util.Msg.notify(app, "NLS-INF-M024");
				});
				break;
			}
			// 3-4. 통폐합관리 조회 
		case TAB.UNI:
			{
				//통폐합관리 조회
				doSearchUni(function(pbSuccess) {
					// 조회 : "조회되었습니다." header 메세지 표시
					if (pbSuccess) util.Msg.notify(app, "NLS-INF-M024");
				});
				break;
			}
	}
}

/**
 * @desc 데이터 관리 (프리폼) 내역 조회 - 바인딩으로 로직 처리
 * @return void
 */
//function doSearchManage() {
	//1.행정부서목록 포커싱된 인덱스
//	var vnIndex = ExtRepeat.getIndex("rptManage");
	//2.외부부서코드 활성화여부
//	var vsFlagGbn = ExtRepeat.getValue("rptManage","FLAG_GBN",vnIndex);
//	var vsRowStatus = ExtRepeat.getRowStatusChk("rptManage");
	//신규시만 활성화 ,복사 or 수정시 비 활성화
//	if(vsFlagGbn !="C" &&  vsRowStatus =="insert")
//	{
//		ExtControl.setEnable(true,"ipbFrfOgCd");
//	}else
//	{
//		ExtControl.setEnable(false,"ipbFrfOgCd");
//	}
	//3.리피트 특정 row 데이터를 프리폼 copy
//	ExtRepeat.copyRowForm("rptManage","frfManage", vnIndex);
//}

/**
 * 이력관리 (리피트) 내역 조회
 * @param {Func} poCallBackFunc 콜백 함수
 * @return void
 */
function doSearchHistory(poCallBackFunc) {
	var vsHisDate = util.DataMap.getValue(app, "dmDateHistory", "ST_DT");
	var vsKeyDate = util.DataMap.getValue(app, "dmDateMain", "ST_DT");
	//폐기/복구일자 모두 지워졌을 경우 조회조건 기준일자 셋팅 한다.
	if (vsHisDate == "") {
		util.DataMap.setValue(app, "dmDateHistory", "ST_DT", vsKeyDate);
	}
	util.Control.redraw(app, "dipKeyDateHistory"); //폐기/복구일자 defalut세팅

	var voSelectRowIdx = util.Grid.getIndex(app, "grdManage"); //이력데이터??에서 키값 ??

	var vsOtCd = ""; //부서코드
	var vsLanDivRcd = ""; //언어키

	if (voSelectRowIdx != -1) {
		vsOtCd = util.Grid.getCellValue(app, "grdManage", "OT_CD", voSelectRowIdx); //부서코드
		vsLanDivRcd = util.Grid.getCellValue(app, "grdManage", "LAN_DIV_RCD", voSelectRowIdx); //언어키
	} else { // "라인을 선택하세요." 데이터관리  tab으로 이동
		util.Msg.alert("NLS-INF-M023"); // "라인을 선택하세요." 이전 tab으로 이동
		util.Tab.setSelectedTabItem(app, "tabMain", TAB.MANAGE);
		return;
	}

	//이력관리 조회 전 리퀘스트값 셋팅(행정부서 목록 포커싱된  Row 부서코드,언어코드)
	util.DataMap.setValue(app, "dmReqSelRow", "outCd", vsOtCd);
	util.DataMap.setValue(app, "dmReqSelRow", "lanGbn", vsLanDivRcd);

	//행정부서 이력관리 조회 서브이션 Call
	util.Submit.send(app, "subListHistory", function(pbSuccess) {
		if (pbSuccess) {
			util.Control.redraw(app, ["grdHistory", "dipKeyDateHistory", "cbbYearListHis", "cbbSmtListHis"]);
			// 조회 후 콜백함수 수행
			if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
		}
	});
};

/**
 * 언어 (리피트) 내역 조회
 * @param {Func} poCallBackFunc 콜백 함수
 * @return void
 */
function doSearchLang(poCallBackFunc) {
	var voSelRow = util.Grid.getIndex(app, "grdManage");

	var vsOtCd = ""; //부서코드
	var vsRefKey = ""; //참조키
	var vsLanDivRcd = ""; //언어

	if (voSelRow != -1) {
		vsOtCd = util.Grid.getCellValue(app, "grdManage", "OT_CD", voSelRow); //부서코드
		vsRefKey = util.Grid.getCellValue(app, "grdManage", "REF_KEY", voSelRow); //참조키
	} else { // "라인을 선택하세요." 데이터관리  tab으로 이동
		util.Msg.alert("NLS-INF-M023"); // "라인을 선택하세요." 이전 tab으로 이동
		util.Tab.setSelectedTabItem(app, "tagMain", TAB.MANAGE);
		return;
	}
	//언어 조회 전 리퀘스트값 셋팅(행정부서 목록 포커싱된  Row 부서코드,참조키)
	util.DataMap.setValue(app, "dmReqSelRow", "outCd", vsOtCd);
	util.DataMap.setValue(app, "dmReqSelRow", "refKey", vsRefKey);

	//행정부서 언어 조회 서브이션 Call
	util.Submit.send(app, "subListLang", function(pbSuccess) {
		if (pbSuccess) {
			util.Control.redraw(app, "grdLang");
		}
		// 조회 후 콜백함수 수행
		if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
	});

};

/**
 * 통폐합관리(리피트) 내역 조회
 * @param {Func} poCallBackFunc 콜백 함수
 * @return void
 */
function doSearchUni(poCallbackFunc) {
	var voSelectRowIdx = util.Grid.getIndex(app, "grdManage"); //이력데이터??에서 키값 ??

	var vsOtCd = "";
	var vsLanDivRcd = "";

	if (voSelectRowIdx != -1) {
		vsOtCd = util.Grid.getCellValue(app, "grdManage", "OT_CD", voSelectRowIdx); //부서코드
	} else { // "라인을 선택하세요." 데이터관리  tab으로 이동
		util.Msg.alert("NLS-INF-M023"); // "라인을 선택하세요." 이전 tab으로 이동
		util.Tab.setSelectedTabItem(app, "tagMain", TAB.MANAGE);
		return;
	}
	//통폐합관리 조회 전 리퀘스트값 셋팅(행정부서 목록 포커싱된  Row 부서코드)
	util.DataMap.setValue(app, "dmReqSelRow", "outCd", vsOtCd);

	//행정부서 통폐합관리 조회 서브이션 Call
	util.Submit.send(app, "subListUni", function(pbSuccess) {
		if (pbSuccess) {
			util.Control.redraw(app, "grdUni");
		}
		// 조회 후 콜백함수 수행
		if (util.isFunc(poCallbackFunc)) poCallbackFunc(pbSuccess);
	});

};

/*
 * "" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnCopyClick( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btnCopy = e.control;
	
	var vnOrgRow = util.Grid.getIndex(app, "grdManage"); //선택한 RowIndex
	var vnRow = ""; //복사할 대상 신규 RowIndex
	var vsKeyDt = util.Control.getValue(app, "dipKeyDate");
	
	if (vnOrgRow == -1) {
		util.Msg.alert("NLS-INF-M023"); // "라인을 선택하세요."	
		return;
	}

	vnRow = doInsert();

	//1.복사 및 행정부서 목록 refresh
//util.Grid.copyToGridData(app, 소스그리드ID, 타겟그리드ID, 소스행인덱스, 타겟행인덱스)로 변경 필요...
	util.Grid.copyToRowData("grdManage", vnOrgRow, "grdManage", vnRow);

	// 2.copy된 row에 flag_gbn 설정
	util.Grid.setCellValue(app, "grdManage", "FLAG_GBN", "C", vnRow);
	//3. 시작일자(조회조건 시작일자) 종료일자(99991231) 으로 변경.
	util.Grid.setCellValue(app, "grdManage", "ST_DT", vsKeyDt, vnRow);
	util.Grid.setCellValue(app, "grdManage", "END_DT", "99991231000000", vnRow);
	util.Grid.setCellValue(app, "grdManage", "REF_KEY", "", vnRow);
}

/*
 * 사용자 정의 컨트롤에서 insert 이벤트 발생 시 호출.
 */
function onBtnsManageInsert( /* cpr.event.CUIEvent */ e) {
	/** 
	 * @type udc.com.grid_IDS_Btn
	 */
	var btnsManage = e.control;
	doInsert();
}

/**
 * 리피트 데이터관리 신규버튼 클릭 이벤트
 * @return void
 */
function doInsert() {
	var vsCbbLangList = util.Control.getValue(app, "cbbLangList"); //onLoad시 리턴 받은 언어키
	var vsDivRcd = util.Control.getValue(app, "cbbDeptDivRcd"); //조회조건 부서구분
	var vsBaseDate = util.Control.getValue(app, "dipKeyDate"); //조회조건 기준일자
	
	var vnInsIdx = util.Grid.insertRow(app, "grdManage"); //행정부서 추가 Row

	util.Grid.setCellValue(app, "grdManage", "ST_DT", vsBaseDate); //시작일자
	util.Grid.setCellValue(app, "grdManage", "END_DT", "99991231000000"); //종료일자
	util.Grid.setCellValue(app, "grdManage", "OBJ_DIV_RCD", "CC009OG"); //객체구분코드
	util.Grid.setCellValue(app, "grdManage", "OG_DIV_RCD", vsDivRcd); //부서구분
	util.Grid.setCellValue(app, "grdManage", "LAN_DIV_RCD", vsCbbLangList); //언어키
	util.Grid.setCellValue(app, "grdManage", "DMN_LAN_DIV_RCD", util.getSystemLocale(app)); //부서도메인언어키
	util.Grid.setCellValue(app, "grdManage", "FLAG_GBN", "N"); //저장 구분자값

	// 프리폼의 학번입력에 포커스
	util.Control.setFocus(app, "ipbFrfOgCd");
	return vnInsIdx;

}

/*
 * 사용자 정의 컨트롤에서 save 이벤트 발생 시 호출.
 */
function onBtnsManageSave( /* cpr.event.CUIEvent */ e) {
	/** 
	 * @type udc.com.grid_IDS_Btn
	 */
	var btnsManage = e.control;
	doSaveBtnClick();
}

/**
 * doSave  저장 버튼 클릭 이벤트  이벤트 
 * @return doSave
 */
function doSaveBtnClick() {
	var vnSelectedIdx = util.Tab.getSelectedId(app, "tabMain");
	doSave(vnSelectedIdx);
}

/**
 * 저장 함수
 * @param {String} paTabpageId    탭ID
 * @param {Func} poCallbackFunc 콜백함수
 * @return void
 */
function doSave(paTabpageId, poCallbackFunc) {
	var vbValidSave = true;
	//변경여부체크
	if (doCheckValidation(paTabpageId) == false) return false;

	//언어
	if (paTabpageId == TAB.LANG) {
		util.Submit.send(app, "subSaveLang", function(pbSuccess) {
			if (pbSuccess) {
				flg = "Y";
				doSaveWithAcademicStructure();
				util.Msg.notify(app, "NLS-INF-M001");
				//언어 조회
				doSearchLang(function(pbSuccess) {
					// 조회 : "조회되었습니다." header 메세지 표시
					if (pbSuccess) util.Msg.notify(app, "NLS-INF-M024");
				});
			} else {
				util.Msg.notify(app, "NLS-WRN-M119");
			}
		});
	//데이터관리 프리폼   
	} else if (paTabpageId == TAB.MANAGE) {
		util.Submit.send(app, "subSaveManage", function(pbSuccess) {
			if (pbSuccess) {
				flg = "Y";
				doSaveWithAcademicStructure();
				util.Msg.notify(app, "NLS-INF-M001");
				//저장 성공하면 기본정보 프리폼 초기화 후 조회 
				//조회건수가 0건이면 프리폼이 내역이 반영되지 않기 떄문
				doSearch(null, poCallbackFunc);
			} else {
				util.Msg.notify(app, "NLS-WRN-M119");
			}
		});
	//데이터이력 	
	} else if (paTabpageId == TAB.HIS) {
		util.Submit.send(app, "subSaveHistory", function(pbSuccess) {
			if (pbSuccess) {
				flg = "Y";
				util.Grid.setFindRowCondition(app, "grdManage", "OT_CD == " + "'" + util.Grid.getCellValue(app, "grdManage", "OT_CD") + "'");
				doSaveWithAcademicStructure();
				util.Msg.notify(app, "NLS-INF-M001");
				//이력조회
				doSearchHistory(function(pbSuccess) {
					// 조회 : "조회되었습니다." header 메세지 표시
					if (pbSuccess) {
						//저장후 기본정보 텝으로 이동
						var vsOtCd = util.DataMap.getValue(app, "dmReqSelRow", "outCd");
						doSearch(null, poCallbackFunc, vsOtCd);
					}
				});

			} else {
				util.Msg.notify(app, "NLS-WRN-M119");
			}
		})
		//통폐합관리	
	} else if (paTabpageId == TAB.UNI) {
		util.Submit.send(app, "subSaveUni", function(pbSuccess) {
			if (pbSuccess) {
				flg = "Y";
				doSaveWithAcademicStructure();
				util.Msg.notify(app, "NLS-INF-M001");

				//통폐합관리 조회
				doSearchUni(function(pbSuccess) {
					// 조회 : "조회되었습니다." header 메세지 표시
					if (pbSuccess) util.Msg.notify(app, "NLS-INF-M024");
				});
			} else {
				util.Msg.notify(app, "NLS-WRN-M119");
			}

		});
	}
}

/**
 * 저장 함수 변경여부체크
 * @paTabpage        TabPageId
 * @return void
 */
function doCheckValidation(tabpageId) {
	var vsGrxId;
	switch (tabpageId) {
		// 1-1. 데이터관리
		case TAB.MANAGE:
			{
				vsGrxId = "grdManage";
				break;
			}
			// 1-2. 이력관리 
		case TAB.HIS:
			{
				vsGrxId = "grdHistory";
				break;
			}
			// 1-3. 언어 버튼 선택
		case TAB.LANG:
			{
				vsGrxId = "grdLang";
				break;
			}
			// 1-4. 통폐합관리
		case TAB.UNI:
			{
				vsGrxId = "grdUni";
				break;
			}
		default:
			{
				vsGrxId = "grdManage";
				break;
			}
	}

	if (!util.Grid.isModified(app, vsGrxId, "MSG")) {
		//"변경된 데이터가 없습니다." header 메세지 표시
		util.Msg.notify(app, "NLS-INF-M026")
		return false;
	}

	return util.validate(app, vsGrxId);
}

/**
 * doSaveWithAcademicStructure  	
 * @return void
 */
function doSaveWithAcademicStructure() {
	var voParam = moAcademicStructure;

	if (voParam.mode) {
		var hostApp = app.getHostAppInstance();
		hostApp.callAppMethod("callbackAcademicStructureSubPageSave");
	}
};

/*
 * "" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnNew3Click( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btnNew3 = e.control;
	// 9999레코드를  조회조건의 학기의 (시작일자 - 1초) 로 업데이트 = 해당학기까지 유효한 데이타
	var vsEndDt = null;
	var vsStDt = null;
	var vnCntHistory = util.Grid.getRowCount(app, "grdHistory");
	var vnMaxEndDt = null;
	var voRowHis = null;
	var voRowMax = null;
	//폐기/복구일자 유효성 체크
	if(!util.validate(app, "dipKeyDateHistory")) return false;

	//마지막일 검색
	for (var i = 0; i < vnCntHistory; i++) {
		voRowHis = i;
		
		//빌더5에서 주석처리 되어 있음
//		vsEndDt = ExtRepeat.getValue("rptHistory","END_DT",voRowHis); 
//		if ((vnMaxEndDt == null) || (vnMaxEndDt != null && vnMaxEndDt < vsEndDt)) {
//			vnMaxEndDt = vsEndDt;
//			voRowMax = voRowHis;
//		}

		// 2016. 09. 08 박갑수 9999-12-31이 아닐경우 폐기 불가하도록 수정
		vsEndDt = util.Grid.getCellValue(app, "grdHistory", "END_DT", voRowHis);
		vsEndDt = new String(vsEndDt).substring(0, 8);
		
		if (vsEndDt == "99991231") {
			vnMaxEndDt = vsEndDt;
			voRowMax = voRowHis;
			break;
		}
	}
	if (ValueUtil.isNull(voRowMax)) {
		// 폐기 가능한 데이터가 없습니다.
		util.Msg.alert("NLS-INF-M029");
		return;
	}
	//셋팅된 로우의 종료일자
	vsEndDt = util.Grid.getCellValue(app, "grdHistory", "END_DT", voRowMax);
	vsEndDt = new String(vsEndDt).substring(0, 8);
	//셋팅된 로우의 시작일자
	vsStDt = util.Grid.getCellValue(app, "grdHistory", "ST_DT", voRowMax);
	var vsKeyDt = null;
	vsKeyDt = util.Control.getValue(app, "dipKeyDateHistory");
	vsKeyDt = new String(vsKeyDt).substring(0, 8);
	//종료일자가 99991231이 아니거나 폐기기준일자보다 시작일자가 더 클경우
	//'기준일자를 시작일자 이후로 선택하세요' 메시지 출력
	if (vsEndDt != "99991231" || vsStDt >= vsKeyDt) {
		// 폐기 가능한 데이터가 없습니다.
		util.Msg.alert("NLS-INF-M029");
		return;
	}

	var vsBefDate = null;
	//폐기일자 지정
	vsBefDate = getBefDate(vsKeyDt);

	var vsMsgCiiDate = vsBefDate.substring(0, 4) + util.Msg.getMsg("NLS-SCR-YEAR") + vsBefDate.substring(4, 6) 
						+ util.Msg.getMsg("NLS-SCR-MONTH") + vsBefDate.substring(6, 8) + util.Msg.getMsg("NLS-SCR-DAY");

	//폐기여부 확인 메시지
	if (util.Msg.confirm("NLS-CRM-M047", [vsMsgCiiDate]) == 1) {
		util.Grid.setCellValue(app, "grdHistory", "END_DT", vsBefDate, voRowMax);
		util.Grid.selectRow(app, "grdHistory", voRowMax);
		//폐기 저장
		doSaveBtnClick();
	}
}

/**
 * getBefDate  keyDate 기준일 이전날짜 추출 
 * @return rtnBefDt(기준일 이전날짜 추출 )
 */
function getBefDate(keyDate) {

	var y = keyDate.substring(0, 4);
	var m = keyDate.substring(4, 6);
	var d = keyDate.substring(6, 8);
	var befDt = new Date(y, m - 1, d - 1);
	var befDtYear = befDt.getFullYear().toString(); // 2012.02.29 크롬에서도 정상적으로 작동되도록 수정함. 윤경희
	var befDtMonth = eval(befDt.getMonth() + 1).toString();
	var befDtDate = befDt.getDate().toString();

	if (befDtMonth.length == 1) befDtMonth = "0" + befDtMonth;
	if (befDtDate.length == 1) befDtDate = "0" + befDtDate;

	var rtnBefDt = befDtYear + befDtMonth + befDtDate + "000000";

	return rtnBefDt;
};

/*
 * "" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnNew4Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnNew4 = e.control;
	var vnCntHistory = util.Grid.getRowCount(app, "grdHistory");

	var vnMaxEndDt = null;
	var voRowHis = null;
	var voRowMax = null;
	var vsEndDt = null;
	//폐기/복구일자 유효성 체크
	if(!util.validate(app, "dipKeyDateHistory")) return false;

	for (var i = 0; i < vnCntHistory; i++) {
		voRowHis = i;
		vsEndDt = util.Grid.getCellValue(app, "grdHistory", "END_DT", voRowHis);
		//마지막일자 가 셋팅 되지 않았거나 마지막일이 셋팅 되있어도 현재 체크하는 행의 종료일자보다 작은경우 
		//마지막일자 와 행 셋팅
		if ((vnMaxEndDt == null) || (vnMaxEndDt != null && vnMaxEndDt < vsEndDt)) {
			vnMaxEndDt = vsEndDt;
			voRowMax = voRowHis;
		}
	}

	//종료일자가 99991231 혹은 99991231000000 이면 
	//'기준일자를 시작일자 이후로 선택하세요' 메시지 출력
	if (vnMaxEndDt == "99991231" || vnMaxEndDt == "99991231000000") {
		// 폐기취소 가능한 데이터가 없습니다.
		util.Msg.alert("NLS-INF-M030");
		return;
	}
	if (util.Msg.confirm("NLS-CRM-M048") == 1) {
		util.Grid.setCellValue(app, "grdHistory", "END_DT", "99991231", voRowMax);
		util.Grid.selectRow(app, "grdHistory", voRowMax);

		doSaveBtnClick();
	}
}


/*
 * "" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnDel2Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnDel2 = e.control;
	// 요약: 가장 최근의 레코드를 카피하여 insert한다. (단, 기준일자가 최종일자보다 커야 한다.)
	var vnCnt = util.Grid.getRowCount(app, "grdHistory");
	
	var vnMaxEndDt = null;
	var voRow = null;
	var voMaxRow = null;
	var vnMaxRowNum = null;

	//폐기/복구일자 유효성 체크
	if(!util.validate(app, "dipKeyDateHistory")) return false;

	for (var i = 0; i < vnCnt; i++) {
		voRow = i;
//		if (!voRow) continue;

		var vsEndDt = util.Grid.getCellValue(app, "grdHistory", "END_DT", voRow);
		if (i == 0 || vnMaxEndDt < vsEndDt) {
			vnMaxEndDt = vsEndDt;
			voMaxRow = voRow;
			vnMaxRowNum = i;
		}
	}

	// key date
	var vsHistoryKeyDate = util.Control.getValue(app, "dipKeyDateHistory");

	if (vnMaxEndDt >= vsHistoryKeyDate) {
		// 복구 가능한 DATA가 없습니다.
		util.Msg.alert("NLS-WRN-M128");
		return;
	}
	vsHistoryKeyDate = new String(vsHistoryKeyDate);
	var vsMsgCiiDate = vsHistoryKeyDate.substring(0, 4) + util.Msg.getMsg("NLS-SCR-YEAR")  + vsHistoryKeyDate.substring(4, 6)
						 + util.Msg.getMsg("NLS-SCR-MONTH")  + vsHistoryKeyDate.substring(6, 8) + util.Msg.getMsg("NLS-SCR-DAY") ; //다국어설정

	if (util.Msg.confirm("NLS-CRM-M049", [vsMsgCiiDate]) == 1) {

		vnMaxRowNum = util.Grid.getIndex(app, "grdHistory");
		var voNextRow = util.Grid.insertRow(app, "grdHistory");

//util.Grid.copyToGridData(app, 소스그리드ID, 타겟그리드ID, 소스행인덱스, 타겟행인덱스)로 변경 필요...
		util.Grid.copyToRowData("grdHistory", vnMaxRowNum, "grdHistory", voNextRow);

		util.Grid.setCellValue(app, "grdHistory", "REF_KEY", "", voNextRow);
		util.Grid.setCellValue(app, "grdHistory", "ST_DT", vsHistoryKeyDate, voNextRow);
		util.Grid.setCellValue(app, "grdHistory", "END_DT", "99991231", voNextRow);
		//복구내역 저장
		doSaveBtnClick();
	}
}


/*
 * 사용자 정의 컨트롤에서 insert 이벤트 발생 시 호출.
 */
function onGrid_ids_btn2Insert(/* cpr.event.CUIEvent */ e){
	/** 
	 * @type udc.com.grid_IDS_Btn
	 */
	var grid_ids_btn2 = e.control;
	var vsUpRefKey = util.DataMap.getValue(app, "dmReqSelRow", "refKey");
	var vsUpOgCd = util.DataMap.getValue(app, "dmReqSelRow", "outCd");
	util.Grid.setCellValue(app, "grdLang","REF_KEY",vsUpRefKey);
	util.Grid.setCellValue(app, "grdLang","OT_CD",vsUpOgCd);
}

/*
 * 사용자 정의 컨트롤에서 idrCommonEvent 이벤트 발생 시 호출.
 */
function onBtnsManageIdrCommonEvent(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type udc.com.grid_IDS_Btn
	 */
	var btnsManage = e.control;
	util.Control.redraw(app, "frfManage");
}


/*
 * 사용자 정의 컨트롤에서 delete 이벤트 발생 시 호출.
 */
function onBtnsLangDelete(/* cpr.event.CUIEvent */ e){
	/** 
	 * @type udc.com.grid_IDS_Btn
	 */
	var btnsLang = e.control;
	var voRowLang =util.Grid.getIndex(app, "grdLang");
						
	if (ValueUtil.isNull(voRowLang)) {
		util.Msg.alert("NLS-WRN-M008");
		return;
	}
	
	var vsLang =util.Grid.getCellValue(app, "grdLang","LAN_DIV_RCD",voRowLang);
	
	if (vsLang == util.Control.getValue(app, "cbbLangList")) {
		//변경 된 RowState 복구
		util.Grid.revertRowData(app, "grdLang");
		util.Msg.alert("NLS-WRN-M010");
		return;
	}
	
	util.Grid.deleteRow(app, "grdLang");
}


/*
 * 사용자 정의 컨트롤에서 save 이벤트 발생 시 호출.
 */
function onBtnsLangSave(/* cpr.event.CUIEvent */ e){
	/** 
	 * @type udc.com.grid_IDS_Btn
	 */
	var btnsLang = e.control;
	doSaveBtnClick();
}


/*
 * 사용자 정의 컨트롤에서 insert 이벤트 발생 시 호출.
 */
function onBtnsUniInsert(/* cpr.event.CUIEvent */ e){
	/** 
	 * @type udc.com.grid_IDS_Btn
	 */
	var btnsUni = e.control;
	var vsUpOtCd = util.DataMap.getValue(app, "dmReqSelRow","outCd");
	util.Grid.setCellValue(app, "grdUni","ORI_OBJ_CD",vsUpOtCd);
	util.Grid.setCellValue(app, "grdUni","ORI_OBJ_DIV_RCD","CC009OG");
	
	util.Control.setFocus(app, "gdIpbOriObjDetailUni");
}


/*
 * 사용자 정의 컨트롤에서 restore 이벤트 발생 시 호출.
 */
function onBtnsUniRestore(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type udc.com.grid_IDS_Btn
	 */
	var btnsUni = e.control;
	doSaveBtnClick();	
}
