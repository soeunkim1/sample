//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./stdCcrCTlsnReqManager.xtm"/>

/**
 * 관리자수강신청
 * @class stdCcrCTlsnReqManager
 * @author 박갑수 at 2016. 4. 20
 */
var stdCcrCTlsnReqManager = function() {
	var moPage = new Page();
	
	// 임포트용 데이터 통신 오브젝트
	var moPObject = new Page();
	
	// 학생검색팝업
	moPObject.moIdsForStdCsrPStSearch = [
	{
		controlId 					: "btnStudId",
		iStudNo 					: "ipbStudId",	
		iStudId 						: "",
		iStudNm 					: "",
		iKeyDate 					: "/root/keyDateMap/END_DT", 
		iObjDivRcd 				: "",
		iObjCd 						: "",
		iObjNm 					: "",
		iStatRcd 					: "",
		iStudDivRcd				: "",
		oStudId 					: "/root/reqKey/strStudId",
		oStudNo 					: "ipbStudId",
		oStudNm 					: "",
		oStatNm 					: "",
		oStatRcd 					: "",
		oProcRslt 					: "",
		oProcRsltYear 			: "/root/reqKey/strProcRsltYear",
		oSaNm						: "/root/reqKey/strStudSaNm",
		oSaCd 						: "/root/reqKey/strStudSaCd",
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
			
			// 학년 초기값 세팅
			var vsProcRsltYear = util.DataMap.getValue(app, "dmReqKey", "strProcRsltYear");
			if(!ValueUtil.isNull(vsProcRsltYear)){
				// 교과목수준(학년)[CA206]값 만들어서 세팅 
				var vsSbLvlRcd = "CA2060" + vsProcRsltYear;
				util.Control.setValue(app, "cbbSbLvlRcd", vsSbLvlRcd);
				
				msSbLvl = vsSbLvlRcd;
			}else {
				msSbLvl = "";
			}
			
			msSaCd 	= util.DataMap.getValue(app, "dmReqKey", "strStudSaCd");
			msSaNm 	= util.DataMap.getValue(app, "dmReqKey", "strStudSaNm");
			
				
			
			var vsSchYearRcd = util.Control.getValue(app, "cbbSchYearRcd");
			var vsSmtRcd = util.Control.getValue(app, "cbbSmtRcd");
			var vsStudId = util.DataMap.getValue(app, "dmReqKey", "strStudId");
			
			if(vsSmtRcd == 'CA00390' || vsSmtRcd == 'CA00392'){
				
				util.DataMap.setValue(app, "dmReqKey", "strSaCd", msSaCd);
				util.DataMap.setValue(app, "dmReqKey", "strSaNm", msSaNm);
				
			}			
			util.Control.redraw(app, "ipbSaNm");
			
			
			// 검색조건있을경우 바로조회
			if(!ValueUtil.isNull(vsSchYearRcd) && !ValueUtil.isNull(vsSmtRcd) && !ValueUtil.isNull(vsStudId)){
				util.Header.clickSearch(app);
			}
		}
	}];
	
	// 객체검색팝업 호출
	moPObject.moIdsForStdCmnPObjSch = [
	{
		controlId			:	"btnSaCd",
		iCd					:	"",
		iNm					:	"ipbSaNm",
		iObjDivRcd			:	["CC009SA"],
		iStartObject    	:   "",
		iOtDivRcd			:	"",
		iOtIsTreeView	:	"",
		iLanDivRcd		:	"",
		iKeyDate			:	"/root/keyDateMap/ST_DT",
		oObjDivRcd		:	"",
		oCd					:	"/root/reqKey/strSaCd",
		oCdNm				:	"ipbSaNm",
		oBegDt				:	"",
		oEndDt				:	"",
		oLanDivRcd		:	"",
		func 					:  function(){
		}
	}];
	
	// 재수강대상용
	moPage.moIdsForReTlsn = 
	{
		iStudId			: "",
		iRecCd			: "",
		iRecNm			: "",
		iSchYearRcd	: "",
		iSmtRcd		: "",
		iRefKey			: "",
		iCmpDivRcd	: "",
		iKeyDate		: ""
	};
	
	// 학점 취득현황 팝업 필수정의사항
	moPage.moStudRecCmpPopup = {
		  strStudId		: ""
		  , strOpenPgmDiv : "XTM"
	};
	
	// 학년도 학기를 원래데이터로 되돌리기위한 변수
	var msSchYearRcd = "";
	var msSmtRcd = "";
	
	// 강의시간표 버튼 백그라운드 색상
	var msDefaultColor = "#EAEAEA";		// 기본			: 옅은회색
	var msMyColor 		= "#1DDB16";		// 시간표		: 초록 
	
	// 분반명 default세팅용
	var mbfirstSch = true;
	
	// 재수강팝업 띄우는 위치에따른 분기
	var mbAply = true;
	
	// 계절학기인지여부
	var mbSeason = false;
	
	// 개설과목 Defalut값 세팅용
	var msSaCd = "";
	var msSaNm = "";
	var msSbLvl = "";
	
	/**
	 * @desc import 헤더 초기화
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 4. 20
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		// import 헤더 초기화
		doHeaderOnLoad();
	};
	
	/**
	 * @desc 학생정보 import 초기화
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 4. 20
	 */
	moPage.onLoadImportDone_ImpStudInfo = function() {
		// 학생정보 import 초기화
		impStudInfo();
	};
	
	/**
	 * @desc onLoad 실행
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 20
	 */
	moPage.onModelConstructDone_StdCcrCTlsnReqManager = function() {
		// 리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["rptCcsOpenSub", "rptCcrTlsnReq"]);
		// 검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grpData"]);
		
		//impStudInf02(학생정보 임포트) 초기화
		initSize();
		
		// 서브미션 호출
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, ["cbbSchYearRcd", "cbbSmtRcd", "cbbSbLvlRcd"]);
				// 학번 포커스
				util.Control.setFocus(app, "ipbStudId");
				
				// 2016. 8. 17. 박갑수 - 토마토대학교 사용 : 계절학기 여부 판단하여 전역변수 세팅
				doSetSeson();
			}
		}, true);
	};
	
	/**
	 * @desc 계절학기 여부 판단하여 전역변수 세팅
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 8. 17
	 */
	function doSetSeson(){
		var vsSmtRcd = util.Control.getValue(app, "cbbSmtRcd");
		
		var vsCdPrp1 = ExtInstance.getValue("/root/resOnLoad/smtRcdList/row", "CD_PRP1" , "child::CD='"+ vsSmtRcd +"'");
		
		// 계절학기[CA00102]
		if(ValueUtil.fixNull(vsCdPrp1) == "CA00102"){
			mbSeason = true;
		}else {
			mbSeason = false;
		}
	};
	
	/**
	 * @desc [cbbSchYearRcd]학년도 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 20
	 */
	moPage.onValueChanged_CbbSchYearRcd = function() {
		// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
		doChangeYearSmt("year");
	};
	
	/**
	 * @desc [cbbSmtRcd]학기 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 20
	 */
	moPage.onValueChanged_CbbSmtRcd = function() {
		// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
		doChangeYearSmt("smt");
		
		doSetSeson();
	};
	
	/**
	 * @desc 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 20
	 */
	function doChangeYearSmt(psDiv) {
		//strCommand: date 
		util.Submit.send(app, "subDate", function(pbSuccess){
			if(pbSuccess){				
				msSchYearRcd = util.DataMap.getValue(app, "dmKeyDateMap", "YEAR");
				msSmtRcd = util.DataMap.getValue(app, "dmKeyDateMap", "SMT");
				
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
	 * @desc [btnStudId]학번(돋보기버튼) onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 20
	 */
	moPage.onClick_BtnStudId = function(sender) {
		// 학생검색팝업 호출
		doOnClickStdCsrPStSearch(sender);
	};
	
	/**
	 * @desc [ipbStudId]학번 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 20
	 */
	moPage.onValueChanged_IpbStudId = function(sender) {
		// 리피트 변경사항 체크
		if(util.Grid.isModified(app, ["grdCcrTlsnReq"])){
			return false;
		}
		
		// 값변경시 학생검색팝업 호출
		doOnChangeStdCsrPStSearch(sender);
	};
	
	/**
	 * @desc [btnSearch]조회 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 20
	 */
	moPage.onClick_BtnSearch = function() {
		 // 작업영역 리피트 변경 내역 체크
		if(util.Grid.isModified(app, "", "CRM")){
			return false;
		}
		
		// 조회조건 필수 체크
		if(!util.validate(app, ["cbbSchYearRcd", "cbbSmtRcd", "ipbStudId"])){
			return false;
		}
		
		//(IMPORT)학번전달
		var vsStudId = util.DataMap.getValue(app, "dmReqKey", "strStudId");
		
		var vsKeyDate = util.DataMap.getValue(app, "dmKeyDateMap", "END_DT");
		
		// 2016.8.17 - 박갑수 동서울대: 계절학기일경우 모두 조회되도록 수정
		if(mbSeason){
			ExtControl.setAttr("lblSaNm", "class", "lblSch");
			ExtControl.setAttr("ipbSaNm", "class", "ipbSch");
			
			// 개설과목 조회조건초기화
			util.Control.setValue(app, "ipbSaNm", "");
			util.DataMap.setValue(app, "dmReqKey", "strSaCd", "");
			util.Control.setValue(app, "cbbSbLvlRcd", "");
			util.Control.setValue(app, "ipbDivclsNm", "");
		}else {
			ExtControl.setAttr("lblSaNm", "class", "lblSchReq");
			ExtControl.setAttr("ipbSaNm", "class", "ipbSchReq");
		
			util.Control.setValue(app, "ipbSaNm", msSaNm);
			util.DataMap.setValue(app, "dmReqKey", "strSaCd", msSaCd);
			util.Control.setValue(app, "cbbSbLvlRcd", msSbLvl);
		}

		// 학생정보imp 조회
		setImpStudInfo(vsStudId, vsKeyDate, null, function(pbSuccess) {
			if (pbSuccess){
				
				// 이미지 업로드 버튼 보이기 여부 설정
				setVisibleUploadStudImgBtn(false);
				
				// 관리자 수강신청 체크
				doAdminLoadOfScreen(null, function(pbSuccess) {
					if (pbSuccess){
						
						mbfirstSch = true;
						
						// 조회
						doList(function(pbSuccess) {
							// 조회 : "조회되었습니다." header 메세지 표시
							// if (pbSuccess) Common.setMsgStatus(NLS.INF.M024);
							if (pbSuccess) ExtModel.dispatch("btnSbKeyword", "DOMActivate");
						});
					}
				});
				
			}
		});
	};
	
	/**
	 * @desc 관리자수강신청화면 조회 전 체크
	 * @param poCallBackFunc 콜백정의
	 * @return void
	 * @author 박갑수 at 2016. 4. 20
	 */
	function doAdminLoadOfScreen(pnStep, poCallBackFunc) {
		if(ValueUtil.isNull(pnStep)){
			pnStep = "0";
		}
		
		util.DataMap.setValue(app, "dmReqKey", "intStep", pnStep);
		
		//strCommand: doAdminLoadOfScreen 
		util.Submit.send(app, "subDoAdminLoadOfScreen", function(pbSuccess){
			if(pbSuccess){
				
				var vsMsg = util.DataMap.getValue(app, "dmInteractiveMsg", "strMsg");
				if(!ValueUtil.isNull(vsMsg)){
					// @\n 무시하고 계속하시겠습니까?
					if(util.Msg.confirm("NLS-CRM-M027", [vsMsg]) ){
						var vnStep = util.DataMap.getValue(app, "dmInteractiveMsg", "intStep");
						
						return page.doAdminLoadOfScreen(vnStep, poCallBackFunc);
					}else {
						return false;
					}
				}else {
					if(util.isFunc(poCallBackFunc)) poCallBackFunc(true);
				}
			} else {
				return false;
			}
		});
	};
	
	/**
	 * @desc 신청내역 조회
	 * @param poCallBackFunc 콜백정의
	 * @return void
	 * @author 박갑수 at 2016. 4. 20
	 */
	function doList(poCallBackFunc) {
		
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				
				util.Control.redraw(app, "grdCcrTlsnReq");
				util.Control.redraw(app, ["optRegCourceNum", "optRegCreditNum", "optAvlCreditNum"]);
				
				// 분반명 초기값 세팅
				if(!mbSeason){
					if(mbfirstSch){
						util.Control.setValue(app, "ipbDivclsNm", util.DataMap.getValue(app, "dmReqKey", "strClassRcd"));
						
						mbfirstSch = false;
					}
				}
				
				// 수강구분코드에 따른 ROW색 설정
				doSetRowClr();
				
				// 시간표 초기화
				doBtnRefresh(function(pbEnd) {
					if (pbEnd){
						// 시간표색상설정
						doSetScheduleColor();
					}
				});
			}
			
			// 조회 후 콜백함수 수행
			if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess); 
		});
	};
	
	/**
	 * @desc 수강구분코드에 따른 ROW색 설정
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 20
	 */
	function doSetRowClr() {
		var vnRowCnt = util.Grid.getRowCount(app, "grdCcrTlsnReq");
		for(var i=0; i<vnRowCnt; i++){
			var vnIdx = i+1;
			
			//  수강구분 : 수강취소[CL20202] 일경우삭제와 같은 색 표시
			var vsTlsnDivRcd = util.Grid.getCellValue(app, "grdCcrTlsnReq", "TLSN_DIV_RCD", vnIdx);
			if(ValueUtil.fixNull(vsTlsnDivRcd) == "CL20202"){
				ExtRepeat.setRowClr("rptCcrTlsnReq", vnIdx,"#FFCDCD");
			}
		}
	};
	
	/**
	 * @desc 시간표 버튼 초기화
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 20
	 */
	function doBtnRefresh(poCallBackFunc){
		var vbEnd = false;
		for (var i = 1; i <= 9; i++) {
			var vcBtnRefre = "btn0" + i;
			var vcBtnRefreDay = "";

			for (var j = 1; j <= 6; j++) {
				vcBtnRefreDay = vcBtnRefre + "CL1020" + j;
				util.Control.setStyleAttr(app, vcBtnRefreDay, "background-color", msDefaultColor);
				ExtControl.setTextValue(vcBtnRefreDay, "");
				if(i == 9 && j == 6){
					vbEnd = true;
					// 콜백함수 수행
					if (util.isFunc(poCallBackFunc)) poCallBackFunc(vbEnd);
				}
			}
		}
	};
	
	/**
	 * @desc 시간표 색정보 설정
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 20
	 */
	function doSetScheduleColor() {
		
		var vnLength = util.DataSet.getRowCount(app, "dsTimeScheList");
		
		for(var i=0; i<vnLength; i++){
			var vnIdx = i+1;
			// 교시
			var vsLttm = util.DataSet.getValue(app, "dsTimeScheList", "LTTM" , vnIdx);
			// 요일
			var vsWdayRcd = util.DataSet.getValue(app, "dsTimeScheList", "WDAY_RCD" , vnIdx);
			
			var vsTmpLttm = "";
			if (Number(vsLttm) < 10) {
				vsTmpLttm = "0" + vsLttm;
			}else {
				
				// 교시는 2자리라고 가정 : 1~9교시는 그대로, 10교시 부터는 야간으로 간주하고 1교시부터 세팅
				var vsSt = Number(vsLttm.substring(0, 1));
				var vsEnd = Number(vsLttm.substring(1, 2));
				
				var vnSum = vsSt + vsEnd;
				vsTmpLttm = "0" + String(vnSum);
			}
			
			var vcBtn = "btn" + vsTmpLttm + vsWdayRcd;
			
			// 백그라운드컬러 설정 얻어와서 기본 색이 아닐경우 - 중복시간
			var vsBackGround = util.Control.getStyleAttr(app, vcBtn, "background-color");
			
			util.Control.setStyleAttr(app, vcBtn, "background-color", msMyColor);
			
			// 시간표 명칭 세팅 - 교과목명 2자리
			var vsSbNm = util.DataSet.getValue(app, "dsTimeScheList", "SB_NM" , vnIdx);
			ExtControl.setTextValue(vcBtn, vsSbNm);
		}
	};
	
	/**
	 * @desc [ipbSbCd]교과목코드 onKeyDown 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 20
	 */
	moPage.onKeyDown_IpbSbCd = function(strKeyType, strKeyStatus) {
		var vsSbCd = util.Control.getValue(app, "ipbSbCd");
		
		if(!ValueUtil.isNull(vsSbCd)){
			// 엔터키 입력시 조회
			if(e.keyCode == cpr.events.KeyCode.ENTER){
				ExtModel.dispatch("btnSbKeyword", "DOMActivate");
			}
		}
	};
	
	/**
	 * @desc [ipbSbNm]교과목명 onKeyDown 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 20
	 */
	moPage.onKeyDown_IpbSbNm = function(strKeyType, strKeyStatus) {
		var vsSbNm = util.Control.getValue(app, "ipbSbNm");
		
		if(!ValueUtil.isNull(vsSbNm)){
			// 엔터키 입력시 조회
			if(e.keyCode == cpr.events.KeyCode.ENTER){
				ExtModel.dispatch("btnSbKeyword", "DOMActivate");
			}
		}
	};
	
	/**
	 * @desc [ipbDivclsNm]분반 onKeyDown 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 20
	 */
	moPage.onKeyDown_IpbDivclsNm = function(strKeyType, strKeyStatus) {
		var vsSbCd = util.Control.getValue(app, "ipbSbCd");
		var vsSbNm = util.Control.getValue(app, "ipbSbNm");
		
		if(!ValueUtil.isNull(vsSbCd) || !ValueUtil.isNull(vsSbNm)){
			// 엔터키 입력시 조회
			if(e.keyCode == cpr.events.KeyCode.ENTER){
				ExtModel.dispatch("btnSbKeyword", "DOMActivate");
			}
		}
	};
	
	/**
	 * @desc [btnSbKeyword]조회(교과목검색) onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 20
	 */
	moPage.onClick_BtnSbKeyword = function() {
		// 조회조건 필수체크 - 학사부서, 교과목코드, 교과목명 중 한개는 입력되었는지 확인		학년,분반 중 한개는 입력되었는지 확인
		if(!mbSeason){
			if(!moPage.checkNotNullCtl()){
				return false;
			}
		}
		
		// 개설과목 목록조회
		doListSub(function(pbSuccess) {
			// 조회 : "조회되었습니다." header 메세지 표시
			if (pbSuccess) util.Msg.notify(app, "NLS.INF.M024");
		});
	};
	
	/**
	 * @desc 교과목코드, 교과목명 중 한개는 입력되었는지 확인.
	 * @param 
	 * @return boolean
	 * @author 박갑수 at 2016. 4. 20
	 */
	moPage.checkNotNullCtl = function() {
		var vbValid = true;
		
		// 교과목명
		var vsSbCd = util.Control.getValue(app, "ipbSbCd");
		// 교과목코드
		var vsSbNm = util.Control.getValue(app, "ipbSbNm");
		// 학사부서명
		var vsSaNm = util.Control.getValue(app, "ipbSaNm");
		
//		// 학년
//		var vsSbLvlRcd = ExtControl.getValue("cbbSbLvlRcd");
//		// 분반
//		var vsDivclsNm = ExtControl.getValue("ipbDivclsNm");
		
//		if((ValueUtil.isNull(vsSaNm) && ValueUtil.isNull(vsSbCd) && ValueUtil.isNull(vsSbNm)) || (ValueUtil.isNull(vsSbLvlRcd) && ValueUtil.isNull(vsDivclsNm))){
		if(ValueUtil.isNull(vsSaNm) && ValueUtil.isNull(vsSbCd) && ValueUtil.isNull(vsSbNm)){
//			var vsMsgParam = "("+ ExtControl.getTextValue("lblSaNm") +", "+ ExtControl.getTextValue("lblSbCd") + ", " + ExtControl.getTextValue("lblSbNm") 
//										+ ")\n, (" + ExtControl.getTextValue("lblSbLvlRcd") + ", " + ExtControl.getTextValue("lblDivclsNm") + ")";
			
			var vsMsgParam = ExtControl.getTextValue("lblSaNm") +", "+ ExtControl.getTextValue("lblSbCd") + ", " + ExtControl.getTextValue("lblSbNm");
			
			// "조회조건[@1] 중 하나는 반드시 입력해야 합니다." 메시지 표시
			util.Msg.alert("NLS-CMM-M016", [vsMsgParam]);
			
			vbValid = false;
			return vbValid;
		}
		
		return vbValid;
	};
	
	/**
	 * @desc 개설과목 목록조회
	 * @param poCallBackFunc 콜백정의
	 * @return void
	 * @author 박갑수 at 2016. 4. 20
	 */
	function doListSub(poCallBackFunc) {
		
		//strCommand: listSub 
		util.Submit.send(app, "subListSub", function(pbSuccess){
			if(pbSuccess){
				
				util.Control.redraw(app, "grdCcsOpenSub");
				
				// 여석에 따른 ROW색 설정
				doSetSubRowClr();
			}

			// 조회 후 콜백함수 수행
			if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess); 
		});
	};
	
	/**
	 * @desc 여석에 따른 ROW색 설정
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 20
	 */
	function doSetSubRowClr() {
		var vnRowCnt = util.Grid.getRowCount(app, "grdCcsOpenSub");
		for(var i=0; i<vnRowCnt; i++){
			var vnIdx = i+1;
			
			// 여석이 없을경우 삭제와 같은 색 표시
			var vsRemainSeats = util.Grid.getCellValue(app, "grdCcsOpenSub", "REMAIN_SEATS", vnIdx);
			if(ValueUtil.isNull(vsRemainSeats) || Number(ValueUtil.fixNull(vsRemainSeats)) <= 0){
				ExtRepeat.setRowClr("rptCcsOpenSub", vnIdx,"#FFCDCD");
			}
		}
	};
	
	/**
	 * @desc [rdBtnPlanPaper]강의계획서 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 20
	 */
	moPage.onClick_RdBtnPlanPaper = function() {
		
		var vsKeyDate = util.DataMap.getValue(app, "dmKeyDateMap", "END_DT");
		var vsSchYearRcd = util.Control.getValue(app, "cbbSchYearRcd");
		var vsSmtRcd = util.Control.getValue(app, "cbbSmtRcd");
		var vsSaCd = util.Grid.getCellValue(app, "grdCcsOpenSub", "SA_CD");
		var vsRefKey = util.Grid.getCellValue(app, "grdCcsOpenSub", "REF_KEY");
		
		// 강의계획서 출력
		var voParam = {
				p_strLanDivRcd 			: msDefaultLocale	 			 // 언어키
			  ,	p_strKeyDate 			: vsKeyDate	  					 // 기준일
			  ,	p_strSchYearRcd		: vsSchYearRcd  				 // 학년도
			  ,	p_strSmtRcd 				: vsSmtRcd  						 // 학기
			  ,	p_strSaCd	 				: vsSaCd  							 // 부서코드
			  ,	p_strRefKey 				: vsRefKey							 // 교과목참조키
			  ,	p_strCheckAuthId 		: moUserInfo.id					 // 사용자ID
		};
				
		var voOzFormParam = {
				  TITLE : "강의계획서" 			//리포트타이틀
				, SUB_TITLE : "서브타이틀" 		//리포트서브타이틀		
				, FORM_TYPE : "flash"
		};	
				
		ReportUtil.fOzPopupOpen("강의계획서", "stdNcsSCurPrt04", voOzFormParam, voParam);
	};
	
	/**
	 * @desc [rdBtnRegistButton]수강신청 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 20
	 */
	moPage.onClick_RdBtnRegistButton = function() {
		var vnIdx = util.Grid.getIndex(app, "grdCcsOpenSub");

//		// 여석이 있을경우 수강신청
//		var vsRemainSeats = ExtRepeat.getValue("rptCcsOpenSub", "REMAIN_SEATS", vnIdx);
//		if(!ValueUtil.isNull(vsRemainSeats) && Number(ValueUtil.fixNull(vsRemainSeats)) > 0){
//			// 재수강여부 확인 - 재수강이 있을경우 재수강팝업, 없을경우 바로 수강신청 로직
//			moPage.doReTlsnChk();
//		}
		
		// 재수강여부 확인 - 재수강이 있을경우 재수강팝업, 없을경우 바로 수강신청 로직
		doReTlsnChk();
	};
	
	/**
	 * @desc 재수강여부 확인 - 재수강이 있을경우 재수강 대상
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 20
	 */
	function doReTlsnChk() {
		var vnIdx = util.Grid.getIndex(app, "grdCcsOpenSub");
		
		var vsSbCd = util.Grid.getCellValue(app, "grdCcsOpenSub", "SB_CD", vnIdx);
		var vsSbNm = util.Grid.getCellValue(app, "grdCcsOpenSub", "SB_CD_NM", vnIdx);
		var vsSchYearRcd = util.DataMap.getValue(app, "dmKeyDateMap", "YEAR");
		var vsSmtRcd = util.DataMap.getValue(app, "dmKeyDateMap", "SMT");
		var vsRefKey = util.Grid.getCellValue(app, "grdCcsOpenSub", "REF_KEY", vnIdx);
		var vsEndDt = util.DataMap.getValue(app, "dmKeyDateMap", "END_DT");
		var vsCmpDivRcd = util.Grid.getCellValue(app, "grdCcsOpenSub", "CMP_DIV_RCD", vnIdx);
		
		 // 교과목코드 없을경우 리턴
		 if(ValueUtil.isNull(vsSbCd)) return false;
		
		util.DataMap.setValue(app, "dmReqSelRowSub", "strSbCd", vsSbCd);
		util.DataMap.setValue(app, "dmReqSelRowSub", "strSbNm", vsSbNm);
		util.DataMap.setValue(app, "dmReqSelRowSub", "strRefKey", vsRefKey);
		util.DataMap.setValue(app, "dmReqSelRowSub", "strCmpDivRcd", vsCmpDivRcd);
		
		// 재수강인스턴스값 초기화
		util.DataMap.setValue(app, "dmReqSelRowSub", "strReTlsnSchYearRcd", "");
		util.DataMap.setValue(app, "dmReqSelRowSub", "strReTlsnSmtRcd", "");
		util.DataMap.setValue(app, "dmReqSelRowSub", "strReTlsnSbCd", "");
		util.DataMap.setValue(app, "dmReqSelRowSub", "strReTlsnDivRcd", "");
		util.DataMap.setValue(app, "dmReqSelRowSub", "strReCmpDivRcd", "");
		
		//strCommand: doCheckRetake 
		util.Submit.send(app, "subReTlsnChk", function(pbSuccess){
			if(pbSuccess){
				
				// 재수강 확인
				var vnCnt = util.DataSet.getRowCount(app, "dsCandidateList");
				
				if(vnCnt > 0){
					var vsStudId = util.DataMap.getValue(app, "dmReqKey", "strStudId");
					
					moIdsForReTlsn.iStudId 		= vsStudId;
					moIdsForReTlsn.iRecCd 		= vsSbCd;
					moIdsForReTlsn.iRecNm 		= vsSbNm;
					moIdsForReTlsn.iSchYearRcd 	= vsSchYearRcd;
					moIdsForReTlsn.iSmtRcd 		= vsSmtRcd;
					moIdsForReTlsn.iRefKey 		= vsRefKey;
					moIdsForReTlsn.iCmpDivRcd	= vsCmpDivRcd;
					moIdsForReTlsn.iKeyDate 	= vsEndDt;
					
					ExtPopUp.openLayeredPopup("/xtm/cgd/extCgdPReTlsn.xtm", 700, 280);
					
				}else {
					
					// 관리자 수강신청 체크
					doAdminCourseRegistration(null, function(pbSuccess) {
						if (pbSuccess){
							// 조회
							doList(function(pbSuccess) {
								// "수강신청되었습니다." header 메세지 표시
								if (pbSuccess) util.Msg.notify(app, "NLS.CCR.M001");
							});
						}
					});
				}
			}
		});
	};
	
	/**
	 * @desc 재수강대상 콜백함수 - 선택닫기
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 20
	 */
	moPage.callbackReTlsnPopup= function(paRtnValue){
		// [0]재수강학년도, [1]재수강학기, [2]재수강과목코드, [3]재수강과목명, [4]재수강구분
		
		if(mbAply){
			util.DataMap.setValue(app, "dmReqSelRowSub", "strReTlsnSchYearRcd", paRtnValue[0]);
			util.DataMap.setValue(app, "dmReqSelRowSub", "strReTlsnSmtRcd", paRtnValue[1]);
			util.DataMap.setValue(app, "dmReqSelRowSub", "strReTlsnSbCd", paRtnValue[2]);
			util.DataMap.setValue(app, "dmReqSelRowSub", "strReTlsnDivRcd", paRtnValue[4]);
			util.DataMap.setValue(app, "dmReqSelRowSub", "strReCmpDivRcd", paRtnValue[5]);
			
			// 관리자 수강신청 체크
			doAdminCourseRegistration(null, function(pbSuccess) {
				if (pbSuccess){
					// 조회
					doList(function(pbSuccess) {
						// "수강신청되었습니다." header 메세지 표시
						if (pbSuccess) util.Msg.notify(app, "NLS.CCR.M001");
					});
				}
			});		
		}else {
			// 신청내역 재수강연결
			doSave(paRtnValue);
		}
		
		mbAply = true;
	};
	
	/**
	 * @desc 재수강대상 콜백함수 - 화면닫기
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 20
	 */
	moPage.callbackReTlsnPopupCancel= function(){
		// "처리가 취소되었습니다." Header 메시지 표시
		util.Msg.notify(app, "NLS.INF.M013");
		
//		if(mbAply){
//			// 관리자 수강신청 체크
//			moPage.doAdminCourseRegistration(null, function(pbSuccess) {
//				if (pbSuccess){
//					// 조회
//					moPage.doList(function(pbSuccess) {
//						// "수강신청되었습니다." header 메세지 표시
//						if (pbSuccess) Common.setMsgStatus(NLS.CCR.M001);
//					});
//				}
//			});
//		}
		
		mbAply = true;
	};
	
	/**
	 * @desc 수강신청
	 * @param poCallBackFunc 콜백정의
	 * @return void
	 * @author 박갑수 at 2016. 4. 20
	 */
	function doAdminCourseRegistration(pnStep, poCallBackFunc) {
		if(ValueUtil.isNull(pnStep)){
			pnStep = "0";
		}
		
		util.DataMap.setValue(app, "dmReqKey", "intStep", pnStep);
		
		//strCommand: doAdminCourseRegistration 
		util.Submit.send(app, "subDoAdminCourceReg", function(pbSuccess){
			if(pbSuccess){
				
				var vsMsg = util.DataMap.getValue(app, "dmInteractiveMsg", "strMsg");
				if(!ValueUtil.isNull(vsMsg)){
					// @\n 무시하고 계속하시겠습니까?
					if(util.Msg.confirm("NLS-CRM-M027", [vsMsg]) ){
						var vnStep = util.DataMap.getValue(app, "dmInteractiveMsg", "intStep");
						
						return page.doAdminCourseRegistration(vnStep, poCallBackFunc);
					}else {
						return false;
					}
				}else {
					if(util.isFunc(poCallBackFunc)) poCallBackFunc(true);
				}
			} else {
				return false;
			}
		});
	};
	
	/**
	 * @desc [rdBtnPlanPaperDtl]강의계획서 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 20
	 */
	moPage.onClick_RdBtnPlanPaperDtl = function() {
		var vsKeyDate = util.DataMap.getValue(app, "dmKeyDateMap", "END_DT");
		var vsSchYearRcd = util.Control.getValue(app, "cbbSchYearRcd");
		var vsSmtRcd = util.Control.getValue(app, "cbbSmtRcd");
		var vsSaCd = util.Grid.getCellValue(app, "grdCcrTlsnReq", "SA_CD");
		var vsRefKey = util.Grid.getCellValue(app, "grdCcrTlsnReq", "REF_KEY");
		
		// 강의계획서 출력
		var voParam = {
				p_strLanDivRcd 			: msDefaultLocale	 			 // 언어키
			  ,	p_strKeyDate 			: vsKeyDate	  					 // 기준일
			  ,	p_strSchYearRcd		: vsSchYearRcd  				 // 학년도
			  ,	p_strSmtRcd 				: vsSmtRcd  						 // 학기
			  ,	p_strSaCd	 				: vsSaCd  							 // 부서코드
			  ,	p_strRefKey 				: vsRefKey							 // 교과목참조키
			  ,	p_strCheckAuthId 		: moUserInfo.id					 // 사용자ID
		};
				
		var voOzFormParam = {
				  TITLE : "강의계획서" 			//리포트타이틀
				, SUB_TITLE : "서브타이틀" 		//리포트서브타이틀		
				, FORM_TYPE : "flash"
		};	
				
		ReportUtil.fOzPopupOpen("강의계획서", "stdNcsSCurPrt04", voOzFormParam, voParam);
	};
	
	/**
	 * @desc [rdBtnCancelButtonDtl]취소 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 20
	 */
	moPage.onClick_RdBtnCancelButtonDtl = function() {
		var vnIdx = util.Grid.getIndex(app, "grdCcrTlsnReq");
		
		// 수강취소 인스턴스 초기화
		util.DataMap.setValue(app, "dmReqSelRow", "strXcpDivRcd", "");
		util.DataMap.setValue(app, "dmReqSelRow", "strRefKey", "");
		util.DataMap.setValue(app, "dmReqSelRow", "strTlsnRefKey", "");
		
		var vsRefKey = util.Grid.getCellValue(app, "grdCcrTlsnReq", "REF_KEY", vnIdx);
		var vsTlsnRefKey = util.Grid.getCellValue(app, "grdCcrTlsnReq", "TLSN_REF_KEY", vnIdx);
		
		// 수강구분이 수강취소[CL20202]가 아닌경우만 취소사유팝업
		var vsTlsnDivRcd = util.Grid.getCellValue(app, "grdCcrTlsnReq", "TLSN_DIV_RCD", vnIdx);
		if(ValueUtil.fixNull(vsTlsnDivRcd) != "CL20202"){
			
			util.DataMap.setValue(app, "dmReqSelRow", "strRefKey", vsRefKey);
			util.DataMap.setValue(app, "dmReqSelRow", "strTlsnRefKey", vsTlsnRefKey);
			
			ExtPopUp.openLayeredPopup("/xtm/ccr/stdCcrPXcpDivRcd.xtm", 270, 100);
		}
	};

	/**
	 * @desc 취소사유 콜백함수 - 선택닫기
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 20
	 */
	moPage.callbackXcpDivRcdPopup= function(psRtnValue){
		
		util.DataMap.setValue(app, "dmReqSelRow", "strXcpDivRcd", psRtnValue);
		
		// 관리자 수강취소
		doAdminCourseCancellation(null, function(pbSuccess) {
			if (pbSuccess){
				// 조회
				doList(function(pbSuccess) {
					// "수강신청취소되었습니다." header 메세지 표시
					if (pbSuccess) util.Msg.notify(app, "NLS.CCR.M002");
				});
			}
		});
	};
	
	/**
	 * @desc 수강취소
	 * @param poCallBackFunc 콜백정의
	 * @return void
	 * @author 박갑수 at 2016. 4. 20
	 */
	function doAdminCourseCancellation(pnStep, poCallBackFunc) {
		if(ValueUtil.isNull(pnStep)){
			pnStep = "0";
		}
		
		util.DataMap.setValue(app, "dmReqKey", "intStep", pnStep);
		
		//strCommand: doAdminCourseCancellation 
		util.Submit.send(app, "subDoAdminCourceCancel", function(pbSuccess){
			if(pbSuccess){
				
				var vsMsg = util.DataMap.getValue(app, "dmInteractiveMsg", "strMsg");
				if(!ValueUtil.isNull(vsMsg)){
					// @\n 무시하고 계속하시겠습니까?
					if(util.Msg.confirm("NLS-CRM-M027", [vsMsg]) ){
						var vnStep = util.DataMap.getValue(app, "dmInteractiveMsg", "intStep");
						
						return doAdminCourseCancellation(vnStep, poCallBackFunc);
					}else {
						return false;
					}
				}else {
					if(util.isFunc(poCallBackFunc)) poCallBackFunc(true);
				}
			} else {
				return false;
			}
		});
	};
	
	/**
	 * @desc 취소사유 콜백함수 - 화면닫기
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 20
	 */
	moPage.callbackXcpDivRcdPopupCancel= function(){
		// "처리가 취소되었습니다." Header 메시지 표시
		util.Msg.notify(app, "NLS.INF.M013");
	};
	
	/**
	 * @desc [rdBtnPlanPaper]취득학점조회 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 20
	 */
	moPage.onClick_BtnGetPntSch = function() {
		var vsStudId = util.DataMap.getValue(app, "dmReqKey", "strStudId");
		moStudRecCmpPopup.strStudId = vsStudId;
				
		var vsUrl = "../../inc/ccr/extCcrSStudRecCmpList.jsp";
		var vnWidth  = 800;
	    var vnHeight = 700;
	    var vnTop    = (window.screen.availHeight - vnHeight) / 2;
	    var vnLeft   = (window.screen.availWidth - vnWidth) / 2;
		
		 if (vnTop < 0) vnTop = 0;
	     if (vnLeft < 0) vnLeft = 0;
		
		var vsOption = "menubar=0,resizable=yes,scrollbars=yes,status=0,top="+vnTop+",left="+vnLeft+",width="+vnWidth+",height="+vnHeight;
		
		window.open(vsUrl, "extCcrSStudRecCmpList",  vsOption);
	};
	
	/**
	 * @desc [btnNPassSubjSch]미이수과목조회 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 20
	 */
	moPage.onClick_BtnNPassSubjSch = function() {
		var vsSchYearRcd = util.Control.getValue(app, "cbbSchYearRcd");
		var vsSmtRcd = util.Control.getValue(app, "cbbSmtRcd");
		var vsSaCdIn = "('" + util.DataMap.getValue(app, "dmReqKey", "strSaCd") + "')";
		
		var voParam = {
				p_strLanDivRcd 		: msDefaultLocale,															// 언어키
				p_strKeyDate 		: util.DataMap.getValue(app, "dmKeyDateMap", "END_DT"),		// 기준일자
				p_strSchYearRcd 	: vsSchYearRcd,															// 학년도코드
				p_strSmtRcd 			: vsSmtRcd,																	// 학기코드
				p_strListSaCd		: vsSaCdIn,																	// 학사부서코드 In조건용
				p_strCheckAuthId 	: moUserInfo.id,																// 사용자ID
				p_strStudId             : util.DataMap.getValue(app, "dmReqKey", "strStudId")				// 학번
				
		};
		
		var vsTitle = "필수과목 미이수자 명단";
		
		var voOzFormParam = {
			  TITLE 		 : vsTitle			// 리포트타이틀
			, SUB_TITLE 	 : "" 					// 리포트서브타이틀		
			, FORM_TYPE : "flash"
		};
		
		ReportUtil.fOzPopupOpen("필수과목 미이수자 명단", "extCgdSMandNcmpIqy", voOzFormParam, voParam);
	};
	
	/**
	 * @desc [rdBtnReTlsnSbNmDtl]재수강교과목명 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 20
	 */
	moPage.onClick_RdBtnReTlsnSbNmDtl = function() {
		// 신청시 사용하는 재수강 아님
		mbAply = false;
		
		var vnIdx = util.Grid.getIndex(app, "grdCcrTlsnReq");
		
		//  수강구분 : 수강취소[CL20202]가 아닐경우 재수강목록 조회
		var vsTlsnDivRcd = util.Grid.getCellValue(app, "grdCcrTlsnReq", "TLSN_DIV_RCD", vnIdx);
		if(ValueUtil.fixNull(vsTlsnDivRcd) != "CL20202"){
			var vsSbCd = util.Grid.getCellValue(app, "grdCcrTlsnReq", "SB_CD", vnIdx);
			var vsSbNm = util.Grid.getCellValue(app, "grdCcrTlsnReq", "SB_CD_NM", vnIdx);
			var vsRefKey = util.Grid.getCellValue(app, "grdCcrTlsnReq", "REF_KEY");
			var vsCmpDivRcd = util.Grid.getCellValue(app, "grdCcrTlsnReq", "CMP_DIV_RCD");
			
			// 개설과목에서의 재수강체크 인스턴스 활용
			util.DataMap.setValue(app, "dmReqSelRowSub", "strSbCd", vsSbCd);
			util.DataMap.setValue(app, "dmReqSelRowSub", "strSbNm", vsSbNm);
			util.DataMap.setValue(app, "dmReqSelRowSub", "strRefKey", vsRefKey);
			util.DataMap.setValue(app, "dmReqSelRowSub", "strCmpDivRcd", vsCmpDivRcd);
			
			//strCommand: doCheckRetake 
			util.Submit.send(app, "subReTlsnChk", function(pbSuccess){
				if(pbSuccess){
					
					// 재수강 확인
					var vnCnt = util.DataSet.getRowCount(app, "dsCandidateList");
					
					if(vnCnt > 0){
						var vsStudId = util.DataMap.getValue(app, "dmReqKey", "strStudId");
						var vsSchYearRcd = util.DataMap.getValue(app, "dmKeyDateMap", "YEAR");
						var vsSmtRcd = util.DataMap.getValue(app, "dmKeyDateMap", "SMT");
						var vsEndDt = util.DataMap.getValue(app, "dmKeyDateMap", "END_DT");
						
						moIdsForReTlsn.iStudId 			= vsStudId;
						moIdsForReTlsn.iRecCd 		= vsSbCd;
						moIdsForReTlsn.iRecNm 		= vsSbNm;
						moIdsForReTlsn.iSchYearRcd = vsSchYearRcd;
						moIdsForReTlsn.iSmtRcd 		= vsSmtRcd;
						moIdsForReTlsn.iRefKey 		= vsRefKey;
						moIdsForReTlsn.iCmpDivRcd 	= vsCmpDivRcd;
						moIdsForReTlsn.iKeyDate 		= vsEndDt;
						
						ExtPopUp.openLayeredPopup("/xtm/cgd/extCgdPReTlsn.xtm", 700, 280);
						
					}
				}
			});
		}
	};
	
	/**
	 * @desc 신청내역 변경사항 저장
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 25
	 */
	function doSave(paRtnValue) {
		var vnIdx = util.Grid.getIndex(app, "grdCcrTlsnReq");
		
		// [0]재수강학년도, [1]재수강학기, [2]재수강과목코드, [3]재수강과목명, [4]재수강구분
		util.Grid.setCellValue(app, "grdCcrTlsnReq", "RE_TLSN_SCH_YEAR_RCD", paRtnValue[0], vnIdx);
		util.Grid.setCellValue(app, "grdCcrTlsnReq", "RE_TLSN_SMT_RCD", paRtnValue[1], vnIdx);
		util.Grid.setCellValue(app, "grdCcrTlsnReq", "RE_TLSN_SB_CD", paRtnValue[2], vnIdx);
		util.Grid.setCellValue(app, "grdCcrTlsnReq", "RE_TLSN_SB_CD_NM", paRtnValue[3], vnIdx);
		util.Grid.setCellValue(app, "grdCcrTlsnReq", "RE_TLSN_DIV_RCD", paRtnValue[4], vnIdx);
		
		util.Grid.setRowState(app, "grdCcrTlsnReq", cpr.data.tabledata.RowState.UPDATED, vnIdx);
		
		// 저장
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
	 * @desc [btnSaCd]학사부서명(돋보기) onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 25
	 */
	moPage.onClick_BtnSaCd = function(sender) {
		// 객체검색팝업 호출
		doOnClickStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc [ipbSaNm]학사부서명 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 25
	 */
	moPage.onValueChanged_IpbSaNm = function(sender) {
		// 값변경시 객체검색팝업 호출
		doOnChangeStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc [ckbTLsnCancel]수강취소포함 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 7. 11
	 */
	moPage.onValueChanged_CkbTLsnCancel = function() {
		// 조회
		doList(function(pbSuccess) {
			// 조회 : "조회되었습니다." header 메세지 표시
			if (pbSuccess) util.Msg.notify(app, "NLS.INF.M024");
		});
	};
	
	
	/*
		수강신청 변경원
	*/
	moPage.onClick_BtnNPassSubjSch1 = function() {
		
		var vsSchYearRcd = util.Control.getValue(app, "cbbSchYearRcd");
		var vsSmtRcd = util.Control.getValue(app, "cbbSmtRcd");
		var vsSaCdIn = "('" + util.DataMap.getValue(app, "dmReqKey", "strStudSaCd") + "')";
		
		var voParam = {
						p_strLanDivRcd 		: util.DataMap.getValue(app, "dmResOnLoad", "strLanDivRcd"),				// 언어키
						p_strKeyDate 		: util.DataMap.getValue(app, "dmKeyDateMap", "END_DT"),					// 기준일자
						p_strSchYearRcd 	: vsSchYearRcd,																		// 학년도코드
						p_strSmtRcd 			: vsSmtRcd,																				// 학기코드
						p_strListSaCd		: vsSaCdIn,						// 학사부서코드 In조건용
						p_strCheckAuthId 	: moUserInfo.id,																			// 사용자ID
						p_strGradeRcd		: "", 									// 학년
						p_strClassRcd		: "", 					// 반
						p_strStudNo			: util.DataMap.getValue(app, "dmReqKey", "strStudId")				        // 학번
				};
		
		var vsTitle = "수강신청확인 및 변경원";
				
		var voOzFormParam = {
			  TITLE 		 : vsTitle			// 리포트타이틀
			, SUB_TITLE 	 : "" 					// 리포트서브타이틀		
			, FORM_TYPE : "flash"
		};
		
		ReportUtil.fOzPopupOpen("수강신청확인 및 변경원", "extCcrSTlsnAplyCnfmSheet", voOzFormParam, voParam);
	}
	return moPage;
};
