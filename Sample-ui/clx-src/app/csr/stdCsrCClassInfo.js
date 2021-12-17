//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
///<xtmlink path="./stdCsrCClassInfo.xtm"/>

var stdCsrCClassInfo = function() {

	var moPage = new Page();
	//임포트용 데이터 통신 오브젝트
	var moPObject = new PObject();

	var msStudId = "";
	
	/**
	 * @desc 서브페이지 임포트 온로드
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 3. 8
	 */
	moPage.onLoadImportDone_ImpSbpHeader = function() {
		doSbpHeaderOnLoad();
	}
				
	/**
	 * @desc 화면 온로드
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 3. 8
	 */
	moPage.onModelConstructDone_stdCsrCClass = function() {
		//리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init("rptCsrClass");

		//서브미션 실행 (실패시 cover page)
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				
				var voParentPage = ExtSubPage.getParent();
				
				// 부모멤버변수에담긴학번받음
				msStudId = moPage.parent.moParentObj.studId;
				if (ValueUtil.isNull(msStudId)) {
					return false;
				}else{
					doList(function(pbSuccess) {
						// 조회 : "조회되었습니다." header 메세지 표시
						if(pbSuccess) {
							moPage.parentSendMsg("lblTitleRptCsrClass", NLS.INF.M024);
						}
					});
				}
			}
		});
	}

	/**
	 * @desc 반정보 조회
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 3. 8
	 */
	function doList(poCallBackFunc) {
		util.DataMap.setValue(app, "dmReqList", "strStudId", msStudId);
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdCsrClass");
				util.Control.redraw(app, "lblRowCnt_rptCsrClass");
			}
			// 조회 후 콜백함수 수행
			if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
		});
	}

	/**
	 * @desc 반정보 신규
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 3. 8
	 */
	moPage.onClick_BtnNew = function() {
		//신규는 한건씩만 가능
		var vsInsertRow = ExtRepeat.getStatusChk("rptCsrClass", "insert");
		if(ValueUtil.fixNull(vsInsertRow) != ""){
			//"신규는 한 건씩 순차적으로 가능합니다."
			util.Msg.alert("NLS-CSR-M119");
			return false;
		}
		
		//해당 리피트 insertRow 후 편집 시작할 컬럼 지정
		var vnNewIndex = util.Grid.insertRow(app, "grdCsrClass");
		util.Grid.setCellValue(app, "grdCsrClass", "STUD_ID", msStudId);
		util.Grid.setCellValue(app, "grdCsrClass", "END_DT", "99991231000000");
		
		var vsPath = "/root/resList/rptCsrClass/row[ child:: UPT_STATUS != 'N' ]";
