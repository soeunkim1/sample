var util = new ComUtil(app); 
/*
 * 부모 페이지에서 받아온 기본값을 받는 객체
 * 내부적으로 Result라는 객체를 가지고 있으며, 부모에 넘겨줄 결과값을 저장
 * @member stdCmnPPrsnSearch
 * @author hyunteak at 15. 11. 26 
 */
//var moStdApsPPrsnSearch = {
//	// 팝업 작동 내부사용
//	controlId : "",
//	openedByChange : false,
//	// 선택가능 범위를 제한함.
//	strStaffGrpAuth : "",				//교직원 권한 체크여부 (체크시:true넣어줌)
//	strWkdtyAuth : "",				//보직에 해당되는 사람 함께 조회 여부(체크시:true)
//	strStaffGrpRcd : "",				//교직원그룹 
//	strStaffGrpRcdLock : "",		//교직원그룹  잠금여부(체크시 true)
//	strStaffSubGrpRcd : "",		//교직원하위그룹 
//	strStaffSubGrpRcdLock : "",	//교직원하위그룹  잠금여부(체크시 true)
//	strStatusRcd : "",				//상태코드
//	strStaffNo : "",					//교직원번호
//	strRepNm : "",					//이름
//	strKeyDate : "",					//기준일자
//	strObjDivRcd : "",				//객체구분
//	strObjCd : "",						//객체코드
//	strObjNm : "",						//객체명 
//	strObjCdInList : "",				//조직에 대한 in조건 "'A','B','C'" 형식이여야함
//	strWkgrdRcd : "",				//직급
//	strOgDisableCls : "",			//부서 조회조건 비활성화 여부	(2016.08.05 정정호 추가)
//	strPresIncludCls	: "",			//총장님 포함 여부 (2016.11.30 정정호 추가)
//	
//	// 선택열 결과 리턴
//	Result : {
//		strObjNo : "",						//오브젝트번호
//		strStaffNo : "",					//교직원번호
//		strRepNm : "",					//이름
//		strBirthday : "",					//생년월일
//		strStatNm : "",					//상태명
//		strStatRcd : "",					//상태쿼드
//		strOgNm : "",						//행정부서명
//		strOgCd : "",						//행정부서코드
//		strPosNm : "",					//직위명
//		strPosCd : "",						//직위코드
//		strWkgrdNm : "",					//직급명
//		strWkgrdRcd : "",				//직급코드
//		strStaffGrpRcd : "",				//교직원그룹
//		strStaffSubGrpRcd : "",		//교직원하위그룹
//		strHoRcd : "",						//호봉코드
//		strSsn : "",							//주민등록번호
//		strWkdtyRcd : "", 				//직책코드
//		strWkdtyNm : "",					//직책명
//		strAfpAppDt : "",					//법인임용일자 (2016.01.11 정정호 추가)
//		strPvactCiiDt : "",				//연가기준일자 (2016.01.14 정정호 추가)
//		strProfDivRcd			: "",	//교수구분코드[CF401]		(2016.04.06 정정호 추가) 
//		strIoForeignDivRcd	: ""	//내외국인구분코드[CB031]	(2016.04.06 정정호 추가) 
//	}
//};
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
//	{   //교직원검색 조회조건 행정부서
//		controlId			:	"btnPopSearch",
//		iCd					:	"",
//		iNm					:	"ipbOgNm",
//		iObjDivRcd			:	["CC009OG"],
//		iStartObject    	:   "",
//		iOtDivRcd			:	"",
//		iOtIsTreeView	:	"Y",
//		iLanDivRcd		:	"",
//		iKeyDate			:	"/root/reqCmd/strKeyDate",
//		iKeyEndDate		:	"",
//		oObjDivRcd		:	"/root/reqList/strObjDivRcd",
//		oCd					:	"/root/reqList/strObjCd",
//		oCdNm				:	"ipbOgNm",
//		oBegDt				:	"",
//		oEndDt				:	"",
//		oLanDivRcd		:	"",
//		func 					:  null
//	}
//];


