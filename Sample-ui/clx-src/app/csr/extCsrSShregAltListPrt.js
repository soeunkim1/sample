//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
///<xtmlink path="./extCsrSShregAltListPrt.xtm"/>

var extCsrSShregAltListPrt = function() {

	var moPage = new Page();
	//임포트용 데이터 통신 오브젝트
	var moPObject = new PObject();

	/******************************************************************************************************
	 *  객체검색팝업 관련 설정사항
	 *  ▶ 설정가능 유형
	 *      1. 인스턴스
	 *      2. 리피트 디테일 셀 ID
	 *      3. 컨트롤 ID
	 *  ▶ 각 변수별 설명
	 *      iXXX : 팝업에 전달될  input 파라미터
	 *      oXXX : 팝업에서 선택한 값을 받을 데이터
	 *  	1. controlId 		: 최초 이벤트의 버튼이나 그리드 id             (필수)
	 *  	2. iCd 				: 검색조건 부서코드                                 (선택) 
	 *  	3. iNm 				: 검색조건 부서명									(선택)	
	 *  	4. iObjDivRcd 	: 검색될 객체구분코드 종류						(필수)
	 *								  (CC009OG : "행정부서", CC009SA : "학사부서", CC009SP : "이수과정", CC009CU : "교과그룹", CC009OT : "외부부서")
	 *  	5. iStartObject 	: 검색시작부서 										(선택)
	 *								  ("CC009OG20000,CC009OG70000",) 
	 *		6. iOtDivRcd 		: 외부부서구분코드 									(선택)
	 *								  (외부부서[CC009OT]일때 사용) ("CB008UNIV, CB008HSCL")
	 *		7. iOtIsTreeView	: 트리보이기 유무 									(선택)
	 *								  default : N (외부부서[CC009OT]일때 사용) "Y" 
	 *  	8. iLanDivRcd 	: 언어키													(선택)
	 *  	9. iKeyDate 		: 기준일													(필수)
	 *  	10. oObjDivRcd 	: 객체구분코드 
	 *  	11. oCd 			: 부서코드
	 *  	12. oCdNm 		: 부서명
	 *  	13. oBegDt 		: 시작일
	 *  	14. oEndDt 		: 종료일
	 *  	15. oLanDivRcd 	: 언어키
	 *  	16. func 			: 팝업에서 선택한 값을 받은 후 추가 로직이 필요한 경우 함수
	 *									  
	 *******************************************************************************************************/	
	moPObject.moIdsForStdCmnPObjSch = [
		{   //교직원검색 조회조건 행정부서
			controlId			:	"btnPopSearch",
			iCd					:	"",
			iNm					:	"ipbDeptNm",
			iObjDivRcd			:	["CC009SA", "CC009OG"],
			iStartObject    	:   "",
			iOtDivRcd			:	"",
			iOtIsTreeView	:	"",
			iLanDivRcd		:	"",
			iKeyDate			:	"/root/reqList/strStDt",
			iKeyEndDate		:	"",
			oObjDivRcd		:	"/root/reqList/strObjDivRcd",
			oCd					:	"/root/reqList/strDeptCd",
			oCdNm				:	"ipbDeptNm",
			oBegDt				:	"",
			oEndDt				:	"",
			oLanDivRcd		:	"",
			func 					:  null
		}
	];
	
	/**
	 * @desc Header Import onLoad
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 5. 18
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		doHeaderOnLoad();
	};

	/**
	 * @desc 화면 온로드
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 5. 18
	 */
	moPage.onModelConstructDone_extCsrSStudAddrPrt = function() {
		// 조회조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch",["grp_rptCsrShreg"]);
		
		//서브미션 실행 (실패시 cover page)
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				var vsCutDt = util.DataMap.getValue(app, "dmResOnLoad", "strKeyDate");
				
				util.Control.setValue(app, "ipbStDt", vsCutDt);
				util.Control.setValue(app, "ipbEndDt", vsCutDt);
				util.DataMap.setValue(app, "dmReqList", "strPrtObjDivRcd", "CC009OG");
				// 조회조건 초기화
				util.Control.redraw(app, ["ipbStDt", "ipbEndDt", "cbbAltDivRcd", "cbbAltRsnRcd", "cbbObjDivRcd"]);
				
				doAltRsnRcdFilter("");
				// 소속 포커스
				util.Control.setFocus(app, "ipbDeptNm");				
			}
		});
	}

	/**
	 * @desc 조회버튼 클릭
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 5. 18
	 */
	moPage.onClick_BtnSearch = function() {
		// 조회조건 필수 체크
		if(!util.validate(app, ["ipbDeptNm", "ipbStDt", "ipbEndDt"])){
			return false;
		}
		
		doList();
	};
	
	/**
	 * @desc 조회
	 * @param 
	 * @return 
	 * @author Choi In Seong 2016. 5. 18
	 */
	function doList(poCallBackFunc) {
		
		util.DataMap.setValue(app, "dmReqList", "strKeyDate", util.DataMap.getValue(app, "dmReqList", "strStDt"));
		
		// submission call 
		//strCommand: list 
		util.Submit.send(app, "subList",  function(pbSuccess) {
			if(pbSuccess){
		
				var vsAltDivNm = util.SelectCtl.getLabel(app, "cbbAltDivRcd", util.SelectCtl.getSelectedIndex(app, "cbbAltDivRcd"));
				var vsAltRsnNm = util.SelectCtl.getLabel(app, "cbbAltRsnRcd", util.SelectCtl.getSelectedIndex(app, "cbbAltRsnRcd"));
				
				var vsStDt = ExtInput.getText("ipbStDt");
				var vsEndDt = ExtInput.getText("ipbEndDt");
				var vsSaNm = util.DataMap.getValue(app, "dmReqList", "strDeptNm");
				var vsSchTitle =  vsStDt + " ~ " + vsEndDt;
				var vsSchTitle1 = "";
				var vsSchTitle2 = "";
				var viSchCnt = 0;
				
				if(util.SelectCtl.getSelectedIndex(app, "cbbAltDivRcd") != 0){
					viSchCnt = viSchCnt + 1;
				}
				
				if(util.SelectCtl.getSelectedIndex(app, "cbbAltRsnRcd") != 0 ){
					viSchCnt = viSchCnt + 1;
				}
				

				if(viSchCnt > 1){
					if(util.SelectCtl.getSelectedIndex(app, "cbbAltDivRcd") != 0 ){
						if(vsSchTitle2 !== "") {
							vsSchTitle2 = vsSchTitle2 + "     " ; 
						}
							vsSchTitle2 = vsSchTitle2 + "변동구분 : " + vsAltDivNm;
					}
					
					if(util.SelectCtl.getSelectedIndex(app, "cbbAltRsnRcd") != 0){
						if(vsSchTitle2 !== "") {
							vsSchTitle2 = vsSchTitle2 + "     " ; 
						}
							vsSchTitle2 = vsSchTitle2 + "변동사유 : " + vsAltRsnNm;
					}
					
				}else{
					if(util.SelectCtl.getSelectedIndex(app, "cbbAltDivRcd") != 0){
						if(vsSchTitle2 !== "") {
							vsSchTitle2 = vsSchTitle2 + "     " ; 
						}
						vsSchTitle2 = vsSchTitle2 + "변동구분 : " +  vsAltDivNm;
					}
					
					if(util.SelectCtl.getSelectedIndex(app, "cbbAltRsnRcd") != 0 ){
						if(vsSchTitle2 !== "") {
							vsSchTitle2 = vsSchTitle2 + "     " ; 
						}
						vsSchTitle2 = vsSchTitle2 + "변동사유 : " + vsAltRsnNm;
					}
				}
				if(vsSchTitle2 !== "") {
						vsSchTitle2 = vsSchTitle2 + "     " ; 
				}
					vsSchTitle2 = vsSchTitle2+ "변동일자 : " + vsSchTitle;
				
				//리퀘스트 셋팅
				var voParam = {
							p_strDeptCd               : util.DataMap.getValue(app, "dmReqList", "strDeptCd"),
							p_strDeptNm              : vsSaNm,
							p_strObjDivRcd           : util.DataMap.getValue(app, "dmReqList", "strObjDivRcd"),
							p_strStDt                    : util.DataMap.getValue(app, "dmReqList", "strStDt").substr(0,8),
							p_strEndDt                 : util.DataMap.getValue(app, "dmReqList", "strEndDt").substr(0,8),
							p_strAltDivRcd            : util.DataMap.getValue(app, "dmReqList", "strAltDivRcd"),
							p_strAltRsnRcd           : util.DataMap.getValue(app, "dmReqList", "strAltRsnRcd"),
							p_strLandivRcd           : msDefaultLocale,
							p_strAltDivNm             : vsAltDivNm,
							p_strSaList                 : util.DataMap.getValue(app, "dmResList", "strSaList"),
							p_strPrtObjDivRcd        : util.DataMap.getValue(app, "dmReqList", "strPrtObjDivRcd"),
						    p_strPrtPageNextYn     : util.DataMap.getValue(app, "dmReqList", "strPrtPageNextYn"), 
							p_strAltRsnNm            : vsAltRsnNm,
							p_strSchTitle1             : vsSchTitle1,
							p_strSchTitle2             : vsSchTitle2
						}	
				
				var voOzFormParam = {
						  TITLE :  "학 적 변 동 대 장 "//리포트타이틀
						, SUB_TITLE : "" //리포트서브타이틀		
						, FORM_TYPE : "flash"
					};	
						
				util.Report.open(app, "hojReport", "extCsrSShregAltListPrt", voOzFormParam, voParam);
		
			}
			if(util.isFunc(poCallBackFunc)) poFunc(pbSuccess);
		});
	}
	
	/**
	 * @desc 소속 검색 팝업 호출
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 5. 18
	 */
	moPage.onClick_BtnPopSearch = function(sender) {
		// 변동일자 체크
		var vsKeyDate = util.Control.getValue(app, "ipbStDt");
		var vsEndDate = util.Control.getValue(app, "ipbEndDt");
		var vsTitle = ExtControl.getTextValue("lblAltDt");
		if (ValueUtil.isNull(vsKeyDate)||ValueUtil.isNull(vsEndDate)) {
			util.Control.setValue(app, "ipbDeptNm", "");
			util.Control.setValue(app, "ipbDeptCd", "");
			//변동일자를 입력하여 주십시오.
			util.Msg.alert("NLS-CSR-M121",[vsTitle]);
			return;
		}
		doOnClickStdCmnPObjSch(sender);
	}
	
	/**
	 * @desc 소속 검색
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 5. 18
	 */	
	moPage.onValueChanged_IpbDeptNm = function(sender) {
		// 변동일자 체크
		var vsKeyDate = util.Control.getValue(app, "ipbStDt");
		var vsEndDate = util.Control.getValue(app, "ipbEndDt");
		var vsTitle = ExtControl.getTextValue("lblAltDt");
		if (ValueUtil.isNull(vsKeyDate)||ValueUtil.isNull(vsEndDate)) {
			util.Control.setValue(app, "ipbDeptNm", "");
			util.Control.setValue(app, "ipbDeptCd", "");
			//변동일자를 입력하여 주십시오.
			util.Msg.alert("NLS-CSR-M121",[vsTitle]);
			return;
		}
		doOnChangeStdCmnPObjSch(sender);
	}
	
	/**
	 * @desc 소속 권한 처리
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 5. 18
	 */
	moPage.onLoadImportDone_ImpStdCmnPobjSch = function() {
		setStdCmnPObjSchObjInfo();
	}
	
	/**
	 * @desc 변동구분에 따른 변동사유 필터
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 5. 18
	 */
	moPage.onValueChanged_CbbAltDivRcd = function() {
		var vsAltDivRcd = util.Control.getValue(app, "cbbAltDivRcd");
		var vsAltDivRcdPrp4 = ExtInstance.getValue("/root/resOnLoad/altDivRcdList/row", "CD_PRP4", "child::CD='"+vsAltDivRcd+"'");
		
		doAltRsnRcdFilter(vsAltDivRcdPrp4);
	};
	
	/**
	 * @desc 변동구분에 따른 변동사유 필터
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 5. 18
	 */
	function doAltRsnRcdFilter(psAltDivRcd) {
		var vcAltRsnRcd = ExtControl.getControl("cbbAltRsnRcd");
		var vsNodeSet = vcAltRsnRcd.getAttr("nodeset");
		var vsOriRef = vsNodeSet;
		vsNodeSet += "[child::CD_CLS='" + psAltDivRcd + "']";
		vcAltRsnRcd.setAttr("nodeset", vsNodeSet);
		vcAltRsnRcd.refresh();
		util.SelectCtl.selectItem(app, "cbbAltRsnRcd", 0);
		vcAltRsnRcd.setAttr("nodeset", vsOriRef);
		
	}
	
	
	moPage.onValueChanged_IpbEndDt = function() {
		doDeptClear();
	};
	
	
	moPage.onValueChanged_IpbStDt = function() {
		doDeptClear();
	};
	
	function doDeptClear() {
	
		//전체권한일시 최상위 부서가 셋팅 되어 있으면 초기화 하지 않음
		var vsDeptCd = util.DataMap.getValue(app, "dmReqList", "strDeptCd");
		if(moPageInfo.authRngRcd == "CC00102"){
			if(vsDeptCd != ExtInstance.getValue("instance('insStdCmnPObjSch')/root/resListObjInfo/strObjCd")){
				util.Control.setValue(app, "ipbDeptNm", "");
				util.Control.setValue(app, "ipbDeptCd", "");
				util.DataMap.setValue(app, "dmReqList", "strObjDivRcd", "");
			}
		// 전체권한 이외의 권한일시 자신의 소속 부서가 셋팅되어 있으면 초기화 하지 않음
		}else if(moPageInfo.authRngRcd == "CC00101" || moPageInfo.authRngRcd == "CC00105" || moPageInfo.authRngRcd == "CC00106" || moPageInfo.authRngRcd == "CC00107"){
			if(vsDeptCd != moUserInfo.asgnDeptCd){
				util.Control.setValue(app, "ipbDeptNm", "");
				util.Control.setValue(app, "ipbDeptCd", "");
				util.DataMap.setValue(app, "dmReqList", "strObjDivRcd", "");			
			}
		}

	};
	return moPage;
};

