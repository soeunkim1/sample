//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
///<xtmlink path="./stdCmnCTest.xtm"/>

var stdCmnCTest = function() {

	var moPage = new Page();
	//임포트용 데이터 통신 오브젝트
	var moPObject = new PObject();

	/**
	 * @desc  Header Import onLoad
	 * @return void
     * @author xxxx at 2017.12.14
     */
	moPage.onLoadImportDone_ImpTitle = function() {
		doHeaderOnLoad();
	};


				
	/**
	 * @desc 
	 * @return 
	 * @author xxxx 2017.12.14
	 */
	moPage.onModelConstructDone_stdCmnCTest = function() {

	}











	/**
	 * @desc 
	 * @param 
	 * @return 
	 * @author xxxx 2017.12.14
	 */
	function doList(poCallBackFunc) {

	}

	/**
	 * @desc 
	 * @param 
	 * @return 
	 * @author xxxx 2017.12.14
	 */
	function doSave() {

	}

	/**
	 * @desc 리피트 panel click event
	 * @param
	 * @return void
	 * @author xxxx 2017.12.14
	 */
	moPage.onValueChanged_RhCkbSelect = function() {
//TO-BE: <ExtRepeat.selectedAllPanel> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.selectedAllPanel("rhCkbSelect");
	};

return moPage;
};

