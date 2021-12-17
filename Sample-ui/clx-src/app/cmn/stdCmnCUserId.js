var util = new ComUtil(app);
var TAB = {
			USER : 1,
			DEPT : 2
			};
//var msPkValues = "";
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
//var moIdsForStdCmnPObjSch=  [
//{
//	controlId			:	"btnFrfAsgnDeptNm",
//	iCd				:	"",
//	iNm				:	"ipbFrfAsgnDeptNm",
//	iObjDivRcd		:	["CC009OG", "CC009SA"],
//	iStartObject    	:   "",
//	iOtDivRcd		:	"",
//	iOtIsTreeView	:	"",
//	iLanDivRcd		:	"",
//	iKeyDate			:	"19000101", // 모든기간의 부서를 찾기위해 변경 2017.01.06 (변경전 값:"/root/resOnLoad/strCurDt")
//	iKeyEndDate	:	"99991231", // 모든기간의 부서를 찾기위해 변경 2017.01.06 (변경전 값:"")
//	oObjDivRcd	:	"optFrfAsgnDeptDivRcd",
//	oCd				:	"optFrfAsgnDeptCd",
//	oCdNm			:	"ipbFrfAsgnDeptNm",
//	oBegDt			:	"",
//	oEndDt			:	"",
//	oLanDivRcd	:	"",
//	func 				: null
//},
//{
//	controlId			:	"rdBtnStruAuthDeptNm",
//	iCd				:	"",
//	iNm				:	"rdIpbStruAuthDeptNm",
//	iObjDivRcd		:	["CC009OG", "CC009SA"],
//	iStartObject    	:   "",
//	iOtDivRcd		:	"",
//	iOtIsTreeView	:	"",
//	iLanDivRcd		:	"",
//	iKeyDate			:	"19000101", // 모든기간의 부서를 찾기위해 변경 2017.01.06 (변경전 값:"/root/resOnLoad/strCurDt")
//	iKeyEndDate	:	"99991231", // 모든기간의 부서를 찾기위해 변경 2017.01.06 (변경전 값:"")
//	oObjDivRcd	:	"rdOptStruAuthObjDivRcd",
//	oCd				:	"rdOptStruAuthDeptCd",
//	oCdNm			:	"rdIpbStruAuthDeptNm",
//	oBegDt			:	"",
//	oEndDt			:	"",
//	oLanDivRcd	:	"",
//	func				:	null
//}];

/******************************************************************************************************
 * 외부인검색팝업 관련 설정사항 
 * 각 변수별 설명
 *  iXXX : 팝업으로 input 전달될 파라미터
 *  oXXX : 팝업에서 선택한 값을 받을 컬럼 아이디
 *  [IN]
 *   1. controlId        : 최초 이벤트의 버튼이나 리피트 id
 *   2. iUserId          : 사용자ID 
 *   3. iUserNm        : 사용자명
 *  [OUT]
 *   4. oOtsId     : 외부인ID
 *   5. oSsn            : 사회보장번호
 *   6. oKorNm        : 한글명
 *   7. oEngNm        : 영문명
 *   8. oChaNm        : 한자명
 *   9. oGenderRcd   : 성별코드
 *  10. oBirthDay      : 생년월일
 *  11. oLnrSlrDivRcd : 음양력코드
 *  12. oEmail          : 이메일
 *  13. oClpNo         : 휴대전화번호
 *  14. oZipCode      : 우편번호코드
 *  15. oZipSeq        : 우편일련번호 
 *  16. oAddr1         : 주소1
 *  17. oAddr2         : 주소2
 *  18. oHomeTelNo  : 자택전화번호 
 *  19. oNatRcd        : 국가코드 
 *  20. func              : 팝업에서 선택한 값을 받은 후 추가 로직이 필요한 경우 함수 작성
 *
 * @member moStdCmnPOuterUserSch
 * @type Array
 * @author Kim Bora
*******************************************************************************************************/	
// var moIdsForStdCmnPOuterUserSch = [{ 
//	 controlId  	: "btnFrfPartyId",
//	 iUserId		: "ipbFrfPartyId", 	    //사용자ID 
//	 iUserNm		: "",	                       //사용자명
//	  
//	 oOtsId	: 		"ipbFrfPartyId",
//	 oSsn		    : "",
//	 oKorNm		: "",
//	 oEngNm 		: "",
//	 oChaNm		: "",
//	 oGenderRcd	: "",
//	 oBirthDay		: "",
//	 oLnrSlrDivRcd : "",
//	 oEmail		: "",
//	 oClpNo	: "",
//	 oZipCode	: "",
//	 oZipSeq	: "",
//	 oAddr1		: "",
//	 oAddr2		: "",
//	 oHomeTelNo : "",
//	 oNatRcd		: "",
//	 
//	 func : null
// }];

