//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCcsCDutyTime.xtm"/>

/**
 * 건물관리
 * @class stdCcsCBuild
 * @author 박갑수 at 2016. 1. 18
 */
var extCcsCDutyTime = function() {
	var moPage = new Page();
	// 임포트용 데이터 통신 오브젝트
	var moPObject = new Page();
	
	
	moPObject.moIdsForExtCcsPDutyTimeSrh = [
			{
				  controlId      : "btnWkDtyBtn" // 이벤트가 발생한 콘트롤 ID
				, iCdCls         : "" // 코드분류 (ex. CF401)
				, iCdPrp1InCond  : "" // 코드용도1 IN 조건절 (ex. 'CF00301','CF00310')
				, iKeyDate       : "" // 기준일 ("" 입력시 현재일자 세팅)
				, iWkdtyNm       : "rdIpbWkdtyNm" // 직책명 
				, oCd            : "rdIpbWkdtyCd" // 코드
				, oLanDivRcd     : "" // 언어구분코드[CS003]
				, oCdCls         : "" // 코드분류
				, oOgCd          : "" // 부서코드
				, oUcd           : "" // 상위코드
				, oUlanDivRcd    : "" // 상위언어구분코드[CS003]
				, oCdNm          : "rdIpbWkdtyNm" // 코드명
				, oCdShortNm     : "" // 코드약칭
				, oCdLen         : "" // 코드길이
				, oPrtOrd        : "" // 출력순서
				, oEfftStDt      : "" // 유효시작일자
				, oEfftEndDt     : "" // 유효종료일자
				, oCdDesc        : "" // 코드내역
				, oUnitSystemRcd : "" // 단위시스템코드[CB001]
				, oCdPrp1        : "" // 코드용도1
				, oCdPrp2        : "" // 코드용도2
				, oCdPrp3        : "" // 코드용도3
				, oCdPrp4        : "" // 코드용도4
				, oCdPrp5        : "" // 코드용도5
				, oCdPrp6        : "" // 코드용도6
				, oCdPrp7        : "" // 코드용도7
				, oCdPrp8        : "" // 코드용도8
				, oCdPrp9        : "" // 코드용도9
				, oCdPrp10       : "" // 코드용도10
				, oStdYn         : "" // 표준여부
				, func : function() {
				}
			}
			];
			
			
			
	/**
	 * @desc import 헤더 초기화
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 1. 18
	 */
	 moPage.onLoadImportDone_ImpTitle = function() {
		// import 헤더 초기화
		doHeaderOnLoad();
	};
	
	/**
	 * @desc onLoad 실행
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 1. 18
	 */
	moPage.onModelConstructDone_StdCcsCBuild = function() {
		
		// 리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["rptMain"]);
		// 검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grpData"]);
		
				// 서브미션 호출
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				
				util.Control.setFocus(app, "ipbWkdtyNm");
			}
		}, true);

		
		
	};
	
	/**
	 * @desc [IpbBdNm]건물명 onKeyDown 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 1. 18
	 */
	moPage.onKeyDown_IpbBdNm = function(strKeyType, strKeyStatus) {
		// 엔터키 입력시 조회
		if(e.keyCode == cpr.events.KeyCode.ENTER){
			util.Header.clickSearch(app);
		}
	};
	
	/**
	 * @desc [btnSearch]조회 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 1. 18
	 */
	moPage.onClick_BtnSearch = function() {
		 // 작업영역 리피트 변경 내역 체크
		if(util.Grid.isModified(app, "", "CRM")){
			return false;
		}

		// 조회
		doList(function(pbSuccess) {
			// 조회 : "조회되었습니다." header 메세지 표시
			if (pbSuccess) util.Msg.notify(app, "NLS.INF.M024");
		});
	};
	
	/**
	 * @desc 건물목록 조회
	 * @param poCallBackFunc 콜백정의
	 * @return void
	 * @author 박갑수 at 2016. 1. 18
	 */
	function doList(poCallBackFunc) {
		
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdMain");	
				// 조회 후 콜백함수 수행
				if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess); 
			}
		});
	};
	
	/**
	 * @desc [rhCkbSelect]패널 onValueChanged 이벤트
	 * @param poCallBackFunc 콜백정의
	 * @return void
	 * @author 박갑수 at 2016. 1. 18
	 */
	moPage.onValueChanged_RhCkbSelect = function() {
		// 리피트 패널 설정
//TO-BE: <ExtRepeat.selectedAllPanel> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.selectedAllPanel("rhCkbSelect");
	};
	
	/**
	 * @desc [btnNew]조회 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 1. 18
	 */
	moPage.onClick_BtnNew = function() {
		// 해당 리피트 insert 후 편집 시작할 컬럼 지정
		util.Grid.insertRow(app, "grdMain", "rdIpbWkdtyNm");
//TO-BE: <ExtControl.refreshBind> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtControl.refreshBind(["binNewReadOnly"]);
	};
	
	/**
	 * @desc [btnDel]삭제 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 1. 18
	 */
	moPage.onClick_BtnDel = function() {
		// 해당 리피트 delete
		util.Grid.deleteRow(app, "grdMain");
	};
	
	/**
	 * @desc [btnRestore]작업취소 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 1. 18
	 */
	moPage.onClick_BtnRestore = function() {
		// 해당 리피트 상태 초기화
		util.Grid.restoreRow(app, "grdMain");
	};
	
	/**
	 * @desc [btnSave]작업저장 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 1. 18
	 */
	moPage.onClick_BtnSave = function() {
		// 작업저장
		doSave();
	};
	
	/**
	 * @desc 건물목록 변경사항 저장
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 1. 18
	 */
	function doSave() {
		
		// 리피트 변경사항 체크
		if(!util.Grid.isModified(app, ["grdMain"], "MSG")){
			return false;
		}
		
		// 리피트 Validation Check
		if(!util.validate(app, "grdMain")) return false;

		//strCommand: save 
		util.Submit.send(app, "subSave", function(pbSuccess){
			if(pbSuccess){
				doList(function(pbListSuccess) {
					// 조회 : "갱신된 데이터가 조회되었습니다." header 메세지 표시
					if (pbListSuccess) util.Msg.notify(app, "NLS.INF.M025");
				});
			}
		});
	};
	
	
	/*
		직급/직책 검색팝업
	*/
	moPage.onValueChanged_RdIpbBdCd = function(sender) {
		doOnChangeExtCcsPDutyTimeSrh(sender);
	};
	
	/*
		직급/직책 검색팝업(btn)
	*/
	moPage.onClick_BtnSaCd = function(sender) {
		// 객체검색팝업 호출
		doOnClickExtCcsPDutyTimeSrh(sender);
	}
	
	
	
	
	moPage.onRowSelect_RptMain = function() {
//TO-BE: <ExtControl.refreshBind> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtControl.refreshBind(["binNewReadOnly"]);
	};
	return moPage;
};
