//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./stdCcrCTlsnReqSchedule.xtm"/>

/**
 * 수강신청기간설정
 * @class stdCgdCConvGrdStd
 * @author 박갑수 at 2016. 4. 6
 */
var stdCcrCTlsnReqSchedule = function() {
	var moPage = new Page();
	
	// 임포트용 데이터 통신 오브젝트
	var moPObject = new Page();
	
	// 객체검색팝업 호출
	moPObject.moIdsForStdCmnPObjSch = [
	{
		controlId			:	"btnDeptNm",
		iCd					:	"",
		iNm					:	"ipbDeptNm",
		iObjDivRcd			:	["CC009OG", "CC009SA"],
		iStartObject    	:   "",
		iOtDivRcd			:	"",
		iOtIsTreeView	:	"",
		iLanDivRcd		:	"",
		iKeyDate			:	"",
		iKeyEndDate		:	"",
		oObjDivRcd		:	"/root/reqKey/strObjDivRcd",
		oCd					:	"/root/reqKey/strDeptCd",
		oCdNm				:	"ipbDeptNm",
		oBegDt				:	"",
		oEndDt				:	"",
		oLanDivRcd		:	"",
		func 					:  function(){
			// 검색조건이 있을경우 조회
			var vsSchYearRcd = util.Control.getValue(app, "cbbSchYearRcd");
			var vsSmtRcd = util.Control.getValue(app, "cbbSmtRcd");
			var vsDeptNm = util.Control.getValue(app, "ipbDeptNm");
			if(!ValueUtil.isNull(vsSchYearRcd) && !ValueUtil.isNull(vsSmtRcd) && !ValueUtil.isNull(vsDeptNm)){
				util.Header.clickSearch(app);
			}				
		}
	},
	{
		controlId			:	"rdBtnDeptCdNm",
		iCd					:	"",
		iNm					:	"rdIpbDeptCdNm",
		iObjDivRcd			:	["CC009OG", "CC009SA"],
		iStartObject    	:   "",
		iOtDivRcd			:	"",
		iOtIsTreeView	:	"",
		iLanDivRcd		:	"",
		iKeyDate			:	"",
		iKeyEndDate		:	"",
		oObjDivRcd		:	"rdIpbObjDivRcd",
		oCd					:	"rdIpbDeptCd",
		oCdNm				:	"rdIpbDeptCdNm",
		oBegDt				:	"",
		oEndDt				:	"",
		oLanDivRcd		:	"",
		func 					:  function(){}
	}];
	
	/**
	 * @desc import 헤더 초기화
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 4. 6
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		// import 헤더 초기화
		doHeaderOnLoad();
	};
	
	/**
	 * @desc onLoad 실행
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 6
	 */
	moPage.onModelConstructDone_StdCcrCTlsnReqSchedule = function() {
		// 리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["rptCmnSchedule"]);
		// 검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grpData"]);
		
		// 서브미션 호출
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				
				util.Control.redraw(app, ["cbbSchYearRcd", "cbbSmtRcd", "cbbActRcd"]);
				util.Control.setFocus(app, "cbbSchYearRcd");
			}
		}, true);
	};
	
	/**
	 * @desc [btnDeptNm]부서명(돋보기버튼) onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 6
	 */

	moPage.onClick_BtnDeptNm = function(sender) {
		// 객체검색팝업 호출
		doOnClickStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc [ipbDeptNm]부서명 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 6
	 */
	moPage.onValueChanged_IpbDeptNm = function(sender) {
		// 리피트 변경사항 체크
		if(util.Grid.isModified(app, ["grdCmnSchedule"])){
			return false;
		}

		// 값변경시 객체검색팝업 호출
		doOnChangeStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc [btnSearch]조회 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 6
	 */
	moPage.onClick_BtnSearch = function() {
		 // 작업영역 리피트 변경 내역 체크
		if(util.Grid.isModified(app, "", "CRM")){
			return false;
		}
		
		// 조회조건 필수 체크
		if(!util.validate(app, ["cbbSchYearRcd", "cbbSmtRcd"])){
			return false;
		}
		
		// 조회
		doList(function(pbSuccess) {
			// 조회 : "조회되었습니다." header 메세지 표시
			if (pbSuccess) util.Msg.notify(app, "NLS.INF.M024");
		});
	};
	
	/**
	 * @desc  수강신청기간유형목록 조회
	 * @param {Function} poCallBackFunc 콜백정의
	 * @return void
	 * @author 박갑수 at 2016. 4. 6
	 */
	function doList(poCallBackFunc) {

		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdCmnSchedule");	
				// 조회 후 콜백함수 수행
				if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess); 
			}
		});
	};
	
	/**
	 * @desc [btnNew]신규 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 6
	 */
	moPage.onClick_BtnNew = function() {
		// 해당 리피트 insert 후 편집 시작할 컬럼 지정
		var vnIdx = util.Grid.insertRow(app, "grdCmnSchedule", "rdCbbActRcd");
		
		// 신규 Defalut값 설정 
		// 학년도 : 조회조건
		var vsSchYearRcd = util.Control.getValue(app, "cbbSchYearRcd"); 
		util.Grid.setCellValue(app, "grdCmnSchedule", "SCH_YEAR_RCD", vsSchYearRcd, vnIdx);
		
		// 학기 : 조회조건
		var vsSmtRcd = util.Control.getValue(app, "cbbSmtRcd"); 
		util.Grid.setCellValue(app, "grdCmnSchedule", "SMT_RCD", vsSmtRcd, vnIdx);
		
		// 행위코드 : 조회조건
		var vsActRcd = util.Control.getValue(app, "cbbActRcd"); 
		util.Grid.setCellValue(app, "grdCmnSchedule", "ACT_RCD", vsActRcd, vnIdx);
		
		// 부서명 : 조회조건
		var vsDeptNm = util.Control.getValue(app, "ipbDeptNm"); 
		util.Grid.setCellValue(app, "grdCmnSchedule", "DEPT_CD_NM", vsDeptNm, vnIdx, false, false);
		
		// 부서코드 : 조회조건
		var vsDeptCd = util.DataMap.getValue(app, "dmReqKey", "strDeptCd");
		util.Grid.setCellValue(app, "grdCmnSchedule", "DEPT_CD", vsDeptCd, vnIdx, false, false);
		
		// 부서오브젝트번호 : 조회조건
		var vsObjDivRcd = util.DataMap.getValue(app, "dmReqKey", "strObjDivRcd");
		util.Grid.setCellValue(app, "grdCmnSchedule", "OBJ_DIV_RCD", vsObjDivRcd, vnIdx, false, false);
	};
	
	/**
	 * @desc [btnDel]삭제 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 6
	 */
	moPage.onClick_BtnDel = function() {
		// 해당 리피트 delete
		util.Grid.deleteRow(app, "grdCmnSchedule");
	};
	
	/**
	 * @desc [btnRestore]작업취소 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 6
	 */
	moPage.onClick_BtnRestore = function() {
		// 해당 리피트 상태 초기화
		util.Grid.restoreRow(app, "grdCmnSchedule");
	};
	
	/**
	 * @desc [btnSave]작업저장 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 6
	 */
	moPage.onClick_BtnSave = function() {
		// 작업저장
		doSave();
	};
	
	/**
	 * @desc 점수환산관리목록 변경사항 저장
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 6
	 */
	function doSave() {
		
		// 리피트 변경사항 체크
		if(!util.Grid.isModified(app, ["grdCmnSchedule"], "MSG")){
			return false;
		}
		
		// 리피트 Validation Check
		if(!util.validate(app, "grdCmnSchedule")) return false;
		
		// 중복체크 안함
//		// 데이터 중복 체크
//		if(!moPage.doCheckDup()){
//			return false;
//		}

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
	
	 /**
	 * @desc 데이터 중복 체크
	 * @param 
	 * @return boolean
	 * @author 박갑수 at 2016. 4. 6
	 */
	function doCheckDup() {
		// 유효성 true or false
		var vbValid = true;
		
		// 리피트 ID
		var vsRptId = "rptCmnSchedule";
		// 리피트 RowCnt
		var vnRowCnt 	= util.Grid.getRowCount(app, vsRptId);		
		// 리피트 인덱스
		var vnRptIndex 	= util.Grid.getIndex(app, vsRptId);	
		
		for (var i = 1; i <= vnRowCnt; i++) {
			
			var vsUptStatusOri = util.Grid.getCellValue(app, vsRptId, "UPT_STATUS", i);
			// 삭제일경우 Skip
			if (vsUptStatusOri == "D") continue;
				
			var vsSchYearRcdOri 	= util.Grid.getCellValue(app, vsRptId, "SCY_YEAR_RCD", i);		// 비교대상 학년도
			var vsSmtRcdOri 		= util.Grid.getCellValue(app, vsRptId, "SMT_RCD", i);				// 비교대상 학기
			var vsActRcdOri 		= util.Grid.getCellValue(app, vsRptId, "ACT_RCD", i);				// 비교대상 행위코드
			
			for (var j = 1; j <= vnRowCnt; j++) {
				// 같은 row일경우 Skip
				if (i == j) continue;
				
				var vsUptStatus = util.Grid.getCellValue(app, vsRptId, "UPT_STATUS", j);
				// 삭제일경우 Skip
				if (vsUptStatus == "D") continue;
				
				var vsSchYearRcd 	= util.Grid.getCellValue(app, vsRptId, "SCY_YEAR_RCD", j);		// 비교대상 학년도
				var vsSmtRcd 		= util.Grid.getCellValue(app, vsRptId, "SMT_RCD", j);				// 비교대상 학기
				var vsActRcd 		= util.Grid.getCellValue(app, vsRptId, "ACT_RCD", j);				// 비교대상 행위코드

				// 다른학년도 학기 Skip - 같은학년도학기내 중복체크
				if(vsSchYearRcdOri != vsSchYearRcd) continue;
				if(vsSmtRcdOri != vsSmtRcdOri) continue;
				
				// 행위코드 중복체크
				if (vsActRcdOri == vsActRcd) {
					
					var vsActRcdTitle 	= ExtControl.getTextValue("rhBtnActRcd");
					var vsSchYearNm 	= ExtInstance.getValue("/root/resOnLoad/schYearRcdList/row", "CD_NM" , "child::CD='"+vsSchYearRcd+"'");
					var vsSmtNm			= ExtInstance.getValue("/root/resOnLoad/smtRcdList/row", "CD_NM" , "child::CD='"+vsSmtRcd+"'");
					var vsActNm			= ExtInstance.getValue("/root/resOnLoad/actRcdList/row", "CD_NM" , "child::CD='"+vsActRcd+"'");
					
					//@1 @2에 중복된 @3(이)가 있습니다.
					util.Msg.alert("NLS-CCS-M019", [vsSchYearNm + " " + vsSmtNm, vsActRcdTitle, vsActNm]);
					vbValid = false;
					return vbValid;
				}
			}
		}
		
		return vbValid;
	};
	
	/**
	 * @desc [rdDipStDt]시작일자 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 6
	 */
	moPage.onValueChanged_RdDipStDt = function() {
		// 시작일이 종료일보다 크거나 종료일이 시작일보다 작은지 검사
		if(!doCheckDate("ST_DT")){
			util.Grid.setCellValue(app, "grdCmnSchedule", "ST_DT", "");
		}
	};
	
	/**
	 * @desc [rdDipEndDt]시작일자 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 6
	 */
	moPage.onValueChanged_RdDipEndDt = function() {
		// 시작일이 종료일보다 크거나 종료일이 시작일보다 작은지 검사
		if(!doCheckDate("END_DT")){
			util.Grid.setCellValue(app, "grdCmnSchedule", "END_DT", "");
		}
	};
	
	/**
	 * @desc 시작일이 종료일보다 크거나 종료일이 시작일보다 작은지 검사
	 * @param psColNm		(필수) 날짜컬럼명
	 * @return boolean
	 * @author 박갑수 at 2016. 4. 6
	 */
	function doCheckDate(psColNm){
		// 유효성 true or false
		var vbValid = true;
		
		// 시작일자
		var vsStDt = util.Grid.getCellValue(app, "grdCmnSchedule", "ST_DT").substring(0, 8);;
		// 종료일자
		var vsEndDt = util.Grid.getCellValue(app, "grdCmnSchedule", "END_DT").substring(0, 8);;
		
		// 시작일 유효성 체크
		if(psColNm == "ST_DT"){
			if(!ValueUtil.isNull(vsEndDt) && !ValidUtil.checkValue(vsStDt, "compare(rdDipEndDt, <=)")){
				// "시작일이 종료일 보다 클 수 없습니다." 메시지 출력
				util.Msg.alert("NLS-CSS-M063");
				vbValid = false;
				return vbValid;
			}

		// 종료일 유효성 체크
		} else if(psColNm == "END_DT"){
			if(!ValueUtil.isNull(vsStDt) && !ValidUtil.checkValue(vsEndDt, "compare(rdDipStDt, >=)")){
				util.Msg.alert("NLS-CSS-M064");
				vbValid = false;
				return vbValid;
			}
		}
		
		return vbValid;
	};
	
	/**
	 * @desc [rdIpbStTime]시작시간 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 6
	 */
	moPage.onValueChanged_RdIpbStTime = function() {
		// 시작시간, 종료시간 대소비교
		if(!doChkTime("ST_TIME")){
			util.Grid.setCellValue(app, "grdCmnSchedule", "ST_TIME", "");
		}
	};
	
	/**
	 * @desc [rdIpbEndTime]종료시간 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 6
	 */
	moPage.onValueChanged_RdIpbEndTime = function() {
		// 시작시간, 종료시간 대소비교
		if(!doChkTime("END_TIME")){
			util.Grid.setCellValue(app, "grdCmnSchedule", "END_TIME", "");
		}
	};
	
	/**
	 * @desc 시작시간, 종료시간 대소비교
	 * @param psColId		(필수) 컬럼 ID
	 * @return boolean
	 * @author 박갑수 at 2016. 4. 6
	 */
	function doChkTime(psColNm){
		// 유효성 true or false
		var vbValid = true;
		
		// 시작시간
		var vsStTime = util.Grid.getCellValue(app, "grdCmnSchedule", "ST_TIME");
		// 종료시간
		var vsEndTime = util.Grid.getCellValue(app, "grdCmnSchedule", "END_TIME");
		
		var vsStTimeTitle = ExtControl.getTextValue("rhBtnStTime");
		var vsEndTimeTitle = ExtControl.getTextValue("rhBtnEndTime");
		
		if(!ValueUtil.isNull(vsStTime) && !ValueUtil.isNull(vsEndTime)){
			// 시작시간 유효성 체크
			if(psColNm == "ST_TIME"){
				if(!ValidUtil.checkValue(Number(vsStTime), "compare(rdIpbEndTime, <=)")){
					// "@이(가) @보다 클 수 없습니다." 메시지 출력
					util.Msg.alert("NLS-APS-M001", [vsStTimeTitle, vsEndTimeTitle]);
					vbValid = false;
					return vbValid;
				}

			// 종료시간 유효성 체크
			} else if(psColNm == "END_TIME"){
				if(!ValidUtil.checkValue(Number(vsEndTime), "compare(rdIpbStTime, >=)")){
					// "@이(가) @보다 클 수 없습니다." 메시지 출력
					util.Msg.alert("NLS-APS-M001", [vsStTimeTitle, vsEndTimeTitle]);
					vbValid = false;
					return vbValid;
				}
			}
		}
		
		return vbValid;
	};
	
	/**
	 * @desc [rdIpbDeptCdNm]부서명 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 6
	 */
	moPage.onValueChanged_RdIpbDeptCdNm = function(sender) {
		// 값변경시 객체검색팝업 호출
		doOnChangeStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc [rdBtnDeptCdNm]부서명 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 6
	 */
	moPage.onClick_RdBtnDeptCdNm = function(sender) {
		// 객체검색팝업 호출
		doOnClickStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc [rptCmnSchedule]수강신청기간유형목록 onRowSelect 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 6
	 */
	moPage.onRowSelect_RptCmnSchedule = function() {
//TO-BE: <ExtControl.refreshBind> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtControl.refreshBind(["bindScheduleNew"]);
	};
	
	return moPage;
};
