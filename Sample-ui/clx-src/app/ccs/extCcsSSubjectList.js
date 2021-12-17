//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCcsSSubjectList.xtm"/>

/**
 * 과목코드 조회(영문)
 * @class extCcsSSubjectList
 * @author 박갑수 at 2016. 7. 1
 */
var extCcsSSubjectList = function() {
	var moPage = new Page();
	
	// 임포트용 데이터 통신 오브젝트
	var moPObject = new Page();
	
	// 객체검색팝업 호출
	moPObject.moIdsForStdCmnPObjSch = [
	{
		controlId			:	"btnSaCdNm",
		iCd					:	"",
		iNm					:	"ipbSaCdNm",
		iObjDivRcd			:	["CC009SA"],
		iStartObject    	:   "",
		iOtDivRcd			:	"",
		iOtIsTreeView	:	"",
		iLanDivRcd		:	"",
		iKeyDate			:	"/root/keyDateMap/ST_DT",
		iKeyEndDate		:	"",
		oObjDivRcd		:	"",
		oCd					:	"/root/reqKey/strSaCd",
		oCdNm				:	"ipbSaCdNm",
		oBegDt				:	"",
		oEndDt				:	"",
		oLanDivRcd		:	"",
		func 					:  function(){
		}
	}];
	
	// 파일첨부 Util
	moPObject.moIdsForStdCmnFileUtil = [
	{
		controlId 				: "btnSaveFileUp",
		iFileSerialNo 			: "btnSaveFileUp",
		iFileSubPath 			: "",
		iTableName 			: "",
		iIsDirectUpLoad		: null,
		iIsFileSelectorOnly	: true,
		iIsMultiple				: false,
		iIsHideDelete 			: null,			
		iIsDownloadOnly 	: null,
		iFileExtFilter 			: null,
		oFileSerailNo			: "",
		oTmpFilePath		: "/root/reqKey/strTmpFilePath",			//리피트일경우 null로 지정
		oFileCnt				: "",		
		oFileDataChanged	: "",
		func						: function(poReturn) {
			
			var vsMsg = ExtControl.getTextValue("btnSaveFileUp");
			
			// @을(를) 처리하시겠습니까?
			if(!util.Msg.confirm("NLS-CRM-M018", [vsMsg]) ){
				util.DataMap.setValue(app, "dmReqKey", "strProcYn", "");
				doExcelDataSave(poReturn.TMP_FILE_PATH);
			}else {
				util.DataMap.setValue(app, "dmReqKey", "strProcYn", "Y");
				doExcelDataSave(poReturn.TMP_FILE_PATH);
			}
		}
	}];
	
	/**
	 * @desc import 헤더 초기화
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016.7. 1
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		doHeaderOnLoad();
	};
	
	/**
	 * @desc onLoad 실행
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016.7. 1
	 */
	moPage.onModelConstructDone_ExtCcsSSubjectList = function() {
		// 검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grpData"]);
		// 기준일자 조회하는 내부 팝업 호출을 위한 단위시스템코드 설정
		setUnitSystem("CCS");
		
		// 전체권한[CC00102]일경우만 엑셀파일업로드버튼 활성화
		if(moPageInfo.authRngRcd == "CC00102"){
			util.Control.setVisible(app, true, ["btnSaveFileUp"]);
		}else {
			util.Control.setVisible(app, false, ["btnSaveFileUp"]);
		}
		
		// 서브미션 실행 (실패시 cover page)
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				
				// 조회조건 컨트롤 refresh
				util.Control.redraw(app, ["dipKeyDate", "cbbCmpDivRcd"]);
				// 정렬순서 Default : 과목코드순
				util.SelectCtl.selectItem(app, "cbbOrderBy", 0);
				
				setStdCmnPObjSchObjInfo();
			}
		}, true);
	};
	
	/**
	 * @desc [btnSaCdNm]학사부서명(돋보기버튼) onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 7. 1
	 */
	moPage.onClick_BtnSaCdNm = function(sender) {
		// 객체검색팝업 호출
		doOnClickStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc [ipbSaCdNm]학사부서명 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 7. 1
	 */
	moPage.onValueChanged_IpbSaCdNm = function(sender) {
		// 값변경시 객체검색팝업 호출
		doOnChangeStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc [btnSearch]조회 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 7. 1
	 */
	moPage.onClick_BtnSearch = function() {
		
		// 조회조건 필수 체크
		if(!util.validate(app, ["dipKeyDate", "ipbSaCdNm", "cbbOrderBy"])){
			return false;
		}
				
		var voParam = {
				p_strLanDivRcd 		: util.DataMap.getValue(app, "dmResOnLoad", "strLanDivRcd"),	// 언어키
				p_strKeyDate 		: util.DataMap.getValue(app, "dmKeyDateMap", "END_DT"),		// 기준일자
				p_strSaCd				: util.DataMap.getValue(app, "dmReqKey", "strSaCd"),				// 학사부서코드
				p_strExpYn			: util.Control.getValue(app, "ckbExpYn"),									// 폐기과목포함
				p_strNoRegEng		: util.Control.getValue(app, "ckbNoRegEng"),								// 영문명미등록
				
				p_strOrderBy			: util.Control.getValue(app, "cbbOrderBy"),								// 정렬순서
				
				p_strSbCd				: util.Control.getValue(app, "ipbSbCd"),										// 과목코드
				p_strSbNm			: util.Control.getValue(app, "ipbSbNm"),									// 과목명
				p_strCmpDivRcd		: util.Control.getValue(app, "cbbCmpDivRcd"),							// 이수구분
				p_strSbNmEng       : util.Control.getValue(app, "ipbSbNmEng"),										// 과목코드
	
				p_strCheckAuthId 	: moUserInfo.id																// 사용자ID
		};

		var vsTitle = "교과목 LIST";
		
		var voOzFormParam = {
			  TITLE 		 : vsTitle			// 리포트타이틀
			, SUB_TITLE 	 : "" 					// 리포트서브타이틀		
			, FORM_TYPE : "flash"
		};
		
		util.Report.open(app, "hojReport", "extCcsSSubjectList", voOzFormParam, voParam);
	};
	
	/**
	 * @desc [btnYearSmt]기준일자(돋보기버튼) onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 7. 12
	 */
	moPage.onClick_BtnYearSmt = function() {
		//기준일자 임포트(달력컨트롤ID,임포트ID)
		doOnclickSchYearSmt("dipKeyDate","impSchYearSmt");
	};
	
	/**
	 * @desc [btnSaveFileUp]엑셀파일업로드(영문명생성) onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 9. 27
	 */
	moPage.onClick_BtnSaveFileUp = function(sender) {
		// 파일선택창 호출
		doOnClickStdCmnPFileUtil(sender);
	};
	
	/**
	 * @desc 엑셀 업로드전 확장자 체크
	 * @param 
	 * @return 
	 * @author 박갑수 at 2016. 9. 27
	 */
	function doExcelUploadProc() {
		
		FileUtil.getFileName(true, ["xls", "xlsx"], function(psFileNm){
			doExcelDataSave(psFileNm);
		},"",false);
	};
	
	/**
	 * @desc 엑셀업로드 서브미션 전송 함수
	 * @param
	 * @return 
	 * @author 박갑수 at 2016. 9. 27
	 */
	function doExcelDataSave() {
		
		//strCommand: save 
		util.Submit.send(app, "subSave", function(pbSuccess){
			if(pbSuccess){
				
				var vsProcYn = util.DataMap.getValue(app, "dmReqKey", "strProcYn");
				if(!ValueUtil.isNull(vsProcYn)){
					var vsTotCnt = util.DataMap.getValue(app, "dmResUpload", "iTotCnt");
					var vsFailCnt = util.DataMap.getValue(app, "dmResUpload", "iFailCnt");
					var vsSucessCnt = util.DataMap.getValue(app, "dmResUpload", "iSuccessCnt");
					var vsErrMsg = util.DataMap.getValue(app, "dmResUpload", "strErrMsg");
					
					var vsFullMsg = "대상 : " + vsTotCnt + "\n성공 : " + vsSucessCnt + "\n실패 : " + vsFailCnt;
					
					if(!ValueUtil.isNull(vsErrMsg)){
						vsFullMsg = vsFullMsg + "\n" + vsErrMsg;
					}
					
					util.Msg.alert("vsFullMsg");
				}
			}
		});
	};
	
	return moPage;
};
