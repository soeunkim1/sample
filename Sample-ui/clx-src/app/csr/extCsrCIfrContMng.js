//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
///<xtmlink path="./extCsrCIfrContMng.xtm"/>

var extCsrCIfrContMng = function() {

	var moPage = new Page();
	//임포트용 데이터 통신 오브젝트
	var moPObject = new PObject();

	/**
	 * @desc 화면 타이틀 초기화
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 4. 25
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		doHeaderOnLoad();
	};
	
	/**
	 * @desc 화면 온로드
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 4. 25
	 */
	moPage.onModelConstructDone_extCsrCIfrContMng = function() {
		//리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["rptExtCsrIfrCont", "frfExtCsrIfrCont"]);
		
		//검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", "grpData");
		//서브미션 실행 (실패시 cover page)
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
					util.Control.setValue(app, "cbbSchYearRcd", util.DataMap.getValue(app, "dmResOnLoad", "strSchYearRcd"));
					util.Control.setValue(app, "cbbSmtRcd", util.DataMap.getValue(app, "dmResOnLoad", "strSmtRcd"));
					ExtRepeat.refresh("frfExtCsrIfrCont");
					util.Control.redraw(app, ["cbbSchYearRcd", "cbbSmtRcd", "cbbIfrSheetDivRcd"]);
					ExtControl.setBind(["rdCbbSchYearRcd","rdCbbSmtRcd","rdCbbIfrSheetDivRcd"], "bndNew");
			}
		});
	}

	/**
	 * @desc 조회 버튼 클릭
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 4. 25
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
	 * @desc 통지서 문구 목록 조회
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 4. 25
	 */
	function doList(poCallBackFunc) {

		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdExtCsrIfrCont", "frfExtCsrIfrCont");
				doCompareFrfEnable();
				// 조회 내역이 없으면 프리폼 초기화
				var vnRptCnt = util.DataSet.getRowCount(app, "dsRptExtCsrIfrCont");
				if(vnRptCnt == 0){
					util.Control.reset(app, "frfExtCsrIfrCont");
				}
				
				// 조회 후 콜백함수 수행
				if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
			}
		});
	}
	
	/**
	 * @desc 신규버튼 클릭
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 4. 25
	 */
	moPage.onClick_BtnNew = function() {
		var vsSchYearRcd = util.Control.getValue(app, "cbbSchYearRcd");
		var vsSmtRcd = util.Control.getValue(app, "cbbSmtRcd");
		var vsIfrSheetDivRcd = util.Control.getValue(app, "cbbIfrSheetDivRcd");
		
		//해당 리피트 insertRow 후 편집 시작할 컬럼 지정
		util.Grid.insertRow(app, "grdExtCsrIfrCont");
		util.FreeForm.setValue(app, "frfExtCsrIfrCont", "SCH_YEAR_RCD", vsSchYearRcd);
		util.FreeForm.setValue(app, "frfExtCsrIfrCont", "SMT_RCD", vsSmtRcd);
		util.FreeForm.setValue(app, "frfExtCsrIfrCont", "IFR_SHEET_DIV_RCD", vsIfrSheetDivRcd);
	};

	/**
	 * @desc 삭제버튼 클릭
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 4. 25
	 */
	moPage.onClick_BtnDel = function() {
		util.Grid.deleteRow(app, "grdExtCsrIfrCont");
		util.Control.reset(app, "frfExtCsrIfrCont");
		doCompareFrfEnable();
//TO-BE: <ExtRepeat.copyRowForm> 그리드-프리폼인 경우에는 selection바인딩으로 처리하기 때문에 불필요함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.copyRowForm("rptExtCsrIfrCont", "frfExtCsrIfrCont");
	};

	/**
	 * @desc 작업취소
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 4. 25
	 */
	moPage.onClick_BtnRestore = function() {
		util.Grid.restoreRow(app, "grdExtCsrIfrCont");
		util.Control.reset(app, "frfExtCsrIfrCont");
		doCompareFrfEnable();
//TO-BE: <ExtRepeat.copyRowForm> 그리드-프리폼인 경우에는 selection바인딩으로 처리하기 때문에 불필요함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.copyRowForm("rptExtCsrIfrCont", "frfExtCsrIfrCont");
	};

	/**
	 * @desc 저장버튼 클릭
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 4. 25
	 */
	moPage.onClick_BtnSave = function() {
		doSave();
	};



	/**
	 * @desc 통지서 문구 저장
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 4. 25
	 */
	function doSave() {

		// 리피터 변경사항 체크
		if(!util.Grid.isModified(app, "grdExtCsrIfrCont", "MSG")){
			return false;
		}
		//리피트 validation check
		if(!util.validate(app, "grdExtCsrIfrCont")) return false;

		//strCommand: save 
		util.Submit.send(app, "subSave", function(pbSuccess){
			if(pbSuccess){
				doList(function(pbListSuccess) {
					// 조회 : "갱신된 데이터가 조회되었습니다." header 메세지 표시
					if (pbListSuccess) util.Msg.notify(app, "NLS.INF.M025");
				});
			}
		});
	}

	/**
	 * @desc 리피트 panel click event
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 4. 25
	 */
	moPage.onValueChanged_RhCkbSelect = function() {
//TO-BE: <ExtRepeat.selectedAllPanel> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.selectedAllPanel("rhCkbSelect");
	};	
	
	
	/**
	 * @desc 마스터 리피트 상태에 따른 프리폼 비활성화 제어
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 4. 25
	 */
	function doCompareFrfEnable() {

		if( (!util.Grid.getIndex(app, "grdExtCsrIfrCont"))
			|| util.Grid.getRowState(app, "grdExtCsrIfrCont") == cpr.data.tabledata.RowState.DELETED) {
			util.Control.setEnable(app, false, ["frfExtCsrIfrCont"]);	
		} else {
			util.Control.setEnable(app, true, ["frfExtCsrIfrCont"]);	
		}
	}

	/**
	 * @desc 리피트 rowSelect event
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 4. 25
	 */
	moPage.onRowSelect_RptExtCsrIfrCont = function() {
		// 리피트 현재 index get
		var vnIndex = util.Grid.getIndex(app, "grdExtCsrIfrCont");
		//리피트 특정 row 데이터를 프리폼 copy
//TO-BE: <ExtRepeat.copyRowForm> 그리드-프리폼인 경우에는 selection바인딩으로 처리하기 때문에 불필요함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.copyRowForm("rptExtCsrIfrCont", "frfExtCsrIfrCont", vnIndex);
//TO-BE: <ExtControl.refreshBind> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtControl.refreshBind("bndNew");
		//프리폼 비활성화 제어
		doCompareFrfEnable();
	};

	/**
	 * @desc 프리폼 update event
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 4. 25
	 */
	moPage.onUpdate_FrfExtCsrIfrCont = function() {
//TO-BE: <ExtFreeForm.updateToRpt> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtFreeForm.updateToRpt("rptExtCsrIfrCont", "frfExtCsrIfrCont");
	};

	/**
	 * @desc 선택된 행을 복사한다.
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 4. 25
	 */
	moPage.onClick_BtnNewCopy = function() {
		var voRpt = ExtControl.getControl("rptExtCsrIfrCont");
		vsSelIdx = voRpt.getSelectedRowPos("", "");

					
		if(vsSelIdx == ""){
			// 라인을 선택하세요.
			util.Msg.notify(app, "NLS.INF.M023");
			return false;
		}
		
		var vnNewIdx =  util.Grid.insertRow(app, "grdExtCsrIfrCont");
		//선택된 행 복사
		ExtRepeat.copyToRowData("rptExtCsrIfrCont", vsSelIdx, "rptExtCsrIfrCont", vnNewIdx);
		util.Grid.setCellValue(app, "grdExtCsrIfrCont", "UPT_STATUS", "N", vnNewIdx);
		//리피트 특정 row 데이터를 프리폼 copy
//TO-BE: <ExtRepeat.copyRowForm> 그리드-프리폼인 경우에는 selection바인딩으로 처리하기 때문에 불필요함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.copyRowForm("rptExtCsrIfrCont", "frfExtCsrIfrCont", vnNewIdx);
	};
	
	/**
	 * @desc 선택한 통지서를 볼수 있는 팝업 호출
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 4. 25
	 */
	moPage.onClick_BtnPreView = function() {
		var vsUpt = util.Grid.getCellValue(app, "grdExtCsrIfrCont", "UPT_STATUS");
		if(vsUpt == "N" || vsUpt  == "U" || vsUpt  == "D"){
			return;
		}
		var vsReportId = util.Grid.getCellValue(app, "grdExtCsrIfrCont", "REPORT_ID");
		
		var vsSchYearRcd    = util.Grid.getCellValue(app, "grdExtCsrIfrCont", "SCH_YEAR_RCD");
		var vsSmtRcd          = util.Grid.getCellValue(app, "grdExtCsrIfrCont", "SMT_RCD");
		var vsIfrSheetDivRcd = util.Grid.getCellValue(app, "grdExtCsrIfrCont", "IFR_SHEET_DIV_RCD");
		//리퀘스트 셋팅
		var voParam = {
					p_strSchYearRcd 		: vsSchYearRcd,
					p_strSmtRcd       		: vsSmtRcd,
					p_strIfrSheetDivRcd    	: vsIfrSheetDivRcd,
					p_strStudId        		: "('')",
					p_strLandivRcd   		: msDefaultLocale,
					p_strListSaCd        	: "('')"
				}	
				
			 var voOzFormParam = {
					  TITLE : "" //리포트타이틀
					, SUB_TITLE : "" //리포트서브타이틀		
					, FORM_TYPE : "flash"
				};	
				
		ReportUtil.fOzPopupOpen("미리보기", vsReportId, voOzFormParam, voParam);
	};
	return moPage;
};

