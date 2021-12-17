//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./stdCsrCHandicapInfo.xtm"/>


var stdCsrCHandicapInfo = function() {
	var moPage = new Page();
	
	/********************************
	 * 사용자 정의 메소드, 변수
	 *******************************/
	var msStudId = "";
	
	/********************************
	 * 폼 신규 상태 체크 
	 *******************************/
	moPage.mbIsInsertRowFrf = false;
	
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
	 * @author Choi In Seong 2016. 3. 3
	 */
	function doCheckDataChange() {

		if(util.Grid.isModified(app, ["frfCsrHandicap"], "CRM") ){
			return false;
		}else{
			return true;
		}
		
	}
	
	/**
	 * @desc doOnLoad 화면 초기화
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 3. 3
	 */
	function doOnLoad(){
		//리피트 초기화
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["frfCsrHandicap"]);
		
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess) {
			if (pbSuccess) {
				
				util.Control.redraw(app, ["frfCsrHandicap","cbbFrfHdcGrdRcd"]);
				
				// 부모멤버변수에담긴학번받음
				msStudId = moPage.parent.moParentObj.studId;
				
				util.DataMap.setValue(app, "dmReqList", "strStudId", msStudId);
				
				//장애정보 조회
				doList(function(pbSuccess) {
					if (pbSuccess) {
						// 조회 : "조회되었습니다." header 메세지 표시
						if(pbSuccess) moPage.parentSendMsg("lblTitlefrfCsrHandicap", NLS.INF.M024);
					}
				});
			}
		});
	}
	
	/**
	 * @desc 해당 학생의 장애정보 데이터를 가져온다.
	 * @param poFunc 콜백함수
	 * @return void
	 * @author Choi In Seong 2016. 3. 3
	 */
	function doList(poFunc) {
		
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess) {
			if (pbSuccess) {
				
				util.Control.redraw(app, ["frfCsrHandicap"]);
				
				var vsRowCnt = util.DataMap.getValue(app, "dmResList", "rowCnt");
				if (vsRowCnt == "0") {
					doSubInsertRow();
				}else{
					moPage.mbIsInsertRowFrf = false;
					util.Control.setEnable(app, true, ["frfCsrEntrInfoList"]);
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
	 * @author Choi In Seong 2016. 3. 3
	 */
	function doSubSave(poCallbackFunc) {

		// 프리폼 변경사항 체크
		if(!util.Grid.isModified(app, ["frfCsrHandicap"], null)){
			moPage.parentSendMsg("lblTitlefrfCsrHandicap",NLS.WRN.M007);
			if(util.isFunc(poCallbackFunc)) poCallbackFunc(false);
			return false;
		}
		
		// 필수값 체크
		if(!util.validate(app, "frfCsrHandicap")){
			if(util.isFunc(poCallbackFunc)) poCallbackFunc(false);
			return false;
		}
		
		doSave(poCallbackFunc);
	};
	
	/**
	 * @desc 작업저장
	 * @param poCallbackFunc 콜백함수
	 * @return Boolean
	 * @author Choi In Seong 2016. 3. 3
	 */
	function doSave(poCallbackFunc) {

		//신규일 경우 fiag insert 로 변경
		if( moPage.mbIsInsertRowFrf ){
			//신규입력일 경우 신규 플래그 설정
			util.Grid.setRowState(app, "frfCsrHandicap",cpr.data.tabledata.RowState.INSERTED,'1');
		}
		
		//save submission call
		//strCommand: save 
		util.Submit.send(app, "subSave", function(pbSuccessSave) {
				if(pbSuccessSave) {
					var voCallBackSaveAfter = function(pbSuccessAfter) {
						if(pbSuccessAfter) {
							//저장성공 메세지 출력
							moPage.parentSendMsg("lblTitlefrfCsrHandicap", NLS.INF.M025);
															
							if(util.isFunc(poCallbackFunc))	poCallbackFunc(true);
						}
					};
					doList(voCallBackSaveAfter);
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
	 * @author Choi In Seong 2016. 3. 3
	 */
	function doSubInsertRow() {
		util.FreeForm.setValue(app, "frfCsrHandicap",AppConstants.CUD_COL_REF, "N");
		//vcRpt.setCellVal(vnInsRowIdx, AppConstants.CUD_COL_REF, "N", true, true);
		//프리폼 신규
		util.FreeForm.insertRow(app, "frfCsrHandicap");
		//학생 ObjectId 셋팅
		util.FreeForm.setValue(app, "frfCsrHandicap", "STUD_ID", msStudId);
		//상태 오픈 상태로 변경 :트리 변경시 변경사항 유무 체크 피하기 위함
		util.Grid.setRowState(app, "frfCsrHandicap",cpr.data.tabledata.RowState.UNCHANGED,'1');
		//신규입력이 Ok
		moPage.mbIsInsertRowFrf = true;
		util.Control.setEnable(app, true, ["frfCsrHandicap"]);

		
	};
	
	/**
	 * @desc 부모 헤더에 메세지 뿌리기
	 * @param psCtrlId 
	 * @param psMsgCode 
	 * @return void
	 * @author Choi In Seong 2016. 3. 3
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
	 * @author Choi In Seong 2016. 3. 3
	 */
	moPage.onClick_BtnSave = function() {
		doSubSave();
	};
	
	/**
	 * @desc 장애정도 유효성 체크
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 3. 3
	 */
	moPage.onValueChanged_IpbFrfHdcDeg = function() {
		ValidUtil.checkIntegerDecimal("ipbFrfHdcDeg", 1, 3, true);
	};
	
	/**
	 * @desc 장애정보 삭제
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 3. 3
	 */
	moPage.onClick_BtnDel = function() {
		
		var vsLabel = ExtControl.getTextValue("lblTitlefrfCsrHandicap");
		
		//신규일 경우 삭제 불가 처리 
		if (moPage.mbIsInsertRowFrf) {
			//삭제할 데이터가 없습니다. 
			moPage.parentSendMsg("lblTitlefrfCsrHandicap", NLS.INF.M005);
			return;
		}else{
			util.Grid.deleteRow(app, "frfCsrHandicap");
			//삭제버튼 상태변경
			util.Control.setEnable(app, false, ["frfCsrHandicap"]);	
		}
	}
	
	/**
	 * @desc 장애정보 작업취소
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 3. 3
	 */
	moPage.onClick_BtnRestore = function() {
		util.Grid.restoreRow(app, "frfCsrHandicap");
		util.Control.setEnable(app, true, ["frfCsrHandicap"]);
		
		var vsRowCnt = util.DataMap.getValue(app, "dmResList", "rowCnt");
			if (vsRowCnt == "0") {
				doSubInsertRow();
			}
		}
	return moPage;
};
