
//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./stdCcsCClaTime.xtm"/>



/**
 * 교시관리
 * @class stdCcsCClaTime
 * @author 최영경 at 2016. 1. 19
 */
var stdCcsCClaTime = function() {
		
	
	var moPage = new Page();
	var moPObject = new PObject();
	
			
	
	moPObject.moIdsForStdCmnPObjSch = [
			
			{
				controlId		:	"rdBtnObjNm",
				iCd				:	"",
				iNm				:	"ipbObjNm",
				iObjDivRcd		:	["CC009OG"],
				iStartObject    :   "",
				iOtDivRcd		:	"",
				iOtIsTreeView	:	"",
				iLanDivRcd		:	"/root/resOnLoad/strLanDivRcd",
				iKeyDate		:	"/root/resOnLoad/strKeyDate",
				iKeyEndDate		:	"",
				oObjDivRcd		:	"/root/reqList/strObjDivRcd",
				oCd				:	"/root/reqList/strObjCd",
				oCdNm			:	"ipbObjNm",
				oBegDt			:	"",
				oEndDt			:	"",
				oLanDivRcd		:	"",
				func			:	function() {
					var vsObjNm = util.DataMap.getValue(app, "dmReqList", "strObjNm");					
					if(!ValueUtil.isNull(vsObjNm)){
						util.Header.clickSearch(app);
					}
				}
			}			
	];
			
			
	
	
	/**
	 * @desc  Header Import onLoad
	 * @return void
	 * @author 최영경 2016-01-19
	 */
	moPage.onLoadImportDone_ImpTitle = function() {		
		
		doHeaderOnLoad();
		
	};
	
	
	
	
	/**
	 * @desc 온로드 실행
	 * @param 
	 * @return 
	 * @author 최영경 2016-01-19
	 */
	function doOnLoad() {
		
		
		//리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init("rptMain");
		//검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grpData"]);
		
		
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				
				util.Control.redraw(app, ["ipbObjNm"]);
				util.Control.setFocus(app, "ipbObjNm");
			}
		}, true);
		
	};
	
	
	
	
	/**
	 * @desc 조회 실행
	 * @param 
	 * @return 
	 * @author 최영경 2016-01-19
	 */
	moPage.onClick_BtnSearch = function() {
		
		 //작업영역 리피트 변경 내역 체크
		if(util.Grid.isModified(app, "", "CRM")){
			return false;
		}		
		
		if(!util.validate(app, "grpSearch")){
			return false;
		}
		
		doList(function(pbSuccess) {
			// 조회 : "조회되었습니다." header 메세지 표시
			if (pbSuccess) util.Msg.notify(app, "NLS.INF.M024");
		});		
	
	};
	
	
	
	
	/**
	 * @desc  교시목록을 조회한다.
	 * @param {Function} poCallBackFunc 콜백정의
	 * @return void
	 * @author 최영경 2016-01-19
	 */
	function doList(poCallBackFunc) {
		
		

		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdMain");	
//TO-BE: <ExtControl.refreshBind> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//				ExtControl.refreshBind("");
				// 조회 후 콜백함수 수행
				if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess); 
			}
		}); 
	}
	
	
	/**
	 * @desc 교시목록을 리피트 panel click event
	 *			 교시목록을 리피트 row all check
	 * @return void
	 * @author 최영경 2016-01-19
	 */	
	moPage.onValueChanged_RhCkbSelect = function() {
//TO-BE: <ExtRepeat.selectedAllPanel> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.selectedAllPanel("rhCkbSelect");
	};
	
	
	
	
	/**
	 * @desc 신규 click event
	 *            교시목록을 리피트 row 추가
	 * @return void
	 * @author 최영경 2016-01-19
	 */		
	moPage.onClick_BtnNew = function() {
		//해당 리피트 insertRow 후 편집 시작할 컬럼 지정		
		var voNewRow 		= util.Grid.insertRow(app, "grdMain", "rdIpbLttm");		
		var vsObjDivRcd 	= util.DataMap.getValue(app, "dmReqList", "strObjDivRcd");
		var vsObjCd 			= util.DataMap.getValue(app, "dmReqList", "strObjCd");
		var vsObjNm 			= util.DataMap.getValue(app, "dmReqList", "strObjNm");
		
		
		util.Grid.setCellValue(app, "grdMain", "OBJ_CD", vsObjCd, voNewRow, false, false);
		util.Grid.setCellValue(app, "grdMain", "OBJ_DIV_RCD", vsObjDivRcd, voNewRow, false, false);
		util.Grid.setCellValue(app, "grdMain", "OBJ_NM", vsObjNm, voNewRow, false, true);
		
	};
	
	
	
	/**
	 * @desc 삭제 click event
	 *            교시목록을 리피트 index row 삭제 status 변경
	 * @return void
	 * @author 최영경 2016-01-19
	 */	
	moPage.onClick_BtnDel = function() {
		util.Grid.deleteRow(app, "grdMain");
	};
	
	/**
	 * @desc 작업취소 click event
	 *            교시목록을 리피트 index row restore
	 * @return void
	 * @author 최영경 2016-01-19
	 */	
	moPage.onClick_BtnRestore = function() {
		util.Grid.restoreRow(app, "grdMain");
	};
	
	/**
	 * @desc 작업저장 click event
	 *            교시목록을 리피트 변경내역 저장
	 * @return void
	 * @author 최영경 2016-01-19
	 */	
	moPage.onClick_BtnSave = function() {
		doSave();
		
	};
	
	
	/**
	 * @desc  교시목록을 리피트 저장 submission 실행
	 * @return void
	 * @author 최영경 2016-01-19
	 */
	function doSave() {
		
		
		// 리피터 변경사항 체크
		if(!util.Grid.isModified(app, ["grdMain"], "MSG")){
			return false;
		}
		
		//리피트 validation check
		if(!util.validate(app, "grdMain")) return false;
		
		//strCommand: save 
		util.Submit.send(app, "subSave", function(pbSuccess){
			
			if(pbSuccess){
				page.doList(function(pbListSuccess) {
					// 조회 : "갱신된 데이터가 조회되었습니다." header 메세지 표시
					if (pbListSuccess) util.Msg.notify(app, "NLS.INF.M025");
				});
			}
		});
	}
	
	
						
	
	
	/**
	 * @desc  검색조건 행정부서 버튼
	 * @return void
	 * @author 최영경 2016-01-19
	 */
	moPage.onClick_RdBtnOgNm1 = function(sender) {
		
		doOnClickStdCmnPObjSch(sender);
	}
	
	
	
	/**
	 * @desc  검색조건 행정부서 ValueChang
	 * @return void
	 * @author 최영경 2016-01-19
	 */
	moPage.onValueChanged_IpbObjNm = function(sender) {
		doOnChangeStdCmnPObjSch(sender);
	};
	
	
	
	
	/**
	 * @desc  교시목록을 리피트 교시 ValueChang
	                교시가 중복 입력 되지 않도록 체크한다.
	 * @return void
	 * @author 최영경 2016-01-19
	 */
	moPage.onValueChanged_RdIpbLttm = function() {
		
		var vsRptId 		= "rptMain";		
		var vnRptCnt 		= util.Grid.getRowCount(app, vsRptId);		//--리피터 count
		var vnRptIndex 	= util.Grid.getIndex(app, vsRptId);		//--현재index
		
		var vsSaCd        = util.Grid.getCellValue(app, vsRptId, "OBJ_CD",vnRptIndex );
		var vsLttm         = util.Grid.getCellValue(app, vsRptId, "LTTM", vnRptIndex);
				
		
		for(var m = 0 ; m<vnRptCnt ; m++){
			
			var vsCompareSaCd = util.Grid.getCellValue(app, vsRptId, "OBJ_CD", m );		//--객체코드(행정부서)
			var vsCompareLttm = util.Grid.getCellValue(app, vsRptId, "LTTM", m );			//--교시
			
			if (vsSaCd == vsCompareSaCd) {
				if (vnRptIndex != m) {					
					if (vsLttm == vsCompareLttm) {						
						util.Msg.alert("NLS-WRN-M020");
						util.Grid.setCellValue(app, vsRptId, "LTTM","", vnRptIndex, false, true);						
						ExtRepeat.setColFocus(vsRptId, vnRptIndex, "rdIpbLttm");	//--리피터 row위치와 컨트롤 위치까지 찾아준다.
						return false;
					}
				}
			}
			
		}
		
		
	};
	
	
	
	
	
	
	/**
	 * @desc  교시목록을 리피트 교시 ValueChang
	                시작시간 중복 입력 되지 않도록 체크한다.
	 * @return void
	 * @author 최영경 2016-01-19
	 */
	moPage.onValueChanged_RdIpbStTime = function() {
		
		var vsRptId 		= "rptMain";		
		var vnRptCnt 		= util.Grid.getRowCount(app, vsRptId);		//--리피터 count
		var vnRptIndex 	= util.Grid.getIndex(app, vsRptId);		//--현재index
		
		var vsStartTime   	= util.Grid.getCellValue(app, vsRptId, "ST_TIME"		, vnRptIndex );
		var vsEndTime     	= util.Grid.getCellValue(app, vsRptId, "END_TIME"	, vnRptIndex );
		
		
		//--시작시간이 4자리가 아닐 경우 "" 처리하여 리턴한다.		
		if(vsStartTime != "" && vsStartTime.length < 4){
			util.Grid.setCellValue(app, vsRptId, "ST_TIME","", vnRptIndex, false, true);						
			ExtRepeat.setColFocus(vsRptId, vnRptIndex, "rdIpbStTime");	//--리피터 row위치와 컨트롤 위치까지 찾아준다.
			
			return false;
		}
		
		
		
		
		/*
			시작시간 종료시간 중복 체크를 한다.
		*/
		if(!moPage.checkStTimeEndTime("ST"))return false;
		
		
		return true;
		
	};
	
	
	
	/**
	 * @desc  교시목록을 리피트 교시 ValueChang
	                종료시간 중복 입력 되지 않도록 체크한다.
	 * @return void
	 * @author 최영경 2016-01-19
	 */
	moPage.onValueChanged_RdIpbEndTime = function() {
		
		var vsRptId 		= "rptMain";		
		var vnRptCnt 		= util.Grid.getRowCount(app, vsRptId);		//--리피터 count
		var vnRptIndex 	= util.Grid.getIndex(app, vsRptId);		//--현재index
		
		//--시작시간이 4자리가 아닐 경우 "" 처리하여 리턴한다.
		var vsStTime        = util.Grid.getCellValue(app, vsRptId, "ST_TIME",vnRptIndex );
		var vsEndTime     	= util.Grid.getCellValue(app, vsRptId, "END_TIME"	, vnRptIndex );
		
		if(vsEndTime != "" && vsEndTime.length < 4){
			util.Grid.setCellValue(app, vsRptId, "END_TIME","", vnRptIndex, false, true);						
			ExtRepeat.setColFocus(vsRptId, vnRptIndex, "rdIpbEndTime");	//--리피터 row위치와 컨트롤 위치까지 찾아준다.
			
			return false;
		}
		
		/*
			시작시간 종료시간 중복 체크를 한다.
		*/
		if(!moPage.checkStTimeEndTime("END"))return false;
		
		return true;
	};
	
	
	/**
	 * @desc  시작시간과 종료시간이 겹치지 않도록 처리한다.
	                (예외사항) 주간 마지막 교시와 야간 첫교시가 시간이 겹침.
	 * @return void
	 * @author 최영경 2016-01-19
	 */
	moPage.checkStTimeEndTime = function(vpKind){
		
		var vsRptId 			= "rptMain";		
		var vnRptRowCnt 	= util.Grid.getRowCount(app, vsRptId);		//--리피터 count
		var vnRptIndex 		= util.Grid.getIndex(app, vsRptId);		//--현재index
		
		var vsColum 	= "";
		var vsColCtlId = "";
		if(vpKind == "ST"){
			vsColum = "ST_TIME";
			vsColCtlId = "rdIpbStTime";
		}else{
			vsColum = "END_TIME";
			vsColCtlId = "rdIpbEndTime";
		}
		
		var vsSaCd        	= util.Grid.getCellValue(app, vsRptId, "OBJ_CD"		,vnRptIndex );
		var vsStartTime   	= util.Grid.getCellValue(app, vsRptId, "ST_TIME"		, vnRptIndex );
		var vsEndTime     	= util.Grid.getCellValue(app, vsRptId, "END_TIME"	, vnRptIndex );
		
		if (vsStartTime != "" || vsEndTime != "") {
			if (vsStartTime != "" && vsEndTime != "") {
				//시작시간이 종료시간 보다 클 수 없다.	
				if (vsStartTime >= vsEndTime) {
					util.Msg.alert("NLS-WRN-M133");
					
					util.Grid.setCellValue(app, vsRptId, vsColum,"", vnRptIndex, false, true);						
					ExtRepeat.setColFocus(vsRptId, vnRptIndex, vsColCtlId);	//--리피터 row위치와 컨트롤 위치까지 찾아준다.
					return;
				}
			}
			
			
			/*
				토마토대학교 주간 마지막 교시와 야간 첫 교시의 시작시간과 종료시간이 겹쳐서 운영이 됨으로 시간으로는 중복 체크를 할 수 없다.
			*/
			
//			
//			var vaValidTime = [vsStartTime,vsEndTime];			
//			
//			for (var l = 0; l < vaValidTime.length; l++) {
//				for (var m = 0; m < vnRptRowCnt; m++) {
//					//비교되어지는 시간들					
//					
//					var vsCompareSaCd 		= ExtRepeat.getValue(vsRptId, "OBJ_CD"		, m );
//					var vsCompareStTime 	= ExtRepeat.getValue(vsRptId, "ST_TIME"		, m );
//					var vsCompareEndTime 	= ExtRepeat.getValue(vsRptId, "END_TIME"	, m );					
//					
//					
//					if (vsSaCd == vsCompareSaCd && vnRptIndex != m) {
//						
//						if (vsCompareStTime != "" || vsCompareEndTime != "") {
//							
//							if (vaValidTime [l] <= vsCompareEndTime && vaValidTime [l] >= vsCompareStTime) {
//								
//								ComMsg.alert(NLS.WRN.M137);								
//								ExtRepeat.setValue(vsRptId, vsColum,"", vnRptIndex, false, true);						
//								ExtRepeat.setColFocus(vsRptId, vnRptIndex, vsColCtlId);	//--리피터 row위치와 컨트롤 위치까지 찾아준다.
//								return;
//							}
//						}
//					}				
//				}
//			}
			
			
			
			
		}
		
		return true;
		
	};
	
	return moPage;
};

