//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
///<xtmlink path="./extCsrCGudProfAlot.xtm"/>

var extCsrCGudProfAlot = function() {

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
		{   //소속 조회조건 행정,학사 부서
			controlId			:	"btnSaPopSearch",
			iCd					:	"",
			iNm					:	"ipbSaNm",
			iObjDivRcd			:	["CC009SA", "CC009OG"],
			iStartObject    	:   "",
			iOtDivRcd			:	"",
			iOtIsTreeView	:	"",
			iLanDivRcd		:	"",
			iKeyDate			:	"/root/reqList/strKeyDate",
			iKeyEndDate		:	"",
			oObjDivRcd		:	"/root/reqList/strObjDivRcd",
			oCd					:	"/root/reqList/strSaCd",
			oCdNm				:	"ipbSaNm",
			oBegDt				:	"",
			oEndDt				:	"",
			oLanDivRcd		:	"",
			func 					:  null
		},
		{   //소속 조회조건 학사 부서
			controlId			:	"rdBtnProfSaPop",
			iCd					:	"",
			iNm					:	"rdIpbProfSaNm",
			iObjDivRcd			:	["CC009SA"],
			iStartObject    	:   "",
			iOtDivRcd			:	"",
			iOtIsTreeView	:	"",
			iLanDivRcd		:	"",
			iKeyDate			:	"/root/reqList/strKeyDate",
			iKeyEndDate		:	"",
			oObjDivRcd		:	"",
			oCd					:	"rdOptProfSaCd",
			oCdNm				:	"rdIpbProfSaNm",
			oBegDt				:	"",
			oEndDt				:	"",
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
	 * @member impStdCmnPPrsnSearch
	 * @type Array
	 * @author cis at 16. 6. 14
	 */ 
	 moPObject.moIdsForStdCmnPPrsnSearch = [
		 { 
			 controlId					: "rdBtnProfPop",				       //(필수)교직원검색 버튼ID
			 istrStaffGrpAuth			: "",										//(선택)셋팅 교직원 그룹에 대한 인사자료권한 적용여부(적용시 : true)
			 istrWkdtyAuth			: "true",									//(선택)셋팅 보직에 해당되는 사람 조회여부(조회시 : true), 현재사용하지 않음(2013.04.11)
			 iKeyDate					: "/root/reqList/strKeyDate",	//(선택) 셋팅 기준일자(NULL일 경우 현재일자)
			 iStaffNo					: "rdIpbProfNm",						//(선택) 셋팅 교직원번호
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
			  
			 oObjNo					: "rdOptProfObjId",		            //리턴 오브젝트번호
			 oStaffNo					: "",										//리턴 교직원번호
			 oRepNm					: "rdIpbProfNm",						//리턴 성명
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
		 },
		 { 
			 controlId					: "rdBtnStudProfPop",		        //(필수)교직원검색 버튼ID
			 istrStaffGrpAuth			: "",										//(선택)셋팅 교직원 그룹에 대한 인사자료권한 적용여부(적용시 : true)
			 istrWkdtyAuth			: "true",									//(선택)셋팅 보직에 해당되는 사람 조회여부(조회시 : true), 현재사용하지 않음(2013.04.11)
			 iKeyDate					: "/root/reqList/strKeyDate",	//(선택) 셋팅 기준일자(NULL일 경우 현재일자)
			 iStaffNo					: "rdIpbStudProfNm",				//(선택) 셋팅 교직원번호
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
			  
			 oObjNo					: "rdOptStudProfId",                 //리턴 오브젝트번호
			 oStaffNo					: "",										//리턴 교직원번호
			 oRepNm					: "rdIpbStudProfNm",				//리턴 성명
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
	 * @desc 헤더 온로드
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 6. 14
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		doHeaderOnLoad();
	};

	/**
	 * @desc 화면 온로드
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 6. 14
	 */
	moPage.onModelConstructDone_extCsrCGudProfClass = function() {
		//리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["rptCsrGudProf", "rptCsrShreg"]);
		// 2. 검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grpData"]);
		
		//서브미션 실행 (실패시 cover page)
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				
				util.DataMap.setValue(app, "dmReqList", "strSchYearRcd", util.DataMap.getValue(app, "dmResOnLoad", "strSchYearRcd"));
				util.DataMap.setValue(app, "dmReqList", "strSmtRcd", util.DataMap.getValue(app, "dmResOnLoad", "strSmtRcd"));
				util.DataMap.setValue(app, "dmReqList", "strKeyDate", util.DataMap.getValue(app, "dmResOnLoad", "strKeyDate"));
				util.DataMap.setValue(app, "dmReqList", "strStDt", util.DataMap.getValue(app, "dmResOnLoad", "strStDt"));
				util.Control.setValue(app, "rdbGudProfYn", "N");
				
				util.Control.redraw(app, ["cbbSchYearRcd", "cbbSmtRcd", "rptCsrGudProf", "rptCsrShreg", "rdbGudProfYn"]);
			}
		});
	}

	/**
	 * @desc 조회버튼 클릭
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 6. 14
	 */
	moPage.onClick_BtnSearch = function() {
		
		if(util.Grid.isModified(app, "", "CRM")){
			return false;
		}
		// 조회조건 필수 체크
		if(!util.validate(app, ["cbbSchYearRcd", "ipbSaNm"])){
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
	 * @desc 신입생, 소속별 지도교수 조회
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 6. 14
	 */
	function doList(poCallBackFunc) {
		
		//strCommand: list 
		util.Submit.send(app, "subList",  function(pbSuccess) {
			if(pbSuccess){
				//rebuild
				util.Control.redraw(app, ["rptCsrGudProf", "rptCsrShreg"]);
//TO-BE: <ExtControl.refreshBind> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//				ExtControl.refreshBind(["bndProfNew", "bndProfSaNew"]);
			}
			if(util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
		});
	}

	/**
	 * @desc 소속별 지도교수 조회
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 6. 14
	 */
	function doListProf(poCallBackFunc) {
		
		//strCommand: listProf 
		util.Submit.send(app, "subListProf",  function(pbSuccess) {
			if(pbSuccess){
				//rebuild
				util.Control.redraw(app, ["rptCsrGudProf"]);
//TO-BE: <ExtControl.refreshBind> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//				ExtControl.refreshBind(["bndProfNew", "bndProfSaNew"]);
			}
			if(util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
		});
	}
	
	/**
	 * @desc 신입생 조회
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 6. 14
	 */
	function doListStud(poCallBackFunc) {
		
		//strCommand: listStud 
		util.Submit.send(app, "subListStud",  function(pbSuccess) {
			if(pbSuccess){
				//rebuild
				util.Control.redraw(app, ["rptCsrShreg"]);
//TO-BE: <ExtControl.refreshBind> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//				ExtControl.refreshBind(["bndProfNew", "bndProfSaNew"]);
			}
			if(util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
		});
	}
	
	/**
	 * @desc 소속별 지도교수 신규
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 6. 14
	 */
	moPage.onClick_BtnNewProf = function() {
		//조회 조건 학년도 셋팅
		var vsSchYearRcd = util.DataMap.getValue(app, "dmReqList", "strSchYearRcd");
		var vsSmtRcd = util.DataMap.getValue(app, "dmReqList", "strSmtRcd");
		
		//해당 리피트 insertRow 후 편집 시작할 컬럼 지정
		util.Grid.insertRow(app, "grdCsrGudProf");
		util.Grid.setCellValue(app, "grdCsrGudProf", "SCH_YEAR_RCD", vsSchYearRcd);
		util.Grid.setCellValue(app, "grdCsrGudProf", "SMT_RCD", vsSmtRcd);
	};

	/**
	 * @desc 현재 행의 소속별 지도교수 복사
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 6. 14
	 */
	moPage.onClick_BtnNewProfCapy = function() {
		var voRpt = ExtControl.getControl("rptCsrGudProf");
		vsSelIdx = voRpt.getSelectedRowPos("", "");
					
		if(vsSelIdx == ""){
			// 라인을 선택하세요.
			util.Msg.notify(app, "NLS.INF.M023");
			return false;
		}
		
		var vnNewIdx =  util.Grid.insertRow(app, "grdCsrGudProf");
		//선택된 행 복사
		ExtRepeat.copyToRowData("rptCsrGudProf", vsSelIdx, "rptCsrGudProf", vnNewIdx);
		util.Grid.setCellValue(app, "grdCsrGudProf", "UPT_STATUS", "N", vnNewIdx);
		util.Grid.setCellValue(app, "grdCsrGudProf", "PROF_NM", "", vnNewIdx);
		util.Grid.setCellValue(app, "grdCsrGudProf", "PROF_OBJ_NO", "", vnNewIdx);
		util.Grid.setCellValue(app, "grdCsrGudProf", "STUD_CNT", "", vnNewIdx);
	};

	/**
	 * @desc 소속별 지도교수 삭제
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 6. 14
	 */
	moPage.onClick_BtnDel = function() {
		var vcRpt = ExtControl.getControl("rptCsrGudProf");
		var vsPanelCheckIdx = util.Grid.getCheckOrSelectedRowIndex(app, "grdCsrGudProf");
		
		if (!ValueUtil.isNull(vsPanelCheckIdx)) {
			var voPanelChk;
			
			if(String(vsPanelCheckIdx).indexOf(",") != -1){
				voPanelChk = vsPanelCheckIdx.split(",");
			}else{
				voPanelChk = new Array();
				voPanelChk[0] = vsPanelCheckIdx;
			}		
			
			 for(var i = voPanelChk.length - 1; i >= 0; i--) {
				var vsUptStatus = util.Grid.getCellValue(app, "grdCsrGudProf", "UPT_STATUS", voPanelChk[i]);
				if(vsUptStatus != "N"){
					var vsStudCnt = util.Grid.getCellValue(app, "grdCsrGudProf", "STUD_CNT", voPanelChk[i]);
					var vsProfNm = util.Grid.getCellValue(app, "grdCsrGudProf", "PROF_NM", voPanelChk[i]);

					// 신규가 아니고 지도교수가 없으면 삭제 불가
					if(ValueUtil.isNull(vsProfNm)){
						//학과별 지도교수 정보가 있는 데이터만 삭제하실 수 있습니다.
						util.Msg.alert("NLS-CSR-EXT018");
						return;
					}
				}
			}
		}
		util.Grid.deleteRow(app, "grdCsrGudProf");
	}
	
	/**
	 * @desc 소속별 지도교수 체크박스 제어
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 6. 14
	 */
	moPage.onValueChanged_RhCkbSelectProf = function() {
//TO-BE: <ExtRepeat.selectedAllPanel> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.selectedAllPanel("rhCkbSelectProf");
	};
	
	/**
	 * @desc 소속별 지도교수 저장버튼 클릭
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 6. 14
	 */
	moPage.onClick_BtnSaveProf = function() {
		doSaveProf();
	};
	
	/**
	 * @desc 소속별 지도교수 저장
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 6. 14
	 */
	function doSaveProf() {
		
		// 리피터 변경사항 체크
		if(!util.Grid.isModified(app, ["grdCsrGudProf"], "MSG")){
			return false;
		}
		//리피트 validation check
		if(!util.validate(app, "grdCsrGudProf")) return false;
		
		//strCommand: saveProf 
		util.Submit.send(app, "subSaveProf", function(pbSuccessSave) {
				if(pbSuccessSave) {
					//저장성공 메세지 출력
					doListProf(function(pbSuccessList) {
						// 조회 : "조회되었습니다." header 메세지 표시
						if(pbSuccessList) {
							util.Msg.notify(app, "NLS.INF.M025");
						}
					});
				}
			}
		);
	}
	
	/**
	 * @desc 신입생 저장
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 6. 14
	 */
	function doSaveStud() {
		
		// 리피터 변경사항 체크
		if(!util.Grid.isModified(app, ["grdCsrShreg"], "MSG")){
			return false;
		}
		//리피트 validation check
		if(!util.validate(app, "grdCsrShreg")) return false;
		
		//strCommand: saveStudProf 
		util.Submit.send(app, "subSaveStud", function(pbSuccessSave) {
				if(pbSuccessSave) {
					//저장성공 메세지 출력
					doList(function(pbSuccessList) {
						// 조회 : "조회되었습니다." header 메세지 표시
						if(pbSuccessList) {
							util.Msg.notify(app, "NLS.INF.M025");
						}
					});
				}
			}
		);
	}
	
	/**
	 * @desc 소속별 지도교수 전년도 복사
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 6. 14
	 */
	moPage.onClick_BtnSaveBefYearCopy = function() {
		util.coverPage(app);
		if (!util.Msg.confirm("NLS-CRM-M010", ["전학기복사"]) ) {
			util.removeCover(app);
			return false;
		}
		doBefCopy();
	};
	
	function doBefCopy(pnStep) {
		
		if (!pnStep) {
			pnStep = "0";
		}
		
		util.DataMap.setValue(app, "dmReqList", "iStepNo", pnStep);
		
		//strCommand: copy 
		util.Submit.send(app, "subSaveBefYearCopy", function(pbSuccess) {
			if (pbSuccess) {

				var vsErrDiv = util.DataMap.getValue(app, "dmResCopy", "strErrDiv");
				if (vsErrDiv != "") {
					// 계속하시겠습니까?
					if (util.Msg.confirm("NLS-CRM-EXT015") ) {
						var vnStep = util.DataMap.getValue(app, "dmResCopy", "iStepNo");
						return doBefCopy(vnStep);
					} else {
						util.removeCover(app);
						return false;
					}
				} else {
					doListProf(function(pbSuccessList) {
						// 조회 : "조회되었습니다." header 메세지 표시
						if(pbSuccessList) {
							util.Msg.notify(app, "NLS.INF.M025");
						}
					});
					util.removeCover(app);
					return true;
				}
			}else{
				util.removeCover(app);
				return false;
			}
		});
	}
	
	
	/**
	 * @desc 소속 조회
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 6. 15
	 */
	moPage.onValueChanged_IpbSaNm = function(sender) {
		doOnChangeStdCmnPObjSch(sender);
	}
	
	/**
	 * @desc 소속조회 팝업 호출
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 6. 15
	 */
	moPage.onClick_BtnSaPopSearch = function(sender) {
		doOnClickStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc 소속 조회(리피트)
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 6. 15
	 */
	moPage.onValueChanged_RdIpbProfSaNm = function(sender) {
		doOnChangeStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc 소속 팝업 호출(리피트)
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 6. 15
	 */
	moPage.onClick_RdBtnProfSaPop = function(sender) {
		var vsUptStatus = util.Grid.getCellValue(app, "grdCsrGudProf", "UPT_STATUS");
		if("N" == vsUptStatus){
			doOnClickStdCmnPObjSch(sender);
		}
	};
	
	/**
	 * @desc 지도교수 조회(리피트)
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 6. 15
	 */
	moPage.onValueChanged_RdIpbProfNm = function(sender) {
		doOnChangeStdCmnPPrsnSearch(sender);
	}
	
	/**
	 * @desc 교직원 검색 팝업 호출(리피트)
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 6. 15
	 */
	moPage.onClick_RdBtnProfPop = function(sender) {
		var vsUptStatus = util.Grid.getCellValue(app, "grdCsrGudProf", "UPT_STATUS");
		// 지도교수 기준정보 존재여부
		//var vsProfYn = ExtInstance.getValue("/root/resList/strProfYn");
		//if("N" == vsUptStatus||"N"==vsProfYn){
			doOnClickStdCmnPPrsnSearch(sender);
		//}
	};
	
	/**
	 * @desc 지도교수 조회(리피트)
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 6. 15
	 */
	moPage.onValueChanged_RdIpbStudProfNm = function(sender) {
		doOnChangeStdCmnPPrsnSearch(sender);
	};
	
	/**
	 * @desc 지도교수 조회(리피트)
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 6. 15
	 */
	moPage.onClick_RdBtnStudProfPop = function(sender) {
		doOnClickStdCmnPPrsnSearch(sender);
	};
	
	/**
	 * @desc 객체검색임포트 초기화
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 6. 15
	 */
	moPage.onLoadImportDone_ImpStdCmnPobjSch = function() {
		setStdCmnPObjSchObjInfo();
	};
	
	/**
	 * @desc 지도교수 배정
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 6. 15
	 */
	moPage.onClick_BtnSaveAllot = function() {
		util.coverPage(app);
		var vsRowCnt = util.Grid.getRowCount(app, "grdCsrShreg");
		if(vsRowCnt<1){
			//배정할 재학생이 없습니다.
			util.Msg.alert("NLS-CSR-EXT016");
			util.removeCover(app);
			return;
		}
		
		var vsEachBatch = util.DataMap.getValue(app, "dmReqList", "strEachBatch");
		
		if(vsEachBatch == "Y"){
			//배정 여부 체크
			if(!util.Msg.confirm("NLS-CRM-EXT006", ["개별배정된 지도교수를 제외 하고 배정됩니다."]) ){
				util.removeCover(app);
				return;
			}
		}else{
			//배정 여부 체크
			if(!util.Msg.confirm("NLS-CRM-EXT006", ["이미 배정된 내역은 수정됩니다."]) ){
				util.removeCover(app);
				return;
			}			
		}
		
		var vsClassEmptyYn = util.Grid.getCellValue(app, "grdCsrShreg", "CLASS_EMPTY_YN", 0);
		
		if(vsClassEmptyYn == "Y"){
			//반편성을 먼저 진행하여 주십시오.
			util.Msg.alert("NLS-CSR-EXT020");
			util.removeCover(app);
			return;
		}
		
		//strCommand: saveBatch 
		util.Submit.send(app, "subBatch", function(pbSuccessSave) {
				if(pbSuccessSave) {
					
					//배정 성공건수
					var vnTotCnt = util.DataMap.getValue(app, "dmResProc", "iProcCnt");
					var vnEachCnt = util.DataMap.getValue(app, "dmResProc", "iEachCnt");
					var vnSuccessCnt = util.DataMap.getValue(app, "dmResProc", "iSuccessCnt");
					var vnFailCnt = util.DataMap.getValue(app, "dmResProc", "iFailCnt");
					
					//3.1.1 배정 건수 메시지 호출
					if(vnEachCnt == "0"){
						//@건 배정되었습니다.
						util.Msg.alert("NLS-CSR-EXT014", [vnSuccessCnt]);
					}else{
						util.Msg.alert("NLS-CSR-EXT032", [vnEachCnt, vnSuccessCnt]);
					}
					util.removeCover(app);
					doList(function(pbSuccess) {
						// 조회 : "조회되었습니다." header 메세지 표시
						if(pbSuccess) {
							util.Msg.notify(app, "NLS.INF.M003");
							
							//파일명
							var vsErrorFileNm = util.DataMap.getValue(app, "dmErrorFileInfo", "strFileNm");
							//변환파일명(실제 서버에 저장된 파일명)
							var vsErrorFileChgNm = util.DataMap.getValue(app, "dmErrorFileInfo", "strFileChgNm");
							var vsTmpFilePath = util.DataMap.getValue(app, "dmErrorFileInfo", "strTmpFilePath");
							
							// 에러파일 다운로드
							if(!(ValueUtil.isNull(vsErrorFileNm) || vsErrorFileNm=="")){
								var voParam = {
											"strFileSubPath" : "",
											"strFileNm" : vsErrorFileChgNm,
											"strOriFileNm" : vsErrorFileNm,
											"strTmpFilePath" : vsTmpFilePath,
											"strCommand" : "fileDownLoad"
								}
								FileUtil.downloadFile( "/std.cmn.StdCmnFileTransUtil.ex", voParam);
								util.DataMap.setValue(app, "dmErrorFileInfo", "strFileDir", "");
								util.DataMap.setValue(app, "dmErrorFileInfo", "strFileNm", "");
								util.DataMap.setValue(app, "dmErrorFileInfo", "strFileChgNm", "");
								util.DataMap.setValue(app, "dmErrorFileInfo", "strTmpFilePath", "");
							} else {
								util.DataMap.setValue(app, "dmErrorFileInfo", "strFileDir", "");
								util.DataMap.setValue(app, "dmErrorFileInfo", "strFileNm", "");
								util.DataMap.setValue(app, "dmErrorFileInfo", "strFileChgNm", "");
								util.DataMap.setValue(app, "dmErrorFileInfo", "strTmpFilePath", "");
								return false;
							}
						}
					});
				}else{
					util.removeCover(app);
				}
			}
		);
	};
	
	/**
	 * @desc 지도교수 초기화
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 6. 15
	 */
	moPage.onClick_BtnSaveInit = function() {
		util.coverPage(app);
		var vsRowCnt = util.Grid.getRowCount(app, "grdCsrShreg");
		if(vsRowCnt<1){
			//초기화 할 재학생이 없습니다.
			util.Msg.alert("NLS-CSR-EXT021");
			util.removeCover(app);
			return;
		}
		
		//초기화 여부 체크
		if(!util.Msg.confirm("NLS-CRM-EXT007", ["이미 배정된 지도교수정보를"]) ){
			util.removeCover(app);
			return;
		}	
		
		//strCommand: saveInit 
		util.Submit.send(app, "subInit", function(pbSuccessSave) {
				if(pbSuccessSave) {
					//배정 성공건수
					var vnTotCnt = util.DataMap.getValue(app, "dmResProc", "iProcCnt");
					util.Msg.alert("NLS-CSR-EXT017", [vnTotCnt]);
					util.removeCover(app);
					doList(function(pbSuccessList) {
						// 조회 : "조회되었습니다." header 메세지 표시
						if(pbSuccessList) {
							util.Msg.notify(app, "NLS.INF.M025");
						}
					});
				}else{
					util.removeCover(app);
				}
			}
		);
		
	};
	
	/**
	 * @desc 작업취소
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 6. 16
	 */
	moPage.onClick_BtnRestore = function() {
		util.Grid.restoreRow(app, "grdCsrShreg");
	};
	
	/**
	 * @desc 저장버튼 클릭
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 6. 16
	 */
	moPage.onClick_BtnSave = function() {
		doSaveStud();
	};

	/**
	 * @desc 학년도 학기 변경에 따른 표준일자 반환
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 6. 16
	 */
	moPage.onValueChanged_CbbSchYearRcd = function() {
		doGetKeyDate();
	};
	
	/**
	 * @desc 학년도 학기 변경에 따른 표준일자 반환
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 6. 16
	 */
	moPage.onValueChanged_CbbSmtRcd = function() {
		doGetKeyDate();
	}
	
	/**
	 * @desc 학년도 학기 변경에 따른 표준일자 반환
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 6. 16
	 */
	function doGetKeyDate() {
		//1. 서브미션 수행
		//strCommand: getKeyDate 
		util.Submit.send(app, "subGetKeyDate", function(pbSuccess){
			if(pbSuccess) {
				//전체권한일시 최상위 부서가 셋팅 되어 있으면 초기화 하지 않음
				var strSaCd = util.DataMap.getValue(app, "dmReqList", "strSaCd");
				if(moPageInfo.authRngRcd == "CC00102"){
					if(strSaCd != ExtInstance.getValue("instance('insStdCmnPObjSch')/root/resListObjInfo/strObjCd")){
						util.Control.reset(app, ["ipbSaNm", "ipbSaCd"]);
						util.DataMap.setValue(app, "dmReqList", "strObjDivRcd", "");
					}
				// 전체권한 이외의 권한일시 자신의 소속 부서가 셋팅되어 있으면 초기화 하지 않음
				}else if(moPageInfo.authRngRcd == "CC00101" || moPageInfo.authRngRcd == "CC00105" || moPageInfo.authRngRcd == "CC00106" || moPageInfo.authRngRcd == "CC00107"){
					if(strSaCd != moUserInfo.asgnDeptCd){
						util.Control.reset(app, ["ipbSaNm", "ipbSaCd"]);
						util.DataMap.setValue(app, "dmReqList", "strObjDivRcd", "");
					}
				}
				util.DataMap.setValue(app, "dmReqList", "strKeyDate", util.DataMap.getValue(app, "dmResGetKeyDate", "strKeyDate"));
				util.DataMap.setValue(app, "dmReqList", "strStDt", util.DataMap.getValue(app, "dmResGetKeyDate", "strStDt"));
			}else{
				util.Control.reset(app, ["ipbSaNm", "ipbSaCd"]);
				util.DataMap.setValue(app, "dmReqList", "strObjDivRcd", "");
				util.DataMap.setValue(app, "dmReqList", "strKeyDate", util.DataMap.getValue(app, "dmResGetKeyDate", "strKeyDate"));
				util.DataMap.setValue(app, "dmReqList", "strStDt", util.DataMap.getValue(app, "dmResGetKeyDate", "strStDt"));
			}
		});
	};
	
	/**
	 * @desc 선택한 학생의 지도교수 삭제
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 6. 16
	 */
	moPage.onClick_BtnDelStud = function() {
		
		var vnRptCnt = util.DataSet.getRowCount(app, "dsRptCsrShreg");
			if(vnRptCnt != 0){
			var vsSerialNo = util.Grid.getCellValue(app, "grdCsrShreg", "SERIAL_NO");
			// 지도교수가 없으면 삭제 불가
			if(ValueUtil.isNull(vsSerialNo)){
				//지도교수 정보가 있는 데이터만 삭제하실 수 있습니다.
				util.Msg.alert("NLS-CSR-EXT030");
				return;
			}
		}
		util.Grid.deleteRow(app, "grdCsrShreg");
	};
	
	
	moPage.onKeyDown_IpbProcRslt = function(strKeyType, strKeyStatus) {
		if(e.keyCode == cpr.events.KeyCode.ENTER){
			util.Header.clickSearch(app);
		}
	};
	return moPage;
};

