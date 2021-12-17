//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCcsSIncompSplcSch.xtm"/>

/**
 * 개설과목관리
 * @class stdCcsCCurClsFrf
 * @author 박갑수 at 2016. 2. 4
 */
var extCcsSIncompSplcSch = function() {
	var moPage = new Page();
	
	// 임포트용 데이터 통신 오브젝트
	var moPObject = new Page();
	
	// 객체검색팝업 호출
	moPObject.moIdsForStdCmnPObjSch = [
	{
		controlId			:	"btnSaCd",
		iCd					:	"",
		iNm					:	"ipbSaNm",
		iObjDivRcd			:	["CC009SA", "CC009OG"],
		iStartObject    	:   "",
		iOtDivRcd			:	"",
		iOtIsTreeView	:	"",
		iLanDivRcd		:	"/root/resOnLoad/strLanDivRcd",
		iKeyDate			:	"/root/keyDateMap/ST_DT",
		iKeyEndDate		:	"",
		oObjDivRcd		:	"/root/reqKey/strObjDivRcd",
		oCd					:	"/root/reqKey/strObjCd",
		oCdNm				:	"ipbSaNm",
		oBegDt				:	"",
		oEndDt				:	"",
		oLanDivRcd		:	"",
		func 					:  function(poRtnValue){
		}
	}];
	
	
	
	// 교직원검색팝업 호출
	moPObject.moIdsForStdCmnPPrsnSearch = [
	{ 
		 controlId					: "btnProfId",
		 istrStaffGrpAuth			: "",					
		 istrWkdtyAuth			: "true",
		 iKeyDate					: "/root/keyDateMap/END_DT",
		 iStaffNo					: "ipbProfNm",				
		 iStaffGrpRcd				: "",	
		 iStaffGrpRcdLock		: "", 				
		 iStaffSubGrpRcd		: "",				
		 iStaffSubGrpRcdLock	: "",		
		 iStatusRcd				: "",		
		 iRepNm					: "ipbProfNm",		
		 iObjDivRcd				: "",			
		 iObjCd						: "",			
		 iObjNm					: "",		
		 istrObjCdInList			: "",		
		 iWkgrdRcd				: "",			
		  
		 oObjNo					: "/root/reqKey/strProfObjNo",		
		 oStaffNo					: "",				
		 oRepNm					: "ipbProfNm",			
		 oBirthday					: "",			
		 oStatNm					: "",		
		 oStatRcd					: "",			
		 oOgNm					: "",			
		 oOgCd						: "",				
		 oPosNm					: "",				
		 oPosCd					: "",				
		 oWkgrdNm				: "",			
		 oWkgrdRcd				: "",			
		 oStaffGrpRcd				: "",				
		 oStaffSubGrpRcd		: "",			
		 oHoRcd					: "",				
		 oSsn						: "",					
		 oWkdtyRcd				: "",				
		 oWkdtyNm				: "",	
		 func                         : function(poParam){
			 
			
		}
	}];
	 
	 
	
	
	// 학년도 학기를 원래데이터로 되돌리기위한 변수
	var msSchYearRcd = "";
	var msSmtRcd = "";
	
	/**
	 * @desc import 헤더 초기화
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 2. 4
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		// import 헤더 초기화
		doHeaderOnLoad();
	};
	
	/**
	 * @desc onLoad 실행
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 4
	 */
	moPage.onModelConstructDone_ExtCcsSIncompSplcSch = function() {
		
		
		// 리피트 초기 설정
		//ExtRepeat.init(["rptCcsOpenSub"]);
		
		// 검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grpData"]);
		
		
		
		// 서브미션 호출
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				
				
				// 전체권한[CC00102]인 경우
				if( moPageInfo.authRngRcd == "CC00102") {
					util.Control.setValue(app, "radSchDiv", "CCS");
					
				} else {
					util.Control.setValue(app, "radSchDiv", "APS");
					util.Control.setEnable(app, false, "radSchDiv");
				}
					
				
				
				
				util.Control.redraw(app, ["cbbSchYearRcd", "cbbSmtRcd", "radSchDiv"]);
				// 학년도 학기값 되돌리기위한 값
				msSchYearRcd = util.DataMap.getValue(app, "dmKeyDateMap", "YEAR");
				msSmtRcd = util.DataMap.getValue(app, "dmKeyDateMap", "SMT");
				
				setStdCmnPObjSchObjInfo();
			}
		}, true);
	};
	
	
	
	
	/**
	 * @desc 이수과정, 교과그룹목록 조회
	 * @param poCallBackFunc 콜백정의, 교과목코드
	 * @return void
	 * @author 박갑수 at 2016. 2. 1
	 */
	function doSpCuList(poCallBackFunc, psCuCd) {
		
		//strCommand: getSaSpCu 
		util.Submit.send(app, "subSpCuList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, ["cbbCuCd"]);
				util.SelectCtl.selectItem(app, "cbbCuCd", 0);				
			// 조회 후 콜백함수 수행
			if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
			}
		});
	};
	
	
	
	
	/**
	 * @desc [cbbSchYearRcd]학년도 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 4
	 */
	moPage.onValueChanged_CbbSchYearRcd = function() {
		// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
		doChangeYearSmt("year");
	};
	
	/**
	 * @desc [cbbSmtRcd]학기 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 4
	 */
	moPage.onValueChanged_CbbSmtRcd = function() {
		// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
		doChangeYearSmt("smt");
	};
	
	/**
	 * @desc 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 5
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
	 * @author 박갑수 at 2016. 2. 11
	 */
	moPage.onClick_BtnSearch = function() {
		 
		 
		 // 조회조건 필수 체크
		if(!util.validate(app, ["cbbSchYearRcd", "cbbSmtRcd", "ipbSaNm"])){
			return false;
		}
		
		
		page.doList();
		
	};
	
	/**
	 * @desc 개설과목목록 조회
	 * @param poCallBackFunc 콜백정의
	 * @return void
	 * @author 박갑수 at 2016. 2. 11
	 */
	function doList(poCallBackFunc) {			
		
		
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				
				var vsSchYearRcd 	= util.DataMap.getValue(app, "dmKeyDateMap", "YEAR");
				var vsSmtRcd 		= util.DataMap.getValue(app, "dmKeyDateMap", "SMT");				
				var vsKeyDate 		= util.DataMap.getValue(app, "dmKeyDateMap", "END_DT");				//--기준일자 
				var vsSaCdList       = util.DataMap.getValue(app, "dmResList", "strListSaCd");		
				var vsOgCdList 		= util.DataMap.getValue(app, "dmResList", "strListOgCd");				
				var vsSchDiv			= util.DataMap.getValue(app, "dmReqKey", "strSchDiv");
				var vsProfObjNo		= util.DataMap.getValue(app, "dmReqKey", "strProfObjNo");
				
				if(vsSchDiv != 'CCS'){
					vsSaCdList = vsOgCdList;
				}
				

				var vsSchYearRcdNm = ExtInstance.getValue("/root/resOnLoad/schYearRcdList/row", "CD_NM" , "child::CD='"+ vsSchYearRcd +"'");
				var vsSmtRcdNm = ExtInstance.getValue("/root/resOnLoad/smtRcdList/row", "CD_NM" , "child::CD='"+ vsSmtRcd +"'");
				var vsSchYearRcdNmSub = vsSchYearRcdNm.replace(/학년도/gi,'-');
				var vsTitle = vsSchYearRcdNmSub + vsSmtRcdNm + " 수업일수 미달강좌 보강계획서";
				var vsOgCd = util.DataMap.getValue(app, "dmResList", "strOgCd");
				
				var voParam = {
						p_strLanDivRcd 			: msDefaultLocale,	 												// 언어키
						p_strKeyDate 			: vsKeyDate,  														// 기준일
						p_strSchYearRcd	    : vsSchYearRcd,  													// 학년도
						p_strSmtRcd 		        : vsSmtRcd,  															// 학기
						p_strSaCd	 	            : vsSaCdList,  													    // 교수코드						
						p_strSchDiv		        : vsSchDiv,
						p_strOgCd					: vsOgCd,																// 행정부서명
						p_strProfObjNo			: vsProfObjNo,														//교수 오브젝트
						p_strMenuId 				: moPageInfo.menuId,												// 메뉴ID
						p_strCheckAuthId 		: moUserInfo.id														// 사용자ID
					};
					
				var voOzFormParam = {
						  TITLE : vsTitle //리포트타이틀
						, SUB_TITLE : "서브타이틀" //리포트서브타이틀		
						, FORM_TYPE : "flash"
					};	
					
					util.Report.open(app, "hojReport", "extCcsSIncompSplcSch", voOzFormParam, voParam);
			}
		});
		
	};
	
	
	
