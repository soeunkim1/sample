//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./stdCcsCSubRel.xtm"/>

/**
 * 동일대체선수과목 관리
 * @class stdCcsCSubRel
 * @author 박갑수 at 2016. 4. 18
 */
var stdCcsCSubRel = function() {
	var moPage = new Page();
	
	// 임포트용 데이터 통신 오브젝트
	var moPObject = new Page();
	
	// 객체검색팝업 호출
	moPObject.moIdsForStdCmnPObjSch = [
	{
		controlId			:	"btnSaCdNm",
		iCd					:	"",
		iNm					:	"ipbSaCdNm",
		iObjDivRcd			:	["CC009SA"],
		iStartObject    	:   "",
		iOtDivRcd			:	"",
		iOtIsTreeView	:	"",
		iLanDivRcd		:	"",
		iKeyDate			:	"/root/keyDateMap/ST_DT",
		iKeyEndDate		:	"",
		oObjDivRcd		:	"",
		oCd					:	"/root/reqKey/strSaCd",
		oCdNm				:	"ipbSaCdNm",
		oBegDt				:	"",
		oEndDt				:	"",
		oLanDivRcd		:	"",
		func 					:  function(){
			// 검색조건이 있을경우 조회
			var vsSchYearRcd = util.Control.getValue(app, "cbbSchYearRcd");
			var vsSmtRcd = util.Control.getValue(app, "cbbSmtRcd");
			var vsSaCd = util.DataMap.getValue(app, "dmReqKey", "strSaCd");
			
			if(!ValueUtil.isNull(vsSchYearRcd) && !ValueUtil.isNull(vsSmtRcd) && !ValueUtil.isNull(vsSaCd)){
				util.Header.clickSearch(app);
			}
		}
	},
	{
		controlId			:	"rdBtnSpvsDeptNm",
		iCd					:	"",
		iNm					:	"rdIpbSpvsDeptNm",
		iObjDivRcd			:	["CC009SA"],
		iStartObject    	:   "",
		iOtDivRcd			:	"",
		iOtIsTreeView	:	"",
		iLanDivRcd		:	"",
		iKeyDate			:	"",
		iKeyEndDate		:	"/root/keyDateMap/ST_DT",
		oObjDivRcd		:	"",
		oCd					:	"rdIpbSpvsDeptCd",
		oCdNm				:	"rdIpbSpvsDeptNm",
		oBegDt				:	"",
		oEndDt				:	"",
		oLanDivRcd		:	"",
		func 					:  function(){}
	},
	{
		controlId			:	"rdBtnConnDeptNm",
		iCd					:	"",
		iNm					:	"rdIpbConnDeptNm",
		iObjDivRcd			:	["CC009SA"],
		iStartObject    	:   "",
		iOtDivRcd			:	"",
		iOtIsTreeView	:	"",
		iLanDivRcd		:	"",
		iKeyDate			:	"",
		iKeyEndDate		:	"/root/keyDateMap/ST_DT",
		oObjDivRcd		:	"",
		oCd					:	"rdIpbConnDeptCd",
		oCdNm				:	"rdIpbConnDeptNm",
		oBegDt				:	"",
		oEndDt				:	"",
		oLanDivRcd		:	"",
		func 					:  function(){}
	}];
	
	// 교과목검색팝업 호출
	moPObject.moIdsForStdCcsPSubPopup = [
	{
		 controlId					: "btnSbCd",			
		 iEndYn						: "/root/reqKey/strSelEndYn",						
		 iLanDivRcd				: "",					
		 iKeyDate					: "/root/keyDateMap/ST_DT",		
		 iSbCd						: "",			
		 iSbNm						: "ipbSbNm",
		 iCmpDivRcd				: "", 			
		 iSpvsDeptCd				: "",		
		 iSpvsDeptNm			: "",		
		 iObjDivRcd				: "CC009SA",
		 oSbCd						: "/root/reqKey/strSbCd",					
		 oSbNm					: "ipbSbNm",
		 oSpvsColgCd			: "",			
		 oSpvsDeptCd			: "",			
		 oSpvsDeptNm			: "",	
		 oSbSmry					: "",		
		 oRegFeeXcpYn			: "",	
		 oSbAmt					: "",		
		 oCmpDivRcdNm		: "",		
		 oSbCatRcdNm			: "",	
		 func : function(poParam) {
			// 검색조건이 있을경우 조회
			var vsSchYearRcd = util.Control.getValue(app, "cbbSchYearRcd");
			var vsSmtRcd = util.Control.getValue(app, "cbbSmtRcd");
			var vsSbCd = util.DataMap.getValue(app, "dmReqKey", "strSbCd");
			
			if(!ValueUtil.isNull(vsSchYearRcd) && !ValueUtil.isNull(vsSmtRcd) && !ValueUtil.isNull(vsSbCd)){
				util.Header.clickSearch(app);
			}
		}
	 },
	 {
		 controlId					: "rdBtnSbNm",			
		 iEndYn						: "/root/reqKey/strEndYn",						
		 iLanDivRcd				: "",					
		 iKeyDate					: "/root/keyDateMap/ST_DT",		
		 iSbCd						: "",			
		 iSbNm						: "rdIpbSbNm",
		 iCmpDivRcd				: "", 			
		 iSpvsDeptCd				: "",		
		 iSpvsDeptNm			: "",		
		 iObjDivRcd				: "",
		 oSbCd						: "rdOptSbCd",					
		 oSbNm					: "rdIpbSbNm",
		 oPnt							: "rdIpbOldPnt",
		 oCmpDivRcd				: "rdCbbCmpDivRcd",
		 oSpvsColgCd			: "",			
		 oSpvsDeptCd			: "",			
		 oSpvsDeptNm			: "",	
		 oSbSmry					: "",		
		 oRegFeeXcpYn			: "",	
		 oSbAmt					: "",		
		 oCmpDivRcdNm		: "",		
		 oSbCatRcdNm			: "",	
		 func : function(poParam) {}
	 },
	{
		 controlId					: "rdBtnConnSbNm",			
		 iEndYn						: "",						
		 iLanDivRcd				: "",					
		 iKeyDate					: "/root/keyDateMap/ST_DT",		
		 iSbCd						: "",			
		 iSbNm						: "rdIpbConnSbNm",
		 iCmpDivRcd				: "", 			
		 iSpvsDeptCd				: "",		
		 iSpvsDeptNm			: "",		
		 iObjDivRcd				: "",
		 oSbCd						: "rdOptConnSbCd",			
		 oObjDivRcd				: "",			
		 oStDt						: "",			
		 oEndDt						: "",			
		 oLanDivRcd				: "",			
		 oRefKey					: "",			
		 oSbNm					: "rdIpbConnSbNm",			
		 oShortNm					: "",				
		 oPnt							: "rdIpbPnt",
		 oTheoTc					: "rdIpbTheoTc",		
		 oEpacTc					: "rdIpbEpacTc",	
		 oSpvsColgCd			: "",			
		 oSpvsDeptCd			: "",		
		 oSpvsDeptNm			: "",	
		 oCmpDivRcd				: "rdCbbConnCmpDivRcd",	
		 func : function(poParam) {}
	 }];
	 
	 // 학년도 학기를 원래데이터로 되돌리기위한 변수
	var msSchYearRcd = "";
	var msSmtRcd = "";
	 
	/**
	 * @desc import 헤더 초기화
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 4. 18
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		// import 헤더 초기화
		doHeaderOnLoad();
	};
	
	/**
	 * @desc onLoad 실행
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 18
	 */
	moPage.onModelConstructDone_StdCcsCSubRel = function() {
		// 리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["rptCcsSubRel"]);
		// 검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grpData"]);
		
		// 서브미션 호출
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				
				util.Control.redraw(app, ["cbbSchYearRcd", "cbbSmtRcd", "cbbSbRelRcd"]);
				util.Control.setFocus(app, "ipbSaCdNm");
				
				ExtControl.setAttr("rdCbbSbRelRcd", "bind", "bindSbRelRcd");
//TO-BE: <ExtControl.refreshBind> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//				ExtControl.refreshBind("bindSbRelRcd");
			}
		}, true);
	};
	
	/**
	 * @desc [cbbSchYearRcd]학년도 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 18
	 */
	moPage.onValueChanged_CbbSchYearRcd = function() {
		// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
		doChangeYearSmt("year");
	};
	
	/**
	 * @desc [cbbSmtRcd]학기 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 18
	 */
	moPage.onValueChanged_CbbSmtRcd = function() {
		// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
		doChangeYearSmt("smt");
	};
	
	/**
	 * @desc 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 18
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
	 * @desc [btnSaCdNm]학사부서명(돋보기버튼) onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 18
	 */
	moPage.onClick_BtnSaCdNm = function(sender) {
		// 객체검색팝업 호출
		doOnClickStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc [ipbSaCdNm]학사부서명 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 18
	 */
	moPage.onValueChanged_IpbSaCdNm = function(sender) {
		// 리피트 변경사항 체크
		if(util.Grid.isModified(app, ["grdCcsSubRel"])){
			return false;
		}
		
		// 값변경시 객체검색팝업 호출
		doOnChangeStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc [btnSbCd]교과목명(돋보기버튼) onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 18
	 */
	moPage.onClick_BtnSbCd = function(sender) {
		// 교과목관계 : 대체과목[CL1010001]
		var vsSbRelRcd = util.Control.getValue(app, "cbbSbRelRcd");
		if(ValueUtil.fixNull(vsSbRelRcd) == "CL1010001"){
			util.DataMap.setValue(app, "dmReqKey", "strSelEndYn", "Y");
		}else {
			util.DataMap.setValue(app, "dmReqKey", "strSelEndYn", "");
		}
		
		// 교과목검색팝업 호출
		doOnClickStdCcsPSubPopup(sender);
	};
	
	/**
	 * @desc [ipbSbNm]교과목명 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 18
	 */
	moPage.onValueChanged_IpbSbNm = function(sender) {
		// 리피트 변경사항 체크
		if(util.Grid.isModified(app, ["grdCcsSubRel"])){
			return false;
		}
		
		// 교과목관계 : 대체과목[CL1010001]
		var vsSbRelRcd = util.Control.getValue(app, "cbbSbRelRcd");
		if(ValueUtil.fixNull(vsSbRelRcd) == "CL1010001"){
			util.DataMap.setValue(app, "dmReqKey", "strSelEndYn", "Y");
		}else {
			util.DataMap.setValue(app, "dmReqKey", "strSelEndYn", "");
		}
		
		// 값변경시 교과목검색팝업 호출
		doOnChangeStdCcsPSubPopup(sender);
	};

	/**
	 * @desc [btnSearch]조회 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 18
	 */
	moPage.onClick_BtnSearch = function() {
		// 작업영역 리피트 변경 내역 체크
		if(util.Grid.isModified(app, "", "CRM")){
			return false;
		}
		
		// 조회조건 필수 체크
		if(!util.validate(app, ["cbbSchYearRcd", "cbbSmtRcd", "ipbSaCdNm"])){
			return false;
		}
		
//		// 조회조건 필수체크 - 학사부서, 교과목명 중 한개는 입력되었는지 확인.
//		if(!moPage.checkNotNullCtl()){
//			return false;
//		}
//
		// 조회
		doList(function(pbSuccess) {
			if (pbSuccess){
				// 조회 : "조회되었습니다." header 메세지 표시
				util.Msg.notify(app, "NLS.INF.M024");
			}
		});
	};
	
	/**
	 * @desc 학사부서, 교과목명 중 한개는 입력되었는지 확인.
	 * @param 
	 * @return boolean
	 * @author 박갑수 at 2016. 4. 18
	 */
	moPage.checkNotNullCtl = function() {
		var vbValid = true;
		
		// 학사부서명
		var vsSaNm = util.Control.getValue(app, "ipbSaCdNm");
		// 교과목명
		var vsSbCdNm = util.Control.getValue(app, "ipbSbNm");
		
		if(ValueUtil.isNull(vsSaNm) && ValueUtil.isNull(vsSbCdNm)){
			var vsMsgParam = ExtControl.getTextValue("lblSaCdNm") + ", " + ExtControl.getTextValue("lblSbNm");
			
			// "조회조건[@1] 중 하나는 반드시 입력해야 합니다." 메시지 표시
			util.Msg.alert("NLS-CMM-M016", [vsMsgParam]);
			
			vbValid = false;
			return vbValid;
		}
		
		return vbValid;
	};
	
	/**
	 * @desc  동일대체선수과목관리 조회
	 * @param {Function} poCallBackFunc 콜백정의
	 * @return void
	 * @author 박갑수 at 2016. 4. 18
	 */
	function doList(poCallBackFunc) {

		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdCcsSubRel");	
				// 조회 후 콜백함수 수행
				if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess); 
			}
		});
	};
	
	
	
	/**
	 * @desc  동일대체선수과목관리 조회
	 * @param {Function} poCallBackFunc 콜백정의
	 * @return void
	 * @author 박갑수 at 2016. 4. 18
	 */
	function doBatch(poCallBackFunc) {

		//strCommand: batch 
		util.Submit.send(app, "subBatch", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdCcsSubRel");	
				// 조회 후 콜백함수 수행
				if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess); 
			}
		});
	};
	
	
	
	/**
	 * @desc [btnNew]신규 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 18
	 */
	moPage.onClick_BtnNew = function() {
		
		// 해당 리피트 insert 후 편집 시작할 컬럼 지정
		var vnIdx = util.Grid.insertRow(app, "grdCcsSubRel");
		
		ExtRepeat.setColFocus("rptCcsSubRel", vnIdx, "rdIpbSbNm");
		
		// 신규 Defalut값 설정 
		// 시작일자 : 조회조건 학기 시작일자
		var vsStDt = util.DataMap.getValue(app, "dmKeyDateMap", "ST_DT");
		util.Grid.setCellValue(app, "grdCcsSubRel", "ST_DT", vsStDt, vnIdx);
		
		// 종료일자 : 조회조건 학기 시작일자
		var vsEndDt = util.DataMap.getValue(app, "dmKeyDateMap", "END_DT");
		util.Grid.setCellValue(app, "grdCcsSubRel", "END_DT", vsEndDt, vnIdx);
		
		// 학사부서 : 조회조건 학사부서
		var vsSaNm = util.DataMap.getValue(app, "dmReqKey", "strSaCdNm");
		util.Grid.setCellValue(app, "grdCcsSubRel", "SPVS_DEPT_NM", vsSaNm, vnIdx);
		
		// 학사부서코드 : 조회조건 학사부서코드
		var vsSaCd = util.DataMap.getValue(app, "dmReqKey", "strSaCd");
		util.Grid.setCellValue(app, "grdCcsSubRel", "SPVS_DEPT_CD", vsSaCd, vnIdx);
		
		// 연계부서 : 조회조건 학사부서
		var vsSaNm = util.DataMap.getValue(app, "dmReqKey", "strSaCdNm");
		util.Grid.setCellValue(app, "grdCcsSubRel", "CONN_DEPT_NM", vsSaNm, vnIdx);
		
		// 연계부서코드 : 조회조건 학사부서코드
		var vsSaCd = util.DataMap.getValue(app, "dmReqKey", "strSaCd");
		util.Grid.setCellValue(app, "grdCcsSubRel", "CONN_DEPT_CD", vsSaCd, vnIdx);
		
		// 관계구분 : 조회조건 관계구분코드
		var vsSbRelRcd = util.DataMap.getValue(app, "dmReqKey", "strSbRelRcd");
		if(vsSbRelRcd == "" || vsSbRelRcd == null){
			vsSbRelRcd = "CL1010001";
		}
		util.Grid.setCellValue(app, "grdCcsSubRel", "SB_REL_RCD", vsSbRelRcd, vnIdx);
	};
	
	/**
	 * @desc [btnDel]삭제 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 18
	 */
	moPage.onClick_BtnDel = function() {
		// 해당 리피트 delete
		util.Grid.deleteRow(app, "grdCcsSubRel");
	};
	
	/**
	 * @desc [btnRestore]작업취소 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 18
	 */
	moPage.onClick_BtnRestore = function() {
		// 해당 리피트 상태 초기화
		util.Grid.restoreRow(app, "grdCcsSubRel");
	};
	
	/**
	 * @desc [btnSave]작업저장 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 18
	 */
	moPage.onClick_BtnSave = function() {
		// 작업저장
		doSave();
	};
	
	/**
	 * @desc 동일대체선수과목관리 변경사항 저장
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 18
	 */
	function doSave() {
		
		// 리피트 변경사항 체크
		if(!util.Grid.isModified(app, ["grdCcsSubRel"], "MSG")){
			return false;
		}
		
		// 리피트 Validation Check
		if(!util.validate(app, "grdCcsSubRel")) return false;

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
	 * @desc [rhCkbSelect]패널 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 18
	 */
	moPage.onValueChanged_RhCkbSelect = function() {
		// 리피트 패널 설정
//TO-BE: <ExtRepeat.selectedAllPanel> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.selectedAllPanel("rhCkbSelect");
	};
	
	/**
	 * @desc [rdBtnSpvsDeptNm]부서명 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 18
	 */
	moPage.onClick_RdBtnSpvsDeptNm = function(sender) {
		// 객체검색팝업 호출
		doOnClickStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc [RdIpbSpvsDeptNm]부서명 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 18
	 */
	moPage.onValueChanged_RdIpbSpvsDeptNm = function(sender) {
		// 값변경시 객체검색팝업 호출
		doOnChangeStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc [rdBtnSbNm]교과목명 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 18
	 */
	moPage.onClick_RdBtnSbNm = function(sender) {
		// 교과목관계 : 대체과목[CL1010001]
		var vsSbRelRcd = util.Grid.getCellValue(app, "grdCcsSubRel", "SB_REL_RCD");
		
		if(ValueUtil.fixNull(vsSbRelRcd) == "CL1010001"){
			util.DataMap.setValue(app, "dmReqKey", "strEndYn", "Y");
		}else {
			util.DataMap.setValue(app, "dmReqKey", "strEndYn", "");
		}
		
		// 교과목검색팝업 호출
		doOnClickStdCcsPSubPopup(sender);
	};
	
	/**
	 * @desc [rdIpbSbNm]교과목명 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 18
	 */
	moPage.onValueChanged_RdIpbSbNm = function(sender) {
		// 교과목관계 : 대체과목[CL1010001]
		var vsSbRelRcd = util.Grid.getCellValue(app, "grdCcsSubRel", "SB_REL_RCD");
		
		if(ValueUtil.fixNull(vsSbRelRcd) == "CL1010001"){
			util.DataMap.setValue(app, "dmReqKey", "strEndYn", "Y");
		}else {
			util.DataMap.setValue(app, "dmReqKey", "strEndYn", "");
		}
		
		// 값변경시 교과목검색팝업 호출
		doOnChangeStdCcsPSubPopup(sender);
	};
	
	/**
	 * @desc [rdBtnConnDeptNm]연계부서명 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 18
	 */
	moPage.onClick_RdBtnConnDeptNm = function(sender) {
		// 객체검색팝업 호출
		doOnClickStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc [rdIpbConnDeptNm]연계부서명 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 18
	 */
	moPage.onValueChanged_RdIpbConnDeptNm = function(sender) {
		// 값변경시 객체검색팝업 호출
		doOnChangeStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc [rdIpbConnSbNm]연계교과목명 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 18
	 */
	moPage.onValueChanged_RdIpbConnSbNm = function(sender) {
		// 값변경시 교과목검색팝업 호출
		doOnChangeStdCcsPSubPopup(sender);
	};
	
	/**
	 * @desc [rdIpbSbNm]연계교과목명 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 18
	 */
	moPage.onClick_RdBtnConnSbNm = function(sender) {
		// 교과목검색팝업 호출
		doOnClickStdCcsPSubPopup(sender);
	};
	
	/**
	 * @desc [rdIpbPnt]학점 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 18
	 */
	moPage.onValueChanged_RdIpbPnt = function() {
		ValidUtil.checkIntegerDecimal("rdIpbPnt", 3, 2, true);
	};
	
	/**
	 * @desc [rdIpbTheoTc]이론 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 18
	 */
	moPage.onValueChanged_RdIpbTheoTc = function() {
		ValidUtil.checkIntegerDecimal("rdIpbTheoTc", 3, 2, true);
	};
	
	/**
	 * @desc [rdIpbEpacTc]실습 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 18
	 */
	moPage.onValueChanged_RdIpbEpacTc = function() {
		ValidUtil.checkIntegerDecimal("rdIpbEpacTc", 3, 2, true);
	};
	
	/**
	 * @desc [rptCcsSubRel]동일대체선수과목관리 onRowSelect 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 18
	 */
	moPage.onRowSelect_RptCcsSubRel = function() {
//TO-BE: <ExtControl.refreshBind> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtControl.refreshBind(["bindCcsSubRelNew", "bindRelRange", "bindSbRelRcd"]);
	};

	
	moPage.onClick_BtnSave1 = function() {
		
		if(util.Msg.confirm("NLS-CCS-M090") != MsgBox.IDOK) return false;
		
		
		// 작업저장
		doBatch();
	}
	return moPage;
};
