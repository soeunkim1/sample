//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./stdCssCScalStudDtl.xtm"/>


var stdCssCScalStudDtl = function() {
	var moPage = new Page();
	//임포트용 데이터 통신 오브젝트
	var moPObject = new PObject();
	
	/**
	 * 필수Param
	 * - progMode
	 * - schYearRcd
	 * - smtRcd
	 * - begDt
	 * - endDt
	 * 
	 * 선택Param
	 * - studId
	 * - UPD, ADD 모드일때 serialNo는 필수
	 */
	var moScalStudDtlParam = {
		progMode	: null,
		
		schYearRcd 	: null,
		smtRcd 		: null,
		stDt		: null,
		endDt		: null,
		currentDt 	: null,
		
		studId 		: null,
		studNo 		: null,
		studNm		: null,
		ogCd		: null,
		ogNm		: null,
		saCd   		: null,
		saNm		: null,
		spCd		: null,
		spNm		: null,
		statRcd		: null,
		statNm		: null,
		
		serialNo 	: null
	};

	/**
	 * 학생검색팝업 관련 설정사항
	 */
	moPObject.moIdsForStdCsrPStSearch = [
	{
		controlId 		: "btnFrfStudPop",
		iStudNo 		: "ipbFrfStudId",	
		iStudId 		: "",
		iStudNm 		: "",
		iKeyDate 		: "/root/reqKey/strEndDt",
		iObjDivRcd 		: "",
		iObjCd 			: "",
		iObjNm 			: "",
		iAuthYN 		: "",
		iStatRcd 		: "",
		iStudDivRcd		: "",
		oStudId 		: "ipbFrfStudIdObj",
		oStudNo 		: "ipbFrfStudId",
		oStudNm 		: "ipbFrfStudNm",
		oStatNm 		: "",
		oStatRcd 		: "",
		oProcRslt 		: "",
		oProcRsltYear 	: "",
		oSaNm			: "",
		oSaCd 			: "",
		oSpNm 			: "",
		oSpCd 			: "",
		oOgNm 			: "",
		oOgCd 			: "",
		oStudDivRcd		: "",
		oStudDivNm		: "",
		oBirthday		: "",
		oGenderRcd		: "",
		oGenderNm		: "",
		func : function(poParam) {
			doStSearch(poParam);
		}
	}
	];

	/* 
	 * 장학금 검색팝업 관련 설정사항
	 */
	moPObject.moIdsForStdCssPScalFeeSch = [
	{
		controlId 	: "btnFrfScalFeePop",
		iCd 		: null,
		iNm 		: "ipbFrfScalFeeNm",
		iObjDivRcd 	: "CC009SS",
		iLanDivRcd 	:  "/root/resOnload/strDefLanDivRcd",
		iKeyDate	:  "/root/reqKey/strEndDt",
		oScalFeeCd 	: "ipbFrfScalFeeCd",
		oScalFeeNm 	: "ipbFrfScalFeeNm",
		oObjDivRcd 	: "ipbFrfSsObjDivRcd",
		oPmntDivRcd : "cbbFrfPmntDivRcd",
		oPmntItvRcd : "cbbFrfPmntItvRcd",
		func : function(poParam) {
			if(!!poParam.result.SCAL_FEE_CD) doGetAmt(poParam);
		}
	}
	];

	/* 
	 * 객체 검색팝업 관련 설정사항
	 */
	moPObject.moIdsForStdCmnPObjSch = [
	{
		controlId 	: "btnFrfHopeDeptPop",
		iCd 		: "",
		iNm 		: "ipbFrfHopeWrkDeptNm",
		iObjDivRcd 	: ["CC009OG"],
		iLanDivRcd 	: "/root/resOnload/strDefLanDivRcd",
		iKeyDate 	: "/root/reqKey/strEndDt",
		oObjDivRcd 	: "ipbFrfHopeOgObjDivRcd",
		oCd 		: "ipbFrfHopeWrkDeptCd",
		oCdNm 		: "ipbFrfHopeWrkDeptNm",
		oStDt 		: "",
		oEndDt 		: "",
		oLanDivRcd 	: "",
		func 		: null
	}, 
	{
		controlId 	: "btnFrfWrkDeptPop",
		iCd 		: "",
		iNm 		: "ipbFrfWrkDeptNm",
		iObjDivRcd 	: ["CC009OG"],
		iLanDivRcd 	: "/root/resOnload/strDefLanDivRcd",
		iKeyDate 	: "/root/reqKey/strEndDt",
		oObjDivRcd 	: "ipbFrfOgObjDivRcd",
		oCd 		: "ipbFrfWrkDeptCd",
		oCdNm 		: "ipbFrfWrkDeptNm",
		oStDt 		: "",
		oEndDt 		: "",
		oLanDivRcd 	: "",
		func 		: null
	}
	];

	var moCtrlVal = {
		//이와 동일한 변수명을 선언하여 값을 전달해 주도록 한다.
		scalFeeCls1 : "", //장학금구분코드1
		scalFeeCls2 : "", //장학금구분코드2
		scalFeeCls3 : "", //장학금구분코드3
		scalFeeCls4 : "", //장학금구분코드4
		scalFeeCls5 : "", //장학금구분코드5
		
		deptCd : "", //부서코드(선택, 넘겨받은 코드의 상위부서까지 모두검색)
		deptObjDivRcd : "", //구분객체(부서코드 받을시 필수, 행정부서,학사부서 등)
		
		mngDeptDiv : "", //관리부서구분코드(선택)
		wrkScalYn : "", //근로장학여부(선택: null, Y, N)
		studReqYn : "", //학생신청여부(선택: Y)
		cntiScalYn : "" //연속장학여부(선택: Y)
	};

	var moForScalValid = {
		studId		: null,
		schYearRcd	: null,
		smtRcd		: null,
		scalFeeCd	: null,
		objDivRcd	: null,
		progMode	: null,
		wrkDeptCd	: null, 
		ogObjDivRcd	: null, 
		listResult	: null
	};

	var maCtlEnable = ["ipbFrfStudId", "btnFrfStudPop"];
	var maCtlDivOrPayEnable = ["ipbFrfScalFeeNm", "btnFrfScalFeePop", "cbbFrfProcStatRcd", "cbbFrfPmntDivRcd", "cbbFrfPmntItvRcd", "btnNew", "btnDel"];

	var maStudId = ["ipbFrfScalFeeNm", "btnFrfScalFeePop", "cbbFrfProcStatRcd", "cbbFrfPmntDivRcd", "cbbFrfPmntItvRcd", "dipFrfReqDt", "dipFrfCnfmDt","dipFrfCancelDt"
					, "txtFrfReqDesc", "txtFrfRemark", "txtFrfCancelDesc"
					, "ipbFrfHopeWrkDeptNm", "btnFrfHopeDeptPop","ipbFrfWrkDeptNm", "btnFrfWrkDeptPop", "ipbFrfWrkChagOprt", "dipFrfWrkStDt", "dipFrfWrkEndDt"
					, "cbbFrfWrkEvalRcd", "btnNew", "btnDel", "btnSave", "btnRestore", "btnFrfScalFeeNm", "btnFrfHopeWrkDeptNm", "btnFrfWrkDeptNm"];

	/**
	 * doOnLoad  화면 오픈 시 서브미션 
	 * @member stdCssCScalStudDtl
	 * @type void
	 * @author AeyoungLee 2016. 2. 23.
	 */
	function doOnLoad(){					
		//리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["frfScalStud", "rptScalStudPmnt"]);
		
		//암호화컬럼 설정
		ExtRepeat.addOriginCol("rptScalStudPmnt", ["STUD_ACCT_NO"]);
		
		// 호출한 페이지에서 파라미터 받기.		
		if(!ExtPopUp.isPopUp()) return;
		
		var voScalStudDtlParam =  ExtPopUp.getParentVal("moScalStudDtlParam");
		if(!doProgModCommon(voScalStudDtlParam)) return false;
		
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, ["frfScalStud","grdScalStudPmnt"]);
				
				var vbProgMode = voScalStudDtlParam.progMode;
				switch (vbProgMode) {
					case "NEW" : {
						doProgModNew(voScalStudDtlParam);
						util.Control.setFocus(app, "ipbFrfStudId");
						break;
					}
					case "ADD" : {
						doProgModAdd(voScalStudDtlParam, function(pbSuccess){	
							if(pbSuccess){
								util.Control.setFocus(app, "ipbFrfScalFeeNm");
							}
						});
						break;
					}
					case "UPD" : {
						doProgModUpd(voScalStudDtlParam, function(pbSuccess){
							if(pbSuccess) {
								util.Control.setFocus(app, "ipbFrfScalFeeNm");
							}
						});
						break;
					}
				}
			}
		});
	};

	/**
	 * doParentGet  호출한 페이지에서 파라미터 받기.
	 * @member stdCssCScalStudDtl
	 * @type void
	 * @author AeyoungLee 2016. 2. 23.
	 */	
	function doProgModCommon(poScalStudDtlParam){
		
		if(poScalStudDtlParam.progMode != "NEW" && poScalStudDtlParam.progMode != "ADD" && poScalStudDtlParam.progMode != "UPD"){
			//@1 잘못된 호출로 인해 정상적인 수행이 불가합니다. (다시 시도하거나, 전산담당자 문의바랍니다.)
			util.Msg.alert("NLS-CSS-M056", ["progMode"]);
			return false;
		}
		if(ValueUtil.isNull(poScalStudDtlParam.schYearRcd)){
			util.Msg.alert("NLS-CSS-M056", ["schYearRcd"]);
			return false;
		}
		if(ValueUtil.isNull(poScalStudDtlParam.smtRcd)){
			util.Msg.alert("NLS-CSS-M056", ["smtRcd"]);
			return false;
		}
		if(ValueUtil.isNull(poScalStudDtlParam.stDt)){
			util.Msg.alert("NLS-CSS-M056", ["stDt"]);
			return false;
		}
		if(ValueUtil.isNull(poScalStudDtlParam.endDt)){
			util.Msg.alert("NLS-CSS-M056", ["endDt"]);
			return false;
		}
		
		var voScalStudDtlParam = moScalStudDtlParam;
		voScalStudDtlParam.progMode = poScalStudDtlParam.progMode;
		voScalStudDtlParam.schYearRcd = poScalStudDtlParam.schYearRcd;
		voScalStudDtlParam.smtRcd = poScalStudDtlParam.smtRcd;
		voScalStudDtlParam.stDt = poScalStudDtlParam.stDt;
		voScalStudDtlParam.endDt = poScalStudDtlParam.endDt;
		
		moPObject.moIdsForStdCsrPStSearch[0].iKeyDate = voScalStudDtlParam.endDt;
		moPObject.moIdsForStdCssPScalFeeSch[0].iKeyDate = voScalStudDtlParam.endDt;
		moPObject.moIdsForStdCmnPObjSch[0].iKeyDate = voScalStudDtlParam.endDt;
		moPObject.moIdsForStdCmnPObjSch[1].iKeyDate = voScalStudDtlParam.endDt;
		
		util.DataMap.setValue(app, "dmReqKey", "strProgMode", poScalStudDtlParam.progMode);
		util.DataMap.setValue(app, "dmReqKey", "strSchYearRcd", poScalStudDtlParam.schYearRcd);
		util.DataMap.setValue(app, "dmReqKey", "strSmtRcd", poScalStudDtlParam.smtRcd);
		util.DataMap.setValue(app, "dmReqKey", "strStDt", poScalStudDtlParam.stDt);
		util.DataMap.setValue(app, "dmReqKey", "strEndDt", poScalStudDtlParam.endDt);
		
		return true;
	};

	/**
	 * doSearch 신규모드
	 * @member stdCssCScalStudDtl
	 * @type void
	 * @author AeyoungLee 2016. 2. 23.
	 */	
	function doProgModNew(poScalStudDtlParam){
		util.Control.setEnable(app, false, maStudId);
		util.Control.setEnable(app, true, maCtlEnable);	
		
		// insert
		util.FreeForm.insertRow(app, "frfScalStud");
	};

	/**
	 * doSearch 추가
	 * @member stdCssCScalStudDtl
	 * @type void
	 * @author AeyoungLee 2016. 2. 23.
	 */	
	function doProgModAdd(poScalStudDtlParam, poCallbackFunc){
		if(ValueUtil.isNull(poScalStudDtlParam.studId)){
			util.Msg.alert("NLS-CSS-M056", ["studId"]);
			return false;
		}
		
		// 2016.08.31 학년도학기에 따른 학번 클리어 주석으로 해당학기에 따른 sa를 못가지고 올 수 있음
		// saCd를 활용하는 처리로직이 없음을 판단하여 주석
//		if(ValueUtil.isNull(poScalStudDtlParam.saCd)){
//			ComMsg.alert(NLS.CSS.M056, ["saCd"]);
//			return false;
//		}
		
		util.Control.setEnable(app, false, maCtlEnable);
		
		var voScalStudDtlParam = moScalStudDtlParam;
		voScalStudDtlParam.studId = poScalStudDtlParam.studId; 
		voScalStudDtlParam.saCd = poScalStudDtlParam.saCd;
		
//		moCtrlVal.deptCd = poScalStudDtlParam.saCd;
//		moCtrlVal.deptObjDivRcd = "CC009SA";
		
		util.DataMap.setValue(app, "dmReqKey", "strStudId", poScalStudDtlParam.studId);
		util.Control.setValue(app, "ipbFrfStudIdObj", poScalStudDtlParam.studId);
		util.Control.setValue(app, "ipbFrfStudNm", poScalStudDtlParam.studNm);
		
		doChangeStudId(poScalStudDtlParam,
			function(pbSuccess) {
				//strCommand: studBankInfo 
				util.Submit.send(app, "subStudBankInfo", function(pbSuccess){
					if(util.isFunc(poCallbackFunc)) poCallbackFunc(pbSuccess);
				});
			}
		);
	};

	/**
	 * doSearch 수정
	 * @member stdCssCScalStudDtl
	 * @type void
	 * @author AeyoungLee 2016. 2. 23.
	 */	
	function doProgModUpd(poScalStudDtlParam, poCallbackFunc){
		if(ValueUtil.isNull(poScalStudDtlParam.studId)){
			util.Msg.alert("NLS-CSS-M056", ["studId"]);
			return false;
		}
		if(ValueUtil.isNull(poScalStudDtlParam.serialNo)){
			util.Msg.alert("NLS-CSS-M056", ["serialNo"]);
			return false;
		}
		
		// 2016.08.31 학년도학기에 따른 학번 클리어 주석으로 해당학기에 따른 sa를 못가지고 올 수 있음
		// saCd를 활용하는 처리로직이 없음을 판단하여 주석
//		if(ValueUtil.isNull(poScalStudDtlParam.saCd)){
//			ComMsg.alert(NLS.CSS.M056, ["saCd"]);
//			return false;
//		}
		
		util.Control.setEnable(app, false, maCtlEnable);
		
		var voScalStudDtlParam = moScalStudDtlParam;
		voScalStudDtlParam.studId = poScalStudDtlParam.studId;
		voScalStudDtlParam.studNo = poScalStudDtlParam.studNo;
		voScalStudDtlParam.serialNo = poScalStudDtlParam.serialNo;
		voScalStudDtlParam.saCd = poScalStudDtlParam.saCd;
		
//		moCtrlVal.deptCd = poScalStudDtlParam.saCd;
//		moCtrlVal.deptObjDivRcd = "CC009SA";
		
		util.DataMap.setValue(app, "dmReqKey", "strStudId", poScalStudDtlParam.studId);
		util.DataMap.setValue(app, "dmReqKey", "strSerialNo", poScalStudDtlParam.serialNo);
		
		//strCommand: scalStud 
		util.Submit.send(app, "subScalStud", function(pbSuccess) {		
			if(pbSuccess){
//TO-BE: 단독 프리폼에 대한 데이터 바인딩은 공통단에서 자동 처리됨(삭제 필요)
				ExtFreeForm.copyToInstance("frfScalStud", "/root/resList/listScalStud/row", 1);
				util.Control.redraw(app, ["grdScalStudPmnt"]);
				
				// 분납 혹은 납입그룹키가 있는 경우 
				var vbDivOrPay = util.DataMap.getValue(app, "dmResList", "strDivOrPay");					
				if(vbDivOrPay == "Y"){
					util.Control.setEnable(app, false, maCtlDivOrPayEnable);
					util.Control.setReadOnly(app, true, "rptScalStudPmnt");
				} else {
					util.Control.setEnable(app, true, maCtlDivOrPayEnable);
					util.Control.setReadOnly(app, false, "rptScalStudPmnt");
				}
				
				// 장학지급금액 기준(CSS_PMNT_AMT_CII) 조회
				if(!ValueUtil.isNull(util.Control.getValue(app, "ipbFrfScalFeeCd"))) {
					
					util.DataMap.setValue(app, "dmReqKey", "strScalFeeCd", util.Control.getValue(app, "ipbFrfScalFeeCd"));
					util.DataMap.setValue(app, "dmReqKey", "strSsObjDivRcd", util.Control.getValue(app, "ipbFrfSsObjDivRcd"));
					
					//strCommand: scalFeeEtcInfo 
					util.Submit.send(app, "subScalFeeEtcInfo", function(pbSuccess) {
						
						if(pbSuccess) {
							var vsPmntCiiRcd =  util.DataSet.getValue(app, "dsListPmntAmtCii", "PMNT_CII_RCD", 1);
							var vsCiiVal =  util.DataSet.getValue(app, "dsListPmntAmtCii", "CII_VAL", 1);
							var vsUnitRcd =  util.DataSet.getValue(app, "dsListPmntAmtCii", "UNIT_RCD", 1);
							
							util.Control.setValue(app, "ipbFrfPmntCiiRcd", vsPmntCiiRcd);
							util.Control.setValue(app, "ipbFrfCiiVal", vsCiiVal);
							util.Control.setValue(app, "ipbFrfUnitRcd", vsUnitRcd);
							
							// 지급구분이 단위계산
							var vaUnitCtrl = ["rdIpbCiiVal", "rdCbbUnitRcd", "rdIpbUnitCalcVal"];
							
							//지급기준코드가 단위계산일경우 단위코드, 단위계산값, 기준값 필수항목 셋팅
							if(vsPmntCiiRcd == "CH201UNT"){
								util.Control.setUserAttr(app, vaUnitCtrl, "require", "Y");
							}else{
								util.Control.setUserAttr(app, vaUnitCtrl, "require", "");
							}	
							
//TO-BE: <ExtControl.refreshBind> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//							ExtControl.refreshBind("binRoPmntCiiUnit");
						}
					});
				}
				
				// 해당학생 계좌
				ExtSubmission.sendEx("subStudBankInfo", "studBankInfo");
			}
			
			if(util.isFunc(poCallbackFunc)) poCallbackFunc(true);
		});
	};

	/**
	 * doSearch 학생Id 변경 시 프리폼 신규상태로 하고 기본 정보 세팅
	 * @member stdCssCScalStudDtl
	 * @type void
	 * @author AeyoungLee 2016. 2. 23.
	 */	
	function doChangeStudId(poParam, poCallbackFunc){
		util.DataMap.setValue(app, "dmReqKey", "strStudId", poParam.studId);
		
		util.FreeForm.insertRow(app, "frfScalStud");
		util.Grid.setCellValue(app, "frfScalStud", "STUD_ID", poParam.studId, 1);
		util.Grid.setCellValue(app, "frfScalStud", "STUD_NO", poParam.studNo, 1);
		util.Grid.setCellValue(app, "frfScalStud", "STUD_NM", poParam.studNm	, 1);
		util.Grid.setCellValue(app, "frfScalStud", "SCH_YEAR_RCD", poParam.schYearRcd, 1);
		util.Grid.setCellValue(app, "frfScalStud", "SMT_RCD", poParam.smtRcd, 1);
		
		doGetCurrentMaxSerialNo(function(vnCurrentMaxSerialNo) {
			if(!ValueUtil.isNull(vnCurrentMaxSerialNo)){
				
				var vnSerialNo = Number(vnCurrentMaxSerialNo) + 1;
				
				util.Grid.setCellValue(app, "frfScalStud", "SERIAL_NO", vnSerialNo, 1);
				
				moScalStudDtlParam.studId = poParam.studId;
				moScalStudDtlParam.serialNo = vnSerialNo; 
				
				util.Control.reset(app, "rptScalStudPmnt");
				
				if(util.isFunc(poCallbackFunc)) poCallbackFunc(true);
			}
		});
	};

	/**
	 * doGetCurrentMaxSerialNo 장학생 테이블 학번, 학년도, 학기로 장학생 테이블의 최대 순번값을 구해옴
	 * @member stdCssCScalStudDtl
	 * @type void
	 * @author AeyoungLee 2016. 2. 23.
	 */	
	function doGetCurrentMaxSerialNo(poCallbackFunc){
		var vsCurrentMaxSerialNo = "";
		//strCommand: serialNo 
		util.Submit.send(app, "subSerialNo", function(pbSuccess){							
			if(pbSuccess){
				vsCurrentMaxSerialNo = util.DataMap.getValue(app, "dmReqKey", "strSerialNo");
			}else{
				vsCurrentMaxSerialNo = null;
			}
			
			if(util.isFunc(poCallbackFunc)) poCallbackFunc(vsCurrentMaxSerialNo);
		});
	};

	/**
	 * onClick_BtnFrfStudPop 학생검색버튼클릭이벤트
	 * @member stdCssCScalStudDtl
	 * @type void
	 * @author AeyoungLee 2016. 2. 23.
	 */	
	moPage.onClick_BtnFrfStudPop = function(sender){
		doOnClickStdCsrPStSearch(sender);
	};

	/**
	 * onValueChage_InputFrfStudId 학생변경이벤트
	 * @member stdCssCScalStudDtl
	 * @type void
	 * @author AeyoungLee 2016. 2. 23.
	 */	
	moPage.onValueChage_InputFrfStudId = function(sender){
		doOnChangeStdCsrPStSearch(sender);
	};	

	/**
	 * doStSearch 학생검색을 통한 학생정보를 장학생정보(moScalStudDtlParam)에 셋팅
	 * @member stdCssCScalStudDtl
	 * @type void
	 * @author AeyoungLee 2016. 2. 23.
	 */	
	function doStSearch(poParam){
		moScalStudDtlParam.studId 	= null;
		moScalStudDtlParam.studNo 	= null; 
		moScalStudDtlParam.studNm 	= null;
		moScalStudDtlParam.ogCd		= null;
		moScalStudDtlParam.ogNm		= null;
		moScalStudDtlParam.saCd   	= null;
		moScalStudDtlParam.saNm		= null;
		moScalStudDtlParam.spCd		= null;
		moScalStudDtlParam.spNm		= null;
		moScalStudDtlParam.statRcd	= null;
		moScalStudDtlParam.statNm	= null;
		
		var vbStudId = poParam.Result.strStudId;
		if(!ValueUtil.isNull(vbStudId)){
			util.Control.setEnable(app, true, maStudId);
			
			moScalStudDtlParam.studId 	= vbStudId;
			moScalStudDtlParam.studNo 	= poParam.Result.strStudNo; 
			moScalStudDtlParam.studNm 	= poParam.Result.strStudNm;
			moScalStudDtlParam.ogCd		= poParam.Result.strOgCd;
			moScalStudDtlParam.ogNm		= poParam.Result.strOgNm;
			moScalStudDtlParam.saCd   	= poParam.Result.strSaCd;
			moScalStudDtlParam.saNm		= poParam.Result.strSaNm;
			moScalStudDtlParam.spCd		= poParam.Result.strSpCd;
			moScalStudDtlParam.spNm		= poParam.Result.strSpNm;
			moScalStudDtlParam.statRcd	= poParam.Result.strStatRcd;
			moScalStudDtlParam.statNm	= poParam.Result.strStatNm;
			
			moCtrlVal.deptCd = poParam.Result.strSaCd;
			moCtrlVal.deptObjDivRcd = "CC009SA";
			
			doChangeStudId(moScalStudDtlParam, 
				function(pbSuccess) {
					if(pbSuccess){
						util.DataMap.setValue(app, "dmReqKey", "strStudId", vbStudId);
						ExtSubmission.sendEx("subStudBankInfo", "studBankInfo");
					}
				}
			);
		}else{
			doResetAll();
		}	
	};	

	/**
	 * onClick_BtnFrfScalFeePop 장학금검색버튼클릭이벤트
	 * @member stdCssCScalStudDtl
	 * @type void
	 * @author AeyoungLee 2016. 2. 23.
	 */	
	moPage.onClick_BtnFrfScalFeePop = function(sender){
		doOnClickStdCssPScalFeePop(sender);
	};

	/**
	 * onValueChage_InputFrfScalFeeNm 장학금변경이벤트
	 * @member stdCssCScalStudDtl
	 * @type void
	 * @author AeyoungLee 2016. 2. 23.
	 */	
	moPage.onValueChage_InputFrfScalFeeNm = function(sender){
		doOnChangeStdCssPScalFeePop(sender);
	};	

	/**
	 * doGetAmt 장학금검색 이후 장학금 유효성 체크, 금액산출
	 * @member stdCssCScalStudDtl
	 * @type void
	 * @author AeyoungLee 2016. 2. 23.
	 */	
	function doGetAmt(poParam){
		// 장학금지급기준 정보 조회
		doScalFeeEtcInfo(poParam.result, function(pbSuccess) {
			if(pbSuccess) {
				// 장학금 유효성 체크
				doCheckValid(poParam.result, function(pbSuccess) {
					if(pbSuccess){
						// 장학금 자동계산
						doCalcScalFee();
					}else{
						//서브미션을 통해 받아오던 리스트를 부모창에서 받아서 결과창에 뿌려준다.
						var vnScalFeeValidRst = util.DataSet.getRowCount(app, "dsListResult");
						
						if(vnScalFeeValidRst > 0){
							doShowRstMsgList("impStdCssScalValidRst");
						}	
					}
				});
			}
		});
	};

	/**
	 * doScalFeeEtcInfo 장학지급금액 기준(CSS_PMNT_AMT_CII) 조회
	 * @member stdCssCScalStudDtl
	 * @type void
	 * @author AeyoungLee 2016. 2. 23.
	 */	
	function doScalFeeEtcInfo(poResult, poCallbackFunc){
		
		util.DataMap.setValue(app, "dmReqKey", "strScalFeeCd", poResult.SCAL_FEE_CD);
		util.DataMap.setValue(app, "dmReqKey", "strSsObjDivRcd", poResult.OBJ_DIV_RCD);
		
		//strCommand: scalFeeEtcInfo 
		util.Submit.send(app, "subScalFeeEtcInfo", function(pbSuccess){							
			if(pbSuccess){
				
				var vbPmntCiiRcd = util.DataSet.getValue(app, "dsListPmntAmtCii", "PMNT_CII_RCD", 1);
				var vsCiiVal =  util.DataSet.getValue(app, "dsListPmntAmtCii", "CII_VAL", 1);
				var vbUnitRcd = util.DataSet.getValue(app, "dsListPmntAmtCii", "UNIT_RCD", 1);
				
				util.Control.setValue(app, "ipbFrfPmntCiiRcd", vbPmntCiiRcd);
				util.Control.setValue(app, "ipbFrfCiiVal", vsCiiVal);
				util.Control.setValue(app, "ipbFrfUnitRcd", vbUnitRcd);
				
				// 지급구분이 단위계산
				var vaUnitCtrl = ["rdIpbCiiVal", "rdCbbUnitRcd", "rdIpbUnitCalcVal"];
				
				//지급기준코드가 단위계산일경우 단위코드, 단위계산값, 기준값 필수항목 셋팅
				if(vbPmntCiiRcd == "CH201UNT"){
					util.Control.setUserAttr(app, vaUnitCtrl, "require", "Y");
				}else{
					util.Control.setUserAttr(app, vaUnitCtrl, "require", "");
				}	
				
//TO-BE: <ExtControl.refreshBind> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//				ExtControl.refreshBind("binRoPmntCiiUnit");
			}
			
			if(util.isFunc(poCallbackFunc)) poCallbackFunc(pbSuccess);
		});
	};	

	/**
	 * doCheckValid 장학금유효성체크 -> 서비스팩토리 호출
	 * @member stdCssCScalStudDtl
	 * @type void
	 * @author AeyoungLee 2016. 2. 23.
	 */	
	function doCheckValid(poResult, poCallbackFunc){
		util.DataMap.setValue(app, "dmScalFeeBaseInfo", "SCAL_FEE_CD", poResult.SCAL_FEE_CD);
		util.DataMap.setValue(app, "dmScalFeeBaseInfo", "OBJ_DIV_RCD", poResult.OBJ_DIV_RCD);
		
		//strCommand: checkValid 
		util.Submit.send(app, "subCheckValid", function(pbSuccess) {
			
			if(pbSuccess){
				var vbPass = util.DataMap.getValue(app, "dmChkValid", "strPass");
				if(vbPass == "Y"){
					if(util.isFunc(poCallbackFunc)) poCallbackFunc(true);
				} else {
					if(util.isFunc(poCallbackFunc)) poCallbackFunc(false);
				}
			}
		});
	};	

	/**
	 * doCalcScalFee 장학금액 계산
	 * @member stdCssCScalStudDtl
	 * @type void
	 * @author AeyoungLee 2016. 2. 23.
	 */	
	function doCalcScalFee(){
		var vbSuccess = true;
		
		// 장학금자동계산여부 (CH304)
		var vbAutoScalFeeCalc =  util.DataMap.getValue(app, "dmResOnload", "strAutoScalFeeCalc");
		if(vbAutoScalFeeCalc != "Y"){
			doSetDelFlag();
			return vbSuccess;
		}
		
		var vbScalFeeCd = util.FreeForm.getValue(app, "frfScalStud", "SCAL_FEE_CD");
		var vbSsObjDivRcd = util.FreeForm.getValue(app, "frfScalStud", "SS_OBJ_DIV_RCD");
		var vbSerialNo = util.FreeForm.getValue(app, "frfScalStud", "SERIAL_NO");
		
		util.DataMap.setValue(app, "dmReqKey", "strScalFeeCd", vbScalFeeCd);
		util.DataMap.setValue(app, "dmReqKey", "strSsObjDivRcd", vbSsObjDivRcd);
		util.DataMap.setValue(app, "dmReqKey", "strSerialNo", vbSerialNo);
		
		//장학금 지급 정보를 자동 생성합니다. (작업중인 지급 정보는 삭제처리 됩니다.)
		if (util.Msg.confirm("NLS-CRM-M033") !=  "1") {
			doSetDelFlag();
			return;
		}
		
		//신규로우 삭제
		var vnNewLength = ExtInstance.getNodeListLength("/root/resList/rptScalStudPmnt/row[child::UPT_STATUS='N']");
		if(vnNewLength > 0){
			util.Grid.deleteRow(app, "grdScalStudPmnt");
		}	
		
		//장학금지급코드
		util.DataMap.setValue(app, "dmReqKey", "strPmntCiiRcd", util.Control.getValue(app, "ipbFrfPmntCiiRcd"));

		ExtRepeat.setCRUDAttr("rptScalStudPmnt", "alltype", "true");
		//장학금자동계산 서브미션
		//strCommand: calcScalFee 
		util.Submit.send(app, "subCalcScalFee", function(pbSuccess) {
			if (pbSuccess) {
				ExtRepeat.setCRUDAttr("rptScalStudPmnt", "alltype", "false");
				
				util.Control.redraw(app, "grdScalStudPmnt");
				
				var vnCnt = util.Grid.getRowCount(app, "grdScalStudPmnt");
				for (var i = 1; i <= vnCnt; i++) {
					
					//기존로우들은 DEL, 신규자동 계산된 로우들은 INS
					var vsUptFlag = util.Grid.getCellValue(app, "grdScalStudPmnt", "UPT_FLAG", i);
					if(vsUptFlag == "DEL"){
						util.Grid.setCellValue(app, "grdScalStudPmnt", AppConstants.CUD_COL_REF, "D", i, false, true);
						util.Grid.setRowState(app, "grdScalStudPmnt", cpr.data.tabledata.RowState.DELETED, i);
					} else if (vsUptFlag == "INS"){
						util.Grid.setCellValue(app, "grdScalStudPmnt", "REMARK", util.FreeForm.getValue(app, "frfScalStud", "txtFrfRemark"), i);
						util.Grid.setCellValue(app, "grdScalStudPmnt", AppConstants.CUD_COL_REF, "N", i, false, true);
						util.Grid.setRowState(app, "grdScalStudPmnt", cpr.data.tabledata.RowState.INSERTED, i);
					}
				}
				
				doSetChangedSum();
				
				// 처리 결과 메시지 
				var vsMsg = util.DataMap.getValue(app, "dmResList", "strMsg");
				if(!ValueUtil.isNull(vsMsg)){
					util.Msg.alert("vsMsg");
				}
			}
		});
	};

	/**
	 * doSetDelFlag 기존로우를 삭제처리
	 * @member stdCssCScalStudDtl
	 * @type void
	 * @author AeyoungLee 2016. 2. 23.
	 */	
	function doSetDelFlag(){
		ExtRepeat.refresh("rptScalStudPmnt");
		
		//신규로우 삭제
		var vnNewLength = ExtInstance.getNodeListLength("/root/resList/rptScalStudPmnt/row[child::UPT_STATUS='N']");
		if(vnNewLength > 0){
			util.Grid.deleteRow(app, "grdScalStudPmnt");
		}	
		//기존로우 삭제 
		var vnCnt = util.Grid.getRowCount(app, "grdScalStudPmnt");
		for (var i = 1; i <=  util.Grid.getRowCount(app, "grdScalStudPmnt"); i++) {
			util.Grid.setCellValue(app, "grdScalStudPmnt", AppConstants.CUD_COL_REF, "D", i, false, true);
			util.Grid.setRowState(app, "grdScalStudPmnt", cpr.data.tabledata.RowState.DELETED, i);
		}
		doSetChangedSum();
	};

	/**
	 * doSetChangedSum 장학생 지급내역의 금액을 프리폼 장학금금액에 셋팅한다.
	 * @member stdCssCScalStudDtl
	 * @type void
	 * @author AeyoungLee 2016. 2. 23.
	 */	
	function doSetChangedSum(){
		var vnSum = 0;
		for (var i = 1; i <= util.Grid.getRowCount(app, "grdScalStudPmnt"); i++) {
			var vbUptStatus = util.Grid.getRowState(app, "grdScalStudPmnt", i);
			
			if(vbUptStatus != "delete"){
				vnSum = vnSum + Number(util.Grid.getCellValue(app, "grdScalStudPmnt", "AMT", i));
			}
		}
		util.FreeForm.setValue(app, "frfScalStud", "SCAL_AMT", vnSum);
	};

	/**
	 * onClick_InputFrfHopeDeptNm 희망부서검색버튼클릭이벤트
	 * @member stdCssCScalStudDtl
	 * @type void
	 * @author AeyoungLee 2016. 2. 23.
	 */	
	moPage.onClick_BtnFrfHopeDeptPop = function(sender){
		doOnClickStdCmnPObjSch(sender);
	};

	/**
	 * onValueChage_InputFrfHopeDeptNm 희망부서변경이벤트
	 * @member stdCssCScalStudDtl
	 * @type void
	 * @author AeyoungLee 2016. 2. 23.
	 */
	moPage.onValueChage_InputFrfHopeDeptNm = function(sender){
		doOnChangeStdCmnPObjSch(sender);
	};

	/**
	 * onClick_BtnFrfStudPop 근로부서검색버튼클릭이벤트
	 * @member stdCssCScalStudDtl
	 * @type void
	 * @author AeyoungLee 2016. 2. 23.
	 */	
	moPage.onClick_BtnFrfWrkDeptPop = function(sender){
		doOnClickStdCmnPObjSch(sender);
	};

	/**
	 * onValueChage_InputFrfStudId 근로부서변경이벤트
	 * @member stdCssCScalStudDtl
	 * @type void
	 * @author AeyoungLee 2016. 2. 23.
	 */	
	moPage.onValueChage_InputFrfWrkDeptNm = function(sender){
		doOnChangeStdCmnPObjSch(sender);
	};	



	/**
	 * doResetAll 프리폼, 리피트 초기화 및 신규상태롤 셋팅
	 * @member stdCssCScalStudDtl
	 * @type void
	 * @author AeyoungLee 2016. 2. 23.
	 */	
	function doResetAll(){
		// 초기화
		util.Control.reset(app, "rptScalStudPmnt");
		util.FreeForm.insertRow(app, "frfScalStud");
		// 지긊기준금액 초기화
		ExtInstance.reset("","/root/resList/listPmntAmtCii", true);
		// 학생계좌번호 초기화
		ExtInstance.reset("","/root/resList/studBankInfo", true);
		
		util.Control.setEnable(app, false, maStudId);
	};

	
	/**
	 * doClearScaFeeInfo 장학금정보 초기화
	 * @member stdCssCScalStudDtl
	 * @type void
	 * @author AeyoungLee 2016. 2. 23.
	 */	
	function doClearScaFeeInfo(){
		util.FreeForm.setValue(app, "frfScalStud", "SCAL_FEE_CD", "", false);
		util.FreeForm.setValue(app, "frfScalStud", "SCAL_FEE_NM", "", false);
		util.FreeForm.setValue(app, "frfScalStud", "SS_OBJ_DIV_RCD", "", false);
		util.FreeForm.setValue(app, "frfScalStud", "PMNT_DIV_RCD", "", false);
		util.FreeForm.setValue(app, "frfScalStud", "PMNT_ITV_RCD", "", false);
		
		// 지긊기준금액 초기화
		ExtInstance.reset("","/root/resList/listPmntAmtCii", true);
	};

	/**
	 * onClick_BtnNew 신규버튼 클릭이벤트
	 * @member stdCssCScalStudDtl
	 * @type void
	 * @author AeyoungLee 2016. 2. 23.
	 */	
	moPage.onClick_BtnNew = function(){
		// 장학금명 입력여부
		var vsScalFeeCd = util.FreeForm.getValue(app, "frfScalStud", "SCAL_FEE_CD");								
		if(ValueUtil.isNull(vsScalFeeCd)){
			util.Msg.alert("NLS-INF-M017", [ExtControl.getTextValue("lblFrfScalFeeNm")]);
			util.Control.setFocus(app, "ipbFrfScalFeeNm");
			return;
		}
		
		var vnNewRow = util.Grid.insertRow(app, "grdScalStudPmnt", "rdCbbFnreDivRcd");
		
		var voScalStudDtlParam = moScalStudDtlParam;
		util.Grid.setCellValue(app, "grdScalStudPmnt", "STUD_ID", voScalStudDtlParam.studId, vnNewRow);
		util.Grid.setCellValue(app, "grdScalStudPmnt", "SCH_YEAR_RCD", voScalStudDtlParam.schYearRcd, vnNewRow);
		util.Grid.setCellValue(app, "grdScalStudPmnt", "SMT_RCD", voScalStudDtlParam.smtRcd, vnNewRow);
		util.Grid.setCellValue(app, "grdScalStudPmnt", "SERIAL_NO", voScalStudDtlParam.serialNo, vnNewRow);
		util.Grid.setCellValue(app, "grdScalStudPmnt", "PROC_TYPE_RCD", "CH303PMT", vnNewRow);
		util.Grid.setCellValue(app, "grdScalStudPmnt", "PMNT_SERIAL_NO", doGetNewPmntSerialNo(), vnNewRow);
		util.Grid.setCellValue(app, "grdScalStudPmnt", "REMARK", util.FreeForm.getValue(app, "frfScalStud", "txtFrfRemark"), vnNewRow);
		
		var vsStudBankRcd = util.DataMap.getValue(app, "dmStudBankInfo", "strBankRcd");
		var vsStudAcctNo = util.DataMap.getValue(app, "dmStudBankInfo", "strAcctNo");
		var vsOwnerNm = util.DataMap.getValue(app, "dmStudBankInfo", "strOwnerNm");
		
		util.Grid.setCellValue(app, "grdScalStudPmnt", "STUD_BANK_CD", vsStudBankRcd, vnNewRow);
		util.Grid.setCellValue(app, "grdScalStudPmnt", "STUD_ACCT_NO", vsStudAcctNo, vnNewRow);
		util.Grid.setCellValue(app, "grdScalStudPmnt", "OWNER_NM", vsOwnerNm, vnNewRow);
	};

	/**
	 * doGetNewPmntSerialNo 장학생지급-Max(지긊순번) 구하기
	 * @member stdCssCScalStudDtl
	 * @type void
	 * @author AeyoungLee 2016. 2. 23.
	 */	
	function doGetNewPmntSerialNo(){
		var vnMaxPmntSerialNo = 0;
		for (var i = 1; i <= util.Grid.getRowCount(app, "grdScalStudPmnt"); i++) {
			var vnPmntSerialNo = Number(util.Grid.getCellValue(app, "grdScalStudPmnt", "PMNT_SERIAL_NO", i));
			if(vnMaxPmntSerialNo < vnPmntSerialNo){
				vnMaxPmntSerialNo = vnPmntSerialNo;
			}
		}
		return ++vnMaxPmntSerialNo;
	};

	/**
	 * onClick_BtnNew 삭제버튼 클릭이벤트
	 * @member stdCssCScalStudDtl
	 * @type void
	 * @author AeyoungLee 2016. 2. 23.
	 */	
	moPage.onClick_BtnDel = function(){
		//리피트 row 선택여부 체크
		var vnOrgRowIdx = util.Grid.getIndex(app, "grdScalStudPmnt");
		if(vnOrgRowIdx == "0"){
			var vsMsgParam = util.Grid.getTitle(app, "grdScalStudPmntScalStudPmnt");
			// "@(을)를 선택해주세요" 메시지 출력
			util.Msg.alert("NLS-INF-M045", [vsMsgParam]);
			return;
		}
		
		//선택한 자료의 품의번호 존재시 삭제불가
		var vsBillNo = util.Grid.getCellValue(app, "grdScalStudPmnt", "BILL_NO", vnOrgRowIdx);
		if(!ValueUtil.isNull(vsBillNo)){
			//결의된 지급내역입니다. 삭제가 불가능합니다.
			util.Msg.alert("NLS-CSS-M087");
			return false;
		}
		
		var vsDivPayNo =  util.Grid.getCellValue(app, "grdScalStudPmnt", "DIV_PAY_NO", vnOrgRowIdx);
		var vsPayGrpKey = util.Grid.getCellValue(app, "grdScalStudPmnt", "PAY_GRP_KEY", vnOrgRowIdx);
		
		if(ValueUtil.isNull(vsDivPayNo) && ValueUtil.isNull(vsPayGrpKey)){
			util.Grid.deleteRow(app, "grdScalStudPmnt");
		} else {
			// 삭제할 수 없습니다.
			util.Msg.alert("NLS-CSS-M055");
		}
		
		doSetChangedSum();
	};

	/**
	 * onClick_BtnNew 작업취소버튼 클릭이벤트
	 * @member stdCssCScalStudDtl
	 * @type void
	 * @author AeyoungLee 2016. 2. 23.
	 */	
	moPage.onClick_BtnRestore = function(){
		util.Grid.restoreRow(app, "grdScalStudPmnt");
	};

	 /**
	 * onClick_BtnSave 작업저장버튼 클릭이벤트
	 * @member stdCssCScalStudDtl
	 * @type void
	 * @author AeyoungLee 2016. 2. 23.
	 */
	moPage.onClick_BtnSave = function(){
		// 변경사항 체크
		if(!util.Grid.isModified(app, ["frfScalStud","grdScalStudPmnt"], "MSG")){
			app.close();
			return;
		}
		
//		// 지급구분이 단위계산
//		var vsPmntCiiRcd = ExtControl.getValue("ipbFrfPmntCiiRcd");
//		var vaUnitCtrl = ["rdIpbCiiVal", "rdCbbUnitRcd", "rdIpbUnitCalcVal"];
//		
//		//지급기준코드가 단위계산일경우 단위코드, 단위계산값, 기준값 필수항목 셋팅
//		if(vsPmntCiiRcd == "CH201UNT"){
//			ExtControl.setAttr(vaUnitCtrl, "udattr", "notNull=yes");
//		}else{
//			ExtControl.setAttr(vaUnitCtrl, "udattr", "");
//		}	
		
		// Validation Check
		if(!util.validate(app, ["frfScalStud","grdScalStudPmnt"])) return false;
		
		// 근로기간 정합성 체크
		if(!docheckWrkDt()) return false;
		
		// 지급구분이 '사전감면'인 경우 등록금 항목 필수입력체크
		// 지급기준이 '단위'인 경우 기준값,단위,단위계산값 필수입력체크
		if(!doCheckItemCdNullable()) return false;
		
		// 처리예정일이 있으면 금액이 > 0 이어야 함
		if(!doCheckAmt()) return false;
		
		// 저장서브미션
		//strCommand: savePmnt 
		util.Submit.send(app, "subSave", function(pbSuccess) {
					
			if(pbSuccess){
				
				if(ExtPopUp.isPopUp()){
					ExtPopUp.getParentScript("setParentMsg", NLS.INF.M001);
					ExtPopUp.closeLayeredPopup("doList", null);
				}	
			}
		});
	};

	/**
	 * docheckWrkDt 근로기간 적합성 체크
	 * @member stdCssCScalStudDtl
	 * @type void
	 * @author AeyoungLee 2016. 2. 23.
	 */	
	function docheckWrkDt(){
		var vsWrkStDt = util.FreeForm.getValue(app, "frfScalStud", "WRK_ST_DT");
		var vsWrkEndDt = util.FreeForm.getValue(app, "frfScalStud", "WRK_END_DT");
		
		if ((!ValueUtil.isNull(vsWrkStDt)) && (!ValueUtil.isNull(vsWrkEndDt))) {
			if(vsWrkStDt > vsWrkEndDt){
				//근로기간의 시작일이 종료일보다 큽니다.
				util.Msg.alert("NLS-CSS-M058");				
				return false;
			}
		} else if (ValueUtil.isNull(vsWrkStDt) && (!ValueUtil.isNull(vsWrkEndDt))) {
			//근로기간에서 종료일만 입력될 수 없습니다.
			util.Msg.alert("NLS-CSS-M059");
			return false;
		} else if ((!ValueUtil.isNull(vsWrkStDt)) && (ValueUtil.isNull(vsWrkEndDt))) {
			//근로기간의 시작일만 입력될 수 없습니다.
			util.Msg.alert("NLS-CSS-M060");
			return false;
		}
		
		return true;
	};

	/**
	 * doCheckItemCdNullable 사전감면의 경우 등록금항목 필수 입력여부 체크
	 * @member stdCssCScalStudDtl
	 * @type void
	 * @author AeyoungLee 2016. 2. 23.
	 */	
	function doCheckItemCdNullable(){
		if(util.FreeForm.getValue(app, "frfScalStud", "PMNT_DIV_RCD") == "CH001BEF"){
			
			for (var i = 1; i <= util.Grid.getRowCount(app, "grdScalStudPmnt"); i++) {
				
				var vbItemCd = util.Grid.getCellValue(app, "grdScalStudPmnt", "ITEM_CD", i);
				var vbUptStatus = util.Grid.getRowState(app, "grdScalStudPmnt", i);
				if(vbUptStatus != "delete" && (ValueUtil.isNull(vbItemCd))){
					//장학생 지급의 @1번째 데이타에서 항목은(는) 필수 입력항목입니다.
					util.Msg.alert("NLS-CSS-M069", [i+""]);
					ExtRepeat.setColFocus("rptScalStudPmnt", i, "rdCbbItemCd");
					return false;
				}
			}
		}
		
		var vnUntCnt = ExtInstance.getNodeListLength("/root/resList/listPmntAmtCii/row[child::PMNT_CII_RCD='CH201UNT']");
		if(vnUntCnt > 0){
			var vsTitleNm = util.Grid.getTitle(app, "grdScalStudPmntScalStudPmnt");
			for (var i = 1; i <= util.Grid.getRowCount(app, "grdScalStudPmnt"); i++) {
				
				var vsCiiVal = util.Grid.getCellValue(app, "grdScalStudPmnt", "CII_VAL", i);
				var vsUnitVal = util.Grid.getCellValue(app, "grdScalStudPmnt", "UNIT_CALC_VAL", i);
				var vsUnitRcd = util.Grid.getCellValue(app, "grdScalStudPmnt", "UNIT_RCD", i);
				
				var vbUptStatus = util.Grid.getRowState(app, "grdScalStudPmnt", i);
				if(vbUptStatus != "delete"){
					//기준값
					if(ValueUtil.isNull(vsCiiVal)){
						//장학생 지급의 @1번째 데이타에서 항목은(는) 필수 입력항목입니다.
						util.Msg.alert("NLS-CSS-M091", [vsTitleNm, i+"", NLS.NSCR.STDVAL]);
						ExtRepeat.setColFocus("rptScalStudPmnt", i, "rdIpbCiiVal");
						return false;
					}
					
					//단위
					if(ValueUtil.isNull(vsUnitRcd)){
						//장학생 지급의 @1번째 데이타에서 항목은(는) 필수 입력항목입니다.
						util.Msg.alert("NLS-CSS-M091", [vsTitleNm, i+"", NLS.NSCR.UNIT]);
						ExtRepeat.setColFocus("rptScalStudPmnt", i, "rdCbbUnitRcd");
						return false;
					}
					
					//단위계산값
					if(ValueUtil.isNull(vsUnitVal)){
						//장학생 지급의 @1번째 데이타에서 항목은(는) 필수 입력항목입니다.
						util.Msg.alert("NLS-CSS-M091", [vsTitleNm, i+"", NLS.NSCR.UNITCALVAL]);
						ExtRepeat.setColFocus("rptScalStudPmnt", i, "rdIpbUnitCalcVal");
						return false;
					}
				}
			}
		}	
		
		return true;
	};

	/**
	 * doCheckAmt 처리예정일이 있으면 금액이 > 0 이어야 함
	 * @member stdCssCScalStudDtl
	 * @type void
	 * @author AeyoungLee 2016. 2. 23.
	 */	
	function doCheckAmt(){
		for (var i = 1; i <= util.Grid.getRowCount(app, "grdScalStudPmnt"); i++) {
			var vbAmt = util.Grid.getCellValue(app, "grdScalStudPmnt", "AMT", i);
			var vsProcPlanDt = util.Grid.getCellValue(app, "grdScalStudPmnt", "PROC_PLAN_DT", i);
			
			if(!ValueUtil.isNull(vsProcPlanDt)){
				var vbUptStatus = util.Grid.getRowState(app, "grdScalStudPmnt", i);
				if(vbUptStatus != "delete" && vbAmt <= 0){
					//장학금지급의 @1번째 데이타에서 금액은 0보다 커야 합니다.
					util.Msg.alert("NLS-CSS-M057", [i+""]);
					ExtRepeat.setColFocus("rptScalStudPmnt", i, "rdIpbAmt");
					return false;
				}
			}
		}
		return true;
	};

	/**
	 * onValueChanged_RptScalStudPmnt 장학생 지급 
		- 장학금지급금액기준이 '단위계산'일 경우 단위계산값 * 기준값 = 금액 셋팅
		- 장학금지급금액의 총금액을 장학생의 장학금액에 셋팅
	 * @member stdCssCScalStudDtl
	 * @type void
	 * @author AeyoungLee 2016. 2. 23.
	 */	
	moPage.onValueChanged_RptScalStudPmnt = function(psColDiv){
		var vnIdx = util.Grid.getIndex(app, "grdScalStudPmnt");
		//최초 조회한 지급내역테이블에서 단위계산이 한개라도 있을경우 모두 단위계산으로 인식.
		var vnUnitNodeLength = ExtInstance.getNodeListLength("/root/resList/listPmntAmtCii/row[child::PMNT_CII_RCD='CH201UNT']");
		
		if(psColDiv == "UNIT_CALC_VAL" || psColDiv == "CII_VAL"){
			if(vnUnitNodeLength > 0){
				var vbUnitCalcVal = Number(util.Grid.getCellValue(app, "grdScalStudPmnt", "UNIT_CALC_VAL", vnIdx));
				var vbCiiVal = Number(util.Grid.getCellValue(app, "grdScalStudPmnt", "CII_VAL", vnIdx));
				util.Grid.setCellValue(app, "grdScalStudPmnt", "AMT", vbUnitCalcVal * vbCiiVal, vnIdx);
			}	
		}
		
		doSetChangedSum();
	};

	
	
	moPage.onRowSelect_RptScalStudPmnt = function() {
//TO-BE: <ExtControl.refreshBind> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtControl.refreshBind("binRoPmntCiiUnit");
	};
	return moPage;
};
