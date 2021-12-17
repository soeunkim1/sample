//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
///<xtmlink path="./extCsrSExpPrt.xtm"/>

var extCsrSExpPrt = function() {

	var moPage = new Page();
	//임포트용 데이터 통신 오브젝트
	var moPObject = new PObject();
	
	/**
	 * @desc Header Import onLoad
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 5. 11
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		doHeaderOnLoad();
	};

	/**
	 * @desc 화면 온로드
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 5. 11
	 */
	moPage.onModelConstructDone_extCsrSStudAddrPrt = function() {
		// 조회조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch",["grp_rptCsrShreg"]);
		
		//서브미션 실행 (실패시 cover page)
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				
				util.DataMap.setValue(app, "dmReqList", "strStDate", util.DataMap.getValue(app, "dmResOnLoad", "strKeyDate"));
				util.DataMap.setValue(app, "dmReqList", "strEndDate", util.DataMap.getValue(app, "dmResOnLoad", "strKeyDate"));
				util.DataMap.setValue(app, "dmReqList", "strChgDivRcd", "CSR01101");
				
				util.DataMap.setValue(app, "dmReqList", "strPrtObjDivRcd", "CC009OG");
				// 조회조건 초기화
				util.Control.redraw(app, ["dipStDate", "dipEndDate", "cbbChgDivRcd", "cbbObjDivRcd"]);

				// 소속 포커스
				util.Control.setFocus(app, "ipbDeptNm");				
			}
		});
	}

	/**
	 * @desc 조회버튼 클릭
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 5. 11
	 */
	moPage.onClick_BtnSearch = function() {
		// 조회조건 필수 체크
		if(!util.validate(app, ["dipStDate", "dipEndDate"])){
			return false;
		}
		
		doList();
	};
	
	/**
	 * @desc 조회
	 * @param 
	 * @return 
	 * @author Choi In Seong 2016. 5. 11
	 */
	function doList(poCallBackFunc) {

			var vsChgDivRcd = util.Control.getValue(app, "cbbChgDivRcd");
			var vsChgDivNm = util.SelectCtl.getLabel(app, "cbbChgDivRcd", util.SelectCtl.getSelectedIndex(app, "cbbChgDivRcd"));
			
			var vsTitle = "";
			if(ValueUtil.isNull(vsChgDivRcd)){
				vsTitle =  "모집단위 폐지 학적변경자 명단"
			}else{
				vsTitle =  "모집단위 폐지("+vsChgDivNm+") 학적변경자 명단"
			}
			
			//리퀘스트 셋팅
			var voParam = {
						p_strChgDivRcd          : util.DataMap.getValue(app, "dmReqList", "strChgDivRcd"),
						p_strKeyDate              : util.DataMap.getValue(app, "dmReqList", "strEndDate").substr(0,8),
						p_strStDate                 : util.DataMap.getValue(app, "dmReqList", "strStDate").substr(0,8),
						p_strEndDate              : util.DataMap.getValue(app, "dmReqList", "strEndDate").substr(0,8),
						p_strPrtObjDivRcd        : util.DataMap.getValue(app, "dmReqList", "strPrtObjDivRcd"),
						p_strPrtPageNextYn     : util.DataMap.getValue(app, "dmReqList", "strPrtPageNextYn"),
						p_strLandivRcd           : msDefaultLocale
					}	
			
			 var voOzFormParam = {
					  TITLE :  vsTitle  //리포트타이틀
					, SUB_TITLE : "" //리포트서브타이틀		
					, FORM_TYPE : "flash"
				};	
					
			util.Report.open(app, "hojReport", "extCsrSExpPrt", voOzFormParam, voParam);

	}

	
	return moPage;
};

