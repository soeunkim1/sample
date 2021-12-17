//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
///<xtmlink path="./stdCgtCGrdtStudMng.xtm"/>

var stdCgtCGrdtStudMng = function() {

	var moPage = new Page();
	//임포트용 데이터 통신 오브젝트
	var moPObject = new PObject();

	var msStudId = "";
	var msKeyDate = "";
	
	/********************************
	 * 폼 신규 상태 체크 
	 *******************************/
	moPage.mbIsInsertRowFrf = false;
	
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
			controlId			:	"btnPopDgCdSearch",
			iCd					:	"",
			iNm					:	"ipbFrfDgNm",
			iObjDivRcd			:	["CC009DG"],
			iStartObject    	:   "",
			iOtDivRcd			:	"",
			iOtIsTreeView	:	"",
			iLanDivRcd		:	"",
			iKeyDate			:	"dipFrfGrdtDt",
			iKeyEndDate		:	"",
			oObjDivRcd		:	"",
			oCd					:	"ipbFrfDgCd",
			oCdNm				:	"ipbFrfDgNm",
			oBegDt				:	"",
			oEndDt				:	"",
			oLanDivRcd		:	"",
			func 					: null
		}
	];

	/**
	 * @desc  서브페이지 임포트 온로드
	 * @return void
	 * @author Choi. In. Seong. 2016.03.04
     */
	moPage.onLoadImportDone_ImpSbpHeader = function() {
		doSbpHeaderOnLoad();
	}
	
	/**
	 * @desc  졸업정보 온로드
	 * @return void
	 * @author Choi. In. Seong. 2016.03.04
     */
	moPage.onModelConstructDone_stdCgtCGrdtStudMng = function() {
		//리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["rptCsrEnroll", "frfCgtGrdtStud"]);

		// 부모멤버변수에담긴학번받음
		msStudId = moPage.parent.moParentObj.studId;
		msKeyDate = moPage.parent.moParentObj.keyDate;
		
		util.DataMap.setValue(app, "dmReqList", "strStudId", msStudId);
		util.DataMap.setValue(app, "dmReqList", "strKeyDate", msKeyDate);
		
		//서브미션 실행 (실패시 cover page)
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				// 컨트롤 초기화
				util.Control.redraw(app, ["rptCsrEnroll", "frfCgtGrdtStud", "cbbFrfSchYearRcd", "cbbFrfSmtRcd", "cbbFrfGrdtDivRcd", "cbbFrfTopDivRcd", "ckbGrdtStudY"]);
				
				if (ValueUtil.isNull(msStudId)) {
					return false;
					
				}else{
					doList(function(pbSuccess) {
						// 조회 : "조회되었습니다." header 메세지 표시
						if(pbSuccess) {
							moPage.parentSendMsg("lblTitleRptCsrEnroll", NLS.INF.M024);
							//데이터가 없을시 졸업을 할 수 없는 상태이므로 컨트롤 막기
							if(util.Grid.getRowCount(app, "grdCsrEnroll") < 1){
								util.Control.setEnable(app, false, ["frfCgtGrdtStud", "btnDel", "btnSave", "btnSaveCancel", "ckbGrdtStudY"]);
								util.Control.redraw(app, ["btnDel", "btnSave", "btnSaveCancel", "ckbGrdtStudY"]);
							} else {
								//초기화면 컨트롤 활성/비활성
								doCheckEnable();
							}
						}
					});
				}
			}
		});
	}

	/**
	 * @desc 학적등록 등록상태에 따른 컨트롤 제어
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 3. 4
	 */
	function doCheckEnable() {
		//등록정보의 등록상태중 등록이 있으면 졸업취소 비활성, 졸업정보만 별도처리 활성
		var vsEnrollEnroYN = util.DataMap.getValue(app, "dmReqList", "strEnrollEnroYN");
		if (vsEnrollEnroYN != "Y") {
			util.Control.setEnable(app, true, ["ckbGrdtStudY"]);
			util.Control.setEnable(app, false, ["btnSaveCancel"]);
		} else {
			util.Control.setEnable(app, false, ["ckbGrdtStudY"]);
			util.Control.setEnable(app, true, ["btnSaveCancel"]);
		}
		util.Control.redraw(app, ["ckbGrdtStudY", "btnSaveCancel"]);
		//졸업정보 화면 화면 clear 뒤 비활성, 삭제버튼 비활성
		util.Control.reset(app, ["frfCgtGrdtStud"]);
		util.Control.setEnable(app, false, ["frfCgtGrdtStud"]);
	};
	
	
	/**
	 * @desc 졸업정보 조회
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 3. 4
	 */
	function doList(poCallBackFunc) {
		util.DataMap.setValue(app, "dmReqList", "strStudId", msStudId);
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, ["rptCsrEnroll", "frfCgtGrdtStud"]);
				util.Control.redraw(app, "lblRowCnt_rptCsrEnroll");
			}
			// 조회 후 콜백함수 수행
			if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
		});
	}
	
	/**
	 * @desc 부모 헤더에 메세지 뿌리기
	 * @param psCtrlId 
	 * @param psMsgCode 
	 * @return void
	 * @author Choi In Seong 2016. 3. 4
	 */
	moPage.parentSendMsg = function(psCtrlId, psMsgCodeNm) {
		var vsMsg = ExtControl.getTextValue(psCtrlId);
		vsMsg     = "[" + vsMsg + "]";
	
		util.Msg.notify(app, vsMsg + psMsgCodeNm);	
	};
	
	/**
	 * @desc 작업저장
	 * @param poCallBackFunc 콜백함수
	 * @return Boolean
	 * @author Choi In Seong 2016. 3. 7
	 */
	function doSubSave(poCallBackFunc) {
		
		//신규일 경우 fiag insert 로 변경
		if( moPage.mbIsInsertRowFrf ){
			//신규입력일 경우 신규 플래그 설정
			util.Grid.setRowState(app, "frfCgtGrdtStud",cpr.data.tabledata.RowState.INSERTED,'1');
		}

		//strCommand: save 
		util.Submit.send(app, "subSave", function(pbSuccessSave) {
				if(pbSuccessSave) {
					// 저장 후 프리폼 초기화
					util.Control.redraw(app, ["frfCgtGrdtStud"]);
					
					var voCallBackSaveAfter = function(pbSuccessAfter) {
						//저장성공 메세지 출력
						// 조회 : "조회되었습니다." header 메세지 표시
						if(pbSuccessAfter) {
							moPage.parentSendMsg("lblTitleRptCsrEnroll",NLS.INF.M025);
							doCheckEnable();
						}
						if(util.isFunc(poCallBackFunc))	poCallbackFunc(poCallBackFunc);
					};
					ExtSubPage.getParent().callScript("doSaveAfter", voCallBackSaveAfter);
				}
			}
		);
	};
	 
	/**
	 * @desc 작업저장 전 체크
	 * @param poCallBackFunc 콜백함수
	 * @return Boolean 체크 결과
	 * @author Choi In Seong 2016. 3. 7
	 */
	function doSaveCheck(poCallBackFunc) {
		
		var vsValue 	= util.DataMap.getValue(app, "dmReqList", "strEnrollEnroYN");
		var vsStudId	= util.FreeForm.getValue(app, "frfCgtGrdtStud", "STUD_ID");
		
		// 졸업정보만 별도처리 값이 없고 수정상태가 아니면 프리폼을 업데이트 상태로 만듬
		if(vsValue != "Y" && ValueUtil.fixNull(util.Grid.getRowState(app, "frfCgtGrdtStud",1))==""
			&& !moPage.mbIsInsertRowFrf && ValueUtil.fixNull(vsStudId) != ""){
				util.FreeForm.setValue(app, "frfCgtGrdtStud",AppConstants.CUD_COL_REF, "U");
				util.Grid.setRowState(app, "frfCgtGrdtStud",cpr.data.tabledata.RowState.UPDATED,'1');
		} else {
			// 데이터 변경사항 체크
			if(!util.Grid.isModified(app, ["frfCgtGrdtStud"], null)){
				moPage.parentSendMsg("lblTitleRptCsrEnroll",NLS.WRN.M007);
				if(util.isFunc(poCallBackFunc)) poCallBackFunc(false);
				return false;
			}
		}
		
		//리피트 validation check
		if(!util.validate(app, "frfCgtGrdtStud")){
			if(util.isFunc(poCallBackFunc)) poCallBackFunc(false);
			return false;
		}
		
		return true;
	};

	/**
	 * @desc 졸업정보 조회
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 3. 7
	 */
	function doSubGrdtList() {
		//선택된 그리드에 해당되는 데이터 값 GET 
		var vsSpDivRcd 		= util.Grid.getCellValue(app, "grdCsrEnroll", "SP_DIV_RCD"); 			//학적등록구분코드
		var vsEnrollDivRcd	= util.Grid.getCellValue(app, "grdCsrEnroll", "ENROLL_DIV_RCD"); 	//이수과정구분코드
		var vsSaCd			= util.Grid.getCellValue(app, "grdCsrEnroll", "SA_CD"); 					//학사부서코드
		var vsSpCd			= util.Grid.getCellValue(app, "grdCsrEnroll", "SP_CD"); 					//이수과정코드
		
		util.DataMap.setValue(app, "dmReqList", "strSpDivRcd", vsSpDivRcd);
		util.DataMap.setValue(app, "dmReqList", "strEnrollDivRcd", vsEnrollDivRcd);
		util.DataMap.setValue(app, "dmReqList", "strSaCd", vsSaCd);
		util.DataMap.setValue(app, "dmReqList", "strSpCd", vsSpCd);
		
		//strCommand: grdtList 
		util.Submit.send(app, "subGrdtList", function(pbSuccess) {
			if (pbSuccess) {
				util.Control.redraw(app, ["frfCgtGrdtStud"]);
				
				var vsRegStatRcd	= util.Grid.getCellValue(app, "grdCsrEnroll", "REG_STAT_RCD");
				var vsEnrollDivRcd  = util.Grid.getCellValue(app, "grdCsrEnroll", "ENROLL_DIV_RCD");
				var vsMainYn 		= util.DataMap.getValue(app, "dmResList", "strGrdtMainYN");
				var vnRowCnt		= util.DataMap.getValue(app, "dmResList", "rptGrdtCnt");
					
				if(vsEnrollDivRcd == "CT103EXTR" && vsMainYn != "Y"){ //추가과정이면서 주과정 졸업정보가 없을 경우 비활성화
					//졸업정보 화면 비활성 
					util.Control.setEnable(app, false, ["frfCgtGrdtStud"]);
				}else{
					//졸업정보 화면 활성 
					util.Control.setEnable(app, true, ["frfCgtGrdtStud"]);
					//값이 없으면 입력가능하게 만든다.
					if (vnRowCnt == "0") {
						doGrdtInsertRow();
					}else{
						moPage.mbIsInsertRowFrf = false;
					}
				}
			}
		});
	};
	
	/**
	 * @desc 변경여부 반환
	 * @param 
	 * @return boolean 변경여부
	 * @author Choi In Seong 2016. 3.7
	 */
	function doCheckDataChange() {
		if(util.Grid.isModified(app, ["frfCgtGrdtStud"], "CRM") ){
			return false;
		}else{
			return true;
		}
	};
	
	/**
	 * @desc 데이터 셋에 row 추가
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 3. 7
	 */
	function doGrdtInsertRow() {
		util.FreeForm.setValue(app, "frfCgtGrdtStud",AppConstants.CUD_COL_REF, "N");
		//프리폼 신규
		util.FreeForm.insertRow(app, "frfCgtGrdtStud");
		
		//신규 초기값 셋팅
		var vsSpDivRcd    	= util.DataMap.getValue(app, "dmReqList", "strSpDivRcd");
		var vsEnrollDivRcd	= util.DataMap.getValue(app, "dmReqList", "strEnrollDivRcd");
		var vsSaCd         	= util.DataMap.getValue(app, "dmReqList", "strSaCd");
		var vsSpCd         	= util.DataMap.getValue(app, "dmReqList", "strSpCd");
		var vsYear 			= util.DataMap.getValue(app, "dmResOnLoad", "strInitYear");
		var vsSmt  			= util.DataMap.getValue(app, "dmResOnLoad", "strInitSmtRcd");
		
		util.FreeForm.setValue(app, "frfCgtGrdtStud", "STUD_ID", msStudId);						//학생 오브젝트번호
		util.FreeForm.setValue(app, "frfCgtGrdtStud", "SP_DIV_RCD", vsSpDivRcd);				//학적등록구분코드
		util.FreeForm.setValue(app, "frfCgtGrdtStud", "ENROLL_DIV_RCD", vsEnrollDivRcd);	//이수과정구분코드
		util.FreeForm.setValue(app, "frfCgtGrdtStud", "SA_CD", vsSaCd);								//학사부서코드
		util.FreeForm.setValue(app, "frfCgtGrdtStud", "SP_CD", vsSpCd);								//이수과정코드
		util.FreeForm.setValue(app, "frfCgtGrdtStud", "SCH_YEAR_RCD", vsYear);								//이수과정코드
		util.FreeForm.setValue(app, "frfCgtGrdtStud", "SMT_RCD", vsSmt);								//이수과정코드
		
		//상태 오픈 상태로 변경 :트리 변경시 변경사항 유무 체크 피하기 위함
		util.Grid.setRowState(app, "frfCgtGrdtStud",cpr.data.tabledata.RowState.UNCHANGED,'1');
		//신규입력이 Ok
		moPage.mbIsInsertRowFrf = true;
	};
	 
	/**
	 * @desc 선택한 학적등록정보의 졸업정보를 조회
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 3. 7
	 */
	moPage.onRowSelect_RptCsrEnroll = function() {
		if(ValueUtil.isNull(util.Grid.getCheckOrSelectedRowIndex(app, "grdCsrEnroll"))){
			return;
		}
		
		// 수정 여부 체크
		if(util.Grid.isModified(app, ["frfCgtGrdtStud"], "CRM") ){
			return;
		}
		//삭제버튼 제어
		doDelBtnEnable();

		//리피트 포커스 변경시 프리폼 초기화
		util.Control.reset(app, ["frfCgtGrdtStud"]);
		
		//변경내역이 없거나, 변경내역이 있지만 통과하는 경우
		doSubGrdtList();
		
	};
	
	 
	/**
	 * @desc 졸업 취소
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 3. 7
	 */
	moPage.onClick_BtnCancel = function() {
		if (util.Msg.confirm("NLS-CRM-M015", [NLS.CGT.M020])) {
			
			//strCommand: grdtWith 
			util.Submit.send(app, "subGrdtWith", function(pbSuccess) {
					if (pbSuccess) {
						var voCallBackSaveAfter = function(pbSuccessAfter) {
							//저장성공 메세지 출력
							// 조회 : "조회되었습니다." header 메세지 표시
							
							if(pbSuccessAfter) {
								moPage.parentSendMsg("lblTitleRptCsrEnroll",NLS.INF.M003);
								doCheckEnable();
							}
						};
						ExtSubPage.getParent().callScript("doSaveAfter", voCallBackSaveAfter);
					}
				}
			);
		}
	};
	
	/**
	 * @desc 졸업정보 삭제 버튼 클릭
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 3. 7
	 */
	moPage.onClick_BtnDel = function() {
		// 졸업정보 삭제는 추가과정 정보를 먼저 삭제하고 주과정에 대한 졸업정보를 삭제할 수 있도록 처리
		var vsGrdtExtrYN	= util.DataMap.getValue(app, "dmResList", "strGrdtExtrYN");
		var vsSpDivRcd		= util.DataMap.getValue(app, "dmReqList", "strSpDivRcd");
		var vsEnrollDivRcd	= util.DataMap.getValue(app, "dmReqList", "strEnrollDivRcd");
		if ((vsSpDivRcd == "CA10701" && vsEnrollDivRcd == "CT103MAIN")) { // 진공, 주과정등록일 경우
			if (vsGrdtExtrYN == "Y") {
				//추가정보를 삭제하라는 msg
				util.Msg.alert("NLS-CGT-M011");
				return false;
			}
		}
		
		//신규일 경우 삭제 불가 처리 
		if (moPage.mbIsInsertRowFrf) {
			//삭제할 데이터가 없습니다. 
			return;
		}else{
			//삭제
			util.Grid.deleteRow(app, "frfCgtGrdtStud");
			util.Control.setEnable(app, false, ["frfCgtGrdtStud"]);	
		}
	};

	/**
	 * @desc 학위코드 팝업 호출
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 3. 7
	 */
	moPage.onClick_BtnPopDgCdSearch = function(sender) {
		// 졸업일자 체크
		var vsKeyDate = util.FreeForm.getValue(app, "frfCgtGrdtStud", "GRDT_DT");
		var vsTitle = ExtControl.getTextValue("lblFrfGrdtDt");
		if (ValueUtil.isNull(vsKeyDate)) {
			//졸업일자를 입력하여 주십시오.
			util.Msg.alert("NLS-CSR-M121",[vsTitle]);
			return;
		}
		
		doOnClickStdCmnPObjSch(sender);
	};
		
	/**
	 * @desc 학위코드 조회
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 3. 7
	 */
	moPage.onValueChanged_IpbFrfDgNm = function(sender) {
		// 졸업일자 체크
		var vsKeyDate = util.FreeForm.getValue(app, "frfCgtGrdtStud", "GRDT_DT");
		var vsTitle = ExtControl.getTextValue("lblFrfGrdtDt");
		if (ValueUtil.isNull(vsKeyDate)) {
			util.Control.setValue(app, "ipbFrfDgNm", "");
			util.Control.setValue(app, "ipbFrfDgCd", "");
			//졸업일자를 입력하여 주십시오.
			util.Msg.alert("NLS-CSR-M121",[vsTitle]);
			return;
		}
		
		doOnChangeStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc 작업저장 버튼 클릭
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 3. 7
	 */
	moPage.onClick_BtnSave = function() {
		
		var vsValue = util.DataMap.getValue(app, "dmReqList", "strEnrollEnroYN");
		
		if(!doSaveCheck()) return;
		
		if(vsValue == "Y"){	//졸업정보만 저장할 경우
			doSubSave();
		}else{
			if(util.Msg.confirm("NLS-CRM-M032")){
				doSubSave();			
			}			
		}
	};
	
	/**
	 * @desc 졸업정보만 별도처리 체크시 삭제버튼 제어
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 3. 7
	 */
	moPage.onValueChanged_CkbGrdtStudY = function() {
		//삭제버튼 제어
		doDelBtnEnable();
	};
	
	/**
	 * @desc 등록정보와 졸업정보만 별도처리여부에 따른 삭제버튼 제어
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 3. 7
	 */	
	function doDelBtnEnable() {
		var vsRegStatRcd		= util.Grid.getCellValue(app, "grdCsrEnroll", "REG_STAT_RCD");			//학적등록상태
		var vsEnrollDivRcd		= util.Grid.getCellValue(app, "grdCsrEnroll", "ENROLL_DIV_RCD");			//학적등록구분
		var vsMainYn				= util.DataMap.getValue(app, "dmResList", "strGrdtMainYN");				//주과정 졸업정보 여부
		var vsExtrYn				= util.DataMap.getValue(app, "dmResList", "strGrdtExtrYN"); 				//추가과정 졸업정보 여부
		var vsEnrollEnroYn 	= util.DataMap.getValue(app, "dmReqList", "strEnrollEnroYN");				//졸업정보만 별도처리 여부
		
		if(vsRegStatRcd == "CT109ENRO"){	//등록상태
			if( (vsEnrollDivRcd == "CT103MAIN" && vsMainYn == "Y")	//주과정일 경우 주과정 졸업정보가 있을 경우 
				|| (vsEnrollDivRcd == "CT103EXTR" && vsExtrYn == "Y") ){ //추가과정일 경우 추가과정 졸업정보가 있을경우
					if(vsEnrollEnroYn == "Y"){ // 졸업정보만 별도처리 선택시만 삭제버튼 활성화
						util.Control.setEnable(app, true, ["btnDel"]);		//삭제버튼 활성화
					} else {
						util.Control.setEnable(app, false, ["btnDel"]);		//삭제버튼 비활성화
					}
				}else{
					util.Control.setEnable(app, false, ["btnDel"]);	//삭제버튼 비활성화
				}
		}else{
			util.Control.setEnable(app, false, ["btnDel"]); 	//삭제버튼 비활성화
		}
	}
	
	/**
	 * @desc 졸업일자 수정 시 학위코드 초기화
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 3. 7
	 */	
	moPage.onValueChanged_DipFrfGrdtDt = function() {
		util.Control.setValue(app, "ipbFrfDgNm", "");
		util.Control.setValue(app, "ipbFrfDgCd", "");
	};
	return moPage;
};

