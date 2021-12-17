//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./stdCssPFndPop.xtm"/>


var stdCssPFndPop = function() {
	var moPage = new Page();
	//임포트용 데이터 통신 오브젝트
	var moPObject = new PObject();
	
	/*
	 * 부모 페이지에서 받아온 기본값을 받는 객체
	 * 내부적으로 Result라는 객체를 가지고 있으며, 부모에 넘겨줄 결과값을 저장
	 * @member stdCssPFndPop
	 * @author AeyoungLee 2016. 2. 23.
	 */
	moPObject.moStdCssPFndSearch = {
		// 팝업 작동 내부사용
		controlId : "",
		openedByChange : false,
		strScalFndtnCd : "",				
		strScalFndtnNm : "",			
		strKeyDate : "",			
		// 선택열 결과 리턴
		Result : {
			strScalFndtnCd : "",	//재단코드
			strScalFndtnNm : "",	//재단명
			strStDt : "",			//시작일자
			strEndDt : "",			//종료일자
			strRepNm : "",			//대표명
			strChagDeptNm : "",		//담당부서명
			strInturNm : "",		//설립자명
			strAddr1 : "",			//주소1
			strAddr2 : "",			//주소2
			strDrtTelNo : ""		//전화번호
		}
	};
	
	/**
	 * doOnLoadSetting  화면 오픈 시 수행되는 함수
	 * @member stdCssPScalFeePop
	 * @type void
	 * @author AeyoungLee 2016. 2. 29.
	 */
	moPage.onModelConstructDone_StdCssPFndPop = function(){
		//리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init("rptFndtnSch");
		//검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", "grp_rptFndtnSch");
		//호출한 페이지에서 파라미터 받기.
		doParentGet();
		//화면 온로드 서브미션 호출
		doOnLoad();
	}
	
	/**
	 * doSearch 조회 서브미션
	 * @member stdCssPScalFeePop
	 * @type void
	 * @author AeyoungLee 2016. 2. 29.
	 */	
	function doParentGet(){
		if(ExtPopUp.isPopUp()) {
			// 호출한 페이지에서 파라미터 받기.													
			var voStdCssPFndSearch =  ExtPopUp.getParentVal("moStdCssPFndtnPop");
					
			// 파라미터  값복사 (deep copy)
			for (var key in voStdCssPFndSearch) {
				if (key == "Result") {
					// 결과 값은 복사하지 않음.
					continue;
				}
				moStdCssPFndSearch [key] = voStdCssPFndSearch [key];
			}
			// 팝업이 뜬후에는 false로 고침.
			voStdCssPFndSearch.openedByChange = false;
		}
	}
	
	/**
	 * doSearch 조회 서브미션
	 * @member stdCssPScalFeePop
	 * @type void
	 * @author AeyoungLee 2016. 2. 29.
	 */	
	function doOnLoad(){
		// 파라미터 받아서 초기 검색조건 세팅.
		var voParam = moStdCssPFndSearch;
		
		if (voParam.strScalFndtnCd) {
			util.Control.setValue(app, "ipbScalFndtnCd", voParam.strScalFndtnCd);
		}
		
		if (voParam.strScalFndtnNm) {
			util.Control.setValue(app, "ipbScalFndtnNm", voParam.strScalFndtnNm);
		}
		
		if (voParam.strKeyDate) {
			util.DataMap.setValue(app, "dmReqKey", "strKeyDate", voParam.strKeyDate);
		}
		
		// 바로 검색 실행
		if ((voParam.strScalFndtnCd || voParam.strScalFndtnNm)) {
			util.Header.clickSearch(app);
		}
	};
		
		
	 /**
	 * doList 조회 
	 * @member stdCssPScalFeePop
	 * @type void
	 * @author AeyoungLee 2016. 2. 29.
	 */
	function doList() {
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "rptFndtnSch");
				util.Msg.notify(app, "NLS.INF.M024");
			}
			
		});
	};
	
	/**
	 * doCloseOk (선택닫기 이벤트시 호출) 	
	 * @member stdCssPScalFeePop
	 * @type void
	 * @author AeyoungLee 2016. 2. 29.
	 */
	function doCloseOk() {
		var voResult = moStdCssPFndSearch.Result;
						
		if(ValueUtil.isNull(util.Grid.getCheckOrSelectedRowIndex(app, "grdFndtnSch"))){
			//선택된 데이터가 없습니다.
			ComMsg.warn("M008");
			return false;
		}
		
		var vnIdx = util.Grid.getIndex(app, "grdFndtnSch");
		
		//선택된 데이터 변수 선언
		var vsScalFndtnCd = util.Grid.getCellValue(app, "grdFndtnSch", "SCAL_FNDTN_CD", vnIdx);
		var vsScalFndtnNm = util.Grid.getCellValue(app, "grdFndtnSch", "SCAL_FNDTN_NM", vnIdx);
		var vsStDt		  = util.Grid.getCellValue(app, "grdFndtnSch", "ST_DT"		 , vnIdx);
		var vsEndDt		  = util.Grid.getCellValue(app, "grdFndtnSch", "END_DT"	     , vnIdx);
		var vsRepNm		  = util.Grid.getCellValue(app, "grdFndtnSch", "REP_NM"	     , vnIdx);
		var vsChagDeptNm  = util.Grid.getCellValue(app, "grdFndtnSch", "CHAG_DEPT_NM" , vnIdx);
		var vsChargerNm	  = util.Grid.getCellValue(app, "grdFndtnSch", "CHARGER_NM"   , vnIdx);
		var vsInturNm	  = util.Grid.getCellValue(app, "grdFndtnSch", "INTUR_NM"     , vnIdx);
		var vsAddr1		  = util.Grid.getCellValue(app, "grdFndtnSch", "ADDR1"		 , vnIdx);
		var vsAddr2		  = util.Grid.getCellValue(app, "grdFndtnSch", "ADDR2"		 , vnIdx);
		var vsDrtTelNo	  = util.Grid.getCellValue(app, "grdFndtnSch", "DRT_TEL_NO"   , vnIdx);
		
		var voResult = moStdCssPFndSearch.Result;
		
		voResult.strScalFndtnCd	= vsScalFndtnCd;
		voResult.strScalFndtnNm	= vsScalFndtnNm;
		voResult.strStDt		= vsStDt;
		voResult.strEndDt		= vsEndDt;
		voResult.strRepNm		= vsRepNm;
		voResult.strChagDeptNm	= vsChagDeptNm;
		voResult.strInturNm		= vsInturNm;
		voResult.strAddr1		= vsAddr1;
		voResult.strAddr2		= vsAddr2;
		voResult.strDrtTelNo	= vsDrtTelNo;
		
		if(ExtPopUp.isPopUp()){
			ExtPopUp.closeLayeredPopup("callbackStdCssPFndtnPop", moStdCssPFndSearch);
		}				
	};

	return moPage;
};
