//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCcrSTlsnReqList.xtm"/>

/**
 * 수강신청조회
 * @class stdCcrSTlsnReqList
 * @author 박갑수 at 2016. 4. 19
 */
var extCcrSTlsnReqList = function() {
	var moPage = new Page();
	
	// 임포트용 데이터 통신 오브젝트
	var moPObject = new Page();
	
	// 객체검색팝업 호출
	moPObject.moIdsForStdCmnPObjSch = [
	{
		controlId			:	"btnSaCd",
		iCd					:	"",
		iNm					:	"ipbSaNm",
		iObjDivRcd			:	["CC009SA","CC009OG"],
		iStartObject    	:   "",
		iOtDivRcd			:	"",
		iOtIsTreeView	:	"",
		iLanDivRcd		:	"",
		iKeyDate			:	"/root/keyDateMap/ST_DT",
		iKeyEndDate		:	"",
		oObjDivRcd		:	"/root/reqKey/strSaObjDivRcd",
		oCd					:	"/root/reqKey/strSaCd",
		oCdNm				:	"ipbSaNm",
		oBegDt				:	"",
		oEndDt				:	"",
		oLanDivRcd		:	"",
		func 					:  function(){
			
		}
	}];
	
	// 학생검색팝업
	moPObject.moIdsForStdCsrPStSearch = [
	{
		controlId 					: "btnStudId",
		iStudNo 					: "ipbStudId",	
		iStudId 						: "",
		iStudNm 					: "",
		iKeyDate 					: "/root/keyDateMap/ST_DT", 
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
		oSaNm						: "ipbSaNm",
		oSaCd 						: "/root/reqKey/strSaCd",
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
			// 검색조건이 있을경우 조회
			var vsSchYearRcd = util.Control.getValue(app, "cbbSchYearRcd");
			var vsSmtRcd = util.Control.getValue(app, "cbbSmtRcd");
			var vsStudId = util.DataMap.getValue(app, "dmReqKey", "strStudId");
			
			if(!ValueUtil.isNull(vsSchYearRcd) && !ValueUtil.isNull(vsSmtRcd) && !ValueUtil.isNull(vsStudId)){
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
	 * @author 박갑수 at 2016. 4. 19
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		// import 헤더 초기화
		doHeaderOnLoad();
	};
	
	/**
	 * @desc onLoad 실행
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 19
	 */
	moPage.onModelConstructDone_StdCcrSTlsnReqList = function() {
		// 개인권한[CC00104] : 
		if (moPageInfo.authRngRcd != "CC00104" && moPageInfo.authRngRcd != "CC00101") {
			// 리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//			ExtRepeat.init(["rptCcrTlsnReq"]);
		}
		// 검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grpData"]);
		
		// 서브미션 호출
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, ["cbbSchYearRcd", "cbbSmtRcd", "cbbClassRcd"]);
				
				
				var vsSmtRcd	= util.DataMap.getValue(app, "dmKeyDateMap", "SMT");
				
				if(vsSmtRcd == "CA00391" || vsSmtRcd == "CA00393"){
					moIdsForStdCmnPObjSch[0].iObjDivRcd = ["CC009SA","CC009OG"] ;
					ExtControl.setTextValue("lblDeptNm", "소속");
					util.Control.redraw(app, "lblDeptNm");
					
					setStdCmnPObjSchObjInfo();
				}else{
					moIdsForStdCmnPObjSch[0].iObjDivRcd = ["CC009SA"] ;
					ExtControl.setTextValue("lblDeptNm", "학사부서명");
					util.Control.redraw(app, "lblDeptNm");					
				}
					
					
				
				// 권한에따른 컨트롤 활성화 처리
				doVisibleCtlByAuth();
			}
		}, true);
	};
	
	/**
	 * 권한에 따른 컨트롤 활성/비활성 처리
	 * @param 
	 * @type void
	 * @author 박갑수 at 2016. 4. 19
	 */	
	function doVisibleCtlByAuth() {
		
		
		// 개인권한[CC00104] : 
		if (moPageInfo.authRngRcd == "CC00104" || moPageInfo.authRngRcd == "CC00101") {
			util.Control.setValue(app, "ipbSaNm", util.DataMap.getValue(app, "dmResOnLoad", "strSaNm"));
			util.DataMap.setValue(app, "dmReqKey", "strSaCd", util.DataMap.getValue(app, "dmResOnLoad", "strSaCd"));
			util.Control.setValue(app, "ipbStudId", util.DataMap.getValue(app, "dmResOnLoad", "strStudNo"));
			util.DataMap.setValue(app, "dmReqKey", "strStudId", util.DataMap.getValue(app, "dmResOnLoad", "strStudId"));
			util.Control.setValue(app, "ipbLvl", util.DataMap.getValue(app, "dmResOnLoad", "strLvl"));
			
			util.Control.setVisible(app, false, ["btnSaCd", "btnStudId", "lblLvl", "ipbLvl", "ipbDivclsNm", "lblDivclsNm"]);
			util.Control.setEnable(app, false, ["ipbSaNm", "ipbStudId", "ipbLvl", "cbbSchYearRcd", "cbbSmtRcd"]);
			
			util.Control.setStyleAttr(app, "ckbTLsnCancel", "left", "810");
			
			if(moPageInfo.authRngRcd == "CC00101"){
				util.Control.setVisible(app, false, ["ipbSaNm", "lblDeptNm", "ckbTLsnCancel", "ipbDivclsNm", "lblDivclsNm"]);
				util.Control.setVisible(app, true, ["btnStudId"]);
				util.Control.setEnable(app, true, ["ipbStudId"]);
				util.Control.setStyleAttr(app, "lblStId", "left", "360");
				util.Control.setStyleAttr(app, "ipbStudId", "left", "434");
				util.Control.setStyleAttr(app, "btnStudId", "left", "535");
				
			}
			
			// 바로조회
			if(moPageInfo.authRngRcd == "CC00104" ){
				util.Header.clickSearch(app);
			}
		}
	};
	
	/**
	 * @desc [btnSaCd]소속부서(돋보기버튼) onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 19
	 */
	moPage.onClick_BtnSaCd = function(sender) {
		// 객체검색팝업 호출
		doOnClickStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc [ipbSaNm]부서명 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 19
	 */
	moPage.onValueChanged_IpbSaNm = function(sender) {
		// 값변경시 객체검색팝업 호출
		doOnChangeStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc [cbbSchYearRcd]학년도 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 19
	 */
	moPage.onValueChanged_CbbSmtRcd = function() {
		// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
		doChangeYearSmt("smt");
	};
	
	/**
	 * @desc [cbbSmtRcd]학기 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 19
	 */
	moPage.onValueChanged_CbbSchYearRcd = function() {
		// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
		doChangeYearSmt("year");
	};
	
	/**
	 * @desc 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 19
	 */
	function doChangeYearSmt(psDiv) {
		//strCommand: date 
		util.Submit.send(app, "subDate", function(pbSuccess){
			if(pbSuccess){				
				msSchYearRcd = util.DataMap.getValue(app, "dmKeyDateMap", "YEAR");
				msSmtRcd = util.DataMap.getValue(app, "dmKeyDateMap", "SMT");
				
				if(msSmtRcd == "CA00391" || msSmtRcd == "CA00393"){
					moIdsForStdCmnPObjSch[0].iObjDivRcd = ["CC009SA","CC009OG"] ;
					ExtControl.setTextValue("lblDeptNm", "소속");
					util.Control.redraw(app, "lblDeptNm");
					
					setStdCmnPObjSchObjInfo();
					
				}else{
					moIdsForStdCmnPObjSch[0].iObjDivRcd = ["CC009SA"] ;
					ExtControl.setTextValue("lblDeptNm", "학사부서명");
					util.Control.redraw(app, "lblDeptNm");
					
					util.DataMap.setValue(app, "dmReqKey", "strSaObjDivRcd", "");
					util.DataMap.setValue(app, "dmReqKey", "strSaCd", "");					
					util.Control.setValue(app, "ipbSaNm", "");
				}
				
				
				
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
	 * @desc [btnStudId]학번(돋보기버튼) onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 19
	 */
	moPage.onClick_BtnStudId = function(sender) {
		// 학사부서조건 초기화
		util.DataMap.setValue(app, "dmReqKey", "strSaObjDivRcd", "");
		util.DataMap.setValue(app, "dmReqKey", "strSaCd", "");
		util.Control.setValue(app, "ipbSaNm", "");
		
		// 학생검색팝업 호출
		doOnClickStdCsrPStSearch(sender);
	};
	
	/**
	 * @desc [ipbStudId]학번 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 19
	 */
	moPage.onValueChanged_IpbStudId = function(sender) {
		// 학사부서조건 초기화
		util.DataMap.setValue(app, "dmReqKey", "strSaObjDivRcd", "");
		util.DataMap.setValue(app, "dmReqKey", "strSaCd", "");
		util.Control.setValue(app, "ipbSaNm", "");
		
		// 값변경시 학생검색팝업 호출
		doOnChangeStdCsrPStSearch(sender);
	};
	
	/**
	 * @desc [btnSearch]조회 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 19
	 */
	moPage.onClick_BtnSearch = function() {
		// 작업영역 리피트 변경 내역 체크
		if(util.Grid.isModified(app, "", "CRM")){
			return false;
		}

		// 조회조건 필수 체크
		if(!util.validate(app, ["cbbSchYearRcd", "cbbSmtRcd"])){
			return false;
		}
		
		// 조회조건 필수체크 - 소속부서, 학번 중 한개는 입력되었는지 확인.
		if(!moPage.checkNotNullCtl()){
			return false;
		}
		
		
		
		var vsSmtRcd	= util.DataMap.getValue(app, "dmKeyDateMap", "SMT");
		if(vsSmtRcd == "CA00391" || vsSmtRcd == "CA00393"){
			
		}
		
		

		// 조회
		doList(function(pbSuccess) {
			if (pbSuccess){
				// 조회 : "조회되었습니다." header 메세지 표시
				util.Msg.notify(app, "NLS.INF.M024");
								
				util.removeCover(app);
			}else {
				var vsStudId = util.DataMap.getValue(app, "dmResOnLoad", "strStudId");
				if(ValueUtil.fixNull(vsStudId) == "X"){
					util.removeCover(app);
				}
			}
		});
	};
	
	/**
	 * @desc 소속부서, 학번 중 한개는 입력되었는지 확인.
	 * @param 
	 * @return boolean
	 * @author 박갑수 at 2016. 4. 19
	 */
	moPage.checkNotNullCtl = function() {
		var vbValid = true;
		
		// 소속부서
		var vsSaNm = util.Control.getValue(app, "ipbSaNm");
		// 학번
		var vsStudId = util.Control.getValue(app, "ipbStudId");
		
		if(ValueUtil.isNull(vsSaNm) && ValueUtil.isNull(vsStudId)){
			var vsMsgParam = ExtControl.getTextValue("lblDeptNm") + ", " + ExtControl.getTextValue("lblStId");
			
			// "조회조건[@1] 중 하나는 반드시 입력해야 합니다." 메시지 표시
			util.Msg.alert("NLS-CMM-M016", [vsMsgParam]);
			
			vbValid = false;
			return vbValid;
		}
		
		return vbValid;
	};
	
	/**
	 * @desc 휴보강목록 조회
	 * @param poCallBackFunc 콜백정의
	 * @return void
	 * @author 박갑수 at 2016. 4. 19
	 */
	function doList(poCallBackFunc) {
		// 조회 시 시간이 오래걸릴 경우 컨트롤들이 열린 상태로 조회가 되므로 막아줌
		util.coverPage(app);
		
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdCcrTlsnReq");
				
				// 개인권한[CC00104] : 개인권한일경우 init 함수를 제외하여 따로 RowCont표시를 해야함.
				if (moPageInfo.authRngRcd == "CC00104" || moPageInfo.authRngRcd == "CC00101") {
					ExtRepeat.setCtlRptRowCnt("rptCcrTlsnReq");
				}
				
				// 조회 후 콜백함수 수행
				if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess); 
			}
		});
	};
	
	return moPage;
};
