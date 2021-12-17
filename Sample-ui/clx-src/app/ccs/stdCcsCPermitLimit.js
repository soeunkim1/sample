//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./stdCcsCPermitLimit.xtm"/>

/**
 * 수강신청제한대상그룹관리
 * @class stdCcsCPermitLimit
 * @author 박갑수 at 2016. 4. 7
 */
var stdCcsCPermitLimit = function() {
	var moPage = new Page();
	
	// 임포트용 데이터 통신 오브젝트
	var moPObject = new Page();
	
	// 객체검색팝업 호출
	moPObject.moIdsForStdCmnPObjSch = [
	{
		controlId			:	"btnDeptNm",
		iCd					:	"",
		iNm					:	"ipbDeptNm",
		iObjDivRcd			:	["CC009SA"],
		iStartObject    	:   "",
		iOtDivRcd			:	"",
		iOtIsTreeView	:	"",
		iLanDivRcd		:	"",
		iKeyDate			:	"dipKeyDate",
		oObjDivRcd		:	"/root/reqKey/strSaObjDivRcd",
		oCd					:	"/root/reqKey/strSaCd",
		oCdNm				:	"ipbDeptNm",
		oBegDt				:	"",
		oEndDt				:	"",
		oLanDivRcd		:	"",
		func 					:  function(){
			var vsSchYearRcd = util.Control.getValue(app, "cbbSchYearRcd");
			var vsSmtRcd = util.Control.getValue(app, "cbbSmtRcd");
			var vsKeyDate = util.Control.getValue(app, "dipKeyDate");
			var vsDeptNm = util.Control.getValue(app, "ipbDeptNm");
			// 검색조건있을경우 바로조회
			if(!ValueUtil.isNull(vsSchYearRcd) && !ValueUtil.isNull(vsSmtRcd)  && !ValueUtil.isNull(vsKeyDate) && !ValueUtil.isNull(vsDeptNm)){
				util.Header.clickSearch(app);
			}
		}
	},
	{
		controlId			:	"rdBtnDtlSaCdNm",
		iCd					:	"",
		iNm					:	"rdIpbDtlSaCdNm",
		iObjDivRcd			:	["CC009SA"],
		iStartObject    	:   "",
		iOtDivRcd			:	"",
		iOtIsTreeView	:	"",
		iLanDivRcd		:	"",
		iKeyDate			:	"dipKeyDate",
		oObjDivRcd		:	"rdIpbDtlSaObjDivRcd",
		oCd					:	"rdIpbDtlSaCd",
		oCdNm				:	"rdIpbDtlSaCdNm",
		oBegDt				:	"",
		oEndDt				:	"",
		oLanDivRcd		:	"",
		func 					:  function(){
			var vnIdx = util.Grid.getIndex(app, "grdCcsPermitLimit");
			
			// 이수과정 초기화
			util.Grid.setCellValue(app, "grdCcsPermitLimit", "SP_DIV_RCD", "", vnIdx);
			
			var vsSaNm = util.Grid.getCellValue(app, "grdCcsPermitLimit", "SA_CD_NM", vnIdx);
			if(!ValueUtil.isNull(vsSaNm)){

				// 그룹컬럼 초기화
				util.Grid.setCellValue(app, "grdCcsPermitLimit", "GRP_CD", "", vnIdx);
				util.Grid.setCellValue(app, "grdCcsPermitLimit", "GRP_CD_NM", "", vnIdx);
			}
		}
	}];
	
	// 개설과목검색팝업 호출
	moIdsForStdCcsPOpenSubPopup = [
	{ 
		 controlId					: "btnSbCd",			
		 iDivClsYn					: "",		
		 iLanDivRcd				: "",
		 iKeyDate             		: "dipKeyDate",
		 iSchYearRcd             : "cbbSchYearRcd",
		 iSmtRcd             		: "cbbSmtRcd",
		 iSaCd        				: "/root/reqKey/strSaCd",			
		 iSaNm        				: "ipbDeptNm",		
		 iSaObjDivRcd       		: "/root/reqKey/strSaObjDivRcd",		
		 iSbCd        				: "",			
		 iSbNm        				: "ipbSbNm",		
		 iCmpDivRcd        		: "",			
		 
		 oSpCd						: "",			
		 oSpNm					: "",			
		 oSbCd						: "/root/reqKey/strSbCd",			
		 oSbNm					: "ipbSbNm",			
		 oSaCd						: "/root/reqKey/strSaCd",			
		 oSaNm					: "ipbDeptNm",			
		 oCuCd						: "",
		 oCuNm					: "",
		 oSchYearRcd			: "",
		 oSmtRcd					: "",
		 oDivclsCd					: "",
		 oDivclsNm				: "",
		 oCmpDivRcd				: "",
		 oPnt							: "",
		 oTheoTc					: "",
		 oEpacTc					: "",	
		 oSbDivRcd				: "",
		 oSbTypeRcd				: "",
		 oSaPostDivRcd			: "",		
		 oProfNo					: "",
		 oProfNm					: "",
		 oLectRoomNm			: "",		
		 oRefKey					: "",
		 func : function(poParam) {
			var vsSchYearRcd = util.Control.getValue(app, "cbbSchYearRcd");
			var vsSmtRcd = util.Control.getValue(app, "cbbSmtRcd");
			var vsKeyDate = util.Control.getValue(app, "dipKeyDate");
			var vsSbNm = util.Control.getValue(app, "ipbSbNm");
			// 검색조건있을경우 바로조회
			if(!ValueUtil.isNull(vsSchYearRcd) && !ValueUtil.isNull(vsSmtRcd)  && !ValueUtil.isNull(vsKeyDate) && !ValueUtil.isNull(vsSbNm)){
				util.Header.clickSearch(app);
			}
		 }
	 }];
	 
	// 그룹검색팝업 호출
	moIdsForStdCcsPLimitGroup = [
	{
		 controlId					: "rdBtnDtlGrdCdNm",			
		 iGrpCd						: "",	
		 iGrpNm					: "rdIpbDtlGrdCdNm",
		 iKeyDate					: "dipKeyDate",
		 oGrpCd					: "rdIpbDtlGrpCd",
		 oGrpNm					: "rdIpbDtlGrdCdNm",
		 func : function(poParam) { 
		 //팝업끝난후  후처리가 필요할때 입력
			var vsGrpCd = util.Grid.getCellValue(app, "grdCcsPermitLimit", "GRP_CD");
			if(!ValueUtil.isNull(vsGrpCd)){

				// 그룹컬럼 초기화
				util.Grid.setCellValue(app, "grdCcsPermitLimit", "SA_CD", "");
				util.Grid.setCellValue(app, "grdCcsPermitLimit", "SA_OBJ_DIV_RCD", "");
				util.Grid.setCellValue(app, "grdCcsPermitLimit", "SA_CD_NM", "");
				util.Grid.setCellValue(app, "grdCcsPermitLimit", "SP_DIV_RCD", "");			
			}
		 }
	 }];

	// 학년도 학기를 원래데이터로 되돌리기위한 변수
	var msSchYearRcd = "";
	var msSmtRcd = "";
	
	/**
	 * @desc import 헤더 초기화
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 4. 7
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		// import 헤더 초기화
		doHeaderOnLoad();
	};
	
	/**
	 * @desc onLoad 실행
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 7
	 */
	moPage.onModelConstructDone_StdCcsCPermitLimit = function() {
		// 리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["rptCcsOpenSub", "rptCcsPermitLimit"]);
		// 검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grpData", "grpDataDtl"]);

		// 서브미션 호출
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				
				util.Control.redraw(app, ["cbbSchYearRcd", "cbbSmtRcd", "dipKeyDate"]);
				
				// 학년도 학기값 되돌리기위한 값
				msSchYearRcd = util.DataMap.getValue(app, "dmKeyDateMap", "YEAR");
				msSmtRcd = util.DataMap.getValue(app, "dmKeyDateMap", "SMT");
				
				util.Control.setFocus(app, "ipbDeptNm");
			}
		}, true);
	};
	
	/**
	 * @desc [cbbSchYearRcd]학년도 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 7
	 */
	moPage.onValueChanged_CbbSchYearRcd = function() {
		// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
		doChangeYearSmt("year");
	};
	
	/**
	 * @desc [cbbSmtRcd]학기 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 7
	 */
	moPage.onValueChanged_CbbSmtRcd = function() {
		// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
		doChangeYearSmt("smt");
	};
	
	/**
	 * @desc 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 7
	 */
	function doChangeYearSmt(psDiv) {
		//strCommand: date 
		util.Submit.send(app, "subDate", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, ["dipKeyDate"]);
				
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
	 * @desc [btnDeptNm]부서명(돋보기버튼) onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 7
	 */
	moPage.onClick_BtnDeptNm = function(sender) {
		// 객체검색팝업 호출
		doOnClickStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc [ipbDeptNm]부서명 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 7
	 */
	moPage.onValueChanged_IpbDeptNm = function(sender) {
		// 리피트 변경사항 체크
		if(util.Grid.isModified(app, ["grdCcsPermitLimit"])){
			return false;
		}
		
		// 값변경시 객체검색팝업 호출
		doOnChangeStdCmnPObjSch(sender);
	};
	
	 /**
	 * @desc [btnSbCd]개설과목(돋보기버튼) onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 7
	 */
	moPage.onClick_BtnSbCd = function(sender) {
		// 개설과목검색팝업 호출
		doOnClickStdCcsPOpenSubPopup(sender);
	};
	
	/**
	 * @desc [ipbDeptNm]개설과목 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 7
	 */
	moPage.onValueChanged_IpbSbNm = function(sender) {
		// 리피트 변경사항 체크
		if(util.Grid.isModified(app, ["grdCcsPermitLimit"])){
			return false;
		}
		
		// 값변경시 교과목검색팝업 호출
		doOnChangeStdCcsPOpenSubPopup(sender);
	};
	
	/**
	 * @desc [btnSearch]조회 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 7
	 */
	moPage.onClick_BtnSearch = function() {
		// 작업영역 리피트 변경 내역 체크
		if(util.Grid.isModified(app, "", "CRM")){
			return false;
		}
		
		// 조회조건 필수 체크
		if(!util.validate(app, ["cbbSchYearRcd", "cbbSmtRcd", "dipKeyDate", "ipbDeptNm"])){
			return false;
		}

		// 조회
		doList(function(pbSuccess) {
			if (pbSuccess){
				// 조회 : "조회되었습니다." header 메세지 표시
				util.Msg.notify(app, "NLS.INF.M024");
			}
		});
	};
	
	/**
	 * @desc 분반 목록 조회
	 * @param poCallBackFunc 콜백정의
	 * @return void
	 * @author 박갑수 at 2016. 4. 7
	 */
	function doList(poCallBackFunc) {
		// 디테일 리피트 변경시 변경내역 체크 방지
		util.Control.redraw(app, "grdCcsPermitLimit");
		
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdCcsOpenSub");
			
				// 마스터에 데이터가 없을 경우 디테일 입력 불가
				if(util.Grid.getRowCount(app, "grdCcsOpenSub") < 1){
					util.Control.setEnable(app, false,["grpDataDtl"]);
					util.Control.reset(app, "rptCcsPermitLimit");
				}else{
					// 각 컨트롤 활성화 제어
					doDtlRptStatus();
				}
			}
			
			// 조회 후 콜백함수 수행
			if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
		});
	};
	
	/**
	 * @desc 디테일 데이터의 변경내역이 존재여부에 따른 마스터 활성/비활성
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 7
	 */
	function doDtlRptStatus(){
		if(util.Grid.isModified(app, "grdCcsPermitLimit")){
			util.Control.setEnable(app, false, ["grpData"]);
		}else{
			util.Control.setEnable(app, true, ["grpData"]);
		}
	};
	
	/**
	 * @desc [rptCcsOpenSub]강의목록 onRowSelect 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 7
	 */
	moPage.onRowSelect_RptCcsOpenSub = function() {
		// 수강신청 제한/대상 목록
		doListDtl();
	};
	
	/**
	 * @desc 휴보강 목록 조회
	 * @param poCallBackFunc 콜백정의
	 * @return void
	 * @author 박갑수 at 2016. 4. 7
	 */
	function doListDtl(poCallBackFunc) {
		
		// 참조키
		util.DataMap.setValue(app, "dmReqSelRow", "strRefKey", util.Grid.getCellValue(app, "grdCcsOpenSub", "REF_KEY"));
		//strCommand: listPermit 
		util.Submit.send(app, "subListDtl", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdCcsPermitLimit");
			}
			
			// 조회 후 콜백함수 수행
			if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
		});
	};

	/**
	 * @desc [btnNewDtl]신규 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 7
	 */
	moPage.onClick_BtnNewDtl = function() {
		// 신규로우 추가
		var vnIdx = util.Grid.insertRow(app, "grdCcsPermitLimit", "rdCbbDtlShyrRcd");
		
		// 신규 Defalut값 설정 
		// 참조키 : 마스터목록
		var vsRefKey = util.DataMap.getValue(app, "dmReqSelRow", "strRefKey");
		util.Grid.setCellValue(app, "grdCcsPermitLimit", "REF_KEY", vsRefKey, vnIdx);
		
		// 그룹구분 : 학사부서 defalut
		util.Grid.setCellValue(app, "grdCcsPermitLimit", "IS_SA_OR_GRP", "SA", vnIdx);
		
		// 디테일 리피트 상태에 따른 마스터 활성화 제어
		doDtlRptStatus();
	};
	
	/**
	 * @desc [btnDelDtl]삭제 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 7
	 */
	moPage.onClick_BtnDelDtl = function() {
		// 삭제
		util.Grid.deleteRow(app, "grdCcsPermitLimit");
		// 디테일 리피트 상태에 따른 마스터 활성화 제어
		doDtlRptStatus();
	};
	
	/**
	 * @desc [btnRestoreDtl]작업취소 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 7
	 */
	moPage.onClick_BtnRestoreDtl = function() {
		// 작업취소
		util.Grid.restoreRow(app, "grdCcsPermitLimit");
		// 디테일 리피트 상태에 따른 마스터 활성화 제어
		doDtlRptStatus();
	};
	
	/**
	 * @desc [btnSaveDtl]작업저장 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 7
	 */
	moPage.onClick_BtnSaveDtl = function() {
		// 작업저장
		doSave();
	};
	
	/**
	 * @desc 수강신청 제한/대상 목록 변경사항 저장
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 7
	 */
	function doSave() {
		
		// 리피트 변경사항 체크
		if(!util.Grid.isModified(app, ["grdCcsPermitLimit"], "MSG")){
			return false;
		}
		
		// 리피트 Validation Check		
		if(!util.validate(app, "grdCcsPermitLimit")) return false;
		
		// 제한, 대상 동시입력 확인
		if(!doCheckDup()){
			return false;
		}
		
		// 리피트 필수값 : 그룹명, 학사부서명 필수체크
		if(!moPage.checkNotNullRpt()){
			return false;
		}
		
		//strCommand: save 
		util.Submit.send(app, "subSave", function(pbSuccess){
			if(pbSuccess){
				doListDtl(function(pbListSuccess) {
					// 조회 : "갱신된 데이터가 조회되었습니다." header 메세지 표시
					if (pbListSuccess) util.Msg.notify(app, "NLS.INF.M025");
					
					// 디테일 리피트 상태에 따른 마스터 활성화 제어
					doDtlRptStatus();
				});
			}
		});
	};
	
	 /**
	 * @desc 데이터 중복 체크 - 제한, 대상 동시입력 확인
	 * @param 
	 * @return boolean
	 * @author 박갑수 at 2016. 4. 7
	 */
	function doCheckDup() {
		// 유효성 true or false
		var vbValid = true;
		
		// 리피트 ID
		var vsRptId = "rptCcsPermitLimit";
		// 리피트 RowCnt
		var vnRowCnt 	= util.Grid.getRowCount(app, vsRptId);		
		// 리피트 인덱스
		var vnRptIndex 	= util.Grid.getIndex(app, vsRptId);	
		
		for (var i = 1; i <= vnRowCnt; i++) {
			
			var vsUptStatusOri = util.Grid.getCellValue(app, vsRptId, "UPT_STATUS", i);
			// 삭제일경우 Skip
			if (vsUptStatusOri == "D") continue;
			
			var vsLimitDivRcdOri = util.Grid.getCellValue(app, vsRptId, "LIMIT_DIV_RCD", i);		// 대상/제한구분
			
			for (var j = 1; j <= vnRowCnt; j++) {
				// 같은 row일경우 Skip
				if (i == j) continue;
				
				var vsUptStatus = util.Grid.getCellValue(app, vsRptId, "UPT_STATUS", j);
				// 삭제일경우 Skip
				if (vsUptStatus == "D") continue;
				
				var vsLimitDivRcd = util.Grid.getCellValue(app, vsRptId, "LIMIT_DIV_RCD", j);		// 비교값 : 대상/제한구분
				
				// 중복체크
				if (vsLimitDivRcdOri != vsLimitDivRcd) {					
					// "제한/대상을 동시에 입력할 수 없습니다." 메시지
					util.Msg.alert("NLS-CCS-M032");
					vbValid = false;
					return vbValid;
				}
			}
		}
		
		return vbValid;
	};
	
	/**
	 * @desc 그룹명, 학사부서명 필수체크
	 * @param 
	 * @return boolean
	 * @author 박갑수 at 2016. 4. 7
	 */
	moPage.checkNotNullRpt = function() {
		// 유효성 true or false
		var vbValid = true;
		
		var vsRptId = "rptCcsPermitLimit"
		// 리피트 RowCnt
		var vnRowCnt 	= util.Grid.getRowCount(app, vsRptId);		
		// 리피트 인덱스
		var vnRptIndex 	= util.Grid.getIndex(app, vsRptId);
		
		for (var i = 1; i <= vnRowCnt; i++) {
			var vsUptStatus = util.Grid.getCellValue(app, vsRptId, "UPT_STATUS", i);
			// 변경이없거나 삭제일경우 Skip
			if (ValueUtil.isNull(vsUptStatus) || vsUptStatus == "D") continue;
			
			// 그룹구분 : 그룹[GRP], 학사부서[SA]
			var vsIsSaOrGrp = util.Grid.getCellValue(app, vsRptId, "IS_SA_OR_GRP", i);
			
			// 그룹일경우 그룹명필수
			if(ValueUtil.fixNull(vsIsSaOrGrp) == "GRP"){
				// 그룹명
				var vsGrpCdNm = util.Grid.getCellValue(app, vsRptId, "GRP_CD_NM", i);
				if(ValueUtil.isNull(vsGrpCdNm)){
					
					var vsRptTiele = util.Grid.getTitle(app, "grdCcsPermitLimitCcsPermitLimit");
					var vsMsgParam = ExtControl.getTextValue("rhBtnDtlGrdCdNm");
					
					// "@목록의 @번째 항목의 @은(는) 필수 입력 항목입니다." 메시지
					util.Msg.alert("NLS-CCS-M065", [vsRptTiele, i, vsMsgParam]);
					ExtRepeat.setColFocus("rptCcsPermitLimit", i, "rdIpbDtlGrdCdNm");
					
					vbValid = false;
					return vbValid;
				}
			// 아닐경우 학사부서명 필수
			}else {
				// 그룹명
				var vsSaCdNm = util.Grid.getCellValue(app, vsRptId, "SA_CD_NM", i);
				if(ValueUtil.isNull(vsSaCdNm)){
					
					var vsRptTiele = util.Grid.getTitle(app, "grdCcsPermitLimitCcsPermitLimit");
					var vsMsgParam = ExtControl.getTextValue("rhBtnDtlSaCdNm");
					
					// "@목록의 @번째 항목의 @은(는) 필수 입력 항목입니다." 메시지
					util.Msg.alert("NLS-CCS-M065", [vsRptTiele, i, vsMsgParam]);
					ExtRepeat.setColFocus("rptCcsPermitLimit", i, "rdIpbDtlSaCdNm");
					
					vbValid = false;
					return vbValid;
				}
			}
		}
	
		return vbValid;
	};
	
	/**
	 * @desc [rhCkbSelect]패널 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 7
	 */
	moPage.onValueChanged_RhCkbSelect = function() {
		// 리피트 패널 설정
//TO-BE: <ExtRepeat.selectedAllPanel> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.selectedAllPanel("rhCkbSelect");
	};
	
	/**
	 * @desc [rdIpbDtlSaCdNm]학사부서명 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 7
	 */
	moPage.onValueChanged_RdIpbDtlSaCdNm = function(sender) {
		// 값변경시 객체검색팝업 호출
		doOnChangeStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc [rdBtnDtlSaCdNm]학사부서명 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 7
	 */
	moPage.onClick_RdBtnDtlSaCdNm = function(sender) {
		// 객체검색팝업 호출
		doOnClickStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc [rdIpbDtlGrdCdNm]그룹명 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 7
	 */
	moPage.onValueChanged_RdIpbDtlGrdCdNm = function(sender) {
		// 그룹검색팝업호출
		doOnChangeStdCcsPLimitGroup(sender);
	};

	/**
	 * @desc [rdBtnDtlGrdCdNm]그룹명 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 7
	 */
	moPage.onClick_RdBtnDtlGrdCdNm = function(sender) {
		// 그룹검색팝업호출
		doOnClickStdCcsPLimitGroup(sender);
	};
	
	/**
	 * @desc [rptCcsPermitLimit]수강신청 제한/대상 목록 onRowSelect 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 7
	 */
	moPage.onRowSelect_RptCcsPermitLimit = function() {
//TO-BE: <ExtControl.refreshBind> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtControl.refreshBind(["bindIsSa", "bindIsGrp"]);
	};
	
	/**
	 * @desc [rdCbbDtlIsSaOrGrp]그룹구분 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 7
	 */
	moPage.onValueChanged_RdCbbDtlIsSaOrGrp = function() {
		
		
//TO-BE: <ExtControl.refreshBind> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtControl.refreshBind(["bindIsSa", "bindIsGrp"]);
	};
	
	/**
	 * @desc [rdCbbDtlSpDivRcd]이수과정명 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 7
	 */
	moPage.onSetFocus_RdCbbDtlSpDivRcd = function() {
		var vnIdx = util.Grid.getIndex(app, "grdCcsPermitLimit");
		var vsSaCd = util.Grid.getCellValue(app, "grdCcsPermitLimit", "SA_CD", vnIdx);
		
		if(ValueUtil.isNull(vsSaCd)){
			ExtControl.setAttr("rdCbbDtlSpDivRcd", "nodeset", "/root/resOnLoad/spList/row");
		}else {
			ExtControl.setAttr("rdCbbDtlSpDivRcd", "nodeset", "/root/resOnLoad/spList/row[contains(PATH, '"+ vsSaCd +"')]");
		}
		util.Control.redraw(app, "rdCbbDtlSpDivRcd");
	};
	
	return moPage;
};
