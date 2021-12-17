//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./stdCsrPCnlAltReEn.xtm"/>

var stdCsrPCnlAltReEn = function() {
	var moPage = new Page();
	//임포트용 데이터 통신 오브젝트
	var moPObject = new PObject();

	/**
	 * @desc 헤더 온로드 실행
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 2. 23.
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		doHeaderOnLoad();
	};
	
	/**
	 * @desc 팝업 닫기
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 2. 23.
	 */
	moPage.onClick_BtnCloseCancel = function() {
		app.close();
	};
	
	/**
	 * @desc onModelConstructDone 이벤트
	 * @param 
	 * @return void
	 * @author	 Choi In Seong 2016. 2. 23.
	 */
	moPage.onModelConstructDone_StdCsrPCnlAltReEn = function() {
		//리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["frfCsrShregAltWith","frfCsrShregAltRe","frfCsrEnroll"]);
		//화면 온로드 서브미션 호출
		doOnLoad();
	};
	
	/**
	 * @desc 프리폼 신규 생성
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 2. 23
	 */
	function doSubInsertRow(vsFrfId) {
		util.FreeForm.setValue(app, vsFrfId, AppConstants.CUD_COL_REF, "I");
		//프리폼 신규
		util.FreeForm.insertRow(app, vsFrfId);
		var vsStudId = util.DataMap.getValue(app, "dmReqKey", "strStudId");
		//학생 ObjectId 셋팅
		util.FreeForm.setValue(app, vsFrfId, "STUD_ID", vsStudId);
		util.Grid.setRowState(app, vsFrfId, cpr.data.tabledata.RowState.INSERTED,1);
		//신규입력이 Ok
		util.Control.setEnable(app, true, [vsFrfId]);
	};
	
	/**
	 * @desc  화면 온로드 제적정보조회, 공통코드 셋팅
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 02. 23.
	 */
	function doOnLoad() {
		
		var voAltObj = ExtPopUp.getParentVal("moAltObj");
		
		// 부모멤버변수에담긴학번받음
		util.DataMap.setValue(app, "dmReqKey", "strStudNo", voAltObj["studNo"]);
		util.DataMap.setValue(app, "dmReqKey", "strHeaderCourse", voAltObj["headerCourse"]);
		util.DataMap.setValue(app, "dmReqKey", "strStudInfo", voAltObj["headerStud"]);
		util.DataMap.setValue(app, "dmReqKey", "strStudId", voAltObj["studId"]);
		
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function (pbSuccess) {
			if (pbSuccess){
				util.Control.redraw(app, ["frfCsrShregAltWith", "frfCsrShregAltRe", "frfCsrEnroll"]);
				
				// 학생의 학번정보를 화면에 입력
				util.Control.setValue(app, "optStudNo", voAltObj["studNo"]);
				util.Control.setValue(app, "optStud", voAltObj["headerStud"]);
				util.Control.setValue(app, "optCourse", voAltObj["headerCourse"]);

				// 학적변동일 Set: 취소일 초기 현재일 Setting
				var vsCnlDt = util.DataMap.getValue(app, "dmResOnLoad", "cnlDt");
				util.FreeForm.setValue(app, "frfCsrShregAltRe", "CANCEL_DT", vsCnlDt);
				
			}else{
				ExtModel.dispatch("btnCloseCancel", "DOMActivate");
			}			
		});
	};
	
	 /**
	 * @desc 저장 SF에서 오류 메시지가 있으면 확인창 띄움.
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 02. 19.
	 */
	function doSave(pnStep) {
		if (!pnStep) {
			pnStep = "0";
		}
		
		util.DataMap.setValue(app, "dmInteractiveMsg", "intStep", pnStep);
		
		//strCommand: save 
		util.Submit.send(app, "subSave", function(pbSuccess) {
			if (pbSuccess) {
				var vsMsg = util.DataMap.getValue(app, "dmInteractiveMsg", "strMsg");
				if (vsMsg != "") {
					// @1\n  계속하시겠습니까?
					if (util.Msg.confirm("NLS-CRM-M034", [vsMsg]) ) {
						var vnStep = util.DataMap.getValue(app, "dmInteractiveMsg", "intStep");
						return doSave(vnStep);
					} else {
						return false;
					}
				} else {
					//부모창 목록 재조회
					//팝업창 닫기
					ExtPopUp.closeLayeredPopup("doPopCallList");
					return true;
				}
			}else{
				return false;
			}
		});
	};	
	
	/**
	 * @desc 재입학신규 저장 버튼 event
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 2. 17.
	 */
	moPage.onClick_BtnSave = function() {
		//리피트 validation check
		if(!util.validate(app, ["frfCsrShregAltRe"])){
			return false;
		}
		
		util.DataMap.setValue(app, "dmReqKey", "strPopTarget", "stdCsrPCnlAltReEn");
		//strCommand: popupMnu 
		util.Submit.send(app, "subMstAltPopupMnu", function(pbSuccess){
			if (pbSuccess) {
				doSave();
			}
		});
	};
	
	return moPage;
};
