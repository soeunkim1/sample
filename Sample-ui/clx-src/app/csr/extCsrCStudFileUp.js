//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
///<xtmlink path="./extCsrCStudFileUp.xtm"/>

var extCsrCStudFileUp = function() {

	var moPage = new Page();
	//임포트용 데이터 통신 오브젝트
	var moPObject = new PObject();

	var msStudId = "";
	
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
		iIsHideDelete 				: null,			
		iIsDownloadOnly 		: null,
		iFileExtFilter 				: null,
		oFileSerailNo				: "rdIpbFileSerialNo",
		oTmpFilePath			: null,			//리피트일경우 null로 지정
		oFileCnt					: "rdOptFileCnt",		
		oFileDataChanged		: null,
		func							: function(poRtnFileInfo){
											if(poRtnFileInfo.IS_FILE_CHG && poRtnFileInfo.FILE_CNT == 0){
												util.Grid.setCellValue(app, "grdExtCsrFile", "FILE_SERIAL_NO", "", null, true);
											}else{
												util.Grid.setCellValue(app, "grdExtCsrFile", "FILE_SERIAL_NO", poRtnFileInfo.FILE_SERAIL_NO, null, true);
											}
										}
	}];
		
	/**
	 * @desc 서브페이지 임포트 온로드
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 3. 17
	 */
	moPage.onLoadImportDone_ImpSbpHeader = function() {
		doSbpHeaderOnLoad();
	}
		
	/**
	 * @desc 화면 온로드
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 3. 17
	 */
	moPage.onModelConstructDone_extCsrCFileMng = function() {
		//리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init("rptExtCsrFile");

		//서브미션 실행 (실패시 cover page)
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				
				var voParentPage = ExtSubPage.getParent();
				
				// 부모멤버변수에담긴학번받음
				msStudId = moPage.parent.moParentObj.studId;
				if (ValueUtil.isNull(msStudId)) {
					return false;
				}else{
					doList(function(pbSuccess) {
						// 조회 : "조회되었습니다." header 메세지 표시
						if(pbSuccess) {
							moPage.parentSendMsg("lblTitleRptExtCsrFile", NLS.INF.M024);
						}
					});
				}
			}
		});
	}

	/**
	 * @desc 학생파일 조회
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 3. 17
	 */
	function doList(poCallBackFunc) {
		util.DataMap.setValue(app, "dmReqList", "strStudId", msStudId);
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdExtCsrFile");
				util.Control.redraw(app, "lblRowCnt_rptExtCsrFile");
			}
			// 조회 후 콜백함수 수행
			if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
		});
	}

	/**
	 * @desc 리피트 panel click event
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 3. 17
	 */
	moPage.onValueChanged_RhCkbSelect = function() {
//TO-BE: <ExtRepeat.selectedAllPanel> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.selectedAllPanel("rhCkbSelect");
	};

	/**
	 * @desc 학생파일 파일업로드 팝업 호출
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 3. 17
	 */
	moPage.onClick_RdImgFileUpload = function(sender) {
		doOnClickStdCmnPFileUtil(sender);
	};
	
	/**
	 * @desc 학생파일 신규
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 3. 17
	 */
	moPage.onClick_BtnNew = function() {
		//해당 리피트 insertRow 후 편집 시작할 컬럼 지정
		util.Grid.insertRow(app, "grdExtCsrFile");
		util.Grid.setCellValue(app, "grdExtCsrFile", "STUD_ID", msStudId);
	};
	
	/**
	 * @desc 학생파일 삭제
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 3. 17
	 */
	moPage.onClick_BtnDel = function() {
		if(ValueUtil.isNull(util.Grid.getCheckOrSelectedRowIndex(app, "grdExtCsrFile"))){
			moPage.parentSendMsg("lblTitleRptExtCsrFile", NLS.INF.M005);
			return false;
		} else {
			util.Grid.deleteRow(app, "grdExtCsrFile");
		}
	};
	
	/**
	 * @desc 학생파일 작업취소
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 3. 17
	 */
	moPage.onClick_BtnRestore = function() {
		util.Grid.restoreRow(app, "grdExtCsrFile");
	};
	
	/**
	 * @desc 학생파일 작업저장버튼 클릭
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 3. 17
	 */
	moPage.onClick_BtnSave = function() {
		doSubSave();
	};
	
	/**
	 * @desc 학생파일 저장
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 2. 26
	 */
	function doSubSave(poCallbackFunc) {
		var iRowCnt = util.Grid.getRowCount(app, "grdExtCsrFile");
		for(var i=1 ; i<=iRowCnt ; i++){
			var vsUptStat 		= util.Grid.getCellValue(app, "grdExtCsrFile", "UPT_STATUS", i);
			var vsFileCnt 		= util.Grid.getCellValue(app, "grdExtCsrFile", "FILE_CNT", i);
			if((vsFileCnt =="0"|| vsFileCnt =="")&& vsUptStat!="D"){
				util.Msg.alert("NLS-CMM-M012");
				return false;
			}
		}
		
		// 리피터 변경사항 체크
		if(!util.Grid.isModified(app, ["grdExtCsrFile"], null)){
			moPage.parentSendMsg("lblTitleRptExtCsrFile",NLS.WRN.M007);
			if(util.isFunc(poCallbackFunc)) poCallbackFunc(false);
			return false;
		}
		//리피트 validation check
		if(!util.validate(app, "grdExtCsrFile")){
			if(util.isFunc(poCallbackFunc)) poCallbackFunc(false);
			return false;
		}

		//strCommand: save 
		util.Submit.send(app, "subSave", function(pbSuccessSave) {
				if(pbSuccessSave) {
					//저장성공 메세지 출력
					doList(function(pbSuccessList) {
						// 조회 : "조회되었습니다." header 메세지 표시
						if(pbSuccessList) {
							moPage.parentSendMsg("lblTitleRptExtCsrFile",NLS.INF.M025);
						}
						if(util.isFunc(poCallbackFunc))	poCallbackFunc(pbSuccessList);
					});
				}
			}
		);
	}
	
	/**
	 * @desc 부모 헤더에 메세지 뿌리기
	 * @param psCtrlId 
	 * @param psMsgCode 
	 * @return void
	 * @author Choi In Seong 2016. 3. 17
	 */
	moPage.parentSendMsg = function(psCtrlId, psMsgCodeNm) {
		var vsMsg = ExtControl.getTextValue(psCtrlId);
		vsMsg     = "[" + vsMsg + "]";
	
		util.Msg.notify(app, vsMsg + psMsgCodeNm);	
	};
	
	/**
	 * @desc 변경여부 반환
	 * @param 
	 * @return boolean 변경여부
	 * @author Choi In Seong 2016. 3. 17
	 */
	function doCheckDataChange() {
		if(util.Grid.isModified(app, ["grdExtCsrFile"], "CRM") ){
			return false;
		}else{
			return true;
		}
	};
	
	return moPage;
};

