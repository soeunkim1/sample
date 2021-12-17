//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCcsSAttendClosePcnd.xtm"/>

/**
 * 출결마감현황
 * @class extCcsSAttendClosePcnd
 * @author 박갑수 at 2016. 4. 27
 */
var extCcsSAttendClosePcnd = function() {
	var moPage = new Page();
	
	// 임포트용 데이터 통신 오브젝트
	var moPObject = new Page();
	
	// 객체검색팝업 호출
	moPObject.moIdsForStdCmnPObjSch = [
	{
		controlId			:	"btnObjNm",
		iCd					:	"",
		iNm					:	"ipbObjNm",
		iObjDivRcd			:	["CC009OG", "CC009SA"],
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
		func 					:  function(){}
	}];
	
	// 학년도 학기를 원래데이터로 되돌리기위한 변수
	var msSchYearRcd = "";
	var msSmtRcd = "";
	
	/**
	 * @desc import 헤더 초기화
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 4. 27
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		// import 헤더 초기화
		doHeaderOnLoad();
	};
	
	/**
	 * @desc onLoad 실행
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 27
	 */
	moPage.onModelConstructDone_ExtCcsSAttendClosePcnd = function() {
		// 리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["rptExtCcsAttend"]);
		// 검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grpData"]);
		
		// 서브미션 호출
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				
				util.Control.redraw(app, ["cbbSchYearRcd", "cbbSmtRcd", "ipbObjNm", "dipStLsnDt", "dipEndLsnDt"]);
				
				// 권한에 따른 소속부서 default값 세팅 
				doSetCtlByAuth();
				
				// 초기값 마감(미처리)
				util.Control.setValue(app, "rdbCloseYn", "N");
				
				//--주차를 조회한다.
				page.doWeekList(
//					function(){
//						page.onValueChanged_CbbWeekSeqSt();
//						
//					}
				);
				
				
			}
		}, true);
	};
	
	/**
	 * 권한에 따른 소속부서 default값 세팅 
	 * @param 
	 * @type void
	 * @author 박갑수 at 2016. 8. 9
	 */	
	function doSetCtlByAuth() {
		
		// 전체권한[CC00102] 아닐경우 자신의 소속 Default 세팅 
		if (moPageInfo.authRngRcd != "CC00102") {
			
			util.DataMap.setValue(app, "dmReqKey", "strObjDivRcd", moUserInfo.asgnDeptDivRcd);
			util.DataMap.setValue(app, "dmReqKey", "strObjCd", moUserInfo.asgnDeptCd);
			util.Control.setValue(app, "ipbObjNm", moUserInfo.asgnDeptNm);
		}
	};
	
	/**
	 * @desc [cbbSchYearRcd]학년도 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 27
	 */
	moPage.onValueChanged_CbbSchYearRcd = function() {
		// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
		doChangeYearSmt("year");
	};
	
	/**
	 * @desc [cbbSmtRcd]학기 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 27
	 */
	moPage.onValueChanged_CbbSmtRcd = function() {
		// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
		doChangeYearSmt("smt");
	};
	
	/**
	 * @desc 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 27
	 */
	function doChangeYearSmt(psDiv) {
		//strCommand: date 
		util.Submit.send(app, "subDate", function(pbSuccess){
			if(pbSuccess){
				msSchYearRcd = util.DataMap.getValue(app, "dmKeyDateMap", "YEAR");
				msSmtRcd = util.DataMap.getValue(app, "dmKeyDateMap", "SMT");
				
				//--주차를 조회한다.
				page.doWeekList();
				
				
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
	 * @desc [dipStLsnDt]수업기간(시작) onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 27
	 */
	moPage.onValueChanged_DipStLsnDt = function() {
		if(!doCheckDate("ST_DT")){
			util.Control.setValue(app, "dipStLsnDt", "");
		}
	};
	
	/**
	 * @desc [dipEndLsnDt]수업기간(종료) onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 27
	 */
	moPage.onValueChanged_DipEndLsnDt = function() {
		if( !doCheckDate("END_DT")){
			util.Control.setValue(app, "dipEndLsnDt", "");
		}
	};
	
	/**
	 * @desc 시작일이 종료일보다 크거나 종료일이 시작일보다 작은지 검사
	 * @param psColNm		(필수) 날짜컬럼명
	 * @return boolean
	 * @author 박갑수 at 2016. 4. 27
	 */
	function doCheckDate(psColNm){
		// 유효성 true or false
		var vbValid = true;

		// 시작일자
		var vsStDt = util.Control.getValue(app, "dipStLsnDt").substring(0, 8);
		// 종료일자
		var vsEndDt = util.Control.getValue(app, "dipEndLsnDt").substring(0, 8);
		
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
	 * @author 박갑수 at 2016. 4. 27
	 */
	moPage.onClick_BtnSearch = function() {
		// 작업영역 리피트 변경 내역 체크
		if(util.Grid.isModified(app, "", "CRM")){
			return false;
		}

		// 조회조건 필수 체크
		if(!util.validate(app, ["cbbSchYearRcd", "cbbSmtRcd", "ipbObjNm", "dipStLsnDt", "dipEndLsnDt"])){
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
	 * @desc 강좌출결마감
	 * @param poCallBackFunc 콜백정의
	 * @return void
	 * @author 박갑수 at 2016. 4. 27
	 */
	function doList(poCallBackFunc) {
		
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdExtCcsAttend");
				
				// 조회 후 콜백함수 수행
				if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess); 
			}
		});
	};

	/**
	 * @desc [btnObjNm]소속(돋보기버튼) onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 8. 9
	 */
	moPage.onClick_BtnObjNm = function(sender) {
		// 객체검색팝업 호출
		doOnClickStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc [ipbObjNm]소속 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 8. 9
	 */
	moPage.onValueChanged_IpbObjNm = function(sender) {
		// 값변경시 객체검색팝업 호출
		doOnChangeStdCmnPObjSch(sender);
	};
	
	
	/**
	 * @desc 주차를 조회한다.
	 * @param {Function} poCallBackFunc 콜백정의
	 * @return void
	 * @author 박갑수 at 2016. 4. 25
	 */
	function doWeekList(poCallBackFunc) {
		
		//strCommand: weekList 
		util.Submit.send(app, "subWeekList", function(pbSuccess){
			if(pbSuccess){
				
				util.Control.redraw(app, ["cbbWeekSeqSt"]);				
				
				
				page.onValueChanged_CbbWeekSeqSt();
				
				
				// 조회 후 콜백함수 수행
				if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess); 
			}
		});
	};
	
	
	
	moPage.onValueChanged_CbbWeekSeqStValue= function(){
		var vsWeekSeq = util.DataMap.getValue(app, "dmReqKey", "strWeekSeq");
		page.onValueChanged_CbbWeekSeqSt(vsWeekSeq);
	}
	
	/*
		주차에 해당하는 시작일자 ~ 종료일자
	*/
	moPage.onValueChanged_CbbWeekSeqSt = function(vpWeekSeq) {
		
		var vsWeekSeq = ExtInstance.getValue("/root/resOnLoad/listWeekSeq/row", "WEEK_SEQ", "child::SYS_WEEK = 'Y'");
		if(vpWeekSeq != null){
			vsWeekSeq = vpWeekSeq;
		}
		
		if(!ValueUtil.isNull(vsWeekSeq)){							
			var vsStDt				= ExtInstance.getValue("/root/resOnLoad/listWeekSeq/row", "ST_DT", "child::WEEK_SEQ = '"+vsWeekSeq+"'");
			var vsEndDt			= ExtInstance.getValue("/root/resOnLoad/listWeekSeq/row", "END_DT", "child::WEEK_SEQ = '"+vsWeekSeq+"'");
			
			util.DataMap.setValue(app, "dmReqKey", "strStDt"		, vsStDt);
			util.DataMap.setValue(app, "dmReqKey", "strEndDt"	, vsEndDt);
			util.DataMap.setValue(app, "dmReqKey", "strWeekSeq"	, vsWeekSeq);
			
			
		}else{
			
			var vnColCnt 	= util.DataSet.getRowCount(app, "dsListWeekSeq");
			vsWeekSeq 	=  util.DataSet.getValue(app, "dsListWeekSeq", "WEEK_SEQ", vnColCnt);
			
			var vsStDt				= ExtInstance.getValue("/root/resOnLoad/listWeekSeq/row", "ST_DT", "child::WEEK_SEQ = '"+vsWeekSeq+"'");
			var vsEndDt			= ExtInstance.getValue("/root/resOnLoad/listWeekSeq/row", "END_DT", "child::WEEK_SEQ = '"+vsWeekSeq+"'");
			
			util.DataMap.setValue(app, "dmReqKey", "strStDt"		, vsStDt);
			util.DataMap.setValue(app, "dmReqKey", "strEndDt"	, vsEndDt);
			util.DataMap.setValue(app, "dmReqKey", "strWeekSeq"	, vsWeekSeq);

			
		}
		
		util.Control.redraw(app, ["dipStLsnDt","dipEndLsnDt", "cbbWeekSeqSt"]);
		
		
	}
	
	
	
	return moPage;
};