/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	//리피트 초기 설정
//	ExtRepeat.init(["rptApsSearch"]);
	//검색조건 초기 설정
//	ExtGroup.initSearchBox("grpSearch", ["grp_rptApsSearch"]);
	//호출한 페이지에서 파라미터 받기.(initValue)
//	doParentGet();
	var voStdApsPPrsnSearch = app.getHostProperty("initValue");
	//화면 활성 비활성확인
	doSetCtlEnable(voStdApsPPrsnSearch, true);
	//화면 온로드 서브미션 호출
	doOnLoad(voStdApsPPrsnSearch);
}

/**
 * doSetCtlEnable 화면 활성 비활성확인
 * @param poStdApsPPrsnSearch 초기검색 조건
 * @param pbEnable true/false
 * @type void
 */
function doSetCtlEnable(poStdApsPPrsnSearch, pbEnable){
	/* 그룹처리로 가능 하므로 사용 하지 않음
	var vaSearchMod = ["cbbStaffGrpRcd", "cbbStaffSubGrpRcd", "cbbStatusRcd", "ipbStaffNo", "ipbRepNm","btnSearch"];

	Common.setCtlEnable(pbEnable, vaSearchMod);
	Common.setCtlEnable(!pbEnable, ["btnConditionChange", "grxMst"]);
	*/
	// 파라미터 받아서 초기 검색조건 세팅.
	var voParam = poStdApsPPrsnSearch;
	//초기값에 따른 비활성화 교직원그룹 교직원하위그룹
	if (voParam.strStaffGrpRcdLock) {//교직원그룹
		util.Control.setEnable(app, false,["cbbStaffGrpRcd"])
	}
	if (voParam.strStaffSubGrpRcdLock) {//교직원하위그룹
		util.Control.setEnable(app, false, ["cbbStaffSubGrpRcd"]);
	}
	// 개인권한이 아닐경우에만 행정부서 활성화/비활성 컨트롤 가능
	if (util.Auth.getMenuInfo(app).AUTH_RNG_RCD != "CC00104") {
		util.Control.setEnable(app, pbEnable, ["cmnobjsch1"]);
	}
}

/**
 * doOnLoad  화면 오픈 시 서브미션 
 * @param poStdApsPPrsnSearch 초기검색 조건
 * @type void 
 */
