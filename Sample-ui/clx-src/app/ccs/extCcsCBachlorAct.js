//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCcsCBachlorAct.xtm"/>

/**
 * 성적인정항목관리
 * @class stdCgdCRRMng
 * @author 박갑수 at 2016. 3. 24
 */
var extCcsCBachlorAct = function() { 
	var moPage = new Page();
	var moPObject = new Page();

	
	
	
	// 교직원 검색
	 moPObject.moIdsForStdCmnPPrsnSearch = [
		{
			 controlId					: "rdBtnProfProfNm",
			 istrStaffGrpAuth			: "",					
			 istrWkdtyAuth			: "",				
			 iKeyDate					: "",	
			 iStaffNo					: "rdIpbProfProfNm",			
			 iStaffGrpRcd				: "",		
			 iStaffGrpRcdLock		: "", 			
			 iStaffSubGrpRcd		: "",	
			 iStaffSubGrpRcdLock	: "",				
			 iStatusRcd				: "CF00501",				
			 iRepNm					: "",				
			 iObjDivRcd				: "",
			 iObjCd						: "",				
			 iObjNm					: "",	
			 istrObjCdInList			: "",
			 iWkgrdRcd				: "",	
			  
			 oObjNo					: "ipbProfObjNo",
			 oStaffNo					: "",					
			 oRepNm					: "rdIpbProfProfNm",					
			 oBirthday					: "",					
			 oStatNm					: "",				
			 oStatRcd					: "",					
			 oOgNm					: "",				
			 oOgCd						: "",				
			 oPosNm					: "",				
			 oPosCd					: "",				
			 oWkgrdNm				: "",			
			 oWkgrdRcd				: "",				
			 oStaffGrpRcd				: "",					
			 oStaffSubGrpRcd		: "",				
			 oHoRcd					: "",					
			 oSsn						: "",					
			 oWkdtyRcd				: "",					
			 oWkdtyNm				: "",				
			 func                         : function(poRtnValue){
				 
			 }
		}
		,{
			 controlId					: "IpbSchProfProfNmsNm",
			 istrStaffGrpAuth			: "",					
			 istrWkdtyAuth			: "",				
			 iKeyDate					: "",	
			 iStaffNo					: "IpbSchProfProfNmsNm",			
			 iStaffGrpRcd				: "",		
			 iStaffGrpRcdLock		: "", 			
			 iStaffSubGrpRcd		: "",	
			 iStaffSubGrpRcdLock	: "",				
			 iStatusRcd				: "CF00501",				
			 iRepNm					: "",				
			 iObjDivRcd				: "",
			 iObjCd						: "",				
			 iObjNm					: "",	
			 istrObjCdInList			: "",
			 iWkgrdRcd				: "",	
			  
			 oObjNo					: "/root/reqKey/strProfObjNo",
			 oStaffNo					: "",					
			 oRepNm					: "IpbSchProfProfNmsNm",					
			 oBirthday					: "",					
			 oStatNm					: "",				
			 oStatRcd					: "",					
			 oOgNm					: "",				
			 oOgCd						: "",				
			 oPosNm					: "",				
			 oPosCd					: "",				
			 oWkgrdNm				: "",			
			 oWkgrdRcd				: "",				
			 oStaffGrpRcd				: "",					
			 oStaffSubGrpRcd		: "",				
			 oHoRcd					: "",					
			 oSsn						: "",					
			 oWkdtyRcd				: "",					
			 oWkdtyNm				: "",				
			 func                         : function(poRtnValue){
				 
			 }
		}
	];
	
	
	
	
	/**
	 * @desc import 헤더 초기화
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 3. 24
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		// import 헤더 초기화
		doHeaderOnLoad();
	};
	
	
	
	
	/**
	 * @desc onLoad 실행
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 24
	 */
	moPage.onModelConstructDone_extCcsCBachlorAct = function() {
		
		
		// 리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["rptMain", "frfDetail"]);
		// 검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grpData", "grpDataDtl"]);
		
		
		// 서브미션 호출
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				
				var vsSchYearRcd 	= util.DataMap.getValue(app, "dmKeyDateMap", "YEAR");
				var vsSmtRcd 		= util.DataMap.getValue(app, "dmKeyDateMap", "SMT");
				
				util.DataMap.setValue(app, "dmReqKey", "strSchYearRcdSt", vsSchYearRcd);
				util.DataMap.setValue(app, "dmReqKey", "strSmtRcdSt", vsSmtRcd);
				
				
				util.Control.redraw(app, ["cbbDataDivRcd", "cbbSchYearRcd", "cbbSmtRcd", "cbbSchYearRcdEnd", "cbbSmtRcdEnd"]);
				util.SelectCtl.selectItem(app, "cbbDataDivRcd", 0);
				util.Control.setFocus(app, "cbbDataDivRcd");
			}
		}, true);
	};
	
	
	
	
	/**
	 * @desc 책갈피 onKeyDown 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 24
	 */
	moPage.onKeyDown_IpbRrCd = function(strKeyType, strKeyStatus) {
		// 엔터키 입력시 조회
		if(e.keyCode == cpr.events.KeyCode.ENTER){
			var vsKeyDate = util.Control.getValue(app, "ipbTitleCont");
			if(!ValueUtil.isNull(vsKeyDate)){
				util.Header.clickSearch(app);
			}
		}
	};
	
	/**
	 * @desc 내용 onKeyDown 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 24
	 */
	moPage.onKeyDown_IpbRrNm = function(strKeyType, strKeyStatus) {
		// 엔터키 입력시 조회
		if(e.keyCode == cpr.events.KeyCode.ENTER){
			var vsKeyDate = util.Control.getValue(app, "ipbMainCont");
			if(!ValueUtil.isNull(vsKeyDate)){
				util.Header.clickSearch(app);
			}
		}
	};
	
	
	
	
	/**
	 * @desc [btnSearch]조회 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 24
	 */
	moPage.onClick_BtnSearch = function() {
		
		
		 // 작업영역 리피트 변경 내역 체크
		if(util.Grid.isModified(app, "", "CRM")){
			return false;
		}
		
		
		// 조회조건 필수 체크
		if(!util.validate(app, ["cbbDataDivRcd", "cbbSchYearRcd", "cbbSmtRcd"])){
			return false;
		}

		// 조회
		doList(function(pbSuccess) {
			if (pbSuccess){
				// 조회 : "조회되었습니다." header 메세지 표시
				util.Msg.notify(app, "NLS.INF.M024");
				if(util.Grid.getRowCount(app, "grdMain") > 0){
					//--상세내용조회
					doListDtl();
				}else{
					util.Control.reset(app, "frfDetail");
				}
			}
		});
	};
	
	
	
	/**
	 * @desc 성적인정항목목록 조회
	 * @param poCallBackFunc 콜백정의
	 * @return void
	 * @author 박갑수 at 2016. 3. 24
	 */
	function doList(poCallBackFunc) {
	
	
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdMain");
				
				
					if(util.Grid.getRowCount(app, "grdMain") == 0){
						// 마스터 리피트 상태에 따른 디테일 프리폼 비활성화 제어
						doCompareFrfEnable();
					}
					
			}
				// 조회 후 콜백함수 수행
			if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
		});
	};
	
	
	
	/**
	 * @desc [rptCgdRr]성적인정항목목록 onRowSelect 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 24
	 */
	moPage.onRowSelect_RptCgdRr = function() {
		
		
		
		var voSelectRowIdx = util.Grid.getIndex(app, "grdMain");
		util.DataMap.setValue(app, "dmReqSelRow", "strSerialNo"			, util.Grid.getCellValue(app, "grdMain", "SERIAL_NO"  	,voSelectRowIdx));						// 성적인정항목코드
				
		// 마스터 리피트 상태에 따른 디테일 프리폼 비활성화 제어
		doCompareFrfEnable();
		
		//--상세내용조회
		doListDtl();
	};
	
	/**
	 * @desc  마스터 리피트 상태에 따른 디테일 프리폼 비활성화 제어
	 *			    1. index가 지정되지 않았을 경우
	 *			    2. 현재 index의 로우가 삭제 상태일 경우 
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 24
	 */
	function doCompareFrfEnable() {
		
		
		// 마스터 로우 없을경우 프리폼 리셋
		if(!util.Grid.getIndex(app, "grdMain")){
			util.Control.reset(app, "frfDetail");
		}
		
		if( (!util.Grid.getIndex(app, "grdMain")) 
			|| util.Grid.getRowState(app, "grdMain") == cpr.data.tabledata.RowState.DELETED) {
				
			util.Control.setEnable(app, false, ["frfDetail"]);
			
		} else {
			util.Control.setEnable(app, true, ["frfDetail"]);	
		
		}
	};
	
	
	
	/**
	 * @desc 성적인정항목(프리폼) 조회
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 24
	 */
	function doListDtl() {
		
		// 성적인정항목 포커싱된 인덱스
		var vnIndex = util.Grid.getIndex(app, "grdMain");
		
		// 리피트 특정 row 데이터를 프리폼 copy
//TO-BE: <ExtRepeat.copyRowForm> 그리드-프리폼인 경우에는 selection바인딩으로 처리하기 때문에 불필요함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.copyRowForm("rptMain","frfDetail", vnIndex);
	};
	
	
	
	/**
	 * @desc [btnNew]신규 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 24
	 */
	
	moPage.onClick_BtnNew = function() {

		
		// 신규로우 추가
		var vnIdx = util.Grid.insertRow(app, "grdMain");
		
		// 신규 Defalut값 설정 

		// 시작일자 : 조회조건 기준일자
		var vsSchYearRcd	= util.DataMap.getValue(app, "dmKeyDateMap", "YEAR");
		var vsSmtRcd 		= util.DataMap.getValue(app, "dmKeyDateMap", "SMT");
		var vsDataDivRcd	= util.DataMap.getValue(app, "dmReqKey", "strDataDivRcd");
		
		
		util.FreeForm.setValue(app, "frfDetail", "SCH_YEAR_RCD"	, vsSchYearRcd);
		util.FreeForm.setValue(app, "frfDetail", "SMT_RCD"				, vsSmtRcd);
		util.FreeForm.setValue(app, "frfDetail", "DATA_DIV_RCD"		, vsDataDivRcd);
		
				
		// 프리폼 항목 포커스
		util.Control.setFocus(app,  "rdIpbProfProfNm");
	};
	
	
	/**
	 * @desc [btnDel]삭제 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 24
	 */
	
	moPage.onClick_BtnDel = function() {
		
		// 삭제
		util.Grid.deleteRow(app, "grdMain");
		// 마스터 리피트 상태에 따른 디테일 프리폼 비활성화 제어
		doCompareFrfEnable();
		
	};
	
	
	/**
	 * @desc [btnRestore]작업취소 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 24
	 */
	
	moPage.onClick_BtnRestore = function() {
		// 작업취소
		util.Grid.restoreRow(app, "grdMain");
		// 마스터 리피트 상태에 따른 디테일 프리폼 비활성화 제어
		doCompareFrfEnable();
		// 취소내용 프리폼 반영
//TO-BE: <ExtRepeat.copyRowForm> 그리드-프리폼인 경우에는 selection바인딩으로 처리하기 때문에 불필요함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.copyRowForm("rptMain", "frfDetail");
	};
	
	
	/**
	 * @desc [btnSave]작업저장 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 24
	 */
	
	moPage.onClick_BtnSave = function() {
		// 작업저장
		doSave();
	};
	
	
	/**
	 * @desc 성적인정항목목록 변경사항 저장
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 24
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
				
				var vsPkValues = util.DataMap.getValue(app, "dmResSave", "strPkValues");
				
				if(!ValueUtil.isNull(vsPkValues)){					
					ExtRepeat.setPkValues("rptMain", vsPkValues);				
				}
						
						
				//조회건수가 0건이면 프리폼이 내역이 반영되지 않기 떄문
				util.Control.reset(app, "frfDetail");
				
				doList(function(pbListSuccess) {
					// 조회 : "갱신된 데이터가 조회되었습니다." header 메세지 표시
					if (pbListSuccess){
						util.Msg.notify(app, "NLS.INF.M025");
						
					}
					

						
				});
			}else {
				// "저장중 오류가 발생하였습니다." 메시지 표시
				util.Msg.notify(app, "NLS.WRN.M119");				
			}
		});
	};
	
	
	
	/*
		교직원검색 팝업 valueChang
	*/	
	moPage.onValueChanged_RdIpbProfProfNm = function(sender){
		
		doOnChangeStdCmnPPrsnSearch(sender);
	}
	
	
	/*
		교직원 팝업 클릭
	*/
	moPage.onClick_RdBtnProfProfNm = function(sender){
		doOnClickStdCmnPPrsnSearch(sender);
	}
	
	
	/*
		프리폼에서 update[변경]시 그리드로 복사를 한다.
	*/
	moPage.onUpdate_FrfDetail = function(){
//TO-BE: <ExtFreeForm.updateToRpt> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtFreeForm.updateToRpt("rptMain","frfDetail");
	}
	
	
	
	
	
	moPage.onClick_RdBtnProfProfNm1 = function(sender){
		doOnClickStdCmnPPrsnSearch(sender);
	}
	
	moPage.onValueChanged_RdIpbProfProfNm1 = function(sender){
		
		doOnChangeStdCmnPPrsnSearch(sender);
	}
	return moPage;
};
