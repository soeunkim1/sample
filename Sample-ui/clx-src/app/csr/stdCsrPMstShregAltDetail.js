//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./stdCsrPMstShregAltDetail.xtm"/>


var stdCsrPMstShregAltDetail = function() {
	var moPage = new Page();
	//임포트용 데이터 통신 오브젝트
	var moPObject = new PObject();
	
	/********************************
	 * 사용자 정의 메소드, 변수
	 *******************************/
	 
	var msStudId = null;
	var msStudNo = null; 
	var msHeaderStud = null;
	var msHeaderCourse = null;

	/**
	 * @desc onModelConstructDone 이벤트
	 * @param 
	 * @return void
	 * @author	 Choi In Seong 2016. 2. 12.
	 */
	moPage.onModelConstructDone_StdCsrPMstShregAltDetail = function() {
		//리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init("frfCsrShregAlt");

		//화면 온로드 서브미션 호출
		doOnLoad();	
	};

	/**
	 * @desc 학적등록상세화면 온로드
	               부모창에서 받아온 초기값 셋팅
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 01. 12.
	 */
	function doOnLoad() {
		var voAltObj = ExtPopUp.getParentVal("moAltObj");
		// 부모멤버변수에담긴학번받음
		
		msStudId 			= voAltObj["studId"];
		msStudNo 		= voAltObj["studNo"];
		msHeaderStud 	= voAltObj["headerStud"];
		msHeaderCourse 	= voAltObj["headerCourse"];
		
		// 등록정보에서 가져온 학번과 학생 정보 화면에 매핑 
		util.Control.setValue(app, "optStudNo", msStudNo);
		util.Control.setValue(app, "optStud", msHeaderStud);
		util.Control.setValue(app, "optCourse", msHeaderCourse);
		
		var voDtl = ExtPopUp.getParentVal("moDtl");
		
		//키값에 매핑되는 학생의 등록정보 GET, 학년도 학기의 시작일 GET, 취소사유 List
		//등록정보 
		var vsStudId 		= voDtl["studId"];
		var vsAltDivRcd 	= voDtl["altDivRcd"];
		var vsSerialNo 	= voDtl["serialNo"];
		
		util.DataMap.setValue(app, "dmReqKey", "strStudId", vsStudId);
		util.DataMap.setValue(app, "dmReqKey", "strAltDivRcd", vsAltDivRcd);
		util.DataMap.setValue(app, "dmReqKey", "strSerialNo", vsSerialNo);
		
		// onLoad submission call
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess) {
			if(pbSuccess){
				doList();
			} else {
				ExtModel.dispatch("btnCloseCancel", "DOMActivate");
			}
		});
	}
	
	/**
	 * @desc 학적등록상세 조회
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 01. 12.
	 */
	function doList() {
		
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess) {
			if (pbSuccess) {
				util.Control.redraw(app, "frfCsrShregAlt");
			} else {
				ExtModel.dispatch("btnCloseCancel", "DOMActivate");
			}
		});
	}
	
	/**
	 * @desc 헤더 온로드 실행
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 2. 2.
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		doHeaderOnLoad();
	};
	
	/**
	 * @desc 화면닫기 버튼 클릭
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 2. 2.
	 */
	moPage.onClick_BtnCloseCancel = function() {
		app.close();
	};
	
	return moPage;
};
