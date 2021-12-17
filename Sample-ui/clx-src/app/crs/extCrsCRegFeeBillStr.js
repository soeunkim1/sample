//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
///<xtmlink path="./extCrsCRegFeeBillStr.xtm"/>

var extCrsCRegFeeBillStr = function() {

	var moPage = new Page();
	//임포트용 데이터 통신 오브젝트
	var moPObject = new PObject();
	
	//	폼 신규 상태 체크 
	moPage.mbIsInsertRowFrf = false;
	
	/**
	 * @desc  Header Import onLoad
	 * @return void
     * @author Aeyoung Lee 2016. 8. 24.
     */
	moPage.onLoadImportDone_ImpTitle = function() {
		doHeaderOnLoad();
	};

	/**
	 * @desc 화면온로드
	 * @return 
	 * @author Aeyoung Lee 2016. 8. 24.
	 */
	moPage.onModelConstructDone_extCrsCRegFeeBillStr = function() {

		//리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["frfExtCrsPrtTxt"]);
		util.Control.redraw(app, ["frfExtCrsPrtTxt"]);
		//서브미션 실행 (실패시 cover page)
		doList(function(pbSuccess) {
			// 조회 : "조회되었습니다." header 메세지 표시
			if (pbSuccess) util.Msg.notify(app, "NLS.INF.M024");
		});
	};

	/**
	 * @desc 고지서 출력 문구 조회
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016. 8. 24.
	 */
	function doList(poCallBackFunc) {
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "frfExtCrsPrtTxt");
				var vsRowCnt = util.DataMap.getValue(app, "dmResList", "rowCnt");
				if (vsRowCnt == "0") {
					doSubInsertRow();
				}else{
					moPage.mbIsInsertRowFrf = false;
				}
				// 조회 후 콜백함수 수행
				if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
			}
		});
	};
	
	/**
	 * @desc 고지서 출력 문구 저장버튼 클릭
	 *
	 * @return void
	 * @author Aeyoung Lee 2016. 8. 24.
	 */
	moPage.onClick_BtnSave = function() {
		doSave();
	};

	/**
	 * @desc 고지서 출력 문구 저장
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016. 8. 24.
	 */
	function doSave() {

		// 리피터 변경사항 체크
		if(!util.Grid.isModified(app, "frfExtCrsPrtTxt", "MSG")){
			return false;
		}
		//리피트 validation check
		if(!util.validate(app, "frfExtCrsPrtTxt")) return false;

		//신규일 경우 fiag insert 로 변경
		if( moPage.mbIsInsertRowFrf ){
			//신규입력일 경우 신규 플래그 설정
			util.Grid.setRowState(app, "frfExtCrsPrtTxt",cpr.data.tabledata.RowState.INSERTED,'1');
		}
		
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
	 * @desc 데이터 셋에 row 추가
	 * @param
	 * @return void
	 * @author Aeyoung Lee 2016. 8. 24.
	 */
	function doSubInsertRow() {
		//프리폼 신규
		util.FreeForm.insertRow(app, "frfExtCrsPrtTxt");
		
		//상태 오픈 상태로 변경 
		util.Grid.setRowState(app, "frfExtCrsPrtTxt",cpr.data.tabledata.RowState.UNCHANGED,'1');
		
		//신규입력이 Ok
		moPage.mbIsInsertRowFrf = true;
	};

	return moPage;
};

