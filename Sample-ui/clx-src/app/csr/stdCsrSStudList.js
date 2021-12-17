//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
///<xtmlink path="./stdCsrSStudList.xtm"/>

var stdCsrSStudList = function() {

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
		{   //조회조건 행정부서 학사부서
			controlId			:	"btnPopSearch",
			iCd					:	"",
			iNm					:	"ipbSaNm",
			iObjDivRcd			:	["CC009SA", "CC009OG"],
			iStartObject    	:   "",
			iOtDivRcd			:	"",
			iOtIsTreeView	:	"Y",
			iLanDivRcd		:	"",
			iKeyDate			:	"19000101",
			iKeyEndDate		:	"99991231",
			oObjDivRcd		:	"/root/reqList/strObjDivRcd",
			oCd					:	"/root/reqList/strSaCd",
			oCdNm				:	"ipbSaNm",
			oBegDt				:	"",
			oEndDt				:	"/root/reqList/strSaEndDt",
			oLanDivRcd		:	"",
			func 					:  null
		}
	];
	
	/*******************필수정의사항 start**********************/ 
	/**
	 * 교직원검색팝업 관련 설정사항
	 * 각 변수별 설명
	 *  iXXX : 팝업으로 input 전달될 파라미터
	 *  oXXX : 팝업에서 선택한 값을 받을 컬럼 아이디
	 *  [IN]
	 *   1. controlId					: (필수) 최초 이벤트의 버튼id
	 *   2. istrStaffGrpAuth			: (선택) 교직원 그룹에 대한 인사자료권한 적용여부(적용시 : true)
	 *   3. istrWkdtyAuth			: (선택) 보직에 해당되는 사람 조회여부(조회시 : true), 현재사용하지 않음(2013.04.11)
	 *   4. iKeyDate					: (선택) 기준일자(NULL일 경우 현재일자)
	 *   4. iStaffNo					: (선택) 교직원번호
	 *   5. iStaffGrpRcd				: (선택) 교직원 그룹[CF001]
	 *   6. iStaffGrpRcdLock		: (선택) 교직원그룹 잠금적용여부(적용시 : true), 교직원 팝업에서 조건변경해도 활성안됨.
	 *   7. iStaffSubGrpRcd		: (선택) 교직원 하위그룹[CF003]
	 *   8. iStaffSubGrpRcdLock	: (선택) 교직원 하위그룹 잠금적용여부(적용시 : true), 교직원 팝업에서 조건변경해도 활성안됨.
	 *   9. iStatusRcd				: (선택) 상태[CF005](재직, 휴직, 퇴직 등을 말함)
	 *  10. iRepNm					: (선택) 성명
	 *  11. iObjDivRcd				: (선택) 객체구분코드[CC009]
	 *  12. iObjCd						: (선택) 부서코드
	 *  13. iObjNm					: (선택) 부서명
	 *  14. istrObjCdInList			: (선택) 복수 행정부서 지정(부서에 대한 IN조건 "'A','B','C'" 형식으로 셋팅)
	 *  15. iWkgrdRcd				: (선택) 직급[CF007]
	 *  [OUT]
	 *  16. oObjNo					: 오브젝트번호
	 *  17. oStaffNo					: 교직원번호
	 *  18. oRepNm					: 성명
	 *  19. oBirthday					: 생년월일
	 *  20. oStatNm					: 상태명
	 *  21. oStatRcd					: 상태코드
	 *  22. oOgNm					: 부서명
	 *  23. oOgCd						: 부서코드
	 *  24. oPosNm					: 포지션명
	 *  25. oPosCd					: 포지션코드
	 *  26. oWkgrdNm				: 직급명
	 *  27. oWkgrdRcd				: 직급코드
	 *  28. oStaffGrpRcd			: 교직원그룹코드
	 *  29. oStaffSubGrpRcd		: 교직원하위그룹코드
	 *  30. oHoRcd					: 호봉코드
	 *  31. oSsn						: 주민등록번호
	 *  32. oWkdtyRcd				: 직책코드
	 *  33. oWkdtyNm				: 직책명
	 *  34. func						: 팝업에서 선택한 값을 받은 후 추가 로직이 필요한 경우 함수 작성
	 */ 
	 moPObject.moIdsForStdCmnPPrsnSearch = [
		 { 
			 controlId					: "btnPopProfSearch",				//(필수) 교직원검색 버튼ID
			 istrStaffGrpAuth			: "",										//(선택) 셋팅 교직원 그룹에 대한 인사자료권한 적용여부(적용시 : true)
			 istrWkdtyAuth			: "true",									//(선택) 셋팅 보직에 해당되는 사람 조회여부(조회시 : true), 현재사용하지 않음(2013.04.11)
			 iKeyDate					: "/root/reqList/strKeyDate",	//(선택) 셋팅 기준일자(NULL일 경우 현재일자)
			 iStaffNo					: "ipbProfNm",						//(선택) 셋팅 교직원번호
			 iStaffGrpRcd				: "",										//(선택) 셋팅 교직원그룹
			 iStaffGrpRcdLock		: "", 										//(선택) 셋팅 교직원그룹 잠금적용여부(적용시 : true), 교직원 팝업에서 조건변경해도 활성안됨.
			 iStaffSubGrpRcd		: "",										//(선택) 셋팅 교직원 하위그룹[CF003]
			 iStaffSubGrpRcdLock	: "",										//(선택) 셋팅 교직원 하위그룹 잠금적용여부(적용시 : true), 교직원 팝업에서 조건변경해도 활성안됨.
			 iStatusRcd				: "",										//(선택) 셋팅 상태[CF005](재직, 휴직, 퇴직 등을 말함)
			 iRepNm					: "",										//(선택) 셋팅 성명
			 iObjDivRcd				: "",										//(선택) 셋팅 객체구분코드[CC009]
			 iObjCd						: "",										//(선택) 셋팅 부서코드
			 iObjNm					: "",										//(선택) 셋팅 부서명
			 istrObjCdInList			: "",										//(선택) 셋팅 복수 행정부서 지정(부서에 대한 IN조건 "'A','B','C'" 형식으로 셋팅)
			 iWkgrdRcd				: "",										//(선택) 셋팅 직급[CF007]
			  
			 oObjNo					: "ipbProfId",							//리턴 오브젝트번호
			 oStaffNo					: "",										//리턴 교직원번호
			 oRepNm					: "ipbProfNm",						//리턴 성명
			 oBirthday					: "",										//리턴 생년월일[CF001]
			 oStatNm					: "",										//리턴 상태명
			 oStatRcd					: "",										//리턴 상태코드
			 oOgNm					: "",										//리턴 부서명
			 oOgCd						: "",										//리턴 부서코드
			 oPosNm					: "",										//리턴 직위명
			 oPosCd					: "",										//리턴 직위코드
			 oWkgrdNm				: "",										//리턴 직급명
			 oWkgrdRcd				: "",										//리턴 직급
			 oStaffGrpRcd				: "",										//리턴 교직원그룹 
			 oStaffSubGrpRcd		: "",										//리턴 교직원 하위그룹 
			 oHoRcd					: "",										//리턴 호봉코드
			 oSsn						: "",										//리턴 주민번호
			 oWkdtyRcd				: "",										//리턴 직책코드 
			 oWkdtyNm				: "",										//리턴 직책명 
			 func                         : null
		 }
	];
	
	
	/**
	 * @desc 헤더 임포트 온로드
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 3. 14
     */
	moPage.onLoadImportDone_ImpTitle = function() {
		doHeaderOnLoad();
	};

	/**
	 * @desc 화면 온로드
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 3. 14
	 */
	moPage.onModelConstructDone_stdCsrSStudList = function() {
		//리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init("rptCsrShreg");
		// 2. 검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grpData"]);
		
		//서브미션 실행 (실패시 cover page)
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				util.DataMap.setValue(app, "dmReqList", "strKeyDate", util.DataMap.getValue(app, "dmResOnLoad", "strKeyDate"));
				
				if(moPageInfo.authRngRcd == "CC00102"){
					//strCommand: listTopObjInfo 
					util.Submit.send(app, "subImpStdCmnObjSchTopObjInfo", function(pbSuccess){
						ExtInstance.setValue("/root/reqList/strTopSaCd", ExtInstance.getValue("instance('insStdCmnPObjSch')/root/resListObjInfo/strObjCd"));
					});
				}
				
				util.Control.reset(app, ["ipbSaNm", "ipbSaCd"]);
				
				util.DataMap.setValue(app, "dmReqList", "strObjDivRcd", "");	
				util.Control.redraw(app, ["dipKeyDate", "cbbDgrCrsRcd", "cbbRegFeeCatRcd", "cbbDayNight", "cbbStudDivRcd", "cbbClass", "cbbNation", "cbbGender", "cbbStatus"]);
			}
		});
	}

	/**
	 * @desc 학생목록 조회
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 3. 14
	 */
	function doList(poCallBackFunc) {
		
		var vsHeaderValues = ContextUtil.setRptColFilterExcelInfo("rptCsrShreg");
		var vsRepeatNm = util.Grid.getTitle(app, "grdCsrShregCsrShreg");
		util.DataMap.setValue(app, "dmReqList", "strHeaderList", vsHeaderValues);
		util.DataMap.setValue(app, "dmReqList", "strExcelFileNm", vsRepeatNm);
		
		// submission call 
		//strCommand: list 
		util.Submit.send(app, "subList",  function(pbSuccess) {
			if(pbSuccess){

				var vsFileDir = util.DataMap.getValue(app, "dmExcelFileInfo", "strFileDir");
				//파일명
				var vsFileNm = util.DataMap.getValue(app, "dmExcelFileInfo", "strFileNm");
				//변환파일명(실제 서버에 저장된 파일명)
				var vsFileChgNm = util.DataMap.getValue(app, "dmExcelFileInfo", "strFileChgNm");
				var vsTmpFilePath = util.DataMap.getValue(app, "dmExcelFileInfo", "strTmpFilePath");

				var vsLmtNum = util.DataMap.getValue(app, "dmResList", "strLimitCnt");
				
				if(!(ValueUtil.isNull(vsFileNm) || vsFileNm == "")){
					var voFileParam = {
							"strFileSubPath" : "",
							"strFileNm" : vsFileChgNm,
							"strOriFileNm" : vsFileNm,
							"strTmpFilePath" :vsTmpFilePath,
							"strCommand" : "fileDownLoad"
					}
					util.Msg.alert("NLS-INF-M070", [vsLmtNum]);
					
					//다운로드 받을 파일 위치, 다운로드받을 파일이름, 프로그래스동작여부(일단 ""), actionUrl
					FileUtil.downloadFile( "/std.cmn.StdCmnFileTransUtil.ex",voFileParam);
					util.DataMap.setValue(app, "dmExcelFileInfo", "strFileDir","");
					util.DataMap.setValue(app, "dmExcelFileInfo", "strFileNm","");
					util.DataMap.setValue(app, "dmExcelFileInfo", "strFileChgNm","");
					util.DataMap.setValue(app, "dmExcelFileInfo", "strTmpFilePath","");
					return;
				}else{
					util.DataMap.setValue(app, "dmExcelFileInfo", "strFileDir","");
					util.DataMap.setValue(app, "dmExcelFileInfo", "strFileNm","");
					util.DataMap.setValue(app, "dmExcelFileInfo", "strFileChgNm","");
					util.DataMap.setValue(app, "dmExcelFileInfo", "strTmpFilePath","");
				}
					
				//rebuild
				util.Control.redraw(app, ["rptCsrShreg"]);
			}else{
					return false;
			}
			
			if(util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
		});
	}
	
	/**
	 * @desc 객체 검색
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 3. 14
	 */
	moPage.onValueChanged_IpbSaCd = function(sender) {
		doOnChangeStdCmnPObjSch(sender);
	}
	
	/**
	 * @desc 객체검색 팝업 호출
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 3. 14
	 */
	moPage.onClick_BtnPopSearch = function(sender) {
		// 기준일자 체크
		var vsKeyDate = util.Control.getValue(app, "dipKeyDate");
		var vsTitle = ExtControl.getTextValue("lblKeyDate");
		if (ValueUtil.isNull(vsKeyDate)) {
			//기준일자를 입력하여 주십시오.
			util.Msg.alert("NLS-CSR-M121",[vsTitle]);
			return;
		}
		doOnClickStdCmnPObjSch(sender);
	}
	
	/**
	 * @desc 소속 검색
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 3. 14
	 */
	moPage.onValueChanged_IpbSaNm = function(sender) {
		// 기준일자 체크
		var vsKeyDate = util.Control.getValue(app, "dipKeyDate");
		var vsTitle = ExtControl.getTextValue("lblKeyDate");
		if (ValueUtil.isNull(vsKeyDate)) {
			//기준일자를 입력하여 주십시오.
			util.Msg.alert("NLS-CSR-M121",[vsTitle]);
			return;
		}
		
		doOnChangeStdCmnPObjSch(sender);
	}
	
	/**
	 * @desc 교직원 검색 팝업 호출
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 3. 14
	 */
	moPage.onClick_BtnPopProfSearch = function(sender) {
		// 기준일자 체크
		var vsKeyDate = util.Control.getValue(app, "dipKeyDate");
		var vsTitle = ExtControl.getTextValue("lblKeyDate");
		if (ValueUtil.isNull(vsKeyDate)) {
			//기준일자를 입력하여 주십시오.
			util.Msg.alert("NLS-CSR-M121",[vsTitle]);
			return;
		}
		doOnClickStdCmnPPrsnSearch(sender);
	};
	
	/**
	 * @desc 교직원 검색
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 3. 14
	 */
	moPage.onValueChanged_IpbProfNm = function(sender) {
		// 기준일자 체크
		var vsKeyDate = util.Control.getValue(app, "dipKeyDate");
		var vsTitle = ExtControl.getTextValue("lblKeyDate");
		if (ValueUtil.isNull(vsKeyDate)) {
			//기준일자를 입력하여 주십시오.
			util.Msg.alert("NLS-CSR-M121",[vsTitle]);
			return;
		}
		doOnChangeStdCmnPPrsnSearch(sender);
	};
	
	/**
	 * @desc 학생목록 조회 버튼 클릭
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 3. 14
	 */
	moPage.onClick_BtnSearch = function() {
		// 2016.8.10   2개 이상의 조회조건을 입력체크
		if(!doSearchChk()){
			return false;
		}
		
		// 조회조건 필수 체크
		if(!util.validate(app, ["dipKeyDate"])){
			return false;
		}

		doList(function(pbSuccess) {
			// 조회 : "조회되었습니다." header 메세지 표시
			if(pbSuccess) {
				util.Msg.notify(app, "NLS.INF.M024");
			}
		});
	};
	
	/**
	 * @desc 수업연한 조회조건에서 엔터시 조회
	 * @param strKeyType
	                 strKeyStatus
	 * @return void
	 * @author Choi In Seong 2016. 3. 14
	 */
	moPage.onKeyDown_IpbAss = function(strKeyType, strKeyStatus) {
		if(e.keyCode == cpr.events.KeyCode.ENTER){
			util.Header.clickSearch(app);
		}
	};
	
	/**
	 * @desc 학년 조회조건에서 엔터시 조회
	 * @param strKeyType
	                 strKeyStatus
	 * @return void
	 * @author Choi In Seong 2016. 3. 14
	 */
	moPage.onKeyDown_IpbRrocYear = function(strKeyType, strKeyStatus) {
		if(e.keyCode == cpr.events.KeyCode.ENTER){
			util.Header.clickSearch(app);
		}
	};
	
	/**
	 * @desc 학번 조회조건에서 엔터시 조회
	 * @param strKeyType
	                 strKeyStatus
	 * @return void
	 * @author Choi In Seong 2016. 3. 14
	 */
	moPage.onKeyDown_IpbStudNo = function(strKeyType, strKeyStatus) {
		if(e.keyCode == cpr.events.KeyCode.ENTER){
			util.Header.clickSearch(app);
		}
	};
	
	/**
	 * @desc 이름 조회조건에서 엔터시 조회
	 * @param strKeyType
	                 strKeyStatus
	 * @return void
	 * @author Choi In Seong 2016. 3. 14
	 */
	moPage.onKeyDown_IpbReqNm = function(strKeyType, strKeyStatus) {
		if(e.keyCode == cpr.events.KeyCode.ENTER){
			util.Header.clickSearch(app);
		}
	};

	/**
	 * @desc 기준일자 변경시 객체검색과 교직원검색 초기화
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 3. 14
	 */
	moPage.onValueChanged_DipKeyDate = function() {
		util.Control.reset(app, ["ipbSaNm", "ipbSaCd", "ipbProfNm", "ipbProfId"]);
		util.DataMap.setValue(app, "dmReqList", "strObjDivRcd", "");	
	};
	
	/**
	 * @desc 조회조건 체크
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 08. 10.
	 */
	function doSearchChk() {
		var vsSaNm = util.Control.getValue(app, "ipbSaNm");
		var vsSaCd = util.Control.getValue(app, "ipbSaCd");
		var vsBirthDay = util.Control.getValue(app, "dipBirthDay");
		var vsStatus = util.Control.getValue(app, "cbbStatus");
		var vsStudNo = util.Control.getValue(app, "ipbStudNo");
		var vsRepNm = util.Control.getValue(app, "ipbReqNm");
		
		var iSchCnt = 0;
		var vsTopSaCd = util.DataMap.getValue(app, "dmReqList", "strTopSaCd");
//		if(vsTopSaCd == vsSaCd){
//			ComMsg.alert(NLS.CSR.M123); //다른 소속을 선택하여 주시기 바랍니다.
//			return false;
//		}
		
		if(!ValueUtil.isNull(vsSaNm)){
			iSchCnt = iSchCnt +1;
		}
		
		if(!ValueUtil.isNull(vsStatus)){
			iSchCnt = iSchCnt +1;
		}
		
		if(!ValueUtil.isNull(vsBirthDay)){
			iSchCnt = iSchCnt +1;
		}
		
		if(!ValueUtil.isNull(vsStudNo)){
			// 학번은 최소 2자리이상
			if(vsStudNo.length < 2){
				ComMsg.warn("M101", [NLS.NSCR.STUDID, ""+"2"]);
				util.Control.setFocus(app, "ipbStudNo");
				return false;
			}
			iSchCnt = iSchCnt +1;
		}
		
		if(!ValueUtil.isNull(vsRepNm)){
			iSchCnt = iSchCnt +1;
		}

		if (iSchCnt < 1) {
			util.Msg.alert("NLS-CSR-M122"); // 학적상태/특정소속/생년월일/학번/이름 중 하나를 입력하여 주십시오.
			return false;
		}
		
		return true;
	}

	
	return moPage;
};

