//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCcsCOpenSubRel.xtm"/>

/**
 * 개설분반관리
 * @class extCcsCTlsnDivclsMng
 * @author 박갑수 at 2016. 4. 25
 */
var extCcsCOpenSubRel = function() {
	var moPage = new Page();
	
	// 임포트용 데이터 통신 오브젝트
	var moPObject = new Page();
	
	
	// 개설과목검색팝업 호출
	moIdsForStdCcsPOpenSubPopup = [
	{ 
		 controlId					: "rdBtnSbNm",			
		 iDivClsYn					: "Y",		
		 iLanDivRcd				: "/root/resOnLoad/strLanDivRcd",
		 iKeyDate             		: "/root/keyDateMap/ST_DT",
		 iSchYearRcd             : "cbbSchYearRcd",
		 iSmtRcd             		: "cbbSmtRcd",
		 iSaCd        				: "",			
		 iSaNm        				: "",		
		 iSaObjDivRcd       		: "",		
		 iSbCd        				: "rdIpbSbNm",			
		 iSbNm        				: "",		
		 iCmpDivRcd        		: "",			
		 
		 oSpCd						: "",			
		 oSpNm					: "",			
		 oSbCd						: "",			
		 oSbNm					: "rdIpbSbNm",			
		 oSaCd						: "",			
		 oSaNm					: "optSaNm",			
		 oCuCd						: "",		
		 oCuNm					: "",		
		 oSchYearRcd			: "",		
		 oSmtRcd					: "",	
		 oDivclsCd					: "",	
		 oDivclsNm				: "optDivNm",	
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
		 oRefKey					: "optRefKey",		
		 func : function(poParam) { 
		 
			
			if(poParam != null && poParam.Result.SB_LVL_RCD != ""){
				
				var vnRptIndex = poParam.rptRowIdx;
				var vsSbLvlRcdNm = ExtInstance.getValue("/root/resOnLoad/sbLvlRcdList/row", "CD_NM", "child::CD = '"+poParam.Result.SB_LVL_RCD+"'");
				util.Grid.setCellValue(app, "grdExtCcsEstDivcls", "EXP_SB_LVL_RCD_NM", vsSbLvlRcdNm , vnRptIndex);
				
			}
			
		 }
	 }
	 ,
	 { 
		 controlId					: "rdBtnSbNm1",			
		 iDivClsYn					: "Y",		
		 iLanDivRcd				: "/root/resOnLoad/strLanDivRcd",
		 iKeyDate             		: "/root/keyDateMap/ST_DT",
		 iSchYearRcd             : "cbbSchYearRcd",
		 iSmtRcd             		: "cbbSmtRcd",
		 iSaCd        				: "",			
		 iSaNm        				: "",		
		 iSaObjDivRcd       		: "",		
		 iSbCd        				: "rdIpbSbNm1",			
		 iSbNm        				: "",		
		 iCmpDivRcd        		: "",			
		 
		 oSpCd						: "",			
		 oSpNm					: "",			
		 oSbCd						: "",			
		 oSbNm					: "rdIpbSbNm1",			
		 oSaCd						: "",			
		 oSaNm					: "optSaNm1",			
		 oCuCd						: "",		
		 oCuNm					: "",		
		 oSchYearRcd			: "",		
		 oSmtRcd					: "",	
		 oDivclsCd					: "",	
		 oDivclsNm				: "optDivNm1",	
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
		 oRefKey					: "optRefKeyExp",		
		 func : function(poParam) { 
		 
			if(poParam != null && poParam.Result.SB_LVL_RCD != ""){
				
				var vnRptIndex = poParam.rptRowIdx;
				var vsSbLvlRcdNm = ExtInstance.getValue("/root/resOnLoad/sbLvlRcdList/row", "CD_NM", "child::CD = '"+poParam.Result.SB_LVL_RCD+"'");
				util.Grid.setCellValue(app, "grdExtCcsEstDivcls", "SB_LVL_RCD_NM", vsSbLvlRcdNm , vnRptIndex);
				
			}
			
		 }
	  }
	 ];
	 
	 
	
	
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
//		ExtGroup.initSearchBox("grpSearch", ["grpData"]);
		
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
	 * @author 박갑수 at 2016. 4. 25
	 */
	moPage.onValueChanged_CbbSchYearRcd = function() {
		// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
		doChangeYearSmt("year");
		
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
		if(!util.validate(app, ["cbbSchYearRcd", "cbbSmtRcd"])){
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
	 * @desc [btnNew]신규 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 25
	 */
	moPage.onClick_BtnNew = function() {
		// 해당 리피트 insert 후 편집 시작할 컬럼 지정
		var vnIdx = util.Grid.insertRow(app, "grdExtCcsEstDivcls");
		
		
		ExtRepeat.setColFocus("rptExtCcsEstDivcls", vnIdx, "rdIpbSbNm");
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
	
	
	
	
	
	
	
	moPage.onClick_RdBtnSaNm = function(sender) {
		// 객체검색팝업 호출
		doOnClickStdCcsPOpenSubPopup(sender);
	}
	
	moPage.onValueChanged_RdIpbSaNm = function(sender) {
		// 값변경시 객체검색팝업 호출
		doOnChangeStdCcsPOpenSubPopup(sender);
	}
	
	moPage.onValueChanged_RdIpbSaNm1 = function(sender) {
		// 값변경시 객체검색팝업 호출
		doOnChangeStdCcsPOpenSubPopup(sender);
	}
	
	moPage.onClick_RdBtnSaNm1 = function(sender) {
		// 객체검색팝업 호출
		doOnClickStdCcsPOpenSubPopup(sender);
	}
	return moPage;
};
