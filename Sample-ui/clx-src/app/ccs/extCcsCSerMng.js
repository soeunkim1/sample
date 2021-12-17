//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCcsCSerMng.xtm"/>

/**
 * BI중계열관리
 * @class extCcsCBISerMng
 * @author 박갑수 at 2016. 10. 5
 */
var extCcsCSerMng = function() {
	var moPage = new Page();
	
	// 임포트용 데이터 통신 오브젝트
	var moPObject = new Page();
	
	// 객체검색팝업 호출
	moPObject.moIdsForStdCmnPObjSch = [
	{
		controlId			:	"rdBtnDeptCdNm",
		iCd					:	"",
		iNm					:	"rdIpbSaCdNm",
		iObjDivRcd			:	["CC009OG"],
		iStartObject    	:   "",
		iOtDivRcd			:	"",
		iOtIsTreeView	:	"",
		iLanDivRcd		:	"/root/resOnLoad/strLanDivRcd",
		iKeyDate			:	"/root/keyDateMap/ST_DT",
		iKeyEndDate		:	"",
		oObjDivRcd		:	"rdIpbSaObjDivRcd",
		oCd					:	"rdIpbSaCd",
		oCdNm				:	"rdIpbSaCdNm",
		oBegDt				:	"",
		oEndDt				:	"",
		oLanDivRcd		:	"",
		func 					:  function(poRtnValue){
		}
	}];
	
	// 학년도 학기를 원래데이터로 되돌리기위한 변수
	var msSchYearRcd = "";
	var msSmtRcd = "";
	
	/**
	 * @desc import 헤더 초기화
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 10. 5
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		// import 헤더 초기화
		doHeaderOnLoad();
	};
	
	/**
	 * @desc onLoad 실행
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 10. 5
	 */
	moPage.onModelConstructDone_ExtCcsCBISerMng = function() {
		// 리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["rptExtCcsBiSer"]);
		// 검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grpData"]);
		
		// 서브미션 호출
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				
				util.Control.redraw(app, ["cbbSchYearRcd"]);
				
				var vsSmtRcd = util.DataMap.getValue(app, "dmKeyDateMap", "SMT");
				// 1학기가 아닐경우 1학기로 세팅
				if(ValueUtil.fixNull(vsSmtRcd) != "CA00390"){
					util.DataMap.setValue(app, "dmKeyDateMap", "SMT", "CA00390");
					
					// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
					doChangeYearSmt("year");
				}
			}
		}, true);
	};
	
	/**
	 * @desc 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 10. 5
	 */
	function doChangeYearSmt(psDiv) {
		//strCommand: date 
		util.Submit.send(app, "subDate", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, ["dipKeyDate"]);
				
				msSchYearRcd = util.DataMap.getValue(app, "dmKeyDateMap", "YEAR");
				
			// Exception 발생시
			}else {
				if(psDiv == "year"){
					util.Control.setValue(app, "cbbSchYearRcd", msSchYearRcd);
				}
			}
		});
	};
	
	/**
	 * @desc [cbbSchYearRcd]학년도 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 10. 5
	 */
	moPage.onValueChanged_CbbSchYearRcd = function() {
		// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
		doChangeYearSmt("year");
	};
	
	/**
	 * @desc [btnSearch]조회 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 10. 5
	 */
	moPage.onClick_BtnSearch = function() {
		 // 작업영역 리피트 변경 내역 체크
		if(util.Grid.isModified(app, "", "CRM")){
			return false;
		}
		
		// 조회조건 필수 체크
		if(!util.validate(app, ["cbbSchYearRcd"])){
			return false;
		}

		// 조회
		doList(function(pbSuccess) {
			// 조회 : "조회되었습니다." header 메세지 표시
			if (pbSuccess) util.Msg.notify(app, "NLS.INF.M024");
		});
	};
	
	/**
	 * @desc  학과별 BI 중계열 목록 조회
	 * @param {Function} poCallBackFunc 콜백정의
	 * @return void
	 * @author 박갑수 at 2016. 10. 5
	 */
	function doList(poCallBackFunc) {

		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdExtCcsBiSer");	
				// 조회 후 콜백함수 수행
				if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess); 
			}
		});
	};
	
	/**
	 * @desc [rhCkbSelect]패널 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 10. 5
	 */
	moPage.onValueChanged_RhCkbSelect = function() {
		// 리피트 패널 설정
//TO-BE: <ExtRepeat.selectedAllPanel> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.selectedAllPanel("rhCkbSelect");
	};
	
	/**
	 * @desc [btnNew]신규 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 10. 5
	 */
	moPage.onClick_BtnNew = function() {
		// 해당 리피트 insert 후 편집 시작할 컬럼 지정
		var vnIdx = util.Grid.insertRow(app, "grdExtCcsBiSer", "rdIpbSaCdNm");
		
		// 신규 Defalut값 설정 
		// 학년도 : 조회조건
		var vsSchYearRcd = util.Control.getValue(app, "cbbSchYearRcd"); 
		util.Grid.setCellValue(app, "grdExtCcsBiSer", "SCH_YEAR_RCD", vsSchYearRcd, vnIdx);
	};
	
	/**
	 * @desc [btnDel]삭제 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 10. 5
	 */
	moPage.onClick_BtnDel = function() {
		// 해당 리피트 delete
		util.Grid.deleteRow(app, "grdExtCcsBiSer");
	};
	
	/**
	 * @desc [btnRestore]작업취소 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 10. 5
	 */
	moPage.onClick_BtnRestore = function() {
		// 해당 리피트 상태 초기화
		util.Grid.restoreRow(app, "grdExtCcsBiSer");
	};
	
	/**
	 * @desc [btnSave]작업저장 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 10. 5
	 */
	moPage.onClick_BtnSave = function() {
		// 작업저장
		doSave();
	};
	
	/**
	 * @desc 학과별 BI 중계열 목록 변경사항 저장
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 10. 5
	 */
	function doSave() {
		
		// 리피트 변경사항 체크
		if(!util.Grid.isModified(app, ["grdExtCcsBiSer"], "MSG")){
			return false;
		}
		
		// 리피트 Validation Check
		if(!util.validate(app, "grdExtCcsBiSer")) return false;

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
	 * @desc [rptExtCcsBiSer]학과별 BI 중계열 목록 onRowSelect 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 6
	 */
	moPage.onRowSelect_RptExtCcsBiSer = function() {
//TO-BE: <ExtControl.refreshBind> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtControl.refreshBind(["bindExtCcsBiSerNew"]);
	};
	
	/**
	 * @desc [rdBtnDeptCdNm]학사부서명 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 10. 5
	 */
	moPage.onClick_RdBtnDeptCdNm = function(sender) {
		// 객체검색팝업 호출
		doOnClickStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc [rdIpbDeptCdNm]학사부서명 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 10. 5
	 */
	moPage.onValueChanged_RdIpbDeptCdNm = function(sender) {
		// 값변경시 객체검색팝업 호출
		doOnChangeStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc [btnCopy]전년도복사 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 10. 5
	 */
	moPage.onClick_BtnCopy = function() {
		// 기존에 있던 자료는 삭제됩니다.
		var vsMsg1 = NLS.APS.M002;
		var vsMsg2 = ExtControl.getTextValue("btnCopy");
		
		var vsMsgParam = vsMsg1 + " " + vsMsg2 + "를"
		
		// "@ 계속 진행하시겠습니까?" 메시지
		if(util.Msg.confirm("NLS-CRM-M034", [vsMsgParam]) ){
			//strCommand: copy 
			util.Submit.send(app, "subCopy", function(pbSuccess){
				if(pbSuccess){
					doList(function(pbListSuccess) {
						// "처리되었습니다." header 메세지 표시
						if (pbListSuccess) util.Msg.notify(app, "NLS.INF.M003");
					});
				}
			});
		}
	};
	
	return moPage;
};
