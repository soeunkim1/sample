//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCsrSVendInfo.xtm"/>


var extCsrSVendInfo = function() {
	var moPage = new Page();
	//임포트용 데이터 통신 오브젝트
	var moPObject = new PObject();
	
	var msStudId = "";
	var msStudNo = "";
	
	//등록 popUp에 학년도 Text,학기Text,학적등록구분Text,이수과정구분Text,이수과정text,학적등록사유Text 추가해서 넘겨줌 
	//등록 popUp에 넘겨줄 값 
	moPObject.moAltObj = {
		studId				: "", 		//학적사항관리 창의 조회된 학번값		
		headerStud		: "", 		//학적사항관리 창의 헤더정보(학생) 
		headerCourse	: "", 		//
		headerDept		: "",		//
		headerRemark	: "", 		//
		studNo	 			: "", 		//학번
		year 					: "", 		//년도
		smt 					: "", 		//학기
		stDt 					: "", 		//시작일자
		endDt 				: "", 		//종료일자
		keyDate	 			: "",		//기준일자
		altPsn				: ""		//
	};
	
	/**
	 * 부모 페이지에서 받아온 휴학 사유 리스트
	 */	
	moPObject.moAltAbs = {
		absPossibleList	: ""
	};
	
	/**
	 * 사용처 : 상세팝업 .
	 */
	moPObject.moDtl = {
		studId 				: "",
		refKey 				: "",
		altDivNm 			: "",
		stDt 					: "",
		serialNo 			: "",
		endDt 				: "",
		schYearNm 		: "",
		smtNm 				: "",
		altRsnDivNm 		: "",
		altRsnNm 			: "",
		altDt 					: "",
		cancelDt 			: "",
		cancelRsnNm 	: "",
		absSmtCntNm 	: "",
		cstDt 				: "",
		chgDesc 			: "",
		chgBefDesc 		: "",
		remark 				: "",
		befEndDt 			: "",
		altDivRcd 			: ""
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
		controlId 					: "rdImgFileUpload",
		iFileSerialNo 				: "rdIpbFileSerialNo",
		iFileSubPath 				:  "extCsrCFileMng",
		iTableName 				: "EXT_CSR_FILE",
		iIsDirectUpLoad			: true,
		isFileSelectorOnly       : null,
		iIsHideDelete 				: true,			
		iIsDownloadOnly 		: true,
		iFileExtFilter 				: null,
		oFileSerailNo				: "rdIpbFileSerialNo",
		oTmpFilePath			: null,			//리피트일경우 null로 지정
		oFileCnt					: "rdOptFileCnt",		
		oFileDataChanged		: null,
		func							: function(poRtnFileInfo){
											if(poRtnFileInfo.IS_FILE_CHG && poRtnFileInfo.FILE_CNT == 0){
												util.Grid.setCellValue(app, "grdExtCsrVend", "FILE_SERIAL_NO", "", null, true);
											}else{
												util.Grid.setCellValue(app, "grdExtCsrVend", "FILE_SERIAL_NO", poRtnFileInfo.FILE_SERAIL_NO, null, true);
											}
										}
	}];
	/**
	 * 헤더 초기화
	 * @member moPage
	 * @type void
	 * @author hyunteak at 16. 5. 23 오후 4:13
	 */
	moPage.onLoadImportDone_ImpSbpHeader = function() {
		doSbpHeaderOnLoad();
	}
	
	/**
	 * 화면 초기화
	 * @member moPage
	 * @type void
	 * @author hyunteak at 16. 5. 23 오후 4:13
	 */
	moPage.onModelConstructDone_ExtCsrSVendInfo = function() {
		//리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init("rptExtCsrVend");

		// 부모멤버변수에담긴학번받음
		msStudId = moPage.parent.moParentObj.studId;
		msStudNo = moPage.parent.moParentObj.studNo;
		util.DataMap.setValue(app, "dmReqKey", "stdPgmNm", moPage.parent.moParentObj.subPageId);
		
		moPObject.moAltObj.studId 		= msStudId;
		moPObject.moAltObj.studNo 		= msStudNo; // STUD_ID -> STUD_NO로 변경되면서 추가된 부분 (정정호 2011.08.05)
		moPObject.moAltObj.headerStud 	= moPage.parent.moParentObj.headerStud;
		
		doList(function(pbSuccess) {
			// 조회 : "조회되었습니다." header 메세지 표시
			if(pbSuccess) {
				moPage.parentSendMsg("lblTitleRptExtCsrVend", NLS.INF.M024);
			}
		});
	};
	/**
	 * 조회
	 * @member moPage
	 * @param {?} poCallBackFunc
	 * @type void
	 * @author hyunteak at 16. 5. 23 오후 4:13
	 */
	function doList(poCallBackFunc) {
		
		var vsCancelCkbVal= "N";
		var vsCancelCkbCtlVal = util.Control.getValue(app, "ckbCancel");
		if (vsCancelCkbCtlVal == "Y") vsCancelCkbVal = "Y";
		
		util.DataMap.setValue(app, "dmReqKey", "strCancelCkbVal", vsCancelCkbVal);
		util.DataMap.setValue(app, "dmReqKey", "strStudId", msStudId);
		
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess) {
				if (pbSuccess) {
					util.Control.redraw(app, "grdExtCsrVend");
				}
				if(util.isFunc(poCallBackFunc))	poCallBackFunc(pbSuccess);
			}
		);
	};
	/**
	 * 부모 헤더에 메세지 뿌리기
	 * @member moPage
	 * @param {?} psCtrlId
	 * @param {?} psMsgCodeNm
	 * @type void
	 * @author hyunteak at 16. 5. 23 오후 4:13
	 */
	moPage.parentSendMsg = function(psCtrlId, psMsgCodeNm) {
		var vsMsg = ExtControl.getTextValue(psCtrlId);
		vsMsg     = "[" + vsMsg + "]";
	
		util.Msg.notify(app, vsMsg + psMsgCodeNm);	
	};
	
	/**
	 * 리피트 변경여부 반환
	 * @member moPage
	 * @type Boolean
	 * @return 
	 * @author hyunteak at 16. 5. 23 오후 4:13
	 */
	function doCheckDataChange() {
		if(util.Grid.isModified(app, ["grdExtCsrVend"], "CRM") ){
			return false;
		}else{
			return true;
		}
	};
	
	moPage.onValueChanged_RhCkbSelect = function() {
//TO-BE: <ExtRepeat.selectedAllPanel> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.selectedAllPanel("rhCkbSelect");
	}
	/**
	 * 파일 다운로드
	 * @member moPage
	 * @param {?} sender
	 * @type void
	 * @author hyunteak at 16. 5. 23 오후 4:14
	 */
	moPage.onClick_RdImgFileUpload = function(sender) {
		doOnClickStdCmnPFileUtil(sender);
	}
	return moPage;
};
