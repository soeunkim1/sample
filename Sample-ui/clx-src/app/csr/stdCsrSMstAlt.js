//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
///<xtmlink path="./stdCsrSMstAlt.xtm"/>

var stdCsrSMstAlt = function() {
	
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
	
	moPage.onLoadImportDone_ImpSbpHeader = function() {
		doSbpHeaderOnLoad();
	};

				
	/**
	 * @desc 화면 온로드
	 * @return 
	 * @author Choi In Seong 2016.02.11
	 */
	moPage.onModelConstructDone_stdCsrSMstAlt = function() {
	
		//리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init("rptCsrShregAlt");

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
				moPage.parentSendMsg("lblTitleRptCsrShregAlt", NLS.INF.M024);
			}
		});
	};
	
	/**
	 * @desc 학적변동 정보 조회
	 * @param poCallBackFunc 콜백 함수
	 * @return void
	 * @author Choi In Seong 2016.02.11
	 */
	function doList(poCallBackFunc) {
		
		var vsCancelCkbVal= "N";
		var vsCancelCkbCtlVal = util.Control.getValue(app, "ckbCancel");
		if (vsCancelCkbCtlVal == "Y") vsCancelCkbVal = "Y";
		
		util.DataMap.setValue(app, "dmReqKey", "strCancelCkbVal", vsCancelCkbVal);
		util.DataMap.setValue(app, "dmReqKey", "strStudId", msStudId);
		
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess) {
				if (pbSuccess) {
					util.Control.redraw(app, "grdCsrShregAlt");
					util.Control.redraw(app, "lblRowCnt_rptCsrShregAlt");
					// main으로부터 학생정보 받아옴
					// default(관련 테이블: cmn_conf_code) 학년도, 학기값을 세팅해놓음(팝업 화면에서 공통적으로 사용됨)
					moPObject.moAltObj.year  				= util.DataMap.getValue(app, "dmResCurrentDate", "year");
					moPObject.moAltObj.smt   				= util.DataMap.getValue(app, "dmResCurrentDate", "smt");
					moPObject.moAltObj.stDt 				= util.DataMap.getValue(app, "dmResCurrentDate", "stDt");
					moPObject.moAltObj.endDt 				= util.DataMap.getValue(app, "dmResCurrentDate", "endDt");
					moPObject.moAltObj.studId 			= moPage.parent.moParentObj.studId;
					moPObject.moAltObj.studNo 			= moPage.parent.moParentObj.studNo;
					moPObject.moAltObj.headerStud   	= moPage.parent.moParentObj.headerStud;
					moPObject.moAltObj.headerCourse	= moPage.parent.moParentObj.headerCourse;
					moPObject.moAltObj.headerDept   	= moPage.parent.moParentObj.headerDept;
					moPObject.moAltObj.headerRemark	= moPage.parent.moParentObj.headerRemark;
					moPObject.moAltObj.keyDate      	= moPage.parent.moParentObj.keyDate;
				}
				if(util.isFunc(poCallBackFunc))	poCallBackFunc(pbSuccess);
			}
		);
	};

	/**
	 * @desc 부모 헤더에 메세지 뿌리기
	 * @param psCtrlId 
	 * @param psMsgCode 
	 * @return void
	 * @author Choi In Seong 2016. 2. 11
	 */
	moPage.parentSendMsg = function(psCtrlId, psMsgCodeNm) {
		var vsMsg = ExtControl.getTextValue(psCtrlId);
		vsMsg     = "[" + vsMsg + "]";
	
		util.Msg.notify(app, vsMsg + psMsgCodeNm);	
	};
	
	/**
	 * @desc 선택한 팝업호출
	 * @param psSelectId 팝업ID
	 * @param psWidth 팝업 넓이
	 * @param psHeight 팝업 높이
	 * @param psType 신규 취소 구분
	 * @param poCallBackFunc 콜백
	 * @return void
	 * @author Choi In Seong 2016. 2. 11
	 */
	function doOpenPopupByMstAlt (psSelectId, psWidth, psHeight, psType, poCallBackFunc){
		util.DataMap.setValue(app, "dmReqKey", "strPopTarget", psSelectId);
		// 팝업창을 호출할 때 상태값에 따라 팝업창이 오픈이 가능한지 체크
		//strCommand: popupMnu 
		util.Submit.send(app, "subPopupMnu", function(pbSuccess) { 
				if (pbSuccess) {
					// 학적변동시 이전데이터 존재여부 체크
						//strCommand: befDataChk 
						util.Submit.send(app, "subBefDataChk", function(pbCnlSuccess) {
							if (pbCnlSuccess) {
								ExtPopUp.openLayeredPopup("/xtm/csr/"+ psSelectId +".xtm", psWidth, psHeight);
							}
							if(util.isFunc(poCallBackFunc)) poCallBackFunc(pbCnlSuccess);
						});
				}
				if(util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
			}
		);
	};
	
	/**
	 * @desc 선택한 팝업호출
	 * @param psSelectId 팝업ID
	 * @param psSelectNm 팝업명
	 * @param psType 신규 취소 여부
	 * @param poCallBackFunc 콜백
	 * @return void
	 * @author Choi In Seong 2016. 2. 11
	 */
	moPage.getSbpPerssion = function(psSelectId, psSelectNm, psType) {
		
		switch (psSelectId) {
			case "extCsrPMstAltAbs" : {
				// 1. 신규[휴학]
				var voCallBackByAbs = function(pbSuccess) {
					if (pbSuccess) {
						var vaAbsPossibleList = [];
						var vnRowCnt = util.DataSet.getRowCount(app, "dsAbsPossibleList");
						for (var i = 0; i < vnRowCnt; i++) {
							var voAbsPossibleRow = new Object();
							voAbsPossibleRow.CD = util.DataSet.getValue(app, "dsAbsPossibleList", "CD", i);
							voAbsPossibleRow.CD_NM = util.DataSet.getValue(app, "dsAbsPossibleList", "CD_NM", i);
							vaAbsPossibleList [i] = voAbsPossibleRow;
						}
						moPObject.moAltAbs.absPossibleList = vaAbsPossibleList;
					}
				};
				// 팝업호출
				doOpenPopupByMstAlt(psSelectId, 600, 365, psType, voCallBackByAbs);
				break;
			}
			
			case "stdCsrPCnlAltAbs" : {
				// 2. 취소(휴학)
				doOpenPopupByMstAlt(psSelectId, 600, 290, psType);
				break;
			}
			
			case "stdCsrPMstAltRtn" : {
				// 3. 신규(복학)
				doOpenPopupByMstAlt(psSelectId, 600, 587, psType);
				break;
			}
			
			case "stdCsrPCnlAltRtn" : {
				// 4. 취소(복학)
				doOpenPopupByMstAlt(psSelectId, 600, 560, psType);
				break;
			}
			
			case "extCsrPMstAltWith" : {
				// 5. 신규(제적)
				doOpenPopupByMstAlt(psSelectId, 600, 525, psType);
				break;
			}
			
			case "stdCsrPCnlAltWith" : {
				// 6. 취소(제적)
				doOpenPopupByMstAlt(psSelectId, 600, 265, psType);
				break;
			}
			
			case "stdCsrPMstAltReEn" : {
				// 7. 신규(재입학)
				doOpenPopupByMstAlt(psSelectId, 600, 510, psType);
				break;
			}
			
			case "stdCsrPCnlAltReEn" : {
				// 8. 취소(재입학)
				doOpenPopupByMstAlt(psSelectId, 600, 510, psType);
				break;
			}
			
			case "stdCsrPMstAltPsn" : {
				if(psType == "New") {
					// 9. 신규(인적사항변경)
					moPObject.moAltObj.altPsn = true;
					ExtPopUp.openLayeredPopup("/xtm/csr/" + psSelectId + ".xtm", 600, 350);
				}else if(psType == "Cnl") {
					// 10. 취소(인적사항변경)
					moPObject.moAltObj.altPsn = false;	
					//취소 데이터 존재 여부 체크
					util.DataMap.setValue(app, "dmReqKey", "strPopTarget", psSelectId);
					//strCommand: befDataChk 
					util.Submit.send(app, "subBefDataChk", function(pbCnlSuccess) { 
						if (pbCnlSuccess) {
							ExtPopUp.openLayeredPopup("/xtm/csr/" + psSelectId + ".xtm", 600, 350);
						}
					});
				}
				
				break;
			}
			
		}
		return false; 
		
	};
	
	/**
	 * @desc 작업저장
	 * @param poCallbackFunc 콜백함수
	 * @return Boolean
	 * @author Choi In Seong 2016. 2. 1
	 */
	function doSubSave(poCallbackFunc) {
		// 리피터 변경사항 체크
		if(!util.Grid.isModified(app, ["grdCsrShregAlt"], "MSG")){
			if(util.isFunc(poCallbackFunc)) poCallbackFunc(false);
			return false;
		}
		//리피트 validation check
		if(!util.validate(app, "grdCsrShregAlt")){
			if(util.isFunc(poCallbackFunc)) poCallbackFunc(false);
			return false;
		}
		
		//strCommand: save 
		util.Submit.send(app, "subSave", function(pbSuccessSave) {
				if(pbSuccessSave) {
					var voCallBackSaveAfter = function(pbSuccessAfter) {
						if(pbSuccessAfter) {
							moPage.parentSendMsg("lblTitleRptCsrShregAlt",NLS.INF.M025);
						}
						if(util.isFunc(poCallbackFunc))	poCallbackFunc(pbSuccessAfter);
					};
					ExtSubPage.getParent().callScript("doSaveAfter", voCallBackSaveAfter);
				}
			}
		);
	};
	
	/**
	 * @desc 리피트 변경여부 반환
	 * @param 
	 * @return boolean 변경여부
	 * @author Choi In Seong 2016. 1. 25
	 */
	function doCheckDataChange() {
		if(util.Grid.isModified(app, ["grdCsrShregAlt"], "CRM") ){
			return false;
		}else{
			return true;
		}
	};

	/**
	 * @desc 학적변동정보 조회
	 * @param 
	 * @return boolean 변경여부
	 * @author Choi In Seong 2016. 2. 11
	 */
	moPage.onValueChanged_CkbCancel = function() {
		
		var vsCancelCkbVal= "N";
		var vsCancelCkbCtlVal = util.Control.getValue(app, "ckbCancel");
		if (vsCancelCkbCtlVal == "Y") vsCancelCkbVal = "Y";
		
		util.DataMap.setValue(app, "dmReqKey", "strCancelCkbVal", vsCancelCkbVal);
		util.DataMap.setValue(app, "dmReqKey", "strStudId", msStudId);
		
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess) {
			if (pbSuccess) {
				util.Control.redraw(app, "grdCsrShregAlt");
				util.Control.redraw(app, "lblRowCnt_rptCsrShregAlt");
				moPage.parentSendMsg("lblTitleRptCsrShregAlt", NLS.INF.M024);
			}
		});
	};

	/**
	 * @desc 신규 컨텍스트메뉴 보이기
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 2. 11
	 */
	moPage.onClick_BtnNew = function() {
		var vnNewCnt = util.DataSet.getRowCount(app, "dsConMenuNewList");
		var vsCdPrp1 = "";
		var vsCdNm = "";
		//contextMenu 초기화
		ExtModel.removeContextAll();
		//contextMenu 목록 셋팅
		for(var i = 1 ; i <= vnNewCnt ; i++){
			vsCdPrp1 = util.DataSet.getValue(app, "dsConMenuNewList", "CD_PRP1", i);
			vsCdNm = util.DataSet.getValue(app, "dsConMenuNewList", "CD_NM", i);
			ExtModel.addContextMenu(i, vsCdNm, "getSbpPerssion('" + vsCdPrp1 + "','" + vsCdNm +"', 'New')");
		}
		//contextMenu 오픈 위치 셋팅
		var vnLeft = Number(util.Control.getStyleAttr(app, "btnNew", "left"));
		var vnHeight = Number(ValidUtil.excNumHyphen(util.Control.getStyleAttr(app, "btnNew", "height")));
		var vnTop = Number(util.Control.getStyleAttr(app, "btnNew", "top"));
		var vnBottom = vnHeight + vnTop;
		
		ExtModel.popContextMenu(vnLeft, vnBottom);
	};
	
	/**
	 * @desc 삭제 컨텍스트메뉴 보이기
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 2. 11
	 */
	moPage.onClick_BtnCancel = function() {
		var vnNewCnt = util.DataSet.getRowCount(app, "dsConMenuDelList");
		var vsCdPrp2 = "";
		var vsCdNm = "";
		//contextMenu 초기화
		ExtModel.removeContextAll();
		//contextMenu 목록 셋팅
		for(var i = 1 ; i <= vnNewCnt ; i++){
			vsCdPrp2 = util.DataSet.getValue(app, "dsConMenuDelList", "CD_PRP2", i);
			vsCdNm = util.DataSet.getValue(app, "dsConMenuDelList", "CD_NM", i);
			
			ExtModel.addContextMenu(i, vsCdNm, "getSbpPerssion('" + vsCdPrp2 + "','" + vsCdNm +"', 'Cnl')");
		}
		//contextMenu 오픈 위치 셋팅
		var vnLeft = Number(util.Control.getStyleAttr(app, "btnNew", "left"));
		var vnHeight = Number(ValidUtil.excNumHyphen(util.Control.getStyleAttr(app, "btnNew", "height")));
		var vnTop = Number(util.Control.getStyleAttr(app, "btnNew", "top"));
		var vnBottom = vnHeight + vnTop;
		
		ExtModel.popContextMenu(vnLeft, vnBottom);
	};
	
	/**
	 * @desc 팝업이 닫이면서 조회 실행
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 2. 11
	 */
	function doPopCallList() {
		var voCallBackSaveAfter = function(pbSuccessAfter) {
			if(pbSuccessAfter) {
				moPage.parentSendMsg("lblTitleRptCsrShregAlt",NLS.INF.M025);
			}
		};
		ExtSubPage.getParent().callScript("doSaveAfter", voCallBackSaveAfter);
	};
	
	/**
	 * @desc 학적변동정보 상세내역 팝업 호출
	 * @param 
	 * @return boolean 변경여부
	 * @author Choi In Seong 2016. 2. 11
	 */
	moPage.onRowDoubleClick_RptCsrShregAlt = function() {
		if(ValueUtil.isNull(util.Grid.getCheckOrSelectedRowIndex(app, "grdCsrShregAlt"))){
			// 선택된 데이터가 없습니다.
			ComMsg.warn("M008");
			return false;
		} else {
			moPObject.moDtl.studId      		= util.Grid.getCellValue(app, "grdCsrShregAlt", "STUD_ID");
			moPObject.moDtl.refKey      		= util.Grid.getCellValue(app, "grdCsrShregAlt", "REF_KEY");
			moPObject.moDtl.serialNo    		= util.Grid.getCellValue(app, "grdCsrShregAlt", "SERIAL_NO");
			moPObject.moDtl.altDivNm    		= util.Grid.getCellValue(app, "grdCsrShregAlt", "ALT_DIV_NM");
			
			moPObject.moDtl.schYearNm		= util.Grid.getCellValue(app, "grdCsrShregAlt", "SCH_YEAR_NM");
			moPObject.moDtl.smtNm       		= util.Grid.getCellValue(app, "grdCsrShregAlt", "SMT_NM");
			moPObject.moDtl.absSmtCntNm	= util.Grid.getCellValue(app, "grdCsrShregAlt", "ABS_SMT_CNT_NM");
			moPObject.moDtl.altRsnDivNm 	= util.Grid.getCellValue(app, "grdCsrShregAlt", "ALT_RSN_DIV_NM");
			moPObject.moDtl.altRsnNm    		= util.Grid.getCellValue(app, "grdCsrShregAlt", "ALT_RSN_NM");
			moPObject.moDtl.altDt       			= util.Grid.getCellValue(app, "grdCsrShregAlt", "ALT_DT");
			moPObject.moDtl.cancelDt    		= util.Grid.getCellValue(app, "grdCsrShregAlt", "CANCEL_DT");
			moPObject.moDtl.cancelRsnNm 	= util.Grid.getCellValue(app, "grdCsrShregAlt", "CANCEL_RSN_NM");
			moPObject.moDtl.cstDt       		= util.Grid.getCellValue(app, "grdCsrShregAlt", "CST_DT");
			moPObject.moDtl.chgBefDesc		= util.Grid.getCellValue(app, "grdCsrShregAlt", "CHG_BEF_DESC");
			moPObject.moDtl.chgDesc   		= util.Grid.getCellValue(app, "grdCsrShregAlt", "CHG_DESC");
			moPObject.moDtl.remark      		= util.Grid.getCellValue(app, "grdCsrShregAlt", "REMARK");
			moPObject.moDtl.altDivRcd   		= util.Grid.getCellValue(app, "grdCsrShregAlt", "ALT_DIV_RCD");

			ExtPopUp.openLayeredPopup("/xtm/csr/stdCsrPMstShregAltDetail.xtm", 600, 540);	
		}
	};
	
	
	moPage.onClick_BtnSave = function() {
		doSubSave();
	}
	
	
	
	moPage.onClick_BtnRestore = function() {
		util.Grid.restoreRow(app, "grdCsrShregAlt");
	}
	return moPage;
};

