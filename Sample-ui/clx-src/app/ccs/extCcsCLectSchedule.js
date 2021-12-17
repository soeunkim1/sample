
//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCcsCLectSchedule.xtm"/>


var extCcsCLectSchedule = function() {
		
	
	var moPage = new Page();
	var moPObject = new PObject();
	
			
	
	moPObject.moIdsForStdCmnPObjSch = [
			
			{
				controlId		:	"rdBtnOgNm",
				iCd				:	"",
				iNm				:	"rdIpbSpvsDeptNm",
				iObjDivRcd		:	["CC009SA", "CC009OG"],
				iStartObject    :   "",
				iOtDivRcd		:	"",
				iOtIsTreeView	:	"",
				iLanDivRcd		:	"",
				iFDate		:	"",
				iKeyEndDate		:	"",
				oObjDivRcd		:	"rdIpbObjDivRcd",
				oCd				:	"rdIpbSpvsDeptCd",
				oCdNm			:	"rdIpbSpvsDeptNm",
				oBegDt			:	"",
				oEndDt			:	"",
				oLanDivRcd		:	"",
				func			:	function(){
				}
			}			
	];
			
			
	
	
	/**
	 * @desc  Header Import onLoad
	 * @return void
	 * @author 최영경 2016-01-18
	 */
	moPage.onLoadImportDone_ImpTitle = function() {		
		
		doHeaderOnLoad();
		
	};
	
	
	
	
	/**
	 * @desc 온로드 실행
	 * @param 
	 * @return 
	 * @author 최영경 2016-01-18
	 */
	function doOnLoad() {
		
		util.Tab.setSelectedTabItem(app, "tab1", "tab1_case1");
		
		
		// 동서울대 건물목록 CRUD 사용 안함 
		// 타프로젝트 사용시 해당부분 없애고 rowCount 제자리, 컨트롤 ReadOnly 및 Enable 속성제거 필요
		//ExtControl.setVisible(false, ["btnNew", "btnDel", "btnRestore", "btnSave"]);
		
		//리피트 초기 설정
		//ExtRepeat.init("rptCcsRoom");
		//검색조건 초기 설정
		//ExtGroup.initSearchBox("grpSearch", ["grpData"]);
		
		
//		ExtSubmission.sendEx("subOnLoad", "onLoad", function(pbSuccess){
//			if(pbSuccess){
//				
//				ExtControl.refresh(["cbbBuild"]);
//				ExtSelectCtl.selectItem("cbbBuild", 0);
//				ExtControl.setFocus("cbbBuild");
//			}
//		}, true);
		
	};
	
	
	
	
	/**
	 * @desc 조회 실행
	 * @param 
	 * @return 
	 * @author 최영경 2016-01-18
	 */
	moPage.onClick_BtnSearch = function() {
		
		 //작업영역 리피트 변경 내역 체크
		if(util.Grid.isModified(app, "", "CRM")){
			return false;
		}		
		
		doList(function(pbSuccess) {
			// 조회 : "조회되었습니다." header 메세지 표시
			if (pbSuccess) util.Msg.notify(app, "NLS.INF.M024");
		});		
	
	};
	
	
	
	
	/**
	 * @desc  강의실목록을 조회한다.
	 * @param {Function} poCallBackFunc 콜백정의
	 * @return void
	 * @author 최영경 2016-01-18
	 */
	function doList(poCallBackFunc) {
		
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdCcsRoom");	
				// 조회 후 콜백함수 수행
				if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess); 
			}
		}); 
	}
	
	
	/**
	 * @desc 강의실목록 리피트 panel click event
	 *			 강의실목록 리피트 row all check
	 * @return void
	 * @author 최영경 2016-01-18
	 */	
	
//	moPage.onValueChanged_RhCkbSelect = function() {
//		ExtRepeat.selectedAllPanel("rhCkbSelect");
//	};
	
	
	
	
	
	/**
	 * @desc 신규 click event
	 *            강의실목록 리피트 row 추가
	 * @return void
	 * @author 최영경 2016-01-18
	 */		
	
//	moPage.onClick_BtnNew = function() {
//		//해당 리피트 insertRow 후 편집 시작할 컬럼 지정		
//		var voNewRow = ExtRepeat.insertRow("rptCcsRoom", "rdIpbLectRoomCd");		
//		var vsBuildCd = ExtInstance.getValue("/root/reqList/strBuildCd");
//		ExtRepeat.setValue("rptCcsRoom", "BD_CD", vsBuildCd, voNewRow, false, true);
//		
//	};
	
	
	
	
	/**
	 * @desc 삭제 click event
	 *            강의실목록 리피트 index row 삭제 status 변경
	 * @return void
	 * @author 최영경 2016-01-18
	 */	
	
//	moPage.onClick_BtnDel = function() {
//		ExtRepeat.deleteRow("rptCcsRoom");
//	};
	
	
	/**
	 * @desc 작업취소 click event
	 *            강의실목록 리피트 index row restore
	 * @return void
	 * @author 최영경 2016-01-18
	 */	
	
