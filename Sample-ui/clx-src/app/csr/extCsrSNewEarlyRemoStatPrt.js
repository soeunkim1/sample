//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCsrSNewEarlyRemoStatPrt.xtm"/>


var extCsrSNewEarlyRemoStatPrt = function() {
	var moPage = new Page();
	/**
	 * 임포트 초기화
	 * @member moPage
	 * @type void
	 * @author hyunteak at 16. 11. 3 오후 2:14
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		doHeaderOnLoad();
	}
	
	/**
	 * 온로드
	 * @member moPage
	 * @type void
	 * @author hyunteak at 16. 11. 3 오후 2:14
	 */
	moPage.onModelConstructDone_ExtCsrSNewEarlyRemoStatPrt = function() {
		// 조회조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch",["grp_rptCsrShreg"]);
		
		//서브미션 실행 (실패시 cover page)
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				util.Control.setValue(app, "cbbCapIoDivRcd","CT51301");
				// 조회조건 초기화
				util.Control.redraw(app, ["cbbYearRcd","cbbCapIoDivRcd"]);
				doGetKeyDate();
				// 시작일자 포커스
				util.Control.setFocus(app, "ipbStDt");				
			}
		});
	};
	/**
	 * 학년도 변경시 제적 시작 종료일자 셋팅
	 * @member moPage
	 * @type void
	 * @author hyunteak at 16. 11. 3 오후 2:15
	 */
	moPage.onValueChanged_CbbYearRcd = function() {
		//제적 시작 종료일자 셋팅
		doGetKeyDate();
	}
	/**
	 * 제적 시작 종료일자 셋팅
	 * @member moPage
	 * @type void
	 * @author hyunteak at 16. 11. 3 오후 2:15
	 */
	function doGetKeyDate() {
	
		//strCommand: getKeyDate 
		util.Submit.send(app, "subGetKeyDate", function(pbSuccess) {

			if (pbSuccess) {
				util.DataMap.setValue(app, "dmReqList", "strPrevStDt", util.DataMap.getValue(app, "dmResGetKeyDate", "strPrevStDt"));
				util.DataMap.setValue(app, "dmReqList", "strPrevEndDt", util.DataMap.getValue(app, "dmResGetKeyDate", "strPrevEndDt"));
				util.DataMap.setValue(app, "dmReqList", "strStDt", util.DataMap.getValue(app, "dmResGetKeyDate", "strStDt"));
				util.DataMap.setValue(app, "dmReqList", "strEndDt", util.DataMap.getValue(app, "dmResGetKeyDate", "strEndDt"));

			}else{
				util.DataMap.setValue(app, "dmReqList", "strStDt","");
				util.DataMap.setValue(app, "dmReqList", "strEndDt", "");
				
			}
			util.Control.redraw(app, ["ipbStDt","ipbEndDt","ipbPrevStDt","ipbPrevEndDt"]);
		});
	};
	/**
	 * 조회버튼 클릭
	 * @member moPage
	 * @type Boolean
	 * @return 
	 * @author hyunteak at 16. 11. 3 오후 2:15
	 */
	moPage.onClick_BtnSearch = function() {
		// 조회조건 필수 체크
		if(!util.validate(app, ["cbbYearRcd", "ipbStDt","ipbEndDt"])){
			return false;
		}
		//조회
		doList();
	}
	/**
	 * 조회
	 * @member moPage
	 * @param {?} poCallBackFunc
	 * @type void
	 * @author hyunteak at 16. 11. 3 오후 2:16
	 */
	function doList(poCallBackFunc) {
				
		// submission call 
		//strCommand: list 
		util.Submit.send(app, "subList",  function(pbSuccess) {
			if(pbSuccess){
				var vsSchYearRcd = util.DataMap.getValue(app, "dmReqList", "strSchYearRcd");
				var vsSchYear = vsSchYearRcd.replace("CA006","");
				var vsPrevYear = Number(vsSchYear)-1;
				var vsSchYearNm = util.SelectCtl.getLabel(app, "cbbYearRcd", util.SelectCtl.getSelectedIndex(app, "cbbYearRcd"));
				var vsCapIoDivNm = util.SelectCtl.getLabel(app, "cbbCapIoDivRcd", util.SelectCtl.getSelectedIndex(app, "cbbCapIoDivRcd"));
				var vsSchTitle = "학년도 : " + vsSchYearNm;
				
				//리퀘스트 셋팅
				var voParam = {
							p_strPrevStDt              : util.DataMap.getValue(app, "dmReqList", "strPrevStDt"),
							p_strPrevEndDt              : util.DataMap.getValue(app, "dmReqList", "strPrevEndDt"),
							p_strStDt              : util.DataMap.getValue(app, "dmReqList", "strStDt"),
							p_strEndDt              : util.DataMap.getValue(app, "dmReqList", "strEndDt"),
							
							p_strSchYearRcd        : util.DataMap.getValue(app, "dmReqList", "strSchYearRcd"),
							p_strSchYearNm         : vsSchYearNm,
							
							p_strCapIoDivRcd        : util.DataMap.getValue(app, "dmReqList", "strCapIoDivRcd"),
							p_strCapIoDivNm        : vsCapIoDivNm,
							
							p_strLanDivRcd           : msDefaultLocale,
							p_strSchTitle               : vsSchTitle
						}	
						
				var vsTitle =vsPrevYear+ "~"+vsSchYearNm + " " + " 신입생 조기 탈락률 통계(1/2선)";  

				 var voOzFormParam = {
						  TITLE :  vsTitle  //리포트타이틀
						, SUB_TITLE : "" //리포트서브타이틀
						, FORM_TYPE : "flash"
					};	
						
				util.Report.open(app, "hojReport", "extCsrSNewEarlyRemoStatPrt", voOzFormParam, voParam);
		
			}
			if(util.isFunc(poCallBackFunc)) poFunc(pbSuccess);
		});
	}
	return moPage;
};
