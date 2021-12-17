//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./stdCcrCTlsnReqType.xtm"/>

/**
 * 수강신청유형설정
 * @class stdCcrCTlsnReqType
 * @author 박갑수 at 2016. 4. 6
 */
var stdCcrCTlsnReqType = function() {
	var moPage = new Page();
	
	/**
	 * @desc import 헤더 초기화
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 4. 6
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		// import 헤더 초기화
		doHeaderOnLoad();
	};
	
	/**
	 * @desc onLoad 실행
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 6
	 */
	moPage.onModelConstructDone_StdCcrCTlsnReqType = function() {
		// 리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["rptCcrTlsnReqType"]);
		// 검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grpData"]);
		
		// 서브미션 호출
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				
				util.Control.redraw(app, ["cbbTermTypeRcd", "cbbLimitTypeRcd"]);
				util.Control.setFocus(app, "cbbTermTypeRcd");
			}
		}, true);
	};
	
	/**
	 * @desc [btnSearch]조회 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 6
	 */
	moPage.onClick_BtnSearch = function() {
		 // 작업영역 리피트 변경 내역 체크
		if(util.Grid.isModified(app, "", "CRM")){
			return false;
		}

		// 조회
		doList(function(pbSuccess) {
			// 조회 : "조회되었습니다." header 메세지 표시
			if (pbSuccess) util.Msg.notify(app, "NLS.INF.M024");
		});
	};
	
	/**
	 * @desc  수강신청기간유형목록 조회
	 * @param {Function} poCallBackFunc 콜백정의
	 * @return void
	 * @author 박갑수 at 2016. 4. 6
	 */
	function doList(poCallBackFunc) {
		
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdCcrTlsnReqType");	
				// 조회 후 콜백함수 수행
				if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess); 
			}
		});
	};
	
	/**
	 * @desc [btnNew]신규 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 6
	 */
	moPage.onClick_BtnNew = function() {
		// 해당 리피트 insert 후 편집 시작할 컬럼 지정
		var vnIdx = util.Grid.insertRow(app, "grdCcrTlsnReqType", "rdCbbTermTypeRcd");
		
		// 신규 Defalut값 설정 
		// 수강신청기간유형 : 조회조건
		var vsTermTypeRcd = util.Control.getValue(app, "cbbTermTypeRcd"); 
		util.Grid.setCellValue(app, "grdCcrTlsnReqType", "TERM_TYPE_RCD", vsTermTypeRcd, vnIdx);
		
		// 수강신청유형타입 : 조회조건
		var vsLimitTypeRcd = util.Control.getValue(app, "cbbLimitTypeRcd"); 
		util.Grid.setCellValue(app, "grdCcrTlsnReqType", "LIMIT_TYPE_RCD", vsLimitTypeRcd, vnIdx);
	};
	
	/**
	 * @desc [btnDel]삭제 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 6
	 */
	moPage.onClick_BtnDel = function() {
		
		var vnIdx = util.Grid.getIndex(app, "grdCcrTlsnReqType");
		// 스텐다드여부
		var vsStdYn = util.Grid.getCellValue(app, "grdCcrTlsnReqType", "STD_YN");
		
		if(ValueUtil.fixNull(vsStdYn) == "Y" && util.Grid.getRowState(app, "grdCcrTlsnReqType", vnIdx) != cpr.data.tabledata.RowState.INSERTED){
			// "스탠다드 코드는 삭제할 수 없습니다." 메시지
			util.Msg.alert("NLS-CMM-M002");
			return;
			
		}else {
			// 해당 리피트 delete
			util.Grid.deleteRow(app, "grdCcrTlsnReqType");
		}
	};
	
	/**
	 * @desc [btnRestore]작업취소 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 6
	 */
	moPage.onClick_BtnRestore = function() {
		// 해당 리피트 상태 초기화
		util.Grid.restoreRow(app, "grdCcrTlsnReqType");
	};
	
	/**
	 * @desc [btnSave]작업저장 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 6
	 */
	moPage.onClick_BtnSave = function() {
		// 작업저장
		doSave();
	};
	
	/**
	 * @desc 수강신청기간유형목록 변경사항 저장
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 6
	 */
	function doSave() {
		
		// 리피트 변경사항 체크
		if(!util.Grid.isModified(app, ["grdCcrTlsnReqType"], "MSG")){
			return false;
		}
		
		// 리피트 Validation Check
		if(!util.validate(app, "grdCcrTlsnReqType")) return false;

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

	return moPage;
};
