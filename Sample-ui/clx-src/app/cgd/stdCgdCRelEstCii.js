//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./stdCgdCRelEstCii.xtm"/>

/**
 * 상대평가기준관리
 * @class stdCgdCRelEstCii
 * @author 박갑수 at 2016. 3. 30
 */
var stdCgdCRelEstCii = function() {
	var moPage = new Page();
	
	/**
	 * @desc import 헤더 초기화
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 3. 30
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		// import 헤더 초기화
		doHeaderOnLoad();
	};
	
	/**
	 * @desc onLoad 실행
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 30
	 */
	moPage.onModelConstructDone_StdCgdCRelEstCii = function() {
		// 리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["rptCgdRelEstCii"]);
		
		// 서브미션 호출
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				// 조회
				doList(function(pbSuccess) {
					// 조회 : "조회되었습니다." header 메세지 표시
					if (pbSuccess) util.Msg.notify(app, "NLS.INF.M024");
				});
			}
		}, true);
	};
	
	/**
	 * @desc 상대평가기준목록 조회
	 * @param poCallBackFunc 콜백정의
	 * @return void
	 * @author 박갑수 at 2016. 3. 30
	 */
	function doList(poCallBackFunc) {
		
		// 전체권한일경우 - 적용제한범위 상관없이 조회
		if(moPageInfo.authRngRcd == "CC00102"){
			util.DataMap.setValue(app, "dmReqKey", "strAplyLmt", "ALL");
		}else {
			// 아닐경우 오브젝트번호 세팅
			util.DataMap.setValue(app, "dmReqKey", "strAplyLmt", moUserInfo.id);
		}
		
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdCgdRelEstCii");	
				// 조회 후 콜백함수 수행
				if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess); 
			}
		});
	};
	
	/**
	 * @desc [rhCkbSelect]패널 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 30
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
	 * @author 박갑수 at 2016. 3. 30
	 */
	moPage.onClick_BtnNew = function() {
		// 해당 리피트 insert 후 편집 시작할 컬럼 지정
		var vnIdx = util.Grid.insertRow(app, "grdCgdRelEstCii", "rdCbbRelEstCiiCd");
		
		// 전체권한[CC00102] 
		if (moPageInfo.authRngRcd != "CC00102") {
			util.Grid.setCellValue(app, "grdCgdRelEstCii", "APLY_LMT", moUserInfo.id, vnIdx);
		}
	};
	
	/**
	 * @desc [btnDel]삭제 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 30
	 */
	moPage.onClick_BtnDel = function() {
		// 해당 리피트 delete
		util.Grid.deleteRow(app, "grdCgdRelEstCii");
	};
	
	/**
	 * @desc [btnRestore]작업취소 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 30
	 */
	moPage.onClick_BtnRestore = function() {
		// 해당 리피트 상태 초기화
		util.Grid.restoreRow(app, "grdCgdRelEstCii");
	};
	
	/**
	 * @desc [btnSave]작업저장 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 30
	 */
	moPage.onClick_BtnSave = function() {
		// 작업저장
		doSave();
	};
	
	/**
	 * @desc 표준등급체계관리목록 변경사항 저장
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 30
	 */
	function doSave() {
		
		// 리피트 변경사항 체크
		if(!util.Grid.isModified(app, ["grdCgdRelEstCii"], "MSG")){
			return false;
		}

		// 리피트 Validation Check
		if(!util.validate(app, "grdCgdRelEstCii")) return false;

		//strCommand: save 
		util.Submit.send(app, "subSave", function(pbSuccess){
			if(pbSuccess){
				
				// PK값으로 rowSelect
				var vsPkValue = util.DataMap.getValue(app, "dmResSave", "strPk");
				if(!ValueUtil.isNull(vsPkValue)){
					ExtControl.getControl("rptCgdRelEstCii").pk_values =  vsPkValue;
				}
				
				doList(function(pbListSuccess) {
					// 조회 : "갱신된 데이터가 조회되었습니다." header 메세지 표시
					if (pbListSuccess) util.Msg.notify(app, "NLS.INF.M025");
				});
			}
		});
	};

	/**
	 * @desc [rdCbbRecCiiRcd]성적기준구분 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 30
	 */
	moPage.onValueChanged_RdCbbRecCiiRcd = function() {
		// 하한등급코드, 상한등급코드 초기화
		var vnIdx = util.Grid.getIndex(app, "grdCgdRelEstCii");
		util.Grid.setCellValue(app, "grdCgdRelEstCii", "MIN_GRD_RCD", "", vnIdx);
		util.Grid.setCellValue(app, "grdCgdRelEstCii", "MAX_GRD_RCD", "", vnIdx);
	};
	
	/**
	 * @desc [rdCbbRelEstCiiCd]상대평가기준 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 30
	 */
	moPage.onValueChanged_RdCbbRelEstCiiCd = function() {
		// 기준명 세팅
		var vnIdx = util.Grid.getIndex(app, "grdCgdRelEstCii");
		var vsRelEstCiiCd = util.Grid.getCellValue(app, "grdCgdRelEstCii", "REL_EST_CII_CD", vnIdx);
		util.Grid.setCellValue(app, "grdCgdRelEstCii", "CII_NM", vsRelEstCiiCd.substr(5, 7), vnIdx);
	};
	
	/**
	 * @desc [rdCbbMinGrdRcd]하한등급코드 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 30
	 */
	moPage.onValueChanged_RdCbbMinGrdRcd = function() {
		// 하한등급,상한등급 유효성체크
		if(!doChkGrdRcd("MIN_GRD_RCD")){
			util.Grid.setCellValue(app, "grdCgdRelEstCii", "MIN_GRD_RCD", "");
		}
	};
	
	/**
	 * @desc [rdCbbMaxGrdRcd]상한등급코드 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 30
	 */
	moPage.onValueChanged_RdCbbMaxGrdRcd = function() {
		// 하한등급,상한등급 유효성체크
		if(!doChkGrdRcd("MAX_GRD_RCD")){
			util.Grid.setCellValue(app, "grdCgdRelEstCii", "MAX_GRD_RCD", "");
		}
	};
	
	/**
	 * @desc 하한등급,상한등급간 대소비교
	 * @param psColId		(필수) 컬럼 ID
	 * @return boolean
	 * @author 박갑수 at 2016. 3. 30
	 */
	function doChkGrdRcd(psColNm){
		// 유효성 true or false
		var vbValid = true;
		
		// 성적기준구분
		var vsRecCiiRcd = util.Grid.getCellValue(app, "grdCgdRelEstCii", "REC_CII_RCD");
		// 하한등급
		var vsMinGrdRcd = util.Grid.getCellValue(app, "grdCgdRelEstCii", "MIN_GRD_RCD");
		// 상한비율
		var vsMaxGrdRcd = util.Grid.getCellValue(app, "grdCgdRelEstCii", "MAX_GRD_RCD");
		
		var vsMinGrdRcdTitle = ExtControl.getTextValue("rhBtnMinGrdRcd");
		var vsMinGrdRcdTitle = ExtControl.getTextValue("rhBtnMaxGrdRcd");
		
		if(!ValueUtil.isNull(vsRecCiiRcd) && !ValueUtil.isNull(vsMinGrdRcd) && !ValueUtil.isNull(vsMaxGrdRcd)){
