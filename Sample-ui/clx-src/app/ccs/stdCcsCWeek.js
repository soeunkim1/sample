//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./stdCcsCWeek.xtm"/>

/**
 * 월별주관리
 * @class stdCcsCWeek
 * @author 박갑수 at 2016. 1. 20
 */
var stdCcsCWeek = function() {
	var moPage = new Page();
	// 임포트용 데이터 통신 오브젝트
	var moPObject = new Page();
	
	// 객체검색팝업 호출
	moPObject.moIdsForStdCmnPObjSch = [
	{
		controlId			:	"btnObjNm",
		iCd					:	"",
		iNm					:	"ipbObjNm",
		iObjDivRcd			:	["CC009OG"],
		iStartObject    	:   "",
		iOtDivRcd			:	"",
		iOtIsTreeView	:	"",
		iLanDivRcd		:	"",
		iKeyDate			:	"/root/resOnLoad/keyDateMap/ST_DT",
		iKeyEndDate		:	"",
		oObjDivRcd		:	"/root/reqKey/strObjDivRcd",
		oCd					:	"/root/reqKey/strObjCd",
		oCdNm				:	"ipbObjNm",
		oBegDt				:	"",
		oEndDt				:	"",
		oLanDivRcd		:	"",
		func 					:  function(){
			// 검색조건이 있을경우 조회
			var vsObjNm = util.DataMap.getValue(app, "dmReqKey", "strObjNm");
			if(!ValueUtil.isNull(vsObjNm)){
				util.Header.clickSearch(app);
			}				
		}
	}];
	
	/**
	 * @desc import 헤더 초기화
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 1. 20
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		// import 헤더 초기화
		doHeaderOnLoad();
	};
	
	/**
	 * @desc onLoad 실행
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 1. 20
	 */
	moPage.onModelConstructDone_StdCcsCWeek = function() {
		
		// 리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["rptCcsMonWeek"]);
		// 검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grpData"]);
		
		// 서브미션 호출
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				
				util.Control.redraw(app, ["cbbSchYearRcd", "cbbSmtRcd", "ipbObjNm"]);
				util.Control.setFocus(app, "ipbObjNm");
			}
		}, true);
	};
	
	/**
	 * @desc [cbbSchYearRcd]학년도 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 1. 20
	 */
	moPage.onValueChanged_CbbSchYearRcd = function() {
		// 학년도 학기에 해당하는 일자 가져오기
		doGetDate();
	};
	
	/**
	 * @desc [cbbSmtRcd]학기 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 1. 20
	 */
	moPage.onValueChanged_CbbSmtRcd = function() {
		// 학년도 학기에 해당하는 일자 가져오기
		doGetDate();
	};
	
	/**
	 * @desc 학년도 학기에 해당하는 일자 가져오기
	 * @param poCallBackFunc 콜백정의
	 * @return void
	 * @author 박갑수 at 2016. 1. 20
	 */
	function doGetDate() {
		// 시작일, 종료일, 시작 하루전일 GET
		//strCommand: date 
		util.Submit.send(app, "subDate", function(pbSuccess){
			if(pbSuccess){
			}
		});
	};
	
	/**
	 * @desc [btnObjNm]부서명(돋보기버튼) onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 1. 20
	 */
	moPage.onClick_BtnObjNm = function(sender) {
		// 객체검색팝업 호출
		doOnClickStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc [ipbObjNm]부서명 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 1. 20
	 */
	moPage.onValueChanged_IpbObjNm = function(sender) {
		// 리피트 변경사항 체크
		if(util.Grid.isModified(app, ["grdCcsMonWeek"])){
			return false;
		}

		// 값변경시 객체검색팝업 호출
		doOnChangeStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc [btnSearch]조회 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 1. 20
	 */
	moPage.onClick_BtnSearch = function() {
		 // 작업영역 리피트 변경 내역 체크
		if(util.Grid.isModified(app, "", "CRM")){
			return false;
		}
		
		// 조회조건 필수 체크
		if(!util.validate(app, ["cbbSchYearRcd", "cbbSmtRcd", "ipbObjNm"])){
			return false;
		}

		// 조회
		doList(function(pbSuccess) {
			// 조회 : "조회되었습니다." header 메세지 표시
			if (pbSuccess) util.Msg.notify(app, "NLS.INF.M024");
		});
	};
	
	/**
	 * @desc 주목록 조회
	 * @param poCallBackFunc 콜백정의
	 * @return void
	 * @author 박갑수 at 2016. 1. 20
	 */
	function doList(poCallBackFunc) {
		
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdCcsMonWeek");	
				// 조회 후 콜백함수 수행
				if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess); 
			}
		});
	};
	
	/**
	 * @desc [rhCkbSelect]패널 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 1. 20
	 */
	moPage.onValueChanged_RhCkbSelect = function() {
		// 리피트 패널 설정
//TO-BE: <ExtRepeat.selectedAllPanel> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.selectedAllPanel("rhCkbSelect");
	};
	
	/**
	 * @desc [rdDipStDt]시작일자 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 1. 20
	 */
	moPage.onValueChanged_rdDipStDt = function() {
		// 1. 해당 날짜가 학기 시작일 종료일 사이의 날짜인지 체크 
		// 2. 시작일이 종료일보다 크거나 종료일이 시작일보다 작은지 검사
		/*
			3월에 
			시작일자를 2월 말일로 작성할수 있으므로 doCheckSmtDate 체크 로직은 제외한다.
		*/
		//if(!moPage.doCheckSmtDate("ST_DT") || !moPage.doCheckDate("ST_DT")){
		//	ExtRepeat.setValue("rptCcsMonWeek", "ST_DT", "");
		//}
		if(!doCheckDate("ST_DT")){
			util.Grid.setCellValue(app, "grdCcsMonWeek", "ST_DT", "");
		}
	};
	
	/**
	 * @desc [rdDipEndDt]종료일자 onValueChanged 이벤트
	 * @param 
	 * @return boolean
	 * @author 박갑수 at 2016. 1. 20
	 */
	moPage.onValueChanged_rdDipEndDt = function() {
		// 1. 해당 날짜가 학기 시작일 종료일 사이의 날짜인지 체크 
		// 2. 시작일이 종료일보다 크거나 종료일이 시작일보다 작은지 검사
		/*
			3월에 
			시작일자를 2월 말일로 작성할수 있으므로 doCheckSmtDate 체크 로직은 제외한다.
		*/
		//if(!moPage.doCheckSmtDate("END_DT") || !moPage.doCheckDate("END_DT")){
		//	ExtRepeat.setValue("rptCcsMonWeek", "END_DT", "");
		//}
		
		if( !doCheckDate("END_DT")){
			util.Grid.setCellValue(app, "grdCcsMonWeek", "END_DT", "");
		}
	};
	
	/**
	 * @desc 해당 날짜가 학기 시작일 종료일 사이의 날짜인지 체크
	 * @param psColNm		(필수) 날짜컬럼명
	 * @return boolean
	 * @author 박갑수 at 2016. 1. 20
	 */
	function doCheckSmtDate(psColNm){
		// 유효성 true or false
		var vbValid = true;
		
		// 입력일자
		var vsInputDt = util.Grid.getCellValue(app, "grdCcsMonWeek", psColNm).substring(0, 8);
		// 학기시작일자
		var vsSmtStDt = util.DataMap.getValue(app, "dmKeyDateMap", "ST_DT").substring(0, 8);
		// 학기종료일자
		var vsSmtEndDt = util.DataMap.getValue(app, "dmKeyDateMap", "END_DT").substring(0, 8);
		
		// 입력일자가 학기 시작일 종료일 사이의 날짜인지 검사
		if(!ValueUtil.isNull(vsInputDt) && (vsInputDt < vsSmtStDt || vsInputDt > vsSmtEndDt)){
			// "시작일@ 과 종료일@ 사이의 날짜만 입력할 수 있습니다." 메시지 출력.
			util.Msg.alert("NLS-WRN-M142", [vsSmtStDt, vsSmtEndDt]);
			vbValid = false;
			return vbValid;
		}
		
		return vbValid;
	};
	
	/**
	 * @desc 시작일이 종료일보다 크거나 종료일이 시작일보다 작은지 검사
	 * @param psColNm		(필수) 날짜컬럼명
	 * @return boolean
	 * @author 박갑수 at 2016. 1. 20
	 */
	function doCheckDate(psColNm){
		// 유효성 true or false
		var vbValid = true;
		
		// 시작일자
		var vsStDt = util.Grid.getCellValue(app, "grdCcsMonWeek", "ST_DT").substring(0, 8);;
		// 종료일자
		var vsEndDt = util.Grid.getCellValue(app, "grdCcsMonWeek", "END_DT").substring(0, 8);;
		
		// 시작일 유효성 체크
		if(psColNm == "ST_DT"){
			if(!ValueUtil.isNull(vsEndDt) && !ValueUtil.isNull(vsStDt) && !ValidUtil.checkValue(vsStDt, "compare(rdDipEndDt, <=)")){
				// "시작일이 종료일 보다 클 수 없습니다." 메시지 출력
				util.Msg.alert("NLS-CSS-M063");
				vbValid = false;
				return vbValid;
			}

		// 종료일 유효성 체크
		} else if(psColNm == "END_DT"){
			if(!ValueUtil.isNull(vsEndDt) && !ValueUtil.isNull(vsStDt) && !ValidUtil.checkValue(vsEndDt, "compare(rdDipStDt, >=)")){
				util.Msg.alert("NLS-CSS-M064");
				vbValid = false;
				return vbValid;
			}
		}
		
		return vbValid;
	};
	
	/**
	 * @desc [btnNew]신규 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 1. 20
	 */
	moPage.onClick_BtnNew = function() {
		// 해당 리피트 insert 후 편집 시작할 컬럼 지정
		var vnIdx = util.Grid.insertRow(app, "grdCcsMonWeek", "rdCbbMm");
		
		// 신규 Defalut값 설정 
		// 학년도 : 조회조건
		var vsSchYearRcd = util.Control.getValue(app, "cbbSchYearRcd"); 
		util.Grid.setCellValue(app, "grdCcsMonWeek", "SCH_YEAR_RCD", vsSchYearRcd, vnIdx);
		
		// 학기 : 조회조건
		var vsSmtRcd = util.Control.getValue(app, "cbbSmtRcd"); 
		util.Grid.setCellValue(app, "grdCcsMonWeek", "SMT_RCD", vsSmtRcd, vnIdx);
		
		// 객체코드 : 조회조건
		var vsObjCd = util.DataMap.getValue(app, "dmReqKey", "strObjCd");
		util.Grid.setCellValue(app, "grdCcsMonWeek", "OBJ_CD", vsObjCd, vnIdx);
		
		// 객체구분코드 : 조회조건
		var vsObjDivRcd = util.DataMap.getValue(app, "dmReqKey", "strObjDivRcd");
		util.Grid.setCellValue(app, "grdCcsMonWeek", "OBJ_DIV_RCD", vsObjDivRcd, vnIdx);
		
		// 부서명 : 조회조건
		var vsObjNm = util.Control.getValue(app, "ipbObjNm"); 
		util.Grid.setCellValue(app, "grdCcsMonWeek", "OBJ_NM", vsObjNm, vnIdx);
	};
	
	/**
	 * @desc [btnDel]삭제 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 1. 20
	 */
	moPage.onClick_BtnDel = function() {
		// 해당 리피트 delete
		util.Grid.deleteRow(app, "grdCcsMonWeek");
	};
	
	/**
	 * @desc [btnRestore]작업취소 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 1. 20
	 */
	moPage.onClick_BtnRestore = function() {
		// 해당 리피트 상태 초기화
		util.Grid.restoreRow(app, "grdCcsMonWeek");
	};
	
	/**
	 * @desc [btnSave]작업저장 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 1. 20
	 */
	moPage.onClick_BtnSave = function() {
		// 작업저장
		doSave();
	};
	
	/**
	 * @desc 건물목록 변경사항 저장
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 1. 20
	 */
	function doSave() {
		
		// 리피트 변경사항 체크
		if(!util.Grid.isModified(app, ["grdCcsMonWeek"], "MSG")){
			return false;
		}
		
		// 데이터 중복 체크(날짜, 주)
		if(!doCheckDup()){
			return false;
		}
		
		// 리피트 Validation Check
		if(!util.validate(app, "grdCcsMonWeek")) return false;

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
	 * @desc 데이터 중복 체크
	 * @param 
	 * @return boolean
	 * @author 박갑수 at 2016. 1. 20
	 */
	function doCheckDup() {
		// 유효성 true or false
		var vbValid = true;
		
		// 리피트 ID
		var vsRptId = "rptCcsMonWeek";
		// 리피트 RowCnt
		var vnRowCnt 	= util.Grid.getRowCount(app, vsRptId);		
		// 리피트 인덱스
		var vnRptIndex 	= util.Grid.getIndex(app, vsRptId);	
		
		for (var i = 1; i <= vnRowCnt; i++) {
			
			var vsUptStatusOri = util.Grid.getCellValue(app, vsRptId, "UPT_STATUS", i);
			// 삭제일경우 Skip
			if (vsUptStatusOri == "D") continue;
				
			var vsStDtOri = util.Grid.getCellValue(app, vsRptId, "ST_DT", i).substring(0, 8);		// 비교대상 시작일자
			var vsEndDtOri = util.Grid.getCellValue(app, vsRptId, "END_DT", i).substring(0, 8);	// 비교대상 종료일자
			var vsWeekSeqOri = util.Grid.getCellValue(app, vsRptId, "WEEK_SEQ", i);				// 비교대상 주
			var vsObjCdOri = util.Grid.getCellValue(app, vsRptId, "OBJ_CD", i);							// 비교대상 오브젝트번호
			
			for (var j = 1; j <= vnRowCnt; j++) {
				// 같은 row일경우 Skip
				if (i == j) continue;
				
				var vsUptStatus = util.Grid.getCellValue(app, vsRptId, "UPT_STATUS", j);
				// 삭제일경우 Skip
				if (vsUptStatus == "D") continue;
				
				var vsStDt = util.Grid.getCellValue(app, vsRptId, "ST_DT", j).substring(0, 8);		// 비교값 시작일자
				var vsEndDt = util.Grid.getCellValue(app, vsRptId, "END_DT", j).substring(0, 8);	// 비교값 종료일자
				var vsWeekSeq = util.Grid.getCellValue(app, vsRptId, "WEEK_SEQ", j);				// 비교값 주
				var vsObjCd = util.Grid.getCellValue(app, vsRptId, "OBJ_CD", j);						// 비교대상 오브젝트번호
				var vsObjNm = util.Grid.getCellValue(app, vsRptId, "OBJ_NM", j);						// 비교대상 부서명
				
				// 다른부서일경우 Skip - 같은부서내에서만 중복체크
				if(vsObjCdOri != vsObjCd) continue;
				
				// 1. 주 중복체크
				if (vsWeekSeqOri == vsWeekSeq) {
					var vsWeekSeqTitle = ExtControl.getTextValue("rhBtnWeekSeq");
					
					//@1 @2에 중복된 @3(이)가 있습니다.
					util.Msg.alert("NLS-CCS-M019", [vsObjNm, vsWeekSeqOri + vsWeekSeqTitle, vsWeekSeqTitle]);
					vbValid = false;
					return vbValid;
				}
				
				// 2. 시간중복체크
				if((vsStDtOri >= vsStDt && vsStDtOri <= vsEndDt)
					|| (vsEndDtOri >= vsStDt && vsEndDtOri <= vsEndDt)){
				
					//@의 @주와 @주 기간에 중복이 존재합니다.
					util.Msg.alert("NLS-CCS-M018", [vsObjNm, vsWeekSeqOri, vsWeekSeq]);
					vbValid = false;
					return vbValid;
				}
			}
		}
		
		return vbValid;
	};

	return moPage;
};
