//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
///<xtmlink path="./stdCsrCGudProfInfo.xtm"/>

var stdCsrCGudProfInfo = function() {

	var moPage = new Page();
	//임포트용 데이터 통신 오브젝트
	var moPObject = new PObject();

	var msStudId = "";
	
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
	 * @author hyunteak at 15. 11. 26
	 */ 
	 moPObject.moIdsForStdCmnPPrsnSearch = [
		 { 
			 controlId					: "rdBtnProfNo",						//(필수)교직원검색 버튼ID
			 istrStaffGrpAuth			: "",										//(선택)셋팅 교직원 그룹에 대한 인사자료권한 적용여부(적용시 : true)
			 istrWkdtyAuth			: "true",									//(선택)셋팅 보직에 해당되는 사람 조회여부(조회시 : true), 현재사용하지 않음(2013.04.11)
			 iKeyDate					: "rdDipStDt",							//(선택) 셋팅 기준일자(NULL일 경우 현재일자)
			 iStaffNo					: "rhIpbProfNm",						//(선택) 셋팅 교직원번호
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
			  
			 oObjNo					: "rdIpbProfObjNo",					//리턴 오브젝트번호
			 oStaffNo					: "",										//리턴 교직원번호
			 oRepNm					: "rhIpbProfNm",						//리턴 성명
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
	 * @desc 서브페이지 임포트 온로드
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 8. 9
	 */
	moPage.onLoadImportDone_ImpSbpHeader = function() {
		doSbpHeaderOnLoad();
	}
	
	/**
	 * @desc 
	 * @return 
	 * @author xxxx 2016.03.09
	 */
	moPage.onModelConstructDone_stdCsrCGudProf = function() {
		//리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init("rptCsrGudProf");

		//서브미션 실행 (실패시 cover page)
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				
				var voParentPage = ExtSubPage.getParent();
				
				// 부모멤버변수에담긴학번받음
				msStudId = moPage.parent.moParentObj.studId;
				if (ValueUtil.isNull(msStudId)) {
					return false;
				}else{
					doList(function(pbSuccess) {
						// 조회 : "조회되었습니다." header 메세지 표시
						if(pbSuccess) {
							moPage.parentSendMsg("lblTitleRptCsrGudProf", NLS.INF.M024);
						}
					});
				}
			}
		});
	}

	/**
	 * @desc 지도교수정보 조회
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 3. 9
	 */
	function doList(poCallBackFunc) {
		util.DataMap.setValue(app, "dmReqList", "strStudId", msStudId);
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdCsrGudProf");
				util.Control.redraw(app, "lblRowCnt_rptCsrGudProf");
			}
			// 조회 후 콜백함수 수행
			if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
		});
	}

	/**
	 * @desc 지도교수정보 신규
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 3. 9
	 */
	moPage.onClick_BtnNew = function() {
		//해당 리피트 insertRow 후 편집 시작할 컬럼 지정
		util.Grid.insertRow(app, "grdCsrGudProf");
		util.Grid.setCellValue(app, "grdCsrGudProf", "STUD_ID", msStudId);
		util.Grid.setCellValue(app, "grdCsrGudProf", "ST_DT", util.DataMap.getValue(app, "dmReqList", "strKeyDate"));
		util.Grid.setCellValue(app, "grdCsrGudProf", "END_DT", "99991231000000");
	};
	
	/**
	 * @desc 지도교수정보 삭제
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 3. 9
	 */
	moPage.onClick_BtnDel = function() {
		if(ValueUtil.isNull(util.Grid.getCheckOrSelectedRowIndex(app, "grdCsrGudProf"))){
			moPage.parentSendMsg("lblTitleRptCsrGudProf", NLS.INF.M005);
			return false;
		} else {
			util.Grid.deleteRow(app, "grdCsrGudProf");
		}
	};

	/**
	 * @desc 지도교수정보 작업취소
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 3. 9
	 */
	moPage.onClick_BtnRestore = function() {
		util.Grid.restoreRow(app, "grdCsrGudProf");
	};
	
	/**
	 * @desc 지도교수정보 작업저장버튼 클릭
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 3. 9
	 */
	moPage.onClick_BtnSave = function() {
		doSubSave();
	};
	
	/**
	 * @desc 교우정보 저장
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 2. 26
	 */
	function doSubSave(poCallbackFunc) {
		
		// 리피터 변경사항 체크
		if(!util.Grid.isModified(app, ["grdCsrGudProf"], null)){
			moPage.parentSendMsg("lblTitleRptCsrGudProf",NLS.WRN.M007);
			if(util.isFunc(poCallbackFunc)) poCallbackFunc(false);
			return false;
		}
		//리피트 validation check
		if(!util.validate(app, "grdCsrGudProf")){
			if(util.isFunc(poCallbackFunc)) poCallbackFunc(false);
			return false;
		}

		//strCommand: save 
		util.Submit.send(app, "subSave", function(pbSuccessSave) {
				if(pbSuccessSave) {
					var vsLastSerialNo = util.DataMap.getValue(app, "dmResList", "strLastSerialNo");
					//마지막 순번있으면 포커싱 가도록
					if(vsLastSerialNo!=""){
						ExtRepeat.setPkValues("rptCsrGudProf", vsLastSerialNo);
					}
							
					var voCallBackSaveAfter = function(pbSuccessAfter) {
						// 조회 : "조회되었습니다." header 메세지 표시
						if(pbSuccessAfter) {
							moPage.parentSendMsg("lblTitleRptCsrGudProf",NLS.INF.M025);
						}
						if(util.isFunc(poCallbackFunc))	poCallbackFunc(pbSuccessAfter);
					};
					ExtSubPage.getParent().callScript("doSaveAfter", voCallBackSaveAfter);
				}
			}
		);
	};
	
	/**
	 * @desc 리피트 panel click event
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 3. 9
	 */
	moPage.onValueChanged_RhCkbSelect = function() {
//TO-BE: <ExtRepeat.selectedAllPanel> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.selectedAllPanel("rhCkbSelect");
	};
	
	/**
	 * @desc 부모 헤더에 메세지 뿌리기
	 * @param psCtrlId 
	 * @param psMsgCode 
	 * @return void
	 * @author Choi In Seong 2016. 3. 9
	 */
	moPage.parentSendMsg = function(psCtrlId, psMsgCodeNm) {
		var vsMsg = ExtControl.getTextValue(psCtrlId);
		vsMsg     = "[" + vsMsg + "]";
	
		util.Msg.notify(app, vsMsg + psMsgCodeNm);	
	};
	
	/**
	 * @desc 변경여부 반환
	 * @param 
	 * @return boolean 변경여부
	 * @author Choi In Seong 2016. 3. 9
	 */
	function doCheckDataChange() {
		if(util.Grid.isModified(app, ["grdCsrGudProf"], "CRM") ){
			return false;
		}else{
			return true;
		}
	};
	
	/**
	 * @desc 교직원 조회 팝업 호출
	 * @param 
	 * @return boolean 변경여부
	 * @author Choi In Seong 2016. 3. 9
	 */
	moPage.onClick_RdBtnStudNo = function(sender) {
		// 시작일자 체크
		var vsKeyDate = util.Grid.getCellValue(app, "grdCsrGudProf", "ST_DT");
		var vsTitle = ExtControl.getTextValue("lblStDt");
		if (ValueUtil.isNull(vsKeyDate)) {
			//시작일자를 입력하여 주십시오.
			util.Msg.alert("NLS-CSR-M121", [vsTitle]);
			return;
		}
		
		doOnClickStdCmnPPrsnSearch(sender);
	}
	
	/**
	 * @desc 교직원 조회
	 * @param 
	 * @return boolean 변경여부
	 * @author Choi In Seong 2016. 3. 9
	 */
	moPage.onValueChanged_RhIpbProfNm = function(sender) {
		// 시작일자 체크
		var vsKeyDate = util.Grid.getCellValue(app, "grdCsrGudProf", "ST_DT");
		var vsTitle = ExtControl.getTextValue("lblStDt");
		if (ValueUtil.isNull(vsKeyDate)) {
			util.Grid.setCellValue(app, "grdCsrGudProf", "PROF_NM", "");
			util.Grid.setCellValue(app, "grdCsrGudProf", "PROF_OBJ_NO", "");
			//시작일자를 입력하여 주십시오.
			util.Msg.alert("NLS-CSR-M121", [vsTitle]);
			return;
		}
		
		doOnChangeStdCmnPPrsnSearch(sender);
	};
	
	/**
	 * @desc 시작일자 변경시 교수 초기화
	 * @param 
	 * @return boolean 변경여부
	 * @author Choi In Seong 2016. 3. 9
	 */
	moPage.onValueChanged_RdDipStDt = function() {
		//시작일자 변경시 교수 초기화
		util.Grid.setCellValue(app, "grdCsrGudProf", "PROF_NM", "");
		util.Grid.setCellValue(app, "grdCsrGudProf", "PROF_OBJ_NO", "");
	};
	return moPage;
};