//	moPage.onValueChanged_IpbObjNm = function(sender) {
//	// 값변경시 교직원검색팝업 호출 
//		doOnChangeStdCmnPPrsnSearch(sender);
//	};
	
	
	
	
//	moPage.onClick_BtnObjNm = function(sender) {
//		// 교직원검색팝업 호출
//		doOnClickStdCmnPPrsnSearch(sender);
//	};
	
	
	moPage.onClick_BtnSaCd = function(sender) {
		// 객체검색팝업 호출
		doOnClickStdCmnPObjSch(sender);
	}
	
	moPage.onValueChanged_IpbSaNm = function(sender) {
		
		
		// 값변경시 객체검색팝업 호출
		doOnChangeStdCmnPObjSch(sender);
	}
	
	moPage.onValueChanged_RadSchDiv = function() {
		var vsSchDiv			= util.DataMap.getValue(app, "dmReqKey", "strSchDiv");
		var vsObjDivRcd     = util.DataMap.getValue(app, "dmReqKey", "strObjDivRcd");
		
		if(vsSchDiv == 'CCS'){
			moPObject.moIdsForStdCmnPObjSch[0].iObjDivRcd			=	["CC009SA", "CC009OG"];
		}else{
			if("CC009OG" != vsObjDivRcd){
				util.DataMap.setValue(app, "dmReqKey", "strObjNm", "");
				util.DataMap.setValue(app, "dmReqKey", "strObjCd", "");
				util.Control.redraw(app, ['ipbSaNm']);
				
			}
			moPObject.moIdsForStdCmnPObjSch[0].iObjDivRcd			=	["CC009OG"];
		}
				
		
	}
	
	moPage.onClick_BtnProfId = function(poSender) {
		doOnClickStdCmnPPrsnSearch(poSender);
	}
	
	moPage.onValueChanged_IpbProfNm = function(poSender) {
		doOnChangeStdCmnPPrsnSearch(poSender);
	}
	return moPage;
};