/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	//리피트 초기 설정
//	ExtRepeat.init(["rptCmnUseUser","rptCmnStruAuth","rptCmnStruAuthOper","rptNonCmnStruAuthOper","frfCmnUseUser"]);
	
	//DataSet Info 설정 및 IgnoreReqPk = Y 설정.
//	ExtRepeat.addOriginCol("rptCmnUseUser", ["SSN","PWD","TMP_PWD"]);
	
	//첫번째 탭으로 로딩 -> 탭 아이템의 설정 중  selectable 속성으로 지정 가능.
//	util.Tab.setSelectedTabItem("tabMst", 1);
	
	//서브미션 실행 (실패시 cover page)
	util.Submit.send(app, "subOnLoad", function(pbSuccess){
		if(pbSuccess) {
			//util.SelectCtl.selectItem("cbbUserDivRcd", 0);
			// 사용자구분 콤보박스 rebuild
			util.Control.redraw(app, ["cbbUserDivRcd"]);
			
			// 프리폼의 내용은 상대컬럼 바인딩으로 인해 자동으로 redraw();
//			ExtRepeat.refresh("frfCmnUseUser");
			
			// 사용자 ID 컨트롤 포커스
			util.Control.setFocus(app, "ipbUserId");
			
			// 관리자인 경우 사용자목록의 로그인버튼 가능하도록 처리
			var vsSystemMgrYn = util.Auth.getUserInfo(app, "SYSTEM_MGR_YN");
			if(vsSystemMgrYn == "Y") {
				util.Control.setVisible(app, true, ["btnFrfLogin"]);
			}else {
				util.Control.setVisible(app, false, ["btnFrfLogin"]);
			};
		};
	}, true);
}

/*
 * 사용자 정의 컨트롤에서 search 이벤트 발생 시 호출.
 */
function onBtnSearchSearch(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type udc.com.btnSearch
	 */
	var vcBtnSearch = e.control;
	
	// 1. 리피트 변경사항 체크 
	if(util.Grid.isModified(app, ["grdCmnUseUser","grdCmnStruAuth","grdCmnStruAuthOper","grdNonCmnStruAuthOper"], "CRM")) {
		return false;
	};
	
	// 2. 조회조건 필수 체크 : 사용자ID, 사용자명 중 하나는 필수
	var vsUserID = util.Control.getValue(app, "ipbUserId");
	var vsUSerNm = util.Control.getValue(app, "ipbUserNm");
	
	if( ValueUtil.isNull(vsUserID) && ValueUtil.isNull(vsUSerNm) ) {
		//조회조건[@] 중 하나는 반드시 입력해야 합니다.
		util.Msg.alert("NLS-CMM-M016", ["사용자ID, 사용자명"]);
		return false;
	}
	
	// 3. 선택된 탭 체크하여 첫번째 탭이 아닐 경우 첫번째 탭 선택한다.
	util.Tab.setSelectedTabItem(app, "tabMst", TAB.USER);
	
	// 4. 조회한다.
	doList(function(pbSuccess) {
		if (pbSuccess){
			util.Msg.notify(app, "NLS-INF-M024");
		}
	});
}

/**
 * doList 사용자목록을 조회한다.  
 * @param {Function} poCallBackFunc 콜백정의
 * @return void
 */
function doList(poCallBackFunc) {
	util.Submit.send(app, "subList", function(pbSuccess){
		if(pbSuccess) {
			util.Control.redraw(app, ["grdCmnUseUser", "grpCmnUseUser"]);
			
			// 데이터 내역이 없을 경우 프리폼 리셋처리
			var vnCnt = util.Grid.getRowCount(app, "grdCmnUseUser");
			if(vnCnt == 0) {
				util.Control.setEnable(app, false, ["grpCmnUseUser"]);
			};
			
			//조회 후 콜백 함수 수행
			if(util.isFunc(poCallBackFunc)){			
				poCallBackFunc(pbSuccess);
			}
		};
	});
};

/**
 * doListDept(사용자지정부서목록을 조회한다.)  
 * @param {Function} poCallBackFunc 콜백정의
 * @return void
 */
