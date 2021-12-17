
//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./stdCcsCRoom.xtm"/>


var stdCcsCRoom = function() {
		
	
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
		// 동서울대 건물목록 CRUD 사용 안함 
		// 타프로젝트 사용시 해당부분 없애고 rowCount 제자리, 컨트롤 ReadOnly 및 Enable 속성제거 필요
		util.Control.setVisible(app, false, ["btnNew", "btnDel", "btnRestore", "btnSave"]);
		
		//리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init("rptCcsRoom");
		//검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grpData"]);
		
		
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				
				util.Control.redraw(app, ["cbbBuild"]);
				util.SelectCtl.selectItem(app, "cbbBuild", 0);
				util.Control.setFocus(app, "cbbBuild");
			}
		}, true);
		
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
	moPage.onValueChanged_RhCkbSelect = function() {
//TO-BE: <ExtRepeat.selectedAllPanel> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.selectedAllPanel("rhCkbSelect");
	};
	
	
	
	
	/**
	 * @desc 신규 click event
	 *            강의실목록 리피트 row 추가
	 * @return void
	 * @author 최영경 2016-01-18
	 */		
	moPage.onClick_BtnNew = function() {
		//해당 리피트 insertRow 후 편집 시작할 컬럼 지정		
		var voNewRow = util.Grid.insertRow(app, "grdCcsRoom", "rdIpbLectRoomCd");		
		var vsBuildCd = util.DataMap.getValue(app, "dmReqList", "strBuildCd");
		util.Grid.setCellValue(app, "grdCcsRoom", "BD_CD", vsBuildCd, voNewRow, false, true);
		
	};
	
	
	
	/**
	 * @desc 삭제 click event
	 *            강의실목록 리피트 index row 삭제 status 변경
	 * @return void
	 * @author 최영경 2016-01-18
	 */	
	moPage.onClick_BtnDel = function() {
		util.Grid.deleteRow(app, "grdCcsRoom");
	};
	
	/**
	 * @desc 작업취소 click event
	 *            강의실목록 리피트 index row restore
	 * @return void
	 * @author 최영경 2016-01-18
	 */	
	moPage.onClick_BtnRestore = function() {
		util.Grid.restoreRow(app, "grdCcsRoom");
	};
	
	/**
	 * @desc 작업저장 click event
	 *            강의실목록 리피트 변경내역 저장
	 * @return void
	 * @author 최영경 2016-01-18
	 */	
	moPage.onClick_BtnSave = function() {
		doSave();
		
	};
	
	
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
	moPage.onValueChanged_RdIpbSpvsDeptNm = function(sender) {
		doOnChangeStdCmnPObjSch(sender);
	};
	
	
	
	/**
	 * @desc  강의실목록 리피트 주관부서명 버튼클릭
	 * @return void
	 * @author 최영경 2016-01-18
	 */
	moPage.onClick_RdBtnOgNm = function(sender) {
		
		doOnClickStdCmnPObjSch(sender);
	};
	
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
	
	
	
	/*
		강의실 정보를 삭제하고
		시설에 있는 강의실정보를 가져온다.
	*/
	moPage.onClick_BtnNew1 = function() {
		
		
		
		
		if(util.Msg.confirm("NLS-CCS-M082") !=  MsgBox.IDOK) {
			return;
		}
		
			//strCommand: batch 
			util.Submit.send(app, "subBatch", function(pbSuccess){
				if(pbSuccess){
					doList(function(pbSuccess) {
						// 처리되었습니다.
						if (pbSuccess) util.Msg.notify(app, "NLS.INF.M003"); 
					});	
				}
			}); 
		
		
	}
	return moPage;
};

