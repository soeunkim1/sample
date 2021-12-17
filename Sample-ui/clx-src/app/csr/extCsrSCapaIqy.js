//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
///<xtmlink path="./extCsrSCapaIqy.xtm"/>

var extCsrSCapaIqy = function() {

	var moPage = new Page();
	//임포트용 데이터 통신 오브젝트
	var moPObject = new PObject();

	/**
	 * @desc  Header Import onLoad
	 * @return void
	 * @author Choi In Seong 2016. 4. 22
     */
	moPage.onLoadImportDone_ImpTitle = function() {
		doHeaderOnLoad();
	};
				
	/**
	 * @desc 여석조회 화면 온로드
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 4. 22
	 */
	moPage.onModelConstructDone_extCsrSCapaIqy = function() {
		//리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["rptEmpty"]);
		// 2. 검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grp_rptEmpty"]);
		
		//서브미션 실행 (실패시 cover page)
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				
				util.DataMap.setValue(app, "dmReqList", "strKeyDate", util.DataMap.getValue(app, "dmResOnLoad", "strKeyDate"));
				util.DataMap.setValue(app, "dmReqList", "strEndDt", util.DataMap.getValue(app, "dmResOnLoad", "strKeyDate"));
				util.Control.setValue(app, "rdbCapIoDivRcd", "%");
				util.Control.redraw(app, ["dipKeyDate", "dipEndDt", "rdbCapIoDivRcd"]);
			}
		});
	}

	/**
	 * @desc 여석조회
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 4. 22
	 */
	function doList(poCallBackFunc) {
		//strCommand: list 
		util.Submit.send(app, "subList",  function(pbSuccess) {
			if(pbSuccess){
				//rebuild
				util.Control.redraw(app, ["rptEmpty"]);
			}
			if(util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
		});
	}

	/**
	 * @desc 여석조회 버튼 클릭
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 4. 22
	 */
	moPage.onClick_BtnSearch = function() {
		// 조회조건 필수 체크
		if(!util.validate(app, ["dipKeyDate", "dipEndDt"])){
			return false;
		}
		
		doList(function(pbSuccess) {
			// 조회 : "조회되었습니다." header 메세지 표시
			if(pbSuccess) {
				util.Msg.notify(app, "NLS.INF.M024");
			}
		});
	};
	return moPage;
};