function doListDept(poCallBackFunc) {
	util.Submit.send(app, "subListDept", function(pbSuccess){
		if(pbSuccess) {
			util.Control.redraw(app, ["grdCmnStruAuth"]);
			
			//마스터에 데이터가 없을 경우 디테일 입력 불가
			var vnCnt = util.Grid.getRowCount(app, "grdCmnStruAuth");
			if(vnCnt < 1) {
				util.Control.setEnable(app, false, ["btnUp","btnDown"]);
				util.Control.reset(app, app, ["grdCmnStruAuthOper","grdNonCmnStruAuthOper"]);
			}else{
				// 마스터(사용자지정부서) 리피터 상태에따른 버튼 제어
				doGrdStruAuthStatus();
			};
			
//			// PK컬럼값이 있는 경우 해당 값으로 포커스찾기
//			if(ValueUtil.fixNull(msPkValues) != ""){
//				util.Grid.findRowByCondition("grdCmnStruAuth", msPkValues);
//			}
			
			// 조회 후 콜백함수 수행
			if(util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
		};
	});
}

/*
 * 그리드에서 selection-change 이벤트 발생 시 호출.
 * detail의 cell 클릭하여 설정된 selectionunit에 해당되는 단위가 선택될 때 발생하는 이벤트.
 */
function onGrdCmnUseUserSelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grdCmnUseUser = e.control;
//	var vnIdx  = util.Grid.getIndex("grdCmnUseUser");//Grid 의 현재 선택 Index
//	var vsUtpStatus = util.Grid.getRowState("grdCmnUseUser", vnIdx); //행의 상태값
	
	/* 
	 * 신규행일 시 사용자 ID enabled를 true 나머지는 false
	 */

	
//	if(vsUtpStatus == cpr.data.tabledata.RowState.INSERTED) {
//		util.Control.setEnable(true, "ipbFrfUserId");
//	}else{
//		util.Control.setEnable(false, "ipbFrfUserId");
//	};

	//리피트 특정 row 데이터를 프리폼 copy -> grid와 바인딩 되어 있으므로 생략.
//	ExtRepeat.copyRowForm("rptCmnUseUser", "frfCmnUseUser", vnIndex);
};

/**
 * [사용자목록] 작업저장 click event 
 * @param {Function} poCallBackFunc 콜백정의
 * @return void
 */
function doSave(poCallBackFunc) {
	// 그리드 변경사항 체크 
	if(!util.Grid.isModified(app, "grdCmnUseUser", "MSG")) return false;
	
	//그리드 validation check  
	if(!util.validate(app, "grdCmnUseUser")) return false;
	
	//(곽팀장님요청) 학생일 경우 소속부서가 없을 경우가 존재하여 
	//화면에서 소속부서 필수값체크를 제외하고 서버에서 학생이 아닌경우 소속부서 필수값 체크하도록 변경
	//2017.01.09
	util.Submit.send(app,  "subSave", function(pbSuccess){
		if(pbSuccess) {
			doList(function(pbListSuccess){
				if(pbListSuccess) {
//					// 갱신된 데이터가 조회되었습니다.
					util.Msg.notify(app, "NLS-INF-M025");
				};
				
				if(util.isFunc(poCallBackFunc)) {
					poCallBackFunc(pbListSuccess);
				};
			});
		};
	});
		
}

/**
 * [사용자지정부서] 정보 작업저장 click event 
 * @param {Function} poCallBackFunc 콜백정의
 * @return void
 */
function doSaveDept(poSaveCallBackFunc) {
	// 그리드 변경사항 체크(사용자 지정부서 및 사용 지정부서별 업무역할)
	if( !util.Grid.isModified(app, "grdCmnStruAuth") && !util.Grid.isModified(app, "grdCmnStruAuthOper")) {
		util.Msg.notify(app, "NLS-WRN-M007");
		return false;
	};
	
	//그리드 필수항목 체크
	if(!util.validate(app, "grdCmnStruAuth")) return false;
	
	util.Submit.send(app, "subSaveDept", function(pbSuccess){
		if(pbSuccess) {
			
			doListDept(function(pbListSuccess){
				// 저장 : "갱신된 데이터가 조회되었습니다." header 메세지 표시
				if(pbListSuccess) {
					// 사용, 미사용 지정부서별 업무역할 리피트 clear처리 
					util.Control.redraw(app, ["grdCmnStruAuthOper","grdNonCmnStruAuthOper"]);
					
					/* 갱신된 데이터가 조회되었습니다. */
					util.Msg.notify(app, "NLS-INF-M025");
				};
				
				if( util.isFunc(poSaveCallBackFunc) ) {
					poSaveCallBackFunc(pbListSuccess);
				};
			});
		};
	});
};

/**
 * doSaveOper 사용, 미사용 지정부서 저장
 * @param {Function} poCallBackFunc 콜백정의
 * @return void
 */
