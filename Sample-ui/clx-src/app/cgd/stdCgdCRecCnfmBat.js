//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./stdCgdCRecCnfmBat.xtm"/>

/**
 * 성적확정
 * @class stdCgdCRecCnfmBat
 * @author 박갑수 at 2016. 3. 31
 */
var stdCgdCRecCnfmBat = function() {
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
		iKeyDate 					: "/root/keyDateMap/ST_DT", 
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
		oProcRsltYear 			: "",
		oSaNm						: "ipbSaNm",
		oSaCd 						: "/root/reqKey/strSaCd",
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
			var vsSchYearRcd = util.Control.getValue(app, "cbbSchYearRcd");
			var vsSmtRcd = util.Control.getValue(app, "cbbSmtRcd");
			var vsStudId = util.Control.getValue(app, "ipbStudId");
			var vsSaNm = util.Control.getValue(app, "ipbSaNm");
			// 검색조건있을경우 바로조회
			if(!ValueUtil.isNull(vsSchYearRcd) && !ValueUtil.isNull(vsSmtRcd) && !ValueUtil.isNull(vsStudId) && !ValueUtil.isNull(vsSaNm)){
				util.Control.setEnable(app, true, ["grpData"]);
			}
		}
	}];
	
	// 객체검색팝업 호출
	moPObject.moIdsForStdCmnPObjSch = [
	{
		controlId			:	"btnSaCd",
		iCd					:	"",
		iNm					:	"ipbSaNm",
		iObjDivRcd			:	["CC009SA", "CC009OG"],
		iStartObject    	:   "",
		iOtDivRcd			:	"",
		iOtIsTreeView	:	"",
		iLanDivRcd		:	"",
		iKeyDate			:	"/root/keyDateMap/ST_DT",
		oObjDivRcd		:	"/root/reqKey/strObjDivRcd",
		oCd					:	"/root/reqKey/strSaCd",
		oCdNm				:	"ipbSaNm",
		oBegDt				:	"",
		oEndDt				:	"",
		oLanDivRcd		:	"",
		func 					:  function(){
			var vsSchYearRcd = util.Control.getValue(app, "cbbSchYearRcd");
			var vsSmtRcd = util.Control.getValue(app, "cbbSmtRcd");
			var vsSaNm = util.Control.getValue(app, "ipbSaNm");
			// 검색조건있을경우 바로조회
			if(!ValueUtil.isNull(vsSchYearRcd) && !ValueUtil.isNull(vsSmtRcd) && !ValueUtil.isNull(vsSaNm)){
				util.Control.setEnable(app, true, ["grpData"]);
			}
		}
	}];
	
	// 학년도 학기를 원래데이터로 되돌리기위한 변수
	var msSchYearRcd = "";
	var msSmtRcd = "";
	
	/**
	 * @desc import 헤더 초기화
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 3. 31
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		// import 헤더 초기화
		doHeaderOnLoad();
	};
	
	/**
	 * @desc onLoad 실행
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 31
	 */
	moPage.onModelConstructDone_StdCgdCRecCnfmBat = function() {
		// 서브미션 호출
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				
				util.Control.redraw(app, ["cbbSchYearRcd", "cbbSmtRcd"]);
			}
		}, true);
	};
	
	/**
	 * @desc [cbbSchYearRcd]학년도 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 31
	 */
	moPage.onValueChanged_CbbSchYearRcd = function() {
		// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
		doChangeYearSmt("year");
	};
	
	/**
	 * @desc [cbbSmtRcd]학기 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 31
	 */
	moPage.onValueChanged_CbbSmtRcd = function() {
		// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
		doChangeYearSmt("smt");
	};
	
	/**
	 * @desc 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 31
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
	 * @author 박갑수 at 2016. 3. 31
	 */
	moPage.onClick_BtnStudId = function(sender) {
		// 학생검색팝업 호출
		doOnClickStdCsrPStSearch(sender);
	};

	/**
	 * @desc [ipbStudId]학번 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 31
	 */
	moPage.onValueChanged_IpbStudId = function(sender) {
		// 값변경시 학생검색팝업 호출
		doOnChangeStdCsrPStSearch(sender);
	};
	
	/**
	 * @desc [btnSaCd]부서명(돋보기버튼) onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 31
	 */
	moPage.onClick_BtnSaCd = function(sender) {
		// 객체검색팝업 호출
		doOnClickStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc [ipbSaNm]부서명 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 31
	 */
	moPage.onValueChanged_IpbSaNm = function(sender) {
		// 값변경시 객체검색팝업 호출
		doOnChangeStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc [btnRecSet]성적확정 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 31
	 */
	moPage.onClick_BtnRecSet = function() {
		
		// 조회조건 필수체크
		if(!util.validate(app, ["cbbSchYearRcd", "cbbSmtRcd", "ipbSaNm"])){
			return false;
		}
		
		// 부서객체구분값이 없을경우(학생검색팝업을통해 부서를 세팅한경우) - 학사부서[CC009SA] 로 세팅
		var vsObjDivRcd = util.DataMap.getValue(app, "dmReqKey", "strObjDivRcd");
		if(ValueUtil.isNull(vsObjDivRcd)){
			util.DataMap.setValue(app, "dmReqKey", "strObjDivRcd", "CC009SA");
		}
		
		// 2016.4.1. 박갑수 - 동서울대 전체사용
		util.Control.setValue(app, "ckbTrans", "X");
		util.Control.setValue(app, "ckbGrade", "X");
		util.Control.setValue(app, "ckbWarn", "X");
		
		// 이관전 체크 : 성적이관포함, 석차계산포함, 학사경고체크
		doSaveChk(function(pbSuccess) {
			if (pbSuccess){
				// 작업저장
				doSave();
			}
		});
	};
	
	/**
	 * @desc 성적확정처리
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 16
	 */
	function doSave() {
		
		
		util.Control.setEnable(app, false, "grpData");
		
		//strCommand: save 
		util.Submit.send(app, "subSave", function(pbSuccess){
			if(pbSuccess){
				//처리되었습니다.
				util.Msg.alert("NLS-INF-M003");
				
				util.Control.setEnable(app, true, "grpData");
			}
		});
	}
	
	/**
	 * @desc  성적확정전 체크
	 * @param {Function} poCallBackFunc 콜백정의
	 * @return void
	 * @author 박갑수 at 2016. 3. 31
	 */
	function doSaveChk(poCallBackFunc) {
		//strCommand: saveChk 
		util.Submit.send(app, "subSaveChk", function(pbSuccess){
			if(pbSuccess){
				
				// [@]가 있습니다. 삭제후 재생성 하시겠습니까?
				var vsMsg = "";
				
				// 1. 성적이관포함용
				// 1.1 성적 [CGD_REC] 존재하는지 확인
				var vsRecChk = util.DataMap.getValue(app, "dmResList", "recChk");
				if(ValueUtil.fixNull(vsRecChk) == "X"){
					
					if(ValueUtil.isNull(vsMsg)){
						vsMsg = vsMsg + NLS.NSCR.RECDATA
					}else {
						vsMsg = vsMsg + "," + NLS.NSCR.RECDATA
					}
				}

				// 1.2 성적 미 입력 내용이 있는지 확인
				var vsSavePreChk = util.DataMap.getValue(app, "dmResList", "savePreChk");
				if(ValueUtil.fixNull(vsSavePreChk) == "X"){
					
					if(ValueUtil.isNull(vsMsg)){
						vsMsg = vsMsg + NLS.NSCR.NRECDATA
					}else {
						vsMsg = vsMsg + "," + NLS.NSCR.NRECDATA
					}
				}
				
				// 2. 석차계산포함용
				var vsGrade = util.DataMap.getValue(app, "dmResList", "saveGrade");
				if(ValueUtil.fixNull(vsGrade) == "X"){
					
					if(ValueUtil.isNull(vsMsg)){
						vsMsg = vsMsg + NLS.NSCR.RANKDATA
					}else {
						vsMsg = vsMsg + "," + NLS.NSCR.RANKDATA
					}
				}
				
				// 3. 학사경고포함용
				var vsWarn = util.DataMap.getValue(app, "dmResList", "saveWarn");
				if(ValueUtil.fixNull(vsWarn) == "X"){
					
					if(ValueUtil.isNull(vsMsg)){
						vsMsg = vsMsg + NLS.NSCR.WARNDATA
					}else {
						vsMsg = vsMsg + "," + NLS.NSCR.WARNDATA
					}
				}
				
				// 재생성여부 확인
				if(!ValueUtil.isNull(vsMsg)){
					// 기존 [@]이(가) 있습니다. 삭제후 재생성 하시겠습니까?
					if(!util.Msg.confirm("NLS-CRM-M080", [vsMsg]) ){
						return false;
					}
				}
				
			}
			// 콜백함수실행
			if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess); 
		});
	};
	
	return moPage;
};
