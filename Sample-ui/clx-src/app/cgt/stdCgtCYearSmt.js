//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./stdCgtCYearSmt.xtm"/>


var stdCgtCYearSmt = function() {
	var moPage = new Page();
	
	moPage.onLoadImportDone_ImpTitle = function() {
		doHeaderOnLoad();
	}
	
	/**
	 * @desc 온로드 실행
	 * @return void
	 * @author Aeyoung Lee 2016. 07. 01.
	 */
	moPage.onModelConstructDone_StdCgtCYearSmt = function() {
		doOnLoad();
	};
	
	/**
	 * @desc 저장 버튼 클릭
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 07. 01.
	 */
	moPage.onClick_BtnSave = function() {
		doSvae();
	};
	
	/**
	 * @desc 학년도 값 변경
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 07. 01.
	 */
	moPage.onValueChanged_CbbYear = function() {
		moPage.setBtnSaveEnable();
	};
	
	/**
	 * @desc 학기 값 변경
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 07. 01.
	 */
	moPage.onValueChanged_CbbSmt = function() {
		moPage.setBtnSaveEnable();
	};
	
	/**
	 * @desc 온로드 실행
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 07. 01.
	 */
	function doOnLoad(){
		// 서브미션 실행 (실패시 cover page)
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				util.Msg.notify(app, "NLS.INF.M024");
				util.Control.redraw(app, ["cbbYear", "cbbSmt"]);
				doResetClear("cbbYear");
				doResetClear("cbbSmt");
				util.Control.setEnable(app, false, ["btnSave"]);
			}
		}, true);
	}
	
	/**
	 * @desc 리스트가 존재하지 않을 경우 컨트롤 클리어
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 07. 01.
	 */
	function doResetClear(psCtl){
		if(ExtSelectCtl.getItemCount(psCtl) < 1) {
			util.Control.setValue(app, psCtl, "");
		}	
	}
	
	/**
	 * @desc 콤보박스 값변경에 따른 저장버튼 활성화
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016. 07. 01.
	 */
	moPage.setBtnSaveEnable = function() {
		var vsYear = util.Control.getValue(app, "cbbYear");
		var vsSmt = util.Control.getValue(app, "cbbSmt");
		
		// 학년도 학기가 모두 존재해야만 저장가능
		if( !ValueUtil.isNull(vsYear) && !ValueUtil.isNull(vsSmt)){
			util.Control.setEnable(app, true, ["btnSave"]);
		}
	}
	
	/**
	 * @desc 학년도 학기 저장
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016. 07. 01.
	 */
	function doSvae() {
		if(!util.validate(app, ["cbbYear", "cbbSmt"])) return;
		
		//strCommand: save 
		util.Submit.send(app, "subSave", function(pbSuccess){
			if(pbSuccess){
				// "저장되었습니다." 메시지 출력
				util.Msg.notify(app, "NLS.INF.M001");
				
				util.Control.redraw(app, [ "cbbYear", "cbbSmt"]);
				
				util.Control.setEnable(app, false, ["btnSave"]);
			}
		}, true);
	}

	return moPage;
};