function doSaveOper() {
	// 그리드 변경사항 체크(사용자 지정부서 및 사용 지정부서별 업무역할)
	if( !util.Grid.isModified(app, "grdCmnStruAuth") && !util.Grid.isModified(app, "grdCmnStruAuthOper")) {
		util.Msg.notify(app, "NLS-WRN-M007");
		return false;
	};
	
	//그리드 필수항목 체크
	if(!util.validate(app, "grdCmnStruAuthOper")) return false;
	
	util.Submit.send(app, "subSaveDept", function(pbSuccess){
		if(pbSuccess) {
			doListCmnStruAuthOper();
		};
	}, false);
}

/**
 * doListCmnStruAuthOper(사용자지정부서에서 선택된 행을 통해 지정부서별업무역할을 조회한다.)  
 * @param {Function} poCallBackFunc 콜백정의
 * @return void
 */
function doListCmnStruAuthOper(poCallBackFunc) {
	if( util.Grid.getRowState(app, "grdCmnStruAuth")  == cpr.data.tabledata.RowState.INSERTED) {
		util.Control.reset(app, app, ["grdCmnStruAuthOper", "grdNonCmnStruAuthOper"]);
		return false;
	};
	
	// 선택된 사용자지정부서목록의 값을 조회조건으로 인스턴스set
	var vsUserId = util.Grid.getCellValue(app, "grdCmnStruAuth", "USER_ID");
	var vsDeptCd = util.Grid.getCellValue(app, "grdCmnStruAuth", "DEPT_CD");
	var vsDeptObjDivRcd = util.Grid.getCellValue(app, "grdCmnStruAuth", "OBJ_DIV_RCD");

	util.DataMap.setValue(app, "dmReqKeyStruAuthOper", "strUserId", vsUserId);
	util.DataMap.setValue(app, "dmReqKeyStruAuthOper", "strDeptCd", vsDeptCd);
	util.DataMap.setValue(app, "dmReqKeyStruAuthOper", "strObjDivRcd", vsDeptObjDivRcd);
	
	
	/* 사용, 미사용 업무역할 조회 서브미션 */
	util.Submit.send(app, "subListStruAuthOper", function(pbSuccess){
		if(pbSuccess) {
			util.Control.redraw(app, ["grdCmnStruAuthOper", "grdNonCmnStruAuthOper"]);
			
			doGrdStruAuthStatus();
//			msPkValues = util.Grid.getPKColRowValues("grdCmnStruAuth");
			// 조회 후 콜백함수 수행
			if(util.isFunc(poCallBackFunc)) {
				poCallBackFunc(pbSuccess);
			};
		};
	}, true);
}

/**
 * @desc  [미사용 지정부서별 업무역할] -> [사용지정부서별 업무역할] move 함수
 * @return void
 * @author 최동원 2018. 04. 03.
 */
function moveRoleUp() {
//	var vsNonSelIdx = util.Grid.getChkRowOrSelRowIdx("grdNonCmnStruAuthOper");
	var vaNonSelIdx = util.Grid.getCheckOrSelectedRowIndex(app, "grdNonCmnStruAuthOper");
	
//	var vcAuthGrid	 = app.lookup("grdCmnStruAuth");
//	var vcUseGrid	 = app.lookup("grdCmnStruAuthOper");
//	var vcNonUseGrid = app.lookup("grdNonCmnStruAuthOper");
	
	var vsNonCmnStruAuthOperRptNm	= util.Grid.getTitle(app, "grdNonCmnStruAuthOper");
	var vsCmnStruAuthOperRptNm		= util.Grid.getTitle(app, "grdCmnStruAuthOper");
	
	if(String(vaNonSelIdx).isEmpty()){
		util.Msg.alert("NLS-INF-M045", [vsNonCmnStruAuthOperRptNm]);
		return false;
	};
	
//	var vaIdxNon = null;
//	if(String(vsNonSelIdx).indexOf(",") != -1) {
//		vaIdxNon = vsNonSelIdx;
//	}else{
//		vaIdxNon = new Array();
//		vaIdxNon[0] = vsNonSelIdx;
//	};

//		util.Grid.copyGridData("grdNonCmnStruAuthOper", "grdCmnStruAuthOper", vaNonSelIdx);
	
	var vnIdx = null;
	var vnNewRowIdx = null;
//	for(var i = 0; i < vaIdxNon.length; i++) {
	for(var i=0; i<vaNonSelIdx.length; i++){
//		vnIdx = vaIdxNon[i];
		vnIdx = vaNonSelIdx[i];
		
		vnNewRowIdx = util.Grid.insertRow(app, "grdCmnStruAuthOper");
		
//		var vnAuthSelIdx = util.Grid.getIndex("grdCmnStruAuth");
		var vsDeptCd = util.Grid.getCellValue(app, "grdCmnStruAuth", "DEPT_CD");
		var vsDeptObjDivRcd = util.Grid.getCellValue(app, "grdCmnStruAuth", "OBJ_DIV_RCD");
		
		var vsRoleId	 = util.Grid.getCellValue(app, "grdNonCmnStruAuthOper", "OPRT_ROLE_ID", vnIdx);
		var vsRoleNm	 = util.Grid.getCellValue(app, "grdNonCmnStruAuthOper", "OPRT_ROLE_NM", vnIdx);
		var vsUserTgtRcd = util.Grid.getCellValue(app, "grdNonCmnStruAuthOper", "USER_TGT_RCD", vnIdx);
		var vsUserId	 = util.Grid.getCellValue(app, "grdNonCmnStruAuthOper", "USER_ID", vnIdx);
		var vsUserTgtNm  = util.Grid.getCellValue(app, "grdNonCmnStruAuthOper", "DIV_NM", vnIdx);
		
		
		util.Grid.setCellValue(app, "grdCmnStruAuthOper", "DEPT_CD", 	 vsDeptCd, 		  vnNewRowIdx);
		util.Grid.setCellValue(app, "grdCmnStruAuthOper", "OBJ_DIV_RCD",  vsDeptObjDivRcd, vnNewRowIdx);
		util.Grid.setCellValue(app, "grdCmnStruAuthOper", "OPRT_ROLE_ID", vsRoleId, 		  vnNewRowIdx);
		util.Grid.setCellValue(app, "grdCmnStruAuthOper", "OPRT_ROLE_NM", vsRoleNm, 		  vnNewRowIdx);
		util.Grid.setCellValue(app, "grdCmnStruAuthOper", "USER_TGT_RCD", vsUserTgtRcd, 	  vnNewRowIdx);
		util.Grid.setCellValue(app, "grdCmnStruAuthOper", "USER_ID", 	 vsUserId, 		  vnNewRowIdx);
		util.Grid.setCellValue(app, "grdCmnStruAuthOper", "DIV_NM", 	 	 vsUserTgtNm, 	  vnNewRowIdx);
	};
	
	doSaveDept();
//	doSaveOper();
}

