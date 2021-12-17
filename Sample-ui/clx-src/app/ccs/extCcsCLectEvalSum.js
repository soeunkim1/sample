//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCcsCLectEvalSum.xtm"/>

/**
 * 강의평가처리
 * @class extCcsCLectEvalSum
 * @author 박갑수 at 2016. 5. 16
 */
var extCcsCLectEvalSum = function() {
	var moPage = new Page();
	
	// 학년도 학기를 원래데이터로 되돌리기위한 변수
	var msSchYearRcd = "";
	var msSmtRcd = "";
	
	/**
	 * @desc import 헤더 초기화
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 5. 16
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		// import 헤더 초기화
		doHeaderOnLoad();
	};
	
	/**
	 * @desc onLoad 실행
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 16
	 */
	moPage.onModelConstructDone_ExtCcsCLectEvalSum = function() {
		// 서브미션 호출
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				
				util.Control.redraw(app, ["cbbSchYearRcd", "cbbSmtRcd", "ckbEvalXcpGrd"]);
			}
		}, true);
	};

	/**
	 * @desc [cbbSchYearRcd]학년도 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 16
	 */
	moPage.onValueChanged_CbbSchYearRcd = function() {
		// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
		doChangeYearSmt("year");
	};
	
	/**
	 * @desc [cbbSmtRcd]학기 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 16
	 */
	moPage.onValueChanged_CbbSmtRcd = function() {
		// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
		doChangeYearSmt("smt");
	};
	
	/**
	 * @desc 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 16
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
	 * @desc [btnSave]강의평가집계 실행 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 16
	 */
	moPage.onClick_BtnSave = function() {
		
		// 조회조건 필수체크
		if(!util.validate(app, ["cbbSchYearRcd", "cbbSmtRcd"])){
			return false;
		}
		
		// 강의평가집계 데이터 카운트 조회
		doListCnt(function(pbSuccess) {
			if (pbSuccess){
				
				var vsChkCnt = util.DataMap.getValue(app, "dmResList", "strChkCnt");
				
				
				var vsSchYearRcdNm = ExtInstance.getValue("/root/resOnLoad/schYearRcdList/row", "CD_NM" , "child::CD='"+util.Control.getValue(app, "cbbSchYearRcd")+"'");
				var vsSmtRcdNm = ExtInstance.getValue("/root/resOnLoad/smtRcdList/row", "CD_NM" , "child::CD='"+util.Control.getValue(app, "cbbSmtRcd")+"'");
				
				var vsMsgParam  = "";
				if(0 < Number(vsChkCnt)){
					// 강의평가집계 데이터가 존재합니다.\n강의평가 집계처리를 재계산
					vsMsgParam = vsSchYearRcdNm + " " + vsSmtRcdNm + " " + NLS.CCS.EXT011;
				}else {
					// 강의평가집계처리를 진행
					vsMsgParam = vsSchYearRcdNm + " " + vsSmtRcdNm + " " + NLS.CCS.EXT012;
				}
				
				// @ 하시겠습니까?
				if(!util.Msg.confirm("NLS-CRM-M010", [vsMsgParam]) ){
					return false;
				}else {
					// 강의평가집계처리
					doSave();
				}
			}
		});
	};
	
	/**
	 * @desc  강의평가집계 데이터 카운트 조회
	 * @param {Function} poCallBackFunc 콜백정의
	 * @return void
	 * @author 박갑수 at 2016. 5. 16
	 */
	function doListCnt(poCallBackFunc) {
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
			}
			
			// 조회 후 콜백함수 수행
			if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess); 
		});
	};
	
	/**
	 * @desc 강의평가집계실행
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 3. 16
	 */
	function doSave() {
		//strCommand: save 
		util.Submit.send(app, "subSave", function(pbSuccess){
			if(pbSuccess){
				//처리되었습니다.
				util.Msg.alert("NLS-INF-M003");
			}
		});
	};
	
	return moPage;
};
