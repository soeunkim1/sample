//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./stdCsrSDspStud.xtm"/>


var stdCsrSDspStud = function() {
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
			controlId			:	"btnFrfPopOtSearch",
			iCd					:	"",
			iNm					:	"ipbFrfOtNm",
			iObjDivRcd			:	["CC009OT"],
			iOtDivRcd   		:	"CB008UNIV",
			iStartObject    	:   "",
			iOtIsTreeView	:	"",
			iLanDivRcd		:	"",
			iKeyDate			:	"/root/reqKey/keyDate",
			iKeyEndDate		:	"",
			oObjDivRcd		:	"",
			oCd					:	"ipbFrfOtCd",
			oCdNm				:	"ipbFrfOtNm",
			oBegDt				:	"",
			oEndDt				:	"",
			oLanDivRcd		:	"",
			func 					: null
		}
	];
	
	//교환프로그램검색 팝업
	moPObject.moIdsForStdCsrPExh = [
	{
		controlId 					: "btnFrfPopExhPgmSearch",
		iStDt 							: "iptFrfStDt",		//시작일자
		iEndDt 						: "iptFrfEndDt",	//종료일자
		iPgmCd 					: "",					//교환프로그램코드
		iPgmNm 					: "ipbFrfExhPgmNm",	//교환프로그램명
		iPgmDivRcd 				: [],	//교환프로그램구분
		iPgmTypeRcd 			: [], 	//교환프로그램유형
		
		oExhPgmCd 				: "ipbFrfExhPgmCd",	//교환프로그램코드
		oExhPgmNm 			: "ipbFrfExhPgmNm",	//교환프로그램명
		oExhPgmDivRcd 		: "",	//교환프로그램구분
		oExhPgmTypeRcd 	: "",	//교환프로그램유형
		oPgmMinTerm 			: "",	//프로그램최소기간
		oPgmMaxTerm 			: "",	//프로그램최대기간
		oFirsrDivRcd 				: "",	//재원구분코드
		oTermUnitRcd 			: "",	//기간단위코드
		oRefKey 					: "ipbFrfRefKey",	//참조키
		func 			: null
	}]; 
	
	/**
	 * @desc 헤더 온로드 실행
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 6. 27.
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		doHeaderOnLoad();
	};
	
	/**
	 * @desc 팝업 닫기
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 6. 27.
	 */
	moPage.onClick_BtnCloseCancel = function() {
		app.close();
	};
	
	/**
	 * @desc onModelConstructDone 이벤트
	 * @param 
	 * @return void
	 * @author	 Choi In Seong 2016. 6. 27.
	 */
	moPage.onModelConstructDone_StdCsrPMstAltAbs = function() {
		
		//리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init("frfCsrDspExhStud");
		//화면 온로드 서브미션 호출
		doOnLoad();
	};
	
	
	/**
	 * @desc 부모창에서 받아온 변수 조회조건에 셋팅
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 6. 27.
	 */
	function doOnLoad() {
		var voAltObj = ExtPopUp.getParentVal("moExhObj");
		
		// 부모멤버변수에담긴학번받음
		util.DataMap.setValue(app, "dmReqKey", "strStudNo", voAltObj["studNo"]);
		util.DataMap.setValue(app, "dmReqKey", "strStDt", voAltObj["stDt"]);
		util.DataMap.setValue(app, "dmReqKey", "strEndDt", voAltObj["endDt"]);
		
		util.DataMap.setValue(app, "dmReqKey", "strModCd", voAltObj["modCd"]);
		util.DataMap.setValue(app, "dmReqKey", "strExhPgmCd", voAltObj["exhPgmCd"]);
		util.DataMap.setValue(app, "dmReqKey", "strOtCd", voAltObj["otCd"]);
		
		var vsModCd = voAltObj["modCd"];
		
		//학생id 셋팅
		util.DataMap.setValue(app, "dmReqKey", "strStudId", voAltObj["studId"]);
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess) {
			if (pbSuccess) {
				
				util.Control.redraw(app, ["frfCsrDspExhStud"]);
				util.Control.redraw(app, ["cbbFrfStSchYearRcd", "cbbFrfStSmtRcd", "cbbFrfEndSchYearRcd", "cbbFrfEndSmtRcd", "cbbFrfExhStudStatRcd", "cbbFrfCatRcd"]);
				
				if(vsModCd == "C"){
					doSubInsertRow();
				}else if(vsModCd == "M"){
					doList();
				}
				
				// 학생의 학번정보를 화면에 입력
				util.Control.setValue(app, "optStudNo", voAltObj["studNo"]);
				util.Control.setValue(app, "optStud", voAltObj["headerStud"]);

			} else {
				// 실패시 팝업 닫기
				ExtModel.dispatch("btnCloseCancel", "DOMActivate");
			}
		});
	}

	/**
	 * @desc 파견교환학생 조회
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 6. 27.
	 */
	function doList(poCallBackFunc) {
		//strCommand: list 
		util.Submit.send(app, "subList",  function(pbSuccess) {
			if(pbSuccess){
				//rebuild
				util.Control.redraw(app, ["frfCsrDspExhStud"]);
			}
			if(util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
		});
	};
	
	/**
	 * @desc 조회 내역이 없을시 신규
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 6. 27.
	 */
	function doSubInsertRow() {
		util.FreeForm.setValue(app, "frfCsrDspExhStud",AppConstants.CUD_COL_REF, "I");
		//프리폼 신규
		util.FreeForm.insertRow(app, "frfCsrDspExhStud");
		var vsStudId = util.DataMap.getValue(app, "dmReqKey", "strStudId");

		//학생 ObjectId 셋팅
		util.FreeForm.setValue(app, "frfCsrDspExhStud", "STUD_ID", vsStudId);

		util.Grid.setRowState(app, "frfCsrDspExhStud",cpr.data.tabledata.RowState.INSERTED,1);
		//신규입력이 Ok
		util.Control.setEnable(app, true, ["frfCsrDspExhStud"]);
	};
	
	/**
	 * @desc 저장 SF에서 오류 메시지가 있으면 확인창 띄움.
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 6. 27.
	 */	
	function doSave() {

		//strCommand: save 
		util.Submit.send(app, "subSave", function(pbSuccess) {
			if (pbSuccess) {
				//부모창 목록 재조회
				//팝업창 닫기
				ExtPopUp.closeLayeredPopup("doPopCallList");
				return true;
			}
		});
	};
	
	/**
	 * @desc 파견 신규 저장 버튼 event
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 6. 27.
	 */
	moPage.onClick_BtnSave = function() {
		// 리피터 변경사항 체크
		if(!util.Grid.isModified(app, ["frfCsrDspExhStud"], "MSG")){
			return false;
		}
		//리피트 validation check
		if(!util.validate(app, ["frfCsrDspExhStud"])){
			return false;
		}
		doSave();
	};
	
	/**
	 * @desc 방문학교 검색
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 6. 27.
	 */
	moPage.onValueChanged_IpbFrfOtNm = function(sender) {
		if (!doCheckPutDate("iptFrfStDt")) return;
		doOnChangeStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc 방문학교 검색
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 6. 27.
	 */
	moPage.onClick_BtnFrfPopOtSearch = function(sender) {
		if (!doCheckPutDate("iptFrfStDt")) return;
		//strCommand: otDivSch 
		util.Submit.send(app, "subOtDivSch",  function(pbSuccess) {
				if(pbSuccess){
					//외부소속 검색 
					doOnClickStdCmnPObjSch(sender);
				}
			}
		);
	};
	
	/**
	 * @desc 교환프로그램 검색
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 6. 27.
	 */
	moPage.onValueChanged_IpbFrfExhPgmNm = function(sender) {
		if (!doCheckPutDate("iptFrfStDt")){
			util.Control.setValue(app, "ipbFrfExhPgmNm", "");
			return;
		}
		if (!doCheckPutDate("iptFrfEndDt")){
			util.Control.setValue(app, "ipbFrfExhPgmNm", "");
			return;
		}
		doOnChangeStdCsrPExhPopup(sender);
	};
	
	/**
	 * @desc 교환프로그램 검색
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 6. 27.
	 */
	moPage.onClick_BtnFrfPopExhPgmSearch = function(sender) {
		if (!doCheckPutDate("iptFrfStDt")) return;
		if (!doCheckPutDate("iptFrfEndDt")) return;
		doOnClickStdCsrPExhPopup(sender);
	};

	/**
	 * @desc 받아온 컨트롤의 빈값 체크
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 6. 27.
	 */
	function doCheckPutDate(psCtlId) {
		
		var vsCtlVal = util.Control.getValue(app, psCtlId);
		var vbValid = true;
		
		if (ValueUtil.isNull(vsCtlVal)) {
			var vsLblId = ExtControl.getControl(psCtlId).getAttr("labelid");
			var vnVal = ExtControl.getControl(vsLblId).textValue;
			util.Msg.alert("NLS-INF-M017",[vnVal]);
			/***************************************************************************/
			vbValid = false;
		} 
		
		return vbValid;
		
	};
	
	/**
	 * @desc 날짜 체크
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 6. 27.
	 */
	function doChkDate(psCtrlDiv) {

		var vsStDt = util.FreeForm.getValue(app, "frfCsrDspExhStud", "ST_DT");
		var vsEndDt = util.FreeForm.getValue(app, "frfCsrDspExhStud", "END_DT");
		
		if(!ValueUtil.isNull(vsStDt) && !ValueUtil.isNull(vsEndDt)){
			if (vsEndDt < vsStDt) {
				util.Msg.alert("NLS-WRN-M016");
				if(psCtrlDiv == "stDt"){
					util.FreeForm.setValue(app, "frfCsrDspExhStud", "ST_DT", "");
				}else if(psCtrlDiv == "endDt"){
					util.FreeForm.setValue(app, "frfCsrDspExhStud", "END_DT", "");
				}
				return false;
			}			
		}
		return true;
	};
	
	/**
	 * @desc 시작일자 변경 시
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 6. 27.
	 */
	moPage.onValueChanged_IptFrfStDt = function() {
		util.DataMap.setValue(app, "dmReqKey", "keyDate", util.FreeForm.getValue(app, "frfCsrDspExhStud", "ST_DT"));
		
		if(!doChkDate("stDt")){
			util.FreeForm.setValue(app, "frfCsrDspExhStud", "OT_CD", "", false);
			util.FreeForm.setValue(app, "frfCsrDspExhStud", "OT_NM", "", false);
			util.FreeForm.setValue(app, "frfCsrDspExhStud", "EXH_PGM_CD", "", false);
			util.FreeForm.setValue(app, "frfCsrDspExhStud", "EXH_PGM_NM", "", false);
			return;
		}
		
		var vsOtCd = util.FreeForm.getValue(app, "frfCsrDspExhStud", "OT_CD");
		var vsExhPgmCd = util.FreeForm.getValue(app, "frfCsrDspExhStud", "EXH_PGM_CD");
		
		if((vsOtCd != null && vsOtCd != "") || (vsExhPgmCd != null && vsExhPgmCd != "")){
			util.DataMap.setValue(app, "dmReqKey", "strOtCd", vsOtCd);
			util.DataMap.setValue(app, "dmReqKey", "strExhPgmCd", vsExhPgmCd);
			util.DataMap.setValue(app, "dmReqKey", "strEndDt", util.FreeForm.getValue(app, "frfCsrDspExhStud", "END_DT"));
			
			//strCommand: chkStDt 
			util.Submit.send(app, "subChkStDt",  function(pbSuccess) {
					if(pbSuccess){
						var vsOtSize = util.DataMap.getValue(app, "dmResChkDt", "strOtSize");
						var vsExhPgmSize = util.DataMap.getValue(app, "dmResChkDt", "strExhPgmSize");
						if(vsOtSize == "0"){
							util.FreeForm.setValue(app, "frfCsrDspExhStud", "OT_CD", "", false);
							util.FreeForm.setValue(app, "frfCsrDspExhStud", "OT_NM", "", false);
						}
						if(vsExhPgmSize == "0"){
							util.FreeForm.setValue(app, "frfCsrDspExhStud", "EXH_PGM_CD", "", false);
							util.FreeForm.setValue(app, "frfCsrDspExhStud", "EXH_PGM_NM", "", false);
						}
					}
				}
			);
		}
	};
	
	/**
	 * @desc 종료일자 체크
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 6. 27.
	 */
	moPage.onValueChanged_IptFrfEndDt = function() {
		var vsExhPgmCd = util.FreeForm.getValue(app, "frfCsrDspExhStud", "EXH_PGM_CD");
		
		if(!doChkDate("endDt")){
			util.FreeForm.setValue(app, "frfCsrDspExhStud", "EXH_PGM_CD", "", false);
			util.FreeForm.setValue(app, "frfCsrDspExhStud", "EXH_PGM_NM", "", false);
			return;
		}
		
		if(vsExhPgmCd != null && vsExhPgmCd != ""){
			util.DataMap.setValue(app, "dmReqKey", "strEndDt", util.FreeForm.getValue(app, "frfCsrDspExhStud", "END_DT"));
			util.DataMap.setValue(app, "dmReqKey", "strExhPgmCd", vsExhPgmCd);
			
			//strCommand: chkEndDt 
			util.Submit.send(app, "subChkEndDt",  function(pbSuccess) {
					if(pbSuccess){
						var vsExhPgmSize = util.DataMap.getValue(app, "dmResChkDt", "strExhPgmSize");
						if(vsExhPgmSize == "0"){
							//종료일자에 해당하는 객체이기 때문에 날짜가 변경될 시 클리어
							util.FreeForm.setValue(app, "frfCsrDspExhStud", "EXH_PGM_CD", "", false);
							util.FreeForm.setValue(app, "frfCsrDspExhStud", "EXH_PGM_NM", "", false);
						}
					}
				}
			);
		}
	};
	
	/**
	 * @desc 시작, 종료 학년도 학기 체크
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 6. 27.
	 */	moPage.onValueChanged_CbbFrfStSchYearRcd = function() {
		doYearSmtChk("stYear");
	};
	
	/**
	 * @desc 시작, 종료 학년도 학기 체크
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 6. 27.
	 */
	moPage.onValueChanged_CbbFrfStSmtRcd = function() {
		doYearSmtChk("stSmt");
	};
	
	/**
	 * @desc 시작, 종료 학년도 학기 체크
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 6. 27.
	 */
	moPage.onValueChanged_CbbFrfEndSchYearRcd = function() {
		doYearSmtChk("endYear");
	};
	
	/**
	 * @desc 시작, 종료 학년도 학기 체크
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 6. 27.
	 */
	moPage.onValueChanged_CbbFrfEndSmtRcd = function() {
		doYearSmtChk("endSmt");
	};
	
	/**
	 * @desc 시작, 종료 학년도 학기 체크
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 6. 27.
	 */
	function doYearSmtChk(psCtrlDiv){
		var vsStSchYearRcd = util.FreeForm.getValue(app, "frfCsrDspExhStud", "ST_SCH_YEAR_RCD");
		var vsStSmtRcd = util.FreeForm.getValue(app, "frfCsrDspExhStud", "ST_SMT_RCD");
		var vsEndSchYearRcd = util.FreeForm.getValue(app, "frfCsrDspExhStud", "END_SCH_YEAR_RCD");
		var vsEndSmtRcd = util.FreeForm.getValue(app, "frfCsrDspExhStud", "END_SMT_RCD");
		// 시작, 종료 학년도가 존재 할시
		if(!ValueUtil.isNull(vsStSchYearRcd) && !ValueUtil.isNull(vsEndSchYearRcd)){
			// 시작 학년도가 종료 학년도보다 크면 입력한 학년도 초기화
			if(vsStSchYearRcd > vsEndSchYearRcd){
				util.Msg.alert("NLS-CSR-EXT025");
				if(psCtrlDiv == "stYear"){
					util.FreeForm.setValue(app, "frfCsrDspExhStud", "ST_SCH_YEAR_RCD", "");
					util.FreeForm.setValue(app, "frfCsrDspExhStud", "ST_SMT_RCD", "");
				}else if(psCtrlDiv == "endYear"){
					util.FreeForm.setValue(app, "frfCsrDspExhStud", "END_SCH_YEAR_RCD", "");
					util.FreeForm.setValue(app, "frfCsrDspExhStud", "END_SMT_RCD", "");
				}
				return;
			}
			// 시작, 종료 학년도가 같을 시 학기 비교
			if(vsStSchYearRcd == vsEndSchYearRcd){
				if(!ValueUtil.isNull(vsStSmtRcd) && !ValueUtil.isNull(vsEndSmtRcd)){
					// 시작 학기가 종료 학기보다 크면 입력한 학기 초기화
					if(vsStSmtRcd >vsEndSmtRcd){
						util.Msg.alert("NLS-CSR-EXT024");
						if(psCtrlDiv == "stSmt"){
							util.FreeForm.setValue(app, "frfCsrDspExhStud", "ST_SMT_RCD", "");
						}else if(psCtrlDiv == "endSmt"){
							util.FreeForm.setValue(app, "frfCsrDspExhStud", "END_SMT_RCD", "");
						}
						return;
					}
				}
			}
		}
		// 시작 학년도에 빈갑이 들어오면 시작 학기 초기화
		if(ValueUtil.isNull(vsStSchYearRcd)){
			util.FreeForm.setValue(app, "frfCsrDspExhStud", "ST_SMT_RCD", "");
		}
		// 종료 학년도에 빈갑이 들어오면 종료 학기 초기화
		if(ValueUtil.isNull(vsEndSchYearRcd)){
			util.FreeForm.setValue(app, "frfCsrDspExhStud", "END_SMT_RCD", "");
		}
	}
	return moPage;
};
