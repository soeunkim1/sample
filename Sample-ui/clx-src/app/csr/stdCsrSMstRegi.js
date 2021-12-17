//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
///<xtmlink path="./stdCsrSMstRegi.xtm"/>

var stdCsrSMstRegi = function() {

	var moPage = new Page();
	//임포트용 데이터 통신 오브젝트
	var moPObject = new PObject();

	var msStudId = "";
	var msStudNo = "";
	var msKeyDt = "";
		
	//등록 popUp에 학년도 Text,학기Text,학적등록구분Text,이수과정구분Text,이수과정text,학적등록사유Text 추가해서 넘겨줌 
	//등록 popUp에 넘겨줄 값 
	moPObject.moRegiObj = {
		headerStud		: "", 		//학적사항관리 창의 헤더정보(학생) 
		studId				: "", 		//학적사항관리 창의 조회된 학번값		
		enrollDivRcd		: "", 		//학적등록구분 
		spDivRcd			: "", 		//이수과정 구분 
		schYearRcd		: "", 		//학년도 
		smtRcd 			: "", 		//학기 
		regStatRcd 		: "", 		//등록상태 
		saCd 				: "", 		//학사부서
		spCd 				: "", 		//이수과정
		procDt 				: "", 		//처리일자 
		studNo 				: "", 		// STUD_ID -> STUD_NO로 변경되면서 추가된 부분 (정정호 2011.08.05)
		keyDt	 			: ""		//기준일자
	};


	moPage.onLoadImportDone_ImpSbpHeader = function() {
		doSbpHeaderOnLoad();
	}
	
	/**
	 * @desc 화면 온로드
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 2. 1
	 */
	moPage.onModelConstructDone_stdCsrSMstRegi = function() {
		
		//리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init("rptCsrEnroll");

		//서브미션 실행 (실패시 cover page)
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				var voParentPage = ExtSubPage.getParent();
				
				// 부모멤버변수에담긴학번받음
				msStudId = moPage.parent.moParentObj.studId;
				msStudNo = moPage.parent.moParentObj.studNo;
				msKeyDt = moPage.parent.moParentObj.keyDate;
				
				moPObject.moRegiObj.studId = msStudId;
				moPObject.moRegiObj.studNo = msStudNo; // STUD_ID -> STUD_NO로 변경되면서 추가된 부분 (정정호 2011.08.05)
				moPObject.moRegiObj.headerStud = moPage.parent.moParentObj.headerStud;
				
				doList(function(pbSuccess) {
					// 조회 : "조회되었습니다." header 메세지 표시
					if(pbSuccess) {
						util.Control.setEnable(app, true, ["grpData"]);
						moPage.parentSendMsg("lblTitleRptCsrEnroll", NLS.INF.M024);
					}
				});
			}
		});
	}

	/**
	 * @desc 등록정보를 조회한다.
	 * @param poCallBackFunc 콜백 함수
	 * @return void
	 * @author Choi In Seong 2016. 2. 1
	 */
	function doList(poCallBackFunc) {
		
		//취소내역포함 유무
		var vsCancelYn = "";
		var vsCancelCkb = util.Control.getValue(app, "ckbCancel");
	
		if (vsCancelCkb == "Y") {
			vsCancelYn = "Y";
		} else {
			vsCancelYn = "N";
		}
		
		util.DataMap.setValue(app, "dmReqKey", "strStudId", msStudId);
		util.DataMap.setValue(app, "dmReqKey", "strCancelYn", vsCancelYn);
		
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess) {
				if (pbSuccess) {
					util.Control.redraw(app, ["rptCsrEnroll"]);
					util.Control.redraw(app, "lblRowCnt_rptCsrEnroll");
				}
				
				if(util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
			}
		);
		
	}
	
	/**
	 * @desc 작업저장
	 * @param poCallbackFunc 콜백함수
	 * @return Boolean
	 * @author Choi In Seong 2016. 2. 1
	 */
	function doSubSave(poCallbackFunc) {
		// 리피터 변경사항 체크
		if(!util.Grid.isModified(app, ["grdCsrEnroll"], null)){
			moPage.parentSendMsg("lblTitleRptCsrEnroll",NLS.WRN.M007);
			if(util.isFunc(poCallbackFunc)) poCallbackFunc(false);
			return false;
		}
		//리피트 validation check
		if(!util.validate(app, "grdCsrEnroll")){
			if(util.isFunc(poCallbackFunc)) poCallbackFunc(false);
			return false;
		}
		
		//strCommand: save 
		util.Submit.send(app, "subSave", function(pbSuccessSave) {
				if(pbSuccessSave) {
					var voCallBackSaveAfter = function(pbSuccessAfter) {
						if(pbSuccessAfter) {
							//저장성공 메세지 출력
							doList(function(pbSuccessList) {
								// 조회 : "조회되었습니다." header 메세지 표시
								if(pbSuccessList) {
									util.Control.setEnable(app, true, ["grpData"]);
									moPage.parentSendMsg("lblTitleRptCsrEnroll",NLS.INF.M025);
								}
								if(util.isFunc(poCallbackFunc))	poCallbackFunc(pbSuccessList);
							});
						}
					};
					ExtSubPage.getParent().callScript("doSaveAfter", voCallBackSaveAfter);
				}
			}
		);
	};
	
	/**
	 * @desc 부모 헤더에 메세지 뿌리기
	 * @param psCtrlId 
	 * @param psMsgCode 
	 * @return void
	 * @author Choi In Seong 2016. 2. 1
	 */
	moPage.parentSendMsg = function(psCtrlId, psMsgCodeNm) {
		var vsMsg = ExtControl.getTextValue(psCtrlId);
		vsMsg     = "[" + vsMsg + "]";
	
		util.Msg.notify(app, vsMsg + psMsgCodeNm);	
	};
	
	/**
	 * @desc 등록신규시, 최종학적상태확인
	 * @param 
	 * @return boolean
	 * @author Choi In Seong 2016. 2. 1
	 */
	function doCheckNewRegi() {
		util.DataMap.setValue(app, "dmReqKey", "strStudId", msStudId);
		//strCommand: status 
		util.Submit.send(app, "subStatus", function(pbSuccess) {
				if (pbSuccess) {
					
					var vsStatRcd = util.DataMap.getValue(app, "dmResStatus", "statRcd");
					
					//학적상태가 없거나, 재학, 휴학 인 경우만 신규등록 가능
					if (ValueUtil.isNull(vsStatRcd) || vsStatRcd == "CT301ATTE" || vsStatRcd == "CT301ABSE") {
						ExtPopUp.openLayeredPopup("/xtm/csr/stdCsrPMstRegInit.xtm", 600, 345);
					} else {
						//그외는 error 메시지 
						var vsStatNm = util.DataMap.getValue(app, "dmResStatus", "statNm");
						util.Msg.alert("NLS-CSR-M022", [vsStatNm, NLS.CSR.M050]);
						return false;
					}
				}
			}
		);
	};
	
	/**
	 * @desc pop up창 띄울때 check로직  & 데이터를 담아줌(dsRegi)
	 * @param voConId 컨트롤 아이디
	 * @return boolean
	 * @author Choi In Seong 2016. 2. 1
	 */
	function doCheckCallPopUp(voConId) {
		
		var voIndex = util.Grid.getIndex(app, "grdCsrEnroll");
					
		// 선택된 Grid의 Row가져옴 
		if (ValueUtil.isNull(voIndex)||voIndex==0) {
			//라인선택 안됨 
			util.Msg.alert("NLS-INF-M023")
			return false;
		}
		
		//선택된 라인의 등록상태를 가져옴 
		
		var vsEnrollStat = util.Grid.getCellValue(app, "grdCsrEnroll", "REG_STAT_RCD", voIndex);
		
		//등록상태가아니면 메시지   "CT109ENRO"
		if (vsEnrollStat != "CT109ENRO") {
			var vsEnrollStatNm = util.Grid.getCellValue(app, "grdCsrEnroll", "REG_STAT_NM", voIndex);
			var vsRegiCls = NLS.CSR.M054; //취소
			var vsRegiChg = NLS.CSR.M051; //변경
			switch (voConId) {
				case "btnNewChange" : {
					util.Msg.alert("NLS-CSR-M002", [vsEnrollStatNm, vsRegiChg]);
					return false;
				}
				case "btnNewCancel" : {
					util.Msg.alert("NLS-CSR-M002", [vsEnrollStatNm, vsRegiCls]);
					return false;
				}
			}
		}
		
		//등록 PopUp에 넘길 key값 세팅 
		moPObject.moRegiObj.studId 			= util.Grid.getCellValue(app, "grdCsrEnroll", "STUD_ID", 				voIndex);
		moPObject.moRegiObj.regStatRcd 	= util.Grid.getCellValue(app, "grdCsrEnroll", "REG_STAT_RCD", 		voIndex);
		moPObject.moRegiObj.enrollDivRcd	= util.Grid.getCellValue(app, "grdCsrEnroll", "ENROLL_DIV_RCD", 	voIndex);
		moPObject.moRegiObj.spDivRcd 		= util.Grid.getCellValue(app, "grdCsrEnroll", "SP_DIV_RCD", 			voIndex);
		moPObject.moRegiObj.schYearRcd	= util.Grid.getCellValue(app, "grdCsrEnroll", "SCH_YEAR_RCD", 		voIndex);
		moPObject.moRegiObj.smtRcd		= util.Grid.getCellValue(app, "grdCsrEnroll", "SMT_RCD", 				voIndex);
		moPObject.moRegiObj.saCd 			= util.Grid.getCellValue(app, "grdCsrEnroll", "SA_CD", 					voIndex);
		moPObject.moRegiObj.spCd 			= util.Grid.getCellValue(app, "grdCsrEnroll", "SP_CD", 					voIndex);
		moPObject.moRegiObj.procDt 			= util.Grid.getCellValue(app, "grdCsrEnroll", "PROC_DT", 				voIndex);
		moPObject.moRegiObj.keyDt  			= util.Grid.getCellValue(app, "grdCsrEnroll", "ST_DT", 					voIndex);
		return true;
	};
	
	/**
	 * @desc 변경여부 반환
	 * @param 
	 * @return boolean 변경여부
	 * @author Choi In Seong 2016. 2. 1
	 */
	function doCheckDataChange() {
		if(util.Grid.isModified(app, ["grdCsrEnroll"], "CRM") ){
			return false;
		}else{
			return true;
		}
	};
	
	/**
	 * @desc 신규등록 팝업 호출
	 * @param   
	 * @return void
	 * @author Choi In Seong 2016. 2. 1
	 */
	moPage.onClick_BtnNew = function() {
		//해당 리피트 insertRow 후 편집 시작할 컬럼 지정
		doCheckNewRegi();
	};

	/**
	 * @desc 등록변경 팝업 호출
	 * @param 
	 * @return boolean 변경여부
	 * @author Choi In Seong 2016. 2. 1
	 */
	moPage.onClick_BtnChange = function() {
		var vbCheckCallPopUp = moPage.doCheckCallPopUp("btnNewChange");
		if (vbCheckCallPopUp) {
			ExtPopUp.openLayeredPopup("/xtm/csr/stdCsrPMstRegChg.xtm", 600, 575);
		}
	};

	/**
	 * @desc 등록취소 팝업 호출
	 * @param 
	 * @return boolean 변경여부
	 * @author Choi In Seong 2016. 2. 1
	 */
	moPage.onClick_BtnCancel = function() {
		var vbCheckCallPopUp = moPage.doCheckCallPopUp("btnNewCancel");
		if (vbCheckCallPopUp) {
			ExtPopUp.openLayeredPopup("/xtm/csr/stdCsrPMstRegCancel.xtm", 610, 365);
		}
	};

	
	/**
	 * @desc 등록정보 저장
	 * @param 
	 * @return boolean 변경여부
	 * @author Choi In Seong 2016. 2. 1
	 */
	moPage.onClick_BtnSave = function() {
		doSubSave();
	};

	/**
	 * @desc 조회버튼 클릭
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 2. 1
	 */
	moPage.onClick_BtnSearch = function() {
		 //작업영역 리피트 변경 내역 체크
		if(util.Grid.isModified(app, "", "CRM")){
			return false;
		}
		doList(function(pbSuccess) {
			// 조회 : "조회되었습니다." header 메세지 표시
			if (pbSuccess) {
				util.Control.setEnable(app, true, ["grpData"]);
				moPage.parentSendMsg("lblTitleRptCsrEnroll", NLS.INF.M024);
			}
		});
	};
	
	/**
	 * @desc 등록정보 조회
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 2. 1
	 */
	moPage.onValueChanged_CkbCancel = function() {
		doList(function(pbSuccess) {
			// 조회 : "조회되었습니다." header 메세지 표시
			if (pbSuccess) {
				moPage.parentSendMsg("lblTitleRptCsrEnroll", NLS.INF.M024);
			}
		});
	};
	
	/**
	 * @desc 팝업이 닫이면서 조회 실행
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 2. 1
	 */
	function doPopCallList() {
		var voCallBackSaveAfter = function(pbSuccessAfter) {
			if(pbSuccessAfter) {
				moPage.parentSendMsg("lblTitleRptCsrEnroll",NLS.INF.M025);
			}
		};
		ExtSubPage.getParent().callScript("doSaveAfter", voCallBackSaveAfter);
	};
	return moPage;
};

