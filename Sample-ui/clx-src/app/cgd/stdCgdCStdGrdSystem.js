//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./stdCgdCStdGrdSystem.xtm"/>

/**
 * 표준등급체계관리
 * @class stdCgdCStdGrdSystem
 * @author 박갑수 at 2016. 3. 17
 */
var stdCgdCStdGrdSystem = function() {
	var moPage = new Page();
	
	// 임포트용 데이터 통신 오브젝트
	var moPObject = new Page();
	
	// 객체검색팝업 호출
	moPObject.moIdsForStdCmnPObjSch = [
	{
		controlId			:	"rdBtnOgNm",
		iCd					:	"",
		iNm					:	"rdIpbOgNm",
		iObjDivRcd			:	["CC009OG"],
		iStartObject    	:   "",
		iOtDivRcd			:	"",
		iOtIsTreeView	:	"",
		iLanDivRcd		:	"",
		iKeyDate			:	"",
		iKeyEndDate		:	"",
		oObjDivRcd		:	"rdIpbOgObjDivRcd",
		oCd					:	"rdIpbOgCd",
		oCdNm				:	"rdIpbOgNm",
		oBegDt				:	"",
		oEndDt				:	"",
		oLanDivRcd		:	"",
		func 					:  function(){
			// 학년도학기의 기간 중복체크
			if(!doChkOverlap()){
				util.Grid.setCellValue(app, "grdCgdStdGrdSystem", "OG_CD", "");
				util.Grid.setCellValue(app, "grdCgdStdGrdSystem", "OG_NM", "");
				util.Grid.setCellValue(app, "grdCgdStdGrdSystem", "OG_OBJ_DIV_RCD", "");
			}
		}
	}];
	
	/**
	 * @desc import 헤더 초기화
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 3. 17
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		// import 헤더 초기화
		doHeaderOnLoad();
	};
	
	/**
	 * @desc onLoad 실행
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 17
	 */
	moPage.onModelConstructDone_StdCgdCStdGrdSystem = function() {
		
		// 리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["rptCgdStdGrdSystem"]);		
		
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
	 * @desc 표준등급체계관리목록 조회
	 * @param poCallBackFunc 콜백정의
	 * @return void
	 * @author 박갑수 at 2016. 3. 17
	 */
	function doList(poCallBackFunc) {
		
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdCgdStdGrdSystem");	
				// 조회 후 콜백함수 수행
				if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess); 
			}
		});
	};
	
	/**
	 * @desc [rhCkbSelect]패널 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 17
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
	 * @author 박갑수 at 2016. 3. 17
	 */
	moPage.onClick_BtnNew = function() {
		// 해당 리피트 insert 후 편집 시작할 컬럼 지정
		var vnIdx = util.Grid.insertRow(app, "grdCgdStdGrdSystem", "rdCbbStSchYearRcd");
	};
	
	/**
	 * @desc [btnDel]삭제 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 17
	 */
	moPage.onClick_BtnDel = function() {
		// 해당 리피트 delete
		util.Grid.deleteRow(app, "grdCgdStdGrdSystem");
	};
	
	/**
	 * @desc [btnRestore]작업취소 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 17
	 */
	moPage.onClick_BtnRestore = function() {
		// 해당 리피트 상태 초기화
		util.Grid.restoreRow(app, "grdCgdStdGrdSystem");
	};
	
	/**
	 * @desc [btnSave]작업저장 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 17
	 */
	moPage.onClick_BtnSave = function() {
		// 작업저장
		doSave();
	};
	
	/**
	 * @desc 표준등급체계관리목록 변경사항 저장
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 17
	 */
	function doSave() {
		
		// 리피트 변경사항 체크
		if(!util.Grid.isModified(app, ["grdCgdStdGrdSystem"], "MSG")){
			return false;
		}

		// 리피트 Validation Check
		if(!util.validate(app, "grdCgdStdGrdSystem")) return false;

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
	 * @desc [rdBtnOgNm]강의실명(돋보기버튼) onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 17
	 */
	moPage.onClick_RdBtnOgNm = function(sender) {
		// 객체검색팝업 오픈 전 체크
		if(!doPreChkPopup()){
			return false;
		}else {
			// 객체검색팝업호출
			doOnClickStdCmnPObjSch(sender);
		}
	};
	
	/**
	 * @desc [rdIpbOgNm]강의실명 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 17
	 */
	moPage.onValueChanged_RdIpbOgNm = function(sender) {
		// 객체검색팝업 오픈 전 체크
		if(!doPreChkPopup()){
			return false;
		}else {
			// 객체검색팝업호출
			doOnChangeStdCmnPObjSch(sender);
		}
	};
	
	/**
	 * @desc 객체검색팝업 오픈 전 체크
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 2. 17
	 */
	function doPreChkPopup(){
		var vbValid = true;
		
		var vsStSchYearRcd = util.Grid.getCellValue(app, "grdCgdStdGrdSystem", "ST_SCH_YEAR_RCD");
		var vsEndSchYearRcd = util.Grid.getCellValue(app, "grdCgdStdGrdSystem", "END_SCH_YEAR_RCD");
		if(ValueUtil.isNull(vsStSchYearRcd) || ValueUtil.isNull(vsEndSchYearRcd)){
			// "시작학년도와 종료학년도를 먼저 입력하세요." 메시지
			util.Msg.alert("NLS-CGD-M034");
			util.Grid.setCellValue(app, "grdCgdStdGrdSystem", "OG_NM", "");
			vbValid = false;
			return vbValid;
		}
		
		return vbValid;
	};
	
	/**
	 * @desc [rdCbbStSchYearRcd]시작학년도 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 17
	 */
	moPage.onValueChanged_RdCbbStSchYearRcd = function() {
		// 시작, 종료 학년도 대소비교 || 학년도학기의 기간 중복체크
		if(!doChkSchYearRcd() || !doChkOverlap()){
			util.Grid.setCellValue(app, "grdCgdStdGrdSystem", "ST_SCH_YEAR_RCD", "");
		}
	};
	
	/**
	 * @desc [rdCbbEndSchYearRcd]종료학년도 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 17
	 */
	moPage.onValueChanged_RdCbbEndSchYearRcd = function() {
		// 시작, 종료 학년도 대소비교 || 학년도학기의 기간 중복체크
		if(!doChkSchYearRcd() || !doChkOverlap()){
			util.Grid.setCellValue(app, "grdCgdStdGrdSystem", "END_SCH_YEAR_RCD", "");
		}
	};
	
	/**
	 * @desc 시작, 종료 학년도 대소비교
	 * @param psColId		(필수) 컬럼 ID
	 * @return boolean
	 * @author 박갑수 at 2016. 3. 16
	 */
	function doChkSchYearRcd(){
		// 유효성 true or false
		var vbValid = true;
		
		// 시작학년도
		var vsStSchYearRcd = util.Grid.getCellValue(app, "grdCgdStdGrdSystem", "ST_SCH_YEAR_RCD");
		// 종료학년도
		var vsEndSchYearRcd = util.Grid.getCellValue(app, "grdCgdStdGrdSystem", "END_SCH_YEAR_RCD");
		
		// 시작학년도 타이틀
		var vsStSchYearRcdTitle = ExtControl.getTextValue("rhBtnStSchYearRcd");
		// 종료학년도 타이틀
		var vsEndSchYearRcdTitle = ExtControl.getTextValue("rhBtnEndSchYearRcd");

		if(!ValueUtil.isNull(vsStSchYearRcd) && !ValueUtil.isNull(vsEndSchYearRcd)){
			
			var vnStSchYearRcd = Number(vsStSchYearRcd.substr(5, 4));
			var vnEndSchYearRcd = Number(vsEndSchYearRcd.substr(5, 4));
			
			if(vnStSchYearRcd > vnEndSchYearRcd){
				// "@이(가) @보다 클 수 없습니다." 메시지 출력
				util.Msg.alert("NLS-APS-M001", [vsStSchYearRcdTitle, vsEndSchYearRcdTitle]);
				vbValid = false;
				return vbValid;
			}
		}
		
		return vbValid;
	};
	
	/**
	 * @desc 학년도학기의 기간 중복체크
	 * @param 
	 * @return boolean
	 * @author 박갑수 at 2016. 3. 17
	 */
	function doChkOverlap(){
		// 유효성 true or false
		var vbValid = true;

		// 시작학년도
		var vsStSchYearRcd = util.Grid.getCellValue(app, "grdCgdStdGrdSystem", "ST_SCH_YEAR_RCD");
		// 종료학년도
		var vsEndSchYearRcd = util.Grid.getCellValue(app, "grdCgdStdGrdSystem", "END_SCH_YEAR_RCD");
		// 행정부서코드
		var vsOgCd = util.Grid.getCellValue(app, "grdCgdStdGrdSystem", "OG_CD");
		
		var vsNowIdx = util.Grid.getIndex(app, "grdCgdStdGrdSystem");
		var vnRowCnt = util.Grid.getRowCount(app, "grdCgdStdGrdSystem");
		
		if(!ValueUtil.isNull(vsStSchYearRcd) && !ValueUtil.isNull(vsEndSchYearRcd) && !ValueUtil.isNull(vsOgCd)){
			for(var i=0; i<vnRowCnt; i++){
				var vnIdx = i+1;
				
				// 삭제일경우 제외
				var vsUptStatus = util.Grid.getCellValue(app, "grdCgdStdGrdSystem", "UPT_STATUS", vnIdx);
				if(ValueUtil.fixNull(vsUptStatus) == "D") continue;
				// 자기자신일경우 제외
				if(vnIdx == vsNowIdx) continue;
				
				var vsStSchYearRcdOri = util.Grid.getCellValue(app, "grdCgdStdGrdSystem", "ST_SCH_YEAR_RCD", vnIdx);
				var vsEndSchYearRcdOri = util.Grid.getCellValue(app, "grdCgdStdGrdSystem", "END_SCH_YEAR_RCD", vnIdx);
				var vsOgCdOri = util.Grid.getCellValue(app, "grdCgdStdGrdSystem", "OG_CD", vnIdx);
				
				// 행정부서가 같을경우 검사
				if(vsOgCd == vsOgCdOri){
					
					var vnStSchYearRcd = Number(vsStSchYearRcd.substr(5, 4));
					var vnEndSchYearRcd = Number(vsEndSchYearRcd.substr(5, 4));
					
					var vnStSchYearRcdOri = Number(vsStSchYearRcdOri.substr(5, 4));
					var vnEndSchYearRcdOri = Number(vsEndSchYearRcdOri.substr(5, 4));
					
					// 기간중복체크 
					if(vnEndSchYearRcd >= vnStSchYearRcdOri  && vnStSchYearRcd <= vnEndSchYearRcdOri){
						// "@번째 데이터와 년도가 중복 됩니다."
						util.Msg.alert("NLS-CGD-M031", [vnIdx]);
						
						vbValid = false;
						return vbValid;
					}
				}
			}	// end for
		}

		return vbValid;
	};
	
	return moPage;
};
