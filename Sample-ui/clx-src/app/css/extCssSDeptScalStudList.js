//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCssSDeptScalStudList.xtm"/>

/**
 * 장학금수혜내역조회(학과용)
 * @class extCssSDeptScalStudList
 * @author Aeyoung Lee 2017.01.04
 */
var extCssSDeptScalStudList = function() {
	var moPage = new Page();
	var moPObject 	= new PObject();
	
	/* 
	 * 객체 검색팝업 관련 설정사항
	 */
	moPObject.moIdsForStdCmnPObjSch = [
	{
		controlId 	: "btnDeptNmPop",
		iCd 		: "",
		iNm 		: "ipbDeptNm",
		iObjDivRcd 	: ["CC009SA"],
		iLanDivRcd 	: "",
		iKeyDate 	: "",
		oObjDivRcd 	: "ipbDeptObjDivRcd",
		oCd 		: "ipbDeptCd",
		oCdNm 		: "ipbDeptNm",
		oStDt 		: "",
		oEndDt 		: "",
		oLanDivRcd 	: "",
		func : function() {
			
			// 학과에 따른 학년,반 콤보박스 필터링 적용
			var vsSaCd = util.DataMap.getValue(app, "dmReqKey", "strDeptCd");
			doFilterShyr(vsSaCd);
		}
	}
	];
	
	/**
	 * @desc import 헤더 초기화
	 * @param 
	 * @return  void
	 * @author Aeyoung Lee 2017.01.04
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		// import 헤더 초기화
		doHeaderOnLoad();
	};
	
	/**
	 * @desc OnLoad 이벤트
	 * @param 
	 * @return  void
	 * @author Aeyoung Lee 2017.01.04
	 */
	function doOnLoad() {
		
		// 교직원 중에서 교원, 조교만 사용가능.
		if(!(moUserInfo.userDivRcd == "CC00502" && (moUserInfo.staffGrp == "CF001ASST" || moUserInfo.staffGrp == "CF001TCHR"))){
			//교원, 조교만 사용가능한 화면입니다.
			util.Msg.alert("NLS-CSS-M112");
			util.coverPage(app);
			return;
		}	
		
		// 리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["rptDeptScalStud"]);
		// 검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grpData"]);
		// 조회조건 임포트 학년도학기 셋팅
		doOnLoadImpNS("CSS", function(){
			
			//서브미션 실행 (실패시 cover page)
			//strCommand: onLoad 
			util.Submit.send(app, "subOnLoad", function(pbSuccess){
				if(pbSuccess){
					// 콤보박스 
					util.Control.redraw(app, ["cbbShyr","cbbClassRcd"]);
					
					// 세션 하위학사부서 중 하나 셋팅
					var vsUserSaCd = util.DataMap.getValue(app, "dmResOnLoad", "strUserSaCd");
					var vsUserSaNm = util.DataMap.getValue(app, "dmResOnLoad", "strUserSaNm");
					var vsUserObjDivRcd = util.DataMap.getValue(app, "dmResOnLoad", "strUserObjDivRcd");
					
					util.Control.setValue(app, "ipbDeptNm", vsUserSaNm);
					util.Control.setValue(app, "ipbDeptCd", vsUserSaCd);
					util.Control.setValue(app, "ipbDeptObjDivRcd", vsUserObjDivRcd);
					
					doFilterShyr(vsUserSaCd);
					
					// 소속 포커스
					util.Control.setFocus(app, "ipbDeptNm");		
				}
			});
			
		});
		
	};
	
	/**
	 * @desc 학과코드에 따른 학년,반 콤보박스 필터링 (지도교수일 경우에만 적용)
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2017.01.04
	 */
	function doFilterShyr(psSaCd) {
		
		if(ValueUtil.isNull(psSaCd)) psSaCd = "X";
		
		var vsApsDptMjYn = util.DataMap.getValue(app, "dmResOnLoad", "strApsDptMjYn");
		
		// 조교 혹은 학과장이 아닌 교수의 경우 해당 지도학년반 보여지도록 필터링 적용
		if(vsApsDptMjYn != "Y"){
			// 학년필터링
			var voShyrCtl = model.getControl("cbbShyr");
			ExtSelectCtl.setValue("cbbShyr", "");
			var vsShyrOrgRef = voShyrCtl.getAttr("nodeset");
			var vsShyrFilter = "[child::SA_CD = '"+ psSaCd +"']";
			voShyrCtl.setAttr("nodeset", vsShyrOrgRef + vsShyrFilter);
			voShyrCtl.refresh();
			
			voShyrCtl.setAttr("nodeset", vsShyrOrgRef);
			
			// 반필터링
			var voClassCtl = model.getControl("cbbClassRcd");
			ExtSelectCtl.setValue("cbbClassRcd", "");
			var vsClassOrgRef = voClassCtl.getAttr("nodeset");
			var vsClassFilter = "[child::SA_CD = '"+ psSaCd +"']";
			voClassCtl.setAttr("nodeset", vsClassOrgRef + vsClassFilter);
			voClassCtl.refresh();
			
			voClassCtl.setAttr("nodeset", vsClassOrgRef);
		}	
	};	
	
	/**
	 * @desc 학과코드, 학년에 따른 반 콤보박스 필터링 (지도교수일 경우에만 적용)
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2017.01.04
	 */
	function doFilterClass(psSaCd, psShyr) {
		
		if(ValueUtil.isNull(psSaCd)) psSaCd = "X";
		if(ValueUtil.isNull(psShyr)) psShyr = "X";
		
		var vsApsDptMjYn = util.DataMap.getValue(app, "dmResOnLoad", "strApsDptMjYn");
		
		// 조교 혹은 학과장이 아닌 교수의 경우 해당 지도학년반 보여지도록 필터링 적용
		if(vsApsDptMjYn != "Y"){
			// 반필터링
			var voCtl = model.getControl("cbbClassRcd");
			ExtSelectCtl.setValue("cbbClassRcd", "");
			var vsOrgRef = voCtl.getAttr("nodeset");
			var vsFilter = "[child::SA_CD = '"+ psSaCd +"' and SHYR = '"+ psShyr +"']";
			voCtl.setAttr("nodeset", vsOrgRef + vsFilter);
			voCtl.refresh();
			
			voCtl.setAttr("nodeset", vsOrgRef);
		}	
	};	
	
	/**
	 * @desc 학과 팝업 클릭 이벤트
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2017.01.04
	 */
	moPage.onClick_BtnDeptNmPop = function(sender) {
		doSetPopKeyDate();
		doOnClickStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc 학과명 변경 이벤트
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2017.01.04
	 */
	moPage.onValueChanged_IpbDeptNm = function(sender) {
		doSetPopKeyDate();
		doOnChangeStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc 팝업호출시 기준일자 셋팅
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2017.01.04
	 */
	function doSetPopKeyDate() {
		var vsEndDt = ExtInstance.getValue("instance('impCommonN')/root/date/END_DT").substr(0,8);
		
		moPObject.moIdsForStdCmnPObjSch[0].iKeyDate = vsEndDt;
	};
	
	/**
	 * @desc 학년변경 이벤트
			- 반콤보박스 필터링 적용
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2017.01.04
	 */
	moPage.onValueChanged_CbbShyr = function() {
		
		var vsSaCd = util.DataMap.getValue(app, "dmReqKey", "strDeptCd");
		var vsShyr = util.DataMap.getValue(app, "dmReqKey", "strShyr");
		doFilterClass(vsSaCd, vsShyr);
	};
	
	/**
	 * @desc 학년도학기변경 이벤트
				- 학년도학기 임포트 서브미션 콜백 함수
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2017.01.18
	 */
	function doSetKeyDateYearSmtImp() {
		//서브미션 실행 
		//strCommand: doChgYearSmt 
		util.Submit.send(app, "subChgYearSmt", function(pbSuccess){
			if(pbSuccess){
				// 콤보박스 
				util.Control.redraw(app, ["cbbShyr","cbbClassRcd"]);
				
				var vsSaCd = util.DataMap.getValue(app, "dmReqKey", "strDeptCd");
				
				// 학년반 필터링
				doFilterShyr(vsSaCd);
				
				// 소속 포커스
				util.Control.setFocus(app, "ipbDeptNm");		
			}
		});
	};
	
	/**
	 * @desc 조회 onClick 이벤트
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2017.01.04
	 */
	moPage.onClick_BtnSearch = function() {
		 // 작업영역 리피트 변경 내역 체크
		if(util.Grid.isModified(app, "", "CRM")){
			return false;
		}
		
		// 조회조건 필수 체크
		if(!util.validate(app, ["grpSearch"])){
			return false;
		}
		
		// 조회
		doList(function(pbSuccess) {
			if (pbSuccess){
				// "조회되었습니다."
				util.Msg.notify(app, "NLS.INF.M024");					
			}
		});
	};
	
	/**
	 * @desc 장학금 수혜자 목록 조회
	 * @param poCallBackFunc 콜백정의
	 * @return void
	 * @author Aeyoung Lee 2017.01.04
	 */
	function doList(poCallBackFunc) {
		
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdDeptScalStud");
			} 
			
			// 조회 후 콜백함수 수행
			if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
		});
	};

	return moPage;
};
