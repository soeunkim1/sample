//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./stdCsrCShregCreat.xtm"/>


var stdCsrCShregCreat = function() {
	var moPage = new Page();
	var moPObject = new PObject();
	
	moPage.onLoadImportDone_ImpTitle = function() {
		doHeaderOnLoad();
	}
	
	/**
	 * @desc 온로드 실행
	 * @return void
	 * @author Choi In Seong 2016. 02. 29.
	 */
	moPage.onModelConstructDone_StdCsrCShregCreat = function() {
		doOnLoad();
	};
	
	
	/**
	 * @desc 온로드 실행
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 02. 29.
	 */
	function doOnLoad(){
		
		//리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["rptCsrProc"]);

		doList(function(pbSuccess) {
			// 조회 : "조회되었습니다." header 메세지 표시
			if(pbSuccess) {
				util.Msg.notify(app, "NLS.INF.M024");
			}
		});
	}

	/**
	 * @desc 마이그레이션 목록 조회
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 02. 29.
	 */	
	function doList(poCallBackFunc) {
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "rptCsrProc");
			}
			if(util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
		});
	}
	
	/**
	 * @desc 마이그레이션 실행버튼 클릭
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 02. 29.
	 */
	moPage.onClick_RdBtnProc = function() {
		var vsProcId = util.Grid.getCellValue(app, "grdCsrProc", "CD_PRP1");
		var vsProcNm = util.Grid.getCellValue(app, "grdCsrProc", "CD_NM");
		var vsProcCd = util.Grid.getCellValue(app, "grdCsrProc", "CD");
		
		util.DataMap.setValue(app, "dmReqKey", "strProcId", vsProcId);
		util.DataMap.setValue(app, "dmReqKey", "strProcNm", vsProcNm);
		util.DataMap.setValue(app, "dmReqKey", "strProcCd", vsProcCd);
		//strCommand: csrInfoProcExec 
		util.Submit.send(app, "subProcExec", function(pbSuccess){
			if(pbSuccess){
				doList(function(pbListSuccess) {
					// 조회 : "조회되었습니다." header 메세지 표시
					if(pbListSuccess) {
						var vsResult = util.DataMap.getValue(app, "dmResList", "strResult");
						var vsTrsfSeq = util.DataMap.getValue(app, "dmResList", "strTrsfSeq");
						var strErrorCnt = util.DataMap.getValue(app, "dmResList", "strErrorCnt");
						
						if(vsResult == "Y"){
							util.Msg.notify(app, "NLS.CSR.M117", [vsProcNm]);
						} else {
							util.Msg.notify(app, "NLS.CSR.M118", [vsTrsfSeq, strErrorCnt]);
						}
					}
				});
			}
		});
	};

	return moPage;
};