function doOnLoad(poStdApsPPrsnSearch){
	
	// 파라미터 받아서 초기 검색조건 세팅.
	var voParam = poStdApsPPrsnSearch;
	//넘어온 교직원 번호 
	if (voParam.strStaffNo) {
		util.Control.setValue(app, app, "ipbStaffNo", voParam.strStaffNo);
	}
	//넘어온 이름
	if (voParam.strRepNm) {
		util.Control.setValue(app, app, "ipbRepNm", voParam.strRepNm);
	}
	//넘어온 교직원그룹 
	if (voParam.strStaffGrpRcd) {
		util.DataMap.setValue(app, "dmReqList", "strStaffGrpRcd", voParam.strStaffGrpRcd);				
	}
	//넘어온 교직원하위그룹 
	if (voParam.strStaffSubGrpRcd) {
		util.Control.setValue(app, app, "cbbStaffSubGrpRcd", voParam.strStaffSubGrpRcd);
	}
	
	//넘어온 기준일자
	if (voParam.strKeyDate) {
		util.DataMap.setValue(app, "dmReqCmd", "strKeyDate", voParam.strKeyDate);
	}
	//넘어온 상태코드 
	if (voParam.strStatusRcd) {
		util.Control.setValue(app, app, "cbbStatusRcd", voParam.strStatusRcd);
	}
	//넘어온 오브젝트번호
	if (voParam.strObjCd) {
		util.DataMap.setValue(app, "dmReqList", "strObjCd", voParam.strObjCd);
	}
	//넘어온 오브젝트구분코드
	if (voParam.strObjDivRcd) {
		util.DataMap.setValue(app, "dmReqList", "strObjDivRcd", voParam.strObjDivRcd);
	}
	//넘어온 부서명
	if (voParam.strObjNm) {
		util.Control.setValue(app, app, "ipbOgNm", voParam.strObjNm);
	}
	//넘어온 교직원그룹
	if (voParam.strStaffGrpAuth) {
		util.DataMap.setValue(app, "dmReqList", "strStaffGrpAuth", voParam.strStaffGrpAuth);
	}
	//넘어온 직책
	if (voParam.strWkdtyAuth) {
		util.DataMap.setValue(app, "dmReqList", "strWkdtyAuth", voParam.strWkdtyAuth);
	}
	//넘어온 조직
	if (voParam.strObjCdInList) {
		util.DataMap.setValue(app, "dmReqList", "strObjCdInList", voParam.strObjCdInList);
	}
	//넘어온 직급
	if (voParam.strWkgrdRcd) {
		util.DataMap.setValue(app, "dmReqList", "strWkgrdRcd", voParam.strWkgrdRcd);
		//voIns.getValueNode("/root/reqList/strWkgrdRcd").setValue(voParam.strWkgrdRcd);
	}
	//넘어온 총장님 포함여부
	if (voParam.strPresIncludCls) {
		util.DataMap.setValue(app, "dmReqList", "strPresIncludCls", voParam.strPresIncludCls);
	}
	
	// 개인권한이 아닐 경우에만 행정부서검색 팝업 활성화
	if (util.Auth.getMenuInfo(app).AUTH_RNG_RCD != "CC00104") {
		
		// 부서 조회조건 사용안함으로 설정한 경우 비활성화 시킨다. (20163.08.05 정정호 추가)
		if(voParam.strOgDisableCls){
			util.Control.setEnable(app, false, ["cmnobjsch1"]);
		}else{
			util.Control.setEnable(app, true, ["cmnobjsch1"]);
		}
	}else{
		util.Control.setEnable(app, false, ["cmnobjsch1"]);
	}
	
	//온로드 서브미션 콜
	util.Submit.send(app, "subOnLoad", function(pbSuccess){
		if (pbSuccess) {
			util.Control.redraw(app, ["cbbStaffGrpRcd", "cbbStaffSubGrpRcd", "cbbStatusRcd"]);
			//교직원그룹 필터
			if (voParam.strStaffGrpRcd) {
				doStaffSubGrpComboList();					
			}
			
			// 교직원 번호 바로 검색 실행
			if (voParam.strStaffNo || voParam.strRepNm) {
				// 검색 실행.
				app.lookup("btnSearch").click();
			}
		}
	});
}


/**
 * doStaffSubGrpComboList교직원그룹에 대한 하위그룹 필터링
 * @type void
 */	
function doStaffSubGrpComboList(){
	var vsStaffGrpRcd = util.Control.getValue(app, "cbbStaffGrpRcd");
	//교직원그룹값에 따른 필터 처리
	if(!ValueUtil.fixNull(vsStaffGrpRcd)){
		util.Control.redraw(app, ["cbbStaffSubGrpRcd"]);
	}else{
//해당 콤보박스 컨트롤의 fiterExp 속성으로 변경 필요...
		util.SelectCtl.cascadeList("cbbStaffGrpRcd", "cbbStaffSubGrpRcd", "CD_PRP1");
	}
	//교직원하위그룹값에 전체값 세팅
	var vsStaffSubGrpRcd =util.Control.getValue(app, "cbbStaffSubGrpRcd");
	// 빈값("") 또는 null이 아니면 [전체]를 선택하도록 한다. 
	if (!ValueUtil.isNull(vsStaffSubGrpRcd)) {
		// 0번째 index인 [전체] 선택하도록 함.
		util.SelectCtl.selectItem(app, "cbbStaffSubGrpRcd", 0);
		//ExtControl.setValue("cbbStaffSubGrpRcd","");

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
	doSearch();
}

/*
 * 콤보 박스에서 selection-change 이벤트 발생 시 호출.
 * ComboBox Item을 선택하여 선택된 값이 저장된 후에 발생하는 이벤트.
 */
function onCbbStaffGrpRcdSelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.ComboBox
	 */
	var cbbStaffGrpRcd = e.control;
	doStaffSubGrpComboList();
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
		app.lookup("btnSearch").click();
	}
}

