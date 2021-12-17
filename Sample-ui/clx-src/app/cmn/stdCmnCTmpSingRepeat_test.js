//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./stdCmnCTmpSingRepeat_test.xtm"/>

var stdCmnCTmpSingRepeat_test = function() {
		
	var moPage = new Page();
	//임포트용 데이터 통신 오브젝트
	var moPObject = new PObject();
	
	moPObject.moIdsForExtCmnSender = {
		
		rptId			 				: "rptCmnTmpReg",													// (필수) SMS 리피트 id
		sendDivChar 	 			: ["rhBtnStudNo"], 								// (선택) 발송문구구분_발송내용의 @ 키워드와 매핑됨
		sndId						: "CMN01401",														// (선택) 발송id
		unitSystemRcd			: "CB001CMN",														// (선택) 단위시스템구분코드		-- 발송Id입력 시 필수
		repNm						: "rhBtnRepNm", 
		
		/*************************************SMS*************************************************************/
		phoneNo			 		: "rhBtnClpNo",														// (필수) 휴대폰번호 그리드 헤더 id
		defSenderSms     		: "01034090203",														// (선택) 보내는이(SMS)
		sendMsgContSms    	: "발송내용",																		// (선택) SMS발송 내용
		sendTitleSms        	: "발송제목",															// (선택) SMS발송 제목
		/******************************************************************************************************/
		
		/*************************************Email*************************************************************/
		email			 			: "rhBtnEmail",														// (필수) 이메일 그리드 헤더 id
		defSenderEmail 	 		: "skyhawk0203@gmail.com", 									// (선택) 보내는이(Email)
		defPersonalNmEmail 	: "",												 						// (선택) 보내는이 명(닉네임)(Email)
		sendMsgContEmail	: "발송내용",															// (선택) Email발송 내용
		sendTitleEmail			: "발송제목",															// (선택) Email발송 제목
		/******************************************************************************************************/
		
		callBackfunc : function(pbSuccess, psSmsEmailDivCd, paIdxs) {
			/*						
			pbSuccess		: 성공여부(현재 성공시에만 콜백함수 호출됨)
			psSmsEmailDivCd : CMN01302 (이메일). CMN01301(SMS)
			paIdxs			: 선택된 그리드 index
			*/
		}
	};
				
	/******************************************************************************************************
	 *  학생검색팝업 관련 설정사항
	 *  ▶ 설정가능 유형
	 *      1. 인스턴스
	 *      2. 리피트 디테일 셀 ID
	 *      3. 컨트롤 ID
	 *  ▶ 각 변수별 설명
	 *      iXXX : 팝업에 전달될  input 파라미터
	 *      oXXX : 팝업에서 선택한 값을 받을 데이터
	 *      1. controlId			: 최초 이벤트의 버튼이나 그리드 id	(필수)
	 *      2. iStudNo 			: 검색조건 학번					    		(선택) (값이 존재할 경우 4자리 이상)
	 *      3. iStudId 				: 검색조건 학번오브젝트					(선택)
	 *      4. iStudNm 			: 이름        				            		(선택) (값이 존재할 경우 2자리 이상)
	 *      5. iKeyDate 			: 기준일 										(필수) (기준일자(학년도학기 종료일),안주면 최종데이터나옴)
	 *      6. iObjDivRcd 		: 객체구분코드 								(선택)
	 *      7. iObjCd 				: 부서코드										(선택)
	 *      8. iObjNm 			: 부서명											(선택) 
	 *      9. iAuthYN				: 권한미적용여부 (미적용시: "Y")		(선택) 
	 *     10. iStatRcd			: 학적상태코드								(선택) "CT301ATTE,CT301ABSE,CT301COMP,CT301GRAD,CT301REMO"
	 *     11. oStudId				: 학번오브젝트
	 *     12. oStudNo 			: 학번
	 *     13. oStudNm 			: 이름
	 *     14. oSsn 				: 주민번호
	 *     15. oStatNm 			: 학적상태명
	 *     16. oStatRcd 			: 학적상태코드
	 *     17. oProcRslt 			: 진급학기
	 *     18. oProcRsltYear 	: 진급학년
	 *     19. oSaCd 				: 학사부서코드명
	 *     20. oSaNm 			: 학사부서명
	 *     21. oSpCd 				: 이수과정코드명
	 *     22. oSpNm 			: 이수과정명
	 *     23. oOgCd 				: 행정부서코드명
	 *     24. oOgNm 			: 행정부서명
	 *     25. func 				: 팝업에서 선택한 값을 받은 후 추가 로직이 필요한 경우 함수 작성
	 *									  
	 *******************************************************************************************************/	
	moPObject.moIdsForStdCsrPStSearch = [
	{
		controlId     		: "btnStudNo",
		iStudNo       		: "ipbStudNo",		
		iStudId       		: "",
		iStudNm       		: "",
		iKeyDate	  		: "/root/resOnLoad/strKeyDate",
		iObjDivRcd 		: "",
		iObjCd     	  		: "",
		iObjNm 			: "",
		iAuthYN		  		: "",
		iStatRcd			: "",
		oStudId       		: "/root/reqKey/strStudId",
		oStudNo       		: "ipbStudNo",		
		oStudNm       	: "",
		oSsn          		: "",
		oStatNm 	  		: "",
		oStatRcd	  		: "",
		oProcRslt	  		: "",
		oProcRsltYear    : "",
		oSaCd         		: "",
		oSaNm         	: "",					
		oSpCd         		: "",
		oSpNm         	: "",
		oOgCd 		  		: "",
		oOgNm 		  	: "",
		func 		  			: function(poRtnValue){
									//객체검색 후 callBack Func
									//결과 object : poRtnValue.result
								   }
	},
	{
		controlId     		: "rdBtnStudNo",
		iStudNo       		: "rdIpbStudNo",
		iStudId       		: "",
		iStudNm       		: "",
		iKeyDate	  		: "/root/resOnLoad/strKeyDate",
		iObjDivRcd 		: "",
		iObjCd     	  		: "",
		iObjNm 			: "",
		iAuthYN		  		: "",
		oStudId       		: "rdIpbStudId",
		oStudNo       		: "rdIpbStudNo",
		oStudNm       	: "rdIpbRepNm",
		oSsn          		: "rdIpbSsn",
		oStatNm 	  		: "",
		oStatRcd	  		: "",
		oProcRslt	  		: "",
		oProcRsltYear	: "",
		oSaCd         		: "",
		oSaNm         	: "",					
		oSpCd         		: "",
		oSpNm         	: "",
		oOgCd 		  		: "",
		oOgNm 		  	: "",
		func 		  		    : function(poRtnValue){
									//객체검색 후 callBack Func
									//결과 object : poRtnValue.result
								   }
	}
	];
	
	/******************************************************************************************************
	 *  객체검색팝업 관련 설정사항
	 *  ▶ 설정가능 유형
	 *      1. 인스턴스
	 *      2. 리피트 디테일 셀 ID
	 *      3. 컨트롤 ID
	 *  ▶ 각 변수별 설명
	 *      iXXX : 팝업에 전달될  input 파라미터
	 *      oXXX : 팝업에서 선택한 값을 받을 데이터
	 *  	1. controlId 		: 최초 이벤트의 버튼이나 그리드 id             (필수)
	 *  	2. iCd 				: 검색조건 부서코드                                 (선택) 
	 *  	3. iNm 				: 검색조건 부서명									(선택)	
	 *  	4. iObjDivRcd 	: 검색될 객체구분코드 종류						(필수)
	 *								  (CC009OG : "행정부서", CC009SA : "학사부서", CC009SP : "이수과정", CC009CU : "교과그룹", CC009OT : "외부부서")
	 *  	5. iStartObject 	: 검색시작부서 										(선택)
	 *								  ("CC009OG20000,CC009OG70000",) 
	 *		6. iOtDivRcd 		: 외부부서구분코드 									(선택)
	 *								  (외부부서[CC009OT]일때 사용) ("CB008UNIV, CB008HSCL")
	 *		7. iOtIsTreeView	: 트리보이기 유무 									(선택)
	 *								  default : N (외부부서[CC009OT]일때 사용) "Y" 
	 *  	8. iLanDivRcd 	: 언어키													(선택)
	 *  	9. iKeyDate 		: 기준일													(필수)
	 *  	10. oObjDivRcd 	: 객체구분코드 
	 *  	11. oCd 			: 부서코드
	 *  	12. oCdNm 		: 부서명
	 *  	13. oBegDt 		: 시작일
	 *  	14. oEndDt 		: 종료일
	 *  	15. oLanDivRcd 	: 언어키
	 *  	16. func 			: 팝업에서 선택한 값을 받은 후 추가 로직이 필요한 경우 함수
	 *									  
	 *******************************************************************************************************/	
	moPObject.moIdsForStdCmnPObjSch = [
	{
		controlId			:	"btnSaNm",
		iCd					:	"",
		iNm					:	"ipbSaNm",
		iObjDivRcd			:	["CC009OG","CC009SA"],
		iStartObject    	:   "",
		iOtDivRcd			:	"",
		iOtIsTreeView	:	"",
		iLanDivRcd		:	"",
		iKeyDate			:	"20111120000000",
		iKeyEndDate		:	"20150831000000",
		iBetweenEndDtYn : "Y",
		oObjDivRcd		:	"",
		oCd					:	"/root/reqKey/strSaCd",
		oCdNm				:	"ipbSaNm",
		oBegDt				:	"",
		oEndDt				:	"",
		oLanDivRcd		:	"",
		func 					:  function(poRtnValue){
									//객체검색 후 callBack Func
									//결과 object : poRtnValue.result
								   }
	},
	{
		controlId			:	"rdBtnSaNm",
		iCd					:	"",
		iNm					:	"rdIpbSaNm",
		iObjDivRcd			:	["CC009SA"],
		iStartObject    	:   "",
		iOtDivRcd			:	"",
		iOtIsTreeView	:	"",
		iLanDivRcd		:	"",
		iKeyDate			:	"/root/resOnLoad/strKeyDate",
		iKeyEndDate		:	"",
		iBetweenEndDtYn : "Y",
		oObjDivRcd		:	"",
		oCd					:	"rdIpbSaCd",
		oCdNm				:	"rdIpbSaNm",
		oBegDt				:	"",
		oEndDt				:	"",
		oLanDivRcd		:	"",
		func					:	function(poRtnValue){
									//객체검색 후 callBack Func
									//결과 object : poRtnValue.result
								   }
	}
	];
	
	/**
	 * @desc  Header Import onLoad
	 * @return void
	 * @author xxxx 2015. 6. 5.
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		doHeaderOnLoad();
	};
	
	/**
	 * @desc  onModelConstructDone  event
	 * @return void
	 * @author xxxx 2015. 6. 5.
	 */
	moPage.onModelConstructDone_StdCmnCTmpSingRepeat = function() {
		
		//리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init("rptCmnTmpReg");
		
		//검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grp_rptCmnTmpReg"]);
				
		//서브미션 실행 (두번째 인자가 'onLoad' 일 경우 서브미션 실패시 coverPage 실행)
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				//서브미션 성공시 로직 구현..
			}
		});
	};
		
	/**
	 * @desc  학생목록 조회 submission 실행
	 * @param {Function} poCallBackFunc 콜백정의
	 * @return void
	 * @author xxxx 2015. 6. 5.
	 */
	function doList(poCallBackFunc) {
		
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdCmnTmpReg");	
				// 조회 후 콜백함수 수행
				if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess); 
			}
		}); 
	}
	
	/**
	 * @desc  학생목록 리피트 저장 submission 실행
	 * @return void
	 * @author xxxx 2015. 6. 5.
	 */
	function doSave() {
		
		// 리피터 변경사항 체크
		if(!util.Grid.isModified(app, ["grdCmnTmpReg"], "MSG")){
			return false;
		}
		
		//리피트 validation check
		if(!util.validate(app, "grdCmnTmpReg")) return false;
		
		//strCommand: save 
		util.Submit.send(app, "subSave", function(pbSuccess){
			if(pbSuccess){
				doList(function(pbListSuccess) {
					// 조회 : "갱신된 데이터가 조회되었습니다." header 메세지 표시
					if (pbListSuccess) util.Msg.notify(app, "NLS.INF.M025");
				});
			}
		});
	}
	
	/**
	 * @desc  조회 버튼 click event 
	 *             필수 검색 조건이 존재할 경우 필수 체크 사항
	 *              1. 필수검색조건 컨트롤의 UserDefineAttr 지정
     *              2. valid 체크 공통 함수 사용
	 *               if(!util.validate(app, "ipbSaNm")) return false;
	 *			    3. 조회버튼의 최초 함수에 return 지정 
	 *                예) 조회버튼클릭 후 에디터 창 return page.onClick_BtnSearch(); 
	 *                 
	 * @return void
	 * @author xxxx 2015. 6. 5.
	 */
	moPage.onClick_BtnSearch = function() {
		 
		 util.Control.setEnable(app, true, "btnStudNo");
		 
		 //작업영역 리피트 변경 내역 체크
		if(util.Grid.isModified(app, "", "CRM")){
			return false;
		}
		
		doList(function(pbSuccess) {
			// 조회 : "조회되었습니다." header 메세지 표시
			if (pbSuccess) util.Msg.notify(app, "NLS.INF.M024");
		});
	};
	
	/**
	 * @desc 신규 click event
	 *            학생목록 리피트 row 추가
	 * @return void
	 * @author xxxx 2015. 6. 5.
	 */		
	moPage.onClick_BtnNew = function() {
		//해당 리피트 insertRow 후 편집 시작할 컬럼 지정
		util.Grid.insertRow(app, "grdCmnTmpReg", "rdIpbStudNo");
	};
	
	/**
	 * @desc 삭제 click event
	 *            학생목록 리피트 index row 삭제 status 변경
	 * @return void
	 * @author xxxx 2015. 6. 5.
	 */	
	moPage.onClick_BtnDel = function() {
		util.Grid.deleteRow(app, "grdCmnTmpReg");
	};
	
	/**
	 * @desc 작업취소 click event
	 *            학생목록 리피트 index row restore
	 * @return void
	 * @author xxxx 2015. 6. 5.
	 */	
	moPage.onClick_BtnRestore = function() {
		util.Grid.restoreRow(app, "grdCmnTmpReg");
	};
	
	/**
	 * @desc 작업저장 click event
	 *            학생목록 리피트 변경내역 저장
	 * @return void
	 * @author xxxx 2015. 6. 5.
	 */	
	moPage.onClick_BtnSave = function() {
		doSave();
	};
	
	/**
	 * @desc 검색조건의 학사부서 valueChange event
	 *            학사부서 팝업 호출
	 * @param {Object} sender 이벤트 객체
	 * @return void
	 * @author xxxx 2015. 6. 5.
	 */	
	moPage.onValueChanged_IpbSaNm = function(sender) {
		doOnChangeStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc 검색조건의 학사부서 버튼 click event
	 *            객체검색 팝업 호출
	 * @param {Object} sender 이벤트 객체
	 * @return void
	 * @author xxxx 2015. 6. 5.
	 */	
	moPage.onClick_BtnSaNm = function(sender) {
		doOnClickStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc 검색조건의 학번 valueChange event
	 *            학생 검색 팝업 호출
	 * @param {Object} sender 이벤트 객체
	 * @return void
	 * @author xxxx 2015. 6. 5.
	 */	
	moPage.onValueChanged_IpbStudNo = function(sender) {
		doOnChangeStdCsrPStSearch(sender);
	};
	
	/**
	 * @desc 검색조건의 학번 버튼 click event
	 *            학생 검색 팝업 호출
	 * @param {Object} sender 이벤트 객체
	 * @return void
	 * @author xxxx 2015. 6. 5.
	 */	
	moPage.onClick_BtnStudNo = function(sender) {
		doOnClickStdCsrPStSearch(sender);
	};
	
	/**
	 * @desc 학생목록 리피트 panel click event
	 *			 학생목록 리피트 row all check
	 * @return void
	 * @author xxxx 2015. 6. 5.
	 */	
	moPage.onValueChanged_RhCkbSelect = function() {
//TO-BE: <ExtRepeat.selectedAllPanel> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.selectedAllPanel("rhCkbSelect");
	};
	
	/**
	 * @desc 학생목록 리피트 학번 valueChange event
	 *           학생 검색 팝업 호출
	 * @param {Object} sender 이벤트 객체
	 * @return void
	 * @author xxxx 2015. 6. 5.
	 */	
	moPage.onValueChanged_RdIpbStudNo = function(sender) {
		doOnChangeStdCsrPStSearch(sender);
	};
	
	/**
	 * @desc 학생목록 리피트 학번 버튼 click event
	 *           학생 검색 팝업 호출
	 * @param {Object} sender 이벤트 객체
	 * @return void
	 * @author xxxx 2015. 6. 5.
	 */	
	moPage.onClick_RdBtnStudNo = function(sender) {
		doOnClickStdCsrPStSearch(sender);
	};
	
	/**
	 * @desc 학생목록 리피트 부서명 valueChange event
	 *           객체 검색 팝업 호출
	 * @param {Object} sender 이벤트 객체
	 * @return void
	 * @author xxxx 2015. 6. 5.
	 */	
	moPage.onValueChanged_RdIpbSaNm = function(sender) {
		doOnChangeStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc 학생목록 리피트 부서명 버튼 click event
	 *           객체 검색 팝업 호출
	 * @param {Object} sender 이벤트 객체
	 * @return void
	 * @author xxxx 2015. 6. 5.
	 */	
	moPage.onClick_RdBtnSaNm = function(sender) {
		doOnClickStdCmnPObjSch(sender);
	};
	
	
	moPage.onLoadImportDone_Import1 = function() {
		doExtCmnSmsEmailLoad();
	}
	
	
	moPage.onKeyDown_IpbSaNm = function(strKeyType, strKeyStatus) {
		// 엔터키 입력시 조회
		if(e.keyCode == cpr.events.KeyCode.ENTER){
			//model.setFocus(null);
			doOnChangeStdCmnPObjSch(sender);
		}
	};
	
	
	moPage.onClick_Button1 = function() {
		Common.popMenuNotice();
	};
	return moPage;
};

