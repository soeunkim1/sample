//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
///<xtmlink path="./extCsrCAltAplyRecog.xtm"/>

var extCsrCAltAplyRecog = function() {

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

	/******************************************************************************************************
	 *  공통파일업로드 관련 설정사항 사용법
	 *
	 * 예시)
	 * var moIdsForStdCmnFileUtil = [{
	 *		controlId 					: "btnFileUpLoad",
	 *		iFileSerialNo 				: "rdOptFileSerialNo",
	 *		iFileSubPath 				:  model.getTitle(),
	 *		iTableName 				: "CMN_TMP_REG",
	 *		iIsDirectUpLoad			: null,
	 *     isFileSelectorOnly       : null,
	 *		iIsHideDelete 				: null,			
	 *		iIsDownloadOnly 		: null,
	 *		iFileExtFilter 				: null,
	 *		oFileSerailNo				: "rdOptFileSerialNo",
	 *		oTmpFilePath			: null,			//리피트일경우 null로 지정
	 *		oFileCnt					: null,		
	 *		oFileDataChanged		: null,
	 *		func							: function(poRtnFileInfo){
	 *											ex)
	 *											if(poRtnFileInfo.IS_FILE_CHG && poRtnFileInfo.FILE_CNT == 0){
													util.FreeForm.setValue(app, "frfCmnDevStd", "FILE_SERIAL_NO", "", true); 
													doSave();
												}
	 *										}
	 *	}];
	 *  ▶ 설정가능 유형
	 *      1. 인스턴스
	 *      2. 리피트 디테일 셀 ID
	 *      3. 컨트롤 ID
	 *  ▶ 각 변수별 설명
	 *      iXXX : 팝업에 전달될  input 파라미터
	 *      oXXX : 팝업에서 선택한 값을 받을 데이터
	 *  	1. controlId 			: 최초 이벤트의 버튼이나 그리드 id             						(필수)
	 *  	2. iFileSerialNo		: 파일순번                                										(선택) 
	 *  	3. iFileSubPath 		: 저장될 파일 폴더(appworks.properties에 정의된 폴더 경로)	(필수)	
	 *  	4. iTableName 		: 파일업로드에 사용될 업무단 테이블명								(필수)
	 *  	5. iIsHideDelete 		: 삭제버튼 숨기기 여부 													(선택)
	 *								  	  default : false;
	 *		6. iIsDownloadOnly	: 다운로드만 가능할지 여부(업로드X)									(선택)
	 *								      default : false;
	 *		7. iIsDirectUpLoad   : auto save기능을 사용하지 않고 파일업로드 팝업을 이용하여 업로드 후 업로드된 정보만 리턴받아 제어 할 경우 사용
	 *									  default : false;
	 *		8. isFileSelectorOnly : 파일 셀럭터를 이용하여 응용프로그램에서 탬프 파일 경로만 취득하여 제어할 경우경우 사용
	 *									  default : false;
	 *		9. iFileExtFilter		: 업로드가능 확장자(배열) 												(선택)
	 *								  	  ex)["jpg","png"]
	 *  	10. oFileSerailNo 		: 파일순번																		(필수)
	 *  	11. oFileCnt 			: 저장된 파일 갯수															(선택)
	 *									  (	func의 args 대체 가능 poRtnFileInfo.strFileCnt)
	 *									  리피트내 컬럼 지정시 updatable="False" 지정
	 *  	12. oTmpFilePath 	: 임시폴더파일경로															(선택)
	 *									  리피트일경우 null로 지정, TMP_FILE_PATH 데이터셋 생성됨
	 *									  
	 *		13.oFileDataChanged	: 파일업로드 변경 여부 판단											(필수)		
	 *									  (	func의 args 대체 가능 poRtnFileInfo.isFileDataChanged)
	 *
	 *  	14. func 				: 팝업에서 선택한 값을 받은 후 추가 로직이 필요한 경우 함수
	 *									  args..
	 * 									  poRtnFileInfo.IS_FILE_CHG 			파일업로드 리피트 변경 여부
	 *															 FILE_CNT					업로드 파일 갯수
	 *															 TMP_FILE_PATH		임시파일경로
	 *									  						 FILE_SERAIL_NO		파일순번
	 *******************************************************************************************************/	
	moPObject.moIdsForStdCmnFileUtil = [{
		controlId 					: "rdImgFileDown",
		iFileSerialNo 				: "rdIpbFileSerialNo",
		iFileSubPath 				:  "extCsrCFileMng",
		iTableName 				: "EXT_CSR_SHREG_ALT_APLY",
		iIsDirectUpLoad			: true,
		isFileSelectorOnly       : null,
		iIsHideDelete 				: true,			
		iIsDownloadOnly 		: true,
		iFileExtFilter 				: null,
		oFileSerailNo				: "rdIpbFileSerialNo",
		oTmpFilePath			: null,			//리피트일경우 null로 지정
		oFileCnt					: "rdOptFileCnt",		
		oFileDataChanged		: null,
		func							: function(poRtnFileInfo){
											if(poRtnFileInfo.IS_FILE_CHG && poRtnFileInfo.FILE_CNT == 0){
												util.Grid.setCellValue(app, "grdExtCsrFile", "FILE_SERIAL_NO", "", null, true);
											}else{
												util.Grid.setCellValue(app, "grdExtCsrFile", "FILE_SERIAL_NO", poRtnFileInfo.FILE_SERAIL_NO, null, true);
											}
										}
	}];
	
	/**
	 * @desc Header Import onLoad
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 4. 11
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		doHeaderOnLoad();
	};

				
	/**
	 * @desc 화면 온로드
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 4. 11
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
				util.DataMap.setValue(app, "dmReqList", "strAplyStatRcd", "CSR10310");	
				util.DataMap.setValue(app, "dmReqList", "strAltDt", util.DataMap.getValue(app, "dmResOnLoad", "strCutDt"));
				util.DataMap.setValue(app, "dmReqList", "strAltDivRcd", "CT401RETU");	
				
				util.Control.redraw(app, ["cbbSchYearRcd", "cbbSmtRcd", "cbbAltDivRcd", "cbbAplyStatRcd", "dipAltDt"]);
			}
		});
	}

	/**
	 * @desc 학적변동 신청 목록 조회버튼 클릭
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 4. 11
	 */
	moPage.onClick_BtnSearch = function() {
		if(util.Grid.isModified(app, "", "CRM")){
			return false;
		}
		
		// 조회조건 필수 체크
		if(!util.validate(app, ["cbbSchYearRcd", "cbbSmtRcd", "cbbAltDivRcd", "ipbDeptNm"])){
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
	 * @desc 학적변동 신청 목록 조회
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 4. 11
	 */
	function doList(poCallBackFunc) {
		
		//strCommand: list 
		util.Submit.send(app, "subList",  function(pbSuccess) {
			if(pbSuccess){
				//rebuild
				util.Control.redraw(app, ["rptExtCsrShregAltAply"]);
				//승인된 군휴학원서만 리포트 호출 가능
				var vsAltDivRcd = util.DataMap.getValue(app, "dmReqList", "strAltDivRcd");
				var vsAplyStatRcd = util.DataMap.getValue(app, "dmReqList", "strAplyStatRcd");
				if(vsAltDivRcd=="CT401ABSE"&&vsAplyStatRcd=="CSR10320"){
					util.Control.setEnable(app, true, "btnPrint");
				}else{
					util.Control.setEnable(app, false, "btnPrint");
				}
			}
			if(util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
		});
		
	}

	/**
	 * @desc 학적변동 신청 목록 저장버튼 클릭
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 4. 11
	 */
	moPage.onClick_BtnSave = function() {
		util.coverPage(app);
		doSave();
	};
	
	/**
	 * @desc 학적변동 신청 목록 저장
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 4. 11
	 */
	function doSave() {
		// 리피터 변경사항 체크
		if(!util.Grid.isModified(app, ["grdExtCsrShregAltAply"], "MSG")){
			util.removeCover(app);
			return false;
		}
		//리피트 validation check
		if(!util.validate(app, "grdExtCsrShregAltAply")){
			util.removeCover(app);
			return false;
		}
		
		var vsAltDt = ExtInput.getText("dipAltDt");
		
		var vsAltDivRcd = util.Control.getValue(app, "cbbAltDivRcd");
		var vsAplyStatRcd = util.Control.getValue(app, "cbbAplyStatRcd");
		
		// 승인구분이 신청일시만 승인 여부 체크 호출 
		if(vsAplyStatRcd=="CSR10310"){
			//승인 여부 체크
			if(!util.Msg.confirm("NLS-CRM-EXT003", [vsAltDt]) ){
				util.removeCover(app);
				return false;
			}	
		}		
		
		//strCommand: save 
		util.Submit.send(app, "subSave", function(pbSuccessSave) {
			
				if(pbSuccessSave) {
					
					//이관 성공건수
					var vnTotCnt = util.DataMap.getValue(app, "dmResProc", "iTotCnt");
					var vnSuccessCnt = util.DataMap.getValue(app, "dmResProc", "iSuccessCnt");
					var vnFailCnt = util.DataMap.getValue(app, "dmResProc", "iFailCnt");
					
					// 승인구분이 신청일시만 성공 여부 메시지를 호출한다.
					if(vsAplyStatRcd=="CSR10310"){
						//처리하였습니다.(총:@, 성공:@, 실패:@)
						util.Msg.alert("NLS-CSR-M017", [vnTotCnt, vnSuccessCnt, vnFailCnt]);
					}
					util.removeCover(app);
					doList(function(pbSuccessList) {
						// 조회 : "조회되었습니다." header 메세지 표시
						if(pbSuccessList) {
							util.Msg.notify(app, "NLS.INF.M025");
							
							// 승인구분이 신청일시만 파일을 체크한다.
							if(vsAplyStatRcd=="CSR10310"){
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
						}
					});
				}else{
					util.removeCover(app);
				}
			}
		);
	}

	/**
	 * @desc 학적변동 신청 작업취소
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 4. 11
	 */
	moPage.onClick_BtnRestore = function() {
		util.Grid.restoreRow(app, "grdExtCsrShregAltAply");
	};
	
	/**
	 * @desc 리피트 panel click event
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 4. 11
	 */
	moPage.onValueChanged_RhCkbSelect = function() {
//TO-BE: <ExtRepeat.selectedAllPanel> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.selectedAllPanel("rhCkbSelect");
	};

	/**
	 * @desc 파일업로드 팝업 호출(다운로드만 사용)
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 4. 11
	 */
	moPage.onClick_RdImgFileUpload = function(sender) {
		
		doOnClickStdCmnPFileUtil(sender);
	}

	/**
	 * @desc 소속 검색 팝업 호출
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 4. 11
	 */
	moPage.onClick_BtnPopSearch = function(sender) {
		doOnClickStdCmnPObjSch(sender);
	}
	

	/**
	 * @desc 소속 권한 처리
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 4. 11
	 */
	moPage.onLoadImportDone_ImpStdCmnPobjSch = function() {
		setStdCmnPObjSchObjInfo();
	}

	/**
	 * @desc 학생검색 팝업 호출
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 4. 11
	 */
	moPage.onClick_BtnStudPopSearch = function(sender) {
		doOnClickStdCsrPStSearch(sender);
	}
	
	/**
	 * @desc 학생검색
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 4. 11
	 */
	moPage.onValueChanged_IpbStudNo = function(sender) {
		doOnChangeStdCsrPStSearch(sender);
	}
	
	/**
	 * @desc 소속 검색
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 4. 11
	 */	
	moPage.onValueChanged_IpbDeptNm = function(sender) {
		doOnChangeStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc 표준일자 조회
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 4. 11
	 */	
	moPage.onValueChanged_CbbSchYearRcd = function() {
		doGetKeyDate();
	};
	
	/**
	 * @desc 표준일자 조회
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 4. 11
	 */	
	moPage.onValueChanged_CbbSmtRcd = function() {
		doGetKeyDate();
	};
	
	/**
	 * @desc 학년도 학기 변경에 따른 표준일자 반환
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 4. 11
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
		});
	};
	
	/**
	 * @desc 선택승인클릭
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 3. 29
	 */
	moPage.onClick_BtnSaveAprv = function() {
		doBatch("aprv");
	};
	
	/**
	 * @desc 선택반려클릭
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 3. 29
	 */
	moPage.onClick_BtnSaveCancel = function() {
		doBatch("cancel");
	};
	
	/**
	 * @desc 선택승인,반려 
	 *            선택한 신청중인 데이터만 승인구분을 '승인'또는 '반려', 변동일자를 변동일자로 셋팅한다.
	 *            저장을 해야만 반영된다.
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 3. 29
	 */
	function doBatch(psSelDiv) {
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
		var vsAplyStatRcd;
		//신청인 데이터만 선택 승인 실행
		for(var i = voPanelChk.length - 1; i >= 0; i--) {
			vsAplyStatRcd = util.Grid.getCellValue(app, "grdExtCsrShregAltAply", "APLY_STAT_RCD", voPanelChk[i]);
			
			if(vsAplyStatRcd == "CSR10310"){
				
				util.Grid.setRowState(app, "grdExtCsrShregAltAply", cpr.data.tabledata.RowState.UPDATED, voPanelChk[i]);
				util.Grid.setCellValue(app, "grdExtCsrShregAltAply", "UPT_STATUS", "U",  voPanelChk[i], true);
				
				if(psSelDiv =="aprv"){ //승인
					util.Grid.setCellValue(app, "grdExtCsrShregAltAply", "APLY_STAT_RCD", "CSR10320",  voPanelChk[i], true);
					util.Grid.setCellValue(app, "grdExtCsrShregAltAply", "ALT_DT", vsAltDt,  voPanelChk[i], true);
				}else if(psSelDiv=="cancel"){//반려
					util.Grid.setCellValue(app, "grdExtCsrShregAltAply", "APLY_STAT_RCD", "CSR10330",  voPanelChk[i], true);
					util.Grid.setCellValue(app, "grdExtCsrShregAltAply", "ALT_DT", "",  voPanelChk[i], true);
				}
			}
		}
	}
	
	/**
	 * @desc 군휴학원서 출력
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 4. 12
	 */
	moPage.onClick_BtnPrint = function() {
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
		
		var vsPStudId        		= "";
		var voPanelChk;
		
		if(String(vsResult).indexOf(",") != -1){
			voPanelChk = vsResult.split(",");
		}else{
			voPanelChk = new Array();
			voPanelChk[0] = vsResult;
		}
		var vsAplyStatRcd;
		
		for(var i = 0; i < voPanelChk.length; i++){
			if(i > 0){
				vsPStudId = vsPStudId + ",";
			}
			vsPStudId = vsPStudId + "'" + util.Grid.getCellValue(app, "grdExtCsrShregAltAply", "STUD_ID", voPanelChk[i]) + "'";
		}

		var vsSmtRcd = util.DataMap.getValue(app, "dmReqList", "strSmtRcd");
		var vsCrsSmtRcd = ExtInstance.getValue("/root/resOnLoad/smtRcdList/row", "CD_PRP5", "child::CD='" + vsSmtRcd + "'");

		//리퀘스트 셋팅
		var voParam = {
					p_strDeptCd     			: util.DataMap.getValue(app, "dmReqList", "strDeptCd"),
					p_strObjDivRcd  			: util.DataMap.getValue(app, "dmReqList", "strObjDivRcd"),
					p_strSchYearRcd 		: util.DataMap.getValue(app, "dmReqList", "strSchYearRcd"),
					p_strSmtRcd       		: vsSmtRcd,
					p_strCrsSmtRcd      	: vsCrsSmtRcd,
					p_strStudId        		: vsPStudId,
					p_strLandivRcd   		: msDefaultLocale
				}	
				
			 var voOzFormParam = {
					  TITLE : "휴학변경(군입대)원서" //리포트타이틀
					, SUB_TITLE : "" //리포트서브타이틀		
					, FORM_TYPE : "flash"
				};	
				
		ReportUtil.fOzPopupOpen("군휴학원서", "extCsrSChgMilAbsSheetPrt", voOzFormParam, voParam);
	};
	
	
	
	/**
	 * @desc 통폐합이력이 있는 경우, 해당 부서 필터및 설정 
	 * @param
	 * @return void
	 * @author Sunyoung, PARK 2017.1.2
	 */
	moPage.onRowSelect_RptExtCsrShregAltAply = function() {
		
		var vnRow = util.Grid.getIndex(app, "grdExtCsrShregAltAply");
		var vsPreSaCd = util.Grid.getCellValue(app, "grdExtCsrShregAltAply","SA_CD",vnRow);
		
		ExtControl.setAttr("rdCbbChgSa", "nodeset", "/root/resOnLoad/expSaList/row[child::PRE_SA_CD='"+ vsPreSaCd +"'] ");
		
		util.Control.redraw(app, "rdCbbChgSa");
		
	};
	
	
	/**
	 * @desc 통폐합이력이 있는 경우, 해당 부서 필터및 설정 
	 * @param
	 * @return void
	 * @author Sunyoung, PARK 2017.1.2
	 */
	moPage.onValueChanged_RdCbbChgSa = function() {
		
		var vnRow = util.Grid.getIndex(app, "grdExtCsrShregAltAply");
		
		var vsSpCd = util.Grid.getCellValue(app, "grdExtCsrShregAltAply","CHG_SP_CD",vnRow);
		var vsChgSaCd = ExtInstance.getValue("/root/resOnLoad/expSaList/row", "CHG_SA_CD", "child::SP_CD='" + vsSpCd  + "'");
		util.Grid.setCellValue(app, "grdExtCsrShregAltAply","CHG_SA_CD",vsChgSaCd,vnRow);
	};
	
	
	
	
	/**
	 * @desc 신청일자변경시 해당하는 신청일자를 학적변동일자에 자동설정되도록 
	 * @param
	 * @return void
	 * @author Sunyoung, PARK 2017.2.23
	 */
	moPage.onValueChanged_DipAplyStDt = function() {
		
				util.DataMap.setValue(app, "dmReqList", "strAltDt", util.DataMap.getValue(app, "dmReqList", "strAplyStDt"));
				util.Control.redraw(app, "dipAltDt");
		
	};
	
	
	return moPage;
};