/**
 * doSearch 조회 서브미션
 * @type void
 */	
function doSearch(){
	doList();
}

/**
 * doList (검색탭 조회) 	
 * @type void
 */
function doList() {
	
	var voPageInfo = util.Auth.getMenuInfo(app);
	
	util.DataMap.setValue(app, "dmReqCmd", "authRngRcd", voPageInfo.AUTH_RNG_RCD);	//사용자 권한
	util.DataMap.setValue(app, "dmReqCmd", "strOprtRoleId", voPageInfo.OPRT_ROLE_ID);	//사용자 역할ID
	
	util.Submit.send(app, "subList", function(pbSuccess){		
		if(pbSuccess){
			util.Msg.notify(app, "NLS-INF-M024");
			util.Control.redraw(app, "rptApsSearch");
		}
	});
};



/*
 * "선택닫기" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnCloseOkClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnCloseOk = e.control;
	doCloseOk();
}

function doCloseOk(){
	// 선택된 데이터가 없을 시 
	if(ValueUtil.isNull(util.Grid.getCheckOrSelectedRowIndex(app, "grdApsSearch"))){
		//선택된 데이터가 없습니다.
		util.Msg.warn("M008");
		return false;
	}
	//선택된 행
	var vnIdx = util.Grid.getIndex(app, "grdApsSearch");
	var voResult = app.lookup("dsApsSearch").getRow(vnIdx).getRowData();
			
//	//선택된 데이터 변수 선언
//	var vsObjNo				= ExtRepeat.getValue("rptApsSearch", "OBJ_NO"						, vnIdx);//오브젝트번호
//	var vsStaffNo				= ExtRepeat.getValue("rptApsSearch", "STAFF_NO"					, vnIdx);//교직원번호
//	var vsRepNm				= ExtRepeat.getValue("rptApsSearch", "REP_NM"						, vnIdx);//이름
//	var vsBirthday			= ExtRepeat.getValue("rptApsSearch", "BIRTHDAY"						, vnIdx);//생년월일
//	var vsStatNm				= ExtRepeat.getValue("rptApsSearch", "STAT_NM"						, vnIdx);//상태명
//	var vsStatRcd				= ExtRepeat.getValue("rptApsSearch", "STAT_RCD"					, vnIdx);//상태코드
//	var vsOgNm				= ExtRepeat.getValue("rptApsSearch", "OG_NM"							, vnIdx);//행정부서명
//	var vsOgCd				= ExtRepeat.getValue("rptApsSearch", "OG_CD"							, vnIdx);//행정부서코드
//	var vsPosNm				= ExtRepeat.getValue("rptApsSearch", "POS_NM"						, vnIdx);//직위명
//	var vsPosCd				= ExtRepeat.getValue("rptApsSearch", "POS_CD"						, vnIdx);//직위코드
//	var vsWkgrdNm			= ExtRepeat.getValue("rptApsSearch", "WKGRD_NM"					, vnIdx);//직급명
//	var vsWkgrdRcd			= ExtRepeat.getValue("rptApsSearch", "WKGRD_RCD"					, vnIdx);//직급코드
//	var vsStaffGrpRcd		= ExtRepeat.getValue("rptApsSearch", "STAFF_GRP_RCD"			, vnIdx);//교직원그룹코드
//	var vsStaffSubGrpRcd	= ExtRepeat.getValue("rptApsSearch", "STAFF_SUB_GRP_RCD"	, vnIdx);//교직원하위그룹코드
//	var vsHoRcd				= ExtRepeat.getValue("rptApsSearch", "HO_RCD"						, vnIdx);//호봉코드
//	var vsSsn					= ExtRepeat.getValue("rptApsSearch", "SSN"								, vnIdx);//주민등록번호
//	var vsWkdtyRcd			= ExtRepeat.getValue("rptApsSearch", "WKDTY_RCD"					, vnIdx);//직책코드
//	var vsWkdtyNm			= ExtRepeat.getValue("rptApsSearch", "WKDTY_NM"					, vnIdx);//직책
//	var vsAfpAppDt			= ExtRepeat.getValue("rptApsSearch", "AFP_APP_DT"					, vnIdx);//법인임용일자 					(2015.01.11 정정호 추가)
//	var vsPvactCiiDt			= ExtRepeat.getValue("rptApsSearch", "PVACT_CII_DT"				, vnIdx);//연가기준일자 					(2015.01.14 정정호 추가)
//	var vsProfDivRcd		= ExtRepeat.getValue("rptApsSearch", "PROF_DIV_RCD"				, vnIdx);//교수구분코드[CF401] 		(2015.04.06 정정호 추가)
//	var vsIoForeignDivRcd	= ExtRepeat.getValue("rptApsSearch", "IO_FOREIGN_DIV_RCD"	, vnIdx);//내외국인구분코드[CB031] (2015.04.06 정정호 추가)
//	
//	var voResult = moStdApsPPrsnSearch.Result;
//	
//	voResult.strObjNo				= vsObjNo				;//오브젝트번호
//	voResult.strStaffNo				= vsStaffNo			;//교직원번호
//	voResult.strRepNm				= vsRepNm			;//이름
//	voResult.strBirthday			= vsBirthday			;//생년월일
//	voResult.strStatNm				= vsStatNm			;//상태명
//	voResult.strStatRcd				= vsStatRcd			;//상태코드
//	voResult.strOgNm				= vsOgNm				;//행정부서명
//	voResult.strOgCd				= vsOgCd				;//행정부서코드
//	voResult.strPosNm				= vsPosNm			;//직위명
//	voResult.strPosCd				= vsPosCd				;//직위코드
//	voResult.strWkgrdNm			= vsWkgrdNm			;//직급명
//	voResult.strWkgrdRcd			= vsWkgrdRcd		;//직급코드
//	voResult.strStaffGrpRcd		= vsStaffGrpRcd		;//교직원그룹
//	voResult.strStaffSubGrpRcd	= vsStaffSubGrpRcd;//교직원하위그룹
//	voResult.strHoRcd				= vsHoRcd				;//호봉코드
//	voResult.strSsn					= vsSsn					;//주민등록번호
//	voResult.strWkdtyRcd			= vsWkdtyRcd		;//직책코드
//	voResult.strWkdtyNm			= vsWkdtyNm			;//직책명
//	voResult.strAfpAppDt			= vsAfpAppDt			;//법인임용일자 (2015.01.11 정정호 추가)
//	voResult.strPvactCiiDt			= vsPvactCiiDt		;//연가기준일자 (2015.01.14 정정호 추가)
//	
//	voResult.strProfDivRcd		= vsProfDivRcd;			//교수구분코드[CF401] 		(2015.04.06 정정호 추가)
//	voResult.strIoForeignDivRcd	= vsIoForeignDivRcd;	//내외국인구분코드[CB031] (2015.04.06 정정호 추가)
	
//	if(ExtPopUp.isPopUp()){
//		ExtPopUp.closeLayeredPopup("callbackStdCmnPPrsnSearch", moStdApsPPrsnSearch);
//	}	
	app.setHostProperty("returnValue", voResult);
	app.close();
}

/*
 * "화면닫기" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnCloseCancelClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnCloseCancel = e.control;
	app.close();
}

/*
 * 그리드에서 row-dblclick 이벤트 발생 시 호출.
 * detail이 row를 더블클릭 한 경우 발생하는 이벤트.
 */
function onGrdApsSearchRowDblclick(/* cpr.events.CGridEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grdApsSearch = e.control;
	doCloseOk();
}
