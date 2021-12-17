//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCcsSLectEvalRsltProf.xtm"/>

/**
 * 강의평가결과조회(교수용)
 * @class extCcsSLectEvalRsltProf
 * @author 박갑수 at 2016. 9. 12
 */
var extCcsSLectEvalRsltProf = function() {
	var moPage = new Page();
	
	// 임포트용 데이터 통신 오브젝트
	var moPObject = new Page();
	
	// 교직원 검색
	 moPObject.moIdsForStdCmnPPrsnSearch = [
	{
		 controlId					: "btnProfObjNo",
		 istrStaffGrpAuth			: "",					
		 istrWkdtyAuth			: "true",				
		 iKeyDate					: "",	
		 iStaffNo					: "ipbProfNm",			
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
		 func                         : function(){
			var vsSchYearRcd = util.Control.getValue(app, "cbbSchYearRcd");
			var vsSmtRcd = util.Control.getValue(app, "cbbSmtRcd");
			var vsProfNm = util.Control.getValue(app, "ipbProfNm");
			
			if(!ValueUtil.isNull(vsSchYearRcd) && !ValueUtil.isNull(vsSmtRcd ) && !ValueUtil.isNull(vsProfNm)){
				util.Header.clickSearch(app);
			}
		}
	}];
	
	// 학년도 학기를 원래데이터로 되돌리기위한 변수
	var msSchYearRcd = "";
	var msSmtRcd = "";
	
	/**
	 * @desc import 헤더 초기화
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 9. 12
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		// import 헤더 초기화
		doHeaderOnLoad();
	};
	
	/**
	 * @desc onLoad 실행
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 9. 12
	 */
	moPage.onModelConstructDone_ExtCcsSLectEvalRsltProf = function() {
		// 리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["rptCcsOpenSub", "rptCcsLectEvalRslt1", "rptCcsLectEvalRslt2", "rptCcsLectEvalRslt3"]);
		// 검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grpData", "grpDataDtl"]);
				
		// 서브미션 호출
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				
				util.Control.redraw(app, ["cbbSchYearRcd", "cbbSmtRcd"]);
				
				util.Control.setFocus(app, "ipbProfNm");
				
				// 권한에 따른 조회조건 default값 세팅 
				doVisibleCtlByAuth();
				
				// 학년도 학기값 되돌리기위한 값
				msSchYearRcd = util.DataMap.getValue(app, "dmKeyDateMap", "YEAR");
				msSmtRcd = util.DataMap.getValue(app, "dmKeyDateMap", "SMT");
			}
		}, true);
	};
	
	/**
	 * 권한에 따른 조회조건 default값 세팅 
	 * @param 
	 * @type void
	 * @author 박갑수 at 2016. 9. 12
	 */	
	function doVisibleCtlByAuth() {
		
		// 개인권한[CC00104] : 
		if (moPageInfo.authRngRcd == "CC00104") {
			util.Control.setVisible(app, false, ["btnProfObjNo"]);
			util.Control.setEnable(app, false, ["ipbProfNm"]);
			//, "cbbSchYearRcd", "cbbSmtRcd"
			
			util.Control.setValue(app, "ipbProfNm", moUserInfo.userNm);
			util.DataMap.setValue(app, "dmReqKey", "strProfObjNo", moUserInfo.id);
			
			util.Header.clickSearch(app);
		}
	};
	
	/**
	 * @desc [cbbSchYearRcd]학년도 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 9. 12
	 */
	moPage.onValueChanged_CbbSchYearRcd = function() {
		// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
		doChangeYearSmt("year");
	};
	
	/**
	 * @desc [cbbSmtRcd]학기 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 9. 12
	 */
	moPage.onValueChanged_CbbSmtRcd = function() {
		// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
		doChangeYearSmt("smt");
	};
	
	/**
	 * @desc 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 9. 12
	 */
	function doChangeYearSmt(psDiv) {
		//strCommand: date 
		util.Submit.send(app, "subDate", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, ["dipKeyDate"]);
				
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
	 * @desc [btnProfObjNo]교수명(돋보기버튼) onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 9. 12
	 */
	moPage.onClick_BtnProfObjNo = function(sender) {
		// 교직원검색팝업 호출
		doOnClickStdCmnPPrsnSearch(sender);
	};
	
	/**
	 * @desc [ipbProfNm]교수명 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 9. 12
	 */
	moPage.onValueChanged_IpbProfNm = function(sender) {
		// 값변경시 교직원검색팝업 호출
		doOnChangeStdCmnPPrsnSearch(sender);
	};
	
	/**
	 * @desc [btnSearch]조회 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 9. 12
	 */
	moPage.onClick_BtnSearch = function() {

		// 조회조건 필수 체크
		if(!util.validate(app, ["cbbSchYearRcd", "cbbSmtRcd", "ipbProfNm"])){
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
	 * @desc 강좌 목록 조회
	 * @param poCallBackFunc 콜백정의
	 * @return void
	 * @author 박갑수 at 2016. 9. 12
	 */
	function doList(poCallBackFunc) {
		
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdCcsOpenSub");
			
				// 마스터에 데이터가 없을 경우 디테일 입력 불가
				if(util.Grid.getRowCount(app, "grdCcsOpenSub") < 1){
					util.Control.setEnable(app, false,["grpDataDtl"]);
					util.Control.reset(app, "rptCcsLectEvalRslt1");
					util.Control.reset(app, "rptCcsLectEvalRslt2");
					util.Control.reset(app, "rptCcsLectEvalRslt3");
					
					util.Control.setValue(app, "optAvgSum1", "");
					util.Control.setValue(app, "optAvgSum2", "");
				}else {
					util.Control.setEnable(app, true,["grpDataDtl"]);
				}
			}
			
			// 조회 후 콜백함수 수행
			if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
		});
	};
	
	/**
	 * @desc [rptCcsOpenSub]강좌목록 onRowSelect 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 9. 12
	 */
	moPage.onRowSelect_RptCcsOpenSub = function() {
		// 세부내역 조회
		doListDtl();
	};
	
	/**
	 * @desc 상세 목록 조회
	 * @param poCallBackFunc 콜백정의
	 * @return void
	 * @author 박갑수 at 2016. 9. 12
	 */
	function doListDtl(poCallBackFunc) {
		
		var vsRefKey = util.Grid.getCellValue(app, "grdCcsOpenSub", "REF_KEY");
		
		// 참조키
		util.DataMap.setValue(app, "dmReqKey", "strRefKey", vsRefKey);
		
		if(ValueUtil.isNull(vsRefKey)){
			// 합계컬럼일경우 디테일 초기화
			util.Control.setEnable(app, false,["grpDataDtl"]);
			util.Control.reset(app, "rptCcsLectEvalRslt1");
			util.Control.reset(app, "rptCcsLectEvalRslt2");
			util.Control.reset(app, "rptCcsLectEvalRslt3");
			
			util.Control.setValue(app, "optAvgSum1", "");
			util.Control.setValue(app, "optAvgSum2", "");
		}else {
			util.Control.setEnable(app, true,["grpDataDtl"]);
			
			//strCommand: listDtl 
			util.Submit.send(app, "subListDtl", function(pbSuccess){
				if(pbSuccess){
					util.Control.redraw(app, "grdCcsLectEvalRslt1");
					util.Control.redraw(app, "grdCcsLectEvalRslt2");
					util.Control.redraw(app, "grdCcsLectEvalRslt3");
				}
				
				// 조회 후 콜백함수 수행
				if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
			});
		}
	};
	
	return moPage;
};
