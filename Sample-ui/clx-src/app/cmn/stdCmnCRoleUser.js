//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./stdCmnCRoleUser.xtm"/>


var stdCmnCRoleUser = function() {
	var moPage = this;
	
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
	moPage.moIdsForStdCmnPObjSch = [
	{
		controlId			:	"btnDeptPopUp",
		iCd					:	"",
		iNm					:	"ipbDeptNm",
		iObjDivRcd			:	["CC009OG"],
		iStartObject    	:   "",
		iOtDivRcd			:	"",
		iOtIsTreeView	:	"",
		iLanDivRcd		:	"",
		iKeyDate			:	"",
		iKeyEndDate		:	"",
		oObjDivRcd		:	"/root/reqListUserSch/strObjDivRcd",
		oCd					:	"/root/reqListUserSch/strOgCd",
		oCdNm				:	"ipbDeptNm",
		oBegDt				:	"",
		oEndDt				:	"",
		oLanDivRcd		:	"",
		func 					:  null
	}
	];
	
	
	moPage.onClick_BtnSearch = function() {
		doList(function(pbSuccess) {
			// 조회 : "조회되었습니다." header 메세지 표시
			if (pbSuccess) util.Msg.notify(app, "NLS.INF.M024");
		});
	};
	
	
	moPage.onModelConstructDone_StdCmnCRoleUser = function() {
		doOnLoad();
	};
	
	/**
	 * @desc 온로드
	 * @param 
	 * @return 
	 * @author 최경민 2015.11.23
	 */
	function doOnLoad() {

		//리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["rptCmnRole", "rptCmnUsrOperGrpUse", "rptCmnUsrOperGrpNoUse"]);
		//검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", "grpData");
		//서브미션 실행 (실패시 cover page)
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, ["cbbUserDivRcd"]);
				
			}
		}, true);
	};
	
	/**
	 * @desc 업무역할목록 조회 실행
	 * @param 
	 * @return 
	 * @author 최경민 2015.11.23
	 */
	function doList(poCallBackFunc) {
		
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdCmnRole");
				
				doChangeForRptNoUseCondition(true);
				
				// 조회 후 콜백함수 수행
				if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
			}
		});
	};
	
	/**
	 * @desc 사용,미사용 사용자목록 조회 실행
	 * @param 
	 * @return 
	 * @author 최경민 2015.11.18
	 */
	function doListUsrOperGrp(poCallBackFunc){
		var vnIdx = util.Grid.getIndex(app, "grdCmnRole");
		if(vnIdx == null) return;
		
		var vsOprtRoleId = util.Grid.getCellValue(app, "grdCmnRole", "OPRT_ROLE_ID", vnIdx); 
		util.DataMap.setValue(app, "dmRoot", "reqListUsrOperGrp", "strOprtRoleId", vsOprtRoleId);
		
		//strCommand: listUsrOperGrp 
		util.Submit.send(app, "subListUsrOperGrp", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdCmnUsrOperGrpUse");
				util.Control.redraw(app, "grdCmnUsrOperGrpNoUse");
				
				doChangeForRptNoUseCondition(true);
				
				//copyUseRoleId();
				
				// 조회 후 콜백함수 수행
				if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
			}
		});
	};
	
	function doChangeForRptNoUseCondition(pbStatus) {
		util.Control.setEnable(app, true, maUserSel);
		util.Control.setEnable(app, !pbStatus, maUserIns);
	};
	
	var maUserIns = ["rptCmnUsrOperGrpNoUse"]; 
	var maUserSel = ["ipbUserNm", "ipbDeptNm",  "cbbUserDivRcd", "ipbUserId", "btnDeptPopUp", "btnUserSearch"];
	
	
	
	/*
	 * 부서값이 입력되었는지를 판단한다.
	 * 부서값이 없을 경우 사용자 ID, 사용자명 둘중 하나라도 입력값이 없으면
	 * false를 리턴한다.
	 * @return Boolean
	 * 
	 */
	moPage.checkInputDept = function() {
		var vbResult = false;
		
		var vsDeptNm = util.Control.getValue(app, "ipbDeptNm");
		
		if (ValueUtil.isNull(vsDeptNm)) {
			//사용자 ID, 사용자명중 하나는 필수
			var vsUserId = util.Control.getValue(app, "ipbUserId");
			var vsUserNm =  util.Control.getValue(app, "ipbUserNm");
			
			var vsLblbUserId = ExtControl.getTextValue("lblUserId");
			var vsLblbUserNm = ExtControl.getTextValue("lblUserNm");
			
			if( ValueUtil.isNull(vsUserId) && ValueUtil.isNull(vsUserNm) ){
				util.Msg.alert("NLS-CMM-M016", [vsLblbUserId +", " + vsLblbUserNm]);
			} else {
				vbResult = true;
			}
		
		}else {
			vbResult = true;
		
		}
		
		return vbResult;
	}	
	
	
	moPage.onClick_BtnUserSearch = function() {
		
		if(moPage.checkInputDept()){
			doListUserSch(function(pbSuccess){
				// 조회 : "조회되었습니다." header 메세지 표시
				if (pbSuccess) util.Msg.notify(app, "NLS.INF.M024");
		
			});
		
		}
		
		
	};
	
	
	moPage.onKeyDown_IpbRoleId = function(strKeyType, strKeyStatus) {
		// 엔터키 입력시 조회
		if(strKeyType == 13) { 
			util.Header.clickSearch(app);
		}
	};
	
	
	moPage.onKeyDown_IpbRoleNm = function(strKeyType, strKeyStatus) {
		// 엔터키 입력시 조회
		if(strKeyType == 13) { 
			util.Header.clickSearch(app);
		}
	};
	
	
	moPage.onRowSelect_RptCmnRole = function() {
		doListUsrOperGrp(function(pbSuccess){
			// 조회 : "조회되었습니다." header 메세지 표시
			if (pbSuccess) util.Msg.notify(app, "NLS.INF.M024");

		});
	};
	
	
	
	
	moPage.onClick_BtnUp = function() {
		//moveRoleUp();
		moPage.moveRoleUpWithSave();
	};
	
	
	moPage.onClick_BtnDown = function() {
		//moveRoleDown();
		moPage.moveRoleDownWithSave();
	};
	
	/**
	 * @desc 미사용 사용자를 등록 사용자로 등록 후 바로 저장
	 * @param 
	 * @return 
	 * @author 최경민 2015.11.23
	 */
	moPage.moveRoleUpWithSave = function(){
		
		var vsNoUseIdxs = util.Grid.getCheckOrSelectedRowIndex(app, "grdCmnUsrOperGrpNoUse");
		
		var vsNoUstRptNm = ExtRepeat.getLableIdValue("rptCmnUsrOperGrpNoUse");
		var vsUseRptNm = ExtRepeat.getLableIdValue("rptCmnUsrOperGrpUse");
		
		if(String(vsNoUseIdxs).isEmpty()){
			util.Msg.alert("NLS-INF-M045", [vsNoUstRptNm]);
			return;
		
		}
		
		var vaIdxsNoUse = null;
		if(String(vsNoUseIdxs).indexOf(",") != -1){
			vaIdxsNoUse = vsNoUseIdxs.split(",");
		}else{
			vaIdxsNoUse = new Array();
			vaIdxsNoUse[0] = vsNoUseIdxs;
		}
		
		for(var i = 0; i < vaIdxsNoUse.length; i++){
			var vnIdx = vaIdxsNoUse[i];
			var vnNewRowIdx = vnNewRowIdx = util.Grid.insertRow(app, "grdCmnUsrOperGrpUse");
			
			var vsUptStatus = util.Grid.getRowState(app, "grdCmnUsrOperGrpNoUse", vnIdx);
								
			var vsOprtRoleId = util.DataMap.getValue(app, "dmRoot", "reqListUsrOperGrp", "strOprtRoleId");
			
			var vsUserId = util.Grid.getCellValue(app, "grdCmnUsrOperGrpNoUse", "USER_ID", vnIdx);
			var vsUserNm = util.Grid.getCellValue(app, "grdCmnUsrOperGrpNoUse", "USER_NM", vnIdx);
			var vsAsgnDeptNm = util.Grid.getCellValue(app, "grdCmnUsrOperGrpNoUse", "ASGN_DEPT_NM", vnIdx);
			var vsId = util.Grid.getCellValue(app, "grdCmnUsrOperGrpNoUse", "ID", vnIdx);
			
			
			util.Grid.setCellValue(app, "grdCmnUsrOperGrpUse", "OPRT_ROLE_ID", vsOprtRoleId, vnNewRowIdx);
			util.Grid.setCellValue(app, "grdCmnUsrOperGrpUse", "USER_ID", vsUserId, vnNewRowIdx);
			util.Grid.setCellValue(app, "grdCmnUsrOperGrpUse", "USER_NM", vsUserNm, vnNewRowIdx);
			util.Grid.setCellValue(app, "grdCmnUsrOperGrpUse", "ASGN_DEPT_NM", vsAsgnDeptNm , vnNewRowIdx);
			util.Grid.setCellValue(app, "grdCmnUsrOperGrpUse", "ID", vsId, vnNewRowIdx);
			util.Grid.setCellValue(app, "grdCmnUsrOperGrpUse", "USER_TGT_RCD", "CC00301", vnNewRowIdx);
			
		}
		
		//저장
		doSave();
		
	};
	
	/**
	 * @desc 등록된 사용자를 등록해제 후 바로 저장
	 * @param 
	 * @return 
	 * @author 최경민 2015.11.23
	 */
	moPage.moveRoleDownWithSave = function(){
		
		var vsUseIdxs = util.Grid.getCheckOrSelectedRowIndex(app, "grdCmnUsrOperGrpUse");
		
		var vsNoUstRptNm = ExtRepeat.getLableIdValue("rptCmnUsrOperGrpNoUse");
		var vsUseRptNm = ExtRepeat.getLableIdValue("rptCmnUsrOperGrpUse");
		
		if(String(vsUseIdxs).isEmpty()){
			util.Msg.alert("NLS-INF-M045", [vsUseRptNm]);
			return;
		
		}
		
		var vaIdxsUse = null;
		if(String(vsUseIdxs).indexOf(",") != -1){
			vaIdxsUse = vsUseIdxs.split(",");
		}else{
			vaIdxsUse = new Array();
			vaIdxsUse[0] = vsUseIdxs;
		}
		
		for(var i = 0; i < vaIdxsUse.length; i++){
			var vnIdx = vaIdxsUse[i];
			var vnNewRowIdx = null;
			
			var vsUptStatus = util.Grid.getRowState(app, "grdCmnUsrOperGrpUse", vnIdx);
			
			util.Grid.deleteRow(app, "grdCmnUsrOperGrpUse", "UPT_STATUS", vnIdx);
			
			
		}
		
		//저장
		doSave();
	};
	
	/**
	 * @desc 저장실행
	 * @param 
	 * @return 
	 * @author 최경민 2015.11.23
	 */
	function doSave() {

		// 리피터 변경사항 체크
		if(!util.Grid.isModified(app, "grdCmnUsrOperGrpUse", "MSG")){
			return false;
		}
		//리피트 validation check
		if(!util.validate(app, "grdCmnUsrOperGrpUse")) return false;

		//strCommand: save 
		util.Submit.send(app, "subSave", function(pbSuccess){
			if(pbSuccess){
				doListUsrOperGrp(function(pbListSuccess) {
					// 조회 "갱신된 데이터가 조회되었습니다." header 메세지 표시
					if(pbListSuccess) util.Msg.notify(app, "NLS.INF.M025");
				});
			}
		});
	
	};
	
	moPage.onKeyDown_IpbUserNm = function(strKeyType, strKeyStatus) {
		// 엔터키 입력시
		if(e.keyCode == cpr.events.KeyCode.ENTER){
			if(moPage.checkInputDept()){
				doListUserSch(function(pbSuccess){
					// 조회 : "조회되었습니다." header 메세지 표시
					if (pbSuccess) util.Msg.notify(app, "NLS.INF.M024");

				});
			
			}
		
		}
	};
	
	function doListUserSch(poCallBackFunc){
		var vsOprtRoleId = util.DataMap.getValue(app, "dmRoot", "reqListUsrOperGrp", "strOprtRoleId");
		util.DataMap.setValue(app, "dmRoot", "reqListUserSch", "strOprtRoleId", vsOprtRoleId);
		
		//strCommand: listUserSch 
		util.Submit.send(app, "subListUserSch", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdCmnUsrOperGrpNoUse");
				doChangeForRptNoUseCondition(false);
				
				
				// 조회 후 콜백함수 수행
				if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
			}
		});
	
	};
	
	moPage.onKeyDown_IpbUserId = function(strKeyType, strKeyStatus) {
		// 엔터키 입력시
		if(e.keyCode == cpr.events.KeyCode.ENTER){
			if(moPage.checkInputDept()){
				doListUserSch(function(pbSuccess){
					// 조회 : "조회되었습니다." header 메세지 표시
					if (pbSuccess) util.Msg.notify(app, "NLS.INF.M024");
		
				});
			
			}
		
		}
	};
	
	
	moPage.onValueChanged_IpbDeptNm = function(sender) {
		doOnChangeStdCmnPObjSch(sender);
	};
	
	
	moPage.onKeyDown_IpbDeptNm = function(strKeyType, strKeyStatus, sender) {
		//// 엔터키 입력시
		//if(strKeyType == VKey.ENTER){
		//	doOnChangeStdCmnPObjSch(sender);
		//
		//}
	};
	
	moPage.onClick_BtnDeptPopUp = function(sender) {
		doOnClickStdCmnPObjSch(sender);
	};
	
	
	
	return moPage;
};