//	moPage.onClick_BtnRestore = function() {
//		ExtRepeat.undoModify("rptCcsRoom");
//	};
	
	
	/**
	 * @desc 작업저장 click event
	 *            강의실목록 리피트 변경내역 저장
	 * @return void
	 * @author 최영경 2016-01-18
	 */	
	
//	moPage.onClick_BtnSave = function() {
//		moPage.doSave();
//		
//	};
	
	
	
	/**
	 * @desc  강의실목록 리피트 저장 submission 실행
	 * @return void
	 * @author 최영경 2016-01-18
	 */
	function doSave() {
		
		// 리피터 변경사항 체크
		if(!util.Grid.isModified(app, ["grdCcsRoom"], "MSG")){
			return false;
		}
		
		//리피트 validation check
		if(!util.validate(app, "grdCcsRoom")) return false;
		
		//strCommand: save 
		util.Submit.send(app, "subSave", function(pbSuccess){
			
			if(pbSuccess){
				page.doList(function(pbListSuccess) {
					// 조회 : "갱신된 데이터가 조회되었습니다." header 메세지 표시
					if (pbListSuccess) util.Msg.notify(app, "NLS.INF.M025");
				});
			}
		});
	}
	
	
	
	
						
						
	
	/**
	 * @desc  강의실목록 리피트 주관부서명
	 * @return void
	 * @author 최영경 2016-01-18
	 */
	
//	moPage.onValueChanged_RdIpbSpvsDeptNm = function(sender) {
//		doOnChangeStdCmnPObjSch(sender);
//	};
	
	
	
	
	/**
	 * @desc  강의실목록 리피트 주관부서명 버튼클릭
	 * @return void
	 * @author 최영경 2016-01-18
	 */
	
//	moPage.onClick_RdBtnOgNm = function(sender) {
//		
//		doOnClickStdCmnPObjSch(sender);
//	};
	
	
	/**
	 * @desc  검색조건 강의실명 keyDown
	 * @return void
	 * @author 최영경 2016-01-18
	 */
	moPage.onKeyDown_IpbRoomNm = function(strKeyType, strKeyStatus) {
		
		if(e.keyCode == cpr.events.KeyCode.ENTER){
			util.Header.clickSearch(app);
		}
		
	};
	
	moPage.onClick_RdBtnOgNm1 = function(sender) {
		
		doOnClickStdCmnPObjSch(sender);
	}
	
	
//	moPage.onClick_RdBtnOgNm = function(sender) {
//		
//		doOnClickStdCmnPObjSch(sender);
//	}
	
	
	
//	moPage.onValueChanged_RdIpbSpvsDeptNm = function(sender) {
//		doOnChangeStdCmnPObjSch(sender);
//	}
	
	
	
//	moPage.onValueChanged_RhCkbSelect = function() {
//		ExtRepeat.selectedAllPanel("rhCkbSelect");
//	}
	
	
	
//	moPage.onClick_BtnSave = function() {
//		moPage.doSave();
//		
//	}
	
	
	
//	moPage.onClick_BtnRestore = function() {
//		ExtRepeat.undoModify("rptCcsRoom");
//	}
	
	
	
//	moPage.onClick_BtnDel = function() {
//		ExtRepeat.deleteRow("rptCcsRoom");
//	}
	
	
	
//	moPage.onClick_BtnNew = function() {
//		//해당 리피트 insertRow 후 편집 시작할 컬럼 지정		
//		var voNewRow = ExtRepeat.insertRow("rptCcsRoom", "rdIpbLectRoomCd");		
//		var vsBuildCd = ExtInstance.getValue("/root/reqList/strBuildCd");
//		ExtRepeat.setValue("rptCcsRoom", "BD_CD", vsBuildCd, voNewRow, false, true);
//		
//	}
	
	
	
	moPage.onClick_Button1 = function() {
		
		
		var vaCtlBtn = ["button1", "button2", "button3", "button4"];
		var vaCtlLbl = ["lbl_slid1", "lbl_slid2", "lbl_slid3", "lbl_slid4"];
		model.getControl("slide1");
		
		//var vbSelChk = ExtTab.getSelectedId("slide1");
		for(var i = 0  ; i<vaCtlBtn.length ; i++){
			ExtControl.setAttr(vaCtlBtn[i], "img", "../../images/imgs/icon/icon_minus.png");
			var vbSelChk = model.getAttr(vaCtlBtn[i],"selected");
			if(vbSelChk){
				ExtControl.setAttr(vaCtlBtn[i], "img", "../../images/imgs/icon/icon_plus.png");
				ExtControl.setAttr(vaCtlLbl[i], "visible", true);
			}else{
				ExtControl.setAttr(vaCtlLbl[i], "visible", false);
			}
			util.Control.redraw(app, vaCtlBtn[i]);
		}
		
		
		
	};
	
	
