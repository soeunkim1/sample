//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
///<xtmlink path="./extCsrCExtAccrIqyMgt.xtm"/>

var extCsrCExtAccrIqyMgt = function() {

	var moPage = new Page();
	//임포트용 데이터 통신 오브젝트
	var moPObject = new PObject();

	var msFileNm = "";
	//에러 목록
	moPObject.moErrorList = null;
	moPObject.moErrorFileInfo = null;
	
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
		controlId 					: "btnPopSearch",
		iStudNo 					: "ipbStudNo",	
		iStudId 						: "",
		iStudNm 					: "",
		iKeyDate 					: "dipReqEndDt", 
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
		}
	},
	{
		controlId 					: "rdBtnPopSearch",
		iStudNo 					: "rdIpbStudNo",	
		iStudId 						: "",
		iStudNm 					: "",
		iKeyDate 					: "rdDipReqDt", 
		iObjDivRcd 				: "",
		iObjCd 						: "",
		iObjNm 					: "",
		iStatRcd 					:"",
		iStudDivRcd				: "",
		oStudId 					: "rdIpbStudId",
		oStudNo 					: "rdIpbStudNo",
		oStudNm 					: "rdOptRepNm",
		oStatNm 					: "rdOptStatus",
		oStatRcd 					: "",
		oProcRslt 					: "",
		oProcRsltYear 			: "rdOptYear",
		oSaNm						: "rdOptSaNm",
		oSaCd 						: "",
		oSpNm 					: "",
		oSpCd 						: "",
		oOgNm 					: "",
		oOgCd 						: "",
		oStudDivRcd				: "",
		oStudDivNm				: "",
		oBirthday					: "rdOptBirthDt",
		oGenderRcd				: "",
		oGenderNm				: "",
		func : function() {
		}
	}
	];
	
	/**
	 * @desc 헤더 온로드
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 3. 21
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		doHeaderOnLoad();
	};
				
	/**
	 * @desc 화면 온로드
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 3. 21
	 */
	moPage.onModelConstructDone_extCsrCExtAccrIqyMgt = function() {
		//리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init("rptExtCsrAccrIqy");
		// 2. 검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grpData"]);
		
		//서브미션 실행 (실패시 cover page)
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				
				util.Control.setValue(app, "dipReqStDt", util.DataMap.getValue(app, "dmCurrentDateInfo", "BF_SYSDATE"));
				util.Control.setValue(app, "dipReqEndDt", util.DataMap.getValue(app, "dmCurrentDateInfo", "CUT_DT"));
				util.Control.setValue(app, "dipReqDtUp", util.DataMap.getValue(app, "dmCurrentDateInfo", "CUT_DT"));
				
				util.Control.redraw(app, ["cbbPrtPrpRcd", "dipReqStDt", "dipReqEndDt", "dipTrnsmStDt", "dipReqDtUp", "cbbPrtPrpRcdUp"]);
			}
		});
	}

	/**
	 * @desc 조회 버튼 클릭 이밴트
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 3. 21
	 */
	moPage.onClick_BtnSearch = function() {
		if(util.Grid.isModified(app, "", "CRM")){
			return false;
		}
		var vsReqStDt = util.DataMap.getValue(app, "dmReqList", "strReqStDt");
		var vsReqEndDt = util.DataMap.getValue(app, "dmReqList", "strReqEndDt");
		var vsStudNo = util.DataMap.getValue(app, "dmReqList", "strStudNo");
		
		if(ValueUtil.isNull(vsReqStDt)&&ValueUtil.isNull(vsReqEndDt)&&ValueUtil.isNull(vsStudNo)){
			util.Msg.alert("NLS-CSR-EXT031");
			return false;
		}else{
			if(!ValueUtil.isNull(vsReqStDt)||!ValueUtil.isNull(vsReqEndDt)){
				// 조회조건 필수 체크
				if(!util.validate(app, ["dipReqStDt", "dipReqEndDt"])){
					return false;
				}
			}else{
				// 조회조건 필수 체크
				if(!util.validate(app, ["ipbStudNo"])){
					return false;
				}
			}
		}

		doList(function(pbSuccess) {
			// 조회 : "조회되었습니다." header 메세지 표시
			if(pbSuccess) {
				util.Msg.notify(app, "NLS.INF.M024");
			}
		});
	};
	
	/**
	 * @desc 학력조회 목록 조회
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 3. 21
	 */
	function doList(poCallBackFunc) {
		//strCommand: list 
		util.Submit.send(app, "subList",  function(pbSuccess) {
			if(pbSuccess){
				//rebuild
				util.Control.redraw(app, ["rptExtCsrAccrIqy"]);
			}
			
			if(util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
		});
	}

	/**
	 * @desc 리피트 panel click event
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 3. 21
	 */
	moPage.onValueChanged_RhCkbSelect = function() {
//TO-BE: <ExtRepeat.selectedAllPanel> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.selectedAllPanel("rhCkbSelect");
	}
	
	/**
	 * @desc 엑섹양식 다운로드
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 3. 21
	 */
	moPage.onClick_BtnDown = function() {
		var vsFileChgNm =  "학력조회_회신관리.xlsx";
	
		var voParam = {
					"strFileSubPath" :"stdCmnCTemplateFile",
					"strFileNm" :vsFileChgNm,
					"strOriFileNm" : vsFileChgNm,
					"strTmpFilePath" :"",
					"strCommand" : "fileDownLoad"
		}
		//다운로드 받을 파일 위치, 다운로드받을 파일이름, 프로그래스동작여부(일단 ""), actionUrl
		FileUtil.downloadFile( "/std.cmn.StdCmnFileTransUtil.ex",voParam);
	}
	
	/**
	 * @desc 학생검색(조회조건)
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 3. 21
	 */
	moPage.onValueChanged_IpbStudNo = function(sender) {
		doOnChangeStdCsrPStSearch(sender);
	};
	
	
	/**
	 * @desc 학생검색 팝업 호출(조회조건)
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 3. 21
	 */	
	moPage.onClick_BtnPopSearch = function(sender) {
		doOnClickStdCsrPStSearch(sender);
	}
	
	
	/**
	 * @desc 학생검색(리피트)
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 3. 21
	 */
	moPage.onValueChanged_RdIpbStudNo = function(sender) {
		doOnChangeStdCsrPStSearch(sender);
	};
	
	
	/**
	 * @desc 학생검색 팝업 호출(리피트)
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 3. 21
	 */
	moPage.onClick_RdBtnPopSearch = function(sender) {
		doOnClickStdCsrPStSearch(sender);
	};
	
	
	/**
	 * @desc 양식 파일 선택
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 3. 21
	 */
	moPage.onClick_BtnBrowse = function() {
		FileUtil.getFileName(true, ["xls", "xlsx"], function(psFileNm){
			if(psFileNm) {
				msFileNm = psFileNm;
				util.Control.setValue(app, "optFilePath", psFileNm);
			}else{
				msFileNm = "";
				util.Control.setValue(app, "optFilePath", "");
			}
		}, null, false);
	};
	
	
	/**
	 * @desc 엑셀 업로드
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 3. 21
	 */
	moPage.onClick_BtnUpLoad = function() {
		// 업로드 필수 체크
		if(!util.validate(app, ["cbbPrtPrpRcdUp", "dipReqDtUp", "ipbReqListUp", "optFilePath"])){
			return false;
		}
		
		if(msFileNm) {
			var vaFileNm = msFileNm.split(",");
				
			if(vaFileNm.length > 2) return false;
			
			//strCommand: insFileAccrIqyDataSave 
			util.Submit.send(app, "subAccrIqyDataSave", function(pbSuccess){
										
				if(pbSuccess){
					
					//이관 성공건수
					var vnTotCnt = util.DataMap.getValue(app, "dmResProc", "iTotCnt");
					var vnSuccessCnt = util.DataMap.getValue(app, "dmResProc", "iSuccessCnt");
					var vnFailCnt = util.DataMap.getValue(app, "dmResProc", "iFailCnt");
					
					//3.1.1 이관 건수 메시지 호출
					//처리하였습니다.(총:@, 성공:@, 실패:@)
					util.Msg.alert("NLS-CSR-M017", [vnTotCnt, vnSuccessCnt, vnFailCnt]);
					doList(function(pbSuccess) {
						// 조회 : "조회되었습니다." header 메세지 표시
						if(pbSuccess) {
							util.Msg.notify(app, "NLS.INF.M003");
							
							var voErrorList = ExtInstance.getNodeListObj("/root/resProc/errDataList/row");
							
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
								util.DataMap.setValue(app, "dmErrorFileInfo", "strFileDir", "");
								util.DataMap.setValue(app, "dmErrorFileInfo", "strFileNm", "");
								util.DataMap.setValue(app, "dmErrorFileInfo", "strFileChgNm", "");
								util.DataMap.setValue(app, "dmErrorFileInfo", "strTmpFilePath", "");
							} else {
								util.DataMap.setValue(app, "dmErrorFileInfo", "strFileDir", "");
								util.DataMap.setValue(app, "dmErrorFileInfo", "strFileNm", "");
								util.DataMap.setValue(app, "dmErrorFileInfo", "strFileChgNm", "");
								util.DataMap.setValue(app, "dmErrorFileInfo", "strTmpFilePath", "");
								return false;
							}
						}
					});
				}
				// 엑셀 업로드 실행시 선택한 임시 파일은 삭제됨
				// 파일명 초기화
				msFileNm = "";
				util.Control.setValue(app, "optFilePath", "");
			});			
		}else{
			util.Msg.alert("NLS-CMM-M012");
			return false
		}
	};
	
	/**
	 * @desc 학력 신규버튼 클릭
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 3. 21
	 */
	moPage.onClick_BtnNew = function() {
		//해당 리피트 insertRow 후 편집 시작할 컬럼 지정
		util.Grid.insertRow(app, "grdExtCsrAccrIqy");
		
		var vsPrtPrpRcd = util.Control.getValue(app, "cbbPrtPrpRcd");
		
		util.Grid.setCellValue(app, "grdExtCsrAccrIqy", "REQ_DT", util.DataMap.getValue(app, "dmCurrentDateInfo", "CUT_DT"));
		
		if(ValueUtil.fixNull(vsPrtPrpRcd) != ""){
			util.Grid.setCellValue(app, "grdExtCsrAccrIqy", "PRT_PRP_RCD", vsPrtPrpRcd);
		}
	};
	
	
	/**
	 * @desc 삭제버튼 클릭
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 3. 21
	 */
	moPage.onClick_BtnDel = function() {
		util.Grid.deleteRow(app, "grdExtCsrAccrIqy");
	};
	
	
	/**
	 * @desc 작업취소버튼 클릭
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 3. 21
	 */
	moPage.onClick_BtnRestore = function() {
		util.Grid.restoreRow(app, "grdExtCsrAccrIqy");
	};
	
	
	/**
	 * @desc 저장버튼 클릭
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 3. 21
	 */
	moPage.onClick_BtnSave = function() {
		doSave();
	};
	
	
	/**
	 * @desc 저장이벤트
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 3. 21
	 */
	function doSave() {
		
		// 리피터 변경사항 체크
		if(!util.Grid.isModified(app, ["grdExtCsrAccrIqy"], "MSG")){
			return false;
		}
		//리피트 validation check
		if(!util.validate(app, "grdExtCsrAccrIqy")) return false;

		//strCommand: save 
		util.Submit.send(app, "subSave", function(pbSuccessSave) {
				if(pbSuccessSave) {
					var vsLastSerialNo = util.DataMap.getValue(app, "dmResList", "strLastSerialNo");
					//마지막 순번있으면 포커싱 가도록
					if(vsLastSerialNo!=""){
						ExtRepeat.setPkValues("rptExtCsrAccrIqy", vsLastSerialNo);
					}
					
					//저장성공 메세지 출력
					doList(function(pbSuccessList) {
						// 조회 : "조회되었습니다." header 메세지 표시
						if(pbSuccessList) {
							util.Msg.notify(app, "NLS.INF.M025");
						}
					});
				}
			}
		);
	}
	
	return moPage;
};

