//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./stdCgdCConvGrdStd.xtm"/>

/**
 * 환산등급 기준관리
 * @class stdCgdCConvGrdStd
 * @author 박갑수 at 2016. 3. 16
 */
var stdCgdCConvGrdStd = function() {
	var moPage = new Page();
	
	/**
	 * @desc import 헤더 초기화
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 3. 16
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		// import 헤더 초기화
		doHeaderOnLoad();
	};
	
	/**
	 * @desc onLoad 실행
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 16
	 */
	moPage.onModelConstructDone_StdCgdCConvGrdStd = function() {
		
		// 리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["rptCgdConvGrdStd"]);
		// 검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grpData"]);
		
		// 서브미션 호출
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				
				util.Control.redraw(app, ["cbbRecCiiRcd"]);
				util.Control.setFocus(app, "cbbRecCiiRcd");
			}
		}, true);
	};
	
	/**
	 * @desc [btnSearch]조회 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 16
	 */
	moPage.onClick_BtnSearch = function() {
		 // 작업영역 리피트 변경 내역 체크
		if(util.Grid.isModified(app, "", "CRM")){
			return false;
		}
		
		// 조회조건 필수 체크
		if(!util.validate(app, ["cbbRecCiiRcd"])){
			return false;
		}

		// 조회
		doList(function(pbSuccess) {
			// 조회 : "조회되었습니다." header 메세지 표시
			if (pbSuccess) util.Msg.notify(app, "NLS.INF.M024");
		});
	};
	
	/**
	 * @desc  환산등급기준관리목록 조회
	 * @param {Function} poCallBackFunc 콜백정의
	 * @return void
	 * @author 박갑수 at 2016. 3. 16
	 */
	function doList(poCallBackFunc) {
		// 성적기준구분
		var vsRecCiiRcd = util.Control.getValue(app, "cbbRecCiiRcd");
		var vsCdPrp1 = ExtInstance.getValue("/root/resOnLoad/recCiiRcdList/row", "CD_PRP1" , "child::CD='"+ vsRecCiiRcd +"'");
		util.DataMap.setValue(app, "dmReqKey", "strCdPrp1", vsCdPrp1);
		
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdCgdConvGrdStd");	
				// 조회 후 콜백함수 수행
				if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess); 
			}
		});
	};
	
	/**
	 * @desc [rhCkbSelect]패널 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 16
	 */
	moPage.onValueChanged_RhCkbSelect = function() {
		// 리피트 패널 설정
//TO-BE: <ExtRepeat.selectedAllPanel> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.selectedAllPanel("rhCkbSelect");
	};
	
	/**
	 * @desc [btnNew]신규 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 16
	 */
	moPage.onClick_BtnNew = function() {
		// 해당 리피트 insert 후 편집 시작할 컬럼 지정
		var vnIdx = util.Grid.insertRow(app, "grdCgdConvGrdStd", "rdCbbGrdRcd");
		
		// 신규 Defalut값 설정 
		// 성적기준구분 : 조회조건
		var vsRecCiiRcd = util.Control.getValue(app, "cbbRecCiiRcd"); 
		util.Grid.setCellValue(app, "grdCgdConvGrdStd", "REC_CII_RCD", vsRecCiiRcd, vnIdx);
	};
	
	/**
	 * @desc [btnDel]삭제 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 16
	 */
	moPage.onClick_BtnDel = function() {
		// 해당 리피트 delete
		util.Grid.deleteRow(app, "grdCgdConvGrdStd");
	};
	
	/**
	 * @desc [btnRestore]작업취소 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 16
	 */
	moPage.onClick_BtnRestore = function() {
		// 해당 리피트 상태 초기화
		util.Grid.restoreRow(app, "grdCgdConvGrdStd");
	};
	
	/**
	 * @desc [btnSave]작업저장 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 16
	 */
	moPage.onClick_BtnSave = function() {
		// 작업저장
		doSave();
	};

	/**
	 * @desc 점수환산관리목록 변경사항 저장
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 16
	 */
	function doSave() {
		
		// 리피트 변경사항 체크
		if(!util.Grid.isModified(app, ["grdCgdConvGrdStd"], "MSG")){
			return false;
		}
		
		// 리피트 Validation Check
		if(!util.validate(app, "grdCgdConvGrdStd")) return false;

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
	 * @desc [rdIpbMaxGp]최대평점 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 16
	 */
	moPage.onValueChanged_RdIpbMaxGp = function() {
		ValidUtil.checkIntegerDecimal("rdIpbMaxGp", 1, 2, true);
		
		// 최대,최소평점 유효성체크
		if(!doChkGp("MAX_GP") || !doChkOverlap("MAX_GP", "MIN_GP", "MAX_GP")){
			util.Grid.setCellValue(app, "grdCgdConvGrdStd", "MAX_GP", "");
		}
	};
	
	/**
	 * @desc [rdIpbMinGp]최소평점 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 16
	 */
	moPage.onValueChanged_RdIpbMinGp = function() {
		ValidUtil.checkIntegerDecimal("rdIpbMinGp", 1, 2, true);
		
		// 최대,최소평점 유효성체크
		if(!doChkGp("MIN_GP") || !doChkOverlap("MIN_GP", "MIN_GP", "MAX_GP")){
			util.Grid.setCellValue(app, "grdCgdConvGrdStd", "MIN_GP", "");
		}
	};
	
	/**
	 * @desc [rdIpbConvGp]환산평점 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 16
	 */
	moPage.onValueChanged_RdIpbConvGp = function() {
		ValidUtil.checkIntegerDecimal("rdIpbConvGp", 1, 2, true);
	};
	
	/**
	 * @desc [rdIpbMaxScr]최대점수 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 16
	 */
	moPage.onValueChanged_RdIpbMaxScr = function() {
		ValidUtil.checkIntegerDecimal("rdIpbMaxScr", 3, 2, true);
		
		// 최대,최소점수 유효성체크
		if(!doChkScr("MAX_SCR") || !doChkOverlap("MAX_SCR", "MIN_SCR", "MAX_SCR")){
			util.Grid.setCellValue(app, "grdCgdConvGrdStd", "MAX_SCR", "");
		}
	};
	
	/**
	 * @desc [rdIpbMinScr]최소점수 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 16
	 */
	moPage.onValueChanged_RdIpbMinScr = function() {
		ValidUtil.checkIntegerDecimal("rdIpbMinScr", 3, 2, true);
		
		// 최대,최소점수 유효성체크 || 이미 입력된값 사이의 값인지 확인
		if(!doChkScr("MIN_SCR") || !doChkOverlap("MIN_SCR", "MIN_SCR", "MAX_SCR")){
			util.Grid.setCellValue(app, "grdCgdConvGrdStd", "MIN_SCR", "");
		}
	};
	
	/**
	 * @desc [rdIpbConvScr]환산점수 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 16
	 */
	moPage.onValueChanged_RdIpbConvScr = function() {
		ValidUtil.checkIntegerDecimal("rdIpbConvScr", 3, 2, true);
	};
	
	/**
	 * @desc 최대평점, 최소평점간 대소비교
	 * @param psColId		(필수) 컬럼 ID
	 * @return boolean
	 * @author 박갑수 at 2016. 3. 16
	 */
	function doChkGp(psColNm){
		// 유효성 true or false
		var vbValid = true;
		
		// 최대평점
		var vsMaxGp = util.Grid.getCellValue(app, "grdCgdConvGrdStd", "MAX_GP");
		// 최소평점
		var vsMinGp = util.Grid.getCellValue(app, "grdCgdConvGrdStd", "MIN_GP");
		
		var vsMaxGpTitle = ExtControl.getTextValue("rhBtnMaxGp");
		var vsMinGpTitle = ExtControl.getTextValue("rhBtnMinGp");
		
		// 최대평점 유효성 체크
		if(psColNm == "MAX_GP"){
			if(!ValueUtil.isNull(vsMinGp) && !ValidUtil.checkValue(Number(vsMaxGp), "compare(rdIpbMinGp, >=)")){
				// "@이(가) @보다 클 수 없습니다." 메시지 출력
				util.Msg.alert("NLS-APS-M001", [vsMinGpTitle, vsMaxGpTitle]);
				vbValid = false;
				return vbValid;
			}

		// 최소평점 유효성 체크
		} else if(psColNm == "MIN_GP"){
			if(!ValueUtil.isNull(vsMaxGp) && !ValidUtil.checkValue(Number(vsMinGp), "compare(rdIpbMaxGp, <=)")){
				// "@이(가) @보다 클 수 없습니다." 메시지 출력
				util.Msg.alert("NLS-APS-M001", [vsMinGpTitle, vsMaxGpTitle]);
				vbValid = false;
				return vbValid;
			}
		}
		
		return vbValid;
	};
	
	/**
	 * @desc 최대점수, 최소점수간 대소비교
	 * @param psColId		(필수) 컬럼 ID
	 * @return boolean
	 * @author 박갑수 at 2016. 3. 16
	 */
	function doChkScr(psColNm){
		// 유효성 true or false
		var vbValid = true;
		
		// 최대평점
		var vsMaxScr = util.Grid.getCellValue(app, "grdCgdConvGrdStd", "MAX_SCR");
		// 최소평점
		var vsMinScr = util.Grid.getCellValue(app, "grdCgdConvGrdStd", "MIN_SCR");
		
		var vsMaxScrTitle = ExtControl.getTextValue("rhBtnMaxScr");
		var vsMinScrTitle = ExtControl.getTextValue("rhBtnMinScr");
		
		// 최대평점 유효성 체크
		if(psColNm == "MAX_SCR"){
			if(!ValueUtil.isNull(vsMinScr) && !ValidUtil.checkValue(Number(vsMaxScr), "compare(rdIpbMinScr, >=)")){
				// "@이(가) @보다 클 수 없습니다." 메시지 출력
				util.Msg.alert("NLS-APS-M001", [vsMinScrTitle, vsMaxScrTitle]);
				vbValid = false;
				return vbValid;
			}

		// 최소평점 유효성 체크
		} else if(psColNm == "MIN_SCR"){
			if(!ValueUtil.isNull(vsMaxScr) && !ValidUtil.checkValue(Number(vsMinScr), "compare(rdIpbMaxScr, <=)")){
				// "@이(가) @보다 클 수 없습니다." 메시지 출력
				util.Msg.alert("NLS-APS-M001", [vsMinScrTitle, vsMaxScrTitle]);
				vbValid = false;
				return vbValid;
			}
		}
		
		return vbValid;
	};
	
	/**
	 * @desc 환산등급기준관리목록에 이미 입력된값의 사이값인지 검사
	 * @param psColId		(필수) 컬럼 ID
	 * @return boolean
	 * @author 박갑수 at 2016. 3. 16
	 */
	function doChkOverlap(psNowCol, psMinCol, psMaxCol){
		// 유효성 true or false
		var vbValid = true;

		// 입력값
		var vsValue = util.Grid.getCellValue(app, "grdCgdConvGrdStd", psNowCol);
		
		var vsNowIdx = util.Grid.getIndex(app, "grdCgdConvGrdStd");
		var vnRowCnt = util.Grid.getRowCount(app, "grdCgdConvGrdStd");
		
		if(!ValueUtil.isNull(vsValue)){
			for(var i=0; i<vnRowCnt; i++){
				var vnIdx = i+1;
				
				// 삭제일경우 제외
				var vsUptStatus = util.Grid.getCellValue(app, "grdCgdConvGrdStd", "UPT_STATUS", vnIdx);
				if(ValueUtil.fixNull(vsUptStatus) == "D") continue;
				// 자기자신일경우 제외
				if(vnIdx == vsNowIdx) continue;
				
				var vsMinOri = util.Grid.getCellValue(app, "grdCgdConvGrdStd", psMinCol, vnIdx);
				var vsMaxOri = util.Grid.getCellValue(app, "grdCgdConvGrdStd", psMaxCol, vnIdx);
				
				// 사이 값인지 검사
				if(Number(vsMinOri) < Number(vsValue) && Number(vsValue) < Number(vsMaxOri)){
					// "미리입력된 최소점수와 최대점수 사이에 있는 값을 입력할 수 없습니다." 메시지 출력
					util.Msg.alert("NLS-CGD-M014");
					
					vbValid = false;
					return vbValid;
				}
			}
		}

		return vbValid;
	};
	
	return moPage;
};
