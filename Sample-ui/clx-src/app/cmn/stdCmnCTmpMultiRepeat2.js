//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./stdCmnCTmpMultiRepeat2.xtm"/>

var stdCmnCTmpMultiRepeat2 = function() {
		
	var moPage = new Page();
	//임포트용 데이터 통신 오브젝트
	var moPObject = new PObject();
	
	/******************************************************************************************************
	 *  학생검색팝업 관련 설정사항
	 *  ▶ 설정가능 유형
	 *      1. 인스턴스
	 *      2. 리피트 디테일 셀 ID
	 *      3. 컨트롤 ID
	 *  ▶ 각 변수별 설명
	 *      iXXX : 팝업에 전달될  input 파라미터
	 *      oXXX : 팝업에서 선택한 값을 받을 데이터
	 *      1. controlId			: 최초 이벤트의 버튼이나 그리드 id	(필수)
	 *      2. iStudNo 			: 검색조건 학번					    		(선택) (값이 존재할 경우 4자리 이상)
	 *      3. iStudId 				: 검색조건 학번오브젝트					(선택)
	 *      4. iStudNm 			: 이름        				            		(선택) (값이 존재할 경우 2자리 이상)
	 *      5. iKeyDate 			: 기준일 										(필수) (기준일자(학년도학기 종료일),안주면 최종데이터나옴)
	 *      6. iObjDivRcd 		: 객체구분코드 								(선택)
	 *      7. iObjCd 				: 부서코드										(선택)
	 *      8. iObjNm 			: 부서명											(선택) 
	 *      9. iAuthYN				: 권한미적용여부 (미적용시: "Y")		(선택) 
	 *     10. iStatRcd			: 학적상태코드								(선택) "CT301ATTE,CT301ABSE,CT301COMP,CT301GRAD,CT301REMO"
	 *     11. oStudId				: 학번오브젝트
	 *     12. oStudNo 			: 학번
	 *     13. oStudNm 			: 이름
	 *     14. oSsn 				: 주민번호
	 *     15. oStatNm 			: 학적상태명
	 *     16. oStatRcd 			: 학적상태코드
	 *     17. oProcRslt 			: 진급학기
	 *     18. oProcRsltYear 	: 진급학년
	 *     19. oSaCd 				: 학사부서코드명
	 *     20. oSaNm 			: 학사부서명
	 *     21. oSpCd 				: 이수과정코드명
	 *     22. oSpNm 			: 이수과정명
	 *     23. oOgCd 				: 행정부서코드명
	 *     24. oOgNm 			: 행정부서명
	 *     25. func 				: 팝업에서 선택한 값을 받은 후 추가 로직이 필요한 경우 함수 작성
	 *									  
	 *******************************************************************************************************/	
	moPObject.moIdsForStdCsrPStSearch = [
	{
		controlId     		: "btnStudNo",
		iStudNo       		: "ipbStudNo",		
		iStudId       		: "",
		iStudNm       		: "",
		iKeyDate	  		: "/root/resOnLoad/strKeyDate",
		iObjDivRcd 		: "",
		iObjCd     	  		: "",
		iObjNm 			: "",
		iAuthYN		  		: "",
		iStatRcd		  	: "",
		oStudId       		: "/root/reqKey/strStudId",
		oStudNo       		: "ipbStudNo",		
		oStudNm       	: "",
		oSsn          		: "",
		oStatNm 	  		: "",
		oStatRcd	  		: "",
		oProcRslt	  		: "",
		oProcRsltYear 	: "",
		oSaCd         		: "",
		oSaNm         	: "",					
		oSpCd         		: "",
		oSpNm         	: "",
		oOgCd 		  		: "",
		oOgNm 		  	: "",
		func 		  			: function(poRtnValue){
									//객체검색 후 callBack Func
									//결과 object : poRtnValue.result
								   }
	},
	{
		controlId     		: "btnFrfStudNo",
		iStudNo       		: "ipbFrfStudNo",		
		iStudId       		: "",
		iStudNm       		: "",
		iKeyDate	  		: "/root/resOnLoad/strKeyDate",
		iObjDivRcd 		: "",
		iObjCd     	  		: "",
		iObjNm 		  	: "",
		iAuthYN		  		: "",
		iStatRcd		  	: "",
		oStudId       		: "ipbFrfStudId",
		oStudNo       		: "ipbFrfStudNo",		
		oStudNm         	: "ipbFrfRepNm",
		oSsn          		: "",
		oStatNm 	  		: "",
		oStatRcd	  		: "",
		oProcRslt	  		: "",
		oProcRsltYear 	: "",
		oSaCd         		: "",
		oSaNm         	: "",					
		oSpCd         		: "",
		oSpNm         	: "",
		oOgCd 		  		: "",
		oOgNm 		  	: "",
		func 		  			: function(poRtnValue){
									//객체검색 후 callBack Func
									//결과 object : poRtnValue.result
								   }
	}
	];
		
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
	{
		controlId			:	"btnSaNm",
		iCd					:	"",
		iNm					:	"ipbSaNm",
		iObjDivRcd			:	["CC009SA"],
		iStartObject    	:   "",
		iOtDivRcd			:	"",
		iOtIsTreeView	:	"",
		iLanDivRcd		:	"",
		iKeyDate			:	"/root/resOnLoad/strKeyDate",
		iKeyEndDate		:	"",
		oObjDivRcd		:	"",
		oCd					:	"/root/reqKey/strSaCd",
		oCdNm				:	"ipbSaNm",
		oBegDt				:	"",
		oEndDt				:	"",
		oLanDivRcd		:	"",
		func 					: function(poRtnValue){
									//객체검색 후 callBack Func
									//결과 object : poRtnValue.result
								   }
	},
	{
		controlId			:	"btnFrfSaNm",
		iCd					:	"",
		iNm					:	"ipbFrfSaNm",
		iObjDivRcd			:	["CC009SA"],
		iStartObject    	:   "",
		iOtDivRcd			:	"",
		iOtIsTreeView	:	"",
		iLanDivRcd		:	"",
		iKeyDate			:	"/root/resOnLoad/strKeyDate",
		iKeyEndDate		:	"",
		oObjDivRcd		:	"",
		oCd					:	"ipbFrfSaCd",
		oCdNm				:	"ipbFrfSaNm",
		oBegDt				:	"",
		oEndDt				:	"",
		oLanDivRcd		:	"",
		func					:	function(poRtnValue){
									//객체검색 후 callBack Func
									//결과 object : poRtnValue.result
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
		controlId 					: "btnFileUpLoad",
		iFileSerialNo 				: "rdOptFileSerialNo",
		iFileSubPath 				:  model.getTitle(),
		iTableName 				: "CMN_TMP_REG",
		iIsDirectUpLoad			: null,
		isFileSelectorOnly       : null,
		iIsHideDelete 				: null,			
		iIsDownloadOnly 		: null,
		iFileExtFilter 				: null,
		oFileSerailNo				: null,
		oTmpFilePath			: null,			//리피트일경우 null로 지정
		oFileCnt					: "optFrfFileCnt",		
		oFileDataChanged		: null,
		func							: function(poRtnFileInfo){
											if(poRtnFileInfo.IS_FILE_CHG && poRtnFileInfo.FILE_CNT == 0){
												util.Grid.setCellValue(app, "grdCmnTmpReg", "FILE_SERIAL_NO", "", null, true);
												doSave();
											}
										}
	}];
	
	/**
	 * @desc  Header Import onLoad
	 * @return void
	 * @author xxxx 2015. 6. 5.
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		doHeaderOnLoad();
	};
	
	/**
	 * @desc  onModelConstructDone  event
	 * @return void
	 * @author xxxx 2015. 6. 5.
	 */
	moPage.onModelConstructDone_StdCmnCTmpMultiRepeat2 = function() {
		
		// 리피트 및 조회그룹 관련 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grpData"]);
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init("rptCmnTmpReg");
		
		//서브미션 실행 (두번째 인자가 'onLoad' 일 경우 서브미션 실패시 coverPage 실행)
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				ExtRepeat.refresh("frfCmnTmpReg");
			}
		});
	};
		
	/**
	 * @desc  학생목록 조회 submission 실행
	 * @param {Function} poCallBackFunc 콜백정의
	 * @return void
	 * @author xxxx 2015. 6. 5.
	 */
	function doList(poCallBackFunc) {
		
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdCmnTmpReg");
				
				var vnCnt = util.Grid.getRowCount(app, "grdCmnTmpReg");
				if(vnCnt < 1){
					util.Control.reset(app, "frfCmnTmpReg");					
				}
				// 조회 후 콜백함수 수행
				if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess); 
			}
		}); 
	}
	
	/**
	 * @desc     학생목록 리피트 저장 submission 실행
	 * @param  {Function} poCallBackFunc 저장 후 콜백정의
	 * @return void
	 * @author xxx 2015. 6. 18.
	 */
	function doSave(poCallBackFunc) {
		
		// 리피터 변경사항 체크
		if(!util.Grid.isModified(app, ["grdCmnTmpReg"], "MSG")){
			return false;
		}
		
		//리피트 validation check
		if(!util.validate(app, "grdCmnTmpReg")) return false;
		
		//strCommand: save 
		util.Submit.send(app, "subSave", function(pbSuccess){
			if(pbSuccess){
				doList(function(pbListSuccess) {
					// 조회 : "갱신된 데이터가 조회되었습니다." header 메세지 표시
					if (pbListSuccess) util.Msg.notify(app, "NLS.INF.M025");					
					if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbListSuccess);
				});
			}
		});
	}
	
	/**
	 * @desc  조회 버튼 click event 
	 *             필수 검색 조건이 존재할 경우 필수 체크 사항
	 *              1. 필수검색조건 컨트롤의 UserDefineAttr 지정
     *              2. valid 체크 공통 함수 사용
	 *               if(!util.validate(app, "ipbSaNm")) return false;
	 *			    3. 조회버튼의 최초 함수에 return 지정 
	 *                예) 조회버튼클릭 후 에디터 창 return page.onClick_BtnSearch(); 
	 *                 
	 * @return void
	 * @author xxxx 2015. 6. 5.
	 */
	moPage.onClick_BtnSearch = function() {
		
		//작업영역 리피트 변경 내역 체크
		if(util.Grid.isModified(app, "", "CRM")){
			return false;
		}
		
		doList(function(pbSuccess) {
			// 조회 : "조회되었습니다." header 메세지 표시
			if (pbSuccess) util.Msg.notify(app, "NLS.INF.M024");
			
		});
	};
	
	/**
	 * @desc 신규 click event
	 *            학생목록 리피트 row 추가
	 * @return void
	 * @author xxxx 2015. 6. 5.
	 */
	moPage.onClick_BtnNew = function() {
		// 신규로우 추가
		util.Grid.insertRow(app, "grdCmnTmpReg");
		// 프리폼의 학번입력에 포커스
		util.Control.setFocus(app,  "ipbFrfStudNo");
	};
	
	/**
	 * @desc 삭제 click event
	 *            학생목록 리피트 index row 삭제 status 변경
	 * @return void
	 * @author xxxx 2015. 6. 5.
	 */	
	moPage.onClick_BtnDel = function() {

		util.Grid.deleteRow(app, "grdCmnTmpReg");
		// 학생정보 프리폼 비활성화 처리
		doCompareFrfEnable();
	};
	
	/**
	 * @desc 작업취소 click event
	 *            학생목록 리피트 index row restore
	 * @return void
	 * @author xxxx 2015. 6. 5.
	 */	
	moPage.onClick_BtnRestore = function() {
		util.Grid.restoreRow(app, "grdCmnTmpReg");
		// 학생정보 프리폼 비활성화 처리
		doCompareFrfEnable();
//TO-BE: <ExtRepeat.copyRowForm> 그리드-프리폼인 경우에는 selection바인딩으로 처리하기 때문에 불필요함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.copyRowForm("rptCmnTmpReg", "frfCmnTmpReg");
	};
	
	/**
	 * @desc 작업저장 click event
	 *            학생목록 리피트 변경내역 저장
	 * @return void
	 * @author xxxx 2015. 6. 5.
	 */	
	moPage.onClick_BtnSave = function() {
		doSave();
	};
	
	/**
	 * @desc  학생목록 리피트 상태에 따른  학생정보 프리폼 비활성화 제어
	 *			    1.index가 지정되지 않았을 경우
	 *			    2. 현재 index의 로우가 삭제 상태일 경우 
	 * @param  {?} pnIndex 
	 * @return void
	 * @author xxx 2015. 6. 23.
	 */
	function doCompareFrfEnable() {
		
		if( (!util.Grid.getIndex(app, "grdCmnTmpReg")) 
			|| util.Grid.getRowState(app, "grdCmnTmpReg") == cpr.data.tabledata.RowState.DELETED) {
				
			util.Control.setEnable(app, false, ["frfCmnTmpReg"]);	
			
		} else {
			util.Control.setEnable(app, true, ["frfCmnTmpReg"]);	
		}	
	}	
	
	/**
	 * @desc  학생목록 리피트 rowSelect event
	 *             현재 index로 학생정보 프리폼 copyRowFrom
	 * @return void
	 * @author xxx 2015. 6. 18.
	 */
	moPage.onRowSelect_RptCmnTmpReg = function() {
		// 학생목록 리피트 현재 index get
		var vnIndex = util.Grid.getIndex(app, "grdCmnTmpReg");
		//리피트 특정 row 데이터를 프리폼 copy
//TO-BE: <ExtRepeat.copyRowForm> 그리드-프리폼인 경우에는 selection바인딩으로 처리하기 때문에 불필요함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.copyRowForm("rptCmnTmpReg", "frfCmnTmpReg", vnIndex);
		// 학생정보 프리폼 비활성화 제어
		doCompareFrfEnable();
	};
	
	/**
	 * @desc  학생정보 프리폼 update event
	 *             학생정보 변경내역을 학생목록 리피트로 update 실행
	 * @return void
	 * @author xxx 2015. 6. 18.
	 */
	moPage.onUpdate_FrfCmnTmpReg = function() {
//TO-BE: <ExtFreeForm.updateToRpt> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtFreeForm.updateToRpt("rptCmnTmpReg","frfCmnTmpReg");
	};
	
	/**
	 * @desc 검색조건의 학사부서 valueChange event
	 *            객체검색 팝업 호출
	 * @param {Object} sender 이벤트 객체
	 * @return void
	 * @author xxxx 2015. 6. 5.
	 */	
	moPage.onValueChanged_IpbSaNm = function(sender) {
		doOnChangeStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc 검색조건의 학사부서 버튼 click event
	 *            객체검색 팝업 호출
	 * @param {Object} sender 이벤트 객체
	 * @return void
	 * @author xxxx 2015. 6. 5.
	 */	
	moPage.onClick_BtnSaNm = function(sender) {
		doOnClickStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc 검색조건의 학번 valueChange event
	 *            학생 검색 팝업 호출
	 * @param {Object} sender 이벤트 객체
	 * @return void
	 * @author xxxx 2015. 6. 5.
	 */	
	moPage.onValueChanged_IpbStudNo = function(sender) {
		doOnChangeStdCsrPStSearch(sender);
	};
	
	/**
	 * @desc 검색조건의 학번 버튼 click event
	 *            학생 검색 팝업 호출
	 * @param {Object} sender 이벤트 객체
	 * @return void
	 * @author xxxx 2015. 6. 5.
	 */
	moPage.onClick_BtnStudNo = function(sender) {
		doOnClickStdCsrPStSearch(sender);
	};
	
	/**
	 * @desc 학생정보 프리폼의 학번 valueChange event
	 *            학생 검색 팝업 호출
	 * @param {Object} sender 이벤트 객체
	 * @return void
	 * @author xxxx 2015. 6. 5.
	 */	
	moPage.onValueChanged_IpbFrfStudNo = function(sender) {
		doOnChangeStdCsrPStSearch(sender);
	};
	
	/**
	 * @desc 학생정보 프리폼의 학번 버튼 click event
	 *            학생 검색 팝업 호출
	 * @param {Object} sender 이벤트 객체
	 * @return void
	 * @author xxxx 2015. 6. 5.
	 */
	moPage.onClick_BtnFrfStudNo = function(sender) {
		doOnClickStdCsrPStSearch(sender);
	};
	
	/**
	 * @desc 학생정보 프리폼의 부서명 valueChange event
	 *            객체검색 팝업 호출
	 * @param {Object} sender 이벤트 객체
	 * @return void
	 * @author xxxx 2015. 6. 5.
	 */	
	moPage.onValueChanged_IpbFrfSaNm = function(sender) {
		doOnChangeStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc 학생정보 프리폼의 부서명 버튼 click event
	 *            객체검색 팝업 호출
	 * @param {Object} sender 이벤트 객체
	 * @return void
	 * @author xxxx 2015. 6. 5.
	 */	
	moPage.onClick_BtnFrfSaNm = function(sender) {
		doOnClickStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc 학생정보 프리폼의 파일첨부 click event
	 * @return void
	 * @author xxxx 2015. 6. 5.
	 */	
	moPage.onClick_BtnFileUpLoad = function(sender) {
		doOnClickStdCmnPFileUtil(sender);
	};
	
	/**
	 * @desc 학생목록 리피트 panel click event
	 *			 학생목록 리피트 row all check
	 * @return void
	 * @author xxxx 2015. 6. 5.
	 */		
	moPage.onValueChanged_RhCkbSelect = function() {
//TO-BE: <ExtRepeat.selectedAllPanel> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.selectedAllPanel("rhCkbSelect");
	};
	
	return moPage;
};

