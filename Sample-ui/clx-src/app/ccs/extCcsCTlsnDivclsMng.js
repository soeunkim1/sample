//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCcsCTlsnDivclsMng.xtm"/>

/**
 * 개설분반관리
 * @class extCcsCTlsnDivclsMng
 * @author 박갑수 at 2016. 4. 25
 */
var extCcsCTlsnDivclsMng = function() {
	var moPage = new Page();
	
	// 임포트용 데이터 통신 오브젝트
	var moPObject = new Page();
	
	// 객체검색팝업 호출
	moPObject.moIdsForStdCmnPObjSch = [
	{
		controlId			:	"btnDeptNm",
		iCd					:	"",
		iNm					:	"ipbDeptNm",
		iObjDivRcd			:	["CC009OG", "CC009SA"],
		iStartObject    	:   "",
		iOtDivRcd			:	"",
		iOtIsTreeView	:	"",
		iLanDivRcd		:	"/root/resOnLoad/strLanDivRcd",
		iKeyDate			:	"/root/keyDateMap/ST_DT",
		iKeyEndDate		:	"",
		oObjDivRcd		:	"/root/reqKey/strObjDivRcd",
		oCd					:	"/root/reqKey/strDeptCd",
		oCdNm				:	"ipbDeptNm",
		oBegDt				:	"",
		oEndDt				:	"",
		oLanDivRcd		:	"",
		func 					:  function(){
			
			// 소속부서에따른 교과그룹 필터링
			var vsObjDivRcd = util.DataMap.getValue(app, "dmReqKey", "strObjDivRcd");
			var vsDeptCd = util.DataMap.getValue(app, "dmReqKey", "strDeptCd");
			
			// 부서에따른 교과그룹 필터링
			if(ValueUtil.isNull(vsDeptCd)){
				util.Control.setValue(app, "cbbCuCd", "");
				util.Control.setEnable(app, false, ["cbbCuCd"]);
			}else {
				var vsKeyword = vsObjDivRcd + vsDeptCd;
				ExtControl.setAttr("cbbCuCd", "nodeset", "/root/resOnLoad/cuList/row[contains(PATH, '"+ vsKeyword +"')]");
				
				util.Control.setEnable(app, true, ["cbbCuCd"]);
				util.Control.redraw(app, "cbbCuCd");
			}
			
			// 검색조건이 있을경우 조회
			var vsSchYearRcd = util.Control.getValue(app, "cbbSchYearRcd");
			var vsSmtRcd = util.Control.getValue(app, "cbbSmtRcd");
			
			if(!ValueUtil.isNull(vsSchYearRcd) && !ValueUtil.isNull(vsSmtRcd) && !ValueUtil.isNull(vsDeptCd)){
				//ExtModel.dispatch("btnSearch", "DOMActivate");
			}
		}
	},
	{
		controlId			:	"rdBtnSaNm",
		iCd					:	"",
		iNm					:	"rdIpbSaNm",
		iObjDivRcd			:	["CC009SA"],
		iStartObject    	:   "",
		iOtDivRcd			:	"",
		iOtIsTreeView	:	"",
		iLanDivRcd		:	"/root/resOnLoad/strLanDivRcd",
		iKeyDate			:	"/root/keyDateMap/ST_DT",
		iKeyEndDate		:	"",
		oObjDivRcd		:	"rdIpbSaObjDivRcd",
		oCd					:	"rdIpbSaCd",
		oCdNm				:	"rdIpbSaNm",
		oBegDt				:	"",
		oEndDt				:	"",
		oLanDivRcd		:	"",
		func 					:  function(){
			
			var vnIdx = util.Grid.getIndex(app, "grdExtCcsEstDivcls");
			var vsDeptCd = util.Grid.getCellValue(app, "grdExtCcsEstDivcls", "SA_CD", vnIdx);
			var vsObjDivRcd = util.Grid.getCellValue(app, "grdExtCcsEstDivcls", "SA_OBJ_DIV_RCD", vnIdx);
			
			// 교과그룹 초기화
			util.Grid.setCellValue(app, "grdExtCcsEstDivcls", "CU_CD", "", vnIdx);
			
			// 부서에따른 교과그룹 필터링
			if(ValueUtil.isNull(vsDeptCd)){
				ExtControl.setAttr("rdCbbCuCd", "nodeset", "/root/resOnLoad/cuList/row");
			}else {
				var vsKeyword = vsObjDivRcd + vsDeptCd;
				ExtControl.setAttr("rdCbbCuCd", "nodeset", "/root/resOnLoad/cuList/row[contains(PATH, '"+ vsKeyword +"')]");
			}
			
			util.Control.redraw(app, "rdCbbCuCd");
		}
	}];
	
	// 학년도 학기를 원래데이터로 되돌리기위한 변수
	var msSchYearRcd = "";
	var msSmtRcd = "";
	
	/**
	 * @desc import 헤더 초기화
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 4. 25
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		// import 헤더 초기화
		doHeaderOnLoad();
	};
	
	/**
	 * @desc onLoad 실행
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 25
	 */
	moPage.onModelConstructDone_ExtCcsCTlsnDivclsMng = function() {
		// 리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["rptExtCcsEstDivcls"]);
		// 검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grpData"], ["cbbCuCd"]);
		
		// 서브미션 호출
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				
				util.Control.redraw(app, ["cbbSchYearRcd", "cbbSmtRcd", "cbbCuCd", "cbbSbLvlRcd", "cbbSchSbLvlRcd"]);
				
				util.Control.setEnable(app, false, ["cbbCuCd"]);
				
				util.Control.setFocus(app, "ipbDeptNm");
			}
		}, true);
	};
	
	/**
	 * @desc [cbbSchYearRcd]학년도 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 25
	 */
	moPage.onValueChanged_CbbSchYearRcd = function() {
		// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
		doChangeYearSmt("year");
		
		// 소속, 교과그룹 초기화
		doClearSchCtl();
	};
	
	/**
	 * @desc [cbbSmtRcd]학기 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 25
	 */
	moPage.onValueChanged_CbbSmtRcd = function() {
		// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
		doChangeYearSmt("smt");
		
		// 소속, 교과그룹 초기화
		doClearSchCtl();
	};
	
	/**
	 * @desc 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 25
	 */
	function doChangeYearSmt(psDiv) {
		//strCommand: date 
		util.Submit.send(app, "subDate", function(pbSuccess){
			if(pbSuccess){				
				msSchYearRcd = util.DataMap.getValue(app, "dmKeyDateMap", "YEAR");
				msSmtRcd = util.DataMap.getValue(app, "dmKeyDateMap", "SMT");
				
			// Exception 발생시
			}else {
				if(psDiv == "year"){
					util.Control.setValue(app, "cbbSchYearRcd", msSchYearRcd);
				}else if(psDiv == "smt"){
					util.Control.setValue(app, "cbbSmtRcd", msSmtRcd);
				}
			}
		});
	};
	
	/**
	 * @desc 학년도 학기 변경시 소속, 교과그룹정보 초기화
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 25
	 */
	function doClearSchCtl() {
		
		page.doCuList(
			function(){
				util.DataMap.setValue(app, "dmReqKey", "strDeptCd", "");
				util.DataMap.setValue(app, "dmReqKey", "strObjDivRcd", "");
				util.Control.setValue(app, "ipbDeptNm", "");
				util.Control.setValue(app, "cbbCuCd", "");
			}
		);
		
		
	};
	
	/**
	 * @desc [btnDeptNm]소속(돋보기버튼) onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 25
	 */
	moPage.onClick_BtnDeptNm = function(sender) {
		// 객체검색팝업 호출
		doOnClickStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc [IpbDeptNm]소속 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 25
	 */
	moPage.onValueChanged_IpbDeptNm = function(sender) {
		// 리피트 변경사항 체크
		if(util.Grid.isModified(app, ["grdExtCcsEstDivcls"])){
			return false;
		}
		
		// 값변경시 객체검색팝업 호출
		doOnChangeStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc [btnSearch]조회 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 25
	 */
	moPage.onClick_BtnSearch = function() {
		 // 작업영역 리피트 변경 내역 체크
		if(util.Grid.isModified(app, "", "CRM")){
			return false;
		}
		
		// 조회조건 필수 체크
		if(!util.validate(app, ["cbbSchYearRcd", "cbbSmtRcd", "ipbDeptNm"])){
			return false;
		}

		// 조회
		doList(function(pbSuccess) {
			// 조회 : "조회되었습니다." header 메세지 표시
			if (pbSuccess) util.Msg.notify(app, "NLS.INF.M024");
		});
	};
	
	/**
	 * @desc 학과별 반편성 목록 조회
	 * @param {Function} poCallBackFunc 콜백정의
	 * @return void
	 * @author 박갑수 at 2016. 4. 25
	 */
	function doList(poCallBackFunc) {
		
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdExtCcsEstDivcls");	
				// 조회 후 콜백함수 수행
				if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess); 
			}
		});
	};
	
	
	/**
	 * @desc 학과별 반편성 목록 조회
	 * @param {Function} poCallBackFunc 콜백정의
	 * @return void
	 * @author 박갑수 at 2016. 4. 25
	 */
	function doCuList(poCallBackFunc) {
		
		//strCommand: cuList 
		util.Submit.send(app, "subCuList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "cbbCuCd");	
				// 조회 후 콜백함수 수행
				if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess); 
			}
		});
	};
	
	
	
	/**
	 * @desc [btnNew]신규 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 25
	 */
	moPage.onClick_BtnNew = function() {
		// 해당 리피트 insert 후 편집 시작할 컬럼 지정
		var vnIdx = util.Grid.insertRow(app, "grdExtCcsEstDivcls");
		
		// 신규 Defalut값 설정 
		// 학년도 : 조회조건
		var vsSchYearRcd = util.Control.getValue(app, "cbbSchYearRcd");
		util.Grid.setCellValue(app, "grdExtCcsEstDivcls", "SCH_YEAR_RCD", vsSchYearRcd, vnIdx);
		
		// 학년도 : 조회조건
		var vsSmtRcd = util.Control.getValue(app, "cbbSmtRcd");
		util.Grid.setCellValue(app, "grdExtCcsEstDivcls", "SMT_RCD", vsSmtRcd, vnIdx);
		
		// 교과그룹객체구분 : CC009CU
		util.Grid.setCellValue(app, "grdExtCcsEstDivcls", "CU_OBJ_DIV_RCD", "CC009CU", vnIdx);
		
		ExtRepeat.setColFocus("rptExtCcsEstDivcls", vnIdx, "rdIpbSaNm");
	};
	
	/**
	 * @desc [btnDel]삭제 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 25
	 */
	moPage.onClick_BtnDel = function() {
		// 해당 리피트 delete
		util.Grid.deleteRow(app, "grdExtCcsEstDivcls");
	};
	
	/**
	 * @desc [btnRestore]작업취소 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 25
	 */
	moPage.onClick_BtnRestore = function() {
		// 해당 리피트 상태 초기화
		util.Grid.restoreRow(app, "grdExtCcsEstDivcls");
	};
	
	/**
	 * @desc [btnSave]작업저장 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 25
	 */
	moPage.onClick_BtnSave = function() {
		// 작업저장
		doSave();
	};
	
	/**
	 * @desc 학과별 반편성 목록 변경사항 저장
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 25
	 */
	function doSave() {
		
		// 리피트 변경사항 체크
		if(!util.Grid.isModified(app, ["grdExtCcsEstDivcls"], "MSG")){
			return false;
		}
		
		// 리피트 Validation Check
		if(!util.validate(app, "grdExtCcsEstDivcls")) return false;

		//strCommand: save 
		util.Submit.send(app, "subSave", function(pbSuccess){
			if(pbSuccess){
				doList(function(pbListSuccess) {
					// 조회 : "갱신된 데이터가 조회되었습니다." header 메세지 표시
					if (pbListSuccess) util.Msg.notify(app, "NLS.INF.M025");
				});
			}
		});
	};
	
	/**
	 * @desc [btnSaDivclsBat]학과별반정보일괄생성 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 25
	 */
	moPage.onClick_BtnSaDivclsBat = function() {
		
		var vsSbLvlRcd = util.Control.getValue(app, "cbbSbLvlRcd");
		
		var vsMsg0 = "";
		if(ValueUtil.isNull(vsSbLvlRcd)){
			vsMsg0 = NLS.NSCR.ALL;
		}else {
			vsMsg0 = ExtInstance.getValue("/root/resOnLoad/sbLvlRcdList/row", "CD_NM" , "child::CD='"+vsSbLvlRcd+"'");
		}

		//ExtSelectCtl.getItemLabel("cbbSbLvlRcd");
		// 기존에 있던 자료는 삭제됩니다.
		var vsMsg1 = NLS.APS.M002;
		var vsMsg2 = ExtControl.getTextValue("btnSaDivclsBat");
		
		var vsMsgParam = "("+vsMsg0+")" + " " + vsMsg1 + " " + vsMsg2
		
		// "@ 계속 진행하시겠습니까?" 메시지
		if(util.Msg.confirm("NLS-CRM-M034", [vsMsgParam]) ){
			//strCommand: saDivclsBat 
			util.Submit.send(app, "subSaDivclsBat", function(pbSuccess){
				if(pbSuccess){
					doList(function(pbListSuccess) {
						// "처리되었습니다." header 메세지 표시
						if (pbListSuccess) util.Msg.notify(app, "NLS.INF.M003");
					});
				}
			});
		}
	};
	
	/**
	 * @desc [rhCkbSelect]패널 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 25
	 */
	moPage.onValueChanged_RhCkbSelect = function() {
		// 리피트 패널 설정
//TO-BE: <ExtRepeat.selectedAllPanel> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.selectedAllPanel("rhCkbSelect");
	};
	
	/**
	 * @desc [rdIpbSaNm]학사부서 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 25
	 */
	moPage.onValueChanged_RdIpbSaNm = function(sender) {
		// 값변경시 객체검색팝업 호출
		doOnChangeStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc [rdBtnSaNm]학사부서 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 25
	 */
	moPage.onClick_RdBtnSaNm = function(sender) {
		// 객체검색팝업 호출
		doOnClickStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc [rptExtCcsEstDivcls]학과별 반편성 목록 onRowSelect 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 25
	 */
	moPage.onRowSelect_RptExtCcsEstDivcls = function() {
//TO-BE: <ExtControl.refreshBind> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtControl.refreshBind(["bindRptNew"]);
		
		var vnIdx = util.Grid.getIndex(app, "grdExtCcsEstDivcls");
		var vsDeptCd = util.Grid.getCellValue(app, "grdExtCcsEstDivcls", "SA_CD", vnIdx);
		var vsObjDivRcd = util.Grid.getCellValue(app, "grdExtCcsEstDivcls", "SA_OBJ_DIV_RCD", vnIdx);
		
		// 부서에따른 교과그룹 필터링
		if(ValueUtil.isNull(vsDeptCd)){
			ExtControl.setAttr("rdCbbCuCd", "nodeset", "/root/resOnLoad/cuList/row");
		}else {
			var vsKeyword = vsObjDivRcd + vsDeptCd;
			ExtControl.setAttr("rdCbbCuCd", "nodeset", "/root/resOnLoad/cuList/row[contains(PATH, '"+ vsKeyword +"')]");
		}
		
		util.Control.redraw(app, "rdCbbCuCd");
		
	};
	
	return moPage;
};
