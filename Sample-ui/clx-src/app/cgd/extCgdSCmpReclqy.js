//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCgdSCmpReclqy.xtm"/>

/**
 * 기이수성적조회
 * @class extCgdSCmpReclqy
 * @author 박갑수 at 2016. 6. 2
 */
var extCgdSCmpReclqy = function() {
	var moPage = new Page();
	
	// 임포트용 데이터 통신 오브젝트
	var moPObject = new Page();
	
	// 학생검색팝업
	moPObject.moIdsForStdCsrPStSearch = [
	{
		controlId 					: "btnStudId",
		iStudNo 					: "ipbStudId",	
		iStudId 						: "",
		iStudNm 					: "",
		iKeyDate 					: "/root/resOnLoad/strCutDt", 
		iObjDivRcd 				: "",
		iObjCd 						: "",
		iObjNm 					: "",
		iStatRcd 					: "",
		iStudDivRcd				: "",
		oStudId 					: "/root/reqKey/strStudId",
		oStudNo 					: "ipbStudId",
		oStudNm 					: "",
		oStatNm 					: "",
		oStatRcd 					: "",
		oProcRslt 					: "",
		oProcRsltYear 			: "",
		oSaNm						: "",
		oSaCd 						: "",
		oSpNm 					: "",
		oSpCd 						: "",
		oOgNm 					: "",
		oOgCd 						: "",
		oStudDivRcd				: "",
		oStudDivNm				: "",
		oBirthday					: "",
		oGenderRcd				: "",
		oGenderNm				: "",
		func : function() {
			var vsStudId = util.Control.getValue(app, "ipbStudId");
			// 검색조건있을경우 바로조회
			if(!ValueUtil.isNull(vsStudId)){
				util.Header.clickSearch(app);
			}
		}
	}];
	
	/**
	 * @desc import 헤더 초기화
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 6. 2
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		// import 헤더 초기화
		doHeaderOnLoad();
	};
	
	/**
	 * @desc 학생정보 import 초기화
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 6. 2
	 */
	moPage.onLoadImportDone_ImpStudInfo = function() {
		// 학생정보 import 초기화
		impStudInfo();
	};
	
	/**
	 * @desc onLoad 실행
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 6. 2
	 */
	moPage.onModelConstructDone_ExtCgdSCmpReclqy = function() {
		// 리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["rptCgdRec", "rptCgdRecSum"]);
		// 검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grpData"]);
		
		//impStudInf02(학생정보 임포트) 초기화
		initSize();
		
		// 서브미션 호출
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				
				util.Control.redraw(app, ["cbbSchYearRcd", "cbbSmtRcd"]);
				util.Control.setFocus(app, "ipbStudId");
				
				// 석차 숨김여부
				var vsRankVisible = util.DataMap.getValue(app, "dmResOnLoad", "strRankVisible");
				if(ValueUtil.isNull(vsRankVisible) || ValueUtil.fixNull(vsRankVisible) != "Y"){
					util.Grid.hideColumn(app, "rptCgdRecSum", "RANK");
				}
				
				if(moPageInfo.authRngRcd == "CC00104"){
					util.Grid.hideColumn(app, "rptCgdRecSum", "RANK");
				}
				
				// 권한에따른 학번 검색가능 여부
				doVisibleCtlByAuth();
			}
		}, true);
	};
	
	/**
	 * 권한에 따른 학번 활성/비활성 처리
	 * @param 
	 * @type void
	 * @author 박갑수 at 2016. 6. 2
	 */	
	function doVisibleCtlByAuth() {
		
		// 개인권한[CC00104] : 
		if (moPageInfo.authRngRcd == "CC00104") {
			util.Control.setVisible(app, false, ["btnStudId"]);
			util.Control.setEnable(app, false, ["ipbStudId"]);

			util.Control.setValue(app, "ipbStudId", moUserInfo.studNo);
			util.DataMap.setValue(app, "dmReqKey", "strStudId", moUserInfo.id);
			
			util.Header.clickSearch(app);
		}
	};
	
	/**
	 * @desc [btnStudId]학번(돋보기버튼) onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 6. 2
	 */
	moPage.onClick_BtnStudId = function(sender) {
		// 학생검색팝업 호출
		doOnClickStdCsrPStSearch(sender);
	};
	
	/**
	 * @desc [ipbStudId]학번 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 6. 2
	 */
	moPage.onValueChanged_IpbStudId = function(sender) {
		// 값변경시 학생검색팝업 호출
		doOnChangeStdCsrPStSearch(sender);
	};
	
	/**
	 * @desc [btnSearch]조회 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 6. 2
	 */
	moPage.onClick_BtnSearch = function() {
		// 조회조건 필수 체크
		if(!util.validate(app, ["ipbStudId"])){
			return false;
		}
		
		//(IMPORT)학번전달
		var vsStudId = util.DataMap.getValue(app, "dmReqKey", "strStudId");
		
		var vsKeyDate = util.DataMap.getValue(app, "dmKeyDateMap", "END_DT");
		
		// 학생정보imp 조회
		setImpStudInfo(vsStudId, vsKeyDate, null, function(pbSuccess) {
			if (pbSuccess){
				
				// 이미지 업로드 버튼 보이기 여부 설정
				setVisibleUploadStudImgBtn(false);
				
				// 조회
				doList(function(pbSuccess) {
					// 조회 : "조회되었습니다." header 메세지 표시
					if (pbSuccess) util.Msg.notify(app, "NLS.INF.M024");
				});
			}
		});
	};
	
	/**
	 * @desc 성적내역, 학기별내역 조회
	 * @param poCallBackFunc 콜백정의
	 * @return void
	 * @author 박갑수 at 2016. 6. 2
	 */
	function doList(poCallBackFunc) {
		
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				
				util.Control.redraw(app, "grdCgdRec");
				util.Control.redraw(app, "grdCgdRecSum");
			}
			
			// 조회 후 콜백함수 수행
			if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess); 
		});
	};
	
	return moPage;
};
