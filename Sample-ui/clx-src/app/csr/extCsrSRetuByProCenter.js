//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
///<xtmlink path="./extCsrSRetuByProCenter.xtm"/>

var extCsrSRetuByProCenter = function() {

	var moPage = new Page();
	//임포트용 데이터 통신 오브젝트
	var moPObject = new PObject();

	/**
	 * @desc  Header Import onLoad
	 * @return void
     * @author Sunyoung,PARK at 2016.12.21
     */
	moPage.onLoadImportDone_ImpTitle = function() {
		doHeaderOnLoad();
	};


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
	 * @desc
	 *
	 * @return void
	 * @author Sunyoung,PARK 2016.12.21
	 */
	moPage.onClick_BtnSearch = function() {
		 //작업영역 리피트 변경 내역 체크
		if(util.Grid.isModified(app, "", "CRM")){
			return false;
		}
		var vsExcelYn = util.Control.getValue(app, "cbbPrtDiv");
		
		if (vsExcelYn =="Y") {
			util.coverPage(app);
			doExcelList(function(pbsuccess){
				// 조회 : "조회되었습니다." header 메세지 표시
				if (pbSuccess) util.Msg.notify(app, "NLS.INF.M024");
			});
			util.removeCover(app);
		}else {
			doList(function(pbSuccess) {
				// 조회 : "조회되었습니다." header 메세지 표시
				if (pbSuccess) util.Msg.notify(app, "NLS.INF.M024");
			});
		}
	};

	/**
	 * @desc 복학자 현황 
	 * @param 
	 * @return 
	 * @author Sunyoung,PARK  2017.01.09
	 */
	function doList(poCallBackFunc) {

		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdExtCsrList");
				// 조회 후 콜백함수 수행
				if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
			}
		});
	}
	
	
	/**
	 * @desc  복학자현황- 명단 (엑셀다운로드 )
	 * @param 
	 * @return 
	 * @author Sunyoung,PARK  2017.1.9
	 */
	function doExcelList(poCallBackFunc) {
		
		//1.조회조건 필수 체크(학년도)
		if(!util.validate(app, ["grpSearch"])) return false;
				
			//strCommand: exportExcel 
			util.Submit.send(app, "subExportExcel", function(pbSuccess){
			if(pbSuccess){
				
					//파일디렉토리경로
					var vsFileDir = util.DataMap.getValue(app, "dmFileInfo", "strFileDir");
					//파일명
					var vsOriFileNm = util.DataMap.getValue(app, "dmFileInfo", "strFileNm");
					//변환파일명(실제 서버에 저장된 파일명)
					var vsFileChgNm = util.DataMap.getValue(app, "dmFileInfo", "strFileChgNm");
					var vsTmpFilePath	= util.DataMap.getValue(app, "dmFileInfo", "strTmpFilePath");
					var voParam = {
								"strFileSubPath" : "",
								"strFileNm" : "",
								"strOriFileNm" : vsOriFileNm,
								"strTmpFilePath" : vsTmpFilePath,
								"strCommand" : "fileDownLoad"
					}
					
					//다운로드 받을 파일 위치, 다운로드받을 파일이름, 프로그래스동작여부(일단 ""), actionUrl
					FileUtil.downloadFile( "/std.cmn.StdCmnFileTransUtil.ex",voParam);		
				}
				
			});
		

	}

	
	moPage.onClick_BtnPopSearch = function(sender) {
		// 기준일자 체크
		var vsKeyDate = util.Control.getValue(app, "dipKeyDate");
		var vsTitle = ExtControl.getTextValue("lblKeyDate");
		if (ValueUtil.isNull(vsKeyDate)) {
			util.Control.setValue(app, "ipbDeptNm", "");
			util.Control.setValue(app, "ipbDeptCd", "");
			//기준일자를 입력하여 주십시오.
			util.Msg.alert("NLS-CSR-M121",[vsTitle]);
			return;
		}
		doOnClickStdCmnPObjSch(sender);
	}
	
	moPage.onValueChanged_IpbDeptNm = function(sender) {
		// 기준일자 체크
		var vsKeyDate = util.Control.getValue(app, "dipKeyDate");
		var vsTitle = ExtControl.getTextValue("lblKeyDate");
		if (ValueUtil.isNull(vsKeyDate)) {
			util.Control.setValue(app, "ipbDeptNm", "");
			util.Control.setValue(app, "ipbDeptCd", "");
			//기준일자를 입력하여 주십시오.
			util.Msg.alert("NLS-CSR-M121",[vsTitle]);
			return;
		}
		
		doOnChangeStdCmnPObjSch(sender);
	}
	
	
	
	/**
	 * @desc 소속 권한 처리
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 5. 10
	 */	
	moPage.onLoadImportDone_ImpStdCmnPobjSch = function() {
		setStdCmnPObjSchObjInfo();
	}
	
	
	
	
		
	/**
	 * @desc 
	 * @param 
	 * @return void
	 * @author Sunyoung Park, 2017.1.9
	 */	
	moPage.onModelConstructDone_ExtCsrSRemoByProCenter = function() {
	//리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init("rptExtCsrList");
		//검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", "grpData");
		//서브미션 실행 (실패시 cover page)
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				
				util.DataMap.setValue(app, "dmReqList", "strSchYearRcd", util.DataMap.getValue(app, "dmResOnLoad", "strSchYearRcd"));
				util.DataMap.setValue(app, "dmReqList", "strKeyDate", util.DataMap.getValue(app, "dmResOnLoad", "strCutDt"));
				util.Control.redraw(app, ["dipKeyDate", "cbbSchYearRcd", "cbbClassRcd", "cbbAltRsnRcd","cbbInvitPrdRcd","cbbEntrSeltRcd","cbbDayNightRcd","cbbPrtDiv","cbbGenderRcd"]);
			}
		});
		
	};
	return moPage;
};

