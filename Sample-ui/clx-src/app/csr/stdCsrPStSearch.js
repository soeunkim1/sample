//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./stdCsrPStSearch.xtm"/>


var stdCsrPStSearch = function() {
	var moPage = new Page();
	//임포트용 데이터 통신 오브젝트
	var moPObject = new PObject();
	//팝업 오픈시 조회가능여부
	var mbSearchYn = true;
	
	moPage.maSearchMod = ["ipbStudId", "ipbStudNm", "ipbBirthDay", "cbbGenderRcd", "cbbStatus", "cbbProcRsltYear", "cbbSpDnDivRcd", "cbbGenderRcd", "cbbNatRcd", "btnSearch"];
	
	moPObject.moStdCsrPStSearch = {
		// 팝업 작동 내부사용
		controlId 						: "",			//  최초 이벤트의 버튼이나 그리드 id
		openedByChange 			: false,		
		// 선택가능 범위를 제한함.
		strStudId 						: "",			// (필수) 검색조건 학번오브젝트	
		strStudNo 						: "",			// (선택) 검색조건 학번
		strStudNm 					: "",			// (선택) 이름
		strKeyDate 					: "",			// (필수) 기준일 Default: 현재일자 
		strObjDivRcd 					: "",			// (선택) 객체구분코드     // 권한을 미적용받고자 하는 경우, 최상위 행정부서를 파라미터로 설정. 
		strObjCd 						: "",			// (선택) 부서코드			 // 권한을 미적용받고자 하는 경우, 최상위 행정부서를 파라미터로 설정. 
		strObjNm 						: "",			// (선택) 부서 명
		strStatRcd 						: "",			// (선택) 학적상태
		strStudDivRcd				: "",			// (선택) 학생구분
		// 선택열 결과 리턴
		Result : {
			strStudId 					: "",			// 학번오브젝트
			strStudNo 					: "",			// 학번
			strStudNm 				: "",			// 이름
			strStatNm 					: "",			// 학적상태명
			strStatRcd 					: "",			// 학적상태코드
			strProcRslt 				: "",			// 진급학기
			strProcRsltYear 			: "",			// 진급학년
			strSaNm 					: "",			// 학사부서코드명
			strSaCd 					: "",			// 학사부서명
			strSpNm 					: "",			// 이수과정코드명
			strSpCd 					: "",			// 이수과정명
			strOgNm 					: "",			// 행정부서코드명
			strOgCd 					: "",			// 행정부서명
			strStudDivRcd			: "",			// 학생구분코드
			strStudDivNm				: "",			// 학생구분명
			strBirthday					: "",			// 생년월일
			strGenderRcd				: "",			// 성별코드
			strGenderNm				: ""			// 성별명
		}
	};
	
	/******************************************************************************************************
	 *  객체검색팝업 관련 설정사항	
	 * 학생검색의 경우, 학사부서만을 검색조건으로 설정하고, 해당하는 학사부서를 학생검색팝업 호출시 설정할 수 없다. (2016.3.21) 
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
	 *     10. iKeyEndDate  : 기준종료일  --- 행정부서를 필터하는 용도로 사용하므로 학생검색에서는 사용하지 않음. 
	 *  	11. oObjDivRcd 	: 객체구분코드 
	 *  	12. oCd 			: 부서코드
	 *  	13. oCdNm 		: 부서명
	 *  	14. oBegDt 		: 시작일
	 *  	15. oEndDt 		: 종료일
	 *  	16. oLanDivRcd 	: 언어키
	 *  	17. func 			: 팝업에서 선택한 값을 받은 후 추가 로직이 필요한 경우 함수
	 *									  
	 *******************************************************************************************************/	
	moPObject.moIdsForStdCmnPObjSch = [
		{   //학생검색 조회조건 학사부서
			controlId			:	"btnPopSearch",
			iCd					:	"",
			iNm					:	"ipbSaNm",
			iObjDivRcd			:	["CC009SA"],
			iStartObject    	:   "",
			iOtDivRcd			:	"",
			iOtIsTreeView	:	"Y",
			iLanDivRcd		:	"",
			iKeyDate			:	"/root/reqKey/strKeyDate",
			iKeyEndDate		:	"",
			oObjDivRcd		:	"/root/reqKey/strSaObjDivRcd",
			oCd					:	"/root/reqKey/strSaCd",
			oCdNm				:	"ipbSaNm",
			oBegDt				:	"",
			oEndDt				:	"",
			oLanDivRcd		:	"",
			func 					:  
					function(){
						//팝업끝난후  후처리가 필요할때 입력 
						var vsObjCd = util.DataMap.getValue(app, "dmReqKey", "strSaCd");
						if(!ValueUtil.isNull(vsObjCd) && !mbSearchYn) {
							mbSearchYn = true;
							util.Header.clickSearch(app);
						}
					}
		}
	];

	/**
	 * @desc onModelConstructDone 이벤트
	 * @param 
	 * @return void
	 * @author	 Choi In Seong 2016. 01. 12.
	 */
	moPage.onModelConstructDone_StdCsrPStSearch = function() {
		//리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["rptCsrShreg"]);
		//검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grp_rptCsrShreg"]);
		//호출한 페이지에서 파라미터 받기.
		doParentGet();
		//화면 온로드 서브미션 호출
		doOnLoad();
	};
	
	/**
	 * @desc 부모창에서 보낸 변수 받기
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 01. 12.
	 */
	function doParentGet() {
		if(ExtPopUp.isPopUp()) {
			// 호출한 페이지에서 파라미터 받기.													
			var voStdCsrPStSearch =  ExtPopUp.getParentVal("moStdCsrPStSearch");
			// 파라미터  값복사 (deep copy)
			for (var key in voStdCsrPStSearch) {
				if (key == "Result") {
					// 결과 값은 복사하지 않음.
					continue;
				}
				moPObject.moStdCsrPStSearch [key] = voStdCsrPStSearch [key];
			}
			// 팝업이 뜬후에는 false로 고침.
			voStdCsrPStSearch.openedByChange = false;
		}
	}
	
	/**
	 * @desc 받아온 변수 조회조건에 셋팅
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 01. 12.
	 */
	function doOnLoad() {
		
		// 파라미터 받아서 초기 검색조건 세팅.
		var voParam = moPObject.moStdCsrPStSearch;
		
		if (!ValueUtil.isNull(voParam.strStudNo)) {
			//넘어온 학번 세팅
			util.Control.setValue(app, "ipbStudId", voParam.strStudNo);
		}
		
		if (!ValueUtil.isNull(voParam.strStudNm)) {
			util.Control.setValue(app, "ipbStudNm", voParam.strStudNm);
		}
		
		if (!ValueUtil.isNull(voParam.strStudId)) {
			util.DataMap.setValue(app, "dmReqKey", "strStudId", voParam.strStudId);
		}
		
		if (!ValueUtil.isNull(voParam.strKeyDate)) {
			util.DataMap.setValue(app, "dmReqKey", "strKeyDate", voParam.strKeyDate);
		}
		
		if(!ValueUtil.isNull(voParam.strObjDivRcd)) {
			util.DataMap.setValue(app, "dmReqKey", "strObjDivRcd", voParam.strObjDivRcd);
		}
		
		
		if(!ValueUtil.isNull(voParam.strStatRcd)) {
			util.DataMap.setValue(app, "dmReqKey", "strStatus", voParam.strStatRcd);
		}
		
		if(!ValueUtil.isNull(voParam.strStudDivRcd)) {
			util.DataMap.setValue(app, "dmReqKey", "strStudDivRcd", voParam.strStudDivRcd);
		}
		
		if (!ValueUtil.isNull(voParam.strObjCd)&&!ValueUtil.isNull(voParam.strObjDivRcd)) {
			
			util.DataMap.setValue(app, "dmReqKey", "strObjCd", voParam.strObjCd);
			util.DataMap.setValue(app, "dmReqKey", "strObjDivRcd", voParam.strObjDivRcd);
			
			moPObject.moIdsForStdCmnPObjSch[0].iStartObject = voParam.strObjDivRcd +  voParam.strObjCd;
		}
		
		if (!ValueUtil.isNull(voParam.strObjCd)&&!ValueUtil.isNull(voParam.strObjNm)) {
			util.DataMap.setValue(app, "dmReqKey", "strSaCd", voParam.strObjCd);
			util.Control.setValue(app, "ipbSaNm", voParam.strObjNm);
			util.Control.setValue(app, "ipbSaCd", voParam.strObjCd);

			util.Control.setEnable(app, false, ["ipbSaNm", "btnPopSearch"]);
		} else {
			if(!ValueUtil.isNull(voParam.strObjCd)){
				//mbSearchYn = false;
				util.Control.setValue(app, "ipbSaCd", voParam.strObjCd);
				//ExtModel.dispatch("ipbSaCd", "xforms-value-changed");
			} else if(!ValueUtil.isNull(voParam.strObjNm)){
				//mbSearchYn = false;
				util.Control.setValue(app, "ipbSaNm", voParam.strObjNm);
				//ExtModel.dispatch("ipbSaNm", "xforms-value-changed");
			}
			// 학사부서가 지정되지 않은 경우 학사부서 변경이 가능하도록 풀어줌.
			util.Control.setEnable(app, true, ["ipbSaNm", "btnPopSearch"]);
			moPage.maSearchMod.push("ipbSaNm");
			moPage.maSearchMod.push("btnPopSearch");							
		}
		
		// 서브미션 호출
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if (pbSuccess) {				
				util.Control.redraw(app, ["cbbStatus", "cbbGenderRcd", "cbbStudDivRcd"]);
				
				if (!ValueUtil.isNull(voParam.strStatRcd)) {
					util.DataMap.setValue(app, "dmReqKey", "strStatus", voParam.strStatRcd);
				}
				
				if (!ValueUtil.isNull(voParam.strStudDivRcd)) {
					util.DataMap.setValue(app, "dmReqKey", "strStudDivRcd", voParam.strStudDivRcd);
				}
				
				// 학번이 입력되어 있는 경우 바로 검색 실행
				if ((voParam.strStudNo || voParam.strStudNm) && mbSearchYn) {
					util.Header.clickSearch(app);
				}
			}
		});
	}
	
	/**
	 * @desc 조회조건 체크
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 01. 12.
	 */
	function doSearchChk() {
		var vsStudNo = util.Control.getValue(app, "ipbStudId");		//학번
		var vsStudNm = util.Control.getValue(app, "ipbStudNm");	//이름
		var vsBirthDay = util.Control.getValue(app, "ipbBirthDay");	//생년월일
		var vsSaNm = util.Control.getValue(app, "ipbSaNm"); //학사부서
		
		if (ValueUtil.isNull(vsStudNo) && ValueUtil.isNull(vsStudNm) 
		 && ValueUtil.isNull(vsBirthDay) && ValueUtil.isNull(vsSaNm)) {
			 
			util.Msg.alert("NLS-CSR-M057"); // 학번, 이름, 생년월일, 학사부서 중 1가지는 필수 입력해야 합니다.
			return false;
		}
		return true;
	}
	
	/**
	 * @desc 학생 조회
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 01. 12.
	 */
	function doList() {
			if(ValueUtil.isNull(moPageInfo)) return;
					
			util.DataMap.setValue(app, "dmReqKey", "authRngRcd"  , moPageInfo.authRngRcd );	//사용자 권한
			util.DataMap.setValue(app, "dmReqKey", "strOprtRoleId" , moPageInfo.oprt_role_id  );	//사용자 역할ID
			
			//strCommand: list 
			util.Submit.send(app, "subList", function(pbSuccess){
				if (pbSuccess) {
					util.Control.redraw(app, "grdCsrShreg");
											
					var vnCnt = util.Grid.getRowCount(app, "grdCsrShreg");
					if(vnCnt == 0)	util.Msg.notify(app, "NLS.WRN.M005"); // 조회된 내역이 없습니다.
					else util.Msg.notify(app, "NLS.INF.M024"); // 조회되었습니다.
					
				}
				
			});
	}
	
	/**
	 * @desc 조회 버튼 클릭
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 01. 12.
	 */
	moPage.onClick_BtnSearch = function() {
		if(!doSearchChk()){
			return false;
		}
		
		doList();
	};
	
	/**
	 * @desc 선택 행의 학생 정보 반환
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 01. 12.
	 */
	moPage.onRowDoubleClick_RptCsrShreg = function() {
		doCloseOk();
	};
	
	/**
	 * @desc 객체검색 팝업 호출
	 * @param {?} sender 버튼의 컨트롤
	 * @return void
	 * @author Choi In Seong 2016. 01. 12.
	 */
	moPage.onClick_BtnPopSearch = function(sender) {
		doOnClickStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc 학번 수정 후 엔터 시 조회
	 * @param {?} strKeyType 
	 * @param {?} strKeyStatus 
	 * @return void
	 * @author Choi In Seong 2016. 01. 12.
	 */
	moPage.onKeyDown_IpbStudId = function(strKeyType, strKeyStatus) {
		// 엔터키 입력시 조회
		if(e.keyCode == cpr.events.KeyCode.ENTER){
			util.Header.clickSearch(app);
		}
	};
	
	/**
	 * @desc 이름 수정 후 엔터 시 조회
	 * @param {?} strKeyType 
	 * @param {?} strKeyStatus 
	 * @return void
	 * @author Choi In Seong 2016. 01. 12.
	 */
	moPage.onKeyDown_IpbStudNm = function(strKeyType, strKeyStatus) {
		if(e.keyCode == cpr.events.KeyCode.ENTER){
			util.Header.clickSearch(app);
		}
	};
	
	/**
	 * @desc 학생정보 반환 이벤트
	 * @param 
	 * @return boolean 데이터 존재 여부
	 * @author Choi In Seong 2016. 01. 12.
	 */
	function doCloseOk() {
		// 선택된 데이터가 없을 시 
		if(ValueUtil.isNull(util.Grid.getCheckOrSelectedRowIndex(app, "grdCsrShreg"))){
			util.Msg.alert("NLS-WRN-M008"); //선택된 데이터가 없습니다.
			return false;
		}
		//선택된 행
		var vnIdx = util.Grid.getIndex(app, "grdCsrShreg");
		
