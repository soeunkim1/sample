﻿//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./stdCsrMstFrame.xtm"/>


var stdCsrMstFrame = function() {
	var moPage = new Page();
	//임포트용 데이터 통신 오브젝트
	var moPObject = new PObject();

	/**
	 * 처음 펼쳐질 트리의 메뉴
	 */	
	var msInitMenu = "";
	
	/**
	 * 이후 메뉴명
	 */	
	var msAftPageVal = null;
	
	/**
	 * 이전 메뉴명
	 */	
	var msBefPageVal = null;
	
	/**
	 * 현재 메뉴명
	 */
	var msPageVal = null;
	
	/**
	 * onSelectionChanged시 msBefPageVal값 변경되므로 변경되기전의 값을 유지하기 위함
	 */	
	var msOrgnPageVal = null;
	
	/**
	 * 조회된 상태를 표시
	 */	
	var mbChgFlag = false;
	
	/**
	* 조회버튼으로 조회되었는지 표시
	 */	
	var mbBtnSearchFlag = false;

	/**
	* 조회버튼으로 조회되었는지 표시
	 */	
	var mbDtlGrpEnableFlag = false;
	
	/**
	 * 검색조건 컨트롤 아이디 배열
	 * @type Array
	 * @author Choi In Seong 2016. 1. 13
	 */
	moPage.maSearchMods = ["ipbSchStudId", "btnPopSearch", "btnSearch", "btnNew", "dipKeyDate"];
	
	/**
	 * 학생의 기본정보를 담아놓는 오브젝트
	 * @author Choi In Seong 2016. 1. 13
	 */	
	moPage.moParentObj = {
		studId 					: "", 					//학적사항관리 창의 조회된 학생아이디값
		headerStud 			: "", 					//학적사항관리 창의 헤더정보(학생)
		headerDept 			: "", 					//헤더의 소속정보
		headerCourse 		: "", 					//헤더의 과정정보
		headerRemark 		: "", 					//헤더의 기타정보
		USE_TAB_NM 		: "CSR_SHREG", //사용테이블(주소에서씀)
		studNo 					: "", 					//학적사항관리 창의 조회된 학번값
		keyDate 				: "", 					//기준일자
		subPageId				: "",					//서브페이지 아이
		chkUserId              : ""
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
	 *  1. controlId 			: 최초 이벤트의 버튼이나 그리드 id	(필수)
	 *  2. iStudNo 			: 검색조건 학번								(선택) (값이 존재할 경우 4자리 이상)
	 *  3. iStudId 				: 검색조건 학번오브젝트					(선택)
	 *  4. iStudNm 			: 이름        									(선택) (값이 존재할 경우 2자리 이상)
	 *  5. iKeyDate 			: 기준일 										(필수)
	 *  6. iObjDivRcd 		: 객체구분코드 								(선택)
	 *  7. iObjCd 				: 부서코드										(선택)
	 *  8. iObjNm 			: 부서명											(선택) 
	 *  10. iStatRcd			: 학적상태										(선택) 
	 *  11. iStudDivRcd		: 학생구분										(선택) 
	 *  12. oStudId			: 학번오브젝트
	 *  13. oStudNo 			: 학번
	 *  14. oStudNm 		: 이름
	 *  15. oStatNm 			: 학적상태명
	 *  16. oStatRcd 			: 학적상태코드
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
	 *  27. oBirthday			: 생년월일
	 *  28. oGenderRcd		: 성별코드
	 *  29. oGenderNm		: 성별명
	 *  30. func 				: 팝업에서 선택한 값을 받은 후 추가 로직이 필요한 경우 함수 작성
	 */
	moPObject.moIdsForStdCsrPStSearch = [
	{
		controlId 					: "btnPopSearch",
		iStudNo 					: "ipbSchStudId",	
		iStudId 						: "",
		iStudNm 					: "",
		iKeyDate 					: "dipKeyDate", 
		iObjDivRcd 				: "",
		iObjCd 						: "",
		iObjNm 					: "",
		iStatRcd 					:"",
		iStudDivRcd				: "",
		oStudId 					: "/root/reqKey/strStudId",
		oStudNo 					: "ipbSchStudId",
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
			
			//팝업끝난후  후처리가 필요할때 입력 
			var vsStudId = util.DataMap.getValue(app, "dmReqKey", "strStudId");
			if(!ValueUtil.isNull(vsStudId)) {
				util.Control.redraw(app, ["ipbSchStudId"]);
				util.Control.setEnable(app, true,  ["grp_impStudInfo"]);
				doSearch();
			}else{
				util.Control.setEnable(app, false, ["grp_impStudInfo"]);
			}
		}
	}
	];
	
	/**
	 * @desc 화면 초기화 이벤트 실행
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 1. 13.
	 */	
	moPage.onModelConstructDone_StdCsrMstFrame = function() {
		
		doOnLoad();
		//impStudInf02(학생정보 임포트) 초기화
		initSize();
		
	};
	
	/**
	 * @desc 공통코드 호출 및 화면 초기화
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 1. 13.
	 */	
	function doOnLoad() {
		
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", "grp_impStudInfo");
		
		//학적사항관리의 소메뉴(configration code table, CT701 권한에 따른 항목 출력)	
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				
				util.Control.redraw(app, ["trvMenuList"]);
				util.Control.redraw(app, moPage.maSearchMods);
				
				msInitMenu = moPage.getInitMenuCD("CD_PRP4");
				
				var psMenuAuthDivRcd = moPageInfo.menuAuthDivRcd;
				if(psMenuAuthDivRcd != "CC00701"){
					if(psMenuAuthDivRcd == "CC00702"){
						util.Control.setEnable(app, false, ["btnNew"]);
					}else if(psMenuAuthDivRcd == "CC00704"){
						util.Control.setEnable(app, false, ["btnNew"]);
					}
				}
			}
			util.Control.setFocus(app, "ipbSchStudId");						
		});
		
	}
	
	/**
	 * @desc 입력된 학번으로 조회한다.
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 1. 13.
	 */	
	function doSearch() {
		
		// 조회시 트리 초기화
		util.Tree.expandAllItems(app, "trvMenuList", false);
		
		//학번&기준일자 입력확인
		if(!util.validate(app, "ipbSchStudId", "dipKeyDate")) return false;
		
		//(IMPORT)학번전달
		var vsStudId  = util.DataMap.getValue(app, "dmReqKey", "strStudId");
		var vsKeyDate = util.Control.getValue(app, "dipKeyDate");
		
		util.Control.setEnable(app, true,"trvMenuList");
		
		var voImpStudInfoCallbackFunc = function(pbImpStudInfoCallBack) {
			if (pbImpStudInfoCallBack) {
				var psMenuAuthDivRcd = moPageInfo.menuAuthDivRcd;
				// 이미지 업로드 버튼 보이기 여부 설정
				if(psMenuAuthDivRcd != "CC00701"){
					setVisibleUploadStudImgBtn(false);
				}else{
					setVisibleUploadStudImgBtn(true);
				}
				
				
				// 조회된 상태를 표시
				mbChgFlag = true;
				
				// 메뉴에서 기본정보를 선택/펼쳐서 보이게 한다.
				var vsSelectMenu = "";
				vsSelectMenu = msInitMenu;
				
				ExtTreeView.findItemValue("trvMenuList",  vsSelectMenu, "VALUE", false);
				
				moPage.onSelectionChanged_TrvMenuList(true);
				
				/* 2013. 9. 13 비동기화 처리하면서 import에서 값을 셋팅하도록 변경함 */
				//PARENT 추출 정보 공유
				var voParam = moPage.moParentObj;
				voParam.studId     				= util.DataMap.getValue(app, "dmReqKey", "strStudId");
				voParam.studNo     			= util.Control.getValue(app, "ipbStudId_Imp"); 
				voParam.headerStud 			= util.Control.getValue(app, "ipbMainStud_Imp");
				voParam.headerCourse 		= util.Control.getValue(app, "ipbMainCourse_Imp");
				voParam.headerDept   		= util.Control.getValue(app, "ipbMainDept_Imp");
				voParam.headerRemark 		= util.Control.getValue(app, "ipbMainRemark_Imp");
				voParam.keyDate      			= util.DataMap.getValue(app, "dmResOnLoad", "currentDate");
				
			} 
		};
		// 학생정보imp 조회
		setImpStudInfo(vsStudId, vsKeyDate, null, voImpStudInfoCallbackFunc);
		
	};
	
	/**
	 * @desc 학생정보 임포트 초기화
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 1. 13.
	 */
	moPage.onLoadImportDone_ImpStudInfo = function() {
		impStudInfo();
	};
	
	/**
	 * @desc 트리 항목 선택시 해당 서브페이지 호출
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 1. 13.
	 */
	moPage.onSelectionChanged_TrvMenuList = function(vbOnLoadFlag) {

		var vsPageVal = util.Tree.getSelectedValue(app, "trvMenuList");
		
		if(vsPageVal == null) return false;
		
		msAftPageVal =  vsPageVal;
		
		//선택안된 트리노드를 접기위한 메소드 사용시 보내줄 param값 세팅.
		if (msBefPageVal == null) {
			msOrgnPageVal = msInitMenu;
			msBefPageVal = msInitMenu;
		} else {
			msOrgnPageVal = msBefPageVal;	
		}
		
		msPageVal = vsPageVal;
		
		var vbChkStId = moPage.doCheckStudId();
		
		if (!vbChkStId) {
			
			doBack();
			
			return false;
			
		} else {
			
			//학번은 입력돼 있으나 조회하지 않았다면 먼저 조회하라는 메세지 띄움
			if (!mbChgFlag) {
				
				util.Msg.alert("NLS-CSR-M001");
				
				doBack();
				
				return false;
				
			}
		
			// 변경내역 확인 & 페이지 이동
			doCheckSaveData(function(pbSuccess){
				if (pbSuccess) {
					
					var vsTrvValue = util.Tree.getSelectedValue(app, "trvMenuList");
					
					//노드에 해당되는 프로그램ID
					var vsXtmID = moPage.getSubPageID(vsTrvValue);
					var vsCdNm = moPage.getCodeNm(vsTrvValue);
				
					// 파일이름이 있으면 해당 page을 subPage로 보여줌 ,상위코드클릭은  Node만 펼쳐줌   
					if (vsXtmID) {
						
						moPage.getSbpPerssion(vsXtmID, vsCdNm, vsTrvValue);

					}
					
					ExtTreeView.doRebuildSelectedItem("trvMenuList");
					
					if(!ValueUtil.isNull(ValueUtil.fixNull(ExtTreeView.getItem("trvMenuList", vsTrvValue, "PVALUE")))){
						moPage.closeTrvNode("trvMenuList", msOrgnPageVal, vsTrvValue);
					}

				}else{
					doBack();
					
				}		
			}, vbOnLoadFlag);
		}
		
	};
	var mbChk = true;
	/**
	 * @desc 트리 선택 이벤트 발생시 이전 페이지 값을 세팅
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 1. 13.
	 */
	moPage.onDeselectionChanged_TrvMenuList = function() {
		// 이벤트 발생시 이전 페이지 값을 세팅....
		// 이전 메뉴
		msBefPageVal = util.Tree.getSelectedValue(app, "trvMenuList");
		return;
	};
	
	/**
	 * @desc 트리 선택시 상위 노드가 다르면 이전 상위 노드의 하위노드들을 전부 닫는다.
	 * @param psTrvNm 트리 아이디
	 * @param psBefPageVal 이전에 선택된 값
	 * @param psSelectedVal 현재 선택된 값
	 * @return void
	 * @author Choi In Seong 2016. 1. 13.
	 */
	moPage.closeTrvNode = function(psTrvNm, psBefPageVal, psSelectedVal){
		if(!ValueUtil.isNull(psSelectedVal)){		
			if(psBefPageVal != psSelectedVal){
				//상위 노드값 반환
				//상위 노드가 없으면 선택된 값이 상위노드
				var vsBefParentNodeCd = ValueUtil.fixNull(ExtTreeView.getItem(psTrvNm, psBefPageVal, "PVALUE")) == "" ? psBefPageVal : ExtTreeView.getItem(psTrvNm, psBefPageVal, "PVALUE") ;
				var vsSelParentNodeCd = ValueUtil.fixNull(ExtTreeView.getItem(psTrvNm, psSelectedVal, "PVALUE")) == "" ? psSelectedVal : ExtTreeView.getItem(psTrvNm, psSelectedVal, "PVALUE") ;
				
				if(vsBefParentNodeCd != vsSelParentNodeCd){
					//상위노드가 같지 않으면 현재 선택된 노드를 제외하고 닫기
					var voAftNode = ExtTreeView.getFindItem(psTrvNm, vsSelParentNodeCd);
					util.Tree.expandAllItems(app, psTrvNm, false);
					ValueUtil.fixNull(ExtTreeView.getItem(psTrvNm, psSelectedVal, "PVALUE")) == "" ? 
					util.Tree.expandAllItems(app, psTrvNm, true, voAftNode) : ExtTreeView.setExpandItem(psTrvNm, true, voAftNode);
				}
			}
		}
	}
	
	/**
	 * @desc 학번 유효성 체크한다.
	 * @param 
	 * @return {boolean} 학번 유효성 결과 반환
	 * @author Choi In Seong 2016. 1. 13
	 */ 
	function doCheckStudId() {
		
		var vbValue = util.validate(app, ["ipbSchStudId"]);
		
		if (!vbValue) util.Control.setFocus(app, "ipbSchStudId");
		
		return vbValue;
		
	};
	
	/**
	 * @desc CD값에 대한 코드명을 가져온다.
	 * @param psTrvNodeVal 트리컨트롤에서 선택한 아이템 노드의 Value
	 * @return {String} 코드명 반환
	 * @author Choi In Seong 2016. 1. 13
	 */ 
	moPage.getCodeNm = function(psTrvNodeVal) {

		var vsXtmValue = ExtInstance.getValue("/root/resOnLoad/trvMenuList/row", "CD_NM", "child::CD='" + psTrvNodeVal + "'");

		return vsXtmValue;
		
	};
	
	/**
	 * @desc CD값에 대한 프로그램 ID를 가져온다.
	 * @param psTrvNodeVal 트리컨트롤에서 선택한 아이템 노드의 Value
	 * @return {String} 용도코드2에 해당하는 값 반환
	 * @author Choi In Seong 2016. 1. 13
	 */ 
	moPage.getSubPageID = function(psTrvNodeVal) {
		
		var vsXtmValue = ExtInstance.getValue("/root/resOnLoad/trvMenuList/row", "CD_PRP2", "child::CD='" + psTrvNodeVal + "'");
		
		return vsXtmValue;
		
	};
	
	/**
	 * @desc 호출할 서브페이지의 호출페이지값을 가져온다.
	 * @param psTrvNodeVal 트리컨트롤에서 선택한 아이템 노드의 Value
	 * @return {String} 용도코드2에 해당하는 값 반환
	 * @author Choi In Seong 2016. 1. 13
	 */  
	moPage.getSubPageName = function(psTrvNodeVal) {
		
		var vsXtmValue = ExtInstance.getValue("/root/resOnLoad/trvMenuList/row", "CD_PRP6", "child::CD='" + psTrvNodeVal + "'");
		
		return vsXtmValue;
		
	};
	
	/**
	 * @desc 공통코드 호출 및 화면 초기화
	 * @param {String} psCdPrpVal 용도코드 명
	 * @return {String} vsInitMenu 용도코드가 Y 인 코드 반환
	 * @author Choi In Seong 2016. 1. 13.
	 */	
	moPage.getInitMenuCD = function(psCdPrpVal) {
		
		var vsInitMenu = ExtInstance.getValue("/root/resOnLoad/trvMenuList/row", "CD", "child::"+psCdPrpVal+"='Y'");
		
		return vsInitMenu;
		
	};
	
	/**
	 * @desc 이전 메뉴로 돌아가기
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 1. 13
	 */	
	function doBack() {
		
		msAftPageVal = util.Tree.getSelectedValue(app, "trvMenuList");
		
		if (msAftPageVal == msBefPageVal) {
			ExtTreeView.findItemValue("trvMenuList", msAftPageVal, "VALUE", false);
		} else {
			ExtTreeView.findItemValue("trvMenuList",  msBefPageVal, "VALUE", false);
		}
		
	};
	
	/**
	 * @desc 메뉴클릭시 서브페이지의 변경여부 확인/저장 로직
	 * @param poCallbackFunc 변경여부 확인 후 실행 될 콜백 함수
	 * @param vbOnLoadFlag 화면이 제대로 OnLoad 되었는지 여부
	 * @return void
	 * @author Choi In Seong 2016. 1. 13
	 */	
	function doCheckSaveData(poCallbackFunc, pbOnLoadFlag){

		//노드에 해당되는 프로그램ID
		var vsXrfID = moPage.getSubPageID(msOrgnPageVal);
		
		// 파일이름이 있으면 해당 page을 subPage로 보여줌 ,상위코드클릭은  Node만 펼쳐줌   
		if (ValueUtil.isNull(vsXrfID) || pbOnLoadFlag) {
			
			if(util.isFunc(poCallbackFunc)) poCallbackFunc(true);
			return false;
		}

		//** 서브페이지 함수에 접근하는지 확인
		//데이타 변경여부를 확인하고 저장여부 컨펌: 저장실패시 상태변경 불가
		var voSbpFramePage = ExtSubPage.getSubPage("htmlObjFrame", vsXrfID);
		
		if (voSbpFramePage != null && voSbpFramePage.callScript("doCheckDataChange", null)) {
			// 변경이 있어도 선택한 서브페이지로 이동
			if(util.isFunc(poCallbackFunc)) poCallbackFunc(true);
		}else{
			//이전 서브페이지에 멈춰있음
			ExtTreeView.findItemValue("trvMenuList",  msBefPageVal, "VALUE", false);
			return false;
		}
		
	}
	
	/**
	 * 호출하려는 서브페이지에 권한이 있는지 조회한다
	 * @param {String} psNodeId 서브페이지 id
	 * @param {String} psNodeNm 선택한 메뉴명
	 * @param {String} psTrvValue 
	 * @type Boolean 권한여부
	 * @return
	 * @author Choi In Seong 2016. 01. 18
	 */	
	moPage.getSbpPerssion = function(psNodeId, psNodeNm, psTrvValue) {
				
		util.DataMap.setValue(app, "dmReqKey", "checkPgmId", psNodeId);
		util.DataMap.setValue(app, "dmReqKey", "checkUserId", moUserInfo.userId); // 서브페이지 권한 체크시 userId 사용
		util.DataMap.setValue(app, "dmReqKey", "checkMenuNm", psNodeNm);
		moPage.moParentObj.subPageId = psNodeId;

		//strCommand: checkPermission 
		util.Submit.send(app, "subCheckPerssion", function(pbSbpPerssion){
			
				if (pbSbpPerssion) {
				
					//서브페이지 명 반환
					var vsXtmValue = moPage.getSubPageName(psTrvValue);
					
					ExtSubPage.setPage("htmlObjFrame", vsXtmValue, true);
					
				} else {
					doBack();
				}
			
			}
		);
	};

	/**
	 * @desc 화면을 모든 값을 초기화 한다.
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 1. 13
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		
		doHeaderOnLoad();
		
	};
	
	/**
	 * @desc 학생검색 팝업을 호출한다.
	 * @param sender 버튼의 이벤트 객체
	 * @return void
	 * @author Choi In Seong 2016. 1. 13
	 */
	moPage.onClick_BtnPopSearch = function(sender) {
		// 학생정보 초기화
		clearImpStudInfo02();
		doOnClickStdCsrPStSearch(sender);
		
	};
	
	/**
	 * @desc 학생검색 팝업을 호출한다.
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 1. 13
	 */
	moPage.onClick_BtnSearch = function() {
		
		//노드에 해당되는 프로그램ID
		var vsXrfID = moPage.getSubPageID(msOrgnPageVal);
		//** 서브페이지 함수에 접근하는지 확인
		//데이타 변경여부를 확인하고 저장여부 컨펌: 저장실패시 상태변경 불가
		var voSbpFramePage = ExtSubPage.getSubPage("htmlObjFrame", vsXrfID);
		
		if(voSbpFramePage != null){			
			if(!voSbpFramePage.callScript("doCheckDataChange", null)) {
				return false;
			}	
		}
		
		if(!util.validate(app, ["ipbSchStudId", "dipKeyDate"])){
			return false;
		}
		// 학생정보 초기화
		clearImpStudInfo02();
		mbBtnSearchFlag = true;
		ExtModel.dispatch("ipbSchStudId", "xforms-value-changed");
		
	};
	
	/**
	 * @desc 신규 학번을 입력하는 그룹창을 보여준다.
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 1. 13
	 */
	moPage.onClick_BtnNew = function() {

		//노드에 해당되는 프로그램ID
		var vsXrfID = moPage.getSubPageID(msOrgnPageVal);
		//** 서브페이지 함수에 접근하는지 확인
		//데이타 변경여부를 확인하고 저장여부 컨펌: 저장실패시 상태변경 불가
		var voSbpFramePage = ExtSubPage.getSubPage("htmlObjFrame", vsXrfID);
		
		if(voSbpFramePage != null){	
			if(!voSbpFramePage.callScript("doCheckDataChange", null)) {
				return false;
			}				
		}
		
		mbDtlGrpEnableFlag = ExtControl.isEnable("grp_impStudInfo");
		// reqKey 아래 인스턴스를 초기화 한다.
		moPage.initReqProcInstance();
		
		moPage.newStudRegiDialogBasicSetting();	
		// 라디오 박스에 보여줄 아이템수를 지정
		var vnSize = util.DataSet.getRowCount(app, "dsStudNoDefRcdList");
		
		ExtControl.setAttr("rdbDlgStudNoDefRcdList","ViewItem",vnSize);
		
		util.Control.redraw(app, ["rdbDlgStudNoDefRcdList"]);
		
		util.Control.setVisible(app, true, "grpDataNew");
		
		// 메인화면 관련 그룹 비활성화처리
		util.Control.setEnable(app, false,  ["grpSearch", "grp_impStudInfo"]);
		util.Control.setEnable(app, true, ["ipbDlgSearchStudNo"]);
	}
	
	/**
	 * @desc 학생 검색
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 1. 13
	 */
	moPage.onClick_BtnDlgCancel = function() {
		// 조회조건 그룹 활성화 조회내역은 신규를 누르기 전 상태로 복귀
		doCloseGrpNew(mbDtlGrpEnableFlag);
		
	}
	
	/**
	 * @desc 학생 오브젝트ID 생성
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 1. 13
	 */
	moPage.onClick_BtnDlgOk = function(sender, poCallBackFunc) {
		
		// 신규 학번생성 다이얼로그 유효성 체크
		if (!moPage.checkDialogValidation()) {
			if(util.isFunc(poCallBackFunc)) poCallBackFunc(false);
			return false;
		}
		//strCommand: genStId 
		util.Submit.send(app, "subGenStId", function(pbSuccess){
			if (pbSuccess) {
				//서브미션 수행 후 리턴받은 신규 학번
				var strNewStudId = util.DataMap.getValue(app, "dmResNew", "strStudId");
				var strNewStudNo = util.DataMap.getValue(app, "dmResNew", "strStudNo");
				
				// 신규 학번이 제대로 생성된 경우			
				// 기본정보 페이지 call
				var vsNewInitMenu  = moPage.getInitMenuCD("CD_PRP4");
				var vsInitPageName = moPage.getSubPageName(vsNewInitMenu);
				
				ExtSubPage.setPage("htmlObjFrame", vsInitPageName, true);
				
				util.DataMap.setValue(app, "dmReqKey", "strStudId", strNewStudId);
				util.DataMap.setValue(app, "dmReqKey", "strStudNo", strNewStudId);
				
				// 학번 입력란에 신규 생성한 학번 set 조회 버튼 disable
				util.Control.setValue(app, "ipbSchStudId", strNewStudNo);
				
				mbChgFlag = true;
				
				ExtTreeView.findItemValue("trvMenuList",  vsNewInitMenu, "VALUE", false);
				
				moPage.moParentObj.studId = strNewStudId; // 학생 아이디
				moPage.moParentObj.studNo = strNewStudNo // 학번
				moPage.moParentObj.keyDate	= util.DataMap.getValue(app, "dmResOnLoad", "currentDate");
				util.Msg.notify(app, "NLS.INF.M012", [strNewStudNo]);
				// 학생정보 초기화
				clearImpStudInfo02();
				// 학생신규시 다른 서브페이지를 선택하지 못하게 막는다.
				util.Control.setEnable(app, false,"trvMenuList");
				// 조회조건 그룹과 조회내역 그룹 활성화
				doCloseGrpNew(true);
			}
			if(util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
		});
		
	}
	
	/**
	 * @desc 학번정의 데이터 변경시 컨트롤 제어
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 1. 13
	 */
	moPage.onValueChanged_RdbDlgStudNoDefRcdList = function() {

		// 라디오버튼의 선택된 값을 가져온다.
			var strStudNoType = util.DataMap.getValue(app, "dmReqKey", "strStudNoType");
			
			// reqKey 아래 인스턴스를 초기화 한다.
			moPage.initReqProcInstance();

			/**
			 * 학번직접입력여부에 체크:Y 되어 있는 코드만 학번입력컨트롤을 활성화 시킨다.
			 */
			var vsCdPrp1 = util.DataSet.getValue(app, "dsStudNoDefRcdList", "CD_PRP1" , "CD='" + strStudNoType + "'");

			if("Y" == vsCdPrp1){
				util.Control.setEnable(app, true, ["ipbDlgSearchStudNo"]); // 학번inputBox
				util.Control.setFocus(app, "ipbDlgSearchStudNo"); // 학번inputBox 포커스 지정
				util.Control.setValue(app, "lblSearchStudNo", util.Control.getValue(app, "/root/resOnLoad/studNoDefRcdList/row", "CD_PRP2" , "CD='" + strStudNoType + "'"));
			}else{
				util.Control.setEnable(app, false, ["ipbDlgSearchStudNo"]); // 학번inputBox 비활성
			}
			
	};
	
	/**
	 * @desc reqKey 밑에 있는 인스턴스를 초기화 한다.
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 1. 13
	 */
	moPage.initReqProcInstance = function() {
		
		util.DataMap.setValue(app, "dmReqKey", "strSearchStudNo", "");
		util.DataMap.setValue(app, "dmReqKey", "strSearchSaNm", "");
		util.DataMap.setValue(app, "dmReqKey", "strSearchSaCd", "");
		util.DataMap.setValue(app, "dmReqKey", "strObjDivRcd", "");
		util.Control.setValue(app, "ipbDlgSearchStudNo", ""); // 다이얼로그_학번인풋박스
		
	}
	
	/**
	 * @desc 신규 학번생성 다이얼로그 유효성 체크
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 1. 13
	 */
	moPage.checkDialogValidation = function() {
		
		var vsStudNoType		= util.DataMap.getValue(app, "dmReqKey", "strStudNoType");
		var vsSearchStudNo	= util.DataMap.getValue(app, "dmReqKey", "strSearchStudNo");
		var vsSearchSaNm		= util.DataMap.getValue(app, "dmReqKey", "strSearchSaNm");
		var vsSearchSaCd  	= util.DataMap.getValue(app, "dmReqKey", "strSearchSaCd");
		var vsObjDivRcd   		= util.DataMap.getValue(app, "dmReqKey", "strObjDivRcd");
		
		// 학번입력
		if (vsStudNoType == "CT70201") {

			// 학번 inputBox에 값이 없을 경우 경고 메세지를 띄운다.
			if(ValueUtil.isNull(vsSearchStudNo)) {
				util.Msg.alert("NLS-WRN-M003", [NLS.LBL.L033]);
				util.Control.setFocus(app, "ipbSearchStudNo"); // 학번inputBox 포커스 지정
				return false;
			}
		}
		
		return true;
		
	};
	
	/**
	 * @desc 학번 신규입력 다이얼로그가 생성되기전 필요한 값들을 세팅한다.
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 1. 13
	 */
	moPage.newStudRegiDialogBasicSetting = function() {
		
		// 학번입력 라디오버튼이 초기 선택되도록 하기위해 인스턴스에 값을 넣는다.
		util.DataMap.setValue(app, "dmReqKey", "strStudNoType", "CT70201");
		
		/**
		 * 학번 검색조건에 학번 입력 후 신규버튼 클릭시 입력한 값을 다이얼로그에 가져간다.
		 */		
		var strSchStudId = util.Control.getValue(app, "ipbSchStudId");
		
		// 학번 검색조건 값이 빈값이 아닐 경우만 다이얼로그에 가져간다.
		if(!ValueUtil.isNull(strSchStudId)) {
			util.DataMap.setValue(app, "dmReqKey", "strSearchStudNo", strSchStudId);
		}
		
	};
	
	/**
	 * @desc 학번 신규입력 다이얼로그를 닫는다.
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 1. 13
	 */
	function doCloseGrpNew(pbEnable){
		
		util.Control.setVisible(app, false, "grpDataNew");
		
		util.Control.setEnable(app, true, ["grpSearch"]);
		
		util.Control.setEnable(app, pbEnable, ["grp_impStudInfo"]);
		
	};
	
	/**
	 * @desc 저장 후 임포트 재조회 & 서브페이지 재조회
	 * @param stdCsrMstFrame 콜백함수
	 * @return void
	 * @author Choi In Seong 2016. 1. 20
	 */
	function doSaveAfter(poCallBackSaveAfter) {
		
		//학번&기준일자 입력확인
		var vsStudId  = util.DataMap.getValue(app, "dmReqKey", "strStudId");
		var vsKeyDate = util.Control.getValue(app, "dipKeyDate");
		
		util.Control.setEnable(app, true,"trvMenuList");
		
		var voImpStudInfoCallbackFunc = function(pbImpStudInfoCallBack) {
			if (pbImpStudInfoCallBack) {
				
				//학생 import 재조회 후 사용, 학생의 기본정보를 재입력함.
				var voParam = moPage.moParentObj;
				voParam.studId 				= util.DataMap.getValue(app, "dmReqKey", "strStudId");
				voParam.studNo     		= util.Control.getValue(app, "ipbStudId_Imp");
				voParam.headerStud   	= util.Control.getValue(app, "ipbMainStud_Imp");
				voParam.headerCourse 	= util.Control.getValue(app, "ipbMainCourse_Imp");
				voParam.headerDept   	= util.Control.getValue(app, "ipbMainDept_Imp");
				voParam.headerRemark 	= util.Control.getValue(app, "ipbMainRemark_Imp");
				voParam.keyDate      		= util.DataMap.getValue(app, "dmResOnLoad", "currentDate");
		
				// 파일이름이 있으면 해당 page을 subPage로 보여줌 ,상위코드클릭은  Node만 펼쳐줌   
				var vsXrfID = moPage.getSubPageID(util.Tree.getSelectedValue(app, "trvMenuList"));
				if (!vsXrfID ) return;
				
				voParam.subPageId 		= vsXrfID;
				
				// 서브페이지 목록 재조회
				var voSbpFramePage = ExtSubPage.getSubPage("htmlObjFrame", vsXrfID);
				if (voSbpFramePage != null) {
					voSbpFramePage.callScript("doList", poCallBackSaveAfter);
				}
			}
		};
		
		setImpStudInfo(vsStudId, vsKeyDate, null, voImpStudInfoCallbackFunc);
		
	};
	
	/**
	 * @desc 헤더 메시지 설정
	 * @param vsMsg 헤더 메시지
	 * @return void
	 * @author Choi In Seong 2016. 1. 20
	 */
	function doSetMsg(vsMsg){
		
		util.Msg.notify(app, "vsMsg");
		
	}
		
	/**
	 * @desc 학생 검색
	 * @param sender 인풋박스 이벤트 객체
	 * @return void
	 * @author Choi In Seong 2016. 1. 13
	 */
	moPage.onKeyDown_IpbSchStudId = function(strKeyType, strKeyStatus, sender) {
		if(e.keyCode == cpr.events.KeyCode.ENTER){
			doOnChangeStdCsrPStSearch(sender);
		}
	};
	
	/**
	 * @desc 학생 검색
	 * @param sender 인풋박스 이벤트 객체
	 * @return void
	 * @author Choi In Seong 2016. 1. 13
	 */
	moPage.onValueChanged_IpbSchStudId = function(sender) {
		if(mbBtnSearchFlag){
			mbBtnSearchFlag = false;
			doOnChangeStdCsrPStSearch(sender);
		}
	};
	
	/**
	 * @desc 트리 노드 더블클릭 시 이벤트
	 *            다른 상위 트리 노드 전부 닫기
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 1. 13
	 */
	moPage.onDoubleClick_TrvMenuList = function() {
		//상위노드만 사용
		var vsTrvValue = util.Tree.getSelectedValue(app, "trvMenuList");
		
		if(ValueUtil.fixNull(ExtTreeView.getItem("trvMenuList", vsTrvValue, "PVALUE")) == "" ){
			var voAftNode = ExtTreeView.getFindItem("trvMenuList", vsTrvValue);
			var vbNodeOpenChk = ExtTreeView.getExpanded("trvMenuList", voAftNode);
			if(!ValueUtil.isNull(vsTrvValue)){
				util.Tree.expandAllItems(app, "trvMenuList", false);
				//선택된 트리노드가 열려 있는지 체크 후 열려 있으면 닫고 닫혀 있으면 연다.
				if(!vbNodeOpenChk){
					ExtTreeView.setExpandItem("trvMenuList", false, voAftNode);
				} else{
					ExtTreeView.setExpandItem("trvMenuList", true, voAftNode);
				}
			}
		}
	};
	
	return moPage;
};