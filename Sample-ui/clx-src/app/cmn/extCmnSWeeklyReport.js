//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCmnSWeeklyReport.xtm"/>


var extCmnSWeeklyReport = function() {
	var moPage = new Page();
	var moPObject = new PObject();
	
	/**
	 * @desc  Header Import onLoad
	 * @return void
	 * @author jeong-ho, Jeong 2016. 3. 15.
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		doHeaderOnLoad();
	}
	
	/**
	 * @desc  onModelConstructDone  event
	 * @return void
	 * @author jeong-ho, Jeong 2016. 3. 15.
	 */
	moPage.onModelConstructDone_extCmnSWeeklyReport = function() {
		
		// 리피트 및 조회그룹 관련 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grpData"]);
		
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["frfCmnModBoard"]);
		
		//서브미션 실행 (두번째 인자가 'onLoad' 일 경우 서브미션 실패시 coverPage 실행)
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, ["cbbUnitSystemRcd"]);
				
				util.Control.setValue(app, "ipbKeyDate", util.DataMap.getValue(app, "dmResOnLoad", "strCutDt"));
				util.Control.setValue(app, "ipbUserNm", util.DataMap.getValue(app, "dmResOnLoad", "strUserNm"));
				util.Control.setValue(app, "ipbCnfmPsnNm", util.DataMap.getValue(app, "dmResOnLoad", "strCnfmPsnNm"));
			}
		}, true);
	};
	
	/**
	 * @desc  조회 버튼 click event 
	 * @return void
	 * @author jeong-ho, Jeong 2016. 3. 15.
	 */
	moPage.onClick_BtnSearch = function() {
		
		// 필수체크
		if (!util.validate(app, ["ipbKeyDate"])) return false;
		
		doList(function(pbSuccess) {
			// 조회 : "조회되었습니다." header 메세지 표시
			if (pbSuccess) util.Msg.notify(app, "NLS.INF.M024");
		});
	};
	
	/**
	 * @desc  조회 submission 실행
	 * @param {Function} poCallBackFunc 콜백정의
	 * @return void
	 * @author jeong-ho, Jeong 2016. 3. 15.
	 */
	function doList(poCallBackFunc) {
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				util.Control.reset(app, "frfCmnModBoard");
				doSetEnable(false);
				util.Control.redraw(app, ["optRptTxt4", "txtRptTxt1", "optRptTxt5", "txtRptTxt2", "optRptTxt8", "optRptTxt9", "optRptTxt7", "txtRptTxt10"]);
				ExtTreeView.rebuild("trvMst");
			}
			
			// 조회 후 콜백함수 수행
			if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess); 
		}); 
	};
	
	/**
	 * @desc  조회자명 keydown event
	 * @return void
	 * @author jeong-ho, Jeong 2016. 3. 15.
	 */
	moPage.onKeyDown_IpbUserNm = function(strKeyType, strKeyStatus) {
		if(e.keyCode == cpr.events.KeyCode.ENTER){
			util.Header.clickSearch(app);
		}
	};
	
	/**
	 * @desc 트리메뉴 정보 저장 변수
	 * @return void
	 * @author jeong-ho, Jeong 2016. 3. 25.
	 */
	moPage.moTrvMstInfo = {
		BF_SEL_VALUE : ""	// 이전에 선택된 트리뷰 값
	};
	
	/**
	 * @desc 트리메뉴 선택시 실행되는 함수
	 * @return void
	 * @author jeong-ho, Jeong 2016. 3. 17.
	 */
	moPage.onSelectionChanged_TrvMst = function() {
		var vsSelValue = util.Tree.getSelectedValue(app, "trvMst");
		var vaSelValue = vsSelValue.split(",");
		var vnSelLength = vaSelValue.length;
		
		if(vnSelLength < 2){
			util.Control.reset(app, "frfCmnModBoard");
			doSetEnable(false);
			return false;
		}
		
		doListByCmnModBoard(vaSelValue[0], vaSelValue[1], function(pbSuccess) {
			if (pbSuccess) {
				// 조회 : "조회되었습니다." header 메세지 표시
				util.Msg.notify(app, "NLS.INF.M024");
				
				// 이전탭 값 저장
				moPage.moTrvMstInfo.BF_SEL_VALUE = vsSelValue;
			}
		});
	};
	
	/**
	 * @desc 해당 컨트롤을 활성/비활성 제어한다.
	 * @author jeong-ho, Jeong 2016. 3. 17.
	 */
	function doSetEnable(pbEnable) {
		util.Control.setEnable(app, pbEnable, ["frfCmnModBoard", "btnRestore", "btnSave", "btnMenuOpen"]);
	};
	
	/**
	 * @desc 프로그램 변경요청 상세 submission 실행
	 * @return void
	 * @author jeong-ho, Jeong 2016. 3. 17.
	 */
	function doListByCmnModBoard(psReqId, psSerialNo, poCallBackFunc) {
		util.DataMap.setValue(app, "dmReqKey", "strReqId", psReqId);
		util.DataMap.setValue(app, "dmReqKey", "strSerialNo", psSerialNo);
		//strCommand: listByCmnModBoard 
		util.Submit.send(app, "subListByCmnModBoard", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "frfCmnModBoard");
				doSetEnable(true);
			}
			
			// 조회 후 콜백함수 수행
			if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess); 
		}); 
	};
	
	/******************************************************************************************************
	 *  공통파일업로드 관련 설정사항 사용법
	 *
	 * 예시)
	 * var moIdsForStdCmnFileUtil = [{
	 *		controlId 					: "btnFileUpLoad",
	 *		iFileSerialNo 				: "rdOptFileSerialNo",
	 *		iFileSubPath 				:  model.getTitle(),
	 *		iTableName 				: "CMN_TMP_REG",
	 *		iIsDirectUpLoad			: null,
	 *     isFileSelectorOnly       : null,
	 *		iIsHideDelete 				: null,			
	 *		iIsDownloadOnly 		: null,
	 *		iFileExtFilter 				: null,
	 *		oFileSerailNo				: "rdOptFileSerialNo",
	 *		oTmpFilePath			: null,			//리피트일경우 null로 지정
	 *		oFileCnt					: null,		
	 *		oFileDataChanged		: null,
	 *		func							: function(poRtnFileInfo){
	 *											ex)
	 *											if(poRtnFileInfo.IS_FILE_CHG && poRtnFileInfo.FILE_CNT == 0){
													util.FreeForm.setValue(app, "frfCmnDevStd", "FILE_SERIAL_NO", "", true); 
													doSave();
												}
	 *										}
	 *	}];
	 *  ▶ 설정가능 유형
	 *      1. 인스턴스
	 *      2. 리피트 디테일 셀 ID
	 *      3. 컨트롤 ID
	 *  ▶ 각 변수별 설명
	 *      iXXX : 팝업에 전달될  input 파라미터
	 *      oXXX : 팝업에서 선택한 값을 받을 데이터
	 *  	1. controlId 			: 최초 이벤트의 버튼이나 그리드 id             						(필수)
	 *  	2. iFileSerialNo		: 파일순번                                										(선택) 
	 *  	3. iFileSubPath 		: 저장될 파일 폴더(appworks.properties에 정의된 폴더 경로)	(필수)	
	 *  	4. iTableName 		: 파일업로드에 사용될 업무단 테이블명								(필수)
	 *  	5. iIsHideDelete 		: 삭제버튼 숨기기 여부 													(선택)
	 *								  	  default : false;
	 *		6. iIsDownloadOnly	: 다운로드만 가능할지 여부(업로드X)									(선택)
	 *								      default : false;
	 *		7. iIsDirectUpLoad   : auto save기능을 사용하지 않고 파일업로드 팝업을 이용하여 업로드 후 업로드된 정보만 리턴받아 제어 할 경우 사용
	 *									  default : false;
	 *		8. isFileSelectorOnly : 파일 셀럭터를 이용하여 응용프로그램에서 탬프 파일 경로만 취득하여 제어할 경우경우 사용
	 *									  default : false;
	 *		9. iFileExtFilter		: 업로드가능 확장자(배열) 												(선택)
	 *								  	  ex)["jpg","png"]
	 *  	10. oFileSerailNo 		: 파일순번																		(필수)
	 *  	11. oFileCnt 			: 저장된 파일 갯수															(선택)
	 *									  (	func의 args 대체 가능 poRtnFileInfo.strFileCnt)
	 *									  리피트내 컬럼 지정시 updatable="False" 지정
	 *  	12. oTmpFilePath 	: 임시폴더파일경로															(선택)
	 *									  리피트일경우 null로 지정, TMP_FILE_PATH 데이터셋 생성됨
	 *									  
	 *		13.oFileDataChanged	: 파일업로드 변경 여부 판단											(필수)		
	 *									  (	func의 args 대체 가능 poRtnFileInfo.isFileDataChanged)
	 *
	 *  	14. func 				: 팝업에서 선택한 값을 받은 후 추가 로직이 필요한 경우 함수
	 *									  args..
	 * 									  poRtnFileInfo.IS_FILE_CHG 			파일업로드 리피트 변경 여부
	 *															 FILE_CNT					업로드 파일 갯수
	 *															 TMP_FILE_PATH		임시파일경로
	 *									  						 FILE_SERAIL_NO		파일순번
	 *******************************************************************************************************/	
	moPObject.moIdsForStdCmnFileUtil = [{
		controlId 					: "btnFileDown",
		iFileSerialNo 				: "optFrfFileSerialNo",
		iFileSubPath 				: "stdCmnCRepairBoard",
		iTableName 				: "CMN_MOD_BOARD",
		iIsDirectUpLoad			: null,
		isFileSelectorOnly       : null,
		iIsHideDelete 				: true,			
		iIsDownloadOnly 		: true,
		iFileExtFilter 				: null,
		oFileSerailNo				: null,
		oTmpFilePath			: null,			//리피트일경우 null로 지정
		oFileCnt					: null,
		oFileDataChanged		: null,
		func							: null
	}];
	
	/**
	 * @desc 다운로드 버튼 클릭시 실행
	 * @return void
	 * @author jeong-ho, Jeong 2016. 3. 17.
	 */
	moPage.onClick_BtnFileDown = function(sender) {
		doOnClickStdCmnPFileUtil(sender);
	};
	
	/**
	 * @desc 작업저장 click event
	 * @return void
	 * @author jeong-ho, Jeong 2016. 3. 17.
	 */	
	moPage.onClick_BtnSave = function() {
		doSave();
	};
	
	/**
	 * @desc  리피트 저장 submission 실행
	 * @return void
	 * @author jeong-ho, Jeong 2016. 3. 17.
	 */
	function doSave(poCallBackFunc) {
		
		// 리피터 변경사항 체크
		if(!util.Grid.isModified(app, ["frfCmnModBoard"], "MSG")){
			return false;
		}
		
		//리피트 validation check
		if(!util.validate(app, "frfCmnModBoard")) return false;
		
		//strCommand: save 
		util.Submit.send(app, "subSave", function(pbSuccess){
			if(pbSuccess){
				doList(function(pbSuccessSub) {
					if (pbSuccessSub) {
						// 조회 : "조회되었습니다." header 메세지 표시
						util.Msg.notify(app, "NLS.INF.M024");
						
						ExtTreeView.findItemValue("trvMst", moPage.moTrvMstInfo.BF_SEL_VALUE, "VALUE", true);
					}
				});
			}
		});
	};
	
	/**
	 * @desc 작업취소 click event
	 * @return void
	 * @author jeong-ho, Jeong 2016. 3 17.
	 */	
	moPage.onClick_BtnRestore = function() {
		var voFrf = model.getControl("frfCmnModBoard");
		var vsStatus = voFrf.getRowStatus(voFrf.getIndex());
		
		util.Grid.restoreRow(app, "frfCmnModBoard");
	};
	
	/**
	 * @desc 메뉴열기 click event
	 * @return void
	 * @author jeong-ho, Jeong 2016. 3. 18.
	 */	
	moPage.onClick_BtnMenuOpen = function() {
		// 메뉴열기 
		var vsMenuId 		= util.FreeForm.getValue(app, "frfCmnModBoard", "MENU_PGM_ID");
		var vsTopMenuId	= util.FreeForm.getValue(app, "frfCmnModBoard", "TOP_MENU_ID");

		Common.findMainWindow().doOpenAuthMenu(vsMenuId, vsTopMenuId);
	};
	
	/**
	 * @desc  확인자명 keydown event
	 * @return void
	 * @author jeong-ho, Jeong 2016. 3. 22.
	 */
	moPage.onKeyDown_IpbCnfmPsnNm = function(strKeyType, strKeyStatus) {
		if(e.keyCode == cpr.events.KeyCode.ENTER){
			util.Header.clickSearch(app);
		}
	};
	
	/**
	 * @desc 프로그램관리 바로가기 click event
	 * @return void
	 * @author jeong-ho, Jeong 2016. 3. 22.
	 */
	moPage.onClick_BtnPgmMenu = function() {
		Common.findMainWindow().doOpenAuthMenu("stdCmnCRegPgm", "000040");
	};
	
	/**
	 * @desc [전체펼침] 버튼 click event
	 * @return void
	 * @author xxxx 2016. 3. 28.
	 */
	moPage.onClick_BtnExpend = function() {
		util.Tree.expandAllItems(app, "trvMst", true);
	};
	
	/**
	 * @desc  기준일자 keydown event
	 * @return void
	 * @author jeong-ho, Jeong 2016. 6. 8.
	 */
	moPage.onKeyDown_IpbKeyDate = function(strKeyType, strKeyStatus) {
		if(e.keyCode == cpr.events.KeyCode.ENTER){
			util.Header.clickSearch(app);
		}
	};
	
	/**
	 * @desc  조치상태 value change event
	 * @return void
	 * @author jeong-ho, Jeong 2016. 8. 11.
	 */
	moPage.onValueChanged_CbbFrfActStatRcd = function() {
		var vsActStatRcd = util.FreeForm.getValue(app, "frfCmnModBoard", "ACT_STAT_RCD");
		var vsActDt = util.FreeForm.getValue(app, "frfCmnModBoard", "ACT_DT");
		var vsActPlanDt = util.FreeForm.getValue(app, "frfCmnModBoard", "ACT_PLAN_DT");
		
		// 접수 or 조치완료
		if("MGT0902" == vsActStatRcd
			|| "MGT0903" == vsActStatRcd){
			if(ValueUtil.isNull(vsActPlanDt)){
				util.FreeForm.setValue(app, "frfCmnModBoard", "ACT_PLAN_DT", util.DataMap.getValue(app, "dmResOnLoad", "strCutDt"));
			}
			
		// 설계자확인완료
		}else if("MGT0905" == vsActStatRcd){
			if(ValueUtil.isNull(vsActDt)){
				util.FreeForm.setValue(app, "frfCmnModBoard", "ACT_DT", util.DataMap.getValue(app, "dmResOnLoad", "strCutDt"));
			}
		}
	};
	return moPage;
};
