//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCgdCRelEstBat.xtm"/>

/**
 * 상대평가기준설정배치
 * @class extCgdCRelEstBat
 * @author 박갑수 at 2016. 5. 23
 */
var extCgdCRelEstBat = function() {
	var moPage = new Page();
	
	var moPObject = new PObject();
	
	// 객체검색팝업 호출
	moPObject.moIdsForStdCmnPObjSch = [
	{
		controlId			:	"btnDeptNm",
		iCd					:	"",
		iNm					:	"ipbDeptNm",
		iObjDivRcd			:	["CC009OG", "CC009SA"],
		iStartObject    	:   "",
		iOtDivRcd			:	"",
		iOtIsTreeView	:	"",
		iLanDivRcd		:	"/root/resOnLoad/strLanDivRcd",
		iKeyDate			:	"/root/keyDateMap/ST_DT",
		iKeyEndDate		:	"",
		oObjDivRcd		:	"/root/reqKey/strObjDivRcd",
		oCd					:	"/root/reqKey/strDeptCd",
		oCdNm				:	"ipbDeptNm",
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
	 * @author 박갑수 at 2016. 5. 23
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		// import 헤더 초기화
		doHeaderOnLoad();
	};
	
	/**
	 * @desc onLoad 실행
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 23
	 */
	moPage.onModelConstructDone_ExtCgdCRelEstBat = function() {
		// 리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["rptCcsOpenSub"]);
		// 검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grpData"]);
		
		// 서브미션 호출
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				
				
				util.DataMap.setValue(app, "dmReqKey", "strTcNot", "Y");
				util.Control.redraw(app, ["cbbSchYearRcd", "cbbSmtRcd", "cbbSbLvlRcd", "cbbCmpDivRcd", "ckbDclRcd", "cbbEvalMethodRcd", "cbbRelEstTypeRcd", "ckbTcNot"]);
				
				setStdCmnPObjSchObjInfo();
				
			}
		}, true);
	};
	
	/**
	 * @desc [cbbSchYearRcd]학년도 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 23
	 */
	moPage.onValueChanged_CbbSchYearRcd = function() {
		// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
		doChangeYearSmt("year");
	};
	
	/**
	 * @desc [cbbSmtRcd]학기 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 23
	 */
	moPage.onValueChanged_CbbSmtRcd = function() {
		// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
		doChangeYearSmt("smt");
	};
	
	/**
	 * @desc 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 23
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
	 * @desc [btnDeptNm]소속(돋보기버튼) onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 23
	 */
	moPage.onClick_BtnDeptNm = function(sender) {
		// 객체검색팝업 호출
		doOnClickStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc [ipbDeptNm]소속 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 23
	 */
	moPage.onValueChanged_IpbDeptNm = function(sender) {
		// 리피트 변경사항 체크
		if(util.Grid.isModified(app, ["grdCcsOpenSub"])){
			return false;
		}
		
		// 값변경시 객체검색팝업 호출
		doOnChangeStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc [ipbTlsnReqCapa]수강인원 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 23
	 */
	moPage.onValueChanged_IpbTlsnReqCapa = function() {
		ValidUtil.checkIntegerDecimal("ipbTlsnReqCapa", 3, 0, true);
	};
	
	/**
	 * @desc [btnSearch]조회 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 23
	 */
	moPage.onClick_BtnSearch = function() {
		// 작업영역 리피트 변경 내역 체크
		if(util.Grid.isModified(app, "", "CRM")){
			return false;
		}
	
		// 조회조건 필수 체크
		if(!util.validate(app, ["cbbSchYearRcd", "cbbSmtRcd", "ipbDeptNm"])){
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
	 * @desc 개설과목 조회
	 * @param poCallBackFunc 콜백정의
	 * @return void
	 * @author 박갑수 at 2016. 5. 23
	 */
	function doList(poCallBackFunc) {
		
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdCcsOpenSub");
				
				// 조회 후 콜백함수 수행
				if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess); 
			}
		});
	};
	
	/**
	 * @desc [btnBatch]설정 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 23
	 */
	moPage.onClick_BtnBatch = function() {
		// 평가방법
		var vsEvalMethodRcd = util.Control.getValue(app, "cbbEvalMethodRcd");
		var vsEvalMethodRcdNm = ExtInstance.getValue("/root/resOnLoad/evalMethodRcdList/row", "CD_NM" , "child::CD='"+vsEvalMethodRcd+"'");
		
		// 상대평가유형
		var vsRelEstTypeRcd = util.Control.getValue(app, "cbbRelEstTypeRcd");
		var vsRelEstTypeRcdNm = ExtInstance.getValue("/root/resOnLoad/relEstTypeCdList/row", "CD_NM" , "child::CD='"+vsRelEstTypeRcd+"'");
		
		// "개설과목의 평가방법 : @, 상대평가유형 : @으로 변경 하시겠습니까?" 메시지
		if(util.Msg.confirm("NLS-CRM-M088", [vsEvalMethodRcdNm, vsRelEstTypeRcdNm]) ){
			// 개설과목 평가방법,상대평가유형 배치처리
			doSave();
		}
	};
	
	/**
	 * @desc 개설과목 평가방법,상대평가유형 배치처리
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 23
	 */
	function doSave() {
		//strCommand: save 
		util.Submit.send(app, "subSave", function(pbSuccess){
			if(pbSuccess){
				// 조회
				doList(function(pbSuccess) {
					if (pbSuccess){
						var vsCnt = util.DataMap.getValue(app, "dmResList", "iCnt");
						// "@건 처리되었습니다." 메시지
						util.Msg.alert("NLS-INF-M055", [vsCnt]);
					}
				});
			}else {
				// "처리가 취소되었습니다." 헤더 메시지
				util.Msg.notify(app, "NLS.INF.M013");
			}
		});
	};
	
	return moPage;
};
