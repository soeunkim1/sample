//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./stdCrsCRegFeeMgt.xtm"/>


var stdCrsCRegFeeMgt = function() {
	var moPage = new Page();
	//임포트용 데이터 통신 오브젝트
	var moPObject = new PObject();
	
	// 트리뷰 
	var msTrv = {
		initVal : null,
		initValNm : null,
		beforeVal : null,
		beforeValNm : null
	};
	
	// 학생정보 오브젝트 정보 및 학년도 학기 정보 
	// 서브페이지 사용용
	moPage.moCmnInfo = {
		studId		: null,
		studNo		: null,
		studNm		: null,
		ogCd		: null,
		ogNm		: null,
		saCd   		: null,
		saNm		: null,
		spCd		: null,
		spNm		: null,
		statRcd		: null,
		statNm		: null,
		
		schYearRcd 	: null,
		smtRcd 		: null,
		currentDt 	: null,
		stDt 		: null,
		endDt 		: null
	};
	
	/**
	 * 학생검색팝업 관련 설정사항
	 * 설정가능 유형 : 
	 *   1. 인스턴스((/root/시작))
	 *   2. 그리드의 셀 (ghc시작)
	 *   3. 컨트롤 id
	 * 각 변수별 설명
	 *  iXXX : 팝업으로 input 전달될 파라미터
	 *  oXXX : 팝업에서 선택한 값을 받을 컬럼 아이디
	 *  1. controlId 		: 최초 이벤트의 버튼이나 그리드 id	(필수)
	 *  2. iStudNo 			: 검색조건 학번						(선택) (값이 존재할 경우 4자리 이상)
	 *  3. iStudId 			: 검색조건 학번오브젝트				(선택)
	 *  4. iStudNm 			: 이름        						(선택) (값이 존재할 경우 2자리 이상)
	 *  5. iKeyDate 		: 기준일 							(필수)
	 *  6. iObjDivRcd 		: 객체구분코드 						(선택)
	 *  7. iObjCd 			: 부서코드							(선택)
	 *  8. iObjNm 			: 부서명							(선택) 
	 *  9. iAuthYN			: 권한미적용여부 (미적용시: "Y")	(선택) 
	 *  10. iStatRcd		: 학적상태							(선택) 
	 *  11. iStudDivRcd		: 학생구분							(선택) 
	 *  12. oStudId			: 학번오브젝트
	 *  13. oStudNo 		: 학번
	 *  14. oStudNm 		: 이름
	 *  15. oStatNm 		: 학적상태명
	 *  16. oStatRcd 		: 학적상태코드
	 *  17. oProcRslt 		: 진급학기
	 *  18. oProcRsltYear 	: 진급학년
	 *  19. oSaCd 			: 학사부서코드명
	 *  20. oSaNm 			: 학사부서명
	 *  21. oSpCd 			: 이수과정코드명
	 *  22. oSpNm 			: 이수과정명
	 *  23. oOgCd 			: 행정부서코드명
	 *  24. oOgNm 			: 행정부서명
	 *  25. oStudDivRcd		: 학생구분코드
	 *  26. oStudDivNm		: 학생구분명
	 *  27. oBirthday		: 생년월일
	 *  28. oGenderRcd		: 성별코드
	 *  29. oGenderNm		: 성별명
	 *  30. func 			: 팝업에서 선택한 값을 받은 후 추가 로직이 필요한 경우 함수 작성
	 */
	moPObject.moIdsForStdCsrPStSearch = [
	{
		controlId 		: "btnPopSearch",
		iStudNo 		: "ipbSchStudId",	
		iStudId 		: "",
		iStudNm 		: "",
		iKeyDate 		: "", 
		iObjDivRcd 		: "",
		iObjCd 			: "",
		iObjNm 			: "",
		iAuthYN 		: "",
		iStatRcd 		: "",
		iStudDivRcd		: "",
		oStudId 		: "ipbSchStudIdObj",
		oStudNo 		: "ipbSchStudId",
		oStudNm 		: "",
		oStatNm 		: "",
		oStatRcd 		: "",
		oProcRslt 		: "",
		oProcRsltYear 	: "",
		oSaNm			: "",
		oSaCd 			: "",
		oSpNm 			: "",
		oSpCd 			: "",
		oOgNm 			: "",
		oOgCd 			: "",
		oStudDivRcd		: "",
		oStudDivNm		: "",
		oBirthday		: "",
		oGenderRcd		: "",
		oGenderNm		: "",
		func : function(poParam) {
			doStSearch(poParam);
		}
	}
	];
	
	/**
	 * @desc import 헤더 초기화
	 * @member stdCrsCRegFeeMgt
	 * @param
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 21.
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		doHeaderOnLoad();
	};
	
	/**
	 * @desc import 학생정보 임포트 초기화
	 * @member stdCrsCRegFeeMgt
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 21.
	 */
	moPage.onLoadImportDone_ImpStudInfo = function() {
		impStudInfo();
	};
	
	/**
	 * @desc 공통코드 호출 및 화면 초기화
	 * @member stdCrsCRegFeeMgt
	 * @param
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 21.
	 */	
	function doOnLoad() {
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", "grpData");
		
		//학년도 학기 검색임포트
		doOnLoadImpNS("CRS");
		
		util.DataMap.setValue(app, "dmReqKey", "strOprtRoleId", moPageInfo.oprt_role_id);
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, ["cbbRegCls","trvMenuList"]);
				
				// 학년도 학기 기본값 셋팅
				moCmnInfo.schYearRcd = util.Control.getValue(app, "cbbYearImpNS");
				moCmnInfo.smtRcd = util.Control.getValue(app, "cbbSmtImpNS");
				moCmnInfo.stDt = ExtInstance.getValue("instance('impCommonN')/root/date/ST_DT");
				moCmnInfo.endDt = ExtInstance.getValue("instance('impCommonN')/root/date/END_DT");
				moCmnInfo.currentDt = util.DataMap.getValue(app, "dmDate", "CUT_DT");
				
				// 등록분류 초기값 셋팅
				var vsDefaultRegCls = ExtInstance.getValue("/root/resOnLoad/listRegCls/row", "CD" , "child::CD_PRP1='Y'");
				moCmnInfo.regClsRcd = vsDefaultRegCls;
				
				moPObject.moIdsForStdCsrPStSearch[0].iKeyDate = moCmnInfo.endDt;
				
				if(ExtInstance.getNodeListLength("/root/resOnLoad/trvMenuList") > 0){
					//스텝1프로그램 추출: PRT_ORD 첫번째(ORDERED BY PRT_ORD되어있음)
					msTrv.initVal = util.DataSet.getValue(app, "dsTrvMenuList, 1, "CD_PRP2");
					msTrv.initValNm = util.DataSet.getValue(app, "dsTrvMenuList, 1, "CD_PRP1");
					msTrv.beforeVal = msTrv.initVal;
					msTrv.beforeValNm = msTrv.initValNm;
				}
				
			}
			
			util.SelectCtl.selectItem(app, "cbbRegCls", vsDefaultRegCls);
			util.Control.setFocus(app, "ipbSchStudId");
			
			//impStudInf02(학생정보 임포트) 초기화
			initSize();
		});
	};
	
	/**
	 * @desc 학년도 학기 임포트 값 변경 시 호출 함수 
	 * 		- 기준일자 셋팅및 학생정보 초기화
	 * @member stdCrsCRegFeeMgt
	 * @author Aeyoung Lee 2016. 3. 30.
	 */
	function doSetKeyDateYearSmtImp() {
		var vsEndDt = ExtInstance.getValue("instance('impCommonN')/root/date/END_DT");
		moPObject.moIdsForStdCsrPStSearch[0].iKeyDate = vsEndDt;
		
		// 2016.08.31 학년도/학기에 따른 학번 클리어 주석
//		// 변경 시 학생정보 초기화
//		ExtControl.setValue("ipbSchStudId", "");
//		ExtControl.setValue("ipbSchStudIdObj", "");
//		
//		moPage.doStSearch(null);
	};	
	
	/**
	 * @desc 등록분류 입력창 클릭 이벤트 
	 * @member stdCrsCRegFeeMgt
	 * @author Aeyoung Lee 2016. 3. 30.
	 */
	moPage.onFocusReceive_CbbRegCls = function() {
		// 학생정보 및 등록사항 초기화
		doRestImpInfo();
	};
	
	/**
	 * @desc 학생검색 입력창 클릭 이벤트 
	 * @member stdCrsCRegFeeMgt
	 * @author Aeyoung Lee 2016. 3. 30.
	 */
	moPage.onClick_IpbSchStudId = function() {
		// 학생정보 및 등록사항 초기화
		doRestImpInfo();
	};
	
	/**
	 * @desc 학생정보 및 등록사항 초기화
	 * @member stdCrsCRegFeeMgt
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 30.
	 */
	function doRestImpInfo() {
		// 2016.04.22 학생정보, 등록사항이 프리폼으로 변경해서 초기화작업이 공통단에서 이루어 지도록 함
//		// 학생정보 초기화
//		clearImpStudInfo02();
//		// 등록사항 초기화
//		ExtControl.setValue("ipbRegInfo", "");
	};
	
	/**
	 * @desc 학생검색 팝업을 호출한다.
	 * @member stdCrsCRegFeeMgt
	 * @param sender 버튼의 이벤트 객체
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 21.
	 */
	moPage.onClick_BtnPopSearch = function(sender) {
		// 학생정보 및 등록사항 초기화
		doRestImpInfo();
		
		if(!util.validate(app, "cbbYearImpNS", "cbbSmtImpNS")) return;
		
		doOnClickStdCsrPStSearch(sender);
	};
	
	/**
	 * @desc 학생 검색
	 * @member stdCrsCRegFeeMgt
	 * @param sender 인풋박스 이벤트 객체
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 21.
	 */
	moPage.onValueChanged_IpbSchStudId = function(sender) {
		if(!util.validate(app, "cbbYearImpNS", "cbbSmtImpNS")) return;
		
		doOnChangeStdCsrPStSearch(sender);
	};
	
	/**
	 * @desc 입력된 학생정보 셋팅한 후 조회이벤트 호출
	 * @member stdCrsCRegFeeMgt
	 * @param poParam 학생정보
	 * @param poCallbackFunc 콜백함수정의
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 21.
	 */	
	function doStSearch(poParam, poCallbackFunc) {
		moCmnInfo.studId 	= null;
		moCmnInfo.studNo 	= null;
		moCmnInfo.studNm 	= null;
		moCmnInfo.ogCd		= null;
		moCmnInfo.ogNm		= null;
		moCmnInfo.saCd   	= null;
		moCmnInfo.saNm		= null;
		moCmnInfo.spCd		= null;
		moCmnInfo.spNm		= null;
		moCmnInfo.statRcd	= null;
		moCmnInfo.statNm	= null;
		
		var vsStudId = util.Control.getValue(app, "ipbSchStudId");
		
		if(!ValueUtil.isNull(vsStudId)){
			moCmnInfo.studId 	= poParam.Result.strStudId;
			moCmnInfo.studNo 	= poParam.Result.strStudNo; 
			moCmnInfo.studNm 	= poParam.Result.strStudNm;
			moCmnInfo.ogCd		= poParam.Result.strOgCd;
			moCmnInfo.ogNm		= poParam.Result.strOgNm;
			moCmnInfo.saCd   	= poParam.Result.strSaCd;
			moCmnInfo.saNm		= poParam.Result.strSaNm;
			moCmnInfo.spCd		= poParam.Result.strSpCd;
			moCmnInfo.spNm		= poParam.Result.strSpNm;
			moCmnInfo.statRcd	= poParam.Result.strStatRcd;
			moCmnInfo.statNm	= poParam.Result.strStatNm;
			
			var vsYear 	 = util.Control.getValue(app, "cbbYearImpNS");
			var vsSmt 	 = util.Control.getValue(app, "cbbSmtImpNS");
			var vsRegCls = util.Control.getValue(app, "cbbRegCls");
			
			if((!ValueUtil.isNull(vsYear)) && (!ValueUtil.isNull(vsSmt)) && (!ValueUtil.isNull(vsRegCls))){
				util.Header.clickSearch(app);
			}
		}
	};
	
	/**
	 * @desc 조회버튼 클릭 이벤트
	 * @member stdCrsCRegFeeMgt
	 * @param
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 21.
	 */
	moPage.onClick_BtnSearch = function() {
		if(!util.validate(app, ["grpSearch"])) return false;
		
		// 학년도 학기 기본값 셋팅
		moCmnInfo.schYearRcd = util.Control.getValue(app, "cbbYearImpNS");
		moCmnInfo.smtRcd = util.Control.getValue(app, "cbbSmtImpNS");
		moCmnInfo.stDt = ExtInstance.getValue("instance('impCommonN')/root/date/ST_DT");
		moCmnInfo.endDt = ExtInstance.getValue("instance('impCommonN')/root/date/END_DT");
		moCmnInfo.currentDt = util.DataMap.getValue(app, "dmDate", "CUT_DT");
		moCmnInfo.regClsRcd = util.DataMap.getValue(app, "dmReqKey", "strRegClsRcd");
		
		var poImpStudInfoCallbackFunc = function(pbImpStudInfoCallBack) {
				
			if(pbImpStudInfoCallBack) {
				ExtTreeView.findItemValue("trvMenuList",  msTrv.initVal, "VALUE", false);
				
				//subPage 권한
				this.checkOperSbp(msTrv.initVal, function(pbOperSbp) {
					if(pbOperSbp){
						//초기 서브페이지 호출
						ExtSubPage.setPage("htmlObjFrame", "xtm/crs/"+msTrv.initVal+".xtm", true);
					} 
				});
				
				//등록정보서비스팩토리콜	
				doSetRegInfo();
			}
		}
		
		//학번에 해당하는 학생정보를 가져온다.
		var vsStudId = util.DataMap.getValue(app, "dmReqKey", "strStudId");
		setImpStudInfo(vsStudId, moCmnInfo.endDt, null, poImpStudInfoCallbackFunc);
	};
	
	
	/**
	 * @desc subPage 권한을 체크한다.
	 * @member stdCrsCRegFeeMgt
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 21.
	 */	
	moPage.checkOperSbp = function(pbPgmId, poCallbackFunc) {
		
		util.DataMap.setValue(app, "dmReqKey", "strPgmId",pbPgmId);
		//strCommand: operSbp 
		util.Submit.send(app, "subOperSbp", function(pbSuccess){
			if(pbSuccess){
				
				var vsOperSbp =  util.DataMap.getValue(app, "dmResOnLoad", "strOperSbp");
				if(util.isFunc(poCallbackFunc)) poCallbackFunc(vsOperSbp); 
				
			}else{
				if(util.isFunc(poCallbackFunc)) poCallbackFunc(false); 
			}	
		});	
	};	
	
	/**
	 * @desc 등록정보 서비스팩토리 호출하여 등록사항에 셋팅
	 * @member stdCrsCRegFeeMgt
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 21.
	 */	
	function doSetRegInfo() {
		
		//strCommand: regInfo 
		util.Submit.send(app, "subRegInfo", function(pbSuccess){
			if(!pbSuccess){
				util.DataMap.setValue(app, "dmFrfCrsInfo", "strRegInfo", NLS.CRS.M060);
			}
			util.Control.redraw(app, "ipbRegInfo");
		});	
	};
	
	/**
	 * @desc 트리 항목 선택시 해당 서브페이지 호출
	 * @member stdCrsCRegFeeMgt
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 21.
	 */
	moPage.onSelectionChanged_TrvMenuList = function() {
		var vsPageVal = util.Tree.getSelectedValue(app, "trvMenuList");
		if(vsPageVal == null) return false;
		
		//if(msTrv.beforeVal == vsPageVal) return;
		
		// 변경내역 확인 & 페이지 이동
		doCheckSaveData(function(pbSuccess){
			if (pbSuccess) {
				var vsTrvValue = util.Tree.getSelectedValue(app, "trvMenuList");
				
				this.checkOperSbp(vsTrvValue, function(pbOperSbp){
					if(pbOperSbp){
						ExtSubPage.setPage("htmlObjFrame", "xtm/crs/"+vsTrvValue+".xtm", true);
					} else {
						util.Msg.alert("NLS-CMM-M019(this-getPageNm(vsPageVal") + "(" + vsPageVal + ")"));
						ExtTreeView.findItemValue("trvMenuList", msTrv.beforeVal, "VALUE", false);
					}
				});
				
			}else{
				ExtTreeView.findItemValue("trvMenuList", msTrv.beforeVal, "VALUE", false);
			}		
		});
		
	};
	
	/**
	 * @desc 트리 선택 이벤트 발생시 이전 페이지 값을 세팅
	 * @member stdCrsCRegFeeMgt
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 21.
	 */
	moPage.onDeselectionChanged_TrvMenuList = function() {
		// 이전 메뉴
		msTrv.beforeVal = util.Tree.getSelectedValue(app, "trvMenuList");
	};
	
	/**
	 * @desc 메뉴클릭시 서브페이지의 변경여부 확인/저장 로직
	 * @member stdCrsCRegFeeMgt
	 * @param poCallbackFunc 변경여부 확인 후 실행 될 콜백 함수
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 21.
	 */	
	function doCheckSaveData(poCallbackFunc){

		//** 서브페이지 함수에 접근하는지 확인 - 데이타 변경여부를 확인
		var voSbpFramePage = ExtSubPage.getSubPage("htmlObjFrame");
		
		if (voSbpFramePage != null && voSbpFramePage.callScript("doCheckDataChange", null)) {
			if(util.isFunc(poCallbackFunc)) poCallbackFunc(true);
		}else{
			//이전 서브페이지에 멈춰있음
			ExtTreeView.findItemValue("trvMenuList",  msTrv.beforeVal, "VALUE", false);
			if(util.isFunc(poCallbackFunc)) poCallbackFunc(false);
		}
	};
	
	/**
	 * @desc CD값에 대한 코드명을 가져온다.
	 * @member stdCrsCRegFeeMgt
	 * @param psTrvNodeVal 트리컨트롤에서 선택한 아이템 노드의 Value
	 * @return {String} 코드명 반환
	 * @author Aeyoung Lee 2016. 3. 21.
	 */ 
	moPage.getPageNm = function(psTrvNodeVal) {
		var vsPageNm = ExtInstance.getValue("/root/resOnLoad/trvMenuList/row", "CD_PRP1", "child::CD='" + psTrvNodeVal + "'");
		return vsPageNm;
	};
	
	/**
	 * @desc header에 메시지 출력(서브페이지에서 사용)
	 * @member stdCrsCRegFeeMgt
	 * @param psMsgCode 메시지 코드
	 * @param paMsg 메시지 변수 
	 * @author Aeyoung Lee 2016. 3. 21.
	 */ 
	function doSetMsg(psMsg, paMsg) {
		util.Msg.notify(app, "psMsg", paMsg);
	};
	
	return moPage;
};
