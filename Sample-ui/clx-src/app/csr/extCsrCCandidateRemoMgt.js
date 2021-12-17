//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
///<xtmlink path="./extCsrCCandidateRemoMgt.xtm"/>

var extCsrCCandidateRemoMgt = function() {

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
			iKeyDate			:	"/root/reqList/strKeyDate",
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
		iKeyDate 					: "/root/reqList/strKeyDate",
		iObjDivRcd 				: "",
		iObjCd 						: "",
		iObjNm 					: "",
		iStatRcd 					: "",
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
		}
	}
	];

	/**
	 * @desc Header Import onLoad
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 5. 31
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		doHeaderOnLoad();
	};

				
	/**
	 * @desc 화면 온로드
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 5. 31
	 */
	moPage.onModelConstructDone_extCsrCAltAplyRecog = function() {
		//리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["rptExtCsrShregAltAply"]);
		// 2. 검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grpData"]);
		
		//서브미션 실행 (실패시 cover page)
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				util.DataMap.setValue(app, "dmReqList", "strSchYearRcd", util.DataMap.getValue(app, "dmResOnLoad", "strSchYearRcd"));
				util.DataMap.setValue(app, "dmReqList", "strSmtRcd", util.DataMap.getValue(app, "dmResOnLoad", "strSmtRcd"));
				util.DataMap.setValue(app, "dmReqList", "strKeyDate", util.DataMap.getValue(app, "dmResOnLoad", "strKeyDate"));	
				util.DataMap.setValue(app, "dmReqList", "strAltDt", util.DataMap.getValue(app, "dmResOnLoad", "strCutDt"));
				
				util.Control.redraw(app, ["cbbSchYearRcd", "cbbSmtRcd", "cbbDgrCrsDivRcd", "cbbAltRsnRcd", "dipAltDt"]);
				
				// 통지서발송임포트 init 함수
				doInitByImpExtCsrIfrSndCommon("", "rptExtCsrShregAltAply", function(pbSuccess){
					if(pbSuccess){
						doList();
					}
				}, "Y", null, util.DataMap.getValue(app, "dmReqList", "strKeyDate"), util.DataMap.getValue(app, "/root/reqList/strSchYearRcd"), util.DataMap.getValue(app, "/root/reqList/strSmtRcd"));
			}
		});
	}

	/**
	 * @desc  제적대상자 목록 조회버튼 클릭
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 5. 31
	 */
	moPage.onClick_BtnSearch = function() {
		if(util.Grid.isModified(app, "", "CRM")){
			return false;
		}
		
		// 조회조건 필수 체크
		if(!util.validate(app, ["cbbSchYearRcd", "cbbSmtRcd", "ipbDeptNm", "cbbAltRsnRcd"])){
			return false;
		}
		
		doList(function(pbSuccess) {
			// 조회 : "조회되었습니다." header 메세지 표시
			if(pbSuccess) {
				util.Msg.notify(app, "NLS.INF.M024");
			}
		});
	};

	/**
	 * @desc 제적 대상자 조회
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 5. 31
	 */
	function doList(poCallBackFunc) {
		
		//strCommand: list 
		util.Submit.send(app, "subList",  function(pbSuccess) {
			if(pbSuccess){
				//rebuild
				util.Control.redraw(app, ["rptExtCsrShregAltAply"]);
			}
			if(util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
		});
		
	}

	/**
	 * @desc 일괄제적처리 버튼 클릭
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 5. 31
	 */
	moPage.onClick_BtnSave = function() {
		util.coverPage(app);
		doSave();
	};
	
	/**
	 * @desc 일괄제적처리
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 5. 31
	 */
	function doSave() {

		// 제적처리 필수 체크
		if(!util.validate(app, ["dipAltDt"])){
			util.removeCover(app);
			return false;
		}
		
		var vsAltDt = ExtInput.getText("dipAltDt");
		
		var strAltRsnRcd = util.Control.getValue(app, "cbbAltRsnRcd");
		var strAltRsnNm = util.SelectCtl.getLabelByValue(app, "cbbAltRsnRcd", strAltRsnRcd);
		
		//승인 여부 체크
		if(!util.Msg.confirm("NLS-CRM-EXT005", [vsAltDt, strAltRsnNm]) ){
			util.removeCover(app);
			return false;
		}	
		
		if(!doBatch()){
			util.removeCover(app);
			return;
		}
		
		//strCommand: save 
		util.Submit.send(app, "subSave", function(pbSuccessSave) {
			
				if(pbSuccessSave) {
					
					//이관 성공건수
					var vnTotCnt = util.DataMap.getValue(app, "dmResProc", "iTotCnt");
					var vnSuccessCnt = util.DataMap.getValue(app, "dmResProc", "iSuccessCnt");
					var vnFailCnt = util.DataMap.getValue(app, "dmResProc", "iFailCnt");
					
					//처리하였습니다.(총:@, 성공:@, 실패:@)
					util.Msg.alert("NLS-CSR-M017", [vnTotCnt, vnSuccessCnt, vnFailCnt]);
					util.removeCover(app);
					doList(function(pbSuccessList) {
						// 조회 : "조회되었습니다." header 메세지 표시
						if(pbSuccessList) {
							util.Msg.notify(app, "NLS.INF.M025");
							
							
							
							//파일디렉토리경로
							var vsErrorFileDir = util.DataMap.getValue(app, "dmErrorFileInfo", "strFileDir");
							//파일명
							var vsErrorFileNm = util.DataMap.getValue(app, "dmErrorFileInfo", "strFileNm");
							//변환파일명(실제 서버에 저장된 파일명)
							var vsErrorFileChgNm = util.DataMap.getValue(app, "dmErrorFileInfo", "strFileChgNm");
							var vsTmpFilePath = util.DataMap.getValue(app, "dmErrorFileInfo", "strTmpFilePath");
							// 에러파일 다운로드
							if(!(ValueUtil.isNull(vsErrorFileNm) || vsErrorFileNm=="")){
								var voParam = {
											"strFileSubPath" : "",
											"strFileNm" : vsErrorFileChgNm,
											"strOriFileNm" : vsErrorFileNm,
											"strTmpFilePath" : vsTmpFilePath,
											"strCommand" : "fileDownLoad"
								}								
								FileUtil.downloadFile( "/std.cmn.StdCmnFileTransUtil.ex", voParam);								
									// 에러파일 초기화
								util.DataMap.setValue(app, "dmErrorFileInfo", "strFileDir","");
								util.DataMap.setValue(app, "dmErrorFileInfo", "strFileNm","");
								util.DataMap.setValue(app, "dmErrorFileInfo", "strFileChgNm","");
								util.DataMap.setValue(app, "dmErrorFileInfo", "strTmpFilePath","");
							} else{
								// 에러파일 초기화
								util.DataMap.setValue(app, "dmErrorFileInfo", "strFileDir","");
								util.DataMap.setValue(app, "dmErrorFileInfo", "strFileNm","");
								util.DataMap.setValue(app, "dmErrorFileInfo", "strFileChgNm","");
								util.DataMap.setValue(app, "dmErrorFileInfo", "strTmpFilePath","");
								return false;
							}
						}
					});
				}else{
					util.removeCover(app);
				}
			}
		);
	}

	/**
	 * @desc 리피트 panel click event
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 5. 31
	 */
	moPage.onValueChanged_RhCkbSelect = function() {
//TO-BE: <ExtRepeat.selectedAllPanel> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.selectedAllPanel("rhCkbSelect");
	};

	/**
	 * @desc 소속 검색 팝업 호출
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 5. 31
	 */
	moPage.onClick_BtnPopSearch = function(sender) {
		doOnClickStdCmnPObjSch(sender);
	}
	
	/**
	 * @desc 소속 권한 처리
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 5. 31
	 */
	moPage.onLoadImportDone_ImpStdCmnPobjSch = function() {
		setStdCmnPObjSchObjInfo();
	}

	/**
	 * @desc 학생검색 팝업 호출
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 5. 31
	 */
	moPage.onClick_BtnStudPopSearch = function(sender) {
		doOnClickStdCsrPStSearch(sender);
	}
	
	/**
	 * @desc 학생검색
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 5. 31
	 */
	moPage.onValueChanged_IpbStudNo = function(sender) {
		doOnChangeStdCsrPStSearch(sender);
	}
	
	/**
	 * @desc 소속 검색
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 5. 31
	 */	
	moPage.onValueChanged_IpbDeptNm = function(sender) {
		doOnChangeStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc 표준일자 조회
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 5. 31
	 */	
	moPage.onValueChanged_CbbSchYearRcd = function() {
		doGetKeyDate();
	};
	
	/**
	 * @desc 표준일자 조회
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 5. 31
	 */	
	moPage.onValueChanged_CbbSmtRcd = function() {
		doGetKeyDate();
	};
	
	/**
	 * @desc 학년도 학기 변경에 따른 표준일자 반환
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 5. 31
	 */
	function doGetKeyDate() {
		
		//1. 서브미션 수행
		//strCommand: getKeyDate 
		util.Submit.send(app, "subGetKeyDate", function(pbSuccess){
			if(pbSuccess) {
				var strDeptCd = util.DataMap.getValue(app, "dmReqList", "strDeptCd");
				if(moPageInfo.authRngRcd == "CC00102"){
					if(strDeptCd != ExtInstance.getValue("instance('insStdCmnPObjSch')/root/resListObjInfo/strObjCd")){
						util.Control.reset(app, ["ipbDeptNm", "ipbDeptCd", "ipbStudNo", "ipbStudId"]);
						util.DataMap.setValue(app, "dmReqList", "strObjDivRcd", "");
					}
				}else if(moPageInfo.authRngRcd == "CC00101" || moPageInfo.authRngRcd == "CC00105" || moPageInfo.authRngRcd == "CC00106" || moPageInfo.authRngRcd == "CC00107"){
					if(strDeptCd != moUserInfo.asgnDeptCd){
						util.Control.reset(app, ["ipbDeptNm", "ipbDeptCd", "ipbStudNo", "ipbStudId"]);
						util.DataMap.setValue(app, "dmReqList", "strObjDivRcd", "");
					}
				}
				util.DataMap.setValue(app, "dmReqList", "strKeyDate", util.DataMap.getValue(app, "dmResGetKeyDate", "strKeyDate"));
			}else{
				util.Control.reset(app, ["ipbDeptNm", "ipbDeptCd", "ipbStudNo", "ipbStudId"]);
				util.DataMap.setValue(app, "dmReqList", "strObjDivRcd", "");
				util.DataMap.setValue(app, "dmReqList", "strKeyDate", util.DataMap.getValue(app, "dmResGetKeyDate", "strKeyDate"));
			}
			
			// 통지서출력시 사용될 값을 다시 세팅한다.
			setKeyDateByImpExtCsrIfrSndCommon(util.DataMap.getValue(app, "dmReqList", "strKeyDate"));
			setSchYearRcdByImpExtCsrIfrSndCommon(util.DataMap.getValue(app, "dmReqList", "strSchYearRcd"));
			setSmtRcdByImpExtCsrIfrSndCommon(util.DataMap.getValue(app, "dmReqList", "strSmtRcd"));
		});
	};
	
	/**
	 * @desc 선택 제적처리 
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 5. 31
	 */
	function doBatch() {
		var voRpt = ExtControl.getControl("rptExtCsrShregAltAply");
		var vsPath = voRpt.getRepeatAttr().getNodeSet();
		var vbPanel = false;
		var vsResult = "";
		var psUpdStatusId = AppConstants.DEL_COL_REF;
		// 리피트 패널 존재 여부 체크
		if(ExtInstance.getNodeObj(vsPath + "/" + AppConstants.DEL_COL_REF) != null){
			vbPanel = true;
		}
		
		if(ExtControl.getControl(psUpdStatusId)){
			 var vsRef = ExtControl.getControl(psUpdStatusId).getAttr("ref");
             vsRef = vsRef.substr(vsRef.lastIndexOf("/")+1, vsRef.length);
             psUpdStatusId = vsRef;
		}   
		
		if(vbPanel) {

			vsResult = voRpt.dataSet.find(psUpdStatusId + ":Y");
			
			if(vsResult == ""){
				// 라인을 선택하세요.
				util.Msg.alert("NLS-INF-M023");
				return false;
			}
			
		}else{
			// 라인을 선택하세요.
			util.Msg.alert("NLS-INF-M023");
			return false;
		}
		
		if(!util.validate(app, ["dipAltDt"])){
			return false;
		}
		
		var vsAltDt = util.Control.getValue(app, "dipAltDt");
		var voPanelChk;
		
		if(String(vsResult).indexOf(",") != -1){
			voPanelChk = vsResult.split(",");
		}else{
			voPanelChk = new Array();
			voPanelChk[0] = vsResult;
		}

		//신청인 데이터만 선택 승인 실행
		for(var i = voPanelChk.length - 1; i >= 0; i--) {
			util.Grid.setRowState(app, "grdExtCsrShregAltAply", cpr.data.tabledata.RowState.UPDATED, voPanelChk[i]);
			util.Grid.setCellValue(app, "grdExtCsrShregAltAply", "PROC_YN", "Y",  voPanelChk[i], true);
		}
		return true;
	}
	
	/**
	 * @desc 제적 사유의 통지서 구분 셋팅
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 5. 31
	 */
	moPage.onValueChanged_CbbAltRsnRcd = function() {
		var vsAltRsnRcd = util.Control.getValue(app, "cbbAltRsnRcd");
		setIfrSheetDivRcdByImpExtCsrIfrSndCommon(ExtInstance.getValue("/root/resOnLoad/altDivRcdList/row[ child:: CD='"+ vsAltRsnRcd +"' ]/CD_PRP3"));
	};
	
	/**
	 * @desc 휴학을 2개 학기 연장한다.
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 9. 9
	 */
	moPage.onClick_RdBtnAbsDelay = function() {
		
		var vsAltRsn = util.DataMap.getValue(app, "dmReqList", "strAltRsnRcd");
		if(vsAltRsn != "CT40702"){
			util.Msg.alert("NLS-CSR-EXT029");
			return;
		}
		var vsRepNm = util.Grid.getCellValue(app, "grdExtCsrShregAltAply", "REP_NM");
		//휴학 연장 체크
		if(!util.Msg.confirm("NLS-CRM-EXT014", [vsRepNm]) ){
			return false;
		}
		
		util.DataMap.setValue(app, "dmReqAbsDelay", "strStudId", util.Grid.getCellValue(app, "grdExtCsrShregAltAply", "STUD_ID"));
		util.DataMap.setValue(app, "dmReqAbsDelay", "strSerialNo", util.Grid.getCellValue(app, "grdExtCsrShregAltAply", "SERIAL_NO"));
		
		//strCommand: absDelay 
		util.Submit.send(app, "subAbsDelay", function(pbSuccessSave) {
			
			if(pbSuccessSave) {
				
				// 휴학 연장 처리가 완료되었습니다.
				util.Msg.alert("NLS-CSR-EXT028");

				doList(function(pbSuccessList) {
					// 조회 : "조회되었습니다." header 메세지 표시
					if(pbSuccessList) {
						util.Msg.notify(app, "NLS.INF.M025");
					}
				});
			}
		});
		
	};
	
	/**
	 * @desc 복학취소 클릭
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 9. 9
	 */
	moPage.onClick_BtnSaveRtnCan = function() {
		util.coverPage(app);
		var strAltRsnRcd = util.Control.getValue(app, "cbbAltRsnRcd");
		
		if("CT40701" != strAltRsnRcd){
			util.Msg.alert("NLS-CSR-EXT034");
			util.removeCover(app);
			return;
		}
		
		// 복학취소일자 필수 체크
		if(!util.validate(app, ["dipAltDt"])){
			util.removeCover(app);
			return;
		}
		
		// 복학 취소
		doRtnCancel();
	};
	
	/**
	 * @desc 선택한 학생을 복학 취소한다. 조회조건이 미등록제적이고 해당 학생이 복학을 한 경우에만 가능하다.
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 9. 9
	 */
	function doRtnCancel() {
		var vsAltDt = ExtInput.getText("dipAltDt");
		var strBtnRtnCanNm = ExtControl.getTextValue("btnSaveRtnCan");
		var voRpt = ExtControl.getControl("rptExtCsrShregAltAply");
		var vsPath = voRpt.getRepeatAttr().getNodeSet();
		var vbPanel = false;
		var vsResult = "";
		var psUpdStatusId = AppConstants.DEL_COL_REF;
		// 리피트 패널 존재 여부 체크
		if(ExtInstance.getNodeObj(vsPath + "/" + AppConstants.DEL_COL_REF) != null){
			vbPanel = true;
		}
		
		if(ExtControl.getControl(psUpdStatusId)){
			 var vsRef = ExtControl.getControl(psUpdStatusId).getAttr("ref");
             vsRef = vsRef.substr(vsRef.lastIndexOf("/")+1, vsRef.length);
             psUpdStatusId = vsRef;
		}   
		
		if(vbPanel) {

			vsResult = voRpt.dataSet.find(psUpdStatusId + ":Y");
			
			if(vsResult == ""){
				// 라인을 선택하세요.
				util.Msg.alert("NLS-INF-M023");
				util.removeCover(app);
				return;
			}
			
		}else{
			// 라인을 선택하세요.
			util.Msg.alert("NLS-INF-M023");
			util.removeCover(app);
			return;
		}
		
		if(!util.validate(app, ["dipAltDt"])){
			util.removeCover(app);
			return;
		}
		
		var voPanelChk;
		
		if(String(vsResult).indexOf(",") != -1){
			voPanelChk = vsResult.split(",");
		}else{
			voPanelChk = new Array();
			voPanelChk[0] = vsResult;
		}
		
		var vsRtnRsn = "";
		// 복학한 학생인지 체크
		for(var i = voPanelChk.length - 1; i >= 0; i--) {
			vsRtnRsn = util.Grid.getCellValue(app, "grdExtCsrShregAltAply", "RTN_DT", voPanelChk[i]);
			if(ValueUtil.isNull(vsRtnRsn)){
				util.Msg.alert("NLS-CSR-EXT033");
				ExtControl.getControl("rptExtCsrShregAltAply").setColFocus(voPanelChk[i]);  
				util.removeCover(app);
				return;
			}
		}
		
		// 복학취소 여부 체크
		if(!util.Msg.confirm("NLS-CRM-EXT005", [vsAltDt, strBtnRtnCanNm]) ){
			util.removeCover(app);
			return;
		}
		
		// 체크 데이터만 복학취소 실행
		for(var i = voPanelChk.length - 1; i >= 0; i--) {
			util.Grid.setRowState(app, "grdExtCsrShregAltAply", cpr.data.tabledata.RowState.UPDATED, voPanelChk[i]);
		}
		
		// 복학 취소
		//strCommand: rtnCancel 
		util.Submit.send(app, "subRtnCancel", function(pbSuccessSave) {
			if(pbSuccessSave) {
				
				// 복학 취소 건수
				var vnTotCnt = util.DataMap.getValue(app, "dmResProc", "iTotCnt");
				var vnSuccessCnt = util.DataMap.getValue(app, "dmResProc", "iSuccessCnt");
				var vnFailCnt = util.DataMap.getValue(app, "dmResProc", "iFailCnt");
				
				//처리하였습니다.(총:@, 성공:@, 실패:@)
				util.Msg.alert("NLS-CSR-M017", [vnTotCnt, vnSuccessCnt, vnFailCnt]);
				util.removeCover(app);
				doList(function(pbSuccessList) {
					// 조회 : "조회되었습니다." header 메세지 표시
					if(pbSuccessList) {
						util.Msg.notify(app, "NLS.INF.M025");

						//파일디렉토리경로
						var vsErrorFileDir = util.DataMap.getValue(app, "dmErrorFileInfo", "strFileDir");
						//파일명
						var vsErrorFileNm = util.DataMap.getValue(app, "dmErrorFileInfo", "strFileNm");
						//변환파일명(실제 서버에 저장된 파일명)
						var vsErrorFileChgNm = util.DataMap.getValue(app, "dmErrorFileInfo", "strFileChgNm");
						var vsTmpFilePath = util.DataMap.getValue(app, "dmErrorFileInfo", "strTmpFilePath");
						// 에러파일 다운로드
						if(!(ValueUtil.isNull(vsErrorFileNm) || vsErrorFileNm=="")){
							var voParam = {
										"strFileSubPath" : "",
										"strFileNm" : vsErrorFileChgNm,
										"strOriFileNm" : vsErrorFileNm,
										"strTmpFilePath" : vsTmpFilePath,
										"strCommand" : "fileDownLoad"
							}								
							FileUtil.downloadFile( "/std.cmn.StdCmnFileTransUtil.ex", voParam);								
								// 에러파일 초기화
							util.DataMap.setValue(app, "dmErrorFileInfo", "strFileDir","");
							util.DataMap.setValue(app, "dmErrorFileInfo", "strFileNm","");
							util.DataMap.setValue(app, "dmErrorFileInfo", "strFileChgNm","");
							util.DataMap.setValue(app, "dmErrorFileInfo", "strTmpFilePath","");
						} else{
							// 에러파일 초기화
							util.DataMap.setValue(app, "dmErrorFileInfo", "strFileDir","");
							util.DataMap.setValue(app, "dmErrorFileInfo", "strFileNm","");
							util.DataMap.setValue(app, "dmErrorFileInfo", "strFileChgNm","");
							util.DataMap.setValue(app, "dmErrorFileInfo", "strTmpFilePath","");
							return false;
						}
					}
				});
			}else{
				util.removeCover(app);
			}
		});
	}
	return moPage;
};
