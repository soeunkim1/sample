//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCsrCStudBase.xtm"/>


var extCsrCStudBase = function() {
	var moPage = new Page();
	var moPObject 	= new PObject();
		
	/********************************
	 * 사용자 정의 메소드, 변수
	 *******************************/
	var msStudId = "";
	var msUseTabNm = "";
	
	/********************************
	 * 폼 신규 상태 체크 
	 *******************************/
	moPage.mbIsInsertRowFrf = false;
	moPage.mbIsInsertRowFrfGuard = false;
	
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
	
	moPage.onLoadImportDone_impSbpHeader = function() {
		doSbpHeaderOnLoad();
	};
	
	moPage.onModelConstructDone_StdCsrCMstBase = function() {
		doOnLoad();
	};
	
	/**
	 * @desc 프리폼 변경여부 반환
	 * @param 
	 * @return boolean 변경여부
	 * @author Choi In Seong 2016. 3. 28
	 */
	function doCheckDataChange() {

		if(util.Grid.isModified(app, ["frfCmnAddr"], "CRM") || util.Grid.isModified(app, ["frfCmnAddrGuard"], "CRM")){
			return false;
		}else{
			return true;
		}
		
	}
	
	/**
	 * @desc doOnLoad 화면 초기화
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 3. 28
	 */
	function doOnLoad(){
		
		//리피트 초기화
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["frfCsrShreg", "frfCsrEntrInfo", "frfCmnAddr", "frfCmnAddrGuard"]);
		
		//암호화 관련 컬럼 Origin 데이터 설정
		ExtRepeat.addOriginCol("frfCsrShreg", ["SSN", "ACCT_NO"]);
		
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess) {
			if (pbSuccess) {
				
				
				// 부모멤버변수에담긴학번받음
				msStudId = moPage.parent.moParentObj.studId;
				msUseTabNm = moPage.parent.moParentObj.USE_TAB_NM;
				
				util.DataMap.setValue(app, "dmReqList", "strStudId", msStudId);
				util.DataMap.setValue(app, "dmReqList", "strUseTabNm", msUseTabNm);
				util.DataMap.setValue(app, "dmReqList", "strKeyDate", moPage.parent.moParentObj.keyDate);
		
				//기본정보, 주소정보 조회
				doList(function(pbSuccess) {
					if (pbSuccess) {
						util.Control.redraw(app, ["frfCsrShreg", "frfCsrEntrInfo","frfCmnAddr", "frfCmnAddrGuard"]);
						// 조회 : "조회되었습니다." header 메세지 표시
						if(pbSuccess) moPage.parentSendMsg("lblTitle", NLS.INF.M024);
					}
				});
			}
		});
	}
	
	/**
	 * @desc 해당 학생의 기본정보, 주소정보 데이터를 가져온다.
	 * @param poFunc 콜백함수
	 * @return void
	 * @author Choi In Seong 2016. 3. 28
	 */
	function doList(poFunc) {
		
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess) {
			if (pbSuccess) {
				
				
				util.Control.redraw(app, ["frfCsrShreg","frfCsrEntrInfo","frfCmnAddr", "frfCmnAddrGuard"]);
				
				// 입학동기의 값이 존재하는 경우, 수정할 수 없도록 처리 (2016.11.23 )
				var vEntrMotive = util.DataMap.getValue(app, "dmFrfCsrEntrInfo", "ENTR_MOTIVE_RCD"); 
				
				if (vEntrMotive != "" ) 
				{ 	// 기타인 경우에만 텍스트창이 보이도록 
					if (vEntrMotive == "CSR00199" ) {
						util.Control.setVisible(app, true, ["ipbEntrMotive"]);
					}else{
						util.Control.setVisible(app, false, ["ipbEntrMotive"]);
					}
					util.Control.setEnable(app, false, ["frfCsrEntrInfo"]);
				}else{					
					util.Control.setEnable(app, true, ["frfCsrEntrInfo"]);
				}			
				
				// 기본주소 데이터 존재여부 체크
				var vsRowCnt = util.DataMap.getValue(app, "dmResList", "rowAddrCnt");
				if (vsRowCnt == "0") {
					doSubInsertRow(); 
				}else{
					moPage.mbIsInsertRowFrf = false;
					util.Control.setEnable(app, true, ["frfCmnAddr"]);
				}
				
				// 보호자주소 데이터 존재여부 체크
				var vsRowGuardCnt = util.DataMap.getValue(app, "dmResList", "rowGuardCnt");
				if (vsRowGuardCnt == "0") {
					doSubInsertGuardRow();
				}else{
					moPage.mbIsInsertRowFrfGuard = false;
					util.Control.setEnable(app, true, ["frfCmnAddrGuard"]);
				}
			}
			// 조회 후 콜백함수 수행
			if (util.isFunc(poFunc)) poFunc(pbSuccess);
		});
	};
	
	/**
	 * @desc 작업저장
	 * @param poCallbackFunc 콜백함수
	 * @return Boolean
	 * @author Choi In Seong 2016. 3. 28
	 */
	function doSubSave(poCallbackFunc) {
		
		
		var vEntrMotive = util.DataMap.getValue(app, "dmFrfCsrEntrInfo", "ENTR_MOTIVE_RCD"); 
		if (vEntrMotive =="" ) {
						util.Msg.alert("입학동기를 입력하여주십시오.");
						return false; 
		}
		
		// 필수값 체크
		if(!util.validate(app, ["frfCsrShreg", "frfCsrEntrInfo", "frfCmnAddr", "frfCmnAddrGuard"])){
			if(util.isFunc(poCallbackFunc)) poCallbackFunc(false);
			return false;
		}
		
		// 프리폼 변경사항 체크
		if(!(util.Grid.isModified(app, ["frfCsrShreg"], null)
			||util.Grid.isModified(app, ["frfCsrEntrInfo"], null)
			||util.Grid.isModified(app, ["frfCmnAddr"], null)
			||util.Grid.isModified(app, ["frfCmnAddrGuard"], null)
		)){
			moPage.parentSendMsg("lblTitle",NLS.WRN.M007);
			if(util.isFunc(poCallbackFunc)) poCallbackFunc(false);
			return false;
		}
		
		doSave(poCallbackFunc);
	};
	
	/**
	 * @desc 작업저장
	 * @param poCallbackFunc 콜백함수
	 * @return Boolean
	 * @author Choi In Seong 2016. 3. 28
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
					var voCallBackSaveAfter = function(pbSuccessAfter) {
						if(pbSuccessAfter) {
							//저장성공 메세지 출력
							moPage.parentSendMsg("lblTitle", NLS.INF.M025);
															
							if(util.isFunc(poCallbackFunc))	poCallbackFunc(true);
						}
					};
					ExtSubPage.getParent().callScript("doSaveAfter", voCallBackSaveAfter);
					
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
	 * @author Choi In Seong 2016. 3. 28
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
	 * @author Choi In Seong 2016. 3. 28
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
	 * @author Choi In Seong 2016. 3. 28
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
	 * @author Choi In Seong 2016. 3. 28
	 */
	moPage.onClick_BtnSave = function() {
		doSubSave();
	};
	
	/**
	 * @desc 우편번호 팝업호출
	 * @param sender
	 * @return void
	 * @author Choi In Seong 2016. 3. 28
	 */
	moPage.onClick_BtnPopZipcodeSearch = function(sender) {
		//우편번호검색 돋보기버튼 Click 이벤트 
		doOnClickStdCmnPZipSearch(sender);
	}
	
	/**
	 * @desc 우편번호 팝업호출
	 * @param sender
	 * @return void
	 * @author Choi In Seong 2016. 3. 28
	 */
	moPage.onClick_BtnPopZipcodeSearchGuard = function(sender) {
		//우편번호검색 돋보기버튼 Click 이벤트 
		doOnClickStdCmnPZipSearch(sender);
	};
	
	
	moPage.onValueChanged_CbbFrfMotive = function() {
		
		var vEntrMotive = util.DataMap.getValue(app, "dmFrfCsrEntrInfo", "ENTR_MOTIVE_RCD"); 
	// 기타인 경우에만 텍스트창이 보이도록 
			if (vEntrMotive == "CSR00199" ) {
				util.Control.setVisible(app, true, ["ipbEntrMotive"]);
			}else{
				util.Control.setVisible(app, false, ["ipbEntrMotive"]);
			}
			
	};
	return moPage;
};
