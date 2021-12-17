//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./stdCsrCAplyYearSmt.xtm"/>


var stdCsrCAplyYearSmt = function() {
	var moPage = new Page();
	var moPObject = new PObject();
	
	moPage.onLoadImportDone_ImpTitle = function() {
		doHeaderOnLoad();
	}
	
	/**
	 * @desc 온로드 실행
	 * @return void
	 * @author Choi In Seong 2016. 01. 11.
	 */
	moPage.onModelConstructDone_StdCsrCAplyYearSmt = function() {
		doOnLoad();
	};
	
	/**
	 * @desc 저장 버튼 클릭
	 * @return void
	 * @author Choi In Seong 2016. 01. 11.
	 */
	moPage.onClick_BtnSave = function() {
		doSvae();
	};

	moPage.onValueChanged_CbbYear = function() {
		moPage.setBtnSaveEnable();
	};
	
	moPage.onValueChanged_CbbSmt = function() {
		moPage.setBtnSaveEnable();
	};
	
	/**
	 * @desc 온로드 실행
	 * @return void
	 * @author Choi In Seong 2016. 01. 11.
	 */
	function doOnLoad() {
		util.DataMap.setValue(app, "dmReqKey", "strUnitSystem", "CB001CSR");
		
		// 서브미션 실행 (실패시 cover page)
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				util.Msg.notify(app, "NLS.INF.M024");
				util.Control.redraw(app, ["cbbYear", "cbbSmt"]);

				util.Control.setEnable(app, false, ["btnSave"]);
			}
		}, true);
	}
	
	/**
	 * @desc 콤보박스 값변경에 따른 저장버튼 활성화
	 * @param 
	 * @return 
	 * @author Choi In Seong 2016. 01. 11
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
	 * @author Choi In Seong 2016. 01. 11
	 */
	function doSvae() {
		if(!util.validate(app, ["cbbYear", "cbbSmt"])) return;
				
		//strCommand: save 
		util.Submit.send(app, "subSave", function(pbSuccess){
	
			if(pbSuccess){
				//Message: 갱신된 데이터가 조회되었습니다.
				util.Msg.notify(app, "NLS.INF.M025");
			
				util.Control.redraw(app, [ "cbbYear", "cbbSmt"]);
				
				util.Control.setEnable(app, false, ["btnSave"]);
			}
		
		});
	}

	return moPage;
};
