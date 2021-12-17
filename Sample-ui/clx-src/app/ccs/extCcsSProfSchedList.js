//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCcsSProfSchedList.xtm"/>

/**
 * 개설과목관리
 * @class stdCcsCCurClsFrf
 * @author 박갑수 at 2016. 2. 4
 */
var extCcsSProfSchedList = function() {
	var moPage = new Page();
	
	// 임포트용 데이터 통신 오브젝트
	var moPObject = new Page();
	
	// 교직원 검색
	 moPObject.moIdsForStdCmnPPrsnSearch = [
	{
		 controlId					: "btnObjNm",
		 istrStaffGrpAuth			: "",					
		 istrWkdtyAuth			: "",				
		 iKeyDate					: "/root/keyDateMap/END_DT",	
		 iStaffNo					: "ipbObjNm",			
		 iStaffGrpRcd				: "",		
		 iStaffGrpRcdLock		: "", 			
		 iStaffSubGrpRcd		: "",	
		 iStaffSubGrpRcdLock	: "",				
		 iStatusRcd				: "",				
		 iRepNm					: "",				
		 iObjDivRcd				: "",
		 iObjCd						: "",				
		 iObjNm					: "",	
		 istrObjCdInList			: "",
		 iWkgrdRcd				: "",	
		  
		 oObjNo					: "/root/reqKey/strProfObjNo",
		 oStaffNo					: "",					
		 oRepNm					: "ipbObjNm",					
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
		 func                         : function(poRtnValue){
			 
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
	moPage.onModelConstructDone_StdCcsCOpenSubFrf = function() {
		
		
		// 리피트 초기 설정
		//ExtRepeat.init(["rptCcsOpenSub"]);
		
		// 검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grpData"]);
		
		// 권한에따른 교수명 컬럼 검색가능 여부
		doVisibleCtlByAuth();
		
		// 서브미션 호출
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				
				util.Control.redraw(app, ["cbbSchYearRcd", "cbbSmtRcd"]);
				// 학년도 학기값 되돌리기위한 값
				msSchYearRcd = util.DataMap.getValue(app, "dmKeyDateMap", "YEAR");
				msSmtRcd = util.DataMap.getValue(app, "dmKeyDateMap", "SMT");
				
				util.Control.setFocus(app, "ipbSaNm");
				
				// 개인권한일경우 바로조회
				if(moPageInfo.authRngRcd == "CC00104"){
					util.Header.clickSearch(app);
				}
				
				
			}
		}, true);
	};
	
	
	/**
	 * 권한에 따른 교수명 활성/비활성 처리
	 * @param 
	 * @type void
	 * @author 박갑수 at 2016. 8. 19
	 */	
	function doVisibleCtlByAuth() {
		
		// 개인권한[CC00104] : 
		if (moPageInfo.authRngRcd == "CC00104") {
			util.Control.setVisible(app, false, ["btnObjNm"]);
			util.Control.setEnable(app, false, ["ipbObjNm", "cbbSchYearRcd", "cbbSmtRcd"]);
						
			util.Control.setValue(app, "ipbObjNm", moUserInfo.userNm);
			util.DataMap.setValue(app, "dmReqKey", "strProfObjNo", moUserInfo.id);
		}
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
		if(!util.validate(app, ["cbbSchYearRcd", "cbbSmtRcd", "ipbObjNm"])){
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
		
		var vsSchYearRcd 	= util.DataMap.getValue(app, "dmKeyDateMap", "YEAR");
		var vsSmtRcd 		= util.DataMap.getValue(app, "dmKeyDateMap", "SMT");
		var vsProfObjNo 	= util.DataMap.getValue(app, "dmReqKey", "strProfObjNo");
		var vsKeyDate 			= util.DataMap.getValue(app, "dmKeyDateMap", "END_DT");				//--기준일자 
		
		
//		alert("vsSchYearRcd"+vsSchYearRcd+"vsSmtRcd"+vsSmtRcd+"vsProfObjNo"+vsProfObjNo);
	
		var voParam = {
				p_strLanDivRcd 			: msDefaultLocale,	 												// 언어키
				p_strKeyDate 			: vsKeyDate,  														// 기준일
				p_strSchYearRcd	: vsSchYearRcd,  														// 학년도
				p_strSmtRcd 		: vsSmtRcd,  																	// 학기
				p_strProfObjNo	 	: vsProfObjNo,  													       	// 교수코드
				p_strMenuId 				: moPageInfo.menuId,												// 메뉴ID
				p_strCheckAuthId 		: moUserInfo.id														// 사용자ID
			};
			
		var voOzFormParam = {
				  TITLE : "교수 시간표" //리포트타이틀
				, SUB_TITLE : "서브타이틀" //리포트서브타이틀		
				, FORM_TYPE : "flash"
			};	
			
			util.Report.open(app, "hojReport", "extCcsSProfSchedList", voOzFormParam, voParam);
		
	};
	
	
	moPage.onValueChanged_IpbObjNm = function(sender) {
	// 값변경시 교직원검색팝업 호출 
		doOnChangeStdCmnPPrsnSearch(sender);
	};
	
	
	moPage.onClick_BtnObjNm = function(sender) {
		// 교직원검색팝업 호출
		doOnClickStdCmnPPrsnSearch(sender);
	};
	return moPage;
};
