//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCcsSAttendAbnPcnd.xtm"/>

/**
 * 결석자현황
 * @class extCcsSAttendAbnPcnd
 * @author 박갑수 at 2016. 5. 9
 */
var extCcsSAttendAbnPcnd = function() {
	var moPage = new Page();
	
	var moPObject = new PObject();
	
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
		iLanDivRcd		:	"/root/resOnLoad/strLanDivRcd",
		iKeyDate			:	"/root/keyDateMap/ST_DT",
		iKeyEndDate		:	"",
		oObjDivRcd		:	"/root/reqKey/strObjDivRcd",
		oCd					:	"/root/reqKey/strDeptCd",
		oCdNm				:	"ipbDeptNm",
		oBegDt				:	"",
		oEndDt				:	"",
		oLanDivRcd		:	"",
		func 					:  function(){}
	}];
	
	// SMS/Email 발송
	moPObject.moIdsForExtCmnSender = {
		rptId			 				: "rptExtCcsAttendProf",											// (필수) SMS 리피트 id
		sendDivChar 	 			: ["rhBtnDivclsProfNoDtl"], 	// (선택) 발송문구구분_발송내용의 @ 키워드와 매핑됨
		sndId						: "CMN01404",														// (선택) 발송id
		unitSystemRcd			: "CB001CCS",														// (선택) 단위시스템구분코드		-- 발송Id입력 시 필수
		repNm						: "rhBtnDivclsProfNmDtl", 										// (필수 )수신자명 리피트 헤더 ID
		
		/*************************************SMS*************************************************************/
		phoneNo			 		: "rhBtnProfClpNoDtl",													// (필수) 휴대폰번호 그리드 헤더 id
		defSenderSms     		: "01034090203",															// (선택) 보내는이(SMS)
		sendMsgContSms    	: "",																			// (선택) SMS발송 내용
		sendTitleSms        	: "",																			// (선택) SMS발송 제목
		/******************************************************************************************************/
		
		/*************************************Email*************************************************************/
		email			 			: "",														// (필수) 이메일 그리드 헤더 id
		defSenderEmail 	 		: "", 														// (선택) 보내는이(Email)
		defPersonalNmEmail 	: "",												 		// (선택) 보내는이 명(닉네임)(Email)
		sendMsgContEmail	: "",														// (선택) Email발송 내용
		sendTitleEmail			: "",														// (선택) Email발송 제목
		/******************************************************************************************************/
		
		callBackfunc : function(pbSuccess, psSmsEmailDivCd, paIdxs) {
			/*						
			pbSuccess		: 성공여부(현재 성공시에만 콜백함수 호출됨)
			psSmsEmailDivCd : CMN01302 (이메일). CMN01301(SMS)
			paIdxs			: 선택된 그리드 index
			*/
		}
	};
	
	// 학년도 학기를 원래데이터로 되돌리기위한 변수
	var msSchYearRcd = "";
	var msSmtRcd = "";
	
	/**
	 * @desc import 헤더 초기화
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 5. 9
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		// import 헤더 초기화
		doHeaderOnLoad();
	};
	
	/**
	 * @desc onLoad 실행
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 9
	 */
	moPage.onModelConstructDone_ExtCcsSAttendAbnPcnd = function() {
		// 리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["rptExtCcsAttend", "rptExtCcsAttendProf"]);
		// 검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grpData"]);
		
		// 권한에따른 조회조건 처리
		doVisibleCtlByAuth();
		
		// 서브미션 호출
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				
				
				
				util.Control.redraw(app, ["cbbSchYearRcd", "cbbSmtRcd", "dipStLsnDt", "dipEndLsnDt", "cbbWeekSeqSt"]);
				
				util.SelectCtl.selectItem(app, "cbbWeekSeqSt", 0);
				
				page.onValueChanged_CbbWeekSeqSt();

				// 초기값 : 비율[RATE]
				util.Control.setValue(app, "rdbRateOrTimeCnt", "RATE");
				
				//if (moPageInfo.authRngRcd == "CC00104") {
					// 조회조건값 세팅 : 코드값 -CCS10901
					doSetAuthSchCtl();
				//}
				
			}
		}, true);
	};
	
	/**
	 * 권한에따른 조회조건 처리
	 * @param 
	 * @type void
	 * @author 박갑수 at 2016. 5. 9
	 */	
	function doVisibleCtlByAuth() {
		
		// 개인권한[CC00104] : 
		if (moPageInfo.authRngRcd == "CC00104") {
			util.Control.setVisible(app, false, ["lblRowCnt_rptExtCcsAttendProf", "rptExtCcsAttendProf", "ckbCloseYn", "impSnd", "btnSave", "lblDeptNm", "ipbDeptNm", "btnDeptNm", "lblLsnDt", "dipStLsnDt", "lblDtDiv", "dipEndLsnDt", "rdbRateOrTimeCnt", "lblRate", "ipbRate",  "lblAbnTimeCnt", "ipbAbnTimeCnt"]);
			util.Control.setEnable(app, false, ["cbbSchYearRcd", "cbbSmtRcd", "ipbProfNm"]);
			util.Control.setVisible(app, true, ["lblProfNm", "ipbProfNm"]);
			
			util.Control.setStyleAttr(app, "lblRowCnt_rptExtCcsAttend", "left", "1158");
			util.Control.setStyleAttr(app, "rptExtCcsAttend", "width", "1213");
						
			util.Control.setValue(app, "ipbProfNm", moUserInfo.userNm);
			util.DataMap.setValue(app, "dmReqKey", "strProfObjNo", moUserInfo.id);
		}
	};
	
	/**
	 * 조회조건값 세팅
	 * @param 
	 * @type void
	 * @author 박갑수 at 2016. 5. 9
	 */
	function doSetAuthSchCtl() {
		// 수업시작일
		var vsStLsnDt = util.DataSet.getValue(app, "dsSchReqList", "CD_PRP1" , "1");
		
		//ExtInstance.setValue("/root/reqKey/strStDt", vsStLsnDt);
		//ExtControl.setValue("dipStLsnDt", vsStLsnDt);
		
		// 수업종료일
		var vsEndLsnDt = util.DataSet.getValue(app, "dsSchReqList", "CD_PRP2" , "1");
		
		//ExtInstance.setValue("/root/reqKey/strEndDt", vsEndLsnDt);					
		//ExtControl.setValue("dipEndLsnDt", vsEndLsnDt);
		
		// 비율or시수
		var vsRateOrTimeCnt = util.DataSet.getValue(app, "dsSchReqList", "CD_PRP3" , "1");
		util.DataMap.setValue(app, "dmReqKey", "strRateOrTimeCnt", vsRateOrTimeCnt);	
		util.Control.setValue(app, "rdbRateOrTimeCnt", vsRateOrTimeCnt);
		
		// 비율
		var vsRate = util.DataSet.getValue(app, "dsSchReqList", "CD_PRP4" , "1");
		util.DataMap.setValue(app, "dmReqKey", "strRate", vsRate);
		util.Control.setValue(app, "ipbRate", vsRate);
		
		//--비율or시수 에 따라 보이기/안보이기
		page.rdbRateOrTimeCnt();
		
		
		// 총시수
		var vsLectTimeCnt = util.DataSet.getValue(app, "dsSchReqList", "CD_PRP5" , "1")
		util.DataMap.setValue(app, "dmReqKey", "strLectTimeCnt", vsLectTimeCnt);
		//ExtControl.setValue("ipbLectTimeCnt", vsLectTimeCnt);
		
		// 결석시수
		var vsAbnTimeCnt = util.DataSet.getValue(app, "dsSchReqList", "CD_PRP6" , "1");
		util.DataMap.setValue(app, "dmReqKey", "strAbnTimeCnt", vsAbnTimeCnt);
		util.Control.setValue(app, "ipbAbnTimeCnt", vsAbnTimeCnt);
		
		// 마감여부
		var vsCloseYn = util.DataSet.getValue(app, "dsSchReqList", "CD_PRP7" , "1");
		util.DataMap.setValue(app, "dmReqKey", "strCloseYn", vsCloseYn);
		util.Control.setValue(app, "ckbCloseYn", vsCloseYn);
		
		//ExtModel.dispatch("btnSearch", "DOMActivate");
	};
	
	/**
	 * @desc [cbbSchYearRcd]학년도 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 9
	 */
	moPage.onValueChanged_CbbSchYearRcd = function() {
		// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
		doChangeYearSmt("year");
	};
	
	/**
	 * @desc [cbbSmtRcd]학기 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 9
	 */
	moPage.onValueChanged_CbbSmtRcd = function() {
		// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
		doChangeYearSmt("smt");
	};
	
	/**
	 * @desc 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 9
	 */
	function doChangeYearSmt(psDiv) {
		//strCommand: date 
		util.Submit.send(app, "subDate", function(pbSuccess){
			if(pbSuccess){
				msSchYearRcd = util.DataMap.getValue(app, "dmKeyDateMap", "YEAR");
				msSmtRcd = util.DataMap.getValue(app, "dmKeyDateMap", "SMT");
				
					//--주차를 조회한다.
				page.doWeekList();
				
				
			// Exception 발생시
			}else {
				if(psDiv == "year"){
					util.Control.setValue(app, "cbbSchYearRcd", msSchYearRcd);
				}else if(psDiv == "smt"){
					util.Control.setValue(app, "cbbSmtRcd", msSmtRcd);
				}
			}
		});
	};
	
	
	/**
	 * @desc 주차를 조회한다.
	 * @param {Function} poCallBackFunc 콜백정의
	 * @return void
	 * @author 박갑수 at 2016. 4. 25
	 */
	function doWeekList(poCallBackFunc) {
		
		
		
		util.DataMap.setValue(app, "dmReqKey", "strStWeek", "");
		//strCommand: weekList 
		util.Submit.send(app, "subWeekList", function(pbSuccess){
			if(pbSuccess){
				
				util.Control.redraw(app, ["cbbWeekSeqSt"]);
				
				page.onValueChanged_CbbWeekSeqSt();
				
				
				// 조회 후 콜백함수 수행
				if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess); 
			}
		});
	};
	
	
	
	/**
	 * @desc [btnDeptNm]소속(돋보기버튼) onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 9
	 */
	moPage.onClick_BtnDeptNm = function(sender) {
		// 객체검색팝업 호출
		doOnClickStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc [ipbDeptNm]소속 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 9
	 */
	moPage.onValueChanged_IpbDeptNm = function(sender) {
		// 값변경시 객체검색팝업 호출
		doOnChangeStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc [dipStLsnDt]수업기간(시작) onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 9
	 */
	moPage.onValueChanged_DipStLsnDt = function() {
		if(!doCheckDate("ST_DT")){
			util.Control.setValue(app, "dipStLsnDt", "");
		}
	};
	
	/**
	 * @desc [dipEndLsnDt]수업기간(종료) onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 9
	 */
	moPage.onValueChanged_DipEndLsnDt = function() {
		if( !doCheckDate("END_DT")){
			util.Control.setValue(app, "dipEndLsnDt", "");
		}
	};
	
	/**
	 * @desc 시작일이 종료일보다 크거나 종료일이 시작일보다 작은지 검사
	 * @param psColNm		(필수) 날짜컬럼명
	 * @return boolean
	 * @author 박갑수 at 2016. 5. 9
	 */
	function doCheckDate(psColNm){
		// 유효성 true or false
		var vbValid = true;

		// 시작일자
		var vsStDt = util.Control.getValue(app, "dipStLsnDt").substring(0, 8);
		// 종료일자
		var vsEndDt = util.Control.getValue(app, "dipEndLsnDt").substring(0, 8);
		
		// 시작일 유효성 체크
		if(psColNm == "ST_DT"){
			if(!ValueUtil.isNull(vsEndDt) && vsStDt > vsEndDt){
				// "시작일이 종료일 보다 클 수 없습니다." 메시지 출력
				util.Msg.alert("NLS-CSS-M063");
				vbValid = false;
				return vbValid;
			}

		// 종료일 유효성 체크
		} else if(psColNm == "END_DT"){
			if(!ValueUtil.isNull(vsStDt) && vsStDt > vsEndDt){
				util.Msg.alert("NLS-CSS-M064");
				vbValid = false;
				return vbValid;
			}
		}
		
		return vbValid;
	};
	
	/**
	 * @desc [rdbRateOrTimeCnt]비율or시수 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 9
	 */
	moPage.onValueChanged_RdbRateOrTimeCnt = function() {
		
		//--비율or시수 에 따라 보이기/안보이기
		page.rdbRateOrTimeCnt();
		
		// 비율, 총시수, 결석시수 초기화
		util.Control.setValue(app, "ipbRate", "");
		//ExtControl.setValue("ipbLectTimeCnt", "");
		util.Control.setValue(app, "ipbAbnTimeCnt", "");
	};
	
	
	
	/**
		비율 or 시수 에 따라 컨트롤을 보이기/안보이기 한다.
	*/
	moPage.rdbRateOrTimeCnt = function() {
		var vsRateOrTimeCnt = util.Control.getValue(app, "rdbRateOrTimeCnt");

		if (moPageInfo.authRngRcd != "CC00104") {
			// 비율일경우
			if(ValueUtil.fixNull(vsRateOrTimeCnt) == "RATE"){
				util.Control.setVisible(app, true, ["lblRate", "ipbRate"]);
				util.Control.setVisible(app, false, [ "lblAbnTimeCnt", "ipbAbnTimeCnt"]);

			// 교수일경우
			}else {
				util.Control.setVisible(app, false, ["lblRate", "ipbRate"]);
				util.Control.setVisible(app, true, [ "lblAbnTimeCnt", "ipbAbnTimeCnt"]);
			}
		}
	}
	
	
	
	/**
	 * @desc [ipbRate]비율 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 9
	 */
	moPage.onValueChanged_IpbRate = function() {
		ValidUtil.checkIntegerDecimal("ipbRate", 3, 2, true);
	};
	
	/**
	 * @desc [ipbLectTimeCnt]총시수 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 9
	 */
	moPage.onValueChanged_IpbLectTimeCnt = function() {
		ValidUtil.checkIntegerDecimal("ipbLectTimeCnt", 3, 0, true);
	};
	
	/**
	 * @desc [ipbAbnTimeCnt]결석시수 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 9
	 */
	moPage.onValueChanged_IpbAbnTimeCnt = function() {
		ValidUtil.checkIntegerDecimal("ipbAbnTimeCnt", 3, 0, true);
	};
	
	/**
	 * @desc [btnSearch]조회 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 9
	 */
	moPage.onClick_BtnSearch = function() {
		// 작업영역 리피트 변경 내역 체크
		if(util.Grid.isModified(app, "", "CRM")){
			return false;
		}
	
		// 비율or시수
		var vsRateOrTimeCnt = util.Control.getValue(app, "rdbRateOrTimeCnt");
		
		// 비율일경우
		if(ValueUtil.fixNull(vsRateOrTimeCnt) == "RATE"){
			// 조회조건 필수 체크
			if (moPageInfo.authRngRcd == "CC00104") {
				if(!util.validate(app, ["cbbSchYearRcd", "cbbSmtRcd"])){
					return false;
				}
			}else{
				if(!util.validate(app, ["cbbSchYearRcd", "cbbSmtRcd", "ipbDeptNm", "cbbWeekSeqSt", "ipbRate"])){
					return false;
				}
			}	
			
						
		// 시수일경우
		}else {
				// 조회조건 필수 체크
			if (moPageInfo.authRngRcd == "CC00104") {
				if(!util.validate(app, ["cbbSchYearRcd", "cbbSmtRcd", "cbbWeekSeqSt"])){
					return false;
				}
			}else{
			
				if(!util.validate(app, ["cbbSchYearRcd", "cbbSmtRcd", "ipbDeptNm", "cbbWeekSeqSt", "ipbAbnTimeCnt"])){
					return false;
				}
			}
		}

		// 조회
		doList(function(pbSuccess) {
			if (pbSuccess){
				// 조회 : "조회되었습니다." header 메세지 표시
				util.Msg.notify(app, "NLS.INF.M024");
			}
		});
	};
	
	/**
	 * @desc 결석자현황 조회
	 * @param poCallBackFunc 콜백정의
	 * @return void
	 * @author 박갑수 at 2016. 5. 9
	 */
	function doList(poCallBackFunc) {
		
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdExtCcsAttend");
				util.Control.redraw(app, "grdExtCcsAttendProf");
				
				// 조회 후 콜백함수 수행
				if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess); 
			}
		});
	};
	
	/**
	 * @desc [btnSave]조건저장 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 9
	 */
	moPage.onClick_BtnSave = function() {
		// 작업저장
		doSave();
	};
	
	/**
	 * @desc 학과별 반편성 목록 변경사항 저장
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 9
	 */
	function doSave() {

		//strCommand: save 
		util.Submit.send(app, "subSave", function(pbSuccess){
			if(pbSuccess){
					// 저장 : "저장되었습니다." header 메세지 표시
				util.Msg.notify(app, "NLS.INF.M001");
			}
		});
	};

	/**
	 * @desc import SmsEmail발송 초기화
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 5. 9
	 */
	moPage.onLoadImportDone_ImpSnd = function() {
		doExtCmnSmsEmailLoad();
	};
	
	/**
	 * @desc [rhCkbSelect]패널 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 9
	 */
	moPage.onValueChanged_RhCkbSelect = function() {
		// 리피트 패널 설정
//TO-BE: <ExtRepeat.selectedAllPanel> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.selectedAllPanel("rhCkbSelect");
	};
	
	/*
		주차를 변경 시 시작일자 종료일자를 변경한다.
	*/
	moPage.onValueChanged_CbbWeekSeqSt = function() {
		
		var vsWeekSeq = util.DataMap.getValue(app, "dmReqKey", "strStWeek");
		
		if(vsWeekSeq != null && vsWeekSeq != ""){
			var vsStDt = ExtInstance.getValue("/root/resOnLoad/listWeekSeq/row", "ST_DT", "child::WEEK_SEQ = '"+vsWeekSeq+"'");
			var vsEndDt = ExtInstance.getValue("/root/resOnLoad/listWeekSeq/row", "END_DT", "child::WEEK_SEQ = '"+vsWeekSeq+"'");
			
			util.DataMap.setValue(app, "dmReqKey", "strStDt"		, vsStDt);
			util.DataMap.setValue(app, "dmReqKey", "strEndDt"	, vsEndDt);
			
			util.Control.redraw(app, ["dipStLsnDt", "dipEndLsnDt"]);
		}
		
		
	}
	return moPage;
};