//	moPage.onClick_Button7 = function() {
//		
//		
//		var vaCtlBtn = ["button1", "button2", "button3", "button4"];
//		model.getControl("slide1");
//		
//		//var vbSelChk = ExtTab.getSelectedId("slide1");
//		for(var i = 0  ; i<vaCtlBtn.length ; i++){
//			ExtControl.setAttr(vaCtlBtn[i], "img", "../../images/imgs/icon/icon_minus.png");
//			var vbSelChk = model.getAttr(vaCtlBtn[i],"selected");
//			if(vbSelChk){
//				ExtControl.setAttr(vaCtlBtn[i], "img", "../../images/imgs/icon/icon_plus.png");
//			}
//			ExtControl.refresh(vaCtlBtn[i]);
//		}
//		
//		
//		
//	}
	
	
	moPage.onClick_BtnSave = function() {
		doSave();
	}
	
	moPage.onClick_BtnRestore = function() {
		util.Grid.restoreRow(app, "grdCmnTmpReg");
		// 학생정보 프리폼 비활성화 처리
		doCompareFrfEnable();
//TO-BE: <ExtRepeat.copyRowForm> 그리드-프리폼인 경우에는 selection바인딩으로 처리하기 때문에 불필요함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.copyRowForm("rptCmnTmpReg", "frfCmnTmpReg");
	}
	
	
//	moPage.onClick_BtnDel = function() {
//
//		ExtRepeat.deleteRow("rptCmnTmpReg");
//		// 학생정보 프리폼 비활성화 처리
//		moPage.doCompareFrfEnable();
//	}
	
	
	
//	moPage.onClick_BtnNew = function() {
//		// 신규로우 추가
//		ExtRepeat.insertRow("rptCmnTmpReg");
//		// 프리폼의 학번입력에 포커스
//		ExtFreeForm.setFocus("frfCmnTmpReg", "ipbFrfStudNo");
//	}
	
	
	moPage.onClick_BtnSave1 = function() {
		doSave();
	}
	
	moPage.onClick_BtnSave2 = function() {
		doSave();
	}
	
	moPage.onClick_BtnRestore1 = function() {
		util.Grid.restoreRow(app, "grdCmnTmpReg");
		// 학생정보 프리폼 비활성화 처리
		doCompareFrfEnable();
//TO-BE: <ExtRepeat.copyRowForm> 그리드-프리폼인 경우에는 selection바인딩으로 처리하기 때문에 불필요함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.copyRowForm("rptCmnTmpReg", "frfCmnTmpReg");
	}
	
	moPage.onClick_BtnDel1 = function() {

		util.Grid.deleteRow(app, "grdCmnTmpReg");
		// 학생정보 프리폼 비활성화 처리
		doCompareFrfEnable();
	}
	
	moPage.onClick_BtnNew1 = function() {
		// 신규로우 추가
		util.Grid.insertRow(app, "grdCmnTmpReg");
		// 프리폼의 학번입력에 포커스
		util.Control.setFocus(app,  "ipbFrfStudNo");
	}
	
	function doTabChange(vpKind){
		if(vpKind == '1'){
			util.Tab.setSelectedTabItem(app, "tab1", "tab1_case1");
		}else{
			util.Tab.setSelectedTabItem(app, "tab1", "tab1_case2");
		}
	}
	
	
	moPage.onClick_BtnSave3 = function() {
		doSave();
	}
	
	moPage.onClick_BtnRestore2 = function() {
		util.Grid.restoreRow(app, "grdCmnTmpReg");
		// 학생정보 프리폼 비활성화 처리
		doCompareFrfEnable();
//TO-BE: <ExtRepeat.copyRowForm> 그리드-프리폼인 경우에는 selection바인딩으로 처리하기 때문에 불필요함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.copyRowForm("rptCmnTmpReg", "frfCmnTmpReg");
	}
	
	moPage.onClick_BtnSave4 = function() {
		doSave();
	}
	
	moPage.onClick_BtnRestore3 = function() {
		util.Grid.restoreRow(app, "grdCmnTmpReg");
		// 학생정보 프리폼 비활성화 처리
		doCompareFrfEnable();
//TO-BE: <ExtRepeat.copyRowForm> 그리드-프리폼인 경우에는 selection바인딩으로 처리하기 때문에 불필요함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.copyRowForm("rptCmnTmpReg", "frfCmnTmpReg");
	}
	
	moPage.onClick_BtnRestore4 = function() {
		util.Grid.restoreRow(app, "grdCmnTmpReg");
		// 학생정보 프리폼 비활성화 처리
		doCompareFrfEnable();
//TO-BE: <ExtRepeat.copyRowForm> 그리드-프리폼인 경우에는 selection바인딩으로 처리하기 때문에 불필요함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.copyRowForm("rptCmnTmpReg", "frfCmnTmpReg");
	}
	return moPage;
};

