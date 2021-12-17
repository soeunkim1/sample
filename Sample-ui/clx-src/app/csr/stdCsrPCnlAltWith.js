//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./stdCsrPCnlAltWith.xtm"/>

var stdCsrPCnlAltWith = function() {
	var moPage = new Page();
	//임포트용 데이터 통신 오브젝트
	var moPObject = new PObject();

	/**
	 * @desc 헤더 온로드 실행
	 * @param 
	 * @return void
	 * @author 
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		doHeaderOnLoad();
	};
	
	/**
	 * @desc 팝업 닫기
	 * @param 
	 * @return void
	 * @author 
	 */
	moPage.onClick_BtnCloseCancel = function() {
		app.close();
	};	
	
	moPage.onModelConstructDone_StdCsrPCnlAltWith = function() {
		//리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init("frfCsrShregAlt");
		//화면 온로드 서브미션 호출
		doOnLoad();
		
	};
	
	
	
	/**
	 * @desc 부모창에서 받아온 변수 조회조건에 셋팅
	 *            페이지 로드 시, 최근 제적정보를 셋팅
	 * @param
	 * @return void
	 * @author Sunyoung ,Park 2016.02.25 
	 */
	function doOnLoad() {
		
		var voAltObj = ExtPopUp.getParentVal("moAltObj");
		
		// 부모멤버변수에담긴학번받음
		util.DataMap.setValue(app, "dmReqKey", "strStudNo", voAltObj["studNo"]);
		util.DataMap.setValue(app, "dmReqKey", "strHeaderCourse", voAltObj["headerCourse"]);
		util.DataMap.setValue(app, "dmReqKey", "strStudInfo", voAltObj["headerStud"]);
		
		//학생id 셋팅
		util.DataMap.setValue(app, "dmReqKey", "strStudId", voAltObj["studId"]);
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess) {
			if (pbSuccess) {
								
				// 학생의 학번정보를 화면에 입력
				util.Control.setValue(app, "optStudNo", voAltObj["studNo"]);
				util.Control.setValue(app, "optStud", voAltObj["headerStud"]);
				util.Control.setValue(app, "optCourse", voAltObj["headerCourse"]);
				
				util.Control.redraw(app, ["frfCsrShregAlt"]);
				
				var vsCancelDt = util.DataMap.getValue(app, "dmResOnLoad", "CurrentDate");
				
				// 취소일자 현재일자로 셋팅
				util.FreeForm.setValue(app, "frfCsrShregAlt", "CANCEL_DT", vsCancelDt);
				
				util.Control.redraw(app, ["cbbFrfCancelRsnRcd", "dipFrfCancelDt"]);
			} else {
				// 실패시 팝업 닫기
				ExtModel.dispatch("btnCloseCancel", "DOMActivate");
			}
		});
	}
	
	
	/**
	 * @desc 저장 SF에서 오류 메시지가 있으면 확인창 띄움.
	 * @param
	 * @return void
	 * @author Sunyoung ,Park 2016.02.25 
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
	 * @desc 제적취소  저장 버튼 event
	 * @param
	 * @return void
	 * @author Sunyoung ,Park 2016.02.25 
	 */
	moPage.onClick_BtnSave = function() {
		// 리피터 변경사항 체크
		if(!util.Grid.isModified(app, ["frfCsrShregAlt"], "MSG")){
			return false;
		}
		//리피트 validation check
		if(!util.validate(app, ["frfCsrShregAlt"])){
			return false;
		}
		
		util.DataMap.setValue(app, "dmReqKey", "strPopTarget", "stdCsrPCnlAltWith");
		//strCommand: popupMnu 
		util.Submit.send(app, "subMstAltPopupMnu", function(pbSuccess){
			if (pbSuccess) {
				doSave();
			}
		});
	};
	
	return moPage;
};
