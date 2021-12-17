//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./stdCgdCScrConv.xtm"/>

/**
 * 점수환산관리
 * @class stdCgdCScrConv
 * @author 박갑수 at 2016. 3. 16
 */
var stdCgdCScrConv = function() {
	var moPage = new Page();
	
	/**
	 * @desc import 헤더 초기화
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 3. 16
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		// import 헤더 초기화
		doHeaderOnLoad();
	};
	
	/**
	 * @desc onLoad 실행
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 16
	 */
	moPage.onModelConstructDone_StdCgdCScrConv = function() {
		
		// 리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["rptCgdScrConv"]);
		// 검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grpData"]);
		
		// 서브미션 호출
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				
				util.Control.redraw(app, ["cbbRecCiiRcd"]);
				util.Control.setFocus(app, "cbbRecCiiRcd");
			}
		}, true);
	};
	
	/**
	 * @desc [btnSearch]조회 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 16
	 */
	moPage.onClick_BtnSearch = function() {
		 // 작업영역 리피트 변경 내역 체크
		if(util.Grid.isModified(app, "", "CRM")){
			return false;
		}
		
		// 조회조건 필수 체크
		if(!util.validate(app, ["cbbRecCiiRcd"])){
			return false;
		}

		// 조회
		doList(function(pbSuccess) {
			// 조회 : "조회되었습니다." header 메세지 표시
			if (pbSuccess) util.Msg.notify(app, "NLS.INF.M024");
		});
	};
	
	/**
	 * @desc  점수환산관리목록 조회
	 * @param {Function} poCallBackFunc 콜백정의
	 * @return void
	 * @author 박갑수 at 2016. 3. 16
	 */
	function doList(poCallBackFunc) {
		
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdCgdScrConv");	
				// 조회 후 콜백함수 수행
				if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess); 
			}
		}); 
	};
	
	/**
	 * @desc [rhCkbSelect]패널 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 16
	 */
	moPage.onValueChanged_RhCkbSelect = function() {
		// 리피트 패널 설정
//TO-BE: <ExtRepeat.selectedAllPanel> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.selectedAllPanel("rhCkbSelect");
	};
	
	/**
	 * @desc [btnNew]신규 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 16
	 */
	moPage.onClick_BtnNew = function() {
		// 해당 리피트 insert 후 편집 시작할 컬럼 지정
		var vnIdx = util.Grid.insertRow(app, "grdCgdScrConv", "rdIpbCiiGp");
		
		// 신규 Defalut값 설정 
		// 성적기준구분 : 조회조건
		var vsRecCiiRcd = util.Control.getValue(app, "cbbRecCiiRcd"); 
		util.Grid.setCellValue(app, "grdCgdScrConv", "REC_CII_RCD", vsRecCiiRcd, vnIdx);
	};
	
	/**
	 * @desc [btnDel]삭제 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 16
	 */
	moPage.onClick_BtnDel = function() {
		// 해당 리피트 delete
		util.Grid.deleteRow(app, "grdCgdScrConv");
	};
	
	/**
	 * @desc [btnRestore]작업취소 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 16
	 */
	moPage.onClick_BtnRestore = function() {
		// 해당 리피트 상태 초기화
		util.Grid.restoreRow(app, "grdCgdScrConv");
	};
	
	/**
	 * @desc [btnSave]작업저장 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 16
	 */
	moPage.onClick_BtnSave = function() {
		// 작업저장
		doSave();
	};
	
	/**
	 * @desc 점수환산관리목록 변경사항 저장
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 16
	 */
	function doSave() {
		
		// 리피트 변경사항 체크
		if(!util.Grid.isModified(app, ["grdCgdScrConv"], "MSG")){
			return false;
		}
		
		// 리피트 Validation Check
		if(!util.validate(app, "grdCgdScrConv")) return false;

		//strCommand: save 
		util.Submit.send(app, "subSave", function(pbSuccess){
			if(pbSuccess){
				doList(function(pbListSuccess) {
					// 조회 : "갱신된 데이터가 조회되었습니다." header 메세지 표시
					if (pbListSuccess) util.Msg.notify(app, "NLS.INF.M025");
				});
			}
		});
	};
	
	/**
	 * @desc [rdIpbCiiGp]기준평점 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 16
	 */
	moPage.onValueChanged_RdIpbCiiGp = function() {
		ValidUtil.checkIntegerDecimal("rdIpbCiiGp", 1, 3, true);
	};
	
	/**
	 * @desc [rdIpbTgtCiiGp]대상기준평점 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 16
	 */
	moPage.onValueChanged_RdIpbTgtCiiGp = function() {
		ValidUtil.checkIntegerDecimal("rdIpbTgtCiiGp", 1, 3, true);
	};
	
	/**
	 * @desc [rdIpbCiiScr]기준점수 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 16
	 */
	moPage.onValueChanged_RdIpbCiiScr = function() {
		ValidUtil.checkIntegerDecimal("rdIpbCiiScr", 3, 2, true);
	};
	
	/**
	 * @desc [rdIpbTgtScr]대상점수 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 16
	 */
	moPage.onValueChanged_RdIpbTgtScr = function() {
		ValidUtil.checkIntegerDecimal("rdIpbTgtScr", 3, 2, true);
	};

	return moPage;
};
