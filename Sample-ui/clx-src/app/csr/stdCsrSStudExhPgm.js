//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
///<xtmlink path="./stdCsrSStudExhPgm.xtm"/>

var stdCsrSStudExhPgm = function() {

	var moPage = new Page();
	//임포트용 데이터 통신 오브젝트
	var moPObject = new PObject();

	var msStudId = "";
	var msStudNo = "";
	var msKeyDate = "";
	
	moPage.moExhObj = {
		  headerStud 	: "" //학적사항관리 창의 헤더정보(학생) 
		, studId     	: "" //학적사항관리 창의 조회된 학생아이디값	
		, studNo     	: "" //학적사항관리 창의 조회된 학번값	
		, modCd    	: "" //C:생성 M:는 수정 
		, otCd      	 	: "" //외부부서 코드  
		, exhPgmCd	: "" //교환프로그램 코드
		, stDt      		: "" //시작일자 
		, endDt      	: "" //종료일자  
		, keyDt	     	: "" //학적부 기준일자
	};
	
	/**
	 * @desc  Header Import onLoad
	 * @return void
     * @author Choi In Seong at 2016. 6. 24
     */
	moPage.onLoadImportDone_ImpSbpHeader = function() {
		doSbpHeaderOnLoad();
	}

	/**
	 * @desc 화면 온로드
	 * @return 
	 * @author Choi In Seong at 2016. 6. 24
	 */
	moPage.onModelConstructDone_stdCsrSStudExhPgm = function() {
		
		//리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init("rptCsrExhStud");

		// 부모멤버변수에담긴학번받음
		msStudId = moPage.parent.moParentObj.studId;
		msStudNo = moPage.parent.moParentObj.studNo;
		msKeyDate = moPage.parent.moParentObj.keyDate;

		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess) {
			if (pbSuccess) {
				doList(function(pbSuccess) {
					// 조회 : "조회되었습니다." header 메세지 표시
					if(pbSuccess) {
						moPage.parentSendMsg("lblTitleRptCsrExhStud", NLS.INF.M024);
					}
				});
			}
		});
	}

	
	/**
	 * @desc 팝업 조회 조건 셋팅
	 * @return 
	 * @author Choi In Seong at 2016. 6. 24
	 */
	function doPoPUpOpenPre(poModCd) {
		moPage.moExhObj.headerStud 	= moPage.parent.moParentObj.headerStud;
		moPage.moExhObj.modCd      	= poModCd;
		moPage.moExhObj.keyDt      		= msKeyDate;
		
		if(poModCd == "C") {
			moPage.moExhObj.studId 			= msStudId;
			moPage.moExhObj.studNo			= msStudNo;
			moPage.moExhObj.otCd 			= "";
			moPage.moExhObj.exhPgmCd 	= "";
			moPage.moExhObj.stDt    			= "";
			moPage.moExhObj.endDt    		= "";
		
		} else if(poModCd == "M") {	//변경버튼 클릭시
			moPage.moExhObj.studId   		= util.Grid.getCellValue(app, "grdCsrExhStud", "STUD_ID");
			moPage.moExhObj.studNo			= msStudNo;
			moPage.moExhObj.otCd 			= util.Grid.getCellValue(app, "grdCsrExhStud", "OT_CD"); 	//외부부서 코드  
			moPage.moExhObj.exhPgmCd 	= util.Grid.getCellValue(app, "grdCsrExhStud", "EXH_PGM_CD"); //교환프로그램 코드
			moPage.moExhObj.stDt    			= util.Grid.getCellValue(app, "grdCsrExhStud", "ST_DT");    //시작일자 
			moPage.moExhObj.endDt    		= util.Grid.getCellValue(app, "grdCsrExhStud", "END_DT");   //종료일자  
		}
	};

	/**
	 * @desc 학적변동 정보 조회
	 * @param poCallBackFunc 콜백 함수
	 * @return void
	 * @author Choi In Seong 2016.02.11
	 */
	function doList(poCallBackFunc) {
		
		util.DataMap.setValue(app, "dmReqList", "strStudId", msStudId);
		
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess) {
				if (pbSuccess) {
					util.Control.redraw(app, "grdCsrExhStud");
					util.Control.redraw(app, "lblRowCnt_rptCsrExhStud");
				}
				if(util.isFunc(poCallBackFunc))	poCallBackFunc(pbSuccess);
			}
		);
	};

	/**
	 * @desc 저장버튼 클릭
	 * @return void
	 * @author Choi In Seong 2016. 6. 24
	 */
	moPage.onClick_BtnSave = function() {
		// 리피터 변경사항 체크
		if(!util.Grid.isModified(app, ["grdCsrExhStud"], "MSG")){
			return false;
		}
		
		//리피트 validation check
		if(!util.validate(app, "grdCsrExhStud")) return false;
		
		doSubSave();
	};
	
	/**
	 * @desc   교환학생 저장
	 * @param 
	 * @return 
	 * @author Choi In Seong 2016. 6. 24
	 */
	function doSubSave(poCallbackFunc) {
		//save submission call
		//strCommand: save 
		util.Submit.send(app, "subSave", function(pbSuccessSave) {
				if(pbSuccessSave) {
					//저장성공 메세지 출력
					doList(function(pbSuccessList) {
						// 조회 : "조회되었습니다." header 메세지 표시
						if(pbSuccessList) {
							moPage.parentSendMsg("lblTitleRptCsrExhStud",NLS.INF.M025);
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
	 * @author Choi In Seong 2016. 6. 24
	 */
	moPage.parentSendMsg = function(psCtrlId, psMsgCodeNm) {
		var vsMsg = ExtControl.getTextValue(psCtrlId);
		vsMsg     = "[" + vsMsg + "]";
	
		util.Msg.notify(app, vsMsg + psMsgCodeNm);	
	};
	
	/**
	 * @desc 리피트 변경여부 반환
	 * @param 
	 * @return boolean 변경여부
	 * @author Choi In Seong 2016. 6. 24
	 */
	function doCheckDataChange() {
		
		if(util.Grid.isModified(app, ["grdCsrExhStud"], "CRM") ){
			return false;
		}else{
			return true;
		}
	};
	
	/**
	 * @desc 팝업이 닫이면서 조회 실행
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 6. 24
	 */
	function doPopCallList() {
		var voCallBackSaveAfter = function(pbSuccessAfter) {
			if(pbSuccessAfter) {
				moPage.parentSendMsg("lblTitleRptCsrExhStud",NLS.INF.M025);
			}
		};
		ExtSubPage.getParent().callScript("doSaveAfter", voCallBackSaveAfter);
	};
	
	
	/**
	 * @desc 선택한 신규 팝업호출
	 * @return void
	 * @author Choi In Seong 2016. 6. 24
	 */
	moPage.onClick_BtnNew = function() {
		
		var vnNewCnt = util.DataSet.getRowCount(app, "dsConMenuNewList");
		var vsCdPrp1 = "";
		var vsCdPrp2 = "";
		var vsCd = "";
		//contextMenu 초기화
		ExtModel.removeContextAll();
		//contextMenu 목록 셋팅
		for(var i = 1 ; i <= vnNewCnt ; i++){
			vsCd = util.DataSet.getValue(app, "dsConMenuNewList", "CD", i);
			vsCdPrp1 = util.DataSet.getValue(app, "dsConMenuNewList", "CD_PRP1", i);
			vsCdPrp2 = util.DataSet.getValue(app, "dsConMenuNewList", "CD_PRP2", i);
			ExtModel.addContextMenu(i, vsCdPrp1, "newContextMenu('" + vsCdPrp2 + "','" + vsCd +"')");
		}
		//contextMenu 오픈 위치 셋팅
		var vnLeft = Number(util.Control.getStyleAttr(app, "btnNew", "left"));
		var vnHeight = Number(ValidUtil.excNumHyphen(util.Control.getStyleAttr(app, "btnNew", "height")));
		var vnTop = Number(util.Control.getStyleAttr(app, "btnNew", "top"));
		var vnBottom = vnHeight + vnTop;
		
		doPoPUpOpenPre("C");
		
		ExtModel.popContextMenu(vnLeft, vnBottom);
	};
	
	/**
	 * @desc 신규 팝업 호출 전 변경 체크
	 * @param psSelectId 팝업ID
	 * @param psSelectNm 팝업명
	 * @return void
	 * @author Choi In Seong 2016. 6. 24
	 */
	moPage.newContextMenu = function(psSelectId, psSelectCd) {
		// 리피터 변경사항 체크
		if(!util.Grid.isModified(app, ["grdCsrExhStud"], "CRM")){
			doList(function(pbSuccess) {
				if(pbSuccess) {
					moPage.getSbpPerssion(psSelectId, psSelectCd);
				}
			});
		}
	};
	
	/**
	 * @desc 선택한 팝업호출
	 * @param psSelectId 팝업ID
	 * @param psSelectNm 팝업명
	 * @return void
	 * @author Choi In Seong 2016. 6. 24
	 */
	moPage.getSbpPerssion = function(psSelectId, psSelectCd) {
		
		switch (psSelectCd) {
			case "CT813VIST" : {
				doOpenPopupByExhPgm(psSelectId, 600, 340);
				break;
			}
			
			case "CT813DISP" : {
				doOpenPopupByExhPgm(psSelectId, 600, 365);
				break;
			}
			
		}
		return false; 
		
	};
	
	/**
	 * @desc 선택한 팝업호출
	 * @param psSelectId 팝업ID
	 * @param psWidth 팝업 넓이
	 * @param psHeight 팝업 높이
	 * @return void
	 * @author Choi In Seong 2016. 6. 24
	 */
	function doOpenPopupByExhPgm (psSelectId, psWidth, psHeight){
		ExtPopUp.openLayeredPopup("/xtm/csr/"+ psSelectId +".xtm", psWidth, psHeight);
	};
	

	/**
	 * @desc 선택한 팝업호출
	 * @param psSelectId 팝업ID
	 * @param psWidth 팝업 넓이
	 * @param psHeight 팝업 높이
	 * @return void
	 * @author Choi In Seong 2016. 6. 24
	 */
	moPage.onClick_BtnChg = function() {
		
		if(ValueUtil.isNull(util.Grid.getCheckOrSelectedRowIndex(app, "grdCsrExhStud"))){
			util.Msg.alert("NLS-WRN-M008");
			return;
		}
		var vsExhCd = util.Grid.getCellValue(app, "grdCsrExhStud", "EXH_CD");
		var vsPgmId = ExtInstance.getValue("/root/resOnLoad/conMenuNewList/row", "CD_PRP2", "child::CD='"+vsExhCd+"'");
		
		doPoPUpOpenPre("M");

		// 리피터 변경사항 체크
		if(!util.Grid.isModified(app, ["grdCsrExhStud"], "CRM")){
			doList(function(pbSuccess) {
				if(pbSuccess) {
					moPage.getSbpPerssion(vsPgmId, vsExhCd);
				}
			});
		}
	};
	
	/**
	 * @desc 학생정보 삭제
	 * @return void
	 * @author Choi In Seong 2016. 6. 24
	 */
	moPage.onClick_BtnDel = function() {
		if(ValueUtil.isNull(util.Grid.getCheckOrSelectedRowIndex(app, "grdCsrExhStud"))){
			moPage.parentSendMsg("lblTitleRptCsrExhStud", NLS.INF.M005);
			return false;
		} else {
			util.Grid.deleteRow(app, "grdCsrExhStud");
		}
	};
	return moPage;
};

