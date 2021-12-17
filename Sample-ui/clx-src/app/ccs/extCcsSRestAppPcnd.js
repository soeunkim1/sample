//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCcsSRestAppPcnd.xtm"/>

/**
 * 결보강현황
 * @class extCcsSRestAppPcnd
 * @author 박갑수 at 2016. 10. 6
 */
var extCcsSRestAppPcnd = function() {
	var moPage = new Page();
	
	// 학년도 ,학기, 출력순서를 원래데이터로 되돌리기위한 변수
	var msSchYearRcd = "";
	var msSmtRcd = "";
	
	/**
	 * @desc import 헤더 초기화
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 10. 6
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		// import 헤더 초기화
		doHeaderOnLoad();
	};
	
	/**
	 * @desc onLoad 실행
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 10. 6
	 */
	moPage.onModelConstructDone_ExtCcsSRestAppPcnd = function() {
		// 검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grpData"]);
		
		// 서브미션 실행 (실패시 cover page)
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				
				util.Control.setValue(app, "radInOut", "OUT");
				// 조회조건 컨트롤 refresh(학년도, 학기)
				util.Control.redraw(app, ["cbbSchYearRcd", "cbbSmtRcd", "dipFromDate", "dipToDate", "radInOut"]);
				
				util.Control.setValue(app, "ckbHoliday", "Y");
			}
		}, true);
	};
	
	/**
	 * @desc [cbbSchYearRcd]학년도 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 10. 6
	 */
	moPage.onValueChanged_CbbSchYearRcd = function() {
		// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
		doChangeYearSmt("year");
	};
	
	/**
	 * @desc [cbbSmtRcd]학기 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 10. 6
	 */
	moPage.onValueChanged_CbbSmtRcd = function() {
		// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
		doChangeYearSmt("smt");
	};
	
	/**
	 * @desc 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 10. 6
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
	 * @desc [dipFromDate]결보강시작일자 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 10. 6
	 */
	moPage.onValueChanged_DipFromDate = function() {
		if(!doCheckDate("ST_DT")){
			util.Control.setValue(app, "dipFromDate", "");
		}
	};
	
	/**
	 * @desc [dipToDate]결보강종료일자 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 10. 6
	 */
	moPage.onValueChanged_DipToDate = function() {
		if( !doCheckDate("END_DT")){
			util.Control.setValue(app, "dipToDate", "");
		}
	};
	
	/**
	 * @desc 시작일이 종료일보다 크거나 종료일이 시작일보다 작은지 검사
	 * @param psColNm		(필수) 날짜컬럼명
	 * @return boolean
	 * @author 박갑수 at 2016. 10. 6
	 */
	function doCheckDate(psColNm){
		// 유효성 true or false
		var vbValid = true;

		// 시작일자
		var vsStDt = util.Control.getValue(app, "dipFromDate").substring(0, 8);
		// 종료일자
		var vsEndDt = util.Control.getValue(app, "dipToDate").substring(0, 8);
		
		// 시작일 유효성 체크
		if(psColNm == "ST_DT"){
			if(!ValueUtil.isNull(vsEndDt) && vsStDt > vsEndDt){
				// "시작일이 종료일 보다 클 수 없습니다." 메시지 출력
				util.Msg.alert("NLS-CSS-M063");
				vbValid = false;
				return vbValid;
			}

		// 종료일 유효성 체크
		} else if(psColNm == "END_DT"){
			if(!ValueUtil.isNull(vsStDt) && vsStDt > vsEndDt){
				util.Msg.alert("NLS-CSS-M064");
				vbValid = false;
				return vbValid;
			}
		}
		
		return vbValid;
	};
	
	/**
	 * @desc [btnSearch]조회 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 8. 10
	 */
	moPage.onClick_BtnSearch = function() { 
		 
		 // 조회조건 필수 체크
		if(!util.validate(app, ["cbbSchYearRcd", "cbbSmtRcd", "dipFromDate", "dipToDate"])){
			return false;
		}
		
		var vsSchYearRcd = util.Control.getValue(app, "cbbSchYearRcd");
		var vsSmtRcd = util.Control.getValue(app, "cbbSmtRcd");
		var vsHoliday = util.Control.getValue(app, "ckbHoliday");
		var vsDiv		= util.DataMap.getValue(app, "dmReqKey", "strDiv");
		var vsHolidayIn = "";
		
		if(ValueUtil.fixNull(vsHoliday) == "Y"){
			vsHolidayIn = "('CL10501', 'CL10503')";
		}else {
			vsHolidayIn = "('CL10501')";
		}
		
		var voParam = {
				p_strLanDivRcd 		: util.DataMap.getValue(app, "dmResOnLoad", "strLanDivRcd"),	// 언어키
				p_strSchYearRcd 	: vsSchYearRcd,															// 학년도코드
				p_strSmtRcd 			: vsSmtRcd,																	// 학기코드
				p_strStDt				: util.Control.getValue(app, "dipFromDate"),								// 시작일자
				p_strEndDt				: util.Control.getValue(app, "dipToDate"),									// 종료일자
				p_strLectDiv			: util.Control.getValue(app, "ckbLectDIv"),									// 강좌별
				p_strHoliday			: vsHolidayIn,																	// 공휴일포함
				p_strDiv					: vsDiv,																	// 결강/보강
				p_strError				: util.Control.getValue(app, "ckbError"),									// 오류
				p_strCheckAuthId 	: moUserInfo.id																// 사용자ID
		};
		
		var vsSchYearRcdNm = ExtInstance.getValue("/root/resOnLoad/schYearRcdList/row", "CD_NM" , "child::CD='"+vsSchYearRcd+"'");
		var vsSmtRcdNm = ExtInstance.getValue("/root/resOnLoad/smtRcdList/row", "CD_NM" , "child::CD='"+vsSmtRcd+"'");
		
		var vsTitle = vsSchYearRcdNm + " " + vsSmtRcdNm + " 결,보강 현황";
		
		var voOzFormParam = {
			  TITLE 		 : vsTitle			// 리포트타이틀
			, SUB_TITLE 	 : "" 					// 리포트서브타이틀		
			, FORM_TYPE : "flash"
		};
		
		util.Report.open(app, "hojReport", "extCcsSRestAppPcnd", voOzFormParam, voParam);
	};
	
	return moPage;
};
