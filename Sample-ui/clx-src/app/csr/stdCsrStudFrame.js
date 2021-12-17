//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./stdCsrStudFrame.xtm"/>


var stdCsrStudFrame = function() {
	var moPage = new Page();
	//임포트용 데이터 통신 오브젝트
	var moPObject = new PObject();

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
		subPageId				: ""					//서브페이지 아이
	};
	
	// 이전 선택된 메뉴
	moPage.msTrvNodeVal = {
		before : null
	};
	
		
	moPage.onLoadImportDone_ImpStudInfo = function() {
		impStudInfo();
	};
	
	/**
	 * @desc 화면을 모든 값을 초기화 한다.
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 2. 18
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		doHeaderOnLoad();
	};
	
	/**
	 * @desc 헤더 메시지 설정
	 * @param vsMsg 헤더 메시지
	 * @return void
	 * @author Choi In Seong 2016. 2. 18
	 */
	function doSetMsg(vsMsg){
		util.Msg.notify(app, "vsMsg");
	}
		
	/**
	 * @desc 화면 초기화 이벤트 실행
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 2. 18.
	 */	
	moPage.onModelConstructDone_StdCsrMstFrame = function() {
		
		doOnLoad();
		//impStudInf02(학생정보 임포트) 초기화
		initSize();
		
	};
	function doOnLoad() {
		if("CC00501" == moUserInfo.userDivRcd){
			// 개인권한 체크
			util.DataMap.setValue(app, "dmReqKey", "strAuthChkStudId", moUserInfo.id);
			//strCommand: onLoad 
			util.Submit.send(app, "subOnLoad", function(pbSuccess){
					if (pbSuccess) {
						util.Control.redraw(app, ["trvMenuList"]);
						doImpStudInfo();
					}
				}
			);
		} else {
			util.Msg.alert("NLS-CSR-M116");
			util.coverPage(app);
			return;
		}
		
	};
	
	/**
	 * @desc 학생용 화면의 경우 사진업로드를 제한한다.
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 2. 18
	 */
	function doImpStudInfo(){
		// 조회시 트리 초기화
		util.Tree.expandAllItems(app, "trvMenuList", false);
		
		var vsStudId = util.DataMap.getValue(app, "dmReqKey", "strStudId");	// 학생오브젝트ID

		var voImpStudInfoCallbackFunc = function(pbImpStudInfoCallBack){
				
				if(pbImpStudInfoCallBack){

					//초기 load될  subPage파일 가져오기 
					var vsInitMenuCd = moPage.doGetInitMenuCD();
					moPage.msTrvNodeVal.before = vsInitMenuCd;
					
					ExtTreeView.findItemValue("trvMenuList",  vsInitMenuCd, "VALUE", false);
					moPage.onSelectionChanged_TrvMenuList(true);
					
					//PARENT 추출 정보 공유
					var voParam = moPage.moParentObj;
					voParam.studId     				= util.DataMap.getValue(app, "dmReqKey", "strStudId");
					voParam.studNo     			= util.Control.getValue(app, "ipbStudId_Imp"); 
					voParam.headerStud 			= util.Control.getValue(app, "ipbMainStud_Imp");
					voParam.headerCourse 		= util.Control.getValue(app, "ipbMainCourse_Imp");
					voParam.headerDept   		= util.Control.getValue(app, "ipbMainDept_Imp");
					voParam.headerRemark 		= util.Control.getValue(app, "ipbMainRemark_Imp");
					
					// 학생기본정보에서 사진업로드를 제한한다.
					setVisibleUploadStudImgBtn(false);
			}
		
		};
		// 학생정보imp 조회
		setImpStudInfo(vsStudId, null, null, voImpStudInfoCallbackFunc);
	}
	
	/**
	 * @desc 트리 메뉴 선택시 서브페이지 호출
	 * @param vbOnLoadFlag 온로드 완료 여부
	 * @return void
	 * @author Choi In Seong 2016. 2. 18
	 */
	moPage.onSelectionChanged_TrvMenuList = function(vbOnLoadFlag) {
		
		var vsPageVal = util.Tree.getSelectedValue(app, "trvMenuList");
		
		//노드에 해당되는 XRF파일 GET		
		var vsXtmValue = moPage.doGetSubPageName(vsPageVal);
		
		var vsXrfID = moPage.getSubPageID(vsPageVal);
		var voSbpFramePage = ExtSubPage.getSubPage("htmlObjFrame", vsXrfID, true);
		if(voSbpFramePage == null){
			if (!ValueUtil.isNull(vsXtmValue)){
				ExtSubPage.setPage("htmlObjFrame", vsXtmValue, true);
				return;
			}
		}
		
		// 변경내역 확인 & 페이지 이동
		doCheckSaveData(function(pbSuccess){
			if (pbSuccess) {
				
				if (!ValueUtil.isNull(vsXtmValue)){
					ExtSubPage.setPage("htmlObjFrame", vsXtmValue, true);
				} else {
					ExtTreeView.findItemValue("trvMenuList", vsPageVal, "VALUE", false);
				}
				
				ExtTreeView.doRebuildSelectedItem("trvMenuList");
			
				if(!ValueUtil.isNull(ValueUtil.fixNull(ExtTreeView.getItem("trvMenuList", vsPageVal, "PVALUE")))){
					// 상위 노드가 바뀔 시 다른 상위노드에 열려있는 하위노드를 닫기
					moPage.closeTrvNode("trvMenuList",  moPage.msTrvNodeVal.before, vsPageVal);
				}
			}else{
				doBack();
				
			}		
		}, vbOnLoadFlag, vsPageVal);
	};
	
	/**
	 * @desc 이전 선택한 메뉴 호출
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 2. 18
	 */
	function doBack() {
		ExtTreeView.findItemValue("trvMenuList", moPage.msTrvNodeVal.before, "VALUE", false);
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
	 * @param psTrvNodeVal 트리 선택 벨류 값
	 * @return void
	 * @author Choi In Seong 2016. 2. 18
	 */
	function doGetSubPageName(psTrvNodeVal) {
		
		var vsXtmValue = ExtInstance.getValue("/root/resOnLoad/trvMenuList/row", "CD_PRP6", "child::CD='" + psTrvNodeVal + "'");
		return vsXtmValue;
	};

	/**
	 * @desc 트리 선택 이벤트 발생시 이전 페이지 값을 세팅
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 2. 18.
	 */
	moPage.onDeselectionChanged_TrvMenuList = function() {
		// 이벤트 발생시 이전 페이지 값을 세팅....
		// 이전 메뉴
		moPage.msTrvNodeVal.before = util.Tree.getSelectedValue(app, "trvMenuList");
	};	
	
	/**
	 * @desc 트리 메뉴에서 최초로 선택해야할 메뉴 코드를 가져온다.
	 * 		   CD_PRP4가 Y인 노드의 CD값
	 * @param 
	 * @return vsInitMenu 초기 설정 메뉴
	 * @author Choi In Seong 2016. 2. 18.
	 */
	function doGetInitMenuCD() {
		var vsInitMenu = ExtInstance.getValue("/root/resOnLoad/trvMenuList/row", "CD", "child::CD_PRP4='Y'");
		return vsInitMenu;
	};

	/**
	 * @desc 트리 선택시 상위 노드가 다르면 이전 상위 노드의 하위노드들을 전부 닫는다.
	 * @param psTrvNm 트리 아이디
	 * @param psBefPageVal 이전에 선택된 값
	 * @param psSelectedVal 현재 선택된 값
	 * @return void
	 * @author Choi In Seong 2016. 2. 18.
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
	 * @desc 메뉴클릭시 서브페이지의 변경여부 확인/저장 로직
	 * @param poCallbackFunc 변경여부 확인 후 실행 될 콜백 함수
	 * @param vbOnLoadFlag 화면이 제대로 OnLoad 되었는지 여부
	 * @param psPageVal 현재 선택 메뉴
	 * @return void
	 * @author Choi In Seong 2016. 2. 18.
	 */	
	function doCheckSaveData(poCallbackFunc, pbOnLoadFlag, psPageVal){

		//노드에 해당되는 프로그램ID
		var vsXrfID = moPage.getSubPageID(psPageVal);
		
		// 파일이름이 있으면 해당 page을 subPage로 보여줌 ,상위코드클릭은  Node만 펼쳐줌   
		if (ValueUtil.isNull(vsXrfID) || pbOnLoadFlag) {
			if(util.isFunc(poCallbackFunc)) poCallbackFunc(true);
			return false;
		}

		//** 서브페이지 함수에 접근하는지 확인
		//데이타 변경여부를 확인하고 저장여부 컨펌: 저장실패시 상태변경 불가
		var voSbpFramePage = ExtSubPage.getSubPage("htmlObjFrame", vsXrfID, true);
		
		if (voSbpFramePage != null && voSbpFramePage.callScript("doCheckDataChange", null)) {
			// 변경이 있어도 선택한 서브페이지로 이동
			if(util.isFunc(poCallbackFunc)) poCallbackFunc(true);
		}else{
			//이전 서브페이지에 멈춰있음
			ExtTreeView.findItemValue("trvMenuList",  moPage.msTrvNodeVal.before, "VALUE", false);
			return false;
		}
	}
		
	/**
	 * @desc 저장 후 임포트 재조회 & 서브페이지 재조회
	 * @param stdCsrMstFrame 콜백함수
	 * @return void
	 * @author Choi In Seong 2016. 2. 18.
	 */
	function doSaveAfter(poCallBackSaveAfter) {
		
		//학번&기준일자 입력확인
		var vsStudId  = util.DataMap.getValue(app, "dmReqKey", "strStudId");
		
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
		
				// 파일이름이 있으면 해당 page을 subPage로 보여줌 ,상위코드클릭은  Node만 펼쳐줌   
				var vsXrfID = moPage.getSubPageID(util.Tree.getSelectedValue(app, "trvMenuList"));
				if (!vsXrfID ) return;
				
				voParam.subPageId 		= vsXrfID;
				
				// 서브페이지 목록 재조회
				var voSbpFramePage = ExtSubPage.getSubPage("htmlObjFrame", vsXrfID, true);
				if (voSbpFramePage != null) {
					voSbpFramePage.callScript("doList", poCallBackSaveAfter);
				}
			}
		};
		//학생정보 조회
		setImpStudInfo(vsStudId, null, null, voImpStudInfoCallbackFunc);
		
	};
	
	/**
	 * @desc 트리 노드 더블클릭 시 이벤트
	 *            다른 상위 트리 노드 전부 닫기
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 2. 24
	 */
	moPage.onDoubleClick_TrvMenuList = function() {
		var vsTrvValue = util.Tree.getSelectedValue(app, "trvMenuList");
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
	};
	
	return moPage;
};