/**
 * [사용 지정부서별 업무역할] -> [미사용지정부서별 업무역할] move 함수
 * @return void
 */
function moveRoleDown() {
	// 사용 지정부서별 업무역할 리피트 선택된 건 가져오기 
//	var vsSelIdx = util.Grid.getChkRowOrSelRowIdx("grdCmnStruAuthOper");
	var vaSelIdx = util.Grid.getCheckOrSelectedRowIndex(app, "grdCmnStruAuthOper");
	
//	var vcAuthGrid	 = app.lookup("grdCmnStruAuth");
//	var vcUseGrid	 = app.lookup("grdCmnStruAuthOper");
//	var vcNonUseGrid = app.lookup("grdNonCmnStruAuthOper");
	
	var vsNonCmnStruAuthOperRptNm	= util.Grid.getTitle(app, "grdNonCmnStruAuthOper");
	var vsCmnStruAuthOperRptNm		= util.Grid.getTitle(app, "grdCmnStruAuthOper");
	
//	if(String(vsSelIdx).isEmpty()) {
	if(String(vaSelIdx).isEmpty()){
		util.Msg.alert("NLS-INF-M045", [vsCmnStruAuthOperRptNm]);
		return false;
	};
	
	var vsIdx = null;
//	if(String(vsSelIdx).indexOf(",") != -1) {
//		vsIdx = vsSelIdx;
//	}else{
//		vsIdx = new Array();
//		vsIdx[0] = vsSelIdx;
//	};
	
//	util.Grid.deleteRow("grdCmnStruAuthOper", vsIdx);
	util.Grid.deleteRow(app, "grdCmnStruAuthOper", vaSelIdx);
	
	doSaveDept();
//	doSaveOper();
};

/*
 * 사용자 정의 컨트롤에서 insert 이벤트 발생 시 호출.
 */
function onGrid_ids_btn1Insert(/* cpr.event.CUIEvent */ e){
	/** 
	 * @type udc.com.grid_IDS_Btn
	 */
	var grid_ids_btn1 = e.control;
	// 1. 신규행 추가 -> udc 기본 수행
//	var vnIdx = ExtRepeat.insertRow("rptCmnUseUser");
	// 2. 기본값 설정 : 사용자구분, 유효시작종료일
	var vsUserDivRcd =util.Control.getValue(app, "cbbUserDivRcd"); // 조회조건의 사용자구분코드
	if(ValueUtil.fixNull(vsUserDivRcd) != ""){
		util.Control.setValue(app, app, "cbbFrfUserDivRcd", vsUserDivRcd);
	}

	util.Control.setValue(app, app, "ckbFrfUseYn", "Y");
	util.Control.setValue(app, app, "dipFrfEfftStDt", "19000101");
	util.Control.setValue(app, app, "dipFrfEfftEndDt", "99991231");
//	util.Control.setValue("ipbFrfLoginDt", "");
//	util.Control.setValue("ipbFrfPwdChgDt", "");
	
		
	// 프리폼의 지정컨트롤 포커스 사용자명 컬럼에 시작행 설정 -> udc로 설정.
	util.Control.setFocus(app, "ipbFrfUserId");
};

