//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCgdCNewStudRrBat.xtm"/>

/**
 * 신입생 인정학점 생성
 * @class extCgdCNewStudRrBat
 * @author 박갑수 at 2016. 9. 26
 */
var extCgdCNewStudRrBat = function() {
	var moPage = new Page();
	
	// 임포트용 데이터 통신 오브젝트
	var moPObject = new Page();
	
	// 교과목검색팝업 호출
	moPObject.moIdsForStdCcsPSubPopup = [
	{
		 controlId					: "btnSbCd",			
		 iEndYn						: "",						
		 iLanDivRcd				: "",					
		 iKeyDate					: "/root/keyDateMap/END_DT",		
		 iSbCd						: "",			
		 iSbNm						: "ipbSbNm",
		 iCmpDivRcd				: "", 			
		 iSpvsDeptCd				: "",		
		 iSpvsDeptNm			: "",		
		 iObjDivRcd				: "",
		 oSbCd						: "/root/reqKey/strSbCd",			
		 oObjDivRcd				: "",			
		 oStDt						: "",			
		 oEndDt						: "",			
		 oLanDivRcd				: "",			
		 oRefKey					: "",			
		 oSbNm					: "ipbSbNm",			
		 oShortNm					: "",			
		 oSbCatRcd				: "",			
		 oSbDivRcd				: "",			
		 oPnt							: "/root/reqKey/strPnt",
		 oTheoTc					: "",
		 oEpacTc					: "",	
		 oSpvsColgCd			: "",			
		 oSpvsDeptCd			: "",			
		 oSpvsDeptNm			: "",		
		 oCmpDivRcd				: "/root/reqKey/strCmpDivRcd",			
		 oRecScaleRcd			: "",		
		 oSbTypeRcd				: "",		
		 oSbLvlRcd				: "",		
		 oEvalMethodRcd		: "",		
		 oLectTypeRcd			: "",	
		 oSbSmry					: "",		
		 oRegFeeXcpYn			: "",	
		 oSbAmt					: "",		
		 oCmpDivRcdNm		: "",		
		 oSbCatRcdNm			: "",	
		 oReTlsnYnRcd			: "",
		 func : function(poParam) {}
	 }];
	
	// 학년도 학기를 원래데이터로 되돌리기위한 변수
	var msSchYearRcd = "";
	var msSmtRcd = "";
	
	/**
	 * @desc import 헤더 초기화
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 9. 26
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		// import 헤더 초기화
		doHeaderOnLoad();
	};
	
	/**
	 * @desc onLoad 실행
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 9. 26
	 */
	moPage.onModelConstructDone_ExtCgdCNewStudRrBat = function() {
		// 리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["rptCgdRec"]);
		// 검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grpData"]);
		
		// 서브미션 호출
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				
				util.Control.redraw(app, ["cbbSchYearRcd", "cbbSmtRcd"]);
				var vsSmtRcd = util.Control.getValue(app, "cbbSmtRcd");
				
				// 1학기가 아닐경우 
				if(ValueUtil.fixNull(vsSmtRcd) != "CA00390"){
					util.Control.setValue(app, "cbbSmtRcd", "CA00390");
					// 기준일자 조회
					moPage.onValueChanged_CbbSmtRcd();
				}
				
			}
		}, true);
	};
	
	/**
	 * @desc [cbbSchYearRcd]학년도 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 9. 26
	 */
	moPage.onValueChanged_CbbSchYearRcd = function() {
		// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
		doChangeYearSmt("year");
	};
	
	/**
	 * @desc [cbbSmtRcd]학기 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 9. 26
	 */
	moPage.onValueChanged_CbbSmtRcd = function() {
		// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회	
		doChangeYearSmt("smt");
	};
	
	/**
	 * @desc [ipbSchAss]학제 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 9. 26
	 */
	moPage.onValueChanged_IpbSchAss = function() {
		ValidUtil.checkIntegerDecimal("ipbSchAss", 1, 0, true);
	};
	
	/**
	 * @desc [btnSearch]조회 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 9. 26
	 */
	moPage.onClick_BtnSearch = function() {
		// 조회조건 필수 체크
		if(!util.validate(app, ["cbbSchYearRcd", "cbbSmtRcd", "ipbSchAss"])){
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
	 * @desc 인정학점 생성 학생목록 조회
	 * @param poCallBackFunc 콜백정의
	 * @return void
	 * @author 박갑수 at 2016. 9. 26
	 */
	function doList(poCallBackFunc) {
		
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdCgdRec");
				
				// 조회 후 콜백함수 수행
				if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess); 
			}
		});
	};
	
	/**
	 * @desc [ipbAss]학제 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 9. 26
	 */
	moPage.onValueChanged_IpbAss = function() {
		ValidUtil.checkIntegerDecimal("ipbAss", 1, 0, true);
	};
	
	/**
	 * @desc [btnSbCd]교과목명(돋보기버튼) onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 9. 26
	 */
	moPage.onClick_BtnSbCd = function(sender) {
		// 교과목검색팝업 호출
		doOnClickStdCcsPSubPopup(sender);
	};
	
	/**
	 * @desc [ipbSbNm]교과목명 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 9. 26
	 */
	moPage.onValueChanged_IpbSbNm = function(sender) {
		// 값변경시 교과목검색팝업 호출
		doOnChangeStdCcsPSubPopup(sender);
	};
	
	/**
	 * @desc [btnAllBat]일괄생성 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 9. 26
	 */
	moPage.onClick_BtnAllBat = function() {
		// 필수체크
		if(!util.validate(app, ["ipbAss", "ipbSbNm"])){
			return false;
		}
		
		// 일괄수강신청 전 체크
		doSaveChk(function(pbSuccess) {
			if (pbSuccess){
				// 일괄수강신청
				doAllBat();
			}
		});
	};
	
	/**
	 * @desc  일괄생성 전 체크
	 * @param {Function} poCallBackFunc 콜백정의
	 * @return void
	 * @author 박갑수 at 2016. 9. 26
	 */
	function doSaveChk(poCallBackFunc) {
		//strCommand: saveChk 
		util.Submit.send(app, "subSaveChk", function(pbSuccess){
			if(pbSuccess){
				
				var vsAss = util.Control.getValue(app, "ipbAss");
				var vsSbNm = util.Control.getValue(app, "ipbSbNm");
				
				var vsSaveChk = util.DataMap.getValue(app, "dmResList", "strChkYn");
				if(ValueUtil.fixNull(vsSaveChk) == "Y"){
					// 기존에 생성 한 인정성적 자료가 존재합니다. 삭제 후
					var vsMsg = NLS.CGD.EXT008;
					// "기존에 생성 한 인정성적 자료가 존재합니다. 삭제 후 [@학제, @]으로 생성 하시겠습니까?" 메시지
					if(!util.Msg.confirm("NLS-CRM-EXT016", [vsMsg, vsAss, vsSbNm]) ){
						// 콜백함수실행
						if (util.isFunc(poCallBackFunc)) poCallBackFunc(false);
						return false;
					}
				}else {
					var vsMsg = "";
					// [@학제, @]으로 생성 하시겠습니까?" 메시지
					if(!util.Msg.confirm("NLS-CRM-EXT016", [vsMsg, vsAss, vsSbNm]) ){
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
	 * @desc 일괄생성
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 9. 26
	 */
	function doAllBat() {
		//strCommand: save 
		util.Submit.send(app, "subSave", function(pbSuccess){
			if(pbSuccess){
				// 조회
				doList(function(pbSuccess) {
					if (pbSuccess){
						// "처리되었습니다." 헤더 메시지
				util.Msg.notify(app, "NLS.INF.M003");
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
