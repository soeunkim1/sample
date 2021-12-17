//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
///<xtmlink path="./extCsrCAltEnrollMng.xtm"/>

var extCsrCAltEnrollMng = function() {

	var moPage = new Page();
	//임포트용 데이터 통신 오브젝트
	var moPObject = new PObject();
	
	/**
	 * 학생검색팝업 관련 설정사항
	 * 설정가능 유형 : 
	 *   1. 인스턴스((/root/시작))
	 *   2. 그리드의 셀 (ghc시작)
	 *   3. 컨트롤 id
	 * 각 변수별 설명
	 *  iXXX : 팝업으로 input 전달될 파라미터
	 *  oXXX : 팝업에서 선택한 값을 받을 컬럼 아이디
	 *  1. controlId 			: 최초 이벤트의 버튼이나 그리드 id	(필수)
	 *  2. iStudNo 			: 검색조건 학번								(선택) (값이 존재할 경우 4자리 이상)
	 *  3. iStudId 				: 검색조건 학번오브젝트					(선택)
	 *  4. iStudNm 			: 이름        									(선택) (값이 존재할 경우 2자리 이상)
	 *  5. iKeyDate 			: 기준일 										(필수)
	 *  6. iObjDivRcd 		: 객체구분코드 								(선택)
	 *  7. iObjCd 				: 부서코드										(선택)
	 *  8. iObjNm 			: 부서명											(선택) 
	 *  10. iStatRcd			: 학적상태										(선택) 
	 *  11. iStudDivRcd		: 학생구분										(선택) 
	 *  12. oStudId			: 학번오브젝트
	 *  13. oStudNo 			: 학번
	 *  14. oStudNm 		: 이름
	 *  15. oStatNm 			: 학적상태명
	 *  16. oStatRcd 			: 학적상태코드
	 *  17. oProcRslt 		: 진급학기
	 *  18. oProcRsltYear 	: 진급학년
	 *  19. oSaCd 			: 학사부서코드명
	 *  20. oSaNm 			: 학사부서명
	 *  21. oSpCd 			: 이수과정코드명
	 *  22. oSpNm 			: 이수과정명
	 *  23. oOgCd 			: 행정부서코드명
	 *  24. oOgNm 			: 행정부서명
	 *  25. oStudDivRcd		: 학생구분코드
	 *  26. oStudDivNm		: 학생구분명
	 *  27. oBirthday			: 생년월일
	 *  28. oGenderRcd		: 성별코드
	 *  29. oGenderNm		: 성별명
	 *  30. func 				: 팝업에서 선택한 값을 받은 후 추가 로직이 필요한 경우 함수 작성
	 */
	moPObject.moIdsForStdCsrPStSearch = [
	{
		controlId 					: "btnStudPopSearch",
		iStudNo 					: "ipbStudNo",	
		iStudId 						: "",
		iStudNm 					: "",
		iKeyDate 					: "dipKeyDate", 
		iObjDivRcd 				: "",
		iObjCd 						: "",
		iObjNm 					: "",
		iStatRcd 					:"",
		iStudDivRcd				: "",
		oStudId 					: "/root/reqList/strStudId",
		oStudNo 					: "ipbStudNo",
		oStudNm 					: "",
		oStatNm 					: "",
		oStatRcd 					: "",
		oProcRslt 					: "",
		oProcRsltYear 			: "",
		oSaNm						: "",
		oSaCd 						: "",
		oSpNm 					: "",
		oSpCd 						: "",
		oOgNm 					: "",
		oOgCd 						: "",
		oStudDivRcd				: "",
		oStudDivNm				: "",
		oBirthday					: "",
		oGenderRcd				: "",
		oGenderNm				: "",
		func : function() {
			
			//팝업끝난후  후처리가 필요할때 입력 
			var vsStudId = util.DataMap.getValue(app, "dmReqList", "strStudId");
			var voParam = moPage.moParentObj;
			if(!ValueUtil.isNull(vsStudId)) {
				util.Control.redraw(app, ["ipbSchStudId"]);
				util.Control.setEnable(app, true,  ["htmlObjMst"]);
				voParam.strStudId = util.DataMap.getValue(app, "dmReqList", "strStudId");
				doSearch();
			}else{
				voParam.strStudId = "";
				util.Control.setEnable(app, false, ["htmlObjMst"]);
				
				var vsAltDivRcd = util.Control.getValue(app, "cbbAltDivRcd");
				var vsXtmValue = moPage.getSubPageID(vsAltDivRcd);
				
				// 서브페이지 데이터 초기화
				var voSbpMstPage = ExtSubPage.getSubPage("htmlObjMst", vsXtmValue);
				if(voSbpMstPage != null){			
					voSbpMstPage.callScript("doDataClear", null);
				}
				var voSbpSubPage = ExtSubPage.getSubPage("htmlObjSub", "extCsrSAltInfo");
				if(voSbpSubPage != null){			
					voSbpSubPage.callScript("doDataClear", null);
				}
			}
		}
	}
	];
	
	/**
	 * 학적변동 정보
	 * @author Choi In Seong 2016. 1. 13
	 */	
	moPage.moParentObj = {
		strStudId				: "", 					// 학생 ID
		strSchYearRcd		: "", 					// 학적변동 학년도
		strSmtRcd 			: "", 					// 학적변동 학기
		strAltDt			 		: "", 					// 학적변동일
		strAltDivRcd	 		: "", 					// 학적변동구분
		strAltDivNm	 		: "", 					// 학적변동구분명
		strAltRsnRcd	 		: "",					// 학적변동사유
		strAbsSmtCntRcd    : "" ,					// 휴학학기수 (휴학인 경우에만 이용) 
		strAltYn					: "Y"                  // 학적변동처리용여부(다른프로그램에서 서브페이지를 사용시 학적변동처리에서 호출 여부를 확인하기위한 구분자)
	};
	
	/**
	 * @desc  Header Import onLoad
	 * @return void
	 * @author Choi In Seong 2016. 10. 11.
     */
	moPage.onLoadImportDone_ImpTitle = function() {
		doHeaderOnLoad();
	};

				
	/**
	 * @desc 
	 * @return 
	 * @author Choi In Seong 2016. 10. 11.
	 */
	moPage.onModelConstructDone_extCsrCAltEnrollMng = function() {
		
		doOnLoad();
		//impStudInf02(학생정보 임포트) 초기화
		initSizeAlt();
	
	}

	/**
	 * @desc 공통코드 호출 및 화면 초기화
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 10. 11.
	 */	
	function doOnLoad() {
		
		//리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init("rptExtCsrShregAlt");
		
		// 서브페이지 비활성화 세팅
		ExtSubPage.setPage("htmlObjMst", "/xtm/cmn/blank.html");
		// 서브페이지 비활성화 세팅
		ExtSubPage.setPage("htmlObjSub", "/xtm/cmn/blank.html");
		
		//검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", "grpData");
		//서브미션 실행 (실패시 cover page)
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				util.Control.setValue(app, "cbbSchYearRcd", util.DataMap.getValue(app, "dmResOnLoad", "strSchYearRcd"));
				util.Control.setValue(app, "cbbSmtRcd", util.DataMap.getValue(app, "dmResOnLoad", "strSmtRcd"));
				util.Control.setValue(app, "dipAltDt", util.DataMap.getValue(app, "dmResOnLoad", "strKeyDate"));
				
				util.Control.redraw(app, ["cbbSchYearRcd", "cbbSmtRcd", "dipAltDt", "cbbAltDivRcd", "cbbAltRsnRcd","cbbAbsCntRcd"]);
				ExtRepeat.refresh("rptExtCsrShregAlt");
				util.Control.redraw(app, ["frfStud"]);
				
				ExtSubPage.setPage("htmlObjSub", "xtm/csr/extCsrSAltInfo.xtm");
			}
		});
	}
	
   /**
	 * @desc 조회
	 *
	 * @return void
	 * @author Choi In Seong 2016. 10. 11.
	 */
	moPage.onClick_BtnSearch = function() {
		
		var vsAltDivRcd = util.Control.getValue(app, "cbbAltDivRcd");
		var vsXtmValue = moPage.getSubPageID(vsAltDivRcd);

		
//alert(vsXtmValue);	
		//** 서브페이지 함수에 접근하는지 확인
		//데이타 변경여부를 확인하고 저장여부 컨펌: 저장실패시 상태변경 불가
		var voSbpMstPage = ExtSubPage.getSubPage("htmlObjMst", vsXtmValue);
		
//alert("voSbpMstPage="+voSbpMstPage);		

		if(voSbpMstPage != null){			
			if(!voSbpMstPage.callScript("doCheckDataChange", null)) {
				return false;
			}
		}
		
		var vsAltDivRcd = util.Control.getValue(app, "cbbAltDivRcd");		
		var vsAltEnrollDiv = moPage.getAltEnrollDiv(vsAltDivRcd);
		util.DataMap.setValue(app, "dmReqList", "strAltEnrollDiv", vsAltEnrollDiv);
		if(vsAltEnrollDiv == "ENROLL"){
			if(!util.validate(app, ["cbbSchYearRcd", "cbbSmtRcd", "dipAltDt", "cbbAltDivRcd"])){		
				return false;
			}			
		}else{
			if(!util.validate(app, ["cbbSchYearRcd", "cbbSmtRcd", "dipAltDt", "cbbAltDivRcd", "cbbAltRsnRcd"])){
				return false;
			}
		}

		clearImpStudInfo02();
		util.Control.reset(app, ["ipbStudNo","ipbStudId"]);
		doList(function(pbSuccess) {
			// 조회 : "조회되었습니다." header 메세지 표시
			if (pbSuccess) util.Msg.notify(app, "NLS.INF.M024");
		});
	};

	/**
	 * @desc 학적변동 처리내역을 조회
	 * @param 
	 * @return 
	 * @author Choi In Seong 2016. 10. 11.
	 */
	function doList(poCallBackFunc) {

		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdExtCsrShregAlt");
				util.Control.redraw(app, ["frfStud"]);
				//PARENT 변동 정보 셋팅
				var voParam = moPage.moParentObj;
				voParam.strStudId     				= util.DataMap.getValue(app, "dmReqList", "strStudId");
				voParam.strSchYearRcd     	= util.Control.getValue(app, "cbbSchYearRcd"); 
				voParam.strSmtRcd 				= util.Control.getValue(app, "cbbSmtRcd");
				voParam.strAltDt 					= util.Control.getValue(app, "dipAltDt");
				voParam.strAltDivRcd   			= util.Control.getValue(app, "cbbAltDivRcd");
				voParam.strAltDivNm  			= util.SelectCtl.getLabel(app, "cbbAltDivRcd", util.SelectCtl.getSelectedIndex(app, "cbbAltDivRcd"));
				voParam.strAltRsnRcd 			= util.Control.getValue(app, "cbbAltRsnRcd");
				if ( voParam.strAltDivRcd == "CT401ABSE") {
					voParam.strAbsSmtCntRcd		= util.Control.getValue(app, "cbbAbsCntRcd");
				} else {
					voParam.strAbsSmtCntRcd		= "";
				}
				
				var vsAltDivRcd = util.Control.getValue(app, "cbbAltDivRcd");
				var vsXtmValue = moPage.getSubPageName(vsAltDivRcd);
				
				ExtSubPage.setPage("htmlObjMst", vsXtmValue, true); // no scroll 
				
				var voSbpSubPage = ExtSubPage.getSubPage("htmlObjSub", "extCsrSAltInfo");
				if(voSbpSubPage != null){			
					voSbpSubPage.callScript("doDataClear", null);
				}
				if(vsAltDivRcd.indexOf("CT401") != -1)
				{//담당자취소
					util.DataMap.setValue(app, "dmReqList", "strCancelResRcd","CT41501");
				}else
				{//시스템취소
					util.DataMap.setValue(app, "dmReqList", "strCancelResRcd","CT107SYST");
				}
				
				
				
				util.DataMap.setValue(app, "dmReqList", "strCancelDt",util.Control.getValue(app, "dipAltDt"));
				util.Control.redraw(app, ["cbbFrfCancelRsnRcd","ipbFrfCancelDt","dipKeyDate"]);
				// 조회 후 콜백함수 수행
				if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
			}
		});
	}
	
	/**
	 * @desc 변동사유 구분 값을 가져온다.
	 * @param
	 * @return {String} 용도코드4에 해당하는 값 반환
	 * @author Choi In Seong 2016. 10. 11.
	 */  
	moPage.getAltRsnDiv = function(psVal) {
		
		var vsXtmValue = ExtInstance.getValue("/root/resOnLoad/altDivRcdList/row", "CD_PRP4", "child::CD='" + psVal + "'");
		
		return vsXtmValue;
		
	};

	/**
	 * @desc CD값에 대한 프로그램 ID를 가져온다.
	 * @param
	 * @return {String} 용도코드5에 해당하는 값 반환
	 * @author Choi In Seong 2016. 10. 11.
	 */ 
	moPage.getSubPageID = function(psVal) {
		
		var vsXtmValue = ExtInstance.getValue("/root/resOnLoad/altDivRcdList/row", "CD_PRP5", "child::CD='" + psVal + "'");
		
		return vsXtmValue;
		
	};
	
	/**
	 * @desc 호출할 서브페이지의 호출페이지값을 가져온다.
	 * @param
	 * @return {String} 용도코드6에 해당하는 값 반환
	 * @author Choi In Seong 2016. 10. 11.
	 */  
	moPage.getSubPageName = function(psVal) {
		
		var vsXtmValue = ExtInstance.getValue("/root/resOnLoad/altDivRcdList/row", "CD_PRP6", "child::CD='" + psVal + "'");
		
		return vsXtmValue;
		
	};
	
	/**
	 * @desc 학적, 등록 변동 구분 값을 가져온다.
	 * @param
	 * @return {String} 용도코드8에 해당하는 값 반환
	 * @author Choi In Seong 2016. 10. 11.
	 */  
	moPage.getAltEnrollDiv = function(psVal) {
		
		var vsXtmValue = ExtInstance.getValue("/root/resOnLoad/altDivRcdList/row", "CD_PRP8", "child::CD='" + psVal + "'");
		
		return vsXtmValue;
		
	};
	
	/**
	 * @desc 입력된 학번으로 조회한다.
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 10. 11.
	 */	
	function doSearch() {
		
		//학번&기준일자 입력확인
		if(!util.validate(app, "ipbStudNo")) return false;
		
		//(IMPORT)학번전달
		var vsStudId  = util.DataMap.getValue(app, "dmReqList", "strStudId");
		var vsKeyDate = util.Control.getValue(app, "dipKeyDate");
		
		var voImpStudInfoCallbackFunc = function(pbImpStudInfoCallBack) {
			if (pbImpStudInfoCallBack) {

				// 이미지 업로드 버튼 보이기 여부 설정
				setVisibleUploadStudImgBtn(false);
				
				var vsAltDivRcd = util.Control.getValue(app, "cbbAltDivRcd");
				var vsXtmValue = moPage.getSubPageID(vsAltDivRcd);
				
				// 학번 조회 후 신규 변동
				var voSbpMstPage = ExtSubPage.getSubPage("htmlObjMst", vsXtmValue);
				
				if (voSbpMstPage != null) {
					voSbpMstPage.callScript("doNewAlt", null);
				}
				// 학번 조회 후 변동정보 조회
				var voSbpSubPage = ExtSubPage.getSubPage("htmlObjSub", "extCsrSAltInfo");
				
				if (voSbpSubPage != null) {
					voSbpSubPage.callScript("doListAlt", null);
				}
			} 
		};
		// 학생정보imp 조회
		setImpStudInfo(vsStudId, vsKeyDate, null, voImpStudInfoCallbackFunc);
		
	};
	
	/**
	 * @desc 헤더 메시지 설정
	 * @param vsMsg 헤더 메시지
	 * @return void
	 * @author Choi In Seong 2016. 10. 11.
	 */
	function doSetMsg(vsMsg){
		util.Msg.notify(app, "vsMsg");
	}
	
	/**
	 * @desc 저장 후 임포트 재조회 & 서브페이지 재조회
	 * @param stdCsrMstFrame 콜백함수
	 * @return void
	 * @author Choi In Seong 2016. 1. 20
	 */
	function doSaveAfter(poCallBackSaveAfter) {
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdExtCsrShregAlt");
			
				var vsStudId  = util.DataMap.getValue(app, "dmReqList", "strStudId");
				var vsKeyDate = util.Control.getValue(app, "dipAltDt");

				var voImpStudInfoCallbackFunc = function(pbImpStudInfoCallBack) {
					if (pbImpStudInfoCallBack) {
						// 학번 조회 후 변동정보 조회
						var voSbpSubPage = ExtSubPage.getSubPage("htmlObjSub", "extCsrSAltInfo");
						
						if (voSbpSubPage != null) {
							voSbpSubPage.callScript("doListAlt", null);
						}
					} 
				};
				if(ValueUtil.fixNull(vsStudId) !="")
				{
						// 학적변동에 따른 학생정보imp 조회
						setImpStudInfo(vsStudId, vsKeyDate, null, voImpStudInfoCallbackFunc);
				}
				
				
				// 조회 후 콜백함수 수행
				if (util.isFunc(poCallBackSaveAfter)) poCallBackSaveAfter(pbSuccess);
			}
		});
	};
	
	moPage.onLoadImportDone_ImpStudInfo = function() {
		impStudInfo();
	}
	
	moPage.onClick_RdImgFileDown = function(sender) {
		doOnClickStdCmnPFileUtil(sender);
	}
	
	/**
	 * @desc 리피트 panel click event
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 10. 11.
	 */
	moPage.onValueChanged_RhCkbSelect = function() {
//TO-BE: <ExtRepeat.selectedAllPanel> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.selectedAllPanel("rhCkbSelect");
	}
	
	/**
	 * @desc 변동구분에 따른 변동사유 필터
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 10. 11.
	 */
	moPage.onValueChanged_CbbAltDivRcd = function() {
		var vsAltDivRcd = util.Control.getValue(app, "cbbAltDivRcd");
		var vsAltRsnDiv = moPage.getAltRsnDiv(vsAltDivRcd);
		
		
		if (vsAltDivRcd == "CT401ABSE" ) {
				util.Control.setVisible(app, true, "lblAbsCntRcd"); 
				util.Control.setVisible(app, true, "cbbAbsCntRcd"); 
		}else {
				util.Control.setVisible(app, false, "lblAbsCntRcd"); 
				util.Control.setVisible(app, false, "cbbAbsCntRcd"); 
		}
		util.Control.redraw(app, ["lblAbsCntRcd","cbbAbsCntRcd"]);
		
		var vsAltDivRcd = util.Control.getValue(app, "cbbAltDivRcd");		
		var vsAltEnrollDiv = moPage.getAltEnrollDiv(vsAltDivRcd);
		//변동구분에 따른 변동 사유 필터 및 Visible 체크
		if(vsAltEnrollDiv == "ENROLL"){
			util.DataMap.setValue(app, "dmReqList", "strAltRsnRcd","");
			util.DataMap.setValue(app, "dmReqList", "strAbsCntRcd","");
			util.Control.setVisible(app, false,[ "lblAltRsnRcd","cbbAltRsnRcd"]); 	
		}else{
			util.Control.setVisible(app, true,[ "lblAltRsnRcd","cbbAltRsnRcd"]); 	
			doAltRsnRcdFilter(vsAltRsnDiv);
		}
	};
	
	/**
	 * @desc 변동구분에 따른 변동사유 필터
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 10. 11.
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
	
	/**
	 * @desc 변동신규
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 10. 11.
	 */
	moPage.onClick_BtnNew = function() {
		
		var vsStudNo = util.DataMap.getValue(app, "dmReqList", "strStudNo");
		if(ValueUtil.isNull(vsStudNo)){
			if(!util.validate(app, ["ipbStudNo"])){
				return false;
			}
		}
		var vsAltDivRcd = util.Control.getValue(app, "cbbAltDivRcd");
		var vsXtmValue = moPage.getSubPageID(vsAltDivRcd);
		
		// 학번 조회 후 신규 변동
		var voSbpMstPage = ExtSubPage.getSubPage("htmlObjMst", vsXtmValue);

		if (voSbpMstPage != null) {
			if(!voSbpMstPage.callScript("doCheckDataChange", null)) {
				return false;
			}	
			
			voSbpMstPage.callScript("doNewAlt", null);
		}
	}
	/**
	 * 취소
	 * @member moPage
	 * @type Boolean
	 * @return 
	 * @author hyunteak at 16. 11. 2 오후 3:09
	 */
	moPage.onClick_BtnNewCancel = function() {
		if(!util.validate(app, ["cbbFrfCancelRsnRcd", "ipbFrfCancelDt"])){		
			return false;
		}else{
			//커버 실행
			util.coverPage(app);
			//취소
			doRptChk();
		
		}
	}
	/**
	 * 리피트 체크박스 체크여부 확인
	 * @member moPage
	 * @type Boolean
	 * @return 
	 * @author hyunteak at 16. 11. 2 오후 3:10
	 */
	function doRptChk(){
		var vnCancelListRow 	= util.Grid.getCheckOrSelectedRowIndex(app, "grdExtCsrShregAlt");
		var vsRptTitle = ExtRepeat.getLableIdValue("rptExtCsrShregAlt");
		var vaIdxsDel = null;
		var voCancelRow;

		//이동할 행이 없을 경우 리턴
		if(ValueUtil.fixNull(vnCancelListRow)  == ""){
			//@ 중 취소 할 행을 선택하여 주십시오
			util.Msg.alert("NLS-CSR-M125",[vsRptTitle]);
			//커버해제 
			util.removeCover(app);
			return false;
		}
		//삭제될 리피트의 선택된 행이 단건 or 다건 일 경우
		if(String(vnCancelListRow).indexOf(",") != -1){
			//다건일경우
			vaIdxsDel = vnCancelListRow.split(",");
		}else{
			//단건일경우
			vaIdxsDel = new Array();
			vaIdxsDel[0] = vnCancelListRow;
		}
		//셋팅
	   for(var i=0; i< vaIdxsDel.length; i++) {
		   voCancelRow = vaIdxsDel[i];
		   if(util.Grid.getCellValue(app, "grdExtCsrShregAlt","DEL_CKB",voCancelRow) =="")
			{
				//@ 중 취소 할 행을 선택하여 주십시오
				util.Msg.alert("NLS-CSR-M125",[vsRptTitle]);
				//커버해제 
				util.removeCover(app);
				return false;
			}
	   }
	   ExtRepeat.setCRUDAttr("rptExtCsrShregAlt", "alltype", "true");

		
	   //취소 저장
	   doSaveCancel();
	
	}
	/**
	 * 취소저장
	 * @member moPage
	 * @type void
	 * @author hyunteak at 16. 11. 2 오후 3:10
	 */
	function doSaveCancel(){
		var vsRptTitle = ExtRepeat.getLableIdValue("rptExtCsrShregAlt");
		var vsMsg = ComMsg.getMsg("NLS.CSR.M126",[vsRptTitle]);
		if(util.Msg.confirm("NLS-CRM-M010",[vsMsg])  ==MsgBox.IDOK)
		{
			var vsAltDivNm = util.SelectCtl.getLabel(app, "cbbAltDivRcd",util.SelectCtl.getSelectedIndex(app, "cbbAltDivRcd"));
			util.DataMap.setValue(app, "dmReqList", "strAltDivNm",vsAltDivNm);
			//1..취소  작업자장 서브미션 호출
			//strCommand: save 
			util.Submit.send(app, "subSave", function(pbSuccess){
				//1.1성공시
				if(pbSuccess){
					
					doSaveAfter(function(pbSuccess) {
						
						if (pbSuccess){
							 util.Msg.notify(app, "NLS.INF.M025");
						}
					});
				}
				ExtRepeat.setCRUDAttr("rptExtCsrShregAlt", "alltype", "false");
				//커버해제 
				util.removeCover(app);
			});
		}else{
			
			ExtRepeat.setCRUDAttr("rptExtCsrShregAlt", "alltype", "false");
				//커버해제 
				util.removeCover(app);
		}
		
	
	}	
	
	
	
	/**
	 * @desc 학생검색팝업 호출
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 10. 11.
	 */
	moPage.onClick_BtnStudPopSearch = function(sender) {
		doOnClickStdCsrPStSearch(sender);
	}
	
	/**
	 * @desc 학생검색
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 10. 11.
	 */
	moPage.onValueChanged_IpbStudNo = function(sender) {
		doOnChangeStdCsrPStSearch(sender);
	}
	
	
	/**
	 * @desc 변동사유변경시 (휴학의 경우, 해당하는 휴학학기수를 자동설정) 
	 * @param 
	 * @return void
	 * @author Sunyoung, park 2016.10.24
	*/
	moPage.onValueChanged_CbbAltRsnRcd = function() {
		
		var vsAltRsnRcd = util.Control.getValue(app, "cbbAltRsnRcd");
		
		if(!ValueUtil.isNull(vsAltRsnRcd)) {
			var vsSmtCnt = ExtInstance.getValue("/root/resOnLoad/altRsnRcdList/row", "CD_PRP5", "child::CD='"+vsAltRsnRcd+"'");
		
			if(ValueUtil.isNull(vsSmtCnt)) {
				util.Control.setValue(app, "cbbAbsCntRcd", "");
			} else {
				util.Control.setValue(app, "cbbAbsCntRcd", vsSmtCnt);
			}
		}
	};
	
	moPage.onValueChanged_CbbFrfCancelRsnRcd = function() {
		
	}
	return moPage;
};