/*
 * 사용자 정의 컨트롤에서 delete 이벤트 발생 시 호출.
 */
function onGrid_ids_btn1Delete(/* cpr.event.CUIEvent */ e){
	/** 
	 * @type udc.com.grid_IDS_Btn
	 */
	var grid_ids_btn1 = e.control;
	var vnIdxs = util.Grid.getCheckOrSelectedRowIndex(app, "grdCmnUseUser");
//	var vnCnt = 0;
	
	if( !ValueUtil.isNull(vnIdxs) ) {
		for(var i = 0; i < vnIdxs.length; i++) {
			/**@type cpr.controls.Grid */
			var vnCnt = util.Grid.getCellValue(app, "grdCmnUseUser","STRU_AUTH_CNT",vnIdxs[i]);
			if(vnCnt > 0) {
				util.Msg.warn("M214", ["사용자목록", vnIdxs[i]+1, "사용자지정부서"+vnCnt+"건", "사용자지정부서"]);
				return false;
			}
		}
	}
	
	util.Grid.deleteRow(app, "grdCmnUseUser");
	
	if(util.Grid.getIndex(app, "grdCmnUseUser") != -1) {
		onGrdCmnUseUserSelectionChange(e);
	}/*else{
		app.lookup("grpCmnUseUser").enabled = false;
	};*/
};

/*
 * 사용자 정의 컨트롤에서 save 이벤트 발생 시 호출.
 */
function onGrid_ids_btn1Save(/* cpr.event.CUIEvent */ e){
	/** 
	 * @type udc.com.grid_IDS_Btn
	 */
	var grid_ids_btn1 = e.control;
	
	doSave();
};

/*
 * 사용자 정의 컨트롤에서 restore 이벤트 발생 시 호출.
 */
function onGrid_ids_btn1Restore(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type udc.com.grid_IDS_Btn
	 */
	var grid_ids_btn1 = e.control;
	
//	util.Grid.revertRowData("grdCmnUseUser");
//	
//	if(util.Grid.getIndex("grdCmnUseUser") != -1) {
//		onGrdCmnUseUserSelectionChange(e);
//	}else{
//		util.Control.setEnable("grpCmnUseUser", false);
//	};
};

/*
 * 그룹에서 keydown 이벤트 발생 시 호출.
 * 사용자가 키를 누를 때 발생하는 이벤트.
 */
function onGrpSearchKeydown(/* cpr.events.CKeyboardEvent */ e){
	/** 
	 * @type cpr.controls.Container
	 */
	var grpSearch = e.control;
	if(e.keyCode == cpr.events.KeyCode.ENTER) {
		/**@type cpr.controls.Button*/
		var vcBtnSch = app.lookup("btnSearch");
		vcBtnSch.click();
	};
}

/*
 * 탭 폴더에서 before-selection-change 이벤트 발생 시 호출.
 * Tab Item을 선택하기 전 발생하는 이벤트. 다음 이벤트로 select 이벤트를 발생합니다.
 */
function onTabMstBeforeSelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.TabFolder
	 */
	var tabMst = e.control;
	var vcSelTabItem = e.oldSelection;
	
	if(vcSelTabItem == null || vcSelTabItem == e.newSelection){
		//초기에 선택되었을 때에는 무관하므로  skip
		return;
	}
	
	var vnSelTabIdx = vcSelTabItem.id;
	
	// 1. 현재탭과 선택된 탭이 같은 경우 제외 -> 같은 경우 selection-change가 일어나지 않음.
