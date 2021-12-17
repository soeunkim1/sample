//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
///<xtmlink path="./extCcsSAttendPoto.xtm"/>

var extCcsSAttendPoto = function() {

	var moPage = new Page();
	//임포트용 데이터 통신 오브젝트
	var moPObject = new PObject();
		
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
		iObjDivRcd			:	["CC009SA"],
		iStartObject    	:   "",
		iOtDivRcd			:	"",
		iOtIsTreeView	:	"",
		iLanDivRcd		:	"/root/resOnLoad/strLanDivRcd",
		iKeyDate			:	"/root/reqKey/strKeyDate",
		iKeyEndDate		:	"",
		oObjDivRcd		:	"/root/reqKey/strSaObjDivRcd",
		oCd					:	"/root/reqKey/strSaCd",
		oCdNm				:	"ipbSaNm",
		oBegDt				:	"",
		oEndDt				:	"",
		oLanDivRcd		:	"",
		func 					:  function(){}
	}];
	
	// 개설과목검색팝업 호출
	moIdsForStdCcsPOpenSubPopup = [
	{ 
		 controlId					: "btnSbCd",			
		 iDivClsYn					: "Y",		
		 iLanDivRcd				: "/root/resOnLoad/strLanDivRcd",
		 iKeyDate             		: "/root/keyDateMap/ST_DT",
		 iSchYearRcd             : "cbbSchYearRcd",
		 iSmtRcd             		: "cbbSmtRcd",
		 iSaCd        				: "/root/reqKey/strSaCd",			
		 iSaNm        				: "ipbSaNm",		
		 iSaObjDivRcd       		: "/root/reqKey/strSaObjDivRcd",		
		 iSbCd        				: "ipbSbNm",			
		 iSbNm        				: "",		
		 iCmpDivRcd        		: "",			
		 
		 oSpCd						: "",			
		 oSpNm					: "",			
		 oSbCd						: "/root/reqKey/strSbCd",			
		 oSbNm					: "ipbSbNm",			
		 oSaCd						: "",			
		 oSaNm					: "",			
		 oCuCd						: "/root/reqKey/strCuCd",		
		 oCuNm					: "",		
		 oSchYearRcd			: "",		
		 oSmtRcd					: "",	
		 oDivclsCd					: "",	
		 oDivclsNm				: "/root/reqKey/strDivclsNm",	
		 oCmpDivRcd				: "",		
		 oPnt							: "",		
		 oTheoTc					: "",	
		 oEpacTc					: "",	
		 oSbDivRcd				: "",		
		 oSbTypeRcd				: "",		
		 oSaPostDivRcd			: "",		
		 oProfNo					: "",	
		 oProfNm					: "",			
		 oLectRoomNm			: "",		
		 oRefKey					: "/root/reqKey/strRefKey",		
		 func 					:  function(voParam){
			util.Control.redraw(app, "ipbDivclsNm");
			if(voParam != null){
				if("" != voParam.Result.REF_KEY){
					
					util.DataMap.setValue(app, "dmReqKey", "strSaObjDivRcd", "CC009SA");
					util.DataMap.setValue(app, "dmReqKey", "strSaCd", voParam.Result.SA_CD);
					util.Control.setValue(app, "ipbSaNm", voParam.Result.SA_NM);			
					util.Control.redraw(app, "ipbSaNm");
					
				}
			}
			
		}
	 }];
	
	// 교직원 검색
	 moPObject.moIdsForStdCmnPPrsnSearch = [
	{
		 controlId					: "btnProfObjNo",
		 istrStaffGrpAuth			: "",					
		 istrWkdtyAuth			: "true",				
		 iKeyDate					: "",	
		 iStaffNo					: "ipbProfNm",			
		 iStaffGrpRcd				: "",		
		 iStaffGrpRcdLock		: "", 			
		 iStaffSubGrpRcd		: "",	
		 iStaffSubGrpRcdLock	: "",				
		 iStatusRcd				: "",				
		 iRepNm					: "",				
		 iObjDivRcd				: "",
		 iObjCd						: "",				
		 iObjNm					: "",	
		 istrObjCdInList			: "",
		 iWkgrdRcd				: "",	
		  
		 oObjNo					: "/root/reqKey/strProfObjNo",
		 oStaffNo					: "",					
		 oRepNm					: "ipbProfNm",					
		 oBirthday					: "",					
		 oStatNm					: "",				
		 oStatRcd					: "",					
		 oOgNm					: "",				
		 oOgCd						: "",				
		 oPosNm					: "",				
		 oPosCd					: "",				
		 oWkgrdNm				: "",			
		 oWkgrdRcd				: "",				
		 oStaffGrpRcd				: "",					
		 oStaffSubGrpRcd		: "",				
		 oHoRcd					: "",					
		 oSsn						: "",					
		 oWkdtyRcd				: "",					
		 oWkdtyNm				: "",				
		 func                         : function(poRtnValue){
			 
			page.doChargeSbList();
		 }
	}];
	
	
	/*
		학생 검색 팝업
	*/
	moPObject.moIdsForStdCsrPStSearch = [
	{
		controlId 					: "btnPopStudSearch",
		iStudNo 					: "ipbStudNo",	
		iStudId 						: "",
		iStudNm 					: "",
		iKeyDate 					: "/root/keyDateMap/END_DT",
		iObjDivRcd 				: "",
		iObjCd 						: "",
		iObjNm 					: "",
		iStatRcd 					:"",
		iStudDivRcd				: "",
		oStudId 					: "/root/reqKey/strStudId",
		oStudNo 					: "ipbStudNo",
		oStudNm 					: "",
		oStatNm 					: "",
		oStatRcd 					: "",
		oProcRslt 					: "",
		oProcRsltYear 			: "",
		oSaNm						: "",
		oSaCd 						: "",
		oSpNm 					: "",
		oSpCd 						: "",
		oOgNm 					: "",
		oOgCd 						: "",
		oStudDivRcd				: "",
		oStudDivNm				: "",
		oBirthday					: "",
		oGenderRcd				: "",
		oGenderNm				: "",
		func : function() {
			page.doChargeSbList();
		}
	}
	];
	
	
	
	// 학년도 학기를 원래데이터로 되돌리기위한 변수
	var msSchYearRcd = "";
	var msSmtRcd = "";
	
	/**
	 * @desc  Header Import onLoad
	 * @return void
     * @author 유형기 at 2016.7.7
     */
	moPage.onLoadImportDone_ImpTitle = function() {
		doHeaderOnLoad();
	};
				
	/**
	 * @desc 화면 초기화
	 * @return 
	 * @author 양선하 2016.06.20
	 */
	moPage.onModelConstructDone_ExtCcsSAttendPoto = function() {
		doOnLoad();
	};


	/**
	 * @desc 온로드 실행
	 * @return 
	 * @author 유형기 at 2016.7.7
	 */
	function doOnLoad() {
		
		//검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", "grpData");
		
		// 권한에따른 교수명 컬럼 검색가능 여부
		doVisibleCtlByAuth();
		
		//서브미션 실행 (실패시 cover page)
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
		
			if(pbSuccess){
					util.Control.setValue(app, "dipKeyDate",util.DataMap.getValue(app, "dmKeyDateMap", "END_DT"));
					
					util.DataMap.setValue(app, "dmReqKey", "strPrtData", "1");
					
					//조회조건 컨트롤 refresh(학년도, 학기)
					util.Control.redraw(app, ["cbbSchYearRcd", "cbbSmtRcd","dipKeyDate", "cbbProcRlst", "cbbPrtData"]);
					util.SelectCtl.selectItem(app, "cbbProcRlst", "CA20600");
					util.SelectCtl.selectItem(app, "cbbPrtOrd", 0);
					util.SelectCtl.selectItem(app, "cbbPrtData", 0);
					util.SelectCtl.selectItem(app, "cbbProcRlst", "");
					
					var vsDefYear = util.DataMap.getValue(app, "dmKeyDateMap", "YEAR");
					var vsDefSmt = util.DataMap.getValue(app, "dmKeyDateMap", "SMT");
					var vsKeyDate = util.DataMap.getValue(app, "dmKeyDateMap", "END_DT");
					
					if(ValueUtil.isNull(vsDefYear)) {
						// 콤보박스 첫 번째 값 세팅
						util.SelectCtl.selectItem(app, "cbbSchYearRcd", 0);
					} else {
						// 학년도로 기본 셋팅
						util.Control.setValue(app, "cbbSchYearRcd",vsDefYear);
						
					}
					
					if(ValueUtil.isNull(vsDefSmt)) {
						// 콤보박스 첫 번째 값 세팅
						util.SelectCtl.selectItem(app, "cbbSmtRcd", 0);
					} else {
						// 학기로 기본 셋팅
						util.Control.setValue(app, "cbbSmtRcd",vsDefSmt);
					}
					
					// 기준일 세팅
					util.DataMap.setValue(app, "dmRoot", "reqKey", "strKeyDate", vsKeyDate);
					
					// 학사부서 focus
					util.Control.setFocus(app, "ipbSaNm");
					
					// 개인권한[CC00104]일경우 담당교과목 조회
					if(moPageInfo.authRngRcd == "CC00104"){
						// 담당교과목목록 조회
						doChargeSbList();
					}
				
					
			}
		});
	};
	
	/**
	 * 권한에 따른 교수명 활성/비활성 처리
	 * @param 
	 * @type void
	 * @author 박갑수 at 2016. 5. 2
	 */	
	function doVisibleCtlByAuth() {
		
		// 개인권한[CC00104] : 
		if (moPageInfo.authRngRcd == "CC00104") {
			util.Control.setVisible(app, false, ["lblSaNm", "ipbSaNm", "btnSaNm", "btnProfObjNo"]);
			util.Control.setVisible(app, true, ["lblProfNm", "ipbProfNm"]);
			util.Control.setValue(app, "rdbProfOrSa", "PROF");
			util.Control.setEnable(app, false, ["ipbProfNm", "rdbProfOrSa"]);
			
			util.Control.setValue(app, "ipbProfNm", moUserInfo.userNm);
			util.DataMap.setValue(app, "dmReqKey", "strProfObjNo", moUserInfo.id);
			util.Control.setStyleAttr(app, "ipbProfNm", "width", "150");
			
			page.doChagnCtlAuth();
		}else {
			util.Control.setValue(app, "rdbProfOrSa", "SA");
		}
	};
	
	/**
	 * @desc 조회조건(학사부서)항목초기화
	 * @param 
	 * @return void
	 * @author 유형기 at 2016.7.7
	 */
	function doClearSchCtl() {
		
		// 학사부서
		util.Control.setValue(app, "ipbSaNm", "");
		util.DataMap.setValue(app, "dmReqKey", "strSaObjDivRcd", "");
		util.DataMap.setValue(app, "dmReqKey", "strSaCd", "");
	};
	

	/**
	 * @desc 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회 함수
	 * @param 
	 * @return void
	 * @author 유형기 at 2016.7.7
	 */
	function doChangeYearSmt(psDiv) {
		
		util.DataMap.setValue(app, "dmRoot", "keyDateMap", "YEAR", util.DataMap.getValue(app, "dmReqKey", "strSchYearRcd"));
		util.DataMap.setValue(app, "dmRoot", "keyDateMap", "SMT", util.DataMap.getValue(app, "dmReqKey", "strSmtRcd"));
		
		//strCommand: date 
		util.Submit.send(app, "subDate", function(pbSuccess){
			
			
			
			if(pbSuccess){
				msSchYearRcd = util.DataMap.getValue(app, "dmKeyDateMap", "YEAR");
				msSmtRcd = util.DataMap.getValue(app, "dmKeyDateMap", "SMT");
				
				var vsKeyDate = util.DataMap.getValue(app, "dmKeyDateMap", "END_DT");
				
				var vsProfOrSa = util.DataMap.getValue(app, "dmReqKey", "strProfOrSa");
				
				// 조회조건 세팅
				util.Control.setValue(app, "cbbSchYearRcd", msSchYearRcd);
				util.Control.setValue(app, "cbbSmtRcd", msSmtRcd);
				util.DataMap.setValue(app, "dmRoot", "reqKey", "strKeyDate", vsKeyDate);
				
				if("PROF" == vsProfOrSa){
					page.doChargeSbList();
				}
				
			// Exception 발생시
			}else {
				if(psDiv == "year"){
					util.Control.setValue(app, "cbbSchYearRcd", msSchYearRcd);
				}else if(psDiv == "smt"){
					util.Control.setValue(app, "cbbSmtRcd", msSchYearRcd);
				}
				util.DataMap.setValue(app, "dmRoot", "reqKey", "strKeyDate", "");
			}
		});
	};
	
	/**
	 * @desc [btnSearch] 조회 버튼 on click 이벤트
	 * @return void
	 * @author 유형기 at 2016.7.7
	 */
	moPage.onClick_BtnSearch = function() {
		 //작업영역 리피트 변경 내역 체크
		if(util.Grid.isModified(app, "", "CRM")){
			return false;
		}
		
		// 교수명 or 학사부서
		var vsProfOrSa = util.Control.getValue(app, "rdbProfOrSa");
		var vsCosRefKey = util.DataMap.getValue(app, "dmReqKey", "strSbRefKey");
		var vsSaRefKey = util.DataMap.getValue(app, "dmReqKey", "strRefKey");
		var vsRefKey = "";
		// 교과목일경우
		if(ValueUtil.fixNull(vsProfOrSa) == "SA"){
			// 조회조건 필수 체크
			if(!util.validate(app, ["cbbSchYearRcd", "cbbSmtRcd", "ipbSaNm", "dipKeyDate", "cbbPrtOrd", "cbbPrtData"])){
				return false;
			}
			
			vsRefKey = vsSaRefKey;
						
		// 교수일경우
		}else if(ValueUtil.fixNull(vsProfOrSa) == "PROF"){
			// 조회조건 필수 체크
			if(!util.validate(app, ["cbbSchYearRcd", "cbbSmtRcd", "ipbProfNm", "dipKeyDate", "cbbPrtOrd", "cbbPrtData"])){
				return false;
			}
			
			vsRefKey = vsCosRefKey;
			
			//--학생일 경우
		}else{
			// 조회조건 필수 체크
			if(!util.validate(app, ["cbbSchYearRcd", "cbbSmtRcd", "ipbStudNo", "dipKeyDate", "cbbPrtOrd", "cbbPrtData"])){
				return false;
			}
			
			vsRefKey = vsCosRefKey;
		}
		
		var vsYear = util.DataMap.getValue(app, "dmReqKey", "strProcRlst");
		
		if(vsYear == "CA20600"){
			vsYear = "";
		}
		
		
		
		
		var voParam = {
				p_strLanDivRcd 		: msDefaultLocale,	 														// 언어키
				p_strKeyDate 		: util.DataMap.getValue(app, "root/reqKey", "strKeyDate"),			// 기준일자(시작일)
				p_strSchYearRcd 	: util.DataMap.getValue(app, "root/reqKey", "strSchYearRcd"),		// 학년도코드
				p_strSmtRcd 			: util.DataMap.getValue(app, "root/reqKey", "strSmtRcd"),			// 학기코드
				p_strSaCd				: util.DataMap.getValue(app, "root/reqKey", "strSaCd"),				// 학과코드
				p_strProfObjNo		: util.DataMap.getValue(app, "dmReqKey", "strProfObjNo"),			// 교수
				p_strRefKey			: vsRefKey,				// ref키
				
				p_strSbCd				: util.DataMap.getValue(app, "dmReqKey", "strSbCd"),				// 교과목코드
				p_strDivclsNm		: util.DataMap.getValue(app, "dmReqKey", "strDivclsNm"),			// 분반명
				p_strCuCd				: util.DataMap.getValue(app, "dmReqKey", "strCuCd"),				// 교과그룹
				
				p_strProcRlst			: vsYear,			// 학년
				p_strPrtOrd			: util.DataMap.getValue(app, "dmReqKey", "strPrtOrd"),				// 출력순서
				p_strPrtData			: util.DataMap.getValue(app, "dmReqKey", "strPrtData"),				// 데이타 출력유무
				
				p_strStudId			: util.DataMap.getValue(app, "dmReqKey", "strStudId"),				// 학생 오브젝트아이디
				
				p_strCheckAuthId 	: moUserInfo.id,																//사용자ID
				p_strPath				: util.DataMap.getValue(app, "dmResOnLoad", "strPath")												//url경로
			};
		
		
		 var voOzFormParam = {
			  TITLE : "출    석    부" //리포트타이틀
			, SUB_TITLE : "" //리포트서브타이틀		
			, FORM_TYPE : "flash"
		};	
				
		util.Report.open(app, "hojReport", "extCcsSAttendPoto", voOzFormParam, voParam);
		
	};
	
	
	/**
	 * @desc [cbbSchYearRcd] 학년도 value changed 이벤트
	 * @param 
	 * @return void
	 * @author 유형기 at 2016.7.7
	 */
	moPage.onValueChanged_CbbSchYearRcd = function() {
		// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
		doChangeYearSmt("year");
		
		// 조회조건(학사부서명, 학생명)항목초기화
		doClearSchCtl();
	};
	
	/**
	 * @desc [cbbSmtRcd]학기 value changed 이벤트
	 * @param 
	 * @return void
	 * @author 유형기 at 2016.7.7
	 */
	moPage.onValueChanged_CbbSmtRcd = function() {
		// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
		doChangeYearSmt("smt");
		
		// 조회조건(학사부서명, 학생명)항목초기화
		doClearSchCtl();
	};
	
	/**
	 * @desc [btnSaNm]학사부서명 버튼 click 이벤트
	 * @param 
	 * @return void
	 * @author유형기 at 2016.7.7
	 */
	moPage.onClick_BtnSaNm = function(sender) {
		doOnClickStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc [IpbSaNm]학사부서명 value changed 이벤트
	 * @param 
	 * @return void
	 * @author 유형기 at 2016.7.7
	 */
	moPage.onValueChanged_IpbSaNm = function(sender) {
		doOnChangeStdCmnPObjSch(sender);
	};
	
	
	moPage.onClick_BtnSbCd = function(sender) {
		// 개설과목검색팝업 호출
		doOnClickStdCcsPOpenSubPopup(sender);
	};
	
	moPage.onValueChanged_IpbSbNm = function(sender) {
		// 값변경시 교과목검색팝업 호출
		doOnChangeStdCcsPOpenSubPopup(sender);
	};
	
	/**
	 * @desc [btnProfObjNo]교수명(돋보기버튼) onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 10. 24
	 */
	moPage.onClick_BtnProfObjNo = function(sender) {
		// 교직원검색팝업 호출
		doOnClickStdCmnPPrsnSearch(sender);
	};
	
	/**
	 * @desc [ipbProfNm]교수명 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 10. 24
	 */
	moPage.onValueChanged_IpbProfNm = function(sender) {
		// 값변경시 교직원검색팝업 호출
		doOnChangeStdCmnPPrsnSearch(sender);
	};
	
	/**
	 * @desc [rdbProfOrSa]학사부서or교수 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 10. 24
	 */
	moPage.onValueChanged_RdbProfOrSa = function() {
		
		page.doChagnCtlAuth();
		
		// 값 초기화
		util.Control.setValue(app, "ipbSaNm", "");
		util.DataMap.setValue(app, "dmReqKey", "strSaCd", "");
		util.DataMap.setValue(app, "dmReqKey", "strSaObjDivRcd", "");
		util.Control.setValue(app, "ipbProfNm", "");
		util.DataMap.setValue(app, "dmReqKey", "strProfObjNo", "");
		util.Control.setValue(app, "cbbProcRlst", "");
		util.Control.setValue(app, "ipbDivclsNm", "");
		util.Control.setValue(app, "ipbSbNm", "");
		util.DataMap.setValue(app, "dmReqKey", "strSbCd", "");
		util.DataMap.setValue(app, "dmReqKey", "strSbRefKey", "");
		
		util.DataMap.setValue(app, "dmReqKey", "strStudNo", "");
		util.DataMap.setValue(app, "dmReqKey", "strStudId", "");
		
		
		ExtSelectCtl.deleteAllItem("cbbSbCd");
		
	};
	
	
	function doChagnCtlAuth(){
		
		var vsProfOrSa = util.Control.getValue(app, "rdbProfOrSa");

		util.Control.setVisible(app, false, ["lblSaNm", "ipbSaNm", "btnSaNm", "lblProcRlst", "cbbProcRlst", "lblDivclsNm", "ipbDivclsNm", "lblSbNm", "ipbSbNm", "btnSbCd"
		, "lblProfNm", "ipbProfNm", "btnProfObjNo", "lblSbCd", "cbbSbCd"
		, "lblStudId", "ipbStudNo", "btnPopStudSearch"
		]);
		
		// 학사부서일경우
		if(ValueUtil.fixNull(vsProfOrSa) == "SA"){
			util.Control.setVisible(app, true, ["lblSaNm", "ipbSaNm", "btnSaNm", "lblProcRlst", "cbbProcRlst", "lblDivclsNm", "ipbDivclsNm", "lblSbNm", "ipbSbNm", "btnSbCd"]);			
			
		//--교수일경우
		}else if(ValueUtil.fixNull(vsProfOrSa) == "PROF"){
			
			util.Control.setVisible(app, true, ["lblProfNm", "ipbProfNm", "btnProfObjNo", "lblSbCd", "cbbSbCd"]);
			
		// 학생일경우
		}else{			
			util.Control.setVisible(app, true, ["lblStudId", "ipbStudNo", "btnPopStudSearch", "lblSbCd", "cbbSbCd"]);
		}
	}
	
	
	
	/**
	 * @desc 담당교과목목록 조회
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 5. 2
	 */
	function doChargeSbList() {
		//strCommand: chargeSbList 
		util.Submit.send(app, "subChargeSbList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "cbbSbCd");
				util.SelectCtl.selectItem(app, "cbbSbCd", 0);
			}
		});
	};
	
	
	moPage.onClick_BtnPopStudSearch = function(sender) {
		doOnClickStdCsrPStSearch(sender);
	}
	
	moPage.onValueChanged_IpbStudNo = function(sender) {
		doOnChangeStdCsrPStSearch(sender);
	}
	return moPage;
};
