//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
///<xtmlink path="./stdCcsCTimeDay.xtm"/>

/**
 * 일일단위 시간표관리
 * @class stdCcsCTimeDay
 * @author 박갑수 at 2016. 2. 23
 */
var stdCcsCTimeDay = function() {
	var moPage = new Page();
	
	// 임포트용 데이터 통신 오브젝트
	var moPObject = new Page();
	
	// 개설과목검색팝업 호출
	moIdsForStdCcsPOpenSubPopup = [
	{
		 controlId					: "btnSbCd",			
		 iDivClsYn					: "",		
		 iLanDivRcd				: "/root/resOnLoad/strLanDivRcd",
		 iKeyDate             		: "/root/keyDateMap/ST_DT",
		 iSchYearRcd             : "cbbSchYearRcd",
		 iSmtRcd             		: "cbbSmtRcd",
		 iSaCd        				: "",			
		 iSaNm        				: "",		
		 iSaObjDivRcd       		: ["CC009SA"],		
		 iSbCd        				: "",			
		 iSbNm        				: "ipbSbNm",		
		 iCmpDivRcd        		: "",			
		 
		 oSpCd						: "",			
		 oSpNm					: "",			
		 oSbCd						: "/root/reqKey/strSbCd",			
		 oSbNm					: "ipbSbNm",
		 oSaCd						: "/root/reqKey/strSaCd",			
		 oSaNm					: "",			
		 oCuCd						: "/root/reqKey/strCuCd",		
		 oCuNm					: "",		
		 oSchYearRcd			: "",		
		 oSmtRcd					: "",	
		 oDivclsCd					: "",	
		 oDivclsNm				: "",	
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
		 oRefKey					: "",
		 oSbLvlRcd				: "/root/reqKey/strSbLvlRcd",
		 func : function(poParam) {
			// 분반목록 조회
			doDivclsList();
		 }
	 }];
	 
	 // 학년도 학기를 원래데이터로 되돌리기위한 변수
	var msSchYearRcd = "";
	var msSmtRcd = "";
	
	/**
	 * @desc import 헤더 초기화
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 2. 23
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		doHeaderOnLoad();
	};
	
	/**
	 * @desc onLoad 실행
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 23
	 */
	moPage.onModelConstructDone_stdCcsCTimeDay = function() {
		// 리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["rptCcsTimeDay"]);
		// 검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grpData"]);
		
		// 서브미션 호출
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				
				util.Control.redraw(app, ["cbbSchYearRcd", "cbbSmtRcd", "cbbDivclsNm", "cbbProfNm"]);
				
				// 학년도 학기값 되돌리기위한 값
				msSchYearRcd = util.DataMap.getValue(app, "dmKeyDateMap", "YEAR");
				msSmtRcd = util.DataMap.getValue(app, "dmKeyDateMap", "SMT");
				
				util.Control.setFocus(app, "ipbSbNm");
			}
		}, true);
	};
	
	/**
	 * @desc [cbbSchYearRcd]학년도 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 23
	 */
	moPage.onValueChanged_CbbSchYearRcd = function() {
		// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
		doChangeYearSmt("year");
		
		// 교과목 초기화
		util.Control.setValue(app, "ipbSbNm", "");
		util.DataMap.setValue(app, "dmReqKey", "strSbCd", "");
		util.DataMap.setValue(app, "dmReqKey", "strSaCd", "");
		// 분반초기화
		doClearDivclsList();
		// 교수명 초기화
		doClearProfList();
	};
	
	/**
	 * @desc [cbbSmtRcd]학기 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 23
	 */
	moPage.onValueChanged_CbbSmtRcd = function() {
		// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
		doChangeYearSmt("smt");
		
		// 교과목 초기화
		util.Control.setValue(app, "ipbSbNm", "");
		util.DataMap.setValue(app, "dmReqKey", "strSbCd", "");
		util.DataMap.setValue(app, "dmReqKey", "strSaCd", "");
		// 분반초기화
		doClearDivclsList();
		// 교수명 초기화
		doClearProfList();
	};
	
	/**
	 * @desc 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 23
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
	 * @desc [ipbSbNm]교과목명 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 23
	 */
	moPage.onValueChanged_IpbSbNm = function(sender) {
		// 리피트 변경사항 체크
		if(util.Grid.isModified(app, ["grdCcsTimeDay"])){
			return false;
		}
		
		// 값변경시 개설과목검색팝업 호출
		doOnChangeStdCcsPOpenSubPopup(sender);
	};
	
	/**
	 * @desc [btnSaCd]교과목명(돋보기버튼) onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 23
	 */
	moPage.onClick_BtnSbCd = function(sender) {
		// 개설과목검색팝업 호출
		doOnClickStdCcsPOpenSubPopup(sender);
	};
	
	/**
	 * @desc 분반목록 조회
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 2. 23
	 */
	function doDivclsList() {
		// 교수목록 초기화
		doClearProfList();
		//strCommand: divclsList 
		util.Submit.send(app, "subDivclsList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "cbbDivclsNm");
				util.SelectCtl.selectItem(app, "cbbDivclsNm", 0);
			}
		});
	};
	
	/**
	 * @desc 분반목록 초기화
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 2. 23
	 */
	function doClearDivclsList() {
		ExtInstance.deleteNode("/root/resList/divclsList/row");
		util.Control.redraw(app, "cbbDivclsNm");
		util.SelectCtl.selectItem(app, "cbbDivclsNm", 0);
	};
	
	/**
	 * @desc 교수목록 초기화
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 2. 23
	 */
	function doClearProfList() {
		ExtInstance.deleteNode("/root/resList/profList/row");
		util.Control.redraw(app, "cbbProfNm");
		util.SelectCtl.selectItem(app, "cbbProfNm", 0);
	};
	
	/**
	 * @desc 분반명 onValueChanged 이벤트
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 2. 23
	 */
	moPage.onValueChanged_CbbDivclsNm = function() {
		var vsDivclsCd = util.Control.getValue(app, "cbbDivclsNm");
		
		util.Control.setValue(app, "cbbProfNm", "");
		
		if(ValueUtil.isNull(vsDivclsCd)){
			// 교수목록 초기화
			// moPage.doClearProfList();
			return false;
		}
		
		// 참조키
		var vsRefKey = ExtInstance.getValue("/root/resList/divclsList/row", "REF_KEY" , "child::DIVCLS_CD='"+ vsDivclsCd +"'");
		util.DataMap.setValue(app, "dmReqKey", "strRefKey", vsRefKey);
		
		//strCommand: profList 
		util.Submit.send(app, "subProfList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "cbbProfNm");
			}
		});
	};
	
	
  /**
	 * @desc [btnSearch]조회 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 23
	 */
	moPage.onClick_BtnSearch = function() {
		 // 작업영역 리피트 변경 내역 체크
		if(util.Grid.isModified(app, "", "CRM")){
			return false;
		}
		
		// 조회조건 필수 체크
		if(!util.validate(app, ["cbbSchYearRcd", "cbbSmtRcd", "ipbSbNm", "cbbDivclsNm"])){
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
	 * @desc 세부일정내역 조회
	 * @param poCallBackFunc 콜백정의
	 * @return void
	 * @author 박갑수 at 2016. 2. 23
	 */
	function doList(poCallBackFunc) {

		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdCcsTimeDay");
				// 조회 후 콜백함수 수행
				if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
			}
		});
	};

	

	return moPage;
};

