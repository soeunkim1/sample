//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCcrCBatchTlsnReq.xtm"/>

/**
 * 일괄수강신청
 * @class extCcrCBatchTlsnReq
 * @author 박갑수 at 2016. 6. 7
 */
var extCcrCBatchTlsnReq = function() {
	var moPage = new Page();
	
	// 학년도 학기를 원래데이터로 되돌리기위한 변수
	var msSchYearRcd = "";
	var msSmtRcd = "";
	
	/**
	 * @desc import 헤더 초기화
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 6. 7
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		// import 헤더 초기화
		doHeaderOnLoad();
	};
	
	/**
	 * @desc onLoad 실행
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 6. 7
	 */
	moPage.onModelConstructDone_ExtCcrCBatchTlsnReq = function() {
		
		// 리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["rptCcrTlsnReq"]);
		// 검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grpDataDtl"], ["grpData"]);
		
		// 서브미션 호출
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				
				util.Control.redraw(app, ["cbbSchYearRcd", "cbbSmtRcd"]);
			}
		}, true);
	};
	
	/**
	 * @desc [cbbSchYearRcd]학년도 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 6. 7
	 */
	moPage.onValueChanged_CbbSchYearRcd = function() {
		// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
		doChangeYearSmt("year");
		
		// 대상건수, 처리건수 초기화
		doClearCnt();
	};
	
	/**
	 * @desc [cbbSmtRcd]학기 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 6. 7
	 */
	moPage.onValueChanged_CbbSmtRcd = function() {
		// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
		doChangeYearSmt("smt");
		
		// 대상건수, 처리건수 초기화
		doClearCnt();
	};
	
	/**
	 * @desc 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 6. 7
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
	 * @desc 대상건수, 처리건수 초기화
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 6. 7
	 */
	function doClearCnt() {
		util.Control.setValue(app, "ipbTgtStudCnt", "");
		util.Control.setValue(app, "ipbProcStudCnt", "");
		util.DataMap.setValue(app, "dmResList", "strProcStudCnt", "");
		util.DataMap.setValue(app, "dmResList", "strTgtStudCnt", "");
	};
	
	
	/**
	 * @desc [btnSearch]조회 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 6. 7
	 */
	moPage.onClick_BtnSearch = function() {
		// 조회조건 필수 체크
		if(!util.validate(app, ["cbbSchYearRcd", "cbbSmtRcd"])){
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
	 * @desc 강좌가없는학생 조회
	 * @param poCallBackFunc 콜백정의
	 * @return void
	 * @author 박갑수 at 2016. 6. 7
	 */
	function doList(poCallBackFunc) {
		
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdCcrTlsnReq");
				
				// 조회 후 콜백함수 수행
				if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess); 
			}
		});
	};
	
	/**
	 * @desc [btnAllBat]일괄수강신청 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 6. 7
	 */
	moPage.onClick_BtnAllBat = function() {
		// 조회조건 필수체크
		if(!util.validate(app, ["cbbSchYearRcd", "cbbSmtRcd"])){
			return false;
		}
		
		// 일괄수강신청 전 체크
		doSaveChk(function(pbSuccess) {
			if (pbSuccess){
				// 일괄수강신청
				doAllBat();
			}
		});
	};
	
	/**
	 * @desc  일괄수강신청 전 체크
	 * @param {Function} poCallBackFunc 콜백정의
	 * @return void
	 * @author 박갑수 at 2016. 6. 7
	 */
	function doSaveChk(poCallBackFunc) {
		//strCommand: saveChk 
		util.Submit.send(app, "subSaveChk", function(pbSuccess){
			if(pbSuccess){
				
				var vsSaveChk = util.DataMap.getValue(app, "dmResList", "strChkYn");
				if(ValueUtil.fixNull(vsSaveChk) == "Y"){
					// 기존에 수강신청 한 자료가 존재합니다. 삭제 후 진행
					var vsMsg = NLS.CCR.EXT001;
					// "기존에 수강신청 한 자료가 존재합니다. 삭제 후 진행하시겠습니까?" 메시지
					if(!util.Msg.confirm("NLS-CRM-M010", [vsMsg]) ){
						// 콜백함수실행
						if (util.isFunc(poCallBackFunc)) poCallBackFunc(false);
						return false;
					}
				}else {
					// 일괄수강신청을 진행
					var vsMsg = NLS.CCR.EXT002;
					// "일괄수강신청을 진행하시겠습니까?" 메시지
					if(!util.Msg.confirm("NLS-CRM-M010", [vsMsg]) ){
						// 콜백함수실행
						if (util.isFunc(poCallBackFunc)) poCallBackFunc(false);
						return false;
					}
				}
				
				// 콜백함수실행
				if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess); 
			}
		});
	};
	
	/**
	 * @desc 일괄수강신청
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 6. 7
	 */
	function doAllBat() {
		//strCommand: save 
		util.Submit.send(app, "subSave", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, ["ipbTgtStudCnt", "ipbProcStudCnt"]);
				
				// "처리되었습니다." 헤더 메시지
				util.Msg.notify(app, "NLS.INF.M003");
			}else {
				// "처리가 취소되었습니다." 헤더 메시지
				util.Msg.notify(app, "NLS.INF.M013");
			}
		});
	};
	
	return moPage;
};
