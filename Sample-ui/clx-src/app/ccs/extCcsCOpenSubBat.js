//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCcsCOpenSubBat.xtm"/>

/**
 * 개설과목배치
 * @class extCcsCOpenSubBat
 * @author 박갑수 at 2016. 4 .27
 */
var extCcsCOpenSubBat = function() {
	var moPage = new Page();
	
	// 임포트용 데이터 통신 오브젝트
	var moPObject = new Page();
	
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
		func 					:  function(){
			// 부서(행정,학사)에따른 조회조건컨트롤 필터링
			doSaFilter();
		}
	}];
	
	// 학년도 학기를 원래데이터로 되돌리기위한 변수
	var msSchYearRcd = "";
	var msSmtRcd = "";
	var msKeyDate = "";
	
	/**
	 * @desc import 헤더 초기화
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 4 .27
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		// import 헤더 초기화
		doHeaderOnLoad();
	};
	
	/**
	 * @desc onLoad 실행
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4 .27
	 */
	moPage.onModelConstructDone_ExtCcsCOpenSubBat = function() {
		// 서브미션 호출
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				
				util.Control.redraw(app, ["cbbSchYearRcd", "cbbSmtRcd", "dipKeyDate"]);
				
				util.Control.setEnable(app, false, ["cbbCuCd", "cbbSbLvlRcd", "cbbDivclsNm"]);
			}
		}, true);
	};
	
	/**
	 * @desc 부서(행정,학사)에따른 조회조건컨트롤 필터링
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4 .27
	 */
	function doSaFilter(){
		// 소속부서에따른 교과그룹 필터링
		var vsObjDivRcd = util.DataMap.getValue(app, "dmReqKey", "strObjDivRcd");
		
		// 행정부서[CC009OG], 학사부서[CC009SA]에따른 교과그룹, 학년, 개설분반 활성 비활성
		if(vsObjDivRcd == "CC009SA"){
			//strCommand: estDivclslist 
			util.Submit.send(app, "subEstDivclsList", function(pbSuccess){
				if(pbSuccess){
					
					util.Control.setEnable(app, true, ["cbbCuCd", "cbbSbLvlRcd", "cbbDivclsNm"]);
					util.Control.redraw(app, ["cbbCuCd", "cbbSbLvlRcd", "cbbDivclsNm"]);
					
					// 교과그룹에따른 학년 필터링
					doFilterSbLvl();
					// 교과그룹, 학년에따른 개설분반 필터링
					doFilterDivcls();
				}
			});
		}else {
			util.Control.setValue(app, "cbbCuCd", "");
			util.Control.setValue(app, "cbbSbLvlRcd", "");
			util.Control.setValue(app, "cbbDivclsNm", "");
			
			util.Control.setEnable(app, false, ["cbbCuCd", "cbbSbLvlRcd", "cbbDivclsNm"]);
		}
	};
	
	/**
	 * @desc [cbbSchYearRcd]학년도 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4 .27
	 */
	moPage.onValueChanged_CbbSchYearRcd = function() {
		// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
		doChangeYearSmt("year");
		
		// 소속, 교과그룹, 학년, 개설분반 초기화
		doClearSchCtl();
	};
	
	/**
	 * @desc [cbbSmtRcd]학기 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4 .27
	 */
	moPage.onValueChanged_CbbSmtRcd = function() {
		// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
		doChangeYearSmt("smt");
		
		// 소속, 교과그룹, 학년, 개설분반 초기화
		doClearSchCtl();
	};
	
	/**
	 * @desc 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4 .27
	 */
	function doChangeYearSmt(psDiv) {
		//strCommand: date 
		util.Submit.send(app, "subDate", function(pbSuccess){
			if(pbSuccess){				
				msSchYearRcd = util.DataMap.getValue(app, "dmKeyDateMap", "YEAR");
				msSmtRcd = util.DataMap.getValue(app, "dmKeyDateMap", "SMT");
				msKeyDate = util.DataMap.getValue(app, "dmKeyDateMap", "ST_DT");
				util.Control.setValue(app, "dipKeyDate", msKeyDate);
			// Exception 발생시
			}else {
				if(psDiv == "year"){
					util.Control.setValue(app, "cbbSchYearRcd", msSchYearRcd);
					util.Control.setValue(app, "dipKeyDate", msKeyDate);
				}else if(psDiv == "smt"){
					util.Control.setValue(app, "cbbSmtRcd", msSchYearRcd);
					util.Control.setValue(app, "dipKeyDate", msKeyDate);
				}
			}
		});
	};
	
	/**
	 * @desc 학년도 학기 변경시 소속, 교과그룹, 학년, 개설분반 초기화
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4 .27
	 */
	function doClearSchCtl() {
		util.DataMap.setValue(app, "dmReqKey", "strDeptCd", "");
		util.DataMap.setValue(app, "dmReqKey", "strObjDivRcd", "");
		util.Control.setValue(app, "ipbDeptNm", "");
		util.Control.setValue(app, "cbbCuCd", "");
		util.Control.setValue(app, "cbbSbLvlRcd", "");
		util.Control.setValue(app, "cbbDivclsNm", "");
		
		util.Control.setEnable(app, false, ["cbbCuCd", "cbbSbLvlRcd", "cbbDivclsNm"]);
	};
	
	/**
	 * @desc [btnDeptNm]부서명(돋보기버튼) onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4 .27
	 */
	moPage.onClick_BtnDeptNm = function(sender) {
		// 객체검색팝업 호출
		doOnClickStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc [ipbDeptNm]부서명 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4 .27
	 */
	moPage.onValueChanged_IpbDeptNm = function(sender) {
		// 값변경시 객체검색팝업 호출
		doOnChangeStdCmnPObjSch(sender);
		
		var vsDeptNm = util.Control.getValue(app, "ipbDeptNm");
		if(ValueUtil.isNull(vsDeptNm)){
			util.Control.setEnable(app, false, ["cbbCuCd", "cbbSbLvlRcd", "cbbDivclsNm"]);
		}
	};
		
	/**
	 * @desc [cbbCuCd]교과그룹 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4 .27
	 */
	moPage.onValueChanged_CbbCuCd = function() {
		// 교과그룹에따른 학년 필터링
		doFilterSbLvl();
		// 교과그룹, 학년에따른 개설분반 필터링
		doFilterDivcls();
	};
	
	/**
	 * @desc [cbbSbLvlRcd]학년 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4 .27
	 */
	moPage.onValueChanged_CbbSbLvlRcd = function() {
		// 교과그룹, 학년에따른 개설분반 필터링
		doFilterDivcls();
	};
	
	/**
	 * @desc 교과그룹, 학년에따른 개설분반 필터링
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4 .27
	 */
	function doFilterDivcls(){
		var vsCuCd = util.Control.getValue(app, "cbbCuCd");
		var vsSbLvlRcd = util.Control.getValue(app, "cbbSbLvlRcd");
		
		ExtControl.setAttr("cbbDivclsNm", "nodeset", "/root/resList/estDivclsList/row[child::CU_CD = '"+vsCuCd+"' and SB_LVL_RCD = '"+vsSbLvlRcd+"'] " );
		
		util.Control.redraw(app, "cbbDivclsNm");
	};
	
	/**
	 * @desc 교과그룹에따른 학년 필터링
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4 .27
	 */
	function doFilterSbLvl(){
		var vsCuCd = util.Control.getValue(app, "cbbCuCd");
		
		ExtControl.setAttr("cbbSbLvlRcd", "nodeset", "/root/resList/estDivclsSbLvlList/row[child::CU_CD = '"+vsCuCd+"'] " );
		
		util.Control.redraw(app, "cbbSbLvlRcd");
	};
	
	/**
	 * @desc [btnAllBat]일괄생성 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4 .27
	 */
	moPage.onClick_BtnAllBat = function() {
		// 조회조건 필수체크
		if(!util.validate(app, ["cbbSchYearRcd", "cbbSmtRcd", "dipKeyDate", "ipbDeptNm"])){
			return false;
		}
		
		// 일괄개설 전 체크
		doSaveChk(function(pbSuccess) {
			if (pbSuccess){
				// 일괄개설
				doAllBat();
			}
		});
	};
	
	/**
	 * @desc  일괄개설 전 체크
	 * @param {Function} poCallBackFunc 콜백정의
	 * @return void
	 * @author 박갑수 at 2016. 4 .27
	 */
	function doSaveChk(poCallBackFunc) {
		//strCommand: saveChk 
		util.Submit.send(app, "subSaveChk", function(pbSuccess){
			if(pbSuccess){
				
				var vsSaveChk = util.DataMap.getValue(app, "dmResList", "strChkYn");
				if(ValueUtil.fixNull(vsSaveChk) == "Y"){
					var vsTitle = ExtControl.getTextValue("btnAllBat");
					// 기존에 있던 자료는 삭제됩니다
					var vsMsg = NLS.APS.M002 + ". " + vsTitle;
					// "기존 DATA는 삭제 됩니다. 일괄 개설 하시겠습니까?" 메시지
					if(!util.Msg.confirm("NLS-CRM-M010", [vsMsg]) ){
						// 콜백함수실행
						if (util.isFunc(poCallBackFunc)) poCallBackFunc(false);
						return false;
					}
				}else {
					var vsTitle = ExtControl.getTextValue("btnAllBat");
					// "일괄개설 을(를) 처리하시겠습니까?" 메시지
					if(!util.Msg.confirm("NLS-CRM-M018", [vsTitle]) ){
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
	 * @desc 일괄개설
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4 .27
	 */
	function doAllBat() {
		//strCommand: allBat 
		util.Submit.send(app, "subAllBat", function(pbSuccess){
			if(pbSuccess){
				// "처리되었습니다." 헤더 메시지
				util.Msg.notify(app, "NLS.INF.M003");
			}else {
				// "처리가 취소되었습니다." 헤더 메시지
				util.Msg.notify(app, "NLS.INF.M013");
			}
		});
	};
	
	/**
	 * @desc [btnAllDel]일괄삭제 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4 .27
	 */
	moPage.onClick_BtnAllDel = function() {
		// 조회조건 필수체크
		if(!util.validate(app, ["cbbSchYearRcd", "cbbSmtRcd", "dipKeyDate", "ipbDeptNm"])){
			return false;
		}
		
		var vsTitle = ExtControl.getTextValue("btnAllDel");
		// "일괄삭제 을(를) 처리하시겠습니까?" 메시지
		if(util.Msg.confirm("NLS-CRM-M018", [vsTitle]) ){
			//strCommand: allDel 
			util.Submit.send(app, "subAllDel", function(pbSuccess){
				if(pbSuccess){
					// "처리되었습니다." 헤더 메시지
					util.Msg.notify(app, "NLS.INF.M003");
				}else {
					// "처리가 취소되었습니다." 헤더 메시지
					util.Msg.notify(app, "NLS.INF.M013");
				}
			});
		}
	};
	return moPage;
};
