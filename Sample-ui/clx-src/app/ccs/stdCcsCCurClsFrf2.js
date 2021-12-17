//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./stdCcsCCurClsFrf2.xtm"/>

/**
 * 교과과정관리
 * @class stdCcsCCurClsFrf
 * @author 박갑수 at 2016. 2. 1
 * 2016. 2. 2 박갑수 - 동서울대 이수과정 사용X : 사용시 테스트 필요함.
 */
var stdCcsCCurClsFrf2 = function() {
	var moPage = new Page();
	
	// 임포트용 데이터 통신 오브젝트
	var moPObject = new Page();
	
	// 탭 정의
	var TAB = {
		// 데이터관리
		MANAGE	: "tabManage",
		// 이력관리
		HIS    		: "tabHistory"
	};
			
	// 탭버튼 정의
	var TAB_BTN = {
		tabManage	: "tabBtnManage",
		tabHistory		: "tabBtnHistory"
	};
	
	// 객체검색팝업 호출
	moPObject.moIdsForStdCmnPObjSch = [
	{
		controlId			:	"btnSaCd",
		iCd					:	"",
		iNm					:	"ipbSaCd",
		iObjDivRcd			:	["CC009SA"],
		iStartObject    	:   "",
		iOtDivRcd			:	"",
		iOtIsTreeView	:	"",
		iLanDivRcd		:	"",
		iKeyDate			:	"dipKeyDate",
		iKeyEndDate		:	"",
		oObjDivRcd		:	"",
		oCd					:	"/root/reqKey/strSaCd",
		oCdNm				:	"ipbSaCd",
		oBegDt				:	"",
		oEndDt				:	"",
		oLanDivRcd		:	"",
		func 					:  function(poRtnValue){
			// 검색조건이 있을경우 조회
			var vsSaNm = util.DataMap.getValue(app, "dmReqKey", "strSaNm");
			var vsKeyDate = util.DataMap.getValue(app, "dmKeyDateMap", "ST_DT");
				
			// 학사부서 입력시 이수과정목록, 교과그룹목록 GET
			doSpCuList(function(pbSuccess) {
				if (pbSuccess){			
					if(ValueUtil.isNull(vsSaNm)){
						// 값 초기화
						util.Control.setValue(app, "cbbSpCd", "");
						util.Control.setValue(app, "cbbCuCd", "");
						util.Control.setValue(app, "ipbSbNm", "");
						util.DataMap.setValue(app, "dmReqKey", "strSbCd", "");
					}
				}
			});
		}
	}];
	
	// 교과목검색팝업 호출
	moPObject.moIdsForStdCcsPSubPopup = [
	{
		 controlId					: "btnSbCd",			
		 iEndYn						: "",						
		 iLanDivRcd				: "",					
		 iKeyDate					: "/root/keyDateMap/ST_DT",		
		 iSbCd						: "",			
		 iSbNm						: "ipbSbNm",
		 iCmpDivRcd				: "", 			
		 iSpvsDeptCd				: "/root/reqKey/strSaCd",		
		 iSpvsDeptNm			: "ipbSaCd",		
		 iObjDivRcd				: "CC009SA",
		 oSbCd						: "/root/reqKey/strSbCd",			
		 oObjDivRcd				: "/root/resPopup/strObjDivRcd",			
		 oStDt						: "",			
		 oEndDt						: "",			
		 oLanDivRcd				: "",			
		 oRefKey					: "/root/resPopup/strRefKey",			
		 oSbNm					: "ipbSbNm",			
		 oShortNm					: "",			
		 oSbCatRcd				: "/root/resPopup/strSbCatRcd",			
		 oSbDivRcd				: "/root/resPopup/strSbDivRcd",			
		 oPnt							: "/root/resPopup/strPnt",
		 oTheoTc					: "/root/resPopup/strTheoTc",		
		 oEpacTc					: "/root/resPopup/strEpacTc",	
		 oSpvsColgCd			: "",			
		 oSpvsDeptCd			: "",			
		 oSpvsDeptNm			: "",		
		 oCmpDivRcd				: "/root/resPopup/strCmpDivRcd",			
		 oRecScaleRcd			: "/root/resPopup/strRecScaleRcd",		
		 oSbTypeRcd				: "/root/resPopup/strSbTypeRcd",		
		 oSbLvlRcd				: "/root/resPopup/strLvlRcd",		
		 oEvalMethodRcd		: "/root/resPopup/strEvalMethodRcd",		
		 oLectTypeRcd			: "/root/resPopup/strLectTypeRcd",	
		 oSbSmry					: "",		
		 oRegFeeXcpYn			: "",	
		 oSbAmt					: "",		
		 oCmpDivRcdNm		: "",		
		 oSbCatRcdNm			: "",	
		 oReTlsnYnRcd			: "/root/resPopup/strReTlsnYnRcd",
		 func : function(poParam) {
			// 검색조건이 있을경우 조회
			var vsSaNm = util.DataMap.getValue(app, "dmReqKey", "strSaNm");
			var vsKeyDate = util.DataMap.getValue(app, "dmKeyDateMap", "ST_DT");
			var vsSbNm = util.DataMap.getValue(app, "dmReqKey", "strSbNm");
			if(!ValueUtil.isNull(vsSaNm) && !ValueUtil.isNull(vsKeyDate) && !ValueUtil.isNull(vsSbNm)){
				util.Header.clickSearch(app);
			}
		}
	 },
	 {
		 controlId					: "btnFrfSbCd",			
		 iEndYn						: "",						
		 iLanDivRcd				: "",					
		 iKeyDate					: "/root/keyDateMap/ST_DT",		
		 iSbCd						: "",			
		 iSbNm						: "ipbFrfSbNm",
		 iCmpDivRcd				: "", 		
		 iSpvsDeptCd				: "/root/reqKey/strSaCd",		
		 iSpvsDeptNm			: "ipbSaCd",		
		 iObjDivRcd				: "CC009SA",		
		 oSbCd						: "ipbFrfSbCd",			
		 oObjDivRcd				: "ipbFrfSbObjDIvRcd",			
		 oStDt						: "",
		 oEndDt						: "",
		 oLanDivRcd				: "",
		 oRefKey					: "",			
		 oSbNm					: "ipbFrfSbNm",			
		 oShortNm					: "",			
		 oSbCatRcd				: "cbbFrfSbCatRcd",			
		 oSbDivRcd				: "cbbFrfSbDivRcd",			
		 oPnt							: "/root/resPopup/strFrfPnt",
		 oTheoTc					: "/root/resPopup/strFrfTheoTc",		
		 oEpacTc					: "/root/resPopup/strFrfEpacTc",	
		 oSpvsColgCd			: "",			
		 oSpvsDeptCd			: "",			
		 oSpvsDeptNm			: "",		
		 oCmpDivRcd				: "/root/resPopup/strFrfCmpDivRcd",			
		 oRecScaleRcd			: "cbbFrfRecScaleRcd",		
		 oSbTypeRcd				: "cbbFrfSbTypeRcd",		
		 oSbLvlRcd				: "/root/resPopup/strLvlRcd",		
		 oEvalMethodRcd		: "cbbEvalMethodRcd",		
		 oLectTypeRcd			: "cbbFrfLectTypeRcd",	
		 oSbSmry					: "",		
		 oRegFeeXcpYn			: "",	
		 oSbAmt					: "",		
		 oCmpDivRcdNm		: "",		
		 oSbCatRcdNm			: "",	
		 oReTlsnYnRcd			: "cbbFrfReTlsnYnRcd",
		 func : function(poParam) {
			 // 이수구분 임시 인스턴스값으로 받아 프리폼에 세팅 : 팝업값 세팅시 이수구분의 ValueChange 이벤트로인해 리피터에 해당값이 반영 안됨. (학점, 이론, 실습)
			 var vnIdx = util.Grid.getIndex(app, "grdCcsCurCls");
			util.FreeForm.setValue(app, "frfCcsCurCls", "CMP_DIV_RCD", util.DataMap.getValue(app, "dmResPopup", "strFrfCmpDivRcd"), false, true);
			util.Grid.setCellValue(app, "grdCcsCurCls", "CMP_DIV_RCD", util.DataMap.getValue(app, "dmResPopup", "strFrfCmpDivRcd"), vnIdx);
			
			util.FreeForm.setValue(app, "frfCcsCurCls", "PNT", util.DataMap.getValue(app, "dmResPopup", "strFrfPnt"), false, true);
			util.Grid.setCellValue(app, "grdCcsCurCls", "PNT", util.DataMap.getValue(app, "dmResPopup", "strFrfPnt"), vnIdx);
			
			var vsTheoTc = util.DataMap.getValue(app, "dmResPopup", "strFrfTheoTc");
			util.FreeForm.setValue(app, "frfCcsCurCls", "THEO_TC", vsTheoTc, false, true);
			util.Grid.setCellValue(app, "grdCcsCurCls", "THEO_TC", vsTheoTc, vnIdx);
			
			var vsEpacTc = util.DataMap.getValue(app, "dmResPopup", "strFrfEpacTc");
			util.FreeForm.setValue(app, "frfCcsCurCls", "EPAC_TC", vsEpacTc, false, true);
			util.Grid.setCellValue(app, "grdCcsCurCls", "EPAC_TC", vsEpacTc, vnIdx);
			
			var vsLectTimeCnt = ValueUtil.fixNumber(vsTheoTc) + ValueUtil.fixNumber(vsEpacTc);
			util.FreeForm.setValue(app, "frfCcsCurCls", "LECT_TIME_CNT", vsLectTimeCnt, false, true);
			util.Grid.setCellValue(app, "grdCcsCurCls", "LECT_TIME_CNT", vsLectTimeCnt, vnIdx);
			
			var vsSbLvlRcd = util.FreeForm.getValue(app, "frfCcsCurCls", "SB_LVL_RCD");
			if(ValueUtil.isNull(vsSbLvlRcd)){
				util.FreeForm.setValue(app, "frfCcsCurCls", "SB_LVL_RCD" , util.DataMap.getValue(app, "dmResPopup", "strLvlRcd"), false, true);
				util.Grid.setCellValue(app, "grdCcsCurCls", "SB_LVL_RCD", util.DataMap.getValue(app, "dmResPopup", "strLvlRcd"), vnIdx);
			}
			
			// 기등록된 교과과정인지 확인(교과그룹코드, 교과목코드, 시작일자, 종료일자)
			doChkCurCls();
			
			ExtModel.dispatch("cbbFrfCmpDivRcd", "xforms-value-changed");
			
			
		}
	 }];
	
	// 학문분야검색
	moPObject.moIdsForStdCcsPDclExtendPopup = [
	{
		controlId 			: "btnFrfDclRcd",
		iLanDivRcd 		: "",
		iRefKey 			: "ipbFrfRefKey",				
		iCmpDivRcd 		: "cbbFrfCmpDivRcd",
		iDclRcdCd 		: "ipbFrfDclRcd",
		iDclRcdNm 		: "ipbFrfDclRcdNm",					
		iReadOnlyYn 		: "",
		iStdDclRcdYn 	: "",							//학문분야 표준임포트 사용여부
		oOutDclRcdNm 	: "ipbFrfDclRcdNm",	//학문분야 이름
		oOutDclRcdCd 	: "ipbFrfDclRcd",			//학문분야 배열코드															
		func : function(poParam) {
			var vsDclRcd = util.FreeForm.getValue(app, "frfCcsCurCls", "DCL_RCD_CD");
			
			var vnIdx = util.Grid.getIndex(app, "grdCcsCurCls");
			
			if(ValueUtil.fixNull(vsDclRcd).indexOf("CA21240") != -1){
				
				// 평가방법 : 절대평가[CA21001]
				util.FreeForm.setValue(app, "frfCcsCurCls", "EVAL_METHOD_RCD", "CA21001");
				util.Grid.setCellValue(app, "grdCcsCurCls", "EVAL_METHOD_RCD", "CA21001", vnIdx);
			}else {
				
				// 평가방법 : 상대평가[CA21002]
				util.FreeForm.setValue(app, "frfCcsCurCls", "EVAL_METHOD_RCD", "CA21002");
				util.Grid.setCellValue(app, "grdCcsCurCls", "EVAL_METHOD_RCD", "CA21002", vnIdx);
			}
		}
	},
	{
		controlId 			: "btnDclRcd",
		iLanDivRcd 		: "",
		iRefKey 			: "",				
		iCmpDivRcd 		: "cbbCmpDivRcd",
		iDclRcdCd 		: "",
		iDclRcdNm 		: "",					
		iReadOnlyYn 		: "",
		iStdDclRcdYn 	: "",											//학문분야 표준임포트 사용여부
		oOutDclRcdNm 	: "ipbDclRcdNm",						//학문분야 이름
		oOutDclRcdCd 	: "/root/reqDclRcd/strDclRcd",		//학문분야 배열코드															
		func : function(poParam) {
			
		}
	}];
	
	// 학사구조관리에서 교과목관리페이지 호출시, 서브페이지용 파라미터
	moPObject.moAcademicStructure = {
		// Academic Structure의 서브페이지용 파라미터
		mode     	: "",
		treeNode 	: null,
		name     	: "",
		objType  	: "",
		objCd    	: "",
		year     		: "",
		smt      		: "",
		keyDate  	: ""
	};
	
	// 학년도 학기를 원래데이터로 되돌리기위한 변수
	var msSchYearRcd = "";
	var msSmtRcd = "";
	
	
	/**
	 * @desc 학사구조관리에서 교과그룹관리페이지 호출시 OnLoad 이벤트
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 1. 29
	 */
	function doOnLoadWithAcademicStructure() {
		var voParentPage = ExtSubPage.getParent();
		var voParentParam = voParentPage.callScriptVal("moAcademicStructure");
		
		for (var key in  voParentParam ) {
			moAcademicStructure [key] = voParentParam[key];
		}
		
		var voParam = moAcademicStructure;
		
		// Academic Structure 모드가 지정되어 있는 경우에만
		if (voParam.mode) {
			var vnTop = util.Control.getStyleAttr(app, "grpData", "top");
			var vnLeft = util.Control.getStyleAttr(app, "grpData", "left");
			var vnGrpDataHeight = util.Control.getStyleAttr(app, "grpData", "height");
			var vnGrpDataDtlHeight = util.Control.getStyleAttr(app, "grpDataDtl", "height");
			var vnWidth = util.Control.getStyleAttr(app, "grpData", "width");
			
			vnTop = vnTop.replace(/[^0-9]/g, '');
			vnLeft = vnLeft.replace(/[^0-9]/g, '');
			vnGrpDataHeight = vnGrpDataHeight.replace(/[^0-9]/g, '');
			vnGrpDataDtlHeight = vnGrpDataDtlHeight.replace(/[^0-9]/g, '');
			vnWidth = vnWidth.replace(/[^0-9]/g, '');
			
			var vnHeight = String(Number(vnGrpDataHeight) + Number(vnGrpDataDtlHeight) + 5);
			
			var vsCallFunc =  "doCropPageToControl(null, "+ vnTop + ", " + vnLeft + ", " +  vnHeight + ", " + vnWidth+")";
			voParentPage.callScriptVal( vsCallFunc);
			
			// 검색조건 세팅
			util.Control.setValue(app, "dipKeyDate",voParam.keyDate);
			util.Control.setValue(app, "dipKeyDateHistory",voParam.keyDate);
			
			util.DataMap.setValue(app, "dmReqKey", "strAsMode",voParam.mode);
			util.DataMap.setValue(app, "dmReqKey", "strObjCd",voParam.objCd);
			
			// 서브미션 호출
			//strCommand: getUpSaCd 
			util.Submit.send(app, "subGetUpSaCd", function(pbSuccess){
				if(pbSuccess){
					util.Control.setValue(app, "ipbSaCd", util.DataMap.getValue(app, "dmReqKey", "strSaCd"));
					
					//strCommand: getUpSaCd 
					util.Submit.send(app, "subGetUpSaCd", function(pbSuccess){
						if(pbSuccess){
							doSpCuList();
							//조회
							util.Header.clickSearch(app);
						}
					});
				}
			});
		}
	};
	
	/**
	 * @desc 작업저장시 학사구조관리의 콜백메서드 실행
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 1. 29
	 */
	function doSaveWithAcademicStructure() {
		var voParam = moAcademicStructure;
				
		if(voParam.mode){
			var voParentPage = ExtSubPage.getParent();

			voParentPage.callScriptVal("callbackAcademicStructureSubPageSave()");
		}
	};
	
	/**
	 * @desc 헤더메시지 표시(부모창이 있는 경우 부모의 헤더에 메시지 표시)
	 * @param 메시지
	 * @return 
	 * @author 박갑수 at 2016. 3. 9
	 */
	function doSetMsgStatus(psMsg) {
		var voParam = moAcademicStructure;
		
		//부모페이지가 있는 경우 부모페이지의 헤더에 표시한다.
		if(voParam.mode){
			var voParentPage = ExtSubPage.getParent();
			var vsCallFunc =  "util.Msg.notify(app,  "'"+ psMsg + "'" )";
			voParentPage.callScriptVal(vsCallFunc);
		
		} else {
			util.Msg.notify(app, "psMsg");
		}
	};
	
	/**
	 * @desc import 헤더 초기화
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 2. 1
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		// import 헤더 초기화
		doHeaderOnLoad();
	};
	
	/**
	 * @desc onLoad 실행
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 1
	 */
	moPage.onModelConstructDone_StdCcsCCurClsFrf = function() {
		// 리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["rptCcsCurCls", "rptCcsCurClsHistory"]);
		// 검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grpData", "grpDataDtl"]);
		//3.첫번째 탭으로 로딩
		util.Tab.setSelectedTabItem(app, "tabMain", TAB.MANAGE);
		// 기준일자 조회하는 내부 팝업 호출을 위한 단위시스템코드 설정
		setUnitSystem("CCS");
		
		// 서브미션 호출
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, ["dipKeyDate", "cbbSbLvlRcd", "cbbEstPrdRcd", "cbbCmpDivRcd", "cbbSchYearRcd", "cbbSmtRcd"]);
				
				// 학사부서관리 호출시
				doOnLoadWithAcademicStructure();
				
				util.Control.setFocus(app, "ipbSaCd");
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
				util.Control.redraw(app, ["cbbSpCd", "cbbCuCd"]);
				util.SelectCtl.selectItem(app, "cbbCuCd", 0);
				util.SelectCtl.selectItem(app, "cbbSpCd", 0);
			// 조회 후 콜백함수 수행
			if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
			}
		});
	};
	
	/**
	 * @desc [btnYearSmt]기준일자(돋보기버튼) onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 1
	 */
	moPage.onClick_BtnYearSmt = function() {
		//기준일자 임포트(달력컨트롤ID,임포트ID)
		doOnclickSchYearSmt("dipKeyDate","impSchYearSmt");
	};
	
	 /**
	 * @desc [ipbSaCd]부서명(돋보기버튼) onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 1
	 */
	moPage.onClick_BtnSaCd = function(sender) {
		// 객체검색팝업 호출
		doOnClickStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc [ipbSaCd]부서명 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 1
	 */
	moPage.onValueChanged_IpbSaCd = function(sender) {
		// 리피트 변경사항 체크
		if(util.Grid.isModified(app, ["grdCcsCurCls"])){
			return false;
		}
		
		// 값변경시 객체검색팝업 호출
		doOnChangeStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc [btnSbCd]교과목명(돋보기버튼) onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 1
	 */
	moPage.onClick_BtnSbCd = function(sender) {
		// 교과목검색팝업 호출
		doOnClickStdCcsPSubPopup(sender);
	};
	
	
	/**
	 * @desc [ipbSbNm]교과목명 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 1
	 */
	moPage.onValueChanged_IpbSbNm = function(sender) {
		// 리피트 변경사항 체크
		if(util.Grid.isModified(app, ["grdCcsCurCls"])){
			return false;
		}
		
		// 값변경시 교과목검색팝업 호출
		doOnChangeStdCcsPSubPopup(sender);
	};
	
	/**
	 * @desc [cbbSpCd]이수과정 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 1
	 */
	 moPage.onValueChanged_CbbSpCd = function() {
		// 이수과정에따른 교과그룹값 필터링
		var vsSpCd = util.Control.getValue(app, "cbbSpCd");
		if(!ValueUtil.isNull(vsSpCd)){
			vsSpCd = "CC009SP" + vsSpCd;
		}
		
		ExtSelectCtl.setInsBind("cbbCuCd", "[contains(PATH, '"+ vsSpCd +"')]");
	};

	/**
	 * @desc [btnSearch]조회 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 1
	 */
	moPage.onClick_BtnSearch = function() {
		 // 작업영역 리피트 변경 내역 체크
		if(util.Grid.isModified(app, "", "CRM")){
			return false;
		}
		
		// 조회조건 필수 체크
		if(!util.validate(app, ["dipKeyDate", "ipbSaCd", "cbbCuCd"])){
			return false;
		}
		
		// 폐기일자 조회조건의 기준일자와 동일하게 세팅
		var vsKeyDate = util.Control.getValue(app, "dipKeyDate");
		util.Control.setValue(app, "dipKeyDateHistory", vsKeyDate);
		
		// 조회
		doList(function(pbSuccess) {
			if (pbSuccess){
				// 조회 : "조회되었습니다." header 메세지 표시
				doSetMsgStatus(NLS.INF.M024);
			}
		});
	};

	/**
	 * @desc 교과과정목록 조회
	 * @param poCallBackFunc 콜백정의, 교과목코드
	 * @return void
	 * @author 박갑수 at 2016. 2. 1
	 */
	function doList(poCallBackFunc) {
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				
				util.Control.redraw(app, "grdCcsCurCls");
				
				// 폐기처리로 인해 데이터가 없어질경우 [데이터관리] 텝으로 이동하기 위함.
				var vsRefKey = util.DataMap.getValue(app, "dmReqSelRow", "strTmpRefKey");
				var vnLength = ExtInstance.getNodeListLength("/root/resList/rptCcsCurCls/row[child::REF_KEY = '"+ vsRefKey +"']");
				if(ValueUtil.isNull(vsRefKey) || vnLength == 0){
					if(util.Grid.getRowCount(app, "grdCcsCurCls") == 0){
						// 마스터 리피트 상태에 따른 디테일 프리폼 비활성화 제어
						doCompareFrfEnable();
					}
					// ExtModel.dispatch("tabBtnManage","DOMActivate");
				}
			}
			
			// 조회 후 콜백함수 수행
			if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
		});
	};
	
	/**
	 * @desc [rptCcsCurCls]교과과정목록 onRowSelect 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 1
	 */
	moPage.onRowSelect_RptCcsCurCls = function() {
		var vsTab = util.Tab.getSelectedId(app, "tabMain");
		var vsIndex = "";
		
		if(vsTab=="tabManage"){
			vsIndex = TAB.MANAGE;
			
			// 기등록된 교과과정인지 확인(교과그룹코드, 교과목코드, 시작일자, 종료일자)
			doChkCurCls();
		}else if(vsTab=="tabHistory"){
			vsIndex =TAB.HIS;
		}
		
		var voSelectRowIdx = util.Grid.getIndex(app, "grdCcsCurCls");
		util.DataMap.setValue(app, "dmReqSelRow", "strSbCd", util.Grid.getCellValue(app, "grdCcsCurCls", "SB_CD"  ,voSelectRowIdx));		// 교과목코드
		util.DataMap.setValue(app, "dmReqSelRow", "strSaCd", util.Grid.getCellValue(app, "grdCcsCurCls", "SA_CD"  ,voSelectRowIdx)); 		// 학사부서코드
		util.DataMap.setValue(app, "dmReqSelRow", "strCuCd", util.Grid.getCellValue(app, "grdCcsCurCls", "CU_CD"  ,voSelectRowIdx)); 		// 교과그룹코드
		util.DataMap.setValue(app, "dmReqSelRow", "strRefKey", util.Grid.getCellValue(app, "grdCcsCurCls", "REF_KEY"  ,voSelectRowIdx)); 	// 참조키
		
		// 마스터 리피트 상태에 따른 디테일 프리폼 비활성화 제어
		doCompareFrfEnable();
		
		doTabChange(vsIndex);
	};
	
	/**
	 * @desc  마스터 리피트 상태에 따른 디테일 프리폼 비활성화 제어
	 *			    1. index가 지정되지 않았을 경우
	 *			    2. 현재 index의 로우가 삭제 상태일 경우 
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 1
	 */
	function doCompareFrfEnable() {
		// 신규시 제어 컬럼
		var vaEnableCtl = ["ipbFrfSbNm", "btnFrfSbCd"];
		
		// 마스터 로우 없을경우 프리폼 리셋
		if(!util.Grid.getIndex(app, "grdCcsCurCls")){
			util.Control.reset(app, "frfCcsCurCls");
			util.Control.setValue(app, "lblWarn", "");
		}
		
		if( (!util.Grid.getIndex(app, "grdCcsCurCls")) 
			|| util.Grid.getRowState(app, "grdCcsCurCls") == cpr.data.tabledata.RowState.DELETED) {
				
			util.Control.setEnable(app, false, ["frfCcsCurCls"]);
			
		} else {
			util.Control.setEnable(app, true, ["frfCcsCurCls"]);	
			
			var vsFlgGbn = util.Grid.getCellValue(app, "grdCcsCurCls", "FLAG_GBN", util.Grid.getIndex(app, "grdCcsCurCls"));
			// 신규 상태에따른 프리폼항목 제어
			if(util.Grid.getRowState(app, "grdCcsCurCls") == cpr.data.tabledata.RowState.INSERTED && ValueUtil.fixNull(vsFlgGbn) != "C"){
				util.Control.setEnable(app, true, vaEnableCtl);	
			}else {
				util.Control.setEnable(app, false, vaEnableCtl);	
			}
		}
	};
	
	/**
	 * @desc 탭 변경시
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 1
	 */
	function doTabChange(psCaseId) {
		// 선택된 TAB
		var vsSelTabId = util.Tab.getSelectedId(app, "tabMain");
		
		// 1. 현재 선택된 탭의 상태 체크
		switch (vsSelTabId) {
			// 1-1. 데이터관리
			
			case TAB.MANAGE : {
				if(psCaseId != TAB.MANAGE){
					// 데이터관리 변경내역 있는 경우
					if(util.Grid.isModified(app, ["grdCcsCurCls"], "CRM") ){
						// tab 이동 하지 않음
						ExtTab.setTabBtn("tabMain", TAB_BTN[vsSelTabId]);
						return false;
					}else{
						// 교과목 목록 변경이 일어난 후 다른탭으로 이동시 프리폼 리셋 처리
						if(util.Grid.isModified(app, ["grdCcsCurCls"])){
							// 교과목 목록 리셋
							util.Grid.revertAllData(app, "grdCcsCurCls");
							// 교과목 리셋
							util.Control.reset(app, "frfCcsCurCls");
						}
					}
				}					
				break;
			}
			
			// 1-2. 이력관리  버튼 선택
			case TAB.HIS : {
				// 이력관리 리피트 변경내역 있는 경우
				if(util.Grid.isModified(app, ["grdCcsCurClsHistory"], "CRM")){
					// tab 이동 하지 않음
					ExtTab.setTabBtn("tabMain", TAB_BTN[vsSelTabId]);
					
					return false;
				}else{
					if(util.Grid.isModified(app, ["grdCcsCurClsHistory"]) ){
						// 이력 목록 리셋
						util.Grid.revertAllData(app, "grdCcsCurClsHistory");
					}
				}
																				
				break;
			}
		}
	
		// 2. 탭변경
		util.Tab.setSelectedTabItem(app, "tabMain", psCaseId);
		// 3. 탭변경 후 처리 로직
		switch (psCaseId) {
			// 3-1. 데이터관리 조회
			case TAB.MANAGE : {
				// 교과목 상세 조회
				doListDtl();
				
				break;
			}
			// 3-2. 이력관리 조회
			case TAB.HIS : {
				// 교과목목록 선택된 ROW 검사
				var voSelectRowIdx = util.Grid.getIndex(app, "grdCcsCurCls");

				if (!voSelectRowIdx) {
					// 데이터관리 프리폼 초기화
					util.Control.reset(app, "frfCcsCurCls");
					// 데이터관리  tab으로 이동
					ExtTab.setTabBtn("tabMain", TAB_BTN.tabManage);
					util.Tab.setSelectedTabItem(app, "tabMain", TAB.MANAGE);
					
					return;
				}
				
				// 이력조회
				doListHistory();
				
				break;
			}
		}
	};
	
	/**
	 * @desc [tabBtnManage]데이터관리 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 2
	 */
	moPage.onClick_TabBtnManage = function() {
		doTabChange(TAB.MANAGE);
	};
	
	/**
	 * @desc [tabBtnHistory]이력관리 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 2
	 */
	moPage.onClick_TabBtnHistory = function() {
		doTabChange(TAB.HIS);
	};
	
	/**
	 * @desc 교과과정(프리폼) 조회
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 1
	 */
	function doListDtl() {
		
		// 교과목 포커싱된 인덱스
		var vnIndex = util.Grid.getIndex(app, "grdCcsCurCls");
		
		// 리피트 특정 row 데이터를 프리폼 copy
//TO-BE: <ExtRepeat.copyRowForm> 그리드-프리폼인 경우에는 selection바인딩으로 처리하기 때문에 불필요함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.copyRowForm("rptCcsCurCls","frfCcsCurCls", vnIndex);
	};
	
	/**
	 * @desc [cbbFrfSpCd]이수과정 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 1
	 */
	moPage.onValueChanged_CbbFrfSpCd = function() {
		// 이수과정에따른 교과그룹값 필터링
		var vsSpCd = util.Control.getValue(app, "cbbFrfSpCd");
		if(!ValueUtil.isNull(vsSpCd)){
			vsSpCd = "CC009SP" + vsSpCd;
		}

		ExtSelectCtl.setInsBind("cbbFrfCuCd", "[contains(PATH, '"+ vsSpCd +"')]");
	};
	
	/**
	 * @desc [btnFrfSbCd]교과목명(돋보기버튼) onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 1
	 */
	moPage.onClick_BtnFrfSbCd = function(sender) {
		// 교과목검색팝업 호출
		doOnClickStdCcsPSubPopup(sender);
	};
	
	/**
	 * @desc [ipbFrfSbNm]교과목명 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 1
	 */
	moPage.onValueChanged_IpbFrfSbNm = function(sender) {
		// 값변경시 교과목검색팝업 호출
		doOnChangeStdCcsPSubPopup(sender);
	};
	
	/**
	 * @desc [cbbFrfCmpDivRcd]이수구분 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 1
	 */
	moPage.onValueChanged_CbbFrfCmpDivRcd = function() {
		// 학문분야 초기화
		util.FreeForm.setValue(app, "frfCcsCurCls", "DCL_RCD_NM", "");
		util.FreeForm.setValue(app, "frfCcsCurCls", "DCL_RCD_CD", "");
		
		var vnIdx = util.Grid.getIndex(app, "grdCcsCurCls");
		
		var vsCmpDivRcd = util.FreeForm.getValue(app, "frfCcsCurCls", "CMP_DIV_RCD");
		
		// 교직전공[CA20121]. 교직교양[CA20122]
		if(ValueUtil.fixNull(vsCmpDivRcd) == "CA20121" || ValueUtil.fixNull(vsCmpDivRcd) == "CA20122"){
			
			// 평가방법 : 절대평가[CA21001]
			util.FreeForm.setValue(app, "frfCcsCurCls", "EVAL_METHOD_RCD", "CA21001");
			util.Grid.setCellValue(app, "grdCcsCurCls", "EVAL_METHOD_RCD", "CA21001", vnIdx);
		}else {
			
			// 평가방법 : 상대평가[CA21002], 상대평가유형 : 상대평가[CD20901]
			util.FreeForm.setValue(app, "frfCcsCurCls", "EVAL_METHOD_RCD", "CA21002");
			util.Grid.setCellValue(app, "grdCcsCurCls", "EVAL_METHOD_RCD", "CA21002", vnIdx);
		}
	};
	
	
	/**
	 * @desc [btnFrfDclRcd]학문분야(돋보기버튼) onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 1
	 */
	moPage.onClick_BtnFrfDclRcd = function(sender) {
		// 학문분야검색팝업 호출
		doOnClickStdCcsPDclExtendPopup(sender);
	};

	/**
	 * @desc [frfCcsCurCls]교과과정 onUpdate 이벤트
	 * @param pbStatus Boolean
	 * @return  
	 * @author 박갑수 at 2016. 2. 1
	 */
	moPage.onUpdate_FrfCcsCurCls = function() {
		// 프리폼 업데이트내용 그리드 반영
//TO-BE: <ExtFreeForm.updateToRpt> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtFreeForm.updateToRpt("rptCcsCurCls", "frfCcsCurCls");
	};
	
	/**
	 * @desc [btnCopy]복사 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 1
	 */
	moPage.onClick_BtnCopy = function() {
		
		var vnOrgRowIdx = util.Grid.getIndex(app, "grdCcsCurCls");
		// 마스터 리피트 row 선택여부 체크
		if(vnOrgRowIdx == "0"){
			
			var vsMsgParam = util.Grid.getTitle(app, "grdCcsCurClsCcsCurCls");
			// "@(을)를 선택해주세요" 메시지 출력
			util.Msg.alert("NLS-INF-M045", [vsMsgParam]);
			return;
		}
		
		// 마스터 row(대상) 변경내역 체크
		var vsUptStatus = util.Grid.getCellValue(app, "grdCcsCurCls", "UPT_STATUS", vnOrgRowIdx);
		if(util.Grid.isModified(app, ["grdCcsCurCls"])){
			var vsMsgParam = ExtControl.getTextValue("lblTitleFrfCcsCurCls");
			// "@의 시점 복사 작업은 [작업저장]후 진행하시기 바랍니다." 메시지 출력			
			util.Msg.alert("NLS-CCS-M062", [vsMsgParam]);
			return;
		}
		
		// 종료일자
		var vsEndDt = util.Grid.getCellValue(app, "grdCcsCurCls", "END_DT", vnOrgRowIdx).substring(0, 8);
		var vsKeyDate = util.DataMap.getValue(app, "dmReqKey", "strKeyDate").substring(0, 8);
		
		// 폐기여부 확인
		if(Number(vsEndDt) <= Number(vsKeyDate)){
			var vsMsgParam = ExtControl.getTextValue("lblTitleFrfCcsCurCls");
			// "폐기된 @은(는) 복사할 수 없습니다. 이력관리 탭에서 복구해주시기 바랍니다." 메시지 출력.
			util.Msg.alert("NLS-WRN-M208", [vsMsgParam]);
			return;
		}
		
		var voNextRow   = util.Grid.insertRow(app, "grdCcsCurCls");
		
		// 교과목 상세 조회
		doListDtl();
		
		// 값 복사
		ExtRepeat.copyToRowData("rptCcsCurCls", vnOrgRowIdx, "rptCcsCurCls", voNextRow);
		
		// 값복사후 Row의 내용 프리폼 반영을위해
		util.Grid.selectRow(app, "grdCcsCurCls", voNextRow);
		
		util.Grid.setCellValue(app, "grdCcsCurCls", "UPT_STATUS", "N", voNextRow);
		
		// 기본값 세팅
		// 시작일자 : 조회조건 기준일자
		util.FreeForm.setValue(app, "frfCcsCurCls", "ST_DT", vsKeyDate+"000000");
		
		// 종료일자 : 99991231
		util.FreeForm.setValue(app, "frfCcsCurCls", "END_DT", "99991231000000");
		
		// 참조키 : ""
		util.FreeForm.setValue(app, "frfCcsCurCls", "REF_KEY", "");
		
		// FLAG_GBN : C
		var vsFlagGbn = "C";
		util.Grid.setCellValue(app, "grdCcsCurCls", "FLAG_GBN", vsFlagGbn, voNextRow);
				
	};
	
	/**
	 * @desc [btnNew]신규 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 1
	 */
	moPage.onClick_BtnNew = function() {
		
		var voChildList = ExtInstance.getNodeListLength("/root/resList/rptCcsCurCls/row[child::FLAG_GBN = 'C']");
		if(voChildList != null && voChildList > 0 ){
			//-- 복사기능 처리내역이 있습니다. 작업저장 후 진행 하시기 바랍니다.
			util.Msg.alert("NLS-CCS-M072");
			return;
		}

		// 신규로우 추가
		var vnIdx = util.Grid.insertRow(app, "grdCcsCurCls");
		
		// 신규 Defalut값 설정
		// 시작일자 : 조회조건 기준일자
		//var vsStDt = ExtInstance.getValue("/root/reqKey/strKeyDate");
		var vsStDt		= util.DataMap.getValue(app, "dmKeyDateMap", "ST_DT");
		util.FreeForm.setValue(app, "frfCcsCurCls", "ST_DT", vsStDt);
		
		// 종료일자 : 99991231000000
		//var vsEndDt = "99991231000000";
		var vsEndDt = util.DataMap.getValue(app, "dmKeyDateMap", "END_DT");
		util.FreeForm.setValue(app, "frfCcsCurCls", "END_DT", vsEndDt);
		
		// 교과목 객체구분코드 : 교과목[CC009SB]
		util.FreeForm.setValue(app, "frfCcsCurCls", "SB_OBJ_DIV_RCD", "CC009SB");
		
		// 이수과정 객체구분코드 : 이수과정[CC009SP]  --> 2016. 2. 1. 박갑수 - 동서울대 이수과정 사용안함.
//		ExtRepeat.setValue("rptCcsCurCls", "SP_OBJ_DIV_RCD", "CC009SP", vnIdx);
		
		// 교과그룹 객체구분코드 : 교과그룹[CC009CU]
		util.Grid.setCellValue(app, "grdCcsCurCls", "CU_OBJ_DIV_RCD", "CC009CU", vnIdx);
		
		// 학사부서 객체구분코드 : 교과목[CC009SA]
		util.Grid.setCellValue(app, "grdCcsCurCls", "SA_OBJ_DIV_RCD", "CC009SA", vnIdx);
		
		// 강의평가제외 : Y
		//ExtFreeForm.setValue("frfCcsCurCls", "LECT_EVAL_XCP_YN", "Y");
		
		// 주간분반수 : 1
		util.FreeForm.setValue(app, "frfCcsCurCls", "DAY_DIVCLS_CNT", "1");
	
		// 수강신청정원1~4 : 0       -->  2016. 2. 4 박갑수 속도문제로인한 서버단 처리
		util.FreeForm.setValue(app, "frfCcsCurCls", "TLSN_REQ_CAPA1", "50", false, true);
		// 프리폼 이벤트있는항목 리피터에도 세팅
	    util.Grid.setCellValue(app, "grdCcsCurCls", "TLSN_REQ_CAPA1", "50", vnIdx);
		
//		ExtFreeForm.setValue("frfCcsCurCls", "TLSN_REQ_CAPA2", "0");
//		ExtFreeForm.setValue("frfCcsCurCls", "TLSN_REQ_CAPA3", "0");
//		ExtFreeForm.setValue("frfCcsCurCls", "TLSN_REQ_CAPA4", "0");
		
		var vsSbCd = util.DataMap.getValue(app, "dmReqKey", "strSbCd");
		// 조회조건의 교과목이 입력되어있다면 신규시 조회조건값으로 세팅
		if(!ValueUtil.isNull(vsSbCd)){
			// 교과목코드, 명 : 조회조건
			util.FreeForm.setValue(app, "frfCcsCurCls", "SB_CD", vsSbCd);
			util.FreeForm.setValue(app, "frfCcsCurCls", "SB_CD_NM", util.DataMap.getValue(app, "dmReqKey", "strSbNm"), false, true);
			util.Grid.setCellValue(app, "grdCcsCurCls", "SB_CD_NM", util.DataMap.getValue(app, "dmReqKey", "strSbNm"), vnIdx);
			
			// 그외 : 조회조건값(교과목검색팝업 리턴값) 세팅
			util.FreeForm.setValue(app, "frfCcsCurCls", "SB_CAT_RCD", util.DataMap.getValue(app, "dmResPopup", "strSbCatRcd"));
			util.FreeForm.setValue(app, "frfCcsCurCls", "REC_SCALE_RCD", util.DataMap.getValue(app, "dmResPopup", "strRecScaleRcd"));
			util.FreeForm.setValue(app, "frfCcsCurCls", "SB_TYPE_RCD", util.DataMap.getValue(app, "dmResPopup", "strSbTypeRcd"));
			util.FreeForm.setValue(app, "frfCcsCurCls", "EVAL_METHOD_RCD", util.DataMap.getValue(app, "dmResPopup", "strEvalMethodRcd"));
			util.FreeForm.setValue(app, "frfCcsCurCls", "LECT_TYPE_RCD", util.DataMap.getValue(app, "dmResPopup", "strLectTypeRcd"));
			util.FreeForm.setValue(app, "frfCcsCurCls", "RE_TLSN_YN_RCD", util.DataMap.getValue(app, "dmResPopup", "strReTlsnYnRcd"));
			
			var vsCmpDivRcd = util.DataMap.getValue(app, "dmResPopup", "strCmpDivRcd");
			
			util.FreeForm.setValue(app, "frfCcsCurCls", "CMP_DIV_RCD", vsCmpDivRcd, false, true);
			
			// 교직전공, 교직교양일경우 평가방법 - 절대평가[CA21001] else 상대평가[CA21002]
			if(ValueUtil.fixNull(vsCmpDivRcd) == "CA20121" || ValueUtil.fixNull(vsCmpDivRcd) == "CA20122"){
				util.FreeForm.setValue(app, "frfCcsCurCls", "EVAL_METHOD_RCD", "CA21001");
				util.Grid.setCellValue(app, "grdCcsCurCls", "EVAL_METHOD_RCD", "CA21001", vnIdx);
			}else {
				util.FreeForm.setValue(app, "frfCcsCurCls", "EVAL_METHOD_RCD", "CA21002");
				util.Grid.setCellValue(app, "grdCcsCurCls", "EVAL_METHOD_RCD", "CA21002", vnIdx);
			}
			
			
			util.FreeForm.setValue(app, "frfCcsCurCls", "PNT", util.DataMap.getValue(app, "dmResPopup", "strPnt"), false, true);
			var vsTheoTc = util.DataMap.getValue(app, "dmResPopup", "strTheoTc");
			util.FreeForm.setValue(app, "frfCcsCurCls", "THEO_TC", vsTheoTc, false, true);
			var vsEpacTc = util.DataMap.getValue(app, "dmResPopup", "strEpacTc");
			util.FreeForm.setValue(app, "frfCcsCurCls", "EPAC_TC", vsEpacTc, false, true);
			
			var vsLectTimeCnt = ValueUtil.fixNumber(vsTheoTc) + ValueUtil.fixNumber(vsEpacTc);
			util.FreeForm.setValue(app, "frfCcsCurCls", "LECT_TIME_CNT", vsLectTimeCnt, false, true);
			
			
			// 프리폼 이벤트있는항목 리피터에도 세팅
			util.Grid.setCellValue(app, "grdCcsCurCls", "CMP_DIV_RCD", util.DataMap.getValue(app, "dmResPopup", "strCmpDivRcd"), vnIdx);
			util.Grid.setCellValue(app, "grdCcsCurCls", "PNT", util.DataMap.getValue(app, "dmResPopup", "strPnt"), vnIdx);
			util.Grid.setCellValue(app, "grdCcsCurCls", "THEO_TC", vsTheoTc, vnIdx);
			util.Grid.setCellValue(app, "grdCcsCurCls", "EPAC_TC", vsEpacTc, vnIdx);
			util.Grid.setCellValue(app, "grdCcsCurCls", "LECT_TIME_CNT", vsLectTimeCnt, vnIdx);
		}else {
			// 평가방법 : 상대평가[CA21002]
			util.FreeForm.setValue(app, "frfCcsCurCls", "EVAL_METHOD_RCD", "CA21002");
			util.Grid.setCellValue(app, "grdCcsCurCls", "EVAL_METHOD_RCD", "CA21002", vnIdx);
			
			// 성적스케일 : 4.5(표준)[CD10106]
			util.FreeForm.setValue(app, "frfCcsCurCls", "REC_SCALE_RCD", "CD10106", false, true);
			util.Grid.setCellValue(app, "grdCcsCurCls", "REC_SCALE_RCD", "CD10106", vnIdx);
			
			// 강의유형 : 오프라인[CA209LECT]
			util.FreeForm.setValue(app, "frfCcsCurCls", "LECT_TYPE_RCD", "CA209LECT", false, true);
			util.Grid.setCellValue(app, "grdCcsCurCls", "LECT_TYPE_RCD", "CA209LECT", vnIdx);
		}
		
		// 학년 : 조회조건
		util.FreeForm.setValue(app, "frfCcsCurCls", "SB_LVL_RCD", util.Control.getValue(app, "cbbSbLvlRcd"), false, true);
		util.Grid.setCellValue(app, "grdCcsCurCls", "SB_LVL_RCD", util.Control.getValue(app, "cbbSbLvlRcd"), vnIdx);
		// 개설시기 : 조회조건
		util.FreeForm.setValue(app, "frfCcsCurCls", "EST_PRD_RCD", util.Control.getValue(app, "cbbEstPrdRcd"), false, true);
		util.Grid.setCellValue(app, "grdCcsCurCls", "EST_PRD_RCD", util.Control.getValue(app, "cbbEstPrdRcd"), vnIdx);
		
		// 이수구분코드 : 조회조건
		util.FreeForm.setValue(app, "frfCcsCurCls", "SP_CD", util.DataMap.getValue(app, "dmReqKey", "strSpCd"));
		// 교과그룹코드 : 조회조건
		util.FreeForm.setValue(app, "frfCcsCurCls", "CU_CD", util.DataMap.getValue(app, "dmReqKey", "strCuCd"));
		util.Grid.setCellValue(app, "grdCcsCurCls", "CU_CD", util.DataMap.getValue(app, "dmReqKey", "strCuCd"), vnIdx);
		
		// 학사부서코드 : 조회조건
		util.Grid.setCellValue(app, "grdCcsCurCls", "SA_CD", util.DataMap.getValue(app, "dmReqKey", "strSaCd"), vnIdx);
		
		// FLAG_GBN : N
		var vsFlagGbn = "N";
		util.Grid.setCellValue(app, "grdCcsCurCls", "FLAG_GBN", vsFlagGbn, vnIdx);
		
		
		util.Control.setFocus(app, "ipbFrfSbNm");
	};
	
	/**
	 * @desc [btnDel]삭제 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 1
	 */
	moPage.onClick_BtnDel = function() {
		
		var voChildList = ExtInstance.getNodeListLength("/root/resList/rptCcsCurCls/row[child::FLAG_GBN = 'C']");		
		if(voChildList != null && voChildList >0 ){
			var vsFlgGbn = util.Grid.getCellValue(app, "grdCcsCurCls", "FLAG_GBN", util.Grid.getIndex(app, "grdCcsCurCls"));
			if(vsFlgGbn != "C"){
				//--복사기능 처리내역이 있습니다. 작업저장 후 진행 하시기 바랍니다.
				util.Msg.alert("NLS-CCS-M072");
				return;
			}
			
		}
		
		
		// 삭제
		util.Grid.deleteRow(app, "grdCcsCurCls");
		// 마스터 리피트 상태에 따른 디테일 프리폼 비활성화 제어
		doCompareFrfEnable();
	};
	
	/**
	 * @desc [btnRestore]작업취소 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 1
	 */
	moPage.onClick_BtnRestore = function() {
		// 작업취소
		util.Grid.restoreRow(app, "grdCcsCurCls");
		// 마스터 리피트 상태에 따른 디테일 프리폼 비활성화 제어
		doCompareFrfEnable();
		// 취소내용 프리폼 반영
//TO-BE: <ExtRepeat.copyRowForm> 그리드-프리폼인 경우에는 selection바인딩으로 처리하기 때문에 불필요함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.copyRowForm("rptCcsCurCls", "frfCcsCurCls");
	};

	/**
	 * @desc [btnSave]작업저장 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 1
	 */
	moPage.onClick_BtnSave = function() {
		// 작업저장
		doSave();
	};
	
	/**
	 * @desc 교과과정목록 변경사항 저장
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 1. 26
	 */
	function doSave() {
		
		// 리피트 변경사항 체크
		if(!util.Grid.isModified(app, ["grdCcsCurCls"], "MSG")){
			return false;
		}
		
		// 리피트 Validation Check
		if(!util.validate(app, "grdCcsCurCls")) return false;

		//strCommand: save 
		util.Submit.send(app, "subSave", function(pbSuccess){
			if(pbSuccess){
				
				doSaveWithAcademicStructure();
				
				//조회건수가 0건이면 프리폼이 내역이 반영되지 않기 떄문
				util.Control.reset(app, "frfCcsCurCls");
				
				doList(function(pbListSuccess) {
					// 조회 : "갱신된 데이터가 조회되었습니다." header 메세지 표시
					if (pbListSuccess) doSetMsgStatus(NLS.INF.M025);
				});
			}else {
				// "저장중 오류가 발생하였습니다." 메시지 표시
				doSetMsgStatus(NLS.WRN.M119);
				util.Tab.setSelectedTabItem(app, "tabMain", TAB.MANAGE);
			}
		});
	};
	
	/**
	 * @desc 히스토리(이력)목록 조회
	 * @param poCallBackFunc 콜백정의
	 * @return void
	 * @author 박갑수 at 2016. 2. 1
	 */
	function doListHistory(poCallBackFunc) {
		
		var vsHisDate = util.DataMap.getValue(app, "dmReqKey", "strKeyDateHistory");
		var vsKeyDate = util.DataMap.getValue(app, "dmReqKey", "strKeyDate");
		
		// 폐기/복구일자 모두 지워졌을 경우 조회조건 기준일자 셋팅
		if(vsHisDate ==""){
			util.DataMap.setValue(app, "dmReqKey", "strKeyDateHistory", vsKeyDate);
		}
		
		// 폐기/복구일자 defalut세팅
		util.Control.redraw(app, "dipKeyDateHistory"); 
		
		// 이력관리 조회 서브이션 
		//strCommand: listHistory 
		util.Submit.send(app, "subListHistory", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdCcsCurClsHistory");
			}
			
			// 조회 후 콜백함수 수행
			if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
		});
	};
	
	/**
	 * @desc [btnYearSmtHis]폐기/복구일자(돋보기버튼) onClick 이벤트
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 2. 2
	 */
	moPage.onClick_BtnYearSmtHis = function() {
		// 기준일자 임포트(달력컨트롤ID,임포트ID)
		doOnclickSchYearSmt("dipKeyDateHistory", "impSchYearSmt");
	};
	
	/**
	 * @desc [btnDisUse]폐기 onClick 이벤트
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 2. 2
	 */
	moPage.onClick_BtnDisUse = function() {
		// 교과목 폐기
		doDisUseHistory();
	};
	
	/**
	 * @desc 교과목 폐기
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 2. 2
	 */
	function doDisUseHistory() {
		// 9999레코드를  조회조건의 학기의 (시작일자 - 1초) 로 업데이트 = 해당학기까지 유효한 데이타
		var vnCnt =  util.Grid.getRowCount(app, "grdCcsCurClsHistory");

		// 폐기/복구일자 유효성 체크
		if(!util.validate(app, "dipKeyDateHistory")) return false;
		// 조회조건 기준일자 : 마스터 포커스용
		var vsSchKeyDate = util.DataMap.getValue(app, "dmReqKey", "strKeyDate").substring(0, 8);
		
		var vnMaxRowIdx   = null;
		var vnMaxEndDt 	= null;
		for (var i = 0; i < vnCnt; i++) {
			var vnRowIdx = i+1;
			
			var vsEndDt = util.Grid.getCellValue(app, "grdCcsCurClsHistory", "END_DT", vnRowIdx).substring(0, 8);
			if (vsEndDt == "99991231") {
				vnMaxEndDt 		= vsEndDt;
				vnMaxRowIdx   	= vnRowIdx;
				
				break;
			}
		}
		
		// 1. 종료일자가 99991231이 아닐때, 폐기 불가
		if (vnMaxRowIdx == null) {
			// "폐기 가능한 데이터가 없습니다." 메시지 표시
			util.Msg.alert("NLS-INF-M029");
			return;
		}
		
		// 99991231가 있는 로우의 시작일
		var vsStDt   = util.Grid.getCellValue(app, "grdCcsCurClsHistory", "ST_DT", vnMaxRowIdx).substring(0, 8);
		var vsKeyDate = util.Control.getValue(app, "dipKeyDateHistory").substring(0, 8);
		var vsBefDate = moPage.getBefDate(vsKeyDate).substring(0, 8);
		
		if (vsStDt >= vsBefDate) {
			// 폐기 가능한 데이터가 없습니다.
			util.Msg.alert("NLS-INF-M029");
			return;
		}
		
		// 전날자로 타겟로우의 종료일자 업데이트
		var vsMsgDate = vsBefDate.substring(0, 4) + NLS.NSCR.YEAR + vsBefDate.substring(4, 6) + NLS.NSCR.MONTH + vsBefDate.substring(6, 8) + NLS.NSCR.DAY;
		
		// "@부로 폐기합니다. \n진행하시겠습니까?" 메시지
		if(util.Msg.confirm("NLS-CRM-M047", [vsMsgDate]) ){
			util.Grid.setCellValue(app, "grdCcsCurClsHistory", "END_DT", vsBefDate + "000000", vnMaxRowIdx);
			util.Grid.selectRow(app, "grdCcsCurClsHistory", vnMaxRowIdx, true);
			
			/*
				그리드에 pk_colvalues를 넣는다.
				조회 후 찾아주기 위함.
				var vsSchKeyDate = util.DataMap.getValue(app, "dmReqKey", "strKeyDate");
			*/
			if(vsSchKeyDate+"000000" >= vsStDt+"000000"){
				moPage.setCcsCurClsPkColRowValue("rptCcsCurClsHistory");
			}else{
				moPage.setCcsCurClsPkColRowValue("rptCcsCurCls");
			}
			
			doSaveHis();
		}
	};
	
	/**
	 * @desc 마스터 그리드의 pk_colvalues 값 세팅
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 2. 12
	 */
	moPage.setCcsCurClsPkColRowValue = function(vpRptDetail){
		var vcRptCcsSub = model.getControl("rptCcsCurCls");
		var vsPkColValues = ExtRepeat.getPKColRowValues(vpRptDetail);					
		if(!ValueUtil.isNull(vsPkColValues)){
			vcRptCcsSub.pk_values = vsPkColValues;
		}
	};
	
	/**
	 * @desc 기준일 이전날짜 추출
	 * @param 기준일
	 * @return  기준일 이전일
	 * @author 박갑수 at 2016. 2. 2
	 */
	moPage.getBefDate = function(psKeyDate) {
		
			var y  = psKeyDate.substring(0, 4);
			var m = psKeyDate.substring(4, 6);
			var d  = psKeyDate.substring(6, 8);
			var befDt = new Date(y, m - 1, d - 1);
			var befDtYear = befDt.getFullYear().toString();	// 2012.02.29 크롬에서도 정상적으로 작동되도록 수정함. 윤경희
			var befDtMonth = eval(befDt.getMonth() + 1).toString();
			var befDtDate = befDt.getDate().toString();
			
			if (befDtMonth.length == 1) befDtMonth = "0" + befDtMonth;
			if (befDtDate.length == 1) befDtDate = "0" + befDtDate;
			
			var vsBefDate = befDtYear + befDtMonth + befDtDate + "000000";
			
			return vsBefDate;
	};
	
	/**
	 * @desc 이력관리목록 변경사항 저장
	 * @param 
	 * @return  
	 * @author 박갑수 at 2016. 2. 2
	 */
	function doSaveHis() {
		// 리피트 변경사항 체크
		if(!util.Grid.isModified(app, ["grdCcsCurClsHistory"], "MSG")){
			return false;
		}
		
		//strCommand: save 
		util.Submit.send(app, "subSaveHistory", function(pbSuccess){
			if(pbSuccess) {
				
				// 디테일 저장시 마스터의 포커스를 찾아가기위한 인스턴스 설정
				var vsRefKey =  util.DataMap.getValue(app, "dmReqSelRow", "strRefKey");
				util.DataMap.setValue(app, "dmReqSelRow", "strTmpRefKey", vsRefKey);
				
				doSaveWithAcademicStructure();		
				
				util.Control.redraw(app, "grdCcsCurClsHistory");
				
				// 조회
				doList(function(pbSuccess) {
					if (pbSuccess){
						// 조회 : "갱신된 데이터가 조회되었습니다." header 메세지 표시
						doSetMsgStatus(NLS.INF.M025);

						// 마스터 포커스용 인스턴스 초기화
						util.DataMap.setValue(app, "dmReqSelRow", "strTmpRefKey", "");
					}
				});
			}else {
				// "저장중 오류가 발생하였습니다." 메시지 표시
				doSetMsgStatus(NLS.WRN.M119);
				doListHistory();
			}
		});
	};
	
	/**
	 * @desc [btnDisUseCanc]폐기취소 onClick 이벤트
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 2. 2
	 */
	moPage.onClick_BtnDisUseCanc = function() {
		// 교과목 폐기취소
		doUseCancHistory();
	};
	
	/**
	 * @desc 교과목 폐기취소
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 2. 2
	 */
	function doUseCancHistory() {
		
		var vnCnt = util.Grid.getRowCount(app, "grdCcsCurClsHistory");
		// 조회조건 기준일자 : 마스터 포커스용
		var vsSchKeyDate = util.DataMap.getValue(app, "dmReqKey", "strKeyDate").substring(0, 8);
		
		// 폐기/복구일자 유효성 체크
		if(!util.validate(app, "dipKeyDateHistory")) return false;
		
		var vnMaxRowIdx   = null;
		var vnMaxEndDt 	= null;
		for (var i = 0; i < vnCnt; i++) {
			var vnRowIdx = i+1;
			
			var vsEndDt = util.Grid.getCellValue(app, "grdCcsCurClsHistory", "END_DT", vnRowIdx).substring(0, 8);
			if ((vnMaxEndDt == null) || (vnMaxEndDt != null && vnMaxEndDt < vsEndDt)) {
				vnMaxEndDt = vsEndDt;
				vnMaxRowIdx = vnRowIdx;
			}
		}

		if (vnMaxEndDt == "99991231" ) {
			// 폐기취소 가능한 데이터가 없습니다.
			util.Msg.alert("NLS-INF-M030");
			
			return;
		}
		
		// "마지막 데이터의 종료일이 9999년 12월 31일로 변경됩니다. \n진행하시겠습니까?" 메시지
		if(util.Msg.confirm("NLS-CRM-M048") ){
			util.Grid.setCellValue(app, "grdCcsCurClsHistory", "END_DT", "99991231000000", vnMaxRowIdx);
			util.Grid.selectRow(app, "grdCcsCurClsHistory", vnMaxRowIdx);
			
			var vsBefDate =  util.Grid.getCellValue(app, "grdCcsCurClsHistory", "ST_DT", vnMaxRowIdx).substring(0, 8);
			/*
				그리드에 pk_colvalues를 넣는다.
				조회 후 찾아주기 위함.
				
			*/
			if(vsSchKeyDate+"000000" >= vsBefDate+"000000"){
				moPage.setCcsCurClsPkColRowValue("rptCcsCurClsHistory");
			}else{
				moPage.setCcsCurClsPkColRowValue("rptCcsCurCls");
			}
			
			// 이력사항 변경사항 저장
			doSaveHis();
		}
	};
	
	/**
	 * @desc [btnRecover]복구 onClick 이벤트
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 2. 2
	 */
	moPage.onClick_BtnRecover = function() {
		// 교과목 복구
		doRecoverHistory();
	};
	
	/**
	 * @desc 교과목 복구
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 2. 2
	 */
	function doRecoverHistory() {
		
		// 요약: 가장 최근의 레코드를 카피하여 insert한다. (단, 기준일자가 최종일자보다 커야 한다.)
		var vnCnt = util.Grid.getRowCount(app, "grdCcsCurClsHistory");
		// 조회조건 기준일자 : 마스터 포커스용
		var vsSchKeyDate	= util.DataMap.getValue(app, "dmReqKey", "strKeyDate").substring(0, 8);
		
		var vnMaxEndDt = null;
		var vnRowIdx = null;
		var vnMaxRowIdx = null;
		var vnMaxRowNum = null;
		
		// 폐기/복구일자 유효성 체크
		if(!util.validate(app, "dipKeyDateHistory")) return false;
		
		for (var i = 0; i < vnCnt; i++) {
			voRowIdx = i+1;
			
			var vsEndDt = util.Grid.getCellValue(app, "grdCcsCurClsHistory", "END_DT", voRowIdx).substring(0, 8);
			if ((vnMaxEndDt == null) || (vnMaxEndDt != null && vnMaxEndDt < vsEndDt)) {
				vnMaxEndDt = vsEndDt;
				vnMaxRowIdx = vnRowIdx;
				vnMaxRowNum = i;
			}
		}
		
		// 폐기/복구일자
		var vsHistoryKeyDate = util.Control.getValue(app, "dipKeyDateHistory").substring(0, 8);
		
		if (vnMaxEndDt >= vsHistoryKeyDate) {
			// "복구 가능한 DATA가 없습니다." 메시지 표시
			util.Msg.alert("NLS-WRN-M128");
			
			return;
		}
		
		 var vsMsgCiiDate = vsHistoryKeyDate.substring(0, 4) + NLS.NSCR.YEAR + vsHistoryKeyDate.substring(4, 6) + NLS.NSCR.MONTH + vsHistoryKeyDate.substring(6, 8) + NLS.NSCR.DAY;
		 
		//  "시작일 @ 종료일 9999년12월31일로 데이터가 복구됩니다. \n진행하시겠습니까?"
		 if (util.Msg.confirm("NLS-CRM-M049", [vsMsgCiiDate]) ) {
			 
			vnMaxRowNum  = util.Grid.getIndex(app, "grdCcsCurClsHistory");
			var voNextRow   = util.Grid.insertRow(app, "grdCcsCurClsHistory");
			 
			ExtRepeat.copyToRowData("rptCcsCurClsHistory", vnMaxRowNum, "rptCcsCurClsHistory", voNextRow);
			
			var vsKeyDate = util.Control.getValue(app, "dipKeyDateHistory").substring(0, 8);
			util.Grid.setCellValue(app, "grdCcsCurClsHistory", "REF_KEY", "", voNextRow);
			util.Grid.setCellValue(app, "grdCcsCurClsHistory", "ST_DT", vsKeyDate + "000000", voNextRow);
			util.Grid.setCellValue(app, "grdCcsCurClsHistory", "END_DT", "99991231000000", voNextRow);
			util.Grid.setCellValue(app, "grdCcsCurClsHistory", "UPT_STATUS", "N", voNextRow);
			
			/*
				그리드에 pk_colvalues를 넣는다.
				조회 후 찾아주기 위함.
			*/
			if(vsSchKeyDate+"000000" >= vsKeyDate+"000000"){
				moPage.setCcsCurClsPkColRowValue("rptCcsCurClsHistory");
			}else{
				moPage.setCcsCurClsPkColRowValue("rptCcsCurCls");
			}
			
			// 이력사항 변경사항 저장
			doSaveHis();
		 }
	};

	/**
	 * @desc 음수를  입력 할 수 없다.
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 2. 2
	 */
	moPage.onValueChanged_checkIntegerDecimal = function(vpCtl) {
		
		ValidUtil.checkIntegerDecimal(vpCtl, 3, 0, true);
	};
	
	/**
	 * @desc 수강정원 음수를  입력 할 수 없다.
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 2. 2
	 */
	moPage.onValueChanged_IpbFrfTlsnReqCapa1 = function() {		
		
		page.onValueChanged_checkIntegerDecimal("ipbFrfTlsnReqCapa1");
		
	};
	
	/**
	 * @desc 학점 음수를  입력 할 수 없다.
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 2. 2
	 */
	moPage.onValueChanged_IpbFrfPnt = function() {
		page.onValueChanged_checkIntegerDecimal("ipbFrfPnt");
	};
	
	/**
	 * @desc 이론 음수를  입력 할 수 없다.
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 2. 2
	 */
	moPage.onValueChanged_IpbFrfTheoTc = function() {
		page.onValueChanged_checkIntegerDecimal("ipbFrfTheoTc");
		
		doSetSbCatRcd();
	};
	
	/**
	 * @desc 실습 음수를  입력 할 수 없다.
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 2. 2
	 */
	moPage.onValueChanged_IpbFrfEpacTc = function() {
		page.onValueChanged_checkIntegerDecimal("ipbFrfEpacTc");
		
		doSetSbCatRcd();
	};
	
	/**
	 * @desc 교과목 범주값, 강의시수값 세팅
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 10. 12
	 */
	function doSetSbCatRcd(){
		// 교과목범주[CA203] - 이론[CA20301], 실습[CA20302], 이론+실습[CA20303]
		var vsSbCatRcd = "";
		
		// 이론
		var vsTheoTc = util.FreeForm.getValue(app, "frfCcsCurCls", "THEO_TC");
		// 실습
		var vsEpacTc = util.FreeForm.getValue(app, "frfCcsCurCls", "EPAC_TC");
		
		if(ValueUtil.fixNumber(vsTheoTc) > 0){
			if(ValueUtil.fixNumber(vsEpacTc) > 0){
				vsSbCatRcd = "CA20303";	// 이론 + 실습
			}else {
				vsSbCatRcd = "CA20301";	// 이론
			}
		}else {
			if(ValueUtil.fixNumber(vsEpacTc) > 0){
				vsSbCatRcd = "CA20302";	// 실습
			}else {
				vsSbCatRcd = "";
			}
		}
		
		// 교과목범주 세팅
		util.FreeForm.setValue(app, "frfCcsCurCls", "SB_CAT_RCD", vsSbCatRcd);
		util.Grid.setCellValue(app, "grdCcsCurCls", "SB_CAT_RCD", vsSbCatRcd);
		
		// 강의시수 세팅
		var vsLectTimeCnt = ValueUtil.fixNumber(vsTheoTc) + ValueUtil.fixNumber(vsEpacTc);
		util.FreeForm.setValue(app, "frfCcsCurCls", "LECT_TIME_CNT", vsLectTimeCnt);
		util.Grid.setCellValue(app, "grdCcsCurCls", "LECT_TIME_CNT", vsLectTimeCnt);
	};
	
	/**
	 * @desc 강의시수 음수를  입력 할 수 없다.
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 2. 2
	 */
	moPage.onValueChanged_IpbFrfLectTimeCnt = function() {
		page.onValueChanged_checkIntegerDecimal("ipbFrfLectTimeCnt");
	};

	/**
	 * @desc [rhCkbSelect]패널 onValueChanged 이벤트
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 2. 2
	 */
	moPage.onValueChanged_RhCkbSelect = function() {
		// 리피트 패널 설정
//TO-BE: <ExtRepeat.selectedAllPanel> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.selectedAllPanel("rhCkbSelect");
	};
	
	/**
	 * @desc [btnDclRcd]학문분야(돋보기) onClick 이벤트
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 2. 2
	 */
	moPage.onClick_BtnDclRcd = function(sender) {
		// 이수구분
		var vsCmpDivRcd = util.Control.getValue(app, "cbbCmpDivRcd");

		if(ValueUtil.isNull(vsCmpDivRcd)){
			var vsCmpDivRcdTitle = ExtControl.getTextValue("lblCmpDivRcd");
			// 학문분야 선택 시 조회조건의 이수구분은 필수 입력 항목입니다.
			util.Msg.alert("NLS-CCS-M079");
		}else {
			// 학문분야검색팝업 호출
			doOnClickStdCcsPDclExtendPopup(sender);
		}
	};
	
	/**
	 * @desc [btnPlus]+버튼 onClick 이벤트
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 2. 2
	 */
	moPage.onClick_BtnPlus = function() {
		var vsIdx = util.Grid.getCheckOrSelectedRowIndex(app, "grdCcsCurCls");
		var vsDclRcdNm = util.Control.getValue(app, "ipbDclRcdNm");
		
		if(ValueUtil.isNull(vsIdx)){
			// 선택된 데이터가 없습니다.
			ComMsg.warn("M008");
			return false;
		}
		
		if(ValueUtil.isNull(vsDclRcdNm)){
			var vsDclRcdCtlNm = ExtControl.getTextValue("lblDclRcdNm");
			util.Msg.alert("NLS-CCS-M027", [vsDclRcdCtlNm]);
			return false;
		}
		
		
		var vaIdx = vsIdx.split(",");
		
		for(var i=0; i<vaIdx.length; i++){
			var vbChange = false;
			
			var vnIdx = vaIdx[i];
			
			// 선택된 학문분야
			var vsSelDclRcdCd = util.DataMap.getValue(app, "dmReqDclRcd", "strDclRcd");
			var vaSelDclRcdCd = vsSelDclRcdCd.split(",");
			var vsSelDclRcdNm = util.Control.getValue(app, "ipbDclRcdNm");
			var vsSelDclRcdNm = vsSelDclRcdNm.split(",");
			
			// 인덱스에 해당하는 학문분야
			var vsDclRptRcdCd  = util.Grid.getCellValue(app, "grdCcsCurCls", "DCL_RCD_CD", vnIdx);
			var vsDclRptRcdNm = util.Grid.getCellValue(app, "grdCcsCurCls", "DCL_RCD_NM", vnIdx);
			
			for(var j=0; j<vaSelDclRcdCd.length; j++){
				
				// 학문분야코드가 포함되어있는지 확인
				if(vsDclRptRcdCd.indexOf(vaSelDclRcdCd[j]) == -1){
					// 없을경우 추가
					if(ValueUtil.isNull(vsDclRptRcdCd)){
						vsDclRptRcdCd = vaSelDclRcdCd[j];
						vsDclRptRcdNm = vsSelDclRcdNm[j];
					}else {
						vsDclRptRcdCd = vsDclRptRcdCd + "," + vaSelDclRcdCd[j];
						vsDclRptRcdNm = vsDclRptRcdNm + ", " + vsSelDclRcdNm[j];
					}
					
					vbChange = true;
				}
			}	// end for j
			
			// 변경시 리피터에 반영
			if(vbChange){
				util.Grid.setCellValue(app, "grdCcsCurCls", "UPT_STATUS", "U", vnIdx);
				util.Grid.setCellValue(app, "grdCcsCurCls", "DCL_RCD_CD", vsDclRptRcdCd, vnIdx);
				util.Grid.setCellValue(app, "grdCcsCurCls", "DCL_RCD_NM", vsDclRptRcdNm, vnIdx);
											
				if(ValueUtil.fixNull(vsDclRptRcdCd).indexOf("CA21240") != -1){
					
					// 평가방법 : 절대평가[CA21001]
					util.Grid.setCellValue(app, "grdCcsCurCls", "EVAL_METHOD_RCD", "CA21001", vnIdx);
				}else {
					
					// 평가방법 : 상대평가[CA21002]
					util.Grid.setCellValue(app, "grdCcsCurCls", "EVAL_METHOD_RCD", "CA21002", vnIdx);
				}
			}
			
			if(util.Grid.getIndex(app, "grdCcsCurCls") == vnIdx){
				util.FreeForm.setValue(app, "frfCcsCurCls", "DCL_RCD_CD", vsDclRptRcdCd);
				util.FreeForm.setValue(app, "frfCcsCurCls", "DCL_RCD_NM", vsDclRptRcdNm);
				
				if(ValueUtil.fixNull(vsDclRptRcdCd).indexOf("CA21240") != -1){
					
					// 평가방법 : 절대평가[CA21001]
					util.FreeForm.setValue(app, "frfCcsCurCls", "EVAL_METHOD_RCD", "CA21001");
				}else {
					
					// 평가방법 : 상대평가[CA21002]
					util.FreeForm.setValue(app, "frfCcsCurCls", "EVAL_METHOD_RCD", "CA21002");
				}
			}
		}	// end for i
	};
	
	/**
	 * @desc [btnPlus]-버튼 onClick 이벤트
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 2. 2
	 */
	moPage.onClick_BtnMinus = function() {
		var vsIdx = util.Grid.getCheckOrSelectedRowIndex(app, "grdCcsCurCls");
		var vsDclRcdNm = util.Control.getValue(app, "ipbDclRcdNm");
		
		if(ValueUtil.isNull(vsIdx) ){
			// 선택된 데이터가 없습니다.
			ComMsg.warn("M008");
			return false;
		}
		
		if(ValueUtil.isNull(vsDclRcdNm)){
			var vsDclRcdCtlNm = ExtControl.getTextValue("lblDclRcdNm");
			util.Msg.alert("NLS-CCS-M027", [vsDclRcdCtlNm]);
			return false;
		}
		
		var vaIdx = vsIdx.split(",");
		for(var i=0; i<vaIdx.length; i++){
			var vbChange = false;
			
			var vnIdx = vaIdx[i];
			
			// 선택된 학문분야
			var vsSelDclRcdCd = util.DataMap.getValue(app, "dmReqDclRcd", "strDclRcd");
			var vaSelDclRcdCd = vsSelDclRcdCd.split(",");
			var vsSelDclRcdNm = util.Control.getValue(app, "ipbDclRcdNm");
			var vsSelDclRcdNm = vsSelDclRcdNm.split(",");
			
			// 인덱스에 해당하는 학문분야
			var vsDclRptRcdCd  = util.Grid.getCellValue(app, "grdCcsCurCls", "DCL_RCD_CD", vnIdx);
			var vsDclRptRcdNm = util.Grid.getCellValue(app, "grdCcsCurCls", "DCL_RCD_NM", vnIdx);
			
			var vsNewRcdCd = "";
			var vsNewRcdNm = "";

			for(var j=0; j<vaSelDclRcdCd.length; j++){
				// 학문분야코드가 포함되어있는지 확인
				if(vsDclRptRcdCd.indexOf(vaSelDclRcdCd[j]) != -1){
					// 있을경우 삭제
					vsDclRptRcdCd = vsDclRptRcdCd.replace(vaSelDclRcdCd[j] ,"");
					vsDclRptRcdNm = vsDclRptRcdNm.replace(vsSelDclRcdNm[j] ,"");
					
					// 콤마 두개인경우 한개로
					vsDclRptRcdCd = vsDclRptRcdCd.replace(",," ,",");
					vsDclRptRcdNm = vsDclRptRcdNm.replace(", ," ,",");
					
					if(!ValueUtil.isNull(vsDclRptRcdCd)){
						// 첫번째가 , 일경우 없앰
						if(vsDclRptRcdCd.charAt(0) == ","){
							vsDclRptRcdCd = vsDclRptRcdCd.substring(1,vsDclRptRcdCd.length);
							vsDclRptRcdNm = vsDclRptRcdNm.substring(1,vsDclRptRcdNm.length);
							
							// 첫번째가 공백일경우 없앰
							if(vsDclRptRcdNm.charAt(0) == " "){
								vsDclRptRcdNm = vsDclRptRcdNm.substring(1,vsDclRptRcdNm.length);
							}
						}
						
						// 마지막이 , 일경우 없앰
						if(vsDclRptRcdCd.charAt(vsDclRptRcdCd.length-1) == ","){
							// 마지막이 공백일경우 없앰
							if(vsDclRptRcdNm.charAt(vsDclRptRcdNm.length-1) == " "){
								vsDclRptRcdNm = vsDclRptRcdNm.substring(0,vsDclRptRcdNm.length-1);
							}
							
							vsDclRptRcdCd = vsDclRptRcdCd.substring(0,vsDclRptRcdCd.length-1);
							vsDclRptRcdNm = vsDclRptRcdNm.substring(0,vsDclRptRcdNm.length-1);
						}
					}

					vbChange = true;
				}
			}	// end for j
			
			// 변경시 리피터에 반영
			if(vbChange){
				util.Grid.setCellValue(app, "grdCcsCurCls", "UPT_STATUS", "U", vnIdx);
				util.Grid.setCellValue(app, "grdCcsCurCls", "DCL_RCD_CD", vsDclRptRcdCd, vnIdx);
				util.Grid.setCellValue(app, "grdCcsCurCls", "DCL_RCD_NM", vsDclRptRcdNm, vnIdx);
				
				if(ValueUtil.fixNull(vsDclRptRcdCd).indexOf("CA21240") != -1){
					
					// 평가방법 : 절대평가[CA21001]
					util.Grid.setCellValue(app, "grdCcsCurCls", "EVAL_METHOD_RCD", "CA21001", vnIdx);
				}else {
					
					// 평가방법 : 상대평가[CA21002]
					util.Grid.setCellValue(app, "grdCcsCurCls", "EVAL_METHOD_RCD", "CA21002", vnIdx);
				}
			}
			
			if(util.Grid.getIndex(app, "grdCcsCurCls") == vnIdx){
				util.FreeForm.setValue(app, "frfCcsCurCls", "DCL_RCD_CD", vsDclRptRcdCd);
				util.FreeForm.setValue(app, "frfCcsCurCls", "DCL_RCD_NM", vsDclRptRcdNm);
				
				if(ValueUtil.fixNull(vsDclRptRcdCd).indexOf("CA21240") != -1){
					
					// 평가방법 : 절대평가[CA21001]
					util.FreeForm.setValue(app, "frfCcsCurCls", "EVAL_METHOD_RCD", "CA21001");
				}else {
					
					// 평가방법 : 상대평가[CA21002]
					util.FreeForm.setValue(app, "frfCcsCurCls", "EVAL_METHOD_RCD", "CA21002");
				}
			}
		}	// end for i
	};
	
	
	/*
		검색조건 변경 시
		학문분야 명칭, 코드르 초기화 한다.
	*/
	moPage.onValueChanged_CbbCmpDivRcd = function() {
		util.DataMap.setValue(app, "dmReqDclRcd", "strDclRcd", "");
		util.DataMap.setValue(app, "dmReqDclRcd", "strDclRcdNm", "");
		util.Control.redraw(app, ["ipbDclRcdNm"]);
	};
	
	/**
	 * @desc 기등록된 교과과정인지 확인(교과그룹코드, 교과목코드)
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 10. 18
	 */
	function doChkCurCls() {
		
		var vsCuCd = util.Grid.getCellValue(app, "grdCcsCurCls", "CU_CD"); 
		var vsSbCd = util.Grid.getCellValue(app, "grdCcsCurCls", "SB_CD");
		var vsSbNm = util.Grid.getCellValue(app, "grdCcsCurCls", "SB_CD_NM");
		var vsStDt = util.Grid.getCellValue(app, "grdCcsCurCls", "ST_DT");
		var vsEndDt = util.Grid.getCellValue(app, "grdCcsCurCls", "END_DT");
		var vsUptStatus = util.Grid.getCellValue(app, "grdCcsCurCls", "UPT_STATUS");
		
		util.DataMap.setValue(app, "dmReqChkKey", "strCuCd", vsCuCd);
		util.DataMap.setValue(app, "dmReqChkKey", "strSbCd", vsSbCd);
		util.DataMap.setValue(app, "dmReqChkKey", "strSbNm", vsSbNm);
		util.DataMap.setValue(app, "dmReqChkKey", "strStDt", vsStDt);
		util.DataMap.setValue(app, "dmReqChkKey", "strEndDt", vsEndDt);
		
		if(ValueUtil.fixNull(vsUptStatus) == "N" && !ValueUtil.isNull(vsCuCd) && !ValueUtil.isNull(vsSbCd) 
			&& !ValueUtil.isNull(vsStDt) && !ValueUtil.isNull(vsEndDt)){
						
			//strCommand: doChkCurCls 
			util.Submit.send(app, "subDoChkCurCls", function(pbSuccess){
				if(pbSuccess){
					
					var vsMsg = util.DataMap.getValue(app, "dmResList", "strMsg");
					util.Control.setValue(app, "lblWarn", vsMsg);
				}	
			});
		}else {
			util.Control.setValue(app, "lblWarn", "");
		}
	};
	
	/**
	 * @desc [cbbFrfCuCd]교과그룹 onValueChanged 이벤트
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 2. 2
	 */
	moPage.onValueChanged_CbbFrfCuCd = function() {
		var vsCuCd = util.FreeForm.getValue(app, "frfCcsCurCls", "CU_CD");
		util.Grid.setCellValue(app, "grdCcsCurCls", "CU_CD", vsCuCd);
		
		// 기등록된 교과과정인지 확인(교과그룹코드, 교과목코드, 시작일자, 종료일자)
		doChkCurCls();
	};
	
	/**
	 * @desc [btnAllDisUse]일괄폐기 onClick 이벤트
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 10. 25
	 */
	moPage.onClick_BtnAllDisUse = function() {
		
		var vnRowCnt = ExtInstance.getNodeListLength("/root/resList/rptCcsCurCls/row[child::DEL_CKB='Y']");
		
		if(vnRowCnt < 1){
			// 선택된 데이터가 없습니다.
			ComMsg.warn("M008");
			return false;
		}
		
		// 폐기/복구일자 유효성 체크
		if(!util.validate(app, "dipKeyDateHistory")) return false;
		
		// 조회조건 기준일자 : 마스터 포커스용
		var vsSchKeyDate = util.DataMap.getValue(app, "dmReqKey", "strKeyDate").substring(0, 8);
		var vnCnt =  util.Grid.getRowCount(app, "grdCcsCurClsHistory");
		var vnMaxRowIdx   = null;
		for (var i = 0; i < vnCnt; i++) {
			var vnRowIdx = i+1;
			
			var vsEndDt = util.Grid.getCellValue(app, "grdCcsCurClsHistory", "END_DT", vnRowIdx).substring(0, 8);
			if (vsEndDt == "99991231") {
				vnMaxRowIdx   	= vnRowIdx;
				
				break;
			}
		}
		
		var vsStDt = util.Grid.getCellValue(app, "grdCcsCurClsHistory", "ST_DT", vnMaxRowIdx).substring(0, 8);
		
		
		var vsKeyDate = util.Control.getValue(app, "dipKeyDateHistory").substring(0, 8);
		var vsBefDate = moPage.getBefDate(vsKeyDate).substring(0, 8);
		
		// 전날자로 타겟로우의 종료일자 업데이트
		var vsMsgDate = vsBefDate.substring(0, 4) + NLS.NSCR.YEAR + vsBefDate.substring(4, 6) + NLS.NSCR.MONTH + vsBefDate.substring(6, 8) + NLS.NSCR.DAY;
		
		// "@부로 폐기합니다. \n진행하시겠습니까?" 메시지
		if(util.Msg.confirm("NLS-CRM-M047", [vsMsgDate]) ){
			util.DataMap.setValue(app, "dmReqKey", "strBefDate", vsBefDate);
		
			var vnSelectRowCnt = ExtInstance.getNodeListLength("/root/resList/rptCcsCurCls/row[child::DEL_CKB='Y']");
			var vsIdx = util.Grid.getCheckOrSelectedRowIndex(app, "grdCcsCurCls");
			var vaIdx = vsIdx.split(",");

			for(var i=0; i<vnSelectRowCnt; i++){
				var vnIdx = vaIdx[i];
				
				util.Grid.setRowState(app, "grdCcsCurCls", cpr.data.tabledata.RowState.UPDATED, vnIdx);
			}
			
			/*
				그리드에 pk_colvalues를 넣는다.
				조회 후 찾아주기 위함.
			*/
			if(vsSchKeyDate+"000000" >= vsStDt+"000000"){
				var vsPKValue = ExtRepeat.getPKColRowValues("rptCcsCurCls");
				ExtControl.getControl("rptCcsCurCls").pk_values = vsPKValue.replace("99991231", vsBefDate);
				
			}else{
				moPage.setCcsCurClsPkColRowValue("rptCcsCurCls");
			}
			
			//strCommand: doAllDisUse 
			util.Submit.send(app, "subAllDisUse", function(pbSuccess){
				if(pbSuccess) {
					
					// 디테일 저장시 마스터의 포커스를 찾아가기위한 인스턴스 설정
					var vsRefKey =  util.DataMap.getValue(app, "dmReqSelRow", "strRefKey");
					util.DataMap.setValue(app, "dmReqSelRow", "strTmpRefKey", vsRefKey);
					
					doSaveWithAcademicStructure();		
					
					util.Control.redraw(app, "grdCcsCurClsHistory");
					
					// 조회
					doList(function(pbSuccess) {
						if (pbSuccess){
							// 조회 : "갱신된 데이터가 조회되었습니다." header 메세지 표시
							doSetMsgStatus(NLS.INF.M025);

							// 마스터 포커스용 인스턴스 초기화
							util.DataMap.setValue(app, "dmReqSelRow", "strTmpRefKey", "");
						}
					});
				}else {
					
					// 상태 되돌림
					for(var i=0; i<vnSelectRowCnt; i++){
						var vnIdx = vaIdx[i];
						
						util.Grid.setRowState(app, "grdCcsCurCls", cpr.data.tabledata.RowState.UNCHANGED, vnIdx);
					}
				}
			});
		}
	};
	
	
	moPage.onValueChanged_CbbSmtRcd = function() {
		// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
		doChangeYearSmt("smt");
	}
	
	moPage.onValueChanged_CbbSchYearRcd = function() {
		// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
		doChangeYearSmt("year");
	}
	
	/**
	 * @desc 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 5
	 */
	function doChangeYearSmt(psDiv) {
		
		
		var vsSmtRcdParam = util.DataMap.getValue(app, "dmKeyDateMap", "SMT");
		if(vsSmtRcdParam == 'CA00390' || vsSmtRcdParam == 'CA00391'){
			vsSmtRcdParam = "CA00310";
		}else if(vsSmtRcdParam == 'CA00392' || vsSmtRcdParam == 'CA00393'){
			vsSmtRcdParam = "CA00320";
		}
		util.DataMap.setValue(app, "dmReqKey", "SMT", vsSmtRcdParam);
				
		//strCommand: date 
		util.Submit.send(app, "subDate", function(pbSuccess){
			if(pbSuccess){
				msSchYearRcd = util.DataMap.getValue(app, "dmKeyDateMap", "YEAR");
				msSmtRcd = util.DataMap.getValue(app, "dmKeyDateMap", "SMT");
				
				
				
				
				
				var vsStDt = util.DataMap.getValue(app, "dmKeyDateMap", "ST_DT");
				util.DataMap.setValue(app, "dmReqKey", "strKeyDate", vsStDt);
				util.Control.redraw(app, "dipKeyDate");
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
	
	
	return moPage;
};
