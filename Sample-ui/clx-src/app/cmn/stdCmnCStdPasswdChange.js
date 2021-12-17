var util = new ComUtil(app);

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
//var moIdsForStdCmnPObjSch = [
//{
//	controlId			:	"btnSaNm",
//	iCd					:	"",
//	iNm					:	"ipbDeptNm",
//	iObjDivRcd			:	["CC009SA"],
//	iStartObject    	:   "",
//	iOtDivRcd			:	"",
//	iOtIsTreeView	:	"Y",
//	iLanDivRcd		:	"",
//	iKeyDate			:	"/root/resOnLoad/strCurDt",
//	iKeyEndDate		:	"",
//	oObjDivRcd		:	"",
//	oCd					:	"/root/reqList/strDeptCd",
//	oCdNm				:	"ipbDeptNm",
//	oBegDt				:	"",
//	oEndDt				:	"",
//	oLanDivRcd		:	"",
//	func 					:  null
//}];

/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	//리피트 초기 설정
//	ExtRepeat.init("rptCmnUseUser");
	//검색조건 초기 설정
//	ExtGroup.initSearchBox("grpSearch", "grpData");
	//서브미션 실행 (실패시 cover page)

	util.Submit.send(app, "subOnLoad", function(pbSuccess){
		if(pbSuccess) {
			util.Control.setFocus(app, "ipbStudNm");
		};
	}, true);
};


/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnSearchClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnSearch = e.control;
	// 1. 리피트 변경사항체크 
	if( util.Grid.isModified(app, ["grdCmnUseUser"], "CRM") ) return false;
	
	// 2. 조회조건 필수 체크 : 학번, 학생명 중 하나는 필수
	var vsUserId = ValueUtil.fixNull( util.Control.getValue(app, "ipbStudId") );
	var vsUserNm = ValueUtil.fixNull( util.Control.getValue(app, "ipbStudNm") );
	
	if(vsUserId == "" && vsUserNm == "") {
		//조회조건[@] 중 하나는 반드시 입력해야 합니다.
		//다국어 필요 2018.05.02 배소영
		util.Msg.alert("NLS-CMM-M016", ["학번, 학생명"]);		
		return false;
	};
	
	// 3. 조회한다.
	doList(function(pbSuccess){
		if(pbSuccess){
			//조회되었습니다.
			util.Msg.notify(app, "NLS-INF-M024");
		};
	});
};

function doList(poCallBackFunc) {
	// 학생목록을 조회한다.
	util.Submit.send(app, "subList", function(pbSuccess){
		if(pbSuccess) {
			util.Control.redraw(app, ["grdCmnUseUser"]);
			// 조회 후 콜백함수 수행
			if(util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
		};
	});
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
		var vcBtnSch = app.lookup("btnSearch");
		vcBtnSch.click();
	};
}

/*
 * "비밀번호 초기화" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnPasswdInitClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnPasswdInit = e.control;
	var vnIdx = util.Grid.getIndex(app, "grdCmnUseUser");
	
	// 1. 선택한 로우가 존재하는 지 확인
	if( vnIdx == -1) return false;
	
	var vsSsn = ValueUtil.fixNull( util.Grid.getCellValue(app, "grdCmnUseUser", "SSN", vnIdx) );
	
	// 2. 주민등록번호 입력여부 확인
	if(vsSsn == ""){
		util.Msg.warn("M110");
		return false;
	};
	
	// 3. 주민등록번호 형식 체크 확인
	if (!ValueUtil.checkType("SSN", vsSsn)){
		util.Msg.warn("M110");
		return false;
	};
	
	var vsNewPassWd = vsSsn.replace( /([0-9]{1})([0-9]{7}$)/, "$1");
	
	util.Grid.setCellValue(app, "grdCmnUseUser", "PWD", vsNewPassWd, vnIdx);
	util.Grid.setCellValue(app, "grdCmnUseUser", "TMP_PWD", vsNewPassWd, vnIdx);
}

/*
 * "취소" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnRestoreClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnRestore = e.control;
	
	var vnIdx = util.Grid.getIndex(app, "grdCmnUseUser");
	
	// 1. 선택한 로우가 존재하는 지 확인
	if( ValueUtil.isNull(vnIdx)) return false;
	
	util.Grid.revertRowData(app, "grdCmnUseUser", vnIdx);
}

/*
 * "저장" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnSaveClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnSave = e.control;
	doSave();
};

function doSave() {
	if( !util.Grid.isModified(app, "grdCmnUseUser", "MSG") ) {
		return false;
	};
	if( !util.validate(app, "grdCmnUseUser") ) return false;
	
	util.Submit.send(app, "subSave", function(pbSuccess){
		if(pbSuccess) {
			doList(function(pbListSuccess){
				if(pbListSuccess) {
					//갱신된 데이터가 조회되었습니다.
					util.Msg.notify(app, "NLS-INF-M025");
				};
			});
		};
	});
};