//	if(psCaseId == vsSelTabId) return false;
	
	switch(vnSelTabIdx){
		// 사용자
		case TAB.USER: {
			// 포커스된 로우 담기 
			var vnSelIdx = util.Grid.getIndex(app, "grdCmnUseUser");
			var vsUserId = util.Grid.getCellValue(app, "grdCmnUseUser", "USER_ID");
			
			if(vnSelIdx == -1){
				// tab 이동 하지 않음
//				ExtTab.setTabBtn("tabMain", TAB_BTN[vsSelTabId]);
				// "라인을 선택해주세요."
				util.Msg.alert("NLS-INF-M023");
				return false;
			}
			
			// 사용자ID가 없는 경우 
			if(ValueUtil.fixNull(vsUserId) == ""){
				// tab 이동 하지 않음
//				ExtTab.setTabBtn("tabMain", TAB_BTN[vsSelTabId]);
				// "선택된 데이터가 없습니다." 
				util.Msg.warn("M008");
				return false;
			}
			
			//그리드 변경 체크
			if( util.Grid.isModified(app, "grdCmnUseUser","CRM")) {
				// tab 이동 하지 않음
//				ExtTab.setTabBtn("tabMain", TAB_BTN[vsSelTabId]);
				return false;
			};				
			
			var vsAsgnDeptCd = util.Grid.getCellValue(app, "grdCmnUseUser", "ASGN_DEPT_CD");
			util.DataMap.setValue(app, "dmReqKeyStruAuth", "strUserId", vsUserId);
			util.DataMap.setValue(app, "dmReqKeyStruAuth","strAsgnDeptCd",vsAsgnDeptCd);
			
			break;
		}
		case TAB.DEPT: {
			if( util.Grid.isModified(app, "grdCmnStruAuth","CRM")) {
				// tab 이동 하지 않음
//				ExtTab.setTabBtn("tabMain", TAB_BTN[vsSelTabId]);
				return false;
			};
		}
	}
	
	
}


/*
 * 탭 폴더에서 selection-change 이벤트 발생 시 호출.
 * Tab Item을 선택한 후에 발생하는 이벤트.
 */
function onTabMstSelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.TabFolder
	 */
	var tabMst = e.control;
	/**@type cpr.controls.TabItem*/
	// 선택된 탭 아이템
	var vcSelTabItem = e.newSelection;
	var vnSelTabIdx = vcSelTabItem.id;

	//탭변경 후 처리 로직
	switch (vnSelTabIdx) {
		// 사용자
		case TAB.USER : {
			//사용자지정부서로 탭변경 후 조회시 doList, 탭변경시 1번 doList 호출하여
			//Submission Already Sended 에러 발생
//			doList(function(pbSuccess) {
				// 조회 : "조회되었습니다." header 메세지 표시
//				if(pbSuccess) util.Msg.notify("NLS-INF-M024");
//			});
			
			break;
		}
		// 사용자지정부서
		case TAB.DEPT : {
			doListDept(function(pbSuccess) {
				// 조회 : "조회되었습니다." header 메세지 표시
				if(pbSuccess) util.Msg.notify(app, "NLS-INF-M024");
			});
			
			break;
		}
	}

}

/**
 * @desc  [사용자지정부서] 리피트 상태에 따른 버튼 제어
 * @return void
 * @author Choi dongwon 2018. 03. 30.
 */
function doGrdStruAuthStatus() {
	var vaBtnCtrl = ["btnUp", "btnDown"];
	
	var vnIdx  = util.Grid.getIndex(app, "grdCmnStruAuth");
	var vsUtpStatus = util.Grid.getRowState(app, "grdCmnStruAuth", vnIdx); //행의 상태값
	
	if(vsUtpStatus == cpr.data.tabledata.RowState.INSERTED || 
			vsUtpStatus == cpr.data.tabledata.RowState.DELETED || 
			util.Grid.getRowCount(app, "grdCmnStruAuth") < 1) {
		util.Control.setEnable(app, false, vaBtnCtrl);
	} else{
		util.Control.setEnable(app, true, vaBtnCtrl);
	};
}


/*
 * 사용자 정의 컨트롤에서 insert 이벤트 발생 시 호출.
 */
function onGrid_ids_btn2Insert(/* cpr.event.CUIEvent */ e){
	/** 
	 * @type udc.com.grid_IDS_Btn
	 */
	var grid_ids_btn2 = e.control;
	// 1. 신규행 추가 후 소속부서명 컬럼에 시작행 설정 -> udc에서 실행
//	var vnIdx = ExtRepeat.insertRow("rptCmnStruAuth", "rdIpbStruAuthDeptNm");
	
	// 2. 기본값 설정 : 첫번째 탭의 사용자ID, 명, 구분코드를 가져와 기본set
	var vnUseUserIdx = util.Grid.getIndex(app, "grdCmnUseUser");
	var vsUserID 	 = util.Grid.getCellValue(app, "grdCmnUseUser", "USER_ID", vnUseUserIdx);
	var vsUserNm	 = util.Grid.getCellValue(app, "grdCmnUseUser", "USER_NM", vnUseUserIdx);
	var vsUserDivRcd = util.Grid.getCellValue(app, "grdCmnUseUser", "USER_DIV_RCD", vnUseUserIdx);
	
	util.Grid.setCellValue(app, "grdCmnStruAuth", "USER_ID", vsUserID);
	util.Grid.setCellValue(app, "grdCmnStruAuth", "USER_NM", vsUserNm);
	util.Grid.setCellValue(app, "grdCmnStruAuth", "USER_DIV_RCD", vsUserDivRcd);

	// 마스터(사용자지정부서) 그리드 상태에따른 버튼 제어
	doGrdStruAuthStatus();
};

