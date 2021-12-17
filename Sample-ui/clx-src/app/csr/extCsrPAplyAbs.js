//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCsrPAplyAbs.xtm"/>

var extCsrPAplyAbs = function() {
	var moPage = new Page();
	var moPObject 	= new PObject();
		
	/********************************
	 * 사용자 정의 메소드, 변수
	 *******************************/
	var msStudId = "";
	var msUseTabNm = "";
	var mskeyDate = "";
	var msPageDiv = "";
	
	var maControls =  ["ipbFrfCstDt", "btnSave", "btnNewPopZipcodeSearch", "ipbFrfClpNo", "ipbFrfDrtTelNo", "ipbFrfEmail", "btnNewPopZipcodeSearchGuard", "ipbFrfClpNoGuard", "ipbFrfDrtTelNoGuard", "ipbFrfCompTelNoGuard"];
	
	moPObject.moExtCsrAplyAbs = {
		// 팝업 작동 내부사용
		controlId 						: "",			//  최초 이벤트의 버튼이나 그리드 id
		openedByChange           : false, 
		strStudId 						: "",			// (필수) 검색조건 학번오브젝트
		strUseTabNm				: ""            // (필수) 사용테이블
	};
	
	/********************************
	 * 폼 신규 상태 체크 
	 *******************************/
	moPage.mbIsInsertRowFrf = false;
	moPage.mbIsInsertRowFrfGuard = false;
	moPage.mbIsInsertRowAbs = false;
	
	/**
	 * 우편번호검색팝업 관련 설정사항
	 * 각 변수별 설명
	 *  iXXX : 팝업으로 input 전달될 파라미터
	 *  oXXX : 팝업에서 선택한 값을 받을 컬럼 아이디
	 *  [IN]
	 *   1. controlId					: (필수) 최초 이벤트의 버튼id
	 *  [OUT]
	 *  2. oZipCode					: 우편번호
	 *  3. oZipSeq					: 우편일련번호
	 *  4. oBdMno                    : 건물번호
	 *  5. oAddr						: 주소
	 *  6. func						: 팝업에서 선택한 값을 받은 후 추가 로직이 필요한 경우 함수 작성
	 * @member impStdCmnPZipSearch
	 * @type Array
	 * @author Choi In Seong at 16. 1. 26
	 */ 
	moPObject.moIdsForStdCmnPZipSearch = [
		 { 
			 controlId					: "btnNewPopZipcodeSearch",		//(필수)우편번호검색
			 oZipCode					: "ipbFrfZipcode",	//리턴 우편번호
			 oAddr						: "ipbFrfAddr1",		//리턴 주소
			 oAddrDtl					: "ipbFrfAddr2",		//리턴 주소
			 func				 			: null
		 },
		{ 
			 controlId					: "btnNewPopZipcodeSearchGuard",		//(필수)우편번호검색
			 oZipCode					: "ipbFrfZipcodeGuard",	//리턴 우편번호
			 oAddr						: "ipbFrfAddrGuard1",		//리턴 주소
			 oAddrDtl					: "ipbFrfAddrGuard2",		//리턴 주소
			 func				 			: null
		 }
	 ];
	
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
		controlId 					: "btnNewFileUpLoad",
		iFileSerialNo 				: "ipbFrfFileSerialNo",
		iFileSubPath 				:  "extCsrCFileMng",
		iTableName 				: "EXT_CSR_SHREG_ALT_APLY",
		iIsDirectUpLoad			: true,
		isFileSelectorOnly       : null,
		iIsHideDelete 				: null,			
		iIsDownloadOnly 		: null,
		iFileExtFilter 				: ["jpg","png","img","pdf"],
		oFileSerailNo				: "ipbFrfFileSerialNo",
		oTmpFilePath			: null,			//리피트일경우 null로 지정
		oFileCnt					: "ipbFrfFileCnt",		
		oFileDataChanged		: null,
		func							: function(poRtnFileInfo){
											if(poRtnFileInfo.IS_FILE_CHG && poRtnFileInfo.FILE_CNT == 0){
												util.FreeForm.setValue(app, "frfExtCsrShregAltAply", "FILE_SERIAL_NO", "");
												util.FreeForm.setValue(app, "frfExtCsrShregAltAply", "FILE_CNT", "0");
												var vsSerialNo = util.FreeForm.getValue(app, "frfExtCsrShregAltAply", "SERIAL_NO");
												// 신청데이터가 존재 할 때 파일건수 0건이 내려오면 파일순번 초기화
												if(!ValueUtil.isNull(vsSerialNo)){
													util.DataMap.setValue(app, "dmReqList", "strFileSaveDiv", "Y");
													util.DataMap.setValue(app, "dmReqList", "strSerialNo", vsSerialNo);
													//strCommand: save 
													util.Submit.send(app, "subSave", function(pbSuccessSave) {
														util.DataMap.setValue(app, "dmReqList", "strFileSaveDiv", "");
													});
												}
											}else{
												util.FreeForm.setValue(app, "frfExtCsrShregAltAply", "FILE_SERIAL_NO", poRtnFileInfo.FILE_SERAIL_NO);
												util.FreeForm.setValue(app, "frfExtCsrShregAltAply", "FILE_CNT", poRtnFileInfo.FILE_CNT);
											}
										}
	}];
	
	moPage.onLoadImportDone_impSbpHeader = function() {
		ExtModel.setTitle("extCsrPAplyAbs");
		doSbpHeaderOnLoad();
	};
	
	moPage.onLoadImportDone_ImpTitle = function() {
		ExtModel.setTitle("군휴학 신청");
		doHeaderOnLoad();
	}
	
	moPage.onModelConstructDone_StdCsrCMstBase = function() {
		//호출한 페이지에서 파라미터 받기.
		doParentGet();
		//화면 온로드 서브미션 호출
		doOnLoad();
	};
	
	/**
	 * @desc 부모창에서 보낸 변수 받기
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 4. 4.
	 */
	function doParentGet() {
		if(ExtPopUp.isPopUp()) {
			// 호출한 페이지에서 파라미터 받기.													
			var voExtCsrAplyAbs =  ExtPopUp.getParentVal("moExtCsrAplyAbs");
			// 파라미터  값복사 (deep copy)
			for (var key in voExtCsrAplyAbs) {
				if (key == "Result") {
					// 결과 값은 복사하지 않음.
					continue;
				}
				moPObject.moExtCsrAplyAbs [key] = voExtCsrAplyAbs [key];
			}
			// 팝업이 뜬후에는 false로 고침.
			voExtCsrAplyAbs.openedByChange = false;
		}
	}
	
	
	/**
	 * @desc 프리폼 변경여부 반환
	 * @param 
	 * @return boolean 변경여부
	 * @author Choi In Seong 2016. 4. 4
	 */
	function doCheckDataChange() {
		
		if(util.Grid.isModified(app, ["frfCmnAddr"], "CRM") || util.Grid.isModified(app, ["frfCmnAddrGuard"], "CRM") ||
		   util.Grid.isModified(app, ["frfExtCsrShregAltAply"], "CRM")){
			return false;
		}else{
			return true;
		}
		
	}
	
	/**
	 * @desc doOnLoad 화면 초기화
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 4. 4
	 */
	function doOnLoad(){
		
		//리피트 초기화
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["frfExtCsrShregAltAply", "frfCmnAddr", "frfCmnAddrGuard"]);
		
		// 파라미터 받아서 초기 검색조건 세팅.
		var voParam = moPObject.moExtCsrAplyAbs;
		
		// 부모멤버변수에담긴학번받음
		if(moPage.parent.moParentObj != null){
			msStudId = moPage.parent.moParentObj.studId;
			msUseTabNm = moPage.parent.moParentObj.USE_TAB_NM;
			msPageDiv = "S";  //서브페이지

			util.Control.setVisible(app, false, "impTitle");
			
		} else if (!ValueUtil.isNull(voParam.strStudId)) {
			msStudId = voParam.strStudId;
			msUseTabNm = voParam.strUseTabNm;
			msPageDiv = "P" //팝업
			util.Control.setStyleAttr(app, "grp_frfExtCsrShregAltAply", "top", '35px');
			util.Control.setStyleAttr(app, "grp_frfExtCsrShregAltAply", "left", '5px');
			util.Control.setStyleAttr(app, "btnSave", "left", '965px');
			util.Control.setVisible(app, true, "btnCloseCancel");

		} else {
			util.coverPage(app);
			return;
		}
		
		util.DataMap.setValue(app, "dmReqList", "strStudId", msStudId);
		util.DataMap.setValue(app, "dmReqList", "strUseTabNm", msUseTabNm);
		util.DataMap.setValue(app, "dmReqList", "checkPgmId", "extCsrPAplyAbs");
		util.DataMap.setValue(app, "dmReqList", "checkUserId", moUserInfo.userId); // 서브페이지 권한 체크시 userId 사용
		util.DataMap.setValue(app, "dmReqList", "checkMenuNm", ExtControl.getTextValue("lblTitle"));
		util.DataMap.setValue(app, "dmReqList", "strPageDiv", msPageDiv);
		
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess) {
			if (pbSuccess) {
				
				util.Control.redraw(app, ["frfExtCsrShregAltAply","frfCmnAddr", "frfCmnAddrGuard"]);

				//휴학신청, 주소정보 조회
				doList(function(pbSuccess) {
					if (pbSuccess) {
						// 조회 : "조회되었습니다." header 메세지 표시
						if(msPageDiv == "S"){
							//부모창에 메시지를 셋팅
							if(pbSuccess) moPage.parentSendMsg("lblTitle", NLS.INF.M024);
						}else{
							// 자신의 헤더에 메시지를 셋팅
							util.Msg.notify(app, "NLS.INF.M024"); // 조회되었습니다.
						}
					}
				});
			}
		});
	}
	
	/**
	 * @desc 해당 학생의 기본정보, 주소정보 데이터를 가져온다.
	 * @param poFunc 콜백함수
	 * @return void
	 * @author Choi In Seong 2016. 4. 4
	 */
	function doList(poFunc) {
		
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess) {
			if (pbSuccess) {
				var vsErrMsg = util.DataMap.getValue(app, "dmResList", "strErrorMsg");
				
				if(!ValueUtil.isNull(vsErrMsg)){
					util.Msg.alert("vsErrMsg");
					setTimeout(function(){
						if(msPageDiv == "S"){
							util.Control.setEnable(app, false, ["frfExtCsrShregAltAply", "frfCmnAddr", "frfCmnAddrGuard", "btnSave"]);
						}else{
							ExtPopUp.closeLayeredPopup("callbackExtCsrPAplyAbs", moPObject.moExtCsrAplyAbs);
						}
					}, 500);
					return;
				}
				
				util.Control.redraw(app, ["frfExtCsrShregAltAply","frfCmnAddr", "frfCmnAddrGuard"]);
				
				// 휴학신청 데이터 존재여부 체크
				var vsRowCnt = util.DataMap.getValue(app, "dmResList", "rowAbsCnt");
				if (vsRowCnt == "0") {
					doSubInsertAbsRow();
				}else{
					moPage.mbIsInsertRowAbs = false;
					var vsAplyStatRcd = util.FreeForm.getValue(app, "frfExtCsrShregAltAply", "APLY_STAT_RCD");
					// 신청상태에 따른 컨트롤 제어
					// 신청
					if(vsAplyStatRcd == "CSR10310"){
						util.Control.setEnable(app, true, maControls);
						moPObject.moIdsForStdCmnFileUtil[0].iIsDownloadOnly = null;
						moPObject.moIdsForStdCmnFileUtil[0].iIsHideDelete = null;
					// 승인
					} else if(vsAplyStatRcd == "CSR10320"){
						util.Control.setEnable(app, false, maControls);
						moPObject.moIdsForStdCmnFileUtil[0].iIsDownloadOnly = true;
						moPObject.moIdsForStdCmnFileUtil[0].iIsHideDelete = true;
					// 반려 시 신규 2016.04.22 choi in seong
					}else if(vsAplyStatRcd == "CSR10330"){
						util.FreeForm.insertRow(app, "frfExtCsrShregAltAply");
						doSubInsertAbsRow();
					}
				}
				
				// 기본주소 데이터 존재여부 체크
				var vsRowCnt = util.DataMap.getValue(app, "dmResList", "rowAddrCnt");
				if (vsRowCnt == "0") {
					doSubInsertRow();
				}else{
					moPage.mbIsInsertRowFrf = false;
				}
				
				// 보호자주소 데이터 존재여부 체크
				var vsRowGuardCnt = util.DataMap.getValue(app, "dmResList", "rowGuardCnt");
				if (vsRowGuardCnt == "0") {
					doSubInsertGuardRow();
				}else{
					moPage.mbIsInsertRowFrfGuard = false;
				}
			} else {
				util.Control.setEnable(app, false, ["frfExtCsrShregAltAply", "frfCmnAddr", "frfCmnAddrGuard", "btnSave"]);
			}
			// 조회 후 콜백함수 수행
			if (util.isFunc(poFunc)) poFunc(pbSuccess);
		});
	};
	
	/**
	 * @desc 작업저장
	 * @param poCallbackFunc 콜백함수
	 * @return Boolean
	 * @author Choi In Seong 2016. 4. 4
	 */
	function doSubSave(poCallbackFunc) {

		// 프리폼 변경사항 체크
		if(!(util.Grid.isModified(app, ["frfExtCsrShregAltAply"], null)
			||util.Grid.isModified(app, ["frfCmnAddr"], null)
			||util.Grid.isModified(app, ["frfCmnAddrGuard"], null)
		)){
			if(msPageDiv == "S"){
				moPage.parentSendMsg("lblTitle",NLS.WRN.M007);
			}else{
				// 자신의 헤더에 메시지를 셋팅
				util.Msg.notify(app, "NLS.WRN.M007"); // 변경된 데이터가 없습니다.
			}

			if(util.isFunc(poCallbackFunc)) poCallbackFunc(false);
			return false;
		}
		
		// 필수값 체크
		if(!util.validate(app, ["frfExtCsrShregAltAply", "frfCmnAddr", "frfCmnAddrGuard"])){
			if(util.isFunc(poCallbackFunc)) poCallbackFunc(false);
			return false;
		}
		
		var vsFileCnt 		= util.FreeForm.getValue(app, "frfExtCsrShregAltAply", "FILE_CNT");
		if(vsFileCnt =="0"|| vsFileCnt ==""){
			util.Msg.alert("NLS-CMM-M012");
			return false;
		}
		
		doSave(poCallbackFunc);
	};
	
	/**
	 * @desc 작업저장
	 * @param poCallbackFunc 콜백함수
	 * @return Boolean
	 * @author Choi In Seong 2016. 4. 4
	 */
	function doSave(poCallbackFunc) {

		//신규일 경우 fiag insert 로 변경
		if( moPage.mbIsInsertRowFrf && util.Grid.isModified(app, ["frfCmnAddr"], null)){
			//신규입력일 경우 신규 플래그 설정
			util.Grid.setRowState(app, "frfCmnAddr",cpr.data.tabledata.RowState.INSERTED,'1');
		}
		if( moPage.mbIsInsertRowFrfGuard && util.Grid.isModified(app, ["frfCmnAddrGuard"], null)){
			//신규입력일 경우 신규 플래그 설정
			util.Grid.setRowState(app, "frfCmnAddrGuard",cpr.data.tabledata.RowState.INSERTED,'1');
		}
		
		//save submission call
		//strCommand: save 
		util.Submit.send(app, "subSave", function(pbSuccessSave) {
				if(pbSuccessSave) {
					if(msPageDiv == "S"){
						var voCallBackSaveAfter = function(pbSuccessAfter) {
							if(pbSuccessAfter) {
								//저장성공 메세지 출력
								moPage.parentSendMsg("lblTitle", NLS.INF.M025);
																
								if(util.isFunc(poCallbackFunc))	poCallbackFunc(true);
							}
						};
						ExtSubPage.getParent().callScript("doSaveAfter", voCallBackSaveAfter);
					} else {
						//저장 후 바로 팝업을 닫는다.
						ExtPopUp.closeLayeredPopup("callbackExtCsrPAplyAbs", moPObject.moExtCsrAplyAbs);
					}
					return true;
				}else{
					return false;
				}
			}
		);
	};

	/**
	 * @desc 데이터 셋에 row 추가
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 4. 4
	 */
	function doSubInsertAbsRow() {
		util.FreeForm.setValue(app, "frfExtCsrShregAltAply",AppConstants.CUD_COL_REF, "N");
		
		util.Grid.setRowState(app, "frfExtCsrShregAltAply",cpr.data.tabledata.RowState.INSERTED,'1');
		//신규입력이 Ok
		moPage.mbIsInsertRowAbs = true;
		util.Control.setEnable(app, true, ["frfExtCsrShregAltAply"]);
	};
	
	/**
	 * @desc 데이터 셋에 row 추가
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 4. 4
	 */
	function doSubInsertRow() {
		util.FreeForm.setValue(app, "frfCmnAddr",AppConstants.CUD_COL_REF, "N");
		//프리폼 신규
		util.FreeForm.insertRow(app, "frfCmnAddr");
		//주소 ObjectId 셋팅
		util.FreeForm.setValue(app, "frfCmnAddr", "KEY_TAB_NM", msStudId);
		util.FreeForm.setValue(app, "frfCmnAddr", "USE_TAB_NM", msUseTabNm);
		util.FreeForm.setValue(app, "frfCmnAddr", "ADDR_PRP_DIV_RCD", "CB011BASE");
		util.FreeForm.setValue(app, "frfCmnAddr", "ST_DT", "19000101");
		util.FreeForm.setValue(app, "frfCmnAddr", "END_DT", "99991231");
		
		//상태 오픈 상태로 변경 :트리 변경시 변경사항 유무 체크 피하기 위함
		util.Grid.setRowState(app, "frfCmnAddr",cpr.data.tabledata.RowState.UNCHANGED,'1');
		//신규입력이 Ok
		moPage.mbIsInsertRowFrf = true;
		util.Control.setEnable(app, true, ["frfCmnAddr"]);
	};
	
	/**
	 * @desc 데이터 셋에 row 추가
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 4. 4
	 */
	function doSubInsertGuardRow() {
		util.FreeForm.setValue(app, "frfCmnAddrGuard",AppConstants.CUD_COL_REF, "N");
		//프리폼 신규
		util.FreeForm.insertRow(app, "frfCmnAddrGuard");
		//보호자 주소 ObjectId 셋팅
		util.FreeForm.setValue(app, "frfCmnAddrGuard", "KEY_TAB_NM", msStudId);
		util.FreeForm.setValue(app, "frfCmnAddrGuard", "USE_TAB_NM", msUseTabNm);
		util.FreeForm.setValue(app, "frfCmnAddrGuard", "ADDR_PRP_DIV_RCD", "CB011SPON");
		util.FreeForm.setValue(app, "frfCmnAddrGuard", "ST_DT", "19000101");
		util.FreeForm.setValue(app, "frfCmnAddrGuard", "END_DT", "99991231");
		
		//상태 오픈 상태로 변경 :트리 변경시 변경사항 유무 체크 피하기 위함
		util.Grid.setRowState(app, "frfCmnAddrGuard",cpr.data.tabledata.RowState.UNCHANGED,'1');
		//신규입력이 Ok
		moPage.mbIsInsertRowFrfGuard = true;
		util.Control.setEnable(app, true, ["frfCmnAddrGuard"]);
	};
	
	/**
	 * @desc 부모 헤더에 메세지 뿌리기
	 * @param psCtrlId 
	 * @param psMsgCode 
	 * @return void
	 * @author Choi In Seong 2016. 4. 4
	 */
	moPage.parentSendMsg = function(psCtrlId, psMsgCodeNm) {
		var vsMsg = ExtControl.getTextValue(psCtrlId);
		vsMsg     = "[" + vsMsg + "]";
	
		util.Msg.notify(app, vsMsg + psMsgCodeNm);	
	};
	
	/**
	 * @desc 저장 버튼 클릭
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 4. 4
	 */
	moPage.onClick_BtnSave = function() {
		doSubSave();
	};
	
	/**
	 * @desc 우편번호 팝업호출
	 * @param sender
	 * @return void
	 * @author Choi In Seong 2016. 4. 4
	 */
	moPage.onClick_BtnPopZipcodeSearch = function(sender) {
		//우편번호검색 돋보기버튼 Click 이벤트 
		doOnClickStdCmnPZipSearch(sender);
	}
	
	/**
	 * @desc 우편번호 팝업호출
	 * @param sender
	 * @return void
	 * @author Choi In Seong 2016. 4. 4
	 */
	moPage.onClick_BtnPopZipcodeSearchGuard = function(sender) {
		//우편번호검색 돋보기버튼 Click 이벤트 
		doOnClickStdCmnPZipSearch(sender);
	};
	
	
	/**
	 * @desc 파일업로드
	 * @param sender
	 * @return void
	 * @author Choi In Seong 2016. 4. 4
	 */
	moPage.onClick_BtnFileUpLoad = function(sender) {
		doOnClickStdCmnPFileUtil(sender);
	}
	
	/**
	 * @desc 팝업 닫기
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 4. 4
	 */
	moPage.onClick_BtnCloseCancel = function() {
		if(util.Grid.isModified(app, "", "CRM")){
			return false;
		}
		ExtPopUp.closeLayeredPopup("callbackExtCsrPAplyAbs", moPObject.moExtCsrAplyAbs);
	}
	
	/**
	 * @desc 현재일자와 입대일자 체크
	 *            현재일자와 입대일자의 간격이 7일을 초과하거나 입대일자가 현재일자보다 이전일 경우 입대일자 초기화
     *            복학예정일자 입대일자 체크
	 *            입대일자를 복학예정일 이후로 입력 불가
	 * @param sender
	 * @return void
	 * @author Choi In Seong 2016. 4. 4
	 */
	moPage.onValueChanged_IpbFrfCstDt = function() {
		var vsCstDt = util.Control.getValue(app, "ipbFrfCstDt");
		var vsCurDt = util.DataMap.getValue(app, "dmResOnLoad", "strKeyDate");
		var vsRtn = util.Control.getValue(app, "ipbFrfRtnDt");
		
		if(!ValueUtil.isNull(vsCstDt)){
			if(moPage.addZoreDate(vsCstDt) >= moPage.addZoreDate(vsRtn)){
				util.Control.setValue(app, "ipbFrfCstDt", "");
				util.Control.setFocus(app, "ipbFrfCstDt");
				util.Msg.alert("NLS-CSR-EXT027");
				return;
			}	
			
			if(moPage.addZoreDate(vsCstDt) < moPage.addZoreDate(vsCurDt) || 
			   moPage.getBeforeDate(vsCstDt) >= moPage.addZoreDate(vsCurDt)){
				util.Control.setValue(app, "ipbFrfCstDt", "");
				util.Control.setFocus(app, "ipbFrfCstDt");
				util.Msg.alert("NLS-CSR-EXT008");
				return;
			}			
		}
	};
	
	/**
	 * @desc 파라미터로 넘어온 날짜의 7일 전 날짜 반환
	 * @param keyDate
	 * @return void
	 * @author Choi In Seong 2016. 4. 4
	 */
	moPage.getBeforeDate = function(keyDate) {
		var y = keyDate.substring(0, 4);
		var m = keyDate.substring(4, 6);
		var d = keyDate.substring(6, 8);
		var befDt = new Date(y, m - 1, d - 7);
		var befDtYear = befDt.getFullYear().toString();
		var befDtMonth = eval(befDt.getMonth() + 1).toString();
		var befDtDate = befDt.getDate().toString();
		
		if (befDtMonth.length == 1) befDtMonth = "0" + befDtMonth;
		if (befDtDate.length == 1) befDtDate = "0" + befDtDate;
		
		var rtnBefDt = befDtYear + befDtMonth + befDtDate + "000000";
		return rtnBefDt;
	};
	
	/**
	 * @desc //입력받은 날짜에 초를 000000으로 세팅
	 * @param psDate 시분초를 추가할 날짜
	 * @return vsDate 시분초가 추가된 날짜
	 * @author Choi In Seong 2016. 4. 4
	 */
	moPage.addZoreDate = function(psDate) {
		var vsDate = psDate.substring(0, 8);
		vsDate += "000000";
		return vsDate;
	};
	return moPage;
};
