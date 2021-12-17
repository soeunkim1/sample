//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCsrCAltEnrollRtn.xtm"/>

var extCsrCAltEnrollRtn = function() {
	var moPage = new Page();
	//임포트용 데이터 통신 오브젝트
	var moPObject = new PObject();
	/********************************
	 * 폼 신규 상태 체크 
	 *******************************/
	moPage.mbIsInsertRowFrf = false;
	

	moPage.onModelConstructDone_ExtCsrCAltEnrollRtn = function() {
		//리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["frfCsrShregAlt"]);
		//화면 온로드 서브미션 호출
		doOnLoad();
		
	};
		
	function doOnLoad() {
		var voAltObj = moPage.parent.moParentObj;

			// 부모멤버변수에담긴학번받음
			util.DataMap.setValue(app, "dmReqKey", "strSchYearRcd", voAltObj.strSchYearRcd);
			util.DataMap.setValue(app, "dmReqKey", "strSmtRcd", voAltObj.strSmtRcd);
			util.DataMap.setValue(app, "dmReqKey", "strStudId", voAltObj.strStudId);
			util.DataMap.setValue(app, "dmReqKey", "strRtnSchYearRcd", voAltObj.strSchYearRcd);
			util.DataMap.setValue(app, "dmReqKey", "strRtnSmtRcd", voAltObj.strSmtRcd);
			util.DataMap.setValue(app, "dmReqKey", "strAltRsnRcd",voAltObj.strAltRsnRcd);
			util.DataMap.setValue(app, "dmReqKey", "strAltDt", voAltObj.strAltDt);
			
			//strCommand: onLoad 
			util.Submit.send(app, "subOnLoad", function (pbSuccess) {
				if (pbSuccess){				
					
					util.Control.redraw(app, ["cbbFrfClassRcd","cbbFrfAltRsnRcdRtn","cbbFrfTranRegRcd",""]);
									
					//신규입력이 아님
					moPage.mbIsInsertRowFrf = false;
					if(ValueUtil.isNull(voAltObj.strStudId)){
						util.Control.setEnable(app, false, ["grp_frfCsrShregAlt","btnSave"]);
					}
				}
			})
	};
	
	
	
	/**
	 * @desc 조회 내역이 없을시 신규
	 * @param
	 * @return void
	 * @author	 Choi In Seong 2016. 10. 11.
	 */
	function doNewAlt() {
		
		var voAltObj = moPage.parent.moParentObj;
		util.DataMap.setValue(app, "dmReqKey", "strStudId", voAltObj.strStudId );
		
		if(!ValueUtil.isNull(voAltObj.strStudId)){
		
			util.DataMap.setValue(app, "dmReqKey", "strPopTarget", "stdCsrPMstAltRtn");
			//strCommand: popupMnu 
			util.Submit.send(app, "subMstAltPopupMnu", function(pbSuccess){
			if (pbSuccess) {
					util.FreeForm.setValue(app, "frfCsrShregAlt",AppConstants.CUD_COL_REF, "I");
					//프리폼 신규
					util.FreeForm.insertRow(app, "frfCsrShregAlt");
					
					util.Control.setEnable(app, false, ["cbbFrfRegTransRcd"]);
					util.Grid.setRowState(app, "frfCsrShregAlt",cpr.data.tabledata.RowState.INSERTED,1);
					//ExtRepeat.setRowStatus("frfCsrShregAlt","open",'1');
					moPage.mbIsInsertRowFrf = true;
										
					//신규입력이 Ok0
					util.Control.setEnable(app, true, ["grp_frfCsrShregAlt",  "btnSave"]);
					// 신규
					
					//strCommand: list 
					util.Submit.send(app, "subList", function (pbSuccess) {
						if (pbSuccess){				
							
							util.Control.redraw(app, ["frfCsrShregAlt","frfCsrSmtGiveUp"]);
							doSaChgChk();				
															
						}
					});		
															
				}else{
						util.Control.setEnable(app, false, ["grp_frfCsrShregAlt","btnSave"]);
				}
			});
		}
	}
	
	/********************************
	 * 사용자 정의 메소드, 변수
	 *******************************/
	var vbSaChgChk = false;
	
	/**
	 * @desc 변경여부 반환
	 * @param 
	 * @return boolean 변경여부
	 * @author Choi In Seong 2016. 2. 26
	 */
	function doCheckDataChange() {
		if(util.Grid.isModified(app, ["frfCsrShregAlt"], "CRM") ){
			return false;
		}else{
			return true;
		}
	};
	
	 
	/**
	 * @desc  학사부서 변경이력(통폐합) 유무 체크한다.
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 02. 19.
	 */
	function doSaChgChk() {
		// 학사부서 변경이력 유무 체크.
		var vnChgListCnt = util.DataSet.getRowCount(app, "dsExpSaList");
		if (vnChgListCnt > 0) {
			vbSaChgChk = true;
		}else{
			vbSaChgChk = false;
		}
		
		if (vbSaChgChk) {
			// 학사부서 변경이력이 있으면.			
			util.Control.setEnable(app, true, ["cbbFrfSaSpCdEnr"]);
			
			
			// 학적등록정보(주전공등록으로), 이수과정구분(전공으로) Setting.
			util.DataMap.setValue(app, "dmRptCsrEnroll", "ENROLL_DIV_RCD", "CT103MAIN");
			util.DataMap.setValue(app, "dmRptCsrEnroll", "SP_DIV_RCD", "CA10701");			
			//퍠과 처리일자는 표준학기의 시작일로 설정
			var vsChgDt = util.DataMap.getValue(app, "dmResOnLoad", "chgDt");
			util.DataMap.setValue(app, "dmRptCsrEnroll", "ST_DT", vsChgDt);			
			util.DataMap.setValue(app, "dmRptCsrEnroll", "END_DT", "99991231000000");
			
		} else {
			// 학적등록 FreeForm 전체 비활성화.
			util.Control.setEnable(app, false, ["cbbFrfSaSpCdEnr"] );
			
			// 학생의 원소속
			var vsOrgSaCd = util.DataMap.getValue(app, "dmReqKey", "strOrgSaCd");
			util.DataMap.setValue(app, "dmReqKey", "strSaCd", vsOrgSaCd);
		}
	};

	
	 /**
	 * @desc 학사부서 선택시, 이수과정 LIST, 행정부서 SETTING
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 02. 19.
	 */
	function doGetSpList() {
		
		var vsSaCd = util.FreeForm.getValue(app, "frfCsrShregAlt", "SA_CD");
		util.DataMap.setValue(app, "dmReqKey", "strSaCd", vsSaCd);
		
		//strCommand: selCourse 
		util.Submit.send(app, "subSelCourse", function(pbSuccess) {
			if(pbSuccess){
				var vsOgCd = util.DataMap.getValue(app, "dmResOnLoad", "ogCd");
				var vsOgNm = util.DataMap.getValue(app, "dmResOnLoad", "ogNm");
				
				//학과부서, 이수과정 필수값 
				util.Control.setUserAttr(app, "cbbFrfSaCdEnr", "require", "Y");
				ExtControl.setAttr("cbbFrfSaCdEnr", "class", "cbbSchReq");
				ExtControl.setAttr("lblFrfSaCdEnr", "class", "lblSchReq");
				
				util.Control.setUserAttr(app, "cbbFrfSpCdEnr", "require", "Y");
				ExtControl.setAttr("cbbFrfSpCdEnr", "class", "cbbSchReq");
				ExtControl.setAttr("lblFrfSpCdEnr", "class", "lblSchReq");
				
				util.FreeForm.setValue(app, "frfCsrShregAlt", "OG_CD", vsOgCd);
				util.FreeForm.setValue(app, "frfCsrShregAlt", "OG_NM", vsOgNm);
				util.FreeForm.setValue(app, "frfCsrShregAlt", "SP_CD", "");
				util.Control.redraw(app, ["cbbFrfSpCdEnr", "ipbFrfOgNmEnr", "ipbFrfOgCd"]);
			} else {
				util.FreeForm.setValue(app, "frfCsrShregAlt", "SP_CD", "");
				util.FreeForm.setValue(app, "frfCsrShregAlt", "OG_CD", "");
				util.FreeForm.setValue(app, "frfCsrShregAlt", "OG_NM", "");
				//학과부서, 이수과정 필수값 해제
				util.Control.setUserAttr(app, "cbbFrfSaCdEnr", "require", "notNull=no");
				ExtControl.setAttr("cbbFrfSaCdEnr", "class", "cbbSch");
				ExtControl.setAttr("lblFrfSaCdEnr", "class", "lblSch");
				
				util.Control.setUserAttr(app, "cbbFrfSpCdEnr", "require", "notNull=no");
				ExtControl.setAttr("cbbFrfSpCdEnr", "class", "cbbSch");
				ExtControl.setAttr("lblFrfSpCdEnr", "class", "lblSch");
				util.Control.redraw(app, ["cbbFrfSpCdEnr", "ipbFrfOgNmEnr", "ipbFrfOgCd"]);
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
		
		var vsSaChg = (vbSaChgChk)? "1":"0";	
		
		util.DataMap.setValue(app, "dmInteractiveMsg", "intStep", pnStep);
		util.DataMap.setValue(app, "dmReqSave", "strSaChg", vsSaChg);
		
		//strCommand: save 
		util.Submit.send(app, "subSave", function(pbSuccess) {		
			if (pbSuccess) {
				var vsMsg = util.DataMap.getValue(app, "dmInteractiveMsg", "strMsg");
				if (vsMsg != "") {
					// @1\n  계속하시겠습니까?
					if (util.Msg.confirm("NLS-CRM-M034", [vsMsg]) ) {
						var vnStep = util.DataMap.getValue(app, "dmInteractiveMsg", "intStep");
						return doSave(vnStep, poCallbackFunc);
					} else {
						return false;		
					}
				}else{
					var voCallBackSaveAfter = function(pbSuccess) {
						if(pbSuccess) {
							//저장성공 메세지 출력
							// 조회 : "조회되었습니다." header 메세지 표시
							moPage.parentSendMsg(NLS.INF.M025);
							doDataClear();
							util.Control.setEnable(app, false, ["grp_frfCsrShregAlt", "btnSave"]);
						}
						if(util.isFunc(poCallbackFunc))	poCallbackFunc(pbSuccessList);
					};
					doDataClear();
					util.Control.setEnable(app, false, ["grp_frfCsrShregAlt","btnSave"]);
					
					ExtSubPage.getParent().callScript("doSaveAfter", voCallBackSaveAfter);
				}
			}else{
				return false;
			}
		});
		
	};	
	
	
	/**
	 * @desc 복학신규 저장 버튼 event
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 2. 17.
	 */
	moPage.onClick_BtnSave = function() {
				
		var voAltObj = moPage.parent.moParentObj;
		
		
		// 리피터 변경사항 체크
		if(!util.Grid.isModified(app, ["frfCsrShregAlt"], null)){
			moPage.parentSendMsg("lblTitleRptCsrShregAlt",NLS.WRN.M007);
			if(util.isFunc(poCallbackFunc)) poCallbackFunc(false);
			return false;
		}
		//리피트 validation check
		if(!util.validate(app, ["frfCsrShregAlt"])){
			if(util.isFunc(poCallbackFunc)) poCallbackFunc(false);
			return false;
		}
		
		util.DataMap.setValue(app, "dmRptCsrShregAlt", "ENROLL_DIV_RCD", "CT103MAIN");
		util.DataMap.setValue(app, "dmRptCsrShregAlt", "SP_DIV_RCD", "CA10701");
		util.DataMap.setValue(app, "dmRptCsrShregAlt", "STUD_ID", voAltObj.strStudId);
		
//		if (vbSaChgChk) {
////			var vsSaCd = ExtFreeForm.getValue("rptCsrShregAlt", "SA_CD");
//			var vsSaCd = ExtInstance.getValue("/root/resList/rptCsrShregAlt/SA_CD");
//			if(!ValueUtil.isNull(vsSaCd)){
//				//리피트 validation check
//				if(ValueUtil.isNull(ExtInstance.getValue("/root/resList/rptCsrShregAlt/SP_CD"))){
//					ComMsg.alert("이수과정은 필수항목입니다.");  // 필수항목체크 변경 (2016.12.7)
//					
//					return false;
//				}
//			}
//			
//		} 
		
		util.DataMap.setValue(app, "dmReqKey", "strPopTarget", "stdCsrPMstAltRtn");
		//strCommand: popupMnu 
		util.Submit.send(app, "subMstAltPopupMnu", function(pbSuccess){
			if (pbSuccess) {
				doSave();
			}
		});
	};

	moPage.onValueChanged_CbbFrfSaCdEnr = function() {
		//var vsSaCd = ExtFreeForm.getValue("frfCsrShregAlt", "SA_CD");
		
		//if ( vsSaCd == "" ) { 
		//	//학과부서, 이수과정 필수값 해제
		//	ExtControl.setAttr("cbbFrfSaCdEnr", "udattr", "notNull=no");
		//	ExtControl.setAttr("cbbFrfSaCdEnr", "class", "cbbSch");
		//	ExtControl.setAttr("lblFrfSaCdEnr", "class", "lblSch");
		//	
		//	ExtControl.setAttr("cbbFrfSpCdEnr", "udattr", "notNull=no");
		//	ExtControl.setAttr("cbbFrfSpCdEnr", "class", "cbbSch");
		//	ExtControl.setAttr("lblFrfSpCdEnr", "class", "lblSch");
		//}else{
		//	moPage.doGetSpList();
		//}
	}
	
	
	moPage.onLoadImportDone_ImpSbpHeader = function() {
		doSbpHeaderOnLoad();
	}
	
	
	
	/**
	 * @desc 복학- 학기취소 버튼 event
	 * @param
	 * @return void
	 * @author 박선영 2016.10.31 
	*/
	moPage.onClick_BtnSaveSmtGiveUp = function() {
		
		var voAltObj = moPage.parent.moParentObj;
		var vsBtnNm = ExtControl.getTextValue("btnSaveSmtGiveUp");
		
		// @1\n  계속하시겠습니까?
		if (util.Msg.confirm("NLS-CRM-M034", [vsBtnNm]) ) {
			
			if(!ValueUtil.isNull(voAltObj.strStudId)){	
					//strCommand: giveUp 
					util.Submit.send(app, "subGvpProc", function(pbSuccess){
						if (pbSuccess) {							
							moPage.getGvupInfo();
						}
					});
			}
		}
	};
	
	

	/**
	 * @desc 프리폼 초기화
	 * @param
	 * @return void
	 * @author	 Choi In Seong 2016. 10. 11.
	 */
	function doDataClear() {
		util.Control.reset(app, ["frfCsrShregAlt","frfCsrSmtGiveUp"]);
	};
	
	/**
	 * @desc 학기포기 정보 재조회
	 * @param
	 * @return void
	 * @author Choi Kyung Min 2016. 10. 26
	 */
	moPage.getGvupInfo = function(){
			
		
		//strCommand: getGvupInfo 
		util.Submit.send(app, "subGvupInfo", function(pbSuccess) {
			if(pbSuccess){
				util.FreeForm.setValue(app, "frfCsrSmtGiveUp", "PRE_SHYR", util.DataMap.getValue(app, "dmResList", "strPreShyr"));
				util.FreeForm.setValue(app, "frfCsrSmtGiveUp", "CHG_SHYR", util.DataMap.getValue(app, "dmResList", "strChgShyr"));
				util.FreeForm.setValue(app, "frfCsrSmtGiveUp", "GVUP_CNT", util.DataMap.getValue(app, "dmResList", "strGvupCnt"));
				
			} 
		});
	};
	
	/**
	 * @desc 부모 헤더에 메세지 뿌리기
	 * @param psCtrlId 리피트 라벨 id
	 * @param psMsgCode 메시지
	 * @return void
	 * @author Choi In Seong 2016. 1. 20
	 */
	moPage.parentSendMsg = function(psMsgCodeNm) {
		util.Msg.notify(app, psMsgCodeNm);	
	};
	
	
	
	/**
	 * @desc 통폐합이력가져오는 부분변경 
	 * @param 
	 * @param 
	 * @return void
	 * @author Sunyoung park 2017.1.3 
	 */
	moPage.onValueChanged_CbbFrfSaSpCdEnr = function() {
				
		var vsSpCd = util.FreeForm.getValue(app, "frfCsrShregAlt", "SP_CD");
				
		var vsChgSaCd = ExtInstance.getValue("/root/resList/expSaList/row", "CHG_SA_CD", "child::SP_CD='" + vsSpCd  + "'");
		util.FreeForm.setValue(app, "frfCsrShregAlt", "SA_CD", vsChgSaCd);
	};
	return moPage;
};
