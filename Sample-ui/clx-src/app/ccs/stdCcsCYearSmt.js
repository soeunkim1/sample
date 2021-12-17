//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./stdCcsCYearSmt.xtm"/>

/**
 * 수업 학년도 학기
 * @class stdCcsCYearSmt
 * @author 박갑수 at 2016. 1. 18
 */
var stdCcsCYearSmt = function() {

	var moPage = new Page();
	
	/**
	 * @desc import 헤더 초기화
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 1. 18
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		// import 헤더 초기화
		doHeaderOnLoad();
	};
	
	/**
	 * @desc onLoad 실행
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 1. 18
	 */
	moPage.onModelConstructDone_StdCcsCYearSmt = function() {
		
		// 단위시스템 설정 : 수업[CB001CCS]
		util.DataMap.setValue(app, "dmReqKey", "strUnitSystem", "CB001CCS");
				
			//strCommand: onLoad 
			util.Submit.send(app, "subOnLoad", function(pbSuccess){
				if(pbSuccess){
					util.Control.redraw(app, [ "cbbYear", "cbbSmt"]);
					
					util.Control.setEnable(app, false, ["btnSave"]);
				}
			}, true);
	};
	
	/**
	 * @desc [cbbYear]학년도 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 1. 18
	 */
	moPage.onValueChanged_CbbYear = function() {
		
		// 콤보박스 값변경에 따른 저장버튼 활성화
		moPage.setBtnSaveEnable();
	};
	
	/**
	 * @desc [cbbSmt]학기 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 1. 18
	 */
	moPage.onValueChanged_CbbSmt = function() {
		
		// 콤보박스 값변경에 따른 저장버튼 활성화
		moPage.setBtnSaveEnable();
	};
	
	/**
	 * @desc 콤보박스 값변경에 따른 저장버튼 활성화
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 1. 18
	 */
	moPage.setBtnSaveEnable = function() {
		
		var vsYear = util.Control.getValue(app, "cbbYear");
		var vsSmt = util.Control.getValue(app, "cbbSmt");
		
		// 학년도 학기가 모두 존재해야만 저장가능
		if( !ValueUtil.isNull(vsYear) && !ValueUtil.isNull(vsSmt)){
			util.Control.setEnable(app, true, ["btnSave"]);
		}
	};
	
	/**
	 * @desc [btnSave]작업저장 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 1. 18
	 */
	moPage.onClick_BtnSave = function() {
		
		// 작업저장
		doSave();
	};
	
	/**
	 * @desc 작업저장
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 1. 18
	 */
	function doSave() {
		
		// 필수값 체크
		if(!util.validate(app, ["cbbYear", "cbbSmt"])) return;
		
		//strCommand: save 
		util.Submit.send(app, "subSave", function(pbSuccess){
			if(pbSuccess){
				// "저장되었습니다." 메시지 출력
				util.Msg.notify(app, "NLS.INF.M001");
			
				util.Control.redraw(app, [ "cbbYear", "cbbSmt"]);
				
				util.Control.setEnable(app, false, ["btnSave"]);
			}
		});
	};
	
	return moPage;
};
