//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCcsCMonFeeProc.xtm"/>

/**
 * 개설분반관리
 * @class extCcsCTlsnDivclsMng
 * @author 박갑수 at 2016. 4. 25
 */
var extCcsCMonFeeProc = function() {
	var moPage = new Page();
	
	// 임포트용 데이터 통신 오브젝트
	var moPObject = new Page();
	
	
	// 학년도 학기를 원래데이터로 되돌리기위한 변수
	var msSchYearRcd = "";
	var msSmtRcd = "";
	
	/**
	 * @desc import 헤더 초기화
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 4. 25
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		// import 헤더 초기화
		doHeaderOnLoad();
	};
	
	/**
	 * @desc onLoad 실행
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 25
	 */
	moPage.onModelConstructDone_ExtCcsCTlsnDivclsMng = function() {
		
		
		
		// 서브미션 호출
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				
				var vsCutDt = util.DataMap.getValue(app, "dmResOnLoad", "strCutDt");
				var vsMm = vsCutDt.substring(5,6);
				
				vsMm = ValueUtil.fixNumber(vsMm);
				util.DataMap.setValue(app, "dmReqKey", "strMm", vsMm);
				
				
				util.Control.redraw(app, ["cbbSchYearRcd", "cbbSmtRcd", "cbbMm"]);
				
				//ExtSelectCtl.selectItem("cbbMm", 0);
				
			}
		}, true);
	};
	
	/**
	 * @desc [cbbSchYearRcd]학년도 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 25
	 */
	moPage.onValueChanged_CbbSchYearRcd = function() {
		// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
		doChangeYearSmt("year");
		
	};
	
	/**
	 * @desc [cbbSmtRcd]학기 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 25
	 */
	moPage.onValueChanged_CbbSmtRcd = function() {
		// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
		doChangeYearSmt("smt");
		
	};
	
	/**
	 * @desc 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 4. 25
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
	
	
	
	
	
	
	/*
		강사료를 계산처리 한다.
	*/	
	moPage.onClick_BtnSaDivclsBat = function() {
		
		// 조회조건 필수체크
		if(!util.validate(app, ["cbbSchYearRcd", "cbbSmtRcd", "cbbMm"])){
			return false;
		}
		
		
		
		if(util.Msg.confirm("NLS-CRM-M034", [ComMsg.getMsg(NLS.CCS.EXT055)]) ){
			page.doSaveByBatch();
		}
		
		
		
	}
	
	/*
		강사료를 계산한다.
	*/
	function doSaveByBatch(psStep){
		
		
		
		if(ValueUtil.isNull(psStep)){
			psStep = "0";
		}
		
		util.DataMap.setValue(app, "dmReqKey", "strStep", psStep);
		//strCommand: saveByBatch 
		util.Submit.send(app, "subSaveByBatch", function(pbSuccess){
			if(pbSuccess){
				var vsMsg = util.DataMap.getValue(app, "dmResList", "strMsg");
				if(!ValueUtil.isNull(vsMsg)){
					if(util.Msg.confirm("NLS-CRM-M034", [vsMsg]) ){
						var vsStep = util.DataMap.getValue(app, "dmReqKey", "strStep");
						return page.doSaveByBatch(vsStep);
					}else{
						return false;
					}
				}else{
					// 처리되었습니다.
					util.Msg.alert("NLS-INF-M003");					
				}			
			}
		});
		
	}
	
	return moPage;
};
