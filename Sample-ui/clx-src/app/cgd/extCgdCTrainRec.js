//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCgdCTrainRec.xtm"/>

/**
 * 해외연수성적입력
 * @class extCgdCTrainRec
 * @author 박갑수 at 2016. 5. 25
 */
var extCgdCTrainRec = function() {
	var moPage = new Page();
	
	// 임포트용 데이터 통신 오브젝트
	var moPObject = new Page();
	
	// 교과목검색팝업 호출
	moPObject.moIdsForStdCcsPSubPopup = [
	{
		 controlId					: "btnSbCd",			
		 iEndYn						: "",						
		 iLanDivRcd				: "/root/resOnLoad/strLanDivRcd",					
		 iKeyDate					: "/root/keyDateMap/ST_DT",		
		 iSbCd						: "",			
		 iSbNm						: "ipbSbNm",
		 iCmpDivRcd				: "", 			
		 iSpvsDeptCd				: "",		
		 iSpvsDeptNm			: "",		
		 iObjDivRcd				: "",
		 oSbCd						: "ipbSbCd",			
		 oObjDivRcd				: "",
		 oStDt						: "",
		 oEndDt						: "",
		 oLanDivRcd				: "",
		 oRefKey					: "",
		 oSbNm					: "ipbSbNm",			
		 oShortNm					: "",			
		 oSbCatRcd				: "",			
		 oSbDivRcd				: "",			
		 oPnt							: "/root/reqKey/strPnt",
		 oTheoTc					: "",		
		 oEpacTc					: "",	
		 oSpvsColgCd			: "",			
		 oSpvsDeptCd			: "",			
		 oSpvsDeptNm			: "",		
		 oCmpDivRcd				: "/root/reqKey/strCmpDivRcd",			
		 oRecScaleRcd			: "",
		 oSbTypeRcd				: "",
		 oSbLvlRcd				: "",
		 oEvalMethodRcd		: "",
		 oLectTypeRcd			: "",
		 oSbSmry					: "",
		 oRegFeeXcpYn			: "",
		 oSbAmt					: "",
		 oCmpDivRcdNm		: "",
		 oSbCatRcdNm			: "",
		 oReTlsnYnRcd			: "",
		 func : function(poParam) {
		}
	 }];
	 
	 /**
	 * @desc import 헤더 초기화
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 5. 25
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		// import 헤더 초기화
		doHeaderOnLoad();
	};
	
	/**
	 * @desc onLoad 실행
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 25
	 */
	moPage.onModelConstructDone_ExtCgdCTrainRec = function() {
		// 리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["rptCgdRec"]);
		// 검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grpData"], ["grpSearch1"]);
		
		// 서브미션 호출
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				
				util.Control.redraw(app, ["cbbStSchYearRcd", "cbbStSmtRcd", "cbbEndSchYearRcd", "cbbEndSmtRcd", "cbbDspNatRcd",  "cbbSchYearRcd"]);
				
				// 컨트롤 Default 값 설정
				util.Control.setValue(app, "dipStDt", util.DataMap.getValue(app, "dmKeyDateMap", "ST_DT"));
				util.Control.setValue(app, "dipEndDt", util.DataMap.getValue(app, "dmKeyDateMap", "END_DT"));
				
				util.Control.setValue(app, "cbbSchYearRcd", util.DataMap.getValue(app, "dmKeyDateMap", "YEAR"));
				util.Control.setValue(app, "cbbSmtRcd", "CA00380");		// 해외연수학기[CA00380]
				
				//ExtControl.setValue("cbbStSchYearRcd", ExtInstance.getValue("/root/keyDateMap/YEAR"));
				//ExtControl.setValue("cbbEndSchYearRcd", ExtInstance.getValue("/root/keyDateMap/YEAR"));
				
				//ExtControl.setValue("cbbStSmtRcd", ExtInstance.getValue("/root/keyDateMap/SMT"));
				//ExtControl.setValue("cbbEndSmtRcd", ExtInstance.getValue("/root/keyDateMap/SMT"));
				
				
				util.Control.setFocus(app, "dipStDt");
			}
		}, true);
	};
	
	/**
	 * @desc [dipStDt]시작일자 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 25
	 */
	moPage.onValueChanged_DipStDt = function() {
		if(!doCheckDate("ST_DT")){
			util.Control.setValue(app, "dipStDt", "");
		}
	};
	
	/**
	 * @desc [dipEndDt]종료일자 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 25
	 */
	moPage.onValueChanged_DipEndDt = function() {
		if(!doCheckDate("END_DT")){
			util.Control.setValue(app, "dipEndDt", "");
		}
	};
	
	/**
	 * @desc 시작일이 종료일보다 크거나 종료일이 시작일보다 작은지 검사
	 * @param psColNm		(필수) 날짜컬럼명
	 * @return boolean
	 * @author 박갑수 at 2016. 5. 25
	 */
	function doCheckDate(psColNm){
		// 유효성 true or false
		var vbValid = true;

		// 시작일자
		var vsStDt = util.Control.getValue(app, "dipStDt").substring(0, 8);
		// 종료일자
		var vsEndDt = util.Control.getValue(app, "dipEndDt").substring(0, 8);
		
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
	 * @desc [cbbStSchYearRcd]파견시작학년도 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 25
	 */
	moPage.onValueChanged_CbbStSchYearRcd = function() {
		// 학년도, 학기 유효성체크
		if(!doCheckYearSmt()){
			util.Control.setValue(app, "cbbStSchYearRcd", "");
		}
	};
	
	/**
	 * @desc [cbbStSmtRcd]파견시작학기 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 25
	 */
	moPage.onValueChanged_CbbStSmtRcd = function() {
		// 학년도, 학기 유효성체크
		if(!doCheckYearSmt()){
			util.Control.setValue(app, "cbbStSmtRcd", "");
		}
	};
	
	/**
	 * @desc [cbbEndSchYearRcd]파견종료학년도 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 25
	 */
	moPage.onValueChanged_CbbEndSchYearRcd = function() {
		// 학년도, 학기 유효성체크
		if(!doCheckYearSmt()){
			util.Control.setValue(app, "cbbEndSchYearRcd", "");
		}
	};
	
	/**
	 * @desc [cbbEndSmtRcd]파견종료학기 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 25
	 */
	moPage.onValueChanged_CbbEndSmtRcd = function() {
		// 학년도, 학기 유효성체크
		if(!doCheckYearSmt()){
			util.Control.setValue(app, "cbbEndSmtRcd", "");
		}
	};
	
	/**
	 * @desc 시작학년도학기, 종료학년도학기 유효성 체크
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 25
	 */
	function doCheckYearSmt(){
		// 유효성 true or false
		var vbValid = true;
		
		// 시작학년도
		var vsStYear = util.Control.getValue(app, "cbbStSchYearRcd").substring(5);
		// 종료학년도
		var vsEndYear = util.Control.getValue(app, "cbbEndSchYearRcd").substring(5);
		
		// 시작학기
		var vsStSmt = util.Control.getValue(app, "cbbStSmtRcd").substring(5);
		// 종료학기
		var vsEndSmt = util.Control.getValue(app, "cbbEndSmtRcd").substring(5);
		
		// 시작학년도 종료학년도가 입력되었을경우
		if(!ValueUtil.isNull(vsStYear) && !ValueUtil.isNull(vsEndYear)){
			// 시작학년도가 클경우
			if(Number(vsStYear) > Number(vsEndYear)){
				var vsStYearTitle = ExtControl.getTextValue("lblStSchYearRcd");
				var vsEndYearTitle = ExtControl.getTextValue("lblEndSchYearRcd");
				
				// "@은(는) @보다 클수 없습니다." 메시지
				util.Msg.alert("NLS-WRN-M052", [vsStYearTitle, vsEndYearTitle]);
				vbValid = false;
				return vbValid;
				
			}else if(Number(vsStYear) == Number(vsEndYear)){
				
				// 시작학기, 종료학기가 입력되었을경우
				if(!ValueUtil.isNull(vsStSmt) && !ValueUtil.isNull(vsEndSmt)){
					// 시작학기가 클경우
					if(Number(vsStSmt) > Number(vsEndSmt)){
						var vsStSmtTitle = ExtControl.getTextValue("lblStSmtRcd");
						var vsEndSmtTitle = ExtControl.getTextValue("lblEndSmtRcd");
						
						// "@은(는) @보다 클수 없습니다." 메시지
						util.Msg.alert("NLS-WRN-M052", [vsStSmtTitle, vsEndSmtTitle]);
						vbValid = false;
						return vbValid;
					}
				}
			}
		}
		
		return vbValid;
	};
	
	/**
	 * @desc [btnSbCd]해외연수 교과목(돋보기버튼) onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 25
	 */
	moPage.onClick_BtnSbCd = function(sender) {
		// 교과목검색팝업 호출
		doOnClickStdCcsPSubPopup(sender);
	};
	
	/**
	 * @desc [ipbSbNm]해외연수 교과목 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 25
	 */
	moPage.onValueChanged_IpbSbNm = function(sender) {
		// 값변경시 교과목검색팝업 호출
		doOnChangeStdCcsPSubPopup(sender);
	};

	/**
	 * @desc [btnSearch]조회 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 25
	 */
	moPage.onClick_BtnSearch = function() {
		 // 작업영역 리피트 변경 내역 체크
		if(util.Grid.isModified(app, "", "CRM")){
			return false;
		}
		
		// 조회조건 필수 체크
		if(!util.validate(app, ["dipStDt", "dipEndDt", "cbbSchYearRcd", "cbbSmtRcd", "ipbSbNm"])){
			return false;
		}
		
		// 조회
		doList(function(pbSuccess) {
			// 조회 : "조회되었습니다." header 메세지 표시
			if (pbSuccess) util.Msg.notify(app, "NLS.INF.M024");
		});
	};

	/**
	 * @desc 해외연수명단 조회
	 * @param poCallBackFunc 콜백정의
	 * @return void
	 * @author 박갑수 at 2016. 5. 25
	 */
	function doList(poCallBackFunc) {
		
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdCgdRec");
				
				// 조회 후 콜백함수 수행
				if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess); 
			}
		});
	};
	
	/**
	 * @desc [btnDel]삭제 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 25
	 */
	moPage.onClick_BtnDel = function() {
		// 해당 리피트 delete
		util.Grid.deleteRow(app, "grdCgdRec");
	};
	
	/**
	 * @desc [btnRestore]작업취소 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 25
	 */
	moPage.onClick_BtnRestore = function() {
		// 해당 리피트 상태 초기화
		util.Grid.restoreRow(app, "grdCgdRec");
	};

	/**
	 * @desc [rdCbbGrdRcd]등급 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 25
	 */
	moPage.onValueChanged_RdCbbGrdRcd = function() {
		// 삭제상태일경우 Skip
		var vsUptStatus = util.Grid.getCellValue(app, "grdCgdRec", "UPT_STATUS");
		if(ValueUtil.fixNull(vsUptStatus) != "D"){
			
			util.DataMap.setValue(app, "dmReqSelRow", "strStudId", util.Grid.getCellValue(app, "grdCgdRec", "STUD_ID"));
			util.DataMap.setValue(app, "dmReqSelRow", "strPgmKey", util.Grid.getCellValue(app, "grdCgdRec", "PGM_KEY"));
			
			// 등급 변경시 기존 성적 데이터 체크
			doCgdRecChk(function(pbSuccess) {
				
				// 다른 해외연수프로그램에대한 기존성적이 존재할경우 Y
				var vsCgdRecYn = util.DataMap.getValue(app, "dmResList", "strCgdRecYn");
				
				if(ValueUtil.fixNull(vsCgdRecYn) == "Y"){
					
					// 이미 부여된 성적이 있습니다. 이전성적을 취소하고 다시 부여하시겠습니까?
					if(!util.Msg.confirm("NLS-CRM-M089") ){
						// 해당 리피트 상태 초기화
						util.Grid.restoreRow(app, "grdCgdRec");
						util.Grid.setCellValue(app, "grdCgdRec", "FLAG_GBN", "");
					}else {
						util.Grid.setCellValue(app, "grdCgdRec", "FLAG_GBN", "P");
					}
				}
			});
		}
	};
	
	/**
	 * @desc 기존 성적 데이터 체크
	 * @param poCallBackFunc 콜백정의
	 * @return voidㅈ3ㅈ
	 * @author 박갑수 at 2016. 5. 25
	 */
	function doCgdRecChk(poCallBackFunc) {
		
		//strCommand: cgdRecChk 
		util.Submit.send(app, "subCgdRecChk", function(pbSuccess){
			if(pbSuccess){				
				// 조회 후 콜백함수 수행
				if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess); 
			}
		});
	};
	
	/**
	 * @desc [btnSave]작업저장 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 25
	 */
	moPage.onClick_BtnSave = function() {
		doSave();
	};
	
	/**
	 * @desc 해외연수명단 변경사항 저장
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 25
	 */
	function doSave() {
		
		// 리피트 변경사항 체크
		if(!util.Grid.isModified(app, ["grdCgdRec"], "MSG")){
			return false;
		}
		
		// 저장조건 필수 체크
		if(!util.validate(app, ["cbbSchYearRcd", "cbbSmtRcd", "ipbSbNm"])){
			return false;
		}
		
		// 저장전 중복체크
		if(!doChkOverlap()){
			return false;
		}

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
	 * @desc 해외연수명단 중복체크
	 * @param 
	 * @return boolean
	 * @author 박갑수 at 2016. 5. 25
	 */
	function doChkOverlap(){
		// 유효성 true or false
		var vbValid = true;

		var vnRowCnt = util.Grid.getRowCount(app, "grdCgdRec");
		
		for(var i=0; i<vnRowCnt; i++){
			var vnIdxOri = i+1;
			
			var vsStatus = util.Grid.getRowState(app, "grdCgdRec", vnIdxOri);
			// 변경상태가 있고 Delete가 아닐경우 체크
			if(!ValueUtil.isNull(vsStatus) && ValueUtil.fixNull(vsStatus) != "delete"){
				
				var vsStudIdOri = util.Grid.getCellValue(app, "grdCgdRec", "STUD_ID", vnIdxOri);
				var vsGrdRcdOri =  util.Grid.getCellValue(app, "grdCgdRec", "GRD_RCD", vnIdxOri);
				var vsFlagGbnOri = util.Grid.getCellValue(app, "grdCgdRec", "FLAG_GBN", vnIdxOri);
				
				for(var j=0; j<vnRowCnt; j++){
					var vnIdx = j+1;
					
					// 삭제일경우 제외
					var vsUptStatus = util.Grid.getCellValue(app, "grdCgdRec", "UPT_STATUS", vnIdx);
					if(ValueUtil.fixNull(vsUptStatus) == "D") continue;
					// 자기자신일경우 제외
					if(vnIdxOri == vnIdx) continue;
					
					var vsStudId =util.Grid.getCellValue(app, "grdCgdRec", "STUD_ID", vnIdx);
					var vsGrdRcd =util.Grid.getCellValue(app, "grdCgdRec", "GRD_RCD", vnIdx);
					var vsFlagGbn = util.Grid.getCellValue(app, "grdCgdRec", "FLAG_GBN", vnIdx);
					
					// 같은 학생일경우 등급이 두번 입력되었는지 비교
					if(vsStudIdOri == vsStudId && !ValueUtil.isNull(vsGrdRcdOri) && !ValueUtil.isNull(vsGrdRcd) && ValueUtil.fixNull(vsFlagGbnOri) != "P" && ValueUtil.fixNull(vsFlagGbn) != "P"){
						var vsRepNm = util.Grid.getCellValue(app, "grdCgdRec", "REP_NM", vnIdx);
						// @ 학생의 해외연수 성적은 한번만 입력 가능합니다.(@번째, @번째)\n데이터를 확인해 주십시오.
						util.Msg.alert("NLS-CGD-EXT001", [vsRepNm , vnIdxOri, vnIdx]);
						
						vbValid = false;
						return vbValid;
					}
				}
			}
		}
		
		return vbValid;
	};
	
	return moPage;
};
