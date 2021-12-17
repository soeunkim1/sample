//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
///<xtmlink path="./extCsrCIfrSndHist.xtm"/>

var extCsrCIfrSndHist = function() {

	var moPage = new Page();
	//임포트용 데이터 통신 오브젝트
	var moPObject = new PObject();

	/**
	 * @desc  Header Import onLoad
	 * @param 
	 * @return
	 * @author Choi In Seong 2016. 5. 4
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		doHeaderOnLoad();
	};

	/**
	 * @desc 통지서 발송 이력 온로드
	 * @param 
	 * @return
	 * @author Choi In Seong 2016. 5. 4
	 */
	moPage.onModelConstructDone_extCsrCIfrSndHist = function() {

		//리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["rptExtCsrIfrSnd","rptExtCsrIfrSummary"]);
		//검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", "grpData");
		//서브미션 실행 (실패시 cover page)
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				var vsKeyDate = util.DataMap.getValue(app, "dmResOnLoad", "strKeyDate");
				util.Control.setValue(app, "dipStDt", vsKeyDate);
				util.Control.setValue(app, "dipEndDt", vsKeyDate);
				util.Control.redraw(app, ["cbbIfrSheetDivRcd", "dipStDt", "dipEndDt"]);
			}
		});
	}

	/**
	 * @desc 작업취소
	 * @param 
	 * @return
	 * @author Choi In Seong 2016. 5. 4
	 */
	moPage.onClick_BtnRestore = function() {
		util.Grid.restoreRow(app, "grdExtCsrIfrSnd");
	};

	/**
	 * @desc 저장버튼 클릭 이벤트
	 * @param 
	 * @return
	 * @author Choi In Seong 2016. 5. 4
	 */
	moPage.onClick_BtnSave = function() {
		doSave();
	};

	/**
	 * @desc 조회 버튼 클릭 이벤트
	 * @param 
	 * @return
	 * @author Choi In Seong 2016. 5. 4
	 */
	moPage.onClick_BtnSearch = function() {
		 //작업영역 리피트 변경 내역 체크
		if(util.Grid.isModified(app, "", "CRM")){
			return false;
		}
		var vsStDt = util.Control.getValue(app, "dipStDt");
		var vsEndDt = util.Control.getValue(app, "dipEndDt");
		if(ValueUtil.fixNull(vsStDt)!=""&&ValueUtil.fixNull(vsEndDt)!=""){
			// 조회조건 필수 체크
			if(!util.validate(app, ["dipEndDt"])){
				return false;
			}
		}
		doList(function(pbSuccess) {
			// 조회 : "조회되었습니다." header 메세지 표시
			if (pbSuccess) util.Msg.notify(app, "NLS.INF.M024");
		});
	};

	/**
	 * @desc 발송목록 조회
	 * @param 
	 * @return
	 * @author Choi In Seong 2016. 5. 4
	 */
	function doList(poCallBackFunc) {

		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdExtCsrIfrSnd");
				util.Control.redraw(app, "grdExtCsrIfrSummary");
				
				// 조회 후 콜백함수 수행
				if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
			}
		});
	}

	/**
	 * @desc 발송목록 저장
	 * @param 
	 * @return
	 * @author Choi In Seong 2016. 5. 4
	 */
	function doSave() {

		// 리피터 변경사항 체크
		if(!util.Grid.isModified(app, "grdExtCsrIfrSnd", "MSG")){
			return false;
		}
		//리피트 validation check
		if(!util.validate(app, "grdExtCsrIfrSnd")) return false;

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


	moPage.onValueChanged_RhCkbSelect1 = function() {
//TO-BE: <ExtRepeat.selectedAllPanel> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.selectedAllPanel("rhCkbSelect");
	}
	
	
	moPage.onValueChanged_RhCkbSelect = function() {
//TO-BE: <ExtRepeat.selectedAllPanel> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.selectedAllPanel("rhCkbSelect");
	}
	return moPage;
};
