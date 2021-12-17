
//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./stdCcsCLectEvaluation.xtm"/>


var stdCcsCLectEvaluation = function() {
		
	
	var moPage = new Page();
	var moPObject = new PObject();
	
			
			
	
	// 객체검색팝업 호출
	moPObject.moIdsForStdCmnPObjSch = [
	{
		controlId			:	"btnSaCd",
		iCd					:	"",
		iNm					:	"ipbSaNm",
		iObjDivRcd			:	["CC009OG"],
		iStartObject    	:   "",
		iOtDivRcd			:	"",
		iOtIsTreeView	:	"",
		iLanDivRcd		:	"/root/resOnLoad/strLanDivRcd",
		iKeyDate			:	"/root/keyDateMap/ST_DT",
		iKeyEndDate		:	"",
		oObjDivRcd		:	"/root/reqList/strObjDivRcd",
		oCd					:	"/root/reqList/strObjCd",
		oCdNm				:	"ipbSaNm",
		oBegDt				:	"",
		oEndDt				:	"",
		oLanDivRcd		:	"",
		func : function(poParam) {}
	}];
	
	
	// 학년도 학기를 원래데이터로 되돌리기위한 변수
	var msSchYearRcd = "";
	var msSmtRcd = "";
	
	
	
	/**
	 * @desc  Header Import onLoad
	 * @return void
	 * @author 최영경 2016-01-18
	 */
	moPage.onLoadImportDone_ImpTitle = function() {		
		
		doHeaderOnLoad();
		
	};
	
	
	
	
	/**
	 * @desc 온로드 실행
	 * @param 
	 * @return 
	 * @author 최영경 2016-01-18
	 */
	function doOnLoad() {
		
		//리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init("rptMain");
		//검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grpData"]);
		
		
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				
				var vsYear					= util.DataMap.getValue(app, "dmKeyDateMap", "YEAR");
				var vsSmt					= util.DataMap.getValue(app, "dmKeyDateMap", "SMT");
				util.DataMap.setValue(app, "dmReqCopyKey", "strCopyYear", vsYear);
				util.DataMap.setValue(app, "dmReqCopyKey", "strCopySmt" , vsSmt);
				
				// 학년도 학기값 되돌리기위한 값
				msSchYearRcd 	= util.DataMap.getValue(app, "dmKeyDateMap", "YEAR");
				msSmtRcd 		= util.DataMap.getValue(app, "dmKeyDateMap", "SMT");
				
				
				util.Control.redraw(app, ["cbbSchYearRcd", "cbbSmtRcd", "cbbLectEvalTypeRcd", "cbbSchYearRcdCopy", "cbbSmtRcdCopy", "ipbSaNm"]);
				
				util.SelectCtl.selectItem(app, "cbbLectEvalTypeRcd", 0);
				
				
				
			}
		}, true);
		
	};
	
	
	
	
	/**
	 * @desc 조회 실행
	 * @param 
	 * @return 
	 * @author 최영경 2016-01-18
	 */
	moPage.onClick_BtnSearch = function() {
		
		 //작업영역 리피트 변경 내역 체크
		if(util.Grid.isModified(app, "", "CRM")){
			return false;
		}		
		
		
			// 조회조건 필수 체크
		if(!util.validate(app, ["cbbSchYearRcd", "cbbSmtRcd", "ipbSaNm", "cbbLectEvalTypeRcd"])){
			return false;
		}
		
		
		
		doList(function(pbSuccess) {
			// 조회 : "조회되었습니다." header 메세지 표시
			if (pbSuccess) util.Msg.notify(app, "NLS.INF.M024");
		});		
	
	};
	
	
	
	
	/**
	 * @desc  강의평가유형목록 조회한다.
	 * @param {Function} poCallBackFunc 콜백정의
	 * @return void
	 * @author 최영경 2016-01-18
	 */
	function doList(poCallBackFunc) {
		
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdMain");
				
				// 답변내용 점수세팅
				doSetTotScr();		
				
				// 조회 후 콜백함수 수행
				if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess); 
			}
		}); 
	};
	
	/**
	 * @desc  답변내용 총점세팅
	 * @param 
	 * @return void
	 * @author 박갑수 2016-08-09
	 */
	function doSetTotScr() {
		var vnRowCnt = util.Grid.getRowCount(app, "grdMain");
		
		var vnTotScr = 0;
		
		for(var i=0; i<vnRowCnt; i++){
			var vnIdx = i+1;
			
			var vnScr = 0;
			
			// 답변유형
			var vsAnsTypeRcd = util.Grid.getCellValue(app, "grdMain", "ANS_TYPE_RCD", vnIdx);
			if(!ValueUtil.isNull(vsAnsTypeRcd)){
				vnScr = Number(ExtInstance.getValue("/root/resOnLoad/maxAnsTypeList/row", "MAX_ANS_SCR" , "child::ANS_TYPE_RCD='"+vsAnsTypeRcd+"'"));
			}
			
			vnTotScr = vnTotScr + vnScr;
		}
				
		var vsHeaderNm = "답변유형(" +  vnTotScr + "점)";
		
		// 버튼 값세팅
		ExtControl.setTextValue("rhBtnLectRoomShortNm", vsHeaderNm);
		util.Control.redraw(app, "rhBtnLectRoomShortNm");
	};
	
	/**
	 * @desc 강의평가유형목록 리피트 panel click event
	 *			 강의평가유형목록 리피트 row all check
	 * @return void
	 * @author 최영경 2016-01-18
	 */	
	moPage.onValueChanged_RhCkbSelect = function() {
//TO-BE: <ExtRepeat.selectedAllPanel> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.selectedAllPanel("rhCkbSelect");
	};
	
	
	
	
	/**
	 * @desc 신규 click event
	 *            강의평가유형목록 리피트 row 추가
	 * @return void
	 * @author 최영경 2016-01-18
	 */		
	moPage.onClick_BtnNew = function() {
		
		//해당 리피트 insertRow 후 편집 시작할 컬럼 지정		
		var voNewRow = util.Grid.insertRow(app, "grdMain", "rdIpbSerialNo");		
		
		
		var vsYear					= util.DataMap.getValue(app, "dmKeyDateMap", "YEAR");
		var vsSmt					= util.DataMap.getValue(app, "dmKeyDateMap", "SMT");
		var vsObjCd				= util.DataMap.getValue(app, "dmReqList", "strObjCd");
		var vsObjDivRcd			= util.DataMap.getValue(app, "dmReqList", "strObjDivRcd");
		var vsLectDivRcd		= util.DataMap.getValue(app, "dmReqList", "strLectDivRcd");
		
		var vsLanDivRcdList 	= util.DataMap.getValue(app, "dmResOnLoad", "strLanDivRcd");
		
		
		util.Grid.setCellValue(app, "grdMain"	, "SCH_YEAR_RCD"	, vsYear				, voNewRow, false, true);		//--학년도코드
		util.Grid.setCellValue(app, "grdMain"	, "SMT_RCD"				, vsSmt					, voNewRow, false, true);		//--학기코드
		util.Grid.setCellValue(app, "grdMain"	, "OBJ_CD"				, vsObjCd				, voNewRow, false, true);		//--객체코드
		util.Grid.setCellValue(app, "grdMain"	, "OBJ_DIV_RCD"		, vsObjDivRcd		, voNewRow, false, true);		//--객체구분코드[CC009]
		util.Grid.setCellValue(app, "grdMain"	, "LECT_DIV_RCD"		, vsLectDivRcd		, voNewRow, false, true);		//--강의구분코드[CL107]
		util.Grid.setCellValue(app, "grdMain"	, "LAN_DIV_RCD"		, vsLanDivRcdList	, voNewRow, false, false);		//--언어구분코드[CS003]
		
	};
	
	
	
	/**
	 * @desc 삭제 click event
	 *            강의평가유형목록 리피트 index row 삭제 status 변경
	 * @return void
	 * @author 최영경 2016-01-18
	 */	
	moPage.onClick_BtnDel = function() {
		util.Grid.deleteRow(app, "grdMain");
	};
	
	/**
	 * @desc 작업취소 click event
	 *            강의평가유형목록 리피트 index row restore
	 * @return void
	 * @author 최영경 2016-01-18
	 */	
	moPage.onClick_BtnRestore = function() {
		util.Grid.restoreRow(app, "grdMain");
		
		// 답변내용 점수세팅
		doSetTotScr();
	};
	
	/**
	 * @desc 작업저장 click event
	 *            강의평가유형목록  리피트 변경내역 저장
	 * @return void
	 * @author 최영경 2016-01-18
	 */	
	moPage.onClick_BtnSave = function() {
		doSave();
		
	};
	
	
	/**
	 * @desc  강의평가유형목록  리피트 저장 submission 실행
	 * @return void
	 * @author 최영경 2016-01-18
	 */
	function doSave() {
		
		// 리피터 변경사항 체크
		if(!util.Grid.isModified(app, ["grdMain"], "MSG")){
			return false;
		}
		
		//리피트 validation check
		if(!util.validate(app, "grdMain")) return false;
		
		//strCommand: save 
		util.Submit.send(app, "subSave", function(pbSuccess){
			
			if(pbSuccess){
				page.doList(function(pbListSuccess) {
					// 조회 : "갱신된 데이터가 조회되었습니다." header 메세지 표시
					if (pbListSuccess) util.Msg.notify(app, "NLS.INF.M025");
				});
			}
		});
	}
	
	
	
	
	/**
	 * @desc 검색조건 학기를 변경 시 표준학기를 다시 가져온다.
	 * @param 
	 * @return void
	 * @author 최영경 at 2016. 2. 5
	 */	 
	moPage.onValueChanged_CbbSmtRcd = function() {
		// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
		doChangeYearSmt("smt");
	}
	
	/**
	 * @desc 검색조건 학년도를 변경 시 표준학기를 다시 가져온다.
	 * @param 
	 * @return void
	 * @author 최영경 at 2016. 2. 5
	 */	 
	moPage.onValueChanged_CbbSchYearRcd = function() {
		// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
		doChangeYearSmt("year");
	}
	
	
	
	/**
	 * @desc 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
	 * @param 
	 * @return void
	 * @author 최영경 at 2016. 2. 5
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
	 * @desc 검색조건 소속을 클릭 이벤트
	 * @param 
	 * @return void
	 * @author 최영경 at 2016. 2. 5
	 */
	moPage.onClick_BtnSaCd = function(sender) {
		// 객체검색팝업 호출
		doOnClickStdCmnPObjSch(sender);
	}
	
	
	/**
	 * @desc 검색조건 소속을 valueChang
	 * @param 
	 * @return void
	 * @author 최영경 at 2016. 2. 5
	 */
	moPage.onValueChanged_IpbSaNm = function(sender) {
		// 리피트 변경사항 체크
		if(util.Grid.isModified(app, ["grdMain"])){
			return false;
		}
		
		// 값변경시 객체검색팝업 호출
		doOnChangeStdCmnPObjSch(sender);
	}
	
	
	
	
	
	
	/**
	 * 복사 버튼
	 * @member extCcsPPastSmtCopy
	 * @param {eXria.event.Event} e
	 * @type void
	 * @author sora at 14. 6. 17 오후 1:24
	 */
	moPage.onClick_Copy = function() {
		
		
		var vsCurYear 			= util.DataMap.getValue(app, "dmKeyDateMap", "YEAR");
		var vsCurSmt 				= util.DataMap.getValue(app, "dmKeyDateMap", "SMT");
		
		