/*
 * 사용자 정의 컨트롤에서 delete 이벤트 발생 시 호출.
 */
function onGrid_ids_btn2Delete(/* cpr.event.CUIEvent */ e){
	/** 
	 * @type udc.com.grid_IDS_Btn
	 */
	var grid_ids_btn2 = e.control;
	
	// 마스터(사용자지정부서) 리피터 상태에따른 버튼 제어
	doGrdStruAuthStatus();
}

/*
 * 사용자 정의 컨트롤에서 save 이벤트 발생 시 호출.
 */
function onGrid_ids_btn2Save(/* cpr.event.CUIEvent */ e){
	/** 
	 * @type udc.com.grid_IDS_Btn
	 */
	var grid_ids_btn2 = e.control;
	doSaveDept();
}

/*
 * 그리드에서 selection-change 이벤트 발생 시 호출.
 * detail의 cell 클릭하여 설정된 selectionunit에 해당되는 단위가 선택될 때 발생하는 이벤트.
 */ 
function onGrdCmnStruAuthSelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grdCmnStruAuth = e.control;
	
	if(grdCmnStruAuth.getSelectedRowIndex() == -1){
		return false;
	}
	
	doListCmnStruAuthOper();
};



/*
 * "" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnUpClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnUp = e.control;
	moveRoleUp();
}

/*
 * "" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnDownClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnDown = e.control;
	moveRoleDown();
}

/*
 * 인풋 박스에서 value-change 이벤트 발생 시 호출.
 * 변경된 value가 저장된 후에 발생하는 이벤트.
 */
function onScbFrfPwdValueChange(/* cpr.events.CValueChangeEvent */ e){
	/** 
	 * @type cpr.controls.InputBox
	 */
	var scbFrfPwd = e.control;
	doValueChangedCheckPassWd("PWD");
};

/**
 * [사용자 상세내역목록] 패스워드 변경에 따른 유효성체크 
 * @param {String} psPwdColName 컬럼명
 * @return void
 */
function doValueChangedCheckPassWd(psPwdColName) {
	// 패스워드
	var vsPwd = util.Control.getValue(app, "scbFrfPwd");
	// 사용자ID
//	var vsUserId = util.Control.getValue("ipbFrfId");
	var vsPwdTrim = vsPwd.trim();
	
	util.Control.setValue(app, app, "scbFrfPwd", vsPwdTrim);
	// 2015-12-08 Kim Bora 관리자가 사용하는 메뉴이므로 공통 패스워드 유효성 체크를 안하도록 주석처리
	//if(!checkPasswdValid(vsUserId, vsPwdTrim, vsPwdTrim)) return false;
};

/*
 * 인풋 박스에서 value-change 이벤트 발생 시 호출.
 * 변경된 value가 저장된 후에 발생하는 이벤트.
 */
function onSrbFrfTmpPwdValueChange(/* cpr.events.CValueChangeEvent */ e){
	/** 
	 * @type cpr.controls.InputBox
	 */
	var srbFrfTmpPwd = e.control;
	doValueChangedCheckPassWd("TMP_PWD");
}

/*
 * "LOGIN" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnFrfLoginClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnFrfLogin = e.control;
	
	var vsUserId = util.Grid.getCellValue(app, "grdCmnUseUser", "USER_ID"); // 사용자ID
	var vsUserNm = util.Grid.getCellValue(app, "grdCmnUseUser", "USER_NM"); // 사용자명
	
	
	// 사용자ID/명/패스워드 셋중 하나라도 없으면 return
	if(ValueUtil.fixNull(vsUserId) == "" || ValueUtil.fixNull(vsUserNm) == "") {
		return false;
	}
	
	if(util.Msg.confirm("NLS-CRM-M031", [vsUserNm + "(" + vsUserId + ")"]) == "1"){
		util.DataMap.setValue(app, "dmReqKeyLogin", "strUserId", vsUserId);
			
		util.Submit.send(app, "subUserLogin", function(pbSuccess){
			if(pbSuccess){
				// ???
				window.location.reload(); // 프레임 전체 새로고침
			}
		}); 
	}else{
		return false;
	}
}

/*
 * 사용자 정의 컨트롤에서 idrCommonEvent 이벤트 발생 시 호출.
 */
function onGrid_ids_btn1IdrCommonEvent(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type udc.com.grid_IDS_Btn
	 */
	var grid_ids_btn1 = e.control;
	util.Control.redraw(app, "grpCmnUseUser");
}




