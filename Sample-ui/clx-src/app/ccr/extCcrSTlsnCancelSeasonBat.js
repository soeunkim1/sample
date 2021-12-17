//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCcrSTlsnCancelSeasonBat.xtm"/>

/**
 * 계절학기등록수강조회
 * @class extCcrSTlsnCancelSeasonBat
 * @author 박갑수 at 2016. 6. 8
 */
var extCcrSTlsnCancelSeasonBat = function() {
	var moPage = new Page();
	
	// 학년도 학기를 원래데이터로 되돌리기위한 변수
	var msSchYearRcd = "";
	var msSmtRcd = "";
	
	/**
	 * @desc import 헤더 초기화
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 6. 8
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		// import 헤더 초기화
		doHeaderOnLoad();
	};
	
	/**
	 * @desc onLoad 실행
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 6. 8
	 */
	moPage.onModelConstructDone_ExtCcrSTlsnCancelSeasonBat = function() {
		// 리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["rptCcrTlsnReq", "rptCcsOpenSub"]);
		// 검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grpData"]);
		
		// 서브미션 호출
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				
				util.Control.redraw(app, ["cbbSchYearRcd", "cbbSmtRcd", "ipbUnitPrice"]);
				
				util.SelectCtl.selectItem(app, "cbbSmtRcd", 0);
			}
		}, true);
	};
	
	/**
	 * @desc [cbbSchYearRcd]학년도 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 6. 8
	 */
	moPage.onValueChanged_CbbSmtRcd = function() {
		// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
		doChangeYearSmt("smt");
	};
	
	/**
	 * @desc [cbbSmtRcd]학기 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 6. 8
	 */
	moPage.onValueChanged_CbbSchYearRcd = function() {
		// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
		doChangeYearSmt("year");
	};
	
	/**
	 * @desc 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 6. 8
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
	 * @author 박갑수 at 2016. 6. 8
	 */
	moPage.onClick_BtnSearch = function() {
		// 작업영역 리피트 변경 내역 체크
		if(util.Grid.isModified(app, "", "CRM")){
			return false;
		}
		
		// 조회조건 필수 체크
		if(!util.validate(app, ["cbbSchYearRcd", "cbbSmtRcd", "ipbUnitPrice"])){
			return false;
		}
		
//		// 조회조건 필수체크 - 수업료단가 입력시 납부구분 필수체크
//		if(!moPage.checkNotNullCtl()){
//			return false;
//		}

		// 조회
		doList(function(pbSuccess) {
			if (pbSuccess){
				// 조회 : "조회되었습니다." header 메세지 표시
				util.Msg.notify(app, "NLS.INF.M024");
			}
		});
	};
	
	/**
	 * @desc 단가입력시 납부구분 필수입력체크
	 * @param 
	 * @return boolean
	 * @author 박갑수 at 2016. 2. 24
	 */
	moPage.checkNotNullCtl = function() {
		var vbValid = true;
		
		// 수업료단가
		var vsUnitPrice = util.Control.getValue(app, "ipbUnitPrice");
		// 납부구분
		var vsUnitPriceDiv = util.Control.getValue(app, "rdbUnitPriceDiv");
		
		// 수업료단가 입력시 납부구분 필수
		if(!ValueUtil.isNull(vsUnitPrice) && ValueUtil.isNull(vsUnitPriceDiv)){			
			// "수업료단가 입력시 납부구분은 필수 입력 항목입니다." 메시지 표시
			util.Msg.alert("NLS-CCR-EXT003");
			
			util.Control.setFocus(app, "rdbUnitPriceDiv");
			
			vbValid = false;
			return vbValid;
		}
		
		return vbValid;
	};
	
	/**
	 * @desc 계절학기 등록 수강내역 조회
	 * @param poCallBackFunc 콜백정의
	 * @return void
	 * @author 박갑수 at 2016. 6. 8
	 */
	function doList(poCallBackFunc) {
		
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdCcrTlsnReq");
				
				// 마스터에 데이터가 없을 경우 디테일 리셋
				if(util.Grid.getRowCount(app, "grdCcrTlsnReq") < 1){
					util.Control.reset(app, "rptCcsOpenSub");
				}
				
				// 조회 후 콜백함수 수행
				if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess); 
			}
		});
	};
	
	/**
	 * @desc [ipbUnitPrice]수업료단가 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 6. 8
	 */
	moPage.onValueChanged_IpbUnitPrice = function() {
		ValidUtil.checkIntegerDecimal("ipbUnitPrice", 10, 0, true);
	};
	
	/**
	 * @desc [rptCcrTlsnReq]계절학기등록 수강내역 onRowSelect 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 6. 8
	 */
	moPage.onRowSelect_RptCcrTlsnReq = function() {
		// 수강내역 상세 조회
		doListDtl();
	};
	
	/**
	 * @desc 수강내역 상세 조회
	 * @param poCallBackFunc 콜백정의
	 * @return void
	 * @author 박갑수 at 2016. 6. 8
	 */
	function doListDtl() {
		
		// 학생ID
		util.DataMap.setValue(app, "dmReqKey", "strStudId", util.Grid.getCellValue(app, "grdCcrTlsnReq", "STUD_ID"));
		
		//strCommand: listDtl 
		util.Submit.send(app, "subListDtl", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdCcsOpenSub");
			}	
		});
	};
	
	return moPage;
};
